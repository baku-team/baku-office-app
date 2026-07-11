-- GOOG-07/08: app_event_runs に attempts と lease_expiry を追加。
-- GOOG-08: running のまま worker が停止しても lease_expiry で stale を回収でき、attempts で有限リトライ→dead-letter にする。
-- GOOG-07: cursor を「未解決(retryable-failed)が無い時だけ」前進させる基盤。失敗 event を残したまま cursor が先へ進まない。
ALTER TABLE app_event_runs ADD COLUMN attempts INTEGER DEFAULT 0;
ALTER TABLE app_event_runs ADD COLUMN lease_expiry INTEGER;
