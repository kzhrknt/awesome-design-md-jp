# DESIGN.md — DNP（大日本印刷）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-08-31 / 対象: `https://www.dnp.co.jp/`, `/corporate/`, `/news/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 角丸をほぼ使わない直線基調の総合企業サイト。深いコバルトブルー1色でブランドを立て、面は白と極薄のブルーグレーだけで構成する。装飾よりも情報の到達性を優先した設計
- **密度**: 事業領域・IR・ニュースを1枚に載せる情報密度の高いコーポレート型。カードは等幅グリッドで整列し、リンクは矢印付きの矩形ボタンで統一される
- **キーワード**: 直線的、堅牢、青一色、情報量が多い、フラット

**このサイト最大の特徴は自社書体を Web フォントとして使っていること。** DNP は秀英体の版元であり、見出しには `秀英角ゴシック金 B JIS2004` が実際にロードされて適用される（`document.fonts` で `loaded` を確認済み）。あわせて `YakuHanJP`（約物半角）が全要素のフォールバック先頭に置かれ、括弧・句読点のアキを詰めている。**この2つを外すとサイトの印象は再現できない。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **DNP Blue** (`#1432aa`): ブランドの中核。見出し文字色・主要CTAの面色・ナビゲーションの面色を兼ねる。トップの `uniqueBackgrounds` で最多（13件）
- **Blue Secondary** (`#5365ac`): ニュース種別バッジの面色。ニュース一覧では 79 件と支配的
- **Accent Orange** (`#e13000`): ヘッダー右端の「お問合わせ」CTA **専用**。ページ内で1〜2件しか出ない。多用しない

### Surface（面色）

- **Background** (`#ffffff`): ページ背景。`body` に明示指定（`pageBackground.resolved` 根拠 `body`）
- **Surface Blue** (`#e6f1fb`): 事業領域チップ・注目リンクの淡い面。関連色に `#e8f1fa` があり、セクション見出し帯に使われる
- **Surface Gray** (`#f9f9f9`): ヘッダーのユーティリティ領域・セレクトボックスの面
- **Surface Blue Gray** (`#eeeff3`): ニュース一覧の日付カラム・パンくずの帯

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文テキスト。純黒は使わない
- **Text Secondary** (`#555555`): ヘッダー補助リンク・セレクトのラベル
- **Border** (`#666666`): アウトラインボタンの枠。DNP のボタンは枠が濃い
- **Border Light** (`#8c8c8c`): セレクトボックスの枠
- **Carousel Dot** (`#787878`): ヒーローカルーセルの非アクティブドット（アクティブは `#1432aa`）

> **注意 — `#0000ff` は設計色ではない**: `computedStyles` の一部の `<a>` / `<p>` に `color: rgb(0, 0, 255)` が出るが、これらは**直下が `<img>` だけでテキストノードを持たない要素**（バナーリンク）。文字が描画されないため色は画面に出ない。ブランドの青として採用してはいけない。

---

## 3. Typography Rules

### 3.1 和文フォント

- **本文ゴシック**: Noto Sans JP → ヒラギノ角ゴ ProN → メイリオ → ＭＳ Ｐゴシック
- **見出しゴシック**: **秀英角ゴシック金 B JIS2004**（DNP 自社書体。Web フォントとして実ロードされる）→ ヒラギノ角ゴ ProN 以下同じ
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **約物**: `YakuHanJP`（すべてのスタックの先頭。括弧・句読点を半角幅に詰める）
- **サンセリフ**: 数値・英字見出しの一部に `Arial` を先頭にした別スタックがある
- **等幅**: 定義なし

### 3.3 font-family 指定

```css
/* 本文・ナビゲーション・UI 全般 */
font-family: YakuHanJP, "Noto Sans JP", "ヒラギノ角ゴ ProN",
             "Hiragino Kaku Gothic ProN", メイリオ, Meiryo,
             "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;

/* 見出し（h1〜h3・リード文）— 秀英角ゴシック金 */
font-family: YakuHanJP, "秀英角ゴシック金 B JIS2004",
             "Shuei KakuGo Kin B JIS2004", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;

/* 欧文まじりの小見出し（数値・英字ラベル） */
font-family: Arial, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
```

**フォールバックの考え方**:
- **`YakuHanJP` を必ず先頭に置く。** 約物だけを差し替える専用フォントで、和文本体は次のフォントが担当する
- 見出しは自社書体を第2優先に置き、非対応環境ではヒラギノ角ゴ ProN に落ちる
- 末尾に `ＭＳ Ｐゴシック` まで残す**レガシー互換のスタック**。Windows の古い環境まで面倒を見る方針

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | 秀英角ゴシック金 | 40px | 700 | 1.3 (52px) | normal | 下層ページの h1。`#1432aa` |
| Section Heading | 秀英角ゴシック金 | 32px | 700 | 1.3 (41.6px) | normal | トップの h2。`#1432aa` |
| Section Heading S | 秀英角ゴシック金 | 30px | 700 | 1.3 (39px) | normal | 下層の h2。`#1432aa` |
| Lead | 秀英角ゴシック金 | 30px | 700 | 1.5 (45px) | normal | ヒーロー直下のリード。`#1432aa` |
| Sub Heading | 秀英角ゴシック金 | 28px | 700 | 1.8 (50.4px) | normal | h3。`#333333` |
| Card Title | 秀英角ゴシック金 | 20px | 700 | 1.3 (26px) | normal | `#1432aa` |
| Callout | Noto Sans JP | 20px / 24px | 700 | 1.5 | normal | 下層の強調段落。`#333333` |
| Link Label | Noto Sans JP | 18px | 600 | 1.85 (33.3px) | normal | 誘導リンク。`#1432aa` |
| Body | Noto Sans JP | 16px | 400 | 1.5 (24px) | normal | 本文。長文は 1.6 (25.6px) |
| Nav / Utility | Noto Sans JP | 14px | 400 | 1.2 (16.8px) | normal | グローバルナビ・補助リンク |
| Badge | Noto Sans JP | 12px | 400 | — | normal | ニュース種別バッジ |

> `body` 自体は `font-size: 16px / line-height: 16px`（＝1.0）というリセット値。**行間は各コンポーネントが個別に持つ**ので、`body` の値を本文の行間として引き継いではいけない。

### 3.5 行間・字間

- **本文の行間**: 1.5〜1.6。ニュースなど長文のブロックで 1.6（25.6px / 16px）
- **見出しの行間**: 1.3（見出し）〜1.8（h3 のみ広い）
- **字間**: **全要素 `normal`。`letter-spacing` を一切使っていない**
- 字面の調整は `letter-spacing` ではなく `YakuHanJP` による約物の詰めだけで行う

**ガイドライン**:
- このサイトを再現するときに `letter-spacing: 0.04em` などを足さない。**入れると別のサイトになる**
- 行間はコンポーネント単位で明示する（継承に頼らない）

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 見出しは短く畳んで折り返しを想定しない設計。長い事業名は `<br>` で明示的に折る
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* このサイトは font-feature-settings を使わない */
font-feature-settings: normal;
```

- **`palt` は 0 件**（トップ・下層ともに DOM 全走査で `normal` 以外を返す要素なし）
- 字詰めは `palt` ではなく **`YakuHanJP` という専用フォントを先頭に置く方式**で実現している。`palt` を足すと二重に詰まって崩れる

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

**すべてのボタンが `border-radius: 0`。** 角丸を持つのはカルーセルのドット（`10px` ＝ 実質円形）だけ。

### Buttons

**Primary（青ベタ／右矢印つき）**
- Background: `#1432aa`
- Text: `#ffffff`
- Padding: `12px 48px 12px 16px` ← **右の 48px は矢印アイコンの領域**
- Border Radius: `0`
- Font Size: `14px` / Font Weight: `700`

**Accent（お問合わせ専用）**
- Background: `#e13000`
- Text: `#ffffff`
- Padding: `12px 40px 12px 14px`
- Border Radius: `0`
- Font Size: `14px` / Font Weight: `400`

**Secondary（白地・濃い枠）**
- Background: `#ffffff`
- Text: `#333333`
- Border: `1px solid #666666`
- Padding: `10px 25px 10px 20px`（幅広版は `10px 40px 10px 20px` / `10px 56px 10px 20px`）
- Border Radius: `0`
- Font Size: `16px` / Font Weight: `700`

**Large Nav Card（アイコン付きの大型リンク）**
- Background: `transparent`
- Border: `1px solid #666666`
- Padding: `25px 34px 25px 120px` ← **左の 120px はアイコンの領域**
- Font Size: `16px` / Font Weight: `700`

**Tint Chip（事業領域チップ）**
- Background: `#e6f1fb`
- Text: `#1432aa`
- Padding: `10px 16px`
- Border Radius: `0`
- Font Size: `16px` / Font Weight: `400`

### Badges

- Background: `#5365ac` / Text: `#ffffff`
- Padding: `4px 10px` / Border Radius: `0` / Font Size: `12px`
- ニュース種別（ニュースリリース／研究開発／企業情報）に使う

### Inputs / Select

- Background: `#f9f9f9`
- Border: `1px solid #8c8c8c`
- Border Radius: `0`
- Padding: `12px 36px 12px 12px`（右は矢印領域）
- Font Size: `14px` / Text: `#555555`

### Cards

- Background: `#ffffff`（強調カードは `#e6f1fb`）
- Border: `1px solid #666666`（枠だけで面を作る。影は使わない）
- Border Radius: `0`
- Padding: `20px`〜`25px`

### Carousel

- Dot: `10px` radius（円）／非アクティブ `#787878` ／アクティブ `#1432aa`
- 再生・停止ボタンは `#1432aa` のベタ

---

## 5. Layout Principles

### Spacing Scale

実測から読み取れる刻み。4の倍数を基本にする。

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 10px |
| M | 16px |
| L | 20px |
| XL | 25px |
| XXL | 48px |

### Container

- Max Width: **1200px**
- Padding (horizontal): 16px（モバイル）／ 20px（デスクトップ）

### Grid

- おすすめコンテンツ / ピックアップ: 4カラム
- ニュース一覧: 日付カラム（`#eeeff3` の帯）＋ 本文カラムの2分割
- Gutter: 20px 前後

---

## 6. Depth & Elevation

**このサイトは影を使わない。** DOM 全走査で見つかる `box-shadow` は白のインセット（実質リセット）4件のみ。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | すべての面（既定） |
| — | — | 浮きを表現したいときは**影ではなく `1px solid #666666` の枠**か `#e6f1fb` の面色で区別する |

---

## 7. Do's and Don'ts

### Do（推奨）

- `YakuHanJP` をすべての `font-family` の**先頭**に置く
- 見出しは `秀英角ゴシック金 B JIS2004` を第2優先に置き、`ヒラギノ角ゴ ProN` へフォールバックさせる
- ボタン・カード・入力欄の `border-radius` は `0` にする
- 主要な見出しの文字色は `#1432aa`、本文は `#333333` にする
- ボタンの矢印・アイコン分の余白は `padding` の左右非対称で確保する（`12px 48px 12px 16px`）
- 浮きは影ではなく枠線と面色で表す

### Don't（禁止）

- **`letter-spacing` を足さない。** このサイトは全要素 `normal`
- **`font-feature-settings: "palt"` を使わない。** `YakuHanJP` と競合する
- `#e13000`（オレンジ）を一般的なCTAに広げない。「お問合わせ」1箇所のための色
- `#0000ff` を青として採用しない（画像のみのリンクに残るUA由来の値で、画面には出ない）
- `body` の `line-height: 16px`（＝1.0）を本文の行間として継承しない
- 角丸・ドロップシャドウでカードを浮かせない

---

## 8. Responsive Behavior

### Breakpoints

CSS の `@media` から実測した値。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。グローバルナビはドロワー |
| Tablet | 768px – 1279px | 2カラムまで縮退 |
| Desktop | ≥ 1280px | 4カラムグリッド・max-width 1200px |

補助的に `300px` / `800px` の分岐もある。

### タッチターゲット

- 最小 44px × 44px。`padding: 12px 16px` ＋ 14px の文字で概ね 42–44px になるので、モバイルでは縦 `padding` を 14px に増やす

### フォントサイズの調整

- 見出し 40px → 28px、32px → 24px 程度に縮小
- 本文 16px は据え置き。ナビ 14px も据え置き

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #1432aa
Accent (問合せのみ): #e13000
Badge: #5365ac
Text Color: #333333
Background: #ffffff
Surface: #e6f1fb / #f9f9f9 / #eeeff3
Border: #666666
Font (body): YakuHanJP, "Noto Sans JP", "ヒラギノ角ゴ ProN", メイリオ, sans-serif
Font (heading): YakuHanJP, "秀英角ゴシック金 B JIS2004", "ヒラギノ角ゴ ProN", メイリオ, sans-serif
Body Size: 16px
Line Height: 1.5
Letter Spacing: normal（絶対に足さない）
Border Radius: 0
Shadow: なし
```

### プロンプト例

```
DNP のデザインシステムに従って、ニュース一覧ページを作成してください。
- 見出しは秀英角ゴシック金のスタック、色は #1432aa、32px / 700 / line-height 1.3
- 本文は Noto Sans JP のスタック、色は #333333、16px / 400 / line-height 1.5
- letter-spacing はどこにも入れない（このサイトは全要素 normal）
- font-feature-settings も使わない（YakuHanJP が約物を処理する）
- 種別バッジは #5365ac / 白文字 / 12px / padding 4px 10px / 角丸なし
- 日付カラムの帯は #eeeff3
- 「一覧を見る」は #1432aa のベタ、白文字、14px / 700、padding 12px 48px 12px 16px、角丸なし
- 影は使わず、区切りは 1px solid #666666
- コンテナ幅は 1200px
```
