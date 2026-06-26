globalThis.process ??= {};
globalThis.process.env ??= {};
import { i as inferApp } from "./media-ai_19posR16.mjs";
import { p as parseJsonObject } from "./cf-adapter_Bbx7rdbk.mjs";
import { v as validateLayout } from "./site_BwDQ4FzP.mjs";
import { ICON_OPTIONS, BLOCK_DEFS } from "./defs_C7dN86-U.mjs";
function fieldHint(f) {
  if (f.type === "select") return `${f.key}(${f.options.map((o) => o.value).filter(Boolean).join("|")})`;
  if (f.type === "list") return `${f.key}[{${f.item.map(fieldHint).join(", ")}}]`;
  return `${f.key}(${f.type})`;
}
function blockCatalogForAI() {
  return BLOCK_DEFS.map((d) => `- ${d.type}（${d.label}）: ${d.fields.map(fieldHint).join(", ")}`).join("\n");
}
const ICONS = ICON_OPTIONS.map((o) => o.value).filter(Boolean).join("/");
const SYS = `あなたは日本語の一流Webデザイナー兼コピーライターです。団体・店舗・イベントの魅力が一目で伝わる、洗練された1ページのHP/LPを「ブロック構成」として組み立てます。
出力は JSON オブジェクト1個のみ（前置き・説明・コードフェンス・コメントを一切付けない）。形式：{"version":1,"blocks":[{"type":"<種類>","props":{...}}],"note":"今回の変更点を1文で（日本語・例『ヒーローを力強い文面にし、特徴を4つに増やしました』）"}。

使えるブロックと props（この種類・キー以外は使わない。未知のものは無視され消えます）：
${blockCatalogForAI()}

【構成の指針（おしゃれで説得力のある1ページにする）】
- 基本の流れ：hero（eyebrow=短い英字ラベル＋印象的な title＋共感を呼ぶ lead＋主CTA/副CTA）→ features（3列・各 item に icon/title/body で価値を3〜4個）→ imageText（具体例やストーリー。左右 imageSide を交互に）→ stats（実績数値があれば）→ steps（利用/参加の流れ）→ gallery/quote/faq から必要なもの → 末尾に cta（背中を押す一言＋ボタン）。
- 説明内容に応じて取捨選択し、全体で 6〜10 ブロックに収める。冗長に並べない。
- コピーは定型文や「説明文を入力します」のようなプレースホルダ禁止。説明から具体的な言葉・固有の強みを引き出して書く。使うブロックの主要テキストは必ず中身を入れる。
- features の icon は次から選ぶ：${ICONS}。内容に合うものを割り当てる。
- 画像（hero.image / imageText.image / gallery.items[].image）は手元に無いので基本は空文字にする。外部URLを勝手に作らない。
- 画像が用意できない前提のため、画像が主役の gallery / logos は使わず、imageText も多用しない（使うなら image は空＝テキストが主役の構成にする）。代わりに features・stats・steps・faq・quote・cta・richText など画像不要のブロックで、余白と階層で魅せる構成にする。
- ボタン href は、ページ内移動なら #features 等、不明なら "#"。架空の外部URLは作らない。
- 申込・問い合わせ要素が説明にある時だけ contact（または app）ブロックを入れる。app.slug は不明なら空。
- hero.height は主役性で s/m/l、align は left か center。stats.items の value は "120" や "98%" のような短い文字列。

【整形モード（既存の下書きが渡された場合）】既存の意図・固有名詞・内容を尊重しつつ、(1)不足セクションの補完 (2)平凡なコピーの洗練 (3)順序の最適化 を行い、完成度の高い構成へ整える。元の良い部分は壊さない。`;
async function generateSiteLayout(env, opts) {
  const hasBase = !!(opts.base && Array.isArray(opts.base.blocks) && opts.base.blocks.length);
  const hist = (opts.history ?? []).slice(-6).map((t) => `${t.role === "user" ? "依頼" : "AI"}：${t.text}`).join("\n");
  const histBlock = hist ? `

【これまでのやり取り（参考）】
${hist}` : "";
  const user = hasBase ? `次の下書きを、指針とこれまでのやり取りを踏まえて修正・改善してください。元の良い部分は壊さず、依頼の箇所を中心に直します。${histBlock}

【現在の下書き(JSON)】
${JSON.stringify(opts.base)}

【今回の依頼】
${opts.prompt.trim() || "（特になし。全体を洗練させ、不足を補う）"}` : `次の説明から、おしゃれで説得力のあるHP/LPのブロック構成を作ってください。${histBlock}

【説明】
${opts.prompt.trim()}`;
  let raw = "";
  try {
    raw = await inferApp(env, user, { system: SYS, maxTokens: 6e3 });
  } catch {
    return { ok: false, error: "AIの呼び出しに失敗しました。時間をおいて再度お試しください。" };
  }
  if (!raw.trim()) return { ok: false, error: "AIが応答しませんでした。AIキーの設定（Gemini/Claude/ChatGPT）をご確認ください。" };
  const obj = parseJsonObject(raw);
  if (!obj || typeof obj !== "object") return { ok: false, error: "AIが有効な構成を生成できませんでした。説明をもう少し具体的にして再度お試しください。" };
  const note = typeof obj.note === "string" ? obj.note.slice(0, 200) : "";
  const r = validateLayout(obj);
  if (!r.ok || !r.layout) return { ok: false, error: r.error ?? "生成結果が不正でした。" };
  if (!r.layout.blocks.length) return { ok: false, error: "有効なブロックが生成されませんでした。説明を具体的にして再度お試しください。" };
  return { ok: true, layout: r.layout, note: note || (hasBase ? "ご依頼を反映しました。" : "構成を作成しました。") };
}
export {
  generateSiteLayout
};
