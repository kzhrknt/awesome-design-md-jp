# DESIGN.md — ZEBRA（ゼブラ）

> ゼブラ株式会社（https://www.zebra.co.jp/）のデザイン仕様書。
> 1897 年創業の筆記具メーカー。サラサ・マッキー・マイルドライナー・ブレン・デルガードを擁する。
> **角丸を持たない**。CSS 中の `border-radius` 宣言は `0` が 23 回で最多、次が `3px`（8 回）と `2px`（4 回）。**ピル（pill）が 1 つも存在しない**。押せる面はすべて直角の矩形で、CTA は「白地 ＋ 1px の薄いグレー罫 ＋ 右向き矢印」に統一されている。
> **影も使わない**。`box-shadow` の実効宣言は `0 1px 2px 0 rgba(0,0,0,.16)` の 4 回だけで、カードもボタンもフラット。奥行きは**罫線と `#f8f8f8` の面**だけで作る。
> **色を持つのは赤 1 色**。`--var-color-primary: #fa051c` がリンク色・ホバー色・フォーカスリング色を兼ねる。トップページで拾えるユニーク背景色は `#f8f8f8`（18 回）と `#fa051c`（3 回）の **2 色しかない**。
> **和文は Zen Kaku Gothic New 単独**、英字の飾り見出しだけ **Satisfy（筆記体）**。どちらも Google Fonts なので、この DESIGN.md はローカルでも実サイトと同じ書体で再現できる。
> **CSS Custom Properties が 69 個**あり、色・フォント・z-index がすべて変数化されている。**製品ブランドごとのサブパレット**（サラサ＝橙、ブレン＝緑、デルガード＝紺、マイルドライナー＝水色、マッキー＝黒）も変数で持つ。
> 実サイトの computed style 実測（2026-08-30 取得。トップ ＋ 商品トップ `/pro/`）＋ 読み込まれる CSS 891KB の直接集計に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白・黒・赤の 3 色だけで、直角のまま組む**。ヒーローはモノクロの「手が書いている」写真タイル 10 枚に赤の図形（！の点と棒）を重ねたグリッドで、彩度を持つ要素は赤しかない。角丸も影もグラデーションも使わない
- **ゼブラについて**: 「かく、その先のこと。」をコーポレートスローガンに掲げる筆記具メーカー。**製品ブランドごとに色を持ち、コーポレートは赤**という二層構造がそのまま CSS 変数になっている
- **密度**: **中程度**。コンテンツ幅は 1170px（1440px ビューポート）。本文 16px に対し行間 26.88px（1.68）で、ゆったりでも詰まってもいない実務的な設定
- **キーワード**: 直角、1px の罫、`#fa051c` の赤、Zen Kaku Gothic New、Satisfy の筆記体、影なし
- **特徴**:
  - **`border-radius: 0` が既定**。角丸を許すのは製品カテゴリのラベル（`2px`）とアイコン（`50%`）だけ。**ボタンに丸みを付けると、このサイトではなくなる**
  - **セクション見出しが 2 段構え**。英語の見出しを **Satisfy（筆記体・赤・40px）** で置き、その下に和文のリード（16px / 500 / `letter-spacing: .04em`）を敷く。**和文の見出しを大きくするのではなく、英字の手書き風で場面を作る**
  - **ウェイトの主役は 500**。h3・p・ナビ・ボタンのほとんどが `font-weight: 500`。700 はロゴ（h1）とカテゴリタイル見出し、コピーライトだけ
  - **`letter-spacing` はほぼ `normal`**。効いているのは 0.8px（14〜16px に対し `.05em`）・0.64px（`.04em`）・1.5〜1.6px（フッター見出し）に限られる。**本文には字間を入れない**
  - **`font-feature-settings` の宣言が 0 個**（＝ `palt` を使わない）
  - **製品ブランド色は「主色 ＋ 極薄の対」で 1 セット**。例：サラサ `#fb8323` ＋ `#fff2e5`。カテゴリページの面に薄い方を使い、見出し・罫に濃い方を使う設計

---

## 2. Color Palette & Roles

> 地は `#ffffff`。`pageBackground.resolved` は `html`（`--var-color-white` / `--var-base-bg` に一致）。

### Brand（ブランド）

- **Zebra Red** (`#fa051c`, rgb 250,5,28): **唯一のブランドカラー**。`--var-color-primary` / `--var-color-text-link` / `--var-color-text-hover` / `--var-focus-outline-color` / `--var-color-label-company` を**すべて 1 色で兼ねる**。セクションの英字見出し、アクティブなタブ、企業情報ラベル、リンク、フォーカスリング
- **Ink Black** (`#141414`, rgb 20,20,20): `--var-color-text-primary` / `--var-color-black` / `--var-base-text`。**純黒 `#000000` は使わない**
- **Backdrop** (`#f8f8f8`, rgb 248,248,248): `--var-color-backdrop-primary`。非アクティブなタブ、ヘッダーのナビ面、セクションの地。**トップページのユニーク背景色 18 件がすべてこれ**

### 製品ブランドのサブパレット（`--var-color-brand-*`）

| ブランド | Primary | Secondly（面） |
|---------|---------|---------------|
| サラサ | `#fb8323` | `#fff2e5` |
| ブレン | `#0d9384` | `#f2faf9` |
| デルガード | `#0a3190` | `#f0f5ff` |
| マイルドライナー | `#53bbff` | `#f0f9ff` |
| マッキー | `#141414` | `#f4f4f4` |

**Secondly は必ず主色の極薄版**（明度 96〜99%）。面に敷き、文字は主色ではなく `#141414` を載せる。

### ラベル色（`--var-color-label-*`）

| 種別 | 色 | 用途 |
|------|-----|------|
| 企業情報 | `#fa051c` | ニュース一覧のカテゴリラベル |
| 商品情報 | `#263da6` | 同上（ネイビー。**ブランド赤の対になる唯一の有彩色**） |
| その他 | `#141414` | 同上 |

### Neutral / Surface

| 役割 | 変数 | 色 | 用途 |
|------|------|-----|------|
| ページ地 | `--var-base-bg` | `#ffffff` | 全ページ共通 |
| 面（薄） | `--var-color-gray-bg` | `#fafafa` | カードの地 |
| 面（標準） | `--var-color-backdrop-primary` | `#f8f8f8` | タブ・ナビ・セクション |
| 罫線 | `--var-color-gray` | `#d9d9d9` | **ボタン・カテゴリタイルの枠**（実測でここが最多） |
| 罫線（薄） | `--var-color-gray-border` | `#e2e2e2` | テーブル・区切り |
| 罫線（濃） | `--var-color-gray-item` | `#cccccc` | リスト項目 |
| 無効 | `--var-color-disabled` | `#efefef` | disabled のボタン面 |

### Text

| 役割 | 変数 | 色 |
|------|------|-----|
| 本文 | `--var-color-text-primary` | `#141414` |
| 補足 | `--var-color-text-secondly` | `#555555` |
| リンク / ホバー | `--var-color-text-link` / `-hover` | `#fa051c`（**ホバーで色が変わらない**。下線や矢印の移動で状態を示す） |
| コピーライト | — | `rgba(20,20,20,.5)` |

### Semantic（意味的な色）

`--var-color-success: #e9f3e6` / `--var-color-error: #fff5f5` / `--var-color-information: #e5f2f7` / `--var-color-warning: #fff5cc`

**4 つとも「極薄の面色」であって文字色ではない**。テキストは `#141414` のまま面だけを染める。エラーテキストに `#fff5f5` を使わないこと。

### ⚠️ ブランド色として拾ってはいけない色

| 色 | 出所 | 正体 |
|----|------|------|
| `#007aff` | `--swiper-theme-color` | **Swiper.js の既定色**。ゼブラは上書きしていないが、画面上には出てこない |
| `rgb(0,163,224)` | `--var-highlight-color` | テキスト選択時のハイライト。UI の色ではない |

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Zen Kaku Gothic New**（Google Fonts）**単独**。CSS 中に 364 回出現し、フォールバックは `sans-serif` のみ
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ**: Zen Kaku Gothic New の欧文グリフをそのまま使う（欧文専用フォントを先頭に置かない）
- **筆記体（飾り見出し専用）**: **Satisfy**（Google Fonts）。`--var-font-second-language`
- **等幅**: 指定なし

### 3.3 font-family 指定

**和文優先の 1 本スタック**。欧文グリフも Zen Kaku Gothic New に任せる。

```css
/* 本文・見出し・UI すべて（--var-font-sans-serif） */
font-family: "Zen Kaku Gothic New", sans-serif;

/* 英字の飾り見出しのみ（--var-font-second-language） */
font-family: "Satisfy", cursive;
```

**フォールバックの考え方**:
- 和文を先頭に置き、欧文グリフも同じ書体で通す（和欧の印象を割らない）
- Satisfy は**セクション見出し・ページタイトルの英単語にしか使わない**。和文に当ててはいけない（和文グリフを持たない）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title（英） | Satisfy | 44px | 500 | 44px (1.0) | 2.2px (0.05em) | 下層ページの `h1`。色は `#fa051c` |
| Section Title（英） | Satisfy | 40px | 400 | 18.4px (0.46) | normal | トップの `h2`。**行間を字より狭くして 1 行に固める** |
| Section Title（和） | Zen Kaku Gothic New | 26px | 500 | 43.68px (1.68) | normal | 下層の `h2` |
| CTA Title | Zen Kaku Gothic New | 40px | 500 | 22px (0.55) | normal | `.m-cta-main_title` |
| Card Title | Zen Kaku Gothic New | 18px | 500 | 30.06px (1.67) | normal | `h3` |
| Category Title | Zen Kaku Gothic New | 18.72px | **700** | 26.208px (1.4) | normal | カテゴリタイル |
| Body | Zen Kaku Gothic New | 16px | 400 | 26.88px (**1.68**) | normal | `body` |
| Body（UI） | Zen Kaku Gothic New | 16px | 500 | 22.08px (1.38) | 0.64px (0.04em) | セクションのリード文 |
| Text S | Zen Kaku Gothic New | 15px | 500 | 27px (1.8) | normal | 説明文 |
| Nav / Label | Zen Kaku Gothic New | 14px | 500 | 23.52px (1.68) | 0.8px (0.057em) | ナビ・小見出し |
| Chip | Zen Kaku Gothic New | 12px | 500 | — | normal | `.m-label` |
| Icon Label | Zen Kaku Gothic New | 10px | 400–500 | 16.8px (1.68) | normal | ヘッダーのアイコン下ラベル |
| Copyright | Zen Kaku Gothic New | 12px | **700** | 20.16px (1.68) | 0.3px | `rgba(20,20,20,.5)` |

**`1.68` がこのサイトの基準行間**（`body` の 26.88 / 16）。カードやカテゴリだけ `1.4` に締める。

### 3.5 行間・字間

- **本文の行間**: **1.68**（`line-height: 1.68`。CSS 中は `1.375rem` / `1.6875rem` の px 換算で書かれている）
- **見出しの行間**: 和文は **1.68**、英字の Satisfy 見出しは **0.46〜1.0**（字を大きく見せるため意図的に詰める）
- **本文の字間**: **`normal`**。字間を入れるのは UI テキスト（`.04em`）とナビ（`.05em`）、フッター見出し（1.5〜1.6px）だけ
- **`letter-spacing` の宣言は CSS 全体で 40 個弱**しかない

**ガイドライン**:
- 本文に `letter-spacing` を足さない。**足すと他のゼブラ系ページと揃わなくなる**
- 英字見出しは `line-height` を 1.0 以下にしてよい（Satisfy はディセンダが深いので、行送りではなく余白で間隔を作る）

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

**行頭禁止**: `）」』】〕〉》、。，．・：；？！`
**行末禁止**: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* ゼブラは font-feature-settings を一切宣言しない */
font-feature-settings: normal;
```

- **`palt` は使わない**。CSS 全文に `palt` は **0 回**、computed も全要素 `normal`
- 約物のアキを詰めたい場合も、字間ではなく**要素の padding で調整する**のがこのサイトの流儀

### 3.8 縦書き

該当なし。`writing-mode` の宣言は存在しない。

---

## 4. Component Stylings

### Buttons

**Primary（`.m-button.is-button-arrow-right`）— サイトの標準 CTA**

- Background: `#ffffff`
- Text: `#141414`
- Border: `1px solid #d9d9d9`
- Padding: `20px 30px`
- Border Radius: **`0`**
- Font Size: 16px / Weight 500
- Shadow: none
- 右端に「→」を置き、**ホバーでは色を変えず矢印を右に動かす**

```css
.m-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border: 1px solid var(--var-color-gray);   /* #d9d9d9 */
  border-radius: 0;
  background: var(--var-base-bg);            /* #fff */
  color: var(--var-base-text);               /* #141414 */
  font-size: 16px;
  font-weight: 500;
}
```

**Tab（カテゴリ切替）**

- アクティブ: Background `#ffffff` / Text `#fa051c`
- 非アクティブ: Background `#f8f8f8` / Text `#141414`
- Padding: `30px 20px`（大タブ） / `15px 4px`（ヘッダーの小タブ）
- Border Radius: `0`
- **下線やインジケータを持たない**。面色と文字色の反転だけで状態を示す

**Label / Chip（`.m-label`）**

- Background: `transparent`
- Text / Border: `1px solid` ＋ 同色の文字（企業情報 `#fa051c` / 商品情報 `#263da6` / その他 `#141414`）
- Padding: `3px 4px`
- Border Radius: **`2px`**（サイト内で唯一の角丸）
- Font Size: 12px / Weight 500

### Category Tile（`.m-item-list-svg-vertical_inner`）

- Background: `transparent`
- Border: `1px solid #d9d9d9`
- Border Radius: `0`
- Padding: `36px 27px 45px`（左寄せ。右側に製品イラストの SVG を逃がすため右 padding が広い）
- Title: 18.72px / **700** / `line-height: 1.4`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #d9d9d9`
- Border (focus): アウトラインで示す → `outline: 2px solid #fa051c`（`--var-focus-outline-color`）
- Border Radius: `0`（フォーム内の一部パーツのみ `3px`）
- Padding: `12px 16px`
- Font Size: 16px

### Cards

- Background: `#ffffff`（または `#fafafa`）
- Border: `1px solid #d9d9d9`
- Border Radius: `0`
- Padding: `20px 30px`
- Shadow: **none**

---

## 5. Layout Principles

### Spacing Scale

CSS 変数として持つのは 4 つだけ（`--var-scale-layout*`）。それ以外は実装側の直値。

| Token | 変数 | Value |
|-------|------|-------|
| XS | `--var-scale-layout8` | 8px (0.5rem) |
| S | `--var-scale-layout20` | 20px (1.25rem) |
| M | `--var-scale-layout32` | 32px (2rem) |
| L | `--var-scale-layout36` | 36px (2.25rem) |
| XL | — | 60px（セクション間） |

### Container

- Max Width: **1170px**（1440px ビューポートでの実測。最頻値 22 回）
- Padding (horizontal): 20px（SP） / 32px（PC）

### Grid

- カテゴリタイル: 4 カラム / gap `28px 36px`
- カード一覧: 3 カラム / gap `36px`
- セクション間: `60px`

### z-index（`--var-zindex-*`）

`negative -1` < `standard 0` < `element 1` < `element-upper 2` < `modules 3` < `modules-upper 4` < `main 5` < `footer 6` < `navigation 7` < `navigation-upper 8` < `header 10` < `floating 14` < `drawer 16` < `drawer-upper 24` < `dialog 36`

**数値を直書きせず、必ずこの 15 段の変数から選ぶ**のがこのサイトの規約。

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・ボタン・タブすべて** |
| 1 | `0 1px 2px 0 rgba(0,0,0,.16)` | ヘッダーがスクロールで固定されたときのみ |
| 2 | `inset 0 -1px 0 rgba(0,0,0,.25)` | 入力欄の下罫（内側） |

**このサイトは影で階層を作らない**。奥行きは「`#f8f8f8` の面」と「`#d9d9d9` の 1px 罫」で表現する。影を足すと別のサイトになる。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`border-radius: 0` を既定にする**。角丸を許すのはラベル（`2px`）とアイコン（`50%`）だけ
- 色は `--var-color-*` から選ぶ。**新しい色を足さない**（有彩色は赤とネイビーの 2 つで足りる設計）
- ボタンは「白地 ＋ `1px solid #d9d9d9` ＋ 右矢印」。**面を塗らない**
- 本文の `line-height` は **1.68**、`letter-spacing` は `normal`
- 英字の飾り見出しは Satisfy、和文は Zen Kaku Gothic New。**混ぜない**
- z-index は 15 段の変数から選ぶ
- 製品ブランドのページでは、面に `*-secondly`（極薄）、見出し・罫に `*-primary` を使う

### Don't（禁止）

- **CTA をピルにしない**。このサイトに `border-radius: 9999px` は 1 つも存在しない
- **ボタンに影を付けない**。`box-shadow` はヘッダー固定時の 1 種類しか使わない
- **赤を面いっぱいに塗らない**。`#fa051c` は文字・罫・小さな図形のための色で、大面積の背景には使わない（トップでの出現は 3 回）
- **`palt` を有効にしない**。字詰めはこのサイトの設計に含まれない
- **Satisfy に和文を流さない**（和文グリフを持たない筆記体）
- 本文の文字色に `#000000` を使わない（`#141414`）
- Semantic の 4 色（`#e9f3e6` など）を**文字色に使わない**。面色専用

---

## 8. Responsive Behavior

### Breakpoints

**モバイルファースト**。`min-width` で積み上げる。

| Name | Width | 宣言回数 | 説明 |
|------|-------|---------|------|
| Mobile | < 440px | 37 | 小型スマートフォン |
| Mobile / Tablet 境界 | ≥ 769px | **349** | **このサイトの主分岐** |
| Desktop | ≥ 1025px | 73 | PC ナビゲーション展開 |
| Wide | ≥ 1268px | 3 | コンテナ最大化 |

```css
/* 主分岐 */
@media screen and (min-width: 769px) { /* PC */ }
```

### タッチターゲット

- 最小サイズ: 44px × 44px
- 標準 CTA は実測 `padding: 20px 30px` ＋ 16px の文字で **高さ 63px**

### フォントサイズの調整

- 本文 16px は SP / PC 共通（**縮めない**）
- セクション見出し（Satisfy）は SP で 40px → 28px 程度に縮める
- ヘッダーのアイコンラベルは SP で 10px（PC では非表示になり、代わりに 14px のテキストナビが出る）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #fa051c
Text Color:    #141414
Sub Text:      #555555
Background:    #ffffff
Surface:       #f8f8f8
Border:        #d9d9d9
Font:          "Zen Kaku Gothic New", sans-serif
Display Font:  "Satisfy", cursive   /* 英字見出しのみ */
Body Size:     16px
Line Height:   1.68
Letter Spacing: normal
Border Radius: 0        /* ラベルのみ 2px */
Box Shadow:    none
```

### プロンプト例

```
ゼブラのデザインシステムに従って、商品カテゴリ一覧を作成してください。
- フォント: "Zen Kaku Gothic New", sans-serif
- 本文: 16px / line-height 1.68 / letter-spacing normal / #141414
- カテゴリタイル: 1px solid #d9d9d9 / border-radius 0 / padding 36px 27px 45px
  見出しは 18.72px / font-weight 700 / line-height 1.4
- CTA: 白地 + 1px solid #d9d9d9 + 右矢印 / padding 20px 30px / border-radius 0
- セクション見出しは英単語を "Satisfy" 40px #fa051c で置き、その下に和文リードを
  16px / 500 / letter-spacing 0.04em で敷く
- 影は使わない。角丸も使わない
```

### 実装時の落とし穴

- **「ボタンだから角丸」と反射で書かないこと**。ゼブラは全面的に直角
- **赤をアクセントとして面に塗りたくなるが、実サイトは文字・罫・小図形にしか使っていない**
- Satisfy は Google Fonts から `wght 400` 単一ウェイトのみ提供。**500 を指定しても合成太字になるだけ**（実サイトの `font-weight: 500` はその状態）
