globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as randomId } from "./stripe_r-RFTlbb.mjs";
import { getToken, APP_VERSION, hostFetch } from "./client_RgvQ0ags.mjs";
import { n as nowSec } from "./accounting_D4tRmfws.mjs";
async function enqueueReport(env, r) {
  try {
    const ctxCap = r.category === "app-report" ? 16e3 : 2e3;
    await env.DB.prepare(
      "INSERT INTO client_report_outbox (id,kind,severity,category,title,message,context,fingerprint,created_at) VALUES (?,?,?,?,?,?,?,?,?)"
    ).bind(randomId(), r.kind, r.severity ?? null, r.category ?? null, r.title ?? null, r.message.slice(0, 2e3), (r.context ?? "").slice(0, ctxCap) || null, r.fingerprint ?? null, nowSec()).run();
  } catch {
  }
}
async function flushReports(env, limit = 25) {
  const token = await getToken(env);
  if (!token) return 0;
  const { results } = await env.DB.prepare(
    "SELECT id,kind,severity,category,title,message,context,fingerprint FROM client_report_outbox WHERE sent=0 ORDER BY created_at ASC LIMIT ?"
  ).bind(limit).all();
  if (!results.length) return 0;
  const reports = results.map((r) => ({ kind: r.kind, severity: r.severity ?? void 0, category: r.category ?? void 0, title: r.title ?? void 0, message: r.message, context: r.context ?? void 0, fingerprint: r.fingerprint ?? void 0, appVersion: APP_VERSION }));
  try {
    const resp = await hostFetch(env, "/api/report", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token, reports }) });
    if (!resp.ok) {
      const ph2 = results.map(() => "?").join(",");
      await env.DB.prepare(`UPDATE client_report_outbox SET attempts=attempts+1 WHERE id IN (${ph2})`).bind(...results.map((r) => r.id)).run().catch(() => {
      });
      return 0;
    }
  } catch {
    return 0;
  }
  const ph = results.map(() => "?").join(",");
  await env.DB.prepare(`UPDATE client_report_outbox SET sent=1 WHERE id IN (${ph})`).bind(...results.map((r) => r.id)).run().catch(() => {
  });
  return results.length;
}
async function applyReportUpdates(env, updates) {
  for (const u of updates.slice(0, 20)) {
    await env.DB.prepare(
      "INSERT INTO host_report_replies (id,kind,title,status,resolution,pr_url,received_at) VALUES (?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET status=excluded.status, resolution=excluded.resolution, pr_url=excluded.pr_url, received_at=excluded.received_at"
    ).bind(u.id, u.kind ?? null, u.title ?? null, u.status ?? null, u.resolution ?? null, u.pr_url ?? null, nowSec()).run().catch(() => {
    });
  }
}
async function listReplies(env, limit = 30) {
  return (await env.DB.prepare("SELECT id,kind,title,status,resolution,pr_url,received_at FROM host_report_replies ORDER BY received_at DESC LIMIT ?").bind(limit).all()).results;
}
async function submitFeedback(env, f) {
  if (!f.message || !f.message.trim()) return { ok: false, error: "内容を入力してください" };
  await enqueueReport(env, { kind: "request", category: f.category ?? "feedback", title: f.title?.slice(0, 120), message: f.message, context: f.context });
  await flushReports(env).catch(() => 0);
  return { ok: true };
}
function buildAppReportContext(a) {
  const clip = (s, n) => String(s ?? "").slice(0, n);
  const parts = [];
  parts.push(`【アプリ】${a.name || a.appId}（id=${a.appId} v${a.version || "?"}）権限=${clip(a.permissions, 200)}`);
  try {
    const def = JSON.parse(a.definition ?? "{}");
    const screens = Array.isArray(def.screens) ? def.screens : [];
    const scr = screens.map((s) => {
      const o = s ?? {};
      const ins = (o.inputs ?? []).map((i) => i?.name).filter(Boolean).join(",");
      const steps = (o.steps ?? []).map((st) => `${st.op ?? "?"}${st.collection ? "@" + st.collection : ""}${st.from !== void 0 ? "←" + JSON.stringify(st.from) : ""}${st.keyFields ? " key=" + JSON.stringify(st.keyFields) : ""}`).join(" / ");
      return `  ・${o.id ?? "?"}(in:${ins}) [${steps}]`;
    }).join("\n");
    if (scr) parts.push("【画面(steps)】\n" + clip(scr, 4500));
    const html = def.render?.html ?? "";
    if (html) parts.push(`【render.html】${html.length}字。先頭:
${clip(html, 900)}
…末尾:
${html.slice(-600)}`);
  } catch {
    parts.push("【定義】JSON解析不能（壊れている可能性）: " + clip(a.definition, 300));
  }
  if (a.session?.length) parts.push("【開発セッション(新しい順)】\n" + clip(a.session.map((m) => `${m.role}: ${clip(m.content, 300)}`).join("\n"), 3500));
  if (a.diagnostics?.length) parts.push("【直近の診断】\n" + clip(a.diagnostics.map((r) => `[${r.level}/${r.category}] ${clip(r.message, 220)}`).join("\n"), 3e3));
  return parts.join("\n\n");
}
async function reportAppToHost(env, appId, note) {
  if (!appId) return { ok: false, error: "対象アプリが指定されていません" };
  let name = appId, version = "", permissions = "", definition = null;
  try {
    const row = await env.DB.prepare("SELECT name,version,permissions,definition FROM app_drafts WHERE id=?").bind(appId).first();
    if (row) {
      name = row.name || appId;
      version = row.version || "";
      permissions = row.permissions || "";
      definition = row.definition;
    }
  } catch {
  }
  let session = [];
  try {
    const { results } = await env.DB.prepare("SELECT role,content FROM chat_messages WHERE session_id=? ORDER BY created_at DESC LIMIT 20").bind(`appdev:${appId}`).all();
    session = results ?? [];
  } catch {
  }
  let diagnostics = [];
  try {
    const { results } = await env.DB.prepare(
      "SELECT level,category,message FROM diagnostics WHERE build_id IN (SELECT id FROM app_builds WHERE app_id=?) OR message LIKE ? ORDER BY created_at DESC LIMIT 15"
    ).bind(appId, `%${appId}%`).all();
    diagnostics = results ?? [];
  } catch {
  }
  const context = buildAppReportContext({ appId, name, version, permissions, definition, session, diagnostics });
  const message = (note?.trim() || "利用者からアプリの不具合報告（詳細は context の定義・開発セッション・診断を参照）").slice(0, 2e3);
  await enqueueReport(env, { kind: "error", category: "app-report", severity: "app", title: `アプリ不具合報告: ${name.slice(0, 80)}`, message, context, fingerprint: `app-report:${appId}` });
  await flushReports(env).catch(() => 0);
  return { ok: true };
}
export {
  applyReportUpdates,
  buildAppReportContext,
  enqueueReport,
  flushReports,
  listReplies,
  reportAppToHost,
  submitFeedback
};
