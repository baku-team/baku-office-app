globalThis.process ??= {};
globalThis.process.env ??= {};
import { n as nowSec } from "./accounting_CtvChRxg.mjs";
async function listSites(env) {
  return (await env.DB.prepare("SELECT * FROM sites ORDER BY (slug='home') DESC, updated_at DESC").all()).results;
}
async function getSite(env, slug) {
  return await env.DB.prepare("SELECT * FROM sites WHERE slug=?").bind(slug).first() ?? null;
}
async function getPublishedSite(env, slug) {
  return await env.DB.prepare("SELECT * FROM sites WHERE slug=? AND published=1").bind(slug).first() ?? null;
}
async function upsertSite(env, a) {
  const now = nowSec();
  await env.DB.prepare(
    "INSERT INTO sites (slug,title,body,published,show_join,created_at,updated_at) VALUES (?,?,?,?,?,?,?) ON CONFLICT(slug) DO UPDATE SET title=excluded.title,body=excluded.body,published=excluded.published,show_join=excluded.show_join,updated_at=excluded.updated_at"
  ).bind(a.slug, a.title, a.body ?? null, a.published ? 1 : 0, a.show_join ? 1 : 0, now, now).run();
}
async function deleteSite(env, slug) {
  await env.DB.prepare("DELETE FROM sites WHERE slug=?").bind(slug).run();
}
async function saveLayoutDraft(env, slug, layoutJson, title) {
  const now = nowSec();
  await env.DB.prepare("INSERT OR IGNORE INTO sites (slug,title,published,show_join,created_at,updated_at) VALUES (?,?,0,0,?,?)").bind(slug, title && title.trim() || slug, now, now).run();
  await env.DB.prepare("UPDATE sites SET layout_draft=?, updated_at=? WHERE slug=?").bind(layoutJson, now, slug).run();
}
async function publishLayout(env, slug) {
  await env.DB.prepare("UPDATE sites SET layout=layout_draft, published=1, updated_at=? WHERE slug=?").bind(nowSec(), slug).run();
}
async function clearLayout(env, slug) {
  await env.DB.prepare("UPDATE sites SET layout=NULL, layout_draft=NULL, updated_at=? WHERE slug=?").bind(nowSec(), slug).run();
}
export {
  clearLayout,
  deleteSite,
  getPublishedSite,
  getSite,
  listSites,
  publishLayout,
  saveLayoutDraft,
  upsertSite
};
