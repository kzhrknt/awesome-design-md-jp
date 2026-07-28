# DESIGN.md — 金子眼鏡（KANEKO OPTICAL）

> 金子眼鏡株式会社（https://www.kaneko-optical.co.jp/）のデザイン仕様書。
> 1958 年創業、福井県鯖江市。自社工房で職人が手作業でつくるアイウェアブランドで、「金子眼鏡店」「職人シリーズ」「SPIVVY」などのラインを持つ。
> 最大の特徴は、**欧文セリフ（Adobe Garamond Pro）と和文明朝（FOT-筑紫Aオールド明朝 Pr6 R）でナビゲーションと大見出しを組み、本文だけを Lato ＋ A-OTF 中ゴシック BBB Pr6N のサンセリフ／ゴシックに落とす**という二層構成。さらに **`letter-spacing` が全域に効き、本文で 0.06em、見出しで 0.18em、ナビで 0.09em** と、要素ごとに段階的に開く。地はトップが純黒 `#000000`、下層は `#151515` / `#d7dcde` / `#f0f0f0` と切り替わる。
> 実サイトの computed style 実測（2026-07-28 取得。トップ＋ STORY ＋ CULTURE 記事）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **黒地に一点、眼鏡だけを置く**。トップは全画面の純黒で、中央に製品写真とセリフのロゴタイプ「KANEKO OPTICAL / ESTABLISHED 1958」だけ。装飾も面色も持たず、余白と字間の広さで「手仕事の道具」としての静けさを出す
- **金子眼鏡について**: 鯖江の眼鏡産地で職人を社内に抱え、企画から製造・販売まで一貫して行う。ブランドサイトは EC ではなく**ブランドの語り（STORY / FACTORY / CULTURE）が中心**で、記事コンテンツの比重が高い
- **密度**: 低密度。トップは 1 画面 1 メッセージ。下層の記事ページのみ、行間 1.8〜2.0 の読み物として密度が上がる
- **キーワード**: 純黒の地、Adobe Garamond Pro、筑紫Aオールド明朝、中ゴシック BBB、広い字間（0.06〜0.18em）、大文字＋レタースペースの欧文、角丸ほぼ 0
- **特徴**:
  - **ナビゲーションと見出しはセリフ／明朝**（`adobe-garamond-pro` ＋ `FOT-筑紫Aオールド明朝 Pr6 R`）、**本文はサンセリフ／ゴシック**（`Lato` ＋ `a-otf-gothic-bbb-pr6n`）。**書体の系統そのものが役割の境界**になっている
  - **`letter-spacing` を段階的に開く**。本文 0.84px（14px に対し **0.06em**）／ナビ 1.26px（14px に対し **0.09em**）／大見出し 5.4px（30px に対し **0.18em**）／セカンダリボタン 1.4px（14px に対し **0.1em**）。日本語サイトとしてはかなり広い
  - **見出しは英語の大文字**（`STORY` / `PHILOSOPHY` / `BRAND` / `NEWS` / `SHARE`）。和文の大見出しはほとんど使わず、日本語は本文とキャプションに回す
  - **ページ地色がセクションで切り替わる**。トップ＝純黒 `#000000`、STORY＝`#151515`、CULTURE 記事＝ペールグレー `#d7dcde`、記事本体＝白。**黒から明るいグレーへ降りていく構成**
  - **CTA は面を持たない**。1px の細い罫線で囲んだアウトラインボタン（`VIEW MORE` / `BACK TO LIST` / `店舗一覧へ`）のみで、ベタ塗りのボタンは Cookie 同意バーの `#eaeaea` だけ
  - **角丸は原則 0**。例外は記事のタグチップ（4px）と Cookie 同意ボタン（3px）、SHOP バッジ（2px）というごく小さな値のみ
  - `font-feature-settings` は `normal`。**`palt` を使わず、`letter-spacing` を開く方向だけで字面を整える**

---

## 2. Color Palette & Roles

> 実測値。彩度を持つ色は**リンクのティール `#1890ad` だけ**。それ以外はすべて黒・グレーの無彩色で、写真の色（べっ甲・金無垢・セルロイド）を引き立てる設計。

### Base（地）

- **Ink Black** (`#000000`): トップページの地色。**上部 viewport 全域を占める純黒**。ヘッダー・フッターも同じ黒
- **Off Black** (`#151515`, rgb 21,21,21): STORY など下層ページの地色。純黒よりわずかに軟らかい黒
- **Charcoal** (`#1f2529`, rgb 31,37,41): 「PHILOSOPHY」ブロックの面色。青みを含む濃灰
- **Deep Slate** (`#242b2f`, rgb 36,43,47): 「NEWS」ブロックの面色
- **Slate** (`#545e64`, rgb 84,94,100): ブランドカード（「金子眼鏡」「SPIVVY」「職人シリーズ」）の面色。**サイトで最も出現回数の多い面色**
- **Gray Slate** (`#74787a`, rgb 116,120,122): 「BRAND」セクションの面色
- **Mid Gray** (`#8a8a8a`, rgb 138,138,138): 記事下部「関連記事」ブロックの面色

### Light Surface（明るい面）

- **Pale Blue Gray** (`#d7dcde`, rgb 215,220,222): CULTURE 記事ページの地色。**黒基調のサイトの中で読み物だけを明るい面に置く**
- **Surface Gray** (`#f0f0f0`, rgb 240,240,240): 記事のタグチップ面（`# 金子眼鏡と 仕事と 人と` 等）
- **Consent Gray** (`#eaeaea`, rgb 234,234,234): Cookie 同意ボタンの面色
- **Gray 500** (`#525252`, rgb 82,82,82): 「SHOP」バッジの面色

### Text（文字）

- **Text on Dark** (`#ffffff`): 黒地上の見出し・本文
- **Text on Light** (`#000000`): 明るい面上の見出し・本文
- **Muted** (`#c2c7cb`, rgb 194,199,203): 「SCROLL」「SHOP」など補助テキスト。冷たいグレー

### Accent（アクセント）

- **Link Teal** (`#1890ad`, rgb 24,144,173): 本文中リンクの文字色。**サイト唯一の有彩色**。青緑で、黒地・グレー地のどちらでも沈まない

### Semantic（意味的な色）

- ブランドサイトのため意味色をほぼ持たない
- **Info／Link**: `#1890ad` を流用
- **Danger／Error**: 必要な場合のみ暖色の赤（`#b03a3a` 目安）。無彩色基調を壊さないよう文字と 1px 罫に留める
- 状態表現は色ではなく**罫線の有無と文言**で行う

---

## 3. Typography Rules

> **セリフ／明朝（ナビ・見出し）とサンセリフ／ゴシック（本文）の二層構成**。`letter-spacing` を要素ごとに 0.06em → 0.09em → 0.1em → 0.18em と段階的に開き、`palt` は使わない。

### 3.1 和文フォント

- **明朝体（ナビ・ブランド表記）**: **FOT-筑紫Aオールド明朝 Pr6 R**（Fontworks）。筑紫オールド明朝系の中でも古典的な骨格を持つ書体で、ナビゲーションの「金子眼鏡」やロゴ周りの和文に使う
- **ゴシック体（本文・記事）**: **A-OTF 中ゴシック BBB Pr6N**（`a-otf-gothic-bbb-pr6n`／Morisawa）。写植由来の定番ゴシックで、本文・キャプション・記事のすべてを担当する
- **記事の一部に `ＭＳ ゴシック` 指定が残る**（CMS の入力に由来する 22px の氏名表記など）。これは**設計意図ではなく実装上のノイズ**であり、再現時は `a-otf-gothic-bbb-pr6n` に揃えること

### 3.2 欧文フォント

- **セリフ**: **Adobe Garamond Pro**（`adobe-garamond-pro`／Adobe Fonts）。ナビゲーション・大見出し（`STORY` / `PHILOSOPHY` / `BRAND`）・著作権表記に使う
- **サンセリフ**: **Lato**（Google Fonts。サイトが `fonts.googleapis.com` から `Lato:wght@400;700` を読み込んでいる）。本文・キャプションの先頭に置かれる
- **欧文が和文より先頭**。`Lato, a-otf-gothic-bbb-pr6n, sans-serif` / `adobe-garamond-pro, "FOT-筑紫Aオールド明朝 Pr6 R", serif` のいずれも欧文が先で、和欧の役割を font-family の順序で分ける
- **preview.html での注記**: `adobe-garamond-pro` は Adobe Fonts、`FOT-筑紫Aオールド明朝 Pr6 R` は Fontworks、`a-otf-gothic-bbb-pr6n` は Morisawa のライセンスフォントで、いずれもローカルの preview.html では表示できない。プレビューでは欧文セリフに **EB Garamond**（Garamond 系の Google Fonts。Adobe Garamond と同系統の骨格）、和文明朝に **Shippori Mincho**（オールド明朝寄りの字形で筑紫オールド明朝に近い）、和文ゴシックに **Noto Sans JP** を代替として用いる。欧文サンセリフの **Lato** は Google Fonts のため原典どおり使用できる。実装時は必ず原典の書体を読み込むこと

### 3.3 font-family 指定

```css
/* 本文・キャプション・記事（サンセリフ＋ゴシック） */
font-family: Lato, a-otf-gothic-bbb-pr6n, sans-serif;
letter-spacing: 0.06em;          /* 14px に対し 0.84px */
font-feature-settings: normal;

/* ナビゲーション・ブランド表記（セリフ＋明朝） */
font-family: adobe-garamond-pro, "FOT-筑紫Aオールド明朝 Pr6 R", serif;
letter-spacing: 0.09em;          /* 14px に対し 1.26px */

/* 大見出し（欧文セリフのみ。和文は使わない） */
font-family: adobe-garamond-pro, serif;
letter-spacing: 0.18em;          /* 30px に対し 5.4px */
```

**フォールバックの考え方**:
- **欧文を先頭、和文をその次、generic family を最後**の 3 段構成で統一する
- **役割の切り分けは font-family の系統で行う**。ナビ＝セリフ／明朝、本文＝サンセリフ／ゴシック。同じ階層でも領域が違えば書体系統が変わる
- 大見出しは英語のみのため和文フォントを指定していない。日本語見出しが必要な場合は `adobe-garamond-pro, "FOT-筑紫Aオールド明朝 Pr6 R", serif` を使う

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | Adobe Garamond Pro | 30px | 400 | normal | **0.18em** (5.4px) | `STORY` / `NEWS` / `BRAND`。英大文字 |
| Article Title | Lato + 中ゴシック | 24px | 700 | **1.8** (43.2px) | 0.06em (0.84px) | 記事 `h1`（和文） |
| Section Head | Adobe Garamond Pro | 18px | 600 | normal | **0.09em** (1.62px) | `PHILOSOPHY` |
| Article Sub | Lato + 中ゴシック | 18px | 700 | **1.8** (32.4px) | 0.06em | 記事 `h2`（和文） |
| Related Head | 中ゴシック BBB | 18px | 400 | normal | 0.06em | 「関連記事」 |
| Share Head | Adobe Garamond Pro | 16px | 600 | normal | **0.09em** (1.44px) | `SHARE` |
| Nav Item | Adobe Garamond Pro + 筑紫A | 14px | 600 | normal | **0.09em** (1.26px) | `FEATURE` / `STORY` / `FACTORY` |
| Body | Lato + 中ゴシック | 14px | 400 | **2.0** (28px) | 0.06em (0.84px) | 記事本文・リード |
| Body (UI) | Lato + 中ゴシック | 14px | 400 | 1.5 (21px) | 0.06em | 注意書き・キャプション |
| Small Nav | Lato + 中ゴシック | 13px | 400 | normal | 0.06em | SP ナビ・フッターリンク |
| Micro | Adobe Garamond Pro | 12px | 400 | normal | **0.1em** (1.2px) | `SCROLL` |
| Copyright | Adobe Garamond Pro | 10px | 600 | normal | **0.09em** (0.9px) | `© KANEKO OPTICAL CO.` |
| Badge | Adobe Garamond Pro | 10px | 600 | 2.0 (20px) | **0.09em** (0.9px) | `SHOP` バッジ |

- **`font-weight` は 400 / 600 / 700 の 3 段**。600 はナビと英語小見出し、700 は和文記事の見出しに限定される
- **サイズが小さいほど字間を広げない、という原則が逆転している**。10px の著作権表記でも 0.09em を維持しており、**小さい文字ほど「開いた」印象を保つ**のがこのサイトの流儀

### 3.5 行間・字間

- **行間 (line-height)**: UI・ナビは `normal`（ブラウザ既定）で詰める。**記事本文は 2.0**（14px→28px）、**記事見出しは 1.8**（24px→43.2px / 18px→32.4px）。注意書きは 1.5（14px→21px）
- **字間 (letter-spacing)**: **段階的に 4 段**
  - 本文・キャプション: **0.06em**（14px→0.84px）
  - ナビ・英語小見出し・著作権: **0.09em**（14px→1.26px / 18px→1.62px / 10px→0.9px）
  - セカンダリボタン・`SCROLL`: **0.1em**（14px→1.4px / 12px→1.2px）
  - 大見出し: **0.18em**（30px→5.4px）
- **`font-feature-settings: normal`**。`palt` は使わない

**ガイドライン**:
- **字間を 0 に戻すと金子眼鏡らしさが完全に失われる**。0.06em はサイトの最低ラインで、ここより詰めない
- 英語の大見出しは 0.18em まで開き、**単語というより「文字の列」として見せる**（`K A N E K O   O P T I C A L`）
- 和文記事は行間 2.0 を守る。字間 0.06em ＋ 行間 2.0 の組み合わせが読み物の基調

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 職人名・型番（`KV-48` など）は分割されると意味を失う。`white-space: nowrap` で保護する

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を掛けない */
letter-spacing: 0.06em;          /* 詰めるのではなく開く */
```

- **`palt` を使わない**。プロポーショナル詰めは和文を「詰める」方向の処理だが、金子眼鏡の設計思想は逆で、**`letter-spacing` で開く方向に統一**している
- セリフ／明朝を使う領域でも `palt` は掛けない。オールド明朝の骨格が持つ字面をそのまま見せる
- 欧文の `kern` はフォント既定に任せる

### 3.8 縦書き

- 該当なし。UI・記事とも横組み
- ロゴマークの「鯖江 ○○ 手造」という極小の和文は**画像として扱う**

---

## 4. Component Stylings

### Buttons

**Secondary（アウトライン。実質これが主要 CTA）**
- Background: `transparent`
- Text: `#ffffff`（黒地上）/ `#000000`（明るい面上）
- Border: `1px solid #ffffff` / `1px solid #000000`
- Padding: `0`（幅・高さはコンテナ側で確保。左に矢印がつく場合 `0 0 0 12px`）
- Border Radius: **`0px`**
- Font: Lato + 中ゴシック / 14px / weight 400 / **ls 0.1em (1.4px)**
- 例: `VIEW MORE` / `TOP PAGE` / `BACK TO LIST` / `前の記事` / `店舗一覧へ` / `店舗体験の勧め`
- **金子眼鏡には塗りつぶしの主要 CTA が存在しない**。細い罫線と広い字間だけでボタンを成立させる

**Utility（Cookie 同意など。唯一のベタ塗り）**
- Background: `#eaeaea`
- Text: `#000000`
- Padding: `7px 21px`
- Border Radius: `3px`
- Font: 14px / weight 400 / ls normal

### Badges / Chips

**Shop Badge**
- Background: `#525252`
- Text: `#c2c7cb`
- Padding: `1px 0 0`
- Border Radius: `2px`
- Font: Adobe Garamond Pro / 10px / weight 600 / ls 0.09em
- 例: `SHOP`

**Article Tag**
- Background: `#f0f0f0`
- Text: `#000000`
- Padding: `0 9px`
- Border Radius: `4px`
- Font: Lato + 中ゴシック / 14px / weight 400 / ls 0.06em
- 例: `# 金子眼鏡と 仕事と 人と` / `# 店舗` / `# 販売スタッフ`
- **タグ名の先頭に `#` を付ける**のがこのサイトの記法

### Cards（ブランド・セクション）

- Background: `#545e64`（ブランドカード）/ `#1f2529`（PHILOSOPHY）/ `#242b2f`（NEWS）/ `#74787a`（BRAND）
- Border: なし
- Border Radius: **`0px`**
- 構成: 写真 → 英語の見出し（Adobe Garamond Pro）→ 和文の説明（中ゴシック 13〜14px）
- Shadow: なし
- **カード面はすべて濃灰系のグラデーション的な階段**（`#1f2529` → `#242b2f` → `#545e64` → `#74787a`）で、明度差だけでセクションを区切る

### Inputs

- Background: `#ffffff`
- Border: `1px solid #cccccc`
- Border (focus): `1px solid #1890ad`
- Border Radius: **`0px`**
- Padding: `11px 10px`
- Font: Lato + 中ゴシック / 14px / ls 0.06em
- Text Color: `#383838` / Placeholder: `#8a8a8a`

### Links（本文中）

- Color: `#1890ad`
- Text Decoration: `underline`（本文中）／ナビは下線なし
- **有彩色はここだけ**。リンクであることを色で示す唯一の場所

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 9px |
| M | 21px |
| L | 40px |
| XL | 80px |
| XXL | 120px |

- 実測のパディングは `7px 21px` / `0 9px` / `11px 10px` に集中し、セクション間は 80〜120px の大きな余白を取る

### Container

- Max Width: **全幅ブリード**（トップの KV は 1440px のビューポート全域）
- コンテンツセクションは概ね **1000〜1200px**
- 記事本文カラムは **680px 前後**
- Padding (horizontal): 40〜80px

### Grid

- Columns: ブランドカードは 3 カラム、CULTURE の記事一覧は 3 カラム、関連記事は 3 カラム
- Gutter: 40px
- **「全画面の黒 → 濃灰のカード階段 → 明るい記事面」という縦方向のトーン設計**がレイアウトの骨格

---

## 6. Depth & Elevation

実測ではすべての要素が `box-shadow: none`。**金子眼鏡は影を一切使わない**。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。すべての要素 |
| 1 | none（明度差で表現） | カード。`#1f2529` / `#242b2f` / `#545e64` / `#74787a` の 4 段の濃灰で階層を作る |
| 2 | none（面の切り替えで表現） | 記事ページ。黒地から `#d7dcde` へ地色ごと切り替える |
| 3 | `1px solid` の罫線 | ボタン・入力欄。**影の代わりに 1px の線で輪郭を与える** |

- **奥行きは「純黒 `#000000` → `#151515` → `#1f2529` → `#545e64` → `#74787a` → `#d7dcde` → `#f0f0f0` → `#ffffff`」という 8 段の明度階段**で表現する
- 落ち影・ぼかしは使わない。眼鏡の製品写真が持つ実際の陰影と競合させないため

---

## 7. Do's and Don'ts

### Do（推奨）

- **ナビ・大見出しはセリフ／明朝（Adobe Garamond Pro ＋ 筑紫Aオールド明朝）、本文はサンセリフ／ゴシック（Lato ＋ 中ゴシック BBB）** と書体系統で役割を分ける
- **`letter-spacing` を段階的に開く**。本文 0.06em → ナビ 0.09em → ボタン 0.1em → 大見出し 0.18em
- 記事本文は **行間 2.0**、記事見出しは **1.8** を守る
- 見出しは英語の大文字（`STORY` / `PHILOSOPHY` / `BRAND`）、日本語は本文とキャプションに回す
- **角丸は 0 を基本**とし、タグ 4px / Cookie ボタン 3px / バッジ 2px という極小値だけを例外にする
- CTA は**面を持たない 1px アウトライン**で作る
- 有彩色はリンクのティール `#1890ad` に限定する
- 地色をセクションごとに切り替える（黒 → 濃灰 → ペールグレー → 白）。**明度の階段そのものがナビゲーションになる**
- 影を使わず、面の明度差と 1px の罫線で階層を作る

### Don't（禁止）

- **`letter-spacing: normal` に戻さない**。字間の広さがこのブランドの字面の前提であり、0 に戻すと別のブランドになる
- **`palt` を掛けない**。金子眼鏡は「詰める」のではなく「開く」方向で字面を整えている
- 塗りつぶしの派手な CTA ボタンを追加しない（原典に存在するベタ塗りは Cookie 同意の `#eaeaea` のみ）
- 角丸を大きくしない。**8px 以上の radius はこのサイトに存在しない**
- 影・グラデーションを足さない
- ティール `#1890ad` 以外の有彩色を UI に持ち込まない。色は製品写真（べっ甲・金無垢・セルロイド）が担当する
- 記事本文の行間を 1.6 以下にしない（0.06em の字間と組み合わさると詰まって見える）
- **`ＭＳ ゴシック` を再現しない**。実サイトの記事に残っているが CMS 由来のノイズであり、設計意図ではない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。ナビは `gnav-sp`（Lato + 中ゴシック 13〜14px）に切り替わり、**PC の明朝ナビからゴシックナビへ書体ごと変わる** |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 3 カラム＋全幅 KV。ナビは `gnav-pc`（Adobe Garamond Pro + 筑紫Aオールド明朝） |

- **PC とモバイルでナビの書体系統が変わる**のはこのサイト固有の設計。小さい画面では明朝の可読性が落ちるため、ゴシックに落としている

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- アウトラインボタンは padding が `0` のため、**コンテナ側で高さ 48px 以上を確保する**こと

### フォントサイズの調整

- 本文 14px は据え置き。記事本文はモバイルでも 14px / 行間 2.0 を維持する
- Page Title 30px → モバイルでは 22〜24px。ただし **`letter-spacing: 0.18em` は縮めない**
- ナビは 14px → 13px に落とし、字間は 0.06em に緩める

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #000000（トップ） / #151515（下層） / #d7dcde（記事） / #ffffff（記事本文）
Card Surfaces:  #1f2529 / #242b2f / #545e64 / #74787a / #8a8a8a
Light Surfaces: #f0f0f0（タグ） / #eaeaea（Cookie） / #525252（SHOPバッジ）
Text on Dark:   #ffffff / Muted #c2c7cb
Text on Light:  #000000
Link:           #1890ad   （サイト唯一の有彩色）
JP Mincho:      "FOT-筑紫Aオールド明朝 Pr6 R", serif       ← ナビ・ブランド表記
JP Gothic:      a-otf-gothic-bbb-pr6n, sans-serif         ← 本文・記事
Latin Serif:    adobe-garamond-pro, serif                 ← 大見出し・ナビ（和文より先頭）
Latin Sans:     Lato                                      ← 本文（和文より先頭）
Body Size:      14px / weight 400 / lh 2.0（記事） / lh 1.5（UI）
Weight:         400（本文） / 600（ナビ・英語小見出し） / 700（和文記事見出し）
Letter Spacing: 0.06em（本文） / 0.09em（ナビ） / 0.1em（ボタン） / 0.18em（大見出し）
Feature:        font-feature-settings: normal（palt は使わない）
Radius:         0px（基本） / 4px（タグ） / 3px（Cookie） / 2px（バッジ）
Shadow:         none（1px の罫線で代替）
```

### プロンプト例

```
金子眼鏡（KANEKO OPTICAL）のデザインシステムに従って、ブランドストーリーのページを作成してください。
- ナビゲーションと大見出しは Adobe Garamond Pro ＋ FOT-筑紫Aオールド明朝 Pr6 R（無ければ serif）、
  本文と記事は Lato ＋ A-OTF 中ゴシック BBB Pr6N（無ければ sans-serif）で組む
- font-family は必ず欧文を先頭、和文をその次、generic family を最後に置く
- letter-spacing は段階的に開く：本文 0.06em / ナビ 0.09em / ボタン 0.1em / 大見出し 0.18em
- font-feature-settings は normal。palt は掛けない（詰めるのではなく開く）
- 大見出しは英語の大文字（STORY / PHILOSOPHY / BRAND）、日本語は本文とキャプションに回す
- 記事本文は 14px・行間 2.0、記事見出しは行間 1.8
- 地色はセクションで切り替える：KV は純黒 #000000、下層は #151515、記事ページは #d7dcde
- カード面は濃灰の階段 #1f2529 / #242b2f / #545e64 / #74787a を使う
- CTA は塗りつぶさない。1px solid のアウトラインボタン（角丸 0px、ls 0.1em）だけで作る
- 記事のタグは #f0f0f0 の面・角丸 4px・先頭に # を付ける
- 本文中のリンクだけティール #1890ad にする。それ以外の有彩色は使わない
- 影は一切使わない。階層は面の明度差と 1px の罫線で作る
```
