-- render 工程は内部で複数UIセクションを並列生成するため「工程N/N」の表示が数分動かず止まって見える。
-- セクション進捗（"3/5" 形式）を保持し、activity/会話の進捗率ゲージで render 中も前進を可視化する。
ALTER TABLE app_builds ADD COLUMN progress_detail TEXT;
