# DESIGN.md — 八海山（八海醸造 / HAKKAISAN）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-01 / 対象: `https://www.hakkaisan.co.jp/`, `/sake/`

---

## 1. Visual Theme & Atmosphere

新潟・南魚沼の酒蔵。サイトは**白地・黒文字・角丸ゼロ**という極端に禁欲的な構成で、
表現のほぼすべてを**書体の選択と字間**に預けている。見出しは筑紫Aオールド明朝、
本文とナビは秀英角ゴシック金 L。日本語の商業サイトとしては珍しく、
**装飾要素（影・角丸・グラデーション・面色のセクション）をほぼ一切使わない**。

- **デザイン方針**: 引き算。線を引かず、面を塗らず、余白と書体だけで格をつくる
- **密度**: 低い。1画面あたりの情報量を絞り、商品写真を大きく白場に置く
- **キーワード**: 明朝、白場、角丸ゼロ、0.2em の字間、淡麗

**この酒蔵UIの特徴的な癖（他サイトと違う点）**

1. **見出しが明朝、本文がゴシック**という和文2書体の使い分け。多くの日本語サイトは1書体で通す
2. **セクション見出しの字間が `0.2em`**。「製品情報」が「製 品 情 報」に見えるほど空ける
3. **`border-radius` が実質 0**。角丸は**円形（50%）の「札」だけ**で、中間の角丸を持たない
4. **ボタンが枠線1本**。塗りボタンが存在しない
5. **ページ地色の指定が無い**（html/body ともに透明。UA既定のキャンバス＝白）

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値。すべて hex -->

### Base（基調）

- **Background** (`#ffffff`): ページ地色。**CSSで指定されておらず UA 既定のキャンバス**に依存
- **Text Primary** (`#000000`): 本文・見出し。純黒
- **Text Secondary** (`#7f7f7f`): フッター、注記、コピーライト

### Accent（差し色は3色だけ）

- **Mizu Blue-Gray** (`#9cb7be`): 酒類カテゴリの札（普通酒・大吟醸酒 等）、
  カルーセルの選択中インジケータ。**このサイトで最も使用頻度の高い差し色**
- **Fuji Purple** (`#7c82a3` / `#7e85a6`): 「製品情報」のニュース種別、「季節限定」の札。
  ページによって1段階だけ明度が違う2値が併存する
- **Kin Gold** (`#e4ba61`): 「イベント」のニュース種別、「数量限定」の札

### Neutral（ニュートラル）

- **Border** (`#000000`): ボタンの枠。本文色と同じ純黒の1px
- **Border Light** (`#979797`): カルーセルの非選択インジケータの枠
- **Text on Accent** (`#ffffff`): すべての札の文字色は白で固定

**注意**: 面色を持つ要素は「札（ラベル／カテゴリ）」だけ。
**セクションの背景を塗らない**。区切りは余白と罫でつくる。

---

## 3. Typography Rules

### 3.1 和文フォント

このサイトの核心。**2書体を役割で厳密に分けている**。

- **明朝体（見出し・リード・ボタン文字）**: 筑紫Aオールド明朝 Pr6N（Fontworks）
  - `TsukuAOldMinPr6N-R` … 大見出し（Regular）
  - `TsukuAOldMinPr6N-M` … セクション見出し・ナビ・ボタン（Medium）
- **ゴシック体（本文・注記・カテゴリ札）**: 秀英角ゴシック金（DNP / 大日本印刷）
  - `DNPShueiGoKinStd-L` … 本文（Light）
  - `DNPShueiGoKinStd-B` … 札・SNSラベル（Bold）

**役割分担のルール**:
- **読ませる文（見出し・リード・ボタンのラベル）は明朝**
- **情報として引く文（本文の細部・注記・カテゴリ・著作権表示）はゴシック Light**
- ナビゲーションは明朝。これが全体の第一印象を決めている

### 3.2 欧文フォント

- 専用の欧文書体を持たない。和文書体の欧文グリフをそのまま使う
- ロゴ「Hakkaisan」は画像（SVG）

### 3.3 font-family 指定

```css
/* 本文・注記（ゴシック Light） */
font-family: DNPShueiGoKinStd-L, ShueiGo-L, sans-serif;

/* 札・強調（ゴシック Bold） */
font-family: DNPShueiGoKinStd-B, ShueiGo-B, sans-serif;

/* 見出し・リード・ナビ・ボタン（明朝 Medium） */
font-family: TsukuAOldMinPr6N-M, TsukuMin-M, serif;

/* 大見出し（明朝 Regular） */
font-family: TsukuAOldMinPr6N-R, TsukuMin-R, serif;
```

**フォールバックの考え方**:
- `DNPShueiGoKinStd-L` → `ShueiGo-L` → `sans-serif` の2段構え。
  **プラットフォームフォント（游ゴシック・ヒラギノ）をチェーンに入れていない**
- ウェイトを `font-weight` ではなく**フォントファミリ名で切り替える**（`-L` / `-B` / `-M` / `-R`）。
  Adobe Fonts / Fontworks のスタティックフォント運用に多いパターン。
  `font-weight: 700` を当ててもフォント側は変わらず、合成ボールドになる点に注意

> **ライセンス注記**: 筑紫Aオールド明朝（Fontworks）と秀英角ゴシック金（DNP）はいずれも
> 商用ライセンスのWebフォントで、`preview.html` では再現できない。代替は 3.9 を参照。

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Heading | 筑紫Aオールド明朝 R | 42px | 400 | 1.26 (53.05px) | 0 | 「八海山の日本酒」 |
| Sub Heading | 筑紫Aオールド明朝 R | 28px | 400 | 1.26 (35.37px) | 0 | 「浩和蔵仕込」 |
| Section Label | 筑紫Aオールド明朝 M | 30px | 400 | **1.0** (30px) | **0.2em** (6px) | 「お知らせ」「製品情報」 |
| Lead (top) | 筑紫Aオールド明朝 M | 20px | 400 | 1.6 (32px) | 0 | トップのリード文 |
| Lead (sub) | 筑紫Aオールド明朝 R | 18px | 400 | **1.94** (35px) | 0 | 下層のリード文 |
| Button Label | 筑紫Aオールド明朝 M | 16px | 400 | 1.6 (25.6px) | 0 | ボタンの文字 |
| Nav | 筑紫Aオールド明朝 M | 14px | 400 | **1.0** (14px) | 0 | グローバルナビ |
| Body | 秀英角ゴシック金 L | 14px | 400 | 1.6 (22.4px) | 0 | 本文の基準 |
| Category Chip | 秀英角ゴシック金 B | 14px | 400 | — | 0 | 酒類カテゴリの札 |
| Caption | 秀英角ゴシック金 L | 13px | 400 | 1.62 (21px) | 0 | 注記・フッター |
| SNS Label | 秀英角ゴシック金 B | 10px | 600 | 1.2 (12px) | 0 | 「Hakkaisan」 |
| Round Label | 筑紫Aオールド明朝 M | 10px | 400 | — | 0.1em (1px) | 「数量限定」の丸札 |
| More | 筑紫Aオールド明朝 M | 10px | 400 | 1.6 (16px) | **0.2em** (2px) | 「MORE」 |

### 3.5 行間・字間

- **letter-spacing は原則 `normal`（0）**。日本語サイトとしては珍しく、本文に字間を入れない。
  明朝の字面の広さがそのまま出る
- **字間を空けるのは2種類だけ**、そして**空けるときは一気に `0.2em`**:
  - セクション見出し（30px）… `0.2em`
  - 「MORE」（10px）… `0.2em`
  - 丸札の「数量限定」（10px）… `0.1em`
- **line-height は 1.6 が基準**（本文・リード・ボタン）
- **見出しは 1.26 と詰める**。大見出しは行が近いほうが明朝の縦の流れが出る
- **セクション見出しとナビは `line-height: 1.0`**。字間 0.2em で横に伸びるぶん、
  行の高さを詰めて塊に見せる
- 下層のリード文だけ **1.94** と大きく空ける（読ませる文の合図）

```css
/* 本文 */
body {
  font-family: DNPShueiGoKinStd-L, ShueiGo-L, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: normal;
  color: #000;
}

/* セクション見出し — 字間を大きく空け、行は詰める */
.section-label {
  font-family: TsukuAOldMinPr6N-M, TsukuMin-M, serif;
  font-size: 30px;
  line-height: 1.0;
  letter-spacing: 0.2em;
}

/* 大見出し */
.page-heading {
  font-family: TsukuAOldMinPr6N-R, TsukuMin-R, serif;
  font-size: 42px;
  line-height: 1.26;
  letter-spacing: normal;
}
```

> **`0.2em` の字間で必ず起きること**: CSSの `letter-spacing` は**最後の1文字の右にも空きを足す**。
> センタリングした見出しが半文字ぶん左にずれて見えるので、
> `margin-right: -0.2em`（または `text-indent: 0.2em`）で必ず相殺する。

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- 商品名に「純米大吟醸 八海山」のような**全角スペース区切り**が多い。
  この位置で折り返す前提でカード幅を設計する
- 「八海山」「魚沼」など固有名詞は途中で折らない（`word-break: break-all` を使わない）

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使わない */
```

- **`palt` は全要素で無効**（実測 `normal`）
- 見出しの字詰めは palt ではなく **`letter-spacing` で「空ける」方向**に統一。
  明朝のベタ組みを崩さないための選択

### 3.8 縦書き

該当なし。全ページ横組み。ただし商品ラベル（画像）は縦組みで、
その視覚的リズムを本文側は `letter-spacing: 0.2em` の見出しで受けている。

### 3.9 preview.html でのフォント代替

| 実サイト | 代替（Google Fonts） | 理由 |
|---------|---------------------|------|
| 筑紫Aオールド明朝 Pr6N | **Shippori Mincho** | オールド系明朝。仮名の抑揚と筆の入りが最も近い |
| 秀英角ゴシック金 L | **Zen Kaku Gothic New (300)** | ヒューマニストなゴシック。Light の細さが近い |

Fontworks は Google Fonts に Kaisei 系（解星）の明朝も提供しているが、
表示向けの性格が強く本文組みには向かないため、実用性を取って Shippori Mincho を採用した。

---

## 4. Component Stylings

### Buttons

**Primary — 塗りボタンは存在しない。ボタンは枠線1本だけ**

- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #000000`
- Border Radius: **`0px`**
- Font: 筑紫Aオールド明朝 M / `16px` / line-height `1.6`
- Padding: 上下 16–20px / 左右 40–60px（横に長く取る）

```css
.btn {
  display: inline-block;
  background: transparent;
  color: #000;
  border: 1px solid #000;
  border-radius: 0;
  font-family: TsukuAOldMinPr6N-M, TsukuMin-M, serif;
  font-size: 16px;
  line-height: 1.6;
  padding: 16px 56px;
}
```

**More（テキストリンク）**
- 筑紫Aオールド明朝 M / `10px` / `letter-spacing: 0.2em` / 大文字の欧文「MORE」
- 下線は引かず、短い罫を横に添える

### Tags / Labels

**Category Chip（酒類カテゴリ — 角丸ゼロの矩形）**
- Background: `#9cb7be` / Text: `#ffffff`
- Border Radius: **`0px`**
- Padding: `0 10px`
- Font: 秀英角ゴシック金 B / `14px`

**News Category（ニュース種別 — 角丸ゼロの矩形）**
- Padding: `4px 8px` / Font: 秀英角ゴシック金 B / `12px` / Text `#ffffff`
- 製品情報 `#7c82a3` / 八海山情報 `#9cb7be` / イベント `#e4ba61`

**Round Label（限定表示 — 唯一の円形）**
- Border Radius: **`50%`**（正円）
- Background: 数量限定 `#e4ba61` / 季節限定 `#7e85a6`
- Text: `#ffffff` / 筑紫Aオールド明朝 M / `10px` / `letter-spacing: 0.1em`
- 商品写真の左上に重ねる「シール」の見立て

### Cards（商品カード）

- Background: `transparent`（白場にそのまま置く）
- Border: なし
- Border Radius: `0px`
- Shadow: なし
- 構成: 商品写真 → カテゴリ札 → 商品名（明朝） → 説明文（ゴシック 14px/1.6）

### Carousel Indicator

- 正円 `border-radius: 50%` / 直径 10px 前後
- 選択中: Background `#9cb7be` / Border `1px solid #9cb7be`
- 非選択: Background `#ffffff` / Border `1px solid #979797`

---

## 5. Layout Principles

### Container

- **Max Width: `1280px`**
- Padding (horizontal): 40px（デスクトップ）/ 20px（モバイル）

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 40px |
| XL | 80px |
| XXL | 120px |

セクション間は **80–120px** と大きく取る。これが「引き算のデザイン」を成立させている。

### Grid

- 商品一覧: 4カラム / Gutter 40px
- お知らせ: 1カラムのリスト（日付＋種別札＋見出し）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。ほぼすべての要素** |
| 1 | `0 0 5px #808080` | 例外的な浮きもの（ごく少数） |

**影は原則として使わない**。奥行きは影ではなく**白場の広さ**で表現する。

---

## 7. Do's and Don'ts

### Do（推奨）

- 見出し・リード・ボタン・ナビは**明朝**、本文・注記・札は**ゴシック Light** にする
- セクション見出しは `letter-spacing: 0.2em` ＋ `line-height: 1.0`
- 字間を空けた見出しは `margin-right` で末尾の余白を相殺する
- ボタンは枠線1本（`1px solid #000`、`border-radius: 0`）
- 差し色は `#9cb7be` / `#7c82a3` / `#e4ba61` の3色に限る
- 本文の line-height は 1.6
- セクション間の余白を 80px 以上取る

### Don't（禁止）

- **角丸を付けない**（`border-radius` は 0。円形の札だけが例外）
- **塗りボタンを作らない**。CTAも枠線1本で通す
- セクションの背景を塗らない（面色は札だけの役割）
- 影・グラデーションを足さない
- `font-weight: 700` でボールドを作らない。**ファミリ名（`-B` / `-M`）で切り替える**
- 本文に `letter-spacing` を入れない（見出し以外はベタ組み）
- 見出しにゴシックを使わない。明朝であることがブランドの第一印象

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1〜2カラム。ナビはハンバーガー |
| Tablet | 768–1023px | 2カラム |
| Desktop | ≥ 1024px | 4カラム。コンテナ 1280px |

### モバイルでの変化

- グローバルナビ → ハンバーガー（`c-hamburger`）
- 大見出し 42px → 28px 前後
- セクション見出しは 30px → 20px 前後。**`letter-spacing: 0.2em` は維持する**
- 商品一覧 4カラム → 2カラム

### タッチターゲット

- 最小 44px × 44px。枠線ボタンは上下パディングを 16px 以上取って高さを確保する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Text Color:      #000000
Text Secondary:  #7f7f7f
Accent 1:        #9cb7be（カテゴリ札）
Accent 2:        #7c82a3（種別・季節限定）
Accent 3:        #e4ba61（イベント・数量限定）
Heading Font:    TsukuAOldMinPr6N-M, TsukuMin-M, serif（筑紫Aオールド明朝）
Body Font:       DNPShueiGoKinStd-L, ShueiGo-L, sans-serif（秀英角ゴシック金 L）
Body Size:       14px
Line Height:     1.6（本文）/ 1.26（大見出し）/ 1.0（セクション見出し・ナビ）
Letter Spacing:  0（本文）/ 0.2em（セクション見出し・MORE）
Border Radius:   0px（円形の札のみ 50%）
Button:          transparent + 1px solid #000
palt:            off
```

### プロンプト例

```
八海山のデザインシステムに従って、日本酒の商品一覧ページを作成してください。
- 背景 #ffffff、本文 #000000、注記 #7f7f7f
- 見出し・リード・ボタン・ナビは明朝:
  font-family: TsukuAOldMinPr6N-M, TsukuMin-M, serif
- 本文・注記・カテゴリ札はゴシック Light:
  font-family: DNPShueiGoKinStd-L, ShueiGo-L, sans-serif
- ページ見出し 42px / line-height 1.26 / letter-spacing 0
- セクション見出し 30px / line-height 1.0 / letter-spacing 0.2em
  （字間を空けた末尾は margin-right: -0.2em で相殺する）
- 本文 14px / line-height 1.6 / letter-spacing なし
- border-radius はすべて 0。角丸を付けない
- ボタンは塗らず、1px solid #000 の枠線だけ。文字は明朝 16px
- 酒類カテゴリの札: 背景 #9cb7be / 文字 #ffffff / radius 0 / padding 0 10px
- 「数量限定」は正円（border-radius: 50%）の札で 背景 #e4ba61 / 文字 #ffffff /
  明朝 10px / letter-spacing 0.1em
- 影・グラデーション・セクション背景色は使わない
- セクション間の余白は 80px 以上
- コンテナ幅 1280px、商品は4カラム
```
