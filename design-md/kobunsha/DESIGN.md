# DESIGN.md — 光文社（KOBUNSHA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-16 / 対象: `https://www.kobunsha.com/`, `/business/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **ヒーローが画面の「高さ」に合わせて縮む。** 文字サイズも写真の幅も角丸も内側の余白も、すべて `min(固定値, N vh)` で書かれている。スクロールせずに 1 スライドが必ず収まる設計
- **密度**: 低い。グレーのグラデーションの上に白いカードと写真を浮かべ、余白を大きく取る
- **キーワード**: vh 流体、可変フォント 1 本、完全な丸ボタン、字間ゼロ、グレーのグラデーション

**このサイトの核心は4つある。**

1. **`vw` ではなく `vh` で組む（このコレクション初）。** ヒーローのコピーは **`min(107px, 9.90741vh)`**、写真は **`min(700px, 64.8148vh)`**、角丸は **`min(16px, 1.48148vh)`**、左右の余白は **`min(30px, 2.77778vh)`**。**分母はすべて 1080px**（107/1080 = 9.90741% / 700/1080 = 64.8148% / 16/1080 = 1.48148% / 30/1080 = 2.77778%）＝**設計高 1080px**
2. **和文の字間を一切触らない。** `letter-spacing` の実測最多は **`normal`（トップ 142 要素 / 下層 97 要素）**。字間を当てているのは **欧文見出しの 0.02em だけ**
3. **可変フォント 1 本で全部まかなう。** `Noto Sans JP` を **`font-weight: 100 900`** の可変フォントとして 1 本読み、実使用は **500（169 要素）/ 600（156 要素）**の 2 段。400 は法定表記の 2 要素のみ
4. **ボタンは `border-radius: 1440px`。** 完全な丸。3 種（薄面・濃面・線）しかなく、影は無い

### 計測で判明した「宣言 ≠ 実装」

| 宣言 | 実装 | 扱い |
|---|---|---|
| `.c-headline__ttl-ja { font-family: "Big Caslon", serif }` | **Big Caslon は欧文専用の macOS 同梱書体で、CJK グリフを 1 文字も持たない。** 実測で `"Big Caslon", serif` と `serif` の和文幅が **400px / 400px と完全一致**（欧文は 465.97px / 524.53px と割れるので、書体自体は入っている） | **クラス名が `ttl-ja`＝和文見出し専用なのに、和文には一生当たらない。** 実際は generic `serif` で出る＝**OS ごとに別の明朝**（mac は ヒラギノ明朝／游明朝、Windows は MS P明朝／游明朝）。下の 3.9 節参照 |
| `Noto Sans JP` を `wght 100..900` の可変フォントで読み込み | 実使用は **500 / 600 / 400** の 3 値のみ（うち 400 は 2 要素） | 100〜300・700〜900 は 1 要素も使っていない |
| `pageBackground.resolved = rgb(255,255,255)`（根拠 `body`） | 実際に見えている地は **`.l-bg::before` の `linear-gradient(to right, #ecedef 0%, #d2dae2 100%)`**（1440×900px）＋ `bg-pc.jpg` のテクスチャ | **白ではない。** 下の 2 節参照 |
| `@font-face: slick` | `unloaded`。slick-carousel のアイコン用で、フォント要求 0 件 | 無視してよい |

---

## 2. Color Palette & Roles

### Background（このサイトの地）

```css
/* body は白だが、見えている地はこれ */
.l-bg::before {
  background: linear-gradient(to right, #ecedef 0%, #d2dae2 100%);
}
.l-bg {
  background-image: url("…/assets/img/common/bg-pc.jpg");   /* 紙のテクスチャ */
}
```

- **左から右へ、ほんのり青みが増すグレーのグラデーション。** 全ページ共通で 1440×900px を覆う
- `body` 自体は `#ffffff`。**`pageBackground.resolved` を鵜呑みにすると地色を取り違える**

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Text Primary** | **`#3b3b3b`** | 本文・ナビ（可視 20〜22 要素）。純黒ではない |
| **Text Strong** | **`#292929`** | お知らせの見出し（可視 31 要素）。**面としても最多（25 要素）** |
| **Text Muted** | **`#88929d`** | セクション見出しの和文・日付（可視 33 要素） |
| **Text Muted 2** | **`#727c86`** | 下層の雑誌名リスト（可視 32 要素）。`#88929d` より少し濃い |
| **Surface Light** | **`#efefef`** | ボタンの薄面、タグの面（可視 4〜5 要素） |
| **Surface Veil** | **`rgba(255, 255, 255, 0.6)`** | 見出しブロックの半透明の面（可視 4 要素）。背後のグラデーションを透かす |
| **Line** | **`#707070`** | お知らせの行頭 2px の縦罫（`linear-gradient(to right, #707070 2px, transparent 2px)`・**23 要素**） |
| **Text on Dark** | **`#ffffff`** | ヒーローのコピー、濃面ボタン（可視 36〜41 要素） |
| **Border（下層）** | **`#c4c4c4`** | 法定表記まわり |

> **グレーが 6 段ある（`#292929` / `#3b3b3b` / `#727c86` / `#88929d` / `#c4c4c4` / `#efefef`）。** 彩度のある色が 1 つも無いので、**この 6 段を潰すと階層が消える。**

### 罫線はグラデーションで引く

```css
/* 実サイト: お知らせの各行の頭に立つ 2px の縦線 */
background-image: linear-gradient(to right, #707070 2px, rgba(0,0,0,0) 2px);
```

`border-left` ではなく `linear-gradient` のハードストップで引いている（23 要素）。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Noto Sans JP**。Google Fonts の**可変フォント（`wght@100..900`）を 1 本**。これ以外の和文 Web フォントは無い
- **明朝体**: **Web フォントとしては存在しない。** `"Big Caslon", serif` の指定が和文見出しに当たっているが、実際に描画するのは **generic `serif`**（＝OS 既定の明朝）

### 3.2 欧文フォント

- **Josefin Sans**（Google Fonts / **600 の 1 本だけ**）: ヒーローのコピーとセクションの英語見出し（トップ 34 要素 / 下層 9 要素）
- **Big Caslon**: macOS 同梱の欧文セリフ。`@font-face` は無い。**和文には当たらない**（3.9 節）
- **`"Helvetica Neue", Helvetica, Arial, sans-serif`**: コピーライト行の 1 要素のみ

### 3.3 font-family 指定

```css
/* 本文・ナビ・ボタン（サイトの 9 割） */
font-family: "Noto Sans JP", sans-serif;

/* 英語の大見出し */
font-family: "Josefin Sans", sans-serif;

/* 実サイトは和文見出しにこう書いているが、Big Caslon に CJK は無い */
/* 実サイト: .c-headline__ttl-ja { font-family: "Big Caslon", serif } */
/* 正しくは和文明朝を明示する: */
font-family: "Big Caslon", "Hiragino Mincho ProN", "Yu Mincho", "游明朝", serif;
```

**フォールバックの考え方**:
- 和文は Noto Sans JP 1 本＋ `sans-serif`。**ローカル書体名をチェーンに入れていない**
- **欧文専用書体を先頭に置くなら、その直後に和文の受け皿を書く。** 実サイトは `serif` 1 語しか置いておらず、OS によって明朝が変わる

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Copy | Josefin Sans | **`min(107px, 9.90741vh)`** | 600 | 1.00 | **0.02em** | `Your Passion, Our Inspiration`。**高さ追従**（3.8 節） |
| Section Title (EN) | Josefin Sans | **54px** | 600 | 1.02 | **1.08px**（= 0.02em） | `OUR BUSINESS` `MONTHLY MAGAZINE and…` |
| Section Title (JA) | （`serif` に落ちる） | 20px / 18px | 600 | 1.15 | 0.4px / 0.36px | `わたしたちの企業理念` `お知らせ` |
| Heading（下層） | （`serif` に落ちる） | 26px | 700 | 1.15 | 0.52px | `事業紹介` |
| Lead | Noto Sans JP | 18px | 500 | **3.56** | normal | トップの企業理念本文。**行間が極端に広い** |
| Button | Noto Sans JP | 18px | 500 | 20.7px（1.15） | **normal** | 丸ボタン |
| Body | Noto Sans JP | **16px** | 500 | **1.15** / 下層本文 **2.50** | **normal** | 最多（トップ 56 / 下層 43 要素） |
| Nav | Noto Sans JP | 15px | 600 | 1.38 | normal | グローバルナビ |
| Meta / Tag | Noto Sans JP | 13px | 600 | 1.36 | normal | カテゴリ・日付 |
| Legal | Noto Sans JP | 12px | 400 | 1.82 | normal | ABJ マーク等 |

**weight は 500 と 600 の 2 段。** 可変フォントを `100..900` で読んでいるが、実測は **500: 169 要素 / 600: 156 要素 / 400: 2 要素**。**700 以上は 1 要素も無い**（`© Kobunsha…` の 1 件だけ別スタック）。

### 3.5 行間・字間

- **字間は `normal` が既定。** トップ 142 要素 / 下層 97 要素。**和文に `letter-spacing` を当てない**
- **当てているのは欧文だけで、値は一律 `0.02em`**（107px → 2.14px / 89.1667px → 1.78333px / 54px → 1.08px / 56px → 1.12px / 40px → 0.8px）。**サイズに比例して px が変わる＝各要素が `em` を持っている**
- **行間は用途で大きく振れる**:

| 用途 | ratio | 実測 |
|---|---|---|
| 見出し・ボタン・本文の既定 | **1.15** | トップ 59 / 下層 65 要素（最多） |
| ナビ | 1.38 | 29 要素 |
| カテゴリ | 1.23 / 1.36 | 31 / 9 要素 |
| ヒーローのコピー | **1.00** | 8 要素 |
| **下層の説明文** | **2.50** | 8 要素 |
| **トップの企業理念** | **3.56** | 3 要素 |

> **既定の 1.15 は日本語の本文としては詰まりすぎている。** このサイトは「本文として読ませるブロック」にだけ 2.50 / 3.56 を当てて切り分けている。**新規実装では読み物に 2.50 を明示する。**

### 3.6 禁則処理・改行ルール

- `body { word-break: normal }`（実測）。`auto-phrase` も `break-all` も使っていない
- 改行は HTML 側のタブ文字と `<br>` で手組み（`光文社は、\n\t\t\t読者に寄り添い続け` のような構造が実測で取れる）

### 3.7 OpenType 機能

```css
/* 実サイトは font-feature-settings を 1 要素も使っていない（実測 0 件） */
```

- `palt` も `halt` も `pwid` も無し。**字間を `normal` で通す方針と一貫している**

### 3.8 ヒーローは「高さ」に追従する（このサイト最大の特徴）

**幅を変えても何も起きない。高さを変えると全部動く。**

実測（幅 1440px 固定、高さだけ振る）:

| viewport height | コピーの font-size | letter-spacing | 写真の width | 写真の radius | スライドの padding |
|---|---|---|---|---|---|
| **1440px** | 107px | 2.14px | 700px | 16px | 30px |
| **1200px** | 107px | 2.14px | 700px | 16px | 30px |
| **1080px** | **107px** | **2.14px** | **700px** | **16px** | **30px** |
| 1000px | 99.0741px | 1.98148px | 648.141px | 14.8148px | 27.7778px |
| 900px | 89.1667px | 1.78333px | 583.328px | 13.3333px | 25px |
| 800px | 79.2593px | 1.58519px | 518.516px | 11.8519px | 22.2222px |
| 700px | 69.3519px | 1.38704px | 453.703px | 10.3704px | 19.4444px |
| 600px | 59.4444px | 1.18889px | 388.875px | 8.88889px | 16.6667px |

```css
@media (min-width: 768px) {
  .p-home-slider__copy     { font-size: min(107px, 9.90741vh); letter-spacing: 0.02em; line-height: 1; }
  .p-home-slider__main-img { width: min(700px, 64.8148vh); border-radius: min(16px, 1.48148vh); }
  .p-home-slider__main-slide { padding-inline: min(30px, 2.77778vh); }
  .p-home-slider           { margin-inline: max(-30px, -2.77778vh); }
  .p-home-slider__bg       { top: max(-198px, -18.3333vh); }
}
/* モバイルは vw に切り替わる */
@media (max-width: 767px) {
  .p-home-slider__main-slide { padding-inline: 4vw; }
  .p-home-slider__main-img   { width: 80vw; height: 58.6667vw; object-fit: cover; border-radius: 4.26667vw; }
  .p-home-slider__bg         { top: -32vw; }
  .p-home-slider__bg-bloc    { width: 226.4vw; height: 110.133vw; }
}
```

- **設計高は 1080px。** `min()` の上限に達するのがちょうど 1080px
- **モバイル（≤767px）では `vw` に切り替わる。** 高さ追従はデスクトップだけの仕掛け
- **幅だけ測ると「固定サイズのサイト」に見える。** `html` も `body` も 1920〜320px の 19 幅すべてで **16px から 1px も動かない**

### 3.9 和文見出しに欧文専用書体が当たっている

```css
/* 実サイト */
.c-headline__ttl-ja { font-family: "Big Caslon", serif; font-weight: 600; }
```

該当要素（トップ 2 / 下層 9）の中身は **`わたしたちの企業理念` `お知らせ` `事業紹介` `月刊誌ほか` `週刊誌` `書籍`** ＝ **すべて日本語**。

実測（40px で幅を比較）:

| 文字列 | `"Big Caslon", serif` | `serif` | 判定 |
|---|---|---|---|
| `わたしたちの企業理念` | **400.00px** | **400.00px** | **完全一致＝Big Caslon は使われていない** |
| `Kobunsha Hamburgefonstiv` | 465.97px | 524.53px | 割れる＝書体自体は端末に入っている |

- **Big Caslon は macOS 同梱の欧文ディスプレイセリフで、CJK グリフを持たない。** したがって和文は必ず次の `serif` に落ちる
- **`serif` は OS ごとに別物。** macOS ではヒラギノ明朝／游明朝、Windows では游明朝／MS P明朝。**見出しの印象が環境で変わる**
- 新規実装では **和文明朝を明示的にチェーンへ入れる**（3.3 節のコード）

---

## 4. Component Stylings

### Buttons（3 種。すべて `border-radius: 1440px`＝完全な丸）

**Light（既定）**
- Background: `#efefef` / Text: `#3b3b3b`
- Font: `"Noto Sans JP", sans-serif` / 18px / **500** / `letter-spacing: normal`
- Line Height: `20.7px`（= 1.15）
- **Border Radius: `1440px`** / Shadow: `none`

**Dark**
- Background: `#292929` / Text: `#efefef`
- 他は Light と同じ

**Outlined**
- Background: `transparent` / Text: `#3b3b3b`
- Border: `1px solid #3b3b3b`
- **Border Radius: `1440px`**

> **`1440px` は「十分に大きい値」という意味の書き方。** `9999px` や `50vh` と同じ意図なので、**数値そのものに意味はない**（コンテナ幅の 1440 と一致するのは偶然ではないが、効果は同じ）。

### Circle Button（スライダーの矢印）

- `border-radius: 50%` / Background `#efefef` / Text `#ffffff`
- **Box Shadow: `rgba(70, 71, 77, 0.3)`** ← **サイト内で影を持つ唯一の部品**

### Cards

- Border Radius: `13.3333px`（= `min(16px, 1.48148vh)` の 900px 時の値）/ 下層は `16px`
- Shadow: `none`
- 面: `rgba(255, 255, 255, 0.6)` でグラデーションを透かす

### News Row

- 行頭に 2px の縦罫（`linear-gradient(to right, #707070 2px, transparent 2px)`）
- 日付 `#88929d` → カテゴリ → 見出し `#292929` の順

---

## 5. Layout Principles

### Spacing Scale

CSS Custom Properties による自社トークンは**実質存在しない**（`own: 2`、残り 60 個は WordPress admin / Gutenberg の `--wp-*` `--wp--preset--*`）。余白は px 直書きか `vh` 式。

| 実測 gap | 用途 |
|-------|------|
| `20px` | トップの最多（23 件） |
| `44px 32px` | 下層のカードグリッド（9 件） |
| `132px` | 下層のセクション間（8 件） |
| `40px` / `26px 0` / `15px 60px` / `12px 10px` | 各部 |

### Container

| Max Width | 用途 |
|---|---|
| **`1440px`** | 下層の最外（8 件） |
| **`1160px`** | 本文コンテナ（3 件） |
| `1214px` / `950px` / `909px` | 個別 |

### Grid

- 下層の雑誌一覧は `gap: 44px 32px` のカードグリッド

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **ほぼすべての要素**（`distributions.boxShadow` は 2 ページとも空） |
| 1 | `rgba(70, 71, 77, 0.3)` | **スライダーの丸ボタンだけ** |

**奥行きは影ではなく「白の半透明の面（`rgba(255,255,255,0.6)`）をグラデーションの上に重ねる」ことで作る。**

---

## 7. Do's and Don'ts

### Do（推奨）

- **ヒーローは `min(固定値, N vh)` で書く。** 設計高 1080px から逆算する（例: 107px なら `min(107px, 9.90741vh)`）
- **和文の `letter-spacing` は `normal` のまま。** 触らない
- **欧文見出しにだけ `letter-spacing: 0.02em`** を当てる
- **Noto Sans JP の weight は 500 と 600 の 2 段**で通す
- ボタンは `border-radius: 1440px`（完全な丸）の 3 種（薄面・濃面・線）
- 地は `linear-gradient(to right, #ecedef 0%, #d2dae2 100%)`
- **読ませる本文には `line-height: 2.5` を明示する**（既定の 1.15 のままにしない）
- グレーは 6 段（`#292929` / `#3b3b3b` / `#727c86` / `#88929d` / `#c4c4c4` / `#efefef`）を使い分ける

### Don't（禁止）

- **和文見出しに `font-family: "Big Caslon", serif` と書かない。** CJK グリフが無いので一生当たらず、OS ごとに別の明朝で出る。和文明朝を明示する
- **ヒーローのサイズを `vw` で書かない。** このサイトは `vh`。幅だけ変えても何も動かない
- **`font-weight: 700` 以上を当てない。** 実測 0 要素（可変フォントなので描画はされるが、サイトの調子が変わる）
- **`letter-spacing` を和文に配らない。** `normal` が設計
- **影を足さない。** 実測で影を持つのはスライダーの丸ボタン 1 種だけ
- **`pageBackground.resolved`（`#ffffff`）を地色として実装しない。** 見えている地はグラデーション
- **`--wp--preset--*` を設計トークンとして扱わない。** 62 個中 60 個が WordPress 由来
- 本文の既定 `line-height: 1.15` を長文に使わない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測件数 | 説明 |
|------|-------|---|------|
| Mobile | ≤ 767px | **86 件** | ヒーローが `vh` → `vw` に切り替わる |
| Desktop | ≥ 768px | **75 件** | `vh` 流体が効く帯 |
| Wide | ≥ 1101px | 5 件 | グローバルナビが可変に |
| Narrow Desktop | ≤ 1100px | 6 件 | |
| （hover 可否） | `(any-hover: hover)` | 28 件 | ホバー演出の出し分け |

### 幅方向は固定、高さ方向が流体

実測 19 幅（1920〜320px）で **`html` / `body` とも 16px から動かない**。`letter-spacing` も `normal` のまま、`line-height` も `18.4px`（= 1.15）のまま。

幅で変わるのは要素側だけ:

| 要素 | ≥ 768px | ≤ 767px |
|---|---|---|
| `h2` | **20px** | **14px** |
| ヒーロー | `min(107px, 9.90741vh)` ほか `vh` 式 | `4vw` / `80vw` / `4.26667vw` の `vw` 式 |

**グローバルナビのリンクだけは幅に追従する**（1101〜1440px の帯で `1.04167vw`＝`100vw / 96`、上限 15px）:

| 幅 | ナビリンク |
|---|---|
| 1920px / 1440px | **15px**（上限） |
| 1200px | 12.5px |
| 1101px | 11.4688px |
| 1100px 以下 | 16px（別のレイアウトへ） |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）を確保する

### フォントサイズの調整

- 本文 16px はモバイルでも据え置き。縮むのは `h2`（20 → 14px）とヒーロー

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Root Font Size: 16px（19 幅すべてで固定）
Text Primary:   #3b3b3b
Text Strong:    #292929
Text Muted:     #88929d / #727c86
Surface:        #efefef
Veil:           rgba(255, 255, 255, 0.6)
Line:           #707070（2px の縦罫。linear-gradient で引く）
Background:     linear-gradient(to right, #ecedef 0%, #d2dae2 100%)  ← 白ではない

Font (和文): "Noto Sans JP", sans-serif   ← 可変フォント 1 本。weight は 500 / 600 のみ
Font (欧文): "Josefin Sans", sans-serif   ← weight 600 のみ
Body Size:      16px
Line Height:    1.15（既定）/ 2.5（読ませる本文）/ 1.0（ヒーロー）
Letter Spacing: normal（和文）/ 0.02em（欧文のみ）
Border Radius:  1440px（ボタン）/ min(16px, 1.48148vh)（カード）
Box Shadow:     none（例外はスライダーの丸ボタンのみ）
Container:      1440px / 1160px
設計高:          1080px   ← ヒーローは vh で書く
Breakpoint:     768px
```

### プロンプト例

```
光文社のデザインシステムに従って、トップページのヒーロースライダーを作成してください。

- ヒーローは viewport の「高さ」に追従させる（幅ではない）。設計高は 1080px
  - コピー: font-size: min(107px, 9.90741vh) / "Josefin Sans", sans-serif / weight 600
    / letter-spacing: 0.02em / line-height: 1 / color: #ffffff
  - 写真: width: min(700px, 64.8148vh) / border-radius: min(16px, 1.48148vh)
  - スライドの左右余白: padding-inline: min(30px, 2.77778vh)
  - 767px 以下では vw 式に切り替える（padding-inline: 4vw / width: 80vw / radius: 4.26667vw）
- 地は linear-gradient(to right, #ecedef 0%, #d2dae2 100%)
- 和文は "Noto Sans JP", sans-serif / weight 500 または 600 / letter-spacing は normal のまま
- 和文見出しに欧文専用書体（Big Caslon 等）を単独で指定しない。
  明朝にするなら "Hiragino Mincho ProN", "Yu Mincho", serif まで書く
- ボタンは border-radius: 1440px の完全な丸。薄面 #efefef / 濃面 #292929 / 線 1px #3b3b3b の 3 種
- box-shadow は使わない
```
