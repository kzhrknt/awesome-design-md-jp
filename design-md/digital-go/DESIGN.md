# DESIGN.md — Digital Agency Japan (digital.go.jp / DADS)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> デジタル庁公式ウェブサイト + 公式デザインシステム（Digital Agency Design System / DADS）。

> **公式仕様情報**
> - Storybook: <https://design.digital.go.jp/dads/html/>
> - GitHub: <https://github.com/digital-go-jp/design-system-example-components-html>
> - License: MIT
> - 設計トークンパッケージ: `@digital-go-jp/design-tokens`
> - CSS class 規約: `dads-` プレフィックス + BEM + data attributes
>
> 本 DESIGN.md は **公式リポジトリの実装トークンをベースに**作成されています。実サイト digital.go.jp は本デザインシステムを部分採用しているため、観測値とトークン仕様で異なる場合は **公式仕様を優先**してください。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: WCAG 2.2 準拠を明確に意識した公共サービスデザインシステム。フレームワーク非依存、リセット CSS と共存可能、後付け可能な「シンプル・カスタマイズ可能・アクセシビリティファースト」を哲学にする
- **密度**: 余裕のある縦余白、本文の line-height 1.7 が標準。タップターゲット最小 44×44px を全コンポーネントで担保
- **キーワード**: Accessible, Public Service, Token-Driven, Forced-Colors-Aware, Methodical

---

## 2. Color Palette & Roles

DADS の `--color-*` 名前空間は **3 階層**で構成されています:

1. **Primitive**: 11 色相 × 13 段階のスケール（全 143 色）
2. **Neutral**: White / Black / SolidGray / OpacityGray
3. **Semantic**: Success / Error / Warning（Yellow/Orange）— Primitive を意味付けに割り当て

### 2.1 Primitive Colors（プリミティブカラー）

各色相は **50 / 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900 / 1000 / 1100 / 1200** の 13 段階。

| 色相 | 50 | 500 | 1000 | 備考 |
|------|----|-----|------|------|
| **blue** | `#e8f1fe` | `#4979f5` | `#00118f` | デジタル庁コア。リンク・focus は blue-1000 |
| light-blue | `#f0f9ff` | `#39abff` | `#00428c` | 補助情報 |
| cyan | `#e9f7f9` | `#01b7d6` | `#006173` | データ可視化 |
| green | `#e6f5ec` | `#2cac6e` | `#0c472a` | success |
| lime | `#ebfad9` | `#8cc80c` | `#3e5a00` | 強調 |
| yellow | `#fbf5e0` | `#ebb700` | `#806300` | warning, focus accent |
| orange | `#ffeee2` | `#ff7628` | `#8b3200` | warning |
| **red** | `#fdeeee` | `#ff5454` | `#a90000` | error。red-800 が semantic-error-1 |
| magenta | `#f3e5f4` | `#f137f1` | `#6c006c` | データ可視化 |
| purple | `#f1eafa` | `#a565f8` | `#41048e` | データ可視化 |

**主要な使用ポイント**:
- **`--color-primitive-blue-900: #0017c1`**: ボタン default（`--button-color`）
- **`--color-primitive-blue-1000: #00118f`**: リンクカラー / ボタン hover
- **`--color-primitive-blue-100: #d9e6ff`**: 選択中の背景
- **`--color-primitive-blue-200: #c5d7fb`**: ボタン outline hover bg
- **`--color-primitive-yellow-300: #ffd43d`**: focus indicator のリング色（WCAG 2.2）

### 2.2 Neutral

```css
/* Solid Gray (12 段階) */
--color-neutral-solid-gray-50:  #f2f2f2;
--color-neutral-solid-gray-100: #e6e6e6;
--color-neutral-solid-gray-200: #cccccc;
--color-neutral-solid-gray-300: #b3b3b3;
--color-neutral-solid-gray-400: #999999;
--color-neutral-solid-gray-420: #949494;  /* AAA contrast */
--color-neutral-solid-gray-500: #7f7f7f;
--color-neutral-solid-gray-536: #767676;  /* WCAG 4.5:1 minimum (普通テキスト) */
--color-neutral-solid-gray-600: #666666;
--color-neutral-solid-gray-700: #4d4d4d;
--color-neutral-solid-gray-800: #333333;  /* Body text の標準 */
--color-neutral-solid-gray-900: #1a1a1a;

/* Opacity Gray (rgba 黒透過) */
--color-neutral-opacity-gray-50:  rgba(0, 0, 0, 0.05);
/* ... 100, 200, 300, 400, 420, 500, 536, 600, 700, 800, 900 */
```

**注目**: `420` と `536` という非規則的な番号は、それぞれ AAA / AA コントラスト比の **WCAG 閾値**を意識した値です。

### 2.3 Semantic（意味付け）

```css
--color-semantic-success-1: var(--color-primitive-green-600);   /* #259d63 */
--color-semantic-success-2: var(--color-primitive-green-800);   /* #197a4b */
--color-semantic-error-1:   var(--color-primitive-red-800);     /* #ec0000 */
--color-semantic-error-2:   var(--color-primitive-red-900);     /* #ce0000 */
--color-semantic-warning-yellow-1: var(--color-primitive-yellow-700);  /* #b78f00 */
--color-semantic-warning-yellow-2: var(--color-primitive-yellow-900);  /* #927200 */
--color-semantic-warning-orange-1: var(--color-primitive-orange-600);  /* #fb5b01 */
--color-semantic-warning-orange-2: var(--color-primitive-orange-800);  /* #c74700 */
```

各 semantic は **-1（明）と -2（濃）** の 2 段階を持ち、状態（icon vs text）で使い分け。

---

## 3. Typography Rules

### 3.1 和文フォント

```css
--font-family-sans:
  "Noto Sans JP",
  -apple-system,
  BlinkMacSystemFont,
  sans-serif;
```

公式 stack は **わずか 4 要素**。`Segoe UI` 等は含まれていません（実サイトの古い指定が観測される場合があるが、新規実装では公式 stack に従うべき）。

### 3.2 等幅フォント

```css
--font-family-mono:
  "Noto Sans Mono",
  monospace;
```

数字・コード表示用。`var(--font-family-mono)` で参照。

### 3.3 Typography Utility System（5 カテゴリ）

DADS は **`dads-u-{prefix}-{size}{weight}-{lineHeight}`** という命名のユーティリティクラスを 5 系列で提供:

| Prefix | カテゴリ | 用途 | LH 系列 | LS |
|--------|----------|------|---------|-----|
| `dsp` | **Display** | 大型見出し（64/57/48px） | 140 (×1.4) | 0 |
| `std` | **Standard** | 通常見出し・本文（16〜45px） | 140〜175 | 0〜0.02em |
| `dns` | **Dense** | 密な行間（17/16/14px） | 120, 130 | 0 |
| `oln` | **One Line** | 1 行 UI（17/16/14px） | 100 (×1.0) | 0.02em |
| `mono` | **Monospace** | コード・数値（17/16/14px） | 150 (×1.5) | 0 |

各カテゴリには `B`（Bold = 700）/ `N`（Normal = 400）の 2 ウェイト。

例: `dads-u-std-16N-170` = Standard / 16px / Normal weight / line-height 1.70

### 3.4 Standard カテゴリの詳細スケール

**最も使用頻度が高い** Standard カテゴリの全サイズ:

| Size | Line Height | Letter Spacing | 用途 |
|------|-------------|----------------|------|
| 45px | 1.40 | 0 | H1 ページタイトル |
| 36px | 1.40 | 0.01em | H1 大 |
| 32px | 1.50 | 0.01em | H2 |
| 28px | 1.50 | 0.01em | H3 |
| 26px | 1.50 | 0.02em | H3 sub |
| 24px | 1.50 | 0.02em | H4 |
| 22px | 1.50 | 0.02em | リード |
| 20px | 1.50 | 0.02em | Heading 4 alt |
| 18px | 1.60 | 0.02em | sub-heading |
| 17px | 1.70 | 0.02em | **本文 base** |
| 16px | 1.70 | 0.02em | キャプション・補助本文 |
| 16px | 1.75 | 0.02em | 本文 alt（広め） |

**重要な訂正**（実サイト観測のみだった以前の DESIGN.md からの変更）:
- letter-spacing は **「全 0.02em」ではない**。**3 段階**（0 / 0.01em / 0.02em）でサイズに反比例
  - 45px 以上: 0
  - 36px〜28px: 0.01em
  - 26px 以下: 0.02em
- line-height も段階的（1.4 / 1.5 / 1.6 / 1.7 / 1.75）

### 3.5 Heading コンポーネント（10 サイズスケール）

`<dads-heading data-size="N">` で利用。サイズと shoulder（前置きテキスト）の関係:

| size | font-size | line-height | letter-spacing | shoulder size | shoulder lh |
|------|-----------|-------------|----------------|---------------|-------------|
| 64 | 64px | 1.4 | 0 | 28px | 1.5 |
| 57 | 57px | 1.4 | 0 | 24px | 1.5 |
| 45 | 45px | 1.4 | 0 | 22px | 1.5 |
| 36 | 36px | 1.4 | 0.01em | 20px | 1.5 |
| 32 | 32px | 1.5 | 0.01em | 18px | 1.6 |
| 28 | 28px | 1.5 | 0.01em | 16px | 1.7 |
| 24 | 24px | 1.5 | 0.02em | 16px | 1.7 |
| 20 | 20px | 1.5 | 0.02em | 16px | 1.7 |
| 18 | 18px | 1.6 | 0.02em | 16px | 1.7 |
| 16 | 16px | 1.7 | 0.02em | 16px | 1.7 |

#### Heading Variants

```html
<!-- Chip: 左に青い縦バー（width: 1em/3, color: blue-900） -->
<h2 class="dads-heading" data-size="32" data-chip>見出し</h2>

<!-- Rule: 下線付き（width: 8/6/4/2px, color: blue-900） -->
<h2 class="dads-heading" data-size="32" data-rule="4">見出し</h2>

<!-- Shoulder: 見出しの前置きテキスト -->
<div class="dads-heading" data-size="32">
  <p class="dads-heading__shoulder">セクション 1</p>
  <h2 class="dads-heading__heading">タイトル</h2>
</div>
```

### 3.6 行間・字間（実サイト運用）

実サイト digital.go.jp で観測された body 設定:
- font-size: 17px / line-height: 28.9px (×1.7) / letter-spacing: 0.34px (≈0.02em)

これは **`dads-u-std-17N-170`** に相当。

### 3.7 OpenType / 特殊機能

- `font-feature-settings: normal`
- `palt` 不使用（ベタ組）
- `forced-colors: active` メディアクエリでハイコントラストモード対応

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Button

**4 サイズ × 3 タイプ** = 12 バリエーション + 各種状態。

#### Sizes

| Size | min-width | min-height | border-radius | padding | font-size |
|------|-----------|------------|---------------|---------|-----------|
| `lg` | 136px | 56px | 8px | 12px / 16px | 16px |
| `md` | 96px | 48px | 8px | 8px / 16px | 16px |
| `sm` | 80px | 36px | 6px | 2px / 12px | 16px |
| `xs` | 72px | 28px | 4px | 2px / 8px | 14px |

`sm` / `xs` は **`::after` で 44px の不可視タップターゲット**を確保（WCAG 2.5.5）。

#### Types

| Type | Background | Color | Border |
|------|-----------|-------|--------|
| `solid-fill` | `blue-900` | white | 4px double transparent |
| `outline` | white | `blue-900` | 1px solid currentcolor |
| `text` | transparent | `blue-900` | 0 |

#### State Colors

```css
--button-color:        var(--color-primitive-blue-900);   /* #0017c1 */
--button-hover-color:  var(--color-primitive-blue-1000);  /* #00118f */
--button-active-color: var(--color-primitive-blue-1200);  /* #000060 */
--button-outline-hover-bg-color:  var(--color-primitive-blue-200);
--button-outline-active-bg-color: var(--color-primitive-blue-300);
```

ボタン default は **blue-900 (`#0017c1`)** で、hover で blue-1000 (`#00118f`) になる。リンク色（純粋 blue-1000）とは default 状態で微妙に異なる。

#### Focus Indicator（公式仕様）

```css
.dads-button:focus-visible {
  outline: 4px solid var(--color-neutral-black);
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--color-primitive-yellow-300);
}
```

**4px 黒 outline + 2px 黄色（yellow-300 #ffd43d）リング**。WCAG 2.2 のフォーカス指標可視性要件を満たす公式仕様。Text 型ボタンでは追加で背景も yellow-300 に。

### Link

```css
.dads-link:any-link {
  color: var(--color-primitive-blue-1000);  /* #00118f */
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
```

リンク色は **必ず blue-1000 (#00118f)**、下線は 1px / offset 3px の細めで上品な指定。

### Input Text

```css
.dads-input-text__input {
  border: 1px solid var(--color-neutral-solid-gray-600);  /* #666 */
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 1.7;
  letter-spacing: 0.02em;
}

/* Sizes */
[data-size="sm"] { height: 40px; }
[data-size="md"] { height: 48px; }
[data-size="lg"] { height: 56px; }

/* States */
:read-only { border-style: dashed; }
:hover     { border-color: black; }
:focus     { outline: 4px black + box-shadow yellow-300 (Button と同じ); }
:invalid   { border-color: var(--color-semantic-error-1); }
:disabled  { border-color: solid-gray-300; bg: solid-gray-50; color: solid-gray-420; }
```

### Notification Banner

5 タイプ × 2 スタイル:

```css
[data-type="success"] → semantic-success-2
[data-type="error"]   → semantic-error-1
[data-type="warning"] → semantic-warning-yellow-2 (border) / yellow-400 (chip)
[data-type="info-1"]  → blue-900
[data-type="info-2"]  → solid-gray-536

[data-style="standard"]   → border-radius 12px / border-width 3px
[data-style="color-chip"] → 左バー 8px (mobile) / 16px (≥48rem)
```

### Other Components

公式リポジトリには以下も実装あり: `accordion`, `blockquote`, `breadcrumb`, `calendar`, `card`, `carousel`, `checkbox`, `chip-label`, `date-picker`, `description-list`, `disclosure`, `divider`, `drawer`, `emergency-banner`, `file-upload`, `form-control-label`, `global-menu`, `hamburger-menu-button`, `heading`, `language-selector`, `list`, `menu-list-box`, `menu-list`, `progress-indicator`, `radio`, `resource-list`, `search-box`, `select`, `step-navigation`, `table`, `textarea`, `utility-link`

合計 **37 コンポーネント** が公式提供。

---

## 5. Layout Principles

### Header

```css
:root {
  --header-block-size: 5rem; /* 80px */
}
```

### Container & Spacing

公式トークンは Color / Typography / Elevation 中心で、**汎用 spacing トークンは限定的**。コンポーネント毎にパディング・マージンを `calc(N / 16 * 1rem)` 形式で直接指定する方針。

### Unit Convention

```css
/* 全要素 rem ベース、border のみ px */
font-size: calc(16 / 16 * 1rem);
padding: calc(8 / 16 * 1rem) calc(16 / 16 * 1rem);
border: 1px solid;
```

`calc(N / 16 * 1rem)` は「設計時の N px をユーザー設定に応じてスケールさせる」公式パターン。

---

## 6. Depth & Elevation

**8 段階のシャドウ階層が公式定義**されています（実サイトトップでは未使用ですが、Drawer / Modal / Card 等のコンポーネントで利用）。

```css
--elevation-1: 0  2px  8px 1px rgba(0,0,0,0.1), 0 1px  5px 0 rgba(0,0,0,0.3);
--elevation-2: 0  2px 12px 2px rgba(0,0,0,0.1), 0 1px  6px 0 rgba(0,0,0,0.3);
--elevation-3: 0  4px 16px 3px rgba(0,0,0,0.1), 0 1px  6px 0 rgba(0,0,0,0.3);
--elevation-4: 0  6px 20px 4px rgba(0,0,0,0.1), 0 2px  6px 0 rgba(0,0,0,0.3);
--elevation-5: 0  8px 24px 5px rgba(0,0,0,0.1), 0 2px 10px 0 rgba(0,0,0,0.3);
--elevation-6: 0 10px 30px 6px rgba(0,0,0,0.1), 0 3px 12px 0 rgba(0,0,0,0.3);
--elevation-7: 0 12px 36px 7px rgba(0,0,0,0.1), 0 3px 14px 0 rgba(0,0,0,0.3);
--elevation-8: 0 14px 40px 7px rgba(0,0,0,0.1), 0 3px 16px 0 rgba(0,0,0,0.3);
```

各 elevation は **2 つの shadow** を重ねた構成（広いソフト + 細かい強）。

---

## 7. Do's and Don'ts

### Do（推奨）

- リンクは **`var(--color-primitive-blue-1000)` (#00118f)** で統一
- ボタンは **default = blue-900 / hover = blue-1000 / active = blue-1200** の 3 段階
- focus indicator は **4px 黒 outline + 2px yellow-300 リング** の公式パターン
- Heading は 10 サイズスケール（16/18/20/24/28/32/36/45/57/64）から選ぶ
- letter-spacing は **3 段階**（0 / 0.01em / 0.02em）でサイズに反比例
- フォントは `"Noto Sans JP", -apple-system, BlinkMacSystemFont, sans-serif` で OK
- 等幅は `"Noto Sans Mono", monospace`（数値・コード）
- 単位は **`calc(N / 16 * 1rem)`** で書く（border のみ px）
- semantic-error は `--color-semantic-error-1`（red-800）から始める
- WCAG 2.2 AA を最小目標、`forced-colors: active` 対応も忘れない
- 小さいボタン（sm/xs）は **44px の不可視タップターゲット**を `::after` で確保

### Don't（禁止）

- `Segoe UI` を font stack に含めない（公式は4要素のみ）
- letter-spacing を全要素 0.02em にしない（サイズにより変える）
- ボタンに `box-shadow` で奥行きを作らない（ボーダーと色面で）
- ただし「shadow を絶対使うな」ではない — Drawer / Modal 等は elevation-1〜8 を使う
- 純黒 `#000` を本文に使わない（`solid-gray-800 #333` を使う）
- リンク色を複数持たない（blue-1000 一色）
- `dads-` 以外のプレフィックスでデザインシステム由来の class を作らない
- `:hover` を必ず `@media (hover: hover)` で囲む（タッチデバイスでの誤発火を防ぐ）

---

## 8. Responsive Behavior

### Breakpoint

```css
@media (min-width: 48rem) {
  /* tablet+ — 768px 以上 */
}
```

公式実装で観測される breakpoint は **48rem (768px) 一点**のみ（極めてシンプル）。

### タッチターゲット

- Button sm/xs: 表示は 36/28px だが `::after` で 44×44px の不可視タップ領域を確保
- Modal close, Mobile close: 44×44px

### フォントサイズの調整

- 本文 17px は維持
- 大型 H1 45px → モバイルで小さい size variant を選ぶ（同じ Heading コンポーネントの `data-size` を切り替え）

### Forced-Colors

全コンポーネントが `@media (forced-colors: active)` を持ち、Windows ハイコントラストモードに対応:
```css
@media (forced-colors: active) {
  .dads-button:disabled { border-color: GrayText; color: GrayText; }
  .dads-heading[data-chip]::before { background-color: CanvasText; }
}
```

### Reduced Motion

`@media (prefers-reduced-motion: reduce)` も主要コンポーネントで対応。

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
# Source
GitHub: digital-go-jp/design-system-example-components-html (MIT)
Storybook: https://design.digital.go.jp/dads/html/
Tokens: @digital-go-jp/design-tokens

# Brand Color
Link / Active:      var(--color-primitive-blue-1000)  → #00118F
Button Default:     var(--color-primitive-blue-900)   → #0017C1
Button Hover:       var(--color-primitive-blue-1000)
Button Active:      var(--color-primitive-blue-1200)  → #000060
Selected Bg:        var(--color-primitive-blue-100)   → #D9E6FF
Focus Ring:         var(--color-primitive-yellow-300) → #FFD43D

# Text
Body Primary:       var(--color-neutral-solid-gray-800) → #333333
Body Sub:           var(--color-neutral-solid-gray-700) → #4D4D4D
Placeholder:        var(--color-neutral-solid-gray-536) → #767676 (WCAG 4.5:1)
Disabled:           var(--color-neutral-solid-gray-420) → #949494 (AAA)
Error:              var(--color-semantic-error-1)       → #EC0000

# Typography
Sans:               "Noto Sans JP", -apple-system, BlinkMacSystemFont, sans-serif
Mono:               "Noto Sans Mono", monospace
Body:               17px / 400 / lh 1.7 / ls 0.02em
Heading 45px:       lh 1.4 / ls 0
Heading 32px:       lh 1.5 / ls 0.01em
Heading 16px:       lh 1.7 / ls 0.02em

# Buttons
Sizes:              lg 56px / md 48px / sm 36px (44px tap) / xs 28px (44px tap)
Radius:             8 / 8 / 6 / 4 (px)
Types:              solid-fill / outline / text
Focus:              4px black outline + 2px yellow-300 ring

# Inputs
Border:             1px solid solid-gray-600
Radius:             8px
Heights:            sm 40 / md 48 / lg 56
Read-only:          border-style: dashed

# Elevation
8 levels:           --elevation-1 〜 --elevation-8

# Unit Convention
font-size:          calc(16 / 16 * 1rem)
padding:            calc(N / 16 * 1rem)
border:             1px (px のみ例外)
```

### プロンプト例

```
デジタル庁デザインシステム（DADS）に従って、お問い合わせフォームを作成してください。

- font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, sans-serif
- 本文: 17px / 400 / line-height 1.7 / letter-spacing 0.02em / color: solid-gray-800 (#333)
- フォームラベル: 16px / 700 / line-height 1.7 / letter-spacing 0.02em
- Input: border 1px solid-gray-600 / border-radius 8px / height 48px (md size)
- Input focus: outline 4px solid black + box-shadow 0 0 0 2px yellow-300 (#FFD43D)
- Required indicator: red-800 (#EC0000)
- Submit button: bg blue-900 (#0017C1) / color white / border-radius 8px / lg size (56px)
- Button hover: bg blue-1000 (#00118F)
- Button focus: outline 4px black + 2px yellow-300 ring（Input と統一）
- 単位は calc(N / 16 * 1rem) で書く
- WCAG 2.2 AA 準拠 / forced-colors / reduced-motion 対応
- :hover は @media (hover: hover) で囲む
```

### Storybook 参照運用

新規コンポーネントを作る前に、必ず以下を確認:

1. **公式 Storybook** で同等コンポーネントが既存か <https://design.digital.go.jp/dads/html/>
2. 既存コンポーネントの **CSS / mdx** を `digital-go-jp/design-system-example-components-html` リポジトリで確認
3. CSS class は **`dads-` プレフィックス + BEM**、修飾子は **`data-*` 属性**で表現
4. アクセシビリティテスト（VRT）を Playwright で実行可能

公式 37 コンポーネントが既にカバーする範囲:
> accordion / blockquote / breadcrumb / button / calendar / card / carousel / checkbox / chip-label / date-picker / description-list / disclosure / divider / drawer / emergency-banner / file-upload / form-control-label / global-menu / hamburger-menu-button / heading / input-text / language-selector / link / list / menu-list-box / menu-list / notification-banner / progress-indicator / radio / resource-list / search-box / select / step-navigation / table / textarea / utility-link

これら 37 種に当てはまる UI なら、まず公式実装を見るべき。

### 実サイト digital.go.jp との関係

実サイト digital.go.jp は本デザインシステムの **サブセット** を採用しています:
- ✅ 採用: カラー（blue-1000 / 100 / solid-gray-* / yellow-300 など）
- ✅ 採用: Heading スケール（45px H1 など）
- ✅ 採用: 4-element font-family stack の主要部分
- ⚠ 部分採用: ヘッダーで `Segoe UI` 等の旧指定が残る箇所あり
- ⚠ 部分採用: トップページでは elevation-1〜8 を使わず完全フラット
- ✅ 採用: focus indicator の WCAG 2.2 仕様

新規実装では **DESIGN.md（公式トークン）を真とし**、実サイトはあくまで参考実装の 1 例として扱ってください。
