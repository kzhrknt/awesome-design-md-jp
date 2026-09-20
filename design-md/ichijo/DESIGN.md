# DESIGN.md — 一条工務店（ICHIJO）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-20 / 対象: `https://www.ichijo.co.jp/`, `/technology/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **ベージュ（`#f5f1e9`）と白で組んだ住宅メーカー。** 全画面の暮らしの写真に、字空けを広く取った白文字を重ねる。角丸 30px のピルとタグで柔らかさを作る
- **密度**: 中〜高。トップの可視テキストは 617 要素。11px / 12px の補足が 211 要素あり、写真カードの下に情報を詰める
- **キーワード**: YakuHanJP、しっぽり明朝、ベージュ、字空け 0.2em、ピル 30px

**このサイトの核心は 4 つある。**

1. **`YakuHanJP` を先頭に置いて約物だけ半角にしている。** `YakuHanJP, "Noto Sans JP", sans-serif` が **613/617 要素**。YakuHanJP は **`、。「」（）・：；` などの約物だけを収録したサブセットフォント**で、先頭に置くと約物のアキだけが詰まり、かな漢字は Noto Sans JP が描く。**`palt` を使わずに約物を詰める手段**
2. **`font-feature-settings` は 0 要素。** `palt` も `tnum` も使っていない。**約物の処理は YakuHanJP に任せ、OpenType 機能には頼らない**
3. **字間は見出しごとに個別指定する。** body は `letter-spacing: normal`（483/617 要素）。そのうえで **`0.04em`（本文・タグ）/ `0.16em` / `0.2em`（大見出し）の 3 段階**を見出しごとに書き分ける。**body に 1 回書いて継承させる設計とは逆**
4. **ヒーローのコピーだけ「しっぽり明朝」。** `"Shippori Mincho", serif` が 4 要素。41.2px / `line-height: 1.33` / `letter-spacing: 2.8859px`（= 0.07em）。**明朝は「暮らしの言葉」にだけ使い、UI はすべてゴシック**

> **CSS Custom Properties は実質 0。** トップに 2 個あるのは Swiper の既定値（`--swiper-theme-color` / `--swiper-navigation-size`）で、`/technology/` は 0 個。**設計トークンを持たないサイト**なので、この DESIGN.md の値はすべて実測の生の数値。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Beige（面）** | **`#f5f1e9`** | **面色 69 要素で最多**。ヘッダー、ユーティリティナビ、タグの地 |
| **Beige Ink** | **`#4f4836`** | ヘッダーのユーティリティ文字（7 要素）。面色にも 2 要素 |
| **Gold** | **`#c8bb91`** | **`VIEW MORE` の文字 42 要素**。ベージュを締める金茶 |
| **Gold Tag** | `#c9c0a1` | タグ（`#標準仕様` `#収納`）の文字 24 要素 |
| **Beige Fill** | `#e5dac1` | タブの選択状態（`ライフスタイルについて`） |
| **Beige Border** | `#c9b993` | 罫線 |
| **Ivory** | `#f7f6f2` | セクションの淡い地（4 要素） |

### Semantic（意味的な色）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Alert Red（見出し）** | **`#d75c65`** | `重要なお知らせ` の見出し（1 要素） |
| **New Badge** | **`#f01236`** | `NEW` バッジの面（3 要素・21px / 白文字） |
| **CTA Red（下層）** | **`#cb3523`** | **`/technology/` の CTA 面 9 要素**。`［全感快適］詳細へ` 等 |
| **Success Green** | `#3b8e48` | 技術名の見出し（`全感快適` `超効エネ` `総合免災`・4 要素） |
| **Caution Yellow** | **`#fade20`** | **`停電・断水発生時などのサポート情報はこちら`**（1 要素・18px / 黒文字） |

> **赤が 3 つある**（`#d75c65` 見出し / `#f01236` バッジ / `#cb3523` CTA）。**用途がそれぞれ違うので統合しない。** トップの CTA は白地＋黒枠で、**赤い面 CTA は `/technology/` 以下の下層ページにだけ出る**。

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文・ナビ。**トップ 430 要素で最多**
- **Text Primary (下層)** (`#2c2b26`): `/technology/` の本文（135 要素）。**ページによって本文色が違う**
- **Text Secondary** (`#333333`): カード内の説明文（88 要素）
- **Text Tertiary** (`#3c3c3c`): リード文（6 要素）
- **Link** (`#185463`): `<a>` の既定色（濃い青緑）
- **Text Muted** (`#7a776a`): `お問い合わせ一覧はこちら`
- **Text on Photo** (`#ffffff`): 写真上のコピー（11 要素）
- **Border** (`#e2e3e7`): お客さまの声カードの枠（44 要素）
- **Border Light** (`#dfdfdf`): `/technology/` のボタン枠
- **Surface Gray** (`#f5f5f5`): `/technology/` の面（8 要素）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 **`body`**）

> **`viewportTopByArea` の 1 位はヘッダーの `#f5f1e9`（675,000px²）だが、これはヘッダーの面であってページの地色ではない。** `heroCovered` は `false`、`body` に `#ffffff` が直接入っている。**ページ背景は白。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（既定）**: **Noto Sans JP**（Google Fonts）。`@font-face` は 300 / 400 / 500 / 700 が宣言され、**トップで `loaded` なのは 400 / 500 / 700**（`/technology/` では 300 も `loaded`）
- **約物（最優先）**: **YakuHanJP**。`@font-face` は 100 / 200 / 300 / 400 / 500 / 700 / 900 の **7 ウェイトが宣言されているが、`loaded` は 400 と 700 の 2 つだけ**
- **明朝体（ヒーローのコピー専用）**: **Shippori Mincho（しっぽり明朝）**。400 / 700 とも `loaded`。**実測 4 要素**
- `Noto Serif JP` も宣言されているが **全ウェイト `unloaded`**。**使わないこと**

### 3.2 欧文フォント

- **`/technology/` の番号だけ Inter**（`Inter, sans-serif`・9 要素）。`01` `02` `03` と `Comfortable` 等のラベル。**`font-weight: 100`（8 要素）という極細で使う**
- それ以外の欧文（`VIEW MORE` `PICK UP` `Scroll`）は **Noto Sans JP の欧文グリフ**
- 等幅フォントの指定は無い

### 3.3 font-family 指定

```css
/* トップページの既定 */
font-family: YakuHanJP, "Noto Sans JP", sans-serif;

/* 下層ページの既定（フォールバックが長い） */
font-family: YakuHanJP, "Noto Sans JP", "Hiragino Kaku Gothic ProN",
             "ヒラギノ角ゴ ProN W3", メイリオ, Meiryo, sans-serif;

/* ヒーローのコピー */
font-family: "Shippori Mincho", serif;

/* 番号・英字ラベル（下層のみ） */
font-family: Inter, sans-serif;
```

**フォールバックの考え方**:

- **`YakuHanJP` を必ず先頭に置く。** YakuHanJP は約物しか持たないサブセットなので、**それ以外の文字は自動的に次の `"Noto Sans JP"` に落ちる**。これが「約物だけ半角」の仕組み
- **和文優先。** 欧文専用フォントを先頭に置かない（Noto Sans JP の欧文グリフで統一する）
- **同一サイト内にスタックが 2 系統ある。** トップは 3 段（`YakuHanJP, "Noto Sans JP", sans-serif`）、`/technology/` は OS フォントまで並べた 6 段（69 要素）。**新規実装ではどちらかに統一すること。短い方（トップ）が新しい**

### 3.4 文字サイズ・ウェイト階層

**ルートは `16px`**（`html` / `body` とも 16px・weight 400・`line-height: normal` / `letter-spacing: normal`）。`rem` はそのまま px に読み替えてよい。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Hero Copy** | **Shippori Mincho** | **41.2272px**（流体） | 400 | **1.33** (54.83px) | **2.8859px (= 0.07em)** | **写真上の白文字。明朝はここだけ** |
| Number (下層) | **Inter** | 54 / 64px | **100** | 1.00 | normal | `01` `02` `03`。**極細** |
| Stat | YakuHanJP + Noto Sans JP | 68px | 700 | — | normal | `No.1` |
| **Section Heading** | YakuHanJP + Noto Sans JP | **32px** | **400** | **1.75** (56px) | **6.4px (= 0.2em)** | **`テーマ別に見る家づくり`。最大の字空け** |
| Section Heading (alt) | YakuHanJP + Noto Sans JP | 32px | 400 | normal | **1.28px (= 0.04em)** | `一条のKey Technology` |
| **Sub Heading** | YakuHanJP + Noto Sans JP | **24px** | **400** | **1.75** (42px) | **4.8px (= 0.2em)** | `PICK UP` `タグから探す` |
| Feature Heading | YakuHanJP + Noto Sans JP | 24px | 700 | normal | normal | `全感快適` `超効エネ`（`#3b8e48`） |
| Tab Label | YakuHanJP + Noto Sans JP | 30px | 400 | normal | **-0.6px (= -0.02em)** | `家の性能について`。**唯一の負の字間（タブ）** |
| Vertical-ish Title | YakuHanJP + Noto Sans JP | 32px | 400 | normal | **5.12px (= 0.16em)** | `一 条 工…` と 1 文字ずつ組む見出し |
| Category | YakuHanJP + Noto Sans JP | 22px | 400 | normal | normal | `全館床暖房` `2倍耐震` |
| Alert Heading | YakuHanJP + Noto Sans JP | 18px | 700 | normal | **1.8px (= 0.1em)** | `重要なお知らせ`（`#d75c65`） |
| Card Title | YakuHanJP + Noto Sans JP | **18px** | 400 | normal | normal | 建築実例のタイトル（86 要素） |
| **Body** | YakuHanJP + Noto Sans JP | **16px** | 400 | **1.875** (30px) | **0.64px (= 0.04em)** | **読ませる本文（`p`）** |
| Nav | YakuHanJP + Noto Sans JP | 16px | 400 | **1.50** | normal | グローバルナビ（70 要素） |
| Utility Nav | YakuHanJP + Noto Sans JP | **15px** | **700** | normal | normal | `お近くの展示場` 等（`#4f4836`） |
| Card Text | YakuHanJP + Noto Sans JP | 14px | 400 | normal | normal | カード内の説明（48 要素） |
| Caption | YakuHanJP + Noto Sans JP | **12px** | 400 | normal | normal | **100 要素**。補足・日付 |
| Caption Tight | YakuHanJP + Noto Sans JP | 12px | 700 | normal | **-1.2px (= -0.1em)** | `お問い合わせ`（アイコン下のラベル） |
| Note | YakuHanJP + Noto Sans JP | **11px** | 400 | normal | normal | **111 要素**。ニュースの説明文 |
| Tag | YakuHanJP + Noto Sans JP | 11px | 400 | 1.00 | **0.44px (= 0.04em)** | `# 平屋` `# スタイリッシュ`（66 要素） |
| More Label | YakuHanJP + Noto Sans JP | **10px** | 400 | normal | normal | `VIEW MORE`（42 要素・`#c8bb91`） |

**`h1` は 16px / weight 700 / `letter-spacing: normal`**（ロゴ用でスタイルが当たっていない）。**見出し階層は `h2` から読むこと**。

### 3.5 行間・字間

- **行間は `normal` が 469/617 要素**。**明示的に指定するのは読ませる文だけ**
  - 本文（`p`）: **1.875**（16px / 30px）
  - ナビ・リスト: **1.50**（97 要素）
  - 見出し（32px / 24px）: **1.75**
  - リード文: **1.80**（3 要素）
  - ヒーローのコピー: **1.33**
  - ボタン・タグ: **1.00**（33 要素）
- **字間は `normal` が 483/617 要素。個別指定は 12 種類**

#### 字間の 3 段階（em に直すと揃う）

| 実測 px | サイズ | em | 用途 |
|---|---|---|---|
| **0.44px** | 11px | **0.04em** | タグ（66 要素） |
| **0.64px** | 16px | **0.04em** | 本文（18 要素） |
| **1.28px** | 32px | **0.04em** | セクション見出し |
| **1.8px** | 18px | 0.1em | `重要なお知らせ` |
| **2.8859px** | 41.2272px | **0.07em** | ヒーローのコピー（流体サイズなので端数） |
| **4.8px** | 24px | **0.2em** | `PICK UP` `タグから探す` |
| **5.12px** | 32px | **0.16em** | 1 文字ずつ組む見出し |
| **6.4px** | 32px | **0.2em** | `テーマ別に見る家づくり` |
| **-0.6px** | 30px | **-0.02em** | タブのラベル |
| **-0.7px** | 16px | -0.044em | `/technology/` のカード説明 |
| **-1.2px** | 12px | **-0.1em** | `お問い合わせ`（アイコンラベル） |

> **`letter-spacing` は em 宣言 → px 継承。** `0.44 / 0.64 / 1.28` をそれぞれのサイズで割ると **すべて `0.04em`** に揃う。**px の数値をそのままコピーしない。em で書くこと。**
>
> **ヒーローの `41.2272px` / `2.8859px` は流体サイズ（`vw` 由来）の端数。** ビューポート 1440px での実測値なので、**固定 px で書き写さず `clamp()` か `vw` で組む**こと。

**ガイドライン**:

- **body は `letter-spacing: normal`。字間は見出しごとに書く**（このサイトは継承させない）
- **字空けは `0.04em`（本文・タグ）→ `0.16em` → `0.2em`（大見出し）の 3 段階**
- **小さいラベルには負の字間を使う**（12px で `-0.1em`、30px のタブで `-0.02em`）
- **本文の行間は 1.875**（16px / 30px）。**ナビは 1.5、見出しは 1.75**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- **YakuHanJP が先頭にあるため、約物は半角幅で組まれる。** `「家は、性能。」を実現する、４つの柱。` のような約物の多い見出しが詰まって見えるのはこのため
- `word-break: break-all` は使わない

### 3.7 OpenType 機能

**このサイトは `font-feature-settings` を一切使っていない**（実測 0 要素・2 ページとも）。

- **`palt` を足さないこと。** **約物のアキは YakuHanJP（約物半角フォント）で処理しており、`palt` を重ねると二重に詰まる**
- `tnum` も使っていない。数値（`No.1` `4,000社`）は Noto Sans JP の既定グリフ

### 3.8 縦書き

**該当なし**（`writing-mode: vertical-rl` は実測 0 要素）。

- ただし **「一 条 工 務 店」のように 1 文字ずつ縦に並べた見出しがある**。これは `writing-mode` ではなく **1 文字ごとの `span` ＋ `letter-spacing: 0.16em`（32px で 5.12px）** で作られている（15 要素）

---

## 4. Component Stylings

### Buttons

**Outlined Pill（トップの主 CTA・6 種類で共通）**
- Background: **`#ffffff`** / Text: `#222222`
- Border: **`1px solid #000000`**
- Padding: **`12px 40px 13px`**（下だけ 1px 多い）
- Border Radius: **`30px`**
- Font: 18px / weight 400 / `letter-spacing: normal`
- 例: `建築実例の一覧を見る` `商品一覧を見る` `テクノロジーを見る` `公式SNSの紹介はこちら`

**Filled Red（`/technology/` 以下の CTA）**
- Background: **`#cb3523`** / Text: `#ffffff`
- Border Radius: **`8px`**（小さいものは `4px`）
- Padding: `14px 12px`（大きいものは `24px 22px`）
- Font: 13px / weight 400

**Caution（黄色の帯）**
- Background: **`#fade20`** / Text: `#222222`
- Padding: `11px 0px 12px` / Border Radius: `5px`
- Font: 18px / weight 400 / `letter-spacing: 0.54px (= 0.03em)`

**Round Outlined（企画コンテンツ）**
- Background: `#ffffff` / Text: `#3c3c3c`
- Border: **`1px solid` で 3 色を出し分ける**（`#74b2b4` 青緑 / `#d0b904` 黄 / `#b8ada2` グレー）
- Padding: `10px 0px` / Border Radius: **`50px`**
- Font: 14px / weight 400

**Tab（選択状態）**
- Background: **`#e5dac1`** / Text: `#222222`
- Border Radius: **`5px 5px 0px 0px`**（上だけ角丸）
- Padding: `15px 30px`
- Font: 30px / weight 400 / `letter-spacing: -0.6px`
- 非選択は背景 `#ffffff`

**Filter Chip（`/technology/`）**
- 選択: Background `#898989` / Text `#ffffff`
- 非選択: Background `#ffffff` / Text `#2c2b26`
- Border: `1px solid #dfdfdf` / Border Radius: **`8px`** / Padding: `11px 16px`
- Font: 14px / weight 400

### Badges / Tags

**Tag（`# 平屋`）**
- Background: **`#f5f1e9`** / Text: `#222222`
- Padding: `7px 8px`
- Border Radius: **`30px`**
- Font: **11px / weight 400 / `letter-spacing: 0.44px (= 0.04em)`**

**NEW Badge**
- Background: **`#f01236`** / Text: `#ffffff`
- Padding: `4px 10px` / Border Radius: **`0px`**
- Font: 21px / weight 400

### Cards

**Photo Card（建築実例・ニュース）**
- Background: `#ffffff`
- Border Radius: **`5px`**
- Shadow: **`0 0 5px 3px rgba(0, 0, 0, 0.1)`**（**42 要素。サイトで唯一の影**）
- Title 18px / Body 14px / Note 11px

**Voice Card（お客さまの声）**
- Background: transparent / Border: **`1px solid #e2e3e7`**
- Border Radius: **`5px`**
- Padding: **`288px 20px 20px`**（上に写真の高さ分を空ける）

**Feature Card（企画コンテンツ）**
- Background: `#ffffff` / Border: `1px solid #dae1d9`
- Border Radius: **`20px`**
- Text: `#185463`

### Inputs

- Font: 16px / weight 400 / placeholder は `#999999`
- `font-family` は `YakuHanJP, "Noto Sans JP", sans-serif` が継承されている（**フォーム要素も和文で揃っている**）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | **8px** | 小さい gap・タグの左右 |
| S | **10px** | アイコンとラベル |
| M | **20px** | カード内側・列 gap |
| L | **24px** | `/technology/` の列 gap |
| XL | **30px / 40px** | セクション内の縦 gap |
| XXL | **60px / 100px** | セクション間（`/technology/`） |

### Container

- **トップ Max Width: 1000px**（**実測 13 要素で最多**）
- 1200px / 960px / 840px / 800px / 720px の派生幅を持つ
- **`/technology/` は 1220px**（5 要素）・1180px（3 要素）と**トップより広い**
- 列 gap に `3.3%` という相対値を使う箇所がある（4 要素）

### Grid

- トップは 1000px の中で 2〜4 カラム。建築実例は 3 カラム、ニュースは 4 カラム
- `/technology/` は 1220px の中で 2 カラム（番号 ＋ 説明）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。ボタン・タグ・タブはすべてフラット。`/technology/` は影が 0 種** |
| **1** | **`0 0 5px 3px rgba(0, 0, 0, 0.1)`** | **写真カード。実測 42 要素で事実上これ 1 種** |
| 2 | `0 0 10px 0 rgba(0, 0, 0, 0.2)` | 追従要素（1 要素） |

> **オフセット 0・ぼかし 5px・広がり 3px という珍しい形。** 落ち影ではなく**周囲に均等ににじむ影**で、写真カードの縁を紙のように柔らかく見せている。`0 2px 8px` のような一般的な値に置き換えると印象が変わる。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-family` は `YakuHanJP, "Noto Sans JP", sans-serif`。YakuHanJP を必ず先頭に置く**（約物だけが半角になる）
- **YakuHanJP は 400 と 700 だけ読み込む**（7 ウェイト宣言しても `loaded` は 2 つ）
- **body は `letter-spacing: normal`。字間は見出しごとに em で書く**
- **字空けは `0.04em` → `0.16em` → `0.2em` の 3 段階**
- **小さいラベルには負の字間**（12px で `-0.1em`、30px のタブで `-0.02em`）
- **本文は 16px / `line-height: 1.875`、ナビは 1.5、見出しは 1.75**
- **ヒーローのコピーだけ「しっぽり明朝」**（`line-height: 1.33` / `letter-spacing: 0.07em`）
- **主 CTA は白地 ＋ `1px solid #000000` ＋ `border-radius: 30px`**。赤い面 CTA（`#cb3523`）は下層ページだけ
- **タグは背景 `#f5f1e9` / `border-radius: 30px` / 11px / `0.04em`**
- **写真カードの影は `0 0 5px 3px rgba(0,0,0,0.1)` 一択**

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** YakuHanJP と二重に詰まる
- **YakuHanJP を欧文フォントや Noto Sans JP より後ろに置かない**（約物半角が効かなくなる）
- **ヒーローの `41.2272px` / `2.8859px` を固定 px で書かない**（流体サイズの端数。`clamp()` か `vw` で組む）
- **`letter-spacing` の px をそのままコピーしない**（em に直すと 0.04 / 0.16 / 0.2 に揃う）
- **`Noto Serif JP` を使わない**（宣言はあるが全ウェイト `unloaded`）
- **`Inter` を本文に使わない**（`/technology/` の番号 `01` `02` 専用・weight 100）
- **赤を 1 色にまとめない**（`#d75c65` 見出し / `#f01236` バッジ / `#cb3523` CTA は用途が別）
- **トップの CTA を面色にしない**（トップは白地＋黒枠。面 CTA は下層）
- **カード以外に影を付けない**（`/technology/` は影 0 種）
- **CSS 変数を前提にしない**（このサイトは設計トークンを持たない）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測 |
|------|-------|------|
| **Mobile** | **`screen and (max-width: 768px)`** | **トップ 334 回 / 下層 230 回。圧倒的に最多** |
| Tablet | `screen and (max-width: 980px)` | 27 回 / 20 回 |
| Small Phone | `screen and (max-width: 390px)` | 31 回（`393px` も 2 回） |
| Narrow Desktop | `screen and (max-width: 1130px)` | 6 回 / 8 回 |
| | `screen and (max-width: 960px)` | 2 回 / 7 回 |
| Desktop | `screen and (min-width: 768px)` / `(min-width: 769px)` | 4 回 / 2 回 |
| Hover | `(hover)` / `(hover: hover) and (pointer: fine)` | 41 回 / 20 回 |

- **デスクトップファースト（`max-width` 優先）で、軸は `768px` 1 本**
- **`390px` の第 2 軸が 31 回ある**（iPhone の標準幅）。**小さい端末で文字サイズと余白を追い込んでいる**
- ホバーは `(hover)` と `(hover: hover) and (pointer: fine)` を併用。**タッチ端末でホバー効果が残らないようにしている**

### タッチターゲット

- Outlined Pill（`12px 40px 13px` / 18px）は約 52px 高。**44px を満たす**
- Filter Chip（`11px 16px` / 14px）は約 43px 高で**ほぼ満たす**
- **Tag（`7px 8px` / 11px）は約 30px 高で 44px を下回る。** モバイルでは高さを確保すること
- `VIEW MORE`（10px）は単独では小さすぎる。**カード全体をタップ領域にすること**

### フォントサイズの調整

- ヒーローのコピーは **`vw` ベースの流体サイズ**（1440px で 41.2272px）。モバイルでは自動的に縮む
- 本文 16px / カード 14px / 補足 11〜12px はブレークポイントをまたいで固定
- セクション見出し 32px はデスクトップ前提。`768px` 以下で 24px 前後に落とす

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Beige:        #f5f1e9   Beige Ink: #4f4836   Beige Fill: #e5dac1
Gold:         #c8bb91（VIEW MORE） / #c9c0a1（タグ）
Text:         #222222（トップ） / #2c2b26（下層） / #333333（カード）
Link:         #185463
Alert:        #d75c65（見出し） / #f01236（NEW） / #cb3523（下層CTA）
Caution:      #fade20
Green:        #3b8e48
Border:       #e2e3e7 / #dfdfdf
Background:   #ffffff
Font: YakuHanJP, "Noto Sans JP", sans-serif
Font (ヒーロー): "Shippori Mincho", serif
Body Size: 16px
Line Height: 1.875（本文） / 1.5（ナビ） / 1.75（見出し） / normal（既定）
Letter Spacing: normal（body） / 0.04em（本文・タグ） / 0.16em / 0.2em（大見出し）
font-feature-settings: なし（YakuHanJP が約物を処理する）
Border Radius: 30px（ピル・タグ） / 8px（下層ボタン） / 5px（カード） / 20px（企画カード）
Box Shadow: 0 0 5px 3px rgba(0,0,0,0.1)（写真カードのみ）
```

### プロンプト例

```
一条工務店のデザインシステムに従って、建築実例の一覧ページを作成してください。
- font-family は YakuHanJP, "Noto Sans JP", sans-serif（YakuHanJP を必ず先頭に置く）
- YakuHanJP は 400 と 700 だけ読み込む
- font-feature-settings は書かない（palt を足すと約物が二重に詰まる）
- body の letter-spacing は normal。字間は見出しごとに em で書く
- セクション見出しは 32px / weight 400 / line-height 1.75 / letter-spacing 0.2em
- サブ見出しは 24px / weight 400 / line-height 1.75 / letter-spacing 0.2em
- 本文は 16px / line-height 1.875 / letter-spacing 0.04em
- カードのタイトルは 18px、説明は 14px、補足は 11px（いずれも letter-spacing: normal）
- 写真カードは背景 #ffffff / border-radius 5px / box-shadow 0 0 5px 3px rgba(0,0,0,0.1)
- タグは背景 #f5f1e9 / border-radius 30px / padding 7px 8px / 11px / letter-spacing 0.04em / 文字色 #c9c0a1
- 主 CTA は白地 + 1px solid #000000 / border-radius 30px / padding 12px 40px 13px / 18px
- 「VIEW MORE」は 10px / #c8bb91
- ヘッダーとユーティリティナビの地は #f5f1e9、その文字は #4f4836 / 15px / weight 700
- 本文色は #222222、ページ背景は白、コンテナは 1000px
- ブレークポイントは screen and (max-width: 768px) を主軸に、390px でもう一段調整する
```
