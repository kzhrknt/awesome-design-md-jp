# DESIGN.md — ABEMA

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: ダーク基調・没入感重視の動画配信UI。黒背景に白文字で映像コンテンツを際立たせる
- **密度**: 情報密度が高い。番組表・サムネイルグリッドが主体で、横スクロールのカルーセルを多用
- **キーワード**: ダーク、没入感、エンタメ、コンテンツファースト、鮮やか

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **ABEMA Green** (`#00b900`): メインのブランドカラー。CTAボタン、アクセント等に使用
- **ABEMA Pink** (`#ff0077`): セカンダリアクセント。プレミアム・ハイライト等

### Semantic（意味的な色）

- **Danger** (`#e53935`): エラー、削除、危険な操作
- **Warning** (`#ff9800`): 警告、注意喚起
- **Success** (`#00b900`): 成功、完了（ブランドグリーンと兼用）

### Neutral（ニュートラル）

- **Text Primary** (`#ffffff`): 本文テキスト（ダーク背景上の白文字）
- **Text Secondary** (`rgba(255,255,255,0.7)`): 補足テキスト、ラベル
- **Text Disabled** (`rgba(255,255,255,0.38)`): 無効状態のテキスト
- **Border** (`rgba(255,255,255,0.12)`): 区切り線、入力欄の枠
- **Background** (`#000000`): ページ背景（純黒）
- **Surface** (`#1a1a1a`): カード、モーダル等の面
- **Surface Elevated** (`#212121`): ナビゲーション、ドロップダウン等

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Hiragino Sans, BIZ UDGothic, Meiryo

### 3.2 欧文フォント

- **サンセリフ**: BIZ UDPGothic Alphabet（欧文グリフ用に分離指定）
- **カスタムフォント**: CopyRight（ABEMA独自フォント）, Emoji（絵文字専用）

### 3.3 font-family 指定

```css
/* 本文（実測値） */
font-family: CopyRight, Emoji, "Hiragino Sans", "BIZ UDPGothic Alphabet", "BIZ UDGothic", Meiryo, sans-serif;
```

**フォールバックの考え方**:
- CopyRight（ABEMA独自のブランドフォント）を最優先
- Emoji フォントを2番目に指定（絵文字の表示統一）
- Hiragino Sans → BIZ UDPGothic Alphabet（欧文）→ BIZ UDGothic（和文）→ Meiryo の順
- BIZ UDPGothic Alphabet は欧文グリフのみを持つサブセットフォント

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | CopyRight stack | 24px | 700 | 36px (1.5) | normal | ジャンル見出し「ニュース、アニメ…」 |
| Heading 1 | CopyRight stack | 22px | 700 | 22px (1.0) | normal | セクション見出し「人気・注目」 |
| Heading 2 | CopyRight stack | 18px | 700 | 24px (1.33) | normal | サブ見出し |
| Heading 3 | CopyRight stack | 16px | 700 | 20px (1.25) | normal | 小見出し |
| Body | CopyRight stack | 14px | 400 | 21px (1.5) | normal | 本文 |
| Body Bold | CopyRight stack | 14px | 700 | 18.2px (1.3) | normal | 番組タイトル等 |
| Caption | CopyRight stack | 12px | 400 | 16px (1.33) | normal | 補足、注釈 |
| Small | CopyRight stack | 10px | 400 | 14px (1.4) | normal | 最小テキスト、メタ情報 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.5（14px / 21px）
- **見出しの行間**: 1.0〜1.5（見出しレベルにより変動）
- **本文の字間 (letter-spacing)**: normal
- **見出しの字間**: normal

**ガイドライン**:
- ABEMAでは letter-spacing は全体的に normal を使用
- 動画配信サービスのため、短いテキスト（番組名・ジャンル名）が多く、字間の調整は最小限
- 行間は 1.5 を基本とし、見出しは 1.0〜1.33 のタイトな設定

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
font-feature-settings: normal; /* palt 未使用 */
```

- ABEMAでは `palt`（プロポーショナル字詰め）は使用していない
- 短いラベル・番組名が主体のため、デフォルトの字詰めを維持

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary（ABEMA Green）**
- Background: `#00b900`
- Text: `#ffffff`
- Padding: 8px 24px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 700

**Secondary（ゴースト）**
- Background: `transparent`
- Text: `#ffffff`
- Border: 1px solid `rgba(255,255,255,0.3)`
- Padding: 8px 24px
- Border Radius: 4px

**Premium（ピンクアクセント）**
- Background: `#ff0077`
- Text: `#ffffff`
- Padding: 8px 24px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 700

### Inputs

- Background: `#1a1a1a`
- Border: 1px solid `rgba(255,255,255,0.2)`
- Border (focus): 1px solid `#00b900`
- Border Radius: 4px
- Padding: 8px 12px
- Font Size: 14px
- Height: 40px
- Color: `#ffffff`

### Cards（番組サムネイルカード）

- Background: `#1a1a1a`
- Border: none
- Border Radius: 4px
- Padding: 0（サムネイル直置き）
- Shadow: なし（フラットデザイン）
- Hover: `opacity: 0.8` またはスケール変化

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

- Max Width: 1280px
- Padding (horizontal): 16px

### Grid

- Columns: 可変（サムネイルグリッド。コンテンツ幅に応じた auto-fill）
- Gutter: 8px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素（大半のUI） |
| 1 | `0 2px 4px rgba(0,0,0,0.5)` | ドロップダウン、ツールチップ |
| 2 | `0 4px 12px rgba(0,0,0,0.6)` | モーダル、ダイアログ |
| 3 | `0 8px 24px rgba(0,0,0,0.7)` | フローティング要素 |

**注意**: ダーク背景のため影の視認性は低く、主にモーダルのオーバーレイで深度を表現する。

---

## 7. Do's and Don'ts

### Do（推奨）

- フォントは CopyRight → Emoji → Hiragino Sans の順でフォールバックを指定する
- ダーク背景（#000）に白文字（#fff）を基本とし、コンテンツの視認性を確保する
- 番組サムネイルのアスペクト比を 16:9 で統一する
- ABEMAグリーン（#00b900）をアクション可能な要素に限定して使用する

### Don't（禁止）

- ダーク背景に低コントラストのグレーテキストを使わない（`rgba(255,255,255,0.3)` 以下は避ける）
- テキストに純粋な `#000000` を使わない（ダーク背景上で見えなくなる）
- CopyRight フォントがない環境を想定せずにデザインしない（フォールバック必須）
- サムネイルに重ねるテキストに影や背景グラデーションなしで配置しない（可読性低下）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 599px | モバイルレイアウト（縦1列） |
| Tablet | ≤ 1023px | タブレットレイアウト（2〜3列グリッド） |
| Desktop | > 1024px | デスクトップレイアウト（4〜6列グリッド） |

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは本文 14px を維持、見出しはデスクトップの 80% 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #00b900 (ABEMA Green)
Accent Color: #ff0077 (ABEMA Pink)
Text Color: #ffffff
Background: #000000
Surface: #1a1a1a
Font: CopyRight, Emoji, "Hiragino Sans", "BIZ UDPGothic Alphabet", "BIZ UDGothic", Meiryo, sans-serif
Body Size: 14px
Line Height: 1.5
```

### プロンプト例

```
ABEMAのデザインシステムに従って、番組一覧カードグリッドを作成してください。
- 背景: #000（ダーク）
- カード背景: #1a1a1a
- フォント: CopyRight, Emoji, "Hiragino Sans", "BIZ UDPGothic Alphabet", "BIZ UDGothic", Meiryo, sans-serif
- テキスト色: #fff（プライマリ）、rgba(255,255,255,0.7)（セカンダリ）
- アクセント: #00b900（CTAボタン）
- 行間: 本文は line-height: 1.5
- サムネイルアスペクト比: 16:9
- カード角丸: 4px
```

### CSS変数について

ABEMAは **844件** の独自CSS Custom Propertiesを使用しており、日本のWebサービスの中で最多級のデザイントークン体系を持つ。主なカテゴリ:
- カラートークン（ブランド、セマンティック、ニュートラル）
- スペーシングトークン
- タイポグラフィトークン
- アニメーション・トランジション関連トークン
