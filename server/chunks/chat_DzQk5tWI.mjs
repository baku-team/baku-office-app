globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth_COnj03-x.mjs";
import { cachedEntitlement, nowSec } from "./client_D9LOZLIb.mjs";
import "./stripe_r-RFTlbb.mjs";
import { atLeast } from "./index_CrjiuAkj.mjs";
import { saveFile } from "./storage_lGr9bQlm.mjs";
import { ownedSession, createSession, getMessages, appendMessage, ensureTitle, toTurns } from "./chat-sessions_D_oOKTc3.mjs";
import { parseRequestModel } from "./settings_BgFAT_Wp.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const ctx = locals.ctx;
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要" }, 401);
  if (!atLeast(await cachedEntitlement(env), "plus")) return json({ error: "AIチャットは Plus 以上のプランで利用できます" }, 403);
  const b = await request.json().catch(() => ({}));
  const message = (b.message ?? "").trim();
  if (!message && !b.image?.dataB64) return json({ error: "メッセージが必要" }, 400);
  const { engine: model, modelId } = parseRequestModel(String(b.model ?? ""));
  let prompt = message || "(添付ファイルを確認してください)";
  if (b.image?.dataB64 && b.image.mimeType) {
    try {
      const bin = atob(b.image.dataB64);
      const ext = b.image.mimeType.includes("pdf") ? "pdf" : b.image.mimeType.split("/")[1] || "bin";
      const file = new File([Uint8Array.from(bin, (c) => c.charCodeAt(0))], `upload-${nowSec()}.${ext}`, { type: b.image.mimeType });
      const saved = await saveFile(env, file, ses.uid, ses.ctx);
      prompt = `${prompt}

（添付ファイルを保存しました: file_id=${saved.id}。請求書/領収書なら register_invoice に file_id を渡して登録してください。）`;
    } catch {
    }
  }
  let sessionId = b.sessionId && await ownedSession(ctx, ses.uid, b.sessionId) ? b.sessionId : "";
  if (!sessionId) sessionId = await createSession(ctx, ses.uid, model);
  const prior = await getMessages(ctx, sessionId);
  await appendMessage(ctx, sessionId, "user", message || "(画像を添付)");
  await ensureTitle(ctx, sessionId, message || "画像の確認");
  if (b.background) {
    if (!atLeast(await cachedEntitlement(env), "pro")) return json({ error: "バックグラウンド実行は Pro 以上で利用できます" }, 403);
    const { enqueueAgentJob } = await import("./agent-jobs_Deqeu3YQ.mjs");
    await enqueueAgentJob(ctx, { owner: ses.uid, sessionId, prompt, role: ses.role });
    return json({ ok: true, queued: true, sessionId, reply: "⏳ バックグラウンドで実行中です。完了するとこの会話に結果が追記されます（数分かかる場合があります）。" });
  }
  let reply;
  try {
    reply = await ctx.agent.run({ owner: ses.uid, text: prompt, image: b.image, role: ses.role, baseUrl: new URL(request.url).origin, history: toTurns(prior), model, modelId });
  } catch (e) {
    const msg = e?.message ?? String(e);
    await (await import("./diag_ul3h80Zr.mjs")).logDiag(env, "error", "chat", `agent.run失敗(model=${b.model ?? "auto"}): ${msg}`);
    reply = "⚠️ AIの実行でエラーが発生しました。時間をおいて再度お試しください。別のモデル（Gemini など）もお試しいただけます。";
  }
  await appendMessage(ctx, sessionId, "assistant", reply);
  return json({ ok: true, reply, sessionId });
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
