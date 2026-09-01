// 中学2年生・2学期 中間試験を想定した仮の出題データです。
// 実際の教科書・試験範囲に合わせて、このファイルの中身を書きかえてください。
// word: 英単語 / reading: カタカナ読み(耳で覚える用) / meaning: 日本語の意味 / example: 例文

export type VocabWord = {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  example: string;
};

export const vocabList: VocabWord[] = [
  { id: "v1", word: "yesterday", reading: "イェスタデイ", meaning: "きのう", example: "I watched TV yesterday." },
  { id: "v2", word: "tomorrow", reading: "トゥモロー", meaning: "あした", example: "See you tomorrow." },
  { id: "v3", word: "already", reading: "オールレディ", meaning: "すでに、もう", example: "I have already finished my homework." },
  { id: "v4", word: "famous", reading: "フェイマス", meaning: "有名な", example: "She is a famous singer." },
  { id: "v5", word: "difficult", reading: "ディフィカルト", meaning: "難しい", example: "This question is difficult." },
  { id: "v6", word: "important", reading: "インポータント", meaning: "大切な、重要な", example: "Water is important for life." },
  { id: "v7", word: "history", reading: "ヒストリー", meaning: "歴史", example: "I like Japanese history." },
  { id: "v8", word: "culture", reading: "カルチャー", meaning: "文化", example: "Kyoto has a long culture." },
  { id: "v9", word: "traditional", reading: "トラディショナル", meaning: "伝統的な", example: "This is a traditional festival." },
  { id: "v10", word: "abroad", reading: "アブロード", meaning: "海外へ、外国で", example: "I want to study abroad." },
  { id: "v11", word: "decide", reading: "ディサイド", meaning: "決める", example: "I decided to join the club." },
  { id: "v12", word: "become", reading: "ビカム", meaning: "〜になる", example: "I want to become a doctor." },
  { id: "v13", word: "each other", reading: "イーチアザー", meaning: "お互いに", example: "We helped each other." },
  { id: "v14", word: "several", reading: "セベラル", meaning: "いくつかの", example: "I have several pens." },
  { id: "v15", word: "probably", reading: "プロバブリー", meaning: "たぶん", example: "It will probably rain tomorrow." },
  { id: "v16", word: "improve", reading: "インプルーブ", meaning: "上達させる、改善する", example: "I want to improve my English." },
  { id: "v17", word: "environment", reading: "インバイロメント", meaning: "環境", example: "We must protect the environment." },
  { id: "v18", word: "planet", reading: "プラネット", meaning: "惑星", example: "The earth is a planet." },
  { id: "v19", word: "space", reading: "スペイス", meaning: "宇宙", example: "He wants to go to space." },
  { id: "v20", word: "scientist", reading: "サイエンティスト", meaning: "科学者", example: "She is a great scientist." },
  { id: "v21", word: "invention", reading: "インベンション", meaning: "発明", example: "The internet is a great invention." },
  { id: "v22", word: "borrow", reading: "バロー", meaning: "借りる", example: "Can I borrow your pen?" },
  { id: "v23", word: "lend", reading: "レンド", meaning: "貸す", example: "Can you lend me your book?" },
  { id: "v24", word: "arrive", reading: "アライブ", meaning: "到着する", example: "We arrived at the station at six." },
  { id: "v25", word: "either", reading: "イーザー", meaning: "どちらか、〜も(否定文で)", example: "I don't like coffee, either." },
  { id: "v26", word: "several times", reading: "セベラルタイムズ", meaning: "何度か", example: "I have visited Kyoto several times." },
  { id: "v27", word: "twice", reading: "トゥワイス", meaning: "2回", example: "I have been there twice." },
  { id: "v28", word: "wonderful", reading: "ワンダフル", meaning: "すばらしい", example: "We had a wonderful time." },
  { id: "v29", word: "popular", reading: "ポピュラー", meaning: "人気のある", example: "This song is popular." },
  { id: "v30", word: "expensive", reading: "エクスペンシブ", meaning: "値段が高い", example: "This bag is very expensive." },
  { id: "v31", word: "cheap", reading: "チープ", meaning: "安い", example: "This shop is cheap." },
  { id: "v32", word: "convenient", reading: "コンビーニエント", meaning: "便利な", example: "This app is very convenient." },
  { id: "v33", word: "purpose", reading: "パーパス", meaning: "目的", example: "What is the purpose of your trip?" },
  { id: "v34", word: "future", reading: "フューチャー", meaning: "未来、将来", example: "I think about my future." },
  { id: "v35", word: "dream", reading: "ドリーム", meaning: "夢", example: "My dream is to be a teacher." },
  { id: "v36", word: "goal", reading: "ゴール", meaning: "目標", example: "Our goal is to win the game." },
];

export type GrammarQuestion = {
  id: string;
  prompt: string; // 日本語での問題文
  sentence: string; // ___ を含む英文
  answer: string; // 正解(小文字/大文字はゆるく判定)
  hint: string;
};

export const grammarList: GrammarQuestion[] = [
  {
    id: "g1",
    prompt: "( )の動詞を過去形にしよう",
    sentence: "I ___ (play) tennis last Sunday.",
    answer: "played",
    hint: "規則動詞は ed をつける",
  },
  {
    id: "g2",
    prompt: "( )の動詞を過去形にしよう(不規則動詞)",
    sentence: "She ___ (go) to Osaka last week.",
    answer: "went",
    hint: "go の過去形は特別な形",
  },
  {
    id: "g3",
    prompt: "( )の動詞を過去形にしよう",
    sentence: "We ___ (see) a movie yesterday.",
    answer: "saw",
    hint: "see の過去形",
  },
  {
    id: "g4",
    prompt: "( )の形容詞を比較級にしよう",
    sentence: "This book is ___ (interesting) than that one.",
    answer: "more interesting",
    hint: "長い形容詞は more をつける",
  },
  {
    id: "g5",
    prompt: "( )の形容詞を比較級にしよう",
    sentence: "Tom is ___ (tall) than Ken.",
    answer: "taller",
    hint: "短い形容詞は er をつける",
  },
  {
    id: "g6",
    prompt: "( )の形容詞を最上級にしよう",
    sentence: "This is the ___ (famous) temple in Kyoto.",
    answer: "most famous",
    hint: "長い形容詞は most をつける",
  },
  {
    id: "g7",
    prompt: "( )の形容詞を最上級にしよう",
    sentence: "Mt. Fuji is the ___ (high) mountain in Japan.",
    answer: "highest",
    hint: "短い形容詞は est をつける",
  },
  {
    id: "g8",
    prompt: "There is / There are の文を完成させよう",
    sentence: "___ a cat under the table.",
    answer: "there is",
    hint: "単数のときは is",
  },
  {
    id: "g9",
    prompt: "There is / There are の文を完成させよう",
    sentence: "___ many students in the gym.",
    answer: "there are",
    hint: "複数のときは are",
  },
  {
    id: "g10",
    prompt: "「〜すること」の形(不定詞)を完成させよう",
    sentence: "I want ___ (study) English.",
    answer: "to study",
    hint: "want to + 動詞の原形",
  },
  {
    id: "g11",
    prompt: "「〜するために」の形(不定詞・目的)を完成させよう",
    sentence: "He went to the library ___ (read) books.",
    answer: "to read",
    hint: "目的を表す to + 動詞の原形",
  },
  {
    id: "g12",
    prompt: "「〜すべきこと」の形を完成させよう",
    sentence: "I have a lot of things ___ (do) today.",
    answer: "to do",
    hint: "名詞を後ろから修飾する to + 動詞の原形",
  },
  {
    id: "g13",
    prompt: "現在完了形(経験)の文を完成させよう",
    sentence: "I ___ (visit) Kyoto twice.",
    answer: "have visited",
    hint: "have + 過去分詞",
  },
  {
    id: "g14",
    prompt: "現在完了形(完了)の文を完成させよう",
    sentence: "She ___ (finish) her homework already.",
    answer: "has finished",
    hint: "主語が3人称単数なら has",
  },
  {
    id: "g15",
    prompt: "「〜しなければならない」の文を完成させよう",
    sentence: "You ___ (must) study hard for the test.",
    answer: "must",
    hint: "そのままの形でOK",
  },
  {
    id: "g16",
    prompt: "「〜する必要がある」の文を完成させよう",
    sentence: "We ___ (have to) leave now.",
    answer: "have to",
    hint: "主語がwe/youなら have to",
  },
  {
    id: "g17",
    prompt: "「〜されている」受け身の文を完成させよう",
    sentence: "English ___ (speak) in many countries.",
    answer: "is spoken",
    hint: "be動詞 + 過去分詞",
  },
  {
    id: "g18",
    prompt: "「〜されている」受け身の文を完成させよう",
    sentence: "This song ___ (love) by many people.",
    answer: "is loved",
    hint: "be動詞 + 過去分詞",
  },
  {
    id: "g19",
    prompt: "「〜することが好き」動名詞の文を完成させよう",
    sentence: "I like ___ (play) the guitar.",
    answer: "playing",
    hint: "動詞のing形",
  },
  {
    id: "g20",
    prompt: "「〜し終える」動名詞の文を完成させよう",
    sentence: "I finished ___ (eat) breakfast.",
    answer: "eating",
    hint: "finish の後ろは ing形",
  },
];
