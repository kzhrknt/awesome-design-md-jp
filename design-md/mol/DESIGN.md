# DESIGN.md — 商船三井（MOL / Mitsui O.S.K. Lines）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-06 / 対象: `https://www.mol.co.jp/`, `/corporate/message/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 海の青 2 色をグラデーションで結ぶ。角丸は円（`50%`）だけ、四角い面に角丸を当てない。写真を全面に敷き、その上に**影のない白文字**を置く
- **密度**: 低い。ヒーローのコピーは 30px で 2 行、周囲を大きく空ける。本文は 16px / `line-height: 1.7`
- **キーワード**: MOLブルー、Zen Kaku Gothic New、円形ボタン、写真全面、グラデーション

**このサイトの核心は4つある。**

1. **ヒーローの大見出しは実テキストで組んである。** `.mainCopy`「青い海から人々の毎日を支え、豊かな未来をひらきます」は **30px / `letter-spacing: 2.4px`（= 0.08em）/ `line-height: 43.8px`（= 1.46）/ `#ffffff`**、矩形 454×75px。**`text-shadow` は `none`** で、写真の明度だけで読ませている。海運大手では珍しく画像に焼き込んでいない
2. **本文書体は Zen Kaku Gothic New 一本**（実測 トップ 54 要素 / 下層 72 要素）。Google Fonts を **`@import`** で読む（`<link>` は 0 件）。`wght@400;500;700` の **3 本だけ**で、**600 は読み込んでいない**
3. **`Zen Kaku Gothic New` は `palt` のテーブルを持たない。** 同一ページ・同一文字列で `font-feature-settings` だけ変えて幅を実測すると **`normal` 560.00px / `"palt"` 560.00px / `"halt"` 560.00px** と **1px も動かない**。同じページのヒラギノ角ゴ ProN は 518.41px → 419.33px（**−19.1%**）と効くので、書体側の問題。**詰めは `letter-spacing` でやるしかない**
4. **`body { line-height: 1 }` の無単位 1 が全子孫に降りる**（実測 比率 1.00 が 27 要素、1 未満は 0 件）。本文ブロックが自分で宣言し直さないと行が潰れる

**CSS Custom Properties は 1 個も無い**（`total: 0` / 読めなかったシート 0 枚で確定）。色もサイズも全部ハードコード。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **MOL Blue（濃）** | **`#005396`** | **可視 11 要素の塗り面**（下層）。`NEWS RELEASE 一覧へ` `企業情報TOP` などの面、見出しの文字色（可視 4 / 12 要素） |
| **MOL Cyan（淡）** | **`#00a0dc`** | `NEW` バッジの面（15px / weight 600）。グラデーションの右端 |
| **Brand Gradient** | **`linear-gradient(to right, #005396, #00a0dc)`** | **可視 10 要素**。`VIEW MORE` の円形ボタンの面。濃 → 淡を左から右へ |
| **Overlay Gradient** | `linear-gradient(to top, rgba(0,83,150,.75), rgba(0,160,220,.75))` | 写真の上に敷くヴェール（1 要素）。**同じ 2 色を 75% の不透明度で下から上へ** |

> **青 2 色は「濃い方が面、淡い方がアクセント」。** グラデーションは必ず **濃 → 淡**（`to right`）、ヴェールだけ **下 → 上**（`to top`）で向きが変わる。角度は `deg` ではなくキーワードで書かれている。

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・ナビ。**可視 27 / 39 要素**。**このサイトは本文に純黒を使う**
- **Text on Dark** (`#ffffff`): ヒーロー・写真の上（**可視 47 / 22 要素**）
- **Surface Warm** (`#f2f2ef`): パンくず・サイドナビの面（**わずかに黄みがかった灰**。`#f2f2f2` ではない）
- **Surface Gray** (`#efefef`): フッター近辺の面
- **Tint Blue** (`rgba(0,83,150,.05)`): 下層の図版ブロックの面（**ブランド色を 5% で敷く**）
- **Scrim White** (`rgba(255,255,255,.6)`): ヘッダーの面。スクロールしても背景が透ける
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定**: **Zen Kaku Gothic New**（Google Fonts / `wght@400;500;700`）。トップ 54 要素・下層 72 要素で、実質これ一本
- **フォールバック**: `"Helvetica Neue"` → `"Hiragino Kaku Gothic ProN"` → `"Yu Gothic medium"` → `"Hiragino Sans"` → `Meiryo` → `sans-serif`
- 明朝体は使っていない（セリフ系の和文は 2 ページとも可視 0 要素）

### 3.2 欧文フォント

- **Montserrat**（Google Fonts / `wght@400;500;600;700`）: 和文スタックの**先頭に置く別系統**。`VIEW MORE` `NEW` `NEWS RELEASE` などラテン文字の UI に当たる（トップ 31 要素）
- **Noto Sans**（`wght@700`）: **数字専用**。BAM セクションの通し番号 `013` `012` `011` を 62px / weight 700 / `letter-spacing: 3.1px` で組む（6 要素）

### 3.3 font-family 指定

```css
/* 既定（和文・UI） */
font-family: 'Zen Kaku Gothic New', "Helvetica Neue", "Hiragino Kaku Gothic ProN",
             "Yu Gothic medium", "Hiragino Sans", Meiryo, sans-serif;

/* ラテン文字が混じる UI（Montserrat を先頭に足すだけ） */
font-family: Montserrat, 'Zen Kaku Gothic New', "Helvetica Neue", "Hiragino Kaku Gothic ProN",
             "Yu Gothic medium", "Hiragino Sans", Meiryo, sans-serif;

/* 通し番号だけ */
font-family: "Noto Sans", sans-serif;
```

```css
/* Google Fonts は @import で読む（<link> は使っていない） */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Noto+Sans:wght@700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap");
```

> **実サイトは `"Yu Gothic medium"` と小文字で書いている。** CSS のフォント名照合は大文字小文字を無視するので実害は無いが、**正しくは `"Yu Gothic Medium"`**。新規実装ではこちらで書く。
>
> **和欧の二層は「Montserrat を先頭に足すかどうか」の 1 点だけで切り替えている。** 和文の見え方は変わらない（Montserrat に和文グリフが無いため）ので、**ラテン文字を含む要素にだけ付ける**。

### 3.4 文字サイズ・ウェイト階層

| 用途 | サイズ | ウェイト | 実測 |
|------|--------|----------|------|
| **ヒーローのコピー** | **30px** | 400（span は 500） | `.mainCopy`。2 行で 454×75px |
| **BAM の通し番号** | **62px** | 700 | `013` `012`。Noto Sans |
| **下層の大見出し** | **55px** | 400 | `社長メッセージ`（1 要素） |
| **下層のリード** | **45px** | 400 | 7 要素 |
| 中見出し | 24px / 20px | 400 | |
| カード見出し | 18px | 700 | `マイクロプラスチック回収装置` |
| **本文** | **16px** | 400 | **トップ 27 / 下層 28 要素で最多** |
| ナビ | 14px | 500 | トップ 24 / 下層 23 要素 |
| 注記・フッター | 12px | 400 | |

- **ウェイトは 400 / 500 / 700 の 3 段**（Google Fonts の `wght@` と一致）。トップでは 500 が最多（38 要素）
- **600 を和文に当ててはいけない。** Zen Kaku Gothic New は 600 を読み込んでいないので、CSS フォントマッチングで 500 か 700 に解決される。実測の 600（10 要素）は **全部 Montserrat スタックのラテン文字**（`NEWS RELEASE` `STATEMENT` `NEW`）

### 3.5 行間・字間

| 用途 | line-height | letter-spacing | 実測 |
|------|-------------|----------------|------|
| **body（既定）** | **`1`（無単位）** | `normal` | **比率 1.00 が 27 要素。1 未満は 1 件も無い** |
| 本文 | 1.7 | `normal` | **下層で 34 要素**。読み物はここ |
| BAM の説明文 | 1.7 | **2.24px（= 0.14em）** | 16px に対して。**このサイトで最も広い字間** |
| ヒーローのコピー | 1.46 | **2.4px（= 0.08em）** | 30px に対して |
| カード見出し | 1.61 | 2.4px（= 0.13em） | 18px に対して |
| リンク・カード | 1.4 | `normal` | トップ 22 / 下層 26 要素 |
| ナビ | 1.1 | `normal` | |
| 通し番号 | 1.0 | 3.1px（= 0.05em） | |

- **`letter-spacing` は各要素が `em` を持つ型**（継承ではない）。同じ `2.4px` が 30px の見出しでは 0.08em、18px のカード見出しでは 0.13em になる。**px をそのまま他のサイズに移植しない**
- **`line-height: 1` の既定は必ず上書きする。** `body` に無単位 1 が書いてあるので、宣言し忘れた本文ブロックは行が文字と同じ高さで組まれる

### 3.6 禁則処理・改行ルール

- **`body { word-wrap: break-word; overflow-wrap: break-word }`** — 長い URL や英単語を折り返す保険
- **`word-break: break-all` は `.break` クラスのみ**（CSS 全文で 1 箇所）。body には当てていない（body の computed は `normal`）
- `word-break: auto-phrase` は使っていない
- ヒーローのコピーは `<span>` で 2 行に手で割ってある（`青い海から人々の毎日を支え、` / `豊かな未来をひらきます`）。**自動折り返しに任せていない**

### 3.7 OpenType 機能

- **`font-feature-settings` は 2 ページとも 0 要素。**
- **足しても効かない。** Zen Kaku Gothic New は `palt` のテーブルを持たず、実測で `normal` / `"palt"` / `"halt"` の 3 条件とも **560.00px で完全に同じ**（40px・13 文字）。同条件のヒラギノ角ゴ ProN は 518.41px → 419.33px（−19.1%）なので、測り方の問題ではない
- **詰めたいときは `letter-spacing` に負値を当てる。** ただしこのサイトは逆に **正の字間（0.08〜0.14em）で空ける側**の設計

### 3.8 縦書き

- **実測 1 要素のみ**、しかも `SCROLL` という欧文の側面タブ（`writing-mode: vertical-rl`）
- **和文の縦組みは 1 つも無い。** このサイトを真似て縦組みを実装しない

---

## 4. Component Stylings

### Buttons

**`VIEW MORE`（主 CTA・円形）**

```css
width: 100px;
height: 100px;
border-radius: 50%;
background-image: linear-gradient(to right, #005396, #00a0dc);
color: #ffffff;
font-family: Montserrat, 'Zen Kaku Gothic New', sans-serif;
font-size: 14px;
font-weight: 400;
line-height: 18.2px;      /* 1.3 */
letter-spacing: 1.4px;    /* 0.1em */
border: 0;
padding: 0;
box-shadow: none;
```

**`NEWS RELEASE 一覧へ`（副 CTA・角丸なし）**

```css
background-color: #005396;
color: #ffffff;
font-size: 16px;
font-weight: 400;
line-height: 16px;        /* body の無単位 1 がそのまま */
letter-spacing: normal;
border-radius: 0;
border: 0;
box-shadow: none;
```

> **CTA は 2 種類しかない。** 円形グラデーションの `VIEW MORE` と、角丸ゼロのベタ塗り。**この 2 つを混ぜない**（円にベタ塗り、四角にグラデーションを当てない）。

### Badges / Chips

```css
/* NEW */
background-color: #00a0dc;
color: #ffffff;
font-family: Montserrat, …;
font-size: 15px;
font-weight: 600;         /* Montserrat は 600 を読み込んでいるので有効 */
line-height: 15px;
border-radius: 0;
```

### Cards

- **枠線も影も無い。** 写真 ＋ テキストを並べるだけ
- カード見出し 18px / weight 700 / `line-height: 1.61` / `letter-spacing: 2.4px`
- 説明文 16px / `line-height: 1.7` / `letter-spacing: 2.24px`

---

## 5. Layout Principles

### Container

| 用途 | 幅 | 実測 |
|------|----|----|
| **本文コンテナ** | **1100px** | トップ 3 / 下層 5 要素で最多 |
| 広めのブロック | 1120px | 各 1 要素 |
| 最小幅 | 320px | `body { min-width: 320px }` |

### Spacing / Grid

- `gap` の宣言は 0 件。**余白は `margin` / `padding` で組んでいる**
- `body { overflow-x: hidden; width: 100% }` — 横スクロールを殺してから全面写真を敷く

---

## 6. Depth & Elevation

- **`box-shadow` は 2 ページとも 0 種。影を一切使わない**
- **`border-radius` は `50%` の 22 要素のみ**（`VIEW MORE` とカルーセルのドット）。**四角い面には 1 つも角丸が無い**
- 奥行きは **写真の上のグラデーションヴェール**（`linear-gradient(to top, rgba(0,83,150,.75), rgba(0,160,220,.75))`）で作る

---

## 7. Do's and Don'ts

### Do（推奨）

- `font-family` は `'Zen Kaku Gothic New'` を先頭に。ラテン文字を含む要素だけ `Montserrat` を前に足す
- **本文ブロックには必ず `line-height` を宣言する**（`body` の無単位 1 が降りてくる）
- 字間は `em` で各要素に当てる。ヒーロー 0.08em、説明文 0.14em、カード見出し 0.13em
- CTA は円形グラデーション（100×100px）か、角丸ゼロのベタ塗りのどちらか
- ブランド色のグラデーションは `linear-gradient(to right, #005396, #00a0dc)`。濃 → 淡の向きを守る
- 写真の上の文字は `#ffffff`、**`text-shadow` は付けない**（実サイトも `none`）
- 見出しの改行は `<span>` で手で割る

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** Zen Kaku Gothic New には `palt` のテーブルが無く、実測で 1px も動かない（560.00px → 560.00px）
- **和文に `font-weight: 600` を当てない。** Zen Kaku Gothic New は 400/500/700 しか読んでおらず、意図しない太さに解決される
- **四角い面に `border-radius` を当てない。** 角丸は円（`50%`）だけ
- **`box-shadow` を足さない**（2 ページとも 0 種）
- **縦組みを実装しない。** 実測の `vertical-rl` は `SCROLL` の側面タブ 1 件だけ
- `letter-spacing` の px 値を他のサイズへ移植しない（各要素が `em` を持つ設計）
- **CSS 変数を前提にしない。** このサイトは Custom Properties を 1 個も使っていない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | ≤ 840px | **CSS 全文で最多**（トップ 64 / 下層 142 件）。主たる境目 |
| Desktop | ≥ 840px | トップ 26 / 下層 68 件 |
| Small | ≤ 520px | トップ 22 / 下層 27 件 |
| Wide | ≥ 1366px / ≥ 1910px | 大画面の微調整 |

### フォントサイズの調整

- **`html` も `body` も 6 幅（1920 / 1440 / 1200 / 1024 / 834 / 768 / 767 / 375px）すべてで 16px 固定。** `html { font-size }` の宣言は CSS に 1 つも無く、**UA 既定の 16px**
- ヒーローのコピーだけ **834px を境に 30px → 16px** に落ちる
- 一部の見出しに `clamp(22px, 2.5vw, 28px)` / `clamp(18px, 2.18vw, 24px)` / `clamp(16px, 1.8vw, 20px)` を `!important` 付きで当てている

### タッチターゲット

- `VIEW MORE` 100×100px — 余裕で 44px を満たす
- ナビ 14px / `line-height: 1.1` は高さを別途確保する必要がある

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
MOL Blue:      #005396
MOL Cyan:      #00a0dc
Gradient:      linear-gradient(to right, #005396, #00a0dc)
Text Color:    #000000
Text on Photo: #ffffff
Surface Warm:  #f2f2ef
Tint Blue:     rgba(0, 83, 150, 0.05)
Background:    #ffffff
Font (JP): 'Zen Kaku Gothic New', "Helvetica Neue", "Hiragino Kaku Gothic ProN", "Yu Gothic Medium", "Hiragino Sans", Meiryo, sans-serif
Font (EN): Montserrat, 'Zen Kaku Gothic New', … （和文スタックの先頭に足す）
Font (数字): "Noto Sans", sans-serif
Weights: 400 / 500 / 700（600 は和文に使わない）
Body Size: 16px
Line Height: 1（body の既定・要上書き） / 1.7（本文） / 1.46（ヒーロー） / 1.4（カード）
Letter Spacing: normal（既定） / 0.08em（ヒーロー） / 0.14em（説明文）
Border Radius: 50%（円のみ。四角は 0）
Box Shadow: なし
Container: 1100px
```

### プロンプト例

```
商船三井のデザインシステムに従って、事業紹介ページを作成してください。
- font-family は 'Zen Kaku Gothic New' を先頭に、ラテン文字を含む要素だけ Montserrat を前に足す
- font-weight は 400 / 500 / 700 のみ。600 は和文に使わない
- body に line-height: 1 を置き、本文ブロックには 1.7 を必ず宣言し直す
- ヒーローは全面写真 ＋ 白文字 30px / letter-spacing 0.08em / line-height 1.46、text-shadow は付けない
- 見出しの改行は <span> で手で割る
- 主 CTA は 100×100px の円に linear-gradient(to right, #005396, #00a0dc)、14px / letter-spacing 0.1em
- 副 CTA は #005396 のベタ塗り・border-radius 0 / 16px
- NEW バッジは #00a0dc / 15px / weight 600（Montserrat）
- カードに枠線も影も付けない。border-radius は円以外 0
- font-feature-settings は書かない（Zen Kaku Gothic New には palt が無く効かない）
- コンテナは 1100px、モバイルは 840px で切り替える
```
