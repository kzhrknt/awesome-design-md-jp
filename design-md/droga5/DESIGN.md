# DESIGN.md — Droga5 Japan (droga5.jp)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> Droga5 は Accenture Song 傘下のクリエイティブエージェンシー。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: ミニマル・大胆なタイポグラフィ主導。巨大見出し + 余白で強い印象を与えるクリエイティブエージェンシーの定型
- **密度**: 非常にゆったり。フルスクリーンのセクションに大きな文字を配置し、余白を贅沢に使う
- **キーワード**: Bold Typography, Minimal, Pastel Accents, Creative, Purpose-driven

---

## 2. Color Palette & Roles

### CSS Custom Properties（実測値）

```css
--cool-grey: #9ea7aa;
--cool-grey-two: #949799;
--pale-salmon: #ffb78c;
--pale-teal: #86d1bb;
--pig-pink: #e4838f;
--black-two: #000000;
```

### Primary（ブランドカラー）

- **Primary / CTA Blue** (`#0000d5`): CTA ボタン、リンクテキスト。鮮やかなブルー
- **Primary Dark**: 明示なし（ホバー時は opacity 変化等を想定）

### Accent（パステル系アクセント）

- **Pale Salmon** (`#ffb78c`): アクセント。温かみのあるサーモンピンク
- **Pale Teal** (`#86d1bb`): アクセント。落ち着いたティール
- **Pig Pink** (`#e4838f`): アクセント。やわらかいピンク

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文テキスト（`--black-two`）
- **Text Secondary** (`#959595`): 補足テキスト、セクションラベル、説明文
- **Cool Grey** (`#9ea7aa` / `#949799`): フッターリンク、リージョン表記
- **Background** (`#ffffff`): ページ背景
- **Surface**: 明示的なカード背景の定義なし（白背景ベース）

---

## 3. Typography Rules

### 3.1 和文フォント

Droga5 は Noto Sans JP を **3つの独立した @font-face 名** で読み込んでいる。通常の `"Noto Sans JP"` ウェイト指定ではない点に注意。

- **NotoSansJP-Bold**: 巨大見出し専用（font-weight: 700 相当）
- **NotoSansJP-Regular**: 本文・サブ見出し用（font-weight: 400 相当）
- **NotoSansJP-Medium**: ナビゲーション・ラベル用（font-weight: 500 相当）

### 3.2 欧文フォント

- **GTPressuraMono** (GT Pressura Mono): ブランドモノスペース。ラベル・CTA テキストに使用。Adobe Fonts ライセンス
  - ※ 代替フォント: `"Roboto Mono"` または `"IBM Plex Mono"` で近似可能

### 3.3 font-family 指定

```css
/* 見出し（巨大タイポ） */
font-family: "NotoSansJP-Bold", "Noto Sans JP", sans-serif;
font-weight: 700;

/* 本文・サブ見出し */
font-family: "NotoSansJP-Regular", "Noto Sans JP", sans-serif;
font-weight: 400;

/* ナビ・ラベル */
font-family: "NotoSansJP-Medium", "Noto Sans JP", sans-serif;
font-weight: 500;

/* モノスペース（ブランドラベル） */
font-family: "GTPressuraMono", "Roboto Mono", "IBM Plex Mono", monospace;
font-weight: 400;
```

**フォールバックの考え方**:
- 実サイトは @font-face で個別ファミリ名を定義しているため、通常の Noto Sans JP をフォールバックに置く
- GTPressuraMono は Adobe Fonts 依存。ライセンスがない環境では Roboto Mono で代替

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display / H1 | NotoSansJP-Bold | 100px | 700 | 120px (×1.2) | -3px | 巨大見出し。ヒーロー領域 |
| Heading 2 | NotoSansJP-Regular | 35px | 400 | 48px (×1.37) | normal | セクション見出し |
| Heading 3 / 説明 | NotoSansJP-Regular | 28px | 400 | 42px (×1.5) | normal | 説明文。color: #959595 |
| Label (mono) | GTPressuraMono | 14px | 400 | 17px (×1.21) | normal | セクションラベル "OUR DNA" 等。color: #959595 |
| CTA Label (mono) | GTPressuraMono | 14px | 400 | 17px | normal | "Contact us" 等。color: #0000d5 |
| Nav Button | NotoSansJP-Medium | 14px | 400 | 14px | normal | ナビゲーションボタン |
| Skip Link | NotoSansJP-Medium | 16px | 400 | 16px | normal | アクセシビリティ。bg: #000 / color: #fff |
| Footer Link | NotoSansJP-Regular | 14px | 400 | 14px | normal | color: #949799 or #000 |
| Body (base) | — | 10px | 400 | 10px (×1.0) | normal | body 基本値。実コンテンツはコンポーネント単位で上書き |

### 3.5 行間・字間

- **巨大見出しの行間 (line-height)**: 1.2（120px / 100px）
- **セクション見出しの行間**: 1.37（48px / 35px）
- **説明文の行間**: 1.5（42px / 28px）
- **巨大見出しの字間 (letter-spacing)**: -3px（負のトラッキングで詰める）
- **その他の字間**: normal

**ガイドライン**:
- 巨大タイポは負の letter-spacing で文字を詰め、インパクトを出す
- body の font-size: 10px は極小。実際のコンテンツはコンポーネント単位でサイズ指定
- 日本語説明文は 28px / lh: 1.5 で十分な可読性を確保

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定（明示的な指定は確認できず、一般的な設定を推奨） */
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

### 3.7 OpenType 機能

```css
font-feature-settings: "palt" 0; /* body では palt 無効（normal） */
```

- 実サイトでは body に `font-feature-settings: normal` を適用
- 巨大見出しでの palt 利用は未確認。-3px の letter-spacing で字詰めを実現

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary (Accept / CTA)**
- Background: `#0000d5`
- Text: `#ffffff`
- Border Radius: 5px
- Font Size: 14px（推定）
- Font Weight: 400

**Nav Button**
- Background: `transparent`
- Text: `#000000`
- Font Family: NotoSansJP-Medium
- Font Size: 14px
- Font Weight: 400

**Skip Link**
- Background: `#000000`
- Text: `#ffffff`
- Font Family: NotoSansJP-Medium
- Font Size: 16px

### Links

**CTA Link (mono)**
- Color: `#0000d5`
- Font Family: GTPressuraMono
- Font Size: 14px
- Text: "Contact us" 等

**Footer Link**
- Color: `#949799` (通常) / `#000000` (ホバー時推定)
- Font Size: 14px

### Cards

- 明示的なカードコンポーネントの定義なし
- セクション単位でフルスクリーンレイアウトを採用

### Inputs

- フォームの詳細仕様は抽出データに含まれず

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| 明示的なスペーシングトークンは確認できず | — |

※ セクション間はフルスクリーン / 大きな余白で構成。具体的な数値トークンは未定義

### Container

- Max Width: フルスクリーン基調（明示的な max-width は未確認）
- Padding (horizontal): セクションによりコンテンツ幅を制御

### Grid

- Columns: 明示なし（セクション単位のシングルカラムが基調）
- Gutter: 明示なし

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 基本的にフラット。シャドウは控えめ |

※ Droga5 のデザインはフラット基調。明示的な shadow トークンは確認できず

---

## 7. Do's and Don'ts

### Do（推奨）

- 巨大な見出し（100px クラス）で visual impact を出す
- letter-spacing: -3px で見出しを詰めてインパクトを強調する
- パステル系アクセントカラー（salmon, teal, pink）をポイント使いする
- GTPressuraMono をラベルやCTAに限定して使い、ブランド感を出す
- フォントは @font-face 名で指定する場合は必ず汎用フォールバックを含める

### Don't（禁止）

- body の font-size: 10px をそのまま本文に使わない（コンポーネントで必ず上書き）
- GTPressuraMono を本文に使わない（ラベル専用）
- パステルカラーを背景全体に使わない（アクセントとして部分的に使用）
- CTA Blue (`#0000d5`) を本文テキストに使わない（リンク・CTA 専用）
- 3つの Noto Sans JP ウェイトを混同しない（それぞれ独立した @font-face 名）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | 未確認 | モバイルレイアウト |
| Tablet | 未確認 | タブレットレイアウト |
| Desktop | 未確認 | デスクトップレイアウト |

※ 詳細なブレークポイント値は抽出データに含まれず

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準を推奨）

### フォントサイズの調整

- モバイルでは巨大見出し 100px を 40-60px 程度に縮小することを推奨
- 説明文 28px は 18-20px 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color (CTA): #0000d5
Text Color: #000000
Text Secondary: #959595
Background: #ffffff
Accent Salmon: #ffb78c
Accent Teal: #86d1bb
Accent Pink: #e4838f
Font (Display): "Noto Sans JP", sans-serif / 100px / 700 / ls: -3px
Font (Body): "Noto Sans JP", sans-serif / 28px / 400
Font (Mono Label): "Roboto Mono", monospace / 14px / 400
Body Base Size: 10px (override per component)
```

### プロンプト例

```
Droga5 のデザインシステムに従って、サービス紹介ページを作成してください。
- ヒーロー見出し: "Noto Sans JP" 700 / 100px / line-height: 1.2 / letter-spacing: -3px
- 説明文: "Noto Sans JP" 400 / 28px / line-height: 1.5 / color: #959595
- セクションラベル: "Roboto Mono" 400 / 14px / color: #959595 / 英字大文字
- CTAボタン: background: #0000d5 / color: #fff / border-radius: 5px
- アクセントカラー: #ffb78c, #86d1bb, #e4838f をポイント使い
- 背景: #ffffff / テキスト: #000000
```

### GTPressuraMono 代替について

実サイトでは Adobe Fonts ライセンスの GT Pressura Mono を使用している。ライセンスがない環境では以下で代替:

1. **Roboto Mono** (Google Fonts) — 推奨。ジオメトリック系モノスペースで近い雰囲気
2. **IBM Plex Mono** (Google Fonts) — もう少し温かみのある代替
