globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_Dn7U0_eq.mjs";
import { r as renderTemplate, m as maybeRenderHead, a as addAttribute } from "./sequence_I_kcixDX.mjs";
import { r as renderComponent } from "./worker-entry_DIzVSdtb.mjs";
import { env } from "cloudflare:workers";
import { $ as $$App } from "./App_B_2vQG1C.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$Backup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Backup;
  const { getSession } = await import("./auth_BbUuA01A.mjs");
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const isAdmin = ses.role === "admin" && ses.ctx === "org";
  if (!isAdmin) return Astro2.redirect("/settings", 302);
  const { getBackupState, getBackupSchedule, backupAlert } = await import("./backup_BeaU_72G.mjs");
  const { driveConnected } = await import("./drive_C0hGYyD2.mjs");
  const state = await getBackupState(env);
  const schedule = await getBackupSchedule(env);
  const alert = await backupAlert(env);
  const drive = await driveConnected(env).catch(() => false);
  const fmt = (s) => new Date(s * 1e3).toISOString().slice(0, 16).replace("T", " ");
  const modeLabel = (m) => m === "decrypted" ? "復号" : "暗号化のまま";
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "バックアップ", "active": "/settings" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>バックアップ</h1> <p class="muted">業務データ（会計・名簿・ファイル・設定）を 1 つのファイルにまとめて取得します。当社はデータを預からないため、バックアップは利用団体の自己責任です。定期的に取得し、復元できることをご確認ください。</p> ${alert.alert && renderTemplate`<div class="banner banner-warn">
⚠️ ${alert.never ? "まだ一度もバックアップが実行されていません。" : `最終バックアップから7日以上が経過しています（最終：${alert.lastAt ? fmt(alert.lastAt) : "—"}）。`}
下の「ローカルにダウンロード」または「Google ドライブへ保存」で今すぐ取得してください。
</div>`}<div class="card"> <h2 style="margin-top:0;border:0">最終バックアップ</h2> ${state ? renderTemplate`<p>${fmt(state.lastAt)}（${state.dest === "drive" ? "Google ドライブ" : "ローカル"}・${modeLabel(state.mode)}）／ テーブル ${state.tables} ・ ファイル ${state.files} 件</p>` : renderTemplate`<p class="muted">記録がありません。</p>`} </div> <div class="card"> <h2 style="margin-top:0;border:0">取得</h2> <fieldset style="border:1px solid #dde3ea;border-radius:6px;padding:.6rem .8rem"> <legend class="muted" style="font-size:.85rem">暗号化項目（会員PII・APIキー・ファイル）の扱い</legend> <label style="display:block;margin:.2rem 0"><input type="radio" name="mode" value="decrypted" checked> 復号して出力（既定）<span class="muted" style="font-size:.82rem"> — 別環境へ移行・中身を確認できます。<strong>平文の機微情報を含むため取扱注意</strong>（保管・共有に注意）。</span></label> <label style="display:block;margin:.2rem 0"><input type="radio" name="mode" value="raw"> 暗号化のまま出力<span class="muted" style="font-size:.82rem"> — 同じ環境（同一 MASTER_KEY）への復元向け。暗号鍵も同梱され自己完結します。</span></label> </fieldset> <div class="row" style="margin-top:.6rem"> <button class="btn btn-primary" id="dl" style="flex:0 0 auto">ローカルにダウンロード</button> <button class="btn" id="drv" style="flex:0 0 auto"${addAttribute(!drive, "disabled")}${addAttribute(drive ? "" : "Google ドライブ未連携", "title")}>Google ドライブへ保存</button> </div> ${!drive && renderTemplate`<p class="muted" style="font-size:.82rem;margin-top:.4rem">Google ドライブへ保存するには <a href="/drive">ドライブ連携</a> が必要です。</p>`} </div> ${drive && renderTemplate`<div class="card"> <h2 style="margin-top:0;border:0">定期バックアップ（Google ドライブ）</h2> <p class="muted" style="font-size:.85rem">有効にすると、定期実行（scheduler）で全データのアーカイブを Google ドライブへ自動保存します。</p> <label><input type="checkbox" id="schEnabled"${addAttribute(schedule.enabled, "checked")}> 自動バックアップを有効にする</label> <div style="margin-top:.4rem"> <label class="muted" style="font-size:.85rem">出力形式：
<select id="schMode" class="btn-sm"> <option value="raw"${addAttribute(schedule.mode !== "decrypted", "selected")}>暗号化のまま</option> <option value="decrypted"${addAttribute(schedule.mode === "decrypted", "selected")}>復号</option> </select> </label> </div> <div class="row" style="margin-top:.5rem"><button class="btn btn-primary" id="schSave" style="flex:0 0 auto">設定を保存</button></div> </div>`}<div class="card"> <h2 style="margin-top:0;border:0">復元</h2> <p class="muted" style="font-size:.85rem">バックアップファイルを読み込み、データを書き戻します。<strong>既存データを上書き</strong>します。主に空の別環境への移行用です。</p> <label for="rfile" style="display:block;font-weight:600;font-size:.85rem;margin-bottom:6px">復元するバックアップファイル</label> <input type="file" id="rfile" accept="application/json,.json" aria-label="復元するバックアップファイル"> <div class="row" style="margin-top:.5rem"><button class="btn btn-danger" id="restore" style="flex:0 0 auto">この内容で復元</button></div> </div>  `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template(['<script>\n    const mode = () => document.querySelector(\'input[name="mode"]:checked\')?.value || "decrypted";\n    document.getElementById("dl")?.addEventListener("click", async () => {\n      const m = mode();\n      if (m === "decrypted" && !(await window.bo.confirm("復号したバックアップには会員PII・APIキー等の平文が含まれます。安全な場所に保管してください。ダウンロードしますか？", { confirmLabel: "ダウンロード", danger: true }))) return;\n      window.bo.toast("ダウンロードを開始します…");\n      location.href = "/api/backup?mode=" + m;\n      setTimeout(() => location.reload(), 4000);\n    });\n    document.getElementById("drv")?.addEventListener("click", async (e) => {\n      const r = await window.bo.api("/api/backup", { _action: "drive", mode: mode() }, { btn: e.currentTarget, successMsg: null });\n      if (r.ok) { window.bo.toast(`ドライブへ保存しました（テーブル${r.data.tables}・ファイル${r.data.files}件）`); setTimeout(() => location.reload(), 1200); }\n    });\n    document.getElementById("schSave")?.addEventListener("click", async (e) => {\n      await window.bo.api("/api/backup", { _action: "schedule", enabled: document.getElementById("schEnabled").checked, mode: document.getElementById("schMode").value }, { btn: e.currentTarget, successMsg: "保存しました" });\n    });\n    document.getElementById("restore")?.addEventListener("click", async (e) => {\n      const f = document.getElementById("rfile").files?.[0];\n      if (!f) { window.bo.toast("ファイルを選択してください", "err"); return; }\n      if (!(await window.bo.confirm("バックアップから復元します。現在のデータを上書きします。よろしいですか？", { confirmLabel: "復元する", danger: true, irreversible: true }))) return;\n      let archive;\n      try { archive = JSON.parse(await f.text()); } catch { window.bo.toast("ファイルを読み込めません（JSON 不正）", "err"); return; }\n      const r = await window.bo.api("/api/backup", { _action: "restore", archive }, { btn: e.currentTarget, successMsg: null });\n      if (r.ok) window.bo.toast(`復元しました（行${r.data.rows}・KV${r.data.kv}・ファイル${r.data.files}件）`);\n    });\n  <\/script>'], ['<script>\n    const mode = () => document.querySelector(\'input[name="mode"]:checked\')?.value || "decrypted";\n    document.getElementById("dl")?.addEventListener("click", async () => {\n      const m = mode();\n      if (m === "decrypted" && !(await window.bo.confirm("復号したバックアップには会員PII・APIキー等の平文が含まれます。安全な場所に保管してください。ダウンロードしますか？", { confirmLabel: "ダウンロード", danger: true }))) return;\n      window.bo.toast("ダウンロードを開始します…");\n      location.href = "/api/backup?mode=" + m;\n      setTimeout(() => location.reload(), 4000);\n    });\n    document.getElementById("drv")?.addEventListener("click", async (e) => {\n      const r = await window.bo.api("/api/backup", { _action: "drive", mode: mode() }, { btn: e.currentTarget, successMsg: null });\n      if (r.ok) { window.bo.toast(\\`ドライブへ保存しました（テーブル\\${r.data.tables}・ファイル\\${r.data.files}件）\\`); setTimeout(() => location.reload(), 1200); }\n    });\n    document.getElementById("schSave")?.addEventListener("click", async (e) => {\n      await window.bo.api("/api/backup", { _action: "schedule", enabled: document.getElementById("schEnabled").checked, mode: document.getElementById("schMode").value }, { btn: e.currentTarget, successMsg: "保存しました" });\n    });\n    document.getElementById("restore")?.addEventListener("click", async (e) => {\n      const f = document.getElementById("rfile").files?.[0];\n      if (!f) { window.bo.toast("ファイルを選択してください", "err"); return; }\n      if (!(await window.bo.confirm("バックアップから復元します。現在のデータを上書きします。よろしいですか？", { confirmLabel: "復元する", danger: true, irreversible: true }))) return;\n      let archive;\n      try { archive = JSON.parse(await f.text()); } catch { window.bo.toast("ファイルを読み込めません（JSON 不正）", "err"); return; }\n      const r = await window.bo.api("/api/backup", { _action: "restore", archive }, { btn: e.currentTarget, successMsg: null });\n      if (r.ok) window.bo.toast(\\`復元しました（行\\${r.data.rows}・KV\\${r.data.kv}・ファイル\\${r.data.files}件）\\`);\n    });\n  <\/script>']))) })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/backup.astro", void 0);
const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/backup.astro";
const $$url = "/backup";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Backup,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
