globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, F as Fragment, b as addAttribute } from '../../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../../chunks/App_BsKkCq3o.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Update = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Update;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return Astro2.redirect("/login", 302);
  const { pollHost, APP_VERSION } = await import('../../chunks/client_DjSYVqc9.mjs');
  const { hasDeployHook, cmpVersion } = await import('../../chunks/update_CTWokLRg.mjs');
  const check = await pollHost(env, Astro2.url.origin);
  const latest = check?.latestVersion ?? APP_VERSION;
  const updateAvailable = cmpVersion(latest, APP_VERSION) > 0;
  const configured = await hasDeployHook(env);
  const SETTINGS = "https://dash.cloudflare.com/?to=/:account/workers/services/view/baku-office/production/settings";
  const DEPLOYMENTS = "https://dash.cloudflare.com/?to=/:account/workers/services/view/baku-office/production/deployments";
  const FALLBACK = "https://dash.cloudflare.com/?to=/:account/workers-and-pages";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u30A2\u30D7\u30EA\u306E\u66F4\u65B0", "active": "/settings/update" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>アプリの更新</h1> <p class="muted">現在のバージョン：<span class="pill">${APP_VERSION}</span> ／ 最新：<span class="pill">${latest}</span> ／ 自動更新：<strong>${configured ? "\u8A2D\u5B9A\u6E08\u307F\uFF08\u6848\u2460\uFF09" : "\u672A\u8A2D\u5B9A"}</strong></p> ${updateAvailable ? renderTemplate`<div class="banner banner-warn">🔔 新しいバージョン <strong>${latest}</strong> があります。下の手順で更新してください（データ・設定は保持されます）。</div>` : renderTemplate`<div class="banner banner-info">✅ 最新の状態です。更新があるとここに表示されます。</div>`}<div class="banner banner-info" style="font-size:.86rem">更新は<strong>同じプロジェクトの再ビルド</strong>です。Deploy ボタンの押し直し（最初からやり直し）は行わないでください（データが切り離されます）。</div> ${configured ? renderTemplate`<div class="card"> <h2 style="margin-top:0;border:0">案①：アプリ内ボタンで更新（設定済み）</h2> <p class="muted">登録済みの再ビルド用フックで、このアプリを最新に更新します。数分で反映されます。</p> <button class="btn btn-primary" id="trigger">今すぐ更新する</button> <div id="trigmsg" style="margin-top:.5rem"></div> <details style="margin-top:.75rem"><summary class="muted">自動更新の設定を解除する</summary> <p class="muted">解除すると、次回からは案②（手動の再ビルド）になります。</p> <button class="btn btn-warn" id="clearhook">自動更新を解除</button> </details> </div>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="card"> <h2 style="margin-top:0;border:0">案②：手動で再ビルド（設定不要・いますぐ）</h2> <ol class="muted" style="padding-left:1.2rem"> <li><a${addAttribute(DEPLOYMENTS, "href")} target="_blank" rel="noreferrer">Cloudflare の「Deployments」を開く</a>（開けない場合は <a${addAttribute(FALLBACK, "href")} target="_blank" rel="noreferrer">Workers &amp; Pages</a> → <code>baku-office</code> → Deployments）。</li> <li>「<strong>Create deployment</strong>」または直近の失敗を「<strong>Retry</strong>」を1回押す。</li> <li>数分で最新版に再ビルドされます（データ・設定は保持）。</li> </ol> </div> <div class="card"> <h2 style="margin-top:0;border:0">案①：次回から1タップにする（任意・一度きり）</h2> <p class="muted">一度だけ Cloudflare で「再ビルド用のフックURL」を作って貼り付けると、次回からはこの画面のボタン1つで更新できます（2〜3分）。</p> <ol class="muted" style="padding-left:1.2rem"> <li><a${addAttribute(SETTINGS, "href")} target="_blank" rel="noreferrer">自分の Worker 設定を開く</a>（開けない場合は <a${addAttribute(FALLBACK, "href")} target="_blank" rel="noreferrer">Workers &amp; Pages</a> → <code>baku-office</code> → Settings）。複数アカウント時は最初に選択。</li> <li>「設定 → ビルド(Builds) → Deploy Hooks」→「<strong>作成</strong>」。名前は任意、ブランチは <strong>本番(main)</strong>。</li> <li>生成された <strong>フックURL</strong>をコピーして下に貼り付け。</li> </ol> <div class="field"><input id="hookurl" placeholder="https://api.cloudflare.com/.../deploy_hooks/... または CF が表示したフックURL"></div> <button class="btn btn-primary" id="savehook">自動更新を有効にする</button> <p class="muted" style="font-size:.78rem;margin-top:.5rem">🔒 フックURLはこのアプリ内（あなたのCF）にのみ暗号化保存され、当社へは送信されません。</p> </div> ` })}`} `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template([`<script>
    const trig = document.getElementById("trigger");
    if (trig) trig.addEventListener("click", async (e) => {
      const r = await window.bo.api("/api/update", { _action: "trigger" }, { btn: e.currentTarget, successMsg: null });
      const box = document.getElementById("trigmsg");
      if (r.ok && r.data.ok) box.innerHTML = '<div class="banner banner-info">\u66F4\u65B0\u4E2D\u3067\u3059\u3002\u6570\u5206\u3067\u53CD\u6620\u3055\u308C\u307E\u3059\u3002\u53CD\u6620\u5F8C\u306B\u3053\u306E\u30DA\u30FC\u30B8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002</div>';
      else if (r.ok && r.data.needGuide) box.innerHTML = '<div class="banner banner-warn">\u81EA\u52D5\u66F4\u65B0\u304C\u672A\u8A2D\u5B9A\u3067\u3059\u3002\u30DA\u30FC\u30B8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u6848\u2461\u306E\u624B\u9806\u3092\u3054\u5229\u7528\u304F\u3060\u3055\u3044\u3002</div>';
      else window.bo.toast("\u66F4\u65B0\u306E\u767A\u706B\u306B\u5931\u6557\u3057\u307E\u3057\u305F\uFF1A" + ((r.data && r.data.error) || ""), "err");
    });
    const clr = document.getElementById("clearhook");
    if (clr) clr.addEventListener("click", async (e) => {
      if (!(await window.bo.confirm("\u81EA\u52D5\u66F4\u65B0\u306E\u8A2D\u5B9A\u3092\u89E3\u9664\u3057\u307E\u3059\u304B\uFF1F", { confirmLabel: "\u89E3\u9664", danger: true }))) return;
      const r = await window.bo.api("/api/update", { _action: "delete" }, { btn: e.currentTarget, successMsg: "\u89E3\u9664\u3057\u307E\u3057\u305F" });
      if (r.ok) setTimeout(() => location.reload(), 600);
    });
    const save = document.getElementById("savehook");
    if (save) save.addEventListener("click", async (e) => {
      const hookUrl = document.getElementById("hookurl").value.trim();
      if (!hookUrl) { window.bo.toast("\u30D5\u30C3\u30AFURL\u3092\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044", "err"); return; }
      const r = await window.bo.api("/api/update", { hookUrl }, { btn: e.currentTarget, successMsg: null });
      if (r.ok && r.data.ok) { window.bo.toast("\u2705 \u81EA\u52D5\u66F4\u65B0\u3092\u6709\u52B9\u306B\u3057\u307E\u3057\u305F"); setTimeout(() => location.reload(), 800); }
      else window.bo.toast((r.data && r.data.error) || "\u4FDD\u5B58\u306B\u5931\u6557\u3057\u307E\u3057\u305F", "err");
    });
  <\/script>`]))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/update.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/update.astro";
const $$url = "/settings/update";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Update,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
