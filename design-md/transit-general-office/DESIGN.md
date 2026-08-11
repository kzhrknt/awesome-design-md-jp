# DESIGN.md — TRANSIT GENERAL OFFICE（トランジットジェネラルオフィス）

> 株式会社トランジットホールディングス／TRANSIT GENERAL OFFICE（https://www.transit-web.com/）のデザイン仕様書。
> 1996 年創業。「bills」「LOTUS」「SIDEWALK STAND」「@Home Cafe」など 150 店舗以上のカフェ・レストラン・ホテルを企画運営する、ライフスタイルオペレーションプラットフォーマー。
> 最大の特徴は、**和文と欧文で書体・字間・ウェイトをすべて別建てにする**こと。**和文は Ryo Gothic PlusN（凛ゴシック）、欧文は Futura PT** で、**Futura は例外なく `letter-spacing: 0.1em`、和文見出しは `0.08em`、和文本文は `0.033em`** という三段の字間規律が全ページを貫く。
> 色は白地に**純黒 `#000000`** のみ。**有彩色を 1 色も持たない**モノクロームで、彩度は写真だけが担う。
> **`box-shadow` は 1 つも使わない**。区切りは `#e5e5e5` の 1px 罫と `#fafafa` / `#f2f2f2` の薄い面だけ。
> 実サイトの computed style 実測（2026-08-11 取得。トップ＋「COMPANY」ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地・モノクローム・大きな写真**。店舗写真の色が主役なので、UI からは彩度を完全に抜く。**Futura PT の広い字間**がスタイリング全体のリズムを決める
- **TRANSIT GENERAL OFFICE について**: 「遊び場を創ろう。」がタグライン。飲食・ホテル・空間プロデュースを横断する企業で、**個々のブランドは強い個性を持つが、ホールディングスのサイトは徹底して中立**。器としての中立さが意図されている
- **密度**: 低〜中密度。トップは全幅 KV → 3 分割カード → ニュース の縦積み。1 画面あたりの要素数を絞り、写真を大きく見せる
- **キーワード**: 白地、モノクローム、Ryo Gothic PlusN、Futura PT、字間の三段規律（0.033em / 0.08em / 0.1em）、ゴースト pill、影なし
- **特徴**:
  - **和文は Ryo Gothic PlusN**（`ryo-gothic-plusn`、Adobe Fonts）。Adobe のオリジナル和文ゴシックで、**字面が小さめ・ふところが締まり、欧文と混ざっても主張しすぎない**
  - **欧文は Futura PT**（`futura-pt`、Adobe Fonts）。**ウェイトは 600（Demi）で固定**。幾何学サンセリフの円と直線が、店舗写真の有機的な質感と対比を作る
  - **字間が三段に規律化されている**。**和文本文 `0.033em`（15px → 0.5px）→ 和文見出し `0.08em` → Futura PT `0.1em`**。この 3 つ以外の値をほとんど使わない
  - **Futura PT は例外なく `0.1em`**。40px でも 14px でも比率が変わらない。**サイズに関わらず字間比を固定**する
  - **`line-height: 2.0` が本文の基準**（15px → 30px）。和文見出しは 1.5、Futura は 1.27〜1.29 と締まる
  - **有彩色を 1 色も持たない**。`#000000` / `#333333` / `#2c2c2c` / `#fafafa` / `#f2f2f2` / `#e5e5e5` / `#ffffff` の 7 段のグレースケールのみ
  - **`box-shadow` は 1 つも使わない**（実測 0 件）
  - **`palt` を掛けない**（`font-feature-settings: normal`）
  - 絞り込みは **`border-radius: 25px` の「ゴースト pill」**（面色なし・`1px solid #e5e5e5`）。選択中だけ黒く塗る

---

## 2. Color Palette & Roles

> 実測値。地は純白 `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）、テキストは純黒 `#000000`。**`uniqueBackgrounds` に有彩色が 1 件も現れない**完全なモノクローム。

### Brand（ブランド）

- **Black** (`#000000`, rgb 0,0,0): **唯一の主色**。テキスト・アウトライン・選択中 pill の面・ページャーの現在位置。**このサイトは純黒を積極的に使う**（多くの日本語サイトが避ける選択を、あえて取っている）
- **Charcoal** (`#2c2c2c`, rgb 44,44,44): フッターの CONTACT ブロックの面。純黒より一段浅く、**フッターだけを黒から浮かせる**
- **Dark Gray** (`#333333`, rgb 51,51,51): ヘッダー・ナビのテキスト色。本文の純黒より一段弱い。**「今いる場所」より「行き先」を弱く見せる**

### Neutral（面・罫）

- **Background** (`#ffffff`): ページ地色。純白
- **Surface** (`#fafafa`, rgb 250,250,250): VISION / GROUP COMPANIES / BOARD MEMBERS セクションの面。**ほとんど白に見える薄さ**
- **Surface 2** (`#f2f2f2`, rgb 242,242,242): OUR BUSINESS セクションの面。`#fafafa` より一段濃い
- **Border** (`#e5e5e5`, rgb 229,229,229): ゴースト pill の枠、区切り罫
- **Scrim** (`rgba(0,0,0,0.7)`): カード写真の上に敷くオーバーレイ。**白文字を必ず読ませるための固定値**

### Semantic（意味的な色）

**サイト上に意味色は一切存在しない**（有彩色ゼロ）。フォームのバリデーション等で必要になる場合は、**モノクロームを壊さない最小限の彩度**に留める。

- **Danger／Error**: 低彩度の赤（`#a3352e` 目安）。鮮やかな赤を使うとモノクロームが崩壊する
- **Warning**: グレースケールのまま**太字と枠線**で示すのが本来の作法。色に頼らない
- **Success**: 低彩度の緑（`#3f6b48` 目安）
- **非活性**: `#e5e5e5` の枠 ＋ `#999999` の文字

---

## 3. Typography Rules

> **和文と欧文を完全に別建てにする**。Ryo Gothic PlusN（和文）と Futura PT（欧文）で、書体・ウェイト・字間・行間のすべてを分ける。**字間は 0.033em / 0.08em / 0.1em の三段**しか使わない。

### 3.1 和文フォント

- **本文・見出し・UI すべて**: **Ryo Gothic PlusN**（`ryo-gothic-plusn`、Adobe Fonts）。Adobe が開発したオリジナル和文ゴシック（凛ゴシック）。**字面が小さめでふところが締まり、欧文と混植しても和文だけが太って見えない**
- **ウェイト**: **400（本文）/ 600 / 700（見出し）** の 3 段
- **フォールバック**: `sans-serif` のみ。**`ryo-gothic-plusn, sans-serif` という 2 段の極端に短いチェーン**
- 一部の UI パーツ（ハンバーガー・アイコンラベル）のみ `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif` の別スタックを使う。**本文系には持ち込まない**
- **実装時は必ず Adobe Fonts のキットを読み込むこと**。フォールバック側の設計がないため、外れると印象が大きく変わる

### 3.2 欧文フォント

- **Futura PT**（`futura-pt`、Adobe Fonts）。**ウェイトは 600（Demi）で固定**
- **`letter-spacing` は例外なく `0.1em`**。40px → 4px / 30px → 3px / 18px → 1.8px / 16px → 1.6px / 14px → 1.4px。**サイズが変わっても比率が変わらない**
- **`line-height` は 1.27〜1.29**。和文（2.0）と比べて極端に締める
- 用途: グローバルナビ（HOME / COMPANY / BUSINESS / BRANDS / NEWS / RECRUIT / CONTACT）、セクション見出し（NEWS / VISION / COMPANY PROFILE / CONTACT）、日付（2026.08.06）、人名のローマ字（SADAHIRO NAKAMURA）、コピーライト
- **見出しは「Futura PT の英字を大きく、Ryo Gothic の和文を小さく」の 2 段組**。英字が主で和文が従
- 等幅フォントは使わない
- **preview.html での注記**: `ryo-gothic-plusn`（凛ゴシック）/ `futura-pt`（Futura PT）はいずれも Adobe Fonts のドメインライセンスのため、ローカルの preview.html では表示できない。プレビューでは **Google Fonts の `Zen Kaku Gothic New`（400 / 500 / 700）を和文の代替**、**`Jost`（600）を Futura PT の代替**に用いる。Jost は Futura を参照した幾何学サンセリフで、円と直線の構成が最も近い。実装時は必ず Adobe Fonts を読み込むこと

### 3.3 font-family 指定

```css
/* 和文（本文・見出し・UI） */
font-family: ryo-gothic-plusn, sans-serif;

/* 欧文（ナビ・セクション見出し・日付） */
font-family: futura-pt, sans-serif;

/* アイコンラベル等の一部 UI（本文系には使わない） */
font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
             "Hiragino Sans", sans-serif;

/* body の既定 */
font-size: 15px;
font-weight: 400;
line-height: 2.0;              /* 30px */
letter-spacing: 0.5px;         /* = 0.033em */
color: #000000;
font-feature-settings: normal; /* palt は使わない */
```

**フォールバックの考え方**:
- **チェーンを伸ばさない**。`sans-serif` で即座に締める
- **和文と欧文を 1 つのスタックに混ぜない**。`font-family` を要素ごとに切り替える設計で、**フォールバックによる自動的な和欧分担に頼らない**
- **Futura PT を和文に当てない**（和文グリフを持たないため、和文が `sans-serif` に落ちて崩れる）
- 和文に **Futura PT を混ぜたスタックを書かない**。必ず `ryo-gothic-plusn` 単独で指定する

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Footer Head (EN) | **Futura PT** | 49px | 600 | 1.29 (63px) | **0.1em (4.9px)** | "CONTACT" |
| Page Title (EN) | **Futura PT** | 40px | 600 | 1.27 (50.7px) | **0.1em (4px)** | "COMPANY" |
| Statement (JP) | Ryo Gothic PlusN | 38px | **700** | 1.55 (59px) | **0.08em (3.04px)** | 「新しいライフスタイルの創出」 |
| Lead Head (JP) | Ryo Gothic PlusN | 32px | **700** | 1.5 (48px) | **0.08em (2.56px)** | 「新しいライフスタイルを生む仕事」 |
| Section Head (EN) | **Futura PT** | 30px | 600 | 1.27 (38px) | **0.1em (3px)** | "NEWS" / "COMPANY PROFILE" |
| Sub Head (JP) | Ryo Gothic PlusN | 30px | **700** | 1.5 (45px) | **0.08em (2.4px)** | 「ライフスタイルオペレーションプラットフォーマー」 |
| Card Label (EN) | **Futura PT** | 25px | 600 | 1.27 (31.7px) | **0.1em (2.5px)** | "TOP MESSAGE"（写真上の白文字） |
| Category (EN) | **Futura PT** | 24px | 600 | 1.29 (31px) | **0.1em (2.4px)** | "CREATIVE" |
| Card Label (JP) | Ryo Gothic PlusN | 18px | **700** | 2.0 (36px) | 0.028em (0.5px) | 「メッセージ」（写真上の白文字） |
| Person Title (JP) | Ryo Gothic PlusN | 18px | **700** | 1.5 (27px) | 0.028em (0.5px) | 「代表取締役社長 CEO 中村 貞裕」 |
| Sub Head (EN) | **Futura PT** | 18px | 600 | 1.28 (23px) | **0.1em (1.8px)** | "PRODUCE & OPERATIONS" |
| Date (EN) | **Futura PT** | 18px | 600 | 1.5 (27px) | **0.1em (1.8px)** | "2026.08.06" |
| Category (JP) | Ryo Gothic PlusN | 16px | **700** | 1.56 (25px) | 0.031em (0.5px) | 「クリエイティブ」 |
| Nav (EN) | **Futura PT** | 16px | 600 | 2.0 (32px) | **0.1em (1.6px)** | "HOME" / "COMPANY" |
| Body | Ryo Gothic PlusN | 15px | 400 | **2.0 (30px)** | **0.033em (0.5px)** | `body` の基準 |
| Body (Dense) | Ryo Gothic PlusN | 15px | 400 | 1.75 (26.2px) | 0.033em (0.5px) | 長文の説明段落 |
| Link Label (JP) | Ryo Gothic PlusN | 15px | **700** | 2.0 (30px) | 0.033em (0.5px) | 「詳しくはこちら」「すべて」 |
| Person Name (EN) | **Futura PT** | 14px | 600 | 1.29 (18px) | **0.1em (1.4px)** | "SADAHIRO NAKAMURA" |
| Footer Nav (EN) | **Futura PT** | 14px | 600 | 1.29 (18px) | **0.1em (1.4px)** | フッターのサイトマップ |
| Tag (JP) | Ryo Gothic PlusN | 14px | **700** | 1.2 (16.8px) | 0.036em (0.5px) | 「グループ情報」（枠バッジ） |
| Chip (JP) | Ryo Gothic PlusN | 13px | **700** | 2.0 (26px) | 0.038em (0.5px) | ゴースト pill のラベル |
| Note (JP) | Ryo Gothic PlusN | 13px | 400 | 1.44 (18.76px) | **-0.01em (-0.13px)** | フッターの補足。**唯一の負の字間** |
| Copyright (EN) | **Futura PT** | 10px | 600 | 2.0 (20px) | **0.1em (1px)** | "© TRANSIT HOLDINGS INC." |

- **字間は三段しかない**: 和文本文 **0.033em** / 和文見出し **0.08em** / Futura PT **0.1em**
- **Futura PT の `0.1em` はサイズを問わず一定**。49px でも 10px でも比率が変わらない
- **和文見出しは必ず weight 700**。600 は Futura PT 専用
- **`line-height` は 和文本文 2.0 / 和文見出し 1.5 / Futura PT 1.27〜1.29** の三段

### 3.5 行間・字間

- **本文の行間 (line-height)**: **2.0**（15px → 30px）。長文の説明段落だけ 1.75 に締める
- **和文見出しの行間**: **1.5**（32px → 48px / 30px → 45px）。38px の Statement のみ 1.55
- **Futura PT の行間**: **1.27〜1.29**。和文の 2.0 と比べて極端に締め、**英字ブロックを塊として見せる**
- **字間 (letter-spacing)**: **三段の規律**
  - **和文本文: 0.033em**（15px → 0.5px）。実装上は `letter-spacing: 0.5px` の px 固定
  - **和文見出し: 0.08em**（38px → 3.04px / 32px → 2.56px / 30px → 2.4px）
  - **Futura PT: 0.1em**（全サイズ共通）
  - 例外はフッターの補足文のみ **-0.01em**
- **`palt` は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- **字間の三段（0.033 / 0.08 / 0.1em）以外の値を作らない**。これがサイト全体のリズムを保っている
- **Futura PT には必ず 0.1em を当てる**。サイズを変えても字間比は変えない
- **和文の見出しは字間を 0.08em まで開き、weight を 700 にする**。この 2 つはセットで動く
- **行間で和欧を分ける**。和文 2.0 / 欧文 1.27〜1.29。**同じブロックに置いても行送りを揃えない**
- 本文の行間 2.0 を下回らない（長文でも 1.75 まで）

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 店舗・ブランド名は『L'AS TOKYO』のようにアポストロフィを含む欧文が二重かぎ括弧に入る。**括弧の前後と欧文内部では改行させない**
- 「ライフスタイルオペレーションプラットフォーマー」のような長いカタカナ語は、**意味の切れ目（ライフスタイル／オペレーション／プラットフォーマー）で折る**
- 日付（`2026.08.06`）とカテゴリバッジは同じ行に置き、間で折らない
- **Futura PT の英字見出しは絶対に折らない**（`white-space: nowrap`）。字間 0.1em の塊としての見え方が崩れる

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を掛けない */
```

- **`palt` は使わない**。Ryo Gothic PlusN の等幅の字面をそのまま使う
- **Ryo Gothic PlusN は元々字面が小さめ**なので、`palt` で詰めると隙間が空きすぎて逆に読みにくくなる。字間は `letter-spacing` を**開く方向でのみ**調整する
- **和欧が別書体**なので、混植部分では `kern` が効かない。**和文と欧文を同じ行に混ぜず、行またはブロックで分ける**設計にする

### 3.8 縦書き

- 現行サイトは全面横組み（`writing-mode: horizontal-tb`）
- 店舗紹介や理念ページで縦組みを見せる場合は以下

```css
writing-mode: vertical-rl;
text-orientation: mixed;
font-family: ryo-gothic-plusn, sans-serif;
letter-spacing: 0.08em;   /* 縦組みは見出しの字間に揃える */
line-height: 2.0;
```

- **Futura PT は縦組みに使わない**（幾何学サンセリフは縦中横で破綻する）。縦組み中の英字・数字は `text-combine-upright: all` で 2 桁までを縦中横にする

---

## 4. Component Stylings

### Buttons

**Ghost Pill（絞り込みチップ）** — このサイトを象徴する形

- Background: **`transparent`**（面色を持たない）
- Text: `#000000`
- Border: **`1px solid #e5e5e5`**
- Padding: `10px 24px`
- Border Radius: **`25px`**
- Font: Ryo Gothic PlusN / 13〜15px / **weight 700** / lh 2.0 / ls 0.5px
- 例: 「すべて」「ニュースリリース」「メディア掲載」「グループ情報」「お知らせ」／「会社概要」「トップメッセージ」「ビジョン」「グループ会社」「沿革」
- **選択中は面を `#000000` に塗り、文字を `#ffffff` に反転**する。枠は消す
- **面色を持たないのが既定**。塗るのは選択中の 1 つだけ

**Text Button（矢印つきテキストリンク）**

- Background: `transparent`
- Text: `#000000`
- Border: なし
- Border Radius: `6px`（当たり判定の角丸。視覚的には見えない）
- Font: Ryo Gothic PlusN / 18px / **weight 700**
- 左に `›` を円で囲んだアイコンを置く
- 例: 「ニュースを詳しく見る」「ビジョンを詳しく見る」「採用情報を見る」

**Back to Top（大きなピル）**

- Background: `transparent`
- Text: `#000000`
- Border: **`1px solid #000000`**
- Border Radius: **`35px`**
- Font: Ryo Gothic PlusN / 18px / weight 700（見出し側は Futura PT 30px / ls 0.1em）
- 例: 「トップページに戻る」

### Badges

**Category Tag（白地・矩形）**

- Background: `#ffffff`
- Text: `#000000`
- Border: **`1px solid #000000`**
- Padding: `0 9px`
- Border Radius: **`0px`** — **pill と矩形を役割で分ける**
- Font: Ryo Gothic PlusN / 14px / **weight 700** / lh 1.2
- 例: 「グループ情報」「ニュースリリース」「メディア掲載」
- **絞り込みは pill（radius 25px）、記事の属性表示は矩形（radius 0）**

### Pagination（円）

- Background: `transparent`（非選択）/ **`#000000`**（選択中）
- Border: **`1px solid #000000`**
- Border Radius: **`50%`**
- サイズ: 10px × 10px 前後
- KV カルーセルのインジケーター

### Inputs

- Background: `#ffffff`
- Border: `1px solid #e5e5e5`
- Border (focus): `1px solid #000000`
- Border Radius: **`0px`**
- Padding: `14px 16px`
- Font: Ryo Gothic PlusN / 15px / weight 400 / lh 2.0 / ls 0.5px
- Text Color: `#000000` / Placeholder: `#999999`
- ラベルは Futura PT / 14px / weight 600 / **ls 0.1em** で入力欄の上に置く

### Cards（写真カード）

- Background: 写真
- Overlay: **`rgba(0,0,0,0.7)`** のスクリム（**固定値**。写真の明度に関わらず必ず掛ける）
- Border: なし
- Border Radius: **`0px`**
- 構成（**中央寄せの 2 段組**）:
  - 上段: **Futura PT / 25px / weight 600 / ls 0.1em / `#ffffff`**（"TOP MESSAGE"）
  - 下段: **Ryo Gothic PlusN / 18px / weight 700 / lh 2.0 / `#ffffff`**（「メッセージ」）、左に `›` の円アイコン
- **英字が主、和文が従**。英字を大きく上に、和文を小さく下に置く

### Section Heading（英字主・和文従の 2 段組）

サイトを通じて使われる定型。**福光屋（和文主・英字従）とは逆の構成**。

```html
<h2 class="en">COMPANY PROFILE</h2>
<p class="ja">会社概要</p>
```

- 上段: **Futura PT / 30px / weight 600 / lh 1.27 / ls 0.1em / `#000000`**
- 下段: **Ryo Gothic PlusN / 15〜16px / weight 700 / ls 0.5px / `#000000`**
- **英字を大きく、和文を小さく**。英字が意味の主役

### Footer CONTACT Block

- Background: **`#2c2c2c`**（純黒ではなく一段浅い炭色）
- 見出し: **Futura PT / 49px / weight 600 / ls 0.1em / `#ffffff`**（"CONTACT"）
- 主文: Ryo Gothic PlusN / 18px / weight 700 / lh 2.0 / `#ffffff`
- 補足: Ryo Gothic PlusN / 13px / weight 400 / lh 1.44 / **ls -0.13px** / `#ffffff`
- リンク: Ryo Gothic PlusN / 15px / weight 700 / `#ffffff`
- コピーライト: Futura PT / 10px / weight 600 / **ls 0.1em** / `#ffffff`

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 6px |
| S | 10px |
| M | 16px |
| L | 24px |
| XL | 48px |
| XXL | 80px |
| XXXL | 120px |

### Container

- Max Width: **1280px**（サイト全体の標準コンテナ）
- 読み物カラム: **760px**
- Padding (horizontal): 24〜48px
- **KV は左右に 48px の余白を残して置く**（全幅ブリードにしない）。上下は全幅
- ヘッダーは全幅・白地・不透過。KV に重ねない

### Grid

- Columns: トップの導線カードは **3 カラム**、役員紹介は 3〜4 カラム、ニュースは 1 カラムのリスト
- Gutter: 24px
- **セクションの面色で区切る**: 白 `#ffffff` → `#fafafa` → `#f2f2f2` の 3 段を交互に敷く
- ゴースト pill の絞り込みは**右寄せ**でリストの上に置く

---

## 6. Depth & Elevation

**実測の `box-shadow` は 0 件**。このサイトは影を一切使わない。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべて**。白地・薄い面・1px の罫だけで構成する |
| — | `rgba(0,0,0,0.7)` | 写真カードのスクリム（影ではなくオーバーレイ。**固定値**） |

- 奥行きは **`#ffffff` → `#fafafa` → `#f2f2f2` → `#2c2c2c` の 4 段の面**と**1px の罫 `#e5e5e5`** だけで表現する
- **落ち影・浮き上がりを作らない**。カードもボタンも完全にフラット
- 写真の上に文字を置くときは**必ず `rgba(0,0,0,0.7)` のスクリム**を掛ける。写真の明度に応じて濃度を変えない（固定値で運用する）

---

## 7. Do's and Don'ts

### Do（推奨）

- **和文は Ryo Gothic PlusN、欧文は Futura PT** で、`font-family` を要素ごとに切り替える
- **字間は三段（和文本文 0.033em / 和文見出し 0.08em / Futura PT 0.1em）だけ**を使う
- **Futura PT には必ず `letter-spacing: 0.1em`**。サイズが変わっても比率を変えない
- **Futura PT のウェイトは 600 で固定**する
- **和文見出しは weight 700 ＋ ls 0.08em** のセットで作る
- **行間で和欧を分ける**。和文 2.0（見出し 1.5）/ Futura PT 1.27〜1.29
- セクション見出しは**「Futura PT 30px を大きく上、和文 15〜16px を小さく下」の 2 段組**（英字が主）
- 絞り込みは**面色を持たないゴースト pill（radius 25px / `1px solid #e5e5e5`）**。選択中だけ黒く塗る
- 記事の属性表示は**矩形バッジ（radius 0 / `1px solid #000000`）**。pill と役割で分ける
- **有彩色を使わない**。`#000000` / `#2c2c2c` / `#333333` / `#fafafa` / `#f2f2f2` / `#e5e5e5` / `#ffffff` の 7 段で通す
- **純黒 `#000000` を積極的に使う**（このサイトは黒を避けない）
- セクションの区切りは**面色の 3 段（白 → `#fafafa` → `#f2f2f2`）**で作る
- 写真上の文字には**必ず `rgba(0,0,0,0.7)` のスクリム**を掛ける
- **影を使わない**。面色と 1px の罫だけで構成する
- **Adobe Fonts のキットを必ず読み込む**（フォールバックが `sans-serif` だけのため）

### Don't（禁止）

- **和文と欧文を 1 つの `font-family` スタックに混ぜない**（必ず要素ごとに切り替える）
- **Futura PT を和文に当てない**（和文グリフを持たないため `sans-serif` に落ちて崩れる）
- **Futura PT の字間を 0.1em から動かさない**（サイズ別に調整しない）
- **Futura PT のウェイトを 600 以外にしない**
- **字間の三段以外の値を作らない**（0.05em や 0.15em を挟むとリズムが崩れる）
- **和文と欧文の行送りを揃えない**（和文 2.0 / 欧文 1.29 の差がこのサイトの手触り）
- **和文の見出しを weight 600 にしない**（600 は Futura PT 専用。和文見出しは 700）
- **有彩色を足さない**（`uniqueBackgrounds` に有彩色が 1 件も無い設計）
- **セクション見出しを「和文主・英字従」にしない**（このサイトは英字が主）
- **ゴースト pill に面色を与えない**（塗るのは選択中の 1 つだけ）
- **絞り込みチップに矩形を使わない／属性バッジに pill を使わない**（形で役割を分ける）
- **写真上のスクリムの濃度を写真ごとに変えない**（`rgba(0,0,0,0.7)` の固定値）
- `palt` を掛けない、字間を詰める方向に動かさない
- **影を作らない**（`box-shadow` の実測は 0 件）
- 本文の行間を 1.75 未満にしない
- **Futura PT の英字見出しを折り返させない**（`white-space: nowrap`）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。グローバルナビはドロワー、ゴースト pill は横スクロールの 1 行に |
| Tablet | 768–1024px | 2 カラム。導線カードは 2 列 |
| Desktop | > 1024px | 3 カラム＋最大 1280px コンテナ |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）。ゴースト pill は **padding `10px 24px` で高さ 44px** を確保する
- 写真カードは**カード全体をタップ領域**にする
- ページャーの円（10px）は**当たり判定を 44px に広げる**（見た目は 10px のまま）
- モバイルでは pill の列を横スクロールさせ、**折り返して 2 行にしない**

### フォントサイズの調整

- 本文 15px は据え置く（14px を下回らない）
- Futura PT の Page Title 40px → モバイルでは 26〜28px。**`letter-spacing: 0.1em` は維持する**
- 和文 Statement 38px → 22〜24px。**`letter-spacing: 0.08em` と weight 700 は維持する**
- Futura PT のナビ 16px は縮めない
- Copyright 10px は縮めない（`ls 0.1em` も維持）
- **字間の三段と行間（和文 2.0 / 欧文 1.29）はモバイルでも維持する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff   （純白）
Black:          #000000   （唯一の主色。テキスト・枠・選択中の面）
Charcoal:       #2c2c2c   （フッター CONTACT ブロックの面）
Dark Gray:      #333333   （ヘッダー・ナビのテキスト）
Surface:        #fafafa   （VISION / GROUP COMPANIES セクションの面）
Surface 2:      #f2f2f2   （OUR BUSINESS セクションの面）
Border:         #e5e5e5   （ゴースト pill の枠・区切り罫）
Scrim:          rgba(0,0,0,0.7)   （写真上の固定オーバーレイ）
有彩色:          なし（実測 0 件）
JP:             ryo-gothic-plusn, sans-serif   ← 凛ゴシック（weight 400 / 700）
EN:             futura-pt, sans-serif          ← Futura PT（weight 600 固定 / ls 0.1em）
Body:           15px / weight 400 / lh 2.0 / ls 0.033em (0.5px)
JP Heading:     weight 700 / lh 1.5 / ls 0.08em
EN Heading:     Futura PT weight 600 / lh 1.27〜1.29 / ls 0.1em
Section Head:   Futura PT 30px（主）＋ 和文 15〜16px / weight 700（従）
Letter Spacing: 三段だけ — 和文本文 0.033em / 和文見出し 0.08em / Futura 0.1em
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         ゴースト pill 25px / Back to Top 35px / ページャー 50% / それ以外 0
Shadow:         none（実測 0 件。面色と 1px 罫だけ）
Container:      1280px（読み物 760px）
```

### プロンプト例

```
TRANSIT GENERAL OFFICE のデザインシステムに従って、飲食ブランドの一覧ページを作成してください。
- 和文は ryo-gothic-plusn（凛ゴシック。無ければ Zen Kaku Gothic New → sans-serif）、
  欧文は futura-pt（無ければ Jost → sans-serif）。1 つのスタックに混ぜず、
  要素ごとに font-family を切り替える
- letter-spacing は三段だけ使う：和文本文 0.033em（15px → 0.5px）/
  和文見出し 0.08em / Futura PT 0.1em。この 3 つ以外の値を作らない
- Futura PT は letter-spacing 0.1em・font-weight 600 で固定。サイズを変えても
  字間比とウェイトは変えない
- 和文見出しは font-weight 700 ＋ letter-spacing 0.08em のセットで作る
- 行間は和文 2.0（見出し 1.5）、Futura PT 1.27〜1.29。同じブロックでも行送りを揃えない
- セクション見出しは「Futura PT 30px を大きく上、和文 15〜16px / weight 700 を小さく下」
  の 2 段組（英字が主、和文が従）
- 絞り込みは面色を持たないゴースト pill：transparent / 1px solid #e5e5e5 /
  border-radius 25px / padding 10px 24px / 和文 13px weight 700。
  選択中だけ #000000 に塗って文字を白に反転し、枠を消す
- 記事の属性表示は矩形バッジ：#ffffff / 1px solid #000000 / border-radius 0 /
  14px weight 700。pill と矩形を役割で分ける
- 有彩色は 1 色も使わない。#000000 / #2c2c2c / #333333 / #fafafa / #f2f2f2 /
  #e5e5e5 / #ffffff の 7 段で通す（純黒は避けずに積極的に使う）
- セクションの区切りは面色の 3 段（白 → #fafafa → #f2f2f2）を交互に敷いて作る
- 写真の上に文字を置くときは必ず rgba(0,0,0,0.7) のスクリムを掛ける（濃度は固定）
- box-shadow は一切使わない。奥行きは面色と 1px solid #e5e5e5 の罫だけで作る
- Futura PT の英字見出しは white-space: nowrap で折り返させない
- コンテナ幅は最大 1280px、読み物カラムは 760px
- font-feature-settings は normal（palt は掛けない）
```
