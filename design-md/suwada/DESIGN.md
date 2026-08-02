# DESIGN.md — SUWADA（諏訪田製作所）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-02 / 対象: `https://www.suwada.co.jp/`, `/about_ja/craftsmanship`, `/products_ja/nailnippers`

---

## 1. Visual Theme & Atmosphere

新潟県三条市の刃物メーカー（1926年創業）。ニッパー型つめ切りで知られ、
工場そのものを見せる「オープンファクトリー」を運営している。
サイトは**ページ地色が純黒 `#000000`** で、そこに工場の暗い写真を全画面で敷き、
白い明朝とセリフ体を置く。**暗室に工具を並べたような画面**をつくっている。

- **デザイン方針**: 黒地・全画面写真・セリフ体。刃物の金属光沢を暗さで引き立てる
- **密度**: 低い。1スクロールに1メッセージ。写真が主で文字は最小限
- **キーワード**: 黒地、全画面写真、明朝、2emの角丸、スクリム

**このサイトの特徴的な癖（他サイトと違う点）**

1. **`body` の背景が `#000000`**。白地に黒ではなく、黒地に白が既定。
   下層ページの本文エリアだけが白に反転する
2. **和文の読み物が明朝（Noto Serif JP）**。ナビ・フッターのUIだけがゴシック。
   「読ませる文＝明朝／機能の文字＝ゴシック」で書体を割る
3. **欧文見出しが Libre Baskerville の `font-weight: 300`**。
   セリフ体を細くして黒地に置くという、日本のメーカーサイトでは珍しい選択
4. **`border-radius` が px ではなく `2em`**。実測値が font-size のちょうど2倍
   （12px→24px、15.4px→30.8px、16.94px→33.88px）。文字サイズに追従する角丸
5. **font-size が `1.1em` の入れ子で決まる**。14 → 15.4 → 16.94 と
   1.1倍ずつ積み上がるため、実測値に小数が出る
6. **写真の上の文字は必ずスクリム（黒の半透明）越し**。透過率が
   0.2 / 0.4 / 0.5 / 0.7 の4段階で使い分けられている

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値。すべて hex -->

### Base（基調）

- **Background** (`#000000`): **ページ地色**。`body { background: #000 }` で明示指定
- **Text on Dark** (`#ffffff`): 黒地の上のすべての文字（見出し・本文・ナビ・フッター）
- **Surface Light** (`#f2f2f2`): グローバルナビのドロップダウン、下層の白地セクション
- **Text on Light** (`#000000`): 白地セクションの本文・見出し・ボタン文字

### Scrim（写真の上に敷く黒の半透明 — 4段階）

| 用途 | 値 | 使いどころ |
|------|-----|-----------|
| Hero | `rgba(0, 0, 0, 0.2)` | トップの全画面スライドショー。写真をほぼ生かす |
| Nav Card | `rgba(0, 0, 0, 0.4)` | ナビ内の画像カード（クラフトマンシップ・工場見学 等） |
| Page Header | `rgba(0, 0, 0, 0.5)` | 下層ページの見出し帯 |
| Footer | `rgba(0, 0, 0, 0.7)` | フッター。文字量が多いので最も濃い |

**Gradient Scrim（工程写真のキャプション下敷き）**

```css
background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%);
```

製造工程の写真カードで使用。上端は完全透明、下端は純黒。
写真の下部だけを潰してキャプションを読ませる。

### Neutral（ニュートラル）

- **Chip Dark** (`#222222`): カテゴリ札（「つめ切り」「クラフトマンシップ」）の面色
- **Divider** (`#cccccc`): 白地セクションの区切り罫
- **Text Muted** (`#888888`): ナビの言語切替「JP / EN / 中文」
- **Text Caption** (`#999999`): 商品カードの補足
- **Text Hover** (`#333333`): 白地ナビのホバー時

**注意**: 有彩色を1色も持たない。ロゴマークの赤だけが画像として存在し、
**CSS上のブランドカラーは無彩色のみ**。差し色を足さないこと。

---

## 3. Typography Rules

### 3.1 和文フォント

**役割で2系統に分ける**。

- **明朝体（読ませる文 — 本文・リード・見出しの和文）**: `"Noto Serif JP", serif`
- **ゴシック体（機能の文字 — ナビ・フッター・ボタン・UI）**:
  游ゴシック / ヒラギノ角ゴ ProN / メイリオ のプラットフォームフォント

和文Webフォントは Noto Serif JP の1本だけ。ゴシックは端末依存に任せている。

### 3.2 欧文フォント

- **セリフ（見出し専用）**: `"Libre Baskerville", serif` — `font-weight: 300` で使う
- **サンセリフ（UI）**: `"Source Sans Pro"`（一部で `"Helvetica Neue", Helvetica, Verdana` が先行）

英語の見出し（`Craftsmanship` / `Products` / `Nail Nippers`）は
すべて Libre Baskerville。**和文見出しの上に必ず英語見出しが乗る**二段構成。

### 3.3 font-family 指定

```css
/* UI・ナビ・フッター（ゴシック） */
font-family: "Source Sans Pro", 游ゴシック, YuGothic,
             "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, sans-serif;

/* 本文まわり（欧文フォールバックを1段厚くしたバリエーション） */
font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Verdana,
             游ゴシック, YuGothic, "ヒラギノ角ゴ ProN W3",
             "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif;

/* 読ませる和文（明朝） */
font-family: "Noto Serif JP", serif;

/* 欧文見出し */
font-family: "Libre Baskerville", serif;
```

**フォールバックの考え方**:
- **欧文優先チェーン**。`Source Sans Pro` を先頭に置き、和文は游ゴシック → ヒラギノ ProN →
  メイリオ の順で Win / Mac 双方を拾う
- 和文の明朝だけは Webフォント（Noto Serif JP）を積んで**端末差を消している**。
  読ませる文の見え方はブランドの一部という判断
- **游ゴシックが先、ヒラギノが後**。Windows を先に見る順序

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title (EN) | Libre Baskerville | 36px | **300** | **1.0** (36px) | **0.1em** (3.6px) | 下層の見出し帯「Craftsmanship」 |
| Section Title (EN) | Libre Baskerville | 36px | 300 | 1.5 (54px) | 0 | 「Nail Nippers」 |
| Hero Copy (EN) | Libre Baskerville | 28px | 300 | 1.5 (42px) | 0 | 「Making superior cutting tools since 1926」 |
| Sub Title (EN) | Libre Baskerville | 28px | 300 | 1.5 (42px) | 0 | 「Products」「News Topics」 |
| Small Title (EN) | Libre Baskerville | 21px | 300 | 1.5 (31.5px) | 0 | 「Models」 |
| Lead (JP) | Noto Serif JP | 16px | **600** | 1.8 (28.8px) | **0.1em** (1.6px) | ヒーローの和文コピー |
| Page Label (JP) | Noto Serif JP | 16px | 600 | 1.4 (22.4px) | 0.044em (0.7px) | 「クラフトマンシップ」 |
| Body (JP) | Noto Serif JP | 15.4px | 400 | **2.0** (30.8px) | 0.045em (0.7px) | リード本文 |
| Body Small (JP) | Noto Serif JP | 14px | 400 | **2.0** (28px) | 0.05em (0.7px) | 商品説明・工程説明 |
| Product Name | Source Sans Pro 系 | 22px | 600 | 1.5 (33px) | 0 | 「つめ切り」 |
| Nav | Source Sans Pro 系 | 14px | 400 | **2.0** (28px) | 0 | グローバルナビ |
| Nav Sub | Source Sans Pro 系 | 12px | 400 | 2.0 (24px) | 0 | 「中文」「お問い合わせ」 |
| Footer Heading | Source Sans Pro 系 | 14px | 600 | 1.5 (21px) | 0 | 「株式会社 諏訪田製作所」 |
| Footer Body | Source Sans Pro 系 | 14px | 400 | 1.5 (21px) | 0.05em (0.7px) | 住所・電話番号 |
| Base (body) | Source Sans Pro 系 | 14px | 400 | 1.5 (21px) | 0.02em (0.28px) | 継承の基準値 |

### 3.5 行間・字間

- **和文（明朝）の行間は一律 `2.0`**。15.4px→30.8px、14px→28px。
  黒地に白の明朝を読ませるための余裕
- **欧文見出しの行間は `1.5`**。ただし**下層の見出し帯だけ `1.0`** に詰め、
  代わりに `letter-spacing: 0.1em` で横に伸ばす
- **字間の基本は `0.05em`**（0.7px ÷ 14px）。和文明朝・フッターに共通
- **`0.1em` を使うのは2箇所だけ** … 下層ページの英語見出し（36px）と
  ヒーローの和文コピー（16px / weight 600）
- ナビ・欧文見出しは `letter-spacing: normal`

```css
/* 読ませる和文 */
.lead {
  font-family: "Noto Serif JP", serif;
  font-size: 15.4px;          /* = 14px × 1.1 */
  line-height: 2.0;
  letter-spacing: 0.045em;
  font-feature-settings: "palt";
}

/* 下層ページの英語見出し — 行を詰めて字間を空ける */
.page-title {
  font-family: "Libre Baskerville", serif;
  font-weight: 300;
  font-size: 36px;
  line-height: 1.0;
  letter-spacing: 0.1em;
}
```

> **`1.1em` の入れ子スケール**: このサイトは font-size を `em` で積むため、
> 実測に 15.4px / 16.94px / 30.8px / 33.88px という小数が現れる。
> それぞれ 14×1.1、14×1.1²、その2倍。**px で丸めず 1.1 倍の連鎖として実装する**と
> 同じリズムが再現できる。

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- ヒーローの和文コピーは `、` の位置で明示的に改行されている
  （「美を創りだす道具は、それ自身も美しく、／愛情が湧く本物でなければならない。」）。
  **読点で折る位置を人が決める**前提でコピー幅を設計する
- 「つめ切り」「ニッパー」など製品名は途中で折らない

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";
```

- **`body` は `normal`、その下のコンテンツ要素に `palt` が当たっている**。
  継承ではなく要素ごとの指定。実測で `body` だけ `font-feature-settings: normal`
- 明朝の和文にも `palt` が効いているため、括弧・句読点まわりが詰まる

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| Libre Baskerville | **そのまま**（Google Fonts） | 実サイトと同一。300ウェイトは400を細く見せる指定で近似 |
| Noto Serif JP | **そのまま**（Google Fonts） | 実サイトと同一 |
| Source Sans Pro | **Source Sans 3**（Google Fonts） | Source Sans Pro の後継版。字形はほぼ同一 |

**このサイトは代替がほぼ不要**。Adobe Fonts / 商用Webフォントを使っていないため、
preview.html でも実サイトとほぼ同じ見え方になる。

---

## 4. Component Stylings

### Buttons

**Outline Pill（主要CTA — 塗らずに枠線1本）**

- Background: `transparent`
- Text: `#000000`（白地）/ `#ffffff`（黒地）
- Border: **`2px solid currentColor`**
- Border Radius: **`2em`**（実測 30.8px ÷ font-size 15.4px）
- Padding: `15px 60px` — **左右を極端に広く取る**
- Font: 15.4px / weight 400 / `letter-spacing: 0.045em`

```css
.btn {
  display: inline-block;
  background: transparent;
  color: currentColor;
  border: 2px solid currentColor;
  border-radius: 2em;            /* px で書かない */
  font-size: 1.1em;              /* = 15.4px */
  line-height: 1;
  letter-spacing: 0.045em;
  padding: 15px 60px;
}
```

用例: 「ご購入はこちら」「商品カテゴリ一覧へ」「SUWADAについて」「YouTube」「Facebook」

**Filled Pill（ヘッダーの問い合わせ）**

- Background: `#ffffff` / Text: `#000000`
- Border: `2px solid #ffffff`（背景と同色。枠線ボタンと構造を揃えている）
- Border Radius: `2em`（実測 24px ÷ 12px）
- Padding: `11px 10px` / Font: 12px / weight 400

### Tags / Labels

**Category Chip（角丸ゼロの矩形）**

- Background: `#222222` / Text: `#ffffff`
- Border Radius: **`0px`** — ボタンが `2em` なのに対し、札は角丸を持たない
- Padding: `10px 20px` / Font: 14px / weight 400

用例: 「つめ切り」「クラフトマンシップ」

### Cards（商品カード・工程カード）

- Background: `transparent`（黒地にそのまま置く）
- Border / Shadow: なし
- 構成: 写真 → グラデーションスクリム → 番号（欧文 28px）→ 説明（明朝 14px / 2.0）

```css
.process-card {
  position: relative;
}
.process-card::after {          /* 写真の下部だけ潰す */
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(rgba(0,0,0,0) 0%, rgb(0,0,0) 100%);
}
```

### Navigation

- 黒地・白文字。ドロップダウンだけ `#f2f2f2` に反転し、文字は `#000000`
- 言語切替「JP / EN / 中文」は `#888888`、選択中のみ `#ffffff`
- ホバー時の白地ナビの文字は `#333333`

---

## 5. Layout Principles

### Container

- Max Width: `1170px`（Bootstrap 3 系 `.container` の既定）
- Padding (horizontal): 15px（デスクトップ）

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 10px |
| S | 15px |
| M | 30px |
| L | 60px |
| XL | 90px |
| XXL | 120px |

**15px の倍数**で組まれている（Bootstrap のグリッド由来）。

### Grid

- 商品一覧: 3カラム / Gutter 30px
- 製造工程: 3カラム（8工程を並べる）
- ヒーロー: 全画面（`100vw × 100vh`）のスライドショー

### Hero

- 高さ `100vh`。背景画像は `background-size: cover` のスライドショー
- 文字は左寄せ・垂直中央。**中央揃えにしない**

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。ほぼすべての要素** |

**影を一切使わない**。奥行きは影ではなく**スクリムの濃度**（0.2 / 0.4 / 0.5 / 0.7）で
表現する。手前に来るものほどスクリムが濃い。

---

## 7. Do's and Don'ts

### Do（推奨）

- ページ地色は `#000000`。白地セクションは `#f2f2f2` で部分的に反転させる
- 読ませる和文は明朝（`"Noto Serif JP", serif`）、UIはゴシックにする
- 和文本文の `line-height` は **2.0**、`letter-spacing` は `0.05em`
- 英語見出しは Libre Baskerville の `font-weight: 300`
- 和文見出しの上に必ず英語見出しを重ねる（「Craftsmanship / クラフトマンシップ」）
- ボタンの角丸は **`2em`**（px で書かない）。左右パディングは 60px と広く取る
- 写真の上の文字には必ずスクリムを敷く（0.2 / 0.4 / 0.5 / 0.7 の4段階）
- font-size は `1.1em` の入れ子で積む

### Don't（禁止）

- **有彩色を足さない**。CSS上のブランドカラーは無彩色のみ
- **影を使わない**。奥行きはスクリムの濃度でつくる
- ボタンを塗りつぶさない（ヘッダーの白ピルだけが例外）
- カテゴリ札に角丸を付けない（`border-radius: 0`）
- 和文本文をゴシックにしない。明朝であることが工房の印象をつくっている
- 和文の `line-height` を 1.5 以下にしない（黒地に白の明朝は行間が要る）
- ヒーローのコピーを中央揃えにしない（左寄せ・垂直中央）

---

## 8. Responsive Behavior

### Breakpoints

Bootstrap 3 系の既定値。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | < 768px | 1カラム。ナビはハンバーガー（`navbar-toggle`） |
| Tablet | 768–991px | 2カラム |
| Desktop | 992–1199px | 3カラム |
| Wide | ≥ 1200px | コンテナ 1170px |

### モバイルでの変化

- グローバルナビ → ハンバーガー。展開時は `#f2f2f2` の白地パネル
- 英語見出し 36px → 24px 前後。**`letter-spacing: 0.1em` は維持する**
- ボタンの左右パディング 60px → 30px 前後（画面幅に合わせて縮める）
- ヒーローは `100vh` を維持し、コピーは 2行から3〜4行に折り返す

### タッチターゲット

- 最小 44px × 44px。枠線ボタンは上下パディング 15px ＋ 2px ボーダーで約 47px を確保

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #000000（ページ地色）
Surface Light:   #f2f2f2（白地セクション・ドロップダウン）
Text on Dark:    #ffffff
Text on Light:   #000000
Chip:            #222222
Divider:         #cccccc
Text Muted:      #888888 / #999999
Scrim:           rgba(0,0,0,0.2 / 0.4 / 0.5 / 0.7)
Heading Font:    "Libre Baskerville", serif（weight 300 / 欧文のみ）
Reading Font:    "Noto Serif JP", serif（和文の本文・リード）
UI Font:         "Source Sans Pro", 游ゴシック, YuGothic,
                 "ヒラギノ角ゴ ProN W3", メイリオ, Meiryo, sans-serif
Body Size:       14px（base）/ 15.4px（リード）
Line Height:     2.0（和文本文・ナビ）/ 1.5（欧文見出し・フッター）/ 1.0（下層見出し）
Letter Spacing:  0.05em（和文本文）/ 0.1em（下層英語見出し・ヒーロー和文）
Border Radius:   2em（ボタン）/ 0（札）
Button:          transparent + 2px solid currentColor / padding 15px 60px
Shadow:          none
palt:            on（body は normal、コンテンツ要素に指定）
```

### プロンプト例

```
SUWADA（諏訪田製作所）のデザインシステムに従って、製品詳細ページを作成してください。
- ページ背景は #000000。本文セクションだけ #f2f2f2 に反転させる
- 黒地の文字は #ffffff、白地の文字は #000000
- 英語見出しは "Libre Baskerville", serif / font-weight: 300
  ページ上部の見出し帯は 36px / line-height: 1.0 / letter-spacing: 0.1em
  セクション見出しは 36px / line-height: 1.5 / letter-spacing: normal
- 和文の本文・リードは "Noto Serif JP", serif
  15.4px / line-height: 2.0 / letter-spacing: 0.045em
- ナビ・フッターは "Source Sans Pro", 游ゴシック, YuGothic,
  "ヒラギノ角ゴ ProN W3", メイリオ, Meiryo, sans-serif / 14px / line-height: 2.0
- 和文見出しの上に必ず英語見出しを重ねる（例: "Nail Nippers" / 「つめ切り」）
- ボタンは塗らず transparent + 2px solid currentColor
  border-radius: 2em（px で書かない）、padding: 15px 60px
- カテゴリ札は #222222 の背景に白文字、border-radius: 0、padding: 10px 20px
- 写真の上に文字を置くときは黒のスクリムを敷く
  ヒーロー rgba(0,0,0,0.2) / カード rgba(0,0,0,0.4) / 見出し帯 rgba(0,0,0,0.5) /
  フッター rgba(0,0,0,0.7)
- 工程写真のキャプションは linear-gradient(rgba(0,0,0,0), #000) を重ねて読ませる
- 影は使わない。有彩色を足さない
- font-feature-settings: "palt" をコンテンツ要素に当てる
- コンテナ幅 1170px、商品は3カラム / gutter 30px
```
