# DESIGN.md — ミシマ社（MISHIMASHA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-03 / 対象: `https://mishimasha.com/`, `/books/`, `/company/`

---

## 1. Visual Theme & Atmosphere

2006年創業、京都と東京に拠点を置く出版社。「原点回帰」を掲げ、
自社流通（直取引）で本を届けている。サイトは白地に**緑 `#009d4e` 一色**を差し、
文字はゴシック1本。**本の書影が持つ強い組版に対して、UI 側は徹底して中立**に振る。

- **デザイン方針**: 白地・ゴシック1本・緑1色。書影を主役にする
- **密度**: 中。1画面に書影を2〜4点、説明は短く
- **キーワード**: 白地、緑、ゴシック1本、0.3emのナビ、1.6の行送り

**このサイトの特徴的な癖（他サイトと違う点）**

1. **出版社なのに明朝を1箇所も使わない**。見出し・本文・ナビすべてゴシック。
   明朝は**書影の中（デザイナーの組版）にだけ存在する**
2. **文字色が `rgba(39, 30, 21, 0.88)`**。hex ではなく**アルファ付きの黒茶**。
   白地上の実効色は約 `#413931`。純黒を避けて紙の印象に寄せている
3. **`letter-spacing: 0.3em`（4.8px ÷ 16px）はグローバルナビだけ**。
   「本 の 一 覧」のように大きく開き、他の要素はすべて `normal`
4. **`line-height: 1.6` が全階層で共通**。15/24、14/22.4、28/44.8、22.5/36、
   12/19.2 とサイズが変わっても比率が動かない。**読み物本文だけ 2.0**
5. **ヘッダーの高さを CSS 変数で持つ**。`--header-y: 128px` /
   `--header-y-low: 80px`。スクロールで縮む固定ヘッダー
6. **`font-family` に `"Noto Sans JP"` が2回書かれている**
   （`"Noto Sans Japanese", "Noto Sans JP", "Noto Sans JP", …`）。
   旧名からの移行の名残がそのまま残っている
7. **重版バッジが純赤 `#ff0000`**。緑1色の面に、刷数だけが原色の赤で立つ
8. `border-radius` が **10px（ボタン）と 5px（バッジ）の2値**しかない

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値 -->

### Base（基調）

- **Background** (`#ffffff`): ページ地色
- **Ink** (`rgba(39, 30, 21, 0.88)`): **すべての文字**。白地上の実効色 ≒ `#413931`
- **Ink Solid** (`#271e15`): ボタンの罫線（アルファなしの同色）
- **Text on Green** (`#ffffff`): フッター・ページネーションの文字
- **Copyright** (`rgba(255, 255, 255, 0.8)`): フッター最下部

> **注意**: 文字色を hex に置き換えない。`rgba(39, 30, 21, 0.88)` のまま使う。
> 色地・写真の上でも同じ指定が使われるため、**透過があること自体が仕様**。

### Brand（ブランド）

- **Brand Green** (`#009d4e`): フッターの地色、ページネーション、アクセント
- **Green Dark** (`#016c36`): **カレント状態**（現在のページ番号）
- **Link Green** (`#008000`): 本文中のリンク文字（フッターの緑とは別の値）

### Accent（1点だけの原色）

- **Reprint Red** (`#ff0000`): 「2刷」「6刷」等の重版バッジ

### Neutral（面・罫）

- **Divider** (`rgba(24, 24, 24, 0.06)`): 区切り罫
- **Top Gradient** (`linear-gradient(rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 100%)`):
  ヘッダー直下に敷く極薄のグラデーション。境界を影ではなく階調でつくる
- **Menu Overlay** (`rgba(39, 30, 21, 0.4)`): メニュー展開時のオーバーレイ。
  **文字色と同じ黒茶を透過させている**
- **Search Panel** (`rgba(237, 237, 237, 0.96)`): 検索パネルの面

---

## 3. Typography Rules

### 3.1 和文フォント

**ゴシック1本のみ**。明朝を持たない。

- **ゴシック体**: `"Noto Sans Japanese", "Noto Sans JP"`（Webフォント）→
  ヒラギノ角ゴ ProN W3 → メイリオ → 游ゴシック のフォールバック

出版社サイトでありながら明朝を一切使わないのは、**書影そのものが強い組版
（明朝・特太ゴシック・手書き）を持っているため、UI が書体で競合しない**という判断。

### 3.2 欧文フォント

- **サンセリフ**: `Avenir, Helvetica, Arial, sans-serif`（和文チェーンの末尾）

欧文専用のフォント指定を持たない。`Avenir` を和文チェーンの後ろに置き、
和文Webフォントに欧文グリフがない場合のみ拾わせる。

### 3.3 font-family 指定

```css
font-family: "Noto Sans Japanese", "Noto Sans JP", "Noto Sans JP",
             "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, 游ゴシック, YuGothic,
             Avenir, Helvetica, Arial, sans-serif;
```

**フォールバックの考え方**:
- **和文Webフォント優先**。`"Noto Sans Japanese"`（旧名）→ `"Noto Sans JP"`（現行）の順
- **`"Noto Sans JP"` が2回書かれている**のは移行時の名残。害はないが、
  新規に書くときは1回でよい
- 和文は Mac（ヒラギノ ProN）→ Win（メイリオ）→ 游ゴシック の順
- **欧文は最後**。`Avenir` を先頭に置かない（和文優先チェーン）

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Page Heading | 28px | **700** | 1.6 (44.8px) | 0 | 「書籍」（`c-heading`） |
| Page Heading Light | 28px | **400** | 1.6 (44.8px) | 0 | 「会社概要」（`a-title large`） |
| Section Title | 22.5px | 700 | 1.6 (36px) | 0 | 「ピックアップ」 |
| Feature Title | 23px | 700 | **1.26** (29px) | 0 | 新刊の見出し。**唯一詰める階層** |
| Card Title | 16px | 700 | 1.44 (23px) | 0 | 書名 |
| Nav | 16px | 700 | 1.44 (23px) | **0.3em** (4.8px) | 「本の一覧」「書店様へ」 |
| Base (body) | 15px | 400 | 1.6 (24px) | 0 | 継承の基準値 |
| Body (long form) | 15px | 400 | **2.0** (30px) | 0 | 会社概要等の読み物 |
| Author | 15px | 400 | 1.6 (24px) | 0 | 著者名 |
| Description | 14px | 400 | 1.6 (22.4px) | 0 | 新刊の説明文 |
| Footer Nav | 14px | 700 | 1.6 (22.4px) | 0 | `#ffffff` |
| Tag Button | 14px | 700 | 1.0 | 0 | 「展示」「ミシマ社ラジオ」 |
| Subtitle | 12px | 700 | 1.92 (23px) | 0 | 書籍のサブタイトル |
| Breadcrumb | 12px | 400 | 1.6 (19.2px) | 0 | パンくず |
| Menu Item | 14px | 400 | 1.6 (22.4px) | 0 | ドロワー内 |
| Badge | 12px | 700 | **1.0** (12px) | 0 | 「2刷」 |
| Copyright | 12px | 400 | 1.42 (17px) | 0 | `rgba(255,255,255,0.8)` |

**ウェイトは 400 と 700 の2値**。中間（500 / 600）を使わない。
**「読ませる文＝400 / 名前とラベル＝700」**で割っている。

### 3.5 行間・字間

- **`line-height: 1.6` がサイト全体の基準**。15px→24px、14px→22.4px、
  28px→44.8px、22.5px→36px、12px→19.2px。**サイズが変わっても比率が動かない**
- **読み物本文だけ `2.0`**（15px→30px）。会社概要・長文ページ
- **詰めるのは新刊見出しだけ**（23px → 29px = 1.26）。
  太く大きい見出しを1〜2行に収めるための例外
- **`letter-spacing` は原則 `normal`**。サイト全体でほぼ `0`
- **例外はグローバルナビの `0.3em`（4.8px ÷ 16px）だけ**。
  「本 の 一 覧」「書 店 様 へ」と一文字ずつ開いて看板のように見せる

```css
/* 基準 */
body {
  font-size: 15px;
  line-height: 1.6;
  letter-spacing: normal;
  color: rgba(39, 30, 21, .88);
}

/* グローバルナビ — 唯一 letter-spacing を持つ */
.nav-link {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.44;
  letter-spacing: .3em;
}

/* 読み物本文 */
.prose { font-size: 15px; line-height: 2.0; }

/* 新刊見出し — 唯一詰める */
.feature-title { font-size: 23px; font-weight: 700; line-height: 1.26; }
```

### 3.6 禁則処理・改行ルール

- 書名は『』で囲む。**『』の中で改行しない**
  （例:『ゼミはガチだと役に立つ』『新装版 超訳 古事記』）
- 新刊見出しは「7月の新刊『A』『B』」のように**複数の書名を1つの見出しに並べる**。
  `line-height: 1.26` で詰めて2行に収める
- 著者名（「内藤正典」「倉貫義人」）は途中で折らない
- ナビは `letter-spacing: 0.3em` を持つため、**4〜5文字までのラベルに限る**

### 3.7 OpenType 機能

```css
font-feature-settings: normal;
```

- **`palt` を使わない**。実測ですべての要素が `normal`
- 字間は `letter-spacing` のみで制御し、**プロポーショナル詰めに依存しない**
- Noto Sans JP のベタ組みをそのまま使う

### 3.8 縦書き

該当なし。全ページ横組み。縦組みは**書影の中にのみ**存在する。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| Noto Sans Japanese / Noto Sans JP | **そのまま**（Google Fonts） | 実サイトと同一 |

**代替が不要なサイト**。Adobe Fonts / 商用Webフォントを使っていないため、
preview.html でも実サイトとほぼ同じ見え方になる。

---

## 4. Component Stylings

### Buttons

**Outline Tag Button（主要な誘導 — 塗らずに枠線1本）**

- Background: `transparent`
- Text: `rgba(39, 30, 21, 0.88)`
- Border: **`1px solid #271e15`**
- Border Radius: **`10px`**
- Padding: `7px 12px`
- Font: 14px / weight 700

```css
.btn-tag {
  display: inline-block;
  background: transparent;
  color: rgba(39, 30, 21, .88);
  border: 1px solid #271e15;
  border-radius: 10px;
  padding: 7px 12px;
  font-size: 14px;
  font-weight: 700;
}
```

用例: 「展示」「ミシマ社ラジオ」「新刊」

**塗りのCTAを持たない**。誘導はすべて枠線ボタンかテキストリンク。

### Badges

**Reprint Badge（重版）**

- Background: `#ff0000` / Text: `#ffffff`
- Border Radius: `5px` / Padding: `5px 8px`
- Font: 12px / weight 700 / `line-height: 1.0`

書影の**右下または上に重ねる**。「2刷」「6刷」など刷数を出す。
**サイト内で唯一の原色**。

### Pagination

- Background: `#009d4e` / Text: `#ffffff`
- Border Radius: **`0px`** / Size: 33px 角
- Font: 15px / weight 400
- **カレントは `#016c36`**（濃い緑）

```css
.page-numbers          { background: #009d4e; color: #fff; width: 33px; height: 33px;
                         line-height: 33px; text-align: center; }
.page-numbers.current  { background: #016c36; }
```

### Cards（書籍カード）

- Background: `transparent`
- Border / Shadow: なし
- 構成: 書影（そのまま・トリミングしない）→ 書名（16px / 700）→
  サブタイトル（12px / 700）→ 著者（15px / 400）
- **書影に角丸・影・枠を付けない**。本の表紙をそのまま置く

### Header

**スクロールで縮む固定ヘッダー**。高さを CSS 変数で管理する。

```css
:root {
  --header-y: 128px;       /* 初期高さ */
  --header-y-low: 80px;    /* スクロール後 */
}
.l-header { height: var(--header-y); transition: height .3s; }
.is-scrolled .l-header { height: var(--header-y-low); }
```

- 左: ハンバーガー ＋ ナビ2項目（「本の一覧」「書店様へ」）
- 中央: ロゴ（丸い版元マーク ＋「ミシマ社 / MISHIMASHA」）
- 右: 検索フィールド（プレースホルダ「書名、キーワード」）
- 直下に `linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0))` を敷いて境界をつくる

### Navigation / Drawer

- ドロワー展開時のオーバーレイ: `rgba(39, 30, 21, 0.4)`
- ドロワー内リンク: 14px / weight 400 / `line-height: 1.6`
- 検索パネル: `rgba(237, 237, 237, 0.96)`

### Footer

- Background: **`#009d4e`**（ブランドグリーンのベタ）
- リンク: 14px / weight 700 / `#ffffff`
- コピーライト: 12px / `rgba(255, 255, 255, 0.8)`

---

## 5. Layout Principles

### Container

| 用途 | Max Width |
|------|-----------|
| ワイド（書籍グリッド） | **1280px** |
| 標準 | 960px |
| 読み物 | 760px |

**3段のコンテナ**を持ち、内容の種類で使い分ける。

### Grid

- トップの新刊: **2カラム**（書影を大きく2点並べる）
- 書籍一覧: 3〜4カラム
- 会社概要: 1カラム（760px）

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 12px |
| M | 24px |
| L | 48px |
| XL | 80px |

### Header Offset

固定ヘッダーぶんのオフセットは `var(--header-y)` を使う。
**px を直接書かない**（スクロールで 128px → 80px に変わるため）。

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・書影・ボタンすべて** |
| 1 | `rgb(128, 128, 128) 0px 0px 5px 0px` | 浮かせるパネル（検索・ドロワー） |

**影はほぼ使わない**。境界は以下でつくる:

- **ヘッダー直下の極薄グラデーション**
  `linear-gradient(rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 100%)`
- **区切り罫** `rgba(24, 24, 24, 0.06)`
- **フッターの緑ベタ**

---

## 7. Do's and Don'ts

### Do（推奨）

- **ゴシック1本で組む**（Noto Sans JP）。明朝を UI に持ち込まない
- 文字色は **`rgba(39, 30, 21, 0.88)`** をそのまま使う（hex に潰さない）
- `line-height` は **1.6 で全階層を統一**。読み物本文だけ 2.0
- `letter-spacing` は **`normal`**。グローバルナビだけ `0.3em`
- `font-weight` は **400 / 700 の2値**。中間ウェイトを使わない
- ブランドグリーン `#009d4e` はフッターとページネーションに使い、
  カレントは `#016c36` に落とす
- 重版バッジは `#ff0000` / `border-radius: 5px`。**サイト内で唯一の原色**
- ボタンは塗らず `1px solid #271e15` ＋ `border-radius: 10px`
- 書影は**そのまま置く**（角丸・影・枠を付けない）
- ヘッダー高さは `--header-y` / `--header-y-low` の変数で持つ

### Don't（禁止）

- **明朝を UI に使わない**（明朝は書影の中にだけ存在する）
- **塗りのCTAをつくらない**（誘導は枠線ボタンかテキストリンク）
- **書影に角丸・影・トリミングを加えない**
- `letter-spacing: 0.3em` をナビ以外に広げない
- `line-height` を階層ごとにバラバラにしない（1.6 で通す）
- 中間ウェイト（500 / 600）を使わない
- 緑と赤以外の有彩色を足さない
- 影で階層をつくらない（グラデーションと罫線でつくる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile S | ≤ 374px | 最小。書影1カラム |
| Mobile | ≤ 767px | 1カラム。ナビはハンバーガーのみ |
| Tablet | 768–979px | 2カラム。ロゴを縮小 |
| Desktop | ≥ 980px | フルナビ表示 |
| Squeeze | ≤ 900 / 984 / 1020 / 1140px | コンテナと書影サイズを段階的に詰める |

`980px` が主境界（一般的な 768px ではない）。
さらに `900 / 984 / 1020 / 1140px` の中間ブレークポイントで
**2カラムを崩さずに書影サイズだけを削る**。

### モーション

`@media (prefers-reduced-motion: reduce)` を持つ。
ヘッダーの高さトランジションを無効化する配慮。

### モバイルでの変化

- ナビ2項目 → ハンバーガーに格納。**`letter-spacing: 0.3em` は維持する**
- ヘッダー 128px → 80px 前後（`--header-y` を上書き）
- 新刊 2カラム → 1カラム。書影は幅いっぱい
- 本文 15px / 1.6 は**変えない**

### タッチターゲット

- 最小 44px × 44px。枠線ボタンは 7px パディング ＋ 14px 文字で約 30px なので、
  モバイルでは上下パディングを 13px に増やして確保する
- ページネーションの 33px 角も 44px に広げる

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Ink:             rgba(39, 30, 21, 0.88)（hex に潰さない）
Ink Solid:       #271e15（ボタンの罫線）
Brand Green:     #009d4e（フッター・ページネーション）
Green Dark:      #016c36（カレント）
Link Green:      #008000（本文中リンク）
Reprint Red:     #ff0000（重版バッジ）
Divider:         rgba(24, 24, 24, 0.06)
Overlay:         rgba(39, 30, 21, 0.4)
Top Gradient:    linear-gradient(rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 100%)
Font:            "Noto Sans Japanese", "Noto Sans JP",
                 "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
                 メイリオ, Meiryo, 游ゴシック, YuGothic,
                 Avenir, Helvetica, Arial, sans-serif
Base Size:       15px
Line Height:     1.6（全階層）/ 2.0（読み物本文）/ 1.26（新刊見出しのみ）
Letter Spacing:  normal / 0.3em（グローバルナビのみ）
Font Weight:     400 / 700 の2値
Border Radius:   10px（ボタン）/ 5px（バッジ）/ 0px（ページネーション）
Shadow:          none（既定）
palt:            off（font-feature-settings: normal）
Header:          --header-y: 128px / --header-y-low: 80px
Container:       1280px（ワイド）/ 960px（標準）/ 760px（読み物）
```

### プロンプト例

```
ミシマ社（MISHIMASHA）のデザインシステムに従って、新刊一覧ページを作成してください。
- ページ背景は #ffffff、文字色は rgba(39, 30, 21, 0.88)（hex に置き換えない）
- フォントはゴシック1本
  "Noto Sans Japanese", "Noto Sans JP", "ヒラギノ角ゴ ProN W3",
  "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, 游ゴシック, YuGothic,
  Avenir, Helvetica, Arial, sans-serif
  明朝は使わない（明朝は書影の中にだけ存在する）
- line-height は 1.6 で全階層を統一。読み物本文だけ 2.0、新刊見出しだけ 1.26
- letter-spacing は normal。グローバルナビだけ 0.3em（「本 の 一 覧」）
- font-weight は 400 と 700 の2値のみ
- 見出し 28px/700、セクション 22.5px/700、新刊見出し 23px/700/1.26、
  書名 16px/700、本文 15px/400、説明 14px/400
- 書籍カードは書影をそのまま置く（角丸・影・トリミングなし）。
  書影の上に重版バッジ（#ff0000 / #fff / border-radius 5px / padding 5px 8px /
  12px / 700）を重ねる
- 誘導は塗らない枠線ボタン
  transparent / 1px solid #271e15 / border-radius 10px / padding 7px 12px / 14px / 700
- ページネーションは #009d4e の 33px 角、カレントのみ #016c36、角丸なし
- フッターは #009d4e のベタ塗り、リンクは白 14px/700、
  コピーライトは rgba(255,255,255,0.8) 12px
- ヘッダーは固定で高さを CSS 変数にする（--header-y: 128px / --header-y-low: 80px）。
  直下に linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0)) を敷いて境界をつくる
- 影は使わない。区切りは rgba(24,24,24,0.06) の罫線
- 緑と赤以外の有彩色を足さない
- コンテナは 1280px（一覧）/ 960px（標準）/ 760px（読み物）
```
