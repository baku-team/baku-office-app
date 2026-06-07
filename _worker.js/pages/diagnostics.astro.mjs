globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_CfYoLHqm.mjs';
import { $ as $$App } from '../chunks/App_BeztdKLb.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Diagnostics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Diagnostics;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_ujH5pbJJ.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { recentDiagnostics, hasRecentLimitError } = await import('../chunks/diag_D3atJWnJ.mjs');
  const diags = await recentDiagnostics(env);
  const limit = await hasRecentLimitError(env);
  const t = (s) => new Date(s * 1e3).toISOString().slice(0, 16).replace("T", " ");
  const { detectProfile } = await import('../chunks/profiles_BEW0vMoQ.mjs');
  const prof = detectProfile(env);
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u8A3A\u65AD\u30FB\u30B5\u30DD\u30FC\u30C8", "active": "/diagnostics" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>診断・サポート</h1> <div class="card"> <p class="muted">稼働中の構成（環境Profile・§6）</p> <p>Profile <strong>${prof.label}</strong>／AI=<strong>${prof.ai === "local" ? "\u30ED\u30FC\u30AB\u30EBLLM" : "\u30AF\u30E9\u30A6\u30C9"}</strong>／ストレージ=<strong>${prof.storage.toUpperCase()}</strong>／鍵=<strong>${prof.keyStore === "secret" ? "Worker Secret" : "KV\u81EA\u52D5\u751F\u6210\uFF08\u8981\u5BFE\u5FDC\uFF09"}</strong></p> ${prof.keyStore === "kv-autogen" && renderTemplate`<div class="banner banner-warn">MASTER_KEY が Worker Secret 未設定です。本番は <code>wrangler secret put MASTER_KEY</code> を推奨（鍵と暗号文の同居回避・§10.1）。</div>`} </div> ${limit && renderTemplate`<div class="banner banner-danger">⚠️ 直近にCloudflareの<strong>無料枠の制限</strong>に達したエラーがあります。重い処理を安定させるには <a href="/settings/advanced">高度なオプション → Workers Paid</a> をご検討ください。</div>`}<div class="table-wrap"><table><thead><tr><th>日時</th><th>区分</th><th>レベル</th><th>内容</th></tr></thead><tbody> ${diags.map((d) => renderTemplate`<tr><td>${t(d.created_at)}</td><td><span class="pill"${addAttribute(d.category === "limit" ? "background:#fee2e2;color:#b91c1c" : "", "style")}>${d.category}</span></td><td>${d.level}</td><td>${d.message}</td></tr>`)} ${diags.length === 0 && renderTemplate`<tr><td colspan="4" class="muted">記録はありません（正常）。</td></tr>`} </tbody></table></div> <p class="muted" style="margin-top:1rem">エラーログはこの団体のCloudflare内にのみ保存（PIIなし・§13.3）。</p> ` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/diagnostics.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/diagnostics.astro";
const $$url = "/diagnostics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Diagnostics,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
