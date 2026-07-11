globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as randomId } from "./stripe_r-RFTlbb.mjs";
import { n as nowSec } from "./accounting_D4tRmfws.mjs";
import { n as notifyOwnerDirect } from "./ctx_Ige4T837.mjs";
async function recordInboundEvent(env, msg) {
  const id = randomId();
  const now = nowSec();
  try {
    await env.DB.prepare(
      "INSERT INTO inbound_events (id,connector,sender,payload,status,attempts,created_at,updated_at) VALUES (?,?,?,?, 'pending', 0, ?, ?)"
    ).bind(id, String(msg.connector), String(msg.sender), JSON.stringify(msg).slice(0, 1e5), now, now).run();
    return id;
  } catch {
    return null;
  }
}
async function completeInboundEvent(env, id, status, error) {
  try {
    await env.DB.prepare("UPDATE inbound_events SET status=?, last_error=?, updated_at=? WHERE id=?").bind(status, error ? error.slice(0, 500) : null, nowSec(), id).run();
  } catch {
  }
}
const STUCK_SEC = 120;
const MAX_ATTEMPTS = 2;
async function drainStuckInboundEvents(ctx, limit = 20) {
  const env = ctx.env;
  const cut = nowSec() - STUCK_SEC;
  const rows = await env.DB.prepare(
    "SELECT id,connector,sender,payload,attempts FROM inbound_events WHERE status='pending' AND updated_at < ? ORDER BY updated_at LIMIT ?"
  ).bind(cut, limit).all().then((r) => r.results).catch(() => []);
  let handled = 0;
  for (const row of rows) {
    const claim = await env.DB.prepare("UPDATE inbound_events SET attempts=attempts+1, updated_at=? WHERE id=? AND status='pending' AND attempts=?").bind(nowSec(), row.id, row.attempts).run().catch(() => null);
    if (!claim || (claim.meta?.changes ?? 0) === 0) continue;
    const text = (() => {
      try {
        return String(JSON.parse(row.payload).text ?? "").trim();
      } catch {
        return "";
      }
    })();
    const owner = `${row.connector}:${row.sender}`;
    const excerpt = text ? `「${text.slice(0, 60)}${text.length > 60 ? "…" : ""}」` : "先ほどのメッセージ";
    await notifyOwnerDirect(ctx, owner, `⚠️ ${excerpt}のご依頼は処理を完了できなかった可能性があります。恐れ入りますが、もう一度お送りください。`).catch(() => {
    });
    if (row.attempts + 1 >= MAX_ATTEMPTS) {
      await env.DB.prepare("UPDATE inbound_events SET status='failed', updated_at=? WHERE id=?").bind(nowSec(), row.id).run().catch(() => {
      });
    }
    handled++;
  }
  return handled;
}
export {
  completeInboundEvent,
  drainStuckInboundEvents,
  recordInboundEvent
};
