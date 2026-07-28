# DESIGN.md — 東京都現代美術館（MOT / Museum of Contemporary Art Tokyo）

> 東京都現代美術館（https://www.mot-art-museum.jp/）のデザイン仕様書。
> 1995 年開館、東京・清澄白河。国内最大級の現代美術コレクションを持つ公立美術館で、2019 年のリニューアル以降、サインからウェブまで一貫した「MOT」のビジュアルアイデンティティを運用している。
> 最大の特徴は、**和文に Morisawa の「田中ゴシック（Tazugane Gothic StdN）Bold」、欧文に Graphik を組み、`YakuHanJP`（約物半角）と `font-feature-settings: "lnum","palt"` を重ねる**こと。さらに **`line-height: 1.15` がサイト全体に効く**という、日本語サイトとしてはきわめて締まった行送りを採る。地は白 `#ffffff`、文字は純黒 `#000000`、リンクは `#356eb0`、告知帯はクリーム `#f9ede0`。展覧会ラベルは黒ベタ・角丸 0 のチップ。
> 実サイトの computed style 実測（2026-07-28 取得。トップ＋展覧会一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **作品と展覧会ビジュアルが主役、UI は無彩色の額縁**。面色・角丸・影をほとんど使わず、黒・白・薄グレーだけでレイヤーを作り、色は展覧会のキービジュアル側に預ける
- **MOT について**: 公立美術館としての情報提供責務（開館状況・観覧料・アクセシビリティ）と、現代美術館としての実験性を両立させる必要がある。結果として **「上部に常設の開館ステータス帯」＋「全画面の展覧会ギャラリー」** という構成になっている
- **密度**: 中〜高密度。トップは開館情報 → 展覧会スライダー → お知らせ → イベント → 施設案内と積層する。1 画面あたりの情報量は多いが、行送りが締まっているため詰まって見えない
- **キーワード**: 白地、純黒、Graphik ＋ 田中ゴシック Bold、lh 1.15、`lnum`+`palt`、ブルー #356eb0、クリーム #f9ede0、角丸 0 の黒チップ
- **特徴**:
  - **和文は Tazugane Gothic StdN Bold（`TazuganeGothicStdN-Bold`）一本**。ヘッダー・ナビ・見出し・ラベルはすべてこれ。本文（記事本体・日付・ラベル）だけはフォント指定から Tazugane が外れ、`YuGothic` / `Noto Sans JP` / `Hiragino Sans` の OS フォントに落ちる
  - **`YakuHanJP` と `YakuHanJPs` を使い分ける**。Tazugane を伴う見出し・ナビ系は `YakuHanJP`（約物すべて半角化）、本文系は `YakuHanJPs`（`「」（）` など括弧類のみ半角化）。**日本語組版の「どこまで詰めるか」を領域ごとに切っている**
  - **`font-feature-settings: "lnum","palt"` も見出し・ナビ限定**。本文は `normal`。`lnum`（ライニング数字）は「2026年5月16日（土）」のような和欧混植の日付を高さの揃った数字で組むための指定
  - **`line-height: 1.15` がグローバル**。16px → 18.4px、48px → 55.2px、14px → 16.1px と、実測値がすべて ×1.15 で揃う。**短いラベル・見出しが大半のサイト構造だから成立する設定**であり、長文の読み物には向かない（後述の Don't 参照）
  - **`letter-spacing` はサイト全体で `normal`**。字間を触らず、`palt` と `YakuHanJP` の約物処理だけで詰めをつくる
  - 色は **黒・白・グレー 3 段（`#dddddd` / `#eeeff0` / `#f1f1f1`）** が骨格。差し色はリンクブルー `#356eb0` と、お知らせ／過去展覧会のクリーム `#f9ede0` / `#fcf6ef` のみ
  - ラベルは **黒ベタ・角丸 0**（`開催中` / `開催予定` / `コレクション展示`）と **白地＋黒 1px アウトライン・角丸 5px**（`ギャラリートーク` 等のイベント種別）の 2 系統

---

## 2. Color Palette & Roles

> 実測値。地は白 `#ffffff`、文字は純黒 `#000000`。ブランドカラーと呼べる色は**リンクブルー `#356eb0` のみ**で、残りはグレースケールとクリームの面色。展覧会ごとのキービジュアルが色を持ち込むため、UI 側は意図的に彩度を抑えている。

### Brand（ブランド）

- **MOT Blue** (`#356eb0`, rgb 53,110,176): リンク・サブ見出し（`h2` 20px）・スキップリンクの文字色。**サイトで唯一の恒常的な有彩色**。落ち着いた中明度のブルーで、作品画像の彩度と競合しない
- **Ink** (`#000000`): 見出し・本文・ラベル面の基本色。**MOT は文字にもラベル面にも純黒を使う**（ロゴタイプ「MOT」の黒と揃える）

### Surface（面）

- **Background** (`#ffffff`): ページ地色。ヘッダーもナビも白
- **Cream** (`#f9ede0`, rgb 249,237,224): 「MOT からのお知らせ」帯の面色。**トップの上部 viewport で最大面積を占める色**（疑似要素 `::before` で塗られている）。白地の中で唯一の暖色面
- **Cream Light** (`#fcf6ef`, rgb 252,246,239): 「これまでの展覧会をみる」ブロックの面色。Cream をさらに薄めた段
- **Gray 100** (`#f1f1f1`, rgb 241,241,241): 開館ステータスバー（「本日は開館日です」）の面
- **Gray 200** (`#eeeff0`, rgb 238,239,240): コレクション展示ブロック・「ページ上部へ戻る」の面
- **Gray 300** (`#dddddd`, rgb 221,221,221): ページ見出し帯（「展覧会 / 開催中・これからの展覧会」）の面
- **Gray 400** (`#cccccc`, rgb 204,204,204): セクション区切り・非活性面
- **Overlay** (`rgba(0,0,0,0.75)`): ナビゲーションモーダルの背景。黒 75% で背後のページを残す

### Neutral（文字・罫）

- **Text Primary** (`#000000`): 本文・見出し
- **Text on Dark** (`#ffffff`): 黒チップ・黒ボタン・開館ステータス帯（黒地時）の文字
- **Border** (`#dddddd` / `#cccccc`): 区切り線・アウトラインチップの罫（アウトラインチップの罫は `#000000` 1px）

### Semantic（意味的な色）

- MOT は**意味色をほとんど持たない**。状態は色ではなく**ラベルの文言**（`開催中` / `開催予定` / `募集` / `お知らせ`）で表現する
- **Info／Link**: `#356eb0` を流用
- **Danger／Error**: フォーム用途で必要な場合のみ暖色の赤（`#c0392b` 目安）。UI 全体の無彩色を壊さないよう、面ではなく文字と 1px 罫に留める

> **注**: `--swiper-theme-color: #007aff` という CSS 変数が出るが、これはスライダーライブラリ Swiper の既定値であり **MOT のブランドカラーではない**。実装時に流用しないこと。

---

## 3. Typography Rules

> **和文 Tazugane Gothic StdN Bold ＋ 欧文 Graphik**。見出し・ナビ系は `YakuHanJP` + `"lnum","palt"`、本文系は `YakuHanJPs` + `normal` と**領域で組版設定を切り替える**。`line-height: 1.15` がグローバル、`letter-spacing` は全域 `normal`。

### 3.1 和文フォント

- **ゴシック体（見出し・ナビ・UI）**: **Tazugane Gothic StdN Bold**（`TazuganeGothicStdN-Bold`）。Morisawa のヒューマニストサンセリフ系ゴシックで、欧文 Neue Frutiger と調和するよう設計されている。MOT では **Bold ウェイトのみ**を使い、CSS 側の `font-weight` は 600（一部 700）を当てる
- **本文の和文**: Tazugane を**指定しない**。`my-yu-gothic` → `YuGothic`（游ゴシック）→ `Noto Sans JP` → `Hiragino Sans` → `ヒラギノ角ゴ ProN W3` → `Hiragino Kaku Gothic ProN` → `メイリオ` の OS フォントチェーンに落とす
- **約物**: `YakuHanJP`（見出し・ナビ用。約物をすべて半角化）と `YakuHanJPs`（本文用。`「」（）` など括弧類のみ半角化）を**用途で使い分ける**
- 明朝体は UI に使わない

### 3.2 欧文フォント

- **サンセリフ**: **Graphik Web**（Commercial Type）を先頭に置く。以降 `Univers` → `Helvetica Neue` → `Helvetica` → `Roboto` → `Noto Sans` → `Segoe UI` → `Droid Sans` → `Verdana` の順にフォールバック
- **欧文が和文より先**。館名の英語表記「MUSEUM OF CONTEMPORARY ART TOKYO」や作家名のアルファベット、年号を Graphik の字面で見せるための順序
- **preview.html での注記**: `Graphik Web` は Commercial Type の商用ライセンス、`TazuganeGothicStdN-Bold` は Morisawa Fonts のライセンスフォントで、いずれもローカルの preview.html では表示できない。プレビューでは欧文に **Inter**、和文見出しに **Zen Kaku Gothic New (700)**、和文本文に **Noto Sans JP** を代替として用いる。Zen Kaku Gothic New は Tazugane 同様のヒューマニスト系ゴシックで、ふところの広さと字面の性格が近い。実装時は必ず Graphik と Tazugane Gothic StdN を読み込むこと

### 3.3 font-family 指定

```css
/* 見出し・ナビ・ラベル（Tazugane あり） */
font-family: "Graphik Web", Univers, "Helvetica Neue", Helvetica, Roboto,
  "Noto Sans", "Segoe UI", "Droid Sans", Verdana,
  YakuHanJP, TazuganeGothicStdN-Bold,
  my-yu-gothic, YuGothic, "Noto Sans JP", "Hiragino Sans",
  "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif;
font-feature-settings: "lnum", "palt";

/* 本文・日付・記事ラベル（Tazugane なし） */
font-family: "Graphik Web", Univers, "Helvetica Neue", Helvetica, Roboto,
  "Noto Sans", "Segoe UI", "Droid Sans", Verdana,
  YakuHanJPs,
  my-yu-gothic, YuGothic, "Noto Sans JP", "Hiragino Sans",
  "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif;
font-feature-settings: normal;

/* グローバル */
line-height: 1.15;
letter-spacing: normal;
```

**フォールバックの考え方**:
- **欧文（Graphik）が先頭**。和文グリフを持たないため、日本語は自動的に後続の和文フォントへ落ちる（和欧の役割分担を font-family の順序だけで実現する古典的な手法）
- **`YakuHanJP` / `YakuHanJPs` は和文フォントの直前に置く**。約物だけを先取りして半角化するための位置
- **見出しは Tazugane、本文は OS フォント**という二層構成。Web フォントの読み込み量を見出しに集中させ、本文はシステムフォントで即時表示する設計

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Display | Tazugane Bold | 48px | 600 | **1.15** (55.2px) | normal | 「イベント」等のセクション見出し |
| Page Title | Tazugane Bold | 44px | 600 | **1.15** (50.6px) | normal | `h1`「開催中・これからの展覧会」 |
| Heading 2 | Tazugane Bold | 32px | 600 | **1.15** (36.8px) | normal | `h3`「施設案内」 |
| Exhibition Title | Tazugane Bold | 28px | 600 | **1.15** (32.2px) | normal | 展覧会タイトル |
| Section Sub | OS ゴシック | 25.6px | 600 | **1.15** (29.44px) | normal | 「開催中の展覧会」（Tazugane なし） |
| Modal Title | Tazugane Bold | 24px | 600 | **1.15** (27.6px) | normal | ナビモーダルの大項目 |
| Sub Heading | Tazugane Bold | 20px | 600 | **1.15** (23px) | normal | `h2` サブ見出し `#356eb0` |
| Nav Item | Tazugane Bold | 18px | 600 | **1.15** (20.7px) | normal | ナビの中項目 |
| Body / Nav | Graphik + OS | 16px | 400 | **1.15** (18.4px) | normal | `body` 既定。ナビは 600 |
| Label / Date | OS ゴシック | 14px | 600 | **1.15** (16.1px) | normal | 展覧会ラベル・会期表記 |
| Menu Caption | Tazugane Bold | 12px | 700 | **1.15** (13.8px) | normal | ハンバーガー下の「メニュー」 |

- **ウェイトは 400 と 600 の 2 段**が基本（12px のメニューキャプションのみ 700）。Tazugane Bold を 600 で当てているため、実際の描画はかなり太い
- **サイズだけで階層を作る**。字間も行間も動かさないので、48 / 32 / 20 / 16 / 14 のサイズ差が唯一の手がかりになる

### 3.5 行間・字間

- **行間 (line-height)**: **サイト全体で 1.15**。実測値がすべて基準サイズ ×1.15 で揃う（16→18.4 / 48→55.2 / 14→16.1 / 44→50.6）
- **字間 (letter-spacing)**: **全域 `normal`**。詰めも開きも一切行わない
- **詰めは `palt` と `YakuHanJP` が担当**。`letter-spacing` を動かす代わりに、約物半角化とプロポーショナル詰めで和文の空きを処理する

**ガイドライン**:
- **1.15 が成立するのは、MOT のテキストが「短いラベル・1〜2 行の見出し・会期表記」に最適化されているから**。展覧会名や施設名は長くても 2 行で収まる
- **展覧会解説など 3 行以上続く文章を組む場合は 1.15 を使わない**。1.7〜1.9 に開くこと（後述の Don't 参照）
- 数字を含む見出し・日付には必ず `"lnum"` を効かせる。「2026年5月16日（土）」のような和欧混植で数字の高さが揃う

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 展覧会名・作家名は改行位置が意味を壊しやすい。`<wbr>` や `<br>` で意図的に改行位置を指定するのが望ましい

### 3.7 OpenType 機能

```css
/* 見出し・ナビ・ラベル */
font-feature-settings: "lnum", "palt";

/* 本文・日付・記事 */
font-feature-settings: normal;
```

- **`palt`（プロポーショナル字詰め）は見出し・ナビ限定**。大きな文字ほど和文の字間の空きが目立つため、見出しにだけ掛ける
- **`lnum`（ライニング数字）が MOT の隠れた要点**。Graphik の既定はオールドスタイル数字寄りの設計になりうるため、`lnum` で高さの揃った数字に固定する。会期・開館時間・年号を扱う美術館サイトでは効果が大きい
- **本文は `normal`**。長めの日本語テキストに `palt` を掛けると読みづらくなるため、意図的に外している

### 3.8 縦書き

- 該当なし。UI・展覧会情報とも横組み
- 展覧会キービジュアル内の縦組み（例:「MOT コレクション」の縦書きタイトル）は**画像として扱う**。CSS の `writing-mode` は使っていない

---

## 4. Component Stylings

### Buttons

**Primary（黒ソリッド・角丸 5px）**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `8px`（矢印付きは `5px 30px 5px 10px`）
- Border Radius: `5px`
- Font: Tazugane Bold / 16px（小サイズは 14px）/ weight 600
- 例: 「MOT について詳しくみる」「お知らせ一覧をみる」

**Text Link（ブルー・下線なし）**
- Background: `transparent`
- Text: `#356eb0`
- Padding: `14px 40px`
- Border Radius: `0px`
- Font: 16px / weight 600
- 例: 「開館時間・休館日／観覧料」「フロアマップ」「収蔵作品検索」
- **MOT の一覧リンクはボタン化せず、ブルーの文字リンクを行として並べる**

### Labels / Chips

**Status Chip（黒ベタ・角丸 0）**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `8px 20px`（ギャラリー上部の大サイズは `20px 83px`）
- Border Radius: **`0px`**
- Font: 14〜20px / weight 600 / `font-feature-settings: normal`
- 例: `開催中` / `開催予定` / `コレクション展示`（現在地ナビにも同じ黒ベタを使う）

**Category Chip（白地・黒アウトライン・角丸 5px）**
- Background: `#ffffff`
- Text: `#000000`
- Border: `1px solid #000000`
- Padding: `4px 32px`
- Border Radius: `5px`
- Font: 14px / weight 600
- 例: `ギャラリートーク` / `ギャラリークルーズ`

**News Tag（面なし・角丸 5px）**
- Background: `#ffffff`
- Text: `#000000`
- Padding: `3px` 〜 `8px`
- Border Radius: `5px`
- Font: 14px / weight 600
- 例: `お知らせ` / `募集`

### Select（言語切替・年度絞り込み）

- Background: `transparent`（ヘッダー黒帯上）または `#ffffff`
- Text: `#ffffff`（黒帯上）/ `#000000`
- Padding: `0 40px 0 10px`（右に矢印用の余白）
- Border Radius: `0px`
- Font: 14〜16px / weight 600

### Cards（展覧会・イベント）

- Background: `#ffffff`、または `#eeeff0` / `#fcf6ef` の面カード
- Border: なし（面色と余白で分離）
- Border Radius: **`0px`**（画像も角を落とさない）
- 構成: 画像 → 黒ベタのステータスチップ → タイトル（Tazugane 28px）→ 会期（14px / 600）
- Shadow: なし

### Status Bar（開館状況）

- Background: `#f1f1f1`（開館日）／ 黒地 `#000000` のパターンもある
- 中身: 「本日は開館日です」（20px / 600）＋「開館時間 10:00-18:00」（16px / 600）
- **公立館として最上部に常設される情報**。`lnum` で時刻表記の数字を揃える

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 40px |
| XXL | 64px |

- 実測のパディングは `8px` / `10px` / `20px` / `23px` / `24px` / `26px` / `32px` / `40px` に集中する

### Container

- Max Width: **1440px 相当の全幅**（展覧会ギャラリーはビューポート全幅にブリード）
- コンテンツセクションは概ね **1200px** 前後に収める
- Padding (horizontal): 20〜40px

### Grid

- Columns: 展覧会サムネイルは 4 カラム、イベント・お知らせは 1 カラムのリスト
- Gutter: 24px
- **トップは「全幅の展覧会ギャラリー」→「コンテナ内の情報リスト」の 2 層構造**。ギャラリーは横スクロールのスライダー（Swiper）

---

## 6. Depth & Elevation

実測ではほぼ全要素が `box-shadow: none`。**MOT は影を使わず、面色の切り替えだけで階層を作る**。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼすべての要素 |
| 1 | none（面色差で表現） | カード・チップ。`#ffffff` × `#eeeff0` × `#f9ede0` の面の差で分離 |
| 2 | `0 1px 0 0 rgba(0,0,0,0.1)` | 固定ヘッダーの下辺（必要な場合のみ） |
| 3 | `rgba(0,0,0,0.75)` の全画面オーバーレイ | ナビゲーションモーダル。影ではなく**暗幕**で階層を作る |

- **奥行きは「白 → 薄グレー `#f1f1f1` → グレー `#dddddd` → 黒 `#000000`」の 4 段の面**で表現する
- モーダルだけは例外的に強い（黒 75%）。中間的な半透明は使わない

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文見出しは Tazugane Gothic StdN Bold、欧文は Graphik。**font-family は欧文を先頭に置く**
- **見出し・ナビには `YakuHanJP` + `font-feature-settings: "lnum","palt"`、本文には `YakuHanJPs` + `normal`** と、領域で組版設定を切り替える
- 会期・開館時間・年号など**数字を含むテキストには必ず `lnum` を効かせる**
- `letter-spacing` は `normal` のままにする。詰めは `palt` と約物半角化に任せる
- ステータスラベルは**黒ベタ・角丸 0**、イベント種別は**白地＋黒 1px アウトライン・角丸 5px** と、形で意味を分ける
- 有彩色はリンクブルー `#356eb0` に限定し、色は展覧会のキービジュアルに預ける
- 面の段差は `#ffffff` / `#f1f1f1` / `#eeeff0` / `#dddddd` の 4 段で作る。暖色面は `#f9ede0` / `#fcf6ef` のみ
- 開館状況（開館日／休館日・開館時間）はページ最上部に常設する

### Don't（禁止）

- **`line-height: 1.15` を長文に使わない**。MOT でこれが成立するのは短いラベルと 1〜2 行の見出しが中心だから。展覧会解説・コラムなど 3 行以上続く日本語本文には **1.7〜1.9** を使うこと
- **本文に `palt` を掛けない**（MOT 自身も本文は `normal`）。長文の和文にプロポーショナル詰めを掛けると読みづらくなる
- 角丸を大きくしない。**チップとボタンは 0px か 5px の 2 択**、カードと画像は 0px
- 影を落とさない。階層は面色で作る
- リンクブルー `#356eb0` 以外の有彩色を UI に足さない（Swiper 既定の `#007aff` を流用しない）
- ステータス表現を色だけに頼らない。**必ず「開催中」「開催予定」の文言を伴わせる**（アクセシビリティ配慮を公表している館であるため）
- `letter-spacing` を独自に足さない。全域 `normal` が MOT の字面の前提

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。ナビは全画面モーダル（黒 75% オーバーレイ） |
| Tablet | 768–1024px | 2 カラム。展覧会サムネイルは 2 列 |
| Desktop | > 1024px | 4 カラムの展覧会ギャラリー＋全幅スライダー |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- ブルーの文字リンク（`14px 40px` パディング）はこのために縦横の余白を大きく取っている

### フォントサイズの調整

- 本文 16px は据え置き。ラベル 14px も維持する
- Page Title 44px → モバイルでは 26〜30px、Section Display 48px → 28〜32px 程度に縮小
- **モバイルでは行間を 1.15 から 1.4 前後まで開く**ことを推奨（画面幅が狭く見出しの折り返しが増えるため）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff
Text:           #000000   （純黒）
Link / Sub:     #356eb0   （MOT Blue。唯一の恒常的な有彩色）
Cream:          #f9ede0   （お知らせ帯） / #fcf6ef（過去展覧会）
Gray:           #f1f1f1 / #eeeff0 / #dddddd / #cccccc
Overlay:        rgba(0,0,0,0.75)   （ナビモーダル）
JP Font (見出し): YakuHanJP, TazuganeGothicStdN-Bold, YuGothic, "Noto Sans JP", sans-serif
JP Font (本文):   YakuHanJPs, YuGothic, "Noto Sans JP", "Hiragino Sans", sans-serif
Latin Font:     "Graphik Web", Univers, "Helvetica Neue", Helvetica, sans-serif（和文より先頭）
Body Size:      16px / weight 400
Weight:         400（本文） / 600（見出し・ナビ・ラベル） / 700（12px キャプションのみ）
Line Height:    1.15（グローバル。長文は 1.7〜1.9 に開くこと）
Letter Spacing: normal（全域）
Feature:        見出し "lnum","palt" / 本文 normal
Radius:         0px（ステータスチップ・カード・画像） / 5px（ボタン・カテゴリチップ）
Shadow:         none
```

### プロンプト例

```
東京都現代美術館（MOT）のデザインシステムに従って、展覧会一覧ページを作成してください。
- 欧文は Graphik（無ければ Helvetica Neue / sans-serif）を font-family の先頭に置く
- 和文の見出し・ナビは YakuHanJP + TazuganeGothicStdN-Bold、
  本文は YakuHanJPs + 游ゴシック / Noto Sans JP に落とす
- 見出し・ナビには font-feature-settings: "lnum","palt"、本文には normal を指定する
- letter-spacing は全域 normal。line-height はラベル・見出しに 1.15、
  展覧会解説など 3 行以上の本文には 1.8 を使う
- 地は白 #ffffff、文字は純黒 #000000、リンクとサブ見出しは #356eb0
- ページ見出し帯は #dddddd、お知らせ帯はクリーム #f9ede0
- ステータスラベル（開催中 / 開催予定）は黒ベタ #000000・白文字・角丸 0px・padding 8px 20px
- イベント種別ラベル（ギャラリートーク等）は白地＋1px solid #000000・角丸 5px・padding 4px 32px
- 主要 CTA は黒ソリッド・白文字・角丸 5px、一覧リンクは #356eb0 の文字リンクを行で並べる
- 影は使わない。階層は #ffffff / #f1f1f1 / #eeeff0 / #dddddd の面色差で作る
- ページ最上部に「本日は開館日です／開館時間 10:00-18:00」の開館ステータス帯を常設する
- 会期表記（2026年5月16日（土）〜8月16日（日））は lnum を効かせて数字の高さを揃える
```
