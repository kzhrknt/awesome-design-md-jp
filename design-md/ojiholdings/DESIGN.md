# DESIGN.md — 王子ホールディングス（Oji Holdings）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-12 / 対象: `https://www.ojiholdings.co.jp/`, `/group/about.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **字間を一切いじらない。** 可視 216 要素のうち **208 要素が `letter-spacing: normal`**（残り 8 件は Cookiebot）。詰めも開きもせず、書体の素の字送りで組む。代わりに**改行のルールを厳しく縛る**
- **密度**: 中。本文 15px / 行間 1.6、`1152px` のコンテナ。60px の和文大見出しと 48px の欧文見出しで強弱をつける
- **キーワード**: 王子ブルー、`line-break: strict`、行間 1.6em、Poppins、角丸 4px

**このサイトの核心は3つある。**

1. **`line-break: strict` ＋ `overflow-wrap: anywhere` ＋ `word-break: normal` の 3 点セットを `body` に書いて全要素へ継承させている。** 日本語の禁則を**厳格側**に倒し（小書き仮名「ゃゅょっ」や長音符「ー」も行頭に置かせない）、そのうえで長い URL や英単語はどこでも折る。**字間ではなく改行で読みやすさを作る設計**
2. **`font-family` のフォールバックが `serif`。** `body { font-family: "Noto Sans JP", serif }` で、実測 184 要素（下層 101 要素）がこの宣言。欧文も `Poppins, serif`。**Noto Sans JP が落ちた環境では明朝で出る**。意図はほぼ間違いなくサンセリフなので、**実装するなら `sans-serif` にする**
3. **`font-feature-settings: "palt"` は CSS に 2 件あるのに、可視要素では 0 件**（下層でも 1 件）。Noto Sans JP は `palt` を持っており、実測で `normal` 847.27px → `"palt"` 752.30px の **−11.2%** と効く。**効くのに使っていない**ので、親切のつもりで足すと既存ページと別物になる

**CSS Custom Properties は自社トークン 0 個**（2 個あるのは Swiper）。Google Fonts の CSS が CORS で読めないため ⚠ が出るが、そこに変数は無い。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **王子ブルー** | **`#005bac`** | **可視 62 要素の塗り面**。CTA、ナビのホバー面、カードの帯、ヒーロー下の導線。文字色としても 12 要素（`経営・財務` のラベル） |

### Gradient（森のグラデーション）

```css
linear-gradient(45deg,
  #004c91   2%,
  #005bac  46%,
  #00849c  76%,
  #00ac8d  93%,
  #bed58c 100%);
```

- 可視 2 要素。IR のカード（`決算短信・決算関連説明会資料`）
- **青 → 青緑 → 緑 → 黄緑の 5 ストップ**。停止位置（2% / 46% / 76% / 93% / 100%）と角度 `45deg` は丸めずそのまま写す。「紙＝森」の事業を 1 本のグラデで表している

### Accent

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **レッド** | **`#d6082e`** | 可視 7 要素。スポーツ・文化活動の導線（RED EAGLES HOKKAIDO ほか） |

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文・見出し。**可視 68 要素**。`body { color: #222222 }`。**純黒は使わない**
- **Text Muted** (`#787878`): 日付、ファイルサイズ、パンくず。可視 66 要素（本文とほぼ同数）
- **Text on Dark** (`#ffffff` / `rgba(255,255,255,.8)`): 写真・色面の上
- **Surface Light Blue** (`#f3f7fa`): ヒーロー直下のセクション面（可視 2 要素）
- **Border / Divider** (`#d6d6d6`): 区切り線（可視 16 要素）
- **Surface Gray** (`#f4f4f4`): 表の縞（Cookiebot の表も同色）
- **Background** (`#ffffff`): `body { background-color: #fff }`

> `#141414` と `#1032cf` は **Cookiebot（CMP）由来**。サイト本体では使わない。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP** 1 本。Google Fonts の**可変フォント**（`css2?family=Noto+Sans+JP:wght@100..900`）。`document.fonts` で `loaded`、実測 184 要素
- **明朝体**: 使わない。ただし**フォールバックが `serif`** なので、Web フォントが落ちると明朝になる（3.3 参照）

### 3.2 欧文フォント

- **サンセリフ**: **Poppins**。Google Fonts。宣言は 100〜900 ＋ イタリック全部だが、**`loaded` は 500 の 1 本だけ**
- 用途は**セクションの英語見出しと数値**（実測 21 要素）。`News` `OJI TODAY` `Who We Are` `Core Value` と、`6` `41.9` `63.7` の大きな数字

### 3.3 font-family 指定

```css
/* 実サイトはこう書いている */
body { font-family: "Noto Sans JP", serif; }
.en  { font-family: "Poppins", serif; }

/* 正しくはこう */
body { font-family: "Noto Sans JP", sans-serif; }
.en  { font-family: "Poppins", sans-serif; }
```

**フォールバックの考え方**:
- **実サイトの `serif` は誤り。** サンセリフを意図しているのに受け皿が明朝になっている。`!important` 付きの宣言にも同じ誤りが入っている
- 和文・欧文とも Web フォント 1 本 ＋ generic の 2 段だけ。OS ローカル書体をチェーンに入れていない
- フォント要求は 36 件、すべて `fonts.gstatic.com`（`notosansjp` / `poppins`）

### 3.4 文字サイズ・ウェイト階層

`html` / `body` とも **16px で完全固定**（1920 / 1440 / 1200 / 1024 / 834 / 768 / 767 / 414 / 375 / 374px の 10 幅すべてで動かない）。流体もブレークポイント切り替えも無い。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero | Noto Sans JP | **60px** | 700 | 78px (**1.3**) | normal | `森を育て、森を活かす。`（**実テキスト**） |
| En Display | Poppins | 48px | 600 | 48px (**1.0**) | normal | `News` `OJI TODAY` `Who We Are` |
| Figure | Poppins | 64px | 600 | — | normal | 数字（`6` `41.9` `63.7`） |
| En Heading | Poppins | 40px | 600 | 40px (1.0) | normal | `Core Value` `Core Businesses` |
| Heading 1 | Noto Sans JP | 36px | 700 | 57.6px (1.6) | normal | セクション見出し |
| Page Title | Noto Sans JP | 40px | 500 | — | **1.6px (0.04em)** | 下層の `h1`（**ここだけ字間がある**） |
| Heading 2 | Noto Sans JP | 24px | 700 | 38.4px (1.6) | normal | |
| Heading 3 | Noto Sans JP | 20px | 700 | 32px (1.6) | normal | |
| Lead | Noto Sans JP | 18px | 700 | 28.8px (1.6) | normal | |
| Body | Noto Sans JP | 16px | 400 / 700 | 25.6px (1.6) | normal | |
| List / Nav | Noto Sans JP | 15px | 400 / 500 / 700 | 24px (1.6) | normal | **可視 69 要素で最多** |
| Caption | Noto Sans JP | 14px | 400 / 600 / 700 | 22.4px (1.6) | normal | |
| Nav Small | Noto Sans JP | 13px | 500 | 19.5px (1.3) | normal | ドロワー内のリンク（39 要素） |
| Utility | Noto Sans JP / Poppins | 12px | 500 / 600 | — | normal | `Language` コピーライト |

**ウェイトは 400 / 500 / 600 / 700 の 4 段**。600 は **Poppins（欧文）専用**、和文の見出しは 700、ナビは 500。Noto Sans JP は可変フォントなので 100〜900 すべてが別の字幅で実在するが（実測で 9 段すべて異なる）、**設計としては 4 段で止める**。

### 3.5 行間・字間

```css
/* body（Normalize 由来の 1.15 が降りる） */
body { line-height: 1.15; }   /* = 18.4px が絶対値で全子孫へ */

/* 各要素が宣言し直す */
.lead      { line-height: 1.6em; }
.heading   { line-height: 1.3em; }
.spacious  { line-height: 2em; }
.en        { line-height: 1em; }
```

- **`line-height` は `em` 宣言**。`1.6em` は宣言した要素の font-size で計算され、**px の絶対値が子へ降りる**。実測で比率にすると 1.60（129 要素）/ 1.30（56 要素）/ 2.00（14 要素）/ 1.00（12 要素）/ **1.15（3 要素）**
- **1.15 の 3 要素は、どの要素も `line-height` を宣言し直していない箇所**（`body` から 18.4px がそのまま降りている）。`h1` 16px、ロゴのリンク、`ページトップに戻る`。**本文ブロックは必ず `line-height` を宣言する**
- **字間は全要素 `normal`。** CSS に `letter-spacing` は `0` / `0.04em` / `0.1em` の 3 つしか無く、実装されているのは**下層の `h1`（40px → 1.6px = 0.04em）だけ**
- `0.1px` / `0.25px` / `0.5px` が出る要素は **Cookiebot**。サイト本体の値ではない

### 3.6 禁則処理・改行ルール

```css
body {
  overflow-wrap: anywhere;
  word-break: normal;
  line-break: strict;   /* ← 厳格な禁則 */
}

/* ナビなど、語の途中で折りたくない箇所だけ */
.nav-item {
  word-break: keep-all;
  overflow-wrap: break-word;
}
```

- **`line-break: strict` が全要素に継承されている。** 既定の `auto` と違い、小書き仮名（ぁぃぅぇぉっゃゅょ）・長音符（ー）・繰り返し記号も**行頭に置かせない**。日本語組版として厳しい側
- **`overflow-wrap: anywhere`** なので、長い英単語や URL は**どこでも折る**。`word-break: break-all` と違い、**日本語の禁則は保ったまま**欧文だけ折れる
- ナビ項目だけ `word-break: keep-all` ＋ `overflow-wrap: break-word` に上書き（実測 14px / 700 のメニュー）
- `line-break: strict` と `overflow-wrap: anywhere` は**セットで書く**。片方だけでは「禁則は厳しいのに URL がはみ出す」「URL は折れるが禁則が緩い」のどちらかになる

### 3.7 OpenType 機能

```css
/* 実サイトの CSS には 2 件あるが、可視要素では使われていない */
/* font-feature-settings: "palt"; */
```

- **実測 0 要素**（トップ）/ **1 要素**（下層）。CSS 全文には `font-feature-settings:"palt"` が 2 件ある
- **効かないのではなく、使っていない。** 同一ページ・同一書体での実測は `normal` 847.27px → `"palt"` 752.30px（**−11.2%**）、`"halt"` 767.27px（−9.4%）
- **既存ページに合わせるなら `palt` を足さない。** 足すとナビも見出しも一段詰まって別のサイトになる

### 3.8 縦書き

該当なし（`writing-mode: vertical-rl` は 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#005bac`
- Text: `#ffffff`
- Padding: **`8px 72px 8px 22px`**（右に矢印アイコン用の余白を大きく取る）/ 短いラベルは `8px 62px 8px 22px`
- Border Radius: **`4px`**
- Font Size: 15px / Weight 700 / `letter-spacing: normal`

**Secondary**
- Background: `#ffffff`
- Text: `#222222`
- Padding: `8px 62px 8px 22px`
- Border Radius: `4px`
- Font Size: 15px / Weight 700

**Tag（カテゴリ）**
- Background: `#005bac`
- Text: `#ffffff`
- Padding: `0 16px 2px`
- Border Radius: **`12px`**
- Font Size: 12px / Weight 500

**Icon Button（ページトップ）**
- Border Radius: `50%`

### Inputs

- Border Radius: `4px`
- Font Size: 15px

### Cards

- Background: `#ffffff` / `#f3f7fa`
- Border Radius: **`32px`**（大きなカード）/ `12px`（小さなもの）
- Shadow: `rgba(0,0,0,0.08) 0 0 8px 0`（6 章参照）

---

## 5. Layout Principles

### Spacing Scale

gap の実測は **8 の倍数**で揃っている。

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 32px |
| XL | 40px |
| XXL | 48px |

実測の最頻は `8px`（11 回）/ `16px`（8 回）/ `0 48px`（7 回）/ `48px`（6 回）。

### Container

- Max Width: **`1152px`**（トップの最頻・7 回）/ **`1280px`**（下層の最頻・5 回）
- そのほか `800px`（本文カラム）/ `1440px` / `1600px`（全幅セクション）/ `834px`

### Grid

- ニュース一覧は 1 カラム（`800px`）
- カードは 3 列、gap `0 48px`

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定（ほとんどの要素） |
| 1 | `rgba(0,0,0,0.08) 0 0 8px 0` | カード（可視 2 要素） |

- **影はほぼ使わない。** サイト本体で実装されているのは 1 種類だけで、**ぼかし 8px / 不透明度 0.08 / オフセット 0** と極めて浅い
- `rgba(0,0,0,0.3) 0 30px 70px 0` は **Cookiebot のダイアログ**。サイト本体では使わない
- 面の区別は**色（白 / `#f3f7fa`）と罫線（`#d6d6d6`）**でつける

---

## 7. Do's and Don'ts

### Do（推奨）

- `body` に `overflow-wrap: anywhere` / `word-break: normal` / `line-break: strict` を**3 つセット**で書く
- `line-height` は各要素で `em` 付きで宣言する（`1.6em` / `1.3em` / `2em` / `1em`）。**宣言しないと `body` の `1.15` ＝ 18.4px が降りて行が潰れる**
- 和文の見出しは **700**、ナビは **500**、欧文は **600 の Poppins**
- 欧文見出しの行間は **1.0**（`48px / lh 48px`）
- ボタンは `border-radius: 4px`、**右の padding を大きく取る**（`8px 72px 8px 22px`）
- 本文の色は `#222222`、補助は `#787878`
- `font-family` のフォールバックは **`sans-serif`** にする（実サイトは `serif` だが誤り）

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** 効くが使っていない設計。足すとナビも見出しも −11% 詰まって別物になる
- **`letter-spacing` を配らない。** このサイトは 208/216 要素が `normal`。字間ではなく改行で読みやすさを作っている
- **`line-break: auto` に戻さない。** 禁則が緩くなり、小書き仮名が行頭に来る
- **`word-break: break-all` を使わない。** `overflow-wrap: anywhere` が同じ仕事をしつつ、日本語の禁則を保つ
- **`font-family` の `serif` をそのまま写さない。** 実サイトの誤り
- `Poppins` に 500 以外のウェイトを当てない（**`loaded` は 500 の 1 本だけ**）
- 森のグラデーションの停止位置（2% / 46% / 76% / 93%）を丸めない
- 影を足さない（本体は `0 0 8px rgba(0,0,0,.08)` の 1 種類だけ）
- 本文に `#000000` を使わない

---

## 8. Responsive Behavior

### Breakpoints

CSS の `@media` 実測で最多は `screen and (max-width: 767px)`（**433 回**）。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 最も手の入っている帯（433 件） |
| Tablet | 768〜1023px | 専用の調整が 62 件 |
| Desktop | ≥ 1024px | 既定（`min-width: 1024px` が 17 件） |

そのほか `screen and (max-width: 640px)`（16 件）、`(any-hover: hover)`（66 件）でホバー演出を分岐。

### フォントサイズの調整

**`html` も `body` も 16px で全幅固定。** 流体もブレークポイント切り替えも無いので、`rem` は常に 16px 基準で計算してよい。サイズの調整は**要素ごとのメディアクエリ**で行う。

### タッチターゲット

- Primary ボタンは `padding: 8px 72px 8px 22px` ＋ 15px で高さ 40px 弱。**44px には届かない**ので、新規実装では縦 padding を 12px にする

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #005bac
Accent Red:    #d6082e
Text Color:    #222222
Text Muted:    #787878
Background:    #ffffff
Surface:       #f3f7fa
Border:        #d6d6d6
Font:          "Noto Sans JP", sans-serif   ← 実サイトは serif（誤り）
En Font:       "Poppins", sans-serif（500 のみ）
Root:          html / body とも 16px 固定
Body Size:     15px（一覧・ナビ）／ 16px（本文）
Line Height:   1.6em（本文）／ 1.3em（見出し）／ 1em（欧文）
Letter Spacing: normal（配らない）
Font Feature:  なし（palt を足さない）
Line Break:    overflow-wrap: anywhere; word-break: normal; line-break: strict;
Button Radius: 4px
Card Radius:   32px / 12px
Shadow:        0 0 8px rgba(0,0,0,.08)
Container:     1152px（トップ）／ 1280px（下層）
```

### プロンプト例

```
王子ホールディングスのデザインシステムに従って、会社情報ページを作成してください。

- body に font-family: "Noto Sans JP", sans-serif / color: #222222 /
  overflow-wrap: anywhere / word-break: normal / line-break: strict を書く
- letter-spacing は配らない（normal のまま）
- font-feature-settings は書かない
- line-height は各要素で em 付きで宣言する（本文 1.6em / 見出し 1.3em / 欧文 1em）
- ページタイトルは 40px / 500 / letter-spacing: 0.04em
- セクション見出しは 36px / 700 / line-height: 1.6em
- 英語ラベルは "Poppins", sans-serif / 48px / 600 / line-height: 1em
- CTA は #005bac の塗り、文字は白、border-radius: 4px、padding: 8px 72px 8px 22px、15px / 700
- カードは白面 + border-radius: 32px + box-shadow: 0 0 8px rgba(0,0,0,.08)
- コンテナ幅は 1280px、gap は 8 の倍数（8 / 16 / 24 / 32 / 40 / 48px）
- 767px 以下でモバイルレイアウトに切り替える（ルートのサイズは変えない）
```
