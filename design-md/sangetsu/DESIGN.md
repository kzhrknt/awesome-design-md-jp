# DESIGN.md — サンゲツ（sangetsu）

> 株式会社サンゲツ（https://www.sangetsu.co.jp/）のデザイン仕様書。
> 1849 年創業、名古屋。壁紙・床材・カーテンなどインテリア内装材の国内最大手。ブランドステートメントは **"Joy of Design ／ デザインするよろこびを"**。ロゴは虹色のプリズム型シンボルと、小文字の `sangetsu` ワードマーク。
> 最大の特徴は、**コーポレートフォントに「AXIS Std」（タイププロジェクト／鈴木功）を全面採用**していること。和文サイトで独立系ファウンダリの書体をここまで徹底して使う例は珍しい。行間は **2.0（14px→28px）** と非常に広く、**字間は `normal`**。文字色は `#333333`、ブランドグレーは温かみのある `#727171`、CTA は紺青 `#185f98`。
> **Windows の游ゴシック問題に `@font-face` で対処**している（`"Yu Gothic"` を `font-weight: 500` にマッピング）点も実装上の要点。
> 実サイトの computed style 実測（2026-07-27 取得。トップページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **静かな余白と、色数を絞った上品な整理**。インテリア商材という「素材そのものが色柄を持つ」領域のため、UI 側は無彩色に徹し、商品写真とテクスチャに色を譲る
- **サンゲツについて**: 壁紙・床材・ファブリックの企画開発と流通。BtoB（設計事務所・工務店）と BtoC（一般消費者）の 2 つの動線を持つため、ヘッダーで「ビジネス向け」「一般の方」を明確に分岐させる
- **密度**: 中〜低密度。全幅の KV スライダー、商品検索の 3 導線、Room Styling の写真グリッド、IR・お知らせのリストが積層する
- **キーワード**: AXIS Std、行間 2.0、温かみのあるグレー #727171、紺青 #185f98、無彩色の地、カテゴリ別のパステルタグ、角丸 0
- **特徴**:
  - **コーポレートフォントは AXIS Std**（タイププロジェクト）。第 2 候補が `"Yu Gothic"` → `メイリオ` で、環境差を吸収する
  - **`@font-face` で `"Yu Gothic"` を `font-weight: 500` にマッピング**している。Windows の游ゴシックは Regular が細すぎるため Medium を当てる、日本語 Web で頻出の対処
  - **`line-height: 2.0`（14px→28px）が本文の基準**。見出しの多くも 2.0 で、リード文のみ 1.7。**日本語サイトの中でもかなり広い部類**
  - **`letter-spacing` は `normal`**、**`font-feature-settings` も `normal`**（palt を使わない）
  - **`border-radius` は原則 0**。角丸を使うのは KV のページネーション（`30px` / `50%`）とごく一部のバッジのみ
  - 無彩色の地に対し、**お知らせのカテゴリタグだけが多色**（ピンク・オレンジ・紫・緑・青・茶・黄）。情報種別を色で識別させる設計
  - CTA は **紺青 `#185f98`**（ビジネス導線）と **ブランドグレー `#727171`**（IR・企業情報）の 2 系統
  - 「重要なお知らせ」だけ **純赤 `#ff0000`** の帯で最上位に置く

---

## 2. Color Palette & Roles

> 実測値。地は白 `#ffffff` と薄グレー `#f4f4f4` / `#efefef`、テキストは `#333333`（一部 `#111111`）。ブランドの無彩色が **温かみのあるグレー `#727171`**、業務導線の CTA が **紺青 `#185f98`**。

### Brand（ブランド）

- **Brand Gray** (`#727171`, rgb 114,113,113): **サンゲツの基幹となる無彩色**。R>G=B のわずかに暖かいグレーで、純グレー `#737373` ではない。IR ボタン・タブのアクティブ面・ナビ文字に使う
- **Business Blue** (`#185f98`, rgb 24,95,152): 「ビジネス向けはこちら」「For Business」「マイページ」の面色。**BtoB 導線を示す紺青**
- **Prism（ロゴ）**: シンボルマークは虹色のプリズム。UI では再現せず、ロゴ画像としてのみ扱う

### Accent（カテゴリタグ・多色系）

お知らせ／IR の情報種別を識別する彩色群。**面色＋白抜き**と、**白地＋同色の 1px 枠＋同色文字**の 2 形式がある。

- **Topics Pink** (`#f1a1c4`, rgb 241,161,196): 「トピックス」の面色
- **Notice Light Orange** (`#f9c681`, rgb 249,198,129): 「お知らせ」の面色
- **Important Orange** (`#f7b255`, rgb 247,178,85): 「重要なお知らせ」の見出し面（文字は `#111111`）
- **Update Purple** (`#ba7cb9`, rgb 186,124,185): 「WEB サイト更新情報」の面色
- **Showroom Blue** (`#6e96ce`, rgb 110,150,206): 「全／大阪／沖縄ショールーム」の面色
- **Category Purple** (`#892890`, rgb 137,40,144): タブのアクティブ面（「すべて」）
- **IR Green** (`#739f4c`, rgb 115,159,76): 「サステナビリティ」タグ（枠＋文字）
- **IR Blue** (`#0d80b0`, rgb 13,128,176): 「株主総会」タグ
- **IR Violet** (`#843b7b`, rgb 132,59,123): 「適時開示」タグ
- **IR Rose** (`#bb5f89`, rgb 187,95,137): 「お知らせ／トピックス」タグ
- **IR Brown** (`#c28c42`, rgb 194,140,66): 「商品」タグ
- **IR Yellow** (`#c8ab00`, rgb 200,171,0): 「その他」タグ

### Neutral（面・罫・文字）

- **Background** (`#ffffff`): ページ地色
- **Surface** (`#f4f4f4` / `#efefef` / `#f6f6f6`): セクション面・「一覧を見る」ボタン面
- **Text Primary** (`#333333`): `body` の基本テキスト色
- **Text Deep** (`#111111`): 一部の見出し・重要表示
- **Text Secondary** (`#666666`): サブ見出し（`h2` 20〜24px の淡い見出し）
- **Muted Gray** (`#9fa0a0`, rgb 159,160,160): 検索ボタン面・非活性の枠と文字
- **Dark Gray** (`#686e6e`, rgb 104,110,110): フッターの導線帯（「一般の方はこちら」）
- **Border** (`#cccccc`): 区切り線・アウトラインボタンの枠

### Semantic（意味的な色）

- **Danger／Alert** (`#ff0000`, rgb 255,0,0): **純赤**。「重要なお知らせ」の帯とその見出しにのみ使う。サイト唯一の純色で、最上位の緊急度を示す
- **Warning**: `#f7b255`（Important Orange）
- **Info**: `#185f98`（Business Blue）
- **Success**: `#739f4c`（IR Green）を流用

---

## 3. Typography Rules

> **コーポレートフォント AXIS Std（タイププロジェクト）を全面採用**し、`"Yu Gothic"` → `メイリオ` でフォールバック。**`@font-face` で游ゴシックを weight 500 にマッピング**して Windows の細さを補正する。**行間 2.0** が本文の基準、字間は `normal`、palt は使わない。

### 3.1 和文フォント

- **ゴシック体**: **AXIS Std**（タイププロジェクト／鈴木功 設計）。デザイン誌『AXIS』のために生まれたモダンゴシックで、**やや縦長で締まった字面・低コントラスト・角の立った終筆**が特徴。サンゲツのコーポレートフォント
- **フォールバック**: `"Yu Gothic"`（游ゴシック）→ `メイリオ` / `Meiryo` → `sans-serif`
- 明朝体は使わない
- **一部の下層ページは旧デザインで `"ヒラギノ角ゴ Pro W3"` 系のスタックが残る**（`/company/` 等）。新デザインの基準は AXIS Std 側

### 3.2 欧文フォント

- **Hind Madurai**（Google Fonts）: 見出しの欧文・数値に部分的に併用される（`"Hind Madurai", "AXIS Std", ...` の順で指定）。ヒューマニストサンセリフで、AXIS Latin と相性がよい
- ワードマーク `sangetsu` は AXIS Latin の小文字組み
- それ以外の欧文は AXIS Std に含まれる欧文グリフをそのまま使う
- **preview.html での注記**: AXIS Std はタイププロジェクトのライセンスフォントのため、ローカルの preview.html では表示できない。プレビューでは **Google Fonts の "Zen Kaku Gothic New"（weight 400/500/700）** を和文の代替に用いる（低コントラストで角の立ったモダンゴシックという性格が近い）。欧文の **Hind Madurai** は**実サイトが実際に読み込んでいる Google Fonts** なのでそのまま使える。実装時は必ず AXIS Std を読み込むこと

### 3.3 font-family 指定

```css
/* 本文・見出し（コーポレートフォント） */
font-family: "AXIS Std", "Yu Gothic", メイリオ, Meiryo, sans-serif;

/* 欧文を優先したい見出し・数値 */
font-family: "Hind Madurai", "AXIS Std", "Yu Gothic", メイリオ, Meiryo, sans-serif;

/* Windows の游ゴシック対策：Regular が細すぎるため Medium にマッピングする */
@font-face {
  font-family: "Yu Gothic";
  src: local("Yu Gothic Medium");
  font-weight: 500;
}

/* グローバル */
line-height: 2.0;
letter-spacing: normal;
font-feature-settings: normal;
```

**フォールバックの考え方**:
- コーポレートフォント（AXIS Std）を先頭に置く
- 次に Windows/macOS 共通で期待できる游ゴシック、その次にメイリオ
- **`@font-face` の游ゴシック Medium マッピングを必ず併用する**。これが無いと Windows で本文が痩せて見え、AXIS Std との印象差が大きくなる
- 末尾は `sans-serif`

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | AXIS Std | 28px | 700 | 2.0 (56px) | normal | `h1`（ヘッダー領域） |
| Heading 1 | AXIS Std | 24px | 700 | 1.7 (40.8px) | normal | セクション見出し `#666666` |
| Heading 2 | AXIS Std | 22px | 700 | 2.0 (44px) | normal | `h3`（コンテンツ見出し） |
| Heading 3 | AXIS Std | 21px | 700 | 2.0 (42px) | normal | `h2`（サブ見出し） |
| Heading 4 | AXIS Std | 20px | 700 | 1.7 (34px) | normal | 淡い見出し `#666666` |
| Lead | AXIS Std | 18px | 400 | 1.7 (30.6px) | normal | リード文 |
| Label / Tab | AXIS Std | 16px | 700 | 2.0 (32px) | normal | タブ・ラベル（面色上は白抜き） |
| Sub Head (EN) | Hind Madurai | 16px | 700 | 2.0 (32px) | normal | 欧文見出し |
| Body | AXIS Std | 14px | 400 | **2.0 (28px)** | normal | `body` 既定 |
| Body Bold | AXIS Std | 14px | 700 | 2.0 (28px) | normal | 強調本文 |
| Body Tight | AXIS Std | 14px | 400 | 1.5 (21px) | normal | リスト内の詰めた本文 |
| Button Label | AXIS Std | 13px | 400 | — | normal | 検索導線ボタン |
| Caption / Tag | AXIS Std | 12px | 400/700 | 2.0 (24px) | normal | カテゴリタグ・注釈 |
| Nav Small | AXIS Std | 11px | 400 | 2.0 (22px) | normal | ナビ補助 |
| Micro | AXIS Std | 10px | 400 | 1.0 | **-2px** | アイコン内の極小表記（例外） |

- **ウェイトは 400 と 700 の二極**。中間ウェイトは使わない
- `#666666` の淡い見出し（20〜24px / 700）と `#333333` の濃い見出し（21〜22px / 700）を使い分ける
- `letter-spacing` を触るのはアイコン内の 10px 表記（`-2px`）のみで、**それ以外はすべて `normal`**

### 3.5 行間・字間

- **本文の行間 (line-height)**: **2.0**（14px→28px）。日本語サイトの中でも広い部類で、余白の多い落ち着いた印象を作る
- **見出しの行間**: 多くが **2.0**（21px→42px / 22px→44px / 28px→56px）。淡い見出しとリード文のみ **1.7**
- **詰める場合**: リスト内の本文は 1.5（14px→21px）
- **字間 (letter-spacing)**: **原則 `normal`**。例外はアイコン内 10px の `-2px` のみ
- **palt は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- 行間 2.0 を安易に詰めない。サンゲツの「余白の上品さ」はこの行間が支えている
- 見出しにも 2.0 を当てるため、見出しの上下マージンは控えめでよい（行間が余白を兼ねる）
- 字間を開かない。AXIS Std は元々やや締まった字面なので、`letter-spacing` を足すと書体の意図から外れる

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を掛けない */
letter-spacing: normal;
```

- **palt を使わない**。AXIS Std の設計された字面をそのまま出す
- 行間 2.0 で十分な空きがあるため、字詰めによる調整を必要としない

### 3.8 縦書き

- 該当なし。すべて横組み
- 用いる場合は `writing-mode: vertical-rl; text-orientation: mixed;`

---

## 4. Component Stylings

> **`border-radius` は原則 0**。角丸を使うのは KV のページネーション（`30px` / `50%`）だけ。矩形で構成するのがサンゲツのトーン。

### Buttons

**Business（紺青・ソリッド）**
- Background: `#185f98`
- Text: `#ffffff`
- Border: `1px solid #185f98`
- Padding: `0 5px`（実装は行高で高さを作る。目安は `10px 16px`）
- Border Radius: `0`
- Font: AXIS Std / 12px（大きいものは 16px / weight 700）
- 例: 「ビジネス向けはこちら」「For Business」「マイページ」

**Corporate（ブランドグレー・ソリッド）**
- Background: `#727171`
- Text: `#ffffff`
- Border Radius: `0`
- Font: 16〜20px / weight 400〜700
- 例: 「ESG 投資家の皆さまへ」「株主・個人投資家の皆さまへ」、タブのアクティブ面

**Outline（白地・グレー枠）**
- Background: `#ffffff`
- Text: `#333333`
- Border: `1px solid #cccccc`
- Padding: `10px 0`
- Border Radius: `0`
- Font: 14px / weight 400
- 例: 「会社情報トップ」「『みんなの #マイサンゲツ』をもっと見る」

**Ghost（薄グレー面）**
- Background: `#efefef`
- Text: `#333333`
- Border Radius: `0` / Padding: `10px 0` / Font: 14px
- 例: 「一覧を見る」

**Search Nav（商品検索の 3 導線）**
- Background: `#ffffff` / Text: `#333333`
- Padding: `15px 10px` / Border Radius: `0` / Font: 13px
- 例: 「カタログから探す」「機能や色・柄から探す」「イメージから探す」

### Category Tags（2 形式）

**Solid（面色＋白抜き）**
- Background: カテゴリ色（`#f1a1c4` / `#f9c681` / `#ba7cb9` / `#6e96ce` / `#892890` など）
- Text: `#ffffff` / Border Radius: `0` / Font: 12px / weight 400

**Outline（白地＋同色枠＋同色文字）**
- Background: `#ffffff` または `transparent`
- Text / Border: カテゴリ色 / `1px solid` 同色
- Border Radius: `0` / Font: 12px / weight 400〜700
- 例: 「サステナビリティ」`#739f4c`、「株主総会」`#0d80b0`、「適時開示」`#843b7b`、「商品」`#c28c42`、「その他」`#c8ab00`

### Alert Bar（重要なお知らせ）

- Background: `#ff0000`（見出しラベル部）
- Text: `#ffffff` / Font: 16px / weight 700 / Border Radius: `0`
- 帯の本文側は白地に `#ff0000` のリンク文字
- **サイト唯一の純色**。最上位の緊急度にのみ使う

### Inputs

- Background: `#ffffff`
- Border: `1px solid #cccccc`
- Border (focus): `1px solid #185f98`
- Border Radius: `0`
- Padding: `10px 14px`
- Font: AXIS Std / 14px / lh 2.0
- Text Color: `#333333` / Placeholder: `#9fa0a0`

### Cards

- Background: `#ffffff`（または面カードとして `#f4f4f4`）
- Border: なし、または `1px solid #cccccc`
- Border Radius: `0`
- Padding: `16〜24px`
- 商品・Room Styling カードは写真を全面に置き、下にキャプションを添える
- Shadow: 基本フラット（Depth & Elevation 参照）

### Pagination（KV スライダー）

- ドット: `border-radius: 50%`、アクティブは白面 `#ffffff` ＋ `1px solid`
- 横長インジケータのみ `border-radius: 30px`
- **サイト内で角丸を使う数少ない例外**

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 10px |
| M | 16px |
| L | 24px |
| XL | 40px |
| XXL | 64px |
| XXXL | 96px |

### Container

- Max Width: **1200px**（KV・写真セクションは `100%` の全幅ブリード）
- Padding (horizontal): 16〜40px

### Grid

- Columns: 商品検索は 3 カラム、Room Styling の写真グリッドは 3〜4 カラム、お知らせは 1 カラムのリスト
- Gutter: 16〜24px
- KV スライダーとフッター帯は全幅、コンテンツは 1200px に収める

---

## 6. Depth & Elevation

実測の box-shadow に基づく。全体はフラット寄りで、**ぼかしの小さい淡い影**を局所的に使う。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。白と薄グレー面の差で構成 |
| 1 | `inset 0 0 4px rgba(0,0,0,0.05)` | 入力欄・凹み表現（内側の影） |
| 2 | `0 0 3px 2px #cccccc` | カード・ドロップダウンの淡い縁取り影 |
| 3 | `0 0 5px rgba(0,0,0,0.2)` | モーダル・ポップオーバー |

- 奥行きは主に **白 `#ffffff` × 薄グレー `#f4f4f4` / `#efefef`** の面の差で表現する
- **オフセットを持たない「全方位に淡く広がる影」**が特徴。`0 4px 12px` のような落ち影は使わない

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文は **AXIS Std → "Yu Gothic" → メイリオ** の順で指定する
- **`@font-face` で `"Yu Gothic"` を `font-weight: 500` にマッピング**する（Windows の游ゴシック Regular は細すぎる）
- **本文の行間は 2.0**、見出しも原則 2.0、リード文と淡い見出しのみ 1.7
- `letter-spacing: normal` / `font-feature-settings: normal` を保つ
- ウェイトは 400 と 700 の二極
- **`border-radius: 0` を基本**にする（角丸は KV ページネーションのみ）
- ブランドの無彩色は温かみのある `#727171` を使う（純グレーにしない）
- BtoB 導線は紺青 `#185f98`、企業・IR 導線はブランドグレー `#727171` と役割で色を分ける
- お知らせのカテゴリタグは、面色＋白抜き／白地＋同色枠 の 2 形式を情報種別で使い分ける
- 影はオフセットのない淡い広がり（`0 0 3px 2px #cccccc` 等）に留める

### Don't（禁止）

- **行間 2.0 を安易に詰めない**（サンゲツの余白の上品さがこの行間で成立している）
- **`@font-face` の游ゴシック Medium マッピングを省略しない**（Windows で本文が痩せる）
- `letter-spacing` を開かない（AXIS Std の締まった字面が崩れる）
- `palt` を掛けない
- **角丸を足さない**（radius 0 が基本。ピル型 CTA はサンゲツのトーンではない）
- 純赤 `#ff0000` を「重要なお知らせ」以外に使わない（最上位の緊急度専用）
- カテゴリタグの多色を UI 全体に広げない（お知らせ・IR の識別に限定する）
- 中間ウェイト（500 / 600）を本文・見出しに使わない
- 落ち影（`0 4px 12px` 系）を使わない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。ヘッダーは SP 専用（`spheader` / `spnav`）に切り替わる |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 3〜4 カラム＋最大 1200px コンテナ |

- **SP 用に別のヘッダー・ナビ DOM を持つ**（`header.spheader` / `nav.spnav`）。単純な CSS の切り替えではなく構造ごと分岐する

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。12px のカテゴリタグは padding でタップ領域を確保する

### フォントサイズの調整

- 本文 14px は据え置き。可読性のためモバイルで 15px まで上げてよい
- Page Title 28px → モバイルでは 20〜22px、Heading 22px → 18px 程度に縮小
- **行間 2.0 はモバイルでも維持する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff / #f4f4f4 / #efefef（面）
Text:           #333333（本文） / #111111（強調） / #666666（淡い見出し）
Brand Gray:     #727171   （温かみのあるグレー。純グレーではない）
Business Blue:  #185f98   （BtoB 導線の CTA）
Alert Red:      #ff0000   （「重要なお知らせ」専用の純赤）
Category Tags:  #f1a1c4（トピックス） / #f9c681（お知らせ） / #ba7cb9（更新情報）
                #6e96ce（ショールーム） / #892890（タブ）
IR Tags:        #739f4c / #0d80b0 / #843b7b / #bb5f89 / #c28c42 / #c8ab00
Border:         #cccccc
JP Font:        "AXIS Std", "Yu Gothic", メイリオ, Meiryo, sans-serif
EN Font:        "Hind Madurai", "AXIS Std", ...
Body Size:      14px / weight 400 / lh 2.0
Heading:        weight 700 / lh 2.0（リードと淡い見出しは 1.7）
Letter Spacing: normal
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         0（KV ページネーションのみ 30px / 50%）
Container:      1200px
必須:           @font-face で "Yu Gothic" を font-weight: 500 にマッピング
```

### プロンプト例

```
サンゲツのデザインシステムに従って、インテリア内装材の商品一覧ページを作成してください。
- 和文は "AXIS Std", "Yu Gothic", メイリオ, Meiryo, sans-serif の順で指定する
- @font-face で "Yu Gothic" を src: local("Yu Gothic Medium") / font-weight: 500 にマッピングする
- 本文 14px・行間 2.0、見出しも原則 行間 2.0（リード文と淡い見出しのみ 1.7）
- letter-spacing は normal、font-feature-settings も normal（字間を触らない）
- ウェイトは 400 と 700 の二極のみ
- border-radius は 0。角丸を足さない（KV のページネーションだけ 50% / 30px）
- テキストは #333333、淡い見出しは #666666、ブランドの無彩色は #727171（純グレーにしない）
- BtoB 導線の CTA は紺青 #185f98 のソリッド、企業・IR 導線は #727171 のソリッド
- 副次ボタンは白地＋#cccccc の 1px 枠、または薄グレー面 #efefef
- お知らせのカテゴリタグは 12px で 2 形式を使い分ける:
  面色＋白抜き（#f1a1c4 トピックス / #f9c681 お知らせ / #ba7cb9 更新情報）と、
  白地＋同色 1px 枠＋同色文字（#739f4c サステナビリティ / #0d80b0 株主総会 など）
- 「重要なお知らせ」だけ純赤 #ff0000 の帯で最上位に置く（他の用途に赤は使わない）
- 影はオフセットのない淡い広がり（0 0 3px 2px #cccccc）に留め、落ち影は使わない
- コンテナ幅は最大 1200px、KV と写真セクションは全幅ブリード
```
