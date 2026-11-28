# DESIGN.md — 立教大学（RIKKYO UNIVERSITY）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-28 / 対象: `https://www.rikkyo.ac.jp/`, `https://www.rikkyo.ac.jp/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **筑紫書体 5 本を FontPlus で動的配信する、書体主導の設計。** 色は黒・白・グレーの 3 段で、ブランドの紫 `#541b86` は校章まわりに 1 点だけ。装飾ではなく**書体のウェイト差で階層を作る**
- **密度**: 高い。大学サイトらしく告知・ニュース・イベントが並ぶが、**行間は `1.5em` の絶対値 21px で統一**され、カードの角丸も 3px に抑えられている
- **キーワード**: 筑紫ゴシック Pr5、筑紫明朝 Pr6、FontPlus、root 14px、縦組みの小見出し

**このサイトの核心は 4 つある。**

1. **和文は FontPlus の動的配信で筑紫書体 5 本。** `TsukuGoPr5-R / -M / -D / -L`（筑紫ゴシック Pr5 の 4 ウェイト）＋ `TsukuMinPr6-L`（筑紫明朝 Pr6 L）。CDP の `CSS.getPlatformFontsForNode` で実際に描画されているのは **`SBT-TsukuGo Pr5`**。`@font-face` は FontPlus の既定どおり**全部 `font-weight: bold` で宣言される**ので、**太さは `font-weight` ではなくファミリー名で切り替える**
2. **`font-feature-settings: "kirn"` を `body` に書いて 1166 要素へ継承させているが、`kirn` は登録された OpenType タグではない。** 実測（実スタック・40px）は `normal` **1009.28px** ＝ `"kirn"` **1009.28px**（**±0.00**）。同じ書体で `"palt"` なら **899.05px（−10.9%）**、約物だけの文字列なら **−35.1%**。**筑紫ゴシックは `palt` を持っているのに、1 文字も詰まっていない**
3. **ルートは `html { font-size: 87.5%; line-height: 1.5em }`。** `87.5%` ＝ **14px**（≤640px では **13px**）で、**`1.5em` は 21px という絶対値**になって全子孫に降りる。実測で 14px/21px＝1.50、13px/21px＝**1.62**、11px/21px＝**1.91** と、**文字が小さいほど行間比が大きくなる**
4. **CSS Custom Properties が 0 個。** `:root` にも `body` にも 1 つも無く（CORS で読めなかったシートは Google Fonts の CSS 1 枚のみ）、色もサイズも**全部直書き**。`font-size: 28px; font-size: 2rem` という **px → rem の二重宣言**で旧ブラウザに保険をかける 2010 年代前半の書き方がそのまま残っている

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **立教パープル** | **`#541b86`** | ページ最外周のラッパー（`div.p-superwrapper`）の地色と、Instagram ラベルの丸（`border-radius: 138px`）。**可視の文字色としては 1 要素**。使いどころを絞った校章色 |
| Dark Surface | `#333333` | 日付バッジ（`11/28`）の面。**可視 31 要素** |

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 152 要素（トップ）で最多**。**このサイトは本文に純黒を使う**
- **Text Primary (下層)** (`#222222`): 下層ページの見出し・本文（可視 13 / 5 要素）
- **Text Muted** (`#999999`): 日付、`WHAT'S NEW`（可視 34 要素）
- **Text on Dark** (`#ffffff`): 面の上の文字（可視 77 / 26 要素）
- **Text Caption** (`#666666`): リード文、`「自由の学府」へようこそ`
- **Text Footer** (`#878787`): コピーライト、SNS 見出し
- **Label (欧文)** (`#cbcbcb` / `#cccccc`): `TRADITION` `FOUNDING PRINCIPLES` などの Lato の小見出し。**2 つの近いグレーが併存している**。白地に対するコントラスト比は **1.62** で WCAG AA（4.5:1）を大きく下回る。**必ず白地の上に置く**（`#f5f5f5` の面に乗せると 1.49 まで落ちて読めなくなる）。新規実装では `#999999`（白地で 2.85）以上に上げることを検討する
- **Border** (`#cccccc`): ボタンの枠、見出し下の 50×4px の帯
- **Surface** (`#f5f5f5`): カードの面（**可視 60 要素で最多の面色**）
- **Surface Light** (`#f9f8f5`): `p-whats` セクション
- **Surface Lighter** (`#f9f9f9`): 下層の `about-top` セクション
- **Divider** (`#eeeeee` / `#dddddd`): 区切り線
- **Background** (`#ffffff`): ページ背景。**`html` / `body` ともに塗り指定が無く**、`div.p-supercontainer` が白を敷いている

---

## 3. Typography Rules

### 3.1 和文フォント

**FontPlus（`webfont.fontplus.jp`）の動的配信で、筑紫書体を 5 本読み込む。**

| CSS のファミリー名 | 書体 | 役割 | 実測 |
|---|---|---|---|
| `TsukuGoPr5-R` | 筑紫ゴシック Pr5 **R（Regular）** | 既定の本文・`body` | **117 要素（トップ）** |
| `TsukuGoPr5-D` | 筑紫ゴシック Pr5 **D（DemiBold）** | ナビ、パンくず、キャプション見出し | 35 / 13 要素 |
| `TsukuGoPr5-M` | 筑紫ゴシック Pr5 **M（Medium）** | 中間の見出し | 31 要素 |
| `TsukuGoPr5-L` | 筑紫ゴシック Pr5 **L（Light）** | `.main` 配下の本文 | 8 / 12 要素 |
| `TsukuMinPr6-L` | 筑紫明朝 Pr6 **L（Light）** | 縦組みの小見出し、施設紹介 | 21 / 3 要素 |

- **約物のサブセット**として `YakuHanJP`（`loaded`）と `YakuHanJP-Light`（トップのみ `loaded`）をスタックの先頭に置く。`-Thin` `-DemiLight` `-Medium` `-Bold` `-Black` も宣言されているが **`unloaded`**
- **`@font-face` はすべて `font-weight: bold` 宣言**（FontPlus の配信仕様）。**同じファミリーに `font-weight: 700` を当てても太くならず、合成太字も起きない**

### 3.2 欧文フォント

- **Lato**（Google Fonts / 400・700）: `LANGUAGE` `ABOUT US` `TRADITION` などの小見出し、日付。実測 13〜63 要素。受け皿は **`"Gill Sans", sans-serif`**
- **EB Garamond**（Google Fonts / 400）: トップでのみ `loaded`。下層では `unloaded`
- `icomoon`（アイコンフォント・自社ホスト）、`VideoJS`、`Adobe Blank`

### 3.3 font-family 指定

```css
/* body（既定） */
body {
  font-family: YakuHanJP, TsukuGoPr5-R,
               "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
               "メイリオ", Meiryo, Osaka,
               "MS UI Gothic", "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  text-rendering: optimizeLegibility;
  font-size: 14px;
  font-size: 1rem;
  font-feature-settings: "kirn";          /* ← 無効なタグ。3.7 を参照 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 見出し（和文・Light） */
.c-title.c-title--ja {
  font-family: YakuHanJP-Light, TsukuGoPr5-L,
               "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
               "メイリオ", Meiryo, Osaka,
               "MS UI Gothic", "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
}

/* キャプション見出し・ナビ（DemiBold） */
.c-title-caption {
  font-family: YakuHanJP, TsukuGoPr5-D, /* …同じ受け皿… */ sans-serif;
}

/* 縦組みの小見出し（明朝） */
font-family: YakuHanJP-Light, TsukuMinPr6-L,
             "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN",
             HG明朝E, "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif;

/* 欧文ラベル */
font-family: Lato, "Gill Sans", sans-serif;
```

**フォールバックの考え方**:
- **約物サブセット → 筑紫書体 → ヒラギノ → メイリオ → MS 系 → generic** の 9〜10 段。`palt` を使わない代わりに **`YakuHanJP` で約物だけを詰める**
- **実サイトには受け皿の無い裸のファミリー宣言が 5 箇所ある**。真似しないこと:

```css
/* 実サイトの宣言（受け皿が無い＝配信が落ちると UA 既定の Times 系に落ちる） */
.main { font-family: TsukuGoPr5-L; }
.p-gh .p-gn .p-gn__links li.p-gn__link > a .p-gn__link__text { font-family: TsukuGoPr5-D; font-weight: 500; }
.p-gh .p-bread { font-family: TsukuGoPr5-D; font-weight: 500; }
.sub-link1, .sub-link2, .sub-title02-mes { font-family: TsukuGoPr5-D; }
.about-top-title { font-family: TsukuGoPr5-R; }

/* 正しくは */
.main { font-family: YakuHanJP-Light, TsukuGoPr5-L, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", sans-serif; }
```

### 3.4 文字サイズ・ウェイト階層

ルートは **`html { font-size: 87.5% }` ＝ 14px**（≥641px）／ **13px**（≤640px）。CSS は `font-size: 50px; font-size: 3.57143rem;` のように **px → rem の二重宣言（後勝ち）**で書かれ、**rem の値はすべて「px ÷ 14」**。

| rem の宣言 | デスクトップ（root 14px） | モバイル（root 13px） |
|---|---|---|
| `.85714rem` | **12px** | 11.14px |
| `.92857rem` | 13px | 12.07px |
| `1rem` | **14px** | 13px |
| `1.14286rem` | 16px | 14.86px |
| `1.28571rem` | 18px | 16.71px |
| `1.85714rem` | 26px | 24.14px |
| `2rem` | 28px | 26px |
| `2.14286rem` | 30px | **27.86px** |
| `2.28571rem` | 32px | 29.71px |
| `3.57143rem` | **50px** | **46.43px** |

> **モバイルでは全サイズが 7.1% 小さくなる。** ブレークポイントで個別に指定し直しているのではなく、**ルートが 14px → 13px に落ちる副作用**。`fontSize` の分布に `10.9999px` `17.9999px` `24.0001px` のような端数が並ぶのはこの `%` 換算の丸め。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Page Title** | TsukuGoPr5-R | **50px** (3.57143rem) | 400 | **1.30** (65px) | normal | `立教大学についてABOUT US` |
| Hero Copy | TsukuGoPr5-L | 36px | 400 | 1.30 | normal | トップの大見出し |
| **Vertical Title** | **TsukuGoPr5-R** | **34px** | 400 | **1.30** (44.2px) | normal | **縦組み**。`設立の背景` `建学の精神` |
| Section Title | TsukuGoPr5-R | 32px (2.28571rem) | 400 | 1.30 | normal | `.department-title` |
| Vertical Title (明朝) | TsukuMinPr6-L | 28px | 400 | 1.30 | normal | **縦組み**。`学部から探す` |
| Sub Title | TsukuGoPr5-R | 26px (1.85714rem) | 400 | 1.30 | normal | `.sub-title01` |
| Lead | TsukuGoPr5-L | **24px** (24.0001px) | 500 | **1.80** (43.2px) | normal | `「自由の学府」へようこそ` |
| Card Title | TsukuGoPr5-M | 20px | 400 | 1.30 | normal | — |
| Nav Item | TsukuGoPr5-D | 16px (1.14286rem) | 500 | 1.30 | normal | — |
| **Body** | TsukuGoPr5-R | **14px** (1rem) | 400 | **1.50** (21px) | normal | **可視 117 要素で最多** |
| Body (下層) | TsukuGoPr5-L | 14px / 15px | 400 | **1.80** (25.2px) | normal | `.about-top-mes` |
| Breadcrumb | TsukuGoPr5-D | 13px (.92857rem) | 500 | **1.62** (21px) | normal | **絶対値 21px が降りる** |
| **Label (EN)** | **Lato** | **12px** (.85714rem) | **700** | 1.00〜1.91 | **1px** | `TRADITION` `ABOUT US` |
| Small (EN) | Lato | 11px (10.9999px) | 700 | **1.91** (21px) | 1px | `LANGUAGE` |

**ウェイトは 400 / 500 / 700 の 3 段**（実測 400 が 216 要素、700 が 61、500 が 4）。ただし**和文の 500 と 700 は効いていない**。筑紫書体は 4 ファミリーとも `@font-face` で `font-weight: bold` と宣言されているため、`font-weight` を変えても同じファイルが返る。**700 が効いているのは Lato（欧文）だけ**。

### 3.5 行間・字間

**行間の既定は `html { line-height: 1.5em }`。`em` なので 14px × 1.5 ＝ 21px という絶対値が全子孫に降りる。**

| 要素のサイズ | 継承される行送り | 結果の行間比 | 実測 |
|---|---|---|---|
| 15px | 21px | **1.40** | 1 要素 |
| 14px | 21px | **1.50** | 既定 |
| 13px | 21px | **1.62** | 4 要素 |
| 11px | 21px | **1.91** | 2 要素 |

- **小さい文字ほど行間が広がる。** これは意図ではなく `1.5em` の副作用
- 見出し・本文ブロックは自分で宣言し直している: 見出し **1.30**（29〜66 要素）、リード・本文 **1.80**（15〜17 要素）、カードリスト **1.75**（40 要素）
- モバイル（root 13px）では継承値が **19.5px** に変わる

**字間は和文が全部 `normal`**（実測 281/281・63/74）。CSS 全文の `letter-spacing` 宣言は 2 種類しかない。

```css
letter-spacing: 1px;    /* Lato の欧文ラベルのみ（.sub-en / .sub-title-en01 / .a-hed-title-en / .relation-title / .pagetop-btn span） */
letter-spacing: -1px;   /* .achievement-mes（18px）1 箇所だけ */
```

**ガイドライン**:
- **和文に `letter-spacing` を足さない。** このサイトの和文の字面は筑紫書体のメトリクスそのまま
- 欧文の小見出しだけ **`1px`**（12px に対して 0.083em 相当）
- `line-height` を `1.5em` のまま写すと**絶対値が降りる**。**無単位の `1.5` に書き換えると別物になる**ので、再現するなら `em` のまま書く

### 3.6 禁則処理・改行ルール

```css
.main { word-wrap: break-word; }   /* 実サイトの宣言はこれだけ */
```

- `word-break` / `line-break` / `auto-phrase` の宣言は無い
- `text-rendering: optimizeLegibility` を `body` に宣言

### 3.7 OpenType 機能

```css
/* 実サイトの宣言（body・1166 要素へ継承） */
body {
  font-feature-settings: "kirn";
  -webkit-font-feature-settings: "kirn";
  -moz-font-feature-settings: "kirn";
  -moz-font-feature-settings: "kirn=1";   /* Firefox 3.6 時代の旧構文 */
}
```

**`kirn` は登録された OpenType feature タグではない。** エラーも警告も出ず、黙って無視される。同一スタック・40px での実測:

| 文字列 | `normal` | `"kirn"` | `"palt"` | `"halt"` | `"kern"` |
|---|---|---|---|---|---|
| 和文混じり（24 字） | 1009.28px | **1009.28px (±0.00)** | 899.05px (**−10.9%**) | 929.28px (−7.9%) | 1009.28px |
| 約物のみ（8 字） | 280.00px | **280.00px (±0.00)** | 181.61px (**−35.1%**) | 180.00px (−35.7%) | 280.00px |
| 欧文（15 字） | 348.48px | 348.48px | 348.48px | 348.48px | 348.48px |

- **筑紫ゴシック Pr5 は `palt` を持っている。** タグ名を間違えているせいで、**1166 要素すべてで字詰めが 1 文字も効いていない**
- `"kern"` も同じく差が出ない（`font-kerning` の既定で既に有効なため）
- **再現するなら `"palt"` と書く。** ただし既存ページと**見た目が 10.9% 変わる**ので、サイト全体を揃えるときだけ

### 3.8 縦書き

**本物の縦組みを使っている。**

```css
/* 下層ページ：セクション見出し */
.about-top-title {
  writing-mode: vertical-rl;
  font-family: TsukuGoPr5-R;   /* 受け皿を足すこと */
  font-size: 34px;
  line-height: 1.3;            /* 44.2px */
  letter-spacing: normal;
}
/* そのすぐ横に置く欧文ラベル */
.about-toptitle-en {
  writing-mode: vertical-rl;
  font-family: Lato, "Gill Sans", sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
}
```

- 下層: `設立の背景` / `建学の精神`（34px・筑紫ゴシック R）＋ `TRADITION` / `FOUNDING PRINCIPLES`（Lato 12px）の**和欧 2 本立ての縦組み**
- トップ: `学部から探す` / `興味の分野から探す`（28px・**筑紫明朝 Pr6 L**）と、Instagram ラベル `#立教大学`（20px・明朝・紫の丸）
- **縦に並べた 2 本を横に置くときは `flex-direction: row-reverse`**。素の `flex` だと DOM 順に左→右へ並び、縦組みの読む向き（右→左）と逆になる
- **`font-feature-settings: "kirn"` は縦組みにも降りている**（`vertical-rl` 4〜5 要素）。`palt` に直すなら、縦組み側は `"vpal"` に上書きすること

---

## 4. Component Stylings

### Buttons

**Large / Gray（トップ）**
- Background: `#999999` / Text: `#ffffff`
- Border: `1px solid #cccccc`
- Border Radius: **`0px`**
- Padding: `0 110px`（極端に横長。中央のラベルを幅いっぱいに）
- Font: 筑紫ゴシック R 14px / 400 / line-height 21px / letter-spacing `normal`

**Outline（下層・`詳細を見る`）**
- Background: `#ffffff` / Text: `#000000`
- Border: `1px solid #cccccc`
- Border Radius: **`0px`**
- Padding: `8px 40px`
- Font: `TsukuGoPr5-R` 12px / 500 / line-height 21.6px

### Badges / Tags

- Border Radius: **`3px`**（可視 40 要素。このサイトで最多の角丸）
- 日付バッジ: Background `#333333` / Text `#ffffff` / Lato 14px / 700 / line-height 40px / Radius `0px` / Padding `0 10px`

### Cards

- Background: `#f5f5f5`
- Border Radius: `3px` / `4px`
- Box Shadow: `rgba(0, 0, 0, 0.1) 0 1px 4px 0`（3 要素）

### Circular Thumbnail

- Border Radius: **`111px`**（可視 12 要素）。`.achievement-img` は `width: 180px` の円形サムネ

### Instagram Label

- Background: **`#541b86`** / Text `#ffffff`
- Border Radius: **`138px`** / line-height `138px`
- Font: `TsukuMinPr6-L`（明朝）20px / `writing-mode: vertical-rl`

### Section Heading Rule

```css
/* 見出しの下に引く 50×4px の帯 */
.sub-title01::after {
  content: "";
  display: block;
  width: 50px;
  height: 4px;
  background-color: #cccccc;
}
```

---

## 5. Layout Principles

### Container

- **`max-width` を使っていない。** `distributions.layout.containers` は両ページとも **0 件**
- 代わりに `width: 89.3%` のような **% 幅 ＋ `margin: 0 auto`** で組む（`.p-breakingnews__container` ほか）
- 下層の見出し帯は `padding: 240px 0 0` のような大きな固定 px

### Spacing

- 余白トークンは無い。`margin: 0 0 23px` `padding: 39px 0 66px` のように**すべて直書きの px**
- グリッドの `gap` 宣言も 0 件（`float` ベースのレイアウトが残っている: `.achievement-list li { float: left; width: 215px; margin-left: 37px }`）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|---|
| 0 | `none` | 既定。ほとんどの要素 | — |
| 1 | `rgba(0, 0, 0, 0.1) 0 1px 4px 0` | 円形サムネイル | 3 要素 |
| 2 | `rgba(0, 0, 0, 0.3) 0 1px 4px 0` | ロゴ（写真の上に乗る） | 1 要素 |

> **影は実質使っていない。** 階層は面色（`#ffffff` / `#f5f5f5` / `#f9f9f9`）と 50×4px の帯で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **和文は筑紫ゴシック Pr5 の 4 ファミリー（R / M / D / L）を `font-family` で切り替える**。`font-weight` では切り替えない
- **約物サブセット（`YakuHanJP` / `YakuHanJP-Light`）をスタックの先頭に置く**。`palt` を使わずに約物だけ詰める設計
- 受け皿は **筑紫 → ヒラギノ → メイリオ → MS 系 → generic** の順で必ず書く
- 行間は `html { line-height: 1.5em }` を敷き、**見出しは 1.30 / リードと本文は 1.80** で上書きする
- **和文の `letter-spacing` は `normal`。** 字間は書体のメトリクスに任せる
- 欧文の小見出しは **Lato 12px / weight 700 / `letter-spacing: 1px` / 色 `#cbcbcb`**、下に 50×4px の帯
- 縦組みは **`writing-mode: vertical-rl`**。和文（34px）と欧文ラベル（Lato 12px）を 2 本立てで

### Don't（禁止）

- **`font-feature-settings: "kirn"` を写さない。** 登録タグではなく、実測で **±0.00px**＝何も起きない。詰めたいなら `"palt"`（横組み）/ `"vpal"`（縦組み）
- **`-moz-font-feature-settings: "kirn=1"` を書かない。** Firefox 3.6 時代の旧構文
- **筑紫書体に `font-weight: 700` を当てない。** `@font-face` が全部 `bold` 宣言なので太くならず、合成太字も起きない
- **受け皿の無い `font-family: TsukuGoPr5-D` のような裸の宣言をしない。** 配信が落ちると UA 既定（Times 系）に落ちる
- **`line-height: 1.5em` を無単位の `1.5` に書き換えない。** 絶対値 21px が降りる前提で全体が組まれている
- **和文に字間を足さない**（実測 281/281 が `normal`）
- **`max-width` でコンテナを作らない**（実サイトは % 幅。混ぜると余白が揃わない）
- **ヒーローの大見出しを Web フォントで組まない。** トップは `div.rslides1_on` の `background-image`（1398×786 の JPG スライド 6 枚）、下層は `section.about-hed.bg-get` の `background-image`（1398×702）。**ロゴも `span` の `background-image: logo.svg`（324×64）**
- **モバイルで rem を使うときはルートが 13px に落ちることを忘れない。** `3.57143rem` は 50px ではなく 46.43px になる

---

## 8. Responsive Behavior

### Breakpoints

| 宣言 | 件数 | 備考 |
|------|---|---|
| `only screen and (min-device-width: 320px) and (max-device-width: 640px), (max-width: 640px)` | **152** | 主役 |
| `only screen and (min-device-width: 320px) and (max-device-width: 767px) and (orientation: landscape)` | 151 | 横向き専用 |
| `only screen and (min-width: 641px) and (min-device-width: 768px)` | 117 | デスクトップ |
| `screen and (max-width: 640px)` | 110 | — |
| `print` | 2 | — |

> **`min-device-width` / `max-device-width` は 2013 年頃の書き方**で、現在の仕様では非推奨。ビューポート幅ではなく**端末の画面幅**を見るため、ウィンドウを縮めても切り替わらない。**真似しない。**
>
> さらに **`�screen` という文字化けしたメディアクエリが 2 件**ある（`@charset` と実ファイルのエンコーディングの食い違いの痕跡）。当然どの環境にもマッチしない。

### ルートの切り替え

| 幅 | `html` | `body` | 継承される行送り |
|---|---|---|---|
| 1920〜641px | **14px** | 14px | **21px** |
| 640〜320px | **13px** | 13px | **19.5px** |

- 境目は **641 / 640px の 1 箇所**。倍率は **0.929 倍**（崖ではなく緩やかな縮小）
- 大見出しは 50px → 46.43px、セクション見出しは 30px → 27.86px

### タッチターゲット

- ナビのリンクは `width: 96px; height: 96px`。十分に大きい
- 一方で 11〜12px の欧文ラベルがリンクになっている箇所があるので、**新規実装では 44px の当たり判定を確保する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #541b86   /* 使いどころを絞る */
Text Color:    #000000   /* 下層は #222222 */
Muted:         #999999
Label (EN):    #cbcbcb
Background:    #ffffff
Surface:       #f5f5f5
Root:          html { font-size: 87.5%; line-height: 1.5em }   /* 14px / 行送り 21px */
Font (本文):   YakuHanJP, TsukuGoPr5-R, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif
Font (明朝):   YakuHanJP-Light, TsukuMinPr6-L, "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", serif
Font (欧文):   Lato, "Gill Sans", sans-serif
Body Size:     14px (1rem) / Line Height 1.5（= 21px の継承）
Letter Spacing: 和文 normal / 欧文ラベル 1px
Radius:        3px（バッジ・カード） / 111px（円形サムネ）
OpenType:      書かない。書くなら "palt"（実サイトの "kirn" は無効）
```

### プロンプト例

```
立教大学のデザインシステムに従って、学部紹介のセクションを作成してください。
- html に font-size: 87.5%（14px）と line-height: 1.5em を敷く
- 和文は YakuHanJP, TsukuGoPr5-R, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
  メイリオ, Meiryo, sans-serif（受け皿を必ず最後まで書く）
- 太さは font-weight ではなく、TsukuGoPr5-L / -R / -M / -D のファミリー名で切り替える
- セクション見出し: writing-mode: vertical-rl / 34px / line-height 1.3 / letter-spacing normal
  その横に Lato 12px / weight 700 / letter-spacing 1px / color #cbcbcb の欧文ラベルを縦組みで置く
  （横に並べるときは flex-direction: row-reverse）
- 見出しの下に width 50px / height 4px / background #cccccc の帯を ::after で引く
- 本文: 14px / weight 400 / line-height 1.8 / color #000000 / letter-spacing normal
- カード: 背景 #f5f5f5 / border-radius 3px
- ボタン: 背景 #ffffff / 文字 #000000 / border 1px solid #cccccc / border-radius 0 / padding 8px 40px
- font-feature-settings は書かない（実サイトの "kirn" は無効なタグ）
```
