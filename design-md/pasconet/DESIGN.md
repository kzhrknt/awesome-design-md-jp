# DESIGN.md — Pasco／敷島製パン（Pasco Shikishima）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-12 / 対象: `https://www.pasconet.co.jp/`, `/corporate/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **ピルで組む。** 角丸は `160px` / `150px` / `120px` / `50px` と、ほぼ半径が辺より大きい値ばかり（可視 radius 8 種のうち 5 種がピル）。食卓の写真・ベージュの地・緑のアクセントで、「パン屋の店先」の温度を保つ
- **密度**: 低い。本文の行間が **2.0**（`body { line-height: 2 }`）、本文サイズ 16px。商品一覧だけはチップを 10px の gap で詰める
- **キーワード**: Pasco グリーン、ピル、字空けの階段、`palt`、ベージュの地

**このサイトの核心は3つある。**

1. **`palt` で詰めた上から、サイズごとに字間を足し直す二段構え。** `body` に `font-feature-settings: "palt"` を 1 行書いて **648 要素**へ継承させ（下層ページでも 214 要素）、そのうえで `letter-spacing` を本文 `.04em` → 小見出し `.05em` → 検索見出し `.10em` → セクション見出し **`.18em`** と**サイズに比例して開く**。詰めるのと開くのを同時にやっている
2. **ヒーローのコピーは CTA ごと PNG。** `にほんの小麦と生きてゆく。` も `和小麦サイトへ` の白い丸ボタンも、`copy.png` / `copy2.png` / `copy3.png` という **560×166〜227px の透過 PNG 1 枚**に焼き込まれている（`p.copy > a > picture > img`。リンクの矩形だけが実装で、面の色は `rgba(0,0,0,0)`）。**ここを Web フォントで組み直さない**
3. **CSS Custom Properties は 0 個。** 3 個あるのは Swiper（`--swiper-theme-color` 等 2 個）と Bootstrap（1 個）で、**自社トークンは 1 つも無い**。色もサイズも CSS に直値で書く運用

> **`alt` が画像と違う。** `copy2.png` の画像は「**にほん**の小麦と生きてゆく。」（ひらがな）だが、`alt` は「**日本**の小麦と生きてゆく。」（漢字）。**実装を真似るときは画像と同じ表記を `alt` に書く。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Pasco グリーン** | **`#008f43`** | **可視 14 要素の塗り面**。ヘッダーの `お客さま相談室` `オンラインショップ`、`商品検索` の丸ボタン、カテゴリのピル、下層の全ボタン。文字色としても 11 要素 |

### Accent（カテゴリ別のアクセント）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **オレンジ** | **`#d28c40`** | 可視 2 要素。`商品検索` セクションの面、ヒーロー画像内の丸アイコン、本文中のリンク文字 |
| **サーモン** | **`#ed7a70`** | 可視 1 要素。`レシピ検索` セクションの面 |
| **ピンク** | **`#e97891`** | 文字色 6 要素。日付・数字（`Ubuntu` で組む数値） |

> **3 色はコーナーの識別色で、ブランド色ではない。** CTA は必ず `#008f43`。

### Neutral（ニュートラル）

- **Text Primary** (`#323232`): 本文・見出し。**可視 83 要素**。`body { color: #323232 }`。**純黒は使わない**
- **Text Muted** (`#848484`): ユーティリティナビ（`企業情報` `CSR・サステナビリティ` `採用情報`）、注記。可視 28 要素
- **Text on Dark** (`#ffffff`): 緑面・写真上のテキスト。可視 14 要素
- **Surface Beige** (`#f5f1ec`): **下層ページのページ背景**（`/corporate/` の `pageBackground.resolved`）。トップではセクションの面として 5 要素
- **Surface Beige Deep** (`#e5dac d` → 実装は `#e5dacd`): `商品の種類から検索` `商品から選ぶ` のタブ面（可視 2 要素）
- **Border Gray** (`#c1c1c1` / `#e0e0e0`): 罫線・枠（可視 8 / 7 要素）
- **Surface Gray** (`#f5f5f5` / `#f4f4f4`): `お知らせ` の面、検索フォームの面
- **Background（トップ）** (`#ffffff`): `html` / `body` ともに背景の指定が無く、**UA 既定の白**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP** 1 本。Google Fonts の可変フォント（`wght 100 900`）を `@import` で読み込み、**実測 128 要素**（下層 57 要素）。`document.fonts` で `loaded`
- **明朝体**: 使用しない（セリフ系の和文は 1 要素も無い）

### 3.2 欧文フォント

- **サンセリフ**: **Ubuntu**。Google Fonts。`loaded` は **400 と 500 の 2 本だけ**（300 / 700 / 全イタリックは宣言のみで `unloaded`）
- 用途は**セクションの英語ラベルと数値**に限定（実測 14 要素）。`h2` の `CONTENTS` `Language`、日付、件数

### 3.3 font-family 指定

```css
/* 本文（body に 1 回） */
font-family: "Noto Sans JP", sans-serif;

/* 欧文ラベル・数値 */
font-family: "Ubuntu", sans-serif;

/* 和欧混植が要る箇所 */
font-family: "Ubuntu", "Noto Sans JP", sans-serif;
```

**フォールバックの考え方**:
- 和文は `"Noto Sans JP", sans-serif` の 2 段だけ。OS ローカルの和文書体をチェーンに入れていない（Web フォント前提）
- 欧文を混ぜたい箇所だけ `"Ubuntu"` を先頭に置き、和文グリフは Noto Sans JP に落とす
- **`Ubuntu` は 400 / 500 しか配信されていない。** `font-weight: 700` を当てると合成太字になる

### 3.4 文字サイズ・ウェイト階層

`html { font-size: 62.5% }` = **10px 固定**（1920〜374px の 10 幅すべてで動かない）。CSS は `1.6rem` のように **rem で書き、10 倍すると px**。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Title | Noto Sans JP | 34px | 700 | 44.2px (1.3) | **6.12px (0.18em)** | `span.title`。`商品紹介` `おすすめレシピ` |
| Heading on Color | Noto Sans JP | 28px | 700 | 36.4px (1.3) | 2.8px (**0.10em**) | `商品検索` `レシピ検索`（色面の上） |
| Heading 2 | Noto Sans JP | 28px | 700 | 42px (1.5) | 1.4px (**0.05em**) | `h2.headStyle02`。`お知らせ` `PICK UP` |
| Lead | Noto Sans JP | 18px | 400 | 36px (2.0) | 0.64px | リード文 |
| Body | Noto Sans JP | 16px | 400 | 32px (**2.0**) | 0.64px | 本文（可視 40 要素で最多） |
| Body Medium | Noto Sans JP | 16px | 500 | 32px | 0.64px | ナビ・ボタンの文字（19 要素） |
| List | Noto Sans JP | 15px | 400 / 500 / 700 | 30px (2.0) | 0.64px | カード見出し・商品名（37 要素） |
| Caption | Noto Sans JP | 14px | 400 / 500 | 28px | 0.64px | タグ・絞り込み（28 要素） |
| Utility | Noto Sans JP | 12px | 400 | 24px | 0.64px | ユーティリティナビ（12 要素） |
| Small | Noto Sans JP | 10px | 400 / 500 | — | 0.64px | フッターの法務リンク（11 要素） |
| En Label | Ubuntu | 13px | 500 | 26px | 0.64px | `CONTENTS` `Language` |

**ウェイトは 400 / 500 / 700 の 3 段**（300 の 2 要素は Cookie バナー）。Noto Sans JP は可変フォントなので 100〜900 すべて実在するが、**設計としては使っていない 3 段で止める**。

### 3.5 行間・字間

```css
body {
  color: #323232;
  font-size: 1.6rem;              /* = 16px（html が 10px） */
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 400;
  font-feature-settings: "palt";  /* ← 648 要素へ継承 */
  letter-spacing: .04em;          /* ← 0.64px という絶対値で降りる */
  line-height: 2;                 /* ← 無単位。各要素が自分のサイズで再計算 */
}
```

- **`line-height` と `letter-spacing` で継承のしかたが逆**。`line-height: 2` は無単位なので 16px → 32px / 15px → 30px / 18px → 36px と**各要素で再計算**される。`letter-spacing: .04em` は **0.64px という px 値が全子孫に降りる**（可視 147 要素中 **114 要素が 0.64px**。34px の見出しでも 0.64px のまま）
- **字間を足すのは要素ごとに `em` で宣言し直したときだけ。** 実測で開いているのは 4 段:

| 用途 | 実装値 | px（実測） | 要素 |
|------|--------|-----------|------|
| 本文（継承） | `.04em` @16px | 0.64px | 114 要素 |
| `h2.headStyle02` | `.05em` @28px | 1.4px | `お知らせ` `PICK UP` `CSR・サステナビリティ` |
| 色面の上の見出し | `.10em` @28px | 2.8px | `商品検索` `レシピ検索` |
| セクションタイトル | **`.18em`** @34px | **6.12px** | `商品紹介` `おすすめレシピ` `パンを知る・楽しむ` `キャンペーン` |

- 見出しの行間は **1.3**（34px → 44.2px）と **1.5**（28px → 42px）の 2 段

### 3.6 禁則処理・改行ルール

```css
/* body は既定のまま */
word-break: normal;

/* 一部のコンポーネントのみ */
word-break: break-all;
```

`body` に `word-break` の宣言は無く、既定の `normal`。CSS 全文に `word-break: break-all` が存在するが適用先は限定的。**日本語の禁則は UA 任せ**。

### 3.7 OpenType 機能

```css
body { font-feature-settings: "palt"; }
```

- **`"palt"` が可視 648 要素**（トップ）/ **214 要素**（下層）。`body` に 1 行書いた継承
- 効きは実測で確認済み: 同一ページ・同一書体（Noto Sans JP）で `normal` 862.63px → `"palt"` 767.66px の **−11.0%**
- **CSS には `font-feature-settings: normal` で解除している箇所が 2 つある**（数値を組む要素）。欧文・数字を扱う要素では戻す
- `"halt"` は使っていない（実測 0 件）

### 3.8 縦書き

該当なし（`writing-mode: vertical-rl` は 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（緑のピル）**
- Background: `#008f43`
- Text: `#ffffff`
- Padding: `15px 0`（幅は親で決める） / ヘッダーの小サイズは `3px 15px`
- Border Radius: **`160px`**（ピル）/ ヘッダーは `120px` / タグは `150px`
- Font Size: 16px（ヘッダー 12px、タグ 15px）
- Font Weight: 400〜500
- Letter Spacing: `0.64px`（継承値）

**Secondary（白のピル）**
- Background: `#ffffff`
- Text: `#323232`
- Padding: `17px 50px`
- Border Radius: **`160px`**
- Font Size: 16px / Weight 500

**Chip（絞り込み）**
- Background: `#ffffff` または `#e5dacd`（選択状態）
- Text: `#323232`
- Padding: `10px`
- Border Radius: **`20px`**
- Font Size: 14px / Weight 500

### Inputs

- Background: `#f4f4f4`
- Border Radius: `10px 0 0 10px`（入力欄）＋ `0 10px 10px 0`（ボタン側）で**左右に割る**
- Font Size: 14px

### Cards

- Background: `#ffffff`
- Border Radius: `10px`
- Border: `#e0e0e0` 1px（罫線で区切る面もある）
- Shadow: **使わない**（下記参照）

---

## 5. Layout Principles

### Spacing Scale

gap の実測から読み取れるスケール（4 の倍数ではなく **5 の倍数**）:

| Token | Value |
|-------|-------|
| XS | 10px |
| S | 15px |
| M | 20px |
| L | 30px |
| XL | 50px |
| XXL | 65px |

実測で多いのは `0 50px`（7 回）/ `10px`（6 回）/ `0 15px`（5 回）/ `35px 65px`。

### Container

- Max Width: **`1000px`**（最頻・5 回）。ほかに `860px` / `800px` / `500px`
- 下層ページも `1000px`

### Grid

- 商品カードは 3 列、gap `0 50px`
- タグ・チップは折り返しのフレックス、gap `10px`

---

## 6. Depth & Elevation

**影を使わない。** 可視 `box-shadow` は **1 種類だけ**で、それも Cookie バナー:

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **カード・ボタン・ドロップダウンを含む全要素** |
| — | `rgba(0,0,0,0.1) 0 0 24px 0` | Cookie バナーのみ（サイト本体では使わない） |

面の区別は**色（白 / `#f5f1ec` / `#e5dacd`）と罫線（`#e0e0e0`）**でつける。

---

## 7. Do's and Don'ts

### Do（推奨）

- `html { font-size: 62.5% }` を前提に、**サイズは `rem` で書いて 10 倍すると px** になるようにする
- `body` に `font-feature-settings: "palt"` と `letter-spacing: .04em` と `line-height: 2` を **1 回だけ**書き、子要素では再宣言しない
- 見出しの字間は**サイズに比例して開く**（28px なら `.05em`〜`.10em`、34px なら `.18em`）
- ボタンは**ピル**（`border-radius: 120px` 以上）。角丸の中途半端な値を新しく作らない
- 欧文ラベル・数値は `Ubuntu`、ウェイトは **400 か 500 のどちらか**
- 本文の色は `#323232`。補助は `#848484`

### Don't（禁止）

- **ヒーローのコピーを Web フォントで組み直さない。** `にほんの小麦と生きてゆく。` は CTA の丸ボタンごと PNG。構造を変えるとレイアウトが崩れる
- **`letter-spacing` を `em` のまま子要素へ配らない。** `body` の `.04em` は `0.64px` という絶対値で降りており、34px の見出しでも 0.64px。**大きい文字に字間を足したいときは、その要素で `em` を宣言し直す**
- **`line-height` を px で書かない。** こちらは無単位 `2` なので、各サイズで再計算されるのが設計
- `Ubuntu` に `font-weight: 700` を当てない（**400 / 500 しか配信されていない**ので合成太字になる）
- **影を足さない。** サイト本体に `box-shadow` は 1 つも無い
- CSS Custom Properties を前提にしない（**自社トークンは 0 個**）
- 本文に `#000000` を使わない

---

## 8. Responsive Behavior

### Breakpoints

CSS の `@media` 実測で最多は `only screen and (max-width: 959px)`（54 回）。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 620px / ≤ 539px | さらに細かい調整が入る |
| Tablet 以下 | **≤ 959px** | **ここで `body` が切り替わる** |
| Desktop | ≥ 960px | 既定 |

### ルート・本文サイズの切り替え

**`html` は 10px で全幅固定。切り替わるのは `body` だけ。**

| 幅 | `html` | `body` font-size | line-height | letter-spacing |
|---|---|---|---|---|
| 1920 / 1440 / 1200 / 1024px | 10px | **16px** | 32px | 0.64px |
| 834 / 768 / 767 / 414 / 375px | 10px | **15px** | 30px | **0.6px** |

- 境目は `max-width: 959px`。**規定の 4 幅（1440 / 1200 / 834 / 375）では 1024 と 834 の間に崖がある**ので、1024px を測らないと段差を見落とす
- `line-height: 2` は無単位なので 32 → 30px と**比率のまま追従**、`letter-spacing: .04em` は 0.64 → **0.6px** と**再計算される**（宣言は `em`、継承は px）
- 下層ページの `h1` は 28px → 22px に落ちる

### タッチターゲット

- 緑のピルは `padding: 15px 0` で高さ 50px 前後。チップは `padding: 10px` ＋ 14px で 40px 弱

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #008f43
Text Color:    #323232
Text Muted:    #848484
Background:    #ffffff（下層は #f5f1ec）
Font:          "Noto Sans JP", sans-serif
En Font:       "Ubuntu", sans-serif（400 / 500 のみ）
Root:          html { font-size: 62.5% } = 10px
Body Size:     16px（959px 以下は 15px）
Line Height:   2（無単位）
Letter Spacing: .04em（body に 1 回。px で継承される）
Font Feature:  "palt"（body に 1 回）
Button Radius: 160px / 120px（ピル）
Card Radius:   10px / 20px
Shadow:        なし
```

### プロンプト例

```
Pasco（敷島製パン）のデザインシステムに従って、商品一覧ページを作成してください。

- html { font-size: 62.5% } を置き、サイズは rem で書く（1.6rem = 16px）
- body に font-family: "Noto Sans JP", sans-serif / font-feature-settings: "palt" /
  letter-spacing: .04em / line-height: 2 / color: #323232 を 1 回だけ書く
- セクション見出しは 34px / 700 / letter-spacing: .18em / line-height: 1.3
- 小見出し（h2）は 28px / 700 / letter-spacing: .05em
- CTA は #008f43 の塗り、文字は白、border-radius: 160px のピル、padding: 15px 0
- 絞り込みチップは白面 / #e5dacd（選択時）、border-radius: 20px、padding: 10px、14px / 500
- カードは白面 + border-radius: 10px。box-shadow は使わない
- コンテナ幅は 1000px
- 959px 以下で body を 15px に落とす（line-height と letter-spacing は追従させる）
```
