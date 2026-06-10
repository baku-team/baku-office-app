globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, b as addAttribute, F as Fragment } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Diagnostics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Diagnostics;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { recentDiagnostics, hasRecentLimitError } = await import('../chunks/diag_v9I7g07l.mjs');
  const { listReplies } = await import('../chunks/reports_CSdFXBi2.mjs');
  const diags = await recentDiagnostics(env);
  const limit = await hasRecentLimitError(env);
  const replies = await listReplies(env).catch(() => []);
  const t = (s) => new Date(s * 1e3).toISOString().slice(0, 16).replace("T", " ");
  const { detectProfile } = await import('../chunks/profiles_BV3AeO7m.mjs');
  const prof = detectProfile(env);
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u8A3A\u65AD\u30FB\u30B5\u30DD\u30FC\u30C8", "active": "/diagnostics" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>診断・サポート</h1> <div class="card"> <p class="muted">稼働中の構成（環境Profile・§6）</p> <p>Profile <strong>${prof.label}</strong>／AI=<strong>${prof.ai === "local" ? "\u30ED\u30FC\u30AB\u30EBLLM" : "\u30AF\u30E9\u30A6\u30C9"}</strong>／ストレージ=<strong>${prof.storage.toUpperCase()}</strong>／鍵=<strong>${prof.keyStore === "secret" ? "Worker Secret" : prof.keyStore === "missing-prod" ? "\u672A\u8A2D\u5B9A\uFF08\u672C\u756A\u30FB\u6697\u53F7\u51E6\u7406\u30D6\u30ED\u30C3\u30AF\u4E2D\uFF09" : "KV\u81EA\u52D5\u751F\u6210\uFF08\u8981\u5BFE\u5FDC\uFF09"}</strong></p> ${prof.keyStore === "missing-prod" && renderTemplate`<div class="banner banner-danger">⚠️ <strong>MASTER_KEY が本番で未設定です。</strong>暗号処理（APIキー/PII/ファイル）はブロック中で正常動作しません。<code>wrangler secret put MASTER_KEY --env production</code> で投入してください（§10.1）。</div>`} ${prof.keyStore === "kv-autogen" && renderTemplate`<div class="banner banner-warn">MASTER_KEY が Worker Secret 未設定です。本番は <code>wrangler secret put MASTER_KEY</code> を推奨（鍵と暗号文の同居回避・§10.1）。</div>`} </div> ${limit && renderTemplate`<div class="banner banner-danger">⚠️ 直近にCloudflareの<strong>無料枠の制限</strong>に達したエラーがあります。重い処理を安定させるには <a href="/settings/advanced">高度なオプション → Workers Paid</a> をご検討ください。</div>`}<div class="table-wrap"><table><thead><tr><th>日時</th><th>区分</th><th>レベル</th><th>内容</th></tr></thead><tbody> ${diags.map((d) => renderTemplate`<tr><td>${t(d.created_at)}</td><td><span class="pill"${addAttribute(d.category === "limit" ? "background:#fee2e2;color:#b91c1c" : "", "style")}${addAttribute(d.category === "limit" ? "\u533A\u5206: \u4E0A\u9650\u5230\u9054" : `\u533A\u5206: ${d.category}`, "aria-label")}>${d.category === "limit" ? "\u26A0 " : ""}${d.category}</span></td><td>${d.level}</td><td>${d.message}</td></tr>`)} ${diags.length === 0 && renderTemplate`<tr><td colspan="4" class="muted">記録はありません（正常）。</td></tr>`} </tbody></table></div> <p class="muted" style="margin-top:1rem">エラーは自動でサポート（ホスト）へ報告され、クラウドで対応可能なものは修正されます。本文に個人情報は含めません（PIIなし・§13.3）。</p> <h2 style="margin-top:1.5rem">不具合・要望のリクエスト</h2> <p class="muted">不具合や「こうしてほしい」をサポートへ送れます。クラウドで対応できるものは自動で修正され、対応状況は下に表示されます。</p> <div class="card"> <div class="field"><label>件名（任意）<input id="fb-title" placeholder="例：会計のCSV取込でエラー"></label></div> <div class="field"><label>内容<textarea id="fb-msg" rows="4" placeholder="状況・再現手順・要望などをご記入ください（個人情報は書かないでください）"></textarea></label></div> <button class="btn btn-primary" id="fb-send">送信する</button> </div> ${replies.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h2 style="margin-top:1.5rem">サポートからの対応</h2> <div class="table-wrap"><table><thead><tr><th>日時</th><th>種別</th><th>件名</th><th>状況</th><th>対応メモ</th></tr></thead><tbody> ${replies.map((r) => renderTemplate`<tr> <td>${t(r.received_at)}</td> <td>${r.kind === "error" ? "\u30A8\u30E9\u30FC" : "\u8981\u671B"}</td> <td>${r.title ?? "\u2014"}</td> <td><span class="pill"${addAttribute(r.status === "resolved" ? "background:#dcfce7;color:#166534" : "background:#f3f4f6;color:#374151", "style")}${addAttribute(`\u72B6\u614B: ${r.status === "resolved" ? "\u4FEE\u6B63\u6E08\u307F" : r.status === "wontfix" ? "\u898B\u9001\u308A" : r.status}`, "aria-label")}>${r.status === "resolved" ? "\u2713 \u4FEE\u6B63\u6E08\u307F" : r.status === "wontfix" ? "\u898B\u9001\u308A" : r.status}</span></td> <td>${r.resolution ?? "\u2014"}${r.pr_url && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` <a${addAttribute(r.pr_url, "href")} target="_blank" rel="noreferrer">変更内容</a>` })}`}</td> </tr>`)} </tbody></table></div> ` })}`} `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    document.getElementById("fb-send")?.addEventListener("click", async (e) => {\n      const title = document.getElementById("fb-title").value.trim();\n      const message = document.getElementById("fb-msg").value.trim();\n      if (!message) { window.bo.toast("\u5185\u5BB9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", "err"); return; }\n      const r = await window.bo.api("/api/report", { title, message }, { btn: e.currentTarget, successMsg: "\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002" });\n      if (r.ok) { document.getElementById("fb-title").value = ""; document.getElementById("fb-msg").value = ""; }\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/diagnostics.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/diagnostics.astro";
const $$url = "/diagnostics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Diagnostics,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
