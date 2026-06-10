globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession, canAccess } from '../../chunks/auth_BDOdme1H.mjs';
import { deleteMember, updateMember, createMember } from '../../chunks/membership_uodjYAu6.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses || ses.ctx !== "org") return json({ error: "組織ログインが必要" }, 403);
  if (!canAccess(ses.role, "accounting")) return json({ error: "会計担当または管理者のみ" }, 403);
  const b = await request.json().catch(() => ({}));
  switch (b._action) {
    case "create":
      if (!b.name) return json({ error: "氏名が必要" }, 400);
      return json({ ok: true, id: await createMember(env, { name: b.name, contact: b.contact, fee_status: b.fee_status, paid_at: b.paid_at, extra: b.extra }) });
    case "update":
      if (!b.id) return json({ error: "id が必要" }, 400);
      await updateMember(env, b.id, { name: b.name, contact: b.contact, fee_status: b.fee_status, paid_at: b.paid_at, extra: b.extra });
      return json({ ok: true });
    case "delete":
      if (b.id) await deleteMember(env, b.id);
      return json({ ok: true });
    default:
      return json({ error: "不明な操作" }, 400);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
