-- A-3②: セッション失効エポックの正本（D1）。KV `revoke:{uid}` はこの読み取りキャッシュ。
-- KV枯渇（書込上限超過）・揮発時でも失効を効かせるため、getSession/revokedSince は KVミス時に本表を参照する。
-- revokeSessions は本表への upsert 成功を必須とし、失敗時は権限変更（setRole/rejectUser 等）自体を中止する（fail-closed）。
CREATE TABLE IF NOT EXISTS session_revocations (uid TEXT PRIMARY KEY, cut_at INTEGER NOT NULL);
