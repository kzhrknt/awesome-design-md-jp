# DESIGN.md — アサヒ飲料（Asahi Soft Drinks）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-15 / 対象: `https://www.asahiinryo.co.jp/index.psp.html`, `/products/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **`letter-spacing: 0.1rem` を全要素に降ろして、ゆったり空ける。** 文字は純黒（`#000000`）、面はコーポレートの紺（`#052D85`）。CTA はすべて `border-radius: 30px` のピルで、**斜め下に落ちる影（`2px 2px 5px`）を 65 要素に使う**
- **密度**: 低い。`line-height: 1.66`（実測 95 要素）に `letter-spacing: 1.6px` を重ねるので、本文がかなり開く
- **キーワード**: `0.1rem` の字間、`palt` が効いていない、純黒、紺のピル、斜めの影、ヒーローは `<canvas>`

**このサイトの核心は4つある。**

1. **`font-feature-settings: "palt"` を 1331 要素に配っているのに、1px も詰まっていない。** 配信している書体が原因で、`@font-face` の family 名は `'Noto Sans JP'` だが、**実体は自社ホストの `NotoSansCJKjp_{regular,medium,bold}.woff2`**（＝Noto Sans CJK JP）。**この書体は `palt` テーブルを持たない**。実測で `font-feature-settings: normal` → `"palt"` の幅が **完全に同一**（実ページの要素で `180px → 180px`、隠し要素で `915.203125px → 915.203125px`）。一方、スタックから Web フォントを外して `sans-serif`（ヒラギノ）で測ると **−12.6%** 詰まる。**つまり Web フォントを入れたことで字詰めが死んでいる**
2. **`letter-spacing` は `rem` 宣言。** `body` の `letter-spacing: 0.1rem` は root 16px に対する **`1.6px` という絶対値**で、全子孫へ降りる（可視 174 要素中 **123 要素が `1.6px`**）。`em` ではないので**文字サイズが変わっても字間は変わらない**。32px の見出しでも 14px の本文でも同じ 1.6px
3. **本文だけが 767px 以下で `3.3vw` の流体になる。** `html` も `body` も 11 幅すべて **16px で完全固定**なのに、`<p>` は 767px で **25.311px**（＝767 × 0.033）、375px で **12.375px** まで動く。**767px で 1 行が 25px の巨大な文字**になり、そこから滑らかに縮む。ルートだけ測ると「完全固定のサイト」に見える
4. **CSS Custom Properties が実質ゼロ。** `total: 2` はどちらも Swiper の既定値で、**自社トークンは 0 個**。色もサイズもすべて実値で書かれている（CORS で読めなかったシートは 0 枚なので、見落としではない）

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **アサヒ飲料ネイビー** | **`#052D85`** | **CTA の面（`新商品一覧` `商品一覧` `ブランドサイト一覧`）。可視 7 / 9 要素**。文字色としても 12 要素（キャンペーン期間の表記）。**フォーカスリングにも使う**（`box-shadow: #052D85 0 0 0 2px`） |
| **ライトブルー** | **`#48C7EF`** | `新商品` バッジの面（可視 5 要素） |
| **ディープネイビー** | **`#27455C`** | セクションの帯（可視 8 要素・両ページ同数） |
| **ブルー（サブ）** | **`#074194`** | カードの面（可視 4 要素） |

### Semantic（意味的な色）

- **商品カテゴリーの面**（下層）: `#004097`（商品ブランドから探す）/ `#009740`（緑）/ `#294798` / `#B41503`（赤）/ `#F6E4C9`（ベージュ）/ `#B4ECFF`（水色）/ `#FFC03F`（黄）。**商品カテゴリーごとに 1 色**で、どれも可視 1 要素
- **フィルタの枠**: `#8AB0D4`（`box-shadow: rgb(138,176,212) 0 0 0 1px` を 6 要素）。`特定保健用食品（トクホ）` などの絞り込みチップ
- **淡い面**: `#CDDCF2`（可視 3 要素）/ `#1FB0F1`（2 要素）/ `#3860BE`（1 要素）

> **CMP（OneTrust）の `#0033FF` はこのサイトの色ではない。** `Cookieの利用に同意する` `すべて許可する` `Apply` に出る青は外部ウィジェットの既定値なので、**パレットに入れない**。

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し・ナビ。**可視 90 / 43 要素。このサイトは純黒を使う**（`#333` 系ではない）
- **Text on Dark** (`#FFFFFF`): 紺面・写真上（可視 56 / 5 要素）
- **Text Secondary** (`#333333`): ヘッダーの小さなリンク（`お客様相談室` `GLOBAL`・下層 3 要素）
- **Text Muted** (`#696969`): CMP の説明文（下層 2 要素）
- **Divider** (`#CFCFCF`): 罫線（可視 21 要素）
- **Surface Gray** (`#F4F4F4`): ニュースリリース・ナビのドロップダウンの面（可視 3 / 2 要素）
- **Border（フィルタ）** (`#BBBBBB`): 絞り込みボタンの枠
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (3/3)`）

> **`html` も `body` も `background-color` が `rgba(0,0,0,0)`（透明）。** 白はさらに下の要素が描いている。**ページ背景を `body` から読むと透明が返る**ので、`#FFFFFF` を明示的に指定する。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の書体）**: **Noto Sans CJK JP**。`@font-face` の family 名は `'Noto Sans JP'` だが、**配信ファイルは自社ホストの `NotoSansCJKjp_regular.woff2` / `_medium.woff2` / `_bold.woff2`**（400 / 500 / 700 の 3 本、すべて `loaded`）
- **Google Fonts は使っていない。** フォントのリクエストは **4 件・すべて `www.asahiinryo.co.jp`**（上記 3 本 ＋ Open Sans）
- **明朝は使っていない。** サイト全体で `font-family` のスタックは **1 本だけ**（可視 174 / 57 要素がすべて同じ）

> **「Noto Sans JP」という名前だが Google Fonts の Noto Sans JP ではない。** Google 配信版は `palt` が効くが、**こちらの Noto Sans CJK JP は `palt` テーブルを持たない**（実測で幅が 1px も変わらない）。**名前だけで判断しない。**

### 3.2 欧文フォント

- **Open Sans**（自社ホスト配信・`OpenSans.woff2`・1 ウェイト）。スタックの**先頭**に置き、ラテン文字と数字を受け持つ
- 和文は Open Sans にグリフが無いので、2 番目の Noto Sans CJK JP に落ちる。**この和欧の二層が設計の本体**

### 3.3 font-family 指定

```css
@font-face { font-family: 'Noto Sans JP'; font-weight: 400;
             src: url('../fonts/NotoSansCJKjp_regular.woff2') format('woff2'); }
@font-face { font-family: 'Noto Sans JP'; font-weight: 500;
             src: url('../fonts/NotoSansCJKjp_medium.woff2') format('woff2'); }
@font-face { font-family: 'Noto Sans JP'; font-weight: 700;
             src: url('../fonts/NotoSansCJKjp_bold.woff2') format('woff2'); }
@font-face { font-family: 'Open Sans';
             src: url('../fonts/OpenSans.woff2') format('woff2'); }

body {
  font-family: 'Open Sans', 'Noto Sans JP',
               "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3",
               "メイリオ", "游ゴシック", "Yu Gothic", Meiryo, sans-serif;
  line-height: 1.66;             /* 無単位。実測 26.56px */
  letter-spacing: 0.1rem;        /* ← rem。root 16px に対して 1.6px の絶対値 */
  font-feature-settings: "palt"; /* ★ 配信書体が対応していないので効かない（3.7 参照） */
}
```

- **スタックは 9 段で、末尾に `sans-serif` がある。** 途中に generic family を挟んでいないので、受け皿が死ぬ事故は起きていない
- ローカル書体の並び（ヒラギノ → メイリオ → 游ゴシック）は Web フォントが落ちたときの保険。**游ゴシックに Medium が入っていない**ので、Windows でこの段まで落ちると Regular で細く出る

### 3.4 文字サイズ・ウェイト階層

| 用途 | font-size | font-weight | 実測 |
|------|-----------|-------------|------|
| ナビ・リンク（既定） | `14px` | 400〜700 | **最多 93 / 21 要素** |
| 本文・お知らせ | `16px` | 400 | 37 / 12 要素 |
| ヘッダーの補助リンク | `12px` | 400 | 14 / 10 要素 |
| セクション見出し | **`32px`** | 400 | 8 / 4 要素。**`letter-spacing: 5px`** |
| バッジの数字 | `11.6667px` | 600 | 6 要素 |

| ウェイト | 用途 | 実測 |
|---------|------|------|
| `400` | 本文・リンク | 76 / 21 要素 |
| `600` | カードの見出し、日付、商品名 | 52 / 11 要素 |
| `700` | グローバルナビ、見出し | 45 / 25 要素 |
| `500` | ほぼ未使用 | **トップに 1 要素だけ** |

> **`600` は `@font-face` に存在しない。** 配信しているのは 400 / 500 / 700 の 3 本なので、**`600` を指定した 52 要素は CSS フォントマッチングで 700（Bold）に解決される**。見た目は `700` と同じ。新規実装では `700` と書けばよい。
> **逆に `500`（Medium）はファイルを読み込んでいるのに 1 要素しか使っていない。**

### 3.5 行間・字間

| 値 | 用途 | 実測 |
|----|------|------|
| `line-height: 1.66` | `body` の既定 | **95 / 32 要素（最多）**。実測 26.56px |
| `line-height: 1` | 見出し・バッジ・ボタン | 59 / 20 要素 |
| `line-height: 1.5` | お知らせ本文 | 10 / 2 要素 |
| `letter-spacing: 0.1rem`（= `1.6px`） | **`body` の既定** | **123 / 37 要素** |
| `letter-spacing: 0.06rem`（= `0.96px`） | ヘッダーの補助リンク | 39 / 10 要素 |
| `letter-spacing: 0.05rem`（= `0.8px`） | ナビの子項目 | 17 要素 |
| `letter-spacing: 5px` | **32px の大見出し** | 8 / 4 要素 |

- **`letter-spacing` は `rem` 宣言＝ルート基準の絶対値。** `0.1rem` は root 16px に対して **1.6px** で、そのまま px として全子孫に降りる。**`em` でも px 直書きでもない第 3 の型**
- そのため **文字サイズが変わっても字間は 1.6px のまま**。14px の本文では 0.114em 相当、32px の見出しでは 0.05em 相当と、**大きい文字ほど字間が詰まって見える**。だから大見出しは `letter-spacing: 5px` と別に指定し直している
- **`line-height` は無単位。** `lineHeightRatio` の 1 未満は 3 件（16px に 15px）だけで、`em` や px の絶対値ではない
- **`line-height: 1` が 59 要素**。見出し・ボタン・バッジは行送りを殺して、`padding` で高さを作る

### 3.6 禁則処理・改行ルール

- `word-break` は `normal`（ブラウザ既定の日本語禁則）。`break-all` も `auto-phrase` も使っていない
- 商品名・キャンペーン名は折り返しに任せる

### 3.7 OpenType 機能

**このサイトで最も重要な節。**

- **`font-feature-settings: "palt"` の宣言は CSS に 3 箇所**：`.RN-2022 body`（＝全体へ継承）・`header`・`footer`。実測は **トップ 955 要素 / 下層 289 要素**（`writing-mode: horizontal-tb` との組で 1331 要素）
- **`.nav-global__list > li` だけ `font-feature-settings: initial` で解除している**（グローバルナビの第 1 階層）
- **ところが 1px も詰まっていない。**

| 測定対象 | `normal` | `"palt"` | 差 |
|---|---|---|---|
| 実ページの要素（12px・`アサヒグループホールディングス`） | `180px` | **`180px`** | **0.0%** |
| `'Noto Sans JP'`（＝自社配信の Noto Sans CJK JP） | `915.203125px` | **`915.203125px`** | **0.0%** |
| `'Open Sans'`（和文はヒラギノにフォールバック） | `835.203125px` | `730px` | −12.6% |
| `sans-serif`（ヒラギノ） | `835.203125px` | `730px` | −12.6% |

- **原因は配信書体。** Noto Sans CJK JP は `palt` テーブルを持たない。エラーも警告も出ず、**黙って無視される**
- **つまり「`palt` が効くサイト」として真似すると別物になる。** 再現するときは、`palt` の宣言はそのまま写してよい（実装の事実）が、**詰まった見た目を期待しない**
- **字間は `palt` ではなく `letter-spacing: 0.1rem` が作っている。** このサイトは詰める方向ではなく**空ける方向**に振れている
- `tnum` / `halt` / 縦組み用の `vpal` `vkrn` は使っていない

### 3.8 縦書き

- 縦組みは使っていない（`writing-mode: vertical-rl` は実測 0 要素）
- このサイトを参照して縦組みを実装しない

---

## 4. Component Stylings

### Buttons

**Primary（一覧への導線・塗りのピル）**

```css
.btn {
  background: #052D85;
  color: #ffffff;
  border: 0;
  border-radius: 30px;          /* ピル。実測 45 / 26 要素 */
  padding: 10px 20px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: 0.1rem;       /* 1.6px */
  box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 5px 1px;
}
.btn:focus-visible {
  box-shadow: #052D85 0 0 0 2px;   /* フォーカスリングもブランド色 */
}
```

- **CTA は紺の塗り＋ピル＋斜めの影**。アウトライン型のボタンはほとんど無い
- `padding: 10px 0` の全幅版もある（`CM一覧`）

### Badges / Chips

```css
.badge--new {
  background: #48C7EF;
  color: #ffffff;
  border-radius: 12px;      /* 実測 5 要素 */
  font-size: 11.6667px;
  font-weight: 600;         /* → 実体は 700 で出る */
  line-height: 1;
}

/* 下層の絞り込みチップ */
.filter-chip {
  background: #ffffff;
  color: #000000;
  border-radius: 30px;
  box-shadow: rgb(138, 176, 212) 0 0 0 1px;  /* 枠を影で描く */
  padding: 0 0 7px;
}
```

> **絞り込みチップの枠は `border` ではなく `box-shadow` の 1px スプレッド。** レイアウトを動かさずに枠を足すための書き方で、実測 6 要素すべてがこれ。

### Inputs

```css
.search {
  border: 1px solid #BBBBBB;
  border-radius: 2px;
  color: #555555;
}
```

### Cards

```css
.card {
  background: #ffffff;
  border-radius: 20px 20px 0 0;   /* 下層の「商品ブランドから探す」等・2 要素 */
  box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 5px 1px;
}
.card--raised { box-shadow: rgba(0, 0, 0, 0.25) 0 0 8px 1px; }
```

---

## 5. Layout Principles

### Spacing Scale

- `gap` の宣言は実測 **0 件**。余白は `margin` / `padding` の px 直書きで作る
- CTA の `padding` は `10px 20px` / `10px 0` / `12px 30px`（CMP）/ `12px 10px`

### Container

```css
.container  { max-width: 1200px; }   /* 実測 5 / 3 要素 */
.container--narrow { max-width: 950px; }  /* 実測 5 / 5 要素 */
.container--article { max-width: 900px; } /* 1 要素 */
.container--fluid  { width: 90%; }        /* 2 要素 */
```

> **コンテナ幅が 3 種類（1200 / 950 / 900px）混在している。** 新規実装では **本文系は `950px`、カード一覧は `1200px`** に寄せる。

### Grid

- トップのヒーローは **`<canvas class="appear">`（1,078,268 px²）**。円形に切り抜いた商品・人物の写真コラージュを JavaScript で描画している。**DOM に要素が無いので、文字もテキストとして存在しない**
- ブランドロゴの一覧は `<picture>` の 137〜138 × 62px を横に並べたグリッド
- `border-radius: 50%` の円が 8 要素（カルーセルの前後ボタン）

---

## 6. Depth & Elevation

**このサイトは影を 6 種類使う。斜め下に落とすのが既定。**

| レベル | 値 | 用途 | 実測 |
|--------|-----|------|------|
| 1（既定） | `rgba(0, 0, 0, 0.1) 2px 2px 5px 1px` | CTA・カード | **65 要素（最多）** |
| 2 | `rgba(0, 0, 0, 0.25) 0px 0px 8px 1px` | 浮かせたカード | 9 要素 |
| 3 | `rgba(0, 0, 0, 0.2) 0px 2px 4px 0px` | カルーセルの前後ボタン | 8 要素 |
| 枠代わり | `rgb(138, 176, 212) 0px 0px 0px 1px` | 絞り込みチップ | 6 要素 |
| フォーカス | `rgb(5, 45, 133) 0px 0px 0px 2px` | CTA のフォーカスリング | 6 要素 |
| 下層 | `rgba(0, 0, 0, 0.2) 2px 2px 5px 1px` | 下層のカード | 4 要素 |

- **`2px 2px`（右下にずれる）が既定。** `0 2px` のような真下の影ではない。**x と y を同じ値にする**
- 下層では同じ形で alpha だけ `0.1 → 0.2` に濃くなる

---

## 7. Do's and Don'ts

### Do（推奨）

- **`letter-spacing` は `body` に `0.1rem` を 1 回だけ書く。** root 16px に対する **1.6px の絶対値**が全子孫へ降りる
- **32px の大見出しには `letter-spacing: 5px` を別に指定する。** 継承の 1.6px のままだと見出しで字間が詰まって見える
- **`line-height` は無単位（本文 `1.66`、見出し・ボタン・バッジ `1`）**
- **文字色は純黒 `#000000`。** `#333` 系に置き換えない
- **CTA は `#052D85` の塗り＋`border-radius: 30px`＋`box-shadow: rgba(0,0,0,.1) 2px 2px 5px 1px`**
- **影は `2px 2px`（右下）。** x と y を同じ値にする
- **フォーカスリングは `box-shadow: #052D85 0 0 0 2px`**
- **ページ背景は `#FFFFFF` を明示する**（`html`/`body` は透明）
- `font-weight` は `400` と `700` の 2 段で組む

### Don't（禁止）

- **`font-feature-settings: "palt"` が効くことを前提に設計しない。** 配信している Noto Sans CJK JP は `palt` テーブルを持たず、**実測 0.0%**。詰まった見た目を期待して字間を広げると、実物より開く
- **Google Fonts の「Noto Sans JP」で代替しない。** Google 配信版は `palt` が効くので、**同じ CSS でも見た目が変わる**。代替するなら `palt` の宣言ごと外す
- **`font-weight: 600` を書かない。** `@font-face` に無いので 700 で出る。はじめから `700` と書く
- **`letter-spacing` を `em` に読み替えない。** `rem` の絶対値が降りるのが設計。`em` にすると見出しで字間が広がってしまう
- **ヒーローのコラージュを DOM で組まない。** 実サイトは `<canvas>` で描いている。**同じ見た目を `<img>` の並びで作ってもよいが、それは実サイトと別の構造**
- **CMP（OneTrust）の青 `#0033FF` をブランド色として使わない**
- **CSS Custom Properties を前提にしない。** 自社トークンは **0 個**（`total: 2` は Swiper の既定値）
- **コンテナ幅を 1 つに決め打ちしない。** 実サイトは 1200 / 950 / 900px が混在している
- **縦組みを実装しない**（実測 0 要素）
- **本文を `vw` で書くのはモバイルだけにする**（8. 参照）

---

## 8. Responsive Behavior

### Breakpoints

| 条件 | 実測 | 変わるもの |
|------|------|-----------|
| `screen and (max-width: 767px)` | **15 箇所（最多）** | 本文が `3.3vw` の流体に |
| `screen and (max-width: 959px)` | 9 箇所 | ナビの折りたたみ |
| `(max-width: 576px)` | 7 箇所 | カードが 1 列に |
| `screen and (min-width: 768px)` | 6 箇所 | デスクトップ |
| `screen and (min-width: 769px)` / `screen and (max-width: 768px)` | 3 箇所ずつ | 768px の扱いが揺れている |

### フォントサイズの調整

- **`html` も `body` も 11 幅（1920 / 1440 / 1200 / 1024 / 834 / 768 / 767 / 414 / 390 / 375 / 374px）すべてで 16px から動かない。** `letter-spacing: 1.6px` も `line-height: 26.56px` も全幅で同じ
- **動くのは本文（`<p>`）だけ。** 767px 以下で `3.3vw` になる：

| 幅 | `<p>` の実測 |
|---|---|
| 768px 以上 | `14px`（固定） |
| **767px** | **`25.311px`** |
| 414px | `13.662px` |
| 390px | `12.87px` |
| 375px | `12.375px` |
| 374px | `12.342px` |

> **768 → 767px で 14px から 25.3px に跳ね上がる（1.8 倍）。** タブレット〜大きめのスマホの帯で本文が極端に大きくなり、そこから 375px に向けて滑らかに縮む。**設計幅は 375px 前後**（375 × 0.033 = 12.375px）。
> **ルートだけ測ると「完全固定のサイト」に見える**ので、要素側を幅を振って測ること。

- **`letter-spacing` が `rem`（＝ルート基準の絶対値）なので、モバイルで本文が 12.375px まで縮んでも字間は 1.6px のまま。** 相対的に **0.129em 相当まで広がる**。モバイルで字間が目立つのはこのため

### タッチターゲット

- CTA は `padding: 10px 20px` ＋ `14px` / `line-height: 1` で高さ約 34px。**モバイルでは上下の padding を 14px 以上にして 44px を確保する**
- 絞り込みチップは `padding: 0 0 7px` と上下が薄い。同上

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ブランド紺:     #052D85（CTA の面・フォーカスリング）
ライトブルー:   #48C7EF（新商品バッジ）／ 帯 #27455C ／ サブ #074194
文字色:         #000000（純黒）／ ヘッダー補助 #333333
罫線:           #CFCFCF ／ 入力枠 #BBBBBB ／ チップ枠 #8AB0D4（box-shadow で描く）
面:             #F4F4F4（ニュース・ドロップダウン）／ #CDDCF2
背景:           #FFFFFF（html/body は透明なので明示する）
書体:           'Open Sans', 'Noto Sans JP', "Hiragino Kaku Gothic ProN", … , sans-serif
                （'Noto Sans JP' の実体は自社配信の Noto Sans CJK JP）
本文:           14px / line-height 1.66 / letter-spacing 0.1rem（= 1.6px の絶対値）
大見出し:       32px / letter-spacing 5px / line-height 1
ウェイト:       400 / 700（600 は書かない。700 で出る。500 はほぼ未使用）
CTA:            #052D85 塗り + border-radius 30px + padding 10px 20px
                + box-shadow rgba(0,0,0,.1) 2px 2px 5px 1px
角丸:           30px（ピル）/ 12px（バッジ）/ 20px 20px 0 0（カード頭）/ 50%（前後ボタン）
影:             2px 2px（右下）が既定。6 種
コンテナ:       1200px（カード一覧）/ 950px（本文）/ 900px
ブレークポイント: 767px（本文だけ 3.3vw の流体になる。768px では 14px 固定）
palt:           宣言はあるが効かない（配信書体が非対応）。詰まった見た目を期待しない
```

### プロンプト例

> アサヒ飲料のデザインで「キャンペーン一覧」ページを作って。
> `body` に `letter-spacing: 0.1rem`（root 16px なので 1.6px の絶対値）と `line-height: 1.66` を書いて継承させる。
> 書体は `'Open Sans', 'Noto Sans JP', "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", "游ゴシック", "Yu Gothic", Meiryo, sans-serif`。
> 文字色は純黒 `#000000`、本文 14px。セクション見出しは 32px / `letter-spacing: 5px` / `line-height: 1`。
> `font-weight` は 400 と 700 だけ（600 は使わない）。
> CTA は `#052D85` の塗り・`border-radius: 30px`・`padding: 10px 20px`・`box-shadow: rgba(0,0,0,.1) 2px 2px 5px 1px`、
> フォーカスは `box-shadow: #052D85 0 0 0 2px`。
> `新商品` バッジは `#48C7EF` / `border-radius: 12px` / 11.6667px。
> コンテナは本文 `950px`、カード一覧 `1200px`。背景は `#FFFFFF` を明示する。
> `@media screen and (max-width: 767px)` で `p { font-size: 3.3vw }`。
> `font-feature-settings: "palt"` は実サイトに合わせて書いてよいが、**詰まらない前提**でレイアウトを組む。
