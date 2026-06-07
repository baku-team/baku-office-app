globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../../chunks/App_BeztdKLb.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Keys = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Keys;
  const env = Astro2.locals.runtime.env;
  const { hasApiKey } = await import('../../chunks/client_KUuDosgV.mjs');
  const status = {
    gemini: await hasApiKey(env, "gemini"),
    line_secret: await hasApiKey(env, "line_secret"),
    line_token: await hasApiKey(env, "line_token"),
    claude: await hasApiKey(env, "claude")
  };
  const mark = (b) => b ? "\u2713 \u8A2D\u5B9A\u6E08\u307F" : "\u672A\u8A2D\u5B9A";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u9023\u643A\u8A2D\u5B9A", "active": "/settings/keys" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>連携設定（APIキー）</h1> <p class="muted">保存時に各サービスへテスト呼び出しで検証し、暗号化して保存します（CFダッシュボード不要・§10.3）。空欄は変更なし。</p> <div class="banner banner-info">📲 LINEエージェント（Proプラン）：LINE Developers の Messaging API Webhook URL に <code>${Astro2.url.origin}/api/line/webhook</code> を設定してください。</div> <div class="card"> <div class="field"><label>Gemini APIキー <span class="muted">（${mark(status.gemini)}）</span></label><input name="gemini" type="password" placeholder="AIza..." autocomplete="off"></div> <div class="field"><label>LINE チャネルシークレット <span class="muted">（${mark(status.line_secret)}）</span></label><input name="line_secret" type="password" autocomplete="off"></div> <div class="field"><label>LINE チャネルアクセストークン <span class="muted">（${mark(status.line_token)}）</span></label><input name="line_token" type="password" autocomplete="off"></div> <div class="field"><label>Claude APIキー（上位・任意） <span class="muted">（${mark(status.claude)}）</span></label><input name="claude" type="password" placeholder="sk-ant-..." autocomplete="off"></div> <button class="btn btn-primary" id="save">検証して保存</button> </div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    document.getElementById("save").addEventListener("click", async (e) => {\n      const data = {};\n      document.querySelectorAll("input[name]").forEach((i) => { if (i.value) data[i.name] = i.value; });\n      if (!Object.keys(data).length) { window.bo.toast("\u5909\u66F4\u306F\u3042\u308A\u307E\u305B\u3093", "info"); return; }\n      const { ok, data: j } = await window.bo.api("/api/keys", data, { btn: e.currentTarget, successMsg: null });\n      if (!ok) return;\n      const res = j.result || {};\n      const lines = Object.entries(res).map(([k, v]) => `${k}: ${v.ok ? "\u2713\u6709\u52B9" : "\u2717\u7121\u52B9"}`);\n      const anyFail = Object.values(res).some((v) => !v.ok);\n      window.bo.toast(lines.join(" / ") || "\u4FDD\u5B58\u3057\u307E\u3057\u305F", anyFail ? "err" : "ok");\n      if (!anyFail) setTimeout(() => location.reload(), 900);\n    });\n  <\/script>'], ['<script>\n    document.getElementById("save").addEventListener("click", async (e) => {\n      const data = {};\n      document.querySelectorAll("input[name]").forEach((i) => { if (i.value) data[i.name] = i.value; });\n      if (!Object.keys(data).length) { window.bo.toast("\u5909\u66F4\u306F\u3042\u308A\u307E\u305B\u3093", "info"); return; }\n      const { ok, data: j } = await window.bo.api("/api/keys", data, { btn: e.currentTarget, successMsg: null });\n      if (!ok) return;\n      const res = j.result || {};\n      const lines = Object.entries(res).map(([k, v]) => \\`\\${k}: \\${v.ok ? "\u2713\u6709\u52B9" : "\u2717\u7121\u52B9"}\\`);\n      const anyFail = Object.values(res).some((v) => !v.ok);\n      window.bo.toast(lines.join(" / ") || "\u4FDD\u5B58\u3057\u307E\u3057\u305F", anyFail ? "err" : "ok");\n      if (!anyFail) setTimeout(() => location.reload(), 900);\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/keys.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/keys.astro";
const $$url = "/settings/keys";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Keys,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
