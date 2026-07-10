-- #6 本命A(A2)：アプリごとの連携設定値（Googleシートid等）を保持する。定義の configFields で宣言した key に対し
-- admin が値を設定し、実行時に $config.<key> で解決する（app-runtime が bind.config へ注入）。
-- scope_owner="__shared__"（dataScope=shared＝組織で1つ）or 実行者 owner（personal＝各自）。
-- 値は id/URL 等の非機密な設定に限る（アクセストークンは保存しない＝Google のトークンはサーバ側 googleFetch で完結）。
CREATE TABLE IF NOT EXISTS app_config (
  app_id TEXT NOT NULL,
  scope_owner TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (app_id, scope_owner, key)
);
