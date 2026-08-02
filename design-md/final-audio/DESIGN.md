# DESIGN.md — final（ファイナル / S'NEXT）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-02 / 対象: `https://final-inc.com/`, `/collections/all`, `/products/ze8000mk2`

---

## 1. Visual Theme & Atmosphere

川崎のオーディオメーカー。イヤホン・ヘッドホンの研究開発を軸にしたブランドで、
公式ストアは Shopify 上に構築されている。**このECの最大の特徴は、
和文の本文フォントに明朝体を指定していること**。
`--text-font-family` が `"Hiragino Mincho ProN"` 始まりで、
商品名・価格・ボタン・フォームまで含めた**サイト全体が明朝で組まれる**。

- **デザイン方針**: 白場・明朝・角丸ほぼゼロ。EC の賑やかさを消して製品写真に集中させる
- **密度**: 低〜中。20カラムグリッドの広いコンテナ（1520px）に大きく製品を置く
- **キーワード**: 明朝、白場、0.05em の均一な字間、20カラム、ワイドトラッキングのボタン

**このサイトの特徴的な癖（他サイトと違う点）**

1. **本文が和文明朝**。EC サイトでゴシックを一切使わない例は稀。
   価格・在庫バッジ・フォームのラベルまで明朝で通す
2. **見出しは EB Garamond ＋ 和文明朝**。欧文セリフと和文明朝を1つのチェーンに混ぜる
3. **`letter-spacing` が全要素で一律 `0.05em`**。15px→0.75px、14px→0.7px、
   40px→2px、12px→0.6px。**サイズが変わっても比率が変わらない**
4. **欧文の大見出しだけ字間がマイナス**（`-0.025em`）。和文は開き、欧文は締める
5. **ボタンのラベルだけ `letter-spacing: 2px`（13px で 0.154em）**。
   本文の3倍以上の字間で「押せる文字」を区別している
6. **グリッドが20カラム**。Shopify テーマとしては異例の分割数で、
   `--grid-column-count: 20` / `--grid-gap: 34px`
7. **`--block-border-radius: 0px` に対し `--button-border-radius: 4px`**。
   面は角丸ゼロ、ボタンだけ 4px という非対称

---

## 2. Color Palette & Roles

<!-- CSS Custom Properties は RGB 成分（カンマ区切り）で保持され、rgb() で組み立てられる -->

### Primary（ブランドカラー）

- **Primary Blue** (`#006bc6`): `--primary-button-background`。主要CTA・カートバッジ・
  カスタムラベル。**サイト唯一の有彩色**
- **Ink** (`#222222`): `--secondary-button-background`。セカンダリボタン・
  ダークセクション。実質のブランド地色

### Semantic（意味的な色）

- **Success** (`#006bc6`): `--success-color`。Primary と同値
- **Success Background** (`#cce1f4`): `--success-background`
- **Error** (`#ec0924`): `--error-color`。セール価格・在庫僅少の文字色
- **Error Background** (`#feeef0`): `--error-background`
- **Sold Out** (`#959595`): `--product-sold-out-accent`。「在庫切れ」「生産終了」バッジ
- **Star Rating** (`#e79315`): `--product-star-rating`

### Neutral（ニュートラル）

- **Text / Heading** (`#222222`): `--text-color` / `--heading-color`。**同値**
- **Text Muted** (`rgba(34, 34, 34, 0.7)`): パンくず・注記
- **Background** (`#ffffff`): `--background`。ページ地色（`html` に指定）
- **Secondary Background** (`#f5f5f5`): `--secondary-background`。カード面・シリーズ一覧
- **Dark Section** (`#222222`): 「final LAB」等の反転セクション
- **Footer** (`#171717`): フッター。ダークセクションよりさらに一段暗い
- **Border** (`rgba(0, 0, 0, 0.1)`): `--border-color`。既定の罫
- **Border Darker** (`#a7a7a7`): `--border-color-darker`
- **Border Root** (`#dedede`): `--root-border-color`
- **Border Subtle** (`#ededed`): ブランド切替タブ（final / ag）の枠

### CSS Custom Properties

```css
:root {
  /* 色は RGB 成分で持ち、rgb(var(--x)) で組み立てる */
  --heading-color: 34, 34, 34;
  --text-color: 34, 34, 34;
  --background: 255, 255, 255;
  --secondary-background: 245, 245, 245;
  --border-color: 0, 0, 0, 0.1;
  --border-color-darker: 167, 167, 167;

  --primary-button-background: 0, 107, 198;
  --primary-button-text-color: 255, 255, 255;
  --secondary-button-background: 34, 34, 34;
  --secondary-button-text-color: 255, 255, 255;

  --success-color: 0, 107, 198;
  --success-background: 204, 225, 244;
  --error-color: 236, 9, 36;
  --error-background: 254, 238, 240;
  --product-star-rating: 231, 147, 21;
  --product-sold-out-accent: 149, 149, 149;
}
```

---

## 3. Typography Rules

### 3.1 和文フォント

**明朝体のみ**。ゴシック体の指定が存在しない。

- **明朝体（本文・見出し・UI のすべて）**:
  `"Hiragino Mincho ProN"` → `"Hiragino Mincho Pro"` → `"Yu Mincho"` → `YuMincho` → `Meiryo`

**注意**: `ProN` と `Pro` を**両方**書いている（ProN が先）。
`Yu Mincho` と `YuMincho`（スペース有無の2表記）も併記されており、
Mac / Windows 双方の明朝を確実に拾いにいく設計。
最終フォールバックが `Meiryo`（ゴシック）→ `sans-serif` なので、
**明朝が1つも無い環境ではゴシックに落ちる**。

### 3.2 欧文フォント

- **セリフ（見出し専用）**: `'EB Garamond'`
- **サンセリフ**: 指定なし。generic の `sans-serif` が末尾に置かれるのみ

### 3.3 font-family 指定

```css
/* 本文・UI（和文明朝のみ。欧文専用フォントを持たない） */
--text-font-family: "Hiragino Mincho ProN", "Hiragino Mincho Pro",
                    "Yu Mincho", YuMincho, Meiryo, sans-serif;

/* 見出し（EB Garamond を先頭に足しただけの同じチェーン） */
--heading-font-family: 'EB Garamond', "Hiragino Mincho ProN", "Hiragino Mincho Pro",
                       "Yu Mincho", YuMincho, Meiryo, sans-serif;

--heading-font-weight: 400;
--text-font-weight: 400;
--text-font-bold-weight: 700;
```

**フォールバックの考え方**:
- **和文優先**。欧文フォントは見出しチェーンの先頭に1本足すだけで、本文には入れない
- 本文の欧文（価格の数字・型番・`PRODUCTS`）は**和文明朝の欧文グリフで出る**。
  ヒラギノ明朝の欧文はセリフ体なので、結果として全体がセリフ調に揃う
- `Meiryo` が末尾にあるのは「明朝が無ければ読めればよい」という割り切り。
  **明朝の再現が要件なら `"Noto Serif JP"` を `Meiryo` の前に足す**

### 3.4 文字サイズ・ウェイト階層

トークン定義（`:root`）:

| Token | Value |
|-------|-------|
| `--base-font-size` | 15px |
| `--heading-large-font-size` | 58px |
| `--heading-h1-font-size` | 40px |
| `--heading-h2-font-size` | 40px |
| `--heading-h3-font-size` | 32px |
| `--heading-h4-font-size` | 26px |
| `--heading-h5-font-size` | 22px |
| `--heading-h6-font-size` | 16px |
| `--heading-small-font-size` | 12px |
| `--heading-xsmall-font-size` | 11px |
| `--heading-xxsmall-font-size` | 10px |

実測値:

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title (EN) | EB Garamond | 40px | 400 | 1.07 (42.86px) | **-0.025em** (-1px) | 「PRODUCTS」 |
| Section Title (EN) | EB Garamond | 40px | 500 | 1.08 (43.33px) | 0.05em (2px) | 「PICK UP」「final LAB」 |
| Sub Title (EN) | EB Garamond | 34px | 500 | 1.5 (51px) | **-0.03em** (-1px) | 「ABOUT」 |
| Store Title (JP) | 和文明朝 | 30px | **700** | 1.73 (52px) | 0.05em (1.5px) | 「final 公式ストア」 |
| Series Name (EN) | EB Garamond | 24px | 400 | 1.11 (26.67px) | 0.05em (1.2px) | 「ZE series」 |
| Card Title (EN) | EB Garamond | 18px | 400 | 1.73 (31.2px) | 0.05em (0.9px) | 「NEWS」 |
| Price | 和文明朝 | 16px | 400 | 1.73 (27.73px) | 0.05em (0.8px) | 「セール価格 ¥1,280,000」 |
| Body | 和文明朝 | 15px | 400 | **1.73** (26px) | 0.05em (0.75px) | 継承の基準値 |
| Lead | 和文明朝 | 15px | 400 | **2.2** (33px) | 0.05em (0.75px) | ABOUT のリード文 |
| Lead on Dark | 和文明朝 | 15px | 400 | **2.0** (30px) | 0.05em (0.75px) | ダークセクションのリード |
| Section Label (JP) | 和文明朝 | 14px | 400 | 1.23 (17.23px) | 0.05em (0.7px) | 「ピックアップ」 |
| Announcement | 和文明朝 | 14px | 400 | 1.71 (24px) | 0.05em (0.7px) | 「夏季休暇のお知らせ」 |
| Breadcrumb | 和文明朝 | 13px | 400 | 1.54 (20px) | 0.05em (0.65px) | `rgba(34,34,34,0.7)` |
| Button Label | 和文明朝 | 13px | 400 | 4.0 (52px) | **0.154em** (2px) | ボタンの文字。行高＝ボタン高 |
| Brand Tab | EB Garamond | 13px | 400 | — | 0.02em (0.26px) | 「final」「ag」 |
| Caption | 和文明朝 | 12px | 400 | 1.5 (18px) | 0.05em (0.6px) | シリーズ説明 |
| Badge | 和文明朝 | 12px | **700** | — | 0.042em (0.5px) | 「在庫切れ」「生産終了」 |

### 3.5 行間・字間

- **`letter-spacing` は全要素で `0.05em`**。これがこのサイトの背骨。
  15px→0.75px / 14px→0.7px / 13px→0.65px / 12px→0.6px / 16px→0.8px /
  30px→1.5px / 40px→2px と、**すべて font-size × 0.05 で一致する**
- **例外は3つだけ**:
  1. **欧文の大見出し** … `-0.025em`〜`-0.03em`（マイナス）。
     和文は開き、欧文は締めるという明確な使い分け
  2. **ボタンのラベル** … `0.154em`（13px で 2px）。本文の3倍
  3. **ブランド切替タブ** … `0.02em`
- **本文の `line-height` は 1.73**（15px→26px）。明朝の縦画が細いので広めに取る
- **リード文は 2.2**（33px）。読ませる段落だけさらに開く
- ダークセクション上のリードは 2.0。白地より少しだけ詰める

```css
body {
  font-family: var(--text-font-family);
  font-size: 15px;
  line-height: 1.7333;          /* 26px */
  letter-spacing: 0.05em;
  color: rgb(34, 34, 34);
  font-feature-settings: normal; /* palt は使わない */
}

/* 欧文見出しだけ字間をマイナスにする */
.heading--en {
  font-family: var(--heading-font-family);
  font-size: 40px;
  line-height: 1.07;
  letter-spacing: -0.025em;
}

/* ボタンのラベルだけ極端に開く */
.button {
  font-size: 13px;
  line-height: 52px;            /* = ボタン高。padding で高さを作らない */
  letter-spacing: 2px;
}
```

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- 製品名が「ZE8000 MK2」「MAKE MOD」のような英数＋スペースなので、
  **スペース位置で折り返す前提**でカード幅を決める
- 価格表示「セール価格¥1,280,000」は和文と数字が直結する。
  `letter-spacing: 0.05em` があるので詰まりすぎない

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使わない */
```

- **`palt` は全要素で無効**（実測 `normal`）
- 字詰めは palt ではなく `letter-spacing: 0.05em` で**開く方向**に統一。
  明朝のベタ組みを保つための選択

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| EB Garamond | **そのまま**（Google Fonts） | 実サイトと同一 |
| Hiragino Mincho ProN | **そのまま＋ Shippori Mincho をチェーン末尾に追加** | macOS では実フォントが出る。他OS向けに Google Fonts の明朝を足す |

実サイトのチェーンは末尾が `Meiryo`（ゴシック）なので、
**明朝が無い環境ではゴシックに落ちて印象が大きく変わる**。
preview.html では `Meiryo` の前に `"Shippori Mincho"` を挟み、
どの環境でも明朝で組まれるようにしている。

---

## 4. Component Stylings

### Buttons

トークン: `--button-border-radius: 4px` / `--button-height: 52px` / `--button-small-height: 44px`

**Primary（青）**

- Background: `#006bc6` / Text: `#ffffff`
- Border Radius: `4px`
- Height: `52px` / Padding: `0 35px`
- Font: 13px / weight 400 / **`letter-spacing: 2px`** / `line-height: 52px`

```css
.button--primary {
  background: rgb(0, 107, 198);
  color: #fff;
  border: 0;
  border-radius: 4px;
  height: 52px;
  padding: 0 35px;
  font-family: var(--text-font-family);
  font-size: 13px;
  line-height: 52px;             /* padding ではなく line-height で高さを合わせる */
  letter-spacing: 2px;
}
```

**Secondary（黒）**

- Background: `#222222` / Text: `#ffffff`
- 他は Primary と同一（radius 4px / height 52px / padding 0 35px / ls 2px）

**Outline（ダークセクション上）**

- Background: `transparent` / Text: `#ffffff`
- Border: `1px solid rgba(255, 255, 255, 0.2)`
- Border Radius: `6px` / Padding: `12px 20px`
- Font: EB Garamond / 12px / `letter-spacing: 0.05em`

**Newsletter（フッターの登録）**

- Background: `#000000`（**純黒。`#222222` ではない**）/ Text: `#ffffff`
- Border Radius: `0px` / Padding: `0 21px` / Font: 13px

**Brand Tab（final / ag の切替 — 唯一のピル）**

- Background: `transparent` / Text: `#222222`
- Border: `1px solid #ededed` / Border Radius: **`30px`**
- Padding: `4px 14px` / Font: EB Garamond / 13px / `letter-spacing: 0.02em`

### Tags / Badges

**Sold Out / 生産終了**

- Background: `#959595` / Text: `#ffffff`
- Border Radius: **`0px`** / Padding: `0 5px`
- Font: 12px / **weight 700** / `letter-spacing: 0.042em`

**Cart Count**

- Background: `#006bc6` / Text: `#ffffff`
- Border Radius: `21px`（正円）/ Font: 9px / weight 700 / `letter-spacing: normal`

### Cards

トークン: `--block-border-radius: 0px` / `--product-list-block-spacing: 34px`

**Series Card（シリーズ一覧）**

- Background: `#f5f5f5` / Border Radius: `6px`
- 構成: シリーズ名（EB Garamond 24px）→ 説明（12px / 1.5）

**Product Card**

- Background: `transparent`（白場にそのまま置く）
- Border / Shadow: なし / Border Radius: `0px`
- 構成: 商品写真 → バッジ（在庫切れ等）→ 商品名 → 価格（16px）

### Color Swatches（カラーバリエーション）

- Border Radius: **`0px`**（`--color-swatch-border-radius: 0px`）
- Border: `2px solid #ffffff`（選択中を白枠で示す）
- 実際の色見本: BLACK `#000000` / BEIGE `#f5f5dc` / CREAM `#dcd4c7` / DARK GRAY `#7f807b`

### Inputs / Forms

トークン: `--form-input-field-height: 52px` / `--form-input-gap: 16px` / `--form-submit-margin: 32px`

- Height: `52px`（ボタンと同じ）
- Border: `1px solid rgba(0, 0, 0, 0.1)` / Border Radius: `0px`
- Font: 和文明朝 / 15px / `letter-spacing: 0.05em`
- Label: 13px / `rgba(255, 255, 255, 0.7)`（フッター内）
- エラー時: Border / Text は `#ec0924`、背景 `#feeef0`

### Pagination

- Border Radius: `50%`（正円）/ Font: 17px / `letter-spacing: 0.05em`
- 現在ページ: Background `#222222` / Text `#ffffff` / Border `1px solid rgba(34,34,34,0.15)`
- 他ページ: Background `transparent` / Text `rgba(34,34,34,0.15)` / 同じ枠

### Carousel Indicator

- Border Radius: `50%`
- 選択中: `#ffffff` / 非選択: `rgba(255, 255, 255, 0.2)`

---

## 5. Layout Principles

### Container

```css
--container-max-width: 1520px;
--container-gutter: 40px;
--container-outer-margin: max(calc((100vw - calc(1520px - 40px * 2)) / 2), 40px);
```

- **Max Width: `1520px`** — EC としてはかなり広い
- Padding (horizontal): `40px`

### Grid

```css
--grid-column-count: 20;   /* 12 でも 16 でもなく 20 */
--grid-gap: 34px;
--grid-column-width: calc((内側幅 - 34px * 19) / 20);
```

- **20カラム**。4/5/10 分割が同じグリッドで作れる
- Gutter: `34px`

### Vertical Rhythm

```css
--vertical-breather: 80px;
--vertical-breather-tight: 64px;
--product-list-block-spacing: 34px;
```

| Token | Value | 用途 |
|-------|-------|------|
| XS | 4px | バッジの内側 |
| S | 16px | フォーム要素の間隔（`--form-input-gap`） |
| M | 34px | グリッド gutter / 商品ブロック間 |
| L | 40px | コンテナ左右 |
| XL | 64px | セクション間（tight） |
| XXL | 80px | セクション間（既定） |

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。ほぼすべての要素** |

**影を使わない**。カードは `#f5f5f5` の面色と `rgba(0,0,0,0.1)` の罫だけで分節する。
奥行きは白場の広さと `--vertical-breather: 80px` の余白でつくる。

---

## 7. Do's and Don'ts

### Do（推奨）

- **和文は明朝で組む**。本文・価格・ボタン・フォームまで例外なく
- `letter-spacing` は全要素で **`0.05em`**（font-size × 0.05）
- 本文の `line-height` は **1.73**、読ませるリードは **2.2**
- 欧文の大見出しだけ `letter-spacing` を **マイナス（-0.025em）** にする
- ボタンのラベルは `letter-spacing: 2px`（13px）と極端に開く
- ボタンの高さは `line-height: 52px` で作る（上下 padding を使わない）
- ボタンだけ `border-radius: 4px`、面・バッジ・スウォッチは `0px`
- 有彩色は `#006bc6` の1色に絞る
- コンテナは 1520px、グリッドは20カラム / gutter 34px

### Don't（禁止）

- **本文をゴシックにしない**。明朝であることがブランドの第一印象
- `palt` を使わない（`font-feature-settings: normal`）
- 面やカードに角丸を付けない（`--block-border-radius: 0`）
- 影・グラデーションを足さない
- 青（`#006bc6`）以外の有彩色を増やさない。赤 `#ec0924` はエラー／セール専用
- 本文の `letter-spacing` を 0 にしない（明朝が詰まって見える）
- ボタンのラベルに本文と同じ字間を使わない
- `font-family` の末尾を `Meiryo` のまま放置しない（明朝が無い環境でゴシックに落ちる）

---

## 8. Responsive Behavior

### Breakpoints

Shopify テーマ（Impact 系）の既定値。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | < 700px | 1〜2カラム。ナビはドロワー |
| Tablet | 700–999px | 2〜3カラム |
| Desktop | ≥ 1000px | 4〜5カラム。コンテナ 1520px |

### モバイルでの変化

- グローバルナビ → ハンバーガー（ドロワー）
- `--container-gutter` 40px → 20px 前後
- 欧文大見出し 40px → 28px 前後。**`letter-spacing: -0.025em` は維持する**
- 商品一覧 4〜5カラム → 2カラム
- ボタン高 52px は維持（`--button-small-height: 44px` を使う箇所のみ 44px）

### タッチターゲット

- ボタン・入力欄ともに 52px（小サイズでも 44px）で WCAG 基準を満たす

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:   #006bc6（唯一の有彩色）
Secondary:       #222222
Error:           #ec0924
Sold Out:        #959595
Text / Heading:  #222222
Background:      #ffffff
Surface:         #f5f5f5
Dark Section:    #222222 / Footer #171717
Border:          rgba(0,0,0,0.1) / #a7a7a7 / #dedede
Heading Font:    'EB Garamond', "Hiragino Mincho ProN", "Hiragino Mincho Pro",
                 "Yu Mincho", YuMincho, Meiryo, sans-serif
Body Font:       "Hiragino Mincho ProN", "Hiragino Mincho Pro",
                 "Yu Mincho", YuMincho, Meiryo, sans-serif   ← 和文明朝
Body Size:       15px
Line Height:     1.73（本文）/ 2.2（リード）/ 1.07（欧文大見出し）
Letter Spacing:  0.05em（全要素）/ -0.025em（欧文大見出し）/ 2px（ボタン）
Border Radius:   4px（ボタン）/ 6px（シリーズカード）/ 0px（面・バッジ・スウォッチ）
Button:          height 52px / padding 0 35px / font 13px / line-height 52px
Container:       1520px / gutter 40px
Grid:            20 columns / gap 34px
Shadow:          none
palt:            off
```

### プロンプト例

```
final（ファイナル）のデザインシステムに従って、イヤホンの商品一覧ページを作成してください。
- 背景 #ffffff、文字 #222222、カード面 #f5f5f5、フッター #171717
- 和文はすべて明朝で組む:
  font-family: "Hiragino Mincho ProN", "Hiragino Mincho Pro",
               "Yu Mincho", YuMincho, "Shippori Mincho", serif
  （実サイトの末尾は Meiryo だが、明朝を保証するため Shippori Mincho を足す）
- 欧文見出しは 'EB Garamond' を先頭に足した同じチェーン
- 本文 15px / line-height: 1.73 / letter-spacing: 0.05em
- 読ませるリード文だけ line-height: 2.2
- 欧文の大見出し（PRODUCTS 等）は 40px / line-height: 1.07 /
  letter-spacing: -0.025em（マイナス。和文は開き、欧文は締める）
- letter-spacing は全要素で font-size × 0.05 に揃える
- 主要CTAは背景 #006bc6 / 文字 #ffffff / border-radius: 4px /
  height: 52px / padding: 0 35px / font-size: 13px / letter-spacing: 2px /
  line-height: 52px（上下 padding で高さを作らない）
- セカンダリボタンは背景 #222222、他は Primary と同じ
- 「在庫切れ」バッジは背景 #959595 / 白文字 / 12px weight 700 /
  border-radius: 0 / padding: 0 5px
- カラースウォッチは border-radius: 0、選択中は 2px solid #ffffff の枠
- ページネーションは正円（border-radius: 50%）。現在ページのみ #222222 の塗り
- 面・カードに角丸を付けない（ボタンの 4px とシリーズカードの 6px だけが例外）
- 影・グラデーションは使わない
- font-feature-settings: normal（palt は使わない）
- コンテナ幅 1520px / 左右 40px、グリッドは20カラム / gap 34px
- セクション間の余白は 80px
```
