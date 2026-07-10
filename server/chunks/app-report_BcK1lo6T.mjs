globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth_BO4LdvYt.mjs";
import { reportAppToHost } from "./reports_D-qX5Ss8.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request }) => {
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要です" }, 401);
  if (ses.role !== "admin" && ses.role !== "developer") return json({ error: "アプリの報告は開発担当（管理者/開発者）のみ可能です" }, 403);
  const b = await request.json().catch(() => ({}));
  const appId = String(b.appId ?? "").trim();
  if (!appId) return json({ error: "対象アプリ(appId)が必要です" }, 400);
  const r = await reportAppToHost(env, appId, typeof b.note === "string" ? b.note : "");
  if (!r.ok) return json({ error: r.error }, 400);
  return json({ ok: true, message: "開発元に報告しました。作成時のセッションと成果物（定義・診断）を確認して対応します。" });
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
