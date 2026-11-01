# DESIGN.md — アルプスアルパイン（ALPS ALPINE）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-01 / 対象: `https://www.alpsalpine.com/j/`, `https://www.alpsalpine.com/j/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 電子部品メーカーのコーポレートサイト。白地に **紺（`#002F70`）** 一色。英字は Roboto、和文は Noto Sans JP で、**欧文を大きく細く・和文を小さく太く**組む
- **密度**: 中。本文 `line-height: 1.5`。**字間も約物の詰めも一切触らない**
- **キーワード**: 字間ゼロ介入、英字 47px / weight 400、左側だけ 46px の部分角丸、374px の崖、使われていない変数

**このサイトの核心は5つある。**

1. **字間をひとつも触っていない。** 可視 95 要素の **100% が `letter-spacing: normal`**。`font-feature-settings` の宣言も CSS 全文で 0 件。
   `palt` も `halt` も使わず、書体の素の字送りで組んでいる
2. **英文 Roboto と和文 Noto Sans JP を「面」で切り分け、太さを逆転させている。**
   Roboto が出るのは **ヒーローの 68px / 700** と **セクション見出しの 47px / 400** の 8 要素だけ。
   残り 87 要素は Noto Sans JP。そしてセクション見出しの和文サブは **16px / 700** ——
   **英字は大きく細く、和文は小さく太い**
3. **`html { font-size: 62.5% }`（10px）が、374px で `50%`（8px）に落ちる。**
   375px → 374px の 1px で、本文 16px → **12.8px**、セクション見出し 37px → **29.6px**。**ページ全体が 0.8 倍**になる。
   規定の測定幅（1440 / 1200 / 1024 / 834 / 768 / 767 / 375px）には入らないので、**374px を必ず測る**
4. **CSS 変数 22 個のうち、画面に出るのは 3 つだけ。** `--site-color-main: #002f70` / `--site-color-text: #000` / `--site-color-baseA: #fff`。
   サブカラー・リンク色・注意色・テーブル色の計 10 個は **2 ページとも可視 0 要素**
5. **`body` の `font-family` を言語ごと丸ごと差し替える。**
   日本語は `'Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif`、
   中国語は `'PingFang SC', 'Microsoft YaHei', sans-serif`。スタックを足すのではなく**置き換える**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 変数名 | 実測 |
|------|--------|--------|------|
| **Alps Alpine Navy** | **`#002F70`** | `--site-color-main` | 面 25 要素（トップ）/ 12（下層）、文字 3〜10 要素。CTA ボタン、ユーティリティボタンの枠と文字、リンク |
| IR Badge（適時開示） | `#003399` | — | 面 3 要素。**変数に無いハードコードの別の青** |
| IR Badge（IR 資料） | `#717171` | — | 面 1 要素 |

> **紺が 2 つある。** `#002F70`（rgb 0,47,112）と `#003399`（rgb 0,51,153）。
> 後者は IR 一覧のカテゴリバッジだけ。新規実装は `#002F70` に揃える。

### Neutral（ニュートラル）

- **Text Primary** (`#000000`, `--site-color-text`): 本文・見出し。**可視 57 要素で最多。このサイトは本文に純黒を使う**
- **Text on Dark** (`#FFFFFF`, `--site-color-baseA`): ヘッダー、ヒーロー、CTA、フッター（34 要素）
- **Background** (`#FFFFFF`): `body` に直接指定。`heroCovered: true` だがコンテンツの地色は白

### Section Background

```css
background-image: linear-gradient(rgba(255, 255, 255, .84) 0%, rgb(255, 255, 255) 30%);
```

セクション上端だけ写真をうっすら透かす（トップ 7 要素 / 下層 2 要素）。下層の `TOP` 帯は `80%` 版。

### 宣言はあるが使われていない色（2 ページとも可視 0）

| 変数 | 値 |
|------|-----|
| `--site-color-subA` | `#4378e2`（明るい青） |
| `--site-color-subB` | `#1da4b4`（シアン） |
| `--site-color-link` | `#6795d6`（水色） |
| `--site-color-member` | `#007575`（緑） |
| `--site-color-caution` | `#cf0101`（赤） |
| `--site-color-baseB` | `#f8f8f8` |
| `--site-table-th1` / `th2` / `bg-accent1` / `border1` | `#e6e6e6` / `#f3f3f3` / `#e2e6ec` / `#ccc` |

> **変数が 22 個しか無いのに、その半分が死んでいる。** このサイトは実値運用で、`#002F70` を直接書いている箇所が多い。
> **「変数が少ない＝設計が薄い」ではなく「トークン化していない」**と読む。

> `--dydmvp0: 90px` は JS が実行時に書き込む動的ビューポート変数（`--header-height` と同値）。デザイントークンではない。

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP**（400 / 500 / 700）。**Google Fonts** 配信 —— `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap`
- 可視 87 要素（トップ）/ 46（下層）
- スタックの受け皿に OS ローカル書体を 4 つ並べる（`'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo'`）
- **`@font-face` はサイト全体で 6 本だけ**（Noto Sans JP 3 ＋ Roboto 3）

### 3.2 欧文フォント

- **Roboto**（400 / 700 / 900 を読み込み）。`https://fonts.googleapis.com/css2?&family=Roboto:wght@400;700;900&display=swap`
- 可視 8 要素だけ —— ヒーローの 68px / 700 と、セクション見出しの 47px / 400
- **900 は読み込んでいるが可視 0。500 は読み込んでいない** —— Roboto に `font-weight: 500` を当てると 400 が出る

### 3.3 font-family 指定

```css
/* 日本語ページ */
body {
  font-family: 'Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN',
               'Yu Gothic', 'Meiryo', sans-serif;
  font-size: 1.6rem;       /* html が 10px なので 16px */
  line-height: 1.5;
  font-weight: 400;
  text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

/* 中国語ページ — スタックごと差し替える */
body {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: 400;
}

/* 英字の見出し */
.c-heading01__main, .ff-robot-bold { font-family: Roboto, sans-serif; }
```

**游ゴシックのスタック割れに注意。** `'Yu Gothic'` しか書いていないため、Windows では **Regular（細い）** が当たる。
Medium を当てたいなら `"游ゴシック Medium", "Yu Gothic Medium"` を `'Yu Gothic'` より**前に**置く。
ただし実際には先頭の Noto Sans JP が Google Fonts から読み込まれるので、この受け皿に落ちるのは配信が失敗したときだけ。

### 3.4 文字サイズ・ウェイト階層

**1440px の実測値。374px 未満では全体が 0.8 倍になる（§8 参照）。**

| Role | Font | Size | Weight | Line Height | Letter Spacing | Color |
|------|------|------|--------|-------------|----------------|-------|
| Hero EN | **Roboto** | **68px** | 700 | 1.40 | normal | `#FFFFFF` |
| Hero JA | Noto Sans JP | 28px | 700 | 1.50 | normal | `#FFFFFF` |
| **Section EN** | **Roboto** | **47px** | **400** | **1.00** | normal | `#000000` |
| Section JA (sub) | Noto Sans JP | 16px | **700** | 1.50 | normal | `#000000` |
| Card Title (lg) | Noto Sans JP | 26px | 700 | 1.46 | normal | `#000000` |
| Card Title | Noto Sans JP | 20px | 500 | 1.45 | normal | `#000000` |
| News Heading | Noto Sans JP | 18.72px | 700 | 1.50 | normal | `#000000` |
| Text Link | Noto Sans JP | 18px | 700 | 1.50 | normal | `#002F70` |
| **Body / Lead** | Noto Sans JP | **16px** | **400** | **1.50** | **normal** | `#000000` |
| Global Nav | Noto Sans JP | 16px | 700 | 1.50 | normal | `#FFFFFF` |
| News Ticker | Noto Sans JP | 16px | 700 | 1.25 | normal | `#FFFFFF` |
| Button | Noto Sans JP | 14px | 500 | 1.43 | normal | `#FFFFFF` |
| Header Menu | Noto Sans JP | 14px | 500 | 1.50 | normal | `#FFFFFF` |
| Utility Button | Noto Sans JP | 12px | 700 | 1.00 | normal | `#002F70` |
| IR Badge | Noto Sans JP | 12px | 700 | 1.50 | normal | `#FFFFFF` |
| Footer Link | Noto Sans JP | 12px | 400 | 1.50 | normal | `#FFFFFF` |
| Copyright | Noto Sans JP | 10px | 400 | 1.50 | normal | `#FFFFFF` |

> **`18.72px` は端数ではなく仕様**（本文 16px の 1.17 倍）。6 幅すべてで動かない。

**ウェイトは 400 / 500 / 700 の 3 段。** 実測は 400（40）/ 700（33）/ 500（22）。
Noto Sans JP は `wght@400;500;700` の 3 本を読み込んでおり、**3 段とも実在する**。

> **Roboto には 500 が無い。** 読み込んでいるのは 400 / 700 / 900。
> セクション見出しが `font-weight: 400` なのは意図で、ここを 500 にしても 400 のまま出る。

### 3.5 行間・字間

```css
body {
  font-family: 'Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif;
  font-size: 1.6rem;   /* 16px */
  line-height: 1.5;    /* 単位なし */
  font-weight: 400;
}
```

- **`line-height: 1.5` は単位なし。** 各要素が自分のサイズで再計算する。実測 1.50 が 57 要素で最多
- 例外は **英字セクション見出しの 1.00**（47px）、カード見出しの 1.45 / 1.46、ニュースティッカーの 1.25、ボタンの 1.43
- **`letter-spacing` は可視 95 要素すべて `normal`。** `body` にも要素にも 1 つも書かれていない

> **このサイトを再現するとき、`letter-spacing` を一切書かないこと。**
> 親切のつもりで `0.05em` を足すと別物になる。

### 3.6 禁則処理・改行ルール

- `body` の `word-break` は **`normal`**（7 幅で確認）。`auto-phrase` も `break-all` も使っていない
- ヒーローの英文は `<br>` で「Shaping a future ／ where technology ／ extends your senses」と手で割っている

### 3.7 OpenType 機能

**`font-feature-settings` の宣言が CSS 全文で 0 件。** 約物の詰めを一切していない。

`palt` / `halt` を足さないこと。和文の約物はベタ組みのまま出るのがこのサイトの字面。

### 3.8 縦書き

縦書きは使用していない（`writing-mode: vertical-*` 0 要素）。

---

## 4. Component Stylings

### Buttons

**3 種類あり、角丸の値がそれぞれ違う。**

```css
/* Primary — 紺の塗り。カード下の導線 */
.c-btn01 {
  background: #002F70;
  color: #fff;
  border: 1px solid #002F70;
  border-radius: 4px;
  padding: 13px 20px;        /* 実測 230×48 */
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
}

/* Utility — ヘッダー右上の小さな枠線ボタン */
.c-btn-utility {
  background: #fff;
  color: #002F70;
  border: 1px solid #002F70;
  border-radius: 2px;
  padding: 0 10px;           /* 実測 高さ 24px */
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}

/* Text Link Button — 角丸なし */
.c-btn-link {
  background: #fff;
  color: #002F70;
  border: 1px solid #002F70;
  border-radius: 0;
  padding: 0 30px;           /* 実測 284×42 */
  font-size: 18px;
  font-weight: 700;
}
```

> **どのボタンも `border: 1px solid #002F70` を持つ**（塗りボタンも枠を持っている）。枠を外すと高さが 2px 縮む。

### 部分角丸（このサイトの形）

**左側だけを大きく丸める。**

```css
.p-card--leftRound { border-radius: 46px 0 0 46px; }   /* 実測 6 要素（トップ） */
.p-card--topLeft   { border-radius: 46px 0 0; }        /* 実測 1〜2 要素 */
.p-card--bottomLeft{ border-radius: 0 0 0 46px; }      /* 実測 1 要素（下層） */
```

一般のカードは `border-radius: 2px`（20 要素）か `4px`（13 要素）。**32px の円形パーツ**が 4 要素。

### Badges

```css
.s_eirModule_category_icon {
  background: #003399;   /* 適時開示 */
  color: #fff;
  border: 1px solid #003399;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
}
.s_eirModule_category_icon--doc { background: #717171; border-color: #717171; }  /* IR資料 */
```

---

## 5. Layout Principles

### Container

| 値 | 件数 | 用途 |
|----|------|------|
| **1440px** | 9（下層 6） | **コンテンツの最大幅（最多）** |
| 1600px | 1 | 最外のラッパ |
| 1200px | 1 | 本文ブロック |
| 500px | 1 | カード |

### Grid

実測の `gap`（多い順）:

| 値 | 件数 | 用途 |
|----|------|------|
| `0 10px` | 15（下層 8） | **最多。カード列の列間** |
| `50px 27px` | 4 | カードグリッド（行 50px / 列 27px） |
| `50px 48px` | 1（下層 2） | 大きめのカードグリッド |
| `10px 50px` | 1 | 横並びリスト |
| `0 20px` / `0 2px` / `64px` | 各 1 | |

### Spacing

- `--header-height: 90px`（`--dydmvp0` も同値）
- `--visual-bottom-margin: 140px`
- `--alap-footer-height: 230px`

---

## 6. Depth & Elevation

**サイト本体に影はほぼ無い。**

- 実測で出る `box-shadow` は **`rgba(0,0,0,.16) 0 3px 6px`（ヘッダーの言語切替パネル 1 要素）だけ**
- カード・ボタンは影なし。**奥行きは 1px の枠線と部分角丸で作る**
- `--ani-cb-01: cubic-bezier(0.27, 0.14, 0.02, 0.99)` / `--hover-transition: ease 0.2s` / `--hover-opacity: 0.7` ——
  **ホバーは影ではなく不透明度 0.7 で表現する**

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文は `'Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif`
- 英字の見出しだけ `Roboto, sans-serif`。**セクション見出しは 47px / weight 400**（細い）、その下の和文サブが 16px / 700
- `line-height` は `body` に単位なしの `1.5`
- ウェイトは 400 / 500 / 700 の 3 段
- ブランド色は `#002F70` の 1 色。本文は純黒 `#000000`
- ボタンは **塗りも枠線も `1px solid #002F70` を持つ**。角丸は塗り 4px / ユーティリティ 2px / テキストリンク 0
- 強い形が要るときは **左側だけ 46px の部分角丸**
- ホバーは `opacity: .7` ＋ `ease .2s`

### Don't（禁止）

- **`letter-spacing` を書かない。** 可視 95 要素すべて `normal` がこのサイトの設計
- **`font-feature-settings`（`palt` / `halt`）を足さない。** 宣言が 1 件も無い
- **`--site-color-subA` `subB` `link` `member` `caution` `baseB` とテーブル系 4 変数を使わない**（2 ページとも可視 0）
- **Roboto に `font-weight: 500` を当てない**（読み込んでいるのは 400 / 700 / 900）。**900 も可視 0**
- **セクション見出しを太字にしない。** 47px は 400 で出すのが設計
- **影を足さない。** 奥行きは枠線と角丸で作る
- **`html` を 10px 固定と決めつけない。** 374px 以下では 8px に落ちる
- `line-height` を `px` / `em` に書き換えない

---

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | 件数 | 役割 |
|------------|------|------|
| **`screen and (max-width: 767px)`** | 64（下層 52） | **モバイル。最多** |
| `screen and (width <= 767px)` | 25 | 同上（range 構文の併記） |
| `screen and (max-width: 1023px)` | 18 | タブレット |
| `screen and (max-width: 1279px)` | 12 | ノート PC |
| `(width <= 1000px)` | 3 | 一部モジュール |
| **`screen and (max-width: 374px)`** | 1 | **ルートを 8px に落とす。最重要** |

### フォントサイズの調整

```css
html { font-size: 62.5%; height: 100%; }                      /* 10px */
@media screen and (max-width: 374px) { html { font-size: 50%; } }   /* 8px */
```

7 幅 ＋ 崖の実測:

| 幅 | 実 `rem` | `body` | セクション見出し `h2` | `p` |
|----|----------|--------|----------------------|-----|
| 1440 〜 768px | 10px | 16px | **47px** | 16px |
| 767 〜 **375px** | 10px | 16px | **37px** | 15px |
| **374px 以下** | **8px** | **12.8px** | **29.6px** | **12px** |

**崖は 2 箇所。**

- **768 / 767** —— セクション見出しが 47px → 37px
- **375 / 374** —— **ルートが 10px → 8px になり、ページ全体が 0.8 倍**

> **計測の注意: 374px では `getComputedStyle(document.documentElement).fontSize` が `10px` を返す。**
> 同じ瞬間に `width: 10rem` のプローブ要素を置くと **80px（= 1rem が 8px）**、`font-size: 1rem` のプローブ要素の computed も `8px`。
> **ルートの値は CSS の宣言と `1rem` プローブで確かめること。** `html` の computed だけを見ると崖を見落とす。

### タッチターゲット

- プライマリボタン 230×48px
- ユーティリティボタン 高さ 24px（**モバイルでは別の導線に置き換わる**）
- フッターのリンクは 767px 以下で 12px → 18px に上がる

---

## 9. Agent Prompt Guide

### クイックリファレンス

```css
:root {
  --site-color-main: #002f70;
  --site-color-text: #000;
  --site-color-baseA: #fff;

  --header-height: 90px;
  --hover-transition: ease 0.2s;
  --hover-opacity: 0.7;
  --ani-cb-01: cubic-bezier(0.27, 0.14, 0.02, 0.99);
}

html { font-size: 62.5%; }                                     /* 10px */
@media screen and (max-width: 374px) { html { font-size: 50%; } }  /* 8px */

body {
  font-family: 'Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN',
               'Yu Gothic', 'Meiryo', sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: 400;
  color: var(--site-color-text);
  background: var(--site-color-baseA);
  /* letter-spacing も font-feature-settings も書かない */
}

.c-heading01__main { font-family: Roboto, sans-serif; font-size: 4.7rem; font-weight: 400; line-height: 1; }
.c-heading01__sub  { font-size: 1.6rem; font-weight: 700; line-height: 1.5; }
```

### プロンプト例

> アルプスアルパインのデザインで、製品カテゴリの一覧ページを作ってください。
> 和文は `'Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif`、英字の見出しだけ `Roboto, sans-serif`。
> **`letter-spacing` と `font-feature-settings` はどの要素にも書かないこと**（このサイトは字間も約物も触らない）。
> セクション見出しは **英字 47px / weight 400 / `line-height: 1`**、その下に和文サブを **16px / 700** で置く。英字を太字にしない。
> `html` は `62.5%`（10px）、374px 以下だけ `50%`（8px）。`body` は `1.6rem` / `line-height: 1.5` / 400。
> 色は `#002F70` の 1 色と純黒・白だけ。ボタンは塗り（`#002F70` / 角丸 4px / `padding: 13px 20px` / 14px / 500）と枠線（白面 / 角丸 2px / 12px / 700）の 2 種。どちらも `1px solid #002F70` を持たせる。
> 影は付けず、ホバーは `opacity: .7` と `transition: ease .2s`。強い形が要る箇所は `border-radius: 46px 0 0 46px` の部分角丸にする。
