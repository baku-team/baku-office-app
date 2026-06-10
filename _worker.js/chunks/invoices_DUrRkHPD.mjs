globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as randomId } from './crypto_D21r3Dwx.mjs';
import { nowSec } from './accounting_B0MwRt9i.mjs';
import { getFile, saveFile, fileBelongsTo } from './storage_ComUGkKO.mjs';
import { getApiKey } from './client_DjSYVqc9.mjs';
import { r as recordUsage, g as geminiModelId, a as recordTokens, c as claudeModelId, o as overBudget } from './usage_ClrX51CC.mjs';

async function setReminder(ctx, owner, a) {
  const at = Math.floor(new Date(a.remind_at).getTime() / 1e3);
  if (!Number.isFinite(at)) return "日時を解釈できませんでした（例：2026-06-20T10:00）。";
  await ctx.db.prepare("INSERT INTO reminders (id,owner,content,remind_at,done,created_at) VALUES (?,?,?,?,0,?)").bind(randomId(), owner, a.content, at, nowSec()).run();
  return `リマインダー設定：${a.remind_at} に「${a.content}」`;
}
async function listReminders(ctx, owner) {
  const { results } = await ctx.db.prepare("SELECT content,remind_at FROM reminders WHERE owner=? AND done=0 ORDER BY remind_at LIMIT 10").bind(owner).all();
  if (!results.length) return "未配信のリマインダーはありません。";
  return results.map((r) => `・${new Date(r.remind_at * 1e3).toISOString().slice(0, 16).replace("T", " ")} ${r.content}`).join("\n");
}
async function dueReminders(ctx, owner) {
  const now = nowSec();
  const sql = owner ? "SELECT id,owner,content FROM reminders WHERE done=0 AND remind_at<=? AND owner=? ORDER BY remind_at LIMIT 20" : "SELECT id,owner,content FROM reminders WHERE done=0 AND remind_at<=? ORDER BY remind_at LIMIT 50";
  const stmt = owner ? ctx.db.prepare(sql).bind(now, owner) : ctx.db.prepare(sql).bind(now);
  const { results } = await stmt.all();
  return results;
}
async function markReminderDone(ctx, id) {
  await ctx.db.prepare("UPDATE reminders SET done=1 WHERE id=?").bind(id).run();
}
const remindersPart = {
  id: "reminders",
  name: "リマインダー",
  version: "1.0.0",
  category: "庶務",
  description: "指定日時の通知。",
  permissions: ["db:read", "db:write"],
  menu: [{ href: "/schedule", label: "予定" }],
  agentTools: [
    {
      name: "set_reminder",
      description: "指定日時にLINEへ通知",
      parameters: { type: "object", properties: { content: { type: "string" }, remind_at: { type: "string", description: "ISO日時" } }, required: ["content", "remind_at"] },
      run: (ctx, owner, _baseUrl, a) => setReminder(ctx, owner, { content: String(a.content), remind_at: String(a.remind_at) })
    },
    {
      name: "list_reminders",
      description: "未配信リマインダー一覧",
      parameters: { type: "object", properties: {} },
      run: (ctx, owner) => listReminders(ctx, owner)
    }
  ]
};

async function geminiUpload(key, buf, mime) {
  const start = await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "X-Goog-Upload-Protocol": "resumable", "X-Goog-Upload-Command": "start", "X-Goog-Upload-Header-Content-Length": String(buf.byteLength), "X-Goog-Upload-Header-Content-Type": mime, "content-type": "application/json" },
    body: JSON.stringify({ file: { display_name: "doc" } })
  });
  const url = start.headers.get("x-goog-upload-url");
  if (!start.ok || !url) return null;
  const up = await fetch(url, { method: "POST", headers: { "Content-Length": String(buf.byteLength), "X-Goog-Upload-Offset": "0", "X-Goog-Upload-Command": "upload, finalize" }, body: buf });
  if (!up.ok) return null;
  return (await up.json()).file?.uri ?? null;
}
async function geminiGenerate(env, key, parts, tools) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiModelId(env))}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts }], ...tools ? { tools } : {}, generationConfig: { maxOutputTokens: 1200 } })
  });
  if (!r.ok) {
    console.log("[gemini-gen]", r.status, (await r.text()).slice(0, 150));
    return "";
  }
  const d = await r.json();
  await recordTokens(env, "gemini", { inputTokens: d.usageMetadata?.promptTokenCount ?? 0, outputTokens: d.usageMetadata?.candidatesTokenCount ?? 0 });
  return d.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";
}
async function transcribeAudio(env, buf, mime) {
  const key = await getApiKey(env, "gemini");
  if (!key) return null;
  await recordUsage(env, "gemini");
  const prompt = "この音声を日本語で文字起こしし、会議なら話者を区別して要点・決定事項を議事録形式でまとめてください。";
  if (buf.byteLength <= 18 * 1024 * 1024) {
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    return geminiGenerate(env, key, [{ text: prompt }, { inlineData: { mimeType: mime, data: b64 } }]);
  }
  const uri = await geminiUpload(key, buf, mime);
  if (!uri) return null;
  return geminiGenerate(env, key, [{ text: prompt }, { file_data: { mime_type: mime, file_uri: uri } }]);
}
async function webSearch(env, query) {
  const key = await getApiKey(env, "gemini");
  if (!key) return null;
  if (await overBudget(env, "web_search") === "pause") return "（Web検索の今月の利用上限に達しました。設定 → API使用量 で変更できます）";
  await recordUsage(env, "web_search");
  const text = await geminiGenerate(env, key, [{ text: query }], [{ googleSearch: {} }]);
  return text || "（検索結果が得られませんでした）";
}
async function enqueueSummary(env, owner, fileId, name) {
  await env.DB.prepare("INSERT INTO summary_jobs (id,owner,name,file_id,status,created_at,updated_at) VALUES (?,?,?,?,'pending',?,?)").bind(randomId(), owner, name, fileId, nowSec(), nowSec()).run();
}
async function processSummaryJobs(env, limit = 3) {
  const key = await getApiKey(env, "gemini");
  if (!key) return 0;
  const { results } = await env.DB.prepare("SELECT id,owner,name,file_id FROM summary_jobs WHERE status='pending' ORDER BY created_at LIMIT ?").bind(limit).all();
  let done = 0;
  for (const job of results) {
    const f = await getFile(env, job.file_id);
    if (!f) {
      await env.DB.prepare("UPDATE summary_jobs SET status='error',updated_at=? WHERE id=?").bind(nowSec(), job.id).run();
      continue;
    }
    await recordUsage(env, "gemini");
    const uri = await geminiUpload(key, f.buf, f.mime);
    const summary = uri ? await geminiGenerate(env, key, [{ text: "この資料の要点・数値・結論を漏れなく日本語で要約してください。" }, { file_data: { mime_type: f.mime, file_uri: uri } }]) : "";
    if (!summary) {
      await env.DB.prepare("UPDATE summary_jobs SET status='error',updated_at=? WHERE id=?").bind(nowSec(), job.id).run();
      continue;
    }
    await env.DB.prepare("UPDATE summary_jobs SET status='done',result=?,updated_at=? WHERE id=?").bind(summary.slice(0, 1e5), nowSec(), job.id).run();
    await env.DB.prepare("INSERT INTO knowledge (id,title,body,file_ref,tags,created_by,created_at) VALUES (?,?,?,?,?,?,?)").bind(randomId(), `[資料要約] ${job.name}`, summary.slice(0, 1e5), job.file_id, "資料要約", job.owner, nowSec()).run();
    done++;
  }
  return done;
}
async function makeDocument(env, owner, baseUrl, a) {
  const key = await getApiKey(env, "claude");
  if (!key) return "資料生成には Claude APIキーが必要です（連携設定で登録してください）。";
  await recordUsage(env, "claude");
  const type = ["md", "csv", "txt"].includes(a.type) ? a.type : "md";
  const sys = `あなたは資料作成アシスタント。指示に従い ${type} 形式の本文だけを出力（前置き・コードフェンス無し）。`;
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: claudeModelId(env), max_tokens: 4e3, system: sys, messages: [{ role: "user", content: `タイトル:${a.title}
要件:${a.content}` }] })
  });
  if (!r.ok) {
    console.log("[claude-doc]", r.status, (await r.text()).slice(0, 150));
    return "資料生成に失敗しました。";
  }
  const data = await r.json();
  await recordTokens(env, "claude", { inputTokens: data.usage?.input_tokens ?? 0, outputTokens: data.usage?.output_tokens ?? 0 });
  const body = data.content?.map((c) => c.text ?? "").join("") ?? "";
  const mime = type === "csv" ? "text/csv" : type === "txt" ? "text/plain" : "text/markdown";
  const file = new File([new TextEncoder().encode(body)], `${a.title}.${type}`, { type: mime });
  const saved = await saveFile(env, file, owner);
  return `資料を作成しました：${a.title}.${type}
ダウンロード：${baseUrl}/files/${saved.id}`;
}
function bufToB64(buf) {
  const bytes = new Uint8Array(buf);
  let s = "";
  const chunk = 32768;
  for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(s);
}
async function extractInvoiceData(env, file) {
  const key = await getApiKey(env, "claude");
  if (!key) return {};
  const isPdf = file.mime === "application/pdf" || /\.pdf$/i.test(file.name);
  const data = bufToB64(file.buf);
  const imgMime = ["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.mime) ? file.mime : "image/jpeg";
  const block = isPdf ? { type: "document", source: { type: "base64", media_type: "application/pdf", data } } : { type: "image", source: { type: "base64", media_type: imgMime, data } };
  const prompt = 'この請求書/領収書から請求元・金額・発行日・支払期日を読み取り、JSONのみ出力（前置き・コードフェンス無し）：{"vendor":"請求元名 or null","amount":金額の数値(円・整数。不明ならnull),"issued_date":"YYYY-MM-DD or null","due_date":"YYYY-MM-DD or null"}';
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: claudeModelId(env), max_tokens: 500, messages: [{ role: "user", content: [block, { type: "text", text: prompt }] }] })
  });
  await recordUsage(env, "claude");
  if (!r.ok) {
    console.log("[invoice-extract]", r.status, (await r.text()).slice(0, 150));
    return {};
  }
  const d = await r.json();
  await recordTokens(env, "claude", { inputTokens: d.usage?.input_tokens ?? 0, outputTokens: d.usage?.output_tokens ?? 0 });
  const raw = (d.content?.map((c) => c.text ?? "").join("") ?? "").replace(/^```(?:json)?|```$/g, "").trim();
  try {
    const j = JSON.parse(raw);
    return { vendor: j.vendor ?? void 0, amount: typeof j.amount === "number" ? j.amount : void 0, issued_date: j.issued_date ?? void 0, due_date: j.due_date ?? void 0 };
  } catch {
    return {};
  }
}

const STATUSES = ["unpaid", "paid", "overdue", "canceled"];
async function saveInvoice(ctx, owner, d) {
  const id = randomId();
  const now = nowSec();
  await ctx.db.prepare(
    "INSERT INTO invoices (id,owner,file_id,vendor,amount,issued_date,due_date,status,notes,source,created_at,updated_at) VALUES (?,?,?,?,?,?,?, 'unpaid', ?,?,?,?)"
  ).bind(id, owner, d.fileId ?? null, d.vendor ?? null, d.amount ?? null, d.issued_date ?? null, d.due_date ?? null, d.notes ?? null, d.source ?? "manual", now, now).run();
  if (d.due_date) {
    const due = new Date(d.due_date).getTime();
    if (Number.isFinite(due)) {
      const remindAt = new Date(due - 3 * 864e5).toISOString();
      await setReminder(ctx, owner, { content: `請求書「${d.vendor ?? "(請求元不明)"}」の支払期日が近づいています（期日 ${d.due_date}${d.amount ? ` / ¥${d.amount.toLocaleString()}` : ""}）`, remind_at: remindAt }).catch(() => {
      });
    }
  }
  return id;
}
async function registerInvoiceFromFile(ctx, owner, fileId, source = "manual") {
  if (!await fileBelongsTo(ctx.env, fileId, owner)) return { error: "ファイルが見つかりません。" };
  const f = await getFile(ctx.env, fileId);
  if (!f) return { error: "ファイルが見つかりません。" };
  const ex = await extractInvoiceData(ctx.env, f);
  const id = await saveInvoice(ctx, owner, { fileId, vendor: ex.vendor, amount: ex.amount, issued_date: ex.issued_date, due_date: ex.due_date, source });
  return { id, vendor: ex.vendor, amount: ex.amount, due_date: ex.due_date };
}
async function listInvoices(ctx, opts = {}) {
  const where = ["deleted_at IS NULL"];
  const binds = [];
  if (opts.status && STATUSES.includes(opts.status)) {
    where.push("status=?");
    binds.push(opts.status);
  }
  binds.push(Math.min(opts.limit ?? 200, 500));
  return (await ctx.db.prepare(`SELECT * FROM invoices WHERE ${where.join(" AND ")} ORDER BY due_date IS NULL, due_date ASC LIMIT ?`).bind(...binds).all()).results;
}
async function setInvoiceStatus(ctx, id, status) {
  if (!STATUSES.includes(status)) return { ok: false, error: "不正なステータスです" };
  await ctx.db.prepare("UPDATE invoices SET status=?, updated_at=? WHERE id=?").bind(status, nowSec(), id).run();
  return { ok: true };
}
async function toolRegister(ctx, owner, a) {
  const r = await registerInvoiceFromFile(ctx, owner, a.file_id, "chat");
  if (r.error) return r.error;
  return `請求書を登録しました：${r.vendor ?? "(請求元不明)"} / ${r.amount ? `¥${r.amount.toLocaleString()}` : "金額不明"} / 期日 ${r.due_date ?? "不明"}`;
}
async function toolListUnpaid(ctx) {
  const rows = await listInvoices(ctx, { status: "unpaid", limit: 30 });
  if (!rows.length) return "未払いの請求書はありません。";
  return rows.map((r) => `・[${r.id}] ${r.vendor ?? "(不明)"} ¥${r.amount?.toLocaleString() ?? "?"} 期日 ${r.due_date ?? "未設定"}`).join("\n");
}
async function toolMarkPaid(ctx, a) {
  const r = await setInvoiceStatus(ctx, a.invoice_id, "paid");
  return r.ok ? "請求書を支払済みにしました。" : r.error ?? "更新に失敗しました。";
}
const invoicesPart = {
  id: "invoices",
  name: "請求書管理",
  version: "1.0.0",
  category: "会計",
  description: "請求書/領収書の画像・PDFから請求元・金額・期日を抽出して管理。未払の期日接近を通知。",
  permissions: ["db:read", "db:write", "ai", "storage:read"],
  minPlan: "pro",
  menu: [{ href: "/invoices", label: "請求書" }],
  widgets: [
    {
      id: "unpaid_invoices",
      title: "未払請求書",
      run: async (ctx) => {
        const r = await ctx.db.prepare("SELECT COUNT(*) AS n FROM invoices WHERE status='unpaid' AND deleted_at IS NULL").first();
        return { value: `${r?.n ?? 0} 件`, sub: "未払い" };
      }
    }
  ],
  agentTools: [
    {
      name: "register_invoice",
      description: "保存済みの請求書ファイル(file_id)から請求元・金額・期日を抽出して登録",
      parameters: { type: "object", properties: { file_id: { type: "string" }, notes: { type: "string" } }, required: ["file_id"] },
      run: (ctx, owner, _b, a) => toolRegister(ctx, owner, { file_id: String(a.file_id), notes: a.notes })
    },
    {
      name: "list_unpaid_invoices",
      description: "未払いの請求書一覧（期日順）",
      parameters: { type: "object", properties: {} },
      run: (ctx) => toolListUnpaid(ctx)
    },
    {
      name: "mark_invoice_paid",
      description: "請求書を支払済みにする（invoice_id 指定）",
      parameters: { type: "object", properties: { invoice_id: { type: "string" } }, required: ["invoice_id"] },
      run: (ctx, _o, _b, a) => toolMarkPaid(ctx, { invoice_id: String(a.invoice_id) })
    }
  ]
};

const invoices = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  invoicesPart,
  listInvoices,
  registerInvoiceFromFile,
  saveInvoice,
  setInvoiceStatus
}, Symbol.toStringTag, { value: 'Module' }));

export { makeDocument as a, setReminder as b, remindersPart as c, dueReminders as d, enqueueSummary as e, invoices as f, invoicesPart as i, markReminderDone as m, processSummaryJobs as p, registerInvoiceFromFile as r, setInvoiceStatus as s, transcribeAudio as t, webSearch as w };
