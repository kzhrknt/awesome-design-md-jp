# DESIGN.md — ライゾマティクス（Rhizomatiks）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-08 / 対象: `https://rhizomatiks.com/`, `/work/`

---

## 1. Visual Theme & Atmosphere

Perfume や ELEVENPLAY の舞台演出、大規模インスタレーションで知られるクリエイティブ集団
（運営: 株式会社アブストラクトエンジン）。作品はレーザーとモーショングラフィックスで
極彩色だが、**サイトそのものは白地・グレースケール・全文セリフ体**という完全な引き算でできている。

- **デザイン方針**: 白地に明朝／セリフ1本。UI に彩色を持たず、作品画像だけが色を持つ
- **密度**: 低い。1156px の版面に画像を並べ、テキストは最小限
- **キーワード**: 全文セリフ、`palt` グローバル適用、グレースケール、角丸ゼロ、影ゼロ

**このサイトの特徴的な癖（他サイトと違う点）**

1. **和文が明朝（Noto Serif JP）、欧文がセリフ（Libre Baskerville）**。
   テック系のクリエイティブスタジオでゴシック／サンセリフを一切使わない。
   ナビ・ボタン・キャプションまで**すべてセリフ**
2. **`font-feature-settings: "palt"` が `html` に指定され、全要素に継承される**。
   明朝の詰め組みでサイト全体が締まる
3. **和欧混植のときだけ `'Libre Baskerville','Noto Serif JP', serif` と
   欧文を先頭に置いたチェーンを使う**。欧文単体は Libre Baskerville、
   和文単体は Noto Serif JP と、**要素ごとに3種のチェーンを打ち分ける**
4. **`body` の `line-height` が `1`**。行送りは読ませる要素に個別指定する設計で、
   本文は 15px→30px（**2.0**）と大きく開く
5. **UI に有彩色が1つもない**。`#000 / #333 / #666 / #999 / #C4C4C4 / #E5E5E5 /
   #F0F0F0 / #F8F8F8 / #F9F9F9 / #fff` のグレースケールだけ
6. **ボタンが実質1種類**。「View More」の枠線ボックス（`1px solid #C4C4C4`）のみ。
   塗りボタンを持たない
7. **ブレークポイントが `860px` の1本だけ**。中間サイズを刻まない
8. **`box-shadow` の宣言が CSS 全体で 0 件**
9. サムネイルのホバーが **`scale(1.03)` ＋ `brightness(125%)`** の2段。
   `filter` のトランジションに `will-change` を付けて明るく持ち上げる
10. フッターだけが**黒ベタ `#000000`**。サイト内で唯一の暗い面

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値。すべて hex -->

### Base

- **Background** (`#ffffff`): ページ地色（`html` に指定）
- **Ink** (`#000000`): 本文・リンク・見出し（h4）
- **Heading Gray** (`#333333`): **h1 の色**。純黒ではなく 51,51,51
- **Text Sub** (`#666666`): ナビ、「View More」の文字
- **Text Muted** (`#999999`): 日付、作品のクレジット、言語切替
- **Text Faint** (`#7D7D7D`) / (`#888888`) / (`#959595`) / (`#C8C8C8`): 補助テキスト

### Neutral（罫・面）

- **Border** (`#C4C4C4`): 「View More」ボタンの罫。**サイト唯一の枠線色**
- **Divider** (`#E5E5E5`): リストの区切り
- **Surface** (`#F0F0F0`): 作品一覧の面（`rgba(240,240,240,.5)` の半透明でも使う）
- **Surface Light** (`#F8F8F8`) / (`#F9F9F9`): News / Release セクションの面
- **Surface Faint** (`#EEEEEE`): Links セクションの面

### Dark

- **Footer** (`#000000`): フッターの地色。文字は `#ffffff`
- **On Photo** (`#ffffff`): スライダー上のキャプション

### Accent

**なし。** 有彩色は作品画像の中だけ。UI には1色も置かない。

```
グレーの階調（#333 → #666 → #999 → #C4C4C4 → #E5E5E5 → #F0F0F0 → #F8F8F8）で
情報の強弱をつくる。色相を持ち込まない。
```

---

## 3. Typography Rules

### 3.1 和文フォント

**Noto Serif JP（明朝）1本。** ゴシックを一切使わない。

- **本文・見出し・ナビ・すべて**: `'Noto Serif JP', serif`
- Google Fonts から `wght@300;400;500;600;700;900` を読み込むが、
  実際に使うのは **400（本文）と 600（h4）** が中心

```css
@import url('//fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Noto+Serif+JP:wght@300;400;500;600;700;900&display=swap');

/* ローカルにあれば Noto Serif CJK JP を優先する */
@font-face {
  font-family: 'Noto Serif JP';
  font-style: normal; font-weight: 400; font-display: swap;
  src: local("Noto Serif CJK JP"), local("Noto Serif JP");
}
```

### 3.2 欧文フォント

- **Libre Baskerville**（セリフ）: 見出し（h1）、ナビ、ボタン、日付、
  作品タイトルの欧文。**サンセリフを一切使わない**

Baskerville はトランジショナル・ローマン体で、明朝と骨格の時代感が近い。
**和文明朝と欧文セリフを揃える**ことで、和欧が混じっても声が変わらない。

### 3.3 font-family 指定

**要素の中身によって3種類を打ち分ける。**

```css
/* 1. グローバル既定（和文） */
html {
  background: #ffffff;
  color: #000000;
  font-family: 'Noto Serif JP', serif;
  font-feature-settings: "palt";      /* 全要素に継承 */
  -webkit-font-smoothing: antialiased;
}
body { line-height: 1; }              /* 既定は 1。読ませる要素に個別指定 */

/* 2. 欧文だけの要素（見出し・ナビ・ボタン・日付） */
.en { font-family: 'Libre Baskerville', serif; }

/* 3. 和欧が混じる要素（欧文を先頭に置く） */
.mixed { font-family: 'Libre Baskerville', 'Noto Serif JP', serif; }

/* フォーム部品にも明示 */
input[type="text"], input[type="email"], input[type="tel"], textarea {
  font-family: 'Noto Serif JP', serif;
  border: none; border-radius: 0; outline: none; background: none;
}
```

**フォールバックの考え方**:
- **Webフォント単独型**。プラットフォームフォント（ヒラギノ明朝・游明朝）を
  チェーンに並べない。落ちる先は generic な `serif` だけ
- **混植チェーンは欧文が先頭**（`'Libre Baskerville','Noto Serif JP', serif`）。
  和文優先ではなく、**欧文の字形を優先して和文で埋める**
- 欧文単体の要素に和文を混ぜない

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Title | Libre Baskerville | 26px | 400 | 1.23 (32px) | normal | 「Work」「News」「Contact」。色 **#333333** |
| Lead | Libre Baskerville + Noto Serif JP | 22px | 400 | 1.23 (27px) | **0.036em** (0.8px) | 「人とテクノロジーの関係を探求し新しい表現を生み出す」 |
| Sub Head | Noto Serif JP | 19.2px | **600** | **1.0** (19.2px) | normal | 「Projects」「Shop」「Repository」 |
| Body | Noto Serif JP | 15px | 400 | **1.8** (27px) | **0.021em** (0.32px) | About の説明文 |
| List Item | Noto Serif JP | 15px | 400 | **2.0** (30px) | **0.011em** (0.16px) | News の各行 |
| Slider Caption | Libre Baskerville | 15px | 500 | **2.0** (30px) | normal | 写真上の作品名（白文字） |
| Filter / Tag | Libre Baskerville + Noto Serif JP | 14px | 400 | **1.8** (25.2px) | normal | 「All」「_Dance」「_Installation」 |
| Nav | Libre Baskerville | 13px | 400 | 1.23 (16px) | normal | 「Top / News / Work / Careers / Contact」。色 **#666666** |
| Date | Noto Serif JP | 13px | 400 | 1.23 (16px) | normal | 「April 17, 2026」。色 **#999999** |
| Button | Libre Baskerville | 12px | 400 | 1.33 (16px) | normal | 「View More」。色 **#666666** |
| Credit | Libre Baskerville | 12px | 400 | 1.42 (17px) | normal | 「Perfume」等のクレジット。色 **#999999** |
| Lang Switch | Libre Baskerville | 13px | 400 | 1.23 (16px) | normal | 「JP / EN」。色 **#999999** |

**ウェイトは 400 が基本**。600 を使うのは `h4`（「Projects」等の小見出し）だけ、
500 はスライダーのキャプションだけ。**700 以上を使わない**。

### 3.5 行間・字間

- **`body` の既定は `line-height: 1`**。行送りは読ませる要素に個別指定する
- **読ませる要素は 1.8〜2.0**。本文 15px→27px（1.8）、リスト 15px→30px（2.0）
- **見出し・ナビ・ボタンは 1.23〜1.33**。箱に収める要素は詰める
- **`letter-spacing` はほぼ `normal`**。開けるのは3箇所だけ:
  - リード（22px）→ **0.036em**（0.8px）
  - 本文（15px）→ **0.021em**（0.32px）
  - リスト（15px）→ **0.011em**（0.16px）
- **明朝＋`palt` で既に詰まっているため、字間を大きく開けない**

```css
/* 本文 — 明朝の読み物 */
.body-text {
  font-family: 'Noto Serif JP', serif;
  font-size: 15px;
  line-height: 1.8;          /* 27px */
  letter-spacing: 0.021em;   /* 0.32px */
  text-align: justify;
}

/* セクション見出し — 欧文セリフ */
h1 {
  font-family: 'Libre Baskerville', serif;
  font-size: 26px;
  font-weight: 400;
  line-height: 1.23;         /* 32px */
  color: #333333;
}

/* 小見出し — 和文明朝の 600 */
h4 {
  font-family: 'Noto Serif JP', serif;
  font-size: 19.2px;
  font-weight: 600;
  line-height: 1;
}
```

### 3.6 禁則処理・改行ルール

- **写真上のキャプションは `text-align: justify`**。作品名を写真幅いっぱいに両端揃え
- 「Rhizomatiks」「ELEVENPLAY」「Abstract Engine Co., Ltd.」は途中で折らない
- 作品名の欧文と和文が同じ行に並ぶことが多い
  （「tv asahi MUSIC STATION SUPER LIVE2025 Perfume」「角野隼斗 ピアノリサイタル "Klassik Arena"」）。
  **混植チェーン（欧文先頭）で欧文の字形を保つ**
- 引用符は `"…"`（英文用の丸引用符）をそのまま使う。和文の `「」` に置き換えない

### 3.7 OpenType 機能

```css
html { font-feature-settings: "palt"; }
```

- **`html` に指定して全要素に継承させる**。サイト内で `palt` を切る要素は無い
- 明朝の仮名と約物が詰まることで、**低密度の版面でも文字列が締まって見える**
- `letter-spacing` をほとんど開けないのは、`palt` で既に詰め組みになっているため。
  **`palt` ＋ 大きめの `letter-spacing` を併用しない**

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| Noto Serif JP | **そのまま**（Google Fonts）| 公開Webフォントのため実サイトと同一 |
| Libre Baskerville | **そのまま**（Google Fonts）| 同上 |

**代替不要。** 実サイトと同じ書体で完全に再現できる。

---

## 4. Component Stylings

### Buttons

**Outline Box（サイト唯一のボタン）**

```css
.btn-view-more {
  display: block;
  width: 249px;
  background: transparent;
  color: #666666;
  border: 1px solid #C4C4C4;
  border-radius: 0;
  padding: 13px 0;
  font-family: 'Libre Baskerville', serif;
  font-size: 12px;
  line-height: 1.33;
  text-align: center;
}
```

用例: 「View More」

**塗りボタンを持たない。** CTA は枠線1種類だけで、色でも面積でも優劣をつけない。
`padding` は上下 13px / 左右 0（幅を固定して中央揃え）。

### Cards / Thumbnails（作品サムネイル）

- Border / Shadow: **なし**。角丸も無し
- Background: `#F0F0F0`（画像読み込み前のプレースホルダ面）
- 構成: 画像 → 作品名（欧文セリフ 14px）→ クレジット（12px / `#999999`）

**ホバー（このサイトの数少ない動き）**

```css
.listbox .img { transition: filter .6s ease; will-change: filter; }
.listbox:hover .img        { transform: scale(1.03); }
.listbox:hover .imgWrapper { filter: brightness(125%); }
```

**拡大（1.03倍）と輝度アップ（125%）の2段**。暗くするのではなく**明るく持ち上げる**。
`@media (max-width: 860px)` では `transition: none` / `transform: none` に落として無効化する。

### Slider（トップのヒーロー）

- 画像上に作品名を白文字で置く（Libre Baskerville 15px / weight 500 / `line-height: 2.0`）
- キャプションの背景は `linear-gradient(rgba(51,51,51,0) 0%, rgba(51,51,51,.15) 100%)`
  — **黒ではなく `#333333` の 15% を下から薄くかける**
- ページネーションは小さな円（`border-radius: 50%`）

### Navigation

**ヘッダー**

- 左: ロゴ（手書き風スクリプトの `rhizomatiks`・画像）
- 右: 「News / Work / Careers / Contact」（Libre Baskerville 13px / `#666666`）
  ＋ 言語切替「JP」（13px / `#999999`）＋ ハンバーガー
- 背景は白。境界線を引かない

**フィルタ（Work 一覧）**

- 「All / _Dance / _Installation / …」を横並び（14px / `line-height: 1.8`）
- 選択中は `#333333`、非選択は `#999999`。**下線やボタン化をしない**
- カテゴリ名の頭に `_`（アンダースコア）を付ける独特の表記

**フッター**

- 背景 **`#000000`** / 文字 `#ffffff` / `padding: 90px 0 60px`
  （モバイルは `60px 0 40px`、幅 `max-width: 88%`）
- サイト内で唯一の暗い面

### Forms

```css
input[type="text"], input[type="email"], input[type="tel"], textarea {
  font-family: 'Noto Serif JP', serif;
  padding: 0;
  border: none;
  border-radius: 0;
  outline: none;
  background: none;
  -webkit-appearance: none;
  resize: none;
}
```

**入力欄の装飾を全部剥がす**。枠も背景もパディングも持たない。
下線を引いて入力位置を示す（`border-bottom: 1px solid #E5E5E5`）。

### Sections

- News / Release: `#F9F9F9` の面
- Links: `#EEEEEE` の面
- Work 一覧: `rgba(240, 240, 240, 0.5)` の半透明面

**セクションの区切りは面色の差だけ**。罫線を引かない。

---

## 5. Layout Principles

### Container

| 用途 | Max Width |
|------|-----------|
| **標準コンテナ** | **1156px** |
| ワイド | 1300px |
| 最大 | 1600px |
| 記事の版面 | 1200px |
| モバイル | 88%（フッター）|
| 小要素 | 520px / 145px |

### Layout Structure

- 1カラム中央寄せ。サイドバーを持たない
- トップは「フルブリードのスライダー → About → Projects/Shop/Repository →
  News / Release → Links → 黒いフッター」
- **セクションの境界は面色（`#F9F9F9` / `#EEEEEE` / `#F0F0F0`）で示す**

### Grid

- 作品サムネイル: 4カラム（1156px を等分）
- News / Release: 2カラム（日付 + タイトル）
- Projects / Shop / Repository: 3カラム

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 13px（ボタンの上下パディング）|
| M | 20px |
| L | 40px |
| XL | 60px |
| 2XL | 90px（フッター上部）|

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべて。CSS に `box-shadow` の宣言が1件もない** |
| — | `rgb(128,128,128) 0px 0px 5px 0px` | ブラウザ既定のフォーカスリングのみ |

**影を1つも使わない。** 階層は次の3つでつくる。

1. **面色の階調** — `#ffffff` → `#F9F9F9` → `#F8F8F8` → `#F0F0F0` → `#EEEEEE` → `#E5E5E5`
2. **文字色の階調** — `#000` → `#333` → `#666` → `#999` → `#C8C8C8`
3. **黒いフッター** — 唯一の反転面

ホバー時の `brightness(125%)` が、**影の代わりに「浮き」を表現する唯一の手段**。

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文は **Noto Serif JP（明朝）**、欧文は **Libre Baskerville（セリフ）**。
  ゴシック／サンセリフを使わない
- `html` に **`font-feature-settings: "palt"`** を置いて全体に継承させる
- 和欧が混じる要素は **`'Libre Baskerville','Noto Serif JP', serif`**（欧文が先頭）
- `body` の `line-height` は **1**。読ませる要素だけ 1.8〜2.0 に開く
- `letter-spacing` は基本 `normal`。開けても 0.011〜0.036em の範囲に留める
- UI の色は**グレースケールだけ**（`#000 / #333 / #666 / #999 / #C4C4C4 / #E5E5E5 /
  #F0F0F0 / #F8F8F8 / #F9F9F9 / #fff`）
- CTA は枠線ボックス1種（`1px solid #C4C4C4` / radius 0 / 12px / `#666666`）
- セクションの区切りは**面色の差**でつくる（罫線を引かない）
- サムネイルのホバーは `scale(1.03)` ＋ `brightness(125%)`（暗くせず明るくする）
- フッターだけ黒 `#000000` に反転する
- 入力欄の枠・背景・パディングを剥がし、下線だけで示す

### Don't（禁止）

- ゴシック体・サンセリフを使わない（**全要素セリフ**）
- **有彩色を UI に足さない**（色は作品画像の中だけ）
- `border-radius` を矩形に付けない（円 `50%` のページネーションだけが例外）
- `box-shadow` を使わない
- 塗りボタンを作らない（CTA は枠線1種）
- `font-weight: 700` 以上を使わない（400 基本、600 は h4 のみ）
- `palt` と大きな `letter-spacing` を併用しない
- ナビの選択状態を下線やボタン化で示さない（**文字色の濃淡**で示す）
- 中間ブレークポイントを刻まない（**860px の1本だけ**）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 860px** | **唯一のブレークポイント**（`@media screen and (max-width: 860px)` が 24 箇所）|
| Desktop | > 860px | 標準レイアウト |

**中間サイズを刻まない。** 768px でも 1024px でもなく **860px の1本**で切り替える。

### モバイルでの変化

- グローバルナビ → ハンバーガー ＋ ドロワー
- 作品サムネイル 4カラム → 2カラム
- コンテナ 1156px → `max-width: 88%`
- **ホバー演出を無効化する**（`transition: none` / `transform: none` /
  `will-change: auto`）。タッチ端末で拡大が残らないようにする
- フッターのパディング `90px 0 60px` → `60px 0 40px`
- **`palt` と明朝は維持する**（モバイルでも書体を切り替えない）

### タッチターゲット

- 「View More」は幅 249px / 上下パディング 13px で高さ約 42px。
  モバイルでは上下 15px に増やして 44px を確保する
- ナビ 13px は小さいので、モバイルのドロワーでは 16px 以上に上げる

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Ink:             #000000
Heading:         #333333（h1 は純黒ではない）
Text Sub:        #666666（ナビ・ボタン）
Text Muted:      #999999（日付・クレジット・言語切替）
Text Faint:      #7D7D7D / #888888 / #959595 / #C8C8C8
Border:          #C4C4C4（唯一の枠線色）
Divider:         #E5E5E5
Surface:         #F9F9F9 / #F8F8F8 / #F0F0F0 / #EEEEEE
Footer:          #000000（文字 #ffffff）
Accent:          なし（有彩色ゼロ）
JP Font:         'Noto Serif JP', serif（明朝）
EN Font:         'Libre Baskerville', serif（セリフ）
Mixed Font:      'Libre Baskerville', 'Noto Serif JP', serif（欧文が先頭）
Base Size:       15px（本文）/ 16px（html）
Line Height:     1（body 既定）/ 1.8〜2.0（読ませる要素）/ 1.23〜1.33（見出し・ナビ・ボタン）
Letter Spacing:  normal（基本）/ 0.036em（リード 22px）/ 0.021em（本文 15px）/ 0.011em（リスト）
Font Weight:     400（基本）/ 500（スライダーキャプション）/ 600（h4）。700 以上は使わない
Border Radius:   0px（矩形すべて）/ 50%（スライダーのページネーションだけ）
Shadow:          none（宣言ゼロ）
palt:            on（html に指定し全体へ継承）
Hover:           scale(1.03) + brightness(125%)（暗くせず明るくする）
Container:       1156px（標準）/ 1300px（ワイド）/ 1600px（最大）/ 88%（モバイル）
Breakpoint:      860px（1本だけ）
```

### プロンプト例

```
ライゾマティクス（Rhizomatiks）のデザインシステムに従って、作品一覧ページを作成してください。
- 白地 #ffffff。UI に有彩色を一切使わない。色はグレースケールだけ
  (#000 / #333 / #666 / #999 / #C4C4C4 / #E5E5E5 / #F0F0F0 / #F8F8F8 / #F9F9F9)
- 書体はすべてセリフ。ゴシック・サンセリフを使わない
    和文: 'Noto Serif JP', serif
    欧文: 'Libre Baskerville', serif
    和欧混植: 'Libre Baskerville', 'Noto Serif JP', serif（欧文が先頭）
- html に font-feature-settings: "palt" を置き、全要素へ継承させる
- body の line-height は 1。読ませる要素だけ 1.8〜2.0 に開く
  （本文 15px→27px、リスト 15px→30px）
- letter-spacing は基本 normal。リード 22px だけ 0.036em、本文 15px は 0.021em
- font-weight は 400 が基本。h4 だけ 600、スライダーのキャプションだけ 500。700 は使わない
- セクション見出し（h1）は Libre Baskerville 26px / 400 / line-height 1.23 / color #333333
- CTA は枠線ボックス1種だけ:
  width 249px / transparent / 1px solid #C4C4C4 / border-radius 0 /
  padding 13px 0 / 12px / color #666666 / text-align center
  塗りボタンを作らない
- 作品サムネイルは枠なし・角丸なし・影なし。プレースホルダ面は #F0F0F0
  ホバーは transform: scale(1.03) と filter: brightness(125%) の2段（暗くしない）
- セクションの区切りは面色の差でつくる（#F9F9F9 / #EEEEEE / rgba(240,240,240,.5)）。罫線を引かない
- フィルタは「All / _Dance / _Installation」のようにカテゴリ名の頭に _ を付け、
  選択中 #333333 / 非選択 #999999 の文字色だけで状態を示す（下線・ボタン化をしない）
- 入力欄は border / background / padding をすべて剥がし、border-bottom: 1px solid #E5E5E5 だけで示す
- box-shadow は一切使わない。border-radius は 0（円 50% はスライダーのページネーションのみ）
- フッターだけ背景 #000000 / 文字 #ffffff、padding 90px 0 60px
- 版面は 1156px 中央寄せの1カラム。ブレークポイントは 860px の1本だけ
- モバイル（≤860px）ではホバー演出を transition: none / transform: none で無効化する
```
