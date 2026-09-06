# DESIGN.md — ヤンマー（YANMAR）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-03 / 対象: `https://www.yanmar.com/jp/`, `/agri/products/tractor/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に **YANMAR Premium Red `#dc1e37`** 一色。角丸は最大でも `10px` と硬く、余白は **7px の倍数**で刻む。農機・建機・舶用エンジンという重工業のプロダクトを、写真で見せて UI は徹底的に引く
- **密度**: 本文 14px / 行間 1.8 の業務寄りの密度。製品スペック・絞り込み検索・型番一覧を扱うため、装飾より一覧性を優先する
- **キーワード**: プレミアムレッド、7pxグリッド、角丸2〜5px、不透明度ランプ、Web Components

**このサイトの核心は3つある。**

1. **色をすべて「不透明度のランプ」で定義している。** `--black-100 / 80 / 50 / 30 / 20 / 10 / 5`、`--white-100 / 50 / 20 / 10 / 5`、`--yanmar-premium-red-100 / 80 / 50 / 10 / 5` という具合に、**1色につき5〜7段の alpha 値**が並ぶ。写真の上に重ねても破綻しない設計
2. **余白スケールが 7px 基準。** `--spacing-1: 7px` から `7 → 14 → 21 → 35 → 56 → 91 → 147 → 238px` と**フィボナッチ的に伸びる**。4px や 8px グリッドではない
3. **ボタンが Web Components（`<y-button>`）。** DOM に `<y-button>` `<y-page-title>` というカスタム要素が直接現れる。デザインシステムがコンポーネント単位で実装されている

**CSS Custom Properties は 130個**。フォントは `--font-shorthand-*` という **`font` ショートハンド丸ごと**のトークンで配られており（例: `700 28px / 1.5 "Noto Sans JP", …`）、サイズ・ウェイト・行間・書体が1つの変数に束ねられている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | トークン | 実測 |
|------|--------|----------|------|
| **YANMAR Premium Red** | **`#dc1e37`** | `--yanmar-premium-red-100` | **CSS 全文で 196回**。CTA の面、アクティブなラベル、ロゴ、リンクの強調 |
| Premium Red 80 | `rgba(220, 30, 55, 0.8)` | `--yanmar-premium-red-80` | 半透明の重ね |
| Premium Red 80（不透明版） | `#de465a` | `--yanmar-premium-red-80-opaque` | 白地でのホバー |
| Premium Red Dark | `#b0182c` | `--yanmar-premium-red-20-dark-opaque` | プレス状態 |
| Premium Red 10 | `rgba(220, 30, 55, 0.1)` | `--yanmar-premium-red-10` | 選択中のフィルタ項目の面 |
| Premium Red 5（不透明版） | `#fdf4f5` | `--yanmar-premium-red-5-opaque` | 最も淡い赤の面 |

> **`--yanmar-premium-red-*` という命名そのものがブランドの宣言。** 「赤」ではなく「YANMAR プレミアムレッド」として1色だけが名前を持ち、他の色は `black` / `white` / `blue` / `green` / `yellow` という汎用名しか与えられていない。

### Semantic（意味的な色）

| 役割 | 実装値 | トークン |
|------|--------|----------|
| **Info / Link** | `#0080c1` | `--blue-100`（+ 50 / 10 / 5 の alpha 段） |
| **Success** | `#199200` | `--green-100`（+ 50 / 10 / 5） |
| **Warning** | `#ce7e00` | `--yellow-100`（+ 50 / 20 / 10 / 5） |
| **Error** | `#ff0000` | `--error-red-100`（+ 80 / 50 / 10 / 5）、不透明版 `#ff3333` |

> **Error は純粋な `#ff0000` で、ブランドレッド `#dc1e37` とは別物。** 混同するとエラー表示がブランド色に見えて意味が伝わらない。**赤が2種類あることを前提に実装する。**

### Neutral — 黒と白の不透明度ランプ

```css
--black-100: rgba(0, 0, 0, 100%);   --white-100: rgba(255, 255, 255, 100%);
--black-80:  rgba(0, 0, 0, 80%);    --white-50:  rgba(255, 255, 255, 50%);
--black-50:  rgba(0, 0, 0, 50%);    --white-20:  rgba(255, 255, 255, 20%);
--black-30:  rgba(0, 0, 0, 30%);    --white-10:  rgba(255, 255, 255, 10%);
--black-20:  rgba(0, 0, 0, 20%);    --white-5:   rgba(255, 255, 255, 5%);
--black-10:  rgba(0, 0, 0, 10%);
--black-5:   rgba(0, 0, 0, 5%);

/* 写真の上に重ねられない場面用の不透明版 */
--black-80-opaque: #333333;
--black-10-opaque: #e5e5e5;
--black-5-opaque:  #f2f2f2;
```

**実測での使われ方**:

- **Text Primary** (`#333333` / `--black-80-opaque`): 本文。**可視 170要素で最多**
- **Text on Photo** (`#ffffff`): 写真の上の見出し（可視 57要素）
- **Text Strong** (`#000000`): ナビ・パンくず（可視 14要素）
- **Surface** (`#f2f2f2` / `--black-5-opaque`): パンくず・カテゴリ帯の面
- **Border** (`#e5e5e5` / `--black-10-opaque`) / **入力欄の枠** `#d1d1d1`
- **Disabled** (`#a3a3a3`): 無効なボタンの面
- **Background** (`#ffffff`)

> **`--black-80-opaque` は `rgba(51,51,51,100%)` と書かれている。** 名前は「黒の80%」だが値は完全不透明の `#333333`。**写真の上には alpha 版、白地の上には opaque 版**という使い分けを崩さないこと。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP** のみ（Web フォント。実測で 400 / 700 がロード済み）
- **明朝体**: 定義なし・使用なし

### 3.2 欧文フォント

- **ブランド display 書体**: **DIN Next / DIN Next LT Pro**。`@font-face` は `DIN Next`（400 / 700 / 800 italic）と `DINNextLTPro-Regular` / `DINNextLTPro-HeavyItalic` が宣言されている
- **通常の欧文**: Noto Sans / Noto Sans JP の欧文グリフ

> **DIN Next は宣言されているが、計測した3ページでは1つもロードされなかった**（`document.fonts` の状態がすべて `unloaded`）。`--font-family-brand-display` を参照する要素が、これらのページに存在しないため。**「ブランド書体は DIN Next」は設計上の事実だが、通常のページ実装で当てにしてはいけない。** 見出しに使う場合は明示的に `--font-family-brand-display` を指定し、Noto Sans JP へのフォールバックが効くことを前提に組む。

### 3.3 font-family 指定 — 3本のスタックが併存する

```css
/* (A) ブランド display — 大見出し・キーメッセージ用 */
--font-family-brand-display:
  "DIN Next", "DIN Next LT Pro", "Noto Sans JP",
  "Hiragino Kaku Gothic ProN", "Meiryo", "Helvetica Neue", Arial, sans-serif;

/* (B) 本文・見出しの既定（トークン経由） */
font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN",
             "Meiryo", "Helvetica Neue", Arial, sans-serif;

/* (C) 一部モジュールの簡略スタック */
font-family: "Noto Sans JP", "Noto Sans", sans-serif;
```

**フォールバックの考え方**:
- **和文優先**。`Noto Sans JP` が先頭（(A) では DIN Next が欧文専用に先行する）
- **(B) と (C) が同じサイト内に併存している。** 実測では (C) が 185要素、(B) が 63要素。**(B) はデザイントークン（`--font-shorthand-*`）が配る正式なスタック、(C) は個別モジュールの簡略版**
- **新規実装では (B) を使う。** `"Hiragino Kaku Gothic ProN", "Meiryo"` を含む長いスタックが、Noto Sans JP 未読込時の日本語表示を保証する
- **メイリオ先頭のレガシースタックではない**点に注意（`Meiryo` は3番目以降のフォールバック）

### 3.4 文字サイズ・ウェイト階層

サイズは **`--font-size-*` の11段**。`16px` を基準に上下へ伸びる。

```css
--font-size-large-6: 112px;   --font-size-base:     16px;
--font-size-large-5:  56px;   --font-size-small-1:  14px;
--font-size-large-4:  37.3px; --font-size-small-2:  12.4px;
--font-size-large-3:  28px;   --font-size-small-3:  11.2px;
--font-size-large-2:  22.4px; --font-size-small-4:  10.2px;
--font-size-large-1:  18.7px;
```

ウェイトは3段: `--font-weight-normal: 400` / `--font-weight-bold: 700` / `--font-weight-heavy: 800`。

**`--font-shorthand-*` トークンがサイズ・ウェイト・行間・書体を丸ごと配る**（例: `--font-shorthand-heading-large-3: 700 28px / 1.5 "Noto Sans JP", …`）。

| Role | Shorthand Token | Size | Weight | Line Height | 備考 |
|------|-----------------|------|--------|-------------|------|
| Brand Display | `--font-shorthand-brand-large-6-bold` | 112px | 700 | **1.3** | DIN Next。キービジュアル |
| Brand Display（斜体） | `--font-shorthand-brand-large-5-heavy-italic` | 56px | 800 *italic* | 1.3 | **ブランド固有の斜体 heavy** |
| Heading 1 | `--font-shorthand-heading-large-5` | 56px | 700 | 1.5 | ページ見出し |
| Heading 2 | `--font-shorthand-heading-large-4` | 37.3px | 700 | 1.5 | セクション見出し |
| Heading 3 | `--font-shorthand-heading-large-3` | **28px** | 700 | **1.5 (42px)** | 主要見出し（実測あり） |
| Heading 4 | `--font-shorthand-heading-large-2` | 22.4px | 700 | 1.5 | サブ見出し |
| Heading 5 | `--font-shorthand-heading-large-1` | 18.7px | 700 | 1.5 | 小見出し |
| Heading 6 | `--font-shorthand-heading-base` | 16px | 700 | **1.5 (24px)** | カード見出し（実測あり） |
| Heading（最小） | `--font-shorthand-heading-small-1` | 14px | 700 | 1.5 (21px) | ラベル見出し（実測あり） |
| Body Large | `--font-shorthand-base-normal` | 16px | 400 | **1.8 (28.8px)** | 本文（大）（実測あり） |
| **Body** | `--font-shorthand-small-1-normal` | **14px** | 400 | **1.8 (25.2px)** | **本文（既定）**（実測あり） |
| Caption | `--font-shorthand-small-2-normal` | 12.4px | 400 | 1.8 (22.32px) | 注釈（実測あり） |
| Small | `--font-shorthand-small-3-normal` | 11.2px | 400 | 1.8 | 最小 |
| Micro | `--font-shorthand-small-4-normal` | 10.2px | 400 | 1.8 | 法務表記 |

**行間の使い分けが明確**:

- **1.3** — ブランド display（`--line-height-heading-brand-display`）
- **1.5** — 見出し（`heading-*`）と、**22.4px 以上の本文**
- **1.8** — **18.7px 以下の本文**（`base` / `small-1〜4`）

> **本文は 14px / line-height 1.8。** 日本語の業務 UI としてはゆったりした行間で、スペック表や説明文の可読性を優先している。

### 3.5 行間・字間

- **本文の行間**: **1.8**（14px で 25.2px）
- **見出しの行間**: **1.5**
- **ブランド display の行間**: **1.3**
- **字間**: **実測で 245/248 要素が `normal`**。残りは CMP（同意バナー）由来の `0.13008px` / `0.144px` で、**ヤンマーの設計値ではない**

> **`letter-spacing` を足さないこと。** ヤンマーのトークンに letter-spacing の定義は1つも存在しない。

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 型番（`YT5113` `SA-424` 等）と単位つき数値（`40–60馬力`）は途中で折らない
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
--font-feature-settings: "pkna" on, "palt" on, "pwid" on;
```

**3つの機能を同時に有効化するトークンが定義されている。**

- **`palt`**: 和文のプロポーショナル字詰め
- **`pkna`**: **仮名のプロポーショナル字形**（ひらがな・カタカナを字幅に合わせて詰める）
- **`pwid`**: 欧文・数字のプロポーショナル字形

**ただし実測での適用は 15要素のみ**（すべて `<div>`）。**body から全体に継承させてはいない。** 見出しやナビなど、詰めたい箇所に個別に当てる運用。

> **`pkna` まで指定しているサイトは珍しい。** Noto Sans JP は `pkna` に対応しており、仮名の間延びが抑えられる。**見出しに当てるときは3つセットで使う。**

### 3.8 縦書き

該当なし。全要素 `horizontal-tb`。

---

## 4. Component Stylings

### Buttons — `<y-button>` Web Component

角丸は **`5px`（`--border-radius-1`）が既定**。ボタンには常に極薄の影が入る。

**Primary（塗り）**
- Background: `#dc1e37`
- Text: `#ffffff`
- Border: `1px solid #dc1e37`
- Padding: `7px 14px`（= `--spacing-1` × 1 / × 2）
- Border Radius: `5px`
- Font: 14px / 700
- Shadow: `0px 1px 2px 0px rgba(0, 0, 0, 5%)`（`--shadow`）

**Secondary（白地・黒文字のアウトライン）**
- Background: `#ffffff`
- Text: `#000000`
- Border: `1px solid rgba(0, 0, 0, 0.1)`（`--black-10`）
- Padding: `6.2px 12.4px`
- Border Radius: `5px`
- Font: 12.4px / 700
- Shadow: `--shadow`

**Tertiary（白地・赤文字のアウトライン）**
- Background: `#ffffff`
- Text: `#dc1e37`
- Border: `1px solid #dc1e37`
- Padding: `7px 14px`
- Border Radius: `5px`
- Font: 14px / 700

**Disabled**
- Background: `#a3a3a3` / Text: `#ffffff` / Border Radius: `0px`

### Filter Chips（絞り込み）

- 未選択: 背景 `transparent` / 文字 `#333333` / 14px 400
- **選択中: 背景 `rgba(220, 30, 55, 0.1)` / 文字 `#dc1e37`** / padding `14px` / radius `0px`

### Cards（製品カテゴリカード）

- 写真の上にラベルを直接載せる（面の色を持たない）
- ラベル: 白文字 / 見出しウェイト
- 右下に `>` シェブロン
- Border Radius: `0px`（**製品カードは角丸なし**）

### Navigation Cards（画像＋赤帯）

- 帯の背景: `#dc1e37` / 文字 `#ffffff` / Border Radius: `0px`
- 「閉じる」など副次的なものは `#a3a3a3`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #d1d1d1`
- Border Radius: **`50px`（検索欄はピル）**
- Padding: `6px 35px 6px 15px`（右側は検索アイコン分）
- Font Size: `12.8px`
- Text: `#000000`
- Focus: `box-shadow: 0 0 0 4px rgba(206, 126, 0, 20%)`（`--focus-shadow`）

> **フォーカスリングが黄色（`--yellow-100: #ce7e00` の20%）。** ブランドレッドでも青でもない。**実測しないと絶対に出てこない値なので、必ずこの色を使う。**

### Border Radius Scale

```css
--border-radius-small-1: 3px;
--border-radius-1:       5px;   /* ボタンの既定 */
--border-radius-2:      10px;
--border-radius-max: 9999px;    /* ピル */
```

CMP（同意バナー）に現れる `2px` はヤンマーの値ではない。**`3 / 5 / 10 / 9999px` の4段が正**。

---

## 5. Layout Principles

### Spacing Scale — 7px 基準

| Token | Value | | Token | Value |
|-------|-------|---|-------|-------|
| `--spacing-0` | 0 | | `--spacing-5` | 56px |
| `--spacing-1` | **7px** | | `--spacing-6` | 91px |
| `--spacing-2` | 14px | | `--spacing-7` | 147px |
| `--spacing-3` | 21px | | `--spacing-8` | 238px |
| `--spacing-4` | 35px | | `--spacing-content-side` | 15px |

> **4px でも 8px でもなく 7px グリッド。** `7 → 14 → 21 → 35 → 56 → 91 → 147 → 238` は途中から**前2項の和に近い伸び方**をする。ボタンの padding `7px 14px` もこのスケール上にある。

### Container

```css
--content-width: 1110px;
--content-width-sm: calc((1110px - (21px * 5)) / 6 * 4 + (21px * 3));  /* ≒ 731px */
```

- **Max Width: 1110px**（実測でも 1110px が19回で最頻出）
- **6カラムグリッド / ガター 21px**（`--spacing-3`）。`--content-width-sm` は「6カラム中4カラム分」を計算式で表現している
- 左右の余白: 15px（`--spacing-content-side`）

### Motion

```css
--transition: 0.3s ease-out;
```

---

## 6. Depth & Elevation

| Level | Token | Shadow | 用途 |
|-------|-------|--------|------|
| 0 | — | `none` | 既定 |
| 1 | `--shadow` | `0px 1px 2px 0px rgba(0, 0, 0, 5%)` | **ボタン（`<y-button>` すべて）** |
| 2 | `--shadow-medium` | `0 2px 16px 0 rgba(0, 0, 0, 10%)` | カード・ドロップダウン |
| 3 | `--shadow-large` | `0px 4px 32px 0px rgba(0, 0, 0, 10%)` | モーダル・フローティング（実測あり） |
| focus | `--focus-shadow` | `0 0 0 4px rgba(206, 126, 0, 20%)` | **フォーカスリング（黄色）** |
| focus (強) | `--focus-shadow-opaque` | `0 0 0 4px rgba(206, 126, 0, 100%)` | 高コントラスト時 |

> **ボタンに `0px 1px 2px rgba(0,0,0,5%)` が常時入る**のがこのシステムの特徴。フラットに見えるが、実際にはごく浅い影で紙のように持ち上げている。

---

## 7. Do's and Don'ts

### Do（推奨）

- **主色は `#dc1e37`（YANMAR Premium Red）。** 面にも文字にも枠にも同じ値を使う
- **余白は 7px グリッド**（7 / 14 / 21 / 35 / 56 / 91px）に載せる
- **本文は 14px / line-height 1.8 / color `#333333`**
- **見出しは line-height 1.5**、ブランド display のみ 1.3
- ボタンの角丸は `5px`、影は `0px 1px 2px rgba(0,0,0,5%)` を常時入れる
- **フォーカスリングは黄色の `0 0 0 4px rgba(206,126,0,20%)`**
- 写真に重ねる面は alpha 版（`--black-50` 等）、白地の上は opaque 版（`#333333` 等）を使い分ける
- 見出しを詰めるときは `font-feature-settings: "pkna" on, "palt" on, "pwid" on` を3つセットで当てる
- コンテナは 1110px、6カラム / ガター 21px

### Don't（禁止）

- **`#dc1e37` と `#ff0000` を混同しない。** 前者はブランド色、後者はエラー専用（`--error-red-100`）
- **`letter-spacing` を足さない。** トークンに定義がなく、実測もほぼ全要素 `normal`
- **`font-feature-settings` を body に置いて全体に継承させない。** 実サイトは適用箇所を絞っている（15要素）
- **DIN Next が読み込まれる前提で組まない。** 計測した3ページでは1つもロードされていない。必ず Noto Sans JP へのフォールバックが成立する形にする
- **角丸を `2px` にしない。** それは Cookie 同意バナー（OneTrust）の値で、ヤンマーの `--border-radius-*` は 3 / 5 / 10 / 9999px
- 余白を 4px / 8px グリッドで刻まない（7px 基準）
- 本文の行間を 1.5 以下にしない（既定は 1.8）
- ボタンから影を外さない（フラットにしない）

### 計測時の注意 — CMP 混入

トップページの `interactive` 抽出10件のうち **6件が OneTrust の Cookie 同意バナー**（`OK` / `Apply` / `Cancel` / `すべて許可する` / `選択した内容で確定する` / `Filter Button`）だった。**OneTrust がブランドレッド `#dc1e37` で設定されているため一見ヤンマーのボタンに見えるが、`border-radius: 2px` と `letter-spacing: 0.13008px` はヤンマーのトークンに存在しない値**。同意バナー由来の値を設計に取り込まないこと。`Filter Button` の `#3860be`（青）も OneTrust の既定色で、ヤンマーの色ではない。

---

## 8. Responsive Behavior

### Breakpoints

```css
--breakpoint-sm:  660px;
--breakpoint-md: 1064px;
--breakpoint-lg: 1200px;
```

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 659px | モバイル |
| Tablet | 660–1063px | タブレット |
| Desktop | 1064–1199px | デスクトップ |
| Wide | ≥ 1200px | コンテナ最大幅（1110px）に到達 |

CSS には 375 / 768 / 1024px など多数の境界が現れるが、**設計トークンとして定義されているのは 660 / 1064 / 1200px の3つ**。新規実装はこの3つに従う。

### タッチターゲット

- Primary ボタン（14px / padding 7px 14px）の実高は約 **39px** — **44px 基準を下回る**。モバイルでは `--spacing-2`（14px）以上の縦 padding に広げて 44px を確保する
- フィルタチップ（padding 14px）は 46px 前後で基準を満たす

### フォントサイズの調整

- 本文 14px はモバイルでも維持する（既定が既に小さい）
- 見出しは `--font-size-large-*` のスケール上を1〜2段下げる（56px → 37.3px → 28px）。中間値を作らない
- ブランド display の 112px はモバイルでは 56px（`large-5`）まで落とす

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:   #dc1e37   (YANMAR Premium Red)
Primary Hover:   #de465a
Primary Press:   #b0182c
Primary Tint:    rgba(220, 30, 55, 0.1)
Error:           #ff0000   (ブランドレッドとは別)
Info / Link:     #0080c1
Success:         #199200
Warning:         #ce7e00
Text:            #333333
Text Strong:     #000000
Surface:         #f2f2f2
Border:          #e5e5e5   (入力欄は #d1d1d1)
Disabled:        #a3a3a3
Background:      #ffffff

Font:            "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Meiryo",
                 "Helvetica Neue", Arial, sans-serif
Brand Display:   "DIN Next", "DIN Next LT Pro", "Noto Sans JP", … (要フォールバック前提)
Size Scale:      10.2 / 11.2 / 12.4 / 14 / 16 / 18.7 / 22.4 / 28 / 37.3 / 56 / 112px
Body Size:       14px
Line Height:     1.8 (本文) / 1.5 (見出し) / 1.3 (ブランド display)
Letter Spacing:  normal   (足さない)
Font Feature:    "pkna" on, "palt" on, "pwid" on  (詰めたい箇所のみ)
Spacing:         7 / 14 / 21 / 35 / 56 / 91 / 147 / 238px  (7px グリッド)
Radius:          3 / 5 / 10 / 9999px   (ボタンは 5px)
Shadow:          0px 1px 2px rgba(0,0,0,5%)  (ボタン常時)
Focus Ring:      0 0 0 4px rgba(206,126,0,20%)  (黄色)
Container:       1110px / 6カラム / ガター 21px
Breakpoints:     660 / 1064 / 1200px
```

### プロンプト例

```
ヤンマーのデザインシステムに従って、製品スペックの絞り込み検索ページを作成してください。

- フォント: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Meiryo", "Helvetica Neue", Arial, sans-serif
- letter-spacing は指定しない
- 本文: 14px / line-height 1.8 / color #333333
- 見出し: 28px / weight 700 / line-height 1.5
- 見出しにのみ font-feature-settings: "pkna" on, "palt" on, "pwid" on を当てる
- 絞り込みボタン（Primary）: 背景 #dc1e37、文字 #ffffff、border 1px solid #dc1e37、
  border-radius 5px、padding 7px 14px、14px/700、box-shadow 0px 1px 2px rgba(0,0,0,0.05)
- リセットボタン（Tertiary）: 背景 #ffffff、文字 #dc1e37、border 1px solid #dc1e37、他は同じ
- 補助ボタン（Secondary）: 背景 #ffffff、文字 #000000、border 1px solid rgba(0,0,0,0.1)、
  border-radius 5px、padding 6.2px 12.4px、12.4px/700
- 選択中のフィルタ項目: 背景 rgba(220,30,55,0.1)、文字 #dc1e37、角丸なし
- 検索入力欄: border 1px solid #d1d1d1、border-radius 50px、padding 6px 35px 6px 15px、12.8px
- フォーカス時: box-shadow 0 0 0 4px rgba(206,126,0,0.2)（黄色のリング）
- 余白は 7px グリッド（7 / 14 / 21 / 35 / 56px）
- コンテナ 1110px、6カラム、ガター 21px
- エラー表示には #ff0000 を使う（#dc1e37 はブランド色なので使わない）
```
