globalThis.process ??= {}; globalThis.process.env ??= {};
export { b as decryptBytes, d as decryptField, a as encryptBytes, e as encryptField, g as generateMasterKey, i as importVerifyKey, p as payloadOf, r as randomId, v as verifyEnvelope } from './crypto_D21r3Dwx.mjs';

const ENTITLEMENT_RANK = { free: 0, plus: 1, pro: 2, nonprofit: 40, enterprise: 50, test: 99 };
function atLeast(e, min) {
  return ENTITLEMENT_RANK[e] >= ENTITLEMENT_RANK[min];
}
function planLabel(p) {
  return p === "test" ? "テスト（全機能解放）" : p === "enterprise" ? "エンタープライズ（個別相談・全機能）" : p === "nonprofit" ? "NonProfit（非営利・全機能・要審査）" : p === "pro" ? "Pro（エージェント）" : p === "plus" ? "Plus（AI）" : "Free（無料）";
}

export { ENTITLEMENT_RANK, atLeast, planLabel };
