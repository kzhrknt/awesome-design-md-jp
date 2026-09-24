# DESIGN.md — 近畿日本鉄道（Kintetsu Railway）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-22 / 対象: `https://www.kintetsu.co.jp/`, `/tetsudo/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **太字を使わない。** ウェイトは 400 と 500 の2段だけで、階層はサイズと色で作る。字間は `body` に `0.04em` を1回書いて継承させ、`palt` を全面に当てる
- **密度**: 低い。白地に 1280px のコンテナ、20px 角丸のカードと 900px（pill）のボタン
- **キーワード**: 400/500 の2段だけ、palt 全面、0.04em の継承、紺青の影、CI ブルー一色

**このサイトの核心は5つある。**

1. **`font-weight` は 400（114 要素）と 500（42 要素）しかない。700 は 1 要素も無い。** `@font-face` も **Noto Sans JP の 400 と 500 の2本だけ**が `loaded`。**見出しを太字にすると別物になる**
2. **`letter-spacing` は `body` に `0.04em` を1回。** 実測は **`0.64px`（16px × 0.04）が 147/156 要素**。`font-size` が 14px でも 44px でも **0.64px のまま継承される**。**「サイズ × 0.04em」と読み替えて再実装しない**
3. **`font-feature-settings: "palt"` が 846 要素（トップ）／ 699 要素（下層）**。全面適用
4. **CSS Custom Properties は 0 個。** 色も余白も生値で書かれている。**トークンが無いこと自体が設計の実態**なので、再実装では下の色表をトークン化して使う
5. **影に色が付いている。** 黒ではなく **`rgba(5, 48, 81, α)`（紺）**、しかも **`5px 8px 30px` と X 方向に 5px ずらす**。透明度だけを 0.08 / 0.1 / 0.35 と変えて3段にしている

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|---|---|---|
| **近鉄ブルー** | **`#0068b7`** | **背景として 234 要素・文字として 19 要素。** ナビ、CTA、アイコン、リンクのすべて |
| **アクセント（特急券）** | **`#f8b500`** | **可視 3 要素。** `特急券購入` のボタンだけに使う黄色 |

> **ブランド色は 1 色。** ナビゲーションの面、pill ボタンの面、リンク文字、アイコンがすべて `#0068b7`。**黄色は「特急券を買う」という単一の動線にしか出てこない**ので、他の CTA に流用しない。

### Semantic（意味的な色）

- **Info Blue** (`#2891e1`): `遅延証明書` タイルの面（運行情報バーの中で唯一明度が高い青）
- **Pale Blue** (`#c2e0f6`): `列車走行位置` タイルの面
- **Steel Blue** (`#6094bb`): `デジタルきっぷ` タイルの面
- **Brown** (`#755735`): 沿線まちづくりセクションの本文色（可視 1 要素）

> **運行情報バーは5つのタイルで色を変えている**（`#0068b7` / `#c2e0f6` / `#2891e1` / `#f8b500` / `#6094bb`）。**機能ごとに色を割り当てる**のがこのサイトの流儀。

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 見出し・本文。**可視 52 要素**
- **Text Secondary** (`#444444`): 下層リンク・小見出し。可視 14 要素
- **Text Muted** (`#666666`): 日付。**可視 37 要素**
- **Text Footer** (`#888888`): フッターのユーティリティリンク。可視 6 要素
- **Background** (`#ffffff`): **ページの地色**（`pageBackground.resolved` / 根拠 `viewportTopBySample 3/3`）
- **Surface Blue 1** (`#f2f8ff`): `電車に乗る` セクションの面
- **Surface Blue 2** (`#f8fbff`): カードの面
- **Surface Blue 3** (`#deeffc`): ヒーロー下の帯
- **Surface Gray Blue** (`#edf2f8`): お知らせ・ニュースリリースのセクション
- **Border** (`#ccd2d6`): 検索・お知らせ pill の枠

> **地色は白、セクションの面は青みのオフホワイト 4 種**（`#f2f8ff` / `#f8fbff` / `#deeffc` / `#edf2f8`）。**グレーの面を使わない**のがこのサイトの特徴。

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP**（`@font-face` は **400 と 500 の2本だけ**。どちらも `loaded`）
- フォールバックは **游ゴシック体 → 游ゴシック → ヒラギノ角ゴ ProN → Hiragino Sans → Verdana → メイリオ**
- `slick`（カルーセルのアイコンフォント）は `status: error`。**トップのアイコン欠けはこれが原因**で、本文の描画には影響しない

> **`@font-face` に 700 が無い。** CSS 側でも 700 を指定していないので合成太字は起きていないが、**新規実装で `font-weight: 700` を書くとブラウザの合成太字になり、サイトの印象が変わる**。

### 3.2 欧文フォント

- **専用の欧文フォントを読み込んでいない。** 数字・英字も Noto Sans JP のグリフで組む
- スタック中の `Verdana` は和文フォントが無い環境向けの保険

### 3.3 font-family 指定

```css
body {
  font-family: "Noto Sans JP", 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic",
               "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", ヒラギノ角ゴシック,
               "Hiragino Sans", Verdana, メイリオ, Meiryo, sans-serif;
  font-size: 16px;
  line-height: 1.6;          /* → 25.6px */
  letter-spacing: 0.04em;    /* → 0.64px。子要素はこの px を継承する */
}
```

**フォールバックの考え方**:
- **和文優先・Web フォント先頭。** Noto Sans JP が来なければ OS の游ゴシック → ヒラギノ → メイリオ
- **156 要素すべてがこの 1 スタック**。ページ内に別系統のフォントが無い（外部ウィジェットの混入も無い）

### 3.4 文字サイズ・ウェイト階層

`html { font-size: 16px }`。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|---|---|---|---|---|---|---|
| **Page Title** | Noto Sans JP | **44px** | **400** | 57.2px (1.30) | 0.64px | `電車に乗る` `お知らせ・ニュースリリース` |
| Section Heading | Noto Sans JP | **38px** | **400** | 60.8px (1.60) | 0.64px | 下層の h3 |
| Heading 2 | Noto Sans JP | **26px** | **400** | 33.8px (1.30) | 0.64px | `お知らせ` `お得なきっぷ` |
| **Card Label** | Noto Sans JP | **20px** | **500** | 32px (1.60) | 0.64px | `しまかぜ` `ひのとり` |
| Sub Heading | Noto Sans JP | 18px | **500** | 28.8px (1.60) | 0.64px | `ダイヤ案内（乗換検索）` |
| **Body** | Noto Sans JP | **16px** | **400** | **25.6px (1.60)** | **0.64px** | body の既定 |
| Lead | Noto Sans JP | 15px | 400 | 19.5px (1.30) | 0.64px | 運行情報の文言 |
| **List / Nav** | Noto Sans JP | **14px** | 400 | 18.2px (1.30) | 0.64px | **可視 50 要素で最多** |
| Footer | Noto Sans JP | 13px | 400 | 20.8px (1.60) | 0.64px | `サイトマップ` ほか |

**サイズ分布（トップ）**: 14px (50) / 16px (44) / 15px (11) / 18px (10) / 20px (6) / 26px (6) / 13px (6) / 44px (5)

**ウェイト分布**: **400 (114)** / **500 (42)**。**700 は 0**

> **階層は「サイズ ＋ 色」で作る。** 見出しは 44px でも 400 のまま。太らせるのは 18〜20px のカードラベルだけ（500）。

### 3.5 行間・字間

- **行間は 1.60 と 1.30 の2値**（トップ: 1.60 が 103 要素 / 1.30 が 43 要素）
  - **1.60** … 本文・カードラベル・セクション見出し
  - **1.30** … ニュース一覧・ナビ・リード文（**行数を稼ぎたい一覧系**）
- **字間は `body` に 1回だけ**:

| 値 | em 換算 | 対象 | 実測 |
|---|---|---|---|
| **0.64px** | **0.04em（16px 基準）** | **既定。ほぼ全要素** | **147 / 138 要素** |
| 0.56px | 0.04em（14px 基準） | 下層の一部の `p`（**再宣言している例外**） | 2 要素 |
| `normal` | — | カルーセルの `Previous` / `Next` / ページ番号 | 9 要素 |

**ガイドライン**:
- **`body` に `letter-spacing: 0.04em` と書き、子要素で再宣言しない**
- 一覧・ナビは `line-height: 1.3`、読ませる文章は `1.6`

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- ニュースの見出しは `line-height: 1.3` で 2〜3 行に折り返す前提

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* 846 要素（トップ）／ 699 要素（下層） */
```

- **全面適用。** 見出しだけでなく本文・ナビ・フッターまで `palt` が効いている
- **`palt` ＋ `0.04em` の組み合わせ**が字送りの正体。片方だけでは再現できない

### 3.8 縦書き

該当なし（実測 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（青の pill）**
- Background: **`#0068b7`** / Text: `#ffffff`
- Border Radius: **`900px`**（実装は `9999px` ではなく `900px`）
- Font: **16px / weight 500 / letter-spacing 0.64px**
- Padding: `9px 25px 6px`（**下より上を 3px 多く取る**＝和文のベースライン補正）

**Outlined（白地・青枠 pill）**
- Background: `#ffffff` / Text: **`#0068b7`**
- Border: **`2px solid #0068b7`** / Border Radius: `900px`
- Font: 16px / weight 500 / Padding: `18px 40px`

**Accent（特急券＝黄色 pill）**
- Background: **`#f8b500`** / Text: `#222222`
- Border Radius: `900px` / Font: 18px / weight 500
- Shadow: `5px 8px 30px rgba(4, 65, 102, .12)`

**Tile（運行情報バー）**
- Background: 機能ごとに `#0068b7` / `#c2e0f6` / `#2891e1` / `#f8b500` / `#6094bb`
- Border Radius: **`5px`** / Padding: `14px 15px` / Font: 14〜16px / weight 400〜500

**Note（お知らせ pill）**
- Background: `#ffffff` / Border: `1px solid #ccd2d6` / Border Radius: `900px`
- Padding: **`15px 15px 15px 40px`**（左にアイコン分のアキ）/ Font: 15px / 500

### Cards

- Background: `#ffffff` / **Border: `4px solid #ffffff`** / Border Radius: **`20px`**
- Padding: `35px 30px 38px`
- Shadow: `5px 8px 30px rgba(5, 48, 81, .08)`

### Links

- 文字色は本文色のまま（`#222222` / `#444444`）、**下線は `padding-bottom: 1px` の境界で表現**
- アイコン・矢印だけ `#0068b7`

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|---|---|---|
| XS | 5px | タイルの角丸・小さな内余白 |
| S | 15px | ボタン内余白 |
| M | 25〜30px | カード内余白 |
| L | 35〜40px | カード上下・pill の左右 |

### Container

- **Max Width: `1280px`**（トップ 13 要素 / 下層 14 要素）
- モバイル向けの内側コンテナ: `345px`

### Grid

- `gap` を使っていない（実測 0 件）。**余白は `margin` / `padding` で作っている**

---

## 6. Depth & Elevation

**影はすべて `5px 8px 30px`。X に 5px ずらす。色は紺（`rgba(5,48,81, α)`）。**

| Level | Shadow | 用途 | 実測 |
|---|---|---|---|
| 0 | `none` | ボタン・タイル | — |
| **1** | `5px 8px 30px rgba(5,48,81,.08)` | 通常のカード | 3 要素 |
| **2** | `5px 8px 30px rgba(5,48,81,.1)` | 特集カード | 8 要素 |
| **3** | `5px 8px 30px rgba(5,48,81,.35)` | **特急車両のカード（`しまかぜ` `ひのとり`）** | **9 要素** |
| （黄色 CTA） | `5px 8px 30px rgba(4,65,102,.12)` | `特急券購入` | 1 要素 |

> **黒い影を使わない。** `rgba(0,0,0,…)` は 1 件も無い。

---

## 7. Do's and Don'ts

### Do（推奨）

- **ウェイトは 400 と 500 だけを使う。** 強調はサイズと色で作る
- **`body` に `letter-spacing: 0.04em` を1回だけ書く**（子要素で再宣言しない）
- **`font-feature-settings: "palt"` を全体に当てる**
- 行間は**読ませる文章 1.6 / 一覧 1.3** の2値に寄せる
- 影は**紺 `rgba(5,48,81,α)` の `5px 8px 30px`**、濃さだけ変える
- ボタンは pill（`900px`）、カードは `20px`、タイルは `5px` の3段で角丸を使い分ける

### Don't（禁止）

- **`font-weight: 700` を使わない**（`@font-face` に無く、合成太字になる）
- **黄色 `#f8b500` を一般の CTA に使わない**（特急券の動線専用）
- 黒い影（`rgba(0,0,0,…)`）を使わない
- グレーの面（`#f5f5f5` 等）を使わない。面は**青みのオフホワイト**から選ぶ
- 字間を「サイズ × 0.04em」で計算し直さない（**px の継承が正**）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|---|---|---|
| **Mobile** | **≤ 950.98px** | `only screen and (max-width: 950.98px)` が 1580 件 |
| **Desktop** | **≥ 951px** | **`print, screen and (min-width: 951px)` が 1618 件** |
| 補助 | 870.98px / 1100px | 18 件 / 数件 |

**951px の単一ブレークポイント設計**。**`print` を PC 側のクエリに含めている**（印刷時に PC レイアウトで出す）。

### タッチターゲット

- pill ボタンは `padding: 18px 40px` で 56px 前後、運行情報タイルは `14px 15px` ＋ 行送りで 44px 以上

### フォントサイズの調整

- 見出しは 44px → SP では 26〜28px 相当。本文 16px・一覧 14px は据え置き

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary:    #0068b7
Accent:     #f8b500（特急券の動線のみ）
Text:       #222222 / Secondary #444444 / Muted #666666
Background: #ffffff / Surface #f2f8ff, #f8fbff, #deeffc, #edf2f8
Font: "Noto Sans JP", 游ゴシック体, YuGothic, "ヒラギノ角ゴ ProN", Verdana, メイリオ, sans-serif
Body: 16px / line-height 1.6 / letter-spacing 0.04em（body に1回だけ）
font-weight: 400 と 500 のみ（700 は使わない）
font-feature-settings: "palt"
Radius: 900px (button) / 20px (card) / 5px (tile)
Shadow: 5px 8px 30px rgba(5,48,81,.08 | .1 | .35)
```

### プロンプト例

```
近鉄のデザインシステムに従って、駅情報の検索カードを作ってください。
- font-family は上記スタック、body に letter-spacing: 0.04em を1回だけ書いて継承させる
- font-feature-settings: "palt" を全体に当てる
- 見出しは 26px / weight 400 / line-height 1.3（太字にしない）
- ラベルは 18px / weight 500
- カードは白地・radius 20px・border 4px solid #ffffff・影は 5px 8px 30px rgba(5,48,81,.08)
- 検索ボタンは #0068b7 の面・白文字・radius 900px・16px/500・padding 18px 40px
- 補助リンクは #666666、アイコンだけ #0068b7
```
