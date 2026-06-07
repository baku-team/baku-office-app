globalThis.process ??= {}; globalThis.process.env ??= {};
const ENTITLEMENT_RANK = { free: 0, plus: 1, pro: 2 };
function atLeast(e, min) {
  return ENTITLEMENT_RANK[e] >= ENTITLEMENT_RANK[min];
}
function planLabel(p) {
  return p === "pro" ? "Pro（エージェント）" : p === "plus" ? "Plus（AI）" : "Free（無料）";
}

export { atLeast as a, planLabel as p };
