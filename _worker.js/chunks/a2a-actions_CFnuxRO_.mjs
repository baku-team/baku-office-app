globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as randomId } from './crypto_D21r3Dwx.mjs';
import { nowSec } from './client_DjSYVqc9.mjs';
import { s as searchKnowledge } from './knowledge_C-0JJP5G.mjs';

const DECL_TYPES = [
  { type: "profile", label: "組織プロフィール参照", hint: "団体の基本情報・紹介・リンクを返す" },
  { type: "knowledge", label: "ナレッジ検索", hint: "引数 query で組織ナレッジを検索" },
  { type: "db", label: "DB（テーブル）参照", hint: "許可テーブルの選んだ列を read-only で返す" },
  { type: "files", label: "書類（取込資料）一覧", hint: "取り込み済み資料のメタ一覧を返す" },
  { type: "progress", label: "タスク・進捗参照", hint: "組織共有(承認済)のタスク/予定を返す" }
];
const DB_ALLOW = {
  wallets: ["name", "type", "opening_balance", "sort_order"],
  categories: ["name", "kind"],
  transactions: ["date", "kind", "amount"],
  imported_items: ["title", "source", "mime", "size", "imported_at"]
};
const clampLimit = (n) => Math.max(1, Math.min(200, Number(n) || 50));
async function getOrgProfile(ctx) {
  const raw = await ctx.storage.kv.get("org_profile");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
async function setOrgProfile(ctx, obj) {
  const o = obj && typeof obj === "object" ? obj : {};
  await ctx.storage.kv.put("org_profile", JSON.stringify(o));
  return o;
}
async function runDeclAction(ctx, type, config, args) {
  if (type === "profile") return getOrgProfile(ctx);
  if (type === "knowledge") return searchKnowledge(ctx, { query: String(args.query ?? config.query ?? "") });
  if (type === "files") {
    const limit = clampLimit(config.limit);
    const { results } = await ctx.db.prepare("SELECT title,source,mime,size,imported_at FROM imported_items ORDER BY imported_at DESC LIMIT ?").bind(limit).all();
    return results;
  }
  if (type === "progress") {
    const limit = clampLimit(config.limit);
    const kind = String(config.kind ?? "");
    const sql = "SELECT type,title,date,due_at,status FROM personal_items WHERE share_scope='org' AND review_status='approved'" + (kind ? " AND type=?" : "") + " ORDER BY created_at DESC LIMIT ?";
    const stmt = kind ? ctx.db.prepare(sql).bind(kind, limit) : ctx.db.prepare(sql).bind(limit);
    return (await stmt.all()).results;
  }
  if (type === "db") {
    const table = String(config.table ?? "");
    const allow = DB_ALLOW[table];
    if (!allow) throw new Error("許可されていないテーブルです");
    const cols = (Array.isArray(config.columns) ? config.columns.map(String) : []).filter((c) => allow.includes(c));
    if (!cols.length) throw new Error("公開する列が選ばれていません");
    const limit = clampLimit(config.limit);
    let where = table === "transactions" ? " WHERE deleted_at IS NULL" : "";
    const binds = [];
    const fc = String(config.filterColumn ?? "");
    if (fc && allow.includes(fc) && config.filterValue !== void 0) {
      where += (where ? " AND " : " WHERE ") + `${fc}=?`;
      binds.push(config.filterValue);
    }
    binds.push(limit);
    const sql = `SELECT ${cols.join(",")} FROM ${table}${where} LIMIT ?`;
    return (await ctx.db.prepare(sql).bind(...binds).all()).results;
  }
  throw new Error("未知のアクション種別です");
}
async function listActions(ctx) {
  return (await ctx.db.prepare("SELECT id,name,kind,spec,scope,target,enabled,created_at FROM a2a_actions ORDER BY created_at DESC").all()).results;
}
async function createAction(ctx, a) {
  const id = randomId(8);
  await ctx.db.prepare("INSERT INTO a2a_actions (id,name,kind,spec,scope,target,enabled,created_at) VALUES (?,?,?,?,?,?,1,?)").bind(id, a.name, a.kind, JSON.stringify(a.spec ?? {}), a.scope, a.target ?? "", nowSec()).run();
  return id;
}
async function updateAction(ctx, id, a) {
  const cur = await ctx.db.prepare("SELECT name,spec,scope,target,enabled FROM a2a_actions WHERE id=?").bind(id).first();
  if (!cur) return;
  await ctx.db.prepare("UPDATE a2a_actions SET name=?, spec=?, scope=?, target=?, enabled=? WHERE id=?").bind(a.name ?? cur.name, a.spec !== void 0 ? JSON.stringify(a.spec) : cur.spec, a.scope ?? cur.scope, a.target ?? cur.target, a.enabled === void 0 ? cur.enabled : a.enabled ? 1 : 0, id).run();
}
async function deleteAction(ctx, id) {
  await ctx.db.prepare("DELETE FROM a2a_actions WHERE id=?").bind(id).run();
}
async function resolveAction(ctx, name, opts) {
  const rows = (await ctx.db.prepare("SELECT id,name,kind,spec,scope,target,enabled,created_at FROM a2a_actions WHERE name=? AND enabled=1").bind(name).all()).results;
  for (const r of rows) {
    if (r.scope === "common") return r;
    if (opts.groupId && r.scope === "group" && r.target === opts.groupId) return r;
    if (!opts.groupId && r.scope === "conn" && r.target === opts.from) return r;
  }
  return null;
}
async function runResolvedAction(ctx, row, args) {
  const spec = JSON.parse(row.spec || "{}");
  if (row.kind === "app") return ctx.apps.call(String(spec.appId ?? ""), String(spec.action ?? ""), args, "a2a");
  return runDeclAction(ctx, String(spec.type ?? ""), spec.config ?? {}, args);
}

export { DB_ALLOW, DECL_TYPES, createAction, deleteAction, getOrgProfile, listActions, resolveAction, runDeclAction, runResolvedAction, setOrgProfile, updateAction };
