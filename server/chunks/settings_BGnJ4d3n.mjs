globalThis.process ??= {};
globalThis.process.env ??= {};
import { kvPut } from "./kv_HFVc6CJO.mjs";
import { isValidGeminiModel, isValidClaudeModel, isValidOpenAiModel, isValidWorkersAiModel, DEFAULT_MODELS } from "./config_M3rcN2DV.mjs";
const DEFAULT_RECEPTION = { mode: "box", minHostTrust: 0.3, requireVerified: false, requireAiReview: false, requireCertified: false };
async function getReceptionPolicy(env) {
  const raw = await env.LICENSE.get("reception_policy");
  if (!raw) return { ...DEFAULT_RECEPTION };
  try {
    const p = JSON.parse(raw);
    return { ...DEFAULT_RECEPTION, ...p, mode: ["box", "auto", "hybrid"].includes(p.mode) ? p.mode : "box" };
  } catch {
    return { ...DEFAULT_RECEPTION };
  }
}
async function setReceptionPolicy(env, p) {
  const cur = await getReceptionPolicy(env);
  const next = {
    mode: p.mode && ["box", "auto", "hybrid"].includes(p.mode) ? p.mode : cur.mode,
    minHostTrust: typeof p.minHostTrust === "number" ? Math.max(0, Math.min(1, p.minHostTrust)) : cur.minHostTrust,
    requireVerified: typeof p.requireVerified === "boolean" ? p.requireVerified : cur.requireVerified,
    requireAiReview: typeof p.requireAiReview === "boolean" ? p.requireAiReview : cur.requireAiReview,
    requireCertified: typeof p.requireCertified === "boolean" ? p.requireCertified : cur.requireCertified
  };
  await kvPut(env, "reception_policy", JSON.stringify(next));
  return next;
}
async function getBookkeepingMode(env) {
  return await env.LICENSE.get("bookkeeping_mode") === "double" ? "double" : "single";
}
async function setBookkeepingMode(env, m) {
  const v = m === "double" ? "double" : "single";
  await kvPut(env, "bookkeeping_mode", v);
  return v;
}
async function getWorkersAiModel(env) {
  const saved = (await env.LICENSE.get("workers_ai_model"))?.trim();
  if (saved && isValidWorkersAiModel(saved)) return saved;
  return env.WORKERS_AI_MODEL?.trim() || DEFAULT_MODELS.workers_ai;
}
async function setWorkersAiModel(env, id) {
  const v = isValidWorkersAiModel(id) ? id : DEFAULT_MODELS.workers_ai;
  await kvPut(env, "workers_ai_model", v);
  return v;
}
async function getAiEngine(env) {
  const v = await env.LICENSE.get("ai_engine");
  return v === "claude" ? "claude" : v === "openai" ? "openai" : "gemini";
}
async function setAiEngine(env, e) {
  const v = e === "claude" ? "claude" : e === "openai" ? "openai" : "gemini";
  await kvPut(env, "ai_engine", v);
  return v;
}
function isMemberModel(v) {
  if (typeof v !== "string") return false;
  return v === "gemini" || v === "claude" || v === "openai" || v === "local" || isValidGeminiModel(v) || isValidClaudeModel(v) || isValidOpenAiModel(v) || isValidWorkersAiModel(v);
}
function resolveModelSelection(v) {
  if (v && isValidGeminiModel(v)) return { engine: "gemini", modelId: v };
  if (v && isValidClaudeModel(v)) return { engine: "claude", modelId: v };
  if (v && isValidOpenAiModel(v)) return { engine: "openai", modelId: v };
  if (v && isValidWorkersAiModel(v)) return { engine: "local", modelId: v };
  if (v === "claude") return { engine: "claude" };
  if (v === "openai") return { engine: "openai" };
  if (v === "local") return { engine: "local" };
  return { engine: "gemini" };
}
function parseRequestModel(raw) {
  if (!raw) return {};
  if (raw === "gemini" || raw === "claude" || raw === "openai" || raw === "local") return { engine: raw };
  if (isValidGeminiModel(raw)) return { engine: "gemini", modelId: raw };
  if (isValidClaudeModel(raw)) return { engine: "claude", modelId: raw };
  if (isValidOpenAiModel(raw)) return { engine: "openai", modelId: raw };
  if (isValidWorkersAiModel(raw)) return { engine: "local", modelId: raw };
  return {};
}
async function getMemberModel(env, uid) {
  if (!uid) return null;
  const v = await env.LICENSE.get("member_model:" + uid);
  return isMemberModel(v) ? v : null;
}
async function setMemberModel(env, uid, v) {
  const val = isMemberModel(v) ? v : "gemini";
  await kvPut(env, "member_model:" + uid, val);
  return val;
}
async function getFavApps(env, uid) {
  if (!uid) return [];
  try {
    const v = await env.LICENSE.get("member_fav_apps:" + uid);
    const a = v ? JSON.parse(v) : [];
    return Array.isArray(a) ? a.filter((x) => typeof x === "string").slice(0, 30) : [];
  } catch {
    return [];
  }
}
async function toggleFavApp(env, uid, appId) {
  if (!uid || !appId) return getFavApps(env, uid);
  const cur = await getFavApps(env, uid);
  const next = cur.includes(appId) ? cur.filter((x) => x !== appId) : [appId, ...cur].slice(0, 30);
  await kvPut(env, "member_fav_apps:" + uid, JSON.stringify(next));
  return next;
}
const FOLDER_MAX = 30;
const FOLDER_APPS_MAX = 100;
function cleanFolders(input) {
  if (!Array.isArray(input)) return [];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const f of input) {
    if (!f || typeof f !== "object") continue;
    const x = f;
    const id = typeof x.id === "string" ? x.id.slice(0, 40) : "";
    const name = typeof x.name === "string" ? x.name.trim().slice(0, 40) : "";
    if (!id || !name) continue;
    const apps = [];
    if (Array.isArray(x.apps)) {
      for (const h of x.apps) {
        if (typeof h !== "string" || !h || seen.has(h)) continue;
        seen.add(h);
        apps.push(h.slice(0, 200));
        if (apps.length >= FOLDER_APPS_MAX) break;
      }
    }
    out.push({ id, name, apps });
    if (out.length >= FOLDER_MAX) break;
  }
  return out;
}
async function getAppFolders(env, uid) {
  if (!uid) return [];
  try {
    const v = await env.LICENSE.get("member_app_folders:" + uid);
    return cleanFolders(v ? JSON.parse(v) : []);
  } catch {
    return [];
  }
}
async function setAppFolders(env, uid, folders) {
  if (!uid) return [];
  const clean = cleanFolders(folders);
  await kvPut(env, "member_app_folders:" + uid, JSON.stringify(clean));
  return clean;
}
const CUSTOM_PROMPT_MAX = 2e3;
async function getCustomPrompt(env) {
  return await env.LICENSE.get("custom_prompt") ?? "";
}
async function setCustomPrompt(env, s) {
  const v = (s ?? "").slice(0, CUSTOM_PROMPT_MAX);
  await kvPut(env, "custom_prompt", v);
  return v;
}
async function getWorkersPaid(env) {
  return await env.LICENSE.get("workers_paid") === "true";
}
async function setWorkersPaid(env, enabled) {
  await kvPut(env, "workers_paid", enabled ? "true" : "false");
  return enabled;
}
async function getNotifyWebhook(env) {
  return await env.LICENSE.get("notify_webhook_url") ?? "";
}
async function setNotifyWebhook(env, url) {
  const v = (url ?? "").trim().slice(0, 500);
  await kvPut(env, "notify_webhook_url", v);
  return v;
}
async function maxParallelAgents(env) {
  return await getWorkersPaid(env) ? 5 : 2;
}
async function agentMaxHops(env) {
  return await getWorkersPaid(env) ? 8 : 6;
}
export {
  agentMaxHops,
  getAiEngine,
  getAppFolders,
  getBookkeepingMode,
  getCustomPrompt,
  getFavApps,
  getMemberModel,
  getNotifyWebhook,
  getReceptionPolicy,
  getWorkersAiModel,
  getWorkersPaid,
  isMemberModel,
  maxParallelAgents,
  parseRequestModel,
  resolveModelSelection,
  setAiEngine,
  setAppFolders,
  setBookkeepingMode,
  setCustomPrompt,
  setMemberModel,
  setNotifyWebhook,
  setReceptionPolicy,
  setWorkersAiModel,
  setWorkersPaid,
  toggleFavApp
};
