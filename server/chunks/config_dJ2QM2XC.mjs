globalThis.process ??= {};
globalThis.process.env ??= {};
const DEFAULT_MODELS = {
  gemini: "gemini-2.5-flash",
  claude: "claude-sonnet-4-6",
  workers_ai: "@cf/meta/llama-3.1-8b-instruct-fast"
  // Cloudflare Workers AI（CF上で稼働・ニューロン課金）。
  // WHY -fast：無印 @cf/meta/llama-3.1-8b-instruct は 2026-05-30 に廃止。-fast バリアントは存続（プロンプト互換のドロップイン）。
};
const DEFAULT_PRICING = {
  gemini: { in: 0.3, out: 2.5 },
  claude: { in: 3, out: 15 },
  workers_ai: { in: 0.05, out: 0.3 }
};
const NEURON_USD = 0.011 / 1e3;
function neuronsFromUsd(usd) {
  return usd > 0 ? Math.round(usd / NEURON_USD) : 0;
}
function geminiModelId(env) {
  return env.GEMINI_MODEL?.trim() || DEFAULT_MODELS.gemini;
}
function claudeModelId(env) {
  return env.CLAUDE_MODEL?.trim() || DEFAULT_MODELS.claude;
}
function workersAiModelId(env) {
  return env.WORKERS_AI_MODEL?.trim() || DEFAULT_MODELS.workers_ai;
}
const WORKERS_AI_MODELS = [
  { id: "@cf/meta/llama-3.1-8b-instruct-fast", label: "標準", note: "高速・軽量（既定）" },
  { id: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", label: "高性能", note: "賢いが少し遅い（70B）" }
];
function isValidWorkersAiModel(id) {
  return WORKERS_AI_MODELS.some((m) => m.id === id);
}
const GEMINI_MODELS = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", note: "高速・低コスト（既定）" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", note: "高品質・やや低速/高コスト" }
];
function isValidGeminiModel(id) {
  return GEMINI_MODELS.some((m) => m.id === id);
}
const CLAUDE_MODELS = [
  { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", note: "速い・低コスト" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", note: "バランス（既定）" },
  { id: "claude-opus-4-8", name: "Claude Opus 4.8", note: "最高精度・高コスト" }
];
function isValidClaudeModel(id) {
  return CLAUDE_MODELS.some((m) => m.id === id);
}
function hasPricing(env, provider) {
  return Boolean(resolvePricing(env)[provider]);
}
function resolvePricing(env) {
  const merged = { ...DEFAULT_PRICING };
  const raw = env.MODEL_PRICING;
  if (!raw) return merged;
  try {
    const parsed = JSON.parse(raw);
    for (const [k, v] of Object.entries(parsed)) {
      const i = Number(v?.in), o = Number(v?.out);
      if (Number.isFinite(i) && i >= 0 && Number.isFinite(o) && o >= 0) merged[k] = { in: i, out: o };
    }
  } catch {
  }
  return merged;
}
export {
  CLAUDE_MODELS,
  DEFAULT_MODELS,
  DEFAULT_PRICING,
  GEMINI_MODELS,
  NEURON_USD,
  WORKERS_AI_MODELS,
  claudeModelId,
  geminiModelId,
  hasPricing,
  isValidClaudeModel,
  isValidGeminiModel,
  isValidWorkersAiModel,
  neuronsFromUsd,
  resolvePricing,
  workersAiModelId
};
