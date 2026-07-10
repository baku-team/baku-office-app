// A-1（ビルド駆動 DO+Alarm）の共有ロジック（plain JS）。bo-entry.mjs（配布）と host-entry.mjs（自社ホスト）が
// 薄い `class BuildDO` からこれらの関数を呼ぶ＝ロジックを一本化しつつ、DO クラスは各エントリの named export に保つ
// （@astrojs/cloudflare 13.7 は DO の named export をアダプタで供給できないため、エントリ側で宣言する）。
//
// dumb-ticker 方式：DO はビルドロジックを持たず「秒精度の目覚まし時計」に徹する。alarm() で astroFetch を
// in-process 直呼び（自オリジンへの直 fetch が CF に遮断される error 1042 を回避）して /api/build/tick を叩き、
// 応答の {more,retryable} で「連鎖 / 指数バックオフ再挑戦 / 終了」を決める。状態は D1 app_builds のまま（single-writer）。
const KV_AUTO = "internal_key_auto";

// cron-auth.ts の resolveDrainKey と同一（per-install 鍵・外部非露出）。エントリは bundle 外のため最小限を複製。
async function drainKey(env) {
  if (env.INTERNAL_KEY) return env.INTERNAL_KEY;
  const kv = env.LICENSE;
  if (!kv) return null;
  let k = await kv.get(KV_AUTO).catch(() => null);
  if (!k) {
    k = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
    await kv.put(KV_AUTO, k).catch(() => {});
  }
  return k;
}

// /kick：buildId/origin を保存し即発火。/cancel：停止。self=DO インスタンス（storage/env を持つ）。
export async function buildDoFetch(self, request) {
  const url = new URL(request.url);
  if (url.pathname === "/kick") {
    let body = {};
    try { body = await request.json(); } catch { /* noop */ }
    await self.storage.put("buildId", String(body.buildId ?? ""));
    await self.storage.put("origin", String(body.origin ?? ""));
    await self.storage.put("backoff", 0);
    await self.storage.setAlarm(Date.now()); // 即発火（応答をブロックしない）
    return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
  }
  if (url.pathname === "/cancel") { await self.storage.deleteAlarm(); return new Response("ok"); }
  return new Response("BuildDO", { status: 200 });
}

// alarm：① watchdog を先行 setAlarm（invocation 即死保険・無言死防止）② astroFetch で /api/build/tick を直呼び
//   ③ 応答 {more,retryable} で連鎖(setAlarm now)／指数バックオフ再挑戦／終了(deleteAlarm)を分岐。astroFetch=各
//   エントリが束縛して渡す（bo-entry は ./entry.mjs、host-entry はビルド後 astro handler）。
export async function buildDoAlarm(self, astroFetch) {
  await self.storage.setAlarm(Date.now() + 120000); // watchdog（以降で上書き）
  try {
    const buildId = await self.storage.get("buildId");
    const origin = (await self.storage.get("origin")) || "";
    const key = await drainKey(self.env);
    if (!buildId || !key) { await self.storage.deleteAlarm(); return; }
    const req = new Request("https://internal/api/build/tick", {
      method: "POST",
      headers: { "content-type": "application/json", "x-internal-key": key },
      body: JSON.stringify({ buildId, origin }),
    });
    // DO alarm には ExecutionContext が無い。waitUntil はタスクを集めて DO 生存中に完了させる（通知等の取りこぼし防止）。
    const tasks = [];
    const ctxShim = { waitUntil(p) { try { tasks.push(Promise.resolve(p)); } catch { /* noop */ } }, passThroughOnException() {} };
    const r = await astroFetch(req, self.env, ctxShim);
    let b = {};
    try { b = await r.json(); } catch { /* noop */ }
    await Promise.allSettled(tasks);
    if (b.more === true) {
      await self.storage.put("backoff", 0);
      await self.storage.setAlarm(Date.now()); // 連鎖（サブ秒）
    } else if (b.retryable === true) {
      // まだ active だがこの tick は前進せず（claim 敗北等）＝指数バックオフ＋jitter で再挑戦（所有権を取り戻す）。
      const n = ((await self.storage.get("backoff")) || 0) + 1;
      await self.storage.put("backoff", n);
      const wait = Math.min(5000 * 2 ** n, 120000) + Math.floor(Math.random() * 1000);
      await self.storage.setAlarm(Date.now() + wait);
    } else {
      await self.storage.deleteAlarm(); // 終端＝役目終了
    }
  } catch {
    await self.storage.setAlarm(Date.now() + 30000); // 例外でも無言死しない
  }
}
