globalThis.process ??= {};
globalThis.process.env ??= {};
import { requireOrgAdmin } from "./auth_qjtEFOY-.mjs";
import { saveApiKey } from "./client_Ceeu_qGY.mjs";
import { c as cfEgressGateway } from "./ctx_CknKdTPU.mjs";
import { fetchDiscordApp, setDiscordInteractionsUrl, registerDiscordCommands, discordInviteUrl } from "./discord_D9MHUkhA.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request }) => {
  if (!await requireOrgAdmin(env, request)) return json({ error: "管理者のみ" }, 403);
  const b = await request.json().catch(() => ({}));
  const token = (b.token ?? "").trim();
  if (!token) return json({ error: "Bot Token を入力してください。" }, 400);
  const gw = cfEgressGateway(env);
  const app = await fetchDiscordApp(gw, token);
  if (!app) return json({ error: "Bot Token が無効か、アプリ情報を取得できませんでした。Token を確認してください。" }, 400);
  await saveApiKey(env, "discord_bot_token", token);
  await saveApiKey(env, "discord_app_id", app.id);
  await saveApiKey(env, "discord_public_key", app.verifyKey);
  const interactionsUrl = `${new URL(request.url).origin}/api/inbound/discord`;
  const patched = await setDiscordInteractionsUrl(gw, token, interactionsUrl);
  const reg = await registerDiscordCommands(gw, app.id, token);
  const configured = patched.ok && reg.ok;
  const partial = !configured;
  return json({
    ok: true,
    credentialSaved: true,
    configured,
    partial,
    message: configured ? "Discord を接続しました。コマンド・返信が有効です。" : `認証情報は保存しましたが、${!patched.ok ? "Interactions URL の設定" : "コマンド登録"}が完了していません（${(!patched.ok ? patched.detail : reg.detail) ?? "詳細不明"}）。もう一度「接続」をお試しください。`,
    appId: app.id,
    interactionsUrl,
    interactionsSet: patched.ok,
    interactionsDetail: patched.ok ? void 0 : patched.detail,
    commandsRegistered: reg.ok,
    commandsDetail: reg.ok ? void 0 : reg.detail,
    inviteUrl: discordInviteUrl(app.id),
    inviteUrlNoCreate: discordInviteUrl(app.id, { manageChannels: false })
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
