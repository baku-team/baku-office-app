globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, b as addAttribute, F as Fragment } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
import '../chunks/crypto_D21r3Dwx.mjs';
import { atLeast } from '../chunks/index_Cg172zdv.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { cachedEntitlement, getApiKey } = await import('../chunks/client_DjSYVqc9.mjs');
  const entitlement = await cachedEntitlement(env).catch(() => "free");
  const isAdminOrg = ses.role === "admin" && ses.ctx === "org";
  const hasPlus = atLeast(entitlement, "plus");
  let steps = [];
  if (isAdminOrg) {
    const { googleConfigured } = await import('../chunks/google__L4vnQZx.mjs');
    const aiReady = !!await getApiKey(env, "gemini") || !!await getApiKey(env, "claude") || !!env.LOCAL_AI_BASE_URL;
    const googleReady = await googleConfigured(env).catch(() => false);
    steps = [
      { label: "AI\u30A8\u30F3\u30B8\u30F3\u306E\u63A5\u7D9A", href: "/settings/keys", done: aiReady, hint: "Gemini / Claude \u306E\u30AD\u30FC\u3001\u307E\u305F\u306F\u30ED\u30FC\u30AB\u30EBLLM" },
      { label: "\u30D7\u30E9\u30F3\u306E\u78BA\u8A8D", href: "/billing", done: entitlement !== "free", hint: "Plus/Pro \u3067AI\u30FB\u9023\u643A\u6A5F\u80FD\u304C\u89E3\u653E" },
      { label: "Google \u9023\u643A\uFF08\u4EFB\u610F\uFF09", href: "/settings/google-setup", done: googleReady, hint: "Calendar/Gmail/Meet\u3002Gmail\u306F\u660E\u793A\u540C\u610F\u306E\u307F" }
    ];
  }
  const pendingSteps = steps.filter((s) => !s.done);
  const groups = [
    { title: "\u30A2\u30AB\u30A6\u30F3\u30C8\u30FB\u30E1\u30F3\u30D0\u30FC", items: [
      { href: "/settings/members", label: "\u4EBA\u30FB\u30ED\u30FC\u30EB", desc: "\u62DB\u5F85\u30FB\u627F\u8A8D\u30FB\u6A29\u9650\uFF08\u7BA1\u7406\u8005\uFF09", show: isAdminOrg },
      { href: "/billing", label: "\u30D7\u30E9\u30F3\u30FB\u8AB2\u91D1", desc: "Free/Plus/Pro \u306E\u30A2\u30C3\u30D7\u30B0\u30EC\u30FC\u30C9", show: isAdminOrg }
    ] },
    { title: "\u9023\u643A\u30FBAI", items: [
      { href: "/settings/keys", label: "\u9023\u643A\u8A2D\u5B9A\uFF08API\u30AD\u30FC\uFF09", desc: "Gemini / LINE / Claude / Google", show: true },
      { href: "/settings/google-setup", label: "Google \u9023\u643A\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7", desc: "Calendar/Gmail/Meet \u306EOAuth\u8A2D\u5B9A\u3092\u624B\u9806\u3067\u6848\u5185", show: isAdminOrg },
      { href: "/usage", label: "\u4F7F\u7528\u91CF\u30FB\u4E0A\u9650", desc: "API\u6D88\u8CBB\u30FB\u4E0A\u9650\u30FB\u4EFB\u610FAPI\u30FB\u30B9\u30C8\u30EC\u30FC\u30B8\u5BB9\u91CF", show: hasPlus },
      { href: "/drive", label: "Google\u30C9\u30E9\u30A4\u30D6\u9023\u643A", desc: "\u540C\u671F\u30FB\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7", show: hasPlus }
    ] },
    { title: "\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA\u30FB\u9AD8\u5EA6\u306A\u8A2D\u5B9A", items: [
      { href: "/settings/advanced", label: "\u9AD8\u5EA6\u306A\u30AA\u30D7\u30B7\u30E7\u30F3", desc: "AI\u30A8\u30F3\u30B8\u30F3\u30FB\u30AB\u30B9\u30BF\u30E0\u6307\u793A\u30FBKV\u4E0A\u9650\u30FBWorkers Paid", show: isAdminOrg && hasPlus },
      { href: "/settings/domain", label: "\u30AB\u30B9\u30BF\u30E0\u30C9\u30E1\u30A4\u30F3", desc: "\u72EC\u81EA\u30C9\u30E1\u30A4\u30F3\u3067\u516C\u958B\uFF08Plus\u4EE5\u4E0A\uFF09", show: isAdminOrg && hasPlus },
      { href: "/settings/a2a", label: "A2A\uFF08\u56E3\u4F53\u9593\u9023\u643A\uFF09", desc: "\u4ED6\u56E3\u4F53\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u3068\u76F8\u4E92\u540C\u610F\u3067\u9023\u643A\uFF08Pro\u4EE5\u4E0A\uFF09", show: isAdminOrg && atLeast(entitlement, "pro") }
    ] },
    { title: "\u904B\u7528\u30FB\u30B5\u30DD\u30FC\u30C8", items: [
      { href: "/approvals", label: "\u30A8\u30FC\u30B8\u30A7\u30F3\u30C8\u64CD\u4F5C\u306E\u627F\u8A8D", desc: "AI\u306E\u5BFE\u5916/\u7834\u58CA\u7CFB\u64CD\u4F5C\uFF08\u30E1\u30FC\u30EB\u9001\u4FE1\u30FB\u4E88\u5B9A\u5909\u66F4/\u524A\u9664\u30FBA2A\uFF09\u306E\u627F\u8A8D\u5F85\u3061", show: isAdminOrg },
      { href: "/legal", label: "\u5916\u90E8\u9001\u4FE1\u30FBAI\u5229\u7528\u306E\u958B\u793A", desc: "\u5916\u90E8\u9001\u4FE1\u5148\u4E00\u89A7\u30FB\u4FDD\u5B58\u671F\u9593\u30FB\u524A\u9664\u65B9\u6CD5\uFF08\u898F\u7D04\u8EE2\u8A18\u7528\u30C6\u30AD\u30B9\u30C8\uFF09", show: true },
      { href: "/review", label: "\u5171\u6709\u627F\u8A8D", desc: "\u500B\u4EBA\u2192\u7D44\u7E54\u306E\u627F\u8A8D", show: ses.role === "admin" || ses.role === "accounting" || ses.role === "clerical" },
      { href: "/diagnostics", label: "\u8A3A\u65AD\u30FB\u30B5\u30DD\u30FC\u30C8", desc: "\u7A3C\u50CD\u72B6\u6CC1\u30FB\u30A8\u30E9\u30FC\u30FBWorkers Paid \u6848\u5185", show: true },
      { href: "/settings/update", label: "\u30A2\u30D7\u30EA\u306E\u66F4\u65B0", desc: "\u6700\u65B0\u7248\u3078\u306E\u66F4\u65B0", show: isAdminOrg }
    ] }
  ];
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u8A2D\u5B9A", "active": "/settings" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>設定</h1> <p class="muted">このシステムの設定・オプションをまとめています。項目を選んでください。</p> ${isAdminOrg && pendingSteps.length > 0 && renderTemplate`<div class="card" style="border-left:3px solid #14365c"> <strong>初期設定（あと ${pendingSteps.length} 項目）</strong> <p class="muted" style="font-size:.85rem;margin:.2rem 0 .6rem">まず必須項目から段階的に設定すると、AI・連携機能を安全に有効化できます。</p> <ul style="margin:0;padding-left:1.2rem"> ${steps.map((s) => renderTemplate`<li style="margin:.2rem 0"> <span${addAttribute(s.done ? "\u8A2D\u5B9A\u6E08\u307F" : "\u672A\u8A2D\u5B9A", "aria-label")}>${s.done ? "\u2705" : "\u2B1C"}</span>${" "} ${s.done ? renderTemplate`<span>${s.label}</span>` : renderTemplate`<a${addAttribute(s.href, "href")}>${s.label}</a>`} <span class="muted" style="font-size:.8rem"> — ${s.hint}</span> </li>`)} </ul> </div>`}${groups.map((g) => {
    const items = g.items.filter((i) => i.show);
    return items.length === 0 ? null : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h2>${g.title}</h2> <div class="grid"> ${items.map((i) => renderTemplate`<a class="card"${addAttribute(i.href, "href")} style="text-decoration:none;color:inherit;display:block"> <strong>${i.label}</strong> <div class="muted" style="font-size:.85rem;margin-top:.2rem">${i.desc}</div> </a>`)} </div> ` })}`;
  })}` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/index.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/index.astro";
const $$url = "/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
