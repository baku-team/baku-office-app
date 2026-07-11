-- A-13: egress 成功送信の日次集約証跡。失敗/拒否は egress_log に個別記録するが、成功は無数になるため
-- host+method+day で1行に集約(count)する＝行数を抑えつつ「どこへ何回出たか」の事後監査を可能にする。
-- 本文・フルURL・クエリは残さない（監査に必要な最小＝送信先ホストとメソッドと回数のみ）。
CREATE TABLE IF NOT EXISTS egress_log_daily (day TEXT, host TEXT, method TEXT, count INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, host, method));
