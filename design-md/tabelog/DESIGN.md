# DESIGN.md — 食べログ

> 食べログ（https://tabelog.com/）のデザイン仕様書。
> 実サイトの computed style に基づく。CSS Custom Properties は使用していない従来型のCSS設計。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 情報密度が高く、テキスト中心の実用的なグルメ・レビューポータル。スコア（評価点）が主要なナビゲーション要素
- **密度**: 高密度。body 12px を基本とし、一覧ページに多くの店舗情報を詰め込む構成
- **キーワード**: 実用的、情報密度、スコア重視、オレンジ、レビュー文化
- **特徴**: body 12px という小さめのベースサイズ。メイリオを日本語名で先頭指定。食べログオレンジ `#f09000` がブランドカラー。CSS Custom Properties なし

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **食べログオレンジ** (`#f09000`): ブランドカラー。ロゴ、評価スコア、ハイライトに使用
- **Primary Dark** (`#d07e00`): ホバー・プレス時

### Semantic（意味的な色）

- **Danger** (`#cc3333`): エラー、削除、低評価警告
- **Warning** (`#f09000`): 警告・注意（ブランドカラーと兼用）
- **Success** (`#339933`): 成功、完了、営業中

### Score Colors（評価スコア専用）

- **Score High** (`#f09000`): 高評価（3.5以上）
- **Score Mid** (`#996600`): 中評価
- **Score Low** (`#666666`): 低評価・未評価

### Neutral（ニュートラル）

- **Text Primary** (`#595960`): 本文テキスト
- **Text Heading** (`#333333`): 見出し・店名
- **Text Secondary** (`#999999`): 補足テキスト、メタ情報
- **Text Disabled** (`#cccccc`): 無効状態のテキスト
- **Border** (`#dddddd`): 区切り線、テーブルの枠
- **Border Strong** (`#cccccc`): 強調ボーダー
- **Background** (`#ffffff`): ページ背景
- **Background Secondary** (`#f5f5f5`): セクション背景、ストライプ行
- **Surface** (`#ffffff`): カード、モーダル等の面

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: メイリオ, Meiryo, ヒラギノ角ゴシック, "Hiragino Sans", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro"

> 特徴: 日本語名を先に指定する旧来の慣習に従っている（「メイリオ」が先、「Meiryo」が後）

### 3.2 欧文フォント

- **サンセリフ**: sans-serif（generic family のみ、明示的な欧文フォント指定なし）

### 3.3 font-family 指定

```css
/* 本文（body） */
font-family: メイリオ, Meiryo, "Hiragino Sans", ヒラギノ角ゴシック, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif;
```

**フォールバックの考え方**:
- メイリオ（日本語名）を最優先 — Windows 環境での表示を重視
- Meiryo（英語名）がフォールバック
- macOS 向けに Hiragino Sans 系を配置
- 最後に generic sans-serif

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title (h1) | メイリオ | 12px | 700 | 12px (×1.0) | normal | サイト説明文と兼用 |
| Section Heading (h2) | メイリオ | 22.5px | 600 | 22.5px (×1.0) | normal | 「エリアから探す」等 |
| Sub Heading (h2) | メイリオ | 14px | 600 | 19.6px (×1.4) | normal | 「閲覧履歴」等 |
| Body | メイリオ | 12px | 400 | 16.8px (×1.4) | normal | 本文テキスト |
| Caption | メイリオ | 10px | 400 | 14px (×1.4) | normal | 補足、注釈 |
| Score | メイリオ | 16px | 700 | 1.2 | normal | 評価スコア数値 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.4（16.8px / 12px）。日本語としてはやや狭め
- **見出しの行間**: 1.0（見出しサイズと同値の line-height）
- **本文の字間 (letter-spacing)**: normal（明示指定なし）
- **見出しの字間**: normal

**ガイドライン**:
- body 12px + line-height 1.4 は情報密度を優先した設計
- 日本語の可読性としてはやや狭いが、一覧ページの情報量を重視

### 3.6 禁則処理・改行ルール

```css
/* 食べログの実装 */
word-break: break-all;
overflow-wrap: break-word;
```

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt 未使用 */
```

- palt は使用していない（本文 12px では効果が薄いため合理的）

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary（CTA）**
- Background: `#f09000`
- Text: `#ffffff`
- Padding: 8px 16px
- Border Radius: 3px
- Font Size: 12px
- Font Weight: 700

**Secondary**
- Background: `transparent`
- Text: `#f09000`
- Border: 1px solid `#f09000`
- Padding: 8px 16px
- Border Radius: 3px

### Rating Badge（評価バッジ）

- Background: `#ffffff`
- Text: `#f09000`（高評価時）
- Font Size: 16px
- Font Weight: 700
- 星マーク: `#f09000`（塗り）/ `#dddddd`（空）

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#cccccc`
- Border (focus): 1px solid `#f09000`
- Border Radius: 3px
- Padding: 6px 8px
- Font Size: 12px
- Height: 30px

### Cards（店舗カード）

- Background: `#ffffff`
- Border: 1px solid `#dddddd`
- Border Radius: 0px
- Padding: 12px
- Shadow: none（フラットなデザイン）

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

- Max Width: 980px
- Padding (horizontal): 0px（コンテナ幅固定）

### Grid

- Columns: 可変（一覧ページは1カラム〜2カラム）
- Gutter: 12px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 店舗カード、一覧要素（フラット） |
| 1 | `0 1px 3px rgba(0,0,0,0.12)` | ドロップダウンメニュー |
| 2 | `0 2px 6px rgba(0,0,0,0.15)` | モーダル、ポップオーバー |

食べログは基本的にフラットデザインで、shadow の使用は控えめ。ボーダーで区切る設計。

---

## 7. Do's and Don'ts

### Do（推奨）

- フォントは メイリオ → Meiryo → Hiragino の順でフォールバックを指定する
- 評価スコアには `#f09000` を使用し、数値は太字で目立たせる
- 情報密度を維持しつつ、12px + line-height 1.4 で統一する
- ボーダー `#dddddd` で要素を区切るフラットなレイアウトを使う

### Don't（禁止）

- body のフォントサイズを 12px から変更しない（情報密度が崩れる）
- 評価スコアに `#f09000` 以外の色を使わない
- CSS Custom Properties を追加しない（既存設計に合わない）
- 角丸を大きくしない（3px 以下を維持）
- 過度な shadow を使わない（フラットデザインを維持）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 640px | モバイルレイアウト |
| Tablet | ≤ 980px | タブレットレイアウト |
| Desktop | > 980px | デスクトップレイアウト（固定幅） |

### タッチターゲット

- 最小サイズ: 44px × 44px（モバイル時）

### フォントサイズの調整

- モバイルでも body 12px を維持（情報密度優先の設計思想）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #f09000
Text Color: #595960
Heading Color: #333333
Background: #ffffff
Font: メイリオ, Meiryo, "Hiragino Sans", ヒラギノ角ゴシック, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif
Body Size: 12px
Line Height: 1.4
Border: #dddddd
Score Color: #f09000
```

### プロンプト例

```
食べログのデザインシステムに従って、レストラン一覧ページを作成してください。
- ブランドカラー: #f09000（食べログオレンジ）
- フォント: メイリオ, Meiryo, "Hiragino Sans", sans-serif
- 本文: 12px / line-height: 1.4 / color: #595960
- 見出し: 600-700 / color: #333333
- 評価スコア: 16px / 700 / color: #f09000
- ボーダー: #dddddd
- 角丸: 3px
- レイアウト: フラット、shadow なし、ボーダー区切り
```
