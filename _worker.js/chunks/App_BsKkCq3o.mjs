globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, u as unescapeHTML, r as renderTemplate, a as renderHead, b as addAttribute, d as renderComponent, e as renderSlot, f as renderScript, g as createAstro, F as Fragment } from './astro/server_DRI6mTND.mjs';
/* empty css                         */

const $$Astro = createAstro();
const $$App = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$App;
  const env = Astro2.locals.runtime.env;
  const { title, active = "", auth = true } = Astro2.props;
  const { getSession } = await import('./auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request).catch(() => null);
  let limitErr = false;
  try {
    limitErr = await (await import('./diag_v9I7g07l.mjs')).hasRecentLimitError(env);
  } catch {
  }
  const items = [
    { href: "/", label: "\u30DB\u30FC\u30E0", show: true },
    { href: "/chat", label: "AI", show: true },
    { href: "/apps", label: "\u30A2\u30D7\u30EA", show: true },
    { href: "/settings", label: "\u8A2D\u5B9A", show: true }
  ];
  const ctx = Astro2.locals.ctx;
  const { getTheme, themeCss, brandName } = await import('./theme_Fu3FGkcO.mjs');
  const theme = await getTheme(ctx).catch(() => ({}));
  const themeStyle = themeCss(theme);
  const brand = brandName(theme);
  const logoUrl = theme.logoUrl;
  const { buildNav, getNavOverrides } = await import('./nav_CKksP45B.mjs');
  const navOv = await getNavOverrides(ctx).catch(() => null);
  const navItems = buildNav(items, [], navOv);
  let unreadNotif = 0;
  if (ses) {
    try {
      unreadNotif = await (await import('./notifications_oZ5Z7H91.mjs')).countUnread(ctx, ses.uid);
    } catch {
    }
  }
  return renderTemplate`<html lang="ja"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="color-scheme" content="light"><title>${title} — ${brand}</title>${themeStyle && renderTemplate`<style>${unescapeHTML(themeStyle)}</style>`}${renderHead()}</head> <body> ${auth && renderTemplate`<header class="appbar"> <div class="appbar-inner"> <a class="brand" href="/">${logoUrl ? renderTemplate`<img${addAttribute(logoUrl, "src")}${addAttribute(brand, "alt")} style="height:24px;vertical-align:middle">` : brand}</a> <nav class="nav"> ${navItems.map((i) => renderTemplate`<a${addAttribute(i.href, "href")}${addAttribute(active === i.href ? "page" : void 0, "aria-current")}>${i.label}</a>`)} </nav> <span class="user"> ${ses && renderTemplate`<a href="#" id="bo-bell" title="通知" style="position:relative;margin-right:14px;text-decoration:none">🔔${unreadNotif > 0 && renderTemplate`<span id="bo-bell-badge" style="position:absolute;top:-8px;right:-10px;background:#e53935;color:#fff;border-radius:9px;font-size:.62rem;line-height:1;padding:2px 5px">${unreadNotif}</span>`}</a>`} ${ses ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${ses.name ?? ses.role}・<a href="#" id="bo-logout">ログアウト</a>` })}` : renderTemplate`<a href="/login">ログイン</a>`} </span> </div> </header>`} <main class="wrap"> ${limitErr && renderTemplate`<div class="banner banner-danger">
⚠️ 直近に Cloudflare 無料枠の制限に達した可能性があります。重い処理を安定させるには
<a href="/settings/advanced">高度なオプション → Workers Paid</a> をご検討ください（<a href="/diagnostics">診断</a>）。
</div>`} ${renderSlot($$result, $$slots["default"])} </main> <div id="toasts" aria-live="polite"></div> <div id="bo-notif" hidden style="position:fixed;top:52px;right:12px;width:320px;max-height:70vh;overflow:auto;background:#fff;border:1px solid #ddd;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.12);z-index:50;padding:8px"></div> ${renderScript($$result, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/App.astro?astro&type=script&index=0&lang.ts")} ${renderSlot($$result, $$slots["scripts"])} </body></html>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/layouts/App.astro", void 0);

export { $$App as $ };
