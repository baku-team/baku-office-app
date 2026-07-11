-- SITE-07: 公開履歴の版番号を (slug, version_no) で一意にし、同時公開が同じ版番号を2件作るのを排他する。
-- 従来は非 UNIQUE index のみで、公開UPDATE→再SELECT→MAX+1→INSERT が別々に走り、同時公開・再試行で版番号が
-- 重複したり同一内容の履歴が増殖していた。INSERT ... SELECT MAX+1 と UNIQUE の併用で原子的に採番する。
CREATE UNIQUE INDEX IF NOT EXISTS idx_slv_unique ON site_layout_versions (slug, version_no);
