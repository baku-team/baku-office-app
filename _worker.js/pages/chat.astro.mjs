globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, p as Fragment } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../chunks/App_BeztdKLb.mjs';
import '../chunks/crypto_BhRWVEcj.mjs';
import { a as atLeast } from '../chunks/types_sPQFPjY_.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Chat = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Chat;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_ujH5pbJJ.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { cachedEntitlement } = await import('../chunks/client_KUuDosgV.mjs');
  const hasPlus = atLeast(await cachedEntitlement(env), "plus");
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "AI\u30C1\u30E3\u30C3\u30C8", "active": "/chat", "data-astro-cid-wfrjesbw": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-wfrjesbw>AIチャット</h1> ${!hasPlus && renderTemplate`<div class="card" data-astro-cid-wfrjesbw> <div class="banner banner-warn" data-astro-cid-wfrjesbw>この機能は <strong data-astro-cid-wfrjesbw>Plus 以上</strong>のプランで利用できます。</div> <p class="muted" data-astro-cid-wfrjesbw>集計・DB／ファイル検索・文書作成を会話で実行し、結果を PDF／TXT／md／HTML／CSV でダウンロードできます。</p> <a class="btn btn-primary" href="/billing" data-astro-cid-wfrjesbw>プラン・課金へ</a> </div>`}${hasPlus && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <p class="muted" data-astro-cid-wfrjesbw>集計・DB／ファイル検索・文書作成を依頼できます（例：「6月の交通費を科目別に集計して」）。生成結果は各形式でダウンロードできます。</p> <div id="log" data-astro-cid-wfrjesbw></div> <div class="cinput" data-astro-cid-wfrjesbw> <textarea id="msg" placeholder="メッセージを入力（Ctrl/⌘+Enter で送信）" data-astro-cid-wfrjesbw></textarea> <button class="btn btn-primary" id="send" style="flex:0 0 auto" data-astro-cid-wfrjesbw>送信</button> </div>  `, "scripts": async ($$result3) => renderTemplate(_a || (_a = __template([`<script slot="scripts">
        const log = document.getElementById("log");
        const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
        function dload(text, ext, mime) {
          if (ext === "pdf") {
            const w = window.open("", "_blank");
            if (!w) { window.bo.toast("PDF\u5316\u306F\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u8A31\u53EF\u304C\u5FC5\u8981\u3067\u3059", "err"); return; }
            w.document.write('<title>baku-office</title><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;padding:24px">' + esc(text) + "</pre>");
            w.document.close(); w.focus(); w.print(); return;
          }
          let body = text;
          if (ext === "html") body = '<!doctype html><meta charset="utf-8"><title>baku-office</title><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">' + esc(text) + "</pre>";
          const blob = new Blob([body], { type: mime || "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "baku-office-" + Date.now() + "." + ext;
          document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        }
        function addMsg(role, text) {
          const d = document.createElement("div");
          d.className = "cmsg " + role;
          d.innerHTML = '<div class="cbub">' + esc(text).replace(/\\n/g, "<br>") + "</div>";
          if (role === "a") {
            const dl = document.createElement("div"); dl.className = "cdl"; dl.append("DL\uFF1A");
            [["txt", "text/plain"], ["md", "text/markdown"], ["html", "text/html"], ["csv", "text/csv"], ["pdf", ""]].forEach(([ext, mime]) => {
              const a = document.createElement("a"); a.href = "#"; a.textContent = ext.toUpperCase();
              a.addEventListener("click", (e) => { e.preventDefault(); dload(text, ext, mime); });
              dl.appendChild(a);
            });
            d.appendChild(dl);
          }
          log.appendChild(d); log.scrollTop = log.scrollHeight;
        }
        async function send() {
          const ta = document.getElementById("msg");
          const text = ta.value.trim(); if (!text) return;
          addMsg("u", text); ta.value = "";
          const r = await window.bo.api("/api/chat", { message: text }, { btn: document.getElementById("send"), successMsg: null });
          if (r.ok) addMsg("a", r.data.reply);
        }
        document.getElementById("send").addEventListener("click", send);
        document.getElementById("msg").addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); } });
      <\/script>`], [`<script slot="scripts">
        const log = document.getElementById("log");
        const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
        function dload(text, ext, mime) {
          if (ext === "pdf") {
            const w = window.open("", "_blank");
            if (!w) { window.bo.toast("PDF\u5316\u306F\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u8A31\u53EF\u304C\u5FC5\u8981\u3067\u3059", "err"); return; }
            w.document.write('<title>baku-office</title><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;padding:24px">' + esc(text) + "</pre>");
            w.document.close(); w.focus(); w.print(); return;
          }
          let body = text;
          if (ext === "html") body = '<!doctype html><meta charset="utf-8"><title>baku-office</title><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">' + esc(text) + "</pre>";
          const blob = new Blob([body], { type: mime || "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "baku-office-" + Date.now() + "." + ext;
          document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        }
        function addMsg(role, text) {
          const d = document.createElement("div");
          d.className = "cmsg " + role;
          d.innerHTML = '<div class="cbub">' + esc(text).replace(/\\\\n/g, "<br>") + "</div>";
          if (role === "a") {
            const dl = document.createElement("div"); dl.className = "cdl"; dl.append("DL\uFF1A");
            [["txt", "text/plain"], ["md", "text/markdown"], ["html", "text/html"], ["csv", "text/csv"], ["pdf", ""]].forEach(([ext, mime]) => {
              const a = document.createElement("a"); a.href = "#"; a.textContent = ext.toUpperCase();
              a.addEventListener("click", (e) => { e.preventDefault(); dload(text, ext, mime); });
              dl.appendChild(a);
            });
            d.appendChild(dl);
          }
          log.appendChild(d); log.scrollTop = log.scrollHeight;
        }
        async function send() {
          const ta = document.getElementById("msg");
          const text = ta.value.trim(); if (!text) return;
          addMsg("u", text); ta.value = "";
          const r = await window.bo.api("/api/chat", { message: text }, { btn: document.getElementById("send"), successMsg: null });
          if (r.ok) addMsg("a", r.data.reply);
        }
        document.getElementById("send").addEventListener("click", send);
        document.getElementById("msg").addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); } });
      <\/script>`]))) })}`}` })} `;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/chat.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/chat.astro";
const $$url = "/chat";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Chat,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
