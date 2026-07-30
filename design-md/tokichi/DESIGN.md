# DESIGN.md — 中村藤吉本店（NAKAMURA TOKICHI）

> 中村藤吉本店（https://www.tokichi.jp/）のデザイン仕様書。
> 1854 年（安政元年）創業、京都・宇治の茶商。初代中村藤吉が茶問屋を開いてから 170 年、本店は国の重要文化的景観の選定地に建つ。「生茶ゼリイ」で知られ、店舗の茶房と通販の両方を持つ。ロゴは「まると」の商標。
> サイトは **Shopify（Dawn ベース）を明朝体で組み替えた**構成。EC のテンプレートを、老舗茶商の字面に寄せて徹底的に和文向けにチューニングしている。
> 最大の特徴は **`letter-spacing` の使い方**。本文は `0.6px`（≒ `0.04em`）と控えめだが、**セクション見出しは `0.5em`、小見出しは `1.0em` まで開く**。「季 節 を 味 わ う」「中 村 銘 茶」のように、**文字を離して置くことで格を出す**——日本の老舗が看板や包装で使う手法をそのまま Web に持ち込んでいる。
> もうひとつは **ウェイトが `300`（Light）を既定にしていること**。自己ホストしている Noto Serif JP は **Light(300) と Medium(500) の 2 ウェイトだけ**で、本文・見出し・ナビのほぼ全部が `300`。細い明朝で薄く組む。
> 面色は `#333333` の墨と `#fffef8` の生成りだけ。差し色は**ランキングバッジの金茶 `#c7b385`** のみ。
> 実サイトの computed style 実測（2026-07-30 取得。トップ＋商品一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **明朝体・生成りの地・角丸ゼロ・影ゼロ。字を離して置く。** 商品写真を大きく置き、UI は細い明朝の文字だけ。線は `1px` の `#dddddd`、面は白と生成り。**EC に必要な要素（カート・検索・絞り込み）を極限まで目立たなくする**
- **中村藤吉本店について**: 茶商なので**商品カテゴリが「お茶」「ギフト・定期購買」「お店のこと」「読みもの」「中村銘茶」**と、物販と読み物が同格に並ぶ。「中村銘茶のご紹介」という**売らないためのコンテンツ**がグローバルナビの一等地にある
- **密度**: 低密度。`--spacing-sections-desktop: 0px` でセクション間の隙間をゼロにし、**写真ブロックを隙間なく積む**（余白は各ブロックの内側で取る）
- **キーワード**: Noto Serif JP Light(300)、生成り `#fffef8`、`letter-spacing: 0.5em` の見出し、radius 0、影ゼロ、1rem = 10px
- **特徴**:
  - **見出しの字間が極端に広い**。「季節を味わう」は `28px` に `letter-spacing: 14px`（= **`0.5em`**）、「中村銘茶」は `18px` に `18px`（= **`1.0em`**、字幅と同じだけ開く）。**Instagram の見出しは `I n s t a g r a m` と文字列自体にスペースを入れている**箇所もある
  - **既定ウェイトが `300`**。自己ホストの `@font-face` は **Light(300) と Medium(500) の 2 つだけ**。CSS 上は `--font-body-weight: 400` / `--font-heading-weight: 700` が Shopify のテーマ設定に残っているが、**実際に描画されるのはほぼ `300`**。`700` を指定した箇所（ナビの親項目 `お茶` 13.5px / 700）は**合成太字か Medium への丸め**になる
  - **和文の serif ファミリが 2 つ混在する**。自己ホストの **`"Noto Serif JP"`**（サイト独自の Light / Medium）と、Shopify のテーマ設定が配信する **`"Noto Serif Japanese"`**（`--font-body-family`）。**検索入力・言語セレクタ・フォームラベルの一部だけが後者**になる。字形はほぼ同じだが**ウェイトの持ち方が違う**（後者は 400 / 700）
  - **`1rem = 10px`**。`html { font-size: calc(var(--font-body-scale) * 62.5%) }`。ページ幅 `--page-width: 130rem` = **1300px**
  - **角丸と影を Shopify のテーマ変数レベルでゼロにしている**。`--buttons-radius: 0px` / `--inputs-radius: 0px` / `--media-radius: 0px` / `--product-card-corner-radius: 0.0rem`、影は `--*-shadow-opacity: 0.0` が全系統。**Dawn の既定を「和の平面」に作り替えている**
  - 例外は 3 つだけ: **検索フィールドの `100px`（ピル）**、**ランキングバッジの `50%`（円）**、**バリアントピルの `40px`**
  - トップページの地は `#ffffff`、**商品一覧・商品詳細の地は `#fffef8`（生成り）**。Shopify の `color-scheme-3` に割り当てられている

---

## 2. Color Palette & Roles

> 実測値。Shopify Dawn の色スキームとして定義される（`--color-foreground` 等は RGB の三つ組で持つ）。

### Brand（ブランド）

- **Sumi / 墨** (`#333333`, `--color-foreground: 51,51,51`): **文字・ボタン面・罫のすべて**。ロゴ「まると」も墨。**中村藤吉本店のブランドカラーは実質この墨色**
- **Kinari / 生成り** (`#fffef8`): **商品ページの地色**。ほんのり黄を含んだ白で、和紙に近い
- **Paper** (`#ffffff`): トップページ・ヘッダーの地色

### Color Schemes（Shopify のスキーム）

| Scheme | Foreground | Background | Button | Button Text | 用途 |
|--------|-----------|-----------|--------|-------------|------|
| `color-scheme-1` | `#333333` | `#ffffff` | `#333333` | `#ffffff` | **既定**。トップ・ヘッダー |
| `color-scheme-3` | `#333333` | **`#fffef8`** | `#333333` | `#ffffff` | **商品一覧・商品詳細** |
| `color-scheme-4` | `#ffffff` | `#000000` | `#ffffff` | `#333333` | 反転ブロック（写真上の帯） |

- **スキームが 3 つしかない**。しかも `1` と `3` の違いは地色だけ（`#ffffff` ↔ `#fffef8`）

### Accent（差し色）

- **Kincha / 金茶** (`#c7b385`): **ランキングバッジ（`1` `2` `3` `4`）**。`border-radius: 50%` の円に白文字。**サイト唯一の差し色**

### Surface（面）

- **Background** (`#ffffff` / `#fffef8`): ページ地色
- **Panel** (`#f8f8f8`): お知らせブロックの面
- **Overlay Light** (`rgba(0, 0, 0, 0.04)`): 商品一覧の絞り込み UI の面。**商品一覧で最も出現回数が多い（41 回）**
- **Scrim** (`rgba(0, 0, 0, 0.4)`): 写真上のスクリム。白文字を読ませる
- **Scrim Light** (`rgba(255, 255, 255, 0.5)`): 写真上の淡い覆い

### Neutral（文字・罫）

- **Text Primary** (`#333333`): 見出し・本文
- **Text Secondary** (`rgba(51, 51, 51, 0.75)`): 補助テキスト・ナビの下層項目・フォームラベル
- **Text Muted** (`#4d4d4d` / `#505050`): お知らせの日付・キャプション
- **Text Nav Parent** (`#666666`): グローバルナビの親項目
- **Text Inverse** (`#ffffff`): 写真上・反転ブロックの文字
- **Border** (`#dddddd`): **一般の罫**。区切り線・入力欄
- **Border Light** (`rgba(51, 51, 51, 0.1)` / `rgba(51, 51, 51, 0.05)`): カード・メディアの罫（`--product-card-border-opacity: 0.1` / `--media-border-opacity: 0.05`）
- **Border Input** (`rgba(51, 51, 51, 0.55)`): 入力欄・バリアントピル（`--inputs-border-opacity: 0.55`）
- **Border Strong** (`#aaaaaa` / `#cccccc`): 強い罫

### Semantic（意味的な色）

| Role | Value | 用途 |
|------|-------|------|
| Error | `#e83737` | 入力エラーの罫 |
| Sold Out | `rgba(56, 56, 56, 0.5)` | 「再入荷通知を受け取る」の覆い |
| Button | `#333333` | プライマリボタンの面（`--color-button`） |

> **重要 — 第三者アプリの色を流用しないこと**。実測に以下の色が現れるが、いずれも Shopify アプリが持ち込んだ既定色で、**中村藤吉本店のデザインシステムではない**。
>
> | 色 | 出どころ | 見え方 |
> |----|---------|-------|
> | `#0f571e`（深緑） | カート追加ポップアップのアプリ | トップページの「カートに追加」 |
> | `#72a95a`（黄緑） | Swym（お気に入り）アプリ | 「お気に入りリスト」バー |
> | `#222222` | Boost（検索・絞り込み）アプリ | 商品一覧の「カートに追加」「結果を表示」 |
> | `#0000ee` | ブラウザ既定のリンク色 | スタイル未適用のリンク |
> | `rgba(33, 43, 54, 0.4)` | Boost アプリのモーダル | 「絞り込み」オーバーレイ |
>
> **茶商だから緑がブランド色**と推測するのは誤り。テーマのボタン色は `#333333` の墨で、緑は一切テーマに存在しない。

---

## 3. Typography Rules

### 3.1 和文フォント

- **明朝体（既定）**: **Noto Serif JP**。自己ホスト。**Light(300) と Medium(500) の 2 ウェイトのみ**
- **明朝体（Shopify テーマ配信）**: **Noto Serif Japanese**。`--font-body-family` / `--font-heading-family` の値。検索入力・言語セレクタ・一部フォームラベルのみ
- **ゴシック体**: 使用しない（アイコンフォントの `Arial` を除く）

```css
/* 自己ホストの @font-face（原典） */
@font-face {
  font-family: "Noto Serif JP";
  src: url("/cdn/shop/files/NotoSerifJP-Light.woff?v=1702877271") format("woff");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Noto Serif JP";
  src: url("/cdn/shop/files/NotoSerifJP-Medium.woff?v=1702877284") format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

- **`400` と `700` は載っていない**。`font-weight: 700` を指定した箇所はブラウザの合成太字か Medium への丸めになる。**実装では 300 / 500 の 2 段で設計すること**

### 3.2 欧文フォント

- **専用の欧文フォントを持たない**。`NAKAMURA TOKICHI` `Instagram` などの欧文は Noto Serif JP 内蔵の欧文グリフで組む
- **アイコン**: `Arial`（13.3333px。カート・検索などの記号）
- **等幅**: 定義なし

### 3.3 font-family 指定

```css
/* ルート: 1rem = 10px */
html { font-size: calc(var(--font-body-scale) * 62.5%); }   /* --font-body-scale: 1.0 */

/* 既定（自己ホストの明朝） */
body {
  font-family: "Noto Serif JP", serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;            /* 27px / 15px */
  letter-spacing: 0.6px;       /* ≒ 0.04em */
  color: #333333;
}

/* Shopify テーマ設定側（フォーム要素の一部に残る） */
--font-body-family: "Noto Serif Japanese", serif;
--font-heading-family: "Noto Serif Japanese", serif;
```

**フォールバックの考え方**:
- **和文単独指定 + `serif`**。游明朝・ヒラギノ明朝への段階的フォールバックは持たない
- **2 つの serif ファミリの混在は原典の実装事情**（Shopify のテーマ設定 vs 独自 CSS）。**移植時は `"Noto Serif JP"` に一本化するのが望ましい**
- フォールバックを足すなら `"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif`

### 3.4 文字サイズ・ウェイト階層

**Shopify Dawn の `calc(var(--font-heading-scale) * N rem)` 方式**（`--font-heading-scale: 1.0`、`1rem = 10px`）。h1 のみ `clamp()` で流体。

```css
/* 原典の見出しサイズ（rem = 10px 基準） */
h1 { font-size: clamp(calc(var(--font-heading-scale) * 5.6rem), 14vw,
                      calc(var(--font-heading-scale) * 7.2rem)); }   /* 56px 〜 72px */
/* 以下は段切り: 6.2 / 5.2 / 5 / 4 / 3 / 2.4 / 2 / 1.8 / 1.7 / 1.5 rem */
```

実測の階層:

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section (h2/h1) | Noto Serif JP | 28px | **300** | 36.4px (1.3) | **`14px` = 0.5em** | 「季節を味わう」「店舗のご案内」 |
| Section（生成り面） | Noto Serif JP | 28px | 300 | 50.4px (1.8) | `4.2px` = 0.15em | 「おすすめ商品」 |
| Sub Heading | Noto Serif JP | 18px | 300 | 23.4px (1.3) | **`18px` = 1.0em** | 「中村銘茶」 |
| Instagram | Noto Serif JP | 24px | 300 | 31.2px (1.3) | `0.6px` | 文字列に半角スペースを挿入 |
| Footer Heading | Noto Serif JP | 18px | 300 | 23.4px (1.3) | `0.6px` | 「メルマガ新規登録」 |
| Product Title | Noto Serif JP | 15〜16px | 300 | 19.5px (1.3) | `0.6px` | |
| Product Title（写真上） | Noto Serif JP | 16px | 300 | 24px (1.5) | `2px` = 0.125em | 白文字 |
| Body | Noto Serif JP | **15px** | **300** | **27px (1.8)** | `0.6px` = 0.04em | **body の既定** |
| Nav (親) | Noto Serif JP | 13.5px | 700 → 500 相当 | 17.55px (1.3) | `1px` = 0.074em | 色 `#666666` |
| Nav (子) | Noto Serif JP | 13px | 300 | 16.9px (1.3) | `0.6px` | 色 `rgba(51,51,51,0.75)` |
| Nav (カテゴリ) | Noto Serif JP | 14px | 300 | 18.2px (1.3) | **`2px` = 0.143em** | 「お買いもの」 |
| News Title | Noto Serif JP | 14px | 300 | 19.6px (1.4) | `1px` | |
| Caption | Noto Serif JP | 13px | 300 | 16.9px (1.3) | `1px` | 色 `#4d4d4d` |
| Legal | Noto Serif JP | 12px | 300 | 21.6px (1.8) | `0.6px` | 商標表記 |
| Tel（フッター） | Noto Serif JP | 30px | 700 → 500 相当 | 36px (1.2) | `0.6px` | `0120-137-555` |
| Search Input | **Noto Serif Japanese** | 13px / 16px | 400 | 1.5 | `0.4px` | radius 100px |
| Modal Heading | Noto Serif JP | 16px | **500** | 20px (1.25) | `0.6px` | 「再入荷通知を受け取る」 |
| Icon | Arial | 13.3333px | 400 | normal | normal | 記号のみ |

**ウェイトは実質 300 / 500 の 2 段**:

| Token / Weight | 実際 | 用途 |
|----------------|------|------|
| `--font-body-weight: 400` | → 300 が描画される | Shopify のテーマ設定の名残 |
| `--font-body-weight-bold: 700` | → 合成太字 / 500 | ナビの親項目・電話番号 |
| `--font-heading-weight: 700` | → 実際の見出しは 300 | Shopify のテーマ設定の名残 |
| **`300`（Light）** | **自己ホスト** | **本文・見出し・ナビのほぼ全部** |
| `500`（Medium） | 自己ホスト | モーダル見出し・強調 |

- **見出しを太らせない**。28px の大見出しも `300`。**太さではなく「大きさ ＋ 字間」で階層を作る**

### 3.5 行間・字間

- **本文の行間**: **`1.8`**（`27px / 15px`）。日本語本文としてゆったりめ
- **見出しの行間**: **`1.3`**（`36.4px / 28px`、`23.4px / 18px`）。字間が広いぶん行間は締める
- **本文の字間**: **`0.6px`**（15px に対して ≒ `0.04em`）
- **見出しの字間**: **`0.5em`（大見出し）〜 `1.0em`（小見出し）**

字間の一覧（この設計の核心）:

| 対象 | Size | letter-spacing | em 換算 |
|------|------|----------------|---------|
| 小見出し「中村銘茶」 | 18px | `18px` | **`1.0em`** |
| セクション見出し | 28px | `14px` | **`0.5em`** |
| セクション見出し（生成り面） | 28px | `4.2px` | `0.15em` |
| ナビ（カテゴリ） | 14px | `2px` | `0.143em` |
| 商品名（写真上） | 16px | `2px` | `0.125em` |
| ナビ（親） | 13.5px | `1px` | `0.074em` |
| キャプション | 13px | `1px` | `0.077em` |
| フォームラベル | 16px | `1px` | `0.063em` |
| **本文** | **15px** | **`0.6px`** | **`0.04em`** |
| 検索入力 | 13px | `0.4px` | `0.031em` |

- **`letter-spacing` を px で持っているので、サイズが変わると相対量も変わる**。移植時は上の em 換算を使うと再現しやすい
- **`0.5em` 以上の字間は最後の 1 文字の後ろにもアキが付く**。原典は `text-indent` や `margin-right: -0.5em` で補正していないので、**見出しは左揃えのまま中央に見えるようずらして配置されている**。中央揃えにする場合は `margin-right: -0.5em` の補正を入れること

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- 商品名の `［抹茶・ほうじ茶］` のような**全角の角括弧**を多用する。行頭に来ないよう `line-break: strict` を守る
- 字間 `0.5em` の見出しは**折り返させない**（1 行に収まる短い語だけに使う）

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* 全域 */
```

- **`palt` を一切使っていない**。明朝を等幅で流し、詰めるのではなく **`letter-spacing` で開ける**方向に振っている。**`palt` を足すと `0.5em` の字間設計と喧嘩する**

### 3.8 縦書き

該当なし（横組みのみ）。ただし店舗写真・パッケージには縦組みが多用される。

---

## 4. Component Stylings

### Buttons

**Primary（テーマ既定）**
- Background: `#333333`（`--color-button`）
- Text: `#ffffff`（`--color-button-text`）
- Border: `1px solid`（`--buttons-border-width: 1px` / opacity `1.0`）
- **Border Radius: `0`**（`--buttons-radius: 0px`）
- **Shadow: なし**（`--buttons-shadow-opacity: 0.0`）
- Font: Noto Serif JP `15px` / `300`
- Padding: `12px 24px` 前後

**Secondary（すべてを表示する）**
- Background: `#333333`
- Text: `#ffffff`
- Border Radius: `2px`
- Font: Noto Serif JP `15px` / `300`
- Padding: `2px 40px`

**Inverse（写真上）**
- Background: `transparent`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Border Radius: `0`

### Badges

| 種類 | 面 | 文字 | Radius |
|------|----|------|--------|
| ランキング | **`#c7b385`** | `#ffffff` | **`50%`**（円） |
| 汎用バッジ | — | — | `4.0rem` = 40px（`--badge-corner-radius`） |
| バリアントピル | `#ffffff` | `#333333` | `40px`（`--variant-pills-radius`） |

- ランキングバッジは `font-size: 15px` / `font-weight: 600` の白文字

### Inputs

- Background: `#ffffff`
- Border: `1px solid rgba(51, 51, 51, 0.55)`（`--inputs-border-width: 1px` / `--inputs-border-opacity: 0.55`）
- **Border Radius: `0`**（`--inputs-radius: 0px`）
- **Shadow: なし**（`--inputs-shadow-opacity: 0.0`）
- Padding: `15px`
- Font: `16px` / `400`（iOS の自動ズーム回避）／ ラベルは `16px` / `300` / `rgba(51,51,51,0.75)`
- Error: Border を `#e83737`

**検索フィールド（例外）**
- **Border Radius: `100px`**（サイトで唯一のピル）
- Padding: `15px 98px 15px 15px`（右に検索ボタン分の余白）
- Font: **Noto Serif Japanese** `13px` / `400` / ls `0.4px`

### Product Cards

- Background: 継承（`#ffffff` / `#fffef8`）
- **Border Width: `0`**（`--product-card-border-width: 0.0rem`）
- **Border Radius: `0`**（`--product-card-corner-radius: 0.0rem`）
- **Shadow: なし**（`--product-card-shadow-opacity: 0.0`）
- Image Padding: `0`
- **Text Alignment: `left`**（`--product-card-text-alignment: left`）
- Title: Noto Serif JP `15px` / `300` / lh `1.3`

### Media

- **Border: `1px solid rgba(51, 51, 51, 0.05)`**（`--media-border-opacity: 0.05`）。ほとんど見えない極薄の罫
- **Border Radius: `0`** / **Shadow: なし**

### Drawer / Popup

- Border: `1px solid rgba(51, 51, 51, 0.1)`
- **Border Radius: `0`**（`--popup-corner-radius: 0px`）
- **Shadow: なし**（`--popup-shadow-opacity: 0.0`）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 出どころ |
|-------|-------|---------|
| Grid（デスクトップ） | `8px` | `--grid-desktop-horizontal-spacing` / `-vertical-` |
| Grid（モバイル） | `4px` | `--grid-mobile-horizontal-spacing` / `-vertical-` |
| **Section 間** | **`0px`** | `--spacing-sections-desktop` / `-mobile` |
| 一般の余白 | `10 / 15 / 20 / 40 / 72 / 120px` | 実測 |

- **セクション間の隙間が `0`**。ブロックを隙間なく積み、余白は各ブロックの内側（`padding`）で取る。**写真が画面いっぱいに連なる**構成になる
- グリッドのガターが `8px`（デスクトップ）と非常に狭い。**商品カードを密に並べる**

### Container

- **Max Width: `130rem` = `1300px`**（`--page-width`）
- `--page-width-margin: 0rem`
- 実測の `max-width`: `1410px`（フルブリード寄りのブロック）／ `1300px`（既定）／ `800px`（読み物）／ `600px` / `360px`（フォーム）
- ヘッダーの padding: `4px 10px`
- フッターの padding: `120px 72px 20px`

### Grid

- 商品一覧はデスクトップ 4 カラム / タブレット 3 / モバイル 2
- Gutter: `8px`（デスクトップ）/ `4px`（モバイル）

---

## 6. Depth & Elevation

**テーマ変数レベルで影を全部切っている。**

| 系統 | Shadow Opacity | 結果 |
|------|----------------|------|
| `--buttons-shadow-opacity` | `0.0` | なし |
| `--inputs-shadow-opacity` | `0.0` | なし |
| `--media-shadow-opacity` | `0.0` | なし |
| `--product-card-shadow-opacity` | `0.0` | なし |
| `--popup-shadow-opacity` | `0.0` | なし |
| `--drawer-shadow-opacity` | `0.0` | なし |
| `--variant-pills-shadow-opacity` | `0.0` | なし |

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべてのテーマ要素** |

奥行きは以下で作る。

| 手法 | 値 | 用途 |
|------|----|------|
| 極薄の罫 | `1px solid rgba(51, 51, 51, 0.05)` | メディア |
| 薄い罫 | `1px solid rgba(51, 51, 51, 0.1)` | カード・ポップアップ |
| 罫 | `1px solid #dddddd` | 区切り線 |
| 地色の差 | `#ffffff` ↔ `#fffef8` | セクションの切り替え |
| スクリム | `rgba(0, 0, 0, 0.4)` | 写真上の白文字 |

> **注**: 実測では `rgba(0,0,0,0.2) 0 0 25px`、`rgba(54,54,54,0.15) 0 2px 10px` 等の影が観測されるが、**すべて第三者アプリ（Swym / Boost 等）が持ち込んだもの**。テーマの設計は影ゼロ。

### Motion

| Token | Value |
|-------|-------|
| `--duration-short` | `.1s` |
| `--duration-default` | `.2s` |
| `--duration-announcement-bar` | `.25s` |
| `--duration-medium` | `.3s` |
| `--duration-long` | `.5s` |
| `--duration-extra-long` | `.6s` |
| `--duration-extra-longer` | `.75s` |
| `--duration-extended` | `3s` |
| `--alpha-link` | `.85`（リンクのホバー不透明度） |

---

## 7. Do's and Don'ts

### Do（推奨）

- **本文・見出しは明朝（Noto Serif JP）Light(300) で組む**。太らせない
- **階層は太さではなく「大きさ ＋ 字間」で作る**。大見出し `0.5em`、小見出し `1.0em`、本文 `0.04em`
- **本文の行間は `1.8`、見出しの行間は `1.3`**。字間が広い見出しは行間を締める
- **角丸は `0`**。例外は検索フィールド（`100px`）・ランキングバッジ（`50%`）・バリアントピル（`40px`）だけ
- **影を使わない**。階層は極薄の罫（`rgba(51,51,51,0.05)`〜`0.1`）と地色の差で作る
- **商品ページの地色は `#fffef8`（生成り）**、トップは `#ffffff`
- ボタンは `#333333` の墨 ＋ 白文字 ＋ radius 0
- `1rem = 10px`（`font-size: 62.5%`）を基準にする
- セクション間の隙間は `0` にし、余白は内側で取る
- 差し色を足すなら**金茶 `#c7b385` だけ**

### Don't（禁止）

- **`font-feature-settings: "palt"` を追加しない**。原典は全域 `normal`。`0.5em` の字間設計と喧嘩する
- **文字色に純黒 `#000000` を使わない**。`#333333`
- **緑を「茶商のブランド色」として使わない**。`#0f571e` / `#72a95a` は Shopify アプリの既定色で、テーマには緑が存在しない
- **`#222222`（Boost アプリ）をボタン色に使わない**。テーマのボタンは `#333333`
- **見出しに `font-weight: 700` を使わない**。自己ホストのフォントは 300 / 500 のみで、700 は合成太字になる
- **角丸を足さない**（`--*-radius` はすべて `0`）
- **影を足さない**（`--*-shadow-opacity` はすべて `0.0`）
- **`0.5em` 以上の字間の見出しを折り返させない**。短い語だけに使う
- **字間 `0.5em` の見出しを中央揃えにするとき、`margin-right: -0.5em` の補正を忘れない**（最後の 1 文字の後ろのアキで左に寄って見える）
- `"Noto Serif Japanese"` と `"Noto Serif JP"` を混在させない（原典は実装事情で混在しているが、移植時は後者に一本化する）

---

## 8. Responsive Behavior

### Breakpoints

**Shopify Dawn の `750px` / `990px` を軸に、独自の段が多数追加されている。**

| Query | 用途 |
|-------|------|
| `min-width: 750px` | **Dawn の主軸。タブレット以上** |
| `min-width: 990px` | **Dawn の主軸。デスクトップ** |
| `min-width: 750px and max-width: 989px` | タブレットのみ |
| `max-width: 749px` | モバイル |
| `max-width: 960px` / `min-width: 960px` | 独自追加 |
| `max-width: 768px` / `767px` / `min-width: 769px` | 独自追加（ナビ） |
| `max-width: 600px` / `480px` / `400px` | 独自追加（スマホの段） |

- **Dawn 由来（750 / 990）と独自追加（768 / 960 / 600 / 480 / 400）が併存する**。移植時は 750 / 990 に寄せるのが素直

### フォントサイズの調整

- **h1 のみ `clamp(56px, 14vw, 72px)` の流体**。他は段切り
- 本文 `15px` はブレークポイントで変えない
- **字間はモバイルでも維持する**（`0.5em` の見出しは折り返さない短い語なので成立する）

### タッチターゲット

- 検索フィールドは `15px` × 2 ＋ `19.5px` で高さ約 50px
- ボタンは `padding: 12px 24px` ＋ `15px × 1.8` で高さ約 51px
- **ナビの子項目は `padding: 6px 0` ＋ `16.9px` で高さ約 29px** と小さい。**新規実装では 44px 以上に広げること**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand (墨):        #333333   （文字 / ボタン面 / 罫）
Accent (金茶):     #c7b385   （ランキングバッジのみ）
Text:              #333333
Text Secondary:    rgba(51, 51, 51, 0.75)
Text Muted:        #4d4d4d
Nav Parent:        #666666
Background:        #ffffff（トップ） / #fffef8（商品ページ・生成り）
Panel:             #f8f8f8
Border:            #dddddd / rgba(51,51,51,0.1) / rgba(51,51,51,0.05)
Border (input):    rgba(51, 51, 51, 0.55)
Error:             #e83737
Font:              "Noto Serif JP", serif   ← Light(300) / Medium(500) のみ
Root:              1rem = 10px（font-size: 62.5%）
Body Size:         15px
Body Weight:       300
Line Height:       1.8（本文） / 1.3（見出し）
Letter Spacing:    0.04em（本文） / 0.5em（大見出し） / 1.0em（小見出し）
Font Feature:      normal（palt は使わない）
Radius:            0（全域）。例外 100px（検索） / 50%（ランキング） / 40px（バリアント）
Shadow:            none（全域）
Container:         1300px（130rem）
Grid Gutter:       8px（デスクトップ） / 4px（モバイル）
Section Gap:       0px
```

### プロンプト例

```
中村藤吉本店のデザインシステムに従って、商品一覧ページを作成してください。
- 地色 #fffef8（生成り）、文字 #333333
- フォントは "Noto Serif JP", serif。ウェイトは 300 と 500 のみ使う（700 は使わない）
- ルートは font-size: 62.5%（1rem = 10px）
- 本文: 15px / 300 / line-height 1.8 / letter-spacing 0.6px
- セクション見出し「季節を味わう」: 28px / 300 / line-height 1.3 / letter-spacing 0.5em
  中央揃えにする場合は margin-right: -0.5em で最後のアキを補正する
- 小見出し「中村銘茶」: 18px / 300 / letter-spacing 1.0em
- font-feature-settings は normal（palt を付けない）
- 商品カード: 罫なし / radius 0 / 影なし / テキストは左揃え / タイトル 15px / 300 / lh 1.3
- グリッドはデスクトップ 4 カラム、ガター 8px。コンテナ幅 1300px
- 「カートに追加」ボタン: 背景 #333333 / 文字 #ffffff / radius 0 / 影なし / 15px / 300
- ランキングバッジのみ 金茶 #c7b385 の円（radius 50%）に白文字
- 区切り線は 1px solid #dddddd。box-shadow は一切使わない
```
