# DESIGN.md — LINE

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: クリーン、信頼感、大きくシンプルなタイポグラフィ
- **密度**: ゆったりとしたランディング型。body font-size 20px と大きめの設定
- **キーワード**: グリーン、大胆、メッセンジャー、親しみやすい、モダン
- **カテゴリ**: Messenger

---

## 2. Color Palette & Roles

<!-- CSS Custom Properties は使用していない -->

### Primary（ブランドカラー）

- **LINE Green** (`#06c755`): メインのブランドカラー。CTAボタン、アクセント等に使用
- **LINE Green Dark** (`#05b34c`): ホバー・プレス時のプライマリカラー（推定）

### Semantic（意味的な色）

- **Danger** (`#d93025`): エラー、削除、危険な操作
- **Warning** (`#f9ab00`): 警告、注意喚起
- **Success** (`#06c755`): 成功、完了（LINE Green と共用）

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文テキスト
- **Text Secondary** (`#666666`): 補足テキスト、ラベル
- **Text Disabled** (`#999999`): 無効状態のテキスト
- **Border** (`#e5e5e5`): 区切り線、入力欄の枠
- **Background** (`#ffffff`): ページ背景
- **Surface** (`#f7f8f9`): カード、モーダル等の面

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP, Noto Sans KR（韓国語フォールバック）

### 3.2 欧文フォント

- **サンセリフ**: SFPro, Arial

### 3.3 font-family 指定

```css
/* 本文 */
font-family: SFPro, Arial, "Noto Sans JP", "Noto Sans KR", sans-serif;
```

**フォールバックの考え方**:
- 欧文フォント（SFPro, Arial）を先に指定し、欧文グリフの品質を優先
- 和文フォントは Noto Sans JP → Noto Sans KR の順
- 韓国発のサービスのため Noto Sans KR が含まれる
- 最後に generic family（sans-serif）を指定

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero (EN) | SFPro | 70px | 700 | normal | normal | 英語ヒーロー "Life on LINE" |
| Heading 2 (JP) | Noto Sans JP | 60px | 700 | 80.04px (x1.334) | normal | "コミュニケーションアプリ" |
| Heading 2 (JP) | Noto Sans JP | 60px | 700 | 76.2px (x1.27) | normal | "LINEのサービス一覧" |
| Body | SFPro/Noto Sans JP | 20px | 400 | normal | normal | 本文（非常に大きい） |

### 3.5 行間・字間

- **本文の行間 (line-height)**: normal（ブラウザデフォルト、約1.2）
- **見出しの行間**: 1.27〜1.334（見出しにより異なる）
- **本文の字間 (letter-spacing)**: normal
- **見出しの字間**: normal

**ガイドライン**:
- body font-size が 20px と大きいため、line-height: normal でも一定の可読性を確保
- 見出しは 60-70px と非常に大きく、インパクト重視のデザイン
- letter-spacing は全体的に normal で統一

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
font-feature-settings: "palt" 0; /* palt は通常適用なし */
```

- **palt**: body では normal（未適用）。大きな見出しでの使用は任意
- 全体的にプロポーショナル字詰めを使わないシンプルな設計

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary（LINE Green CTA）**
- Background: `#06c755`
- Text: `#ffffff`
- Padding: 12px 32px
- Border Radius: 8px
- Font Size: 16px
- Font Weight: 700

**Secondary**
- Background: `transparent`
- Text: `#000000`
- Border: 1px solid `#e5e5e5`
- Padding: 12px 32px
- Border Radius: 8px

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#e5e5e5`
- Border (focus): 1px solid `#06c755`
- Border Radius: 8px
- Padding: 12px 16px
- Font Size: 16px
- Height: 48px

### Cards

- Background: `#ffffff`
- Border: 1px solid `#e5e5e5`
- Border Radius: 12px
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

- Max Width: 1120px
- Padding (horizontal): 24px

### Grid

- Columns: 12
- Gutter: 24px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 2px 8px rgba(0,0,0,0.08)` | カード、ドロップダウン |
| 2 | `0 4px 16px rgba(0,0,0,0.12)` | モーダル、ポップオーバー |
| 3 | `0 8px 24px rgba(0,0,0,0.16)` | ダイアログ、フローティング要素 |

---

## 7. Do's and Don'ts

### Do（推奨）

- LINE Green `#06c755` をCTAやアクセントに一貫して使用する
- body font-size は 20px を維持する（サービス特有の設定）
- フォントは SFPro, Arial, Noto Sans JP, Noto Sans KR, sans-serif の順で指定する
- 見出しは 60-70px の大きなサイズで大胆に表示する
- 韓国語フォールバック（Noto Sans KR）を含める

### Don't（禁止）

- LINE Green 以外のブランドカラーをCTAに使わない
- body font-size を 20px 未満に変更しない（ブランドの意図に反する）
- CSS Custom Properties を独自に追加しない（実サイトでは未使用）
- palt を本文に適用しない

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

- モバイルでは本文 16-18px、見出しは 36-42px 程度に縮小
- body の 20px はデスクトップ基準

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #06c755 (LINE Green)
Text Color: #000000
Background: #ffffff
Font: SFPro, Arial, "Noto Sans JP", "Noto Sans KR", sans-serif
Body Size: 20px
Line Height: normal
CSS Custom Properties: なし
```

### プロンプト例

```
LINEのデザインシステムに従って、メッセージ一覧画面を作成してください。
- プライマリカラー: #06c755（LINE Green）
- フォント: SFPro, Arial, "Noto Sans JP", "Noto Sans KR", sans-serif
- 本文サイズ: 20px
- 行間: normal
- ボタン背景: #06c755、テキスト白、border-radius: 8px
- ボーダー: #e5e5e5
- 見出しは大きく（60-70px）、font-weight: 700
```
