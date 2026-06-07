globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../chunks/App_BeztdKLb.mjs';
export { renderers } from '../renderers.mjs';

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
  const acc = await import('../chunks/accounting_BOhbglhy.mjs');
  await acc.ensureSeed(env);
  const period = await acc.currentPeriod(env);
  const wallets = await acc.listWallets(env);
  const categories = await acc.listCategories(env);
  const selWallet = Astro2.url.searchParams.get("wallet") ?? wallets[0]?.id ?? "";
  const is = period ? await acc.incomeStatement(env, period.id) : null;
  const book = period && selWallet ? await acc.cashbook(env, period.id, selWallet) : null;
  const ba = period ? await acc.budgetActual(env, period.id) : [];
  const yen = (n) => "\xA5" + n.toLocaleString("ja-JP");
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u4F1A\u8A08", "active": "/accounting" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>会計 <span class="muted" style="font-size:.9rem">${period?.name ?? "\u4F1A\u8A08\u671F\u306A\u3057"}</span></h1> <h2>入出金の登録</h2> <div class="card"> <div class="row"> <div style="flex:1"><label class="muted">日付</label><input id="date" type="date"${addAttribute((/* @__PURE__ */ new Date()).toISOString().slice(0, 10), "value")}></div> <div style="flex:1"><label class="muted">種別</label><select id="kind"><option value="income">収入</option><option value="expense">支出</option><option value="transfer">振替</option></select></div> <div style="flex:1"><label class="muted">口座</label><select id="wallet">${wallets.map((w) => renderTemplate`<option${addAttribute(w.id, "value")}>${w.name}</option>`)}</select></div> </div> <div class="row" style="margin-top:.5rem"> <div id="catBox" style="flex:1"><label class="muted">科目</label><select id="cat">${categories.map((c) => renderTemplate`<option${addAttribute(c.id, "value")}${addAttribute(c.kind, "data-kind")}>${c.name}</option>`)}</select></div> <div id="counterBox" style="flex:1;display:none"><label class="muted">振替先口座</label><select id="counter">${wallets.map((w) => renderTemplate`<option${addAttribute(w.id, "value")}>${w.name}</option>`)}</select></div> <div style="flex:1"><label class="muted">金額</label><input id="amount" type="number" min="1"></div> </div> <div class="field"><label class="muted">摘要</label><input id="desc"></div> <button class="btn btn-primary" id="reg">登録</button> </div> <h2>収支計算書 <a class="btn btn-sm btn-ghost" href="/accounting/export.csv">CSV出力</a></h2> ${is && renderTemplate`<div class="grid"> <div class="table-wrap"><table><thead><tr><th>収入科目</th><th class="r">金額</th></tr></thead><tbody> ${is.income.map((r) => renderTemplate`<tr><td>${r.name}</td><td class="r">${yen(r.amount)}</td></tr>`)} <tr><th>収入合計</th><th class="r">${yen(is.totalIncome)}</th></tr></tbody></table></div> <div class="table-wrap"><table><thead><tr><th>支出科目</th><th class="r">金額</th></tr></thead><tbody> ${is.expense.map((r) => renderTemplate`<tr><td>${r.name}</td><td class="r">${yen(r.amount)}</td></tr>`)} <tr><th>支出合計</th><th class="r">${yen(is.totalExpense)}</th></tr></tbody></table></div> </div>`}${is && renderTemplate`<p><strong>当期収支：${yen(is.totalIncome - is.totalExpense)}</strong></p>`}<h2>出納帳</h2> <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.5rem">${wallets.map((w) => renderTemplate`<a${addAttribute(`btn btn-sm ${w.id === selWallet ? "btn-primary" : "btn-ghost"}`, "class")}${addAttribute(`/accounting?wallet=${w.id}`, "href")}>${w.name}</a>`)}</div> ${book && renderTemplate`<div class="table-wrap"><table> <thead><tr><th>日付</th><th>種別</th><th>摘要</th><th class="r">入金</th><th class="r">出金</th><th class="r">残高</th><th></th></tr></thead> <tbody> ${book.rows.map((t) => {
    const isIn = t.kind === "income" && t.wallet_id === selWallet || t.kind === "transfer" && t.counter_wallet_id === selWallet;
    return renderTemplate`<tr><td>${t.date}</td><td>${t.kind}</td><td>${t.description ?? ""}</td><td class="r">${isIn ? yen(t.amount) : ""}</td><td class="r">${!isIn ? yen(t.amount) : ""}</td><td class="r">${yen(t.running)}</td><td><button class="btn btn-sm btn-danger del"${addAttribute(t.id, "data-del")}>削除</button></td></tr>`;
  })} ${book.rows.length === 0 && renderTemplate`<tr><td colspan="7" class="muted">取引がありません。</td></tr>`} </tbody></table></div>`}<h2>予算実績</h2> <div class="table-wrap"><table><thead><tr><th>科目</th><th class="r">予算</th><th class="r">実績</th><th class="r">差異</th></tr></thead><tbody> ${ba.map((r) => renderTemplate`<tr><td>${r.name}</td><td class="r">${yen(r.budget)}</td><td class="r">${yen(r.actual)}</td><td class="r">${yen(r.budget - r.actual)}</td></tr>`)} </tbody></table></div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    const kind=document.getElementById("kind"),catBox=document.getElementById("catBox"),counterBox=document.getElementById("counterBox");\n    function sync(){const t=kind.value;catBox.style.display=t==="transfer"?"none":"";counterBox.style.display=t==="transfer"?"":"none";\n      for(const o of document.querySelectorAll("#cat option")){const k=o.dataset.kind;o.hidden=(t==="income"&&k!=="income")||(t==="expense"&&k!=="expense");}\n      const v=[...document.querySelectorAll("#cat option")].find(o=>!o.hidden);if(v)v.selected=true;}\n    kind.addEventListener("change",sync);sync();\n    document.getElementById("reg").addEventListener("click",async(e)=>{\n      const body={date:document.getElementById("date").value,kind:kind.value,wallet_id:document.getElementById("wallet").value,category_id:document.getElementById("cat").value,counter_wallet_id:document.getElementById("counter").value,amount:document.getElementById("amount").value,description:document.getElementById("desc").value};\n      const r=await window.bo.api("/api/tx",body,{btn:e.currentTarget,successMsg:"\u767B\u9332\u3057\u307E\u3057\u305F"});\n      if(r.ok)setTimeout(()=>location.reload(),600);\n    });\n    document.querySelectorAll(".del[data-del]").forEach(b=>b.addEventListener("click",async(e)=>{\n      if(!confirm("\u3053\u306E\u53D6\u5F15\u3092\u524A\u9664\uFF08\u30B4\u30DF\u7BB1\u3078\uFF09\u3057\u307E\u3059\u304B\uFF1F"))return;\n      const r=await window.bo.api("/api/tx",{_action:"delete",id:e.target.dataset.del},{btn:e.target,successMsg:"\u524A\u9664\u3057\u307E\u3057\u305F"});\n      if(r.ok)setTimeout(()=>location.reload(),500);\n    }));\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/accounting/index.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/accounting/index.astro";
const $$url = "/accounting";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
