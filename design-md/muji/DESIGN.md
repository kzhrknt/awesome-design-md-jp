# DESIGN.md — 無印良品ネットストア (muji.com)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: ミニマリズムの極致。装飾を完全に排し、余白で語るデザイン
- **密度**: ゆったりとしたメディア型。商品画像と余白を活かした構成
- **キーワード**: 素朴、静謐、無装飾、自然体、余白

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **MUJI Red** (`#7f0019`): ムジの赤。深みのあるブランドカラー。ロゴ、アクセントに控えめに使用
- **Red** (`#dd0c14`): 強調・セール・エラー表示

### Brand Neutral（MUJIらしさを出すニュートラル）

- **Kinari（きなり色）** (`#f4eede`): MUJIの象徴。ヒーロー背景、セクション背景に使用
- **Beige** (`#e0ceaa`): ベージュ。温かみのあるアクセント面

### Semantic（意味的な色）

- **Danger** (`#dd0c14`): エラー、削除、危険な操作
- **Warning**: 未定義（実測なし）
- **Success**: 未定義（実測なし）

### Neutral（ニュートラル）

- **Text Primary** (`#3c3c43`): 本文テキスト。純黒ではなく暗いグレー
- **Text Secondary** (`#6d6d72`): 補足テキスト、ラベル
- **Text Tertiary** (`#76767b`): さらに薄い補足テキスト
- **Text Disabled** (`#9d9da0`): 無効状態のテキスト
- **Border** (`#d8d8d9`): 区切り線、入力欄の枠
- **Border Light** (`#ebebec`): 薄い区切り線
- **Background** (`#fff`): ページ背景
- **Background Secondary** (`#f5f5f5`): セクション背景
- **Surface** (`#fff`): カード、モーダル等の面
- **Black** (`#000`): 限定的に使用（ヘッダー等）

### Gray Scale（12段階）

| Token | Value |
|-------|-------|
| Gray 800 | `#3c3c43` |
| Gray 700 | `#6d6d72` |
| Gray 600 | `#76767b` |
| Gray 500 | `#9d9da0` |
| Gray 400 | `#c4c4c6` |
| Gray 300 | `#d8d8d9` |
| Gray 200 | `#ebebec` |
| Gray 100 | `#f5f5f5` |
| White | `#fff` |

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP, Noto Sans JP Fallback, Hiragino Kaku Gothic ProN, Meiryo
- **明朝体**: 使用なし

### 3.2 欧文フォント

- **サンセリフ**: Helvetica Neue, Arial
- **セリフ**: 使用なし
- **等幅**: 未定義

### 3.3 font-family 指定

```css
/* 本文（欧文を先に指定し、和文フォントでフォールバック） */
font-family: "Helvetica Neue", Arial, "Noto Sans JP", "Noto Sans JP Fallback", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
```

**フォールバックの考え方**:
- 欧文フォント（Helvetica Neue, Arial）を先に指定し、欧文グリフの品質を優先
- 和文は Noto Sans JP を第一候補とし、ヒラギノ・メイリオでフォールバック
- generic family は `sans-serif`

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading 1 | 本文と同じ | 26px | 700 | 41.6px (×1.6) | normal | 「店舗を探す」等 |
| Heading 2 | 本文と同じ | 32px | 700 | 51.2px (×1.6) | normal | 「新商品」等 |
| Heading 3 | 本文と同じ | 26px | 700 | 29.9px (×1.15) | 2.4px | 広いトラッキング |
| Body | 本文と同じ | 16px | 400 | 25.6px (×1.6) | normal | ページ全体のベース |
| Paragraph | 本文と同じ | 12px | 400 | 19.2px (×1.6) | normal | 商品説明等 |
| Nav Link | 本文と同じ | 16px | 700 | 22.4px (×1.4) | normal | ナビゲーション |
| Caption | 本文と同じ | 14px | 400 | 22.4px (×1.6) | normal | フッター補足 |
| CTA Button | 本文と同じ | 12px | 700 | — | normal | 「アプリで開く」等 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.6（すべての要素でほぼ統一。珍しい特徴）
- **見出しの行間**: 1.6（h1, h2）/ 1.15（h3 のみ例外）
- **本文の字間 (letter-spacing)**: normal
- **見出しの字間**: normal（h3 のみ 2.4px の広いトラッキング）

**ガイドライン**:
- line-height を 1.6 で統一する設計思想。見出しも本文も同じリズムを持つ
- h3 だけが例外で、line-height: 1.15 / letter-spacing: 2.4px と異なるスタイル
- 全体的に穏やかで静かなリズム感を維持する

### 3.6 禁則処理・改行ルール

```css
/* 実測値に基づく推定設定 */
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》」】、。，．・：；？！`
- 行末禁止: `（「『【〔〈《「【`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt なし */
font-kerning: auto;
```

- **palt**: 使用していない。プロポーショナル字詰めを適用しない設計
- **kern**: 標準のカーニングのみ
- MUJIはフォント機能を最小限にとどめ、素朴な組版を維持している

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary (CTA)**
- Background: `#3c3c43`（テキスト色と同じ暗いグレー）
- Text: `#fff`
- Padding: 8px 16px（推定）
- Border Radius: 4px
- Font Size: 12px
- Font Weight: 700

**Secondary (Outline)**
- Background: `transparent`
- Text: `#3c3c43`
- Border: 1px solid `#d8d8d9`
- Padding: 8px 16px（推定）
- Border Radius: 4px

**Brand Accent**
- Background: `#7f0019`（MUJI Red）
- Text: `#fff`
- Border Radius: 4px
- 使用頻度は低い。特別な強調時のみ

### Inputs

- Background: `#fff`
- Border: 1px solid `#d8d8d9`
- Border (focus): 1px solid `#3c3c43`（推定）
- Border Radius: 0px（角丸なし。MUJIらしいシャープさ）
- Padding: 8px 12px（推定）
- Font Size: 16px

### Cards

- Background: `#fff`
- Border: 1px solid `#ebebec`
- Border Radius: 0px（推定。直線的なデザイン）
- Padding: 16px
- Shadow: なし（フラットデザイン）

---

## 5. Layout Principles

### Spacing Scale（12段階）

| Token | Value |
|-------|-------|
| XXXXS | 4px |
| XXXS | 8px |
| XXS | 12px |
| XS | 16px |
| S | 20px |
| SM | 24px |
| M | 32px |
| ML | 40px |
| L | 48px |
| XL | 56px |
| XXL | 64px |
| XXXL | 80px |
| XXXXL | 96px |

> CSS Custom Properties: `--space-v-xxxxs` (4px) から `--space-v-xxxxl` (96px) まで12段階

### Container

- Max Width: 1120px（推定）
- Padding (horizontal): 16px〜32px

### Grid

- Columns: 可変（商品グリッドは 2〜4 列）
- Gutter: 16px〜24px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | ほぼすべての要素。フラットが基本 |
| 1 | `0 1px 2px rgba(0,0,0,0.08)` | ホバー時のカード（控えめ） |
| 2 | `0 2px 8px rgba(0,0,0,0.1)` | ドロップダウン、ポップオーバー |

> MUJIは影をほぼ使わない。フラットで素朴な表現が基本方針

---

## 7. Do's and Don'ts

### Do（推奨）

- テキスト色は `#3c3c43` を使い、純黒 `#000` を避ける
- line-height は 1.6 で統一する
- 余白を十分に取り、要素間にゆとりを持たせる
- ボタンの角丸は 4px に留め、過度な丸みを避ける
- きなり色 `#f4eede` やベージュ `#e0ceaa` で温かみを加える
- スペーシングスケールに従い、一貫した余白を使う

### Don't（禁止）

- 装飾的なグラデーション、シャドウ、アニメーションを多用しない
- MUJI Red `#7f0019` を広い面積に使わない（アクセントとして控えめに）
- palt（プロポーショナル字詰め）を適用しない
- 角丸を大きくしない（8px以上は MUJIらしくない）
- テキストに純黒 `#000000` を使わない
- letter-spacing を全体に適用しない（h3 の 2.4px は例外）

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

- モバイルでは本文 14–16px、見出しはデスクトップの 70–80% 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Color: #7f0019 (MUJI Red)
Text Color: #3c3c43
Background: #fff
Kinari: #f4eede
Beige: #e0ceaa
Font: "Helvetica Neue", Arial, "Noto Sans JP", "Noto Sans JP Fallback", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
Body Size: 16px
Line Height: 1.6
Button Radius: 4px
Input Radius: 0px
```

### プロンプト例

```
無印良品のデザインシステムに従って、商品一覧ページを作成してください。
- テキスト色: #3c3c43（純黒を使わない）
- フォント: "Helvetica Neue", Arial, "Noto Sans JP", sans-serif
- 行間: line-height: 1.6 で統一
- 背景: きなり色 #f4eede をヒーローセクションに使用
- ボタン: bg #3c3c43, 角丸 4px, 12px/700
- 余白: 4px〜96px の12段階スペーシングスケールを使用
- 装飾は最小限に。影やグラデーションは使わない
- MUJI Red #7f0019 はロゴやアクセントのみに限定
```
