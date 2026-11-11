# DESIGN.md — 京都芸術大学（Kyoto University of the Arts）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-11 / 対象: `https://www.kyoto-art.ac.jp/`, `/info/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地（`#f4f4f4`）に黒文字、面は炭色（`#2c2c2c`）。装飾色はティール `#00a2b5` の 1 色だけ。影を一切使わず（実測 `box-shadow` **0 種**）、角丸も 3.75px と 11.25px の 2 段しかない。美大のサイトでありながら、紙面としては極端に禁欲的
- **密度**: 中。学科 20 以上・入試区分・イベント告知を抱える情報量の多いサイトだが、本文の行間を `1.75` で通し、字間は `palt` だけで詰めて、詰め込み感を出さない
- **キーワード**: Noto Sans JP 一本、palt 全面適用、1rem = 100px、流体ルート、影ゼロ

**このサイトの核心は4つある。**

1. **`1rem` が 100px になるように `html` の `font-size` を作っている。** CSS には `font-size: 0.18rem`（= 18px）`0.14rem`（= 14px）のように **「px の値を 1/100 にした rem」**が並ぶ（実測 `0.09rem`〜`0.43rem` の 20 段以上）。`html` 側は 4 段階で切り替わり、**デスクトップは設計幅 1536px、モバイルは設計幅 414px でちょうど 100px に着地する**（§8）
2. **`body` に 1 行だけ書いた `font-feature-settings: "palt"` が 1303 要素へ継承されている。** `letter-spacing` は `body` で **`0px` と明示**され（`normal` ではない）、可視 176 要素中 155 要素が字間ゼロ。**詰めるのは `palt` だけ、空けるのはナビと大見出しだけ**という単純な二択
3. **本文のウェイトが 500。** 実測で最多のウェイトは **500（トップ 112 要素 / 下層 136 要素）**で、400 はグローバルナビの上段など補助的な位置にしかない。**400 を既定にすると実サイトより一段細く出る**
4. **ヒーローの大きなコピー「Actually, 実は、」はテキストではなく SVG 画像**（`img/title_mv.svg` 356×120px、`alt="Actually, 実は、"`）。`distributions.fontFamily` に該当する大きな欧文も和文も 1 要素も出ない

**CSS Custom Properties は実質ゼロ**（実測 4 個のうち 2 個は Swiper の既定値、自社は `--winWidth` と `--pickupSliderFuration` の 2 個だけ。後者の綴りは実サイトのまま）。**デザイントークンの体系は持っていない。** 値はすべて CSS に直書きされている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Teal（通信教育部）** | **`#00a2b5`** | **面として 9 要素**。`通信教育部TOP` `芸術教養学科` `文化コンテンツ創造学科` のラベル。**通学部＝黒、通信教育部＝ティールで学部を色分けする**のがこのサイト唯一の色の使い方 |
| **Charcoal（面）** | **`#2c2c2c`** | **面として 25〜29 要素**（最多）。フッター、学科一覧の面、ヘッダーのモーダル。黒（`#000000`）とは別に使い分ける |
| **Black（面・文字）** | **`#000000`** | 文字色として**可視 137 要素**、面として `TOP` `通学部TOP` のラベル。本文は純黒 |

> **`#2c2c2c` と `#000000` は役割が違う。** 面として広く敷くのが `#2c2c2c`、文字と小さなラベルの塗りが `#000000`。**どちらかに統一しない。**

### Semantic（意味的な色）

このサイトには success / warning / error の色が**存在しない**（実測 0 要素）。状態はすべて面の明度差（`#f4f4f4` / `#dddddd` / `#b0b0ad`）で表す。

### Neutral（ニュートラル）

- **Page Background** (`#f4f4f4`): ページの地色。**面として 10〜13 要素**。`body` に宣言。**白（`#ffffff`）ではない**
- **Text Primary** (`#000000`): 本文・見出し。**可視 130〜137 要素**
- **Text on Dark** (`#ffffff`): `#2c2c2c` 面の上のテキスト（**可視 26〜27 要素**）
- **Text Secondary** (`#2c2c2c`): リード文・セクション見出し（可視 8〜19 要素）
- **Text Muted** (`#b3b3b3`): 日付（`2026.11.10` 等。可視 5 要素）
- **Text Note** (`#6e6e6e`): 注記・`※`（可視 2 要素）
- **Surface Warm Gray** (`#b0b0ad`): NEWS セクションの地（1440×686px の面）。**わずかに緑に寄った灰**で、純グレーではない
- **Surface Gray** (`#dddddd`): 瓜生山学園セクションの地
- **Surface White** (`#fcfcfc`): 検索モーダルの面

> **ヒーローの背後に `rgba(0,0,0,0.7)` の全面オーバーレイ（1454×909px）があるが `opacity: 0` で不可視。** 検索モーダルの背面で、ページの地色ではない。**計測で面積 1 位に出るので取り違えないこと。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP 一本**（Google Fonts）。可視 159 要素、両ページとも最多
- **`document.fonts` で `loaded` なのは 300 / 400 / 500 / 700 の 4 ウェイト。900 は宣言だけで未使用**（`unloaded`）
- Google Fonts の URL は `family=Noto+Sans+JP:wght@300;400;500;700;900` なので 900 も配信対象ではあるが、**実際に当たっている要素が 1 つも無い**
- フォント要求は**全 47 件**（Noto Sans JP の unicode-range サブセットが大半）

### 3.2 欧文フォント

- **Lato**（Google Fonts）。**日付・数値・ラベル専用**（可視 4〜6 要素）。`NEWS` `2026.11.08` `23,720` `10` `24`
- `loaded` は **400 / 700 のみ**。`wght@400;700;900` のうち **900 は `unloaded`**
- **Graduate は宣言だけで 1 要素も使っていない**（`unloaded`・フォント要求 0 件）
- **多言語の受け皿として Noto Sans KR / SC / TC の 500 を読み込んでいる。** 用途は言語切替の `한국어` `简体字` `繁体字` の **3 ラベル（各 1 要素）だけ**。3 要素のために和文以外の CJK Web フォントを 3 ファミリー読む構成

### 3.3 font-family 指定

```css
/* 和文・欧文とも既定 */
body {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 180%;            /* = 0.18rem = 18px at design width */
  letter-spacing: 0px;        /* normal ではなく 0px と明示 */
  font-feature-settings: "palt";
}

/* 数値・日付・英字ラベルだけ Lato に差し替え、同時に palt を解除する */
.articleList__label,
.eventList__label,
.borderBlock__dl .number {
  font-family: Lato, sans-serif;
  font-feature-settings: initial;   /* ← body から継承した palt を打ち消す */
}

/* 言語切替ラベル */
.lang-kr { font-family: "Noto Sans KR", sans-serif; font-weight: 500; }
.lang-sc { font-family: "Noto Sans SC", sans-serif; font-weight: 500; }
.lang-tc { font-family: "Noto Sans TC", sans-serif; font-weight: 500; }
```

- **フォールバックは `sans-serif` の 1 段だけ。** ヒラギノも游ゴシックも書かない。Noto Sans JP が落ちたら OS 既定に落ちる割り切り
- **ロゴとサイト名は `Arial`（可視 10 要素）。** `京都芸術大学` `学校法人瓜生山学園` という文字列だが、実体は `logo_headerText.svg` の代替テキストで、**画面には出ない**。`font-family` の分布に Arial が出ても、それを「欧文の指定」と読まないこと

### 3.4 文字サイズ・ウェイト階層

**CSS では `rem` で書く（1rem = 100px 相当）。下表の px は設計幅（デスクトップ 1536px / モバイル 414px）での値。** 括弧内は 1440px 実測。

| 用途 | 宣言 | 設計幅での px | 1440px 実測 | weight | 実測件数 |
|------|------|---------------|-------------|--------|----------|
| 下層ページの大見出し | `0.43rem` | 43px | 40.3125px | 700 | 1 |
| 数値の強調（Lato） | `0.3rem` | 30px | 28.125px | 700 | 5 |
| セクション見出し | `0.21rem` | 21px | 19.6875px | 500 | 8〜10 |
| **本文** | **`0.18rem`** | **18px** | **16.875px** | **500** | 9〜32 |
| グローバルナビ | `0.16rem` | 16px | 15px | 500 | 17〜42 |
| 補助テキスト・リンク | `0.14rem` | 14px | 13.125px | 500 | **92〜100（最多）** |
| 日付（Lato） | `0.13rem` | 13px | 12.1875px | 400 | 5 |
| ラベル | `0.12rem` | 12px | 11.25px | 500 | 6〜8 |
| 注記 | `0.1rem` | 10px | 9.375px | 400 | 3 |

- **ウェイトは 400 / 500 / 700 の 3 段。** 実測の最多は **500**（112〜136 要素）、次が 400（29〜48）、700（13〜16）
- **300 は読み込んでいるが可視 0 要素。** 書かないこと
- **900 は書かない**（`unloaded` なのでブラウザの合成太字になる）

### 3.5 行間・字間

- **`line-height` は無単位比率で既定 `1.75`。** 可視要素の最多（トップ 122 / 下層 111 要素）。`body` に 1 行書いて継承させる
- 次に多いのが `1.5`（18〜31 要素。バナーのキャプション・リード文）、`1.0`（6〜17 要素。2 行のナビラベル）
- **`letter-spacing` は `body` で `0px`。** 可視 176 要素中 155 要素が字間ゼロ。**`palt` が効いているので、見た目は字間ゼロでも約物は詰まる**
- 字間を**空ける**のは次の 3 か所だけ:

| 箇所 | 宣言 | 1440px 実測 |
|------|------|-------------|
| グローバルナビのリンク | `letter-spacing: 0.1em` | 1.5px |
| 下層ページの大見出し | `letter-spacing: 0.1em` | 4.03125px |
| Lato の数値 | `letter-spacing: 0.04em` / `0.05em` | 1.40625px / 0.75px |

- **`letter-spacing: 0.02ex` という宣言が 2 か所ある**（`.eventArticleinfo__term` / `.eventArticleinfo__time`）。`ex` は書体の x-height 基準の単位で、**書体を替えると字間が変わる**。真似しないこと
- 一覧のラベルに `letter-spacing: -0.75px`（= `-0.05em` 相当）の**負の字間**が 4 要素ある

### 3.6 禁則処理・改行ルール

- **`body` の `word-break` は `normal`。** `break-all` も `auto-phrase` も使っていない。日本語の既定の禁則にまかせる
- **改行位置を制御したい箇所は、要素を分けるか `<br>` で切る**（実サイトのセクション見出しがこの作り）
- 行頭・行末の約物は `palt` が効いているため、`normal` のままでも詰まって見える

### 3.7 OpenType 機能

```css
body { font-feature-settings: "palt"; }      /* → 1303 要素に継承 */
.articleList__label { font-feature-settings: initial; }   /* → 195 要素で解除 */
```

- **`palt` は `body` に 1 行だけ。** 実測 **1303 要素**（全要素の 87%）
- **解除は `initial` で行う**（実測 195 要素が `normal`）。**Lato で数字を組む要素がその中心**で、欧文のプロポーショナルを `palt` で壊さないための措置
- **`halt` / `pkna` / `tnum` は 1 要素も使っていない**
- `palt` は Noto Sans JP に実テーブルがあり、**実際に効いている**（`letter-spacing` が 0 のままでも約物が詰まる）

### 3.8 縦書き

- **使用なし。** `writing-mode` が `horizontal-tb` 以外の要素は**両ページとも 0 件**
- 美大のサイトだが縦組みを一切使わない。**縦書きを足すと別物になる**

---

## 4. Component Stylings

### Buttons

実測で面を持つボタン／ラベルは **2 系統しかない。**

```css
/* 学部ラベル（ピル） — 通学部は黒、通信教育部はティール */
.-topLabel {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 0.12rem;              /* 11.25px @1440 */
  font-weight: 500;
  line-height: 0.21rem;            /* 19.6875px @1440 */
  letter-spacing: normal;
  color: #ffffff;
  background-color: #000000;       /* 通信教育部は #00a2b5 */
  border-radius: 0.12rem;          /* 11.25px @1440 */
  border: none;
  box-shadow: none;
  font-feature-settings: "palt";
  padding: 0.01rem 0.115rem 0.02rem;  /* 0.9375px 10.7812px 1.875px @1440 */
}

/* 一覧への導線（ピル・枠線） */
.listLink {
  font-size: 0.14rem;
  border-radius: 0.32rem;          /* 30px @1440 */
  border: 1px solid currentColor;
  background: transparent;
}

/* 黒面のボタン（フッター） */
.footerTop__button {
  font-size: 0.14rem;
  color: #ffffff;
  background-color: #000000;
  border: 1px solid #000000;
  border-radius: 0.04rem;          /* 3.75px @1440 */
}
```

- **`box-shadow` は 1 つも無い**（両ページとも 0 種）。浮かせない
- **padding も rem で書く。** 上下非対称（`0.01rem` / `0.02rem`）なのは実サイトの実装のまま

### Inputs

- `input { padding: 0; border: none; border-radius: 0; }` でリセットしてから個別に当てる
- ラジオ／チェックは `::before` を `border-radius: 50%` / `1px solid #cccccc` で描く
- **フォーカスリングは独自指定なし**（UA 既定のまま）

### Cards

- カードは**面を持たず、サムネイル画像＋テキストだけ**で構成する
- 角丸は `0.04rem`（3.75px @1440・**実測 42〜47 要素で最多**）
- 記事一覧のサムネイルに `linear-gradient(rgba(0,0,0,0) 0px, #ffffff 0px)` が当たっている（停止位置が両方 `0px` なので**実質ただの白面**。実サイトのままだが真似しなくてよい）

---

## 5. Layout Principles

### Spacing Scale

**余白も `rem`。** 1rem = 100px 相当なので、CSS の数値はそのまま「設計上の px ÷ 100」になる。

| 宣言 | 設計幅での px | 1440px 実測 | 用途 |
|------|---------------|-------------|------|
| `0.12rem` | 12px | 11.25px | ラベル間 |
| `0.2rem` | 20px | 18.75px | カード列の gap（横） |
| `0.3rem` | 30px | 28.125px | カード列の gap（横・最多） |
| `0.35rem` | 35px | 32.8125px | 大きいグリッドの gap（横） |
| `0.4rem` | 40px | 37.5px | カード列の gap（縦・最多） |
| `0.52rem` | 52px | 48.75px | セクション間 |

実測の `gap` は `37.5px 28.125px`（5 件）、`37.5px 18.75px`、`48.75px 32.8125px`、`0px 39.375px`、`30px 37.5px`。**縦 40px / 横 30px が基本**。

### Container

- **`max-width: 1440px`**（実測 7〜10 要素で最多）
- 記事本文は `1185px`
- **`--winWidth: calc(100vw - 0px)`** という変数があり、スクロールバー幅を引く前提で書かれている（実測は `- 0px`）

### Grid

- 学科一覧・記事一覧とも CSS Grid。`gap` は上表のとおり
- **`container` も `gap` も `radius` もすべて rem なので、画面幅に比例して全部が縮む**（§8）

---

## 6. Depth & Elevation

- **`box-shadow` は両ページとも 0 種。影を一切使わない**
- **`filter: drop-shadow()` も使っていない**（ヒーローの白文字は SVG 画像に焼き込み済みなので影が要らない）
- 階層は**面の明度差だけ**で表す: `#f4f4f4`（地） → `#ffffff` / `#fcfcfc`（上位） → `#dddddd` → `#b0b0ad` → `#2c2c2c` → `#000000`
- 角丸は **`0.04rem`（3.75px）/ `0.12rem`（11.25px）/ `0.32rem`（30px）の 3 段**。`0.32rem` はピル型の導線専用

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html` の `font-size` を 4 段で切り替え、`1rem = 100px` 相当にする**（§8 の表をそのまま使う）。サイズ・余白・角丸はすべて `rem` で書く
- **`body` に `font-feature-settings: "palt"` を 1 行だけ書き、全体に継承させる**
- **欧文・数値を組む要素では `font-feature-settings: initial` で `palt` を解除する**
- **本文のウェイトは 500**。見出しは 700、補助は 400
- **`line-height: 1.75` を `body` に 1 回だけ書く**（無単位）
- 学部の区別は **黒（通学部）／ `#00a2b5`（通信教育部）** で付ける
- ページの地は **`#f4f4f4`**。白ではない

### Don't（禁止）

- **`box-shadow` を足さない**（実測 0 種）。影で階層を作らない
- **`font-weight: 900` を書かない**（`unloaded`。合成太字になる）
- **`font-weight: 300` を書かない**（読み込んでいるが可視 0 要素）
- **Graduate を使わない**（宣言だけで 1 要素も使っていない）
- **`letter-spacing` を `em` で各要素に配らない。** 既定は `body` の `0px`。空けるのはナビと大見出し（`0.1em`）、Lato の数値（`0.04em` / `0.05em`）だけ
- **`letter-spacing: 0.02ex` を真似しない**（書体依存で値が動く）
- **縦組みを実装しない**（実測 0 要素）
- **ヒーローの大見出しを Web フォントで実装しない。** 実サイトは SVG（`title_mv.svg`）。同じ字詰めはテキストでは再現できない
- **`px` を直書きしない。** 1 か所でも px を混ぜると、画面幅が変わったときにそこだけ取り残される
- **CSS Custom Properties でトークン体系を作っていない前提で読む。** 実サイトの 4 個のうち 2 個は Swiper、残りは `--winWidth` と `--pickupSliderFuration` だけ

---

## 8. Responsive Behavior

### Breakpoints

実測で最も多いのは `screen and (max-width: 767px)`（**1836 件**）と `screen and (min-width: 768px), print`（**1568 件**）。**768 / 767px の 1 本が主役**で、ほかに 1200px と 1536px の境目がある。

### ルートの `font-size`（4 段階）

```css
html { font-size: 625%; }                               /* ≥1536px → 100px */
@media (max-width: 1535px) { html { font-size: 6.51042vw; } }   /* = 100vw / 15.36 */
@media (max-width: 1200px) { html { font-size: 488.281%; } }    /* → 78.125px 固定 */
@media (max-width:  767px) { html { font-size: 24.1546vw; } }   /* = 100vw / 4.14 */
```

| 画面幅 | `html` | `body` | 本文 `0.14rem` |
|--------|--------|--------|----------------|
| 1920px | 100px | 18px | 14px |
| 1600px | 100px | 18px | 14px |
| **1536px（PC 設計幅）** | **100px** | **18px** | **14px** |
| 1440px | 93.75px | 16.875px | 13.125px |
| 1280px | 83.3333px | 15px | 11.67px |
| 1200px | 78.125px | 14.0625px | 10.94px |
| 1024px | 78.125px | 14.0625px | 10.94px |
| 834px | 78.125px | 14.0625px | 10.94px |
| **768px** | **78.125px** | **14.0625px** | **10.94px** |
| **767px** | **185.266px** | **29.6425px** | **25.94px** |
| **414px（SP 設計幅）** | **100px** | **16px** | **14px** |
| 390px | 94.2029px | 15.0725px | 13.19px |
| 375px | 90.5797px | 14.4928px | 12.68px |

- **768px → 767px で `html` が 78.125px → 185.266px に跳ぶ（2.37 倍）。** デスクトップの最小と、モバイルの最大が隣り合っている
- **1200px〜768px はルートが 78.125px で固定**（下限クランプ）。この帯では本文が 10.94px まで縮んだまま動かない
- **デスクトップの設計幅は 1536px、モバイルの設計幅は 414px。** どちらも `1rem = 100px` に着地する
- **モバイル側には上限が無い。** 767px では `html` が 185px になるが、すべてが `rem` なので比率は保たれる

### タッチターゲット

- 学部ラベルのピルは 11.25px の文字に `padding` が上下 1〜2px しかない。**タップ領域は親の `<a>` が持つ**
- ナビのリンクは `padding: 0.07rem 0.2rem 0.22rem`（モバイル）で縦 40px 前後を確保

### フォントサイズの調整

- **メディアクエリでフォントサイズを書き直さない。** ルートが動くので全部が追従する
- 字間だけはモバイルで明示的に変わる箇所がある（ナビ `0.1em` は据え置き）

---

## 9. Agent Prompt Guide

### クイックリファレンス

| 項目 | 値 |
|------|-----|
| 和文フォント | `"Noto Sans JP", sans-serif`（300/400/500/700 が `loaded`） |
| 欧文フォント | `Lato, sans-serif`（400/700。数値・日付専用） |
| 本文サイズ | `0.18rem`（= 18px at 設計幅 1536px / 16.875px @1440px） |
| 本文ウェイト | **500** |
| 行間 | `1.75`（無単位・`body` に 1 回） |
| 字間 | `0px`（`body`）。空けるのはナビと大見出しの `0.1em` だけ |
| OpenType | `font-feature-settings: "palt"` を `body` に 1 回（1303 要素） |
| ページ背景 | `#f4f4f4` |
| 本文色 | `#000000` |
| 面色 | `#2c2c2c` |
| アクセント | `#00a2b5`（通信教育部） |
| 角丸 | `0.04rem` / `0.12rem` / `0.32rem` |
| 影 | **なし** |
| コンテナ | `max-width: 1440px` |
| ルート | 4 段階の流体。`1rem = 100px`（設計幅 PC 1536px / SP 414px） |

### プロンプト例

```
京都芸術大学のスタイルで大学のお知らせ一覧ページを作ってください。

- html の font-size を 4 段で切り替え、1rem = 100px 相当にする
  （≥1536px: 625% / ≤1535px: 6.51042vw / ≤1200px: 488.281% / ≤767px: 24.1546vw）
- フォントサイズ・余白・角丸はすべて rem で書く（px を直書きしない）
- font-family: "Noto Sans JP", sans-serif。本文は font-weight: 500
- body に font-feature-settings: "palt" と letter-spacing: 0px と line-height: 1.75 を書く
- 日付と件数は Lato で組み、その要素だけ font-feature-settings: initial で palt を解除する
- 背景 #f4f4f4、本文 #000000、面 #2c2c2c、ラベルのアクセントは #00a2b5
- box-shadow は使わない。角丸は 0.04rem（カード）と 0.32rem（一覧への導線のピル）
- コンテナは max-width: 1440px
- 縦書きは使わない
```

### 注意点

- **`font-weight: 900` と `300` は書かない**（900 は `unloaded`、300 は可視 0 要素）
- **Graduate は宣言だけで未使用。**代替を探す必要はない
- **大見出しをテキストで作る場合、実サイトと同じ字面にはならない**（実サイトは SVG 画像）
- 1 か所でも `px` を直書きすると、画面幅が変わったときそこだけ取り残される
- `letter-spacing: 0.02ex` と `--pickupSliderFuration`（綴り）は実サイトのままだが、**新規実装では `em` と正しい綴りを使う**
