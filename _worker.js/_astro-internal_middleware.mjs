globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as defineMiddleware, s as sequence } from './chunks/render-context_HkNp5jlx.mjs';
import { getToken } from './chunks/client_KUuDosgV.mjs';
import { logDiag } from './chunks/diag_D3atJWnJ.mjs';
import { getFile, saveFile, storageMode } from './chunks/storage_Zv-sLn8E.mjs';
import { r as runAgent, m as makeDocument, w as webSearch, t as transcribeAudio } from './chunks/agent_BOTs072p.mjs';
import { verifyPassword } from './chunks/users_0t-xyk3J.mjs';
import { detectProfile } from './chunks/profiles_BEW0vMoQ.mjs';
import { makeAppsApi } from './chunks/apps_BKVIiywM.mjs';
import './chunks/index_C4EjYe4c.mjs';
import './chunks/astro-designed-error-pages_BT4bP6HZ.mjs';
import './chunks/astro/server_CfYoLHqm.mjs';

const m0001 = "-- クライアントアプリD1（設計書§8）。配備＝1組織なのでテナント分割なし。\n-- 数値・科目・日付・口座区分は平文（集計のため）。PII・摘要はアプリ層で暗号化（§10）。\n\n-- 会計コア（§8.1） --------------------------------------------------------\nCREATE TABLE IF NOT EXISTS fiscal_periods (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,\n  start_date TEXT NOT NULL,\n  end_date TEXT NOT NULL,\n  status TEXT NOT NULL DEFAULT 'open'      -- open / closed\n);\n\nCREATE TABLE IF NOT EXISTS wallets (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,\n  type TEXT NOT NULL,                        -- cash / bank\n  opening_balance INTEGER NOT NULL DEFAULT 0,\n  sort_order INTEGER NOT NULL DEFAULT 0\n);\n\nCREATE TABLE IF NOT EXISTS categories (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,\n  kind TEXT NOT NULL,                        -- income / expense\n  parent_id TEXT,\n  sort_order INTEGER NOT NULL DEFAULT 0\n);\n\nCREATE TABLE IF NOT EXISTS budgets (\n  id TEXT PRIMARY KEY,\n  fiscal_period_id TEXT NOT NULL,\n  category_id TEXT NOT NULL,\n  amount INTEGER NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS transactions (\n  id TEXT PRIMARY KEY,\n  fiscal_period_id TEXT NOT NULL,\n  date TEXT NOT NULL,\n  wallet_id TEXT NOT NULL,\n  kind TEXT NOT NULL,                        -- income / expense / transfer\n  category_id TEXT,\n  amount INTEGER NOT NULL,                    -- 円・整数\n  description TEXT,                           -- 摘要（△暗号化推奨）\n  counter_wallet_id TEXT,                     -- 振替先\n  created_by TEXT,                            -- users.id\n  receipt_ref TEXT,                           -- R2参照／個人領収書ID\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL,\n  deleted_at INTEGER                          -- ソフトデリート（§12）\n);\nCREATE INDEX IF NOT EXISTS idx_tx_period ON transactions (fiscal_period_id, date);\nCREATE INDEX IF NOT EXISTS idx_tx_wallet ON transactions (wallet_id, date);\nCREATE INDEX IF NOT EXISTS idx_tx_category ON transactions (category_id);\n\n-- マルチユーザー（§8.2） --------------------------------------------------\nCREATE TABLE IF NOT EXISTS users (\n  id TEXT PRIMARY KEY,\n  display_name TEXT,                          -- 暗号化\n  role TEXT NOT NULL DEFAULT 'member',        -- admin / accounting / clerical / other / member\n  status TEXT NOT NULL DEFAULT 'invited',     -- invited / pending / active / disabled\n  created_at INTEGER NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS identities (\n  id TEXT PRIMARY KEY,\n  user_id TEXT NOT NULL,\n  type TEXT NOT NULL,                          -- line / discord / local / google\n  external_id TEXT,                            -- LINE userId / Discord id / Google sub\n  password_hash TEXT,                          -- local時\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_identities_ext ON identities (type, external_id);\n\nCREATE TABLE IF NOT EXISTS invites (\n  id TEXT PRIMARY KEY,\n  code TEXT NOT NULL,\n  issued_by TEXT,\n  default_role TEXT NOT NULL DEFAULT 'member',\n  expires_at INTEGER NOT NULL,\n  max_uses INTEGER NOT NULL DEFAULT 1,\n  used_count INTEGER NOT NULL DEFAULT 0,\n  status TEXT NOT NULL DEFAULT 'active'        -- active / revoked\n);\nCREATE INDEX IF NOT EXISTS idx_invites_code ON invites (code);\n\nCREATE TABLE IF NOT EXISTS knowledge (\n  id TEXT PRIMARY KEY,\n  title TEXT,\n  body TEXT,\n  file_ref TEXT,\n  tags TEXT,\n  created_by TEXT,\n  created_at INTEGER NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS audit_log (\n  id TEXT PRIMARY KEY,\n  actor TEXT NOT NULL,                         -- user.id または 'org'\n  action TEXT NOT NULL,\n  target TEXT,\n  timestamp INTEGER NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS personal_items (\n  id TEXT PRIMARY KEY,\n  owner_user_id TEXT NOT NULL,\n  type TEXT NOT NULL,                          -- receipt / memo / task / schedule\n  title TEXT,\n  body TEXT,\n  amount INTEGER,\n  date TEXT,\n  due_at INTEGER,\n  status TEXT,\n  share_scope TEXT NOT NULL DEFAULT 'personal',-- personal / org\n  review_status TEXT NOT NULL DEFAULT 'none',  -- none / pending / approved / rejected\n  reviewed_by TEXT,\n  reviewed_at INTEGER,\n  reject_reason TEXT,\n  receipt_ref TEXT,\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_personal_owner ON personal_items (owner_user_id);\nCREATE INDEX IF NOT EXISTS idx_personal_review ON personal_items (review_status);\n";

const m0002 = "-- P4：ファイル・予定。議事録/ナレッジは knowledge を流用（tags で区別）。\n\nCREATE TABLE IF NOT EXISTS files (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,            -- ファイル名（PIIを入れない運用・§10.2）\n  size INTEGER NOT NULL,\n  mime TEXT,\n  ref TEXT NOT NULL,             -- r2:<key> / kv:<key>\n  created_by TEXT,\n  created_at INTEGER NOT NULL,\n  deleted_at INTEGER             -- ソフトデリート（§12）\n);\nCREATE INDEX IF NOT EXISTS idx_files_live ON files (deleted_at, created_at);\n\nCREATE TABLE IF NOT EXISTS schedules (\n  id TEXT PRIMARY KEY,\n  title TEXT NOT NULL,\n  start_at TEXT NOT NULL,        -- ISO日時\n  end_at TEXT,\n  body TEXT,                     -- 詳細（△暗号化推奨だがPhase1は平文）\n  created_by TEXT,\n  created_at INTEGER NOT NULL,\n  deleted_at INTEGER\n);\nCREATE INDEX IF NOT EXISTS idx_sched_live ON schedules (deleted_at, start_at);\n\n-- 議事録/ナレッジ用に knowledge へソフトデリート列を追加（既存テーブル）。\nALTER TABLE knowledge ADD COLUMN deleted_at INTEGER;\n";

const m0003 = "-- P6エージェント：リマインダー（LINEへ通知）。Astro単一Workerはネイティブcron非対応のため、\n-- /api/cron/drain（外部スケジューラ or 手動）＋メッセージ受信時の遅延配信で実現。\nCREATE TABLE IF NOT EXISTS reminders (\n  id TEXT PRIMARY KEY,\n  owner TEXT NOT NULL,          -- line:<userId> 等\n  content TEXT NOT NULL,\n  remind_at INTEGER NOT NULL,   -- epoch秒\n  done INTEGER NOT NULL DEFAULT 0,\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_reminders_due ON reminders (done, remind_at);\n";

const m0004 = "-- P6エージェント：大PDF/ファイルの要約ジョブ（Files API＋drainステップ）。\nCREATE TABLE IF NOT EXISTS summary_jobs (\n  id TEXT PRIMARY KEY,\n  owner TEXT NOT NULL,           -- line:<userId> 等\n  name TEXT,                     -- ファイル名\n  file_id TEXT NOT NULL,         -- files.id（KV/R2に保管した本体）\n  status TEXT NOT NULL DEFAULT 'pending', -- pending / done / error\n  result TEXT,                   -- 要約結果（knowledge にも保存）\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_sumjobs_status ON summary_jobs (status, created_at);\n";

const m0005 = "-- 高度なオプション：ユーザー追加の Agent Skills（SKILL.md駆動）。\n-- mode=instruction（通常LLM費）／code（Anthropic code execution＝従量課金・高度なオプション）。\nCREATE TABLE IF NOT EXISTS skills (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,            -- 呼び出し名（例：議事録フォーマット, 請求書生成）\n  description TEXT,\n  skill_md TEXT NOT NULL,        -- SKILL.md（手順・テンプレ）\n  mode TEXT NOT NULL DEFAULT 'instruction', -- instruction / code\n  enabled INTEGER NOT NULL DEFAULT 0,        -- 管理者がレビューして有効化\n  created_by TEXT,\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_skills_enabled ON skills (enabled);\n";

const m0006 = "-- 高度なオプション：任意API（能力レジストリ §5-2b の api 種別）。BYOK・暗号化保存。\nCREATE TABLE IF NOT EXISTS capabilities (\n  id TEXT PRIMARY KEY,\n  capability TEXT NOT NULL,      -- image_gen / tts / video_gen / embed / custom\n  provider TEXT,                 -- openai / stability / elevenlabs / 任意\n  endpoint TEXT,                 -- カスタム時のURL\n  model TEXT,\n  api_key TEXT,                  -- AES-GCM暗号化（MASTER_KEY）\n  enabled INTEGER NOT NULL DEFAULT 0,\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_cap_enabled ON capabilities (enabled);\n\n-- 診断・エラーログ（§7.1 診断・サポート／§13.3）。CF制限などの障害をUIに表示する。\nCREATE TABLE IF NOT EXISTS diagnostics (\n  id TEXT PRIMARY KEY,\n  level TEXT NOT NULL,           -- error / warn / info\n  category TEXT NOT NULL,        -- limit（CF制限）/ ai / storage / other\n  message TEXT NOT NULL,\n  context TEXT,\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_diag_time ON diagnostics (created_at);\n";

const m0007 = "-- 動画生成は非同期：作成→推定時間後にステータス確認→完了でDL。\nCREATE TABLE IF NOT EXISTS video_jobs (\n  id TEXT PRIMARY KEY,\n  owner TEXT NOT NULL,          -- line:<userId> 等\n  cap_id TEXT NOT NULL,         -- capabilities.id（プロバイダ/キー解決用）\n  job_id TEXT,\n  status_url TEXT,\n  prompt TEXT,\n  status TEXT NOT NULL DEFAULT 'pending', -- pending / done / error\n  file_id TEXT,                 -- 完成動画の files.id\n  eta INTEGER NOT NULL,         -- 次に確認する目安時刻(epoch秒)\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_videojobs ON video_jobs (status, eta);\n";

const m0008 = "-- API使用量（日次・プロバイダ別カウント）。AI機能・各APIの利用回数を記録（§使用量画面）。\nCREATE TABLE IF NOT EXISTS api_usage (\n  provider TEXT NOT NULL,   -- gemini / claude / web_search / image_gen / tts / video_gen / custom\n  day TEXT NOT NULL,        -- YYYY-MM-DD（UTC）\n  count INTEGER NOT NULL DEFAULT 0,\n  PRIMARY KEY (provider, day)\n);\n";

const m0009 = "-- Googleドライブ連携：ドライブ内ファイルのメタ情報同期＋バックアップ記録。\nCREATE TABLE IF NOT EXISTS drive_files (\n  id TEXT PRIMARY KEY,        -- Drive file id\n  name TEXT NOT NULL,\n  mime TEXT,\n  size INTEGER,\n  modified TEXT,              -- ISO（modifiedTime）\n  parents TEXT,              -- JSON配列文字列\n  synced_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_drive_files_name ON drive_files (name);\n\n-- KV/R2 → Drive バックアップ済みファイルの記録（重複アップロード防止）。\nCREATE TABLE IF NOT EXISTS drive_backup_log (\n  file_id TEXT PRIMARY KEY,   -- files.id（クライアント側）\n  drive_id TEXT,              -- アップロード先 Drive file id\n  at INTEGER NOT NULL\n);\n";

const m0010 = "-- 会員管理（会費を払う団体会員）。組織メンバー(users)・名簿(knowledge)とは別概念。\nCREATE TABLE IF NOT EXISTS membership (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,\n  contact TEXT,                          -- 連絡先（電話/メール等）\n  fee_status TEXT NOT NULL DEFAULT 'unpaid', -- paid / unpaid / exempt / withdrawn\n  paid_at TEXT,                          -- 支払い日時（ISO/任意文字列）\n  status_changed_at INTEGER,             -- ステータス変更日時（epoch秒）\n  extra TEXT,                            -- 任意項目（JSON文字列）\n  stripe_customer TEXT,                  -- Stripe連携（要件B）用の顧客ID（任意）\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_membership_name ON membership (name);\nCREATE INDEX IF NOT EXISTS idx_membership_fee ON membership (fee_status);\n";

const m0011 = "-- HP/LP 公開機構（Pro以上）。サブパス公開（/site・/lp/<slug>）。slug=home がトップ。\nCREATE TABLE IF NOT EXISTS sites (\n  slug TEXT PRIMARY KEY,         -- home / 任意スラッグ\n  title TEXT NOT NULL,\n  body TEXT,                     -- 本文（HTML。管理者入力＝信頼）\n  published INTEGER NOT NULL DEFAULT 0,\n  show_join INTEGER NOT NULL DEFAULT 0, -- 会員申込フォームを表示（会員管理と連動）\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL\n);\n";

const m0012 = "-- 外部資料インポート（Notion / Googleドライブ）。既定はメタのみ。R2有効時のみ実ファイルを取り込む。\nCREATE TABLE IF NOT EXISTS imported_items (\n  id TEXT PRIMARY KEY,\n  source TEXT NOT NULL,      -- drive / notion\n  ext_id TEXT,              -- 元のID\n  title TEXT NOT NULL,\n  mime TEXT,\n  size INTEGER,\n  url TEXT,\n  file_id TEXT,             -- R2取り込み時の files.id（メタのみなら NULL）\n  imported_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_imported_source ON imported_items (source);\n";

const m0013 = "-- 外部アプリ：レジストリから署名検証して取り込んだアプリ（ランタイム型・データ）。\nCREATE TABLE IF NOT EXISTS external_apps (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,\n  version TEXT NOT NULL,\n  category TEXT,\n  description TEXT,\n  permissions TEXT,      -- JSON配列\n  definition TEXT,       -- 宣言的アプリ定義（JSON）\n  installed_at INTEGER NOT NULL\n);\n\n-- アプリのドラフト：チャットでAI生成→管理者がレビュー→ホストへ公開申請。\nCREATE TABLE IF NOT EXISTS app_drafts (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,\n  version TEXT NOT NULL DEFAULT '0.1.0',\n  category TEXT,\n  description TEXT,\n  permissions TEXT,      -- JSON配列（要求権限・レビュー対象）\n  definition TEXT,       -- 宣言的アプリ定義（JSON）\n  status TEXT NOT NULL DEFAULT 'pending', -- pending / submitted / rejected\n  created_by TEXT,\n  created_at INTEGER NOT NULL\n);\n";

const m0014 = "-- アプリ開発の企画・仕様＋事前4確認（環境/権限/安全/コスト）をドラフトに保持。\nALTER TABLE app_drafts ADD COLUMN spec TEXT;                 -- 企画・仕様\nALTER TABLE app_drafts ADD COLUMN est_tokens INTEGER;       -- 推定消費トークン/実行\nALTER TABLE app_drafts ADD COLUMN preflight TEXT;           -- 事前確認結果（JSON: {ok, checks[]}）\nALTER TABLE app_drafts ADD COLUMN gate_status TEXT NOT NULL DEFAULT 'planning'; -- planning / ready / blocked\n";

const MIGRATIONS = [
  { id: "0001_client", sql: m0001 },
  { id: "0002_files_schedule", sql: m0002 },
  { id: "0003_reminders", sql: m0003 },
  { id: "0004_summary_jobs", sql: m0004 },
  { id: "0005_skills", sql: m0005 },
  { id: "0006_capabilities_diag", sql: m0006 },
  { id: "0007_video_jobs", sql: m0007 },
  { id: "0008_api_usage", sql: m0008 },
  { id: "0009_drive", sql: m0009 },
  { id: "0010_membership", sql: m0010 },
  { id: "0011_sites", sql: m0011 },
  { id: "0012_imports", sql: m0012 },
  { id: "0013_external_apps", sql: m0013 },
  { id: "0014_draft_preflight", sql: m0014 }
];
const SCHEMA_VERSION = MIGRATIONS.length;
function statements(sql) {
  return sql.split("\n").filter((l) => !l.trim().startsWith("--")).join("\n").split(";").map((s) => s.trim()).filter(Boolean);
}
const ignorable = (msg) => /already exists|duplicate column name/i.test(msg);
async function applyMigrations(env) {
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY, applied_at INTEGER)").run();
  const done = new Set((await env.DB.prepare("SELECT id FROM schema_migrations").all()).results.map((r) => r.id));
  const applied = [];
  for (const m of MIGRATIONS) {
    if (done.has(m.id)) continue;
    for (const stmt of statements(m.sql)) {
      try {
        await env.DB.prepare(stmt).run();
      } catch (e) {
        const msg = e.message ?? String(e);
        if (!ignorable(msg)) {
          await logDiag(env, "error", "migration", `migration ${m.id} 失敗: ${msg}`, stmt.slice(0, 200));
          throw e;
        }
      }
    }
    await env.DB.prepare("INSERT OR IGNORE INTO schema_migrations (id, applied_at) VALUES (?, ?)").bind(m.id, Math.floor(Date.now() / 1e3)).run();
    applied.push(m.id);
  }
  return { applied };
}
const KV_VER = "schema_version";
async function ensureSchema(env) {
  try {
    if (await env.LICENSE.get(KV_VER) === String(SCHEMA_VERSION)) return;
    await applyMigrations(env);
    await env.LICENSE.put(KV_VER, String(SCHEMA_VERSION));
  } catch (e) {
    await logDiag(env, "error", "migration", `ensureSchema 失敗: ${e.message ?? String(e)}`);
  }
}

function cfSqlStore(env) {
  return {
    prepare: (sql) => env.DB.prepare(sql),
    batch: (stmts) => env.DB.batch(stmts)
  };
}
function cfStorage(env) {
  return {
    kv: {
      get: (k) => env.LICENSE.get(k),
      put: (k, v, o) => env.LICENSE.put(k, v, o),
      delete: (k) => env.LICENSE.delete(k),
      list: async (prefix) => (await env.LICENSE.list({ prefix })).keys.map((x) => x.name)
    },
    mode: () => storageMode(env),
    saveFile: (file, by) => saveFile(env, file, by),
    getFile: (id) => getFile(env, id)
  };
}
function cfAi(env) {
  return {
    transcribe: (buf, mime) => transcribeAudio(env, buf, mime),
    webSearch: (q) => webSearch(env, q),
    makeDocument: (owner, baseUrl, a) => makeDocument(env, owner, baseUrl, a)
  };
}
function cfAgent(ctx) {
  return {
    run: (i) => runAgent(ctx, i.owner, i.text, i.image, i.baseUrl ?? "", i.role ?? "member")
  };
}

function localIdentity(ctx) {
  const memberOf = async (type, externalId) => {
    const idn = await ctx.db.prepare("SELECT user_id FROM identities WHERE type=? AND external_id=?").bind(type, externalId).first();
    if (!idn) return null;
    return await ctx.db.prepare("SELECT id, role, status FROM users WHERE id=?").bind(idn.user_id).first() ?? null;
  };
  return {
    memberOf,
    roleOf: async (type, externalId) => (await memberOf(type, externalId))?.role ?? null,
    authenticate: async (loginId, password) => {
      const idn = await ctx.db.prepare("SELECT user_id, password_hash FROM identities WHERE type='local' AND external_id=?").bind(loginId).first();
      if (!idn?.password_hash || !await verifyPassword(idn.password_hash, password)) return null;
      return await ctx.db.prepare("SELECT id, role, status FROM users WHERE id=? AND status='active'").bind(idn.user_id).first() ?? null;
    }
  };
}

function buildCtx(env) {
  const ctx = { profile: detectProfile(env).id, env, db: cfSqlStore(env), storage: cfStorage(env), ai: cfAi(env) };
  ctx.identity = localIdentity(ctx);
  ctx.agent = cfAgent(ctx);
  ctx.apps = makeAppsApi(ctx);
  return ctx;
}

const onRequest$2 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const env = context.locals.runtime.env;
  context.locals.ctx = buildCtx(env);
  await ensureSchema(env);
  const exempt = pathname.startsWith("/activate") || pathname.startsWith("/api/") || pathname.includes(".");
  if (exempt) return next();
  const token = await getToken(env);
  if (!token) {
    if (env.LICENSE_ID) return context.redirect("/activate?license_id=" + encodeURIComponent(env.LICENSE_ID), 302);
    return context.redirect("/activate", 302);
  }
  return next();
});

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	onRequest$2
	
);

export { onRequest };
