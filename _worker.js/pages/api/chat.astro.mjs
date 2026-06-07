globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../chunks/auth_ujH5pbJJ.mjs';
import { cachedEntitlement } from '../../chunks/client_KUuDosgV.mjs';
import '../../chunks/crypto_BhRWVEcj.mjs';
import { a as atLeast } from '../../chunks/types_sPQFPjY_.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ctx = locals.ctx;
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要" }, 401);
  if (!atLeast(await cachedEntitlement(env), "plus")) return json({ error: "AIチャットは Plus 以上のプランで利用できます" }, 403);
  const b = await request.json().catch(() => ({}));
  const message = (b.message ?? "").trim();
  if (!message) return json({ error: "メッセージが必要" }, 400);
  const reply = await ctx.agent.run({ owner: ses.uid, text: message, role: ses.role, baseUrl: new URL(request.url).origin });
  return json({ ok: true, reply });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
