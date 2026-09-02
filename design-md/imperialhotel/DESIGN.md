# DESIGN.md — 帝国ホテル（Imperial Hotel）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-08-31 / 対象: `https://www.imperialhotel.co.jp/`, `/j/tokyo/`, `/j/tokyo/restaurant/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白と淡いグレーの余白を大きく取り、**金茶（`#856c34`）1色だけで格を出す**。角丸をほぼ使わない矩形基調で、装飾は罫線と字間に寄せる。写真を大きく見せ、UI は写真の邪魔をしない
- **密度**: ゆったりとした余白。セクション間のマージンは 64px 固定（`--SIZE_MODULE_MARGIN`）
- **キーワード**: 金茶、明朝、広い字間、矩形、余白

**このサイトの核心は「見出しもボタンのラベルも明朝（Noto Serif JP）である」こと。** 本文だけがゴシック（ヒラギノ角ゴ Pro）で、それ以外の階層は明朝が担う。さらに英字の飾り見出しには `Judson`（欧文セリフ）を `letter-spacing: 0.2em` で組む。**ボタンの文字が明朝であることに気づかずゴシックで作ると、格が丸ごと失われる。**

**106個の CSS Custom Properties で設計されたトークン駆動のサイト**でもある。命名は `--COLOR_BRAND_PRIMARY` のような全大文字スネークケース。

---

## 2. Color Palette & Roles

CSS 変数の宣言と実測値が一致した色だけを「実装」として扱う（不一致は 2.4 に列挙）。

### Primary（ブランドカラー）

- **Imperial Gold** (`#856c34` / `--COLOR_BRAND_PRIMARY`): ブランドの中核。CTA の面色、見出しの差し色、テーブルヘッダーの文字色。**実測で最多（18件）**
- **Gold Hover** (`#755f2d` / `--COLOR_BRAND_PRIMARY_HOVER`, `--COLOR_BACKGROUND_BUTTON_HOVER`): ボタンのホバー
- **Gold Muted** (`#927f56`): 一部の小さな「詳細を見る」リンク。`#856c34` より淡い

### Surface（面色）

- **Background** (`#ffffff` / `--COLOR_BACKGROUND_LIGHT`): ページ背景。`body` に明示指定
- **Surface** (`#f5f5f5` / `--COLOR_BACKGROUND_LIGHT_2`): セクションの面。下層ページで 19 件と支配的
- **Surface Dark** (`#1a1a1a` / `--COLOR_BACKGROUND_DARK`): ヘッダー・フッターの黒。ホバーは `#2e2e2e`
- **Backdrop** (`#1a1a1a80` / `--COLOR_BACKDROP`): モーダルの背面
- **Carousel Overlay** (`#1a1a1a99` / `--COLOR_CAROUSEL_OVERLAY`, `--COLOR_CAROUSEL_CONTROLS`): 写真上のコントロール

### Semantic（フォーム検証用）

| Role | Dark（文字・枠） | Light（面） |
|------|-----------------|-------------|
| Success | `#1c7560` | `#e2f8f3` |
| Danger | `#a60034` | `#ffdde7` |
| Warning | `#7a6800` | `#fff9d8` |
| Info | `#003acc` | `#e0e9ff` |

### Neutral（ニュートラル）

- **Text Primary** (`#1a1a1a` / `--COLOR_FOREGROUND_DARK`): 本文。純黒は使わない
- **Text Secondary** (`#707070` / `--COLOR_FOREGROUND_DISABLED`): 補助・無効
- **Text on Dark 2** (`#cccccc` / `--COLOR_FOREGROUND_LIGHT_2`): 黒地の上の小さな注記
- **Outline** (`#7a7a7a` / `--COLOR_OUTLINE_DARK`): 主要な罫線。カルーセルの非アクティブドットも兼ねる
- **Outline Light** (`#e6e6e6` / `--COLOR_OUTLINE_DARK_2`): 淡い区切り線
- **Outline Dark** (`#4d4d4d` / `--COLOR_OUTLINE_DARK_3`): 黒地の上の罫線
- **Disabled BG** (`#f5f5f5` → `#e3e3e3`): ボタン無効時

### 2.4 宣言 ≠ 実装（トークンにあるが実際には使われていない値）

DOM 全走査（トップ・帝国ホテル 東京）で **0件** だった宣言。トークンだけ見て実装しないこと。

| 変数 | 値 | 実測 |
|------|-----|------|
| `--COLOR_BACKGROUND_LIGHT_3` | `#faf6ee`（アイボリー） | **0件** |
| `--COLOR_OUTLINE_GOLD` | `#ccbe9f` | **0件** |
| `--COLOR_BRAND_SECONDARY` | `#b89548` | **0件**（カルーセルの fade 版ページネーションにのみ紐づく） |
| `--FONT_FAMILY_SANS_EN` | `Jost, sans-serif` | **0件**（欧文サンセリフは実際には出てこない） |
| `--BOX_SHADOW` | `0 5px 6px #7d7d7d33` | **0件** |
| `--BORDER_RADIUS_SMALL` | `5px` | 1件のみ |
| `--BORDER_RADIUS_LARGE` | `10px` | 8件（カルーセルドット等） |
| `--LINER_GRADIENT` | `linear-gradient(90deg,#ade6ff,#dbb2ff)` | **0件**（パステルのグラデーションでブランドと無関係） |

> **`#faf6ee` を「帝国ホテルのアイボリー」として使ってはいけない。** 宣言だけがあり、実サイトの面は `#ffffff` と `#f5f5f5` の2色で作られている。

### 2.5 混入している別サービスの色（採用禁止）

`uniqueBackgrounds` に出るが**すべて OneTrust の Cookie 同意バナー**由来。ブランド色ではない。

- `#3860be`（Filter Icon）/ `#27455c` / `#468254` / `#856d34`（1違いの金茶。CMP 側のボタン）

判別は `_textPreview` に `OK` / `Apply` / `クッキー設定` / `全てのクッキーを受け入れる` が並ぶことで付く。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（本文専用）**: ヒラギノ角ゴ Pro → Noto Sans JP → 游ゴシック体 → メイリオ
- **明朝体（見出し・ボタン・テーブル見出し）**: **Noto Serif JP**

> **`ヒラギノ角ゴ Pro` であって `ProN` ではない。** Pro は JIS90 字形、ProN は JIS2004 字形で、「辻」「琢」などの字形が変わる。Apple JP と同じ Pro 指定。

### 3.2 欧文フォント

- **セリフ（英字の飾り見出し）**: **Judson**（`--FONT_FAMILY_ROMAN`, `--FONT_FAMILY_SERIF_EN`）。下層ページで 118 要素に適用される
- **サンセリフ**: `--FONT_FAMILY_SANS_EN: Jost` が宣言されているが**実測 0 件**
- **等幅**: 定義なし

### 3.3 font-family 指定

```css
/* 本文・ナビゲーション（--FONT_FAMILY_SANS） */
font-family: "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "Noto Sans JP",
             游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic",
             メイリオ, Meiryo, sans-serif;

/* 見出し・ボタンラベル・テーブル見出し（--FONT_FAMILY_SERIF） */
font-family: "Noto Serif JP", serif;

/* 英字の飾り見出し（--FONT_FAMILY_ROMAN） */
font-family: Judson, serif;
```

**フォールバックの考え方**:
- **和文（ヒラギノ角ゴ Pro）を先頭に置く和文優先型。** 欧文を先に置かない
- Web フォントは `Noto Serif JP` と `Judson` の2つだけ。本文のゴシックはローカルフォントに任せる
- 明朝の宣言は `"Noto Serif JP", serif` の2段のみ。游明朝・ヒラギノ明朝を並べない

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | Noto Serif JP | 40px | 600 | 2.0 (80px) | 0.05em (2px) | h1 |
| Page Title (sub) | Noto Serif JP | 32px | 600 | 1.8 (57.6px) | **0.15em (4.8px)** | 下層 h1。字間が特に広い |
| Section Heading (EN) | **Judson** | 34px | 700 | 1.6 (54.4px) | **0.2em (6.8px)** | `DESTINATION` 等。`#856c34` |
| Section Heading | Noto Serif JP | 32px / 28px | 600 | 2.0 / 1.8 | 0.05em | h2 |
| Sub Heading | Noto Serif JP | 20px | 600 | 1.8 (36px) | 0.05em (1px) | h3 |
| Sub Heading (S) | Noto Serif JP | 18px | 600 | 1.8 (32.4px) | 0.05em (0.9px) | h3 |
| Card Title | ヒラギノ角ゴ Pro | 28px | 400 | 2.0 (56px) | 0.05em (1.4px) | h3 の非明朝バリエーション |
| Lead | Noto Serif JP | 22px | 500 | 2.0 (44px) | 0.05em (1.1px) | リード段落 |
| Eyebrow (EN) | **Judson** | 16px | 700 | 1.6 (25.6px) | **0.2em (3.2px)** | `#856c34` |
| **Body** | **ヒラギノ角ゴ Pro** | **16px** | **400** | **2.0 (32px)** | **normal** | 本文の基準値 |
| Body (tight) | ヒラギノ角ゴ Pro | 16px | 400 | 1.6 (25.6px) | 0.05em (0.8px) | パネル内の本文 |
| Nav | Noto Serif JP | 16px | 500 | 2.0 (32px) | 0.05em (0.8px) | グローバルナビ |
| Table Header | Noto Serif JP | 14px | 600 | 2.0 (28px) | 0.05em (0.7px) | `th`。`#856c34` |
| Caption | ヒラギノ角ゴ Pro | 14px | 400 | 2.5 (35px) | normal | 補足 |
| Note (EN date) | Noto Serif JP | 12px | 500 | 2.0 (24px) | 0.05em (0.6px) | 日付など |
| Micro | ヒラギノ角ゴ Pro | 12px | 400 | 1.4 (16.8px) | 0.12em (1.4px) | `#856c34` のラベル |
| Footer Small | ヒラギノ角ゴ Pro | 10px | 400 | 1.5 (15px) | **0.16em (1.6px)** | 黒地の上。`#cccccc` |

### 3.5 行間・字間

- **本文の行間**: **2.0**（`--LINE_HEIGHT: 2`）。トークンで固定されている
- **その他の行間トークン**: ナビ 1.5 / リスト・テーブル 1.8 / パネル 1.6
- **本文の字間**: **`normal`**（本文だけは字間を入れない）
- **見出しの字間**: 0.05em が既定。**下層 h1 は 0.15em、英字見出しは 0.2em** と例外的に広い
- **フッターの小文字は 0.16em** と本文より遥かに広い

**ガイドライン**:
- **「日本語の見出しは 0.05em、英字の飾りは 0.2em」という二層構造**が帝国ホテルの字間設計。英字だけ極端に空けることで、写真の上でも装飾として成立する
- 本文の `line-height: 2.0` は崩さない。詰めると高級感が消える

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`
- 英字見出しは `letter-spacing: 0.2em` のため、最終文字の後ろに余分なアキが出る。中央揃えでは `margin-right: -0.2em` で補正する

### 3.7 OpenType 機能

```css
font-feature-settings: normal;
```

- **`palt` は 0 件**（トップ・下層ともに実測で確認）
- 字面の調整は `letter-spacing` だけで行う。**`palt` を足すと 0.05em の字間設計が崩れる**

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

**主要 CTA の `border-radius` は `0`。** 角丸は CMP・カルーセルドット等の周辺 UI にしか出ない。

### Buttons

**Primary（金茶ベタ・標準）**
- Background: `#856c34`
- Text: `#ffffff`
- Border: `1px solid #856c34`
- Padding: `14px 20px`
- Border Radius: `0`
- **Font: `"Noto Serif JP", serif`（明朝）** / Font Size: `14px` / Font Weight: `600` / Letter Spacing: `0.05em`
- Hover: Background `#755f2d`

**Primary Large（予約導線）**
- Background: `#856c34` / Text: `#ffffff` / Border: `1px solid #856c34`
- Padding: `19px 32px`
- Border Radius: `0`
- **Font: `"Noto Serif JP", serif`** / Font Size: `16px` / Font Weight: `600` / Letter Spacing: `0.05em`

**Ghost（透明・枠だけ）**
- Background: `transparent`
- Text: `#696969`
- Border: `1px solid transparent`（ホバーで枠が出る）
- Border Radius: `2px`

**Date Picker Cell（選択済み）**
- Background: `#856c34` / Text: `#ffffff`
- Padding: `6px 4px` / Border Radius: `0`
- Font: ヒラギノ角ゴ Pro / 16px / 400

**Scroll to Top**
- Background: `#4d422a`（金茶の暗色）/ Text: `#ffffff`
- Font Size: `16px` / Font Weight: `700` / **Letter Spacing: `0.2em`**

### Inputs

- Background: `#ffffff`
- Border: `1px solid #7a7a7a`（`--COLOR_OUTLINE_DARK`）
- Border Radius: `0`
- Font Size: `16px` / Font: ヒラギノ角ゴ Pro
- Focus: 枠を `#856c34` に変える
- Error: 枠 `#a60034` ／ 面 `#ffdde7` ／ メッセージ `#a60034`

### Cards

- Background: `#ffffff`（セクション面が `#f5f5f5` のとき白が浮きになる）
- Border: なし（面色差で区切る）
- Border Radius: `0`
- Padding: `24px`（`--SIZE_NESTED_MODULE_MARGIN`）

### Tables

- `th`: **`"Noto Serif JP"` 14px / 600 / `line-height: 2.0` / `letter-spacing: 0.05em` / 文字色 `#856c34`**
- `td`: ヒラギノ角ゴ Pro 16px / 400 / `line-height: 2.0`
- 罫線: `1px solid #e6e6e6`
- リスト・テーブルの行間は `--LINE_HEIGHT_LIST_AND_TABLE: 1.8` も併用される

### Carousel

- Dot: `border-radius: 10px`／非アクティブ `#7a7a7a`／アクティブ `#856c34`
- コントロールの地: `#1a1a1a99`

---

## 5. Layout Principles

### Spacing Scale

トークンに明示された2値を基準に、4の倍数で刻む。

| Token | Value | 由来 |
|-------|-------|------|
| XS | 4px | |
| S | 10px | |
| M | 14px | ボタンの縦 padding |
| L | **24px** | `--SIZE_NESTED_MODULE_MARGIN` |
| XL | 32px | |
| XXL | **64px** | `--SIZE_MODULE_MARGIN`（セクション間） |

### Container

- Max Width: **1440px**（外枠）/ **984px**（本文コンテンツ）
- 補助: 960px / 992px / 800px
- Padding (horizontal): 16px（モバイル）／ 24〜40px（デスクトップ）

### Header

- `--HEADER-TOP-HEIGHT: 200px`（トップの大型ヘッダー）
- `--HEADER-BOTTOM-HEIGHT: 80px`（スクロール後の固定ヘッダー）

### Z-Index Scale

```
Modal 500 > Navigation 490 > Dialog 480 > Popover 470 > Overlay/Sticky 460 > Modules 100 > Background -1
```

---

## 6. Depth & Elevation

宣言された `--BOX_SHADOW: 0 5px 6px #7d7d7d33` は**実測 0 件**。実際に描画される影は次の3種。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | ほとんどの面（既定） |
| 1 | `rgba(26, 21, 10, 0.1) 0 20px 20px -20px inset` | セクション上端の内影（12件で最多） |
| 2 | `rgba(26, 21, 10, 0.1) 0 -2px 20px` | 固定ヘッダー・下部タブ（`--HEADER_SHADOW`） |
| 3 | `rgba(61, 63, 69, 0.24) 1px 2px 8px` | 浮くパネル |

- 影の色は黒ではなく **`#1a150a`（わずかに温かい黒）** を 10% で使う
- テキストシャドウ: `1px 1px 5px rgba(0,0,0,0.5)`（写真上の白文字用、`--TEXT_SHADOW`）

### Transition

```css
--TRANSITION: .3s cubic-bezier(.25,.8,.25,1);
--TRANSITION_HOVER_COLOR: color .3s ease-out;
--TRANSITION_HOVER_BACKGROUND: background-color .3s ease-out;
```

すべて 0.3s。イージングは `cubic-bezier(.25,.8,.25,1)`。

---

## 7. Do's and Don'ts

### Do（推奨）

- **見出しとボタンのラベルは `"Noto Serif JP", serif`（明朝）にする**
- 本文だけ `"ヒラギノ角ゴ Pro"` 先頭のゴシックにし、`line-height: 2.0` / `letter-spacing: normal` で組む
- 日本語見出しの字間は `0.05em`、**英字の飾り見出しは `Judson` で `0.2em`**
- ボタン・入力欄・カードの `border-radius` は `0`
- 金茶は `#856c34` ひとつに絞る。ホバーは `#755f2d`
- セクション間は 64px、入れ子は 24px
- 影は使わず、面色（`#ffffff` / `#f5f5f5`）の差で層を作る

### Don't（禁止）

- **ボタンのラベルをゴシックにしない。** 明朝であることが格の源
- **`#faf6ee` / `#ccbe9f` / `#b89548` / `Jost` をトークンから拾って実装しない。** すべて宣言のみで実測 0 件
- `font-feature-settings: "palt"` を使わない（0.05em の字間設計と競合する）
- **`ヒラギノ角ゴ ProN` に置き換えない。** このサイトは `Pro`（JIS90 字形）
- `#3860be` / `#27455c` / `#468254` をブランド色として使わない（Cookie 同意バナー由来）
- 本文の `line-height` を 2.0 未満に詰めない
- 角丸・ドロップシャドウで「モダンな SaaS」風にしない

---

## 8. Responsive Behavior

### Breakpoints

CSS の `@media` から実測した主要な分岐。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。下部タブナビゲーション |
| Tablet | 768px – 1023px | 2カラム |
| Laptop | 1024px – 1259px | 3カラム |
| Desktop | ≥ 1260px | max-width 1440px / 本文 984px |

400 / 425 / 476 / 530 / 540 / 550 / 568 / 600 / 658 / 890 / 896 / 1280px にも細かい調整が入る。

### タッチターゲット

- 最小 44px × 44px。標準ボタン（`padding: 14px 20px` / 14px）は約 45px で条件を満たす

### フォントサイズの調整

- h1 40px → 26px、英字見出し 34px → 22px（字間 0.2em は維持する）
- **本文 16px / `line-height: 2.0` は据え置き**
- 下部タブナビゲーションは `--FONT_SIZE_NAVIGATION_SMALL: 0.625rem`（10px）/ `line-height: 1.285`

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #856c34（ホバー #755f2d）
Text Color: #1a1a1a
Text Secondary: #707070
Background: #ffffff
Surface: #f5f5f5
Surface Dark: #1a1a1a
Border: #7a7a7a（主）/ #e6e6e6（淡）
Font (body):    "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "Noto Sans JP", 游ゴシック体, YuGothic, メイリオ, sans-serif
Font (heading): "Noto Serif JP", serif      ← ボタンのラベルもこれ
Font (EN):      Judson, serif               ← letter-spacing 0.2em
Body: 16px / 400 / line-height 2.0 / letter-spacing normal
Heading: letter-spacing 0.05em
Border Radius: 0
Section Margin: 64px / Nested: 24px
Container: 1440px（外）/ 984px（本文）
```

### プロンプト例

```
帝国ホテルのデザインシステムに従って、レストラン一覧ページを作成してください。
- セクションの英字見出しは Judson, serif / 34px / 700 / letter-spacing 0.2em / 色 #856c34
- 日本語見出しは "Noto Serif JP", serif / 28px / 600 / line-height 1.8 / letter-spacing 0.05em / 色 #1a1a1a
- 本文は "ヒラギノ角ゴ Pro" 先頭のゴシック / 16px / 400 / line-height 2.0 / letter-spacing は normal
- font-feature-settings は使わない
- 「ご予約」ボタンは #856c34 のベタ、白文字、"Noto Serif JP" 14px / 600 / letter-spacing 0.05em、
  padding 14px 20px、border-radius 0、ホバーで #755f2d
- 営業時間テーブルの th は "Noto Serif JP" 14px / 600 / 色 #856c34、罫線は 1px solid #e6e6e6
- セクションの面は #f5f5f5、カードは #ffffff（枠なし・角丸なし）
- セクション間の余白は 64px、入れ子は 24px
- 影は使わない。本文コンテナは 984px
```
