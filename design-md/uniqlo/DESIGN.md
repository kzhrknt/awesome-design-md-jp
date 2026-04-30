# DESIGN.md — UNIQLO Japan (uniqlo.com/jp/ja)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 株式会社ユニクロ（ファーストリテイリング傘下）日本公式 EC サイト。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 大規模 EC のグローバルデザインシステム。本文・見出しは細身（font-weight: 300）+ ベタ組のミニマルなタイポグラフィで、商品の写真と価格を主役にする
- **密度**: 商品グリッド主体で密度高め。だが余白の取り方は丁寧で、価格の赤や黒ボタンのみがアクセントになる落ち着いた構成
- **キーワード**: Minimal, Photo-First, Light Weight, Square Corners, Enterprise

---

## 2. Color Palette & Roles

UNIQLO は **Default / Hover / Pressed の状態 × Primary / Secondary / Tertiary / Accent / Attention / Positive / Error / Inactive の役割** という 2 軸でセマンティックトークンを定義している。総数 979 の Custom Properties。

### Primary（ブランドカラー）

- **Brand Red / Attention / Error** (`#e00` = `#ee0000`): UNIQLO シグネチャー赤。価格表示・SALE・エラー・注意喚起
- **Attention Hover** (`#ef5555`): ホバー時のソフト赤
- **Attention Pressed** (`#ff728d`): プレス時のさらに薄い赤

### Accent（アクセントブルー）

- **Accent Default** (`#005db5`): リンク・通知・フォーカスリング
- **Accent Hover** (`#006ed7`)
- **Accent Pressed** (`#007aff`)

### Background（背景・状態）

```css
--backgroundPrimaryDefault:   #000;     /* 黒 = Primary CTA */
--backgroundPrimaryHover:     #2a2a2a;
--backgroundPrimaryPressed:   #3e3e3e;

--backgroundSecondaryDefault: #6a6a6a;
--backgroundSecondaryHover:   #767676;
--backgroundSecondaryPressed: #ababab;

--backgroundTertiaryDefault:  #f4f4f4;  /* 薄いグレー背景 */
--backgroundTertiaryHover:    #fafafa;
--backgroundTertiaryPressed:  #fafafa;

--backgroundNeutralDefault:   #fff;
--backgroundNeutralHover:     #f4f4f4;
--backgroundNeutralPressed:   #dadada;

--backgroundInactiveDefault:  #dadada;
--backgroundPositiveDefault:  #00ab0f;  /* Success 緑 */
--backgroundPositiveHover:    #34bc3f;
--backgroundPositivePressed:  #55c75e;
```

### Text（テキスト）

```css
--body-standard-color-primary-dark:    #000;     /* 通常本文 */
--body-standard-color-primary-hover:   #2a2a2a;
--body-standard-color-secondary:       #6a6a6a;  /* サブテキスト */
--body-standard-color-disabled:        #ababab;
--body-standard-color-placeholder:     #767676;
--body-standard-color-error:           #e00;
--body-standard-color-promotional:     #e00;     /* SALE 文字色 */
```

### Border

```css
--border-primary-outline-color:    #000;     /* 通常 outline */
--border-secondary-color:          #6a6a6a;
--border-lines-color:              #dadada;  /* 区切り線 */
--border-focus-color:              #005db5;  /* フォーカスリング */
--border-error-color:              #e00;
--border-noticeable-color:         #005db5;  /* 通知 */
--border-selected-color:           #000;     /* 選択中サイズ・色 */
--border-interactive-outline-color: #767676;
```

### 役割サマリ

- **Primary**: `#000`（黒・最重要 CTA）
- **Brand Red**: `#ee0000`（価格・SALE・エラー）
- **Accent Blue**: `#005db5`（リンク・通知・フォーカス）
- **Body Text**: `#000`（基本本文）
- **Sub Text**: `#6a6a6a`（補助）
- **Border / Divider**: `#dadada`
- **Surface Tertiary**: `#f4f4f4`（カード・薄い背景）

---

## 3. Typography Rules

### 3.1 和文フォント

UNIQLO の和文タイトルスタックは:

```css
--title-font-ja:
  "ヒラギノ角ゴ Pro",
  "Hiragino Kaku Gothic Pro",
  "Hiragino Sans",
  "Noto Sans CJK JP",
  Osaka,
  ...sans-serif;
```

- **ヒラギノ角ゴ Pro** が最優先。**ProN ではなく Pro** を使う（Apple Japan と同じ思想で、JIS78 字形を優先）
- **Hiragino Sans**: macOS 10.11 以降の新名称
- **Noto Sans CJK JP**: Linux 等のフォールバック
- **Osaka**: 古い macOS 互換

明朝体は使用していない。

### 3.2 欧文フォント

UNIQLO は独自の **UniqloPro** ファミリ（Light / Regular / Bold）を Web フォントで配信している。

```css
--light-font-en:    UniqloProLight, system-ui, -apple-system, sans-serif;
--regular-font-en:  UniqloProRegular, sans-serif;
--title-font-en:    UniqloProBold, system-ui, -apple-system, sans-serif;
--body-font-en:     "Twemoji Country Flags", "Helvetica Neue", Helvetica, Arial, system-ui, -apple-system, ...
```

- **UniqloProRegular** は価格表示（`¥1,990` 等）で使われる
- **UniqloProBold** は英字タイトルで使う想定（実 H1 は `visually-hidden` で見えないことが多い）
- **letter-spacing for UniqloPro**: `--letter-spacing-uniqlo-pro: 0.025rem`（≈0.4px）

### 3.3 font-family 指定

```css
/* Body 本文（和文） */
font-family:
  "Twemoji Country Flags",
  "ヒラギノ角ゴ Pro",
  "Hiragino Kaku Gothic Pro",
  "Hiragino Sans",
  "Noto Sans CJK JP",
  Osaka,
  system-ui,
  -apple-system,
  sans-serif;

/* 価格・Latin 数字（UniqloPro） */
font-family: UniqloProRegular, sans-serif;

/* 多言語対応（ja / en / th / vi で stack を切り替え） */
--body-font-en: "Twemoji Country Flags", "Helvetica Neue", ...;
--body-font-ja: "Twemoji Country Flags", "ヒラギノ角ゴ Pro", ...;
--body-font-th: "Twemoji Country Flags", "Leelawadee UI", "Segoe UI", Thonburi, ...;
--body-font-vi: "Twemoji Country Flags", "Segoe UI", "Helvetica Neue", ...;
```

**フォールバックの考え方**:
- **Twemoji Country Flags** を最先頭に置く理由は、国旗絵文字（🇯🇵🇺🇸 等）を全プラットフォームで一貫して表示させるため。Twitter Emoji の国旗専用サブセットを最優先で当てる
- 和文は **ProN ではなく Pro**（JIS78 字形）。Apple Japan と同じく、欧文寄りの字形を優先
- 言語ごとに別 stack を持ち、ロケールに応じて切り替える

### 3.4 文字サイズ・ウェイト階層

UNIQLO の最大の特徴: **CJK と Latin で別々の type-scale** を持つ（CJK は Latin より少しだけ小さい基準値）。

#### Type Scale（rem）

| Step | CJK Scale | Latin Scale | px (CJK) | px (Latin) |
|------|-----------|-------------|----------|------------|
| -2 | 0.6875rem | 0.75rem | 11px | 12px |
| -1 | 0.8125rem | 0.875rem | 13px | 14px |
| **base** | **0.9375rem** | **1rem** | **15px** | **16px** |
| +1 | 1.0625rem | 1.125rem | 17px | 18px |
| +2 | 1.1875rem | 1.25rem | 19px | 20px |
| +3 | 1.375rem | 1.5rem | 22px | 24px |
| +4 | 1.625rem | 1.75rem | 26px | 28px |
| +5 | 1.875rem | 2rem | 30px | 32px |
| +6 | 2.25rem | 2.25rem | 36px | 36px |
| +7 | 2.5rem | 2.625rem | 40px | 42px |
| +8 | 2.8125rem | 3rem | 45px | 48px |
| +9 | 3.1875rem | 3.375rem | 51px | 54px |
| +10 | 3.5rem | 3.75rem | 56px | 60px |

**設計思想**: 日本語は同一 px でも欧文より字面が大きく見えるため、CJK はわずかに小さい基準（15px）に設定して見た目のバランスを取る。

#### Font Weight

```css
--font-weight-light:      300;
--font-weight-regular:    400;
--font-weight-medium:     500;
--font-weight-semi-bold:  600;
--font-weight-bold:       700;
--font-weight-extra-bold: 800;
```

#### Line Height

```css
--line-height-01:         1;     /* タイト */
--line-height-02:         1.1;
--line-height-03:         1.2;
--line-height-04:         1.4;   /* 標準（見出し） */
--line-height-04-minus-1: 1.3;
--line-height-05:         1.5;   /* 本文寄り */
```

UNIQLO の本文 line-height は **1.4〜1.5** と、業界平均よりやや低めの設定。商品グリッドで省スペースになる。

#### 主要な実測サイズ（トップページ）

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Headline | Hiragino Pro | 32px | **300** | 44.8px (×1.4) | normal | 「ゴールデンウィーク 特価アイテム…」 |
| Hero Sub | Hiragino Pro | 17px | **300** | 25.5px (×1.5) | normal | 「一瞬で紫外線カット…」 |
| Section H2 (large) | Hiragino Pro | 24px | **300** | 33.6px (×1.4) | normal | "LifeWear" |
| Section H2 (small) | Hiragino Pro | 20px | **300** | 28px (×1.4) | normal | "カテゴリから探す" |
| H1 (visually hidden) | Hiragino Pro | 32px | 700 | normal | normal | "ユニクロ"（SR 専用） |
| Modal H2 | Hiragino Pro | 16px | 700 | 24px (×1.5) | normal | "プライバシー設定" |
| Modal H3 | Hiragino Pro | 16px | 700 | 20.8px (×1.3) | normal | "Cookie設定" |
| Modal H4 | Hiragino Pro | 14px | 700 | 21px (×1.5) | normal | カテゴリ見出し |
| Body | Hiragino Pro | 16px | 400 | normal | normal | 通常本文 |
| Notice | Hiragino Pro | 14px | 300 | 21px (×1.5) | normal | 営業時間告知。color #005db5 |
| Price | UniqloProRegular | 36px | 400 | 43.2px (×1.2) | 0.36px (≈0.01em) | "¥1,990"。color #ee0000 or #fff |
| Sale Term | Hiragino Pro | 13px | 300 | 19.5px (×1.5) | normal | "4月30日まで期間限定価格"。color #ee0000 |
| Sale Item Count | Hiragino Pro | 17px | 300 | 25.5px (×1.5) | normal | "2点"。color #ee0000 |
| Disclaimer | Hiragino Pro | 8px | 600 | 9.6px (×1.2) | normal | 注意書き（極小） |
| Tab | Hiragino Pro | 16px | 400 | normal | normal | "men / women / kids"。color #6a6a6a |
| Button Primary | Hiragino Pro | 14.4px | 700 | 14.4px (×1.0) | 0.144px | "すべて許可する"。bg: #000 / color: #fff |

### 3.5 行間・字間

- **見出しの font-weight が 300（Light）** という極めて珍しい設計。一般的な太字見出しではなく、繊細でモードな印象を出す
- **letter-spacing** は基本 normal。価格（UniqloPro）のみ 0.36px の微小プラス
- **line-height** は見出し 1.4、本文 1.5 が中心（業界平均より低め）
- **type-scale が CJK / Latin で別々**: 同一 rem キーで CJK は 0.9375 倍系列、Latin は 1.0 倍系列

### 3.6 禁則処理・改行ルール

```css
/* 観測上、特殊な指定なし */
word-break: normal;
overflow-wrap: normal;
line-break: auto;
```

### 3.7 OpenType / 特殊機能

- `font-feature-settings` の明示指定なし（normal）
- 価格表示は **UniqloProRegular**（Latin 専用）に切り替えることで自然に英数字メトリクスが適用される
- `palt` は使用していない（ベタ組）

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

UNIQLO の **デザインシステム** ボタンは **border-radius: 0**（直角コーナー）が基本ルール。

```css
--border-radius-button-h-32: 0;
--border-radius-button-h-40: 0;
--border-radius-button-h-50: 0;
--border-radius-button-h-52: 0;
```

ただし、検索バーや一部 EC ボタンは **pill 型（border-radius: 999px）** で別カテゴリとして運用。

**Primary CTA（黒）**
- Background: `#000`（hover `#2a2a2a` / pressed `#3e3e3e`）
- Color: `#fff`
- Border Radius: 0（直角）
- Font Weight: 700
- Font Size: 14.4px〜16px
- Letter Spacing: 0.144px (≈0.01em)

**Secondary（アウトライン）**
- Background: transparent
- Color: `#000` / Border: `#000`
- Border Radius: 0
- Hover: bg `#f4f4f4`

**Search Pill**
- Background: `rgba(255,255,255,0.95)`
- Color: `#767676`（プレースホルダー）
- Border Radius: **999px**（完全な pill）
- Padding: 適度に横長
- Font Family: Arial（system default）

**Full-Width Pill (CTA)**
- Background: `#fff`
- Color: `#000`
- Border Radius: 999px
- "すべてのカテゴリを見る" 等で使用

### Icon Button Sizes

```css
--button-icon-sm-min-width: 32px;   --button-icon-sm-min-height: 32px;
--button-icon-md-min-width: 44px;   --button-icon-md-min-height: 44px;  /* WCAG タッチターゲット */
--button-icon-lg-min-width: 52px;   --button-icon-lg-min-height: 52px;
```

### Links

- **Default Link**: 通常はテキストブラックで下線なし
- **Notice Link** (`#005db5`): 営業時間告知等の通知系リンク
- **Hover**: 下線追加、または `#2a2a2a` への色変化

### Cards

- 商品カードは画像主役 + 商品名（小） + 価格（大・赤） + サイズ・カラー（極小）
- カード自体に明示的な背景や境界線はなく、画像と余白で区切る

### Forms

- Input border: `#dadada`
- Focus border: `#005db5`
- Error border: `#e00`
- Border radius: 0（角ばっている）

### Search Bar

```css
--ec-search-bar-button-height-sm: 38px;
--ec-search-bar-button-max-width-lg: 382px;
--ec-search-bar-button-max-width-md: 324px;
--ec-search-bar-button-max-width-sm: 231px;
```

---

## 5. Layout Principles

### Spacing Scale（rem ベース）

```css
--spacing-01: 0.25rem;   /* 4px */
--spacing-02: 0.5rem;    /* 8px */
--spacing-03: 0.75rem;   /* 12px */
--spacing-04: 1rem;      /* 16px */
--spacing-05: 1.5rem;    /* 24px */
--spacing-06: 2rem;      /* 32px */
--spacing-07: 3.25rem;   /* 52px */
--spacing-08: 5.5rem;    /* 88px */
```

### Spacing Scale（px ベース・並行運用）

```css
--spacing4:  4px;   --spacing12: 12px;  --spacing16: 16px;
--spacing20: 20px;  --spacing24: 24px;  --spacing28: 28px;
--spacing32: 32px;  --spacing36: 36px;  --spacing40: 40px;
--spacing44: 44px;  --spacing48: 48px;  --spacing52: 52px;
--spacing88: 88px;
```

### Grid

```css
--spacing-gutter-sm: 1rem;       /* モバイル */
--spacing-gutter-md: 1.5rem;     /* タブレット */
--spacing-gutter-lg: 1.5rem;     /* デスクトップ */
--spacing-grid-margin-at-medium: 1.5rem;
--spacing-grid-margin-at-large:  3rem;
```

### Container

- 中央寄せ・両端余白あり
- 商品グリッドはレスポンシブカラム数（mobile 2 → tablet 3〜4 → desktop 5〜6）

### Header

- Sticky ヘッダー
- ロゴ + 検索バー（pill）+ アカウント / カート / お気に入りアイコン
- メガメニューでカテゴリ展開

---

## 6. Depth & Elevation

```css
--shadow-floating:    0px 2px 4px #0003;       /* 控えめな浮き */
--shadow-floating-er: 0px 0px 10px #0000001a;  /* 10% 黒のソフト */
--shadow-chip:        0px 0px 4px #000c;       /* チップ用 */
--shadow-other:       0px 2px 2px #0009;       /* やや濃い */
--shadow-bottom-navigation-er: 0px 0px 20px #0000001a;
--shadow-text-icon-er: 0px 1px 1px #0009;
--shadow-text-red-er:  1px 1px 1.5px #0000004d; /* 赤テキスト用陰 */
```

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 基本フラット |
| Floating | `0px 2px 4px rgba(0,0,0,0.2)` | カード浮上感 |
| Soft | `0px 0px 10px rgba(0,0,0,0.1)` | 周辺ぼかし |
| Bottom Nav | `0px 0px 20px rgba(0,0,0,0.1)` | モバイル下部ナビ |

---

## 7. Do's and Don'ts

### Do（推奨）

- 見出しは **font-weight 300（Light）** で繊細に組む（UNIQLO の特徴的なボイス）
- ボタンは **border-radius 0**（直角）を基本とする
- 価格表示は **UniqloProRegular** + 36px + 赤 `#ee0000` で大きく見せる
- 和文は **ヒラギノ角ゴ Pro**（ProN ではなく）を使う
- Type-scale は CJK と Latin で **別々の値**（CJK は 0.9375rem 基準、Latin は 1rem 基準）
- セマンティックトークン（`--background<Role><State>`）の命名規則に従う
- 国旗絵文字を使うときは **"Twemoji Country Flags"** を最先頭に置く
- 検索バーや一部 large CTA は **pill 型（999px）** で別カテゴリ運用

### Don't（禁止）

- 見出しを 700 / 900 で太く組まない（UNIQLO は 300〜400 が中心）
- ボタンに過度な角丸（4〜8px 程度）を入れない（0 か 999px の二択）
- ProN（JIS90 字形）を最先頭に置かない（必ず Pro 優先）
- 価格に和文フォントを使わない（UniqloProRegular で英数字メトリクスを適用）
- 派手なシャドウやグラデーションでミニマル感を崩さない
- ブランド赤 `#ee0000` を本文や広面積背景に使わない（価格・SALE・エラー専用）

---

## 8. Responsive Behavior

### Breakpoints

UNIQLO は明示的な breakpoint 名を持っていないが、`grid-margin-at-medium` (1.5rem) と `grid-margin-at-large` (3rem) のキーワードから:

| Name | Width | 説明 |
|------|-------|------|
| Mobile (sm) | 〜767px | スマホ |
| Tablet (md) | 768〜1024px | iPad |
| Desktop (lg) | 1025〜1440px | PC |
| Large (xl) | 1441px〜 | ワイドモニタ |

### タッチターゲット

- 最小 **44 × 44px**（`--button-icon-md-min-width: 44px`）— WCAG 準拠
- 検索バーモバイル幅: 231px

### フォントサイズの調整

- type-scale は rem ベースなので root font-size を変えれば全体がスケール
- `--root-font-size: 16px` を基準に維持

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
# Brand
Brand Red:           #EE0000   ← 価格・SALE・エラー
Accent Blue:         #005DB5   ← リンク・通知・フォーカス
Primary Bg:          #000000
Secondary Bg:        #6A6A6A
Tertiary Bg:         #F4F4F4
Border Lines:        #DADADA
Body Text:           #000000
Sub Text:            #6A6A6A
Disabled:            #ABABAB

# Typography
Title Font (JA):  "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "Hiragino Sans", "Noto Sans CJK JP", Osaka, sans-serif
Body Font (JA):   "Twemoji Country Flags", + 上記
Price Font (EN):  UniqloProRegular, sans-serif
Body / H1:        16px / 32px / 400-700 / lh normal-1.4
H2 (大):           24px / 300 / lh 33.6px (×1.4)
H2 (小):           20px / 300 / lh 28px (×1.4)
Hero Headline:    32px / 300 / lh 44.8px (×1.4)
Price:            36px / 400 (UniqloProRegular) / lh 43.2px / ls 0.36px / color #EE0000

# Buttons
Primary CTA:      bg #000 / color #fff / border-radius 0 / 14.4px 700 / ls 0.144px
Search Pill:      bg rgba(255,255,255,0.95) / radius 999px
border-radius:    0（直角）が基本。999px は検索・大型 CTA のみ

# Spacing
spacing-01..08:   4 / 8 / 12 / 16 / 24 / 32 / 52 / 88 (px equiv)
```

### プロンプト例

```
UNIQLO のデザインシステムに従って、商品カード一覧ページを作成してください。

- font-family: "Twemoji Country Flags", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "Hiragino Sans", "Noto Sans CJK JP", sans-serif
- 価格表示: UniqloProRegular, sans-serif / 36px / 400 / line-height 43.2px / letter-spacing 0.36px / color: #EE0000
- 見出し: 24px / 300（Light！） / line-height 33.6px / color #000
- 本文: 16px / 400 / line-height normal / color #000
- サブテキスト: 14px / 300 / color #6A6A6A
- Primary CTA: bg #000 / color #FFF / border-radius 0 / 14.4px / 700
- Search Bar: pill 型（border-radius 999px）/ bg rgba(255,255,255,0.95)
- 区切り線: #DADADA
- ボタンの角丸は基本 0（直角）。pill 型は検索・大型 CTA のみ
- 本文の line-height は 1.4〜1.5 と業界よりやや低め
- letter-spacing は基本 normal。価格のみ +0.01em の微小プラス
```

### UniqloPro フォントについて

UNIQLO は独自の **UniqloPro** フォント（Light / Regular / Bold）を Web フォントで配信している。これは商品価格や英字数字に使う Latin 専用フォント。

- ライセンスがない環境では **Helvetica Neue / Arial / Inter** などのジオメトリック系サンセリフで代替可能
- 価格テキストには `letter-spacing: 0.025rem` (≈0.4px) の微小トラッキングを推奨

### CJK / Latin デュアル type-scale について

UNIQLO の最大の特徴は **CJK と Latin で別々の type-scale** を持つことです。同じ "Step +3" でも:
- CJK: 1.375rem (22px)
- Latin: 1.5rem (24px)

これは日本語が同一 px でも欧文より字面が大きく見える視覚特性に対応した、本格的な多言語デザインシステム設計。和欧混植時に「+1 step ずらして使う」「Latin は CJK より少し大きく組む」という運用が可能になっている。
