globalThis.process ??= {};
globalThis.process.env ??= {};
const BRIDGE_SDK = `(function(){
  var seq = 0; var pending = {};
  window.addEventListener("message", function(e){
    if (e.source !== window.parent) return;
    var m = e.data;
    if (!m || m.__bo !== 1 || m.type !== "result") return;
    var cb = pending[m.reqId];
    if (!cb) return;
    delete pending[m.reqId];
    cb({ ok: !!m.ok, output: m.output, error: m.error, code: m.code });
  });
  function post(msg){ try { window.parent.postMessage(msg, "*"); } catch(_){} }
  // 実コンテンツ高は body から測る（base CSS で body/html の min-height を無効化済みなので
  // documentElement.scrollHeight のように iframe 高へクランプされず、縮小も正しく反映される）。
  function ch(){ var b=document.body; return b ? Math.max(b.scrollHeight, b.offsetHeight) : document.documentElement.scrollHeight; }
  var _rt=null;
  function resize(){ if(_rt) return; var raf=window.requestAnimationFrame||function(f){return setTimeout(f,16);}; _rt=raf(function(){ _rt=null; post({ __bo:1, type:"resize", height: ch() }); }); }
  window.bo = {
    // screens[] のデータ操作を呼ぶ。戻り値は { ok, output:{type,value}, error?, code? } の Promise。
    run: function(screenId, inputs){
      return new Promise(function(resolve){
        var reqId = ++seq; pending[reqId] = resolve;
        post({ __bo:1, type:"run", reqId: reqId, screenId: screenId || "", inputs: (inputs && typeof inputs === "object") ? inputs : {} });
      });
    },
    resize: resize,
    // ディープリンク：親URLのクエリ（?key=value）がオブジェクトで入る（srcdocの window.location は使えない）。
    params: (typeof window.__BO_PARAMS === "object" && window.__BO_PARAMS) ? window.__BO_PARAMS : {}
  };
  // 初回はレイアウト/フォント確定後に複数回測り直す（タブ非表示などの後続変化も拾う）。
  window.addEventListener("load", function(){ resize(); setTimeout(resize,120); setTimeout(resize,500); });
  if (window.ResizeObserver) { try { var ro=new ResizeObserver(resize); ro.observe(document.documentElement); if(document.body) ro.observe(document.body); } catch(_){} }
  if (window.MutationObserver) { try { new MutationObserver(resize).observe(document.documentElement, { subtree:true, childList:true, attributes:true, attributeFilter:["style","class","hidden"] }); } catch(_){} }
  post({ __bo:1, type:"ready" });
})();`;
const PUBLIC_BRIDGE_SDK = `(function(){
  function post(msg){ try { window.parent.postMessage(msg, "*"); } catch(_){} }
  function ch(){ var b=document.body; return b ? Math.max(b.scrollHeight, b.offsetHeight) : document.documentElement.scrollHeight; }
  var _rt=null;
  function resize(){ if(_rt) return; var raf=window.requestAnimationFrame||function(f){return setTimeout(f,16);}; _rt=raf(function(){ _rt=null; post({ __bo:1, type:"resize", height: ch() }); }); }
  function statusEl(){ var e=document.getElementById("bo-status"); if(!e){ e=document.createElement("div"); e.id="bo-status"; e.style.margin="12px 0"; e.style.fontWeight="600"; (document.body||document.documentElement).appendChild(e);} return e; }
  var busy=false;
  function setDisabled(d){ var b=document.querySelectorAll("button[type=submit],input[type=submit],.bo-btn"); for(var i=0;i<b.length;i++){ b[i].disabled=d; } }
  function gather(form){
    var values={}, files=[];
    var els=form.querySelectorAll("input[name],select[name],textarea[name]");
    for(var i=0;i<els.length;i++){ var el=els[i]; var n=el.name; if(!n) continue;
      if(el.type==="file"){ for(var j=0;j<el.files.length;j++){ files.push({ field:n, file: el.files[j] }); } }
      else if(el.type==="checkbox"){ values[n]= !!el.checked; }
      else if(el.type==="radio"){ if(el.checked) values[n]=el.value; }
      else { values[n]=el.value; }
    }
    return { values:values, files:files };
  }
  // bo.run（公開）：内部アプリと同じ呼び出し名だが、公開では「任意の画面実行」はさせず、必ずモデレーション付き
  // 送信（=フォーム送信と同じ安全経路）にマップする。匿名ユーザーがデータ読み取り・他画面実行をできないようにするため。
  var _runRes=null;
  function submit(values, files, viaRun){
    if(busy) return _runRes ? Promise.resolve({ ok:false, error:"送信中です" }) : undefined;
    busy=true; setDisabled(true);
    if(!viaRun){ var s=statusEl(); s.textContent="送信中…"; s.style.color="#6E7179"; }
    post({ __bo:1, type:"submit", values: values||{}, files: files||[] });
  }
  window.addEventListener("message", function(e){
    if(e.source!==window.parent) return; var m=e.data; if(!m||m.__bo!==1||m.type!=="submitResult") return;
    busy=false; setDisabled(false);
    // bo.run 経由なら Promise を解決して呼び出し元（カスタムUIのJS）に結果を返す。
    if(_runRes){ var r=_runRes; _runRes=null; r({ ok: !!m.ok, output: { type:"text", value: m.ok ? (m.message||"送信しました。ありがとうございました。") : "" }, error: m.ok ? undefined : (m.error||"送信に失敗しました。") }); resize(); return; }
    var s=statusEl();
    if(m.ok){ s.textContent=m.message||"送信しました。ありがとうございました。"; s.style.color="#946F2C"; var f=document.querySelector("form"); if(f) f.style.display="none"; }
    else { s.textContent=m.error||"送信に失敗しました。時間をおいて再度お試しください。"; s.style.color="#b00020"; }
    resize();
  });
  document.addEventListener("submit", function(ev){
    var f=ev.target; if(!f||f.tagName!=="FORM") return; ev.preventDefault();
    var g=gather(f); submit(g.values, g.files);
  }, true);
  window.bo = {
    submit: function(values, files){ submit(values, files); },
    // 公開ページの bo.run は「送信（モデレーション）」専用。screenId は無視し inputs を申込として送る＝
    // 内部アプリ向けに bo.run('save', inputs) で作られたカスタムUIも、公開ではそのまま安全に送信できる。
    run: function(screenId, inputs){ return new Promise(function(res){ _runRes=res; submit(inputs||{}, [], true); }); },
    resize: resize,
    params: (typeof window.__BO_PARAMS === "object" && window.__BO_PARAMS) ? window.__BO_PARAMS : {},
  };
  window.addEventListener("load", function(){ resize(); setTimeout(resize,120); setTimeout(resize,500); });
  if (window.ResizeObserver) { try { var ro=new ResizeObserver(resize); ro.observe(document.documentElement); if(document.body) ro.observe(document.body); } catch(_){} }
  if (window.MutationObserver) { try { new MutationObserver(resize).observe(document.documentElement, { subtree:true, childList:true, attributes:true, attributeFilter:["style","class","hidden"] }); } catch(_){} }
  post({ __bo:1, type:"ready" });
})();`;
const BAKU_APP_BASE_CSS = `
:root{--bo-bg:#F2F1F4;--bo-surface:#fff;--bo-ink:#1B1D22;--bo-muted:#6E7179;--bo-line:#E3E1E6;
--bo-navy:#1B1D22;--bo-gold:#C9A86A;--bo-gold-strong:#946F2C;--bo-gold-soft:#F4EDDD;--bo-r:12px;--bo-r-card:20px;}
*{box-sizing:border-box}
/* 自動高さ iframe では body/html を画面高に固定しない。生成HTMLの min-height:100vh は、親が iframe 高を
   そのまま 100vh にするフィードバックで「初回に高く測ると高いまま固定」する不具合の原因。無効化して
   コンテンツ実寸で測れるようにする（リロードでしか直らない過剰な余白の根治）。 */
html,body{margin:0;max-width:100%;overflow-x:hidden;min-height:0!important;height:auto!important}
/* スマホ対応の構造的担保（AIの指示有無に依存しない）：生成HTMLが固定px幅（width:600px 等）でも、要素を
   親幅で頭打ちにして横はみ出し/横スクロールを防ぐ。max-width はクラス指定（.bo-wrap 等）が優先されるため
   意図的な最大幅は維持される。inline の width 指定は width のままだが max-width:100% で実効幅が親に収まる。 */
body *{max-width:100%}
body{background:var(--bo-bg);color:var(--bo-ink);font-family:system-ui,-apple-system,"Hiragino Sans","Noto Sans JP",sans-serif;line-height:1.7;font-size:16px;padding:16px}
/* レスポンシブ強制（生成HTMLが固定幅でも崩さない）：画像は親幅に収め、長い表は横スクロール、
   長い文字列は折り返す。狭幅では余白を詰める。AI 出力に依存せず土台で構造的に担保する。 */
img,video,canvas{max-width:100%;height:auto}
table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:100%}
pre,code{white-space:pre-wrap;overflow-wrap:anywhere}
@media (max-width:480px){body{padding:12px;font-size:15px}.bo-card{padding:14px}.bo-wrap{max-width:100%}}
h1,h2,h3{color:var(--bo-ink);line-height:1.35;margin:0 0 .5em}
h1{font-size:1.5rem}h2{font-size:1.25rem}h3{font-size:1.08rem}
p{margin:0 0 .8em}
a{color:var(--bo-gold-strong);text-decoration:none;font-weight:600}
a:hover{text-decoration:underline}
small,.bo-muted{color:var(--bo-muted);font-size:.92em}
label,.bo-label{display:block;font-weight:600;color:var(--bo-ink);margin:0 0 6px;font-size:.95rem}
input,select,textarea,.bo-input{width:100%;font:inherit;color:var(--bo-ink);background:var(--bo-surface);border:1px solid var(--bo-line);border-radius:var(--bo-r);padding:11px 13px;outline:none}
input:focus,select:focus,textarea:focus,.bo-input:focus{border-color:var(--bo-gold);box-shadow:0 0 0 3px var(--bo-gold-soft)}
textarea{min-height:96px;resize:vertical}
.bo-field{margin:0 0 14px}
button,.bo-btn{appearance:none;border:0;cursor:pointer;font:inherit;font-weight:700;background:var(--bo-navy);color:#fff;border-radius:var(--bo-r);padding:12px 18px;transition:filter .15s,transform .05s}
button:hover,.bo-btn:hover{filter:brightness(1.12)}
button:active,.bo-btn:active{transform:translateY(1px)}
button:disabled,.bo-btn:disabled{opacity:.5;cursor:default}
.bo-btn-ghost{background:var(--bo-gold-soft);color:var(--bo-gold-strong);border:1px solid var(--bo-gold)}
.bo-card{background:var(--bo-surface);border:1px solid var(--bo-line);border-radius:var(--bo-r-card);padding:20px;margin:0 0 16px}
.bo-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
.bo-result{font-size:1.6rem;font-weight:800;color:var(--bo-ink)}
.bo-result .unit{color:var(--bo-gold-strong);font-size:1rem;font-weight:700;margin-left:4px}
table,.bo-table{width:100%;border-collapse:collapse;font-size:.95rem}
.bo-table th,.bo-table td,table th,table td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--bo-line)}
.bo-table th,table th{color:var(--bo-muted);font-weight:600;font-size:.85rem}
.bo-wrap{max-width:680px;margin:0 auto}`;
const FRAME_CSP = [
  "default-src 'none'",
  "img-src data: https: blob:",
  "media-src data: https: blob:",
  "style-src 'unsafe-inline'",
  "font-src data: https: blob:",
  "script-src 'unsafe-inline'",
  "object-src data: https: blob:",
  "frame-src data: https: blob:",
  "connect-src 'none'",
  "form-action 'none'",
  "base-uri 'none'"
].join("; ");
const FRAME_SANDBOX = "allow-scripts allow-forms allow-modals allow-downloads allow-top-navigation-to-custom-protocols";
const FRAME_ALLOW = "clipboard-write";
const STORAGE_SHIM = `(function(){
  function post(op,k,v){ try{ window.parent.postMessage({__bo:1,type:"storage",op:op,key:k,value:v},"*"); }catch(_){} }
  function mk(persist){
    var map = Object.create(null);
    var api = {
      getItem:function(k){ k=String(k); return (k in map)?map[k]:null; },
      setItem:function(k,v){ k=String(k); map[k]=String(v); if(persist) post("set",k,map[k]); },
      removeItem:function(k){ k=String(k); delete map[k]; if(persist) post("remove",k); },
      clear:function(){ for(var k in map) delete map[k]; if(persist) post("clear"); },
      key:function(i){ var ks=Object.keys(map); return (i>=0&&i<ks.length)?ks[i]:null; },
      __hydrate:function(d){ if(d&&typeof d==="object"){ for(var k in d){ if(Object.prototype.hasOwnProperty.call(d,k)) map[k]=String(d[k]); } } }
    };
    Object.defineProperty(api,"length",{get:function(){ return Object.keys(map).length; }});
    return api;
  }
  var ls=mk(true), ss=mk(false);
  try{ Object.defineProperty(window,"localStorage",{value:ls,configurable:true}); }catch(_){}
  try{ Object.defineProperty(window,"sessionStorage",{value:ss,configurable:true}); }catch(_){}
  window.addEventListener("message",function(e){
    if(e.source!==window.parent) return; var m=e.data;
    if(!m||m.__bo!==1||m.type!=="storageInit") return;
    ls.__hydrate(m.data);
    try{ window.dispatchEvent(new Event("bo:storageready")); }catch(_){}
  });
  try{ window.parent.postMessage({__bo:1,type:"storageReq"},"*"); }catch(_){}
})();`;
function buildFrameSrcdoc(html, sdk = BRIDGE_SDK, params = {}) {
  const paramsJson = JSON.stringify(params || {}).replace(/</g, "\\u003c");
  return [
    '<!doctype html><html lang="ja"><head>',
    '<meta charset="utf-8">',
    `<meta http-equiv="Content-Security-Policy" content="${FRAME_CSP}">`,
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    `<style>${BAKU_APP_BASE_CSS}</style>`,
    `<script>window.__BO_PARAMS=${paramsJson};${STORAGE_SHIM}<\/script>`,
    "</head><body>",
    html,
    `<script>${sdk}<\/script>`,
    "</body></html>"
  ].join("");
}
export {
  FRAME_SANDBOX as F,
  PUBLIC_BRIDGE_SDK as P,
  FRAME_ALLOW as a,
  buildFrameSrcdoc as b
};
