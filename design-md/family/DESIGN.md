# DESIGN.md — ファミリーマート（FamilyMart）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-15 / 対象: `https://www.family.co.jp/`, `/goods.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **`html` を 16px から 6% だけ下げ、そこから先をすべて `rem` で積む。** 影を 1 つも使わず、`2px` の枠線とピル（`border-radius: 25px`）だけで組む。色はブランドの緑ではなく **リンク青 `#0171A6`** が画面を支配する
- **密度**: 中。コンテナは `1200px`。商品カードは写真が主役で、テキストは `15.04px` の 1 サイズに寄せる
- **キーワード**: `0.94rem` のルート、全面 `rem`、字間を足さない、影ゼロ、`mod()` でグリッドにスナップ

**このサイトの核心は4つある。**

1. **ルートは `html { font-size: 15px; font-size: 0.94rem }` の二重宣言で、実測 15.04px。** 後勝ちの `0.94rem` が採用され、**ブラウザ既定 16px の 94%** になる（`15px` は古いブラウザ向けの保険）。11 幅（1920〜374px）すべてで `html` は **15.04px から 1px も動かない**。`rem` 宣言なので**ユーザーのブラウザ文字サイズ設定に追従する**のが狙いで、px に読み替えるとその機能が壊れる
2. **文字・余白・ギャップがすべて `rem`。** `fontSize` の分布が `15.04 / 17.0453 / 26.0688 / 17.86 / 12.032 / 18.048 / 16.544 / 13.536 / 21.056px` と全部半端なのは、15.04px を 1rem としたときの `1.133 / 1.733 / 0.8 / 1.2 / 1.1 / 0.9 / 1.4rem`。`gap` も `9.024px`(0.6rem) / `12.032px`(0.8rem) / `15.04px`(1rem) / `22.56px`(1.5rem)、CTA の `padding` も `12.032px 15.04px`(0.8rem 1rem)。**端数が出たら 15.04 で割ると設計値が出る**
3. **`letter-spacing` を足さない。** 可視 122 要素中 **147 の宣言が `letter-spacing: normal`**（＝字間ゼロ）で、値が付くのは `0.72192px`（18.048px × 0.04em・6 要素）と `0.752px`（15.04px × 0.05em・10 要素）だけ。**日本語の字間をいじらないのがこのサイトの既定**
4. **`font-feature-settings: "palt"` の宣言は CSS 全文に 2 箇所しかない**（`.famipay .ly-pc-fs16` と `.idea h3`）。トップでは **実測 0 要素**、下層 `/goods.html` でだけ `"palt", "tnum"` が **32 要素**に当たる。**書体は `palt` に対応している**（実ページの Noto Sans JP 見出しで −2.7〜−2.9%、`Zen Old Mincho` で −7.5%）ので、「効かない」のではなく「ほとんど使っていない」

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **リンク青** | **`#0171A6`** | **可視 50 / 52 要素。このサイトで最も多い色**。リンク文字、CTA の文字、ロゴのテキスト |
| **FamilyMart グリーン** | **`#008132`** | ファミペイ帯の面（可視 1 要素）。**ブランドの緑は画面にほとんど出てこない** |
| **グリーン（募集導線）** | **`#00AB50`** | `加盟店募集` `物件募集` の文字（下層 2 要素）。**`#008132` とは別の緑** |
| **カード青** | **`#007DB8`** | 下層の商品カテゴリーカードの枠と文字（2 要素）。**リンク青 `#0171A6` とも別** |

> **青が 2 つ、緑が 2 つある。** `#0171A6`（リンク・CTA）と `#007DB8`（カードの枠）、`#008132`（ファミペイ面）と `#00AB50`（募集導線の文字）。どれも実在するので、並べるときは前提にする。

### Semantic（意味的な色）

- **見出し青** (`#0076AE`): トップの商品カード見出し（`人気シリーズ初のハーブティー！` など・可視 10 要素）。リンク青とさらに別の値
- **検索ボタン** (`#0171A6`): 下層の検索実行ボタンの面
- **Gradient（ブランドメッセージ帯）**: `linear-gradient(276deg, #D3EDFA 10%, rgba(0, 0, 0, 0) 90%)`。「あなたと、コンビに、ファミリーマート」の帯のみ（可視 1 要素）。角度 `276deg`・停止位置 `10% / 90%` はそのまま使う

### Neutral（ニュートラル）

- **Text Primary** (`#313131`): 本文・ナビ（**可視 54 / 44 要素**）
- **Text Secondary** (`#333333`): グローバルナビの第 1 階層（可視 11 要素）。**`#313131` とは別の値が同じページに同居している**
- **Text Muted** (`#555555`): フッターの小さなリンク（下層 7 要素）
- **Text Gray** (`#444444`): カテゴリのラベル
- **Border** (`#DDDDDD`): **CTA の枠（`2px solid`）**。このサイトの標準の罫線色
- **Divider** (`#D3D3D3`): 区切り線（可視 3 / 4 要素）
- **Surface Light** (`#F9F9F9`): 検索フォームの面（可視 4 要素）
- **Surface Gray** (`#EFEFEF`): `Language` ボタンの面
- **Surface Footer** (`#F2F2F2`): フッターの面
- **Surface Green** (`#EDF5ED`): ファミペイ紹介ブロックの面（可視 1 要素）
- **Surface Search** (`#EEEEEE`): 下層の検索ブロックの面
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（本文・見出し・既定）**: **Noto Sans JP**。Google Fonts から **6 ウェイト**（100 / 300 / 400 / 500 / 700 / 900）を読み、全部 `loaded`。可視 **129 + 23 要素（トップ）/ 111 + 11 要素（下層）**
- **明朝体**: **Zen Old Mincho**。**トップに 1 要素だけ**（`div#atenbnr .btn h3` ＝「カスタマーハラスメントに対する方針策定について」のバナー見出し）。サイト全体でここにしか出てこない
- `@font-face` は 8 件。内訳は `icn_font`（自社アイコン・`loaded`）、`slick`（カルーセルのアイコン・`unloaded`）、Noto Sans JP の 6 ウェイト

### 3.2 欧文フォント

- 欧文専用の書体は入れていない。`FamilyMart` `FAMIMA` `Convenience Wear` などのラテン文字も **Noto Sans JP で組む**
- アイコンは `icn_font`（自社 webfont）

### 3.3 font-family 指定

```css
/* Google Fonts（v2 形式・6 ウェイト） */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap");

html {
  font-size: 15px;        /* 古いブラウザ向けの保険 */
  font-size: 0.94rem;     /* ← 後勝ち。ブラウザ既定 16px の 94% = 15.04px */
}
body {
  font-family: "Noto Sans JP", sans-serif;
  line-height: 1.5;       /* 無単位。実測 22.56px */
  letter-spacing: normal; /* 字間は足さない */
}
@media only screen and (max-width: 736px) {
  body { font-size: 0.93333rem; }   /* = 15.04 × 0.93333 = 14.0373px */
}
```

- **本文スタックは `"Noto Sans JP", sans-serif`（129 / 111 要素）が正。** ただし**受け皿のない `"Noto Sans JP"` 単独の指定が 23 / 11 要素ある**（`今週のおすすめ商品` `商品情報TOP` などの見出し）。Web フォントが読めなかった環境では generic にすら落ちず、ブラウザの既定書体で出る。**実サイトはこうだが、正しくは `"Noto Sans JP", sans-serif` と書く**
- 明朝も同様に `'Zen Old Mincho', serif` と受け皿が書かれている（こちらは正しい）

### 3.4 文字サイズ・ウェイト階層

**すべて `rem`。px は「15.04px を 1rem としたときの実測値」。**

| 用途 | 宣言 | 実測（1440px） | 実測件数 |
|------|------|---------------|---------|
| 本文・リンク（既定） | `1rem` | **`15.04px`** | **88 / 77 要素（最多）** |
| 注記・フッター小 | `0.8rem` | `12.032px` | 下層 7 要素 |
| 商品名の補足 | `0.9rem` | `13.536px` | 下層 5 要素 |
| セクション見出し（小） | `1.1rem` | `16.544px` | 下層 5 要素 |
| ボタン内のラベル | `1.133rem` | `17.0453px` | 12 要素 |
| 商品カード見出し | `1.1875rem` | `17.86px` | 10 要素 |
| グローバルナビ | `1.2rem` | `18.048px` | 下層 7 要素 |
| セクション見出し（大） | `1.4rem` | `21.056px` | ─ |
| ページ見出し `h2` | `1.733rem` | **`26.0688px`** | 11 要素 |

| ウェイト | 用途 | 実測 |
|---------|------|------|
| `400` | 本文・リンク | **90 / 86 要素（最多）** |
| `500` | グローバルナビ | 30 / 23 要素 |
| `600` | セクション見出し（`今週のおすすめ商品` `45周年キャンペーン`） | 16 / 11 要素 |
| `700` | 商品カードの見出し、注記の強調 | 17 / 2 要素 |

> **`600` は `@font-face` に存在しない。** 読み込んでいるのは 100 / 300 / 400 / 500 / 700 / 900 の 6 本なので、**`600` を指定した 16 要素は CSS フォントマッチングで 700 に解決される**（合成太字ではなく Bold のファイルがそのまま出る）。**見た目は `700` と同じ**。新規実装では `600` ではなく `700` と書けばよい。

### 3.5 行間・字間

| 値 | 用途 | 実測 |
|----|------|------|
| `line-height: 1.5` | `body` の既定 | **116 / 78 要素（最多）**。実測 22.56px |
| `line-height: 1.4` | 商品カードの見出し | 14 / 2 要素 |
| `line-height: 1.2` | ボタン内のラベル | 12 / 4 要素 |
| `line-height: 1.15` | 下層の商品カテゴリーボタン | 下層 34 要素 |
| `letter-spacing: normal` | **既定** | **147 / 104 要素** |
| `letter-spacing: 0.05em` | ブランドメッセージ・カテゴリ見出し | 実測 `0.752px`・10 要素 |
| `letter-spacing: 0.04em` | グローバルナビ | 実測 `0.72192px`・6 要素 |

- **`line-height` は無単位。** `body` の `1.5` が各要素で再計算される（`lineHeightRatio` に 1 未満は **0 件**なので、`em` や px の絶対値ではないと確定）
- **`letter-spacing` の既定は `normal`。** 字間を足すのは例外で、しかも `em` で宣言するので**サイズに比例して px が変わる**（18.048px → 0.72192px、15.04px → 0.752px）。AIU のような px 継承型ではない

### 3.6 禁則処理・改行ルール

- `word-break` は `normal`（ブラウザ既定の日本語禁則）。`break-all` も `auto-phrase` も使っていない
- 商品名が長いときも折り返しに任せ、`<br>` で割らない

### 3.7 OpenType 機能

- **`font-feature-settings` の宣言は CSS 全文に 2 箇所だけ**：`.famipay .ly-pc-fs16` と `.idea h3`
- **トップは実測 0 要素。** 下層 `/goods.html` で `"palt", "tnum"` が **32 要素**に当たる（商品一覧の見出しと数字）
- **書体は対応している。** 実ページの Noto Sans JP 見出し（26.07px「今週のおすすめ商品」）で `normal` 234.55px → `"palt"` 227.7px ＝ **−2.9%**、`Zen Old Mincho`（24.97px）で **−7.5%**。約物の少ない文字列では効果が小さいだけで、機能そのものは生きている
- **`tnum`（等幅数字）が `palt` とセットで指定されている**点が特徴。商品一覧の価格・日付を縦に揃えるため

### 3.8 縦書き

- 縦組みは使っていない（`writing-mode: vertical-rl` は実測 0 要素）
- このサイトを参照して縦組みを実装しない

---

## 4. Component Stylings

### Buttons

**Primary（一覧への導線・アウトライン型）**

```css
.btn {
  background: #ffffff;
  color: #0171A6;
  border: 2px solid #DDDDDD;   /* 枠は灰、文字は青 */
  border-radius: 25px;          /* ピル。トップ 12 要素 */
  padding: 14px 40px;
  font-size: 1.133rem;          /* 実測 17.0453px */
  line-height: 1.2;
}
```

- **塗りのボタンがほぼ無い。** CTA は白地＋`2px` の灰枠＋青文字のピル。**枠が `1px` ではなく `2px`** なのがこのサイトの特徴
- 下層の検索実行ボタンだけが面を持つ（`background: #0171A6` / `color: #ffffff`）

**カテゴリーカード（下層・枠が色付き）**

```css
.category-card {
  background: #ffffff;
  color: #007DB8;
  border: 2px solid #007DB8;    /* 枠と文字が同色 */
  border-radius: 8px;           /* 下層は 8px が 70 要素 */
  line-height: 1.15;
}
```

> **角丸はページで違う。** トップは `25px`（ピル・12 要素）が主で、下層は **`8px` が 70 要素**と支配的。**一覧系のカードは `8px`、導線のボタンは `25px`** と使い分ける。

**実サイトの誤り（真似しない）**

```css
/* 実サイト: Language ボタンに border-style の宣言が無く、UA 既定の outset が出ている */
.lang-btn { border: 2px outset rgb(0, 0, 0); }

/* 正しくは */
.lang-btn { border: 1px solid #DDDDDD; background: #EFEFEF; }
```

### Badges / Chips

```css
.badge {
  background: #EDF5ED;    /* 淡い緑 */
  color: #313131;
  border-radius: 4px;     /* トップ 4 要素 */
  padding: 0.8rem 1rem;   /* 実測 12.032px 15.04px */
  font-size: 0.8rem;
}
```

### Inputs

```css
.search {
  background: #F9F9F9;
  border-radius: 3px;
  /* 影は付けない */
}
.search__submit {
  background: #0171A6;
  color: #ffffff;
  padding: 0 11.28px 0 11px;
}
```

### Cards

```css
.card {
  background: #ffffff;
  border-radius: 8px;     /* 下層の商品カード。トップのバナーは角丸なし */
  box-shadow: none;       /* ★ サイト全体で影 0 種 */
}
```

---

## 5. Layout Principles

### Spacing Scale

**すべて `rem`（1rem = 15.04px）。**

| 宣言 | 実測 | 用途 |
|------|------|------|
| `0.5rem` | `7.52px` | カードの縦ギャップ |
| `0.6rem` | `9.024px` | 小さなリストの `gap` |
| `0.8rem` | `12.032px` | バナーの `gap`、ボタンの上下 padding |
| `1rem` | `15.04px` | 標準の `gap` ／ ボタンの左右 padding |
| `1.5rem` | `22.56px` | セクションの `gap` |

### Container

```css
.container {
  max-width: 1200px;     /* 実測 9 / 7 要素 */
  margin-inline: auto;
}

/* 商品グリッドだけ 34px のグリッドにスナップさせる */
@supports (max-width: mod(100%, 34px)) {
  .goods-grid { max-width: calc(100% - 136px - mod(100%, 34px)); }
  .goods-grid--narrow { max-width: calc(100% - 98px - mod(100%, 34px)); }
}
```

> **`mod()` で余りを切り落としてグリッドに揃えている。** `calc(100% - 136px - mod(100%, 34px))` は「左右 136px を引いた幅を、さらに 34px の倍数まで切り下げる」。CSS の `mod()` は新しい関数なので **`@supports` でガードしてある**。未対応ブラウザでは素の `1200px` にフォールバックする。**この構えごと真似する**（`@supports` を外すと古い環境でレイアウトが崩れる）。

### Grid

- トップは「ヒーローのバナーカルーセル（1200×370）→ 今週のおすすめ商品 → キャンペーン → 企業情報」の縦積み
- 商品カードは 4 列。画像は正方形（279×279）
- `border-radius: 50%` の円が 4 / 5 要素（カルーセルのページャ）

---

## 6. Depth & Elevation

**このサイトは影を一切使わない。**

| レベル | 値 | 用途 | 実測 |
|--------|-----|------|------|
| 0（唯一） | なし | すべての要素 | **両ページとも `boxShadow` 0 種** |

- 奥行きは **`2px` の枠線**と**淡い面色**（`#F9F9F9` / `#EFEFEF` / `#EDF5ED` / `#F2F2F2`）で表す
- カードを浮かせたくなっても影を足さない。`border: 2px solid #DDDDDD` と `border-radius: 8px` で区切る

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 15px; font-size: 0.94rem }` の二重宣言をそのまま書く。** `rem` 宣言がユーザーのブラウザ文字サイズ設定に追従させる本体で、`15px` は保険
- **文字・余白・ギャップをすべて `rem` で書く。** 1rem = 15.04px。px の実測値から設計値に戻すときは **15.04 で割る**
- **`letter-spacing` は既定で `normal`。** 足すのはナビ（`0.04em`）とブランドメッセージ（`0.05em`）だけ、しかも `em` で書く
- **`line-height` は無単位（既定 `1.5`）**
- **CTA は白地＋`2px solid #DDDDDD`＋`border-radius: 25px`、文字は `#0171A6`**
- **一覧のカードは `border-radius: 8px`**（下層 70 要素）。ピルの `25px` は導線のボタンだけ
- **影を使わず、`2px` の枠と淡い面で区切る**
- **数字を並べるところでは `font-feature-settings: "palt", "tnum"`** を使う（下層の 32 要素がこれ）
- `mod()` を使うときは `@supports (max-width: mod(100%, 34px))` でガードする

### Don't（禁止）

- **`font-size` を px で直書きしない。** `rem` でないと root の 94% 設計と文字サイズ設定への追従が壊れる
- **root を 16px や 10px に読み替えない。** 15.04px（= `0.94rem`）が正
- **`font-weight: 600` を書かない。** `@font-face` に無いので 700 で出る。はじめから `700` と書く
- **`letter-spacing` を本文に足さない。** 既定は `normal`
- **影（`box-shadow`）を足さない。** サイト全体で 0 種
- **`"Noto Sans JP"` を受け皿なしで書かない。** 実サイトには 23 / 11 要素あるが誤り。`"Noto Sans JP", sans-serif` と書く
- **`border` を `outset` のまま放置しない**（実サイトの `Language` ボタンがそうなっている）。`solid` を明示する
- **明朝（Zen Old Mincho）を広く使わない。** 実サイトでは**バナー見出し 1 要素だけ**
- **縦組みを実装しない**（実測 0 要素）
- **CSS Custom Properties を前提にしない。** このサイトは**変数を 1 つも定義していない**（`total: 0`。読めなかったシートは Google Fonts の 1 枚だけで、そこに変数は無い）

---

## 8. Responsive Behavior

### Breakpoints

| 条件 | 実測 | 変わるもの |
|------|------|-----------|
| `only screen and (max-width: 736px)` | **153 / 158 箇所（圧倒的に最多）** | `body { font-size: 0.93333rem }` ＝ 14.0373px。レイアウトが 1 列に |
| `print, screen and (min-width: 737px)` | 24 / 27 箇所 | デスクトップ（既定） |
| `(min-width: 737px) and (max-width: 979px)` | 5 箇所 | タブレットの列数 |
| `(hover: hover)` | 4 箇所 | ホバー効果をタッチ端末で切る |

**崖は 736 / 737px の 1 箇所。**

```css
/* 737px 以上: body = 1rem = 15.04px */
/* 736px 以下 */
@media only screen and (max-width: 736px) {
  body { font-size: 0.93333rem; }   /* 実測 14.0373px / line-height 21.0559px */
}
```

- **`html` は 11 幅（1920 / 1440 / 1200 / 1024 / 834 / 768 / 767 / 414 / 390 / 375 / 374px）すべてで 15.04px から動かない。** 可変なのは `body` だけで、しかも 1 段だけ
- 見出し `h2` は `26.0688px`（1.733rem）→ 736px 以下で `18.048px`（1.2rem）に落ちる
- `h3` は **3 段**：1920px で `21.056px`、1440px で `17.28px`、1200px 以下で `16.544px`

### タッチターゲット

- CTA は `padding: 14px 40px` ＋ `17.0453px` で高さ約 49px。**そのままで 44px を超える**
- 商品カテゴリーカードは `padding: 0` で高さを画像に依存させているので、**モバイルでは最小高さを 44px で確保する**

### フォントサイズの調整

- **ルートは固定、`body` だけ 736px 以下で 1 段下がる**（15.04px → 14.0373px、約 −6.7%）
- 流体（`vw` / `clamp()`）は**ルートにも本文にも使っていない**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
リンク青:       #0171A6（最多・CTA の文字）
カード青:       #007DB8（枠と文字）／ 見出し青 #0076AE
ブランド緑:     #008132（面）／ 募集導線の緑 #00AB50（文字）
文字色:         #313131（本文）／ #333333（ナビ）／ #555555（フッター）
枠:             #DDDDDD（2px solid）／ 区切り #D3D3D3
面:             #F9F9F9（検索）/ #EFEFEF / #F2F2F2（フッター）/ #EDF5ED（ファミペイ）
背景:           #FFFFFF
root:           html { font-size: 15px; font-size: 0.94rem }  → 15.04px
本文書体:       "Noto Sans JP", sans-serif / 1rem(15.04px) / line-height 1.5 / letter-spacing normal
明朝:           "Zen Old Mincho", serif（1 要素だけ）
ウェイト:       400 / 500 / 700（600 は書かない。700 で出る）
CTA:            白地 + 2px solid #DDDDDD + border-radius 25px + padding 14px 40px + color #0171A6
角丸:           8px（一覧カード）/ 25px（導線ボタン）/ 4px（バッジ）/ 50%（ページャ）
影:             0 種（使わない）
コンテナ:       max-width 1200px ／ 商品グリッドは calc(100% - 136px - mod(100%, 34px))
ブレークポイント: 736 / 737px（body が 0.94rem → 0.93333rem）
palt:           商品一覧の見出し・数字にだけ "palt","tnum"
```

### プロンプト例

> ファミリーマートのデザインで「キャンペーン一覧」ページを作って。
> `html { font-size: 15px; font-size: 0.94rem }` を書き、文字・余白・`gap` をすべて `rem` で指定（1rem = 15.04px）。
> 本文は `"Noto Sans JP", sans-serif` / `1rem` / `line-height: 1.5` / `letter-spacing: normal`。
> 見出しは `1.733rem` / `font-weight: 700`（`600` は使わない）。
> カードは `border-radius: 8px`、枠は `2px solid #DDDDDD`、**影は付けない**。
> 「一覧をみる」ボタンは白地・`2px solid #DDDDDD`・`border-radius: 25px`・`padding: 14px 40px`・文字 `#0171A6`。
> コンテナは `max-width: 1200px`。
> `@media only screen and (max-width: 736px)` で `body { font-size: 0.93333rem }`。
> 価格や日付を並べるところだけ `font-feature-settings: "palt", "tnum"` を当てる。
