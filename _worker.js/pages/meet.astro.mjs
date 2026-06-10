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
const $$Meet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Meet;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const isAdmin = ses.role === "admin" && ses.ctx === "org";
  const { cachedEntitlement } = await import('../chunks/client_DjSYVqc9.mjs');
  const hasPro = atLeast(await cachedEntitlement(env), "pro");
  const { googleConfigured, googleStatus } = await import('../chunks/google__L4vnQZx.mjs');
  let configured = false, connected = false;
  let meetGranted = false, lastUsed = null;
  let recs = [];
  if (hasPro) {
    configured = await googleConfigured(env);
    const st = await googleStatus(env);
    connected = st.connected;
    meetGranted = st.groups.includes("meet");
    lastUsed = st.lastUsed;
    recs = (await env.DB.prepare("SELECT id,title,summary,actions,created_at FROM meet_records ORDER BY created_at DESC LIMIT 50").all()).results;
  }
  const fmtDate = (s) => new Date(s * 1e3).toISOString().slice(0, 16).replace("T", " ");
  const parseActions = (s) => {
    try {
      const v = JSON.parse(s ?? "[]");
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  };
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "Meet\u8B70\u4E8B\u9332", "active": "/meet" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Google Meet 議事録（会議後処理）</h1> ${!hasPro && renderTemplate`<div class="card"> <div class="banner banner-warn">この機能は <strong>Pro 以上</strong>のプランで利用できます。</div> <p class="muted">会議後に Google Meet のトランスクリプトから議事録要約を作成し、ナレッジ保存・タスク化します（リアルタイム参加はしません）。</p> <a class="btn btn-primary" href="/billing">プラン・課金へ</a> </div>`}${hasPro && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${!configured && renderTemplate`<div class="banner banner-warn">Google OAuth が未設定のため連携できません。${isAdmin ? renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate`管理者は <a href="/settings/google-setup">Google 連携セットアップ</a> から設定できます。` })}` : "\u7BA1\u7406\u8005\u306B\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"}</div>`}<div class="card"> <p>Meet 連携：<span class="pill">${meetGranted ? "\u9023\u643A\u6E08\u307F" : "\u672A\u9023\u643A"}</span> ${connected && lastUsed && renderTemplate`<span class="muted" style="font-size:.8rem">最終利用：${fmtDate(lastUsed)} UTC</span>`}</p> <p class="muted" style="font-size:.85rem">Meet 会議の発行にはカレンダー権限も必要です（同時に要求します）。</p> ${isAdmin && configured && renderTemplate`<div class="row"> <a class="btn btn-primary" href="/api/google/start?groups=meet,calendar">${meetGranted ? "\u518D\u9023\u643A" : "Meet \u3092\u9023\u643A"}</a> ${connected && renderTemplate`<button class="btn" id="gdisc">連携を全解除</button>`} </div>`} ${!isAdmin && renderTemplate`<p class="muted">連携・解除の操作は管理者のみ可能です。</p>`} </div> ${connected && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` <div class="card"> <p class="muted">AIチャットに「最近の会議を一覧して」「この会議を要約して議事録にして」と依頼すると、トランスクリプトから議事録を作成し、ナレッジ保存とアクションのリマインダ登録を行います。<br>※ 取得できるのは Meet の<strong>文字起こしが有効</strong>な会議のみです。</p> </div> <h2>作成済みの議事録</h2> ${recs.length === 0 && renderTemplate`<div class="card muted">まだ議事録はありません。会議後に AIチャットから要約を依頼してください。</div>`}${recs.map((r) => renderTemplate`<div class="card"> <strong>${r.title ?? "(\u7121\u984C)"}</strong> <span class="muted" style="font-size:.75rem">${fmtDate(r.created_at)}</span> <pre style="white-space:pre-wrap;font-size:.85rem">${(r.summary ?? "").slice(0, 1200)}</pre> ${parseActions(r.actions).length > 0 && renderTemplate`<details> <summary class="muted" style="font-size:.8rem">アクションアイテム（${parseActions(r.actions).length}）</summary> <ul>${parseActions(r.actions).map((a) => renderTemplate`<li>${a.content}${a.due ? `\uFF08\u671F\u9650 ${a.due}\uFF09` : ""}</li>`)}</ul> </details>`} </div>`)}` })}`}` })}`} `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    const d = document.getElementById("gdisc");\n    if (d) d.addEventListener("click", async (e) => {\n      const r = await window.bo.api("/api/google", { _action: "disconnect" }, { btn: e.currentTarget, successMsg: "\u9023\u643A\u3092\u89E3\u9664\u3057\u307E\u3057\u305F" });\n      if (r.ok) setTimeout(() => location.reload(), 600);\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/meet.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/meet.astro";
const $$url = "/meet";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Meet,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
