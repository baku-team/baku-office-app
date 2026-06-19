globalThis.process ??= {};
globalThis.process.env ??= {};
import { getApiKey, getToken, hostFetch, getVerifyJwk } from "./client_DQhV0ghx.mjs";
import { v as verifyEnvelope, i as importVerifyKey, p as payloadOf, r as randomId } from "./stripe_r-RFTlbb.mjs";
import { n as nowSec } from "./accounting_CtvChRxg.mjs";
import { ALLOWED_PERMISSIONS, PRIVILEGED_PERMISSIONS } from "./apps_B4dUPQYx.mjs";
import { getStorageUsage } from "./storage-usage_Cf8x-KCR.mjs";
import { getLimits, monthUsd, estimateUsd } from "./usage_C0o2RuAe.mjs";
const APP_SCHEMA = "baku.app/1";
const OP_PERMISSION = {
  "ai.infer": "ai",
  "transform": null,
  "file.save": "storage:write",
  "file.read": "storage:read",
  "db.query": "db:read",
  "db.write": "db:write",
  "http.fetch": "net"
};
const ALL_OPS = Object.keys(OP_PERMISSION);
const INPUT_TYPES = ["text", "textarea", "number", "boolean", "select", "file"];
const DESTRUCTIVE_SQL = /\b(drop\s+table|delete\s+from|truncate|alter\s+table|attach\s+database|pragma|create\s+table|update\s+\w+\s+set(?![^;]*\bwhere\b))/i;
const IDENT = /^[a-zA-Z][a-zA-Z0-9_]*$/;
const opCatalogText = () => ALL_OPS.map((op) => `${op}${OP_PERMISSION[op] ? `（要 ${OP_PERMISSION[op]}）` : "（権限不要）"}`).join("、");
function hostOf(url) {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
function isBlockedHost(host) {
  const h = host.toLowerCase().replace(/:\d+$/, "").replace(/^\[|\]$/g, "");
  if (h === "localhost" || h === "::1" || h === "0.0.0.0" || h === "metadata.google.internal") return true;
  if (h.endsWith(".local") || h.endsWith(".internal") || h.endsWith(".localhost")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  return false;
}
function validateDefinition(input) {
  const issues = [];
  const required = /* @__PURE__ */ new Set();
  const add = (path, message) => issues.push({ path, message });
  if (typeof input !== "object" || input === null) {
    return { ok: false, issues: [{ path: "", message: "定義がオブジェクトではありません。" }], requiredPermissions: [] };
  }
  const d = input;
  if (d.schema !== APP_SCHEMA) add("schema", `schema は "${APP_SCHEMA}" である必要があります。`);
  if (typeof d.id !== "string" || !d.id.trim()) add("id", "id が必要です。");
  if (typeof d.name !== "string" || !d.name.trim()) add("name", "name が必要です。");
  if (typeof d.version !== "string" || !/^\d+\.\d+\.\d+$/.test(d.version ?? "")) add("version", "version は semver（例 0.1.0）で指定してください。");
  const declared = Array.isArray(d.permissions) ? d.permissions : [];
  for (const p of declared) if (!ALLOWED_PERMISSIONS.has(p)) add("permissions", `未知/不許可の権限：${p}`);
  const inputNames = /* @__PURE__ */ new Set();
  if (!Array.isArray(d.inputs)) add("inputs", "inputs は配列である必要があります。");
  else d.inputs.forEach((inp, i) => {
    if (!inp || typeof inp !== "object") {
      add(`inputs[${i}]`, "入力定義が不正です。");
      return;
    }
    if (typeof inp.name !== "string" || !IDENT.test(inp.name)) add(`inputs[${i}].name`, "name は識別子（英字始まり）で指定してください。");
    else inputNames.add(inp.name);
    if (!INPUT_TYPES.includes(inp.type)) add(`inputs[${i}].type`, `type は ${INPUT_TYPES.join("/")} のいずれか。`);
    if (inp.type === "select" && (!Array.isArray(inp.options) || inp.options.length === 0)) add(`inputs[${i}].options`, "select には options が必要です。");
  });
  const bound = new Set(inputNames);
  const refOk = (ref) => typeof ref === "string" && (!ref.startsWith("$") || bound.has(ref.slice(1)));
  if (!Array.isArray(d.steps) || d.steps.length === 0) add("steps", "steps は1つ以上必要です。");
  else d.steps.forEach((s, i) => {
    const at = `steps[${i}]`;
    if (!s || typeof s !== "object" || !ALL_OPS.includes(s.op)) {
      add(at, `op は次のいずれか：${ALL_OPS.join("/")}`);
      return;
    }
    const perm = OP_PERMISSION[s.op];
    if (perm) {
      required.add(perm);
      if (!declared.includes(perm)) add(`${at}.op`, `op ${s.op} には権限 ${perm} の宣言が必要です。`);
    }
    switch (s.op) {
      case "ai.infer":
        if (typeof s.prompt !== "string" || !s.prompt.trim()) add(`${at}.prompt`, "ai.infer には prompt が必要です。");
        for (const a of s.attach ?? []) if (!refOk(a)) add(`${at}.attach`, `未定義の参照：${a}`);
        break;
      case "transform":
        if (typeof s.template !== "string" && typeof s.path !== "string") add(at, "transform は template か path が必要です。");
        if (s.from !== void 0 && !refOk(s.from)) add(`${at}.from`, `未定義の参照：${s.from}`);
        break;
      case "file.save":
        if (!refOk(s.from)) add(`${at}.from`, "file.save には保存元 from（参照）が必要です。");
        if (typeof s.filename !== "string" || !s.filename.trim()) add(`${at}.filename`, "file.save には filename が必要です。");
        break;
      case "file.read":
        if (!refOk(s.fileId)) add(`${at}.fileId`, "file.read には fileId（参照）が必要です。");
        break;
      case "db.query":
        if (typeof s.sql !== "string" || !/^\s*select\b/i.test(s.sql)) add(`${at}.sql`, "db.query は SELECT 文のみ許可されます。");
        break;
      case "db.write":
        if (typeof s.sql !== "string" || !s.sql.trim()) add(`${at}.sql`, "db.write には sql が必要です。");
        else if (DESTRUCTIVE_SQL.test(s.sql)) add(`${at}.sql`, "破壊的SQL（DROP/DELETE/TRUNCATE/ALTER/WHERE無しUPDATE 等）は許可されません。");
        break;
      case "http.fetch": {
        if (typeof s.url !== "string" || !/^https:\/\//.test(s.url)) add(`${at}.url`, "http.fetch の url は https のみ許可されます。");
        else {
          const host = hostOf(s.url);
          const allow = Array.isArray(d.allowHosts) ? d.allowHosts : [];
          if (!host || !allow.includes(host)) add(`${at}.url`, `送信先 ${host ?? s.url} は allowHosts に未登録です。`);
          else if (isBlockedHost(host)) add(`${at}.url`, `内部/ローカルのホストへは送信できません：${host}`);
        }
        break;
      }
    }
    if (typeof s.as === "string") {
      if (!IDENT.test(s.as)) add(`${at}.as`, "as は識別子で指定してください。");
      else bound.add(s.as);
    }
  });
  if (required.has("net") && (!Array.isArray(d.allowHosts) || d.allowHosts.length === 0)) add("allowHosts", "http.fetch（net）を使うには allowHosts の宣言が必要です。");
  for (const ah of d.allowHosts ?? []) if (isBlockedHost(ah)) add("allowHosts", `内部/ローカルのホストは許可できません：${ah}`);
  if (!d.output || typeof d.output !== "object") add("output", "output が必要です。");
  else {
    if (!["text", "file", "table"].includes(d.output.type)) add("output.type", "output.type は text/file/table のいずれか。");
    if (!refOk(d.output.from)) add("output.from", `未定義の参照：${d.output.from}`);
  }
  return { ok: issues.length === 0, issues, requiredPermissions: [...required] };
}
const DESTRUCTIVE = /\b(drop\s+table|delete\s+from|truncate|alter\s+table|attach\s+database|pragma|update\s+\w+\s+set(?![^;]*\bwhere\b))/i;
async function preflight(ctx, d) {
  const env = ctx.env;
  const perms = d.permissions ?? [];
  const defStr = typeof d.definition === "string" ? d.definition : JSON.stringify(d.definition ?? "");
  const checks = [];
  const structured = d.definition && typeof d.definition === "object" && d.definition.schema === APP_SCHEMA ? validateDefinition(d.definition) : null;
  const isPermIssue = (i) => i.path === "permissions" || i.path.endsWith(".op");
  const defPermIssues = structured ? structured.issues.filter(isPermIssue) : [];
  const defSafetyIssues = structured ? structured.issues.filter((i) => !isPermIssue(i)) : [];
  const fmtIssues = (xs) => xs.slice(0, 4).map((i) => `${i.path || "定義"}: ${i.message}`).join(" / ");
  const needsAi = perms.includes("ai") || perms.includes("agent");
  const hasAi = needsAi ? !!await getApiKey(env, "gemini") || !!await getApiKey(env, "claude") || !!env.LOCAL_AI_BASE_URL : true;
  const storage = await getStorageUsage(env).catch(() => []);
  const near = storage.filter((s) => s.enabled && s.limit > 0 && s.used >= 0 && s.used / s.limit >= 0.9);
  if (needsAi && !hasAi) checks.push({ key: "env", label: "環境確認", status: "fail", detail: "AI能力が必要ですが Gemini/Claude/ローカルLLM のいずれも未設定です。" });
  else if (near.length) checks.push({ key: "env", label: "環境確認", status: "warn", detail: `容量が逼迫しています（90%超）：${near.map((s) => s.key.toUpperCase()).join(", ")}。` });
  else checks.push({ key: "env", label: "環境確認", status: "ok", detail: "この環境で実行可能・容量に余裕あり。" });
  const isAdmin = d.role === "admin";
  const unknown = perms.filter((p) => !ALLOWED_PERMISSIONS.has(p));
  const priv = perms.filter((p) => PRIVILEGED_PERMISSIONS.has(p));
  if (unknown.length || defPermIssues.length) checks.push({ key: "permission", label: "権限確認", status: "fail", detail: [unknown.length ? `未知/不許可の権限：${unknown.join(", ")}` : "", defPermIssues.length ? fmtIssues(defPermIssues) : ""].filter(Boolean).join(" / ") + "（破壊的・特権操作はアプリに付与されません）。" });
  else if (priv.length && !isAdmin) checks.push({ key: "permission", label: "権限確認", status: "warn", detail: `管理者承認が必要な権限を含みます：${priv.join(", ")}。` });
  else if (priv.length) checks.push({ key: "permission", label: "権限確認", status: "ok", detail: `管理者権限で実行中のため、影響の大きい権限（${priv.join(", ")}）も承認なしで付与できます。` });
  else checks.push({ key: "permission", label: "権限確認", status: "ok", detail: "クライアント権限内で実行可能。" });
  if (structured ? defSafetyIssues.length > 0 : DESTRUCTIVE.test(defStr)) checks.push({ key: "safety", label: "安全確認", status: "fail", detail: structured ? `定義に不備があります：${fmtIssues(defSafetyIssues)}` : "破壊的操作の痕跡（DROP/DELETE/TRUNCATE/ALTER/WHERE無しUPDATE 等）を検出しました。" });
  else if (perms.includes("net")) checks.push({ key: "safety", label: "安全確認", status: "warn", detail: "外部送信（net）を含みます。送信先 allowlist と内容を要確認。" });
  else checks.push({ key: "safety", label: "安全確認", status: "ok", detail: "DB/ストレージへの破壊的操作なし（スコープ済み ctx・owner 限定で動作）。" });
  const tokens = d.estTokens && d.estTokens > 0 ? d.estTokens : Math.min(2e4, Math.ceil(defStr.length / 3) + 2e3);
  const limits = await getLimits(env).catch(() => ({}));
  const month = await monthUsd(env).catch(() => ({}));
  const estJobUsd = Math.max(estimateUsd(env, "claude", tokens, tokens), estimateUsd(env, "gemini", tokens, tokens));
  const usdCap = limits.gemini?.monthlyUsdCap ?? limits.claude?.monthlyUsdCap;
  const usedUsd = (month.gemini ?? 0) + (month.claude ?? 0);
  const fmtUsd = (n) => "$" + n.toFixed(n < 1 ? 4 : 2);
  let costStatus = "ok";
  let costDetail = `推定消費 ~${tokens.toLocaleString()} tokens/実行（推定 ~${fmtUsd(estJobUsd)}）。`;
  if (usdCap && usdCap > 0) {
    const remain = usdCap - usedUsd;
    costDetail += ` 当月予算 残り ~${fmtUsd(Math.max(0, remain))}/${fmtUsd(usdCap)}。`;
    if (remain <= 0) {
      costStatus = "fail";
      costDetail += " 予算超過のため実行不可。";
    } else if (estJobUsd > remain) {
      costStatus = "warn";
      costDetail += " 1実行で予算を超える可能性。";
    }
  } else {
    costDetail += " 月次の費用上限は［高度なオプション → API使用量］で設定・確認できます。";
  }
  checks.push({ key: "cost", label: "コスト計算", status: costStatus, detail: costDetail });
  return { ok: checks.every((c) => c.status !== "fail"), checks };
}
async function fetchAndInstall(ctx, id) {
  const env = ctx.env;
  const token = await getToken(env);
  if (!token) return { ok: false, error: "ライセンス未取得" };
  let r;
  try {
    r = await hostFetch(env, "/api/registry/fetch", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token, id }) });
  } catch {
    return { ok: false, error: "ホストへ接続できません" };
  }
  if (!r.ok) {
    const j2 = await r.json().catch(() => ({}));
    return { ok: false, error: j2.error ?? "取得に失敗しました（承認済み・プラン充足が必要）" };
  }
  const j = await r.json().catch(() => ({}));
  if (!j.pkg) return { ok: false, error: "パッケージがありません" };
  const jwk = await getVerifyJwk(env);
  if (!jwk) return { ok: false, error: "検証鍵を取得できません" };
  let envlp;
  try {
    envlp = JSON.parse(atob(j.pkg));
  } catch {
    return { ok: false, error: "パッケージ形式が不正" };
  }
  if (!await verifyEnvelope(await importVerifyKey(jwk), envlp)) return { ok: false, error: "署名検証に失敗（改竄の可能性）" };
  const p = payloadOf(envlp);
  if (!p.id || !p.exp || p.exp < nowSec()) return { ok: false, error: "パッケージの有効期限切れ" };
  const now = nowSec();
  await ctx.db.run(
    `INSERT INTO app_versions (app_id,version,definition,permissions,source,created_at) VALUES (?,?,?,?, 'store', ?)
     ON CONFLICT(app_id,version) DO UPDATE SET definition=excluded.definition,permissions=excluded.permissions`,
    [p.id, p.version, p.definition != null ? JSON.stringify(p.definition) : null, JSON.stringify(p.permissions ?? []), now]
  );
  await ctx.db.run(
    `INSERT INTO external_apps (id,name,version,category,description,permissions,definition,active_version,source,installed_at) VALUES (?,?,?,?,?,?,?,?, 'store', ?)
     ON CONFLICT(id) DO UPDATE SET name=excluded.name,version=excluded.version,category=excluded.category,
       description=excluded.description,permissions=excluded.permissions,definition=excluded.definition,active_version=excluded.active_version,source='store',installed_at=excluded.installed_at`,
    [p.id, p.name, p.version, p.category ?? null, p.description ?? null, JSON.stringify(p.permissions ?? []), p.definition != null ? JSON.stringify(p.definition) : null, p.version, now]
  );
  return { ok: true };
}
async function listExternalApps(ctx) {
  const results = await ctx.db.all("SELECT id,name,version,category,description,permissions FROM external_apps ORDER BY installed_at DESC");
  return results.map((r) => ({ ...r, permissions: JSON.parse(r.permissions || "[]") }));
}
async function uninstallExternal(ctx, id) {
  await ctx.db.run("DELETE FROM external_apps WHERE id=?", [id]);
}
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "app-" + randomId(3);
async function createDraft(ctx, d, by) {
  const id = slug(d.name);
  const pf = await preflight(ctx, { permissions: d.permissions, definition: d.definition, estTokens: d.estTokens, role: d.role });
  const gate = pf.ok ? "ready" : "blocked";
  await ctx.db.run(
    `INSERT INTO app_drafts (id,name,version,description,spec,permissions,definition,est_tokens,preflight,gate_status,changelog,status,created_by,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?, 'pending', ?, ?)
     ON CONFLICT(id) DO UPDATE SET name=excluded.name,version=excluded.version,description=excluded.description,spec=excluded.spec,
       permissions=excluded.permissions,definition=excluded.definition,est_tokens=excluded.est_tokens,preflight=excluded.preflight,gate_status=excluded.gate_status,changelog=excluded.changelog,status='pending'`,
    [id, d.name, d.version ?? "0.1.0", d.description ?? null, d.spec ?? null, JSON.stringify(d.permissions ?? []), d.definition != null ? JSON.stringify(d.definition) : null, d.estTokens ?? null, JSON.stringify(pf), gate, d.changelog ?? null, by ?? null, nowSec()]
  );
  return { id, preflight: pf, gate };
}
async function installLocalApp(ctx, draftId, by) {
  const d = await ctx.db.first("SELECT id,name,version,category,description,permissions,definition,changelog,gate_status FROM app_drafts WHERE id=?", [draftId]);
  if (!d) return { ok: false, error: "草案が見つかりません" };
  if (d.gate_status !== "ready") return { ok: false, error: "事前確認（環境/権限/安全/コスト）に未通過のため有効化できません。" };
  const now = nowSec();
  await ctx.db.run(
    `INSERT INTO app_versions (app_id,version,definition,permissions,changelog,source,created_by,created_at) VALUES (?,?,?,?,?,'local',?,?)
     ON CONFLICT(app_id,version) DO UPDATE SET definition=excluded.definition,permissions=excluded.permissions,changelog=excluded.changelog`,
    [d.id, d.version, d.definition, d.permissions, d.changelog, by ?? null, now]
  );
  await ctx.db.run(
    `INSERT INTO external_apps (id,name,version,category,description,permissions,definition,active_version,source,installed_at) VALUES (?,?,?,?,?,?,?,?, 'local', ?)
     ON CONFLICT(id) DO UPDATE SET name=excluded.name,version=excluded.version,category=excluded.category,description=excluded.description,permissions=excluded.permissions,definition=excluded.definition,active_version=excluded.active_version,source='local',installed_at=excluded.installed_at`,
    [d.id, d.name, d.version, d.category, d.description, d.permissions, d.definition, d.version, now]
  );
  return { ok: true, version: d.version };
}
async function appVersions(ctx, appId) {
  const rows = await ctx.db.all(
    "SELECT app_id,version,definition,permissions,changelog,source,created_by,created_at FROM app_versions WHERE app_id=? ORDER BY created_at DESC",
    [appId]
  );
  return rows.map((r) => ({ ...r, definition: r.definition ? JSON.parse(r.definition) : null, permissions: JSON.parse(r.permissions || "[]") }));
}
async function activateAppVersion(ctx, appId, version) {
  const v = await ctx.db.first("SELECT definition,permissions FROM app_versions WHERE app_id=? AND version=?", [appId, version]);
  if (!v) return { ok: false, error: "指定の版が見つかりません" };
  await ctx.db.run("UPDATE external_apps SET active_version=?, version=?, definition=?, permissions=? WHERE id=?", [version, version, v.definition, v.permissions, appId]);
  return { ok: true };
}
async function deleteLocalApp(ctx, appId) {
  await ctx.db.run("DELETE FROM external_apps WHERE id=?", [appId]);
  await ctx.db.run("DELETE FROM app_versions WHERE app_id=?", [appId]);
}
async function installedAppDefs(ctx) {
  const rows = await ctx.db.all("SELECT id,name,description,definition FROM external_apps WHERE definition IS NOT NULL");
  const out = [];
  for (const r of rows) {
    try {
      const def = JSON.parse(r.definition);
      if (def?.schema) out.push({ id: r.id, name: r.name, description: r.description, definition: def });
    } catch {
    }
  }
  return out;
}
async function activeAppDefinition(ctx, appId) {
  const r = await ctx.db.first("SELECT name,version,permissions,definition FROM external_apps WHERE id=?", [appId]);
  if (!r) return null;
  return { name: r.name, version: r.version, permissions: JSON.parse(r.permissions || "[]"), definition: r.definition ? JSON.parse(r.definition) : null };
}
async function listDrafts(ctx) {
  const results = await ctx.db.all("SELECT id,name,version,description,spec,permissions,status,gate_status,preflight FROM app_drafts ORDER BY created_at DESC");
  return results.map((r) => ({ ...r, permissions: JSON.parse(r.permissions || "[]"), preflight: r.preflight ? JSON.parse(r.preflight) : null }));
}
async function deleteDraft(ctx, id) {
  await ctx.db.run("DELETE FROM app_drafts WHERE id=?", [id]);
}
async function submitDraft(ctx, id) {
  const env = ctx.env;
  const d = await ctx.db.first("SELECT * FROM app_drafts WHERE id=?", [id]);
  if (!d) return { ok: false, error: "ドラフトが見つかりません" };
  if (d.gate_status !== "ready") return { ok: false, error: "事前確認（環境/権限/安全/コスト）に未通過のため公開申請できません。" };
  const token = await getToken(env);
  if (!token) return { ok: false, error: "ライセンス未取得" };
  const app = { id: d.id, name: d.name, version: d.version, description: d.description, permissions: JSON.parse(d.permissions || "[]"), definition: d.definition ? JSON.parse(d.definition) : null };
  let r;
  try {
    r = await hostFetch(env, "/api/registry/submit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token, app }) });
  } catch {
    return { ok: false, error: "ホストへ接続できません" };
  }
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    return { ok: false, error: j.error ?? "申請に失敗" };
  }
  await ctx.db.run("UPDATE app_drafts SET status='submitted' WHERE id=?", [id]);
  return { ok: true };
}
const externalApps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activateAppVersion,
  activeAppDefinition,
  appVersions,
  createDraft,
  deleteDraft,
  deleteLocalApp,
  fetchAndInstall,
  installLocalApp,
  installedAppDefs,
  listDrafts,
  listExternalApps,
  submitDraft,
  uninstallExternal
}, Symbol.toStringTag, { value: "Module" }));
export {
  APP_SCHEMA as A,
  activeAppDefinition as a,
  listDrafts as b,
  installLocalApp as c,
  deleteDraft as d,
  appVersions as e,
  fetchAndInstall as f,
  activateAppVersion as g,
  deleteLocalApp as h,
  isBlockedHost as i,
  createDraft as j,
  installedAppDefs as k,
  listExternalApps as l,
  externalApps as m,
  opCatalogText as o,
  submitDraft as s,
  uninstallExternal as u,
  validateDefinition as v
};
