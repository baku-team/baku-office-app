-- CHAT-02: 背景（バックグラウンド）実行のジョブが、前景と同じ入力（選択モデル・モード・添付ビジョン）を
-- 保持できるよう agent_jobs に immutable な入力列を追加する。大きな binary は DB へ複製せず、所有権付き
-- file_id 参照（attachments JSON = [{fileId, mimeType}]）で保持し、実行時に再解決して再投入する。
ALTER TABLE agent_jobs ADD COLUMN model TEXT;
ALTER TABLE agent_jobs ADD COLUMN model_id TEXT;
ALTER TABLE agent_jobs ADD COLUMN mode TEXT;
ALTER TABLE agent_jobs ADD COLUMN attachments TEXT;
ALTER TABLE agent_jobs ADD COLUMN source TEXT;
