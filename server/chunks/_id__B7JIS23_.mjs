globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BajPpY5_.mjs";
import { r as renderTemplate, d as defineScriptVars, a as addAttribute, m as maybeRenderHead } from "./sequence_2tuU57vh.mjs";
import { r as renderComponent } from "./worker-entry_OwoDOlMY.mjs";
import { env } from "cloudflare:workers";
import { $ as $$App } from "./App_a2iazK4K.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { getSession, canDevelopApps } = await import("./auth_FnSEomav.mjs");
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const isAdminOrg = canDevelopApps(ses.role, ses.ctx);
  if (!isAdminOrg) return Astro2.redirect("/forbidden", 302);
  const id = Astro2.params.id ?? "";
  const { getProject, projectApps } = await import("./projects_Pkf2NCAu.mjs");
  const project = await getProject(env, id);
  if (!project) return Astro2.redirect("/projects", 302);
  const apps = await projectApps(env, id);
  const totalRecords = apps.reduce((s, a) => s + a.records, 0);
  const { results: allRows } = await env.DB.prepare(
    "SELECT id,name,project_id FROM external_apps ORDER BY name"
  ).all();
  const addable = (allRows ?? []).filter((a) => a.project_id !== id);
  const pubLabel = (v) => v == null ? "公開ページなし" : v ? "公開中" : "下書き";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": project.name, "active": "/projects" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<p style="margin:0 0 .2rem"><a class="muted" href="/projects" data-astro-reload>← プロジェクト一覧</a></p> <div class="spread" style="flex-wrap:wrap;gap:12px;margin-bottom:6px"> <div> <h1 style="margin:0">', ' <span id="pj-title">', "</span></h1> ", ' </div> <div style="display:flex;gap:8px;flex-wrap:wrap"> <button class="btn btn-ghost" id="pj-rename" type="button">名称・説明を編集</button> <button class="btn btn-ghost" id="pj-delete" type="button" title="プロジェクトのみ削除（アプリ・データは残ります）">削除</button> </div> </div> <div class="card pj-edit" id="pj-edit" hidden style="margin:10px 0"> <div class="field"><label>プロジェクト名</label><input id="pj-name" type="text"', '></div> <div class="field"><label>説明</label><input id="pj-desc" type="text"', '></div> <button class="btn btn-primary" id="pj-save" type="button">保存</button> </div> <div class="seg-summary" style="display:flex;gap:18px;flex-wrap:wrap;margin:8px 0 18px"> <div class="card" style="padding:14px 18px"><div class="muted" style="font-size:.8rem">アプリ数</div><strong style="font-size:1.4rem">', '</strong></div> <div class="card" style="padding:14px 18px"><div class="muted" style="font-size:.8rem">蓄積データ（合計）</div><strong style="font-size:1.4rem">', '</strong></div> </div> <h2 style="font-size:1.05rem;margin:0 0 8px">このプロジェクトのアプリ</h2> ', '<div class="pj-apps" style="display:flex;flex-direction:column;gap:10px"> ', ' </div> <div class="card" style="margin-top:18px;padding:16px 18px"> <h2 style="font-size:1rem;margin:0 0 8px">アプリを追加</h2> ', ' <p class="muted" style="font-size:.8rem;margin:.5rem 0 0">公開ページ（LP）はアプリに紐づくので、アプリを追加すると自動的にこのプロジェクトに含まれます。</p> </div> <script>(function(){', '\n    document.addEventListener("astro:page-load", function () {\n      var root = document.querySelector(".pj-apps");\n      if (document.body.dataset.pjBound === pid) return;\n      document.body.dataset.pjBound = pid;\n      var ed = document.getElementById("pj-edit");\n      document.getElementById("pj-rename").addEventListener("click", function () {\n        if (ed.hasAttribute("hidden")) ed.removeAttribute("hidden"); else ed.setAttribute("hidden", "");\n      });\n      document.getElementById("pj-save").addEventListener("click", async function (e) {\n        var name = (document.getElementById("pj-name").value || "").trim();\n        var description = (document.getElementById("pj-desc").value || "").trim();\n        var r = await window.bo.api("/api/projects", { action: "update", id: pid, name: name, description: description }, { btn: e.currentTarget, successMsg: "保存しました" });\n        if (r && r.ok) location.reload();\n      });\n      document.getElementById("pj-delete").addEventListener("click", async function (e) {\n        if (!confirm("このプロジェクトを削除します。配下のアプリ・データは残り、未所属に戻ります。よろしいですか？")) return;\n        var r = await window.bo.api("/api/projects", { action: "delete", id: pid }, { btn: e.currentTarget, successMsg: "削除しました" });\n        if (r && r.ok) location.href = "/projects";\n      });\n      var addBtn = document.getElementById("pj-add-btn");\n      if (addBtn) addBtn.addEventListener("click", async function (e) {\n        var appId = document.getElementById("pj-add-sel").value;\n        if (!appId) return;\n        var r = await window.bo.api("/api/projects", { action: "assign", appId: appId, projectId: pid }, { btn: e.currentTarget, successMsg: "追加しました" });\n        if (r && r.ok) location.reload();\n      });\n      document.querySelectorAll(".pj-remove").forEach(function (btn) {\n        btn.addEventListener("click", async function (e) {\n          var appId = e.currentTarget.getAttribute("data-app");\n          var r = await window.bo.api("/api/projects", { action: "assign", appId: appId, projectId: null }, { btn: e.currentTarget, successMsg: "外しました" });\n          if (r && r.ok) location.reload();\n        });\n      });\n    });\n  })();<\/script> '])), maybeRenderHead(), project.icon || "📁", project.name, project.description && renderTemplate`<p class="muted" style="margin:.2rem 0 0">${project.description}</p>`, addAttribute(project.name, "value"), addAttribute(project.description ?? "", "value"), apps.length, totalRecords, apps.length === 0 && renderTemplate`<p class="muted">まだアプリがありません。下の「アプリを追加」から所属させてください。</p>`, apps.map((a) => renderTemplate`<div class="card" style="padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px"> <div style="min-width:0"> <strong>${a.name}</strong> <span class="muted" style="font-size:.82rem">v${a.version}・${pubLabel(a.publicEnabled)}・${a.records}件</span> </div> <div style="display:flex;gap:6px;flex-wrap:wrap"> <a class="btn btn-sm btn-ghost"${addAttribute(`/app/${a.id}`, "href")} data-astro-reload>開く</a> ${a.publicEnabled != null && renderTemplate`<a class="btn btn-sm btn-ghost"${addAttribute(`/p/${a.id}`, "href")} target="_blank" rel="noopener external">公開ページ</a>`} <button class="btn btn-sm btn-ghost pj-remove" type="button"${addAttribute(a.id, "data-app")} title="このプロジェクトから外す">外す</button> </div> </div>`), addable.length === 0 ? renderTemplate`<p class="muted" style="margin:0">追加できるアプリがありません。</p>` : renderTemplate`<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"> <select id="pj-add-sel" style="flex:1 1 240px;min-width:200px"> ${addable.map((a) => renderTemplate`<option${addAttribute(a.id, "value")}>${a.name}${a.project_id ? "（別プロジェクト所属中）" : ""}</option>`)} </select> <button class="btn btn-primary" id="pj-add-btn" type="button">追加する</button> </div>`, defineScriptVars({ pid: id })) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/project/[id].astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/project/[id].astro";
const $$url = "/project/[id]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
