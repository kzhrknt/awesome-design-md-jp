# DESIGN.md — サイボウズ (Cybozu)

> サイボウズ（https://cybozu.co.jp/）のデザイン仕様書。
> コーポレートサイトの computed style に基づく。企業理念を前面に出したグループウェア / SaaS 企業のコーポレートサイト。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 企業理念「チームワークあふれる社会を創る」を反映した、誠実で温かみのあるコーポレートデザイン。装飾を抑え、メッセージとコンテンツを主役にする
- **密度**: ゆったりとした余白。line-height: 2.0 をグローバル適用し、読みやすさを重視
- **キーワード**: 誠実、チームワーク、読みやすい、ゆったり、信頼感
- **特徴**: CSS Custom Properties を使用しない伝統的なCSS構成。ヒラギノ角ゴ Pro W3 を先頭に指定する和文優先のフォントスタック。line-height: 2.0 のグローバル適用は note の記事本文と同じ水準

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Text Primary** (`#333333`): 本文テキスト。純黒を避けた柔らかいダークグレー
- **Background** (`#ffffff`): ページ背景

### Neutral（ニュートラル）

- **Text Primary** (`#333`): 本文テキスト、見出し
- **Background** (`#fff`): ページ背景

> 注: コーポレートサイトはシンプルなカラー構成。CSS Custom Properties による体系的なトークン定義は確認されていない

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: ヒラギノ角ゴ Pro W3（和文の日本語名を先頭に配置。macOS / iOS 優先）
- Meiryo / メイリオ を Windows フォールバックとして指定

### 3.2 欧文フォント

- 和文フォント内蔵の欧文グリフをそのまま使用（別途欧文フォントの先行指定なし）

### 3.3 font-family 指定

```css
/* 本文（実測値） */
font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Meiryo, メイリオ, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
```

**フォールバックの考え方**:
- `"ヒラギノ角ゴ Pro W3"` → macOS / iOS 向け（日本語名が先）
- `"Hiragino Kaku Gothic Pro"` → 英語ロケール環境向け
- `Meiryo`, `メイリオ` → Windows 向け（英語名・日本語名の両方を指定）
- `"ＭＳ Ｐゴシック"`, `"MS PGothic"` → レガシー Windows 向け
- `sans-serif` → 最終フォールバック

**特徴**:
- ヒラギノ角ゴ Pro**N** ではなく **Pro** を使用（JIS2004 字形ではなくJIS90字形）
- 日本語名を英語名より先に記述する和文優先のアプローチ

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Body | ヒラギノ角ゴ Pro W3 | 16px | 400 | 32px (2.0) | normal | 本文テキスト |
| Body Bold | ヒラギノ角ゴ Pro W3 | 16px | 700 | 32px (2.0) | normal | 強調テキスト |
| Heading 2 | ヒラギノ角ゴ Pro W3 | 16px | 400 | 32px (2.0) | normal | サブ見出し |

### 3.5 行間・字間

- **本文の行間 (line-height)**: `2.0`（32px / 16px）。グローバルに適用。note の記事本文と同じ水準で、非常にゆったりとした読書体験
- **字間 (letter-spacing)**: `normal`（ブラウザデフォルト）

**ガイドライン**:
- line-height: 2.0 は日本語本文としてはかなり広い行間。長文コーポレートメッセージの可読性を重視した設計
- SmartHR（1.5）や一般的な業務UI（1.4〜1.6）と比較して、明確にゆったりした組版

### 3.6 禁則処理・改行ルール

```css
/* ブラウザデフォルトに依存 */
```

- 特別な禁則処理の CSS 指定は確認されていない

### 3.7 OpenType 機能

```css
/* palt: 適用なし（normal） */
font-feature-settings: normal;
```

- プロポーショナル字詰め（palt）は適用されていない
- 本文の可読性を重視し、等幅のまま表示

### 3.8 縦書き

- 該当なし。サイボウズは横書きのみ

---

## 4. Component Stylings

> 注: コーポレートサイトのため、UIコンポーネントの体系的な定義は限定的。以下は実測による参考値

### Buttons

**Primary（CTA）**
- 詳細なボタントークンは未抽出

### Inputs

- コーポレートサイトのため、フォーム要素の定義は限定的

---

## 5. Layout Principles

### Container

- コーポレートサイト: コンテンツ幅は中央寄せ

### Spacing

- line-height: 2.0 のグローバル適用により、テキストブロック間の視覚的な余白が自然に確保される

---

## 6. Depth & Elevation

- コーポレートサイトのため、体系的なシャドウトークンは確認されていない

---

## 7. Do's and Don'ts

### Do（推奨）

- `line-height: 2.0` をグローバルに適用し、ゆったりとした読書体験を維持する
- フォントスタックは和文名を先に記述する（`"ヒラギノ角ゴ Pro W3"` が先頭）
- テキストカラーは `#333` を使い、純粋な `#000000` は避ける
- コーポレートメッセージの可読性を最優先にする

### Don't（禁止）

- line-height を 1.5 以下に下げない（サイト全体の読みやすさが崩れる）
- ヒラギノ角ゴ ProN と Pro を混在させない（字形が異なる）
- `font-feature-settings: "palt"` を本文に適用しない（このサイトでは意図的に使用していない）
- 全角フォント名（`"ＭＳ Ｐゴシック"`）のフォールバックを省略しない（レガシー環境対応）

---

## 8. Responsive Behavior

### Breakpoints

- コーポレートサイトのため、詳細なブレークポイントトークンは未抽出

### フォントサイズの調整

- ベースフォントサイズ 16px はモバイルでもそのまま適用

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text Color: #333
Background: #fff
Font: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Meiryo, メイリオ, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif
Body Size: 16px
Line Height: 2.0
Letter Spacing: normal
palt: なし
```

### プロンプト例

```
サイボウズのコーポレートサイトのデザインに従って、企業理念ページを作成してください。
- フォント: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Meiryo, メイリオ, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif
- テキスト色: #333
- 背景: #fff
- 行間: line-height: 2.0（グローバル適用）
- 字間: normal（palt なし）
- 見出しも本文も同じ line-height: 2.0 で統一
```
