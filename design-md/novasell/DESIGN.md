# DESIGN.md — Novasell

> Novasell（https://novasell.com/）のデザイン仕様書。
> ラクスルグループの AI マーケティングエージェンシー。
> Puppeteer による computed style 実測値（2026-04-06 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 大胆でエネルギッシュなエージェンシーデザイン。超巨大タイポグラフィとネオングリーンで強い印象を与える
- **密度**: 極めてゆったり。1セクション=1メッセージの大胆な構成
- **キーワード**: 大胆、エネルギッシュ、ネオン、モノクロ+アクセント、テクノロジー感
- **特徴**: 全テキスト `font-weight: 700`（bold）。Display 書体に最大 486px のサイズを使用。ネオングリーン `#00fa27` がブランドカラー

---

## 2. Color Palette & Roles

### Primary（CSS Custom Properties 実測値）

- **Novasell Green** (`#00fa27` / `--color--green`): ブランドカラー。背景、テキスト、アクセントすべてに使用
- **Black** (`#000` / `--color--black`): 背景、テキスト
- **White** (`#fff` / `--color--white`): テキスト、背景

### Neutral

- **Near Black** (`#101112` / `rgb(16,17,18)`): ヘッダーリンク、一部テキスト
- **Dark Grey** (`#222426` / `--dark-grey-for-button-text`): ボタンテキスト
- **Davys Grey** (`#7e8085` / `--mono--dimgrey`): プレースホルダー
- **Silver** (`#cdcfd4` / `--silver-for-disable`): 無効状態、ボーダー
- **White Grey** (`#f1f5f9` / `--mono--white-grey`): 背景
- **Light Grey BG** (`#e9eef3` / `--white-grey-for-bg`): 背景
- **Davys Grey BG** (`#525459` / `--davys-grey-for-bg`): ダーク背景

### Semantic

- **Error Red** (`#e4250e` / `--rederror-for-error-text-form`): フォームエラー
- **Green Link** (`#00aa14` / `--novasell-green-for-button-text-link`): テキストリンク（Green の暗いバリエーション）

---

## 3. Typography Rules

### 3.1 和文フォント

- **Zen Kaku Gothic New**: Google Fonts の角ゴシック体。本文・見出し・UI すべてに使用
- 特徴: 全テキストが `font-weight: 700`（bold）。通常ウェイト（400）はサイト上で確認されなかった

### 3.2 欧文フォント

3書体を用途で使い分け：

- **gazzetta-variable**: セリフ系の Variable Font。巨大な Display 見出し用（最大 486px）。weight 400〜700。Adobe Fonts でホストされており、novasell.com ドメインにライセンスされている。preview.html では Playfair Display で代替
- **neue-haas-grotesk-display**: Neue Haas Grotesk（Helvetica の前身）。サンセリフ。中サイズの見出し・ラベル用。weight 500〜700。同じく Adobe Fonts。preview.html では Helvetica Neue で代替
- **Zen Kaku Gothic New 内蔵の欧文グリフ**: 本文中の英数字

### 3.3 font-family 指定

```css
/* 和文本文・UI */
font-family: "Zen Kaku Gothic New", sans-serif;

/* 巨大 Display（セクションタイトル・ヒーロー） */
font-family: gazzetta-variable, sans-serif;

/* 欧文ラベル・中見出し */
font-family: neue-haas-grotesk-display, sans-serif;
```

**使い分け**:
- 日本語テキスト → Zen Kaku Gothic New
- 英語の巨大セクション見出し（"CASE", "OUR SERVICES" 等）→ gazzetta-variable
- 英語の中サイズ見出し・ラベル（"CONTACT", "READY TO SAY" 等）→ neue-haas-grotesk-display

### 3.4 文字サイズ・ウェイト階層

> computed style 実測値。ビューポート幅 1440px 基準（`--base-vw: 1440`）

**gazzetta-variable（巨大 Display）**

| Role | Size | Weight | Line Height | Letter Spacing | Color | 備考 |
|------|------|--------|-------------|----------------|-------|------|
| Hero Max | 486px | 700 | 243px (×0.5) | normal | `#00fa27` | 背景装飾テキスト |
| Hero XL | 390px | 400 | 312px (×0.8) | -7.8px | `#000` | "FREE ANALYSIS" |
| Hero L | 378px | 400 | 241.92px (×0.64) | -1.89px | `#000` | "CASE" |
| Hero M | 338px | 400 | 338px (×1.0) | 0.845px | `#00fa27` | "NOVASELL ACTIVITIES" |
| Section | 160px | 400 | 120px (×0.75) | normal | `#000` | "OUR SERVICES" |
| Product | 100px | 400 | 75px (×0.75) | normal | `#000` | "AI MARKETINGFORCE" |
| Subsection | 62px | 700 | 62px (×1.0) | normal | `#fff` | 英語サブタイトル |
| Label | 54px | 400 | 54px (×1.0) | normal | `#000` | "NOVASELLAI..." |

**neue-haas-grotesk-display（欧文中見出し）**

| Role | Size | Weight | Line Height | Letter Spacing | Color | 備考 |
|------|------|--------|-------------|----------------|-------|------|
| Heading | 70px | 700 | 70px (×1.0) | -1.75px | `#000` | "CONTACT" |
| Heading alt | 70px | 600 | 70px (×1.0) | normal | `#000` | "TRY" |
| Body EN | 18px | 500 | 14px (×0.78) | -0.216px | `#000` | 英文説明 |
| Label | 12px | 700 | 12px (×1.0) | normal | `#00fa27` | "ANALYTICS REPORTS" |
| Caption EN | 11px | 600 | 18.04px (×1.64) | -0.209px | `#00fa27` | 英語キャプション |

**Zen Kaku Gothic New（和文）**

| Role | Size | Weight | Line Height | Letter Spacing | Color | 備考 |
|------|------|--------|-------------|----------------|-------|------|
| Display JP | 106px | 700 | 106px (×1.0) | -7.95px | `#000` | "実施中" |
| Hero Copy | 40px | 700 | 48px (×1.2) | -0.24px | `#00fa27` | キャッチコピー |
| Heading JP | 40px | 700 | 48px (×1.2) | normal | `#fff` | 日本語見出し |
| Sub Heading | 32px | 700 | 38.4px (×1.2) | -0.32px | `#000` | 中見出し |
| Sub Heading S | 28px | 700 | 39.2px (×1.4) | -0.56px | `#000` | 小見出し |
| Body | 20px | 700 | 36px (×1.8) | 1px | `#000` | 本文（説明テキスト） |
| Body (default) | 16px | 700 | 28px (×1.75) | normal | `#000` | body デフォルト |
| Nav Link | 12px | 700 | 14.4px (×1.2) | normal | `#000` | ナビリンク |
| CTA Label | 12px | 700 | 12px (×1.0) | normal | `#fff` / `#000` | ボタンラベル |

### 3.5 行間・字間

**行間 (line-height)** — 実測値:
- 巨大 Display: `×0.5`〜`×1.0` — 極めてタイト（文字が重なるレベル）
- 和文見出し: `×1.2` — タイト
- 和文本文: `×1.75`〜`×1.8` — ゆったり
- 欧文ラベル: `×1.0` — 1行分

**字間 (letter-spacing)** — 実測値:
- 巨大 Display: `-7.8px`〜`-1.89px` — 強い負のトラッキング
- 和文見出し: `-0.24px`〜`-0.56px` — 負のトラッキング
- 和文本文 20px: `1px`（0.05em）— 唯一の正のトラッキング
- body デフォルト: `normal`

**ガイドライン**:
- 巨大サイズほど強く詰める（負の letter-spacing）
- 和文本文のみわずかに正の letter-spacing（1px）
- **全テキストが bold** — weight 400 は gazzetta-variable のみ

### 3.6 禁則処理・改行ルール

- 特別な指定なし（ブラウザデフォルト）

### 3.7 OpenType 機能

```css
font-feature-settings: normal;
```

- palt は不使用

### 3.8 縦書き

- 該当なし

---

## 4. Component Stylings

### Buttons

**Primary（"資料請求"）**
- Background: `#000`
- Text: `#fff`
- Border Radius: 16.5px
- Font Size: 12px
- Font Weight: 700
- Font: Zen Kaku Gothic New

**Secondary（"お問い合わせ"）**
- Background: `#fff`
- Text: `#000`
- Border Radius: 16.5px
- Font Size: 12px
- Font Weight: 700

### Navigation

- Background: transparent（スクロールで変化する可能性あり）
- Height: ヘッダー固定
- Font: Zen Kaku Gothic New, 12px, weight 700
- Link Color: `#000`

---

## 5. Layout Principles

### Content Width

- ビューポートベースのレイアウト（`--base-vw: 1440`）
- テキストサイズも vw 単位で可変する可能性あり

### Spacing

- セクション間に大きな余白
- 1セクション=1メッセージの大胆な構成

---

## 6. Depth & Elevation

- CSS Custom Properties にシャドウ定義なし
- フラットデザイン
- 奥行きは色のコントラスト（黒背景 + ネオングリーン）で表現

### Animation

- `--ease-01: cubic-bezier(0.32, 0.48, 0, 1)` — カスタムイージング

---

## 7. Do's and Don'ts

### Do（推奨）

- 全テキストを `font-weight: 700` にする（Novasell の最大の特徴）
- ネオングリーン `#00fa27` を大胆に使う（背景・テキスト両方）
- Display 見出しは gazzetta-variable で超巨大に（100px 以上）
- 欧文ラベルは neue-haas-grotesk-display を使う
- 大きいサイズほど letter-spacing を負にする（詰める）
- 黒背景 + ネオングリーンの組み合わせを基本とする
- ボタンは小さめ（12px）の角丸ピル型

### Don't（禁止）

- `font-weight: 400` を和文テキストに使わない（サイト全体が bold）
- ネオングリーン `#00fa27` を彩度の低いグリーンに変えない（ネオン感が失われる）
- 見出しを小さくしない（最低でも 40px 以上で大胆に）
- 3書体以外のフォントを混ぜない（gazzetta / neue-haas-grotesk / Zen Kaku Gothic New）
- 影やグラデーションを使わない（フラットに保つ）

---

## 8. Responsive Behavior

- ビューポート幅ベースのレスポンシブ（vw 単位の可能性）
- `--base-vw: 1440` を基準としたスケーリング

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Novasell Green: #00fa27
Black: #000
White: #fff
Error: #e4250e
Green Link: #00aa14

JP Font: "Zen Kaku Gothic New", sans-serif (all bold)
Display Font: gazzetta-variable, sans-serif
Label Font: neue-haas-grotesk-display, sans-serif

Body: 16px / weight: 700 / line-height: 1.75
JP Heading: 40px / weight: 700 / line-height: 1.2
Display EN: 100px+ / gazzetta-variable / weight: 400
All text: font-weight: 700 (except gazzetta display)
Letter Spacing: 大きいサイズほど負に詰める
palt: 不使用
Button: 12px / radius: 16.5px
```

### プロンプト例

```
Novasell のデザインに従って、サービス紹介ページを作成してください。
- 和文フォント: "Zen Kaku Gothic New", sans-serif（すべて bold）
- 英語 Display: gazzetta-variable（100px 以上、セリフ系）
- 英語ラベル: neue-haas-grotesk-display（12px、weight 700）
- ブランドカラー: #00fa27（ネオングリーン）
- 背景: #000（黒）+ #00fa27（グリーン）の交互
- 全テキスト font-weight: 700
- 見出しは 40px 以上で大胆に
- 大きい見出しほど letter-spacing を負にする
- ボタン: 12px, radius 16.5px, 小さめのピル型
- 影やグラデーションは使わない
```
