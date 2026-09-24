# DESIGN.md — カオナビ（kaonavi）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-22 / 対象: `https://www.kaonavi.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **約物だけを詰めるサブセットフォント `YakuHanJP` を先頭に置き、全要素に `palt` をかける。** 色は「太陽・水・夜・雲・葉」という自然物の名前でトークン化されている
- **密度**: 中。1280px のコンテナに 12px 角丸のカードを並べ、CTA は大きく取る BtoB SaaS のリード獲得型
- **キーワード**: YakuHanJP、palt 全面適用、黄色のマーカー引き、自然物の色名トークン、影付きの大型 CTA

**このサイトの核心は5つある。**

1. **`font-feature-settings: "palt"` が 1111 要素**（トップ）／ 531 要素（下層）。**ページのほぼ全テキストに効いている。** 加えて `"halt"` が 3 要素（見出し1種）
2. **書体スタックの先頭が `YakuHanJP`。** 約物（括弧・句読点）だけを差し替えるサブセットフォントで、`document.fonts` 上も `loaded`。**`palt` と併用して二重に詰めている**
3. **`letter-spacing` は `body` が `normal`。字間は要素ごとに当てる。** 継承型（ＪＲ東海・Nstock）とは正反対で、`1px` (46) / `0.7658px` (21) / `2.4px` (5) …と**コンポーネントごとに別の値**が出る
4. **CSS Custom Properties が 58 個の自社トークン。** `--sun` `--water` `--night` `--cloud` `--leaf` の5基本色 ＋ 6系統のスケール（`--gr-*` `--ly-*` `--av-*` `--pu-*` `--pa-*` `--sa-*`）を 50〜600 で刻む。WordPress 由来（`--wp--preset--*`）が別に 47 個あるが、これは**プラットフォームの既定値で自社トークンではない**
5. **見出しの強調は「黄色のマーカー引き」**。`linear-gradient(transparent 70%, #ffda1b 30%)` を背景に敷いて、文字の下 30% だけを黄色くする。**下線でも面色でもない**

> **宣言 ≠ 実装が3か所ある。**
> - 変数 `--noto: "Noto Sans JP", sans-serif` は定義されているが、実際に Noto Sans JP で描かれるのは **24 要素だけ**（ヒーローの大見出し）。**残り 296 要素は `YakuHanJP + 游ゴシック体` のスタック**
> - `--elevation-1-box` / `--elevation-2-box`（`rgba(32,34,38,…)` の2段影）が定義されているのに、**実際に使われているのは 1 要素**。実装の主力は `rgba(0,0,0,0.14)` 系のマテリアル風の影（35 要素）
> - Adobe Fonts の **`ryo-gothic-plusn`（800）と `tbudmincho-std`（500/900）が `loaded`** になっているが、可視テキストの `font-family` 分布に **1 要素も出てこない**。読み込まれているだけで描画に使われていない

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| トークン | 実装値 | 実測 |
|---|---|---|
| **`--sun`** | **`#ffda1b`** | **可視 11 要素**。マーカー引き、`だから、カオナビは` のラベル、ヒーロー1枚目の地色 |
| **`--water`** | **`#447fe0`** | **可視 10 要素**。`お問い合わせ` `見積もりしてみる` などの CTA 面色 |
| **`--night`** | **`#202226`** | **本文色。可視 146 要素** |
| **`--cloud`** | `#ffffff` | 面・白抜き文字 |
| **`--leaf`** | `#2f7417` | 変数としては存在するが**実装に現れない**（実際の緑は `--av-400: #30a143` / `--av-500: #197f38`） |

> **リンク色は `--water` ではなく `--pu-400: #3f6ecc`**（可視 107 要素）。**面色に使う青（`#447fe0`）と文字に使う青（`#3f6ecc`）が別**なので混ぜない。

### Semantic（意味的な色）

- **Green** (`#197f38` = `--av-500`): 機能バッジ（`機能` `評価` `勤怠管理`）の面色。可視 9 要素
- **Green Light** (`#30a143` = `--av-400`): `新機能が登場` バッジ
- **Orange** (`#ee7100` = `--pa-400`): `人数` バッジの面色
- **Red** (`#d64c3a` = `--ly-400`): 変数のみ（トップには現れない）

### Neutral（ニュートラル）

- **Text Primary** (`#202226` / `--night`): 本文・見出し。**可視 146 要素**
- **Text Link** (`#3f6ecc` / `--pu-400`): リンク・タブ。**可視 107 要素**
- **Text Navy** (`#303560` / `--pu-600`): チップ（`製造・メーカー` `1000〜4999名`）の文字。可視 15 要素
- **Text Muted** (`#737378` / `--gr-500`): 日付。可視 13 要素
- **Text Sub** (`#56575b` / `--gr-600`): 補足。可視 13 要素
- **Background** (`#ffffff`): **ページの地色**（下層ページの `pageBackground.resolved` が `#ffffff` / 根拠 4/4）
- **Surface Chip** (`#f0f1f5` / `--gr-100`): チップの面。**可視 64 要素で最多**
- **Surface Blue** (`#edf6ff` / `--pu-50`): 導入事例セクションの面・ヒーロー3枚目の地色
- **Surface Gray** (`#fafafc` / `--gr-50`): セミナー・料金カードの面
- **Surface Cream** (`#fbf8ee` / `--sa-50`): グローバルナビのドロワー・タブの面
- **Surface Sand** (`#f6efdc`): ヒーロー2枚目の地色

> **ヒーローはスライドごとに地色が変わる**（`#f6efdc` / `#ffda1b` / `#edf6ff` が `swiper-slide` として同時に DOM 上にある）。`pageBackground.resolved` が `#edf6ff` を返すのはこのスライドを踏んだためで、**ページの地色ではない**。地色は白。

### カラースケール（自社トークン・50→600 で濃くなる）

| 接頭辞 | 系統 | 代表値 |
|---|---|---|
| `--gr-*` | グレー（50/75/100/150/200/250/300/350/400/500/550/600） | `#fafafc` → `#56575b` |
| `--pu-*` | ブルー（50〜600） | `#edf6ff` → `#303560` |
| `--av-*` | グリーン（50〜600） | `#ecfaec` → `#025d2c` |
| `--ly-*` | レッド（50〜600） | `#fdf3f1` → `#ad2929` |
| `--pa-*` | オレンジ／イエロー（50〜600） | `#fffbd9` → `#734b15` |
| `--sa-*` | サンド（50/200/400/600） | `#fbf8ee` → `#eddfbb` |

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定は OS ローカルの游ゴシック**。先頭に **`YakuHanJP`（約物サブセット）** を置き、以降 `游ゴシック体 → Yu Gothic M → 游ゴシック Medium → ヒラギノ角ゴ ProN W3 → メイリオ → ＭＳ Ｐゴシック`
- **Web フォントの和文は `Noto Sans JP`（400 / 700 が `loaded`）だが、使っているのはヒーロー周りの 24 要素だけ**
- **`Noto Sans JP` の 500 は `unloaded`。** 500 を指定している 17 要素は Noto Sans JP では描かれない
- `Yu Gothic M` は `@font-face` として宣言されているが `unloaded`（Windows のローカル游ゴシック Medium を当てるための別名宣言）

> **Windows の游ゴシック問題は「別名 ＋ スタック順」の合わせ技で解いている。** `Yu Gothic M` という別名を `@font-face` で切り、さらにスタックに `游ゴシック Medium` `Yu Gothic Medium` を並べる。**収録サイトで5例目の流儀。**

### 3.2 欧文フォント

- **`Inter`（400 / 700 とも `loaded`）**。数字（`200` `4,500` `2026`）に使う。可視 11 要素
- `roboto`（500 / 700）はコピーライトなど 2 要素

### 3.3 font-family 指定

```css
/* 本文・UI（既定） */
font-family: YakuHanJP, 游ゴシック体, YuGothic, "Yu Gothic M", "游ゴシック Medium",
             "Yu Gothic Medium", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN W3",
             HiraKakuProN-W3, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN",
             "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, Osaka,
             "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;

/* ヒーロー大見出し（変数 --noto） */
font-family: "Noto Sans JP", sans-serif;

/* 数字（変数 --inter） */
font-family: Inter, sans-serif;
```

**フォールバックの考え方**:
- **`YakuHanJP` を必ず先頭に置く。** 約物以外のグリフを持たないので、2番目以降の和文書体に自動で落ちる
- **和文優先。** 欧文は数字だけ `Inter` に切り替える

### 3.4 文字サイズ・ウェイト階層

`html { font-size: 16px }` / `body { font-size: 16px; line-height: 28.8px }`。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|---|---|---|---|---|---|---|
| **Hero Headline** | Noto Sans JP | **44px** | **700** | 70.4px (1.60) | **2.46297px** | `palt` |
| Hero Headline (small) | Noto Sans JP | 35px | 700 | 70px (2.00) | 1.95918px | 同上 |
| **Section Heading** | Noto Sans JP | **48px** | **700** | 67.2px (1.40) | **1px** | `人事から現場まで根付く…` |
| Heading (number) | Inter | 48px | 900 | — | — | `4,500` などの数値 |
| Sub Heading | 游ゴシック | **32px** | 700 | — | — | `3分でわかるカオナビ資料` |
| **CTA Label** | 游ゴシック | **24px** | **700** | 33.6px (1.40) | **2.4px** | 大型 CTA |
| CTA Label (小) | 游ゴシック | 20px | 700 | 28px (1.40) | normal | |
| Card Heading | 游ゴシック | 22px | 700 | — | — | ドロワー見出し |
| Badge | 游ゴシック | 18px | 700 | 27px (1.50) | 1px | `機能` `人数` |
| **Body** | 游ゴシック | **16px** | **400** | **28.8px (1.80)** | **normal** | body の既定 |
| **UI / Nav** | 游ゴシック | **14px** | 400〜700 | 28.8px (2.06) | normal | **可視 145 要素で最多** |
| Chip | 游ゴシック | 12px | 400 | — | 0.6564px | `小規模向け` |
| Note | 游ゴシック | 10px | 400 | — | — | 注釈（`※:タレントマネジメント…`） |

**サイズ分布（トップ）**: 14px (145) / 16px (82) / 20px (23) / 18px (14) / 10px (12) / 12px (10) / 32px (10) / 48px (9)

**ウェイト分布**: **700 (172)** / 400 (138) / 500 (17) / 900 (6) / 800 (1)
→ **見出し・ナビは 700 が既定。中間ウェイト（500）はほとんど使わない**

### 3.5 行間・字間

- **本文の行間**: **1.80**（16px → 28.8px）
- **ナビ・UI の行間**: 2.06（14px → 28.8px。`line-height` を px で固定しているため小さい文字ほど比率が大きく出る）
- **見出しの行間**: 1.40〜1.60

- **字間は `body` が `normal`。要素ごとに当てる**:

| 値 | em 換算 | 対象 | 実測 |
|---|---|---|---|
| **`normal`** | — | **本文・ナビ・チップ（既定）** | **242 要素** |
| `1px` | 0.0625em（16px 基準） | セクション見出し・リード文 | 46 要素 |
| 0.7658px | — | グローバルナビの項目 | 21 要素 |
| **2.4px** | **0.1em（24px 基準）** | **大型 CTA のラベル** | 5 要素 |
| 1.95918px / 2.46297px | 約 0.056em | ヒーロー見出し | 3 / 2 要素 |

**ガイドライン**:
- **本文に `letter-spacing` を当てない。** 詰めは `palt` と `YakuHanJP` が担当する
- **CTA と見出しだけ広げる**（0.06〜0.1em）。日本語の大きな文字は放っておくと詰まって見えるため

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- CTA のラベルは 2 行組み（`3分でわかるカオナビ` ＋ `いますぐ資料で確認してみたい`）。**1行目を小さく、2行目を大きく**して見出し／説明の関係を作る

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* 1111 要素（トップ）。事実上ページ全体 */
font-feature-settings: "halt";   /* 3 要素のみ */
```

- **`palt` を全面に当てるのがこのサイトの設計。** 本文にも当たっている
- **`YakuHanJP` と併用している**点に注意。`palt` だけ真似ても約物の詰まり方は再現できない

### 3.8 縦書き

該当なし（実測 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（青の大型 CTA）**
- Background: **`#447fe0`** / Text: `#ffffff`
- Border: **`2px solid #447fe0`** / Border Radius: **`12px`**（ヒーロー内のみ `16px`）
- Font: **24px / weight 700 / letter-spacing 2.4px / line-height 1.40**
- Padding: `0 8px`（高さは行送りで作る）
- Shadow: `0 2px 2px rgba(0,0,0,.14), 0 6px 10px -2px rgba(0,0,0,.14), 0 1px 5px rgba(0,0,0,.2)`

**Secondary（白地・青枠）**
- Background: `#ffffff` / Text: **`#3f6ecc`**
- Border: `2px solid #447fe0` / Border Radius: `12px`
- Font: 24px / weight 700 / letter-spacing 2.4px
- Shadow: Primary と同じ

**Small（ヘッダー）**
- Background: `#447fe0` / Text: `#ffffff` / Border Radius: **`4px`** / Font: 14px / 700 / `normal`

**Pill（`詳細はこちら`）**
- Background: `#447fe0` / Border Radius: **`25.888px`** / Padding: `9.888px 16px` / Font: 16px / 700

### Badges

| 種類 | 面 | 文字 | Radius | Font |
|---|---|---|---|---|
| 機能 | `#197f38` | `#ffffff` | 32px | 18px / 700 / 1px |
| 人数 | `#ee7100` | `#ffffff` | 32px | 18px / 700 / 1px |
| 新機能 | `#30a143` | `#ffffff` | 20px | 14px / 700 / 1.12px |
| 強調ラベル | **`#ffda1b`** | `#202226` | 12px | 14px / 700 / 1px |

### Chips（絞り込み）

- Background: `#f0f1f5`（選択時 `#edf6ff`） / Text: `#303560`
- Border Radius: **`14px`**（`1000〜4999名` は `20px`） / Padding: `0 16px` / Font: 16px / 400
- 選択時のみ Shadow: `0 2px 8px rgba(0,0,0,.25)`

### Cards

- Background: `#ffffff` / Border Radius: **`12px`**
- Shadow: `0 2px 2px rgba(0,0,0,.14), 0 6px 10px -2px rgba(0,0,0,.14), 0 1px 5px rgba(0,0,0,.2)`
- Padding: `16px 20px`（注釈カードは `#fafafc` 地・radius 10px）

### マーカー引き（このサイトの署名）

```css
/* 文字の下 30% だけを黄色く塗る */
background-image: linear-gradient(rgba(0,0,0,0) 70%, #ffda1b 30%);
/* ヒーロー用（下 40%） */
background-image: linear-gradient(rgba(0,0,0,0) 60%, #ffda1b 0%);
```

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|---|---|---|
| XS | 4px | バッジの内余白 |
| S | 8px | CTA の左右 |
| M | 12〜16px | カード内余白・gap |
| L | 20px | カードの内余白 |
| XL | 30〜40px | セクション間 |

### Container

- **Max Width: `1280px`**（実測 30 要素で最多）
- 読み物系の幅: `962px` / `800px` / `760px`
- 画像を含む帯: `1440px` / `1760px`

### Grid

- gap は **`0 10px`（11 要素）** が最多。カードグリッドは `16px` / `20px` / `30px` / `40px`

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|---|---|---|---|
| 0 | `none` | チップ・バッジ | — |
| **1** | `0 2px 8px rgba(0,0,0,.25)` | 選択中のチップ | 22 要素 |
| **2** | `0 2px 2px rgba(0,0,0,.14), 0 6px 10px -2px rgba(0,0,0,.14), 0 1px 5px rgba(0,0,0,.2)` | **CTA・カード（主力）** | **35 要素** |
| 3 | `0 8px 20px rgba(0,0,0,.1)` | フローティング | 2 要素 |

> **変数 `--elevation-1-box` / `--elevation-2-box`（`rgba(32,34,38,…)` の2段影）は定義されているが、実装では 1 要素しか使っていない。** 新規実装では上の Level 2 を使う。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-family` の先頭に `YakuHanJP` を置き、全体に `font-feature-settings: "palt"` を当てる**
- **本文の `letter-spacing` は `normal` のまま**にする（詰めは palt に任せる）
- **CTA と見出しだけ字間を 0.06〜0.1em 広げる**
- 強調は**黄色のマーカー引き**（`linear-gradient(transparent 70%, #ffda1b 30%)`）で作る
- 色はスケールから選ぶ（面は `-50`〜`-100`、文字は `-400`〜`-600`）

### Don't（禁止）

- **リンク文字に `#447fe0` を使わない。** 文字は `#3f6ecc`、面が `#447fe0`
- **`--leaf: #2f7417` を実装に使わない**（変数にあるだけで、実際の緑は `#30a143` / `#197f38`）
- `Noto Sans JP` を本文に当てない（本文は游ゴシック系のローカルフォント）
- **`font-weight: 500` を多用しない**（実測 17 要素。Noto Sans JP 側の 500 は読み込まれていない）
- 影を1段しか使わないフラットなカードにしない（このサイトの CTA は3重の影で浮かせている）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|---|---|---|
| **Mobile** | **≤ 768px** | **`screen and (max-width: 768px)` が 138 件で主力** |
| Tablet | ≤ 1024px | 2 件 |
| Desktop | ≥ 769px | 1 件 |

**単一ブレークポイント設計**。768px で PC / SP を切り替える。

### タッチターゲット

- CTA は `line-height: 33.6px` ＋ 縦 padding で 56px 以上を確保

### フォントサイズの調整

- ヒーロー見出しは 44px → SP で 35px 前後。本文 16px は据え置き

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary (CTA fill): #447fe0
Link Text:          #3f6ecc
Accent (marker):    #ffda1b
Text:               #202226
Background:         #ffffff / Surface #f0f1f5
Font: YakuHanJP, 游ゴシック体, YuGothic, "Yu Gothic M", "游ゴシック Medium",
      "ヒラギノ角ゴ ProN W3", メイリオ, sans-serif
Body: 16px / line-height 1.80 / letter-spacing normal
font-feature-settings: "palt"
Radius: 12px (card/CTA) / 32px (badge) / 14px (chip)
```

### プロンプト例

```
カオナビのデザインシステムに従って、料金プランの比較カードを3枚作ってください。
- font-family は上記スタック（先頭に YakuHanJP）、全体に font-feature-settings: "palt"
- 本文 16px / line-height 1.8 / letter-spacing は normal
- カードは白地・radius 12px・影は 0 2px 2px rgba(0,0,0,.14), 0 6px 10px -2px rgba(0,0,0,.14), 0 1px 5px rgba(0,0,0,.2)
- 各カードの CTA は #447fe0 の面・白文字・radius 12px・24px/700・letter-spacing 2.4px
- 推奨プランの見出しだけ linear-gradient(transparent 70%, #ffda1b 30%) でマーカーを引く
- リンク文字は #3f6ecc、本文は #202226
```
