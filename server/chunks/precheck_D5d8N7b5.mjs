globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession, canDevelopApps } from "./auth_BzuZOfxt.mjs";
import { validateDefinition } from "./appdef_CL2gHcLM.mjs";
import { g as getAppDesign } from "./external-apps_ppKOQgJW.mjs";
import { p as preflight } from "./preflight_DOMMrfjd.mjs";
import { r as runDraftApp } from "./app-runtime_DrGCpigm.mjs";
import { env } from "cloudflare:workers";
function unitsOf(def) {
  if (Array.isArray(def.screens) && def.screens.length) {
    return def.screens.map((s) => ({ id: s.id, title: s.title || s.id, inputs: s.inputs ?? [], output: s.output }));
  }
  return [{ id: void 0, title: "メイン", inputs: def.inputs ?? [], output: def.output }];
}
function sampleInputs(inputs) {
  const out = {};
  for (const inp of inputs) {
    if (inp.default !== void 0) {
      out[inp.name] = inp.default;
      continue;
    }
    switch (inp.type) {
      case "number":
        out[inp.name] = 1;
        break;
      case "boolean":
        out[inp.name] = true;
        break;
      case "select":
        out[inp.name] = inp.options?.[0] ?? "選択肢";
        break;
      case "file":
        out[inp.name] = { id: "dryrun", name: "sample.txt" };
        break;
      case "signature":
        out[inp.name] = "data:image/png;base64,";
        break;
      default:
        out[inp.name] = `サンプル${inp.label ? "（" + inp.label + "）" : ""}`;
    }
  }
  return out;
}
function screenIds(def) {
  const ids = /* @__PURE__ */ new Set();
  if (Array.isArray(def.screens)) for (const s of def.screens) ids.add(s.id);
  if (!def.screens || !def.screens.length) ids.add("");
  return ids;
}
async function checkDefinition(ctx, def, permissions, spec) {
  const v = validateDefinition(def);
  if (!v.ok) return { key: "definition", label: "アプリ定義", status: "fail", detail: `定義が不正です：${v.issues.slice(0, 2).map((i) => `${i.path}: ${i.message}`).join(" / ") || "詳細不明"}` };
  const pf = await preflight(ctx, { name: def.name, permissions, definition: def }).catch(() => null);
  if (pf && !pf.ok) {
    const bad = pf.checks.filter((c) => c.status === "fail").map((c) => c.label);
    return { key: "definition", label: "アプリ定義・事前確認", status: "fail", detail: `事前確認に課題があります：${bad.join("、") || "詳細は事前確認を参照"}` };
  }
  return { key: "definition", label: "アプリ定義・事前確認", status: "ok", detail: "定義は妥当で、環境・権限・安全・コストの事前確認も通っています。" };
}
function checkTransitions(def) {
  const ids = screenIds(def);
  const problems = [];
  const html = def.render?.html;
  if (typeof html === "string" && html) {
    const called = /* @__PURE__ */ new Set();
    for (const m of html.matchAll(/bo\.run\(\s*['"]([^'"]*)['"]/g)) called.add(m[1]);
    if (called.size && (!def.screens || !def.screens.length)) {
      problems.push("カスタムUIが bo.run を呼びますが、対応する画面（screens）が定義されていません");
    } else {
      for (const id of called) if (id && !ids.has(id)) problems.push(`ボタンが呼ぶ画面「${id}」が存在しません`);
    }
  }
  for (const u of unitsOf(def)) {
    const from = (u.output?.from ?? "").replace(/^\$/, "");
    if (!from || from.startsWith("_")) continue;
    const screen = Array.isArray(def.screens) ? def.screens.find((s) => s.id === u.id) : null;
    const steps = screen?.steps ?? def.steps ?? [];
    const names = /* @__PURE__ */ new Set([...steps.map((s) => s.as).filter(Boolean), ...u.inputs.map((i) => i.name)]);
    if (!names.has(from)) problems.push(`画面「${u.title}」の出力が参照する「$${from}」が見つかりません`);
  }
  if (problems.length) return { key: "transitions", label: "画面遷移・ボタン", status: "fail", detail: problems.slice(0, 4).join("。") };
  return { key: "transitions", label: "画面遷移・ボタン", status: "ok", detail: "ボタンの遷移先・出力の参照先はすべて実在します。" };
}
const SANDBOX_FORBIDDEN = [
  { re: /\blocalStorage\b/, label: "localStorage" },
  { re: /\bsessionStorage\b/, label: "sessionStorage" },
  { re: /\bindexedDB\b/, label: "indexedDB" },
  { re: /document\.cookie/, label: "document.cookie" },
  { re: /\bXMLHttpRequest\b/, label: "XMLHttpRequest" },
  { re: /\bfetch\s*\(/, label: "fetch()" },
  { re: /\bWebSocket\b/, label: "WebSocket" }
];
function checkSandbox(def) {
  const html = def.render?.html;
  if (typeof html !== "string" || !html) return { key: "sandbox", label: "サンドボックス互換", status: "ok", detail: "カスタムUIは使用していません（標準フォーム）。" };
  const hits = SANDBOX_FORBIDDEN.filter((f) => f.re.test(html)).map((f) => f.label);
  if (hits.length) {
    return {
      key: "sandbox",
      label: "サンドボックス互換",
      status: "fail",
      detail: `カスタムUIがサンドボックスで使えないAPIを使用しています：${hits.join(" / ")}。データの保存・取得・通信は画面(screens)経由の bo.run(...) で行ってください（localStorage/cookie/fetch 等は不可）。チャットで「${hits.join("・")}を使わず bo.run 経由に直して」と依頼すると修正できます。`
    };
  }
  return { key: "sandbox", label: "サンドボックス互換", status: "ok", detail: "禁止API（localStorage/fetch 等）の使用は検出されませんでした。" };
}
async function checkRun(ctx, draftId, def, owner) {
  const items = [];
  for (const u of unitsOf(def)) {
    const inputs = sampleInputs(u.inputs);
    try {
      const res = await runDraftApp(ctx, draftId, inputs, owner, u.id, { dryRun: true });
      items.push(res.ok ? { key: `run:${u.id ?? "main"}`, label: `動作確認：${u.title}`, status: "ok", detail: "サンプル入力で処理が最後まで実行できました。" } : { key: `run:${u.id ?? "main"}`, label: `動作確認：${u.title}`, status: "fail", detail: `実行でエラー：${res.error ?? "不明"}${res.code ? `（${res.code}）` : ""}` });
    } catch (e) {
      items.push({ key: `run:${u.id ?? "main"}`, label: `動作確認：${u.title}`, status: "fail", detail: `実行で例外：${e instanceof Error ? e.message : String(e)}` });
    }
  }
  return items;
}
async function loadDraft(ctx, draftId) {
  const d = await getAppDesign(ctx, draftId);
  if (!d || d.source !== "draft" || !d.definition) return null;
  return { def: d.definition, permissions: d.permissions, spec: d.spec };
}
function finalizePrecheck(checks) {
  return { ok: checks.every((c) => c.status !== "fail"), checks };
}
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const ctx = locals.ctx;
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要です" }, 401);
  if (!canDevelopApps(ses.role, ses.ctx)) return json({ error: "アプリ開発の権限がありません（管理者または開発者のみ）" }, 403);
  const b = await request.json().catch(() => ({}));
  const draftId = String(b.draftId ?? "").trim();
  if (!draftId) return json({ error: "draftId が必要" }, 400);
  try {
    await (await import("./external-apps_ppKOQgJW.mjs").then((n) => n.z)).recheckDraft(ctx, draftId);
  } catch {
  }
  const loaded = await loadDraft(ctx, draftId);
  if (!loaded) return json({ error: "生成アプリが見つかりません" }, 404);
  const enc = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const send = (o) => {
    void writer.write(enc.encode(`data: ${JSON.stringify(o)}

`));
  };
  (async () => {
    try {
      const checks = [];
      send({ type: "phase", label: "アプリ定義を確認しています…" });
      const def = await checkDefinition(ctx, loaded.def, loaded.permissions, loaded.spec);
      checks.push(def);
      send({ type: "check", check: def });
      send({ type: "phase", label: "画面遷移・ボタンの参照先を確認しています…" });
      const tr = checkTransitions(loaded.def);
      checks.push(tr);
      send({ type: "check", check: tr });
      const sb = checkSandbox(loaded.def);
      checks.push(sb);
      send({ type: "check", check: sb });
      send({ type: "phase", label: "サンプル入力で動作を確認しています…" });
      const runs = await checkRun(ctx, draftId, loaded.def, ses.uid);
      for (const c of runs) {
        checks.push(c);
        send({ type: "check", check: c });
      }
      const result = finalizePrecheck(checks);
      send({ type: "done", ok: result.ok, checks: result.checks });
    } catch (e) {
      const msg = e?.message ?? String(e);
      await (await import("./diag_DUN9A_L9.mjs")).logDiag(env, "error", "precheck", `失敗(draft=${draftId}): ${msg}`).catch(() => {
      });
      send({ type: "error", error: "動作確認の実行でエラーが発生しました。時間をおいて再度お試しください。" });
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
