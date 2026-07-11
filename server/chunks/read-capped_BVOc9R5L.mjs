globalThis.process ??= {};
globalThis.process.env ??= {};
async function readBodyCapped(r, limitBytes) {
  const declared = Number(r.headers.get("content-length") ?? 0);
  if (limitBytes && declared > limitBytes) return "too_large";
  const reader = r.body?.getReader?.();
  if (!reader) {
    const buf = new Uint8Array(await r.arrayBuffer());
    return limitBytes && buf.byteLength > limitBytes ? "too_large" : buf;
  }
  const chunks = [];
  let total = 0;
  for (; ; ) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) {
      total += value.byteLength;
      if (limitBytes && total > limitBytes) {
        try {
          await reader.cancel();
        } catch {
        }
        return "too_large";
      }
      chunks.push(value);
    }
  }
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.byteLength;
  }
  return out;
}
export {
  readBodyCapped
};
