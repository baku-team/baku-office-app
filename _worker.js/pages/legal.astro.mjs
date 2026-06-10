globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const prerender = false;
const $$Legal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Legal;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const isAdmin = ses.role === "admin" && ses.ctx === "org";
  const { buildDisclosure } = await import('../chunks/disclosure_BkARkjmY.mjs');
  const d = await buildDisclosure(env);
  const retentionText = d.retentionDays > 0 ? `${d.retentionDays}\u65E5\uFF08\u7D4C\u904E\u5F8C\u306F\u81EA\u52D5\u3067\u7269\u7406\u524A\u9664\uFF09` : "\u7121\u671F\u9650\uFF08\u624B\u52D5\u524A\u9664\u307E\u3067\u4FDD\u6301\uFF09";
  const { buildLegalTemplates } = await import('../chunks/legal-templates_C0jjTVq_.mjs');
  const tpl = isAdmin ? await buildLegalTemplates(env) : null;
  const plain = [
    "\u3010\u5916\u90E8\u9001\u4FE1\u30FBAI\u5229\u7528\u30FB\u4FDD\u5B58\u671F\u9593\u30FB\u524A\u9664\u65B9\u6CD5\u306E\u304A\u77E5\u3089\u305B\u3011",
    "",
    "\u25A0 \u5916\u90E8\u9001\u4FE1\u5148\uFF08\u73FE\u5728\u306E\u9023\u643A\u8A2D\u5B9A\u306B\u57FA\u3065\u304F\uFF09",
    ...d.destinations.map((x) => `\u30FB${x.name}
  \u76EE\u7684\uFF1A${x.purpose}
  \u9001\u4FE1\u3055\u308C\u5F97\u308B\u30C7\u30FC\u30BF\uFF1A${x.dataKinds}
  \u4E3B\u306A\u6240\u5728\u5730\uFF1A${x.region}${x.note ? `
  \u6CE8\u610F\uFF1A${x.note}` : ""}`),
    "",
    "\u25A0 AI\u5229\u7528\u306B\u3064\u3044\u3066",
    "\u30FB\u5165\u529B\u3055\u308C\u305F\u5185\u5BB9\u306F\u4E0A\u8A18\u306EAI\u63D0\u4F9B\u5143\u3078\u9001\u4FE1\u3055\u308C\u3001\u5FDC\u7B54\u751F\u6210\u306B\u5229\u7528\u3055\u308C\u307E\u3059\u3002\u500B\u4EBA\u60C5\u5831\u306E\u5165\u529B\u53EF\u5426\u306F\u5404\u56E3\u4F53\u306E\u5229\u7528\u76EE\u7684\u30FB\u540C\u610F\u306E\u7BC4\u56F2\u3067\u5224\u65AD\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    "",
    "\u25A0 \u30D5\u30A1\u30A4\u30EB\u306E\u4FDD\u5B58\u3068\u6697\u53F7\u5316",
    "\u30FB\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3055\u308C\u305F\u30D5\u30A1\u30A4\u30EB\u672C\u4F53\u306F\u4FDD\u5B58\u6642\u306B\u6697\u53F7\u5316\uFF08AES-GCM\uFF09\u3055\u308C\u307E\u3059\u3002",
    `\u30FB\u4FDD\u6301\u671F\u9593\uFF1A${retentionText}`,
    "",
    "\u25A0 \u524A\u9664\u65B9\u6CD5",
    "\u30FB\u5404\u753B\u9762\u304B\u3089\u8A72\u5F53\u30C7\u30FC\u30BF\u3092\u524A\u9664\u3067\u304D\u307E\u3059\u3002\u30D5\u30A1\u30A4\u30EB\u306F\u4FDD\u6301\u671F\u9593\u7D4C\u904E\u5F8C\u306B\u81EA\u52D5\u524A\u9664\u3055\u308C\u307E\u3059\u3002\u524A\u9664\u306E\u3054\u4F9D\u983C\u306F\u7BA1\u7406\u8005\u3078\u3054\u9023\u7D61\u304F\u3060\u3055\u3044\u3002",
    "",
    "\u25A0 \u8CAC\u4EFB\u5206\u754C\uFF08\u30DB\u30B9\u30C8\uFF0F\u9867\u5BA2\uFF0FBYOK\uFF09",
    d.responsibilityNote,
    ...d.limitedUse ? ["", "\u25A0 Google \u30E6\u30FC\u30B6\u30FC\u30C7\u30FC\u30BF\u306E\u9650\u5B9A\u5229\u7528\uFF08Limited Use\uFF09", d.limitedUse] : [],
    "",
    d.generatedNote
  ].join("\n");
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u5916\u90E8\u9001\u4FE1\u30FBAI\u5229\u7528\u306E\u958B\u793A", "active": "/legal" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>外部送信・AI利用・保存期間・削除方法</h1> <div class="banner banner-warn">本ページは現在の連携設定から<strong>自動生成</strong>した開示素材です。法的有効性は専門家（弁護士等）のレビューを推奨します。</div> <h2>外部送信先一覧</h2> <div class="table-wrap"><table> <thead><tr><th>送信先</th><th>目的</th><th>送信され得るデータ</th><th>主な所在地</th></tr></thead> <tbody> ${d.destinations.map((x) => renderTemplate`<tr><td><strong>${x.name}</strong>${x.note && renderTemplate`<div class="muted" style="font-size:.8rem">${x.note}</div>`}</td><td>${x.purpose}</td><td>${x.dataKinds}</td><td>${x.region}</td></tr>`)} </tbody> </table></div> <p class="muted">${d.generatedNote}</p> <h2>責任分界（ホスト／顧客／BYOK）</h2> <div class="card"><ul style="margin:0"> ${d.responsibilityNote.split("\n").map((line) => renderTemplate`<li>${line.replace(/^・/, "")}</li>`)} </ul></div> ${d.limitedUse && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h2>Google ユーザーデータの限定利用（Limited Use）</h2> <div class="card"> <p class="muted" style="font-size:.85rem">Gmail 等の Restricted scope を連携中のため、Google API Services User Data Policy に基づく開示を表示しています。</p> <ul style="margin:0"> ${d.limitedUse.split("\n").slice(1).map((line) => renderTemplate`<li>${line.replace(/^・/, "")}</li>`)} </ul> <p class="muted" style="font-size:.8rem;margin-top:.4rem"><a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a></p> </div> ` })}`}<h2>AI利用・保存・削除</h2> <div class="card"> <ul> <li>入力内容は上記のAI提供元へ送信され、応答生成に利用されます。</li> <li>ファイル本体は保存時暗号化（AES-GCM）。${d.encryptedAtRest ? "" : "\uFF08\u672A\u9069\u7528\uFF09"}</li> <li>ファイルの保持期間：<strong>${retentionText}</strong>（変更は使用量・上限画面）。</li> <li>削除：各画面から削除できます。保持期間経過後は自動削除されます。</li> </ul> </div> ${isAdmin && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h2>プライバシーポリシーへの転記用テキスト</h2> <p class="muted">以下を自社のプライバシーポリシー・利用者向け説明にコピーしてご利用ください（要・専門家確認）。</p> <textarea id="plain" readonly rows="16" style="width:100%;font-family:monospace;font-size:.8rem">${plain}</textarea> <button class="btn btn-primary" id="copy" style="margin-top:.5rem">コピー</button>  ${tpl && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` <h2>法務文書の記入式雛形</h2> <div class="banner banner-warn">以下は<strong>記入式の雛形（素材）</strong>です。〔 〕の事業者情報を記入し、<strong>必ず弁護士等の専門家の確認</strong>を経てご利用ください。現在の連携設定（サブプロセッサ・保持期間）を反映しています。</div> <p class="muted" style="font-size:.85rem">${tpl.note}</p> <details> <summary><strong>プライバシーポリシー（雛形）</strong></summary> <textarea class="tpl" readonly rows="18" style="width:100%;font-family:monospace;font-size:.78rem;margin-top:.4rem">${tpl.privacy}</textarea> <button class="btn btn-sm tpl-copy" type="button" style="margin-top:.3rem">コピー</button> </details> <details style="margin-top:.5rem"> <summary><strong>利用規約（雛形）</strong></summary> <textarea class="tpl" readonly rows="16" style="width:100%;font-family:monospace;font-size:.78rem;margin-top:.4rem">${tpl.terms}</textarea> <button class="btn btn-sm tpl-copy" type="button" style="margin-top:.3rem">コピー</button> </details> <details style="margin-top:.5rem"> <summary><strong>個人データ取扱いの取り決め（DPA・雛形）</strong></summary> <textarea class="tpl" readonly rows="16" style="width:100%;font-family:monospace;font-size:.78rem;margin-top:.4rem">${tpl.dpa}</textarea> <button class="btn btn-sm tpl-copy" type="button" style="margin-top:.3rem">コピー</button> </details>  `, "scripts": async ($$result4) => renderTemplate(_a || (_a = __template(['<script slot="scripts">\n            document.querySelectorAll(".tpl-copy").forEach((b) => b.addEventListener("click", async (e) => {\n              const ta = e.currentTarget.closest("details")?.querySelector(".tpl");\n              if (!ta) return;\n              try { await navigator.clipboard.writeText(ta.value); window.bo?.toast?.("\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"); }\n              catch { ta.select(); document.execCommand("copy"); }\n            }));\n          <\/script>']))) })}`}`, "scripts": async ($$result3) => renderTemplate(_b || (_b = __template(['<script slot="scripts">\n        document.getElementById("copy")?.addEventListener("click", async () => {\n          const t = document.getElementById("plain");\n          try { await navigator.clipboard.writeText(t.value); window.bo?.toast?.("\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"); }\n          catch { t.select(); document.execCommand("copy"); }\n        });\n      <\/script>']))) })}`}` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/legal.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/legal.astro";
const $$url = "/legal";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Legal,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
