# DESIGN.md — ロジスティード（LOGISTEED）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-25 / 対象: `https://www.logisteed.com/jp/`, `/jp/profile/policy/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に紺（`#00132c`）一色。**面を塗らず、1px の線と角丸 80px のピル**で組む。影は 1 種類も無い（実測 `box-shadow` 0 種・両ページ）
- **密度**: 低い。本文の行間を **2.0** まで開け、余白で読ませる。見出しだけ 64px の欧文で跳ねさせる
- **キーワード**: 紺一色、行間 2.0、ピル型アウトライン、字間ゼロ、欧文は Lato

**このサイトの核心は4つある。**

1. **和文の密度を「字間」ではなく「行間」だけで作る。** `body` に **`letter-spacing: 0`** と明示的に書いてあり（Chrome の computed では `normal`）、**可視 85 要素すべてが `normal`**。そのうえで `line-height` を `1.8`（既定）→ **`2`**（1025px 以上）と上げる。実測でも行間比 **2.00 が 44 要素**で最多
2. **Noto Sans JP を可変フォント（`wght@100..900`）で読み込んでおきながら、使うのは 400 と 700 の 2 段だけ。** 実測で 9 ウェイトすべてが別々の字幅を返す（100 → 1198.61px ／ 900 → 1374.70px、100px 欧文で測定）のに、ページ上に出るのは **400（34 要素）と 700（51 要素）**のみ
3. **数字と英語見出しは Lato、和文は Noto Sans JP の二層。** CDP の `CSS.getPlatformFontsForNode` で確認したところ、`Topics` `Services` `Network`（64px）と At a Glance の `30` `1,020` `56,240`（70px）は**すべて Lato で描画されている**。可視内訳は Noto Sans JP 49 要素 / Lato 28 要素
4. **ヒーローの大見出し「未知に挑む。」は SVG 画像**（`text_catch_copy.svg` 663×100px、`alt="未知に挑む。"`）。社名「ロジスティード株式会社」も `corporate_name.webp`。**この字空けを Web フォントで再現しようとしない**

**`font-feature-settings: "palt"` は両ページとも実測 0 件。** CSS 全文に 2 箇所あるが、どちらも `.service_logisteed_cafe_wrap`（LOGISTEED CAFE という別サブサイト専用のラッパー）の中で、コーポレート面には存在しない。**CSS 変数も自社・プラットフォーム合わせて 0 個**（`customPropertiesSummary.total: 0`、`bodyCustomProperties` も 0）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Navy（文字・罫線）** | **`#00132c`** | **可視 60 要素（トップ）／ 73 要素（下層）で最多**。本文・見出し・ナビ・ボタンの枠線、フッターの全面塗り。`body { color: #00132c }` としてサイト全体に降りる |
| **Blue（アクセント）** | **`#1a5fe8`** | 可視 12 要素。At a Glance の数値（`30` `1,020` `974` `56,240` `9,931`）と、その英語ラベル `Global Locations` 等**だけ** |
| **Red（New バッジ）** | **`#e60019`** | 可視 6 要素。ニュース一覧の `New` ラベル専用 |

> **紺が「色」ではなく「黒の代わり」として使われている。** 本文の文字色が `#00132c`、罫線も同じ `#00132c`、フッターの面も `#00132c`。**純黒（`#000000`）は 1 要素も無い。**

### Neutral（ニュートラル）

- **Background** (`#ffffff`): ページ背景。`html` / `body` ともに塗り指定が無く、**UA 既定のキャンバス**（`pageBackground.from` = `ua-default-canvas`）
- **Surface Gray** (`#ebecee`): トップのカード面（Newsroom・陸上部・IR 情報の 3 枚）
- **Surface Light** (`#f5f5f5`): 下層のローカルナビの面
- **Text on Dark** (`#ffffff`): 紺面・ヒーロー上のテキスト（可視 7 要素）
- **Navy 30%** (`rgba(0,19,44,0.3)`): ページトップへ戻るボタンの面

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定**: **Noto Sans JP**（Google Fonts、`wght@100..900` の**可変フォント**を 1 本）。実測 **可視 49 要素**
- フォールバックは `ヒラギノ角ゴ ProN W3` → `HiraKakuProN-W3` → `メイリオ` → `Meiryo` → `sans-serif`。**2010 年代前半の受け皿がそのまま残っている**が、Noto Sans JP が確実に読み込まれる（フォント要求 35 件が `fonts.gstatic.com/s/notosansjp/`）のでまず到達しない
- **明朝体は 1 要素も使っていない**

### 3.2 欧文フォント

- **Lato**（Google Fonts、`wght@300;400;700`）。実測 **可視 28 要素**。英語見出し（64px）と数値（70px）に使う
- **宣言だけで未使用のものが 2 系統ある。両方とも真似しない:**
  - **Urbanist**: Google Fonts の URL に `family=Urbanist:wght@100..900` と書かれているのに、**`fonts.gstatic.com` からのダウンロードは 0 件**、可視も 0 要素。CSS だけ取得して捨てている
  - **Adobe Fonts（Typekit kit `ybx7oxu`）**: `@import url("https://use.typekit.net/ybx7oxu.css")` で読み込み、`use.typekit.net` と `p.typekit.net` に**毎ページ 2 リクエスト**が飛ぶ。中身は `source-han-sans-japanese` と `hero` だが、使うのは `.service_logisteed_cafe_wrap` だけで**コーポレート面には 0 要素**

### 3.3 font-family 指定

```css
/* 和文・既定（body に 1 回だけ） */
body {
  color: #00132c;
  font-family: "Noto Sans JP", "ヒラギノ角ゴ ProN W3", HiraKakuProN-W3, メイリオ, Meiryo, sans-serif;
  font-size: 1.5rem;      /* = 15px（html が 62.5% = 10px のため） */
  font-weight: 400;
  letter-spacing: 0;       /* ← 明示的にゼロ。computed では normal */
  line-height: 1.8;
}

@media screen and (min-width: 1025px) {
  body { font-size: 1.6rem; line-height: 2; }   /* = 16px / 行間 2.0 */
}

/* 欧文（数値・英語見出し） */
.en {
  font-family: Lato, "Noto Sans JP", "SF Pro Text", "SF Pro Icons",
               "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

- **`html { font-size: 62.5% }` ＝ 10px。23 幅（1920〜320px）すべてで固定**。`1rem = 10px` なので、CSS の `1.5rem` は 15px
- **`rem` を 16px 基準で読み替えないこと**

### 3.4 文字サイズ・ウェイト階層

| 用途 | サイズ | ウェイト | 書体 | 実測 |
|------|--------|----------|------|------|
| 英語セクション見出し | **64px** | 700 | Lato | 6 要素（`Topics` `Services` `Network` 等） |
| At a Glance の数値 | **70px** | 700 | Lato | 5 要素（色は `#1a5fe8`） |
| 和文の大見出し | 40px | 700 | Noto Sans JP | 1 要素 |
| 下層の章見出し | 36px | 700 | Noto Sans JP | 3 要素 |
| 下層の節見出し | 32px / 28px | 700 | Noto Sans JP | 2 / 4 要素 |
| カード見出し | 24px / 20px | 700 | Noto Sans JP | 1 / 6 要素 |
| **本文** | **16px** | 400 | Noto Sans JP | **38 要素で最多** |
| ナビ | 15px | 400 | Noto Sans JP | 8 要素 |
| 補助・注記 | 14px / 12px | 400 | Noto Sans JP | 7 / 7 要素 |

- **ウェイトは 400 と 700 の 2 段だけ。** 500 も 600 も 1 要素も無い
- **可変フォントなので 100〜900 のどれを指定しても実在する**（実測で 9 段すべて別の字幅）。だからこそ**勝手に 500 や 600 を足すと、このサイトに無い太さが混ざる**

### 3.5 行間・字間

- **`line-height` は単位なし**（`1.8` / `2`）。比率が子へ降りるので、サイズの違う要素でも同じ密度になる
- **実測の行間比**: トップは **2.00 が 44 要素**（最多）、下層も **2.00 が 48 要素**（最多）。見出しだけ 1.20（64px の英語見出し）
- **`letter-spacing` は全要素 `normal`**（トップ 85/85、下層 78/78）。`body` に `letter-spacing: 0` と書いてある
- **ブレークポイントで行間が変わる**: 1025px 以上 `2`（16px → 32px）／ 1024px 以下 `1.8`（15px → 27px）。**モバイルの方が詰まる**

### 3.6 禁則処理・改行ルール

- `word-break` / `overflow-wrap` の宣言は無く、ブラウザ既定（`normal`）。日本語の禁則処理はブラウザ任せ
- `auto-phrase` は使っていない

### 3.7 OpenType 機能

- **両ページとも実測 0 件。** CSS に `font-feature-settings: "palt"` が 2 箇所あるが、どちらも `.service_logisteed_cafe_wrap`（別サブサイト）の中
- **`palt` は効く書体を使っている。** 実スタック・24px・weight 700 で測ると `normal` **2576.86px** → `"palt"` **2273.36px** ＝ **−11.8%**（`halt` は −9.7%）。**「できるのにやっていない」型**なので、既存ページに合わせるなら足さない

### 3.8 縦書き

- 使っていない（`writing-mode: vertical-rl` は両ページとも 0 要素）

---

## 4. Component Stylings

### Buttons

**Primary（アウトラインのピル）**
- Background: `transparent`
- Text: `#00132c`
- Border: `1px solid #00132c`
- Padding: `8px 64px`
- Border Radius: **`80px`**（実測 6 要素）
- Font Size: 16px / Font Weight: 700

**On Hero（紺い面・画像の上）**
- Background: `transparent`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Padding: `8px 64px` / Border Radius: `80px`

**ローカルナビ（下層）**
- Background: `#f5f5f5`
- Text: `#00132c`
- Border: `1px solid #00132c`（トップ階層のみ）／下層項目は枠なし
- Padding: `13px 42px 13px 20px`（右だけ広いのは矢印のため）

### Cards

- Background: `#ebecee`（トップの 3 枚）
- Border: なし / Border Radius: `30px`（At a Glance の数値カード 10 要素）／ `50px`（大判カード 1 要素）
- Shadow: **なし**

### Inputs

- サイト本体に検索フォーム以外の入力欄が無いため、実測できる値は無い。他コンポーネントに合わせ、`1px solid #00132c` / radius `80px` / padding `8px 20px` を使う

---

## 5. Layout Principles

### Spacing Scale

`gap` の実測値（トップ／下層）。トークンは無く、値を直接書いている。

| Token | Value | 実測 |
|-------|-------|------|
| XS | 20px | 最多（トップ 3 ／下層 4） |
| S | 30px | 1 / 1 |
| M | 36px | 1 / 1 |
| L | **40px** | **4**（トップで最多） |
| XL | 50px | 1 |
| XXL | 60px 40px / 115px | 1 / 1 |

### Container

- Max Width: **1400px**（トップの最外）／ **1240px**（下層の本文）／ 1000px（狭い段）
- 下層の本文カラムは `500px` を 2 本並べる

### Grid

- Columns: 2（下層の本文）／ 3〜5（トップのカード列）
- Gutter: `0px 50px`（下層）／ `40px`（トップ）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべての要素** |

**影は両ページとも 0 種。** 階層は (a) 角丸 80px のピル枠、(b) `#ebecee` の面、(c) 余白の 3 つだけで作る。**`box-shadow` を足さない。**

---

## 7. Do's and Don'ts

### Do（推奨）

- `html { font-size: 62.5% }`（= 10px）を前提に `rem` を書く。`1.5rem` は 15px
- 本文の `line-height` は**単位なしで `1.8` / `2`** を使う。1025px を境に切り替える
- `letter-spacing` は **`0`（＝ `normal`）のまま**にする。密度は行間で作る
- 和文は Noto Sans JP、**数字と英語見出しは Lato** に切り替える
- ボタンは**塗らずに `1px solid #00132c` ＋ `border-radius: 80px`** のピルで作る
- 文字色・罫線・暗い面はすべて `#00132c` を使う

### Don't（禁止）

- **`#000000` を使わない。** 文字も罫線も `#00132c`
- **`font-weight` に 500 / 600 を使わない。** このサイトは 400 と 700 の 2 段だけ（可変フォントなので指定すれば実在してしまう）
- **`box-shadow` を足さない**（実測 0 種）
- **`font-feature-settings: "palt"` を足さない。** 書体は対応している（実測 −11.8%）が、コーポレート面では 1 要素も使っていないので既存と字送りが変わる
- **ヒーローの「未知に挑む。」をテキストで組み直さない。** 実体は `text_catch_copy.svg`（663×100px）
- **Urbanist と Adobe Fonts（`source-han-sans-japanese` / `hero`）を真似しない。** 実サイトは読み込んでいるが**コーポレート面での使用は 0 要素**で、リクエストだけが無駄に飛んでいる
- `letter-spacing` を `em` で配らない。body に `0` と書いて継承させる

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | `screen and (max-width: 767px)`（11 件） |
| Tablet | ≤ 1024px | `screen and (max-width: 1024px)`（27 件） |
| **Desktop** | **≥ 1025px** | **`screen and (min-width: 1025px)`（トップ 258 件／下層 1194 件）で圧倒的に最多** |

- **設計の主役は 1025px**。デスクトップ側に差分を積む書き方（`min-width: 1025px`）

### ルート・本文の実測（23 幅で測定）

| 幅 | `html` | `body` | 行間 | 英語見出し |
|---|---|---|---|---|
| 1920〜1025px | **10px** | **16px** | **32px（2.00）** | 64px |
| 1024〜320px | **10px** | **15px** | 27px（1.80） | 40px |

- **`html` は 1920px から 320px まで 1px も動かない。** 流体ではない
- **崖は 1025 / 1024px の 1 箇所だけ**で、本文 16 → 15px（0.94 倍）。極端な跳ね上がりは無い

### タッチターゲット

- ピルボタンは `8px 64px` の padding ＋ 16px の文字で高さ約 42px。**モバイルでは縦 padding を 12px 以上に広げて 44px を確保する**

### フォントサイズの調整

- 英語見出し 64px → 40px、本文 16px → 15px、行間 2.0 → 1.8

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #00132c   （文字・罫線・暗い面すべて）
Accent Color:  #1a5fe8   （数値とその英語ラベルだけ）
Alert Color:   #e60019   （New バッジだけ）
Background:    #ffffff
Surface:       #ebecee
Font (JA):     "Noto Sans JP", "ヒラギノ角ゴ ProN W3", HiraKakuProN-W3, メイリオ, Meiryo, sans-serif
Font (EN):     Lato, "Noto Sans JP", "Helvetica Neue", Helvetica, Arial, sans-serif
Root Size:     10px (html { font-size: 62.5% })
Body Size:     16px (≥1025px) / 15px (≤1024px)
Line Height:   2 (≥1025px) / 1.8 (≤1024px)  ※単位なし
Letter Spacing: 0
Font Weight:   400 / 700 の2段のみ
Button Radius: 80px（アウトラインのピル）
Shadow:        none
```

### プロンプト例

```
ロジスティード（LOGISTEED）のデザインで作ってください。

- 文字・罫線・暗い面はすべて #00132c。純黒は使わない
- 背景は白。カード面は #ebecee
- 和文は Noto Sans JP、数字と英語見出しは Lato に切り替える
- html は 62.5%（10px）。本文 16px / line-height 2（単位なし）
- letter-spacing は 0 のまま。密度は行間だけで作る
- font-weight は 400 と 700 だけ。500/600 は使わない
- ボタンは塗らず 1px solid #00132c + border-radius: 80px のピル
- box-shadow は一切使わない
- font-feature-settings: "palt" は足さない
- 1025px を境にデスクトップ／タブレット以下を切り替える
```
