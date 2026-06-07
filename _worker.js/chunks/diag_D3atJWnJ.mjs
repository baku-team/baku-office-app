globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as randomId } from './crypto_BhRWVEcj.mjs';
import { nowSec } from './accounting_BOhbglhy.mjs';

function looksLikeLimit(msg) {
  return /exceeded|cpu|time limit|too many subrequests|memory|Worker exceeded|limit|killed|terminated|1102|1027/i.test(msg);
}
async function logDiag(env, level, category, message, context = "") {
  try {
    await env.DB.prepare("INSERT INTO diagnostics (id,level,category,message,context,created_at) VALUES (?,?,?,?,?,?)").bind(randomId(), level, category, message.slice(0, 500), context.slice(0, 500), nowSec()).run();
  } catch {
  }
}
async function recentDiagnostics(env, limit = 50) {
  return (await env.DB.prepare("SELECT level,category,message,created_at FROM diagnostics ORDER BY created_at DESC LIMIT ?").bind(limit).all()).results;
}
async function hasRecentLimitError(env) {
  const since = nowSec() - 86400;
  const row = await env.DB.prepare("SELECT 1 FROM diagnostics WHERE category='limit' AND created_at>=? LIMIT 1").bind(since).first();
  return !!row;
}
async function guardHeavy(env, label, fn) {
  try {
    return { ok: true, value: await fn() };
  } catch (e) {
    const msg = e.message ?? String(e);
    const limit = looksLikeLimit(msg);
    await logDiag(env, "error", limit ? "limit" : "other", `${label}: ${msg}`);
    return { ok: false, error: msg, limit };
  }
}
const PAID_HINT = "処理がCloudflareの無料枠の制限（CPU時間・実行時間など）に達した可能性があります。大きなファイルや重い処理を安定させるには、管理画面の【高度なオプション → Workers Paid】の案内に沿ってCloudflareの有料プラン(Workers Paid)へ切り替えてください。";

export { PAID_HINT, guardHeavy, hasRecentLimitError, logDiag, looksLikeLimit, recentDiagnostics };
