globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_Dn7U0_eq.mjs";
import { r as renderTemplate } from "./sequence_I_kcixDX.mjs";
import { r as renderComponent } from "./worker-entry_BdKcrJWH.mjs";
import { env } from "cloudflare:workers";
import { $ as $$PublicSite } from "./PublicSite_DogYmjKl.mjs";
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { getPublishedSite, getSite } = await import("./sites_Cg2f3AXA.mjs");
  const wantPreview = Astro2.url.searchParams.get("preview") === "1";
  let site = slug ? await getPublishedSite(env, slug) : null;
  let adminPreview = false;
  if (wantPreview && slug) {
    const { getSession } = await import("./auth_B7kpU18u.mjs");
    const ses = await getSession(env, Astro2.request);
    if (ses?.role === "admin" && ses.ctx === "org") {
      site = await getSite(env, slug);
      adminPreview = true;
    }
  }
  if (!site) return new Response("ページが見つかりません。", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  return renderTemplate`${renderComponent($$result, "PublicSite", $$PublicSite, { "site": site, "preview": adminPreview })}`;
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
