globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BajPpY5_.mjs";
import { r as renderTemplate, u as unescapeHTML, a as addAttribute, c as renderHead } from "./sequence_2tuU57vh.mjs";
import { env } from "cloudflare:workers";
import { getPublicPage, getPublicPageAny } from "./public-pages_nVpmJrxF.mjs";
import { b as buildFrameSrcdoc, P as PUBLIC_BRIDGE_SDK, a as FRAME_ALLOW, F as FRAME_SANDBOX } from "./app-frame_BhMbGzCJ.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const slug = Astro2.params.slug ?? "";
  let page2 = await getPublicPage(env, slug);
  let preview = false;
  if (!page2 && Astro2.url.searchParams.get("preview") === "1") {
    const { getSession, canDevelopApps } = await import("./auth_DQFw2eZX.mjs");
    const ses = await getSession(env, Astro2.request);
    if (ses && canDevelopApps(ses.role, ses.ctx)) {
      page2 = await getPublicPageAny(env, slug);
      preview = !!page2;
    }
  }
  if (!page2) {
    return new Response("ページが見つかりません", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  const frameDoc = buildFrameSrcdoc(page2.html, PUBLIC_BRIDGE_SDK, Object.fromEntries(Astro2.url.searchParams));
  return renderTemplate(_a || (_a = __template(['<html lang="ja" data-astro-cid-f3iwrppf> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots"', "><title>", "</title>", "</head> <body data-astro-cid-f3iwrppf> ", ' <div class="bo-public" data-astro-cid-f3iwrppf> <iframe id="bo-frame"', "", "", "", ' height="600" data-astro-cid-f3iwrppf></iframe> </div> <footer data-astro-cid-f3iwrppf>Powered by baku-office</footer> <script type="application/json" id="bo-slug">', '<\/script> <script data-astro-rerun>\n      (function () {\n        var slug = JSON.parse(document.getElementById("bo-slug").textContent);\n        var frame = document.getElementById("bo-frame");\n        function reply(ok, message, error) {\n          try { frame.contentWindow.postMessage({ __bo: 1, type: "submitResult", ok: ok, message: message, error: error }, "*"); } catch (_) {}\n        }\n        window.addEventListener("message", async function (e) {\n          if (e.source !== frame.contentWindow) return;\n          var m = e.data; if (!m || m.__bo !== 1) return;\n          if (m.type === "resize" && m.height) { frame.style.height = Math.max(200, m.height + 24) + "px"; return; }\n          if (m.type === "submit") {\n            try {\n              var fd = new FormData();\n              fd.append("values", JSON.stringify(m.values || {}));\n              var files = m.files || [];\n              for (var i = 0; i < files.length; i++) { if (files[i] && files[i].file) fd.append("file", files[i].file, (files[i].file.name || "file")); }\n              var r = await fetch("/api/p/" + encodeURIComponent(slug), { method: "POST", body: fd });\n              var j = await r.json().catch(function () { return {}; });\n              if (r.ok && j.ok && j.checkoutUrl) { window.top.location.href = j.checkoutUrl; return; } // 有料：Stripe決済へ遷移\n              if (r.ok && j.ok) reply(true, j.message); else reply(false, null, j.error || "送信に失敗しました。");\n            } catch (err) { reply(false, null, "通信に失敗しました。時間をおいて再度お試しください。"); }\n          }\n        });\n      })();\n    <\/script> </body> </html>'])), addAttribute(preview ? "noindex,nofollow" : "index,follow", "content"), preview ? `【プレビュー】${page2.title}` : page2.title, renderHead(), preview && renderTemplate`<div style="max-width:720px;margin:8px auto 0;padding:10px 14px;border:1px solid #C9A86A;background:#F4EDDD;color:#946F2C;border-radius:12px;font:13px system-ui,-apple-system,sans-serif" data-astro-cid-f3iwrppf>
🔒 これは<strong data-astro-cid-f3iwrppf>内部プレビュー（非公開）</strong>です。外部の人には表示されません。問題なければ「設定 → 公開ページ」または アプリ画面の「🌐 顧客向け公開URL」から<strong data-astro-cid-f3iwrppf>公開</strong>してください。
</div>`, addAttribute(page2.title, "title"), addAttribute(FRAME_SANDBOX, "sandbox"), addAttribute(FRAME_ALLOW, "allow"), addAttribute(frameDoc, "srcdoc"), unescapeHTML(JSON.stringify(slug)));
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/p/[slug].astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/p/[slug].astro";
const $$url = "/p/[slug]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
