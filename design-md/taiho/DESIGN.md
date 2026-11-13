# DESIGN.md — 大鵬薬品工業（TAIHO PHARMACEUTICAL）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-13 / 対象: `https://www.taiho.co.jp/`, `/company/story/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: ベージュ3段と茶色1色。写真を大きく使い、面を淡く、文字は純黒。角丸は 5px に統一され、影は1つも使わない
- **密度**: ゆったり。本文の行間が **2.125**（16px に対して 34px）で、製薬企業のコーポレートサイトとしては相当に空いている
- **キーワード**: ベージュ、茶、`palt` 全面、行間 2.125、影ゼロ、角丸 5px

**このサイトの核心は4つある。**

1. **`palt` を `html` に1行だけ書いて全要素へ継承させている**（`html { font-feature-settings: "palt" 1 }`。実測トップ 391 要素 / 下層 390 要素 ＝ 可視要素のほぼ全部）。**宣言位置が `body` でも `*` でもなく `html`** なのが実装の実態
2. **その上から `body { letter-spacing: 0.05em }` で字間を足し直している。** `0.05em` は body の 16px に対して解決された **`0.8px` という絶対値**として全子孫へ降り、40px の見出しでも 12px のキャプションでも **0.8px のまま**（実測トップ 47/83 要素・下層 77/100 要素）。**詰めてから、ごくわずかに空け直す二段構え**
3. **モバイルファーストで、768px を境にルート以外のすべてが切り替わる。** `html` は `62.5%` ＝ 10px で全幅固定だが、`body` は既定 **14px / line-height 1.785 / letter-spacing 0.7px**、`@media (min-width: 768px)` で **16px / 2.125 / 0.8px**。`min-width: 960px` もこのメディアクエリの中にある
4. **ヒーローの大コピーは1文字もテキストではない。** 「"いつも"を支える力になりたい。」は写真（`p_top_keyvisual_01_pc.webp` 1440×823）に焼き込まれ、サブコピーは別の SVG（`t_top_keyvisual_02_pc.svg` 752×136、`alt="大鵬薬品で働く一人一人の願いであり、目指すもの。"`）。**ヒーロー帯で実テキストの最大は 16px**

**影は1種類も使っていない**（実測 `box-shadow` 0 種。JSON に出る1件は OneTrust の CMP）。CSS Custom Properties も **自社トークンは 5 個だけ**で、下層ページでは **0 個**（2世代のテンプレートが同居している）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Taiho Brown** | **`#8a532c`** | **可視の塗り面 25 要素**（トップ）／ 17 要素（下層）。メガメニューの面、`ABOUT US` `MEDICAL` などの英字見出しの文字色、フッター見出し。CSS 変数 `--color--primary01` と**値が一致している** |
| **Navy** | **`#27455c`** | 可視 8 要素。SNS アイコンなど小面積のみ。テキストには使わない |
| **Green** | **`#468254`** | 可視 3 要素。同上 |

> **ブランド色が茶色1色で、紺と緑は補助。** `--color--primary01: #8A532C` という宣言があり、**宣言値と実装値が一致している数少ないサイト**（大文字小文字だけ違う）。

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 67 要素（トップ）／ 87 要素（下層）**。**このサイトは本文に純黒を使う**
- **Text on Dark** (`#ffffff`): 茶面・フッター上のテキスト（可視 6 要素 / 3 要素）
- **Text Gray** (`#363636`): パンくず、フッターのコピーライト帯（可視 6 要素）
- **Beige 01** (`#f0eeea`): **最も淡いベージュ**。CSS 変数 `--color--bg01` と一致。ヒーロー下の帯、`MOVIE` セクション
- **Beige 02** (`#f7f5f2`): セクションの面。`ABOUT US` `NEWS` のブロック、下層のページタイトル帯（可視 11 要素 / 8 要素）
- **Beige 03** (`#ebe8e1`): **最も濃いベージュ**。ニュースのタブ・カテゴリチップ（可視 40 要素。トップで最多の面色）
- **Background** (`#ffffff`): ページ背景。`html` / `body` ともに `background` の宣言が無く、**UA 既定の白**（`pageBackground.resolved` 下層 = `rgb(255,255,255)` / 根拠 `viewportTopBySample (3/6)`）

> **ベージュが3段あるのが設計の本体。** `#f0eeea` → `#f7f5f2` → `#ebe8e1` の差は RGB で 5〜13 しかないが、**3つとも実装されていて役割が違う**（地帯 / セクション面 / チップ）。1色に丸めるとニュース一覧のタブが背景に沈む。

### 計測に混じるが採用しない色

- `#3860be`（青）／ `#696969`（グレー）／ `#f4f4f4`：**すべて OneTrust（Cookie 同意バナー）**。`13.008px` / `weight 600` / `letter-spacing 0.13008px` / `border-radius 2px` / `box-shadow` という半端な値が並んだらこれ。**サイト本体の設計には1つも使われていない**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Zen Kaku Gothic Antique**（Google Fonts）。400 / 500 / 700 の **3 ウェイト**
- 明朝体は使わない。**ヒーローの大コピーが明朝に見えるのは写真に焼き込まれた画像**であり、Web フォントではない

### 3.2 欧文フォント

- **サンセリフ**: **Roboto**（Google Fonts）。400 / 500 / 700 の **3 ウェイト**。スタックの**先頭**に置かれている

### 3.3 font-family 指定

```css
/* 実サイトの宣言（html に1回だけ書いて全体へ継承させている） */
html {
  font-family: "Roboto", "Zen Kaku Gothic Antique", "メイリオ", Meiryo,
               "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3",
               "游ゴシック", YuGothic, "ＭＳ Ｐゴシック",
               Helvetica, Arial, sans-serif;
  font-size: 62.5%;                    /* = 10px */
  font-feature-settings: "palt" 1;
  overflow-y: scroll;
}
```

**欧文優先の和欧二層。** Roboto が先頭なので英数字は Roboto、和文は2番目の Zen Kaku Gothic Antique に落ちる。実測 74 要素（トップ）／ 97 要素（下層）がこのスタック。

> **実サイトには2本目のスタックがあり、そこから `"Zen Kaku Gothic Antique"` が抜けている。**
> ```css
> /* 実サイトの別宣言（9 要素 / 3 要素）— 和文が当たるとメイリオに落ちる */
> font-family: Roboto, メイリオ, Meiryo, "Hiragino Kaku Gothic ProN", … ;
> ```
> 当たっているのは `JP` `EN` `ABOUT US` `MEDICAL` `USER` `FOLLOW US` **すべて欧文**なので実害は出ていないが、**この宣言に和文を入れると、そこだけ書体が変わる。** 新規実装では常に1本目のスタックを使う。

### 3.4 文字サイズ・ウェイト階層

| 役割 | font-size | weight | line-height | letter-spacing |
|------|-----------|--------|-------------|----------------|
| ページタイトル（下層 h1） | **40px** | 700 | 60px (1.5) | 0.8px |
| 大見出し（h2） | **30px** | 700 | 45px (1.5) | 0.8px |
| セクション見出し（トップ） | 28px | 700 | — | 0.8px |
| 中見出し（h3） | **25px** | 700 | 37.5px (1.5) | 0.8px |
| 小見出し（h4） | 20px | 700 | 30px (1.5) | 0.8px |
| タブ・カテゴリ | 23px | 700 | — | 1.15px |
| **本文（p）** | **16px** | 400 | **34px (2.125)** | **0.8px** |
| グローバルナビ | 15px | 500 | 21px (1.4) | 0.75px |
| 補足・日付 | 14px | 400 | 23.0006px (1.643) | 0.7px |
| ユーティリティナビ | 13px | 500 | 27.625px (2.125) | 0.65px |
| ラベル・言語切替 | 12px | 400 | 19.68px (1.64) | 0.8px |
| 英字ラベル（`INDEX` 等） | 12px | 700 | 25.5px | **2.28px** |
| 検索・最小 | 10px | 400 | — | 0.5px |

**ウェイトは 400 / 500 / 700 の3段だけ。**

> **600 と 900 を指定しても 700 で出る。300 を指定しても 400 で出る。**
> 隠し div の幅実測（`font-weight` だけ変えて `getBoundingClientRect().width` を比較、測定文字列は欧文）:
> - Roboto: `100 / 300 / 400 → 1236.52px` ／ `500 → 1244.80px` ／ `600 / 700 / 900 → 1251.80px`
> - Zen Kaku Gothic Antique: `100 / 300 / 400 → 1168.31px` ／ `500 → 1358.50px` ／ `600 / 700 / 900 → 1478.91px`
>
> **どちらも 3 面しかない。** `@font-face` も 400 / 500 / 700 の 3 本ずつで、合成太字は起きない。

分布に出る `weight 600` は **OneTrust の CMP のみ**（3 要素）。

### 3.5 行間・字間

```css
/* 実サイトの宣言 */
html { font-size: 62.5%; }                  /* = 10px。全幅で固定 */

body {                                       /* モバイル既定 */
  font-size: 1.4rem;                         /* = 14px */
  line-height: 1.785;                        /* 無単位 */
  letter-spacing: 0.05em;                    /* → 0.7px に解決されて継承 */
}

@media (min-width: 768px) {
  body {
    min-width: 960px;
    font-size: 1.6rem;                       /* = 16px */
    line-height: 2.125;                      /* → 見出しは各自で 1.5 を宣言し直す */
                                             /* letter-spacing は 0.8px になる */
  }
}
```

- **`line-height` は無単位。** 子要素は自分のサイズで再計算する。見出し（h1〜h4）は全部 **1.5** を宣言し直しており、`2.125` が効くのは本文・リスト・リンクなど宣言していない要素（実測 `34px` が本文 p / li に並ぶ）
- **`letter-spacing` は `em` 宣言 → px 継承。** body が 16px のとき `0.8px`、14px のとき `0.7px` という**絶対値**が降りる。**40px の見出しでも 0.8px のまま**（= 0.02em）で、大きい文字ほど字間が消える。**`em` で各要素に配り直さない**
- 英字ラベルだけ `2.28px`（12px に対して **0.19em**）と大きく空ける。`ABOUT US` `MEDICAL` `INDEX` など

### 3.6 禁則処理・改行ルール

- `word-break` は **`normal`**（9 幅すべてで実測）。`auto-phrase` も `break-all` も使っていない
- ブラウザ既定の日本語禁則に任せる

### 3.7 OpenType 機能

```css
html { font-feature-settings: "palt" 1; }   /* 全要素へ継承。実測 391 / 390 要素 */
```

- **`palt` は `html` に1行。** `body` でも `*` でもない。収録済みサイトの宣言位置はこれで5型（`body` ／ `*` ／ **`html`** ／ `[lang|="ja"]` ／ コンポーネント単位）
- `tnum` / `halt` / 縦組み用（`vpal` / `vkrn`）は使っていない
- **`palt` で詰めてから `letter-spacing: 0.05em` で空け直す**のがこのサイトの組み方。片方だけ再現すると別物になる

### 3.8 縦書き

- **使っていない**（実測 `writing-mode: vertical-*` 0 要素）

---

## 4. Component Stylings

### Buttons

**プライマリ（茶の面）**

```css
background-color: #8a532c;
color: #ffffff;
font-size: 16px;
font-weight: 500;
line-height: 16px;
letter-spacing: 0.8px;
border-radius: 5px;
box-shadow: none;
```

**セカンダリ（ベージュの面）**

```css
background-color: #f7f5f2;
color: #000000;
font-size: 16px;
font-weight: 500;
line-height: 16px;
letter-spacing: 0.8px;
border-radius: 5px;
box-shadow: none;
```

**小ボタン・チップ（最も濃いベージュ）**

```css
background-color: #ebe8e1;
color: #000000;
font-size: 12px;
font-weight: 400;
line-height: 19.68px;
letter-spacing: 0.8px;
border-radius: 5px;
```

### Badges / Chips

- ニュースのカテゴリタブは **`#ebe8e1` の面 ＋ `border-radius: 5px`**。選択状態は茶の面に白文字
- 一部のタブは**上辺だけ角丸**（`border-radius: 0 5px 0 0`。実測 3 要素）。タブの形として意図的
- 下層のパンくず脇のラベルは `border-radius: 5px 0 5px 5px`（実測 1 要素）

### Cards

- ニュースカードは**枠も影も無い**。ベージュの面（`#f7f5f2`）の上に白いカードを置かず、**面の色差だけで区切る**
- 角丸はカード・画像とも **5px**
- 円形の要素（スライダーの停止ボタン、矢印）は `border-radius: 50%`（実測 12 要素）

---

## 5. Layout Principles

### Container

- **1220px**（実測 11 要素。トップ・下層とも最頻）
- 下層の本文カラムは **1156px** / **860px**
- `body { min-width: 960px }`（768px 以上のときのみ）

### Spacing Scale

実測の `gap`:

| 値 | 用途 |
|---|---|
| `0 25px` | 横並びのナビ |
| `40px` | セクション内のブロック |
| `0 94px` / `0 104px` | ヘッダーの大きな列間 |
| `20px` / `15px` / `10px` / `5px` | 小さな並び |

### Grid

- ニュースは3カラム。下層のストーリー一覧は `gap: 40px` の縦積み

---

## 6. Depth & Elevation

**影を1つも使わない。**

- 実測 `box-shadow` は **サイト本体 0 種**。JSON に出る `rgba(0,0,0,0.2) 0 0 18px 0` は OneTrust のバナーのもの
- 浮きは**ベージュ3段の面の差**だけで作る
- 枠線も最小限で、カードは面色の違いで区切る

---

## 7. Do's and Don'ts

### Do（推奨）

- `html` に `font-size: 62.5%` と `font-feature-settings: "palt" 1` と `font-family` をまとめて書く
- `body` に `letter-spacing: 0.05em` を**1回だけ**書いて継承させる
- 本文は 16px / `line-height: 2.125`、見出しは `1.5` を宣言し直す
- 768px 未満では body を 14px / 1.785 に落とす（モバイルファーストで書く）
- ウェイトは **400 / 500 / 700** の3つから選ぶ
- 面は `#f0eeea` / `#f7f5f2` / `#ebe8e1` の3段を役割で使い分ける
- 角丸はすべて **5px**（円形は `50%`）
- 本文の色は **`#000000`**（純黒）

### Don't（禁止）

- **`letter-spacing` を `em` で各要素に配り直さない。** このサイトは body の `0.05em` が `0.8px` の絶対値として降りる設計で、見出しに `0.05em` を当てると 40px × 0.05 = 2px になって別物になる
- **`line-height` を px で書かない。** 無単位の 2.125 / 1.785 / 1.5 が各要素のサイズで再計算される前提
- **`font-weight` に 300 / 600 / 900 を指定しない。** 書体が 400 / 500 / 700 の3本しか無く、指定しても 400 または 700 で出る（実測済み）
- **`box-shadow` を足さない。** サイト本体は影ゼロ
- **ヒーローの大コピーを Web フォントで実装しない。** 実サイトは写真に焼き込んだ画像＋ SVG の2層で、`Zen Kaku Gothic Antique` で再現すると字面も字間もまったく違うものになる
- **`Zen Kaku Gothic Antique` を抜いたスタック（`Roboto, メイリオ, Meiryo, …`）に和文を入れない。** 実サイトにはこの宣言が 9 要素あるが、当たっているのは欧文だけ
- **ベージュ3段を1色に丸めない**
- `#3860be` / `#696969` / `13.008px` / `weight 600` を採用しない（OneTrust の値）

---

## 8. Responsive Behavior

### Breakpoints

実測の `@media`（出現順）:

| 条件 | 役割 |
|---|---|
| `print, screen and (min-width: 768px)` | **主ブレークポイント。** body の font-size / line-height / min-width がここで切り替わる |
| `print, screen and (min-width: 1025px)` | デスクトップ |
| `screen and (min-width: 768px) and (max-width: 1024px)` | タブレット |
| `screen and (max-width: 767px)` | モバイル |
| `screen and (max-width: 350px)` | 極小 |

### ルートと本文のふるまい（9 幅で実測）

| 幅 | `html` | `body` | `line-height` | `letter-spacing` |
|---|---|---|---|---|
| 1920 / 1440 / 1200 / 992 / 991 / 834 / **768** px | 10px | **16px** | 34px (2.125) | 0.8px |
| **767** / 375 px | 10px | **14px** | 24.99px (1.785) | 0.7px |

- **`html` は 9 幅すべてで 10px 固定。** 流体ではない
- **崖は 768 / 767px の1箇所だけ**で、16px → 14px（0.875 倍）とおだやか。字間も 0.8px → 0.7px に連動して下がる

### フォントサイズの調整

- ルートが 10px なので CSS は `1.4rem` / `1.6rem` のように書く（`rem × 10 = px`）
- 見出しサイズ（40 / 30 / 25 / 20px）はブレークポイントをまたいで固定

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Brown:  #8a532c
Navy:         #27455c
Green:        #468254
Text:         #000000
Text Gray:    #363636
Beige 01:     #f0eeea   (地帯)
Beige 02:     #f7f5f2   (セクション面)
Beige 03:     #ebe8e1   (チップ・タブ)
Background:   #ffffff
Font: "Roboto", "Zen Kaku Gothic Antique", "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "游ゴシック", YuGothic, "ＭＳ Ｐゴシック", Helvetica, Arial, sans-serif
Root: html 62.5% (=10px) 全幅固定
Body: 16px / line-height 2.125 / letter-spacing 0.05em  (≥768px)
      14px / line-height 1.785                          (<768px)
Weights: 400 / 500 / 700 のみ
font-feature-settings: "palt" 1  ← html に1行
Border Radius: 5px（円は 50%）
Box Shadow: なし
Container: 1220px
```

### プロンプト例

```
大鵬薬品工業のデザインシステムに従って、企業情報の下層ページを作成してください。
- html に font-size: 62.5% / font-feature-settings: "palt" 1 / font-family を書く
- font-family は "Roboto", "Zen Kaku Gothic Antique", "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN", … の順
- body はモバイル既定 1.4rem / line-height 1.785 / letter-spacing 0.05em、
  @media (min-width: 768px) で 1.6rem / line-height 2.125 / min-width 960px
- letter-spacing は body に1回だけ。見出しで em を宣言し直さない
- h1 40px / h2 30px / h3 25px / h4 20px、すべて weight 700 / line-height 1.5
- 本文 16px / line-height 2.125 / 色 #000000
- ウェイトは 400 / 500 / 700 だけを使う（600 や 900 を書かない）
- 面は #f0eeea（地帯）/ #f7f5f2（セクション）/ #ebe8e1（チップ）の3段で使い分ける
- プライマリボタンは背景 #8a532c / 白文字 / 16px weight 500 / border-radius 5px
- セカンダリボタンは背景 #f7f5f2 / 黒文字 / 同サイズ
- box-shadow は一切使わない。カードは面色の差だけで区切る
- コンテナは 1220px、本文カラムは 1156px
```
