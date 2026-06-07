globalThis.process ??= {}; globalThis.process.env ??= {};
import { getApiKey } from '../../../chunks/client_KUuDosgV.mjs';
import { p as processSummaryJobs, l as linePush } from '../../../chunks/agent_BOTs072p.mjs';
import { d as dueReminders, m as markReminderDone } from '../../../chunks/index_C4EjYe4c.mjs';
import { pollVideoJobs } from '../../../chunks/capabilities_oVBZTYrp.mjs';
import { guardHeavy } from '../../../chunks/diag_D3atJWnJ.mjs';
import { getDriveBackup, backupToDrive } from '../../../chunks/drive_Bts8rvS3.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  if (!env.INTERNAL_KEY || request.headers.get("x-internal-key") !== env.INTERNAL_KEY) return json({ error: "forbidden" }, 403);
  const g = await guardHeavy(env, "summary jobs", () => processSummaryJobs(env));
  const summarized = g.ok ? g.value : 0;
  const accessToken = await getApiKey(env, "line_token");
  const vr = await guardHeavy(env, "video jobs", () => pollVideoJobs(env, accessToken ?? void 0));
  const video = vr.ok ? vr.value : { done: 0, pending: 0 };
  let sent = 0;
  if (accessToken) {
    for (const r of await dueReminders(locals.ctx)) {
      const userId = r.owner.startsWith("line:") ? r.owner.slice(5) : null;
      if (userId) {
        await linePush(accessToken, userId, `⏰ リマインド：${r.content}`);
        sent++;
      }
      await markReminderDone(locals.ctx, r.id);
    }
  }
  let driveBackup = { uploaded: 0 };
  if ((await getDriveBackup(env)).enabled) {
    const dr = await guardHeavy(env, "drive backup", () => backupToDrive(env, 5));
    if (dr.ok) driveBackup = dr.value;
  }
  return json({ ok: true, sent, summarized, video, driveBackup });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
