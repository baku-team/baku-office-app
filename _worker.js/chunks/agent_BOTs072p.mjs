globalThis.process ??= {}; globalThis.process.env ??= {};
import { getApiKey } from './client_KUuDosgV.mjs';
import { toolsOf, enabledParts, enabledPartIds } from './parts_C0xB5mu7.mjs';
import './index_C4EjYe4c.mjs';
import { r as randomId } from './crypto_BhRWVEcj.mjs';
import { getFile, saveFile } from './storage_Zv-sLn8E.mjs';
import { nowSec } from './accounting_BOhbglhy.mjs';
import { recordUsage, overBudget } from './usage_CVlW6nuV.mjs';
import { listSkills, runSkill, generateSkill } from './skills_HOtG0ke2.mjs';
import { createDraft } from './external-apps_DBkrIjnU.mjs';
import { listCapabilities, capabilitySummary, videoStatusText, invokeCapability } from './capabilities_oVBZTYrp.mjs';
import { getAiEngine, getCustomPrompt } from './settings_D3wc2OF7.mjs';

async function runToolLoop(model, system, first, tools, exec, maxHops = 4) {
  const history = [{ role: "user", text: first.text, image: first.image }];
  for (let h = 0; h < maxHops; h++) {
    const res = await model.turn(system, history, tools);
    if (!res.toolCalls?.length) return (res.text ?? "").trim() || "（応答が空でした）";
    history.push({ role: "assistant", text: res.text, toolCalls: res.toolCalls });
    const results = [];
    for (const c of res.toolCalls) results.push({ id: c.id, name: c.name, content: await exec(c.name, c.args) });
    history.push({ role: "tool", results });
  }
  return "処理が長くなりました。もう一度お試しください。";
}

function toMessages$1(system, history) {
  const msgs = [{ role: "system", content: system }];
  for (const t of history) {
    if (t.role === "user") msgs.push({ role: "user", content: t.text });
    else if (t.role === "assistant") {
      msgs.push({
        role: "assistant",
        content: t.text ?? null,
        tool_calls: t.toolCalls?.map((c) => ({ id: c.id, type: "function", function: { name: c.name, arguments: JSON.stringify(c.args) } }))
      });
    } else {
      for (const r of t.results) msgs.push({ role: "tool", tool_call_id: r.id, content: r.content });
    }
  }
  return msgs;
}
function localChatModel(baseUrl, model) {
  const url = baseUrl.replace(/\/$/, "") + "/v1/chat/completions";
  return {
    name: `local:${model}`,
    async turn(system, history, tools) {
      const body = {
        model,
        messages: toMessages$1(system, history),
        tools: tools.map((d) => ({ type: "function", function: { name: d.name, description: d.description, parameters: d.parameters } })),
        temperature: 0.3
      };
      const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      if (!r.ok) {
        console.log("[local-llm]", r.status, (await r.text()).slice(0, 200));
        return { text: "（ローカルLLMの応答に失敗しました）" };
      }
      const data = await r.json();
      const msg = data.choices?.[0]?.message;
      const calls = msg?.tool_calls ?? [];
      if (calls.length) {
        const toolCalls = calls.map((c) => {
          let args = {};
          try {
            args = JSON.parse(c.function.arguments || "{}");
          } catch {
          }
          return { id: c.id, name: c.function.name, args };
        });
        return { text: msg?.content ?? void 0, toolCalls };
      }
      return { text: msg?.content ?? "" };
    }
  };
}

function toContents(history) {
  const out = [];
  for (const t of history) {
    if (t.role === "user") {
      const parts = [{ text: t.text || "（画像）" }];
      if (t.image) parts.push({ inlineData: { mimeType: t.image.mimeType, data: t.image.dataB64 } });
      out.push({ role: "user", parts });
    } else if (t.role === "assistant") {
      const parts = [];
      if (t.text) parts.push({ text: t.text });
      for (const c of t.toolCalls ?? []) parts.push({ functionCall: { name: c.name, args: c.args } });
      out.push({ role: "model", parts });
    } else {
      out.push({ role: "user", parts: t.results.map((r) => ({ functionResponse: { name: r.name, response: { result: r.content } } })) });
    }
  }
  return out;
}
function geminiModel(key) {
  return {
    name: "gemini-2.5-flash",
    async turn(system, history, tools) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: toContents(history), tools: [{ functionDeclarations: tools }], generationConfig: { temperature: 0.3, maxOutputTokens: 800 } })
      });
      if (!r.ok) {
        console.log("[gemini]", r.status, (await r.text()).slice(0, 200));
        return { text: "（AIの応答に失敗しました）" };
      }
      const data = await r.json();
      const parts = data.candidates?.[0]?.content?.parts ?? [];
      const calls = parts.filter((p) => p.functionCall);
      if (calls.length) {
        const toolCalls = calls.map((p, i) => ({ id: `g${i}_${p.functionCall.name}`, name: p.functionCall.name, args: p.functionCall.args ?? {} }));
        return { toolCalls };
      }
      return { text: parts.map((p) => p.text ?? "").join("") };
    }
  };
}

function toMessages(history) {
  const msgs = [];
  for (const t of history) {
    if (t.role === "user") {
      msgs.push({ role: "user", content: t.text || "（依頼）" });
    } else if (t.role === "assistant") {
      const blocks = [];
      if (t.text) blocks.push({ type: "text", text: t.text });
      for (const c of t.toolCalls ?? []) blocks.push({ type: "tool_use", id: c.id, name: c.name, input: c.args });
      msgs.push({ role: "assistant", content: blocks });
    } else {
      msgs.push({ role: "user", content: t.results.map((r) => ({ type: "tool_result", tool_use_id: r.id, content: r.content })) });
    }
  }
  return msgs;
}
function claudeModel(key) {
  return {
    name: "claude-sonnet-4-6",
    async turn(system, history, tools) {
      const t = tools.map((d) => ({ name: d.name, description: d.description, input_schema: d.parameters }));
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, system, tools: t, messages: toMessages(history) })
      });
      if (!r.ok) {
        console.log("[claude]", r.status, (await r.text()).slice(0, 200));
        return { text: "（Claudeの応答に失敗しました）" };
      }
      const data = await r.json();
      const content = data.content ?? [];
      const toolUses = content.filter((c) => c.type === "tool_use");
      if (toolUses.length && data.stop_reason === "tool_use") {
        const toolCalls = toolUses.map((c) => ({ id: c.id, name: c.name, args: c.input ?? {} }));
        return { toolCalls };
      }
      return { text: content.filter((c) => c.type === "text").map((c) => c.text ?? "").join("") };
    }
  };
}

const GEMINI = "gemini-2.5-flash";
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
async function geminiGenerate(key, parts, tools) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts }], ...tools ? { tools } : {}, generationConfig: { maxOutputTokens: 1200 } })
  });
  if (!r.ok) {
    console.log("[gemini-gen]", r.status, (await r.text()).slice(0, 150));
    return "";
  }
  const d = await r.json();
  return d.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim() ?? "";
}
async function transcribeAudio(env, buf, mime) {
  const key = await getApiKey(env, "gemini");
  if (!key) return null;
  await recordUsage(env, "gemini");
  const prompt = "この音声を日本語で文字起こしし、会議なら話者を区別して要点・決定事項を議事録形式でまとめてください。";
  if (buf.byteLength <= 18 * 1024 * 1024) {
    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
    return geminiGenerate(key, [{ text: prompt }, { inlineData: { mimeType: mime, data: b64 } }]);
  }
  const uri = await geminiUpload(key, buf, mime);
  if (!uri) return null;
  return geminiGenerate(key, [{ text: prompt }, { file_data: { mime_type: mime, file_uri: uri } }]);
}
async function webSearch(env, query) {
  const key = await getApiKey(env, "gemini");
  if (!key) return null;
  await recordUsage(env, "web_search");
  const text = await geminiGenerate(key, [{ text: query }], [{ googleSearch: {} }]);
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
    const summary = uri ? await geminiGenerate(key, [{ text: "この資料の要点・数値・結論を漏れなく日本語で要約してください。" }, { file_data: { mime_type: f.mime, file_uri: uri } }]) : "";
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
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 4e3, system: sys, messages: [{ role: "user", content: `タイトル:${a.title}
要件:${a.content}` }] })
  });
  if (!r.ok) {
    console.log("[claude-doc]", r.status, (await r.text()).slice(0, 150));
    return "資料生成に失敗しました。";
  }
  const data = await r.json();
  const body = data.content?.map((c) => c.text ?? "").join("") ?? "";
  const mime = type === "csv" ? "text/csv" : type === "txt" ? "text/plain" : "text/markdown";
  const file = new File([new TextEncoder().encode(body)], `${a.title}.${type}`, { type: mime });
  const saved = await saveFile(env, file, owner);
  return `資料を作成しました：${a.title}.${type}
ダウンロード：${baseUrl}/files/${saved.id}`;
}

const SYSTEM = "あなたは団体の会計・庶務を補助するLINEアシスタント『baku-office』です。日本語で簡潔に。支出/領収書は record_expense、メモは save_memo、リマインダーは set_reminder（日時はISO 例2026-06-20T10:00）、ナレッジ保存は save_knowledge、検索は search_knowledge、メンバー照会は search_members、領収書一覧は list_expenses、予定確認は list_reminders。最新情報が要る質問は web_search、資料作成依頼は make_document（type=md/csv/txt）を使う。ツールが不要な質問・雑談は通常のテキストで短く答える。アプリ開発の依頼では、いきなり実装せず必ず①企画・仕様を整理→propose_app に name/spec/permissions/estimated_tokens を渡し、事前確認（環境/権限/安全/コスト）を通す。確認が全てOKのときだけ実装に進む。";
const CORE_TOOLS = [
  { name: "install_skill", description: "ユーザーの要望から新しい業務スキルを設計して登録（無効状態で保存。管理者が高度なオプションで有効化）", parameters: { type: "object", properties: { request: { type: "string", description: "欲しいスキルの要望" } }, required: ["request"] } },
  { name: "propose_app", description: "アプリ（業務機能）の草案を作成。まず企画・仕様(spec)をまとめ、要求権限・推定トークンを添えて呼ぶ。保存時に実装前の事前確認（環境/権限/安全/コスト）を自動実行し、全て問題なければ実装可となる。", parameters: { type: "object", properties: { name: { type: "string" }, description: { type: "string" }, spec: { type: "string", description: "企画・仕様（目的・データ・操作・画面・想定利用）" }, permissions: { type: "array", items: { type: "string" }, description: "要求権限（例 db:read, db:write, ai, agent, members:read, net）" }, definition: { type: "object", description: "宣言的アプリ定義（任意）" }, estimated_tokens: { type: "number", description: "1実行あたりの推定消費トークン" } }, required: ["name", "spec"] } }
];
const GEMINI_TOOLS = [
  { name: "web_search", description: "最新情報をWeb検索（Google grounding）", parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } }
];
const CLAUDE_TOOLS = [
  { name: "make_document", description: "資料を生成（type=md/csv/txt）してDLリンクを返す", parameters: { type: "object", properties: { type: { type: "string" }, title: { type: "string" }, content: { type: "string" } }, required: ["title", "content"] } }
];
function skillTool(names) {
  return { name: "run_skill", description: `登録済みの業務スキルを実行（利用可能: ${names.join(", ")}）`, parameters: { type: "object", properties: { name: { type: "string" }, input: { type: "string" } }, required: ["name", "input"] } };
}
const CAP_TOOLS = {
  image_gen: { name: "generate_image", description: "画像を生成してDLリンクを返す", parameters: { type: "object", properties: { prompt: { type: "string" } }, required: ["prompt"] } },
  tts: { name: "synthesize_speech", description: "テキストを音声合成してDLリンクを返す", parameters: { type: "object", properties: { text: { type: "string" } }, required: ["text"] } },
  video_gen: { name: "generate_video", description: "動画を生成（非同期）", parameters: { type: "object", properties: { prompt: { type: "string" } }, required: ["prompt"] } }
};
const VIDEO_STATUS_TOOL = { name: "video_status", description: "依頼した動画生成の状況を確認（完成ならDLリンク）", parameters: { type: "object", properties: {} } };
async function execTool(ctx, owner, baseUrl, name, args, role, activeTools) {
  const tool = activeTools.find((t) => t.name === name);
  if (tool) {
    if (tool.requiredRole && !tool.requiredRole.includes(role)) return `「${name}」を実行する権限がありません（${tool.requiredRole.join("・")}のみ）。`;
    return tool.run(ctx, owner, baseUrl, args);
  }
  const env = ctx.env;
  switch (name) {
    case "install_skill": {
      const g = await generateSkill(env, owner, String(args.request ?? ""));
      return g.ok ? `スキル「${g.name}」を作成しました（無効状態）。管理者が高度なオプションで有効化すると使えます。` : g.error ?? "スキル生成に失敗しました。";
    }
    case "propose_app": {
      const name2 = String(args.name ?? "").trim();
      const spec = String(args.spec ?? "").trim();
      if (!name2) return "アプリ名が必要です。";
      if (!spec) return "実装前に企画・仕様（spec）をまとめてください。";
      const perms = Array.isArray(args.permissions) ? args.permissions.map(String) : [];
      const res = await createDraft(ctx, { name: name2, description: args.description ? String(args.description) : void 0, spec, permissions: perms, definition: args.definition, estTokens: Number(args.estimated_tokens) || void 0 }, owner);
      const icon = (s) => s === "ok" ? "✅" : s === "warn" ? "⚠️" : "⛔";
      const lines = res.preflight.checks.map((c) => `${icon(c.status)} ${c.label}：${c.detail}`).join("\n");
      return `企画・仕様を受け付け、実装前の事前確認を実施しました（草案ID: ${res.id}）。
${lines}

` + (res.gate === "ready" ? "→ 4確認OK。実装に進めます。管理者が高度なオプション → アプリ開発でレビュー後、公開申請できます。" : "→ ⛔ 問題があるため実装はブロックされました。上記の指摘を解消してから再依頼してください。");
    }
    case "web_search":
      return await webSearch(env, String(args.query)) ?? "web検索は未設定です。";
    case "make_document":
      return makeDocument(env, owner, baseUrl, { type: String(args.type ?? "md"), title: String(args.title), content: String(args.content) });
    case "run_skill":
      return runSkill(env, owner, baseUrl, String(args.name), String(args.input ?? ""));
    case "generate_image":
      return invokeCapability(env, owner, baseUrl, "image_gen", String(args.prompt));
    case "synthesize_speech":
      return invokeCapability(env, owner, baseUrl, "tts", String(args.text));
    case "generate_video":
      return invokeCapability(env, owner, baseUrl, "video_gen", String(args.prompt));
    case "video_status":
      return videoStatusText(env, owner, baseUrl);
    default:
      return "未知のツール";
  }
}
async function runAgent(ctx, owner, text, image, baseUrl = "", role = "member") {
  const env = ctx.env;
  const geminiKey = await getApiKey(env, "gemini");
  const claudeKey = await getApiKey(env, "claude");
  if (!geminiKey && !claudeKey && !env.LOCAL_AI_BASE_URL) return "AI機能が未設定です。管理画面の『連携設定』または『高度なオプション』で Gemini か Claude のAPIキーを登録してください。";
  const hasClaude = !!claudeKey;
  const engine = await getAiEngine(env);
  const enabledSkills = hasClaude ? await listSkills(env, true) : [];
  const caps = await listCapabilities(env, true);
  const capDecls = caps.map((c) => CAP_TOOLS[c.capability]).filter(Boolean);
  if (caps.some((c) => c.capability === "video_gen")) capDecls.push(VIDEO_STATUS_TOOL);
  const activeTools = toolsOf(enabledParts(await enabledPartIds(ctx)));
  const partDecls = activeTools.map((t) => ({ name: t.name, description: t.description, parameters: t.parameters }));
  const decls = [...partDecls, ...CORE_TOOLS, ...GEMINI_TOOLS, ...hasClaude ? CLAUDE_TOOLS : [], ...enabledSkills.length ? [skillTool(enabledSkills.map((s) => s.name))] : [], ...capDecls];
  const capInfo = await capabilitySummary(env);
  const custom = await getCustomPrompt(env);
  const sys = [SYSTEM, capInfo, custom && `団体の追加指示（口調・人格・回答形式など。安全制約は変更しない）:
${custom}`].filter(Boolean).join("\n");
  if (env.LOCAL_AI_BASE_URL && !geminiKey && !claudeKey) {
    const model = localChatModel(env.LOCAL_AI_BASE_URL, env.LOCAL_AI_MODEL ?? "llama3.1");
    return runToolLoop(model, sys, { text: text || "（依頼）", image }, decls, (n, a) => execTool(ctx, owner, baseUrl, n, a, role, activeTools));
  }
  const exec = (n, a) => execTool(ctx, owner, baseUrl, n, a, role, activeTools);
  const toolDecls = decls;
  const useClaude = !!claudeKey && (engine === "claude" || !geminiKey) && !image;
  if (useClaude) {
    const b = await overBudget(env, "claude");
    if (b === "pause") return "Claudeの今月の利用上限に達しました（高度なオプション → API使用量 で変更できます）。";
    if (b !== "switch_free") {
      await recordUsage(env, "claude");
      return runToolLoop(claudeModel(claudeKey), sys, { text: text || "（依頼）" }, toolDecls, exec);
    }
    if (!geminiKey) return "Claudeの上限に達しました（Gemini未設定のため停止）。高度なオプションで上限を変更してください。";
  }
  if (!geminiKey) return "選択中のエンジンが未設定です。『連携設定』で Gemini APIキーを登録するか、高度なオプションでエンジンを Claude に切り替えてください。";
  const gb = await overBudget(env, "gemini");
  if (gb !== "ok") return "Geminiの今月の利用上限に達しました（高度なオプション → API使用量 で変更できます）。";
  await recordUsage(env, "gemini");
  return runToolLoop(geminiModel(geminiKey), sys, { text: text || "（依頼）", image }, toolDecls, exec);
}
async function verifyLineSignature(secret, body, signature) {
  if (!signature) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected = btoa(String.fromCharCode(...new Uint8Array(mac)));
  if (expected.length !== signature.length) return false;
  let r = 0;
  for (let i = 0; i < expected.length; i++) r |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return r === 0;
}
async function lineReply(accessToken, replyToken, text) {
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ replyToken, messages: [{ type: "text", text: text.slice(0, 4900) }] })
  });
}
async function linePush(accessToken, to, text) {
  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ to, messages: [{ type: "text", text: text.slice(0, 4900) }] })
  });
}
async function fetchLineImage(accessToken, messageId) {
  const r = await fetch(`https://api-data.line.me/v2/bot/message/${messageId}/content`, { headers: { authorization: `Bearer ${accessToken}` } });
  if (!r.ok) return null;
  const buf = await r.arrayBuffer();
  const mimeType = r.headers.get("content-type") ?? "image/jpeg";
  const dataB64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
  return { mimeType, dataB64 };
}

export { lineReply as a, enqueueSummary as e, fetchLineImage as f, linePush as l, makeDocument as m, processSummaryJobs as p, runAgent as r, transcribeAudio as t, verifyLineSignature as v, webSearch as w };
