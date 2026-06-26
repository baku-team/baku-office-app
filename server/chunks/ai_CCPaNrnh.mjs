globalThis.process ??= {};
globalThis.process.env ??= {};
async function runToolLoop(model, system, first, tools, exec, maxHops = 4, priorHistory = [], onUsage, abort, onEvent) {
  const history = [...priorHistory, { role: "user", text: first.text, image: first.image }];
  for (let h = 0; h < maxHops; h++) {
    const stop = abort?.();
    if (stop) return stop;
    onEvent?.({ type: "thinking" });
    const res = await model.turn(system, history, tools);
    if (res.usage && onUsage) onUsage(res.usage);
    if (!res.toolCalls?.length) {
      if (res.error && !res.text) return `⚠️ AI（応答・生成）側の問題で中断しました。
・なぜ：AIサービスへの通信または応答生成に失敗しました（${res.error.status ?? "通信エラー"}）。
・どうする：少し待って再送するか、別のAIモデル（設定→連携 /settings/messaging で Gemini / Claude / ChatGPT を切替）でお試しください。`;
      return (res.text ?? "").trim() || "（応答が空でした）";
    }
    for (const c of res.toolCalls) onEvent?.({ type: "tool", name: c.name });
    history.push({ role: "assistant", text: res.text, toolCalls: res.toolCalls });
    const calls = res.toolCalls;
    const results = calls.length > 1 ? await Promise.all(calls.map(async (c) => ({ id: c.id, name: c.name, content: await exec(c.name, c.args) }))) : [{ id: calls[0].id, name: calls[0].name, content: await exec(calls[0].name, calls[0].args) }];
    history.push({ role: "tool", results });
  }
  return HOPS_EXCEEDED;
}
const HOPS_EXCEEDED = "処理が長くなりました。もう一度お試しください。";
export {
  HOPS_EXCEEDED,
  runToolLoop
};
