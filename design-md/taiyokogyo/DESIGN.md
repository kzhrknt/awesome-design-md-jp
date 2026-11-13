# DESIGN.md — 太陽工業（TAIYO KOGYO / MakMax）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-13 / 対象: `https://www.taiyokogyo.co.jp/`, `/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 青1色と白。ボタンはすべてピル型（`border-radius: 30px`）で、影は1種類だけ。膜構造建築の写真を大きく見せ、UI は徹底して引き算する
- **密度**: 中。本文 13px・見出し 40px という振れ幅で、文字より写真に語らせる
- **キーワード**: MakMax ブルー、ピル型ボタン、字間ゼロ、影1種、Noto Sans JP 4ウェイト

**このサイトの核心は4つある。**

1. **`letter-spacing` を1要素も触っていない。** 実測は **`normal` が 133/133 要素**（トップ）／ **58/58 要素**（下層）。CSS 全文を見ても `body` に `letter-spacing` の宣言が無い。**日本語を素のまま組む**
2. **`palt` は書いてあるのに、デスクトップでは 1 要素も効いていない。** CSS に 4 箇所あるが、うち 2 箇所が `@media` の中にあり、**1440px では実測 0 件、375px で 3 件**（`.home-ttl__ttl h2` などセクション見出しだけ）。**モバイルでだけ字詰めが効く**という実装
3. **しかも `palt` は効く書体で効かせていない。** 同一ページ・同一書体（Noto Sans JP）で隠し div の幅を実測すると `normal 1291px` → `"palt" 1131.4px` の **−12.4%**。能力の問題ではなく、デスクトップで使っていないだけ
4. **ヒーローの大コピーはテキストではなく SVG。** 「膜にこだわり、膜を超える。」は `kv-catch.svg`（366×151）で、**「膜」の2文字だけ `#004bb4`、残りは黒**という2色組み。ヒーロー帯で実テキストの最大は 40px の `太陽工業の事業`

**CSS Custom Properties は 63 個あるが、自社トークンは 3 個だけ**（残り 60 個は WordPress / Gutenberg と WordPress admin の既定値）。

> **実サイトの誤り**: この SVG の `alt` は **`膜にこだわり、膜を越える。`**（越）だが、**画像に描かれている文字は `超える`**（超）。アウトライン化されているので支援技術には `alt` の表記しか届かない。**新規実装では `alt` を画像と一致させる。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **MakMax Blue** | **`#004bb4`** | **可視の塗り面 39 要素**（トップ）。CTA・ヘッダーボタン・セクション見出しの帯・ヒーロー SVG の「膜」。**文字色としても 38 要素**（下層 19 要素）。このサイトの色はほぼこれ1つ |
| **Blue Tint** | **`#d2ddec`** | 可視 4 要素。`プレスリリース` `お知らせ` のカテゴリチップの面。文字は `#004bb4` |

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 56 要素（トップ）／ 35 要素（下層）**。**このサイトは本文に純黒を使う**
- **Text on Dark** (`#ffffff`): 青面の上のテキスト、ヒーロー右の白箱の外（可視 39 要素 / 4 要素）
- **Surface Gray** (`#f7f7f7`): セクションの面。**下層のページ背景もこれ**（`pageBackground.resolved` = `rgb(247,247,247)` / 根拠 `viewportTopBySample (7/11)`）
- **Background（トップ）** (`#ffffff`): トップのページ背景（根拠 `viewportTopBySample (9/12)`）

> **色は実質 青・黒・白・淡青・薄グレー の 5 つだけ。** 製造業のコーポレートサイトとしては極端に少ない。セマンティックカラー（Danger / Warning / Success）は 1 つも実装されていない。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Noto Sans JP**（Google Fonts）。**400 / 500 / 600 / 700 の 4 ウェイト**が `document.fonts` で `loaded`
- 明朝体は使わない

### 3.2 欧文フォント

- 専用の欧文フォントを読み込んでいない。英数字は **Noto Sans JP の欧文グリフ**で組まれる
- `Arial` が 1 要素だけ出るが、これはスライダーのナビゲーション（ライブラリ由来）

### 3.3 font-family 指定

```css
/* 実サイトの宣言（body に1回だけ） */
body {
  line-height: 1.5;
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans",
               Meiryo, sans-serif;
  font-size: 1.3rem;              /* = 13px */
}
```

**和文優先の素直なスタック。** 実測 **133/133 要素**（トップ）／ **58/58 要素**（下層）が完全にこの1本で、例外が1つも無い。

- 受け皿は `Hiragino Kaku Gothic ProN` → `Hiragino Sans` → `Meiryo` → `sans-serif` の4段。**途中に generic family が入っていない**（山櫻型の事故が無い）
- **游ゴシックを一切書いていない**ので、Windows の游ゴシック Medium 問題がそもそも起きない。Windows では Meiryo に落ちる

### 3.4 文字サイズ・ウェイト階層

| 役割 | font-size | weight | line-height | letter-spacing |
|------|-----------|--------|-------------|----------------|
| ページタイトル（下層 h1） | **40px** | 700 | 60px (1.5) | normal |
| セクション見出し（トップ） | **40px** | 700 | 60px (1.5) | normal |
| 大見出し（h2） | **34px** | 600 | 51px (1.5) | normal |
| 見出し（`Pick Up`） | 32px | 700 | — | normal |
| セクション小見出し | 30px | 700 | — | normal |
| 記事タイトル | 24px | — | — | normal |
| 実績名 | 20px | — | — | normal |
| 中見出し（h3） | **20px** | 600 | 26px (1.3) | normal |
| リード文 | 18px | 400 | 28.8px (1.6) | normal |
| **本文・ボタン** | **16px** | 400 | 24px (1.5) | normal |
| グローバルナビ | 14px | 500 | 21px (1.5) | normal |
| ユーティリティ・カテゴリ | 14px | 400 / 700 | 21px / 18.2px | normal |
| **body 既定** | **13px** | 400 | 19.5px (1.5) | normal |

**ウェイトは 400 / 500 / 600 / 700 の 4 段。**

- `@font-face` も Google Fonts の URL（`css2?family=Noto+Sans+JP:wght@400;500;600;700`）も **400 / 500 / 600 / 700 の 4 本**で、宣言と実装が一致している
- **見出しは 600 と 700 を使い分ける。** セクションの大見出しは 600（34px / 20px）、トップの最大見出しとカード見出しは 700（40px / 32px / 30px）

### 3.5 行間・字間

```css
/* 実サイトの宣言 */
html { font-size: 0.625rem; margin-top: 0 !important; }   /* = 10px */

body {
  line-height: 1.5;               /* 無単位 */
  font-size: 1.3rem;              /* = 13px */
  /* letter-spacing の宣言は無い */
}
```

- **`html { font-size: 0.625rem }`** という書き方。`62.5%` でも `10px` でも `62.5%` でもなく、**ブラウザ既定 16px に対する `rem`** で 10px を作っている。結果は同じだが、ユーザーがブラウザの既定サイズを変えると追従する
- **`line-height: 1.5` は無単位**。各要素が自分のサイズで再計算する（13px → 19.5px、16px → 24px、40px → 60px）
- 見出しだけ **1.3** を宣言し直す（20px → 26px、34px は 1.5 のまま 51px）
- リード文だけ **1.6**（18px → 28.8px）
- **`letter-spacing` は宣言が1つも無い。** 実測 100% が `normal`

> **リセット CSS に `body { line-height: 1 }` が別途あるが、後勝ちで `1.5` が効いている。** CSS を grep すると 2 つ並ぶので、`1` のほうを写さない。

### 3.6 禁則処理・改行ルール

- `word-break` は **`normal`**（9 幅すべてで実測）。`auto-phrase` も `break-all` も使っていない
- ブラウザ既定の日本語禁則に任せる

### 3.7 OpenType 機能

```css
/* 実サイトの宣言は 4 箇所。うち 2 箇所が @media の中 */
.p-ttl4.-ffs h3,
.p-ttl4.-ffs h4          { font-feature-settings: "palt"; }
.results-slide__info h3  { font-size: 2rem; font-weight: 600; color: #004BB4;
                           line-height: 1.3; font-feature-settings: "palt"; }

@media (max-width: 991px) {
  .home-ttl__ttl h2      { font-size: 2.8rem; font-feature-settings: "palt"; }
  .page-ttl__ttl h1,
  .page-ttl__ttl h2      { font-size: 2.8rem; font-feature-settings: "palt"; }
}
```

- **デスクトップ（1440px）では実測 0 件。375px で 3 件**（`太陽工業の事業` `太陽工業の実績` の 28px 見出し）
- **`palt` は効く。** Noto Sans JP で隠し div を測ると `normal 1291px` → `"palt" 1131.4px`（**−12.4%**）。使っていないだけ
- `tnum` / `halt` / 縦組み用（`vpal` / `vkrn`）は使っていない

> **この実装を真似るかどうかは判断が要る。** モバイルでだけ詰まるので、同じ見出しが画面幅で別の字送りになる。**揃えたいなら `body` に1行書くか、4 箇所とも `@media` の外に出す。**

### 3.8 縦書き

- **使っていない**（実測 `writing-mode: vertical-*` 0 要素）

---

## 4. Component Stylings

### Buttons

**プライマリ（青のピル）**

```css
background-color: #004bb4;
color: #ffffff;
border: 1px solid #004bb4;
border-radius: 30px;              /* ピル */
font-size: 16px;                  /* ヘッダーは 14px */
font-weight: 400;
line-height: 24px;
letter-spacing: normal;
box-shadow: rgba(0, 0, 0, 0.16) 0 3px 3px 0;
```

**セカンダリ（白地に青枠のピル）**

```css
background-color: #ffffff;
color: #004bb4;
border: 1px solid #004bb4;
border-radius: 30px;
font-size: 16px;
font-weight: 400;
line-height: 24px;
```

**大ボタン（ヒーロー内）**

```css
background-color: #004bb4;
color: #ffffff;
border-radius: 70px;              /* 24px の文字に合わせて半径も大きい */
font-size: 24px;
font-weight: 400;
line-height: 36px;
```

> **ボタンの文字は weight 400。** 太字にしない。

### Badges / Chips

```css
/* カテゴリチップ */
background-color: #d2ddec;
color: #004bb4;
font-size: 14px;
font-weight: 700;
line-height: 18.2px;              /* 1.3 */
border-radius: 0;                 /* チップだけ角丸なし */
```

- **カテゴリチップだけ `border-radius: 0`。** ボタンがすべてピルなので、角のある矩形が「押せないラベル」の合図になっている

### Cards

- 実績カードは `border-radius: 20px`、記事カードは `20px` / `15px`
- 円形の要素（スライダーの再生・停止、ページネーションのドット）は `border-radius: 50%`（実測 5 要素）
- 影は **1 種類だけ**（下記 §6）

---

## 5. Layout Principles

### Container

- **1320px**（実測 9 要素。トップ・下層とも唯一のコンテナ幅）
- サイドの小カラムは **450px**

### Spacing Scale

実測の `gap`:

| 値 | 用途 |
|---|---|
| `55px` | セクション間 |
| `40px` / `40px 35px` | ブロック間・カードグリッド |
| `35px 30px` | 3カラムのカード |
| `30px` / `25px` / `20px` | 小さな並び |
| `10px 25px` | 横並びのナビ |

### Grid

- 事業紹介・実績は 3 カラム（`gap: 35px 30px`）
- ヒーローは**左に写真（1140×560 の背景画像）、右に白い箱**という非対称の2分割

---

## 6. Depth & Elevation

**影は1種類だけ。**

```css
box-shadow: rgba(0, 0, 0, 0.16) 0 3px 3px 0;
```

- 実測 **30 要素**（トップ）／ **9 要素**（下層）が**すべて同じ値**
- ボタン・カード・固定の問い合わせバーに同じ影を当てる。**段階を作らない**
- 色は黒の 16%、オフセット 3px、ぼかし 3px、広がり 0

---

## 7. Do's and Don'ts

### Do（推奨）

- `html { font-size: 0.625rem }`、`body { font-size: 1.3rem; line-height: 1.5 }` と書く
- `font-family` は `"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif` の1本だけを使う
- ウェイトは **400 / 500 / 600 / 700** の4段から選ぶ。セクション見出しは 600、最大見出しとカード見出しは 700
- `line-height` は無単位で 1.5（既定）／ 1.3（見出し）／ 1.6（リード）
- ボタンは**すべてピル**（`border-radius: 30px`、大きいものは `70px`）。文字は weight 400
- 影は `rgba(0,0,0,.16) 0 3px 3px 0` の1種類だけ
- 色は `#004bb4` / `#d2ddec` / `#000000` / `#ffffff` / `#f7f7f7` の5つに収める
- コンテナは **1320px**

### Don't（禁止）

- **`letter-spacing` を書かない。** このサイトは実測 100% が `normal`。0.05em を足すと別のサイトになる
- **`font-feature-settings: "palt"` をデスクトップに足さない。** 実サイトは 1440px で 0 件。足すと既存の見出しと字送りが揃わなくなる（`palt` は効く書体なので、足せば確実に **−12.4%** 詰まる）
- **`line-height` を px で書かない。** 無単位の 1.5 / 1.3 / 1.6 が各要素のサイズで再計算される前提
- **ヒーローの大コピーを Web フォントで実装しない。** 実サイトは SVG で、「膜」の2文字だけ `#004bb4` に塗り分けている。テキストで組むなら `<span>` で色を分ける必要があるが、字形自体がアウトライン化された別物
- **`alt` を画像の文字と食い違わせない。** 実サイトは `alt="膜にこだわり、膜を越える。"`／画像は「膜を**超**える。」
- **影に段階を作らない。** 1種類だけ
- **カテゴリチップを角丸にしない。** 角のある矩形が「押せないラベル」の合図
- `--wp--preset--*` / `--wp-admin-*` を自社トークンとして採用しない（WordPress の既定値で、実装には使われていない）

---

## 8. Responsive Behavior

### Breakpoints

実測の `@media`（件数順）:

| 条件 | 件数 | 役割 |
|---|---|---|
| `screen and (max-width: 991px)` | **704** | **主ブレークポイント。** モバイル・タブレットの定義がほぼ全部ここ |
| `screen and (min-width: 992px)` | **178** | デスクトップ |
| `screen and (max-width: 979px)` | 13 | 補助 |
| `screen and (max-width: 1299px)` / `(min-width: 1300px)` | 11 / 5 | コンテナの縮小 |
| `screen and (min-width: 1320px)` | 6 | コンテナの最大幅 |
| `screen and (max-width: 1099px)` / `(max-width: 1319px)` | 5 / 4 | 補助 |

### ルートと本文のふるまい（9 幅で実測）

| 幅 | `html` | `body` | `line-height` | `letter-spacing` |
|---|---|---|---|---|
| 1920 / 1440 / 1200 / 992 / **991** / 834 / 768 / 767 / 375 px | **10px** | **13px** | 19.5px | normal |

- **9 幅すべてで完全固定。** 流体の式も崖も1つも無い
- 動くのは**個々の要素のサイズ**だけ（例: セクション見出し 40px → 28px @991px 以下）。ルートは一切動かさない

### タッチターゲット

- ボタンは `padding` を含めて 40px 以上。ピル型なので上下の余白が確保される

### フォントサイズの調整

- ルートが 10px なので CSS は `1.3rem` / `2.8rem` のように書く（`rem × 10 = px`）
- 991px 以下で見出しが `2.8rem`（28px）に落ちる。**このときだけ `palt` が効く**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
MakMax Blue:  #004bb4
Blue Tint:    #d2ddec
Text:         #000000
Text on Dark: #ffffff
Surface Gray: #f7f7f7
Background:   #ffffff（トップ）/ #f7f7f7（下層）
Font: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
Root: html 0.625rem (=10px) 全幅固定
Body: 13px / line-height 1.5 / letter-spacing なし
Weights: 400 / 500 / 600 / 700
Letter Spacing: normal（例外なし）
font-feature-settings: デスクトップでは使わない
Border Radius: 30px（ボタン）/ 70px（大ボタン）/ 20px（カード）/ 0（チップ）/ 50%（円）
Box Shadow: rgba(0,0,0,.16) 0 3px 3px 0  ← 1種類のみ
Container: 1320px
Breakpoint: 991 / 992px
```

### プロンプト例

```
太陽工業のデザインシステムに従って、事業紹介ページを作成してください。
- html { font-size: 0.625rem }、body { font-size: 1.3rem; line-height: 1.5 }
- font-family は "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif の1本だけ
- letter-spacing は一切書かない（サイト全体が normal）
- font-feature-settings も書かない（デスクトップでは使っていない）
- ページタイトル 40px / weight 700 / line-height 1.5、
  セクション見出し 34px / weight 600 / 1.5、中見出し 20px / weight 600 / 1.3
- リード文 18px / line-height 1.6、本文 16px / 1.5、既定 13px / 1.5
- 色は #004bb4 / #d2ddec / #000000 / #ffffff / #f7f7f7 の5つだけ
- ボタンはすべてピル。プライマリ = 背景 #004bb4 / 白文字 / 1px solid #004bb4 / border-radius 30px / 16px weight 400
- セカンダリ = 白地 / 文字 #004bb4 / 1px solid #004bb4 / 同サイズ
- カテゴリチップは背景 #d2ddec / 文字 #004bb4 / 14px weight 700 / border-radius 0
- 影は rgba(0,0,0,.16) 0 3px 3px 0 の1種類だけを全要素で共用する
- カードは border-radius 20px、コンテナは 1320px、ブレークポイントは 991/992px
```
