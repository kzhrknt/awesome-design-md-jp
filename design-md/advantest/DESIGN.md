# DESIGN.md — アドバンテスト（ADVANTEST）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-01 / 対象: `https://www.advantest.com/ja/`, `https://www.advantest.com/ja/about/why-advantest/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 半導体テスト装置メーカーのコーポレートサイト。白〜`#FAF8F9` の地に **ワインレッド（`#91003C`）** を一点。角丸をほぼ使わず、面と罫線で組む硬質なレイアウト
- **密度**: 高め。本文 `line-height: 1.7`、字間は `normal` のまま、**約物だけ `halt` で詰める**
- **キーワード**: `halt` を全体に継承、字間は触らない、多言語 4 書体を 1 スタックに、角丸 0、影はワインレッド

**このサイトの核心は4つある。**

1. **`body` に 1 行だけ書いた `font-feature-settings: "halt"` が全体へ降りている。** 可視 153 要素（トップ）/ DOM 全体で 598 要素、下層でも 427 要素。
   実効性は実測済み —— 同じ書体・40px・`letter-spacing: normal` の隠し要素で `normal` **519.2px** → `"halt"` **439.2px**（**−15.4%**）。
   **`palt`（422.28px）ではなく `halt` を選んでいる**のがこのサイトの設計で、約物を「文字ごとに詰める」のではなく **「全角を一律に半角幅へ揃える」**
2. **`letter-spacing` は 172 要素中 163 要素が `normal`。** 詰めは `halt` だけに任せ、**空けるほうを 2 箇所だけ**手当てしている ——
   ヒーローのリード `0.8px`（16px に対して **0.05em**）と、英字セクション見出し `1px`（40px に対して **0.025em**）
3. **多言語 4 書体を 1 つのスタックに畳み、セルフホストで `@font-face` 482 本に分割している。**
   `Roboto, "Noto Sans JP", "Noto Sans SC", "Noto Sans TC", "Noto Sans KR", sans-serif` の 1 スタックしか存在しない（可視 172 要素すべて）。
   内訳は SC 145 / TC 127 / JP 122 / KR 84 / Roboto 3 / swiper-icons 1。配信元は Google Fonts ではなく **自ドメイン `/fonts/`**
4. **`html` に `font-size` の宣言が無い（UA 既定の 16px）。本文サイズはトークンの 2 段切替で決まる。**
   `--FONT_SIZE` は既定 `0.875rem`（14px）で、`@media (min-width: 768px)` のときだけ `1rem`（16px）。
   **768px → 767px で本文 16px → 14px、見出し 34px → 24px に落ちる**。崖はここ 1 箇所

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 変数名 | 実測 |
|------|--------|--------|------|
| **Advantest Red** | **`#91003C`** | `--COLOR_BRAND_PRIMARY` | 面 20 要素（トップ）/ 12（下層）。CTA、ヘッダーの検索ボタン、メガメニューのアクセント帯、グラデーションの起点 |
| **Advantest Red Light** | **`#C31F66`** | `--COLOR_BRAND_SECONDARY` | 文字 7 要素。製品カルーセルのカテゴリラベル（11px / 700） |
| **Advantest Red Dark** | `#750031` | `--COLOR_TEXT_LINK_HOVER` / `--COLOR_OUTLINE_LINK_HOVER` | 文字 4〜6 要素。メガメニューの第 1 階層見出し |

### Gradients（見出し帯・フッター）

| 用途 | 実装値 | 変数名 | 実測 |
|------|--------|--------|------|
| ページタイトル帯 | `linear-gradient(90deg, #91003C, #E60F6D)` | `--LINER_GRADIENT_HEADING` | 下層の `.l-mainTitle` 1 要素（1440×?） |
| フッター上帯 | `linear-gradient(45deg, #91003C, #C81160)` | `--LINER_GRADIENT_FOOTER` | 1 要素 |
| ページネーション（現在位置） | `linear-gradient(to right, #C31F66, #91003C)` / 縦版 `linear-gradient(#C31F66, #91003C)` | `--LINER_GRADIENT_CARD_HEADING` | 各 2 要素 |

> 変数名は実サイトのまま **`LINER_`**（`LINEAR_` ではない）。6 つすべてこの綴り。

### Neutral（ニュートラル）

- **Text Primary** (`#333333`, `--COLOR_FOREGROUND_DARK`): 本文・ナビ・リンク。**可視 93 要素で最多**
- **Text Black** (`#222222`, `--COLOR_TEXT_BLACK`): メガメニューの第 1 階層リンク（16 要素）
- **Text on Dark** (`#FFFFFF`, `--COLOR_FOREGROUND_LIGHT`): ヒーロー、CTA、フッター（22 要素）
- **Text Tab** (`#5F605D`): ニュースタブの非選択（5 要素）
- **Text Date** (`#747572`, `--COLOR_TEXT_DATE`): ニュースの日付（5 要素）
- **Section EN** (`#474C59`): 英字セクション見出し 40px の文字色（4 要素）。**CSS 変数には無いハードコード**
- **Page Background** (`#FAF8F9`): `.l-content__outer`。`heroCovered: true` なのでヒーローが覆うが、コンテンツの地色はこれ
- **Surface** (`#F2F2F2`, `--COLOR_BACKGROUND_LIGHT`): 言語切替パネル、検索パネル（17〜19 要素）/ `#EFEFEF`: メガメニューのカード面（30 要素）
- **Surface Tint** (`#F2F4F7`): 下層の強み紹介カード（3 要素）
- **Outline** (`#DFE0DE`, `--COLOR_OUTLINE_LIGHT`) / (`#C0C3BB`, `--COLOR_OUTLINE_DARK`): 罫線

### 宣言はあるが使われていない色

2 ページとも **可視 0 要素**。新規実装で採用しないこと。

| 変数 | 値 |
|------|-----|
| `--COLOR_BRAND_SUB_1` | `#651366`（紫） |
| `--COLOR_BRAND_SUB_2` | `#001C77`（紺） |
| `--COLOR_BRAND_SUB_3` | `#005180`（青） |
| `--COLOR_BRAND_SUB_4` | `#005777`（青緑） |
| `--COLOR_BRAND_SUB_5` | `#8C003D`（赤） |
| `--COLOR_ROLE_IMPORTANT` | `#F9827C`（サーモン） |
| `--COLOR_TEXT_PLACEHOLDER` | `#9FA19C` |
| `--LINER_GRADIENT` | `linear-gradient(90deg, #ADE6FF, #DBB2FF)`（水色→薄紫。**ブランドと無関係の色**） |

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の和文書体）**: **Noto Sans JP**。可変フォント（`font-weight: 100 900`）を `unicode-range` で **122 本**に分割し、自ドメイン `/fonts/NotoSansJP/NotoSansJP-***.woff2` から配信
- 日本語ページで `document.fonts` が `loaded` を返すのは **Noto Sans JP と Roboto だけ**。SC / TC / KR は宣言だけで読まれない
- OS ローカルの和文書体はスタックに 1 つも無い

### 3.2 欧文フォント

- **Roboto**（400 / 500 / 700 の静的 3 本）。`/fonts/Roboto/Roboto-{Regular,Medium,Bold}.woff2`
- 英数字・記号は **スタックの先頭にある Roboto** が拾い、和文は 2 番目の Noto Sans JP に落ちる

### 3.3 font-family 指定

```css
/* サイト全体で、この 1 行しかない */
body {
  font-family: Roboto, "Noto Sans JP", "Noto Sans SC", "Noto Sans TC", "Noto Sans KR", sans-serif;
  font-feature-settings: "halt";
}
```

**`getComputedStyle` が返す `font-family` の先頭は常に `Roboto` だが、和文を描画しているのは Noto Sans JP。**
`font-family` の第 1 項を「描画されている書体」と読まないこと。

**4 言語ぶんの Noto を 1 スタックに並べるのは、同じ HTML を言語違いで配信するための構成。**
日本語だけを扱う実装に写すときは `Roboto, "Noto Sans JP", sans-serif` で足りる。

### 3.4 文字サイズ・ウェイト階層

**1440px の実測値。768px 未満では本文が 14px に落ちる（§8 参照）。**

| Role | Font | Size | Weight | Line Height | Letter Spacing | Color |
|------|------|------|--------|-------------|----------------|-------|
| Section EN | Roboto | **40px** | 700 | 1.38 | **1px**（0.025em） | `#474C59` |
| Hero Headline | Noto Sans JP | **34px** | 700 | 1.38 | normal | `#FFFFFF` |
| Mega-menu Title | Noto Sans JP | 30px | 700 | 1.70 | normal | `#333333` |
| Product Name | Noto Sans JP | 20px | 700 | 1.50 | normal | `#000000` |
| Nav Level 1 | Noto Sans JP | 18px | 700 | 1.50 | normal | `#222222` / `#750031` |
| Nav Level 1 (head) | Noto Sans JP | 18px | 700 | 1.70 | normal | `#333333` |
| **Body** | Noto Sans JP | **16px** | **400** | **1.70** | **normal** | `#333333` |
| Hero Lead | Noto Sans JP | 16px | 400 | **2.00** | **0.8px**（0.05em） | `#FFFFFF` |
| Card Title | Noto Sans JP | 16px | 700 | 1.50 | normal | `#333333` |
| Link List | Noto Sans JP | 16px | 500 | 1.70 | normal | `#333333` |
| Tab (active) | Noto Sans JP | 16px | 700 | 1.50 | normal | `#91003C` |
| Button | Noto Sans JP | 15px | 700 | 1.50 | normal | `#FFFFFF` |
| Language Switch | Noto Sans JP | 15px | 700 | 1.50 | normal | `#333333` |
| Category | Noto Sans JP | 14px | 400 | 1.70 | normal | `#333333` |
| Date | Roboto | 13px | 500 | 1.70 | normal | `#747572` |
| Icon Label | Noto Sans JP | 12px | 500 | 1.50 | normal | `#333333` |
| Product Category | Noto Sans JP | 11px | 700 | 1.50 | normal | `#C31F66` |

**ウェイトは 400 / 500 / 700 の 3 段。** `--FONT_WEIGHT_REGULAR: 400` / `--FONT_WEIGHT_MEDIUM: 500` / `--FONT_WEIGHT_BOLD: 700` の 3 つしか宣言が無く、実測も 700（86）/ 400（71）/ 500（13）の 3 つだけ。

> **600 や 900 を当てないこと。** Noto Sans JP は可変（`100 900`）なので和文は出るが、**Roboto は 400 / 500 / 700 の静的 3 本**しか無いため、英数字だけ 1 段ずれる（600 → 700、900 → 700）。

### 3.5 行間・字間

```css
body {
  color: var(--COLOR_FOREGROUND_DARK);   /* #333 */
  font-size: var(--FONT_SIZE);           /* 0.875rem → ≥768px で 1rem */
  font-weight: var(--FONT_WEIGHT_REGULAR);
  line-height: var(--LINE_HEIGHT);       /* 1.7（単位なし） */
  font-feature-settings: "halt";
}
```

- **`line-height: 1.7` は単位なしなので、各要素が自分のサイズで再計算する。** 実測 1.70 が 80 要素で最多。`em` や `px` に書き換えないこと
- 見出しは 1.38、カード・ナビは 1.50、ヒーローのリードだけ 2.00
- **`letter-spacing` は書かないのが既定。** 172 要素中 163 要素が `normal`
- 字間を足すのは **英字の小見出し（`1px`）とヒーローのリード（`0.8px`）だけ**。どちらも `px` の絶対値で、`em` ではない

### 3.6 禁則処理・改行ルール

- `word-break` は `normal`（6 幅すべてで確認）。`auto-phrase` も `break-all` も使っていない
- ヒーローの見出しは `<br>` で「先端技術を／先端で支える」と**手で割っている**

### 3.7 OpenType 機能

```css
body { font-feature-settings: "halt"; }
```

- **宣言は `body` の 1 行だけ。** 可視 153 要素（トップ）/ 全 DOM 598 要素、下層 427 要素へ継承される
- `"halt"` は **全角の約物を一律に半角幅へ揃える**。文字ごとに詰め幅を変える `"palt"` とは別物
- 実測（40px・`letter-spacing: normal`・同一スタック）: `normal` 519.2px / **`"halt"` 439.2px** / `"palt"` 422.28px。**`halt` は確かに効いている**
- `palt` は 1 要素も使っていない。**`halt` を `palt` に置き換えると別物になる**（約物の幅がばらつく）

### 3.8 縦書き

縦書きは使用していない（`writing-mode: vertical-*` 0 要素）。

---

## 4. Component Stylings

### Buttons

**角丸を使わない。** プライマリもセカンダリも `border-radius: 0`。

```css
/* Primary — ワインレッドの塗り */
.m-button {
  background: #91003C;
  color: #fff;
  border: 0;
  border-radius: 0;
  padding: 16px 24px;     /* 実測 240×55 */
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
}

/* Outline — 写真の上に置く白枠 */
.m-button--outline {
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 0;
  padding: 15px 24px;     /* 枠 1px ぶん減らして高さを 55px に揃える */
  font-size: 15px;
  font-weight: 700;
}

/* ヘッダーの検索ボタン — 入力欄の右端にだけ角丸 */
.m-panel-search__button {
  background: #91003C;
  color: #fff;
  border-radius: 0 var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL) 0;  /* 0 2px 2px 0 */
  padding: 14px;          /* 実測 150×48 */
  font-size: 16px;
  font-weight: 400;
}
```

> **`padding: 16px 24px` と `15px 24px` の 1px 差は意図的**。枠線のぶんを引いて、塗りボタンと枠ボタンの高さ（55px）を揃えている。

### Badges / Labels

- 製品カテゴリ: 面なし、文字 `#C31F66`、11px / 700
- ニュース種別: 面なし、文字 `#333333`、14px / 400（罫線で区切る）

### Cards

```css
.m-card-news {
  background: #fff;
  border-radius: var(--BORDER_RADIUS_LARGE);           /* 4px */
  box-shadow: var(--BOX_SHADOW_CARD);                  /* 2px 6px 16px 0 #8000351f */
}
.m-card-news:hover {
  box-shadow: var(--BOX_SHADOW_CARD_HOVER);            /* 2px 14px 20px 0 #80003529 */
}
```

### Inputs

- 検索入力: 面 `#F2F2F2`、`border-radius: 2px 0 0 2px`（右端はボタン側）
- プレースホルダ色は `--COLOR_TEXT_PLACEHOLDER: #9FA19C` と宣言されているが **可視 0**

---

## 5. Layout Principles

### Spacing Scale

| 変数 | 値 | 用途 |
|------|-----|------|
| `--SIZE_MODULE_MARGIN` | `40px` | モジュール間 |
| `--SIZE_NESTED_MODULE_MARGIN` | `24px` | 入れ子モジュール間 |
| `--SIZE_CONTENT_SIDE_MARGIN` | `60px` | コンテンツの左右余白 |
| `--SIZE_LAYOUT_COLUMN_GAP` | `4%` | カラム間（相対値） |
| `--SIZE_HEADER_HEIGHT` | `112px` | ヘッダー高さ |
| `--SIZE_SCROLL_MARGIN_TOP` | `60px` | アンカー着地時の上余白 |

### Grid

実測の `gap`（多い順）:

| 値 | 件数 | 用途 |
|----|------|------|
| `0 60px` | 17（下層 22） | **最多。メガメニューとコンテンツの列間** |
| `40px` | 3 | モジュール間 |
| `0 30px` / `0 32px` / `16px 24px` / `8px 40px` / `16px` / `0 4%` | 各 1 | カード列・リンクリスト |

### Container

- 下層のコンテンツ幅: **948px**（3 要素）／サイドのカード幅 405px
- トップはフル幅＋`--SIZE_CONTENT_SIDE_MARGIN: 60px`

---

## 6. Depth & Elevation

**影は実質 1 種類だけ。しかも黒ではない。**

```css
--BOX_SHADOW_CARD:       2px 6px 16px 0px #8000351f;   /* rgba(128, 0, 53, 0.12) */
--BOX_SHADOW_CARD_HOVER: 2px 14px 20px 0px #80003529;  /* rgba(128, 0, 53, 0.16) */
--BOX_SHADOW_1:          0 0 16px #00000040;           /* ドロワー・パネル用 */
--TEXT_SHADOW:           1px 1px 5px #00000080;
```

- 実測: `rgba(128, 0, 53, 0.12) 2px 6px 16px 0px` が **5 要素**（ニュースカード）
- **`#800035` はワインレッドに近い暗赤。影まで色をブランドに寄せている**ので、`rgba(0,0,0,.12)` に置き換えないこと
- オフセットは `x: 2px, y: 6px` と**右下に寄せた非対称**。中央配置の影にしないこと

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` に `font-feature-settings: "halt"` を 1 行だけ書いて継承させる**。要素ごとに書き足さない
- `letter-spacing` は **書かない**。空けたいときだけ `px` の絶対値で 0.8〜1px
- `line-height` は `1.7` を単位なしで `body` に置く
- ウェイトは 400 / 500 / 700 の 3 段から選ぶ
- ボタンは `border-radius: 0`。カードだけ 4px
- 影は `rgba(128, 0, 53, 0.12) 2px 6px 16px`（ブランド寄りの暗赤）
- 本文は `#333333`、見出しの英字は `#474C59`

### Don't（禁止）

- **`"halt"` を `"palt"` に置き換えない**。約物の幅が一律でなくなり、字面が変わる
- **`letter-spacing` を `em` で全体に配らない**。このサイトは字間を触らないのが設計
- **600 / 900 のウェイトを当てない**。Roboto は 400 / 500 / 700 の静的 3 本しか無く、英数字だけ太さがずれる
- **`--COLOR_BRAND_SUB_1`〜`SUB_5`、`--COLOR_ROLE_IMPORTANT`、`--LINER_GRADIENT`（水色→薄紫）を使わない**。2 ページとも可視 0 要素
- **ボタンに角丸を付けない**
- **影を黒にしない**
- **`font-family` の先頭 `Roboto` を「和文の書体」と読まない**。和文は Noto Sans JP が描いている
- `line-height` を `px` や `em` に書き換えない

---

## 8. Responsive Behavior

### Breakpoints

```css
/* 本文サイズを決める唯一の分岐 */
:root { --FONT_SIZE: 0.875rem; }                 /* 14px */
@media (min-width: 768px) { :root { --FONT_SIZE: 1rem; } }   /* 16px */
```

| Breakpoint | 役割 |
|------------|------|
| `(min-width: 550px)` | 小さなカード列の 2 カラム化 |
| `(max-width: 600px)` | 一部モジュールの 1 カラム化 |
| **`(min-width: 768px)`** | **本文 14px → 16px。最重要** |
| `(min-width: 1024px)` | メガメニューの展開 |
| `(min-width: 1024px) and (max-width: 1320px)` | 中間幅の詰め |
| `(min-width: 1280px)` | 最大幅 |

### フォントサイズの調整

`html` は **UA 既定の 16px のまま**（CSS に `html { font-size }` の宣言が 1 つも無い）。
`rem` は常に 16px 基準なので、`0.875rem = 14px` / `1rem = 16px`。

6 幅の実測（1440 / 1200 / 1024 / 834 / 768 / 767 / 375px）:

| 幅 | `html` | `body` | `body` line-height | `h2` |
|----|--------|--------|--------------------|------|
| 1440〜768px | 16px | **16px** | 27.2px | 34px |
| **767〜375px** | 16px | **14px** | 23.8px | **24px** |

**崖は 768 / 767 の 1 箇所だけ。** 他の幅では 1px も動かない。

### タッチターゲット

- プライマリボタン 240×55px
- 検索ボタン 150×48px
- カルーセルの矢印 40×40px（`border-radius: 50%`、`rgba(34,34,34,.5)` 面＋白 1px 枠）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```css
:root {
  /* Brand */
  --COLOR_BRAND_PRIMARY: #91003c;
  --COLOR_BRAND_SECONDARY: #c31f66;
  --COLOR_TEXT_LINK_HOVER: #750031;

  /* Text */
  --COLOR_FOREGROUND_DARK: #333;
  --COLOR_TEXT_BLACK: #222;
  --COLOR_TEXT_DATE: #747572;

  /* Surface */
  --COLOR_BACKGROUND_LIGHT: #f2f2f2;

  /* Type */
  --FONT_SIZE: 0.875rem;          /* ≥768px で 1rem */
  --LINE_HEIGHT: 1.7;
  --FONT_WEIGHT_REGULAR: 400;
  --FONT_WEIGHT_MEDIUM: 500;
  --FONT_WEIGHT_BOLD: 700;

  /* Shape */
  --BORDER_RADIUS_SMALL: 2px;
  --BORDER_RADIUS_LARGE: 4px;
  --BOX_SHADOW_CARD: 2px 6px 16px 0px #8000351f;

  /* Space */
  --SIZE_MODULE_MARGIN: 40px;
  --SIZE_CONTENT_SIDE_MARGIN: 60px;
}

body {
  font-family: Roboto, "Noto Sans JP", sans-serif;
  font-feature-settings: "halt";
  font-size: var(--FONT_SIZE);
  line-height: var(--LINE_HEIGHT);
  color: var(--COLOR_FOREGROUND_DARK);
}
```

### プロンプト例

> アドバンテストのデザインで、半導体テスト装置の製品一覧ページを作ってください。
> 書体は `Roboto, "Noto Sans JP", sans-serif` の 1 スタックのみ。**`body` に `font-feature-settings: "halt"` を 1 行だけ書いて全体に継承させ、`letter-spacing` はどの要素にも書かないこと**（`palt` に置き換えない）。
> `line-height` は `body` に単位なしの `1.7`。ウェイトは 400 / 500 / 700 の 3 段だけ使う。
> ブランド色は `#91003C`。CTA は角丸 0・`padding: 16px 24px`・15px / 700 の白文字。カードだけ `border-radius: 4px` と影 `rgba(128,0,53,.12) 2px 6px 16px`（黒にしない）。
> 本文は `#333333`、英字のセクション見出しは `#474C59` で 40px / 700 / `letter-spacing: 1px`。
> 本文サイズは 768px 未満で 14px、768px 以上で 16px の 2 段切替にする。
