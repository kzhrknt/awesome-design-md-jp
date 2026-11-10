# DESIGN.md — ダイセル（DAICEL）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-10 / 対象: `https://www.daicel.com/`, `https://www.daicel.com/corporate/philosophy/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **UD（ユニバーサルデザイン）フォント 1 本で全部を組む。** 和文も欧文も数字も `BIZ UDPGothic`。行間 **1.9**、字間 **0.05em** で余裕をとり、読みやすさを最優先した化学メーカーのコーポレートサイト
- **密度**: 低い。`--LINE_HEIGHT: 1.9` が 204 要素に降り、8px 基準の余白スケールで大きく空ける
- **キーワード**: BIZ UDPGothic、行間 1.9、8px グリッド、片側 150px の角丸、ヒーローは全部画像

**このサイトの核心は5つある。**

1. **Web フォントが CSS に 1 行も書かれていない。** `@font-face` は **CSS 全文（4 枚・402,296 文字）で 0 件**。それでも `BIZUDPGothic-Regular-Subset.woff2` / `-Bold-Subset.woff2` / `CactusClassicalSerif-Regular-Subset.woff2` の **3 本が自社ホストから読み込まれ `loaded` になる**。正体は `static/js/modules/LoadFonts.js` の **FontFace API**（`new FontFace('BIZ UDPGothic', 'url(/static/fonts/BIZUDPGothic-Regular-Subset.woff2)', {...})`）。**CSS を grep しても出てこない**
2. **`palt` も `halt` も 1px も効かない。** 同一スタック・同一文字列で `normal` **918.80px** / `"palt"` **918.80px** / `"halt"` **918.80px**。配信されているのが**サブセット版**で、字詰めのテーブルを持っていない。実サイトも 0 要素で、**これは正しい判断**
3. **字間は `body` に `letter-spacing: .05em` を 1 回だけ書いて px で継承させる。** 実測 **0.8px が可視 259 要素中 251 要素**。`body` の font-size がブレークポイントで 16px → 14px に変わるので、**モバイルでは 0.7px に再計算される**
4. **ウェイトは 2 面しかない。** `@font-face` は 400 と 700 の 2 本。実測で **100〜500 → 918.80px（Regular）/ 600〜900 → 922.41px（Bold）**。500 を指定しても Regular で出る
5. **ヒーローの文字は 1 文字も実テキストではない。** `<picture class="u-top-carouselMv__media">` 1440×800 の webp 4 枚のカルーセルで、横組みの「コタエを、ダセル。」も**右端の縦組みコピー「化学におけるコタエとは、つまり無限の可能性のことだ」も画像**。`writing-mode: vertical-rl` は両ページとも **0 要素**

---

## 2. Color Palette & Roles

CSS Custom Properties は `:root` に **64 個（すべて自社トークン / プラットフォーム由来 0）**。`body` 側の宣言は 0 個。
**ただしブランド色の 2 つは宣言だけで、2 ページとも可視 0 要素だった。**

### Primary（ブランドカラー）

| 役割 | 変数 | 実装値 | 実測 |
|------|------|--------|------|
| **Brand Primary** | `--COLOR_BRAND_PRIMARY` | `#009be6` | **可視 0 要素。** ロゴは SVG 画像なので DOM の色としては出てこない |
| **Brand Secondary** | `--COLOR_BRAND_SECONDARY` | `#d71619` | **可視 0 要素** |
| **Link（実際に使われる青）** | `--COLOR_ROLE_LINK` | **`#006da1`** | ページ最上部へ戻るボタン。下層のリンク |
| **Dark Cyan** | `--COLOR_FOREGROUND_DARK_CYAN` | **`#005d8a`** | 言語切替の `English` `中文（简体）`。下層で 11 要素 |

> **`--COLOR_BRAND_*` を「実装値」として書かない。** 画面に出る青は `#006da1` と `#005d8a` の 2 つ。

### Neutral（ニュートラル）

| 役割 | 変数 | 実装値 | 実測 |
|------|------|--------|------|
| **Text Primary** | `--COLOR_FOREGROUND_DARK` | **`#222222`** | **可視 206 要素**。本文・見出しすべて。純黒は使わない |
| **Text Medium** | `--COLOR_FOREGROUND_MEDIUM_DARK` | **`#586063`** | 補助テキスト・パンくず（下層 41 要素） |
| **Surface** | `--COLOR_BACKGROUND` | **`#f6f6f6`** | ナビの面・カードの面（可視 21 要素） |
| **Surface Cool** | `--COLOR_BACKGROUND_2` | `#e5f5fc` | 下層のパンくず帯（1 要素） |
| **Outline** | `--COLOR_OUTLINE` | `#d2d2d2` | 罫線 |
| **Base Light** | `--COLOR_BASE_LIGHT` | `#ffffff` | ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`） |
| **Base Dark** | `--COLOR_BASE_DARK` | `#000000` | ハンバーガー面（`#222222` として描画） |

### Semantic（意味的な色）

```css
--COLOR_ROLE_IMPORTANT: #c21417;
--COLOR_ROLE_IMPORTANT_BACKGROUND: #fbe7e8;
--COLOR_ROLE_DISABLED: #888888;   /* 実サイトは 3 桁で宣言している */
--COLOR_ROLE_DISABLED_BACKGROUND: #dcdcdc;
```

### 事業セグメントの色（`--COLOR_EX_*`）

```css
--COLOR_EX_PINK:       #df2b5e;
--COLOR_EX_BLUE:       #197e9a;
--COLOR_EX_GREEN:      #006437;
--COLOR_EX_DARK_GREEN: #00866b;
--COLOR_EX_DARK_CYAN:  #007cb8;
```

### 特殊な値（そのまま写す）

```css
--COLOR_BACKGROUND_OVERRAY: color-mix(in srgb, #3a4145 60%, #0000);   /* 綴りは実サイトのまま */
--COLOR_GURADATION: linear-gradient(180deg, #79cdf5, #ffb9ba);        /* 綴りは実サイトのまま */
```

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の本文書体）**: **BIZ UDPGothic**（モリサワの UD フォント）。**自社ホストからサブセット版を配信**（`/static/fonts/BIZUDPGothic-Regular-Subset.woff2` / `-Bold-Subset.woff2`）。実測 **可視 259 要素中 259 要素**
- **装飾用セリフ**: **Cactus Classical Serif**（`--FONT_FAMILY_JA2`）。`loaded` しているが**両ページとも可視 0 要素**
- フォント要求は **3 件・すべて `www.daicel.com`**（外部 CDN を使わない）

> **`"Local BIZ UDPGothic"` のような死んだ別名ではない。** 実物のファイルを自社で配信し、`document.fonts` で `loaded` になっている。

### 3.2 欧文フォント

- `--FONT_FAMILY_EN: "Open Sans", Arial, Helvetica, sans-serif` が宣言されているが、**日本語ページでは Open Sans のリクエストが発生せず `document.fonts` にも載らない**（可視 0）。欧文も `BIZ UDPGothic` で組まれている
- `--FONT_FAMILY_CN: "Noto Sans SC", "PingFang SC", sans-serif`（中国語ページ用）

### 3.3 font-family 指定

```css
/* 本文（--FONT_FAMILY_JA） */
font-family: "BIZ UDPGothic", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN",
             "メイリオ", Meiryo, sans-serif;

/* 宣言はあるが日本語ページでは使われない */
--FONT_FAMILY_JA2: "Cactus Classical Serif", sans-serif;
--FONT_FAMILY_EN:  "Open Sans", Arial, Helvetica, sans-serif;
```

**フォールバックの考え方**:
- UD フォントを先頭に置き、受け皿は OS のヒラギノ／メイリオ
- `sans-serif` は最後。その後ろに書いた名前は一生使われない

### 3.4 文字サイズ・ウェイト階層

`html` は **16px で完全固定**（1940〜375px の 15 幅すべて）。
**`body` だけが 768px を境に 16px → 14px へ落ちる。**

| 用途 | Desktop（≧768px） | Mobile（≦767px） | weight |
|------|------------------|------------------|--------|
| ページ見出し `h1` | **40px** | 28px | 700 |
| セクション見出し | **32px** | — | 700 |
| 中見出し | **28px** | — | 700 |
| カード見出し `h2` | **24px** | 21px | 700 |
| リード | 22px | — | 400 |
| **本文 `p` / `body`** | **16px** | **14px** | 400 |
| ナビ・リスト | 14px | — | 400 |
| 注記（`--FONT_SIZE_NOTE`） | 14px | 13px | 400 |
| キャプション | 12px | — | 400 |

```css
:root { --FONT_SIZE_ROOT: 16; }
body  { font-size: var(--FONT_SIZE); }

/* モバイル既定 */
:root { --FONT_SIZE: calc(14 / var(--FONT_SIZE_ROOT) * 1rem); }  /* = 14px */
@media print, screen and (width >= 768px) {
  :root { --FONT_SIZE: calc(16 / var(--FONT_SIZE_ROOT) * 1rem); } /* = 16px */
}
```

> **`calc(N / var(--FONT_SIZE_ROOT) * 1rem)` が全サイズの書き方。** px を直書きしない。

#### ウェイトは Regular と Bold の 2 面だけ

`@font-face`（FontFace API 経由）は **400 と 700 の 2 本**。隠し div の実測は次の 2 面に割れた。

| 指定 | 実測幅 | 実際に出る面 |
|------|--------|-------------|
| 100 / 200 / 300 / 400 / **500** | **918.80px** | **Regular（400）** |
| 600 / **700** / 900 | **922.41px** | **Bold（700）** |

**実サイトも 400（172 要素）と 700（87 要素）しか使っていない。**
**500 を書いても Regular で出る**ので、中間ウェイトは設計に存在しないものとして扱う。

### 3.5 行間・字間

#### 行間

```css
:root { --LINE_HEIGHT: 1.9; }
body  { line-height: var(--LINE_HEIGHT); }
```

- **無単位の `1.9`** なので、各要素が自分のサイズで再計算する（16px → 30.4px / 14px → 26.6px / 24px → 43.2px）
- 実測の内訳: **1.90 が 204 要素**（圧倒的）／ 1.80 が 9 要素（補助テキスト）／ 1.60 が 39 要素（UI ラベル）／ 1.00 が 7 要素（検索欄など 1 行もの）
- **1 未満の比率は 1 件も無い**＝絶対値 px は降っていない

#### 字間

```css
body { letter-spacing: .05em; }   /* 宣言はここ 1 箇所だけ */
```

- **`em` 宣言 → px で継承**。`body` 16px なので **`0.8px` が可視 259 要素中 251 要素**
- **モバイルでは `body` が 14px になるので `0.7px` に変わる**（0.05em のまま再計算される）
- 大きい文字ほど相対的な字間は詰まる: **24px の見出しは `1.2px` = 0.05em**（こちらは要素側で `.05em` を書き直している）
- **子要素で `em` を宣言し直さない**（継承で配るのがこのサイトの設計）

> **DESIGN.md を書くときの注意**: `0.8px` という数字は「16px × 0.05em の結果」であって、設計値は `.05em`。**px で配らない。**

### 3.6 禁則処理・改行ルール

```css
body { overflow-wrap: anywhere; }
```

- **`word-break` は `normal`**（全幅で変化なし）。日本語の禁則処理はブラウザ既定に任せる
- そのうえで **`overflow-wrap: anywhere`** を `body` に当て、長い英数字・化学物質名が枠を突き抜けないようにしている。`word-break: break-all` とは違い、**和文の禁則は壊さない**

### 3.7 OpenType 機能

- **`font-feature-settings` は両ページとも 0 要素。** CSS にも宣言が無い
- **これは「やっていない」のではなく「効かない」。** 同一ページで隠し div の幅を測ると、
  `normal` **918.80px** / `"palt"` **918.80px** / `"halt"` **918.80px** で **1px も動かない**。
  配信されているのがサブセット版の BIZ UDPGothic で、字詰めのテーブルを持っていない
- **`palt` を足しても何も起きない。** 書かないのが正しい

### 3.8 縦書き

- **実装としては使っていない**（`writing-mode: vertical-rl` は両ページとも 0 要素）
- ヒーローに縦組みのコピーが見えるのは、**`<picture>` の webp に焼き込まれた文字**
- **縦組みを CSS で再現しようとしない**

---

## 4. Component Stylings

### Buttons

| 種類 | 面 | 文字 | radius | size / weight |
|------|----|------|--------|---------------|
| **カルーセル操作（丸）** | `#222222` | `#ffffff` | **50%** ＋ `2px solid #ffffff` | 16px / 400 |
| **一時停止（丸・太枠）** | `#222222` | `#006da1` | **50%** ＋ `3px solid #ffffff` | 16px / 400 |
| **ピル（左半分）** | `#222222` | `#ffffff` | **`1000px 0 0 1000px`**（`--RADIUS_RADIUS_PILL`） | 16px / 400 |
| **テキストリンク** | 透明 | `#222222` | 0 | 16px / 700 |
| **カード見出しリンク** | 透明 | `#222222` | 0 | 24px / 700 |

### Cards

角丸のトークンは 5 段。

```css
--RADIUS_RADIUS_L:    60px;
--RADIUS_RADIUS_M:    30px;
--RADIUS_RADIUS_S:     8px;   /* 最も多い。実測 19 要素 */
--RADIUS_RADIUS_XS:    4px;
--RADIUS_RADIUS_PILL: 1000px;
```

**ただし実測には、トークンに無い非対称の角丸が 2 種類ある。**

```css
/* 事業カード（上を立て、下を大きく丸める） */
border-radius: 8px 8px 150px 150px;    /* 実測 5 要素 */

/* 同じカードの反転（上を丸め、下を立てる） */
border-radius: 150px 150px 8px 8px;    /* 実測 5 要素 */

/* ナビのドロップダウン */
border-radius: 0 0 8px 8px;            /* 実測 7 要素 */
```

> **`150px` はトークンに無いハードコード。** 事業紹介カードを**花びらのような形**にするための意図的な値で、**8px に丸めると別物になる。**

### Badges / Chips

- 事業セグメント: 面は `--COLOR_EX_*` の 5 色 / 文字 `#ffffff` / radius 8px / 22px / 700 / `letter-spacing: 1.2px`

---

## 5. Layout Principles

### Spacing Scale（8px グリッド）

```css
--SPACING: 8px;

--MODULE_MARGIN_XXS: calc(8px * 2);   /*  16px */
--MODULE_MARGIN_XS:  calc(8px * 3);   /*  24px */
--MODULE_MARGIN_SM:  calc(8px * 4);   /*  32px */
--MODULE_MARGIN_MD:  calc(8px * 6);   /*  48px */
--MODULE_MARGIN_L:   calc(8px * 7);   /*  56px */
--MODULE_MARGIN_XL:  calc(8px * 8);   /*  64px */
--MODULE_MARGIN_XXL: calc(8px * 10);  /*  80px */

--SIZE_MODULE_MARGIN:        calc(8px * 6);
--SIZE_NESTED_MODULE_MARGIN: calc(8px * 3);
```

**実測の `gap` も 8 の倍数に揃っている**: `0 32px`（14 要素）/ `12px 32px`（10 要素）/ `24px`（13 要素）/ `32px`（6 要素）/ `48px`（3 要素）/ `80px`（2 要素）。

### Container

```css
--CONTENT_WIDTH_PC: 1200px;
--CONTENT_WIDTH_SP: calc(375px - calc(8px * 2) * 2);   /* = 343px */
--OUTSIDE_GUTTER_PC: calc(8px * 4);                     /* = 32px */
--OUTSIDE_GUTTER_SP: calc(8px * 2);                     /* = 16px */
--HEADER_HEIGHT: 82px;
--HEADER_HEIGHT_TOP: 24px;
```

> **モバイルの設計幅は 375px**（`--CONTENT_WIDTH_SP` の式から読める）。

### Breakpoints（レンジ構文）

```css
--MAJOR_BREAKPOINT: 768px;
--MINOR_BREAKPOINT: 1200px;

@media print, screen and (width >= 768px)       { }
@media print, screen and (width >= 1200px)      { }
@media print, screen and (width >= 1360px)      { }
@media print, screen and (768px < width < 1200px) { }
@media only screen and (any-hover: hover)       { }
```

- **メディアクエリは `min-width` ではなく新しいレンジ構文（`width >= 768px`）で書かれている**。そのまま写す
- `print` を必ず併記する
- ホバーは `(any-hover: hover)` でガードする

### Z-Index

```css
--Z_INDEX_HAMBURGER:      3000;
--Z_INDEX_NAVIGATION_TOP: 2000;
--Z_INDEX_LAYER3:          300;
--Z_INDEX_LAYER2:          200;
--Z_INDEX_LAYER1:          100;
--Z_INDEX_BEHIND:           -1;
```

### Transition

```css
--TRANSITION: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
--TRANSITION_DURATION: 0.3s;
--TRANSITION_EASING: cubic-bezier(0.25, 0.8, 0.25, 1);
```

---

## 6. Depth & Elevation

影は **1 種類しかない**（両ページとも 1 要素）。

```css
/* グローバルナビのドロップダウン */
box-shadow: rgba(88, 96, 99, 0.1) 0 0 16px 0;
```

- **色は黒ではなく `--COLOR_FOREGROUND_MEDIUM_DARK`（`#586063`）の 10%。** 黒に丸めない
- オフセット 0 / ぼかし 16px / 広がり 0
- **カードには影を使わない。** 面の分離は `#f6f6f6` の地色と角丸で行う

---

## 7. Do's and Don'ts

### Do（推奨）

- **本文書体は `BIZ UDPGothic` 1 本**。和文も欧文も数字もこれで組む
- **`line-height` は `1.9`**（`--LINE_HEIGHT`）
- **`letter-spacing: .05em` を `body` に 1 回だけ書く**
- **サイズは `calc(N / var(--FONT_SIZE_ROOT) * 1rem)` で書く**
- **余白は 8px の倍数**（`--MODULE_MARGIN_*`）
- **メディアクエリはレンジ構文（`width >= 768px`）**
- **`overflow-wrap: anywhere` を `body` に当てる**（長い化学物質名の対策）
- 事業カードの角丸は **`8px 8px 150px 150px`** をそのまま使う

### Don't（禁止）

- **`font-feature-settings: "palt"` を書かない。** 配信書体がサブセット版で、実測 0px の差しか出ない（＝何も起きない）
- **`font-weight: 500` を使わない。** Regular で描画されるので 400 と区別がつかない。**300 や 600 も同じ**
- **`letter-spacing` を子要素に `em` で配り直さない。** `body` からの px 継承がこのサイトの設計
- **`letter-spacing: 0.8px` と px で書かない。** モバイルで 0.7px にならなくなる
- **`--COLOR_BRAND_PRIMARY`（`#009be6`）を実装色として使わない。** 2 ページとも可視 0 要素
- **ヒーローのコピーを実テキストで組まない。** 横組みも縦組みも `<picture>` の webp
- **`writing-mode: vertical-rl` を実装しない。** このサイトに縦組みの実装は無い
- **本文に純黒 `#000000` を使わない。** `#222222` が正
- **`@font-face` を CSS に書く前提で読まない。** このサイトは JS の FontFace API で登録している
- カードに影を足さない（影はナビのドロップダウン 1 箇所だけ）

---

## 8. Responsive Behavior

### ルートは固定、body だけが 1 段落ちる

| 幅 | `html` | `body` | letter-spacing | line-height | `h1` | `p` |
|----|--------|--------|----------------|-------------|------|-----|
| 1940 〜 **768px** | 16px | **16px** | **0.8px** | 30.4px | 32px | 16px |
| **767px** 〜 375px | 16px | **14px** | **0.7px** | 26.6px | 28px | 14px |

- **崖は 768/767 の 1 箇所だけ**で、倍率は 1.14 倍と穏やか
- `html` は 15 幅すべてで 16px。**`rem` はどこでも 16px**
- 1200px / 1360px のブレークポイントはレイアウト（カラム数・ガター）だけを変え、**文字サイズは動かさない**

### タッチターゲット

- ヘッダー高さ 82px（`--HEADER_HEIGHT`）、トップのみ 24px（`--HEADER_HEIGHT_TOP`）
- 丸ボタンは 44px 前後 ＋ 2〜3px の白枠

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
和文:      "BIZ UDPGothic", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif
ウェイト:  400 と 700 の 2 段だけ
本文:      16px（≧768px）/ 14px（≦767px）
行間:      1.9（--LINE_HEIGHT）
字間:      body に .05em を 1 回（= 0.8px / モバイル 0.7px）
本文色:    #222222
補助色:    #586063
面:        #f6f6f6
リンク:    #006da1
余白:      8px の倍数（--MODULE_MARGIN_*）
radius:    8px / 4px / 30px / 60px / 1000px ＋ 事業カードの 8px 8px 150px 150px
影:        rgba(88,96,99,.1) 0 0 16px 0（ナビのみ）
palt:      使わない（効かない）
MQ:        @media print, screen and (width >= 768px)
```

### プロンプト例

> ダイセルのデザインで事業紹介カードを作って。書体は `BIZ UDPGothic` 1 本、ウェイトは 400 と 700 だけ。
> `body` に `letter-spacing: .05em` と `line-height: 1.9` と `overflow-wrap: anywhere` を当てる。
> カードは面 `#f6f6f6`、角丸 `8px 8px 150px 150px`、影なし。見出しは 24px / 700 / `letter-spacing: .05em`。
> 余白は 8px の倍数、メディアクエリは `@media print, screen and (width >= 768px)` のレンジ構文で。
> **`font-feature-settings: "palt"` は書かない**（サブセット書体なので効かない）。
> **`font-weight: 500` も書かない**（Regular で描画される）。
