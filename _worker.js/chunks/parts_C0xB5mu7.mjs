globalThis.process ??= {}; globalThis.process.env ??= {};
function partMenuItems(enabledIds) {
  return enabledParts(enabledIds).flatMap((p) => p.menu ?? []);
}
const REGISTRY = /* @__PURE__ */ new Map();
function registerPart(p) {
  if (!REGISTRY.has(p.id)) REGISTRY.set(p.id, p);
}
function registeredParts() {
  return [...REGISTRY.values()];
}
function partCatalog() {
  return registeredParts().map((p) => ({ id: p.id, name: p.name, version: p.version }));
}
function enabledParts(enabledIds) {
  const all = registeredParts();
  return enabledIds ? all.filter((p) => enabledIds.includes(p.id)) : all;
}
function toolsOf(parts) {
  return parts.flatMap((p) => p.agentTools ?? []);
}
const KV_ENABLED_PARTS = "enabled_parts";
async function enabledPartIds(ctx) {
  const raw = await ctx.storage.kv.get(KV_ENABLED_PARTS);
  if (!raw) return null;
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.map(String) : null;
  } catch {
    return null;
  }
}
async function setEnabledPartIds(ctx, ids) {
  const known = new Set(registeredParts().map((p) => p.id));
  const clean = [...new Set(ids.map(String))].filter((id) => known.has(id));
  await ctx.storage.kv.put(KV_ENABLED_PARTS, JSON.stringify(clean));
  return clean;
}

export { enabledPartIds, enabledParts, partCatalog, partMenuItems, registerPart, registeredParts, setEnabledPartIds, toolsOf };
