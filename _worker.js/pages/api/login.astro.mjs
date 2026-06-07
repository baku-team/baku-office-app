globalThis.process ??= {}; globalThis.process.env ??= {};
import { makeSessionCookie, sessionExp, clearSessionCookie } from '../../chunks/auth_ujH5pbJJ.mjs';
import { authLocal } from '../../chunks/users_0t-xyk3J.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200, headers = {}) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", ...headers } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const b = await request.json().catch(() => ({}));
  if (b.mode === "org") {
    if (env.HOST_BASE_URL || env.VERIFY_PUBLIC_JWK) return json({ error: "本番では Google でログインしてください" }, 403);
    const cookie = await makeSessionCookie(env, { uid: "org", role: "admin", ctx: "org", name: "組織管理者", exp: sessionExp() });
    return json({ ok: true, role: "admin", ctx: "org" }, 200, { "set-cookie": cookie });
  }
  if (b.mode === "local" && b.loginId && b.password) {
    const u = await authLocal(env, b.loginId, b.password);
    if (!u) return json({ error: "IDまたはパスワードが違うか、未承認です" }, 401);
    const cookie = await makeSessionCookie(env, { uid: u.id, role: u.role, ctx: "personal", exp: sessionExp() });
    return json({ ok: true, role: u.role, ctx: "personal" }, 200, { "set-cookie": cookie });
  }
  return json({ error: "mode が不正" }, 400);
};
const DELETE = async () => json({ ok: true }, 200, { "set-cookie": clearSessionCookie() });

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
