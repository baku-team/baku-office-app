globalThis.process ??= {}; globalThis.process.env ??= {};
import { createMember } from '../../../chunks/membership_DUxPJliV.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const b = await request.json().catch(() => ({}));
  const name = (b.name ?? "").trim();
  if (!name) return json({ error: "お名前が必要です" }, 400);
  if (name.length > 100) return json({ error: "入力が長すぎます" }, 400);
  await createMember(env, { name, contact: (b.contact ?? "").slice(0, 200), fee_status: "unpaid", extra: "公開フォームからの申込" });
  return json({ ok: true });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
