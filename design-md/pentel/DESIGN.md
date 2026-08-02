# DESIGN.md — ぺんてる（Pentel）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-02 / 対象: `https://www.pentel.co.jp/`, `/products/`

---

## 1. Visual Theme & Atmosphere

文具メーカー。サイトのタグラインは「表現するよろこびを。／ The Joy of Expression.」。
**白場に純赤 `#ff0000` の1色**で組み、ナビゲーションを画面上部に浮かせた
**白いピル**として置く。記事カードにはパステル4色をローテーションで当て、
クレヨンの色見本のような賑わいを出す。

- **デザイン方針**: 白場＋純赤。ピル型のUIと巨大な和文見出しでポップにまとめる
- **密度**: 中。トップは番号付きセクション（01〜06）で内容を積み上げる
- **キーワード**: 純赤、ピル（radius 20px）、124pxの和文見出し、パステル4色、palt

**このサイトの特徴的な癖（他サイトと違う点）**

1. **`font-family` の先頭が `YakuHanJP`**。約物（括弧・句読点）だけを半角化する
   サブセットフォントを本体書体の前に置く、日本語Web特有のテクニック
2. **和文は Ryo Gothic PlusN（リョウゴシック PlusN / モリサワ）、
   欧文は Paralucent** の2書体構成。**英字は必ず Paralucent に切り替わる**
3. **`letter-spacing` が全要素で `0.03em`**。16px→0.48px、14px→0.42px、
   38px→1.14px、54px→1.62px と font-size × 0.03 で一致する
4. **超大見出しだけ `0.01em`**。124px の和文見出しでは字間を 1/3 に絞る
5. **`palt` が `body` から全体に効いている**。字間を開けつつ約物は詰める設計
6. **和文の `line-height` が 1.16〜1.4 と詰まっている**。日本語サイトの標準（1.7〜2.0）
   より明確に狭い。見出しを塊として見せるための選択
7. **ピルは一律 `border-radius: 20px`**。ナビもカテゴリタブも同じ値
8. **記事カードの面色が4色ローテーション** … 水色 / 黄 / 紫 / 緑

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値。すべて hex -->

### Primary（ブランドカラー）

- **Pentel Red** (`#ff0000`): **純赤**。ロゴ、ナビの選択中ピル、重要なお知らせ、
  「VIEW」ボタン、リンクの強調。**中間色に逃げない純度の高い赤**
- **Deep Red** (`#a4000f`): グループ会社リンクの面色。赤の暗い側の1点

### Neutral（ニュートラル）

- **Text Primary** (`#212121`): 本文・見出し。純黒ではなく1段浅い黒
- **Text Secondary** (`#888888`): 日付、カテゴリ、非選択タブの文字
- **Background** (`#ffffff`): ページ地色
- **Surface** (`#f6f6f6`): セクションの面（「新商品」等）
- **Surface Tab** (`#eaeaea`): 非選択のピル、カード面
- **Surface Chip** (`#dddddd`): 商品カテゴリのピル（「ボールペン」「マーカー」）
- **Scrim** (`rgba(33, 33, 33, 0.4)`): 画像の上に文字を置くときの黒

### Accent（記事カードのパステル4色 — 順に繰り返す）

| 色 | Hex | 出現 |
|----|-----|------|
| Sky | `#b5ebff` | 1番目・5番目… |
| Lemon | `#ffe890` | 2番目・6番目… |
| Lilac | `#e5c7ff` | 3番目・7番目… |
| Mint | `#bbffbe` | 4番目・8番目… |

「表現する人々」のインタビューカードに、**内容と無関係に出現順で機械的に割り当てる**。
文字色はすべて `#212121`（パステルなので黒文字が乗る）。

### CSS Custom Properties

```css
:root {
  /* 定義されているのはイージングだけ。色はトークン化されていない */
  --ease01: cubic-bezier(0.16, 1, 0.3, 1);
  --ease02: cubic-bezier(0.6, 0.25, 0, 1);
}
```

**色のCSS変数を持たない**。`--ease01` / `--ease02` の2本だけが定義されており、
動きの質感（`ease01` は強い減速、`ease02` は溜めてから走る）だけを共通化している。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Ryo Gothic PlusN**（リョウゴシック PlusN / モリサワ、Adobe Fonts 経由）
  - CSS名: `ryo-gothic-plusn`
  - 使用ウェイト: 500（本文・通常）/ 700（見出し・強調）
- **約物サブセット**: **YakuHanJP** — チェーンの**先頭**に置く

### 3.2 欧文フォント

- **サンセリフ（欧文専用）**: **Paralucent**（Device Fonts、Adobe Fonts 経由）
  - CSS名: `paralucent`
  - 使用ウェイト: 700 / **900**
  - 用途: セクションの英語ラベル（`New Products` `Keywords` `Index` `Global`）、日付

**和文と欧文でファミリを完全に切り替える**。英字が出る場所には
`font-family: paralucent, sans-serif` を別に当てており、
和文チェーンの欧文グリフは使わない。

### 3.3 font-family 指定

```css
/* 和文（本文・見出し・UI） */
font-family: YakuHanJP, ryo-gothic-plusn, sans-serif;

/* 欧文（英語ラベル・日付） */
font-family: paralucent, sans-serif;

/* 入力欄だけ別（ブラウザ既定に寄せている） */
font-family: "Helvetica Neue", Arial, Meiryo, sans-serif;
```

**フォールバックの考え方**:
- **`YakuHanJP` を先頭に置く**のがこのサイトの核。YakuHanJP は
  `（）「」、。：；` などの約物**だけ**を含むサブセットフォントで、
  これらを半角幅で表示させる。本体の和文は次の `ryo-gothic-plusn` が受け持つ
- **プラットフォームフォント（游ゴシック・ヒラギノ）をチェーンに入れていない**。
  Adobe Fonts が落ちた場合は generic の `sans-serif` に直行する
- **入力欄だけ別チェーン**。`"Helvetica Neue", Arial, Meiryo, sans-serif` で、
  `letter-spacing` は 0.03em を維持しつつ `font-feature-settings: normal`

> **YakuHanJP を使わない場合の代替**: `font-feature-settings: "palt"` だけでも
> 約物は詰まるが、YakuHanJP は「常に半角」なので効き方が違う。
> 見出しで括弧が続く場合の詰まり方が最も変わる。

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Display | Ryo Gothic PlusN | **124px** | 700 | **1.0** (124px) | **0.01em** (1.24px) | 「表現するよろこびを。」 |
| Display | Ryo Gothic PlusN | 54px | 700 | 1.16 (62.64px) | 0.03em (1.62px) | セクションのキャッチ |
| Heading 1 | Ryo Gothic PlusN | 38px | 700 | 1.376 (52.3px) | 0.03em (1.14px) | 「手描きが生み出すよろこびで、…」 |
| Heading 2 | Ryo Gothic PlusN | 26px | 700 | 1.23 (32px) | 0.03em (0.78px) | 「ボールペン」 |
| Heading 3 | Ryo Gothic PlusN | 22px | 700 | 1.18 (26px) | 0.03em (0.66px) | カード見出し・メニュー項目 |
| Lead | Ryo Gothic PlusN | 22px | 700 | 1.3 (28.6px) | 0.03em (0.66px) | 商品名（画像上） |
| Body | Ryo Gothic PlusN | 16px | **500** | 1.4 (22.4px) | 0.03em (0.48px) | 本文の基準 |
| Nav | Ryo Gothic PlusN | 14px | 700 | **1.0** (14px) | 0.03em (0.42px) | グローバルナビ |
| Body Small | Ryo Gothic PlusN | 14px | 500 | 1.29 (18px) | 0.03em (0.42px) | サブナビ・注記 |
| Emphasis Small | Ryo Gothic PlusN | 14px | 700 | 1.3 (18.2px) | 0.03em (0.42px) | 商品名リンク |
| Alert | Ryo Gothic PlusN | 15px | 700 | 1.4 (21px) | 0.03em (0.45px) | 「重要なお知らせ：」`#ff0000` |
| Section Label (JP) | Ryo Gothic PlusN | 12px | 500 | **2.2** (26.4px) | 0.03em (0.36px) | 「ぺんてるの新商品」 |
| Caption | Ryo Gothic PlusN | 12px | 500 | 1.0 (12px) | 0.03em (0.36px) | 「ぺんてるレポート」 |
| Micro | Ryo Gothic PlusN | 11px | 500 | 1.0 (11px) | 0.03em (0.33px) | 「表現する人々」 |
| Display (EN) | Paralucent | 44px | **900** | **0.8** (35.2px) | normal | 「New Products」 |
| Heading (EN) | Paralucent | 28px | 900 | 1.0 (28px) | normal | 「Keywords」 |
| Label (EN) | Paralucent | 26px | 700 | 0.9 (23.4px) | normal | 「Index」 |
| Sub Label (EN) | Paralucent | 15px | 700 | 1.0 (15px) | normal | 「Global」 |
| Date (EN) | Paralucent | 12px | 700 | 1.0 (12px) | normal | 「2025.07.30」 |

### 3.5 行間・字間

- **`letter-spacing` は和文で一律 `0.03em`**（font-size × 0.03）。
  12px→0.36px / 14px→0.42px / 16px→0.48px / 22px→0.66px / 26px→0.78px /
  38px→1.14px / 54px→1.62px と完全に一致する
- **例外は超大見出しだけ**。124px では `0.01em`（1.24px）と 1/3 に絞る。
  大きい字は字間が空きすぎて見えるため
- **欧文（Paralucent）は `letter-spacing: normal`**。和文だけ字間を入れる
- **和文の `line-height` は 1.16〜1.4 と詰まっている**。日本語の標準（1.7〜2.0）より狭く、
  見出しを「塊」として見せる。ヒーローの 124px は **1.0**
- **欧文はさらに詰める**。Paralucent 44px の行高は `0.8`（35.2px）で、
  **font-size より小さい**。大文字だけの英字ラベルなのでディセンダが不要
- 例外的に開くのは**セクションラベル（12px / 2.2）** だけ。
  英語ラベルの下に小さく置く和文行を、上下に余裕を持たせて配置している

```css
body {
  font-family: YakuHanJP, ryo-gothic-plusn, sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: #212121;
  font-feature-settings: "palt";
}

/* ヒーローの超大見出し — 字間だけ絞る */
.hero-display {
  font-size: 124px;
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: 0.01em;
}

/* 英語ラベル — 行高を font-size より小さくする */
.label-en {
  font-family: paralucent, sans-serif;
  font-weight: 900;
  font-size: 44px;
  line-height: 0.8;
  letter-spacing: normal;
}
```

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- ヒーローのコピー「表現する／よろこびを。」は**人が改行位置を決めている**。
  124px の和文を自動折り返しに任せない
- 商品名「フローチューン 限定 Skyly Design」のように**全角スペース区切り**が多い
- YakuHanJP により約物が半角になるため、
  「〜について、」のような句読点まわりの折り返し位置が通常より1文字ぶん動く

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";
```

- **`body` から全要素に `palt` が効いている**（入力欄のみ `normal`）
- **`palt` と `letter-spacing: 0.03em` の併用**が設計の要。
  palt で約物を詰め、letter-spacing で全体を均一に開く。
  片方だけでは同じ見た目にならない
- さらに先頭の `YakuHanJP` が約物を半角化するので、**約物には3重に効いている**

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | 代替（Google Fonts） | 理由 |
|---------|---------------------|------|
| Ryo Gothic PlusN（モリサワ） | **Zen Kaku Gothic New** | 同系のヒューマニストなゴシック。ふところの広さと仮名の丸みが近い |
| Paralucent（Device Fonts） | **Poppins** | ジオメトリックサンス。900ウェイトがあり、大きな英字ラベルの印象が近い |
| YakuHanJP | **代替なし**（`font-feature-settings: "palt"` で近似） | サブセットフォントで Google Fonts に無い |

Ryo Gothic PlusN も Paralucent も Adobe Fonts のドメインライセンスのため、
ローカルの preview.html では表示できない。
YakuHanJP は npm / jsDelivr から配信されるサブセットフォントで、
実装時は CDN から読み込んで `ryo-gothic-plusn` の**前**に置く。

---

## 4. Component Stylings

### Buttons / Pills

**このサイトのボタンはすべてピル（`border-radius: 20px`）**。値は一律。

**Nav Pill — Active**

- Background: `#ff0000` / Text: `#ffffff`
- Border Radius: `20px` / Padding: `8px 17px`
- Font: 14px / **weight 700** / `letter-spacing: 0.03em` / `line-height: 1.0`

```css
.pill--active {
  background: #ff0000;
  color: #fff;
  border: 0;
  border-radius: 20px;
  padding: 8px 17px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.03em;
}
```

**Nav Pill — Inactive**

- Background: `#eaeaea` / Text: `#888888`
- 同じ radius / padding。**weight だけ 700 → 500 に落ちる**

**Category Pill（商品カテゴリ）**

- Background: `#dddddd` / Text: `#212121`
- Border Radius: `20px` / Font: 16px / weight 700

**Text Button（下層の「詳しく見る」）**

- Background: `transparent` / Text: `#212121`
- Border Radius: `20px`（枠は見えないが値は保持されている）
- Font: 20〜22px / weight 500

### Navigation Bar

トップのナビは**白いピル型のバーが画像の上に浮く**構造。

```css
.nav {
  background: #fff;
  border-radius: 40px;       /* バー自体もピル */
  padding: 0 8px;
  display: flex;
  align-items: center;
}
```

- ナビ内の項目は上記 Nav Pill。選択中のみ `#ff0000`
- 右端の検索アイコンとハンバーガーは**白い正円**として独立して置かれる

### Cards

**Article Card（表現する人々）**

- Background: パステル4色のローテーション（`#b5ebff` / `#ffe890` / `#e5c7ff` / `#bbffbe`）
- Text: `#212121`
- Border Radius: **`0px`** — カードは角丸を持たない（ピルとの対比）
- Padding: `44px 30px 104px`（**下を極端に厚く取る**）
- 構成: 肩書き（11px）→ 氏名（22px / 700）→ 引用コピー

**Product Card**

- Background: `transparent` / Border Radius: `0px` / Shadow: なし
- 構成: 商品写真 → カテゴリ（12px `#888888`）→ 商品名（14px / 700）

### Alerts

**重要なお知らせ**

- Text: `#ff0000` / Font: 15px / weight 700 / `line-height: 1.4`
- 面色は敷かない。**赤い文字だけで警告を示す**

### Inputs

- Font: `"Helvetica Neue", Arial, Meiryo, sans-serif` / 17px / weight 500
- `letter-spacing: 0.03em`（和文と揃える）/ `font-feature-settings: normal`
- Text: `#212121`

**入力欄だけ和文チェーンから外れている**点に注意。
IME 変換中の表示崩れを避けるための一般的な対処。

### Section Header（番号付き見出し）

トップの各セクションは `01` `02` … の番号＋英語ラベル＋和文ラベルの3層。

```
01                      ← 番号（Paralucent）
Message                 ← 英語ラベル（Paralucent 900）
ぺんてるが提案すること      ← 和文ラベル（Ryo Gothic 12px / line-height 2.2）
```

---

## 5. Layout Principles

### Container

- Max Width: `1440px` 相当（ヒーローは全幅 `100vw`）
- Padding (horizontal): 30px

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 17px |
| M | 30px |
| L | 44px |
| XL | 104px |
| XXL | 160px |

カードの padding が `44px 30px 104px` と**下だけ突出して厚い**のがこのサイトの癖。
引用コピーの下に余白を溜めて、次のカードとの境界をつくっている。

### Grid

- 記事カード: 4カラム（パステル4色が1行に並ぶ）
- 商品カテゴリ: 8つのピルを横並び（折り返し）
- 新商品: 3カラム

### Hero

- 高さ `100vh`。全画面の商品写真をスライドショー（5枚 / `1 / 5` のカウンタ付き）
- 和文の超大見出し（124px）を左下に配置し、英語のタグラインを右下に添える
- ページ送りは**横長の白い楕円**（`← 1/5 →`）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・ピル・セクション** |
| 1 | 白面そのもの | 画像の上に浮くナビバー・検索ボタン。影ではなく**白い面**で浮かせる |

**影を使わない**。奥行きは「白い面を画像の上に置く」ことで表現する。
`box-shadow: none` が全要素で実測される。

### Motion（影の代わりに動きで質感を出す）

```css
--ease01: cubic-bezier(0.16, 1, 0.3, 1);   /* 強い減速。出現・スライド */
--ease02: cubic-bezier(0.6, 0.25, 0, 1);   /* 溜めてから走る。ホバー・切替 */
```

このサイトが唯一トークン化しているのが**イージング**。
色でも余白でもなく動きを共通化している点は、実装時に踏襲する価値がある。

---

## 7. Do's and Don'ts

### Do（推奨）

- ブランドカラーは**純赤 `#ff0000`**。中間色に丸めない
- 本文色は `#212121`（純黒を使わない）
- `font-family` の先頭に `YakuHanJP` を置く
- 和文は Ryo Gothic PlusN、英字は Paralucent に**切り替える**
- `letter-spacing` は和文で `0.03em`（font-size × 0.03）に揃える
- 超大見出し（100px超）だけ `0.01em` に絞る
- 欧文は `letter-spacing: normal`、`line-height` を 0.8〜1.0 と詰める
- 和文見出しの `line-height` は 1.16〜1.4 と狭く取る
- `font-feature-settings: "palt"` を `body` から効かせる
- ピルは一律 `border-radius: 20px`、カードは `0px`
- 記事カードの面色はパステル4色を**出現順にローテーション**する
- 画像の上のUIは影ではなく**白い面**で浮かせる

### Don't（禁止）

- 赤を `#e60012` 等の「日本の企業赤」に置き換えない。**純赤 `#ff0000`**
- 本文に `#000000` を使わない（`#212121`）
- **和文の line-height を 1.7〜2.0 にしない**。このサイトは意図的に詰めている
- 英字に `letter-spacing` を入れない（和文だけ）
- カードに角丸を付けない（ピルとの対比が崩れる）
- 影・グラデーションを足さない
- パステル4色を内容に応じて選ばない（**出現順で機械的に**割り当てる）
- 「重要なお知らせ」に面色を敷かない（赤い文字だけで示す）
- 入力欄に和文Webフォントのチェーンを当てない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。ナビはハンバーガー |
| Tablet | 768–1023px | 2カラム |
| Desktop | ≥ 1024px | 3〜4カラム |

### モバイルでの変化

- 浮いているナビバー → 右上のハンバーガー（白い正円）のみ残す
- ヒーローの超大見出し 124px → 48〜56px 前後。**`letter-spacing: 0.01em` は維持する**
- 見出し 38px → 24px 前後
- 記事カード 4カラム → 1〜2カラム（パステルのローテーションは維持）
- カードの padding `44px 30px 104px` → `32px 20px 64px` 前後に縮める

### タッチターゲット

- ピルは `padding: 8px 17px` ＋ 14px の文字で約 30px。
  **モバイルでは上下パディングを 14px 以上に増やして 44px を確保する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:   #ff0000（純赤）
Deep Red:        #a4000f
Text Primary:    #212121
Text Secondary:  #888888
Background:      #ffffff
Surface:         #f6f6f6 / #eaeaea / #dddddd
Scrim:           rgba(33, 33, 33, 0.4)
Accent (4色):    #b5ebff / #ffe890 / #e5c7ff / #bbffbe（出現順にローテーション）
JP Font:         YakuHanJP, ryo-gothic-plusn, sans-serif
EN Font:         paralucent, sans-serif
Input Font:      "Helvetica Neue", Arial, Meiryo, sans-serif
Body Size:       16px / weight 500
Line Height:     1.4（本文）/ 1.16〜1.38（見出し）/ 1.0（ヒーロー・ナビ）/ 0.8〜1.0（欧文）
Letter Spacing:  0.03em（和文）/ 0.01em（100px超の見出し）/ normal（欧文）
Border Radius:   20px（ピル）/ 40px（ナビバー）/ 0px（カード）
Shadow:          none（白い面で浮かせる）
Easing:          cubic-bezier(0.16, 1, 0.3, 1) / cubic-bezier(0.6, 0.25, 0, 1)
palt:            on（body から全体に）
```

### プロンプト例

```
ぺんてるのデザインシステムに従って、商品一覧ページを作成してください。
- 背景 #ffffff、本文 #212121、補足 #888888
- ブランドカラーは純赤 #ff0000（#e60012 などに置き換えない）
- 和文フォント: YakuHanJP, ryo-gothic-plusn, sans-serif
  （YakuHanJP を必ず先頭に置く。約物を半角化するサブセットフォント）
- 英字だけ font-family: paralucent, sans-serif に切り替える
- 本文 16px / weight 500 / line-height: 1.4 / letter-spacing: 0.03em
- 見出し 38px / weight 700 / line-height: 1.376 / letter-spacing: 0.03em
- ヒーローの超大見出しは 124px / line-height: 1.0 / letter-spacing: 0.01em
  （大きい字だけ字間を 1/3 に絞る）
- 英語ラベルは letter-spacing: normal、line-height は 0.8〜1.0 と詰める
- font-feature-settings: "palt" を body から効かせる
- ナビは白いピル型のバー（border-radius: 40px）を画像の上に浮かせる
  項目は border-radius: 20px / padding: 8px 17px / 14px
  選択中は背景 #ff0000・白文字・weight 700、非選択は背景 #eaeaea・#888888・weight 500
- 商品カテゴリのピルは背景 #dddddd / 文字 #212121 / border-radius: 20px / 16px weight 700
- 記事カードは border-radius: 0、padding: 44px 30px 104px（下を厚く）
  面色は #b5ebff → #ffe890 → #e5c7ff → #bbffbe を出現順にローテーション
- 「重要なお知らせ」は面色を敷かず、#ff0000 の文字（15px / weight 700）だけで示す
- 入力欄は "Helvetica Neue", Arial, Meiryo, sans-serif / 17px
- 影は使わない。画像の上のUIは白い面で浮かせる
- アニメーションは cubic-bezier(0.16, 1, 0.3, 1) を既定にする
```
