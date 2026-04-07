# DESIGN.md — Qiita

> Qiita（https://qiita.com/）のデザイン仕様書。
> 実サイトの computed style に基づく。開発者コミュニティとしてコードブロックとの混植を重視。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 技術記事に特化した読みやすいデザイン。コードと日本語テキストの混植を前提とした組版
- **密度**: 本文は line-height: 1.8 のゆったりとした行間。情報密度の高いフィード画面と、読みやすさ重視の記事画面が共存
- **キーワード**: テクニカル、クリーン、読みやすい、コードフレンドリー、開発者向け
- **特徴**: YakuHanJPs（約物半角化フォント）を font-family の先頭に配置。約物（括弧・句読点）を半角幅で描画し、和文組版の詰まりを軽減。テキスト色は `rgba(0,0,0,0.87)` で Material Design 的な opacity ベースのカラーリング

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Qiita Green** (`#55c500`): メインのブランドカラー。CTAボタン、リンク、アクセント等に使用
- **Qiita Green Dark** (`#468c00`): ホバー・プレス時のプライマリカラー（推定）

### Semantic（意味的な色）

- **Danger** (`#d32f2f`): エラー、削除、危険な操作
- **Warning** (`#f57c00`): 警告、注意喚起
- **Success** (`#388e3c`): 成功、完了

### Neutral（ニュートラル）

- **Text Primary** (`rgba(0,0,0,0.87)`): 本文テキスト（opacity ベース）
- **Text Secondary** (`rgba(0,0,0,0.54)`): 補足テキスト、ラベル
- **Text Disabled** (`rgba(0,0,0,0.38)`): 無効状態のテキスト
- **Border** (`#e0e0e0`): 区切り線、入力欄の枠
- **Background** (`#f5f6f6`): ページ背景（薄いグレー）
- **Surface** (`#ffffff`): カード、モーダル等の面

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: YakuHanJPs（約物半角化）, Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo

### 3.2 欧文フォント

- **サンセリフ**: -apple-system, system-ui, Segoe UI
- **等幅**: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace

### 3.3 font-family 指定

```css
/* 本文 — YakuHanJPs が先頭（Qiita独自の特徴） */
font-family: YakuHanJPs, -apple-system, "system-ui", "Segoe UI",
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;

/* 等幅（コードブロック） */
font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
```

**フォールバックの考え方**:
- YakuHanJPs は約物（括弧・句読点など）のみを半角幅グリフで上書きするWebフォント
- YakuHanJPs に含まれない文字は次のフォント（system-ui 等）にフォールバックする
- 結果として、約物だけ半角、その他の和文・欧文はシステムフォントで描画される

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading 2 (CTA) | YakuHanJPs + system | 20px | 600 | 28px (×1.4) | normal | 「Qiitaにログインして…」等 |
| Heading 2 (記事) | YakuHanJPs + system | 16px | 400 | 28.8px (×1.8) | normal | 記事タイトル |
| Heading 3 | YakuHanJPs + system | 14px | 600 | 25.2px (×1.8) | normal | セクション小見出し |
| Body | YakuHanJPs + system | 16px | 400 | 28.8px (×1.8) | normal | 本文 |
| Label | YakuHanJPs + system | 14px | 600 | 21px (×1.5) | normal | 「タグランキング」等 |
| Code | monospace | 14px | 400 | 1.5 | normal | コードブロック内 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.8（日本語本文にゆったりとした行間）
- **見出しの行間**: 1.4〜1.8
- **本文の字間 (letter-spacing)**: normal
- **見出しの字間**: normal

**ガイドライン**:
- Qiita は letter-spacing を付加せず、YakuHanJPs による約物半角化で自然な字詰めを実現
- line-height: 1.8 は技術記事の可読性に最適化された値

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》」】、。，．・：；？！`
- 行末禁止: `（「『【〔〈《「【`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使用していない */
```

- Qiita は palt を使用せず、YakuHanJPs で約物の詰めを実現している
- これにより、palt 非対応フォントでも一貫した約物半角化が可能

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#55c500`
- Text: `#ffffff`
- Padding: 8px 16px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 600

**Secondary**
- Background: `transparent`
- Text: `#55c500`
- Border: 1px solid `#55c500`
- Padding: 8px 16px
- Border Radius: 4px

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#e0e0e0`
- Border (focus): 1px solid `#55c500`
- Border Radius: 4px
- Padding: 8px 12px
- Font Size: 14px
- Height: 40px

### Cards

- Background: `#ffffff`
- Border: 1px solid `#e0e0e0`
- Border Radius: 4px
- Padding: 16px
- Shadow: none（フラットデザイン）

### Code Blocks

- Background: `#364549`（ダーク系）
- Text: `#e3e3e3`
- Font Family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace
- Font Size: 14px
- Line Height: 1.5
- Padding: 16px
- Border Radius: 4px
- Overflow: auto

### Inline Code

- Background: `#f0f0f0`
- Text: `rgba(0,0,0,0.87)`
- Font Family: （等幅フォントスタック）
- Padding: 2px 6px
- Border Radius: 3px

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

- Max Width: 1100px
- Padding (horizontal): 16px

### Grid

- Columns: 1〜2（メインコンテンツ + サイドバー）
- Gutter: 24px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素（基本がフラット） |
| 1 | `0 2px 4px rgba(0,0,0,0.1)` | ホバー時のカード |
| 2 | `0 4px 8px rgba(0,0,0,0.1)` | ドロップダウン |

Qiita はフラットデザインが基調。影は控えめに使用される。

---

## 7. Do's and Don'ts

### Do（推奨）

- font-family の先頭に YakuHanJPs を指定する（約物半角化のため）
- 本文の line-height は 1.8 にする
- テキスト色は `rgba(0,0,0,0.87)` を使用する（opacity ベース）
- コードブロックと本文の書体を明確に区別する
- 背景色には `#f5f6f6` を使用する

### Don't（禁止）

- テキスト色に純粋な `#000000` を使わない（Qiita は rgba opacity ベース）
- 本文に palt を適用しない（YakuHanJPs で約物を処理しているため二重適用になる）
- コードブロックにプロポーショナルフォントを使わない
- YakuHanJPs を省略しない（約物が全角幅になり、Qiita らしさが失われる）
- 行間を 1.5 未満にしない（技術記事の可読性が低下する）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | モバイルレイアウト |
| Tablet | ≤ 1023px | タブレットレイアウト |
| Desktop | > 1023px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは本文 14–16px、見出しはデスクトップの 80% 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #55c500
Text Color: rgba(0,0,0,0.87)
Background: #f5f6f6
Surface: #ffffff
Font: YakuHanJPs, -apple-system, "system-ui", "Segoe UI", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
Code Font: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace
Body Size: 16px
Line Height: 1.8
Heading Weight: 600
```

### プロンプト例

```
Qiita のデザインシステムに従って、技術記事のプレビューカードを作成してください。
- プライマリカラー: #55c500（Qiita Green）
- フォント: YakuHanJPs を先頭に含む font-family を使用
- テキスト色: rgba(0,0,0,0.87)
- 行間: 本文は line-height: 1.8 を使用
- 背景: #f5f6f6
- カード面: #ffffff
- コードブロック: ダーク背景（#364549）+ 等幅フォント
- 約物（括弧・句読点）は YakuHanJPs により半角幅で描画される
```
