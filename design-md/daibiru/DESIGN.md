# DESIGN.md — ダイビル（DAIBIRU）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-21 / 対象: `https://www.daibiru.co.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **`html { font-size: 1px }` で「1rem = 1px」にし、CSS の数値をすべて `rem` で書く。** 色は紺（`#21303C`）と青（`#005FCE`）の 2 本立て、和文は YakuHanJP ＋ Noto Sans JP、欧文の大見出しだけ Barlow の極細（weight 200）
- **密度**: 中。コンテンツ幅 1200px を基本に、約物を詰めて 16px の本文をゆったり置く
- **キーワード**: 1rem = 1px、YakuHanJP、Barlow 200、紺と青、line-height: 1 が既定

**このサイトの核心は4つある。**

1. **`html { font-size: 1px }`。** `body { font-size: 16rem }` ＝ 16px、見出しは `50rem` ＝ 50px。**px の値をそのまま `rem` で書く**ための仕掛けで、19 幅（1920〜320px）すべてで 1px から動かない。`rem` を 16px 前提で読むと全部 16 倍になるので、**このサイトの CSS を読むときは必ずルートを確認する**
2. **和文は YakuHanJP と Noto Sans JP の 2 層。** CDP の `CSS.getPlatformFontsForNode` で「知る、ダイビル」を調べると、**読点 `、` の 1 文字だけが `Yaku Han JP Medium`、残り 6 文字が `Noto Sans JP`**。約物だけサブセットフォントに逃がす設計が実際に機能していることまで確認できる
3. **`body { line-height: 1; letter-spacing: 0 }`。** 行間 1 が全子孫の既定で、必要な箇所だけ `1.35` / `1.5` / `1.75` / `2` を宣言し直す。**本文ブロックで宣言を忘れると行が潰れる**
4. **ヒーローは three.js の `<canvas>`（2020×1405・`data-engine="three.js r153"`）。** 「BUILD NEXT.」は **`mv_logo.svg`（529×49・`alt="BUILD NEXT"`）の画像**で、その下の「ビルを造り、街を創り、時代を拓く」だけが実テキスト

CSS Custom Properties は **22 個**（自社 20 ／ Swiper 由来 2）。`font-feature-settings` は 0 要素、縦組みも 0 要素。

---

## 2. Color Palette & Roles

### Design Tokens（`:root` の宣言）

```css
--font_family: YakuHanJP, 'Noto Sans JP', sans-serif;
--font_family_en: 'Inter', sans-serif;      /* ← 可視 0 要素。Inter は読み込みもない */
--font_barlow: Barlow, sans-serif;

--white: #fff;          --black: #000;          /* 6 桁では #ffffff / #000000 */
--blue: #005FCE;        --blue_light: #00B2F0;    --blue_dark: #21303C;
--blue_grade_x: linear-gradient(to right, #005bd8 0%, #00b7fa 100%);
--blue_grade_y: linear-gradient(to bottom, #005bd8 0%, #00b7fa 100%);
--red: #A80024;         --gold: #90712B;
--gray: #90989E;        --gray_light: #F4F4F4;
--gray_dark: #4B4B4B;   --gray_line: #ccc;      /* 6 桁では #cccccc */

--header_h: 100px;      /* モバイルで 70px に上書き */
--max_w: 1000px;
--easing: cubic-bezier(.8, 0, .4, 1);
--border_radius: 6px;
```

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **ダイビル紺** | **`#21303C`**（`--blue_dark`） | **面として 488 要素・最多**。ナビの地、カードの帯、フッター |
| **ダイビル青** | **`#005FCE`**（`--blue`） | 面 114 要素 ／ 文字 42 要素。リンク、`JP` の選択状態、アイコン |
| グラデーション（実装） | `linear-gradient(to right, #002089 0%, #0069d3 100%)` | **CTA とセクション見出しの地**（トップ 2 ／ 下層 11 要素） |
| グラデーション（別） | `linear-gradient(to right, #004cb4 0%, #00abea 100%)` | 下層の見出しに 1 要素 |

> **`--blue_grade_x` は宣言 `#005bd8 → #00b7fa` だが、実装されているグラデーションは `#002089 → #0069d3`。** 可視要素で宣言どおりの値は 1 つも出ない。**トークンの値をそのまま書き写さず、実装側を使う。**

### Neutral（ニュートラル）

- **Text Primary** (`#4B4B4B` ＝ `--gray_dark`): `body` の既定（可視 5 ／ 下層 19 要素）
- **Text Black** (`#000000`): 見出し・ナビ（可視 40 ／ 30 要素）
- **Text Muted** (`#90989E` ＝ `--gray`): サブ導線（可視 29 要素・両ページ同数）
- **Surface Light** (`#F4F4F4` ＝ `--gray_light`): 表・カードの地
- **Line** (`#cccccc` ＝ `--gray_line`): 罫線
- **Background** (`#ffffff` ＝ `--white`): ページ背景

### 宣言はあるが使われていない色

`--blue_light` (`#00B2F0`) / `--red` (`#A80024`) / `--gold` (`#90712B`) は**両ページとも可視 0 要素**。`--blue_grade_x` / `--blue_grade_y` も同様。

---

## 3. Typography Rules

### 3.1 和文フォント

- **約物**: **YakuHanJP**（jsDelivr の `yakuhanjp@4.1.1` から配信。9 ウェイト宣言、トップで 200/400/500/700 が `loaded`、下層で 400/500/700）
- **本文**: **Noto Sans JP**（Google Fonts の**可変フォント** `wght@100..900`）

YakuHanJP は「、。「」（）」などの約物だけを持つサブセットで、スタックの先頭に置いて**約物の余白だけ詰める**。和文の本体は 2 番目の Noto Sans JP が受ける。

### 3.2 欧文フォント

- **Barlow**（Google Fonts `wght@200;300;400;500;600;700`）。大見出しの `News` / `Properties` / `Project Story` が **weight 200**、地名ラベル（`OSAKA` `TOKYO` `VIETNAM`）が **weight 700**
- **Inter は宣言だけ。** `--font_family_en: 'Inter', sans-serif` は CSS にあるが、`@font-face` も読み込みも無く、**この変数を使った可視要素が 0**

### 3.3 font-family 指定

```css
/* 本文（--font_family） */
font-family: YakuHanJP, 'Noto Sans JP', sans-serif;

/* 欧文の見出し（--font_barlow） */
font-family: Barlow, sans-serif;
```

**実サイトの注意（並記）**: `--font_family_en: 'Inter', sans-serif` は**フォントを調達していない**ので、仮にこの変数を使えば `sans-serif` に落ちる。**新規実装では使わないか、Inter を読み込む。**

### 3.4 文字サイズ・ウェイト階層

**ルートは `html { font-size: 1px }`。** CSS の `16rem` は 16px、`50rem` は 50px を意味する。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (EN) | **Barlow** | **70px** (`70rem`) | **200** | 1.00 | normal | `News` `Properties` |
| Display 2 (EN) | Barlow | 68px | 200 | 1.00 | normal | `Project Story` |
| Page Title | Noto Sans JP | **50px** | 700 | 1.35 | **5px (0.1em)** | `知る、ダイビル`（下層） |
| Heading | Noto Sans JP | 26px | 500 | 1.50 | **2.6px (0.1em)** | `良い街を創るために「ダイビルのビル造り」` |
| Sub Heading | Noto Sans JP | 22px | 700 | 1.35 | normal | |
| Label (EN) | Barlow | 22px | 700 | 1.35 | normal | `OSAKA` `VIETNAM` |
| Nav / Lead | Noto Sans JP | **18px** | 500 / 700 | 1.35 | **2.4px / 2px** | |
| Body | Noto Sans JP | **16px** | 500 | 1.50 | normal | 既定（可視 38 要素・最多） |
| Caption | Noto Sans JP | 14px | 500 | 1.35 | **1.4px (0.1em)** | `データセンター` `財務` |
| Small | Noto Sans JP | 12px | 400 | 1.00 | normal | `JP` `EN`、パンくず（31 要素） |

ウェイトは **200 / 400 / 500 / 700** の 4 段。**既定は 500**（可視 76 要素・最多）で、400 ではない。

> Noto Sans JP は `wght@100..900` の**可変フォント**なので、300 や 600 を当てても出る（丸めは起きない）。ただし設計上は上の 4 段しか使っていない。Barlow は `200;300;400;500;600;700` の 6 本なので、**900 を当てると 700 で出る**。

### 3.5 行間・字間

```css
body {
  line-height: 1;       /* ← 全子孫の既定 */
  letter-spacing: 0;    /* ← 全子孫の既定 */
}
```

- **`line-height: 1` が既定**。実測でも比率 1.00 が 38 要素（下層 43 要素で最多）。宣言し直すのは `1.35`（49 要素・カードと見出し）/ `1.5`（41 要素・本文）/ `1.75` / `2`（読み物）
- **`letter-spacing: 0` が既定**で、`normal` が 135/143 要素。空けるのは **`0.015em` / `0.035em` / `0.05em` / `0.1em` / `0.5em`** の 5 段だけ
- 実測の字間: 50px → **5px**（0.1em）／ 26px → 2.6px（0.1em）／ 18px → 2.4px・2px ／ 14px → 1.4px（0.1em）。**サイズに比例して px が変わる ＝ 各要素が `em` を持っている**（`body` からの px 継承ではない）

> **本文ブロックには必ず `line-height` を宣言する。** 既定の 1 が降りると行が潰れる。

**実サイトの誤り**: `letter-spacing: 1.5`（単位なし）という宣言が 1 つある。`letter-spacing` に単位なしの数値は無効なので、**その宣言は効いていない**。`1.5px` か `0.1em` のつもりだったと思われる。

### 3.6 禁則処理・改行ルール

```css
body {
  overflow-wrap: normal;   /* 長い URL でも折らない */
  word-break: normal;      /* 19 幅すべて normal */
}
```

### 3.7 OpenType 機能

**`font-feature-settings` は 1 要素も使っていない**（両ページとも 0 件）。

実測（実スタック `YakuHanJP, "Noto Sans JP", sans-serif`・40px）でも `normal` 1066.63px → `"palt"` 1056.73px ＝ **−0.93%** と、ほとんど効かない。**YakuHanJP が先に約物を詰めているので `palt` の余地が小さい**ためで、約物を詰める役目は YakuHanJP が果たしている。

### 3.8 縦書き

使わない（両ページとも 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（グラデーションの CTA）**
- Background: `linear-gradient(to right, #002089 0%, #0069d3 100%)`
- Text: `#ffffff` / Radius: **6px**（`--border_radius`）/ 18px / 700
- 例: `知る、ダイビル` `プロジェクトストーリーを見る`

**Language toggle**
- Background: `#005FCE`（選択側）/ Text: `#ffffff` / **Radius: `1440px`**（完全なピル）/ 12px

### Cards

| 用途 | Radius | 実測 |
|---|---|---|
| 物件カード（上辺だけ丸める） | **`10px 10px 0 0`** | 22 要素 |
| 汎用 | **`6px`**（`--border_radius`） | 17 要素 |
| 画像タイル | `10px` | 12 要素 |
| アイコン・丸ボタン | `50%` | 12 要素 |
| ピル | `1440px` | 5〜11 要素 |

> **`--border_radius: 6px` というトークンがあるのに、実装は 5 種類に分かれる。** 物件カードの `10px 10px 0 0`（上辺だけ）がこのサイトらしい形。

### Header

- 高さは `--header_h: 100px`（モバイルで `70px` に上書き）

---

## 5. Layout Principles

### Container

| 用途 | Max Width | 実測 |
|---|---|---|
| **既定** | **1200px** | 6 要素（両ページ） |
| 本文 | 1080px | 5 要素 |
| 下層のワイド | 1360px | 5 要素（下層） |
| 全幅ブロック | 1440px / 1600px | 各 1 要素 |
| （宣言） | `--max_w: 1000px` | トークンとしては 1000px |

### Easing

```css
--easing: cubic-bezier(.8, 0, .4, 1);   /* 立ち上がりが遅く、終わりが速い */
```

アニメーションはこの 1 本で統一する。

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。自社の要素は影を使わない** |

> 実測で出る `rgba(0, 0, 0, 0.3) 0px 30px 70px 0px` は **Cookiebot（同意バナー）由来の 1 要素**で、サイト本体の影ではない。**影は 0 種と読む。**

奥行きは影ではなく**紺（`#21303C`）の面**と**青のグラデーション**で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 1px }` を前提に、サイズ・余白を `rem` で「px の数値そのまま」書く**（16px → `16rem`）
- **和文は `YakuHanJP, 'Noto Sans JP', sans-serif`。** 約物の詰めは YakuHanJP に任せる
- 欧文の大見出しは **Barlow の weight 200**、ラベルは **weight 700**
- **`body` に `line-height: 1; letter-spacing: 0`** を置き、必要な要素だけ宣言し直す
- 本文ブロックには必ず `line-height: 1.5`（カードは `1.35`、読み物は `2`）を書く
- 字間は **`0.1em`** が基本（大見出しから 14px のラベルまで同じ比率）
- 面は紺 `#21303C`、リンクと強調は青 `#005FCE`、CTA は `linear-gradient(to right, #002089 0%, #0069d3 100%)`
- 角丸は `--border_radius: 6px`、物件カードだけ `10px 10px 0 0`
- **影を使わない**

### Don't（禁止）

- **`rem` を 16px 基準で読み替えない。** このサイトの `1rem` は **1px**
- **「BUILD NEXT.」を Web フォントで組まない。** 実サイトは `mv_logo.svg`（529×49）の画像。ヒーローの背景も three.js の `<canvas>`（2020×1405）
- **`--font_family_en`（Inter）を使わない。** フォントを調達していないので `sans-serif` に落ちる
- **`--blue_grade_x` / `--blue_grade_y` の値をそのまま使わない。** 実装のグラデーションは `#002089 → #0069d3` で別物
- **`--blue_light` / `--red` / `--gold` を「ブランドの色」として使わない**（両ページとも可視 0）
- **本文ブロックで `line-height` を省略しない**（既定の 1 が降りて行が潰れる）
- **`letter-spacing` に単位なしの数値を書かない**（実サイトに `letter-spacing: 1.5` があるが無効）
- `font-feature-settings: "palt"` を足さない（YakuHanJP と併用しても −0.93% しか動かない）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|------|-------|------|
| Wide | ≥ 1560px / ≥ 1400px | `print, screen and (min-width: 1560px)` 2 件 ／ `(min-width: 1400px)` 6 件 |
| Desktop | ≥ 1000px | **`print, screen and (min-width: 1000px)` 10 件**（最多） |
| Laptop | ≤ 1365px / ≤ 1279px / ≤ 1169px | 各 1〜2 件 |
| Tablet | ≤ 999px | 2 件 |
| Mobile | ≤ 767px | 2 件 |
| Small | ≤ 499px | 2 件 |

> メディアクエリは **`min-width` 基準（デスクトップファースト寄りの併用）**で、`print,` を併記するのが癖。

### サイズの振る舞い

**`html` 1px / `body` 16px は 1920 / 1600 / 1440 / 1366 / 1280 / 1200 / 1080 / 1024 / 992 / 991 / 834 / 768 / 767 / 750 / 480 / 414 / 390 / 375 / 320px の 19 幅すべてで動かない。** `h2` も 24px、`p` も 15px のまま。流体も `clamp()` も崖も無い。

CSS 内に `body { font-size: 14rem }` という宣言があるが、**19 幅のどれでも到達しない**（実測は全幅 16px）。

### ヘッダー

`--header_h` が 100px → 70px に切り替わる。

### タッチターゲット

言語切替（`JP` / `EN`）は `height: 22px` でモバイルも同じ。**44px 基準を満たさない。**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ルート: html { font-size: 1px }  ← 1rem = 1px（body は 16rem = 16px、全幅固定）
書体（和文）: YakuHanJP, 'Noto Sans JP', sans-serif
書体（欧文）: Barlow, sans-serif（大見出し w200 / ラベル w700）
既定:   body { line-height: 1; letter-spacing: 0; overflow-wrap: normal }
行間:   カード 1.35 / 本文 1.5 / 読み物 2.0（宣言しないと 1 が降りる）
字間:   0.1em が基本（ほかに 0.015 / 0.035 / 0.05 / 0.5em）
ウェイト: 200 / 400 / 500 / 700（既定は 500）
字詰め: palt を使わない（約物は YakuHanJP が詰める）
色:     紺 #21303C（面）／ 青 #005FCE ／ 文字 #4B4B4B・#000000・#90989E
CTA:    linear-gradient(to right, #002089 0%, #0069d3 100%)
角丸:   6px（既定）／ 物件カードは 10px 10px 0 0 ／ ピルは 1440px
影:     0 種
幅:     1200px（既定）/ 1080px（本文）/ 1360px（下層ワイド）
Easing: cubic-bezier(.8, 0, .4, 1)
ブレークポイント: 1560 / 1400 / 1000 / 999 / 767 / 499px
```

### このサイトらしさを出す指示文の例

> `html { font-size: 1px }` にして、サイズと余白は `16rem` のように px の数値をそのまま `rem` で書く。和文は `YakuHanJP, 'Noto Sans JP', sans-serif`、欧文の大見出しだけ Barlow の weight 200 で 70px。`body` に `line-height: 1; letter-spacing: 0` を置き、本文は `line-height: 1.5`、見出しは `letter-spacing: 0.1em` を宣言し直す。面は紺 `#21303C`、CTA は `linear-gradient(to right, #002089 0%, #0069d3 100%)` に角丸 6px。影は使わない。

### やってはいけない指示

> ❌「ヒーローのロゴタイプを Barlow で組んで」 → `mv_logo.svg` の画像
> ❌「欧文は Inter で」 → 変数にはあるがフォントを調達していない
> ❌「rem を使って 1.5rem の見出しに」 → このサイトでは 1.5px になる
