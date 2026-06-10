globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as randomId } from './crypto_D21r3Dwx.mjs';
import { nowSec } from './accounting_B0MwRt9i.mjs';

async function addNotification(ctx, n) {
  await ctx.db.prepare("INSERT INTO notifications (id,owner,kind,body,link,created_at) VALUES (?,?,?,?,?,?)").bind(randomId(), n.owner, n.kind, n.body, n.link ?? null, nowSec()).run();
}
async function listNotifications(ctx, owner, opts = {}) {
  const where = opts.unreadOnly ? "owner=? AND read_at IS NULL" : "owner=?";
  const { results } = await ctx.db.prepare(`SELECT id,kind,body,link,read_at,created_at FROM notifications WHERE ${where} ORDER BY created_at DESC LIMIT ?`).bind(owner, Math.min(opts.limit ?? 30, 100)).all();
  return results;
}
async function countUnread(ctx, owner) {
  const r = await ctx.db.prepare("SELECT COUNT(*) AS n FROM notifications WHERE owner=? AND read_at IS NULL").bind(owner).first();
  return r?.n ?? 0;
}
async function markNotificationsRead(ctx, owner, id) {
  const now = nowSec();
  if (id) await ctx.db.prepare("UPDATE notifications SET read_at=? WHERE owner=? AND id=? AND read_at IS NULL").bind(now, owner, id).run();
  else await ctx.db.prepare("UPDATE notifications SET read_at=? WHERE owner=? AND read_at IS NULL").bind(now, owner).run();
}
async function pushWebhook(url, text) {
  await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ content: text, text }) });
}

export { addNotification, countUnread, listNotifications, markNotificationsRead, pushWebhook };
