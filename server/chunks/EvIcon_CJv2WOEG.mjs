globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_Dn7U0_eq.mjs";
import { r as renderTemplate, a as addAttribute, e as renderSlot, F as Fragment, b as renderHead, m as maybeRenderHead } from "./sequence_I_kcixDX.mjs";
import { r as renderComponent } from "./worker-entry_ChtgHeKY.mjs";
import { env } from "cloudflare:workers";
import { getTheme, brandName } from "./theme_DFty9gzU.mjs";
import { getSession } from "./auth_DnK_0-1l.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$EventPublic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EventPublic;
  const { title, desc, brand: brandProp, accent: accentProp, mode: modeProp, eventsHref = "/events", eventsLabel = "イベント" } = Astro2.props;
  const theme = await getTheme(Astro2.locals.ctx).catch(() => ({}));
  const ses = await getSession(env, Astro2.request).catch(() => null);
  const brand = brandProp && brandProp.trim() || brandName(theme);
  const logoUrl = theme.logoUrl;
  const mode = modeProp ?? (theme.appearance === "dark" ? "dark" : "light");
  const SAFE_COLOR = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$|^(?:rgb|rgba|hsl|hsla)\([0-9.,%\s]+\)$/;
  const accentRaw = accentProp && accentProp.trim() || theme.colors?.brand || (mode === "dark" ? "#c79a5a" : "#9a6a34");
  const accent = SAFE_COLOR.test(accentRaw) ? accentRaw : mode === "dark" ? "#c79a5a" : "#9a6a34";
  const year = 2026;
  const nonce = Astro2.locals.cspNonce;
  const CSP = `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'`;
  return renderTemplate(_a || (_a = __template(['<html lang="ja"', "", '> <head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy"', '><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="color-scheme"', ">", "<title>", "</title>", "", '</head> <body> <header class="topbar"> <div class="topbar-in"> <a class="brand"', ">", '</a> <nav class="topnav"> <a', ">", "</a> ", " </nav> </div> </header> ", ' <main class="pagewrap"> ', ' </main> <footer class="footer"> <div class="footer-in"> <span class="fb">', '</span> <span class="fc">© ', " ", "</span> </div> </footer> ", " <script", '>\n      (function () {\n        const ov = document.getElementById("ev-login-ov");\n        const openBtn = document.getElementById("ev-login-open");\n        const closeBtn = document.getElementById("ev-login-close");\n        const logoutBtn = document.getElementById("ev-logout");\n        if (logoutBtn) logoutBtn.addEventListener("click", async () => {\n          try { await fetch("/api/login", { method: "DELETE" }); } catch (e) {}\n          location.reload();\n        });\n        if (ov && openBtn) {\n          const open = () => { ov.hidden = false; const i = document.getElementById("lg-id"); if (i) i.focus(); };\n          const close = () => { ov.hidden = true; };\n          openBtn.addEventListener("click", open);\n          closeBtn && closeBtn.addEventListener("click", close);\n          ov.addEventListener("mousedown", (e) => { if (e.target === ov) close(); });\n          document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !ov.hidden) close(); });\n          const go = document.getElementById("lg-go");\n          const msg = document.getElementById("lg-msg");\n          go.addEventListener("click", async () => {\n            const loginId = document.getElementById("lg-id").value.trim();\n            const password = document.getElementById("lg-pass").value;\n            if (!loginId || !password) { msg.textContent = "IDとパスワードを入力してください。"; msg.classList.add("err"); return; }\n            go.disabled = true; msg.classList.remove("err"); msg.textContent = "ログインしています…";\n            try {\n              const r = await fetch("/api/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mode: "local", loginId, password }) });\n              const j = await r.json().catch(() => ({}));\n              if (!r.ok || j.error) { msg.classList.add("err"); msg.textContent = j.error || "ログインに失敗しました。"; go.disabled = false; return; }\n              location.href = "/my-events";\n            } catch (e) { msg.classList.add("err"); msg.textContent = "通信に失敗しました。"; go.disabled = false; }\n          });\n        }\n      })();\n    <\/script> </body> </html>'])), addAttribute(mode, "data-mode"), addAttribute(`--accent:${accent}`, "style"), addAttribute(CSP, "content"), addAttribute(mode === "dark" ? "dark" : "light", "content"), desc && renderTemplate`<meta name="description"${addAttribute(desc, "content")}>`, title, renderSlot($$result, $$slots["head"]), renderHead(), addAttribute(eventsHref, "href"), logoUrl ? renderTemplate`<img${addAttribute(logoUrl, "src")}${addAttribute(brand, "alt")}>` : brand, addAttribute(eventsHref, "href"), eventsLabel, ses ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`<a href="/my-events">マイページ</a><button type="button" class="topbtn" id="ev-logout">ログアウト</button>` })}` : renderTemplate`<button type="button" class="topbtn" id="ev-login-open">会員ログイン</button>`, !ses && renderTemplate`<div class="ev-modal-ov" id="ev-login-ov" hidden> <div class="ev-modal card pad" role="dialog" aria-modal="true" aria-labelledby="ev-login-t"> <h2 id="ev-login-t" style="font-size:1.3rem;margin:0 0 4px">会員ログイン</h2> <p class="muted" style="font-size:.86rem;margin:0 0 14px">イベントにお申し込み済みの方は、登録したIDでログインできます。</p> <div class="field"><label>ログインID</label><input class="input" id="lg-id" autocomplete="username"></div> <div class="field"><label>パスワード</label><input class="input" id="lg-pass" type="password" autocomplete="current-password"></div> <button class="btn btn-primary" id="lg-go" style="width:100%">ログイン</button> <div class="formmsg" id="lg-msg" role="status" aria-live="polite"></div> <button type="button" class="ev-modal-x" id="ev-login-close" aria-label="閉じる">閉じる</button> </div> </div>`, renderSlot($$result, $$slots["default"]), brand, year, brand, renderSlot($$result, $$slots["scripts"]), addAttribute(nonce, "nonce"));
}, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/EventPublic.astro", void 0);
const $$EvIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EvIcon;
  const { name, size = 18, class: cls = "" } = Astro2.props;
  const PATHS = {
    pin: "M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 18.5 10.8C18.5 15.6 12 21 12 21z M12 8.2a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2z",
    users: "M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19 M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4 M15.5 5.2a3 3 0 0 1 0 5.8",
    calendar: "M7 4v3 M17 4v3 M4.5 9.5h15 M5 6.5h14a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1z",
    clock: "M12 7v5l3 2 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
    lock: "M7 11V8a5 5 0 0 1 10 0v3 M5.5 11h13a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z",
    check: "M5 12.5l4.5 4.5L19 7.5",
    arrow: "M5 12h14 M13 6l6 6-6 6",
    mail: "M4 6.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z M3.5 7.5l8.5 6 8.5-6",
    spark: "M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z"
  };
  const d = PATHS[name] ?? "";
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(cls, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="flex:0 0 auto;vertical-align:middle"> ${d.split(" M").map((seg, i) => renderTemplate`<path${addAttribute(i === 0 ? seg : "M" + seg, "d")}></path>`)} </svg>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/EvIcon.astro", void 0);
export {
  $$EvIcon as $,
  $$EventPublic as a
};
