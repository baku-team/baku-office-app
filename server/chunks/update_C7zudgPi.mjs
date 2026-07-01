globalThis.process ??= {};
globalThis.process.env ??= {};
import { kvPut } from "./kv_DEN7iKIl.mjs";
import { d as decryptField, e as encryptField } from "./stripe_r-RFTlbb.mjs";
import { masterKey, pollHost, APP_VERSION } from "./client_CkzMAmmV.mjs";
const KV_HOOK = "deploy_hook";
const DOMAIN = "deploy-hook";
const KV_AUTO = "auto_update";
const KV_AUTO_LAST = "auto_update_last";
function cmpVersion(a, b) {
  const pa = a.split(".").map(Number), pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0);
  }
  return 0;
}
function isValidHookUrl(u) {
  try {
    const x = new URL(u);
    if (x.protocol !== "https:" || !x.hostname) return false;
    const h = x.hostname.toLowerCase();
    return h === "cloudflare.com" || h.endsWith(".cloudflare.com");
  } catch {
    return false;
  }
}
async function hasDeployHook(env) {
  return await env.LICENSE.get(KV_HOOK) !== null;
}
async function saveDeployHook(env, url) {
  const enc = await encryptField(await masterKey(env), url, DOMAIN);
  await kvPut(env, KV_HOOK, enc);
}
async function getDeployHook(env) {
  const stored = await env.LICENSE.get(KV_HOOK);
  if (!stored) return null;
  return decryptField(await masterKey(env), stored, DOMAIN);
}
async function clearDeployHook(env) {
  await env.LICENSE.delete(KV_HOOK);
}
async function getAutoUpdate(env) {
  return await env.LICENSE.get(KV_AUTO) === "on";
}
async function setAutoUpdate(env, on) {
  if (on) await kvPut(env, KV_AUTO, "on");
  else {
    await env.LICENSE.delete(KV_AUTO);
    await env.LICENSE.delete(KV_AUTO_LAST);
  }
}
async function maybeAutoUpdate(env, deployUrl) {
  if (!await getAutoUpdate(env)) return { triggered: false, reason: "off" };
  const hook = await getDeployHook(env);
  if (!hook) return { triggered: false, reason: "no-hook" };
  await pollHost(env, deployUrl).catch(() => null);
  const latest = await env.LICENSE.get("latest_version");
  if (!latest || cmpVersion(latest, APP_VERSION) <= 0) return { triggered: false, reason: "up-to-date" };
  if (await env.LICENSE.get(KV_AUTO_LAST) === latest) return { triggered: false, reason: "pending" };
  try {
    const r = await fetch(hook, { method: "POST", signal: AbortSignal.timeout(15e3) });
    if (!r.ok) return { triggered: false, reason: `hook-${r.status}` };
  } catch {
    return { triggered: false, reason: "hook-error" };
  }
  await kvPut(env, KV_AUTO_LAST, latest);
  return { triggered: true, version: latest };
}
export {
  clearDeployHook,
  cmpVersion,
  getAutoUpdate,
  getDeployHook,
  hasDeployHook,
  isValidHookUrl,
  maybeAutoUpdate,
  saveDeployHook,
  setAutoUpdate
};
