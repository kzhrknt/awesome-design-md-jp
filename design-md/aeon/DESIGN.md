# DESIGN.md — イオン（AEON）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-01 / 対象: `https://www.aeon.info/`, `https://www.aeon.info/company/concept/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 小売グループのコーポレートサイト。白地に **マゼンタ（`#b60081`）** を一点。全面写真のヒーローと、`border-radius: 32px` の大きな角丸カードで組む
- **密度**: ゆるい。本文 `line-height: 1.6`、ニュース本文は 1.8。`letter-spacing` は 206 要素中 201 要素が `normal`
- **キーワード**: 和文 Zen Kaku Gothic New ＋ 欧文 Poppins、角丸 32px、ルート固定で body だけ `clamp()`、使われていない色ランプ 18 色

**このサイトの核心は5つある。**

1. **和文 Zen Kaku Gothic New・欧文 Poppins の二層を、役割で切り分けている。**
   Zen Kaku が 159 要素、Poppins が 36 要素。Poppins が出るのは **セクションの英字見出し（`Group Topics` / `AEON Group` / `Sustainability` の 48px）と日付だけ**。
   どちらも Google Fonts ではなく **Cloudflare Fonts（`/cf-fonts/s/zen-kaku-gothic-new/5.2.7/...`）で自ドメイン配信**
2. **`html { font-size: 62.5% }`（10px）は 6 幅すべてで固定なのに、`body` だけが `clamp()` で連続して縮む。**
   `body { font-size: var(--text-md) }`、`--text-md: clamp(1.4rem, 1.309rem + 0.38vw, 1.6rem)`。
   1440〜767px は上限の **16px** に張り付き、**375px で 14.515px**。崖ではなく連続流体なので、整数幅で撮ると気づけない
3. **色変数 155 個のうち、ブランド色は 2 つだけ。残る 18 色は Fluent UI の既定ランプがそのまま残っている。**
   `--color-main-10: #b60081` と `--color-main: var(--color-main-10)` がマゼンタ。
   **`--color-main-20`〜`--color-main-90` は青（`#deecf9` … `#003055`）、`--color-sub-10`〜`--color-sub-90` は黄（`#fdf4e3` … `#533800`）で、2 ページとも可視 0 要素**
4. **角丸 32px がこのサイトの形。** `border-radius: 32px` 53 要素、**`32px 32px 0 0`（上端だけ）48 要素**、タグは 25px、丸ボタンは 50%。影は 1 種類（`rgba(0,0,0,.1) 2px 4px 32px`）が 5 要素だけ
5. **下層ページは別世代のテンプレートと同居している。**
   `/company/concept/` の本文は Zen Kaku（19 要素）だが、グローバルナビとフッターは
   `-apple-system, blinkMacSystemFont, "Helvetica Neue", "Segoe UI", "Yu Gothic", YuGothic, 游ゴシック体, Meiryo, sans-serif`（**24 要素**）。
   ナビの CTA 面も `#AF1D7B` で、トップの `#B60081` と別の色

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 変数名 | 実測 |
|------|--------|--------|------|
| **AEON Magenta** | **`#B60081`** | `--color-main-10` / `--color-main` / `--color-link` | 文字 27 要素・面 7 要素（トップ）。ロゴ、アイコン、タグ文字、丸ボタンの枠、`重要なお知らせ` の見出し |
| **AEON Magenta（旧テンプレート）** | `#AF1D7B` | — | 下層のグローバルナビ `企業情報` の面（1 要素）。**変数に無いハードコード** |

> **マゼンタが 2 つある。** `#B60081`（0,182 → rgb 182,0,129）と `#AF1D7B`（rgb 175,29,123）。
> 新規実装は **`#B60081`** に揃える。下層の `#AF1D7B` は旧テンプレートの残り。

### Neutral（ニュートラル）

- **Text Primary** (`#000000`, `--color-type`): 本文・見出し・ナビ。**可視 120 要素で最多。このサイトは本文に純黒を使う**
- **Text Muted** (`#808080`, `--color-gray-50` の実体): 日付・カードの補足文（49 要素）
- **Text on Dark** (`#FFFFFF`): フッター、写真の上（9 要素）
- **Text Copyright** (`#999999`): フッター最下部（1 要素）
- **Text Secondary** (`#333333`): 下層テンプレートのナビ・リンク（15 要素）
- **Surface Gray** (`rgba(235,235,235,.6)`): セクションの地（3 要素）／ **`#E6E6E6`**: ニュース種別タグの面（10 要素）
- **Surface Light** (`#F2F2F2`, `--color-gray-30`): 下層のページタイトル帯、カード面（6 要素）
- **Divider** (`#CCCCCC`, `--color-gray-40`): 罫線（18 要素）
- **Footer** (`#3F3F3F`): フッター上段の面
- **Background** (`#FFFFFF`): ページ背景。`heroCovered: true`（`kv_sp.jpg` 1541×963 が全面）だが、コンテンツの地色は白

### Hero Overlay

```css
background-image: linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7));
```

写真の下 40% だけを暗くして白文字を載せる（3 要素）。

### 宣言はあるが使われていない色（2 ページとも可視 0）

**`--color-main-*` の 20〜90 は青、`--color-sub-*` は黄。どちらも Fluent UI の既定ランプで、ブランド色とつながっていない。**

| グループ | 値 | 備考 |
|----------|-----|------|
| `--color-main-20` 〜 `--color-main-90` | `#deecf9` `#c7e0f4` `#2b88d8` `#0078d4` `#106ebe` `#005a9e` `#004578` `#003055` | **青**。`--color-main-10` だけがマゼンタに差し替えられている |
| `--color-sub-10` 〜 `--color-sub-90` / `--color-sub` | `#fdf4e3` … `#533800` / `#d48c00` | **黄**。1 要素も使われていない |
| `--color-main-rgb` | `0,120,212` | **青のまま残っている。** `rgb(var(--color-main-rgb) / .5)` と書くと**マゼンタではなく青が出る** |
| `--color-main-10-rgb` 〜 `--color-main-90-rgb` ほか `-rgb` 別名 | 同上 | 同じく差し替え漏れ |
| `--color-gray-50` | `grey`（キーワード） | 実装は `#808080` 相当 |
| `--color-input-border` | `#666` | 可視 0 |

> **`--color-main-10` 以外の `--color-main-*` を参照しないこと。** 名前から「ブランド色の濃淡」だと読むと、画面に青が出る。

---

## 3. Typography Rules

### 3.1 和文フォント

- **Zen Kaku Gothic New**（400 / 500 / 700）。Cloudflare Fonts で `unicode-range` 分割配信（`/cf-fonts/s/zen-kaku-gothic-new/5.2.7/<subset>/<weight>/normal.woff2`）
- 可視 159 要素。**日本語のほぼ全部がこれ**
- **Noto Serif JP** が 1 要素だけ出る —— トップの緊急告知バー（18px / 700 / `line-height: 1.8`）。`--font-serif`（游明朝）とは別物で、ここだけハードコード
- `"Hiragino Kaku Gothic ProN"` が 1 要素（スキップリンク `このページの本文へ`）。設計ではなくリセット漏れ

### 3.2 欧文フォント

- **Poppins**（400 / 500 / 600 / 700 を読み込み、使っているのは 400 と 500）。同じく Cloudflare Fonts 配信
- 出る場所は **セクションの英字見出し 48px / 500** と **日付 16px・14px / 400** のみ
- **Material Symbols Outlined**（可変 `100 700`）をアイコンに使用。9 要素、`font-feature-settings: "liga"`

### 3.3 font-family 指定

```css
:root {
  --font-sans-serif: "Zen Kaku Gothic New", sans-serif;
  --font-en: "Poppins", sans-serif;
  --font-serif: "游明朝体", "Yu Mincho", yumincho, "ヒラギノ明朝 Pro", "Hiragino Mincho Pro", serif;
}

body {
  font-family: var(--font-sans-serif);
  font-size: var(--text-md);
  font-weight: var(--font-normal);
  line-height: var(--line-height-md);
  color: var(--color-type);
  text-rendering: optimizespeed;
  -webkit-font-smoothing: antialiased;
}

.u-font-en, ._en { font-family: var(--font-en); }   /* 英字見出し・日付 */
```

> **`--font-serif` は 2 ページとも可視 0。** 明朝が出ている唯一の箇所（緊急告知バー）は `"Noto Serif JP", serif` を直接書いており、この変数を通っていない。

**下層の旧テンプレート（ナビ・フッター・パンくず）は別スタック:**

```css
/* 実サイトはこうだが、新規実装では使わない */
font-family: -apple-system, blinkMacSystemFont, "Helvetica Neue", "Segoe UI",
             "Yu Gothic", YuGothic, 游ゴシック体, Meiryo, sans-serif;
```

### 3.4 文字サイズ・ウェイト階層

**1440px の実測値。**

| Role | Font | Size | Weight | Line Height | Letter Spacing | Color |
|------|------|------|--------|-------------|----------------|-------|
| Section EN | **Poppins** | **48px** | 500 | 1.00 | **−0.96px**（−0.02em） | `#B60081` |
| Card Heading (3xl) | Zen Kaku | 32px | **500** | 1.50 | normal | `#000000` |
| Lead | Zen Kaku | 24px | 700 | 1.60 | normal | `#000000` |
| Icon | Material Symbols | 24px | 400 | 1.00 | normal | `#B60081` / `#000000` |
| Notice（明朝） | **Noto Serif JP** | 18px | 700 | 1.80 | normal | `#000000` |
| Card Heading (lg) | Zen Kaku | 18px | 700 | 1.50 | normal | `#000000` |
| News Item | Zen Kaku | 18px | 700 | **1.80** | normal | `#000000` |
| IR Item | Zen Kaku | 18px | 700 | 1.60 | normal | `#000000` |
| **Body** | Zen Kaku | **16px** | **400** | **1.80** | **normal** | `#000000` |
| Link | Zen Kaku | 16px | 400 / 500 | 1.60 | normal | `#000000` |
| Section Link | Zen Kaku | 16px | 700 | 1.40 | normal | `#000000` |
| Date (EN) | **Poppins** | 16px / 14px | 400 | 1.40 / 1.80 | normal | `#808080` |
| Nav | Zen Kaku | 14px | 700 | 1.40 | normal | `#000000` |
| Tag（会社名） | Zen Kaku | 14px | 500 | 1.00 | normal | `#B60081` |
| Tag（種別） | Zen Kaku | 14px | 500 | 1.40 | normal | `#000000` |
| Card Text | Zen Kaku | 14px | 400 | 1.80 | normal | `#808080` |
| Footer Link | Zen Kaku | 14px | 500 | 1.60 | normal | `#FFFFFF` |

**ウェイトは 400 / 500 / 700 の 3 段。** `--font-normal: 400` / `--font-medium: 500` / `--font-bold: 700` の 3 つしか宣言が無く、実測も 700（76）/ 400（71）/ 500（59）の 3 つ。
**600 は設計に存在しない**（Poppins の 600 は `@font-face` を読み込んでいるが、どの要素にも当たっていない）。

> **見出しほど太い、ではない。** いちばん大きい 48px のセクション英字は **500**、32px のカード見出しも **500**。
> 700 が出るのは 24px 以下の見出し・ナビ・ニュースタイトル。

### 3.5 行間・字間

```css
:root {
  --line-height-xs: 1.4;
  --line-height-sm: 1.5;
  --line-height-md: 1.6;   /* body */
  --line-height-lg: 1.8;
  --line-height-xl: 2.2;   /* 2 ページとも可視 0 */
}
```

- **トークンはすべて単位なし。** 各要素が自分のサイズで再計算する。`px` や `em` に書き換えないこと
- 実測の多い順: **1.50（49）/ 1.80（48）/ 1.40（40）/ 1.60（33）**
- 本文ブロックは `1.8`、カード見出しは `1.5`、ナビは `1.4`
- **`--line-height-xl: 2.2` は宣言だけで 1 要素も使われていない**
- **`letter-spacing` は 206 要素中 201 要素が `normal`。** 負の字間を当てているのは **Poppins の 48px 見出し（`-0.96px` = −0.02em）5 要素だけ**

**実サイトの誤り:**

```css
/* 実サイトはこう書かれているが、letter-spacing は % を取らないので宣言ごと捨てられる */
.some-heading { font-size: var(--16px); font-weight: var(--font-medium); letter-spacing: 6%; }

/* 正しくはこう */
.some-heading { font-size: var(--16px); font-weight: var(--font-medium); letter-spacing: 0.06em; }
```

CSS 全文に 1 件。実際の画面では字間は効いておらず `normal` のまま出ている。

### 3.6 禁則処理・改行ルール

- `body` の `word-break` は **`normal`**（6 幅すべてで確認）
- CSS 内には `word-break: break-all` / `break-word` の宣言があるが、`body` には降りていない。本文に適用しないこと

### 3.7 OpenType 機能

**約物の詰めは一切していない。** `palt` も `halt` も宣言 0 件。

唯一の `font-feature-settings` は **アイコンフォントの合字**:

```css
.material-symbols-outlined { font-feature-settings: "liga"; }   /* 可視 9 要素 */
```

### 3.8 縦書き

縦書きは使用していない（`writing-mode: vertical-*` 0 要素）。

---

## 4. Component Stylings

### Cards

**このサイトの形は `border-radius: 32px`。**

```css
/* カード全体 */
.c-card {
  background: #fff;
  border-radius: 32px;                      /* 実測 53 要素 */
  box-shadow: 2px 4px 32px rgba(0, 0, 0, .1);  /* 実測 5 要素 */
}

/* カード内の画像など、上端だけ丸める */
.c-card__media { border-radius: 32px 32px 0 0; }   /* 実測 48 要素 */

/* 小さめのカード（ニュース） */
.p-news__card { border-radius: 24px 24px 0 0; }    /* 実測 3 要素 */
```

### Buttons

```css
/* 丸アイコンボタン（クイックアクセス） */
.p-top-quick-access__icon {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: #B60081;
  color: #fff;
  padding: 16px;
}
.p-top-quick-access__icon--outline {
  background: #fff;
  border: 2px solid #B60081;
  color: #B60081;
  padding: 20px;
}

/* カルーセルの矢印 */
.c-carousel__arrow {
  width: 48px; height: 48px;
  border-radius: 50px;
  background: #fff;
}
```

### Badges / Tags

```css
/* ニュース種別 */
.p-news__info-tag {
  background: #E6E6E6;
  color: #000;
  border-radius: 25px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

/* 会社名タグ（面なし・マゼンタ文字） */
.c-tag { color: #B60081; font-size: 14px; font-weight: 500; line-height: 1; }
```

---

## 5. Layout Principles

### Spacing Scale

`--space-0` 〜 `--space-96` の 34 段。Tailwind 風だが**一部の値が独自**。

| 変数 | 値 | 備考 |
|------|-----|------|
| `--space-px` 〜 `--space-7` | `1px` `2px` `4px` `6px` `8px` `10px` `12px` `16px` `20px` `24px` `28px` | 4px 刻み |
| **`--space-8`** | **`30px`** | Tailwind なら 32px。**独自** |
| `--space-9` 〜 `--space-24` | `36px` `40px` `48px` `56px` `64px` `80px` `96px` | |
| **`--space-28`** | **`114px`** | Tailwind なら 112px。**独自** |
| `--space-32` 〜 `--space-96` | `128px` … `384px` | |

**px 名の rem 変数**（`html` が 10px なので値と名前が一致する）:

```css
--10px: 1rem;  --12px: 1.2rem;  --14px: 1.4rem;  --16px: 1.6rem;
--20px: 2rem;  --24px: 2.4rem;  --32px: 3.2rem;  --48px: 4.8rem;  --64px: 6.4rem;
```

### Container

| 値 | 件数 | 用途 |
|----|------|------|
| **1344px** | 10 | **コンテンツの最大幅（最多）** |
| 1400px | 3 | ヒーロー直下の帯 |
| 660px | 2 | テキストブロック |
| 320px | 9 | カード列の最小幅 |
| 1480px / 1280px / 888px | 下層 | 旧テンプレート側 |

### Grid

実測の `gap`: **8px（9 件）/ 32px（7 件）/ 16px / 24px / 45px / 48px / 64px**。

---

## 6. Depth & Elevation

**影は 1 種類だけ。**

```css
box-shadow: 2px 4px 32px rgba(0, 0, 0, .1);   /* 実測 5 要素（グループ事業カード） */
```

- ぼかし 32px は **角丸 32px と同じ数字**。形と影のスケールを揃えている
- オフセットは `x: 2px, y: 4px` と右下に寄せた非対称
- 残りのカードは影なし。**奥行きは影ではなく角丸と余白で作る**

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文は `"Zen Kaku Gothic New", sans-serif`、英字の見出しと日付だけ `"Poppins", sans-serif`
- 角丸は **32px**（カード）/ **`32px 32px 0 0`**（カードの画像部）/ **25px**（タグ）/ **50%**（丸ボタン）
- `line-height` はトークン（1.4 / 1.5 / 1.6 / 1.8）から単位なしで選ぶ。本文ブロックは 1.8
- ウェイトは 400 / 500 / 700 の 3 段
- 本文の色は **純黒 `#000000`**、補助文は `#808080`
- ブランド色は `#B60081` の 1 色だけ
- 字間は `normal`。例外は Poppins の大見出しに `-0.02em`

### Don't（禁止）

- **`--color-main-20`〜`--color-main-90` と `--color-sub-*` を使わない。** Fluent UI の既定ランプがそのまま残っているだけで、**青と黄が出る**
- **`rgb(var(--color-main-rgb) / α)` と書かない。** `--color-main-rgb: 0,120,212` は青のまま差し替え漏れしている。透明度が要るなら `#B60081` から自分で rgba を作る
- **`--font-serif`（游明朝）を使わない。** 2 ページとも可視 0。明朝が要るのは緊急告知バーだけで、そこは `"Noto Serif JP", serif`
- **`--line-height-xl: 2.2` を使わない**（可視 0）
- **`letter-spacing: 6%` と書かない。** `letter-spacing` は `%` を取らない。`0.06em` と書く
- **600 のウェイトを当てない**（設計に存在しない）
- **「見出しほど太い」と決めつけない。** 48px と 32px の見出しは 500、700 は 24px 以下
- **下層の `-apple-system, …, 游ゴシック体, Meiryo` スタックを真似ない**（旧テンプレートの残り）
- `line-height` を `px` / `em` に書き換えない

---

## 8. Responsive Behavior

### Breakpoints

**range 構文（`width >= …` / `width <= …`）で書かれている。**

| Breakpoint | 件数 | 役割 |
|------------|------|------|
| `only screen and (width >= 1024px)` | **212** | **デスクトップの既定。最多** |
| `only screen and (width <= 1023px)` | 48 | タブレット以下 |
| `(any-hover: hover)` | 26 | ホバー演出 |
| `only screen and (width >= 768px)` | 19 | タブレット |
| `only screen and (width >= 1280px)` | 7 | ワイド |
| `only screen and (width <= 767px)` | 4 | モバイル |
| `only screen and (width <= 575px)` / `(width >= 576px)` | 4 / 3 | 小型モバイル |

### フォントサイズの調整

```css
html { font-size: 62.5%; }              /* 10px。6 幅すべてで固定 */
body { font-size: var(--text-md); }     /* clamp(1.4rem, 1.309rem + 0.38vw, 1.6rem) */
```

**`html` は動かないのに `body` が動く。** `--text-2xs` 〜 `--text-5xl` の 9 段がすべて `clamp()`。

| 変数 | 式 | 1440px | 375px |
|------|-----|--------|-------|
| `--text-2xs` | `clamp(1rem, 0.909rem + 0.38vw, 1.2rem)` | 12px | 10.515px |
| `--text-xs` | `clamp(1.2rem, 1.109rem + 0.38vw, 1.4rem)` | 14px | 12.515px |
| `--text-sm` | `clamp(1.2rem, 0.845rem + 0.74vw, 1.4rem)` | 14px | 12px |
| **`--text-md`** | **`clamp(1.4rem, 1.309rem + 0.38vw, 1.6rem)`** | **16px** | **14.515px** |
| `--text-lg` | `clamp(1.6rem, 1.245rem + 0.74vw, 1.8rem)` | 18px | 16px |
| `--text-xl` | `clamp(1.8rem, 0.733rem + 2.22vw, 2.4rem)` | 24px | 18px |
| `--text-2xl` | `clamp(2.4rem, 2.218rem + 0.77vw, 2.8rem)` | 28px | 24px |
| `--text-3xl` | `clamp(2.8rem, 2.09rem + 1.49vw, 3.2rem)` | 32px | 28px |
| `--text-4xl` | `clamp(3.8rem, 3.346rem + 1.94vw, 4.8rem)` | 48px | 38px |
| `--text-5xl` | `clamp(4rem, 2.637rem + 5.82vw, 7rem)` | 70px | 40px |

6 幅の実測（1440 / 1200 / 1024 / 834 / 768 / 767 / 375px）:

| 幅 | `html` | `body` |
|----|--------|--------|
| 1440 〜 767px | 10px | **16px**（clamp の上限に張り付き） |
| 375px | 10px | **14.515px** |

> **崖は無い。767px までは 16px のままで、そこから下は式が連いて縮む。**
> **`clamp()` の式をそのまま写し、px は「1440px のときの値」として併記すること。** px だけで書くとモバイルで 1.5px ずれる。

### タッチターゲット

- クイックアクセスの丸ボタン 64×64px
- カルーセルの矢印 48×48px
- カードは 432px 幅（1344px の 3 カラム、`gap: 32px`）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```css
:root {
  /* Type */
  --font-sans-serif: "Zen Kaku Gothic New", sans-serif;
  --font-en: "Poppins", sans-serif;
  --font-normal: 400;
  --font-medium: 500;
  --font-bold: 700;
  --line-height-xs: 1.4;
  --line-height-sm: 1.5;
  --line-height-md: 1.6;
  --line-height-lg: 1.8;
  --text-md: clamp(1.4rem, 1.309rem + 0.38vw, 1.6rem);

  /* Color（これだけ使う） */
  --color-main: #b60081;
  --color-type: #000;
  --color-link: #b60081;
  --color-gray-muted: #808080;
  --color-border: #ebebeb;
  --color-tag-bg: #e6e6e6;

  /* Shape */
  --radius-card: 32px;
  --radius-tag: 25px;
  --shadow-card: 2px 4px 32px rgba(0, 0, 0, .1);

  /* Space */
  --space-2: 8px;  --space-6: 24px;  --space-8: 30px;  --space-12: 48px;
}

html { font-size: 62.5%; }           /* 10px */
body {
  font-family: var(--font-sans-serif);
  font-size: var(--text-md);
  font-weight: var(--font-normal);
  line-height: var(--line-height-md);
  color: var(--color-type);
}
```

### プロンプト例

> イオンのデザインで、グループ事業の紹介ページを作ってください。
> 和文は `"Zen Kaku Gothic New", sans-serif`、**セクションの英字見出しと日付だけ** `"Poppins", sans-serif`。英字見出しは 48px / 500 / `letter-spacing: -0.02em` / `#B60081`。
> `html` は `62.5%`（10px）固定、`body` は `clamp(1.4rem, 1.309rem + 0.38vw, 1.6rem)`（1440px で 16px、375px で 14.5px）。
> ウェイトは 400 / 500 / 700 の 3 段だけ。**48px と 32px の見出しは 500、700 は 24px 以下**に使う。
> 本文の色は純黒 `#000000`、補助文は `#808080`。ブランド色は `#B60081` の 1 色だけで、**青や黄の色ランプは使わない**。
> カードは `border-radius: 32px`、画像部は `32px 32px 0 0`、タグは `25px` のピル（面 `#E6E6E6`）。影は `2px 4px 32px rgba(0,0,0,.1)` を 1 種類だけ。
> `letter-spacing` は本文・見出しとも `normal`。`palt` / `halt` は使わない。
