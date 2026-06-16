globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { a as addAttribute, r as renderTemplate, b as renderSlot, c as renderHead } from "./sequence_CKjIrPcu.mjs";
import { getTheme, brandName } from "./theme_DFty9gzU.mjs";
const $$EventPublic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EventPublic;
  const { title, desc, brand: brandProp, accent: accentProp, mode: modeProp, eventsHref = "/events", eventsLabel = "イベント" } = Astro2.props;
  const theme = await getTheme(Astro2.locals.ctx).catch(() => ({}));
  const brand = brandProp && brandProp.trim() || brandName(theme);
  const logoUrl = theme.logoUrl;
  const mode = modeProp ?? (theme.appearance === "dark" ? "dark" : "light");
  const SAFE_COLOR = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$|^(?:rgb|rgba|hsl|hsla)\([0-9.,%\s]+\)$/;
  const accentRaw = accentProp && accentProp.trim() || theme.colors?.brand || (mode === "dark" ? "#c79a5a" : "#9a6a34");
  const accent = SAFE_COLOR.test(accentRaw) ? accentRaw : mode === "dark" ? "#c79a5a" : "#9a6a34";
  const year = 2026;
  const nonce = Astro2.locals.cspNonce;
  const CSP = `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'`;
  return renderTemplate`<html lang="ja"${addAttribute(mode, "data-mode")}${addAttribute(`--accent:${accent}`, "style")}> <head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy"${addAttribute(CSP, "content")}><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="color-scheme"${addAttribute(mode === "dark" ? "dark" : "light", "content")}>${desc && renderTemplate`<meta name="description"${addAttribute(desc, "content")}>`}<title>${title}</title>${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body> <header class="topbar"> <div class="topbar-in"> <a class="brand"${addAttribute(eventsHref, "href")}>${logoUrl ? renderTemplate`<img${addAttribute(logoUrl, "src")}${addAttribute(brand, "alt")}>` : brand}</a> <nav class="topnav"> <a${addAttribute(eventsHref, "href")}>${eventsLabel}</a> </nav> </div> </header> <main class="pagewrap"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="footer"> <div class="footer-in"> <span class="fb">${brand}</span> <span class="fc">© ${year} ${brand}</span> </div> </footer> ${renderSlot($$result, $$slots["scripts"])} </body></html>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/EventPublic.astro", void 0);
export {
  $$EventPublic as $
};
