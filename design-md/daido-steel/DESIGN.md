# DESIGN.md — 大同特殊鋼（Daido Steel）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-22 / 対象: `https://www.daido.co.jp/`, `/about/index.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **ヒーローの 56px だけを極端に字空けし、それ以外は `letter-spacing: normal` で詰めも空けもしない。** 角丸は `160px` / `140px` / `280px` の**完全なピル**を多用し、面は `#eaeaea` / `#f2f2f2` の淡いグレー。素材メーカーの情報量を、ピル型の導線で整理している
- **密度**: 高い。製品カテゴリ 18 種・IR・技術情報を 1 ページに詰める。本文の行送りは **1.88**（16px / 30px）とゆったり
- **キーワード**: ピル型、`palt` 1025 要素、游ゴシック、`word-break: break-all`、文字サイズ切替

**このサイトの核心は4つある。**

1. **ヒーローのコピーだけが `letter-spacing: 15.68px`（56px × 0.28em）。** 「日々になる、特殊な鋼。」は**実テキスト**（画像ではない）で、`font-size: 5.6rem` / `line-height: 87.36px`（1.56）/ `font-weight: 500`。サイト全体の `letter-spacing` は **`normal` が可視 103 要素中 103 要素**で、字間を当てている要素は 3 種しかない
2. **`font-feature-settings: "palt"` を 1025 要素に配り、実際に効いている。** 実スタック・56px で実測すると見出しが **-13.08%**、約物だけの文字列で **-23.58%** 詰まる（→ 3.7）
3. **和文 Web フォントを 886 件の `@font-face` で宣言しているのに、1 バイトも読み込まれていない。** フォント要求は **Poppins の 2 件だけ**。`Noto Sans JP` / `Noto Serif JP` / `Roboto` の `@font-face` は CSS に全部入っているが、**可視要素のスタックに `"Noto Sans JP"` が 1 件も出てこない**
4. **実際に和文を組んでいるのは游ゴシック（OS フォント）で、しかも `font-weight: 500` が効いていない。** スタックは `Poppins, "Yu Gothic", 游ゴシック, YuGothic, 游ゴシック体, "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif` で、**`"游ゴシック Medium"` / `"Yu Gothic Medium"` が 1 つも入っていない**（→ 3.3）

**CSS Custom Properties は 2 ページとも 0 個**（`total: 0` / `html` 側も `body` 側も 0）。色もサイズも CSS に直書き。`styleSheetAccess.blocked` が 3 枚あるが、読めなかったのは Google Fonts の 3 本だけで変数は含まれない。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Daido Red** | **`#dc0012`** | **可視 7 要素の文字色**（`PRODUCT SEARCH` `CONTENTS` `ニュース` の見出し）＋ **2 要素の塗り面**（`お見積もり・お問い合わせ`）。ロゴの星と同じ赤 |
| **CMP Red** | `#e50111` | **クッキーバナーの `クッキー設定` / `OK` 専用**（各ページ 2 要素）。`#dc0012` とは別の赤で、**サイト本体では使われていない** |
| **Daido Blue** | **`#0192be`** | **可視 18 要素の文字色**（`検 索` `Prev` `Next` `TOP`）＋ **1 要素の塗り面**（`RECRUIT` ボタン）。リンク・操作系の色 |

> **赤が 2 つあるのは CMP の混入。** `#e50111` は Cookie バナー（STRIGHT / IIJ）由来なので、**ブランド色として採用しない。**

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・ヒーローコピー（可視 49 要素）。**純黒を使う**
- **Text Nav** (`#323232`): グローバルナビ（可視 6 要素）＋ナビの面（1 要素）
- **Text Muted** (`#848484`): `フリーワード検索` のプレースホルダ、日付、言語切替の非選択（可視 14 要素）
- **Text on Dark** (`#ffffff`): 赤・青・グレーの面の上（可視 19 要素）
- **Surface Gray** (`#eaeaea`): **このサイトで最も多い面（可視 69 要素）**。製品検索ブロック、カテゴリのピル、タグのピル
- **Surface Light** (`#f2f2f2`): カテゴリカード（可視 16 要素）
- **Surface Mid** (`#6e6d6d`): スライダーのページネーション（可視 15 要素）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **実際に描画されているのは游ゴシック（OS フォント）。** CDP `CSS.getPlatformFontsForNode` で測ると、ヒーローのコピーも本文もフッターのリンクも**すべて `YuGothic`** と返る
- **`Noto Sans JP` / `Noto Serif JP` は宣言だけ。** `document.fonts` には Noto Sans JP 400/500/700/900 と Noto Serif JP 400/600/700 が各 124 サブセット載っているが、**全部 `unloaded`**。フォント要求は **Poppins の 2 件だけ**で、和文は 1 バイトも落ちてこない
  - 原因は**呼び出し側**。CSS には `font-family: "Noto Sans JP", sans-serif` / `"Noto Serif JP", serif` の宣言が存在するが、`distributions.fontFamily` に **1 件も出てこない**（可視要素に当たっていない）
  - 中国語用に `"Noto Sans SC"` / `"Noto Serif SC"` も宣言されている（多言語サイト。JP / EN / CN の 3 言語）

### 3.2 欧文フォント

- **Poppins**（Google Fonts）。`@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap")`
  - **`loaded` は 400 と 500 の各 1 ファイル**。300 は `unloaded`
  - `PICK UP NEWS` `PRODUCT SEARCH` `CONTENTS` `RECRUIT` などの欧文見出しが Poppins Medium で描画される（CDP 実測）
- **Roboto も `@font-face` が 9 ウェイト分書かれているが、`unloaded`**。CSS に `font-family: Roboto, sans-serif` の宣言はあるが可視要素に出てこない

### 3.3 font-family 指定

```css
/* 実サイトの主スタック（可視 82 要素） */
font-family: Poppins, "Yu Gothic", 游ゴシック, YuGothic, 游ゴシック体,
             "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif;
```

> **このスタックには `"游ゴシック Medium"` / `"Yu Gothic Medium"` が 1 つも入っていない。**
> それでいて **`font-weight: 500` を可視 77 要素（最多）に当てている**。
> - **macOS**: 「游ゴシック体」ファミリーは Medium / Bold の 2 本なので、weight 500 は Medium に当たる
> - **Windows**: 「Yu Gothic」ファミリーは Light / Regular / Bold なので、**weight 500 は Regular に落ちる**
>
> **結果として macOS と Windows で太さが揃わない。** 揃えたいなら Medium を Regular より前に置く：
> ```css
> font-family: Poppins, 游ゴシック体, YuGothic,
>              "游ゴシック Medium", "Yu Gothic Medium",   /* ← これを足す */
>              游ゴシック, "Yu Gothic",
>              "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif;
> ```
>
> **`"ヒラギノ角ゴ Pro W3"` は ProN ではなく Pro**（JIS90 字形）。実サイトのまま。新規実装では `ProN` を推奨。

その他の宣言：`Poppins, sans-serif`（可視 14 要素・欧文専用）、`Arial`（15 要素）、`sans-serif`（5 要素）。

### 3.4 文字サイズ・ウェイト階層

`html { font-size: 62.5% }` = **10px**（19 幅すべて固定）。`body` は **1200px 以上で 16px、800px 以下で 15px**。CSS は `rem` で書く（`1.6rem` = 16px）。

| 役割 | Size | Weight | Line Height | Letter Spacing | 実測 |
|------|------|--------|-------------|----------------|------|
| **ヒーローコピー** | **56px**（`5.6rem`） | **500** | **87.36px（1.56）** | **15.68px（0.28em）** | `日々になる、特殊な鋼。` **実テキスト**。800px 以下で **32px / 8.96px**（同じ 0.28em） |
| 下層 h1 | **38px** | 500 | 1.30 | **3.8px（0.1em）** | `企業情報` |
| セクション見出し（和） | 34px | 500 | 1.58 | normal | `特殊だけど身近。` |
| セクション見出し（欧） | 26px | **600** | 1.30 | — | `ニュース` ほか。**weight 600 はここだけ（3 要素）** |
| 中見出し | 20px | 500 | 1.30 | normal | 下層の `企業情報` `調達情報` |
| 小見出し | **18px** | 500 | **1.88** | normal | 下層の最多サイズ（19 要素） |
| 本文 | **16px** | 400 / 500 | **1.88（30px）** | normal | 可視 57 要素（トップ最多） |
| ナビ | 15px | 500 | **1.00** | normal | グローバルナビ |
| UI・ニュース | 14px | 500 | 1.30 | normal | 言語切替 `JP` `EN` `CN` |
| 補助 | 12〜13px | 400〜700 | 1.30 | normal | プレースホルダ、注記 |
| CTA（赤） | 16px | **700** | 1.50 | **1.4px（0.088em）** | `お見積もり・お問い合わせ` |

> **weight は 400 / 500 / 600 / 700 の 4 段。** 500 が可視 77 要素（トップ）/ 57 要素（下層）で最多＝**既定の太さが 500**。
> ただし上記のとおり **Windows では 500 が Regular に落ちる**ので、実際の見た目は 400 と変わらない（→ 3.3）。

### 3.5 行間・字間

- **`letter-spacing` は `normal` が既定。** 可視 103 要素中 103 要素（トップ）/ 59 要素中 59 要素（下層）が `normal`。字間を当てているのは **3 種だけ**
  - **ヒーロー 56px → `15.68px` = 0.28em**（`em` 宣言が px に解決されている。800px では 32px → 8.96px で**同じ 0.28em**）
  - CTA・欧文見出し 16px → `1.4px`（0.088em）
  - 製品カテゴリ 14px以下 → `0.8px`
  - 下層 h1 38px → `3.8px`（0.1em）
- **`line-height` は 1.00 / 1.30 / 1.50 / 1.56 / 1.80 / 1.88 の 6 段。**
  - **`1.00` が可視 30 要素（トップ）/ 31 要素（下層）** ＝ ナビ・ボタンなど「1 行で収まる UI」
  - **`1.88` が本文**（16px / 30px）。下層では 24 要素で最多
  - `1.56` はヒーローのコピー専用

### 3.6 禁則処理・改行ルール

- **`body { word-break: break-all }`**（実測）。**日本語の禁則処理を無効にして、行末で熟語の途中でも折り返す**
  - これは `auto-phrase`（改行を賢くする）の**反対側**の指定。素材名・型番が長く並ぶ製品サイトで行があふれないようにする狙いだが、**本文の読みやすさは落ちる**
- 改行は `<br>` で手動制御（ヒーローのコピーも 2 行に手で割っている）

### 3.7 OpenType 機能

- **`font-feature-settings: "palt"` を 1025 要素（トップ）/ 243 要素（下層）に当てている。クロス集計は `"palt" @ horizontal-tb` 1025 件のみ**（軸の取り違えは無い）
- **実際に効いている。** 実スタック・56px で実測：

  | テスト文字列 | normal | "palt" | 差 | "halt" | "pwid" |
  |---|---|---|---|---|---|
  | `日々になる、特殊な鋼。` | 616.00px | **535.42px** | **-13.08%** | 560.00px | 599.44px |
  | `「あ」、「い」。（う）・（え）` | 672.00px | **513.53px** | **-23.58%** | 532.00px | 654.64px |
  | `ABC123あいう、。` | 454.78px | **413.41px** | **-9.10%** | 426.78px | 469.41px |

- **「`palt` で詰めた上から 0.28em の字空けを足す」のがヒーローの組み方。** 片方だけ再現すると別物になる

### 3.8 縦書き

- **縦組みは使っていない**（`verticalSamples` が 2 ページとも空）

---

## 4. Component Stylings

### Buttons

| 種類 | 実装 |
|------|------|
| **Primary（赤）** | 背景 `#dc0012` / 文字 `#ffffff` / **`border-radius: 25px`** / `4px solid #f2f2f2` / 16px / **weight 700** / `letter-spacing: 1.4px` |
| **Recruit（青）** | 背景 `#0192be` / 文字 `#ffffff` / `border-radius: 160px` / 16px / weight 700 |
| **Pill Outline（赤枠）** | 背景 `#eaeaea` / 文字 `#dc0012` / **`border-radius: 160px`** / `1px solid #dc0012` / 16px / weight 700 / line-height **1.00** |
| **Pill（タグ）** | 背景 `#eaeaea` / 文字 `#0192be` / **`border-radius: 140px`** / `1px solid #eaeaea` / 14px / weight 500 |
| **Pill（カテゴリ）** | 背景 `#f2f2f2` / **`border-radius: 25px`** / 16px / weight 700 |
| **Pagination** | 背景 `#6e6d6d` / 文字 `#ffffff` / `border-radius: 160px` / 16px / weight 700 / `letter-spacing: 0.8px` |

> **角丸は実質すべて「完全なピル」。** `160px`（22 要素）/ `140px`（7 要素）/ `280px`（下層 2 要素）/ `130px`（1 要素）は
> **どれも要素の高さより大きい値＝半円**。`25px`（8 要素）と `40px`（3 要素）だけが本来の角丸。
> **ピルを作るのに `9999px` ではなく `140px`〜`280px` という半端な値を使う**のがこのサイトの実装の実態。

### Cards

- 製品カテゴリカードは背景 `#f2f2f2` / `border-radius: 25px` / 影なし
- ニュース一覧は枠も影も無く、日付（`#848484`）とタイトルを並べるだけ

---

## 5. Layout Principles

### Container

- **`1080px`**（トップ 4 要素 / 下層 2 要素）。ほかに `830px` / `800px` / `354px` / `350px` / `calc(100% - 150px)`

### Spacing Scale

- `gap` は `0px 10px` / `8px` / `0px 50px` / `10px` / `0px 20px` / `0px 40px` / `0px 25px` と**ばらばら**。共通のスケールは無い

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・ボタン・ピルはすべてフラット** |
| 1 | `rgba(0, 0, 0, 0.5) 0 5px 15px 0` | **クッキーバナーのみ（2 ページとも 1 要素）。CMP 由来なのでサイトの語彙ではない** |

> **実質、影を使わないサイト。** 階層は面色（`#eaeaea` / `#f2f2f2`）とピルの形で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 62.5% }`（10px）を前提に `rem` で書く**（`1.6rem` = 16px）
- **`letter-spacing: normal` を既定にする。** 字間を当てるのはヒーロー（0.28em）と CTA（0.088em）だけ
- **ヒーローのコピーは 56px / weight 500 / `line-height: 1.56` / `letter-spacing: 0.28em` / `palt`**。800px 以下で 32px に落とし、字間は 0.28em のまま保つ
- **`font-feature-settings: "palt"` を `body` に配る**（実測 1025 要素・-13.1%）
- **本文は 16px / `line-height: 1.88`、ナビ・ボタンは `line-height: 1.00`**
- **角丸はピル（`160px` / `140px`）を既定にする。** 本来の角丸は `25px` のみ
- 赤は `#dc0012`、青は `#0192be`、面は `#eaeaea` / `#f2f2f2`
- **游ゴシックのスタックに `"游ゴシック Medium"` / `"Yu Gothic Medium"` を足す**（実サイトは入っていないが、入れないと Windows で 500 が Regular に落ちる）
- 文字サイズ拡大に対応するなら、**`html.is-text-large { font-size: 70% }`（11.2px）** のようにルート側を動かす（実サイトの方式）

### Don't（禁止）

- **`"Noto Sans JP"` を前提に組まない。** 886 件の `@font-face` が宣言されているのに**フォント要求は Poppins の 2 件だけ**で、和文は 1 バイトも読み込まれない
- **`font-weight: 500` を「中くらいの太さ」として信用しない。** Medium を書かないスタックでは Windows で Regular に落ちる（→ 3.3）
- **`letter-spacing` を本文に足さない**（可視要素のほぼ全部が `normal`）
- **`word-break: break-all` を真似する前に、本文の読みやすさを確認する。** 実サイトはこれで熟語が行末で割れる
- **`#e50111` をブランド色として使わない**（クッキーバナー由来）
- **`box-shadow` を足さない**（唯一の影は CMP のもの）
- **CSS 変数でトークンを組まない**（実サイトは 2 ページとも 0 個）
- **角丸に `8px` や `4px` を使わない。** このサイトの語彙はピルと `25px` だけ
- **`line-height` を全部 1.5 で揃えない。** UI は 1.00、本文は 1.88 と落差をつける

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile / Tablet | ≤ 800px | **主ブレークポイント**（`screen and (max-width: 800px)` が CSS 全文で **608 件**） |

- **崖は 801 / 800px の 1 箇所。** `body` が **16px → 15px**、ヒーローが **56px → 32px**（0.571 倍）、`h2` が 14px → 13px に落ちる
- **`html` は 1920px から 374px まで 10px のまま動かない**（19 幅で実測）。流体スケーリングは無い
- **文字サイズ切替は `html` 側を動かす方式。** CSS に `html.is-text-large { font-size: 70% }`（= **11.2px**）があり、`html` の `font-size` を 62.5% → 70% に差し替えると `rem` で書かれた全要素が 1.12 倍になる

### フォントサイズの調整

| 要素 | ≥801px | ≤800px |
|---|---|---|
| `html` | 10px | 10px |
| `body` | **16px** | **15px** |
| ヒーロー | **56px / 15.68px** | **32px / 8.96px** |
| `h2` | 14px / 1.4px | 13px / 1.3px |

### タッチターゲット

- 赤の CTA（16px / weight 700 / `4px` の枠）とピル型のボタンは 44px を満たす
- **言語切替（14px）とページネーション（16px / ピル）は小さいので、モバイルでは 44px を確保すること**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Daido Red:     #dc0012
Daido Blue:    #0192be
Text Primary:  #000000
Text Nav:      #323232
Text Muted:    #848484
Surface Gray:  #eaeaea（最多の面）
Surface Light: #f2f2f2
Background:    #ffffff
Font (JP): Poppins, 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
           游ゴシック, "Yu Gothic", "ヒラギノ角ゴ ProN W3", メイリオ, sans-serif
Font (EN): Poppins, sans-serif   ← weight 400 / 500 のみ loaded
Root:      html 10px (62.5%) 全幅固定 / body 16px（≤800px で 15px）
Hero:      56px / weight 500 / line-height 1.56 / letter-spacing 0.28em / palt
Body:      16px / line-height 1.88 / letter-spacing normal
UI:        15px / weight 500 / line-height 1.00
palt:      body に配る（実測 1025 要素・見出しで -13.1%）
word-break: break-all
Border Radius: 160px / 140px（ピル） / 25px（カード） / 40px
Box Shadow: none
Container: 1080px
Breakpoint: 800px（1 箇所のみ）
```

### プロンプト例

```
大同特殊鋼のデザインシステムに従って、製品カテゴリページを作成してください。
- html は font-size: 62.5%（10px）で全幅固定。CSS は rem で書く（1.6rem = 16px）
- body は 16px、800px 以下で 15px。word-break: break-all
- font-family は Poppins を先頭に、游ゴシック体 / YuGothic / "游ゴシック Medium" /
  "Yu Gothic Medium" / 游ゴシック / "Yu Gothic" / "ヒラギノ角ゴ ProN W3" / メイリオ / sans-serif
  （Medium を Regular より前に置かないと Windows で weight 500 が Regular に落ちる）
- body に font-feature-settings: "palt" を配る
- ヒーローのコピーは 56px / weight 500 / line-height 1.56 / letter-spacing 0.28em
  800px 以下で 32px、字間は 0.28em のまま
- 本文は 16px / line-height 1.88 / letter-spacing normal、色は #000000
- ナビとボタンは line-height 1.00
- CTA は背景 #dc0012 / 文字 #ffffff / border-radius 25px / 4px solid #f2f2f2 /
  16px / weight 700 / letter-spacing 1.4px
- タグとカテゴリは背景 #eaeaea / border-radius 140px〜160px の完全なピル
- box-shadow は使わない。面は #eaeaea と #f2f2f2 の 2 段
- コンテナは 1080px、ブレークポイントは 800px の 1 箇所だけ
```
