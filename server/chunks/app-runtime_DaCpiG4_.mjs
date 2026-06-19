globalThis.process ??= {};
globalThis.process.env ??= {};
import { a as activeAppDefinition, v as validateDefinition, i as isBlockedHost } from "./external-apps_CNvt3_XH.mjs";
import { a as scopeCtx } from "./parts_D1i9CXVc.mjs";
const isFileRef = (v) => typeof v === "object" && v !== null && v.__file === true;
async function runApp(ctx, def, inputs, owner) {
  const bind = {};
  for (const inp of def.inputs ?? []) {
    const v = inputs[inp.name];
    if (inp.type === "file" && v && typeof v === "object" && "id" in v) {
      const f = v;
      bind[inp.name] = { __file: true, id: f.id, mime: f.mime, name: f.name };
    } else bind[inp.name] = v ?? inp.default ?? "";
  }
  const ref = (r) => typeof r === "string" && r.startsWith("$") ? bind[r.slice(1)] : r;
  const interp = (tpl) => tpl.replace(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (_m, k) => {
    const v = bind[k];
    return isFileRef(v) ? v.name ?? v.id : v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
  });
  const asText = (v) => v == null ? "" : isFileRef(v) ? v.name ?? v.id : typeof v === "object" ? JSON.stringify(v) : String(v);
  try {
    for (const s of def.steps) {
      const out = await runStep(ctx, def, s, { ref, interp, asText, bind, owner });
      if (s.as) bind[s.as] = out;
    }
    const o = def.output;
    const val = ref(o.from);
    if (o.type === "file") {
      if (!isFileRef(val)) return { ok: false, error: "出力ファイルが生成されませんでした。" };
      return { ok: true, output: { type: "file", value: val.id } };
    }
    if (o.type === "table") return { ok: true, output: { type: "table", value: Array.isArray(val) ? JSON.stringify(val) : asText(val) } };
    return { ok: true, output: { type: "text", value: asText(val) } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
async function runInstalledApp(ctx, appId, inputs, owner) {
  const app = await activeAppDefinition(ctx, appId);
  if (!app || !app.definition) return { ok: false, error: "アプリが見つかりません。" };
  const def = app.definition;
  if (!validateDefinition(def).ok) return { ok: false, error: "アプリ定義が不正なため実行できません。" };
  return runApp(scopeCtx(ctx, def.permissions), def, inputs, owner);
}
async function runStep(ctx, def, s, h) {
  switch (s.op) {
    case "ai.infer": {
      const attachments = [];
      for (const a of s.attach ?? []) {
        const v = h.ref(a);
        if (isFileRef(v)) {
          const f = await ctx.storage.getFile(v.id);
          if (f) attachments.push({ mime: f.mime, buf: f.buf, name: f.name });
        }
      }
      return ctx.ai.infer(h.interp(s.prompt ?? ""), { attachments });
    }
    case "transform": {
      if (typeof s.template === "string") return h.interp(s.template);
      let cur = h.ref(s.from);
      if (typeof cur === "string") {
        try {
          cur = JSON.parse(cur);
        } catch {
        }
      }
      for (const key of (s.path ?? "").split(".").filter(Boolean)) cur = cur == null ? void 0 : cur[key];
      return h.asText(cur);
    }
    case "file.save": {
      const content = h.asText(h.ref(s.from));
      const file = new File([content], s.filename ?? "output.txt", { type: s.mime ?? "text/plain" });
      const saved = await ctx.storage.saveFile(file, h.owner);
      return { __file: true, id: saved.id, mime: s.mime, name: s.filename };
    }
    case "file.read": {
      const v = h.ref(s.fileId);
      const id = isFileRef(v) ? v.id : String(v);
      const f = await ctx.storage.getFile(id);
      return f ? new TextDecoder().decode(f.buf) : "";
    }
    case "db.query": {
      const rows = await ctx.db.all(String(s.sql), (s.params ?? []).map(h.ref));
      return rows;
    }
    case "db.write": {
      const r = await ctx.db.run(String(s.sql), (s.params ?? []).map(h.ref));
      return { rowsWritten: r.rowsWritten };
    }
    case "http.fetch": {
      if (!def.permissions.includes("net")) throw new Error("http.fetch には net 権限が必要です。");
      const url = h.interp(s.url ?? "");
      let host;
      try {
        host = new URL(url).host;
      } catch {
        throw new Error("URL が不正です。");
      }
      if (!(def.allowHosts ?? []).includes(host)) throw new Error(`送信先 ${host} は allowHosts に未登録です。`);
      if (isBlockedHost(host)) throw new Error(`内部/ローカルのホストへは送信できません：${host}`);
      const r = await fetch(url, { method: s.method ?? "GET", ...s.body ? { body: h.interp(s.body) } : {} });
      return (await r.text()).slice(0, 2e5);
    }
    default:
      throw new Error(`未対応の op: ${s.op}`);
  }
}
export {
  runInstalledApp as r
};
