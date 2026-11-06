# DESIGN.md — 川崎汽船（"K" LINE / Kawasaki Kisen Kaisha）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-06 / 対象: `https://www.kline.co.jp/ja/index.html`, `/ja/corporate.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に赤 1 色。角丸を使わず、灰の面と罫線で区切る。**本文は游ゴシック Medium で、Web フォントを和文に 1 本も読み込まない**
- **密度**: 中。`line-height: 1.75` が可視 211 / 133 要素を占め、全体がゆったり組まれる
- **キーワード**: "K" LINE レッド、游ゴシック Medium、ルート 17px、Web フォント非依存、1180px

**このサイトの核心は4つある。**

1. **`html { font-size: 17px }`。** 6 幅（1920 / 1440 / 1200 / 1024 / 834 / 768 / 767 / 375px）すべてで **17px から 1px も動かない**。`body { font-size: inherit }` でそのまま降り、`body > * { font-size: 1rem }` が受ける。**16px でも 10px でも 62.5% でもない**ので、`rem` の px 換算を間違えると全体がずれる（`1rem` = **17px**、`calc(1rem - 2px)` = 15px）
2. **和文は Web フォントを 1 本も読み込まない。** `@font-face` は `YuGothicM` の **1 件だけ**で、中身は `src: local("Yu Gothic Medium")` ＝ **OS 同梱書体の別名**。フォントファイルの要求は全ページで **1 件**（欧文の Raleway のみ）
3. **その別名をスタックの先頭に置いている。** `YuGothicM, "游ゴシック Medium", YuGothic, "Yu Gothic", …` の順で、**Medium が Regular より前**。Windows の游ゴシック細すぎ問題を、`@font-face` 1 行 ＋ 並び順だけで解いている（可視 251 / 147 要素＝実質すべて）
4. **ヒーローの大見出しは JPG に焼き込んである。** 「海をつなぐ。信頼でつなぐ、ライフライン。」は `mv_pc.jpg`（**実寸 6000×2813px** を 1440×675px で表示）で、DOM にその文字は 1 つも無い。**しかも `alt=""`**（同じスライダーの他のカットには日本語の `alt` が入っているので、1 枚目だけ抜けている）

**`font-feature-settings` は 2 ページとも 0 要素。** ただし游ゴシック Medium は `palt` を**持っている**（実測 `normal` 516.41px → `"palt"` 422.48px、**−18.2%**）ので、「効かない」のではなく「**効くのに使っていない**」。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **"K" LINE Red** | **`#de012d`** | **可視 117 要素**（面・文字・罫線の合計）。`PICKUP` の帯、`MORE` ボタン、見出しのラベル、アクティブなパンくず |
| Red（取りこぼし） | `#dc012d` | **可視 1 要素のみ**。`#de012d` と RGB で 2 違い。**新規実装では使わない** |
| **Black（面）** | **`#000000`** | 言語切替 `JAPANESE` / `ENGLISH` のタブ面。文字色としても可視 112 / 80 要素 |

> **赤はブランド 1 色。** `#dc012d` は 1 箇所だけの取りこぼしで、意図した 2 色ではない（カネカのように「青い帯に別の青いボタン」を重ねる設計とは違う）。**`#de012d` に統一してよい。**

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 112 / 80 要素**。**純黒を使う**
- **Text on Dark** (`#ffffff`): 赤面・黒面の上（可視 94 / 57 要素）
- **Text Muted** (`#666666`): ニュースの日付（可視 15 要素）
- **Text Disabled** (`#cccccc`): フッターの補助リンク（可視 8 要素）
- **Surface Gray** (`#f1f1f1`): パンくず・`BACK` の面。**このサイトで最も多い面**（可視 25 要素）
- **Surface Light** (`#eeeeee`): `もっと見る` の面（可視 6 / 1 要素）
- **Surface Lighter** (`#f3f3f3`): 下層のカード面
- **Scrim White** (`rgba(255,255,255,.4)`): 事業メニューの面（**可視 26 要素**。写真の上に白を 40% で敷く）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`。`html` は `transparent`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定**: **游ゴシック Medium**（OS 同梱）。Web フォントではない
- **`@font-face` は 1 件だけ**で、`url()` を持たない:

```css
@font-face {
  font-family: YuGothicM;
  src: local("Yu Gothic Medium");
}
```

- **macOS では `document.fonts` の status が `error`**（その名前のフォントが無いため）。**これは壊れているのではなく、Windows でだけ当たる正常な状態**
- 明朝体は使っていない

### 3.2 欧文フォント

- **Raleway**（Google Fonts / `wght@400;700;900`）: `PICKUP` `NEWS` `MORE` などの英字ラベル専用（**可視 8 / 1 要素**）。`400` と `700` が `loaded`、`900` は `unloaded`
- **Heebo** / **Montserrat 800** / **FontAwesome**: 宣言はあるが **可視 0 要素**（下層で Heebo が 1 本 `loaded` するが描画には使われていない）

### 3.3 font-family 指定

```css
body {
  font-family: YuGothicM, "游ゴシック Medium", YuGothic, "Yu Gothic",
               -apple-system, BlinkMacSystemFont, "Helvetica Neue",
               "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic",
               "メイリオ", Meiryo, sans-serif;
  font-size: inherit;   /* html の 17px がそのまま降りる */
}
body > * { font-size: 1rem; }   /* = 17px */
```

```css
/* 英字ラベルだけ */
font-family: Raleway, sans-serif;
```

> **並び順が設計の本体。** `YuGothicM`（別名）→ `"游ゴシック Medium"` → `YuGothic` → `"Yu Gothic"` の順で、**Medium を Regular より前に置く**。これで macOS は 3〜4 番目の Regular、Windows は 1〜2 番目の Medium に当たる。
>
> **別名を後ろに置くと一生使われない。** 同じ別名方式でも `… 游ゴシック, YuGothic, YuGothicM, …` のように後ろに置くと、Windows で手前の `游ゴシック`（Regular）に当たって細く出る。**順番を入れ替えないこと。**

### 3.4 文字サイズ・ウェイト階層

| 用途 | サイズ | ウェイト | 実測 |
|------|--------|----------|------|
| **セクション見出し（英字）** | **46px** | 700 | `NEWS`。Raleway |
| 下層の大見出し | 36px | 700 | `企業情報`（1 要素） |
| セクション見出し（小） | 26px | 700 | `PICKUP` |
| 事業メニュー | 20px | 400 | `燃料戦略事業` ほか 31 要素 |
| 中見出し | 18px | 700 | 下層 16 要素 |
| **ルート／本文** | **17px** | 400 | `1rem`。トップ 35 要素 |
| ニュース見出し | 16px | 700 | トップ 34 要素 |
| **メニュー（大）** | **15px** | 400 | **トップ・下層とも 56 要素で最多** |
| **メニュー（小）** | **14px** | 400 | トップ 49 / 下層 51 要素 |
| パンくず・注記 | 13px | 400 | |
| ラベル | 12px / 10px | 700 | 言語切替は 10px |

- **ウェイトは 400 と 700 の 2 段だけ**（トップ 131 : 128、下層 67 : 81）。**500 も 600 も 1 要素も無い**
- 游ゴシック Medium は実体が Medium 1 本なので、**700 はブラウザの合成太字**になる

### 3.5 行間・字間

| 用途 | line-height | letter-spacing | 実測 |
|------|-------------|----------------|------|
| **body（既定）** | **1.75**（= 29.75px） | `normal` | **可視 211 / 133 要素**。圧倒的多数 |
| メニュー（15px） | 1.75 | **0.375px（= 0.025em）** | 50 要素 |
| メニュー（14px） | 1.75 | **0.35px（= 0.025em）** | 49 要素 |
| フッター（13px） | 1.75 | 0.65px（= 0.05em） | 7 要素 |
| ナビ（15px） | 1.25 | 0.75px（= 0.05em） | 6 要素 |
| 下層の見出し（18px） | 1.25 | 0.5px（= 0.028em） | |
| 英字ラベル | 1.3 | 2.3px（`NEWS`） / 1.3px（`PICKUP`） | |
| 長文 | 1.8 | — | 2 要素 |

- **`letter-spacing` は各要素が `em` を持つ型。** `0.375px` と `0.35px` が同数（50 / 49 要素）並ぶのは、**同じ 0.025em が 15px と 14px に当たっている**から。**継承ではないので、px をそのまま移植しない**
- **見出し（h2 / h3）は `letter-spacing: normal`。** 字間を当てるのはメニューとフッターだけ

### 3.6 禁則処理・改行ルール

- `word-break` は **`normal`（既定）/ `break-word` / `keep-all`** を使い分けている
- `word-break: break-all` も `auto-phrase` も使っていない
- `line-height: 1.75` が全体に降りるので、改行してもリズムが崩れない

### 3.7 OpenType 機能

- **実測 0 要素。** ただし **游ゴシック Medium は `palt` を持っている**
- 同一ページ・同一文字列（40px・13 文字）で実測: **`normal` 516.41px → `"palt"` 422.48px（−18.2%）/ `"halt"` 436.41px（−15.5%）**
- **つまり「足しても効かない」のではなく「効くのに使っていない」。** 後から `palt` を足すと、既存ページと並べたときに**明らかに別物になる**。既存に合わせるなら足さない

### 3.8 縦書き

- **2 ページとも 0 要素。** 縦組みは使っていない

---

## 4. Component Stylings

### Buttons

**`MORE`（主 CTA）**

```css
background-color: #de012d;
color: #ffffff;
font-family: Raleway, sans-serif;
font-size: 16px;
font-weight: 700;
line-height: 28px;        /* 1.75 */
letter-spacing: normal;
padding: 10px 30px;
border-radius: 0;
border: 0;
box-shadow: none;
```

**言語切替タブ（`JAPANESE` / `ENGLISH`）**

```css
background-color: #000000;
color: #ffffff;
font-size: 10px;
font-weight: 700;
line-height: 17.5px;      /* 1.75 */
letter-spacing: 0.5px;    /* 0.05em */
padding: 0 5px 40px;
border-radius: 0;
```

**`もっと見る`（副 CTA）**

```css
background-color: #eeeeee;
color: #000000;
border-radius: 0;
```

> **角丸はほぼ使わない。** 実測の `border-radius` は下層の `JA/EN` トグル（`50px`）が **1 要素だけ**。それ以外は 0。

### Cards

- **枠線と灰の面で区切る。** 事業メニューは写真の上に `rgba(255,255,255,.4)` を敷き、その上に 20px の文字
- 影は下層カードの `rgba(33,59,119,.4) 0 0 4px 0` が **2 要素だけ**（→ 6 章）

---

## 5. Layout Principles

### Container

| 用途 | 幅 | 実測 |
|------|----|----|
| **外枠** | **1220px** | 8 要素 |
| **本文コンテナ** | **1180px** | 5 要素。CSS 変数 `--width-content-area` の既定値 |
| 2 カラムの主側 | `calc(1180px * 0.76)` | `#wrapper-3` |
| サイド | 380px / 670px / 936px | |
| 中央寄せ | `calc(50% + 590px)` | 1180 ÷ 2 = 590 |

### CSS Custom Properties（`:root` ではなく `body` に宣言）

```css
body {
  --width-content-base:   1.00;      /* 幅の倍率 */
  --width-content-area:   1180px;    /* コンテンツ幅 */
  --width-content-margin: 10px;      /* カラム間の余白 */
  --width-parts-margin:   10px;
}
```

```css
/* カラム数に応じて幅を計算する */
.multiColumn2 > .column1 {
  width: calc((100% * var(--width-content-base) - 2 * var(--width-content-margin)) / 2);
  max-width: calc((1180px - 2 * 10px) / 2);
}
```

> **変数は `:root` ではなく `body` に書かれている。** `getComputedStyle(document.documentElement)` では 0 個に見えるので、**「このサイトにはトークンが無い」と読まない**。
>
> **ブレークポイントごとに `--width-content-base` を `1.00 → 0.95 → 0.90` と段階的に下げ、`--width-content-area` を `calc(1180px * 0.95)` のように縮める。** モバイルでは `--width-content-area: 500px` / `--width-content-margin: 6px` に切り替わる。幅の設計を 3 つの変数だけで回しているのがこのサイトの要。
>
> `--accent-color` / `--highlight-color` / `--button-color` / `--button-hover-color` / `--input-border-style` は **marsflag（外部の検索ウィジェット）由来**。自社のトークンではない。

### Spacing

- `gap` は 15px（4 件）/ 12px（1 件）のみ。余白は主に `margin` で組む

---

## 6. Depth & Elevation

- **影は 1 種類だけ、しかも 2 要素。** `box-shadow: rgba(33, 59, 119, 0.4) 0 0 4px 0`（トップの `ドライバルク船事業` `燃料戦略事業`）
- **色は黒ではなく紺（`#213b77` の 40%）**、offset は 0 / 0、ぼかし 4px、広がり 0。**黒に丸めない**
- **`border-radius` は実質 0。** 奥行きは面色（`#f1f1f1` / `#eeeeee` / `#f3f3f3`）の差で作る

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 17px }` を書く。** `1rem` = 17px として全サイズを計算する
- `font-family` は `YuGothicM` → `"游ゴシック Medium"` → `YuGothic` → `"Yu Gothic"` の順。**Medium を Regular より前に置く**
- `@font-face { font-family: YuGothicM; src: local("Yu Gothic Medium") }` を 1 行だけ書く（`url()` は書かない）
- `line-height` は `1.75` を `body` に 1 回だけ書いて継承させる
- 字間は `0.025em` をメニューに、`0.05em` をフッター・ナビに。**見出しは `normal`**
- `font-weight` は 400 と 700 の 2 段だけ
- 赤は `#de012d` 1 色。面にも文字にも罫線にも同じ値を使う
- コンテンツ幅は `--width-content-area`（既定 1180px）を変数で持ち、ブレークポイントで倍率を下げる
- 英字ラベルだけ `Raleway, sans-serif`

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** 游ゴシック Medium は `palt` が**効く**（−18.2%）ので、足すと既存ページと別物になる
- **`YuGothicM` を `src: local()` のまま `unloaded` / `error` でも直そうとしない。** macOS で `error` になるのが正常（Windows でだけ当たる）
- **別名をスタックの後ろに置かない。** Windows で游ゴシック Regular に当たって細くなる
- `font-weight` に 500 / 600 を使わない（2 ページとも 0 要素）
- **`border-radius` を足さない**（実測 1 要素のみ）
- `#dc012d` を使わない（1 箇所の取りこぼし。`#de012d` に統一する）
- **`1rem` を 16px として計算しない**（このサイトは 17px）
- ヒーローの大見出しを真似るとき、**画像に文字を焼き込むなら `alt` を必ず書く**（実サイトは `alt=""` で読み上げに何も残らない）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | ≤ 767px | **CSS 全文で最多**（97 件）。主たる境目 |
| **Desktop** | ≥ 768px | `print, screen and (min-width: 768px)`（65〜66 件）。**印刷と同じ扱い** |
| Small | ≤ 576px | 7 件 |
| Print | `print` | 7 件。印刷スタイルを別に持つ |

- コンテンツ幅はブレークポイントごとに `--width-content-base` を `1.00 → 0.95 → 0.90` と下げる

### フォントサイズの調整

- **`html` も `body` も 8 幅すべてで 17px 固定。** 流体も `clamp()` も使っていない
- CSS 内に `html { font-size: 14px }` と **コメントアウトされた `font-size: 14px`** が残っており、**17px はあとから上書きされた値**
- サイズの可変は `calc(1rem - 2px)` = 15px のような差分指定のみ

### タッチターゲット

- `MORE` は `padding: 10px 30px` ＋ 16px / `line-height: 28px` で 48px 高 — 44px を満たす
- 言語切替（10px / `line-height: 17.5px`）とフッターの 13px リンクは**モバイルで高さを確保する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
"K" LINE Red:  #de012d
Text Color:    #000000
Text Muted:    #666666
Text Disabled: #cccccc
Surface Gray:  #f1f1f1
Surface Light: #eeeeee
Scrim:         rgba(255, 255, 255, 0.4)
Background:    #ffffff
Font (JP): YuGothicM, "游ゴシック Medium", YuGothic, "Yu Gothic", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic", "メイリオ", Meiryo, sans-serif
Font (EN): Raleway, sans-serif
@font-face: YuGothicM / src: local("Yu Gothic Medium")
Root Size: 17px（1rem = 17px）
Weights: 400 / 700（2段のみ）
Line Height: 1.75（body・継承） / 1.25（ナビ） / 1.3（英字ラベル）
Letter Spacing: normal（見出し） / 0.025em（メニュー） / 0.05em（フッター）
Border Radius: 0
Box Shadow: rgba(33, 59, 119, 0.4) 0 0 4px 0（2 要素のみ）
Container: 1220px（外枠） / 1180px（本文）
```

### プロンプト例

```
川崎汽船のデザインシステムに従って、事業紹介ページを作成してください。
- html に font-size: 17px を書き、1rem = 17px として全サイズを計算する
- @font-face { font-family: YuGothicM; src: local("Yu Gothic Medium") } を 1 行だけ書く（url() は書かない）
- font-family は YuGothicM, "游ゴシック Medium", YuGothic, "Yu Gothic", … の順（Medium を Regular より前に）
- Web フォントは英字ラベル用の Raleway だけ。和文は読み込まない
- body に line-height: 1.75 を 1 回だけ書いて継承させる
- font-weight は 400 と 700 のみ（500 / 600 は使わない）
- letter-spacing は見出し normal、メニュー 0.025em、フッター 0.05em
- 主 CTA は #de012d のベタ塗り・padding 10px 30px / Raleway 16px weight 700 / border-radius 0
- border-radius は全部 0、影は使わない（必要なら rgba(33,59,119,.4) 0 0 4px 0 を 1 種だけ）
- コンテンツ幅は body に --width-content-area: 1180px を宣言し、カラムは calc() で割る
- font-feature-settings は書かない（游ゴシック Medium は palt が効いてしまい、既存と別物になる）
- ブレークポイントは 767 / 768px
```
