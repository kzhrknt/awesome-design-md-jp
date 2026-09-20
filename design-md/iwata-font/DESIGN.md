# DESIGN.md — 株式会社イワタ（IWATA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-20 / 対象: `https://www.iwatafont.co.jp/`, `/font-list`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **書体メーカーが自社書体だけで組んだサイト。** 紺（`#123480`）を軸に、角丸の大きいカードを白地に浮かべる。影は 1 つも使わない
- **密度**: 低い。トップの可視テキストは 104 要素しかない。代わりに `/font-list` は 4,673 要素の書体見本表で、同じ書体を「読み物」と「一覧」の両方で見せる
- **キーワード**: 自社書体、紺、角丸 24px、影ゼロ、字間 normal

**このサイトの核心は 4 つある。**

1. **和文は自社書体 2 本だけ。** `イワタ細ゴシック体オールド_04`（トップ 72/104 要素、font-list 4,670/4,673 要素）と `イワタ中ゴシック体オールド_04`（トップ 28 要素）。**Noto Sans JP も游ゴシックもヒラギノも使わない**（`--font-family-noto` という変数は宣言されているが、描画に出る要素は 0）
2. **`@font-face` は 108 本宣言されているが、`loaded` は 8 本だけ。** 残り 100 本（`みんなの文字ゴ…` `I-OTF-UDゴ表示Pr6N…` `イワタUDゴシックStdN VF TTF` など）は**フォント見本を表示するための在庫宣言**で、UI の描画には使われていない。**`@font-face` の本数を「使える書体の数」と読まない**
3. **字間を足さない。** `--tracking-tight: 0.02em` / `--tracking-normal: 0.04em` という字間トークンがあるのに、**実装は `letter-spacing: normal` が 103/104 要素**。例外は `お問い合わせ` CTA の `0.56px`（= 14px × 0.04em）1 要素のみ。**書体そのものの字面に任せるのが、書体屋の構え**
4. **`font-feature-settings: "palt"` は 0 要素。** 詰め組みもしない

> **自社トークンは 69 個ある（プラットフォーム由来 62 個は WordPress / Gutenberg 49・WP admin 11・Swiper 2）。ただし宣言と実装の乖離が大きい。** 下の各章で「宣言値」と「実測」を必ず並べて書いてある。**宣言値をそのままコピーすると別物になる。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 変数 | 実測 |
|------|--------|------|------|
| **Iwata Navy** | **`#123480`** | `--color-blue01` | **面色 8 要素**。`お問い合わせ` `もっと見る` `お知らせ一覧` `記事一覧` の CTA、フッター |
| **Accent Orange** | **`#e29d4e`** | `--color-orange01` | 面色 2 要素。`フォント一覧` `カタログダウンロード` |
| **Accent Green** | **`#529a77`** | `--color-green03` | 面色 1 要素。`ライセンス情報` |
| **Ink Navy** | **`#192030`** | `--primaryText_black` | **文字色 59 要素**。見出し・ナビ |

> **CTA の面色が 3 色ある**（紺・オレンジ・緑）。**いずれもナビゲーション先の種類を表す色**で、状態（危険・成功）ではない。

### Neutral（ニュートラル）

- **Text Primary** (`#192030` / `--primaryText_black`): 見出し・ナビ。**可視 59 要素**
- **Text Body** (`#333333` / `--color-black01`): 本文。トップ 8 要素、font-list では **4,640 要素**（書体見本の本文色）
- **Text on Dark** (`#ffffff`): 紺・オレンジ・緑の面上（22 要素）
- **Text Muted Light** (`#c8c8c8` / `--color-gray11`): **フッターのリンク 10 要素**
- **Text Date** (`#949494` / `--color-gray08`): 日付 4 要素
- **Surface Card** (`#f4f5f6` / `--color-gray02`): サービスカードの面（10 要素）
- **Surface Table** (`#f5f5f5` / `--color-gray09`): `/font-list` の表ヘッダ（12 要素）
- **Surface Dark** (`#161f32` / `--color-black09`): 100周年カードの面
- **Surface Dark 2** (`#383838` / `--color-black10`): フォント一覧カードの面
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `html`）

### 宣言 ≠ 実装（色）

**`--color-*` は 37 個ある。トップページで実際に描画されるのは 11 色だけ。**

- **可視 0 要素の変数**: `--color-green01: #639e81` / `--color-green02: #478566` / `--color-brown01: #b79a79` / `--color-brown02: #8c6e4b` / `--color-brown03: #939586` / `--color-pink01: #ae8293` / `--color-blue02: #ebf4ff` / `--color-blue03: #4967ca` / `--color-blue04: #d9e4f1`、および `--color-gray01 / 03 / 04 / 05 / 06 / 07 / 10 / 12 / 13`
- **逆に、トークンに無い色が実装にある**: お知らせのタグ（`イベント・展示会` `プレスリリース` `新書体`）の面 **`#efefef`** は `--color-gray*` のどれとも一致しない**直書き**

> **`--color-gray06` は `#e7e7e7`、`--color-gray09` は `#f5f5f5`。`#efefef` はそのどちらでもない。** 新規実装ではタグの面をトークン化して `#efefef` を与えるか、`--color-gray09` に寄せるか、どちらかに決めること。

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定（細）**: **イワタ細ゴシック体オールド_04**（Web フォント・`loaded`）。トップ 72/104 要素、`/font-list` 4,670/4,673 要素
- **強調（中）**: **イワタ中ゴシック体オールド_04**（Web フォント・`loaded`）。トップ 28 要素。CTA ラベル・タグ・カード見出し
- **装飾（1 箇所ずつ）**: **Iwa UD Goth Disp Pr6N M**（英文コピー `Made with joy. / Loved with heart.` と縦組みの `Scroll`、計 2 要素）

**`loaded` な書体は 8 本**: `WebTopSans Regular` / `イワタ中ゴシック体オールド_04` / `イワタ細ゴシック体オールド_04` / `イワタ横太明朝体オールド` / `イワタ隷書体` / `イワタ学参新教科書体 Ｄ` / `イワタUD新聞明朝` / `イワタミンゴ B`。このうち UI に出るのは上の 3 本（＋ヒーローの `WebTopSans Regular`）で、**残りはヒーローや見本カードの作例に出る**。

### 3.2 欧文フォント

- **ヒーローのコピー専用**: **WebTopSans Regular**（`loaded`・2 要素・72px）。`￣楽しくつくる、` `だから愛される。＿` の 2 行
- それ以外の欧文（`Scroll` `PICKUP` 等を除く）は**イワタ書体の欧文グリフをそのまま使う**。欧文専用フォントを本文に噛ませていない
- `Noto Sans JP` は `@font-face` で `100 900` 可変として宣言されているが **`unloaded`**。`--font-family-noto: "Noto Sans JP", serif` という変数も**参照要素 0**

> **`--font-family-noto` のフォールバックが `serif` になっているのは実サイトの誤り**（サンセリフの Noto Sans JP に `serif` を続けている）。変数自体が使われていないので実害は出ていないが、**踏襲しないこと**。正しくは `sans-serif`。

### 3.3 font-family 指定

```css
/* 本文・UI（既定） */
font-family: "イワタ細ゴシック体オールド_04", sans-serif;

/* 強調・CTA ラベル・タグ */
font-family: "イワタ中ゴシック体オールド_04", sans-serif;

/* ヒーローのコピー（欧文フォントで和文を組む） */
font-family: "WebTopSans Regular";

/* 小さな装飾テキスト・縦組みの Scroll */
font-family: "Iwa UD Goth Disp Pr6N M";
```

**フォールバックの考え方**:

- **和文フォント 1 本 ＋ `sans-serif` だけ。** 環境依存の OS フォントをチェーンに並べない（**このサイトは Web フォントが落ちたら素の `sans-serif` に落ちる設計を許容している**）
- **太さは `font-weight` ではなく書体名で切り替える。** 細＝`イワタ細ゴシック体オールド_04`、中＝`イワタ中ゴシック体オールド_04`
- **再現するときは、イワタ書体のライセンスが無ければ別書体に差し替える。** 自社配信の Web フォントなので、外部サイトからは読み込めない

### 3.4 文字サイズ・ウェイト階層

**ルートは `16px`**（`html` / `body` とも 16px・weight 400・`line-height: normal` / `letter-spacing: normal`）。`rem` はそのまま px に読み替えてよい。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Hero Copy** | **WebTopSans Regular** | **72px** | 400 | **1.40** (100.8px) | normal | ヒーローの 2 行。**この 1 箇所だけ欧文フォント** |
| 100th Display | 細ゴシック体オールド | 115px | 400 | 1.15 | normal | 100周年カード。**紺のグラデーション文字** |
| Section Heading | 細ゴシック体オールド | 46px | 700 | **1.00** (46px) | normal | `サービス` `サポート` `コラム` |
| Lead Heading | 細ゴシック体オールド | 40px | 400 | **1.60** (64px) | normal | `文字へのこだわり、未来への挑戦。` |
| Card Heading L | 細ゴシック体オールド | 32px | 700 | 1.50 (48px) | normal | `お問い合わせ` `ライセンス情報`（白文字） |
| Card Heading M | 細ゴシック体オールド | 26px | 700 | normal | normal | `会社概要` `書体開発の姿勢` |
| Card Heading S | 細ゴシック体オールド | 24px | 700 | 1.75 | normal | `商利用のご案内` `よくある質問` |
| **Lead Text** | 細ゴシック体オールド | **18px** | 500 | **2.20** (39.6px) | normal | **導入文。最も広い行間** |
| Sub Heading | 細ゴシック体オールド | 20px | 500 | **1.60** (32px) | normal | `デスクトップライセンス` 等 |
| Badge (Hero) | 細ゴシック体オールド | 20px | 700 | 1.00 | normal | `100年超えベンチャー` `イワタの伝統と情熱` |
| **Body** | 細ゴシック体オールド | **16px** | 400 | **1.60** | normal | 本文（既定） |
| Body Bold | 細ゴシック体オールド | 16px | 700 | 1.75 (28px) | normal | カード内の小見出し |
| Nav / Label | 細ゴシック体オールド | **14px** | **700** | 1.85 (25.9px) | normal | グローバルナビ・フッター |
| Tag | 中ゴシック体オールド | 14px | 500 | normal | normal | `イベント・展示会` `プレスリリース` |
| **CTA（唯一の字間）** | 細ゴシック体オールド | 14px | 700 | 1.60 (22.4px) | **0.56px (= 0.04em)** | `お問い合わせ` |
| Date | 細ゴシック体オールド | 14px | 400 | 1.71 | normal | `2026.08.21`（`#949494`） |
| Micro | Iwa UD Goth Disp Pr6N M | 12px | 500 | 1.04 | normal | `Made with joy.` / 縦組みの `Scroll` |
| Table Cell | 細ゴシック体オールド | **12px** | **400** | normal | normal | **`/font-list` の 4,639 要素** |

**`h1` は 16px / weight 400 / `line-height: normal` のまま**（ロゴ用の不可視見出しで、スタイルが当たっていない）。**見出し階層は `h2` から始まる**と読むこと。

### 3.5 行間・字間

- **行間の既定は 1.60**（実測 46 要素で最多。`--leading-normal: 1.6` と一致）
- **導入文だけ 2.20**（2 要素）。カード本文は **1.75**（8 要素）、ナビは **1.85**（12 要素）、UI ラベルは **1.50**（12 要素）
- **セクション見出しは 1.00**（46px / 46px）。**見出しは行間をまったく取らない**
- **字間は `normal` が 103/104 要素**。唯一の例外が `お問い合わせ` CTA の `0.56px`

#### 宣言 ≠ 実装（行間・ウェイト・字間）

| トークン | 宣言値 | 実測 |
|---|---|---|
| `--leading-tight` | 1.25 | **0 要素** |
| `--leading-snug` | 1.5 | 12 要素 |
| `--leading-normal` | **1.6** | **46 要素（最多）** |
| `--leading-relaxed` | 1.7 | 2 要素 |
| `--leading-relaxed02` | 1.75 | 8 要素 |
| `--leading-loose` | 2 | **0 要素** |
| （トークン外） | — | **1.85 が 12 要素 / 1.40 が 2 要素 / 2.20 が 2 要素** |
| `--font-weight-light` | 300 | **0 要素** |
| `--font-weight-regular` | 400 | 29 要素 |
| `--font-weight-regular02` | **460** | **0 要素** |
| `--font-weight-normal` | **500** | **35 要素（最多）** |
| `--font-weight-normal02` | **560** | **0 要素** |
| `--font-weight-medium` | 600 | 6 要素 |
| `--font-weight-bold` | 700 | 34 要素 |
| `--font-weight-bold02` | **790** | **0 要素** |
| `--font-weight-black` | 900 | **0 要素** |
| `--tracking-tight` | 0.02em | **0 要素** |
| `--tracking-normal` | 0.04em | **1 要素**（0.56px） |

> **460 / 560 / 790 という非整数ウェイトは可変フォント用の宣言で、実装では一度も使われていない。** 実際に使うのは **400 / 500 / 600 / 700 の 4 段**だけ。

**ガイドライン**:

- **`letter-spacing` を足さない。** イワタ書体の素の字送りで組む。CTA だけ `0.04em`
- **本文は 1.6、導入文は 2.2、見出しは 1.0** と落差をつける
- **ウェイトは 400 / 500 / 600 / 700 の 4 段に絞る**

#### 太さの合成に注意

**`@font-face` はどちらの書体も `font-weight: normal` でしか宣言されていない**（`イワタ細ゴシック体オールド_04` / `イワタ中ゴシック体オールド_04` とも）。それに対して CSS は `font-weight: 700` を 34 要素、`500` を 35 要素に当てている。**つまり太さはブラウザの合成太字（faux bold）で作られている。**

- **細/中の切り替えは書体名で行い、`font-weight` では行わない**のがこのサイトの本来の設計
- **再現するときは、書体名で太さを切り替えられる書体を用意するか、実ウェイトを持つ書体（Noto Sans JP 等）に差し替える**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 書体名（`イワタUDゴシックStdN VF TTF` 等）は途中で割らない。`word-break: break-all` は使わない
- `/font-list` の表はセル幅を固定し、書体名を 1 行に収める前提

### 3.7 OpenType 機能

**このサイトは `font-feature-settings` を一切使っていない**（実測 0 要素・2 ページとも）。

- **`palt` を足さないこと。** 書体側の字面設計をそのまま見せるのが狙い。**書体メーカーのサイトで詰め組みをすると、書体の素の姿が分からなくなる**

### 3.8 縦書き

**`writing-mode: vertical-rl` は 2 要素ある。どちらもヒーロー右端の `Scroll` の飾り**（`div.c-scroll` とその中の `span`）。

- **本文の縦組みは 1 つも無い。** 「縦組みのサイト」として扱わないこと
- 装飾として使う場合の値: `writing-mode: vertical-rl` / `font-family: "Iwa UD Goth Disp Pr6N M"` / 12px / `line-height: 12.48px`

---

## 4. Component Stylings

**影は 1 つも無い**（`box-shadow` の実測 0 種）。階層は**角丸の大きさと面色**だけで作る。

### Buttons

**Primary（紺のピル）**
- Background: **`#123480`** / Text: `#ffffff`
- Border: `1px solid #123480`
- Padding: `16px 32px`
- Border Radius: **`48px`**
- Font: 中/細ゴシック体オールド 14px / **weight 700** / **`letter-spacing: 0.56px`**

**Primary Wide（`もっと見る`）**
- Background: `#123480` / Text: `#ffffff`
- Padding: **`24px 64px`** / Border Radius: `48px`
- Font: 中ゴシック体オールド 16px / weight 500 / `letter-spacing: normal`

**Accent（`フォント一覧`）**
- Background: **`#e29d4e`** / Text: `#ffffff`
- Border: `1px solid #e29d4e`
- Padding: `24px 28px` / Border Radius: `48px`
- Font: 中ゴシック体オールド **19.2px** / weight 500

**Pill Small（`お知らせ一覧` `記事一覧`）**
- Background: `#123480` / Text: `#ffffff`
- Padding: `13px 28px`
- Border Radius: **`24px`**（`48px` ではない）
- Font: 中ゴシック体オールド 14px / weight 500〜700

### Tags / Chips

**News Tag**
- Background: **`#efefef`**（トークン外の直書き）/ Text: `#192030`
- Padding: `4px 16px`
- Border Radius: **`100px`**
- Font: 中ゴシック体オールド 14px / weight 500

**Hero Badge**
- Background: `#ffffff` / Text: `#192030`
- Padding: `8px`
- Border Radius: **`4px`**
- Font: 細ゴシック体オールド 20px / weight 700

### Cards

**Link Card（サービス一覧）**
- Background: **`#f4f5f6`** / Text: `#333333`
- Border Radius: **`16px`**
- Padding: `48px 30px 30px`
- Shadow: **なし**

**CTA Card（3 色の導線）**
- Background: `#123480`（お問い合わせ）/ `#529a77`（ライセンス情報）/ `#e29d4e`（カタログダウンロード）
- Text: `#ffffff`
- Border Radius: `16px` / Padding: `44px 64px`

**Plain Card（`商利用のご案内` `よくある質問` 等）**
- Background: `#ffffff` / Border Radius: `16px` / Padding: `40px 26px`
- 枠線も影も無く、**白地に白カードを角丸だけで置く**

### Inputs

トップページに入力欄は無い。フォームを作る場合は上の Pill Small（radius 24px）と Card（radius 16px）に合わせ、**影を付けない**こと。

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | **4px** | アイコンとラベルの間（gap 6 箇所） |
| S | **8px** | バッジ内側・小さい gap（6 箇所） |
| M | **16px** | 一般的な gap（5 箇所）・`--innerPadingInline` |
| L | **24px** | Pill Small の上下・カード内側 |
| XL | **38px** | カード列の gap（4 箇所） |
| XXL | **40px / 56px** | セクション内の列 gap |
| 3XL | **64px** | CTA カードの内側左右 |

### Container

- **`--innerWidth: 1228px`**（宣言）。**実測のコンテナ幅は `1284px`（5 要素）と `1440px`（3 要素）が多く、`1228px` は 1 要素のみ**
- カード 1 枚の実測幅: `384px`（6 要素）
- モバイル左右アキ: **`--innerPadingInline: 16px`**

> **変数名の綴りが `--innerPadingInline`（`d` が 1 つ足りない）。** 実サイトのままなので、**このサイトの CSS に追記するときはこの綴りに合わせる**こと。新規に書き起こすなら `--inner-padding-inline` に直す。

### Grid

- サービス一覧は 3 カラム（カード 384px ＋ gap 38px）
- お知らせは 1 カラムのリスト。CTA カードは 3 分割
- `/font-list` は表組み（1 行 = 1 書体、セル 12px）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | **`none`** | **すべて。実測 0 種** |

> **影を使わないサイト。** 階層は **角丸の大きさ（4 → 16 → 24 → 48 → 100px）** と **面色（`#ffffff` / `#f4f5f6` / `#efefef` / `#123480`）** で作る。

#### 宣言 ≠ 実装（角丸）

| トークン | 宣言値 | 実測 |
|---|---|---|
| `--rounded-min` | 2px | **0 要素** |
| `--rounded-sm` | 4px | 2 要素（ヒーローのバッジ） |
| `--rounded-md` | 8px | **0 要素** |
| `--rounded-md2` | 10px | 6 要素 |
| `--rounded-lg` | 12px | **0 要素** |
| `--rounded-xl` | **16px** | **23 要素** |
| `--rounded-xxl` | **24px** | **27 要素（最多）** |
| `--rounded-full` | `calc(infinity * 1px)` | **0 要素** |
| （トークン外） | — | **48px が 4 要素 / 100px が 6 要素 / 9px が 12 要素 / 15px が 8 要素** |

> **ピル形は `--rounded-full` ではなく `48px` / `100px` の直書きで作られている。** `calc(infinity * 1px)` は宣言だけ。

---

## 7. Do's and Don'ts

### Do（推奨）

- **和文は `"イワタ細ゴシック体オールド_04", sans-serif` の 1 本 ＋ `sans-serif`。** OS フォントをチェーンに並べない
- **太さは書体名で切り替える**（細 → 中）。`font-weight` は 400 / 500 / 600 / 700 の 4 段まで
- **`letter-spacing: normal` を既定にする。** CTA だけ `0.04em`（14px なら `0.56px`）
- **行間は本文 1.6、導入文 2.2、セクション見出し 1.0**
- **角丸は 16px（カード）と 24px / 48px（ボタン）を軸にする**
- **`box-shadow` を一切使わない**
- CTA の面色は **紺 `#123480` / オレンジ `#e29d4e` / 緑 `#529a77`** の 3 色。**役割ではなく行き先の種類で使い分ける**
- 見出し色は `#192030`、本文色は `#333333`

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素）
- **本文に `letter-spacing` を足さない**
- **`box-shadow` でカードを浮かせない**
- **`@font-face` の 108 本を「使える書体」と読まない。** `loaded` は 8 本
- **`--font-family-noto` を本文に使わない**（参照 0 要素・しかも `serif` フォールバックの誤り）
- **`--color-green01 / green02 / brown01-03 / pink01 / blue02-04` を使わない**（実装で可視 0 要素）
- **`--leading-tight` (1.25) / `--leading-loose` (2) / `--font-weight-light` (300) / `--font-weight-black` (900) / `--tracking-tight` (0.02em) を使わない**（いずれも実装 0 要素）
- **`--rounded-full: calc(infinity * 1px)` を使わない**（実装は `48px` / `100px`）
- **縦組みを本文に使わない**（実測 2 要素はどちらも `Scroll` の飾り）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測 |
|------|-------|------|
| **Desktop（主）** | **`(min-width: 992px)`** | **357 回。圧倒的に最多** |
| Tablet | `(min-width: 768px)` | 14 回 |
| Wide | `(min-width: 1200px)` | 13 回 |
| Mobile | `(max-width: 768px)` | 5 回 |
| Small | `(min-width: 576px)` / `(min-width: 480px)` | 3 回 / 1 回 |
| Hover | `(any-hover: hover)` | 2 回 |

- **モバイルファースト（`min-width` 優先）で、分岐の実質的な軸は `992px` 1 本**。576 / 768 / 992 / 1200 は Bootstrap 系のブレークポイント列
- `(any-hover: hover)` でホバー効果を出し分けている。`--hover-opacity: 0.8`

### タッチターゲット

- Primary CTA は `16px 32px` の padding に 14px / 1.60 の行高 → 約 54px 高。**44px を満たす**
- Pill Small（`13px 28px` / 14px）は約 51px 高で満たす
- **News Tag（`4px 16px` / 14px）は約 34px 高で 44px を下回る。** モバイルでは高さを確保すること

### フォントサイズの調整

- ヒーロー 72px・100周年 115px は**デスクトップ前提**。モバイルでは 1/2 前後に落とす
- 本文 16px / ナビ 14px / `/font-list` の表 12px はブレークポイントをまたいで固定

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Navy:   #123480
Accent Orange:#e29d4e
Accent Green: #529a77
Heading Text: #192030
Body Text:    #333333
Muted:        #c8c8c8（フッター） / #949494（日付）
Surface Card: #f4f5f6
Tag Fill:     #efefef
Background:   #ffffff
Font (本文): "イワタ細ゴシック体オールド_04", sans-serif
Font (強調): "イワタ中ゴシック体オールド_04", sans-serif
Body Size: 16px
Line Height: 1.6（本文） / 2.2（導入文） / 1.0（セクション見出し）
Letter Spacing: normal（CTA のみ 0.04em）
Border Radius: 16px（カード） / 24px・48px（ボタン） / 100px（タグ）
Box Shadow: なし
font-feature-settings: なし
```

### プロンプト例

```
株式会社イワタのデザインシステムに従って、書体一覧ページを作成してください。
- font-family は "イワタ細ゴシック体オールド_04", sans-serif（強調は "イワタ中ゴシック体オールド_04"）
- 太さは書体名で切り替える。font-weight は 400 / 500 / 600 / 700 の 4 段まで
- letter-spacing は normal。CTA だけ 0.04em（14px なら 0.56px）
- font-feature-settings は書かない（palt を足さない）
- 本文 16px / line-height 1.6、導入文 18px / weight 500 / line-height 2.2
- セクション見出しは 46px / weight 700 / line-height 1.0
- カードは背景 #f4f5f6 / border-radius 16px / padding 48px 30px 30px、box-shadow は使わない
- CTA は背景 #123480 / 文字 #ffffff / border-radius 48px / padding 16px 32px / 14px weight 700
- 二次導線のカードは #529a77（ライセンス）と #e29d4e（カタログ）を面色にする
- タグは背景 #efefef / border-radius 100px / padding 4px 16px
- 見出し色 #192030、本文色 #333333、フッターのリンクは #c8c8c8
- コンテナは 1284px、カードは 384px、カード間の gap は 38px
- ブレークポイントは min-width: 992px を主軸にする
```
