# DESIGN.md — 玄光社（GENKOSHA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-20 / 対象: `https://www.genkosha.co.jp/`, `/book/b10195088.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **写真・映像・イラストの専門書出版社。書影を主役にして、文字は 13px まで小さく落とす。** 黒文字 ＋ 淡いグレーの地（`#f9f9f9`）に、書影だけが色を持つ
- **密度**: 高い。トップの可視テキスト 216 要素のうち **119 要素が 13px**。書名・価格・発売日を詰めて並べる目録型
- **キーワード**: 秀英角ゴシック金、palt グローバル、13px、パステルのラベル、影は 1 種

**このサイトの核心は 4 つある。**

1. **`html { font-size: 10px }`。** ルートが 16px ではない。**`rem` の px 換算がすべて変わる**（`1.5rem` = 15px、`1.3rem` = 13px）。この DESIGN.md の数値はすべて実測 px で書いてある
2. **和欧二層で、欧文を先頭に置く。** `dm-sans, dnp-shuei-gothic-kin-std, sans-serif` が 211/216 要素。**欧文＝DM Sans、和文＝DNP 秀英角ゴシック金 Std**（どちらも Adobe Fonts・`loaded` 済）。数字と英字は DM Sans、かなと漢字は秀英角ゴが受け持つ
3. **`font-feature-settings: "palt"` をグローバルに当てている**（トップ **997 要素**、書誌ページ **607 要素**）。**そのうえで `letter-spacing: 0.9px` を body に 1 回書いて継承させる**（201/216 要素）。**詰めてから空ける**という二段構え
4. **`line-height` は body に絶対値 `19.5px` で入っている。** 15px に対して 1.30。子要素も 13px→16.9px、34px→44.2px、40px→52px と**すべて 1.30 倍**で継承する

> **CSS Custom Properties は 11 個。すべて自社トークンでプラットフォーム由来は 0。** ただし色トークンの 3 個は宣言と実装が食い違う（2 章参照）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Text / 面の黒** | **`#000000`** | **文字 156 要素**。`詳細検索` ボタンは `#333333` の面、書誌ページの購入 CTA は `#000000` の面 |
| **Link Navy** | **`#19448e`** | 書誌ページのジャンルリンク 4 要素（`--link-color` と一致） |
| **Surface Dark** | `#333333` | `詳細検索` の面（3 要素） |

> **このサイトにはいわゆる「ブランドカラー」の面が無い。** 色を持つのは書影とラベルだけで、UI は黒・白・グレーで組まれている。

### Semantic（ラベルの色）

| ラベル | 面色 | 実測 |
|---|---|---|
| **新刊** | **`#ff808e`**（サーモンピンク） | 書誌ページ 2 要素 |
| **近刊** | **`#ffa166`**（オレンジ） | 書誌ページ 2 要素 |
| **イベント / NEWS / 重版 / 書店向け / PR** | **`#ffffe2`**（淡黄） | トップ 14 要素。**5 種類のラベルすべてが同じ淡黄** |
| **定期購読** | `#edf8e1`（淡緑） | 3 要素 |
| **バックナンバー** | `#eaf6f8`（淡青） | 3 要素 |

> **お知らせのラベルは 5 種類あるが面色は 1 つ**（`#ffffe2`）。**種類は文字で区別し、色では区別しない。** 一方、雑誌の導線（定期購読 / バックナンバー）と書籍の状態（新刊 / 近刊）は色で区別する。

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し・リンク。**可視 156 要素**。**このサイトは本文に純黒を使う**
- **Text Secondary** (`#333333`): 書名（カード内）20 要素
- **Text Tertiary** (`#666666`): 書誌の項目名（`著者` `ジャンル` `シリーズ`）8 要素
- **Text Muted** (`#999999`): フッター見出し 5 要素。検索ボタンの面色にも使う
- **Text on Dark** (`#ffffff`): 黒面・検索フォーム上（35 要素）
- **Border** (`#cccccc`): `--bordercolor`。`MORE` `VIEW ALL` の枠
- **Border Label** (`#666666`): ラベル（`イベント` `新刊`）の 1px 枠
- **Surface** (`#ffffff`): カード
- **Surface Alt** (`#eeeeee`): 書誌ページの `目次` 見出し
- **Background** (`#f9f9f9`): ページ背景（`pageBackground.resolved` = `rgb(249,249,249)` / 根拠 **`viewportTopBySample (12/12)`** — 12 点サンプル全一致なので信頼してよい。`html` / `body` はどちらも透明）

### 宣言 ≠ 実装（色）

| 変数 | 宣言値 | 実測 |
|---|---|---|
| `--main-color1` | `#000000` | 本文色として一致 |
| `--main-color2` | `#000000` | **`--main-color1` と同値**。2 段階を想定した名前だが色が分かれていない |
| `--main-color3` | `#888888` | **可視 0 要素**（実際の補助色は `#999999`） |
| `--main-color-rgb` | **`31, 46, 102`（= `#1f2e66` の紺）** | **可視 0 要素。`--main-color1/2` の黒とも一致しない** |
| `--sub-color1` | **`#c4d700`（黄緑）** | **可視 0 要素** |
| `--sub-color2` | `#f4f4f7` | 可視 0 要素（実際の地色は `#f9f9f9`） |
| `--bordercolor` | `#cccccc` | 一致（`MORE` / `VIEW ALL` の枠） |
| `--link-color` | `#19448e` | 書誌ページ 4 要素で一致 |

> **`--main-color-rgb: "31, 46, 102"` は紺で、`--main-color1: #000000` の黒とは別物。** 名前から「同じ色の rgb 版」と推測してコピーすると紺が混ざる。**`--main-color-rgb` と `--sub-color1` は使わないこと。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **DNP 秀英角ゴシック金 Std**（`dnp-shuei-gothic-kin-std`・Adobe Fonts・`loaded`）。**Regular と 600 の 2 ウェイトだけが `@font-face` に宣言されている**
- **明朝体**: 使わない。**このサイトに和文明朝は 1 要素も無い**

### 3.2 欧文フォント

- **サンセリフ**: **DM Sans**（Adobe Fonts・`loaded`）。`normal` と `700` の 2 ウェイト
- **価格・日付・ISBN も DM Sans の数字で出る**（スタック先頭のため）
- 等幅フォントの指定は無い

### 3.3 font-family 指定

```css
/* 本文・UI（既定） */
font-family: dm-sans, dnp-shuei-gothic-kin-std, sans-serif;   /* --basefont */

/* 和文だけで組みたいところ（グローバルナビ・カテゴリ見出し） */
font-family: dnp-shuei-gothic-kin-std, sans-serif;            /* --dnpFont */
```

**フォールバックの考え方**:

- **欧文優先。** DM Sans を先頭に置き、DM Sans が持たないグリフ（かな・漢字）だけを秀英角ゴが拾う。**note と同じ型**
- **ナビとカテゴリ見出しだけは和文優先**（`--dnpFont`、実測 4 要素）。**欧文が混ざらない場所では DM Sans を外している**
- `sans-serif` で終わる。OS フォントのチェーンは持たない

> **Adobe Fonts はドメインライセンスなので、別ドメインでは読み込めない。** 再現するときは DM Sans（Google Fonts にもある）＋ 秀英角ゴに近い和文（Zen Kaku Gothic New / Noto Sans JP）に差し替える。

### 3.4 文字サイズ・ウェイト階層

**ルートは `html { font-size: 10px }`、`body` は `15px`。`rem` を px に直すときは ×10 で計算すること**（`1.3rem` = 13px）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Section Display** | dm-sans + 秀英角ゴ | **40px** | **700** | **1.30** (52px) | 0.9px | `PICKUP` |
| Section Heading | dm-sans + 秀英角ゴ | **34px** | **600** | 1.30 (44.2px) | 0.9px | `新刊情報` |
| Book Title (詳細) | dm-sans + 秀英角ゴ | 28px | 700 | 1.30 | 0.9px | 書誌ページの書名 |
| Sub Heading | dm-sans + 秀英角ゴ | 24px | 600 | 1.30 (31.2px) | 0.9px | `同じジャンルの本` / 価格 |
| **Card Title** | dm-sans + 秀英角ゴ | **20px** | **700** | **1.69** (33.8px) | 0.9px | **PICKUP の書名。行間だけ広い** |
| Nav（和文のみ） | **秀英角ゴ単独** | **17px** | **600** | **1.00** (17px) | 0.9px | `書籍・ムック` `雑誌` `WEBメディア` |
| Price | dm-sans + 秀英角ゴ | 18px | 700 | 1.30 | 0.9px | `¥1,760` |
| **Body** | dm-sans + 秀英角ゴ | **15px** | **400** | **1.30** (19.5px) | **0.9px** | **既定。body に直接当たっている** |
| Sub Nav | dm-sans + 秀英角ゴ | 15px | 600 | 1.30 | 0.9px | `すべて` `紙の本のみ` `電子書籍のみ` |
| **Caption / List** | dm-sans + 秀英角ゴ | **13px** | **400** | **1.30** (16.9px) | 0.9px | **最多の 119 要素**。ユーティリティナビ・書名リスト |
| Description | dm-sans + 秀英角ゴ | 13px | 400 | **1.69** (21.97px) | 0.9px | 書籍の紹介文（`p` 要素） |
| Label | dm-sans + 秀英角ゴ | 13px | 600 | **2.85** (37px) | 0.9px | `定期購読` `バックナンバー` |
| Side List | dm-sans + 秀英角ゴ | 15px | 400 | **2.10** | 0.9px | `書籍検索` `新刊` `近刊`（22 要素） |
| Badge | dm-sans + 秀英角ゴ | **11px** | 400 | 1.73 | **normal** | `イベント` `NEWS` `重版`。**ここだけ字間なし** |
| Tax Note | dm-sans + 秀英角ゴ | 11px | 400 | 1.30 | 0.9px | `(税込)` |
| Issue Date | dm-sans + 秀英角ゴ | 12px | 400 | 1.30 | 0.9px | `毎月15日発売` |
| More Link | dm-sans + 秀英角ゴ | 14px | 700 | 2.71 | 0.9px | `MORE` `VIEW ALL` |
| Copyright | dm-sans + 秀英角ゴ | **9px** | 400 | 1.30 | 0.9px | フッター |

**`h1` は 15px / weight 400 で `body` と同じ**（ロゴ用でスタイルが当たっていない）。**`h3` (40px) が `h2` (34px) より大きい。** 見出し階層はタグ名ではなく**サイズで読むこと**。

### 3.5 行間・字間

- **行間の既定は 1.30**（実測 107 要素で最多）。**body に `line-height: 19.5px` という絶対値で入っており、子要素の px も 13→16.9 / 34→44.2 / 40→52 と 1.30 倍で揃う**
- **紹介文とカード書名だけ 1.69**（30 要素）。**読ませる文だけ行間を開ける**
- **`定期購読` / `バックナンバー` は 2.85**（6 要素）、サイドのリストは **2.10**（22 要素）、`MORE` は **2.71** — いずれも**行高でボタンの高さを作っている**
- **字間は `letter-spacing: 0.9px` が 201/216 要素**。`body` に 1 回書いて継承させている（15px に対して 0.06em 相当）
- **例外は淡黄のラベル（`イベント` 等）14 要素と、書誌ページの `新刊` / `近刊` の `normal`**

> **`letter-spacing` は px 宣言・px 継承。** 15px 本文で 0.9px、13px のキャプションでも **0.9px のまま**（em なら 0.78px になるはずが、そうなっていない）。**em に読み替えないこと。**

**ガイドライン**:

- **`letter-spacing: 0.9px` を body に 1 回だけ書いて継承させる。** 子要素で再宣言しない
- **`line-height` は `1.3` として継承させる**（px 固定でもよいが、比率にしても実測と一致する）
- **本文の行間は 1.3 と狭い。紹介文だけ 1.69 に開ける** — この落差が目録らしさを作っている
- **13px を基準サイズとして扱う。** 216 要素中 119 要素が 13px

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 書名は全角スペースを含む長いものが多い（`ディズニー　ツイステッドワンダーランド　ボールペンイラストLesson`）。**カード内では 2〜3 行で折り返す前提**
- `word-break: break-all` は使わない（書名の途中で割れる）

### 3.7 OpenType 機能

**`font-feature-settings: "palt"` をグローバルに当てている**（トップ **997 要素**、書誌ページ **607 要素**）。

```css
font-feature-settings: "palt";
letter-spacing: 0.9px;
```

- **`palt` で詰めてから `0.9px` で空ける、という二段構え。** 秀英角ゴの全角ベタ組みを一度崩し、均一なアキを足し直している
- **どちらか一方だけを真似ない。** `palt` だけだと詰まりすぎ、`0.9px` だけだと括弧まわりが空く
- **本文（13px / 15px）にも当たっている。** 見出し限定ではない

### 3.8 縦書き

**該当なし**（`writing-mode: vertical-rl` は実測 0 要素）。書影は画像として扱う。

---

## 4. Component Stylings

### Buttons

**Primary（購入 CTA・書誌ページ）**
- Background: **`#000000`** / Text: `#ffffff`
- Padding: `5px 0px`（幅いっぱい）
- Border Radius: **`0px`**
- Font: 15px / **weight 600** / `letter-spacing: 0.9px`
- 例: `ネット書店で購入する` `店舗の在庫を確認`

**Dark（`詳細検索`）**
- Background: **`#333333`** / Text: `#ffffff`
- Border Radius: **`5px`**
- Font: 14px / weight 600 / `letter-spacing: 0.9px`

**Search（丸ボタン）**
- Background: **`#999999`** / Text: `#ffffff`
- Border Radius: **`20px`**
- Font: 16px / weight 400

**Ghost（`MORE` / `VIEW ALL`）**
- Background: `#ffffff` / Text: `#000000`
- Border: **`1px solid #cccccc`**
- Border Radius: **`18px`**
- Font: 14px / **weight 700** / line-height 2.71

### Badges / Labels

**News Label（淡黄・5 種共通）**
- Background: **`#ffffe2`** / Text: `#000000`
- Border: **`1px solid #666666`**
- Padding: `0px 8px`
- Border Radius: **`9px`**
- Font: **11px / weight 400 / `letter-spacing: normal`**
- 文字: `イベント` `NEWS` `重版` `書店向け` `PR`

**Status Label（書誌ページ）**
- `新刊`: Background `#ff808e` / `近刊`: Background `#ffa166`
- Text: `#000000` / Border: `1px solid #666666`
- Padding: `3px 12px 0px` / Border Radius: **`11px`**
- Font: 13px / weight 400 / `letter-spacing: normal`

**Magazine Link**
- `定期購読`: Background `#edf8e1` / `バックナンバー`: Background `#eaf6f8`
- Text: `#000000` / Border: `1px solid #666666` / Border Radius: **`0px`**
- Font: 13px / weight 600 / line-height **2.85**（37px）

### Cards

**Book Card（PICKUP）**
- Background: `#ffffff`
- Border Radius: **`10px`**（40 要素で最多）
- Shadow: **`0 3px 6px rgba(0, 0, 0, 0.16)`**（**56 要素。サイトで唯一の影**）

**Thumbnail（書影）**
- Border Radius: **`5px`**（20 要素）

### Inputs

- Background: `#ffffff` / Border Radius: `0px`
- Height: **38px**（`line-height: 38px` で確保）
- Font Size: **13px**

> **入力欄・`select`・`button` の `font-family` が `Arial` のまま**（`font-family: inherit` が当たっていない）。**これは実サイトの欠陥。** 新規実装では必ず

```css
input, select, textarea, button { font-family: inherit; }
```

を入れて、DM Sans ＋ 秀英角ゴに揃えること。

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | **5px** | 購入ボタンの上下・サムネの角丸 |
| S | **10px** | 小さい gap（5 箇所） |
| M | **18px / 20px** | カード内側・列 gap |
| L | **25px** | **書影グリッドの gap（30 箇所で最多）** |
| XL | **30px / 32px / 35px** | セクション内の縦 gap |
| XXL | **50px / 60px** | 書誌ページのブロック間 |

### Container

- **Max Width: 1180px**（`--sitewidth`。実測 6 要素で一致）
- **本文カラム: 800px**（4 要素）
- **書影グリッドの 1 列: 580px**（**31 要素で最多**）
- 書誌ページの説明カラム: 680px
- サイドバー / 最小列: 320px

### Grid

- トップは **580px × 2 列**（`gap: 25px`）のモザイク。その中を書影カードで埋める
- 書誌ページは「書影（左）／書名・価格・購入 CTA（右）」の 2 カラム ＋ 下に 680px の紹介文

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | ラベル・ボタン・ナビ |
| **1** | **`0 3px 6px rgba(0, 0, 0, 0.16)`** | **書影カード。実測 56 要素で事実上これ 1 種** |
| 2 | `0 3px 20px rgba(0, 0, 0, 0.16)` | 書誌ページのモーダル・追従要素（5 要素） |

> **影は「書影を紙として浮かせる」ためだけにある。** ボタンにもラベルにも付けない。`rgba(0,0,0,0.16)` の不透明度と `3px` の下方向オフセットは Level 1 / 2 で共通で、**ぼかし半径だけ 6px → 20px と変える**。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 10px }` を前提に `rem` を書く**（`1.3rem` = 13px）。**16px 基準で換算しない**
- **`font-family: dm-sans, dnp-shuei-gothic-kin-std, sans-serif` の順。** 欧文が先
- **ナビ・カテゴリ見出しだけは `dnp-shuei-gothic-kin-std, sans-serif`**（欧文を外す）
- **`font-feature-settings: "palt"` をグローバルに当て、同時に `letter-spacing: 0.9px` を body に書く。** 二段構えで 1 セット
- **`line-height` は 1.30 を既定に、紹介文だけ 1.69**
- **13px を基準サイズにする**（216 要素中 119 要素）
- **影は書影カードの `0 3px 6px rgba(0,0,0,0.16)` だけ**
- **お知らせのラベルは 5 種類とも `#ffffe2`。** 種類は文字で区別する
- `input` / `select` / `button` に **`font-family: inherit`** を必ず入れる

### Don't（禁止）

- **`palt` と `letter-spacing: 0.9px` を片方だけ入れない**
- **`letter-spacing` を em に読み替えない**（px 宣言・px 継承。13px でも 0.9px のまま）
- **`letter-spacing` を子要素で再宣言しない**（body の継承に任せる）
- **`--main-color-rgb`（`31, 46, 102` の紺）を `--main-color1` の rgb 版だと思って使わない**
- **`--sub-color1`（`#c4d700`）と `--main-color3`（`#888888`）を使わない**（実装で可視 0 要素）
- **本文の行間を 1.7 以上にしない**（このサイトの既定は 1.30）
- **ボタン・ラベルに影を付けない**
- **`h2` / `h3` のタグ名で大きさを判断しない**（実サイトは `h3` 40px > `h2` 34px）
- **和文明朝を使わない**（実サイトは 0 要素）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測 |
|------|-------|------|
| **Mobile** | **`(max-width: 768px)`** | **トップ 149 回 / 書誌 201 回。最多** |
| **Desktop** | **`(min-width: 769px)`** | トップ 28 回 / 書誌 46 回 |
| Tablet（書誌） | `(max-width: 900px)` / `(min-width: 901px)` | 38 回 / 15 回 |
| Narrow Desktop | `(min-width: 769px) and (max-width: 1200px)` | 9 回 |
| | `(min-width: 769px) and (max-width: 1100px)` | 3 回 |
| Small | `(max-width: 480px)` | 1 回 |

- **デスクトップファースト（`max-width` 優先）で、軸は `768px / 769px` の 1 本**
- 書誌ページだけ `900px / 901px` の第 2 軸を持つ（書影 ＋ 情報の 2 カラムを解除する点）

### タッチターゲット

- 購入 CTA は幅いっぱい × `5px 0px` padding に 15px / 1.30 → 約 30px 高。**44px を下回る。モバイルでは高さを確保すること**
- `定期購読` ラベル（13px / line-height 2.10）は約 27px 高、News Label（11px / 1.73）は約 19px 高 — **いずれも 44px を下回る**
- 検索ボタン（radius 20px）は 40px 径で概ね満たす

### フォントサイズの調整

- 本文 15px / キャプション 13px / 税表記 11px / コピーライト 9px はブレークポイントをまたいで固定
- `PICKUP` 40px・`新刊情報` 34px はデスクトップ前提。モバイルでは 24px 前後に落とす

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Root:         html { font-size: 10px }   ← rem は ×10 で px
Text Color:   #000000
Text Sub:     #333333 / #666666 / #999999
Link Navy:    #19448e
Border:       #cccccc（枠） / #666666（ラベルの枠）
Background:   #f9f9f9
Surface:      #ffffff
Label Yellow: #ffffe2   Label Pink: #ff808e   Label Orange: #ffa166
Label Green:  #edf8e1   Label Blue: #eaf6f8
Font (既定): dm-sans, dnp-shuei-gothic-kin-std, sans-serif
Font (和文のみ): dnp-shuei-gothic-kin-std, sans-serif
Body Size: 15px（基準サイズは 13px）
Line Height: 1.30（既定） / 1.69（紹介文）
Letter Spacing: 0.9px（body に 1 回・px のまま継承）
font-feature-settings: "palt"（グローバル）
Border Radius: 10px（カード） / 5px（書影・詳細検索） / 9px・11px（ラベル） / 18px（Ghost） / 0px（購入 CTA）
Box Shadow: 0 3px 6px rgba(0,0,0,0.16)（書影カードのみ）
```

### プロンプト例

```
玄光社のデザインシステムに従って、書籍一覧ページを作成してください。
- html { font-size: 10px } を前提にする（rem は ×10 で px に直す）
- font-family は dm-sans, dnp-shuei-gothic-kin-std, sans-serif（ナビだけ dnp-shuei-gothic-kin-std, sans-serif）
- body に font-feature-settings: "palt" と letter-spacing: 0.9px を書いて継承させる（子要素で再宣言しない）
- line-height は 1.3 を既定に、書籍の紹介文だけ 1.69
- 本文 15px、リスト・キャプションは 13px、税表記は 11px
- セクション見出しは 34px / weight 600、PICKUP は 40px / weight 700
- 書影カードは背景 #ffffff / border-radius 10px / box-shadow 0 3px 6px rgba(0,0,0,0.16)
- 書影のサムネイルは border-radius 5px
- お知らせのラベルは背景 #ffffe2 / 1px solid #666666 / border-radius 9px / 11px / letter-spacing: normal
- 「新刊」は #ff808e、「近刊」は #ffa166、どちらも border-radius 11px
- 購入ボタンは背景 #000000 / 文字 #ffffff / border-radius 0 / 15px weight 600
- MORE / VIEW ALL は白地 + 1px solid #cccccc / border-radius 18px / 14px weight 700
- ページ背景は #f9f9f9、コンテナは 1180px、グリッドは 580px 2 列で gap 25px
- input / select / button に font-family: inherit を必ず入れる
```
