globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as randomId } from "./stripe_r-RFTlbb.mjs";
import { n as nowSec } from "./accounting_BDHe-W6B.mjs";
const FEE_STATUSES = ["paid", "unpaid", "exempt", "withdrawn"];
const FEE_LABEL = { paid: "支払済", unpaid: "未払い", exempt: "免除", withdrawn: "退会" };
async function listMembers(env, q = "") {
  if (q) return (await env.DB.prepare("SELECT * FROM membership WHERE name LIKE ? OR contact LIKE ? ORDER BY created_at DESC LIMIT 500").bind("%" + q + "%", "%" + q + "%").all()).results;
  return (await env.DB.prepare("SELECT * FROM membership ORDER BY created_at DESC LIMIT 500").all()).results;
}
async function createMember(env, a) {
  const id = randomId();
  const now = nowSec();
  const fee = FEE_STATUSES.includes(a.fee_status ?? "unpaid") ? a.fee_status : "unpaid";
  await env.DB.prepare(
    "INSERT INTO membership (id,name,contact,fee_status,paid_at,status_changed_at,extra,stripe_customer,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)"
  ).bind(id, a.name, a.contact ?? null, fee, a.paid_at ?? null, now, a.extra ?? null, a.stripe_customer ?? null, now, now).run();
  return id;
}
async function updateMember(env, id, patch) {
  const cur = await env.DB.prepare("SELECT fee_status FROM membership WHERE id=?").bind(id).first();
  if (!cur) return;
  const sets = [];
  const binds = [];
  if (patch.name !== void 0) {
    sets.push("name=?");
    binds.push(patch.name);
  }
  if (patch.contact !== void 0) {
    sets.push("contact=?");
    binds.push(patch.contact || null);
  }
  if (patch.extra !== void 0) {
    sets.push("extra=?");
    binds.push(patch.extra || null);
  }
  let paidAt = patch.paid_at;
  if (patch.fee_status !== void 0 && FEE_STATUSES.includes(patch.fee_status) && patch.fee_status !== cur.fee_status) {
    sets.push("fee_status=?", "status_changed_at=?");
    binds.push(patch.fee_status, nowSec());
    if (patch.fee_status === "paid" && paidAt === void 0) paidAt = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " ");
  }
  if (paidAt !== void 0) {
    sets.push("paid_at=?");
    binds.push(paidAt || null);
  }
  if (!sets.length) return;
  sets.push("updated_at=?");
  binds.push(nowSec());
  binds.push(id);
  await env.DB.prepare(`UPDATE membership SET ${sets.join(",")} WHERE id=?`).bind(...binds).run();
}
async function deleteMember(env, id) {
  await env.DB.prepare("DELETE FROM membership WHERE id=?").bind(id).run();
}
async function memberStats(env) {
  try {
    const total = (await env.DB.prepare("SELECT COUNT(*) AS n FROM membership").first())?.n ?? 0;
    const paid = (await env.DB.prepare("SELECT COUNT(*) AS n FROM membership WHERE fee_status='paid'").first())?.n ?? 0;
    const unpaid = (await env.DB.prepare("SELECT COUNT(*) AS n FROM membership WHERE fee_status='unpaid'").first())?.n ?? 0;
    return { total, paid, unpaid };
  } catch {
    return { total: 0, paid: 0, unpaid: 0 };
  }
}
export {
  FEE_LABEL,
  FEE_STATUSES,
  createMember,
  deleteMember,
  listMembers,
  memberStats,
  updateMember
};
