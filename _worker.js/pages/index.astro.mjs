globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, n as renderSlot, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../chunks/App_BeztdKLb.mjs';
import '../chunks/crypto_BhRWVEcj.mjs';
import { p as planLabel } from '../chunks/types_sPQFPjY_.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const mods = /* #__PURE__ */ Object.assign({});
const keyOf = (name) => `/src/overrides/${name}.astro`;
function overrideComponent(name) {
  return mods[keyOf(name)]?.default ?? null;
}

const $$Astro$1 = createAstro();
const $$Slot = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Slot;
  const { name } = Astro2.props;
  const Override = overrideComponent(name);
  return renderTemplate`${Override ? renderTemplate`${renderComponent($$result, "Override", Override, {})}` : renderTemplate`${renderSlot($$result, $$slots["default"])}`}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/components/Slot.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_ujH5pbJJ.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { pollHost, cachedEntitlement, APP_VERSION } = await import('../chunks/client_KUuDosgV.mjs');
  const { cmpVersion } = await import('../chunks/update_BZyL1cOo.mjs');
  await import('../chunks/index_C4EjYe4c.mjs').then(n => n.i);
  const { appCatalog, installedAppIds } = await import('../chunks/apps_BKVIiywM.mjs');
  const _inst = new Set(await installedAppIds(Astro2.locals.ctx).catch(() => []));
  const _apps = appCatalog().filter((a) => _inst.has(a.id)).map((a) => ({ id: a.id, version: a.version }));
  const check = await pollHost(env, Astro2.url.origin, _apps);
  const entitlement = check?.entitlement ?? await cachedEntitlement(env);
  const updateAvailable = !!check && cmpVersion(check.latestVersion, APP_VERSION) > 0;
  const isOrgAdmin = ses.role === "admin" && ses.ctx === "org";
  const { getStorageUsage, fmtBytes } = await import('../chunks/storage-usage_Zli-bXJH.mjs');
  const storage = await getStorageUsage(env);
  const pct = (u, l) => u < 0 || l <= 0 ? 0 : Math.min(100, Math.round(u / l * 100));
  const hintText = { paid: "\u9AD8\u5EA6\u306A\u30AA\u30D7\u30B7\u30E7\u30F3 \u2192 Workers Paid \u3067\u4E0A\u9650\u3092\u62E1\u5F35\u3067\u304D\u307E\u3059\u3002", r2: "\u9AD8\u5EA6\u306A\u30AA\u30D7\u30B7\u30E7\u30F3\u3067 R2 \u3092\u6709\u52B9\u5316\u3059\u308B\u3068\u5927\u5BB9\u91CF\u306B\u5BFE\u5FDC\u3067\u304D\u307E\u3059\u3002", drive: "Google \u30C9\u30E9\u30A4\u30D6\u306E\u7A7A\u304D\u5BB9\u91CF\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002", none: "" };
  const nearFull = storage.filter((s) => s.enabled && s.used >= 0 && pct(s.used, s.limit) >= 80);
  let balance = 0;
  try {
    balance = (await env.DB.prepare("SELECT COALESCE(SUM(opening_balance),0) AS b FROM wallets").first())?.b ?? 0;
  } catch {
  }
  const notices = check?.notices ?? [];
  const yen = (n) => "\xA5" + n.toLocaleString("ja-JP");
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u30DB\u30FC\u30E0", "active": "/", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Slot", $$Slot, { "name": "home-hero", "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<h1 data-astro-cid-j7pv25f6>ホーム</h1> <p class="muted" data-astro-cid-j7pv25f6>プラン：<span class="pill" data-astro-cid-j7pv25f6>${planLabel(entitlement)}</span> ／ ${check ? "\u30DB\u30B9\u30C8\u758E\u901AOK" : "\u30AA\u30D5\u30E9\u30A4\u30F3\uFF08\u30AD\u30E3\u30C3\u30B7\u30E5\u8868\u793A\uFF09"}</p> ${notices.map((n) => renderTemplate`<div${addAttribute(`banner ${n.severity === "critical" ? "banner-danger" : n.severity === "important" ? "banner-warn" : "banner-info"}`, "class")}${addAttribute(n.severity, "data-sev")}${addAttribute(n.id, "data-id")} data-astro-cid-j7pv25f6>${n.body}</div>`)}${updateAvailable && renderTemplate`<div class="banner banner-warn" data-astro-cid-j7pv25f6>🔔 新しいバージョン <strong data-astro-cid-j7pv25f6>${check?.latestVersion}</strong> があります（現在 ${APP_VERSION}）。${isOrgAdmin ? renderTemplate`<a href="/settings/update" data-astro-cid-j7pv25f6>更新する</a>` : "\u7BA1\u7406\u8005\u306B\u30A2\u30D7\u30EA\u306E\u66F4\u65B0\u3092\u3054\u4F9D\u983C\u304F\u3060\u3055\u3044\u3002"}</div>`}<div class="grid" data-astro-cid-j7pv25f6> <div class="card" data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>口座残高（期首合計）</div><div class="num" data-astro-cid-j7pv25f6>${yen(balance)}</div></div> <div class="card" data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>当月収支</div><div class="num" data-astro-cid-j7pv25f6>¥0</div><div class="muted" data-astro-cid-j7pv25f6>会計で登録</div></div> <div class="card" data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>未処理伝票</div><div class="num" data-astro-cid-j7pv25f6>0</div></div> <div class="card" data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>プラン / ライセンス</div><div class="num" style="font-size:1.1rem" data-astro-cid-j7pv25f6>${planLabel(entitlement)}</div></div> </div> <h2 data-astro-cid-j7pv25f6>ストレージ使用量</h2> ${nearFull.map((s) => renderTemplate`<div class="banner banner-warn" data-astro-cid-j7pv25f6>⚠️ <strong data-astro-cid-j7pv25f6>${s.label}</strong> が上限の ${pct(s.used, s.limit)}% に達しています。${hintText[s.hint]}</div>`)}<div class="grid" data-astro-cid-j7pv25f6> ${storage.map((s) => renderTemplate`<div class="card" data-astro-cid-j7pv25f6> <div class="label" data-astro-cid-j7pv25f6>${s.label}${!s.enabled && (s.key === "r2" ? "\uFF08\u672A\u4F7F\u7528\uFF09" : s.key === "drive" ? "\uFF08\u672A\u9023\u643A\uFF09" : "")}</div> <div class="gauge" data-astro-cid-j7pv25f6><div${addAttribute(`gfill ${pct(s.used, s.limit) >= 80 ? "hot" : ""}`, "class")}${addAttribute(`width:${pct(s.used, s.limit)}%`, "style")} data-astro-cid-j7pv25f6></div></div> <div class="muted" style="font-size:.82rem;margin-top:4px" data-astro-cid-j7pv25f6>${s.used < 0 ? "\u8A08\u6E2C\u4E0D\u53EF" : `${fmtBytes(s.used)} / ${fmtBytes(s.limit)}\uFF08${pct(s.used, s.limit)}%\uFF09`}</div> ${(s.hint === "paid" || s.hint === "r2") && renderTemplate`<div class="muted" style="font-size:.74rem;margin-top:2px" data-astro-cid-j7pv25f6><a href="/settings/advanced" data-astro-cid-j7pv25f6>${s.hint === "r2" ? "R2 \u3092\u6709\u52B9\u5316" : "Workers Paid \u3067\u62E1\u5F35"}</a></div>`} ${s.key === "drive" && !s.enabled && renderTemplate`<div class="muted" style="font-size:.74rem;margin-top:2px" data-astro-cid-j7pv25f6><a href="/drive" data-astro-cid-j7pv25f6>連携する</a></div>`} </div>`)} </div> <h2 data-astro-cid-j7pv25f6>できること</h2> <div class="grid" data-astro-cid-j7pv25f6> <a class="card" href="/accounting" style="text-decoration:none;color:inherit" data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>会計</strong><div class="muted" data-astro-cid-j7pv25f6>入出金・出納帳・収支・CSV</div></a> <a class="card" href="/files" style="text-decoration:none;color:inherit" data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>ファイル</strong><div class="muted" data-astro-cid-j7pv25f6>アップロード・共有</div></a> <a class="card" href="/minutes" style="text-decoration:none;color:inherit" data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>議事録</strong><div class="muted" data-astro-cid-j7pv25f6>作成・一覧</div></a> <a class="card" href="/settings/keys" style="text-decoration:none;color:inherit" data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>連携設定</strong><div class="muted" data-astro-cid-j7pv25f6>Gemini/LINE/Claude</div></a> </div>  <div class="modal" id="critModal" data-astro-cid-j7pv25f6><div class="box" data-astro-cid-j7pv25f6><h2 style="margin-top:0;border:0" data-astro-cid-j7pv25f6>重要なお知らせ</h2><div id="critBody" data-astro-cid-j7pv25f6></div><button class="btn btn-primary" id="critAck" style="margin-top:1rem" data-astro-cid-j7pv25f6>確認しました</button></div></div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template([`<script>
    const crit = [...document.querySelectorAll('.banner[data-sev="critical"]')].filter((n) => !localStorage.getItem("ack:" + n.dataset.id));
    if (crit.length) {
      const m = document.getElementById("critModal");
      document.getElementById("critBody").innerHTML = crit.map((n) => "<p>" + n.textContent + "</p>").join("");
      m.classList.add("open");
      document.getElementById("critAck").onclick = () => { crit.forEach((n) => localStorage.setItem("ack:" + n.dataset.id, "1")); m.classList.remove("open"); window.bo.toast("\u78BA\u8A8D\u3057\u307E\u3057\u305F"); };
    }
  <\/script>`]))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
