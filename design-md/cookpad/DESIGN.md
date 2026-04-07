# DESIGN.md — クックパッド (cookpad.com)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 温かみのある家庭的なデザイン。料理と暮らしに寄り添う親しみやすさ
- **密度**: UGCメディア型。レシピカードの一覧と詳細を行き来する構成
- **キーワード**: 温かみ、家庭的、親しみやすい、実用的、UGC
- **カテゴリ**: レシピ / UGC

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Cookpad Orange** (`#f28c06`): クックパッドのブランドオレンジ。CTAボタン、ロゴに使用
- **Cookpad Orange Dark** (`#d97a00`): ホバー・プレス時のオレンジ

### Semantic（意味的な色）

- **Danger** (`#e53935`): エラー、削除、危険な操作
- **Warning** (`#f9a825`): 警告、注意喚起
- **Success** (`#43a047`): 成功、完了

### Neutral（ニュートラル）

- **Text Primary** (`#0f0f0f`): 本文テキスト。ほぼ黒
- **Text Secondary** (`#757575`): 補足テキスト、ラベル
- **Text Disabled** (`#bdbdbd`): 無効状態のテキスト
- **Border** (`#e0e0e0`): 区切り線、入力欄の枠
- **Background** (`#f8f6f2`): ページ背景。温かみのあるオフホワイト
- **Surface** (`#fff`): カード、モーダル等の面

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: noto-sans（Adobe Fonts 版 Noto Sans）
- **明朝体**: 使用なし

### 3.2 欧文フォント

- **サンセリフ**: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial
- **セリフ**: 使用なし
- **等幅**: 未定義

### 3.3 font-family 指定

```css
/* 本文（Adobe Fonts の noto-sans を先頭に指定） */
font-family: noto-sans, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, arial, sans-serif;
```

**フォールバックの考え方**:
- Adobe Fonts の noto-sans を最優先で指定
- system-ui, -apple-system でOS標準ゴシックにフォールバック
- Segoe UI（Windows）、Roboto（Android）、Helvetica/Arial で広範なカバー
- 最後に generic family（sans-serif）を指定

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading 1 | noto-sans | 18px | 600 | 28px (×1.556) | -0.4px | セクション見出し「人気の食材」等 |
| Heading 2 | noto-sans | 16px | 600 | 24px (×1.5) | -0.4px | サブ見出し「殿堂入りレシピ」等 |
| Body | noto-sans | 16px | 400 | 24px (×1.5) | -0.4px | 本文 |
| Label | noto-sans | 14px | 600 | 20px (×1.429) | -0.4px | ラベル、ナビゲーション項目 |
| Caption | noto-sans | 12px | 400 | 16px (×1.333) | -0.4px | 補足、注釈、投稿日時 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.5（24px / 16px）
- **見出しの行間**: 1.5〜1.556
- **本文の字間 (letter-spacing)**: -0.4px（負の値。詰める方向）
- **見出しの字間**: -0.4px

**ガイドライン**:
- 全体的に letter-spacing: -0.4px を適用（詰める方向）
- 日本語本文の line-height は 1.5 を維持
- 見出しの weight は 600（semibold）で統一

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》」】、。，．・：；？！`
- 行末禁止: `（「『【〔〈《「【`

### 3.7 OpenType 機能

```css
font-feature-settings: "liga";  /* 合字（リガチャ） */
```

- **liga**: 合字（リガチャ）を有効化。fi, fl 等の欧文合字
- **palt**: 使用なし（本文・見出しともにプロポーショナル字詰めは未適用）
- **kern**: 未定義

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#f28c06`
- Text: `#fff`
- Padding: 8px 24px
- Border Radius: 8px
- Font Size: 14px
- Font Weight: 600

**Secondary**
- Background: `transparent`
- Text: `#0f0f0f`
- Border: 1px solid `#e0e0e0`
- Padding: 8px 24px
- Border Radius: 8px

### Inputs

- Background: `#fff`
- Border: 1px solid `#e0e0e0`
- Border (focus): 1px solid `#f28c06`
- Border Radius: 8px
- Padding: 8px 12px
- Font Size: 16px
- Height: 40px

### Cards

- Background: `#fff`
- Border: 1px solid `#e0e0e0`
- Border Radius: 12px
- Padding: 16px
- Shadow: `0 1px 3px rgba(0,0,0,0.08)`

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
| XXL | 48px |

### Container

- Max Width: 1080px
- Padding (horizontal): 16px

### Grid

- Columns: レシピ一覧は 2〜4列（レスポンシブ）
- Gutter: 16px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 1px 3px rgba(0,0,0,0.08)` | レシピカード |
| 2 | `0 4px 8px rgba(0,0,0,0.1)` | ドロップダウン、ポップオーバー |
| 3 | `0 8px 24px rgba(0,0,0,0.15)` | モーダル、ダイアログ |

---

## 7. Do's and Don'ts

### Do（推奨）

- font-family は noto-sans を先頭に、system-ui フォールバックチェーンを指定する
- letter-spacing: -0.4px を全体に適用する（クックパッドの詰め組み）
- 背景色は #f8f6f2（温かみのあるオフホワイト）を使用する
- 見出しの weight は 600（semibold）で統一する
- font-feature-settings: "liga" を適用する

### Don't（禁止）

- 背景に純白 #ffffff を使わない（温かみが失われる）
- テキスト色に純粋な #000000 を使わない（#0f0f0f を使用）
- letter-spacing を 0 や正の値にしない（サイト全体が -0.4px で統一されている）
- 見出しに font-weight: 700 (bold) を使わない（600 semibold が正しい）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | モバイルレイアウト |
| Tablet | ≤ 1023px | タブレットレイアウト |
| Desktop | > 1024px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは本文 14〜16px、見出しはデスクトップの 80% 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #f28c06
Text Color: #0f0f0f
Background: #f8f6f2
Font: noto-sans, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, arial, sans-serif
Body Size: 16px
Line Height: 1.5
Letter Spacing: -0.4px
Font Feature: "liga"
Heading Weight: 600
```

### プロンプト例

```
クックパッドのデザインシステムに従って、レシピ一覧カードを作成してください。
- プライマリカラー: #f28c06（オレンジ）
- 背景色: #f8f6f2（温かみのあるオフホワイト）
- フォント: noto-sans, system-ui 系フォールバック
- 行間: line-height: 1.5
- 字間: letter-spacing: -0.4px
- 見出し: 600 (semibold)
- カード背景: #fff、border-radius: 12px
- font-feature-settings: "liga"
```
