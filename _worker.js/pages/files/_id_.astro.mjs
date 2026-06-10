globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../chunks/auth_BDOdme1H.mjs';
import { getFileForSession } from '../../chunks/storage_ComUGkKO.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ params, request, locals }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses) return new Response("ログインが必要", { status: 401 });
  const id = params.id;
  if (!id) return new Response("not found", { status: 404 });
  const f = await getFileForSession(env, id, ses);
  if (!f) return new Response("not found", { status: 404 });
  return new Response(f.buf, {
    headers: {
      "content-type": f.mime,
      "content-disposition": `attachment; filename*=UTF-8''${encodeURIComponent(f.name)}`
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
