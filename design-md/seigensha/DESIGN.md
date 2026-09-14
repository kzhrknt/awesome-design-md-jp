# DESIGN.md — 青幻舎（SEIGENSHA Art Publishing）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-14 / 対象: `https://www.seigensha.com/`, `/books/978-4-86831-042-6/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 美術書出版社の**書誌カタログ**。写真（書影）を主役に置き、文字組みは一切主張しない。影ゼロ・角丸ほぼゼロの平面構成
- **密度**: 高い。新刊・刊行予定・重版・展覧会情報を**色分けしたバッジ**で捌く。1画面に多数の書影がタイル状に並ぶ
- **キーワード**: Noto Sans JP 一本、palt 全面、字間ゼロ、色バッジによる分類、フラット

**このサイトの核心は3つある。**

1. **`font-feature-settings: "palt"` を全テキストに当てている**（実測：可視テキスト要素 **209 件中 209 件**が `"palt"`）。にもかかわらず **`letter-spacing` は `normal`**（実測 205/209）。**詰めるのは palt だけで、字間は一切足さない**——和文の約物アキだけを潰して、あとは書体のメトリクスに委ねる構え
2. **和文も欧文も `"Noto Sans JP", sans-serif` の1スタックだけ**（可視テキスト 205 件）。明朝（Noto Serif JP）とOpen Sans が出るのは**グループ企業名「紫紅社」「草紙堂」の2ヶ所のみ**。書体で語らず、書影に語らせる
3. **ルートの `font-size` が `10px`**（`html` も `body` も 10px）。本文は各コンポーネント側で 13〜16px を指定する。**角丸・パディングは `em` 指定**なので、文字サイズを変えると寸法が連動する（後述 4章）

**影（`box-shadow`）は可視要素 0 件**。`border-radius` もバッジとフィルタチップにしか無い。

> **CSS Custom Properties は 77 個あるが、すべて WordPress / Gutenberg の既定値**（`--wp--preset--color--*`, `--wp--preset--gradient--*`, `--wp--preset--shadow--*`）**と管理バーの `--sb-*`, `--swiper-*`**。**青幻舎自身のデザイントークンは 1 つも無い。** `--wp--preset--color--vivid-red: #cf2e2e` などは実装で 1 度も使われていないので、**変数を見て実装しないこと**。以下の値はすべて computed style の実測値。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー・分類色）

このサイトの「ブランドカラー」は**書誌の状態を示すバッジの色**として存在する。**面の色ではなく、分類のための色**。

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **New（最新情報）** | **`#e50c00`** | 可視 8 要素。`New` アイコン。**このサイトで最も彩度の高い赤**。radius 4.2px、14px / weight 500 |
| **新刊** | `#dd4b4b` | 可視 5 要素。書影に重ねる帯バッジ。`#e50c00` より沈んだ赤 |
| **重版** | `#1e73be` | 可視 3 要素。青のバッジ |
| **刊行予定** | `#777777` | 可視 11 要素。`11月刊行予定` `10月刊行予定`。**未確定のものはグレーに落とす** |
| **展覧会・イベント** | `#f15a24` | 可視 7 要素。オレンジ |
| **メディア情報** | `#009245` | 可視 1 要素。緑 |
| **シリーズタグ** | `#666666` | 可視 8 要素。`ビジュアル文庫シリーズ` `360° BOOK シリーズ` |

> **赤が2色あるのは実装の実態。** `#e50c00`（New アイコン）と `#dd4b4b`（新刊バッジ）は用途が分かれている。**1色に丸めて書かない。** 新規実装では `New` は `#e50c00`、書影に重ねる帯は `#dd4b4b` を使う。

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 見出し・本文（可視 28 要素）。**純黒は使わない**
- **Link / Nav Text** (`#35302e`): グローバルナビ、フッターへのリンク、アウトラインボタンの文字（**可視 60 要素。このサイトで最も多い文字色**）。`#222222` よりわずかに赤みのある黒
- **Text Muted** (`#808080`): 著者名、副題（可視 25 要素）
- **Text on Dark** (`#e6e6e6`): ダーク面（フィルタチップ・フッター）上の文字（可視 42 要素）
- **Text on Fill** (`#ffffff`): 色バッジ上の文字（可視 51 要素）
- **Chip Fill** (`#4d4d4d`): 絞り込みチップの面
- **Footer Fill** (`#333333`): フッター全面
- **Surface Button** (`#f2f2f2`): `もっと見る` の面
- **Link Active** (`#0062a2`): 言語切替の選択中（`JP`）。非選択は `#cccccc`
- **Background** (`#fbfbfb`): ページ背景（`pageBackground.resolved` = `rgb(251,251,251)` / 根拠 `body`）。**純白ではなく、ごくわずかに沈めた白**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の本文書体）**: **Noto Sans JP**。Google Fonts から配信。**サイト上のほぼ全テキストがこれ1つ**
- **明朝体**: **Noto Serif JP**。**グループ企業名「紫紅社」「草紙堂」の2ヶ所だけ**（可視 2 要素）。本文・見出しには使わない

### 3.2 欧文フォント

- **専用の欧文フォントを持たない。** 書名の欧文・数字・ISBN も **Noto Sans JP の欧文グリフ**をそのまま使う
- **Open Sans** が `@font-face` で宣言され 300 が `loaded` だが、**使われているのはグループ企業名のローマ字表記 2 要素のみ**（`SOSHIDO` `SHIKOSHA`）
- `Font Awesome 5 Free 900` がアイコン用に `loaded`

**ロード状況（実測 `document.fonts`）**:

| 書体 | loaded | unloaded |
|------|--------|----------|
| Noto Sans JP | **400 / 500 / 600 / 700** | 300 / 900 |
| Noto Serif JP | 400 | 500 / 600 / 700 / 900 |
| Open Sans | 300 | 400 / 600 / 700 / 800 |

> **Noto Sans JP の 300 と 900 は宣言されているがロードされない**（参照する要素が無い）。**実装で使えるのは 400 / 500 / 600 / 700 の4段**。

### 3.3 font-family 指定

```css
/* 本文・見出し・UI（サイト全体で実質これだけ） */
font-family: "Noto Sans JP", sans-serif;

/* グループ企業名（和文） */
font-family: "Noto Serif JP", serif;

/* グループ企業名（ローマ字） */
font-family: "Open Sans", sans-serif;
```

**フォールバックの考え方**:
- **Web フォント1つ＋ generic のみ**という最小構成。OS フォントを経由した表示ゆれを許容しない割り切り
- **`"Noto Sans JP"` が落ちると generic sans-serif（＝環境依存）に直行する。** ローカルの和文ゴシック（ヒラギノ・游ゴシック）をチェーンに足しておく方が安全。**実サイトは足していないが、新規実装では足すこと**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Section Heading** | Noto Sans JP | **24px** | **700** | **1.10** (26.4px) | normal | `新刊案内` `新刊予告`。左右に罫線を伸ばす |
| **Book Title（詳細）** | Noto Sans JP | **22px** | **700** | **1.70** (37.4px) | normal | 書誌ページの書名 |
| **Catch Copy** | Noto Sans JP | 20px | 700 | 1.70 (34px) | normal | 書誌ページの惹句 |
| **Card Title** | Noto Sans JP | 16px | 600 | 1.70 (27.2px) | normal | 一覧の書名 |
| **Nav（横）** | Noto Sans JP | 16px | 400 | **1.10** (17.6px) | normal | グローバルナビ。ホバー時に 700 |
| **Nav（ドロワー）** | Noto Sans JP | 15px | 400 | **1.10** (16.5px) | normal | |
| **Body** | Noto Sans JP | **15px** | 400 | **1.70** (25.5px) | normal | 書誌ページの本文 |
| **Author / Subtitle** | Noto Sans JP | 13–14px | **600** | 1.70 | normal | 色は `#808080` |
| **Badge** | Noto Sans JP | 13–14px | 400 / 500 | **2.86**（40px 固定） | normal | 下記 3.5 の注意を参照 |
| **Footer / Fine print** | Noto Sans JP | 10–13px | 400 | 1.70 | normal | |

**ウェイトの分布（可視テキスト要素）**: 400 が 87 件、**600 が 62 件**、500 が 44 件、700 が 14 件。**600 が「小見出し・書名」の主力**で、700 はセクション見出しとナビのホバーだけに使う。

### 3.5 行間・字間

- **本文・見出しの行間は `1.70` で統一**（実測 149 要素）。`body { font-size: 10px; line-height: 17px }` から継承される
- **1行で収まるもの（ナビ・セクション見出し）だけ `1.10`**（実測 33 要素）
- **バッジは `line-height: 40px` の絶対値**（実測 19 要素）。14px の文字に対して比率 **2.86** になる

> **バッジの `line-height: 40px` を比率に換算して書かない。** これは「バッジの高さを 40px に固定する」ための絶対値であり、2.86 という比率に意味は無い。**新規実装ではバッジの高さを `height` か `padding` で決め、`line-height` は 1 に近い値にすること。**

- **`letter-spacing` は `normal`**（実測 205/209）。**字間を足すのはグループ企業名の2ヶ所だけ**（`2.8px` = ローマ字表記、`5.2px` = 和文の社名）

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

- 書名・著者名は長くなるため、カード内では `overflow-wrap: break-word` 前提で組む
- ISBN・欧文書名がカード幅を超えるので、**欧文の途中改行を許す**

### 3.7 OpenType 機能

```css
/* サイト全体に当てる（実サイトの実装） */
font-feature-settings: "palt";
```

- **可視テキスト要素 209 件中 209 件が `"palt"`**。見出し・本文・ナビ・バッジの区別なく**全面適用**
- **`letter-spacing` は足さない。** palt で約物のアキを潰したうえで、字間は書体のままにする
- **例外はフォーム要素**（`input` / `select`）で、ここだけ `font-feature-settings: normal`。後述 4章の既知の問題を参照

### 3.8 縦書き

**該当なし。** 実測した全 209 要素が `writing-mode: horizontal-tb`。

---

## 4. Component Stylings

> **このサイトの寸法は `em` 指定**。実測の px 値が `16.8px` `8.4px` `4.2px` のような半端な数になるのはそのため（14px × 1.2em = 16.8px）。**`em` で書けば文字サイズに連動する。**

### Buttons

**Filter Chip（絞り込みチップ・pill）**
- Background: `#4d4d4d`
- Text: `#e6e6e6`
- Border: `1px solid #808080`
- Padding: `0.6em 1.1em`（14px 時 = 8.4px 15.4px）
- Border Radius: `1.2em`（14px 時 = 16.8px）
- Font Size: 14px / Weight 400

**Secondary（アウトライン）**
- Background: `#ffffff`
- Text: `#35302e`
- Border: `1px solid #4d4d4d`
- Padding: `14px 0`（横幅いっぱいに伸ばす）
- Border Radius: **`0`**
- Font Size: 14px / **Weight 700**

**More（一覧をもっと見る）**
- Background: `#f2f2f2`
- Text: `#35302e`
- Border: `1px solid #f2f2f2`（面と同色。**罫線は見えない**）
- Padding: `1.2em 6.5em`（14px 時 = 16.8px 91px）
- Border Radius: **`0`**

### Badges

| 種別 | Background | Text | Radius | Padding | Size / Weight |
|------|-----------|------|--------|---------|---------------|
| **New** | `#e50c00` | `#ffffff` | **`0.3em`**（4.2px） | `0.3em 0.5em` | 14px / **500** |
| 新刊 | `#dd4b4b` | `#ffffff` | `0` | — （`line-height: 40px` で高さを作る） | 14px / 400 |
| 重版 | `#1e73be` | `#ffffff` | `0` | — | 14px / 400 |
| 刊行予定 | `#777777` | `#ffffff` | `0` | — | 14px / 400 |
| 展覧会・イベント | `#f15a24` | `#ffffff` | `0` | `0.4em 0.5em` | 14px / 400 |
| メディア情報 | `#009245` | `#ffffff` | `0` | `0.4em 0.5em` | 14px / 400 |
| シリーズ | `#666666` | `#ffffff` | `0` | `0.3em 0.5em` | 13px / 400 |

> **角丸を持つのは `New` だけ**（4.2px / 3.9px）。**他のバッジは全部 `radius: 0`。** 揃えたくなるが、実サイトはこうなっている。新規実装で統一するなら **`0` に寄せる**（このサイトの基調は角丸ゼロ）。

### Inputs

- Background: `#ffffff`
- Border: `1px solid #000000`
- Border Radius: **`0`**
- Padding: `12.6px 36px 12.6px 9px`（右は検索アイコン分）
- Height: 40px
- Font Size: 18px

**`select`（カテゴリ絞り込み）**
- Background: `transparent` / Border: **なし** / 文字色 `#808080` / 18px

> **既知の問題：フォーム要素だけ `font-family: Arial` のまま。** `input` / `select` は `font-feature-settings: normal`、書体も Arial（＝和文は OS 既定にフォールバック）。**本文と入力欄で書体が食い違う。** 新規実装では必ず `font-family: inherit` を当てること。

### Cards（書影タイル）

- Background: 透明（ページ背景 `#fbfbfb` がそのまま出る）
- Border: **なし**
- Border Radius: **`0`**
- Shadow: **なし**（可視 0 件）
- 書影画像＋バッジ（左上に重ねる）＋書名（16px / 600）＋著者名（13px / 600 / `#808080`）の縦積み

---

## 5. Layout Principles

### Spacing Scale

**トークンとしての spacing は存在しない**（CSS 変数は WordPress 既定のみ）。実測から読み取れる実効スケール:

| Token | Value | 用途 |
|-------|-------|------|
| XS | 4px | バッジ内の上下 |
| S | 7–9px | バッジ・入力欄の左右 |
| M | 15–17px | チップの左右、ボタンの上下 |
| L | 28px | セクション見出しの左右の余白 |
| XL | 40px | バッジの高さ、ブロック間 |

### Container

- 固定の `max-width` コンテナを持たない（実測 0 件）。**ビューポート幅に対する % とパディングで組む流動レイアウト**
- ヘッダーは幅いっぱい、書影グリッドは 4 カラム（1440px 時）

### Grid

- 新刊一覧: 4 カラム（デスクトップ）
- バッジは書影の**左上に絶対配置**で重ねる

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| **0** | **none** | **このサイトの全要素** |

**影は可視要素 0 件。** WordPress 既定の `--wp--preset--shadow--natural` 等が宣言されているが**1ヶ所も使われていない**。

**深さは影ではなく「面の明度」で表す**: ページ `#fbfbfb` → ボタン面 `#f2f2f2` → チップ `#4d4d4d` → フッター `#333333`。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-feature-settings: "palt"` を全テキストに当てる。** このサイトの字面はこれで決まっている
- **`letter-spacing` は `normal` のままにする。** palt と併用して字間を足さない
- **本文の `line-height` は 1.7。** ルートの `10px / 17px` から継承させる
- **角丸・パディングは `em` で指定する。** 実サイトの半端な px 値（16.8px / 8.4px / 4.2px）は em 指定の結果
- **書誌の状態は色で分類する**（New = `#e50c00` / 新刊 = `#dd4b4b` / 重版 = `#1e73be` / 予定 = `#777777`）
- **文字色は `#222222` と `#35302e` を使い分ける**（見出し＝`#222222`、リンク・ナビ＝`#35302e`）

### Don't（禁止）

- **`font-family` を `"Noto Sans JP", sans-serif` だけで済ませない。** 実サイトはこう書いているが、Web フォントが落ちたときに generic へ直行する。**ローカルの和文ゴシックをチェーンに足すこと**
- **`input` / `select` を素のままにしない。** 実サイトは Arial のまま残っており、本文と書体が食い違う。**`font-family: inherit` を必ず当てる**
- **バッジの `line-height: 40px` を比率（2.86）に換算して再宣言しない。** 高さを作るための絶対値
- **影を足さない。** このサイトは可視 0 件。カードを浮かせると別のサイトになる
- **CSS 変数（`--wp--preset--*`）を設計トークンとして読まない。** すべて WordPress の既定値で、実装では使われていない
- **純黒 `#000000` を文字に使わない**（`input` の枠にだけ使われている）

---

## 8. Responsive Behavior

### Breakpoints

実測したメディアクエリの出現回数順:

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **`max-width: 767px`** | **主ブレークポイント**（13 ルール）。ナビをドロワーに畳む |
| Tablet | `max-width: 840px` / `900px` | グリッドのカラム数を落とす |
| Small Desktop | `max-width: 1080px` / `1100px` / `1260px` | |
| Large | `max-width: 1460px` / `1500px` | ヒーローの余白調整 |

### タッチターゲット

- 入力欄の高さ 40px、チップの高さ 約35px。**44px には届いていない。** 新規実装では 44px を確保すること

### フォントサイズの調整

- ルートが 10px 固定のため、**モバイルでも本文 15px は変わらない**
- グリッドのカラム数（4 → 2 → 1）で調整する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary (New):   #e50c00
Text Color:      #222222（見出し） / #35302e（リンク・ナビ）
Text Muted:      #808080
Background:      #fbfbfb
Footer:          #333333
Font:            "Noto Sans JP", sans-serif
Root Size:       10px（本文は 15px）
Line Height:     1.7
Letter Spacing:  normal（足さない）
OpenType:        font-feature-settings: "palt"
Radius:          0（New バッジのみ 0.3em）
Shadow:          なし
```

### プロンプト例

```
青幻舎のデザインシステムに従って、書籍一覧のカードグリッドを作成してください。
- フォント: "Noto Sans JP", sans-serif（ローカル和文ゴシックをフォールバックに追加）
- 全テキストに font-feature-settings: "palt" を当て、letter-spacing は normal のまま
- 本文の line-height は 1.7、1行の見出しのみ 1.10
- カードは 書影 → 書名(16px/600/#222222) → 著者名(13px/600/#808080) の縦積み
- 書影の左上に状態バッジを重ねる（新刊 #dd4b4b / 重版 #1e73be / 刊行予定 #777777、いずれも radius 0・白文字）
- 影は使わない。角丸は使わない
- 背景は #fbfbfb
```
