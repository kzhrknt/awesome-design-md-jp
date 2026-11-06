# DESIGN.md — オリックス（ORIX）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-06 / 対象: `https://www.orix.co.jp/grp/`, `/grp/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 紺（`#00264d` / `#00163a`）の面に白文字。ブランドの 3 色グラデーション（青 → 紫 → 赤）を細い帯として使う。角丸は円か大きなピル、中間の角丸は使わない
- **密度**: トップは低く（全面動画 ＋ 大きな数字）、下層は高い（12〜24px で詰める）
- **キーワード**: ORIX ネイビー、3 色グラデーション、Noto Sans JP 一本、1920px 設計、全面動画

**このサイトの核心は4つある。**

1. **ヒーローの大見出しは `<video>` に焼き込んである。** 「FINDING PATHS. MAKING IMPACT.」は `movie_day.mp4`（1440×810px・`poster` なし）の中の文字で、**DOM を全走査してもそのテキストは出てこない**。`document.images` にも出ない（`<img>` ではないため）
2. **トップページだけ全面が `clamp(12px, N vw, 9999px)` の流体。** `html { font-size: 62.5% }` = **10px は 8 幅すべてで固定**なのに、文字サイズ・字間・`gap`・角丸まで `vw` で動く。**上限は 9999px ＝ 事実上なし、下限は 12px**。式の分母から**設計幅は 1920px**（`0.8333333333vw` × 1920 = 16px、`0.9375vw` × 1920 = 18px とちょうど整数に着地する）。1440px で見ると全部 **0.75 倍**になる
3. **下層ページは完全に固定 px、字間は `normal` が 97/97 要素。** トップと下層で設計系が別。**同じサイトの 2 ページを見ないと、どちらか一方を「このサイトの設計」と誤認する**
4. **Web フォントは Noto Sans JP 一本**（可視 85 / 97 要素）。`@font-face` は 100〜900 の 9 ウェイト分を宣言するが、実際に `loaded` するのは **トップ 300/400/500/700/900、下層 400/500/700**

**`font-feature-settings` は 2 ページとも 0 要素。** Noto Sans JP は `palt` を持っている（実測 `normal` 520.00px → `"palt"` 424.00px、**−18.5%**）ので、「効かない」のではなく「**効くのに使っていない**」。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **ORIX Navy（濃）** | **`#00163a`** | **可視 5 要素の塗り面**。ニュースカードの面 |
| **ORIX Navy** | **`#00264d`** | トップのメイン面（`main.tp` の背景）。文字色としても下層 5 要素 |
| **Brand Gradient** | **`linear-gradient(90deg, #1e4191 0, #7d1e69 35%, #cd1432 100%)`** | 青 → 紫 → 赤。CSS に `90deg` と `180deg` の 2 方向 |
| Gradient（対称版） | `linear-gradient(135deg, #1e4191 0%, #7d1e69 17.5%, #cd1432 50%, #7d1e69 82.5%, #1e4191 100%)` | **可視 5 要素**。中央を赤にして両端を青に戻す 5 点止め |
| **Link Blue** | **`#1e3c91`** | 下層のナビ文字（可視 9 要素）。**グラデーションの `#1e4191` とは 2 違いの別色** |
| Tab Active | `rgba(30, 65, 145, .5)` | ニュースタブの選択状態（`#1e4191` を 50%） |

> **`#1e4191`（グラデーション）と `#1e3c91`（リンク文字）は別の値。** どちらも実装されている。**片方に丸めない。**
>
> **グラデーションは 2 種類ある。** 帯として流すときは `90deg` の 3 点（青 → 紫 → 赤）、面として使うときは `135deg` の 5 点（青 → 紫 → 赤 → 紫 → 青）。停止位置 `17.5% / 50% / 82.5%` をそのまま写す。

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 22 / 79 要素**。**純黒を使う**
- **Text on Dark** (`#ffffff`): 紺面・動画の上（**可視 64 要素**）
- **Text Muted** (`#777777`): 下層の言語切替（可視 9 要素）
- **Text Secondary** (`#4a4a4a`): トップの日付・補助（可視 2 要素）
- **Text Disabled** (`#727272`): コピーライト
- **Scrim on Dark** (`rgba(255,255,255,.5)`): `#NewsReleases` などのハッシュタグ（可視 5 要素）
- **Surface Gray** (`#f5f5f5`): フッターナビのタブ面
- **Surface Blue Light** (`#f4f7fa`): 下層グローバルナビの面（可視 10 要素）
- **Surface Blue** (`#e8eff4`): 下層ナビのアクティブ面（可視 5 要素）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`。`html` は `transparent`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定**: **Noto Sans JP**（Google Fonts）。2 ページとも実質これ一本（可視 85 / 97 要素）
- `@font-face` は **100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900 の 9 ウェイト**を宣言
- 実際に `loaded` するのは **トップ 300 / 400 / 500 / 700 / 900、下層 400 / 500 / 700**
- 明朝体は使っていない

### 3.2 欧文フォント

- **専用の欧文 Web フォントは無い。** ラテン文字には `Arial`（OS）を和文スタックの先頭に足して当てる（可視 13 要素）
- `KEY NUMBERS` の見出しだけ `"Arial Black", "Archivo Black", "Noto Sans JP", sans-serif`
- **`Archivo Black` には `@font-face` が無い**（CSS 全文で 0 件）。読み込んでいないので**必ず外れ**、OS の `Arial Black` 頼みになる。名前が実在するぶん気づきにくい死んだ別名

### 3.3 font-family 指定

```css
/* 既定 */
body { font-family: "Noto Sans JP", sans-serif; font-size: 1.6rem; }   /* = 16px */

/* ラテン文字を含む UI */
font-family: Arial, "Noto Sans JP", sans-serif;

/* KEY NUMBERS の見出し（実サイトのまま） */
font-family: "Arial Black", "Archivo Black", "Noto Sans JP", sans-serif;
```

> **実サイトは `Archivo Black` を宣言しているが読み込んでいない。** 正しくは Google Fonts から Archivo Black を読むか、宣言から外して `"Arial Black", "Noto Sans JP", sans-serif` と書く。
>
> ルートは `html { font-size: 62.5% }` ＝ **10px**。`1.6rem` = 16px、`1.4rem` = 14px として計算する。

### 3.4 文字サイズ・ウェイト階層

**トップページ（1920px 設計・`clamp(12px, N vw, 9999px)`）**

| 用途 | 式 | 1920px | 1440px | 実測（1440px） |
|------|-----|--------|--------|----------------|
| **KEY NUMBERS の数字（大）** | `9.375vw` | 180px | 135px | `30` `0` |
| **KEY NUMBERS の数字** | `7.03125vw` | 135px | 101.25px | `1964` `3,653` `8.5` |
| 見出し（特大） | `6.7708333vw` | 130px | 97.5px | |
| セクション見出し | `3.125vw` | 60px | 45px | `KEY NUMBERS` |
| 数字の単位 | `1.8229167vw` | 35px | 26.25px | `設立` `グループ社員` |
| 中見出し | `1.5625vw` | 30px | 22.5px | `グローバルネットワーク` |
| 数字に添える語 | `1.4583333vw` | 28px | 21px | `年` `約` `ヵ国` |
| カード見出し | `1.0416667vw` | 20px | 15px | ニュース見出し |
| ラベル | `0.9375vw` | 18px | 13.5px | `データで見るオリックス` |
| **ナビ・本文** | **`0.8333333vw`** | **16px** | **12px**（下限） | **64 要素で最多** |

**下層ページ（固定 px）**

| 用途 | サイズ | ウェイト |
|------|--------|----------|
| ページ見出し | 48px | — |
| 節見出し | 24px | — |
| グローバルナビ | 20px | 700 |
| 本文 | 16px | 400 |
| **ナビ** | **14px** | 400 / 500 |
| 補助 | 12px / 11px | 400 |

- **ウェイトはトップが 300 / 400 / 500 / 700 / 900 の 5 段、下層が 400 / 500 / 700 の 3 段**
- トップの 900 は **`KEY NUMBERS` の数字と単位だけ**（11 要素）

### 3.5 行間・字間

**トップページ**

| 用途 | line-height | letter-spacing（1920px / 1440px） |
|------|-------------|-----------------------------------|
| **body（既定）** | **1.7**（= 27.2px） | `normal` |
| ナビ | 2.1875（= 26.25px / 12px） | **0.8px / 0.6px（= 0.05em）** |
| ニュース一覧 | 1.7 | 1.28px / **0.96px（= 0.08em）** |
| カード見出し | 1.75 | 1.3px / 0.975px（= 0.065em） |
| 数字の単位 | 1.14 | 3.5px / **2.625px（= 0.075em）** |
| 日付・補助 | 1.7 | 0.48px / 0.36px（= 0.03em） |
| フッター | 2.15 | — |
| 数字 | 1.0 | `normal` |

**下層ページ**

| 用途 | line-height | letter-spacing |
|------|-------------|----------------|
| **全要素** | 1.2（36 要素）/ 1.7（35 要素）/ 1.4 / 1.6 / 2.0 | **`normal` が 97/97 要素** |

- **トップだけ字間を当て、下層は 1 要素も当てていない。** 片方のページだけ見て「このサイトの字間」と書かない
- **`letter-spacing` も `vw` で動く。** 1440px で見た `0.6px` は 1920px では `0.8px`。**px をそのまま固定で書き写さない**
- `body` の `line-height: 1.7` は無単位なので、各要素が自分のサイズで再計算する

### 3.6 禁則処理・改行ルール

- **`word-break: auto-phrase` は実測 2 要素のみ**（`.caution__title`）。残り 1139 要素は `normal`。**サイト全体の方針ではない**
- `word-break: break-word` は **Cookie 同意バナー（`.cookie_consent-*`）由来**で、サイト本体の設計ではない
- `break-all` は使っていない

### 3.7 OpenType 機能

- **実測 0 要素。** ただし **Noto Sans JP は `palt` を持っている**
- 同一ページ・同一文字列（40px・13 文字）で実測: **`normal` 520.00px → `"palt"` 424.00px（−18.5%）/ `"halt"` 440.00px（−15.4%）**
- **「効くのに使っていない」。** 後から足すと既存ページと別物になる

### 3.8 縦書き

- **2 ページとも 0 要素。** 縦組みは使っていない

---

## 4. Component Stylings

### Buttons / Tabs

**ニュースのタブ（選択状態）**

```css
background-color: rgba(30, 65, 145, 0.5);   /* #1e4191 を 50% */
color: #ffffff;
font-size: 15px;            /* 1920px では 20px */
font-weight: 700;
line-height: 33px;
letter-spacing: 0.75px;     /* 1920px では 1px */
border-radius: 0;
```

**ニュースのタブ（非選択）**

```css
background-color: rgba(0, 23, 60, 0.9);     /* #00173c を 90% */
color: #ffffff;
```

**下層のグローバルナビ**

```css
background-color: #e8eff4;    /* アクティブ */
color: #1e3c91;
font-size: 20px;
font-weight: 700;
line-height: 34px;
letter-spacing: normal;
border-radius: 0;
```

**`VIEW ALL`（ピル）**

```css
border-radius: 26.25px;       /* 1920px では 35px */
```

### Cards

- **枠線も影も無い**（`box-shadow` は 2 ページとも 0 種）
- ニュースカードは `#00163a` のベタ塗りに白文字
- 決算発表のバーだけ **片側だけ丸いピル**: `border-radius: 30px 0 0 30px`

### KEY NUMBERS（数字の見せ方）

```css
/* 数字 */
font-size: clamp(12px, 7.03125vw, 9999px);   /* 1920px で 135px */
font-weight: 900;
line-height: 1.0;
letter-spacing: normal;

/* 単位（年・ヵ国・名） */
font-size: clamp(12px, 1.8229167vw, 9999px); /* 1920px で 35px */
font-weight: 900;
line-height: 1.14;
letter-spacing: 0.075em;

/* 囲みは円 */
border-radius: 50%;
```

---

## 5. Layout Principles

### Container

| ページ | 幅 |
|--------|----|
| トップ | **960px** |
| 下層 | **1024px** |

### Spacing（トップは `vw`）

| 用途 | 1920px | 1440px（実測） |
|------|--------|----------------|
| 最小の `gap` | 5px | 3.75px |
| カードの `gap` | 22px / 43px | 16.5px / 32.25px |
| 列の `gap` | 38px | 28.5px |
| セクション間 | 226px | 169.5px |
| 固定の `gap` | 30px / 8px | 30px / 6px |

### CSS Custom Properties

```css
:root {
  --ring-scale: 1;                                  /* JS が実数を書き込む（実測 15.33） */
  --triangle-size: clamp(0px, 0.7291666667vw, 9999px);
}
```

- **自社トークンは 2 個だけ。** 色もサイズもハードコード
- `--ring-scale` は JS が動的に書き換えるアニメーション用。**デザイントークンではない**

---

## 6. Depth & Elevation

- **`box-shadow` は 2 ページとも 0 種。影を一切使わない**
- **`border-radius` は 3 段しかない**: `50%`（円・10 要素）/ `26.25px`（ピル・1920px では 35px）/ `30px 0 0 30px`（片側ピル・2 要素）。**中間の角丸（4px / 8px）は使わない**
- 奥行きは **紺の濃淡**（`#00163a` / `#00264d` / `rgba(0,23,60,.9)`）と**グラデーションの帯**で作る

---

## 7. Do's and Don'ts

### Do（推奨）

- `html { font-size: 62.5% }`（= 10px）を書き、`body { font-size: 1.6rem }`（= 16px）で受ける
- **トップ相当の画面は `clamp(12px, N vw, 9999px)` で組む。** `N` は **設計幅 1920px から逆算**する（16px なら `0.8333333333vw`、18px なら `0.9375vw`、135px なら `7.03125vw`）
- **下層は固定 px ＋ `letter-spacing: normal`** にする
- `font-family` は `"Noto Sans JP", sans-serif`。ラテン文字を含む要素だけ `Arial` を先頭に足す
- グラデーションは帯なら `linear-gradient(90deg, #1e4191 0, #7d1e69 35%, #cd1432 100%)`、面なら `135deg` の 5 点止め
- 数字は weight 900 / `line-height: 1.0` / `letter-spacing: normal`、単位は weight 900 / 0.075em
- `border-radius` は `50%` か大きなピルか 0 のどれか
- 影は使わない

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** Noto Sans JP は `palt` が**効く**（−18.5%）ので、足すと既存ページと別物になる
- **`clamp()` の上限を書き換えない。** 実サイトは `9999px` ＝上限なしで、大画面ほど素直に大きくなる設計
- **1440px で測った px をそのまま固定値で書かない。** それは設計値の 0.75 倍（`101.25px` の設計値は `135px`）
- **下層に字間を当てない**（実測 97/97 要素が `normal`）
- **`Archivo Black` を宣言するなら読み込む。** 実サイトは `@font-face` が無く必ず外れる
- `#1e4191` と `#1e3c91` を片方に丸めない（どちらも実装されている）
- **中間の角丸（4px / 8px / 12px）を使わない**
- **`box-shadow` を足さない**（2 ページとも 0 種）
- `word-break: auto-phrase` をサイト全体に当てない（実測 2 要素だけ）
- **ヒーローの文字を動画に焼き込む設計を真似るなら、同じ文言を DOM にも置く**（実サイトは `<video>` の中だけで、テキストとして一切残っていない）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | ≤ 640px | **CSS 全文で最多**（トップ 79 / 下層 85 件）。主たる境目 |
| Desktop | ≥ 641px | トップ 2 / 下層 3 件 |
| Tablet | 641〜1000px | 1 件 |
| Wide | ≤ 1090px | 2 件 |
| Tiny | ≤ 400px / ≤ 344px / ≤ 320px | 最小幅の微調整 |

### フォントサイズの調整

- **`html` は 8 幅（1920 / 1440 / 1200 / 1024 / 834 / 768 / 767 / 375px）すべてで 10px 固定**
- **`body` は 375px でだけ 16px → 14px に落ちる**（`body { max-width: 640px; min-width: 320px; font-size: 1.4rem }`）。`line-height` も 27.2px → 22.4px になる
- **トップの文字サイズは `vw` で連続的に動く。** 下限 12px に当たるのは 1440px 前後から下
- **ルートだけ測ると「完全固定のサイト」に見える。** 要素側の `clamp()` を必ず確認する

### タッチターゲット

- ニュースのタブは `line-height: 33px` — 44px にはわずかに届かない
- 下層のグローバルナビは `line-height: 34px` ＋ 20px — **モバイルでは高さを確保する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ORIX Navy (濃):  #00163a
ORIX Navy:       #00264d
Brand Gradient:  linear-gradient(90deg, #1e4191 0, #7d1e69 35%, #cd1432 100%)
Gradient (面):   linear-gradient(135deg, #1e4191 0%, #7d1e69 17.5%, #cd1432 50%, #7d1e69 82.5%, #1e4191 100%)
Link Blue:       #1e3c91
Text Color:      #000000
Text on Dark:    #ffffff
Text Muted:      #777777
Surface Blue:    #f4f7fa / #e8eff4
Surface Gray:    #f5f5f5
Background:      #ffffff
Font (JP): "Noto Sans JP", sans-serif
Font (EN): Arial, "Noto Sans JP", sans-serif
Root Size: 62.5%（= 10px）/ body 1.6rem（= 16px・375px では 1.4rem）
Weights: 300 / 400 / 500 / 700 / 900（トップ） / 400 / 500 / 700（下層）
Line Height: 1.7（body） / 1.2 / 1.4 / 1.75 / 2.15
Letter Spacing: normal（下層は全部） / 0.05em / 0.08em / 0.075em（トップ）
Fluid: clamp(12px, N vw, 9999px) — N は設計幅 1920px から逆算
Border Radius: 50% / 35px（ピル） / 30px 0 0 30px / 0
Box Shadow: なし
Container: 960px（トップ） / 1024px（下層）
```

### プロンプト例

```
オリックスのデザインシステムに従って、企業情報のトップページを作成してください。
- html に font-size: 62.5%（= 10px）、body に 1.6rem（= 16px）/ line-height: 1.7
- font-family は "Noto Sans JP", sans-serif。ラテン文字を含む要素だけ Arial を先頭に足す
- 文字サイズ・字間・gap・角丸はすべて clamp(12px, N vw, 9999px) で書き、N は設計幅 1920px から逆算する
  （本文 16px → 0.8333333333vw、ラベル 18px → 0.9375vw、数字 135px → 7.03125vw）
- ヒーローは全面動画 ＋ 白文字。ただし見出しのテキストは DOM にも置く
- KEY NUMBERS の数字は weight 900 / line-height 1.0 / letter-spacing normal、単位は 0.075em
- 面は #00163a / #00264d の紺。帯に linear-gradient(90deg, #1e4191 0, #7d1e69 35%, #cd1432 100%)
- border-radius は 50% か 35px のピルか 0 のどれか。4px や 8px は使わない
- box-shadow は書かない
- font-feature-settings は書かない（Noto Sans JP は palt が効いてしまい、既存と別物になる）
- コンテナは 960px、ブレークポイントは 640 / 641px
```
