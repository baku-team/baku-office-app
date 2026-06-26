globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth_DChgT15J.mjs";
import { env } from "cloudflare:workers";
function csvCell(v) {
  const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function recordsToCsv(rows) {
  const parsed = rows.map((r) => {
    let d = {};
    try {
      const o = r.data ? JSON.parse(r.data) : {};
      if (o && typeof o === "object" && !Array.isArray(o)) d = o;
    } catch {
    }
    return { d, created_at: r.created_at };
  });
  const keys = [];
  for (const p of parsed) for (const k of Object.keys(p.d)) if (!keys.includes(k)) keys.push(k);
  const ordered = [...keys.filter((k) => !k.startsWith("_")), ...keys.filter((k) => k.startsWith("_"))];
  const header = [...ordered, "created_at"];
  const lines = [header.map(csvCell).join(",")];
  for (const p of parsed) {
    const row = ordered.map((k) => csvCell(p.d[k]));
    row.push(p.created_at ? new Date(p.created_at * 1e3).toISOString() : "");
    lines.push(row.join(","));
  }
  return "\uFEFF" + lines.join("\r\n");
}
const prerender = false;
const GET = async ({ request, url }) => {
  const ses = await getSession(env, request);
  if (!ses) return new Response("ログインが必要です", { status: 401 });
  const appId = url.searchParams.get("appId") ?? "";
  if (!appId) return new Response("appId が必要です", { status: 400 });
  const collection = url.searchParams.get("collection");
  const isAdminOrg = ses.role === "admin";
  const where = ["app_id=?"];
  const params = [appId];
  if (!isAdminOrg) {
    where.push("owner=?");
    params.push(ses.uid);
  }
  if (collection) {
    where.push("collection=?");
    params.push(collection);
  }
  const { results } = await env.DB.prepare(
    `SELECT id,data,created_at FROM app_records WHERE ${where.join(" AND ")} ORDER BY created_at DESC LIMIT 10000`
  ).bind(...params).all();
  const csv = recordsToCsv(results ?? []);
  const fname = `export_${appId}${collection ? "_" + collection : ""}.csv`;
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${fname}"`
    }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
