globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth_BwhEewZt.mjs";
import { A as APP_SCHEMA, v as validateDefinition } from "./appdef_BaB2Dvgo.mjs";
import { ALLOWED_PERMISSIONS, PRIVILEGED_PERMISSIONS } from "./apps_CNzxAd3z.mjs";
import { p as preflight } from "./preflight_BCVR172e.mjs";
import { n as nowSec } from "./accounting_D4tRmfws.mjs";
import { env } from "cloudflare:workers";
async function loadDraftForCheck(ctx, draftId) {
  const d = await ctx.db.first(
    "SELECT id,name,description,spec,permissions,definition,est_tokens FROM app_drafts WHERE id=?",
    [draftId]
  );
  if (!d) return null;
  return {
    id: d.id,
    name: d.name,
    description: d.description,
    spec: d.spec,
    permissions: JSON.parse(d.permissions || "[]"),
    definition: d.definition ? JSON.parse(d.definition) : null,
    estTokens: d.est_tokens ?? void 0,
    role: "admin"
    // 申請は org 管理者のみ（settings ゲート）。
  };
}
function scanText(input) {
  const def = input.definition;
  const html = def && typeof def === "object" && typeof def.render?.html === "string" ? def.render.html : "";
  return [input.name, input.description ?? "", input.spec ?? "", JSON.stringify(def ?? ""), html].join("\n");
}
const PII_PATTERNS = [
  { kind: "メールアドレス", re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g },
  { kind: "電話番号", re: /0\d{1,3}[-(]?\d{2,4}[-)]?\d{3,4}/g },
  { kind: "マイナンバー(12桁)", re: /(?<!\d)\d{12}(?!\d)/g },
  { kind: "クレジットカード番号(桁)", re: /(?<!\d)(?:\d[ -]?){13,16}(?!\d)/g },
  { kind: "郵便番号付き住所", re: /〒?\d{3}-?\d{4}/g }
];
const DESTRUCTIVE_SQL = /\b(drop\s+table|delete\s+from|truncate|alter\s+table|attach\s+database|pragma|update\s+\w+\s+set(?![^;]*\bwhere\b))/i;
const DANGEROUS_JS = /\b(eval\s*\(|new\s+Function\s*\(|document\.cookie|localStorage|indexedDB|window\.parent|window\.top|navigator\.sendBeacon)\b/i;
async function deterministicSelfChecks(ctx, input) {
  const text = scanText(input);
  const checks = [];
  const hits = [];
  for (const p of PII_PATTERNS) {
    const m = text.match(p.re);
    if (m && m.length) hits.push(`${p.kind}（${m.length}件）`);
  }
  checks.push(hits.length ? { key: "pii", label: "個人情報・企業情報", status: "warn", detail: `アプリ定義に個人情報・企業情報らしき値が直書きされています：${hits.join(" / ")}。意図したサンプル/連絡先か、AI審査で精査します。第三者の実データなら削除してください。`, ai: false } : { key: "pii", label: "個人情報・企業情報", status: "ok", detail: "定義内に個人情報・企業情報の直書きは検出されませんでした。", ai: false });
  const def = input.definition;
  const html = def && typeof def === "object" && typeof def.render?.html === "string" ? def.render.html : "";
  const badSql = DESTRUCTIVE_SQL.test(JSON.stringify(def ?? ""));
  const badJs = DANGEROUS_JS.test(html);
  checks.push(badSql || badJs ? { key: "destructive", label: "破壊的動作", status: "fail", detail: [badSql ? "破壊的SQL（DROP/DELETE/TRUNCATE/ALTER/WHERE無しUPDATE 等）" : "", badJs ? "危険なJS（eval/Function/cookie/localStorage/外部送出 等）" : ""].filter(Boolean).join(" / ") + " を検出。自身・ホスト・他クライアントへ影響しうるため申請できません。", ai: false } : { key: "destructive", label: "破壊的動作", status: "ok", detail: "DB破壊や危険な動的実行の痕跡はありません。", ai: false });
  const structured = def && typeof def === "object" && def.schema === APP_SCHEMA ? validateDefinition(def) : null;
  const unknown = input.permissions.filter((p) => !ALLOWED_PERMISSIONS.has(p));
  const priv = input.permissions.filter((p) => PRIVILEGED_PERMISSIONS.has(p));
  if (!structured) checks.push({ key: "scope", label: "実装・権限", status: "fail", detail: `実行可能なアプリ定義（schema="${APP_SCHEMA}"）がありません。`, ai: false });
  else if (!structured.ok || unknown.length) checks.push({ key: "scope", label: "実装・権限", status: "fail", detail: [unknown.length ? `未許可の権限：${unknown.join(", ")}` : "", structured.issues.slice(0, 3).map((i) => `${i.path || "定義"}: ${i.message}`).join(" / ")].filter(Boolean).join(" / "), ai: false });
  else checks.push({ key: "scope", label: "実装・権限", status: priv.length ? "warn" : "ok", detail: priv.length ? `影響の大きい権限を含みます（${priv.join(", ")}）。導入先の管理者承認が必要になります。` : "宣言権限はクライアント権限の範囲内です。", ai: false });
  const pf = await preflight(ctx, { name: input.name, permissions: input.permissions, definition: input.definition, spec: input.spec ?? void 0, estTokens: input.estTokens, role: input.role }).catch(() => null);
  const costCheck = pf?.checks.find((c) => c.key === "cost");
  checks.push(costCheck ? { key: "cost", label: "過剰コスト", status: costCheck.status, detail: costCheck.detail + (costCheck.status === "ok" ? "" : " 導入者にコストの目安が表示されます。"), ai: false } : { key: "cost", label: "過剰コスト", status: "warn", detail: "コスト見積りを取得できませんでした。", ai: false });
  return checks;
}
const AI_SYSTEM = 'あなたはアプリ公開審査の審査員です。提示されたアプリ定義（JSON）と仕様を読み、4観点で安全性を判定します。出力は厳密なJSONのみ（前置き・説明・コードフェンス禁止）。各観点は status を "ok"|"warn"|"fail" のいずれか、detail は日本語1〜2文で具体的に。判定観点：morals=公序良俗（差別・暴力・性的・ヘイト・依存助長・詐欺的表現など）に反しないか。legal=法的問題（無断のスクレイピング・著作権/商標侵害・賭博・無資格の医療/法律/金融助言・個人情報の不適切な取り扱いなど）が無いか。pii=第三者の実在する個人情報・企業の非公開情報が定義に焼き込まれていないか（fail=実データ混入の疑い、warn=判断保留、ok=問題なし）。destructive=自身・ホスト基盤・他の利用者へ破壊的/迷惑な動作（無限ループ・大量送信・資格情報の窃取・他テナント干渉）をしないか。確証が持てない不利益はwarn、明確な違反のみfailとする。出力形式：{"morals":{"status":"...","detail":"..."},"legal":{"status":"...","detail":"..."},"pii":{"status":"...","detail":"..."},"destructive":{"status":"...","detail":"..."}}';
function parseAiVerdict(text) {
  if (!text) return null;
  let t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{"), e = t.lastIndexOf("}");
  if (s < 0 || e <= s) return null;
  try {
    return JSON.parse(t.slice(s, e + 1));
  } catch {
    return null;
  }
}
const normStatus = (s) => s === "fail" || s === "warn" || s === "ok" ? s : "warn";
async function aiSelfChecks(ctx, input) {
  const labels = { morals: "公序良俗", legal: "法的問題", pii: "個人情報（AI精査）", destructive: "破壊的動作（AI精査）" };
  const keys = ["morals", "legal", "pii", "destructive"];
  const prompt = `アプリ名：${input.name}
説明：${input.description ?? "(なし)"}
仕様：${input.spec ?? "(なし)"}
要求権限：${input.permissions.join(", ") || "(なし)"}
定義(JSON)：
${JSON.stringify(input.definition ?? {}).slice(0, 6e3)}`;
  let verdict = null;
  try {
    const out = await ctx.ai.infer(prompt, { system: AI_SYSTEM, maxTokens: 900 });
    verdict = parseAiVerdict(out);
  } catch {
    verdict = null;
  }
  if (!verdict) {
    return keys.map((k) => ({ key: k, label: labels[k], status: "fail", detail: "AI審査を完了できませんでした。時間をおいて再度お試しください。", ai: true }));
  }
  return keys.map((k) => {
    const v = verdict[k];
    return { key: k, label: labels[k], status: v ? normStatus(v.status) : "warn", detail: v?.detail || "判定結果を取得できませんでした。", ai: true };
  });
}
const RANK = { ok: 0, warn: 1, fail: 2 };
function mergeChecks(det, ai) {
  const out = [];
  const aiByKey = new Map(ai.map((c) => [c.key, c]));
  for (const d of det) {
    const a = aiByKey.get(d.key);
    if (a && RANK[a.status] > RANK[d.status]) {
      out.push({ ...d, status: a.status, detail: `${d.detail} ／AI審査：${a.detail}`, ai: true });
      aiByKey.delete(d.key);
    } else {
      if (a) aiByKey.delete(d.key);
      out.push(d);
    }
  }
  for (const a of aiByKey.values()) out.push(a);
  return out;
}
function finalize(checks) {
  return { ok: checks.every((c) => c.status !== "fail"), checks, checkedAt: nowSec() };
}
async function persistSelfCheck(ctx, draftId, result) {
  await ctx.db.run("UPDATE app_drafts SET selfcheck=?, selfcheck_status=? WHERE id=?", [JSON.stringify(result), result.ok ? "pass" : "fail", draftId]);
}
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const ctx = locals.ctx;
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要です" }, 401);
  const { canDevelopApps } = await import("./auth_BwhEewZt.mjs");
  if (!canDevelopApps(ses.role, ses.ctx)) return json({ error: "アプリ開発の権限がありません（管理者または開発者のみ）" }, 403);
  const b = await request.json().catch(() => ({}));
  const draftId = String(b.draftId ?? "").trim();
  if (!draftId) return json({ error: "draftId が必要" }, 400);
  const input = await loadDraftForCheck(ctx, draftId);
  if (!input) return json({ error: "草案が見つかりません" }, 404);
  const enc = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const send = (o) => {
    void writer.write(enc.encode(`data: ${JSON.stringify(o)}

`));
  };
  (async () => {
    try {
      send({ type: "phase", label: "基本チェックを実行しています…" });
      const det = await deterministicSelfChecks(ctx, input);
      for (const c of det) send({ type: "check", check: c });
      send({ type: "phase", label: "AIが公序良俗・法的問題などを審査しています…" });
      const ai = await aiSelfChecks(ctx, input);
      const merged = mergeChecks(det, ai);
      const detKeys = new Set(det.map((c) => c.key));
      for (const c of merged) {
        if (c.ai || !detKeys.has(c.key)) send({ type: "check", check: c });
      }
      const result = finalize(merged);
      await persistSelfCheck(ctx, draftId, result);
      send({ type: "done", ok: result.ok, checks: result.checks, checkedAt: result.checkedAt });
    } catch (e) {
      const msg = e?.message ?? String(e);
      await (await import("./diag_B7sefss8.mjs")).logDiag(env, "error", "self-check", `失敗(draft=${draftId}): ${msg}`).catch(() => {
      });
      send({ type: "error", error: "セルフチェックの実行でエラーが発生しました。時間をおいて再度お試しください。" });
    } finally {
      await writer.close().catch(() => {
      });
    }
  })();
  return new Response(readable, {
    headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-cache, no-transform", "x-accel-buffering": "no" }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
