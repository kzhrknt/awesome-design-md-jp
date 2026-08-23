# DESIGN.md — 山崎実業（Yamazaki Home）

> 山崎実業（https://www.yamajitsu.co.jp/）のデザイン仕様書。
> `tower` / `tosca` / `plate` などのシリーズで知られる**住まいの収納・生活用品メーカー**の公式オンラインストア。
> **和文も欧文も 1 書体で通す**。`--font-body-family` と `--font-heading-family` がどちらも `"IBM Plex Sans JP"`。**見出し用の別書体を持たない**
> **`font-feature-settings: "palt"` が `body` からグローバルに継承される**。日本語サイトでは珍しく、**本文まで字詰めが効いている**
> **角丸をほぼ使わない**。ボタンの面・カード・画像はすべて `border-radius: 0px`。3px が付くのは**アウトラインボタンだけ**
> **色は「無彩色 + バッジ 3 色」だけ**。UI に有彩色はなく、`NEW` の赤・`BEST SELLER` の金・`COMING SOON` の灰**だけ**が色を持つ
> 実サイトの computed style 実測（2026-08-23 取得。トップ ＋ 商品一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地に製品写真だけを置く**。製品そのものが白・黒・木目のモノトーンなので、**UI が色を持たないことで製品の色が浮く**。罫線と余白だけで面を区切る
- **山崎実業について**: 奈良県発の生活用品メーカー。`tower`（スチール）、`tosca`（スチール＋天然木）、`plate`（木目）などシリーズごとに世界観が分かれるため、**サイト側は色を持たず器に徹する**
- **密度**: **中**。トップはメインビジュアル → ランキング → 新着 → カテゴリ → About → フッターと縦に積む。1 行 4 カラムの商品グリッドが基本
- **キーワード**: `IBM Plex Sans JP` 単一書体、`palt` グローバル、`border-radius: 0`、無彩色 `#4e4e56`、バッジ 3 色、影ゼロ
- **特徴**:
  - **書体が 1 つしかない**。`--font-body-family` = `--font-heading-family` = `"IBM Plex Sans JP", sans-serif`。**サイズとウェイトの差だけで階層をつくる**
  - **`palt` が本文にまで効く**。`body { font-feature-settings: "palt" }` が全要素に継承される。**例外は「PICK UP」等のセクション見出し（`s-pickup__header` の `h2`）で、そこだけ `normal` に戻している**
  - **ウェイトを振らない**。見出しも本文も `font-weight: 400`。太字は `--font-body-weight-bold: 700` として定義はあるが、**トップページでは 1 箇所も使われていない**（欧文見出しの Yantramanav / Roboto だけが 500）
  - **欧文は用途別に 3 書体**。`Yantramanav`（バッジ・英字ボタン・大見出し）、`Roboto`（ナビ・セクション見出し）、`Heebo`（数値・キャプション）。**和文には一切かからない**
  - **`border-radius` は 0 が原則**。`--buttons-radius: 0px` / `--media-radius: 0px` / `--product-card-corner-radius: 0rem`。**3px が付くのはアウトラインボタン（`c-button--outlined`）だけ**
  - **影を使わない**。`--buttons-shadow-opacity: 0.0` / `--media-shadow-opacity: 0.0`。面の区別は**罫線と面色**（`#f4f4f6` / `#f7f7f9`）でつける
  - **ローディングをシマーで見せる**。読み込み中のプレースホルダは `linear-gradient(90deg, rgba(200,200,200,.3) 25%, rgba(200,200,200,.5) 50%, rgba(200,200,200,.3) 75%)` の横流れグラデーション（22 箇所）
  - **`1rem = 10px`**。ルート `font-size: 10px`（Shopify Dawn の 62.5% ベース）。**rem 値を 16px 基準で読むと 1.6 倍ずれる**

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）。

### Neutral（ニュートラル＝ UI の全部）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| **Text Primary** | **`#4e4e56`** | 78,78,86 | **既定の文字色**。`body` に宣言。純黒を使わない |
| Text Strong | **`#3d3d43`** | 61,61,67 | セクション見出し `h2`、カート系ボタンの面 |
| Text Strongest | **`#35353a`** | 53,53,58 | 商品名（`h3` 18px） |
| Text Muted | **`#626267`** | 98,98,103 | ページネーションの数字 |
| Text Subtle | **`#7e7e88`** | 126,126,136 | アウトラインボタンの枠、`COMING SOON` の面 |
| Caption | **`#9e9eaa`** | 158,158,170 | 品番・補足（Heebo 12px w300） |
| Border | **`#d9d9d9`** | 217,217,217 | 区切り線 |
| Border（淡） | **`#d0d0d0`** | 208,208,208 | セカンダリボタンの枠 |
| Border（極淡） | **`#c1c1c1`** / **`#a0a0a0`** | — | 罫線のトーン違い |
| Surface | **`#f4f4f6`** | 244,244,246 | 通知バー・淡い面 |
| Surface（別トーン） | **`#f7f7f9`** | 247,247,249 | ランキングセクションの下地 |
| Surface Dark | **`#26373e`** | 38,55,62 | **フッターと About セクションの面**（濃い青みグレー） |
| Fill Black | **`#000000`** | 0,0,0 | プライマリボタンの面、選択中のバリアント |

- **`#4e4e56` は青みを含んだグレー**（純グレーではない）。`--ss-color-text-primary: #4E4E56` として変数にもあり、**実装値と一致する**
- **`#26373e` だけが「色」を持つ面**。フッターと About セクション。青緑に寄ったダークで、**黒ベタにしない**

### Badge（バッジ＝サイト唯一の彩度）

| バッジ | 面色 | rgb | 文字 | 意味 |
|--------|------|-----|------|------|
| **NEW** | **`#aa2b2b`** | 170,43,43 | `#ffffff` | 新商品 |
| **BEST SELLER** | **`#c3a856`** | 195,168,86 | `#ffffff` | 人気商品 |
| **COMING SOON** | **`#7e7e88`** | 126,126,136 | `#ffffff` | 入荷予定 |

- **この 3 色以外に有彩色を足さない**。カテゴリにも価格にもセールにも色を使わない
- `#aa2b2b` は**朱に寄せた深い赤**。純赤（`#ff0000`）や警告色にしない
- `#c3a856` は**くすんだ金**。`--jdgm-primary-color` / `--jdgm-star-color` にも同じ値が入っており、レビュー星の色と揃っている

### Accent（部分的な差し色）

- **Brown** (`#734e30`, rgb 115,78,48): 木目シリーズの帯
- **Beige** (`#e7d0a9`, rgb 231,208,169): 上記と対になる淡色
- **Lavender Gray** (`#dcdce3`, rgb 220,220,227): カテゴリカード（Kitchen 等）の下地

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **`IBM Plex Sans JP`**（Google Fonts / SIL OFL）。**唯一の和文書体**
- **明朝体**: **使わない**

### 3.2 欧文フォント

用途で 3 書体を使い分ける。**いずれも和文には適用しない**。

- **`Yantramanav`**: バッジ（`NEW` / `BEST SELLER` / `COMING SOON`）、英字ボタン（`VIEW MORE` / `VIEW ALL`）、大見出し
- **`Roboto`**: グローバルナビ、セクション見出し（`h2` 27px w500）
- **`Heebo`**: 数値・品番・キャプション（12px w300）、ページネーション（`2 / 5`）

### 3.3 font-family 指定

```css
/* 和文・既定（見出しも本文も同じ） */
font-family: "IBM Plex Sans JP", sans-serif;

/* 欧文ラベル・バッジ */
font-family: Yantramanav, sans-serif;

/* ナビ・セクション見出し */
font-family: Roboto, sans-serif;

/* 数値・キャプション */
font-family: Heebo, sans-serif;
```

**フォールバックの考え方**:
- **フォールバックチェーンを持たない**。`"IBM Plex Sans JP", sans-serif` の 2 段だけで、`游ゴシック` や `ヒラギノ` を並べない。**Web フォント前提の設計**
- CSS 変数として `--font-body-family` / `--font-heading-family` に**同じ値**が入っている。見出し用の別書体を足さない

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | IBM Plex Sans JP | 40px | 400 | 1.3 (52px) | normal | ヘッダーのロゴ `h1` |
| Section (欧文) | Roboto | 27px | 500 | 1.2 (32.4px) | normal | `TOP RANKING` 等 |
| Section (欧文・大) | Yantramanav | 26px | 500 | 1.2 (31.2px) | normal | メインビジュアル上の白文字 |
| Heading 2 | IBM Plex Sans JP | 24px | 400 | 1.3 (31.2px) | normal | `PICK UP` 見出し（**palt を解除**） |
| Product Name | IBM Plex Sans JP | 18px | 400 | 1.3 (23.4px) | 0.06em (1.08px) | 商品名 `h3`。**字間を開く** |
| Body | IBM Plex Sans JP | 16px | 400 | **1.7 (27.2px)** | normal | 既定 |
| Sub Heading | IBM Plex Sans JP | 15px | 400 | 1.5 (22.5px) | 0.02em (0.3px) | `h3` / `h4` |
| Sub Heading (詰) | IBM Plex Sans JP | 15px | 400 | 1.3 (19.5px) | normal | `h4` |
| List Item | IBM Plex Sans JP | 14px | 400 | 1.5 (21px) | 0.02em (0.28px) | `h3` 小 |
| Caption | IBM Plex Sans JP | 13px | 400 | 1.3 (16.9px) | 0.02em (0.26px) | 補足 |
| Caption (数値) | Heebo | 12px | **300** | 1.2 (14.4px) | normal | 品番。**唯一の Light** |
| Badge | Yantramanav | 10–11px | 400 | — | 0.02em | `NEW` は 11px、他は 10px |

- **ウェイトは 400 が基本**。500 が付くのは**欧文見出し（Roboto / Yantramanav）だけ**、300 は Heebo のキャプションだけ
- **本文の行間 1.7 は日本語として標準的だが、見出しは 1.2〜1.3 まで詰める**

### 3.5 行間・字間

- **本文の行間**: **1.7**（16px → 27.2px）
- **見出しの行間**: **1.2〜1.3**
- **小見出し・リストの行間**: **1.5**
- **本文の字間**: `normal`（**開かない**）
- **小見出し・キャプションの字間**: **0.02em**
- **商品名の字間**: **0.06em**（18px → 1.08px）。**商品名だけ明確に開く**
- **メインビジュアルの白文字**: **0.05em**（14px → 0.7px）

**ガイドライン**:
- **字間は `palt` に任せ、`letter-spacing` を大きく振らない**。開くのは商品名（0.06em）とヒーロー（0.05em）だけ
- 本文 16px / 行間 1.7 を既定にする。**カード内の 13〜15px では行間を 1.3〜1.5 に落とす**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 商品名は**シリーズ名 + 用途 + 品番**と長くなるため、カード内では 2 行で切って `…` を付ける

### 3.7 OpenType 機能

```css
/* body に宣言し、全要素へ継承させる */
body { font-feature-settings: "palt"; }

/* セクション見出しだけ解除する */
.s-pickup__header h2 { font-feature-settings: normal; }
```

- **`palt` はグローバル適用**。`body` から `h1` `h3` `h4` `p` `a` `span` `li` `button` `nav` `footer` まで**すべてに継承されている**
- **`normal` に戻している例外が実在する**。`s-pickup__header` の `h2`（24px）。**セクション見出しは字送りをベタに戻す**という判断
- `kern` は明示していない

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary（黒ベタ）** — カート投入・バリアント選択

- Background: `#000000`
- Text: `#ffffff`
- Border: `1px solid #000000`
- Padding: `2px 13px`
- Border Radius: **`0px`**
- Font Size: 14px / Weight: 400

**Cart（ダークグレー）** — カートドロワー内

- Background: `#3d3d43`
- Text: `#ffffff`
- Border: `1px solid #3d3d43`
- Padding: `12px 18px`
- Border Radius: **`2px`**（ドロワー内 CTA は `3px`）
- Font Size: 13px / Weight: 400

**Outlined（枠だけ）** — `VIEW MORE` / `VIEW ALL` / `山崎実業について`

- Background: `transparent`
- Text: `#4e4e56`（濃い面の上では `#ffffff`）
- Border: `1px solid #7e7e88`（濃い面の上では `1px solid #ffffff`）
- Padding: `1.5px 16px 0`
- Border Radius: **`3px`** ← **サイトで唯一角丸が付くパーツ**
- Font: `Yantramanav` 15px / ls 0.05em（和文ラベルのときは `IBM Plex Sans JP` 14px）

**Secondary（白地）** — 「買い物を続ける」

- Background: `#ffffff`
- Text: `#3d3d43`
- Border: `1px solid #d0d0d0`
- Padding: `0 16px`
- Border Radius: `3px`

### Badges

- Border Radius: **`0px`**
- Padding: `1px 5px 0`
- Font: `Yantramanav` 10–11px / ls 0.02em
- Text: `#ffffff`
- Background: `#aa2b2b`（NEW）/ `#c3a856`（BEST SELLER）/ `#7e7e88`（COMING SOON）

### Variant Selector（カラー選択）

- 選択中: Background `#000000` / Text `#ffffff` / Border `1px solid #000000`
- 未選択: Background `transparent` / Text `#000000` / Border `1px solid #000000`
- Padding: `5px` / Border Radius: **`0px`**
- Font Size: 14px

### Inputs

- Border: `1px solid`（`--inputs-border-width: 1px` / `--inputs-border-opacity: 0.55`）
- Border Radius: **`0px`**（`--inputs-radius: 0px`）
- Shadow: なし

**Focus ring**（`--focused-base-box-shadow`）:

```css
box-shadow: 0 0 0 0.3rem rgb(255, 255, 255), 0 0 0.5rem 0.4rem rgba(78, 78, 86, 0.3);
```

- **白の輪を内側に、`#4e4e56` の 30% を外側に**の 2 重リング。`1rem = 10px` なので**内側 3px / 外側ぼかし 5px**

### Cards

- Background: `#ffffff`
- Border Radius: **`0px`**（`--product-card-corner-radius: 0.0rem`）
- Border: なし（`--product-card-border-width: 0.0rem`）
- Shadow: 実質なし（`--product-card-shadow-blur-radius: 0.0rem`）
- Text Alignment: `left`
- Max Width: 250px（グリッド時）

### Pagination（メインビジュアル）

- Background: `rgba(255, 255, 255, 0.65)`
- Text: `#626267`
- Border Radius: **`11px`**（pill）
- Padding: `2px 10px 0`
- Font: `Heebo` 13px

### Skeleton（読み込み中）

```css
background: linear-gradient(90deg,
  rgba(200,200,200,.3) 25%, rgba(200,200,200,.5) 50%, rgba(200,200,200,.3) 75%);
/* 画像枠には不透明版 */
background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%);
```

---

## 5. Layout Principles

### Spacing Scale

実測で頻出する値（`gap` の出現順）:

| Token | Value | 用途 |
|-------|-------|------|
| XXS | 2px | バッジの並び |
| XS | 6–7px | **最頻出**（6.5px / 7px）。カード内の要素間 |
| S | 10px | 小要素の間 |
| M | 12px | リスト |
| L | 25px | セクション内 |
| XL | 48px | フッターの左右パディング |
| XXL | 82px | フッター上部パディング |

- **`1rem = 10px`**。rem 値は 10 倍で読む（`1.6rem` = 16px）

### Container

- Max Width: **`1440px`**（サイト全体の基準。12 箇所）
- Max Width（ワイド）: `1890px`（メインビジュアル等の全幅セクション）
- カード幅: `250px` / 記事幅: `450px`

### Grid

- 商品グリッド: 4 カラム（デスクトップ）
- Gutter: 6.5px 前後の詰めたガター（写真同士を近づける）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。ボタン・カード・画像すべて** |
| 1 | `0 0 25px rgba(0,0,0,0.2)` | 画面端に固定されるお気に入りタブ |
| Focus | `0 0 0 0.3rem #fff, 0 0 0.5rem 0.4rem rgba(78,78,86,.3)` | フォーカスリング |

- **`--buttons-shadow-opacity: 0.0` / `--media-shadow-opacity: 0.0` / `--popup-shadow-opacity: 0.0`**。**影を持たないことがルール**
- 浮かせたいときは**影ではなく面色（`#f4f4f6` / `#f7f7f9`）**で区別する

---

## 7. Do's and Don'ts

### ⚠ CSS 変数と実装値の乖離

**このサイトは Shopify のテーマ変数を持つが、一部は実装で上書きされている。変数を見て実装しないこと。**

| 変数 | 宣言値 | 実装値 | 判定 |
|------|--------|--------|------|
| `--font-body-family` | `"IBM Plex Sans JP", sans-serif` | 同左 | ✅ 一致 |
| `--font-heading-family` | `"IBM Plex Sans JP", sans-serif` | 同左 | ✅ 一致 |
| `--ss-color-text-primary` | `#4E4E56` | `#4e4e56` | ✅ 一致 |
| `--buttons-radius` | `0px` | Primary は `0px` / Outlined は **`3px`** | ⚠ 部分的に上書き |
| **`--badge-corner-radius`** | **`4.0rem`（= 40px）** | **`0px`** | ❌ **乖離**。バッジは角丸ゼロ |
| **`--variant-pills-radius`** | **`40px`** | **`0px`** | ❌ **乖離**。カラー選択は角丸ゼロ |
| `--swiper-theme-color` | `#007aff` | 未使用 | ❌ Swiper 既定値が残っているだけ |
| `--swym-remind-cta-bg-color` | `#00a65a` | 未使用 | ❌ 外部アプリ既定。ブランド色ではない |

- **`--badge-corner-radius: 4.0rem` を信じて pill バッジを作ると、実サイトと完全に別物になる**。実装は角丸ゼロの矩形
- `swym-` / `kt-` / `jdgm-` / `lf-` プレフィックスのクラス・変数は**外部アプリ由来**。ブランドの設計として扱わない（例外: `--jdgm-primary-color: #C3A856` は `BEST SELLER` バッジと同色に揃えてある）

### Do（推奨）

- **和文・欧文とも `"IBM Plex Sans JP"` 1 書体で組む**。見出し用に別書体を足さない
- **`body` に `font-feature-settings: "palt"` を宣言し、全体へ継承させる**
- **`border-radius: 0` を既定にする**。角丸を許すのはアウトラインボタンの `3px` だけ
- **`box-shadow: none` を既定にする**。面の区別は `#f4f4f6` / `#f7f7f9` で行う
- **文字色は `#4e4e56`**。青みを含んだグレーで、純黒・純グレーにしない
- 有彩色は**バッジ 3 色（`#aa2b2b` / `#c3a856` / `#7e7e88`）に限定**する
- **フォーカスリングは 2 重**（白の内輪 + `rgba(78,78,86,.3)` の外輪）にする
- 商品名には `letter-spacing: 0.06em` を当てて開く

### Don't（禁止）

- **`font-weight: 700` を見出しに使わない**。階層はサイズと色でつける（実サイトのトップに太字は 1 箇所もない）
- **バッジやカラー選択に角丸を付けない**（変数の `4.0rem` / `40px` に引きずられない）
- **UI に赤・金以外の有彩色を持ち込まない**。セール色・カテゴリ色を新設しない
- **本文に `letter-spacing` を大きく振らない**。字詰めは `palt` に任せる
- **rem を 16px 基準で計算しない**。ルートは `10px`
- **和文フォントにフォールバックチェーンを足さない**方針だが、**Web フォントが落ちたときの保険として `sans-serif` は必ず残す**
- 影でカードを浮かせない

---

## 8. Responsive Behavior

### Breakpoints

media query に実在する値（主要なもの）:

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 480px | 1 カラム。`480px` / `481px` で切り替え |
| Mobile（大） | ≤ 749px | `749px` / `750px`（Shopify Dawn 標準） |
| Tablet | ≤ 768px | `768px` / `769px` |
| Desktop | ≥ 990px | `989px` / `990px`（Dawn 標準）。以降 `992px` / `1024px` |

- **`750px` と `990px` が主軸**。`374px` / `400px` / `411px` / `436px` など**端末実寸のピンポイント指定**も混ざる

### タッチターゲット

- 最小 44px × 44px

### フォントサイズの調整

- **`body` は 375px〜1920px まで 16px 固定**。ルート `font-size` も `10px` 固定で、**流体タイポグラフィを使っていない**
- 縮めるのは**見出しとグリッドのカラム数**であって、本文サイズではない

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Fill:   #000000
Text Color:     #4e4e56
Text Strong:    #3d3d43
Background:     #ffffff
Surface:        #f4f4f6 / #f7f7f9
Surface Dark:   #26373e
Border:         #d9d9d9
Badge:          #aa2b2b (NEW) / #c3a856 (BEST SELLER) / #7e7e88 (COMING SOON)
Font:           "IBM Plex Sans JP", sans-serif
Font (欧文):    Yantramanav / Roboto / Heebo
Body Size:      16px
Line Height:    1.7
Letter Spacing: normal（palt に任せる）
Border Radius:  0px（アウトラインボタンのみ 3px）
Box Shadow:     none
Root font-size: 10px（1rem = 10px）
```

### プロンプト例

```
山崎実業のデザインシステムに従って、商品カードのグリッドを作成してください。
- フォント: "IBM Plex Sans JP", sans-serif（見出しも本文も同じ書体）
- body に font-feature-settings: "palt" を宣言して全体に継承させる
- 文字色: #4e4e56、商品名は #35353a / 18px / letter-spacing: 0.06em
- 品番は Heebo 12px w300 / #9e9eaa
- カードは border-radius: 0px、box-shadow なし、背景 #ffffff
- バッジは角丸ゼロの矩形、padding: 1px 5px 0、Yantramanav 10px
  NEW = #aa2b2b / BEST SELLER = #c3a856（いずれも白文字）
- 「VIEW MORE」ボタンだけ border-radius: 3px、透明背景、1px solid #7e7e88
- font-weight は 400 のみ使う（太字にしない）
```
