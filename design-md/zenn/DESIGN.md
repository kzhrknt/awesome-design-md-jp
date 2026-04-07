# DESIGN.md — Zenn

> Zenn（https://zenn.dev/）のデザイン仕様書。
> 実サイトの computed style に基づく。技術記事プラットフォームとして Qiita と並ぶ存在。ブランドカラー「Zennブルー」#3ea8ff が特徴。CSS Custom Properties は未使用。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: クリーンで余白を活かしたモダンなデザイン。技術記事の読みやすさを重視しつつ、Qiita よりもシンプルで洗練された印象
- **密度**: 本文 line-height: 1.8 のゆったりとした行間。記事ページは読書体験を最優先にしたレイアウト
- **キーワード**: クリーン、モダン、テクニカル、読みやすい、ブルーアクセント
- **特徴**: テキスト色に `rgba(0,0,0,0.82)` を使用（Qiita の 0.87 よりわずかに薄い）。CSS Custom Properties は未使用で、直接的な値指定。palt は normal（適用なし）。Qiita の対抗サービスとして、よりシンプルな構成を志向

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Zenn Blue** (`#3ea8ff`): メインのブランドカラー。CTAボタン、リンク、アクセント等に使用
- **Zenn Blue Dark** (`#0f83fd`): ホバー・プレス時のプライマリカラー（推定）

### Semantic（意味的な色）

- **Danger** (`#f43f5e`): エラー、削除、危険な操作
- **Warning** (`#f59e0b`): 警告、注意喚起
- **Success** (`#10b981`): 成功、完了

### Neutral（ニュートラル）

- **Text Primary** (`rgba(0,0,0,0.82)`): 本文テキスト（opacity ベース）
- **Text Secondary** (`rgba(0,0,0,0.55)`): 補足テキスト、ラベル
- **Text Disabled** (`rgba(0,0,0,0.36)`): 無効状態のテキスト
- **Border** (`#d6e3ed`): 区切り線、入力欄の枠
- **Background** (`#ffffff`): ページ背景
- **Surface** (`#f1f5f9`): カード背景、セクション背景

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Hiragino Kaku Gothic ProN, Hiragino Sans, Meiryo

### 3.2 欧文フォント

- **サンセリフ**: -apple-system, system-ui
- **等幅**: SFMono-Regular, Consolas, Menlo, monospace

### 3.3 font-family 指定

```css
/* 本文 */
font-family: -apple-system, "system-ui", "Hiragino Kaku Gothic ProN",
  "Hiragino Sans", Meiryo, sans-serif;

/* 等幅（コードブロック） */
font-family: SFMono-Regular, Consolas, Menlo, monospace;
```

**フォールバックの考え方**:
- システムフォント（-apple-system, system-ui）を先頭に配置
- 和文フォント（ヒラギノ角ゴ ProN, ヒラギノ角ゴシック）でカバー
- Qiita と異なり YakuHanJPs（約物半角化フォント）は未使用
- 約物は全角幅のまま表示される

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (h3) | system | 38.4px | 700 | 57.6px (×1.5) | normal | "Tech" 等のセクション大見出し |
| Heading 2 (記事) | system | 16.8px | 700 | 25.2px (×1.5) | normal | 記事タイトル |
| Heading 2 (UI) | system | 16px | 700 | 24px (×1.5) | normal | UI上の見出し |
| Body | system | 16px | 400 | 28.8px (×1.8) | normal | 本文 |
| Label | system | 14px | 600 | 21px (×1.5) | normal | タグ、メタ情報 |
| Caption | system | 12px | 400 | 18px (×1.5) | normal | 日付、補足 |
| Code | monospace | 14px | 400 | 1.5 | normal | コードブロック内 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.8（28.8px / 16px）— ゆったりとした行間で長文の可読性を確保
- **見出しの行間**: 1.5（Display, Heading ともに）
- **本文の字間 (letter-spacing)**: normal（0）— 字詰めなし
- **見出しの字間**: normal（0）

**Qiita との比較**:
- Qiita: body lh 1.8, テキスト色 rgba(0,0,0,0.87), YakuHanJPs で約物半角化
- Zenn: body lh 1.8, テキスト色 rgba(0,0,0,0.82), 約物半角化なし、よりソフトなコントラスト

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
```

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt 未適用 */
```

- **palt**: 未適用（normal）。Qiita も palt 未適用で、技術記事系サービスの共通傾向
- 約物の詰め処理は行わず、等幅的な文字送りで統一

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#3ea8ff`（Zenn Blue）
- Text: `#ffffff`
- Padding: 8px 24px
- Border Radius: 8px
- Font Size: 16px
- Font Weight: 700

**Secondary**
- Background: `transparent`
- Text: `#3ea8ff`
- Border: 1px solid `#3ea8ff`
- Padding: 8px 24px
- Border Radius: 8px

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#d6e3ed`
- Border (focus): 1px solid `#3ea8ff`
- Border Radius: 8px
- Padding: 8px 12px
- Font Size: 16px
- Height: 40px

### Cards

- Background: `#ffffff`
- Border: 1px solid `#d6e3ed`
- Border Radius: 12px
- Padding: 20px
- Shadow: なし（ホバー時に elevation-1 適用）

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

- Max Width: 820px（記事本文）
- Padding (horizontal): 20px

### Grid

- Columns: 1（記事ページ）/ 2-3（フィード）
- Gutter: 16px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素（デフォルト） |
| 1 | `0 2px 4px rgba(0,0,0,0.08)` | カードホバー |
| 2 | `0 4px 12px rgba(0,0,0,0.1)` | ドロップダウン、ポップオーバー |
| 3 | `0 8px 24px rgba(0,0,0,0.12)` | モーダル |

---

## 7. Do's and Don'ts

### Do（推奨）

- テキスト色は rgba opacity ベースで指定する（純黒 #000 を避ける）
- 本文の line-height は 1.8 を維持する（Zenn の読みやすさの根幹）
- ブランドカラー #3ea8ff はリンクと CTA に限定して使う
- コードブロックには等幅フォントスタックを使用する
- Qiita 同様、技術記事とコードの混植を前提にレイアウトする

### Don't（禁止）

- `font-family` に和文フォント1つだけを指定しない
- 日本語本文に `line-height: 1.2` 以下を使わない
- palt を本文に適用しない（Zenn のデフォルトは normal）
- Zenn Blue を背景色として広範囲に使わない（アクセントカラーとして使う）
- CSS Custom Properties に依存しない（Zenn は CSS vars 未使用）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 640px | モバイルレイアウト |
| Tablet | ≤ 960px | タブレットレイアウト |
| Desktop | > 960px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px × 44px

### フォントサイズの調整

- モバイルでは本文 15-16px を維持、Display 見出しは 24-28px 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #3ea8ff (Zenn Blue)
Text Color: rgba(0,0,0,0.82)
Background: #ffffff
Surface: #f1f5f9
Font: -apple-system, "system-ui", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
Body Size: 16px
Line Height: 1.8
Letter Spacing: normal
palt: なし（normal）
CSS vars: なし
```

### プロンプト例

```
Zenn のデザインシステムに従って、技術記事一覧ページを作成してください。
- プライマリカラー: #3ea8ff
- フォント: -apple-system, "system-ui", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
- 行間: 本文は line-height: 1.8
- テキスト色: rgba(0,0,0,0.82)
- ボーダー: #d6e3ed
- カード背景: #ffffff、ホバー時に shadow
- CSS vars は使わず直接値を指定
```

### Qiita との差分（AI向けメモ）

| 項目 | Zenn | Qiita |
|------|------|-------|
| ブランドカラー | #3ea8ff (Blue) | #55c500 (Green) |
| テキスト色 | rgba(0,0,0,0.82) | rgba(0,0,0,0.87) |
| font-family 先頭 | -apple-system | YakuHanJPs |
| 約物半角化 | なし | YakuHanJPs で半角化 |
| palt | normal | normal |
| CSS vars | なし | あり |
| 行間 (body) | 1.8 | 1.8 |
| ページ背景 | #ffffff | #f5f6f6 |
