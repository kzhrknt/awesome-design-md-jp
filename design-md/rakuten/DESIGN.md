# DESIGN.md — 楽天市場

> 楽天市場（https://www.rakuten.co.jp/）のデザイン仕様書。
> 実サイトの computed style に基づく。CSS Custom Properties は使用されていない。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 情報密度が極めて高い、商品の露出を最大化するEC型レイアウト。装飾よりも情報量を優先し、あらゆる余白に商品やバナーを配置する
- **密度**: 極めて高密度。body 12px / line-height 1.1 という国内サイト最小級の本文設定。画面あたりの情報量を最大化する設計思想
- **キーワード**: 高密度、商売的、にぎやか、和文優先、レガシー
- **特徴**: CSS Custom Properties を使用せず、インラインスタイルとクラス直書きが中心。メイリオ先頭の和文優先フォントスタック。楽天レッド `#bf0000` がブランドの象徴

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **楽天レッド** (`#bf0000`): ブランドカラー。ヘッダー背景、CTA、セール表示など全面的に使用
- **楽天レッド Dark** (`#990000`): ホバー・プレス時

### Semantic（意味的な色）

- **Danger / Sale** (`#bf0000`): セール価格、値引き表示。ブランドカラーと兼用
- **Warning** (`#ff8c00`): ポイント表示、注意喚起
- **Success** (`#008000`): 在庫あり、送料無料

### Neutral（ニュートラル）

- **Text Primary** (`#666666`): 本文テキスト（body デフォルト）
- **Text Dark** (`#333333`): 見出し、強調テキスト
- **Text Secondary** (`#999999`): 補足テキスト、注釈
- **Text Disabled** (`#cccccc`): 無効状態のテキスト
- **Border** (`#dddddd`): 区切り線、テーブル罫線
- **Border Light** (`#eeeeee`): 薄い区切り
- **Background** (`#ffffff`): ページ背景
- **Background Gray** (`#f6f6f6`): セクション背景、ストライプ行
- **Surface** (`#ffffff`): カード、商品枠

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Meiryo（メイリオ）、ヒラギノ角ゴ ProN
- **明朝体**: 使用なし

### 3.2 欧文フォント

- **サンセリフ**: MS PGothic（和文フォント内の欧文グリフに依存）
- **等幅**: 特に指定なし

### 3.3 font-family 指定

```css
/* 本文（body） */
font-family: Meiryo, "Hiragino Kaku Gothic ProN", "MS PGothic", sans-serif;
```

**フォールバックの考え方**:
- メイリオを先頭に置く和文優先のスタック
- Windows環境（メイリオ）→ macOS環境（ヒラギノ）→ レガシーWindows（MS Pゴシック）の順
- 欧文専用フォントは指定せず、和文フォント内の欧文グリフを使用

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading 2 (Ranking) | Meiryo | 20px | 600 | 28px (×1.4) | normal | 「人気商品ランキング」等 |
| Heading 2 (History) | Meiryo | 20px | 600 | 26px (×1.3) | normal | 「最近チェックした商品」等 |
| Heading 2 (Genre) | Meiryo | 16px | 700 | 17.6px (×1.1) | normal | 「ジャンル」等 |
| Body | Meiryo | 12px | 400 | 13.2px (×1.1) | normal | 本文テキスト |
| Price | Meiryo | 14px | 700 | — | normal | 商品価格 |
| Price (Sale) | Meiryo | 16px | 700 | — | normal | セール価格（赤字） |
| Caption | Meiryo | 10px | 400 | 11px (×1.1) | normal | 最小テキスト、注釈 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.1（極めてタイト。情報密度を最大化する設計）
- **見出しの行間**: 1.1〜1.4（見出しごとに異なる）
- **本文の字間 (letter-spacing)**: normal
- **見出しの字間**: normal

**注意事項**:
- body の line-height 1.1 は日本語としては極めてタイトであり、一般的な推奨値（1.5以上）を大きく下回る
- これは楽天市場の「画面あたりの情報量最大化」という設計思想に基づく意図的な設定

### 3.6 禁則処理・改行ルール

```css
/* 実測値 — 特別な指定なし（ブラウザデフォルト） */
word-break: normal;
overflow-wrap: normal;
```

### 3.7 OpenType 機能

```css
/* palt は使用されていない */
font-feature-settings: normal;
```

- プロポーショナル字詰め（palt）は未使用
- カーニング（kern）も特に指定なし

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary（購入ボタン）**
- Background: `#bf0000`
- Text: `#ffffff`
- Padding: 8px 16px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 700

**Secondary（カートに入れる）**
- Background: `#ffffff`
- Text: `#bf0000`
- Border: 2px solid `#bf0000`
- Padding: 8px 16px
- Border Radius: 4px

**Point（ポイント付与）**
- Background: `#ff8c00`
- Text: `#ffffff`
- Padding: 4px 12px
- Border Radius: 4px
- Font Size: 12px
- Font Weight: 700

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#cccccc`
- Border (focus): 1px solid `#bf0000`
- Border Radius: 4px
- Padding: 6px 8px
- Font Size: 14px
- Height: 32px

### Cards（商品カード）

- Background: `#ffffff`
- Border: 1px solid `#dddddd`
- Border Radius: 0px（角丸なし）
- Padding: 8px
- Shadow: none（フラット）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 12px |
| L | 16px |
| XL | 24px |
| XXL | 32px |

### Container

- Max Width: 1120px
- Padding (horizontal): 0px（コンテナ外側に余白を取らない設計）

### Grid

- Columns: 可変（商品グリッドは4〜6列）
- Gutter: 8px〜12px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | ほぼすべての要素（フラットデザイン） |
| 1 | `0 1px 3px rgba(0,0,0,0.12)` | ドロップダウンメニュー |
| 2 | `0 2px 6px rgba(0,0,0,0.15)` | モーダル |

- 楽天市場はフラットな構造が基本。影（box-shadow）の使用は極めて限定的
- 要素の区切りはボーダー（`#dddddd`）で表現する

---

## 7. Do's and Don'ts

### Do（推奨）

- メイリオ先頭の和文優先フォントスタックを維持する
- 商品情報は高密度に配置し、一覧性を重視する
- 価格表示は `#bf0000`（楽天レッド）で統一する
- ポイント表示は `#ff8c00` で統一する
- ボーダー（`#dddddd`）で要素を区切る

### Don't（禁止）

- line-height を 1.5 以上に広げない（楽天市場の情報密度が崩れる）
- 角丸を多用しない（楽天市場はシャープな矩形が基本）
- box-shadow を多用しない（フラットなボーダー区切りが基本）
- 欧文フォントを和文フォントの前に配置しない（和文優先のスタック）
- CSS Custom Properties を使わない（楽天市場は直書きスタイルが基本）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | モバイルレイアウト（1列） |
| Tablet | ≤ 1023px | タブレットレイアウト（2〜3列） |
| Desktop | > 1023px | デスクトップレイアウト（4〜6列） |

### タッチターゲット

- 最小サイズ: 楽天市場では WCAG 基準の 44px を満たさないリンクが多数存在

### フォントサイズの調整

- モバイルでも本文 12px を維持する傾向がある（情報密度優先）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #bf0000 (楽天レッド)
Text Color: #666666
Text Dark: #333333
Background: #ffffff
Font: Meiryo, "Hiragino Kaku Gothic ProN", "MS PGothic", sans-serif
Body Size: 12px
Line Height: 1.1 (13.2px)
Letter Spacing: normal
palt: 未使用
CSS Variables: なし
```

### プロンプト例

```
楽天市場のデザインシステムに従って、商品一覧グリッドを作成してください。
- ブランドカラー: #bf0000（楽天レッド）
- フォント: Meiryo, "Hiragino Kaku Gothic ProN", "MS PGothic", sans-serif
- 本文サイズ: 12px / line-height: 1.1
- 価格表示: #bf0000 / 14px / 700
- セール価格: #bf0000 / 16px / 700
- ポイント表示: #ff8c00
- ボーダー: #dddddd
- 角丸: なし（0px）
- 情報密度: 極めて高く。余白は最小限に
```
