# DESIGN.md — 九州国立博物館（Kyushu National Museum）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-24 / 対象: `https://www.kyuhaku.jp/`, `https://www.kyuhaku.jp/visit/visit_top.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 青 `#1a63bc` を主役に据えた公共情報サイト。**Bootstrap で組まれていた旧サイトを Tailwind に載せ替え、旧サイトの computed 値を「実測 base 層」として移植している**
- **密度**: 高い。カード・バッジ・カレンダーが密に並ぶ。情報を探させるサイト
- **キーワード**: ヒラギノ角ゴ ProN、**`palt` を見出しに全適用**、**ウェイトの主役が 600**、**画面幅で字間と行間を変える**、青 `#1a63bc`

**このサイトの核心は5つある。**

1. **見出しの主役ウェイトが `600`。** 可視 113 要素のうち **600 が 61、700 が 26、400 が 17**。base 層は `h1〜h6 { font-weight: 700 }` だが、**`h3`〜`h6` は 600 で上書きされている**。macOS では 600 が**ヒラギノ角ゴ ProN の W6 に素直に当たる**（ProN は W3 と W6 の 2 本）。**700 を指定すると W6 の合成太字になる**
2. **画面幅で `letter-spacing` と `line-height` を変える。** Desktop `0.04em / 1.8` → Tablet `0.035em / 1.75` → Mobile `0.03em / 1.7`。**小さい画面ほど詰める**。実測でも 1440px 幅で `0.68px`、800px 幅で `0.588px` と変わる
3. **`palt` は見出し専用。** base 層の `h1〜h6` に `font-feature-settings: "palt" 1`。トップで 136 要素、下層で 76 要素が継承で `palt` を持つ。**本文には掛けていない**
4. **自社トークンは `--kx-*` の 9 個だけ。それなのに Bootstrap 由来の色が Tailwind の任意値クラスで直書きされている。** `--kx-primary: #1a63bc` があるのに、カードの見出しは `text-[#0d6efd]`（Bootstrap の既定青）。**このサイトには青が 2 つある**
5. **和文 Web フォントを読み込んでいるのに、macOS ではほぼ使われない。** Google Fonts から `Noto Sans JP:wght@400;500;600;700` と `Inter:wght@400;500;600;700` を読み込むが、実測でテキストを持つ要素 521 個のうち **ヒラギノ角ゴ ProN が 517、Noto Sans JP は 4**

> **`--kx-ff-base` と `--kx-ff-heading` は 1 語だけ違う。** heading にだけ `"Noto Sans JP"` が挟まっている。**Windows では見出しだけ Web フォント、本文はローカルの BIZ UDPGothic** という切り分け。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Primary** | **`#1a63bc`**（`--kx-primary`） | 文字 21 要素（トップ）/ 8 要素（下層）。リンク、見出し、ヘッダー帯 |
| **Primary Dark** | **`#0f3d75`**（`--kx-primary-dark`） | `a:hover` の色。実測 1 要素 |
| Primary（グラデーション） | `linear-gradient(135deg, #2b7fbd 0%, #1a63bc 100%)` | 「年間スケジュール」など 3 つの大ボタン |
| Header Blue | `#1e6bb8` | 面 2 要素。「本日開館日」バッジ |
| Primary Tint | `#eef4fb` | 面 1 要素。「博物館からのお知らせ」の下地 |

### もう一つの青（Bootstrap 既定の残留）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Bootstrap Blue** | **`#0d6efd`** | 文字 4 要素（トップ）。カード見出し「特別展」に `text-[#0d6efd]` として直書き |

> **`#1a63bc`（自社トークン）と `#0d6efd`（Bootstrap 既定）が同じページに同居している。**
> **新規に書くなら `var(--kx-primary)` = `#1a63bc` に統一すること。** `#0d6efd` は移行の残留物であって設計意図ではない。

### Semantic（意味的な色・すべて Bootstrap 5 既定値）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Danger** | **`#dc3545`** | 面 8 要素。「お知らせ」「予告」バッジ |
| **Success** | **`#198754`** | 面 10 要素。「イベント」バッジ |
| **Info** | **`#0dcaf0`** | 面 3 要素。「関係者」「プレス」バッジ |
| **Purple** | **`#6f42c1`** | 面 1 要素。「残り N 日」のカウントダウン |
| Alert Red（下層） | `#b91c1c` | 文字 1 要素。「（文化交流展のみ）」 |

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Heading** | **`#111111`**（`--kx-heading`） | 文字 21 要素（トップ）/ 50 要素（下層） |
| **Text** | **`#333333`**（`--kx-text`） | 文字 28 要素（トップ）/ 7 要素（下層） |
| Text（Tailwind 既定） | `#212529` | 文字 90 要素（下層のカレンダー）。**Bootstrap の `$body-color` 由来** |
| Text Light | `#555555`（`--kx-text-light`） | 文字 3 要素 |
| Text Muted | `#666666`（`--kx-text-muted`） | **可視 0 要素**（宣言のみ） |
| Border | `#dddddd`（`--kx-border`） | 区切り線 |
| **Background** | **`#e4e4e4`** | `body` の地色。**白ではない** |
| Surface | `#f5f5f7` | 面 5 要素。ヘッダー帯・タブ・カード下地 |
| Surface（白） | `#ffffff` | カード本体 |

> **ページの地色は `#e4e4e4`（薄いグレー）で、カードが白。** 白地に白カードではないので、**カードに枠線を付けなくても面が分かれる**。

### カレンダーの日付色（下層のご利用案内）

| 役割 | 実装値 | 用途 |
|------|--------|------|
| 日曜 | `#a94442`（文字）/ `#f8cac5`（面） | 休館日 |
| 土曜 | `#3370cc`（文字）/ `#d8ebfb`（面） | 開館日 |
| 特別日 | `#fae5d3`（面） | 夜間開館など |

---

## 3. Typography Rules

### 3.1 和文フォント

**ヒラギノ角ゴ ProN（OS ローカル）が実質の本番書体。** 実測でテキストを持つ 521 要素のうち **517 要素**がヒラギノ角ゴ ProN。

`document.fonts` の実測（和文・欧文のみ抜粋）:

| family | weight | status | 実際に使われているか |
|--------|--------|--------|------|
| Noto Sans JP | 400 / 500 / 600 / 700 | **すべて loaded** | **macOS では 4 要素だけ** |
| Inter | 400 / 500 / 600 / 700 | **すべて loaded** | **テキスト要素では 0** |
| swiper-icons / Font Awesome 5 Pro / font-icons | — | loaded | アイコン |

> **4 ウェイト × 2 ファミリー = 8 本の Web フォントを読み込んで、macOS ではほぼ使わない。**
> これは無駄ではなく **Windows 向けの備え**（→ 3.3）。ただし**この読み込み量は設計判断として意識すること**。

### 3.2 欧文フォント

**Inter（400/500/600/700）を読み込んでいるが、実測ではテキスト要素に 1 つも当たっていない。**

英数字（`2026.9.17`、`September`）もヒラギノ角ゴ ProN のラテングリフで描かれている。

### 3.3 font-family 指定

**2 本のスタックがあり、違いは `"Noto Sans JP"` が挟まっているかどうかだけ。**

```css
:root {
  /* 本文 */
  --kx-ff-base: "Hiragino Kaku Gothic ProN", "Hiragino Sans",
                -apple-system, BlinkMacSystemFont, "Segoe UI",
                "BIZ UDPGothic", "Yu Gothic Medium", "Yu Gothic",
                Meiryo, sans-serif;

  /* 見出し（★ Noto Sans JP が 1 つ挟まる） */
  --kx-ff-heading: "Hiragino Kaku Gothic ProN", "Hiragino Sans",
                   -apple-system, BlinkMacSystemFont, "Noto Sans JP",
                   "BIZ UDPGothic", "Yu Gothic Medium", "Yu Gothic",
                   Meiryo, sans-serif;
}
body { font-family: var(--kx-ff-base); }
h1, h2, h3, h4, h5, h6 { font-family: var(--kx-ff-heading); }
```

**順序の意味**

| 位置 | 名前 | 当たる環境 |
|------|------|-----------|
| 1–2 | ヒラギノ角ゴ ProN / Hiragino Sans | **macOS・iOS**（本文も見出しもここで決まる） |
| 3–4 | -apple-system / BlinkMacSystemFont | Apple 系の保険 |
| 5 | **`"Segoe UI"`（本文）/ `"Noto Sans JP"`（見出し）** | **ここが分岐点** |
| 6 | **`"BIZ UDPGothic"`** | **Windows 10 (1809) 以降に標準搭載の UD フォント** |
| 7–8 | 游ゴシック Medium → 游ゴシック | Windows の保険（Medium を先に置いて細すぎを回避） |
| 9 | Meiryo | 旧 Windows |

> **Windows の游ゴシック問題を「BIZ UDPGothic を游ゴシックより前に置く」ことで解いている。**
> このリポジトリの収録例では 5 つ目の流儀になる（SmartHR の別名 `AdjustedYuGothic`、白鶴酒造の `MyYuGothicM`、カリモク家具の `Yu Gothic` 上書き、東京オペラシティ AG のスタック順、そして**本例の UD フォント優先**）。
> **公共施設らしい選択**でもある。BIZ UD 系は読み書きに配慮した字形で、游ゴシックの細さ問題も同時に回避できる。
> **見出しだけ `"Noto Sans JP"` を差し込んでいる**ので、Windows では**見出し＝ Web フォント、本文＝ローカルの BIZ UDPGothic** になる。和文 Web フォントの重さを見出しだけに払う設計。

### 3.4 文字サイズ・ウェイト階層

**`html { font-size: 16px }`。本文サイズは `clamp()` で 16px → 17px に伸びる。**

```css
body {
  /* iPhone SE:16px → iPad:16.5px → Desktop:17px */
  font-size: clamp(1rem, 0.975rem + 0.15vw, 1.0625rem);
}
```

| 役割 | size（`clamp` の最小 → 最大） | weight | line-height | letter-spacing |
|------|------|--------|-------------|----------------|
| h1 | `clamp(1.625rem, 1.35rem + 1.4vw, 2.5rem)` = **26px → 40px** | **700** | 1.4 | 0.02em |
| h2 | `clamp(1.375rem, 1.15rem + 1.1vw, 2rem)` = **22px → 32px** | **700** | 1.4 | 0.02em |
| h3 | `clamp(1.1875rem, 1.05rem + 0.7vw, 1.625rem)` = **19px → 26px** | **600** | 1.4 | 0.02em |
| h4 | `clamp(1.0625rem, 1rem + 0.35vw, 1.3125rem)` = **17px → 21px** | **600** | 1.4 | 0.02em |
| h5 | `1rem` = **16px** | **600** | 1.4 | 0.02em |
| h6 | `0.875rem` = **14px** | **600** | 1.4 | 0.02em |
| **本文** | **`clamp(...)` = 16px → 17px** | **400** | **1.8** | **0.04em** |
| バッジ（カテゴリ） | 11.4px | 700 | 1.0 | 0.02em |
| カウントダウン | 14.45px | 600 | 1.0 | 0.04em |
| 大ボタン（3 連） | 20px | **900** | 1.2 | 0.04em |
| 補助テキスト | 13.3px | 400 | 1.7 | 0.02em |

**ウェイトの分布**

| ページ | 400 | 500 | 600 | 700 | 900 |
|--------|-----|-----|-----|-----|-----|
| トップ | 17 | 6 | **61** | 26 | 3 |
| 下層（ご利用案内） | 88 | — | **50** | 26 | 2 |

> **このサイトのウェイト設計は「本文 400 / 見出し 600 / 大見出しと強調 700 / 特大ボタン 900」。**
> **600 が主役**なのは、本番書体のヒラギノ角ゴ ProN が **W3（≒300–400）と W6（≒600）の 2 本しか持たない**ため。**600 を指定すると W6 がそのまま当たり、合成が入らない。**
> 逆に **`700` を指定すると W6 に対する合成太字**になる（macOS / Chrome）。26 要素がこれに当たる。
> **base では `h1〜h6 { font-weight: 700 }` と書いてあるが、`h3`〜`h6` の規則が 600 に上書きしている。** 実装を読むときは base だけを見ないこと。
> **`900` は 3 つの大ボタンだけ。** ヒラギノには W9 相当が無いので、これも合成太字になる。**多用しないこと。**

### 3.5 行間・字間

**画面幅で字間と行間を変える。このサイトで最も特徴的な設計。**

```css
body {
  line-height: 1.8;
  letter-spacing: 0.04em;
}
@media (min-width: 768px) and (max-width: 1024px) {
  body { line-height: 1.75; letter-spacing: 0.035em; }
}
@media (max-width: 767.98px) {
  body { line-height: 1.7;  letter-spacing: 0.03em; }
}
```

| 画面 | line-height | letter-spacing |
|------|-------------|----------------|
| **Desktop（≥ 1025px）** | **1.8** | **0.04em** |
| Tablet（768–1024px） | 1.75 | 0.035em |
| Mobile（≤ 767.98px） | 1.7 | 0.03em |

> **画面が狭いほど、行間も字間も詰める。** 狭い画面で 0.04em を維持すると 1 行の文字数が落ちて読みづらくなるため。
> 実測でも 1440px 幅では `letter-spacing: 0.68px`（17px × 0.04em）、800px 幅では `0.588px`（16.8px × 0.035em）と変化している。

**字間は `em` 宣言 → px 継承。**

実測（下層・可視 166 要素）:

| 値 | 出現 | 出どころ |
|----|------|---------|
| **`0.68px`** | **109** | **body の `0.04em` が px に解決され、サイズ違いの子要素まで継承されている** |
| 0.42px | 35 | 中間コンテナ（14px × 0.03em）からの継承 |
| 0.32px | 17 | 見出しの `0.02em`（16px） |
| 0.52px | 4 | 見出しの `0.02em`（26px） |
| 1px | 1 | パンくず |

> **同じ `0.68px` が 109 要素・サイズはバラバラ = 継承。** `em` は body に 1 回だけ書いて、子で再宣言しない。
> **見出しだけは `0.02em` を明示**（サイズに比例して 0.32px / 0.376px / 0.52px と変わる）。

**行間は 1.8（本文）/ 1.4（見出し）の 2 段。**

| 比率 | 出現（下層） | 用途 |
|------|------|------|
| **1.80** | **104** | **本文**（body 既定） |
| 1.40 | 52 | 見出し（h1〜h6 共通） |
| 1.20 | 7 | 大ボタン、カウントダウン |
| 1.00 | 2 | バッジ |

### 3.6 禁則処理・改行ルール

実サイトは `word-break` を明示せずブラウザ既定。`text-rendering: optimizeLegibility` と `font-kerning: normal` を body に指定している。

```css
body {
  -webkit-font-smoothing: auto;      /* ← 実サイトは antialiased にしていない */
  -moz-osx-font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-kerning: normal;
}
```

**禁則対象**
- 行頭禁止: `）」』】〕〉》、。，．・：；？！ー々ゃゅょっ`
- 行末禁止: `（「『【〔〈《`

> **`-webkit-font-smoothing: antialiased` を足さないこと。** 実サイトは `auto`（＝ subpixel）のまま。公共サイトとして細らせない判断。

### 3.7 OpenType 機能

```css
h1, h2, h3, h4, h5, h6 {
  font-feature-settings: "palt" 1;
  -webkit-font-feature-settings: "palt" 1;
  letter-spacing: 0.02em;
}
```

- **`palt` は見出しにだけ掛ける。** トップで 136 要素、下層で 76 要素が `"palt"` を持つ（見出しとその子孫）
- **本文には掛けない。** body 側は `font-feature-settings: normal`
- **`palt` と `letter-spacing: 0.02em` を併用している**。約物を詰めたぶんを字間でわずかに戻す組み方
- ユーティリティにも `font-feature-settings:"palt"; letter-spacing:.1em` を持つクラスが 1 つある（強い字空けを掛けるラベル用）

### 3.8 縦書き

```css
/* 該当なし */
```

`writing-mode: vertical-rl` は 0 要素。**横組みのみ。**

---

## 4. Component Stylings

### Buttons

**Primary（ヘッダー帯・青ボタン）**

- Background: `#1e6bb8`
- Text: `#ffffff`
- Border: 2px solid `#1e6bb8`
- Padding: `4px 16px`
- Border Radius: `4px`
- Font Size: 14px / Weight: 700 / Line Height: 19.6px

**Primary Outline（下層の主要リンク）**

- Background: `#ffffff`
- Text: `#1a63bc`
- Border: 1px solid `#1a63bc`
- Border Radius: `4px`
- Font Size: 17px / Weight: 700 / Letter Spacing: 0.68px

**Large（3 連の大ボタン・グラデーション）**

- Background: `linear-gradient(135deg, #2b7fbd 0%, #1a63bc 100%)`
- Text: `#ffffff`
- Border Radius: `14px`
- Font Size: 20px / **Weight: 900** / Letter Spacing: 0.04em
- Shadow: `0 4px 12px rgba(0,0,0,0.15)`

### Badges / Chips

**カテゴリバッジ（Bootstrap 既定色をそのまま使用）**

- Border Radius: `4px`
- Padding: `4px 8px`
- Font Size: **11.4px** / Weight: 700 / Letter Spacing: 0.304px（0.02em 継承）
- Text: `#ffffff`（Info の `#0dcaf0` のみ `#000000`）

| ラベル | 面色 |
|--------|------|
| お知らせ / 予告 | `#dc3545` |
| イベント | `#198754` |
| 関係者 / プレス | `#0dcaf0`（文字は `#000000`） |

**カウントダウン（「残り 4 日」）**

- Background: `#6f42c1` / Text: `#ffffff`
- Border Radius: `5.42px`（下層は `6.375px`）
- Font Size: 14.45px / Weight: 600

### Inputs

実サイトのトップ・下層に可視の入力欄は無い（検索は別ページ）。**新規実装では下記に揃える。**

- Background: `#ffffff`
- Border: 1px solid `#dddddd`（`--kx-border`）
- Border (focus): 1px solid `#1a63bc`
- Border Radius: `4px`
- Padding: `8px 12px`
- Font Size: 17px
- Height: 44px

### Cards

- Background: `#ffffff`
- Border: なし（地色 `#e4e4e4` との差で面が分かれる）
- Border Radius: **`12px`**（30 要素）/ `16px`（12 要素・展示カード）
- Shadow: `0 2px 12px rgba(0,0,0,0.06)`
- カード内見出し: `h5` 16px / **600** / `palt`

### Tabs

- Border Radius: `8px 8px 0 0`
- Background（非アクティブ）: `#f5f5f7` / Text: `#444444`
- Font Size: 17px / Weight: 700 / Line Height: 40px

---

## 5. Layout Principles

### Spacing Scale

Tailwind の既定スケール（`0.25rem` 刻み・`html` は 16px）。

| Token | Value |
|-------|-------|
| XS | 4px（`1`） |
| S | 8px（`2`） |
| M | 16px（`4`） |
| L | 24px（`6`） |
| XL | 40px（`10`） |
| XXL | 64px（`16`） |

見出しの下マージンは base 層で固定:

```css
h1, h2, h3 { margin-bottom: 1.5rem; }   /* 24px */
h4, h5     { margin-bottom: 1rem; }     /* 16px */
h2 { margin-top: 2.5rem; }  h3 { margin-top: 2rem; }
@media (max-width: 767.98px) {
  h1, h2 { margin-bottom: 1rem; }
  h2 { margin-top: 1.75rem; }  h3 { margin-top: 1.25rem; }
}
```

### Container

- Max Width: **1320px**
- 幅いっぱいのセクション（`100%`）が 17 箇所。**帯は全幅、中身だけ 1320px**
- スクロールオフセット: `--kx-scroll-offset: 105px`（固定ヘッダー分）

### Grid

- Columns: 3（展示カード）/ 7（カレンダー）
- Gutter: 16px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|------|
| 0 | `none` | 本文・帯 | 大半 |
| **1** | **`0 2px 12px rgba(0,0,0,0.06)`** | **カード** | **12 要素** |
| 2 | `0 4px 12px rgba(0,0,0,0.15)` | 3 連の大ボタン | 3 要素 |
| 3 | `0 2px 8px rgba(0,0,0,0.1)` | 開館状況パネル | 1 要素 |

> **影は黒 α のみで、色を混ぜていない。** 3 段とも `rgba(0,0,0,α)`。**Level 1 の 0.06 が基準**で、浮かせたいものだけ 0.15 に上げる。
> 下層のカレンダーには `rgba(0,0,0,0) 0 0 0 9999px inset` が 120 要素あるが、**これは透明＝実質 none**（ホバー時に色を差すための仕込み）。**再現不要。**

---

## 7. Do's and Don'ts

### Do（推奨）

- 本文は **16px → 17px の `clamp()` / line-height 1.8 / letter-spacing 0.04em**
- **画面幅で字間と行間を落とす**（Tablet 0.035em / 1.75、Mobile 0.03em / 1.7）
- **見出しには `font-feature-settings: "palt" 1` と `letter-spacing: 0.02em` をセットで書く**
- **見出しのウェイトは h1/h2 が 700、h3〜h6 が 600**
- リンクは `color: var(--kx-primary)` = `#1a63bc`、hover で `#0f3d75`
- ページの地色は **`#e4e4e4`**、カードは白 + radius 12px + `0 2px 12px rgba(0,0,0,0.06)`
- Windows 対策は **`"BIZ UDPGothic"` を游ゴシックより前に置く**
- 見出しだけ `"Noto Sans JP"` をスタックに挟む（本文はローカルで済ませる）

### Don't（禁止）

- **`#0d6efd` を新規に使わない。** Bootstrap からの移行残留。青は `#1a63bc` に統一する
- **`font-weight: 700` を見出しの既定にしない。** ヒラギノは W3 / W6 の 2 本なので、**700 は合成太字**になる。**600 を使えば W6 が素直に当たる**
- `900` を多用しない（3 連の大ボタン専用。これも合成）
- 本文に `palt` を掛けない（見出し専用）
- 子要素で `letter-spacing` を `em` で再宣言しない（body の値が px で継承される設計）
- `-webkit-font-smoothing: antialiased` を足さない（実サイトは `auto`）
- カードに枠線を足さない（地色との差で分かれている）
- `--kx-text-muted: #666666` を「使われている色」として扱わない（**可視 0 要素**）

---

## 8. Responsive Behavior

### Breakpoints

Tailwind の既定ブレークポイント ＋ Bootstrap 由来の `.98px` 端数が混在している。

| Name | 条件 | 出現（下層） |
|------|------|------|
| sm | `(min-width: 576px)` | 12 |
| **md** | **`(min-width: 768px)`** | **14** |
| lg | `(min-width: 992px)` | 12 |
| xl | `(min-width: 1200px)` | 12 |
| 2xl | `(min-width: 1400px)` | 7 |
| **Mobile（上書き）** | **`(max-width: 767.98px)`** | **3** |
| Tablet（上書き） | `(max-width: 991.98px)` | 3 |
| a11y | `(prefers-reduced-motion: reduce)` | 3 |

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767.98px | 1 カラム。**字間 0.03em / 行間 1.7**。見出しの上下マージンを縮める |
| Tablet | 768–1024px | 2 カラム。**字間 0.035em / 行間 1.75** |
| Desktop | ≥ 1025px | 3 カラム。**字間 0.04em / 行間 1.8**。コンテナ 1320px |

> **`prefers-reduced-motion: reduce` に 3 件対応している。** カルーセルの自動送りを止める。公共サイトとして必須。

### タッチターゲット

- 最小サイズ: 44px × 44px
- 3 連の大ボタンは高さ 80px 超。カレンダーのセルは 44px 以上

### フォントサイズの調整

- **本文は `clamp()` が吸収する**（16px → 17px）。メディアクエリで書き直さない
- **見出しも `clamp()`**（h1 は 26px → 40px）。**固定 px に置き換えないこと**
- 字間・行間だけはメディアクエリで明示的に落とす（→ 3.5）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:     #1a63bc   （--kx-primary）
Primary Dark:      #0f3d75   （hover）
Heading Color:     #111111
Text Color:        #333333
Background:        #e4e4e4   ← 白ではない
Surface (card):    #ffffff
Border:            #dddddd
Danger/Success/Info: #dc3545 / #198754 / #0dcaf0
Font (body):    "Hiragino Kaku Gothic ProN", "Hiragino Sans", -apple-system,
                BlinkMacSystemFont, "Segoe UI", "BIZ UDPGothic",
                "Yu Gothic Medium", "Yu Gothic", Meiryo, sans-serif
Font (heading): 上の 5 番目を "Noto Sans JP" に差し替えたもの
Body Size:   clamp(1rem, 0.975rem + 0.15vw, 1.0625rem)  = 16px → 17px
Line Height: 1.8 / 1.75 (tablet) / 1.7 (mobile)
Letter Spacing: 0.04em / 0.035em (tablet) / 0.03em (mobile)
Heading: weight 700 (h1,h2) / 600 (h3–h6), line-height 1.4,
         letter-spacing 0.02em, font-feature-settings "palt" 1
Card: #ffffff / radius 12px / 0 2px 12px rgba(0,0,0,0.06)
```

### プロンプト例

```
九州国立博物館のデザインシステムに従って、展示一覧ページを作成してください。

- ページの地色は #e4e4e4、カードは白 + border-radius 12px +
  box-shadow 0 2px 12px rgba(0,0,0,0.06)（枠線は付けない）
- 本文フォント: "Hiragino Kaku Gothic ProN", "Hiragino Sans", -apple-system,
  BlinkMacSystemFont, "Segoe UI", "BIZ UDPGothic", "Yu Gothic Medium",
  "Yu Gothic", Meiryo, sans-serif
  （見出しは 5 番目を "Noto Sans JP" に差し替える）
- 本文: font-size: clamp(1rem, 0.975rem + 0.15vw, 1.0625rem) /
  line-height 1.8 / letter-spacing 0.04em / color #333333
- 768〜1024px では line-height 1.75 / letter-spacing 0.035em、
  767.98px 以下では 1.7 / 0.03em に落とす
- 見出しは color #111111、line-height 1.4、letter-spacing 0.02em、
  font-feature-settings: "palt" 1。h1/h2 は font-weight 700、h3〜h6 は 600
  （700 はヒラギノで合成太字になるので、小見出しには使わない）
- リンクは #1a63bc、hover で #0f3d75。#0d6efd は使わない
- カテゴリバッジは radius 4px / 11.4px / weight 700、
  お知らせ=#dc3545 / イベント=#198754 / 関係者=#0dcaf0（文字は黒）
- コンテナ 1320px。prefers-reduced-motion に対応する
```
