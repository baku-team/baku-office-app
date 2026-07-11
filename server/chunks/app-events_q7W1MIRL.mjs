globalThis.process ??= {};
globalThis.process.env ??= {};
import { roleCanOpenScreen } from "./appdef_CnTZd11a.mjs";
import { a as runTriggeredApp } from "./app-runtime_DDtJx-OO.mjs";
import { a as activeAppDefinition } from "./external-apps_DRfaI5xV.mjs";
function matchMessagingTrigger(t, ev) {
  if (t.source !== "messaging") return false;
  if (t.connectors && t.connectors.length && !t.connectors.includes(ev.connector)) return false;
  const text = (ev.text ?? "").trim();
  const hasImage = !!ev.image;
  const hasFile = !!(ev.files && ev.files.length);
  const matchOk = !t.match || text.toLowerCase().includes(t.match.toLowerCase());
  switch (t.event) {
    case "image":
      return hasImage && matchOk;
    case "file":
      return hasFile && matchOk;
    case "text":
      return !!text && matchOk;
    case "message":
      return (!!text || hasImage || hasFile) && matchOk;
    default:
      return false;
  }
}
function buildTriggerInputs(t, ev) {
  const src = {
    text: ev.text ?? "",
    sender: ev.sender,
    connector: ev.connector,
    ...ev.image ? { image: { id: ev.image.fileId } } : {},
    ...ev.files && ev.files.length ? { file: { id: ev.files[0].fileId } } : {}
  };
  const inputs = {};
  for (const [inputName, valueKey] of Object.entries(t.inputMap ?? {})) {
    if (valueKey in src) inputs[inputName] = src[valueKey];
  }
  return inputs;
}
async function listTriggeredApps(ctx) {
  const rows = await ctx.db.all(
    `SELECT id,definition FROM external_apps WHERE definition IS NOT NULL AND definition LIKE '%"triggers"%' ORDER BY installed_at`
  );
  const out = [];
  for (const r of rows) {
    if (!r.definition) continue;
    try {
      const def = JSON.parse(r.definition);
      if (Array.isArray(def.triggers) && def.triggers.length) out.push({ appId: r.id, def });
    } catch {
    }
  }
  return out;
}
const EVENT_RUN_MAX_ATTEMPTS = 3;
const EVENT_RUN_LEASE = 600;
async function claimEventRun(ctx, appId, triggerId, source, eventKey) {
  const ins = await ctx.db.run(
    "INSERT OR IGNORE INTO app_event_runs (id,app_id,trigger_id,source,event_key,status,attempts,lease_expiry,created_at,updated_at) VALUES (lower(hex(randomblob(8))),?,?,?,?, 'running', 1, strftime('%s','now')+" + EVENT_RUN_LEASE + ", strftime('%s','now'), strftime('%s','now'))",
    [appId, triggerId, source, eventKey]
  ).catch(() => ({ rowsWritten: 0 }));
  if ((ins.rowsWritten ?? 0) > 0) return true;
  const re = await ctx.db.run(
    "UPDATE app_event_runs SET status='running', attempts=attempts+1, lease_expiry=strftime('%s','now')+" + EVENT_RUN_LEASE + ", updated_at=strftime('%s','now') WHERE app_id=? AND trigger_id=? AND event_key=? AND ((status='failed' AND attempts<?) OR (status='running' AND (lease_expiry IS NULL OR lease_expiry<strftime('%s','now'))))",
    [appId, triggerId, eventKey, EVENT_RUN_MAX_ATTEMPTS]
  ).catch(() => ({ rowsWritten: 0 }));
  return (re.rowsWritten ?? 0) > 0;
}
async function endEventRun(ctx, appId, triggerId, eventKey, status, error) {
  await ctx.db.run(
    "UPDATE app_event_runs SET status=?, error=?, lease_expiry=NULL, updated_at=strftime('%s','now') WHERE app_id=? AND trigger_id=? AND event_key=?",
    [status, error ?? null, appId, triggerId, eventKey]
  ).catch(() => {
  });
}
async function isEventUnresolved(ctx, appId, triggerId, eventKey) {
  const r = await ctx.db.first(
    "SELECT status, attempts FROM app_event_runs WHERE app_id=? AND trigger_id=? AND event_key=?",
    [appId, triggerId, eventKey]
  ).catch(() => null);
  if (!r) return false;
  return r.status === "failed" && (r.attempts ?? 0) < EVENT_RUN_MAX_ATTEMPTS;
}
async function dispatchAppEvent(ctx, ev) {
  const apps = await listTriggeredApps(ctx);
  for (const { appId, def } of apps) {
    for (const t of def.triggers ?? []) {
      if (!matchMessagingTrigger(t, ev)) continue;
      if (t.requiredRoles && t.requiredRoles.length && !roleCanOpenScreen(ev.role, t.requiredRoles)) continue;
      const key = `msg:${crypto.randomUUID()}`;
      await claimEventRun(ctx, appId, t.id, "messaging", key);
      try {
        const res = await runTriggeredApp(ctx, appId, buildTriggerInputs(t, ev), ev.owner, t.screenId, ev.role);
        await endEventRun(ctx, appId, t.id, key, res.ok ? "ok" : "failed", res.ok ? void 0 : res.error ?? "run failed");
        const val = res.output?.value;
        const reply = res.ok ? typeof val === "string" && val.trim() ? val : "受け付けました。" : res.error ?? "処理できませんでした。";
        return { handled: true, reply };
      } catch (e) {
        await endEventRun(ctx, appId, t.id, key, "failed", e.message ?? String(e));
        return { handled: true, reply: "処理中にエラーが発生しました。恐れ入りますが、時間をおいて再度お試しください。" };
      }
    }
  }
  return { handled: false };
}
async function appTriggerStatus(ctx, appId, def) {
  const d = def ?? (await activeAppDefinition(ctx, appId).catch(() => null))?.definition;
  const triggers = d?.triggers ?? [];
  const out = [];
  for (const t of triggers) {
    const agg = await ctx.db.first(
      "SELECT COUNT(*) AS total, SUM(CASE WHEN status='failed' THEN 1 ELSE 0 END) AS failed, MAX(updated_at) AS lastAt FROM app_event_runs WHERE app_id=? AND trigger_id=?",
      [appId, t.id]
    ).catch(() => null);
    const last = await ctx.db.first(
      "SELECT status FROM app_event_runs WHERE app_id=? AND trigger_id=? ORDER BY updated_at DESC LIMIT 1",
      [appId, t.id]
    ).catch(() => null);
    out.push({
      id: t.id,
      source: t.source,
      event: t.event,
      screenId: t.screenId,
      ...t.source === "google" ? { service: t.service } : {},
      ...t.source === "messaging" ? { connectors: t.connectors, match: t.match } : {},
      total: agg?.total ?? 0,
      failed: agg?.failed ?? 0,
      lastStatus: last?.status ?? null,
      lastAt: agg?.lastAt ?? null
    });
  }
  return out;
}
export {
  EVENT_RUN_MAX_ATTEMPTS,
  appTriggerStatus,
  buildTriggerInputs,
  claimEventRun,
  dispatchAppEvent,
  endEventRun,
  isEventUnresolved,
  listTriggeredApps,
  matchMessagingTrigger
};
