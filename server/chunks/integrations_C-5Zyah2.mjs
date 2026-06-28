globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BajPpY5_.mjs";
import { r as renderTemplate, m as maybeRenderHead, a as addAttribute } from "./sequence_2tuU57vh.mjs";
import { r as renderComponent } from "./worker-entry_D-mU8j3M.mjs";
import { env } from "cloudflare:workers";
import { $ as $$App } from "./App_SqErgRAS.mjs";
import "./stripe_r-RFTlbb.mjs";
import { a as atLeast } from "./types_BVJxqWI9.mjs";
const prerender = false;
const $$Integrations = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Integrations;
  const { getSession } = await import("./auth_DqeGQnea.mjs");
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  if (ses.role !== "admin") return Astro2.redirect("/forbidden", 302);
  const { cachedEntitlement } = await import("./client_rF0xK8SJ.mjs");
  const entitlement = await cachedEntitlement(env).catch(() => "free");
  const hasPlus = atLeast(entitlement, "plus");
  const items = [
    { href: "/settings/keys", label: "AI APIキー（Gemini / Claude / ChatGPT）", desc: "1つの欄に貼るだけで種類を自動判定して保存。AI・取り込みの接続設定", show: true },
    { href: "/settings/messaging", label: "外部メッセージ連携（Discord / Slack / LINE）", desc: "受信（話しかけ→応答）と通知（送信先）をサービス別に設定", show: true },
    { href: "/settings/google-setup", label: "Google との連携", desc: "カレンダー・メール・ドライブなどとの連携を手順で案内", show: true },
    { href: "/drive", label: "クラウド保存の連携", desc: "ファイルの同期・バックアップ", show: hasPlus }
  ].filter((i) => i.show);
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "外部サービス設定", "active": "/settings", "denseMobile": true, "data-astro-cid-zuhf7pg4": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-zuhf7pg4>外部サービス設定</h1> <p class="muted" data-astro-cid-zuhf7pg4>AI・チャットツール・Google・クラウド保存など、外部サービスとの接続をここでまとめて設定します。（団体エージェントの公開・他団体連携は「エージェント設定」にあります）</p> <div class="hub-grid" data-astro-cid-zuhf7pg4> ${items.map((i) => renderTemplate`<a class="card link hub-card"${addAttribute(i.href, "href")} data-astro-cid-zuhf7pg4><strong data-astro-cid-zuhf7pg4>${i.label}</strong><span class="muted small" data-astro-cid-zuhf7pg4>${i.desc}</span></a>`)} </div> ` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/integrations.astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/integrations.astro";
const $$url = "/settings/integrations";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Integrations,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
