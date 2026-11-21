# DESIGN.md — ビットバンク（bitbank）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-21 / 対象: `https://bitbank.cc/`, `/guide/flow`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に**緑のCTA1色**。見出しは Noto Sans JP の太字を `palt` で詰めて組み、本文は 13〜14px と小さく保つ。暗号資産取引所として「怖くない・読みやすい」ことに全振りした構え
- **密度**: 中。コンテンツ幅 **1240px**（27 要素）を基本に、読み物ブロックだけ 900px / 600px へ絞る
- **キーワード**: 緑のCTA、palt で詰める、10px ルート、画像の大見出し、角丸がそろわない

**このサイトの核心は4つある。**

1. **`font-feature-settings: "palt"` を body から 171 要素へ継承している**（両ページとも横組みのみ・縦組み 0）。実スタック・40px の実測で **`normal` 1118.05px → `"palt"` 1048.17px ＝ −6.25%**。同じ文字列を `sans-serif` で組むと 1173.20px なので、**Noto Sans JP が当たった上で詰まっている**ことまで確認できる
2. **`@font-face` を数千件宣言しているのに、実際に落ちてくるのは Lato と Noto Sans JP の2家族だけ。** フォント要求は **42 件・全部 `fonts.gstatic.com`**（Lato の latin 3 本 ＋ Noto Sans JP のサブセット 39 本）。`document.fonts` には Zen Maru Gothic（5 ウェイト × 122 サブセット）・Kosugi Maru（121）・Poppins・Rubik・Barlow・Barlow Semi Condensed・Material Icons 5 種・FontAwesome・Glyphicons・icomoon・Original Yu Gothic・Helvetica Neue が並ぶが、**1 バイトも読み込まれない**
3. **`html` 10px / `body` 14px が 19 幅（1920〜320px）すべて完全固定。** 流体も `clamp()` も無い。可変なのは `h2` だけで **60px（≥1025）→ 40px（1024〜768）→ 34px（≤767）** の 3 段
4. **ヒーローの大見出しは全部 PNG。** 「500円からビットコインをはじめられる。」は `feature_main_catch.png`（472×337）、「bitbankにEPOSカードがついに誕生。」は `top-image-epos-catchcopy.png`（521×104）。**ここを Web フォントで実装しない**

CSS Custom Properties は **`:root` / `body` とも 0 個**（`htmlTotal: 0` / `bodyTotal: 0`）。色もサイズも CSS に直書きする。縦組みは 0 要素。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **bitbank グリーン** | **`#2eac91`** | CTA の面色。トップ 4 要素・下層 4 要素。`新規登録` `無料新規登録` `無料で新規登録` のすべてがこの 1 色。文字色としても 11 要素（`Reason` `No.1` `Flexible` の欧文アクセント） |
| **Teal（海外向け）** | `#029688` | `Details`（英語圏向けの導線）専用。**グリーンとは別の色**で、CSS 上も別宣言 |

> **CTA はこの緑 1 色しかない。** 面色の種類を増やさず、角丸とサイズだけで階層を作っている（下の Component Stylings 参照）。

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): ナビ・見出し（可視 20 要素）。**純黒ではない**
- **Text Body** (`#333333`): 本文・リード（可視 20〜24 要素）
- **Text Navy** (`#003f6b`): メガメニューの項目名（トップ 19 / 下層 38 要素）。**濃紺を「読ませる文字」に充てる**
- **Text Muted** (`#a9a9a9`): フッターのリンク群（**可視 62 要素・最多**）
- **Text Caption** (`#707070`): 注意書き・免責（可視 7 要素）
- **Black** (`#000000`): セクション見出しのみ（可視 16 要素）
- **Surface Gray** (`#f8f8f8`): セクションの地（トップ 8 / 下層 5 要素）
- **Surface Dark** (`#222222`): フッター全面（可視 5 要素）
- **Surface Mint** (`#eef8f6`): 下層の注記ブロック（1 要素）
- **Background** (`#ffffff`): ページ背景

> トップの計測では `pageBackground.resolved` が**全画面ヒーロー（`main.feature` 1440×854）の色**を返す。**コンテンツの地色は `body` の `#ffffff`。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Noto Sans JP**（Google Fonts。400 / 500 / 700 / 900 の 4 ウェイトが `loaded`）。可視要素 169/169・173/173 が同じ 1 スタック
- **明朝体**: 使わない（可視 0 要素）

CDP の `CSS.getPlatformFontsForNode` で実描画を確認すると、和文はすべて Noto Sans JP が当たる（内部名が `Noto Sans JP Thin` と返るのはサブセット woff2 の名前で、太さの判定には使えない）。

### 3.2 欧文フォント

- **サンセリフ**: **Lato**（400 / 700 / 900 が `loaded`）。スタックの**先頭**に置いて欧文・数字を先取りさせる
- セリフ・等幅の指定は無い

### 3.3 font-family 指定

```css
/* サイト全体で唯一のスタック（可視 169 要素 = 100%） */
font-family: Lato, "Noto Sans JP", Roboto, "Helvetica Neue", Arial,
             "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
```

**フォールバックの考え方**:
- **欧文優先**。Lato が先頭にあるので、英数字は Lato、和文は Noto Sans JP に分かれる
- 3 番目以降（Roboto / Helvetica Neue / Arial）は**和文を持たない**ので、和文は必ず Noto Sans JP へ届く
- `Roboto` は `@font-face` が宣言だけで `unloaded`、`Helvetica Neue` は `local()` 指定が外れて `error`。**どちらも実際には使われない**

### 3.4 文字サイズ・ウェイト階層

ルートは `html { font-size: 10px }`（`html { font-size: 62.5% }` との**二重宣言**。どちらも 10px なので実害は無い）。`body` は 14px。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | Noto Sans JP | 60px | 900 | 1.40 (84px) | **2px** | `ビットバンクが選ばれる理由`。1024px 以下で 40px、767px 以下で 34px |
| Heading 1 | Noto Sans JP | 36px | 700 | 1.10 (39.6px) | **2px** | |
| Heading 2 | Noto Sans JP | 24px | 700 | 1.50 | normal | `現物取引（取引所）` |
| Label (EN) | Lato | 20px | 900 | 1.00 | 2px | `Reason For Choosing` `Flexible Response` |
| Body | Noto Sans JP | 16px | 400 | 1.50 | normal | リード文 |
| Body S | Noto Sans JP | **14px** | 400 / 700 | 1.80 | normal | 既定（可視 57 要素・最多） |
| Caption | Noto Sans JP | 13px | 400 | 1.80 | normal | メガメニュー項目（28 要素） |
| Note | Noto Sans JP | 12px | 400 | 1.60 | normal | 注記（18 要素） |
| Legal | Noto Sans JP | 10px | 400 | 1.70 | normal | 免責（13 要素） |

ウェイトは **400 / 500 / 700 / 900 の 4 段**。Google Fonts の URL も同じ 4 本なので、**300 や 600 を当てても出ない**。

### 3.5 行間・字間

- **本文の行間**: **1.80**（可視 33 要素・下層では 65 要素で最多）。読み物ブロックは **2.00**（34 要素）
- **見出しの行間**: **1.40**（Display / H1 は 1.10）
- **本文の字間**: **`normal`**（可視 133/169・147/173）。**本文は詰めも空けもしない**
- **見出しの字間**: **`2px` 固定**（26 要素）

> **字間 `2px` は px 宣言で、サイズが変わっても追従しない。** `h2` が 60px のとき 0.033em、767px 以下で 34px になると **0.059em** ＝ **モバイルで字間が 1.8 倍に広がる**。再現するときもこの挙動ごと写す（`em` に読み替えると別物になる）。

### 3.6 禁則処理・改行ルール

```css
body { word-break: normal; }   /* 19 幅すべてで normal。auto-phrase も break-all も使っていない */
```

### 3.7 OpenType 機能

```css
/* body に 1 行。171 要素へ継承される */
font-feature-settings: "palt";
```

- 実測の内訳: **`"palt" @ horizontal-tb` 171 要素 ／ `"liga" @ horizontal-tb` 4 要素**。縦組みは 0 なので軸の取り違えは起きていない
- 効き目の実測（実スタック・40px・weight 400、文字列 `中期経営計画「Grow UP 2026」、新しい価値の創造。ABC 123`）:

| 指定 | 実測幅 | 対 normal |
|---|---|---|
| `normal` | 1118.05px | — |
| **`"palt"`** | **1048.17px** | **−6.25%** |
| `"halt"` | 1058.05px | −5.37% |
| （参考）`sans-serif` | 1173.20px | +4.93% |

- **`palt` を外すと見出しが約 6% 広がる。** 行送りやカードの幅がそれ前提で組まれているので、落とさないこと

### 3.8 縦書き

使わない（`writing-mode: vertical-rl` は両ページとも 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（新規登録・唯一のCTA）** — 面色は 1 色だが、**角丸が置き場所ごとに違う**。

| 置き場所 | Background | Text | Radius | Size / Weight | Letter Spacing |
|---|---|---|---|---|---|
| グローバルナビ | `#2eac91` | `#ffffff` | **300px**（完全な丸） | 14px / 700 | normal |
| ヒーロー内 | `#2eac91` | `#ffffff` | **4px** | 18px / 700 | 1px |
| セクション末尾 | `#2eac91` | `#ffffff` | **6px** | 18px / 700 | normal |

> **同じ「新規登録」ボタンが 3 種類の角丸で出る。** これは実装の実態であって設計意図ではない。**新規実装では 1 つに統一してよい**（丸みを残すなら 6px、ピル型にするなら 300px）。

**Secondary（もっと見る）**
- Background: `#f8f8f8` / Text: `#222222` / Radius: `300px` / 14px / 700 / padding-left 20px

**Tertiary（海外向け）**
- Background: `#029688` / Text: `#ffffff` / Radius: `3px` / 14px / 600 / padding `6px 18px` / `letter-spacing: 0.84px`

### Cards

- 価格カード: Background `#ffffff` / Radius **10px** / padding 20px / Text `#2eac91`
- 特長カード: Radius **20px**（12 要素）/ Shadow `rgba(0,0,0,0.06) 0 0 24px 0`
- 下層のステップカード: Radius **8px**（14 要素）

### Inputs

- メールアドレス欄: 白地・1px の罫線・CTA と横並び。フォーカスリングは UA 既定のまま

---

## 5. Layout Principles

### Container

| 用途 | Max Width | 実測 |
|---|---|---|
| **既定** | **1240px** | 27 要素（下層 13） |
| 読み物 | 900px | 6 要素（下層 7） |
| 絞り込み | 600px | 8 要素 |
| ヘッダー | 1392px | 1 要素 |

### Gap

`gap` の宣言は少なく（0 / 5 / 12 / 20 / 48px）、余白は主に `margin` と `padding` で作っている。

### Spacing Scale

明示的なトークンは無い。実装で繰り返し出るのは **5 / 10 / 12 / 20 / 25 / 48px**。

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|------|
| 0 | `none` | 既定。CTA もフラット | ほぼ全要素 |
| 1 | `rgba(0, 0, 0, 0.06) 0px 0px 24px 0px` | 特長カード | **トップに 3 要素だけ** |

> **影はこの 1 種類しかなく、下層ページには 1 つも無い。** `offset` を持たない（`0 0 24px`）ので「浮く」というより「輪郭をにじませる」効果。黒に丸めず alpha 0.06 のまま写す。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` に `font-feature-settings: "palt"` を 1 行書いて継承させる。** 要素ごとに書き直さない
- **見出しの `letter-spacing` は `2px`（px 固定）で書く。** `em` に直すとモバイルの見え方が変わる
- **本文の `letter-spacing` は `normal` のまま**にする。詰めるのは `palt` の仕事
- 本文の行間は **1.80**、読み物は **2.00**
- CTA は `#2eac91` の 1 色だけ使う
- `html { font-size: 10px }` を前提に、サイズは **px で直書き**する（`rem` を使うなら 10 で割る）

### Don't（禁止）

- **ヒーローの大見出しを Web フォントで組み直さない。** 実サイトは PNG（`feature_main_catch.png` ほか）で、字形も字間も画像に焼かれている
- **`palt` を外さない**（見出しが約 6% 広がり、カード幅の前提が崩れる）
- **300 / 600 のウェイトを当てない。** Google Fonts の URL が `400 / 500 / 700 / 900` の 4 本なので出ない
- **`@font-face` の宣言量を真似しない。** 実サイトは CSS 全文 2,397,492 文字で Zen Maru Gothic・Kosugi Maru・Poppins ほかを数千件宣言しているが、**1 バイトも読み込まれていない**（純粋な積み残し）
- **CTA の角丸を 3 種類にしない。** 実サイトはそうなっているが、設計としては誤り
- ルートを 16px 前提で書かない（このサイトは 10px）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|------|-------|------|
| Mobile | ≤ 767px | **`(max-width: 767px)` が 4,772 件**（最多） |
| Tablet | ≤ 1024px | `(max-width: 1024px)` が 2,802 件 |
| Small | ≤ 320px | `(max-width: 320px)` が 16 件 |

### サイズの振る舞い

**`html` 10px / `body` 14px は 1920 / 1600 / 1440 / 1366 / 1280 / 1200 / 1080 / 1024 / 992 / 991 / 834 / 768 / 767 / 750 / 480 / 414 / 390 / 375 / 320px の 19 幅すべてで 1px も動かない。**

動くのは見出しだけ:

| 要素 | ≥1025px | 1024〜768px | ≤767px |
|---|---|---|---|
| `h2` | **60px** / lh 84px | **40px** / lh 56px | **34px** / lh 47.6px |
| `h1` | 36px / lh 39.6px | 同左 | 同左 |
| `p` | 11.55px / lh 24px | 同左 | 同左 |

`letter-spacing` は 3 段とも `2px` のまま（上の 3.5 の注意を参照）。

### タッチターゲット

ナビの CTA は `line-height: 36px`、ヒーローの CTA は `line-height: 75px`。**44px 基準を満たすのは後者だけ。**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体:   Lato, "Noto Sans JP", Roboto, "Helvetica Neue", Arial,
        "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
ルート: html 10px / body 14px（全幅固定・流体なし）
字詰め: body に font-feature-settings: "palt"（171 要素へ継承・実測 −6.25%）
字間:   本文 normal / 見出し 2px（px 固定。em にしない）
行間:   本文 1.8 / 読み物 2.0 / 見出し 1.4
ウェイト: 400 / 500 / 700 / 900 の 4 段のみ
色:     CTA #2eac91 ／ 文字 #222222・#333333・#003f6b・#a9a9a9 ／ 面 #f8f8f8
幅:     1240px（既定）/ 900px（読み物）/ 600px（絞り込み）
影:     rgba(0,0,0,0.06) 0 0 24px 0 の 1 種だけ
ブレークポイント: 767px / 1024px
```

### このサイトらしさを出す指示文の例

> 白地に `#2eac91` の CTA を 1 色だけ置く。本文は Noto Sans JP 14px / 行間 1.8 / 字間 normal。見出しは 900 ウェイト 60px に `letter-spacing: 2px` を当て、`body` には `font-feature-settings: "palt"` を 1 行書いて全体へ継承させる。`html { font-size: 10px }` を前提にサイズは px で書く。影はカードに `rgba(0,0,0,0.06) 0 0 24px 0` を 1 種だけ。

### やってはいけない指示

> ❌「ヒーローのキャッチコピーを大きな Web フォントで組んで」 → 実サイトは PNG
> ❌「見出しの字間を 0.03em にして」 → px 固定が仕様（モバイルで広がる挙動ごと再現する）
> ❌「font-weight: 600 で中太にして」 → 配信されていない
