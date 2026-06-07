globalThis.process ??= {}; globalThis.process.env ??= {};
import { getApiKey } from '../../../chunks/client_KUuDosgV.mjs';
import { nowSec } from '../../../chunks/accounting_BOhbglhy.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  const secret = await getApiKey(env, "stripe_webhook");
  if (!secret) return new Response("Stripe未設定（現金/手動運用）", { status: 400 });
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature") ?? "";
  if (!await verifyStripeSig(secret, payload, sig)) return new Response("署名不正", { status: 400 });
  let ev;
  try {
    ev = JSON.parse(payload);
  } catch {
    return new Response("不正なペイロード", { status: 400 });
  }
  const customer = ev.data?.object?.customer;
  const now = nowSec();
  if (customer && ev.type === "checkout.session.completed") {
    await env.DB.prepare("UPDATE membership SET fee_status='paid', paid_at=?, status_changed_at=?, updated_at=? WHERE stripe_customer=?").bind(new Date(now * 1e3).toISOString(), now, now, customer).run();
  } else if (customer && ev.type === "customer.subscription.deleted") {
    await env.DB.prepare("UPDATE membership SET fee_status='withdrawn', status_changed_at=?, updated_at=? WHERE stripe_customer=?").bind(now, now, customer).run();
  }
  return new Response("ok");
};
async function verifyStripeSig(secret, payload, header, toleranceSec = 300) {
  const parts = Object.fromEntries(header.split(",").map((kv) => kv.split("=")));
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;
  const ts = Number(t);
  if (!Number.isFinite(ts) || Math.abs(nowSec() - ts) > toleranceSec) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${payload}`));
  const hex = Array.from(new Uint8Array(mac), (b) => b.toString(16).padStart(2, "0")).join("");
  if (hex.length !== v1.length) return false;
  let r = 0;
  for (let i = 0; i < hex.length; i++) r |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return r === 0;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
