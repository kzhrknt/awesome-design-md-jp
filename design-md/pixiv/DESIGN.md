# DESIGN.md — pixiv

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: クリーン、機能的、コンテンツ中心のギャラリーUI
- **密度**: 情報密度が高いグリッドレイアウト（イラスト一覧）と、ゆったりとした作品詳細ページの二面構成
- **キーワード**: クリエイティブ、鮮明、軽快、ギャラリー的、システマティック

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Primary / pixiv Blue** (`#0096fa`): メインのブランドカラー。CTAボタン、リンク、アクセント要素に使用
- **Primary Dark** (`#0069b5`): ホバー・プレス時のプライマリカラー

### Semantic（意味的な色）

- **Danger** (`#ff0000`): エラー、削除、危険な操作
- **Warning** (`#f5a623`): 警告、注意喚起
- **Success** (`#00c853`): 成功、完了
- **Like / Bookmark** (`#ff4060`): いいね、ブックマーク

### Neutral（ニュートラル）

- **Text Primary** (`#464a4d`): 本文テキスト
- **Text Secondary** (`#8c8c8c`): 補足テキスト、ラベル
- **Text Disabled** (`#b8b8b8`): 無効状態のテキスト
- **Border** (`#d6d6d6`): 区切り線、入力欄の枠
- **Background** (`#eeeeee`): ページ背景
- **Surface** (`#ffffff`): カード、モーダル等の面

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Noto Sans（システムフォントスタック経由）

### 3.2 欧文フォント

- **サンセリフ**: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell
- **等幅**: SFMono-Regular, Consolas, Menlo, monospace

### 3.3 font-family 指定

```css
/* 本文（システムフォントスタック） */
font-family: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif;

/* 等幅 */
font-family: SFMono-Regular, Consolas, Menlo, monospace;
```

**フォールバックの考え方**:
- system-ui を最優先に指定し、各OSのネイティブUIフォントを使用
- -apple-system は macOS/iOS 向け
- Noto Sans はクロスプラットフォームの最終フォールバック（Android/Linux対応）
- Web フォントの読み込みを省略し、高速な初期表示を実現

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Body (default) | system-ui stack | 12px | 400 | 18px (×1.5) | normal | body 要素のデフォルト |
| Body Text | system-ui stack | 14px | 400 | 22px (×1.57) | normal | 段落テキスト |
| Link | system-ui stack | 14px | 400 | 22px | normal | アンカーテキスト |
| Small Link | system-ui stack | 12px | 400 | 18px | normal | 小サイズリンク |
| Caption | system-ui stack | 10px | 400 | 14px | normal | 最小テキスト |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.5（body 12px → 18px、14px → 22px）
- **見出しの行間**: 1.4〜1.5
- **本文の字間 (letter-spacing)**: normal（字詰めなし）
- **見出しの字間**: normal

**ガイドライン**:
- pixiv はコンパクトなUIのため body が 12px と小さめ
- line-height: 1.5 を基本とし、情報密度を維持しつつ可読性を確保
- letter-spacing は一貫して normal（追加の字間調整なし）

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
```

### 3.7 OpenType 機能

```css
font-feature-settings: normal; /* palt 未使用 */
```

- pixiv では palt（プロポーショナル字詰め）を使用していない
- システムフォントスタックのデフォルトカーニングに依存

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#0096fa`
- Text: `#ffffff`
- Padding: 8px 24px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 700

**Secondary**
- Background: `transparent`
- Text: `#0096fa`
- Border: 1px solid `#0096fa`
- Padding: 8px 24px
- Border Radius: 4px

**Like / Bookmark**
- Background: `transparent`
- Text/Icon: `#ff4060`
- Border: 1px solid `#ff4060`
- Border Radius: 20px
- Font Size: 14px

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#d6d6d6`
- Border (focus): 1px solid `#0096fa`
- Border Radius: 4px
- Padding: 8px 12px
- Font Size: 14px
- Height: 36px

### Cards

- Background: `#ffffff`
- Border: none
- Border Radius: 4px
- Padding: 0（サムネイルカードはpadding なし）
- Shadow: `0 1px 4px rgba(0,0,0,0.08)`

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

- Max Width: 1224px
- Padding (horizontal): 16px

### Grid

- Columns: 可変（作品グリッドは auto-fill, minmax）
- Gutter: 12〜24px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 1px 4px rgba(0,0,0,0.08)` | カード、サムネイル |
| 2 | `0 2px 8px rgba(0,0,0,0.12)` | ドロップダウン、ポップオーバー |
| 3 | `0 4px 16px rgba(0,0,0,0.16)` | モーダル、ダイアログ |

---

## 7. Do's and Don'ts

### Do（推奨）

- システムフォントスタックを使用し、Web フォントの読み込みを省略する
- ブランドカラー `#0096fa` を CTA やリンクの主要色として一貫して使用する
- 背景 `#eee` とカード白 `#fff` のコントラストで情報の層を作る
- サムネイルグリッドは均等な余白で整列させる
- テキスト色は `#464a4d` を使用し、純粋な黒を避ける

### Don't（禁止）

- `font-family` にシステムフォントスタックの一部だけを指定しない
- body の font-size を 12px 未満にしない
- 作品サムネイルにアスペクト比の歪みを発生させない
- `#0096fa` 以外の色をプライマリアクションに使用しない
- テキスト色に純粋な `#000000` を使わない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | モバイルレイアウト |
| Tablet | ≤ 1023px | タブレットレイアウト |
| Desktop | > 1023px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは body 12px を維持、グリッドカラム数を減少
- サムネイルは画面幅に応じて 2〜6 列で可変

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #0096fa
Text Color: #464a4d
Background: #eeeeee
Surface: #ffffff
Font: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif
Body Size: 12px (default) / 14px (paragraph)
Line Height: 1.5
```

### プロンプト例

```
pixivのデザインシステムに従って、イラスト作品一覧ページを作成してください。
- プライマリカラー: #0096fa
- フォント: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif
- 行間: 本文は line-height: 1.5 を使用
- 背景色: #eee（ページ）/ #fff（カード）
- テキスト色: #464a4d
- ボーダー: #d6d6d6
- サムネイルのアスペクト比を維持する
```

### CSS 変数（114件・抜粋）

pixiv は独自の CSS Custom Properties を 114件保持している。主要なトークンは以下の通り:

```css
/* ブランド・アクセント */
--color-blue: #0096fa;

/* テキスト */
--charcoal-text: #464a4d;

/* 背景・サーフェス */
--charcoal-bg: #eeeeee;
--charcoal-surface: #ffffff;

/* ボーダー */
--charcoal-border: #d6d6d6;

/* セマンティック */
--charcoal-like: #ff4060;
--charcoal-danger: #ff0000;
```
