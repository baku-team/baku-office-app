globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, F as Fragment, b as addAttribute } from '../../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../../chunks/App_BsKkCq3o.mjs';
import '../../chunks/crypto_D21r3Dwx.mjs';
import { atLeast } from '../../chunks/index_Cg172zdv.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Theme = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Theme;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return Astro2.redirect("/login", 302);
  const entitlement = await (await import('../../chunks/client_DjSYVqc9.mjs')).cachedEntitlement(env);
  const hasPlus = atLeast(entitlement, "plus");
  const { getTheme } = await import('../../chunks/theme_Fu3FGkcO.mjs');
  const theme = hasPlus ? await getTheme(Astro2.locals.ctx) : {};
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u30D6\u30E9\u30F3\u30C9\u8A2D\u5B9A", "active": "/apps" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>ブランド設定（見た目）</h1> ${!hasPlus && renderTemplate`<div class="card"> <div class="banner banner-warn">この機能は <strong>Plus 以上</strong>のプランで利用できます。</div> <p class="muted">ブランド名・ロゴ・配色を団体ごとに上書きできます。</p> <a class="btn btn-primary" href="/billing">プラン・課金へ</a> </div>`}${hasPlus && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <p class="muted">ブランド名・ロゴ・配色を団体ごとに上書きします（共通の画面構造はそのまま）。空欄は既定値。色は #hex 等で指定。</p> <div class="card"> <div class="field"><label>ブランド名<input id="th-brand"${addAttribute(theme.brand ?? "", "value")} placeholder="baku-office"></label></div> <div class="field"><label>ロゴURL<input id="th-logo"${addAttribute(theme.logoUrl ?? "", "value")} placeholder="https://…/logo.png"></label></div> <div class="row"> <label style="flex:1">ブランド色<input id="th-brand-color"${addAttribute(theme.colors?.brand ?? "", "value")} placeholder="#2563eb"></label> <label style="flex:1">背景色<input id="th-bg"${addAttribute(theme.colors?.bg ?? "", "value")} placeholder="#f5f7fb"></label> <label style="flex:1">文字色<input id="th-ink"${addAttribute(theme.colors?.ink ?? "", "value")} placeholder="#1b2430"></label> </div> <button class="btn btn-primary" id="saveTheme">テーマを保存</button> </div>  `, "scripts": async ($$result3) => renderTemplate(_a || (_a = __template(['<script slot="scripts">\n        (function () {\n          const btn = document.getElementById("saveTheme");\n          if (!btn) return;\n          btn.addEventListener("click", async (e) => {\n            const theme = { brand: document.getElementById("th-brand").value, logoUrl: document.getElementById("th-logo").value, colors: { brand: document.getElementById("th-brand-color").value, bg: document.getElementById("th-bg").value, ink: document.getElementById("th-ink").value } };\n            const r = await window.bo.api("/api/settings", { _action: "ui_theme", theme }, { btn: e.currentTarget, successMsg: "\u30C6\u30FC\u30DE\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });\n            if (r.ok) setTimeout(() => location.reload(), 700);\n          });\n        })();\n      <\/script>']))) })}`}` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/theme.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/theme.astro";
const $$url = "/settings/theme";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Theme,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
