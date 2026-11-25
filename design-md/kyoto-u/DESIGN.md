# DESIGN.md — 京都大学（Kyoto University）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-25 / 対象: `https://www.kyoto-u.ac.jp/ja`, `/ja/about`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 濃紺（`#00205b` / `#001337`）を地にして白を抜く。**角丸は 1 つも無い**（実測 `border-radius` 0 種・両ページ）。影も実質 1 種だけ
- **密度**: 中。本文 15px に **行間 1.84** を当て、見出しだけ明朝に切り替えて落ち着かせる
- **キーワード**: 濃紺、游明朝、Lora、角丸ゼロ、行間 1.84

**このサイトの核心は4つある。**

1. **和文書体を「Web フォント」と「OS ローカル」で二層に分けている。** ゴシックは Google Fonts の **Noto Sans JP**（可視 146 要素）、**明朝だけ Web フォントを使わず OS ローカルの游明朝**（`"Yu Mincho", YuMincho, serif` ／ 可視 6 要素）。CDP の `CSS.getPlatformFontsForNode` で確認すると、macOS では実際に **`YuMincho`** が当たっている。**Windows と macOS では別の游明朝、Linux / Android では `serif` に落ちる**
2. **Google Fonts の URL が `wght@400;500` の 2 段しか読み込んでいない。** 実測でも Noto Sans JP の字幅は **100〜400 → 1267.30px ／ 500〜900 → 1297.22px の 2 面だけ**（100px 欧文で測定）。**`font-weight: 700` を当てても 500 で描画され、合成太字も起きない**
3. **その 700 は画面に出ない要素にだけ付いている。** 実測の weight 700 は 31 要素あるが、**すべて `.field__label.visually-hidden`**（`position:absolute; width:1px; height:1px; clip:rect(1px,1px,1px,1px)` ＝ スクリーンリーダー専用の `画像` `公開日` `タグ`）。**画面に出るウェイトは 400 と 500 の 2 段だけ**
4. **`letter-spacing` はサイト全体でただ 1 要素。** 可視 163 要素（下層 185 要素）のうち `normal` 以外は **`寄附` ボタンの `4px`（15px に対して 0.267em）だけ**。それ以外は和文も欧文も一切字間をいじらない

**`font-feature-settings` は `"liga" 1` が 5 要素（下層 2 要素）だけで、`palt` は 0 件。** `palt` は効く書体を使っている（游明朝・28px の実スタックで `normal` 2550px → `"palt"` 2194.70px ＝ **−13.9%**）ので、**「できるのにやっていない」型**。CSS Custom Properties も自社・プラットフォーム合わせて **0 個**。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **京大ブルー（文字・面）** | **`#00205b`** | **可視 38 要素（トップ）／ 22 要素（下層）**。見出し、`寄附` ボタン、下層のセクション面（19 要素）、リンク |
| **Deep Navy（ヘッダー・フッター）** | **`#001337`** | 可視 9 要素の塗り面。グローバルヘッダー・フッターの地、トップのヒーロー帯（702,113px² の最大面） |
| **Navy 60%** | **`rgba(0,19,55,0.6)`** | 6 要素。スライドショーの見出しに敷く半透明の帯（写真の上で明朝を読ませるため） |

> **紺が 2 つあるのは実装の実態。** `#00205b` が「ブランドの紺」、`#001337` が「ヘッダー・フッターの紺」で、**同じページに並ぶ。** 新規実装では用途ごとに使い分ける。

### Neutral（ニュートラル）

- **Text Primary** (`#101214`): 本文・記事見出し（**下層で可視 87 要素と最多**）。純黒ではない
- **Text Secondary** (`#3f4145`): 日付・補助情報（可視 37 要素）
- **Text on Dark** (`#ffffff`): 紺面・ナビ上のテキスト（可視 36 要素 / 28 要素）
- **Text Muted on Dark** (`#b2bbcd`): ヘッダーの小さいリンク（`search` `Language` 等・可視 16 要素）
- **Link on Dark** (`#d5dae4`): `安否確認システム` `教職員の方へ` のアウトラインボタン
- **Border on Dark** (`#596e94`): 同ボタンの枠線
- **Surface Gray** (`#d9dbde`): 検索欄・セクション見出しの面（可視 13 要素 / 10 要素）
- **Background** (`#f0f1f2`): **下層のページ背景**（`pageBackground.resolved`・根拠 `viewportTopBySample (6/9)`）。トップは紺のヒーローが上部を覆うため、`resolved` はヒーローの色を返す

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（既定）**: **Noto Sans JP**（Google Fonts、`wght@400;500`）。実測 **可視 146 要素（トップ）／ 181 要素（下層）**
- **明朝体（スライドショーの見出し専用）**: **游明朝**。`"Yu Mincho", YuMincho, serif` で、**`@font-face` は無い＝ OS ローカル頼み**。実測 可視 6 要素、28px / weight 500
- フォント要求は全 44 件が `fonts.gstatic.com`（`notosansjp` 42 / `lora` 1 / `materialicons` 1）。**明朝のファイルは 1 バイトも落ちてこない**

### 3.2 欧文フォント

- **Lora**（Google Fonts、`wght@500`）。実測 **可視 5 要素**。`Announcements` `Latest research news` `KyotoU News` など**英語のセクション見出し専用**（32px）。CDP では `Lora Medium` が当たっている
- **Material Icons**（Google Fonts）。アイコン用に 5 要素
- 欧文の本文用書体は別立てせず、Noto Sans JP の欧文グリフをそのまま使う

### 3.3 font-family 指定

```css
/* ベース（モバイルファースト） */
body {
  color: #101214;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 13px;
  line-height: 1.54;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (min-width: 48em) {           /* = 768px */
  body { font-size: 15px; line-height: 1.84; }
}

/* 明朝（スライドショーの見出しだけ） */
.slideshow__slide-title {
  font-family: "Yu Mincho", YuMincho, serif;   /* Web フォントではない */
  font-size: 14px;                              /* デスクトップで 28px に上書き */
  font-weight: 500;
  line-height: 20px;
}

/* 英語のセクション見出し */
.block__title { font-family: Lora, "Noto Sans JP", serif; font-weight: 500; }
```

- **`html` は宣言が無く、UA 既定の 16px**（23 幅すべてで 16px。`htmlDecl` に `html` 自体の `font-size` は 1 件も無い）
- **`body` が 2 段**: 768px 以上 15px / 767px 以下 13px

### 3.4 文字サイズ・ウェイト階層

| 用途 | サイズ | ウェイト | 書体 | 実測 |
|------|--------|----------|------|------|
| 英語セクション見出し | **32px** | 500 | **Lora** | 5 要素 |
| スライドショー見出し | **28px** | 500 | **游明朝** | 6 要素 |
| グローバルナビ | 22.5px | 500 | Noto Sans JP | 6 要素 |
| 見出し・リンク | 16px | 500 | Noto Sans JP | 11 要素 |
| **本文** | **15px** | 400 / 500 | Noto Sans JP | **9 / 23 要素** |
| 一覧・日付 | 14px | 400 / 500 | Noto Sans JP | 19 / 12 要素 |
| 補助 | 13px / 12px / 11px | 400 / 500 | Noto Sans JP | 8 / 9 / 5 要素 |

- **画面に出るウェイトは 400 と 500 の 2 段だけ。** 下層では **500 が 145 要素**で最多（本文まで 500 で組む）
- **700 を当ててはいけない。** Google Fonts が 400 と 500 しか配信しておらず、実測でも 500〜900 の字幅が完全に同じ（1297.22px）＝**700 は 500 で出て、合成太字も起きない**

### 3.5 行間・字間

- **`line-height` は単位なし**（`1.54` / `1.84`）。比率が子へ降りる
- **実測の行間比**: トップは **1.84 が 59 要素**（最多）、下層は **1.40 が 81 要素**（記事一覧）＋ 1.84 が 25 要素
- **`letter-spacing` は `寄附` ボタンの `4px` 1 要素だけ**（トップ 163/164、下層 185/186 が `normal`）。`4px @ 15px` ＝ **0.267em** と大きく空ける
- **ブレークポイントで行間が変わる**: 768px 以上 `1.84`（15px → 27.6px）／ 767px 以下 `1.54`（13px → 20.02px）

### 3.6 禁則処理・改行ルール

- `word-break` / `overflow-wrap` の宣言は無く、ブラウザ既定（`normal`）
- `auto-phrase` は使っていない

### 3.7 OpenType 機能

- **`font-feature-settings: "liga" 1` が 5 要素（下層 2 要素）だけ。`palt` は 0 件**
- **`palt` は効く。** 游明朝・28px・weight 500 の実スタックで `normal` **2550.00px** → `"palt"` **2194.70px** ＝ **−13.9%**（generic の `serif` は 2609.81px なので、游明朝が正しく当たっていることも確認済み）
- **「できるのにやっていない」型**なので、既存ページに合わせるなら足さない

### 3.8 縦書き

- **CSS では使っていない**（`writing-mode: vertical-rl` は両ページとも 0 要素）
- ヘッダー左の「京都大学」の縦組みロゴは**画像**。テキストで組み直さない

---

## 4. Component Stylings

### Buttons

**Primary（紺地のアウトライン）**
- Background: `transparent`
- Text: `#d5dae4`
- Border: `1px solid #596e94`
- Padding: `0 31px`
- Border Radius: **`0`**
- Font Size: 13px / Font Weight: 500

**寄附（サイト唯一の字空けボタン）**
- Text: `#00205b`
- Font Size: 15px / Font Weight: 500
- **`letter-spacing: 4px`（0.267em）** ← サイト全体でここだけ
- Border Radius: `0`

**バッジ（震災対応・ウクライナ情勢）**
- Background: `#00205b` / Text: `#ffffff`
- Padding: `2px 4px` / Border Radius: `0`
- Font Size: 13px

### Cards

- Background: `#ffffff`（下層の本文面は `#f0f1f2` の上に白）
- Border: なし
- Border Radius: **`0`**（両ページとも `border-radius` 0 種）
- Shadow: なし

### Inputs

- 検索欄の面: `#d9dbde` / Border Radius: `0`
- Font Size: 14px
- フォーカス時の装飾は `box-shadow: rgba(0,19,55,0.5) 0 16px 0 0`（ぼかし 0 の実線＝下線代わり）

---

## 5. Layout Principles

### Spacing Scale

- **`gap` は両ページとも 0 件。** レイアウトは Flexbox / float の margin・padding で組んでおり、`gap` を使っていない
- 余白は `padding-right: 228px / 264px`、`padding-left: 60px / 78px` のようにブレークポイントごとに直接書く

### Container

- Max Width: **`1320px`**（トップ 16 要素／下層 9 要素）。**実質これ 1 本**
- 下層の読み物カラムのみ `896px`

### Grid

- Columns: 2〜4（ニュース・イベントの一覧）
- Gutter: `gap` ではなく margin で取る

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **ほぼすべての要素** |
| 1 | `rgba(0, 19, 55, 0.5) 0px 16px 0px 0px` | 検索欄のフォーカス（1 要素） |

**影らしい影は無い。** 唯一の `box-shadow` も**ぼかし 0・offset-y 16px の実線**で、浮かせるためではなく**下線を引くため**に使っている。`border-radius` も 0 種。階層は紺の面と罫線だけで作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- `html` は 16px（UA 既定）、`body` を 15px（≥768px）/ 13px（≤767px）にする
- 本文の `line-height` は**単位なしで `1.84` / `1.54`**
- ゴシックは Noto Sans JP、**明朝は `"Yu Mincho", YuMincho, serif` で OS に任せる**
- **英語のセクション見出しだけ Lora 32px / weight 500** に切り替える
- `border-radius` は **`0`** を貫く
- ブランド色は `#00205b`、ヘッダー・フッターは `#001337` と用途で分ける
- 写真の上に明朝を置くときは `rgba(0,19,55,0.6)` の帯を敷く

### Don't（禁止）

- **`font-weight: 700`（以上）を使わない。** Google Fonts が `wght@400;500` しか配信しておらず、**500 で描画される**（合成太字も起きない）
- **`#000000` を使わない。** 本文は `#101214`
- **`border-radius` を足さない**（実測 0 種）
- **`box-shadow` で浮かせない**（唯一の影はぼかし 0 の下線代わり）
- **`letter-spacing` を配らない。** サイト全体で `寄附` の `4px` 1 要素だけ
- **`font-feature-settings: "palt"` を足さない。** 書体は対応している（実測 −13.9%）が実装では 0 件
- **明朝を Web フォント（Noto Serif JP 等）に差し替えない。** このサイトは**意図的に OS ローカルの游明朝**に任せている。差し替えると字面が別物になる
- **ただし游明朝は Linux / Android には無い。** 新規実装でこの構成を採るなら、`serif` に落ちたときの見え方を必ず確認する
- ヘッダーの縦組みロゴをテキストで組まない（画像）

---

## 8. Responsive Behavior

### Breakpoints

ブレークポイントは **`em` 単位**（ルート 16px 基準）。

| Name | 指定 | px 換算 | 実測件数（トップ） |
|------|------|---------|------|
| XS | `(min-width: 36em)` | 576px | 57 |
| **Small** | **`(min-width: 48em)`** | **768px** | **154** |
| **Medium** | **`(min-width: 62em)`** | **992px** | **173（最多）** |
| Large | `(min-width: 85em)` | 1360px | 164 |
| Mobile 側 | `(max-width: 61.9375em)` | ≤991px | 27 |

### ルート・本文の実測（23 幅で測定）

| 幅 | `html` | `body` | 行間 | 英語見出し h2 |
|---|---|---|---|---|
| 1920〜768px | **16px** | **15px** | 27.6px（1.84） | 22.5px |
| 767〜320px | **16px** | **13px** | 20.02px（1.54） | 19.5px |

- **`html` は 1920px から 320px まで 16px で固定。** 流体ではない
- **崖は 768 / 767px の 1 箇所**で、本文 15 → 13px（0.87 倍）＋ 行間 1.84 → 1.54
- 本文の `<p>` には 992 / 991px にもう 1 つ段差がある（12px → 10px）

### タッチターゲット

- アウトラインボタンは `padding: 0 31px` で高さが行間依存。**モバイルでは高さ 44px を明示する**

### フォントサイズの調整

- 本文 15px → 13px、行間 1.84 → 1.54、h2 22.5px → 19.5px（約 87%）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:  #00205b   （見出し・ボタン・面）
Header/Footer:  #001337
Text Color:     #101214 / #3f4145（補助）
Background:     #f0f1f2（下層）/ #ffffff（本文面）
Surface Gray:   #d9dbde
Font (JA Sans): "Noto Sans JP", sans-serif
Font (JA Serif):"Yu Mincho", YuMincho, serif   ※Webフォントではない
Font (EN Head): Lora, "Noto Sans JP", serif
Root Size:      16px（html は宣言なし＝UA 既定）
Body Size:      15px (≥768px) / 13px (≤767px)
Line Height:    1.84 (≥768px) / 1.54 (≤767px)  ※単位なし
Font Weight:    400 / 500 のみ（700 は 500 で出る）
Letter Spacing: normal（例外は「寄附」の 4px だけ）
Border Radius:  0
Shadow:         none
```

### プロンプト例

```
京都大学のデザインで作ってください。

- ブランド色は #00205b、ヘッダー・フッターは #001337 と使い分ける
- 本文の文字色は #101214。純黒は使わない
- 和文ゴシックは Noto Sans JP（Google Fonts の wght@400;500 のみ）
- 明朝は "Yu Mincho", YuMincho, serif で OS ローカルに任せる（Web フォントにしない）
- 英語のセクション見出しだけ Lora 32px / weight 500
- font-weight は 400 と 500 だけ。700 は使わない（500 で描画される）
- 本文 15px / line-height 1.84（単位なし）。767px 以下で 13px / 1.54
- border-radius は 0。box-shadow は使わない
- letter-spacing は normal のまま
- ブレークポイントは em 単位（48em=768px, 62em=992px, 85em=1360px）
- コンテナは max-width 1320px
```
