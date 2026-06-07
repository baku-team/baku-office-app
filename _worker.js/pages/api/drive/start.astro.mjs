globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../../chunks/auth_ujH5pbJJ.mjs';
import { driveAuthUrl } from '../../../chunks/drive_Bts8rvS3.mjs';
import { newState } from '../../../chunks/oauth_BQvA0SLc.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ request, locals, url, cookies, redirect }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return new Response("管理者のみ", { status: 403 });
  const authUrl = driveAuthUrl(env, url.origin, (() => {
    const s = newState();
    cookies.set("drive_state", s, { httpOnly: true, secure: true, path: "/", maxAge: 600, sameSite: "lax" });
    return s;
  })());
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
