globalThis.process ??= {};
globalThis.process.env ??= {};
import { env } from "cloudflare:workers";
import { r as resolveDrainKey } from "./cron-auth_D7uTBWQd.mjs";
import { logBuild } from "./diag_-P_u6Fn4.mjs";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const key = await resolveDrainKey(env);
  if (!key || request.headers.get("x-internal-key") !== key) return json({ error: "unauthorized" }, 401);
  const b = await request.json().catch(() => ({}));
  const buildId = String(b.buildId ?? "").trim();
  if (!buildId) return json({ error: "buildId required" }, 400);
  const origin = String(b.origin ?? "");
  const ctx = locals.ctx;
  if (buildId.startsWith("aj:")) {
    const { processAgentJobById } = await import("./agent-jobs_D1mo_Bd7.mjs");
    const r = await processAgentJobById(ctx, buildId.slice(3), origin);
    return r === "done" ? json({ more: false, done: true }) : json({ more: false, retryable: true });
  }
  await logBuild(env, buildId, "tick 受信(DO)", `origin=${origin}`);
  const { processAppBuild } = await import("./ctx_Ige4T837.mjs").then((n) => n.V);
  const more = await processAppBuild(ctx, buildId, origin, { maxSteps: 8, deadlineMs: 24e4, src: "do-tick" });
  if (more) return json({ more: true });
  const row = await ctx.db.first("SELECT status FROM app_builds WHERE id=?", [buildId]);
  const terminal = !row || ["done", "done_partial", "error", "cancelled"].includes(row.status);
  return terminal ? json({ more: false, done: true }) : json({ more: false, retryable: true });
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
