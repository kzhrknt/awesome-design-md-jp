# DESIGN.md — 加島屋（KASHIMAYA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-25 / 対象: `https://www.kashimaya.jp/`, `https://www.kashimaya.jp/kokoro`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地・濃紺 `#0b0d3b`・**明朝 1 系統**で組む老舗（安政 2 年創業）の食品ブランドサイト。書体は **Web フォントを先頭に置き、OS の明朝へ落とす 5 段スタック**で調達する
- **密度**: ゆったり。コンテナ 1160px、本文の行間は **1.90**。ただし**本文以外は `line-height: normal` のまま**
- **キーワード**: Noto Serif JP ＋ 游明朝 ＋ ヒラギノ明朝の 5 段、**`rem` の基準が 10px**、**字間 0.05em を body に 1 回書いて継承**、見出しだけ 0.1em、濃紺 `#0b0d3b`

**このサイトの核心は5つある。**

1. **和文の明朝を「Web フォント → OS フォント」の 5 段スタックで調達している。** `"Noto Serif JP", YuMincho, "Yu Mincho", "Hiragino Mincho ProN", "serif"` が**トップ 157 要素・下層 67 要素**。Web フォントが落ちても**游明朝（Windows / macOS）→ ヒラギノ明朝（macOS）→ OS 既定の明朝**と段階的に縮退する。→ 3.3 を必ず読むこと
2. **`html { font-size: 10px }`。** `rem` は 10px 基準。`body` も 10px。**16px 基準で `rem` を換算しないこと**（本文は 10px ではなく 16px で書かれている）
3. **字間は body に `0.05em` を 1 回書いて `px` で継承させている。** `0.5px`（= 10px × 0.05）が**可視 221 要素のうち 197 要素**に降ってくる。**子要素で `em` を書き直していない**。見出しだけが例外で `0.1em` を各要素に当てる（14px→1.4px、16px→1.6px、20px→2px）。→ 3.5 を必ず読むこと
4. **`line-height` は `normal` のまま放置されている要素が最多（128 要素）。** 明示的に指定しているのは**本文の 1.90（60 要素）だけ**。「本文だけ行間を開けて、それ以外は書体の既定に任せる」という設計
5. **CSS Custom Properties の自社トークンが 0 個。** 検出された 2 個は WordPress / Gutenberg 由来。**実装値そのものが仕様**

> **`font-feature-settings` は 2 ページとも 0 要素。** `palt` は使っていない。約物のアキは詰めず、**字間 0.05em で全体を少し空ける**方向に振っている。

---

## 2. Color Palette & Roles

**濃紺 1 色で全体を締める。文字色は墨 `#333333`。**

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Brand（濃紺）** | **`#0b0d3b`** | **面 43 要素・文字 21 要素**。ヘッダー右上の帯、グローバルナビ、ヒーロー右の縦組み導線、セクション見出しの文字 |
| **Ink（本文）** | **`#333333`** | **文字 133 要素（トップ）/ 32 要素（下層）**。黒ではなく墨。「Load More」ボタンの面にも使う |
| Link（青） | `#003cb3` | 文字 7 要素。ページャの `Prev` / `Next` / 番号、Instagram アカウント名。**UA 既定の青ではなく指定色** |
| Accent（朱） | `#800000` | 文字 7 要素。「送料無料」ラベル**専用**のマルーン |
| Status（開催中） | 面 `#ff7e00` / 文字 `#ffffff` | 面 2 要素。News タブの「開催中」バッジ |
| Status（終了） | 面 `#666666` / 文字 `#ffffff` | 面 8 要素。「終了」バッジ |
| Surface（下地） | `#f1f1f3` | 面 5 要素。News 一覧・ページャの下地 |
| Surface（薄） | `#f8f8f9` / `#f7f7f8` | 面 各 1〜2 要素。「ピックアップ情報」セクション |
| Surface（抹茶） | `#5d6153` | 面 1 要素。「重要なお知らせ一覧を見る」だけの深緑 |
| Text Muted | `#84859c` | 文字。News の日付（濃紺を薄めた色） |
| Background | `#ffffff` | ページ背景（`body` に直接指定） |

**半分だけ色を変える帯がある。**

```css
/* 「加島屋本店のご案内」「加島屋からのNews」の背景（2 箇所） */
background: linear-gradient(to right,
  #f1f1f3 0%, #f1f1f3 50%, #ffffff 50%, #ffffff 100%);
```

> 画面を**左右で 2 分割して左半分だけ地色を敷く**。グラデーションではなく**色の切り替え**として使っている（`50%` で両端を揃えて段差を作る）。
> **`#800000` は「送料無料」専用。** ボタンにも見出しにも使わない。
> **`#003cb3` はリンク色。** ブラウザ既定の `#0000ee` ではなく、濃紺 `#0b0d3b` に寄せた青を指定している。

---

## 3. Typography Rules

### 3.1 和文フォント

**明朝 1 系統。ゴシックは補助にしか使わない。**

| スタック | 役割 | トップ | 下層 |
|----------|------|--------|------|
| **`"Noto Serif JP", YuMincho, "Yu Mincho", "Hiragino Mincho ProN", "serif"`** | 本文・見出し・ナビ・CTA の全域 | **157 要素** | **67 要素** |
| `"Noto Serif JP", serif` | カレンダー・定休日の表（短縮形） | 41 要素 | 1 要素 |
| `"Noto Sans JP", sans-serif` | News のタブラベル（「百貨店」「ネットショップ」「本店」）とコピーライト | 13 要素 | 1 要素 |
| `Arial` | ページャの数字 | 2 要素 | — |

`document.fonts` の実測（トップ）:

| family | weight | status |
|--------|--------|--------|
| **Noto Serif JP** | **400** | **loaded** |
| **Noto Serif JP** | **700** | **loaded** |
| Noto Serif JP | 600 | **unloaded** |
| **Noto Sans JP** | **400** | **loaded** |
| **Noto Sans JP** | **700** | **loaded** |
| Noto Sans JP | 100 / 300 | unloaded |
| **Sorts Mill Goudy** | **400** | **loaded** |
| Font Awesome 5 Free | 900 | loaded（アイコン） |
| Font Awesome 5 Brands / Free | 400 | unloaded |

> **描画に使えるのは Noto Serif JP の 400 / 700、Noto Sans JP の 400 / 700、Sorts Mill Goudy の 400 だけ。**
> **`Noto Serif JP` の 600 は宣言だけで `unloaded`。** 実装に持ち込まないこと（当てても 700 か 400 に丸められる）。

### 3.2 欧文フォント

**Sorts Mill Goudy（400・Google Fonts の欧文セリフ）。8 要素。**

セクションの英字見出しだけに使う — `Kashimaya Main Store` / `Store Locations` / `News` / `Pickup`。

**本文中の英数字は Noto Serif JP のラテングリフで描かれる。** 欧文のために別スタックを組んでいるのは見出しだけ。

### 3.3 font-family 指定

```css
/* 本文・見出し・ナビ・CTA — サイトのほぼ全域 */
font-family: "Noto Serif JP", YuMincho, "Yu Mincho",
             "Hiragino Mincho ProN", "serif";

/* News のタブラベル・コピーライト */
font-family: "Noto Sans JP", sans-serif;

/* 英字のセクション見出し */
font-family: "Sorts Mill Goudy", serif;
```

**フォールバックの考え方 — Web フォント → OS フォントの縮退を 5 段で書く**

| 順 | 書体 | 効く環境 |
|----|------|----------|
| 1 | `"Noto Serif JP"` | Web フォントが読めた全環境 |
| 2 | `YuMincho` | macOS の游明朝（旧名） |
| 3 | `"Yu Mincho"` | Windows の游明朝 |
| 4 | `"Hiragino Mincho ProN"` | macOS のヒラギノ明朝 |
| 5 | `"serif"` | OS 既定の明朝 |

- **Web フォントが落ちても明朝のまま**であることを、OS 別の明朝を 2 系統（游明朝・ヒラギノ明朝）並べて保証している
- **游ゴシック問題（Windows で細く出る）の明朝版対策**。ただし**ウェイトのマッピング（`@font-face` で Medium を当て直す）はしていない**ので、Windows で `YuMincho` に落ちたときは実サイトより細く見える
- **最後の `"serif"` が引用符付き**（`serif` ではなく `"serif"`）。**これは実サイトの誤り。** 引用符を付けると CSS のジェネリックファミリーではなく「serif という名前のフォント」を探しにいく。**新規実装では引用符を外して `serif` と書くこと**

```css
/* 正しい書き方 */
font-family: "Noto Serif JP", YuMincho, "Yu Mincho",
             "Hiragino Mincho ProN", serif;
```

### 3.4 文字サイズ・ウェイト階層

**`html { font-size: 10px }`・`body { font-size: 10px }`。`rem` は 10px 基準。**

| 役割 | 書体 | size | weight | line-height | letter-spacing |
|------|------|------|--------|-------------|----------------|
| ページ見出し（下層 h1・画像上） | Noto Serif JP | 38px | 400 | normal | 8.36px（**0.22em**） |
| セクション見出し（h2） | Noto Serif JP | 20px | 400 | normal | 2px（**0.1em**） |
| セクション見出し（大） | Noto Serif JP | 28px | 400 | normal | 0.5px（継承） |
| カード見出し・商品名 | Noto Serif JP | 30px | 400 | normal | 0.5px（継承） |
| リード（h3） | Noto Serif JP | 16px | 400 | normal | 1.6px（**0.1em**） |
| 商品名（強調） | Noto Serif JP | 18px | **700** | normal | 0.5px（継承） |
| **本文** | **Noto Serif JP** | **16px** | **400** | **30.4px（1.90）** | **0.5px（継承）** |
| お知らせ本文・定休日 | Noto Serif JP | 14px | 400 | 26.6px（1.90） | 0.5px（継承） |
| グローバルナビ | Noto Serif JP | 14px | 400 | 1.07 / 1.25 | 1.4px（**0.1em**） |
| ユーティリティナビ | Noto Serif JP | 12px | 400 | normal | 0.5px（継承） |
| News の日付 | Noto Serif JP | 15px | 400 | normal | 1.6px（**0.1em**） |
| SNS アカウント・電話番号 | Noto Sans JP | 20px | 400 | 28px（1.40） | 2px（**0.1em**） |
| コピーライト | Noto Sans JP | 10px | 400 | normal | 0.5px（継承） |

**サイズの分布（トップ・可視 221 要素）**: 16px(82) → 14px(66) → 12px(35) → 20px(7) → 30px(7) → 15px(6) → 28px(6)

**ウェイトの分布**

| ページ | 400 | 700 |
|--------|-----|-----|
| トップ | 177 | 44 |
| 下層 | 63 | 6 |

> **700 は「商品名」と「ページャの数字」にしか出ない。** 見出しは全部 400。**太さで階層を作らず、サイズと字間で作る**。
> **`font-weight: 500` / `600` を書かないこと。** `@font-face` に無く、400 か 700 に丸められる。

### 3.5 行間・字間

**行間は「`normal` か 1.90 か」の 2 択。**

| 値 | 実測（トップ） | 用途 |
|----|------|------|
| **`normal`** | **128 要素** | ナビ・見出し・ラベル・CTA。**書体の既定に任せる** |
| **1.90** | **60 要素** | **本文・リード・お知らせ本文**（16px→30.4px、14px→26.6px） |
| 1.70 | 6 要素 | セクションのリード文 |
| 1.25 / 1.07 | 各 8 要素 | グローバルナビの 2 行組 |
| 0.83 | 5 要素 | フッターの細かいリンク |

```css
/* body の実測値 */
html { font-size: 10px; }
body {
  font-size: 10px;
  line-height: normal;    /* 明示していない */
  letter-spacing: 0.5px;  /* body の 10px に 0.05em → 0.5px が継承される */
  color: #333333;
  background: #ffffff;
}

/* 本文だけ行間を開ける */
p { font-size: 16px; line-height: 1.9; }
```

**字間は「継承の 0.5px」と「見出しの 0.1em」の 2 系統。**

| 系統 | 値 | 実測 | 書き方 |
|------|----|------|--------|
| **全域（継承）** | **0.5px** | **197 要素** | **body に 1 回書くだけ。子要素では書き直さない** |
| 見出し・ナビ・日付 | **0.1em** | 1.4px(15) / 1.6px(5) / 2px(2) | サイズに比例（14px→1.4px、16px→1.6px、20px→2px） |
| 下層の h1 | **0.22em** | 8.36px(1) | 38px の大見出しだけ極端に空ける |
| 縦組みリンク | **0.05em** | 0.95px(1) | 19px の縦組み |

> **`0.5px` を `em` に読み替えないこと。** これは **body の 10px に `0.05em` を書いた結果の px** が、サイズの違う子要素にそのまま降りている値。16px の本文でも 12px のナビでも **0.5px のまま**。**子要素で `letter-spacing: 0.05em` と書き直すと、16px では 0.8px になって実サイトと変わる。**
> 見出しの `0.1em` は逆に**各要素に当てている**（サイズに比例して px が変わる）。**2 つの流儀が同居している。**

### 3.6 禁則処理・改行ルール

- お知らせの見出しは**折り返す前提**。`white-space: nowrap` は使っていない
- 商品名は**行を分けず 1 行**（30px / `line-height: normal`）
- 行末揃えは **`text-align: left`**。両端揃えは使っていない

### 3.7 OpenType 機能

**`font-feature-settings` は 2 ページとも 0 要素。`palt` も `tnum` も使っていない。**

約物（「」・、。）は**全角のまま**出る。明朝の字面に対して、**字間 0.05em を全体に足す**ことで詰まりすぎを防いでいる。

> **`palt` を足さないこと。** 約物を詰めると、この「少し空いた」字面が崩れる。

### 3.8 縦書き

**縦組みは 2 要素だけ。トップのヒーロー右の導線に使っている。**

```css
/* 「加島屋ネットショップはこちらから」 */
.vertical-cta {
  writing-mode: vertical-rl;
  font-family: "Noto Serif JP", YuMincho, "Yu Mincho",
               "Hiragino Mincho ProN", serif;
  font-size: 19px;
  line-height: normal;
  letter-spacing: 0.95px;  /* 0.05em */
  color: #ffffff;
  background: #0b0d3b;
}
```

- **`a` 要素そのものに `writing-mode: vertical-rl` を当てている**（外側のコンテナではない）
- 下層ページには縦組みが**無い**。**トップの導線だけ**の演出
- **外部ウィジェット由来ではない**（`classes` が空の素の `a`）。本物の縦組み

---

## 4. Component Stylings

### Buttons

**面の CTA は濃紺と墨の 2 種。`border-radius` は基本 0。**

```css
/* Primary — ヘッダー／ナビの濃紺（「商品カタログ」「創業170周年」など） */
.btn-primary {
  font-family: "Noto Serif JP", YuMincho, "Yu Mincho",
               "Hiragino Mincho ProN", serif;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;  /* 継承値 */
  color: #ffffff;
  background: #0b0d3b;
  border: 0;
  border-radius: 0;       /* 角は丸めない */
  box-shadow: none;
}

/* Secondary — 「Load More」 */
.btn-more {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 19.5px;    /* 1.50 */
  letter-spacing: 0.5px;
  color: #ffffff;
  background: #333333;
  border: 0;
  border-radius: 4px;
}
```

> **CTA は明朝、「Load More」だけゴシック。** UI の操作系はゴシックに寄せている。

### Badges / Chips

```css
/* 開催中 */
.badge-open {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.4px;   /* 0.1em */
  color: #ffffff;
  background: #ff7e00;
  border: 1px solid #ff7e00;
  border-radius: 0;
}

/* 終了 */
.badge-closed {
  background: #666666;
  border: 1px solid #666666;
  color: #ffffff;
  border-radius: 0;
}

/* 送料無料 */
.badge-freeship {
  color: #800000;
  background: transparent;
}
```

### Cards

```css
/* トップのカードは影なし・罫なし */
.card { background: #ffffff; border: 0; border-radius: 0; box-shadow: none; }

/* 下層（加島屋の心）の商品カードだけ薄い影を敷く */
.card-product {
  box-shadow: #cccccc 0 0 3px 0;   /* 実測 6 要素・ぼかし 3px */
  border-radius: 0;
}
```

> **影は下層の商品カードだけ（1 種・6 要素）。トップは 0 種。** 黒ではなく **`#cccccc`** で、ごく淡い。

### Inputs

フォーム要素は 2 ページとも露出していない。実装するなら**罫は `1px solid #0b0d3b`・`border-radius: 0`・フォーカスリングは `#003cb3`** で揃える。

---

## 5. Layout Principles

### Container

| 値 | 実測 | 用途 |
|----|------|------|
| **1160px** | トップ 2 箇所 | 標準コンテナ |
| **900px** | トップ・下層 各 2 箇所 | 読み物（「加島屋の心」の本文） |
| 1280px | 下層 2 箇所 | 下層のワイド帯 |
| 100% | 2 箇所 | ヒーロー・全幅の帯 |

> **読み物は 900px に絞る。** 本文 16px・行間 1.90 で、1 行が長くなりすぎないようにしている。

### Spacing Scale

`gap` プロパティは使っていない（実測 0 件）。**`margin` / `padding` で組む旧来型のレイアウト**。

### Grid

- News は**タブ切り替え**（すべて / ネットショップ / 本店 / 百貨店 / その他）。タブラベルだけ `Noto Sans JP`
- 「加島屋本店のご案内」は**左右 2 分割**（`linear-gradient` で左半分に `#f1f1f3` を敷く）

---

## 6. Depth & Elevation

**トップは `box-shadow` 0 種。下層に 1 種だけある。**

| 値 | 実測 | 用途 |
|----|------|------|
| `#cccccc 0 0 3px 0` | 下層 6 要素 | 商品カード |

層は次の 3 つで作る。

1. **面色の差** — `#ffffff` / `#f1f1f3` / `#f8f8f9` / `#0b0d3b`
2. **左右分割のグラデーション** — 帯の左半分だけ `#f1f1f3`
3. **余白** — コンテナ 1160px（読み物は 900px）

> **影を黒で書かないこと。** 実測は `#cccccc`（不透明のグレー）で、`rgba(0,0,0,α)` ではない。

### Border Radius

| 値 | 用途 |
|----|------|
| **0** | CTA・バッジ・カード・画像（**既定**） |
| 4px | 「Load More」ボタン |
| 5px | ヒーローのカルーセル操作ボタン |

---

## 7. Do's and Don'ts

### Do（推奨）

- **明朝 1 系統で組む。** `"Noto Serif JP", YuMincho, "Yu Mincho", "Hiragino Mincho ProN", serif`
- **`html { font-size: 10px }` を前提に `rem` を書く**
- **字間は body に 1 回だけ書いて継承させる**（`0.5px`）。見出しだけ `0.1em` を各要素に
- **行間は本文 1.90、それ以外は `normal`**
- **`font-weight` は 400 と 700 だけ**。見出しは 400
- **`border-radius: 0` を既定にする**
- **読み物のコンテナは 900px に絞る**
- 濃紺 `#0b0d3b` を面に、墨 `#333333` を文字に

### Don't（禁止）

- **`"serif"` と引用符付きで書かない。** 実サイトはそう書いているが誤り。`serif` はジェネリックファミリーなので引用符を外す
- **`font-weight: 500` / `600` を書かない。** `@font-face` に無く（Noto Serif JP の 600 は `unloaded`）、400 か 700 に丸められる
- **`letter-spacing: 0.05em` を子要素に書き直さない。** body から継承した `0.5px` が正しい値。16px の要素に `0.05em` を書くと 0.8px になって実サイトと変わる
- **`palt` を足さない。** 実測 0 要素
- **影を黒で書かない。** 実測は `#cccccc 0 0 3px`。しかもトップには無い
- **`#800000` を CTA に使わない。** 「送料無料」専用
- **角を丸めない。** 既定は `border-radius: 0`
- **縦組みを下層に持ち込まない。** トップのネットショップ導線 1 箇所だけの演出

---

## 8. Responsive Behavior

### Breakpoints

| メディアクエリ | 実測 | 出どころ |
|----------------|------|----------|
| `(min-width: 600px)` | 7 件 | WordPress / Gutenberg 既定 |
| `(min-width: 782px)` | 5 件 | WordPress 管理バー |
| **`(max-width: 480px)`** | **3 件** | **自前の主軸**。スマートフォン |
| `(max-width: 640px)` / `(max-width: 800px)` | 各 1 件 | 自前の部分調整 |
| `(prefers-reduced-motion: reduce)` | 2 件 | カルーセルの自動再生を止める |

> **自前のブレークポイントは 480 / 640 / 800px。** `min-width: 600px` と `782px` は WordPress のテーマが持ち込んだもので、**このサイトの設計ではない**。新規実装では **480px を主軸**に置く。

### タッチターゲット

ヘッダーのユーティリティナビは 12px の文字にパディングを足して面積を確保している。**文字サイズを上げずにパディングで作る。**

### フォントサイズの調整

480px 以下でも本文 16px は保つ。縮めるのは見出し（38px / 30px / 28px）の方。

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体:
  本文・見出し・ナビ・CTA … "Noto Serif JP", YuMincho, "Yu Mincho",
                             "Hiragino Mincho ProN", serif   （400 / 700）
  タブラベル・Load More   … "Noto Sans JP", sans-serif        （400 / 700）
  英字セクション見出し     … "Sorts Mill Goudy", serif         （400）
色:
  ブランド #0b0d3b（面・文字）／ 本文 #333333 ／ リンク #003cb3
  送料無料 #800000 ／ 開催中 #ff7e00 ／ 終了 #666666
  下地 #f1f1f3・#f8f8f9 ／ 背景 #ffffff
ルート: html / body ともに font-size: 10px（rem は 10px 基準）
字間:  body に 0.05em → 0.5px を全域に継承／見出しだけ 0.1em を各要素に
行間:  本文 1.90 ／ それ以外は normal
太さ:  400 と 700 だけ（500・600 は書かない）
形:    radius 0（既定）／ 影はトップに無し・下層のカードのみ #cccccc 0 0 3px
       コンテナ 1160px（読み物は 900px）／ BP 480px
```

### プロンプト例

> 加島屋の DESIGN.md に従って、商品一覧ページを作ってください。
> 書体は `"Noto Serif JP", YuMincho, "Yu Mincho", "Hiragino Mincho ProN", serif` の 400 で統一し、商品名だけ 700 にしてください。
> `html` と `body` の `font-size` は 10px にして、`letter-spacing: 0.05em` は **body に 1 回だけ**書いてください（子要素では書き直さない）。
> セクション見出しには `letter-spacing: 0.1em` を各要素に当ててください。
> 行間は本文だけ 1.9、それ以外は `normal` のままにしてください。
> CTA は `#0b0d3b` の面・白文字・`border-radius: 0`。**影は使わないでください。**
> コンテナは 1160px、読み物は 900px、ブレークポイントは 480px です。

### 検証チェックリスト

- [ ] `font-family` の末尾が `serif`（引用符なし）になっているか
- [ ] `font-weight` が 400 / 700 だけか（500・600 を書いていないか）
- [ ] `letter-spacing` を body に 1 回だけ書いているか（子要素で `em` を書き直していないか）
- [ ] 見出しの `letter-spacing` が `0.1em` か
- [ ] 本文の `line-height` が 1.9 で、それ以外が `normal` か
- [ ] `html { font-size: 10px }` になっているか
- [ ] `border-radius` が 0 か
- [ ] 影を黒で書いていないか（`#cccccc 0 0 3px`・下層のみ）
- [ ] `palt` を足していないか（実測 0 要素）
