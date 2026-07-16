# DESIGN.md — Subsequence (サブシーケンス)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 対象サイト: https://subsequence.tv/
> Subsequence（サブシーケンス）は visvim が発行するインディペンデントなカルチャー／クラフト マガジン。
> 温かいクリーム色（オフホワイト）の下地に純黒のテキストを組み、記事カテゴリーごとにパステルのチップ色を割り当てる、
> 収集家めいた静かなエディトリアル。日英バイリンガルの誌面設計。
> 実測はブランドサイト トップ / 記事一覧に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 紙のようなクリーム色（`#f7f7e8`）を下地に、純黒のテキストと極細の罫で組む、ゆったりとしたエディトリアル。写真と余白を主役に据え、UI は装飾を削ぎ落とす。記事カテゴリーにパステルのチップ色を1色ずつ割り当てる「多色のインデックス」がブランドの署名
- **密度**: 低密度。小さめの文字（13〜17px 基調）を広い行間で置き、面ではなく余白と罫、そして淡いチップ色で領域を分ける
- **キーワード**: クリーム地 / エディトリアル / バイリンガル / クラフト / パステル インデックス / スロー
- **形状言語**: 面・タグ・入力欄はほぼ角ゼロ（`border-radius: 0〜2px`）。カテゴリータグは 1px の黒罫で囲むアウトライン型、または淡いパステルの面塗り。丸みや影で飾らず、直線と罫で端正に見せる
- **書体の性格**: 欧文はニュートラルなグロテスク（"Winden"、Regular / Medium / SemiBold）で見出し・ラベルを据える。和文はシステム系のゴシック（→ 仕様上は Noto Sans JP）。字間は開かず（normal）、palt も off。文字を小さく・行間を広く取り、収集家めいた静けさを演出する

---

## 2. Color Palette & Roles

<!-- 実サイトの computedStyles / interactive / uniqueBackgrounds / pageBackground 実測に基づく。基調は「温かいクリーム下地＋純黒＋パステルのカテゴリー チップ」 -->

### Base（下地）

- **Background** (`#f7f7e8`): ページ全体の下地。紙を思わせる温かいクリーム／オフホワイト（rgb(247,247,232)）。`body` の実測背景で、誌面全体を支配する。html は `#ffffff` だが、見える地色はこのクリーム。**この下地こそがブランドの決定的な特徴**
- **Surface** (`#ffffff`): 画像枠・モーダルなど、下地から一段持ち上げる面。純白
- **Ink Black** (`#000000`): 見出し・本文・罫・タグ罫の基調色。純黒

### Category Chips（カテゴリー チップ = ブランドの署名多色）

記事カテゴリーごとに1色のパステルを割り当てる。低彩度で下地のクリームとなじみ、インデックスとして機能する。

- **Olive** (`#e7e5b5`): rgb(231,229,181)。例 "Discovery"
- **Powder Blue** (`#d2e3ea`): rgb(210,227,234)。例 "Getaway"
- **Sage Green** (`#cce1d0`): rgb(204,225,208)。例 "Artisan"
- **Dusty Pink** (`#eed3d9`): rgb(238,211,217)。例 "Event"
- **Warm Gray** (`#cbc9c5`): rgb(203,201,197)。汎用ラベル・補助面
- **Peach** (`#fcdfb7`): rgb(252,223,183)。特集・強調カテゴリー

### Text（文字色）

- **Text Primary** (`#000000`): 見出し・本文。純黒
- **Text Muted** (`#555555`): 注釈・補足・言語スイッチ等の小テキスト（純黒からわずかに退けたグレー）

### 色に関する設計思想

- 基調は「温かいクリーム下地 `#f7f7e8`」「純黒の文字と罫 `#000000`」「白の面 `#ffffff`」の3色
- カテゴリー チップのパステルは、**彩度を上げず**下地のクリームとなじむトーンで統一する。原色・ビビッドは使わない
- 多色はあくまで「記事の分類インデックス」。1記事＝1チップ色の対応を崩さず、面全体をパステルで塗り潰さない
- ブランドの世界観は「クリーム地の静けさ」と「パステルの控えめな彩り」の対比で作る

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: 実サイトは和文専用フォントを宣言しておらず、システムスタックで描画される。仕様としては Noto Sans JP を基本に、`system-ui` → `-apple-system`（ヒラギノ角ゴ）にフォールバック
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ（見出し・ラベル・本文）**: **Winden**（ニュートラルなグロテスク。Regular / Medium / SemiBold の3カット。実測ではいずれも weight 400 を返すが、字面は Regular / Medium / SemiBold として使い分けられている）。ロゴ・欧文見出し・ナビラベル・本文に使う
- **セリフ / 等幅**: 使用しない。入力欄などは "Helvetica Neue" へフォールバック

> **代替フォントの注記**: Winden は Web ライセンスフォントのため、ローカル・preview.html では表示できない。
> - Winden → **Inter**（ニュートラルなグロテスクで印象が近い）で代替
> - 和文は **Noto Sans JP** を Google Fonts で直接読み込む
> - preview.html のインラインおよび Typography セクションのフォント指定もすべて代替フォントに揃える

### 3.3 font-family 指定

```css
/* 本文・UI（和文） */
font-family: "Noto Sans JP", system-ui, -apple-system, sans-serif;

/* 欧文見出し・ナビラベル・本文 */
font-family: "Winden", "Helvetica Neue", Arial, sans-serif;
```

**フォールバックの考え方**:
- 和文 UI は Noto Sans JP を先頭に、OS のシステムフォントへフォールバック
- 欧文の見出し・ラベル・本文は Winden を独立して指定し、Latin グリフを Winden で拾う
- ウェイトは Regular（≒400）中心。見出しは Medium / SemiBold カットで差をつける。階層はサイズで作る

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (EN) | Winden | 64px | SemiBold相当 | 1.3 | normal | ヒーローの大見出し（lh 実測 83.2px） |
| Headline (JP/EN) | Winden / NSJP | 17px | Medium相当 | 1.5 | normal | 記事タイトル（p 実測） |
| Body (JP) | Noto Sans JP | 14px | 400 | 2.0 | normal | 本文（line-height 28px） |
| Nav / List (EN/JP) | Winden / NSJP | 14px | 400 | 1.5 | normal | グローバルナビ・一覧 |
| Small Label (EN) | Winden | 13px | 400 | 1.4 | normal | 言語スイッチ・注釈 |
| Category Tag (EN) | Winden | 13px | 400 | 1.0 | normal | カテゴリー チップの文字 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: `2.0`（14px 本文で 28px）。日本語の可読性のため、収集家めいた誌面らしくかなり広めに取る
- **記事タイトルの行間**: `1.5`
- **欧文大見出しの行間**: `1.3`（64px で 83.2px）
- **字間 (letter-spacing)**: 全体を通して **`normal`**。開かない・詰めない

**ガイドライン**:
- 和文本文は 14px と小さめだが、`line-height: 2.0` を確保して大きく空けて読ませる
- 字間は開かないのがこのブランドの流儀。階層はサイズとウェイト カットで作る
- 欧文大見出しは 64px と大胆に取り、下地の余白とのコントラストで見せる

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

- 実測では `font-feature-settings: normal`、`letter-spacing: normal`。palt は使わず、和文の詰めも行わない
- 広い行間（2.0）と normal 字間で、ゆったりした余白感を作る設計

### 3.8 縦書き

該当なし（横書きのみ）。

---

## 4. Component Stylings

面・タグ・入力欄はほぼ角ゼロ（`border-radius: 0〜2px`）。カテゴリータグは 1px 黒罫のアウトライン、またはパステルの淡い面塗り。

### Buttons / Tags

**Category Tag（アウトライン）**
- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #000000`
- Border Radius: `0–2px`
- Padding: `3px 5px`（極小）
- Font: 13px / weight 400 / letter-spacing normal
- 例: カテゴリーラベル、言語スイッチ「EN / JP」

**Category Tag（パステル面塗り）**
- Background: カテゴリー チップ色（Olive `#e7e5b5` / Powder Blue `#d2e3ea` / Sage Green `#cce1d0` / Dusty Pink `#eed3d9` / Peach `#fcdfb7` / Warm Gray `#cbc9c5`）
- Text: `#000000`
- Border: なし、または `1px solid #000000`
- Border Radius: `0–2px`
- Padding: `3px 8px`
- 例: "Discovery" / "Getaway" / "Artisan" / "Event"

**Primary（面塗り・黒）**
- Background: `#000000`
- Text: `#ffffff`
- Border: `1px solid #000000`
- Border Radius: `0–2px`
- Padding: `8px 16px`
- 例: 主要 CTA（購読・購入導線）

### Inputs

- Background: `#ffffff`
- Border: `1px solid #000000`（細い黒罫）
- Border (focus): `1px solid #000000`（罫を維持し、下線を濃くする）
- Border Radius: `0–2px`
- Padding: `8px 12px`
- Font Size: 14–16px
- フォールバックは "Helvetica Neue"

### Cards

- Background: `#ffffff`（または下地のクリームのまま）
- Border: なし、または `1px solid #000000` の細罫
- Border Radius: `0–2px`
- Shadow: なし（フラット）
- 記事カードは大判写真＋カテゴリー チップ（パステル）＋タイトル（日英）＋短いメタの最小構成。角ゼロで端正に

---

## 5. Layout Principles

### Spacing Philosophy

クリームの余白を広く取り、大判の記事写真を主役に据える。要素は角ゼロの細罫とパステルのチップでゆるやかに区切り、密度を上げすぎない。誌面らしい非対称なグリッドも許容する。

### Spacing Scale（推定）

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 48px |
| XL | 72px |
| XXL | 120px |

### Container

- Max Width: 1280px（キービジュアル・記事写真はフルブリード可）
- Padding (horizontal): 24–40px

### Grid

- Columns: 12（記事一覧は 2〜3 カラム）
- Gutter: 24–40px
- 写真をゆったり配置し、日英のキャプションを短く小さく添える

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼ全ての面はフラット |
| 1 | `0 1px 3px rgba(0,0,0,0.08)` | ドロップダウン・メニューの最小限の浮き |
| 2 | `0 8px 24px rgba(0,0,0,0.12)` | モーダル・ナビのオーバーレイ |

- 影はほぼ使わない。奥行きは「余白」「写真」「細罫」「パステルのチップ」で表現する

---

## 7. Do's and Don'ts

### Do（推奨）

- 下地は温かいクリーム `#f7f7e8`、文字と罫は純黒 `#000000`、面は白 `#ffffff` の3色を基調にする
- カテゴリーごとにパステルのチップ色を1色ずつ割り当てる（Olive `#e7e5b5` / Powder Blue `#d2e3ea` / Sage Green `#cce1d0` / Dusty Pink `#eed3d9` / Peach `#fcdfb7` / Warm Gray `#cbc9c5`）
- 面・タグ・入力欄は `border-radius: 0〜2px` のほぼ角ゼロにする
- カテゴリータグは 1px 黒罫のアウトライン、または淡いパステル面塗りにする
- 字間は `normal`、palt も off。和文本文は 14px でも `line-height: 2.0` を確保する
- 欧文は Winden（→ Inter 代替）、和文は Noto Sans JP で組む。日英を併記する誌面設計を意識する

### Don't（禁止）

- 彩度の高い色・原色を面で使わない（カテゴリー色は低彩度パステルに限定）
- 1記事に複数のチップ色を混ぜたり、面全体をパステルで塗り潰したりしない
- 角丸・強い影を付けない（フラット・ほぼ角ゼロが基調）
- 和文本文の line-height を 2.0 未満に大きく詰めない
- 字間を開けたり palt で詰めたりしない（normal を守る）
- 和文フォント1つだけを指定しない（必ずフォールバックチェーンを書く）

---

## 8. Responsive Behavior

### Breakpoints（推定）

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | 1 カラム。ナビはハンバーガー＋オーバーレイ |
| Tablet | ≤ 1024px | 2 カラム |
| Desktop | > 1024px | 2〜3 カラム＋フルブリード写真 |

### タッチターゲット

- 最小サイズ: 44px × 44px

### フォントサイズの調整

- 本文は 14px 基調。モバイルでも 13px 未満に落とさず line-height 2.0 を保つ
- 欧文大見出し（64px）はモバイルで 36〜44px に縮小。字間 normal は維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:    #f7f7e8（温かいクリーム）
Surface:       #ffffff
Ink / 罫/CTA:  #000000
Chip Olive:    #e7e5b5（Discovery）
Chip Blue:     #d2e3ea（Getaway）
Chip Sage:     #cce1d0（Artisan）
Chip Pink:     #eed3d9（Event）
Chip Warm:     #cbc9c5
Chip Peach:    #fcdfb7
Font(JP):      "Noto Sans JP", system-ui, -apple-system, sans-serif
Font(EN):      "Winden", "Helvetica Neue", Arial, sans-serif（→ Inter 代替）
Display:       64px / line-height 1.3
Body Size:     14px
Line Height:   2.0（和文本文）
Letter Spacing: normal（全体）
palt:          off
Radius:        0–2px（全要素）
Tag(罫):       transparent / #000 / 1px solid #000 / radius 0–2px / padding 3px 5px
Tag(面):       パステル chip 色 / #000 / radius 0–2px / padding 3px 8px
Card:          radius 0–2px / shadow なし
```

### プロンプト例

```
Subsequence のデザインシステムに従って、バイリンガルのカルチャー マガジンの記事一覧セクションを作成してください。
- 下地: #f7f7e8（温かいクリーム）、面: #ffffff、文字と罫: #000000
- フォント（和文）: "Noto Sans JP", system-ui, -apple-system, sans-serif
- フォント（欧文）: "Winden"（→ Inter 代替）, "Helvetica Neue", Arial, sans-serif
- 本文 14px / line-height 2.0、字間は normal、palt off
- すべての面・タグ・入力欄は border-radius 0〜2px
- 記事カードは大判写真＋カテゴリー チップ（パステル1色）＋日英タイトルの最小構成、影なし・ほぼ角ゼロ
- カテゴリー色: Discovery=#e7e5b5 / Getaway=#d2e3ea / Artisan=#cce1d0 / Event=#eed3d9
- カテゴリー色は1記事1色。低彩度パステルに限定し、面全体を塗り潰さない
```

### Web ライセンスフォントが使えない環境での代替指針

- 欧文 Winden → **Inter**（ニュートラルなグロテスク）
- 和文は **Noto Sans JP** を Google Fonts で直接利用可
- 代替でも「温かいクリーム下地・純黒の文字と細罫・ほぼ角ゼロのフラットな面・大判写真・低彩度パステルのカテゴリー チップ・広い行間（2.0）・字間 normal」を守れば世界観は再現できる
