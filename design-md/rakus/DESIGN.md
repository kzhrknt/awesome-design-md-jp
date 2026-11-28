# DESIGN.md — ラクス（RAKUS）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-28 / 対象: `https://www.rakus.co.jp/`, `https://www.rakus.co.jp/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地にオレンジ 1 色。角丸は **5px のただ 1 種**、影も **1 種類だけ**。SaaS の企業サイトとしては装飾を徹底的に削り、**面の色とウェイトだけで階層を作る**
- **密度**: 中。本文 14px・行間 1.50 を既定にして、セクション見出しだけ 36〜100px に跳ね上げる。欧文の大見出し（`About` `Service` `News`）と和文の小見出しを上下に重ねる構成
- **キーワード**: ラクスオレンジ、可変フォント、5px の角丸、サービス別の識別色、root 10px

**このサイトの核心は 4 つある。**

1. **和文も欧文も Google Fonts の可変フォント 1 本ずつ。** `Noto Sans JP:wght@100..900` と `Roboto:wght@100..900` を `@import` で読み、**実際に使うのは 400 / 500 / 700 の 3 段だけ**（実測 122〜167 要素が `"Noto Sans JP", sans-serif`、7〜17 要素が `Roboto, sans-serif`）。可変軸を持っているのに 3 段しか使わない
2. **字間は「各要素が `em` を持つ」型で、和文は正・欧文の大見出しは負。** `About`(100px) は `-2px`＝**-0.02em**、`Mission`(35px) は `-0.7px`＝**-0.02em**。一方で和文の CTA(16px) は `0.8px`＝**+0.05em**、和文の小見出し(17px) は `0.51px`＝**+0.03em**。**符号が逆**
3. **ヒーローの大見出しは `<video>` に焼き込まれている。** 「働く人を「楽！」にする」は DOM 上では `h1.u-visually-hidden`（**1×1px**）で、画面に出ているのは `/assets/mov/rakus_kv_pc_jp.mp4`（1104×524）。**ここを Web フォントで実装しない**
4. **サービスごとに識別色を持つ。** `--color-seisan`（経費精算 `#007bc7`）〜 `--color-r-jugyoinportal` まで **12 サービス分の色**が CSS 変数として並び、うち 5 つは `-light` の対になっている。コーポレートのオレンジとは別系統

**`font-feature-settings: "palt"` は CSS 全文で 1 箇所、AI 戦略ページの 1 クラス（`.p-page-ai-strategy__product-catch`）にしか書かれていない**（計測した 2 ページとも実測 **0 要素**）。書体側は対応しており、同じスタック・40px での実測は `normal` 759.20px → `"palt"` 619.20px＝**−18.4%**。**効くのに使っていない**。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **ラクスオレンジ** | **`#f08300`** (`--color-orange-700`) | **可視 33 要素**。CTA の面、欧文大見出しの文字色、メガメニューの面、SVG ロゴの `fill` |
| Orange 600 | `#f39b33` | ホバー・淡い面 |
| Orange 500 | `#f6b466` | — |
| Orange 400 | `#f9cd99` | — |
| Orange 300 | `#fce6cc` | — |
| Orange 200 | `#fef2e5` | — |
| **Orange 100** | **`#fff9f2`** | **下層ページのセクション地色**（`pageBackground.viewportTopByArea` が `rgb(255,249,242)` を返した面） |

> オレンジは **700 → 100 の 7 段ランプ**。実際に可視で確認できたのは **700 と 100 の 2 つだけ**で、600〜200 は宣言のみ。**ランプ全部が実装されていると思って使わない。**

### Service（サービス別の識別色）

| サービス | 色 | Light |
|---|---|---|
| 楽楽精算 | `#007bc7` | `#73c4ff` |
| 楽楽明細 | `#267d00` | `#86e026` |
| 楽楽販売 | `#f53c20` | `#ff8181` |
| 問い合わせ自動応対 | `#f08300` | `#ffc266` |
| 電子帳簿保存 | `#a43fd1` | `#d078ff` |
| メールマーケティング | `#172a88` | — |
| 楽楽請求 | `#0ba578` | — |
| 債権管理 | `#00ad0e` | — |
| 勤怠管理 | `#2531b7` | — |
| 人事労務 | `#107de8` | — |
| 従業員ポータル | `#464646` | — |

> **コーポレートの色とサービスの色を混ぜない。** 問い合わせ自動応対だけはブランドオレンジと同じ `#f08300` を使う。

### Neutral（ニュートラル）

- **Text Primary** (`#323232` / `--color-gray-700`): 本文・見出し。**可視 128 要素（トップ）/ 94 要素（下層）で最多**。**純黒は 1 要素も使っていない**
- **Text Secondary** (`#5a5a5a` / `--color-gray-600`): 日付・補助（実測は近似値 `rgb(93,93,93)` が 5 要素）
- **Text Muted** (`#6e6e6e` / `--color-gray-500`): 定義リストの見出し
- **Text Disabled** (`#bebebe` / `--color-gray-400`): 言語切替の非選択（`EN`）
- **Border** (`#d2d2d2` / `--color-gray-300`): 入力欄・ボタンの枠
- **Border Light** (`#e6e6e6` / `--color-gray-200`): 定義リストの区切り線
- **Surface** (`#f5f5f5` / `--color-gray-100`): カードの面、言語切替の非選択面
- **Background** (`#ffffff` / `--color-white`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）
- **Header Overlay** (`rgba(255,255,255,0.9)` / `--color-white-opacity-900`): 追従ヘッダーの面

> **`--color-gray-100` と `--color-gray-50` はどちらも `#f5f5f5`。** 名前は 2 つだが値は 1 つ。

### Semantic（意味的な色）

- **Notice / Danger** (`#aa0000` / `--color-notice`): 注意喚起
- **Blue** (`#2531b7` / `--color-blue`): 勤怠管理の色と同値
- **Shadow** (`rgba(0,0,0,0.15)` / `--color-shadow`)
- **Overlay** (`rgba(32,32,32,0.5)` / `--color-overlay`)

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Noto Sans JP**（Google Fonts の可変フォント `wght@100..900`）。実測 122〜167 要素、ページの和文はすべてこれ
- **明朝体**: 使っていない
- **游ゴシックのスタックが CSS 変数として宣言されているが、参照が 0 回**（後述）

### 3.2 欧文フォント

- **サンセリフ**: **Roboto**（Google Fonts の可変フォント `wght@100..900`）。欧文の大見出し（`About` `Service` `News` `Mission` `Vision`）と言語切替に使う。実測 7〜17 要素
- **Onest** も同じ `@import` で読み込まれているが、**CSS 全文で `@import` の 1 行以外に 1 度も出てこない**（`document.fonts` でも `unloaded`、可視 0 要素）。**真似しない**

### 3.3 font-family 指定

```css
:root {
  --font-jp: "Noto Sans JP", sans-serif;
  --font-en: "Roboto", sans-serif;
}

/* 本文・UI（既定） */
font-family: "Noto Sans JP", sans-serif;

/* 欧文の大見出し・言語切替 */
font-family: "Roboto", sans-serif;
```

```css
/* 読み込み（実サイトのまま） */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Onest:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap");
```

**フォールバックの考え方**:
- **和欧を 2 変数で分ける**（`--font-jp` / `--font-en`）。混植のスタックは作らず、**要素ごとにどちらかを当てる**
- 受け皿は `sans-serif` のみ。ヒラギノ・游ゴシックを並べない割り切り
- **`--font`（游ゴシックのスタック）は宣言だけで `var(--font)` の参照が CSS 全文に 0 回**。死に変数なので**実装に持ち込まない**

```css
/* 実サイトに存在するが 1 度も参照されていない宣言 */
--font: "游ゴシック体", YuGothic, "游ゴシック Medium", Yu Gothic Medium,
        "游ゴシック", Yu Gothic, sans-serif;   /* 参照 0 回 */
--vw: 1600;                                      /* 参照 0 回（768 / 430 の上書きもある） */
```

### 3.4 文字サイズ・ウェイト階層

ルートは **`html { font-size: 62.5% }` ＝ 10px で、1920〜320px の 25 幅すべて固定**。CSS は `rem` で書かれており、**`1rem = 10px`＝「px の値を 1/10 にした rem」**。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Display (EN)** | Roboto | **100px** (10rem) | 700 | 1.20 | **-2px (-0.02em)** | `About` `Service` `News`。トップのセクション見出し |
| Display (EN) 下層 | Roboto | 80px (8rem) | 700 | 1.20 | -1.6px (-0.02em) | `About` |
| Sub Display (EN) | Roboto | 35px (3.5rem) | 700 | 1.20 | -0.7px (-0.02em) | `Mission` `Vision` |
| **Heading 1 (JA)** | Noto Sans JP | **36px** (3.6rem) | 700 | 1.20 | 0.72px (0.02em) | `働く人を「楽！」にする` |
| Heading 2 (JA) | Noto Sans JP | **32px** → 26px (≤768px) | 700 | 1.20 | 0.64px (0.02em) | `ラクスのカルチャー` |
| Heading 3 (JA) | Noto Sans JP | 24px (2.4rem) | 700 | 1.50 | — | `ゴールオリエンテッド` |
| Lead | Noto Sans JP | 20px (2rem) | 700 | 1.50 | 0.4px (0.02em) | `楽楽クラウドバックオフィス` |
| Nav / Label | Noto Sans JP | 17px (1.7rem) | 500 | 1.50 | 0.51px (0.03em) | グローバルナビ |
| **Body** | Noto Sans JP | **16px** (1.6rem) | 400 | **2.00** | — | 長文の本文（`--lh-2xl`） |
| **Body (既定)** | Noto Sans JP | **14px** (1.4rem) | 400 / 500 / 700 | **1.50** | 1px (= `0.1rem`) | 最多。可視 55〜83 要素 |
| Caption | Noto Sans JP | 12px (1.2rem) | 400 | 1.50 | — | パンくず |

**ウェイトは 400 / 500 / 700 の 3 段だけ**（実測: 700 が 55〜99 要素、500 が 36〜53、400 が 32〜38）。可変フォントを読んでいるが、**その間の値は 1 つも使っていない**。

```css
:root {
  --fw-bold: bold;        /* キーワード。数値の 700 ではない */
  --fw-regular: initial;  /* 数値ではなく initial（＝継承を切って既定へ戻す） */
  --fw-medium: 500;
}
```

> **`--fw-regular` は `initial`。** `getComputedStyle` では空文字で返るので「値が無い」と誤読しやすいが、`font-weight: initial` は有効で `normal`（400）になる。**`400` に書き換えても見た目は同じだが、宣言はこうなっている。**

### 3.5 行間・字間

**行間はトークン 6 段。すべて無単位**なので、各要素が自分のサイズで再計算する。

```css
:root {
  --lh-2xl: 2;     /* 長文の本文。実測 8〜21 要素 */
  --lh-xl: 1.8;    /* 実測 1〜6 要素 */
  --lh-lg: 1.6;    /* 実測 1〜16 要素 */
  --lh-md: 1.5;    /* 既定。実測 80〜125 要素で最多 */
  --lh-sm: 1.25;
  --lh-xs: 1;
}
```

- **既定は 1.50**（実測 125/184・80/129）。**読ませる長文だけ 2.00 に上げる**
- 見出しは **1.20**（実測 6〜25 要素）

**字間は「各要素が `em` を持つ」型。** `body` の `letter-spacing` は `normal` で、**継承はしていない**。

| 宣言 | 実測 px（当たる要素） |
|---|---|
| `-0.05em` | — |
| **`-0.02em`** | **-2px (100px) / -1.6px (80px) / -0.7px (35px)** ＝ **欧文の大見出し** |
| `0.02em` | 0.4px (20px) / 0.64px (32px) / 0.72px (36px) |
| `0.03em` | 0.42px (14px) / 0.48px (16px) / 0.51px (17px) / 0.54px (18px) |
| `0.04em` | — |
| **`0.05em`** | **0.8px (16px)** ＝ **CTA** / 0.95px (19px) / 1.6px (32px) |
| `0.08em` | — |
| `0.12em` | — |
| **`0.1rem`** | **1px（絶対値）**。14px の本文に当たると 0.071em 相当 |

**ガイドライン**:
- 和文は `+0.02em`〜`+0.05em`、**欧文の 35px 以上の大見出しだけ `-0.02em`**
- `0.1rem` だけは **px の絶対値**（root 10px なので 1px）。**`em` に読み替えると文字サイズによって挙動が変わる**

### 3.6 禁則処理・改行ルール

- `word-break` / `line-break` / `overflow-wrap` の宣言は無く、ブラウザ既定のまま
- 句読点のインデント調整用のユーティリティクラス（`.u-*`）がコメント付きで用意されている
- `font-kerning: normal` を AI 戦略ページの 1 クラスにだけ宣言

### 3.7 OpenType 機能

```css
/* 実サイトの宣言（CSS 全文で 1 箇所だけ） */
.p-page-ai-strategy__product-catch {
  font-size: 2.4rem;
  font-weight: var(--fw-medium);
  line-height: 1.4;
  ext-spacing-trim: space-first;      /* ← text-spacing-trim の "t" 落ち。無効 */
  font-kerning: normal;
  font-feature-settings: "palt" 1;
}
```

- **`palt` はこの 1 クラスだけ**。トップと `/about/` では **実測 0 要素**
- **書体は対応している。** 同一スタック・40px での実測は `normal` **759.20px** → `"palt"` **619.20px**＝**−18.4%**。**「効かない」のではなく「使っていない」**
- **`ext-spacing-trim` は `text-spacing-trim` のタイプミス**で、エラーも警告も出ずに黙って無視される。**写さない**

### 3.8 縦書き

- トップのスクロールインジケータ（`SCROLL` / Roboto 12px）に `writing-mode: vertical-lr` が **4 要素**。**和文の縦組みは無い**
- `vertical-lr`（左→右）であって `vertical-rl` ではない。欧文の 1 語を縦に流すためだけの指定

---

## 4. Component Stylings

### Buttons

**Primary（実測値そのまま）**
- Background: `#f08300`
- Text: `#ffffff`
- Border: `2px solid #f08300`
- Border Radius: **`5px`**
- Padding: `0 18px 0 20px`（左右非対称。右に矢印アイコンが入る）
- Font: `"Noto Sans JP", sans-serif` / **16px** / **700** / line-height `24px` / letter-spacing **`0.8px`（0.05em）**
- Box Shadow: `none`

**Language Toggle（選択 / 非選択）**
- 選択: Background `#f08300` / Text `#ffffff` / Radius **`0px`** / Padding `8px 12px` / Roboto 16px 700
- 非選択: Background `#f5f5f5` / Text `#bebebe` / 同上

### Cards

- Background: `#ffffff`
- Border Radius: **`5px`**（可視 206 要素。このサイトの角丸はほぼこれ 1 種）
- Box Shadow: **`rgba(0, 0, 0, 0.15) 0 0 13px 2px`**（可視 144 要素。**影はこの 1 種類だけ**）

### Accent Shape

- Border Radius: **`0px 95px`**（可視 48 要素）。**左上 0・右上 95px の極端な片側角丸**で、サービスカードのサムネイルに使う
- 円形アバター: `border-radius: 50%`（1 要素）

### Inputs

- Border: `0.1rem solid var(--color-gray-300)`（= 1px solid `#d2d2d2`）
- Border Radius: `0.2rem`（= 2px）
- Padding: `1.2rem 1rem 1.2rem 1.5rem`
- Font Size: `clamp(1.1rem, 1.4vw, 1.4rem)`（= 11px / 1.4vw / 14px）

---

## 5. Layout Principles

### Spacing Scale

余白トークンは持たず、`rem`（= px の 1/10）で直書きする。実測で多いのは次の通り。

| Token | Value | 実測 |
|-------|-------|------|
| XS | 3px | gap 2 件 |
| S | **15px** | gap **10 件（最多）** |
| M | **20px / 21px** | gap 10 件 / 5 件 |
| L | 30px | gap 3 件 |
| XL | **40px** | gap 5 件 |
| XXL | 60px / 70px | gap 2 件ずつ |

### Container

- **Max Width: `1200px`**（実測 13〜15 件で最多）
- Sub Container: `1000px`（6〜8 件）
- `--pc-width: 102.4rem`（= **1024px**）
- Padding (horizontal): `clamp(3rem, 2rem + 5vw, 10rem)`（= 30px / 20px+5vw / 100px）

### Grid

- メガメニュー: `grid-template-columns: clamp(12rem, 15vw, 16rem) 27.7rem 27.7rem 27.7rem`
- 一部のメニューは `clamp(12rem, 15vw, 16rem) repeat(auto-fit, minmax(16rem, 1fr))`

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。CTA ボタンを含むほとんどの要素 |
| **1** | **`rgba(0, 0, 0, 0.15) 0 0 13px 2px`** | **カード（可視 144 要素）。このサイトに影はこれ 1 種類しかない** |

> **オフセットが `0 0` で、広がり（spread）2px のぼかし 13px。** 真下に落とさず**四方に均等に広げる影**。`0 2px 4px` のような一般的な影に置き換えると別物になる。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 62.5% }` を敷き、`rem` は「px の 1/10」で書く**（`1.6rem` = 16px）。この前提が崩れると全サイズがずれる
- 和文は `--font-jp`（Noto Sans JP）、欧文は `--font-en`（Roboto）を**要素ごとに当て分ける**。混植のスタックを作らない
- 行間は `--lh-md: 1.5` を既定にし、**読ませる長文だけ `--lh-2xl: 2`** に上げる
- 字間は **和文 `+0.02〜0.05em` / 35px 以上の欧文見出し `-0.02em`**
- 角丸は **5px の 1 種**、影は **`rgba(0,0,0,0.15) 0 0 13px 2px` の 1 種**に統一する
- 本文色は **`#323232`**。純黒を使わない
- サービスを並べるときは**サービス別の識別色**を使い、コーポレートのオレンジと混ぜない

### Don't（禁止）

- **`font-weight` に 300 や 600 を使わない。** 可変フォントを読んでいても実装は **400 / 500 / 700 の 3 段**。段を増やすと既存と揃わない
- **`--font`（游ゴシックのスタック）と `--vw` を使わない。** どちらも CSS 全文で参照 0 回の死に変数
- **`Onest` を読み込まない。** `@import` には入っているが 1 要素も使っていない
- **`ext-spacing-trim` をそのまま写さない。** `text-spacing-trim` のタイプミスで何も起きない
- **ヒーローの大見出しを Web フォントで組まない。** 実サイトは `<video>` に焼き込み、`h1` は `u-visually-hidden`（1×1px）の代替テキスト
- **`palt` を全体に当てない。** 実サイトは 1 クラスのみで、2 ページとも実測 0 要素。足すと（Noto Sans JP では −18.4% 詰まるので）既存ページと別物になる
- **オレンジランプの 600〜200 を「実装済み」として使わない。** 可視で確認できるのは 700 と 100 だけ
- 本文に `line-height: 1.2` 以下を使わない（1.20 は見出し専用）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測の宣言数 |
|------|-------|---|
| **Mobile** | `max-width: 768px` | **454 件（主役）** |
| Tablet | `max-width: 820px` | 129 件 |
| Narrow Desktop | `max-width: 940px` | 9 件 |
| Small Mobile | `max-width: 430px` | 6 件 |
| Desktop | `min-width: 821px` | 10 件 |
| ホバー可能 | `(any-hover: hover)` | 51 件 |

### ルートは動かない

- `html` **10px** / `body` **14px** / `line-height` **21px** は **1920〜320px の 25 幅すべてで 1px も動かない**
- 変わるのは**個別の要素**:
  - `h2` **36px → 26px**（≤768px）
  - ヘッダーのメニュー文言 `clamp(1.2rem, 1.3131313131vw, 1.4rem)`（= 12px / 1.3131vw / 14px。**914px 以下で 12px に張り付く**）
  - メガメニューの見出し `clamp(1.4rem, 0.5vw, 1.7rem)`
  - ボタン `clamp(1.1rem, 1.4vw, 1.4rem)`
- ヒーローは `height: 100vh; min-height: 730px` →（≤768px）`height: auto` に切り替え

### タッチターゲット

- CTA の高さは `line-height: 24px` ＋ 上下パディングで確保。最小 44px を割らないこと

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #f08300
Text Color:    #323232
Background:    #ffffff
Surface:       #f5f5f5
Font (JA):     "Noto Sans JP", sans-serif
Font (EN):     "Roboto", sans-serif
Root:          html { font-size: 62.5% }   /* 1rem = 10px */
Body Size:     14px (1.4rem) / Line Height 1.5
Long Text:     16px (1.6rem) / Line Height 2.0
Weights:       400 / 500 / 700 のみ
Letter Spacing: 和文 +0.02〜0.05em / 欧文大見出し -0.02em
Radius:        5px（唯一）
Shadow:        rgba(0,0,0,0.15) 0 0 13px 2px（唯一）
Container:     1200px
```

### プロンプト例

```
ラクスのデザインシステムに従って、サービス紹介カードの一覧を作成してください。
- html に font-size: 62.5% を敷き、サイズは rem（1rem = 10px）で書く
- 和文は "Noto Sans JP", sans-serif / 欧文は "Roboto", sans-serif を要素ごとに当て分ける
- カード: 背景 #ffffff / border-radius 5px / box-shadow rgba(0,0,0,0.15) 0 0 13px 2px
- サムネイルの角丸だけ border-radius: 0 95px
- カード見出し: 20px / weight 700 / line-height 1.5 / letter-spacing 0.02em
- 本文: 14px / weight 400 / line-height 1.5 / color #323232
- CTA: 背景 #f08300 / 文字 #ffffff / 16px / weight 700 / letter-spacing 0.05em
       / border-radius 5px / border 2px solid #f08300 / padding 0 18px 0 20px
- セクション見出しの欧文（Roboto 100px / weight 700）だけ letter-spacing: -0.02em
- font-weight は 400 / 500 / 700 以外を使わない
- font-feature-settings は書かない（実サイトは palt を使っていない）
```
