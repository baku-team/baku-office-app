globalThis.process ??= {};
globalThis.process.env ??= {};
import { getSession } from "./auth__5t3T1Cz.mjs";
import { cachedEntitlement } from "./client_K_W-4z9g.mjs";
import { clearLayout, publishLayout, saveLayoutDraft, deleteSite, upsertSite } from "./sites_Cg2f3AXA.mjs";
import { r as randomId } from "./stripe_r-RFTlbb.mjs";
import { blockDef } from "./defs_CzQL6S_A.mjs";
import { atLeast } from "./index_CrjiuAkj.mjs";
import { env } from "cloudflare:workers";
const MAX_BLOCKS = 40;
const MAX_TEXT = 4e3;
const MAX_RICH = 2e4;
const MAX_LIST = 12;
const cleanUrl = (v) => {
  const s = typeof v === "string" ? v.trim() : "";
  if (!s) return "";
  if (s === "#" || s.startsWith("#")) return s.slice(0, 200);
  return /^https:\/\/[\w./?=&%:#@-]+$/i.test(s) || /^\/[\w./?=&%#-]*$/.test(s) ? s.slice(0, 500) : "";
};
const cleanText = (v, max = MAX_TEXT) => typeof v === "string" ? v.slice(0, max) : "";
const optValues = (f) => f.options.map((o) => o.value);
function cleanField(f, val) {
  switch (f.type) {
    case "text":
      return cleanText(val);
    case "textarea":
      return cleanText(val, 8e3);
    case "richtext":
      return cleanText(val, MAX_RICH);
    case "image":
      return cleanUrl(val);
    case "icon":
      return typeof val === "string" ? val.slice(0, 24) : "";
    case "number": {
      const n = Math.round(Number(val));
      return Number.isFinite(n) ? Math.max(0, Math.min(n, 100)) : 0;
    }
    case "boolean":
      return !!val;
    case "select":
      return optValues(f).includes(String(val)) ? String(val) : optValues(f)[0];
    case "list": {
      const arr = Array.isArray(val) ? val.slice(0, Math.min(f.max ?? MAX_LIST, MAX_LIST)) : [];
      return arr.map((row) => {
        const out = {};
        for (const sub of f.item) out[sub.key] = cleanField(sub, row?.[sub.key]);
        return out;
      });
    }
    default:
      return "";
  }
}
function validateLayout(input) {
  const obj = input ?? {};
  const rawBlocks = Array.isArray(obj.blocks) ? obj.blocks : null;
  if (!rawBlocks) return { ok: false, error: "blocks がありません" };
  if (rawBlocks.length > MAX_BLOCKS) return { ok: false, error: `ブロックは最大 ${MAX_BLOCKS} 個までです` };
  const blocks = [];
  for (const rb of rawBlocks) {
    const b = rb ?? {};
    const def = blockDef(String(b.type));
    if (!def) continue;
    const props = {};
    const src = b.props ?? {};
    for (const f of def.fields) props[f.key] = cleanField(f, src[f.key]);
    blocks.push({ id: typeof b.id === "string" && b.id ? b.id.slice(0, 24) : randomId(8), type: def.type, props, bg: typeof b.bg === "string" ? b.bg.slice(0, 16) : void 0 });
  }
  const json2 = JSON.stringify({ version: 1, blocks });
  if (json2.length > 256e3) return { ok: false, error: "ページが大きすぎます（画像はURL参照にしてください）" };
  return { ok: true, layout: { version: 1, blocks } };
}
const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const ses = await getSession(env, request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return json({ error: "管理者のみ" }, 403);
  if (!atLeast(await cachedEntitlement(env), "pro")) return json({ error: "HP/LP は Pro プランで利用できます" }, 403);
  const b = await request.json().catch(() => ({}));
  const slug = (b.slug ?? "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  switch (b._action) {
    case "save":
      if (!slug) return json({ error: "slug（英数字）が必要" }, 400);
      if (!b.title) return json({ error: "タイトルが必要" }, 400);
      await upsertSite(env, { slug, title: b.title, body: b.body, published: b.published, show_join: b.show_join });
      return json({ ok: true, slug });
    case "delete":
      if (slug) await deleteSite(env, slug);
      return json({ ok: true });
    // ページビルダー：下書き保存（layout_draft）。検証してから保存。
    case "save_layout": {
      if (!slug) return json({ error: "slug（英数字）が必要" }, 400);
      const r = validateLayout(b.layout);
      if (!r.ok) return json({ error: r.error }, 400);
      await saveLayoutDraft(env, slug, JSON.stringify(r.layout), b.title);
      return json({ ok: true, slug });
    }
    // 公開：下書きを公開版へ反映。
    case "publish_layout":
      if (!slug) return json({ error: "slug が必要" }, 400);
      await publishLayout(env, slug);
      return json({ ok: true, slug });
    // ブロック構成を解除（body HTML 描画へ戻す）。
    case "clear_layout":
      if (slug) await clearLayout(env, slug);
      return json({ ok: true });
    default:
      return json({ error: "不明な操作" }, 400);
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
