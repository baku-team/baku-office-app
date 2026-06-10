globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../chunks/auth_BDOdme1H.mjs';
import { setRole, rejectUser, approveUser, createInvite } from '../../chunks/users_D80O6cuB.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return json({ error: "権限がありません" }, 403);
  const b = await request.json().catch(() => ({}));
  switch (b._action) {
    case "invite": {
      const code = await createInvite(env, ses.uid, b.role ?? "member");
      return json({ ok: true, code });
    }
    case "approve":
      if (b.id) await approveUser(env, b.id);
      return json({ ok: true });
    case "reject":
      if (b.id) await rejectUser(env, b.id);
      return json({ ok: true });
    case "role":
      if (b.id && b.role) await setRole(env, b.id, b.role);
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
