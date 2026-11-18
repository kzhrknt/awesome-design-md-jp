# DESIGN.md — ティアフォー (TIER IV)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-18 / 対象: `https://tier4.co.jp/`, `https://tier4.co.jp/about-us?hsLang=ja`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **字間を一切触らず、Noto Sans JP の可変フォントを太く大きく置く。** ほぼ白（`#f9fbfd`）の地に、ネイビー `#1f2933` の文字とターコイズ `#5cb4c0` のアクセント。角丸 30px のカードと 60px の大きなセクション角で、ソフトウェア企業らしい軽さを出す
- **密度**: ゆったり。本文 18px・行間 1.75、見出しは 48〜54px。コンテナは 900px と狭く、1 画面に詰め込まない
- **キーワード**: ターコイズ、角丸 30/60px、字間 normal、Futura PT、`--window-width` 連動の流体ルート

**このサイトの核心は 5 つある。**

1. **`letter-spacing` を 1 度も触らない。** 可視テキスト 148 要素中 **140 要素が `normal`**（下層ページでは 140/148）。残る `0.1px` `0.25px` `0.5px` はすべて Cookiebot のダイアログで、サイト本体ではない。CSS 全文に出てくる字間の宣言は `letter-spacing:0` の 1 種類だけ
2. **ルートが JS 変数連動の流体で、1079/1080px に過去最大の崖がある。** `html { font-size: calc(var(--window-width) / 192) }`（デスクトップ）と `calc(var(--window-width) / 37.5)`（≤1079px）の 2 段。`--window-width` は JS が実ウィンドウ幅を px で書き込む。**1080px で `5.625px` → 1079px で `28.773px` ＝ 5.12 倍に跳ぶ**
3. **Adobe Fonts の Futura PT を 14 本宣言して、実際に使うのは 1 本だけ。** `@font-face` は `futura-pt` が 12 本（300/400/500/600/700/800 × roman/italic）＋ `futura-pt-bold` が 2 本。`document.fonts` で `loaded` になるのは **500 の 1 本**で、当たっているのは会社情報ページの役職名（`取締役 EVP / CFO` など）**21 要素だけ**
4. **本文コピーに康熙部首（CJK 部首補助）が 44 文字・18 種まぎれている。** `⼤ ⾃ ⺠ ⼈ ⽣ ⽂ ⼀ ⼒ ⽀ ⽇ ⽋ ⾰ ⼼ ⼿ ⾵ ⾝ ⾏ ⽅`。**48px の見出し `⼈々の可能性が、` `⽣産的に。` や 42px の `⾃動運転の⺠主化` まで含む**。トップページの h1 は正しい漢字の「自動運転の民主化」なので、**同じ言葉が同じサイトで 2 通りの文字コードで書かれている**
5. **`body { line-height: 1 }`。** 無単位の `1` が全子孫に降りるので、宣言し直さない要素は行が潰れる。実測でも `body` の行送りは `font-size` と同値（1440px で 18px / 18px）

**`font-feature-settings` は CSS 全文に 1 件も無く、実測も 2 ページとも 0 要素。** `writing-mode` も 0 要素。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| ターコイズ（アクセント） | `#5cb4c0` | `--Text-Blue`。セクションのラベル（`ミッション` `ビジョン` `プレスリリース`）の文字色。トップ 8 要素・下層 10 要素 |
| ネイビー（本文・面） | `#1f2933` | `--Text-Default` と `--BG-BGnormal` が**同じ値**。文字色としてトップ 41 要素・下層 101 要素で最多、同時に暗いセクションの面にも使う |
| 濃ネイビー | `#171c21` | `--BG-BGdark`。フッター |
| 最暗 | `#090b0d` | `--bgb-gdark-20`。CTA の面 |
| グラデーション | `linear-gradient(90deg, #283d56, #3c5f79)` | `--Gradation-Gradation-dark`。問い合わせ導線の帯 |

> **`#1f2933` は文字色でもあり面色でもある。** 片方だけに使う色ではないので、「本文色」「背景色」と分けてトークン化しない

### Semantic（意味的な色）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| CTA の面 | `#090b0d` | 白文字・12px・weight 700 |
| 淡い面（カード・タグ） | `#f1f4fa` | 役員カード・言語切替 |
| 役職バッジの面 | `#515973` | 白文字 16.5px / weight 700 |
| 区切り線 | `#e1e1e1` | `--Divider-Dividerlight` |

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| 本文 | `#1f2933` | 下層 101 要素で最多 |
| 反転文字 | `#ffffff` | 暗い面の上。トップ 22 要素・下層 27 要素 |
| ページ背景 | `#f9fbfd` | `--BG-tier4white`。`body` に直接指定。**純白ではない** |
| ダークの面 | `#1a3148` | ヒーローの `::after` 疑似要素（1440×900） |

> **CSS 変数の名前は Figma の変数エクスポートそのまま。** `--BG-BGnormal` `--Gradation-Gradation-dark` のようにグループ名が二重になっている。**値はそのまま使ってよいが、命名規則としては真似しない**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP（Google Fonts の可変フォント `wght@100..900`）→ 游ゴシック → ヒラギノ角ゴ Pro → メイリオ → Osaka → ＭＳ Ｐゴシック
- **明朝体**: 使用しない

> フォント要求は 48 件（`fonts.gstatic.com` 45 / `use.typekit.net` 2 / `p.typekit.net` 1）。Noto Sans JP は unicode-range で 100 本以上に分割されるため、`document.fonts` に `unloaded` が多数並ぶのは正常

### 3.2 欧文フォント

- **サンセリフ（欧文専用）**: `futura-pt`（Adobe Fonts）。`--ff-en` として定義
- **その他**: `Noto Sans SC` を宣言しているが日本語ページでは `unloaded`（多言語用）。`Lato` / `Merriweather` も宣言されているが**可視 0 要素**（HubSpot テーマの既定値の残骸）

> **Futura PT は 14 本宣言して 1 本しか使っていない。** `loaded` になるのは weight 500 だけで、当たるのは会社情報ページの英語役職名 21 要素のみ。**300〜800 の全ウェイトを使えると思って設計しない**

### 3.3 font-family 指定

```css
:root {
  /* 和文（実サイトの --ff-jp をそのまま） */
  --ff-jp: "Noto Sans JP", "游ゴシック", YuGothic, "ヒラギノ角ゴ Pro",
           "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", Osaka,
           "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  /* 欧文（役職名など、ごく限られた用途だけ） */
  --ff-en: "futura-pt", "Futura PT", sans-serif;
}
```

**フォールバックの考え方**:
- Noto Sans JP が先頭で確実に `loaded` になるため、以降の候補が使われるのは読み込み失敗時だけ
- **ただしスタックに `"游ゴシック Medium"` / `"Yu Gothic Medium"` が無い。** Noto Sans JP が落ちた Windows 環境では `游ゴシック`（Regular）に当たって細く出る。**実サイトはこうだが、正しくは Medium を Regular より前に足す**
- `ＭＳ Ｐゴシック`（全角）と `MS PGothic`（半角）を両方書いている。順序も含めてそのまま写す
- 途中に generic family が無いので、スタックの全候補が生きている

### 3.4 文字サイズ・ウェイト階層

実測値は **1440px 幅（`html` = 7.5px）** のときのもの。ルートが流体なので幅で変わる（3.5・8 章参照）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (en) | futura-pt | 54px | 500 | 64.8px (1.20) | normal | ヒーローの英文。**Futura PT が当たる唯一の大見出し** |
| Heading 1 | Noto Sans JP | 54px | 700 | 81px (1.50) | normal | 下層ページ h1（`モビリティの価値を再定義する`） |
| Heading 2 (大) | Noto Sans JP | 48px | 700 | 72px (1.50) | normal | `⼈々の可能性が、` `世界でつくり、世界をつくる。` |
| Heading 2 (中) | Noto Sans JP | 42px | 700 | 50.4px (1.20) | normal | `⾃動運転の⺠主化` |
| Heading 3 | Noto Sans JP | 24px | 700 | 36px (1.50) | normal | 小見出し（下層 25 要素） |
| Lead | Noto Sans JP | 21px | 400 | 36.75px (1.75) | normal | ヒーロー下のリード（白文字） |
| Body | Noto Sans JP | 18px | 400 | 31.5px (1.75) | normal | 本文。下層 51 要素で最多 |
| Nav / Caption | Noto Sans JP | 14px | 400 | 1.00 | normal | グローバルナビ |
| Meta | Noto Sans JP | 13.5px | 500 | normal | normal | 日付・カテゴリ（`2026年11月13日` `プレスリリース`） |
| Small | Noto Sans JP | 12px / 10.5px | 700 / 400 | 1.00 | normal | ラベル・注記 |

> **ウェイトは 400 / 500 / 700 の 3 段。** 可変フォント（`wght@100..900`）なので 500 は本物の中間ウェイト。600 は Cookiebot だけなので使わない

### 3.5 行間・字間

- **`body { line-height: 1 }`**（無単位）。`html` は `1.15`
- **本文ブロックは必ず `line-height` を宣言し直す。** 宣言が無いと `1` が降りて行が潰れる
- 本文 `1.75` / 大見出し `1.50` / 中見出しとナビ `1.20`〜`1.00`
- **`letter-spacing` は書かない。** サイト全体で `normal`

```css
body {
  font-size: 2.4rem;   /* 1rem = 7.5px @1440px なので 18px */
  line-height: 1;      /* ← これが全子孫に降りる。本文側で必ず上書きする */
}
.article p { font-size: 18px; line-height: 1.75; }  /* 上書きの例 */
```

> **字間を足さないのがこのサイトの設計。** 和文は Noto Sans JP の素の字送りのまま、行間だけで読みやすさを作っている。`letter-spacing: 0.05em` のような「日本語のお作法」を足すと別物になる

### 3.6 禁則処理・改行ルール

```css
body {
  word-break: normal;   /* 実サイトの computed 値。明示指定は無い */
}
```

- `word-break` / `overflow-wrap` / `line-break` の明示指定は無く、すべてブラウザ既定
- 改行位置は `<br>` と要素の折り返しで手で作る
- **本文に康熙部首が混ざっている箇所では、通常の漢字と改行挙動が変わりうる**（部首は別の文字クラスとして扱われる）。再現するときは必ず通常の漢字で書く

### 3.7 OpenType 機能

```css
/* 実サイトは font-feature-settings を CSS に 1 件も書いていない（実測 0 要素） */
```

- **`palt` は 2 ページとも 0 要素。** CSS 全文を grep しても `font-feature-settings` は 1 件も出てこない
- **ただし Noto Sans JP は `palt` を持っており、足せば効く。** 実スタック・40px・weight 700 で隠し要素の幅を測ると `normal` **1013.16px** → `"palt"` **908.31px**（**−10.35%**）、`"halt"` は **933.16px**（−7.90%）
- 字間も字詰めも一切しないのがこのサイトの立場。**`palt` を足すと見出しの字面が 1 割詰まって別物になる**

### 3.8 縦書き

```css
/* 使用しない。writing-mode は 2 ページとも 0 要素 */
```

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#090b0d`
- Text: `#ffffff`
- Font Size: 12px / Weight 700
- Border Radius: 9999px（pill）

**Secondary**
- Background: `#ffffff`
- Text: `#1f2933`
- Font Size: 12px / Weight 700
- Border Radius: 9999px

### Badges / Chips

- 役職バッジ: 面 `#515973` / 白文字 / 16.5px / weight 700 / 行間 24.75px
- 言語切替: 面 `#f1f4fa` / 文字 `#1f2933` / 14px / weight 400

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#e1e1e1`
- Border Radius: 8px
- Padding: 12px 16px
- Font Size: 14px

### Cards

- Background: `#ffffff`
- Border: なし
- Border Radius: 30px（34 要素で最多）
- Shadow: `rgba(16, 18, 36, 0.08) 0px 3px 12px 0px`（14 要素）
- セクションの大きな角: 60px / `60px 60px 0px 0px`（上だけ丸める）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 12px |
| M | 24px |
| L | 36px |
| XL | 48px |
| XXL | 90px |

> 実測の `gap`: `12px 0px` / `24px 0px` / `36px 0px` / `24px 40px` / `48px 3.125%` / `90px 39.75px`。**横方向の gap に `%` を使う箇所がある**

### Container

- Max Width: **900px**（下層 13 要素で最多）。読み物の幅が狭い
- サブコンテナ: 700px（本文ブロック）
- フルブリード: 1440px / 1600px
- `--window-width: 1440px` / `--window-height: 900px` は **JS が実ウィンドウ寸法を書き込む変数**で、デザイントークンではない

### Grid

- Columns: 2〜3 列のカード。`display: flex` と `gap` で組む
- Gutter: 36px（縦）/ 40px（横）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 面を分ける箇所の大半 |
| 1 | `rgba(16, 18, 36, 0.08) 0px 3px 12px 0px` | カード（下層 14 要素） |
| 2 | `rgba(16, 18, 36, 0.08) 0px 4px 16px 0px` | 浮いたナビ・リンクカード（6 要素） |
| — | `rgba(0, 0, 0, 0.1) 0px 1px 4px 0px` | ヘッダーの薄い影 |

> **影の色は黒ではなく `rgba(16, 18, 36, 0.08)`**（`--bgb-gdark-20` に近いネイビー）。**黒に丸めない**。ぼかし半径だけを 12px / 16px と変えて 2 段にしている

---

## 7. Do's and Don'ts

### Do（推奨）

- **`letter-spacing` は書かない。** サイト全体で `normal` を貫く
- 本文は 18px / `line-height: 1.75`。**`body` の `line-height: 1` を必ず上書きする**
- 見出しは Noto Sans JP の weight 700 で 48〜54px、行間 1.50
- ウェイトは 400 / 500 / 700 の 3 段。可変フォントなので 500 は本物の中間ウェイト
- カードは `border-radius: 30px` ＋ `rgba(16,18,36,0.08) 0 3px 12px`。セクションの角は 60px
- アクセントのターコイズ `#5cb4c0` は**文字色にだけ**使う（ラベル・見出しの上の小さな英字）
- 背景は純白ではなく `#f9fbfd`
- コンテナは 900px。読み物の幅を広げない

### Don't（禁止）

- **`palt` を足さない。** Noto Sans JP では **−10.35%** 効いてしまい、字間 `normal` の設計と噛み合わない
- **`letter-spacing: 0.05em` のような「日本語のお作法」を足さない。** 実サイトは意図的に触っていない
- **康熙部首（`⼈` `⾃` `⺠` `⽣` `⽂` `⼀` …）を書かない。** 実サイトの本文と見出しには 44 文字混入しているが、これは InDesign/Illustrator からのコピーで入り込む事故で、**検索・コピー・読み上げが壊れる**。必ず通常の漢字（`人` `自` `民` `生` `文` `一`）で書く
- **Futura PT を 300〜800 の全ウェイトで使えると思わない。** 実際に `loaded` になるのは 500 の 1 本だけ
- **`Lato` / `Merriweather` を再現しない。** HubSpot テーマの既定値が残っているだけで可視 0 要素
- **ルートに `rem` を使うときは 1rem = 7.5px（1440px 時）であることを忘れない。** 16px 前提で `rem` を書くと 2 倍以上ずれる
- **タブレット幅（768〜1079px）の本文サイズを「ちょうどよい」前提で設計しない。** この帯はモバイル用の式が当たり、本文が 32〜46px になる（8 章）
- **CSS 変数の命名（`--BG-BGnormal`）を真似しない。** Figma エクスポートでグループ名が二重になっているだけ

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | `(max-width: 767px)` が 9 件 |
| Tablet / SP 拡大 | 768〜1079px | `screen and (max-width: 1079px)` が **47 件で最多**。モバイル用の式がそのまま当たる |
| Desktop | ≥ 1080px | `screen and (min-width: 1080px)` が 15 件 |

### ルートの流体スケーリング

```css
html { font-size: calc(var(--window-width) / 192); }          /* ≥1080px。設計幅 1920px */
@media screen and (max-width: 1079px) {
  html { font-size: calc(var(--window-width) / 37.5); }       /* ≤1079px。設計幅 375px */
}
body { font-size: 2.4rem; }                                   /* = ルートの 2.4 倍 */
```

- `--window-width` は **JS が実ウィンドウ幅（px）を書き込む変数**。実質 `vw` と同じだがスクロールバー幅を含まない
- デスクトップの設計幅は **1920px**（1920px でちょうど `html: 10px`）。モバイルの設計幅は **375px**（375px でちょうど `html: 10px`）
- CSS の値は「設計 px ÷ 10」を `rem` で書く（`2.4rem` = 24px @1920px）

| 幅 | `html` | `body` | h1 | h2 |
|---|---|---|---|---|
| 1920px | 10px | 24px | 72px | 56px |
| 1600px | 8.333px | 20px | 60px | 46.67px |
| 1440px | 7.5px | 18px | 54px | 42px |
| 1200px | 6.25px | 15px | 45px | 35px |
| **1080px** | **5.625px** | **13.5px** | 40.5px | 31.5px |
| **1079px** | **28.773px** | **46.04px** | 97.83px | 80.57px |
| 834px | 22.24px | 35.58px | 75.62px | 62.27px |
| 768px | 20.48px | 32.77px | 69.63px | 57.34px |
| 600px | 16px | 25.6px | 54.4px | 44.8px |
| 414px | 11.04px | 17.66px | 37.54px | 30.91px |
| 375px | 10px | 16px | 34px | 28px |
| 320px | 8.533px | 13.65px | 29.01px | 23.89px |

> **1080 → 1079px の 1px で `html` が 5.12 倍に跳ぶ。** 収録済みサイトの崖（ドトール 4.1 倍・関西ペイント 3.64 倍・第一三共 2.3 倍）を超える最大値。デスクトップの最小は **1080px の 5.625px** で、ここでは本文が 13.5px まで縮む
> **規定の 4 幅（1440 / 1200 / 834 / 375px）では崖が見えない。** 境目の `max-width: 1079px` の ±1px を必ず測る

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- サイズはすべて `rem` でルートに連動するので、個別の調整はほとんど無い
- モバイル（≤767px）では設計幅 375px に対する相対値として組む

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Accent Color: #5cb4c0（文字色のみ）
Text / Dark Surface: #1f2933
Background: #f9fbfd
CTA fill: #090b0d / radius 9999px
Card: radius 30px + rgba(16,18,36,0.08) 0 3px 12px
Font (ja): "Noto Sans JP", "游ゴシック", YuGothic, "ヒラギノ角ゴ Pro",
           "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", Osaka,
           "ＭＳ Ｐゴシック", "MS PGothic", sans-serif
Font (en): "futura-pt", "Futura PT", sans-serif  ← 役職名など限定用途
Body Size: 18px @1440px（1rem = 7.5px）
Line Height: body は 1、本文ブロックで 1.75 に上書き
Letter Spacing: normal（書かない）
font-feature-settings: 書かない
Weights: 400 / 500 / 700
Container: 900px
```

### プロンプト例

```
ティアフォーのデザインシステムに従って、プレスリリースの一覧ページを作成してください。
- font-family は上記の和文スタック。letter-spacing は一切書かない
- body に line-height:1 を書くなら、本文ブロックで必ず 1.75 に上書きする
- 本文 18px/400、見出し 48px/700（行間 1.5）、小見出し 24px/700
- 日付とカテゴリは 13.5px/500、カテゴリの文字色は #5cb4c0
- 背景は #f9fbfd、本文色は #1f2933、カードは白地 + border-radius 30px +
  box-shadow: rgba(16,18,36,0.08) 0 3px 12px
- CTA は #090b0d の面に白文字 12px/700、border-radius 9999px
- コンテナ幅は 900px、ブレークポイントは 767 / 1079 / 1080px
- font-feature-settings は書かない（palt を足すと 1 割詰まる）
- 漢字は必ず通常の文字で書く（康熙部首 ⼈ ⾃ ⺠ などを使わない）
```
