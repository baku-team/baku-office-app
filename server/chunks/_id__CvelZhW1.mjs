globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_Dn7U0_eq.mjs";
import { r as renderTemplate, m as maybeRenderHead, a as addAttribute } from "./sequence_I_kcixDX.mjs";
import { r as renderComponent } from "./worker-entry_CDDbDglY.mjs";
import { $ as $$App, r as renderScript } from "./App_wdedGxko.mjs";
import { env } from "cloudflare:workers";
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { getSession } = await import("./auth_CO6Q4ahN.mjs");
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const ctx = Astro2.locals.ctx;
  const { id } = Astro2.params;
  const { activeAppDefinition } = await import("./external-apps_D4vbFip2.mjs").then((n) => n.m);
  const app = id ? await activeAppDefinition(ctx, id) : null;
  const def = app?.definition ?? null;
  const inputs = def?.inputs ?? [];
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": app?.name ?? "アプリ", "active": "/apps" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="spread" style="flex-wrap:wrap;gap:12px"> <h1 style="margin:0">${app?.name ?? "アプリが見つかりません"}</h1> <a class="btn btn-ghost" href="/apps">アプリ一覧へ</a> </div> ${!app && renderTemplate`<p class="muted">このアプリは未導入か削除されています。</p>`}${app && renderTemplate`<div class="card" style="margin-top:.6rem"> <form id="app-form"${addAttribute(id, "data-app")}> ${inputs.map((i) => renderTemplate`<div class="field" style="margin:.5rem 0"> <label style="display:block;font-size:.85rem;margin-bottom:.2rem">${i.label ?? i.name}${i.required && renderTemplate`<span style="color:var(--danger)"> *</span>`}</label> ${i.type === "textarea" && renderTemplate`<textarea${addAttribute(i.name, "name")} data-type="textarea"${addAttribute(i.placeholder ?? "", "placeholder")} rows="4" style="width:100%"></textarea>`} ${i.type === "select" && renderTemplate`<select${addAttribute(i.name, "name")} data-type="select">${(i.options ?? []).map((o) => renderTemplate`<option${addAttribute(o, "value")}>${o}</option>`)}</select>`} ${i.type === "boolean" && renderTemplate`<input type="checkbox"${addAttribute(i.name, "name")} data-type="boolean">`} ${i.type === "file" && renderTemplate`<input type="file"${addAttribute(i.name, "name")} data-type="file"${addAttribute(i.accept ?? "", "accept")}>`} ${(i.type === "text" || i.type === "number") && renderTemplate`<input${addAttribute(i.type === "number" ? "number" : "text", "type")}${addAttribute(i.name, "name")}${addAttribute(i.type, "data-type")}${addAttribute(i.placeholder ?? "", "placeholder")} style="width:100%">`} </div>`)} <button class="btn btn-primary" type="submit">${def?.ui?.submitLabel ?? "実行する"}</button> <span id="app-busy" class="muted" hidden> 実行中…</span> </form> <div id="app-result" style="margin-top:.8rem" hidden></div> </div>`}` })} ${renderScript($$result, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/app/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/app/[id].astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/app/[id].astro";
const $$url = "/app/[id]";
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
