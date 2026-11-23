# DESIGN.md — 国際基督教大学（International Christian University / ICU）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-23 / 対象: `https://www.icu.ac.jp/`, `/about/whyicu/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **英語を大きく、日本語を小さく。** ナビは `ABOUT` 18px の上に `ICUについて` 13px を重ね、ヒーローは `Why ICU ... ?` を **67px の Public Sans** で置く。リベラルアーツ大学の「英語で学ぶ」を書体の大小そのもので見せている
- **密度**: 中。本文は 19px / `line-height: 2.00`、カードの見出しは 21px / 1.20 と**用途ごとに比率を振り分ける**
- **キーワード**: Public Sans と Noto Sans JP の和欧二層、ICU ブルー `#005abb`、円形（`border-radius: 50%` が 66 要素）、ナビだけ `palt`

**このサイトの核心は5つある。**

1. **欧文 Public Sans と和文 Noto Sans JP の二層。どちらも Google Fonts。** `css2?family=Noto+Sans+JP:wght@400;500;700&family=Public+Sans:wght@400;700&display=swap` の **1 本の URL で正しく v2 記法**。実描画はトップが Noto Sans JP 301 要素 / Public Sans 50 要素、下層が 95 / 8
2. **`palt` が当たるのはグローバルナビとヒーローの明朝メッセージだけ。** CSS の宣言は **`.g-nav` と `.p-top-mv__message` の 2 箇所しかない**のに、`.g-nav` の子孫に継承されて**実測 1161 要素（うち可視 715 要素）**になる。本文・ニュース・カードは `normal`。`palt` は実スタック 100px で **−15.96%**（2150.00px → 1806.91px）と確かに効くので、**数字の大きさだけ見て「全体に詰めている」と読まない**
3. **ヒーローの和文は Web フォントではない。** `なぜ、ICU 生は学ぶ事が好きなのか？` は `.p-top-mv__message` で、スタックは `YuMincho, 游明朝, "Hiragino Mincho ProN", "ヒラギノ明朝 W3 JIS2004", "Sawarabi Mincho", "Times New Roman", Times, serif`。CDP の実描画は **YuMincho**＝**OS ローカルの明朝**。`@font-face` は無く、**端末によって明朝の字面が変わる**
4. **`html` に書かれた `font-family` の先頭 3 つは死んでいる。** `html { font-family: "Public Sans", "Noto Sans", "Noto Sans CJK JP", NotoSansCJKjp-Jxck, "Yu Gothic", ... }` のうち、`"Noto Sans"` / `"Noto Sans CJK JP"` / `NotoSansCJKjp-Jxck` は **`document.fonts` にも `@font-face` にも存在しない**（下層では `NotoSansCJKjp-Jxck` の `@font-face` が 2 件あるが 2 件とも `unloaded`）。実害が出ないのは **`body` と各要素が `"Noto Sans JP", "游ゴシック Medium", ...` を上書きしている**ため
5. **ウェイトは 400 と 700 の 2 段だけ。500 は読んでいるのに 1 要素も使っていない。** Google Fonts URL は `wght@400;500;700` を要求し、欧文での実測も `100〜400 → 1132.98px` / `500 → 1159.52px` / `600〜900 → 1193.88px` と **3 段が使える**。しかし `distributions.fontWeight` はトップが 400 (216) / 700 (140)、下層が 400 (84) / 700 (19) で、**500 は 0 要素**

**CSS Custom Properties は `--scrollbarWidth: 0px` の 1 個だけ。** 設計トークンは存在せず、色もサイズも CSS に直書きされている（`styleSheetAccess.blocked` は 2 枚だが、Google Fonts と Font Awesome の CDN なので変数は含まれない）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **ICU Blue** | **`#005abb`** | 文字 45 要素（`NEWS` `ご支援` `ENGLISH`）／面 11 要素（言語切替、`ICU is like a` のブロック、下層ヒーロー 1,008,000px²）／枠線 `3px solid` の CTA |
| **ICU Blue 50%** | **`rgba(0, 90, 187, 0.5)`** | 面 5 要素。写真の上の覆い |
| **Deep Navy** | **`#122b3a`** | 面 18 要素。`Diversity` `Activity` `Quality of life` のカード |

### Semantic（意味的な色）

- **Alert** (`#c90000`): `大切なお知らせ` の見出し（文字 1 要素）
- **Green** (`#057837`): 記事カテゴリのバッジ（面 3 要素・文字 1 要素）

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文（トップ 195 要素 / 下層 87 要素）。**純黒**
- **Text on Dark** (`#ffffff`): ヒーロー・カードの文字（トップ 112 要素 / 下層 7 要素）
- **Text Muted** (`#666666`): コピーライト（1 要素）
- **Divider / Surface** (`#eeeeee`): メガメニューの面（6 要素）
- **Surface Gray** (`#cccccc`): ヒーロー画像の背景（743,964px²）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

> **新潮社型の「色を増やさない」設計。** ブランド青・濃紺・緑・赤の 4 色しか彩度を持たず、残りは黒・白・グレー。

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP**（Google Fonts・`wght@400;500;700`）。`@font-face` は unicode-range で **381 件**に分割され、`loaded` はそのうち 40 本前後（和文の分割配信では正常）
- フォールバックは **游ゴシック Medium を Regular より前に置く**正しい順序:
  `"游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic, ...`
  → Windows で Medium に当たる（Regular に落ちない）
- **ヒーローの明朝は Web フォントではない**（→ 1. の 3.）

### 3.2 欧文フォント

- **Public Sans**（Google Fonts・`wght@400;700`）。米国政府のデザインシステム由来のサンセリフ
- トップの `Why ICU ... ?`（67px）、`ICU is like a Small Planet`（32.49px / 57px）、`View All`、`NEWS` に当たる
- **Font Awesome 4.7.0 を `maxcdn.bootstrapcdn.com` から読んでいる**（フォント要求 49 件のうち 1 件）。古い CDN なので、再現時は自前のアイコンに置き換える

### 3.3 font-family 指定

```css
/* 和文（本文・ナビの日本語） */
body {
  font-family: "Noto Sans JP",
               "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic,
               "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
               メイリオ, Meiryo, Verdana, Roboto, "Droid Sans", sans-serif;
}

/* 欧文（見出し・ラベル） */
.font-en { font-family: "Public Sans", sans-serif; }

/* ヒーローのメッセージだけ明朝（OS ローカル） */
.p-top-mv__message {
  font-family: YuMincho, 游明朝, "Hiragino Mincho ProN", "ヒラギノ明朝 W3 JIS2004",
               "Sawarabi Mincho", "Times New Roman", Times, serif;
  font-feature-settings: "palt";
}
```

- **実サイトの `html` には `"Public Sans", "Noto Sans", "Noto Sans CJK JP", NotoSansCJKjp-Jxck, "Yu Gothic", YuGothic, Meiryo, sans-serif` と書かれているが、中 3 つは存在しない名前**。再現時は上の `body` の指定だけで足りる
- `.font-en` の実サイトでの書き方は `"Public Sans", "Noto Sans", sans-serif` で、**`"Noto Sans"` は死んだ名前**。欧文しか入らない要素なので実害は無いが、正しくは `"Public Sans", sans-serif`

### 3.4 文字サイズ・ウェイト階層

**トップページ（可視 356 要素）**

| 用途 | size | family | weight | lh |
|------|------|--------|--------|-----|
| ヒーロー見出し（欧文） | **67px** | Public Sans | 700 | 73.7px (**1.10**) |
| `Small Planet` | **57px** | Public Sans | 700 | 65.55px (1.15) |
| 施設名（欧文） | **54px** | Public Sans | 700 | 61.56px (1.14) |
| ヒーローのメッセージ（明朝） | **29px** | YuMincho | 700 | 40.02px (1.38) |
| 施設名（和文） | **27px** | Noto Sans JP | 700 | 38.88px (1.44) |
| カード見出し（欧文） | **25px** | Public Sans | 700 | — |
| カード見出し（和文） | **21px** | Noto Sans JP | — | 25.2px (**1.20**) |
| 本文（長文） | **19px / 20px** | Noto Sans JP | 400 | **38px / 40px（2.00）** |
| ナビ（欧文） | **18px** | Noto Sans JP | **700** | 23.4px (1.30) |
| 汎用 | 16px | — | 400 | 20.8px (1.30) |
| ニュース本文 | 15px | — | 400 | 17.25px (1.15) |
| ナビ（和文） | **13px** | Noto Sans JP | 400 | 16.9px (1.30) |
| ユーティリティ | 12px | — | 400 | 15.6px (1.30) |

- **ナビは「欧文 18px / 700」＋「和文 13px / 400」の 2 段重ね。** サイズ差 5px、ウェイト差 300 で主従を付ける
- **ウェイトは 400 と 700 の 2 段だけ**（500 は宣言のみ）

**下層ページ（Why ICU...?・可視 103 要素）**

| 用途 | size | lh | letter-spacing |
|------|------|-----|----------------|
| ヒーロー（欧文） | **50px** | 1.10 | normal |
| 縦組みラベル `ABOUT` | **60px** | 1.00 | **3px** |
| リード | 20px | **2.00** | normal |
| 見出し | 17px | 1.26 | 0.32px |
| 本文・ナビ | 14px | 1.40 | **0.32px** |

### 3.5 行間・字間

- **`line-height` は無単位の比率**。`body` は 16px / 19.2px（1.20）
- **比率を用途で明確に振り分けている**（トップの分布）:
  - **1.20**（107 要素）: カード見出し・短いラベル
  - **1.50**（88 要素）: 説明文
  - **2.00**（55 要素）: 長文の本文
  - **1.30**（41 要素）: ナビ
  - **1.10**（19 要素）: 大きい欧文見出し
- **`letter-spacing` はページで配り方が逆転する**
  - トップ: `normal` **329 要素** / `0.32px` 27 要素（ナビの欧文だけ）
  - 下層: **`0.32px` 55 要素** / `normal` 47 要素 / `3px` 1 要素（縦組みラベル）
  - **`0.32px` は 16px × 0.02em。各要素が `em` を持つ型**なので `0.02em` と書いてよい
  - **1 ページだけ見て「このサイトの字間」と決めない**

### 3.6 禁則処理・改行ルール

- `word-break` / `line-break` の宣言は無し（ブラウザ既定）
- **本文に康熙部首が混入している。** トップに `⽣ U+2F63`（2 回）/ `⼤ U+2F24` / `⼊ U+2F0A` の 4 文字、下層に 2 文字（`免許・資格（⼤学院）` `ICUの⼊試について` `学⽣寮避難訓練および消防訓練を実施しました`）
  - ナビのリンクと 20px のニュース見出しに入っている。**生成時は必ず通常の漢字で書く**

### 3.7 OpenType 機能

- **`font-feature-settings: "palt"` の宣言は CSS に 2 箇所だけ**

```css
.g-nav { font-feature-settings: "palt"; }              /* グローバルナビ全体（子孫に継承） */
.p-top-mv__message { font-feature-settings: "palt"; }  /* ヒーローの明朝メッセージ */
```

- **実測は 1161 要素（うち可視 715 要素）**。`.g-nav` のメガメニューが深い DOM を持つので件数が大きく出るだけで、**本文・ニュース・カードは `normal`**
- **効果は実測 −15.96%**（実スタック・100px で `「あア亜永い組設計展」（株）１２３ＡＢＣ、。・` が 2150.00px → 1806.91px）。`"halt"` は 1950.00px（−9.30%）
- **本文に `palt` を足さない。** 当てれば効いてしまうので、実サイトと別物になる

### 3.8 縦書き

- **縦組みは各ページ 1 要素だけ**
  - トップ: `.p-top-mv__box__index`（`vertical-rl` / 26px / `73` という数字）
  - 下層: `.nav-sub-label`（`vertical-rl` / **60px** / `letter-spacing: 3px` / `ABOUT`）
- **大きな縦組みの和文コピーは無い**。縦組みはラベルと番号の装飾用途

---

## 4. Component Stylings

### Buttons

**Outline（ICU ブルーの太枠）**

```css
.btn-outline {
  font-family: "Public Sans", sans-serif;
  font-size: 13px; line-height: 16.9px;   /* 1.30 */
  font-weight: 700;
  color: #005abb;
  background: transparent;
  border: 3px solid #005abb;              /* ← 3px。1px ではない */
  border-radius: 0;                       /* ← 角を丸めない */
  font-feature-settings: "palt";
}
```

**Navy（ダークのラベル）**

```css
.btn-navy {
  font-size: 13px; line-height: 15.6px;   /* 1.20 */
  color: #ffffff;
  background: #122b3a;
  border-radius: 0;
}
```

- **CTA に角丸が無い**（`border-radius: 0`）。丸いのは円形のカードだけ

### Badges / Chips

```css
.badge-green { background: #057837; color: #ffffff; }   /* 記事カテゴリ */
```

### Cards

```css
/* ICU PLANET の円形カード */
.card-circle {
  border-radius: 50%;        /* ← 66 要素。このサイトで最も目立つ形 */
  background: #122b3a;
  color: #ffffff;
}

/* 一般カード */
.card { width: 360px; border-radius: 0; box-shadow: none; }
```

- **`border-radius: 50%` が 66 要素**。`30px` は CMP のボタン 2 要素だけで、**サイトの形は「円」と「直角」の 2 種しかない**

### Inputs

- CMP（Cookie 同意）以外に入力欄が無い

---

## 5. Layout Principles

### Spacing Scale

- gap の最頻は **`9.1px` が 22 要素**（両ページ共通）。`normal 30px` 5 / `normal 160px` 1 / `normal 40px` 1 / `38px` / `18px` / `15px` / `14px 0px`
- **`9.1px` は `0.7em`（13px × 0.7）相当**。ナビの行間に使われる

### Container

| 値 | 件数 | 用途 |
|----|------|------|
| **360px** | **24** | カード |
| **1240px** | 9 | 本文のコンテンツ幅 |
| 1440px / 1020px / 830px / 450px | 各 1 | — |

- **カード幅 360px が 24 件**で最多。1240px のコンテナに 3 列で入る

### Grid

- ICU PLANET は円形カードの散開レイアウト
- ニュースは 1240px のコンテナ内 3 カラム

---

## 6. Depth & Elevation

**影は 1 種類しか無い。**

| 影 | 用途 | 件数 |
|----|------|------|
| `rgba(0, 0, 0, 0.1) 0 0 10px 0` | メガメニューのパネル | **1**（両ページとも） |

- **カードにも CTA にも影が無い。** 階層は**面の色（`#122b3a` / `#005abb` / `#eeeeee`）と余白**だけで作る
- `offset` が `0 0` で `blur` が 10px の**方向を持たない影**。ドロップシャドウではなく「浮いている面」の合図

---

## 7. Do's and Don'ts

### Do（推奨）

- **ナビは「欧文 18px / weight 700」＋「和文 13px / weight 400」の 2 段重ね**にする
- **本文の `line-height` は 2.00**、カード見出しは 1.20、ナビは 1.30 と**用途で比率を振り分ける**
- **ブランド青は `#005abb`**。枠線は `3px solid`、角丸は 0
- **カードの円は `border-radius: 50%`**（66 要素）
- **字間は `0.02em`（= 16px で 0.32px）**。ナビと下層の見出しだけに当て、トップの本文は `normal`
- **欧文は Public Sans、和文は Noto Sans JP**。どちらも Google Fonts の `css2?family=...` v2 記法で 1 本にまとめる
- **游ゴシックは Medium を Regular より前に置く**（`"游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic`）

### Don't（禁止）

- **`font-weight: 500` を使わない。** Google Fonts で読み込んではいるが、**実装では 1 要素も使っていない**（400 と 700 の 2 段だけ）
- **`font-weight: 600` / `800` / `900` を書かない。** URL の `wght@` に無いので **700 に丸められる**（欧文実測で 600〜900 が 1193.88px と同値）
- **本文に `font-feature-settings: "palt"` を足さない。** 宣言は `.g-nav` と `.p-top-mv__message` の 2 箇所だけで、**本文は `normal`**。足すと −16% 詰まって別物になる
- **ヒーローの明朝を Web フォントで実装しない。** 実サイトは OS ローカルの游明朝／ヒラギノ明朝に任せている（`@font-face` 無し）
- **`"Noto Sans"` / `"Noto Sans CJK JP"` / `NotoSansCJKjp-Jxck` をスタックに書かない。** 実サイトの `html` には書かれているが、**どれも存在しない名前**で一度も当たらない
- **CTA に角丸を付けない**（`border-radius: 0`）
- **カードに影を足さない。** 影はメガメニューの 1 要素だけ
- **本文に康熙部首（`⽣` `⼤` `⼊` など U+2F00–U+2FDF）を混ぜない。** 実サイトのナビとニュース見出しに 4 文字混入しているが、これは誤りなので再現しない
- **1 ページだけ見て字間を決めない。** トップは `normal` 329/356、下層は `0.32px` 55/103 と**配り方が逆転する**

---

## 8. Responsive Behavior

### Breakpoints

| 条件 | 件数 | 用途 |
|------|------|------|
| `print, screen and (min-width: 769px)` | **784**（トップ）/ 790（下層） | デスクトップ。**`print` を含める** |
| `print, screen and (min-width: 1240px)` | 122 | ワイド |
| `not screen and (min-width: 769px)` | 113 | モバイル |
| `screen and (max-width: 768px)` | 13 / 133 | モバイル |
| `(hover: hover) and (pointer: fine)` | 27 | ホバー |

- **ほぼすべてのメディアクエリに `print` が入っている。** 印刷時はデスクトップのレイアウトで出る設計

### フォントサイズの調整

- **`html { font-size: 62.5% }` = 10px、`body { font-size: 1.6rem }` = 16px。16 幅すべてで固定**（1920〜320px で `html: 10px` / `body: 16px` から 1px も動かない）
- **変わるのは要素単位の px の階段だけ**。769 → 768px で:
  - `h1`: **67px → 39px**（lh 73.7px → 42.9px）
  - `h2`: **57px → 35px**（lh 65.55px → 40.25px）
  - `p`: **19px → 15px**（lh 38px → 30px）
  - `h3` / `a` は 16px のまま
- **`rem` は 10px 基準。** `1.6rem` = 16px、`1.3rem` = 13px と**値 ÷ 10 で px が読める**
- `font-size: 1.3rem !important` のような **`px` → `rem` の二重宣言**（`font-size: 13px!important; font-size: 1.3rem!important`）が 4 箇所。古いブラウザ向けの保険で、同じ値になる

### タッチターゲット

- ナビのリンクは 13px / lh 16.9px ＋ padding で 44px 前後

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
和文: "Noto Sans JP", "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic, …（Google Fonts / 400・700）
欧文: "Public Sans", sans-serif（Google Fonts / 400・700）
明朝: YuMincho, 游明朝, "Hiragino Mincho ProN", … ← OS ローカル。Web フォント化しない
ICU ブルー  : #005abb      濃紺       : #122b3a
アラート赤  : #c90000      緑         : #057837
本文色      : #000000      背景       : #ffffff
本文        : 19px / line-height 2.00 / letter-spacing normal
ナビ        : 欧文 18px weight 700 ＋ 和文 13px weight 400 / lh 1.30 / 0.02em
カード見出し: 21px / line-height 1.20
枠線        : 3px solid #005abb / border-radius 0
円形カード  : border-radius 50%
影          : rgba(0,0,0,.1) 0 0 10px （メガメニューのみ。カードには付けない）
コンテナ    : 1240px / カード 360px / gap 9.1px
ルート      : html 62.5%（10px）/ body 1.6rem（16px）。16 幅すべて固定・流体なし
崖          : 769 → 768px で h1 67→39px、h2 57→35px、p 19→15px
palt        : .g-nav とヒーローの明朝だけ（本文は normal）
縦組み      : 各ページ 1 要素のみ（ラベル・番号の装飾）
```

### プロンプト例

> 国際基督教大学のデザインで、学部紹介のカードセクションを作ってください。
> 見出しは欧文 `"Public Sans", sans-serif` の 25px / weight 700 の下に、
> 和文 `"Noto Sans JP", "游ゴシック Medium", …` の 21px / `line-height: 1.20` を重ねてください。
> 本文は 19px / `line-height: 2.00` / `letter-spacing: normal`。
> CTA は `3px solid #005abb` の枠線＋ `#005abb` の文字で、**角丸は 0**。
> カードに影は付けず、`#122b3a` の面と余白だけで階層を作ってください。
> `font-feature-settings` は本文には書かないでください（実サイトはナビだけに `palt` を当てています）。
