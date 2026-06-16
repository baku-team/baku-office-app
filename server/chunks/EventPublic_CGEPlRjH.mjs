globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { a as addAttribute, r as renderTemplate, b as renderSlot, c as renderHead } from "./sequence_CKjIrPcu.mjs";
import { getTheme, brandName } from "./theme_DO0iS6ur.mjs";
const $$EventPublic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EventPublic;
  const { title, desc, brand: brandProp, accent: accentProp, icon: iconProp, eventsHref = "/events" } = Astro2.props;
  const theme = await getTheme(Astro2.locals.ctx).catch(() => ({}));
  const brand = brandProp && brandProp.trim() || brandName(theme);
  const logoUrl = theme.logoUrl;
  const SAFE_COLOR = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$|^(?:rgb|rgba|hsl|hsla)\([0-9.,%\s]+\)$/;
  const accentRaw = accentProp && accentProp.trim() || theme.colors?.brand || "#d8a13a";
  const accent = SAFE_COLOR.test(accentRaw) ? accentRaw : "#d8a13a";
  const icon = iconProp ?? (logoUrl ? "" : (brand.trim().charAt(0) || "•").toUpperCase());
  const year = 2026;
  return renderTemplate`<html lang="ja"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="color-scheme" content="dark">${desc && renderTemplate`<meta name="description"${addAttribute(desc, "content")}>`}<title>${title}</title>${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body${addAttribute(`--accent:${accent}`, "style")}> <header class="topbar"> <div class="topbar-in"> <a class="brand"${addAttribute(eventsHref, "href")}> ${logoUrl ? renderTemplate`<img${addAttribute(logoUrl, "src")}${addAttribute(brand, "alt")}>` : renderTemplate`<span class="dot">${icon}</span>`} ${brand} </a> <a class="btn"${addAttribute(eventsHref, "href")} style="padding:9px 16px">イベント一覧</a> </div> </header> <main class="pagewrap"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="footer"> <div class="footer-in"> <span>${brand}</span> <span>© ${year} ${brand}</span> </div> </footer> ${renderSlot($$result, $$slots["scripts"])} </body></html>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/EventPublic.astro", void 0);
export {
  $$EventPublic as $
};
