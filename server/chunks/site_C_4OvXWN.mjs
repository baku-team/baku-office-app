globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { r as renderTemplate } from "./sequence_CKjIrPcu.mjs";
import { r as renderComponent } from "./worker-entry_BXXdI43w.mjs";
import { env } from "cloudflare:workers";
import { $ as $$PublicSite } from "./PublicSite_B7DO0Xsn.mjs";
const prerender = false;
const $$Site = createComponent(async ($$result, $$props, $$slots) => {
  const { getPublishedSite } = await import("./sites_xKNJha3X.mjs");
  const site = await getPublishedSite(env, "home");
  if (!site) return new Response("ページは公開されていません。", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  return renderTemplate`${renderComponent($$result, "PublicSite", $$PublicSite, { "site": site })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/site.astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/site.astro";
const $$url = "/site";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Site,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
