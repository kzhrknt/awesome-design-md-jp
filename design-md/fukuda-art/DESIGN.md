# DESIGN.md — 福田美術館（FUKUDA ART MUSEUM）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-02 / 対象: `https://fukuda-art-museum.jp/`, `/concept`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **サイト全体にルビ（振り仮名）を振り、ボタン 1 つで出し入れできる。** 下層ページだけで `<ruby>` が **363 組**。美術館の情報を子どもも読めるようにするための設計で、日本語ウェブでは稀
- **密度**: 低い。本文 `line-height: 1.66〜2.00`、セクション上の余白 100px。ルビのぶん行間を広く取っている
- **キーワード**: ルビ、Noto Serif JP Light、小さい文字ほど字間を空ける、ピンク 1 色、ピル型 CTA

**このサイトの核心は 5 つある。**

1. **ルビは `<ruby>`／`<rt>` の素の HTML で、表示・非表示は `body` のクラス 1 つで切り替える。** 実装は `.is-ruby-off rt { display: none }` のたった 1 行（`body` の既定クラスは `is-ruby-on`）。ヘッダーの `ルビON` ボタンがこのクラスを付け外しする
2. **`<rt>` は親の 50%（実測 6/6 サンプルで ratio = 0.50）。ところが `letter-spacing` は親から px のまま降りる。** 親 15px に `0.15em`（= 2.25px）を当てると、7.5px の `<rt>` でも `2.25px` ＝ **ルビ側では 0.30em**。**ルビの字間だけが本文の 2 倍に広がる**（363 組すべて）
3. **本文＝游ゴシック、見出しと読み物＝Noto Serif JP の二書体制。** 下層の実測は 游ゴシック 488 要素 / Noto Serif JP 105 要素。明朝は **weight 300（Light）が 48 要素**で、細い明朝が基調
4. **小さい文字ほど字間を空ける。** 15px → `0.15em` / 14.4px → `0.30em` / 13px → `0.40em` / 12px → `0.40em` / 9px → `0.20em`。**サイズに反比例して字間を増やす**段組み（実測 5 段：0.1 / 0.15 / 0.2 / 0.3 / 0.4em）
5. **Google Fonts の URL は `Noto+Serif+JP:200,300,400`。700 は読み込んでいない。** にもかかわらず明朝に `font-weight: 700` を当てた要素が **16 個**ある。**実際は 400 で描画される**

**`font-feature-settings` は 1 要素も使っていない**（実測 0 件）。**縦組みも 0 件**。CSS Custom Properties は 60 個あるがすべて WordPress / Gutenberg 由来で、**自社トークンは 0 個**。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **福田ピンク** | **`#c81a54`** | **可視 15 要素の文字色・48 要素の塗り面**。`チケット購入` のピル、`開催中の展覧会` のバッジ、前売券バナー |
| **ペールピンク（面）** | **`#f7dde5`** | **トップで最も多い塗り面（84 要素）**。展覧会ブロックの地。`#c81a54` を 10% 程度に薄めた色 |
| **ペールピンク 2** | **`#f2dee5`** / **`#f1efe7`** | 各 1 要素。前者はピンク寄り、後者は紙のような生成り |

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文・見出し。**可視 400 要素（トップ）/ 432 要素（下層）**
- **Text Black** (`#000000`): ヘッダーのナビ・`ルビON` ボタン（可視 169 要素）
- **Text on Dark** (`#ffffff`): ピンク面・写真の上（可視 70 / 149 要素）
- **Text Muted** (`#898989`): 日付・補助情報（可視 38 要素）
- **Slider UI** (`#313233`): カルーセルの矢印ボタン（8 要素）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` / 根拠 `viewportTopBySample (3/3)`）

> **`rgb(0, 0, 238)` が下層に 1 要素ある**（`<p>` 直下の `<a>`「オンラインチケット」）。**色指定が抜けてブラウザ既定の青が出ている実装の誤り**で、設計色ではない。**再現しない**。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（本文・ナビ・UI）**: **游ゴシック**。実測 509 要素（トップ）/ 488 要素（下層）
- **明朝体（見出し・読み物・ルビ）**: **Noto Serif JP**（Google Fonts）。実測 19 要素（トップ）/ **105 要素（下層）**
- **Web フォント**: **Noto Serif JP の 300 / 400 の 2 ウェイトだけが `loaded`。** 和文のフォントファイル要求は 30 件（`fonts.gstatic.com`、`unicode-range` によるサブセット分割のため件数が多い）

### 3.2 欧文フォント

- 専用の欧文 Web フォントは無い。カルーセルの番号などに `Arial`（実測 175 要素）が出るが、これはライブラリ（slick）の既定
- 游ゴシックのスタック末尾に `arial, helvetica` がある

### 3.3 font-family 指定

```css
/* 本文・ナビ・UI */
font-family: "Yu Gothic", YuGothic, "Hiragino Sans", "Hiragino Kaku Gothic Std",
             "Hiragino Kaku Gothic Pro", Meiryo, メイリオ, Osaka, "MS PGothic",
             arial, helvetica, sans-serif;

/* 見出し・読み物・ルビ */
font-family: "Noto Serif JP", "ヒラギノ明朝 ProN W2", HiraMinProN-W2,
             "Yu Mincho", YuMincho, HG明朝E, "ＭＳ Ｐ明朝", "MS PMincho",
             "MS 明朝", serif;
```

**明朝のフォールバックは「ヒラギノ明朝 ProN **W2**」**（最も細いウェイト）。Noto Serif JP の 300（Light）に合わせた選び方で、**W3 や W6 に替えると印象が変わる**。

### 3.4 游ゴシック問題への対応（別名方式・ただしこの端末では外れる）

```css
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Medium"); font-weight: 100; }
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Medium"); font-weight: 200; }
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Medium"); font-weight: 300; }
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Medium"); font-weight: 400; }
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Bold");   font-weight: bold; }
```

- Windows で游ゴシック Regular の細さを避けるための**別名上書き方式**（SmartHR / 白鶴と同系統）
- **100〜400 を全部 Medium に割り当てているので、`font-weight: 300` と `400` は同じ太さで出る**
- `document.fonts` では **300 / 400 / bold の 3 本とも `status: error`**。macOS には `Yu Gothic Medium` という名前のフォントが無いため外れ、スタックの次（`YuGothic` → `Hiragino Sans`）に落ちる。**Windows では意図どおり当たる**
- **`error` は「宣言はあるがこの端末に該当 local フォントが無い」の印。** `src: local()` だけの `@font-face` が常に正常という意味ではない

### 3.5 ルビの実装

```html
<ruby>美術館<rt>びじゅつかん</rt></ruby>
```

```css
/* 表示・非表示の切り替えはこの 1 行だけ */
.is-ruby-off rt { display: none; }
```

- `body` の既定クラスは **`is-ruby-on`**。ヘッダーの `ルビON` ボタンがこれを `is-ruby-off` に入れ替える
- `<rt>` の computed: `ruby-position: over` / `ruby-align: space-around` / `display: ruby-text`
- **`<rt>` の `font-size` は親の 50%**（15px → 7.5px / 14px → 7px。実測 6/6 サンプルで ratio = 0.50）
- **実測されたルビ付き要素は下層ページだけで 363 組**（`<ruby>` 363 / `<rt>` 363）

**ルビの字間が本文の 2 倍になる（このサイトの最大の落とし穴）**

| 親 | 親の `letter-spacing` | `<rt>` の `font-size` | `<rt>` の `letter-spacing` | **rt から見た em** |
|----|----------------------|----------------------|---------------------------|-------------------|
| 15px | `2.25px`（= 0.15em） | 7.5px | **`2.25px`（同じ）** | **0.30em** |
| 14px | `2.1px`（= 0.15em） | 7px | **`2.1px`（同じ）** | **0.30em** |

**`letter-spacing` を `em` で宣言すると、算出された絶対 px が子へ降りる。** `<rt>` は親の半分のサイズなので、**同じ px は 2 倍の em に相当する**。ルビだけが不自然に広がる。

**直すなら `<rt>` で字間を宣言し直す**（実サイトは直していない）:

```css
rt { letter-spacing: 0.15em; }  /* 親と同じ見かけの字間にそろえる */
```

### 3.6 文字サイズ・ウェイト階層（下層ページ・1440px）

| 用途 | font-size | weight | line-height | letter-spacing | 書体 | 実測 |
|------|-----------|--------|-------------|----------------|------|------|
| 大見出し | 24px | **300** | 43.2px（1.80） | **`4.8px`（0.20em）** | ゴシック | 37 要素 |
| 中見出し | 18px | 300 | — | — | 明朝 | 32 要素 |
| **本文** | **16px** | **400** | **32px（2.00）** | **normal** | ゴシック | **145 要素** |
| リード | 15px | 300 | 21px（1.40） | `2.25px`（0.15em） | 明朝 | — |
| ナビ・リンク | 14px | 400 / 700 | 26.6px（1.90） | `2.1px`（0.15em） | ゴシック・明朝 | 54 要素 |
| ラベル | 13px | 400 | — | **`5.2px`（0.40em）** | ゴシック | 7 要素 |
| 小ラベル | 12px | 400 | — | **`4.8px`（0.40em）** | ゴシック | 41 要素 |
| **ルビ** | **7〜8px** | 300 / 700 | normal | 親から px 継承 | 明朝 | **131 + 41 要素** |

**`body` は `font-size: 14px` / `line-height: 26.6px`（1.90）/ `letter-spacing: normal`。** `html` は 16px。**6 幅すべてで完全固定**（流体なし）。

### 3.7 「小さい文字ほど字間を空ける」段組み（実測）

| font-size | letter-spacing | em 換算 | 実測件数 |
|-----------|----------------|---------|----------|
| 15px | 2.25px | **0.15em** | 3 |
| 14.4px | 4.32px | **0.30em** | 7 |
| 13px | 5.2px | **0.40em** | 7 |
| 12px | 4.8px | **0.40em** | 21 |
| 12px | 1.2px | 0.10em | 11 |
| 9px | 1.8px | **0.20em** | 26 |
| 8px | 0.8px | 0.10em | 4 |

- **各要素が自分で `em` を宣言している**（サイズに比例して px が変わる型）。`body` からの継承ではない
- **`body` 自体は `letter-spacing: normal`**。字間は要素ごとに足していく

### 3.8 明朝の 700 は 400 で出る

- Google Fonts の URL は **`family=Noto+Serif+JP:200,300,400&display=swap`**
- `document.fonts` で `loaded` なのは **`Noto Serif JP 300` と `Noto Serif JP 400` の 2 本だけ**
- **明朝に `font-weight: 700` を当てた要素が 16 個あるが、700 のファイルは読み込まれていないので 400 で描画される**
- **太く見せたいなら 700 を URL に足す**（`:200,300,400,700`）。足さないなら **宣言を 400 に直す**

### 3.9 Xserver の Web フォント機能が有効だが使われていない

- `https://webfonts.xserver.jp/js/xserverv3.js` を読み込み、`@font-face { font-family: _TSBlank_; src: url("//webfonts.xserver.jp/ab.woff") }` が入る
- **`_TSBlank_` は `status: unloaded`。配信された和文書体は 1 本も無い**（`loaded` は Noto Serif JP の 2 本のみ）
- **サーバー側の機能が有効化されているだけで、どの要素の `font-family` にも割り当てられていない。** 再現しなくてよい

---

## 4. Component Stylings

### Buttons

**Primary（ピル型・チケット購入）**
- Background: **`#c81a54`**
- Text: `#ffffff`
- Border Radius: **`52.8px`**（ピル）
- Padding: `19.36px 42.24px 19.36px 21.12px`（**右に矢印分のアキを取る非対称**）
- Font: 17.6px / weight 400 / letter-spacing normal

**Primary（角丸なし・バナー）**
- Background: `#c81a54` / Text: `#ffffff`
- Border Radius: `0px`
- Padding: `20px 40px`（バナー）/ `20px`（フッター CTA）
- Font: 14〜16px / weight 400〜600 / **letter-spacing `0.7px`〜`0.8px`（約 0.05em）**

**Outline（`〇〇を見る`）**
- Background: `transparent`
- Text: `#333333`（写真の上では `#ffffff`）
- Border: **`1px solid #333333`**（写真の上では `1px solid #ffffff`）
- Border Radius: `0px`
- Padding: `10px`
- Font: 14px / **weight 300** / letter-spacing normal

**Badge（`開催中の展覧会`）**
- Background: `#c81a54` / Text: `#ffffff`
- Border: `1px solid #c81a54`
- Padding: `5.2px 13px`
- Font: 13px / weight 400

**Tag（`詳細`）**
- Background: `#c81a54` / Text: `#ffffff`
- Border Radius: **`0px 0px 3px`**（右下だけ 3px の変則）
- Padding: `5px 15px` / Font: 12px

### ルビ切り替えボタン（実サイトの状態と、正しい書き方）

```
Background: #ffffff / Text: #000000
Border: 1px solid #000000 / Border Radius: 8px
Padding: 8px / Font: 14px / weight 400
```

**このボタンだけ `font-family: "MS Gothic", "MS PGothic", "Hiragino Sans", ヒラギノ角ゴシック, "Yu Gothic", メイリオ, Meiryo, sans-serif`** で、サイト本体の書体スタックから外れている（rubyful ライブラリの既定が残っている）。**実装するならサイトの游ゴシックのスタックに揃える。**

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 5px | タグ内側の上下 |
| S | 8px | ルビボタン内側 |
| M | 10px | Outline ボタン内側 |
| L | 13〜15px | バッジ・タグ内側（左右） |
| XL | 20px | CTA 内側 |
| 2XL | 40px | バナー内側（左右） |
| 3XL | **100px** | **セクション上（実測 5 箇所で最多）** |
| 4XL | 110px | セクション上 |

### Container

- **Max Width: 1000px**（実測 6 要素で最多）
- **広いブロック: 1100px**（2 要素）
- `gap` は `14px` が 1 箇所のみ。レイアウトは float / flex の個別指定が中心

---

## 6. Depth & Elevation

**影は 1 種類だけ**（トップの 1 要素）。

```css
box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 5px 0px;
```

- **下層ページには影が 1 つも無い**
- `border-radius` は `3px` / `5px` / `8px` / `52.8px`（ピル）/ `100%` の 5 種。**ピルと角丸なしが混在する**

---

## 7. Do's and Don'ts

### Do（推奨）

- **ルビは `<ruby><rt>` の素の HTML で書き、`body` のクラス 1 つで `rt { display: none }` を切り替える**
- **`<rt>` に `letter-spacing` を宣言し直す**（親の em が px で降りて 2 倍になるのを防ぐ）
- **見出し・読み物は Noto Serif JP の weight 300**、本文は游ゴシックで組む
- **明朝のフォールバックは「ヒラギノ明朝 ProN W2」**（細さを合わせる）
- **小さい文字ほど `letter-spacing` を大きく**する（12〜13px は 0.4em、15px は 0.15em）
- **本文の `line-height` は 1.9〜2.0**（ルビが載る前提で広く取る）
- **CTA は `#c81a54`。ピル（`52.8px`）と角丸なし（`0px`）の 2 系統**を使い分ける
- **`padding` を左右非対称にして右に矢印分のアキ**を取る

### Don't（禁止）

- **`letter-spacing` を `body` にまとめて書かない。** このサイトの `body` は `normal` で、字間は要素ごとに `em` で足す
- **明朝に `font-weight: 700` を当てない。** Google Fonts の URL は `200,300,400` だけで、700 は 400 で出る
- **游ゴシックの `font-weight: 300` と `400` を描き分けない。** `@font-face` が両方を Medium に割り当てている
- **ルビ切り替えボタンに `MS Gothic` を使わない**（実サイトはライブラリ既定が残っているだけ）
- **`<p>` 直下の `<a>` に色を書き忘れない**（下層に `rgb(0,0,238)` が 1 要素出ている）
- **`font-feature-settings: "palt"` を足さない。** 1 要素も使っていない
- **縦組みを実装しない。** `writing-mode: vertical-*` は 0 件
- **Xserver の Web フォントを再現しない。** 読み込まれてはいるが 1 要素も使っていない
- **`html` / `body` を流体にしない。** 6 幅すべてで `16px` / `14px` の完全固定

---

## 8. Responsive Behavior

### Breakpoints

**ルートは完全固定**（`html: 16px` / `body: 14px` が 1440 / 1200 / 1024 / 834 / 768 / 767 / 375px のすべてで同値）。
**切り替わるのは要素側だけで、境目は 768px と 767px の間。**

| 要素 | ≥834px | 834〜768px | ≤767px |
|------|--------|------------|--------|
| `h2` | **20px** / 32px | **17px** / 27.2px | **14px** / 22.4px |
| `p` | **15px** / 24px | **14px** / 22.4px | **12px** / 19.2px |
| `h1` | 14px / 26.6px | 14px / 26.6px | 14px / 26.6px |
| `h3` | 12px / 19.44px | 12px / 19.44px | 12px / 19.44px |

- **`h2` と `p` だけが 3 段**。`h1` / `h3` / `body` は動かない
- **`line-height` は比率（`1.60`）を保ったまま px が変わる**＝無単位で宣言している

### タッチターゲット

- ピル型 CTA は高さ約 57px（17.6px × 1.0 + padding 19.36px × 2）
- Outline ボタンは `padding: 10px` ＋ 14px で高さ約 34px。**モバイルでは上下の padding を増やす**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ブランド色: #c81a54（ピンク）/ 面は #f7dde5（淡いピンク）
本文: 游ゴシック 16px / weight 400 / line-height 2.00 / letter-spacing normal
見出し: Noto Serif JP weight 300 / 24px / letter-spacing 0.20em
ルビ: <ruby><rt>。rt は親の 50%。body.is-ruby-on ⇄ is-ruby-off で .is-ruby-off rt{display:none}
字間: 要素ごとに em。小さい文字ほど大きく（12-13px→0.4em / 15px→0.15em）
CTA: #c81a54 / ピル 52.8px または radius 0 / padding 右に矢印分のアキ
ルート: html 16px / body 14px（6幅すべて固定）／ブレークポイントは 768-767 の間
Webフォント: Noto Serif JP 300・400 のみ（700 は読み込まれていない）
```

### プロンプト例

```
福田美術館のサイト風に実装してください。

- 本文に <ruby>漢字<rt>ふりがな</rt></ruby> でルビを振り、ヘッダーの「ルビON」ボタンで
  body のクラスを is-ruby-on ⇄ is-ruby-off に切り替える。CSS は
  `.is-ruby-off rt { display: none }` の 1 行だけ
- rt には letter-spacing を宣言し直す（親の em が px で降りてルビだけ 2 倍に広がるため）
- 本文は "Yu Gothic", YuGothic, "Hiragino Sans", ... sans-serif で 16px / weight 400 /
  line-height 2.0 / letter-spacing は normal
- 見出し・読み物は "Noto Serif JP", "ヒラギノ明朝 ProN W2", ... serif の weight 300。
  700 は使わない（Google Fonts は 200,300,400 しか読んでいない）
- 字間は要素ごとに em で足す。12〜13px のラベルは 0.4em、15px のリードは 0.15em
- CTA は背景 #c81a54・文字 #ffffff。主要導線は border-radius: 52.8px のピル、
  padding: 19.36px 42.24px 19.36px 21.12px（右に矢印分のアキ）
- 副次ボタンは transparent / 1px solid #333333 / radius 0 / padding 10px / weight 300
- コンテナは max-width: 1000px、セクション上の余白は 100px
- html 16px / body 14px は固定。h2 と p だけ 768px と 767px の間で 3 段に落とす
- font-feature-settings と縦組みは使わない
```
