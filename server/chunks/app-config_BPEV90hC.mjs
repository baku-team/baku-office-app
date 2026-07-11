globalThis.process ??= {};
globalThis.process.env ??= {};
import { requireOrgAdmin } from "./auth_DrSavdul.mjs";
import { env } from "cloudflare:workers";
import { a as activeAppDefinition } from "./external-apps_CKPNCc45.mjs";
import { l as loadAppConfig } from "./app-runtime_CanD1w9d.mjs";
import { nowSec } from "./client_BNXMhaMG.mjs";
const prerender = false;
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json" } });
const scopeOf = (dataScope, uid) => dataScope === "shared" ? "__shared__" : uid;
function extractSheetId(input) {
  const m = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : input;
}
const GET = async ({ request, locals }) => {
  const ses = await requireOrgAdmin(env, request);
  if (!ses) return json({ error: "管理者のみ" }, 403);
  const appId = (new URL(request.url).searchParams.get("appId") ?? "").trim();
  if (!appId) return json({ error: "appId が必要です。" }, 400);
  const app = await activeAppDefinition(locals.ctx, appId);
  const def = app?.definition ?? {};
  const fields = Array.isArray(def.configFields) ? def.configFields : [];
  const values = fields.length ? await loadAppConfig(locals.ctx, appId, ses.uid, def.dataScope) : {};
  return json({ fields, values });
};
const POST = async ({ request, locals }) => {
  const ses = await requireOrgAdmin(env, request);
  if (!ses) return json({ error: "管理者のみ" }, 403);
  const b = await request.json().catch(() => ({}));
  const appId = (b.appId ?? "").trim();
  const key = (b.key ?? "").trim();
  if (!appId || !key) return json({ error: "appId・key が必要です。" }, 400);
  const app = await activeAppDefinition(locals.ctx, appId);
  const def = app?.definition ?? {};
  const field = (Array.isArray(def.configFields) ? def.configFields : []).find((f) => f.key === key);
  if (!field) return json({ error: "未宣言の設定キーです。" }, 400);
  let value = String(b.value ?? "").trim();
  if (field.type === "google_sheet") value = extractSheetId(value);
  await locals.ctx.db.run(
    "INSERT INTO app_config (app_id, scope_owner, key, value, updated_at) VALUES (?,?,?,?,?) ON CONFLICT(app_id,scope_owner,key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at",
    [appId, scopeOf(def.dataScope, ses.uid), key, value, nowSec()]
  );
  return json({ ok: true, key, value });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
