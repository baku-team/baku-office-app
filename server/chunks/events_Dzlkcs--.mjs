globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { r as renderTemplate, m as maybeRenderHead, a as addAttribute } from "./sequence_CKjIrPcu.mjs";
import { r as renderComponent } from "./worker-entry_J6Z4S5IJ.mjs";
import { env } from "cloudflare:workers";
import { $ as $$EventPublic } from "./EventPublic_CGEPlRjH.mjs";
import { getTheme, brandName } from "./theme_DO0iS6ur.mjs";
const prerender = false;
const $$Events = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Events;
  const { listPublishedEvents } = await import("./events_Cw1NGgaN.mjs");
  const events = await listPublishedEvents(env).catch(() => []);
  const theme = await getTheme(Astro2.locals.ctx).catch(() => ({}));
  const brand = brandName(theme);
  const fmtDate = (s) => {
    if (!s) return "日程調整中";
    const d = new Date(s.replace(" ", "T"));
    if (isNaN(d.getTime())) return s;
    return `${d.getMonth() + 1}月${d.getDate()}日（${"日月火水木金土"[d.getDay()]}）${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}〜`;
  };
  const priceFrom = (plans) => plans.length ? Math.min(...plans.map((p) => p.price)) : 0;
  return renderTemplate`${renderComponent($$result, "EventPublic", $$EventPublic, { "title": "イベント — " + brand, "desc": "開催予定のイベント一覧" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="wrap" style="padding-top:56px"> <span class="pill">EVENTS</span> <h1 style="font-size:clamp(1.8rem,5vw,2.8rem);margin:.4em 0 .2em">イベント</h1> <p class="lead">開催予定のイベントから、参加したいものを選んでお申し込みください。</p> </section> <section class="wrap" style="padding:24px 20px 8px"> ${events.length === 0 && renderTemplate`<div class="card"><p class="muted" style="margin:0">現在公開中のイベントはありません。</p></div>`} <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px"> ${events.map((e) => renderTemplate`<a class="card"${addAttribute("/event/" + e.slug, "href")} style="display:block;color:inherit;transition:transform .12s,border-color .15s" onmouseover="this.style.transform='translateY(-3px)';this.style.borderColor='var(--accent)'" onmouseout="this.style.transform='';this.style.borderColor='var(--line)'"> <span class="pill" style="font-size:.74rem">${fmtDate(e.event_date)}</span> <h3 style="margin:.5em 0 .25em;font-size:1.3rem">${e.title}</h3> ${e.lead && renderTemplate`<p class="muted" style="margin:0 0 .6em">${e.lead}</p>`} <div class="muted" style="font-size:.86rem">📍 ${e.location ?? "会場調整中"}</div> <div style="margin-top:14px;display:flex;align-items:center;justify-content:space-between"> <strong style="color:var(--accent)">${priceFrom(e.plans) > 0 ? "¥" + priceFrom(e.plans).toLocaleString("ja-JP") + "〜" : "参加無料"}</strong> <span class="btn" style="padding:8px 16px">詳細・申込 →</span> </div> </a>`)} </div> </section> ` })}`;
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
