globalThis.process ??= {};
globalThis.process.env ??= {};
import { estimateUsd } from "./usage_X9PGsLLE.mjs";
import { b as estimateTokens } from "./chat-sessions_BfrxKJEd.mjs";
function estimateBuildStart(env, specCore, opts) {
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const base = clamp(opts.screens ?? 3, 2, 8);
  const nScreens = opts.split ? Math.min(base, 3) : base;
  const renderCount = opts.split ? 2 : Math.min(6, nScreens);
  const calls = 1 + nScreens + renderCount + 1;
  const inPer = estimateTokens((specCore || "").slice(0, 4e3)) + 6e3;
  const inTok = calls * inPer;
  const outTok = 6e3 + nScreens * 3e3 + renderCount * 8e3 + 8e3;
  const tokens = inTok + outTok;
  const usdLow = Math.max(estimateUsd(env, "claude", inTok, outTok), estimateUsd(env, "gemini", inTok, outTok));
  const usdHigh = usdLow * 2;
  const cronMax = opts.paid ? 0 : Math.ceil(calls / 2) * 120;
  const secMin = 24 + nScreens * 15 + 60;
  const secMax = 24 + nScreens * 30 + (opts.split ? renderCount * 60 : 180) + 100 + cronMax;
  return { tokens, usdLow, usdHigh, secMin, secMax };
}
const roundTok = (n) => n >= 1e4 ? `~${Math.round(n / 1e4)}万tokens` : `~${Math.max(1, Math.round(n / 1e3))}千tokens`;
const fmtUsd = (n) => "$" + (n < 1 ? n.toFixed(2) : n.toFixed(1));
const toMin = (sec) => Math.max(1, Math.ceil(sec / 60));
function formatBuildEstimate(e, mode) {
  const tok = roundTok(e.tokens);
  const usd = `${fmtUsd(e.usdLow)}〜${fmtUsd(e.usdHigh)}`;
  const time = `約${toMin(e.secMin)}〜${toMin(e.secMax)}分`;
  if (mode === "inline") return `（目安 ${tok}・${usd}・${time}。概算です）`;
  return `目安 ${tok}／API費（概算） ${usd}／生成時間 ${time}`;
}
export {
  estimateBuildStart,
  formatBuildEstimate
};
