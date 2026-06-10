globalThis.process ??= {}; globalThis.process.env ??= {};
import { v as verifyEnvelope, i as importVerifyKey, p as payloadOf } from '../../../chunks/crypto_D21r3Dwx.mjs';
import { getVerifyJwk, nowSec } from '../../../chunks/client_DjSYVqc9.mjs';
import { resolveAction, runResolvedAction } from '../../../chunks/a2a-actions_CFnuxRO_.mjs';
import { logDiag } from '../../../chunks/diag_v9I7g07l.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ctx = locals.ctx;
  const envlp = await request.json().catch(() => null);
  if (!envlp || typeof envlp.body !== "string" || typeof envlp.sig !== "string") return json({ ok: false, error: "形式不正" }, 400);
  const jwk = await getVerifyJwk(env);
  if (!jwk) return json({ ok: false, error: "検証鍵が未設定" }, 503);
  if (!await verifyEnvelope(await importVerifyKey(jwk), envlp)) return json({ ok: false, error: "署名検証に失敗" }, 401);
  const p = payloadOf(envlp);
  if (!p || typeof p.exp !== "number" || p.exp < nowSec()) return json({ ok: false, error: "期限切れ" }, 401);
  const nonce = typeof p.nonce === "string" ? p.nonce : "";
  if (!nonce) return json({ ok: false, error: "nonce が必要" }, 401);
  const nk = "a2anonce:" + nonce;
  if (await env.LICENSE.get(nk)) return json({ ok: false, error: "リプレイ検出（使用済み nonce）" }, 409);
  await env.LICENSE.put(nk, "1", { expirationTtl: 120 });
  const name = String(p.action ?? "");
  if (!name) return json({ ok: false, error: "action が必要" }, 400);
  const groupId = p.groupId ? String(p.groupId) : "";
  const row = await resolveAction(ctx, name, { groupId: groupId || void 0, from: p.from });
  if (!row) {
    await logDiag(env, "warn", "other", `A2A 未公開/対象外アクション拒否: ${name}（from ${p.from ?? "?"}${groupId ? ` / group ${groupId}` : ""}）`);
    return json({ ok: false, error: "このアクションは公開されていません" }, 403);
  }
  try {
    const result = await runResolvedAction(ctx, row, p.args ?? {});
    await logDiag(env, "info", "other", `A2A 実行: ${name}（from ${p.from ?? "?"}${groupId ? ` / group ${groupId}` : ""}）`);
    return json({ ok: true, result });
  } catch (e) {
    return json({ ok: false, error: e.message ?? "実行に失敗" }, 400);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
