globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_Dn7U0_eq.mjs";
import { m as maybeRenderHead, a as addAttribute, r as renderTemplate, u as unescapeHTML, F as Fragment } from "./sequence_I_kcixDX.mjs";
import { r as renderComponent } from "./worker-entry_CAP_cHhP.mjs";
import { $ as $$EvIcon, a as $$EventPublic } from "./EvIcon_BX2bZDt7.mjs";
import { s as sanitizeHtml } from "./sanitize_jH0WNw2O.mjs";
import { env } from "cloudflare:workers";
import { $ as $$EventCard } from "./EventCard_Drxa_1CA.mjs";
const $$HeroBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$HeroBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const hasImg = !!(p.image && p.image.trim());
  const bg = hasImg ? `background-image: linear-gradient(180deg, rgba(16,14,10,.5), rgba(16,14,10,.82) 78%, var(--bg)), url('${p.image}'); background-size: cover; background-position: center;` : "";
  return renderTemplate`${maybeRenderHead()}<section${addAttribute("hero blk-hero" + (hasImg ? " has-img" : ""), "class")}${addAttribute(p.height || "m", "data-h")}${addAttribute(p.align || "left", "data-align")}${addAttribute(bg, "style")} data-astro-cid-zbfxve7n> <div class="wrap" data-astro-cid-zbfxve7n> ${p.eyebrow && renderTemplate`<p class="eyebrow blk-eyebrow" data-astro-cid-zbfxve7n>${p.eyebrow}</p>`} ${p.title && renderTemplate`<h1 class="display" data-astro-cid-zbfxve7n>${p.title}</h1>`} ${p.lead && renderTemplate`<p class="lead" data-astro-cid-zbfxve7n>${p.lead}</p>`} ${(p.primaryLabel || p.secondaryLabel) && renderTemplate`<div class="hero-cta" data-astro-cid-zbfxve7n> ${p.primaryLabel && renderTemplate`<a class="btn btn-primary btn-lg"${addAttribute(p.primaryHref || "#", "href")} data-astro-cid-zbfxve7n>${p.primaryLabel}</a>`} ${p.secondaryLabel && renderTemplate`<a class="btn btn-lg"${addAttribute(p.secondaryHref || "#", "href")} data-astro-cid-zbfxve7n>${p.secondaryLabel}</a>`} </div>`} </div> </section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/HeroBlock.astro", void 0);
const $$RichTextBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$RichTextBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const html = sanitizeHtml(String(p.html ?? ""));
  const wide = p.width === "wide";
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-6ikwx6fe><div class="wrap" data-astro-cid-6ikwx6fe><div${addAttribute("lp-rich" + (wide ? " lp-wide" : ""), "class")} data-astro-cid-6ikwx6fe>${unescapeHTML(html)}</div></div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/RichTextBlock.astro", void 0);
const $$FeaturesBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FeaturesBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const items = Array.isArray(p.items) ? p.items : [];
  const cols = String(p.columns || "3");
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-qeawnmaz><div class="wrap" data-astro-cid-qeawnmaz> ${p.eyebrow && renderTemplate`<p class="eyebrow blk-eyebrow" data-astro-cid-qeawnmaz>${String(p.eyebrow)}</p>`} ${p.heading && renderTemplate`<h2 class="blk-h" data-astro-cid-qeawnmaz>${String(p.heading)}</h2>`} <div class="feat-grid"${addAttribute(cols, "data-cols")} data-astro-cid-qeawnmaz> ${items.map((it) => renderTemplate`<div class="feat" data-astro-cid-qeawnmaz> ${it.icon && renderTemplate`<span class="feat-ic" data-astro-cid-qeawnmaz>${renderComponent($$result, "EvIcon", $$EvIcon, { "name": it.icon, "size": 22, "data-astro-cid-qeawnmaz": true })}</span>`} ${it.title && renderTemplate`<h3 data-astro-cid-qeawnmaz>${it.title}</h3>`} ${it.body && renderTemplate`<p data-astro-cid-qeawnmaz>${it.body}</p>`} </div>`)} </div> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/FeaturesBlock.astro", void 0);
const $$ImageTextBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ImageTextBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const right = p.imageSide === "right";
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-uux5bwce><div class="wrap" data-astro-cid-uux5bwce> <div${addAttribute("it-grid" + (right ? " it-right" : ""), "class")} data-astro-cid-uux5bwce> ${p.image && renderTemplate`<div class="it-img"${addAttribute(`background-image:url('${p.image}')`, "style")} data-astro-cid-uux5bwce></div>`} <div class="it-body" data-astro-cid-uux5bwce> ${p.title && renderTemplate`<h2 class="blk-h" data-astro-cid-uux5bwce>${p.title}</h2>`} ${p.body && renderTemplate`<p class="it-text" data-astro-cid-uux5bwce>${p.body}</p>`} ${p.buttonLabel && renderTemplate`<a class="btn btn-primary"${addAttribute(p.buttonHref || "#", "href")} style="margin-top:8px" data-astro-cid-uux5bwce>${p.buttonLabel}</a>`} </div> </div> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/ImageTextBlock.astro", void 0);
const $$EventsBlock = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EventsBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const { listPublishedEvents, getPublishedEventBySlug } = await import("./events_CM6Cxi2-.mjs");
  let events = [];
  if (p.mode === "featured" && p.slug) {
    const e = await getPublishedEventBySlug(env, String(p.slug)).catch(() => null);
    events = e ? [e] : [];
  } else {
    const limit = Math.max(1, Math.min(Number(p.limit) || 6, 24));
    events = (await listPublishedEvents(env).catch(() => [])).slice(0, limit);
  }
  return renderTemplate`${maybeRenderHead()}<section class="section"><div class="wrap"> ${p.heading && renderTemplate`<h2 class="blk-h">${String(p.heading)}</h2>`} ${events.length === 0 && renderTemplate`<div class="card pad"><p class="muted" style="margin:0">現在公開中のイベントはありません。</p></div>`} <div class="ev-grid" style="margin-top:24px">${events.map((e) => renderTemplate`${renderComponent($$result, "EventCard", $$EventCard, { "ev": e })}`)}</div> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/EventsBlock.astro", void 0);
const $$CtaBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CtaBlock;
  const { block } = Astro2.props;
  const p = block.props;
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-2chn5upz><div class="wrap" data-astro-cid-2chn5upz> <div class="cta-box" data-astro-cid-2chn5upz> ${p.heading && renderTemplate`<h2 class="blk-h" style="margin-bottom:.3em" data-astro-cid-2chn5upz>${p.heading}</h2>`} ${p.body && renderTemplate`<p class="cta-body" data-astro-cid-2chn5upz>${p.body}</p>`} ${p.buttonLabel && renderTemplate`<a class="btn btn-primary btn-lg"${addAttribute(p.buttonHref || "#", "href")} data-astro-cid-2chn5upz>${p.buttonLabel}</a>`} </div> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/CtaBlock.astro", void 0);
const $$StepsBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$StepsBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const items = Array.isArray(p.items) ? p.items : [];
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-hqhsjvxl><div class="wrap" data-astro-cid-hqhsjvxl> ${p.heading && renderTemplate`<h2 class="blk-h" data-astro-cid-hqhsjvxl>${String(p.heading)}</h2>`} <ol class="steps" data-astro-cid-hqhsjvxl> ${items.map((it, i) => renderTemplate`<li class="step" data-astro-cid-hqhsjvxl> <span class="step-n" data-astro-cid-hqhsjvxl>${i + 1}</span> <div data-astro-cid-hqhsjvxl>${it.title && renderTemplate`<h3 data-astro-cid-hqhsjvxl>${it.title}</h3>`}${it.body && renderTemplate`<p data-astro-cid-hqhsjvxl>${it.body}</p>`}</div> </li>`)} </ol> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/StepsBlock.astro", void 0);
const $$StatsBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$StatsBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const items = Array.isArray(p.items) ? p.items : [];
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-j4ycmddk><div class="wrap" data-astro-cid-j4ycmddk> ${p.heading && renderTemplate`<h2 class="blk-h" data-astro-cid-j4ycmddk>${String(p.heading)}</h2>`} <div class="stats" data-astro-cid-j4ycmddk> ${items.map((it) => renderTemplate`<div class="stat" data-astro-cid-j4ycmddk> <div class="stat-v" data-astro-cid-j4ycmddk>${it.value}</div> <div class="stat-l" data-astro-cid-j4ycmddk>${it.label}</div> </div>`)} </div> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/StatsBlock.astro", void 0);
const $$GalleryBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$GalleryBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const items = (Array.isArray(p.items) ? p.items : []).filter((it) => it.image);
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-vwdfmq3l><div class="wrap" data-astro-cid-vwdfmq3l> ${p.heading && renderTemplate`<h2 class="blk-h" data-astro-cid-vwdfmq3l>${String(p.heading)}</h2>`} <div class="gallery" data-astro-cid-vwdfmq3l> ${items.map((it) => renderTemplate`<figure class="gphoto" data-astro-cid-vwdfmq3l> <span class="gimg"${addAttribute(`background-image:url('${it.image}')`, "style")} data-astro-cid-vwdfmq3l></span> ${it.caption && renderTemplate`<figcaption data-astro-cid-vwdfmq3l>${it.caption}</figcaption>`} </figure>`)} </div> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/GalleryBlock.astro", void 0);
const $$FaqBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FaqBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const items = Array.isArray(p.items) ? p.items : [];
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-vqbstbga><div class="wrap" data-astro-cid-vqbstbga> ${p.heading && renderTemplate`<h2 class="blk-h" data-astro-cid-vqbstbga>${String(p.heading)}</h2>`} <div class="faq" data-astro-cid-vqbstbga> ${items.map((it) => renderTemplate`<details class="faq-item" data-astro-cid-vqbstbga> <summary data-astro-cid-vqbstbga>${it.q}</summary> <p data-astro-cid-vqbstbga>${it.a}</p> </details>`)} </div> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/FaqBlock.astro", void 0);
const $$QuoteBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$QuoteBlock;
  const { block } = Astro2.props;
  const p = block.props;
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-bjdpftiu><div class="wrap" data-astro-cid-bjdpftiu> <blockquote class="quote" data-astro-cid-bjdpftiu> ${p.text && renderTemplate`<p class="quote-t" data-astro-cid-bjdpftiu>${p.text}</p>`} ${(p.author || p.role) && renderTemplate`<footer class="quote-f" data-astro-cid-bjdpftiu>— ${p.author}${p.role ? `／${p.role}` : ""}</footer>`} </blockquote> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/QuoteBlock.astro", void 0);
const $$LogosBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LogosBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const items = (Array.isArray(p.items) ? p.items : []).filter((it) => it.image);
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-lg3scste><div class="wrap" data-astro-cid-lg3scste> ${p.heading && renderTemplate`<h2 class="blk-h" data-astro-cid-lg3scste>${String(p.heading)}</h2>`} <div class="logos" data-astro-cid-lg3scste> ${items.map((it) => renderTemplate`<img class="logo"${addAttribute(it.image, "src")}${addAttribute(it.alt || "", "alt")} loading="lazy" data-astro-cid-lg3scste>`)} </div> </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/LogosBlock.astro", void 0);
const $$EmbedBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$EmbedBlock;
  const { block } = Astro2.props;
  const p = block.props;
  const provider = p.provider === "youtube" ? "youtube" : "map";
  const value = (p.value || "").trim();
  let src = "";
  if (value) {
    if (provider === "map") {
      src = "https://www.google.com/maps?q=" + encodeURIComponent(value.slice(0, 200)) + "&output=embed";
    } else {
      const m = value.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)?([A-Za-z0-9_-]{11})/);
      if (m) src = "https://www.youtube-nocookie.com/embed/" + m[1];
    }
  }
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-peykfgah><div class="wrap" data-astro-cid-peykfgah> ${p.heading && renderTemplate`<h2 class="blk-h" data-astro-cid-peykfgah>${String(p.heading)}</h2>`} ${src ? renderTemplate`<div class="embed" data-astro-cid-peykfgah><iframe${addAttribute(src, "src")}${addAttribute(p.heading || "embed", "title")} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation" referrerpolicy="no-referrer" allowfullscreen data-astro-cid-peykfgah></iframe></div>` : renderTemplate`<div class="card pad" data-astro-cid-peykfgah><p class="muted" style="margin:0" data-astro-cid-peykfgah>埋め込み先が未設定です。</p></div>`} </div></section>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/EmbedBlock.astro", void 0);
const $$DividerBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$DividerBlock;
  const { block } = Astro2.props;
  const size = String(block.props.size || "m");
  const pad = size === "s" ? "28px" : size === "l" ? "88px" : "56px";
  return renderTemplate`${maybeRenderHead()}<div class="wrap"${addAttribute(`padding-top:${pad};padding-bottom:0`, "style")}><hr class="rule"></div>`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/DividerBlock.astro", void 0);
const $$BlockRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BlockRenderer;
  const { blocks } = Astro2.props;
  const MAP = {
    hero: $$HeroBlock,
    richText: $$RichTextBlock,
    features: $$FeaturesBlock,
    imageText: $$ImageTextBlock,
    events: $$EventsBlock,
    cta: $$CtaBlock,
    steps: $$StepsBlock,
    stats: $$StatsBlock,
    gallery: $$GalleryBlock,
    faq: $$FaqBlock,
    quote: $$QuoteBlock,
    logos: $$LogosBlock,
    embed: $$EmbedBlock,
    divider: $$DividerBlock
  };
  const bgClass = (bg) => bg === "tinted" || bg === "contrast" ? "blk-bg blk-bg-" + bg : "";
  return renderTemplate`${blocks.map((b) => {
    const C = MAP[b.type];
    if (!C) return null;
    const cls = bgClass(b.bg);
    return cls ? renderTemplate`${maybeRenderHead()}<div${addAttribute(cls, "class")}>${renderComponent($$result, "C", C, { "block": b })}</div>` : renderTemplate`${renderComponent($$result, "C", C, { "block": b })}`;
  })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/blocks/BlockRenderer.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$PublicSite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PublicSite;
  const { site, preview = false } = Astro2.props;
  const layoutJson = preview ? site.layout_draft ?? site.layout : site.layout;
  let blocks = null;
  if (layoutJson) {
    try {
      const v = JSON.parse(layoutJson);
      if (Array.isArray(v?.blocks)) blocks = v.blocks;
    } catch {
    }
  }
  const safeBody = sanitizeHtml(site.body ?? "");
  return renderTemplate`${renderComponent($$result, "EventPublic", $$EventPublic, { "title": site.title, "eventsHref": "/events", "eventsLabel": "イベント" }, { "default": async ($$result2) => renderTemplate`${blocks ? renderTemplate`${renderComponent($$result2, "BlockRenderer", $$BlockRenderer, { "blocks": blocks })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` ${maybeRenderHead()}<section class="hero"> <div class="wrap"> <h1 class="display">${site.title}</h1> </div> </section> <section class="wrap section"> <div class="lp-rich">${unescapeHTML(safeBody)}</div> ${site.show_join === 1 && renderTemplate`<div class="card pad join" style="max-width:520px;margin-top:48px"> <h2 style="margin:0 0 4px;font-size:1.3rem">会員のお申し込み</h2> <p class="muted" style="font-size:.88rem;margin:0 0 14px">お名前と連絡先をご記入ください。担当者よりご連絡します。</p> <form id="joinForm"> <div class="field"><label>お名前</label><input class="input" id="j-name" autocomplete="name"></div> <div class="field"><label>連絡先（メール / 電話）</label><input class="input" id="j-contact" autocomplete="email"></div> <button class="btn btn-primary" type="submit" style="width:100%">申し込む</button> <div class="formmsg" id="joinMsg" role="status" aria-live="polite"></div> </form> </div>`} </section> ` })}`}  `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" })}`, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(["<script", '>\n    (function () {\n      const f = document.getElementById("joinForm");\n      if (!f) return;\n      const msg = document.getElementById("joinMsg");\n      f.addEventListener("submit", async (e) => {\n        e.preventDefault();\n        const name = document.getElementById("j-name").value.trim();\n        if (!name) { msg.textContent = "お名前を入力してください。"; msg.classList.add("err"); return; }\n        const btn = f.querySelector("button"); btn.disabled = true; msg.classList.remove("err"); msg.textContent = "送信しています…";\n        try {\n          const r = await fetch("/api/site/join", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, contact: document.getElementById("j-contact").value }) });\n          if (r.ok) { msg.classList.remove("err"); msg.textContent = "お申し込みありがとうございます。確認のご連絡をお待ちください。"; f.reset(); }\n          else { msg.classList.add("err"); msg.textContent = "送信に失敗しました。時間をおいてお試しください。"; }\n        } catch (err) { msg.classList.add("err"); msg.textContent = "通信に失敗しました。"; }\n        finally { btn.disabled = false; }\n      });\n    })();\n  <\/script>'])), addAttribute(Astro2.locals.cspNonce, "nonce")) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/PublicSite.astro", void 0);
export {
  $$PublicSite as $
};
