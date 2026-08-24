# DESIGN.md — ミツカン（Mizkan）

> ミツカン（https://www.mizkan.co.jp/）のデザイン仕様書。
> 1804年創業、半田の酢からはじまった**食品メーカーのコーポレート＋レシピサイト**。「やがて、いのちに変わるもの。」をタグラインに掲げる。
> **ブランド色は緑 1 色（`#093` ＝ `#009933`）**。CSS 上の実出現は **487 回**で、他のどの色よりも桁違いに多い。**この 1 色だけで「ミツカンの面」を作る**
> **`#093` という 3 桁ショートハンドで書かれている**。`#009933` とフルで書かれた箇所は 1 つもない。実測値（`rgb(0,153,51)`）と一致する
> **書体は `Lato` 先頭の欧文優先スタック**。和文は `ヒラギノ角ゴ ProN` → `游ゴシック` → `Noto Sans CJK JP` の順。**数字とアルファベットだけ Lato に落とす**設計
> **主 CTA は「塗り」ではなく「オレンジの 2px 罫 ＋ 白地」**。塗りボタンは緑の小さなカテゴリバッジ（12px）にしか使わない
> 実サイトの computed style 実測（2026-08-24 取得。トップ ＋ 企業情報 `/company/`）＋ `bundle.css` / `header.css` の直接 grep に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地 ＋ 緑の罫**。面を塗って主張せず、**セクション見出しの左に緑の縦罫**を 1 本立てて区切る。装飾は最小限で、代わりに商品・料理写真のバナーが色を担う
- **ミツカンについて**: 酢・味ぽん・追いがつおつゆ・納豆（金のつぶ）などの食品メーカー。サイトは**コーポレート情報とレシピ（おうちレシピ）が同居**しており、レシピ側の情報密度が高い
- **密度**: **中〜高**。トップは大型バナー ＋ 4 カラムの特集カードが縦に積み重なる。メガメニューは 3〜4 階層をいちどに開く（`nav.l-header_nav` 配下だけで CTA 候補が 20 件以上出る）
- **キーワード**: 緑 `#093` 単色、`Lato` 先頭スタック、白地、オレンジの 2px アウトライン CTA、影ゼロ、radius 3〜4px
- **特徴**:
  - **ブランド色が 1 色に絞られている**。`#093` が 487 回に対し、2 番目の緑 `#009e41` は 7 回だけ。**迷ったら `#093`** でよい
  - **`box-shadow` を一切使わない**（全要素 `none`）。階層は**面色 `#f5f5f5` / `#f8f8f5` / `#f2f2f2`** と余白で作る
  - **主 CTA が白地 ＋ オレンジ 2px 罫**（`#ec870e`、CSS 出現 20 回）。**緑は面（バッジ・検索ボタン）に、オレンジは線（誘導ボタン）に**という役割分担
  - **radius が 3px / 4px と極端に小さい**。ピル（9999px）は 1 つもない。**角丸はほぼ直角**
  - **CSS Custom Property を持たない**（`--swiper-*` は Swiper ライブラリの既定値）。色はすべて CSS に直書き
  - **お知らせ見出しだけ赤**（`#ec0e18`、CSS 出現 14 回）。**赤は緊急・注意にしか使わない**。PDF バッジは別の赤 `#ec0e0e`
  - **和文の `letter-spacing` が px 指定**（`0.8px` / `0.7px` / `0.18px`）。em ではなく px で書かれているため、**サイズを変えると字間比率が崩れる**
  - **`font-feature-settings` は全要素 `normal`**。`palt` を使わない

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (3/6)`）。

### Brand（ブランド）

- **Mizkan Green** (`#009933`, rgb 0,153,51): **主色**。CSS では **`#093` と 3 桁で書かれ、487 回出現**する。カテゴリバッジの面、検索ボタンの面、罫、セクション見出しの縦罫
- **Green Alt** (`#009e41`, rgb 0,158,65): **メガメニューの小見出し文字**（「商品カテゴリ」等）。CSS 出現 7 回。**`#093` とは別値なので混同しない**（実測でも両方確認済み）
- **Green Deep** (`#149933` / `#149833`, rgb 20,153,51 / 20,152,51): グラデーション・ホバーの深緑。各 7〜8 回

### Accent（アクセント）

- **CTA Orange** (`#ec870e`, rgb 236,135,14): **誘導ボタンの 2px 罫**。CSS 出現 20 回。**面には塗らず、線としてだけ使う**
- **Orange Light** (`#ec8725`, rgb 236,135,37): オレンジのホバー・派生。3 回
- **Alert Red** (`#ec0e18`, rgb 236,14,24): **「お知らせ」見出しと注意喚起の枠**。14 回
- **PDF Red** (`#ec0e0e`, rgb 236,14,14): **PDF バッジの面**（白文字 12px / 700 / radius 4px）。6 回
- **Deep Red** (`#d30000` / `#e30000`): 重要告知の文字。4 回 / 3 回
- **Yellow Green** (`#8cc63e`, rgb 140,198,62): 図版・イラスト内の差し色。7 回
- **Chartreuse** (`#e3e300`, rgb 227,227,0): 図版の差し色。8 回

### Neutral（ニュートラル）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| 文字（主） | **`#333333`** | 51,51,51 | `body` の既定色・本文・見出し |
| 文字（ナビ） | **`#212121`** | 33,33,33 | ヘッダー／メガメニューの文字。CSS 出現 15 回 |
| 罫（濃） | **`#d1d1d1`** | 209,209,209 | 区切り線 |
| 罫（淡） | **`#c7c7c7`** | 199,199,199 | 補助罫 |
| フッター | **`#333333`** | 51,51,51 | フッター最下部の帯（白文字） |

### Surface（面色）

| 面 | 色 | rgb | 用途 |
|----|-----|-----|------|
| 灰（最頻） | **`#f5f5f5`** | 245,245,245 | ユーティリティナビの帯、汎用の面。**CSS 出現 63 回でトップ** |
| 生成り緑 | **`#f8f8f5`** | 248,248,245 | 「おすすめ特集」「公式通販」セクションの面。**わずかに黄緑みがある**。25 回 |
| 灰（淡） | **`#f2f2f2`** | 242,242,242 | 画像プレースホルダ・補助ブロック。21 回 |
| ミント | **`#ccebd6`** | 204,235,214 | アイコンの円形背景。**`#093` を薄めた面**。4 回 |
| クリーム | **`#fff6e3`** | 255,246,227 | キャンペーン告知の面。5 回 |
| 生成り黄 | **`#f7f7e9`** | 247,247,233 | レシピ関連ブロックの面。6 回 |
| 淡黄 | **`#fbf8d9`** | 251,248,217 | バナー内の面 |
| 淡青 | **`#e2f5f8`** | 226,245,248 | バナー内の面 |

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: ヒラギノ角ゴ ProN → 游ゴシック → Noto Sans CJK JP → ヒラギノ角ゴ（Hiragino Sans）
- **明朝体**: **使用しない**

### 3.2 欧文フォント

- **サンセリフ**: **Lato**（本文・見出しの先頭に置き、数字とアルファベットだけを受け持つ）
- **等幅**: 指定なし

### 3.3 font-family 指定

```css
/* 本文・見出し（body / main 配下）— Lato 先頭の欧文優先 */
font-family: Lato, "Hiragino Kaku Gothic ProN", "Yu Gothic",
             "Noto Sans CJK JP", "Hiragino Sans", sans-serif;

/* ヘッダー・メガメニュー・フッター — Lato を外した和文優先 */
font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic",
             "Noto Sans CJK JP", "Hiragino Sans", sans-serif;

/* 一部の見出し（YuGothic の別表記を含むバリアント） */
font-family: "Hiragino Kaku Gothic ProN", YuGothic, "Yu Gothic",
             "Hiragino Sans", sans-serif;
```

**フォールバックの考え方**:
- **`Lato` を先頭に置くのは本文・見出し（`main` 配下）だけ**。ヘッダー／ナビ／フッターは Lato を外した和文優先スタックを使う。**この 2 本立てが実測で確認できる**
- 和文は **ヒラギノ ProN → 游ゴシック → Noto Sans CJK JP** の順。ProN（`N` 付き）なので**日本語字形の JIS90 対応**
- `Hiragino Sans` を最後に置いているのは、ProN が無い新しめの macOS を拾うため

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Heading | Lato + 和文 | 24px | 700 | normal | normal | 「おすすめ特集」「おすすめレシピ」。**左に緑の縦罫** |
| Section Heading（帯） | 和文優先 | 24px | 700 | 24px (1.0) | 0.24px (0.01em) | 「ミツカン365」等のバナー内見出し |
| Alert Heading | Lato + 和文 | 18px | 700 | 18px (1.0) | normal | **「お知らせ」。色 `#ec0e18`** |
| Sub Heading | 和文優先 | 18px | 700 | normal | 0.18px (0.01em) | 「公式SNS」 |
| Card Title | Lato + 和文 | 18.72px | 700 | normal | normal | 特集カードの見出し |
| Card Title（小） | Lato + 和文 | 15px | 700 | 24px (1.6) | normal | 2 行想定のカード見出し |
| Nav（大） | 和文優先 | 21px | 700 | 21px (1.0) | normal | メガメニューの親項目 |
| Nav | 和文優先 | 16px | 400 | 16px (1.0) | 0.8px (0.05em) | グローバルナビ |
| Nav（小・太） | 和文優先 | 15px | 700 | 22.5px (1.5) | normal | メガメニューの小見出し |
| Utility Nav | 和文優先 | 14px | 700 | 14px (1.0) | 0.7px (0.05em) | 最上段「業務用サイト」等 |
| Body | Lato + 和文 | 16px | 400 | normal | normal | `body` の既定。色 `#333333` |
| Caption | 和文優先 | 14px | 400 | 21px (1.5) | -1.5px | メガメニューの説明文。**負の字間** |
| Small | 和文優先 | 12px | 400 | 18px (1.5) | -0.4px | 商品カテゴリの細目。**負の字間** |
| Badge | 和文優先 | 12px | 700 | — | normal | 緑バッジ・PDF バッジ |
| Footer Nav | 和文優先 | 13px | 700 | — | normal | フッターのナビ |

### 3.5 行間・字間

- **本文の行間**: `normal`（＝ 約 1.5）。**明示指定を持たない**のがこのサイトの特徴
- **見出しの行間**: **`1.0`**（`font-size` と同値の px を直接指定：24px/24px、18px/18px、21px/21px）。**1 行見出しを前提にしている**ので、2 行になると詰まりすぎる点に注意
- **説明文の行間**: `1.5`（15px/22.5px、14px/21px、12px/18px）
- **カード見出しの行間**: `1.6`（15px/24px）
- **本文の字間**: `normal`
- **ナビの字間**: **`0.05em`**（16px に対し 0.8px、14px に対し 0.7px）
- **メガメニュー説明文の字間**: **負値**（14px に対し `-1.5px` ≒ `-0.107em`、12px に対し `-0.4px` ≒ `-0.033em`）。**狭いカラムに詰め込むための調整**で、本文には使わない

**ガイドライン**:
- **見出しに `line-height: 1.0` を使うのはミツカン流だが、2 行以上になる見出しでは 1.4 に緩める**
- `letter-spacing` が **px 指定**なので、レスポンシブでサイズを変えるときは **em に換算し直す**（16px → `0.05em`）

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

- 商品名・レシピ名は `<br>` で改行位置を固定している箇所が多い
- **行頭禁止**: `）」』】〕〉》、。，．・：；？！`
- **行末禁止**: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* サイト全体で palt を使わない */
```

- **`palt` を適用していない**（全要素 `normal`）。**商品名に「味ぽん」「追いがつおつゆ」など括弧・中黒を含む表記が多く、詰めると読みにくくなる**ため
- `Lato` が先頭にあるので、**欧文のカーニングは Lato 側の既定に任せる**

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary（誘導ボタン — 白地 ＋ オレンジ 2px 罫）**
- Background: `#ffffff`
- Text: `#333333`
- Border: **`2px solid #ec870e`**
- Border Radius: **`3px`**
- Font Size: 16px / Weight 400
- 例: 「おすすめレシピはこちら」「おうちレシピ トップ」

**Badge / Category Chip（緑の塗り）**
- Background: **`#009933`**
- Text: `#ffffff`
- Padding: **`5px 10px`**
- Border Radius: **`4px`**
- Font Size: 12px / Weight 700
- 例: 「商品」「キャンペーン他」「企業」

**PDF Badge（赤の塗り）**
- Background: **`#ec0e0e`**
- Text: `#ffffff`
- Padding: **`0 4px`**
- Border Radius: `4px`
- Font Size: 12px / Weight 700

**Search Button（緑の塗り ＋ 同色罫）**
- Background: `#009933`
- Border: `1px solid #009933`
- Border Radius: **`3px`**
- Font Size: 16px

**Utility Nav Button（灰の面）**
- Background: **`#f5f5f5`**
- Text: `#212121`
- Padding: `0 6px`
- Border Radius: **`0px`**（角丸なし）
- Font Size: 14px / Weight 400

### Inputs

- Background: `#ffffff`
- Border: `1px solid #d1d1d1`
- Border Radius: **`3px`**（検索窓は 3px）
- Padding: `0 9px`
- Font Size: 16px
- 検索ボタンと横並びで、**ボタン側だけ `#009933` の塗り**

### Cards

- Background: `#ffffff`
- Border: なし（**罫を持たない**）
- Border Radius: **`6px`**（画像リンク）／本文ブロックは `0px`
- 区切りは**面色 `#f8f8f5` のセクション背景**で作る
- Shadow: **`none`**

### Section Heading（緑の縦罫）

セクション見出しは**左に緑 `#009933` の縦罫**を立てる。ミツカンで最も特徴的なパターン。

```css
.section-heading {
  border-left: 4px solid #093;
  padding-left: 16px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}
```

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 4px | バッジ内の余白 |
| S | 6px | ユーティリティナビの左右 |
| M | 10px | バッジ・チップの左右 |
| L | 20px | メガメニュー項目の左右 |
| XL | 40px | メガメニューのブロック間 |
| XXL | 50px | メガメニューの左インデント |

### Container

- Max Width: **1200px** 相当（トップの特集カード 4 カラムが 1440px ビューポートで左右に余白を残す）
- Padding (horizontal): 20px

### Grid

- **特集カード: 4 カラム**（gutter 約 24px）
- レシピカード: 4 カラム
- メガメニュー: 3〜4 カラム

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **サイト内の全要素** |

**ミツカンは `box-shadow` を一切使わない**（実測で全要素 `none`）。階層は次の順で面色を切り替えて作る:

```
#ffffff（地） → #f8f8f5（特集セクション） → #f5f5f5（ユーティリティ帯） → #f2f2f2（補助ブロック）
```

---

## 7. Do's and Don'ts

### Do（推奨）

- **ブランド色は `#009933` の 1 色に絞る**。CSS では `#093` と 3 桁で書く（サイトの実装に合わせる）
- **セクション見出しの左に緑の縦罫（`border-left: 4px solid #093`）を立てる**
- **主 CTA は白地 ＋ `2px solid #ec870e` の罫 ＋ radius 3px**。緑で塗らない
- **緑の塗りはバッジ（12px / 700 / radius 4px / padding 5px 10px）にだけ使う**
- 本文・見出しは `Lato` 先頭スタック、**ヘッダー／ナビ／フッターは `Lato` を外した和文優先スタック**
- 階層は**面色（`#ffffff` → `#f8f8f5` → `#f5f5f5` → `#f2f2f2`）と余白**で作る
- `letter-spacing` を em に換算して指定する（ナビ = `0.05em`）

### Don't（禁止）

- **`box-shadow` を使わない**。ミツカンのサイトには 1 か所も存在しない
- **ピル（`border-radius: 9999px`）を使わない**。最大でも 6px
- **`#009933` と `#009e41` を混ぜない**。前者は面・罫（487 回）、後者はメガメニューの小見出し文字（7 回）と役割が違う
- **赤を装飾に使わない**。`#ec0e18` は「お知らせ」見出しと注意喚起、`#ec0e0e` は PDF バッジ専用
- **`font-feature-settings: "palt"` を当てない**。商品名の括弧・中黒が詰まりすぎる
- **2 行以上になる見出しに `line-height: 1.0` を使わない**（ミツカンの見出しは 1 行前提）
- **メガメニューの負の字間（`-1.5px`）を本文に持ち込まない**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。メガメニューはドロワーに畳む |
| Tablet | 768–1024px | 特集カード 2 カラム |
| Desktop | > 1024px | 特集カード 4 カラム ＋ メガメニュー展開 |

### タッチターゲット

- 最小 44px × 44px。**バッジ（12px / padding 5px 10px）はタップ対象にしない**

### フォントサイズの調整

- セクション見出し 24px → **20px**
- カード見出し 18.72px → **16px**
- 本文 16px は据え置き（モバイルでも 16px を下回らない）
- **ナビの `letter-spacing: 0.05em` はモバイルでは `0.02em` に緩める**（画面幅が足りなくなるため）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #009933   /* CSS では #093 と書く */
CTA Border:    #ec870e   /* 白地 ＋ 2px 罫。面には塗らない */
Alert:         #ec0e18
Text Color:    #333333   /* ナビは #212121 */
Background:    #ffffff
Surface:       #f8f8f5 / #f5f5f5 / #f2f2f2
Font (本文):   Lato, "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans CJK JP", "Hiragino Sans", sans-serif
Font (ナビ):   "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans CJK JP", "Hiragino Sans", sans-serif
Body Size:     16px / 400 / line-height normal
Radius:        3px（ボタン・入力）/ 4px（バッジ）/ 6px（画像）
Shadow:        none（一切使わない）
```

### プロンプト例

```
ミツカンのデザインシステムに従って、レシピ一覧ページを作成してください。

- 地は #ffffff。特集セクションだけ #f8f8f5 の面を敷く
- セクション見出しは 24px / 700 / #333333 で、左に border-left: 4px solid #093 の縦罫を立てる
- 本文・見出しは Lato, "Hiragino Kaku Gothic ProN", "Yu Gothic",
  "Noto Sans CJK JP", "Hiragino Sans", sans-serif
  ヘッダー・フッターは Lato を外した和文優先スタックを使う
- レシピカードは 4 カラム。カード見出しは 15px / 700 / line-height 1.6
- カテゴリバッジは #009933 の塗り ＋ 白文字 12px / 700 ＋ padding 5px 10px ＋ radius 4px
- 「レシピをもっと見る」ボタンは 白地 ＋ 2px solid #ec870e ＋ radius 3px ＋ 16px / 400
- box-shadow は一切使わない。階層は面色（#ffffff → #f8f8f5 → #f5f5f5）で作る
- font-feature-settings は normal のまま（palt を当てない）
- ナビの letter-spacing は 0.05em
```
