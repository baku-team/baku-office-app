-- SITE-02: HP下書きの競合検出。draft_revision は下書き保存のたびに単調増加する版番号。
-- AIビルドは開始時の draft_revision を site_builds.base_revision に記録し、finalize 時に照合する
-- ＝生成中に手動編集や別AIの下書きが入ったら、古い生成結果で無条件に上書きしない（利用者の編集を消さない）。
ALTER TABLE sites ADD COLUMN draft_revision INTEGER NOT NULL DEFAULT 0;
ALTER TABLE site_builds ADD COLUMN base_revision INTEGER NOT NULL DEFAULT 0;
