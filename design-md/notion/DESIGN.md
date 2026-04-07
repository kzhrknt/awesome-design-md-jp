# DESIGN.md — Notion 日本語版

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 抽出元: https://www.notion.so/ja

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: ミニマル、ツールライク、ダーク基調のランディングページ。プロダクト全体はライト／ダーク切替対応だが、日本語版トップは `#191918` のダーク背景を使用
- **密度**: 中程度。ランディングページは余白を広くとり、アプリ内は情報密度が高い
- **キーワード**: ミニマル、プロフェッショナル、モノクロ、ダーク、ドキュメント指向

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Primary** (`#000000`): Notion のブランドはモノクロ。CTA ボタン背景に白 `#FFFFFF` をダーク上で使用
- **Accent** (`#2383E2`): リンクやインラインハイライトに使われるブルー

### Semantic（意味的な色）

- **Danger** (`#EB5757`): エラー、削除、危険な操作
- **Warning** (`#F2C94C`): 警告、注意喚起
- **Success** (`#6FCF97`): 成功、完了

### Neutral（ニュートラル）

- **Text Primary** (`rgba(255,255,255,0.95)`): ダーク背景上の本文テキスト（≒ `#F2F2F2`）
- **Text Primary (Light)** (`rgba(0,0,0,0.95)`): ライト背景上の本文テキスト
- **Text Secondary** (`rgba(255,255,255,0.6)`): ダーク背景上の補足テキスト
- **Text Disabled** (`rgba(255,255,255,0.3)`): 無効状態のテキスト
- **Border** (`rgba(255,255,255,0.13)`): ダーク背景上の区切り線
- **Background** (`#191918`): ダーク系ページ背景（ランディングページ）
- **Background (Light)** (`#FFFFFF`): ライトモードのページ背景
- **Surface** (`#2F2F2F`): ダーク上のカード、サイドバー等の面

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: システムフォントに依存（-apple-system, "Segoe UI", Helvetica, Arial 経由で OS 標準和文ゴシックが適用される）

### 3.2 欧文フォント

- **サンセリフ**: NotionInter（Inter のカスタムビルド）を最優先で使用
- **等幅**: SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace（アプリ内コードブロック）

### 3.3 font-family 指定

```css
/* 本文（実測値） */
font-family: NotionInter, Inter, -apple-system, "system-ui", "Segoe UI",
  Helvetica, "Apple Color Emoji", Arial, sans-serif;

/* 等幅（アプリ内コードブロック） */
font-family: SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
```

**フォールバックの考え方**:
- NotionInter（カスタム Inter）を最優先に配置し、欧文の品質を確保
- 和文フォントは明示的に指定せず、OS のシステムフォントスタックに委ねている
- `"Apple Color Emoji"` を含めて絵文字表示に対応

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | NotionInter | 64px | 700 | 64px (1.0) | normal | ランディングページ大見出し |
| Heading 1 | NotionInter | 54px | 700 | 56px (≈1.04) | normal | セクション見出し |
| Heading 2 | NotionInter | 22px | 700 | 28px (≈1.27) | normal | サブ見出し |
| Body | NotionInter | 16px | 400 | 24px (1.5) | normal | 本文 |
| Caption | NotionInter | 14px | 400 | 20px (≈1.43) | normal | 補足、注釈 |
| Small | NotionInter | 12px | 400 | 16px (≈1.33) | normal | 最小テキスト |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 24px（1.5）
- **見出しの行間**: Display は 1.0（タイト）、H1 は 1.04、H2 は 1.27
- **本文の字間 (letter-spacing)**: normal（0）
- **見出しの字間**: normal（0）

**ガイドライン**:
- Notion は letter-spacing を明示的に広げていない。代わりに font-feature-settings で数字の lining figures を有効化
- 行間は本文 1.5 で標準的。大見出しは line-height: 1.0 でタイトに詰めている

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
word-break: break-word;
overflow-wrap: break-word;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》」】、。，．・：；？！`
- 行末禁止: `（「『【〔〈《「【`

### 3.7 OpenType 機能

```css
font-feature-settings: "lnum", "locl" 0;
```

- **lnum**: Lining Figures — 数字をベースラインに揃えた等高の形にする。表やデータ表示で数字が揃う
- **locl 0**: ローカライズ形式を無効化 — Inter のデフォルトのグリフ形状を維持

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary（ダーク背景上の白ボタン）**
- Background: `#FFFFFF`
- Text: `#191918`
- Padding: 8px 16px
- Border Radius: 8px
- Font Size: 16px
- Font Weight: 500

**Secondary（ゴースト / アウトライン）**
- Background: `transparent`
- Text: `rgba(255,255,255,0.95)`
- Border: 1px solid `rgba(255,255,255,0.2)`
- Padding: 8px 16px
- Border Radius: 8px

### Inputs

- Background: `#2F2F2F`（ダーク） / `#FFFFFF`（ライト）
- Border: 1px solid `rgba(255,255,255,0.13)`
- Border (focus): 1px solid `#2383E2`
- Border Radius: 6px
- Padding: 6px 10px
- Font Size: 16px
- Height: 36px

### Cards

- Background: `#2F2F2F`（ダーク） / `#FFFFFF`（ライト）
- Border: 1px solid `rgba(255,255,255,0.08)`
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 2px 8px rgba(0,0,0,0.2)

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 32px |
| XXL | 64px |

### Container

- Max Width: 1200px
- Padding (horizontal): 32px

### Grid

- Columns: 可変（コンテンツに応じた自動レイアウト）
- Gutter: 24px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 1px 3px rgba(0,0,0,0.1)` | カード、リスト項目 |
| 2 | `0 4px 12px rgba(0,0,0,0.15)` | ドロップダウン、ポップオーバー |
| 3 | `0 8px 24px rgba(0,0,0,0.2)` | モーダル、ダイアログ |

---

## 7. Do's and Don'ts

### Do（推奨）

- NotionInter / Inter を最優先で指定し、OS のシステムフォントをフォールバックに含める
- ダーク背景には `#191918` を使い、純粋な `#000000` は避ける
- 数字表示には `font-feature-settings: "lnum"` を常に有効にする
- テキストカラーには `rgba()` を使い、透明度で階層を表現する
- 日本語本文は line-height: 1.5 以上を確保する

### Don't（禁止）

- `font-family` に和文フォントだけを指定しない（NotionInter → システムフォントの順序を守る）
- ダーク背景上に低コントラストのテキスト (`rgba(255,255,255,0.2)` 以下) を本文に使わない
- 見出しの line-height を本文と同じ 1.5 にしない（大見出しは 1.0〜1.1 でタイトに）
- `letter-spacing` を大きく広げない（Notion は normal を基本としている）

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

- モバイルでは Display を 36〜40px、H1 を 32px 程度に縮小
- 本文はモバイルでも 16px を維持

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #FFFFFF（ダーク上CTA）/ #000000（ライト上CTA）
Text Color: rgba(255,255,255,0.95)（ダーク）/ rgba(0,0,0,0.95)（ライト）
Background: #191918（ダーク）/ #FFFFFF（ライト）
Font: NotionInter, Inter, -apple-system, "system-ui", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif
Body Size: 16px
Line Height: 1.5
font-feature-settings: "lnum", "locl" 0
```

### プロンプト例

```
Notion 日本語版のデザインシステムに従って、タスク一覧ページを作成してください。
- 背景: #191918（ダーク基調）
- フォント: NotionInter, Inter, -apple-system, sans-serif
- 本文: 16px / line-height: 1.5 / color: rgba(255,255,255,0.95)
- 見出し: 22px / 700 / line-height: 28px
- font-feature-settings: "lnum", "locl" 0
- ボタン: 白背景 #FFFFFF、テキスト #191918、角丸 8px
- ボーダー: rgba(255,255,255,0.13)
```

### CSS 変数体系（抜粋）

Notion は 408 件以上の CSS Custom Properties を使用した独自のトークン体系を持つ。主要なものを以下に列挙:

```css
/* 主要トークン（推定カテゴリ） */
--notion-font-family: NotionInter, Inter, ...;
--notion-font-size: 16px;
--notion-line-height: 24px;
--notion-text-color: rgba(0,0,0,0.95);  /* ライトモード */
--notion-bg-color: #FFFFFF;             /* ライトモード */
```

> 注: 408 件の CSS vars はアプリケーション内部で動的に管理されており、全量の公開ドキュメントは存在しない。上記は実測に基づく代表値。
