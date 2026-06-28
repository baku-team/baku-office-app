globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_BajPpY5_.mjs";
import { r as renderTemplate, a as addAttribute, m as maybeRenderHead } from "./sequence_2tuU57vh.mjs";
import { r as renderComponent } from "./worker-entry_DPLWCLSI.mjs";
import { env } from "cloudflare:workers";
import { $ as $$App } from "./App_BgGAw8BT.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = false;
const $$Public = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Public;
  const { getSession } = await import("./auth_BzuZOfxt.mjs");
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  if (ses.role !== "admin") return Astro2.redirect("/forbidden", 302);
  const { listPublicPages, listSubmissions, escapeHtml } = await import("./public-pages_BaPDC316.mjs");
  const { stripeConfigured } = await import("./payments_BaSHS40h.mjs");
  const pages = await listPublicPages(env);
  const hasStripe = await stripeConfigured(env);
  const hasPaid = pages.some((p) => p.price > 0);
  const origin = Astro2.url.origin;
  const pageData = await Promise.all(pages.map(async (p) => {
    const subs = await listSubmissions(env, p.slug, "pending", 50);
    return {
      page: p,
      subs: subs.map((s) => {
        let data = {};
        try {
          data = JSON.parse(s.data);
        } catch {
        }
        let files = [];
        try {
          files = s.files ? JSON.parse(s.files) : [];
        } catch {
        }
        const rows = Object.entries(data).filter(([k]) => !k.startsWith("_")).map(([k, v]) => `${escapeHtml(k)}：${escapeHtml(String(v))}`);
        return { id: s.id, when: new Date(s.created_at * 1e3).toLocaleString("ja-JP"), rows, files: files.map((f) => f.name ?? "file") };
      })
    };
  }));
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "公開ページ", "active": "/settings" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<h1>公開ページ</h1> <p class="muted" style="font-size:.9rem">会員以外（ログイン不要）が閲覧・申込できるページです。AIにアプリ作成を依頼するとき「公開」「申込フォーム」「LP」などと伝えると自動で発行されます。届いた送信はここで<strong>承認</strong>すると正式なアプリデータになります。</p> ', "", "", '<script data-astro-rerun>\n    (function () {\n      // document 委譲リスナーは1回だけ登録（SPA遷移での再実行による二重登録を防ぐ）。\n      if (window.__boPublicBound) return; window.__boPublicBound = true;\n      async function call(body) {\n        const r = await fetch("/api/public/manage", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });\n        return r.json().catch(function () { return {}; });\n      }\n      document.addEventListener("change", async function (e) {\n        const sel = e.target.closest(".reg-mode");\n        if (sel) {\n          const j = await call({ action: "register_mode", slug: sel.getAttribute("data-slug"), mode: sel.value });\n          if (!j.ok) alert(j.error || "保存に失敗しました");\n        }\n      });\n      document.addEventListener("click", async function (e) {\n        const cp = e.target.closest(".copy-url");\n        if (cp) {\n          const url = cp.getAttribute("data-url") || "";\n          try { await navigator.clipboard.writeText(url); window.bo?.toast?.("公開URLをコピーしました"); }\n          catch { try { const t = document.createElement("textarea"); t.value = url; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); window.bo?.toast?.("公開URLをコピーしました"); } catch { window.prompt("以下のURLをコピーしてください", url); } }\n          return;\n        }\n        const mod = e.target.closest("[data-mod]");\n        if (mod) {\n          mod.disabled = true;\n          const j = await call({ action: "moderate", id: mod.getAttribute("data-mod"), decision: mod.getAttribute("data-decision") });\n          if (j.ok) { const card = mod.closest(".sub"); if (card) card.remove(); } else { mod.disabled = false; alert(j.error || "処理に失敗しました"); }\n          return;\n        }\n        const tog = e.target.closest("[data-toggle]");\n        if (tog) {\n          tog.disabled = true;\n          const enabled = tog.getAttribute("data-enabled") !== "1";\n          const j = await call({ action: "toggle", slug: tog.getAttribute("data-toggle"), enabled: enabled });\n          if (j.ok) { location.reload(); } else { tog.disabled = false; alert(j.error || "処理に失敗しました"); }\n          return;\n        }\n        const del = e.target.closest("[data-delete]");\n        if (del) {\n          if (!window.confirm("この公開ページを削除しますか？（送信履歴も削除されます）")) return;\n          del.disabled = true;\n          const j = await call({ action: "delete", slug: del.getAttribute("data-delete") });\n          if (j.ok) { location.reload(); } else { del.disabled = false; alert(j.error || "削除できませんでした"); }\n        }\n      });\n    })();\n  <\/script> '])), maybeRenderHead(), hasPaid && !hasStripe && renderTemplate`<div class="banner banner-info" style="margin:8px 0">有料フォームがありますが、Stripe 連携が未設定のため決済できません。<a href="/settings/keys">設定→連携</a>で Stripe シークレットキー（stripe_secret）と Webhook シークレット（stripe_webhook）を登録してください。</div>`, pageData.length === 0 && renderTemplate`<div class="card" style="padding:20px;margin-top:12px"> <p>まだ公開ページはありません。AIチャットで「申込フォームを公開ページとして作って」のように依頼すると発行されます。</p> </div>`, pageData.map(({ page: page2, subs }) => renderTemplate`<div class="card" style="padding:20px;margin-top:16px"> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"> <div> <strong style="font-size:1.05rem">${page2.title}</strong> <div style="font-size:.85rem;color:#6E7179;margin-top:4px"> <a${addAttribute(`/p/${page2.slug}`, "href")} target="_blank" rel="noopener">${origin}/p/${page2.slug}</a> <a class="btn btn-ghost"${addAttribute(`/p/${page2.slug}${page2.enabled ? "" : "?preview=1"}`, "href")} target="_blank" rel="noopener" style="margin-left:8px;padding:2px 10px;font-size:.78rem">プレビュー</a> <button type="button" class="btn btn-ghost copy-url"${addAttribute(`${origin}/p/${page2.slug}`, "data-url")} style="margin-left:8px;padding:2px 10px;font-size:.78rem">URLをコピー</button> ${page2.price > 0 && renderTemplate`<span style="color:#946F2C;margin-left:8px">有料 ¥${page2.price.toLocaleString("ja-JP")}</span>`} ${!page2.enabled && renderTemplate`<span style="color:#b00020;margin-left:8px">（非公開）</span>`} </div> <details style="margin-top:6px"> <summary style="font-size:.82rem;color:#946F2C;cursor:pointer">外部サイトに埋め込むコード（C3）</summary> <code style="display:block;background:#F2F1F4;color:#1B1D22;border:1px solid #E3E1E6;border-radius:8px;padding:8px;margin-top:6px;font-size:.78rem;white-space:pre-wrap;word-break:break-all">${`<iframe src="${origin}/embed/${page2.slug}" style="width:100%;border:0" height="600" loading="lazy"></iframe>`}</code> </details> </div> <div style="display:flex;gap:8px;flex-wrap:wrap"> <button class="btn"${addAttribute(page2.slug, "data-toggle")}${addAttribute(page2.enabled ? "1" : "0", "data-enabled")}>${page2.enabled ? "非公開にする" : "公開する"}</button> <button class="btn btn-ghost"${addAttribute(page2.slug, "data-delete")} style="color:#b00020">削除</button> </div> </div> <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px"> <label style="font-size:.85rem;color:#6E7179">送信者の扱い</label> <select class="reg-mode"${addAttribute(page2.slug, "data-slug")} style="padding:6px 10px"> <option value="none"${addAttribute(page2.register_mode !== "guest", "selected")}>フォーム送信のみ</option> <option value="guest"${addAttribute(page2.register_mode === "guest", "selected")}>名簿にゲスト登録する</option> </select> <span class="muted" style="font-size:.78rem">「ゲスト登録」を選ぶと、送信者を名簿に追加します（名前・連絡先を推定）。</span> </div> <h3 style="margin:16px 0 8px;font-size:.95rem">未承認の送信（${subs.length}）</h3> ${subs.length === 0 && renderTemplate`<p class="muted" style="font-size:.88rem">保留中の送信はありません。</p>`} ${subs.map((s) => renderTemplate`<div class="sub" style="border:1px solid #E3E1E6;border-radius:12px;padding:12px;margin:8px 0"> <div style="font-size:.78rem;color:#6E7179;margin-bottom:6px">${s.when}</div> ${s.rows.map((r) => renderTemplate`<div style="font-size:.92rem">${r}</div>`)} ${s.files.length > 0 && renderTemplate`<div style="font-size:.85rem;color:#6E7179;margin-top:4px">添付：${s.files.join("、")}</div>`} <div style="display:flex;gap:8px;margin-top:10px"> <button class="btn"${addAttribute(s.id, "data-mod")} data-decision="approve">承認</button> <button class="btn btn-ghost"${addAttribute(s.id, "data-mod")} data-decision="reject">却下</button> </div> </div>`)} </div>`)) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/public.astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/public.astro";
const $$url = "/settings/public";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Public,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
