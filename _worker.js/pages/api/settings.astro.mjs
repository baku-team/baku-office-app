globalThis.process ??= {}; globalThis.process.env ??= {};
import { getSession } from '../../chunks/auth_BDOdme1H.mjs';
import { setMaxUploadMb, setRetentionDays } from '../../chunks/storage_ComUGkKO.mjs';
import { setAiEngine, setCustomPrompt, setNotifyWebhook, setWorkersPaid } from '../../chunks/settings_DSJfWsdt.mjs';
import { setAutonomy, saveAutonomyConfig } from '../../chunks/autonomy_CKEyr57X.mjs';
import { setStorageLimits } from '../../chunks/storage-usage_BcZ2Jp3w.mjs';
import { setEnabledPartIds, partCatalog, enabledPartIds } from '../../chunks/parts_BZyWMuJn.mjs';
import { setTheme } from '../../chunks/theme_Fu3FGkcO.mjs';
import { setNavOverrides } from '../../chunks/nav_CKksP45B.mjs';
import { setHomeLayout } from '../../chunks/home_CyAYEWGZ.mjs';
import { setCustomDomain } from '../../chunks/custom-domain_BsSQSGyD.mjs';
import { nowSec } from '../../chunks/accounting_B0MwRt9i.mjs';
import { installApp, uninstallApp, installedAppIds, appCatalog } from '../../chunks/apps_Bd2BWu4r.mjs';
import { fetchAndInstall, uninstallExternal, listExternalApps, listDrafts, submitDraft, deleteDraft } from '../../chunks/external-apps_BEIw-YML.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return json({ error: "管理者のみ" }, 403);
  const b = await request.json().catch(() => ({}));
  if (b._action === "max_upload") {
    const v = await setMaxUploadMb(env, Number(b.mb));
    return json({ ok: true, mb: v });
  }
  if (b._action === "file_retention") {
    const v = await setRetentionDays(env, Number(b.days));
    return json({ ok: true, days: v });
  }
  if (b._action === "agent_approval") {
    const { setApprovalMode } = await import('../../chunks/approvals_DvreX_Lk.mjs');
    const v = await setApprovalMode(env, b.on === true);
    return json({ ok: true, on: v });
  }
  if (b._action === "ai_engine") {
    const v = await setAiEngine(env, String(b.engine ?? "gemini"));
    return json({ ok: true, engine: v });
  }
  if (b._action === "custom_prompt") {
    const v = await setCustomPrompt(env, String(b.prompt ?? ""));
    return json({ ok: true, prompt: v });
  }
  if (b._action === "notify_webhook") {
    const v = await setNotifyWebhook(env, String(b.webhook ?? ""));
    return json({ ok: true, webhook: v });
  }
  if (b._action === "workers_paid") {
    const v = await setWorkersPaid(env, b.workersPaid === true);
    return json({ ok: true, workersPaid: v });
  }
  if (b._action === "autonomy_toggle") {
    await setAutonomy(env, b.on === true);
    return json({ ok: true, on: b.on === true });
  }
  if (b._action === "autonomy_config") {
    await saveAutonomyConfig(env, { cfToken: b.cfToken, cfAccount: b.cfAccount, ghToken: b.ghToken, ghRepo: b.ghRepo });
    return json({ ok: true });
  }
  if (b._action === "storage_limits") {
    const inc = b.limits ?? {};
    const clean = {};
    for (const k of ["d1", "kv", "r2", "drive"]) {
      const v = Number(inc[k]);
      if (Number.isFinite(v) && v > 0) clean[k] = v;
    }
    await setStorageLimits(env, clean);
    return json({ ok: true });
  }
  if (b._action === "enabled_parts") {
    const v = await setEnabledPartIds(locals.ctx, Array.isArray(b.parts) ? b.parts : []);
    return json({ ok: true, enabled: v, catalog: partCatalog() });
  }
  if (b._action === "list_parts") {
    return json({ ok: true, enabled: await enabledPartIds(locals.ctx), catalog: partCatalog() });
  }
  if (b._action === "ui_theme") {
    const v = await setTheme(locals.ctx, b.theme);
    return json({ ok: true, theme: v });
  }
  if (b._action === "nav_overrides") {
    const v = await setNavOverrides(locals.ctx, b.nav ?? {});
    return json({ ok: true, nav: v });
  }
  if (b._action === "home_layout") {
    const v = await setHomeLayout(locals.ctx, b.layout ?? {});
    return json({ ok: true, layout: v });
  }
  if (b._action === "custom_domain") {
    const v = await setCustomDomain(locals.ctx, b.domain ?? "", nowSec());
    return json({ ok: true, domain: v });
  }
  if (b._action === "install_app") {
    const installed = await installApp(locals.ctx, String(b.appId ?? ""));
    return json({ ok: true, installed });
  }
  if (b._action === "uninstall_app") {
    try {
      const installed = await uninstallApp(locals.ctx, String(b.appId ?? ""));
      return json({ ok: true, installed });
    } catch (e) {
      return json({ error: e.message }, 400);
    }
  }
  if (b._action === "list_apps") {
    return json({ ok: true, catalog: appCatalog(), installed: await installedAppIds(locals.ctx) });
  }
  if (b._action === "fetch_app") {
    const r = await fetchAndInstall(locals.ctx, String(b.appId ?? ""));
    return json(r, r.ok ? 200 : 400);
  }
  if (b._action === "uninstall_external") {
    await uninstallExternal(locals.ctx, String(b.appId ?? ""));
    return json({ ok: true });
  }
  if (b._action === "list_external") {
    return json({ ok: true, external: await listExternalApps(locals.ctx) });
  }
  if (b._action === "list_drafts") {
    return json({ ok: true, drafts: await listDrafts(locals.ctx) });
  }
  if (b._action === "submit_draft") {
    const r = await submitDraft(locals.ctx, String(b.draftId ?? ""));
    return json(r, r.ok ? 200 : 400);
  }
  if (b._action === "delete_draft") {
    await deleteDraft(locals.ctx, String(b.draftId ?? ""));
    return json({ ok: true });
  }
  return json({ error: "不明な操作" }, 400);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
