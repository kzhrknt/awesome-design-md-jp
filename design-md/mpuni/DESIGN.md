# DESIGN.md — 三菱鉛筆（uni / MITSUBISHI PENCIL）

> 三菱鉛筆株式会社（https://www.mpuni.co.jp/）のデザイン仕様書。
> 1887 年創業。鉛筆「uni」、油性ボールペン「ジェットストリーム」、ゲルインクボールペン「ユニボール ワン」を擁する筆記具メーカー。
> 最大の特徴は、**角丸を一切使わない（`border-radius: 0`）矩形のデザインシステム**と、**11 色 × 2 段（`background` / `primary`）＝ 22 個の色トークンを CSS Custom Properties で持つ**こと。地は白 `#ffffff`、文字は純黒ではない `#282828`、ブランドの赤は `#df1b26`。
> 和文は **Noto Sans JP**、欧文ラベルは **Open Sans**、読み物の見出しだけ **Noto Serif JP** に切り替える 3 系統構成。
> 実サイトの computed style 実測（2026-08-16 取得。トップ＋商品情報ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **矩形と余白で組む「文具屋の几帳面さ」**。角丸・影・グラデーションを排し、1px / 2px の直線の罫と面色だけで階層を作る。装飾がない分、写真とタイポグラフィがそのまま情報になる
- **三菱鉛筆について**: 「すべての人は個性ある表現者であり、その違いこそが美しい。」をコンセプトに掲げる。**11 色のカラートークンは、色鉛筆の色数をそのままデザインシステムに移した設計**で、インタビュー記事のカード面色として 1 枚ずつ違う色が当たる
- **密度**: 中密度・カタログ型。ニュース 3 列 → コンセプト → インタビュー → 商品カテゴリと、白と極薄グレーの面を交互に積む
- **キーワード**: radius 0、ソフトブラック `#282828`、ブランドレッド `#df1b26`、11 色トークン、Noto Sans JP + Open Sans、和欧の 2 段見出し
- **特徴**:
  - **`border-radius` は 0 が原則**。丸いのはカルーセルのドット（`50%`）だけ。ボタン・バッジ・入力欄・カードすべて直角
  - **テキストに純黒 `#000000` を使わない**。基本は `#282828`（ソフトブラック）。純黒が出るのは記事カテゴリタグの枠線のみ
  - **見出しは「和文 + 欧文」の 2 段組み**。`span.jp`（Noto Sans JP 28px / 700）と `span.en`（Open Sans 16px / 400 / `#df1b26`）を縦に重ねて「ニュース／WHAT'S NEW」のように置く。**欧文側だけがブランドレッド**
  - **読み物の見出しだけ明朝**（`Noto Serif JP` 24px / 400）。UI はゴシック、コンテンツは明朝という切り分け
  - **`letter-spacing` は 0.05em を要所に効かせる**（22px→1.1px / 28px→1.4px / 14px→0.7px）。`body` 既定は `normal`
  - **`font-feature-settings` は全体で `normal`**（`palt` を使わない）
  - CTA は**面色を持たない**。`1px solid #282828` のアウトライン矩形に「もっとみる」「くわしくさがす」と置くのが主要 CTA。**赤は CTA ではなくバッジ・強調に使う**
  - カラートークンは **`--component-background-*`（淡）と `--component-primary-*`（濃）の 2 段** で、同じ色相を「面」と「文字・線」で使い分ける設計

---

## 2. Color Palette & Roles

> 実測値。地は白 `#ffffff`、テキストは `#282828`、面は `#f5f5f5`。ブランドレッドは `#df1b26`。
> それとは別に **11 色 × 2 段のカラートークン**が CSS Custom Properties として定義されている（記事カード・カテゴリの面色に使う）。

### Brand（ブランド）

- **Brand Red** (`#df1b26`, rgb 223,27,38): uni のロゴ色。見出しの欧文サブ（`WHAT'S NEW` 等）、「NEW」バッジの面、「プレスリリース」バッジの枠と文字、カルーセルの現在位置ドット。**面としては小さく、点で強く使う**
- **Ink** (`#282828`, rgb 40,40,40): 基本テキスト色。**純黒ではない**。「商品」バッジの面色、アウトライン CTA の枠線でもある

### Component Tokens（11 色 × 2 段）

CSS Custom Properties として定義。`background` は淡い面色、`primary` は同色相の濃い文字・線色。

| 色相 | `--component-background-*` | `--component-primary-*` |
|------|---------------------------|-------------------------|
| yellow | `#ffd72e` | `#ffba00` |
| orange | `#f4a556` | `#f77a1e` |
| red | `#e5838f` | `#c30018` |
| pink | `#e38dcc` | `#d60f82` |
| purple | `#9389ed` | `#785ed1` |
| blue | `#80a7ff` | `#415efd` |
| bluegreen | `#52c196` | `#088d6f` |
| green | `#8ed878` | `#68c100` |
| brown | `#c1986f` | `#966200` |
| khaki | `#d5c441` | `#b7a200` |
| gray | `#919fb2` | `#6f7680` |

- インタビュー記事のカードには `--component-primary-yellow` `#ffba00`、`--component-primary-orange` `#f77a1e`、`--component-primary-purple` `#785ed1` などが 1 枚ずつ違う色で当たる
- **色鉛筆の色数をデザイントークンに写した設計**。ブランドカラー 1 色で塗り固めない

### Neutral（面・罫・文字）

- **Background** (`#ffffff`): ページ地色
- **Ink** (`#282828`): 本文・見出し・ナビの基本色
- **Gray** (`#999999`, rgb 153,153,153): 商品カテゴリタグの面色（白文字）、カルーセルの非活性ドット
- **Surface** (`#f5f5f5`): フッターの面色、ヘッダー右上ユーティリティリンク（ENGLISH / お問い合わせ）の面、入力欄の枠色
- **Beige** (`#eae5df`, rgb 234,229,223): コンセプト（「10 億人の表現者」）セクションの面色。白地に温度を足す唯一のニュートラル
- **Border Light** (`#f1f2f3`): ブランドチップ（ジェットストリーム等）の枠
- **Border** (`#dbdbdb`): フッターのリンクボタンの枠
- **Overlay** (`rgba(40,40,40,0.25)` / `rgba(40,40,40,0.3)`): 商品カテゴリ画像の上に敷くスクリム
- **Header Shadow** (`rgba(40,40,40,0.1)`): ヘッダー下に落ちる唯一の影

### Semantic（意味的な色）

- **Info / Notice**: ブランドレッド `#df1b26`（「プレスリリース」「NEW」）
- **Danger／Error**: `--component-primary-red` `#c30018` を使う（ブランドレッドより深い赤で、通知と区別する）
- **Success**: `--component-primary-bluegreen` `#088d6f`
- **Warning**: `--component-primary-orange` `#f77a1e`

---

## 3. Typography Rules

> **和文 Noto Sans JP／欧文 Open Sans／読み物見出し Noto Serif JP** の 3 系統。`letter-spacing: 0.05em` を見出しと小文字に効かせ、`palt` は使わない。**見出しは和文と欧文を 2 段に重ね、欧文側だけをブランドレッドにする**のが最大の特徴。

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP**。本文・見出し・ナビ・ボタンすべての既定。ウェイトは **400 / 500 / 600 / 700** の 4 段
- **明朝体**: **Noto Serif JP**。**読み物（インタビュー記事）の見出しにのみ**使う（24px / 400 / lh 1.3）。UI には一切使わない

### 3.2 欧文フォント

- **サンセリフ**: **Open Sans**。`"Open Sans", "Noto Sans JP", sans-serif` の順で指定し、**欧文ラベル・数字・英字の見出しサブ**に使う（`WHAT'S NEW` `COMPANY INFO` `NEW` `COPYRIGHT MITSUBISHI PENCIL COMPANY, LIMITED`）
- 和文本文には Open Sans を先頭に置かない。**欧文が主体のテキストだけ**スタックを切り替える
- カルーセルの制御 UI は `Arial`（ライブラリ既定）のまま。デザイン上の意図ではない

### 3.3 font-family 指定

```css
/* 本文・見出し・UI（和文主体） */
font-family: "Noto Sans JP", sans-serif;

/* 欧文ラベル・数字・英字見出し */
font-family: "Open Sans", "Noto Sans JP", sans-serif;

/* 読み物の見出し（明朝） */
font-family: "Noto Serif JP", serif;

/* 全体 */
font-feature-settings: normal;   /* palt は使わない */
```

**フォールバックの考え方**:
- 和文主体のテキストは **Noto Sans JP 単独 + `sans-serif`**。和文フォントを先頭に置く
- **欧文が主体のときだけ Open Sans を先頭**に置き、その後ろに Noto Sans JP を残して和文混じりに備える
- 明朝は読み物見出し専用。`serif` でフォールバックする

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Head (JP) | Noto Sans JP | 28px | 700 | 1.0 (28px) | 0.05em (1.4px) | `span.jp`「ニュース」 |
| Section Head (EN) | **Open Sans** | 16px | 400 | 1.0 (16px) | normal | `span.en`「WHAT'S NEW」**色 `#df1b26`** |
| Section Head 2 (JP) | Noto Sans JP | 24px | 700 | 1.7 (41px) | 0.05em (1.2px) | `span.jp`「三菱鉛筆 企業情報」 |
| Section Head 2 (EN) | **Open Sans** | 16px | 500 | 1.375 (22px) | normal | `span.en`「COMPANY INFO」 |
| Sub Head | Noto Sans JP | 22px | 700 | 1.8 (40px) | 0.05em (1.1px) | `h3.ttl02`「ブランド・シリーズでさがす」 |
| Article Title | **Noto Serif JP** | 24px | 400 | 1.3 (31.2px) | normal | `h3.post-title`（白文字・画像上） |
| Label Head | Noto Sans JP | 14px | 700 | 1.0 (14px) | normal | `h2.ttl01` |
| Lead | Noto Sans JP | 15px | 500 | **2.53 (38px)** | normal | `p.blog-lead` コンセプト文。**極端に開いた行間** |
| Body | Noto Sans JP | 14px | 500 | 1.71 (24px) | 0.05em (0.7px) | `p.text` 本文 |
| Body (base) | Noto Sans JP | 16px | 400 | 1.0 (16px) | normal | `body` 既定（リセット。実体は要素側で指定） |
| Nav | Noto Sans JP | 14px | 500 | 1.0–1.35 | 0.05em (0.7px) | グローバルナビ |
| Nav (sub) | Noto Sans JP | 13px | 500 | 1.0 (13px) | normal | ドロップダウン下層 |
| Tag / Badge | Noto Sans JP | 14px | 500 | 1.0 (14px) | 0.05em (0.7px) | カテゴリタグ |
| Category Tag (EN) | Noto Sans JP | 16px | 700 | 1.3 (20.8px) | normal | 「Interview」枠付きタグ |
| Caption | Noto Sans JP | 16px | 500 | 1.4 (22.4px) | normal | インタビュイー名 |
| Utility | Noto Sans JP | 12px | 500 | 1.0 (12px) | 0.05em (0.6px) | ENGLISH / お問い合わせ |
| Footer Small | **Open Sans** | 12px | 400 | 1.0 (12px) | 0.05em (0.6px) | 著作権表記（白文字） |
| Micro | Noto Sans JP | 10px | 500 | 1.0 (10px) | 0.05em (0.5px) | アイコン下のラベル「検索」 |

- **`line-height: 1.0`（= font-size と同値）が多用される**。これは「1 行で置くラベル」の高さを字面ぴったりに揃えるための指定で、複数行になる本文には必ず 1.7 以上を当てる
- **見出しの `font-weight` は 700**、本文・ナビ・ラベルは **500**。400 は `body` 既定と欧文ラベルにだけ残る

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.71**（14px→24px）。読み物のリード文は **2.53**（15px→38px）まで開く
- **見出しの行間**: 大見出しは **1.0**（28px→28px）と字面ぴったり、中見出しは **1.7〜1.8**（22px→40px / 24px→41px）
- **字間 (letter-spacing)**: 見出し・ナビ・ラベルに **0.05em**（22px→1.1px、28px→1.4px、14px→0.7px、12px→0.6px、10px→0.5px）。`body` 既定と記事本文は `normal`
- **palt は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- **1 行のラベルは `line-height: 1`、折り返す本文は 1.7 以上**、という二分法で組む。中間の値を使わない
- 字間 0.05em は**サイズが変わっても比率で維持する**（実測は px 指定だが常に font-size × 0.05）
- リード文の行間 2.5 は「読ませる」のではなく「間を見せる」ための設定。**通常の本文には使わない**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 商品名（「uniball ZENTO（ユニボール ゼント）」等）は括弧を含むため、`word-break: break-all` にすると括弧が行頭に来る。**`normal` を保つこと**

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を掛けない */
```

- **`palt` を使わない**。Noto Sans JP の等幅の字面のまま組み、詰めではなく `letter-spacing: 0.05em` で開く方向に調整する
- 和文（Noto Sans JP）と欧文（Open Sans）を**別スタックで切り替える**設計なので、和欧混植の詰めを `kern` に頼る必要がない

### 3.8 縦書き

- 該当なし。UI・記事とも横組み
- コンセプト面の「10 億人の表現者」は 1 文字ずつ枠で囲んだ**原稿用紙状のビジュアル**で、縦書きではない

---

## 4. Component Stylings

> **`border-radius` は 0 が原則**。丸いのはカルーセルのドット（`50%`）だけ。

### Buttons

**Primary（アウトライン矩形）— 主要 CTA**
- Background: `transparent`
- Text: `#282828`
- Border: `1px solid #282828`
- Border Radius: `0`
- Font: Noto Sans JP / 14px / weight 500
- 例: 「もっとみる」「くわしくさがす」

**Primary（幅広版・アイコン付き）**
- Padding: `16px 35px 16px 16px`（右側は矢印アイコン分を確保）
- ほかは Primary と同じ
- 例: 「複数条件で詳しく商品を検索」

**Secondary（白地・薄枠）— リンクボタン**
- Background: `#ffffff`
- Text: `#282828`
- Border: `1px solid #dbdbdb`
- Border Radius: `0`
- Padding: `10px 40px 10px 15px`
- Font: 14px / weight 400
- 例: 「三菱鉛筆オンラインショップ」「退職者（アルムナイ）ネットワーク登録」

**Brand Chip（ブランド・シリーズ選択）**
- Background: `#ffffff`
- Text: `#282828`
- Border: `1px solid #f1f2f3`
- Border Radius: `0`
- Padding: `10px`
- Font: 14px / weight 500
- 例: 「ジェットストリーム」「ユニボール ワン」

**Utility Link（ヘッダー右上）**
- Background: `#f5f5f5`
- Text: `#282828`
- Padding: `20px 0`
- Font: 12px / weight 500 / ls 0.05em
- 例: 「ENGLISH」「お問い合わせ」

### Badges

**News Type — 商品（塗り）**
- Background: `#282828` / Text: `#ffffff`
- Border: `2px solid #282828` / Radius: `0`
- Padding: `4px 4px 5px` / Font: 14px / weight 500

**News Type — プレスリリース（枠）**
- Background: `transparent` / Text: `#df1b26`
- Border: `2px solid #df1b26` / Radius: `0`
- Padding: `4px 4px 5px` / Font: 14px / weight 500
- **塗りと枠のペアで種別を出し分ける**。枠側だけがブランドレッド

**NEW（強調）**
- Background: `#df1b26` / Text: `#ffffff`
- Radius: `0` / Padding: `4px 9px 5px`
- Font: **Open Sans** / 16px / weight 600

**Category Tag（記事カテゴリ）**
- Background: `transparent` / Text: `#000000`
- Border: `1px solid #000000` / Radius: `0`
- Padding: `0 10px` / Font: 16px / weight 700
- 例: 「Interview」

**Product Category（画像上のラベル）**
- Background: `#999999` / Text: `#ffffff`
- Radius: `0` / Padding: `9px`
- Font: 14px / weight 500 / ls 0.05em
- 例: 「ボールペン」「多機能ペン・カスタマイズペン」「鉛筆・色鉛筆」

### Inputs

- Background: `#ffffff`
- Border: `2px solid #f5f5f5`（**2px の太めの枠を薄いグレーで置く**）
- Border (focus): `2px solid #282828`
- Border Radius: `0`
- Padding: `12px 40px 12px 18px`（右側は検索アイコン分）
- Font: Noto Sans JP / 14px / weight 400
- Text: `#282828` / Placeholder: `#999999`

### Cards

- Background: `#ffffff`
- Border: なし（画像と余白で区切る）／必要なら `1px solid #f1f2f3`
- Border Radius: `0`
- Shadow: なし
- 記事カードは**画像 → 日付 + 種別バッジ → タイトル → 抜粋**の順で積む
- インタビューカードは `--component-primary-*` の 11 色から 1 色を面色に取る

### Pagination（カルーセル）

- 形状: `border-radius: 50%` の円（**サイト内で唯一の丸**）
- Active: `#df1b26` / Inactive: `#999999`

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 9px |
| M | 16px |
| L | 22px |
| XL | 45px |
| XXL | 80px |

- パディングに `4px 4px 5px` `10px 40px 10px 15px` のような**上下非対称の値**が現れる。和文の字面（ベースラインが視覚的中心より下）を補正するための実装で、**下側を 1px 多く取る**のが基本

### Container

- Max Width: **1168px**（CSS 変数 `--conteint-width` として定義）
- Padding (horizontal): 16〜32px

### Grid

- Columns: ニュース・商品カードは 3 カラム、インタビューは 3 カラム、フッターのサイトマップは 4 カラム
- Gutter: 16〜24px
- KV（カルーセル）のみ全幅ブリード。以下のセクションは 1168px のコンテナに収める

---

## 6. Depth & Elevation

**ほぼフラット。影はヘッダーの 1 つだけ。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。カード・ボタン・バッジすべて |
| 1 | `0 4px 16px rgba(40,40,40,0.1)` | **固定ヘッダーのみ**。スクロール時にコンテンツと分離する |

- 奥行きは **白 `#ffffff` × 極薄グレー `#f5f5f5` × ベージュ `#eae5df`** の面のコントラストで作る
- 画像の上に文字を置くときは影ではなく `rgba(40,40,40,0.25)` 〜 `rgba(40,40,40,0.3)` のスクリムを敷く

---

## 7. Do's and Don'ts

### Do（推奨）

- **`border-radius: 0` を貫く**。丸めてよいのはカルーセルのドット（`50%`）だけ
- テキストは `#282828`（ソフトブラック）を基本にする
- **見出しは和文 + 欧文の 2 段**に組み、欧文サブだけを `#df1b26` にする
- 読み物の見出しには `Noto Serif JP` を使い、UI との差を作る
- 欧文が主体のラベルは `"Open Sans", "Noto Sans JP", sans-serif` にスタックを切り替える
- 1 行ラベルは `line-height: 1`、折り返す本文は 1.71 以上にする
- `letter-spacing: 0.05em` を見出し・ナビ・小文字に効かせる
- カテゴリや記事の面色には **11 色トークン**から選ぶ（1 色で塗り固めない）
- ニュース種別は**塗り（`#282828`）と枠（`#df1b26`）のペア**で出し分ける

### Don't（禁止）

- **角丸を使わない**（`border-radius: 4px` すら使わない。矩形がこのブランドの骨格）
- **影を落とさない**（ヘッダーの `0 4px 16px rgba(40,40,40,.1)` を除く）
- テキストに純黒 `#000000` を使わない（カテゴリタグの枠線のみ例外）
- **ブランドレッド `#df1b26` を CTA の面色にしない**。CTA はアウトライン、赤はバッジと欧文見出しに使う
- `palt` を掛けない（`font-feature-settings: normal` を保つ）
- 明朝体を UI（ナビ・ボタン・ラベル）に使わない
- リード文の行間 2.53 を通常の本文に流用しない
- 11 色トークンをグラデーションにして使わない（ベタ塗りで 1 枚 1 色）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。カードは縦積み、グローバルナビはドロワー |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 3 カラム＋最大 1168px コンテナ |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。14px のアウトライン CTA は padding で高さを確保する
- ヘッダーのユーティリティリンクは `padding: 20px 0` で 52px 相当の高さを取っている

### フォントサイズの調整

- 本文 14px は据え置き（モバイルでも下げない）
- Section Head 28px → 20〜22px、Sub Head 22px → 18px 程度に縮小。**欧文サブ 16px は据え置き**にして 2 段組みの対比を保つ
- 行間・字間（1.71 / 0.05em）はモバイルでも維持する
- リード文の行間 2.53 はモバイルでは 2.0 程度まで詰めてよい

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff
Text:           #282828   （純黒を使わない）
Brand Red:      #df1b26   （欧文見出し・NEW バッジ・現在位置ドット）
Surface:        #f5f5f5   （フッター・ユーティリティ面）
Beige:          #eae5df   （コンセプトセクションの面）
Gray:           #999999   （画像上のカテゴリラベル・非活性ドット）
Border:         #dbdbdb（ボタン） / #f1f2f3（チップ） / #f5f5f5（入力欄・2px）
Tokens:         --component-background-{yellow…gray} 11色（淡）
                --component-primary-{yellow…gray}   11色（濃）
JP Font:        "Noto Sans JP", sans-serif
EN Font:        "Open Sans", "Noto Sans JP", sans-serif
Serif Font:     "Noto Serif JP", serif（読み物見出しのみ）
Body Size:      14px / weight 500 / lh 1.71（24px）
Heading:        28px / weight 700 / lh 1.0 / ls 0.05em（+ 欧文サブ 16px #df1b26）
Letter Spacing: 0.05em（見出し・ナビ・小文字） / normal（本文既定）
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         0（カルーセルのドットのみ 50%）
Shadow:         なし（ヘッダーのみ 0 4px 16px rgba(40,40,40,.1)）
Container:      1168px（--conteint-width）
```

### プロンプト例

```
三菱鉛筆（uni）のデザインシステムに従って、商品一覧ページを作成してください。
- 和文は "Noto Sans JP", sans-serif、欧文ラベルは "Open Sans", "Noto Sans JP", sans-serif
- 記事の見出しだけ "Noto Serif JP", serif に切り替える
- border-radius は 0 で統一する（カルーセルのドットだけ 50%）
- 影は使わない。固定ヘッダーにのみ 0 4px 16px rgba(40,40,40,.1) を落とす
- テキストは #282828、地は #ffffff、フッターとユーティリティ面は #f5f5f5
- セクション見出しは「和文 28px/700/lh 1.0/ls 0.05em」＋「欧文 Open Sans 16px/400/#df1b26」の 2 段
- 本文は 14px / weight 500 / line-height 1.71 / letter-spacing 0.05em
- 主要 CTA は面色なし・1px solid #282828・radius 0 のアウトライン矩形（「もっとみる」）
- ニュース種別バッジは「商品＝#282828 塗り・白文字」「プレスリリース＝#df1b26 の 2px 枠・赤文字」
- 「NEW」バッジは #df1b26 の面に白文字、Open Sans 16px/600
- 画像上のカテゴリラベルは #999999 の面に白文字（padding 9px）
- カテゴリカードの面色は --component-primary-* の 11 色から 1 枚ずつ違う色を当てる
- font-feature-settings は normal（palt を掛けない）
- コンテナ幅は 1168px
```
