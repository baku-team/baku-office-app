globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, r as renderTemplate, u as unescapeHTML, l as renderHead, h as createAstro } from './astro/server_CfYoLHqm.mjs';
/* empty css                          */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$SitePublic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SitePublic;
  const { site } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="ja" data-astro-cid-nplsblda> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>', "</title>", '</head> <body data-astro-cid-nplsblda> <main class="site" data-astro-cid-nplsblda> <article data-astro-cid-nplsblda>', "</article> ", ' </main> <script>\n      const f = document.getElementById("joinForm");\n      if (f) f.addEventListener("submit", async (e) => {\n        e.preventDefault();\n        const name = document.getElementById("j-name").value.trim();\n        const msg = document.getElementById("joinMsg");\n        if (!name) { msg.textContent = "\u304A\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"; msg.style.color = "#c0392b"; return; }\n        const btn = f.querySelector("button"); btn.disabled = true;\n        try {\n          const r = await fetch("/api/site/join", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, contact: document.getElementById("j-contact").value }) });\n          if (r.ok) { msg.style.color = "#1f7a4d"; msg.textContent = "\u304A\u7533\u3057\u8FBC\u307F\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002\u78BA\u8A8D\u306E\u3054\u9023\u7D61\u3092\u304A\u5F85\u3061\u304F\u3060\u3055\u3044\u3002"; f.reset(); }\n          else { msg.style.color = "#c0392b"; msg.textContent = "\u9001\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u6642\u9593\u3092\u304A\u3044\u3066\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002"; }\n        } catch { msg.style.color = "#c0392b"; msg.textContent = "\u901A\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002"; } finally { btn.disabled = false; }\n      });\n    <\/script> </body> </html>'])), site.title, renderHead(), unescapeHTML(site.body ?? ""), site.show_join === 1 && renderTemplate`<section class="join" data-astro-cid-nplsblda> <h2 data-astro-cid-nplsblda>会員申込</h2> <form id="joinForm" data-astro-cid-nplsblda> <input id="j-name" placeholder="お名前" required data-astro-cid-nplsblda> <input id="j-contact" placeholder="連絡先（電話/メール）" data-astro-cid-nplsblda> <button type="submit" data-astro-cid-nplsblda>申し込む</button> <div class="jmsg" id="joinMsg" data-astro-cid-nplsblda></div> </form> </section>`);
}, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/SitePublic.astro", void 0);

export { $$SitePublic as $ };
