globalThis.process ??= {}; globalThis.process.env ??= {};
const ENC = new TextEncoder();
const DEC = new TextDecoder();
const toB64 = (buf) => {
  const bytes = new Uint8Array(buf);
  let s = "";
  const CH = 32768;
  for (let i = 0; i < bytes.length; i += CH) s += String.fromCharCode(...bytes.subarray(i, i + CH));
  return btoa(s);
};
const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
async function deriveKey(masterKeyB64, domain) {
  const ikm = fromB64(masterKeyB64);
  const base = await crypto.subtle.importKey("raw", ikm, "HKDF", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "HKDF", hash: "SHA-256", salt: new Uint8Array(0), info: ENC.encode(`baku-office/${domain}`) },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
async function encryptField(masterKeyB64, plaintext, domain = "default") {
  const key = await deriveKey(masterKeyB64, domain);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, ENC.encode(plaintext));
  const out = new Uint8Array(iv.length + ct.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ct), iv.length);
  return toB64(out.buffer);
}
async function decryptField(masterKeyB64, stored, domain = "default") {
  const key = await deriveKey(masterKeyB64, domain);
  const buf = fromB64(stored);
  const iv = buf.slice(0, 12);
  const ct = buf.slice(12);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return DEC.decode(pt);
}
async function encryptBytes(masterKeyB64, data, domain = "files") {
  const key = await deriveKey(masterKeyB64, domain);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);
  const out = new Uint8Array(iv.length + ct.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ct), iv.length);
  return out.buffer;
}
async function decryptBytes(masterKeyB64, stored, domain = "files") {
  const key = await deriveKey(masterKeyB64, domain);
  const buf = new Uint8Array(stored);
  const iv = buf.slice(0, 12);
  const ct = buf.slice(12);
  return crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
}
function generateMasterKey() {
  return toB64(crypto.getRandomValues(new Uint8Array(32)).buffer);
}
async function importVerifyKey(jwk) {
  const pub = { kty: jwk.kty, crv: jwk.crv, x: jwk.x };
  return crypto.subtle.importKey("jwk", pub, { name: "Ed25519" }, false, ["verify"]);
}
function signedBytes(env) {
  if ("body" in env && typeof env.body === "string") return fromB64(env.body);
  return ENC.encode(JSON.stringify(env.payload));
}
async function verifyEnvelope(publicKey, env) {
  return crypto.subtle.verify("Ed25519", publicKey, fromB64(env.sig), signedBytes(env));
}
function payloadOf(env) {
  if ("body" in env && typeof env.body === "string") return JSON.parse(DEC.decode(fromB64(env.body)));
  return env.payload;
}
function randomId(bytes = 16) {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)), (b) => b.toString(16).padStart(2, "0")).join("");
}

export { encryptBytes as a, decryptBytes as b, decryptField as d, encryptField as e, generateMasterKey as g, importVerifyKey as i, payloadOf as p, randomId as r, verifyEnvelope as v };
