globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, F as Fragment, b as addAttribute } from '../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../chunks/App_BsKkCq3o.mjs';
import '../chunks/crypto_D21r3Dwx.mjs';
import { atLeast } from '../chunks/index_Cg172zdv.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Chat = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Chat;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses) return Astro2.redirect("/login", 302);
  const { cachedEntitlement } = await import('../chunks/client_DjSYVqc9.mjs');
  const entitlement = await cachedEntitlement(env).catch(() => "free");
  const hasPlus = atLeast(entitlement, "plus");
  const hasPro = atLeast(entitlement, "pro");
  const { listSessions } = await import('../chunks/chat-sessions_Da7FtWJ1.mjs');
  const sessions = hasPlus ? await listSessions(Astro2.locals.ctx, ses.uid).catch(() => []) : [];
  const isOrgAdmin = ses.role === "admin" && ses.ctx === "org";
  const { listSkills } = await import('../chunks/skills_ChuMVBl6.mjs');
  const skills = hasPlus && isOrgAdmin ? await listSkills(env).catch(() => []) : [];
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "AI", "active": "/chat", "data-astro-cid-wfrjesbw": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-wfrjesbw>AI</h1> ${!hasPlus && renderTemplate`<div class="card" data-astro-cid-wfrjesbw> <div class="banner banner-warn" data-astro-cid-wfrjesbw>この機能は <strong data-astro-cid-wfrjesbw>Plus 以上</strong>のプランで利用できます。</div> <p class="muted" data-astro-cid-wfrjesbw>集計・DB／ファイル検索・文書作成を会話で実行し、結果を PDF／TXT／md／HTML／CSV でダウンロードできます。</p> <a class="btn btn-primary" href="/billing" data-astro-cid-wfrjesbw>プラン・課金へ</a> </div>`}${hasPlus && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="chat" data-astro-cid-wfrjesbw> <aside class="sbar" data-astro-cid-wfrjesbw> <button class="btn btn-primary" id="new-ses" style="width:100%" data-astro-cid-wfrjesbw>＋ 新しい会話</button> <div class="ses-list" id="ses-list" data-astro-cid-wfrjesbw> ${sessions.map((s) => renderTemplate`<div class="ses-row"${addAttribute(s.id, "data-ses")} data-astro-cid-wfrjesbw> <a href="#" class="ses-open"${addAttribute(s.id, "data-id")} data-astro-cid-wfrjesbw>${s.title || "\uFF08\u7121\u984C\uFF09"}</a> <button class="ses-del"${addAttribute(s.id, "data-id")} title="削除" data-astro-cid-wfrjesbw>×</button> </div>`)} ${sessions.length === 0 && renderTemplate`<p class="muted" style="font-size:.82rem;padding:6px" data-astro-cid-wfrjesbw>会話はまだありません。</p>`} </div> </aside> <section class="pane" data-astro-cid-wfrjesbw> <div class="cbar" data-astro-cid-wfrjesbw> <label class="muted" style="font-size:.82rem" data-astro-cid-wfrjesbw>モデル：
<select id="model" data-astro-cid-wfrjesbw> <option value="gemini" data-astro-cid-wfrjesbw>Gemini（標準・無料枠）</option> <option value="claude" data-astro-cid-wfrjesbw>Claude（高精度・要キー）</option> <option value="local" data-astro-cid-wfrjesbw>ローカル（簡易）</option> </select> </label> </div> <div id="log" data-astro-cid-wfrjesbw></div> ${hasPro && renderTemplate`<label class="muted" style="font-size:.8rem;display:flex;align-items:center;gap:6px;margin-top:8px" data-astro-cid-wfrjesbw> <input type="checkbox" id="bgrun" data-astro-cid-wfrjesbw> バックグラウンドで実行（重い・多段の依頼向け。完了するとこの会話に結果が追記されます）
</label>`} <div class="cinput" data-astro-cid-wfrjesbw> <input type="file" id="att" accept="image/*,application/pdf" hidden data-astro-cid-wfrjesbw> <button class="btn" id="att-btn" type="button" title="ファイルを添付（画像・PDF）" style="flex:0 0 auto" data-astro-cid-wfrjesbw>📎</button> <textarea id="msg" placeholder="メッセージを入力（Ctrl/⌘+Enter で送信）" data-astro-cid-wfrjesbw></textarea> <button class="btn btn-primary" id="send" style="flex:0 0 auto" data-astro-cid-wfrjesbw>送信</button> </div> <p id="att-name" class="muted" style="font-size:.78rem;margin:4px 0 0" data-astro-cid-wfrjesbw></p> ${hasPro && renderTemplate`<p class="muted" style="font-size:.76rem;margin-top:6px" data-astro-cid-wfrjesbw>複雑な依頼は内部で役割ごとの子エージェントに分担・並列処理します（無料枠は並列2まで。上限は設定→高度なオプションで拡張）。</p>`} </section> </div> ${isOrgAdmin && renderTemplate`<details class="skills-box" style="margin-top:1rem" data-astro-cid-wfrjesbw> <summary data-astro-cid-wfrjesbw><strong data-astro-cid-wfrjesbw>スキル管理</strong>（Agent Skills・コード実行/従量課金）</summary> <p class="muted" style="font-size:.85rem" data-astro-cid-wfrjesbw>SKILL.md を登録して独自業務スキルを追加（Worker内でevalしません）。mode=instruction（通常費）／code（Anthropic code execution＝従量課金）。有効化すると「〇〇スキルで…」で実行（要 Claude）。</p> <div class="card" data-astro-cid-wfrjesbw> <p class="muted" data-astro-cid-wfrjesbw>🤖 <strong data-astro-cid-wfrjesbw>AIに作らせる</strong>：やりたいことを書くと、AI がスキルを設計して<strong data-astro-cid-wfrjesbw>無効状態で自動登録</strong>します。確認して下で有効化してください。</p> <div class="row" data-astro-cid-wfrjesbw><input id="skreq" placeholder="例：月次の会費集計表を作るスキル" data-astro-cid-wfrjesbw><button class="btn btn-primary" id="skgen" style="flex:0 0 auto" data-astro-cid-wfrjesbw>AIに作らせる</button></div> </div> <details style="margin-top:.5rem" data-astro-cid-wfrjesbw><summary data-astro-cid-wfrjesbw>スキルを手動で追加</summary> <div class="field" data-astro-cid-wfrjesbw><input id="sname" placeholder="スキル名（呼び出し名）" data-astro-cid-wfrjesbw></div> <div class="row" data-astro-cid-wfrjesbw><input id="sdesc" placeholder="説明（任意）" data-astro-cid-wfrjesbw><select id="smode" style="flex:0 0 200px" data-astro-cid-wfrjesbw><option value="instruction" data-astro-cid-wfrjesbw>instruction（通常費）</option><option value="code" data-astro-cid-wfrjesbw>code（従量課金）</option></select></div> <div class="field" data-astro-cid-wfrjesbw><textarea id="smd" rows="5" placeholder="SKILL.md（手順・テンプレート）" data-astro-cid-wfrjesbw></textarea></div> <button class="btn btn-primary" id="skadd" data-astro-cid-wfrjesbw>登録（無効状態で保存）</button> </details> <div class="table-wrap" style="margin-top:.5rem" data-astro-cid-wfrjesbw><table data-astro-cid-wfrjesbw><thead data-astro-cid-wfrjesbw><tr data-astro-cid-wfrjesbw><th data-astro-cid-wfrjesbw>名前</th><th data-astro-cid-wfrjesbw>モード</th><th data-astro-cid-wfrjesbw>状態</th><th data-astro-cid-wfrjesbw>操作</th></tr></thead><tbody data-astro-cid-wfrjesbw> ${skills.map((s) => renderTemplate`<tr${addAttribute(s.id, "data-sid")} data-astro-cid-wfrjesbw><td data-astro-cid-wfrjesbw>${s.name}<div class="muted" data-astro-cid-wfrjesbw>${s.description ?? ""}</div></td><td data-astro-cid-wfrjesbw><span class="pill" data-astro-cid-wfrjesbw>${s.mode}</span></td><td data-astro-cid-wfrjesbw>${s.enabled ? "\u6709\u52B9" : "\u7121\u52B9"}</td><td data-astro-cid-wfrjesbw>${s.enabled ? renderTemplate`<button class="btn btn-sm btn-warn sdis" data-astro-cid-wfrjesbw>無効化</button>` : renderTemplate`<button class="btn btn-sm btn-ok sen" data-astro-cid-wfrjesbw>有効化</button>`} <button class="btn btn-sm btn-danger sdel" data-astro-cid-wfrjesbw>削除</button></td></tr>`)} ${skills.length === 0 && renderTemplate`<tr data-astro-cid-wfrjesbw><td colspan="4" class="muted" data-astro-cid-wfrjesbw>スキルは未登録です。</td></tr>`} </tbody></table></div> </details>`}` })}`} `, "scripts": async ($$result2) => renderTemplate(_a || (_a = __template([`<script>
    (function () {
        const log = document.getElementById("log");
        if (!log) return;  // Plus\u672A\u6E80\u306F\u8981\u7D20\u304C\u7121\u3044
        const sel = document.getElementById("model");
        let sessionId = "";
        const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
        function dload(text, ext, mime) {
          if (ext === "pdf") {
            const w = window.open("", "_blank");
            if (!w) { window.bo.toast("PDF\u5316\u306F\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u8A31\u53EF\u304C\u5FC5\u8981\u3067\u3059", "err"); return; }
            w.document.write('<title>baku-office</title><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;padding:24px">' + esc(text) + "</pre>");
            w.document.close(); w.focus(); w.print(); return;
          }
          let body = text;
          if (ext === "html") body = '<!doctype html><meta charset="utf-8"><title>baku-office</title><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">' + esc(text) + "</pre>";
          const blob = new Blob([body], { type: mime || "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "baku-office-" + Date.now() + "." + ext;
          document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        }
        function addMsg(role, text) {
          const d = document.createElement("div");
          d.className = "cmsg " + role;
          d.innerHTML = '<div class="cbub">' + esc(text).replace(/\\n/g, "<br>") + "</div>";
          if (role === "a") {
            const dl = document.createElement("div"); dl.className = "cdl"; dl.append("DL\uFF1A");
            [["txt", "text/plain"], ["md", "text/markdown"], ["html", "text/html"], ["csv", "text/csv"], ["pdf", ""]].forEach(([ext, mime]) => {
              const a = document.createElement("a"); a.href = "#"; a.textContent = ext.toUpperCase();
              a.addEventListener("click", (e) => { e.preventDefault(); dload(text, ext, mime); });
              dl.appendChild(a);
            });
            d.appendChild(dl);
          }
          log.appendChild(d); log.scrollTop = log.scrollHeight;
        }
        // \u30BB\u30C3\u30B7\u30E7\u30F3\u3092\u958B\u304F\uFF08\u5C65\u6B74\u30ED\u30FC\u30C9\uFF09\u3002
        async function openSession(id) {
          sessionId = id; log.innerHTML = "";
          [...document.querySelectorAll(".ses-row")].forEach((r) => r.classList.toggle("on", r.getAttribute("data-ses") === id));
          const r = await window.bo.api("/api/chat-sessions?id=" + encodeURIComponent(id), undefined, { method: "GET", successMsg: null });
          if (r.ok) (r.data.messages || []).forEach((m) => addMsg(m.role === "assistant" ? "a" : "u", m.content));
        }
        // \u30B5\u30A4\u30C9\u30D0\u30FC\u518D\u63CF\u753B\u3002
        function renderSessions(sessions) {
          const list = document.getElementById("ses-list");
          list.innerHTML = sessions.length ? "" : '<p class="muted" style="font-size:.82rem;padding:6px">\u4F1A\u8A71\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002</p>';
          sessions.forEach((s) => {
            const row = document.createElement("div"); row.className = "ses-row"; row.setAttribute("data-ses", s.id);
            if (s.id === sessionId) row.classList.add("on");
            const a = document.createElement("a"); a.href = "#"; a.className = "ses-open"; a.textContent = s.title || "\uFF08\u7121\u984C\uFF09";
            a.addEventListener("click", (e) => { e.preventDefault(); openSession(s.id); });
            const del = document.createElement("button"); del.className = "ses-del"; del.textContent = "\xD7";
            del.addEventListener("click", async (e) => {
              e.preventDefault();
              const rr = await window.bo.api("/api/chat-sessions", { _action: "delete", id: s.id }, { btn: del, successMsg: "\u524A\u9664\u3057\u307E\u3057\u305F" });
              if (rr.ok) { if (s.id === sessionId) { sessionId = ""; log.innerHTML = ""; } reloadSessions(); }
            });
            row.append(a, del); list.appendChild(row);
          });
        }
        async function reloadSessions() {
          const r = await window.bo.api("/api/chat-sessions", undefined, { method: "GET", successMsg: null });
          if (r.ok) renderSessions(r.data.sessions || []);
        }
        // \u30D5\u30A1\u30A4\u30EB\u6DFB\u4ED8\uFF08\u753B\u50CF/PDF\uFF09\uFF1A\u9078\u629E\u30D5\u30A1\u30A4\u30EB\u3092 base64 \u5316\u3057\u3066 /api/chat \u306E image \u306B\u4E57\u305B\u308B\uFF08API \u306F\u53D7\u9818\u6E08\u307F\uFF09\u3002
        let pendingImage = null;
        let pendingFileName = "";
        const att = document.getElementById("att");
        document.getElementById("att-btn")?.addEventListener("click", () => att?.click());
        att?.addEventListener("change", () => {
          const f = att.files && att.files[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => {
            const url = String(reader.result);
            pendingImage = { mimeType: f.type || "application/octet-stream", dataB64: url.split(",")[1] || "" };
            pendingFileName = f.name;
            const nm = document.getElementById("att-name"); if (nm) nm.textContent = "\u{1F4CE} " + f.name;
          };
          reader.readAsDataURL(f);
        });
        function clearAttach() {
          pendingImage = null; pendingFileName = "";
          if (att) att.value = "";
          const nm = document.getElementById("att-name"); if (nm) nm.textContent = "";
        }
        async function send() {
          const ta = document.getElementById("msg");
          const text = ta.value.trim(); if (!text && !pendingImage) return;
          addMsg("u", text + (pendingFileName ? \`\\n\uFF08\u6DFB\u4ED8: \${pendingFileName}\uFF09\` : "")); ta.value = "";
          const background = !!document.getElementById("bgrun")?.checked;
          const body = { message: text, sessionId: sessionId || undefined, model: sel.value, background };
          if (pendingImage) body.image = pendingImage;
          const r = await window.bo.api("/api/chat", body, { btn: document.getElementById("send"), successMsg: null });
          clearAttach();
          if (r.ok) {
            addMsg("a", r.data.reply);
            const isNew = !sessionId;
            sessionId = r.data.sessionId;
            if (isNew) reloadSessions();
          }
        }
        document.getElementById("new-ses")?.addEventListener("click", () => { sessionId = ""; log.innerHTML = ""; [...document.querySelectorAll(".ses-row")].forEach((r) => r.classList.remove("on")); document.getElementById("msg")?.focus(); });
        document.getElementById("send")?.addEventListener("click", send);
        document.getElementById("msg")?.addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); } });
        // \u65E2\u5B58\u30BB\u30C3\u30B7\u30E7\u30F3\u884C\uFF08SSR\u5206\uFF09\u306E\u914D\u7DDA\u3002
        document.querySelectorAll(".ses-row").forEach((row) => {
          const id = row.getAttribute("data-ses");
          row.querySelector(".ses-open")?.addEventListener("click", (e) => { e.preventDefault(); openSession(id); });
          row.querySelector(".ses-del")?.addEventListener("click", async (e) => {
            e.preventDefault();
            const rr = await window.bo.api("/api/chat-sessions", { _action: "delete", id }, { btn: e.currentTarget, successMsg: "\u524A\u9664\u3057\u307E\u3057\u305F" });
            if (rr.ok) { if (id === sessionId) { sessionId = ""; log.innerHTML = ""; } reloadSessions(); }
          });
        });
        // --- \u30B9\u30AD\u30EB\u7BA1\u7406\uFF08\u7BA1\u7406\u8005\u306E\u307F\u8981\u7D20\u304C\u5B58\u5728\uFF09 ---
        const sk = (b, btn) => window.bo.api("/api/skills", b, { btn });
        document.getElementById("skgen")?.addEventListener("click", async (e) => {
          const request = document.getElementById("skreq").value.trim();
          if (!request) { window.bo.toast("\u4F5C\u308A\u305F\u3044\u30B9\u30AD\u30EB\u306E\u8981\u671B\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", "err"); return; }
          const r = await sk({ _action: "generate", request }, e.currentTarget);
          if (r.ok) { window.bo.toast("\u30B9\u30AD\u30EB\u300C" + (r.data.name || "") + "\u300D\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F\uFF08\u7121\u52B9\u72B6\u614B\uFF09"); setTimeout(() => location.reload(), 900); }
        });
        document.getElementById("skadd")?.addEventListener("click", async (e) => {
          const r = await sk({ _action: "create", name: document.getElementById("sname").value, description: document.getElementById("sdesc").value, mode: document.getElementById("smode").value, skill_md: document.getElementById("smd").value }, e.currentTarget);
          if (r.ok) { window.bo.toast("\u767B\u9332\u3057\u307E\u3057\u305F\uFF08\u7121\u52B9\u72B6\u614B\uFF09"); setTimeout(() => location.reload(), 600); }
        });
        document.querySelectorAll("tr[data-sid]").forEach((tr) => {
          const id = tr.dataset.sid;
          tr.querySelector(".sen")?.addEventListener("click", async (e) => { const r = await sk({ _action: "enable", id, enabled: true }, e.target); if (r.ok) setTimeout(() => location.reload(), 500); });
          tr.querySelector(".sdis")?.addEventListener("click", async (e) => { const r = await sk({ _action: "enable", id, enabled: false }, e.target); if (r.ok) setTimeout(() => location.reload(), 500); });
          tr.querySelector(".sdel")?.addEventListener("click", async (e) => { if (await window.bo.confirm("\u3053\u306E\u30B9\u30AD\u30EB\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F", { confirmLabel: "\u524A\u9664", danger: true })) { const r = await sk({ _action: "delete", id }, e.target); if (r.ok) setTimeout(() => location.reload(), 500); } });
        });
    })();
  <\/script>`], [`<script>
    (function () {
        const log = document.getElementById("log");
        if (!log) return;  // Plus\u672A\u6E80\u306F\u8981\u7D20\u304C\u7121\u3044
        const sel = document.getElementById("model");
        let sessionId = "";
        const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
        function dload(text, ext, mime) {
          if (ext === "pdf") {
            const w = window.open("", "_blank");
            if (!w) { window.bo.toast("PDF\u5316\u306F\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u8A31\u53EF\u304C\u5FC5\u8981\u3067\u3059", "err"); return; }
            w.document.write('<title>baku-office</title><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;padding:24px">' + esc(text) + "</pre>");
            w.document.close(); w.focus(); w.print(); return;
          }
          let body = text;
          if (ext === "html") body = '<!doctype html><meta charset="utf-8"><title>baku-office</title><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">' + esc(text) + "</pre>";
          const blob = new Blob([body], { type: mime || "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = "baku-office-" + Date.now() + "." + ext;
          document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        }
        function addMsg(role, text) {
          const d = document.createElement("div");
          d.className = "cmsg " + role;
          d.innerHTML = '<div class="cbub">' + esc(text).replace(/\\\\n/g, "<br>") + "</div>";
          if (role === "a") {
            const dl = document.createElement("div"); dl.className = "cdl"; dl.append("DL\uFF1A");
            [["txt", "text/plain"], ["md", "text/markdown"], ["html", "text/html"], ["csv", "text/csv"], ["pdf", ""]].forEach(([ext, mime]) => {
              const a = document.createElement("a"); a.href = "#"; a.textContent = ext.toUpperCase();
              a.addEventListener("click", (e) => { e.preventDefault(); dload(text, ext, mime); });
              dl.appendChild(a);
            });
            d.appendChild(dl);
          }
          log.appendChild(d); log.scrollTop = log.scrollHeight;
        }
        // \u30BB\u30C3\u30B7\u30E7\u30F3\u3092\u958B\u304F\uFF08\u5C65\u6B74\u30ED\u30FC\u30C9\uFF09\u3002
        async function openSession(id) {
          sessionId = id; log.innerHTML = "";
          [...document.querySelectorAll(".ses-row")].forEach((r) => r.classList.toggle("on", r.getAttribute("data-ses") === id));
          const r = await window.bo.api("/api/chat-sessions?id=" + encodeURIComponent(id), undefined, { method: "GET", successMsg: null });
          if (r.ok) (r.data.messages || []).forEach((m) => addMsg(m.role === "assistant" ? "a" : "u", m.content));
        }
        // \u30B5\u30A4\u30C9\u30D0\u30FC\u518D\u63CF\u753B\u3002
        function renderSessions(sessions) {
          const list = document.getElementById("ses-list");
          list.innerHTML = sessions.length ? "" : '<p class="muted" style="font-size:.82rem;padding:6px">\u4F1A\u8A71\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002</p>';
          sessions.forEach((s) => {
            const row = document.createElement("div"); row.className = "ses-row"; row.setAttribute("data-ses", s.id);
            if (s.id === sessionId) row.classList.add("on");
            const a = document.createElement("a"); a.href = "#"; a.className = "ses-open"; a.textContent = s.title || "\uFF08\u7121\u984C\uFF09";
            a.addEventListener("click", (e) => { e.preventDefault(); openSession(s.id); });
            const del = document.createElement("button"); del.className = "ses-del"; del.textContent = "\xD7";
            del.addEventListener("click", async (e) => {
              e.preventDefault();
              const rr = await window.bo.api("/api/chat-sessions", { _action: "delete", id: s.id }, { btn: del, successMsg: "\u524A\u9664\u3057\u307E\u3057\u305F" });
              if (rr.ok) { if (s.id === sessionId) { sessionId = ""; log.innerHTML = ""; } reloadSessions(); }
            });
            row.append(a, del); list.appendChild(row);
          });
        }
        async function reloadSessions() {
          const r = await window.bo.api("/api/chat-sessions", undefined, { method: "GET", successMsg: null });
          if (r.ok) renderSessions(r.data.sessions || []);
        }
        // \u30D5\u30A1\u30A4\u30EB\u6DFB\u4ED8\uFF08\u753B\u50CF/PDF\uFF09\uFF1A\u9078\u629E\u30D5\u30A1\u30A4\u30EB\u3092 base64 \u5316\u3057\u3066 /api/chat \u306E image \u306B\u4E57\u305B\u308B\uFF08API \u306F\u53D7\u9818\u6E08\u307F\uFF09\u3002
        let pendingImage = null;
        let pendingFileName = "";
        const att = document.getElementById("att");
        document.getElementById("att-btn")?.addEventListener("click", () => att?.click());
        att?.addEventListener("change", () => {
          const f = att.files && att.files[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => {
            const url = String(reader.result);
            pendingImage = { mimeType: f.type || "application/octet-stream", dataB64: url.split(",")[1] || "" };
            pendingFileName = f.name;
            const nm = document.getElementById("att-name"); if (nm) nm.textContent = "\u{1F4CE} " + f.name;
          };
          reader.readAsDataURL(f);
        });
        function clearAttach() {
          pendingImage = null; pendingFileName = "";
          if (att) att.value = "";
          const nm = document.getElementById("att-name"); if (nm) nm.textContent = "";
        }
        async function send() {
          const ta = document.getElementById("msg");
          const text = ta.value.trim(); if (!text && !pendingImage) return;
          addMsg("u", text + (pendingFileName ? \\\`\\\\n\uFF08\u6DFB\u4ED8: \\\${pendingFileName}\uFF09\\\` : "")); ta.value = "";
          const background = !!document.getElementById("bgrun")?.checked;
          const body = { message: text, sessionId: sessionId || undefined, model: sel.value, background };
          if (pendingImage) body.image = pendingImage;
          const r = await window.bo.api("/api/chat", body, { btn: document.getElementById("send"), successMsg: null });
          clearAttach();
          if (r.ok) {
            addMsg("a", r.data.reply);
            const isNew = !sessionId;
            sessionId = r.data.sessionId;
            if (isNew) reloadSessions();
          }
        }
        document.getElementById("new-ses")?.addEventListener("click", () => { sessionId = ""; log.innerHTML = ""; [...document.querySelectorAll(".ses-row")].forEach((r) => r.classList.remove("on")); document.getElementById("msg")?.focus(); });
        document.getElementById("send")?.addEventListener("click", send);
        document.getElementById("msg")?.addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); } });
        // \u65E2\u5B58\u30BB\u30C3\u30B7\u30E7\u30F3\u884C\uFF08SSR\u5206\uFF09\u306E\u914D\u7DDA\u3002
        document.querySelectorAll(".ses-row").forEach((row) => {
          const id = row.getAttribute("data-ses");
          row.querySelector(".ses-open")?.addEventListener("click", (e) => { e.preventDefault(); openSession(id); });
          row.querySelector(".ses-del")?.addEventListener("click", async (e) => {
            e.preventDefault();
            const rr = await window.bo.api("/api/chat-sessions", { _action: "delete", id }, { btn: e.currentTarget, successMsg: "\u524A\u9664\u3057\u307E\u3057\u305F" });
            if (rr.ok) { if (id === sessionId) { sessionId = ""; log.innerHTML = ""; } reloadSessions(); }
          });
        });
        // --- \u30B9\u30AD\u30EB\u7BA1\u7406\uFF08\u7BA1\u7406\u8005\u306E\u307F\u8981\u7D20\u304C\u5B58\u5728\uFF09 ---
        const sk = (b, btn) => window.bo.api("/api/skills", b, { btn });
        document.getElementById("skgen")?.addEventListener("click", async (e) => {
          const request = document.getElementById("skreq").value.trim();
          if (!request) { window.bo.toast("\u4F5C\u308A\u305F\u3044\u30B9\u30AD\u30EB\u306E\u8981\u671B\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", "err"); return; }
          const r = await sk({ _action: "generate", request }, e.currentTarget);
          if (r.ok) { window.bo.toast("\u30B9\u30AD\u30EB\u300C" + (r.data.name || "") + "\u300D\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F\uFF08\u7121\u52B9\u72B6\u614B\uFF09"); setTimeout(() => location.reload(), 900); }
        });
        document.getElementById("skadd")?.addEventListener("click", async (e) => {
          const r = await sk({ _action: "create", name: document.getElementById("sname").value, description: document.getElementById("sdesc").value, mode: document.getElementById("smode").value, skill_md: document.getElementById("smd").value }, e.currentTarget);
          if (r.ok) { window.bo.toast("\u767B\u9332\u3057\u307E\u3057\u305F\uFF08\u7121\u52B9\u72B6\u614B\uFF09"); setTimeout(() => location.reload(), 600); }
        });
        document.querySelectorAll("tr[data-sid]").forEach((tr) => {
          const id = tr.dataset.sid;
          tr.querySelector(".sen")?.addEventListener("click", async (e) => { const r = await sk({ _action: "enable", id, enabled: true }, e.target); if (r.ok) setTimeout(() => location.reload(), 500); });
          tr.querySelector(".sdis")?.addEventListener("click", async (e) => { const r = await sk({ _action: "enable", id, enabled: false }, e.target); if (r.ok) setTimeout(() => location.reload(), 500); });
          tr.querySelector(".sdel")?.addEventListener("click", async (e) => { if (await window.bo.confirm("\u3053\u306E\u30B9\u30AD\u30EB\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F", { confirmLabel: "\u524A\u9664", danger: true })) { const r = await sk({ _action: "delete", id }, e.target); if (r.ok) setTimeout(() => location.reload(), 500); } });
        });
    })();
  <\/script>`]))) })} `;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/chat.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/chat.astro";
const $$url = "/chat";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Chat,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
