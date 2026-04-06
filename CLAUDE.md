# awesome-design-md-jp

日本語UIをAIエージェントに正しくつくらせるための DESIGN.md 集。
Google Stitch の DESIGN.md フォーマットを日本語タイポグラフィ向けに拡張している。

## DESIGN.md の追加手順

ユーザーから「このサイトの DESIGN.md をつくって」と言われたら、以下の手順で進める。

### 1. トークン抽出スクリプトを実行する

```bash
# トップページ + 主要なサブページ（記事、一覧、フォーム等）を指定
npm run extract -- --out scripts/<サービス名>.json \
  "https://example.com/" \
  "https://example.com/some-subpage"
```

- 同一ドメインの複数URLを指定すると、2番目以降はページ内遷移で取得する（SPA の bot 検知対策）
- 出力JSONには `computedStyles`（要素ごとの実測値）と `customProperties`（CSS変数一覧）が含まれる
- 同じタグでもスタイルが異なるバリエーションは別エントリとして収集される
- `_context` フィールドで article/nav/header 等どの領域の要素かわかる

### 2. テンプレートをコピーして DESIGN.md を作成する

```bash
mkdir -p design-md/<サービス名>
cp template/DESIGN.md design-md/<サービス名>/DESIGN.md
```

### 3. 抽出データをもとに DESIGN.md を埋める

JSONの値を使って各セクションを記述する。以下の点に注意：

- **色は hex 値**で記述する（`rgb(8, 19, 26)` → `#08131a`）
- **font-family はフォールバックチェーン全体**を記述する
- **line-height は比率に換算**する（`36px` / `18px` = `2.0`）
- **letter-spacing は em に換算**する（`1.28px` / `32px` = `0.04em`）
- **`_context` を見て、どの領域の値か区別**する（nav 内の h2 と article 内の h2 は別物）
- セクションヘッダーは英語、値の説明・Do's and Don'ts は日本語
- customProperties の `--color-*` 系はセクション2（Color）、`--font-*`/`--family-*` はセクション3（Typography）、`--elevation-*` はセクション6（Depth）にそれぞれ使う

### 4. 精度を検証する

スクリプトの結果で不明な点（シャドウの用途、ボタンの正確な角丸等）がある場合は、ユーザーに DevTools での確認を依頼する。以下のスニペットを渡す：

```js
// 特定要素の computed style を確認
const el = document.querySelector('対象のセレクタ');
console.log(getComputedStyle(el).borderRadius);
```

### 5. テストHTMLを作成する（任意）

DESIGN.md の値が正しく適用されるか確認するために `design-md/<サービス名>/index.html` を作成できる。
既存の `design-md/smarthr/index.html` を参考に、HTMLの構造はそのままでCSSだけ差し替える。

## セクション構成

template/DESIGN.md の9セクション構成に従う：

1. Visual Theme & Atmosphere
2. Color Palette & Roles
3. **Typography Rules** — 日本語拡張の核心（3.1〜3.8）
4. Component Stylings
5. Layout Principles
6. Depth & Elevation
7. Do's and Don'ts
8. Responsive Behavior
9. Agent Prompt Guide

## 日本語タイポグラフィで特に注意する点

- `letter-spacing` と `palt` がどの要素に適用されているか必ず実測で確認する（見出し専用のことが多い）
- `line-height` は欧文サイトと大きく異なる（日本語本文は 1.5〜2.0）
- `font-weight: 600`（semibold）と `700`（bold）の使い分けに注意
- Windows の游ゴシック問題（`@font-face` で Medium マッピングが必要か）を確認する
- font-family のフォールバック順序（和文優先 vs 欧文優先）はサービスごとに方針が異なる

## ファイル構成

```
awesome-design-md-jp/
├── CLAUDE.md              ← このファイル
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json           ← puppeteer 依存、npm run extract コマンド
├── template/
│   └── DESIGN.md          ← 日本語拡張テンプレート
├── scripts/
│   └── extract-tokens.mjs ← デザイントークン自動抽出スクリプト
└── design-md/
    ├── smarthr/
    │   ├── DESIGN.md
    │   └── index.html     ← テスト用プレビュー
    ├── freee/
    │   └── DESIGN.md
    └── note/
        ├── DESIGN.md
        └── index.html     ← テスト用プレビュー
```
