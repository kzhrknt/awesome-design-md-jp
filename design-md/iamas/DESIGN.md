# DESIGN.md — 情報科学芸術大学院大学 IAMAS

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-18 / 対象: `https://www.iamas.ac.jp/`, `https://www.iamas.ac.jp/outline/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **14px の小さな文字をほぼ全部 weight 700 で組み、`palt` で詰める。** 地は白、文字は純黒 `#000000`、アクセントは強い青 `#2641f0`。ファーストビューだけ 72px の Inter を薄いグレーで大きく置き、オレンジ×青のグラデーション帯を区切りに使う
- **密度**: 高い。本文 14px・行間 1.43、コンテナ 920px。情報量の多い大学サイト
- **キーワード**: 全部ボールド、小さい文字、`palt`、純黒、青 `#2641f0`、オレンジ×青のグラデーション

**このサイトの核心は 5 つある。**

1. **ほぼ全部が weight 700。** トップページの可視 244 要素中 **211 要素が 700**、下層も 142 中 124 要素。400 はファーストビューの英文 28 要素と本文のごく一部だけ、500 は日付 5 要素のみ。**見出しだけ太いのではなく、ナビもリンクもラベルも全部太い**
2. **ウェイトごとに `font-family` のスタックを別名で差し替える。** 700 の要素は `… "游ゴシック Bold", "Yu Gothic Bold" …`、400 の要素は `… "游ゴシック Medium", "Yu Gothic Medium" …` と、**同じ書体の別ウェイト名をスタックに直接書き分けている**（2 スタックで 100%）
3. **Adobe Fonts の秀英角ゴシック金を読み込んでいるのに、1 文字も描画されていない。** `dnp-shuei-gothic-kin-std` は `document.fonts` で 2 本とも `loaded`、実ファイルも `use.typekit.net` から 2 件ダウンロードされ、CSS 全文に **108 回**書かれている。だが **スタックの位置が游ゴシックより後ろ**なので、游ゴシックがある環境では絶対に到達しない。CDP の `CSS.getPlatformFontsForNode` で実描画書体を取ると、和文要素は**すべて `YuGothic`**
4. **`palt` を `body` に 1 行書いて 759 要素へ継承させ、実際に効いている。** 実スタック・40px・weight 700 で隠し要素の幅を測ると `normal` **1040.63px** → `"palt"` **929.44px**（**−10.68%**）。`"halt"` は 960.63px（−7.69%）
5. **字間は `body` に `0.05em` を書いた上で、各コンポーネントでも `0.05em` を宣言し直す。** その結果 `letter-spacing` の実測値が **サイズに比例して** 12px→`0.6px` / 13px→`0.65px` / 14px→`0.7px` / 15px→`0.75px` / 16px→`0.8px` / 18px→`0.9px` と並ぶ。**`em` を 1 回だけ書いて px で継承させる設計とは正反対**

**`box-shadow` は実質ゼロ**（唯一の値が `rgb(255,255,255) 0 0 0 0` ＝ 不可視）。`writing-mode` も 2 ページとも 0 要素。**CSS Custom Properties の自社トークンは 0 個**（トップの 60 個はすべて WordPress / Gutenberg 由来、下層ページは 0 個）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| IAMAS ブルー | `#2641f0` | 文字色としてトップ 34 要素（`イベントレポート` `在校生` `教職員` などのタグ）／ CTA「資料請求」と「開催中」バッジの面 |
| アクセント・オレンジ | `#f06e1d` | グラデーション帯の両端にだけ出る。**単色の面としては使われない** |

```css
/* 区切りのグラデーション帯（7 要素）。両端オレンジ・中央だけ青 */
background: linear-gradient(90deg,
  #f06e1d 0%, #cccfd3 20%, #cccfd3 30%,
  #2641f0 50%,
  #cccfd3 70%, #cccfd3 80%, #f06e1d 100%);
```

> **停止位置（20% / 30% / 50% / 70% / 80%）と角度（90deg）は丸めずにそのまま写す。** グレーの帯の中央と両端にだけ色が差す、特徴的な区切り線になっている

### Semantic（意味的な色）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| CTA の面 | `#2641f0` | 白文字 14px / weight 700 / `border-radius: 16px` |
| CTA（反転）の面 | `#ffffff` | 黒文字 14px / weight 700 / `border-radius: 16px` |
| タブ・フィルタの面 | `#e4e6eb` | 黒文字 14px / weight 700 |
| メニュー帯の面 | `#cccfd3` | ドロップダウンの地（7 要素） |
| 淡い見出しの面 | `#f0f2f7` | 下層ページの大見出しの文字色（地に沈ませる処理） |

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| 本文・見出し | `#000000` | トップ 155 要素・下層 102 要素でいずれも最多。**純黒を使っている** |
| 補助テキスト | `#838587` | カテゴリ・補足（トップ 33 要素・下層 25 要素） |
| ヒーローの英文 | `#c0c4c9` | 72px の `Scientific Thinking & Artistic Sense`。**背景の映像に溶かす薄いグレー** |
| 反転文字 | `#ffffff` | 青い面の上 |
| ページ背景 | `#ffffff` | **`html` にも `body` にも背景指定が無く UA 既定の白**。上部ビューポートは全画面の `<canvas>`（1440×900）に覆われている |

> **本文に `#000000` を使う。** テンプレートの一般則（純黒を避ける）に反するが、実サイトはそうなっている。再現するときは `#111111` 等に丸めない

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（実際に描画される）**: 游ゴシック体 / 游ゴシック Bold / 游ゴシック Medium（OS ローカル）
- **ゴシック体（宣言はあるが到達しない）**: `dnp-shuei-gothic-kin-std`（秀英角ゴシック金・Adobe Fonts）
- **明朝体**: 使用しない

> **秀英角ゴシック金は読み込まれているのに 1 文字も使われていない。** CSS に 108 回書かれ、Adobe Fonts から実ファイルが 2 件ダウンロードされ、`document.fonts` でも `loaded` になる。それでも**スタック上で游ゴシックより後ろ**なので、macOS でも Windows でも到達しない。到達するのは游ゴシックも秀英も無い環境（Linux / Android など）だけ

### 3.2 欧文フォント

- **サンセリフ**: `Inter`（Google Fonts `css2?family=Inter:wght@400;500;600&display=swap`）。スタックの**先頭**に置き、欧文と数字を Inter で、和文を游ゴシックで組む和欧二層
- **セリフ / 等幅**: 使用しない

> Inter の軸は **400 / 500 / 600 の 3 本だけ**。CSS は weight 700 を大量に当てているので、**欧文は 600 までしか本物のウェイトが無く、700 は合成太字になる**

### 3.3 font-family 指定

```css
/* weight 400〜500 の要素 */
font-family: Inter, 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
             游ゴシック, "Yu Gothic", dnp-shuei-gothic-kin-std, Meiryo, sans-serif;

/* weight 700 の要素（別名が Bold に差し替わる） */
font-family: Inter, 游ゴシック体, YuGothic, "游ゴシック Bold", "Yu Gothic Bold",
             游ゴシック, "Yu Gothic", dnp-shuei-gothic-kin-std, Meiryo, sans-serif;
```

**フォールバックの考え方**:
- **欧文を先頭に置く和欧二層。** Inter が欧文・数字・記号を拾い、和文は 2 番目以降の游ゴシックに落ちる
- **ウェイトごとにスタックを書き分ける**のがこのサイトの特徴。Windows では `font-weight: 700` と `"Yu Gothic Bold"` の両方で太さを指定し、400 側では `"Yu Gothic Medium"` を当てて細すぎを避ける
- **`dnp-shuei-gothic-kin-std` の位置は失敗。** 有料の Web フォントを読み込んでいるのに、游ゴシックより後ろにあるため使われない。**秀英角ゴシック金を使いたいなら `Inter` の直後（游ゴシックより前）に置く**
- 末尾の generic family は `sans-serif` 1 つ。途中に generic を挟んでいないのでスタックの全候補が生きている

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero (en) | Inter | 72px | 400 | 82px (1.14) | normal | `Scientific Thinking & Artistic Sense`。色 `#c0c4c9` |
| Display (en) | Inter | 48px | 700 | — | normal | `News` `Reports` `Overview` などの英語見出し |
| Heading 1 | 游ゴシック Bold | 18px | 700 | 28.1px (1.56) | 0.9px | 記事見出し |
| Heading 2 | 游ゴシック Bold | 16px | 700 | 20px (1.25) | 0.8px | セクション見出し |
| Nav / Link | 游ゴシック Bold | 15px | 700 | 48px (3.20) | 0.75px | グローバルナビ（行送りが大きい） |
| Body | 游ゴシック Bold | 14px | 700 | 20px (1.43) | 0.7px | **本文も 700**。トップ 157 要素・下層 111 要素で最多 |
| Caption | 游ゴシック Bold | 13px | 700 | 24px (1.85) | 0.65px | ユーティリティナビ |
| Meta | Inter / 游ゴシック | 14px | 500 | 24px (1.71) | 0.7px | 日付（`2026.10.29`） |
| Small | 游ゴシック | 12px | 400 / 700 | 32px (2.67) | 0.6px | フッターリンク |

> **weight 700 が 211/244 要素（86%）。** 「見出しほど太い」という前提は通用しない。本文もナビもラベルも 700 で、**薄くなるのはヒーローの英文（400）と日付（500）だけ**

### 3.5 行間・字間

- **`body { line-height: 36px }` という絶対値**。16px の本文に対して比率 2.25。**各要素が宣言し直さないと 36px の行送りがそのまま降りる**
- 実際の行間比は要素ごとに `1.43`（14px → 20px）が最多（トップ 105 要素）、次いで `1.38` `1.71` `1.56` `1.29`
- **`body { letter-spacing: 0.05em }` を書いた上で、各コンポーネントも `0.05em` を宣言し直す**。CSS には `0.05em` / `0.04em` / `0.01em` / `0px` / `inherit` が並ぶ
- 結果、字間はサイズに比例する: 12px→`0.6px` / 13px→`0.65px` / 14px→`0.7px` / 15px→`0.75px` / 16px→`0.8px` / 18px→`0.9px`

```css
html { line-height: 1.15; }
body {
  font-size: 16px;
  line-height: 36px;        /* ← 絶対値。子は自分で宣言し直す前提 */
  letter-spacing: 0.05em;
  font-feature-settings: "palt";
}
.card__title { font-size: 14px; line-height: 20px; letter-spacing: 0.05em; }  /* 再宣言する */
```

> **`line-height` を px で書いているので、宣言を忘れた要素は 36px の行送りで組まれる。** 14px の文字に 36px の行が付くと間延びする。**再現するときは必ず各ブロックで `line-height` を書く**
> **`letter-spacing` は逆に、各要素で `em` を書き直すのが正解。** `body` の `0.05em` だけに頼ると 0.8px が絶対値で降りてしまい、小さい文字で字間が広く、大きい文字で狭くなる

### 3.6 禁則処理・改行ルール

```css
body {
  word-break: normal;   /* 実サイトの computed 値。明示指定は無い */
}
```

- `word-break` / `overflow-wrap` / `line-break` の明示指定は無く、すべてブラウザ既定
- 改行位置は `<br>` と要素幅で作る

### 3.7 OpenType 機能

```css
body {
  font-feature-settings: "palt";   /* 1 行で 759 要素（トップ）/ 262 要素（下層）へ継承 */
}
```

- **`palt` は実際に効いている。** 実スタック・40px・weight 700 で `normal` **1040.63px** → `"palt"` **929.44px** ＝ **−10.68%**。游ゴシック体は `palt` テーブルを持っている
- 宣言位置は `body` の 1 行だけ。コンポーネント側では当て直していない
- 縦組みは使っていないので、`vpal` / `vhal` への切り替えは不要

### 3.8 縦書き

```css
/* 使用しない。writing-mode は 2 ページとも 0 要素 */
```

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#2641f0`
- Text: `#ffffff`
- Font Size: 14px / Weight 700 / Line Height 30px / Letter Spacing 0.7px
- Border Radius: 16px

**Secondary**
- Background: `#ffffff`
- Text: `#000000`
- Font Size: 14px / Weight 700
- Border Radius: 16px

**Tab / Filter**
- Background: `#e4e6eb`
- Text: `#000000`
- Font Size: 14px / Weight 700 / Line Height 22px
- Border Radius: 0px

### Badges / Chips

- カテゴリタグ: 面を塗らず `#2641f0` の文字だけ（14px / weight 700）
- 「開催中」バッジ: 面 `#2641f0` / 白文字
- 「開催まで N 日」: 面 `#e4e6eb` / 黒文字

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#cccfd3`
- Border Radius: 12px
- Padding: 10px 16px
- Font Size: 14px

### Cards

- Background: `#ffffff`
- Border: なし
- Border Radius: 12px（イベント・入試情報カード）
- Shadow: **なし**
- 円形要素: `border-radius: 50%`（トップ 23 要素。アイコン・スクロールインジケーター）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 32px |
| XXL | 64px |

> CSS 変数の自社トークンが 0 個なので**スケールは明示されていない**。上表は実測の `padding` / `line-height` の刻みから読み取った実用値

### Container

- Max Width: **920px**
- Padding (horizontal): 24px

### Grid

- Columns: 2〜3 列のカード。`display: flex` / `grid` で組む
- `gap` の宣言は 0 件。余白は `margin` で作る

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **サイト本体のすべての要素** |
| — | `rgb(255, 255, 255) 0px 0px 0px 0px` | 実測で出る唯一の値。オフセットもぼかしも 0 で**見えない** |

> **このサイトには影が存在しない。** 面の区別は色（`#ffffff` / `#e4e6eb` / `#cccfd3`）と `border-radius` だけで作る。**カードを浮かせたくなっても影を足さない**

---

## 7. Do's and Don'ts

### Do（推奨）

- **本文も含めて weight 700 で組む。** 400 を使うのはヒーローの英文とフッターの小さなリンクだけ
- ウェイトごとに `font-family` の別名を書き分ける（700 → `"游ゴシック Bold"` / 400 → `"游ゴシック Medium"`）
- **`letter-spacing: 0.05em` を各コンポーネントで宣言し直す。** `body` の継承だけに頼らない
- **`line-height` を各ブロックで必ず宣言する。** `body` の `36px` が降りると間延びする
- `font-feature-settings: "palt"` を `body` に 1 行書く（−10.7% 効く）
- 本文色は純黒 `#000000`、補助は `#838587`
- アクセントの青 `#2641f0` は文字色と CTA の面の両方に使う
- 区切りにはグラデーション帯（`linear-gradient(90deg, #f06e1d, #cccfd3 20%, #cccfd3 30%, #2641f0 50%, #cccfd3 70%, #cccfd3 80%, #f06e1d)`）を使う
- コンテナは 920px。本文は 14px / 行間 1.43

### Don't（禁止）

- **`dnp-shuei-gothic-kin-std` を游ゴシックより後ろに置かない。** 実サイトはそうなっているため、読み込んだ有料フォントが 1 文字も使われていない。**使いたいなら `Inter` の直後に置く**
- **「見出しだけ太い」設計にしない。** 実サイトは 86% の要素が 700
- **`line-height` を px の絶対値で各要素に配らない。** `body` の `36px` は実サイトの事実だが、再現するなら各ブロックで比率として宣言し直す
- **`letter-spacing` を `body` だけに書いて済ませない。** px で降りてしまい、サイズごとの比例が崩れる
- **影を落とさない。** `box-shadow` はサイト本体に 1 つも無い
- **Inter に weight 700 を期待しない。** 読み込んでいるのは 400 / 500 / 600 の 3 本だけで、700 は合成太字になる
- **WordPress / Gutenberg の CSS 変数（`--wp--preset--*` など 60 個）を設計トークンとして扱わない。** 自社トークンは 0 個
- **本文色を `#111111` などに丸めない。** 実サイトは純黒 `#000000`
- **グラデーション帯の停止位置を丸めない**（20% / 30% / 50% / 70% / 80%）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 675px | `(max-width: 675px)` が 1 件 |
| Tablet | ≤ 1023px | `(max-width: 1023px)` が **54 件で最多**。主たる切り替え点 |
| Desktop | ≥ 1024px | `(min-width: 1024px)` が 3 件 |
| Wide | ≥ 1440px | `(min-width: 1440px)` が 10 件。大画面で余白を広げる |

> その他 `(max-width: 1280px)` 12 件 / `(max-width: 1340px)` 3 件 / `(max-width: 768px)` 2 件

### ルートと本文サイズ

- `html { font-size: 16px }` / `body { font-size: 16px }`（`14px` の宣言も併存）
- **1920 / 1600 / 1440 / 1280 / 1200 / 1080 / 1079 / 1024 / 992 / 834 / 768 / 767 / 600 / 480 / 414 / 390 / 375 / 360 / 320px の 19 幅すべてで `html` も `body` も 16px から 1px も動かない。** 流体スケーリングは使っていない
- 本文（`<p>`）だけ **992px 以下で 16px → 14px** に切り替わる

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- 実サイトの CTA は高さ 30px の行送りで、**タッチ領域としてはやや小さい**。再現時は padding で確保する

### フォントサイズの調整

- 本文 14px はモバイルでも変えない
- ヒーローの 72px はモバイルで縮む（`(max-width: 1023px)` のメディアクエリ内で調整）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #2641f0
Accent: #f06e1d（グラデーション帯の両端のみ）
Text Color: #000000
Text Secondary: #838587
Background: #ffffff
Surface: #e4e6eb / #cccfd3
CTA: #2641f0 の面 + 白文字 / radius 16px
Font: Inter, 游ゴシック体, YuGothic, "游ゴシック Bold", "Yu Gothic Bold",
      游ゴシック, "Yu Gothic", dnp-shuei-gothic-kin-std, Meiryo, sans-serif
      （weight 400 側は "游ゴシック Medium", "Yu Gothic Medium" に差し替える）
Body Size: 14px
Font Weight: 700（ほぼ全部）
Line Height: 1.43（各ブロックで必ず宣言する）
Letter Spacing: 0.05em（各ブロックで宣言し直す）
font-feature-settings: "palt"（body に 1 行）
box-shadow: 使わない
Container: 920px
```

### プロンプト例

```
IAMAS のデザインシステムに従って、お知らせ一覧ページを作成してください。
- font-family は上記スタック。weight 700 の要素は "游ゴシック Bold" 版、
  400 の要素は "游ゴシック Medium" 版に書き分ける
- body に font-feature-settings:"palt" と letter-spacing:0.05em を書き、
  各ブロックでも letter-spacing:0.05em と line-height を宣言し直す
- 本文 14px / weight 700 / line-height 1.43、見出し 18px / 700 / 1.56
- 本文色は #000000、カテゴリタグは #2641f0 の文字、日付は 14px/500
- CTA は #2641f0 の面に白文字 14px/700、border-radius 16px
- カードは白地 + border-radius 12px、影は付けない
- セクションの区切りに
  linear-gradient(90deg,#f06e1d,#cccfd3 20%,#cccfd3 30%,#2641f0 50%,#cccfd3 70%,#cccfd3 80%,#f06e1d)
  の帯を使う
- コンテナ幅は 920px、主なブレークポイントは 1023/1024px
```
