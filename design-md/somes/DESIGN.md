# DESIGN.md — ソメスサドル（SOMÈS SADDLE）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-11 / 対象: `https://www.somes.co.jp/`, `/harness/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **字間と行間で「間」をつくる。** 北海道の馬具・革鞄メーカーとして、革の深緑と黒だけを使い、文字を大きく空けて置く。色ではなく**アキ**でブランドの質感を出している
- **密度**: 極めて低い。本文は **14px / line-height 2.4**、見出しは **letter-spacing 0.18em**。1画面あたりの情報量を意図的に減らしている
- **キーワード**: 深緑、和欧2段組、行間2.4、字間0.18em、角丸ゼロ

**このサイトの核心は3つある。**

1. **すべてのナビとボタンが「日本語＋英語」の2段組。** `オンラインショップ / ONLINE SHOP`、`NEWS / お知らせ`、`SHOP LIST / 店舗一覧` のように、**和文と欧文を別書体・別サイズで積む**。欧文は **Josefin Sans（weight 300）**、和文は **游ゴシック Medium**
2. **`line-height: 2.4` が本文の既定**（14px / 33.6px、実測 2.00 が 178 要素・2.40 が 6 要素だが、読み物ブロックは一貫して 2.4）。**行送りがこのサイトの最大の特徴**
3. **`letter-spacing` を 0.05em〜0.18em の階段で使い分ける。** 本文 0.10em、リード 0.14em、**英語見出し 0.18em**。実測で `normal` の可視要素はほぼゼロ

**`font-feature-settings: "palt"` は 1 要素も使っていない**（実測 0 件）。CSS Custom Properties も実質 0 個。設計は BEM 風のクラス名（`c-ttl` `c-btn -ja -primary` `c-btn-unique -type01`）に載っている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Deep Green（革の深緑）** | **`#13311d`** | **CSS 全文で 44 回・可視 6 要素**。`ONLINE SHOP` の縦タブ、`c-btn -primary`、フッター面 |
| **Ink Black** | **`#040404`** | **CSS 35 回・可視 4 要素**。本文色（**可視 112 要素**）であり、`c-btn -ja` の面色でもある。**純黒ではなく `#040404`** |
| Green Overlay | `rgba(12, 48, 24, 0.8)` | `修理実績一覧` ボタン（写真に重ねる半透明の緑） |
| Brown Overlay | `rgba(102, 72, 6, 0.8)` | `オンラインリペア` ボタン（半透明のブラウン） |
| Brown | `#523a05` | `店舗一覧` の縦タブ |
| Deep Green Dark | `#0a2613` / `#0c3018` | 濃い側のグリーン（グラデーションの端） |

### Accent

- **Alert Orange** (`#d5553a`): **お知らせの強調のみ**（可視 2 要素・CSS 全文で 5 回）。`商品価格改定のお知らせ` のテキスト色と `1px solid #d5553a` の枠。**唯一の暖色**

### Neutral（ニュートラル）

- **Text Primary** (`#040404`): 本文。**可視 112 要素**
- **Text on Dark** (`#ffffff`): 写真上・深緑面のテキスト（可視 100 要素）
- **Text Muted** (`#787878`): 価格、補助情報（**可視 68 要素**。CSS 全文で 24 回）
- **Surface Sage** (`#eaece9`): **淡い灰緑の面**（可視 10 要素・CSS 16 回）。このサイトで最も多い面色
- **Surface Off-white** (`#fafafa`) / (`#f6f7f5`): さらに淡い面
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **游ゴシック Medium**（実測 151 要素）。**和文優先のチェーン**で、`"游ゴシック Medium"` を先頭に置く
- 明朝体は使用しない

### 3.2 欧文フォント

**2書体を役割で厳密に使い分ける**（どちらも Google Fonts、`loaded` 済）。

- **Josefin Sans**（weight 300 / 400、実測 90 要素）: **見出しの英語部分・日付・`VIEW MORE`**。ジオメトリックで背が低く、大きな字間と相性が良い
- **Crimson Text**（weight 400、実測 41 要素）: **セリフ。ブランドの大見出し（`SOMMET & SADDLE` 72px）と価格表示（`¥36,300(税込)`）**

> **価格にセリフ体（Crimson Text）を使うのがこのサイトの癖。** 数字を工芸品らしく見せるための選択で、ゴシックに置き換えると印象が変わる。

### 3.3 font-family 指定

```css
/* 本文・UI（既定） */
font-family: "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic,
             "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif;

/* 英語見出し・日付・VIEW MORE */
font-family: "Josefin Sans", "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic,
             "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif;

/* ブランド大見出し・価格 */
font-family: "Crimson Text", "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic,
             "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif;
```

**フォールバックの考え方**:
- **和文優先。** 欧文書体は先頭に 1 つだけ置き、**その後ろは3つとも同じ和文チェーン**を共有する。欧文フォントは欧文グリフしか使われないので、和文は常に游ゴシック Medium で揃う
- **`"游ゴシック Medium"` を先頭に置く**ことで Windows の Light マッピング問題を回避している
- ヒラギノは **Pro W3**（ProN ではない）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Brand Display** | **Crimson Text** | **72px** | 400 | 1.00 (72px) | **0.08em** (5.76px) | `SOMMET & SADDLE` |
| Brand Sub | Crimson Text | 24px | 400 | 1.30 (31.2px) | 0.10em (2.4px) | `CRAFTSMANSHIP, SINCE 1964.` |
| **Section Title (L)** | **Josefin Sans** | **36px** | **300** | 1.00 (36px) | **0.18em** (6.48px) | `SHOP` `SHOP LIST`（下に和文） |
| **Section Title** | **Josefin Sans** | **28px** | **300** | 1.00 (28px) | **0.18em** (5.04px) | `NEWS` `BLOG`（下に和文） |
| Label | Josefin Sans | 28px | 300 | 2.00 (56px) | 0.18em (5.04px) | `PICK UP` |
| Article Title | 游ゴシック Medium | 18px | 400 | **1.70** (30.6px) | 0.10em (1.8px) | ブログ記事タイトル |
| Price | **Crimson Text** | 17px | 400 | 2.00 (34px) | 0.10em (1.7px) | `#787878` |
| Category Name | 游ゴシック Medium | 15px | 400 | 1.00 (15px) | 0.10em (1.5px) | `バッグ / BAG` |
| **Body** | 游ゴシック Medium | **14px** | 400 | **2.40** (33.6px) | **0.10em** (1.4px) | **本文** |
| **Lead** | 游ゴシック Medium | **14px** | 400 | **2.40** (33.6px) | **0.14em** (1.96px) | **ヒーローのリード文（白）** |
| Lead (About) | 游ゴシック Medium | 14px | 400 | 2.40 (33.6px) | 0.12em (1.68px) | セクションのリード文 |
| List Title | 游ゴシック Medium | 14px | 400 | **2.00** (28px) | 0.10em (1.4px) | ニュース一覧の見出し |
| Button (JP) | 游ゴシック Medium | 14px | 400 | 2.00 (28px) | **0.18em** (2.52px) | `c-btn -ja` |
| Product Name | 游ゴシック Medium | 13px | 400 | 2.00 (26px) | 0.05em (0.65px) | **字間が最も狭い** |
| Date / VIEW MORE | Josefin Sans | 12px | 400 | 1.00〜2.00 | **0.18em** (2.16px) | `2026.09.04` |

### 3.5 行間・字間

- **本文の行間**: **2.40**（14px / 33.6px）。**このサイトを特徴づける最大の数値**
- **一覧・カードの行間**: **2.00**（実測 178 要素で最多）
- **見出しの行間**: **1.00**（英語見出しは行送りゼロで、下の和文と積む）
- **記事タイトルの行間**: 1.70

**字間の階段（実測の分布）**:

| letter-spacing | 実測 | 用途 |
|---|---|---|
| **0.10em** | **104 要素（最多）** | **本文・記事タイトル・価格・カテゴリ名** |
| **0.18em** | **82 要素** | **英語見出し・日付・`VIEW MORE`・和文ボタン** |
| 0.05em | 34 要素 | 商品名（最も詰める） |
| 0.142em | 34 要素 | ヒーローのリード文 |
| 0.08em | 12 要素 | ブランド大見出し（72px） |
| 0.15em | 9 要素 | 補助ラベル |

**ガイドライン**:
- **本文 0.10em / 英語見出し 0.18em / 商品名 0.05em** の3段を守る。**一律の字間にするとこのサイトの質感が消える**
- **文字が大きいほど em を減らす**（72px で 0.08em、28px で 0.18em）。大きい文字は em 値が同じでも物理的に空きすぎるため
- **`line-height: 2.4` は本文専用**。一覧やボタンは 2.0

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- リード文は `<br>` で明示的に改行位置を指定する（`ソメスサドルは、1964年の創業以来、<br>時を経てますます愛着の湧く…`）。**行末を人が決める**
- 和欧2段組のラベルは `<span>` で分け、**日本語と英語を別行に積む**

### 3.7 OpenType 機能

**このサイトは `font-feature-settings` を一切使っていない**（実測 0 要素）。

- **`palt` を足さないこと。** 字詰めではなく `letter-spacing` で空ける方向の設計なので、`palt` を入れると狙いと逆になる

### 3.8 縦書き

**画面右端に縦組みのタブがある**（`オンラインショップ / ONLINE SHOP`、`クラブ会員登録 / SOMÈS CLUB`）。

- サイズ: **60 × 169px** の縦長
- 実装は `writing-mode` ではなく**横書きテキストの回転**として組まれている（computed の `line-height` は 14px のまま）
- 新規実装で縦組みにする場合:

```css
writing-mode: vertical-rl;
text-orientation: mixed;
letter-spacing: 0.10em;
```

---

## 4. Component Stylings

**`border-radius` はサイト全体で `0px`。例外なし。**

### Buttons

**Primary（黒の横長 CTA）**
- Background: **`#040404`**
- Text: `#ffffff`
- Border: なし
- Border Radius: **`0px`**
- Font: 游ゴシック Medium / 14px / 400 / line-height 2.0 / **letter-spacing 0.18em**
- Size: **427 × 64px**（幅いっぱいに伸ばす）
- クラス: `c-btn -ja`

**Primary Green（深緑）**
- Background: **`#13311d`** / Text: `#ffffff`
- 同上のサイズ・字間
- クラス: `c-btn -ja -primary`

**Secondary（白）**
- Background: `#ffffff` / Text: `#040404`
- Border: なし（面の色で区別する）
- Font: Josefin Sans / 12px / **letter-spacing 0.18em**
- Size: 208 × 48px
- クラス: `c-btn -white`

**Photo Overlay（写真の上に重ねる大型ボタン）**
- Background: **`rgba(12, 48, 24, 0.8)`**（緑）/ **`rgba(102, 72, 6, 0.8)`**（茶）
- Text: `#ffffff`
- Size: **360 × 95px**
- Font: 16px / line-height 2.0 / letter-spacing 0.10em
- クラス: `c-btn-unique -type01` / `-type02`
- **背景写真が透けるよう `alpha 0.8` を守る**

**Side Tab（画面右端の縦タブ）**
- Background: `#13311d`（ONLINE SHOP）/ `#040404`（SOMÈS CLUB）/ `#523a05`（店舗一覧）
- Size: **60 × 169px**
- Text: `#ffffff` / 14px / letter-spacing 0.10em

**Alert Link（お知らせ）**
- Background: `transparent`
- Text: **`#d5553a`**
- Border: **`1px solid #d5553a`**
- Border Radius: `0px`
- Size: 824 × 50px

### Badges / Category Label

- Background: `#13311d` / `#040404`
- Text: `#ffffff` / 12px
- Padding: なし（行高で高さを作る）
- Border Radius: `0px`
- クラス: `c-cat`

### Cards

- Background: `#ffffff` または **`#eaece9`**（淡い灰緑）
- Border: なし。**面色の差だけでカードを表す**
- Border Radius: `0px`
- Shadow: 原則なし

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| S | 10px | ボタン内側の左右 |
| M | 16px | スライダーのテキスト左右 |
| L | 24px | カテゴリ名の左インデント |
| XL | 110px | セクション上部のアキ |

### Container

- **Max Width: 1000px**（実測 9 要素。CSS でも `min-width: 1000px` を宣言）
- **リスト幅: 824px**（ニュース一覧・お知らせ）
- **サブカラム: 720px**
- フル幅（1440px）の写真セクションの中に 1000px を置く二層構造

### Grid

- 商品は 4 カラム（カード幅 220px）
- ニュース一覧は 1 カラム（824px）で、日付と見出しを横に並べる

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。ボタン・カードはすべてフラット** |
| 1 | `0 0 40px rgba(0, 0, 0, 0.1)` | **1 要素のみ**。非常に広く薄い影 |
| 2 | `0 0 5px #808080` | **1 要素のみ**（追従ヘッダー） |

> **影をほとんど使わないサイト。** ぼかし半径 40px の極端に柔らかい影が 1 箇所あるだけで、階層は**面色（`#eaece9`）と余白**で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`border-radius: 0` を貫く**
- **ナビ・ボタン・見出しは「日本語＋英語」の2段組にする。** 英語は Josefin Sans weight 300、和文は游ゴシック Medium
- **本文は `font-size: 14px` / `line-height: 2.4` / `letter-spacing: 0.10em`**
- **英語見出しは `letter-spacing: 0.18em` / `line-height: 1.0` / weight 300**
- **価格とブランド大見出しは Crimson Text（セリフ）**
- 文字が大きいほど `letter-spacing` の em 値を減らす（72px→0.08em、28px→0.18em）
- 写真の上のボタンは `rgba(…, 0.8)` の半透明にする
- 本文色は **`#040404`**、補助は `#787878`
- 面色は **`#eaece9`**（淡い灰緑）

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素）。このサイトは詰めずに空ける設計
- **字間を一律にしない。** 0.05em / 0.10em / 0.18em の3段を使い分ける
- **本文の `line-height` を 1.7 程度に詰めない**（実サイトは 2.4）
- **`border-radius` を付けない**
- **`box-shadow` を足さない**（実サイトは全体で 2 要素のみ）
- **価格をゴシックにしない**（Crimson Text のセリフ数字がブランドの手触り）
- 本文色を純黒 `#000000` にしない（実サイトは `#040404`）
- `#d5553a` を一般のアクセントに広げない（**お知らせの強調専用**、可視 2 要素）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 750px** | **主ブレークポイント**（CSS 全文で `max-width: 750px` が 531 回） |
| **Desktop** | **≥ 751px** | デスクトップレイアウト（`min-width: 751px` が 159 回） |
| Tablet 調整 | ≤ 980px / ≥ 980px | 中間幅の微調整（24 回 / 8 回） |
| Container | ≥ 1000px | コンテナ幅の下限 |

- **`pc` / `sp` クラスで要素自体を出し分ける**（`c-btn -ja pc`、`c-btn -white -sptxt`）

### タッチターゲット

- 主要 CTA 427 × 64px、写真上ボタン 360 × 95px、縦タブ 60 × 169px — いずれも 44px を大きく上回る

### フォントサイズの調整

- 本文 14px は固定。見出しは 36px → 28px の段で縮める
- **モバイルでも `letter-spacing: 0.18em` を保つと 1 行に収まらなくなるため、英語見出しは 0.12em 程度まで落とす**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Deep Green:  #13311d
Ink Black:   #040404
Muted:       #787878
Surface:     #eaece9
Alert:       #d5553a
Background:  #ffffff
Font (JP):  "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic, "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif
Font (EN):  "Josefin Sans", <上記の和文チェーン>
Font (Display/Price): "Crimson Text", <上記の和文チェーン>
Body Size: 14px
Line Height: 2.4（本文） / 2.0（一覧） / 1.0（英語見出し）
Letter Spacing: 0.10em（本文） / 0.18em（英語見出し） / 0.05em（商品名）
Border Radius: 0px
```

### プロンプト例

```
ソメスサドルのデザインシステムに従って、商品一覧セクションを作成してください。
- セクション見出しは「SHOP」（Josefin Sans / 36px / weight 300 / letter-spacing 0.18em / line-height 1.0）の
  下に「商品の購入」（游ゴシック Medium）を積む2段組にする
- 本文は 14px / line-height 2.4 / letter-spacing 0.10em / 色 #040404
- 商品名は 13px / letter-spacing 0.05em、価格は Crimson Text 17px / 色 #787878
- CTA は背景 #040404 / 白文字 / 14px / letter-spacing 0.18em / border-radius 0 / 高さ 64px
- 写真に重ねるボタンは rgba(12,48,24,0.8) / 360×95px
- カードの面色は #eaece9、枠線と box-shadow は使わない
- font-feature-settings は使わない
- コンテナは 1000px、一覧は 824px
```
