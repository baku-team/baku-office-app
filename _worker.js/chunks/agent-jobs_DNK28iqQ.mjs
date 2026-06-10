globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as randomId } from './crypto_D21r3Dwx.mjs';
import { nowSec } from './accounting_B0MwRt9i.mjs';
import { r as runAgent } from './agent_sOGRQKT2.mjs';
import { appendMessage } from './chat-sessions_Da7FtWJ1.mjs';

async function enqueueAgentJob(ctx, a) {
  const id = randomId();
  const now = nowSec();
  await ctx.db.prepare("INSERT INTO agent_jobs (id,owner,session_id,prompt,role,status,created_at,updated_at) VALUES (?,?,?,?,?,'pending',?,?)").bind(id, a.owner, a.sessionId ?? null, a.prompt, a.role ?? "member", now, now).run();
  return id;
}
async function processAgentJobs(ctx, baseUrl = "", limit = 2) {
  const { results } = await ctx.db.prepare("SELECT id,owner,session_id,prompt,role FROM agent_jobs WHERE status='pending' ORDER BY created_at LIMIT ?").bind(limit).all();
  let done = 0;
  for (const j of results) {
    await ctx.db.prepare("UPDATE agent_jobs SET status='running', updated_at=? WHERE id=?").bind(nowSec(), j.id).run();
    try {
      const reply = await runAgent(ctx, j.owner, j.prompt, void 0, baseUrl, j.role ?? "member", { unattended: true });
      await ctx.db.prepare("UPDATE agent_jobs SET status='done', result=?, updated_at=? WHERE id=?").bind(reply, nowSec(), j.id).run();
      if (j.session_id) await appendMessage(ctx, j.session_id, "assistant", reply).catch(() => {
      });
      done++;
    } catch (e) {
      await ctx.db.prepare("UPDATE agent_jobs SET status='error', result=?, updated_at=? WHERE id=?").bind(String(e.message ?? e), nowSec(), j.id).run();
    }
  }
  return done;
}

export { enqueueAgentJob, processAgentJobs };
