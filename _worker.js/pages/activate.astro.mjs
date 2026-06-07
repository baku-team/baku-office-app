globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../chunks/App_BeztdKLb.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Activate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Activate;
  const env = Astro2.locals.runtime.env;
  const url = Astro2.url;
  const origin = url.origin;
  const host = env.HOST_BASE_URL.replace(/\/$/, "");
  const licenseId = url.searchParams.get("license_id");
  const code = url.searchParams.get("code");
  let message = "";
  if (licenseId && !code) {
    return Astro2.redirect(`${host}/api/activate?license_id=${encodeURIComponent(licenseId)}&callback=${encodeURIComponent(origin + "/activate")}`, 302);
  }
  if (code) {
    const { hostFetch, saveToken } = await import('../chunks/client_KUuDosgV.mjs');
    const r = await hostFetch(env, "/api/token", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code, deployUrl: origin }) });
    const j = await r.json().catch(() => ({}));
    if (j.ok && j.token) {
      await saveToken(env, j.token);
      return Astro2.redirect("/login?activated=1", 302);
    }
    message = "\u30A2\u30AF\u30C6\u30A3\u30D9\u30FC\u30B7\u30E7\u30F3\u306B\u5931\u6557\u3057\u307E\u3057\u305F\uFF1A" + (j.error ?? "\u4E0D\u660E\u306A\u30A8\u30E9\u30FC");
  }
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u30A2\u30AF\u30C6\u30A3\u30D9\u30FC\u30B7\u30E7\u30F3", "auth": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 style="margin-top:1rem">baku-office をアクティベート</h1> ${message && renderTemplate`<div class="banner banner-danger">${message}</div>`}<div class="card"> <p><strong>申込時の Google アカウントでログイン</strong>すると、自動でアクティベートされて利用開始できます。ライセンスIDの入力は不要です。</p> <a class="btn btn-primary" href="/api/auth/google/start" style="display:block;text-align:center;padding:.85rem;font-size:1.05rem;text-decoration:none">Google でログイン</a> </div> <details style="margin-top:.5rem"><summary class="muted">うまくいかない場合：ライセンスIDで手動アクティベート</summary> <div class="card" style="margin-top:.5rem"> <div class="field"><input id="lid" placeholder="ライセンスID"></div> <button class="btn" id="go">アクティベート</button> </div> </details>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    document.getElementById("go")?.addEventListener("click", () => {\n      const v = document.getElementById("lid").value.trim();\n      if (!v) { (window.bo?.toast ? window.bo.toast("\u30E9\u30A4\u30BB\u30F3\u30B9ID\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", "err") : alert("\u30E9\u30A4\u30BB\u30F3\u30B9ID\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044")); return; }\n      location.href = "/activate?license_id=" + encodeURIComponent(v);\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/activate.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/activate.astro";
const $$url = "/activate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Activate,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
