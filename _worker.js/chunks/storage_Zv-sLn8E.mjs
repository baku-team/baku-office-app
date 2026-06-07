globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as randomId } from './crypto_BhRWVEcj.mjs';
import { nowSec } from './accounting_BOhbglhy.mjs';

const KV_HARD_MAX_MB = 25;
const KV_DEFAULT_MB = 25;
function storageMode(env) {
  return env.MEDIA_R2 ? "r2" : "kv";
}
function mediaKv(env) {
  return env.MEDIA ?? env.LICENSE;
}
async function maxUploadMb(env) {
  const v = Number(await env.LICENSE.get("max_upload_mb"));
  if (!Number.isFinite(v) || v <= 0) return KV_DEFAULT_MB;
  return Math.min(KV_HARD_MAX_MB, Math.max(1, Math.round(v)));
}
async function setMaxUploadMb(env, mb) {
  const clamped = Math.min(KV_HARD_MAX_MB, Math.max(1, Math.round(mb)));
  await env.LICENSE.put("max_upload_mb", String(clamped));
  return clamped;
}
async function saveFile(env, file, createdBy) {
  const id = randomId();
  const buf = await file.arrayBuffer();
  let ref;
  const mode = storageMode(env);
  if (env.MEDIA_R2) {
    const key = `f/${id}`;
    await env.MEDIA_R2.put(key, buf, { httpMetadata: { contentType: file.type || "application/octet-stream" } });
    ref = `r2:${key}`;
  } else {
    const limit = await maxUploadMb(env) * 1024 * 1024;
    if (buf.byteLength > limit) throw new Error(`標準モードは1ファイル ${limit / 1024 / 1024}MB まで（高度なオプションで上限変更 or R2有効化）`);
    const key = `f/${id}`;
    await mediaKv(env).put(key, buf, { metadata: { contentType: file.type || "application/octet-stream" } });
    ref = `kv:${key}`;
  }
  await env.DB.prepare("INSERT INTO files (id,name,size,mime,ref,created_by,created_at) VALUES (?,?,?,?,?,?,?)").bind(id, file.name || "file", buf.byteLength, file.type || null, ref, createdBy, nowSec()).run();
  return { id, mode };
}
async function getFile(env, id) {
  const row = await env.DB.prepare("SELECT name,mime,ref FROM files WHERE id=? AND deleted_at IS NULL").bind(id).first();
  if (!row) return null;
  if (row.ref.startsWith("r2:") && env.MEDIA_R2) {
    const obj2 = await env.MEDIA_R2.get(row.ref.slice(3));
    if (!obj2) return null;
    return { buf: await obj2.arrayBuffer(), mime: row.mime ?? "application/octet-stream", name: row.name };
  }
  const obj = await mediaKv(env).get(row.ref.replace(/^kv:/, ""), { type: "arrayBuffer" });
  if (!obj) return null;
  return { buf: obj, mime: row.mime ?? "application/octet-stream", name: row.name };
}
async function listFiles(env) {
  return (await env.DB.prepare("SELECT id,name,size,mime,ref,created_at FROM files WHERE deleted_at IS NULL ORDER BY created_at DESC").all()).results;
}
async function softDeleteFile(env, id) {
  await env.DB.prepare("UPDATE files SET deleted_at=? WHERE id=?").bind(nowSec(), id).run();
}
async function audit(env, actor, action, target) {
  await env.DB.prepare("INSERT INTO audit_log (id,actor,action,target,timestamp) VALUES (?,?,?,?,?)").bind(randomId(), actor, action, target, nowSec()).run();
}

export { audit, getFile, listFiles, maxUploadMb, saveFile, setMaxUploadMb, softDeleteFile, storageMode };
