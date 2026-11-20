# DESIGN.md — アマナ（amana）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-20 / 対象: `https://amana.jp/`, `https://amana.jp/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **トークンで全部決める。** `--sys-schemes-*` という Material Design 3 の語彙で色・角丸・幅・z-index を宣言し、CSS に値を直書きしない
- **密度**: 中。`#eeeeee` のグレー地に白いカードを浮かべ、`0 2px 4px` の極薄の影 1 種だけで階層を作る
- **キーワード**: `--sys-schemes-*`、next/font の自社配信、和欧二層、角丸 11 段、サービス 5 色

**このサイトの核心は 4 つある。**

1. **和欧二層のスタックが 1 本だけ。** `"Custom Helvetica", "Noto Sans JP", "Noto Sans JP Fallback", sans-serif` が**トップページの可視 5689 要素すべて**に当たる。CDP の `CSS.getPlatformFontsForNode` で実測すると、**同じ 1 要素の中で欧文が Helvetica Neue、和文が Noto Sans JP に自動で分かれる**（例: 「パナソニック LUMIX L10｜一貫した世界観」= Noto Sans JP 38 グリフ ＋ Helvetica Neue 10 グリフ）
2. **フォントは Google Fonts ではなく自社ホストから配信している。** フォントファイルの要求 **57 件がすべて `amana.jp/_next/static/media/`**（next/font のセルフホスト）。gstatic.com へのリクエストは 0 件
3. **3 番目の `"Noto Sans JP Fallback"` は書体ではなくメトリクス合わせ。** next/font の `adjustFontFallback` が生成する、ローカル書体に `size-adjust` / `ascent-override` を当てたダミーで、**Web フォントが届く前のレイアウトシフトを消すためだけに存在する**。描画そのものは 2 番目の Noto Sans JP が担う
4. **`letter-spacing: normal` が可視 5689 要素中 5688 要素。** 例外は `amana NEWS` の `-0.24px` 1 要素だけ。`font-feature-settings` は 0 件

**CSS Custom Properties は `:root` に 108 個（自社トークン 100%・プラットフォーム由来 0）。** CORS で読めなかったシートは 0 枚、`body` だけに宣言された変数も 0 個なので、**この 108 個が設計の全体**とみなしてよい。

---

## 2. Color Palette & Roles

**色はすべて `--sys-schemes-*` で宣言されている。以下は宣言値と、実測の使われ方。**

### Primary（ブランドカラー）

| トークン | 宣言値 | 6 桁 | 実測 |
|------|--------|------|------|
| `--sys-schemes-brand` | `#231815` | **`#231815`** | ロゴの墨色 |
| `--sys-schemes-inverse-background` | `#131313` | **`#131313`** | 実績セクションの黒い面（可視 1 要素） |
| `--sys-schemes-caution` / `--sys-schemes-for-client` | `#e81e17` | **`#e81e17`** | **面 8 要素**（`募集中` バッジ）／ `お取引のご依頼・相談` |

### Service Colors（サービス 5 分類）

**このサイト固有の語彙。ソリューションを 5 つに分け、それぞれに 1 色を割り当てている。** ピルの枠線と文字色の両方に使う（可視: 紫 13 / ピンク 21 / 橙 12 / 緑 10 / 水 3 要素）。

| トークン | 値 | 分類 | タグの例 |
|------|------|------|------|
| `--sys-schemes-service-strategy` | **`#8d5ea5`** | 戦略設計 | `ブランディング` `らしさAI` `BX Design` |
| `--sys-schemes-service-content` | **`#e54aad`** | コンテンツ開発 | `グラフィック` `EVOKE` |
| `--sys-schemes-service-visual` | **`#f3a83b`** | ビジュアル開発 | `グラフィックデザイン` `撮影` |
| `--sys-schemes-service-process` | **`#007b49`** | プロセス構築 | `体制構築` `Great RIVER` |
| `--sys-schemes-service-media` | **`#54c5d7`** | メディア | `メディア事業` `IMA` `NATURE & SCIENCE` |

### Contact Colors（問い合わせ 3 分類）

| トークン | 値 | 用途 |
|------|------|------|
| `--sys-schemes-for-client` | **`#e81e17`** | お客様向け |
| `--sys-schemes-for-partner` | **`#1653a3`** | パートナー向け |
| `--sys-schemes-for-others` | **`#007b49`** | その他 |

> `/about/` の問い合わせブロックでは **`#e27318`（橙）と `#b1b6a5`（グレーグリーン）が面色として実測される**。トークンの 3 色とは別で、**宣言と実装がここだけ食い違っている**。

### Gradation（グラデーション）

- `--sys-schemes-gradation-1`: **`#1a60bc`** / `--sys-schemes-gradation-2`: **`#eb3d37`** / `--sys-schemes-on-gradation`: `#ffffff`
- ただし**ヒーローと問い合わせボタンの実装はこの 2 色を使っていない。** 実際は `--c-0` `--c-1` `--c-2` と `--x-N` `--y-N` の **位置つき 3 色**を JS が書き換えてアニメーションさせる（5.「Gradient Surface」参照）

### Neutral（ニュートラル）

| トークン | 宣言値 | 6 桁 | 役割 |
|------|--------|------|------|
| `--sys-schemes-background` | `#eee` | **`#eeeeee`** | **ページ背景**（`body` の実測値） |
| `--sys-schemes-surface` | `#fff` | **`#ffffff`** | カード・ヘッダーの面 |
| `--sys-schemes-on-background` | `#000` | **`#000000`** | 見出し（可視 26 要素） |
| `--sys-schemes-on-surface` | `#333` | **`#333333`** | 日付・補助テキスト（可視 18 要素） |
| `--sys-schemes-on-surface-variant` | `#54565a` | **`#54565a`** | `View All Works` などのリンク（可視 18 要素）。**影の色もこれ** |
| `--sys-schemes-inverse-on-surface` | `#ccc` | **`#cccccc`** | 黒い面の上の補助テキスト |
| `--sys-schemes-inverse-on-background` | `#fff` | **`#ffffff`** | 黒い面の上の見出し（可視 113 要素） |
| `--sys-schemes-outline` | `#bbbbbd` | **`#bbbbbd`** | 罫線 |
| `--sys-schemes-outline-variant` | `#eee` | **`#eeeeee`** | 薄い区切り線 |
| `--sys-schemes-tba` | `#8dc122` | **`#8dc122`** | 「未定」表示用。**2 ページとも可視 0 要素** |

> **宣言された色のうち `--sys-schemes-tba` は 2 ページとも実装されていない。** 新規実装で使わなくてよい。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP**（自社ホストから配信。`loaded` は 400 / 500 / 600 / 700 の 4 ウェイト）
- **明朝体**: **使っていない。** セリフ系の和文は 2 ページとも可視 0 要素
- `"Noto Sans JP Fallback"` は next/font が生成するメトリクス調整用のローカル代替。**書体ではないので、再現するときは `size-adjust` / `ascent-override` 付きの `@font-face` として書く**

### 3.2 欧文フォント

- **サンセリフ**: **`Custom Helvetica`**（自社ホスト配信。CDP 実測で実体は **Helvetica Neue**）
- `Noto Sans`（欧文版）も 400 / 500 / 600 / 700 が宣言されているが、スタックに登場せず **2 ページとも `unloaded`**
- **セリフ・等幅**: 使っていない

### 3.3 font-family 指定

```css
:root {
  --font-mixed: "Custom Helvetica", "Noto Sans JP", "Noto Sans JP Fallback", sans-serif;
  --font-noto:  "Noto Sans JP", "Noto Sans JP Fallback";
}

/* 全要素（トップページの可視 5689 要素すべて） */
font-family: var(--font-mixed);

/* ヘッダー・フッターの一部（118 要素 / 47 要素） */
font-family: "Helvetica Neue", "Noto Sans JP", "Noto Sans JP Fallback", sans-serif;
```

**フォールバックの考え方 — このサイトは和欧二層が正しく機能している数少ない例。**

- **欧文を先頭、和文を 2 番目**に置く。欧文書体（Helvetica Neue）は CJK グリフを持たないので、**和文は自動的に 2 番目の Noto Sans JP へ落ちる**。1 要素の中で書体が分かれるのはこの仕組み
- 3 番目の `"Noto Sans JP Fallback"` は**メトリクスを合わせたローカル代替**。Web フォントが届くまでの数百 ms をこれが埋めるので、**`font-display: swap` でも行送りが動かない**
- 末尾に generic family（`sans-serif`）がきちんと置かれている

> **`"Custom Helvetica"` という名前は amana 独自のもの。** 一般の実装では `"Helvetica Neue", Helvetica, Arial` と書くか、使いたい欧文書体を自分で `@font-face` する。**名前をそのまま真似しても当たらない。**

### 3.4 文字サイズ・ウェイト階層

**`html { font-size: 62.5% }` ＝ 1rem = 10px（全幅固定）。`body` だけが 768px を境に 16px → 14px に切り替わる。**

| 用途 | デスクトップ | `/about/` | weight | 実測件数（トップ） |
|------|------|------|--------|------|
| 大見出し（英語） | — | **76px** | 700 | 3（`Message` `Who` `What`） |
| ヒーローの英語コピー | **34.8px** | 32px | 700 | 1（`Co-Creation`） |
| セクション見出し | 24px | 24px | 600 | 8 |
| ステートメント | 22px | — | 400 | 28 |
| リード文 | — | 20px | 400 | 5 |
| 本文 | 18px | 18px | 400 | 29 / 6 |
| `body` の既定 | **16px** | 16px | 500 | 48 |
| 小見出し・リンク | 15px / 14px | 15px / 14px | 500 | 12 / 23 |
| ナビ・タグ | **13px / 12px** | 12px | 500 | **5407 / 123** |

**ウェイトは 500 が既定（トップ可視 5547 / 5689、`/about/` 87 / 165）。** 400（本文のステートメント）、600（セクション見出し）、700（英語の大見出しと日付）、300（`©amana inc.` `Follow Us` `EN` の 4 要素のみ）。

> **トップページの 13px / 12px が 5000 件を超えるのは、閉じたメガメニューの中身が DOM 上に存在するため。** 画面に見えている本文の階層は `/about/` 側の数字で読むこと。

### 3.5 行間・字間

| line-height | トップ | `/about/` | 用途 |
|------------|------|------|------|
| **1.50** | **5424** | 44 | 既定（ナビ・タグ・UI） |
| **1.70** | 109 | **87（最多）** | **見出しと本文**。`/about/` ではこれが既定 |
| 1.75 | 10 | 13 | ステートメントの本文（`新たな問いを生む「ノイズ」が…`） |
| 1.65 | 37 | 4 | 実績カードの説明文 |
| 1.55 | 29 | — | 実績カードのタイトル |
| 1.24 | 55 | — | ヒーローのスクロールテキスト |
| 1.30 | 8 | 1 | 日付 |
| 2.00 | 8 | 8 | フッターのリンク |
| 1.00 | — | 6 | `©amana inc.` `RSS` |

- **`letter-spacing` は `normal` が 5688 / 5689（トップ）・164 / 165（`/about/`）。** 例外は `amana NEWS` の `-0.24px` 1 要素だけ
- `line-height` は**すべて無単位の比率**。`em` 宣言も px 固定も無い
- **読ませる文章は 1.70〜1.75、UI は 1.50** という 2 段の使い分けが明確

### 3.6 禁則処理・改行ルール

- `word-break` の宣言なし（ブラウザ既定の `normal`）。`break-all` も `auto-phrase` も使っていない
- ステートメントは `<br>` で手で割っている（`新たな問いを生む「ノイズ」が常識を覆し、` で改行）
- 英語の大見出し（`Our Message` `Who We Are`）は 2 語ずつ改行して縦に積む

### 3.7 OpenType 機能

- **`font-feature-settings` は 2 ページとも 0 要素。** `palt` も `halt` も使っていない
- 本番書体の Noto Sans JP（Google Fonts 版）は `palt` テーブルを持つので、**足せば効いてしまう。既存ページと別物になるので足さない**

### 3.8 縦書き

- `writing-mode: vertical-rl` は `/about/` に **6 要素**出るが、**中身は `Scroll` の 1 語（14px）と SVG の `path` 5 つだけ**。和文の縦組みは 1 文字も無い
- **件数だけ見て「縦組みのサイト」と書かない。** 縦に置いているのはスクロール誘導のラベル
- **新規実装で和文に縦組みを足さない**

---

## 4. Component Stylings

**角丸は `--sys-schemes-radius-*` の 11 段。** `none: 0` / `xs: 4px` / `sm: 8px` / `md: 12px` / `lg: 16px` / `lg-inc: 20px` / `xl: 24px` / `xl-inc: 32px` / `2xl: 40px` / `2xl-inc: 48px` / `full: 1000px`。
実測で使われているのは **`sm`（65 要素）／`lg`（39）／`xs`（12）／`full`（9）／`2xl-inc`（4）の 5 段だけ**。

### Buttons

**Pill（`View All Works` `View All Insights`）**
- Background: `#ffffff` / Text: **`#54565a`**
- Border Radius: **`1000px`（`--sys-schemes-radius-full`）**
- Shadow: **`0 2px 4px color(srgb 0.329412 0.337255 0.352941 / 0.08)`**
- Font: 14px / weight 500

**Split Pill（問い合わせの 2 連ボタン）**
- **`border-radius: 1000px 0 0 1000px`（左）と `0 1000px 1000px 0`（右）** を隣り合わせて 1 本のピルに見せる。各 1 要素

**CMP（`同意して閉じる`）**
- Background: **`#54565a`** / Text: `#ffffff`
- Padding: `12px 20px 12px 24px`（右だけ 20px。アイコン分）

### Badges / Chips

**Service Tag（`ブランディング` `撮影` など）**
- Background: なし / Text: **サービス 5 色のいずれか**
- Border: **`1px solid` 同じサービス色**
- Border Radius: **`8px`（`--sys-schemes-radius-sm`）**
- Padding: `7px 23px`
- Font: 13px / weight 500
- **可視 59 要素。このサイトで最も数の多い部品**

**Badge（`募集中`）**
- Background: **`#e81e17`** / Text: `#ffffff`
- Padding: `12px`
- 可視 8 要素

### Inputs

- トップ・`/about/` とも素の `input` を置いていない（検索はヘッダーのアイコンからモーダルで開く）
- フォームは `lp.amana.jp` の別ドメインへ外出し

### Cards

**Work Card（実績）**
- Background: `#ffffff`
- Border Radius: **`16px`（`--sys-schemes-radius-lg`）**
- Shadow: **`0 2px 4px rgba(84, 86, 90, 0.08)`**
- 写真の上に **`linear-gradient(rgba(217,217,217,0) 0, rgba(114,114,114,.45) 34.135%, rgba(47,47,47,.95) 77.885%)`** を重ねて白文字を載せる（可視 7 要素）

**Event Card（上下分割）**
- **`border-radius: 16px 16px 0 0`（上）と `0 0 16px 16px`（下）** を積んで 1 枚のカードに見せる。各 8 要素
- 上段に `募集中` バッジ、下段に日時

---

## 5. Layout Principles

### Spacing Scale

| 値 | 実測件数 | 用途 |
|-------|------|------|
| **3px** | **70** | サービスタグ同士の gap（最多） |
| 8px | 20 | アイコンと文字 |
| 12px | 8 | カード内側 |
| **16px** | 12 | カード間（`/about/` では 8 要素で最多） |
| 24px | 3 | セクション内のブロック間 |
| 28px / 26px | 1 | 個別調整 |
| 76px / 36px / 210px | `/about/` のみ | 大見出しまわりの余白 |

### Container

- **`--width-site-content: 1280px`**（実測 5 要素で最多）
- **`--width-narrow-content: 992px`**（読み物の本文幅）
- ヘッダー高は **`--header-height-pc: 64px` / `--header-height-sp: 48px`**、上端からの浮き量は `--header-position-pc: 10px` / `--header-position-sp: 8px`（**ヘッダーが浮いたカプセル型**）
- スクロール位置の調整も `--scroll-margin-top-pc: calc(64px + 40px)` とトークン化

### Grid

- 実績は 2 カラム（581×353px のカード）。トップのみ先頭だけ 574px とわずかに狭い
- ソリューションはサービス 5 分類ごとの行にタグを横並べ（gap 3px）

### Gradient Surface（このサイト固有）

ヒーローと問い合わせボタンの面は、**ノイズの SVG ＋ 位置つき radial-gradient 4 枚**の重ね:

```css
background-image:
  url("data:image/svg+xml,…feTurbulence baseFrequency='0.65' numOctaves='3'…"),
  radial-gradient(circle at 5.10119% 45.574%,  #df1d16 0%, rgba(0,0,0,0) 137%),
  radial-gradient(circle at 58.3003% 101.672%, #df165c 0%, rgba(0,0,0,0) 70%),
  radial-gradient(circle at 102.885% 95.5489%, #f2a63a 0%, rgba(0,0,0,0) 46%),
  radial-gradient(circle at 101.658% 4.95993%, #f2a63a 0%, rgba(0,0,0,0) 119%);
```

- **位置と色を `--x-0` `--y-0` `--c-0` … の変数で持ち、JS が書き換えて動かす**（実測値の例: `--x-0: 94%` / `--y-0: 95%` / `--c-0: rgb(0, 209, 108)`）。止まった状態の数値をそのまま写すと**その瞬間の 1 コマ**になる
- **停止位置が 137% / 119% と 100% を超える**のは、円を枠外へはみ出させてグラデーションの端を見せないため。丸めずそのまま書く
- 1 枚目の `feTurbulence` のノイズがバンディング（帯状の縞）を消している。**ノイズを外すとグラデーションに縞が出る**

---

## 6. Depth & Elevation

| Level | Shadow | 実測件数 | 用途 |
|-------|--------|------|------|
| 0 | `none` | — | 既定。タグ・テキストリンクはフラット |
| **1** | **`0 2px 4px rgba(84, 86, 90, 0.08)`** | **トップ 110 / `/about/` 72** | **カード・ピル・ヘッダー。このサイトの影はこれ 1 種だけ** |

> **同じ影が 2 つの記法で並んでいる。** 70 要素が **`color(srgb 0.329412 0.337255 0.352941 / 0.08)`**（CSS Color Level 4）、40 要素が **`rgba(84, 86, 90, 0.08)`**。
> **`srgb 0.329412 0.337255 0.352941` は `rgb(84, 86, 90)` = `#54565a` = `--sys-schemes-on-surface-variant` と同じ色。** 計算経路が違うだけで見た目は同じ。新規実装では **`rgba(84, 86, 90, 0.08)` に統一してよい**。
> **影の色が黒ではなくニュートラルの `#54565a`。** `rgba(0,0,0,.08)` に丸めるとグレー地の上で濁る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **色・角丸・幅・z-index をすべて `--sys-schemes-*` のトークン経由で書く**（CSS に hex を直書きしない）
- **font-family は `var(--font-mixed)` の 1 本で通す。** 欧文を先頭、和文を 2 番目、メトリクス代替を 3 番目、`sans-serif` を最後
- **Web フォントはセルフホストする**（next/font 等）。`size-adjust` 付きのフォールバックを必ず併記して行送りを固定する
- **`letter-spacing: normal` を貫く**（実サイトは 5688 / 5689 要素）
- **読み物は `line-height: 1.70〜1.75`、UI は `1.50`** と 2 段に分ける
- **ウェイトは 500 を既定にする。** 400 は長文のステートメント、600 はセクション見出し、700 は英語の大見出しだけ
- 角丸は **8px（タグ）／16px（カード）／1000px（ピル）** の 3 つを主に使う
- 影は **`0 2px 4px rgba(84, 86, 90, 0.08)` の 1 種類だけ**
- サービスを色で分けるときは **枠線と文字色の両方に同じ色**を当て、**面は塗らない**

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 2 ページとも 0 要素。Noto Sans JP では効いてしまう）
- **`letter-spacing` を足さない**
- **和文に縦組みを足さない。** `vertical-rl` の 6 要素は `Scroll` の 1 語と SVG で、和文の縦組みではない
- **明朝体を使わない**（セリフ系の和文は 2 ページとも可視 0 要素）
- **`--sys-schemes-tba`（`#8dc122`）を使わない**（宣言はあるが 2 ページとも可視 0 要素）
- **`--sys-schemes-gradation-1` / `-2` でヒーローを塗らない。** 実装は `--c-0〜2` の 3 色＋位置で、この 2 色は使われていない
- **グラデーションから `feTurbulence` のノイズ層を外さない**（縞が出る）
- **影を黒（`rgba(0,0,0,.08)`）にしない**。`#54565a` の 8% を使う
- **`"Custom Helvetica"` という名前をそのまま書かない**（amana 独自の `@font-face` 名で、他サイトでは必ず外れる）
- **ページ背景を白にしない。** `body` は **`#eeeeee`**、その上に白いカードを置くのがこのサイトの構え

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測件数 | 説明 |
|------|-------|------|------|
| **Desktop** | **`(min-width: 768px)`** | **369** | **このサイトの唯一の境目** |
| **Mobile** | **`(max-width: 767px)`** | **237** | 〃 |
| Wide | `screen and (min-width: 1440px)` | 4 | ごく一部の調整 |
| Landscape | `(max-width: 767px) and (orientation: landscape)` | 3 | 横持ち対応 |
| Motion | `(prefers-reduced-motion: reduce)` | 3 | **アニメーションの停止に対応している** |

**ルートと body の実測（幅 → `font-size`）**

| 幅 | `html` | `body` | `h2` | `a` |
|---|---|---|---|---|
| 1920 / 1440 / 1200 / 992 / 834 / **768px** | **10px** | **16px** | 24px | 12px |
| **767px** / 680 / 480 / 375 / 320px | **10px** | **14px** | **18px** | 15px |

> **`html` は 10px から 1px も動かない（1920〜320px の 18 幅で実測）。** 流体も `clamp()` も使っていない。
> **切り替わるのは `body` と各要素だけで、境目は 768 / 767px の 1 箇所。** 本文 16 → 14px、見出し 24 → 18px、リンク 12 → 15px（**モバイルではリンクだけ大きくなる＝タップ領域の確保**）。

### タッチターゲット

- サービスタグは `padding: 7px 23px` ＋ 13px の文字で高さ約 31px。**44px を下回るのでモバイルでは高さを足すこと**
- ヘッダーは SP で 48px 高。リンクは 12 → 15px に上がる
- `募集中` バッジは `padding: 12px` で十分

### フォントサイズの調整

- **`rem` ではなく px で書かれている**（root 10px は `rem` を 1/10 スケールで扱うためのもので、実際のサイズ指定はほぼ px）
- **モバイルで縮むのは `body` 系の 16 → 14px と見出しの 24 → 18px。** タグの 13px / 12px は両方で同じ

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
--sys-schemes-background:        #eeeeee   /* ページ背景 */
--sys-schemes-surface:           #ffffff
--sys-schemes-on-background:     #000000
--sys-schemes-on-surface:        #333333
--sys-schemes-on-surface-variant:#54565a   /* リンク・影の色 */
--sys-schemes-outline:           #bbbbbd
--sys-schemes-brand:             #231815
--sys-schemes-inverse-background:#131313
--sys-schemes-caution:           #e81e17

service-strategy #8d5ea5 / content #e54aad / visual #f3a83b / process #007b49 / media #54c5d7

--sys-schemes-radius-xs 4px / sm 8px / md 12px / lg 16px / lg-inc 20px
                      / xl 24px / xl-inc 32px / 2xl 40px / 2xl-inc 48px / full 1000px
--width-site-content 1280px / --width-narrow-content 992px
--header-height-pc 64px / --header-height-sp 48px

Root: html { font-size: 62.5% }   /* 1rem = 10px・全幅固定 */
Body: 16px (≥768px) / 14px (≤767px)

Font: "Custom Helvetica", "Noto Sans JP", "Noto Sans JP Fallback", sans-serif
      （汎用に書くなら "Helvetica Neue", "Noto Sans JP", sans-serif）
Weight: 500 が既定 / 400 本文 / 600 見出し / 700 英語の大見出し
Line Height: 1.70〜1.75（読み物） / 1.50（UI）
Letter Spacing: normal（例外 1 要素のみ）
Shadow: 0 2px 4px rgba(84, 86, 90, 0.08)  ← 1 種類だけ
Breakpoint: 768px の 1 本
```

### プロンプト例

```
amana のデザインシステムに従って、サービス一覧のページを作成してください。
- 色・角丸・幅はすべて :root の --sys-schemes-* トークンで宣言し、CSS に hex を直書きしない
- html { font-size: 62.5% }、body は 16px（768px 以上）/ 14px（767px 以下）
- font-family は "Helvetica Neue", "Noto Sans JP", sans-serif の和欧二層（欧文が先頭、和文が 2 番目）
- ページ背景は #eeeeee、カードは #ffffff / border-radius 16px / box-shadow 0 2px 4px rgba(84,86,90,.08)
- 本文は weight 400 / line-height 1.75、UI は weight 500 / line-height 1.50
- letter-spacing は全要素 normal、font-feature-settings は書かない
- サービスタグは面を塗らず、1px solid と文字色に同じサービス色を当てる
  （戦略 #8d5ea5 / コンテンツ #e54aad / ビジュアル #f3a83b / プロセス #007b49 / メディア #54c5d7）
  border-radius 8px / padding 7px 23px / 13px weight 500、タグ同士の gap は 3px
- CTA は白地のピル（border-radius 1000px）、文字は #54565a
- コンテナは 1280px、読み物の本文幅は 992px
- ブレークポイントは 768px の 1 本だけにする
- 縦組みと明朝体は使わない
```
