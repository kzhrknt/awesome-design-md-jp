# DESIGN.md — PayPay (paypay.ne.jp)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> PayPay株式会社（QRコード決済「PayPay」公式サイト）。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: フィンテック新興ブランドの「親しみやすさ × 行動喚起」。**巨大な見出し**（ヒーロー H1 が 55px、Hero line-height 88px = ×1.6）+ 太い 700 ウェイトで、強くて明るいキャンペーン感を出す
- **密度**: 余白を大きめに、行間 ×1.6〜2.0 でゆったりめ。CTA は PayPay Blue `#3895FF` のラウンド角で目立たせる
- **キーワード**: Friendly, Bold Headlines, Vivid Blue + Red Accent, Campaign-driven

---

## 2. Color Palette & Roles

PayPay は **CSS Custom Properties としてのデザイントークンを持たない**（観測できる 47 個の `--wp--preset-*` は WordPress Gutenberg のデフォルト値）。実測値からトークンを起こす必要がある。

### Brand Colors

| Role | Hex | 備考 |
|------|-----|------|
| **PayPay Blue** | `#3895FF` | プライマリ CTA・リンク・現在状態。明るいスカイブルー |
| Blue (Visited / Logo Hover) | `#214DD2` | Visited link 等で観測される濃いブルー |
| **PayPay Red** | `#F24F4F` | アクセント。重要見出しのテキスト色。"登録ユーザー ついに7,300万人到達！" 等 |
| Red Accent (Tag) | `#FD5C5C` | 主催ラベル等の朱赤 |
| Cookie Consent Green | `#346E4A` | 3rd party 由来（"すべて許可する" ボタン色）。ブランド外 |

### Text

| Role | Hex | 備考 |
|------|-----|------|
| Text Primary | `#242323` | 本文・見出し（純黒ではなく深い暖色寄りの黒） |
| Text Sub | `#606060` | キャプション・日付・メタ情報 |
| Text Cookie Modal | `#696969` | クッキー等説明文（3rd party） |

### Background

| Role | Hex | 備考 |
|------|-----|------|
| Page | `#FFFFFF` | 白基調 |
| Subtle | `#EEEEEE` | カテゴリヘッダー等の薄背景 |

### Tag Color System

PayPay 特有の **タグカラー体系**（カテゴリ別に色を割り当て）:

| Tag | Background | Text | 用途 |
|-----|-----------|------|------|
| きせかえ | `#D9B0EC` | `#7921A3` | カードきせかえ |
| キャンペーン | `#BBCFF2` | `#002970` | キャンペーン |
| 外部主催 | `#FFFFFF` (white) | `#3895FF` | 外部パートナー主催 |
| PayPay主催 | `#FFFFFF` (white) | `#FD5C5C` | 自社主催（赤） |

それぞれ「色相が濃い背景 + 同系の濃い文字」または「白背景 + ブランドカラーの文字」という二つの形で運用。

---

## 3. Typography Rules

### 3.1 和文フォント

PayPay の和文スタックは **Hiragino Kaku Gothic ProN を最先頭** とする伝統的な指定:

```css
/* Body 用 */
font-family:
  "Hiragino Kaku Gothic ProN",
  "ヒラギノ角ゴ ProN W3",
  Meiryo,
  ...sans-serif;

/* 主要な見出し（H1, H2, H3）用 — Noto Sans JP を最先頭に切り替え */
font-family:
  "Noto Sans JP",
  "Hiragino Kaku Gothic ProN",
  "ヒラギノ角ゴ ProN W3",
  Meiryo,
  ...sans-serif;
```

**特徴**:
- **ProN（JIS90 字形）** を採用。UNIQLO や Apple Japan が使う Pro（JIS78）とは別の字形
- 見出しは **Noto Sans JP に切り替え**、body は Hiragino をベースに使う
- 領域ごとに stack を切り替える設計

### 3.2 欧文フォント

- "SCROLL" 等の Display 用に **Futura** が指定されている: `font-family: Futura, "Trebuchet MS", Arial, sans-serif`
- それ以外は和文スタックの後段にある汎用 sans-serif で対応

### 3.3 font-family 指定（まとめ）

```css
/* Body（本文・footer 等） */
font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo, sans-serif;

/* Major Headings（H1〜H3） */
font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo, sans-serif;

/* Display 英字（"SCROLL" 等の装飾） */
font-family: Futura, "Trebuchet MS", Arial, sans-serif;
```

**フォールバックの考え方**:
- ヒラギノを最優先する古典的な Web デザイン感（ProN 採用は珍しい）
- 主要見出しでのみ Web フォント Noto Sans JP を読み込む（ロード負荷を抑制）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Hero H1** | Noto Sans JP | **55px** | 700 | **88px (×1.6)** | normal | "スマホひとつでかんたんに…" / 白文字 |
| H2 (Major) | Noto Sans JP | 42px | 700 | 67.2px (×1.6) | normal | "PayPayってどんなサービス？" |
| H2 (Section) | Noto Sans JP | 36px | 700 | 57.6px (×1.6) | normal | "本人確認で…" |
| H2 (Smaller) | Noto Sans JP | 35px | 700 | 56px (×1.6) | normal | "最短1分！今すぐ始めよう" |
| H2 (FAQ) | Noto Sans JP | 34px | 700 | 54.4px (×1.6) | normal | "よくある質問" |
| H3 (Highlight) | Noto Sans JP | 35px | 700 | 56px (×1.6) | normal | "登録ユーザー…7,300万人到達！" / **color #F24F4F (赤)** |
| H3 (Sub) | Noto Sans JP | 20px | 700 | 34px (×1.7) | normal | "全国のお店で使える" |
| H1 (Sub Page) | Hiragino ProN | 32-40px | 700 | 56px (×1.4-1.75) | normal | サブページタイトル |
| Body | Hiragino ProN | 16px | 400 | 22.4px (×1.4) | normal | 標準本文 |
| Body Large | Noto Sans JP | 18-20px | 400 | 32-36px (×1.8-2.0) | normal | "おサイフを持ち歩かなくても…" |
| Caption | Hiragino ProN | 12px | 400 | 16.8px (×1.4) | normal | 注釈・日付。color #606060 |
| Tag Label | Hiragino ProN | 12px | 700 | 12px (×1.0) | normal | カテゴリラベル |
| FAQ Question | Noto Sans JP | 16px | 400 | 25.6px (×1.6) | normal | アコーディオン項目 |
| Display SCROLL | Futura | 16px | 700 | 25.6px | normal | "SCROLL" / **color #F24F4F** |

### 3.5 行間・字間

- **letter-spacing**: 全要素 `normal`（ベタ組）
- **line-height**:
  - **見出しは ×1.6** が基本（55/88, 42/67.2, 36/57.6, 34/54.4 すべて 1.6）
  - **本文（小）は ×1.4**（16/22.4）— body デフォルトはタイト目
  - **本文（大）は ×1.8〜2.0**（20/32, 18/36）— 重要なリード文は広め
  - **Caption は ×1.4**（12/16.8）

PayPay は **見出しウェイトを 700 に統一**し、サイズと色（赤・黒）でメリハリを付ける設計。

### 3.6 禁則処理・改行ルール

明示的指定なし。

### 3.7 OpenType / 特殊機能

- `font-feature-settings` 明示指定なし（normal）
- `palt` 不使用

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary CTA（PayPay Blue ボタン）**
- Background: `#3895FF`
- Color: `#FFFFFF`
- Border Radius: **6px**（やや柔らかい角丸）
- Font Family: Noto Sans JP
- Font Size: 16px
- Font Weight: 700
- Line Height: 25.6px

```css
.btn-primary {
  background: #3895ff;
  color: #fff;
  border-radius: 6px;
  font-weight: 700;
  font-size: 16px;
  padding: 14px 28px;
  border: none;
}
```

**Inline Link**
- Color: `#3895FF`
- Underline 無し（テキストカラー区別のみ）
- "使えるお店をみる" 等のテキストリンク

**Header Logo Link**
- Color: `#214DD2`（やや濃いブルー、visited 状態）

### Tag Labels

```css
.tag-kisekae   { background: #d9b0ec; color: #7921a3; }
.tag-campaign  { background: #bbcff2; color: #002970; }
.tag-external  { background: #fff;     color: #3895ff; }
.tag-organizer { background: #fff;     color: #fd5c5c; }

.tag {
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  border-radius: 4px;
  padding: 4px 8px;
}
```

### Cards

- Article List Card: 白背景 + タグ + 14px 700 タイトル + 12px 400 日付（#606060）
- カード自体に明示的な border-radius / border は持たず、画像と余白で区切る

### Search Form

- 検索ボタンは `font-family: Arial`（システムデフォルト）になっており、フォーム要素は OS デフォルトに任せる傾向

---

## 5. Layout Principles

### Spacing

- セクション間に大きな縦余白
- ヒーローは大型ビジュアル + 巨大見出し
- 商品紹介は 3〜4 カラムカードグリッド

### Grid

- ヘッダー高さ: 不明（観測時に固定）
- フッター: 暗い背景 + 白文字

---

## 6. Depth & Elevation

明示的な box-shadow は観測されず。色面とサイズで奥行き表現。

---

## 7. Do's and Don'ts

### Do（推奨）

- 主要 CTA は **PayPay Blue `#3895FF` + radius 6px** のラウンドボタン
- 見出し（H1〜H2）は **Noto Sans JP 700 / line-height ×1.6**
- 強調テキスト（数字・ハイライト）は **PayPay Red `#F24F4F`**
- 本文は **Hiragino Kaku Gothic ProN**（ProN — JIS90 字形）を使う
- カテゴリタグは **背景色 + 同系色の濃い文字** または **白背景 + ブランドカラーの文字**
- 数字（"7,300万人"）等は赤で大きく見せる

### Don't（禁止）

- letter-spacing をいじらない（PayPay は normal で統一）
- 見出しウェイトを 600 や 500 にしない（700 で統一）
- ProN の代わりに Pro を使わない（PayPay は ProN 採用）
- ボタンの border-radius を 0 や 9999px にしない（6px がブランド）
- 派手なシャドウやグラデーションを使わない（フラット基調）

---

## 8. Responsive Behavior

明示的なブレークポイントは抽出データに含まれず。一般的なEC・キャンペーン系（モバイル 〜767px / タブレット 768〜1024px / デスクトップ 1025px〜）を推奨。

### モバイル時

- Hero H1 55px → 32px 程度に縮小
- セクション H2 42px → 24-28px 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
# Brand
PayPay Blue (CTA):    #3895FF
Blue Visited:         #214DD2
PayPay Red:           #F24F4F   ← 強調テキスト
Red Accent (Tag):     #FD5C5C

# Text
Text Primary:         #242323   (純黒ではない)
Text Sub:             #606060

# Tag Colors
Kisekae:              bg #D9B0EC / color #7921A3
Campaign:             bg #BBCFF2 / color #002970
External:             bg white   / color #3895FF
Organizer:            bg white   / color #FD5C5C

# Typography
Body Stack:           "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo, sans-serif
Heading Stack:        "Noto Sans JP", "Hiragino Kaku Gothic ProN", ...
Display EN:           Futura, "Trebuchet MS", Arial, sans-serif
Hero H1:              55px / 700 / lh 88px (×1.6)
H2 Major:             42px / 700 / lh 67.2px (×1.6)
H2:                   34-36px / 700 / lh ×1.6
Body:                 16px / 400 / lh 22.4px (×1.4)
letter-spacing:       全 normal（ベタ組）

# Components
Primary Button:       bg #3895FF / color #fff / radius 6px / 16px 700
Tag Label:            12px / 700 / lh 12px / radius 4px
```

### プロンプト例

```
PayPay のデザインシステムに従って、新規ユーザー向けキャンペーンページを作成してください。

- 本文 font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo, sans-serif
- 見出し font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", ...
- ヒーロー H1: 55px / 700 / line-height 88px (×1.6) / color: #fff (on hero bg)
- セクション H2: 42px / 700 / line-height 67.2px / color: #242323
- 数字ハイライト: 35px / 700 / color #F24F4F (PayPay Red)
- 本文: 16px / 400 / line-height 22.4px (×1.4) / color #242323
- リード文: 20px / 400 / line-height 32px (×1.6)
- Primary CTA: bg #3895FF / color #fff / border-radius 6px / 16px 700
- カテゴリタグ: bg + 濃い同系色文字 / 12px 700 / radius 4px
- letter-spacing: 全要素 normal
- ProN（JIS90 字形）採用に注意（Pro ではない）
```

### CSS Custom Properties について

PayPay の `:root` に定義された 47 個の `--wp--preset-*` 変数は **WordPress Gutenberg のデフォルト値** であり、PayPay 独自のデザイントークンではありません。AI エージェントは「これらは WordPress テンプレートの遺物」と理解し、上記の実測値ベースのトークンを使うべきです。

PayPay 自身は CSS Custom Properties としてのデザインシステムを公開しておらず、デザイントークンは BEM 形式の class 名（`mainButton__button`, `campaign__title` など）に直接エンコードされています。
