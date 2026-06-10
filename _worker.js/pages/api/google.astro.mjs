globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../chunks/auth_BDOdme1H.mjs';
import { disconnectGoogle, googleStatus } from '../../chunks/google__L4vnQZx.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return json({ error: "管理者のみ" }, 403);
  const b = await request.json().catch(() => ({}));
  if (b._action === "disconnect") {
    await disconnectGoogle(env);
    return json({ ok: true });
  }
  if (b._action === "status") {
    return json({ ok: true, ...await googleStatus(env) });
  }
  return json({ error: "不明な操作" }, 400);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
