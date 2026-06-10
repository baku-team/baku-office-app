globalThis.process ??= {}; globalThis.process.env ??= {};
import { registerPart } from './parts_BZyWMuJn.mjs';
import { r as randomId, d as decryptField } from './crypto_D21r3Dwx.mjs';
import { nowSec } from './accounting_B0MwRt9i.mjs';
import { b as setReminder, c as remindersPart, i as invoicesPart } from './invoices_DUrRkHPD.mjs';
import { a as saveKnowledge, k as knowledgePart } from './knowledge_C-0JJP5G.mjs';
import { masterKeyCtx, getApiKey } from './client_DjSYVqc9.mjs';
import { calendarPart } from './calendar_BFI86ISN.mjs';
import { googleFetch } from './google__L4vnQZx.mjs';
import { saveFile } from './storage_ComUGkKO.mjs';
import { c as claudeModelId } from './usage_ClrX51CC.mjs';

const chatApp = {
  id: "chat",
  name: "AIチャット",
  version: "1.0.0",
  category: "core",
  description: "AIと対話して操作・他アプリ呼び出し・各種設定/開発を行うハブ（Plus以上で必須）。",
  permissions: ["ai", "agent", "db:read"],
  menu: [{ href: "/chat", label: "AIチャット" }]
};

async function recordExpense(ctx, owner, a) {
  await ctx.db.prepare("INSERT INTO personal_items (id,owner_user_id,type,title,amount,date,share_scope,review_status,created_at) VALUES (?,?,?,?,?,?,'personal','none',?)").bind(randomId(), owner, "receipt", a.title, Math.round(a.amount), a.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), nowSec()).run();
  return `領収書を記録：${a.title} ¥${Math.round(a.amount).toLocaleString("ja-JP")}（個人→組織へ共有で会計申請）`;
}
async function listExpenses(ctx, owner) {
  const { results } = await ctx.db.prepare("SELECT title,amount FROM personal_items WHERE owner_user_id=? AND type='receipt' ORDER BY created_at DESC LIMIT 10").bind(owner).all();
  if (!results.length) return "領収書の記録はありません。";
  return results.map((r) => `・${r.title} ¥${(r.amount ?? 0).toLocaleString("ja-JP")}`).join("\n");
}
const accountingPart = {
  id: "accounting",
  name: "会計",
  version: "1.0.0",
  category: "会計",
  description: "支出/領収書の記録と一覧。",
  permissions: ["db:read", "db:write"],
  menu: [{ href: "/accounting", label: "会計" }],
  widgets: [
    { id: "tx_count", title: "取引数", run: async (ctx) => {
      const r = await ctx.db.prepare("SELECT count(*) AS n FROM transactions").first().catch(() => null);
      return { value: String(r?.n ?? 0) + " 件", sub: "会計取引" };
    } }
  ],
  agentTools: [
    {
      name: "record_expense",
      description: "支出/領収書を記録",
      parameters: { type: "object", properties: { amount: { type: "number" }, title: { type: "string" }, date: { type: "string", description: "YYYY-MM-DD" } }, required: ["amount", "title"] },
      run: (ctx, owner, _baseUrl, a) => recordExpense(ctx, owner, { amount: Number(a.amount), title: String(a.title), date: a.date ? String(a.date) : void 0 })
    },
    {
      name: "list_expenses",
      description: "記録した領収書一覧",
      parameters: { type: "object", properties: {} },
      run: (ctx, owner) => listExpenses(ctx, owner)
    }
  ]
};

async function saveMemo(ctx, owner, a) {
  await ctx.db.prepare("INSERT INTO personal_items (id,owner_user_id,type,title,body,share_scope,review_status,created_at) VALUES (?,?,?,?,?,'personal','none',?)").bind(randomId(), owner, "memo", a.title, a.body ?? null, nowSec()).run();
  return `メモを保存：${a.title}`;
}
const memoPart = {
  id: "memo",
  name: "メモ",
  version: "1.0.0",
  category: "庶務",
  description: "個人メモの保存。",
  permissions: ["db:write"],
  menu: [{ href: "/personal", label: "個人" }],
  agentTools: [
    {
      name: "save_memo",
      description: "メモを保存",
      parameters: { type: "object", properties: { title: { type: "string" }, body: { type: "string" } }, required: ["title"] },
      run: (ctx, owner, _baseUrl, a) => saveMemo(ctx, owner, { title: String(a.title), body: a.body ? String(a.body) : void 0 })
    }
  ]
};

async function searchMembers(ctx, a) {
  const { results } = await ctx.db.prepare("SELECT display_name,role,status FROM users WHERE status='active'").all();
  const mk = await masterKeyCtx(ctx);
  const out = [];
  for (const u of results) {
    let name = "";
    try {
      name = u.display_name ? await decryptField(mk, u.display_name, "member-pii") : "";
    } catch {
    }
    if (!a.query || name.includes(a.query)) out.push(`・${name || "(無名)"}（${u.role}）`);
  }
  return out.length ? out.join("\n") : "該当するメンバーはいません。";
}
const membersPart = {
  id: "members",
  name: "庶務／名簿",
  version: "1.0.0",
  category: "庶務",
  description: "会員名簿（暗号化PII）の照会。特権ロールのみ。",
  permissions: ["db:read", "members:read"],
  menu: [{ href: "/membership", label: "会員管理" }],
  widgets: [
    { id: "members_count", title: "登録メンバー", run: async (ctx) => {
      const r = await ctx.db.prepare("SELECT count(*) AS n FROM users WHERE status='active'").first();
      return { value: String(r?.n ?? 0) + " 名", sub: "アクティブ会員" };
    } }
  ],
  agentTools: [
    {
      name: "search_members",
      description: "メンバー（名簿）を検索",
      parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
      requiredRole: ["admin", "accounting", "clerical"],
      run: (ctx, _owner, _baseUrl, a) => searchMembers(ctx, { query: String(a.query ?? "") })
    }
  ]
};

const sitePart = {
  id: "site",
  name: "HP/LP 公開",
  version: "1.0.0",
  category: "公開",
  description: "サイト/LP の公開・会員申込フォーム。",
  minPlan: "pro",
  menu: [{ href: "/settings/site", label: "HP/LP 公開" }]
};

const importPart = {
  id: "import",
  name: "資料インポート",
  version: "1.0.0",
  category: "庶務",
  description: "Notion / Google ドライブから資料を取り込み。",
  minPlan: "plus",
  menu: [{ href: "/import", label: "資料インポート" }]
};

const brandingPart = {
  id: "branding",
  name: "ブランド設定（見た目）",
  version: "1.0.0",
  category: "カスタマイズ",
  description: "ブランド名・ロゴ・配色を団体ごとに上書き。",
  minPlan: "plus",
  menu: [{ href: "/settings/theme", label: "ブランド設定" }]
};

const GM = "https://gmail.googleapis.com/gmail/v1/users/me";
const NEED_CONNECT$1 = "Google 連携が未設定です。連携設定（Gmail画面）から連携してください。";
function b64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decodeB64url(data) {
  const s = data.replace(/-/g, "+").replace(/_/g, "/");
  try {
    const bin = atob(s);
    return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  } catch {
    return "";
  }
}
function extractText(p) {
  if (!p) return "";
  if (p.mimeType === "text/plain" && p.body?.data) return decodeB64url(p.body.data);
  for (const c of p.parts ?? []) {
    const t = extractText(c);
    if (t) return t;
  }
  if (p.mimeType === "text/html" && p.body?.data) return decodeB64url(p.body.data).replace(/<[^>]+>/g, " ");
  return "";
}
async function listMessages(ctx, a) {
  const u = new URL(`${GM}/messages`);
  u.searchParams.set("maxResults", String(Math.min(a.max ?? 10, 25)));
  if (a.query) u.searchParams.set("q", a.query);
  else u.searchParams.set("labelIds", "INBOX");
  const r = await googleFetch(ctx.env, u.toString());
  if (!r) return NEED_CONNECT$1;
  if (!r.ok) return `メール一覧の取得に失敗しました（${r.status}）。`;
  const d = await r.json();
  const ids = (d.messages ?? []).map((m) => m.id);
  if (!ids.length) return "該当するメールはありません。";
  const lines = [];
  for (const id of ids) {
    const mr = await googleFetch(ctx.env, `${GM}/messages/${id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`);
    if (!mr || !mr.ok) continue;
    const m = await mr.json();
    const h = (n) => m.payload?.headers?.find((x) => x.name === n)?.value ?? "";
    lines.push(`・[${id}] ${h("From")}
  件名: ${h("Subject")}
  ${(m.snippet ?? "").slice(0, 120)}`);
  }
  return lines.join("\n") || "メールを取得できませんでした。";
}
async function getMessage(ctx, a) {
  const r = await googleFetch(ctx.env, `${GM}/messages/${encodeURIComponent(a.message_id)}?format=full`);
  if (!r) return NEED_CONNECT$1;
  if (!r.ok) return `メール本文の取得に失敗しました（${r.status}）。`;
  const m = await r.json();
  const h = (n) => m.payload?.headers?.find((x) => x.name === n)?.value ?? "";
  const body = extractText(m.payload).slice(0, 4e3);
  return `差出人: ${h("From")}
件名: ${h("Subject")}
日時: ${h("Date")}

${body}`;
}
async function sendMessage(ctx, a) {
  const enc = new TextEncoder();
  const subjB64 = btoa(String.fromCharCode(...enc.encode(a.subject)));
  const raw = [
    `To: ${a.to}`,
    `Subject: =?UTF-8?B?${subjB64}?=`,
    'Content-Type: text/plain; charset="UTF-8"',
    "MIME-Version: 1.0",
    "",
    a.body
  ].join("\r\n");
  const r = await googleFetch(ctx.env, `${GM}/messages/send`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ raw: b64url(enc.encode(raw)) })
  });
  if (!r) return NEED_CONNECT$1;
  if (!r.ok) return `メール送信に失敗しました（${r.status}）。`;
  return `メールを送信しました：${a.to} 宛「${a.subject}」`;
}
function findAttachment(p) {
  if (!p) return null;
  if (p.filename && p.body?.attachmentId) return { attachmentId: p.body.attachmentId, filename: p.filename, mimeType: p.mimeType ?? "application/octet-stream" };
  for (const c of p.parts ?? []) {
    const f = findAttachment(c);
    if (f) return f;
  }
  return null;
}
async function getAttachment(ctx, owner, a) {
  const mr = await googleFetch(ctx.env, `${GM}/messages/${encodeURIComponent(a.message_id)}?format=full`);
  if (!mr) return NEED_CONNECT$1;
  if (!mr.ok) return `メールの取得に失敗しました（${mr.status}）。`;
  const m = await mr.json();
  const found = findAttachment(m.payload);
  if (!found) return "このメールに添付ファイルはありません。";
  const ar = await googleFetch(ctx.env, `${GM}/messages/${encodeURIComponent(a.message_id)}/attachments/${found.attachmentId}`);
  if (!ar) return NEED_CONNECT$1;
  if (!ar.ok) return `添付の取得に失敗しました（${ar.status}）。`;
  const ad = await ar.json();
  if (!ad.data) return "添付データが空です。";
  const bin = atob(ad.data.replace(/-/g, "+").replace(/_/g, "/"));
  const file = new File([Uint8Array.from(bin, (c) => c.charCodeAt(0))], found.filename || "attachment", { type: found.mimeType });
  const saved = await saveFile(ctx.env, file, owner);
  return `添付「${found.filename}」を保存しました: file_id=${saved.id}`;
}
const gmailPart = {
  id: "gmail",
  name: "Gmail",
  version: "1.0.0",
  category: "庶務",
  description: "Gmail のメールを一覧・検索・閲覧・送信。",
  permissions: ["net"],
  minPlan: "pro",
  menu: [{ href: "/gmail", label: "Gmail" }],
  agentTools: [
    {
      name: "list_messages",
      description: "受信メールを一覧（query 未指定なら受信箱の最近分）",
      parameters: { type: "object", properties: { query: { type: "string", description: "Gmail検索クエリ（例 from:foo is:unread）" }, max: { type: "number" } } },
      run: (ctx, _o, _b, a) => listMessages(ctx, { query: a.query, max: a.max })
    },
    {
      name: "search_messages",
      description: "Gmail を検索（query 必須）",
      parameters: { type: "object", properties: { query: { type: "string" }, max: { type: "number" } }, required: ["query"] },
      run: (ctx, _o, _b, a) => listMessages(ctx, { query: String(a.query), max: a.max })
    },
    {
      name: "get_message",
      description: "メール本文を取得（message_id 指定）",
      parameters: { type: "object", properties: { message_id: { type: "string" } }, required: ["message_id"] },
      run: (ctx, _o, _b, a) => getMessage(ctx, { message_id: String(a.message_id) })
    },
    {
      name: "send_message",
      description: "メールを送信",
      unattended: false,
      // 無人ジョブでメール送信させない（プロンプトインジェクション対策・道具レベル遮断）
      parameters: { type: "object", properties: { to: { type: "string" }, subject: { type: "string" }, body: { type: "string" } }, required: ["to", "subject", "body"] },
      run: (ctx, _o, _b, a) => sendMessage(ctx, { to: String(a.to), subject: String(a.subject), body: String(a.body) })
    },
    {
      name: "get_attachment",
      description: "メールの添付ファイル(PDF/画像)を取得してストレージへ保存し file_id を返す（請求書登録等に使う）",
      parameters: { type: "object", properties: { message_id: { type: "string" } }, required: ["message_id"] },
      run: (ctx, owner, _b, a) => getAttachment(ctx, owner, { message_id: String(a.message_id) })
    }
  ]
};

const MEET = "https://meet.googleapis.com/v2";
const NEED_CONNECT = "Google 連携が未設定です。連携設定（Meet画面）から連携してください。";
async function listConferenceRecords(ctx, a) {
  const u = new URL(`${MEET}/conferenceRecords`);
  u.searchParams.set("pageSize", String(Math.min(a.max ?? 10, 25)));
  const r = await googleFetch(ctx.env, u.toString());
  if (!r) return NEED_CONNECT;
  if (!r.ok) return `会議記録の取得に失敗しました（${r.status}）。`;
  const d = await r.json();
  const recs = d.conferenceRecords ?? [];
  if (!recs.length) return "会議記録はありません（Meet の文字起こしが有効な会議のみ取得できます）。";
  return recs.map((c) => `・[${c.name}] ${(c.startTime ?? "").slice(0, 16).replace("T", " ")} 〜 ${(c.endTime ?? "").slice(11, 16)}`).join("\n");
}
async function fetchTranscriptText(ctx, recordId, maxChars = 18e3) {
  const tr = await googleFetch(ctx.env, `${MEET}/${recordId}/transcripts`);
  if (!tr) return null;
  if (!tr.ok) return { text: "", error: `transcripts ${tr.status}` };
  const td = await tr.json();
  const first = td.transcripts?.[0];
  if (!first) return { text: "", error: "この会議に文字起こしがありません。" };
  let pageToken = "";
  const parts = [];
  let total = 0;
  for (let i = 0; i < 20; i++) {
    const u = new URL(`${MEET}/${first.name}/entries`);
    u.searchParams.set("pageSize", "1000");
    if (pageToken) u.searchParams.set("pageToken", pageToken);
    const er = await googleFetch(ctx.env, u.toString());
    if (!er || !er.ok) break;
    const ed = await er.json();
    for (const e of ed.transcriptEntries ?? []) {
      const line = `${(e.participant ?? "").split("/").pop() ?? "?"}: ${e.text ?? ""}`;
      parts.push(line);
      total += line.length;
    }
    if (total >= maxChars || !ed.nextPageToken) break;
    pageToken = ed.nextPageToken;
  }
  return { text: parts.join("\n").slice(0, maxChars) };
}
async function getTranscript(ctx, a) {
  const t = await fetchTranscriptText(ctx, a.record_id);
  if (!t) return NEED_CONNECT;
  if (t.error) return t.error;
  return t.text || "トランスクリプトが空です。";
}
async function summarizeWithClaude(env, transcript) {
  const key = await getApiKey(env, "claude");
  if (!key) return null;
  const sys = 'あなたは会議の議事録作成アシスタント。与えられたトランスクリプトから日本語で(1)議事録要約(2)アクションアイテムを抽出し、JSONのみを出力：{"summary":"...","actions":[{"content":"担当と内容","due":"ISO8601日時(任意・無ければ省略)"}]}（前置き・コードフェンス無し）。';
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: claudeModelId(env), max_tokens: 2e3, system: sys, messages: [{ role: "user", content: transcript }] })
  });
  if (!r.ok) {
    console.log("[meet-claude]", r.status, (await r.text()).slice(0, 150));
    return null;
  }
  const data = await r.json();
  const raw = (data.content?.map((c) => c.text ?? "").join("") ?? "").replace(/^```(?:json)?|```$/g, "").trim();
  try {
    const j = JSON.parse(raw);
    return { summary: String(j.summary ?? ""), actions: Array.isArray(j.actions) ? j.actions : [] };
  } catch {
    return { summary: raw.slice(0, 4e3), actions: [] };
  }
}
async function summarizeMeeting(ctx, owner, a) {
  const t = await fetchTranscriptText(ctx, a.record_id);
  if (!t) return NEED_CONNECT;
  if (t.error) return t.error;
  if (!t.text) return "トランスクリプトが空のため要約できません。";
  const result = await summarizeWithClaude(ctx.env, t.text);
  if (!result) return "要約には Claude APIキーが必要です（連携設定で登録してください）。";
  const title = a.title || `会議 ${new Date(nowSec() * 1e3).toISOString().slice(0, 10)}`;
  const actionsText = result.actions.map((x) => `- ${x.content}${x.due ? `（期限 ${x.due}）` : ""}`).join("\n");
  const body = `${result.summary}

## アクションアイテム
${actionsText || "（なし）"}`;
  await saveKnowledge(ctx, owner, { title: `[議事録] ${title}`, body });
  let reminded = 0;
  for (const x of result.actions) {
    if (!x.due) continue;
    const msg = await setReminder(ctx, owner, { content: `[${title}] ${x.content}`, remind_at: x.due });
    if (msg.startsWith("リマインダー設定")) reminded++;
  }
  await ctx.db.prepare(
    `INSERT INTO meet_records (id,space_name,title,start_time,end_time,summary,actions,knowledge_saved,reminders_saved,owner,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,1,?,?,?,?)
     ON CONFLICT(id) DO UPDATE SET title=excluded.title, summary=excluded.summary, actions=excluded.actions, knowledge_saved=1, reminders_saved=excluded.reminders_saved, updated_at=excluded.updated_at`
  ).bind(a.record_id, null, title, null, null, result.summary.slice(0, 8e3), JSON.stringify(result.actions).slice(0, 8e3), reminded > 0 ? 1 : 0, owner, nowSec(), nowSec()).run().catch(() => {
  });
  return `議事録を作成しました：「${title}」
ナレッジに保存・アクション${result.actions.length}件（うち${reminded}件をリマインダ登録）。`;
}
const meetPart = {
  id: "meet",
  name: "Google Meet",
  version: "1.0.0",
  category: "庶務",
  description: "Google Meet の会議記録から議事録要約を作成し、ナレッジ保存・タスク化する（会議後処理）。",
  permissions: ["net", "db:read", "db:write", "ai"],
  minPlan: "pro",
  menu: [{ href: "/meet", label: "Meet議事録" }],
  agentTools: [
    {
      name: "list_conference_records",
      description: "Google Meet の会議記録を一覧（文字起こしが有効な会議）",
      parameters: { type: "object", properties: { max: { type: "number" } } },
      run: (ctx, _o, _b, a) => listConferenceRecords(ctx, { max: a.max })
    },
    {
      name: "get_transcript",
      description: "会議のトランスクリプト本文を取得（record_id 指定）",
      parameters: { type: "object", properties: { record_id: { type: "string", description: "conferenceRecords/xxx 形式" } }, required: ["record_id"] },
      run: (ctx, _o, _b, a) => getTranscript(ctx, { record_id: String(a.record_id) })
    },
    {
      name: "summarize_meeting",
      description: "会議のトランスクリプトを要約して議事録を作成。ナレッジ保存＋アクションをリマインダ登録",
      parameters: { type: "object", properties: { record_id: { type: "string", description: "conferenceRecords/xxx 形式" }, title: { type: "string" } }, required: ["record_id"] },
      run: (ctx, owner, _b, a) => summarizeMeeting(ctx, owner, { record_id: String(a.record_id), title: a.title })
    }
  ]
};

function registerBuiltinParts() {
  registerPart(chatApp);
  registerPart(accountingPart);
  registerPart(memoPart);
  registerPart(remindersPart);
  registerPart(knowledgePart);
  registerPart(membersPart);
  registerPart(sitePart);
  registerPart(importPart);
  registerPart(brandingPart);
  registerPart(calendarPart);
  registerPart(gmailPart);
  registerPart(meetPart);
  registerPart(invoicesPart);
}
registerBuiltinParts();

export { registerBuiltinParts };
