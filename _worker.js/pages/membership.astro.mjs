globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, b as addAttribute, s as spreadAttributes } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Membership = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Membership;
  const env = Astro2.locals.runtime.env;
  const { getSession, canAccess } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses || ses.ctx !== "org") return Astro2.redirect("/login", 302);
  const canEdit = canAccess(ses.role, "accounting");
  const { listMembers, memberStats, FEE_STATUSES, FEE_LABEL } = await import('../chunks/membership_uodjYAu6.mjs');
  const q = Astro2.url.searchParams.get("q") ?? "";
  const members = await listMembers(env, q);
  const stats = await memberStats(env);
  const opt = (cur, v) => ({ value: v, selected: cur === v });
  const fmt = (s) => s ? new Date(s * 1e3).toISOString().slice(0, 10) : "\u2014";
  const cols = canEdit ? 7 : 6;
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u4F1A\u54E1\u7BA1\u7406", "active": "/membership" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>会員管理</h1> <p class="muted">会費を払う団体会員の名簿。氏名・連絡先・会費支払状況・支払い日時・任意項目を管理できます（全プランで利用可）。</p> <div class="grid"> <div class="card"><div class="label">会員数</div><div class="num">${stats.total}</div></div> <div class="card"><div class="label">支払済</div><div class="num">${stats.paid}</div></div> <div class="card"><div class="label">未払い</div><div class="num">${stats.unpaid}</div></div> </div> ${canEdit && renderTemplate`<div class="card"> <h2 style="margin-top:0;border:0">会員を追加</h2> <div class="row"><input id="m-name" placeholder="氏名"><input id="m-contact" placeholder="連絡先（電話/メール）"></div> <div class="row"><select id="m-fee">${FEE_STATUSES.map((s) => renderTemplate`<option${addAttribute(s, "value")}>${FEE_LABEL[s]}</option>`)}</select><input id="m-paid" placeholder="支払い日時（任意）"></div> <div class="field"><input id="m-extra" placeholder="任意項目（メモ・自由記述。例：所属=A班, 区分=正会員）"></div> <button class="btn btn-primary" id="m-add">追加</button> </div>`}<form method="get" class="row" style="margin:.5rem 0"><input name="q"${addAttribute(q, "value")} placeholder="氏名・連絡先で検索"><button class="btn" type="submit" style="flex:0 0 auto">検索</button></form> <div class="table-wrap"><table> <thead><tr><th>氏名</th><th>連絡先</th><th>会費</th><th>支払日時</th><th>変更日</th><th>任意項目</th>${canEdit && renderTemplate`<th>操作</th>`}</tr></thead> <tbody> ${members.map((m) => renderTemplate`<tr${addAttribute(m.id, "data-id")}> <td>${canEdit ? renderTemplate`<input class="e-name"${addAttribute(m.name, "value")}>` : m.name}</td> <td>${canEdit ? renderTemplate`<input class="e-contact"${addAttribute(m.contact ?? "", "value")}>` : m.contact ?? "\u2014"}</td> <td>${canEdit ? renderTemplate`<select class="e-fee">${FEE_STATUSES.map((s) => renderTemplate`<option${spreadAttributes(opt(m.fee_status, s))}>${FEE_LABEL[s]}</option>`)}</select>` : FEE_LABEL[m.fee_status] ?? m.fee_status}</td> <td>${canEdit ? renderTemplate`<input class="e-paid"${addAttribute(m.paid_at ?? "", "value")}>` : m.paid_at ?? "\u2014"}</td> <td class="muted">${fmt(m.status_changed_at)}</td> <td>${canEdit ? renderTemplate`<input class="e-extra"${addAttribute(m.extra ?? "", "value")}>` : m.extra ?? "\u2014"}</td> ${canEdit && renderTemplate`<td style="white-space:nowrap"><button class="btn btn-sm btn-primary e-save">保存</button> <button class="btn btn-sm btn-danger e-del">削除</button></td>`} </tr>`)} ${members.length === 0 && renderTemplate`<tr><td${addAttribute(cols, "colspan")} class="muted">会員がいません。</td></tr>`} </tbody> </table></div> `, "scripts": async ($$result2) => renderTemplate`${canEdit && renderTemplate(_a || (_a = __template(['<script>\n      const api = (b, btn) => window.bo.api("/api/membership", b, { btn });\n      const add = document.getElementById("m-add");\n      if (add) add.addEventListener("click", async (e) => {\n        const name = document.getElementById("m-name").value.trim();\n        if (!name) { window.bo.toast("\u6C0F\u540D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", "err"); return; }\n        const r = await api({ _action: "create", name, contact: document.getElementById("m-contact").value, fee_status: document.getElementById("m-fee").value, paid_at: document.getElementById("m-paid").value, extra: document.getElementById("m-extra").value }, e.currentTarget);\n        if (r.ok) { window.bo.toast("\u8FFD\u52A0\u3057\u307E\u3057\u305F"); setTimeout(() => location.reload(), 600); }\n      });\n      document.querySelectorAll("tr[data-id]").forEach((tr) => {\n        const id = tr.dataset.id;\n        tr.querySelector(".e-save")?.addEventListener("click", async (e) => {\n          const r = await api({ _action: "update", id, name: tr.querySelector(".e-name").value, contact: tr.querySelector(".e-contact").value, fee_status: tr.querySelector(".e-fee").value, paid_at: tr.querySelector(".e-paid").value, extra: tr.querySelector(".e-extra").value }, e.currentTarget);\n          if (r.ok) { window.bo.toast("\u66F4\u65B0\u3057\u307E\u3057\u305F"); setTimeout(() => location.reload(), 500); }\n        });\n        tr.querySelector(".e-del")?.addEventListener("click", async (e) => {\n          if (await window.bo.confirm("\u3053\u306E\u4F1A\u54E1\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F", { confirmLabel: "\u524A\u9664", danger: true, auditHref: "/diagnostics" })) { const r = await api({ _action: "delete", id }, e.currentTarget); if (r.ok) setTimeout(() => location.reload(), 400); }\n        });\n      });\n    <\/script>'])))}` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/membership.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/membership.astro";
const $$url = "/membership";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Membership,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
