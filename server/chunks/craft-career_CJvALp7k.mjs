globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_I35uCg8f.mjs";
import { r as renderTemplate, F as Fragment, m as maybeRenderHead, u as unescapeHTML, a as addAttribute } from "./sequence_CKjIrPcu.mjs";
import { r as renderComponent } from "./worker-entry_J6Z4S5IJ.mjs";
import { env } from "cloudflare:workers";
import { $ as $$EventPublic } from "./EventPublic_CGEPlRjH.mjs";
import { s as sanitizeHtml } from "./sanitize_jH0WNw2O.mjs";
const prerender = false;
const $$CraftCareer = createComponent(async ($$result, $$props, $$slots) => {
  const { listPublishedEvents, CRAFT_LP_SLUG, CRAFT_LP_DEFAULT } = await import("./events_Cw1NGgaN.mjs");
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
    return `${d.getMonth() + 1}月${d.getDate()}日（${"日月火水木金土"[d.getDay()]}）${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}〜`;
  };
  const priceFrom = (plans) => plans.length ? Math.min(...plans.map((p) => p.price)) : 0;
  return renderTemplate`${renderComponent($$result, "EventPublic", $$EventPublic, { "title": "Craft Beer × Career — 醸造とキャリアが交わる夜", "desc": "クラフトビール片手に、キャリアを語る。越境して人とつながるソーシャルイベント。", "brand": "Craft Beer × Career", "icon": "🍺", "accent": "#e8a93c", "eventsHref": "/lp/craft-career", "data-astro-cid-puwb2its": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="wrap" style="padding-top:64px;padding-bottom:24px" data-astro-cid-puwb2its> <span class="pill" data-astro-cid-puwb2its>CRAFT BEER × CAREER</span> <h1 style="font-size:clamp(2rem,6vw,3.4rem);margin:.4em 0 .3em" data-astro-cid-puwb2its>${heroTitle}</h1> <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px" data-astro-cid-puwb2its> <a class="btn btn-primary btn-lg" href="#events" data-astro-cid-puwb2its>開催中のイベントを見る</a> <a class="btn btn-lg" href="#about" data-astro-cid-puwb2its>コンセプト</a> </div> </section> <section id="about" class="wrap lp-rich" style="padding:32px 20px" data-astro-cid-puwb2its>${unescapeHTML(bodyHtml)}</section> <section id="events" class="wrap" style="padding:24px 20px 8px" data-astro-cid-puwb2its> <h2 style="font-size:1.8rem" data-astro-cid-puwb2its>開催イベント</h2> <p class="muted" data-astro-cid-puwb2its>参加したいイベントを選んでお申し込みください。</p> ${events.length === 0 && renderTemplate`<div class="card" data-astro-cid-puwb2its><p class="muted" style="margin:0" data-astro-cid-puwb2its>現在公開中のイベントはありません。近日公開予定です。</p></div>`} <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;margin-top:14px" data-astro-cid-puwb2its> ${events.map((e) => renderTemplate`<a class="card"${addAttribute("/event/" + e.slug, "href")} style="display:block;color:inherit;transition:transform .12s,border-color .15s" onmouseover="this.style.transform='translateY(-3px)';this.style.borderColor='var(--amber)'" onmouseout="this.style.transform='';this.style.borderColor='var(--line)'" data-astro-cid-puwb2its> <span class="pill" style="font-size:.74rem" data-astro-cid-puwb2its>${fmtDate(e.event_date)}</span> <h3 style="margin:.5em 0 .25em;font-size:1.3rem" data-astro-cid-puwb2its>${e.title}</h3> ${e.lead && renderTemplate`<p class="muted" style="margin:0 0 .6em" data-astro-cid-puwb2its>${e.lead}</p>`} <div class="muted" style="font-size:.86rem" data-astro-cid-puwb2its>📍 ${e.location ?? "会場調整中"}</div> <div style="margin-top:14px;display:flex;align-items:center;justify-content:space-between" data-astro-cid-puwb2its> <strong style="color:var(--amber)" data-astro-cid-puwb2its>${priceFrom(e.plans) > 0 ? "¥" + priceFrom(e.plans).toLocaleString("ja-JP") + "〜" : "参加無料"}</strong> <span class="btn" style="padding:8px 16px" data-astro-cid-puwb2its>詳細・申込 →</span> </div> </a>`)} </div> </section>  `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" })}` })}`;
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
