# DESIGN.md — bitFlyer（ビットフライヤー）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-17 / 対象: `https://bitflyer.com/ja-jp/`, `/ja-jp/s/how-to-start`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **数字を読ませるための設計。** 青みを帯びた白（`#fdfdff` / `#f5f8fd`）の上に、等幅数字のティッカーと角丸カードを並べる。彩度の高い青 1 色を CTA に集中させる
- **密度**: **非常に高い。** トップページの可視テキストは **759 要素**（うち価格ティッカーが約 350）。字間を一切触らず、行間 1.00 で詰める
- **キーワード**: tnum、Nunito の数字、weight 600 が既定、青い白、ブルー ＆ オレンジ

**このサイトの核心は 5 つある。**

1. **`font-feature-settings: "tnum"` が 366 要素に効いている。`palt` は 6 要素しかない。** **日本語サイトとしては極めて珍しく、主役の OpenType 機能が「詰め」ではなく「等幅数字」。** 価格が 1 秒ごとに更新されても桁がガタつかないための設計
2. **数字は和文書体で組まない。`Nunito` が 351 要素。** `11,943,452 円` `+1.36%` といったティッカーの数値はすべて Nunito（600 が `loaded`）。**本文の Noto Sans JP とは別の書体**
3. **`font-weight` の既定が 600。** 実測 **600 が 618/759 要素**、400 はわずか 84 要素（注記と免責のみ）。**日本語 UI の「普通」を Semi Bold に置いている**
4. **CSS 変数 150 個は、ほとんどが描画されていない。** `own: 150 / platform: 0` だが、`ruby` `emerald` `yellow` `orange` `red` `grey` `primary` の 12 段パレット（計 84 色）のうち、**この LP の可視要素に出てくるのは 5 色程度**。しかも**主 CTA の青は `--primary-color-bg: #1980e5` ではなく実測 `#0050d7`** ——**変数の値をそのまま実装値として書かないこと**
5. **トップページと下層ページは別のデザインシステム。** トップは `"Noto Sans JP"` 先頭・weight 600 既定・radius 12px・コンテナ 1170px。下層 `/s/how-to-start` は **`-apple-system` 先頭・weight 400 既定・radius 4px・コンテナ 1080px**。**新規に組むならトップ側（新しい世代）に合わせる**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値（**実測**） | 変数（**宣言**） | 実測 |
|------|------------------|-----------------|------|
| **bitFlyer ブルー** | **`#0050d7`** | — | **面 5 要素 / 文字 114 要素**。**すべての主 CTA、値上がり率（`+1.36%`）、タグの文字** |
| （宣言だけ） | — | `--primary-color-bg: #1980e5` | **可視 0 要素**。`--color-fill-accent` `--color-primary-700` も同値で未使用 |
| **Lightning オレンジ** | **`#ff6400`** | — | **文字 19 要素 / 面 1 要素**。**値下がり率（`-5.81%`）と `bitFlyer Lightning` の CTA** |
| （宣言だけ） | — | `--color-orange-700: #fa7000` | オレンジ 12 段のうち実装に出るものは無い |

> **`--primary-color-bg`（`#1980e5`）は使われていない。** 実装は一段濃く沈んだ **`#0050d7`**。**150 個の変数は取引ツール（bitFlyer Lightning）と共有のトークンが LP にも配信されているだけ**で、この LP の実装値ではない。

> **値上がりが青、値下がりがオレンジ。** 日本の株式慣行（赤＝上げ）ではなく、**青＝プラス / オレンジ＝マイナス**。`--color-red-*` `--color-emerald-*` のパレットは可視 0 要素で、**赤と緑は使っていない**。

### Neutral（ニュートラル）

| 役割 | 実装値（**実測**） | 変数（**宣言**） | 実測 |
|------|------------------|-----------------|------|
| **Text Muted** | **`#697ca9`** | — | **可視 356 要素で最多**。ティッカーの銘柄シンボル・価格・注記。**青みの強いグレー** |
| **Text Secondary** | **`#42516a`** | — | 可視 118 要素。銘柄名・補足 |
| **Text Primary** | **`#13161b`** | （`--color-text: #242428`） | 可視 54 要素。**変数より濃い** |
| Text Nav | `#2a3547` | — | 11 要素。ドロップダウンの見出し |
| Text Sub | `#45526b` | — | 40 要素。フッターのリンク |
| Text Note | `#66778f` | — | 12 要素。免責事項 |
| Text Date | `#8ea2b2` | — | 6 要素。プレスリリースの日付 |
| Text on Dark | `#ffffff` | — | 12 要素。CTA の上 |
| **Page Background** | **`#fdfdff`** | `--color-bg: #fdfdff` | **`pageBackground.resolved` / 根拠 `body`。変数と一致する数少ない例** |
| **Section Background** | **`#f5f8fd`** | — | **ビューポート面積で最大（1,296,000px²）**。**実際に目に入る地色はこちら** |
| Surface Tint | `#eef4ff` | — | 面 13 要素。淡青のタグ |
| Surface Tint 2 | `#ebf1fc` | — | 面 9 要素。`STEP 1` のバッジ・お知らせ帯 |
| Glass | `rgba(255,255,255,0.42)` | — | **面 195 要素**。**ティッカーのカードは半透明の白** |
| Dark Surface | `#13161b` | — | 面 3 要素 |

> **「白」が 3 段ある。** `#fdfdff`（`body`）→ `#f5f8fd`（セクション）→ `rgba(255,255,255,0.42)`（カード）。**どれも青が混ざっている。純白 `#ffffff` はテキスト色としてしか出てこない。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（既定）**: **Noto Sans JP**。Web フォントで **400 / 500 / 600 / 700 が `loaded`**
- **`font-weight: 300` と可変フォント（`100 900`）は `unloaded`**。**Light と可変軸を前提に組まないこと**

### 3.2 欧文フォント

- **数字（ティッカー・価格・変動率）**: **`Nunito`（600 が `loaded` / 700 は `unloaded`）**。可視 351 要素
- **実績の巨大数字**: **`Poppins`（600 が `loaded`）**。可視 5 要素（`No.1` `95.7%` `95.1%`）
- **本文中の欧文**: `Roboto`（400 が `loaded`）をスタックに持つが、実際は Noto Sans JP の欧文グリフが先に当たる
- 等幅: `--font-family-mono: 'SF Mono','Roboto Mono',monospace`（**可視 0 要素**）

### 3.3 font-family 指定

```css
/* 実際に描画されているスタック（可視 402 要素） */
font-family: "Noto Sans JP", -apple-system, "Segoe UI", Roboto, sans-serif;

/* 数字・価格・変動率（可視 351 要素） */
font-family: Nunito, sans-serif;

/* 実績の巨大数字（可視 5 要素） */
font-family: Poppins, sans-serif;
```

**宣言と実装が食い違っている（重要）**：

```css
/* 変数の宣言（body だけがこれを使う。可視 1 要素） */
--font-family-japanese:
  -apple-system, BlinkMacSystemFont, Roboto,
  'Hiragino Kaku Gothic Pro', 'Noto Sans JP', sans-serif;
```

> **変数では `-apple-system` が先頭で `Noto Sans JP` は 5 番目。だが実際の描画は `Noto Sans JP` が先頭。** `body` の 1 要素だけが変数のスタックを持ち、**子要素はすべて Noto Sans JP 先頭のスタックで上書きされている。**
> **`body` の `font-family` を見て「システムフォントのサイト」と判断してはいけない。実体は Noto Sans JP の Web フォントサイト。**

**フォールバックの考え方**:
- **和文 Web フォント優先。** `Noto Sans JP` を先頭に置く
- **数字だけ別書体に切り替える。** `Nunito` はヒラギノや Noto の数字より字幅が安定し、`tnum` と組み合わせて桁を揃えられる

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Stat Number** | **Poppins** | **61.2434px** | **600** | 1.25 | **`-5.6px`（-0.091em）** | `No.1` `95.7%`。**唯一の字間調整で、強く詰める** |
| Stat Unit | Poppins | 39.6px | 600 | 1.25 | — | `%` |
| **Section Heading** | Noto Sans JP | **32px** | **700** | **1.40** | normal | `ビットフライヤーが選ばれる３つの理由`（6 要素） |
| Card Heading | Noto Sans JP | 28px | 700 | 1.35 | normal | `bitFlyer かんたん積立` |
| Feature Heading | Noto Sans JP | 20px | 700 | 1.40 | normal | `豊富な銘柄の取り扱い`（13 要素） |
| **Hero CTA** | Noto Sans JP | **18px** | **700** | 1.00 | normal | `ビットフライヤーをはじめる` |
| Lead | Noto Sans JP | 16px | 400 | **1.75** | normal | セクションのリード文（`body` の値） |
| CTA | Noto Sans JP | 15px | 700 | 1.00 | normal | `無料で口座開設`（17 要素） |
| **Nav** | Noto Sans JP | **14px** | **600** | **1.60** | normal | `暗号資産のはじめ方`（75 要素） |
| **Ticker Name** | Noto Sans JP | **13px** | **600** | **1.00** | normal | **可視 249 要素で最多**。`ビットコイン` `BTC` |
| Chip | Noto Sans JP | 13px | 500 | 1.00 | normal | `少額からスタート`（radius 990px） |
| Note | Noto Sans JP | 12px | 400 | 1.38 | normal | 免責・注記（19 要素） |
| **Ticker Price** | **Nunito** | **11px** | 600 | **1.00** | normal | **可視 241 要素**。`11,943,452 円` `+1.36%` |
| Ticker Unit | Nunito | 10px | 600 | 1.00 | normal | `円`（117 要素） |
| Tag | Noto Sans JP | 11px | 600 | 1.00 | normal | `機能について`（radius 990px） |
| 下層 Body | Noto Sans JP | 16px | 400 | **1.71 / 1.75** | normal | `/s/how-to-start`（101 要素すべて weight 400） |

> **`line-height: 1.00` が 617/759 要素。** ティッカーとラベルとボタンがすべて 1.0。**読ませる文章だけ 1.40〜1.95 に開く**という、極端な二層構造。

### 3.5 行間・字間

- **`line-height: 1.00` が 617 要素（81%）** ——数値・ラベル・ボタン
- **本文の行間**: **1.75**（`body` の 16px / 28px）。フッターのリンク列は **1.95**（40 要素）
- 免責・長文注記: **1.85**（12 要素）
- 見出し: **1.40**（10 要素）/ カード見出し **1.35**
- **字間は `normal` が 755/759 要素。** 例外は 2 つだけ：
  - **Poppins の巨大数字 `-5.6px`（-0.091em）** ——欧文を強く詰める
  - `最短9分・口座開設無料` の `0.36px`（0.024em）

**ガイドライン**:
- **日本語に `letter-spacing` を足さない。** このサイトは Noto Sans JP の素の字送りで組む
- **60px 級の欧文数字だけ `-0.09em` 前後で詰める。** 和文には絶対に適用しない
- **数値・ラベル・ボタンは `line-height: 1.00`**。高さは padding で作る

### 3.6 禁則処理・改行ルール

- 価格は **`tnum` で桁を揃え、`line-height: 1.00`** で行の高さを固定する（更新のたびに行が動かない）
- `word-break: break-all` は使わない

### 3.7 OpenType 機能

**このサイトの主役は `palt` ではなく `tnum`。**

| 機能 | 実測 | 用途 |
|------|------|------|
| **`tnum`** | **366 要素** | **等幅数字。価格・変動率・桁区切り** |
| `palt` | 6 要素 | ごく一部の見出しのみ |

```css
/* 価格・数値を表示する要素すべてに */
font-feature-settings: "tnum";
font-family: Nunito, sans-serif;
line-height: 1.00;
```

> **数値が更新され続ける UI では `tnum` を必ず入れる。** 入れないと `1` と `8` の字幅差で桁がずれて目がちらつく。**日本語サイトで `palt` を足す前に、数字があるなら `tnum` を検討すること。**

### 3.8 縦書き

該当なし（`writing-mode: vertical-rl` は 0 要素）。

---

## 4. Component Stylings

`border-radius` は 8 種。**`10px`（117 要素・カード）と `990px`（18 要素・ピル）が主役。**

| Value | 実測 | 用途 |
|-------|------|------|
| **10px** | **117** | **ティッカーカード（最多）** |
| **990px** | **18** | **ピル型のタグ・チップ** |
| 12px | 6 | **主 CTA ボタン** |
| 16px | 4 | 大きな面 |
| 28px | 4 | 特集カード |
| 20px | 3 | — |
| 15.0048px / 6.0048px | 各 3〜4 | 可変幅で算出された値 |
| **4px** | — | **下層ページの CTA（別世代）** |

### Buttons

**Primary（主 CTA）**
- Background: **`#0050d7`** / Text: `#ffffff`
- Border: なし / Shadow: **なし**
- Border Radius: **`12px`**
- **Padding: `0 24px`**（**上下 0 ——高さは `height` と `line-height: 1.00` で作る**）
- Font: Noto Sans JP / **15px（ヒーローは 18px）/ weight 700** / line-height 1.00

**Header CTA（`新規登録`）**
- Background: `#0050d7` / Text: `#ffffff`
- Border Radius: **`8px`** / Padding: `0 16px`
- Font: **14px / weight 600**

**Lightning CTA（別ブランド）**
- Background: **`#ff6400`** / Text: `#ffffff`
- Border Radius: `12px` / Padding: `0 24px` / 15px / weight 700

**Tag / Pill（`機能について` `料金について`）**
- Background: **`#eef4ff`**（`#ebf1fc` の版もあり）/ Text: **`#0050d7`**
- Border Radius: **`990px`**
- Padding: `5px 10px` / Font: **11px / weight 600**

**Chip（`少額からスタート`）**
- Background: `#eef4ff` / Text: `#111827`
- Border Radius: `990px` / Padding: `8px 14px` / **13px / weight 500**

**Step Badge（`STEP 1`）**
- Background: `#ebf1fc` / Text: `#13161b`
- Border Radius: **`22.5px`**（円）/ Font: 14px / weight 600

**下層ページの CTA（別世代・参考）**
- Background: `#ffffff` / Text: `#1077dd` / Border Radius: **`4px`** / Padding: `8px 32px` / 14px / weight 700

### Cards

**Ticker Card（価格一覧）**
- Background: **`rgba(255, 255, 255, 0.42)`**（半透明の白）
- Border Radius: **`10px`** / Shadow: なし
- 中身: 銘柄名 13px/600、価格 Nunito 11px/600（**`tnum`**）、変動率 `#0050d7` / `#ff6400`

**Feature Card**
- Background: `rgba(255, 255, 255, 0.92)` または `rgba(255, 255, 255, 0.1)`（暗い面の上）
- Border Radius: `15px` / Shadow: なし

**Service Card（`bitFlyer かんたん積立`）**
- Border Radius: **`28px`**
- **Shadow: `0 4px 20px rgba(16, 42, 75, 0.06)`**

**Press Card**
- Border Radius: `6px`
- **Shadow: `0 1px 3px rgba(16, 42, 75, 0.06)`**

---

## 5. Layout Principles

### Root Font Size

```css
html { font-size: 10px; }   /* 実測。rem 計算を 10 基準にする */
body { font-size: 16px; line-height: 28px; }  /* 1.75 */
```

> **`html` が 10px なので、変数の `rem` はすべて ×10 が px。** `--spacing-4x: 1.6rem` = **16px**、`--font-size-320: 3.2rem` = **32px**。

### Spacing Scale（変数どおり。`1rem = 10px`）

| Token | 値 | px |
|-------|-----|-----|
| `--spacing-1x` | `0.4rem` | 4px |
| `--spacing-2x` | `0.8rem` | 8px |
| `--spacing-3x` | `1.2rem` | 12px |
| **`--spacing-4x`** | **`1.6rem`** | **16px（実測の gap 最多・16 要素）** |
| `--spacing-5x` 〜 `--spacing-8x` | `2rem`〜`3.2rem` | 20〜32px |
| `--spacing-10x` 〜 `--spacing-22x` | `4rem`〜`8.8rem` | 40〜88px |

実測の gap は **16px（16 要素）/ 9px（9 要素）/ 24px / 8px / 48px**。

### Font Size Scale（変数）

| Token | 値 | px |
|-------|-----|-----|
| `--font-size-420` | `4.2rem` | 42px |
| **`--font-size-320`** | `3.2rem` | **32px（セクション見出し）** |
| `--font-size-256` | `2.56rem` | 25.6px |
| `--font-size-210` | `2.1rem` | 21px |
| `--font-size-183` | `1.83rem` | 18.3px |
| **`--font-size-160`** | `1.6rem` | **16px（本文）** |
| **`--font-size-140`** | `1.4rem` | **14px（ナビ）** |
| `--font-size-120` | `1.2rem` | 12px |

### Line Height Scale（変数）

`--line-height-125: 1.25` / `-152: 1.52` / `-153: 1.53` / `-167: 1.67` / `-171: 1.71` / **`-175: 1.75`**

### Container

- **Max Width: 1170px**（**実測 7 要素で最多**）
- ワイド: 1280px（3 要素）/ 1920px（2 要素）/ 1638px
- 本文カラム: **620px**（3 要素）
- 下層ページ: **1080px**（**別世代**）

### Motion

```css
--easing-standard:   cubic-bezier(0.4, 0, 0.2, 1);
--easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
--easing-custom:     cubic-bezier(0, 0.4, 0, 1);
--easing-duration-fast: 240ms;
--easing-delay-fast:    80ms;
```

---

## 6. Depth & Elevation

| Level | Shadow | 実測 | 用途 |
|-------|--------|------|------|
| **0** | `none` | 既定 | **ティッカーカード・CTA・タグはすべてフラット** |
| 1 | **`0 1px 3px rgba(16, 42, 75, 0.06)`** | 4 要素 | プレスリリースのカード |
| 2 | **`0 4px 20px rgba(16, 42, 75, 0.06)`** | 4 要素 | サービスカード |
| 3 | `0 0 16px rgba(36, 36, 36, 0.08)` | 1 要素 | 追従ヘッダー |

> **影は `rgba(16, 42, 75, …)` ——黒ではなく濃紺。** アルファは **0.06 で統一**。**`rgba(0,0,0,0.1)` に置き換えないこと。**
> ティッカーカードは影の代わりに **`rgba(255,255,255,0.42)` の半透明白**で浮かせている。

---

## 7. Do's and Don'ts

### Do（推奨）

- **数値を出す要素には必ず `font-feature-settings: "tnum"` を入れる**（実測 366 要素）
- **数字は `Nunito, sans-serif` に切り替える**（和文書体の数字を使わない）
- **60px 級の実績数字は `Poppins` 600 / `letter-spacing: -5.6px`（-0.091em）**
- **和文の `font-weight` 既定を 600 にする**（400 は注記のみ）
- **`font-family` は `"Noto Sans JP"` を先頭に置く**
- **数値・ラベル・ボタンは `line-height: 1.00`**、読ませる文章は 1.75（フッターは 1.95）
- **CTA は `#0050d7` / radius 12px / padding `0 24px` / 15〜18px weight 700 / 影なし**
- **タグは radius 990px のピル**、面 `#eef4ff`、文字 `#0050d7`、11px weight 600
- **地色は 3 段の青い白**：`#fdfdff`（body）→ `#f5f8fd`（セクション）→ `rgba(255,255,255,0.42)`（カード）
- **値上がり `#0050d7` / 値下がり `#ff6400`**
- **影は `rgba(16, 42, 75, 0.06)`**（濃紺・アルファ 0.06 で統一）
- `html { font-size: 10px }` を置いてから rem で組む

### Don't（禁止）

- **`--primary-color-bg`（`#1980e5`）を CTA に使わない。** 実装は `#0050d7`
- **`--color-text`（`#242428`）を本文色にしない。** 実測は `#13161b`
- **`ruby` / `emerald` / `yellow` / `red` のパレット（48 色）を使わない**（LP の可視要素に 1 つも出ない）
- **値上がりを赤、値下がりを緑にしない**（このサイトは青とオレンジ）
- **日本語に `letter-spacing` を足さない**（755/759 要素が `normal`）
- **`palt` を全体に足さない**（実測 6 要素のみ）。**数字があるなら先に `tnum`**
- **`Noto Sans JP` の `font-weight: 300` と可変フォント指定を使わない**（`unloaded`）
- **CTA に `box-shadow` を足さない**
- **影を `rgba(0,0,0,…)` にしない**（濃紺 `rgba(16,42,75,…)`）
- **`body` の `font-family` 宣言（`-apple-system` 先頭）を真似しない。** 子要素で Noto Sans JP 先頭に上書きされている
- 下層ページの流儀（radius 4px / weight 400 / コンテナ 1080px）を新規実装に持ち込まない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測件数 | 説明 |
|------|-------|---------|------|
| **Mobile** | **`screen and (width <= 690px)`** | **73** | **最も手が入る境界。** モダンな range 構文 |
| **Tablet** | **`screen and (691px <= width <= 1279px)`** | **49** | **範囲指定の range 構文** |
| Below Desktop | `screen and (width <= 1279px)` | 28 | — |
| **Desktop** | **`screen and (width >= 1280px)`** | **13** | — |
| Motion | `(prefers-reduced-motion: reduce)` | 2 | — |

> **境界は 690px と 1280px の 2 本。** `(691px <= width <= 1279px)` のような **range 構文で中間帯を直接書く**のがこのサイトの流儀。

### タッチターゲット

- 主 CTA: `padding: 0 24px` ＋ `height` 指定。**高さは実装側で 48px 前後を確保すること**（`line-height: 1.00` なので padding だけでは高さが出ない）
- タグ（11px / padding `5px 10px`）: 高さ約 25px — **44px を下回る。モバイルでは縦 padding を増やすこと**
- ティッカーの行: 高さ約 40px — わずかに下回る

### フォントサイズの調整

- ティッカー 11〜13px、ナビ 14px、本文 16px はブレークポイントをまたいで固定
- 実績数字（61.2434px）と一部の gap（24.0048px / 8.64px）は **`clamp()` / `vw` で可変**（端数がその証拠）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Blue:   #0050d7      ← 変数の #1980e5 ではない
Lightning Orange:#ff6400
Text Primary:   #13161b      ← 変数の #242428 ではない
Text Secondary: #42516a
Text Muted:     #697ca9      ← 可視 356 要素で最多
Page BG:        #fdfdff
Section BG:     #f5f8fd      ← 実際に目に入る地色
Card BG:        rgba(255,255,255,.42)
Tint:           #eef4ff / #ebf1fc
Root: html { font-size: 10px }
Font (和文): "Noto Sans JP", -apple-system, "Segoe UI", Roboto, sans-serif   /* 400/500/600/700 */
Font (数字): Nunito, sans-serif      /* 600 */
Font (実績): Poppins, sans-serif     /* 600 / letter-spacing -0.091em */
Default Weight: 600
Body Size: 16px / line-height 1.75
Line Height: 1.00（数値・ラベル・ボタン） / 1.75（本文） / 1.95（フッター） / 1.40（見出し）
Letter Spacing: normal（例外は Poppins の -5.6px のみ）
Radius: 10px（カード） / 12px（CTA） / 990px（ピル） / 28px（特集）
Container: 1170px / 本文 620px
Shadow: 0 1px 3px rgba(16,42,75,.06) / 0 4px 20px rgba(16,42,75,.06)
OpenType: font-feature-settings: "tnum"（366要素）。palt はほぼ使わない
Breakpoint: width <= 690px / 691px <= width <= 1279px / width >= 1280px
```

### プロンプト例

```
bitFlyer のデザインシステムに従って、暗号資産取引所のトップページを作成してください。
- html { font-size: 10px } を置き、以降 rem で組む
- 和文は font-family: "Noto Sans JP", -apple-system, "Segoe UI", Roboto, sans-serif
  font-weight の既定は 600（400 は注記・免責だけ）
- 価格・変動率・桁区切りの数字は font-family: Nunito, sans-serif / 600 に切り替え、
  必ず font-feature-settings: "tnum" を入れる（更新のたびに桁がずれないため）
- 実績の巨大数字（No.1 / 95.7%）は Poppins 600 / 61px / letter-spacing -5.6px
- 日本語に letter-spacing を足さない（normal のまま）
- 数値・ラベル・ボタンは line-height 1.00、読ませる文章は 1.75、フッターのリンク列は 1.95
- 地色は青い白を3段：body #fdfdff、セクション #f5f8fd、カードは rgba(255,255,255,.42)
- 価格ティッカーのカードは radius 10px / 影なし / 半透明の白
  銘柄名 13px weight 600、価格 Nunito 11px、単位「円」10px
- 値上がりは #0050d7、値下がりは #ff6400（赤と緑は使わない）
- 主CTAは背景 #0050d7 / 白文字 / radius 12px / padding 0 24px / 15px weight 700 / 影なし
  ヒーローのCTAだけ 18px。ヘッダーの「新規登録」は radius 8px / 14px weight 600
- タグは radius 990px のピル、面 #eef4ff、文字 #0050d7、11px weight 600
- サービスカードは radius 28px / box-shadow 0 4px 20px rgba(16,42,75,.06)（黒ではなく濃紺）
- コンテナ 1170px、本文カラム 620px、gap は 16px を基準に
- メディアクエリは width <= 690px / 691px <= width <= 1279px / width >= 1280px の range 構文で書く
```
