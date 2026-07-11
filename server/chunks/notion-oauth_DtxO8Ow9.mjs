globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as randomId } from "./stripe_r-RFTlbb.mjs";
import { kvPut } from "./kv_ryUreqJI.mjs";
const AUTHORIZE = "https://api.notion.com/v1/oauth/authorize";
const TOKEN = "https://api.notion.com/v1/oauth/token";
function notionOAuthEnabled(env) {
  return !!(env.NOTION_CLIENT_ID && env.NOTION_CLIENT_SECRET);
}
function notionRedirectUri(origin) {
  return `${origin}/api/notion/oauth/callback`;
}
const newNotionState = () => randomId(12);
function notionAuthorizeUrl(env, origin, state) {
  if (!env.NOTION_CLIENT_ID) return null;
  const u = new URL(AUTHORIZE);
  u.searchParams.set("client_id", env.NOTION_CLIENT_ID);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("owner", "user");
  u.searchParams.set("redirect_uri", notionRedirectUri(origin));
  u.searchParams.set("state", state);
  return u.toString();
}
async function exchangeNotionCode(env, code, origin) {
  if (!env.NOTION_CLIENT_ID || !env.NOTION_CLIENT_SECRET) return null;
  const basic = btoa(`${env.NOTION_CLIENT_ID}:${env.NOTION_CLIENT_SECRET}`);
  const r = await fetch(TOKEN, {
    method: "POST",
    headers: { authorization: `Basic ${basic}`, "content-type": "application/json" },
    body: JSON.stringify({ grant_type: "authorization_code", code, redirect_uri: notionRedirectUri(origin) })
  });
  if (!r.ok) {
    console.log("[notion-oauth-token]", r.status, (await r.text()).slice(0, 200));
    return null;
  }
  const tok = await r.json();
  if (tok.access_token && tok.workspace_id) {
    const prev = await env.LICENSE.get("notion_workspace").catch(() => null);
    let prevId = "";
    try {
      prevId = prev ? JSON.parse(prev).id ?? "" : "";
    } catch {
      prevId = "";
    }
    await kvPut(env, "notion_workspace", JSON.stringify({ id: tok.workspace_id, name: tok.workspace_name ?? "", bot_id: tok.bot_id ?? "", changed: prevId && prevId !== tok.workspace_id ? true : false }));
  }
  return tok.access_token ?? null;
}
async function notionWorkspace(env) {
  try {
    const w = JSON.parse(await env.LICENSE.get("notion_workspace") ?? "null");
    return w?.id ? { id: w.id, name: w.name ?? "" } : null;
  } catch {
    return null;
  }
}
async function disconnectNotion(env) {
  await env.LICENSE.delete("apikey:notion").catch(() => {
  });
  await env.LICENSE.delete("notion_workspace").catch(() => {
  });
}
export {
  disconnectNotion,
  exchangeNotionCode,
  newNotionState,
  notionAuthorizeUrl,
  notionOAuthEnabled,
  notionRedirectUri,
  notionWorkspace
};
