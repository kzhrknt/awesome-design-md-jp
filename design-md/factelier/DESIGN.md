# DESIGN.md — ファクトリエ（Factelier）

> ファクトリエ（https://factelier.com/）のデザイン仕様書。
> 「**世界に誇る、ファクトリーブランド**」を掲げる**日本製アパレルの D2C**。工場と直接つながる販売モデルを取る。
> **`Avenir` が和文より先頭**。`Avenir, 游ゴシック体, YuGothic, …` で、**欧文グリフを Avenir に取らせてから和文に渡す**
> **`body` の `font-size` が 12px**。本文は 14px、見出しは 18px。**全体に小さく、詰まった業務的な密度**を持つ
> **角丸を用途で 4 段に割る**。ボタン `0px` / スライダー `2px` / 予約系 `16px` / カテゴリチップ **`900px`（pill）**
> **ランキングがコーナーリボン**。`linear-gradient(135deg, 色 50%, transparent 0)` の三角形で、**金・銀・銅・灰**を順位に割り当てる
> 実サイトの computed style 実測（2026-08-23 取得。トップ ＋ 商品一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地に黒の線と文字**。装飾色を持たず、`#222222` の 1 色で罫線・文字・ボタンを賄う。写真（着用カット・工場カット）が面積の主役
- **ファクトリエについて**: 工場と直接組む日本製アパレル。**「MEN / WOMEN / BABY」の切り替えが最上位の導線**で、性別カテゴリを色（青灰・藤）で区別する
- **密度**: **高**。EC としての情報量が多く、`body` 12px / カード内 11〜14px と**文字が小さい**。ランキング・バッジ・チップが同時に並ぶ
- **キーワード**: `Avenir` 先頭、`#222222` 単色、コーナーリボン、`border-radius` 4 段、`ls: 0.02em` 一律、明朝の `MORE`
- **特徴**:
  - **`Avenir` が和文チェーンの先頭**。`Avenir, 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif`。**欧文は Avenir、和文は游ゴシック**という明確な分担
  - **`letter-spacing: 0.24px` が全要素に一律で当たる**。`body` の 12px に対して **0.02em**。**サイズが変わっても px 値が 0.24px のまま**なので、**大きい文字ほど相対的に字間が詰まる**
  - **`border-radius` を用途で割っている**。ボタン `0px` / スライダードット `2px` / 来店予約 `16px` / カテゴリチップ **`900px`**。**「pill を作りたいときは 900px と書く」**のがこのサイトの流儀
  - **ランキングがコーナーリボン**。`linear-gradient(135deg, #dfd260 50%, transparent 0)` で左上に三角を作り、その上に順位数字を白で置く。**1 位 `#dfd260`（金）/ 2 位 `#c0c0c0`（銀）/ 3 位 `#ba9585`（銅）/ 4–5 位 `#999999`（灰）**
  - **性別バッジに専用色**。`MEN` = `#b9c9cb`（青灰）/ `WOMEN` = `#bdbcc7`（藤）。**くすませた低彩度**で、ロゴの赤とぶつからない
  - **`MORE` ボタンだけ明朝**。`"Noto Serif JP", 游明朝, YuMincho, "ヒラギノ明朝 ProN"` で、透明背景 + `1px solid #000000`。**ヒーロー上の惹句ボタン専用**
  - **面色を `background-image` で塗る箇所がある**。ランキングリボンは `background-color` が透明のまま `linear-gradient` で塗られている。**`background-color` だけを見ると色が取れない**
  - **`box-shadow` を「浮かせる」ためだけに使う**。来店予約ボタン（`0 1px 4px rgba(0,0,0,.2)`）とスライダー矢印（2 段重ね）のみ

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）。

### Neutral（ニュートラル＝ UI の基幹）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| **Text Primary / Fill** | **`#222222`** | 34,34,34 | **既定の文字色。かつプライマリボタンの面**。純黒を使わない |
| Text（ナビ） | **`#333333`** | 51,51,51 | グローバルナビ、スライダーの現在地ドット |
| Text（弱） | **`#444444`** | 68,68,68 | 非選択のトグルボタン |
| Border | **`#c9c9c9`** | 201,201,201 | カテゴリチップの枠 |
| Border（淡） | **`#cccccc`** | 204,204,204 | スライダードット（非現在地）、罫線 |
| Divider | **`#d2d3d5`** | 210,211,213 | セクション見出しの下線 |
| Surface | **`#ebecee`** | 235,236,238 | **セクション面**（最頻出。12 箇所） |
| Surface（淡） | **`#f0f1f2`** 相当 / **`#e8eaed`** | 232,234,237 | お知らせ帯 |
| Surface（極淡） | **`#fcfcfc`** | 252,252,252 | 検索パネル |
| Surface（白・半透明） | `rgba(255,255,255,0.98)` | — | 固定ヘッダーのドロワー |
| Surface Dark | **`#394045`** | 57,64,69 | 言語切替バー |
| Surface Dark（濃） | **`#212729`** | 33,39,41 | 言語切替の選択中 |

- **`#222222` が文字色とプライマリの面色を兼ねる**。**別に「ブランドカラー」を持たない**
- **`#ebecee` が唯一のセクション面色**。青みを含んだライトグレー

### Gender（性別カテゴリ）

| バッジ | 面色 | rgb | 文字 |
|--------|------|-----|------|
| **MEN** | **`#b9c9cb`** | 185,201,203 | `#ffffff` |
| **WOMEN** | **`#bdbcc7`** | 189,188,199 | `#ffffff` |

- **どちらも彩度を落とした中間色**。青／ピンクのステレオタイプな彩度を使わない

### Ranking（順位リボン）

| 順位 | 色 | rgb | 実装 |
|------|-----|-----|------|
| 1 位 | **`#dfd260`** | 223,210,96 | `linear-gradient(135deg, #dfd260 50%, transparent 0)` |
| 2 位 | **`#c0c0c0`** | 192,192,192 | 同上 |
| 3 位 | **`#ba9585`** | 186,149,133 | 同上 |
| 4–5 位 | **`#999999`** | 153,153,153 | 同上 |

- **金・銀・銅をそのままの彩度で使わない**。`#dfd260` はくすんだ黄、`#ba9585` は赤みを抑えたテラコッタ

### Accent（限定的な差し色）

- **`#4fc3c6`**（rgb 79,195,198）: ターコイズ。特集バナー等の局所
- **`#c48865`**（rgb 196,136,101）: テラコッタ。同上
- ロゴの**赤い丸**（日の丸のモチーフ、`ALL MADE IN JAPAN` と対）は SVG / 画像として実装され、CSS 変数を持たない

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: `游ゴシック体` → `YuGothic` → `游ゴシック Medium` → `Yu Gothic Medium` → `ヒラギノ角ゴ Pro W3` → `Hiragino Kaku Gothic Pro` → `sans-serif`
- **明朝体**: `Noto Serif JP` → `游明朝` → `YuMincho` → `ヒラギノ明朝 ProN`（**`MORE` ボタン等の惹句専用**）
- 商品一覧ページの見出しのみ **`"Hiragino Kaku Gothic ProN"` 単独指定**（32px w700）

- **游ゴシックは Medium 表記を含める**（Windows で細くなるのを防ぐ）
- **ヒラギノは角ゴが `Pro W3`、明朝が `ProN`** と混在する。**それぞれの指定をそのまま守る**

### 3.2 欧文フォント

- **サンセリフ**: **`Avenir`**（和文チェーンの先頭）
- **セリフ**: `Noto Serif JP` のフォールバックとしての明朝群

### 3.3 font-family 指定

```css
/* 本文・既定（欧文優先） */
font-family: Avenir, 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
             "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif;

/* 惹句・MORE ボタン（明朝） */
font-family: "Noto Serif JP", 游明朝, YuMincho, "ヒラギノ明朝 ProN", serif;

/* 商品一覧の見出し */
font-family: "Hiragino Kaku Gothic ProN";
```

**フォールバックの考え方**:
- **欧文優先**。`Avenir` を先頭に置き、**欧文グリフを Avenir に取らせてから和文を游ゴシックに渡す**
- `Avenir` は macOS / iOS 同梱のシステムフォント。**Windows / Android では 2 番目の游ゴシックに落ちる**ため、**欧文の見え方が OS で変わることを前提にする**
- **商品一覧の `"Hiragino Kaku Gothic ProN"` 単独指定はフォールバックが無く、環境依存になっている**。新規実装では避け、必ずチェーンを書く

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | Hiragino Kaku Gothic ProN | 32px | **700** | normal | normal | 商品一覧の `h1` |
| Heading | Avenir + 和文 | 18px | **700** | normal | 0.013em (0.24px) | セクション見出し |
| Nav（大） | Avenir + 和文 | 16px | **500** | normal | 0.015em (0.24px) | ドロワーナビ |
| Toggle | Avenir + 和文 | 16px | 400 | normal | **0.1em (1.6px)** | `MEN` / `WOMEN` 切替。**ここだけ字間が広い** |
| Body（強） | Avenir + 和文 | 14px | **700** | **1.8 (25.2px)** | 0.017em (0.24px) | 強調本文 |
| Body | Avenir + 和文 | 14px | 400 | **1.8 (25.2px)** | 0.017em (0.24px) | **本文** |
| Nav | Avenir + 和文 | 14px | 500 | 1.0 (14px) | 0.017em (0.24px) | グローバルナビ |
| Chip | Avenir + 和文 | 14.4px | 400 | normal | 0.017em (0.24px) | カテゴリチップ |
| MORE（明朝） | Noto Serif JP | 14.4px | 400 | normal | 0.017em (0.24px) | 惹句ボタン |
| Ranking | Avenir + 和文 | 14.4px | **700** | normal | 0.017em (0.24px) | 順位数字 |
| Base / Caption | Avenir + 和文 | **12px** | 400 | normal | **0.02em (0.24px)** | **`body` の既定値** |
| Gender Badge | Avenir + 和文 | 11.52px | **700** | normal | **0.12em (1.3824px)** | `MEN` / `WOMEN` |

- **`body` が 12px** なのがこのサイトの起点。**本文として読ませるのは 14px / 行間 1.8**
- **`letter-spacing` は `0.24px` の固定 px**。em ではないので、**12px では 0.02em、18px では 0.013em** と実効値が変わる
- **例外的に字間を開くのは 2 箇所だけ**: トグルボタン（`0.1em`）と性別バッジ（`0.12em`）

### 3.5 行間・字間

- **本文の行間**: **1.8**（14px → 25.2px）
- **見出し・ラベルの行間**: `normal`（ブラウザ既定 ≒ 1.2）
- **ナビの行間**: **1.0**（14px → 14px）
- **本文の字間**: **`0.24px` 固定**（12px で 0.02em、14px で 0.017em）
- **強調ラベルの字間**: `1.6px`（0.1em）/ `1.3824px`（0.12em）

**ガイドライン**:
- **本文 14px / 行間 1.8** を守る。`body` の 12px はキャプション用であって本文ではない
- **`letter-spacing` は px で一律に指定する**（このサイトの流儀）。em に置き換えると大きい文字で字間が開きすぎる
- **短い英字ラベルだけ 0.1〜0.12em に開く**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 商品名に「HITOYOSHI オーダーシャツ」のような**ローマ字 + 和文**が混ざるため `word-break: break-all` は使わない

### 3.7 OpenType 機能

- **`font-feature-settings` は全要素で `normal`**。**`palt` を使っていない**
- 字詰めは `letter-spacing: 0.24px` の一律指定で行う

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary（黒ベタ・選択中）** — `MEN` / `WOMEN` トグルの選択中

- Background: **`#222222`**
- Text: `#ffffff`
- Border: `1px solid #222222`
- Padding: `8px 16px`
- Border Radius: **`0px`**
- Font Size: 16px / Weight: 400 / **ls `1.6px`（0.1em）**

**Toggle（非選択）**

- Background: `#ffffff`
- Text: `#444444`
- Border: `1px solid #444444`
- Padding: `8px 16px`
- Border Radius: **`0px`**

**Secondary（浮かせる pill）** — `アクセス・営業時間` / `来店予約`

- Background: `#ffffff`
- Text: `#222222`
- Border: `1px solid #222222`
- Padding: `0 5%`
- Border Radius: **`16px`**
- Shadow: **`0 1px 4px rgba(0, 0, 0, 0.2)`**
- Font Size: 14px

**Chip（カテゴリ pill）** — `Tシャツ・カットソー` / `ジーンズ`

- Background: `#ffffff`
- Text: `#222222`
- Border: `1px solid #c9c9c9`
- Padding: `11.52px 31.68px`
- Border Radius: **`900px`** ← **このサイトの pill の書き方**
- Font Size: 14.4px

**MORE（明朝・惹句）**

- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #000000`
- Padding: `7.2px 21.6px`
- Border Radius: **`0px`**
- Font: `"Noto Serif JP", 游明朝, YuMincho, "ヒラギノ明朝 ProN"` 14.4px

### Gender Badge

- Background: `#b9c9cb`（MEN）/ `#bdbcc7`（WOMEN）
- Text: `#ffffff`
- Border Radius: **`0px`**
- Padding: `2.88px 7.2px`
- Font Size: 11.52px / Weight: **700** / ls **1.3824px（0.12em）**

### Ranking Ribbon（コーナーリボン）

```css
.status-ranking {
  background-image: linear-gradient(135deg, #dfd260 50%, rgba(0,0,0,0) 0);  /* 1位 */
  color: #ffffff;
  padding: 3.6px 5.76px;
  border-radius: 0;
  font-size: 14.4px;
  font-weight: 700;
  letter-spacing: 0.24px;
}
```

- **`background-color` は透明のまま、`background-image` で三角を作る**
- 2 位 `#c0c0c0` / 3 位 `#ba9585` / 4–5 位 `#999999` に差し替える

### Slider

**ドット（ページネーション）**

- Background: `#333333`（現在地）/ `#cccccc`（非現在地）
- Border Radius: **`2px`**（丸ではなく**角丸の短い棒**）

**矢印**

- Background: `#ffffff`
- Border Radius: **`50%`**
- Shadow: `0 1px 4px rgb(144,144,144), 0 2px 4px rgba(0,0,0,0.3)`（**2 段重ね**）

### Cards

- Background: `#ffffff`
- Border: なし
- Border Radius: `0px`
- Shadow: なし
- Max Width: 記事幅 690px

### Language Bar（多言語切替）

- Background: `#394045`（バー）/ `#212729`（選択中）
- Text: `#ffffff`
- Padding: `8px 24px 8px 32px`
- Font Size: 12px / Weight: 500

> **注**: これは WOVN の翻訳ウィジェット由来で、**フォントも `-apple-system, "system-ui", "Segoe UI", Roboto…` と別系統**。ブランドの設計として扱わない。

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 2% | グリッドの横ガター |
| S | 15.36px | カード内 |
| M | 16px | 標準の `gap` |
| L | 32px | セクション内 |
| XL | 36px 2% | グリッドの縦横ガター |
| XXL | 40px | ドロワー見出しの上部 |

### Container

- Max Width: **`1200px`**（サイト全体の基準）
- Max Width（ワイド）: `1090px` / 記事幅: **`690px`**
- カード幅: 300–350px

### Grid

- 商品グリッド: 4 カラム（デスクトップ）/ `gap: 36px 2%`
- Gutter: `2%`（**px ではなく %**）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・バッジ・チップ・ボタン** |
| 1 | `0 1px 4px rgba(0,0,0,0.2)` | 浮かせる pill（来店予約・アクセス） |
| 2 | `0 1px 4px rgb(144,144,144), 0 2px 4px rgba(0,0,0,0.3)` | スライダー矢印（**2 段重ね**） |

- **影は「押せることを示す」ためだけに使う**。カードやセクションには使わない
- 面の区別は **`#ebecee` の面色**と `#cccccc` / `#d2d3d5` の罫線で行う

---

## 7. Do's and Don'ts

### ⚠ 面色を `background-color` だけで判定しない

ランキングリボンは **`background-color: rgba(0,0,0,0)` のまま `background-image: linear-gradient(...)` で塗られている**。

- `background-color` だけを見ると**金・銀・銅の 4 色が全部取れない**
- 実装時も同じ手法（`linear-gradient(135deg, 色 50%, transparent 0)`）を使う。**三角形は `border` トリックではなくグラデーションで作る**のがこのサイトの流儀

### ⚠ `Avenir` は macOS / iOS 限定

- `Avenir` は Apple プラットフォーム同梱で、**Windows / Android には無い**
- そのため**欧文の見え方が OS で変わる**。Windows では 2 番目の `游ゴシック体` が欧文も描く
- **Web フォントとして読み込んでいない**ため、**この差は仕様として受け入れられている**。再現時は `Avenir` の代替に `Nunito Sans` や `Montserrat` を当てる（幾何学サンセリフ寄り）

### Do（推奨）

- **`Avenir` を和文チェーンの先頭に置く**（欧文優先の指定順）
- **`letter-spacing` は `0.24px` の固定 px で全体に当てる**
- **本文は 14px / 行間 1.8**。`body` の 12px はキャプション用
- **pill を作るときは `border-radius: 900px`** と書く（このサイトの流儀）
- **`border-radius` を用途で割る**: ボタン `0` / ドット `2px` / 浮かせる pill `16px` / チップ `900px`
- **プライマリの面色は `#222222`**。純黒 `#000000` は明朝の `MORE` ボタンの枠にだけ使う
- **性別バッジは低彩度**（`#b9c9cb` / `#bdbcc7`）にする
- **影は押せる要素にだけ**当てる
- 惹句ボタンには**明朝チェーン**を当てる

### Don't（禁止）

- **`letter-spacing` を em に置き換えない**。px 固定が設計意図（大きい文字ほど詰まる）
- **`palt` を使わない**。字詰めは `letter-spacing` で明示する
- **ランキングリボンを `background-color` で塗らない**（`background-image` のグラデーション）
- **`"Hiragino Kaku Gothic ProN"` を単独指定しない**（商品一覧に実在するが環境依存。必ずフォールバックを書く）
- **金・銀・銅を高彩度で使わない**（`#dfd260` / `#c0c0c0` / `#ba9585` のくすんだトーン）
- **性別カテゴリに高彩度の青／ピンクを使わない**
- **カードやセクションに影を付けない**
- **`wovn-` プレフィックスの要素をブランドの設計として扱わない**（翻訳ウィジェット由来。フォントも別系統）

---

## 8. Responsive Behavior

### Breakpoints

media query に実在する値（主要なもの）:

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 479px | 1 カラム（`479px` / `480px`） |
| Mobile（大） | ≤ 600px | `600px` / `648px` |
| Tablet | ≤ 767px | `767px` / `820px` |
| Desktop（小） | ≤ 991px | `991px` / `992px` |
| Desktop | ≤ 1199px | `1000px` / `1100px` / `1140px` / `1199px` / `1200px` |
| Desktop（大） | ≥ 1400px | `1400px` |

- **`1200px` がコンテナ幅と一致**する主要ブレークポイント
- ルート `font-size` は **16px 固定**、`body` は **12px 固定**（375px〜1920px で変化なし）

### タッチターゲット

- 最小 44px × 44px
- **チップの `padding: 11.52px 31.68px` は高さ約 40px** で基準をわずかに下回る。**新規実装では縦 padding を 14px 前後に上げる**

### フォントサイズの調整

- **本文サイズはブレークポイントを跨いでも固定**
- 縮めるのは**グリッドのカラム数（4 → 2 → 1）とガター（`2%` 維持）**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Fill:   #222222
Text Color:     #222222 / #333333（ナビ）
Background:     #ffffff
Surface:        #ebecee
Surface Dark:   #394045
Border:         #c9c9c9 / #cccccc
Gender Badge:   #b9c9cb (MEN) / #bdbcc7 (WOMEN)
Ranking:        #dfd260 / #c0c0c0 / #ba9585 / #999999
Font:           Avenir, 游ゴシック体, YuGothic, "游ゴシック Medium",
                "Yu Gothic Medium", "ヒラギノ角ゴ Pro W3",
                "Hiragino Kaku Gothic Pro", sans-serif
Font (明朝):    "Noto Serif JP", 游明朝, YuMincho, "ヒラギノ明朝 ProN"
Base Size:      12px（body）/ 本文 14px
Line Height:    1.8（本文）
Letter Spacing: 0.24px（固定 px・全体）
Border Radius:  0px / 2px / 16px / 900px（用途で使い分け）
font-feature-settings: normal（palt を使わない）
Container:      1200px
```

### プロンプト例

```
ファクトリエのデザインシステムに従って、商品一覧のグリッドを作成してください。
- フォント: Avenir を先頭に置いた和文チェーン
  （Avenir, 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
    "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif）
- letter-spacing: 0.24px を全体に一律で当てる（em にしない）
- 本文 14px / line-height: 1.8、キャプションは 12px
- 文字色は #222222、背景は #ffffff、セクション面は #ebecee
- 性別バッジ: MEN=#b9c9cb / WOMEN=#bdbcc7、白文字、
  border-radius: 0、font-weight: 700、letter-spacing: 1.3824px
- ランキングは左上のコーナーリボン。background-image で
  linear-gradient(135deg, #dfd260 50%, transparent 0) と書く（1位）
  2位 #c0c0c0 / 3位 #ba9585 / 4-5位 #999999
- カテゴリチップは border-radius: 900px、白地に 1px solid #c9c9c9
- カードに box-shadow は付けない。影は押せる要素だけ
- font-feature-settings は normal（palt を使わない）
- コンテナ幅 1200px、グリッドは gap: 36px 2%
```
