globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../../chunks/auth_BDOdme1H.mjs';
import { normalizeGroups, googleAuthUrl } from '../../../chunks/google__L4vnQZx.mjs';
import { newState } from '../../../chunks/oauth_BJmQE7w_.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ request, locals, url, cookies, redirect }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return new Response("管理者のみ", { status: 403 });
  const param = url.searchParams.get("groups");
  const groups = normalizeGroups(param ? param.split(",").map((s2) => s2.trim()) : null);
  const s = newState();
  cookies.set("google_state", s, { httpOnly: true, secure: true, path: "/", maxAge: 600, sameSite: "lax" });
  cookies.set("google_groups", groups.join(","), { httpOnly: true, secure: true, path: "/", maxAge: 600, sameSite: "lax" });
  const authUrl = await googleAuthUrl(env, url.origin, s, groups);
  if (!authUrl) return new Response("Google OAuth が未設定です（GOOGLE_CLIENT_ID/SECRET）。", { status: 400 });
  return redirect(authUrl, 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
