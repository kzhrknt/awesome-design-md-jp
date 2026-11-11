# DESIGN.md — 三菱自動車工業（MITSUBISHI MOTORS）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-11 / 対象: `https://www.mitsubishi-motors.co.jp/`, `/brand/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 黒（`#2c2c2c` / `#000000`）の地に白文字。差し色は三菱レッド `#ed0000` の 1 色だけ。角丸ゼロ・影ゼロで、面と罫線だけで組む
- **密度**: 低い。トップは全画面の車両写真が主役で、テキストは最小限。ブランドページは `line-height: 2.5` の本文を 113 要素並べる、読ませるための構え
- **キーワード**: 自社欧文書体 MMC、和欧二層スタック、0.04em、vw 直書き、黒地

**このサイトの核心は4つある。**

1. **自社の欧文書体 MMC と Noto Sans CJK JP を自社ホストから配信し、`MMC, "Noto Sans Japanese", sans-serif` の二層スタックで使う。** MMC は欧文しか持たないので、**同じ 1 行の中で英数字は MMC、和文は Noto Sans に自動で分かれる**（実測 174〜27 要素）。Google Fonts は 1 件も読まない（フォント要求は**全 6 件・すべて自社ドメイン**）
2. **`letter-spacing: 0.04em` が設計の軸。** `body` に 1 行書いて **`0.64px` として px で継承**させる（トップ 215 要素）。ブランドページでは**要素側が `0.04em` を持ち直す**ので、`33.7335px` の見出しは `1.34934px`、`14.7584px` の本文は `0.590337px` と**サイズに比例して px が変わる**（149 要素）。同じ `0.04em` でも**ページによって継承のしかたが正反対**
3. **ブランドページの文字サイズは `vw` の直書きで、下限が無い。** 本文（146 要素）は 1920px で 19.68px → **768px で 7.87px まで縮み、767px で 28.63px に跳ぶ（3.64 倍）**。`clamp()` を使う宣言群とは別系統が同居している（§8）
4. **ヒーローの大きな明朝コピーはテキストではなく写真に焼き込まれている。** 「アウトランダーが、冒険を加速させる。」は `kv_img_*.jpg`（1440×709px）の中身で、`distributions.fontFamily` に**セリフ系の和文が 1 要素も出ない**

**CSS Custom Properties は自社 36（トップ）／ 50（ブランドページ）個。** 色・サイズ・レイアウトの語彙は揃っているが、**同じ `--font_MMC` がページによって `'MMC'` と `"MMCFont"` に分かれており、後者は `unloaded`**（§3.1）。2 世代のテンプレートが同居している。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | トークン | 実測 |
|------|--------|----------|------|
| **三菱レッド** | **`#ed0000`** | `--color_primaryRed` | **面として 9 要素 / 文字として 7 要素**。`MENU` ボタン、`【お知らせ】`、ヘッダー下の 4px の帯、ナビの現在地 |
| **Black** | `#000000` | `--color_primaryBlack` | ブランドページの `html` 背景。**ページ全体が黒** |
| **White** | `#ffffff` | `--color_primaryWhite` | 文字色。ブランドページでは**可視 236 要素**（最多） |
| Orange | `#ff6e03` | `--color_primaryOrange` | **宣言のみ・可視 0 要素**。使わない |

> **`--color_primaryOrange: #FF6E03` は両ページとも 1 要素も使っていない。** トークンに並んでいても実装にはない。

### Semantic（意味的な色）

success / warning / error の色は**存在しない**。状態は赤（`#ed0000`）と灰の 2 値だけで表す。

### Neutral（ニュートラル）

| 役割 | 実装値 | トークン | 実測 |
|------|--------|----------|------|
| **Text Default（トップ）** | `#111111` | `--color_textDefalt` | **可視 125 要素**（最多）。綴りは実サイトのまま（`Defalt`） |
| **Text Default（ブランド）** | `#333333` | `--color_textDefalt` | ブランドページでは同じトークンが `#333333`（CSS の宣言は `#333`）を指す |
| Secondary 01 | `#686d71` | `--color_secondary01` | 日付・補助テキスト（可視 38 要素） |
| Secondary 02 | `#bfc2c4` | `--color_secondary02` | スライダーの非選択ドット |
| Secondary 03 / Header | `#e3e5e6` | `--color_secondary03`, `--color_headerBg` | ヘッダーの地・ブランドページの面（22 要素） |
| Surface Dark | `#2c2c2c` | — | **トップのページ背景**（`main.l_main` 1440×772px） |
| Surface Darker | `#212121` | — | カーラインアップの面（6 要素） |
| Text Gray | `#747474` | — | メガメニューの項目（37 要素） |
| Line | `#d3d3d3` | — | 入力欄の枠・`ページ上部へ戻る` の面 |

- **ブランドページには記事ごとのテーマ色がある**: `#27455c`（紺・8 要素）、`#468254`（緑・3 要素）
- **画像アイコンを色替えするための `filter` 文字列をトークンに持つ**（`--filter_primaryRed: invert(12%) sepia(58%) saturate(7130%) hue-rotate(357deg) brightness(102%) contrast(126%)` など 6 本）。`fill` を持たない PNG/JPG のアイコンを同じ色にそろえるための仕組み

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans CJK JP を自社ホストから配信する。** ファミリー名は **`"Noto Sans Japanese"`**（Google Fonts の `Noto Sans JP` とは別名）

```css
@font-face { font-family: "Noto Sans Japanese"; font-weight: 400;
  src: url("/assets/font/NotoSansCJKjp-Regular.woff") format("woff"),
       url("/assets/font/NotoSansCJKjp-Regular.ttf")  format("truetype"); }
@font-face { font-family: "Noto Sans Japanese"; font-weight: 500;
  src: url("/assets/font/NotoSansCJKjp-Medium.woff")  format("woff"), ... }
@font-face { font-family: "Noto Sans Japanese"; font-weight: 700;
  src: url("/assets/font/NotoSansCJKjp-Bold.woff")    format("woff"), ... }
```

- **400 / 500 / 700 の 3 ウェイトすべてが `loaded`**
- **配信形式が `woff` と `ttf` で、`woff2` が無い。** 和文フルセットの `woff` は数 MB になる。**新規実装では `woff2` とサブセットを使うこと**（実サイトはこうだが、正しくはこう）
- `NotoSerifJP 600` が `@font-face` に 1 本あるが **`unloaded`・可視 0 要素**。明朝は使っていない

### 3.2 欧文フォント

- **MMC — 自社のオリジナル欧文書体**（`/assets/font/MMC-{Regular,Medium,Bold}.woff2`）

```css
@font-face { font-family: MMC; font-weight: 400; src: url("/assets/font/MMC-Regular.woff2") format("woff2"), url("/assets/font/MMC-Regular.woff") format("woff"); }
@font-face { font-family: MMC; font-weight: 500; src: url("/assets/font/MMC-Medium.woff2")  format("woff2"), ... }
@font-face { font-family: MMC; font-weight: 700; src: url("/assets/font/MMC-Bold.woff2")    format("woff2"), ... }
```

- **400 / 500 / 700 の 3 ウェイトすべてが `loaded`**。`woff2` 優先なので和文より軽い
- **MMC は欧文（ラテン）しか持たない。** だから和文はスタックの 2 番目 `"Noto Sans Japanese"` に落ちる。**これが意図された設計**
- **`--font_MMC` トークンの値がページで違う。** トップは `'MMC', Noto Sans Japanese, "sans-serif"`、ブランドページは **`"MMCFont", Noto Sans Japanese, "sans-serif"`**。ブランドページの `MMCFont` は `@font-face` こそあるが **`unloaded`** で、実際には次の `Noto Sans Japanese` に落ちる。**`--font_MMC` を使う要素だけ欧文が MMC で出ない**
- フォールバックに **`"sans-serif"` と引用符が付いている**。引用符を付けると「`sans-serif` という名前のフォント」を探す指定になり、**受け皿として機能しない**。実サイトはこうだが、**正しくは `sans-serif`（引用符なし）**

### 3.3 font-family 指定

```css
/* 既定 — 和文のみ。英数字も Noto Sans で出る */
body {
  min-width: 320px;
  font-family: "Noto Sans Japanese", sans-serif;
  font-size: 16px;
  color: var(--color_textDefalt);
  line-height: 1.6875;
  letter-spacing: 0.04em;      /* → 0.64px として全要素へ継承 */
}

/* 欧文を MMC で出したい要素だけ二層スタックにする */
.l_header__carMenuLink,
.anchor-itm__txt {
  font-family: MMC, "Noto Sans Japanese", sans-serif;
}
```

- **`body` のスタックに MMC は入っていない。** MMC を当てるのはナビ・見出し・ブランドページの本文など、**明示したコンポーネントだけ**（トップ 27 要素 / ブランドページ 174 要素）
- **`font-feature-settings` は両ページとも 0 件。** `palt` も `halt` も使っていない
- **`<h1>` が 1 つも無い**（トップ・ブランドページとも実測 0 件）。見出し階層は `h2` から始まる。**新規実装では `h1` を置くこと**

### 3.4 文字サイズ・ウェイト階層

**トップは px の固定値、ブランドページは `vw` の流体**と、ページで方式が違う。

#### トップページ（固定 px）

| 用途 | 値 | weight | letter-spacing | 実測件数 |
|------|----|--------|----------------|----------|
| セクション見出し（MMC） | `60px` | 700 | 0.64px | 7 |
| カード見出し | `21px` | 700 | 1.05px（`0.05em`） | 6 |
| CTA ボタン | `20px` | 700 | **2px** | 17 |
| カテゴリナビ | `18px` | 500 | 1.08px（`0.06em`） | 17 |
| **本文** | **`16px`** | **400** | **0.64px** | **158（最多）** |
| 補助・日付 | `14px` | 400 | 0.64px | 68 |
| メガメニュー | `13px` | 500 | 0.64px | 44 |

#### ブランドページ（`vw` 流体・1440px 実測）

| 用途 | 宣言 | 1440px | 375px | weight |
|------|------|--------|-------|--------|
| 記事タイトル | `2.3426vw` | 33.7335px | — | 500 |
| 章見出し | `2.9282vw` | 42.1669px | — | 700 |
| 小見出し | `1.66667vw` → `4.8vw`（SP） | 24px | 18px | 500 |
| **本文・アンカー** | **`1.02489vw` → `3.73333vw`（SP）** | **14.7584px** | **14px** | **500** |

- **ウェイトは 400 / 500 / 700 の 3 段。** トップは 400 が最多（125 要素）、ブランドページは **500 が最多（190 要素）**
- **600 は CMP（Cookie 同意）の 2 要素だけ。** サイト本体には存在しない。書かないこと
- **`@font-face` は 400/500/700 の 3 本しかない。** 600 や 900 を当てるとブラウザの合成太字になる

### 3.5 行間・字間

- **`line-height: 1.6875`（= 27 ÷ 16）を `body` に無単位で書く。** 実測の最多は `1.69`（114 要素）
- **ブランドページの読み物本文は `line-height: 2.5`（113 要素）。** 黒地に白文字を読ませるための広い行送り。**実サイトで最も目立つ組版の判断**
- **`letter-spacing: 0.04em` が全体の軸。** ただし**継承のしかたがページで正反対**:

| ページ | 宣言位置 | 実測 | 読み方 |
|--------|----------|------|--------|
| トップ | `body { letter-spacing: 0.04em }` | **`0.64px` が 215 要素**（16px × 0.04） | **px で降りる。** 60px の見出しでも 0.64px＝実質 `0.011em` |
| ブランド | 各要素が `0.04em` を持つ | `1.34934px`（33.7335px）/ `0.590337px`（14.7584px）/ `0.16px` | **サイズに比例して px が変わる** |

- **トップは「大きい文字ほど字間が消える」**。ブランドページは「どのサイズでも 0.04em」。**片方だけ見て設計を決めないこと**
- 例外的に大きい字間は **CTA ボタンの `2px`**（20px に対して `0.1em`）と、カード見出しの `1.05px`（`0.05em`）
- 767px 以下では `body` が 15px になるため、継承される字間も **`0.6px`** に下がる

### 3.6 禁則処理・改行ルール

- **`body` の `word-break` は `normal`。** `break-all` も `auto-phrase` も使っていない
- ブランドページの読み物は 1 文ごとに要素を分けて改行位置を固定している（`「なんでそんなことやるの？」` のように `<p>` 単位）
- **`line-height: 2.5` と組み合わせるので、1 行が長くなると読みにくい。** 本文の `max-width` は `--innerW: 800px`

### 3.7 OpenType 機能

- **両ページとも `font-feature-settings` は 0 件。** `palt` も `halt` も使っていない
- 詰めは**すべて `letter-spacing` で行う**。約物は全角幅のまま出る
- **`palt` を足すと実サイトと別物になる。** 0.04em の字間は「`palt` なしの全角幅」を前提に決められている

### 3.8 縦書き

- **`writing-mode: vertical-rl` はブランドページの 1 要素だけ。** `.scroll-text` の `SCROLL`（10px / MMC / `letter-spacing: 0.64px`）という**スクロール誘導のラベル**
- **本文の縦組みは無い。** トップは 0 件
- 縦組みを本文に使わないこと

---

## 4. Component Stylings

### Buttons

```css
/* 主 CTA — 黒面・白枠・角丸ゼロ */
.btnA {
  font-family: "Noto Sans Japanese", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;               /* 30px */
  letter-spacing: 2px;            /* 0.1em */
  color: #ffffff;
  background-color: #111111;
  border: 1px solid #ffffff;
  border-radius: 0;               /* ← 角丸を使わない */
  box-shadow: none;
  padding: 8px 16px;
}

/* ボタンの padding はトークンで持つ */
:root {
  --m_btn__paddingY: 8px;
  --m_btn__paddingX: 20px;
  --m_btn__paddingX_sp: 16px;
}
```

- **`border-radius` はトップで 0 種、ブランドページで `2px` が 3 件（すべて CMP のボタン）。** サイト本体は角丸を使わない
- CTA の字間が **`2px`（= `0.1em`）** と大きい。`body` の 0.04em とは別物
- `--alpha: 0.7` と `--transition-time: 0.3s` をトークンに持ち、ホバーは不透明度で表す

### Inputs

```css
.l_header__searchInp {
  background-color: var(--color_primaryWhite);
  border: 1px solid #d3d3d3;
  width: 100%;
  height: 70px;
  font-family: inherit;
  font-size: 22px;
  font-weight: 700;
}
```

- 入力欄の高さは **70px** と大きい（検索）。日付選択は **50px**
- **フォーカスリングの独自指定なし**（UA 既定）

### Cards

- カーラインアップのカードは **`#212121` の面に 1200×646px の車両画像**。角丸なし・影なし
- カードの見出しは 21px / 700 / `letter-spacing: 1.05px`
- ブランドページの記事カードは**面を持たず、背景写真の上に白文字**を置く

---

## 5. Layout Principles

### Spacing Scale

トークンで持つ（px の固定値）。

| トークン | 値 | 用途 |
|----------|-----|------|
| `--gap` / `--gap_sp` | `24px` / `12px` | 要素間 |
| `--mt_M` / `--mt_M_sp` | `24px` / `12px` | 縦の余白 |
| `--pcSec` / `--spSec` | `120px` / `60px` | セクション間 |
| `--pcInnerPadding` / `--spInnerPadding` | `40px` / `20px` | コンテナの内側 |

実測の `gap` は `10px 16px`（トップ）、`40px 60px` / `16px 32px` / `40px 4px`（ブランド）。

### Container

| トークン | 値 | 用途 |
|----------|-----|------|
| `--wideW` | `1320px` | 最大幅（実測 9 要素で最多） |
| `--contentsW` | `1200px` | 本文領域 |
| `--innerW` | `800px` | 読み物の 1 カラム |
| `--l_2colLayout_localNav_width` | `282px` | 下層のローカルナビ |

### Grid

- ヘッダーの高さもトークン: `--l_header_height_pc: 128px`（トップ）/ `130px`（ブランド）、`--l_header_height_tablet: 80px`、`--l_header_height_sp: 56px`
- **ヘッダー下の赤い帯もトークン**: `--l_header_height_borderW_pc: 4px`（トップ）/ `6px`（ブランド）/ `4px`（タブレット）/ `3px`（SP）
- **設計幅をトークンに持つ**: `--pcDesignWidth: 1920`、`--spDesignWidth: 375`、`--top-size_pc: 1920` / `--top-size_tb: 1024` / `--top-size_sp: 375`

---

## 6. Depth & Elevation

- **`box-shadow` はトップで 0 種、ブランドページで 1 種（CMP の `rgba(0,0,0,0.2) 0 0 18px`）。** サイト本体は影を使わない
- **角丸も 0。** 面と罫線（`1px solid`）だけで階層を作る
- 階層は**明度**で表す: `#000000` → `#212121` → `#2c2c2c` → `#333333` → `#686d71` → `#bfc2c4` → `#e3e5e6` → `#ffffff`
- 浮かせる代わりに `--alpha: 0.7` の不透明度変化で反応を返す

---

## 7. Do's and Don'ts

### Do（推奨）

- **欧文は MMC、和文は Noto Sans の二層スタックにする**: `font-family: MMC, "Noto Sans Japanese", sans-serif`
- **`body` に `letter-spacing: 0.04em` と `line-height: 1.6875` を 1 行ずつ書く**
- **読み物の本文は `line-height: 2.5`**（黒地に白文字で読ませるため）
- **角丸は 0、影は無し。** 面と `1px` の罫線で組む
- 差し色は **`#ed0000` の 1 色だけ**
- コンテナは `--wideW: 1320px` / `--contentsW: 1200px` / `--innerW: 800px`
- 画像アイコンの色替えは `filter` のトークンで行う

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実測 0 件）。0.04em の字間は全角幅前提
- **`font-weight` に 600 や 900 を書かない**（`@font-face` は 400/500/700 の 3 本。合成太字になる）
- **`--color_primaryOrange: #ff6e03` を使わない**（宣言だけで可視 0 要素）
- **`--font_MMC` トークンをそのまま信用しない。** ブランドページの値は `"MMCFont"` で `unloaded`。**MMC を確実に当てたいなら `font-family: MMC, "Noto Sans Japanese", sans-serif` を直接書く**
- **`border-radius` を足さない**（サイト本体は 0）
- **ヒーローの大見出しを Web フォントで実装しない。** 実サイトは写真に焼き込んだ明朝で、テキストでは再現できない
- **`<h1>` を省略しない。** 実サイトは両ページとも `h1` が 0 件だが、これは真似するところではない
- **フォールバックに `"sans-serif"` と引用符を付けない**（受け皿として機能しなくなる）。正しくは `sans-serif`
- **和文を `woff`／`ttf` で配信しない。** 実サイトはこうだが、新規実装は `woff2` ＋ サブセットにする

---

## 8. Responsive Behavior

### Breakpoints

実測で最も多いのは `screen and (max-width: 767px)` と `screen and (min-width: 768px)`（ブランドページで各 1500 件超）。ほかに `1200px` / `1500px` / `1023px`。**768 / 767px の 1 本が主役。**

### ルートの `font-size`

- **`html` に `font-size` の宣言が 1 つも無い → UA 既定の 16px で全幅固定**（1920px〜360px まで実測 16px）
- **動くのは `body` だけ。2 段**

```css
body { font-size: 16px; line-height: 1.6875; letter-spacing: 0.04em; }
@media (max-width: 767px) { body { font-size: 15px; } }
```

| 画面幅 | `html` | `body` | 継承される字間 |
|--------|--------|--------|----------------|
| 1920〜768px | 16px | 16px | 0.64px |
| 767〜360px | 16px | 15px | 0.6px |

### ブランドページの `vw` 流体（下限が無い）

ブランドページは**本文サイズを `vw` で直書き**している。`clamp()` を使う宣言群と**同じページに同居**している。

```css
/* clamp 付き — 設計幅トークンを分母にする */
.l_pageTitle01__titleMain { font-size: clamp(40px, calc(70 / var(--pcDesignWidth) * 100vw), 70px); }
.m_leadMedia__title       { font-size: clamp(26px, calc(36 / var(--pcDesignWidth) * 100vw), 36px); }
.m_leadMedia__text        { font-size: clamp(14px, calc(18 / var(--pcDesignWidth) * 100vw), 18px); }

/* clamp 無し — 下限が無く、768px で 8px を切る */
.anchor-list .anchor-itm__txt { font-size: 1.02489vw; }
@media (max-width: 767px) { .anchor-list .anchor-itm__txt { font-size: 3.73333vw; } }  /* = 14px @375px */
.section-item__text .text { font-size: 1.66667vw; }
@media (max-width: 767px) { .section-item__text .text { font-size: 4.8vw; } }           /* = 18px @375px */
```

**`.anchor-itm__txt`（146 要素）の実測:**

| 画面幅 | 実測 |
|--------|------|
| 1920px | 19.6779px |
| 1600px | 16.3982px |
| 1440px | 14.7584px |
| 1200px | 12.2987px |
| 1024px | 10.4949px |
| 834px | 8.54758px |
| **768px** | **7.87116px（最小）** |
| **767px** | **28.6347px（3.64 倍に跳ぶ）** |
| 414px | 15.456px |
| **375px（SP 設計幅）** | **14px ちょうど** |

- **768px → 767px で 3.64 倍の崖がある。** 規定の 4 幅（1440 / 1200 / 834 / 375px）では崖が見えず、834px でも「ただの流体」に見える
- **`vw` 直書きの係数はコンポーネントごとにバラバラ**（`1.02489vw` / `1.66667vw` / `2.3426vw`）。`--pcDesignWidth: 1920` を分母にする `clamp()` 群とは別系統で、**設計幅が揃っていない**
- **モバイル側は `--spDesignWidth: 375` と一致している**（`3.73333vw` = 14px @375px、`4.8vw` = 18px @375px）
- **新規実装では `clamp()` 側に揃えること。** 下限の無い `vw` は 768px 付近で本文が 8px を切る

### タッチターゲット

- ボタンの padding はトークン: `--m_btn__paddingY: 8px` / `--m_btn__paddingX_sp: 16px`
- ヘッダーの高さが `128px`（PC）→ `80px`（タブレット）→ `56px`（SP）と 3 段で縮む

### フォントサイズの調整

- トークンに **PC と SP の 2 組**を持つ: `--fontSS: 13px` / `--fontSS_sp: 12px`、`--fontS: 14px` / `--fontS_sp: 13px`、`--fontM: 16px` / `--fontM_sp: 15px`、`--fontL: 18px` / `--fontL_sp: 17px`
- **メディアクエリで変数を差し替えるのではなく、`_sp` 付きの別トークンを参照する**のがこのサイトの流儀

---

## 9. Agent Prompt Guide

### クイックリファレンス

| 項目 | 値 |
|------|-----|
| 和文フォント | `"Noto Sans Japanese"`（自社配信の Noto Sans CJK JP。400/500/700 が `loaded`） |
| 欧文フォント | `MMC`（自社オリジナル。400/500/700 が `loaded`） |
| スタック | `MMC, "Noto Sans Japanese", sans-serif` |
| 本文サイズ | `16px`（767px 以下は `15px`） |
| 本文ウェイト | トップ 400 / ブランドページ 500 |
| 行間 | `1.6875`（`body`）。読み物は `2.5` |
| 字間 | `0.04em`（トップは `body` に 1 回、ブランドは各要素に） |
| OpenType | **なし**（`palt` を使わない） |
| ページ背景 | `#2c2c2c`（トップ）/ `#000000`（ブランド） |
| 本文色 | `#111111`（トップ）/ `#ffffff`（黒地） |
| アクセント | `#ed0000` |
| 角丸 | **0** |
| 影 | **なし** |
| コンテナ | `1320px` / `1200px` / `800px` |
| ルート | `html` 16px 固定。`body` のみ 768px 境界で 16 → 15px |

### プロンプト例

```
三菱自動車のスタイルでブランドストーリーのページを作ってください。

- font-family: MMC, "Noto Sans Japanese", sans-serif（欧文は MMC、和文は Noto Sans に落ちる）
- body に font-size: 16px / line-height: 1.6875 / letter-spacing: 0.04em を書く
- 767px 以下は body を 15px にする
- 読み物の本文は line-height: 2.5、max-width: 800px、黒地（#000000）に白文字
- 見出しは font-weight: 500、CTA は 700 で letter-spacing: 2px
- font-weight は 400 / 500 / 700 の 3 段だけ（600・900 を書かない）
- font-feature-settings は使わない（palt なし）
- border-radius: 0、box-shadow なし。面と 1px の罫線で組む
- 差し色は #ed0000 のみ。ヘッダー下に 4px の赤帯
- 流体にするなら clamp(min, calc(N / 1920 * 100vw), Npx) の形にし、下限を必ず付ける
- h1 をページに 1 つ置く
```

### 注意点

- **`--font_MMC` トークンは信用しない。** ブランドページでは `"MMCFont"` を指しており `unloaded`。MMC を当てたいなら `font-family` を直接書く
- **字間の継承のしかたがページで違う。** トップは `body` から px で降り、ブランドページは各要素が `em` を持つ。**再現したい側を決めてから書く**
- **`vw` の直書きは真似しない。** 768px で 7.87px まで縮む
- **大見出しは実サイトでは写真に焼き込まれている。** テキストで組むなら字面は変わる
- `--color_textDefalt` の綴り（`Defalt`）と `"sans-serif"` の引用符は実サイトのまま。**新規実装では直すこと**
