# DESIGN.md — マブチモーター（MABUCHI MOTOR）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-25 / 対象: `https://www.mabuchi-motor.co.jp/`, `/company/philosophy.html`
> （世代の切り分けのため `/company/`, `/product/`, `/company/message.html` も実測）

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地にブランド青（`#0166b3`）1 色。角丸は **4px だけ**（実測 1 種・23 要素）、影は 0 種。8px の倍数で余白を積む
- **密度**: 中。本文 16px に **行間 1.50** を固定で当て、モバイルでも比率を変えない
- **キーワード**: 8px グリッド、大文字スネークケースのトークン、青 1 色、2 世代同居

**このサイトの核心は4つある。**

1. **`.html` で終わるページだけ 2003 年型のレガシーテンプレートが生きている。** URL の形で世代が割れる:

   | ページ | `html` | `body` | 行間 | 和文書体 | `document.fonts` | フォント要求 |
   |---|---|---|---|---|---|---|
   | `/`（トップ） | 16px | 16px | 24px | **Noto Sans JP 132 要素** | 372 本 | 29 件 |
   | `/company/` | 16px | 16px | 24px | **Noto Sans JP 115 要素** | 372 本 | 26 件 |
   | `/product/` | 16px | 16px | 24px | **Noto Sans JP 123 要素** | 372 本 | 25 件 |
   | `/company/philosophy.html` | **10px** | **14px** | 22.4px | **`ヒラギノ角ゴ Pro W3` 124 要素（100%）** | **0 本** | **0 件** |
   | `/company/message.html` | **10px** | **14px** | 22.4px | **`ヒラギノ角ゴ Pro W3` 88 要素（100%）** | **0 本** | **0 件** |

   **ディレクトリの index は新世代、`.html` は旧世代。** 404 ページも旧世代側にある。**新規実装では必ず新世代側に合わせる**

2. **CSS 変数 46 個が大文字スネークケースで揃った、完成度の高いトークン体系。** `--SPACING: 8px` を基点に `--SIZE_MODULE_MARGIN: calc(8px * 15)` のように積み、`--FONT_SIZE_10` 〜 `--FONT_SIZE_64` の **16 段**を `calc(N / var(--FONT_SIZE_ROOT) * 1rem)` で定義する。**px の数値をそのまま書いて `rem` に変換する**書き方

3. **Noto Sans JP を静的 3 ウェイト（`wght@400;500;700`）で調達し、宣言と実装が一致している。** 実測でも字幅が **100〜400 → 1267.30px ／ 500 → 1297.22px ／ 600〜900 → 1335.97px の 3 面**（100px 欧文で測定）。URL の `wght@` と完全に対応する。**ただし 600 を当てると 700 で出る**

4. **`letter-spacing` は両ページとも全要素 `normal`**（175/175、128/128）。密度は `--LINE_HEIGHT: 1.5` ひとつで作る

**`font-feature-settings` は CSS 全文に 1 件も無く、実測も 0 件。** ただし **`palt` は効く書体を使っている**（実スタック・24px・weight 400 で `normal` **2563.14px** → `"palt"` **2243.94px** ＝ **−12.5%**。generic の `sans-serif` は 2609.81px なので Noto Sans JP が正しく当たっていることも確認済み）。**「できるのにやっていない」型。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **ブランド青** | **`#0166b3`**（`--COLOR_BRAND_PRIMARY`） | **可視 28 要素の塗り面**（トップで唯一の背景色）。ヘッダーの `お問い合わせ`、CTA、見出しの下線、`Pick Up` のラベル |
| **青（旧世代のみ）** | `#0166b4` | **`.html` ページにだけ出る 1px ずれた青。** 新規実装では使わない |
| **Link Blue（旧世代のみ）** | `#0077cc` | 旧テンプレートのリンク色（可視 4 要素）。新世代には無い |

> **トップページの `uniqueBackgrounds` は `#0166b3` ただ 1 色。** 面を塗るのはブランド青だけで、それ以外は白と罫線で組む。

### Neutral（ニュートラル）

- **Text Primary** (`#333333` / `--COLOR_TEXT_PRIMARY`): 本文・見出し（**可視 91 要素で最多**）。純黒ではない
- **Text on Brand** (`#ffffff`): 青面のテキスト（可視 72 要素）
- **Background** (`#ffffff` / `--COLOR_BASE_LIGHT`): ページ背景（`pageBackground.from` = `body`）
- **Outline** (`#d6d6d6` / `--COLOR_OUTLINE_PRIMARY`): 罫線・カード枠
- **Background Gray** (`#ebebeb` / `--COLOR_BACKGROUND_GRAY`): 淡い面
- **旧世代のみ**: `#555555`（本文・可視 54 要素）、`#eeeeee` / `#f3f3f3`（面）、`#e5eff7`（見出し帯）

### 画像アイコンの色替え（`filter` トークン）

`fill` を持てない画像アイコンをブランド色・白に塗り替えるため、**`filter` の文字列をトークンにしている**。

```css
--FILTER_BLUE:  brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(1137%)
                hue-rotate(182deg) brightness(100%) contrast(104%);
--FILTER_WHITE: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7463%)
                hue-rotate(324deg) brightness(101%) contrast(98%);
```

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定（新世代）**: **Noto Sans JP**（Google Fonts、`wght@400;500;700` の**静的 3 本**）。実測 **可視 132 要素**
- **旧世代（`.html`）**: `"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", HiraKakuPro-W3, メイリオ, Meiryo, "ＭＳ Ｐゴシック", sans-serif` で **Web フォントは 1 本も読まない**（`document.fonts` 0 本・フォント要求 0 件）
- フォント要求は全 29 件が `fonts.gstatic.com/s/notosansjp/`。`@font-face` は CSS 全文に **372 件**（Noto Sans JP 3 ウェイト × 124 サブセット）

### 3.2 欧文フォント

- **Roboto**（`--FONT-FAMILY_ROBOTO: "Roboto", "Noto Sans JP", sans-serif`）。実測 **可視 7 要素**。`Pick Up` `Products` `About Mabuchi` `Investor Relations` `Sustainability` など**英語のセクション見出し専用**（40px / 64px）
- **Roboto の `@font-face` は無く、フォント要求も 0 件。** macOS / iOS には Roboto が入っていないため**実際には 2 番目の Noto Sans JP で描画される**。Android と、Roboto を入れている環境でだけ Roboto になる。**環境で字面が変わる前提で使う**

### 3.3 font-family 指定

```css
body {
  --scrollbar: calc(100vw - 100cqw);     /* コンテナクエリ単位でスクロールバー幅を算出 */
  background-color: var(--COLOR_BASE_LIGHT);
  color: var(--COLOR_TEXT_PRIMARY);
  font-family: "Noto Sans JP", "Noto Sans", "Noto Sans SC",
               "游ゴシック Medium", "游ゴシック体", "Yu Gothic Medium", YuGothic,
               "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo,
               sans-serif;
  font-size: var(--FONT_SIZE);
  line-height: var(--LINE_HEIGHT);       /* 1.5・単位なし */
}
```

- **`html` は宣言が無く UA 既定の 16px**（23 幅すべてで 16px）
- **フォールバックに游ゴシックの Medium を先に置いている**（`"游ゴシック Medium"` → `"游ゴシック体"` → `"Yu Gothic Medium"` → `YuGothic`）。Windows で細く出る問題への対処。ただし Noto Sans JP が確実に読み込まれるので到達しない
- `"Noto Sans"`（欧文）と `"Noto Sans SC"`（簡体字中国語）も挟んであり、多言語サイトの名残

### 3.4 文字サイズ・ウェイト階層

サイズは **`--FONT_SIZE_10` 〜 `--FONT_SIZE_64` の 16 段**がトークンとして定義されている（10 / 12 / 14 / 16 / 18 / 20 / 22 / 24 / 28 / 32 / 36 / 40 / 48 / 56 / 64）。

| 用途 | サイズ | ウェイト | 書体 | 実測 |
|------|--------|----------|------|------|
| 英語セクション見出し | **64px** | 400 | Roboto → Noto Sans JP | 3 要素 |
| 英語小見出し | **40px** | 400 | Roboto → Noto Sans JP | 4 要素 |
| 見出し | 24px | 400 | Noto Sans JP | 4 要素 |
| 中見出し | 20px | 500 / 400 | Noto Sans JP | 5 / 3 要素 |
| 小見出し | 18px | 500 | Noto Sans JP | 4 要素 |
| **本文** | **16px** | 400 | Noto Sans JP | **62 要素で最多** |
| 一覧・ナビ | 14px | 400 | Noto Sans JP | 10 要素 |
| 補助・メガメニュー | 12px | 400 | Noto Sans JP | 42 要素 |

- **ウェイトのトークンは 2 つだけ**: `--FONT_WEIGHT_MEDIUM: 500` / `--FONT_WEIGHT_BOLD: 700`。既定は 400
- **実測は 400 が 154 要素と圧倒的**、500 が 11 要素、700 は **1 要素**。**ほとんど太らせない設計**
- **600 を当てると 700 で描画される**（Google Fonts が 400/500/700 の 3 本のみ）

### 3.5 行間・字間

- **`line-height` は `--LINE_HEIGHT: 1.5`（単位なし）**。比率が子へ降りる
- **実測の行間比は 1.50 が 165 要素**（可視 175 要素中）で、**ほぼ全要素が 1.5**。例外は英語見出しの 1.20（7 要素）と本文の 1.80（1 要素）
- **`letter-spacing` は全要素 `normal`**（175/175）。下層（旧世代）も 128/128
- **比率はブレークポイントで変わらない**: 1440px `16px / 24px`（1.50）→ 375px `14px / 21px`（**1.50**）

### 3.6 禁則処理・改行ルール

- `word-break` / `overflow-wrap` の宣言は無く、ブラウザ既定（`normal`）
- `auto-phrase` は使っていない

### 3.7 OpenType 機能

- **CSS 全文に `font-feature-settings` が 1 件も無く、実測も 0 件**
- **`palt` は効く**（実測 −12.5%）。**「できるのにやっていない」型**なので、既存ページに合わせるなら足さない

### 3.8 縦書き

- 使っていない（`writing-mode: vertical-rl` は両ページとも 0 要素）

---

## 4. Component Stylings

### Buttons

**Primary（ブランド青の塗り）**
- Background: `#0166b3`
- Text: `#ffffff`
- Border: `1px solid #0166b3`
- Padding: `16px 40px`
- Border Radius: **`4px`**
- Font Size: 16px / Font Weight: 400

**Header CTA（お問い合わせ）**
- Background: `#0166b3` / Text: `#ffffff`
- Border: `1px solid #0166b3`
- Padding: `7px 16px` / Border Radius: `4px`
- Font Size: 14px

**Text Link（ナビ）**
- Background: `transparent` / Text: `#333333`
- Border: なし / Padding: `0 4px`
- Font Size: 14px

### Cards

- Background: `#ffffff`
- Border: `1px solid #d6d6d6`（`--COLOR_OUTLINE_PRIMARY`）
- Border Radius: `4px`
- Shadow: **なし**

### Inputs

- Border: `1px solid #d6d6d6` / Border Radius: `4px`
- Padding: `8px 16px`（`--SPACING` の 1 倍・2 倍）
- Font Size: 16px

---

## 5. Layout Principles

### Spacing Scale

**`--SPACING: 8px` を基点に、すべての余白を倍数で書く。**

| Token | 定義 | 値 |
|-------|------|-----|
| 基点 | `--SPACING` | **8px** |
| Gutter (SP) | `--OUTSIDE_GUTTER_SP: calc(8px * 2)` | 16px |
| Gutter (PC) | `--OUTSIDE_GUTTER_PC: calc(8px * 5)` | 40px |
| 入れ子モジュール間 | `--SIZE_NESTED_MODULE_MARGIN: calc(8px * 10)` | 80px |
| モジュール間 | `--SIZE_MODULE_MARGIN: calc(8px * 15)` | **120px** |

実測の `gap`: `40px`（4 件）/ `0px 40px`（4 件）/ `60px` / `16px` — **すべて 8 の倍数**。

### Container

- Max Width: **`--CONTENT_WIDTH_PC: 1315px`**（`--MINOR_BREAKPOINT` と同値）
- Mobile: `--CONTENT_WIDTH_SP: calc(375px - (16px * 2))` ＝ **343px**
- 実測のコンテナ幅: 1280px（7 要素）/ 1320px / 1200px / 1160px
- Header Height: `--HEADER_HEIGHT: 118px`

### Grid

- Columns: 3〜4（製品カード・ニュース）
- Gutter: `40px`（`--SPACING` × 5）

### z-index

トークンで 8 段に整理されている。

| Token | 値 |
|-------|-----|
| `--Z_INDEX_OVERLAY` / `--Z_INDEX_TOP_SCROLL_BUTTON` | 80 |
| `--Z_INDEX_HEADER_SERCH` | 90 |
| `--Z_INDEX_HEADER` / `--Z_INDEX_OVERLAY_HEADER` / `--Z_INDEX_HEADER_MEGA_MENU` | 100 |
| `--Z_INDEX_HEADER_SERCH_ICON` | 110 |
| `--Z_INDEX_HEADER_LANG` | 120 |

> 綴りは実サイトのまま（`SERCH`）。**新規実装では `SEARCH` に直してよいが、既存 CSS を編集するときはこの綴りに合わせる。**

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべての要素** |

**影は両ページとも 0 種。** 階層は (a) `1px solid #d6d6d6` の罫線、(b) `#0166b3` の塗り、(c) `--SPACING` の倍数の余白、(d) `border-radius: 4px` の 4 つだけで作る。**`box-shadow` を足さない。**

---

## 7. Do's and Don'ts

### Do（推奨）

- **余白は必ず `--SPACING: 8px` の倍数**で書く（16 / 40 / 80 / 120px）
- サイズは `--FONT_SIZE_N` の 16 段から選ぶ。`calc(N / var(--FONT_SIZE_ROOT) * 1rem)` の書き方を踏襲する
- 本文の `line-height` は **`1.5`（単位なし）**。**モバイルでも比率を変えない**
- `border-radius` は **`4px`** で統一する
- 面を塗るのは **`#0166b3`** だけ。それ以外は白と `#d6d6d6` の罫線
- 本文の文字色は **`#333333`**
- 画像アイコンの色替えは `--FILTER_BLUE` / `--FILTER_WHITE` を使う
- 新規ページは**必ず新世代（`/dir/` 形式）側のテンプレートに合わせる**

### Don't（禁止）

- **`.html` ページのレガシースタック（`ヒラギノ角ゴ Pro W3` 先頭・`html: 10px` ・`#555555` ・`#0077cc`）を真似しない。** 2 世代が同居しているだけで、設計として残すものではない
- **`#0166b4` を使わない。** 旧世代にだけ出る 1px ずれた青。正は `#0166b3`
- **`#000000` を使わない。** 本文は `#333333`
- **`font-weight: 600` を使わない。** Google Fonts が 400/500/700 の 3 本なので **700 で描画される**
- **`box-shadow` を足さない**（実測 0 種）
- **`letter-spacing` を配らない**（実測 全要素 `normal`）
- **`font-feature-settings: "palt"` を足さない。** 書体は対応している（実測 −12.5%）が実装では 0 件
- **Roboto を「確実に出る欧文書体」として扱わない。** `@font-face` が無く、macOS / iOS では Noto Sans JP にフォールバックする
- `rem` を直接書かない。`--FONT_SIZE_N` トークン経由にする

---

## 8. Responsive Behavior

### Breakpoints

**メディアクエリのレンジ構文（`width >= Npx`）を使う**のが新世代側の特徴。

| Name | 指定 | 説明 |
|------|------|------|
| Mobile | `print, screen and (width <= 767px)` | 本文 14px |
| **Tablet 以上** | **`print, screen and (width >= 768px)`** | 本文 16px |
| Minor | `print, screen and (width >= 1275px)` / `(width >= 1315px)` | `--MINOR_BREAKPOINT: 1315px` |
| Hover 端末 | `only screen and (any-hover: hover)` | ホバー装飾を分離 |

- **旧世代（`.html`）は `only screen and (max-width: 720px)` が 3 件あるだけ。** 同じサイトで**ブレークポイントの数も書き方も違う**

### ルート・本文の実測（23 幅で測定）

| 幅 | `html` | `body` | 行間 | h1 | h2 | p |
|---|---|---|---|---|---|---|
| 1920〜768px | **16px** | **16px** | 24px（**1.50**） | 32px / 48px | 24px / 36px | 20px / 36px |
| 767〜320px | **16px** | **14px** | 21px（**1.50**） | 28px / 42px | 21px / 31.5px | 18px / 32.4px |

- **`html` は 1920px から 320px まで 16px で固定。** 流体ではない
- **崖は 768 / 767px の 1 箇所**で、本文 16 → 14px（0.875 倍）。**見出しも一律 0.875 倍**（32→28 / 24→21）
- **行間比は 1.50 のまま動かない。** 3 サイト中このサイトだけ

### タッチターゲット

- Primary ボタンは `16px` の padding ＋ 16px の文字＋行間 1.5 で高さ約 56px。**基準を満たす**
- ナビの `padding: 0 4px` は小さいので、モバイルでは縦 `--SPACING * 1.5`（12px）以上を足す

### フォントサイズの調整

- 本文 16px → 14px、見出しも一律 **0.875 倍**。行間比は 1.5 のまま

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:  #0166b3   （--COLOR_BRAND_PRIMARY・面を塗るのはこの色だけ）
Text Color:     #333333   （--COLOR_TEXT_PRIMARY）
Background:     #ffffff   （--COLOR_BASE_LIGHT）
Outline:        #d6d6d6   （--COLOR_OUTLINE_PRIMARY）
Surface Gray:   #ebebeb   （--COLOR_BACKGROUND_GRAY）
Font (JA):      "Noto Sans JP", "Noto Sans", "Noto Sans SC", "游ゴシック Medium",
                "游ゴシック体", "Yu Gothic Medium", YuGothic,
                "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif
Font (EN):      "Roboto", "Noto Sans JP", sans-serif  ※@font-face なし
Root Size:      16px（html は宣言なし＝UA 既定）
Body Size:      16px (≥768px) / 14px (≤767px)
Line Height:    1.5（単位なし・全幅共通）
Letter Spacing: normal
Font Weight:    400 / 500 / 700（600 は 700 で出る）
Spacing Base:   8px（--SPACING）
Container:      1315px（--CONTENT_WIDTH_PC）
Border Radius:  4px
Shadow:         none
```

### プロンプト例

```
マブチモーター（MABUCHI MOTOR）のデザインで作ってください。

- CSS 変数は大文字スネークケース（--COLOR_BRAND_PRIMARY 形式）で定義する
- 面を塗るのは #0166b3 だけ。それ以外は白と #d6d6d6 の罫線で組む
- 本文の文字色は #333333。純黒は使わない
- 和文は Noto Sans JP（Google Fonts の wght@400;500;700）
- 英語のセクション見出しだけ "Roboto", "Noto Sans JP", sans-serif
- サイズは --FONT_SIZE_10 〜 --FONT_SIZE_64 の 16 段を
  calc(N / var(--FONT_SIZE_ROOT) * 1rem) で定義して、そこから選ぶ
- 本文 16px / line-height 1.5（単位なし）。767px 以下で 14px、行間比は 1.5 のまま
- 余白はすべて --SPACING: 8px の倍数（16 / 40 / 80 / 120px）
- border-radius は 4px。box-shadow は一切使わない
- letter-spacing は normal。font-feature-settings も使わない
- font-weight は 400 を既定にして、500 と 700 だけ足す
- メディアクエリはレンジ構文（width >= 768px）で書く
- コンテナは max-width 1315px
```
