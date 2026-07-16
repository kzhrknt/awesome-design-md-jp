# DESIGN.md — PUEBCO (プエブコ)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 対象サイト: https://www.puebco.com/
> PUEBCO（プエブコ）はインダストリアル／ヴィンテージな質感の生活雑貨・インテリアブランド。
> 真っ白なギャラリー下地に、セリフ体（Cardo）の見出しと極細のグレー罫、黒の角ゼロ ボタンだけで端正に組む。
> 差し色は一切なく、唯一 セール価格にだけ赤オレンジ `#f94c43` を使う。
> 実測はブランドサイト（PUEBCO ONLINE STORE）トップに基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 倉庫・工業製品・found object を思わせるユーティリティ雑貨を、真っ白なギャラリー下地（`#ffffff`）に置く。全テキストを**セリフ体（Cardo）**で組み、極細のグレー罫 `#d9d9d9` と黒の角ゼロ ボタンだけで構成する静かなエディトリアル
- **密度**: 低密度。小さめの文字（13〜14px 基調）を広い行間で置き、面塗りではなく余白と極細罫で領域を分ける
- **キーワード**: インダストリアル / ヴィンテージ / found object / ギャラリー / セリフ エディトリアル
- **形状言語**: すべての面・ボタン・入力欄が `border-radius: 0`。CTA は黒の 1px 罫（実測は透過背景＋黒罫のアウトライン、写真上では黒面）で四角く据える。丸みや影で飾らず、直線と罫で工業的に見せる
- **書体の性格**: 見出しも本文も**セリフ体「Cardo」1書体で統一**。ウェイトは 400（Regular）中心。欧文ラベル（VIEW PRODUCTS 等）は字間を大きく開き（実測 2.2px ≒ 0.2em）、カタログ的な静けさを出す。和文は明朝系フォールバックでセリフの雰囲気を保つ

---

## 2. Color Palette & Roles

<!-- 実サイトの computedStyles / interactive / customProperties / pageBackground 実測に基づく。基調は「真っ白なギャラリー下地＋純黒」。差し色はセール価格の赤オレンジのみ -->

### Base（下地）

- **Background** (`#ffffff`): ページ全体の下地。純白のギャラリー ground。`body` の実測背景で、トップ全体を支配する（`--background` / `--light-background` とも `#ffffff`）
- **Ink Black** (`#000000`): 見出し・本文・罫・ボタン面の基調色。純黒（`--heading-color` / `--text-color` / `--link-color` すべて `#000000`）

### Lines & Secondary（罫・二次面）

- **Hairline Gray** (`#d9d9d9`): 極細の罫・区切り・入力欄の枠（rgb(217,217,217)、`--border-color`）。面ではなく線で領域を分ける
- **Secondary Fill** (`#000000`): 黒面の二次要素。白抜きテキスト（`--secondary-elements-background` `#000000` / text `#ffffff`）。写真上の CTA やアナウンスバーに
- **Nav Muted** (`rgba(0,0,0,0.5)`): ナビの弱いテキスト（`--navigation-text-color-light`）
- **Nav Border** (`rgba(0,0,0,0.25)`): ナビ境界の淡い罫（`--navigation-border-color`）

### Accent（唯一の差し色）

- **Sale Red-Orange** (`#f94c43`): **セール価格のためだけ**の赤オレンジ（rgb(249,76,67)、`--product-sale-price-color`）。定価から値下げされた価格表示にのみ使う。ブランド唯一のアクセントで、面や装飾には使わない
- **Star Rating** (`#f6a429`): レビュー星の黄（`--product-star-rating`）。星評価のみに使う補助色

### 色に関する設計思想

- 基調は「純白のギャラリー下地 `#ffffff`」「純黒の文字と罫・ボタン `#000000`」「極細のグレー罫 `#d9d9d9`」の3色
- 差し色は**セール価格の赤オレンジ `#f94c43` ただ1色**に限定する。それ以外に色を使わない
- ブランドの世界観は「色」ではなく「セリフ体の組版・余白・大判の商品写真・角ゼロの罫」で作る。無彩色に徹することで工業的な found object の質感を保つ

---

## 3. Typography Rules

### 3.1 和文フォント

- **明朝体**: サイト本体は欧文セリフ（Cardo）に和文はシステムの明朝系フォールバックを当てている。仕様としては **Noto Serif JP** を明示し、セリフのエディトリアルな雰囲気を和文でも保つ
- **ゴシック体**: 使用しない（本文・見出しともセリフで統一）

### 3.2 欧文フォント

- **セリフ（見出し・本文・ラベルすべて）**: **Cardo**（ヴィンテージ／エディトリアルなセリフ。実測ウェイト 400）。ロゴ・見出し・本文・ナビ・価格・ボタンラベルまで**この1書体で全システムを構成**する
- **サンセリフ / 等幅**: 使用しない（一部の EC ウィジェットが Inter を挿入するが、ブランドの書体系ではない）

> **代替フォントの注記**: **Cardo は Google Fonts で直接読み込める**ため、preview.html でもそのまま使用する（代替不要）。
> - Cardo → `family=Cardo:ital,wght@0,400;0,700;1,400` を読み込む
> - 和文は Cardo に日本語グリフが無いため **Noto Serif JP** にフォールバックする（Google Fonts で直接利用可）

### 3.3 font-family 指定

```css
/* 見出し・本文・UI（和文優先のセリフ スタック） */
font-family: "Cardo", "Noto Serif JP", serif;
```

**フォールバックの考え方**:
- 欧文（Latin）グリフを Cardo で拾い、日本語グリフは Noto Serif JP に落とす
- 見出し・本文・ボタン・価格まで**単一スタックで統一**する。ゴシックへの切り替えはしない
- ウェイトは 400（Regular）が中心。階層はサイズと字間で作る

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading L (EN) | Cardo | 24px | 400 | 1.65 | normal | セクション大見出し（PUEBCO INC. 等） |
| Heading M (EN) | Cardo | 21px | 400 | 1.65 | normal | 特集見出し（Reversible Short Robe 等） |
| SubHeading (EN) | Cardo | 15px | 400 | 1.65 | normal | 小見出し（Feature Products / About） |
| Nav / Logo (EN) | Cardo | 19px | 400 | 1.65 | normal | ロゴ・ヘッダー（PUEBCO ONLINE STORE） |
| Body (JP/EN) | Cardo → Noto Serif JP | 13–14px | 400 | 1.65 | normal | 本文（`--base-text-font-size: 13px`） |
| Product Title | Cardo | 12px | 400 | 1.65 | normal | 商品名（REVERSIBLE SHORT ROBE 等） |
| Price | Cardo | 12px | 400 | 1.65 | normal | 価格（¥9,900 等） |
| Button Label (EN) | Cardo | 11px | 400 | normal | 0.2em | CTA（VIEW PRODUCTS 等、字間 2.2px） |

### 3.5 行間・字間

- **本文の行間 (line-height)**: `1.65`（13px 本文で 21.45px、14px で 23.1px）。セリフ体の可読性のため広めに取る
- **見出しの行間**: `1.65`（21px 見出しで 34.65px、24px で 39.6px）。本文と同じ比率で揃える
- **本文の字間 (letter-spacing)**: `normal`（実測 normal）。和文・本文は詰めも開けもしない
- **ボタンラベルの字間**: **`0.2em`（11px で 2.2px）** と大きく開き、カタログ的な静けさを出す

**ガイドライン**:
- 見出しから本文まで line-height は `1.65` で統一する
- 本文の字間は `normal`。ボタン・ラベル系の欧文だけ字間を 0.2em ほど大きく開く
- ウェイトは太らせず 400 のまま、サイズと字間で階層を作る

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使わない */
```

- 実測では `font-feature-settings: normal`。palt は使わず、字間は `letter-spacing` で調整する
- 本文の字間は normal のため、和文の詰め（palt）は不要。セリフ本来のプロポーションを保つ

### 3.8 縦書き

該当なし（横書きのみ）。

---

## 4. Component Stylings

すべて `border-radius: 0`。ボタンは黒の 1px 罫（写真上では黒面）、面は白、罫は極細グレー。

### Buttons

**Primary（写真上・黒面 / 白抜きテキスト）**
- Background: `#000000`（写真上の CTA。透明背景の場合は黒罫アウトライン）
- Text: `#ffffff`
- Border: `1px solid #000000`
- Border Radius: `0px`
- Padding: `14px 28px`
- Font: Cardo 11px / weight 400 / letter-spacing 0.2em（大文字ラベル）
- 例: 「VIEW PRODUCTS」「申し込む」

**Outline（白地・黒罫）**
- Background: `transparent`（白地）
- Text: `#000000`
- Border: `1px solid #000000`
- Border Radius: `0px`
- Padding: `14px 28px`
- Font: Cardo 11px / weight 400 / letter-spacing 0.2em
- 白地の上に置く標準ボタン。ホバーで黒面反転

### Inputs

- Background: `#ffffff`
- Border: `1px solid #d9d9d9`（極細のグレー罫）
- Border (focus): `1px solid #000000`（罫を黒く濃くする）
- Border Radius: `0px`
- Padding: `12px 14px`
- Font Size: 13–14px（Cardo → Noto Serif JP）

### Cards

- Background: `#ffffff`（下地の白のまま）
- Border: なし、または `1px solid #d9d9d9` の極細罫
- Border Radius: `0px`
- Shadow: なし（フラット）
- 商品カードは大判写真＋商品名（セリフ、小さめ）＋価格の最小構成。角丸ゼロで端正に。セール時は定価に打ち消し線、値下げ価格を `#f94c43` の赤オレンジで表示する

---

## 5. Layout Principles

### Spacing Philosophy

純白の余白を広く取り、大判の商品・オブジェクト写真を主役に据える。要素は角丸ゼロの極細グレー罫でゆるやかに区切り、密度を上げすぎない。

### Spacing Scale（実測・推定）

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 14px |
| M | 28px |
| L | 40px（商品グリッド横スペース `--horizontal-spacing`） |
| XL | 60px（4列グリッド縦スペース） |
| XXL | 75px（2列グリッド縦スペース） |

### Container

- Header Base Height: 80px（`--header-base-height`）
- Padding (horizontal): 24–40px
- キービジュアルはフルブリード

### Grid

- Columns: 12（商品一覧は 2〜4 カラム）
- Gutter: 40px（`--horizontal-spacing-four-products-per-row`）
- 写真をゆったり配置し、商品名・価格は短く小さくセリフで添える

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼ全ての面はフラット |
| 1 | `0 2px 10px rgba(54,54,54,0.15)` | スライドショーの丸スクロールボタン等、最小限の浮き（実測） |
| 2 | `0 8px 24px rgba(0,0,0,0.12)` | モーダル・ドロワーのオーバーレイ |

- 影はほぼ使わない。奥行きは「余白」「大判写真」「極細グレー罫」で表現する

---

## 7. Do's and Don'ts

### Do（推奨）

- 下地は純白 `#ffffff`、文字と罫・ボタンは純黒 `#000000`、区切り罫は極細グレー `#d9d9d9` の3色に絞る
- 見出しから本文・価格・ボタンまで**セリフ体（Cardo → Noto Serif JP）1書体で統一**する
- すべての面・ボタン・入力欄を `border-radius: 0` にする
- CTA は黒の 1px 罫（写真上は黒面 / 白抜き）で四角く据え、ラベルは大文字＋字間 0.2em
- 本文は 13〜14px でも line-height 1.65 を確保する。字間は normal
- **差し色は `#f94c43` 赤オレンジをセール価格にだけ**使う。定価は打ち消し線、値下げ価格を赤オレンジで

### Don't（禁止）

- 赤オレンジ `#f94c43` を面・装飾・セール価格以外に使わない（唯一の差し色を薄めない）
- ゴシック体に切り替えない（全システムをセリフで統一）
- 角丸・強い影を付けない（フラット・角ゼロが基調）
- 本文の line-height を 1.5 未満に詰めない
- 和文フォント1つだけを指定しない（必ず `"Cardo", "Noto Serif JP", serif` のチェーンを書く）
- 純白のギャラリー下地を、色面や装飾で埋めない

---

## 8. Responsive Behavior

### Breakpoints（推定）

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | 1〜2 カラム。ナビはハンバーガー＋ドロワー |
| Tablet | ≤ 1024px | 2 カラム |
| Desktop | > 1024px | 2〜4 カラム＋フルブリード写真 |

### タッチターゲット

- 最小サイズ: 44px × 44px

### フォントサイズの調整

- 本文は 13〜14px 基調だが、モバイルでも 13px 未満に落とさず line-height 1.65 を保つ
- 見出し（24px）はモバイルで 20〜21px に縮小。ボタンラベルの広い字間（0.2em）は維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:   #ffffff（純白のギャラリー下地）
Ink / 罫/CTA: #000000
Hairline:     #d9d9d9（極細グレー罫）
Sale Accent:  #f94c43（唯一の差し色・セール価格のみ）
Star Rating:  #f6a429（星評価のみ）
Font(統一):   "Cardo", "Noto Serif JP", serif（Cardo は Google Fonts 可）
Body Size:    13–14px
Line Height:  1.65（見出し・本文とも）
Body 字間:    normal
Label 字間:   0.2em（欧文ボタンラベル）
palt:         off
Radius:       0（全要素）
Button(主):   #000 bg（写真上）/ #fff / 1px solid #000 / radius 0 / padding 14px 28px
Button(副):   transparent / #000 / 1px solid #000 / radius 0
Input:        1px solid #d9d9d9 / focus 1px solid #000 / radius 0
Card:         radius 0 / shadow なし / セール価格 #f94c43
```

### プロンプト例

```
PUEBCO のデザインシステムに従って、インダストリアル雑貨の商品一覧セクションを作成してください。
- 下地: #ffffff（純白のギャラリー）、文字と罫・ボタン: #000000、区切り罫: #d9d9d9（極細グレー）
- フォント: "Cardo", "Noto Serif JP", serif（見出しから本文・価格まで セリフ1書体で統一）
- 本文 13〜14px / line-height 1.65、字間は normal
- 欧文ボタンラベル（VIEW PRODUCTS 等）は大文字＋letter-spacing 0.2em
- すべての面・ボタン・入力欄は border-radius: 0
- CTA は黒の 1px 罫（写真上は黒面 #000 / 白抜き #fff）、padding 14px 28px
- 商品カードは大判写真＋商品名（セリフ・小さめ）＋価格、影なし・角丸ゼロのフラット
- 差し色は #f94c43 赤オレンジをセール価格にだけ。定価に打ち消し線、値下げ価格を赤オレンジで
```

### Web ライセンスフォントが使えない環境での代替指針

- **Cardo は Google Fonts で直接利用可**（代替不要）。`family=Cardo:ital,wght@0,400;0,700;1,400`
- 和文 Noto Serif JP も Google Fonts で直接利用可
- 「純白のギャラリー下地・純黒の文字と極細グレー罫・セリフ体1書体・角ゼロのフラットな面・大判写真・セール価格だけの赤オレンジ」を守れば世界観は再現できる
