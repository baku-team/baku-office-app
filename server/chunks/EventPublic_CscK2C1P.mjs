globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { a as addAttribute, r as renderTemplate, b as renderSlot, c as renderHead } from "./sequence_CKjIrPcu.mjs";
const $$EventPublic = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EventPublic;
  const { title, desc } = Astro2.props;
  const year = 2026;
  return renderTemplate`<html lang="ja" data-astro-cid-3bofufyr> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="color-scheme" content="dark">${desc && renderTemplate`<meta name="description"${addAttribute(desc, "content")}>`}<title>${title}</title>${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body data-astro-cid-3bofufyr> <header class="topbar" data-astro-cid-3bofufyr> <div class="topbar-in" data-astro-cid-3bofufyr> <a class="brand" href="/lp/craft-career" data-astro-cid-3bofufyr><span class="dot" data-astro-cid-3bofufyr>🍺</span> Craft Beer <span style="color:var(--muted)" data-astro-cid-3bofufyr>×</span> Career</a> <a class="btn" href="/lp/craft-career" style="padding:9px 16px" data-astro-cid-3bofufyr>イベント一覧</a> </div> </header> <main class="pagewrap" data-astro-cid-3bofufyr> ${renderSlot($$result, $$slots["default"])} </main> <footer class="footer" data-astro-cid-3bofufyr> <div class="footer-in" data-astro-cid-3bofufyr> <span data-astro-cid-3bofufyr>Craft Beer × Career — 醸造とキャリアが交わる夜。</span> <span data-astro-cid-3bofufyr>© ${year} baku-llc（デモ）</span> </div> </footer> ${renderSlot($$result, $$slots["scripts"])} </body></html>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/EventPublic.astro", void 0);
export {
  $$EventPublic as $
};
