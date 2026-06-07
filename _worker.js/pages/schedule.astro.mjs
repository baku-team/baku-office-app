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
const $$Schedule = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Schedule;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_ujH5pbJJ.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { results } = await env.DB.prepare("SELECT id,title,start_at FROM schedules WHERE deleted_at IS NULL ORDER BY start_at").all();
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u4E88\u5B9A", "active": "/schedule" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>予定</h1> <div class="card"> <div class="row"> <input id="title" placeholder="件名"> <input id="start" type="datetime-local"> <button class="btn btn-primary" id="add" style="flex:0 0 auto">追加</button> </div> </div> <div class="table-wrap" style="margin-top:1rem"><table><thead><tr><th>開始</th><th>件名</th><th></th></tr></thead><tbody> ${results.map((s) => renderTemplate`<tr${addAttribute(s.id, "data-id")}><td>${s.start_at.replace("T", " ")}</td><td>${s.title}</td><td><button class="btn btn-sm btn-danger del">削除</button></td></tr>`)} ${results.length === 0 && renderTemplate`<tr><td colspan="3" class="muted">予定がありません。</td></tr>`} </tbody></table></div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    const P=(b,btn)=>window.bo.api("/api/docs",{kind:"schedule",...b},{btn});\n    document.getElementById("add").addEventListener("click",async(e)=>{const t=document.getElementById("title").value,s=document.getElementById("start").value;if(!t||!s){window.bo.toast("\u4EF6\u540D\u3068\u958B\u59CB\u65E5\u6642\u3092\u5165\u529B","err");return;}const r=await P({title:t,start_at:s},e.currentTarget);if(r.ok)setTimeout(()=>location.reload(),500);});\n    document.querySelectorAll("tr[data-id] .del").forEach(b=>b.addEventListener("click",async(e)=>{const r=await P({_action:"delete",id:e.target.closest("tr").dataset.id},e.target);if(r.ok)setTimeout(()=>location.reload(),400);}));\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/schedule.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/schedule.astro";
const $$url = "/schedule";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Schedule,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
