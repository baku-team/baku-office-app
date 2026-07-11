-- CHAT-03: 添付の文脈を会話履歴に残す。従来はチャットメッセージ本文に「画像を添付」等しか保存せず、
-- file_id・ファイル名・MIME・抽出要約を保持しなかったため、次ターンで「その画像の2行目」「添付CSVを別集計して」
-- と指示しても AI が対象を特定できなかった。message_attachments で参照を保持し、tools/ビジョンが所有権を
-- 再検証して必要な添付を再解決できるようにする（binary は files 側で保持し、ここは参照のみ）。
CREATE TABLE IF NOT EXISTS message_attachments (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  owner TEXT NOT NULL,
  file_id TEXT NOT NULL,
  mime TEXT,
  name TEXT,
  summary TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_msg_att_msg ON message_attachments(message_id);
CREATE INDEX IF NOT EXISTS idx_msg_att_session ON message_attachments(session_id, created_at);
