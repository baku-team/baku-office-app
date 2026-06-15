globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { r as renderTemplate, a as addAttribute, u as unescapeHTML, c as renderHead } from "./sequence_CKjIrPcu.mjs";
import { s as sanitizeHtml } from "./sanitize_jH0WNw2O.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$SitePublic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SitePublic;
  const { site } = Astro2.props;
  const safeBody = sanitizeHtml(site.body ?? "");
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
  const CSP = `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`;
  return renderTemplate(_a || (_a = __template(['<html lang="ja" data-astro-cid-nplsblda> <head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy"', '><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>', "</title>", '</head> <body data-astro-cid-nplsblda> <main class="site" data-astro-cid-nplsblda> <article data-astro-cid-nplsblda>', "</article> ", " </main> <script", '>\n      const f = document.getElementById("joinForm");\n      if (f) f.addEventListener("submit", async (e) => {\n        e.preventDefault();\n        const name = document.getElementById("j-name").value.trim();\n        const msg = document.getElementById("joinMsg");\n        if (!name) { msg.textContent = "お名前を入力してください。"; msg.style.color = "#c0392b"; return; }\n        const btn = f.querySelector("button"); btn.disabled = true;\n        try {\n          const r = await fetch("/api/site/join", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, contact: document.getElementById("j-contact").value }) });\n          if (r.ok) { msg.style.color = "#1f7a4d"; msg.textContent = "お申し込みありがとうございます。確認のご連絡をお待ちください。"; f.reset(); }\n          else { msg.style.color = "#c0392b"; msg.textContent = "送信に失敗しました。時間をおいてお試しください。"; }\n        } catch { msg.style.color = "#c0392b"; msg.textContent = "通信に失敗しました。"; } finally { btn.disabled = false; }\n      });\n    <\/script> </body> </html>'])), addAttribute(CSP, "content"), site.title, renderHead(), unescapeHTML(safeBody), site.show_join === 1 && renderTemplate`<section class="join" data-astro-cid-nplsblda> <h2 data-astro-cid-nplsblda>会員申込</h2> <form id="joinForm" data-astro-cid-nplsblda> <input id="j-name" placeholder="お名前" required data-astro-cid-nplsblda> <input id="j-contact" placeholder="連絡先（電話/メール）" data-astro-cid-nplsblda> <button type="submit" data-astro-cid-nplsblda>申し込む</button> <div class="jmsg" id="joinMsg" role="status" aria-live="polite" data-astro-cid-nplsblda></div> </form> </section>`, addAttribute(nonce, "nonce"));
}, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/SitePublic.astro", void 0);
export {
  $$SitePublic as $
};
