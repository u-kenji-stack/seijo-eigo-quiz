// Web Speech API を使った読み上げヘルパー。
// ブラウザが対応していない場合は何もしない(エラーにしない)。

export function speak(text: string, lang: string = "en-US", rate: number = 0.9) {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  // 前の読み上げが残っていたら止めてから話す
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1;
  synth.speak(utterance);
}

// 複数のテキストを順番に読み上げる(選択肢を1つずつ聞かせるときなどに使用)。
export function speakList(texts: string[], lang: string = "en-US", rate: number = 0.9) {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  synth.cancel();
  texts.forEach((text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    synth.speak(utterance);
  });
}

export function isSpeechSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window;
}
