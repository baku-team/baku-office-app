globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth_B7kpU18u.mjs";
import { r as runInstalledApp } from "./app-runtime_DaCpiG4_.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要です" }, 401);
  const b = await request.json().catch(() => ({}));
  if (!b.appId) return json({ error: "appId が必要です" }, 400);
  const res = await runInstalledApp(locals.ctx, b.appId, b.inputs ?? {}, ses.uid);
  return json(res, res.ok ? 200 : 400);
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
