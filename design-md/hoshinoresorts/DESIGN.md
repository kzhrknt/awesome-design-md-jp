# DESIGN.md — Hoshino Resorts (hoshinoresorts.com)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 株式会社星野リゾート コーポレートサイト。

---

## 1. Visual Theme & Atmosphere

星野リゾートは **コーポレート / リクルートで全く異なるデザインシステムを持つ** マルチブランド戦略の好例です。サブブランド（虹夕諾雅・界・リゾナーレ・OMO・BEB）はそれぞれ別ドメイン・別デザインで展開されている。

### A. Corporate Site（hoshinoresorts.com トップ・aboutus）

- **デザイン方針**: 余白と写真主導のミニマル。Noto Sans JP の細身（Regular〜Medium）でブランド全体を整える
- **密度**: ゆったり。装飾を抑えて宿泊体験の写真を主役にする
- **キーワード**: Minimal, Photographic, Clean, Corporate, Multi-brand Hub

### B. Recruit Site（hoshinoresorts.com/recruit/）

- **デザイン方針**: クラフト感のある暖色系。クリーム背景 (`#fcf5ef`) + 巨大な英字 Display フォント（Mohave 120px）でファッション誌的な編集デザイン
- **密度**: 余白を大胆に取り、英字見出しと和文本文の対比で「読ませる」設計
- **キーワード**: Editorial, Warm, Crafted, Magazine-style, Bold Display Type

---

## 2. Color Palette & Roles

### Corporate Site

| Role | Hex | 備考 |
|------|-----|------|
| Background | `#FFFFFF` | ページ背景 |
| Text Primary | `#000000` | 純黒の本文 |
| Text Heading | `#1A1A1A` | わずかにソフトな見出し色 |
| Hamburger Bg | `#333333` | ハンバーガーメニュー背景 |
| Default Link | `#0000EE` | ブラウザデフォルト青（明示色なし） |

### Recruit Site

| Role | Hex | 備考 |
|------|-----|------|
| Background | `#FCF5EF` | クリーム系の暖色背景（特徴的） |
| Text | `#080808` | ほぼ黒（純黒より少し暖かい） |
| Tag Background | `#E3E0DD` | 薄いベージュグレーのタグ背景 |
| Primary CTA | `#D95300` | 暖色のオレンジレッド |
| Albert Sans Default | `#080808` | コピーライト等の英字 |

### Multi-Brand Color Hint

実サイトでは触れられないが、サブブランド（hoshinoya / kai / risonare / omo / beb）はそれぞれ独自カラーを持つ。コーポレートサイト自体は中立的な白＋黒に統一されており、サブブランドの色を主張しないハブ的役割。

---

## 3. Typography Rules

### 3.1 和文フォント

#### Corporate Site

```css
/* Next.js の自己ホスト Noto Sans JP（ハッシュ化された変数名） */
font-family:
  __Noto_Sans_JP_b9e232,
  __Noto_Sans_JP_Fallback_b9e232,
  sans-serif;
```

- Next.js の `next/font/google` で Noto Sans JP を自己ホスト → 変数名にハッシュ付き
- AI エージェント向けに復元すれば: `"Noto Sans JP", sans-serif`

#### Recruit Site

```css
font-family:
  "Noto Sans JP",
  "Noto Sans",
  MyYuGothicM,
  游ゴシック,
  "Yu Gothic",
  ...sans-serif;
```

- Noto Sans JP 最先頭、続いて欧文 Noto Sans、Windows 用 MyYuGothicM、macOS 游ゴシック

### 3.2 欧文フォント

#### Recruit Site の特徴

- **Mohave** (Google Fonts): 巨大英字 Display 用（120px / 600 / `letter-spacing: -4.8px`）
- **Albert Sans** (Google Fonts): フッター英字（Copyright 表記等）

```css
/* Recruit ヒーロー見出し */
font-family: Mohave, sans-serif;
font-size: 120px;
font-weight: 600;
letter-spacing: -4.8px; /* ≈ -0.04em の負トラッキング */

/* Recruit フッター英字 */
font-family: "Albert Sans", sans-serif;
```

#### Corporate Site

欧文専用フォントは指定されておらず、Noto Sans JP のラテン部分が出る。

### 3.3 font-family 指定（まとめ）

```css
/* Corporate body */
font-family: "Noto Sans JP", sans-serif;

/* Recruit body */
font-family: "Noto Sans JP", "Noto Sans", MyYuGothicM, 游ゴシック, "Yu Gothic", sans-serif;

/* Recruit display (English) */
font-family: Mohave, sans-serif;

/* Recruit footer (English) */
font-family: "Albert Sans", sans-serif;
```

### 3.4 文字サイズ・ウェイト階層

#### Corporate Site

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Body | 16px | 400 | normal | normal | 本文 |
| Page Lead | 28px | 500 | 42px (×1.5) | normal | "私たち、星野リゾートについて" |
| Nav | 16px | 400 | normal | 0.32px (≈0.02em) | グローバルナビ |
| Hamburger Item | 14px | 400 | normal | 0.32px | ドロワーメニュー |
| Footer Link | 12px | 500 | normal | normal | 約款・ポリシー |

#### Recruit Site

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (EN) | Mohave | 120px | 600 | 120px (×1.0) | -4.8px (≈-0.04em) | "CONTENTS" 等 |
| Lead Heading | Noto Sans JP | 32px | 700 | 57.6px (×1.8) | normal | "星野リゾートの歩み" |
| Subhead | Noto Sans JP | 20px | 700 | 36px (×1.8) | normal | フッターナビ見出し |
| Card Title | Noto Sans JP | 18px | 500 | 32.4px (×1.8) | normal | "新卒採用イベント…" |
| Body (large) | Noto Sans JP | 16px | 500 | 32px (×2.0) | normal | "これまで味わったことのない…" |
| Body (default) | Noto Sans JP | 16px | 500 | 28.8px (×1.8) | normal | コンテンツ説明 |
| Body (small) | Noto Sans JP | 14px | 400 | 25.2px (×1.8) | **0.84px (≈0.06em)** | base font。ナビ・補足 |
| Caption (EN) | Albert Sans | 11px | 500 | 19.8px (×1.8) | 0.84px (≈0.08em) | Copyright |

### 3.5 行間・字間

#### Corporate Site
- **行間**: ほぼ `normal`（ブラウザデフォルト）
- **字間**: ナビは `0.32px` (≈0.02em)、本文は normal

#### Recruit Site
- **行間**: 一律 **×1.8** が基本ルール（25.2/14, 28.8/16, 32.4/18, 36/20, 57.6/32 すべて 1.8）
- **字間**: body level で **0.84px (≈0.06em)** の特徴的なプラストラッキング — 編集デザイン的な余裕を出す
- **Display 英字**: -4.8px の負トラッキング — Mohave の太字を字詰めしてインパクトを出す

### 3.6 禁則処理・改行ルール

特殊な指定なし（ブラウザデフォルト）。

### 3.7 OpenType / 特殊機能

- `font-feature-settings` の明示指定なし（normal）
- `palt` 不使用

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

#### Corporate
- **Hamburger Item**: bg #333 / color #fff / 14px / radius 0
- **Default Link**: ブラウザデフォルトの #0000EE（明示色指定なし）

#### Recruit
- **Primary CTA**: bg `#D95300` / color #fff / 14px / radius 0（暖色のオレンジ）
- **Tag Pill**: bg `#E3E0DD` / color #080808 / 11px 500 / **radius 15px**（柔らかい角丸）
- **Carousel Button**: bg #080808 / radius 6px

### Cards

Recruit サイトは **`#fcf5ef` クリーム背景 + `#e3e0dd` タグ + 写真** の組み合わせでカード状コンテンツを構成。

### Navigation

- Corporate: 横並びテキストナビ + ハンバーガーメニュー（bg #333）
- Recruit: 上部固定ヘッダー + ENTRY ボタン（角丸ナシ）

---

## 5. Layout Principles

- Corporate: 中央寄せ + 写真主体のフルブリードヒーロー
- Recruit: 編集デザイン的な不規則レイアウト。巨大英字を背景的に配置し、和文を前景に重ねる

### Multi-Brand Hub

コーポレートサイトは **サブブランドへのハブ** として設計され、各ブランドサイトへの誘導が主機能:
- hoshinoya.com（虹夕諾雅 / 高級リゾート）
- kai-ryokan.jp（界 / 温泉旅館）
- risonare.com（リゾナーレ / リゾートホテル）
- omo-hotels.com（OMO / 都市観光ホテル）
- beb-hotels.com（BEB / カジュアル）

各サブブランドは独自カラー・独自タイポグラフィ。コーポレートはそれを邪魔しない中立色で統一。

---

## 6. Depth & Elevation

- 基本フラット
- 写真によって視覚的奥行きを作る（box-shadow ではない）

---

## 7. Do's and Don'ts

### Do（推奨）

- コーポレートは **Noto Sans JP のみ + 白黒中心** で中立的に保つ（サブブランドの色を主張しない）
- リクルートは **クリーム背景 #fcf5ef + 暖色オレンジ #d95300** で編集デザイン感を出す
- リクルートの Display は **Mohave 120px + 負の letter-spacing** で大胆に組む
- リクルートの本文は **letter-spacing 0.06em** で余裕を持たせる
- 行間は **×1.8** を基本ルールにする（リクルート系）

### Don't（禁止）

- コーポレートにサブブランドカラーを持ち込まない（虹夕諾雅の濃紺・界の朱赤等は使わない）
- コーポレートサイトに装飾的なフォントを混ぜない
- リクルートに白背景を使わない（暖色クリームが基調）
- letter-spacing を負にしない（Display の英字以外）

---

## 8. Responsive Behavior

明示的なブレークポイントは抽出データに含まれず。一般的なコーポレートサイト基準（モバイル 〜767px / タブレット 768〜1024px / デスクトップ 1025px〜）を推奨。

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
# Corporate Site
Background:       #FFFFFF
Text Primary:     #000000 / Heading: #1A1A1A
Font:             "Noto Sans JP", sans-serif
Body:             16px / 400 / lh normal / ls normal
Page Lead:        28px / 500 / lh 42px (×1.5)
Nav:              16px / 400 / ls 0.32px (0.02em)

# Recruit Site
Background:       #FCF5EF (cream / 暖色)
Text:             #080808
CTA:              #D95300 (warm orange)
Tag Bg:           #E3E0DD
Body Font:        "Noto Sans JP", "Noto Sans", MyYuGothicM, 游ゴシック, sans-serif
Display Font:     Mohave, sans-serif (English only)
Footer EN:        "Albert Sans", sans-serif
Body:             14px / 400 / lh 25.2px (×1.8) / ls 0.84px (0.06em)
Display:          120px / 600 / ls -4.8px (-0.04em) / Mohave
Heading:          32px / 700 / lh 57.6px (×1.8)
LH ratio:         一律 ×1.8 が基本
```

### プロンプト例

```
星野リゾートのリクルートサイトのデザインに従って、新卒採用ページを作成してください。

- 背景: クリーム色 #FCF5EF
- 本文: "Noto Sans JP" 14px / 400 / line-height 25.2px (×1.8) / letter-spacing 0.84px (≈0.06em) / color #080808
- 見出し: "Noto Sans JP" 32px / 700 / line-height 57.6px (×1.8) / color #080808
- Display 英字: Mohave 120px / 600 / letter-spacing -4.8px / color #080808
- フッター英字: "Albert Sans" 11px / 500 / letter-spacing 0.84px
- CTA: bg #D95300 / color #fff / radius 0
- タグ: bg #E3E0DD / color #080808 / radius 15px
- 行間は一律 ×1.8 ルール
- 編集デザイン感を出すため body letter-spacing は 0.06em の特徴的なプラストラッキング
```

### マルチブランド戦略について

星野リゾートのデジタル展開は **「コーポレートを中立に保ち、サブブランド側で強い個性を出す」** 二段構成です。コーポレートサイトで AI に何かを作らせるときは、サブブランドカラーを混入させない注意が必要。サブブランドサイト（hoshinoya / kai / risonare / omo / beb）はそれぞれ別の DESIGN.md を要する別プロジェクトと考えるのが正しい。
