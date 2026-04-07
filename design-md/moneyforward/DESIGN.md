# DESIGN.md — マネーフォワード

> マネーフォワード（https://moneyforward.com/）のデザイン仕様書。
> コーポレートサイトおよびサービスページの computed style に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 堅実で信頼感のある業務ツール型UI。家計簿・資産管理という金融領域に相応しい、落ち着いたトーン
- **密度**: 情報密度が高い業務UI。14px ベースの小さめフォントで多くの情報を表示する
- **キーワード**: 堅実、信頼性、業務的、効率的、和文優先
- **特徴**: ヒラギノ角ゴ Pro を先頭に置く和文優先のフォントスタック。CSS Custom Properties を使用しない従来型のCSS設計。見出しは weight 500（medium）で控えめな強調

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Primary Green** (`#4db848`): メインのブランドカラー。CTAボタン、アクセント
- **Primary Dark** (`#3a9a35`): ホバー・プレス時のプライマリカラー

### Semantic（意味的な色）

- **Danger** (`#e74c3c`): エラー、削除、危険な操作
- **Warning** (`#f39c12`): 警告、注意喚起
- **Success** (`#27ae60`): 成功、完了

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文テキスト
- **Text Secondary** (`#666666`): 補足テキスト、ラベル
- **Text Disabled** (`#999999`): 無効状態のテキスト
- **Border** (`#dddddd`): 区切り線、入力欄の枠
- **Background** (`#ffffff`): ページ背景
- **Surface** (`#f5f5f5`): カード、セクション背景

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Hiragino Kaku Gothic Pro（ヒラギノ角ゴ Pro W3）— 第一候補として和文表示を優先

### 3.2 欧文フォント

- **サンセリフ**: フォントスタック内に明示的な欧文フォント指定なし（和文フォント内蔵の欧文グリフを使用）
- **フォールバック**: Meiryo, メイリオ, MS PGothic, Osaka, sans-serif

### 3.3 font-family 指定

```css
/* 本文（実測値） */
font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", Meiryo, メイリオ, "MS PGothic", Osaka, sans-serif;
```

**フォールバックの考え方**:
- ヒラギノ角ゴ Pro を最優先（macOS環境での和文表示品質を重視）
- 日本語フォント名と英語フォント名の両方を記載（環境互換性）
- Meiryo → MS PGothic → Osaka の順でWindows・レガシー環境をカバー
- 欧文専用フォントを先に置かない設計（和文の統一感を優先）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading 2 (large) | ヒラギノ角ゴ Pro | 20px | 500 | normal | normal | セクション見出し「サービス一覧」 |
| Heading 3 | ヒラギノ角ゴ Pro | 17px | 500 | 28.9px (×1.7) | normal | サブ見出し |
| Body Nav | ヒラギノ角ゴ Pro | 14px | 500 | 20px | normal | ナビゲーション「ログイン」 |
| Body | ヒラギノ角ゴ Pro | 14px | 400 | 21px (×1.5) | normal | 本文テキスト |
| Caption | ヒラギノ角ゴ Pro | 12px | 400 | 18px (×1.5) | normal | 補足、注釈 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.5（21px / 14px）。日本語としては標準的
- **見出しの行間**: normal（h2）〜 1.7（h3）
- **本文の字間 (letter-spacing)**: normal（字詰めなし）
- **見出しの字間**: normal

**ガイドライン**:
- 14px ベースのため、行間 1.5 で最低限の可読性を確保
- letter-spacing は全階層で normal — 意図的な字詰め調整なし
- 業務ツール的な密度を維持するため、余白は控えめ

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
word-break: break-all;
overflow-wrap: break-word;
```

### 3.7 OpenType 機能

```css
font-feature-settings: normal; /* palt 不使用 */
```

- **palt**: 未使用。本文・見出しともにプロポーショナル字詰めなし
- 業務ツール的な等幅感を維持する設計

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#4db848`
- Text: `#ffffff`
- Padding: 8px 24px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 500

**Secondary**
- Background: `transparent`
- Text: `#333333`
- Border: 1px solid `#dddddd`
- Padding: 8px 24px
- Border Radius: 4px

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#dddddd`
- Border (focus): 1px solid `#4db848`
- Border Radius: 4px
- Padding: 8px 12px
- Font Size: 14px
- Height: 36px

### Cards

- Background: `#ffffff`
- Border: 1px solid `#eeeeee`
- Border Radius: 4px
- Padding: 20px
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

- Max Width: 980px
- Padding (horizontal): 20px

### Grid

- Columns: 12
- Gutter: 20px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 1px 3px rgba(0,0,0,0.08)` | カード、リスト要素 |
| 2 | `0 2px 8px rgba(0,0,0,0.12)` | ドロップダウン、ポップオーバー |
| 3 | `0 4px 16px rgba(0,0,0,0.15)` | モーダル、ダイアログ |

---

## 7. Do's and Don'ts

### Do（推奨）

- フォントは必ず和文・欧文のフォールバックチェーンを指定する
- 日本語本文の line-height は 1.5 以上にする
- 見出しの weight は 500 に統一する（bold ではなく medium）
- 14px ベースの密度を維持する（業務ツールとしての視認性）
- 色のコントラスト比は WCAG AA 以上を確保する

### Don't（禁止）

- `font-family` にヒラギノ角ゴ Pro 1つだけを指定しない（Windows環境で表示崩れ）
- 日本語本文に `line-height: 1.2` 以下を使わない
- 見出しに `font-weight: 700` (bold) を使わない（500 medium が基本）
- `font-feature-settings: "palt"` を適用しない（サイト全体で未使用）
- CSS Custom Properties を新たに導入しない（既存設計との一貫性）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | モバイルレイアウト |
| Tablet | ≤ 1024px | タブレットレイアウト |
| Desktop | > 1024px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは本文 14px を維持（もとから小さいため縮小しない）
- 見出しはデスクトップの 85–90% 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #4db848
Text Color: #333333
Background: #ffffff
Font: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", Meiryo, メイリオ, "MS PGothic", Osaka, sans-serif
Body Size: 14px
Line Height: 1.5
Heading Weight: 500
palt: なし
CSS Custom Properties: なし
```

### プロンプト例

```
マネーフォワードのデザインシステムに従って、家計簿の収支一覧テーブルを作成してください。
- プライマリカラー: #4db848
- フォント: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", Meiryo, メイリオ, "MS PGothic", Osaka, sans-serif
- 本文: 14px / weight 400 / line-height: 1.5
- 見出し: weight 500（bold ではなく medium）
- palt: 使用しない
- ボーダー: #dddddd
- テーブルヘッダー背景: #f5f5f5
```

### freee との主な違い

| 項目 | マネーフォワード | freee |
|------|-----------------|-------|
| ブランドカラー | グリーン `#4db848` | ブルー `#2864f0` |
| 本文サイズ | 14px（業務ツール的） | 16px（標準的） |
| 見出し weight | 500 (medium) | 700 (bold) |
| 和文フォント | ヒラギノ角ゴ Pro 優先 | Noto Sans JP / ヒラギノ角ゴ ProN |
| CSS Custom Properties | なし | Vibes Design Systemで使用 |
| palt | 未使用 | 見出しで使用 |
| デザインシステム | 従来型CSS | Vibes（体系化済み） |
