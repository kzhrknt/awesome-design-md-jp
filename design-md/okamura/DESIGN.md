# DESIGN.md — オカムラ (Okamura)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 対象サイト: https://www.okamura.co.jp/
> 株式会社オカムラはオフィス家具・店舗什器・物流システムを手がける総合メーカー。
> 実測はコーポレートトップ（https://www.okamura.co.jp/）と製品情報一覧（https://www.okamura.co.jp/product/）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 大企業のコーポレートサイトらしい情報量を、無彩色のグレースケールと角丸ゼロの矩形だけで整理する。色数を極端に絞り、ブランドレッド `#e60039` はロゴとホバーの一点にしか使わない
- **密度**: 高密度。グローバルヘッダー＋メガメニュー＋事業領域タイル＋お問い合わせブロック＋巨大フッターという、日本の大手メーカーの標準構成
- **キーワード**: 実直 / 中庸 / ユニバーサルデザイン / 高情報密度 / 無彩色
- **形状言語**: **角丸ゼロ（`border-radius: 0`）が原則**。ボタン・カード・写真タイルはすべて直角。例外は (a) 検索インプットと絞り込みタグの `50px` ピル、(b) メガメニュー内アイテムの `10px`（`--item-corner-radius`）の2系統のみ
- **書体の性格**: 和文・欧文とも **UD新ゴ（UD Shin Go / モリサワ）** 一本で通す。UD書体特有の判別性の高い字形とふところの広さが、そのままトーンになっている。ウェイトは L / R / M / DB / B / H の6段が変数として用意され、実際は R(400) / M(500) / B(700) の3段で階層を作る
- **面の使い分け**: トップページはページ背景が白 `#ffffff`。製品情報など下層ページはコンテンツ帯が `#ededeb`（`--bg-light-gray`）のライトグレーで、その上に白いカードが乗る。フッターも同じ `#ededeb`

---

## 2. Color Palette & Roles

<!-- customProperties（46 変数）と computed style / interactive 実測に基づく。UI 色はほぼ完全に無彩色で、彩度色はブランドレッド一点 -->

### Base（下地）

- **Background (Top)** (`#ffffff`): トップページのページ背景。純白。`pageBackground` の 12 点サンプルすべてが白
- **Background (Content)** (`#ededeb`): 下層ページのコンテンツ帯とフッターの下地（`--bg-light-gray` / `--footer-bg-color`）。わずかに緑みを含むウォームグレー。製品情報ページでは上部 viewport の面積 705,330px² を占める支配色
- **Surface Light** (`#f5f5f3`): 事業領域タイル・お役立ちブロックの面色（`--okm-light-gray`）
- **Surface Tight** (`#f5f5f5`): フォーム欄・枠内の面（`--frame-tight-gray` / `--form-gray`）

### Brand（ブランド）

- **Okamura Red** (`#e60039`): コーポレートカラー。ロゴのダイヤモンドマーク（`--header-logo-color`）とヘッダーリンクのホバー（`--header-hover-color`）にだけ使う（`--okm-red`）。**面として広く塗らない**のがこのサイトの流儀

### CTA Gray（お問い合わせブロックの階調グレー）

写真の上に重ねる半透明グレーのオーバーレイ。並べたときに階調が付くよう、微妙に違う値を意図的に使い分けている。

- **CTA Gray 1** (`#515151`): 「移転・改装など空間づくりのご相談」
- **CTA Gray 2** (`#616161`): 「製品の使い方・その他お問い合わせ」
- **CTA Gray 3** (`#666666`): 「オカムラのブランドページへ」等のバー型 CTA
- **CTA Gray 4** (`#717171`): 「資料ダウンロード」

### Text（文字色）

- **Text Primary** (`#333333`): 本文・見出し・ナビ・フッターすべての標準文字色（`--okm-text-color` / `--header-text-color` / `--footer-text-color` / `--header-footer-link-color`）。**純黒は使わない**
- **Ink** (`#111111`): 最も濃い文字用の予備トークン（`--color-blk`）
- **Text on Dark** (`#ffffff`): グレーオーバーレイ・ヒーロー上のヘッダーに載る文字（`--header-default-color`）
- **Footer Logo** (`#000000`): フッターロゴのみ黒（`--footer-logo-color`）
- **Muted** (`#666666`): フォームの補助テキスト・プレースホルダ（`--form-dark-gray`）

### Line（罫）

- **Border Default** (`#dddddd`): ヘッダー・フッターの区切り線、絞り込みタグの枠（`--header-footer-border-color`）
- **Border Button** (`#999999`): アウトラインボタンの枠。罫を一段濃くしてボタンだと分からせる
- **Border Card** (`#cccccc`): 製品カード・リンクタイルの枠
- **Border CTA** (`#e5e5e5`): CTA ブロック内の薄い仕切り（`--cta_border_color`）
- **Border Input** (`#d1d1d1`): 検索インプットの枠

### Semantic（意味的な色）

- **Error Background** (`#fffafb`): フォームエラー行の背景（`--form-err-pink`）。ごく淡いピンクで面を染め、赤文字ではなく**面**でエラーを示す
- **Error Text** (`#e60039`): エラー文言はブランドレッドを流用する

### Sub / Search UI（副次的な色）

- **Icon Slate** (`#27455c`): アイコン・図版内で使われる濃紺グレー
- **Search Accent** (`#3860be`) / **Search Highlight** (`#cddcf2`): サイト内検索ウィジェットのフィルタ UI。ブランドの配色体系ではないので、新規 UI に転用しない

### 色に関する設計思想

- 文字は `#333`、罫は `#ddd`〜`#999`、面は白と `#ededeb` / `#f5f5f3`。**この5色だけでほぼ全ページが成立する**
- ブランドレッド `#e60039` は「ロゴ」と「ホバー」の2用途に封印されている。CTA を赤で塗らない
- 強調は色ではなく **グレーの塗り面（`#515151`〜`#717171`）と写真** で行う

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **UD新ゴ（UD Shin Go, モリサワ）**。TypeSquare（Web フォント配信）経由で読み込まれる。全ページ・全要素がこの1書体
- ウェイトは CSS 変数として6段が定義されている:

| 変数 | 値 | 用途 |
|------|----|------|
| `--okm-shin-go-l` | `"UD Shin Go Light", "UDShinGoPro-Light", sans-serif` | （予備） |
| `--okm-shin-go-r` | `"UD Shin Go Regular", "UDShinGoPro-Regular", sans-serif` | 本文・ナビ・ボタン（既定） |
| `--okm-shin-go-m` | `"UD Shin Go Medium", "UDShinGoPro-Medium", sans-serif` | カード見出し・メニューラベル |
| `--okm-shin-go-db` | `"UD Shin Go DemiBold", "UDShinGoPro-DeBold", sans-serif` | （予備） |
| `--okm-shin-go-b` | `"UD Shin Go Bold", "UDShinGoPro-Bold", sans-serif` | 見出し |
| `--okm-shin-go-h` | `"UD Shin Go Heavy", "UDShinGoPro-Heavy", sans-serif` | （予備） |

- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ（既定）**: UD新ゴの Latin グリフをそのまま使う。和欧で書体を分けない
- **Slate**: メガメニューの英字ラベル（`SOLUTION` / `PRODUCT` 等）にだけ `Slate, sans-serif` を指定（Monotype のヒューマニストサンセリフ）
- **OkamuraSans**: 自社カスタム欧文。`--OkamuraSans-r` = `"OkamuraSansRegular", "Noto Sans JP", sans-serif` / `--OkamuraSans-b` = `"OkamuraSansBold", ...`。ブランドムービー周辺のラベル等、限定的に使う
- **セリフ / 等幅**: 使用しない

> **代替フォントの注記**: UD新ゴは TypeSquare のドメインライセンスのためローカル・preview.html では表示できない。
> - UD新ゴ → **BIZ UDPGothic**（Google Fonts）。**同じモリサワの UD 書体ファミリー**で、判別性重視の字形・広いふところという性格が最も近い。ただし Google Fonts 版は 400 / 700 の2ウェイトのみで、Medium(500) の階調は再現できない
> - Slate → **Source Sans 3**（オープンアパーチャのヒューマニストサンセリフ）
> - OkamuraSans → 代替なし。`Noto Sans JP` にフォールバックさせる（サイト自身の変数と同じ扱い）

### 3.3 font-family 指定

```css
/* body 以下すべての既定（--okm-shin-go-r） */
font-family: "UD Shin Go Regular", "UDShinGoPro-Regular", sans-serif;

/* 中太（カード見出し・メニューラベル） */
font-family: "UD Shin Go Medium", "UDShinGoPro-Medium", sans-serif;

/* 見出し */
font-family: "UD Shin Go Bold", "UDShinGoPro-Bold", sans-serif;

/* メガメニューの英字ラベルのみ */
font-family: Slate, sans-serif;
```

**フォールバックの考え方**:
- **和文書体1本主義**。欧文を先頭に置かず、UD新ゴの Latin グリフで欧文も拾う
- ウェイトごとに別ファミリー名を指定する（`UD Shin Go Regular` / `Medium` / `Bold`）モリサワ流の指定。`font-weight` と併用されるため、数値ウェイトだけに頼らない
- OS フォントへのフォールバックは `sans-serif` のみと素っ気ない。Web フォントの読み込み前提の設計

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title (h1) | UD Shin Go | 24px | 700 | 1.8 | normal | 下層ページ見出し（`.okm--style--h1`） |
| Top Section (h2) | UD Shin Go | 30px | 700 | **0.96** | normal | トップの大見出し。行間を詰めて重心を作る |
| Section (h2) | UD Shin Go | 24px | 500 | 1.8 | normal | 下層セクション見出し（`.okm--style--h2`） |
| Sub Heading (h3) | UD Shin Go | 20px | 700 | 1.44 | normal | 事業領域タイル見出し |
| Feature (h3) | UD Shin Go | 24px | 700 | 1.2 | normal | 特集ブロック見出し |
| Card Title (h3) | UD Shin Go Medium | 16px | 700 | 1.8 | normal | 製品カード見出し |
| CTA Heading (h2) | UD Shin Go | 20–24px | 700 | 1.17–1.4 | normal | グレー面に白抜き |
| Global Nav | UD Shin Go | 14px | 400 | 1.0 | **0.166em** | ナビ。極端に広い字送り |
| Header Utility | UD Shin Go | 12px | 400 | 2.83 | 0.147em | 「検索」「お問い合わせ」等 |
| Menu Title (JP) | UD Shin Go | 24px | 400 | 1.2 | 0.053em | メガメニュー見出し |
| Menu Title (EN) | Slate | 14px | 400 | 2.06 | 0.126em | `SOLUTION` 等の英字ラベル |
| Menu Label | UD Shin Go Medium | 16px | 700 | 1.8 | 0.04em | メニュー項目名 |
| Body | UD Shin Go | 16px | 400 | **1.8** | normal | 本文（body 既定） |
| Body Small | UD Shin Go | 14px | 400 | 2.06 | 0〜0.046em | 説明文・リード |
| Item Name | UD Shin Go | 12.48px | 400 | 1.6 | normal | メニュー内の製品名 |
| Button Label | UD Shin Go | 12px / 15px | 400 | 1.0 / 1.92 | normal | アウトラインボタン |
| Breadcrumb | UD Shin Go | 12px | 400 | 1.0 | normal | パンくず |
| Caption | UD Shin Go | 11px | 400 | 1.2 | 0.058em | 補足ラベル |

### 3.5 行間・字間

- **本文の行間 (line-height)**: `1.8`（16px 本文で 28.8px）。日本語コーポレートサイトとして標準的にゆったり。下層見出しも `43.2px / 24px = 1.8` で**基準の 1.8 がサイト全体を貫く**
- **例外**: トップの大見出し（30px）だけ `28.8px / 30px = 0.96` と行間を切り詰め、塊としての強さを出している
- **本文の字間 (letter-spacing)**: `normal`。本文は字間をいじらない
- **ナビ・英字ラベルの字間**: グローバルナビ `2.32px / 14px = 0.166em`、ヘッダーユーティリティ `1.76px / 12px = 0.147em`、Slate の英字ラベル `1.76px / 14px = 0.126em`。**ナビゲーション類だけを極端に開く**のがこのサイトの特徴的な癖
- **メニュー内テキストの字間**: `0.64px / 16px = 0.04em` 程度の控えめな値

**ガイドライン**:
- 本文は `letter-spacing: normal` / `line-height: 1.8` を守る
- ナビ・カテゴリラベルは `0.13〜0.17em` と大胆に開く。ここを詰めると別サイトの見た目になる

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 製品名は `Flotte【フローテ】` のように欧文名＋隅付き括弧のカナ読みで並べる。括弧の前後で折り返さない

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";  /* body に指定 → サイト全体に継承 */
```

- **`palt`（プロポーショナル字詰め）は body でグローバルに ON**。UD新ゴのプロポーショナルメトリクスで和文が自動的に詰まる
- ただし `letter-spacing` は本文では足さない。palt で詰めた上でナビだけ大きく開く、という二段構えの設計
- 例外的に `font-feature-settings: normal` になっている箇所がある（トップの `.brand-movie__heading-text`、サードパーティ製 UI）。**新規実装では body 継承の `"palt"` を守る**

### 3.8 縦書き

該当なし（横書きのみ）。

---

## 4. Component Stylings

### Buttons

**角丸ゼロの白地アウトライン**が主役。塗りボタンはグレーのブロック型 CTA として現れる。

**Primary Outline（一覧・詳細へ / `.okm--btn--middle--normal`）**
- Background: `#ffffff`
- Text: `#333333`
- Border: `1px solid #999999`
- Border Radius: `0px`
- Padding: `25px 40px 25px 30px`（右に矢印アイコン用の余白を確保するため左右非対称）
- Font: 15px / weight 400 / palt
- 例: 「ニュースリリース一覧」

**Secondary Outline（小 / `.okm--style--simple--btn`）**
- Background: `#ffffff`
- Text: `#333333`
- Border: `1px solid #999999`
- Border Radius: `0px`
- Padding: `14px 45px`
- Font: 12px / weight 400 / line-height 1.0
- 例: 「一覧を見る」「オフィス」

**Bar CTA（グレー塗り・全幅バー / `.brand-movie__link-anchor`）**
- Background: `#666666`
- Label: 10px / weight 700 / `#ffffff`（`"Noto Sans JP"` 指定。ここだけ書体が違う）
- Border Radius: `0px`
- Padding: `0 13px`（高さは行送りで確保）／右端に矢印アイコン
- 例: 「オカムラのブランドページへ」

**Block CTA（写真＋グレーオーバーレイ）**
- Background: `#515151` / `#616161` / `#717171`（並べたときの階調用に使い分け）
- 見出し: 20–24px / weight 700 / `#ffffff`
- Border Radius: `0px`
- 例: 「移転・改装など空間づくりのご相談」「資料ダウンロード」

**Filter Tag（絞り込みピル）**
- Background: `#ffffff`
- Text: `#333333`
- Border: `1px solid #dddddd`
- Border Radius: `50px`（**このサイトで角丸を使う数少ない例外**）
- Padding: `9px 13px`
- Font: 12px / weight 400 / line-height 1.4 / palt
- 例: 「椅子」「シルフィー」「デスク」

### Inputs

- Background: `#ffffff`
- Border: `1px solid #d1d1d1`
- Border Radius: `50px`（検索インプットはピル。フォーム内の入力欄は `0px`）
- Padding: `6px 35px 6px 15px`（右に検索アイコン分の余白）
- Font Size: 12.8px（検索）／14–16px（フォーム）
- Placeholder / 補助テキスト: `#666666`（`--form-dark-gray`）
- フォーム欄の面: `#f5f5f5`（`--form-gray`）
- エラー行の背景: `#fffafb`（`--form-err-pink`）。エラー文字は `#e60039`

### Cards

- Background: `#ffffff`（下地が `#ededeb` なので白いだけで浮く）
- Border: `1px solid #cccccc`
- Border Radius: `0px`
- Shadow: 通常時なし（`0 0 0 0 rgba(0,0,0,0.2)` を仕込んでおき）、**hover で `0 0 10px rgba(0,0,0,0.2)`（`--cta-shadow`）へトランジション**する
- 構成: 大判の製品写真＋日本語キャッチ＋欧文製品名＋【カナ読み】
- 例外: メガメニュー内のアイテムのみ `border-radius: 10px`（`--item-corner-radius`）。ヒーロー内のテキストカードは `border-radius: 0 10px 0 0` と一角だけ落とす

### Header

- Background: `#ffffff`（`--header-bg-color`）。トップページのヒーロー上では透過し、文字色が `#ffffff`（`--header-default-color`）に反転する
- Text: `#333333`（`--header-text-color`）／ホバー: `#e60039`（`--header-hover-color`）
- Border: `1px solid #dddddd`（`--header-footer-border-color`）
- Logo: 赤いダイヤモンドマーク `#e60039` ＋黒の `okamura` ワードマーク（SVG）
- ドロップダウン（メガメニュー）の背景: `#ffffff`（`--header-dropdown-bg-color`）

### Footer

- Background: `#ededeb`（`--footer-bg-color`）
- Text: `#333333`（`--footer-text-color`）／ロゴのみ `#000000`
- Max Width: `1366px`
- サイトマップ領域だけ `#ffffff`（`--sitemap-bg-color`）

---

## 5. Layout Principles

### Spacing Philosophy

コンテンツ幅を広く取り、セクション間は上下 `60px` の余白で切る。セクションごとに背景色（白 / `#ededeb`）を切り替えて帯状に区切るのが基本手法。

### Spacing Scale（実測・推定）

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 13px（ボタン内 padding） |
| M | 20px |
| L | 30px |
| XL | 45px |
| XXL | 60px（セクション上下） |

### Container

- Max Width: `1366px`（`--contents-width`。フッターにも同値が適用）
- コンテンツ内側の実測幅: `1200px`（見出し）／`1220px`（本文ブロック）
- Section Padding: `60px 0`（上下）

### Grid

- 製品カード・事例カードは **2 カラム**（1440px 幅で1枚 580px）が基本
- 事業領域タイル・メニュー内リストは 3〜4 カラム
- セクションの背景帯は**全幅（100vw）**で、中身だけ 1366px に収める

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ヘッダー・カード・ボタンはすべてフラット |
| 1 | `0 0 10px rgba(0,0,0,0.2)` | カード／CTA タイルの **hover 時のみ**（`--cta-shadow`）。全方位に均等な影 |
| 2 | `0 0 10px rgba(0,0,0,0.2)` | メガメニューのドロップダウン面 |

- 影は「押せることを示す hover のフィードバック」としてしか使わない。静止状態は完全にフラット
- オフセットを持たない全方位の `0 0 10px` は、紙の浮きというより「光が当たる」表現に近い

---

## 7. Do's and Don'ts

### Do（推奨）

- 文字は `#333333`、罫は `#dddddd`／`#999999`、面は `#ffffff` と `#ededeb` の無彩色で組む
- `border-radius: 0` を原則にする。角丸は絞り込みピル（`50px`）とメガメニューアイテム（`10px`）だけの例外
- 本文は 16px / `line-height: 1.8` / `letter-spacing: normal`、`font-feature-settings: "palt"` を body に指定する
- グローバルナビ・英字ラベルには `0.13〜0.17em` の広い字間を付ける
- ページ背景はトップが白、下層のコンテンツ帯は `#ededeb`。**帯の色替えでセクションを区切る**
- CTA は白地＋`1px solid #999` のアウトライン、または `#515151`〜`#717171` のグレー塗りブロックで作る
- カードの影は hover 時の `0 0 10px rgba(0,0,0,0.2)` だけに留める
- 製品名は「欧文名＋【カナ読み】」の並びで表記する

### Don't（禁止）

- ブランドレッド `#e60039` でボタンや面を塗らない（ロゴとホバーの2用途に限定されている）
- 本文に `letter-spacing` を足さない（palt で詰まっている前提の設計）
- カード・ボタンに角丸や常時の影を付けない
- 文字色に純黒 `#000000` を使わない（フッターロゴを除き `#333333`）
- 明朝体を混ぜない。UD新ゴ1書体で階層はウェイトとサイズだけで作る
- ナビの字間を詰めない（`0.166em` の広さがブランドの表情そのもの）
- 白背景と `#ededeb` 以外の面色を増やさない

---

## 8. Responsive Behavior

### Breakpoints（推定）

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | 1 カラム。グローバルナビはハンバーガー、メガメニューはアコーディオンに |
| Tablet | ≤ 1024px | 2 カラム。ユーティリティナビはアイコンのみに縮約 |
| Desktop | > 1024px | 2 カラムカード＋メガメニュー。コンテンツ幅 1366px |

- メガメニューのアイテムサイズは `clamp(40px, 100vh * 60 / 900, 60px)`（`--item-icon-size`）で**ビューポート高さに応じて**可変。横幅ではなく高さ基準なのがこのサイトの特徴
- 再生ボタンは `clamp(80px, 100vw * 80 / 430, 80px)`（`--play--btn-size`）

### タッチターゲット

- 最小サイズ: 44px × 44px
- アウトラインボタンは `padding: 14px 45px` 以上で高さ 40px 超を確保している

### フォントサイズの調整

- トップの大見出し 30px はモバイルで 22–24px に、下層 h1 24px は 20px 前後に縮める
- 本文 16px はモバイルでも維持する（`line-height: 1.8` も維持）
- ナビの広い字間はモバイルでは `0.08em` 程度まで詰めて折り返しを防ぐ

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background(Top):     #ffffff
Background(Content): #ededeb
Surface:             #f5f5f3 / #f5f5f5
Brand Red:           #e60039（ロゴ・ホバーのみ）
Text Primary:        #333333
Text on Dark:        #ffffff
CTA Gray:            #515151 / #616161 / #666666 / #717171
Border:              #dddddd（罫）/ #999999（ボタン）/ #cccccc（カード）
Font:                "UD Shin Go Regular", "UDShinGoPro-Regular", sans-serif
Font(Medium):        "UD Shin Go Medium"  Font(Bold): "UD Shin Go Bold"
Body Size:           16px
Line Height:         1.8
Letter Spacing:      本文 normal / ナビ 0.166em
palt:                on（body でグローバル）
Button(線):          #fff / 1px solid #999 / radius 0 / padding 25px 40px 25px 30px
Button(塗り):        #666 bg / #fff 10px 700 / radius 0
Tag(ピル):           #fff / 1px solid #ddd / radius 50px / padding 9px 13px
Card:                #fff / 1px solid #ccc / radius 0 / shadow は hover のみ
Shadow(hover):       0 0 10px rgba(0,0,0,0.2)
Container:           1366px
```

### プロンプト例

```
オカムラのデザインシステムに従って、オフィスチェアの製品一覧ページを作成してください。
- ページ上部は白 #ffffff、製品セクションの帯は #ededeb で区切る
- フォント: "UD Shin Go Regular", sans-serif（代替: BIZ UDPGothic）
- 本文 16px / line-height 1.8 / letter-spacing normal、body に font-feature-settings: "palt"
- グローバルナビは 14px / letter-spacing 0.166em と大きく開く
- 文字色は #333333（純黒は使わない）
- 製品カードは白背景・1px solid #ccc・border-radius 0、hover で 0 0 10px rgba(0,0,0,0.2) の影
- 製品名は「Flotte【フローテ】」のように欧文名＋隅付き括弧のカナ読み
- CTA は白地＋1px solid #999 のアウトライン（radius 0、padding 14px 45px）
- 絞り込みタグだけ radius 50px のピル（1px solid #ddd）
- ブランドレッド #e60039 はロゴとリンクホバーにのみ使い、面や CTA を赤で塗らない
- コンテンツ幅は 1366px
```

### Web フォントが使えない環境での代替指針

- UD新ゴ → **BIZ UDPGothic**（Google Fonts / モリサワの UD 書体。字形の性格が最も近い。ただし 400・700 の2ウェイトのみなので Medium(500) の階調は失われる）
- Slate（英字ラベル） → **Source Sans 3**
- OkamuraSans → **Noto Sans JP**（サイト自身のフォールバック指定と同じ）
- 代替書体でも「無彩色・角丸ゼロ・行間 1.8・ナビだけ広い字間・赤はロゴのみ」の5点を守れば、オカムラのトーンは再現できる
