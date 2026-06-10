globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, b as addAttribute, a as renderHead, g as createAstro } from '../../chunks/astro/server_DRI6mTND.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Data = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Data;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return Astro2.redirect("/login", 302);
  const trashTx = (await env.DB.prepare("SELECT id,date,amount,description FROM transactions WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC LIMIT 100").all()).results;
  const trashFiles = (await env.DB.prepare("SELECT id,name,size FROM files WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC LIMIT 100").all()).results;
  const audit = (await env.DB.prepare("SELECT actor,action,target,timestamp FROM audit_log ORDER BY timestamp DESC LIMIT 50").all()).results;
  const t = (s) => new Date(s * 1e3).toISOString().slice(0, 16).replace("T", " ");
  return renderTemplate(_a || (_a = __template(['<html lang="ja" data-astro-cid-jgkmvpmt><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>\u76F4\u63A5DB\u64CD\u4F5C \u2014 baku-office</title>', '</head> <body data-astro-cid-jgkmvpmt> <header data-astro-cid-jgkmvpmt><a href="/" data-astro-cid-jgkmvpmt>\u30DB\u30FC\u30E0</a><a href="/settings/members" data-astro-cid-jgkmvpmt>\u4EBA\u30FB\u30ED\u30FC\u30EB\u7BA1\u7406</a><a href="/admin/data" data-astro-cid-jgkmvpmt>\u76F4\u63A5DB\u64CD\u4F5C</a></header> <main data-astro-cid-jgkmvpmt> <h1 data-astro-cid-jgkmvpmt>\u76F4\u63A5DB\uFF0F\u30B9\u30C8\u30EC\u30FC\u30B8\u64CD\u4F5C\uFF08\u81EA\u5DF1\u8CAC\u4EFB\u30FB\xA712\uFF09</h1> <p class="muted" data-astro-cid-jgkmvpmt>\u524A\u9664\u306F\u4E00\u65E6\u30B4\u30DF\u7BB1\uFF0830\u65E5\u4FDD\u6301\u76EE\u5B89\uFF09\u3002\u5FA9\u5143\u30FB\u5B8C\u5168\u524A\u9664\u304C\u53EF\u80FD\u3002\u3059\u3079\u3066\u76E3\u67FB\u30ED\u30B0\u306B\u8A18\u9332\u3055\u308C\u307E\u3059\u3002</p> <h2 data-astro-cid-jgkmvpmt>\u30B4\u30DF\u7BB1\uFF1A\u53D6\u5F15</h2> <table data-astro-cid-jgkmvpmt><thead data-astro-cid-jgkmvpmt><tr data-astro-cid-jgkmvpmt><th data-astro-cid-jgkmvpmt>\u65E5\u4ED8</th><th data-astro-cid-jgkmvpmt>\u91D1\u984D</th><th data-astro-cid-jgkmvpmt>\u6458\u8981</th><th data-astro-cid-jgkmvpmt>\u64CD\u4F5C</th></tr></thead><tbody data-astro-cid-jgkmvpmt> ', " ", " </tbody></table> <h2 data-astro-cid-jgkmvpmt>\u30B4\u30DF\u7BB1\uFF1A\u30D5\u30A1\u30A4\u30EB</h2> <table data-astro-cid-jgkmvpmt><thead data-astro-cid-jgkmvpmt><tr data-astro-cid-jgkmvpmt><th data-astro-cid-jgkmvpmt>\u540D\u524D</th><th data-astro-cid-jgkmvpmt>\u30B5\u30A4\u30BA</th><th data-astro-cid-jgkmvpmt>\u64CD\u4F5C</th></tr></thead><tbody data-astro-cid-jgkmvpmt> ", " ", " </tbody></table> <h2 data-astro-cid-jgkmvpmt>\u64CD\u4F5C\u76E3\u67FB\u30ED\u30B0</h2> <table data-astro-cid-jgkmvpmt><thead data-astro-cid-jgkmvpmt><tr data-astro-cid-jgkmvpmt><th data-astro-cid-jgkmvpmt>\u65E5\u6642</th><th data-astro-cid-jgkmvpmt>\u5B9F\u884C\u8005</th><th data-astro-cid-jgkmvpmt>\u64CD\u4F5C</th><th data-astro-cid-jgkmvpmt>\u5BFE\u8C61</th></tr></thead><tbody data-astro-cid-jgkmvpmt> ", " ", ' </tbody></table> <script type="module">\n  const post=(b)=>fetch("/api/data",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(b)}).then(r=>r.json());\n  document.querySelectorAll("tr[data-id]").forEach(tr=>{\n    const table=tr.dataset.t,id=tr.dataset.id;\n    tr.querySelector(".restore").onclick=async()=>{await post({_action:"restore",table,id});location.reload();};\n    tr.querySelector(".purge").onclick=async()=>{if(confirm("\u3053\u306E\u30EC\u30B3\u30FC\u30C9\u3092\u5B8C\u5168\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002")){await post({_action:"purge",table,id});location.reload();}};\n  });\n<\/script> </main></body></html>'])), renderHead(), trashTx.map((r) => renderTemplate`<tr data-t="transactions"${addAttribute(r.id, "data-id")} data-astro-cid-jgkmvpmt><td data-astro-cid-jgkmvpmt>${r.date}</td><td data-astro-cid-jgkmvpmt>¥${r.amount.toLocaleString("ja-JP")}</td><td data-astro-cid-jgkmvpmt>${r.description ?? ""}</td><td data-astro-cid-jgkmvpmt><button class="restore" style="background:#16a34a;color:#fff" data-astro-cid-jgkmvpmt>復元</button> <button class="purge" style="background:#ef4444;color:#fff" data-astro-cid-jgkmvpmt>完全削除</button></td></tr>`), trashTx.length === 0 && renderTemplate`<tr data-astro-cid-jgkmvpmt><td colspan="4" class="muted" data-astro-cid-jgkmvpmt>空</td></tr>`, trashFiles.map((r) => renderTemplate`<tr data-t="files"${addAttribute(r.id, "data-id")} data-astro-cid-jgkmvpmt><td data-astro-cid-jgkmvpmt>${r.name}</td><td data-astro-cid-jgkmvpmt>${r.size}B</td><td data-astro-cid-jgkmvpmt><button class="restore" style="background:#16a34a;color:#fff" data-astro-cid-jgkmvpmt>復元</button> <button class="purge" style="background:#ef4444;color:#fff" data-astro-cid-jgkmvpmt>完全削除</button></td></tr>`), trashFiles.length === 0 && renderTemplate`<tr data-astro-cid-jgkmvpmt><td colspan="3" class="muted" data-astro-cid-jgkmvpmt>空</td></tr>`, audit.map((a) => renderTemplate`<tr data-astro-cid-jgkmvpmt><td data-astro-cid-jgkmvpmt>${t(a.timestamp)}</td><td data-astro-cid-jgkmvpmt>${a.actor}</td><td data-astro-cid-jgkmvpmt>${a.action}</td><td data-astro-cid-jgkmvpmt>${a.target}</td></tr>`), audit.length === 0 && renderTemplate`<tr data-astro-cid-jgkmvpmt><td colspan="4" class="muted" data-astro-cid-jgkmvpmt>記録なし</td></tr>`);
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/admin/data.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/admin/data.astro";
const $$url = "/admin/data";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Data,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
