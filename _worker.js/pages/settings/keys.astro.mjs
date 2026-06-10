globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../../chunks/App_BsKkCq3o.mjs';
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
  const { hasApiKey } = await import('../../chunks/client_DjSYVqc9.mjs');
  const status = {
    gemini: await hasApiKey(env, "gemini"),
    line_secret: await hasApiKey(env, "line_secret"),
    line_token: await hasApiKey(env, "line_token"),
    claude: await hasApiKey(env, "claude"),
    // Worker Secret(env)があればそれを優先表示、無ければ暗号化KVの有無。
    google_client_id: !!env.GOOGLE_CLIENT_ID || await hasApiKey(env, "google_client_id"),
    google_client_secret: !!env.GOOGLE_CLIENT_SECRET || await hasApiKey(env, "google_client_secret")
  };
  const bySecret = { id: !!env.GOOGLE_CLIENT_ID, secret: !!env.GOOGLE_CLIENT_SECRET };
  const mark = (b) => b ? "\u2713 \u8A2D\u5B9A\u6E08\u307F" : "\u672A\u8A2D\u5B9A";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u9023\u643A\u8A2D\u5B9A", "active": "/settings/keys" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>連携設定（APIキー）</h1> <p class="muted">保存時に各サービスへテスト呼び出しで検証し、暗号化して保存します（CFダッシュボード不要・§10.3）。空欄は変更なし。</p> <div class="banner banner-info">📲 LINEエージェント（Proプラン）：LINE Developers の Messaging API Webhook URL に <code>${Astro2.url.origin}/api/line/webhook</code> を設定してください。</div> <div class="card"> <div class="field"><label>Gemini APIキー <span class="muted">（${mark(status.gemini)}）</span></label><input name="gemini" type="password" placeholder="AIza..." autocomplete="off"></div> <div class="field"><label>LINE チャネルシークレット <span class="muted">（${mark(status.line_secret)}）</span></label><input name="line_secret" type="password" autocomplete="off"></div> <div class="field"><label>LINE チャネルアクセストークン <span class="muted">（${mark(status.line_token)}）</span></label><input name="line_token" type="password" autocomplete="off"></div> <div class="field"><label>Claude APIキー（上位・任意） <span class="muted">（${mark(status.claude)}）</span></label><input name="claude" type="password" placeholder="sk-ant-..." autocomplete="off"></div> <button class="btn btn-primary" id="save">検証して保存</button> </div> <h2>Google 連携（Calendar / Gmail / Meet）</h2> <p class="muted">Google Cloud Console で作成した OAuth クライアント（ウェブアプリ）の <strong>クライアントID／シークレット</strong>を登録します。暗号化して保存され、登録後すぐ各画面で連携できます（再デプロイ不要）。</p> <div class="banner banner-info">はじめての方は <a href="/settings/google-setup">Google 連携セットアップ（手順ガイド）</a> から進めると、Console の各ページへのリンク・リダイレクトURI・登録までを順に案内します。</div> <div class="banner banner-info">Google Cloud Console の OAuth クライアントに、承認済みリダイレクト URI として <code>${Astro2.url.origin}/api/google/callback</code> を登録してください。</div> <div class="card"> <div class="field"><label>Google クライアントID <span class="muted">（${mark(status.google_client_id)}${bySecret.id ? "\u30FBWorker Secret" : ""}）</span></label><input name="google_client_id" type="text" placeholder="xxxxx.apps.googleusercontent.com" autocomplete="off"${addAttribute(bySecret.id, "disabled")}></div> <div class="field"><label>Google クライアントシークレット <span class="muted">（${mark(status.google_client_secret)}${bySecret.secret ? "\u30FBWorker Secret" : ""}）</span></label><input name="google_client_secret" type="password" placeholder="GOCSPX-..." autocomplete="off"${addAttribute(bySecret.secret, "disabled")}></div> ${(bySecret.id || bySecret.secret) && renderTemplate`<p class="muted">Worker Secret で投入済みの項目は画面から変更できません（Secret が優先されます）。</p>`} <button class="btn btn-primary" id="saveGoogle">保存</button> </div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    const submitKeys = async (sel, btn) => {\n      const data = {};\n      document.querySelectorAll(sel).forEach((i) => { if (i.value && !i.disabled) data[i.name] = i.value; });\n      if (!Object.keys(data).length) { window.bo.toast("\u5909\u66F4\u306F\u3042\u308A\u307E\u305B\u3093", "info"); return; }\n      const { ok, data: j } = await window.bo.api("/api/keys", data, { btn, successMsg: null });\n      if (!ok) return;\n      const res = j.result || {};\n      const lines = Object.entries(res).map(([k, v]) => `${k}: ${v.ok ? "\u2713\u6709\u52B9" : "\u2717\u7121\u52B9"}`);\n      const anyFail = Object.values(res).some((v) => !v.ok);\n      window.bo.toast(lines.join(" / ") || "\u4FDD\u5B58\u3057\u307E\u3057\u305F", anyFail ? "err" : "ok");\n      if (!anyFail) setTimeout(() => location.reload(), 900);\n    };\n    document.getElementById("save").addEventListener("click", (e) => submitKeys("input[name]:not([name^=\'google_\'])", e.currentTarget));\n    document.getElementById("saveGoogle")?.addEventListener("click", (e) => submitKeys("input[name^=\'google_\']", e.currentTarget));\n  <\/script>'], ['<script>\n    const submitKeys = async (sel, btn) => {\n      const data = {};\n      document.querySelectorAll(sel).forEach((i) => { if (i.value && !i.disabled) data[i.name] = i.value; });\n      if (!Object.keys(data).length) { window.bo.toast("\u5909\u66F4\u306F\u3042\u308A\u307E\u305B\u3093", "info"); return; }\n      const { ok, data: j } = await window.bo.api("/api/keys", data, { btn, successMsg: null });\n      if (!ok) return;\n      const res = j.result || {};\n      const lines = Object.entries(res).map(([k, v]) => \\`\\${k}: \\${v.ok ? "\u2713\u6709\u52B9" : "\u2717\u7121\u52B9"}\\`);\n      const anyFail = Object.values(res).some((v) => !v.ok);\n      window.bo.toast(lines.join(" / ") || "\u4FDD\u5B58\u3057\u307E\u3057\u305F", anyFail ? "err" : "ok");\n      if (!anyFail) setTimeout(() => location.reload(), 900);\n    };\n    document.getElementById("save").addEventListener("click", (e) => submitKeys("input[name]:not([name^=\'google_\'])", e.currentTarget));\n    document.getElementById("saveGoogle")?.addEventListener("click", (e) => submitKeys("input[name^=\'google_\']", e.currentTarget));\n  <\/script>']))) })}`;
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
