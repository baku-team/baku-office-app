globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$SitePublic } from '../chunks/SitePublic_tlo5_pMt.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Site = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Site;
  const env = Astro2.locals.runtime.env;
  const { getPublishedSite } = await import('../chunks/sites_CDjxnXko.mjs');
  const site = await getPublishedSite(env, "home");
  if (!site) return new Response("\u30DA\u30FC\u30B8\u306F\u516C\u958B\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  return renderTemplate`${renderComponent($$result, "SitePublic", $$SitePublic, { "site": site })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/site.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/site.astro";
const $$url = "/site";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Site,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
