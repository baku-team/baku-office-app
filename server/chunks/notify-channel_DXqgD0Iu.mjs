globalThis.process ??= {};
globalThis.process.env ??= {};
import { r as resolveChannel } from "./connectors-store_D5NBpZkP.mjs";
const CH_APP_BUILT = "build-done";
const NOTIFY_PURPOSES = [
  { id: CH_APP_BUILT, label: "アプリ作成完了" }
];
async function sendToChannel(ctx, logicalId, msg) {
  const ref = await resolveChannel(ctx.db, logicalId);
  if (!ref) return { ok: false, error: `コネクタ「${logicalId}」が未設定または無効です。` };
  return ctx.messaging.send(ref, msg);
}
export {
  CH_APP_BUILT,
  NOTIFY_PURPOSES,
  sendToChannel
};
