globalThis.process ??= {}; globalThis.process.env ??= {};
import { ensureSeed, softDeleteTx, currentPeriod, createTx } from '../../chunks/accounting_BOhbglhy.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
const POST = async ({ request, locals }) => {
  const env = locals.runtime.env;
  await ensureSeed(env);
  const b = await request.json().catch(() => ({}));
  if (b._action === "delete" && typeof b.id === "string") {
    await softDeleteTx(env, b.id);
    return json({ ok: true });
  }
  const period = await currentPeriod(env);
  if (!period) return json({ error: "会計期がありません" }, 400);
  const kind = b.kind;
  const amount = Number(b.amount);
  if (!["income", "expense", "transfer"].includes(kind) || !Number.isFinite(amount) || amount <= 0) {
    return json({ error: "kind と amount(正の整数) が必要" }, 400);
  }
  if (!b.date || !b.wallet_id) return json({ error: "date と wallet_id が必要" }, 400);
  if (kind === "transfer" && !b.counter_wallet_id) return json({ error: "振替は counter_wallet_id が必要" }, 400);
  if (kind !== "transfer" && !b.category_id) return json({ error: "科目(category_id)が必要" }, 400);
  const id = await createTx(env, {
    fiscal_period_id: period.id,
    date: String(b.date),
    wallet_id: String(b.wallet_id),
    kind,
    category_id: kind === "transfer" ? null : String(b.category_id),
    amount: Math.round(amount),
    description: b.description ? String(b.description) : null,
    counter_wallet_id: kind === "transfer" ? String(b.counter_wallet_id) : null
  });
  return json({ ok: true, id });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
