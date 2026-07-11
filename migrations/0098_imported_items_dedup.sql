-- NOTION-02/03/05: 取り込み(imported_items)に本文・重複排除・workspace(connection) 識別を追加する。
-- connection_id＝取込元の接続識別（Notion は workspace_id・Drive は空）。content_hash/last_edited で create/update/unchanged を判定。
-- body＝ページ本文の構造化テキスト snapshot（NOTION-02：従来はメタのみ保存し AI/検索が本文を使えなかった）。
ALTER TABLE imported_items ADD COLUMN connection_id TEXT;
ALTER TABLE imported_items ADD COLUMN content_hash TEXT;
ALTER TABLE imported_items ADD COLUMN body TEXT;
ALTER TABLE imported_items ADD COLUMN last_edited TEXT;
-- NOTION-03：同じ (source, ext_id, connection_id) は1行に集約＝実行のたびの重複 insert を防ぐ（connection_id は '' 既定で NULL 差異を作らない）。
CREATE UNIQUE INDEX IF NOT EXISTS idx_imported_unique ON imported_items (source, ext_id, connection_id);
