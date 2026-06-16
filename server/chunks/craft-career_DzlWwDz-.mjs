globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, a as addAttribute } from "./sequence_CKjIrPcu.mjs";
import { r as renderComponent } from "./worker-entry_Dmq6Pkc7.mjs";
import { env } from "cloudflare:workers";
import { $ as $$EventPublic } from "./EventPublic_8nYdBwkO.mjs";
import { $ as $$EvIcon } from "./EvIcon_BRiC_DiK.mjs";
import { s as sanitizeHtml } from "./sanitize_jH0WNw2O.mjs";
const prerender = false;
const $$CraftCareer = createComponent(async ($$result, $$props, $$slots) => {
  const { listPublishedEvents, CRAFT_LP_SLUG, CRAFT_LP_DEFAULT } = await import("./events_BZ-hJcQP.mjs");
  const { getPublishedSite } = await import("./sites_xKNJha3X.mjs");
  const site = await getPublishedSite(env, CRAFT_LP_SLUG).catch(() => null);
  if (!site) return new Response("ページが見つかりません。", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  const events = await listPublishedEvents(env).catch(() => []);
  const heroTitle = site.title?.trim() || CRAFT_LP_DEFAULT.title;
  const bodyHtml = sanitizeHtml(site.body && site.body.trim() ? site.body : CRAFT_LP_DEFAULT.body);
  const fmtDate = (s) => {
    if (!s) return "日程調整中";
    const d = new Date(s.replace(" ", "T"));
    if (isNaN(d.getTime())) return s;
    return `${d.getMonth() + 1}月${d.getDate()}日（${"日月火水木金土"[d.getDay()]}）${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  const priceFrom = (plans) => plans.length ? Math.min(...plans.map((p) => p.price)) : 0;
  return renderTemplate`${renderComponent($$result, "EventPublic", $$EventPublic, { "title": "Craft Beer × Career — 醸造とキャリアが交わる夜", "desc": "クラフトビール片手に、キャリアを語る。越境して人とつながるソーシャルイベント。", "brand": "Craft Beer × Career", "accent": "#c79a5a", "mode": "dark", "eventsHref": "/lp/craft-career", "eventsLabel": "イベント" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero"> <div class="wrap"> <p class="eyebrow">Craft Beer &times; Career</p> <h1 class="display">${heroTitle}</h1> <div class="hero-cta"> <a class="btn btn-primary btn-lg" href="#events">イベントを見る</a> <a class="btn btn-lg" href="#about">コンセプト</a> </div> </div> </section> <section id="about" class="wrap section"> <div class="lp-rich">${unescapeHTML(bodyHtml)}</div> </section> <hr class="rule"> <section id="events" class="wrap section"> <p class="eyebrow">Events</p> <h2 style="font-size:2rem;margin:.2em 0 .1em">開催イベント</h2> <p class="muted" style="margin-bottom:28px">ご関心のある会を選び、お申し込みください。</p> ${events.length === 0 && renderTemplate`<div class="card pad"><p class="muted" style="margin:0">現在公開中のイベントはありません。</p></div>`} <div class="ev-grid"> ${events.map((e) => renderTemplate`<a class="ev-card"${addAttribute("/event/" + e.slug, "href")}> <div> <span class="tag">${renderComponent($$result2, "EvIcon", $$EvIcon, { "name": "calendar", "size": 14 })} ${fmtDate(e.event_date)}</span> <h3>${e.title}</h3> ${e.lead && renderTemplate`<p class="lead-sm">${e.lead}</p>`} <span class="meta">${renderComponent($$result2, "EvIcon", $$EvIcon, { "name": "pin", "size": 15 })} ${e.location ?? "会場調整中"}</span> </div> <div class="ev-foot"> <span class="price">${priceFrom(e.plans) > 0 ? "¥" + priceFrom(e.plans).toLocaleString("ja-JP") + "〜" : "参加無料"}</span> <span class="ev-go">詳細・申込 ${renderComponent($$result2, "EvIcon", $$EvIcon, { "name": "arrow", "size": 16 })}</span> </div> </a>`)} </div> </section> ` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/lp/craft-career.astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/lp/craft-career.astro";
const $$url = "/lp/craft-career";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$CraftCareer,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
