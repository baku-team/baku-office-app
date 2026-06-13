globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth_BbUuA01A.mjs";
import { r as randomId } from "./stripe_r-RFTlbb.mjs";
import { n as nowSec } from "./accounting_BDHe-W6B.mjs";
import { audit } from "./storage_BbJRuC4n.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要" }, 401);
  const b = await request.json().catch(() => ({}));
  if (b.kind === "schedule") {
    if (b._action === "delete") {
      await env.DB.prepare("UPDATE schedules SET deleted_at=? WHERE id=?").bind(nowSec(), b.id).run();
      return json({ ok: true });
    }
    if (!b.title || !b.start_at) return json({ error: "title と start_at が必要" }, 400);
    const id = randomId();
    await env.DB.prepare("INSERT INTO schedules (id,title,start_at,end_at,body,created_by,created_at) VALUES (?,?,?,?,?,?,?)").bind(id, b.title, b.start_at, b.end_at ?? null, b.body ?? null, ses.uid, nowSec()).run();
    await audit(env, ses.uid, "schedule.create", id);
    return json({ ok: true, id });
  }
  if (b.kind === "minutes") {
    if (b._action === "delete") {
      await env.DB.prepare("UPDATE knowledge SET deleted_at=? WHERE id=?").bind(nowSec(), b.id).run();
      return json({ ok: true });
    }
    if (!b.title) return json({ error: "title が必要" }, 400);
    const id = randomId();
    await env.DB.prepare("INSERT INTO knowledge (id,title,body,file_ref,tags,created_by,created_at) VALUES (?,?,?,?,?,?,?)").bind(id, b.title, b.body ?? "", null, "議事録", ses.uid, nowSec()).run();
    await audit(env, ses.uid, "minutes.create", id);
    return json({ ok: true, id });
  }
  return json({ error: "kind が不正" }, 400);
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
