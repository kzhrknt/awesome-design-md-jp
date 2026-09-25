# DESIGN.md — MOA美術館（MOA MUSEUM OF ART）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-25 / 対象: `https://www.moaart.or.jp/`, `https://www.moaart.or.jp/concept/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地・墨 `#212121`・**3 書体の役割分担**で組む美術館サイト。和文の見出しとナビは **Zen Old Mincho**、本文は **秀英角ゴシック銀**、数字と欧文ラベルは **Cardo**。装飾は使わず、**影を 1 つも使わない**
- **密度**: ゆったり。コンテナ 1280px、本文の行間は **1.60〜1.80**、ナビ・ラベルの行間は **1.00**
- **キーワード**: Zen Old Mincho、秀英角ゴシック銀、Cardo、**字間は 0.05em と 0.025em の 2 値だけ**、影ゼロ、radius 2px

**このサイトの核心は5つある。**

1. **和文に書体が 2 つある。明朝とゴシックを役割で分けている。** `"Zen Old Mincho", serif` が**トップ 121 要素・下層 54 要素**（ナビ・見出し・ラベル・CTA）、`dnp-shuei-gothic-gin-std, sans-serif` が**トップ 26 要素・下層 57 要素**（本文・長文）。**下層に行くほどゴシックが増える**のは、本文量が増えるから。→ 3.1 を必ず読むこと
2. **数字と欧文ラベルは `Cardo`（欧文セリフ）に逃がしている。** トップ 69 要素。開館日「9.25」、時刻「9:30-16:30」、セクションラベル「exhibition」「concept」「history and founder」。**和文書体のラテングリフを使っていない**
3. **字間は `0.05em` と `0.025em` の 2 値しかない。しかも `em` を各要素に当てている。** 14px→0.7px、12px→0.6px、20px→1px、24px→1.2px、40px→2px と**サイズに比例して px が変わる**（すべて 0.05em）。本文系だけ 0.025em（16px→0.4px、14px→0.35px）。**body から px を継承させる設計ではない**
4. **`font-weight` は 400 と 500 の 2 段だけ。`700` を当ててよい書体が無い。** Zen Old Mincho は `document.fonts` で **400 と 500 だけが `loaded`**。それなのに UA 既定の `h1` / `h3` が `700` のまま残っており、**そこはブラウザの合成太字で描かれている**。→ 3.4 を必ず読むこと
5. **CSS Custom Properties の自社トークンが 0 個。** 検出された 60 個はすべて WordPress / Gutenberg 由来（`--wp--preset--*` 49 個、WordPress admin 11 個）。**実装値そのものが仕様**

> **`font-feature-settings` は 2 ページとも 0 要素、縦組みも 0 要素。** `palt` も使っていない。和文組版に手を入れているのは「字間 0.05em」と「行間 1.6 / 1.8」だけ。**約物は詰まっていない。**

---

## 2. Color Palette & Roles

**文字色は実質 2 色（墨と白）。アクセントは青 1 色。**

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Ink（本文・見出し・ナビ）** | **`#212121`** | **文字 128 要素（トップ）/ 67 要素（下層）**。黒ではなく墨。面としても 79 要素（ヘッダー帯・フッター） |
| **Accent（青）** | **`#0267cb`** | **面 32 要素・文字 10 要素**。チケット CTA の面、「本日開館」「開催予定」の文字 |
| Alert（重要バッジ） | 文字 `#ff3f5f` / 面 `#ffecef` | 各 4 要素。お知らせ一覧の「重要」ラベル**専用** |
| Surface（面・下地） | `#f4f3f1` | 面 2 要素。「exhibition」「pick up contents」セクションの下地 |
| Surface（姉妹館） | `#f2f8f1` | 面 1 要素。箱根美術館への導線カードだけの薄緑 |
| Divider / Muted 面 | `#e6e6e6` | 面 31 要素。カレンダーの日付マス、レストラン一覧の区切り |
| Sub 面 | `#5c5c5c` | 面 26 要素。フッターのサブメニュー帯 |
| Text Muted | `#929292` | 文字 10 要素。お知らせの日付 |
| Text Faint | `#cccccc` | 文字 2 要素。プライバシーポリシー・コピーライト |
| Background | `#ffffff` | ページ背景（`viewportTopBySample` 2/2 で確定・下層も 3/3 で白） |

> **トップのファーストビューは全画面の動画**だが、`heroCovered: false`・`canvasUnpainted: true`。**地色は白**で、動画はヒーロー要素の中だけ。**ページ全体を黒地だと思って組まないこと。**
> **`#ff3f5f` は「重要」バッジ専用。** CTA にも見出しにも使われていない。**赤を導線に使わない。**

---

## 3. Typography Rules

### 3.1 和文フォント

**明朝とゴシックを役割で分けている。**

| 書体 | 役割 | トップ | 下層 |
|------|------|--------|------|
| **Zen Old Mincho**（Google Fonts） | ナビ・見出し・ラベル・CTA・カード見出し | **121 要素** | 54 要素 |
| **dnp-shuei-gothic-gin-std**（秀英角ゴシック銀 / Adobe Fonts） | 本文・長文・リンク一覧 | 26 要素 | **57 要素** |

**本文量の多い下層ページでは、ゴシックが明朝を逆転する。** 「読ませる文章はゴシック、見せる文字は明朝」という切り分け。

`document.fonts` の実測（2 ページとも同じ）:

| family | weight | status |
|--------|--------|--------|
| **Zen Old Mincho** | **400** | **loaded** |
| **Zen Old Mincho** | **500** | **loaded** |
| **dnp-shuei-gothic-gin-std** | **normal** | **loaded** |
| **dnp-shuei-gothic-gin-std** | **500** | **loaded** |
| **Cardo** | **400** | **loaded** |
| Crimson Text | 400 | unloaded |
| Inter | 400 / 500 | unloaded |
| swiper-icons | 400 | unloaded |

> **描画に使えるのは Zen Old Mincho の 400/500、秀英角ゴシック銀の normal/500、Cardo の 400 だけ。**
> **Crimson Text と Inter は宣言だけで `unloaded`。** 実装に持ち込まないこと。
> **700 の @font-face はどの書体にも無い。** 3.4 の「合成太字」の根拠になる。

### 3.2 欧文フォント

**Cardo（400・Google Fonts の欧文セリフ）。トップ 69 要素・下層 7 要素。**

使いどころが明確に決まっている。

- 開館日の大きな数字 — `9.25`（30px）
- 開館時刻 — `9:30-16:30`（16px）
- セクションラベル — `exhibition` / `event` / `pick up` / `information`（40px）
- 下層のページラベル — `concept`（40px）/ `history and founder`（24px）
- 言語切替の `language`（10px）

**和文書体のラテングリフに任せていない。** 数字と欧文は必ず Cardo に振る。

### 3.3 font-family 指定

```css
/* 見出し・ナビ・ラベル・CTA — トップのほぼ全域 */
font-family: "Zen Old Mincho", serif;

/* 本文・長文 — 下層の主役 */
font-family: dnp-shuei-gothic-gin-std, sans-serif;

/* 数字・欧文ラベル */
font-family: Cardo, serif;
```

**フォールバックの考え方**

- **和文のローカルフォント名を一切書いていない。** Zen Old Mincho が落ちたら `serif`（OS 既定の明朝）、秀英角ゴシック銀が落ちたら `sans-serif` に直行する
- Windows / macOS の書き分け（游ゴシック問題）を**やっていない**。Web フォント 3 本に寄せきる方針
- **秀英角ゴシック銀は Adobe Fonts のドメインライセンス**なので、他ドメインでは再現できない。代替するなら**同じモリサワ系の `Zen Kaku Gothic New`** が字形の印象が近い（`Noto Sans JP` はふところが広く別物になる）

### 3.4 文字サイズ・ウェイト階層

**`html { font-size: 16px }`（既定のまま）。`rem` の基準を変えていない。**

| 役割 | 書体 | size | weight（CSS 宣言） | **実際に描画される weight** | line-height | letter-spacing |
|------|------|------|------|------|-------------|----------------|
| ロゴ（h1） | Zen Old Mincho | 32px | **700** | **400 の合成太字** | 1.10 | 0.4px（0.0125em） |
| 欧文セクションラベル | Cardo | 40px | 400 | 400 | 1.20 | 2px（**0.05em**） |
| 開館日の数字 | Cardo | 30px | 400 | 400 | 1.00 | 1.5px（**0.05em**） |
| セクション見出し（h2） | Zen Old Mincho | 24px | 500 | 500 | 1.60 | 1.2px（**0.05em**） |
| 小見出し（h3・下層） | Zen Old Mincho | 20px | 500 | 500 | 1.60 | 1px（**0.05em**） |
| 展覧会タイトル | Zen Old Mincho | 20px | 500 | 500 | 1.20 | 1px（**0.05em**） |
| カード見出し | Zen Old Mincho | 24px | 500 | 500 | 1.60 | 1.2px（**0.05em**） |
| **本文** | **秀英角ゴシック銀** | **16px** | **400** | **400** | **28.8px（1.80）** | **0.4px（0.025em）** |
| リスト本文・リンク | 秀英角ゴシック銀 | 14px | 400 | 400 | 22.4px（1.60） | 0.35px（**0.025em**） |
| グローバルナビ | Zen Old Mincho | 14px | 500 | 500 | 1.00 | 0.7px（**0.05em**） |
| CTA・バッジ・補助 | Zen Old Mincho | 12px | 500 | 500 | 1.00 | 0.6px（**0.05em**） |
| 言語切替 | Cardo | 10px | 400 | 400 | 1.10 | 0.5px（**0.05em**） |

**サイズの分布（トップ・可視 216 要素）**: 14px(69) → 12px(51) → 18px(38) → 20px(15) → 24px(12) → 40px(10) → 10px(9) → 16px(5)

**ウェイトの分布**

| ページ | 400 | 500 |
|--------|-----|-----|
| トップ | 126 | 90 |
| 下層 | 64 | 54 |

> **`700` の実測は 0 要素。** `h1`（32px）と `h3`（18.72px）に UA 既定の `bold` が残っているが、**`@font-face` に 700 が無いのでブラウザが太らせているだけ**。新規実装では **`font-weight` は 400 と 500 しか書かない**。太さで階層を作らず、**サイズと書体で作る**。

### 3.5 行間・字間

**行間は「1.00 / 1.20 / 1.60 / 1.80」の 4 値。**

| 値 | 実測（トップ） | 用途 |
|----|------|------|
| **1.00** | **109 要素** | ナビ・ラベル・CTA・日付。**1 行しか入らない要素は行間を潰す** |
| **1.60** | **84 要素** | 本文・カード本文・リード |
| 1.20 | 20 要素 | 展覧会タイトル・CTA の 2 行組 |
| 1.80 | 2 要素 | 長文の導入（「相模灘を望む高台に建つMOA美術館…」） |

```css
/* body の実測値 */
body {
  font-size: 16px;
  line-height: 28.8px;   /* 1.8 */
  letter-spacing: 0.4px; /* 0.025em */
}
```

**字間は 2 値だけ。`em` で各要素に当てる。**

| 系統 | 値 | 実測 | 当たる先 |
|------|----|------|----------|
| **見出し・ナビ・ラベル** | **0.05em** | 0.7px(53) / 0.6px(49) / 1.2px(11) / 1px(15) / 0.5px(9) / 0.8px(9) / 2px | Zen Old Mincho と Cardo の全域 |
| **本文** | **0.025em** | 0.4px / 0.35px(17) | 秀英角ゴシック銀の本文・リンク |

> **`px` に読み替えないこと。** 14px なら 0.7px、24px なら 1.2px と**サイズに比例して変わる**。つまり各要素に `letter-spacing: 0.05em` を書いている（body から px を継承させる設計ではない）。
> 例外は `normal`（30 要素）— カレンダーの日付マスの数字だけ字間を外している。

### 3.6 禁則処理・改行ルール

- 見出しの改行は **`<br>` ではなく要素を分けている**（「自然とアートが響きあう」「海の見える美術館」が別要素で、行間 1.60 が効く）
- 長い展覧会名は折り返す前提。`white-space: nowrap` は使っていない
- 行末揃えは **`text-align: left`**。両端揃えは使っていない

### 3.7 OpenType 機能

**`font-feature-settings` は 2 ページとも 0 要素。`palt` も `tnum` も使っていない。**

- 約物のアキは**詰めていない**。明朝の「、。「」（）」は全角のまま出る
- 数字は Cardo に振ることで字幅を揃えている。**`tnum` の代わりに書体を変える**という解き方

> **`palt` を足さないこと。** このサイトの余裕のある字面は「字間 0.05em ＋ 約物は全角のまま」で作られている。詰めると別物になる。

### 3.8 縦書き

**縦組みは 2 ページとも 0 要素。**

トップのファーストビュー左下に「SCROLL」が縦に並んで見えるが、これは `writing-mode` ではなく**1 文字ずつ要素を分けて積んだもの**。`vertical-rl` は使っていない。

---

## 4. Component Stylings

### Buttons

**面の CTA は 1 種類（青）。それ以外は下地なしのテキストリンク。**

```css
/* Primary — チケット CTA（「オンラインチケット」「イベントチケット」） */
.btn-primary {
  font-family: "Zen Old Mincho", serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;      /* 1.00 */
  letter-spacing: 0.6px;  /* 0.05em */
  color: #ffffff;
  background: #0267cb;
  border: 1px solid #0267cb;
  border-radius: 2px;
  box-shadow: none;       /* 影は使わない */
}

/* Secondary — 枠線だけ（「メンバーシップ」） */
.btn-secondary {
  font-family: "Zen Old Mincho", serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #0267cb;
  background: transparent;
  border: 1px solid #0267cb;
  border-radius: 2px;
}

/* Tertiary — 一覧リンク（「お知らせ一覧」「展覧会情報一覧」） */
.link-list {
  font-family: dnp-shuei-gothic-gin-std, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;    /* 1.60 */
  letter-spacing: 0.35px; /* 0.025em */
  color: #212121;
  background: transparent;
  border-radius: 0;
}
```

> **`border-radius` は 2px。** ピル型でも直角でもない。**丸めすぎないこと。**
> **一覧リンクだけ書体が秀英角ゴシック銀に変わる。** CTA は明朝、読み進める導線はゴシック。

### Badges / Chips

```css
/* 重要（お知らせ一覧） */
.badge-important {
  font-family: "Zen Old Mincho", serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: #ff3f5f;
  background: #ffecef;
  border: 0;
  border-radius: 2px;
}

/* 開催中 / 開催予定（展覧会カード） */
.badge-status {
  font-family: "Zen Old Mincho", serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;   /* 0.05em */
  color: #0267cb;        /* 開催予定 */
  background: transparent;
}
```

### Cards

```css
.card {
  background: #ffffff;
  border: 0;
  border-radius: 0;
  box-shadow: none;      /* 影は 0 種。カードは罫と余白だけで分ける */
}

/* 姉妹館（箱根美術館）への導線だけ薄緑の面を敷く */
.card-sister {
  background: #f2f8f1;
  border-radius: 4px;
}
```

### Inputs

フォーム要素はトップ・下層とも露出していない。実装するなら**ボタンに合わせて `border-radius: 2px`・`border: 1px solid #212121`・フォーカスリングは `#0267cb`** で揃える。

---

## 5. Layout Principles

### Container

| 値 | 実測 | 用途 |
|----|------|------|
| **1280px** | **トップ 13 箇所・下層 6 箇所** | 標準コンテナ |
| 1360px | 3 箇所 | 展覧会カードの横並びなど、少し広く取る帯 |

### Spacing Scale

`gap` の実測値: **20 / 26 / 30 / 40 / 80 / 100px**。

- カラム間（`normal 40px` 3 箇所、`normal 80px` 2 箇所、`normal 100px` 2 箇所）
- 行間（`40px normal` 2 箇所、`30px normal` 2 箇所）

**20px を最小単位とする 10 の倍数**で組む。半端な値を使っていない。

### Grid

- 展覧会・お知らせは**横並びのカード**。`gap: 40px` 前後
- フッターは多段。サブメニュー帯（`#5c5c5c`）とコピーライト帯（`#212121`）の 2 層

---

## 6. Depth & Elevation

**`box-shadow` は 2 ページとも 0 種類。影を 1 つも使っていない。**

層は次の 3 つで作る。

1. **面色の差** — `#ffffff` / `#f4f3f1` / `#e6e6e6` / `#5c5c5c` / `#212121`
2. **余白** — コンテナ 1280px と `gap: 40〜100px`
3. **罫** — CTA の `1px solid`

> **影を足さないこと。** カードを浮かせたくなったら**面色を `#f4f3f1` に変える**。

### Border Radius

| 値 | 実測 | 用途 |
|----|------|------|
| **2px** | **22 要素** | CTA・バッジ |
| 4px | 2 要素 | 開館情報パネル・姉妹館カード |
| 0 | それ以外すべて | 画像・カード・セクション |

---

## 7. Do's and Don'ts

### Do（推奨）

- **和文を明朝とゴシックで役割分担する。** 見せる文字（ナビ・見出し・ラベル・CTA）は Zen Old Mincho、読ませる文章は秀英角ゴシック銀
- **数字と欧文は Cardo に振る。** 和文書体のラテングリフを使わない
- **字間は `0.05em`（見出し・ナビ）と `0.025em`（本文）の 2 値だけ。`em` で各要素に書く**
- **`font-weight` は 400 と 500 だけ書く。** 階層はサイズと書体で作る
- **行間は 1 行要素なら 1.00、本文なら 1.60、長文なら 1.80**
- **`border-radius: 2px`**、**影なし**、コンテナ **1280px**

### Don't（禁止）

- **`font-weight: 700` を書かない。** `@font-face` に 700 が無く、ブラウザの合成太字になる（実サイトの `h1` / `h3` がそうなっている。**真似しないこと**）
- **`palt` を足さない。** 実測 0 要素。約物は全角のまま出すのがこのサイトの字面
- **`letter-spacing` を px で固定しない。** サイズに比例させる（`0.05em`）のが設計
- **影を足さない。** 実測 0 種
- **赤 `#ff3f5f` を CTA に使わない。** 「重要」バッジ専用
- **ページ全体を黒地で組まない。** トップのファーストビューが動画で暗いだけで、**地色は `#ffffff`**
- **`Crimson Text` / `Inter` を使わない。** 宣言だけで `unloaded`
- **`Noto Sans JP` で秀英角ゴシック銀を代替しない。** ふところが広く印象が変わる。代替するなら `Zen Kaku Gothic New`

---

## 8. Responsive Behavior

### Breakpoints

| メディアクエリ | 実測 | 意味 |
|----------------|------|------|
| **`(max-width: 768px)`** | **84 件** | **主軸**。タブレット以下 |
| `(any-hover: hover)` | 25 件 | ホバーできるデバイスにだけ hover を当てる |
| `(max-width: 1320px)` | 4 件 | コンテナ 1280px ＋ 左右余白の折り返し点 |
| `(max-width: 1440px)` / `(max-width: 1139px)` / `(max-width: 540px)` | 各 2 件 | 部分調整 |
| `(prefers-reduced-motion: no-preference)` | 2 件 | アニメーションは**許可されたときだけ**動かす |

> **`(any-hover: hover)` でホバーを囲っているのが特徴。** タッチデバイスでホバー状態が貼り付くのを避けている。**新規実装でも `:hover` は `@media (any-hover: hover)` の中に書く。**

### タッチターゲット

チケット CTA は 12px の文字に上下パディングを足して 44px 相当を確保している。**文字サイズを上げずに、パディングで面積を作る。**

### フォントサイズの調整

768px 以下では本文 16px を保ったまま、見出し（24px / 40px）を縮める。**本文は縮めない。**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体:
  見出し・ナビ・ラベル・CTA … "Zen Old Mincho", serif      （400 / 500 のみ）
  本文・長文              … dnp-shuei-gothic-gin-std, sans-serif （normal / 500）
  数字・欧文ラベル         … Cardo, serif                  （400）
色:
  本文/面 #212121 ／ アクセント #0267cb ／ 重要 文字#ff3f5f・面#ffecef
  下地 #f4f3f1 ／ 罫・マス #e6e6e6 ／ サブ帯 #5c5c5c ／ 日付 #929292 ／ 背景 #ffffff
字間:  見出し・ナビ 0.05em ／ 本文 0.025em（px ではなく em で各要素に書く）
行間:  1行要素 1.00 ／ 本文 1.60 ／ 長文 1.80
太さ:  400 と 500 だけ（700 は書かない）
形:    radius 2px ／ 影なし ／ コンテナ 1280px ／ gap 20〜100px
```

### プロンプト例

> MOA美術館の DESIGN.md に従って、企画展の一覧ページを作ってください。
> 見出しとナビは `"Zen Old Mincho", serif` の 500、本文は `dnp-shuei-gothic-gin-std, sans-serif`（無ければ `Zen Kaku Gothic New`）の 400 で組んでください。
> 開催期間の数字と「exhibition」のような欧文ラベルは `Cardo, serif` にしてください。
> 字間は見出し・ナビに `letter-spacing: 0.05em`、本文に `0.025em` を **em で各要素に**書いてください。
> `font-weight` は 400 と 500 しか使わないでください（700 は合成太字になります）。
> チケットの CTA は `#0267cb` の面・白文字・`border-radius: 2px`。**影は使わないでください。**
> コンテナは 1280px、ブレークポイントは 768px、`:hover` は `@media (any-hover: hover)` の中に書いてください。

### 検証チェックリスト

- [ ] `font-weight: 700` を書いていないか（400 / 500 のみ）
- [ ] `letter-spacing` を px で固定していないか（`0.05em` / `0.025em` を em で）
- [ ] 本文に明朝を使っていないか（本文はゴシック）
- [ ] 数字・欧文ラベルが Cardo になっているか
- [ ] `box-shadow` を足していないか（実測 0 種）
- [ ] `palt` を足していないか（実測 0 要素）
- [ ] `border-radius` が 2px か（ピルにしていないか）
- [ ] ページ背景を `#ffffff` にしているか（動画ヒーローに引きずられて黒地にしていないか）
