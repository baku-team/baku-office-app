globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../chunks/App_BeztdKLb.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_ujH5pbJJ.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { listFiles, storageMode } = await import('../chunks/storage_Zv-sLn8E.mjs');
  const files = await listFiles(env);
  const mode = storageMode(env);
  const kb = (n) => n < 1024 ? n + " B" : (n / 1024).toFixed(1) + " KB";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u30D5\u30A1\u30A4\u30EB", "active": "/files" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>ファイル</h1> <p class="muted">ストレージ：<strong>${mode === "r2" ? "\u9AD8\u5EA6\uFF08R2\uFF09" : "\u6A19\u6E96\uFF08KV\u30FB\u30AB\u30FC\u30C9\u4E0D\u8981\uFF09"}</strong>（§11）</p> <div class="card"> <div class="row"> <input type="file" id="file"> <button class="btn btn-primary" id="up" style="flex:0 0 auto">アップロード</button> </div> </div> <div class="table-wrap" style="margin-top:1rem"> <table> <thead><tr><th>名前</th><th>サイズ</th><th>種類</th><th>操作</th></tr></thead> <tbody> ${files.map((f) => renderTemplate`<tr${addAttribute(f.id, "data-id")}> <td>${f.name}</td><td>${kb(f.size)}</td><td>${f.mime ?? ""}</td> <td><a class="btn btn-sm"${addAttribute(`/files/${f.id}`, "href")}>DL</a> <button class="btn btn-sm btn-danger del">削除</button></td> </tr>`)} ${files.length === 0 && renderTemplate`<tr><td colspan="4" class="muted">ファイルがありません。</td></tr>`} </tbody> </table> </div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    document.getElementById("up").addEventListener("click", async (e) => {\n      const f = document.getElementById("file").files[0];\n      if (!f) { window.bo.toast("\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044", "err"); return; }\n      const btn = e.currentTarget; window.bo.busy(btn, true);\n      try {\n        const fd = new FormData(); fd.append("file", f);\n        const r = await fetch("/api/files", { method: "POST", body: fd });\n        const j = await r.json().catch(() => ({}));\n        if (!r.ok || j.error) { window.bo.toast("\u5931\u6557\uFF1A" + (j.error || r.status), "err"); }\n        else { window.bo.toast("\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F\uFF08" + j.mode + "\uFF09"); setTimeout(() => location.reload(), 700); }\n      } finally { window.bo.busy(btn, false); }\n    });\n    document.querySelectorAll("tr[data-id] .del").forEach((b) => b.addEventListener("click", async (e) => {\n      if (!confirm("\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\u3057\u307E\u3059\u304B\uFF1F")) return;\n      const r = await window.bo.api("/api/files", { _action: "delete", id: e.target.closest("tr").dataset.id }, { btn: e.target, successMsg: "\u30B4\u30DF\u7BB1\u3078\u79FB\u52D5\u3057\u307E\u3057\u305F" });\n      if (r.ok) setTimeout(() => location.reload(), 600);\n    }));\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/files/index.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/files/index.astro";
const $$url = "/files";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
