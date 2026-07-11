-- MSG-01: 外部受信（LINE/Discord/Slack）の durable inbox。受信メッセージを処理する前に payload を確定し、
-- 処理後に status を done へ進める。Worker 中断・AI例外・送信失敗で処理が完了しなかったイベントは pending の
-- まま残り、cron drain が検知して owner へ「未完了の可能性・再送依頼」を push＝無通知の消失と監査欠落を防ぐ。
CREATE TABLE IF NOT EXISTS inbound_events (
  id TEXT PRIMARY KEY,                       -- ランダムID（respond 1回=1レコード。provider の再送重複は KV seen で先に排除済み）
  connector TEXT NOT NULL,                    -- line / discord / slack
  sender TEXT NOT NULL,                       -- 送信者の不透明ID（owner=connector:sender の回収先）
  payload TEXT NOT NULL,                      -- NormalizedInbound の JSON（再現・監査用）
  status TEXT NOT NULL DEFAULT 'pending',     -- pending / done / failed（dead-letter）
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_inbound_events_pending ON inbound_events (status, updated_at);
