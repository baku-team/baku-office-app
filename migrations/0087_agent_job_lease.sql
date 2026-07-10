-- agent_jobs に lease_owner を追加：DO kick（サブ秒）と cron drain（毎分）の並走で claim 競合機会が増えるため、
-- heartbeat/完了/エラー確定を「自分が確保した lease か」でフェンスして exactly-once を構造保証する。
-- claim 時にランダムトークンを SET し、以降の更新は WHERE lease_owner=? で自分の回だけを触る。
-- デプロイ跨ぎの混在期間は lease_owner=NULL の旧 claim がフェンス対象外（一過性・許容）。
ALTER TABLE agent_jobs ADD COLUMN lease_owner TEXT;
