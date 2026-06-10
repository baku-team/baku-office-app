globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as randomId } from './crypto_D21r3Dwx.mjs';
import { nowSec } from './accounting_B0MwRt9i.mjs';

async function listSessions(ctx, owner) {
  const { results } = await ctx.db.prepare("SELECT id,title,model,updated_at FROM chat_sessions WHERE owner=? ORDER BY updated_at DESC LIMIT 50").bind(owner).all();
  return results;
}
async function createSession(ctx, owner, model) {
  const id = randomId();
  const now = nowSec();
  await ctx.db.prepare("INSERT INTO chat_sessions (id,owner,title,model,created_at,updated_at) VALUES (?,?,?,?,?,?)").bind(id, owner, null, model ?? null, now, now).run();
  return id;
}
async function deleteSession(ctx, owner, id) {
  const s = await ctx.db.prepare("SELECT id FROM chat_sessions WHERE id=? AND owner=?").bind(id, owner).first();
  if (!s) return;
  await ctx.db.prepare("DELETE FROM chat_messages WHERE session_id=?").bind(id).run();
  await ctx.db.prepare("DELETE FROM chat_sessions WHERE id=?").bind(id).run();
}
async function ownedSession(ctx, owner, id) {
  return await ctx.db.prepare("SELECT id,model FROM chat_sessions WHERE id=? AND owner=?").bind(id, owner).first() ?? null;
}
async function getMessages(ctx, sessionId) {
  const { results } = await ctx.db.prepare("SELECT role,content,created_at FROM chat_messages WHERE session_id=? ORDER BY created_at LIMIT 200").bind(sessionId).all();
  return results;
}
async function appendMessage(ctx, sessionId, role, content) {
  await ctx.db.prepare("INSERT INTO chat_messages (id,session_id,role,content,created_at) VALUES (?,?,?,?,?)").bind(randomId(), sessionId, role, content, nowSec()).run();
  await ctx.db.prepare("UPDATE chat_sessions SET updated_at=? WHERE id=?").bind(nowSec(), sessionId).run();
}
async function ensureTitle(ctx, sessionId, firstText) {
  await ctx.db.prepare("UPDATE chat_sessions SET title=? WHERE id=? AND (title IS NULL OR title='')").bind(firstText.slice(0, 40), sessionId).run();
}
function toTurns(msgs, limit = 20) {
  return msgs.slice(-limit).map((m) => m.role === "assistant" ? { role: "assistant", text: m.content } : { role: "user", text: m.content });
}

export { appendMessage, createSession, deleteSession, ensureTitle, getMessages, listSessions, ownedSession, toTurns };
