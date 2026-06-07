globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as decryptField, e as encryptField, g as generateMasterKey } from './crypto_BhRWVEcj.mjs';
import { logDiag } from './diag_D3atJWnJ.mjs';

const KV_TOKEN = "license_token";
const KV_ENTITLEMENT = "entitlement";
const KEY_PREFIX = "apikey:";
const nowSec = () => Math.floor(Date.now() / 1e3);
function hostFetch(env, path, init) {
  if (env.HOST) return env.HOST.fetch(new Request("https://host.internal" + path, init));
  return fetch(env.HOST_BASE_URL.replace(/\/$/, "") + path, init);
}
async function getToken(env) {
  return env.LICENSE.get(KV_TOKEN);
}
async function saveToken(env, token) {
  await env.LICENSE.put(KV_TOKEN, token);
}
const APP_VERSION = "0.2.0";
async function pollHost(env, deployUrl, apps) {
  const token = await getToken(env);
  if (!token) return null;
  const qs = new URLSearchParams({ token, version: APP_VERSION });
  if (deployUrl) qs.set("deploy_url", deployUrl);
  if (apps?.length) qs.set("apps", apps.map((a) => `${a.id}:${a.version}`).join(","));
  try {
    const r = await hostFetch(env, "/api/check?" + qs.toString());
    if (!r.ok) return null;
    const data = await r.json();
    await env.LICENSE.put(KV_ENTITLEMENT, data.entitlement);
    return data;
  } catch {
    return null;
  }
}
async function getLicenseId(env) {
  const token = await getToken(env);
  if (!token) return null;
  try {
    const env2 = JSON.parse(atob(token));
    const payload = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(env2.body), (c) => c.charCodeAt(0))));
    return payload.licenseId;
  } catch {
    return null;
  }
}
async function cachedEntitlement(env) {
  return await env.LICENSE.get(KV_ENTITLEMENT) ?? "free";
}
function kvOf(ns) {
  return {
    get: (k) => ns.get(k),
    put: (k, v, o) => ns.put(k, v, o),
    delete: (k) => ns.delete(k),
    list: async (p) => (await ns.list({ prefix: p })).keys.map((x) => x.name)
  };
}
async function resolveMasterKey(env, kv) {
  let k = await kv.get("master_key");
  if (!k) {
    k = generateMasterKey();
    await kv.put("master_key", k);
    await kv.put("master_key_source", "kv-autogen");
    await logDiag(env, "warn", "security", "MASTER_KEY 未設定のため KV に自動生成しました。本番は Worker Secret(MASTER_KEY)の投入を推奨します（鍵と暗号文の同居を避けるため）。");
  }
  return k;
}
async function masterKey(env) {
  if (env.MASTER_KEY) return env.MASTER_KEY;
  return resolveMasterKey(env, kvOf(env.LICENSE));
}
async function masterKeyCtx(ctx) {
  if (ctx.env.MASTER_KEY) return ctx.env.MASTER_KEY;
  return resolveMasterKey(ctx.env, ctx.storage.kv);
}
async function masterKeySource(env) {
  if (env.MASTER_KEY) return "secret";
  return await env.LICENSE.get("master_key_source") ?? "unknown";
}
async function getVerifyJwk(env) {
  const parse = (s) => {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };
  if (env.VERIFY_PUBLIC_JWK) return parse(env.VERIFY_PUBLIC_JWK);
  const cached = await env.LICENSE.get("verify_jwk");
  if (cached) return parse(cached);
  try {
    const r = await hostFetch(env, "/api/pubkey");
    if (r.ok) {
      const t = await r.text();
      if (parse(t)) {
        await env.LICENSE.put("verify_jwk", t);
        return parse(t);
      }
    }
  } catch {
  }
  return null;
}
async function saveApiKey(env, name, value) {
  const enc = await encryptField(await masterKey(env), value, "api-keys");
  await env.LICENSE.put(KEY_PREFIX + name, enc);
}
async function getApiKey(env, name) {
  const stored = await env.LICENSE.get(KEY_PREFIX + name);
  if (!stored) return null;
  return decryptField(await masterKey(env), stored, "api-keys");
}
async function hasApiKey(env, name) {
  return await env.LICENSE.get(KEY_PREFIX + name) !== null;
}
async function validateApiKey(name, value) {
  try {
    if (name === "gemini") {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(value)}`);
      return r.ok ? { ok: true } : { ok: false, detail: `Gemini ${r.status}` };
    }
    if (name === "claude") {
      const r = await fetch("https://api.anthropic.com/v1/models", {
        headers: { "x-api-key": value, "anthropic-version": "2023-06-01" }
      });
      return r.ok ? { ok: true } : { ok: false, detail: `Claude ${r.status}` };
    }
    if (name === "notion") {
      const r = await fetch("https://api.notion.com/v1/users/me", {
        headers: { authorization: `Bearer ${value}`, "Notion-Version": "2022-06-28" }
      });
      return r.ok ? { ok: true } : { ok: false, detail: `Notion ${r.status}` };
    }
    return value.length > 0 ? { ok: true } : { ok: false, detail: "空" };
  } catch (e) {
    return { ok: false, detail: e.message };
  }
}

export { APP_VERSION, cachedEntitlement, getApiKey, getLicenseId, getToken, getVerifyJwk, hasApiKey, hostFetch, masterKey, masterKeyCtx, masterKeySource, nowSec, pollHost, saveApiKey, saveToken, validateApiKey };
