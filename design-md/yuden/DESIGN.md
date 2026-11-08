# DESIGN.md — 太陽誘電（TAIYO YUDEN）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-08 / 対象: `https://www.yuden.co.jp/jp/`, `/jp/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **一切詰めない。** `letter-spacing` は 2 ページとも全要素 `normal`、`font-feature-settings` も 0 件。**`palt` が効く書体を使っているのに使っていない**。色は `--COLOR_*` の大文字スネークケースで 38 個宣言し、そのうち**実際に出ているのは 17 個**
- **密度**: 中。トップの可視テキストは 157 要素。本文 14px / 16px の 2 段が全体の 6 割
- **キーワード**: 詰めない、赤 #e60012 一色、角丸4px、影ゼロ、宣言だけのトークンが多い

**このサイトの核心は5つある。**

1. **`palt` は効くのに 1 要素も使っていない。** 同一ページ・同一書体（Noto Sans JP）で隠し div を作り、`「おもしろ科学」で、より大きく・より社会的に。（株）` を 100px で測ると **`normal` 2542.00px → `"palt"` 2090.91px（−17.75%）**。それでも `font-feature-settings` の実測は **2 ページとも 0 件**
2. **`letter-spacing` も全要素 `normal`**（実測 154 / 103 要素）。例外は CMP（OneTrust）の `0.144px` / `0.13008px` だけで、**サイト本体には 1 件も無い**
3. **`font-weight: 900` を 11 要素に当てているが、Google Fonts の URL は `wght@400;700` しか読んでいない。** 隠し div の実測は **100〜500 → 1780.41px / 600〜900 → 1842.30px の 2 面だけ**で、**900 は 700 のファイルで描画される**（合成太字も起きない）。ヒーローの `おもしろ科学でより大きく より社会的に` も実際は 700
4. **`html` には `font-size` の宣言が無い**（UA 既定 16px）。切り替わるのは `body` だけで、**768px → 767px で `1rem` → `0.875rem`**
5. **トークンは 38 個あるが、可視は 17 個。** `--COLOR_ROLE_SUCCESS/DANGER/WARNING/INFO` の 8 個、`--COLOR_BRAND_TERTIARY`（青）、`--COLOR_BRAND_SECONDARY`、`--LINER_GRADIENT` は**すべて可視 0 要素**

**書体は Noto Sans JP（400 / 700 の静的 2 本）と、英語見出し専用の Roboto 700。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | トークン名 | 実測 |
|------|--------|-----------|------|
| **TAIYO YUDEN レッド** | **`#e60012`** | `--COLOR_BRAND_PRIMARY` / `--COLOR_BRAND_SECONDARY_3` | **塗り面 10 / 9 要素**。`お問い合わせ` のピル、`Mission` のラベル、スライドのインジケータ。**文字色としても 7 要素**（`Product Information` `Spotlight` `News`） |

> **`--COLOR_BRAND_PRIMARY` と `--COLOR_BRAND_SECONDARY_3` が同じ `#e60012`。** 名前が 2 つある重複宣言で、値は 1 色。

### 宣言はあるが使われていない色

| トークン | 値 | 実測 |
|----------|----|------|
| `--COLOR_BRAND_TERTIARY` | `#008cd6`（青） | **可視 0 要素** |
| `--COLOR_BRAND_SECONDARY` | `#ffeeea`（淡い赤） | **可視 0 要素** |
| `--COLOR_BRAND_SECONDARY_2` | `#4c4c5c` | **可視 0 要素** |
| `--COLOR_ROLE_SUCCESS_DARK` / `_LIGHT` | `#1c7560` / `#e2f8f3` | **可視 0 要素** |
| `--COLOR_ROLE_DANGER_DARK` / `_LIGHT` | `#cc0033` / `#ffe0e8` | **可視 0 要素** |
| `--COLOR_ROLE_WARNING_DARK` / `_LIGHT` | `#7a6800` / `#fff9d8` | **可視 0 要素** |
| `--COLOR_ROLE_INFO_DARK` / `_LIGHT` | `#003acc` / `#e0e9ff` | **可視 0 要素** |
| `--LINER_GRADIENT` | `linear-gradient(90deg, #e60012, #e66000)` | **可視 0 要素**（グラデーション背景を持つ要素が 1 つも無い） |
| `--COLOR_FOREGROUND_DARK` / `--COLOR_BACKGROUND_DARK` | `#333333` | **可視 0 要素**（本文は `#222222`） |

> **`--COLOR_ROLE_*` の 8 個は semantic カラーの枠だけ用意して使っていない。** 「設計の厚み」であって実装ではない。**これらを使って UI を組まない。**

> **トークン名の `--LINER_GRADIENT` は実サイトの綴りそのまま**（`LINEAR` のタイプミス）。再現するなら `--LINEAR_GRADIENT` に直してよいが、既存 CSS と突き合わせるときはこの綴りで探す。

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文・見出し。**可視 134 / 95 要素（最多）**。`--COLOR_BASE_DARK`
- **Text Muted** (`#666666`): パンくず、補助ラベル（可視 5 要素）。`--COLOR_BASE_DARK_GRAY` / `--COLOR_BACKGROUND_LIGHT04`
- **Text Disabled** (`#979797`): `--COLOR_BASE_DARK_GRAY_2`
- **Text on Brand** (`#ffffff`): 赤いピルの上（可視 11 / 8 要素）
- **Surface** (`#f4f4f4`): カード・検索欄の地（面 4 / 7 要素）。`--COLOR_BASE_GRAY` / `--COLOR_BACKGROUND_LIGHT03` / `--COLOR_OUTLINE_LIGHT`
- **Surface 2** (`#e2e2e2`): `閉じる` ボタンの地（面 7 要素）。`--COLOR_BACKGROUND_LIGHT05`
- **Surface 3** (`#d9d9d9`): タブの非選択（**面 25 要素で最多**）。`--COLOR_BASE_LIGHT_GRAY_2` / `--COLOR_BACKGROUND_LIGHT02`
- **Border** (`#cccccc`): `--COLOR_BASE_LIGHT_GRAY` / `--COLOR_OUTLINE_DARK`
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

> **グレーは 4 段**（`#d9d9d9` / `#e2e2e2` / `#f4f4f4` / `#cccccc`）。それぞれに別名のトークンが 2 つずつ付いているので、**値で見分ける**。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（Web フォント）**: **Noto Sans JP**（Google Fonts・**400 / 700 の静的 2 本**）。可視 151 要素（トップ）/ 106 要素（下層）
- **フォールバック**: ヒラギノ角ゴ ProN → ヒラギノ角ゴ → メイリオ
- **明朝体**: 使用しない（2 ページとも可視 0 要素）

### 3.2 欧文フォント

- **Roboto 700**。**英語のセクション見出し専用**で、`Spotlight` `News` `Product` `Event Information` の **60px**（可視 6 要素）
- 本文中の英数字は Noto Sans JP の欧文グリフ
- **`Noto Sans EN`（`font-weight: 100 900` の可変）が `@font-face` で宣言されているが `unloaded`・可視 0 要素**

### 3.3 font-family 指定

```css
/* 和文・既定（可視 151 / 106 要素） */
font-family: "Noto Sans JP", "Helvetica Neue", Arial,
             "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;

/* 英語のセクション見出し（可視 6 要素） */
font-family: Roboto, Arial, sans-serif;
```

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
```

**フォールバックの考え方**:
- **和文優先。** `Noto Sans JP` が先頭で、欧文の `Helvetica Neue` / `Arial` を挟んでから OS ローカルの和文に落ちる
- **generic family（`sans-serif`）が末尾にある**ので受け皿は正しい
- **フォント要求は 37 件、すべて `fonts.gstatic.com`。** 自社ホストからのフォント配信は無い

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight（宣言） | **実描画** | Line Height | Letter Spacing |
|------|------|------|---------------|-----------|-------------|----------------|
| **English Heading** | **Roboto** | **60px** | 700 | 700 | **1.50**（90px） | normal |
| **Hero Copy** | Noto Sans JP | **40px** | **900** | **700** | 1.50 | normal |
| **Page Title（下層 h1）** | Noto Sans JP | **40px** | 700 | 700 | 1.50 | normal |
| **Section Heading** | Noto Sans JP | **34px** | 700 | 700 | 1.50 | normal |
| **Sub Heading** | Noto Sans JP | **24px** | **900** / 700 | **700** | **1.75** | normal |
| **Lead** | Noto Sans JP | **22px** | 700 | 700 | 1.50 | normal |
| **Card Title** | Noto Sans JP | **18px** | 700 | 700 | 1.50 | normal |
| **Body** | Noto Sans JP | **16px**（= 1rem） | 400 | 400 | **1.50**（24px） | normal |
| **Nav / Label** | Noto Sans JP | **14px** | 400 | 400 | 1.50 | normal |
| **Tag / Caption** | Noto Sans JP | **12px** | 700 | 700 | **1.75** | normal |

**ウェイトは実質 400 と 700 の 2 段。** CSS には 900 が 11 要素あるが、描画は 700。

> **実測の裏付け**: 隠し div で `font-weight` だけ 100〜900 に振って幅を比べると、**100〜500 → 1780.41px / 600〜900 → 1842.30px の 2 面**。Google Fonts の URL が `wght@400;700` なのと一致する。**500 / 600 / 800 / 900 を書いても 400 か 700 に丸められる。**

> **CSS が 900 を当てている 11 要素**（`おもしろ科学でより大きく より社会的に` `スペシャルコンテンツ` `おもしろ科学でサステナブルな未来へ` `全てのステークホルダーから信頼され感動を与えるエクセレントカンパニー` など）は **`<b>` タグ**で、40px / 24px。**意図は Black だが Bold で出る。**

### 3.5 行間・字間

- **本文の行間**: **1.50**（`--LINE_HEIGHT: 1.5`、`body { line-height: 24px }` = 16 × 1.5）。**可視 104 / 86 要素で最多**
- **カード内の行間**: **1.75**（34 / 10 要素）
- **検索欄・ナビの行間**: 1.15（15 / 7 要素）
- **字間**: **2 ページとも全要素 `normal`**（154 / 103 要素）

> **`line-height` は無単位 1.5。** `--LINE_HEIGHT: 1.5` というトークンがあり、`body` に 1 回書いて継承させる。**子要素で px に書き換えない。**

> **CMP（OneTrust）だけ `letter-spacing: 0.144px` / `0.13008px`、`font-size: 13.008px` / `14.4px` という半端な値を持つ。** これはサイトの設計ではないので、**分布の端数を流体の signature と読み違えない。**

### 3.6 禁則処理・改行ルール

```css
body { word-break: normal; }   /* 明示的に宣言している */
```

- `break-all` も `auto-phrase` も使わない
- ヒーローの見出しは `<br>` で手動改行（`おもしろ科学で<br>より大きく より社会的に`）

### 3.7 OpenType 機能

**使っていない。** `font-feature-settings` の実測は **2 ページとも 0 件**。

> **ただし、できないのではなく「やっていない」。** Google Fonts 配信の Noto Sans JP は `palt` テーブルを持っており、同一ページで隠し div を 2 つ作って `font-feature-settings` だけ変えると、和文の文字列で **`normal` 2542.00px → `"palt"` 2090.91px（−17.75%）**。

> **だから「`palt` を足して改善する」という提案は、このサイトでは「別物にする」ことを意味する。** 既存のレイアウトは詰めない前提で余白が決まっているので、**後から足さない。**

### 3.8 縦書き

- 使用しない（2 ページとも `writing-mode: vertical-*` が 0 要素）

### 3.9 ルートと本文の実測（9 幅）

| 幅 | `html` | `body` | `body` の `line-height` | `h2` | `p` |
|----|--------|--------|------------------------|------|-----|
| 1940 / 1440 / 1200 / 1024 / 834 / **768**px | **16px** | **16px** | **24px** | **60px / 90px** | 16px / 24px |
| **767** / 390 / 375px | **16px** | **14px** | **21px** | **40px / 60px** | 14px / 21px |

```css
html { /* font-size の宣言なし。UA 既定の 16px */ }
body { font-size: 1rem; word-break: normal; }
@media (max-width: 767px) { body { font-size: 0.875rem; } }
```

- **崖は 768 / 767px の 1 箇所だけ**で、16px → 14px（0.875 倍）。`vw` も `clamp()` も使っていない
- **`html` を触っていないので、ユーザーのブラウザ文字サイズ設定がそのまま効く**
- 英語ページ専用の指定が 1 つある: `html[lang="en"] .l-footer__informationLink { font-size: 0.85rem }`

---

## 4. Component Stylings

### Buttons

**Primary（赤のピル）**
- Background: `#e60012` / Text: `#ffffff`
- Font Size: 14px / Weight: 700 / Letter Spacing: normal / Line Height: 1.50
- Border Radius: **100px**（完全なピル。実測 2 要素）
- Shadow: **なし**

**Secondary（白地・枠線）**
- Background: `#ffffff` / Text: `#222222` / Border: `1px solid #cccccc`
- Font Size: 12px / Weight: 700
- Border Radius: **4px**（実測 13 要素で最多）

**Tab（非選択）**
- Background: `#d9d9d9` / Text: `#222222`
- Font Size: 12px / Weight: 700 / Border Radius: **0px**

### Cards

- Border Radius: **4px**
- 面: `#ffffff` または `#f4f4f4`
- Shadow: **なし**

### Section Label

- `Mission` のような小見出しは **`#e60012` の文字色・weight 700**（面は塗らない）

---

## 5. Layout Principles

### Grid

```css
/* ページ全体の骨格（実測） */
display: grid;
grid-template-columns: 80px 1200px 80px;   /* 左右ガター 80px ＋ コンテンツ 1200px */
gap: 0 40px;

/* サイドバー付き（下層） */
grid-template-columns: 265px 915px;
gap: 11px 20px;
```

### Container

| 幅 | 実測 | 用途 |
|----|------|------|
| **1200px** | **2 箇所（両ページ）** | 標準コンテンツ |
| 900px | 1 箇所 | 下層の本文ブロック |
| 740px | 5 箇所 | カード内 |
| 580px | 3 箇所 | テキストブロック |

### Gap Scale

**`0 40px`（9 / 14 箇所で最多）** / `8px` / `10px` / `18px` / `20px` / `25px` / `40px` / `50px`

### Border Radius Scale

| 用途 | 値 | 実測 |
|------|----|------|
| **カード・ボタン** | **4px** | **13 要素（最多）** |
| ピル CTA | **100px** | 2 要素 |
| アイコン | 50% | 1 要素 |
| （CMP のボタン） | 2px | 4 要素 ← OneTrust。サイトの設計ではない |

### Spacing Tokens

```css
:root {
  --SIZE_MODULE_MARGIN: 64px;          /* セクション間 */
  --SIZE_NESTED_MODULE_MARGIN: 24px;   /* セクション内のブロック間 */
}
```

---

## 6. Depth & Elevation

**影は使わない。**

`box-shadow` の分布は 2 ページとも **1 種だけ**で、その 1 件は **CMP（OneTrust）の `rgba(0, 0, 0, 0.2) 0 0 18px 0`**。**サイト本体に影は 1 件も無い。**

> **階層は面の色（`#ffffff` / `#f4f4f4` / `#d9d9d9`）と 4px の角丸、そして `0 40px` のガターだけで作る。**

---

## 7. Do's and Don'ts

### Do（推奨）

- **`letter-spacing` は全要素 `normal`**
- **本文の `line-height` は 1.50（無単位・`--LINE_HEIGHT: 1.5`）**、カード内は 1.75
- **`font-weight` は 400 と 700 だけ書く**（他を書いても丸められる）
- **`body { word-break: normal }` を明示する**
- **色は `--COLOR_*`（大文字スネークケース）のトークンで引く**。ただし**実際に使うのは 17 個**
- **ブランド色は `#e60012` の 1 色**。面にも文字にも使う
- **グレーは `#d9d9d9` / `#e2e2e2` / `#f4f4f4` / `#cccccc` の 4 段**
- **本文色は `#222222`**（`--COLOR_BASE_DARK`）
- **角丸は 4px、CTA のピルだけ 100px**
- **グリッドは `80px 1200px 80px` ＋ `gap: 0 40px`**
- 英語のセクション見出しだけ **Roboto 700 / 60px**
- `body` は `1rem`、767px 以下で `0.875rem`

### Don't（禁止）

- **`font-feature-settings: "palt"` を後から足さない。** 効くことは効く（−17.75%）が、**このサイトのレイアウトは詰めない前提で組まれている**ので、足すと別物になる
- **`font-weight: 900` を書かない**（Google Fonts が `wght@400;700` しか読んでいないので 700 で出る。意図と実装がずれる）
- **`letter-spacing` を足さない**
- **`box-shadow` を使わない**（サイト本体 0 件）
- **`--COLOR_ROLE_SUCCESS/DANGER/WARNING/INFO` を使って UI を組まない**（8 個とも可視 0。実装に存在しない）
- **`--COLOR_BRAND_TERTIARY`（青 `#008cd6`）を差し色にしない**（可視 0）
- **`--LINER_GRADIENT` を背景に敷かない**（グラデーション背景を持つ要素が 1 つも無い）
- **本文色に `#333333` を使わない**（`--COLOR_FOREGROUND_DARK` は宣言されているが可視 0。`#222222` が正）
- **`html` に `font-size` を書かない**（このサイトは UA 既定に任せている）
- **`line-height` を px で書かない**（無単位 1.5 の継承が設計）

### 実サイトの事実として知っておくこと

- **ヒーローの大見出しは画像ではなく実テキスト。** `<b>` タグの 40px / weight 900 で、左の写真（`img_index_pc.webp` 1100×520）だけが画像。**画像だと思って組み直さない**
- **ヒーローは 5 枚のスライド**（`img_index_pc.webp` 〜 `img_index_5_pc.webp`）
- **`Noto Sans EN` という `@font-face`（`weight: 100 900`）が宣言されているが `unloaded`・可視 0 要素**。英語ページ用に用意したが使われていない
- **`--COLOR_BRAND_PRIMARY` と `--COLOR_BRAND_SECONDARY_3` は同じ `#e60012`**（重複宣言）
- **CMP（OneTrust）が `13.008px` / `14.4px` / `0.13008px` という半端な値を持ち込む。** これはサイトの設計ではないので、**流体タイポグラフィと読み違えない**
- **Google Fonts の CSS は CORS で読めない**（`styleSheetAccess.blocked: 1`）。自社 CSS は 2 枚とも読めており、**トークン 38 個はすべてそこから取れている**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測 |
|------|-------|------|
| Small Mobile | `only screen and (max-width: 600px)` | 2 箇所 |
| **Mobile** | **`(max-width: 767px)`** | **2 箇所（本文サイズの崖）** |
| Tablet 以上 | **`(min-width: 768px)`** | **3 箇所（最多）** |
| — | `(min-width: 550px)` | 2 箇所 |
| Desktop | `(min-width: 900px)` / `(min-width: 1024px)` / `(min-width: 1122px)` | 1 箇所ずつ |
| Laptop 以下 | `(max-width: 1023px)` | 1 箇所 |
| Hover 可能 | `(hover: hover)` | 2 箇所 |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- 767px 以下で `body` が 16px → 14px、`h2` が 60px → 40px
- 字間が `normal` なので、サイズを変えても詰めの調整は不要

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Red:        #e60012   ← --COLOR_BRAND_PRIMARY（面にも文字にも）
Text Color:       #222222   ← --COLOR_BASE_DARK
Text Muted:       #666666   ← --COLOR_BASE_DARK_GRAY
Text Disabled:    #979797   ← --COLOR_BASE_DARK_GRAY_2
Surface:          #f4f4f4   ← --COLOR_BASE_GRAY
Surface 2:        #e2e2e2   ← --COLOR_BACKGROUND_LIGHT05
Surface 3:        #d9d9d9   ← --COLOR_BASE_LIGHT_GRAY_2（面の最多 25 要素）
Border:           #cccccc   ← --COLOR_BASE_LIGHT_GRAY
Background:       #ffffff
Font:             "Noto Sans JP", "Helvetica Neue", Arial,
                  "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
English Heading:  Roboto, Arial, sans-serif   ← 60px の英語見出しのみ
Root:             html に font-size の宣言なし（UA 既定 16px）
Body Size:        1rem（≥768px） / 0.875rem（≤767px）
Line Height:      1.5（本文・--LINE_HEIGHT） / 1.75（カード内）
Letter Spacing:   normal（全要素）
Font Feature:     normal（palt は効くが使わない）
Font Weight:      400 / 700 のみ（900 を書いても 700 で出る）
Grid:             80px 1200px 80px / gap 0 40px
Container:        1200px
Spacing:          --SIZE_MODULE_MARGIN 64px / --SIZE_NESTED_MODULE_MARGIN 24px
Radius:           4px（カード・ボタン） / 100px（ピル CTA）
Shadow:           なし（サイト本体 0 件）
CSS Variables:    38 個宣言・可視 17 個（ROLE 系 8 個と TERTIARY は未使用）
```

### プロンプト例

```
太陽誘電のデザインシステムに従って、ニュース一覧のセクションを作成してください。

- font-family は "Noto Sans JP", "Helvetica Neue", Arial,
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
- 英語のセクション見出し（News など）だけ Roboto, Arial, sans-serif の 60px / weight 700
- font-weight は 400 と 700 だけ（900 は書かない。700 で出るので意図とずれる）
- letter-spacing はどこにも書かない（全要素 normal）
- font-feature-settings も書かない（palt は効くが、このサイトは使わない設計）
- html に font-size は書かない。body を 1rem / line-height 1.5 / word-break: normal とし、
  767px 以下で 0.875rem に落とす
- カード内の本文だけ line-height 1.75
- 文字色 #222222、補助 #666666、セクションラベルは #e60012 の文字色
- カードは background #ffffff / border-radius 4px / box-shadow なし
  非選択のタブは background #d9d9d9、面の地は #f4f4f4
- CTA は background #e60012 / 文字 #ffffff / 14px / weight 700 / border-radius 100px
- レイアウトは grid-template-columns: 80px 1200px 80px / gap: 0 40px
  セクション間は 64px、セクション内のブロック間は 24px
- --COLOR_ROLE_SUCCESS / DANGER / WARNING / INFO は使わない（実装に存在しない）
```
