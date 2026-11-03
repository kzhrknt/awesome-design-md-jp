# DESIGN.md — 関西ペイント（Kansai Paint）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-03 / 対象: `https://www.kansai.co.jp/`, `/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **見出しを欧文で立て、和文は小さなラベルとして添える。** セクション名は必ず「和文 11〜12px ＋ 欧文 48〜56px」の対で組まれる（`ニュース News` / `会社情報 COMPANY` / `取り組み KP STREAM`）
- **密度**: 低い。本文の行間は **1.40** と和文としてはかなり詰まっており、代わりに余白とフルブリードの写真で間を取る
- **キーワード**: Noto Sans JP ＋ Inter の和欧二層、和文ラベル＋欧文大見出し、2px の角丸、青い影、画面幅に比例して全部が縮む

**このサイトの核心は4つある。**

1. **ページ全体が画面幅に比例して拡大縮小する。** `html { font-size: 1.1713030747vw }`（設計幅 1366px）で、サイズ・字間・行間・余白がすべて `rem`。**`max-width` を持つコンテナが 1 つも無い**（実測の最大幅は `100%` のみ）
2. **その結果、751px で本文が 8.8px になる。** 751px → 750px で `html` が **8.80px → 32px（3.64 倍）**に跳ぶ。**規定の 4 幅（1440 / 1200 / 834 / 375px）では崖が見えない**
3. **字詰めをしない。** `font-feature-settings` は両ページとも **0 要素**。代わりに `body` に `0.03em`（= 0.48px）をごく薄く掛けるだけ
4. **CSS Custom Properties は実質 0 個。** 検出された 2 個は WordPress / Gutenberg の `--wp--preset--font-size--*` で、サイトの設計トークンではない

> **計測上の注意: `interactive` の上位は全部 OneTrust（CMP）。** `OK` `全てのクッキーを受け入れる` `Apply` `Clear` `Filter Icon` と、その青 **`#3860BE`** はこのサイトのブランド色ではない。**ブランドの青は `#0068B8` / `#005BAC` の 2 つ**で、CMP の青とは別物。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Kansai Blue** | **`#0068B8`** | **可視 16 要素の文字色**。`お知らせ` `企業情報` のカテゴリラベル、`詳しく見る` のリンク |
| **Kansai Blue Dark** | **`#005BAC`** | **可視 12 要素**。タグチップ（`#外壁` `#漆喰塗料`）の文字色と **1px の枠** |
| **Navy（面）** | **`#27455C`** | 面として 6 要素。フッターまわりの濃紺 |
| **Near Black（面・文字）** | **`#19191A`** | 見出しの文字（可視 21 要素）。**トップの地は白だが、下層 `/company/` のヒーローはこの黒** |

> **青が 2 つあるのは実装の実態。** `#0068B8` が文字・リンク用、`#005BAC` がタグチップ専用（文字と枠で同じ値を使う）。**RGB で 13 しか違わないが、どちらも実装されている。** 片方に丸めるとタグチップの枠だけ色が浮く。

### Neutral（ニュートラル）

- **Text Primary** (`#383838`): 本文（**可視 42 要素**）。`html { color: #383838 }` として html5-boilerplate のリセットに書かれている
- **Text Heading** (`#19191A`): 見出し（可視 21 要素）
- **Text Sub Label** (`#5C6373`): **グローバルナビの和文ラベル専用**（`取り組み` `会社情報` `ニュース`。可視 6 要素）
- **Text Date** (`#626366`): ニュースの日付（可視 10 要素）
- **Text on Dark** (`#ffffff`): ヒーロー・黒面の上（可視 58 要素）
- **Text Inactive** (`#98A6B3`): 言語切替の非選択（`EN`）。選択中は `#00143D`
- **Border** (`#DBDBDB`): 罫線
- **Surface** (`#F2F1F1`) / (`#F5F5F5`): カード・セクションの面
- **Surface Tint** (`#F5F9FC`): **わずかに青を帯びた面**。`KP STREAM` `Recommend` のセクション背景
- **Background**: トップは `#ffffff`、**`/company/` のヒーローは `#000000`**（根拠 `viewportTopBySample (6/10)`）

### CMP（使ってはいけない色）

- `#3860BE`: **OneTrust の既定色**。可視 7 要素はすべて Cookie バナー。**ブランド色として採用しない**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Noto Sans JP**（Google Fonts 配信）。**400 / 500 / 700 の 3 ウェイトが `loaded`**
- **`document.fonts` のエントリは 1236 件あるが、これは Google Fonts の CJK サブセット分割**（`unicode-range` で百数十本に割られる）。**ウェイトが 1236 種類あるわけではない**
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ（主）**: **Inter**。**400 / 500 / 600 / 700 が `loaded`**。グローバルナビの英字、セクションの大見出し、`Scroll`、言語切替
- **コンデンス（日付専用）**: **Barlow Condensed 600**。ニュースの日付（実測 10 要素）だけに使う
- **Barlow（非コンデンス）の 400 / 500 / 700 は宣言されているが、両ページとも `unloaded`・可視 0 要素。** 使われていない

### 3.3 font-family 指定

```css
/* 本文・UI（実測 140 要素） */
font-family: "Noto Sans JP", sans-serif;

/* 英字見出し・ナビ・UI ラベル（実測 28 要素） */
font-family: Inter, sans-serif;

/* ニュースの日付のみ（実測 10 要素） */
font-family: "Barlow Condensed", sans-serif;
```

**フォールバックの考え方**:
- **和文優先。** `"Noto Sans JP", sans-serif` の 2 段だけで、游ゴシック・ヒラギノを並べない割り切り
- **欧文は和文スタックに混ぜず、要素ごとに `Inter` へ切り替える。** 「英字見出しは Inter、その下の和文ラベルは Noto Sans JP」と**要素を分けて指定する**のがこのサイトの組み方
- 日付だけコンデンス体にするため、`Barlow Condensed` を単独で当てる

### 3.4 文字サイズ・ウェイト階層

**サイズはすべて 1440px 時点の実測値。** `html` が `vw` なので、画面幅に比例して変わる（§8 参照）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Hero Title** | **Inter** | **56px** | **700** | 1.40 (78.4px) | **1.6px (0.1rem)** | **`SUSTAINABILITY` `R&D` `INVESTORS`。白文字** |
| **Page Title（欧文）** | **Inter** | **56px** | **700** | 0.86 (48px) | **1.5px** | **下層の `COMPANY`。白文字** |
| **Section Title（欧文）** | **Inter** | **48px** | **700** | **1.00** | — | **`News` `IR News` `Top Message` `Overview`** |
| **Section Label（和文）** | Noto Sans JP | **12px** | **700** | 1.50 (18px) | 0.48px | **欧文大見出しとペアになる小ラベル** |
| Lead | Noto Sans JP | 40px | 700 | — | — | `お問い合わせ` |
| Statement | Noto Sans JP | 34〜35px | 700 | 1.36 | — | `塗料で人を幸せにする` |
| Feature Title | Noto Sans JP | 28px | 700 | 1.14 | 0.48px | `リフォームサミット` |
| Sub Heading | Noto Sans JP | 22px | 700 | — | 0.48px | `会社概要` `社長メッセージ` `創業者の想い` |
| Breadcrumb Root | Noto Sans JP | 20px | 700 | 1.50 (30px) | 0.48px | `HOME` |
| Product Name | Noto Sans JP | 18px | 700 | **1.87** | 0.48px | `建築用塗料` `防食用塗料` |
| **Body** | Noto Sans JP | **16px** | **400** | **1.40** (22.4px) | **0.48px** | **`body` の既定。実測 42 要素** |
| Card Heading | Noto Sans JP | 16px | 700 | 1.40 (22.4px) | 0.48px | `KP STREAM` `研究開発`（白文字） |
| **Nav（欧文）** | **Inter** | **16px** | **600** | 1.40 (22.4px) | **normal** | **`KP STREAM` `COMPANY` `NEWS`** |
| Article Title | Noto Sans JP | 15px | 400 | **1.73** | 0.48px | 記事カードの見出し |
| **Date** | **Barlow Condensed** | **14px** | — | **1.93** | **0.56px** | **`2026.10.01`。`#626366`** |
| List / Label | Noto Sans JP | 13px | 400 / 600 | 1.40 (18.2px) | 0.48px | `Scroll`（Inter 600）、カテゴリ |
| Tag Chip | Noto Sans JP | 12px | 500 | **1.67** | 0.48px | `#外壁`。文字・枠とも `#005BAC` |
| Utility Nav | Noto Sans JP | 12px | 400 | 1.40 | 0.48px | `採用情報` `お問い合わせ` |
| **Nav（和文ラベル）** | Noto Sans JP | **11px** | **500** | 1.40 (15.4px) | 0.48px | **`取り組み` `会社情報`。`#5C6373`** |
| Copyright | Noto Sans JP | 10px | 400 | — | — | `#999999` |

**ウェイトは 400 / 500 / 600 / 700 の 4 段。ただし 600 は Inter 専用**（実測 10 要素はすべて英字ナビ）。**Noto Sans JP 側は 400 / 500 / 700 の 3 段**で、600 のファイルは読み込んでいない。

### 3.5 行間・字間

- **本文の行間**: **1.40**（実測 107 要素で圧倒的に最多）。**和文としてはかなり詰まっている**
- **読み物の行間**: 1.87〜1.88（製品説明・社長メッセージ）。**本文と読み物で 1.4 と 1.88 に割れる**
- **欧文大見出しの行間**: **1.00**（48px の `News` など）/ 0.86（56px の `COMPANY`）
- **字間**: **`body` の `0.03em`（= 0.48px）がほぼ全要素に継承される**（実測 145 要素）

**字間の継承について（重要）**:

`body { letter-spacing: 0.03em }` は root 16px のとき **0.48px** という絶対値になり、そのまま子孫へ降りる。**サイズに比例しない**（12px の要素も 20px の要素も 0.48px）。

さらに **`html` が `vw` 流体なので、この px 値自体が画面幅で動く**:

| 画面幅 | root | `body` の letter-spacing |
|---|---|---|
| 1440px | 16px | **0.48px** |
| 1200px | 14.0556px | **0.421669px** |
| 834px | 9.76867px | **0.29306px** |
| 375px | 15px | **0.45px** |

- **大見出しだけ `rem` で字間を持つ**: 56px の `SUSTAINABILITY` は **1.6px = 0.1rem**、`COMPANY` は 1.5px。これも root に比例して動く
- **英字ナビ（Inter 16px / 600）は `normal`**。欧文は字間を足さない

**ガイドライン**:
- **`letter-spacing: 0.03em` は `body` に 1 回だけ。** 子要素で `em` を再宣言しない
- **`line-height` は無単位の比率で書く**（UI 1.4 / 読み物 1.87 / 欧文大見出し 1.0）
- **和文本文に 1.4 を使うのはこのサイトの特徴だが、可読性としては攻めた値。** 長文を足すときは読み物側の 1.87 を使う

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- **`word-break` は `body` も含め全要素 `normal`**（実測）。`break-all` は使わない
- 製品説明は `<br>` で改行位置を固定している（`建築物の劣化を防ぎ美観を創る、` / `優れた建築用機能...`）

### 3.7 OpenType 機能

**`font-feature-settings` は両ページとも 0 要素**（全要素 `normal`）。

- **`palt` を足さないこと。** このサイトは**約物を詰めない**設計で、代わりに `0.03em` をごく薄く掛けている
- 括弧や中黒の多い和文ラベル（`株主・投資家様向け IRニュース`）も素の字送りのまま組む

### 3.8 縦書き

**実測 1 要素のみで、サイト本体の組版ではない。**

- `p.scroll-down__txt`（`Scroll`）が `writing-mode: vertical-rl`。**Inter 13px / 600 の欧文**で、ヒーロー右下（18×124px）の側面タブ
- **和文の縦組みは使っていない。** 縦組みを実装するときの参考にはしない

---

## 4. Component Stylings

**角丸は `2px` が基本。** 実測 14 要素が `2px`、ほかは円（`50%`）が 3 要素、`5px` が 1 要素だけ。

### Buttons

**このサイトには面で塗ったブランド CTA が無い。** 実測した塗りボタンは全部 OneTrust（CMP）のもの。ブランド側の導線は**枠線のチップ**と**下線なしのテキストリンク**で作られている。

**Outlined Chip（タグ）**
- Background: `#ffffff` / Text: `#005BAC`
- Border: **`1px solid #005BAC`** / Border Radius: **`2px`**
- Padding: `0 7px` / Font: 12px / 500 / line-height 1.67 / letter-spacing 0.48px

**Text Link**
- Text: `#0068B8`（`詳しく見る`）/ Font: 15px / 400
- 面も枠も持たない

**Header Button（お問い合わせ）**
- Background: `#ffffff` / Text: `#19191A`
- Border Radius: **`0`** / Padding: `8px 16px` / Font: 18px / 500
- 実体は `header-btn.svg` / `header-btn-on.svg`（260×48）の画像差し替え

**Carousel Indicator**
- Border Radius: `50%` / Border: `1px solid #ffffff`（選択中）
- Font: Inter 11px / 700 / 白文字（`01` `02` `03`）

### Cards

**記事カード**
- Background: `#ffffff`
- Border Radius: `2px`
- Box Shadow: **`rgba(49, 100, 152, 0.1) 5px 5px 30px 0`**（実測 4 要素）
- 見出し 15px / 400 / line-height 1.73、日付は Barlow Condensed 14px

**セクション面**
- Background: `#F5F9FC`（青みの面）/ `#F2F1F1` / `#F5F5F5`
- Border Radius: `0`

### Section Heading（このサイトの型）

```html
<h2>
  <span class="ja">ニュース</span>   <!-- Noto Sans JP 12px / 700 / #19191A -->
  <span class="en">News</span>       <!-- Inter 48px / 700 / line-height 1.0 -->
</h2>
```

**和文を先に小さく置き、欧文を大きく続ける。** 両ページで一貫している（`ニュース News` / `株主・投資家様向け IRニュース` / `関西ペイントの取り組み KP STREAM` / `会社情報 COMPANY` / `社長メッセージ Top Message` / `関西ペイントについて Overview`）。

---

## 5. Layout Principles

### Spacing Scale

**余白もすべて `rem`。** 画面幅に比例して縮むため、px の固定値を持たない。1440px 時点の実測を基準にする。

| Token | 1440px での値 | 備考 |
|-------|------|------|
| XS | 8px | `0.5rem` |
| S | 12px | `0.75rem` |
| M | 16px | `1rem` |
| L | 30px | カードの影のぼかし半径と同値 |
| XL | 48px | — |

### Container

- **`max-width` を持つコンテナが 1 つも無い**（実測の最大幅は `100%` のみ）
- **幅の制御は `html` の `vw` に委ねている。** 1366px を超えると root が 16px で止まるので、それ以上は余白だけが広がる
- **設計幅は 1366px**（デスクトップ）/ **375px**（モバイル）

### Grid

- ニュース・記事は 4 カラムの横並び（実測のカード幅 381 / 321 / 322 / 534px と不揃い＝写真の縦横比に合わせている）
- 製品アイコンは 110×110px の正方形グリッド

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | ほぼすべての要素 |
| 1 | **`rgba(49, 100, 152, 0.1) 5px 5px 30px 0`** | 記事カード（実測 4 要素） |

**影は 1 種類しかなく、黒ではない。** `rgb(49,100,152)` は**青みの強いグレー**で、ブランドの青（`#0068B8`）を薄めた色。

- **`rgba(0,0,0,.1)` に置き換えない。** 青みが消えて沈んだ印象になる
- **オフセットは `5px 5px`（右下）。** 真下（`0 Npx`）ではない
- 下層ページ（`/company/`）には**影が 1 つも無い**（CMP のものを除く）

---

## 7. Do's and Don'ts

### Do（推奨）

- **セクション見出しは「和文 12px / 700 ＋ 欧文 48px / 700（Inter）」の対で組む**
- **欧文は和文スタックに混ぜず、要素ごとに `Inter` へ切り替える**
- **`letter-spacing: 0.03em` は `body` に 1 回だけ宣言する**（子は px で継承する）
- **`line-height` は UI 1.4 / 読み物 1.87 / 欧文大見出し 1.0 で使い分ける**
- 日付は **Barlow Condensed** で組む（サイト唯一のコンデンス体の用途）
- 角丸は **`2px`** を既定にする
- 影を使うときは **`rgba(49,100,152,.1) 5px 5px 30px 0`** だけ
- ナビは「英字 Inter 16px / 600（`#000000`）＋ 和文 11px / 500（`#5C6373`）」の 2 段

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素）
- **`#3860BE` をブランド色として使わない。** OneTrust（CMP）の既定色で、サイトの設計ではない
- **Noto Sans JP に `font-weight: 600` を当てない。** 読み込んでいるのは 400 / 500 / 700 の 3 本（600 は Inter 側にだけ存在する）
- **`Barlow`（非コンデンス）を使わない。** 宣言はあるが両ページとも `unloaded`・可視 0 要素
- **`letter-spacing` を子要素で `em` 再宣言しない**
- **黒い影・真下に落ちる影を足さない**
- **px で幅や余白を固定しない。** このサイトは全部 `rem` で、固定値を混ぜると画面幅を変えたときにそこだけ取り残される
- **下層ページの地色を `#ffffff` と決め打ちしない**（`/company/` のヒーローは `#000000`）
- **751px 前後の見え方を確認せずに出さない**（§8）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 750px** | `(max-width: 750px)`（**ルール数 384 件で最多**） |
| **Desktop** | **≥ 751px** | `(min-width: 751px)`（120 件） |
| Narrow Desktop | 750–1100px | `(min-width: 750px) and (max-width: 1100px)` |
| — | 750–900px | `(min-width: 750px) and (max-width: 900px)` |

**実質 750px の 1 本で切り替わる設計。**

### ルートの文字サイズ（このサイトで最も注意する点）

```css
/* デスクトップ: 設計幅 1366px。16 ÷ 1366 = 1.1713030747vw */
html { font-size: 1.1713030747vw; }   /* ただし 1366px 以上では 16px で止まる */

/* モバイル（≤750px）: 設計幅 375px。16 ÷ 375 = 4.2666666667vw */
html { font-size: 4.2666666667vw; }

body { font-size: 1rem; }             /* デスクトップ */
body { font-size: 0.9375rem; }        /* モバイル（= 15px @375px） */
```

| 画面幅 | `html` | `body` |
|---|---|---|
| 1440px | **16px** | 16px |
| 1366px | **16px** | 16px |
| 1360px | 15.9297px | 15.9297px |
| 1100px | 12.8843px | 12.8843px |
| 900px | 10.5417px | 10.5417px |
| 800px | 9.37042px | 9.37042px |
| **751px** | **8.79649px** | **8.79649px** |
| **750px** | **32px** | **30px** |
| 500px | 21.3333px | 20px |
| 375px | **16px** | **15px** |

**751px → 750px で root が 8.80px → 32px（3.64 倍）に跳ぶ。**

- **最悪の幅は 751px**。本文が **8.8px** になり、実用的に読めない
- **規定の 4 幅（1440 / 1200 / 834 / 375px）では崖が見えない。** 834px は「ただの流体」、375px は「きれいに 16px」に見えるため、**必ず 751 / 750px を測る**
- **モバイルは 750px でちょうど 32px（倍）、375px でちょうど 16px**。つまり 375px 設計をそのまま 2 倍まで引き伸ばす構造

### フォントサイズの調整

**個別の見出しにブレークポイントごとのサイズ指定は無い。** `html` の `vw` ですべてが連動するため、`h2` の 56px は 1200px で 49.19px、1024px で 41.98px と自動で縮む。

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）
- モバイルでは root が 16px に戻るので、`rem` 指定のままで十分な大きさになる

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:  #0068B8（文字・リンク） / #005BAC（タグチップの文字と枠）
Text Color:     #383838（本文） / #19191A（見出し） / #5C6373（ナビ和文ラベル）
Background:     #ffffff / #F5F9FC（青みの面） / #000000（下層ヒーロー）
Border:         #DBDBDB
Font (JA):      "Noto Sans JP", sans-serif   ← 400 / 500 / 700 のみ
Font (EN):      Inter, sans-serif            ← 400 / 500 / 600 / 700
Font (日付):     "Barlow Condensed", sans-serif
Body Size:      16px @1440px（html が vw なので幅で変わる）
Line Height:    1.4（UI） / 1.87（読み物） / 1.0（欧文大見出し）
Letter Spacing: 0.03em を body に1回だけ
palt:           使わない
Radius:         2px
Shadow:         rgba(49,100,152,.1) 5px 5px 30px 0（1種のみ）
Root:           1.1713030747vw（≥751px、1366px で 16px 上限）
                4.2666666667vw（≤750px、375px で 16px）
```

### プロンプト例

```
関西ペイントのデザインシステムに従って、ニュース一覧セクションを作成してください。
- セクション見出しは和欧の対にする:
    和文 "ニュース" = "Noto Sans JP" 12px / 700 / #19191A
    欧文 "News"    = Inter 48px / 700 / line-height: 1.0
- body に letter-spacing: 0.03em と line-height: 1.4 を1回だけ書き、子では再宣言しない
- font-feature-settings の palt は付けない
- 日付は "Barlow Condensed" 14px / #626366
- 記事見出しは "Noto Sans JP" 15px / 400 / line-height: 1.73
- タグは枠線チップ: 文字と border を #005BAC、border-radius: 2px、padding: 0 7px
- カードの影は rgba(49,100,152,.1) 5px 5px 30px 0 のみ（黒い影は使わない）
- サイズ・余白はすべて rem で書く（px 固定を混ぜない）
- html は 1.1713030747vw（1366px で 16px 上限）、750px 以下で 4.2666666667vw
- Noto Sans JP に font-weight: 600 を当てない（400/500/700 のみ）
```
