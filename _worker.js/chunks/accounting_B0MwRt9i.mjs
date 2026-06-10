globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as randomId } from './crypto_D21r3Dwx.mjs';

const nowSec = () => Math.floor(Date.now() / 1e3);
async function ensureSeed(env) {
  const fp = await env.DB.prepare("SELECT id FROM fiscal_periods LIMIT 1").first();
  if (fp) return;
  const y = (/* @__PURE__ */ new Date()).getUTCFullYear();
  const fid = randomId();
  await env.DB.prepare("INSERT INTO fiscal_periods (id,name,start_date,end_date,status) VALUES (?,?,?,?,'open')").bind(fid, `${y}年度`, `${y}-04-01`, `${y + 1}-03-31`).run();
  const wallets = [["現金", "cash"], ["普通預金", "bank"]];
  let i = 0;
  for (const [name, type] of wallets) {
    await env.DB.prepare("INSERT INTO wallets (id,name,type,opening_balance,sort_order) VALUES (?,?,?,0,?)").bind(randomId(), name, type, i++).run();
  }
  const cats = [
    ["会費収入", "income"],
    ["寄付収入", "income"],
    ["事業収入", "income"],
    ["雑収入", "income"],
    ["消耗品費", "expense"],
    ["通信費", "expense"],
    ["会議費", "expense"],
    ["旅費交通費", "expense"],
    ["雑費", "expense"]
  ];
  i = 0;
  for (const [name, kind] of cats) {
    await env.DB.prepare("INSERT INTO categories (id,name,kind,parent_id,sort_order) VALUES (?,?,?,NULL,?)").bind(randomId(), name, kind, i++).run();
  }
}
async function currentPeriod(env) {
  return env.DB.prepare("SELECT * FROM fiscal_periods WHERE status='open' ORDER BY start_date DESC LIMIT 1").first();
}
async function listWallets(env) {
  return (await env.DB.prepare("SELECT * FROM wallets ORDER BY sort_order").all()).results;
}
async function listCategories(env) {
  return (await env.DB.prepare("SELECT * FROM categories ORDER BY kind, sort_order").all()).results;
}
async function createTx(env, t) {
  const id = randomId();
  const now = nowSec();
  await env.DB.prepare(
    `INSERT INTO transactions (id,fiscal_period_id,date,wallet_id,kind,category_id,amount,description,counter_wallet_id,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  ).bind(id, t.fiscal_period_id, t.date, t.wallet_id, t.kind, t.category_id, t.amount, t.description, t.counter_wallet_id, now, now).run();
  return id;
}
async function softDeleteTx(env, id) {
  await env.DB.prepare("UPDATE transactions SET deleted_at=? WHERE id=?").bind(nowSec(), id).run();
}
async function cashbook(env, periodId, walletId) {
  const wallet = await env.DB.prepare("SELECT * FROM wallets WHERE id=?").bind(walletId).first();
  if (!wallet) throw new Error("wallet not found");
  const { results } = await env.DB.prepare(
    `SELECT * FROM transactions WHERE fiscal_period_id=? AND deleted_at IS NULL AND (wallet_id=? OR counter_wallet_id=?) ORDER BY date, created_at`
  ).bind(periodId, walletId, walletId).all();
  let running = wallet.opening_balance;
  const rows = results.map((t) => {
    let delta = 0;
    if (t.kind === "income" && t.wallet_id === walletId) delta = t.amount;
    else if (t.kind === "expense" && t.wallet_id === walletId) delta = -t.amount;
    else if (t.kind === "transfer") {
      if (t.wallet_id === walletId) delta = -t.amount;
      else if (t.counter_wallet_id === walletId) delta = t.amount;
    }
    running += delta;
    return { ...t, running };
  });
  return { wallet, rows };
}
async function incomeStatement(env, periodId) {
  const { results } = await env.DB.prepare(
    `SELECT c.name AS name, c.kind AS kind, COALESCE(SUM(t.amount),0) AS amount
     FROM transactions t JOIN categories c ON c.id=t.category_id
     WHERE t.fiscal_period_id=? AND t.deleted_at IS NULL AND t.kind IN ('income','expense')
     GROUP BY t.category_id ORDER BY c.kind, c.sort_order`
  ).bind(periodId).all();
  const income = results.filter((r) => r.kind === "income").map((r) => ({ name: r.name, amount: r.amount }));
  const expense = results.filter((r) => r.kind === "expense").map((r) => ({ name: r.name, amount: r.amount }));
  return {
    income,
    expense,
    totalIncome: income.reduce((s, r) => s + r.amount, 0),
    totalExpense: expense.reduce((s, r) => s + r.amount, 0)
  };
}
async function budgetActual(env, periodId) {
  const { results } = await env.DB.prepare(
    `SELECT c.name AS name, COALESCE(b.amount,0) AS budget,
            COALESCE((SELECT SUM(amount) FROM transactions t WHERE t.category_id=c.id AND t.fiscal_period_id=? AND t.deleted_at IS NULL),0) AS actual
     FROM categories c LEFT JOIN budgets b ON b.category_id=c.id AND b.fiscal_period_id=?
     ORDER BY c.kind, c.sort_order`
  ).bind(periodId, periodId).all();
  return results;
}

export { budgetActual, cashbook, createTx, currentPeriod, ensureSeed, incomeStatement, listCategories, listWallets, nowSec, softDeleteTx };
