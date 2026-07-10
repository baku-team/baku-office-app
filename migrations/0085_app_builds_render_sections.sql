-- app_builds に render_sections を追加：render 分割のセクション構成＋生成済みフラグメント(JSON)を保存し、
-- invocation kill 後の再開で欠けたセクションだけ再生成できるようにする（全損→一括再生成の増幅を防ぐ・段階ビルドの
-- render 工程を実行枠切れに強くする）。値は {sections:[{id,title,purpose,wireScreenIds?}], frags:[string|null]}。
-- split 完了（成功/フォールバック）時に NULL へクリアするため、次工程/再ビルドには持ち越さない。
ALTER TABLE app_builds ADD COLUMN render_sections TEXT;
