# DESIGN.md — STUDIO

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 対象: https://studio.design/ja

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: クリーン、モダン、プロフェッショナル。ノーコードWebサイトビルダーとしての信頼感と先進性を両立
- **密度**: ゆったりとしたランディングページ型。余白を活かしたプレゼンテーション志向
- **キーワード**: ミニマル、テック、洗練、高速、ダークテキスト on ホワイト

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **STUDIO Blue** (`#0275fd`): メインのブランドカラー。アクセント、リンク、ハイライトに使用
- **Light Blue BG** (`#eef9ff`): ブルー系の薄い背景色

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文テキスト（ほぼ黒だが純黒ではない）
- **Text Secondary** (`#707070`): 補足テキスト、説明文
- **Text on Dark** (`#f7f7f7`): ダークボタン上のテキスト、CTA文字色
- **Background** (`#ffffff`): ページ背景
- **Surface Light** (`#f7f7f7`): カード背景、セクション背景
- **CTA Surface** (`#222222`): CTAボタンの背景色（ほぼ黒）

### Semantic（意味的な色）

- 実測データなし（LPのため明示的なSemantic色は未確認）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP（Google Fonts、weight 400/500/600/700）
- **特殊**: ゴシックMB101 B JIS2004（モリサワフォント。法人向けラベル等の限定使用）

> **注記**: ゴシックMB101 B はモリサワの有料フォント。STUDIO のデザインツールとしてのブランド力を示すために使用されている。再現時はシステムフォント（ヒラギノ角ゴ ProN 等）で代替可。

### 3.2 欧文フォント

- **サンセリフ**: Inter（Google Fonts、weight 400/500/600）
- **セリフ**: Instrument Serif（CSS変数に定義あり、限定的な使用）
- **等幅**: IBM Plex Mono（Google Fonts、ラベル・バッジに使用）

### 3.3 font-family 指定

```css
/* メイン（欧文優先の和欧混植） */
font-family: Inter, "Noto Sans JP", sans-serif;

/* モリサワ（限定使用） */
font-family: "ゴシックMB101 B JIS2004", "Hiragino Kaku Gothic ProN", sans-serif;

/* モノスペース（ラベル用） */
font-family: "IBM Plex Mono", monospace;

/* セリフ（装飾用） */
font-family: "Instrument Serif", serif;
```

**フォールバックの考え方**:
- Inter を先に指定し、欧文グリフを Inter で描画（Apple 的なアプローチ）
- 和文は Noto Sans JP にフォールバック
- モリサワフォントは環境依存のため、ヒラギノ角ゴ ProN をフォールバックに指定

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero H1 | Inter, Noto Sans JP | 35.04px | 600 | 42.048px (×1.2) | normal | ヒーローコピー |
| Section H2 | Inter, Noto Sans JP | 36px | 600 | 45px (×1.25) | normal | セクション見出し |
| Sub H2 | Inter, Noto Sans JP | 15.04px | 600 | 15.04px | -0.3008px | サブヘッダー |
| H3 Section | Inter, Noto Sans JP | 36px | 600 | 45px (×1.25) | normal | 機能紹介見出し |
| H3 News | Inter, Noto Sans JP | 24px | 600 | 36px (×1.5) | normal | ニュースタイトル |
| H3 Feature | sans-serif | 18.72px | 700 | 18.72px | normal | 機能カード見出し (#333) |
| H4 Company | Inter, Noto Sans JP | 14.08px | 500 | 21.12px | -0.2816px | 会社名ラベル |
| Body | Inter, Noto Sans JP | 15.04px | 400 | 25.568px (×1.7) | normal | 説明文 (#707070) |
| Nav | Inter, Noto Sans JP | 14px | 500 | 14px | -0.28px | ナビゲーション (#222) |
| Header CTA | Inter, Noto Sans JP | 12px | 600 | 16.8px | -0.48px | ヘッダーCTA (#f7f7f7) |
| CTA Label | Inter, Noto Sans JP | 13px | 500 | 15.6px | -0.26px | 「無料ではじめる」(#f7f7f7) |
| Business Label | ゴシックMB101 B | 11px | 500 | — | normal | 法人向けラベル |
| Mono Label | IBM Plex Mono | 11px | 500 | — | -0.44px | 「FOR BUSINESS」等 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.7（15.04px → 25.568px）
- **見出しの行間**: 1.2〜1.25（Hero: ×1.2、Section: ×1.25）
- **ニュースの行間**: 1.5（24px → 36px）
- **本文の字間 (letter-spacing)**: normal（0）
- **見出しの字間**: normal（0）
- **ナビ・ラベルの字間**: 負の letter-spacing を多用（-0.28px 〜 -0.48px）

**ガイドライン**:
- 負の letter-spacing は Apple に似たアプローチ。小さいテキスト（11〜14px）で文字を詰めて密度を上げる
- 見出しは letter-spacing: normal のまま、weight 600（semibold）で存在感を出す
- 本文 line-height: 1.7 は日本語として適切な行間

### 3.6 禁則処理・改行ルール

```css
/* STUDIO LP での設定（実測値に基づく推定） */
word-break: break-all;
overflow-wrap: break-word;
```

**特記**: 明示的な禁則処理設定は未確認。デフォルトのブラウザ挙動に依存している可能性が高い。

### 3.7 OpenType 機能

```css
/* palt は使用していない */
font-feature-settings: normal;
```

- **palt**: 不使用。見出しでも字詰めは行わない
- **kern**: Inter のデフォルトカーニングに依存
- STUDIO は palt なしでクリーンな見た目を実現している

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary CTA（ピル型）**
- Background: `#222222`
- Text: `#f7f7f7`
- Padding: 約 10px 24px
- Border Radius: 500px（完全なピル型）
- Font Size: 13px
- Font Weight: 500
- Letter Spacing: -0.26px

**Header CTA（小型）**
- Background: `#222222`
- Text: `#f7f7f7`
- Padding: 約 6px 16px
- Border Radius: 500px（ピル型）
- Font Size: 12px
- Font Weight: 600
- Letter Spacing: -0.48px

**Secondary / Outline**
- Background: `transparent`
- Text: `#222222`
- Border: 1px solid `#222222`
- Border Radius: 4px（角丸小）

> **ボタン radius の使い分け**: CTAボタンは radius: 500px のピル型、補助的なボタンは radius: 4px の控えめな角丸。この対比がSTUDIOのデザインの特徴。

### Cards

- Background: `#ffffff`
- Border: なし（影で浮かせる場合あり）
- Border Radius: 8〜12px（推定）
- Padding: 24〜32px

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 48px |
| XXL | 80px |

### Container

- Max Width: 1200px（推定）
- Padding (horizontal): 32px

### Grid

- セクションごとにフルワイド背景 + 中央寄せコンテンツの構成

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素、ボタン |
| 1 | `0 2px 8px rgba(0,0,0,0.08)` | カード（推定） |
| 2 | `0 4px 16px rgba(0,0,0,0.12)` | ホバー時のカード（推定） |

> **注記**: STUDIO LP はフラットデザインが基調。影の使用は控えめ。

---

## 7. Do's and Don'ts

### Do（推奨）

- font-family は `Inter, "Noto Sans JP", sans-serif` の順で指定する（欧文優先）
- 見出しの weight は 600（semibold）を基本にする
- 小さいテキスト（11〜14px）には負の letter-spacing を適用する
- CTAボタンは radius: 500px のピル型にする
- テキスト色は `#222222` を使い、純黒 `#000000` は避ける
- ブランドカラー `#0275fd` はアクセントとして控えめに使用する

### Don't（禁止）

- `font-feature-settings: "palt"` を適用しない（STUDIO は palt 不使用）
- 見出しに weight 700（bold）を使わない（600 = semibold が基本）
- CTAボタンの radius を 4px にしない（ピル型でないと STUDIO らしくない）
- ブランドブルー `#0275fd` をCTAボタンの背景にしない（CTAは `#222222`）
- テキスト色に `#000000` を使わない（`#222222` を使用）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | モバイルレイアウト |
| Tablet | ≤ 1024px | タブレットレイアウト |
| Desktop | > 1024px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは見出しをデスクトップの 70〜80% 程度に縮小
- 本文は 14〜16px を維持

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #0275fd (STUDIO Blue — アクセント用)
CTA Color: #222222 (ボタン背景)
Text Color: #222222
Text Secondary: #707070
Background: #ffffff
Surface: #f7f7f7
Font: Inter, "Noto Sans JP", sans-serif
Mono: "IBM Plex Mono", monospace
Body Size: 15px
Line Height: 1.7
Heading Weight: 600
Letter Spacing (small text): -0.28px
Button Radius (CTA): 500px
Button Radius (secondary): 4px
```

### プロンプト例

```
このサービスのデザインシステムに従って、機能紹介セクションを作成してください。
- フォント: Inter, "Noto Sans JP", sans-serif
- 見出し: 36px / weight 600 / line-height 1.25
- 本文: 15px / weight 400 / line-height 1.7 / color #707070
- CTAボタン: bg #222222, color #f7f7f7, radius 500px, font-size 13px, weight 500
- アクセント: #0275fd（リンクやハイライトに限定使用）
- ナビテキスト: 14px / weight 500 / letter-spacing -0.28px / color #222
- palt は使用しない
```

### 特記事項

- **モリサワフォント**: `ゴシックMB101 B JIS2004` は法人向けラベル等で限定使用。再現時は `"Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif` で代替
- **IBM Plex Mono**: `FOR BUSINESS` 等の英字ラベルに使用。等幅フォントでテクニカルな印象を付与
- **Instrument Serif**: CSS変数に定義があるが、LP上での使用箇所は限定的
- **負の letter-spacing**: 小さいテキストで文字を詰める Apple 的アプローチが特徴
