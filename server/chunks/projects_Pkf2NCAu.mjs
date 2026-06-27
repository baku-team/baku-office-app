globalThis.process ??= {};
globalThis.process.env ??= {};
import { n as nowSec } from "./accounting_D4tRmfws.mjs";
const toProject = (r) => ({ ...r, archived: !!r.archived });
function newId() {
  return "prj_" + crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}
async function createProject(env, p) {
  const now = nowSec();
  const id = newId();
  await env.DB.prepare(
    "INSERT INTO projects (id,name,description,color,icon,archived,created_by,created_at,updated_at) VALUES (?,?,?,?,?,0,?,?,?)"
  ).bind(id, p.name.slice(0, 120), p.description?.slice(0, 1e3) ?? null, p.color ?? null, p.icon ?? null, p.by ?? null, now, now).run();
  return { id, name: p.name.slice(0, 120), description: p.description ?? null, color: p.color ?? null, icon: p.icon ?? null, archived: false, created_by: p.by ?? null, created_at: now, updated_at: now };
}
async function listProjects(env, includeArchived = false) {
  const sql = "SELECT id,name,description,color,icon,archived,created_by,created_at,updated_at FROM projects" + (includeArchived ? "" : " WHERE archived=0") + " ORDER BY created_at DESC";
  const { results } = await env.DB.prepare(sql).all();
  return (results ?? []).map(toProject);
}
async function getProject(env, id) {
  const r = await env.DB.prepare("SELECT id,name,description,color,icon,archived,created_by,created_at,updated_at FROM projects WHERE id=?").bind(id).first();
  return r ? toProject(r) : null;
}
async function updateProject(env, id, p) {
  const sets = [];
  const vals = [];
  if (p.name !== void 0) {
    sets.push("name=?");
    vals.push(p.name.slice(0, 120));
  }
  if (p.description !== void 0) {
    sets.push("description=?");
    vals.push(p.description?.slice(0, 1e3) ?? null);
  }
  if (p.color !== void 0) {
    sets.push("color=?");
    vals.push(p.color);
  }
  if (p.icon !== void 0) {
    sets.push("icon=?");
    vals.push(p.icon);
  }
  if (p.archived !== void 0) {
    sets.push("archived=?");
    vals.push(p.archived ? 1 : 0);
  }
  if (!sets.length) return;
  sets.push("updated_at=?");
  vals.push(nowSec());
  await env.DB.prepare(`UPDATE projects SET ${sets.join(",")} WHERE id=?`).bind(...vals, id).run();
}
async function deleteProject(env, id) {
  await env.DB.prepare("UPDATE external_apps SET project_id=NULL WHERE project_id=?").bind(id).run();
  await env.DB.prepare("DELETE FROM projects WHERE id=?").bind(id).run();
}
async function assignAppToProject(env, appId, projectId) {
  await env.DB.prepare("UPDATE external_apps SET project_id=? WHERE id=?").bind(projectId, appId).run();
}
async function projectApps(env, projectId) {
  const { results } = await env.DB.prepare(
    `SELECT a.id AS id, a.name AS name, a.version AS version, a.allowed_roles AS allowed_roles,
            p.enabled AS publicEnabled,
            (SELECT COUNT(*) FROM app_records r WHERE r.app_id=a.id) AS records
     FROM external_apps a
     LEFT JOIN public_pages p ON p.slug=a.id
     WHERE a.project_id=?
     ORDER BY a.name`
  ).bind(projectId).all();
  return (results ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    version: r.version,
    allowed_roles: r.allowed_roles,
    publicEnabled: r.publicEnabled == null ? null : !!r.publicEnabled,
    records: Number(r.records) || 0
  }));
}
async function projectAppCounts(env) {
  const { results } = await env.DB.prepare("SELECT project_id AS pid, COUNT(*) AS n FROM external_apps WHERE project_id IS NOT NULL GROUP BY project_id").all();
  const out = {};
  for (const r of results ?? []) out[r.pid] = Number(r.n) || 0;
  return out;
}
export {
  assignAppToProject,
  createProject,
  deleteProject,
  getProject,
  listProjects,
  projectAppCounts,
  projectApps,
  updateProject
};
