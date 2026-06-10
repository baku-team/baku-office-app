globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../chunks/auth_BDOdme1H.mjs';
import { cachedEntitlement } from '../../chunks/client_DjSYVqc9.mjs';
import { backupToDrive, setDriveBackup, syncDriveMetadata } from '../../chunks/drive_DbnKc5k1.mjs';
import '../../chunks/crypto_D21r3Dwx.mjs';
import { atLeast } from '../../chunks/index_Cg172zdv.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return json({ error: "管理者のみ" }, 403);
  if (!atLeast(await cachedEntitlement(env), "plus")) return json({ error: "ドライブ連携は Plus 以上で利用できます" }, 403);
  const b = await request.json().catch(() => ({}));
  switch (b._action) {
    case "sync":
      return json(await syncDriveMetadata(env));
    case "backup_settings":
      await setDriveBackup(env, !!b.enabled);
      return json({ ok: true });
    case "backup_now":
      return json(await backupToDrive(env, 10));
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
