globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as renderComponent, r as renderTemplate, g as createAstro, m as maybeRenderHead, b as addAttribute, F as Fragment } from '../../chunks/astro/server_DRI6mTND.mjs';
import { $ as $$App } from '../../chunks/App_BsKkCq3o.mjs';
import '../../chunks/crypto_D21r3Dwx.mjs';
import { atLeast } from '../../chunks/index_Cg172zdv.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Advanced = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Advanced;
  const env = Astro2.locals.runtime.env;
  const { getSession } = await import('../../chunks/auth_BDOdme1H.mjs');
  const ses = await getSession(env, Astro2.request);
  if (!ses || ses.role !== "admin" || ses.ctx !== "org") return Astro2.redirect("/login", 302);
  const entitlement = await (await import('../../chunks/client_DjSYVqc9.mjs')).cachedEntitlement(env);
  const hasPlus = atLeast(entitlement, "plus");
  const hasPro = atLeast(entitlement, "pro");
  const { getAiEngine, getCustomPrompt, getWorkersPaid, getNotifyWebhook } = await import('../../chunks/settings_DSJfWsdt.mjs');
  const workersPaid = hasPlus ? await getWorkersPaid(env) : false;
  const { getAutonomyConfig, ghDeviceAvailable } = await import('../../chunks/autonomy_CKEyr57X.mjs');
  const auto = hasPro ? await getAutonomyConfig(env) : { on: false, cfToken: false, cfAccount: "", ghToken: false, ghRepo: "" };
  const ghAuto = hasPro && await ghDeviceAvailable(env);
  const { hasApiKey } = await import('../../chunks/client_DjSYVqc9.mjs');
  const engine = hasPlus ? await getAiEngine(env) : "gemini";
  const custom = hasPlus ? await getCustomPrompt(env) : "";
  const notifyWebhook = await getNotifyWebhook(env);
  const claudeSet = hasPlus ? await hasApiKey(env, "claude") : false;
  const { storageMode, maxUploadMb } = await import('../../chunks/storage_ComUGkKO.mjs');
  const mode = storageMode(env);
  const curMax = hasPlus ? await maxUploadMb(env) : 5;
  return renderTemplate`${renderComponent($$result, "App", $$App, { "title": "\u9AD8\u5EA6\u306A\u30AA\u30D7\u30B7\u30E7\u30F3", "active": "/settings" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>高度なオプション</h1> ${!hasPlus && renderTemplate`<div class="card"> <div class="banner banner-warn">この機能は <strong>Plus 以上</strong>のプランで利用できます。</div> <p class="muted">AIエンジン選択／カスタム指示／KVアップロードサイズ上限／Workers Paid 案内などの高度な設定は、Plus 以上で開放されます。</p> <a class="btn btn-primary" href="/billing">プラン・課金へ</a> </div>`}${hasPlus && renderTemplate`<div class="adv"> <p class="muted">見た目（テーマ）は「アプリ → ブランド設定」、任意API・ストレージ容量は「使用量・上限」、メニューの出し入れは「アプリ」から行えます。</p> <h2>AIエンジン</h2> <div class="card"> <p class="muted">通常の回答に使うエンジンを選択します。<strong>Gemini</strong>は無料枠、<strong>Claude</strong>は高精度（BYOK・任意設定）。Claude は Pro 限定ではなく、Plus 以上で APIキーを登録すれば選べます。</p> <div class="field"><label><input type="radio" name="engine" value="gemini"${addAttribute(engine === "gemini", "checked")}> Gemini（無料枠）</label></div> <div class="field"><label><input type="radio" name="engine" value="claude"${addAttribute(engine === "claude", "checked")}> Claude（BYOK・要APIキー）</label></div> <div class="field"><input id="claudeKey" type="password"${addAttribute(claudeSet ? "Claude API\u30AD\u30FC\uFF08\u8A2D\u5B9A\u6E08\u307F\u30FB\u5909\u66F4\u6642\u306E\u307F\u5165\u529B\uFF09" : "Claude API\u30AD\u30FC\uFF08Claude\u9078\u629E\u6642\u306B\u5FC5\u8981\uFF09", "placeholder")}></div> <button class="btn btn-primary" id="saveEngine">エンジン設定を保存</button> </div> <h2>カスタム指示（口調・人格・回答形式）</h2> <div class="card"> <p class="muted">AIへ常に追加する指示。例：「丁寧語で簡潔に」「箇条書き中心」「団体名は○○会」。安全制約（破壊操作の確認など）は変更されません。</p> <div class="field"><textarea id="customPrompt" rows="4" placeholder="例：回答は敬語で簡潔に。金額は¥表記。専門用語は補足を添える。">${custom}</textarea></div> <button class="btn btn-primary" id="savePrompt">カスタム指示を保存</button> </div> <h2>通知 Webhook（任意・Discord 等）</h2> <div class="card"> <p class="muted">自動取込（組織宛）の期日リマインダー等を外部へプッシュします。Discord のチャンネル Webhook URL を推奨。未設定でもアプリ内（ヘッダのベル🔔）には通知されます。</p> <div class="row"><input id="notifyWebhook" type="url" placeholder="https://discord.com/api/webhooks/..."${addAttribute(notifyWebhook, "value")} style="flex:1"><button class="btn btn-primary" id="saveWebhook" style="flex:0 0 auto">保存</button></div> </div> <h2>KVアップロードサイズ上限（標準モード）</h2> <div class="card"> <p class="muted">現在：<strong>${mode === "r2" ? "\u9AD8\u5EA6\u30E2\u30FC\u30C9\uFF08R2\u30FB\u4E0A\u9650\u306A\u3057\uFF09" : `\u6A19\u6E96\u30E2\u30FC\u30C9\uFF08KV\uFF09\u30FB1\u30D5\u30A1\u30A4\u30EB\u4E0A\u9650 ${curMax}MB`}</strong>。KVの値上限は <strong>25MiB</strong> までで、既定は安全側の5MB。下で1〜25MBに変更できます（R2有効時はこの上限は無視）。</p> <div class="row"><input id="maxmb" type="number" min="1" max="25"${addAttribute(curMax, "value")} style="flex:0 0 120px"><button class="btn btn-primary" id="saveMax" style="flex:0 0 auto">上限を保存</button></div> </div> <h2>ファイル保存を強化（R2・高度モード）</h2> <div class="card"> <p class="muted">現在：<strong>${mode === "r2" ? "\u9AD8\u5EA6\u30E2\u30FC\u30C9\uFF08R2 \u6709\u52B9\u30FB1\u30D5\u30A1\u30A4\u30EB\u4E0A\u9650\u306A\u3057\uFF09" : "\u6A19\u6E96\u30E2\u30FC\u30C9\uFF08KV\u30FB\u4E0A\u9650\u3042\u308A\uFF09"}</strong>。R2 を有効化すると、領収書画像・契約書・大きな添付などを本格的に保存できます。</p> <h3 style="margin:.6rem 0 .2rem">できること</h3> <ul class="clean"> <li>大容量ファイルの保存（<strong>1ファイル上限なし</strong>。KV標準モードの 25MiB/日次書込制限を回避）。</li> <li>領収書・契約書・写真・音声など、業務ファイルの蓄積と横断利用（OCR・要約の元データ保管にも）。</li> <li>有効化を自動検出して切り替え（コード変更不要）。Googleドライブ連携とも併用できます。</li> </ul> <h3 style="margin:.6rem 0 .2rem">こんなときに必要</h3> <ul class="clean"> <li>ファイルを日常的に多数／大きいサイズで扱う団体。</li> <li>標準モード（KV）で「アップロード上限」や書込制限に当たるようになった。</li> <li>画像・PDF などの原本を長期保管したい。</li> </ul> ${mode === "r2" ? renderTemplate`<div class="banner banner-info">✅ R2 はすでに有効です（高度モード）。ファイルは上限なしで R2 に保存されます。</div>` : renderTemplate`<details open> <summary><strong>R2 を登録する（お客様の Cloudflare で設定）</strong></summary> <ol style="margin:.4rem 0;padding-left:1.2rem;line-height:1.9"> <li>Cloudflare ダッシュボード → <strong>R2</strong> を開き、<strong>支払い方法（カード）を登録</strong>（R2 の有効化に必要。無料枠内なら課金は発生しません）。</li> <li>R2 → <strong>バケットを作成</strong>（名前は任意。例 <code>baku-office-media</code>）。</li> <li><strong>Workers &amp; Pages</strong> → このアプリの Worker（<code>baku-office-app</code>）→ <strong>Settings → Bindings → Add → R2 bucket</strong> を選択。</li> <li>変数名（Variable name）は必ず <strong><code>MEDIA_R2</code></strong> とし、作成したバケットを選んで保存。</li> <li>保存後にデプロイ（または再デプロイ）すると、自動的に<strong>高度モード（R2）</strong>へ切り替わります。</li> </ol> <div class="row" style="margin-top:.3rem"> <a class="btn btn-primary" href="https://dash.cloudflare.com/?to=/:account/r2" target="_blank" rel="noopener" style="flex:0 0 auto">Cloudflare R2 を開く</a> <a class="btn btn-ghost" href="https://developers.cloudflare.com/r2/buckets/" target="_blank" rel="noopener" style="flex:0 0 auto">バケット作成の手順</a> </div> <p class="muted" style="font-size:.8rem;margin-top:.5rem">⚠️ R2 はカード登録が前提です。使用量に応じた従量課金（無料枠あり）で、支払い方法が無効のまま30日経過すると R2 のデータが削除され得ます（標準モードの KV は影響を受けません）。設定はお客様の Cloudflare 操作で、当社は手順案内のみを行います。</p> </details>`} </div> <h2>マルチエージェント（Pro 以上）</h2> ${!hasPro && renderTemplate`<div class="card"><p class="muted">複数の専門エージェントを役割分担・並列・バックグラウンドで動かす機能は <strong>Pro 以上</strong>で開放されます。<a href="/billing">プラン・課金へ</a></p></div>`} ${hasPro && renderTemplate`<div class="card"> <p class="muted">AIチャットが複雑な依頼を<strong>役割ごとの子エージェントに委譲（順次/並列）</strong>し、重い処理は<strong>バックグラウンド実行</strong>できます。実行規模は Cloudflare の枠に依存します。</p> <div class="field"><label><input type="checkbox" id="wpaid"${addAttribute(workersPaid, "checked")}> <strong>Workers Paid を有効化済み</strong>（CFをPaidにしたらONにすると上限を引き上げます）</label></div> <button class="btn btn-primary" id="saveWpaid">保存</button> <div class="table-wrap" style="margin-top:.8rem"><table> <thead><tr><th>項目</th><th>無料枠</th><th>Workers Paid</th></tr></thead> <tbody> <tr><td>並列エージェント上限</td><td>2</td><td>5</td></tr> <tr><td>委譲ホップ上限</td><td>4</td><td>6</td></tr> <tr><td>バックグラウンド・ジョブ</td><td>小規模（順次・少数）</td><td>大きめ・安定</td></tr> <tr><td>A2A（他団体連携）</td><td colspan="2" class="ctr">Pro 以上（別途 連携設定）</td></tr> <tr><td>目安サブリクエスト/リクエスト</td><td>〜50</td><td>〜1000</td></tr> </tbody> </table></div> <p class="muted" style="font-size:.8rem">現在：<strong>${workersPaid ? "Workers Paid \u6709\u52B9\uFF08\u4E0A\u9650\u62E1\u5F35\uFF09" : "\u7121\u6599\u67A0\uFF08\u4E0A\u9650\u63A7\u3048\u3081\uFF09"}</strong>。CF の Paid 化自体はダッシュボードで行います（下記）。重い処理が枠に当たる場合は AIチャットの「バックグラウンドで実行」をご利用ください。</p> </div>`} <h2>オートパイロット（AIに運用代行を任せる・Pro 以上）</h2> ${!hasPro && renderTemplate`<div class="card"><p class="muted">AIに自団体のCloudflare/GitHub運用（破壊的操作を除く）を任せる<strong>オートパイロット</strong>は <strong>Pro 以上</strong>で開放されます。<a href="/billing">プラン・課金へ</a></p></div>`} ${hasPro && renderTemplate`<div class="card"> <div class="banner banner-warn">⚠️ AIに<strong>自団体のサーバー操作</strong>を任せます。許可＝CFのKV/D1作成・一覧・デプロイ、GitHubの読取・ブランチ/PR・非コアコミット。<strong>禁止（実行不可）</strong>＝削除・force-push・main直push・課金/権限変更・他団体操作。トークンは暗号化保存（既定OFF・管理者のみ・最小スコープ推奨）。</div> <div class="field"><label><input type="checkbox" id="autoOn"${addAttribute(auto.on, "checked")}> <strong>オートパイロットを有効にする</strong></label></div> <h3 style="margin:.6rem 0 .2rem">① Cloudflare 接続</h3> <p class="muted" style="font-size:.85rem">下のボタンで作成ページを開き、テンプレ「<strong>Edit Cloudflare Workers</strong>」（または KV/D1/Workers 編集権限）でトークンを作成→貼り付け。<strong>アカウントIDは自動検出</strong>します。</p> <div class="row" style="margin-bottom:4px"><a class="btn btn-ghost" href="https://dash.cloudflare.com/profile/api-tokens" target="_blank" rel="noopener" style="flex:0 0 auto">CFトークン作成ページを開く</a>${auto.cfToken && renderTemplate`<span class="muted" style="align-self:center">接続済み${auto.cfAccount ? `\uFF08acct: ${auto.cfAccount.slice(0, 8)}\u2026\uFF09` : ""}</span>`}</div> <div class="row"><input id="cfTok" type="password"${addAttribute(auto.cfToken ? "CF API\u30C8\u30FC\u30AF\u30F3\uFF08\u8A2D\u5B9A\u6E08\u307F\u30FB\u5909\u66F4\u6642\u306E\u307F\uFF09" : "CF API\u30C8\u30FC\u30AF\u30F3\u3092\u8CBC\u308A\u4ED8\u3051", "placeholder")} style="flex:1"><button class="btn btn-primary" id="saveCf" style="flex:0 0 auto">接続</button></div> <h3 style="margin:.8rem 0 .2rem">② GitHub 接続</h3> ${ghAuto ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <p class="muted" style="font-size:.85rem">ボタンを押すと<strong>コードが表示</strong>されます。GitHub の認証ページでそのコードを入力して許可するだけで接続できます（トークン作成は不要）。</p> <div class="row"><button class="btn btn-primary" id="ghConnect" style="flex:0 0 auto">${auto.ghToken ? "GitHub\u3092\u518D\u63A5\u7D9A" : "GitHub\u3068\u63A5\u7D9A"}</button><span id="ghStat" class="muted" style="align-self:center">${auto.ghToken ? `\u63A5\u7D9A\u6E08\u307F${auto.ghRepo ? `\uFF08${auto.ghRepo}\uFF09` : ""}` : ""}</span></div> <div id="ghCode" class="card" hidden style="margin-top:.4rem;background:#f4f6f9"></div> <div id="ghRepoBox" hidden style="margin-top:.4rem"><label class="muted" style="font-size:.85rem">接続するリポジトリ</label><div class="row"><select id="ghRepoSel" style="flex:1"></select><button class="btn btn-primary" id="ghRepoSave" style="flex:0 0 auto">保存</button></div></div> ` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <p class="muted" style="font-size:.85rem">GitHub トークン（contents / pull_requests 権限）と接続先リポを入力してください。</p> <div class="field"><input id="ghTok" type="password"${addAttribute(auto.ghToken ? "GitHub \u30C8\u30FC\u30AF\u30F3\uFF08\u8A2D\u5B9A\u6E08\u307F\u30FB\u5909\u66F4\u6642\u306E\u307F\uFF09" : "GitHub \u30C8\u30FC\u30AF\u30F3\u3092\u8CBC\u308A\u4ED8\u3051", "placeholder")}></div> <div class="row"><input id="ghRepo"${addAttribute(auto.ghRepo, "value")} placeholder="owner/repo（例 your-org/baku-office-app）" style="flex:1"><button class="btn btn-primary" id="saveGh" style="flex:0 0 auto">接続</button></div> ` })}`} <p class="muted" style="font-size:.8rem;margin-top:.6rem">接続後、AIチャット（管理者）から「KVを作って」「○○を直すPRを出して」等を依頼できます。重要操作は実行前にAIが確認します。</p> </div>`} <h2>Workers Paid（CF有料プラン）への切替案内</h2> <div class="banner banner-info">無料枠では CPU時間・実行時間(waitUntil)・サブリクエスト数 等に上限があり、大きなファイル処理や生成でエラーになることがあります（<a href="/diagnostics">診断</a>）。安定運用には Cloudflareダッシュボードで <strong>Workers &amp; Pages → Plans → Workers Paid（月$5〜）</strong> に切り替えてください。データ・デプロイはそのまま、上限が大幅緩和されます。</div> </div>`}`, "scripts": async ($$result2) => renderTemplate`${hasPlus && renderTemplate(_a || (_a = __template([`<script>
    (function () {
      document.getElementById("saveEngine")?.addEventListener("click", async (e) => {
        const engine = document.querySelector('input[name="engine"]:checked').value;
        const ck = document.getElementById("claudeKey").value.trim();
        if (ck) { const kr = await window.bo.api("/api/keys", { claude: ck }, { btn: e.currentTarget, successMsg: null }); if (!kr.ok) return; if (kr.data.result && kr.data.result.claude && !kr.data.result.claude.ok) { window.bo.toast("Claude\u30AD\u30FC\u691C\u8A3C\u5931\u6557\uFF1A" + (kr.data.result.claude.detail || ""), "err"); return; } }
        const r = await window.bo.api("/api/settings", { _action: "ai_engine", engine }, { btn: e.currentTarget, successMsg: "\u30A8\u30F3\u30B8\u30F3\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
        if (r.ok) setTimeout(() => location.reload(), 600);
      });
      document.getElementById("savePrompt")?.addEventListener("click", async (e) => {
        const prompt = document.getElementById("customPrompt").value;
        await window.bo.api("/api/settings", { _action: "custom_prompt", prompt }, { btn: e.currentTarget, successMsg: "\u30AB\u30B9\u30BF\u30E0\u6307\u793A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
      });
      document.getElementById("saveWebhook")?.addEventListener("click", async (e) => {
        const webhook = document.getElementById("notifyWebhook").value.trim();
        await window.bo.api("/api/settings", { _action: "notify_webhook", webhook }, { btn: e.currentTarget, successMsg: "\u901A\u77E5 Webhook \u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
      });
      document.getElementById("saveMax")?.addEventListener("click", async (e) => { const v = document.getElementById("maxmb").value; const r = await window.bo.api("/api/settings", { _action: "max_upload", mb: Number(v) }, { btn: e.currentTarget, successMsg: "\u4E0A\u9650\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" }); if (r.ok) setTimeout(() => location.reload(), 600); });
      document.getElementById("saveWpaid")?.addEventListener("click", async (e) => { const workersPaid = document.getElementById("wpaid").checked; const r = await window.bo.api("/api/settings", { _action: "workers_paid", workersPaid }, { btn: e.currentTarget, successMsg: "\u4FDD\u5B58\u3057\u307E\u3057\u305F" }); if (r.ok) setTimeout(() => location.reload(), 600); });
      // \u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\uFF1A\u6709\u52B9\u30C8\u30B0\u30EB
      document.getElementById("autoOn")?.addEventListener("change", async (e) => {
        const box = e.currentTarget; // await \u3092\u631F\u3080\u3068 change \u306E currentTarget \u306F null \u306B\u306A\u308B\u305F\u3081\u9000\u907F\u3002
        const on = box.checked;
        // \u6709\u52B9\u5316\u306FAI\u3078\u306E\u904B\u7528\u4EE3\u884C\u59D4\u4EFB\uFF1D\u5F71\u97FF\u304C\u5927\u304D\u3044\u305F\u3081\u78BA\u8A8D\u3092\u631F\u3080\uFF08\u7121\u52B9\u5316\u306F\u5373\u6642\uFF09\u3002
        if (on && !(await window.bo.confirm("\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001AI\u304C\u81EA\u56E3\u4F53\u306ECloudflare/GitHub\u904B\u7528\uFF08\u7834\u58CA\u7684\u64CD\u4F5C\u3092\u9664\u304F\uFF09\u3092\u81EA\u52D5\u5B9F\u884C\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F", { confirmLabel: "\u6709\u52B9\u306B\u3059\u308B", danger: true, auditHref: "/diagnostics" }))) { box.checked = false; return; }
        await window.bo.api("/api/settings", { _action: "autonomy_toggle", on }, { btn: box, successMsg: on ? "\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u3092\u6709\u52B9\u5316" : "\u7121\u52B9\u5316\u3057\u307E\u3057\u305F" });
      });
      // CF\uFF1A\u30C8\u30FC\u30AF\u30F3\u8CBC\u4ED8\u2192\u30A2\u30AB\u30A6\u30F3\u30C8\u81EA\u52D5\u691C\u51FA
      document.getElementById("saveCf")?.addEventListener("click", async (e) => {
        const cfToken = document.getElementById("cfTok").value.trim();
        if (!cfToken) { window.bo.toast("CF\u30C8\u30FC\u30AF\u30F3\u3092\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044", "err"); return; }
        const r = await window.bo.api("/api/settings", { _action: "autonomy_config", cfToken }, { btn: e.currentTarget, successMsg: "Cloudflare\u306B\u63A5\u7D9A\u3057\u307E\u3057\u305F\uFF08\u30A2\u30AB\u30A6\u30F3\u30C8\u81EA\u52D5\u691C\u51FA\uFF09" });
        if (r.ok) setTimeout(() => location.reload(), 700);
      });
      // GitHub \u624B\u52D5\u63A5\u7D9A\uFF08device flow\u672A\u8A2D\u5B9A\u6642\uFF09
      document.getElementById("saveGh")?.addEventListener("click", async (e) => {
        const ghToken = document.getElementById("ghTok").value.trim();
        const ghRepo = document.getElementById("ghRepo").value.trim();
        const cfg = { _action: "autonomy_config", ghRepo };
        if (ghToken) cfg.ghToken = ghToken;
        const r = await window.bo.api("/api/settings", cfg, { btn: e.currentTarget, successMsg: "GitHub\u306B\u63A5\u7D9A\u3057\u307E\u3057\u305F" });
        if (r.ok) setTimeout(() => location.reload(), 700);
      });
      // GitHub \u30C7\u30D0\u30A4\u30B9\u30D5\u30ED\u30FC\u63A5\u7D9A
      const ghBtn = document.getElementById("ghConnect");
      if (ghBtn) ghBtn.addEventListener("click", async (e) => {
        const s = await window.bo.api("/api/autopilot", { _action: "gh_start" }, { btn: e.currentTarget, successMsg: null });
        if (!s.ok || !s.data.ok) { window.bo.toast(s.data?.error || "\u958B\u59CB\u306B\u5931\u6557", "err"); return; }
        const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
        const box = document.getElementById("ghCode");
        box.hidden = false;
        const vuri = /^https:\\/\\//.test(s.data.verification_uri || "") ? s.data.verification_uri : "#";
        box.innerHTML = 'GitHub\u3067 <a href="' + esc(vuri) + '" target="_blank" rel="noopener"><strong>\u8A8D\u8A3C\u30DA\u30FC\u30B8</strong></a> \u3092\u958B\u304D\u3001\u30B3\u30FC\u30C9 <strong style="font-size:1.1rem">' + esc(s.data.user_code) + '</strong> \u3092\u5165\u529B\u3057\u3066\u8A31\u53EF\u3057\u3066\u304F\u3060\u3055\u3044\u3002<div class="muted" style="margin-top:4px">\u627F\u8A8D\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u2026</div>';
        const interval = (s.data.interval || 5) * 1000;
        const deviceCode = s.data.device_code;
        const poll = async () => {
          const p = await window.bo.api("/api/autopilot", { _action: "gh_poll", deviceCode }, { successMsg: null });
          if (p.ok && p.data.ok) {
            box.innerHTML = '<span class="ok" style="color:#1f7a4d">\u2705 GitHub\u306B\u63A5\u7D9A\u3057\u307E\u3057\u305F\u3002</span>';
            // \u30EA\u30DD\u81EA\u52D5\u53D6\u5F97\u2192\u9078\u629E
            const rr = await window.bo.api("/api/autopilot", { _action: "gh_repos" }, { successMsg: null });
            const repos = (rr.ok && rr.data.repos) || [];
            const rb = document.getElementById("ghRepoBox"); const sel = document.getElementById("ghRepoSel");
            sel.innerHTML = repos.map((x) => '<option value="' + esc(x) + '">' + esc(x) + "</option>").join("") || '<option value="">\uFF08\u30EA\u30DD\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\uFF09</option>';
            rb.hidden = false;
            return;
          }
          if (p.ok && p.data.pending) { setTimeout(poll, interval); return; }
          box.innerHTML = '<span style="color:#c0392b">\u63A5\u7D9A\u306B\u5931\u6557\uFF1A' + esc(p.data?.error) + "</span>";
        };
        setTimeout(poll, interval);
      });
      document.getElementById("ghRepoSave")?.addEventListener("click", async (e) => {
        const repo = document.getElementById("ghRepoSel").value;
        if (!repo) { window.bo.toast("\u30EA\u30DD\u30B8\u30C8\u30EA\u3092\u9078\u629E", "err"); return; }
        const r = await window.bo.api("/api/autopilot", { _action: "set_repo", repo }, { btn: e.currentTarget, successMsg: "\u63A5\u7D9A\u5148\u30EA\u30DD\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
        if (r.ok) setTimeout(() => location.reload(), 600);
      });
    })();
  <\/script>`], [`<script>
    (function () {
      document.getElementById("saveEngine")?.addEventListener("click", async (e) => {
        const engine = document.querySelector('input[name="engine"]:checked').value;
        const ck = document.getElementById("claudeKey").value.trim();
        if (ck) { const kr = await window.bo.api("/api/keys", { claude: ck }, { btn: e.currentTarget, successMsg: null }); if (!kr.ok) return; if (kr.data.result && kr.data.result.claude && !kr.data.result.claude.ok) { window.bo.toast("Claude\u30AD\u30FC\u691C\u8A3C\u5931\u6557\uFF1A" + (kr.data.result.claude.detail || ""), "err"); return; } }
        const r = await window.bo.api("/api/settings", { _action: "ai_engine", engine }, { btn: e.currentTarget, successMsg: "\u30A8\u30F3\u30B8\u30F3\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
        if (r.ok) setTimeout(() => location.reload(), 600);
      });
      document.getElementById("savePrompt")?.addEventListener("click", async (e) => {
        const prompt = document.getElementById("customPrompt").value;
        await window.bo.api("/api/settings", { _action: "custom_prompt", prompt }, { btn: e.currentTarget, successMsg: "\u30AB\u30B9\u30BF\u30E0\u6307\u793A\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
      });
      document.getElementById("saveWebhook")?.addEventListener("click", async (e) => {
        const webhook = document.getElementById("notifyWebhook").value.trim();
        await window.bo.api("/api/settings", { _action: "notify_webhook", webhook }, { btn: e.currentTarget, successMsg: "\u901A\u77E5 Webhook \u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
      });
      document.getElementById("saveMax")?.addEventListener("click", async (e) => { const v = document.getElementById("maxmb").value; const r = await window.bo.api("/api/settings", { _action: "max_upload", mb: Number(v) }, { btn: e.currentTarget, successMsg: "\u4E0A\u9650\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" }); if (r.ok) setTimeout(() => location.reload(), 600); });
      document.getElementById("saveWpaid")?.addEventListener("click", async (e) => { const workersPaid = document.getElementById("wpaid").checked; const r = await window.bo.api("/api/settings", { _action: "workers_paid", workersPaid }, { btn: e.currentTarget, successMsg: "\u4FDD\u5B58\u3057\u307E\u3057\u305F" }); if (r.ok) setTimeout(() => location.reload(), 600); });
      // \u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\uFF1A\u6709\u52B9\u30C8\u30B0\u30EB
      document.getElementById("autoOn")?.addEventListener("change", async (e) => {
        const box = e.currentTarget; // await \u3092\u631F\u3080\u3068 change \u306E currentTarget \u306F null \u306B\u306A\u308B\u305F\u3081\u9000\u907F\u3002
        const on = box.checked;
        // \u6709\u52B9\u5316\u306FAI\u3078\u306E\u904B\u7528\u4EE3\u884C\u59D4\u4EFB\uFF1D\u5F71\u97FF\u304C\u5927\u304D\u3044\u305F\u3081\u78BA\u8A8D\u3092\u631F\u3080\uFF08\u7121\u52B9\u5316\u306F\u5373\u6642\uFF09\u3002
        if (on && !(await window.bo.confirm("\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001AI\u304C\u81EA\u56E3\u4F53\u306ECloudflare/GitHub\u904B\u7528\uFF08\u7834\u58CA\u7684\u64CD\u4F5C\u3092\u9664\u304F\uFF09\u3092\u81EA\u52D5\u5B9F\u884C\u3057\u307E\u3059\u3002\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F", { confirmLabel: "\u6709\u52B9\u306B\u3059\u308B", danger: true, auditHref: "/diagnostics" }))) { box.checked = false; return; }
        await window.bo.api("/api/settings", { _action: "autonomy_toggle", on }, { btn: box, successMsg: on ? "\u30AA\u30FC\u30C8\u30D1\u30A4\u30ED\u30C3\u30C8\u3092\u6709\u52B9\u5316" : "\u7121\u52B9\u5316\u3057\u307E\u3057\u305F" });
      });
      // CF\uFF1A\u30C8\u30FC\u30AF\u30F3\u8CBC\u4ED8\u2192\u30A2\u30AB\u30A6\u30F3\u30C8\u81EA\u52D5\u691C\u51FA
      document.getElementById("saveCf")?.addEventListener("click", async (e) => {
        const cfToken = document.getElementById("cfTok").value.trim();
        if (!cfToken) { window.bo.toast("CF\u30C8\u30FC\u30AF\u30F3\u3092\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044", "err"); return; }
        const r = await window.bo.api("/api/settings", { _action: "autonomy_config", cfToken }, { btn: e.currentTarget, successMsg: "Cloudflare\u306B\u63A5\u7D9A\u3057\u307E\u3057\u305F\uFF08\u30A2\u30AB\u30A6\u30F3\u30C8\u81EA\u52D5\u691C\u51FA\uFF09" });
        if (r.ok) setTimeout(() => location.reload(), 700);
      });
      // GitHub \u624B\u52D5\u63A5\u7D9A\uFF08device flow\u672A\u8A2D\u5B9A\u6642\uFF09
      document.getElementById("saveGh")?.addEventListener("click", async (e) => {
        const ghToken = document.getElementById("ghTok").value.trim();
        const ghRepo = document.getElementById("ghRepo").value.trim();
        const cfg = { _action: "autonomy_config", ghRepo };
        if (ghToken) cfg.ghToken = ghToken;
        const r = await window.bo.api("/api/settings", cfg, { btn: e.currentTarget, successMsg: "GitHub\u306B\u63A5\u7D9A\u3057\u307E\u3057\u305F" });
        if (r.ok) setTimeout(() => location.reload(), 700);
      });
      // GitHub \u30C7\u30D0\u30A4\u30B9\u30D5\u30ED\u30FC\u63A5\u7D9A
      const ghBtn = document.getElementById("ghConnect");
      if (ghBtn) ghBtn.addEventListener("click", async (e) => {
        const s = await window.bo.api("/api/autopilot", { _action: "gh_start" }, { btn: e.currentTarget, successMsg: null });
        if (!s.ok || !s.data.ok) { window.bo.toast(s.data?.error || "\u958B\u59CB\u306B\u5931\u6557", "err"); return; }
        const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
        const box = document.getElementById("ghCode");
        box.hidden = false;
        const vuri = /^https:\\\\/\\\\//.test(s.data.verification_uri || "") ? s.data.verification_uri : "#";
        box.innerHTML = 'GitHub\u3067 <a href="' + esc(vuri) + '" target="_blank" rel="noopener"><strong>\u8A8D\u8A3C\u30DA\u30FC\u30B8</strong></a> \u3092\u958B\u304D\u3001\u30B3\u30FC\u30C9 <strong style="font-size:1.1rem">' + esc(s.data.user_code) + '</strong> \u3092\u5165\u529B\u3057\u3066\u8A31\u53EF\u3057\u3066\u304F\u3060\u3055\u3044\u3002<div class="muted" style="margin-top:4px">\u627F\u8A8D\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u2026</div>';
        const interval = (s.data.interval || 5) * 1000;
        const deviceCode = s.data.device_code;
        const poll = async () => {
          const p = await window.bo.api("/api/autopilot", { _action: "gh_poll", deviceCode }, { successMsg: null });
          if (p.ok && p.data.ok) {
            box.innerHTML = '<span class="ok" style="color:#1f7a4d">\u2705 GitHub\u306B\u63A5\u7D9A\u3057\u307E\u3057\u305F\u3002</span>';
            // \u30EA\u30DD\u81EA\u52D5\u53D6\u5F97\u2192\u9078\u629E
            const rr = await window.bo.api("/api/autopilot", { _action: "gh_repos" }, { successMsg: null });
            const repos = (rr.ok && rr.data.repos) || [];
            const rb = document.getElementById("ghRepoBox"); const sel = document.getElementById("ghRepoSel");
            sel.innerHTML = repos.map((x) => '<option value="' + esc(x) + '">' + esc(x) + "</option>").join("") || '<option value="">\uFF08\u30EA\u30DD\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\uFF09</option>';
            rb.hidden = false;
            return;
          }
          if (p.ok && p.data.pending) { setTimeout(poll, interval); return; }
          box.innerHTML = '<span style="color:#c0392b">\u63A5\u7D9A\u306B\u5931\u6557\uFF1A' + esc(p.data?.error) + "</span>";
        };
        setTimeout(poll, interval);
      });
      document.getElementById("ghRepoSave")?.addEventListener("click", async (e) => {
        const repo = document.getElementById("ghRepoSel").value;
        if (!repo) { window.bo.toast("\u30EA\u30DD\u30B8\u30C8\u30EA\u3092\u9078\u629E", "err"); return; }
        const r = await window.bo.api("/api/autopilot", { _action: "set_repo", repo }, { btn: e.currentTarget, successMsg: "\u63A5\u7D9A\u5148\u30EA\u30DD\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
        if (r.ok) setTimeout(() => location.reload(), 600);
      });
    })();
  <\/script>`])))}` })}`;
}, "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/advanced.astro", void 0);

const $$file = "/home/runner/work/baku-office/baku-office/apps/client/src/pages/settings/advanced.astro";
const $$url = "/settings/advanced";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Advanced,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
