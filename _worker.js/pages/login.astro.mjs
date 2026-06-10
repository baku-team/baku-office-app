globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const env = Astro2.locals.runtime.env;
  const { providerEnabled } = await import('../chunks/oauth_BJmQE7w_.mjs');
  const google = providerEnabled(env, "google") || !!env.HOST_BASE_URL;
  const line = providerEnabled(env, "line");
  const discord = providerEnabled(env, "discord");
  const e = Astro2.url.searchParams.get("e");
  const activated = Astro2.url.searchParams.get("activated");
  const emsg = { state: "\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u5207\u308C\u307E\u3057\u305F\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002", oauth: "\u8A8D\u8A3C\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002", notorg: "\u3053\u306E\u7D44\u7E54\u306EGoogle\u30A2\u30AB\u30A6\u30F3\u30C8\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002", pending: "\u767B\u9332\u306F\u7BA1\u7406\u8005\u306E\u627F\u8A8D\u5F85\u3061\u3067\u3059\u3002", noapply: "\u3053\u306EGoogle\u30A2\u30AB\u30A6\u30F3\u30C8\uFF08\u30E1\u30FC\u30EB\uFF09\u306B\u5BFE\u5FDC\u3059\u308B\u7533\u8FBC\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u7533\u8FBC\u6642\u306E\u30E1\u30FC\u30EB\u306EGoogle\u30A2\u30AB\u30A6\u30F3\u30C8\u3067\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002" };
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u30ED\u30B0\u30A4\u30F3", "auth": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 style="margin-top:1rem">ログイン</h1> ${activated && renderTemplate`<div class="banner banner-info">✅ アクティベーションが完了しました。続けて Google でログインしてください。</div>`}${e && renderTemplate`<div class="banner banner-danger">${emsg[e] ?? "\u30A8\u30E9\u30FC"}</div>`}<div class="card"> <h2 style="margin-top:0;border:0">組織（管理者）</h2> ${google ? renderTemplate`<a class="btn btn-primary" href="/api/auth/google/start">Googleでログイン</a>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`<p class="muted">本番は組織のGoogleアカウントで認証（§6.2）。dev：</p><button class="btn btn-primary" id="org">組織管理者としてログイン（dev）</button>` })}`} </div> <div class="card" style="margin-top:1rem"> <h2 style="margin-top:0;border:0">個人（メンバー）</h2> ${line || discord ? renderTemplate`<p>${line && renderTemplate`<a class="btn" style="background:#06c755;color:#fff" href="/api/auth/line/start">LINEでログイン</a>`} ${discord && renderTemplate`<a class="btn" style="background:#5865f2;color:#fff" href="/api/auth/discord/start">Discordでログイン</a>`}</p>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`<p class="muted">本番はLINEログイン等（§6.2）。dev：ID/パスワード。</p><div class="field"><label for="lid">ログインID</label><input id="lid" name="lid" autocomplete="username" placeholder="ログインID"></div><div class="field"><label for="lpw">パスワード</label><input id="lpw" name="lpw" type="password" autocomplete="current-password" placeholder="パスワード"></div><button class="btn btn-primary" id="local">個人ログイン</button>` })}`} <p class="muted">招待コードをお持ちの方は <a href="/join">こちらから参加</a></p> </div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    const org=document.getElementById("org");\n    if(org)org.addEventListener("click",async(e)=>{const r=await window.bo.api("/api/login",{mode:"org"},{btn:e.currentTarget,successMsg:"\u30ED\u30B0\u30A4\u30F3\u3057\u307E\u3057\u305F"});if(r.ok)location.href="/";});\n    const lc=document.getElementById("local");\n    if(lc)lc.addEventListener("click",async(e)=>{const r=await window.bo.api("/api/login",{mode:"local",loginId:document.getElementById("lid").value,password:document.getElementById("lpw").value},{btn:e.currentTarget,successMsg:"\u30ED\u30B0\u30A4\u30F3\u3057\u307E\u3057\u305F"});if(r.ok)location.href="/";});\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/login.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
