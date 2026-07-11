globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as randomId } from "./stripe_r-RFTlbb.mjs";
import { n as nowSec } from "./accounting_D4tRmfws.mjs";
import { r as runAgent, n as notifyOwnerDirect } from "./ctx_CknKdTPU.mjs";
import { a as appendMessage, g as getMessages, t as toTurns } from "./chat-sessions_BfrxKJEd.mjs";
import { addNotification, notifyHook } from "./notifications_bYzhELs1.mjs";
const AGENT_JOB_MAX_AGE = 1800;
async function enqueueAgentJob(ctx, a) {
  const id = randomId();
  const now = nowSec();
  const atts = a.attachments && a.attachments.length ? JSON.stringify(a.attachments.slice(0, 8)) : null;
  await ctx.db.run(
    "INSERT INTO agent_jobs (id,owner,session_id,prompt,role,status,model,model_id,mode,attachments,source,created_at,updated_at) VALUES (?,?,?,?,?,'pending',?,?,?,?,?,?,?)",
    [id, a.owner, a.sessionId ?? null, a.prompt, a.role ?? "member", a.model ?? null, a.modelId ?? null, a.mode ?? null, atts, a.source ?? null, now, now]
  );
  return id;
}
async function cancelAgentJob(ctx, owner, id) {
  const r = await ctx.db.run("UPDATE agent_jobs SET status='cancelled', updated_at=? WHERE id=? AND owner=? AND status IN ('pending','running')", [nowSec(), id, owner]);
  return !!r.rowsWritten;
}
const AGENT_JOB_STALE = 90;
const AGENT_JOB_COLS = "id,owner,session_id,prompt,role,created_at,model,model_id,mode,attachments";
async function resolveJobAttachments(ctx, owner, attachmentsJson) {
  if (!attachmentsJson) return [];
  let refs = [];
  try {
    const p = JSON.parse(attachmentsJson);
    if (Array.isArray(p)) refs = p;
  } catch {
    return [];
  }
  const { getFile, fileBelongsTo } = await import("./storage_BN4XcC1w.mjs");
  const out = [];
  for (const r of refs.slice(0, 8)) {
    const fileId = typeof r.fileId === "string" ? r.fileId : "";
    if (!fileId || !await fileBelongsTo(ctx.env, fileId, owner).catch(() => false)) continue;
    const f = await getFile(ctx.env, fileId).catch(() => null);
    if (!f) continue;
    const bytes = new Uint8Array(f.buf);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    out.push({ mimeType: typeof r.mimeType === "string" && r.mimeType || f.mime, dataB64: btoa(bin) });
  }
  return out;
}
async function claimAgentJob(ctx, id, stale, lease) {
  const r = await ctx.db.run(
    "UPDATE agent_jobs SET status='running', updated_at=?, lease_owner=? WHERE id=? AND (status='pending' OR (status='running' AND updated_at < ?))",
    [nowSec(), lease, id, stale]
  );
  return !!r.rowsWritten;
}
async function terminateStaleAgentJob(ctx, j) {
  const dead = "処理に時間がかかり、完了できませんでした。お手数ですが依頼を分けて再度お試しください。";
  const upd = await ctx.db.run("UPDATE agent_jobs SET status='error', result=?, updated_at=? WHERE id=? AND status IN ('pending','running')", [dead, nowSec(), j.id]);
  if (upd.rowsWritten) {
    if (j.session_id) await appendMessage(ctx, j.session_id, "assistant", dead).catch(() => {
    });
    await addNotification(ctx, { owner: j.owner, kind: "agent", body: "AIの作業を完了できませんでした。タップで詳細を開きます。", link: j.session_id ? `/?ses=${j.session_id}` : "/" }).catch(() => {
    });
  }
  return !!upd.rowsWritten;
}
async function runOneAgentJob(ctx, j, baseUrl, lease) {
  const canceller = new AbortController();
  const hb = setInterval(() => {
    ctx.db.run("UPDATE agent_jobs SET updated_at=? WHERE id=? AND status='running' AND lease_owner=?", [nowSec(), j.id, lease]).then((r) => {
      if (!r.rowsWritten) canceller.abort();
    }).catch(() => {
    });
  }, 15e3);
  try {
    let history;
    if (j.session_id) {
      const msgs = await getMessages(ctx, j.session_id).catch(() => []);
      history = msgs.length && msgs[msgs.length - 1].role === "user" && msgs[msgs.length - 1].content === j.prompt ? msgs.slice(0, -1) : msgs;
    }
    const { currentAuthState } = await import("./auth_qjtEFOY-.mjs");
    const auth = await currentAuthState(ctx.env, j.owner);
    if (auth.kind === "error") return false;
    if (auth.kind === "user" && !auth.active) {
      await ctx.db.run("UPDATE agent_jobs SET status='cancelled', result=?, updated_at=? WHERE id=? AND status='running' AND lease_owner=?", ["アカウントが無効化されたため実行を停止しました。", nowSec(), j.id, lease]).catch(() => {
      });
      await (await import("./diag_-P_u6Fn4.mjs")).logDiag(ctx.env, "warn", "agent", "agent_job: 主体が無効化済み→実行停止", `job=${j.id} owner=${j.owner}`).catch(() => {
      });
      return false;
    }
    const effRole = auth.kind === "user" && auth.role ? auth.role : j.role ?? "member";
    const usedTools = [];
    let delegatedBuild = false;
    const jobAttachments = await resolveJobAttachments(ctx, j.owner, j.attachments).catch(() => []);
    const jobModel = j.model ?? void 0;
    const raw = await runAgent(ctx, j.owner, j.prompt, void 0, baseUrl, effRole, { unattended: true, signal: canceller.signal, history: history ? toTurns(history) : void 0, feature: "agent_job", model: jobModel, modelId: j.model_id ?? void 0, mode: j.mode ?? void 0, attachments: jobAttachments.length ? jobAttachments : void 0, onEvent: (ev) => {
      if (ev.type === "tool") usedTools.push(ev.name);
      else if (ev.type === "delegated_build") delegatedBuild = true;
    } });
    if (canceller.signal.aborted) return false;
    const { HOPS_EXCEEDED } = await import("./ai_BjM19WgP.mjs");
    const exhausted = raw === HOPS_EXCEEDED;
    const rawReply = exhausted ? "ご依頼の内容が大きく、一度の処理では完了できませんでした。お手数ですが、対象（特定の画面・機能・手順）を絞るか、ご希望を具体的にお知らせください。" : raw;
    const { recordTaskFromReply } = await import("./task-log_sFx7hDXA.mjs");
    const task = await recordTaskFromReply(ctx.env, { owner: j.owner, role: j.role ?? "member", source: "agent_job", userText: j.prompt, reply: rawReply, tools: usedTools, sessionId: j.session_id });
    const reply = task.reply;
    const { extractActions } = await import("./chat-sessions_BfrxKJEd.mjs").then((n) => n.k);
    const ex = extractActions(reply);
    const actions = ex.actions.filter((a) => a.kind === "reply");
    const upd = await ctx.db.run("UPDATE agent_jobs SET status=?, result=?, updated_at=? WHERE id=? AND status='running' AND lease_owner=?", [exhausted ? "error" : "done", ex.content, nowSec(), j.id, lease]);
    if (!upd.rowsWritten) return false;
    if (j.session_id) {
      const mid = await appendMessage(ctx, j.session_id, "assistant", ex.content, actions).catch(() => null);
      if (mid && task.taskId) await (await import("./task-log_sFx7hDXA.mjs")).linkTaskMessage(ctx.env, task.taskId, mid);
    }
    if (!delegatedBuild) {
      await addNotification(ctx, { owner: j.owner, kind: "agent", body: exhausted ? "AIの作業を完了できませんでした。タップで詳細を開きます。" : "AIの作業が完了しました。タップで結果を開きます。", link: j.session_id ? `/?ses=${j.session_id}` : "/" }).catch(() => {
      });
      await notifyOwnerDirect(ctx, j.owner, exhausted ? "⚠️ AIの作業を完了できませんでした（依頼の具体化をお願いします）。" : "✅ AIの作業が完了しました。").catch(() => {
      });
      await notifyHook(ctx.env, exhausted ? "⚠️ AIの作業を完了できませんでした（依頼の具体化をお願いします）。" : "✅ AIの作業が完了しました。").catch(() => {
      });
    }
    return true;
  } catch (e) {
    const internal = String(e?.message ?? e);
    const userMsg = "⚠️ AIの作業中にエラーが発生し、完了できませんでした。お手数ですが、時間をおいて再度お試しください（続く場合は依頼を分ける・別のAIモデルへ切替も有効です）。";
    const upd = await ctx.db.run("UPDATE agent_jobs SET status='error', result=?, updated_at=? WHERE id=? AND status='running' AND lease_owner=?", [internal.slice(0, 500), nowSec(), j.id, lease]);
    if (upd.rowsWritten) {
      await (await import("./diag_-P_u6Fn4.mjs")).logDiag(ctx.env, "error", "agent", `agent_job 失敗: ${internal.slice(0, 300)}`, `job=${j.id}`).catch(() => {
      });
      if (j.session_id) await appendMessage(ctx, j.session_id, "assistant", userMsg).catch(() => {
      });
      await addNotification(ctx, { owner: j.owner, kind: "agent", body: "AIの作業でエラーが発生しました。タップで詳細を開きます。", link: j.session_id ? `/?ses=${j.session_id}` : "/" }).catch(() => {
      });
      await notifyOwnerDirect(ctx, j.owner, userMsg).catch(() => {
      });
      await notifyHook(ctx.env, userMsg).catch(() => {
      });
    }
    return false;
  } finally {
    clearInterval(hb);
  }
}
async function processAgentJobs(ctx, baseUrl = "", limit = 2) {
  const now = nowSec();
  const stale = now - AGENT_JOB_STALE;
  const results = await ctx.db.all(`SELECT ${AGENT_JOB_COLS} FROM agent_jobs WHERE status='pending' OR (status='running' AND updated_at < ?) ORDER BY created_at LIMIT ?`, [stale, limit]);
  let done = 0;
  for (const j of results) {
    if (now - (j.created_at ?? now) > AGENT_JOB_MAX_AGE) {
      await terminateStaleAgentJob(ctx, j);
      continue;
    }
    const lease = randomId();
    if (!await claimAgentJob(ctx, j.id, stale, lease)) continue;
    if (await runOneAgentJob(ctx, j, baseUrl, lease)) done++;
  }
  return done;
}
async function processAgentJobById(ctx, jobId, baseUrl = "") {
  const now = nowSec();
  const stale = now - AGENT_JOB_STALE;
  const j = await ctx.db.first(`SELECT ${AGENT_JOB_COLS},status FROM agent_jobs WHERE id=?`, [jobId]);
  if (!j) return "done";
  if (j.status === "done" || j.status === "error" || j.status === "cancelled") return "done";
  if (now - (j.created_at ?? now) > AGENT_JOB_MAX_AGE) {
    await terminateStaleAgentJob(ctx, j);
    return "done";
  }
  const lease = randomId();
  if (!await claimAgentJob(ctx, jobId, stale, lease)) return "retryable";
  await runOneAgentJob(ctx, { id: j.id, owner: j.owner, session_id: j.session_id, prompt: j.prompt, role: j.role, created_at: j.created_at, model: j.model, model_id: j.model_id, mode: j.mode, attachments: j.attachments }, baseUrl, lease);
  return "done";
}
async function kickAgentJob(ctx, jobId, origin = "") {
  const env = ctx.env;
  const driver = await (await import("./settings_C4tL9AHR.mjs")).getBuildDriver(env).catch(() => "cron");
  if (driver === "do") {
    try {
      const ns = env.BUILD_DO;
      if (ns) {
        const doId = "aj:" + jobId;
        await ns.get(ns.idFromName(doId)).fetch(new Request("https://internal/kick", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ buildId: doId, origin }) }));
        return;
      }
    } catch {
    }
  }
  const wu = ctx.waitUntil;
  if (wu) wu(processAgentJobs(ctx, origin).then(() => void 0).catch(() => void 0));
}
export {
  cancelAgentJob,
  enqueueAgentJob,
  kickAgentJob,
  processAgentJobById,
  processAgentJobs
};
