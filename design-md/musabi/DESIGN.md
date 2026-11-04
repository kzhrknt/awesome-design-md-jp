# DESIGN.md — 武蔵野美術大学（Musashino Art University）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-04 / 対象: `https://www.musabi.ac.jp/`, `/outline/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **Web フォントを 1 本も読まない。** 和文は游ゴシック体の OS ローカル頼み、面は黒・白・グレーの 3 段だけ。作品（カルーセルの画像）を主役にして、UI は限界まで黙る
- **密度**: 高い。本文 13px / 行間 1.62 で、ナビもカードも小さく詰める。美大サイトでありながら**文字まわりは極端に地味**
- **キーワード**: 游ゴシック、Web フォント 0 本、太字主導、黒い面、角丸ゼロ

**このサイトの核心は4つある。**

1. **和文 Web フォントが 1 本もない。** 3 点すべてで確認済み —— ①`@font-face` は **`glyphicon-musabi`（アイコン）の 1 件だけ** ②フォントファイルのリクエストは**全ページで 1 件**（自ドメインの `glyphicon-musabi.woff`）③`distributions.fontFamily` の可視要素は游ゴシックスタックが 210 / 121 要素。**親切のつもりで Noto Sans JP を足すと別物になる**
2. **本文の 6 割が `font-weight: 700`。** 実測 700 が **127 / 211 要素**（下層は 99 / 122）、400 が 84 / 23。**太字が既定で、細い方が例外**という珍しい構え。游ゴシックは Regular / Bold の 2 本なので、この 700 は合成ではなく本物の Bold
3. **Windows の游ゴシック問題に対策していない。** スタックは `游ゴシック体, 游ゴシック, "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN W3", ...` で、**Medium がどこにも入っていない**。Windows では `游ゴシック`（Regular）に当たって細く出る。ただし本文の 6 割が 700 なので、影響を受けるのは weight 400 の要素だけ
4. **`letter-spacing` は宣言されているのに、事実上ゼロ。** `body { letter-spacing: -0.001em }` が 13px に対して **`-0.013px`** という絶対値になり、206 / 112 要素へ px のまま降りる。32px の見出しでも `-0.013px`（= **-0.0004em**）のままなので、**大きい文字ほど「何もしていない」**

**CSS Custom Properties は `:root` に 0 個。** `getComputedStyle(document.documentElement)` では 73 個見えるが、中身は Tailwind の `--tw-*` と Zoho SalesIQ の `--zsiqf-*` の継承値で、**自社トークンは 1 つもない**。

> **3 世代のフレームワークが同居している。** WordPress（テーマ `musabi-ac-jp`）＋ Bootstrap（`body { font-family: "Helvetica Neue"...; font-size: 14px; line-height: 1.42857; color: #222222 }` が残っている）＋ **Tailwind の prefix 付きクラスを arbitrary value ごと HTML に直書き**（`tw-text-[12px] tw-text-[#7a7a7a]`）。Bootstrap の `body` は自社の宣言が上書きしているので描画には出ないが、**CSS を読むときは2つの `body` 宣言があることを前提にする**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Black（面）** | **`#000000`** | **可視 162 要素の文字色 ＋ CTA・ナビの塗り面**。このサイトの主役 |
| **Breadcrumb Blue** | **`#003894`** | 下層のパンくずの現在位置（可視 1 要素）。**ブランド色ではなく機能色** |
| Hero Blue | `#3B58D6` | トップの `美術で未来を創造する。` の面（可視 1 要素） |

> **ブランドカラーと呼べる色がほぼ無い。** 面は黒とグレー、文字は黒と `#262626` だけで、色は**カルーセルの作品画像が持ち込む**設計。新規実装でアクセントカラーを発明しないこと

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): トップの本文・見出し。**可視 162 要素**。**純黒を使う**
- **Text Link** (`#262626`): リンク（`<a>`）。**トップ 13 要素 / 下層 89 要素**。**下層ではこちらが最多になる**
- **Text Muted** (`#7A7A7A`): 日付（Tailwind の arbitrary value `tw-text-[#7a7a7a]` で指定）
- **Text on Dark** (`#FFFFFF`): 黒面・写真上（可視 25 要素）
- **Surface Gray** (`#E0E0E0`): カード・区切りの面（**可視 12 要素**で最も多い面）
- **Surface Gray 2** (`#E2E2E2`): 検索パネル・ドロワーの面（可視 4 要素）
- **Surface Light** (`#F0F0F0`): フッター上部の面（可視 2 要素）
- **Lang Switch** (`#707070`): 言語切替ボタンの面（可視 5 要素）
- **Overlay** (`rgba(0, 0, 0, 0.7)`): ドロワーの背後
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **游ゴシック体**。OS ローカルのみで、`@font-face` は無い
- **明朝体**: 使わない（実測 0 要素）
- **Web フォント**: **0 本**。`document.fonts` に載るのは `glyphicon-musabi`（アイコン・`loaded`）、`siq` / `fzwc`（Zoho SalesIQ 由来・ともに `unloaded`）の 3 件だけ

> **「Web フォントを読み込まない」こと自体が設計。** 美大のサイトだが、タイポグラフィで主張せず、カルーセルに載る作品の画像に色と表情を預けている

### 3.2 欧文フォント

- 専用の欧文フォントは持たない。英数字（日付 `9/19 - 11/21`、`SPECIAL` `INFORMATION`）も**游ゴシック体の欧文グリフ**で組む
- 例外はフッターのコピーライト 1 要素だけが `"Helvetica Neue", Arial, Verdana, sans-serif`（8px）
- **ヒーローの大きな欧文「Musashino Art University」は画像**（`carousel_text_02.png` 250×132px）。`distributions.fontFamily` にセリフ体も別書体も 1 要素も出ない。**ここを Web フォントで実装しないこと**

### 3.3 font-family 指定

```css
/* 本文・UI（唯一のスタック） */
font-family: 游ゴシック体, 游ゴシック, "Yu Gothic", YuGothic,
             "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, sans-serif;
```

**フォールバックの考え方**:
- **和文優先。** 欧文を先頭に置かず、游ゴシック体の欧文グリフで統一する
- **実サイトは Windows 対策をしていない。** `"游ゴシック Medium"` / `"Yu Gothic Medium"` がスタックに無いので、Windows では Regular に当たる
- **正しくは Medium を Regular より前に置く**:
  ```css
  font-family: 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
               游ゴシック, "Yu Gothic",
               "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
               メイリオ, Meiryo, sans-serif;
  ```
  ただし**このサイトは weight 700 が主役**なので、Windows でも太字は正しく出る。差が出るのは weight 400 の 84 要素（日付・本文）

### 3.4 文字サイズ・ウェイト階層

**游ゴシックは Regular と Bold の 2 本しかない。** 隠し div の幅実測（欧文文字列）で `font-weight` を振ると **100〜500 → 629.02px / 600〜900 → 664.41px の 2 段**にきれいに割れる。

- **`font-weight: 500` を当てても Regular で出る**
- **600 以上はすべて Bold に解決される**（700 と 900 の差は無い）
- **中間のウェイトは存在しない。** 400 と 700 の 2 択で設計する

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| **Page Title（下層）** | **32px** | 400 | 1.20 | **4.48px (0.14em)** | `大学概要`。**見出しだけ自分で em を持つ** |
| Section Heading | 24px | **700** | 1.50 (36px) | -0.013px | `SPECIAL` `INFORMATION` |
| Nav Button | 18px | **700** | — | -0.013px | グローバルナビ（黒面・白文字） |
| **Hero h1** | **17px**（≥1024px）/ **12px**（≤834px） | 400 | — | — | 固定の 2 段。流体ではない |
| Sub Nav | **16px** | 400 | 1.20 | **2.24px (0.14em)** | 下層の節見出し。**9 要素** |
| **Body / Nav** | **13px** | 400 / **700** | **1.62** (21px) | **-0.013px** | **最多（44 / 110 要素）** |
| Card Text | 14px | 700 | 1.43 | -0.013px | カード内のテキスト |
| Caption | 12px | 400 | 1.85 | -0.013px | `受験生サイト` 等 |
| **Date** | **8.75px** | 400 | 1.43 | -0.013px | **48 要素**。`0.875rem`（root 10px） |
| Copyright | 8px | 400 | — | — | Helvetica Neue |

### 3.5 行間・字間

- **本文の行間は 1.62**（`body { line-height: 1.61538 }`）。実測 **130 / 89 要素**で最多
- 次点は **1.43**（48 要素・日付）、**1.85**（9 要素・ユーティリティナビ）、**1.20**（12 要素・節見出し）
- **字間には 2 つの型が同居している**:

| 型 | 実測 | 仕組み |
|----|------|--------|
| **継承型（既定）** | `-0.013px` が **206 / 112 要素** | `body { letter-spacing: -0.001em }` が 13px で `-0.013px` という**絶対値**になり、全子孫へ px のまま降りる |
| **要素が em を持つ型** | 16px → `2.24px` / 32px → `4.48px` | 下層の節見出し・ページタイトルだけ **`0.14em`** を自分で宣言している |

**ガイドライン**:
- **`body` の `-0.001em` は再現しなくてよい。** 13px で -0.013px、つまり**実質ゼロ**。`letter-spacing: normal` と見分けがつかない
- **本当に意味がある字間は、下層見出しの `0.14em` だけ。** ここは `em` でその要素に書く
- **`body` に `em` の字間を書いて継承させない**（大きい文字で効かなくなる）
- 本文の行間は **1.62** を既定にする

### 3.6 禁則処理・改行ルール

```css
word-break: normal;        /* body の実測値 */
overflow-wrap: break-word;
line-break: strict;
```

- `word-break: break-all` は使わない
- `text-size-adjust: none` を `body` に宣言している（モバイルでの自動拡大を止める）

### 3.7 OpenType 機能

**`font-feature-settings` の宣言は CSS 全文に 0 件、実測も 0 要素。**

- **`palt` を足さないこと。** 游ゴシックの既定の字送りのまま組むのがこのサイトの設計
- `YakuHanJP` のような約物サブセットも使っていない

### 3.8 縦書き

該当なし（`writing-mode: vertical-*` の実測 0 要素）。

---

## 4. Component Stylings

**`border-radius` は実質 `0px`。** 実測で見つかるのは検索ボタンの 2px と閉じるボタン（`×`）の 4px だけ。

**`box-shadow` は両ページとも 0 種。**

### Buttons

**Primary（黒面）**
- Background: **`#000000`**
- Text: `#FFFFFF`
- Border: なし
- Border Radius: **`0px`**
- Font: 14px / **weight 700**
- Padding: `12px 0`
- 例: `資料請求`

**Nav Button（黒面・大）**
- Background: `#000000` / Text: `#FFFFFF`
- Border Radius: `0px`
- Font: **18px / weight 700**
- Padding: `20px 12px`
- 例: `大学概要` `学部学科・大学院`

**Nav Button（黒面・小）**
- Background: `#000000` / Text: `#FFFFFF`
- Font: 14px / weight 700 / Padding: `8px`
- 例: `在学生` `受験生`

**Language Switch**
- Background: **`#707070`** / Text: `#FFFFFF`
- Border Radius: `0px`
- Font: 16px / weight 700 / Padding: `8px 20px`
- 例: `日本語` `English` `中文 （简体）`

### Cards

- Background: **`#E0E0E0`** または `#FFFFFF`
- Border Radius: **`0px`**
- Shadow: **なし**

### Inputs

- 検索ボックスの面は **`#E2E2E2`**
- Border Radius: **2px**（サイト唯一の角丸らしい角丸）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| S | 8px | 小ボタン内側 |
| M | 12px | CTA 上下 |
| L | 20px | ナビボタン左右 / グリッドの gap（`0 20px`） |
| XL | 30px | カード間 |
| 2XL | 40px | セクション内 |
| 3XL | 60px | セクション間 |

### Container

- **`max-width` の宣言が 1 件も無い**（`distributions.layout.containers` が両ページとも空）。幅はグリッドとパディングで決めている
- カルーセルの作品画像は **912 × 513px**（16:9）

### Grid

- トップはヒーロー（左に画像のタイトル 250×132 ＋ 右に 912×513 のスライド）＋ 下にカード列
- gap は `60px` / `40px` / `30px` / `0 20px`

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **両ページとも実測 0 種。例外なし** |

> **影を使わないサイト。** 階層は面の明度（`#FFFFFF` → `#F0F0F0` → `#E0E0E0` → `#000000`）だけで作る

---

## 7. Do's and Don'ts

### Do（推奨）

- **Web フォントを読み込まない。** 和文は游ゴシック体の OS ローカルで組む
- **ウェイトは 400 と 700 の 2 択**（游ゴシックは 2 本しかなく、500 は Regular・600 以上は Bold に解決される）
- **太字を既定にする。** このサイトは本文・ナビ・見出しの 6 割が weight 700
- **本文は 13px / `line-height: 1.62`**
- **下層の見出しには `letter-spacing: 0.14em` を `em` でその要素に書く**
- **`border-radius: 0` を貫く**
- 面は `#FFFFFF` / `#F0F0F0` / `#E0E0E0` / `#000000` の 4 段
- 文字色は本文 `#000000`、リンク `#262626`、日付 `#7A7A7A`
- 日付は **8.75px**（`0.875rem`。`html` は 10px）
- **Windows 対策として `"游ゴシック Medium"` / `"Yu Gothic Medium"` を Regular より前に足す**（実サイトは入れていないが、入れるべき）

### Don't（禁止）

- **Noto Sans JP などの Web フォントを足さない**（実サイトは和文 Web フォント 0 本）
- **`font-weight: 500` や `600` を使わない**（游ゴシックでは 500 は Regular、600 は Bold に丸まる。設計上は存在しない）
- **`body` に `letter-spacing` を `em` で書いて継承させない**（13px の `-0.001em` が `-0.013px` という絶対値で降り、見出しで効かなくなる）
- **`-0.001em` を「詰めの設計」と読まない**（実質ゼロ）
- **`box-shadow` を足さない**（実測 0 種）
- **`border-radius` を 4px や 8px にしない**
- **`font-feature-settings: "palt"` を足さない**（CSS 全文で 0 件）
- **ヒーローの「Musashino Art University」をテキストで組まない**（実サイトは PNG 画像）
- アクセントカラーを発明しない（ブランド色と呼べる色が無いのが設計）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile / Tablet** | **≤ 1023px** | **`screen and (max-width: 1023px)`。CSS 全文で 272 回と圧倒的に最多** |
| **Desktop** | **≥ 1024px** | `screen and (min-width: 1024px)`（6 回） |
| Mid Desktop | 1024–1199px | 入れ子の中間 |
| Wide | ≥ 1200px | 入れ子の中間 |

> **主分岐は 768px ではなく 1023 / 1024px。** 一般的な値と違うので、他サイトの感覚で 768px を使わないこと

### タッチターゲット

- ナビボタン（18px / padding `20px 12px`）で高さ 65px — 44px を満たす
- `資料請求`（14px / padding `12px 0`）で高さ 42px — **わずかに下回る**
- **日付の 8.75px は小さすぎる。** モバイルでは拡大すること

### フォントサイズの調整

- **`html` 10px / `body` 13px は 1440 / 1200 / 1024 / 834 / 769 / 768 / 767 / 390 / 375px の 9 幅すべてで完全固定**。流体も崖も無い
- 変わるのは **`h1` だけ**（17px → 12px、1024 / 834px の間で切替）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text:        #000000
Link:        #262626
Muted:       #7A7A7A
Surface:     #E0E0E0 / #E2E2E2 / #F0F0F0
Lang Switch: #707070
Breadcrumb:  #003894
Background:  #FFFFFF
Font (JP): 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック, "Yu Gothic", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif
Web Font:    なし（0 本）
Root:        html 10px / body 13px（9 幅で完全固定）
Body Size:   13px
Weight:      400 / 700 の 2 択（700 が既定）
Line Height: 1.62（本文） / 1.43（日付） / 1.20（節見出し）
Letter Spacing: normal 相当（見出しのみ 0.14em）
Border Radius: 0px
Box Shadow:  none
Breakpoint:  1023 / 1024px
```

### プロンプト例

```
武蔵野美術大学のデザインシステムに従って、学科紹介ページを作成してください。
- Web フォントは一切読み込まない。和文は游ゴシック体の OS ローカルで組む
- font-family は游ゴシック体を先頭に、"游ゴシック Medium" / "Yu Gothic Medium" を Regular より前に置く
- font-weight は 400 と 700 の 2 択だけ（500 や 600 は游ゴシックに存在せず丸まる）
- 本文・ナビは 13px / line-height 1.62、ナビとカードは weight 700 を既定にする
- 節見出しは 16px / letter-spacing 0.14em、ページタイトルは 32px / 0.14em / line-height 1.20
- letter-spacing は body に書かない（見出しだけ em で個別に書く）
- CTA は背景 #000000 / 白文字 / border-radius 0 / 14px weight 700 / padding 12px 0
- ナビボタンは 18px weight 700 / padding 20px 12px / 黒面
- 言語切替は背景 #707070 / 16px weight 700 / padding 8px 20px
- カードの面は #E0E0E0、本文色は #000000、リンクは #262626、日付は #7A7A7A の 8.75px
- border-radius はすべて 0px、box-shadow は一切使わない
- font-feature-settings: "palt" は使わない
- ブレークポイントは 1023 / 1024px（768px ではない）
- html は 10px、body は 13px で全幅固定
```
