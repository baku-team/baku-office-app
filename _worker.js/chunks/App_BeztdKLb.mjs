globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, u as unescapeHTML, r as renderTemplate, l as renderHead, g as addAttribute, k as renderComponent, n as renderSlot, o as renderScript, h as createAstro, p as Fragment } from './astro/server_CfYoLHqm.mjs';
/* empty css                         */
import './crypto_BhRWVEcj.mjs';
import { a as atLeast } from './types_sPQFPjY_.mjs';

const $$Astro = createAstro();
const $$App = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$App;
  const env = Astro2.locals.runtime.env;
  const { title, active = "", auth = true } = Astro2.props;
  const { getSession } = await import('./auth_ujH5pbJJ.mjs');
  const ses = await getSession(env, Astro2.request).catch(() => null);
  let limitErr = false;
  try {
    limitErr = await (await import('./diag_D3atJWnJ.mjs')).hasRecentLimitError(env);
  } catch {
  }
  let entitlement = "free";
  try {
    entitlement = await (await import('./client_KUuDosgV.mjs')).cachedEntitlement(env);
  } catch {
  }
  const isAdminOrg = ses?.role === "admin" && ses?.ctx === "org";
  const hasPlus = atLeast(entitlement, "plus");
  const hasPro = atLeast(entitlement, "pro");
  const canReview = ses?.role === "admin" || ses?.role === "accounting" || ses?.role === "clerical";
  const items = [
    { href: "/", label: "\u30DB\u30FC\u30E0", show: true },
    { href: "/accounting", label: "\u4F1A\u8A08", show: true },
    { href: "/files", label: "\u30D5\u30A1\u30A4\u30EB", show: true },
    { href: "/schedule", label: "\u4E88\u5B9A", show: true },
    { href: "/minutes", label: "\u8B70\u4E8B\u9332", show: true },
    { href: "/membership", label: "\u4F1A\u54E1\u7BA1\u7406", show: ses?.ctx === "org" },
    { href: "/chat", label: "AI\u30C1\u30E3\u30C3\u30C8", show: hasPlus },
    { href: "/usage", label: "API\u4F7F\u7528\u91CF", show: hasPlus },
    { href: "/drive", label: "\u30C9\u30E9\u30A4\u30D6", show: hasPlus },
    { href: "/import", label: "\u8CC7\u6599\u30A4\u30F3\u30DD\u30FC\u30C8", show: hasPlus },
    { href: "/personal", label: "\u500B\u4EBA", show: ses?.ctx === "personal" },
    { href: "/review", label: "\u5171\u6709\u627F\u8A8D", show: !!canReview },
    { href: "/settings/members", label: "\u4EBA\u30FB\u30ED\u30FC\u30EB", show: isAdminOrg },
    { href: "/billing", label: "\u30D7\u30E9\u30F3\u30FB\u8AB2\u91D1", show: isAdminOrg },
    { href: "/settings/keys", label: "\u9023\u643A\u8A2D\u5B9A", show: true },
    { href: "/diagnostics", label: "\u8A3A\u65AD", show: true },
    { href: "/settings/site", label: "HP/LP", show: isAdminOrg && hasPro },
    { href: "/settings/advanced", label: "\u9AD8\u5EA6\u306A\u30AA\u30D7\u30B7\u30E7\u30F3", show: isAdminOrg && hasPlus },
    { href: "/settings/update", label: "\u30A2\u30D7\u30EA\u306E\u66F4\u65B0", show: isAdminOrg }
  ];
  const ctx = Astro2.locals.ctx;
  const { getTheme, themeCss, brandName } = await import('./theme_Fu3FGkcO.mjs');
  const theme = await getTheme(ctx).catch(() => ({}));
  const themeStyle = themeCss(theme);
  const brand = brandName(theme);
  const logoUrl = theme.logoUrl;
  const { buildNav, getNavOverrides } = await import('./nav_CKksP45B.mjs');
  const { partMenuItems, enabledPartIds } = await import('./parts_C0xB5mu7.mjs');
  await import('./index_C4EjYe4c.mjs').then(n => n.i);
  const navOv = await getNavOverrides(ctx).catch(() => null);
  const partItems = partMenuItems(await enabledPartIds(ctx).catch(() => null));
  const navItems = buildNav(items, partItems, navOv);
  return renderTemplate`<html lang="ja"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="color-scheme" content="light"><title>${title} — ${brand}</title>${themeStyle && renderTemplate`<style>${unescapeHTML(themeStyle)}</style>`}${renderHead()}</head> <body> ${auth && renderTemplate`<header class="appbar"> <div class="appbar-inner"> <a class="brand" href="/">${logoUrl ? renderTemplate`<img${addAttribute(logoUrl, "src")}${addAttribute(brand, "alt")} style="height:24px;vertical-align:middle">` : brand}</a> <nav class="nav"> ${navItems.map((i) => renderTemplate`<a${addAttribute(i.href, "href")}${addAttribute(active === i.href ? "page" : void 0, "aria-current")}>${i.label}</a>`)} </nav> <span class="user"> ${ses ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${ses.name ?? ses.role}・<a href="#" id="bo-logout">ログアウト</a>` })}` : renderTemplate`<a href="/login">ログイン</a>`} </span> </div> </header>`} <main class="wrap"> ${limitErr && renderTemplate`<div class="banner banner-danger">
⚠️ 直近に Cloudflare 無料枠の制限に達した可能性があります。重い処理を安定させるには
<a href="/settings/advanced">高度なオプション → Workers Paid</a> をご検討ください（<a href="/diagnostics">診断</a>）。
</div>`} ${renderSlot($$result, $$slots["default"])} </main> <div id="toasts" aria-live="polite"></div> ${renderScript($$result, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/App.astro?astro&type=script&index=0&lang.ts")} ${renderSlot($$result, $$slots["scripts"])} </body></html>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/App.astro", void 0);

export { $$App as $ };
