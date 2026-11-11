# DESIGN.md — 三菱ケミカル（Mitsubishi Chemical）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-11 / 対象: `https://www.m-chemical.co.jp/`, `/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に灰文字。装飾を持たない。**角丸は検索フォームの 4px だけ、影は 0 種、字間は全要素 `normal`、`palt` は 0 件、CSS Custom Properties は 0 個。** 素の HTML に近い見た目を、意図して保っている
- **密度**: 低い。ニュース・トピックスを 2 列に並べるだけのトップ。装飾を削った分、文字そのものが設計の全部
- **キーワード**: Noto Sans JP 2 ウェイト、トークンゼロ、`html` 10px、ヒーローは 1 枚の JPG、文字サイズ拡大機能

**このサイトの核心は4つある。**

1. **ヒーロー全体が 1 枚の JPG。** 「KAITEKI」も「人、社会、そして地球の心地よさが続いていくこと」も、`<li class="slick-slide">` の **`background-image: url(MCC_banner_pc.jpg)`（1439×600px）** に焼き込まれている。`document.images` にも `<picture>` にも出ないので**矩形の列挙では見つからない**。**ページの生テキストで最大のものは 20px の `NEWS` / `TOPICS`**
2. **使っている書体は Noto Sans JP の 400 と 700 だけ。** `@font-face` は 500 も宣言しているが `unloaded` で、実測のウェイト分布も **400（132 要素）と 700（17 要素）の 2 段しかない**
3. **`-Hiragino` / `-YuGothic` という別名の `@font-face` が 4 本あるが、呼び出し側に 1 度も書かれていない。** CSS 全文に 8 回出るのに、**可視要素の `font-family` スタックに 0 件**。游ゴシック Medium 問題を正しく解く意図の宣言が丸ごと死んでいる（§3.1）
4. **`letter-spacing` は全要素 `normal`。** 可視 149 要素中 **149 要素**（トップ）。例外は下層の大見出し 1 要素だけで、そこは `0.4em`（16px）と極端に空ける。**中間が無い**

**CSS Custom Properties は両ページとも 0 個**（`:root` にも `body` にも無い）。値はすべて CSS に直書き。`font-size: %` は **62 箇所**あり、文字サイズ拡大機能のために入れ子で掛け算する作りになっている（§8）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Navy（見出し）** | **`#074677`** | 下層ページの `h2`（`三菱ケミカルについて` ほか・24px / weight 400）。**このサイトで唯一の「ブランドらしい色」** |
| **Search Blue** | **`#166af1`** | 検索ボタンの面（両ページ・2 要素）。見出しの紺とは別の青 |
| **Ink** | **`#232933`** | 見出し・強調テキスト（可視 14〜17 要素） |

> **`#074677`（見出しの紺）と `#166af1`（検索ボタンの青）は別物。** どちらかに寄せない。

### Semantic（意味的な色）

ニュースのカテゴリバッジだけが色を持つ。**success / warning / error は存在しない。**

| カテゴリ | 面色 | 文字色 | 実測 |
|----------|------|--------|------|
| 展示会 | `#f6eca7`（淡い黄） | `#4e4941` | 面 10 要素 |
| 事業関連 | `#5e9cca`（青） | `#ffffff` | 面 4 要素 |
| その他 | `#d8e2ea`（淡い青灰） | `#41494e` | 面 4 要素 |
| 人事 | `#42baa5`（青緑） | `#ffffff` | 面 2 要素 |

- **バッジの文字色が面ごとに違う**（`#4e4941` / `#ffffff` / `#41494e`）。明度でコントラストを取り直している

### Neutral（ニュートラル）

- **Text Primary** (`#666666`): **本文・リンクの既定色。可視 104 要素（トップ）/ 54 要素（下層）で最多**。**このサイトは本文を黒で組まない**
- **Text Strong** (`#232933`): 見出し・ナビの現在地（可視 14〜17 要素）
- **Text Muted** (`#999999`): PDF のファイルサイズ注記（可視 10 要素）
- **Text on Dark** (`#ffffff`): バッジ・ヒーロー上のテキスト（可視 6〜9 要素）
- **Text Disabled** (`#c5ced8`): 言語切替の非選択（`English` `中文`）
- **Page Background** (`#ffffff`): ページの地
- **Surface Gray** (`#f7f7f7`): フッターのメニュー面（2 要素）
- **Surface Blue Gray** (`#eff1f6`): 下層ページの関連リンク面（3 要素）
- **Footer Slate** (`#8494a0`): フッター最下段の面
- **Dot Inactive** (`#bcbcbc`) / **Dot Active** (`#0077bb`): ヒーローのスライダードット

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP（Google Fonts）だけ。可視 148 要素**（トップ）/ 92 要素（下層）
- **`document.fonts` で `loaded` なのは 400 と 700 のみ。500 は宣言だけで `unloaded`**
- Google Fonts の URL は 2 本あり、どちらも `wght@400;500;700`。**500 を当てても読み込まれていないので 400 で出る**
- フォント要求は **36 件**（unicode-range のサブセット。`unloaded` が大量に出るのは正常）

#### 使われていない `@font-face` が 4 本ある

```css
@font-face { font-family: -Hiragino; font-weight: 400;
  src: local("HiraginoSans-W3"), local("Hiragino Kaku Gothic ProN"); }
@font-face { font-family: -Hiragino; font-weight: 700;
  src: local("HiraginoSans-W6"), local("Hiragino Kaku Gothic ProN W6"); }
@font-face { font-family: -YuGothic; font-weight: 400;
  src: local("YuGothic-Medium"), local("Yu Gothic Medium"), local("YuGothic"); }
@font-face { font-family: -YuGothic; font-weight: 700;
  src: local("YuGothic-Bold"), local("Yu Gothic"), local("YuGothic"); }
```

- **`local()` だけで OS 書体に別名を付ける方式**。`-YuGothic` の 400 が `YuGothic-Medium` を先頭に置いているのは、**Windows の游ゴシックが Regular に落ちて細く出る問題を正しく解いた書き方**
- **しかし `font-family` にこの別名を書いている要素が 1 つも無い**（CSS 全文に 8 回出るが、可視要素のスタックは全部 `"Noto Sans JP", sans-serif`）。**宣言だけで機能していない**
- `src` が `local()` だけなので `document.fonts` では永久に `unloaded`。**これは壊れているのではなく、そもそも呼ばれていない**

### 3.2 欧文フォント

- **専用の欧文書体を持たない。** 英数字も Noto Sans JP で出る
- 例外は**コピーライト行の `Arial, sans-serif`（1 要素）**だけ
- `FontAwesome` が下層ページに 1 本宣言されているが `unloaded`

### 3.3 font-family 指定

```css
body {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 10px;          /* html { font-size: 62.5% } と同値 */
  line-height: 20px;        /* ← 絶対値。比率ではない */
  letter-spacing: normal;
  color: #232933;
}

/* 本文とリンクの既定色はこちら */
a { color: #666666; }
```

- **フォールバックは `sans-serif` の 1 段だけ。** ヒラギノも游ゴシックも書かない（別名の `@font-face` はあるが使っていない）
- **`font-feature-settings` は両ページとも 0 件。** `palt` も `halt` も無い

### 3.4 文字サイズ・ウェイト階層

**ページの生テキストで最大のものは 20px。** 大きい文字はすべて画像。

#### トップページ

| 用途 | 値 | weight | line-height | 実測件数 |
|------|----|--------|-------------|----------|
| セクション見出し（`NEWS` / `TOPICS`） | `20px` | 400 | `30px`（1.50） | 4 |
| メガメニューの見出し | `17.5px` | 700 | `24.5px`（1.40） | 8 |
| **本文・ニュース見出し** | **`16px`** | **400** | **`24px`（1.50）** | **67（最多）** |
| 言語切替・補助 | `14px` | 700 | `14px`（1.00） | 33 |
| フッター・バッジ | `13px` | 400 | `17.94px`（1.38） | 27 |
| 注記 | `12px` | 400 | — | 3 |
| スキップリンク（不可視） | `10px` | 400 | `20px`（2.00） | 7 |

#### 下層ページ

| 用途 | 値 | weight | letter-spacing | color |
|------|----|--------|----------------|-------|
| **`h1`（ページ見出し）** | **`40px`** | **700** | **`16px`（= `0.4em`）** | `#ffffff`（色帯の上） |
| `h2` | `24px` | 400 | `normal` | **`#074677`** |
| リンク一覧 | `20px` | 400 | `normal` | `#666666` |
| PDF 注記 | `16.8px` | 400 | `normal` | `#999999` |

- **ウェイトは 400 と 700 の 2 段だけ**（400: 132 要素 / 700: 17〜18 要素）
- **500 を書かない。** `@font-face` はあるが `unloaded` なので 400 で出る
- `h1` の宣言は `font-size: 4rem; letter-spacing: 0.4em`（`html` が 10px なので 40px / 16px）

### 3.5 行間・字間

- **`body { line-height: 20px }` は比率ではなく絶対値。** 宣言し直さない要素には **20px の行送りがそのまま降りる**（10px の文字なら比率 2.00、14px なら 1.43）
- 実測の内訳（トップ）: `1.50`（68 要素・16px と 20px が 24px / 30px を自分で宣言）、`2.00`（48 要素・10px のまま降りてきたもの）、`1.38`（20 要素）、`1.40`（8 要素）、`1.00`（5 要素）
- **`line-height` を無単位に書き換えると別物になる。** px の絶対値が降りる前提で各要素の行送りが決まっている
- **`letter-spacing` は全要素 `normal`。** トップは可視 149 要素中 149 要素。下層も 92/93 要素
- **例外は下層の `h1` だけで `0.4em`（16px）。** 中間の値（`0.02em` 〜 `0.1em`）が 1 つも無い

#### 旧世代の字間ハック

```css
.listRow.alC,  .ancLink04,  .narrowWrap01 .nrwCondition .conditions > li {
  letter-spacing: -0.4em;      /* inline-block 間の空白を潰す */
}
.listRow.alC > li, .ancLink04 > li, .narrowWrap01 .nrwCondition .conditions > li > * {
  letter-spacing: normal;      /* 子で戻す */
}
```

- **`-0.4em` は字間の設計ではなく、`inline-block` の間に入る改行由来の空白を消すための古い手法。** 9 か所以上ある
- **真似しないこと。** 同じ目的は `display: flex` か `gap` で達成できる

### 3.6 禁則処理・改行ルール

- **`body` の `word-break` は `normal`。** `break-all` も `auto-phrase` も使っていない
- ニュース見出しは `16px` / `line-height: 24px` で 2 行まで。改行位置は制御していない
- **約物は `palt` が無いので全角幅のまま出る**。詰まって見せたい場合でも、このサイトの設計では詰めない

### 3.7 OpenType 機能

- **両ページとも `font-feature-settings` は 0 件。** `palt` / `halt` / `tnum` のいずれも使っていない
- **Noto Sans JP は `palt` を持っているので「足せば効く」が、足すと実サイトと別物になる。** 字間 `normal` と全角幅はこのサイトの既定であって、できないからやっていないのではない

### 3.8 縦書き

- **使用なし。** `writing-mode` が `horizontal-tb` 以外の要素は両ページとも 0 件
- ヒーローの画像にも縦組みは入っていない

---

## 4. Component Stylings

このサイトは**面を持つ部品がほとんど無い。** 実測で CTA らしきものは検索ボタンとスライダードットだけ。

### Buttons

```css
/* 検索ボタン — サイトで唯一の面付きボタン */
.mf-search-bar_button {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 22.5px;             /* 1.50 */
  letter-spacing: normal;
  color: #ffffff;
  background-color: #166af1;
  border: none;
  border-radius: 0 4px 4px 0;      /* 入力欄と合わせて 1 つの角丸 */
  box-shadow: none;
  padding: 5px 5px 2px;
}

/* ヒーローのスライダードット */
.slick-dots button {
  width: 1em; height: 1em;
  border-radius: 50%;
  background-color: #bcbcbc;       /* 選択中は #0077bb */
  border: none;
}
```

- **リンクは面を持たない。** `#666666` のテキストに `[別窓表示]` `[PDF]` のラベルを付けるだけ
- **`box-shadow` は 0 種。** 両ページとも

### Inputs

```css
input {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 15px;
  line-height: normal;
  color: #232933;
  background-color: #ffffff;
  border: 1px solid #333333;
  border-radius: 4px 0 0 4px;      /* 検索ボタンと合わせる */
}
select {
  font-size: 15px;
  line-height: 15px;
  border: 1px solid #333333;
  border-radius: 4px;
}
label { font-size: 15px; line-height: 30px; }
```

- **サイト全体で `border-radius` が付くのはこのフォーム群の `4px` だけ。** 可視テキスト要素の角丸分布は**両ページとも 0 種**
- **フォーカスリングの独自指定なし**（UA 既定）

### Cards

- ニュース／トピックスは**カードではなく定義リスト**。日付 → バッジ → 見出しの 3 要素を罫線で区切る
- バッジだけが面を持つ（§2 のカテゴリ 4 色）
- 下層の関連リンクは `#eff1f6` の面に `20px` のリンクを並べる

---

## 5. Layout Principles

### Spacing Scale

- **トークンを持たないので、スケールは CSS 直書きの値から読む**
- 実測の `gap` は**両ページとも 0 件**（Flexbox/Grid の `gap` を使っていない）。余白は `margin` と `padding` で作る
- 見出しの `padding` は `0 120px 12px`（`h2`）のように**左右に大きく取る**

### Container

- **`max-width: 1480px`**（実測 4 要素・フッターの各ブロック）
- 記事領域は `1200px`
- **コンテナ幅も直書き。** 変数化していない

### Grid

- トップは NEWS / TOPICS の 2 カラム。`float` ベースの旧世代レイアウトと `inline-block` が混在する
- `.listRow` の `letter-spacing: -0.4em` ハック（§3.5）は `inline-block` 並べの名残

---

## 6. Depth & Elevation

- **`box-shadow` は両ページとも 0 種。影を一切使わない**
- **`filter: drop-shadow()` も使っていない**（ヒーローの白文字は JPG に焼き込み済み）
- **角丸はフォームの `4px` だけ。** テキスト要素の角丸は 0 種
- 階層は**罫線と面の明度差**だけ: `#ffffff`（地） → `#f7f7f7` → `#eff1f6` → `#d8e2ea` → `#8494a0`

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 62.5% }`（10px）を基準にし、`4rem` のように rem で書く**（§8）
- **`font-family: "Noto Sans JP", sans-serif` 一本。ウェイトは 400 と 700 の 2 段だけ**
- **`letter-spacing` は `normal` で通す。** 空けるのはページ見出し（`0.4em`）だけ
- **本文とリンクは `#666666`、見出しは `#232933`、下層の `h2` は `#074677`**
- ニュースのカテゴリは**面色＋面ごとに変える文字色**のバッジで表す
- **影と角丸を足さない**（角丸はフォームの `4px` のみ）
- 文字サイズ拡大機能を持たせるなら、**`font-size` を `%` で書いてラッパー 1 か所で倍率を変える**（§8）

### Don't（禁止）

- **`font-weight: 500` を書かない**（`@font-face` は宣言されているが `unloaded`。400 で出る）
- **`font-feature-settings: "palt"` を足さない**（実測 0 件）。約物は全角幅のまま
- **`line-height` を無単位の比率に書き換えない。** `body` の `20px` という**絶対値**が降りる前提で各要素の行送りが決まっている
- **`letter-spacing: -0.4em` を真似しない。** `inline-block` の隙間潰しという旧世代のハックで、字間の設計ではない
- **`-Hiragino` / `-YuGothic` の別名を「使われている」と読まない。** 宣言だけで可視 0 要素
- **ヒーローの大見出しをテキストで実装しない。** 実サイトは `background-image` の JPG 1 枚で、`document.images` にも出ない
- **`box-shadow` を足さない**（0 種）
- **CSS Custom Properties があるつもりで書かない**（両ページとも 0 個）
- **`body { font-size: 1.6em }` や `1.2rem` のような旧世代の宣言が CSS に残っているが、実測の `body` は 10px。** CSS の宣言ではなく実測値に従う

---

## 8. Responsive Behavior

### Breakpoints

実測の上位は `only screen and (max-width: 767px)`（7 件）、`(max-width: 576px)`（7 件）、`only screen and (max-width: 1250px)`（6 件）、`screen and (max-width: 768px)`（6 件）、`only screen and (min-width: 768px)`（6 件）。ほかに `1479px` / `1535px` / `1920px` / `4096px`。**ルートが切り替わるのは 768px の 1 本だけ。**

### ルートの `font-size`（2 段・完全固定）

```css
html { overflow-y: scroll; font-size: 62.5%; }                 /* = 10px */
@media only screen and (max-width: 768px) { html { font-size: 75%; } }   /* = 12px */
```

| 画面幅 | `html` | `body` | `h2` |
|--------|--------|--------|------|
| 1920〜834px | **10px** | 10px | 16px |
| 768〜360px | **12px** | 12px | 16px |

- **帯の中では 1px も動かない。** `vw` も `clamp()` も使っていない
- **モバイルの方がルートが大きい**（10px → 12px）。境目は `max-width: 768px` なので **768px で既に 12px**
- 同じ宣言が **`!important` 付きでもう 1 組ある**（`html { font-size: 62.5% !important }` / `75% !important`）。2 世代の CSS が同居している

### 文字サイズ拡大機能

```css
body.font-large [class^="mainWrap"] { font-size: 112.5%; }
```

- **ルートは動かさず、`body` にクラスを足して本文ラッパー 1 か所の `font-size` を 112.5% にする**
- CSS 全文に **`font-size: %` が 62 箇所**あり、ラッパー配下がこの倍率に連動する
- **px で直書きするとこの機能が壊れる。** 本文まわりのサイズは `%` か `rem` で書くこと

### タッチターゲット

- 検索ボタンの `padding: 5px 5px 2px` は小さい。**タップ領域は親が持つ**
- `label { line-height: 30px }` で行の高さを確保している

### フォントサイズの調整

- **`h2` は 16px で全幅固定**（ルートが 10 → 12px に変わっても変化しない）
- モバイルで本文が相対的に大きくなるのは、ルートが 12px に上がるため

---

## 9. Agent Prompt Guide

### クイックリファレンス

| 項目 | 値 |
|------|-----|
| 和文フォント | `"Noto Sans JP", sans-serif`（400 と 700 のみ `loaded`） |
| 欧文フォント | なし（英数字も Noto Sans JP） |
| 本文サイズ | `16px`（`html` 10px に対して `1.6rem`） |
| 本文ウェイト | 400 |
| 行間 | `body { line-height: 20px }` の**絶対値**。本文は `24px`（1.50） |
| 字間 | `normal`（全要素）。例外はページ見出しの `0.4em` |
| OpenType | **なし** |
| ページ背景 | `#ffffff` |
| 本文・リンク色 | `#666666` |
| 見出し色 | `#232933` / 下層 `h2` は `#074677` |
| バッジ | `#f6eca7` / `#5e9cca` / `#d8e2ea` / `#42baa5` |
| 角丸 | フォームの `4px` だけ |
| 影 | **なし** |
| コンテナ | `max-width: 1480px` |
| ルート | `62.5%`（10px）／ 768px 以下 `75%`（12px）の 2 段・完全固定 |

### プロンプト例

```
三菱ケミカルのスタイルで企業サイトのニュース一覧を作ってください。

- html { font-size: 62.5% }（10px）、768px 以下は 75%（12px）。サイズは rem か % で書く
- font-family: "Noto Sans JP", sans-serif。ウェイトは 400 と 700 の 2 段だけ
- body に line-height: 20px（絶対値）と letter-spacing: normal を書く
- 本文は 1.6rem（16px）/ 400 / line-height: 24px
- ページ見出しは 4rem（40px）/ 700 / letter-spacing: 0.4em / 白文字を色帯に載せる
- 本文とリンクは #666666、見出しは #232933、下層の h2 は #074677
- ニュースのカテゴリはバッジで表す
  （展示会 #f6eca7 に #4e4941 ／ 事業関連 #5e9cca に白 ／ その他 #d8e2ea に #41494e ／ 人事 #42baa5 に白）
- box-shadow は使わない。border-radius は検索フォームの 4px だけ
- font-feature-settings は書かない（palt なし）
- コンテナは max-width: 1480px
- body.font-large のときに本文ラッパーを font-size: 112.5% にする拡大機能を付ける
```

### 注意点

- **`font-weight: 500` は書かない**（`unloaded` なので 400 で出る）
- **`line-height` を無単位に直さない**（`body` の 20px が絶対値で降りる設計）
- **`letter-spacing: -0.4em` のハックは移植しない**（`inline-block` の隙間潰し）
- **`-Hiragino` / `-YuGothic` の `@font-face` は宣言だけで未使用。** 同じものを足す必要はない
- **大見出しをテキストで作ると実サイトと字面が変わる**（実サイトは JPG）
- **CSS に `body { font-size: 1.6em }` `1.2rem` `html { ... !important }` など旧世代の宣言が残っているが、実測は `html`/`body` とも 10px（768px 以下 12px）。** 実測値に従うこと
