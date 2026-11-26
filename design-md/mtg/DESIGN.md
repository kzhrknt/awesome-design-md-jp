# DESIGN.md — MTG

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-26 / 対象: `https://www.mtg.gr.jp/`, `/company/philosophy/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に無彩色だけ。**彩度を持つ色が 1 つも無い**（実測 `uniqueBackgrounds` 10 色すべてグレースケール）。面は塗らず、余白と 4px の角丸で区切る
- **密度**: 中。本文 14px に `line-height: 1.8`、ナビ 16px に字間 `0.1em`。写真が主役で、文字は写真を邪魔しない大きさに抑える
- **キーワード**: 完全無彩色、`palt`、欧文は詰め和文は空ける、Noto Sans JP + Roboto の二層

**このサイトの核心は4つある。**

1. **字間の符号が、言語で正反対になる。** 欧文（Roboto）は **`-0.02em`**（CSS 全文で 50 箇所。実測は 12px → `-0.24px` ／ 14px → `-0.28px` ／ 18px → `-0.36px` ／ 24px → `-0.48px` ／ 32px → `-0.64px` ／ 40px → `-0.8px` ／ 64px → `-1.28px` と**全サイズで em 比例**）、和文（Noto Sans JP）は **`0.1em`**（12px → `1.2px` ／ 14px → `1.4px` ／ 16px → `1.6px`）。**振れ幅 0.12em を 1 ページの中で行き来する**
2. **CSS 変数は 1 個しか無く、その 1 個が使われていない。** `:root { --leading-trim: calc((1em - 1lh) / 2) }` が唯一の宣言で、`var(--leading-trim)` の呼び出しは **CSS 全文で 0 回**（`customPropertiesSummary` も `total: 1 / own: 1`）。CSS の `lh` 単位でハーフレディングを打ち消す高度な式を定義したまま、1 要素にも当てていない
3. **`font-feature-settings: "palt"` を `body` とコンポーネントの二重で配る。** `body` に 1 行書いたうえで `.c-cardNotice-title` `.c-theRelated-title` など**個別クラスにも `"palt" on` を書き足して**おり、実測はトップ **1563 要素** / 下層 **1249 要素**。実測の効き目は **−12.2%**（Noto Sans JP・40px・`normal` 784.41px → `"palt"` 688.41px）
4. **色が 1 つも無い。** 面も文字も `#242424` `#313131` `#3c3c3c` `#464646` `#7b7b7b` `#919191` `#e4e2de` `#e8e8e4` `#f4f6f6` `#ffffff` の 10 値だけ。ブランド色・アクセント色・リンク色がすべて無彩色で、**彩度を持つ唯一の色 `rgb(0,77,138)` は Cookie 同意バーのリンク**（サイト本体ではない）

**計測上の注意**: `color` 分布の第 2 位 `rgba(0, 0, 0, 0)` が **56 要素**あるが、これは透明な文字ではなく**ナビの 1 文字ずつを `-no0` `-no1` … の span に割ったホバーアニメーションの初期状態**。実際には黒で描画される。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Ink（面・文字）** | **`#242424`** | **可視 10 要素（トップ）／ 11 要素（下層）で最多の面**。ヘッダー・フッターの全面塗り、言語切替、セクション見出し `Brand Universe` `VITAL LIFE` の文字色 |
| **Ink Light（下層ナビ面）** | **`#464646`** | 可視 5 要素。下層のローカルナビ `ブランドTOP` `サステナビリティTOP` `企業案内TOP` の面 |
| **Ink Mid** | **`#313131`** | 可視 2 要素。メガメニューの面と Cookie バーの同意ボタン |

> **ブランドカラーが存在しない。** ReFa・五島の椿・MEGLY といったブランドの色は**すべて写真が持っており、UI 側は 1 色も持たない**。無彩色の面に写真を置くことで、ブランドごとの色がそのまま画面の色になる。

### Neutral（ニュートラル）

- **Background** (`#ffffff`): ページ背景（`body { background-color: #FFF }`）
- **Surface** (`#f4f6f6`): セクション面（可視 6 要素）。`Brand Universe` ブロック、企業情報カード
- **Surface Warm** (`#e8e8e4`): お知らせブロックの面（トップ 1 要素）
- **Surface Warm 2** (`#e4e2de`): 下層の企業情報ブロック（1 要素）
- **Text Primary** (`#000000`): 本文・リンク（可視 34 要素）
- **Text Sub** (`#7b7b7b`): 補足・カードの説明文（可視 20 要素）
- **Text on Dark** (`#ffffff`): 暗い面の文字（可視 56 要素）
- **Border / Disabled** (`#919191` / `#3c3c3c`): 枠線と `EN` の面

### グラデーション

1 箇所だけ 2 枚重ねのグラデーションがある。**角度と停止位置を丸めずそのまま写す。**

```css
background-image:
  linear-gradient(38.63deg, #ebeded 19.823%, #ffffff 81.685%),
  linear-gradient(90deg, #f4f6f6 0%, #f4f6f6 100%);
```

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定**: **Noto Sans JP**（**自社ホスト配信**。`/assets/font/NotoSansJP-{Regular,Medium,Bold}.woff2` の 3 本。Google Fonts ではない）。実測 **可視 115 要素**
- `document.fonts` の状態は **Regular `loaded` / Medium `loaded` / Bold `unloaded`**。**Bold を当てている可視要素が 1 つも無いので、ダウンロードも発生していない**（フォント要求 6 件のうち和文は Regular と Medium の 2 件だけ）
- フォールバックは `YuGothic` → `游ゴシック` → `Hiragino Kaku Gothic ProN` → `Hiragino Sans` → `Meiryo` → `sans-serif`
- **明朝体は 1 要素も使っていない**（`Noto Serif JP` を 4 ウェイト、`Noto Serif` を 1 ウェイト宣言しているが**全部 `unloaded`・可視 0**）

### 3.2 欧文フォント

- **Roboto**（自社ホスト配信。Regular / Medium の 2 本、どちらも `loaded`）。実測 **可視 50 要素**。`News` `Brands` `Company` `IR` などの英語見出しと、ブランド名のロゴ組み
- **`Roboto SemiBold`（別ファミリー名）** が 1 本だけある。実測 **可視 2 要素**（`VITAL LIFE` と そのサブコピー、64px / weight 600）

```css
/* 実サイトの宣言。SemiBold だけファミリー名を分けている */
@font-face { font-family: Roboto;              src: url("/assets/font/Roboto-Regular.woff2") format("woff2"), …; font-weight: 400 }
@font-face { font-family: Roboto;              src: url("/assets/font/Roboto-Medium.woff2")  format("woff2"), …; font-weight: 500 }
@font-face { font-family: "Roboto SemiBold";   src: url("/assets/font/Roboto-SemiBold.ttf")  format("truetype"); font-weight: 600 }
```

> **`Roboto SemiBold` だけ `.ttf` 直で、woff2 が無い。** 他の 2 本は woff2 / woff / ttf の 3 形式を並べているのに、SemiBold は truetype 1 形式のみ。**`.ttf` は woff2 の 2〜3 倍重い**ので、再現するときは woff2 を用意する。

### 3.3 font-family 指定

```css
/* 和文（既定）— body に 1 行 */
body {
  color: #000;
  font-family: "Noto Sans JP", YuGothic, "游ゴシック",
               "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  background-color: #FFF;
  font-feature-settings: "palt";
  line-height: 1.75;
}

/* 欧文見出し */
.c-headingSection-title { font-family: Roboto, YuGothic, "游ゴシック",
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif; }

/* 64px の大コピーだけ */
.p-pageIndexSectionCompanySticky-mainCopy {
  font-family: "Roboto SemiBold", YuGothic, "游ゴシック", …; font-weight: 600; }
```

> **Roboto 側のスタックにも和文フォールバックが丸ごと付いている。** 欧文専用の指定ではなく、「先頭だけ差し替えて残りは共通」という書き方。和文が混ざっても游ゴシック／ヒラギノに落ちるので字面は破綻しない。

**宣言だけで未使用のものが 3 系統ある。どれも真似しない:**

- **`midashi`**: `@font-face { font-family: midashi; src: url("/assets/font/A-OTF%20Midashi%20Go%20MB31%20Pro%20MB31.woff2") … }` — モリサワの**見出ゴ MB31 Pro を自社サーバーに置いて配信する宣言**が残っている。`unloaded`・可視 0
- **`Marcellus`**: `unloaded`・可視 0
- **`Noto Serif JP`（300/400/600/700）と `Noto Serif`**: 5 本すべて `unloaded`・可視 0

### 3.4 文字サイズ・ウェイト階層

| 用途 | サイズ | weight | 実測件数 |
|------|--------|--------|----------|
| 大コピー（欧文） | **64px** | **600**（`Roboto SemiBold`） | 2 |
| セクション見出し（欧文） | **40px** | 500（Roboto） | 5 |
| セクション見出し（欧文・小） | **32px** | 500 | 2 |
| カード見出し（欧文） | **24px** | 500 | 4 |
| ナビ・リード | 18px | 400 | 15 |
| 本文・ニュース | **14px** | 400 / 500 | **79（最多）** |
| グローバルナビ（和文） | 13px | 500 | 36 |
| ラベル・キャプション | 12px | 500 | 15 |

**実在するウェイトは Noto Sans JP が 400 / 500 / 700 の 3 本、Roboto が 400 / 500 の 2 本。** 100px の欧文文字列で幅を実測すると、Noto Sans JP は `100–400 → 1024.31px` / `500 → 1047.20px` / `600–900 → 1093.31px` の **3 面**、Roboto は `100–400 → 1013.28px` / `500–900 → 1019.83px` の **2 面**に割れる。

> **`font-weight: 300` を 9 要素に当てているが、300 のファイルは無いので 400 で描画される。** 対象はニュースの日付（`2026/11/26` ほか）。**細くしたつもりが効いていない。**

### 3.5 行間・字間

- **`body { line-height: 1.75 }`（無単位）**。16px × 1.75 = 28px が既定として全子孫に降りる（767px 以下は 14px × 1.75 = 24.5px）
- 要素別の行間比: **1.30（36 要素・グローバルナビ）／ 1.80（33 要素・本文とニュース）／ 1.50（33 要素・ブランド名）／ 1.70（8 要素）／ 1.60（6 要素）／ 1.75（5 要素）**
- 行間比 **0.90〜1.08 が 47 要素**あるが、これは 1 文字ずつ span に割ったロゴ組みとナビ（`0.92` 18 要素 ／ `1.08` 17 要素 ／ `0.90` 12 要素）。**本文に 1 未満を使っているわけではない**

**字間は言語で符号が逆になる。この 2 つを両方書く。**

```css
/* 欧文 — 詰める。CSS 全文で 50 箇所、すべて同じ値 */
.c-headingSection-title,
.p-pageIndexSectionBrands-categoryLabel,
.c-imageScaleLink-title { letter-spacing: -0.02em; }

/* 和文 — 空ける */
.f_brands,
.c-theHeader-link-text { letter-spacing: 0.1em; }
```

| 実測値 | 件数 | 書体 | サイズ | em 換算 |
|--------|------|------|--------|---------|
| `normal` | 92 | — | — | — |
| `1.4px` | 39 | Noto Sans JP | 14px | **+0.1000** |
| `-0.36px` | 12 | Roboto | 18px | **−0.0200** |
| `1.6px` | 8 | Noto Sans JP | 16px | **+0.1000** |
| `-0.8px` | 5 | Roboto | 40px | −0.0200 |
| `-0.48px` | 4 | Roboto | 24px | −0.0200 |
| `-0.28px` | 3 | Roboto | 14px | −0.0200 |
| `-0.24px` | 3 | Roboto | 12px | −0.0200 |
| `-1.28px` | 2 | Roboto SemiBold | 64px | −0.0200 |

> **em 宣言なので、サイズを変えれば字間も比例して動く。** px に読み替えてはいけない。
>
> **ただし CSS には `rem` 宣言の字間も混ざっている**（`-0.0175rem` と `-0.0171428571rem`）。ルートが 768px を境に 16px → 14px へ切り替わるため、**同じ −0.28px を出すのに 2 つの rem 値を書き分けている**。再現するなら `em` に統一するほうが安全。

### 3.6 禁則処理・改行ルール

- `body { word-break: normal }`（17 幅すべてで `normal`）。`word-break: break-all` も `auto-phrase` も使っていない
- 日本語の改行はブラウザ既定の禁則に任せる

### 3.7 OpenType 機能

```css
body { font-feature-settings: "palt"; }          /* 全体に降ろす */
.c-cardNotice-title      { font-feature-settings: "palt" on; }  /* さらに個別に書き足す */
.c-cardNoticeSmall-title { font-feature-settings: "palt" on; }
.c-theRelated-title      { font-feature-settings: "palt" on; }
```

- 実測 **1563 要素（トップ）／ 1249 要素（下層）**。`body` 1 行で足りるところを**コンポーネント側でも重ねて書いている**が、結果は同じ
- 効き目は実測 **−12.2%**（実スタック・40px・weight 500 で `ブランド開発カンパニー「MTG」、世界へ。` を測定）
- **`palt` で詰めたうえから、和文には `+0.1em` を足し直している。** 片方だけ再現すると別物になる

### 3.8 縦書き

- **縦書きは使っていない**（`writing-mode: vertical-rl` 実測 0 要素・両ページ）

---

## 4. Component Stylings

### Buttons

**面を塗るボタンが 1 つも無い。** 枠線か、面のないテキストリンクだけ。

```css
/* 一覧へのリンク（ヘッダー内・暗い面の上） */
.c-buttonList {
  padding: 16px 12px 16px 20px;
  color: #ffffff;
  border: none;
  border-radius: 4px;
}

/* 下層のローカルナビ */
.c-localNav-item {
  padding: 18px 20px;
  background-color: #464646;
  color: #ffffff;
}

/* 唯一の枠線ボタン（下層のお問い合わせ） */
.c-buttonContact {
  padding: 16px 0;
  border: 1px solid #525557;
  color: #ffffff;
}
```

### Cards

- 角丸 **4px**（実測 27 要素で最多）。小さいものは **3px**（12 要素）、**2px**（4 要素）、**1px**（1 要素）
- 丸アイコンのみ `50%`（5 要素）
- **影は使わない**（下記 6 章）

### Inputs

- サイト内に入力欄が無い（検索はヘッダーのアイコンからモーダルで開く）。再現するときはボタンと同じ `border: 1px solid #919191` / `border-radius: 4px` に揃える

---

## 5. Layout Principles

### Spacing Scale

- gap は **20px**（21 要素で最多）→ **32px**（5）→ **6px**（3）の 3 段
- ボタンの padding は `16px 12px 16px 20px` / `18px 20px` / `16px 0`

### Container

| 幅 | 件数 | 用途 |
|----|------|------|
| **1440px** | 6 | 最外のラッパー |
| **1360px** | 6 | セクションの内側 |
| **1300px / 1230px** | 各 1 | 一部のセクション |
| **823px** | 5 | 本文カラム |
| **671px** | 1 | 2 カラムの片側 |

### Grid

- ブランド一覧・企業情報カードは等幅の横並び。gap 20px

---

## 6. Depth & Elevation

**サイト本体に影は 1 つも無い。**

実測 `box-shadow` は 1 種類（`rgba(0,0,0,0.5) 0px 5px 15px 0px`）だけで、**それは Cookie 同意バー（外部スクリプト）のもの**。カード・ボタン・ヘッダーのいずれにも影が無い。

階層は **面の明度差**（`#ffffff` → `#f4f6f6` → `#e8e8e4` → `#242424`）と **4px の角丸**だけで作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **欧文は `letter-spacing: -0.02em`、和文は `0.1em`** を当てる。符号が逆なのがこのサイトの字面
- `body` に `font-feature-settings: "palt"` と `line-height: 1.75` を書いて継承させる
- 色は **無彩色 10 値だけ**から選ぶ。彩度のある色が要るときは、色ではなく**写真**を置く
- 角丸は **4px**。小物は 3px / 2px
- Noto Sans JP は **400 と 500 の 2 段**で組む（700 は宣言だけで使われていない）
- 欧文の 64px 見出しは `font-family: "Roboto SemiBold"` に差し替える（`font-weight: 600` だけでは Roboto の Medium 止まり）

### Don't（禁止）

- **`font-weight: 300` を使わない。** 300 のファイルが無いので 400 で描画される（実サイトは日付 9 要素でこれを踏んでいる）
- **`font-weight: 700` 以上を Noto Sans JP に当てない。** Bold は宣言されているが読み込まれておらず、当てると初めてダウンロードが走る
- **明朝体（`Noto Serif JP` / `Noto Serif` / `Marcellus`）を使わない。** 宣言はあるが 1 要素も使っていない
- **`midashi`（A-OTF 見出ゴ MB31 Pro）を真似しない。** 商用フォントを自社ホストから配信する宣言が残っているだけで、実際には読み込まれていない
- **`--leading-trim` を「このサイトのトークン」として引用しない。** 唯一の CSS 変数だが `var()` の呼び出しが 0 回で、1 要素にも効いていない
- **影を足さない。** サイト本体に `box-shadow` は 1 つも無い
- **彩度のある色を足さない。** 青もグレーも緑も使われていない
- `palt` を外さない。外すと和文の字面が 12% 広がり、`+0.1em` の字空けと噛み合わなくなる

---

## 8. Responsive Behavior

### Breakpoints

| 幅 | ルート | body | 本文 `<p>` | セクション見出し `<h3>` |
|----|--------|------|-----------|----------------------|
| **768px 以上** | **16px** | 16px | 16px | 40px |
| **767px 以下** | **14px** | 14px | 12px | 32px |

```css
html { font-size: 16px; }
@media (max-width: 767px) { html { font-size: 14px; } }
```

### ルート・本文の実測（16 幅で測定）

1920 / 1600 / 1440 / 1200 / 1024 / 992 / 991 / 834 / 769 / 768px → すべて `html: 16px` / `body: 16px` / `line-height: 28px`
767 / 600 / 480 / 390 / 375 / 320px → すべて `html: 14px` / `body: 14px` / `line-height: 24.5px`

> **768 → 767px の 1px で 0.875 倍に落ちる 1 段だけの階段。** 流体（`vw` / `clamp()`）は使っていない。`rem` で書いた値はこの境目で一斉に 0.875 倍になるので、**字間を `rem` で書くと境目で狙いからずれる**（実サイトはそのために `-0.0175rem` と `-0.0171428571rem` を書き分けている）。

### タッチターゲット

- 下層ローカルナビ `18px 20px`、一覧ボタン `16px 12px 16px 20px` ＝ 高さ 48px 前後を確保

### フォントサイズの調整

- 本文は 16px → 12px（`<p>`）、見出しは 40px → 32px。**ルートが 0.875 倍になるぶんに加えて、要素側でも段を落としている**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
和文フォント: Noto Sans JP（自社ホスト配信・400/500 の 2 段）
欧文フォント: Roboto 400/500 ＋ Roboto SemiBold 600（別ファミリー）
フォールバック: YuGothic, 游ゴシック, Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo, sans-serif
ルート: html 16px（≥768px）/ 14px（≤767px）
本文: 14px / line-height 1.8
行間: body 1.75（無単位）
字間: 和文 0.1em ／ 欧文 -0.02em（符号が逆）
palt: body に 1 行（実測 1563 要素・-12.2%）
文字色: #000000（本文）/ #7b7b7b（補足）/ #ffffff（暗い面）
面: #ffffff / #f4f6f6 / #e8e8e4 / #242424 / #464646
角丸: 4px
影: 使わない
最大幅: 1440px（外）/ 1360px（内）/ 823px（本文）
gap: 20px
```

### プロンプト例

```
MTG のコーポレートサイト（https://www.mtg.gr.jp/）の DESIGN.md に従って、
ブランド一覧セクションを作ってください。

- 和文は Noto Sans JP、欧文は Roboto。weight は 400 と 500 だけ使う
- 英語の見出し（40px）には letter-spacing: -0.02em、
  和文のラベル（14px）には letter-spacing: 0.1em を当てる
- body に font-feature-settings: "palt" と line-height: 1.75 を書く
- 色は無彩色だけ。面は #ffffff と #f4f6f6、文字は #000000 と #7b7b7b
- カードの角丸は 4px、box-shadow は付けない
- コンテナは 1360px、gap は 20px
- 767px 以下で html の font-size を 14px に落とす
```
