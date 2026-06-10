globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
import '../chunks/crypto_D21r3Dwx.mjs';
import { atLeast } from '../chunks/index_Cg172zdv.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Calendar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Calendar;
  const env = Astro2.locals.runtime.env;
  const ctx = Astro2.locals.ctx;
  const { getSession } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const isAdmin = ses.role === "admin" && ses.ctx === "org";
  const { cachedEntitlement } = await import('../chunks/client_DjSYVqc9.mjs');
  const hasPro = atLeast(await cachedEntitlement(env), "pro");
  const { googleConfigured, googleStatus } = await import('../chunks/google__L4vnQZx.mjs');
  let configured = false, connected = false, eventsText = "";
  let calGranted = false, lastUsed = null;
  if (hasPro) {
    configured = await googleConfigured(env);
    const st = await googleStatus(env);
    connected = st.connected;
    calGranted = st.groups.includes("calendar");
    lastUsed = st.lastUsed;
    if (connected) {
      const { listEvents } = await import('../chunks/calendar_BFI86ISN.mjs');
      eventsText = await listEvents(ctx, { max: 20 });
    }
  }
  const fmtTs = (s) => s ? new Date(s * 1e3).toISOString().slice(0, 16).replace("T", " ") + " UTC" : "\u2014";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u30AB\u30EC\u30F3\u30C0\u30FC", "active": "/calendar" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>カレンダー連携</h1> ${!hasPro && renderTemplate`<div class="card"> <div class="banner banner-warn">この機能は <strong>Pro 以上</strong>のプランで利用できます。</div> <p class="muted">Google カレンダーの予定を閲覧・作成（Meet付き会議の発行）・編集・削除できます。AIチャットからも操作できます。</p> <a class="btn btn-primary" href="/billing">プラン・課金へ</a> </div>`}${hasPro && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${!configured && renderTemplate`<div class="banner banner-warn">Google OAuth が未設定のため連携できません。${isAdmin ? renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate`管理者は <a href="/settings/google-setup">Google 連携セットアップ</a> から設定できます。` })}` : "\u7BA1\u7406\u8005\u306B\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"}</div>`}<div class="card"> <p>カレンダー連携：<span class="pill">${calGranted ? "\u9023\u643A\u6E08\u307F" : "\u672A\u9023\u643A"}</span> ${connected && renderTemplate`<span class="muted" style="font-size:.8rem">最終利用：${fmtTs(lastUsed)}</span>`}</p> ${isAdmin && configured && renderTemplate`<div class="row"> <a class="btn btn-primary" href="/api/google/start?groups=calendar">${calGranted ? "\u518D\u9023\u643A" : "\u30AB\u30EC\u30F3\u30C0\u30FC\u3092\u9023\u643A"}</a> ${connected && renderTemplate`<button class="btn" id="gdisc">連携を全解除</button>`} </div>`} ${!isAdmin && renderTemplate`<p class="muted">連携・解除の操作は管理者のみ可能です。</p>`} </div> ${connected && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` <h2>今後の予定</h2> <div class="card"><pre style="white-space:pre-wrap;font-size:.85rem;margin:0">${eventsText || "\u4E88\u5B9A\u306F\u3042\u308A\u307E\u305B\u3093\u3002"}</pre></div> <p class="muted">予定の作成・編集・Meet付き会議の発行は、AIチャットに「来週月曜10時に定例会議をMeet付きで作成して」のように依頼してください。</p> ` })}`}` })}`} `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    const d = document.getElementById("gdisc");\n    if (d) d.addEventListener("click", async (e) => {\n      const r = await window.bo.api("/api/google", { _action: "disconnect" }, { btn: e.currentTarget, successMsg: "\u9023\u643A\u3092\u89E3\u9664\u3057\u307E\u3057\u305F" });\n      if (r.ok) setTimeout(() => location.reload(), 600);\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/calendar.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/calendar.astro";
const $$url = "/calendar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calendar,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
