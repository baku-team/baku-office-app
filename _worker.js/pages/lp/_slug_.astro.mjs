globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$SitePublic } from '../../chunks/SitePublic_tlo5_pMt.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const env = Astro2.locals.runtime.env;
  const { slug } = Astro2.params;
  const { getPublishedSite } = await import('../../chunks/sites_CDjxnXko.mjs');
  const site = slug ? await getPublishedSite(env, slug) : null;
  if (!site) return new Response("\u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  return renderTemplate`${renderComponent($$result, "SitePublic", $$SitePublic, { "site": site })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/lp/[slug].astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/lp/[slug].astro";
const $$url = "/lp/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
