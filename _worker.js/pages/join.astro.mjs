globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Join = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Join;
  const code = Astro2.url.searchParams.get("code") ?? "";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u53C2\u52A0", "auth": false }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 style="margin-top:1rem">組織に参加</h1> <p class="muted">招待コードで参加します。登録後は<strong>管理者の承認</strong>で利用開始（§6.3）。</p> <div class="card"> <div class="field"><label>招待コード</label><input id="code"${addAttribute(code, "value")}></div> <div class="field"><label>氏名・役職</label><input id="name" placeholder="例：山田太郎 / 会計"></div> <div class="field"><label>ログインID</label><input id="lid" placeholder="半角"></div> <div class="field"><label>パスワード</label><input id="pw" type="password"></div> <button class="btn btn-primary" id="join">参加申請する</button> </div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    document.getElementById("join").addEventListener("click",async(e)=>{\n      const r=await window.bo.api("/api/join",{code:document.getElementById("code").value,name:document.getElementById("name").value,loginId:document.getElementById("lid").value,password:document.getElementById("pw").value},{btn:e.currentTarget,successMsg:"\u7533\u8ACB\u3057\u307E\u3057\u305F\u3002\u7BA1\u7406\u8005\u306E\u627F\u8A8D\u3092\u304A\u5F85\u3061\u304F\u3060\u3055\u3044\u3002"});\n      if(r.ok)setTimeout(()=>location.href="/login",1500);\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/join.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/join.astro";
const $$url = "/join";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Join,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
