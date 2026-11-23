# DESIGN.md — カンロ（Kanro）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-23 / 対象: `https://www.kanro.co.jp/`, `/corporate/policy/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **本文を weight 500 で組む、ひとつぶ分だけ太いコーポレート。** 可視要素の最多ウェイトが **500（85 要素）**で、400（52 要素）より多い。キャンディのオレンジ `#ea5532` ひと色と、角丸 7px のやわらかい枠線でページ全体をまとめている
- **密度**: 中。本文は 16px / `line-height: 1.5`、読み物は 27px / 1.88 とゆるめる
- **キーワード**: Noto Sans JP の可変フォント、本文 weight 500、Sofia Pro の英語見出し、オレンジ `#ea5532`、Tailwind v4 ＋ Nuxt

**このサイトの核心は5つある。**

1. **Web フォントを 8 ファミリー宣言して、描画に使っているのは 2 つだけ。**
   - Google Fonts: `css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+SC:wght@100..900&family=Roboto:wght@100..900&family=Zen+Maru+Gothic:wght@700&display=swap`
     → **Noto Sans JP だけが `loaded`（124 サブセット中 40 本）。Noto Sans SC（101 本）・Zen Maru Gothic 700（122 本）・Roboto（9 本）は 1 本も読み込まれない**
   - Adobe Fonts（Typekit キット `avb7vnn`）: `sofia-pro` 21 宣言 ／ `kit-rounded` 4 ／ `kit-sans` 4
     → **`sofia-pro` の weight 500 だけが `loaded`。残り 28 宣言はすべて `unloaded`**
   - CSS 全文の `@font-face` は **382 件**。実際のフォント要求は 44 件で、内訳は `fonts.gstatic.com`（Noto Sans JP のサブセット）と `use.typekit.net`（Sofia Pro 1 本）
2. **和文は Noto Sans JP の可変フォント。9 段すべて使える。** 欧文を実スタック 100px で測ると `100 → 1072.11px` / `200 → 1084.59px` / `300 → 1097.08px` / `400 → 1132.98px` / `500 → 1159.52px` / `600 → 1176.70px` / `700 → 1193.88px` / `800 → 1211.03px` / `900 → 1228.20px` と**すべて異なる**（`wght@100..900` の可変軸）
3. **本文の既定ウェイトが 500。** 可視は 500 (85) > 400 (52) > 700 (3・CMP のみ)。Tailwind のトークンも `--font-weight-normal: 400` / `--font-weight-medium: 500` / `--font-weight-bold: 700` の 3 段だが、**サイト本体に 700 は 1 要素も無い**
4. **`font-feature-settings` は 1 件も無い。効くのに使っていない。** 実スタック `"Noto Sans JP", sans-serif` の 100px で `normal` **2150.00px** → `"palt"` **1799.91px（−16.28%）** と確かに詰まるが、実測は 0 要素。**`palt` を足すと既存のレイアウトと別物になる**
5. **ルートが 4 段の階段流体で、768 → 767px の崖が 1.5625 倍。**
   - `≥1201px`: `html { font-size: 16px }` 固定
   - `1200〜768px`: `html { font-size: 1.33333vw }`（= 100vw ÷ 75・**設計幅 1200px**）→ **768px で 10.24px が最小**
   - `767〜390px`: `html { font-size: 16px }` 固定 ← **767px で 16px に跳ね戻る**
   - `≤389px`: `html { font-size: 4.10256vw }`（= 100vw ÷ 24.375・**設計幅 390px**。389px でちょうど 16px に着地するので段差は無い）
   - **タブレット帯の本文が 10px 台まで縮み、モバイルのほうが大きい**

**CSS Custom Properties は 74 個のうち、自社トークンが 28 個**（`--color-main` 〜 `--font-zenmaru`）。残りは **Tailwind v4 の `@theme` 既定値 44 個**（`--color-red-500: oklch(...)` `--spacing: .25rem` `--text-xs` `--radius-sm` `--ease-in-out` など）と Swiper 2 個。**Tailwind v4 の既定は自社トークンと接頭辞が衝突する**（自社は `--color-main` / `--font-noto`）ので、名前の頭だけ見て数えないこと。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | トークン | 実装値 | 実測 |
|------|---------|--------|------|
| **Kanro Orange** | `--color-main` | **`#ea5532`** | 面 18 要素（告知帯、検索、フッター、CTA）／文字 32 要素（`商品情報はこちら` `Pickup` `カンロの取り組み`）／枠線 `1px` / `2px solid` |
| **Orange Light（面）** | `--color-bg` | **`#ed7750`** | 面 1 要素（`Research and Development` のセクション） |
| **Cream** | `--color-sub-2` | **`#f8f5ec`** | 面 1 要素（`Company 会社情報` のセクション） |
| **Pale Pink** | `--color-sub-3` | `#fef1ef` | 宣言あり（可視 0） |
| **Brown** | `--color-brown` | `#9e4a3b` | 宣言あり（可視 0） |

### Semantic（意味的な色）

- **PDF バッジ** (`#ee3d23`): IR のリンクに付く `PDF` ラベル（面 10 要素）。**ブランドオレンジ `#ea5532` とは別の赤**
- **Healthy 6 色**（`--color-healthy01`〜`06`）: `#fcd6ce` / `#fdf5f3` / `#fbe7ce` / `#fef9f4` / `#fcf6d4` / `#fefdf5`。**どれも彩度の低いパステル**で、健康系コンテンツの面に使う（トップ・企業理念ページでは可視 0）
- **Talk 3 色**（`--color-talkblue: #438dae` / `--color-talkgreen: #4fb258` / `--color-talkyellow: #c8a852`）: 対談コンテンツ用（可視 0）
- **Red Light / Red Snow** (`--color-redlight: #e96d56` / `--color-redsnow: #fcd4cc`): 可視 0

### Neutral（ニュートラル）

- **Charcoal** (`--color-charcoal` = `#333333`): 本文（トップ 43 要素 / 下層 12 要素）
- **Gray Dark** (`--color-graydark` = `#202020`): 記事タイトル（5 要素）
- **Gray Link** (`--color-graylink` = `#444444`): カテゴリ名（8 要素）
- **Gray Custom** (`--color-graycustom` = `#5c5c5c`): ヘッダーのサブリンク（4 要素）
- **Gray Light** (`--color-graylight` = `#999999`): 日付（9 要素）
- **Gray BG** (`--color-graybg` = `#f7f7f7`) / **Gray Image** (`--color-grayimage` = `#e8e8e8`): 面（可視 0）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` / 根拠 `viewportTopBySample`）

> **`repeating-linear-gradient(to right, #00dc82 0%, #34cdfe 50%, #0047e1 100%)` は Nuxt のローディングバーの既定色**で、カンロの設計ではない。再現しない。
> **`oklab(0.999994 ... / 0.3)` のような色は Tailwind v4 が `rgb(255 255 255 / 0.3)` を変換したもの。** 普通に `rgba(255,255,255,.3)` と書いてよい

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP（Google Fonts・可変フォント `wght@100..900`）**。トップ 125 要素 / 下層 39 要素
  - `@font-face` は unicode-range で 124 サブセットに分割され、`loaded` は 40 本（和文の分割配信では正常）
  - トークンは `--font-noto: "Noto Sans JP", sans-serif`
- **宣言だけで 1 要素も使われていない和文フォントが 2 つ**
  - `--font-ch: "Noto Sans SC", sans-serif` — 簡体字版。101 サブセットすべて `unloaded`
  - `--font-zenmaru: "Zen Maru Gothic", sans-serif` — 丸ゴシック。**`wght@700` を要求しているのに 122 サブセットすべて `unloaded`**

### 3.2 欧文フォント

- **Sofia Pro（Adobe Fonts / Typekit キット `avb7vnn`）**。トークンは `--font-en: "sofia-pro", sans-serif`
  - **weight 500 の 1 本だけが `loaded`**（21 宣言中）。CDP の実描画も `Sofia Pro`
  - 用途は英語のセクション見出しのみ: `Pickup`（52px）/ `Company` / `Investor Relations` / `Research and Development`（48px）/ `Sustainability` / `Recruit`
  - **キットには `kit-rounded` と `kit-sans` も入っているが、どちらも可視 0**
- **`--font-roboto: "Roboto", sans-serif` は宣言のみ**（9 サブセットすべて `unloaded`・可視 0）

### 3.3 font-family 指定

```css
:root {
  --font-noto: "Noto Sans JP", sans-serif;     /* ← 実際に使うのはこれだけ */
  --font-en:   "sofia-pro", sans-serif;        /* ← 英語見出し（weight 500 のみ） */
  /* 実サイトには以下もあるが、1 要素も使われていない */
  --font-ch:      "Noto Sans SC", sans-serif;
  --font-roboto:  "Roboto", sans-serif;
  --font-zenmaru: "Zen Maru Gothic", sans-serif;
}

body { font-family: var(--font-noto); font-weight: 500; }   /* ← 既定が 500 */
.font-en { font-family: var(--font-en); font-weight: 500; }
```

- **和文スタックが `"Noto Sans JP", sans-serif` の 2 語しかない。** ヒラギノも游ゴシックも書かれていないので、**Web フォントが落ちると端末既定のサンセリフに落ちる**（実サイトはこうだが、日本語サイトとしては `"ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "游ゴシック Medium", "Yu Gothic Medium", メイリオ, Meiryo` を足したほうがよい）
- **Adobe Fonts はドメインライセンスなので、手元の再現では Sofia Pro が出ない。** Google Fonts なら **Poppins** か **Nunito Sans** が字面として近い

### 3.4 文字サイズ・ウェイト階層

**トップページ（可視 140 要素）**

| 用途 | size | family | weight | lh |
|------|------|--------|--------|-----|
| 英語セクション見出し | **52px / 48px** | Sofia Pro | **500** | 48px (**0.92**) |
| 和文セクション見出し | **27px** | Noto Sans JP | 500 | 40.5px (1.50) |
| サブ見出し | **19px** | Noto Sans JP | 500 | 19px (1.00) |
| 記事タイトル | **18px** | Noto Sans JP | 500 | 28.8px (**1.60**) |
| CTA | **17px** | Noto Sans JP | 500 | 24.29px (1.43) |
| 本文・ナビ | **16px** | Noto Sans JP | 500 | 24px (1.50) |
| 商品名 | **15px** | Noto Sans JP | 500 | 23px (1.53) |
| ユーティリティ | **14px** | Noto Sans JP | 500 | 20px (**1.43**) |
| 日付 | **13px** | Noto Sans JP | 400 | 19.5px (1.50) |
| コピーライト | 11px | Noto Sans JP | 400 | 16.5px (1.50) |

**下層ページ（企業理念・可視 46 要素）**

| 用途 | size | lh | letter-spacing |
|------|------|-----|----------------|
| ページ見出し | **32px** | 1.46 | **1.28px**（= 0.04em） |
| 中見出し | 25px | **1.87** | normal |
| セクション見出し | 21px | 1.33 | **0.42px**（= 0.02em） |
| 本文 | 16px | 1.50 | normal |

- **ウェイトは 400 と 500 の 2 段しか使っていない。** 700 は CMP（クッキー同意）の 3 要素だけで、**サイト本体には無い**
- **`font-size` は `rem` の任意値で書かれている**（Tailwind の `text-[1.0625rem]` `text-[1.4375rem]` `text-[0.9375rem]` など）。ルートが流体なので**幅で全部が連動する**

### 3.5 行間・字間

- **`line-height` は無単位の比率**。Tailwind の `--leading-normal: 1.5` と `--text-*--line-height` が基準
- トップの分布: **1.50（61）> 1.43（26）> 1.53（13）> 1.00（9）> 1.88（8）> 0.92（6）**
  - **`0.92` は Sofia Pro の英語見出し**（52px / 48px）。**1 を切る行送り**で、大きな英字を詰める
  - **`1.88` は企業パーパスの読み物**（`私たちカンロは、不透明で決して明るいことばかりでは…`）
- **`letter-spacing` は 80% 以上が `normal`**（トップ 125/140 / 下層 36/46）
  - 当てているのは見出しとリンクだけ: `0.68px` 6 / `0.72px` 5 / `0.76px` 4（トップ）、`1.28px` 2 / `0.42px` 2（下層）
  - **px 値はサイズに比例している**（17px × 0.04 = 0.68 ／ 19px × 0.04 = 0.76 ／ 32px × 0.04 = 1.28 ／ 21px × 0.02 = 0.42）＝**各要素が `em` を持つ型**。`0.04em` / `0.02em` と書いてよい

### 3.6 禁則処理・改行ルール

- `body` に `word-break` の宣言は無し（ブラウザ既定）
- 検索結果ウィジェット（marsflag）だけ `word-break: break-all`。**サイト本体には適用されていない**ので再現しない
- 本文に康熙部首の混入は **0 文字**（両ページ）

### 3.7 OpenType 機能

- **`font-feature-settings` は 1 件も無い**（実測 0 要素）。CSS に出てくるのは Tailwind preflight の `font-feature-settings: var(--default-font-feature-settings, normal)` だけで、変数は未定義＝`normal`
- **ただし書体は機能を持っている。** 実スタック `"Noto Sans JP", sans-serif` の 100px で
  `normal` **2150.00px** → `"palt"` **1799.91px（−16.28%）** ／ `"halt"` **1950.00px（−9.30%）**
- **「できるのにやっていない」型。** `palt` を足すと 16% 詰まって別物になるので、**生成時も書かない**

### 3.8 縦書き

- **縦組みは 0 要素**（両ページ）

---

## 4. Component Stylings

### Buttons

**Primary（オレンジの面）**

```css
.btn-primary {
  font-family: var(--font-noto);
  font-size: 16px; line-height: 24px;    /* 1.50 */
  font-weight: 500;                      /* ← 700 ではない */
  color: #ffffff;
  background: var(--color-main);         /* #ea5532 */
  border: 1px solid var(--color-main);
  border-radius: 5px;
}
```

**Outline（オレンジの枠）**

```css
.btn-outline {
  font-family: var(--font-noto);
  font-size: 16px; line-height: 24px;
  font-weight: 500;
  color: var(--color-charcoal);          /* #333333 */
  background: transparent;
  border: 1px solid var(--color-main);
  border-radius: 7px;                    /* ← 7px。5px との 2 種類 */
}

/* 下層の大きめ */
.btn-outline-lg {
  font-size: 21px; line-height: 27.9999px;  /* 1.33 */
  letter-spacing: 0.42px;                   /* 0.02em */
  color: var(--color-main);
  border: 2px solid var(--color-main);
  border-radius: 7px;
}
```

**Pill（白枠のピル）**

```css
.btn-pill {
  color: #ffffff;
  background: transparent;
  border: 2px solid #ffffff;
  border-radius: calc(infinity * 1px);   /* ← Tailwind v4 の rounded-full。計算値は 33554432px */
}
```

- **`border-radius: 3.35544e+07px` は `calc(infinity * 1px)`**（Tailwind v4 の `rounded-full`）。`9999px` でも同じ見た目になる

### Badges / Chips

```css
.badge-pdf { background: #ee3d23; color: #ffffff; font-size: 10px; line-height: 15px; border-radius: 0; }
```

- **PDF バッジだけ角丸 0**

### Cards

```css
.card { border-radius: 7px; box-shadow: none; }
```

- **影はサイト本体に 1 つも無い**（`box-shadow` の唯一の実測値は CMP の `rgba(0,0,0,.5) 0 5px 15px`）

### Inputs

- 検索はヘッダーのアイコンから開く。入力欄自体はブランドオレンジの面（`#ea5532`）に白文字

---

## 5. Layout Principles

### Spacing Scale

- Tailwind v4 の `--spacing: .25rem` が基準。**ルートが流体なので 1 単位の実寸が幅で変わる**（1440px で 4px、768px で 2.56px、767px で 4px）
- 実測の gap: トップが `normal 20px` 4 / `20px` 3 / `35px` / `normal 40px` / `24px` / `50px 30px` / `30px` / `25px`、下層が `20px` 3 / `35px` / `normal 40px` / `25px` / `10px 4%`
- **`20px` 系が主。** `4%` という比率の gap が下層に 1 件

### Container

- トップは `max-width` の実測が **0 件**（全幅のモザイクレイアウト）
- 下層は **960px / 880px** が各 1 件

### Grid

- トップは 5997×750 の全幅画像を軸にした写真モザイク
- セクション見出しは「英語 48〜52px（Sofia Pro）」の下に「和文 27px」を置く 2 段組

---

## 6. Depth & Elevation

**サイト本体に影は無い。**

| 影 | 用途 | 件数 |
|----|------|------|
| `rgba(0, 0, 0, 0.5) 0 5px 15px 0` | CMP（クッキー同意バナー） | 1 |

- 階層は**面の色（`#ea5532` / `#ed7750` / `#f8f5ec`）と角丸 7px の枠線**だけで作る
- Tailwind の `--blur-lg: 16px` は宣言のみ

---

## 7. Do's and Don'ts

### Do（推奨）

- **本文の `font-weight` は 500**（`--font-weight-medium`）。400 は日付とコピーライトだけ
- **英語の見出しは `font-family: "sofia-pro", sans-serif` / weight 500 / `line-height: 0.92`**。和文見出し 27px をその下に置く 2 段組
- **ブランドオレンジは `#ea5532`**（`--color-main`）。CTA の面・文字・枠線すべてこれ 1 色
- **角丸は 7px**（枠線ボタン・カード）、**面のボタンは 5px**、ピルは `calc(infinity * 1px)`
- **影を付けない。** 階層は面の色と枠線で作る
- **字間は `0.04em`（見出し）/ `0.02em`（セクション見出し）**。本文は `normal`
- 色は `--color-*` のトークン名で呼ぶ（自社トークンは 28 個）

### Don't（禁止）

- **`font-weight: 700` を使わない。** サイト本体に 1 要素も無い（700 は CMP だけ）。Noto Sans JP は可変フォントなので 700 を書くと**本当に太く出てしまう**
- **`font-feature-settings: "palt"` を足さない。** 実測 0 件。書体は機能を持っているので、足すと **−16.28%** 詰まって別物になる
- **`"Zen Maru Gothic"` / `"Noto Sans SC"` / `"Roboto"` / `"kit-rounded"` / `"kit-sans"` を使わない。** トークンや `@font-face` には存在するが、**どれも 1 サブセットも読み込まれておらず可視 0**
- **`--color-healthy01`〜`06` / `--color-talk*` / `--color-sub-3` / `--color-brown` を「このサイトの色」として使わない。** 宣言はあるが、トップ・企業理念ページでは可視 0。別セクション専用
- **Nuxt のローディングバーのグラデーション（`#00dc82 → #34cdfe → #0047e1`）を再現しない。** フレームワーク既定であってカンロの色ではない
- **CSS 変数 74 個を「自社トークン 74 個」と読まない。** 44 個は Tailwind v4 の `@theme` 既定値、2 個は Swiper、**自社は 28 個**
- **`rem` を 16px 基準で換算しない。** ルートが 4 段の階段流体で、1200〜768px では `1.33333vw`（768px で **10.24px**）になる
- **和文スタックを `"Noto Sans JP", sans-serif` の 2 語で済ませない。** 実サイトはこうだが、Web フォントが落ちたときに日本語が端末既定に落ちる。ヒラギノ・游ゴシックを足したほうがよい
- **検索結果の `word-break: break-all` を本体に持ち込まない。** marsflag ウィジェット固有の指定

---

## 8. Responsive Behavior

### Breakpoints

| 条件 | 件数 | 用途 |
|------|------|------|
| `(max-width: 576px)` | 7 | 小型端末 |
| `(min-width: 48rem)` | 6 | = 768px |
| `(max-width: 767px)` | 5 | モバイル |
| `(min-width: 768px)` | 4 | デスクトップ |
| `(max-width: 768px)` | 3 | — |
| `(max-width: 1090px)` | 2 | — |
| **`screen and (min-width: 1201px)`** | 1 | **ルート固定（16px）** |
| **`screen and (max-width: 1200px)`** | 1 | **ルート流体（1.33333vw）** |
| **`screen and (max-width: 767px)`** | 1 | **ルート固定（16px）** |
| **`screen and (max-width: 389px)`** | 1 | **ルート流体（4.10256vw）** |

### フォントサイズの調整

**ルートは 4 段。崖は 768 → 767px の 1 箇所で 1.5625 倍。**

| 幅 | `html` / `body` | 式 |
|----|-----------------|-----|
| 1920 / 1440 / 1201px | **16px** | `font-size: 16px` |
| 1200px | 16px | `1.33333vw`（設計幅 1200px でちょうど 16px） |
| 1024px | **13.6533px** | `1.33333vw` |
| 992px | 13.2266px | 〃 |
| 834px | **11.12px** | 〃 |
| 769px | 10.2533px | 〃 |
| **768px** | **10.24px** ← **最小** | 〃 |
| **767px** | **16px** ← **1.5625 倍に跳ぶ** | `font-size: 16px` |
| 600 / 481 / 480 / 414 / 390px | 16px | 〃 |
| 375px | **15.3846px** | `4.10256vw`（設計幅 390px） |
| 320px | 13.1282px | 〃 |

- **`1.33333vw` = 100vw ÷ 75 → 分母 75 × 16 = 設計幅 1200px**
- **`4.10256vw` = 100vw ÷ 24.375 → 分母 24.375 × 16 = 設計幅 390px**。389px でちょうど 16px に着地するので**モバイル側の境目には段差が無い**
- **タブレット帯（1200〜768px）の本文が 10〜13px まで縮み、モバイル（767px 以下）のほうが大きくなる**
- **規定の 4 幅（1440 / 1200 / 834 / 375px）では崖が見えない。** 768 / 767 を測らないと「ただの流体」に見える
- サイズ・余白・角丸がすべて `rem` なので、**幅を変えると全部が連動する**

### タッチターゲット

- CTA は 16px / lh 24px ＋ padding。**767px 以下ではルートが 16px に戻るので、モバイルでの実寸はデスクトップのタブレット帯より大きい**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
和文: "Noto Sans JP", sans-serif（Google Fonts / 可変 wght@100..900）
欧文: "sofia-pro", sans-serif（Adobe Fonts / weight 500 のみ）※代替は Poppins / Nunito Sans
ブランドオレンジ: #ea5532 (--color-main)   面のオレンジ: #ed7750 (--color-bg)
クリーム        : #f8f5ec (--color-sub-2)  PDF バッジ  : #ee3d23
本文色          : #333333 (--color-charcoal)  日付: #999999  記事: #202020
背景            : #ffffff
本文            : 16px / weight 500 / line-height 1.50 / letter-spacing normal
英語見出し      : 48〜52px / Sofia Pro / weight 500 / line-height 0.92
和文見出し      : 27px / weight 500 / line-height 1.50
読み物          : line-height 1.88
字間            : 見出し 0.04em / セクション見出し 0.02em / 本文 normal
角丸            : 枠線ボタン・カード 7px / 面のボタン 5px / ピル calc(infinity * 1px)
影              : 無し
ルート          : ≥1201px 16px → 1200〜768px は 1.33333vw（768px で 10.24px）
                  → 767〜390px 16px（1.5625 倍に跳ぶ）→ ≤389px は 4.10256vw
palt            : 使わない（効くが実測 0 件）
縦組み          : 無し
```

### プロンプト例

> カンロのデザインで、商品カテゴリの紹介セクションを作ってください。
> セクション見出しは `font-family: "sofia-pro", sans-serif`（代替 Poppins）の 48px / weight 500 / `line-height: 0.92` で英語を置き、
> その下に `"Noto Sans JP", sans-serif` の 27px / weight 500 / `line-height: 1.50` で和文を重ねてください。
> **本文は weight 500**（400 ではない）、16px / `line-height: 1.50`。
> CTA は `#ea5532` の面に白文字・`border-radius: 5px`、枠線ボタンは `1px solid #ea5532` ・`border-radius: 7px`。
> **影は付けないでください。** `font-feature-settings` も書かないでください。
> ルートは `html { font-size: 16px }` を基本に、1200px 以下で `1.33333vw`、767px 以下で再び `16px` に戻してください。
