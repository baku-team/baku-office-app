globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, e as renderSlot, g as createAstro, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
import '../chunks/crypto_D21r3Dwx.mjs';
import { planLabel } from '../chunks/index_Cg172zdv.mjs';
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
  const { getSession } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { pollHost, cachedEntitlement, APP_VERSION } = await import('../chunks/client_DjSYVqc9.mjs');
  const { cmpVersion } = await import('../chunks/update_CTWokLRg.mjs');
  await import('../chunks/index_DDI9b6m9.mjs');
  const { appCatalog, installedAppIds } = await import('../chunks/apps_Bd2BWu4r.mjs');
  const _inst = new Set(await installedAppIds(Astro2.locals.ctx).catch(() => []));
  const _apps = appCatalog().filter((a) => _inst.has(a.id)).map((a) => ({ id: a.id, version: a.version }));
  const check = await pollHost(env, Astro2.url.origin, _apps);
  const entitlement = check?.entitlement ?? await cachedEntitlement(env);
  const updateAvailable = !!check && cmpVersion(check.latestVersion, APP_VERSION) > 0;
  const isOrgAdmin = ses.role === "admin" && ses.ctx === "org";
  const { getStorageUsage, fmtBytes } = await import('../chunks/storage-usage_BcZ2Jp3w.mjs');
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
  const { widgetsOf, enabledParts } = await import('../chunks/parts_BZyWMuJn.mjs');
  const widgetData = [];
  for (const w of widgetsOf(enabledParts([..._inst]))) {
    try {
      widgetData.push({ title: w.title, span: w.span, ...await w.run(Astro2.locals.ctx, ses.uid) });
    } catch {
    }
  }
  const { getHomeLayout, orderedSections, HOME_SECTIONS } = await import('../chunks/home_CyAYEWGZ.mjs');
  const homeLayout = await getHomeLayout(Astro2.locals.ctx).catch(() => null);
  const sections = orderedSections(homeLayout);
  const hiddenSet = new Set(homeLayout?.hidden ?? []);
  const clampSpan = (n) => Math.max(1, Math.min(3, Number(n) || 1));
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u30DB\u30FC\u30E0", "active": "/", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Slot", $$Slot, { "name": "home-hero", "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<div class="row" style="align-items:center;justify-content:space-between" data-astro-cid-j7pv25f6> <h1 style="margin:0" data-astro-cid-j7pv25f6>ホーム</h1> ${isOrgAdmin && renderTemplate`<button class="btn btn-ghost" id="editHome" style="flex:0 0 auto" data-astro-cid-j7pv25f6>ホームを編集</button>`} </div> <p class="muted" data-astro-cid-j7pv25f6>プラン：<span class="pill" data-astro-cid-j7pv25f6>${planLabel(entitlement)}</span> ／ ${check ? "\u30DB\u30B9\u30C8\u758E\u901AOK" : "\u30AA\u30D5\u30E9\u30A4\u30F3\uFF08\u30AD\u30E3\u30C3\u30B7\u30E5\u8868\u793A\uFF09"}</p> <section class="home-fixed" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>お知らせ</h2> ${notices.length === 0 && !updateAvailable && renderTemplate`<p class="muted" data-astro-cid-j7pv25f6>現在、新しいお知らせはありません。</p>`} ${notices.map((n) => renderTemplate`<div${addAttribute(`banner ${n.severity === "critical" ? "banner-danger" : n.severity === "important" ? "banner-warn" : "banner-info"}`, "class")}${addAttribute(n.severity, "data-sev")}${addAttribute(n.id, "data-id")} data-astro-cid-j7pv25f6>${n.body}</div>`)} ${updateAvailable && renderTemplate`<div class="banner banner-warn" data-astro-cid-j7pv25f6>🔔 新しいバージョン <strong data-astro-cid-j7pv25f6>${check?.latestVersion}</strong> があります（現在 ${APP_VERSION}）。${isOrgAdmin ? renderTemplate`<a href="/settings/update" data-astro-cid-j7pv25f6>更新する</a>` : "\u7BA1\u7406\u8005\u306B\u30A2\u30D7\u30EA\u306E\u66F4\u65B0\u3092\u3054\u4F9D\u983C\u304F\u3060\u3055\u3044\u3002"}</div>`} </section> ${sections.map((sec) => sec === "summary" ? renderTemplate`<section data-sec="summary" data-astro-cid-j7pv25f6> <div class="grid" data-astro-cid-j7pv25f6> <div class="card" data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>口座残高（期首合計）</div><div class="num" data-astro-cid-j7pv25f6>${yen(balance)}</div></div> <div class="card" data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>当月収支</div><div class="num" data-astro-cid-j7pv25f6>¥0</div><div class="muted" data-astro-cid-j7pv25f6>会計で登録</div></div> <div class="card" data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>未処理伝票</div><div class="num" data-astro-cid-j7pv25f6>0</div></div> <div class="card" data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>プラン / ライセンス</div><div class="num" style="font-size:1.1rem" data-astro-cid-j7pv25f6>${planLabel(entitlement)}</div></div> </div> </section>` : sec === "widgets" ? widgetData.length > 0 && renderTemplate`<section data-sec="widgets" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>アプリの状況</h2> <div class="grid wgrid" data-astro-cid-j7pv25f6> ${widgetData.map((w) => renderTemplate`<div class="card"${addAttribute(`grid-column:span ${clampSpan(w.span)}`, "style")} data-astro-cid-j7pv25f6><div class="label" data-astro-cid-j7pv25f6>${w.title}</div><div class="num" data-astro-cid-j7pv25f6>${w.value}</div>${w.sub && renderTemplate`<div class="muted" style="font-size:.82rem" data-astro-cid-j7pv25f6>${w.sub}</div>`}</div>`)} </div> </section>` : sec === "storage" ? renderTemplate`<section data-sec="storage" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>ストレージ使用量</h2> ${nearFull.map((s) => renderTemplate`<div class="banner banner-warn" data-astro-cid-j7pv25f6>⚠️ <strong data-astro-cid-j7pv25f6>${s.label}</strong> が上限の ${pct(s.used, s.limit)}% に達しています。${hintText[s.hint]}</div>`)} <div class="grid" data-astro-cid-j7pv25f6> ${storage.map((s) => renderTemplate`<div class="card" data-astro-cid-j7pv25f6> <div class="label" data-astro-cid-j7pv25f6>${s.label}${!s.enabled && (s.key === "r2" ? "\uFF08\u672A\u4F7F\u7528\uFF09" : s.key === "drive" ? "\uFF08\u672A\u9023\u643A\uFF09" : "")}</div> <div class="gauge" data-astro-cid-j7pv25f6><div${addAttribute(`gfill ${pct(s.used, s.limit) >= 80 ? "hot" : ""}`, "class")}${addAttribute(`width:${pct(s.used, s.limit)}%`, "style")} data-astro-cid-j7pv25f6></div></div> <div class="muted" style="font-size:.82rem;margin-top:4px" data-astro-cid-j7pv25f6>${s.used < 0 ? "\u8A08\u6E2C\u4E0D\u53EF" : `${fmtBytes(s.used)} / ${fmtBytes(s.limit)}\uFF08${pct(s.used, s.limit)}%\uFF09`}</div> ${(s.hint === "paid" || s.hint === "r2") && renderTemplate`<div class="muted" style="font-size:.74rem;margin-top:2px" data-astro-cid-j7pv25f6><a href="/settings/advanced" data-astro-cid-j7pv25f6>${s.hint === "r2" ? "R2 \u3092\u6709\u52B9\u5316" : "Workers Paid \u3067\u62E1\u5F35"}</a></div>`} ${s.key === "drive" && !s.enabled && renderTemplate`<div class="muted" style="font-size:.74rem;margin-top:2px" data-astro-cid-j7pv25f6><a href="/drive" data-astro-cid-j7pv25f6>連携する</a></div>`} </div>`)} </div> </section>` : sec === "quicklinks" ? renderTemplate`<section data-sec="quicklinks" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>できること</h2> <div class="grid" data-astro-cid-j7pv25f6> <a class="card" href="/accounting" style="text-decoration:none;color:inherit" data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>会計</strong><div class="muted" data-astro-cid-j7pv25f6>入出金・出納帳・収支・CSV</div></a> <a class="card" href="/files" style="text-decoration:none;color:inherit" data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>ファイル</strong><div class="muted" data-astro-cid-j7pv25f6>アップロード・共有</div></a> <a class="card" href="/minutes" style="text-decoration:none;color:inherit" data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>議事録</strong><div class="muted" data-astro-cid-j7pv25f6>作成・一覧</div></a> <a class="card" href="/apps" style="text-decoration:none;color:inherit" data-astro-cid-j7pv25f6><strong data-astro-cid-j7pv25f6>アプリ</strong><div class="muted" data-astro-cid-j7pv25f6>機能の導入・開発</div></a> </div> </section>` : null)}${isOrgAdmin && renderTemplate`<div class="modal" id="homeModal" data-astro-cid-j7pv25f6><div class="box" data-astro-cid-j7pv25f6> <h2 style="margin-top:0;border:0" data-astro-cid-j7pv25f6>ホームの表示を編集</h2> <p class="muted" style="font-size:.85rem" data-astro-cid-j7pv25f6>セクションの表示/非表示と並び順を変更します（お知らせは固定）。</p> <div id="secList" class="sec-list" data-astro-cid-j7pv25f6> ${HOME_SECTIONS.map((s) => renderTemplate`<div class="sec-row"${addAttribute(s.id, "data-id")} data-astro-cid-j7pv25f6> <label style="flex:1" data-astro-cid-j7pv25f6><input type="checkbox" class="sec-on"${addAttribute(!hiddenSet.has(s.id), "checked")} data-astro-cid-j7pv25f6> ${s.label}</label> <button class="btn btn-sm sec-up" title="上へ" data-astro-cid-j7pv25f6>↑</button> <button class="btn btn-sm sec-down" title="下へ" data-astro-cid-j7pv25f6>↓</button> </div>`)} </div> <div class="row" style="margin-top:1rem" data-astro-cid-j7pv25f6> <button class="btn btn-primary" id="saveHome" style="flex:1" data-astro-cid-j7pv25f6>保存</button> <button class="btn btn-ghost" id="closeHome" style="flex:0 0 auto" data-astro-cid-j7pv25f6>閉じる</button> </div> </div></div>`}<div class="modal" id="critModal" data-astro-cid-j7pv25f6><div class="box" data-astro-cid-j7pv25f6><h2 style="margin-top:0;border:0" data-astro-cid-j7pv25f6>重要なお知らせ</h2><div id="critBody" data-astro-cid-j7pv25f6></div><button class="btn btn-primary" id="critAck" style="margin-top:1rem" data-astro-cid-j7pv25f6>確認しました</button></div></div>   `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template([`<script>
    (function () {
      // \u91CD\u8981\u306A\u304A\u77E5\u3089\u305B\u306E\u78BA\u8A8D\u30E2\u30FC\u30C0\u30EB\u3002
      const crit = [...document.querySelectorAll('.banner[data-sev="critical"]')].filter((n) => !localStorage.getItem("ack:" + n.dataset.id));
      if (crit.length) {
        const m = document.getElementById("critModal");
        document.getElementById("critBody").innerHTML = crit.map((n) => "<p>" + n.textContent + "</p>").join("");
        m.classList.add("open");
        document.getElementById("critAck").onclick = () => { crit.forEach((n) => localStorage.setItem("ack:" + n.dataset.id, "1")); m.classList.remove("open"); window.bo.toast("\u78BA\u8A8D\u3057\u307E\u3057\u305F"); };
      }
      // \u30DB\u30FC\u30E0\u7DE8\u96C6\uFF08\u7BA1\u7406\u8005\u306E\u307F\u8981\u7D20\u304C\u5B58\u5728\uFF09\u3002
      const edit = document.getElementById("editHome");
      const modal = document.getElementById("homeModal");
      if (edit && modal) {
        const list = document.getElementById("secList");
        const refresh = () => list.querySelectorAll(".sec-row").forEach((r) => r.classList.toggle("off", !r.querySelector(".sec-on").checked));
        edit.addEventListener("click", () => { modal.classList.add("open"); refresh(); });
        document.getElementById("closeHome")?.addEventListener("click", () => modal.classList.remove("open"));
        list.querySelectorAll(".sec-row").forEach((row) => {
          row.querySelector(".sec-on")?.addEventListener("change", refresh);
          row.querySelector(".sec-up")?.addEventListener("click", () => { const p = row.previousElementSibling; if (p) list.insertBefore(row, p); });
          row.querySelector(".sec-down")?.addEventListener("click", () => { const n = row.nextElementSibling; if (n) list.insertBefore(n, row); });
        });
        document.getElementById("saveHome")?.addEventListener("click", async (e) => {
          const rows = [...list.querySelectorAll(".sec-row")];
          const order = rows.map((r) => r.dataset.id);
          const hidden = rows.filter((r) => !r.querySelector(".sec-on").checked).map((r) => r.dataset.id);
          const r = await window.bo.api("/api/settings", { _action: "home_layout", layout: { order, hidden } }, { btn: e.currentTarget, successMsg: "\u30DB\u30FC\u30E0\u306E\u8868\u793A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
          if (r.ok) setTimeout(() => location.reload(), 600);
        });
      }
    })();
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
