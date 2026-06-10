globalThis.process ??= {}; globalThis.process.env ??= {};
import { getApiKey } from '../../../chunks/client_DjSYVqc9.mjs';
import { l as linePush } from '../../../chunks/agent_sOGRQKT2.mjs';
import { p as processSummaryJobs, d as dueReminders, m as markReminderDone } from '../../../chunks/invoices_DUrRkHPD.mjs';
import { pollVideoJobs } from '../../../chunks/capabilities_Bq8GiFu1.mjs';
import { processAgentJobs } from '../../../chunks/agent-jobs_DNK28iqQ.mjs';
import { guardHeavy } from '../../../chunks/diag_v9I7g07l.mjs';
import { getDriveBackup, backupToDrive } from '../../../chunks/drive_DbnKc5k1.mjs';
import { flushReports } from '../../../chunks/reports_CSdFXBi2.mjs';
import { addNotification, pushWebhook } from '../../../chunks/notifications_oZ5Z7H91.mjs';
import { getNotifyWebhook } from '../../../chunks/settings_DSJfWsdt.mjs';
import { purgeFiles } from '../../../chunks/storage_ComUGkKO.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  if (!env.INTERNAL_KEY || request.headers.get("x-internal-key") !== env.INTERNAL_KEY) return json({ error: "forbidden" }, 403);
  const g = await guardHeavy(env, "summary jobs", () => processSummaryJobs(env));
  const summarized = g.ok ? g.value : 0;
  const aj = await guardHeavy(env, "agent jobs", () => processAgentJobs(locals.ctx, new URL(request.url).origin));
  const agentJobs = aj.ok ? aj.value : 0;
  const accessToken = await getApiKey(env, "line_token");
  const vr = await guardHeavy(env, "video jobs", () => pollVideoJobs(env, accessToken ?? void 0));
  const video = vr.ok ? vr.value : { done: 0, pending: 0 };
  let sent = 0, notified = 0;
  const notifyWebhook = await getNotifyWebhook(env);
  for (const r of await dueReminders(locals.ctx)) {
    const userId = r.owner.startsWith("line:") ? r.owner.slice(5) : null;
    if (userId) {
      if (!accessToken) continue;
      await linePush(accessToken, userId, `⏰ リマインド：${r.content}`);
      sent++;
    } else {
      await addNotification(locals.ctx, { owner: r.owner, kind: "reminder", body: `⏰ ${r.content}`, link: "/invoices" });
      if (notifyWebhook) await pushWebhook(notifyWebhook, `⏰ リマインド：${r.content}`).catch(() => {
      });
      notified++;
    }
    await markReminderDone(locals.ctx, r.id);
  }
  let driveBackup = { uploaded: 0 };
  if ((await getDriveBackup(env)).enabled) {
    const dr = await guardHeavy(env, "drive backup", () => backupToDrive(env, 5));
    if (dr.ok) driveBackup = dr.value;
  }
  const fr = await guardHeavy(env, "flush reports", () => flushReports(env));
  const reportsSent = fr.ok ? fr.value : 0;
  const pf = await guardHeavy(env, "purge files", () => purgeFiles(env));
  const purged = pf.ok ? pf.value : { expired: 0, purged: 0 };
  return json({ ok: true, sent, notified, summarized, video, agentJobs, driveBackup, reportsSent, purged });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
