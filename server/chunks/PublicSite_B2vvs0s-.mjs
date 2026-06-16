globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { r as renderTemplate, a as addAttribute, F as Fragment, m as maybeRenderHead, u as unescapeHTML } from "./sequence_CKjIrPcu.mjs";
import { r as renderComponent } from "./worker-entry_Dmq6Pkc7.mjs";
import { $ as $$EventPublic } from "./EventPublic_8nYdBwkO.mjs";
import { s as sanitizeHtml } from "./sanitize_jH0WNw2O.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$PublicSite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PublicSite;
  const { site } = Astro2.props;
  const safeBody = sanitizeHtml(site.body ?? "");
  return renderTemplate`${renderComponent($$result, "EventPublic", $$EventPublic, { "title": site.title, "eventsHref": "/events", "eventsLabel": "イベント" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero"> <div class="wrap"> <h1 class="display">${site.title}</h1> </div> </section> <section class="wrap section"> <div class="lp-rich">${unescapeHTML(safeBody)}</div> ${site.show_join === 1 && renderTemplate`<div class="card pad join" style="max-width:520px;margin-top:48px"> <h2 style="margin:0 0 4px;font-size:1.3rem">会員のお申し込み</h2> <p class="muted" style="font-size:.88rem;margin:0 0 14px">お名前と連絡先をご記入ください。担当者よりご連絡します。</p> <form id="joinForm"> <div class="field"><label>お名前</label><input class="input" id="j-name" autocomplete="name"></div> <div class="field"><label>連絡先（メール / 電話）</label><input class="input" id="j-contact" autocomplete="email"></div> <button class="btn btn-primary" type="submit" style="width:100%">申し込む</button> <div class="formmsg" id="joinMsg" role="status" aria-live="polite"></div> </form> </div>`} </section>   `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" })}`, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(["<script", '>\n    (function () {\n      const f = document.getElementById("joinForm");\n      if (!f) return;\n      const msg = document.getElementById("joinMsg");\n      f.addEventListener("submit", async (e) => {\n        e.preventDefault();\n        const name = document.getElementById("j-name").value.trim();\n        if (!name) { msg.textContent = "お名前を入力してください。"; msg.classList.add("err"); return; }\n        const btn = f.querySelector("button"); btn.disabled = true; msg.classList.remove("err"); msg.textContent = "送信しています…";\n        try {\n          const r = await fetch("/api/site/join", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, contact: document.getElementById("j-contact").value }) });\n          if (r.ok) { msg.classList.remove("err"); msg.textContent = "お申し込みありがとうございます。確認のご連絡をお待ちください。"; f.reset(); }\n          else { msg.classList.add("err"); msg.textContent = "送信に失敗しました。時間をおいてお試しください。"; }\n        } catch (err) { msg.classList.add("err"); msg.textContent = "通信に失敗しました。"; }\n        finally { btn.disabled = false; }\n      });\n    })();\n  <\/script>'])), addAttribute(Astro2.locals.cspNonce, "nonce")) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/PublicSite.astro", void 0);
export {
  $$PublicSite as $
};
