# DESIGN.md — Toyota

> トヨタ自動車（https://toyota.jp/）のデザイン仕様書。
> 実サイトの CSS computed style に基づく。CSS Custom Properties 128件の独自トークン体系を持つ。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 自動車メーカーとして信頼感と先進性を両立させた、クリーンでプロフェッショナルなデザイン。車種情報を主役にした構成
- **密度**: 車種紹介ページはビジュアル重視のゆったりしたレイアウト。お知らせ・ナビゲーションは情報密度が高い
- **キーワード**: 信頼、先進的、クリーン、プロフェッショナル、日本品質
- **特徴**: SF Pro を font-family の先頭に置く Apple 寄りのアプローチ。テキスト色は純黒ではなく `#222222` を採用し、柔らかい印象を確保。letter-spacing: 0.04em をグローバルに適用

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Toyota Red** (`#eb0a1e`): トヨタブランドカラー。ロゴ、重要なアクセントに使用
- **Toyota Red Dark** (`#cc0000`): ホバー・プレス時

### Semantic（意味的な色）

- **Danger** (`#d32f2f`): エラー、削除、危険な操作
- **Warning** (`#f9a825`): 警告、注意喚起
- **Success** (`#388e3c`): 成功、完了

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文テキスト
- **Text Secondary** (`#666666`): 補足テキスト、ラベル
- **Text Disabled** (`#999999`): 無効状態のテキスト
- **Border** (`#dddddd`): 区切り線、入力欄の枠
- **Background** (`#ffffff`): ページ背景
- **Surface** (`#f5f5f5`): カード、セクション背景

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Hiragino Kaku Gothic ProN, Meiryo

### 3.2 欧文フォント

- **サンセリフ**: SF Pro, -apple-system, system-ui
- **等幅**: SFMono-Regular, Consolas, Menlo

### 3.3 font-family 指定

```css
/* 本文 */
font-family: "SF Pro", -apple-system, "system-ui", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;

/* 等幅（コード等） */
font-family: SFMono-Regular, Consolas, Menlo, monospace;
```

**フォールバックの考え方**:
- SF Pro（Apple 環境向け）を先頭に配置
- -apple-system, system-ui でシステムフォントにフォールバック
- 和文は Hiragino Kaku Gothic ProN → Meiryo の順
- 欧文フォントを先に指定し、欧文グリフの品質を優先するアプローチ

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | SF Pro 系 | 40px | 700 | 60px (×1.5) | 0.04em | 車種名見出し（bZ4X 等） |
| Heading 1 | SF Pro 系 | 16px | 400 | 24px (×1.5) | 0.04em | ロゴ（非表示テキスト） |
| Heading 2 | SF Pro 系 | 20px | 700 | 30px (×1.5) | 0.04em | セクション見出し |
| Heading 3 | SF Pro 系 | 16px | 700 | 24px (×1.5) | 0.04em | 小見出し・お知らせ |
| Body | SF Pro 系 | 16px | 400 | 24px (×1.5) | 0.64px (0.04em) | 本文 |
| Caption | SF Pro 系 | 12px | 400 | 18px (×1.5) | 0.04em | 補足、注釈 |
| Small | SF Pro 系 | 10px | 400 | 15px (×1.5) | 0.04em | 最小テキスト |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.5（24px / 16px）
- **見出しの行間**: 1.5（全体的に統一）
- **本文の字間 (letter-spacing)**: 0.64px（0.04em）— グローバルに適用
- **見出しの字間**: 0.04em（本文と共通）

**ガイドライン**:
- toyota.jp は line-height: 1.5 を全体で統一的に適用
- letter-spacing: 0.04em がグローバルに適用され、和文の可読性を向上
- 車種名の大型見出し（40px）でも同じ比率を維持

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》」】、。，．・：；？！`
- 行末禁止: `（「『【〔〈《「【`

### 3.7 OpenType 機能

```css
font-feature-settings: normal; /* palt 未適用 */
```

- toyota.jp では palt（プロポーショナル字詰め）は適用されていない
- letter-spacing: 0.04em のグローバル指定で字間を調整するアプローチ

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary（CTA）**
- Background: `#222222`
- Text: `#ffffff`
- Padding: 12px 32px
- Border Radius: 4px
- Font Size: 16px
- Font Weight: 700

**Secondary（アウトライン）**
- Background: `transparent`
- Text: `#222222`
- Border: 1px solid `#222222`
- Padding: 12px 32px
- Border Radius: 4px

**Brand（トヨタレッド）**
- Background: `#eb0a1e`
- Text: `#ffffff`
- Padding: 12px 32px
- Border Radius: 4px
- Font Size: 16px
- Font Weight: 700

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#dddddd`
- Border (focus): 1px solid `#222222`
- Border Radius: 4px
- Padding: 10px 12px
- Font Size: 16px
- Height: 44px

### Cards

- Background: `#ffffff`
- Border: 1px solid `#eeeeee`
- Border Radius: 8px
- Padding: 24px
- Shadow: 0 2px 8px rgba(0,0,0,0.08)

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 40px |
| XXL | 64px |

### Container

- Max Width: 1200px
- Padding (horizontal): 20px

### Grid

- Columns: 12
- Gutter: 20px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 2px 8px rgba(0,0,0,0.08)` | カード、車種サムネイル |
| 2 | `0 4px 16px rgba(0,0,0,0.12)` | ドロップダウン、ポップオーバー |
| 3 | `0 8px 32px rgba(0,0,0,0.16)` | モーダル、ダイアログ |

---

## 7. Do's and Don'ts

### Do（推奨）

- フォントは SF Pro → system-ui → 和文フォント → sans-serif のフォールバックチェーンを維持する
- 日本語本文の line-height は 1.5 以上にする
- letter-spacing: 0.04em をグローバルに適用する
- テキスト色は `#222222` を使用し、純黒を避ける
- 車種名見出しは 40px / 700 で存在感を出す

### Don't（禁止）

- `font-family` から SF Pro / system-ui を省略しない（Apple 環境での品質が落ちる）
- テキストの色に純粋な `#000000` を使わない（コントラストが強すぎる）
- 日本語本文に `line-height: 1.2` 以下を使わない
- letter-spacing を 0 にしない（toyota.jp の 0.04em は意図的な設計）
- 車種名見出しのウェイトを 400 以下にしない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | モバイルレイアウト |
| Tablet | ≤ 1024px | タブレットレイアウト |
| Desktop | > 1024px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは本文 14-16px、車種名見出しはデスクトップの 60-70% 程度（24-28px）に縮小
- line-height: 1.5 はレスポンシブでも維持

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #eb0a1e (Toyota Red)
Text Color: #222222
Background: #ffffff
Font: "SF Pro", -apple-system, "system-ui", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
Body Size: 16px
Line Height: 1.5
Letter Spacing: 0.04em
```

### プロンプト例

```
トヨタのデザインシステムに従って、車種一覧ページを作成してください。
- プライマリカラー: #eb0a1e（Toyota Red）
- テキスト色: #222222
- フォント: "SF Pro", -apple-system, "system-ui", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
- 行間: line-height: 1.5
- 字間: letter-spacing: 0.04em
- 車種名見出し: 40px / 700
- カードの影: 0 2px 8px rgba(0,0,0,0.08)
- ボーダー: #dddddd
```
