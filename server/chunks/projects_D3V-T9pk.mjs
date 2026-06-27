globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BajPpY5_.mjs";
import { r as renderTemplate, a as addAttribute, m as maybeRenderHead } from "./sequence_2tuU57vh.mjs";
import { r as renderComponent } from "./worker-entry_OwoDOlMY.mjs";
import { env } from "cloudflare:workers";
import { $ as $$App } from "./App_a2iazK4K.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Projects;
  const { getSession, canDevelopApps } = await import("./auth_FnSEomav.mjs");
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const isAdminOrg = canDevelopApps(ses.role, ses.ctx);
  if (!isAdminOrg) return Astro2.redirect("/forbidden", 302);
  const { listProjects, projectAppCounts } = await import("./projects_Pkf2NCAu.mjs");
  const [projects, counts] = await Promise.all([listProjects(env), projectAppCounts(env)]);
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "プロジェクト", "active": "/projects" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="spread" style="flex-wrap:wrap;gap:12px;margin-bottom:14px"> <div> <h1 style="margin:0">プロジェクト</h1> <p class="muted" style="margin:.2rem 0 0">事業・イベント単位でアプリと公開ページ（LP）をまとめ、横断で集計・管理します。</p> </div> <button class="btn btn-primary" id="pj-new-btn" type="button" aria-expanded="false">＋ 新しいプロジェクト</button> </div> <div class="card" id="pj-new" hidden style="margin-bottom:14px"> <div class="field"><label>プロジェクト名</label><input id="pj-name" type="text" placeholder="例：baku-office"></div> <div class="field"><label>説明（任意）</label><input id="pj-desc" type="text" placeholder="例：各種申込フォームの横断管理"></div> <button class="btn btn-primary" id="pj-create" type="button">作成する</button> </div> ', '<div class="launch-grid"> ', ' </div> <script>\n    document.addEventListener("astro:page-load", function () {\n      var newBtn = document.getElementById("pj-new-btn");\n      var panel = document.getElementById("pj-new");\n      if (!newBtn || newBtn.dataset.bound) return;\n      newBtn.dataset.bound = "1";\n      newBtn.addEventListener("click", function () {\n        var hidden = panel.hasAttribute("hidden");\n        if (hidden) panel.removeAttribute("hidden"); else panel.setAttribute("hidden", "");\n        newBtn.setAttribute("aria-expanded", hidden ? "true" : "false");\n      });\n      document.getElementById("pj-create").addEventListener("click", async function (e) {\n        var name = (document.getElementById("pj-name").value || "").trim();\n        var description = (document.getElementById("pj-desc").value || "").trim();\n        if (!name) { window.bo && window.bo.toast && window.bo.toast("プロジェクト名を入力してください"); return; }\n        var r = await window.bo.api("/api/projects", { action: "create", name: name, description: description }, { btn: e.currentTarget, successMsg: "プロジェクトを作成しました" });\n        if (r && r.ok && r.data && r.data.project) location.href = "/project/" + r.data.project.id;\n        else location.reload();\n      });\n    });\n  <\/script> '])), maybeRenderHead(), projects.length === 0 && renderTemplate`<p class="muted" id="pj-empty">まだプロジェクトはありません。「＋ 新しいプロジェクト」から作成してください。</p>`, projects.map((p) => renderTemplate`<a class="launch-card"${addAttribute(`/project/${p.id}`, "href")} data-astro-reload${addAttribute(`--lc-h:${p.color ? 0 : p.name.charCodeAt(0) * 7 % 360}`, "style")}> <span class="lc-icon" aria-hidden="true">${p.icon || "📁"}</span> <span class="lc-label">${p.name}</span> <span class="lc-app">${(counts[p.id] ?? 0) + " アプリ"}</span> </a>`)) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/projects.astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/projects.astro";
const $$url = "/projects";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
