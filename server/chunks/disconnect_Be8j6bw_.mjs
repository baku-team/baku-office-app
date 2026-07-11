globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth_qjtEFOY-.mjs";
import { notionWorkspace, disconnectNotion } from "./notion-oauth_DtxO8Ow9.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const GET = async ({ request }) => {
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin") return json({ error: "管理者のみ" }, 403);
  const w = await notionWorkspace(env);
  return json({ ok: true, connected: !!w, workspace: w });
};
const POST = async ({ request }) => {
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin") return json({ error: "管理者のみ" }, 403);
  await disconnectNotion(env);
  return json({ ok: true, message: "Notion 連携を解除しました。Notion 側の接続も解除するには、Notion の Settings → Connections から baku-office の連携を削除してください。" });
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
