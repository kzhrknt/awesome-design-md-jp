# DESIGN.md — 専門学校桑沢デザイン研究所（KUWASAWA DESIGN SCHOOL）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-16 / 対象: `https://www.kds.ac.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **明朝体のゴシック的な使い方。** 本文から小さなラベルまで Noto Serif JP の **weight 700** で組み、角丸と影を一切使わない（実測 `border-radius` 0 種・`box-shadow` 0 種、2 ページとも）。バウハウスの系譜を名乗る学校が、装飾ではなく「面と文字だけ」で組んでいる
- **密度**: 高い。ルートが **13px** と小さく、本文 14px・ラベル 12px・ナビ 13px が詰まって並ぶ
- **キーワード**: 明朝700、角丸ゼロ、影ゼロ、4専攻の色、ルート13px

**このサイトの核心は4つある。**

1. **`html { font-size: 13px }` の固定ルート。** 実測 19 幅（1920〜320px）すべてで `html` も `body` も **13px から 1px も動かない**。流体も `clamp()` も `%` の入れ子もない。**`1rem = 13px`**、そして `body { letter-spacing: 0.05em }` が **0.65px という絶対値**で全子孫に降りる
2. **明朝を太字で使う。** トップの可視 598 要素のうち **`"Noto Serif JP", serif` が 369 要素**、そのうち **weight 700 が 413 要素**（weight 400 は 181 要素）。見出しだけでなくナビもラベルもボタンも明朝 700。Noto Serif JP は 400/700 の 2 本だけ読み込んでいるので、**この 700 は合成太字ではなく実体**
3. **4 専攻＝4 色。** VD 赤 `#b1172f` / PD 緑 `#149056` / SD 青 `#2989c6` / FD 黄 `#ecb230`。この 4 色以外に彩度のある色は**リンクの青 `#0043c9` だけ**（可視 99 要素）。ブランドカラーという単色が存在せず、**学科の識別色がそのまま配色**になっている
4. **角丸ゼロ・影ゼロ。** `distributions.borderRadius` も `boxShadow` も **両ページとも空**。CTA は黒面 `#222222` に白文字の長方形か、白の 1px 罫線だけ

### 計測で判明した「宣言 ≠ 実装」

| 宣言 | 実装 | 扱い |
|---|---|---|
| `body { font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, sans-serif }` | トップの実体は **Noto Serif JP 369 要素**。body のレガシースタックが効くのは**下層ページ**（`/about/` で 75 要素） | **`body` の font-family でこのサイトを判断しない。** 下の 3.9 節参照 |
| `font-family: lato, sans-serif`（**29 要素**） | `lato` は **`@font-face` が無く、フォント要求も 0 件**。実測で `lato, sans-serif` と `sans-serif` の幅が **562px / 562px と完全一致**（Arial は 498.92px なので測定は機能している） | **死んだ別名。** 日付・`MENU`・専攻略号は generic sans-serif で出ている |
| `font-family: Oswald, sans-serif` | Google Fonts から **実際に読み込んでいる**が、可視は **`PAGE TOP` の 1 要素だけ** | 読み込んで使っていない |
| `font-feature-settings` | **実測 0 件**。ただし Noto Serif JP は `palt` を**持っている**（13px の実スタックで `normal` 261.75px → `"palt"` 230.98px ＝ **−11.8%**） | **「効かない」ではなく「効くのにやっていない」。** 足すと既存と別物になる |

---

## 2. Color Palette & Roles

### Primary（専攻カラー・このサイトのブランドカラー）

| 専攻 | 実装値 | 実測 |
|------|--------|------|
| **VD**（ビジュアルデザイン） | **`#b1172f`** | 可視 5 要素。略号バッジの面、縦組みラベルの面 |
| **PD**（プロダクトデザイン） | **`#149056`** | 可視 4 要素 |
| **FD**（ファッションデザイン） | **`#ecb230`** | 可視 4 要素 |
| **SD**（スペースデザイン） | **`#2989c6`** | 可視 3 要素 |

> **4 色は対等で、優劣がない。** 「プライマリ 1 色＋アクセント」ではないので、**どれか 1 色をサイト全体のキーカラーに昇格させない。**

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文・見出し・ナビ。**可視 217 要素**。`body` に宣言。**純黒 `#000000` は使わない**
- **Text on Dark** (`#ffffff`): 黒面・写真の上（可視 276 要素）
- **Text Muted** (`#707070`): 日付（可視 2 要素）。`/about/` ではパンくずに `#8f8c8c`
- **Link Blue** (`#0043c9`): お知らせのリンク、`一覧を見る`（**可視 99 要素**）。**4 専攻の色とは別系統の、機能としての青**
- **Surface Dark** (`#222222`): `重要なお知らせ` の見出し面、`MENU` ボタン、フッター（可視 18 要素）
- **Veil** (`rgba(34, 34, 34, 0.7)`): **可視 80 要素**。学生作品サムネイルに重ねる幕。黒ではなく `#222222` の 70%
- **Surface Gray** (`#ececec` / `#f5f5f5` / `#ededec` / `#d9d8d8`): 画像のプレースホルダ、フッター上の面
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

### `/about/` だけに出る淡い面

- `#ebf6f7`（ディプロマ・ポリシー） / `#f3f3f3`（カリキュラム・ポリシー） / `#fef4f4`（アドミッション・ポリシー）: **3 ポリシーを淡い色で塗り分ける**。同ページに `#ff0000` の強調が 1 要素ある（引用の赤字）

---

## 3. Typography Rules

### 3.1 和文フォント

- **明朝体（主役）**: **Noto Serif JP**。Google Fonts、**400 と 700 の 2 本だけ**。トップの和文の大半（369 要素）
- **ゴシック体（従）**: **Noto Sans JP**。Google Fonts、400 / 700。お知らせ本文・専攻名（106 要素）
- **OS ローカル（下層のベース）**: `"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, sans-serif`。`body` の宣言で、Web フォントを当てていない要素はここに落ちる（`/about/` で 75 要素）

### 3.2 欧文フォント

- **Oswald**: Google Fonts で実際に読み込んでいるが、可視は `PAGE TOP` の **1 要素**のみ
- **`lato`**: **宣言のみ。実体なし**（`@font-face` 0 件・フォント要求 0 件）。日付・`MENU`・専攻略号 29 要素が generic `sans-serif` で出ている

### 3.3 font-family 指定

```css
/* ベース（body。実体は下層ページで使われる） */
font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, sans-serif;

/* 見出し・ナビ・ラベル（トップの主役） */
font-family: "Noto Serif JP", serif;

/* お知らせ本文・専攻名 */
font-family: "Noto Sans JP", sans-serif;

/* 実サイトはこう書いているが、lato は存在しないので正しくはこう */
/* 実サイト: font-family: lato, sans-serif;  ← lato は @font-face なし・要求 0 件 */
font-family: "Lato", sans-serif;  /* 本当に Lato を使うなら読み込みを足す */
```

**フォールバックの考え方**:
- Noto Serif JP の受け皿は `serif` 1 語のみ。和文明朝のローカル名（游明朝・ヒラギノ明朝）は**チェーンに入っていない**
- `body` のレガシースタックには **Web フォントが 1 つも入っていない**。Web フォントはコンポーネント側で当てる設計

### 3.4 文字サイズ・ウェイト階層

**ルートが 13px なので、`rem` の px 換算は一般的な 16px 基準と合わない。** 下表はすべて実測 px。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title（下層） | Noto Sans JP | 30px | 400 | — | **2px** | `/about/` の `桑沢デザイン研究所とは`。字間だけ別格 |
| Section Heading | Noto Serif JP | 23px | 400 | 1.80 | 1.15px | `/about/` の `桑沢デザイン研究所の歴史と理念` |
| Lead | Noto Serif JP | 22px | 700 | 1.45 | 1.1px | 学生インタビューの引用（43 要素） |
| Heading 2 | Noto Serif JP | 20px | 700 | 1.50 | 1px | `重要なお知らせ` `学科紹介`。**768px 以下で 16px** |
| Body | Noto Serif JP | **14px** | 700 | 1.70 | **0.7px** | **最多の 300 要素**。本文もナビもこれ |
| Base / Nav | Noto Serif JP | **13px** | 700 | **1.00** | **0.65px** | ルートと同値（93 要素） |
| Caption | Noto Sans JP | 12px | 400 | 1.40 | 0.6px / 1.2px | 専攻略号・補助情報（91 要素） |
| Date | （generic sans） | 16px | 400 | 1.40 | 0.8px | お知らせの日付 |
| Copyright | — | 10px | 400 | — | — | `/about/` フッター |

**weight は 400 と 700 の 2 段だけ。** 500 も 600 も 1 要素も無い（Noto Serif JP / Noto Sans JP とも 400・700 の 2 本しか読んでいないため、**中間ウェイトを当てると合成になる**）。

### 3.5 行間・字間

- **`html { line-height: 1 }`。** 無単位の `1` が全子孫に降りるので、**宣言し忘れた要素は行間ゼロで出る**（実測 `lineHeightRatio: 1.00` が **194 要素**）。これは絶対値 px の継承ではない（1 未満の比率が 1 件も無いことで確認済み）
- **本文の行間**: **1.70**（241 要素）。読み物は 1.80（`/about/` の歴史と理念）
- **見出しの行間**: 1.40〜1.50。引用は 1.45
- **字間は二重に配られている**:
  - `body { letter-spacing: 0.05em }` → **13px × 0.05 = `0.65px` の絶対値**が継承（170 要素）
  - 各コンポーネントが **`0.05em` を自分で持ち直す** → 14px なら 0.7px（285 要素）、22px なら 1.1px（43 要素）、16px なら 0.8px
- **つまり「0.05em」という設計値が、継承と再宣言の両方で配られている。** 片方だけ再現すると、サイズを変えたときの字間が合わなくなる

```css
html { font-size: 13px; line-height: 1; }   /* ← 1 は無単位。子で必ず上書きする */
body {
  letter-spacing: 0.05em;   /* 13px × 0.05 = 0.65px が絶対値で降りる */
  color: #222222;
  font-weight: 400;
}
.text { font-size: 14px; letter-spacing: 0.05em; line-height: 1.7; }  /* 0.7px */
```

### 3.6 禁則処理・改行ルール

- `body { word-break: normal }`（実測）。`auto-phrase` も `break-all` も使っていない
- **改行位置は HTML 側の手組みで決めている。** 見出しや引用に `\n` が入っており、CSS ではなくマークアップで行を割る

### 3.7 OpenType 機能

```css
/* 実サイトは font-feature-settings を 1 要素も使っていない（実測 0 件） */
```

- **`palt` は効く。使っていないだけ。** 実スタック `"Noto Serif JP", serif` / 13px で `normal` **261.75px** → `"palt"` **230.98px**（**−11.8%**）、`"halt"` 235.75px（−9.9%）
- **足すと既存ページと別物になる。** 詰まった分だけ行の折り返し位置が変わり、手組みの `\n` と噛み合わなくなる。**この設計を踏襲するなら `palt` は足さない**

### 3.8 縦書き

**縦組みは実在する。ただしヒーローの大きな縦組みは画像。**

| | 実装 | 矩形 |
|---|---|---|
| **ヒーローの縦組み**（`私はここにすばらしいバウハウス精神を見出した` 等） | **`.webp` 画像**（`2026_PC_01〜04.webp`） | **1440×606px**、4 枚のスライドショー。`alt` に全文が入っており正しい |
| **本物の縦組み**（6 要素） | `writing-mode: vertical-rl` | **幅 20px / 40px の細いタブ**。`学生作品` の見出し（20px・左 150px）と 4 専攻のラベル（14px・左 1400px＝右端） |

```css
/* 実在するのはこちらだけ */
.works-title {
  writing-mode: vertical-rl;
  font-family: "Noto Serif JP", serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;   /* 0.05em */
  line-height: 20px;     /* = 1.0 */
  color: #222222;
}
```

> **ヒーローの縦組みを Web フォントで実装しない。** `typography.verticalWriting` は 6 件返るが、**それは画面下方（top 4253〜5155px）にある幅 20〜40px のタブ**であって、ファーストビューの大きな縦組みではない。**件数ではなく矩形の大きさと位置で突き合わせること。**

### 3.9 2 世代のテンプレートが同居している

| | トップ（`kds_newtop_*`） | 下層（`kds_page_*`） |
|---|---|---|
| 和文の実体 | **Noto Serif JP 369 要素** | **ヒラギノ角ゴ Pro W3 75 要素**（＝`body` のレガシースタック） |
| 最多ウェイト | **700**（413 要素） | **400**（93 要素） |
| 字間の種類 | 6 種（0.6〜1.2px） | **3 種**（0.65px が 121 要素） |
| 面の色 | 専攻 4 色＋黒 | 淡いグレー 3 色＋ポリシー 3 色 |

**クラス接頭辞が `kds_newtop_` / `kds_new-header_` と `kds_page_` で分かれている。** 新規実装は**トップ側（Noto Serif JP 700）に寄せる。**

---

## 4. Component Stylings

### Buttons

**Primary（黒面）**
- Background: `#222222`
- Text: `#ffffff`
- Font: `"Noto Serif JP", serif` / 11px / **700**
- Letter Spacing: `0.55px`（= 0.05em）
- Line Height: `11px`（= 1.0）
- **Border Radius: `0`**
- **Box Shadow: `none`**

**Secondary（白罫線・写真の上）**
- Background: `transparent`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Font: `"Noto Serif JP", serif` / 14px / 400
- Letter Spacing: `0.65px`
- **Border Radius: `0`**

**White（黒面の上）**
- Background: `#ffffff` / Text: `#222222`
- Font: `"Noto Serif JP", serif` / 15px / **700** / `letter-spacing: 0.75px`
- **Border Radius: `0`**

**専攻バッジ**
- Background: 専攻色（`#b1172f` / `#149056` / `#2989c6` / `#ecb230`）
- Text: `#ffffff` / 12px / **700** / `letter-spacing: 1.2px`（= 0.1em）
- **Border Radius: `0`**

### Cards（学生作品）

- サムネイル画像の上に **`rgba(34, 34, 34, 0.7)`** の幕（可視 80 要素）
- 幕の上のテキストは `#ffffff`
- **Border Radius: `0` / Shadow: `none`**

### Inputs

- サイト内検索は `border-radius: 0` の 1px 罫線。影なし

---

## 5. Layout Principles

### Spacing Scale

CSS Custom Properties による余白トークンは**存在しない**（`customPropertiesSummary.own = 0`。検出された 2 個は WordPress / Gutenberg の `--wp--preset--font-size--*`）。余白は px 直書き。

| Token | Value | 用途 |
|-------|-------|------|
| （gap） | `10px` | グリッドの唯一の `gap` 実測値 |

### Container

- **Max Width: `1500px`**（実測 1 件）
- 専攻ラベルの縦組みタブは左 150px / 右端 1400px に置かれる

### Grid

- 学生作品はスライダー。ニュースは日付＋カテゴリ＋見出しの横並び

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべての要素** |

**`box-shadow` は 2 ページとも実測 0 種。`border-radius` も 0 種。** 奥行きは**面の重なりと幕（`rgba(34,34,34,0.7)`）だけ**で作る。影を足すとこのサイトではなくなる。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 13px }` を前提に px で書く。** `rem` を使うなら `1rem = 13px` で換算する
- **明朝（Noto Serif JP）を weight 700 で使う。** 見出しだけでなくナビ・ラベル・ボタンまで
- **`letter-spacing: 0.05em` を body と各コンポーネントの両方に書く**（このサイトはそうしている）
- **専攻 4 色は対等に扱う。** VD `#b1172f` / PD `#149056` / SD `#2989c6` / FD `#ecb230`
- 本文の行間は **1.70**、読み物は **1.80**
- 文字色は `#222222`、リンクは `#0043c9`

### Don't（禁止）

- **`border-radius` と `box-shadow` を足さない。** 実測で両方 0 種。1 つ入れた時点で別のサイトになる
- **`font-feature-settings: "palt"` を足さない。** 効いてしまう（−11.8%）ので、手組みの改行位置がずれる
- **`html { line-height: 1 }` を「行間が無い」と読んで px に直さない。** 無単位の 1 なので、子要素が自分のサイズで再計算できる。本文ブロックでは必ず `line-height` を宣言し直す
- **`font-family: lato` を真似しない。** 実サイトでは存在しない名前で、29 要素が generic sans-serif に落ちている
- **weight 500 / 600 を当てない。** 400 と 700 しか読み込んでいないので合成になる
- **`body` の `font-family`（ヒラギノ角ゴ Pro W3）を「このサイトの書体」と書かない。** トップの実体は Noto Serif JP
- **ヒーローの縦組みコピーを `writing-mode` で実装しない。** 実サイトは `.webp` 画像
- 純黒 `#000000` を本文に使わない

---

## 8. Responsive Behavior

### Breakpoints

**メディアクエリは実質 1 本。** `screen and (max-width: 768px)` が **825 件**で、他は WordPress 由来（`min-width: 600px` 7 件 / `min-width: 782px` 6 件）とごく少数。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | 唯一の実質的なブレークポイント |
| Desktop | > 768px | 既定 |

### ルートは一切動かない

実測 19 幅（1920 / 1440 / 1200 / 1101 / 1100 / 1024 / 980 / 979 / 834 / 769 / **768 / 767** / 600 / 599 / 461 / 460 / 375 / 374 / 320px）で:

- `html`: **13px 固定**
- `body`: **13px 固定**
- `body { letter-spacing }`: **0.65px 固定**
- `body { line-height }`: **13px 固定**

**流体（`vw` / `clamp()` / `%` の入れ子）は 1 つも無い。** 768px の崖で変わるのは**要素側のサイズだけ**:

| 要素 | ≥ 769px | ≤ 768px |
|---|---|---|
| `h2` | **20px** | **16px** |
| `h3` | 20px | 20px（据え置き） |
| 本文 | 14px | 14px（据え置き） |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）を確保する

### フォントサイズの調整

- **本文は縮めない。** モバイルでも 14px / 13px のまま。縮むのは `h2` だけ（20 → 16px）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Root Font Size: 13px   ← 16px ではない。rem は 1rem = 13px
Text Color:     #222222
Link Color:     #0043c9
Background:     #ffffff
Surface Dark:   #222222
Veil:           rgba(34, 34, 34, 0.7)
専攻カラー:      VD #b1172f / PD #149056 / SD #2989c6 / FD #ecb230

Font (見出し・ナビ・ラベル): "Noto Serif JP", serif  /  weight 700
Font (本文・補助):          "Noto Sans JP", sans-serif
Body Size:      14px（ベースは 13px）
Line Height:    1.7（見出し 1.4〜1.5 / 読み物 1.8）
Letter Spacing: 0.05em（body と各コンポーネントの両方に書く）
Border Radius:  0        ← 例外なし
Box Shadow:     none     ← 例外なし
Container:      1500px
Breakpoint:     768px（1 本だけ）
```

### プロンプト例

```
桑沢デザイン研究所のデザインシステムに従って、学科紹介カードの一覧を作成してください。

- html の font-size は 13px。サイズはすべて px で書く
- 見出し・ラベル・ボタンは "Noto Serif JP", serif の font-weight: 700
- 本文は font-size 14px / line-height 1.7 / letter-spacing 0.05em
- 文字色 #222222、リンク #0043c9、背景 #ffffff
- 各カードの専攻バッジは VD #b1172f / PD #149056 / SD #2989c6 / FD #ecb230
  （12px / weight 700 / letter-spacing 0.1em / 白文字）
- border-radius と box-shadow は使わない（このサイトは実測 0 種）
- font-feature-settings は書かない
- サムネイルに文字を重ねるときは rgba(34, 34, 34, 0.7) の幕を敷く
- ブレークポイントは 768px の 1 本。h2 だけ 20px → 16px に縮める
```
