globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, F as Fragment, b as addAttribute } from '../chunks/astro/server_DRI6mTND.mjs';
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
const $$Gmail = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Gmail;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const isAdmin = ses.role === "admin" && ses.ctx === "org";
  const { cachedEntitlement } = await import('../chunks/client_DjSYVqc9.mjs');
  const hasPro = atLeast(await cachedEntitlement(env), "pro");
  const { googleConfigured, googleStatus, SCOPE_GROUPS } = await import('../chunks/google__L4vnQZx.mjs');
  let configured = false, connected = false;
  let granted = [];
  let lastUsed = null;
  if (hasPro) {
    configured = await googleConfigured(env);
    const st = await googleStatus(env);
    connected = st.connected;
    granted = st.groups;
    lastUsed = st.lastUsed;
  }
  const fmtTs = (s) => s ? new Date(s * 1e3).toISOString().slice(0, 16).replace("T", " ") + " UTC" : "\u2014";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "Gmail", "active": "/gmail" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Gmail 連携</h1> ${!hasPro && renderTemplate`<div class="card"> <div class="banner banner-warn">この機能は <strong>Pro 以上</strong>のプランで利用できます。</div> <p class="muted">Gmail のメールを一覧・検索・閲覧・送信できます。AIチャットから操作します。</p> <a class="btn btn-primary" href="/billing">プラン・課金へ</a> </div>`}${hasPro && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${!configured && renderTemplate`<div class="banner banner-warn">Google OAuth が未設定のため連携できません。${isAdmin ? renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate`管理者は <a href="/settings/google-setup">Google 連携セットアップ</a> から設定できます。` })}` : "\u7BA1\u7406\u8005\u306B\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"}</div>`}<div class="card"> ${(() => {
    const linked = granted.includes("gmail_read") || granted.includes("gmail_send");
    return renderTemplate`<p>Gmail 連携：<span class="pill"${addAttribute(linked ? "\u9023\u643A\u6E08\u307F" : "\u672A\u9023\u643A", "aria-label")}>${linked ? "\u9023\u643A\u6E08\u307F" : "\u672A\u9023\u643A"}</span></p>`;
  })()} <p class="muted" style="font-size:.85rem">Gmail の <strong>閲覧</strong>と<strong>送信</strong>は Google の Restricted scope（審査対象）です。既定では付与されず、下のボタンで明示的に有効化したときのみ要求します。${connected && renderTemplate`<span> 最終利用：${fmtTs(lastUsed)}</span>`}</p> ${connected && renderTemplate`<p class="muted" style="font-size:.8rem">付与済み：${granted.length ? granted.map((g) => SCOPE_GROUPS[g]?.label).join(" / ") : "\uFF08\u4E0D\u660E\uFF09"}</p>`}  <div class="banner banner-warn" style="margin-top:.5rem"> <strong>連携前にご確認ください</strong> <ul style="margin:.4rem 0 0;padding-left:1.2rem;font-size:.85rem"> <li>アクセス範囲：${SCOPE_GROUPS.gmail_read.risk}</li> <li>送信を含める場合：${SCOPE_GROUPS.gmail_send.risk}</li> <li>外部送信：閲覧/送信の操作時、対象メール本文・添付・メタデータが Google API（米国等・越境の可能性）へ送信されます。AIに依頼した場合は要約等のためAI提供元（Gemini/Claude）にも送信され得ます。</li> <li>費用：Gmail API 自体は無料枠内。AI処理を伴う場合は <a href="/usage">使用量・上限</a> の従量・上限が適用されます。</li> <li>保存・削除：取得データの扱いは <a href="/legal">外部送信・AI利用の開示</a> を参照。連携は下の「全解除」でいつでも失効できます。</li> </ul> <p class="muted" style="font-size:.8rem;margin:.4rem 0 0">Google ユーザーデータの利用は Google API Services User Data Policy（Limited Use 要件含む）に準拠します。</p> </div> ${isAdmin && configured && renderTemplate`<div class="row"> <a class="btn btn-primary" href="/api/google/start?groups=gmail_read">閲覧のみ連携</a> <a class="btn btn-primary" href="/api/google/start?groups=gmail_read,gmail_send">閲覧＋送信を連携</a> ${connected && renderTemplate`<button class="btn" id="gdisc">連携を全解除</button>`} </div>`} ${!isAdmin && renderTemplate`<p class="muted">連携・解除の操作は管理者のみ可能です。</p>`} </div> ${connected && renderTemplate`<div class="card"> <h2 style="margin-top:0;border:0">使い方</h2> <p class="muted">メールの確認・検索・送信は AIチャットに依頼してください。例：</p> <ul class="muted"> <li>「未読メールを一覧して」</li> <li>「山田さんからの先週のメールを探して」</li> <li>「○○さんに会議のお礼メールを送って」</li> </ul> </div>`}` })}`} `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    const d = document.getElementById("gdisc");\n    if (d) d.addEventListener("click", async (e) => {\n      const r = await window.bo.api("/api/google", { _action: "disconnect" }, { btn: e.currentTarget, successMsg: "\u9023\u643A\u3092\u89E3\u9664\u3057\u307E\u3057\u305F" });\n      if (r.ok) setTimeout(() => location.reload(), 600);\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/gmail.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/gmail.astro";
const $$url = "/gmail";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Gmail,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
