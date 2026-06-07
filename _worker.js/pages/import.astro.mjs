globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, p as Fragment, g as addAttribute } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../chunks/App_BeztdKLb.mjs';
import '../chunks/crypto_BhRWVEcj.mjs';
import { a as atLeast } from '../chunks/types_sPQFPjY_.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Import = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Import;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_ujH5pbJJ.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const isAdmin = ses.role === "admin" && ses.ctx === "org";
  const { cachedEntitlement } = await import('../chunks/client_KUuDosgV.mjs');
  const hasPlus = atLeast(await cachedEntitlement(env), "plus");
  const { listImported } = await import('../chunks/import_CAmjQsIe.mjs');
  const { fmtBytes } = await import('../chunks/storage-usage_Zli-bXJH.mjs');
  const r2Enabled = !!env.MEDIA_R2;
  const imported = hasPlus ? await listImported(env) : [];
  const fmt = (s) => new Date(s * 1e3).toISOString().slice(0, 10);
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u8CC7\u6599\u30A4\u30F3\u30DD\u30FC\u30C8", "active": "/import" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>資料インポート（Notion / Googleドライブ）</h1> ${!hasPlus && renderTemplate`<div class="card"> <div class="banner banner-warn">この機能は <strong>Plus 以上</strong>のプランで利用できます。</div> <p class="muted">Notion や Googleドライブの資料を取り込みます（既定はメタ情報のみ）。</p> <a class="btn btn-primary" href="/billing">プラン・課金へ</a> </div>`}${hasPlus && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <p class="muted">既定は<strong>メタ情報のみ</strong>を取り込みます。実ファイル（バイナリ）の取り込みは <strong>R2 有効時のみ</strong>のオプションです。実行前に容量と費用を試算します。</p> ${!isAdmin && renderTemplate`<div class="banner banner-warn">インポートの実行は管理者のみ可能です。</div>`}<div class="card"> <div class="row"> <label style="flex:1">取り込み元
<select id="src"><option value="drive">Googleドライブ（同期済みメタ）</option><option value="notion">Notion</option></select> </label> <label style="flex:1;display:flex;align-items:center;gap:6px;margin-top:1.4rem"> <input type="checkbox" id="withFiles"${addAttribute(!r2Enabled, "disabled")}> 実ファイルもR2へ取り込む${!r2Enabled && "\uFF08R2\u7121\u52B9\uFF09"} </label> </div> <div class="row" style="margin-top:.5rem"> <button class="btn" id="sim">容量・費用を試算</button> ${isAdmin && renderTemplate`<button class="btn btn-primary" id="run" disabled>この内容で取り込む</button>`} </div> <div id="simout" class="banner banner-info" hidden style="margin-top:.6rem;white-space:pre-wrap"></div> </div> <h2>取り込み済み</h2> <div class="table-wrap"><table> <thead><tr><th>タイトル</th><th>元</th><th>種類</th><th>サイズ</th><th>実体</th><th>取込日</th></tr></thead> <tbody> ${imported.map((it) => renderTemplate`<tr><td>${it.title}</td><td>${it.source}</td><td class="muted" style="font-size:.8rem">${it.mime ?? "\u2014"}</td><td>${it.size ? fmtBytes(it.size) : "\u2014"}</td><td>${it.file_id ? "R2\u4FDD\u5B58" : "\u30E1\u30BF\u306E\u307F"}</td><td class="muted">${fmt(it.imported_at)}</td></tr>`)} ${imported.length === 0 && renderTemplate`<tr><td colspan="6" class="muted">まだ取り込みがありません。</td></tr>`} </tbody> </table></div>  `, "scripts": async ($$result3) => renderTemplate(_a || (_a = __template(['<script slot="scripts">\n        const out = document.getElementById("simout");\n        const runBtn = document.getElementById("run");\n        const body = () => ({ source: document.getElementById("src").value, withFiles: document.getElementById("withFiles").checked });\n        const yen = (n) => "\xA5" + (n || 0).toLocaleString("ja-JP");\n        const mb = (n) => (n / 1048576).toFixed(1) + "MB";\n        document.getElementById("sim").addEventListener("click", async (e) => {\n          const r = await window.bo.api("/api/import", { _action: "simulate", ...body() }, { btn: e.currentTarget, successMsg: null });\n          if (!r.ok) return;\n          const d = r.data;\n          out.hidden = false;\n          out.textContent =\n            "\u5BFE\u8C61\uFF1A" + d.count + " \u4EF6\\n" +\n            "\u30E1\u30BF\u5897\u52A0\uFF08D1\uFF09\uFF1A\u7D04 " + mb(d.metaBytes) + (d.d1Over ? "  \u26A0\uFE0F\u4E0A\u9650\u8D85\u904E\u306E\u6050\u308C" : "") + "\\n" +\n            "\u5B9F\u30D5\u30A1\u30A4\u30EB\uFF08R2\uFF09\uFF1A" + (d.withFiles && d.r2Enabled ? "\u7D04 " + mb(d.binaryBytes) + " / \u6982\u7B97 " + yen(d.r2CostYen) + "/\u6708" + (d.r2Over ? "  \u26A0\uFE0F\u4E0A\u9650\u8D85\u904E\u306E\u6050\u308C" : "") : "\u53D6\u308A\u8FBC\u307E\u306A\u3044\uFF08\u30E1\u30BF\u306E\u307F\uFF09") + "\\n\\n" +\n            "\u5BFE\u7B56\uFF1A\\n- " + (d.advice || []).join("\\n- ");\n          if (runBtn) runBtn.disabled = false;\n        });\n        if (runBtn) runBtn.addEventListener("click", async (e) => {\n          if (!confirm("\u3053\u306E\u5185\u5BB9\u3067\u53D6\u308A\u8FBC\u307F\u307E\u3059\u304B\uFF1F")) return;\n          const r = await window.bo.api("/api/import", { _action: "run", ...body() }, { btn: e.currentTarget, successMsg: null });\n          if (r.ok) { window.bo.toast(r.data.imported + " \u4EF6\u53D6\u308A\u8FBC\u307F\u307E\u3057\u305F\uFF08R2:" + r.data.files + "\uFF09"); setTimeout(() => location.reload(), 1000); }\n        });\n      <\/script>'], ['<script slot="scripts">\n        const out = document.getElementById("simout");\n        const runBtn = document.getElementById("run");\n        const body = () => ({ source: document.getElementById("src").value, withFiles: document.getElementById("withFiles").checked });\n        const yen = (n) => "\xA5" + (n || 0).toLocaleString("ja-JP");\n        const mb = (n) => (n / 1048576).toFixed(1) + "MB";\n        document.getElementById("sim").addEventListener("click", async (e) => {\n          const r = await window.bo.api("/api/import", { _action: "simulate", ...body() }, { btn: e.currentTarget, successMsg: null });\n          if (!r.ok) return;\n          const d = r.data;\n          out.hidden = false;\n          out.textContent =\n            "\u5BFE\u8C61\uFF1A" + d.count + " \u4EF6\\\\n" +\n            "\u30E1\u30BF\u5897\u52A0\uFF08D1\uFF09\uFF1A\u7D04 " + mb(d.metaBytes) + (d.d1Over ? "  \u26A0\uFE0F\u4E0A\u9650\u8D85\u904E\u306E\u6050\u308C" : "") + "\\\\n" +\n            "\u5B9F\u30D5\u30A1\u30A4\u30EB\uFF08R2\uFF09\uFF1A" + (d.withFiles && d.r2Enabled ? "\u7D04 " + mb(d.binaryBytes) + " / \u6982\u7B97 " + yen(d.r2CostYen) + "/\u6708" + (d.r2Over ? "  \u26A0\uFE0F\u4E0A\u9650\u8D85\u904E\u306E\u6050\u308C" : "") : "\u53D6\u308A\u8FBC\u307E\u306A\u3044\uFF08\u30E1\u30BF\u306E\u307F\uFF09") + "\\\\n\\\\n" +\n            "\u5BFE\u7B56\uFF1A\\\\n- " + (d.advice || []).join("\\\\n- ");\n          if (runBtn) runBtn.disabled = false;\n        });\n        if (runBtn) runBtn.addEventListener("click", async (e) => {\n          if (!confirm("\u3053\u306E\u5185\u5BB9\u3067\u53D6\u308A\u8FBC\u307F\u307E\u3059\u304B\uFF1F")) return;\n          const r = await window.bo.api("/api/import", { _action: "run", ...body() }, { btn: e.currentTarget, successMsg: null });\n          if (r.ok) { window.bo.toast(r.data.imported + " \u4EF6\u53D6\u308A\u8FBC\u307F\u307E\u3057\u305F\uFF08R2:" + r.data.files + "\uFF09"); setTimeout(() => location.reload(), 1000); }\n        });\n      <\/script>']))) })}`}` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/import.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/import.astro";
const $$url = "/import";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Import,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
