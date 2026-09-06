# DESIGN.md — ソラシドエア（Solaseed Air）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-03 / 対象: `https://www.solaseedair.jp/`, `/fare/`, `/baggage/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に **1書体（Murecho）だけ**で組み、色は**ピスタチオグリーンとリーフグリーンの2系統**に絞る。CTA は例外なく完全なピル（`border-radius: 176px`）。予約という業務フローを、彩度の高いライムで軽やかに見せる
- **密度**: 予約フォーム・運賃表・手荷物規定という情報量の多い実務 UI を、16px 本文・行間 1.6 でゆったり組む。航空会社サイトとしては余白が広い
- **キーワード**: ライムグリーン、完全ピル、単一書体、字間ゼロ、4pxグリッド

**このサイトの核心は3つある。**

1. **書体が Murecho 1本だけ。** 可視要素 1,222 個のうち **1,221 個が `Murecho, sans-serif`**。和文用の別スタックも欧文用の別スタックも存在しない
2. **`letter-spacing` が全要素 `normal`。** 1,222/1,222 が字間指定なし。**`palt` を適用している要素も 0 個**。日本語サイトとしては極端に「素の組版」に寄せている
3. **CSS Custom Properties が 237 個**。色は `--color-<系統>-<10〜1100>` の12段ランプ、余白は Tailwind 型の `--space-*`、角丸は `--radius-xs〜xl` で完全にトークン化されている

**ただし主色のトークンは実装とずれている。** `--color-brand-l: #64a70b` と宣言されているが、**CTA の面に実際に塗られているのは `#4d8008`（`--color-brand-l-800`）**。可視要素で `#64a70b` を持つものは **0 個**（CSS 中には 14 回出るが、すべて変数定義とその参照系）。**必ず実測値 `#4d8008` を使うこと。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | トークン | 実測 |
|------|--------|----------|------|
| **Leaf Green 800（実質の主色）** | **`#4d8008`** | `--color-brand-l-800` / `--color-leafgreen-800` | **可視 7要素の面 + 40要素の文字**。主要 CTA・アクティブタブ・スキップリンク |
| Leaf Green（名目上の主色） | `#64a70b` | `--color-brand-l` / `--color-leafgreen-600` | **可視 0要素**。宣言のみで描画されない |
| **Pistachio Green 600（アクセント）** | **`#c4d600`** | `--color-brand-p` / `--color-pistachiogreen-600` | 「会員登録」ピルとフッター著作権バーの2箇所のみ。**面積は小さいが最も彩度が高いブランド色** |
| Pistachio 400 | `#d7e351` | `--color-brand-p-400` | ヘッダー内の小チップ |
| Pistachio 300 | `#dde76b` | `--color-brand-p-300` | フッターのカテゴリ見出し面 |
| Pistachio 200 | `#e6ee94` | `--color-brand-p-200` | 「おすすめの情報」見出し面 |
| Pistachio 100 | `#f6f9d7` | `--color-brand-p-100` / `--color-background-accent` | セクションの淡い面 |
| Pistachio 10 | `#fbfcee` | `--color-brand-p-10` | 最も淡い面 |

> **緑は2系統あり、役割が違う。** 面に敷いて読ませる緑は**リーフグリーン（青みの深緑）**、目を引かせる差し色は**ピスタチオグリーン（黄緑）**。混同すると印象が崩れる。

### Ramp（12段のカラーランプ）

すべての系統が `10 / 50 / 100 / 200 / … / 1100` の12段で定義されている。実装で使うのは太字の段。

- **Pistachio Green**: `#fbfcee` `#f9fbe4` **`#f6f9d7`** **`#e6ee94`** **`#dde76b`** **`#d7e351`** `#cfde33` **`#c4d600`** `#b0c000` `#9cab00` `#758000` `#626b00` `#3a4000`
- **Leaf Green**: `#f4f9ee` `#eaf3de` `#d5e7bd` `#c1db9d` `#acd07c` `#92c154` `#73af23` `#64a70b` `#5a9609` **`#4d8008`** `#467407` `#3c6406` `#284204`
- **Solaseed Gray**（`#cdcec9`〜`#464741`）: 温かみのある独自グレー。実装では **`#707167`（700段）** が7要素で使われる。`--color-brand-g: #7e7f74`
- **Orange** `#ffc87a`〜`#714200` / **Yellow** `#fdf7ac`〜`#a79b05` / **Soft Yellow** `#fdf3cb`〜`#645728`
- **Mint Green** `#6affc1`（`--color-mintgreen-500` のみ。単段）

### Semantic（意味的な色）

- **Error / Alert** (`#d90f1c` / `--color-error` = `--color-red-400`): 注意書きの文字（可視 24要素）。淡色面は `#ffe5e6`（`--color-red-50`）
- **Important**（重要なお知らせ帯）(`#fbdb65` / `--color-important` = `--color-softyellow-600`): ページ最上部の告知バー
- **Success**: 専用トークンなし。リーフグリーン系で代用する

### Neutral（ニュートラル）

- **Text Primary** (`#4d4d4d` / `--color-type` = `--color-gray-700`): 本文。**可視 1,107 要素で圧倒的多数**
- **Link** (`#4d4d4d` / `--color-link`): **リンクも本文と同色**。色ではなく下線とアイコンで区別する設計
- **Background** (`#ffffff` / `--color-background`)
- **Background Accent** (`#f6f9d7` / `--color-background-accent`)
- **Surface Alt** (`#f2f2f2` / `--color-gray-50`): ニュースタグの面
- **Disabled / Inactive** (`#e6e6e6` / `--color-gray-100`): 非アクティブなタブ、無効ボタンの面。文字は `#999999`
- **Border** (`#7f7f7f` / `--color-border` = `--color-gray-500`): **ボタン・入力欄の枠。かなり濃い**
- **Border Light** (`#cccccc` / `--color-border-light`) / **Border Dark** (`#4d4d4d` / `--color-border-dark`)
- **Input Border** (`#666666` / `--color-input-border`)、ホバー時 `#333333`（`--color-input-border-hover`）
- グレースケール: `#f2f2f2` `#e6e6e6` `#cccccc` `#b3b3b3` `#999999` `#949494` `#7f7f7f` `#767676` `#666666` `#4d4d4d` `#333333` `#1a1a1a`

### カレンダー専用

- 日曜: `#d90f1c` / 土曜: `#150ba7` / 平日: `#4d4d4d`

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Murecho のみ**。Google Fonts のバリアブル日本語書体（ウェイト軸 100–900）
- **明朝体**: 定義なし・使用なし

> Murecho（ムレチョ）は Google Fonts で無償配布されているバリアブル和文書体。**preview.html でも実サイトと完全に同一の字形が再現できる**（Adobe Fonts 系のようなドメインライセンス制限がない）。

### 3.2 欧文フォント

- 和文と分けた欧文スタックは**存在しない**。Murecho の欧文グリフをそのまま使う
- 最終フォールバックは `sans-serif` のみ

### 3.3 font-family 指定

```css
/* サイト全体で唯一のスタック */
font-family: "Murecho", sans-serif;   /* --font-sans-serif */
```

**フォールバックの考え方**:
- **和文・欧文を分けない。** 数字も価格も便名も Murecho の欧文グリフで組む
- Murecho が落ちた場合の受け皿は generic の `sans-serif` だけ。**環境依存の和文フォント名（游ゴシック・ヒラギノ等）を足していない**
- 実装時に和文フォールバックを追加すると、Murecho 未読込時に字幅が変わりレイアウトがずれる。**足さないこと**

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Heading 1 | 36px | 700 | 1.5 (54px) | normal | 下層ページのページタイトル |
| Heading 2 | 30px | 700 | 1.5 (45px) | normal | セクション見出し |
| Heading 3 | 24px | 700 | 1.5 (36px) | normal | サブ見出し・運賃名 |
| Heading（本文欄外） | 24px | 400 | 1.6 (38.4px) | normal | モーダル見出し |
| Tab Label（大） | 20px | 700 | 1.4 (28px) | normal | ログイン方式タブ |
| Button / Tab | 18px | 700 | 1.5 (27px) | normal | 主要 CTA・予約タブ |
| Body | **16px** | 400 | **1.6 (25.6px)** | normal | 本文（既定） |
| Body Bold | 16px | 700 | 1.6 (25.6px) | normal | 強調・ラベル |
| Nav | 15px | 400 | 1.5 (22.5px) | normal | グローバルナビ |
| Nav Active | 15.2px | 700 | 1.4 (21.28px) | normal | ナビのアクティブ項目 |
| Caption | 14px | 400 | 1.4 (19.6px) | normal | 注釈 |
| Caption Loose | 14px | 400 | 1.6 (22.4px) | normal | 補足文 |
| Tag / Label | 14px | 700 | 1.6 (22.4px) | normal | ニュース種別タグ |
| Chip | 13px | 700 | 1.6 (20.8px) | normal | ヘッダー内チップ |
| Small | 12px | 700 | 1.4 (16.8px) | normal | 会員登録／ログインピル |

**トークン**（`clamp()` による流体スケールも用意されている）:

```css
--text-2xs: clamp(0.75rem, 0.693rem + 0.24vw, 0.875rem);   /* 12 → 14px */
--text-xs:  clamp(0.813rem, 0.727rem + 0.36vw, 1rem);      /* 13 → 16px */
--text-sm:  clamp(1rem, 0.943rem + 0.24vw, 1.125rem);      /* 16 → 18px */
--text-md:  clamp(1.125rem, 1.068rem + 0.24vw, 1.25rem);   /* 18 → 20px */
--text-lg:  clamp(1.25rem, 1.136rem + 0.48vw, 1.5rem);     /* 20 → 24px */
--text-xl:  clamp(1.438rem, 1.239rem + 0.85vw, 1.875rem);  /* 23 → 30px */
--text-2xl: clamp(1.625rem, 1.341rem + 1.21vw, 2.25rem);   /* 26 → 36px */
--text-3xl: clamp(1.75rem, 1.352rem + 1.7vw, 2.625rem);    /* 28 → 42px */
--text-base: 1rem;
```

固定値のトークンも `--10px`〜`--60px`（`0.625rem`〜`3.75rem`）で並列に用意されている。

**ウェイトは3段のみ**: `--font-normal: 400` / `--font-medium: 500` / `--font-bold: 700`。実測に現れるのは **400 と 700 の2段だけ**で、500 は宣言のみ。**見出しは一律 700。**

### 3.5 行間・字間

```css
--line-height-xs: 1.4;   /* 注釈・小さいラベル */
--line-height-sm: 1.5;   /* 見出し（H1〜H3 すべて） */
--line-height-md: 1.6;   /* 本文（既定） */
--line-height-lg: 1.8;   /* 宣言のみ */
--line-height-xl: 2.2;   /* 宣言のみ */
```

- **本文の行間**: **1.6**。日本語本文としてはやや締まった標準値
- **見出しの行間**: **1.5**。H1・H2・H3 がすべて同じ 1.5 で、サイズだけが変わる
- **字間**: **全要素 `normal`**（実測 1,222/1,222）。**見出しにも本文にも字間を入れない**

> **このサイトで字間を足してはいけない。** 見出しに `letter-spacing: 0.04em` のような「日本語の定石」を当てると、Murecho の設計字幅から外れて実サイトと別物になる。

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
word-break: normal;
line-break: strict;
```

- 運賃名・空港名は途中で折らない。`「東京（羽田）」` のような括弧つき地名は 1 かたまりで扱う
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* サイト全体。palt は使わない */
```

- **`palt` を適用している要素は 0 個**（DOM 全走査で確認）
- **`font-feature-settings` を足さないこと。** Murecho の設計どおりのベタ組みがこのブランドの組版

### 3.8 縦書き

該当なし。`writing-mode` は全要素 `horizontal-tb`。

---

## 4. Component Stylings

### Buttons

角丸は**完全ピル（176px）が基本**。`--radius-xl: 176px` は「実質 9999px」として使われている。

**Primary（`c-button-main`）— 主要 CTA**
- Background: `#4d8008`
- Text: `#ffffff`
- Padding: `16px 8px 16px 24px`（右側が狭いのは矢印アイコン分）
- Border Radius: `176px`
- Font: 18px / 700 / line-height 1.5
- Border: なし
- 右端に `--arrow`（SVG data URI の `>` 記号）を背景画像として置く

**Secondary（`c-button-second`）— 副次 CTA**
- Background: `#ffffff`
- Text: `#4d4d4d`
- Border: `1px solid #7f7f7f`
- Padding: `18px 20px`（矢印つきは `18px 8px 18px 20px`）
- Border Radius: `176px`
- Font: 14px / 700

**Accent（会員登録ピル）**
- Background: `#c4d600`
- Text: `#4d4d4d`
- Padding: `6px 10px`
- Border Radius: `176px`
- Font: 12px / 700

**Utility（ヘッダーの角丸ボタン）**
- Background: `#ffffff`
- Text: `#4d4d4d`
- Border: `1px solid #7f7f7f`
- Padding: `12px 4px`
- Border Radius: **`8px`**（ここだけピルではない）
- Font: 12px / 700

**Disabled**
- Background: `#e6e6e6` / Text: `#999999` / Border Radius: `176px` / Padding: `15px 66px 15px 24px`

### Tabs

**予約タブ（`p-reserve-tabs__btn`）— 上だけ丸い台形タブ**
- Border Radius: **`16px 16px 0px 0px`**
- Active: `#ffffff` / `#4d4d4d` ／ Inactive: `#e6e6e6` / `#4d4d4d`
- Padding: `12px 32px` / Font: 18px / 700

**ピルタブ（`p-tabs__btn`）**
- Border Radius: `176px` / Padding: `16px 40px` / Font: 20px / 700
- Active: `#4d8008` / `#ffffff` ／ Inactive: `#e6e6e6` / `#4d4d4d`

### Tags / Chips

- **ニュース種別タグ**: `#f2f2f2` 面 / `#4d4d4d` 文字 / radius `8px` / padding `8px 16px` / 14px 700
- **ヘッダーチップ**: `#d7e351` 面 / `#4d4d4d` 文字 / radius `8px` / padding `8px` / 13px 700

### Inputs

- Background: `#ffffff`
- Border: `1px solid #7f7f7f`
- Border (hover): `1px solid #333333`
- Border Radius: **`176px`（入力欄もピル）**
- Padding: `0px 16px`
- Font Size: `16px`
- Text: `#4d4d4d`

> **入力欄がピルであることがこのサイトの特徴。** 角丸 4px や 8px の一般的なフォーム UI に置き換えないこと。

### Cards / Panels

- Background: `#ffffff`
- Border Radius: `16px`（`--radius-m`）または `24px`（`--radius-l`）
- Shadow: `--pc-shadow-s`（下記 6 章）
- 淡色パネルの面: `#f6f9d7` / `#fbfcee`

### Notification Bars（ページ最上部の告知帯）

| 種別 | 背景 | 用途 |
|------|------|------|
| 重要なお知らせ | `#fbdb65` | 運航・システムに関する重要告知 |
| 注意 | `#ffe5e6` | 期限つきの注意喚起（文字 `#d90f1c`） |
| 通常 | `#f6f9d7` | 一般的なお知らせ |

---

## 5. Layout Principles

### Spacing Scale

Tailwind 型の 4px グリッド（`--space-0`〜`--space-96`）。

| Token | Value | | Token | Value |
|-------|-------|---|-------|-------|
| `--space-px` | 1px | | `--space-8` | 32px |
| `--space-0.5` | 2px | | `--space-10` | 40px |
| `--space-1` | 4px | | `--space-12` | 48px |
| `--space-2` | 8px | | `--space-16` | 64px |
| `--space-3` | 12px | | `--space-20` | 80px |
| `--space-4` | **16px** | | `--space-24` | 96px |
| `--space-5` | 20px | | `--space-32` | 128px |
| `--space-6` | 24px | | `--space-44` | **176px**（= pill radius） |

### Container

- **Max Width: 1200px**（実測で最頻出）
- ヘッダー高さ: **116px**（`--headerHeight`）
- 全幅セクション用に `--contentfull-margin` / `--contentfull-padding` が定義されている

### Border Radius Scale

```css
--radius-xs: 4px;
--radius-s:  8px;    /* ユーティリティボタン・タグ */
--radius-m:  16px;   /* カード・タブ上端 */
--radius-l:  24px;   /* 大きめのパネル */
--radius-xl: 176px;  /* ピル（CTA・入力欄・タブ） */
```

円形アイコンには `border-radius: 50%` を直接使う（実測 20要素）。

### Motion

```css
--ease: cubic-bezier(0.215, 0.61, 0.355, 1);
--opacity: 0.75;   /* ホバー時の不透明度 */
--scale: 1.03;     /* ホバー時の拡大率 */
```

---

## 6. Depth & Elevation

影は**極端に浅く、下方向にだけ落とす**（`spread` が大きな負値）。

| Level | Token | Shadow | 用途 |
|-------|-------|--------|------|
| 0 | — | `none` | 既定。ボタン・タグ・入力欄はすべて影なし |
| 1 | `--pc-shadow-s` | `0px 8px 10px -10px rgba(0,0,0,.25)` | カード（実測 6要素） |
| 2 | `--pc-shadow-m` | `0px 30px 30px -35px rgba(0,0,0,.25)` | 大きいパネル（実測 1要素） |
| 1(SP) | `--sp-shadow-m` | `0px 20px 30px -35px rgba(0,0,0,.25)` | モバイル用 |

> **ボタンに影を付けないこと。** 実測でも `interactive` 30件すべてが `box-shadow: none`。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-family` は `"Murecho", sans-serif` の1本だけを使う**
- **CTA・入力欄・ピルタブの角丸は `176px`（完全ピル）にする**
- **主色は `#4d8008`**（トークン名は `--color-brand-l-800`）。差し色に `#c4d600` を少量使う
- 本文は 16px / `line-height: 1.6` / `color: #4d4d4d`
- 見出しは H1〜H3 すべて `line-height: 1.5` / `font-weight: 700`
- 枠線は `#7f7f7f`（濃いグレー）。淡い枠が欲しいときだけ `#cccccc`
- 余白は 4px グリッド（`--space-*`）に載せる
- 色は12段ランプの中から選ぶ。中間色を自作しない

### Don't（禁止）

- **`letter-spacing` を足さない。** 見出しにも本文にも字間を入れない（実サイトは全要素 `normal`）
- **`font-feature-settings: "palt"` を足さない。** 実サイトの適用要素は 0 個
- **`--color-brand-l: #64a70b` を CTA に使わない。** 宣言はあるが可視要素で 0 件。使うのは `#4d8008`
- **和文フォントのフォールバック（游ゴシック・ヒラギノ等）を追加しない。** 字幅が変わりレイアウトが崩れる
- **リンクを青くしない。** リンク色は本文と同じ `#4d4d4d`（`--color-link`）
- **入力欄を角丸 4px にしない。** ピル（176px）がこのブランドの形
- ボタンに `box-shadow` を付けない
- 2つの緑（`#4d8008` / `#c4d600`）を入れ替えない。面に敷くのは深緑、差し色が黄緑

---

## 8. Responsive Behavior

### Breakpoints

CSS の `@media` に現れる境界値（実測）。

| Name | Width | 説明 |
|------|-------|------|
| SP | ≤ 575px | モバイル |
| SP Large | ≤ 640px | 大きめのモバイル |
| Tablet | ≤ 767px | タブレット |
| Tablet Large | ≤ 1023px | 横向きタブレット |
| Desktop | ≥ 1024px | デスクトップ |
| Wide | ≥ 1200px | コンテナ最大幅に到達 |
| Extra Wide | ≥ 1400px | 最大 |

主要な境界は **576 / 768 / 1024 / 1200 / 1400px**（600 / 640 も補助的に使われる）。

### タッチターゲット

- 主要 CTA の実高: `18px × 1.5 + 16px × 2 = 59px` — 44px 基準を余裕をもって満たす
- ヘッダーの小ピル（12px / padding 6px 10px）は SP では拡大して 44px を確保する

### フォントサイズの調整

- `--text-*` の `clamp()` が viewport 幅に応じて自動で縮小する（例: H2 相当の `--text-xl` は 30px → 23px）
- 固定値で組む場合は本文 16px を維持し、見出しのみ 70〜80% に縮める

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:   #4d8008   (deep leaf green — CTA・アクティブタブ)
Accent Color:    #c4d600   (pistachio green — 差し色・会員登録)
Text Color:      #4d4d4d
Link Color:      #4d4d4d   (本文と同色。下線で区別)
Background:      #ffffff
Accent Surface:  #f6f9d7
Border:          #7f7f7f
Error:           #d90f1c
Important:       #fbdb65
Font:            "Murecho", sans-serif   (1書体のみ)
Body Size:       16px
Line Height:     1.6 (本文) / 1.5 (見出し)
Letter Spacing:  normal   (足さない)
Button Radius:   176px    (完全ピル)
Card Radius:     16px
Container:       1200px
```

### プロンプト例

```
ソラシドエアのデザインシステムに従って、搭乗者情報の入力フォームを作成してください。

- フォント: "Murecho", sans-serif のみ（和文フォールバックを足さない）
- letter-spacing は指定しない（全要素 normal）
- font-feature-settings も指定しない（palt を使わない）
- 本文 16px / line-height: 1.6 / color: #4d4d4d
- ラベルは 16px / font-weight: 700
- 入力欄: 背景 #ffffff、border 1px solid #7f7f7f、border-radius 176px、padding 0 16px、font-size 16px
- 送信ボタン: 背景 #4d8008、文字 #ffffff、border-radius 176px、padding 16px 24px、18px/700
- 戻るボタン: 背景 #ffffff、文字 #4d4d4d、border 1px solid #7f7f7f、border-radius 176px、14px/700
- エラーメッセージ: 文字 #d90f1c、背景 #ffe5e6
- 余白は 4px グリッド（8 / 16 / 24 / 32px）
- ボタンに box-shadow は付けない
- コンテナ幅 1200px
```
