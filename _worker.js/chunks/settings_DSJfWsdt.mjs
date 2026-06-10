globalThis.process ??= {}; globalThis.process.env ??= {};
async function getAiEngine(env) {
  return await env.LICENSE.get("ai_engine") === "claude" ? "claude" : "gemini";
}
async function setAiEngine(env, e) {
  const v = e === "claude" ? "claude" : "gemini";
  await env.LICENSE.put("ai_engine", v);
  return v;
}
const CUSTOM_PROMPT_MAX = 2e3;
async function getCustomPrompt(env) {
  return await env.LICENSE.get("custom_prompt") ?? "";
}
async function setCustomPrompt(env, s) {
  const v = (s ?? "").slice(0, CUSTOM_PROMPT_MAX);
  await env.LICENSE.put("custom_prompt", v);
  return v;
}
async function getWorkersPaid(env) {
  return await env.LICENSE.get("workers_paid") === "true";
}
async function setWorkersPaid(env, enabled) {
  await env.LICENSE.put("workers_paid", enabled ? "true" : "false");
  return enabled;
}
async function getNotifyWebhook(env) {
  return await env.LICENSE.get("notify_webhook_url") ?? "";
}
async function setNotifyWebhook(env, url) {
  const v = (url ?? "").trim().slice(0, 500);
  await env.LICENSE.put("notify_webhook_url", v);
  return v;
}
async function maxParallelAgents(env) {
  return await getWorkersPaid(env) ? 5 : 2;
}
async function agentMaxHops(env) {
  return await getWorkersPaid(env) ? 6 : 4;
}

export { agentMaxHops, getAiEngine, getCustomPrompt, getNotifyWebhook, getWorkersPaid, maxParallelAgents, setAiEngine, setCustomPrompt, setNotifyWebhook, setWorkersPaid };
