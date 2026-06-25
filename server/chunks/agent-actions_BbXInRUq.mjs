globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession, revokedSince, canDevelopApps } from "./auth_CzEWquZJ.mjs";
import { listApprovals, getApproval, decideApproval } from "./approvals_dE95gvdX.mjs";
import { a as runApprovedTool } from "./cf-adapter_9vcSsLwV.mjs";
import { a as authorizeAppRun } from "./app-runtime_CdUAGt5U.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals, url }) => {
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin") return json({ error: "管理者のみ" }, 403);
  const b = await request.json().catch(() => ({}));
  if (b._action === "list") {
    return json({ ok: true, pending: await listApprovals(env, "pending") });
  }
  if (b._action === "approve" || b._action === "reject") {
    const id = String(b.id ?? "");
    const a = await getApproval(env, id);
    if (!a) return json({ error: "承認が見つかりません" }, 404);
    const requesterRole = a.requester_role || "member";
    const r = await decideApproval(env, id, b._action === "approve", ses.uid, async (tool, args) => {
      if (await revokedSince(env, a.owner, a.created_at)) {
        return { ok: false, error: "申請後に起案者の権限が変更（降格・除名等）されたため実行できません。再申請してください。" };
      }
      if (typeof args.__draftId === "string" && !canDevelopApps(requesterRole)) {
        return { ok: false, error: "アプリ開発の権限がないため、この実送信テストは実行できません。" };
      }
      if (typeof args.__appId === "string" && a.app_id) {
        const reauth = await authorizeAppRun(locals.ctx, a.app_id, a.screen_id ?? void 0, requesterRole);
        if (!reauth.ok) return { ok: false, error: `承認時の再確認に失敗しました：${reauth.error}` };
        if (a.app_version && reauth.appVersion && a.app_version !== reauth.appVersion) {
          return { ok: false, error: "申請後にアプリ定義が更新されました。内容が変わっている可能性があるため、お手数ですが再申請してください。" };
        }
      }
      return runApprovedTool(locals.ctx, a.owner, url.origin, requesterRole, tool, args);
    });
    return r.ok ? json({ ok: true, result: r.result }) : json({ error: r.error }, 400);
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
