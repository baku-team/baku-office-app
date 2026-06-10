globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, b as addAttribute, F as Fragment } from '../../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../../chunks/App_BsKkCq3o.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Members = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Members;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return Astro2.redirect("/login", 302);
  const { listUsers } = await import('../../chunks/users_D80O6cuB.mjs');
  const users = await listUsers(env);
  const roles = ["admin", "accounting", "clerical", "other", "member"];
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u4EBA\u30FB\u30ED\u30FC\u30EB\u7BA1\u7406", "active": "/settings/members" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>人・ロール管理</h1> <div class="card"> <div class="row"> <select id="inviteRole">${roles.map((r) => renderTemplate`<option${addAttribute(r, "value")}>${r}</option>`)}</select> <button class="btn btn-primary" id="inviteBtn" style="flex:0 0 auto">招待コードを発行</button> </div> <p class="muted" id="inviteOut"></p> </div> <div class="table-wrap" style="margin-top:1rem"><table><thead><tr><th>氏名・役職</th><th>ロール</th><th>状態</th><th>操作</th></tr></thead><tbody> ${users.map((u) => renderTemplate`<tr${addAttribute(u.id, "data-id")}> <td>${u.name || "(\u672A\u8A2D\u5B9A)"}</td> <td><select class="role btn-sm"${addAttribute(u.id === "org", "disabled")}>${roles.map((r) => renderTemplate`<option${addAttribute(r, "value")}${addAttribute(r === u.role, "selected")}>${r}</option>`)}</select></td> <td>${u.status}</td> <td> ${u.status === "pending" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`<button class="btn btn-sm btn-ok act" data-a="approve">承認</button> <button class="btn btn-sm btn-danger act" data-a="reject">却下</button>` })}`} ${u.status === "active" && renderTemplate`<button class="btn btn-sm btn-danger act" data-a="reject">無効化</button>`} </td></tr>`)} ${users.length === 0 && renderTemplate`<tr><td colspan="4" class="muted">メンバーがいません。招待コードを発行してください。</td></tr>`} </tbody></table></div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    document.getElementById("inviteBtn").addEventListener("click",async(e)=>{\n      const r=await window.bo.api("/api/members",{_action:"invite",role:document.getElementById("inviteRole").value},{btn:e.currentTarget,successMsg:null});\n      if(r.ok){const code=r.data.code,url=location.origin+"/join?code="+encodeURIComponent(code);const out=document.getElementById("inviteOut");out.replaceChildren();out.append("\u30B3\u30FC\u30C9\uFF1A");const c=document.createElement("code");c.textContent=code;const m=document.createElement("span");m.className="muted";m.textContent="\uFF081\u9031\u9593\u30FB1\u56DE\uFF09";const cp=document.createElement("button");cp.className="btn btn-sm";cp.type="button";cp.textContent="\u53C2\u52A0URL\u3092\u30B3\u30D4\u30FC";out.append(c," ",m," ",cp);cp.addEventListener("click",()=>navigator.clipboard.writeText(url).then(()=>window.bo.toast("\u53C2\u52A0URL\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")).catch(()=>window.bo.toast("\u30B3\u30D4\u30FC\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F","err")));window.bo.toast("\u62DB\u5F85\u30B3\u30FC\u30C9\u3092\u767A\u884C\u3057\u307E\u3057\u305F");}\n    });\n    document.querySelectorAll("tr[data-id]").forEach(tr=>{const id=tr.dataset.id;\n      tr.querySelectorAll(".act").forEach(b=>b.addEventListener("click",async(e)=>{const r=await window.bo.api("/api/members",{_action:e.target.dataset.a,id},{btn:e.target,successMsg:"\u66F4\u65B0\u3057\u307E\u3057\u305F"});if(r.ok)setTimeout(()=>location.reload(),500);}));\n      const sel=tr.querySelector(".role");if(sel&&!sel.disabled)sel.addEventListener("change",async()=>{await window.bo.api("/api/members",{_action:"role",id,role:sel.value},{successMsg:"\u30ED\u30FC\u30EB\u3092\u5909\u66F4\u3057\u307E\u3057\u305F"});});\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/members.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/members.astro";
const $$url = "/settings/members";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Members,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
