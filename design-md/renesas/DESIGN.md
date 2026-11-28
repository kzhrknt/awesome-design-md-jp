# DESIGN.md — ルネサス エレクトロニクス（Renesas）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-28 / 対象: `https://www.renesas.com/ja`, `https://www.renesas.com/ja/about`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に **`#2a289d` の濃い青紫 1 色**。CTA は **`border-radius: 40px` のピル**、バッジは 4px、カードは 20px と**角丸を役割ごとに割り当てる**。グローバル共通のテンプレートを日本語ページにもそのまま当てている
- **密度**: 中。製品リスト・ニュース・イベントが 3 カラムで並ぶが、セクション間は **80px** と広く取る
- **キーワード**: ルネサスブルー、DM Sans、ピル型 CTA、和文は端末任せ、root 16px

**このサイトの核心は 3 つある。**

1. **和文の Web フォントを 1 本も読み込まない。** `@font-face` は **DM Sans 4 ウェイト ＋ DM Sans Fallback 4 ウェイト ＋ icomoon ＋ Material Icons** だけで、フォント要求 6 件はすべて自社ホスト。スタックは全要素が `"DM Sans", "DM Sans Fallback", Arial, sans-serif`（実測 174 / 103 要素＝**可視の全部**）で、**DM Sans も Arial も CJK を持たないため、日本語は generic の `sans-serif`＝端末の既定和文に落ちる**。CDP の `CSS.getPlatformFontsForNode` で実測すると macOS では **`Hiragino Kaku Gothic ProN`**
2. **`DM Sans Fallback` は `src: local("Arial")` ＋ メトリクス上書き。** 4 ウェイトそれぞれに `ascent-override` / `descent-override` / `line-gap-override` / `size-adjust` を与えて、Web フォントが届くまでのレイアウトずれを消している。**ただしこの工夫が効くのは欧文だけ**で、ページの大半を占める和文には 1 文字も掛からない
3. **`letter-spacing` の宣言が CSS 全文で `normal` と `1px` の 2 つしかない。** 実測は **177/179 が `normal`**、例外は `-1px` の 2 要素（`イベント＆ウェビナー` `ルネサスの採用情報`）だけ。**和文の字間設計が存在しない**

**`font-feature-settings` は Material Icons の `"liga"` が 5 要素のみ。** `palt` は 1 要素も無い。

> **このサイトは「和文タイポグラフィを設計していない例」として収録している。** レイアウト・色・コンポーネントは参考にしてよいが、**書体の調達だけは真似しない**（7 章を参照）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Renesas Blue** | **`#2a289d`** | **可視 33 要素（下層）**。CTA の面、ヘッダーの帯、リンクの文字色 |
| **Header Deep** | **`#1c1b6e`** | ヘッダー最上段のユーティリティ帯。`#2a289d` より 1 段暗い |
| Accent Green | `#00a830` | 可視 12 要素の塗り面 |
| **Badge Orange** | **`#dd5c1b`** | **`NEW` バッジ**（可視 11 要素） |

```css
/* ヒーローのグラデーション（実サイトのまま。角度・停止位置を丸めない） */
background: linear-gradient(90deg, rgb(131, 208, 250) 45%, rgb(42, 40, 157) 55%);
```

### Neutral（ニュートラル）

- **Text Primary** (`#1c1c1c`): 見出し・UI。**可視 63 要素**。純黒ではない
- **Text Body** (`#706f6f`): 製品説明の本文。**可視 61 / 37 要素**
- **Text Darker** (`#191919`): 一部の見出し
- **Text Muted** (`#696969` / `#a9a9a9`): キャプション、無効状態
- **Text on Dark** (`#ffffff`): 面の上（可視 49 / 12 要素）
- **Surface Tint** (`#f6f6fb`): 設計リソースのツールバー（**青みのある薄グレー**）
- **Surface Gray** (`#f4f4f4`): ニュースレター登録の帯
- **Surface Blue** (`#e5f0fb`): 下層ページのヘッダー面
- **Surface Blue Light** (`#e7effd`): 採用情報のカード
- **Dark Surface** (`#1c1c1c`): メガメニューのバックドロップ、フッター
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

**宣言が無い。** `font-family` スタックの中に和文書体は 1 つも含まれていないため、日本語は **generic の `sans-serif`**＝ブラウザ／OS の既定和文で描画される。

| 環境 | 実際に描画される書体 |
|---|---|
| macOS | **Hiragino Kaku Gothic ProN**（CDP で実測） |
| Windows | Yu Gothic UI（`sans-serif` の既定） |
| Android | Noto Sans CJK JP |

- **同じ要素の中で和文と欧文が別書体に割れる。** 例: `メモリ&ロジック` は CDP で `Hiragino Kaku Gothic ProN(7 グリフ)` ＋ `DM Sans Medium(1 グリフ)`（`&` だけ DM Sans）
- **ウェイトも端末任せ。** CSS は 400 / 500 / 600 / 700 を使い分けるが、ヒラギノ角ゴ ProN は W3 / W6 の 2 本しか無いので、**500 は W3、600 / 700 は W6 ＋ 合成**に丸められる

### 3.2 欧文フォント

- **DM Sans**（自社ホスト・woff2 ＋ ttf・**400 / 500 / 600 / 700 の 4 本**）
- **DM Sans Fallback**（`src: local("Arial")` のメトリクス上書き・4 ウェイト）
- `Material Icons`（アイコン）、`icomoon`（アイコン）

```css
/* 実サイトの @font-face（抜粋） */
@font-face {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400;
  src: url("/themes/kachow/src/components/base/fonts/DMSans-Regular.woff2") format("woff2"),
       url("/themes/kachow/src/components/base/fonts/DMSans-Regular.ttf") format("truetype");
  font-display: swap;
}
@font-face {
  font-family: "DM Sans Fallback";
  src: local("Arial");
  font-weight: 400;
  ascent-override: 94.9%;
  descent-override: 29.66%;
  line-gap-override: 0%;
  size-adjust: 104.53%;
}
/* 500: 93.3% / 29.16% / 106.33%   600: 91.18% / 28.49% / 108.79%   700: 91.18% / 28.49% / 109.91% */
```

> **`src: local()` の使い方がこれまでの型と違う。** 別名を作るため（東急不動産）でも、ウェイトの段を作るため（OpenWork）でもなく、**`font-display: swap` の差し替え時にレイアウトを動かさないためのメトリクス一致**。next/font などが吐く形。**ただし CJK を持たない Arial が土台なので、和文には一切効かない。**

### 3.3 font-family 指定

```css
/* 実サイトの宣言（全要素がこれ 1 本） */
font-family: "DM Sans", "DM Sans Fallback", Arial, sans-serif;
```

**実サイトはこうだが、正しくは和文を明示する**:

```css
/* 日本語ページで使うなら */
font-family: "DM Sans", "DM Sans Fallback",
             "Noto Sans JP", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             "Yu Gothic Medium", "游ゴシック Medium", メイリオ, Meiryo,
             Arial, sans-serif;
```

**フォールバックの考え方**:
- 欧文を先頭に置く構成自体は合理的（型番 `RZ/T2N` `RL78/G21` が多いサイトなので、欧文の字面を揃える意味がある）
- **問題は欧文の次が `Arial`（CJK なし）→ `sans-serif` で終わっていること**。和文の指定が 1 つも無いため、**Windows と macOS で和文の字面が完全に変わる**

### 3.4 文字サイズ・ウェイト階層

ルートは **`html { font-size: 16px }`** で、**1920〜320px の 25 幅すべて固定**。`body` も 16px / `line-height: 24px`（1.50）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Page Title** | DM Sans | **44px** → 32px (≤992px) | 500 | **1.23** | normal | `会社案内` |
| **Hero Title** | DM Sans | **42px** | **500** | **1.25** | normal | `高精度な4軸モータ制御を実現する産業ロボット向けMPU` |
| Heading 2 | DM Sans | **38px** → 26px (≤992px) | 500 | 1.11 | normal | セクション見出し |
| Heading 3 | DM Sans | 28px | 500 | 1.21 | normal | `最新情報のお知らせについて` |
| Sub Heading | DM Sans | 24px | 500 | 1.25 | normal | `設計リソースを見る` |
| **Card Title** | DM Sans | **20px** | 500 | **1.30** | normal | 型番・リンク見出し。可視 28 要素 |
| Lead | DM Sans | 18px | 400 | **1.40** | normal | ヒーローのサブコピー |
| **Body** | DM Sans | **16px** | 400 | **1.50** (24px) | normal | 可視 39〜46 要素 |
| **UI / Nav** | DM Sans | **14px** | **500** | **1.29** | normal | **可視 41〜66 要素で最多** |
| Badge | DM Sans | 12px | **700** | 1.33 | normal | `NEW` |

**ウェイトは 400 / 500 / 600 / 700 の 4 段**（実測 500 が 83 要素、400 が 80、700 が 11、600 が 5）。

> **`font-weight: 500` が最多だが、和文では効かない。** ヒラギノ角ゴ ProN は W3 / W6 の 2 本なので **500 は W3（Regular）で出る**。欧文（DM Sans Medium）だけが中太になり、**1 行の中で和文が細く欧文が中太**という不揃いが起きる。

### 3.5 行間・字間

- **本文 `line-height: 24px / 16px = 1.50`**（可視 25〜57 要素で最多）
- ナビ・UI は **1.29**（可視 30 要素）、見出しは **1.11〜1.30**
- カードリストの一部だけ **2.10**（可視 4 要素）

**字間の設計は無い。**

```css
/* CSS 全文の letter-spacing 宣言はこの 2 つだけ */
letter-spacing: normal;
letter-spacing: 1px;
```

- 実測 **177/179（トップ）・103/103（下層）が `normal`**
- 例外は `-1px` が 2 要素（`イベント＆ウェビナー` `ルネサスの採用情報`）

**ガイドライン**:
- **日本語で再現するなら字間を足す。** 実サイトは `normal` だが、和文の本文は `0.02〜0.04em` 程度あったほうが読みやすい（4〜8 章の他サイトを参照）
- 行間 **1.50** は日本語本文の下限。長文では **1.7〜2.0** に上げる

### 3.6 禁則処理・改行ルール

- `word-break` / `line-break` / `overflow-wrap` / `auto-phrase` の宣言は無い
- **和文の改行はブラウザ既定のまま**。型番（`RZ/T2N` `RL78/G21`）が行末で割れる可能性がある。**再現するなら型番を `<span style="white-space: nowrap">` で囲む**

### 3.7 OpenType 機能

```css
font-feature-settings: "liga";   /* Material Icons のリガチャ（5 要素）。タイポグラフィの指定ではない */
```

- **`palt` は 1 要素も無い。** 和文書体を持っていないので当然ではある
- 再現時に `palt` を足すかどうかは、**どの和文書体を調達するかで決める**（端末の既定和文のままなら足さない）

### 3.8 縦書き

- 使っていない（`writing-mode` は両ページとも 0 要素）

---

## 4. Component Stylings

### Buttons

**Primary（ピル型）**
- Background: `#2a289d` / Text: `#ffffff`
- Border: `1px solid rgba(0, 0, 0, 0)`（**透明な 1px**。アウトライン版と高さを揃えるため）
- Border Radius: **`40px`**
- Padding: `8px 24px`
- Font: `"DM Sans", "DM Sans Fallback", Arial, sans-serif` / **16px** / **500** / line-height `24px` / letter-spacing `normal`
- Box Shadow: `none`

**Carousel Arrow（円形）**
- Background: `#000000` / Icon: `#ffffff`
- Border Radius: **`40px`** / Padding `0`
- **Box Shadow: `rgb(255, 255, 255) 0 0 8px 0`** ← **白い影**。写真の上に置いても縁が立つ

**Clear（小）**
- Border Radius: `30px`

### Badges

- `NEW`: Background `#dd5c1b` / Text `#ffffff` / **Border Radius `4px`** / 12px / **700**

### Cards

- Border Radius: **`20px`**（可視 8 要素）。上だけ丸める版は `20px 20px 0 0`（3 要素）
- Box Shadow: `rgba(13, 13, 14, 0.15) 0 0 10px 0`（3 要素）
- Surface: `#f6f6fb`（ツールバー） / `#e7effd`（採用）

### Avatar / Icon

- Border Radius: `100%`（12 要素） / `50%`（2 要素）

---

## 5. Layout Principles

### Spacing Scale

```css
html {
  --section-outer-spacing: 64px;   /* 既定 */
  --section-inner-spacing: 64px;
  --section-heading-spacing: 32px;
}
/* デスクトップ（実測値） */
--section-outer-spacing: 80px;
--section-inner-spacing: 80px;
--section-heading-spacing: 40px;
```

| Token | Value | 実測 |
|-------|-------|------|
| S | 16px | gap 1〜2 件 |
| M | 20px | gap 1 件 |
| L | 35px | gap 1 件 |
| **XL** | **45px** | **gap 5〜6 件（最多）** |
| Section Heading | **40px** | `--section-heading-spacing` |
| **Section** | **80px** | `--section-outer-spacing` / `--section-inner-spacing` |

### Container

- **Max Width: `1403px`**（`--rgrid-content-max-width`。実測 7〜16 件で最多）
- Sub Container: `1299px`（6 件）
- Narrow: `765px` / `626px`

### CSS Custom Properties の内訳

`:root` に 54 個あるが、**自社のトークンは 6 個だけ**。

| 自社トークン | 値 |
|---|---|
| `--rgrid-content-max-width` | `1403px` |
| `--section-outer-spacing` | `80px`（既定 64px） |
| `--section-inner-spacing` | `80px`（既定 64px） |
| `--section-heading-spacing` | `40px`（既定 32px） |
| `--scrollbarWidth` | `0px` |
| `--scrollbarWidthHalf` | `0px` |

> **残り 48 個はすべて `--aa-*`（Algolia Autocomplete の既定値）。** `--aa-primary-color-rgb: 62,52,211` のようにブランド色とは無関係の値が並ぶ。**「CSS 変数が 54 個ある ＝ デザインシステムがある」と読まない。**
>
> **色のトークンは 1 つも無い。** `#2a289d` も `#dd5c1b` も CSS に直書きされている。

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|---|
| 0 | `none` | 既定。CTA を含むほとんどの要素 | — |
| 1 | `rgba(13, 13, 14, 0.15) 0 0 10px 0` | カード | 3 要素 |
| **—** | **`rgb(255, 255, 255) 0 0 8px 0`** | **カルーセルの矢印（白い影）** | 3 要素 |

> **白い影は「浮き」ではなく「縁取り」。** 写真の上に黒い円ボタンを置いたときに輪郭を立てるために使っている。黒い影に置き換えると見えなくなる。

---

## 7. Do's and Don'ts

### Do（推奨）

- ルートは **`html { font-size: 16px }`** 固定。流体にしない
- CTA は **`border-radius: 40px` のピル / `padding: 8px 24px` / 16px / weight 500**。**`border: 1px solid transparent` を必ず入れる**（アウトライン版と高さを揃えるため）
- 角丸は役割で割り当てる: **バッジ 4px / カード 20px / CTA 40px / アイコン 100%**
- セクション間は **80px**、見出しと本文の間は **40px**
- コンテナは **1403px**
- 写真の上に置く円ボタンには **`box-shadow: #ffffff 0 0 8px 0`**（白い影）
- 本文色は **`#706f6f`**、見出しは **`#1c1c1c`**。純黒を使わない

### Don't（禁止）

- **`font-family: "DM Sans", "DM Sans Fallback", Arial, sans-serif` をそのまま写さない。** 和文書体が 1 つも入っておらず、日本語は端末の既定に落ちる。**Windows（Yu Gothic UI）と macOS（ヒラギノ角ゴ ProN）で字面が完全に変わる**。日本語ページなら受け皿に `"Noto Sans JP"` / `"ヒラギノ角ゴ ProN W3"` / `"Yu Gothic Medium"` を足す
- **`DM Sans Fallback` のメトリクス上書きが和文にも効くと思わない。** 土台が `local("Arial")` で CJK を持たないため、和文は `size-adjust` も `ascent-override` も通らず素の `sans-serif` で出る
- **`font-weight: 500` を和文の中太のつもりで使わない。** ヒラギノは W3 / W6 の 2 本なので **500 は Regular で出る**。欧文だけが中太になり、1 行の中で太さが揃わなくなる
- **`letter-spacing: normal` をそのまま日本語に適用しない。** 実サイトは 177/179 が `normal` だが、これは設計ではなく**和文の字間を設計していない**結果
- **`--aa-*` を自社トークンとして扱わない。** 48 個は Algolia Autocomplete の既定値
- **型番を折り返させない。** `word-break` の指定が無いので、`RZ/T2N` のような型番は `white-space: nowrap` で囲む
- 本文に `line-height: 1.2` 以下を使わない（1.11〜1.30 は見出し専用）

---

## 8. Responsive Behavior

### Breakpoints

| 宣言 | 件数 | 用途 |
|------|---|---|
| **`min-width: 1024px`** | **59** | デスクトップ（主役） |
| **`min-width: 680px`** | **47** | タブレット以上 |
| `min-width: 1200px` | 14 | ワイド |
| `min-width: 870px` | 13 | — |
| `min-width: 1430px` | 9 | 最大幅 |
| `width < 680px` | 12 | モバイル |
| `(hover: none) and (pointer: coarse)` | 5 | タッチ端末 |

**モバイルファースト（`min-width` 主体）**。`width < 680px` という CSS Media Queries Level 4 の範囲構文も混在する。

### ルートは動かない

- `html` **16px** / `body` **16px** / `line-height` **24px** は **1920〜320px の 25 幅すべてで 1px も動かない**
- 変わるのは見出しだけで、**崖は 992 / 991px の 1 箇所**:

| 幅 | h1 | h2 |
|---|---|---|
| ≥992px | **44px** | **38px** |
| ≤991px | **32px**（0.73 倍） | **26px**（0.68 倍） |

- セクション余白は `64px`（既定）→ `80px`（デスクトップ）

### タッチターゲット

- CTA は `padding: 8px 24px` ＋ `line-height: 24px` ＝ 高さ 42px。**44px をわずかに割る**ので、新規実装では `padding: 10px 24px` にする

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #2a289d
Header Deep:   #1c1b6e
Badge Orange:  #dd5c1b
Heading Color: #1c1c1c
Body Color:    #706f6f
Background:    #ffffff
Surface:       #f6f6fb / #e5f0fb / #e7effd
Root:          html { font-size: 16px }   /* 全幅固定 */
Font (実サイト): "DM Sans", "DM Sans Fallback", Arial, sans-serif
Font (推奨):   "DM Sans", "DM Sans Fallback", "Noto Sans JP",
               "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
               "Yu Gothic Medium", メイリオ, Arial, sans-serif
Body Size:     16px / Line Height 1.50
UI Size:       14px / weight 500 / Line Height 1.29
Weights:       400 / 500 / 600 / 700
Letter Spacing: normal（実サイト）／和文なら 0.02〜0.04em を足す
Radius:        4px バッジ / 20px カード / 40px CTA / 100% アイコン
Container:     1403px / Section Spacing 80px
```

### プロンプト例

```
ルネサスのデザインシステムに従って、製品カードの 3 カラムグリッドを作成してください。
- html に font-size: 16px を敷く（流体にしない）
- font-family は "DM Sans", "DM Sans Fallback", "Noto Sans JP",
  "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "Yu Gothic Medium", Arial, sans-serif
  （実サイトは和文を省いているが、日本語ページなので必ず足す）
- コンテナ: max-width 1403px / セクション間 80px / 見出しと本文の間 40px
- カード: border-radius 20px / box-shadow rgba(13,13,14,0.15) 0 0 10px 0 / gap 45px
- カード見出し（型番）: 20px / weight 500 / line-height 1.3 / color #1c1c1c
  型番は white-space: nowrap で折り返さない
- 本文: 16px / weight 400 / line-height 1.5 / color #706f6f / letter-spacing 0.02em
- NEW バッジ: 背景 #dd5c1b / 文字 #ffffff / 12px / weight 700 / border-radius 4px
- CTA: 背景 #2a289d / 文字 #ffffff / 16px / weight 500 / border-radius 40px
       / border 1px solid transparent / padding 10px 24px
- 992px 以下で見出しを 44px → 32px、38px → 26px に落とす
```
