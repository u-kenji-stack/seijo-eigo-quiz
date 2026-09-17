# せいじょう英語クイズ

中学2年生・2学期中間試験むけの英語学習クイズアプリです。
読み書きに苦手意識がある生徒でも取り組みやすいように、以下を意識して作っています。

- タイプ入力で答える → 手を動かして単語のつづりを覚えられる
- 正解・問題文を音声で読み上げる(Web Speech API)→ 耳からも情報が入る
- 大きめの文字、読みやすいフォント(Atkinson Hyperlegible)、やわらかい配色
- スコア・連続正解(ストリーク)・応援メッセージでゲーム感覚で続けられる

## 出題内容について

`lib/data.ts` に単語(`vocabList`)と文法問題(`grammarList`)が入っています。
今回は「中2の2学期でよく扱う内容」を想定した**仮のサンプル**です。
実際の教科書・試験範囲に合わせて、このファイルの中身を書きかえてください。
コードの構造は変えずに、配列の中身(word/meaning/exampleなど)を差し替えるだけでOKです。

## ローカルで動かす

```bash
npm install
npm run dev
```

http://localhost:3000 を開いてください。

## ビルド確認

```bash
npm run build
```

## GitHubにアップロードする

1. このフォルダを展開(zipの場合は解凍)します。
2. https://github.com/new で空のリポジトリを作成します(README・.gitignore・ライセンスは追加しない)。
3. フォルダ内でターミナルを開き、以下を実行します(URLは自分のリポジトリのものに置き換えてください)。

```bash
git remote add origin https://github.com/<あなたのアカウント>/<リポジトリ名>.git
git push -u origin main
```

すでに `git remote add origin` でエラーが出た場合は、すでに設定済みという意味なのでそのまま `git push` に進んでください。

## Vercelにデプロイする

1. https://vercel.com/new を開きます。
2. 画面上部の「Ask v0 to build...」の入力欄には**何も入力しない**でください。「Import Git Repository」のセクションから GitHub ボタンを押します。
3. リポジトリ一覧が出てこない場合は、GitHub側でVercelアプリのインストール・アクセス許可が必要です。画面の案内に従って許可してください。
4. 対象のリポジトリを選び「Import」→ Framework Preset が「Next.js」になっていることを確認して「Deploy」を押します。
5. 2段階認証(2FA)の案内が出ても、"Skip securing my account" でスキップして問題ありません。
6. ビルドが終わると本番URLが発行されます。以後は GitHub に push するたびに自動で再デプロイされます。

## 音声読み上げについて

Web Speech API を使用しているため、対応ブラウザ(Google Chrome など)で音がオンになっている状態で開いてください。
学校のタブレット・PCでスピーカーやイヤホンが使える環境だと、より効果的に使えます。
