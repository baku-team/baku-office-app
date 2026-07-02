globalThis.process ??= {};
globalThis.process.env ??= {};
import { getToken, hostFetch, APP_VERSION, nowSec } from "./client_DBc4AdQ5.mjs";
import { kvPut } from "./kv_BKafWGCx.mjs";
import { monthCallAgg } from "./usage_Br94sshr.mjs";
import { monthKpi } from "./kpi_4HFnf6yU.mjs";
async function buildUsageDigest(env, months) {
  const out = [];
  for (const month of months) {
    const usage = (await monthCallAgg(env, month)).map((u) => ({ ...u, model: u.model ?? "" }));
    const k = await monthKpi(env, month);
    if (usage.length === 0 && k.total === 0) continue;
    out.push({
      month,
      usage: usage.slice(0, 200),
      kpi: {
        total: k.total,
        completed: k.completed,
        completionRate: k.completionRate,
        rework: k.rework,
        reworkRate: k.reworkRate,
        savedMinutes: k.savedMinutes,
        savedJpy: k.savedJpy,
        feedbackMinutes: k.feedbackMinutes,
        activeUsers: k.activeUsers,
        byKind: k.byKind,
        hotspots: k.hotspots,
        unmet: k.unmet,
        nps: k.nps,
        aiCostUsd: k.aiCostUsd,
        aiCostJpy: k.aiCostJpy,
        roi: k.roi
      }
    });
  }
  return out;
}
async function flushUsageDigest(env) {
  const last = Number(await env.LICENSE.get("usage_digest_last"));
  const now = nowSec();
  if (Number.isFinite(last) && now - last < 24 * 3600) return false;
  const token = await getToken(env);
  if (!token) return false;
  const cur = /* @__PURE__ */ new Date();
  const curM = cur.toISOString().slice(0, 7);
  const prevM = new Date(Date.UTC(cur.getUTCFullYear(), cur.getUTCMonth() - 1, 1)).toISOString().slice(0, 7);
  const months = await buildUsageDigest(env, [prevM, curM]);
  if (!months.length) {
    await kvPut(env, "usage_digest_last", String(now));
    return false;
  }
  try {
    const r = await hostFetch(env, "/api/usage-digest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, appVersion: APP_VERSION, months })
    });
    if (r.ok) await kvPut(env, "usage_digest_last", String(now));
    return r.ok;
  } catch {
    return false;
  }
}
export {
  buildUsageDigest,
  flushUsageDigest
};
