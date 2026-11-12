# DESIGN.md — 日本触媒（NIPPON SHOKUBAI）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-12 / 対象: `https://www.shokubai.co.jp/ja/`, `/ja/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **黒も灰色も緑に寄せる。** 本文は `#222926`、補助テキストは `#6c7872`、影は `rgba(42,87,71,α)`。純黒・純灰を一つも使わず、**ニュートラル全体にブランドの緑を混ぜている**
- **密度**: 中。本文 15〜16px / 行間 1.5。吹き出しのイラストを敷いたヒーローで賑やかに始まり、下層は白地で整然と並ぶ
- **キーワード**: 触媒グリーン、緑みの黒、グラデーションの下線、`0.03em`、Inter

**このサイトの核心は3つある。**

1. **`letter-spacing: 0.03em` を `body` に 1 行だけ。** 可視 117 要素中 **110 要素が `0.48px`**（下層は 87 中 80 要素）。`em` 宣言だが **px の絶対値で降りる**ので、12px の要素では実質 0.04em、18px の見出しでは 0.027em と**文字が大きいほど字間が薄まる**。それでいいという設計
2. **`font-feature-settings` が CSS 全文に 1 件も無い。** 実測も 0 件。だが Noto Sans JP は `palt` を持っており、同一ページでの実測は `normal` 868.75px → `"palt"` 773.80px の **−10.9%**。**効くのに使っていない**ので、足すと全ページが一段詰まる
3. **ニュートラルが緑みを帯びている。** 本文 `#222926`（R22 G29 B26 の緑寄り）、補助 `#6c7872`、カードの影 `rgba(42,87,71,0.1)` / `rgba(42,87,71,0.13)`。**`#333333` や `rgba(0,0,0,.1)` に置き換えると温度が変わる**

> **CSS Custom Properties は 59 個あるが、設計トークンは 0 個。** `--arkb-shadow` `--arkb-notice_bg` `--arkb-qa_color` など 10 個が **Arkhe Blocks（WordPress プラグイン）**、残り 49 個が **WordPress / Gutenberg の preset**。色もサイズも CSS に直書きされている。

> **ヒーローの大見出しは画像。** `提案する化学。` は `home_txt_mainVisual.webp`（557×89px）。しかも **`alt` は「提案する科学」**（「化」が「科」・句点なし）。実装を真似るときは `alt` を画像どおりに直す。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **触媒グリーン（面）** | **`#009961`** | **可視 11 要素の塗り面**。`製品情報を探す` `課題解決事例を見る` `投資家情報TOP` のピル、下層の全ボタン |
| **触媒グリーン（文字・線）** | **`#008756`** | ロゴの SVG、リンク文字、枠線、`すべて`。可視 2 要素 ＋ SVG の `fill`/`stroke` |
| Green（CMP） | `#008765` | Cookie バナーの `詳細設定` のみ。サイト本体では使わない |

> **面と文字で緑が違うのは実装の実態。** 面は `#009961`、文字と線は `#008756`。**どちらも実装されている**ので、新規実装では「塗りは `#009961`、文字と罫線は `#008756`」と使い分ける。

### Accent

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **ディープブルー** | **`#27455c`** | 可視 6 要素。製品カテゴリーの面 |
| **マーカーイエロー** | `#ffdc40` | `--arkb-marker-color`（Arkhe Blocks のマーカー線）。`linear-gradient(transparent 1em, #ffdc40 0)` で下半分だけ塗る |

### Neutral（ニュートラル）

- **Text Primary** (`#222926`): 本文・見出し。**可視 63 要素**。**緑みを帯びた黒**。純黒は使わない
- **Text Muted** (`#6c7872`): ユーティリティナビ、注記。可視 19 要素。**こちらも緑み**
- **Text on Dark** (`#ffffff` / `rgba(255,255,255,.8)` / `rgba(255,255,255,.3)`): 色面・フッター。`.3` は非選択の言語リンク
- **Text Light Gray** (`#b1bab7`): パンくずの現在地。可視 1 要素。**やはり緑み**
- **Surface Gray** (`#f0f2f2`): 検索フォームの面 / `#f4f4f4`: 表の縞
- **Background** (`#ffffff`): `body`

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP**。Google Fonts（`css2?family=Inter:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700`）。**400 / 500 / 700 の 3 ウェイトすべてが `loaded`**
- **明朝体**: 使わない

### 3.2 欧文フォント

- **サンセリフ**: **Inter**。同じ Google Fonts の URL で 400 / 500 / 700 を読み込み、**3 本とも `loaded`**
- **スタックの先頭に置かれている**ので、欧文・数字は Inter、和文は Noto Sans JP に落ちる（1 本のスタックで自動的に切り替わる）

### 3.3 font-family 指定

```css
/* 本文（body に 1 回） */
font-family: Inter, "Noto Sans JP", sans-serif;

/* アイコンフォント */
font-family: "icon";

/* 他言語ページ */
font-family: "Noto Sans SC", sans-serif;   /* 簡体字中国語 */
font-family: "Noto Sans KR", sans-serif;   /* 韓国語 */
```

**フォールバックの考え方**:
- **欧文優先の和欧二層を、1 本のスタックで作っている。** Inter は和文グリフを持たないので、日本語は自動的に 2 番目の Noto Sans JP に落ちる。可視 116 要素（下層 86 要素）がこの 1 スタック
- **多言語は `text=` 付きの別 URL で最小配信**している。`Noto Sans SC` は `text=中文`、`Noto Sans KR` は `text=한국어` と、**言語切替ラベルの 3〜4 文字だけ**を読む。だから `Noto Sans KR` は `unloaded` のまま（韓国語の文字が日本語ページに無いため）
- フォント要求は 34 件（`fonts.gstatic.com` 33 ＋ 自社ホストの `icon.woff` 1）

### 3.4 文字サイズ・ウェイト階層

`html` は **16px で全幅固定**（`html { font-size }` の宣言自体が無く UA 既定）。`body` だけが 768/767px の境目で **16px → 15px** に落ちる（8 章参照）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero | — | — | — | — | — | **`提案する化学。` は WebP 画像**（557×89px） |
| Display | Noto Sans JP | 46px | 500 | — | 0.48px (0.010em) | `人と社会に豊かさと快適さを` |
| Heading 1 | Noto Sans JP | 24px | 700 | 33.6px (1.4) | 0.48px (0.020em) | `企業情報` `研究開発` |
| Heading 2 | Noto Sans JP | 20px | 500 / 700 | 30px (1.5) | 0.48px (0.024em) | 製品カテゴリー名 |
| Heading 3 | Noto Sans JP | 18px | 500 / 700 | 27px (1.5) | 0.48px (**0.027em**) | 下層の項目見出し |
| Lead | Noto Sans JP | 16px | 400 | 32px (**2.0**) | 0.48px (0.030em) | ヒーロー脇のリード文 |
| Body | Noto Sans JP | 16px | 400 / 700 | 24px (1.5) | 0.48px (0.030em) | 本文（可視 25 要素） |
| List / Nav | Noto Sans JP | 15px | 400 / 500 / 700 | 22.5px (1.5) | 0.48px (0.032em) | **可視 46 要素で最多** |
| Date | Inter | 13px | 400 | 14.95px (1.15) | 0.48px (0.037em) | `2026.11.11` |
| Caption | Noto Sans JP | 12px | 400 | 21px (1.75) | 0.48px (**0.040em**) | ユーティリティ（18 要素） |
| Copyright | Inter | 11px | 400 | 13.97px (1.27) | 0.48px (0.044em) | |
| Micro | Noto Sans JP | 9px | 400 | — | 0.48px | `PAGE TOP` |

**ウェイトは 400 / 500 / 700 の 3 段。** Google Fonts の URL が `wght@400;500;700` なので**これ以外は実在しない**。和文の実測幅も 100〜400 が 868.75px / 500 が 870.25px / 600〜900 が 873.25px の **3 面だけ**で、`600` を指定すると 700 が出る。

### 3.5 行間・字間

```css
body {
  font-family: Inter, "Noto Sans JP", sans-serif;
  font-size: 16px;
  letter-spacing: 0.03em;   /* ← 0.48px という絶対値で降りる */
  line-height: 1.5;         /* ← 無単位。各要素が自分のサイズで再計算 */
  color: #222926;
}
```

- **字間と行間で継承のしかたが逆。** `letter-spacing: 0.03em` は **0.48px が全子孫へ降りる**（可視 110/117 要素）。font-size が違っても px は同じなので、**em 換算すると 9px で 0.053em、46px で 0.010em とばらつく**。`line-height: 1.5` は無単位なので 15px → 22.5px / 16px → 24px と**各要素で再計算**される
- **CSS に書かれている `letter-spacing` は 5 種**（`normal` / `0.01em` / `0.03em` / `0.035em` / `0.08em`）だが、**実装されているのは `0.03em` の継承だけ**。他はほぼ可視 0
- **行間の宣言値に割り切れない小数が並ぶ**: `1.4166666667` `1.5333333333` `1.6428571429` `1.2727272727` `1.0666666667` `1.4285714286`。これは**デザインツールの px 値を font-size で割った値**（例: 23 ÷ 15 = 1.5333、23 ÷ 14 = 1.6429）。**無単位のまま写す**（px に直すと縮小時に崩れる）
- 本文の既定は **1.5**。リード文だけ **2.0**、カプションは **1.75**、日付は **1.15**

### 3.6 禁則処理・改行ルール

```css
/* body に宣言なし（UA 既定） */
word-break: normal;
```

`body` の `word-break` は `normal`、`line-break` の宣言も無い。**日本語の禁則は UA 任せ**。

### 3.7 OpenType 機能

```css
/* 宣言なし。CSS 全文に font-feature-settings が 1 件も無い */
```

- **実測 0 要素**（両ページとも）。`palt` も `halt` も使っていない
- **書体が持っていないのではない。** 同一ページ・同一書体（Noto Sans JP）での実測は `normal` 868.75px → `"palt"` 773.80px（**−10.9%**）、`"halt"` 788.75px（−9.2%）。**効くのに使っていない**
- **既存ページに合わせるなら足さない。** 足すと本文もナビも一段詰まり、`letter-spacing: 0.03em` で作った字送りが別物になる

### 3.8 縦書き

該当なし（`writing-mode: vertical-rl` は 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（ピル／トップ）**
- Background: `#009961`
- Text: `#ffffff`
- Padding: **`16px 36px 14px`**（下だけ 2px 浅い）
- Border Radius: **`100px`**
- Font Size: 16px / Weight 700 / `letter-spacing: 0.48px`

**Primary（角／下層）**
- Background: `#009961`
- Text: `#ffffff`
- Border: `1px solid #009961`
- Padding: `12px 30px`
- Border Radius: **`2px`**
- Font Size: 14.4px / Weight 700

**Secondary（白抜き）**
- Background: `#ffffff`
- Text: `#008756`
- Border: `1px solid #008756`
- Padding: `12px 10px`
- Border Radius: `2px`
- Font Size: 13.008px / Weight 600

> **トップは `100px` のピル、下層は `2px` の角**。同じサイトで CTA の形が違うので、**ページの階層に合わせる**。

### Links（グローバルナビ）

```css
a {
  text-decoration: none;
  background-image: linear-gradient(
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0) calc(100% - 1.1px),
    rgb(255,255,255)    calc(100% - 1px),
    rgb(255,255,255)    100%);
  background-size: 0 100%;        /* ← ホバーで 100% 100% に伸ばす */
  background-repeat: no-repeat;
}
```

- **可視 14 要素。** `text-decoration` を使わず、**背景のグラデーションで 1px の下線を引いている**。`background-size` の幅を 0 → 100% にすることで**下線が左から伸びるアニメーション**になる
- 色面の上（白文字）なので線も白。本文中のリンクでは線の色を変えて同じ手を使う

### Cards

- Background: `#ffffff`
- Border Radius: **`5px`**
- Shadow: `rgba(42,87,71,0.1) 4px 4px 25px 0` / `rgba(42,87,71,0.13) 2px 2px 15px 0`
- Padding: カードごと（gap は `59px 40px`）

### Inputs

- Background: `#f0f2f2`
- Border Radius: `5px`
- 検索ボタンは `#009961`

---

## 5. Layout Principles

### Spacing Scale

gap の実測は少ないが（`4px` / `40px` / `59px 40px`）、CTA の padding から読み取れる刻みは **2 の倍数 ＋ 10 の倍数**の混成。

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 10px |
| M | 14〜16px |
| L | 30〜36px |
| XL | 40px |
| XXL | 59px |

### Container

- `max-width` の宣言が実質無く（`100%` のみ）、**内側の padding とグリッドで幅を作る**
- ブレークポイントは `min-width: 768px` と `min-width: 1101px` の 2 段

### Grid

- 下層の項目一覧は 2 列、gap `59px 40px`

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定 |
| 1 | `rgba(42,87,71,0.13) 2px 2px 15px 0` | 小さなカード（下層で可視 4 要素） |
| 2 | `rgba(42,87,71,0.1) 4px 4px 25px 0` | 大きなカード（可視 2 要素） |

- **影の色が黒ではない。** `rgb(42,87,71)` は**緑みの濃いグレー**で、本文色 `#222926` と同じ系統
- **オフセットが X/Y とも正の同値**（`2px 2px` / `4px 4px`）。右下に均等に落とす
- **浅い方が不透明度が高い**（0.13）、深い方が低い（0.1）という逆転がある。実装どおりに写す
- `rgba(0,0,0,0.2) 0 0 18px 0` は **OneTrust（CMP）のバナー**。サイト本体では使わない

---

## 7. Do's and Don'ts

### Do（推奨）

- `body` に `letter-spacing: 0.03em` と `line-height: 1.5` を **1 回だけ**書き、子要素では再宣言しない
- `font-family` は `Inter, "Noto Sans JP", sans-serif` の **1 本のスタック**。欧文を別クラスで切り替えない
- ニュートラルは**緑みのある値**を使う（本文 `#222926`、補助 `#6c7872`、淡い灰 `#b1bab7`）
- 影の色は `rgba(42,87,71,α)`。オフセットは X/Y 同値
- CTA は**トップなら `border-radius: 100px` のピル、下層なら `2px` の角**
- 面の緑は `#009961`、文字・罫線の緑は `#008756`
- 行間の小数（`1.5333333333` など）は**無単位のまま**写す
- 多言語の書体は `text=` 付きの Google Fonts URL で**必要な文字だけ**読む

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** 効くが使っていない設計。足すと −10.9% 詰まって別物になる
- **`letter-spacing` を `em` のまま子要素へ配らない。** `body` の `0.03em` は `0.48px` という絶対値で降りており、46px の見出しでも 0.48px。**文字が大きいほど字間が薄まるのが設計**
- **`line-height` を px で書かない。** 無単位なので 768px 以下で `body` が 15px に落ちたとき 22.5px に追従する
- **`font-weight: 600` を使わない。** Google Fonts は `wght@400;500;700` しか読んでおらず、**600 は 700 で出る**
- **ヒーローの `提案する化学。` を Web フォントで組み直さない**（WebP 画像）
- 影を `rgba(0,0,0,α)` に置き換えない
- 本文に `#000000` / `#333333` を使わない（緑みが消える）
- CSS Custom Properties を前提にしない（**`--arkb-*` は WordPress プラグイン、`--wp--preset--*` は Gutenberg の既定値**で、自社トークンは 0 個）

---

## 8. Responsive Behavior

### Breakpoints

CSS の `@media` 実測で最多は `screen and (min-width: 768px), print`（237 回）と `screen and (max-width: 767px)`（216 回）。**`print` を抱き合わせているのが特徴**で、印刷時はデスクトップ版のレイアウトになる。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | **`body` が 15px に落ちる** |
| Small | ≤ 640px | さらに細かい調整（16 件） |
| Tablet / Desktop | ≥ 768px | 既定 |
| Wide | ≥ 1101px | 追加の調整（14 件） |

### ルート・本文サイズの切り替え

**`html` は 16px で全幅固定**（`html { font-size }` の宣言自体が無い）。**切り替わるのは `body` だけ。**

| 幅 | `html` | `body` font-size | line-height | letter-spacing |
|---|---|---|---|---|
| 1920 / 1440 / 1200 / 1024 / 834 / **768**px | 16px | **16px** | 24px | **0.48px** |
| **767** / 414 / 375 / 374px | 16px | **15px** | 22.5px | **0.45px** |

- 境目は **768 / 767px の 1px**。834px も 375px も測るだけでは段差が見えない
- `line-height: 1.5`（無単位）と `letter-spacing: 0.03em` が**どちらも追従する**（24 → 22.5px、0.48 → 0.45px）
- **`letter-spacing` を px に読み替えて書くとモバイルで字間が合わなくなる**

### タッチターゲット

- トップのピルは `padding: 16px 36px 14px` ＋ 16px で高さ 54px。下層の角ボタンは `12px 30px` ＋ 14.4px で 48px。**どちらも 44px 以上**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary (fill): #009961
Primary (text/border): #008756
Accent Blue:    #27455c
Text Color:     #222926   ← 緑みの黒
Text Muted:     #6c7872   ← 緑みの灰
Background:     #ffffff
Surface:        #f0f2f2
Font:           Inter, "Noto Sans JP", sans-serif
Weights:        400 / 500 / 700 のみ（600 は 700 で出る）
Root:           html 16px 固定／body は 767px 以下で 15px
Body Size:      15px（一覧・ナビ）／ 16px（本文）
Line Height:    1.5（無単位）／ リード 2.0 ／ caption 1.75
Letter Spacing: 0.03em（body に 1 回。px で継承される）
Font Feature:   なし（palt を足さない）
Button Radius:  100px（トップ）／ 2px（下層）
Card Radius:    5px
Shadow:         rgba(42,87,71,.1) 4px 4px 25px / rgba(42,87,71,.13) 2px 2px 15px
```

### プロンプト例

```
日本触媒のデザインシステムに従って、製品一覧ページを作成してください。

- body に font-family: Inter, "Noto Sans JP", sans-serif / font-size: 16px /
  letter-spacing: 0.03em / line-height: 1.5 / color: #222926 を 1 回だけ書く
- font-feature-settings は書かない
- 見出しは 24px / 700 / line-height: 1.4、項目見出しは 18px / 500
- 一覧の本文は 15px / 400、補助テキストは 12px / #6c7872
- CTA は #009961 の塗り、文字は白、border-radius: 100px、padding: 16px 36px 14px、16px / 700
- 下層のボタンは border-radius: 2px、padding: 12px 30px、14.4px / 700
- 白抜きボタンは #008756 の文字と 1px の枠
- カードは白面 + border-radius: 5px + box-shadow: rgba(42,87,71,.1) 4px 4px 25px 0
- グローバルナビのリンクは text-decoration を使わず、
  linear-gradient で calc(100% - 1px) の位置に 1px の下線を引き、
  background-size: 0 100% → 100% 100% のホバーで伸ばす
- font-weight に 600 を使わない（400 / 500 / 700 のみ）
- 767px 以下で body を 15px に落とす（line-height と letter-spacing は追従させる）
```
