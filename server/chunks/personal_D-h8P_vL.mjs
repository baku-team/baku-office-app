globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth__5t3T1Cz.mjs";
import { createPersonalItem, shareItem } from "./users_P2YEHT8X.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要" }, 401);
  const b = await request.json().catch(() => ({}));
  if (b._action === "create") {
    const id = await createPersonalItem(env, ses.uid, {
      type: String(b.type ?? "memo"),
      title: String(b.title ?? ""),
      body: b.body ? String(b.body) : void 0,
      amount: b.amount ? Number(b.amount) : void 0,
      date: b.date ? String(b.date) : void 0
    });
    return json({ ok: true, id });
  }
  if (b._action === "share" && typeof b.id === "string") {
    if (ses.ctx !== "personal") return json({ error: "共有申請は個人ログインでのみ行えます" }, 403);
    await shareItem(env, b.id, ses.uid);
    return json({ ok: true });
  }
  return json({ error: "不明な操作" }, 400);
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
