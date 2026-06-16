globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { r as renderTemplate } from "./sequence_CKjIrPcu.mjs";
import { r as renderComponent } from "./worker-entry_BXXdI43w.mjs";
import { env } from "cloudflare:workers";
import { $ as $$PublicSite } from "./PublicSite_B7DO0Xsn.mjs";
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { getPublishedSite } = await import("./sites_xKNJha3X.mjs");
  const site = slug ? await getPublishedSite(env, slug) : null;
  if (!site) return new Response("ページが見つかりません。", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  return renderTemplate`${renderComponent($$result, "PublicSite", $$PublicSite, { "site": site })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/lp/[slug].astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/lp/[slug].astro";
const $$url = "/lp/[slug]";
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
