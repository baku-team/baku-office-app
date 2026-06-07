globalThis.process ??= {}; globalThis.process.env ??= {};
const USAGE_PROVIDERS = ["gemini", "claude", "web_search", "image_gen", "tts", "video_gen", "custom"];
const PROVIDER_LABEL = {
  gemini: "Gemini（AI）",
  claude: "Claude（AI）",
  web_search: "Web検索",
  image_gen: "画像生成",
  tts: "音声合成",
  video_gen: "動画生成",
  custom: "カスタムAPI"
};
const todayUtc = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const monthUtc = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
async function recordUsage(env, provider) {
  try {
    await env.DB.prepare(
      "INSERT INTO api_usage (provider, day, count) VALUES (?,?,1) ON CONFLICT(provider, day) DO UPDATE SET count = count + 1"
    ).bind(provider, todayUtc()).run();
  } catch {
  }
}
async function dailyTotals(env, days = 14) {
  const since = new Date(Date.now() - (days - 1) * 864e5).toISOString().slice(0, 10);
  let rows = [];
  try {
    rows = (await env.DB.prepare("SELECT day, SUM(count) AS c FROM api_usage WHERE day >= ? GROUP BY day").bind(since).all()).results;
  } catch {
  }
  const map = new Map(rows.map((r) => [r.day, r.c]));
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    out.push({ day: d, count: map.get(d) ?? 0 });
  }
  return out;
}
async function monthTotals(env) {
  try {
    const rows = (await env.DB.prepare("SELECT provider, SUM(count) AS c FROM api_usage WHERE day LIKE ? GROUP BY provider").bind(monthUtc() + "%").all()).results;
    return Object.fromEntries(rows.map((r) => [r.provider, r.c]));
  } catch {
    return {};
  }
}
async function todayTotals(env) {
  try {
    const rows = (await env.DB.prepare("SELECT provider, count FROM api_usage WHERE day = ?").bind(todayUtc()).all()).results;
    return Object.fromEntries(rows.map((r) => [r.provider, r.count]));
  } catch {
    return {};
  }
}
async function getLimits(env) {
  try {
    return JSON.parse(await env.LICENSE.get("usage_limits") ?? "{}");
  } catch {
    return {};
  }
}
async function setLimits(env, l) {
  await env.LICENSE.put("usage_limits", JSON.stringify(l ?? {}));
}
async function overBudget(env, provider) {
  const lim = (await getLimits(env))[provider];
  if (!lim?.monthlyCap || lim.monthlyCap <= 0) return "ok";
  const used = (await monthTotals(env))[provider] ?? 0;
  if (used >= lim.monthlyCap) return lim.onExceed ?? "pause";
  return "ok";
}
function resetTimes() {
  const now = /* @__PURE__ */ new Date();
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  const mo = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  const fmt = (x) => x.toISOString().slice(0, 16).replace("T", " ") + " UTC";
  return { daily: fmt(d), monthly: fmt(mo) };
}

export { PROVIDER_LABEL, USAGE_PROVIDERS, dailyTotals, getLimits, monthTotals, overBudget, recordUsage, resetTimes, setLimits, todayTotals };
