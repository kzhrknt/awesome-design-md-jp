# DESIGN.md — ニチコン（NICHICON）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-26 / 対象: `https://www.nichicon.co.jp/`, `/company/about/message/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に青（`#1450e1`）1 色。角丸 12px のカードに **x も y も 2px ずらした斜めの影**を落とす。本文領域だけに字間を配る
- **密度**: 中。本文 16px に `line-height: 1.6`、字間 `0.05em`。ヘッダー・フッターには字間を付けない
- **キーワード**: 欧文優先スタック、`.l-main` にだけ字間、`min-width: 1080px`、斜めの影

**このサイトの核心は4つある。**

1. **字間の宣言が CSS 全文でただ 1 箇所、しかも `body` ではなく `.l-main`。** `.l-main { letter-spacing: 0.05em }` だけで、本文 16px に対する **`0.8px` という絶対値が 57 要素へ px 継承**される。`.l-main` の外にあるヘッダー・フッター・Cookie バーは `normal`（55 要素）。**「本文領域だけに字間を配る」設計**で、`body` に書く流儀（森ビル・愛知県美術館・IHI）とは配り先が違う
2. **`font-family` の先頭が欧文の Open Sans。** `body { font-family: "Open Sans", "Noto Sans JP", "ヒラギノ角ゴ Pro", … }` の 1 行で全体に降ろし、**欧文は Open Sans、和文は Noto Sans JP** に自動で分かれる。CDP の `CSS.getPlatformFontsForNode` で確認すると `ENGLISH` `my nichicon` は Open Sans、`重要なお知らせ` `製品一覧` `中文` は Noto Sans JP で描画されている
3. **`@font-face` が CSS 全文に 0 件なのに、Web フォントを 3 ファミリー読んでいる。** 正体は `@import url(https://fonts.googleapis.com/css2?…)` が 3 本。`@import` 先の中身は `document.styleSheets` を平坦に走査しても見えないので、**「`@font-face` 0 件」を「Web フォント未使用」の根拠にしてはいけない**（フォント要求は実測 37 件・すべて `fonts.gstatic.com`）
4. **影のオフセットが斜め。** 製品カードの影は `rgba(29,29,31,0.2) 2px 2px 8px 0px`（9 要素）で、**x も y も 2px**。真下に落とす一般的な `0 Npx` ではない

**計測上の注意**: 下層のサイドナビに**康熙部首が 3 種混入している**（`会社沿⾰` の `⾰` U+2FB0 ／ `拠点⼀覧` の `⼀` U+2F00 ／ `⽣産・品質管理` の `⽣` U+2F63）。字形はほぼ同じなので目では気づけないが、検索・コピー・読み上げが壊れる。**通常の漢字（革 U+9769 / 一 U+4E00 / 生 U+751F）で書く。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Blue（アクセント・CTA）** | **`#1450e1`** | 可視 14 要素。リンク文字、`my nichicon` と `検索する` の枠線、`メッセージを見る` ボタンの面、カルーセルのページャ枠 |
| **Navy（下層の見出し）** | **`#113293`** | 下層 3 要素。`ニチコンについて` の現在地、`トップノッチ経営で、コトづくりを目指し創造業へ` のリード |
| **Red（NEW バッジ）** | **`#b70b0b`** | 可視 2 要素。新着を示す `NEW` のみ |

> **青が 2 つある。使い分けを守る。** `#1450e1` は操作できるもの（リンク・ボタン・枠線）、`#113293` は下層の見出しとリード文。**トップには `#113293` が 1 要素も無い。**

### Neutral（ニュートラル）

- **Background** (`#ffffff`): ページ背景（`body { background-color: #fff }`）
- **Text Primary** (`#111111`): 本文・見出し（可視 24 要素）。`body { color: #111 }` として全体に降りる
- **Text Black** (`#000000`): ナビ・言語切替（可視 36 要素）
- **Text Sub** (`#555555`): 下層のパンくず（4 要素）
- **Text on Dark** (`#e0e0e0`): フッターのポリシーリンク（5 要素）
- **Text on Blue** (`#ffffff`): 青面・暗い面の文字（可視 32 要素）
- **Border** (`#d0d0d0`): 製品カードの枠線

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定**: **Noto Sans JP**（Google Fonts、`wght@300;400;500;700` の 4 本）。実測でスタックの 2 番目にあり、**和文はすべてここに落ちる**
- フォールバックは `ヒラギノ角ゴ Pro` → `Hiragino Kaku Gothic Pro` → `メイリオ` → `Meiryo` → `ＭＳ Ｐゴシック` → `MS PGothic` → `sans-serif`。**2010 年代前半の受け皿**だが、Google Fonts が確実に読み込まれる（フォント要求 37 件）ので到達しない
- **`Noto Serif JP`（`wght@300;400;500;600`）も読み込んでいるが、可視 0 要素**。読み込んで 1 文字も使っていない

### 3.2 欧文フォント

- **Open Sans**（Google Fonts、`wght@400;600;700;800` の 4 本）。**スタックの先頭**にあるので、欧文・数字はすべてここで描画される
- 実在するウェイトは 100px の欧文文字列で実測すると `400・500 → 1309.88px` / `600 → 1341.70px` / `700 → 1373.55px` / `800・900 → 1410.31px` の **4 面**。URL の `wght@` と一致する
- `Arial` が 6 要素だけある（カルーセルのページャ番号）

### 3.3 font-family 指定

```css
body {
  font-family: "Open Sans", "Noto Sans JP",
               "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
               "メイリオ", "Meiryo", "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  font-size: 1.6rem;          /* html が 62.5% なので 16px */
  line-height: 1.6;
  word-wrap: break-word;
  min-width: 1080px;          /* デスクトップは横スクロールで守る */
  color: #111;
  background-color: #fff;
  font-feature-settings: "palt";
  -webkit-font-smoothing: antialiased;
  backface-visibility: hidden;
}
```

**Web フォントの調達は `@import` の 3 本だけ。`@font-face` は 1 件も書かれていない。**

```css
@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600&display=swap);  /* 可視 0 */
```

### 3.4 文字サイズ・ウェイト階層

| 用途 | サイズ | weight | 実測件数 |
|------|--------|--------|----------|
| セクション見出し（欧文） | **54px** | 700 | 3（`OUR BUSINESS` `NEWS` `OUR VALUES`） |
| ページ見出し（和文・下層） | 36px | 700 | 1 |
| リード（下層） | 30px | 500 | 1 |
| セクション見出し（和文） | 40px | 700 | 2 |
| ブロック見出し | 22px | 700 | 2 |
| 製品カード名 | **18px** | 500 | 22 |
| 本文・ナビ | **16px** | 400 / 500 / 700 | **37（最多）** |
| 言語切替・補足 | **14px** | 400 | 35 |
| パンくず・小ラベル | 12〜13px | 400 | 9 |

- 可視ウェイトは **500（49）／ 400（37）／ 700（29）** の 3 段
- **Noto Sans JP に 600 を当てない。** 実在は 300/400/500/700 の 4 本で、600 を指定すると **700 に丸まる**（実測で 600 と 700 が同じ 1356px）

### 3.5 行間・字間

- **`body { line-height: 1.6 }`（無単位）**。実測でも **1.60 が 81 要素（トップ）／ 65 要素（下層）で最多**
- ナビ・ボタンは **1.40**（25 要素）、下層のリードだけ **1.80**（1 要素）

**字間は `.l-main` にだけ書いて、本文領域に px で降ろす。**

```css
.l-main { letter-spacing: 0.05em; }   /* CSS 全文でここ 1 箇所だけ */
```

| 実測値 | 件数 | 正体 |
|--------|------|------|
| `normal` | 55 | **`.l-main` の外**（ヘッダー・フッター・Cookie バー） |
| **`0.8px`** | **57** | `.l-main` の `0.05em` が **16px に対する絶対値として降りたもの**。18px の製品カード名も 54px の見出しも**すべて 0.8px** |
| `1.62px` | 3 | 54px の欧文見出しが自分で `0.03em` を宣言し直したもの |

> **`em` 宣言 → `px` 継承**なので、サイズが違っても字間は 0.8px のまま。18px の要素では 0.044em、54px では 0.015em に薄まる。
>
> **`body` の `font-size` は 768px 以下で 14px に切り替わるので、モバイルでは字間も `0.7px` になる。** 字間を px で直書きすると、この追従が壊れる。

### 3.6 禁則処理・改行ルール

- `body { word-wrap: break-word }`。`word-break` は `normal`（17 幅すべて）
- `word-break: break-all` も `auto-phrase` も使っていない

### 3.7 OpenType 機能

```css
body { font-feature-settings: "palt"; }   /* 宣言は body に 1 行だけ */
```

- 実測 **452 要素（トップ）／ 219 要素（下層）**
- 効き目は実測 **−11.7%**（実スタック・40px・weight 500 で `ニチコンのエネパ！を高める製品（コンデンサ）` を測定。`normal` 880.00px → `"palt"` 776.77px）
- **`palt` の上から `.l-main` の `0.05em` を足し直している。** 詰めてから少し空ける二段構えで、片方だけ再現すると字面が変わる

### 3.8 縦書き

- **縦書きは使っていない**（`writing-mode: vertical-rl` 実測 0 要素・両ページ）

---

## 4. Component Stylings

### Buttons

```css
/* 面を塗る CTA */
.c-buttonPrimary {
  padding: 8px 36px;
  background-color: #1450e1;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 2px 2px 10px 0px;
}

/* 枠線のユーティリティ（my nichicon・検索する） */
.c-buttonOutline {
  padding: 2.8px 9px;
  border: 1px solid #1450e1;
  color: #1450e1;
  border-radius: 4px;
}

/* 下層のサイドナビ項目 */
.c-side__navLink {
  padding: 19px 18px 19px 34px;
  color: #111111;              /* 現在地だけ #113293 */
  background-image: url(/_assets/images/common/ico_arrow_blue.svg);
}
```

### Cards

```css
.c-cardProduct {
  border-radius: 12px;
  border: 1px solid #d0d0d0;
  box-shadow: rgba(29, 29, 31, 0.2) 2px 2px 8px 0px;   /* x も y も 2px */
}
```

- 角丸は **12px**（カード 9 要素）→ **8px**（ボタン 4）→ **4px**（小物 5）→ **6px**（1）の 4 段

### Inputs

- 検索ボックスは枠線 `1px solid #1450e1` / `border-radius: 4px` / `padding: 1px 6px`

---

## 5. Layout Principles

### Spacing Scale

- gap は **16px**（6 要素で最多）→ **20px** → **30px** → **38px**。カードグリッドだけ `30px 28px`

### Container

| 幅 | 件数 | 用途 |
|----|------|------|
| **1700px** | 9（トップ）/ 3（下層） | セクションの最大幅 |
| **1072px** | 1（トップ）/ 3（下層） | 下層の本文カラム |

- **`body { min-width: 1080px }`**。デスクトップではこれ以下に縮まず、横スクロールで守る

### Grid

- 製品カードは等幅の横並び、gap `30px 28px`

---

## 6. Depth & Elevation

**影は 4 種類。すべて x に 2px のオフセットが入る（1 つを除く）。**

| 影 | 実測 | 用途 |
|----|------|------|
| `rgba(29, 29, 31, 0.2) 2px 2px 8px 0px` | 9 要素 | 製品カード |
| `rgba(0, 0, 0, 0.16) 2px 2px 10px 0px` | 1 | `メッセージを見る` ボタン |
| `rgba(0, 0, 0, 0.1) 2px 2px 10px 0px` | 1 | 検索ボタン |
| `rgba(0, 0, 0, 0.16) 0px 4px 16px 0px` | 1 | 上部の重要なお知らせバー |

> **影の色を黒に丸めない。** カードの影は `rgba(29, 29, 31, 0.2)` で、純黒ではない。

---

## 7. Do's and Don'ts

### Do（推奨）

- **字間は `.l-main`（本文のラッパー）に `0.05em` を 1 回だけ書く。** ヘッダー・フッターには付けない
- `body` に `font-feature-settings: "palt"` と `line-height: 1.6` を書いて継承させる
- `font-family` は **欧文を先頭**にした 1 本のスタックで済ませる（`"Open Sans", "Noto Sans JP", …`）
- 青は **`#1450e1`**（操作できるもの）と **`#113293`**（下層の見出し）を使い分ける
- カードは角丸 **12px** ＋ **`rgba(29,29,31,.2) 2px 2px 8px`** の斜めの影
- `html { font-size: 62.5% }` ＋ `rem` 指定（`1.6rem` = 16px）

### Don't（禁止）

- **康熙部首（`⾰` `⼀` `⽣` など）を使わない。** 実サイトは下層のサイドナビで 3 文字踏んでいる。見た目が同じなので目視では気づけず、検索・コピー・読み上げが壊れる
- **`Noto Sans JP` に `font-weight: 600` を当てない。** 実在は 300/400/500/700 で、600 は 700 に丸まる
- **明朝体（`Noto Serif JP`）を使わない。** 4 ウェイト読み込んでいるが可視 0 要素
- **字間を `px` で直書きしない。** `.l-main` の `0.05em` は `body` のサイズに追従し、768px 以下で 0.8px → 0.7px に変わる
- **影を `0 Npx` の真下に落とさない。** このサイトの影は x 方向にも 2px ずれる
- **「`@font-face` が 0 件だから Web フォント未使用」と判断しない。** 調達は `@import` 経由で、実際には 37 件のフォントファイルを読んでいる
- `palt` を外さない。外すと和文の字面が 11.7% 広がる

---

## 8. Responsive Behavior

### Breakpoints

| 幅 | `html` | `body` | `<a>` | `<h2>` | `<h3>` |
|----|--------|--------|-------|--------|--------|
| **769px 以上** | 10px | **16px** | 16px | 54px | 20px |
| **768px 以下** | 10px | **14px** | 13px | 36px | 16px |

```css
html { font-size: 62.5%; }              /* 17 幅すべてで 10px 固定 */
body { font-size: 1.6rem; }             /* 16px */
@media screen and (max-width: 48em) { body { font-size: 1.4rem; } }   /* 14px */
```

### ルート・本文の実測（17 幅で測定）

1920 / 1600 / 1440 / 1200 / 1024 / 992 / 991 / 834 / 769px → `html: 10px` / `body: 16px` / `line-height: 25.6px`
768 / 767 / 600 / 480 / 390 / 375 / 320px → `html: 10px` / `body: 14px` / `line-height: 22.4px`

> **ルートは完全固定で、切り替わるのは `body` だけ。** 境目は **769 / 768px** で、`rootProbe` だけ見ると「固定のサイト」に見える。`body` と要素を一緒に測らないと段差が見えない。
>
> `.l-main` の `letter-spacing: 0.05em` もここで **0.8px → 0.7px** に変わる。

### タッチターゲット

- サイドナビ `19px 18px 19px 34px` ＝ 高さ 57px、ボタン `8px 36px`

### フォントサイズの調整

- `body` が 0.875 倍になるのに加えて、見出しは要素側でも段を落とす（54px → 36px、40px → 24px）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
和文フォント: Noto Sans JP（Google Fonts・wght@300;400;500;700）
欧文フォント: Open Sans（Google Fonts・wght@400;600;700;800）※スタックの先頭
調達: @import url(https://fonts.googleapis.com/css2?…) を 3 本（@font-face は書かない）
フォールバック: ヒラギノ角ゴ Pro, Hiragino Kaku Gothic Pro, メイリオ, Meiryo, ＭＳ Ｐゴシック, MS PGothic, sans-serif
ルート: html 62.5%（= 10px・固定）
本文: body 1.6rem（16px）/ 768px 以下は 1.4rem（14px）
行間: body 1.6
字間: .l-main に 0.05em（= 0.8px が px 継承）。ヘッダー・フッターは normal
palt: body に 1 行（実測 452 要素・-11.7%）
文字色: #111111（本文）/ #000000（ナビ）/ #555555（パンくず）/ #ffffff（青面）
アクセント: #1450e1（操作）/ #113293（下層見出し）/ #b70b0b（NEW）
面: #ffffff
角丸: カード 12px / ボタン 8px / 小物 4px
影: rgba(29,29,31,.2) 2px 2px 8px（x も 2px）
最大幅: 1700px / 本文 1072px / body min-width: 1080px
gap: 16px
```

### プロンプト例

```
ニチコンのコーポレートサイト（https://www.nichicon.co.jp/）の DESIGN.md に従って、
製品カテゴリの一覧セクションを作ってください。

- font-family は "Open Sans", "Noto Sans JP", ヒラギノ角ゴ Pro, … の順。
  欧文は Open Sans、和文は Noto Sans JP に落ちる
- body に font-feature-settings: "palt" と line-height: 1.6 を書く
- 字間は本文ラッパー（.l-main）に letter-spacing: 0.05em を 1 回だけ。
  ヘッダー・フッターには付けない
- カードは border-radius: 12px、border 1px solid #d0d0d0、
  box-shadow: rgba(29,29,31,.2) 2px 2px 8px 0px
- リンクと CTA は #1450e1。weight は 400 / 500 / 700 の 3 段だけ
- html は 62.5%、サイズは rem で書く。768px 以下で body を 1.4rem に落とす
- 漢字は通常のコードポイントで書く（康熙部首を使わない）
```
