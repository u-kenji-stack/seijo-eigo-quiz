"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { vocabList, grammarList, VocabWord, GrammarQuestion } from "@/lib/data";
import { speak, speakList, isSpeechSupported } from "@/lib/speech";

type Mode = "vocab" | "grammar";

type Question = {
  id: string;
  promptJa: string; // 日本語の問題文/意味
  displayEnglish: string; // 表示する英文(空欄あり、または例文)
  speakEnglish: string; // 読み上げる正解の英文
  answer: string;
  hint: string;
  choices: string[]; // 4つの候補(正解1つ+まちがい3つ、シャッフル済み)
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

// 正解1つに対して、同じ候補プールからまちがいを3つ選び、正解と合わせてシャッフルする
function buildChoices(answer: string, pool: string[], count = 3): string[] {
  const seen = new Set([normalize(answer)]);
  const distractors: string[] = [];
  for (const candidate of shuffle(pool)) {
    const key = normalize(candidate);
    if (seen.has(key)) continue;
    seen.add(key);
    distractors.push(candidate);
    if (distractors.length >= count) break;
  }
  return shuffle([answer, ...distractors]);
}

function buildVocabQuestions(words: VocabWord[], pool: VocabWord[]): Question[] {
  const wordPool = pool.map((w) => w.word);
  return words.map((w) => ({
    id: w.id,
    promptJa: `つぎの意味の英単語を入力しよう：「${w.meaning}」`,
    displayEnglish: w.example.replace(new RegExp(w.word, "i"), "＿＿＿＿"),
    speakEnglish: w.word,
    answer: w.word,
    hint: `読み方のヒント：${w.reading}`,
    choices: buildChoices(w.word, wordPool),
  }));
}

function buildGrammarQuestions(items: GrammarQuestion[], pool: GrammarQuestion[]): Question[] {
  const answerPool = pool.map((g) => g.answer);
  return items.map((g) => {
    // 「(play)」のようなヒント表記を取り除いてから空らんに正解を入れる
    const withoutHint = g.sentence.replace(/\s*\([^)]*\)/g, "");
    const filled = withoutHint.replace("___", g.answer).replace(/\s+/g, " ").trim();
    return {
      id: g.id,
      promptJa: g.prompt,
      displayEnglish: g.sentence,
      speakEnglish: filled,
      answer: g.answer,
      hint: g.hint,
      choices: buildChoices(g.answer, answerPool),
    };
  });
}

const QUIZ_LENGTH = 10;

export default function QuizApp() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const [speechOk, setSpeechOk] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSpeechOk(isSpeechSupported());
  }, []);

  const current = questions[index];
  const total = questions.length;

  function startMode(m: Mode) {
    const source =
      m === "vocab"
        ? buildVocabQuestions(shuffle(vocabList), vocabList)
        : buildGrammarQuestions(shuffle(grammarList), grammarList);
    const picked = source.slice(0, Math.min(QUIZ_LENGTH, source.length));
    setMode(m);
    setQuestions(picked);
    setIndex(0);
    setInput("");
    setStatus("idle");
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFinished(false);
    setTimeout(() => {
      inputRef.current?.focus();
      if (picked[0]) speak(picked[0].speakEnglish.replace(/＿＿＿＿|___/g, ""));
    }, 100);
  }

  function backToMenu() {
    setMode(null);
    setQuestions([]);
    setFinished(false);
  }

  function speakQuestion() {
    if (!current) return;
    const textToSpeak =
      mode === "vocab" ? current.promptJa.match(/「(.+)」/)?.[0] ?? "" : current.displayEnglish;
    // 単語モードは日本語なので、英文モードのときだけ英語で読む。単語モードは単語音声ボタン別途。
    if (mode === "grammar") {
      speak(current.displayEnglish.replace("___", "blank"), "en-US");
    }
  }

  function speakTargetWord() {
    if (!current) return;
    speak(current.speakEnglish.replace(/＿＿＿＿/g, ""), "en-US");
  }

  function speakChoices() {
    if (!current) return;
    speakList(current.choices, "en-US");
  }

  function submitAnswer() {
    if (!current || status !== "idle") return;
    const isCorrect = normalize(input) === normalize(current.answer);
    setStatus(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
      speak("Correct! " + current.speakEnglish.replace(/＿＿＿＿/g, ""), "en-US");
    } else {
      setStreak(0);
      speak("Let's try again. The answer is " + current.speakEnglish.replace(/＿＿＿＿/g, ""), "en-US");
    }
  }

  function nextQuestion() {
    const nextIndex = index + 1;
    if (nextIndex >= total) {
      setFinished(true);
      return;
    }
    setIndex(nextIndex);
    setInput("");
    setStatus("idle");
    setTimeout(() => {
      inputRef.current?.focus();
      const q = questions[nextIndex];
      if (q && mode === "vocab") {
        // 単語モードは自動で発音しない(まずヒントとして聞くのは任意)
      }
    }, 100);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (status === "idle") {
        submitAnswer();
      } else {
        nextQuestion();
      }
    }
  }

  const progressPercent = useMemo(() => {
    if (total === 0) return 0;
    return Math.round(((finished ? total : index) / total) * 100);
  }, [index, total, finished]);

  if (!mode) {
    return (
      <div>
        <header style={{ textAlign: "center", marginBottom: 8 }}>
          <div className="pill">成城学園 中2 英語</div>
          <h1 style={{ fontSize: 30, margin: "12px 0 4px" }}>2学期 中間テスト クイズ 🎧✏️</h1>
          <p style={{ color: "var(--text-soft)", fontSize: 18 }}>
            4つの候補から答えをえらんで、その言葉をタイプしよう。答えは声でも読み上げるよ！
          </p>
        </header>

        {!speechOk && (
          <div className="feedback-box wrong" style={{ marginBottom: 16 }}>
            このブラウザは読み上げ機能に対応していないかもしれません。Chromeなどで試してみてください。
          </div>
        )}

        <div className="mode-grid">
          <button className="mode-card" onClick={() => startMode("vocab")}>
            <div style={{ fontSize: 40 }}>📖</div>
            <h2 style={{ fontSize: 24, margin: "8px 0" }}>たんごモード</h2>
            <p style={{ color: "var(--text-soft)", fontSize: 17 }}>
              日本語の意味を見て、英単語をタイプしよう。発音も聞けるよ。
            </p>
          </button>
          <button className="mode-card" onClick={() => startMode("grammar")}>
            <div style={{ fontSize: 40 }}>📝</div>
            <h2 style={{ fontSize: 24, margin: "8px 0" }}>ぶんぽうモード</h2>
            <p style={{ color: "var(--text-soft)", fontSize: 17 }}>
              空らんに入る正しい形をタイプしよう。過去形・比較級・不定詞など。
            </p>
          </button>
        </div>

        <p style={{ marginTop: 24, fontSize: 15, color: "var(--text-soft)", textAlign: "center" }}>
          ※ 出題内容は中間試験範囲の練習用サンプルです。実際の試験範囲に合わせて先生や保護者の方が内容を編集できます。
        </p>
      </div>
    );
  }

  if (finished) {
    const percent = Math.round((score / total) * 100);
    const emoji = percent >= 80 ? "🏆" : percent >= 50 ? "🎉" : "💪";
    const message =
      percent >= 80
        ? "すごい！よくできました！"
        : percent >= 50
        ? "よくがんばったね！もう一度やってみよう。"
        : "だいじょうぶ、練習すればできるようになるよ！";

    return (
      <div className="card">
        <div className="result-emoji">{emoji}</div>
        <h2 style={{ textAlign: "center", fontSize: 26 }}>けっか発表</h2>
        <p style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "var(--accent-dark)" }}>
          {score} / {total} もん 正解！
        </p>
        <p style={{ textAlign: "center", fontSize: 18 }}>さいこう連続正解：{bestStreak} もん</p>
        <p style={{ textAlign: "center", fontSize: 18, marginTop: 8 }}>{message}</p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
          <button className="big-btn" onClick={() => startMode(mode)}>
            もう一度チャレンジ
          </button>
          <button className="big-btn secondary" onClick={backToMenu}>
            モードをえらびなおす
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button className="big-btn secondary" style={{ padding: "8px 16px", fontSize: 16 }} onClick={backToMenu}>
          ← もどる
        </button>
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 18, fontWeight: 700 }}>
          <span>⭐ {score}</span>
          <span>🔥 {streak}</span>
        </div>
      </div>

      <div className="progress-bar-track" style={{ marginBottom: 20 }}>
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="card">
        <p style={{ color: "var(--text-soft)", fontSize: 16, marginBottom: 4 }}>
          {index + 1} / {total} もんめ ・ {mode === "vocab" ? "たんごモード" : "ぶんぽうモード"}
        </p>
        <h2 style={{ fontSize: 22, marginTop: 0 }}>{current.promptJa}</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "var(--accent-soft)",
            borderRadius: 14,
            padding: "16px 18px",
            margin: "16px 0",
          }}
        >
          <button
            className="speaker-btn"
            onClick={mode === "vocab" ? speakTargetWord : speakQuestion}
            aria-label="英語を聞く"
            title="英語を聞く"
          >
            🔊
          </button>
          <p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{current.displayEnglish}</p>
        </div>

        <p style={{ fontSize: 16, color: "var(--text-soft)" }}>💡 {current.hint}</p>

        <div style={{ margin: "16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-soft)", margin: 0 }}>
              この4つの中から選んでタイプしよう
            </p>
            <button
              className="speaker-btn"
              style={{ width: 40, height: 40, fontSize: 18 }}
              onClick={speakChoices}
              aria-label="候補を聞く"
              title="候補を聞く"
            >
              🔊
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 10,
            }}
          >
            {current.choices.map((choice, i) => (
              <div
                key={choice + i}
                style={{
                  border: "3px solid #c9c2ad",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: 20,
                  fontWeight: 700,
                  textAlign: "center",
                  background: "#fffdf7",
                }}
              >
                {choice}
              </div>
            ))}
          </div>
        </div>

        <input
          ref={inputRef}
          className={
            "answer-input " + (status === "correct" ? "correct" : status === "wrong" ? "wrong" : "")
          }
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="ここに英語を入力してね"
          value={input}
          disabled={status !== "idle"}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {status !== "idle" && (
          <div className={"feedback-box " + status} style={{ marginTop: 16 }}>
            {status === "correct" ? (
              <span>
                <span className="star-burst">🌟</span> せいかい！「{current.speakEnglish.replace(/＿＿＿＿/g, "___")}」
              </span>
            ) : (
              <span>おしい！正解は「{current.speakEnglish.replace(/＿＿＿＿/g, "___")}」だよ</span>
            )}
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          {status === "idle" ? (
            <button className="big-btn" style={{ width: "100%" }} onClick={submitAnswer}>
              こたえる
            </button>
          ) : (
            <button className="big-btn" style={{ width: "100%" }} onClick={nextQuestion}>
              {index + 1 >= total ? "けっかを見る" : "つぎのもんだいへ"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
