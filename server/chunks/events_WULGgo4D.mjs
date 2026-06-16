globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { r as renderTemplate, m as maybeRenderHead, a as addAttribute } from "./sequence_CKjIrPcu.mjs";
import { r as renderComponent } from "./worker-entry_Dmq6Pkc7.mjs";
import { env } from "cloudflare:workers";
import { $ as $$EventPublic } from "./EventPublic_8nYdBwkO.mjs";
import { $ as $$EvIcon } from "./EvIcon_BRiC_DiK.mjs";
import { getTheme, brandName } from "./theme_DFty9gzU.mjs";
const prerender = false;
const $$Events = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Events;
  const { listPublishedEvents } = await import("./events_BZ-hJcQP.mjs");
  const events = await listPublishedEvents(env).catch(() => []);
  const theme = await getTheme(Astro2.locals.ctx).catch(() => ({}));
  const brand = brandName(theme);
  const fmtDate = (s) => {
    if (!s) return "日程調整中";
    const d = new Date(s.replace(" ", "T"));
    if (isNaN(d.getTime())) return s;
    return `${d.getMonth() + 1}月${d.getDate()}日（${"日月火水木金土"[d.getDay()]}）${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  const priceFrom = (plans) => plans.length ? Math.min(...plans.map((p) => p.price)) : 0;
  return renderTemplate`${renderComponent($$result, "EventPublic", $$EventPublic, { "title": "イベント — " + brand, "desc": "開催予定のイベント一覧" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="wrap" style="padding-top:72px;padding-bottom:8px"> <p class="eyebrow">Events</p> <h1 class="display" style="font-size:clamp(2rem,1.4rem+2.4vw,3rem);margin:.18em 0 .25em">イベント</h1> <p class="lead" style="max-width:34rem">開催予定のイベントから、ご関心のあるものを選んでお申し込みください。</p> </section> <section class="wrap section-sm"> ${events.length === 0 && renderTemplate`<div class="card pad"><p class="muted" style="margin:0">現在公開中のイベントはありません。</p></div>`} <div class="ev-grid"> ${events.map((e) => renderTemplate`<a class="ev-card"${addAttribute("/event/" + e.slug, "href")}> <div> <span class="tag">${renderComponent($$result2, "EvIcon", $$EvIcon, { "name": "calendar", "size": 14 })} ${fmtDate(e.event_date)}</span> <h3>${e.title}</h3> ${e.lead && renderTemplate`<p class="lead-sm">${e.lead}</p>`} <span class="meta">${renderComponent($$result2, "EvIcon", $$EvIcon, { "name": "pin", "size": 15 })} ${e.location ?? "会場調整中"}</span> </div> <div class="ev-foot"> <span class="price">${priceFrom(e.plans) > 0 ? "¥" + priceFrom(e.plans).toLocaleString("ja-JP") + "〜" : "参加無料"}</span> <span class="ev-go">詳細・申込 ${renderComponent($$result2, "EvIcon", $$EvIcon, { "name": "arrow", "size": 16 })}</span> </div> </a>`)} </div> </section> ` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/events.astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/events.astro";
const $$url = "/events";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Events,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
