globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../chunks/auth_BDOdme1H.mjs';
import { cachedEntitlement } from '../../chunks/client_DjSYVqc9.mjs';
import { simulateImport, runImport } from '../../chunks/import_DCVYRTm3.mjs';
import '../../chunks/crypto_D21r3Dwx.mjs';
import { atLeast } from '../../chunks/index_Cg172zdv.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return json({ error: "管理者のみ" }, 403);
  if (!atLeast(await cachedEntitlement(env), "plus")) return json({ error: "インポートは Plus 以上で利用できます" }, 403);
  const b = await request.json().catch(() => ({}));
  const source = b.source === "notion" ? "notion" : "drive";
  const withFiles = !!b.withFiles;
  if (b._action === "simulate") return json(await simulateImport(env, source, withFiles));
  if (b._action === "run") return json(await runImport(env, source, withFiles));
  return json({ error: "不明な操作" }, 400);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
