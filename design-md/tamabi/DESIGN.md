# DESIGN.md — 多摩美術大学（Tama Art University）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-08 / 対象: `https://www.tamabi.ac.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **詰めない。** `html` に `font-feature-settings: normal` を明示し、`letter-spacing` は 2 ページとも**全要素 `normal`**。代わりに **`YakuHanJPs` をスタック先頭に置いて約物だけ詰める**。本文 18px・行間 1.75 の広い組みに、**12 カラム × gap 30px** のグリッドを通す
- **密度**: 低い。作品写真を大きく見せ、文字は 18px で余裕を持って置く。トップの可視テキストは 144 要素
- **キーワード**: 約物だけ詰める、本文18px、行間1.75、12カラム30pxグリッド、タマビブルー

**このサイトの核心は5つある。**

1. **`html { font-feature-settings: normal }` を明示的に書いている。** 「詰めない」ことを CSS に宣言している珍しい作り。実際 `font-feature-settings` の分布は 2 ページとも **0 件**、`letter-spacing` も **396 / 144 要素すべて `normal`**
2. **約物だけは `YakuHanJPs` で詰めている。** 本文スタックの先頭が `YakuHanJPs`（約物だけのサブセットフォント・自社ホスト配信）で、**`loaded`**。括弧・句読点だけが半角幅に寄り、仮名・漢字は素のまま
3. **そもそも `palt` は効かない書体。** 同一ページ・同一書体で隠し div を作って測ると、Zen Kaku Gothic Antique は **`normal` 2000.00px → `"palt"` 2000.00px で 1px も動かない**。`palt` テーブルを持っていない。**`palt` を足しても無駄**なので、2 の方式が唯一の選択肢
4. **書体が二層に分かれている。** ナビ・見出し・キャンペーンは `YakuHanJPs, "Zen Kaku Gothic Antique", sans-serif`（可視 141 / 55 要素）、ニュース本文・カードは **`"Helvetica Neue", Helvetica, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Arial`（可視 249 / 89 要素）で Web フォントを使わない**
5. **`html { font-size: 62.5% }` = 10px、`body { font-size: 1.8rem }` = 18px が 9 幅すべてで完全固定。** 本文が 18px というのはこの集の中でも大きい側

**CSS Custom Properties は 7 個。** 少ないが、`--content-grid-template-columns: 12` / `--content-grid-gap: 30px` が**レイアウトの本体**になっている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | トークン名 | 実測 |
|------|--------|-----------|------|
| **タマビブルー** | **`#0047b8`** | `--color-tamabi-blue-primary` | **塗り面 8 / 7 要素**。`入試情報` の帯、`WEB出願` のポップアップ、`大学紹介` ボタン。下層では**リンクの文字色**にも（3 要素） |
| **墨（本文・見出し）** | **`#020202`** | `--color-black-primary` | **文字色 310 要素（最多）**。**純黒ではなく RGB 2 の墨** |
| **生成りのグレー** | **`#f6f5f0`** | `--color-gray-primary` | セクションの地。**わずかに黄を含む** |

### Neutral（ニュートラル）

- **Text Primary** (`#020202`): 本文・見出し（可視 310 要素）
- **Text on Dark** (`#ffffff`): 青い帯・黒い帯の上（可視 80 / 78 要素）
- **Text Muted** (`#808080`): タブの非選択（可視 5 要素）
- **Placeholder Surface** (`#eeeeee`): **面 125 要素（最多）**。画像の遅延読み込み枠
- **Surface Warm** (`#f6f5f0`): セクションの地
- **Surface Warm 2** (`#ddd9c8`): `多摩美術大学についてトップ` のボタン（下層）
- **Overlay** (`rgba(2, 2, 2, 0.5)`): ヒーローの作品写真に重ねるベール。**黒ではなく `#020202` の 50%**
- **Background** (`#ffffff`): ページ背景

> **`pageBackground.resolved` は `rgb(0, 71, 184)` を返すが、これは `WEB出願` のポップアップ。** `heroCover` が `heroCovered: true`（`div.index-module-scss-module__…__slideI` の `<img>` 1440×830）で、`note` に「html/body ともに塗り指定なし。コンテンツ領域の地色は UA 既定（白）の可能性が高い」と出る。**地色は白。**

> **純黒 `#000000` も 1 要素だけある**（`すべてのお知らせを見る`）。設計としては `#020202` が正で、こちらは取りこぼし。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（Web フォント）**: **Zen Kaku Gothic Antique**（Google Fonts・400 / 700）。可視 141 要素（トップ）/ 55 要素（下層）
- **約物サブセット**: **YakuHanJPs**（自社ホスト `www.tamabi.ac.jp` から配信・`loaded`）
- **ゴシック体（OS ローカル）**: **ヒラギノ角ゴ（Hiragino Sans / Hiragino Kaku Gothic ProN）**。可視 **249 要素（トップで最多）**
- **明朝体**: 使用しない（2 ページとも可視 0 要素）

### 3.2 欧文フォント

- **Helvetica Neue → Helvetica → Arial**（OS ローカル）。ニュース・カードのスタックの先頭 3 語
- Web フォントの欧文は読み込んでいない（`Zen Kaku Gothic Antique` の欧文グリフを使う）

### 3.3 font-family 指定

```css
/* A. ナビ・見出し・キャンペーン（可視 141 / 55 要素） */
font-family: YakuHanJPs, "Zen Kaku Gothic Antique", sans-serif;

/* B. ニュース・カード・一覧（可視 249 / 89 要素 ＝ トップでは最多） */
font-family: "Helvetica Neue", Helvetica, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Arial;
```

```css
/* トークンとしても宣言されているが、可視 0 要素（実装は直書き） */
:root { --font-zen-kaku-gothic: "Zen Kaku Gothic Antique"; }
```

```html
<link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@400;500;700&display=swap" rel="stylesheet">
```

**フォールバックの考え方**:
- **A は「約物 → 和欧 → generic」の 3 段。** `YakuHanJPs` が約物だけを拾い、残りを Zen Kaku Gothic Antique が受ける
- **B には generic family が無い。** 末尾が `Arial` で終わっており、Arial は和文グリフを持たないので、**ヒラギノの無い環境（Windows）では和文が UA 既定（游ゴシック / MS Pゴシック）に落ちる**
- **実サイトはこうだが、正しくは `…, Arial, sans-serif` と受け皿を足す**
- **フォント要求は 51 件、ホストは `fonts.gstatic.com` と `www.tamabi.ac.jp` の 2 つ**。後者が YakuHanJPs

> **Google Fonts の URL は `wght@400;500;700` を読んでいるが、500 は 1 要素も使っていない**（`document.fonts` で `unloaded`、分布にも 500 が出ない）。**宣言だけで未使用。**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Statement** | Zen Kaku Gothic Antique | **80px** | 700 | **0.75**（60px） | normal | `自由と意力`。**行間が 1 を下回る** |
| **Page Title（下層 h1）** | Zen Kaku Gothic Antique | **60px** | 700 | 1.35 | normal | `多摩美術大学について` |
| **Section Heading** | Zen Kaku Gothic Antique | **45px** | 700 | **1.35**（60.75px） | normal | `ピックアップ` `イベント・展示` `多摩美を知る` |
| **Sub Heading** | Zen Kaku Gothic Antique | **30px** | 700 | 1.50 | normal | `おすすめ` `メッセージ` `教育理念` |
| **Lead** | Zen Kaku Gothic Antique | **30px** | 400 | **2.00** | normal | `観察し、思考しよう。構想し、実行しよう。…` |
| **Card Title** | Zen Kaku Gothic Antique | **24px** | 700 | 1.50 | normal | `受験生の方へ` `在学生の方へ` |
| **Nav / Utility** | Zen Kaku Gothic Antique | **20px** | 700 | **1.45**（28px） | normal | `WEB出願` `学科を探す`（可視 113 要素） |
| **Body** | Zen Kaku Gothic Antique | **18px**（= 1.8rem） | 400 | **1.75**（31.5px） | normal | **既定**（`body`） |
| **List / Caption** | ヒラギノ角ゴ（OS） | **14px** | 400 | **1.75**（24.5px） | normal | ニュース・カードの本文（**可視 248 要素で最多**） |
| **Micro** | ヒラギノ角ゴ（OS） | 12px | 400 / 700 | 1.35 | normal | クレジット、パンくず |
| **欧文の見出し** | Zen Kaku Gothic Antique | 25px | 700 | 1.80 | normal | `Freedom and Will` |

**ウェイトは 400 と 700 の 2 段だけ。** 500 は読み込んでいるが使っていない（下層に 600 が 1 要素あるのみ）。

> **幅の実測でウェイトは判定できない。** 和文の文字列で `font-weight` を 100〜900 に振ると **500 だけ 1950px、残り 8 段は 2000px** に揃う（CJK グリフが等幅なため、差が出たのは測定が 500 のファイルを呼んだからで、実ページでは 500 を使っていない）。**判定は `document.fonts` の `status` と Google Fonts の URL で行う。**

### 3.5 行間・字間

- **本文の行間**: **1.75**（`body { line-height: 31.5px }` = 18 × 1.75）。**可視 256 / 94 要素で最多**
- **ナビの行間**: 1.40〜1.45（117 要素）
- **大見出しの行間**: **1.35**（45px / 60px の見出し）
- **リードの行間**: **2.00**（`観察し、思考しよう。…` の 1 要素）
- **`自由と意力` だけ 0.75**（80px → 60px）。**タイトル専用の詰めた行送り**
- **字間**: **2 ページとも全要素 `normal`**（396 / 144 要素）

> **`line-height` は無単位。** 14px の要素も 18px の要素も比率 1.75 のままなので、`em` や px の絶対値ではないと確定できる。**`body` に 1 回書いて継承させる設計**なので、子要素で宣言し直さない（見出しだけ個別に 1.35 / 1.50 / 2.00 を当てる）。

### 3.6 禁則処理・改行ルール

- `body { word-break: normal }`（9 幅すべて）。`break-all` も `auto-phrase` も使わない
- 約物の詰まりは **`YakuHanJPs` が担当**する。CSS の `letter-spacing` では一切調整しない

### 3.7 OpenType 機能

```css
/* 実サイトの宣言。「詰めない」を明示している */
html { font-feature-settings: normal; }
```

- **`font-feature-settings` の実測は 2 ページとも 0 件。** `palt` も `halt` も `tnum` も使わない
- **そもそも Zen Kaku Gothic Antique は `palt` が効かない。** 隠し div の実測で `normal` 2000.00px → `"palt"` 2000.00px（差分 0px）。**`palt` を足しても 1px も変わらない**
- 代わりに **`YakuHanJPs` をスタック先頭に置く**ことで約物だけを詰めている

> **「字間 `normal` 100%」を「詰めに無関心な設計」と読まない。** 約物の処理はフォント側に逃がしてあり、`letter-spacing` と `font-feature-settings` を両方 `normal` に固定しているのは**意図的な選択**。

### 3.8 縦書き

- 使用しない（2 ページとも `writing-mode: vertical-*` が 0 要素）

### 3.9 ルートと本文の実測（9 幅）

| 幅 | `html` | `body` | `body` の `line-height` | `h2` | `p` |
|----|--------|--------|------------------------|------|-----|
| 1940 / 1440 / 1200 / 1024 / 834px | **10px** | **18px** | **31.5px** | **45px / 60.75px** | 19px / 26.6px |
| **800px 以下**（768 / 767 / 390 / 375px） | **10px** | **18px** | **31.5px** | **27.5px / 37.125px** | 15px / 21px |

```css
html { font-size: 62.5%; font-feature-settings: normal; }  /* = 10px */
body { font-size: 1.8rem; }                                /* = 18px */
```

- **ルートも本文も 9 幅すべてで 1 度も動かない。** `vw` も `clamp()` も `%` の入れ子も使っていない
- **変えるのは見出しとカードの文字だけ**（800px を境に h2 が 45px → 27.5px、p が 19px → 15px）
- **本文 18px は意図的に大きい。** `rem` で書くときは `1.8rem`

---

## 4. Component Stylings

### Buttons

**Primary（青の面）**
- Background: `#0047b8` / Text: `#ffffff`
- Font Size: 18px / Weight: 400 / Letter Spacing: normal / Line Height: 1.75
- Border Radius: **6px**（入試情報の帯）/ **2px**（`大学紹介`）/ **0px**（全幅の帯）

**Secondary（白地・枠線）**
- Text: `#020202` / Border: `1px solid #808080`
- Font Size: 18px / Weight: 400
- Border Radius: **3px**

**Dark（黒の面）**
- Background: `#020202` / Text: `#ffffff`
- Font Size: 18px / Weight: 400 / Border Radius: 0px

**Nav Item**
- Font Size: 20px / Weight: 700 / Color: `#020202`（白背景）または `#ffffff`（写真の上）
- Border Radius: 0px

### Cards

- **特設サイトのカード**: Border Radius **15px**（実測 5 要素）、写真の上に `rgba(2,2,2,0.5)` のベールと白文字
- **教員カード**: Border Radius **30px**（下層で 40 要素）、写真を角丸で抜く
- **一覧カード**: Border Radius 3px、枠線 `1px solid #808080`
- **画像の読み込み枠**: `#eeeeee` の面（125 要素）

### Shapes

- アイコン・ドット: `border-radius: 100%`（15 要素）
- スクロールインジケータ: `conic-gradient(rgba(0,0,0,0) 0%, #000000 0%, #000000 Ndeg, rgba(0,0,0,0) Ndeg)` で**円弧の進捗**を描く（4 要素）

---

## 5. Layout Principles

### Grid

```css
:root {
  --content-grid-template-columns: 12;
  --content-grid-gap: 30px;
  --content-base-gap: 30px;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 30px;
}
```

- **12 カラム × gap 30px が設計の本体。** 1440px のコンテナで 1 カラム = **82.5px**
- `gap: 5px` が **101 箇所**出るが、これはカードの内部要素（タイトルと補足の間など）の最小単位

### Container

| 幅 | 実測 | 用途 |
|----|------|------|
| **1440px** | **2 箇所（トップ）/ 6 箇所（下層）** | 標準 |
| 1090px | 1 箇所 | 本文ブロック |
| 100% | 3 箇所 | 全幅セクション |

### Gap Scale

`4px` / **`5px`（最小単位・101 箇所）** / `10px` / `16px` / `20px` / **`30px`（グリッド）** / `40px` / `44px`

### Border Radius Scale

| 用途 | 値 | 実測 |
|------|----|------|
| 教員カード | **30px** | 40 要素（下層） |
| キャンパス写真 | 20px | 2 要素 |
| 特設サイトカード | **15px** | 5 要素 |
| 入試情報の帯 | 6px | 1 要素 |
| 一覧カード | **3px** | 2 / 12 要素 |
| `大学紹介` ボタン | 2px | 1 要素 |
| アイコン | 100% / 50% | 15 / 2 要素 |

---

## 6. Depth & Elevation

**影はほぼ使わない。**

| Level | Shadow | 実測 | 用途 |
|-------|--------|------|------|
| 0 | `none` | **トップは 0 種** | 既定 |
| 1 | `rgba(0, 0, 0, 0.2) 0 4px 8px 0` | **1 要素**（下層） | 教員カードのホバー相当 |

> **階層は影ではなく、面の色（`#ffffff` / `#f6f5f0` / `#eeeeee`）と角丸で作る。** カードに影を足すとこのサイトの平坦さが消える。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-feature-settings: normal }` を明示する**（詰めないことを宣言する）
- **約物は `YakuHanJPs` をスタック先頭に置いて処理する**（`letter-spacing` では調整しない）
- **`letter-spacing` は全要素 `normal`**
- **`html { font-size: 62.5% }` = 10px、`body { font-size: 1.8rem }` = 18px**。サイズは `rem` で書く
- **本文の `line-height` は 1.75（無単位）**。`body` に 1 回書いて継承させる
- **大見出しは 1.35、リードは 2.00、`自由と意力` のような 1 行タイトルは 0.75**
- **`font-weight` は 400 と 700 の 2 段だけ**
- **グリッドは `repeat(12, 1fr)` ＋ `gap: 30px`**、コンテナは 1440px
- **文字色は `#020202`**（純黒ではない）、青は `#0047b8`、地は `#f6f5f0`
- **写真の上のベールは `rgba(2, 2, 2, 0.5)`**（黒ではなくブランドの墨）
- ブレークポイントは **800px**（`(min-width: 0) and (max-width: 800px)` が 296 箇所で最多）

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** この書体には `palt` テーブルが無く、**実測で 1px も変わらない**（`normal` 2000.00px → `"palt"` 2000.00px）
- **`letter-spacing` で約物を詰めようとしない**（`YakuHanJPs` の仕事）
- **`font-weight: 500` を書かない**（Google Fonts で読み込んではいるが、サイトは 1 要素も使っていない）
- **`line-height` を px や `em` で書かない**（無単位 1.75 の継承が設計）
- **本文色に `#000000` を使わない**（`#020202` が正）
- **本文を 16px に落とさない**（18px が設計）
- **ニュース・カードのスタックを Web フォントに差し替えない**（OS ローカルで組むのが設計。ただし末尾の受け皿は足してよい）
- **カードに影を足さない**（トップは 0 種）

### 実サイトの事実として知っておくこと

- **`"Helvetica Neue", Helvetica, "Hiragino Sans", "Hiragino Kaku Gothic ProN", Arial` には generic family が無い。** Windows では和文が UA 既定に落ちる。**再現するときは末尾に `sans-serif` を足す**
- **ヒーローの黒いロゴマークは画像**（`/assets/images/common/logo-mark.svg` 224×188）。**文字で組み直さない**
- **ヒーローの作品写真は Next.js の画像最適化経由**（`/_next/image?url=…&w=2048&q=90`、1440×830）
- **`--font-zen-kaku-gothic` / `--content-base-gap` / `--swiper-theme-color` は可視 0 要素。** 実装は値を直書きしている
- **Tailwind（v3 系）の `--tw-*` 変数が `getComputedStyle(html)` に 40 個以上出る**が、これは `*, ::before, ::after` に撒かれるユーティリティの作業用変数で、**設計トークンではない**。自社トークンは 7 個
- **Google Fonts の CSS は CORS で読めない**（`styleSheetAccess.blocked: 1`）。自社 CSS は 4 枚とも読めている

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測 |
|------|-------|------|
| **Mobile / Tablet** | **`(min-width: 0) and (max-width: 800px)`** | **296 箇所（最多）** |
| Mobile / Tablet（別記法） | `screen and (max-width: 800px)` | 96 箇所 |
| Small Mobile | `screen and (max-width: 520px)` | 4 箇所 |
| Laptop | `screen and (max-width: 1024px)` / `(min-width: 1024px)` | 16 / 8 箇所 |
| Narrow Desktop | `screen and (max-width: 1128px)` | 7 箇所 |
| Desktop | `(min-width: 801px)` | 6 箇所 |
| Hover 可能 | `(hover: hover)` | 56 箇所 |

> **主役のブレークポイントは 800px。** 一般的な 768px ではないので、`max-width: 768px` と書くと 769〜800px が崩れる。

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- **ルートと本文は変えない**（9 幅すべて 10px / 18px）
- 800px を境に **h2 が 45px → 27.5px**、**p が 19px → 15px**
- 字間が `normal` なので、サイズを変えても詰めの調整は不要

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Tamabi Blue:      #0047b8   ← --color-tamabi-blue-primary（帯・ボタン・リンク）
Text Color:       #020202   ← --color-black-primary（純黒ではない・310 要素）
Surface Warm:     #f6f5f0   ← --color-gray-primary
Surface Warm 2:   #ddd9c8
Placeholder:      #eeeeee   ← 画像読み込み枠（面の最多 125 要素）
Text Muted:       #808080
Overlay:          rgba(2, 2, 2, 0.5)   ← 写真に重ねるベール
Background:       #ffffff
Font A（見出し）:  YakuHanJPs, "Zen Kaku Gothic Antique", sans-serif
Font B（本文）:    "Helvetica Neue", Helvetica, "Hiragino Sans",
                  "Hiragino Kaku Gothic ProN", Arial, sans-serif
Root:             html { font-size: 62.5%; font-feature-settings: normal }  ← 10px 固定
Body Size:        1.8rem（18px）・9 幅すべて不変
Line Height:      1.75（本文・無単位） / 1.35（大見出し） / 2.0（リード） / 0.75（1行タイトル）
Letter Spacing:   normal（全要素）
Font Feature:     normal（palt は効かない書体）
Font Weight:      400 / 700 のみ
Grid:             repeat(12, 1fr) / gap 30px
Container:        1440px
Radius:           3px（一覧） / 15px（特設カード） / 30px（教員カード） / 100%（アイコン）
Shadow:           ほぼ無し（トップは 0 種）
Breakpoint:       800px
CSS Variables:    7 個（うちグリッドの 2 個が設計の本体）
```

### プロンプト例

```
多摩美術大学のデザインシステムに従って、学科一覧のグリッドセクションを作成してください。

- html に font-size: 62.5%（10px）と font-feature-settings: normal を書き、
  body は font-size: 1.8rem（18px）/ line-height: 1.75（無単位）
- 見出し・ナビは YakuHanJPs, "Zen Kaku Gothic Antique", sans-serif
  本文・カードは "Helvetica Neue", Helvetica, "Hiragino Sans",
  "Hiragino Kaku Gothic ProN", Arial, sans-serif
- letter-spacing はどこにも書かない（全要素 normal）。約物は YakuHanJPs に任せる
- font-feature-settings: "palt" は足さない（この書体では 1px も変わらない）
- font-weight は 400 と 700 だけ
- グリッドは display: grid / grid-template-columns: repeat(12, 1fr) / gap: 30px
  コンテナは max-width: 1440px
- セクション見出しは 4.5rem（45px） / weight 700 / line-height 1.35
- カードのタイトルは 2.4rem（24px） / weight 700 / line-height 1.5
- カードの本文は 1.4rem（14px） / weight 400 / line-height 1.75
- 文字色は #020202、補助は #808080、セクションの地は #f6f5f0
- 画像の読み込み枠は #eeeeee、写真に文字を載せるときは
  rgba(2, 2, 2, 0.5) のベールを重ねて白文字
- CTA は background #0047b8 / 文字 #ffffff / 1.8rem / weight 400 / border-radius 2px
- カードの角丸は 15px、影は使わない
- 800px 以下で 1 カラムに畳み、見出しを 2.75rem に落とす（本文サイズは変えない）
```
