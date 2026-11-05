# DESIGN.md — 西松建設（NISHIMATSU CONSTRUCTION）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-05 / 対象: `https://www.nishimatsu.co.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **Web フォントを 1 本も読み込まない。** `document.fonts` は空配列、フォントファイルのリクエストは **0 件**。游ゴシックの OS ローカルスタック 1 本で全ページを組み、**`font-weight: 700` を可視の 3 分の 2 に当てて**強さを作る。角丸はピル（`9999px`）と丸（`50%`）だけ、影はゼロ
- **密度**: 中。`body` 16px / `line-height: 1.6`、コンテナは **1660〜1760px** と広い
- **キーワード**: Web フォント 0 本、游ゴシック、ピル、影ゼロ、字間ゼロ、緑 `#009A53`

**このサイトの核心は5つある。**

1. **Web フォントが 1 本も無い。** `typography.fontFaces` は **空配列**、CSS 全文に `@font-face` が **0 件**、フォントファイルのリクエストも **0 件**。3 点すべてが揃って「OS ローカルのみ」と確定できる。**親切のつもりで Noto Sans JP を足すと別物になる**
2. **游ゴシックのスタックに Medium が 1 つも入っていない。** `游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", "ヒラギノ角ゴ Pro", …` の順で、**`游ゴシック Medium` / `Yu Gothic Medium` がどこにも無い**。`body { font-weight: 500 }` なので、Windows では 500 が游ゴシック Regular に解決されて細く出る。macOS のヒラギノとは太さが揃わない
3. **`letter-spacing` が全要素 `normal`。** トップ **161 / 161 要素**、下層 **99 / 99 要素**。例外は 1 つも無い。`font-feature-settings` も **0 件**。**字間を一切触らない設計**
4. **`font-weight: 700` が可視の 66%。** トップ 106 / 161 要素、下層 75 / 99 要素。**400 / 500 / 700 の 3 段で、太字が主役**。`body` が 500 で、見出し・ナビ・CTA がほぼ 700
5. **CSS 変数 23 個は、すべてアイコン種別の切り替え用。** `--blank` `--excel` `--pdf` `--powerpoint` `--word` `--zip` `--mail` `--rss` `--video` `--modal`（＋ `2` 付きの第 2 セット）`--prev` `--next` `--pause` `--play` `--toggle` `--menu`。**色でもサイズでもない。** `:root` に書かれていないので `customPropertiesSummary` は両ページとも **0** を返す

> **ヒーローのコピーは画像。** ヒーロー領域の矩形を列挙すると、**`<picture>` に包まれた `index_slide01_08.jpg` / `index_slide01_09.jpg`（どちらも 1440×450px）**が出てくる。`alt` は「まかせられる人が、いる。　全力西松」「進む。進む。進む。」。**大きな文字はすべて JPG に焼き込まれている**ので、Web フォントが無くても成立している
>
> **`html` に `font-family: "Hiragino Kaku Gothic ProN"` という受け皿なしの 1 語スタックが残っている。** 解決されるのは `html` / `head` / `title` / `meta` という**不可視要素だけ**で、`body` のスタックに上書きされるため**可視 0 要素**。新規実装でこの宣言は要らない

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Nishimatsu Green** | **`#009A53`** | **面 10 / 2 要素**（検索ボタン、カルーセルの現在位置、ページ上部へ）＋ **文字 11 / 7 要素**（`English` `検索` `一覧`、下層のページ見出し） |
| **Link Blue** | **`#006BAA`** | **文字 279 要素・罫線 279 要素**。メガメニューのリンク（`土木技術` `建築技術` …）と下層のリンク。**実は緑より圧倒的に多い** |
| **Alert Orange** | **`#EA5421`** | 文字 5・罫線 5（`NEW` バッジ） |
| **Alert Orange 2** | **`#EA5422`** | 文字 2・罫線 2（`重要なお知らせ` の見出しと本文リンク） |

> **オレンジが 2 つあるのは実装の実態。** `#EA5421`（R234 G84 B33）と `#EA5422`（R234 G84 B34）は **B が 1 違うだけ**で、スクリーンショットでは見分けがつかない。それでも両方が実装されていて、使い分けは「`NEW` バッジ」対「重要なお知らせ」。新規実装では `#EA5421` に寄せてよいが、既存ページと並べるときは 2 色あることを前提にする

> **ブランド色は緑だが、画面を支配しているのは青。** `#006BAA` が 279 要素に対し `#009A53` は 42 要素。**緑はアクセント（CTA・現在位置）、青はリンク**という分担

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文・見出し。**可視 56 / 13 要素**
- **Text on Dark** (`#FFFFFF`): 緑面・濃色面・写真上の文字（可視 43 / 28 要素）
- **Text on Dark Muted** (`#EEEEEE`): フッターのサイトマップリンク（**可視 42 要素**）。濃色面の上で `#FFFFFF` と使い分ける
- **Text Muted** (`#666666`): パンくず（可視 1 要素）
- **Divider Gray** (`#CCCCCC`): メガメニューの区切り見出し（可視 2 要素）
- **Copyright** (`#AAAAAA`): コピーライト行
- **Overlay** (`rgba(0, 0, 0, .8)`): PICK UP カードの写真の上に敷く帯（面 11 要素）
- **Dot Inactive** (`#888888`): カルーセルの非選択ドット（面 5 要素）
- **Surface Gray** (`#F5F5F5`): セクションの面（面 9 / 3 要素）
- **PDF Red** (`#EE3D23`): PDF アイコンの面（4 要素）
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **OS ローカルの游ゴシック系 1 本のみ。Web フォントは使わない**
- スタック（実サイトそのまま）:
  `游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, Osaka, Arial, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif`
- **可視 153 / 161 要素と 93 / 99 要素**がこのスタック

### 3.2 欧文フォント

- **数字の強調表示だけ別スタック**: `Arial, Helvetica, "sans-serif"`（可視 8 / 6 要素）。`数字で見る西松建設` の `1874` `1963` `193` を 100px / weight 700 で組む

> **`"sans-serif"` を引用符で囲むと受け皿が死ぬ。** クォートすると「`sans-serif` という名前のフォント」を探す指定になり、generic family として扱われない。Arial も Helvetica も無い環境では**ブラウザ既定のフォントに落ちる**。**実サイトはこうだが、正しくは `Arial, Helvetica, sans-serif`**

### 3.3 font-family 指定

```css
body {
  font-family: 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic",
               "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
               メイリオ, Meiryo, Osaka, Arial,
               "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: normal;
  word-break: break-word;
  color: #333333;
}

/* 数字の強調（実サイトはこう書かれている） */
.number { font-family: Arial, Helvetica, "sans-serif"; }
/* 正しくは ↓ */
.number { font-family: Arial, Helvetica, sans-serif; }
```

> **Windows の游ゴシック問題に対処していない。** スタックに Medium が入っていないので、`font-weight: 500` は Windows で游ゴシック Regular に当たる。太さを揃えるなら、収録済みサイトの 3 つの流儀のどれかを採る:
> 1. **スタック順で解く**（東京オペラシティ AG 方式）: `"游ゴシック Medium", "Yu Gothic Medium"` を `YuGothic` より**前**に置く
> 2. **別名方式**（SmartHR / 白鶴）: `@font-face { font-family: YuGothicM; src: local("Yu Gothic Medium") }` を作ってスタック先頭に置く
> 3. **上書き方式**（カリモク）: `@font-face` で `"Yu Gothic"` の `font-weight: 500` に Medium をマッピングする

> **`html { font-family: "Hiragino Kaku Gothic ProN" }` は不要。** 受け皿が無い 1 語スタックで、`body` に上書きされるため可視 0 要素。新規実装では書かない

> **IR ウィジェット（`ssl4.eir-parts.net`）が別スタックを持ち込む。** `メイリオ, Meiryo, "ヒラギノ角ゴ Pro W3", …, arial, helvetica, clean, sans-serif` という**メイリオ先頭のレガシースタック**で、外部ベンダー由来。サイト本体の設計ではないので真似しない

### 3.4 文字サイズ・ウェイト階層

| 役割 | サイズ | ウェイト | 行間 | 色 |
|------|--------|---------|------|-----|
| **数字の強調** | **100px** | **700** | 110px（1.1） | `#FFFFFF` |
| 数字の単位 | 50px | 700 | 1.1 | `#FFFFFF` |
| ページ見出し（下層 `h1`） | 32px / 36px | 700 | 51.2px（1.6） | `#333333` |
| セクション見出し | **30px** | **700** | 33px（1.1）/ 42px（1.4） | `#333333`・反転時 `#FFFFFF` |
| ブロック見出し | 24px | 700 | 1.4 | `#333333` |
| 数字のラベル | 22px | 700 | 1.1 | `#FFFFFF` |
| カードタイトル・ナビ見出し | 20px | 700 | 32px（1.6） | `#006BAA` |
| 注意喚起見出し | 18px | 700 | 25.2px（1.4） | **`#EA5422`** |
| 本文・リンク | **16px** | **700**（リンク）/ **500**（本文） | 25.6px（1.6） | `#333333` |
| ナビ上段・日付 | 14px | 500 | 14px（1.0）/ 22.4px（1.6） | `#333333` |
| バッジ | 13px | 500 | 14.3px（1.1） | `#FFFFFF` |
| `English` / `検索` | 12px | 500 | — | `#009A53` |

- **ウェイトは 400 / 500 / 700 の 3 段**（可視 22 / 33 / 106 要素）。**600 も 900 も無い**
- **700 が圧倒的多数（66%）。** ナビ項目もリンクも見出しも 700。`body` の 500 が出るのはヘッダー上段・日付・リスト項目など限られた場所だけ
- **`h3` にはスタイルが当たっていない**（トップの `h3` はニュース見出しで 16px / weight 400 / 1.6）。見出しレベルとサイズは対応していないので、スタイルはクラスで当てる

### 3.5 行間・字間

- **行間は無単位の `1.6` を `body` に 1 回だけ**。実測で行間比 1.6 が **75 / 68 要素**と最多
- 用途別に取り直す: 1.4（セクション見出し・注意喚起）、1.1（ニュースの日付・数字）、1.0（ヘッダーのナビ）、1.38（ボタン内）
- **字間は 1 要素も触らない。** `letter-spacing` は **161/161・99/99 要素が `normal`**。`em` も `px` も配らない
- **`font-feature-settings` も 0 件**。`palt` も `halt` も使わない

### 3.6 禁則処理・改行ルール

- `body { word-break: break-word }` を 8 幅すべてで確認。**`break-all` ではない**
- `word-break: auto-phrase` は使っていない
- ヒーローの大きなコピーは画像なので、改行制御の対象外

### 3.7 OpenType 機能

- **実測 0 件。** `palt` も `halt` も当てていない。**約物をそのまま組む**
- OS ローカル書体なので、環境によって約物の詰まり方が変わる前提の設計

### 3.8 縦書き

- **縦組みは使っていない**（`typography.verticalWriting` が両ページとも空）

---

## 4. Component Stylings

### Buttons

```css
/* ピル型ボタン（最頻） */
.button {
  border-radius: 9999px;
  box-shadow: none;              /* ★ 影は実測 0 種 */
  font-weight: 700;
  color: #333333;
}

/* 検索ボタン（右半分だけピル） */
.header-search__submit {
  border-radius: 0 9999px 9999px 0;
  background: #009a53;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 25.6px;
  padding: 1px 6px;
}

/* 下層のリンクボタン */
.button-more { border-radius: 999px; font-weight: 700; }

/* ページ上部へ（丸） */
.to-top {
  border-radius: 50%;
  background: #009a53;
  color: #ffffff;
}
```

- **角丸は 2 種のみ**: `9999px` / `999px`（ピル・可視 12 / 3 要素）と `50%`（丸・7 要素）。**中間の角丸は存在しない**

### Badges / Chips

```css
.badge {
  font-size: 13px;
  font-weight: 500;
  line-height: 14.3px;          /* 1.1 */
  border-radius: 9999px;
  background: #009a53;          /* または rgba(0,0,0,.8) */
  color: #ffffff;
  letter-spacing: normal;
}

/* NEW ラベルは面を持たず文字色だけ */
.label-new { color: #ea5421; font-weight: 700; }
```

### Cards

```css
.card {
  background: #f5f5f5;
  border-radius: 0;             /* カードは角丸なし */
  box-shadow: none;
}

/* 写真の上に文字を載せるカード */
.card--photo {
  background-image:
    linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)),
    url(...);                   /* 帯を要素自身の background に持たせる */
  color: #ffffff;
}
```

### Inputs

- 検索入力は 16px / weight 400。閉じるボタンは `border: 2px outset #000000`（UA 既定の `<button>` がそのまま残っている）

---

## 5. Layout Principles

### Container

- **トップは 1660px / 1760px**（可視 3 / 1 要素）、下層は **1260px / 1264px / 1200px**
- **トップだけ極端に広く、下層は一般的な 1200〜1260px に戻る**

### Spacing Scale

- `gap` の実測は両ページとも **0 件**。余白は `margin` / `padding` で作っており、Flexbox/Grid の `gap` を使っていない

### Grid

- ニュースと IR ニュースは 2 カラム
- PICK UP は 3 カラムの写真カード
- メガメニューは 4〜5 カラムのリンクリスト

---

## 6. Depth & Elevation

- **`box-shadow` は両ページとも 0 種。影を一切使わない**
- 階層は**面色（`#F5F5F5` / `rgba(0,0,0,.8)` / 白）と罫線**で作る
- 写真の上の文字は `rgba(0, 0, 0, .8)` の帯で読ませる（**半透明が濃い**ので、写真はほぼ黒く沈む）

---

## 7. Do's and Don'ts

### Do（推奨）

- **Web フォントを読み込まない。** OS ローカルの游ゴシックスタックで組む
- **`letter-spacing` は `normal`。** 字間を配らない
- **`line-height: 1.6` を無単位で `body` に 1 回だけ**書いて継承させる
- **リンクと見出しは `font-weight: 700`。** このサイトの強さは太字で作っている
- **角丸はピル（`9999px`）か丸（`50%`）か 0**。中間値を使わない
- **影を使わない。** 面色と罫線で階層を作る
- 緑 `#009A53` は CTA とアクセント、青 `#006BAA` はリンク、と役割を分ける
- 写真の上に文字を置くときは `rgba(0, 0, 0, .8)` の帯を**要素自身の `background-image`** に持たせる

### Don't（禁止）

- **Noto Sans JP や游ゴシックの Web フォント版を足さない。** 実測で `@font-face` 0 件・フォント要求 0 件
- **`font-family: Arial, Helvetica, "sans-serif"` の引用符を真似しない。** 正しくは `sans-serif`（クォートなし）
- **`html { font-family: "Hiragino Kaku Gothic ProN" }` を書かない**（可視 0 要素の死んだ宣言）
- **`box-shadow` を足さない**（実測 0 種）
- **`border-radius` に 4px / 8px のような中間値を使わない**
- **`palt` / `halt` を足さない**（実測 0 件）
- **`line-height` を px の絶対値で書かない。** 767px で `body` が 16px → 14px に変わるので、px 固定だと行間比が崩れる
- **CSS 変数を色やサイズのトークンとして前提にしない。** このサイトの 23 個はアイコン種別の切り替え専用
- **IR ウィジェット（eir-parts）のメイリオ先頭スタックを本体に持ち込まない**
- `word-break: break-all` にしない（`break-word` が実装値）

---

## 8. Responsive Behavior

### Breakpoints

```
print, screen and (min-width: 768px)
only screen and (max-width: 767.98px)
print, screen and (min-width: 1260px)
only screen and (max-width: 1259.98px)
only screen and (min-width: 1260px) and (max-width: 1365.98px)
screen and (min-width: 768px) and (max-width: 1260px)
print
```

- **`767.98px` / `1259.98px` / `1365.98px` という 0.02px 刻みの境界**（Bootstrap 系の作法）
- **`print` を常に併記する**

### フォントサイズの調整

**`html` は 8 幅すべてで `10px`（`62.5%`）固定。流体ではない。** 切り替わるのは `body` と個別要素。

| 幅 | `html` | `body` | `body` weight | `h1` | `h2` | `h3` |
|----|--------|--------|---------------|------|------|------|
| 1440px | 10px | 16px / 25.6px | **500** | 32px / 51.2px | 18px / 25.2px | 16px / 25.6px |
| 1200px | 10px | 16px / 25.6px | 500 | 32px / 51.2px | 18px / 25.2px | 16px / 25.6px |
| 1024px | 10px | 16px / 25.6px | 500 | 32px / 51.2px | 18px / 25.2px | 16px / 25.6px |
| 834px | 10px | 16px / 25.6px | 500 | 32px / 51.2px | 18px / 25.2px | 16px / 25.6px |
| **768px** | 10px | **16px / 25.6px** | **500** | 32px / 51.2px | 18px / 25.2px | 16px / 25.6px |
| **767px** | 10px | **14px / 22.4px** | **400** | **28px / 44.8px** | **15px / 24px** | **13px / 20.8px** |
| 390px | 10px | 14px / 22.4px | 400 | 28px / 44.8px | 15px / 24px | 13px / 20.8px |
| 375px | 10px | 14px / 22.4px | 400 | 28px / 44.8px | 15px / 24px | 13px / 20.8px |

- **767px で `body` のウェイトが 500 → 400 に落ちる。** サイズだけでなく太さも変わるので、モバイルは全体が一段軽く見える
- **行間比 1.6 は両側で保たれる**（25.6/16 = 22.4/14 = 1.6）
- **768px と 767px の 1px 以外に崖は無い**。1440〜768px はまったく同じ値

### タッチターゲット

- ピルボタンは高さ 40px 以上。カルーセルのドットは直径 12px だが、親で領域を確保している

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体: 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", "ヒラギノ角ゴ Pro",
      "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, Osaka, Arial,
      "ＭＳ Ｐゴシック", "MS PGothic", sans-serif
Web フォント: 0 本（@font-face 0 件・フォント要求 0 件）
数字の強調: Arial, Helvetica, sans-serif（実サイトは "sans-serif" とクォートしている＝誤り）
ルート: html = 10px（62.5%）固定・全幅
本文: 16px / line-height 1.6（無単位）/ font-weight 500 / color #333333
      767px 以下は 14px / weight 400
字間: normal（全要素・例外なし）
palt: 使わない（0 件）
ウェイト: 400 / 500 / 700 の 3 段。700 が可視の 66%
ブランド緑: #009A53 ／ リンク青: #006BAA ／ 警告橙: #EA5421
角丸: 9999px（ピル）/ 50%（丸）/ 0。中間値なし
影: 0 種（使わない）
コンテナ: トップ 1660〜1760px、下層 1200〜1264px
gap: 使わない（margin / padding で組む）
ブレークポイント: 767.98 / 768 / 1259.98 / 1260 / 1365.98px
CSS 変数: 23 個あるがすべてアイコン種別の切り替え用
word-break: break-word
```

### プロンプト例

```
西松建設のコーポレートサイトのスタイルで、技術紹介の一覧ページを作ってください。

- Web フォントは読み込まない。游ゴシック体 → YuGothic → 游ゴシック → "Yu Gothic" →
  "ヒラギノ角ゴ Pro" → "Hiragino Kaku Gothic Pro" → メイリオ → Meiryo → Osaka → Arial →
  "ＭＳ Ｐゴシック" → "MS PGothic" → sans-serif のスタック
- body は 16px / line-height 1.6（無単位）/ font-weight 500 / #333333
- letter-spacing は normal。font-feature-settings も使わない
- セクション見出しは 30px / font-weight 700 / line-height 1.4
- リンクは #006BAA / font-weight 700、CTA の面は #009A53
- ボタンは border-radius: 9999px のピル。box-shadow は使わない
- カードは背景 #F5F5F5、角丸なし
- gap は使わず margin / padding で余白を作る
- コンテナ最大幅 1260px
- 767px 以下で body を 14px / font-weight 400 に落とす
```

```
数字を見せるセクションを作ってください。

- 面は濃色、数字は 100px / font-weight 700 / #FFFFFF /
  font-family: Arial, Helvetica, sans-serif（※ sans-serif はクォートしない）
- 単位は 50px、ラベルは 22px、どちらも font-weight 700 / line-height 1.1
- 見出しは 30px / font-weight 700 / #FFFFFF
- 写真の上に重ねるなら rgba(0, 0, 0, .8) の帯を要素自身の background-image に
  linear-gradient で持たせる（兄弟の絶対配置要素にしない）
```
