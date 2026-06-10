globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as defineMiddleware, s as sequence } from './chunks/render-context_BeyN5WWK.mjs';
import { masterKeySource, getToken } from './chunks/client_DjSYVqc9.mjs';
import { logDiag } from './chunks/diag_v9I7g07l.mjs';
import { sameOrigin } from './chunks/auth_BDOdme1H.mjs';
import { getFile, saveFile, storageMode } from './chunks/storage_ComUGkKO.mjs';
import { a as makeDocument, w as webSearch, t as transcribeAudio } from './chunks/invoices_DUrRkHPD.mjs';
import { r as runAgent } from './chunks/agent_sOGRQKT2.mjs';
import { verifyPassword } from './chunks/users_D80O6cuB.mjs';
import { detectProfile } from './chunks/profiles_BV3AeO7m.mjs';
import { makeAppsApi } from './chunks/apps_Bd2BWu4r.mjs';
import './chunks/index_DDI9b6m9.mjs';
import './chunks/astro-designed-error-pages_C1BIVXT3.mjs';
import './chunks/astro/server_DRI6mTND.mjs';

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

const m0015 = "-- AIチャットのセッションと履歴（セッション切替・モデル選択用）。\nCREATE TABLE IF NOT EXISTS chat_sessions (\n  id TEXT PRIMARY KEY,\n  owner TEXT NOT NULL,          -- session.uid 等（個人スコープ）\n  title TEXT,\n  model TEXT,                   -- gemini / claude / local（既定はエンジン設定）\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_chat_sessions_owner ON chat_sessions (owner, updated_at);\n\nCREATE TABLE IF NOT EXISTS chat_messages (\n  id TEXT PRIMARY KEY,\n  session_id TEXT NOT NULL,\n  role TEXT NOT NULL,           -- user / assistant\n  content TEXT NOT NULL,\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages (session_id, created_at);\n";

const m0016 = "-- マルチエージェントの長時間ジョブ（バックグラウンド実行）。drain で順次処理。\nCREATE TABLE IF NOT EXISTS agent_jobs (\n  id TEXT PRIMARY KEY,\n  owner TEXT NOT NULL,\n  session_id TEXT,\n  prompt TEXT NOT NULL,\n  role TEXT NOT NULL DEFAULT 'member',\n  status TEXT NOT NULL DEFAULT 'pending',\n  result TEXT,\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_agent_jobs_status ON agent_jobs (status, created_at);\n";

const m0017 = "-- A2A 公開アクション（ノーコード宣言型＋アプリアクション参照）を一元管理。read専用・スコープ付き。\nCREATE TABLE IF NOT EXISTS a2a_actions (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL,            -- 公開名（相手が呼ぶ名前）\n  kind TEXT NOT NULL,           -- 'app'（Part.actions参照） / 'decl'（ノーコード宣言）\n  spec TEXT NOT NULL,           -- JSON: app={appId,action} / decl={type,config}\n  scope TEXT NOT NULL DEFAULT 'common', -- common / conn / group\n  target TEXT NOT NULL DEFAULT '',       -- conn=相手license / group=groupId / common=空\n  enabled INTEGER NOT NULL DEFAULT 1,\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_a2a_actions_name ON a2a_actions (name);\n";

const m0018 = "-- クライアント→ホストへの報告（自動エラー・不具合/要望リクエスト）の送信アウトボックス。\n-- オフライン/一時障害でも貯めておき、cron/drain で未送信分をまとめてホストへ送る。\nCREATE TABLE IF NOT EXISTS client_report_outbox (\n  id TEXT PRIMARY KEY,\n  kind TEXT NOT NULL,\n  severity TEXT,\n  category TEXT,\n  title TEXT,\n  message TEXT NOT NULL,\n  context TEXT,\n  fingerprint TEXT,\n  sent INTEGER NOT NULL DEFAULT 0,\n  attempts INTEGER NOT NULL DEFAULT 0,\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_outbox_sent ON client_report_outbox (sent, created_at);\n\n-- ホストからの対応返信（resolved/wontfix）。利用者へ「対応済み」を表示するため保持。\nCREATE TABLE IF NOT EXISTS host_report_replies (\n  id TEXT PRIMARY KEY,\n  kind TEXT,\n  title TEXT,\n  status TEXT,\n  resolution TEXT,\n  pr_url TEXT,\n  seen INTEGER NOT NULL DEFAULT 0,\n  received_at INTEGER NOT NULL\n);\n";

const m0019 = "-- Google Meet 会議記録の要約キャッシュ（方式③：会議後トランスクリプト→Claude要約→knowledge/reminders へ反映）。\n-- Calendar / Gmail は道具経由のオンデマンド取得で十分なため、ローカルテーブルは持たない（Meet のみキャッシュ）。\nCREATE TABLE IF NOT EXISTS meet_records (\n  id TEXT PRIMARY KEY,                          -- Meet conferenceRecord 名（conferenceRecords/xxx）\n  space_name TEXT,                              -- spaces/xxx\n  title TEXT,                                   -- 会議タイトル\n  start_time TEXT,                              -- ISO（会議開始）\n  end_time TEXT,                                -- ISO（会議終了）\n  summary TEXT,                                 -- Claude による議事録要約\n  actions TEXT,                                 -- 抽出したアクションアイテム（JSON配列）\n  knowledge_saved INTEGER NOT NULL DEFAULT 0,   -- ナレッジ保存済みフラグ（二重保存防止）\n  reminders_saved INTEGER NOT NULL DEFAULT 0,   -- リマインダ登録済みフラグ\n  owner TEXT,\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_meet_records_created ON meet_records (created_at);\n";

const m0020 = "-- 請求書管理：画像/PDFから抽出した請求情報＋支払いステータス。元ファイルは files テーブル（R2/KV）へ保存し file_id で参照。\n-- 抽出は Claude マルチモーダル（lib/media-ai.ts extractInvoiceData）。期日接近の未払は reminders へ通知予約。\nCREATE TABLE IF NOT EXISTS invoices (\n  id TEXT PRIMARY KEY,\n  owner TEXT NOT NULL,                   -- 登録者/組織スコープ（自動取込は \"org\"）\n  file_id TEXT,                          -- files テーブルの元ファイル参照（PDF/画像）\n  vendor TEXT,                           -- 請求元\n  amount INTEGER,                        -- 金額（円・整数）\n  issued_date TEXT,                      -- 発行日（ISO日付）\n  due_date TEXT,                         -- 支払期日（ISO日付）\n  status TEXT NOT NULL DEFAULT 'unpaid', -- unpaid / paid / overdue / canceled\n  notes TEXT,\n  source TEXT,                           -- mail / manual / chat（入力経路）\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL,\n  deleted_at INTEGER\n);\nCREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices (status, due_date);\nCREATE INDEX IF NOT EXISTS idx_invoices_owner ON invoices (owner, created_at);\n";

const m0021 = "-- アプリ内通知：自動取込(owner=\"org\")など LINE 未紐付けスコープ向けの期日通知等を保持。\n-- drain（cron）が積み、UI（ヘッダのベル＋/api/notifications）が表示・既読化する。\nCREATE TABLE IF NOT EXISTS notifications (\n  id TEXT PRIMARY KEY,\n  owner TEXT NOT NULL,         -- 通知先スコープ（\"org\" / \"line:<id>\" / session uid）\n  kind TEXT NOT NULL,          -- 種別（reminder 等）\n  body TEXT NOT NULL,          -- 本文\n  link TEXT,                   -- 任意の遷移先（例 /invoices）\n  read_at INTEGER,             -- 既読時刻（NULL=未読）\n  created_at INTEGER NOT NULL\n);\nCREATE INDEX IF NOT EXISTS idx_notifications_owner ON notifications (owner, read_at, created_at);\n";

const m0022 = "-- API使用量に token / 推定費用 / 単位 を追加（第三者レビュー P0-2）。\n-- 回数(count)だけでは実費とズレるため、provider別の input/output token と推定USDを日次で蓄積する。\n-- units = token以外の従量単位（Web検索回数・音声/動画秒数など）。\nALTER TABLE api_usage ADD COLUMN input_tokens INTEGER NOT NULL DEFAULT 0;\nALTER TABLE api_usage ADD COLUMN output_tokens INTEGER NOT NULL DEFAULT 0;\nALTER TABLE api_usage ADD COLUMN est_usd REAL NOT NULL DEFAULT 0;\nALTER TABLE api_usage ADD COLUMN units INTEGER NOT NULL DEFAULT 0;\n";

const m0023 = "-- ファイル保存時暗号化と保持期限（第三者レビュー P0-5）。\n-- enc=1 は本体が MASTER_KEY 由来鍵で AES-GCM 暗号化済み（既存=0 は平文・後方互換）。\n-- expires_at（UTC秒）を過ぎたファイルは削除ジョブが物理削除する。\nALTER TABLE files ADD COLUMN enc INTEGER NOT NULL DEFAULT 0;\nALTER TABLE files ADD COLUMN expires_at INTEGER;\nCREATE INDEX IF NOT EXISTS idx_files_expires ON files (expires_at);\n";

const m0024 = "-- エージェントの破壊的/対外操作の人間承認キュー（第三者レビュー P0-4）。\n-- メール送信・予定改変/削除・A2A連携など「対外/破壊系」ツールは、実行前に preview を出して\n-- pending で保留し、人間が承認したときだけ実行する（操作プレビュー→承認→実行）。\nCREATE TABLE IF NOT EXISTS agent_approvals (\n  id TEXT PRIMARY KEY,\n  owner TEXT NOT NULL,            -- 起案スコープ（line:<id> / session uid 等）\n  tool TEXT NOT NULL,            -- 対象ツール名\n  args TEXT NOT NULL,            -- 引数(JSON)\n  preview TEXT NOT NULL,         -- 人間向けの操作プレビュー\n  status TEXT NOT NULL DEFAULT 'pending', -- pending / approved / rejected\n  result TEXT,                  -- 承認実行後の結果\n  created_at INTEGER NOT NULL,\n  decided_at INTEGER,\n  decided_by TEXT\n);\nCREATE INDEX IF NOT EXISTS idx_approvals_pending ON agent_approvals (status, created_at);\n";

const m0025 = "-- P0-1（IDOR是正）：ファイルにアクセス文脈(ctx)を付与し、所有者/ロール検査の土台にする。\n-- org=組織共有プール（org文脈ユーザーが共有）／personal=個人(LINE/Discord等)の私的ファイル。\n-- 既存行は歴史的に組織内共有前提だったため 'org' へ backfill（NULL も scoped クエリ側で org 扱い）。\nALTER TABLE files ADD COLUMN ctx TEXT;\nUPDATE files SET ctx = 'org' WHERE ctx IS NULL;\nCREATE INDEX IF NOT EXISTS idx_files_owner ON files (created_by, deleted_at);\n";

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
  { id: "0014_draft_preflight", sql: m0014 },
  { id: "0015_chat_sessions", sql: m0015 },
  { id: "0016_agent_jobs", sql: m0016 },
  { id: "0017_a2a_actions", sql: m0017 },
  { id: "0018_reports", sql: m0018 },
  { id: "0019_google", sql: m0019 },
  { id: "0020_invoices", sql: m0020 },
  { id: "0021_notifications", sql: m0021 },
  { id: "0022_usage_tokens", sql: m0022 },
  { id: "0023_files_encryption", sql: m0023 },
  { id: "0024_agent_approvals", sql: m0024 },
  { id: "0025_files_ctx", sql: m0025 }
];
const SCHEMA_VERSION = MIGRATIONS.length;
function statements(sql) {
  return sql.split("\n").map((l) => l.replace(/--.*$/, "")).join("\n").split(";").map((s) => s.trim()).filter(Boolean);
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
const KV_LOCK = "schema_lock";
async function ensureSchema(env) {
  try {
    if (await env.LICENSE.get(KV_VER) === String(SCHEMA_VERSION)) return;
    if (await env.LICENSE.get(KV_LOCK) === "1") return;
    await env.LICENSE.put(KV_LOCK, "1", { expirationTtl: 60 });
    try {
      await applyMigrations(env);
      await env.LICENSE.put(KV_VER, String(SCHEMA_VERSION));
    } finally {
      await env.LICENSE.delete(KV_LOCK).catch(() => {
      });
    }
  } catch (e) {
    await logDiag(env, "error", "migration", `ensureSchema 失敗: ${e.message ?? String(e)}`);
  }
}

const KV_FLAG = "bootcheck_done";
function checkProdEnv(env) {
  const out = [];
  if (env.ENVIRONMENT !== "production") return out;
  if (!env.MASTER_KEY) out.push({ level: "error", key: "MASTER_KEY", detail: "未設定。保存時暗号化・セッション署名が停止する（wrangler secret put MASTER_KEY --env production）。" });
  if (!env.VERIFY_PUBLIC_JWK) out.push({ level: "warn", key: "VERIFY_PUBLIC_JWK", detail: "未設定。A2A受信の署名検証が 503 になる。" });
  if (!env.INTERNAL_KEY) out.push({ level: "warn", key: "INTERNAL_KEY", detail: "未設定。リマインダー drain の保護が効かない。" });
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) out.push({ level: "warn", key: "GOOGLE_OAUTH", detail: "GOOGLE_CLIENT_ID/SECRET 未設定。組織ログインが dev 経路にフォールバックする。" });
  return out;
}
let isolateChecked = false;
async function bootCheck(env) {
  if (isolateChecked) return;
  isolateChecked = true;
  try {
    if (await env.LICENSE.get(KV_FLAG) === "1") return;
    if (env.ENVIRONMENT === "production") {
      for (const f of checkProdEnv(env)) {
        await logDiag(env, f.level, "bootcheck", `本番設定点検: ${f.key} — ${f.detail}`);
      }
    }
    const src = await masterKeySource(env);
    if (src === "missing-prod") {
      await logDiag(
        env,
        "error",
        "security",
        "本番で MASTER_KEY が未投入＝暗号処理をブロック中。`wrangler secret put MASTER_KEY --env production` で投入してください（§10.1）。"
      );
    } else if (src === "kv-autogen" && env.ENVIRONMENT === "production") {
      await logDiag(
        env,
        "error",
        "security",
        "本番(自社)で MASTER_KEY が KV 自動生成です＝運用事故（鍵と暗号文が同居）。Worker Secret(MASTER_KEY) を投入してください（§10.1）。"
      );
    }
    if (src !== "unknown") await env.LICENSE.put(KV_FLAG, "1");
  } catch {
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
    run: (i) => runAgent(ctx, i.owner, i.text, i.image, i.baseUrl ?? "", i.role ?? "member", { history: i.history, model: i.model })
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

const STATIC_EXT = /\.(?:css|js|mjs|map|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|txt|json|xml|webmanifest)$/i;
const UNSAFE_METHODS = /* @__PURE__ */ new Set(["POST", "PUT", "PATCH", "DELETE"]);
const CSRF_EXEMPT = /* @__PURE__ */ new Set([
  "/api/site/stripe-webhook",
  "/api/line/webhook",
  "/api/a2a/inbound",
  "/api/cron/drain"
]);
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'"
].join("; ");
function withSec(res) {
  res.headers.set("Content-Security-Policy", CSP);
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
}
const onRequest$2 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const env = context.locals.runtime.env;
  context.locals.ctx = buildCtx(env);
  await ensureSchema(env);
  await bootCheck(env);
  if (pathname.startsWith("/api/") && UNSAFE_METHODS.has(context.request.method) && !CSRF_EXEMPT.has(pathname) && !sameOrigin(context.request)) {
    return withSec(
      new Response(JSON.stringify({ error: "cross-site request rejected" }), {
        status: 403,
        headers: { "content-type": "application/json" }
      })
    );
  }
  const exempt = pathname.startsWith("/activate") || pathname.startsWith("/api/") || STATIC_EXT.test(pathname);
  if (exempt) return withSec(await next());
  const token = await getToken(env);
  if (!token) {
    if (env.LICENSE_ID) return withSec(context.redirect("/activate?license_id=" + encodeURIComponent(env.LICENSE_ID), 302));
    return withSec(context.redirect("/activate", 302));
  }
  return withSec(await next());
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
