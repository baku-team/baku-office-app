globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth_BGTIef-m.mjs";
import { cachedEntitlement, nowSec } from "./client_BbGjOLTN.mjs";
import "./stripe_r-RFTlbb.mjs";
import { atLeast } from "./index_CrjiuAkj.mjs";
import { saveFile } from "./storage_S4P08Enk.mjs";
import { ownedSession, createSession, getMessages, appendMessage, ensureTitle, toTurns } from "./chat-sessions_D1ns0SmC.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
function toolStepLabel(name) {
  const M = {
    record_expense: "会計に記録しています…",
    list_expenses: "会計を確認しています…",
    register_invoice: "請求書を登録しています…",
    list_unpaid_invoices: "未払いの請求書を確認しています…",
    mark_invoice_paid: "支払い状況を更新しています…",
    search_members: "名簿を調べています…",
    set_reminder: "予定を登録しています…",
    list_reminders: "予定を確認しています…",
    list_events: "カレンダーを確認しています…",
    create_event: "予定を作成しています…",
    update_event: "予定を更新しています…",
    delete_event: "予定を削除しています…",
    search_messages: "メールを検索しています…",
    list_messages: "メールを確認しています…",
    get_message: "メールを読んでいます…",
    get_attachment: "添付を取得しています…",
    send_message: "メッセージを送信しています…",
    list_conference_records: "会議の記録を確認しています…",
    get_transcript: "議事を読み込んでいます…",
    summarize_meeting: "会議をまとめています…",
    save_knowledge: "知識を保存しています…",
    search_knowledge: "資料を調べています…",
    save_memo: "メモを保存しています…",
    submit_receipt: "領収書を申請しています…",
    make_document: "書類を作成しています…",
    search: "情報を調べています…",
    generate_image: "画像を生成しています…",
    generate_video: "動画を生成しています…",
    synthesize_speech: "音声を作成しています…",
    run_subagent: "担当者に相談しています…",
    run_team: "複数の担当で分担しています…",
    run_skill: "登録済みの手順を実行しています…",
    install_skill: "手順を登録しています…",
    find_partner: "連携先を探しています…",
    call_partner: "連携先に問い合わせています…"
  };
  return M[name] ?? "情報を処理しています…";
}
const POST = async ({ request, locals }) => {
  const ctx = locals.ctx;
  const ses = await getSession(env, request);
  if (!ses) return json({ error: "ログインが必要" }, 401);
  if (!atLeast(await cachedEntitlement(env), "plus")) return json({ error: "AIチャットは Plus 以上のプランで利用できます" }, 403);
  const b = await request.json().catch(() => ({}));
  const message = (b.message ?? "").trim();
  if (!message && !b.image?.dataB64) return json({ error: "メッセージが必要" }, 400);
  const rawModel = String(b.model ?? "");
  const model = rawModel === "gemini" || rawModel === "claude" || rawModel === "local" ? rawModel : rawModel.startsWith("@cf/") ? "local" : void 0;
  const waModel = rawModel.startsWith("@cf/") ? rawModel : void 0;
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
  const enc = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const send = (o) => {
    void writer.write(enc.encode(`data: ${JSON.stringify(o)}

`));
  };
  (async () => {
    try {
      const onEvent = (ev) => {
        if (ev.type === "thinking") send({ type: "step", label: "考えています…" });
        else send({ type: "step", label: toolStepLabel(ev.name) });
      };
      const reply = await ctx.agent.run({ owner: ses.uid, text: prompt, image: b.image, role: ses.role, baseUrl: new URL(request.url).origin, history: toTurns(prior), model, waModel, onEvent });
      await appendMessage(ctx, sessionId, "assistant", reply);
      send({ type: "done", reply, sessionId });
    } catch (e) {
      const msg = e?.message ?? String(e);
      await (await import("./diag_DOeJQ78v.mjs")).logDiag(env, "error", "chat", `stream失敗(model=${b.model ?? "auto"}): ${msg}`).catch(() => {
      });
      const fallback = "⚠️ AIの実行でエラーが発生しました。時間をおいて再度お試しください。別のモデルもお試しいただけます。";
      try {
        await appendMessage(ctx, sessionId, "assistant", fallback);
      } catch {
      }
      send({ type: "done", reply: fallback, sessionId });
    } finally {
      await writer.close().catch(() => {
      });
    }
  })();
  return new Response(readable, {
    headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-cache, no-transform", "x-accel-buffering": "no" }
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
