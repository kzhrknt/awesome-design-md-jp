# DESIGN.md — Algomatic（アルゴマティック）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-17 / 対象: `https://algomatic.jp/`, `https://algomatic.jp/about`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に**貂明朝アンチックの巨大な見出し**とノイズ入りグラデーション球を落とす。装飾は少なく、字と余白と1色の赤だけで押す
- **密度**: 低い。セクション間は `--section-padding-y: 14rem`（実測 118.6px @1440）。トップページの可視テキストは **147 要素**しかない
- **キーワード**: 貂明朝アンチック、流体 rem、Algomatic レッド、ノイズグラデ、余白過多

**このサイトの核心は4つある。**

1. **見出しはゴシックではない。貂明朝アンチック（`ten-mincho-antique`）の Bold。** ヒーローの「AIで企業のOSをつくり変える会社」は一見ヘビーゴシックだが、実測は `font-family: ten-mincho-antique` / `font-weight: 700`。仮名だけアンチック（写植の漫画書体）で肉付きがあり、漢字はゴシックに近い字面をもつ Adobe Fonts の書体。**`document.fonts` で `loaded` を確認済み**。可視 13 要素（`h1` 1・`h2` 3・`p` 9）がこの書体で、**ゴシックで代用すると別物になる**
2. **和文の本文には Web フォントを 1 本も使っていない。** 本文・UI は `游ゴシック体` 先頭の OS ローカルスタック（可視 110 要素）。Web フォントは**欧文の `nexa`（24 要素）と見出し用の貂明朝アンチック（13 要素）の 2 本だけ**
3. **`html` の `font-size` が 8.47058px。** 1440px ビューポートで `1rem = 8.47px`（= `100vw / 170`、**デザイン幅 1700px で 1rem = 10px** になる流体ルート）。**全長さが rem 宣言で viewport に連動する。** 以降この DESIGN.md では実測 px（@1440）と rem を併記する
4. **`letter-spacing` は em ではなく rem で宣言されている。** `--letter-spacing-body: .064rem`（実測 0.542117px）。**フォントサイズが変わっても字間は変わらない。** 例外はヒーローと大見出しで、ここだけ `0.08em` 相当（142.306px に 11.3845px、54.2117px に 4.33694px＝どちらもちょうど 8%）

**`font-feature-settings: "palt"` は 35 要素に効いている**（トップ）。**プロポーショナルに詰めた上で 0.08em 空ける**のが大見出しの組み方で、詰めっぱなしでも空けっぱなしでもない。

CSS Custom Properties は **28 個すべてが自社トークン**（プラットフォーム由来 0 個）。ただし後述のとおり**フォーム部品の 4 トークンだけ Tailwind slate の値が素通し**になっている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | トークン | 実装値 | 実測 |
|------|----------|--------|------|
| **Algomatic レッド** | `--color-primary` | **`#f8444d`** | **面 17 要素 / 文字 37 要素**。`Get In Touch` の丸ボタン、お問い合わせ帯、フィルタの選択状態、`Scroll Down`、セクションラベル |
| Primary Hover | `--color-primary-hover` | `#fff2f3` | ホバー時の淡い面。**静止状態では可視 0 要素** |
| Border Accent | `--color-border-accent` | `#f8444d` | Primary と同値。左端の縦罫 |

> **赤は 1 色だけ。** `#f8444d` を面にも文字にも罫にも使い回す。**2 つ目のアクセント色を足さないこと。**

### Neutral（ニュートラル）

| 役割 | トークン | 実装値 | 実測 |
|------|----------|--------|------|
| **Text Primary** | `--color-text` | **`#16171d`** | **可視 59 要素**。純黒ではなく僅かに青い黒 |
| Text Inverse | `--color-text-inverse` | `#ffffff` | 黒面・赤面の上（可視 51 要素） |
| Text Muted | `--color-text-muted` | `#585e74` | 補助テキスト。**可視分布の上位 3 色に入らない＝使用は少ない** |
| **Surface Dark** | `--color-surface-dark` | **`#16171d`** | **面 8 要素**。`私たちについて` `サービス` のボタン、暗いセクション |
| Surface Muted | `--color-surface-muted` | `#f0f1f4` | 面 4 要素。フィルタの非選択状態 |
| Surface Subtle | `--color-surface-subtle` | `#fafafc` | **可視 0 要素**（宣言のみ） |
| Surface / Background | `--color-surface` | `#ffffff` | ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`。`heroCovered: false`） |
| Border | `--color-border` | `#c5c8d3` | 区切り線 |

### Form（**別系統。Tailwind slate の素通し**）

| トークン | 実装値 | 対応 |
|----------|--------|------|
| `--color-form-text` | `#020617` | slate-950 |
| `--color-form-placeholder` | `#64748b` | slate-500 |
| `--color-form-input-border` | `#e2e8f0` | slate-200 |

> **フォーム部品だけブランドのニュートラルから外れている。** 本文の黒は `#16171d` なのに入力欄の文字は `#020617`、罫は `#c5c8d3` ではなく `#e2e8f0`。**実装の実態としてそうなっているので、既存ページに合わせるならこの 3 値を使う。新規に組むなら本体のニュートラルへ寄せてよい。**

### その他

- **ノイズ**: `--noise-opacity: .24`。グラデーション球にノイズテクスチャを 24% で重ねている。**フラットなグラデにしないこと**
- **リンクの UA 青**: `a` に `rgb(0, 0, 238)` が 1 要素ある。`font-size` がルート継承の 8.47px・`letter-spacing: normal`＝**テキストを子要素に置いた構造のリンク**であり、計測失敗ではない。実装上は問題ないが、**新規実装では `a` に色を明示すること**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（本文・UI の既定）**: **游ゴシック体**。Web フォントではなく **OS ローカル**。可視 110 要素
- **明朝体（見出し専用）**: **貂明朝アンチック（`ten-mincho-antique`, Adobe Fonts）weight 700**。可視 13 要素。**`document.fonts` で `loaded`**
- **Windows 対策**: 游ゴシックの Medium マッピングは**していない**。`游ゴシック体` → `YuGothic` → `游ゴシック` → `"Yu Gothic"` と並べるだけで、Windows では Regular（実質 Light 寄り）が当たる。**このサイトはそれを許容している**

### 3.2 欧文フォント

- **サンセリフ**: **`nexa`（Adobe Fonts）**。ナビ（`About` `Service` `News`）・セクションラベル（`Feature` `Services`）に使う。可視 24 要素
- **ウェイトは 500 と 600 が `loaded`、300 は `unloaded`。** **`font-weight: 300` を前提に組まないこと**
- 本文中の欧文・数字は游ゴシック体の欧文グリフをそのまま使う（専用指定なし）

### 3.3 font-family 指定

```css
/* 本文・UI（既定） */
--font-family-base:
  "游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic",
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP",
  Meiryo, sans-serif;

/* 欧文ラベル・ナビ */
--font-family-en: "nexa", sans-serif;

/* 見出し（ディスプレイ） */
--font-family-display:
  "ten-mincho-antique",
  "Hiragino Mincho ProN", "游明朝", "Yu Mincho", YuMincho,
  "MS PMincho", serif;
```

**フォールバックの考え方**:
- **和文優先。** 欧文を先頭に置かない
- **`Noto Sans JP` はスタックの 7 番目**。Web フォントとしては読み込まず、入っている環境の保険として置いているだけ
- **貂明朝アンチックのフォールバックは普通の明朝**（ヒラギノ明朝 → 游明朝）。**アンチック仮名は再現されないので、フォールバック時は別の印象になる前提で組む**

### 3.4 文字サイズ・ウェイト階層

実測は 1440px ビューポート（`1rem = 8.47058px`）。`rem` 列は**デザイン幅 1700px なら ×10 が px** になる。

| Role | Font | Size (実測 / rem) | Weight | Line Height | Letter Spacing | 備考 |
|------|------|-------------------|--------|-------------|----------------|------|
| **Hero (h1)** | **貂明朝アンチック** | **142.306px / 16.8rem** | **700** | **1.12** | **`0.08em`**（11.3845px） | ヒーロー2行。palt 併用 |
| Hero Accent | nexa | 166.023px / 19.6rem | 600 | 1.00 | **`-0.02em`**（-3.32047px） | 巨大な `A` `O` のみ**詰める** |
| **Section Heading (h2)** | **貂明朝アンチック** | **54.2117px / 6.4rem** | **700** | **1.32** | **`0.08em`**（4.33694px） | 可視 8 要素 |
| Lead | 貂明朝アンチック | 27.1059px / 3.2rem | 700 | 1.32 | 1.08423px / `.128rem` | `これまで、200社を超える…`。色は `#f8444d` |
| Sub Accent | nexa | 60.9882px / 7.2rem | 600 | 1.00 | normal | `AI` `AX` |
| Section Label (h2) | **nexa** | 13.5529px / 1.6rem | 400 | 1.20 | 0.542117px / `.064rem` | `Feature` `Services`。色は `#f8444d` |
| Card Heading (h3) | 游ゴシック体 | 23.7176px / 2.8rem | 700 | 1.50 | 0.813176px / `.096rem` | サービス名 |
| Person Name | 游ゴシック体 | 16.9412px / 2rem | 700 | 1.20 | 0.304941px / `.036rem` | 役員名（28 要素） |
| **Body** | 游ゴシック体 | **13.5529px / 1.6rem** | 400 / 700 | **1.65** | **0.542117px / `.064rem`** | `--font-size-body: clamp(13px, 1.6rem, 16px)` |
| Body Tight | 游ゴシック体 | 13.5529px / 1.6rem | 400 | 1.56 | 0.542117px | カード内の説明文 |
| Nav Link | **nexa** | **14px（px 固定）** | 500 | 1.30 | **0.28px（px 固定）** | `About` `Service` `News` |
| Button Label | 游ゴシック体 | **14px（px 固定）** | 700 | 1.30 | 0.237176px / `.028rem` | `私たちについて` |
| Chip / Filter | 游ゴシック体 | **13px（px 固定）** | 500 | 1.42 | 0.474353px / `.056rem` | `すべて` `事業変革` |
| Tag | 游ゴシック体 | **12px（px 固定）** | 500 | 1.42 | 0.203294px / `.024rem` | カテゴリタグ（37 要素で最多） |
| Scroll Label | 游ゴシック体 | 13px | 500 | 1.12 | 0.237176px | **`writing-mode: vertical-rl`** |
| Copyright | 游ゴシック体 | 10px | 400 | 1.20 | — | フッター |

> **サイズには 2 つの系統がある。** コンテンツ（見出し・本文・カード）は **rem で viewport 連動**、ナビとボタンとチップは **px 固定（12 / 13 / 14px）**。**UI 部品はどの画面幅でも同じ大きさ**という設計。

### 3.5 行間・字間

- **本文の行間**: **1.65**（13.5529px / 22.36px）。日本語本文としてはやや締まった値
- **最多の行間**: **1.20**（66 要素）。ラベルとナビと短い見出し
- **大見出しの行間**: **1.12〜1.32**。ヒーローは 1.12
- **字間の既定**: **`.064rem`（0.542117px）**。`normal` は 4 要素しかない
- **大見出しの字間だけ `0.08em`**。ヒーロー（142.306 → 11.3845）とセクション見出し（54.2117 → 4.33694）が**どちらもちょうど 8%**

**ガイドライン**:
- **字間は `rem` で書く。** `em` で書くとサイズに比例してしまい、このサイトの「本文の字間は絶対値」という設計が崩れる
- **ただし 40px を超える大見出しだけは `0.08em`。** 貂明朝アンチックは字面が大きいので、大サイズでは palt で詰めた上に均等に空けないと窮屈になる
- **巨大な欧文（100px 超）は `-0.02em` で詰める。** 和文とは逆方向

### 3.6 禁則処理・改行ルール

- ヒーローは 2 行を手で割っている（`AIで企業のOSを` / `つくり変える会社`）。**自動折り返しに任せない**
- `word-break: break-all` は使わない

### 3.7 OpenType 機能

**`font-feature-settings: "palt"` を 35 要素（トップ）/ 23 要素（about）に適用している。**

- **見出しと本文の両方に効いている。** 貂明朝アンチックの見出しは **palt で詰めた上に `0.08em` 空ける**
- ボタン・チップ（`interactive` の実測）は `font-feature-settings: normal`。**UI 部品には palt を効かせない**

### 3.8 縦書き

- **`writing-mode: vertical-rl` は 1 要素のみ**：ヒーロー左端の `Scroll Down`（`span.scroll-label` / 13px / `letter-spacing: 0.237176px`）
- **和文の縦組みはしていない。** 縦に置いているのは欧文ラベル 1 つだけ

---

## 4. Component Stylings

`border-radius` は 3 値のみ：**`1.2rem`（実測 10.1647px、73 要素）/ `0.4rem`（3.38823px、28 要素）/ `999px`（1 要素）**。

```css
--radius-xs: .4rem;    /* 3.39px @1440 — 写真・小さな面 */
--radius-sm: .8rem;    /* 6.78px */
--radius-md: 1.2rem;   /* 10.16px — 既定。ボタン・カード */
--radius-full: 999px;  /* Get In Touch の丸ボタンのみ */
```

### Buttons

**Primary Dark（主 CTA）**
- Background: **`#16171d`** / Text: `#ffffff`
- Border Radius: **`1.2rem`（10.1647px）**
- Padding: **`1.6rem 5.6rem`（実測 13.5529px 47.4353px）**
- Font: 游ゴシック体 / **14px（px 固定）/ weight 700** / line-height 1.30 / `letter-spacing: .028rem`
- Border: `1px solid transparent`（ホバーで色が入る余地）
- Box Shadow: `inset 0 0 0 0 #ffffff`（**ホバー時に内側から白が伸びる仕掛けの初期値**。静止時は不可視）

**Primary Round（`Get In Touch` / お問い合わせ）**
- Background: **`#f8444d`** / Text: `#ffffff`
- Border Radius: **`999px`**（完全な円）
- **円の中に英語ラベル（nexa）＋日本語ラベル（游ゴシック体）の 2 段**
- ヒーロー右下に固定配置

**Contact Band（フッター手前の全幅帯）**
- Background: **`#f8444d`** / Text: `#ffffff`
- Border Radius: `1.2rem`
- Padding: **`5.6rem 6.5rem`（実測 47.4353px 55.0588px）**

**Filter（`すべて` `経営層向け支援` `事業変革`）**
- 選択: Background **`#f8444d`** / Text `#ffffff`
- 非選択: Background **`#f0f1f4`** / Text `#16171d`
- Border Radius: **`0px`**（**このサイトで唯一の角丸ゼロ部品**）
- Padding: `0.6rem 1.6rem`（実測 5.08235px 13.5529px）
- Font: 13px / weight 500 / `letter-spacing: .056rem`

### Cards

- Background: `#ffffff`
- Border Radius: **`1.2rem`**（人物写真は `0.4rem`）
- Border: なし（必要なら `1px solid #c5c8d3`）
- Shadow: **静止状態では付けない**（`--shadow-card` は宣言のみで可視 0 要素）

### Tags / Chips

- Background: `#f0f1f4` または透明
- Font: **12px / weight 500 / `letter-spacing: .024rem`**（可視 37 要素で最多のテキスト種）
- Border Radius: `0.4rem`

---

## 5. Layout Principles

### Root Font Size（**最初に決めること**）

```css
html {
  font-size: calc(100vw / 170);  /* 実測 8.47058px @1440px、10px @1700px */
}
```

> **このサイトの寸法はすべてこの `rem` に乗っている。** ルートを 16px や 62.5% にすると、**トークンの数値（`14rem` = セクション余白）がすべて壊れる。**

### Spacing Scale

| Token | rem | 実測 @1440 | 用途 |
|-------|-----|-----------|------|
| — | `0.8rem` | 6.78px | 最小の gap |
| — | `1.2rem` | 10.16px | **最多の gap（19 要素）**。カード内の行間 |
| — | `2.4rem` | 20.33px | カード間 |
| — | `3.2rem` | 27.11px | ブロック間 |
| — | `5.2rem` | 44.05px | **セクション内の大きな段（7 要素）** |
| — | `8rem` | 67.76px | 列間 |
| `--section-padding-x` | **`8rem`** | 67.76px | セクション左右 |
| `--section-padding-y` | **`14rem`** | 118.61px | **セクション上下。余白の主役** |

`24px` の gap が 5 要素だけ px 固定で混ざっている（UI 部品側）。

### Container

- **about ページの本文カラム: `72rem`（実測 609.882px @1440）**
- サブカラム: `69.6rem`（589.553px）
- トップページは全幅レイアウトで `max-width` を持つ要素が無い

### Border

- `--border-h-width: 1px`。左端の縦罫（`#f8444d`）とセクション区切りに使う

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| **0** | `none` | **既定。カード・ボタン・チップはすべてフラット** |
| — | `inset 0 0 0 0 #ffffff` | ボタン 4 要素。**ホバーアニメーションの初期値で、見た目には出ない** |
| （宣言のみ） | `--shadow-card: 0 0 1.6rem 0 #2c2f3a1f` | **可視 0 要素**。トークンはあるが静止状態では使われていない |

> **影で階層を作らないサイト。** 奥行きはノイズ入りグラデーション球と、`#16171d` / `#f0f1f4` の面の差で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: calc(100vw / 170) }` を先に置く。** 全トークンがこれ前提
- **見出しは `ten-mincho-antique` 700。** 入手できない環境では `"Hiragino Mincho ProN", "游明朝", serif` に落ちる前提で書く
- **本文・UI は游ゴシック体（OS ローカル）。和文の Web フォントは読み込まない**
- **字間は `rem` で宣言する**（本文 `.064rem` / タグ `.024rem` / ボタン `.028rem`）
- **40px 超の大見出しだけ `letter-spacing: 0.08em` ＋ `font-feature-settings: "palt"`**
- **巨大な欧文アクセントは `letter-spacing: -0.02em`** と逆に詰める
- **赤は `#f8444d` 1 色**。面・文字・罫すべてこれ
- **本文色は `#16171d`**（純黒にしない）
- **角丸は `1.2rem` を既定に、写真は `0.4rem`、丸ボタンだけ `999px`**
- ナビ・ボタン・チップの **`font-size` は px 固定**（12 / 13 / 14px）

### Don't（禁止）

- **見出しをヘビーゴシックにしない。** 一見そう見えるが実体は明朝アンチックで、**ゴシックに置き換えると仮名の表情が消える**
- **`nexa` の `font-weight: 300` を使わない**（`unloaded`。500 / 600 のみ `loaded`）
- **本文の `letter-spacing` を `em` で書かない**（サイズ連動になり設計が崩れる）
- **カード・ボタンに `box-shadow` を足さない**（静止状態は影ゼロ）
- **グラデーションをフラットにしない**（ノイズ 24% が前提）
- **アクセント色を 2 色目にしない**
- `--color-surface-subtle`（`#fafafc`）を面に使わない（実サイトでは未使用）
- **フォーム以外に slate の値（`#020617` / `#64748b` / `#e2e8f0`）を持ち込まない**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測件数 | 説明 |
|------|-------|---------|------|
| **Mobile** | **`(width <= 768px)`** | **15** | **唯一のサイズ境界。** モダンな range 構文 |
| Hover | `(hover: hover)` | 11 | ホバー演出をポインタ環境に限定 |
| Hover + Fine | `(hover: hover) and (pointer: fine)` | 2 | — |
| Motion | `(prefers-reduced-motion: reduce)` | 10 | **アニメーションを丁寧に切っている** |

> **ブレークポイントは 768px の 1 本だけ。** 中間幅の調整は `html` の流体 `font-size` が引き受けている。

### タッチターゲット

- Primary Dark ボタン: 高さ 45px（13.55px × 2 + 18.2px）— **44px をぎりぎり満たす**
- Filter チップ: 高さ 28.6px — **44px を下回る。モバイルでは縦 padding を増やすこと**

### フォントサイズの調整

- 本文は `clamp(13px, 1.6rem, 16px)`。**狭い画面で 13px を下回らず、広い画面で 16px を超えない**
- ナビ・ボタン・チップは px 固定なのでブレークポイントをまたいで変わらない

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Red:  #f8444d
Text:         #16171d
Text Inverse: #ffffff
Text Muted:   #585e74
Surface Dark: #16171d
Surface Muted:#f0f1f4
Border:       #c5c8d3
Background:   #ffffff
Root:  html { font-size: calc(100vw / 170) }   /* 8.47px @1440 */
Font (見出し): "ten-mincho-antique", "Hiragino Mincho ProN", "游明朝", serif  /* weight 700 */
Font (本文):   "游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", Meiryo, sans-serif
Font (欧文):   "nexa", sans-serif   /* 500 / 600 のみ */
Body Size:     clamp(13px, 1.6rem, 16px)
Line Height:   1.65（本文） / 1.20（ラベル） / 1.12〜1.32（大見出し）
Letter Spacing: .064rem（本文） / 0.08em（40px超の見出し） / -0.02em（巨大欧文）
Radius: 1.2rem（既定） / 0.4rem（写真） / 999px（丸ボタン） / 0（フィルタ）
Section Padding: 14rem 8rem
Breakpoint: (width <= 768px)
palt: あり（見出し・本文）／UI 部品は normal
Shadow: なし
```

### プロンプト例

```
Algomatic のデザインシステムに従って、AIコンサルティング会社のコーポレートトップを作成してください。
- まず html { font-size: calc(100vw / 170) } を置き、以降の長さはすべて rem で書く
- 見出しは "ten-mincho-antique"（貂明朝アンチック）/ weight 700。ゴシックで代用しない
  フォールバックは "Hiragino Mincho ProN", "游明朝", serif
- ヒーローは 16.8rem / line-height 1.12 / letter-spacing 0.08em / font-feature-settings: "palt"
  2行を手で割る（自動折り返しに任せない）
- セクション見出しは 6.4rem / line-height 1.32 / letter-spacing 0.08em
- 本文は游ゴシック体（OSローカル、和文Webフォントは読み込まない）
  clamp(13px, 1.6rem, 16px) / line-height 1.65 / letter-spacing .064rem
- セクションラベル（Feature / Services）は "nexa" 400 / 1.6rem / 色 #f8444d
- ナビは "nexa" 500 / 14px 固定 / letter-spacing 0.28px
- 主CTAは背景 #16171d / 白文字 / radius 1.2rem / padding 1.6rem 5.6rem / 14px weight 700
- お問い合わせは #f8444d の radius 999px の丸ボタン（英語ラベル＋日本語ラベルの2段）
- フィルタチップは選択 #f8444d / 非選択 #f0f1f4、radius 0、13px weight 500
- 背景は白。ヒーローにノイズ（opacity .24）を重ねたグラデーション球を2つ置く
- box-shadow は使わない。セクション余白は 14rem 8rem
- ブレークポイントは (width <= 768px) の1本だけ
```
