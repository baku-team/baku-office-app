globalThis.process ??= {}; globalThis.process.env ??= {};
import { registerPart } from './parts_C0xB5mu7.mjs';
import { r as randomId, d as decryptField } from './crypto_BhRWVEcj.mjs';
import { nowSec } from './accounting_BOhbglhy.mjs';
import { masterKeyCtx } from './client_KUuDosgV.mjs';

const chatApp = {
  id: "chat",
  name: "AIチャット",
  version: "1.0.0",
  category: "core",
  description: "AIと対話して操作・他アプリ呼び出し・各種設定/開発を行うハブ（Plus以上で必須）。",
  permissions: ["ai", "agent", "db:read"],
  menu: [{ href: "/chat", label: "AIチャット" }]
};

async function recordExpense(ctx, owner, a) {
  await ctx.db.prepare("INSERT INTO personal_items (id,owner_user_id,type,title,amount,date,share_scope,review_status,created_at) VALUES (?,?,?,?,?,?,'personal','none',?)").bind(randomId(), owner, "receipt", a.title, Math.round(a.amount), a.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), nowSec()).run();
  return `領収書を記録：${a.title} ¥${Math.round(a.amount).toLocaleString("ja-JP")}（個人→組織へ共有で会計申請）`;
}
async function listExpenses(ctx, owner) {
  const { results } = await ctx.db.prepare("SELECT title,amount FROM personal_items WHERE owner_user_id=? AND type='receipt' ORDER BY created_at DESC LIMIT 10").bind(owner).all();
  if (!results.length) return "領収書の記録はありません。";
  return results.map((r) => `・${r.title} ¥${(r.amount ?? 0).toLocaleString("ja-JP")}`).join("\n");
}
const accountingPart = {
  id: "accounting",
  name: "会計",
  version: "1.0.0",
  category: "会計",
  description: "支出/領収書の記録と一覧。",
  permissions: ["db:read", "db:write"],
  agentTools: [
    {
      name: "record_expense",
      description: "支出/領収書を記録",
      parameters: { type: "object", properties: { amount: { type: "number" }, title: { type: "string" }, date: { type: "string", description: "YYYY-MM-DD" } }, required: ["amount", "title"] },
      run: (ctx, owner, _baseUrl, a) => recordExpense(ctx, owner, { amount: Number(a.amount), title: String(a.title), date: a.date ? String(a.date) : void 0 })
    },
    {
      name: "list_expenses",
      description: "記録した領収書一覧",
      parameters: { type: "object", properties: {} },
      run: (ctx, owner) => listExpenses(ctx, owner)
    }
  ]
};

async function saveMemo(ctx, owner, a) {
  await ctx.db.prepare("INSERT INTO personal_items (id,owner_user_id,type,title,body,share_scope,review_status,created_at) VALUES (?,?,?,?,?,'personal','none',?)").bind(randomId(), owner, "memo", a.title, a.body ?? null, nowSec()).run();
  return `メモを保存：${a.title}`;
}
const memoPart = {
  id: "memo",
  name: "メモ",
  version: "1.0.0",
  category: "庶務",
  description: "個人メモの保存。",
  permissions: ["db:write"],
  agentTools: [
    {
      name: "save_memo",
      description: "メモを保存",
      parameters: { type: "object", properties: { title: { type: "string" }, body: { type: "string" } }, required: ["title"] },
      run: (ctx, owner, _baseUrl, a) => saveMemo(ctx, owner, { title: String(a.title), body: a.body ? String(a.body) : void 0 })
    }
  ]
};

async function setReminder(ctx, owner, a) {
  const at = Math.floor(new Date(a.remind_at).getTime() / 1e3);
  if (!Number.isFinite(at)) return "日時を解釈できませんでした（例：2026-06-20T10:00）。";
  await ctx.db.prepare("INSERT INTO reminders (id,owner,content,remind_at,done,created_at) VALUES (?,?,?,?,0,?)").bind(randomId(), owner, a.content, at, nowSec()).run();
  return `リマインダー設定：${a.remind_at} に「${a.content}」`;
}
async function listReminders(ctx, owner) {
  const { results } = await ctx.db.prepare("SELECT content,remind_at FROM reminders WHERE owner=? AND done=0 ORDER BY remind_at LIMIT 10").bind(owner).all();
  if (!results.length) return "未配信のリマインダーはありません。";
  return results.map((r) => `・${new Date(r.remind_at * 1e3).toISOString().slice(0, 16).replace("T", " ")} ${r.content}`).join("\n");
}
async function dueReminders(ctx, owner) {
  const now = nowSec();
  const sql = owner ? "SELECT id,owner,content FROM reminders WHERE done=0 AND remind_at<=? AND owner=? ORDER BY remind_at LIMIT 20" : "SELECT id,owner,content FROM reminders WHERE done=0 AND remind_at<=? ORDER BY remind_at LIMIT 50";
  const stmt = owner ? ctx.db.prepare(sql).bind(now, owner) : ctx.db.prepare(sql).bind(now);
  const { results } = await stmt.all();
  return results;
}
async function markReminderDone(ctx, id) {
  await ctx.db.prepare("UPDATE reminders SET done=1 WHERE id=?").bind(id).run();
}
const remindersPart = {
  id: "reminders",
  name: "リマインダー",
  version: "1.0.0",
  category: "庶務",
  description: "指定日時の通知。",
  permissions: ["db:read", "db:write"],
  agentTools: [
    {
      name: "set_reminder",
      description: "指定日時にLINEへ通知",
      parameters: { type: "object", properties: { content: { type: "string" }, remind_at: { type: "string", description: "ISO日時" } }, required: ["content", "remind_at"] },
      run: (ctx, owner, _baseUrl, a) => setReminder(ctx, owner, { content: String(a.content), remind_at: String(a.remind_at) })
    },
    {
      name: "list_reminders",
      description: "未配信リマインダー一覧",
      parameters: { type: "object", properties: {} },
      run: (ctx, owner) => listReminders(ctx, owner)
    }
  ]
};

async function saveKnowledge(ctx, owner, a) {
  await ctx.db.prepare("INSERT INTO knowledge (id,title,body,file_ref,tags,created_by,created_at) VALUES (?,?,?,?,?,?,?)").bind(randomId(), a.title, a.body, null, "agent", owner, nowSec()).run();
  return `ナレッジを保存：${a.title}`;
}
async function searchKnowledge(ctx, a) {
  const q = `%${a.query}%`;
  const { results } = await ctx.db.prepare("SELECT title,body FROM knowledge WHERE deleted_at IS NULL AND (title LIKE ? OR body LIKE ?) ORDER BY created_at DESC LIMIT 5").bind(q, q).all();
  if (!results.length) return "該当するナレッジは見つかりませんでした。";
  return results.map((r) => `■ ${r.title}
${(r.body ?? "").slice(0, 200)}`).join("\n\n");
}
const knowledgePart = {
  id: "knowledge",
  name: "組織ナレッジ",
  version: "1.0.0",
  category: "庶務",
  description: "組織のナレッジを保存・検索。他アプリから検索操作を呼べる。",
  permissions: ["db:read", "db:write"],
  // アプリ間連動：他アプリは ctx.apps.call("knowledge","search",{query}) で検索できる（要 db:read）。
  actions: [
    { name: "search", description: "ナレッジ検索", requiredPermission: "db:read", run: (ctx, a) => searchKnowledge(ctx, { query: String(a.query ?? "") }) }
  ],
  agentTools: [
    {
      name: "save_knowledge",
      description: "組織ナレッジを保存",
      parameters: { type: "object", properties: { title: { type: "string" }, body: { type: "string" } }, required: ["title", "body"] },
      run: (ctx, owner, _baseUrl, a) => saveKnowledge(ctx, owner, { title: String(a.title), body: String(a.body) })
    },
    {
      name: "search_knowledge",
      description: "組織ナレッジを検索",
      parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
      run: (ctx, _owner, _baseUrl, a) => searchKnowledge(ctx, { query: String(a.query) })
    }
  ]
};

async function searchMembers(ctx, a) {
  const { results } = await ctx.db.prepare("SELECT display_name,role,status FROM users WHERE status='active'").all();
  const mk = await masterKeyCtx(ctx);
  const out = [];
  for (const u of results) {
    let name = "";
    try {
      name = u.display_name ? await decryptField(mk, u.display_name, "member-pii") : "";
    } catch {
    }
    if (!a.query || name.includes(a.query)) out.push(`・${name || "(無名)"}（${u.role}）`);
  }
  return out.length ? out.join("\n") : "該当するメンバーはいません。";
}
const membersPart = {
  id: "members",
  name: "庶務／名簿",
  version: "1.0.0",
  category: "庶務",
  description: "会員名簿（暗号化PII）の照会。特権ロールのみ。",
  permissions: ["db:read", "members:read"],
  agentTools: [
    {
      name: "search_members",
      description: "メンバー（名簿）を検索",
      parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
      requiredRole: ["admin", "accounting", "clerical"],
      run: (ctx, _owner, _baseUrl, a) => searchMembers(ctx, { query: String(a.query ?? "") })
    }
  ]
};

function registerBuiltinParts() {
  registerPart(chatApp);
  registerPart(accountingPart);
  registerPart(memoPart);
  registerPart(remindersPart);
  registerPart(knowledgePart);
  registerPart(membersPart);
}
registerBuiltinParts();

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  registerBuiltinParts
}, Symbol.toStringTag, { value: 'Module' }));

export { dueReminders as d, index as i, markReminderDone as m };
