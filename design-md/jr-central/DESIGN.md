# DESIGN.md — ＪＲ東海（Central Japan Railway Company）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-21 / 対象: `https://jr-central.co.jp/`, `/notice/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **字間を `body` に1回だけ書いて全ページに継承させる。** 地色は白ではなく暖色のオフホワイト `#f8f4f0`、ブランドはオレンジ。角丸は **pill（15〜30px）とカード（8〜12px）の二系統**
- **密度**: 低い。運行情報・ニュース・検索フォームをカードで区切り、余白を多く取る
- **キーワード**: 0.048em の継承、暖色オフホワイト、オレンジ、pill ボタン、外部ウィジェット同居

**このサイトの核心は4つある。**

1. **`letter-spacing` は `body` に `0.048em` を1回書いて継承させている。** 実測は **`0.864px`（18px × 0.048）が 86 要素**で最多。**子要素で em を再宣言していない**ので、`font-size` が変わっても字間の px 値は 0.864px のまま継承される。**ここを「サイズ × 0.048em」と読み替えて再実装すると別物になる**
2. **サイト本体と外部ウィジェットで書体系統が違う。** 本体は `"Noto Sans JP", "Hiragino Kaku Gothic Pro", …`、**検索ボックスと FAQ ウィジェットだけ `メイリオ, Meiryo, …` のレガシースタック**で、字間も `normal`。`#efefef` が 315 要素あるのも、`2px outset` のブラウザ既定ボタン（`MENU` `CLOSE` `閉じる`）が出るのもこのウィジェット側
3. **Noto Sans JP は 400 / 500 / 700 / 900 の4本を個別に読み込んでいる**（`document.fonts` で4本とも `loaded`。可変版 `100 900` は `unloaded`）。**既定ウェイトは 500**（実測 93 要素）で、400 はほぼ body だけ
4. **`font-feature-settings: "palt"` は 3 要素しか使っていない。** 実質「使っていない」と考えてよい

**CSS Custom Properties は実質 2 個**（`--header-height: 126px` / `--header-height-compact: 90px`）。トップで 21 個検出されるうち 19 個は **`--vc-*` ＝ カルーセルライブラリ（vue-carousel 系）の既定値**で、自社トークンではない。カルーセルの無い下層ページでは 2 個に減る。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **JR東海オレンジ** | **`#fc6b01`** | **可視 106 要素**。`最初に戻る` の pill、検索ボックスの面、リンク色 |
| **Orange (Header)** | **`#f87b22`** | **可視 11 要素**。ヘッダー右上の `企業情報` ボタン、ヒーロー上部の帯 |

> **オレンジが2つあるのは実装の実態。** `#fc6b01` が本体、`#f87b22` はヘッダーとヒーロー帯のやや明るい方。**新規実装では `#fc6b01` に寄せてよいが、既存ページと並べるときは 2 色あることを前提にする。**

### Semantic（意味的な色）

- **Alert Red** (`#e70d1e`): **重要なお知らせ**のリンク文字（可視 1 要素）
- **New Red** (`#cc0000`): `NEW` バッジの文字（可視 3 要素）
- **Link Blue** (`#0092ef`): 下層ページのアイコンボタン（可視 1 要素）

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文・見出し。**可視 84 要素**
- **Text Black** (`#000000`): `body` の既定色・運行情報の見出し（可視 18 要素）
- **Text Muted** (`#575757`): コピーライト（可視 1 要素）
- **Surface Dark** (`#333333`): `インフォメーション` `検索する` の pill、`採用情報` ボタン
- **Surface Gray** (`#666666`): `閉じる` の pill
- **Background** (`#f8f4f0`): **トップの地色**（`pageBackground.resolved` / 根拠 `body`）。**暖色のオフホワイト**
- **Background (下層)** (`#ffffff`): 下層ページは白
- **Surface Warm** (`#fffcf8`): 運行状況・ニュース・アクセス検索のカード面（可視 7 要素）
- **Surface Warm 2** (`#fff6f0`): カテゴリタブの面（可視 3 要素）
- **Border** (`#dedede`): 入力欄の枠

### 外部由来（採用しない）

- **`#efefef`**: **FAQ ウィジェットの地色（可視 315 要素）**。DOM 上は最多だが**スクリーンショットには写らない**（折りたたまれている）。ページの地色ではない
- **`#f2f2f2`**: 同ウィジェットの `閉じる` ボタン

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP**。`@font-face` を **400 / 500 / 700 / 900 の4本に分けて宣言**し、4本とも `loaded`
- **可変フォント版（`weight: 100 900`）も宣言されているが `unloaded`。** 使えるのは上の4段だけ
- フォールバックに **ヒラギノ角ゴ Pro → メイリオ → ＭＳ Ｐゴシック**を並べる（Windows 対応）

### 3.2 欧文フォント

- **Lato**（400 / 700）と **Montserrat**（400 / 700）が **`loaded` になっているが、可視テキストの `font-family` 分布には 1 要素も現れない。** 読み込まれているだけで描画に使われていない
- 実際に欧文で使われているのは **`Arial`（7 要素）** — 検索・アコーディオンのボタンなど、UI の素の部分

### 3.3 font-family 指定

```css
/* サイト本体（body） */
font-family: "Noto Sans JP", "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3",
             メイリオ, Meiryo, "ＭＳ Ｐゴシック", Arial, Verdana, sans-serif;
```

**実サイトは末尾を `"sans-serif"` とクォートして書いている。** クォートすると generic family ではなく「sans-serif という名前のフォント」を探すことになり、**総称ファミリとして機能しない**。**正しくはクォートなしの `sans-serif`。**

```css
/* 外部ウィジェット側（検索・FAQ）— 本体とは別系統。真似しない */
font-family: メイリオ, Meiryo, "ヒラギノ角ゴ  Pro W3",
             "Hiragino Kaku Gothic ProN", "MS Pゴシック", sans-serif;
```

こちらも `"ヒラギノ角ゴ  Pro W3"` の中に**全角スペースが2つ**入っており、実在するファミリ名と一致しない。**本体側のスタックだけを使うこと。**

**フォールバックの考え方**:
- **和文優先。** Noto Sans JP を先頭に、OS 和文（ヒラギノ → メイリオ → ＭＳ Ｐゴシック）、最後に欧文（Arial → Verdana）
- `Hiragino Kaku Gothic Pro`（ProN ではない）を指定している点に注意

### 3.4 文字サイズ・ウェイト階層

`html { font-size: 16px }`。`body` は 18px。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Page Title** | Noto Sans JP | **38px** | **300** | 45px (1.18) | **3.648px** | 下層ページの h1。**300 は読み込まれていない**（下記参照） |
| Section Heading | Noto Sans JP | **24px** | **700** | 36px (1.50) | 0.864px | `ニュースリリース` |
| Heading (fluid) | Noto Sans JP | **18.9751px** | 500 | 33.7335px (1.78) | 0.864px | `運行状況`。**流体サイズ** |
| Heading 3 | Noto Sans JP | **20px** | 700 | 30px (1.50) | 0.864px | `アクセス検索` |
| Heading 3 (fluid) | Noto Sans JP | 16.8668px | 500 | 29.9854px (1.78) | 0.864px | `東海道・山陽新幹線` |
| Heading 4 | Noto Sans JP | 18px | 500 | 27px (1.50) | 0.864px | `N700S` |
| **Body** | Noto Sans JP | **18px** | **400** | **32px (1.78)** | **0.864px** | body の既定 |
| Label | Noto Sans JP | 16px | 700 | 28.4444px (1.78) | 0.864px | `出発駅` |
| Alert | Noto Sans JP | 14px | 700 | 24.8889px (1.78) | **normal** | `重要なお知らせ` の帯 |
| Utility | Noto Sans JP | 13px | 500 | 19.5px (1.50) | **0.52px** | `よくあるご質問` `お問い合わせ` |
| Note | Noto Sans JP | 13px | 500 | 22.1px (1.70) | **0.312px** | 車両紹介のキャプション |
| Copyright | Noto Sans JP | 11px | 500 | 13.2px (1.20) | 0.864px | フッター |

**サイズ分布（トップ / 可視 23 要素のうち代表）**: 16px (30) / 13px (28) / 15px (16) / 18px (15) / 20px (6) / 14px (5)

**ウェイト分布**: **500 (93)** / 700 (18) / 400 (1)
→ **既定は 500。** `body` の 400 はほぼ継承されない

> **`weight: 300` は読み込まれていない。** 下層ページの h1 が `font-weight: 300` を指定しているが、`@font-face` は 400 / 500 / 700 / 900 の4本だけ。**実際には 400 が使われる**ので、設計意図ほど細くならない。**新規実装で 300 を当てない。**

### 3.5 行間・字間

- **本文の行間**: **1.78**（18px → 32px）
- **見出しの行間**: 1.18〜1.50（38px → 45px / 24px → 36px）
- **UI の行間**: 1.50（13px → 19.5px）

- **字間は `body` に 1回だけ**:

```css
body {
  font-size: 18px;
  line-height: 32px;        /* 1.78 */
  letter-spacing: 0.048em;  /* → 0.864px。子要素はこの px を継承する */
}
```

**字間の例外は3つだけ**:

| 値 | em 換算 | 対象 | 実測 |
|----|---------|------|------|
| **0.864px** | 0.048em（18px 基準） | **既定。ほぼ全要素** | **86 要素** |
| 0.52px | 0.04em（13px 基準） | ユーティリティリンク | 6 要素 |
| 0.64px | 0.04em（16px 基準） | グローバルナビ | 4 要素 |
| 0.312px | 0.024em（13px 基準） | 車両紹介のキャプション | 8 要素 |
| `normal` | — | `重要なお知らせ` の帯・外部ウィジェット | 7 要素 |
| 3.648px | 0.096em（38px 基準） | 下層ページの h1（**既定の2倍**） | 1 要素 |

**ガイドライン**:
- **`body` に `letter-spacing: 0.048em` と書き、子要素で再宣言しない。** 実測が px で揃うのは継承の結果であって、各サイズに em を掛け直した値ではない
- **見出しだけ 0.096em（既定の2倍）に開く**

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- ニュースリリースのタイトルが長いため、**カード内で自然に折り返す**設計（`line-height: 1.5` で2〜3行）

### 3.7 OpenType 機能

```css
/* 実質使っていない */
```

- **`font-feature-settings: "palt"` は 3 要素だけ**（下層ページでは 0 件）。**新規実装で足さない**
- 字送りは `letter-spacing: 0.048em` の継承で作る

### 3.8 縦書き

該当なし（実測 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（オレンジ pill）**
- Background: **`#fc6b01`** / Text: `#ffffff`
- Font: **14px / weight 700 / letter-spacing normal**
- Padding: `6px 30px`
- Border Radius: **`18px`**（pill）／ Border: `1px solid transparent`

**Dark（墨 pill）**
- Background: **`#333333`** / Text: `#ffffff`
- Border: **`2px solid #333333`**
- Font: **16px / weight 700**
- Padding: `0px 30px` / Border Radius: **`22px`**

**Search（大きい pill）**
- Background: `#333333` / Text: `#ffffff`
- Border: `1px solid #333333`
- Font: **20px / weight 700**
- Padding: **`15px 64px 15px 48px`**（右にアイコン分のアキ）
- Border Radius: **`30px`**

**Header Split（`企業情報` / `採用情報`）**
- `企業情報`: Background **`#f87b22`** / Text `#333333` / Border Radius **`15px 0 0 15px`** / 13px / weight 500 / letter-spacing 0.52px / padding `0 12px 0 16px`
- `採用情報`: Background `#333333` / Text `#ffffff` / Border Radius **`0 15px 15px 0`**
- **2つ並べて1つの pill に見せる**

**Outlined（オレンジ枠）**
- Background: `#ffffff` / Text: **`#fc6b01`**
- Border: **`1px solid #fc6b01`**
- Font: 14px / weight 400 / Border Radius: `6px`
- Padding: `4px 10px 4px 8px`

**Gray pill（`閉じる` / `メニューを閉じる`）**
- Background: `#666666` / Text: `#ffffff`
- Font: 12px / weight 500 / letter-spacing 0.48px / Border Radius: `21px`

### Cards

- Background: **`#fffcf8`**（暖色の面。地色 `#f8f4f0` よりわずかに明るい）
- Border Radius: **`12px`**（最多 17 要素）／ `8px`（ニュース行）／ `4px`（バッジ・小要素）
- **左端だけ角を落とすカードがある**: `border-radius: 0 12px 12px 0`（運行状況・アクセス検索の6要素）
- Shadow: `rgba(47,48,52,0.05) 0 4px 8px 0`（**サイト全体で1要素だけ**）

### Inputs

- Border: `1px solid #dedede`
- Border Radius: **`15px`**
- Font: 13px / weight 500 / letter-spacing 0.52px
- Padding: `1px 16px 0px 30px`

### Badges

- `NEW`: 文字色 **`#cc0000`**、背景なし。**面ではなく文字色で出す**

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 8px | インライン要素の間（`gap: normal 8px`） |
| S | 10px | リスト間 |
| M | **16px / 24px** | ブロック間 |
| L | **20px 32px / 20px 40px** | カードグリッドの row/column gap |
| XL | **40px** | セクション間（`gap: normal 40px`） |

### Container

- **Max Width: 1286px**（実測 4 要素。このサイト唯一のコンテナ幅）

### Grid

- トップは「運行状況（左・固定幅）＋ ヒーローカルーセル（右）」の非対称2カラム
- 以降はカード行を縦に積む単カラム

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。下層ページは `box-shadow` 実測 0 件** |
| 1 | `rgba(47, 48, 52, 0.05) 0 4px 8px 0` | **トップで 1 要素のみ**（ユーティリティバー） |

> **影で階層を作らないサイト。** カードの区別は**暖色の面の階調**（地色 `#f8f4f0` → カード `#fffcf8` → タブ `#fff6f0`）と `border-radius` で行う。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` に `letter-spacing: 0.048em` を1回書いて継承させる。** 子要素で em を再宣言しない
- 本文は **18px / line-height 32px（1.78）**
- **ウェイトは 400 / 500 / 700 / 900 の4段だけ使う。** 既定は **500**
- **ページの地色は `#f8f4f0`**（暖色オフホワイト）、カード面は `#fffcf8`
- ボタンは **pill**（18px / 21px / 22px / 30px）、カードは **12px**、小要素は **4px**
- オレンジは **`#fc6b01`**（ヘッダー・ヒーロー帯だけ `#f87b22`）
- `NEW` は面ではなく **文字色 `#cc0000`** で出す
- `font-family` の末尾は **クォートなしの `sans-serif`**

### Don't（禁止）

- **`font-weight: 300` を使わない**（`@font-face` に無く、400 に落ちる）
- **`font-feature-settings: "palt"` を足さない**（実サイトは 3 要素のみ）
- **各サイズに `letter-spacing` を em で掛け直さない**（実サイトは `body` からの px 継承）
- **`メイリオ, Meiryo, "ヒラギノ角ゴ  Pro W3", …` のスタックを使わない**（外部ウィジェット由来。全角スペース2つの誤りを含む）
- **`#efefef` をページの地色にしない**（FAQ ウィジェットの色。DOM 上 315 要素あるが画面には出ない）
- **`"sans-serif"` とクォートしない**（総称ファミリとして機能しない。実サイトの誤り）
- **Lato / Montserrat を前提に組まない**（`loaded` だが可視テキストでは使われていない）
- `box-shadow` でカードを浮かせない（実サイトは 1 要素のみ）
- ボタンに `2px outset` のブラウザ既定枠を残さない（**実サイトはウィジェット側で残っている**）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|------|-------|------|
| **Desktop** | **≥ 1206px** | `screen and (min-width: 1206px)` 2 件 |
| Tablet | ≤ 860px | 1 件 |
| Mobile | ≤ 751px | 1 件 |
| Small | ≤ 330px | 1 件 |
| Hover | `(hover: hover)` | 2 件 |

- **ブレークポイントの宣言数が極端に少ない。** レイアウトは主に `clamp()` などの**流体サイズ**で作っている（見出しに `18.9751px` `16.8668px` の半端な値が出るのはそのため）
- ヘッダー高は変数で切り替える: `--header-height: 126px` → `--header-height-compact: 90px`

### タッチターゲット

- 検索 pill（`15px 64px 15px 48px`）・墨 pill（`0 30px` / 16px）は満たす
- ユーティリティリンク（13px）とヘッダーの `企業情報`（13px / padding `0 12px 0 16px`）は 44px を下回る。**モバイルでは高さを確保すること**

### フォントサイズの調整

- 見出しは流体（`18.9751px` / `16.8668px` などビューポート依存）
- **本文 18px と字間 0.864px は固定。** 字間が px 継承なので、サイズを変えても字間は変わらない点に注意

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Orange:     #fc6b01
Orange (header):  #f87b22
Alert Red:        #e70d1e
New Red:          #cc0000
Text Primary:     #333333
Text Black:       #000000   （body の既定色）
Text Muted:       #575757
Surface Dark:     #333333
Surface Gray:     #666666
Background:       #f8f4f0   （トップ・暖色オフホワイト） / #ffffff （下層）
Surface:          #fffcf8 （カード） / #fff6f0 （タブ）
Border:           #dedede

Font: "Noto Sans JP", "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", Arial, Verdana, sans-serif
利用可能な weight: 400 / 500 / 700 / 900 （既定は 500）

Body Size:      18px
Line Height:    32px (1.78) / 見出し 1.50 / UI 1.50
Letter Spacing: body に 0.048em を1回（= 0.864px を継承）。見出しのみ 0.096em
font-feature-settings: なし
Border Radius:  18-30px（ボタン pill） / 12px（カード） / 8px / 4px
Container:      1286px
```

### プロンプト例

```
ＪＲ東海のデザインシステムに従って、お知らせ一覧ページを作成してください。
- body は "Noto Sans JP" / 18px / line-height 32px / letter-spacing 0.048em / color #000000
- letter-spacing は body に1回だけ書き、子要素では宣言しない
- ページ見出しは 38px / weight 400（300 は使わない）/ line-height 45px / letter-spacing 0.096em
- セクション見出しは 24px / weight 700 / line-height 36px
- 本文・UI のウェイトは 500 を既定にする
- 地色は #f8f4f0、カード面は #fffcf8 / border-radius 12px / 影なし
- CTA は #fc6b01 / #ffffff / 14px / weight 700 / border-radius 18px / padding 6px 30px
- 墨のボタンは #333333 / 2px solid #333333 / 16px / weight 700 / border-radius 22px
- NEW は背景を付けず文字色 #cc0000 で出す
- font-feature-settings は書かない
- コンテナ幅は 1286px
```
