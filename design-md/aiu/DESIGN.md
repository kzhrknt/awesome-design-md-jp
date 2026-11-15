# DESIGN.md — 国際教養大学（Akita International University）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-15 / 対象: `https://web.aiu.ac.jp/`, `/undergraduate/features/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **書体で役割を分ける三層構造。** 本文は Noto Sans JP、和文の見出しは Noto Serif JP、欧文の見出しは Playfair Display。ピル型（`border-radius: 30px`）の白いアウトラインボタンと、ほぼ黒（`#1D1D1D`）の文字だけで組む、公立大学らしく静かな面
- **密度**: 中〜低い。コンテナは `1084px` と狭め、ナビのサブメニューは `line-height: 2.00`（実測 88 要素）でゆったり開く
- **キーワード**: 三書体、Playfair Display の欧文見出し、ピルのアウトライン、`letter-spacing` を px で配る、日本語だけ字間を足す

**このサイトの核心は4つある。**

1. **`letter-spacing` を `em` ではなく px で配り、767px 以下で `normal` に戻す。** `body` の宣言は `letter-spacing: 1px`（＝16px に対する 0.0625em）で、これが **px の絶対値のまま全子孫へ降りる**。コンポーネント側は `0.8px` で上書きしており、可視 311 要素のうち **146 要素が `0.8px`**。そして `screen and (max-width: 767px)` で `letter-spacing: normal` ／ `line-height: 1.34 → 1.15` に切り替わる（実測: 768px で `21.44px / 1px`、767px で `18.4px / normal`）。**モバイルでは字間をゼロに戻す**のがこのサイトの設計
2. **`font-feature-settings` が CSS 全文に 1 行も無い。** 実測も 0 要素。**ただし書体側は `palt` に対応している**（実ページの Noto Sans JP 要素で `normal` 159.53px → `"palt"` 147.3px ＝ **−7.7%**）。つまり「効かない」のではなく「**効くのに使っていない**」。字詰めではなく、上の `letter-spacing` で字間を**足す**方へ振り切っている
3. **英語ページでだけ字間を消す。** `html[lang=en] .header_order_btn .btn_inner { letter-spacing: 0 }` ／ `.en #site_common_sidebar … { letter-spacing: normal }`。**和文に足した字間を欧文で打ち消す**という出し分けで、`[lang]` セレクタで書体ごと差し替える多言語サイトとは逆向きのアプローチ
4. **CSS Custom Properties 95 個は、1 つも実装に使われていない。** `--_` 接頭辞の 95 個はすべて WordPress テーマ側のフレームワーク既定値（フィボナッチ数列 1/2/3/5/8/13/21/34/55 に基づく `--_ms-2`〜`--_ms7` の余白スケールと、`--_half-leading: 0.1` から `calc(1 + 0.1*2)` を導く行間計算）。**`--_base-font-family` は `"Helvetica Neue",Helvetica,Arial,sans-serif`、`--_color-text` は `#333`、`--_global--border-radius` は `3px`、`--_global--container-max-width` は `1280px`** だが、実装はそれぞれ **Noto Sans JP（可視 284 要素）／ `#1D1D1D`（可視 232 要素）／ `30px`（44 要素）／ `1084px`**。`#333333` も `3px` の角丸も **2 ページとも可視 0 要素**

> **宣言 ≠ 実装。** 変数の値を読んで実装したら別のサイトになる。このファイルの数値は computed style の実測値であり、変数の宣言値ではない。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **AIU グリーン** | **`#0C8729`** | ヒーロー下の動画・パンフレット導線の面（**可視 5 要素が `rgba(12,135,41,0.7)` の半透明**、ページャの現在位置が不透明 `#0C8729` 2 要素）。写真の上に重ねるので **既定は 70% 不透明** |
| **AIU ブラウン** | **`#8C7258`** | カテゴリバッジ（`すべて` `国際教養学部` `5つの特長`）の面。可視 1〜3 要素 |
| **ブラウン（文字）** | **`#876F4E`** | `New` `Pickup` `Instagram` のラベル、下層の節見出し（可視 11 / 9 要素）。**面のブラウン `#8C7258` とは別の値** |

> **茶色が 2 つあるのは実装の実態。** 面は `#8C7258`、文字は `#876F4E`。どちらも実在するので、並べるときは 2 色あることを前提にする。

### Accent（5つの特長の 5 色）

下層ページ `/undergraduate/features/` は **特長 1〜5 に 1 色ずつ割り当てる**。見出しの番号と数値の強調にだけ使い、面には使わない。

| ラベル | 実装値 | 実測 |
|------|--------|------|
| Feature 1 | `#CD485D` | トップの見出しに可視 1 要素。**下層の数値（`100` `54.0`）は近い別の赤 `#D14558` で 7 要素**（2 色ある） |
| Feature 2 | `#235E75` | 可視 1 / 7 要素 |
| Feature 3 | `#4E9F47` | 可視 1 / 10 要素 |
| Feature 4 | `#A35F1A` | 可視 1 / 3 要素 |
| Feature 5 | `#D26898` | 可視 1 / 8 要素 |

### Semantic（意味的な色）

- **日曜** (`#913131`): トップのイベントカレンダーの日曜列（可視 6 要素）
- **土曜** (`#1F519C`): 同・土曜列（可視 5 要素）
- **Gradient（パンフレット）**: `linear-gradient(96.34deg, #BB4137 0%, #EC685D 52%, #BB4137 100%)`。**サイト内で唯一のグラデーションボタン**（可視 1 要素）。角度 `96.34deg`・停止位置 `52%` は丸めずにそのまま使う
- **Gradient（下層の大見出し）**: `linear-gradient(-45deg, #003415 0%, #00D053 100%)`。`/undergraduate/features/` のページタイトル帯のみ（可視 1 要素）

### Neutral（ニュートラル）

- **Text Primary** (`#1D1D1D`): 本文・見出し・ナビ。**可視 232 / 165 要素。このサイトの文字色はほぼこれ一つ**
- **Text Black** (`#000000`): 写真上のキャプション、ページャの数字（可視 11 / 10 要素）。**`#1D1D1D` とは別に純黒も使われている**
- **Text on Dark** (`#FFFFFF`): 黒帯・グリーン面の上（可視 41 / 33 要素）
- **Dark Surface** (`#1D1D1D`): メガメニュー、グローバルナビの面（可視 15 / 8 要素）。**文字色と同じ値を面にも使う**
- **Surface Gray** (`#F5F5F5`): `FEATURE` `EVENTS` セクションの面、下層の数値カード（可視 3 / 6 要素）
- **Divider** (`#D9D9D9`): カレンダーの罫（可視 4 要素）
- **Muted** (`#7B7B7B`): 検索フォームを閉じるボタン（可視 1 要素）
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（本文・ナビ・既定）**: **Noto Sans JP**。`body` に `font-family:"Noto Sans JP",sans-serif` を 1 行書いて継承させる。可視 **284 要素（トップ）/ 206 要素（下層）**
- **明朝体（和文の見出し）**: **Noto Serif JP**。`.site_common_ttl2` / `.site_common_ttl3` / `.site_common_ttl5` / `.site_common_img_bg_block .block_ttl` に当てる。トップは `New` `Pickup` などのラベル中心で **17 要素**、下層のページタイトル・節見出しで **48 要素**
- **OS ローカルフォントは使わない。** `@font-face` は `dashicons` と `bootstrap-icons` の 2 件のみ（どちらもアイコンフォント・`unloaded`）で、和文書体はすべて Google Fonts

### 3.2 欧文フォント

- **Playfair Display**（セリフ）: **欧文の大見出し専用**。`.site_common_ttl1` にだけ当たり、`AIU TOPICS` `FEATURE` `more` の 3 種で可視 **10 要素（トップ）/ 1 要素（下層）**
- 本文中の欧文は和文と同じ Noto Sans JP で組む（欧文専用のサンセリフは入れていない）

### 3.3 font-family 指定

Google Fonts は **CSS の `@import` 1 行**で 3 ファミリーをまとめて読む。`css2?` の **v2 形式で `&family=` を 3 つ並べる正しい書き方**になっている（v1 の `/css?` は `family=` を 1 つしか見ないため、同じ書き方をすると 2 本目以降が黙って落ちる）。

```css
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Noto+Serif+JP:wght@200;300;400;500;600;700;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

/* 本文・ナビ（body に 1 回だけ） */
body {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 16px;
  line-height: 1.34;
  letter-spacing: 1px;   /* ← px。em ではない */
}

/* 和文の見出し */
.site_common_ttl2,
.site_common_ttl3,
.site_common_ttl5 { font-family: "Noto Serif JP", serif; }

/* 欧文の大見出し */
.site_common_ttl1 { font-family: "Playfair Display", serif; }
```

- **3 ファミリーとも generic family（`sans-serif` / `serif`）を末尾に置いている。** 途中に generic を挟んでいないので、受け皿が死ぬ事故は起きていない
- フォントのリクエストは **63 件・すべて `fonts.gstatic.com`**。Noto Sans JP / Noto Serif JP は unicode-range で百数十本に分割されるため、`document.fonts` には `unloaded` が大量に並ぶ。**これは正常**（そのページに該当文字が無いサブセットは読まれない）

### 3.4 文字サイズ・ウェイト階層

| 用途 | font-size | font-weight | 実測 |
|------|-----------|-------------|------|
| ナビのサブ項目・本文小 | `13px` | 400 | **最多 135 / 101 要素** |
| グローバルナビ | `14px` | 500 | 54 / 33 要素 |
| `more` ボタン（Playfair Display） | `18px` | 400 | 36 / — 要素 |
| 本文 | `16px` | 400 | 29 / 45 要素 |
| パンくず・注記 | `12px` | 400 | 18 / 18 要素 |
| 下層の大見出し | `30px` | 400〜700 | `国際教養大学の5つの特長`（実テキスト） |
| 下層の数値（`100` `54.0` `17`） | `24px` 以上 | **900** | **35 要素**。統計の数字だけ最も太い |

- **ウェイトは 400 / 500 / 700 / 900 の 4 段。** トップは 400（145）・500（131）・700（35）、下層は 400（128）・500（77）・**900（35）**・700（9）
- Google Fonts の URL が `wght@100;300;400;500;700;900` を要求しているので、**400 / 500 / 700 / 900 はすべて実体がある**（合成太字は起きない）
- **`900` は「5つの特長」の統計数値専用。** 見出しに当てる太さではない

### 3.5 行間・字間

| 値 | 用途 | 実測 |
|----|------|------|
| `line-height: 1.34` | `body` の既定（768px 以上） | **95 / 87 要素** |
| `line-height: 2.00` | メガメニュー・ナビのサブ項目 | **88 / 88 要素** |
| `line-height: 1.20` | `more` ボタン、特長カードの見出し | 30 要素 |
| `line-height: 1.15` | `body` の既定（767px 以下） | ─ |
| `letter-spacing: 0.8px` | コンポーネントの既定 | **146 / 110 要素（最多）** |
| `letter-spacing: 1px` | `body` の宣言値・フッターのナビ | 24 / 41 要素 |
| `letter-spacing: 1.5px` | 節見出し | 20 / 19 要素 |
| `letter-spacing: normal` | 数字・ページャ・**767px 以下の全体** | 49 要素 |

- **`line-height` は無単位。** 各要素が自分のサイズで再計算する（13px → 17.42px、16px → 21.44px）。**px や `em` に書き換えない**
- **`letter-spacing` は px の絶対値。** `body` に `1px` を書いて継承させ、コンポーネント側が `0.8px` で上書きする。**`em` に読み替えない**（16px の本文では 0.05em 相当でも、30px の見出しでは 0.027em にしかならない。このサイトは**大きい文字ほど字間が詰まる**設計になっている）
- **767px 以下では `letter-spacing: normal`。** モバイルで字間を足さない

### 3.6 禁則処理・改行ルール

- `word-break` は `normal`（ブラウザ既定の日本語禁則が効く）。`break-all` / `auto-phrase` は使っていない
- 見出しは `<br>` で手動改行せず、コンテナ幅（`1084px` / `calc(100% - 60px)`）に任せる

### 3.7 OpenType 機能

- **`font-feature-settings` の宣言は CSS 全文に 0 件。実測も 0 要素。** 縦組みも `tnum` も `palt` も使っていない
- **ただし書体は `palt` に対応している。** 実ページの Noto Sans JP 要素（16px）で `font-feature-settings: normal` → 159.53px、`"palt"` → 147.3px の **−7.7%**。Noto Serif JP でも −1.6%
- **つまり「足しても効かない」のではなく「効くのに使っていない」。** 再現するときに `palt` を足すと、`letter-spacing: 0.8px` と打ち消し合って**別のサイトになる**。足さないこと

### 3.8 縦書き

- 縦組みは使っていない（`writing-mode: vertical-rl` は実測 0 要素）
- このサイトを参照して縦組みを実装しない

---

## 4. Component Stylings

### Buttons

**Primary（`more` ボタン・アウトライン型）**

```css
.more {
  background: #ffffff;
  color: #1D1D1D;
  border: 1px solid #1D1D1D;
  border-radius: 30px;      /* ピル。実測 44 要素 */
  padding: 8px 40.5px;      /* 左右が極端に広い */
  font-family: "Playfair Display", serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.20;
  letter-spacing: 0.8px;
}
```

- **塗りのボタンが無い。** CTA はすべて **白地＋1px の黒枠＋ピル**。実測で `background-color` を持つボタンは、ブランド色のバッジとグラデーションのパンフレットボタンだけ
- `padding` の左右 `40.5px` は上下 `8px` の 5 倍。**横に長いピル**がこのサイトの形

**タグ（下層の特長ナビ）**

```css
.feature-tag {
  background: #ffffff;
  color: #1D1D1D;
  border: 1px solid #1D1D1D;
  border-radius: 30px;
  padding: 9.6px 14.5px;    /* 実測 6 要素 */
  font-size: 13px;
}
```

**Gradient（パンフレット・唯一の例外）**

```css
.brochure {
  background: linear-gradient(96.34deg, #BB4137 0%, #EC685D 52%, #BB4137 100%);
  color: #ffffff;
  border-radius: 30px;
}
```

### Badges / Chips

```css
.badge {
  background: #8C7258;      /* AIU ブラウン */
  color: #ffffff;
  border-radius: 20px;      /* 下層は 20px が 13 要素 */
  padding: 4px 10px;        /* トップ。下層は 5px 10px */
  font-size: 12px;
  font-weight: 500;
}
.badge--event { padding: 6px 8px; }   /* `開催中` のみ */
```

- カテゴリラベル（`New` `Pickup`）は **面を持たず文字色 `#876F4E` だけ**で表す

### Inputs

- 検索フォームは黒帯（`#1D1D1D`）の中に置き、閉じるボタンが `#7B7B7B`
- フォーム枠の既定値はテーマ側の `--_form-control-border-color: #ccc` / `-hover: #999` / `-focus: #85b7d9` だが、**どれも可視 0 要素**。実装では使われていない

### Cards

```css
.card {
  background: #F5F5F5;      /* FEATURE / EVENTS セクションの面 */
  border-radius: 20px;      /* 下層 13 要素 */
  /* 影は基本的に付けない */
}
.card--news {
  box-shadow: rgba(0, 0, 0, 0.16) 0 0 6px 0;  /* サイト内で唯一の影・1 要素だけ */
  border-radius: 4px;
}
```

---

## 5. Layout Principles

### Spacing Scale

- 実測の `gap`: `5px`（8 箇所・最多）/ `10px` / `20px 32px` / `43px` / `150px`
- **テーマ側の `--_ms-2`〜`--_ms7`（フィボナッチ 1/2/3/5/8/13/21/34/55 を `calc(1 + 0.1*2)/3` 倍した `clamp()` の流体スケール）は、実装では使われていない。** 余白は各コンポーネントが px で直書きする

### Container

```css
.container {
  max-width: 1084px;                 /* 実測 17 / 10 要素 */
  width: calc(100% - 60px);          /* 左右 30px のガター */
  margin-inline: auto;
}
```

- **テーマの `--_global--container-max-width: 1280px` は使われていない。** 実装は `1084px`
- 下層の一部に `1024px` のコンテナが 1 要素だけある

### Grid

- トップは「ヒーローのカルーセル → AIU TOPICS → FEATURE → EVENTS」の縦積み。カードは 3 列
- `border-radius: 50%` の円が 5 要素（カルーセルのページャ）

---

## 6. Depth & Elevation

**このサイトはほぼ影を使わない。**

| レベル | 値 | 用途 | 実測 |
|--------|-----|------|------|
| 0（既定） | なし | ボタン・カード・バッジのすべて | 下層は **影 0 種** |
| 1 | `rgba(0, 0, 0, 0.16) 0px 0px 6px 0px` | 日付カード（`2026 11/15`）のみ | **トップに 1 要素だけ** |

- 奥行きは影ではなく **1px の黒枠（`border: 1px solid #1D1D1D`）と面色（`#F5F5F5` / `#1D1D1D`）** で表す
- ヒーローの動画・パンフレット導線は、写真の上に **`rgba(12,135,41,0.7)` の半透明グリーン**を敷いて文字を読ませる（影ではなくベタ面）

---

## 7. Do's and Don'ts

### Do（推奨）

- **`letter-spacing` は `body` に `1px` を 1 回だけ書き、コンポーネントで `0.8px` に上書きする。** px のまま継承させる
- **767px 以下では `letter-spacing: normal` ／ `line-height: 1.15` に戻す。** ブレークポイントは `screen and (max-width: 767px)`（実測 39 / 32 箇所）
- **書体は役割で分ける**：本文＝Noto Sans JP、和文見出し＝Noto Serif JP、欧文見出し＝Playfair Display。3 つとも末尾に generic family を置く
- **CTA は白地＋`1px solid #1D1D1D`＋`border-radius: 30px`。** 左右の `padding` を上下の 5 倍（`8px 40.5px`）に取る
- **文字色は `#1D1D1D` 一つで通す。** 色を足すのは「5つの特長」の 5 色とカレンダーの日曜・土曜だけ
- **統計の数字だけ `font-weight: 900`。** 見出しは 400〜700 に留める
- Google Fonts は `css2?` の v2 形式で `&family=` を並べる

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** このサイトは字間を**足す**設計で、詰めと喧嘩する（書体側は `palt` に対応していて −7.7% 効いてしまう）
- **`letter-spacing` を `em` に読み替えない。** px の絶対値が降りるので、30px の見出しでは 0.027em 相当まで薄まる。これが意図した見え方
- **`line-height` を px や `em` で書かない。** 無単位で各要素に再計算させる
- **CSS 変数 `--_*`（95 個）の値を実装値として使わない。** `--_base-font-family`（Helvetica Neue）も `--_color-text`（`#333`）も `--_global--border-radius`（`3px`）も `--_global--container-max-width`（`1280px`）も、**可視 0 要素**。すべてテーマ側の既定値
- **`#333333` を文字色に使わない。** 実装は `#1D1D1D`
- **影を足さない。** サイト全体で 1 要素しか使っていない
- **縦組みを実装しない**（実測 0 要素）
- **英語ページで和文と同じ字間を使わない。** `letter-spacing: 0` / `normal` に戻す

---

## 8. Responsive Behavior

### Breakpoints

| 条件 | 実測 | 変わるもの |
|------|------|-----------|
| `print, screen and (min-width: 768px)` | **43 / 36 箇所** | デスクトップ（既定） |
| `screen and (max-width: 767px)` | **39 / 32 箇所** | `letter-spacing: 1px → normal`、`line-height: 1.34 → 1.15` |
| `(min-width: 1024px)` | 8 箇所（下層） | コンテナの切り替え |
| `(min-width: 640px)` / `not all and (min-width: 640px)` | 7 箇所ずつ（下層） | カードの列数 |
| `(hover: hover)` / `(any-hover: hover)` | 15 / 11 箇所 | ホバー効果をタッチ端末で切る |

**崖は 768 / 767px の 1 箇所だけ。**

```css
/* 768px 以上 */
body { line-height: 1.34; letter-spacing: 1px; }   /* 実測 21.44px / 1px */

/* 767px 以下 */
@media screen and (max-width: 767px) {
  body { line-height: 1.15; letter-spacing: normal; }  /* 実測 18.4px / normal */
}
```

### タッチターゲット

- `more` ボタンは `8px 40.5px` の padding ＋ `font-size: 18px` で高さ約 38px。**モバイルでは上下の padding を足して 44px 以上を確保する**
- タグは `9.6px 14.5px` ＋ `13px` で高さ約 38px。同上

### フォントサイズの調整

- **`html` も `body` も 16px で完全固定。** 1920 / 1440 / 1200 / 1024 / 834 / 768 / 767 / 414 / 390 / 375 / 374px の 11 幅すべてで `16px`（`rootProbe.remPx = 16` / `mismatch: false`）
- **流体（`vw` / `clamp()`）はルートにも本文にも使っていない。** 文字サイズはブレークポイントで切り替えるのではなく、**行間と字間だけが 768/767 で変わる**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ブランド色:     #0C8729（グリーン・写真の上では 70% 不透明）
バッジ面:       #8C7258 / バッジ文字 #876F4E（2 色ある）
文字色:         #1D1D1D（ほぼ全部）／ 写真上は #000000
面:             #F5F5F5（セクション）／ #1D1D1D（ナビ・黒帯）
背景:           #FFFFFF
本文書体:       "Noto Sans JP", sans-serif / 16px / line-height 1.34 / letter-spacing 1px
和文見出し:     "Noto Serif JP", serif
欧文見出し:     "Playfair Display", serif
ウェイト:       400 / 500 / 700 / 900（900 は統計数値だけ）
CTA:            白地 + 1px solid #1D1D1D + border-radius 30px + padding 8px 40.5px
角丸:           30px（ピル）/ 20px（カード・バッジ）/ 50%（ページャ）
影:             使わない（唯一の例外 rgba(0,0,0,.16) 0 0 6px 0）
コンテナ:       max-width 1084px / width calc(100% - 60px)
ブレークポイント: 768 / 767px（字間と行間だけが変わる）
palt:           使わない（効くが使わない）
```

### プロンプト例

> 国際教養大学のデザインで「入試情報」の一覧ページを作って。
> 本文は `"Noto Sans JP", sans-serif` 16px / `line-height: 1.34` / `letter-spacing: 1px`（px のまま継承させる）。
> 和文の見出しは `"Noto Serif JP", serif`、セクションの欧文ラベル（`ADMISSION` など）は `"Playfair Display", serif`。
> 文字色は `#1D1D1D`。カードの面は `#F5F5F5`、角丸 `20px`、影は付けない。
> 「もっと見る」は白地・`1px solid #1D1D1D`・`border-radius: 30px`・`padding: 8px 40.5px`・Playfair Display 18px。
> コンテナは `max-width: 1084px; width: calc(100% - 60px)`。
> `@media screen and (max-width: 767px)` で `body { letter-spacing: normal; line-height: 1.15 }` に戻す。
> `font-feature-settings` は使わない。影も縦組みも使わない。
