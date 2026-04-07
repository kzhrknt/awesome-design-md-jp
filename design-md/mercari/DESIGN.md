# DESIGN.md — メルカリ (mercari.com/jp)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: クリーン、ミニマル、白背景ベースの実用志向UI
- **密度**: 商品一覧のグリッド表示は情報密度が高いが、余白は十分に確保
- **キーワード**: シンプル、信頼感、ホワイトスペース、メルカリレッド、機能的

**特記事項**:
- CSSフレームワークに Panda CSS を採用（`--made-with-panda: "🐼"`）
- 全体の line-height が ×1.4 で統一されており、日本語サイトとしてはタイト
- body font-size が 15px（一般的な 16px ではない）
- 見出しの色が `#666666` でメイン `#333333` より薄い珍しいパターン

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Mercari Red** (`#ff333f`): メインのブランドカラー。CTAボタン、アクティブタブに使用
- **Primary (rgb)**: `rgb(255, 51, 63)`

### Semantic（意味的な色）

- **Link** (`#0073cc`): テキストリンク。`rgb(0, 115, 204)`

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文テキスト、フッターテキスト
- **Text Secondary** (`#666666`): 見出し（h2）、非アクティブタブ、補足テキスト
- **Background** (`#ffffff`): ページ背景
- **Button Secondary Text** (`#333333`): ログインボタン等のテキスト
- **Button Secondary BG** (`#ffffff`): ログインボタン等の背景

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: "Hiragino Kaku Gothic ProN Custom", "Hiragino Sans Custom", "Meiryo Custom"
- 「Custom」サフィックス付きの独自 @font-face 定義。フォントメトリクス（ascent/descent 等）を調整している可能性がある

### 3.2 欧文フォント

- **サンセリフ**: "Helvetica Neue", Arial

### 3.3 font-family 指定

```css
/* 本文（実測値） */
font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN Custom", "Hiragino Sans Custom", "Meiryo Custom", sans-serif;
```

**フォールバックの考え方**:
- 欧文フォント（Helvetica Neue, Arial）を先に指定 — 欧文グリフの表示品質を優先
- 和文フォントに「Custom」サフィックス付きの独自定義を使用
- macOS: Hiragino Kaku Gothic ProN Custom → Hiragino Sans Custom
- Windows: Meiryo Custom
- 最後に generic family（sans-serif）を指定

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading 2 | 本文と同じ | 20px | 700 | 28px (×1.4) | normal | 「おすすめの商品」「人気のブランド」。色 #666666 |
| Heading 3 | 本文と同じ | 17px | 700 | 23.8px (×1.4) | normal | 「掘り出しもの」。色 #333333 |
| Body | 本文と同じ | 15px | 400 | 21px (×1.4) | normal | メインの本文テキスト。色 #333333 |
| Footer | 本文と同じ | 15px | 700 | 21px | normal | フッター内テキスト。色 #333333 |
| Link | 本文と同じ | 15px | 400 | — | normal | リンクテキスト。色 #0073cc |
| CTA Button | 本文と同じ | 14px | 700 | — | normal | 「出品」ボタン。色 #fff / bg #ff333f |
| Login Button | 本文と同じ | 14px | 400 | — | normal | 「ログイン」ボタン。色 #333 / bg #fff |
| Tab (active) | 本文と同じ | 14px | 700 | — | normal | 「おすすめ」タブ。色 #ff333f |
| Tab (inactive) | 本文と同じ | 14px | 700 | — | normal | 「マイリスト」タブ。色 #666 |
| Input | 本文と同じ | 16px | 400 | 22.4px | normal | 検索入力欄。色 #333 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: ×1.4（21px / 15px）。日本語サイトとしてはタイト寄り
- **見出しの行間**: ×1.4（全要素で統一）
- **本文の字間 (letter-spacing)**: normal（すべての要素で統一）
- **見出しの字間**: normal

**ガイドライン**:
- 全体で line-height ×1.4 に統一。セクションごとの差異なし
- letter-spacing は全要素で normal。日本語の字間調整は行っていない

### 3.6 禁則処理・改行ルール

```css
/* 実測値に基づく推定。一般的なウェブデフォルト */
word-break: normal;
overflow-wrap: break-word;
```

### 3.7 OpenType 機能

```css
/* palt は使用していない */
font-feature-settings: normal;
```

- **palt**: 未使用。プロポーショナル字詰めは適用されていない
- **kern**: デフォルトのカーニング

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary (CTA — 出品)**
- Background: `#ff333f`
- Text: `#ffffff`
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 700

**Secondary (ログイン)**
- Background: `#ffffff`
- Text: `#333333`
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 400

### Tabs

**Active**
- Background: `#ffffff`
- Text: `#ff333f`
- Font Size: 14px
- Font Weight: 700

**Inactive**
- Background: `#ffffff`
- Text: `#666666`
- Font Size: 14px
- Font Weight: 700

### Inputs

- Background: `#ffffff`
- Border Radius: 0px（角丸なし）
- Font Size: 16px
- Font Weight: 400
- Line Height: 22.4px
- Text Color: `#333333`

---

## 5. Layout Principles

### CSS Custom Properties（実測値）

| Token | Value | 用途 |
|-------|-------|------|
| --grid-layout-gutter | 24px | グリッド間の余白 |
| --grid-layout-inset | 16px | グリッド内側の余白 |
| --grid-layout-page-padding-top | 40px | ページ上部パディング |
| --grid-layout-page-padding-bottom | 64px | ページ下部パディング |
| --grid-layout-page-padding-horizontal | 36px | ページ左右パディング |

### Grid

- Gutter: 24px（`--grid-layout-gutter`）
- Inset: 16px（`--grid-layout-inset`）

---

## 6. Depth & Elevation

### z-index 階層（CSS Custom Properties 実測値）

| Token | Value | 用途 |
|-------|-------|------|
| --mer-z-index-menu | 1100 | メニュー |
| --mer-z-index-navigation | 1200 | ナビゲーション |
| --mer-z-index-modal | 1400 | モーダル |
| --mer-z-index-snackbar | 1500 | スナックバー通知 |
| --mer-z-index-tooltip | 1600 | ツールチップ |

---

## 7. Do's and Don'ts

### Do（推奨）

- ブランドカラー `#ff333f` はCTAとアクティブ状態にのみ使用する
- body の font-size は 15px を守る（16px にしない）
- line-height は ×1.4 で統一する
- フォント指定の「Custom」サフィックスを維持する
- ボタンの角丸は 4px に統一する
- 見出しには `#666666` を使用し、本文 `#333333` と差をつける

### Don't（禁止）

- `#ff333f` を背景色やテキスト色として多用しない（CTA・アクティブ状態専用）
- letter-spacing を追加しない（全要素で normal が統一ルール）
- palt を適用しない（サイト全体で未使用）
- line-height を ×1.4 以外に変えない（統一感が崩れる）
- 見出しに `#333333` を使わない（見出しは `#666666` のパターン。h3 の一部は `#333333`）

---

## 8. Responsive Behavior

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準）

### フォントサイズの調整

- 入力欄は 16px を維持（iOS のズーム防止）
- 本文は 15px を基準とし、モバイルでも変更しない方針

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #ff333f (Mercari Red)
Link Color: #0073cc
Text Color: #333333
Text Secondary: #666666
Background: #ffffff
Font: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN Custom", "Hiragino Sans Custom", "Meiryo Custom", sans-serif
Body Size: 15px
Line Height: 1.4
Letter Spacing: normal
palt: なし
CSS Framework: Panda CSS
```

### プロンプト例

```
メルカリのデザインシステムに従って、商品一覧ページを作成してください。
- プライマリカラー（CTAのみ）: #ff333f
- リンク色: #0073cc
- フォント: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN Custom", "Hiragino Sans Custom", "Meiryo Custom", sans-serif
- 本文: 15px / 400 / line-height: 1.4 / color: #333333
- 見出し: 20px / 700 / line-height: 1.4 / color: #666666
- グリッド余白: 24px
- ボタン角丸: 4px
- letter-spacing: normal（全要素）
- palt: 使用しない
```
