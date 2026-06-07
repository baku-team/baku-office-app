globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, p as Fragment, g as addAttribute } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../chunks/App_BeztdKLb.mjs';
import '../chunks/crypto_BhRWVEcj.mjs';
import { a as atLeast } from '../chunks/types_sPQFPjY_.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Usage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Usage;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_ujH5pbJJ.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { cachedEntitlement } = await import('../chunks/client_KUuDosgV.mjs');
  const hasPlus = atLeast(await cachedEntitlement(env), "plus");
  const isAdmin = ses.role === "admin" && ses.ctx === "org";
  const { dailyTotals, monthTotals, todayTotals, getLimits, resetTimes, PROVIDER_LABEL, USAGE_PROVIDERS } = await import('../chunks/usage_CVlW6nuV.mjs');
  let daily = [];
  let month = {};
  let today = {};
  let limits = {};
  let reset = { daily: "", monthly: "" };
  if (hasPlus) {
    daily = await dailyTotals(env, 14);
    month = await monthTotals(env);
    today = await todayTotals(env);
    limits = await getLimits(env);
    reset = resetTimes();
  }
  const maxDay = Math.max(1, ...daily.map((d) => d.count));
  const rows = USAGE_PROVIDERS.map((p) => ({ p, label: PROVIDER_LABEL[p] ?? p, today: today[p] ?? 0, month: month[p] ?? 0, lim: limits[p] ?? {} }));
  const overs = rows.filter((r) => r.lim.monthlyCap && r.month >= (r.lim.monthlyCap ?? 0));
  const warns = rows.filter((r) => r.lim.freeQuota && r.today >= (r.lim.freeQuota ?? 0) * 0.8 && r.today < (r.lim.monthlyCap ?? Infinity));
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "API\u4F7F\u7528\u91CF", "active": "/usage", "data-astro-cid-cq575q6v": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-cq575q6v>API使用量</h1> ${!hasPlus && renderTemplate`<div class="card" data-astro-cid-cq575q6v> <div class="banner banner-warn" data-astro-cid-cq575q6v>この機能は <strong data-astro-cid-cq575q6v>Plus 以上</strong>のプランで利用できます。</div> <p class="muted" data-astro-cid-cq575q6v>AI機能・各APIの利用回数を数値とグラフで確認し、無料枠アラートや従量上限を設定できます。</p> <a class="btn btn-primary" href="/billing" data-astro-cid-cq575q6v>プラン・課金へ</a> </div>`}${hasPlus && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <p class="muted" data-astro-cid-cq575q6v>AI機能・各APIの利用回数（リクエスト単位）。無料枠の目安・従量上限を設定できます（カウントはUTC日次）。</p> ${overs.map((r) => renderTemplate`<div class="banner banner-danger" data-astro-cid-cq575q6v>⛔ <strong data-astro-cid-cq575q6v>${r.label}</strong> が当月の上限（${r.lim.monthlyCap}）に達しました。${r.lim.onExceed === "switch_free" ? "\u7121\u6599\u30A8\u30F3\u30B8\u30F3\uFF08Gemini\uFF09\u3078\u81EA\u52D5\u5207\u66FF\u3055\u308C\u307E\u3059\u3002" : "\u8A72\u5F53API\u306E\u5229\u7528\u3092\u4E00\u6642\u505C\u6B62\u3057\u307E\u3059\u3002"} リセット：${reset.monthly}</div>`)}${warns.map((r) => renderTemplate`<div class="banner banner-warn" data-astro-cid-cq575q6v>⚠️ <strong data-astro-cid-cq575q6v>${r.label}</strong> が本日の無料枠（${r.lim.freeQuota}）に近づいています（本日 ${r.today}）。リセット：${reset.daily}</div>`)}<h2 data-astro-cid-cq575q6v>直近14日の利用</h2> <div class="card" data-astro-cid-cq575q6v> <div class="bars" data-astro-cid-cq575q6v> ${daily.map((d) => renderTemplate`<div class="bar"${addAttribute(`${d.day}: ${d.count}`, "title")} data-astro-cid-cq575q6v> <div class="fill"${addAttribute(`height:${Math.round(d.count / maxDay * 100)}%`, "style")} data-astro-cid-cq575q6v></div> <div class="bl" data-astro-cid-cq575q6v>${d.day.slice(5)}</div> </div>`)} </div> <p class="muted" style="margin:.4rem 0 0" data-astro-cid-cq575q6v>14日合計：${daily.reduce((a, d) => a + d.count, 0)} 回</p> </div> <h2 data-astro-cid-cq575q6v>プロバイダ別</h2> <div class="banner banner-info" data-astro-cid-cq575q6v>リセット：無料枠＝<strong data-astro-cid-cq575q6v>${reset.daily}</strong>（日次）／上限＝<strong data-astro-cid-cq575q6v>${reset.monthly}</strong>（月次）</div> <div class="table-wrap" data-astro-cid-cq575q6v><table data-astro-cid-cq575q6v> <thead data-astro-cid-cq575q6v><tr data-astro-cid-cq575q6v><th data-astro-cid-cq575q6v>API</th><th data-astro-cid-cq575q6v>本日</th><th data-astro-cid-cq575q6v>当月</th><th data-astro-cid-cq575q6v>無料枠/日</th><th data-astro-cid-cq575q6v>当月上限</th><th data-astro-cid-cq575q6v>超過時</th></tr></thead> <tbody data-astro-cid-cq575q6v> ${rows.map((r) => renderTemplate`<tr${addAttribute(r.p, "data-prov")} data-astro-cid-cq575q6v> <td data-astro-cid-cq575q6v>${r.label}</td> <td${addAttribute(r.lim.freeQuota && r.today >= (r.lim.freeQuota ?? 0) * 0.8 ? "u-warn" : "", "class")} data-astro-cid-cq575q6v>${r.today}${r.lim.freeQuota ? ` / ${r.lim.freeQuota}` : ""}</td> <td${addAttribute(r.lim.monthlyCap && r.month >= (r.lim.monthlyCap ?? 0) ? "u-over" : "", "class")} data-astro-cid-cq575q6v>${r.month}${r.lim.monthlyCap ? ` / ${r.lim.monthlyCap}` : ""}</td> <td data-astro-cid-cq575q6v><input class="lim-fq" type="number" min="0"${addAttribute(r.lim.freeQuota ?? "", "value")} placeholder="—"${addAttribute(!isAdmin, "disabled")} style="width:90px" data-astro-cid-cq575q6v></td> <td data-astro-cid-cq575q6v><input class="lim-mc" type="number" min="0"${addAttribute(r.lim.monthlyCap ?? "", "value")} placeholder="—"${addAttribute(!isAdmin, "disabled")} style="width:90px" data-astro-cid-cq575q6v></td> <td data-astro-cid-cq575q6v><select class="lim-oe"${addAttribute(!isAdmin, "disabled")} data-astro-cid-cq575q6v><option value="pause"${addAttribute(r.lim.onExceed !== "switch_free", "selected")} data-astro-cid-cq575q6v>一時停止</option><option value="switch_free"${addAttribute(r.lim.onExceed === "switch_free", "selected")} data-astro-cid-cq575q6v>無料(Gemini)へ</option></select></td> </tr>`)} </tbody> </table></div> ${isAdmin && renderTemplate`<button class="btn btn-primary" id="saveLimits" data-astro-cid-cq575q6v>上限を保存</button>`}${!isAdmin && renderTemplate`<p class="muted" data-astro-cid-cq575q6v>上限の変更は管理者のみ可能です。</p>`} `, "scripts": async ($$result3) => renderTemplate(_a || (_a = __template(['<script slot="scripts">\n        const btn = document.getElementById("saveLimits");\n        if (btn) btn.addEventListener("click", async (e) => {\n          const limits = {};\n          document.querySelectorAll("tr[data-prov]").forEach((tr) => {\n            const fq = tr.querySelector(".lim-fq").value;\n            const mc = tr.querySelector(".lim-mc").value;\n            limits[tr.dataset.prov] = { freeQuota: fq ? Number(fq) : 0, monthlyCap: mc ? Number(mc) : 0, onExceed: tr.querySelector(".lim-oe").value };\n          });\n          const r = await window.bo.api("/api/usage", { limits }, { btn: e.currentTarget, successMsg: "\u4E0A\u9650\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });\n          if (r.ok) setTimeout(() => location.reload(), 600);\n        });\n      <\/script>']))) })}`}` })} `;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/usage.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/usage.astro";
const $$url = "/usage";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Usage,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
