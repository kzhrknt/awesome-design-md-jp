# DESIGN.md — Findy（ファインディ）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-18 / 対象: `https://findy-code.io/`, `/recommends/frontend`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **青 1 色と 10 段階のグレーで組む、情報密度の高い求人 UI。** `--fcds-*` という完備したデザインシステム（192 トークン）が色・サイズ・行間・余白・角丸を全部持っている
- **密度**: 高い。求人カード・タグ・年収・フィルタを詰めて並べる。可視テキストは 1 ページ 531 要素
- **キーワード**: FCDS、太字が既定、字間ゼロ、4px の角丸、ピル型のタグ

**このサイトの核心は4つある。**

1. **`letter-spacing` を触らない。** 下層（求人一覧）は **可視 531 要素すべてが `normal`**。字間で整えず、**weight と line-height だけで階層を作る**。字間を触るのは LP だけ（後述）
2. **weight 700 が既定。** 可視 531 要素のうち **419 要素が 700**。ナビもタグも年収も見出しも太字で、**Regular(400) の方が例外**（52 要素）。`--fcds-font-weight-*` には **400 と 700 しか無い**
3. **`--fcds-*` は「使える形」で配られている。** 色は 10 段階のランプ（`blue-50` 〜 `blue-900`）、タイポグラフィは **`700 16px/1.5 "Noto Sans JP", sans-serif` のショートハンド 1 本**で完結する。`--fcds-typography-*` を `font:` に流し込むだけで組める
4. **青が 2 つある。サービス本体とランディングで別。** デザインシステムの **`--fcds-color-main: #155aa8`**（CSS 全文で 159 回）に対し、**トップの LP だけ `#0d69d2`**（40 回、**トークンに存在しない**）。**LP は FCDS の外で組まれている**

`font-feature-settings: "palt"` は **0 要素**（CSS 全文でも 0 回）。`html { font-size: 10px }` だが、**FCDS のトークンは px 宣言**（`--fcds-font-size-16: 16px`）なので rem 換算は要らない。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | トークン | 実測 |
|------|--------|----------|------|
| **Findy Blue（サービス）** | **`#155aa8`** | `--fcds-color-main` / `--fcds-color-text-blue` / `--fcds-color-text-link` | CSS 全文で **159 回**。ヘッダーの `新規登録`、リンク、アウトラインボタン、タグの枠 |
| **LP Blue（トップのみ）** | **`#0d69d2`** | **無し** | CSS 全文で **40 回**。可視 **164 要素**。トップの見出し・CTA・職種チップ |
| Blue 600 | `#3466ad` | `--fcds-color-blue-600` | `開発生産性の高い企業` などのラベル（23 要素） |
| Blue 500 | `#4076c9` | `--fcds-color-blue-500` / `--fcds-color-tag-blue` | 青タグの文字 |
| Surface Blue | `#f4f7fc` | `--fcds-color-blue-50` / `--fcds-color-surface-blue` | 青タグの面 |

> **青を 1 つに統一しない。** `#155aa8` がデザインシステムの色、`#0d69d2` はランディング専用。**サービス画面を作るなら `--fcds-color-main`、集客ページを作るなら `#0d69d2`。**

### Semantic（意味的な色）

| 役割 | 実装値 | トークン |
|------|--------|----------|
| Danger | **`#bf0615`** | `--fcds-color-accent-danger` / `red-500` |
| Danger Background | `#f8e6e7` | `--fcds-color-accent-backgroundDanger` / `red-50` |
| Success | **`#00c2a8`** | `--fcds-color-accent-success` / `green-500` |
| Success Background | `#e5f9f6` | `--fcds-color-accent-backgroundSuccess` / `green-50` |
| Warning（タグ） | `#f2cb05` / 面 `#fcf5cd` | `--fcds-color-tag-yellow` / `tag-backgroundYellow` |
| Accent（タグ） | `#f27127` / 面 `#fce3d4` | `--fcds-color-tag-orange` / `tag-backgroundOrange` |

### Neutral（ニュートラル）

| 役割 | 実装値 | トークン | 実測 |
|------|--------|----------|------|
| **Text Primary** | **`#1b2025`** | `--fcds-color-text-black` / `grey-900` | 可視 **124 要素**（下層の最多） |
| Text Primary（LP） | `#1f1f1f` | 無し | LP のリード文（153 要素）。**FCDS の `#1b2025` と別値** |
| **Text Grey** | **`#636b71`** | `--fcds-color-text-grey` / `grey-600` | 注記・補足（22 / 15 要素） |
| Text Placeholder | `#8b9195` | `--fcds-color-text-placeholder` / `grey-500` | タグの文字（**208 要素**。下層で最多） |
| Text Disabled | `#c5cdd1` | `--fcds-color-text-disabled` / `grey-300` | `いいかも` の非活性（30 要素） |
| **Border** | **`#c5cdd1`** | `--fcds-color-border` / `grey-300` | 罫線・入力欄の枠 |
| **Background Grey** | **`#f1f4f5`** | `--fcds-color-background-grey` / `surface-grey` / `grey-100` | タグの面・タブの非選択 |
| Surface Lightest | `#f8fafa` | `--fcds-color-grey-50` | 最も淡い面 |
| Background | `#ffffff` | `--fcds-color-background-white` | ページ背景（根拠 `body`） |

> **グレーは 10 段階のランプ**（`grey-50` `100` `200` `300` `400` `500` `600` `700` `800` `900`）。**中間色を自分で作らず、ランプから選ぶ。**
> `alphaGrey-*` / `alphaBlue-*` / `black-*` / `white-*` の**半透明ランプも各 10 段階**用意されている（写真の上に文字を置くときはこちら）。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（サイト唯一の和文書体）**: **Noto Sans JP**（Web フォント）。トークンは `--fcds-font-family-sans-serif: "Noto Sans JP", sans-serif`
- **`@font-face` でロードされているのは 400 と 700 の 2 ウェイトだけ**（`document.fonts` で `loaded`）
- **明朝体は使わない**

### 3.2 欧文フォント

- **専用の欧文フォントを持たない。** 数字（年収 `1,200〜2,500`）も Noto Sans JP の欧文グリフで組む
- **`Rubik` が 5 要素に指定されているが `@font-face` が無く、ロードされていない。** 実際は `system-ui` にフォールバックしている。**Rubik を前提に組まないこと**

### 3.3 font-family 指定

```css
/* サービス既定（FCDS） */
font-family: var(--fcds-font-family-sans-serif); /* "Noto Sans JP", sans-serif */

/* LP は system-ui を保険に付ける（FCDS の外） */
font-family: "Noto Sans JP", system-ui;
```

**フォールバックの考え方**:
- **和文 1 本 + generic の 2 段スタック。** ヒラギノ・游ゴシックを書かない
- **サービス側は `sans-serif`、LP 側は `system-ui`** と揃っていない。**新規実装では FCDS 側（`sans-serif`）に寄せる**
- **400 と 700 以外のウェイトを前提にしない。** 実サイトは下層の職種リストに `weight: 300` を指定しているが、**300 はロードされていない**（合成 or 400 で描画される）

### 3.4 文字サイズ・ウェイト階層

**FCDS のタイポグラフィトークンは `font:` ショートハンドで配られている。**

| Token | 値 |
|-------|-----|
| `--fcds-typography-heading-4xl` | `700 64px/1.25 "Noto Sans JP", sans-serif` |
| `--fcds-typography-heading-3xl` | `700 40px/1.25` |
| `--fcds-typography-heading-xxl` | `700 32px/1.5` |
| `--fcds-typography-heading-xl` | `700 24px/1.5` |
| `--fcds-typography-heading-l` | `700 18px/1.5` |
| `--fcds-typography-heading-m` | `700 16px/1.5` |
| `--fcds-typography-heading-s` | `700 14px/1.5` |
| `--fcds-typography-text-body-{l,m,s,xs,xxs}-{bold,regular}` | `700/400 18/16/14/12/10px` × `1.5`（`xxs` のみ `1.25`） |
| `--fcds-typography-text-article-{l,m}-{bold,regular}` | `700/400 18/16px` × **`1.75`**（**記事だけ行間 1.75**） |

**実測との対応:**

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| **LP Hero** | **68px**（≤1279px で 56px） | **700** | **1.17** | **-0.02em**（-1.36px / -1.12px） | `つくる人の経験を、次の舞台へ。` 色 `#0d69d2`。**サイト唯一の負の字間** |
| LP Section Heading | 40px | 700 | 1.25 | **1.6px** | `AI分析と人の両面からより良いマッチングへ` |
| Page Title（下層） | 32px | 700 | 1.5 | **normal** | `フロントエンドエンジニアの転職・求人情報` |
| List Heading | 24px | 700 | 1.5 | normal | `求人一覧` |
| **Job Title** | **18px** | **700** | **1.5** | normal | 求人カードの見出し（62 要素） |
| LP Lead | 18px | **500** | 1.5 | normal | **500 はロードされていない**（トークンにも無い） |
| **Nav / Tab** | **14px** | **700** | **1.5** (21px) | normal | `求人` `メディア`（180 要素） |
| **Body / UI** | **12px** | **700 / 400** | **1.5〜1.6** | normal | **最多（252 要素）** |
| Tag | 12px | 700 | 1.5 | normal | `Go` `Dart`。色 `#8b9195` / 面 `#f1f4f5` |
| Caption / 注記 | 10px | 400 | **1.25** | normal | `※1：2025年 年間実績`。色 `#636b71` |
| **職種リスト（下層）** | 14px | **300** | 1.6 | normal | **300 は未ロード。実際は 400 相当で描画される** |

### 3.5 行間・字間

- **行間は 4 段階しかない**: `--fcds-line-height-100 / 125 / 150 / 175` = **1 / 1.25 / 1.5 / 1.75**
  - **UI は 1.5**（可視 433 要素で最多）／**記事は 1.75**／**1 行で収めるラベルは 1**（241 要素）／**注記と大見出しは 1.25**
- **字間は `normal` が既定。** 下層は **可視 531 要素すべて normal**
- **字間を触るのは LP だけ**:

| 用途 | 値 | 実測 |
|------|----|------|
| ヒーロー見出し | **`-0.02em`** | 1 要素（68px で -1.36px、56px で -1.12px） |
| セクション見出し（40px） | `1.6px` | 8 要素 |
| CTA（20px） | `0.8px` | 6 要素 |
| タグ・ラベル（10px） | `1px` | 72 要素 |
| ピル（12px） | `1.2px` | 6 要素 |

**ガイドライン**:
- **サービス画面では `letter-spacing` を書かない。** FCDS に字間のトークンは 1 つも無い
- **LP で字間を足すときは「大きい見出しは負、小さいラベルは正」**。ヒーローだけ `-0.02em` で締め、10〜12px のラベルは `1px` 前後空ける
- **行間は 1.5 を既定にし、記事本文だけ 1.75。** 1.6 / 1.7 のような中間値を作らない
- **太字を既定にする。** UI ラベル・ナビ・タグ・年収はすべて 700。**400 は本文と注記だけ**

### 3.6 禁則処理・改行ルール

- 求人タイトルは 2 行で切る前提（18px / 1.5 / カード幅 767px 以下）
- 年収の数字（`1,200〜2,500`）と単位（`万円`）はサイズを変えて同じ行に置く（24px / 12px）
- `word-break: break-all` は使わない

### 3.7 OpenType 機能

**このサイトは `font-feature-settings` を一切使っていない**（実測 0 要素 / CSS 全文で `palt` 0 回）。

- **`palt` を足さないこと。** Noto Sans JP の素の字送りのまま、`letter-spacing: normal` で組むのがこのサイトの設計
- **数字を揃えるための `tnum` も使っていない。** 年収の桁揃えはレイアウト側（右寄せ）で行う

### 3.8 縦書き

該当なし（`typography.verticalWriting` = 0 件）。

---

## 4. Component Stylings

**角丸は 4 段階のトークン**: `--fcds-radius-s: 4px` / `m: 8px` / `l: 16px` / `full: 9999px`。
**既定は `4px`**（可視 280 要素）。LP には `100px` のピルも出るが**これはトークン外**。

### Buttons

**Primary（ヘッダーの `新規登録`）**
- Background: **`#155aa8`**（`--fcds-color-main`） / Text: `#ffffff`
- Padding: **`8px 16px`**
- Border Radius: **`4px`**（`--fcds-radius-s`）
- Font: **12px / weight 700 / line-height 1.45**

**Primary Large（LP の `新規登録はこちら`）**
- Background: **`#0d69d2`**（LP 専用） / Text: `#ffffff`
- Padding: **`20px 48px`**
- Border Radius: **`9999px`**（`--fcds-radius-full`）
- Font: **20px / weight 700 / letter-spacing 0.8px**

**Secondary / Outlined（`詳しい条件を追加`）**
- Background: `#ffffff` / Text: **`#155aa8`**
- Border: **`1px solid #155aa8`**
- Padding: **`8px 16px`** / Border Radius: **`4px`**
- Font: 16px / weight 700

**Outlined Pill（LP の `求人を見る`）**
- Background: `#ffffff` / Text: **`#0d69d2`**
- Border: `1px solid #0d69d2` / Border Radius: **`9999px`**
- Padding: **`10px 24px`** / Font: 14px / weight 700 / letter-spacing 0.56px
- Shadow: **`0 20px 36px rgba(201, 210, 220, 0.3)`**

**Disabled（`いいかも`）**
- Background: `#f1f4f5` / Text: `#c5cdd1` / Border: `1px solid #f1f4f5`
- Padding: `8px 20px` / Border Radius: `4px` / Font: 18px / weight 700

### Badges / Chips

**Tag（技術スタック `Go` `Dart`）**
- Background: **`#f1f4f5`**（`--fcds-color-grey-100`） / Text: **`#8b9195`**（`grey-500`）
- Padding: **`4px 8px`** / Border Radius: **`4px`**
- Font: **12px / weight 700**

**Condition Tag（`フルリモート可` `副業可能`）**
- Background: `#ffffff` / Text: **`#155aa8`**
- **Border ではなく `box-shadow: inset 0 0 0 1px #155aa8`**（**1px の枠をレイアウトに影響させないための実装**）
- Padding: `4px 8px` / Border Radius: `4px` / Font: 12px / weight 700

**Feature Pill（`開発生産性の高い企業`）**
- Background: **`#f4f7fc`**（`blue-50`） / Text: **`#3466ad`**（`blue-600`）
- Padding: `4px 8px` / Border Radius: **`9999px`** / Font: 12px / weight 400

**Category Chip（LP の `PdM` `エンジニア`）**
- Background: `#ffffff` / Text: **`#0d69d2`**
- Padding: `5.7px 15.5px` / Border Radius: `9999px` / Font: 14〜16px / weight 700

### Inputs

- Background: `#f5f5f5`（フィルタ）/ `#ffffff`（検索欄）
- Border Radius: **`4px`** / Padding: **`6px 12px`**
- Font: 12px / weight 400 / Text: `#1b2025`
- Placeholder: `#8b9195`（`--fcds-color-text-placeholder`）

### Cards

**Search Panel / Job Card**
- Background: `#ffffff` / Border Radius: **`8px`**（`--fcds-radius-m`）
- Shadow: **`0 3px 6px rgba(44, 40, 40, 0.11)`**（可視 31 要素）

**LP Card**
- Border Radius: `8px`
- Shadow: **`0 16px 14px rgba(201, 210, 220, 0.2)`**（可視 36 要素）

### Tabs

- 選択: 背景 `#ffffff` / 非選択: **`#f1f4f5`**
- Border Radius: **`4px 4px 0 0`** / Padding: `12px` / Font: 14px / weight 400〜700

### Pagination

- Border: `1px solid #dddddd` / Text: `#777777` / Padding: `6px 12px`
- 両端だけ角丸（`4px 0 0 4px` / `0 4px 4px 0`）、現在ページは **`#055ec1`** の面に白文字

---

## 5. Layout Principles

### Spacing Scale

**`--fcds-spacing-*` の 11 段階。4px グリッド。**

| Token | Value |
|-------|-------|
| `4xs` | 2px |
| `3xs` | 4px |
| `xxs` | 8px |
| `xs` | 12px |
| `m` | 16px |
| `l` | 20px |
| `xl` | 24px |
| `xxl` | 32px |
| `3xl` | 40px |
| `4xl` | 48px |
| `5xl` | 64px |

> **`s` が無く `xs` の次が `m`。** トークン名を勝手に補完しない。

### Container

- **LP: 1080px**（実測 3 要素で最頻。1084 / 1108px の派生あり）
- **サービス画面: 1200px**（CSS 全文で 6 回）／ 1088px
- カード幅の上限: 767px（モバイルのブレークポイントと同値）

### Grid

- 求人一覧は「フィルタ（左サイド）／カードの縦積み（右）」の 2 カラム
- LP は 1 カラムを中央寄せ。企業カードだけ横スクロールのカルーセル

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|------|
| 0 | `none` | ボタン・タグ・タブの既定 | — |
| **1** | **`0 3px 6px rgba(44, 40, 40, 0.11)`** | **サービス画面のカード・検索パネル** | 31 要素 |
| 1'（枠） | `inset 0 0 0 1px #155aa8` | 条件タグの 1px 枠（**border の代用**） | 26 要素 |
| **2** | **`0 16px 14px rgba(201, 210, 220, 0.2)`** | **LP の企業カード** | 36 要素 |
| 3 | `0 20px 36px rgba(201, 210, 220, 0.3)` | LP の CTA ボタン | 49 要素 |

> **影の色が 2 系統ある。** サービス側は**黒寄り**（`rgba(44,40,40,.11)`）、LP 側は**青みがかったグレー**（`rgba(201,210,220,.2〜.3)`）。**LP の影は下に大きくぼかす**（`20px 36px`）のが特徴。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`--fcds-*` トークンを使う。** 色はランプ（`grey-50`〜`grey-900`）から選び、中間色を作らない
- **タイポグラフィは `font:` ショートハンドで当てる**（`font: var(--fcds-typography-heading-m)`）
- **`letter-spacing` を書かない。** サービス画面の既定は `normal`
- **weight 700 を既定に**、本文と注記だけ 400
- **行間は 1.5、記事本文だけ 1.75**
- **角丸は 4px**（カードは 8px、ピルは 9999px）
- **余白は 4px グリッド**（2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64px）
- サービス画面の青は **`#155aa8`**、ランディングの青は **`#0d69d2`** と使い分ける
- **1px の枠が要るが寸法を動かしたくないときは `box-shadow: inset 0 0 0 1px`**

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素）
- **日本語に `letter-spacing` を足さない**（下層は 531/531 が `normal`）
- **weight 300 / 500 を前提にしない。** ロードされているのは **400 と 700 だけ**。実サイトが 300 を指定している箇所は**描画されていない指定**
- **`Rubik` を前提にしない**（`@font-face` が無く、`system-ui` に落ちる）
- **青を 1 色に統一しない**（`#155aa8` と `#0d69d2` は役割が違う）
- **行間に 1.6 / 1.7 を作らない**（トークンは 1 / 1.25 / 1.5 / 1.75 の 4 つだけ）
- **spacing に `s` は無い**（`xs` 12px の次は `m` 16px）
- `--rt-*`（react-tooltip）と `--agentation-*` は**サードパーティのトークン。設計値として読まない**

---

## 8. Responsive Behavior

### Breakpoints

**Bootstrap 由来の `.98px` と、自前の値が混在している。**

| Name | Width | 出現数 | 出自 |
|------|-------|--------|------|
| **Mobile** | **≤ 767.98px** | **243** | Bootstrap（最頻） |
| Mobile（自前） | ≤ 767px | 46 | 自前 |
| SP-S | ≤ 575.98px | 45 | Bootstrap |
| **Tablet 以上** | **≥ 768px** | **108** | 自前 |
| Tablet | ≤ 1023.98px | 121 | Bootstrap |
| PC | ≤ 1087.98px | 44 | Bootstrap 拡張 |
| **PC-L** | **≥ 1140px** | **29** | 自前 |
| PC-XL | ≥ 1360px / ≥ 1440px | 25 / 22 | 自前 |
| Mid | ≥ 560px | 28 | 自前 |

- **新規実装では `768px` を境にする**（`max-width: 767.98px` / `min-width: 768px`）。`.98` は Bootstrap の慣習をそのまま引き継いだもので、**自分で新設しない**

### タッチターゲット

- `新規登録`（12px + 上下 8px ≒ 33px 高）、タグ（12px + 上下 4px ≒ 26px 高）は **44px を下回る**
- **モバイルでは主要 CTA の高さを 44px 以上にすること**（LP の `新規登録はこちら` は `20px 48px` の padding で満たしている）

### フォントサイズの調整

- **LP のヒーローだけ可変**: **≥1280px で 68px / -1.36px、≤1279px で 56px / -1.12px**。**`letter-spacing: -0.02em` と em で書いてあるので、サイズを変えても比率が保たれる**
- サービス画面の 12 / 14 / 18px はブレークポイントをまたいで固定

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Findy Blue (service): #155aa8   --fcds-color-main
LP Blue:              #0d69d2   （トークン外・LPのみ）
Text:                 #1b2025   --fcds-color-text-black
Text Grey:            #636b71   --fcds-color-text-grey
Placeholder/Tag Text: #8b9195   --fcds-color-grey-500
Border:               #c5cdd1   --fcds-color-border
Surface Grey:         #f1f4f5   --fcds-color-background-grey
Surface Blue:         #f4f7fc   --fcds-color-blue-50
Danger / Success:     #bf0615 / #00c2a8
Background:           #ffffff

Font: "Noto Sans JP", sans-serif   ※ロードされているのは 400 と 700 だけ
Body:    12px / weight 700 / line-height 1.5 / letter-spacing normal
Heading: 700 16px/1.5（--fcds-typography-heading-m）
Article: 400 16px/1.75（--fcds-typography-text-article-m-regular）
Line heights: 1 / 1.25 / 1.5 / 1.75 の4つだけ
Radius: 4px（s）/ 8px（m）/ 16px（l）/ 9999px（full）
Spacing: 2/4/8/12/16/20/24/32/40/48/64px
Card Shadow: 0 3px 6px rgba(44,40,40,.11)
Breakpoints: 767.98px / 768px / 1140px
palt: 使わない / letter-spacing: 書かない
```

### プロンプト例

```
Findy のデザインシステム（FCDS）に従って、エンジニア求人の一覧ページを作成してください。
- font-family は "Noto Sans JP", sans-serif。weight は 400 と 700 だけを使う（300/500 は使わない）
- letter-spacing は書かない（すべて normal）
- font-feature-settings: "palt" は使わない
- 行間は 1.5 を既定にし、記事本文だけ 1.75。1.6 や 1.7 は作らない
- UI テキストは 12px / weight 700、求人タイトルは 18px / weight 700 / line-height 1.5
- プライマリ色は #155aa8。ボタンは padding 8px 16px / border-radius 4px / 12px weight 700
- 技術タグは 背景 #f1f4f5 / 文字 #8b9195 / 12px weight 700 / padding 4px 8px / radius 4px
- 条件タグ（フルリモート可）は白地に box-shadow: inset 0 0 0 1px #155aa8 で枠を作る
- カードは border-radius 8px / box-shadow 0 3px 6px rgba(44,40,40,0.11)
- 余白は 4px グリッド（8/12/16/20/24/32px）、コンテナは 1200px
- ブレークポイントは max-width 767.98px と min-width 768px
```
