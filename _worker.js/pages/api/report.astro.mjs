globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../chunks/auth_BDOdme1H.mjs';
import { submitFeedback } from '../../chunks/reports_CSdFXBi2.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要です" }, 401);
  const b = await request.json().catch(() => ({}));
  const r = await submitFeedback(env, { title: b.title, message: String(b.message ?? "") });
  if (!r.ok) return json({ error: r.error }, 400);
  return json({ ok: true });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
