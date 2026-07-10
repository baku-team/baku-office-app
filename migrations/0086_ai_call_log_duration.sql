-- ai_call_log に duration_ms を追加：1呼び出しの所要時間(ミリ秒)を記録し、「メッセージ→返答/プランニングまで数分」の
-- 遅延の内訳（どのプロバイダ/機能(feature)が遅いか・ハング/タイムアウト）を後追いで解析できるようにする。
-- トークン0（エラー/タイムアウトで usage 無し）でも所要時間は残す（ai-metering.ts が失敗時も記録）。
ALTER TABLE ai_call_log ADD COLUMN duration_ms INTEGER;
