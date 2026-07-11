-- MSG-05/06: アップロードキューに lease/notified を追加。processing のまま worker が落ちると永久停止していたのを、
-- lease_expiry で stale を回収可能にし、attempts 上限で dead-letter へ送る。notified で「結果は出たが通知に失敗」を
-- 追跡し（MSG-06）、管理・再送の対象にできるようにする。
ALTER TABLE upload_queue ADD COLUMN lease_expiry INTEGER;
ALTER TABLE upload_queue ADD COLUMN last_error TEXT;
ALTER TABLE upload_queue ADD COLUMN notified INTEGER DEFAULT 0;
