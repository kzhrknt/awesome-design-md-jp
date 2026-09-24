# DESIGN.md — 京王電鉄（Keio Corporation）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-22 / 対象: `https://www.keio.co.jp/`, `/train/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **`html` のルートが 10px。** `rem` がそのまま「px ÷ 10」になる設計。字間は `body` の `0.4px` を全要素に継承させ、`palt` は使わない
- **密度**: 低い。白地に 1280px、**影 1 種類（`0 4px 24px rgba(0,25,65,.12)`）だけ**でカードを浮かせる
- **キーワード**: ルート 10px、紺 ＋ マゼンタの2色、palt なし、影は1種類、Oswald の数字

**このサイトの核心は5つある。**

1. **`html { font-size: 10px }`。** `body` も 10px。**すべての `rem` が ×10 で計算される**（`1.4rem` = 14px）。**16px 前提で読み替えると全サイズが 1.6 倍ずれる**
2. **`letter-spacing` は `body` の `0.4px` を継承**（可視 216 / 233 要素）。10px × 0.04em の結果を、**14px でも 50px でも 0.4px のまま**受け継ぐ。**大きい見出しほど相対的に詰まって見える**のがこのサイトの字面
3. **`font-feature-settings` は 0 件。** `palt` を使っていない。**字送りは `letter-spacing` の継承だけ**で作る
4. **ブランドは紺 `#0f3675` ＋ マゼンタ `#d6007f` の2色。** 紺が構造（ナビ・アイコン・見出し）、マゼンタが強調（`あなた`・タグ・`チケットレスサービス`）
5. **影は 1 種類しかない。** `0 4px 24px rgba(0,25,65,.12)` が **123 要素**。黒ではなく紺を薄めた影で、**ヘッダー・カード・パネルすべてが同じ深さ**

> **CSS Custom Properties は 0 個**（トップ・下層とも）。色も余白も生値。**再実装では下の表をトークン化して使う。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|---|---|---|
| **京王ネイビー** | **`#0f3675`** | **背景として 26 要素・文字として 9 要素。** ヘッダーの `京王アプリ`、丸ボタン、h1、アイコン |
| **京王マゼンタ** | **`#d6007f`** | **背景として 6 要素・文字として 3 要素。** ヒーローの `あなた`、エリアタブ、`チケットレスサービス` |

> **色の役割分担が明確。** 紺＝構造・信頼（運行情報、ナビ、ボタンの枠）、マゼンタ＝人・生活（ヒーローのコピー中の「あなた」だけ、記事のカテゴリタグ）。**マゼンタを面で広く使わない**（最大でもタブとボタン1つ分）。

### Semantic（意味的な色）

- **Cyan** (`#0175ab`): 座席指定列車（`京王ライナー`）の帯（可視 1 要素）
- **Slate** (`#27455c`): 画像上のオーバーレイ（可視 8 要素）

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文・ナビ。**可視 96 要素で最多**
- **Text Heading** (`#222222`): カード見出し・記事タイトル。可視 34 要素
- **Text Muted** (`#555555`): 日付・説明文。可視 13 要素
- **Background** (`#ffffff`): **ページの地色**（`pageBackground.resolved` / 根拠 `viewportTopBySample 2/3`）
- **Surface Cool** (`#eff3f6`): 固定サイドメニュー（`遅延証明書`）の面
- **Surface Dark** (`#333333`): フッターの面（可視 44 要素）
- **Border Light** (`#cccccc`): 区切り線（可視 20 要素）
- **Surface Pale Blue** (`#cddcf2`): グローバルナビのホバー面

### グラデーション（セクション見出し）

```css
/* 「暮らす」「おでかけ」などのセクション帯 */
background-image: linear-gradient(-30deg, #f8edf4, #e8f4fb);
```

**マゼンタ寄りの桜色 → 紺寄りの水色**。ブランド2色をそれぞれ極端に薄めて -30deg でつないでいる。

### 外部由来（採用しない）

- **`#000088`**: **OneTrust（クッキー同意）のボタン。可視 7 要素**。`クッキー設定` `OK` `全てのクッキーを受け入れる` など。**サイトの色ではない**
- **`#3860be`**: 同 CMP のリンク色 / 検索ウィジェットのアイコン面
- CMP のテキストは `13.008px` `0.13008px` `font-weight: 600` と**このサイトに存在しない値**で出る。分布にこの半端な数値が出たら CMP と判断してよい

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP 一本**（`@font-face` は **300 / 400 / 500 / 700 の4本**。4本とも `loaded`）
- **フォールバックは `sans-serif` のみ。** OS 和文（ヒラギノ・游ゴシック・メイリオ）を並べていない

> **`font-weight: 100` を 1 要素で指定している**（フッターのコピーライト）。**`@font-face` に 100 は無い**ので、実際には最も近い **300 で描かれる**。設計意図ほど細くならない。**新規実装で 100 を当てない。**

### 3.2 欧文フォント

- **Oswald**（`@font-face` は 300 / 400 / 500 / 700 を宣言しているが、**`loaded` は 400 だけ**）
- 用途は **`TOPICS` の見出しと `01` `02` … の連番**（可視 9 要素）。**300 / 500 / 700 を指定しても 400 で出る**

### 3.3 font-family 指定

```css
html { font-size: 10px; }          /* ← rem は px ÷ 10 */

body {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 10px;                 /* 1.0rem */
  line-height: 1.15;               /* → 11.5px */
  letter-spacing: 0.4px;           /* 子要素はこの px を継承する */
  color: #333333;
}

/* 連番・英字見出し */
font-family: Oswald, sans-serif;   /* 実効ウェイトは 400 のみ */
```

**フォールバックの考え方**:
- **Web フォント1本 ＋ `sans-serif`。** Noto Sans JP が落ちると OS 既定に飛ぶ割り切った構成
- **Windows の游ゴシック問題は「そもそも游ゴシックを使わない」ことで回避している**（収録サイトで初出の解き方）

### 3.4 文字サイズ・ウェイト階層

**`html` が 10px** なので、CSS 上の `rem` は「表示 px ÷ 10」。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|---|---|---|---|---|---|---|
| **Hero / h1** | Noto Sans JP | **52px** (5.2rem) | **500** | 72.8px (1.40) | 0.4px | 色は `#0f3675`。`あなた` のみ `#d6007f` |
| **Section Heading** | Noto Sans JP | **50px** (5.0rem) | **500** | 70px (1.40) | 0.4px | `電車に乗る` `暮らす` |
| Heading 2 | Noto Sans JP | 40px (4.0rem) | 500 | 56px (1.40) | 0.4px | |
| English Heading | **Oswald** | 28px / 22px | 400 | 1.40 | 0.4px | `TOPICS` |
| Card Label (L) | Noto Sans JP | **22px** (2.2rem) | **500** | 30.8px (1.40) | 0.4px | 下層のカード見出し |
| Card Label | Noto Sans JP | **18px** (1.8rem) | **500** | 25.2px (1.40) | 0.4px | `駅・時刻表・路線図` |
| Link Label | Noto Sans JP | 17px (1.7rem) | 500 | 1.40 | 0.4px | `エリア紹介` `京王アプリ` |
| **Nav / Body** | Noto Sans JP | **16px** (1.6rem) | **500** | 22.4px (1.40) | 0.4px | **可視 83 要素で最多** |
| **List / Info** | Noto Sans JP | **14px** (1.4rem) | 400〜500 | 22.4px (1.60) | 0.4px | 運行情報・ニュース。可視 69 要素 |
| Sub | Noto Sans JP | 15px (1.5rem) | 400 | 1.60 | 0.4px | カードの説明文 |
| Utility | Noto Sans JP | 13px (1.3rem) | 400 | 1.60 | 0.4px | `よくあるご質問/お問合せ` |
| Tag | Noto Sans JP | 12px (1.2rem) | 400 | 1.60 | 0.4px | `生活` `バス・タクシー` |
| Copyright | Noto Sans JP | 10px | **100 →（実効 300）** | 1.15 | 0.4px | 上記のとおり 100 は無い |

**サイズ分布（トップ）**: 16px (83) / 14px (69) / 18px (30) / 15px (12) / 13px (6) / 12px (4) / 17px (4) / 50px (4)

**ウェイト分布**: **400 (144)** / **500 (84)** / 700 (2) / 100 (1)
→ **見出し・ナビ・ラベルは 500、本文と一覧は 400。700 はほぼ使わない**（`お知らせ` の見出し 1 要素のみ）

### 3.5 行間・字間

- **行間は 1.40 と 1.60 の2値**（1.40 が 140 要素 / 1.60 が 84 要素）
  - **1.40** … 見出し・ナビ・カードラベル（**1〜2 行で収まるもの**）
  - **1.60** … 運行情報・ニュース本文・説明文（**読ませるもの**）
- `body` の `1.15` は**継承の起点で、可視テキストには使われていない**

- **字間は `body` に 1回だけ**:

| 値 | 対象 | 実測 |
|---|---|---|
| **0.4px** | **既定。ほぼ全要素**（14px でも 50px でも同じ） | **216 要素** |
| `normal` | グローバルナビの一部・フッターの言語切替 | 15 要素 |
| 0.13008px / 0.144px / 0.96px | **CMP（OneTrust）** | 2 要素ほか |

**ガイドライン**:
- **`body` に `letter-spacing: 0.4px` を1回書き、子要素で再宣言しない**
- **`em` に読み替えない。** px のまま継承させるのがこのサイトの設計
- **`palt` を足さない**（実測 0 件。足すと見出しの字面が変わる）

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- ヒーローのコピーは `あなた` `とあたらしいあしたへ` を **span で分割して色を変える**（改行では分けない）

### 3.7 OpenType 機能

```css
/* 使っていない */
```

- **`font-feature-settings` は 0 件**（トップ・下層とも）。**`palt` も `tnum` も当てていない**

### 3.8 縦書き

該当なし（実測 0 要素）。

---

## 4. Component Stylings

### Buttons

**Outlined（紺枠・白地）— 主力**
- Background: `#ffffff` / Text: `#333333`
- Border: **`1px solid #0f3675`** / Border Radius: **`8px`**
- Padding: **`20px 45px 20px 35px`**（右にアイコン分のアキ）
- Label: 16px / weight 500 / letter-spacing 0.4px（ラベルは内側の要素で `#0f3675`）

**Reload（小さい紺枠）**
- Border: `1px solid #0f3675` / Border Radius: `8px` / Padding: `5px 15px` / Font: 12px / 400

**Circle（ヒーローの丸ボタン）**
- Background: **`#0f3675`** / Text: `#ffffff` / Border Radius: **`50%`**
- 中のラベルは 16px / 500 の2行組み（`京王の / 取り組み`）

**Tag（記事カテゴリ）**
- Background: `#ffffff` / Text: **`#d6007f`** / Border: **`1px solid #d6007f`**
- Border Radius: **`36px`**（pill）/ Padding: `0 15px 1px` / Font: 12px / 400

**Tab（エリア切替）**
- Background: **`#d6007f`** / Text: `#ffffff`
- Border Radius: **`12px 12px 0 0`**（上だけ角丸）/ Padding: `5px 15px` / Font: 14px / 400
- 対になるパネルは `0 12px 12px`（下だけ角丸）

### Cards

- Background: `#ffffff` / Border Radius: **`12px`**
- Shadow: **`0 4px 24px rgba(0,25,65,.12)`**（サイト唯一の影）
- 見出しは 18〜22px / weight 500 / `#222222`、説明は 15px / 400 / `#555555`

### Fixed Side Menu（画面右の固定メニュー）

- Background: `#eff3f6`（通常）/ `#0f3675`（強調＝`京王アプリ`）
- Padding: `20px 5px` / Font: 10px / 400（縦に積む）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|---|---|---|
| XS | 5px | タブの上下 |
| S | 8〜10px | gap（`10px 8px`） |
| M | 15〜20px | gap（`0 15px` / `0 20px`） |
| L | 35〜45px | ボタンの左右 |

### Container

- **Max Width: `1280px`**（トップ 15 要素 / 下層 11 要素）
- 記事幅: `810px`

### Grid

- gap は **`0 20px`（8 要素）** が最多。次いで `0 15px` / `10px 8px`
- **`%` 指定の gap も併用**（`0 5%` / `0 4%` / `0 3%` / `0 2%`）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|---|---|---|---|
| 0 | `none` | ボタン・タブ・タグ | — |
| **1** | **`0 4px 24px rgba(0,25,65,.12)`** | **ヘッダー・カード・パネル・固定メニュー（唯一の影）** | **123 要素** |

> **深さの段差を作らない設計。** 浮いているものは全部同じ高さ。**新規実装でも段を増やさない。**
> （`0 0 18px rgba(0,0,0,.2)` が 1 件あるが、これは CMP のバナー）

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 10px }` を前提に `rem` を書く**（`1.4rem` = 14px）
- **`body` に `letter-spacing: 0.4px` を1回だけ書いて継承させる**
- 見出し・ナビ・ラベルは **weight 500**、本文・一覧は **400**
- 行間は **1.4（見出し・ラベル）／ 1.6（読ませる文章）** の2値
- 影は **`0 4px 24px rgba(0,25,65,.12)` の1種類だけ**
- 角丸は **カード 12px / ボタン 8px / タグ 36px / 丸ボタン 50%**
- マゼンタは**文字・枠・タブの帯まで**。面で広く使わない

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実測 0 件）
- **`font-weight: 100` や Oswald の 300/500/700 を指定しない**（読み込まれておらず、意図どおりに出ない）
- **字間を `em` に読み替えない**（`0.4px` の px 継承が正）
- **`#000088` を使わない**（クッキーバナーの色で、サイトの色ではない）
- 影を2段以上に増やさない
- `font-family` に游ゴシック・ヒラギノを足さない（このサイトは Noto Sans JP 一本）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|---|---|---|
| **Mobile** | **≤ 960.98px** | **`screen and (max-width: 960.98px)` が 1123 件で主力** |
| **Desktop** | **≥ 961px** | 146 件 |
| Wide | ≥ 1200px | 26 件（`max-width: 1199.98px` が 105 件） |
| Small Phone | ≤ 348.98px | 25 件（**小型端末向けの調整あり**） |

**961px を主、1200px を副**とする2段構え。さらに **349px 未満**の小型端末を個別に見ている。

### タッチターゲット

- 主力ボタンは `padding: 20px 45px 20px 35px` で 60px 前後
- 固定サイドメニューは `20px 5px` ＋ 縦組みラベル

### フォントサイズの調整

- 見出しは 50〜52px → SP では 28〜32px 相当。本文 16px / 一覧 14px は据え置き

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary:    #0f3675（紺・構造）
Accent:     #d6007f（マゼンタ・強調）
Text:       #333333 / Heading #222222 / Muted #555555
Background: #ffffff / Surface #eff3f6 / Footer #333333
Font: "Noto Sans JP", sans-serif（数字・英字見出しは Oswald 400）
html { font-size: 10px }  ← rem は px ÷ 10
Body: 16px (1.6rem) / line-height 1.4（本文 1.6）/ letter-spacing 0.4px（body に1回だけ）
font-feature-settings: なし（palt を使わない）
Radius: 12px (card) / 8px (button) / 36px (tag) / 50% (circle)
Shadow: 0 4px 24px rgba(0,25,65,.12) の1種類のみ
```

### プロンプト例

```
京王電鉄のデザインシステムに従って、路線のお知らせ一覧を作ってください。
- html { font-size: 10px } を前提に rem で書く（1.4rem = 14px）
- font-family は "Noto Sans JP", sans-serif のみ。palt は当てない
- body に letter-spacing: 0.4px を1回だけ書いて継承させる
- 見出しは 22px / weight 500 / line-height 1.4 / #222222
- 一覧の日付と本文は 14px / weight 400 / line-height 1.6 / #555555
- カードは白地・radius 12px・影は 0 4px 24px rgba(0,25,65,.12)（この1種類だけ）
- カテゴリタグは白地・#d6007f の文字と 1px 枠・radius 36px・12px/400
- 「一覧を見る」ボタンは白地・1px solid #0f3675・radius 8px・padding 20px 45px 20px 35px
```
