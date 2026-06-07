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

export { getAiEngine, getCustomPrompt, setAiEngine, setCustomPrompt };
