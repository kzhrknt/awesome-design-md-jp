# DESIGN.md — 大阪ソーダ（OSAKA SODA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-27 / 対象: `https://www.osaka-soda.co.jp/ja/index.html`, `/ja/prd.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に赤 1 色。角を「1 つか 2 つだけ」50〜100px で大きく丸めて、直線的な化学メーカーの情報量に柔らかさを足す
- **密度**: 低め。本文 18px に `line-height: 1.75`、コンテンツ幅 1210px に `gap: 0 30px`
- **キーワード**: 字間 `0.06em` を全要素へ、片側だけの大きな角丸、`sans-serif` でスタックが途中で死ぬ、ナビだけ `vw`

**このサイトの核心は5つある。**

1. **字間を `--text-letter-spacing: 0.06em` という 1 つのトークンで全要素に配る。** `var(--text-letter-spacing)` の参照が CSS 全文で **45 回**。
   `body` に書いて px で継承させるのではなく、**各要素が `em` を持ち直す**ので、サイズに比例して値が変わる
   （16px → `0.96px` 35 要素 ／ 22px → `1.32px` 8 ／ 18px → `1.08px` 5 ／ 24px → `1.44px` 3 ／ 20px → `1.2px` 3 ／ 19px → `1.14px` 1）。
   **例外は欧文の `SUSTAINABILITY` だけで、48px に `5.76px` = `0.12em` と倍**
2. **角を「片側だけ」大きく丸めるのがこのサイトの文法。** `border-radius` 10 種のうち、
   `0 0 100px 100px`（ヘッダーの下端）／ `50px 50px 0 0` ／ `0 0 50px 50px`（「当社を深く知る」の帯）／ `100px 0 0`（タブの左上）／ `0 100px 0 0`（タブの右上）と、**半分以上が一部の角だけを指定している**。
   均等な角丸は `30px`（カードの 10 要素）と `100px`（ピルボタン 5 要素）、`20px`（IR のタグ 4 要素）だけ
3. **`font-family` のスタックが途中の `sans-serif` で死んでいる。** 実装のスタックは
   `"Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic", メイリオ, Meiryo, sans-serif, YuGothicM, "游ゴシック Medium", YuGothic, "Yu Gothic", -apple-system, "system-ui", "Helvetica Neue"` で、
   **6 番目の `sans-serif` がどんな文字にも必ずマッチするため、それ以降の 7 語に一生たどり着かない**。
   わざわざ `@font-face { font-family: YuGothicM; src: local("Yu Gothic Medium") }` を宣言しているのに、**その別名も死んでいる**
4. **`body` に書いてあるスタックと、実際に当たるスタックが別物。** `body` の宣言は
   `YuGothicM, "游ゴシック Medium", YuGothic, "Yu Gothic", -apple-system, …`（Zen Kaku Gothic New が入っていない旧世代）で、
   その上から別セレクタが Zen Kaku Gothic New 先頭のスタックを **106/114 要素**に当てている。**`body` の宣言を読んで書体を判断すると間違える**
5. **`html` も `body` も全幅で固定なのに、グローバルナビだけが `vw` 流体。** `html: 10px` / `body: 18px` は 1920〜374px で 1px も動かないが、
   ナビの `.text` は **`1.0588vw`（= 設計幅 1700px で 18px）で下限 12px**。
   1920px `20.33px` → 1600px `16.9412px` → 1440px `15.2471px` → 1280px `13.5529px` → 1200px `12.7059px` → **1134px 以下は 12px で張り付く**。
   `fontSize` 分布に `15.2471px` という端数が出るのはこれが原因で、`letter-spacing` も `0.914824px`（= 0.06em）と追従する

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| トークン | 値 | 役割 | 実測 |
|----------|-----|------|------|
| `--key-color` | **`#DF003A`** | ブランドの赤。CTA の面、セクション見出しの欧文、カードの枠、タブの選択状態 | 面 10 要素 ／ 文字 5 要素 ／ **var 参照 95 回** |

- **赤はこの 1 色だけ**。明度違いの派生を持たない
- ロゴマークだけグラデーション（`#DF003A` 系の 2 トーン）だが、UI では使わない

### Neutral（ニュートラル）

- **Text Primary** (`#333333` = `--text-color`): 本文・ナビ（実測 **47 要素**、var 参照 16 回）
- **Text Warm Dark** (`#463535`): **変数に無いハードコード。製品検索タブの中身 35 要素**。`#333333` よりわずかに赤みを帯びた黒で、ブランド赤に寄せた別の黒。**`#333333` に統一しない**
- **Text Muted** (`#686868`): IR のタグ文字（4 要素）
- **Text Light** (`#727272`): パンくず（1 要素）
- **Text Inverse** (`#ffffff`): 赤い面・濃い面の上（26 要素）
- **Background** (`#ffffff`): ページ背景（`body`）
- **Surface** (`#fafafa`): セクションの面（実測で最大面積 558,000px²）
- **Surface Alt** (`#f7f7f7`): 下層のページ導入部
- **Surface Gray** (`#f5f5f5`): メガメニューの面
- **Border** (`#cccccc`): 区切り線

### その他

- Cookie バーは `rgba(0, 0, 0, 0.75)` の黒帯（画面下に固定）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Zen Kaku Gothic New（Google Fonts）。実測 **106/114 要素（トップ）・77/80 要素（下層）**
- **明朝体**: 使用しない
- フォールバックはヒラギノ角ゴ ProN → ヒラギノ角ゴ → メイリオ → `sans-serif`。**`sans-serif` 以降は到達しない**

### 3.2 欧文フォント

- **Hind**（Google Fonts）。実測 8 要素（トップ）・3 要素（下層）
- `JA` / `EN` の言語切替、セクションの欧文見出し（`NEWS` / `PRODUCT` / `ABOUT` / `SUSTAINABILITY`）、コピーライト行に使う
- **和文と混植しない。欧文だけの短い語に限って使う**

### 3.3 font-family 指定

```css
/* 実際に 106 要素へ当たっているスタック（これが実装） */
font-family: "Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic",
             メイリオ, Meiryo, sans-serif,
             /* ↓ ここから先は sans-serif に阻まれて一生使われない */
             YuGothicM, "游ゴシック Medium", YuGothic, "Yu Gothic",
             -apple-system, "system-ui", "Helvetica Neue";

/* 欧文専用 */
font-family: Hind, sans-serif;

/* body の宣言（旧世代が残っている。実際の描画はこれではない） */
body {
  font-family: YuGothicM, "游ゴシック Medium", YuGothic, "Yu Gothic",
               -apple-system, BlinkMacSystemFont, "Helvetica Neue",
               "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic", メイリオ, Meiryo, sans-serif;
  font-size: 1.8rem;       /* 10px × 1.8 = 18px */
  line-height: 1.75;
  color: var(--text-color);
}

/* 宣言はされているが、上のスタックでは到達しない */
@font-face { font-family: YuGothicM; src: local("Yu Gothic Medium"); }
```

- **実サイトはこうだが、正しくは `sans-serif` をスタックの末尾に 1 回だけ置く。**
  いまの並びでは Windows の游ゴシック Medium 対策（`YuGothicM` の別名）がまったく効かず、Zen Kaku Gothic New が落ちてこなかった環境ではメイリオに落ちる
- `@font-face` の `src` が `local()` だけなので `document.fonts` 上は永久に `unloaded`。**これ自体は正常**（ロードという事象が起きない）だが、このサイトでは到達しないので二重に無意味

### 3.4 文字サイズ・ウェイト階層

```css
html { font-size: 62.5%; }                 /* = 10px。1rem = 10px */
body { font-size: 1.8rem; }                /* = 18px */
@media screen and (max-width: 768px) {
  body { font-size: 1.6rem; }              /* = 16px */
}
```

| 用途 | PC | SP（≤768px） | weight | 実測件数（PC） |
|------|-----|--------------|--------|----------------|
| セクション欧文見出し（Hind） | 60px | — | 700 | 3 |
| ページタイトル (h1) | **54px** | 26px | 700 | 1 |
| ヒーローのコピー | 48px | — | 700 | 3 |
| h2 | 60px | 30px | 700 | — |
| 中見出し | 34.56px | — | 700 | 1 |
| h3 | 26px | 20px | 700 | 1 |
| カードの見出し | 24px | — | 700 | 6 |
| カテゴリ名 | 22px | — | 700 | 10 |
| リンク・ボタン | 20px / 19px | — | 700 | 5 / 1 |
| **本文** | **18px** | **16px** | 400 | 19 |
| フォーム・タブ | 16px | — | 400/700 | **36（最多）** |
| 補助・ナビ | 14px | — | 700 | 9 |
| **グローバルナビ** | **1.0588vw（下限 12px）** | 12px | 700 | 6 |
| 注記 | 12px | — | 400 | 4 |

- **ウェイトは 400 と 700 の 2 段だけ**（実測 62 / 52）。
  Google Fonts の宣言は `wght@300;400;500;700;900` で `document.fonts` 上は 400 / 700 / 900 が `loaded` になるが、**900 は可視 0 要素**。300 と 500 は落ちてこない
- **`font-weight: 900` を当てない。** 読み込まれてはいるが、サイトのどこにも使われていない

### 3.5 行間・字間

```css
body { line-height: 1.75; }                        /* 無単位。各要素が自分のサイズで再計算 */
:root { --text-letter-spacing: 0.06em; }           /* 参照 45 回 */
```

- 行間比の実測: `1.50` 46 要素 ／ `1.75` 40 ／ `1.33` 7 ／ `1.25` 6 ／ `1.40` 4 ／ `1.60` 3。
  **本文は 1.75、カードや一覧は 1.50 に締める**
- 例外は欧文の `SUSTAINABILITY` の `0.88`（48px に行送り 42px）
- **字間は `em` を各要素が持つ。`body` から px で継承させない。**
  `letter-spacing: var(--text-letter-spacing)` と書くことで、16px なら `0.96px`、22px なら `1.32px` と**サイズに比例して変わる**
- **`0.06em` を px に読み替えない。** px で書くと、22px の見出しと 12px のナビで同じ値になってしまう
- CSS の宣言は 70 件で、`0.06em`（既定）のほか `0.1em` `0.05em` `0.02em` `0.075em` `0.12em` `0em` `0px` がある。
  **`0.12em` は欧文の大見出し専用**

### 3.6 禁則処理・改行ルール

- `word-break` / `auto-phrase` の宣言なし。ブラウザ既定の日本語禁則に任せる
- ヒーローと「知るほど、なるほど！大阪ソーダ」は `<br>` で手割り

### 3.7 OpenType 機能

- **`font-feature-settings` の宣言が CSS 全文に 0 件。** 実測も 0 要素
- Zen Kaku Gothic New は `palt` を持つので効かせられるが、**使っていない**。
  このサイトは**詰めるのではなく `0.06em` で空ける**設計なので、`palt` を足すと方向が逆になる

### 3.8 縦書き

- 縦組みは使用しない（`writing-mode` の実測 0 要素）

---

## 4. Component Stylings

### Buttons

```css
/* Primary — 赤のピル */
.btn-primary {
  background: var(--key-color);     /* #DF003A */
  color: #ffffff;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: var(--text-letter-spacing);   /* 1.14px */
  border-radius: 100px;             /* 完全なピル。実測 5 要素 */
}

/* Outline — 白地に赤い枠（欧文は Hind） */
.btn-outline {
  background: #ffffff;
  color: #333333;
  font-family: Hind, sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1.44px;           /* 0.06em */
  border: 1px solid var(--key-color);
  border-radius: 100px;
}
```

### Tabs（片側だけ丸める）

```css
/* 製品検索のタブ。選択中が赤、左端と右端だけ外側の角を落とす */
.tab           { border-radius: 0; background: #ffffff; border: 1px solid var(--key-color); }
.tab:first-child { border-radius: 100px 0 0; }      /* 左上だけ */
.tab:last-child  { border-radius: 0 100px 0 0; }    /* 右上だけ */
.tab.is-active   { background: var(--key-color); color: #ffffff; }
```

### Cards

```css
.card {
  background: #ffffff;
  border: 1px solid var(--key-color);
  border-radius: 30px;                               /* 実測 10 要素 */
  box-shadow: rgba(0,0,0,.15) 0 12px 15px 0;         /* 実測 12 要素 */
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1.32px;                            /* 0.06em */
}
```

### Badges / Chips

```css
.ir-tag {
  background: #686868;      /* または赤 */
  color: #ffffff;
  font-size: 12px;
  border-radius: 20px;
}
```

### Header（下端を大きく丸める）

```css
.header {
  height: var(--header-height-pc);     /* 100px → 1189px 以下で 60px */
  background: #ffffff;
  border-radius: 0 0 100px 100px;      /* ← このサイトの看板 */
  box-shadow: rgba(0,0,0,.2) 0 0 6px 0;
}
```

---

## 5. Layout Principles

### Spacing Scale

```css
:root {
  --column-side-margin:      30px;   /* 参照 45 回。768px 以下で 20px */
  --parts-side-margin:       30px;   /* 参照 16 回 */
  --parts-common-margin-top: 30px;   /* 参照 11 回 */
  --box-column-padding-vartical:   30px;  /* ※ 実サイトの綴りそのまま（vartical） */
  --box-column-padding-horizontal: 30px;
  --box-columns-padding-vartical:  35px;
  --box-columns-padding-horizontal: 30px;
}
```

- **30px が基準**。実測の `gap` も `0 30px` が 30 件で最多（次いで `0 10px` 3 件、`0 20px` 2 件）

### Container

```css
:root {
  --mainarea-width-pc: 1210px;   /* 参照 66 回 */
  --mainarea-width-sp: 500px;    /* 参照 6 回 */
  --mainarea-width:    var(--mainarea-width-pc);  /* 769px 以上。768px 以下で -sp に差し替え */
  --mainarea-base:     1.00;     /* 参照 22 回。全幅で常に 1.00 */
}
```

- 実測のコンテナ幅は **1210px が 24 要素で最多**（次いで 1250px 5、968px 2、590px 4、383.333px 4 = 3 カラム）
- **`--mainarea-base` は「コンテンツ幅の倍率」として 22 箇所から参照されているが、1920〜375px のどの幅でも `1.00` のまま。** 仕組みだけあって動いていない。真似しない

### 宣言はあるが使われていない変数（4 個）

`--box-column-padding` / `--box-columns-padding` / `--box-column-border-width` / `--box-columns-border-width` は **var 参照 0 回**。
`--box-column-padding` の値 `max(1px, calc(30px - 30px)) 30px 30px` は `max(1px, 0px)` = 1px に畳まれるだけの式で、**意味を持っていない**

---

## 6. Depth & Elevation

**影は 3 種類。** 増やさない。

| 影 | 用途 | 実測 |
|----|------|------|
| `rgba(0,0,0,.15) 0 12px 15px 0` | カード（真下に落とす） | 12 要素 |
| `rgba(0,0,0,.2) 0 0 6px 0` | ヘッダー（全周にうっすら） | 2 要素 |
| `rgba(0,0,0,.3) 2px 2px 15px 0` | スキップリンク | 1 要素 |

- **カードの影は `0 12px 15px`。オフセットが大きく、ぼかしとほぼ同じ**（浮かせるというより下に置く）

### 角丸（10 種）

| 値 | 用途 | 実測 |
|----|------|------|
| `30px` | カード | 10 |
| `100px` | ピルボタン | 5 |
| `20px` | IR のタグ | 4 |
| `50px` | 小さなピル | 3 |
| `0 0 100px 100px` | **ヘッダーの下端** | 2 |
| `50px 50px 0 0` | セクションの上端 | 2 |
| `0 0 50px 50px` | 「当社を深く知る」の帯の下端 | 2 |
| `100px 0 0` | タブの左上 | 1 |
| `0 100px 0 0` | タブの右上 | 1 |
| `5px` | スキップリンク | 1 |

---

## 7. Do's and Don'ts

### Do（推奨）

- **字間は `letter-spacing: var(--text-letter-spacing)`（`0.06em`）を各要素に書く。** `body` に書いて継承させない
- 赤は **`#DF003A` の 1 色**。面にも文字にも枠にも同じ値を使う
- **本文の黒は `#333333`、製品検索まわりの黒は `#463535`** と使い分ける（実装がそうなっている）
- `html { font-size: 62.5% }`（10px）＋ `body { font-size: 1.8rem }`（18px）＋ `line-height: 1.75`（無単位）
- **角は片側だけ大きく丸める。** ヘッダーは `0 0 100px 100px`、タブは `100px 0 0` / `0 100px 0 0`
- 余白と `gap` は **30px** を基準にする
- 欧文の短い語（`NEWS` / `JA` / `EN`）だけ `Hind, sans-serif` にする
- 影は 3 種類から選ぶ。カードは `rgba(0,0,0,.15) 0 12px 15px 0`

### Don't（禁止）

- **`font-family` の途中に `sans-serif` を置かない。** 実サイトは 6 番目に置いてしまい、`YuGothicM` 以下 7 語が死んでいる。正しくは末尾に 1 回だけ
- **`body` の `font-family` 宣言を実装だと思わない。** 旧世代の游ゴシック先頭スタックが残っているだけで、描画されているのは Zen Kaku Gothic New
- **`0.06em` を px に読み替えない。** サイズに比例することが設計の中身で、px にすると見出しとナビで同じ値になる
- **`font-weight: 300` / `500` / `900` を当てない。** 実測は 400 と 700 の 2 段だけ（900 は `loaded` だが可視 0）
- **`font-feature-settings: "palt"` を足さない。** このサイトは詰めるのではなく `0.06em` で空ける設計で、方向が逆になる
- **`--mainarea-base` の倍率を真似しない。** 22 箇所から参照されているのに、全幅で `1.00` のまま動いていない
- **`--box-column-padding` / `--box-columns-padding` / `--box-column-border-width` / `--box-columns-border-width` を使わない**（var 参照 0 回の死に変数）
- **角を 4 つとも大きく丸めない。** `100px` を全周に当てるのはピルボタンだけで、面は片側だけ丸める
- **`#333333` と `#463535` を 1 つに統合しない。** 実装では 47 要素と 35 要素が併存している

---

## 8. Responsive Behavior

### Breakpoints

| クエリ | 件数 | 変わるもの |
|--------|------|-----------|
| `screen and (max-width: 768px)` | **200** | `body: 18px → 16px` / `--mainarea-width: 1210px → 500px` / `--column-side-margin: 30px → 20px` |
| `print, screen and (min-width: 769px)` | 77 | PC レイアウト |
| `screen and (max-width: 890px)` | 8 | ナビの折り返し |
| **`print`** | **7** | **印刷用スタイルを持っている** |
| `screen and (max-width: 1189px)` | 2 | `--header-height: 100px → 60px` |
| `screen and (max-width: 1200px)` | 2 | ヘッダー内の間隔 |

- **崖は 769/768px の 1 箇所だけ**で、`body` が 18px → 16px に下がるだけ（1.125 倍）。急激な跳ね上がりは無い
- **`--header-height` の切り替えは 1190/1189px** と、`body` の崖より手前にある。2 段で縮む
- `print` クエリが 7 件あり、**`min-width: 769px` の PC レイアウトが印刷にも適用される**（`print, screen and (min-width: 769px)` と並記）

### 幅で変わるのはナビだけ（流体）

```css
/* グローバルナビの文字だけ vw。設計幅 1700px で 18px、下限 12px */
.gnav .text { font-size: max(12px, 1.0588vw); }
```

| 画面幅 | ナビの実測 | 字間（= 0.06em） |
|--------|-----------|------------------|
| 1920px | 20.33px | 1.22px |
| 1600px | 16.9412px | 1.01647px |
| 1440px | **15.2471px** | **0.914824px** |
| 1280px | 13.5529px | 0.813176px |
| 1200px | 12.7059px | 0.762353px |
| 1134px 以下 | **12px（下限）** | 0.72px |

### タッチターゲット

- カテゴリカードは `border-radius: 30px` のまま高さを保つ。ピルボタンは `100px` 固定

### フォントサイズの調整

- 768px 以下で `body: 16px` / `h1: 26px` / `h2: 30px` / `h3: 20px` に落とす（PC は 54 / 60 / 26px）
- **`rem` は `html: 10px` 基準。`1.8rem` = 18px であって 28.8px ではない**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体（和文）: "Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic",
              メイリオ, Meiryo, sans-serif   ← sans-serif は末尾に 1 回だけ
書体（欧文）: Hind, sans-serif（JA/EN・NEWS・PRODUCT など短い語のみ）
ウェイト: 400 / 700 の 2 段のみ
root: html 62.5% = 10px（1rem = 10px）
本文: body 1.8rem = 18px / line-height 1.75（無単位）/ ≤768px は 1.6rem = 16px
字間: --text-letter-spacing: 0.06em を各要素に（body から継承させない）
      欧文大見出しのみ 0.12em
ナビ: font-size: max(12px, 1.0588vw)（設計幅 1700px）
色: --key-color #DF003A（唯一の赤）
    文字 #333333（本文）/ #463535（製品検索まわり）/ #686868 / #727272 / #ffffff
    面 #ffffff / #fafafa / #f7f7f7 / #f5f5f5、枠 #cccccc
角丸: カード 30px / ピル 100px / IR タグ 20px
      ヘッダー下端 0 0 100px 100px / タブ 100px 0 0・0 100px 0 0
影: カード rgba(0,0,0,.15) 0 12px 15px 0 ほか 3 種のみ
余白: 30px 基準（gap: 0 30px）
コンテナ: --mainarea-width-pc 1210px / -sp 500px
崖: 769/768px の 1 箇所（ヘッダー高は 1190/1189px）
palt: 使わない（宣言 0 件）
```

### プロンプト例

> 大阪ソーダの DESIGN.md に従って、製品カテゴリの検索タブとカードグリッドを作ってください。
> `html { font-size: 62.5% }` ＋ `body { font-size: 1.8rem; line-height: 1.75 }` を土台に、
> 和文は `"Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", メイリオ, sans-serif`
> （`sans-serif` は末尾に 1 回だけ）、ウェイトは 400 と 700 のみ。
> 字間は `--text-letter-spacing: 0.06em` を定義して各要素に `letter-spacing: var(...)` で当てること。
> タブは左端が `border-radius: 100px 0 0`、右端が `0 100px 0 0` で、選択中は `#DF003A` の面に白文字。
> カードは `border: 1px solid #DF003A` ＋ `border-radius: 30px` ＋
> `box-shadow: rgba(0,0,0,.15) 0 12px 15px 0`。`gap` は `0 30px`、コンテナは 1210px。
> セクションの欧文見出しだけ `Hind, sans-serif` を使い、`palt` は足さないこと。
