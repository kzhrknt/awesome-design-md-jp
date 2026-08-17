# DESIGN.md — ロート製薬（ROHTO）

> ロート製薬の公式企業サイト（https://www.rohto.co.jp/）のデザイン仕様書。
> 1899 年創業。目薬・スキンケア（肌ラボ、メンソレータム、オバジ）から再生医療・アグリまで手がける。
> コーポレートスローガンは「ロートは、ハートだ。」、企業姿勢は「ひらけ、ハート！ひらけ、ロート！」。
> 最大の特徴は **`border-radius: 9990px` という独特のピル指定**と、**ブランドブルー `#005bac` 1 色でサイト全体を駆動する**設計。有彩色はほぼ青のみで、赤 `#e60012`（ロゴのスウッシュ）は 1 箇所しか出てこない。
> 和文は **Noto Sans JP 単独**。`letter-spacing` は原則 `normal` で、**欧文の英字見出しだけ 0.05em に開く**。本文の行間は **1.8** と広い。
> ブレイクポイントは **すべて `em` 指定**（90em / 75em / 60em / 48em / 36em / 30em）。
> 実サイトの computed style 実測（2026-08-17 取得。トップページ + トップメッセージ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地にブランドブルーの面と枠だけで組む**。写真は横並びのカードで見せ、UI は角丸（8〜10px）とピルで柔らかさを出す
- **ロート製薬について**: 一般用医薬品・スキンケアの大手だが、企業サイトは製品訴求ではなく **「事業・研究・サステナビリティ・IR・採用」のコーポレート導線**が主役。手書き文字のキーメッセージ「ひらけ、ハート」だけが情緒を担う
- **密度**: 中密度・コーポレート型。メインビジュアル → ニュース（タブ切替）→ PickUP → カードセクション → グループの仲間たち → SNS → フッターナビ
- **キーワード**: `#005bac`、radius 9990px、Noto Sans JP、lh 1.8、em ベースのブレイクポイント、影を使わない
- **特徴**:
  - **`border-radius: 9990px` でピルを作る**。`9999px` でも `50rem` でもない独特の値で、実測 14 箇所に出る。ヘッダー CTA・カテゴリタグ・検索リンクがこれ
  - **角丸は 3 段階**：ピル `9990px` ／ カード `10px` ／ 汎用 `8px`。加えてタブの `4px`、`3.2px`（= 0.2rem）の小物がある
  - **有彩色はほぼ青 1 色**。`#005bac`（ブランド）／`#337cbd`（アクティブ状態）／`#227abc`（タグ・カテゴリ）／`#0d5daa`（サイドの CTA）／`#00498a`（AI 翻訳バッジ）の**同系 5 段**で強弱をつける
  - **赤 `#e60012` はロゴのスウッシュ 1 箇所のみ**。UI には一切使わない
  - **本文の `line-height` が 1.8**（16px→28.8px）。日本語コーポレートサイトとしても広い部類
  - **`font-weight` は 400 / 500 / 600 の 3 値**。**700 を使わない**。見出しは 600 止まりで、太さで押さない
  - **影を使わない**。カードは面色 `#f2f2f2` / `#f7f7f7` と角丸だけで立てる。影が出るのは翻訳ウィジェット（外部）だけ
  - **メインビジュアルの英文見出しだけ Roboto のイタリック**（`Connect for Well-being & Life`）。和文には斜体を使わない
  - セクションの区切りに **淡い青 `#ebf2f7`** の帯を敷く。白 → 淡青 → 白のリズム

---

## 2. Color Palette & Roles

> CSS Custom Properties は定義されていない。すべて直値。実装側で変数化する場合は以下の名前を使う。

### Brand Blue（青の 5 段階）

| 名前 | 値 | 用途 |
|------|----|------|
| **Brand Blue** | `#005bac` | **主要 CTA の面**、リンク文字、ナビの面、見出しリンク。**サイトの基準色** |
| **Blue Active** | `#337cbd` | グローバルナビの現在地（`#005bac` の上にさらに明るい青を重ねる） |
| **Blue Tag** | `#227abc` | カテゴリタグの枠と文字（「IR資料」「決算」「研究開発」） |
| **Blue CTA** | `#0d5daa` | サイドバーの塗り CTA（「ニュースリリース」） |
| **Blue Deep** | `#00498a` | 「Translated by AI」バッジの面 |

- **5 段の差はごくわずか**。並べても違いが分からない程度に近く、**状態差を色で強く語らない**のがロートの流儀

### Accent

- **ROHTO Red** (`#e60012`): **ロゴのスウッシュ（波線）にのみ使う**。UI・CTA・エラー表示には使わない

### Neutral（面・文字）

- **Background** (`#ffffff`): ページ地色
- **Text** (`#4d4d4d`): **`body` の文字色。純黒ではなくミディアムグレー**
- **Text Dark** (`#323232`): グローバルナビのラベル
- **Text Darkest** (`#1a1a1a`): サイドナビの現在地
- **Panel Gray** (`#f2f2f2`): カードリンクの面（「企業情報」「事業・ブランド」）
- **Panel Light** (`#f7f7f7`): サイドナビの非選択項目
- **Search Gray** (`#efefef`): 検索ボタン（円形）の面
- **Border Gray** (`#cccccc`): PageTop ボタンの枠

### Tint（淡い青の面）

- **Pale Blue** (`#ebf2f7`): **お知らせバナー・SNS セクションの帯**。白との段差をつくる主役
- **Pale Blue 2** (`#f0f3f7`): 下層ページのサイドブロック

### Semantic（意味的な色）

- **Primary / Info**: ブランドブルー `#005bac`
- **Danger／Error**: 実サイトに明示的なエラー色はない。**`#e60012` はロゴ専用なので流用せず**、`#c8102e` 等の別値を割り当てること
- **Disabled**: `#f2f2f2` の面 + `#4d4d4d` の文字

---

## 3. Typography Rules

> **Noto Sans JP 単独**。フォールバックは `sans-serif` 1 段だけ。`palt` は使わず、字間も原則 `normal`。**英文見出しだけ Roboto のイタリックで 0.05em に開く**。

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP**（`"Noto Sans JP", sans-serif`）。**Web フォント単独**で、OS 搭載フォントを一切挟まない
- ヒラギノ・游ゴシック・メイリオへのフォールバックを書いていない。**Web フォントが落ちると `sans-serif`（＝環境既定）に直行する**
- 自前実装では `"Noto Sans JP", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif` のように和文のフォールバックを足すことを推奨する
- 明朝体は使わない
- ウェイトは **400 / 500 / 600** の 3 種を読み込む

### 3.2 欧文フォント

- **サンセリフ**: **Roboto**（`Roboto, sans-serif`）。**メインビジュアルの英文見出しとセクションの英字ラベルにだけ**使う
  - `Connect for Well-being & Life`（33px / weight 500 / **italic** / ls 0.05em / 色 `#005bac`）
  - `PickUP`（36px / weight 600 / italic / ls 0.05em）
- **和文の中に混ざる欧文は Noto Sans JP のまま**。Roboto は英字だけのブロックに限る
- 「Translated by AI」バッジのみ `-apple-system` 系のシステムフォント（外部ウィジェット由来）
- 等幅フォントの指定はない

### 3.3 font-family 指定

```css
/* 本文・UI・見出し（和文） */
font-family: "Noto Sans JP", sans-serif;

/* 英文見出し・英字ラベル */
font-family: Roboto, sans-serif;
font-style: italic;
letter-spacing: 0.05em;

/* グローバル */
letter-spacing: normal;
font-feature-settings: normal;   /* palt は使わない */
```

**フォールバックの考え方**:

- **Web フォント 1 本に賭ける**方針。読み込み失敗時の見た目を保証していない
- **Roboto は「英字ブロック専用」**。和欧混植のスタックとしては使わない（`Roboto, "Noto Sans JP", …` のようには書かない）
- 欧文の斜体は Roboto にだけ許す。**和文を `font-style: italic` にしない**（合成斜体になる）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero (EN) | **Roboto** *italic* | 33px | 500 | 1.8 (59.4px) | **0.05em (1.65px)** | `Connect for Well-being & Life`。色 `#005bac` |
| Section Head | 和文 | **36px** | **600** | **1.5 (54px)** | normal | 「ニュース」「つながり、つくる、明日の社会」 |
| Section Head (EN) | **Roboto** *italic* | 36px | 600 | 1.5 (54px) | 0.05em (1.8px) | `PickUP` |
| Page Title | 和文 | 36px | 600 | 1.5 (54px) | normal | 下層ページの `h1`。**白面 + radius 16px 16px 0 0 の上に載る** |
| Hero Catch | 和文 | 24px | **600** | **1.8 (43.2px)** | normal | 「一人ひとりのポジティブなエネルギーは…」 |
| Card Head | 和文 | 24px | 600 | 1.4 (33.6px) | normal | 「グループの仲間たち」 |
| Card Link | 和文 | 20px | 400 | 1.8 (36px) | normal | 「企業情報」「事業・ブランド」。色 `#005bac` |
| Sub Head | 和文 | 20px | 500 | 1.5 (30px) | normal | サイドナビの見出し |
| Body | 和文 | **16px** | 400 | **1.8 (28.8px)** | normal | `body` 既定。色 `#4d4d4d` |
| Link | 和文 | 16px | 500 | 1.6 (25.6px) | normal | ニュース見出しリンク。色 `#005bac` |
| Sub Head (S) | 和文 | 16px | 600 | 1.2 (19.2px) | normal | 「ロート製薬公式アカウント」 |
| Nav | 和文 | 16px | 400 | 1.5 (24px) | normal | ドロワーナビ |
| Nav (current) | 和文 | 16px | **600** | 1.5 (24px) | normal | サイドナビの現在地。色 `#1a1a1a` |
| Tab | 和文 | 15px | **500** | 1.8 (27px) | normal | ニュースのタブ切替 |
| Button | 和文 | 14–15px | **500** | 1.0 (14–15px) | normal | ピル CTA |
| Meta / Date | 和文 | 14px | 400 | 1.6 (22.4px) | normal | 「2026年08月07日」 |
| Category | 和文 | 12px | 500 | 1.0 (12px) | normal | タグの文字。色 `#227abc` |
| Caption | 和文 | 12px | 400 | 1.5 (18px) | normal | 写真キャプション |

- **`font-weight: 700` を一切使わない**。最大が 600
- **見出しは 36 / 24 / 20 / 16 の 4 段**。36px から 24px への落差が大きい
- **`line-height: 1.8` が本文と大見出しの両方に効く**（16px→28.8px、24px→43.2px）。**見出しでも行間を詰めない**のがロートの特徴

### 3.5 行間・字間

- **本文の行間は 1.8**（16px→28.8px）。日本語コーポレートサイトとしても広い
- **セクション見出しは 1.5**（36px→54px）、リード（24px）は **1.8** のまま
- **字間はすべて `normal`**。例外は Roboto の英文見出しの **0.05em** だけ
- `palt` は使わない

**ガイドライン**:

- **見出しの行間を 1.2〜1.3 に詰めない**。1.5 を下回るとロートの「余裕のある」トーンが崩れる
- リード文（24px / 600 / lh 1.8）は**本文と同じ行間**で、サイズと太さだけで差をつける
- 英字ラベルを追加するときは **Roboto italic / 0.05em** で揃える

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:

- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- ニュース見出しに **`【Q＆A】2027年3月期 第１四半期 決算説明会`** のような隅付き括弧と全角英数が混在する。`word-break: break-all` にすると括弧が行頭に来るため使わない
- 「ひらけ、ハート！ひらけ、ロート！」のように**読点と感嘆符で切るコピー**が多い。行頭に `、` `！` を送らないこと
- IR 用語（`CFOメッセージ` `R&Dライブラリー`）の欧文を途中で割らない

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* 全ページ共通 */
```

- **`palt` を掛けない**。Noto Sans JP の等幅のまま組む
- 字間を触るのは Roboto の英文見出し（`letter-spacing: 0.05em`）だけで、**和文の字間には一切手を入れない**

### 3.8 縦書き

- 該当なし。全ページ横組み

---

## 4. Component Stylings

> **ピルは `9990px`、カードは `10px`、汎用は `8px`**。この 3 段を守る。

### Buttons

**Primary（ブランドブルーのピル）— ヘッダー CTA**

- Background: `#005bac`
- Text: `#ffffff`
- Border: なし
- Border Radius: **`9990px`**
- Padding: `5.6px 19.6px`
- Font: 14px / **weight 500** / lh 1.0
- 例: 「商品情報サイト」

**Secondary（枠だけのピル）**

- Background: `#ffffff`
- Text: `#005bac`
- Border: `1px solid #005bac`
- Border Radius: `9990px`
- Padding: `0 22.5px`
- Font: 15px / weight 500 / lh 1.0
- 例: 「ニュースリリース検索」

**Tag / Category Pill（極小のピル）**

- Background: `transparent`
- Text: `#227abc`
- Border: `1px solid #227abc`
- Border Radius: `9990px`
- Padding: `0 8px`
- Font: 12〜16px / weight 400–500
- 例: 「IR資料」「決算」「アライアンス」「研究開発」

**Side CTA（塗りの角丸）**

- Background: `#0d5daa`
- Text: `#ffffff`
- Border: `1px solid #0d5daa`
- Border Radius: **`5px`**
- Padding: `19.2px 16px`
- Font: 16px / weight 400 / lh 1.8
- 例: 下層ページ右カラムの「ニュースリリース」

**PageTop（円）**

- Background: `#ffffff` / Text: `#005bac`
- Border: `1px solid #cccccc` / Border Radius: **`50%`**
- 右下に固定

### Tabs（ニュースの絞り込み）

**Active**

- Background: `#005bac` / Text: `#ffffff`
- Border Radius: **`4px`** / Padding: `6px 0`
- Font: 15px / weight 500 / lh 1.8

**Inactive**

- Background: `transparent` / Text: `#4d4d4d`
- Border Radius: `4px`
- 例: 「お知らせ」「研究情報」

### Cards

**Nav Card（面色の大きいリンク）**

- Background: `#f2f2f2`
- Text: `#005bac`
- Border Radius: **`10px`**
- Padding: `20px 32px 20px 20px`（右だけ広いのは矢印の逃げ）
- Font: 20px / weight 400 / lh 1.8
- 構成: タイトル + 補足（「企業情報 / 一人ひとりの想いから生まれる価値を届けたい」）
- Shadow: **なし**

**Logo Card（グループ会社）**

- Background: `#ffffff`
- Border: `1px solid #f2f2f2` 相当の淡い罫
- Border Radius: `8px`
- ロゴを中央に配置。**画像は `object-fit: contain`**

**Page Head（下層ページの見出し面）**

- Background: `#ffffff`
- Border Radius: **`16px 16px 0 0`**（上だけ丸める）
- Padding: `54px 50px 30px`
- Font: 36px / weight 600 / lh 1.5

### Inputs（サイト内検索）

- Input: Background `#ffffff` / Border Radius **`8px 0 0 8px`** / Padding `12px 16px` / Font 16px / Height **57px**
- Button: Background `#005bac` / Text `#ffffff` / Border Radius **`0 8px 8px 0`** / Padding `16px 32px` / Height 57px
- **入力欄とボタンを 1 本のピル状にせず、8px の角丸を左右で分け合う**
- Switch Button（検索アイコン）: Background `#efefef` / Border Radius `50%`

### Sections（面色の使い分け）

| セクション | 面色 | 文字色 |
|-----------|------|--------|
| 通常のコンテンツ | `#ffffff` | `#4d4d4d` |
| お知らせバナー・SNS 帯 | **`#ebf2f7`（淡い青）** | `#4d4d4d` |
| ナビカード | `#f2f2f2` | `#005bac` |
| サイドナビ（非選択） | `#f7f7f7` | `#4d4d4d` |
| サイドナビ（現在地） | `#ffffff` | `#1a1a1a`（weight 600） |
| ドロワーナビ | `#005bac` | `#ffffff` |
| ドロワーナビ（現在地） | `#337cbd` | `#ffffff` |
| 下層ページのブロック | `#f0f3f7` | `#4d4d4d` |

---

## 5. Layout Principles

### Spacing Scale

CSS 変数はない。実測から起こすと **8 の倍数**が基本。

| Token | Value | 用途 |
|-------|-------|------|
| XS | 8px | タグの左右パディング |
| S | 16px | ボタン・カードの内側 |
| M | 24px | ナビの左右パディング |
| L | 32px | カードの右パディング、検索ボタン |
| XL | 54px | ページ見出しの上パディング |

- ボタンの `5.6px 19.6px` や `3.2px` の radius は **rem 換算の端数**（0.35rem / 1.225rem / 0.2rem）。実装時は px に丸めてよい

### Container

- **最大幅 1200px**（`directlink_list` / `top-cardSection` / `g-siteFooter_navi` / `footerCopyIn` すべて）
- **メインビジュアルのメッセージだけ 1160px**
- Padding (horizontal): 20px（`g-siteHeader`）

### Grid

- ナビカードは 2〜3 カラム（`#f2f2f2` の面 + radius 10px）
- グループ会社のロゴは 6 カラム（radius 8px の白カード）
- バナーは 5 カラム
- フッターナビは 4 カラム
- Gutter: 16〜24px

---

## 6. Depth & Elevation

**影を使わない。角丸と面色だけで階層を作る。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **カード・ボタン・タブ・ナビすべて** |
| — | `0 0 2px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.1)` | 翻訳ウィジェット（外部サービス由来）。**ロート自身の UI では使わない** |

- 奥行きは **白 `#ffffff` → 淡青 `#ebf2f7` → グレー `#f2f2f2` → ブルー `#005bac`** の面のコントラストで作る
- **角丸が「浮き」の代わり**。カード 10px、汎用 8px、ピル 9990px を使い分けることで、影なしでも要素の性格が読み分けられる

---

## 7. Do's and Don'ts

### Do（推奨）

- **有彩色を青 1 系統に絞る**。`#005bac` を基準に、`#337cbd` / `#227abc` / `#0d5daa` / `#00498a` で状態差をつける
- **ピルは `border-radius: 9990px`**、カードは `10px`、汎用は `8px`、タブは `4px`
- 和文は **Noto Sans JP**。自前実装ではヒラギノ・メイリオのフォールバックを足す
- 英字見出しだけ **Roboto の italic / letter-spacing 0.05em**
- **本文 16px / line-height 1.8**、見出し 36px / line-height 1.5 を守る
- **`font-weight` は 400 / 500 / 600 の 3 値**で組む
- セクションの区切りに **淡い青 `#ebf2f7`** の帯を敷く
- 文字色は **純黒ではなく `#4d4d4d`**
- 検索の入力欄とボタンは **`8px 0 0 8px` / `0 8px 8px 0`** で角丸を分け合う
- ブレイクポイントは **em 指定**（90 / 75 / 60 / 48 / 36 / 30em）で書く

### Don't（禁止）

- **`#e60012`（ROHTO レッド）を UI に使わない**。ロゴのスウッシュ専用
- **`font-weight: 700` を使わない**。見出しは 600 止まり
- 見出しの `line-height` を 1.5 未満に詰めない
- **影を落とさない**（カード・ボタン・ドロップダウンすべて）
- 和文に `font-style: italic` を掛けない（斜体は Roboto の英字だけ）
- `palt` を掛けない。**和文の `letter-spacing` を触らない**
- ピルの radius に `9999px` や `50%` を使わない（実サイトは **`9990px`**）
- 青の 5 段を大きく離した色に置き換えない（**差が小さいことが設計意図**）
- 文字色に純黒 `#000000` を使わない

---

## 8. Responsive Behavior

### Breakpoints

**すべて `em` 指定**（`screen and (max-width: NNem)`）。ルート 16px 換算の px を併記する。

| Name | Width | px 換算 | 説明 |
|------|-------|---------|------|
| XS | ≤ 30em | 480px | 1 カラム。カードは縦積み |
| S | ≤ 36em | 576px | ナビカードの補足テキストを省略 |
| M | ≤ 48em | 768px | **グローバルナビをドロワー（`#005bac` の面）に格納** |
| L | ≤ 60em | 960px | 2 カラム |
| XL | ≤ 75em | 1200px | コンテナ幅を 100% に |
| XXL | ≤ 90em | 1440px | 左右パディングの調整 |

- **`em` で書くとユーザーのブラウザ既定文字サイズに追随する**。px 決め打ちの実装に置き換えないこと

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- ヘッダーのピル CTA は `padding: 5.6px 19.6px` + 14px 行で **25px 程度**しかない。**モバイルでは上下 12px 以上に引き上げる**
- サイドナビの項目は `padding: 16px` + 24px 行で 56px あり十分
- 検索の入力欄・ボタンは 57px で十分

### フォントサイズの調整

- 本文 16px は据え置き（モバイルでも下げない）
- Section Head 36px → 24〜26px に縮小し、**行間 1.5 を維持**する
- Hero (EN) 33px → 22px 程度。**`letter-spacing: 0.05em` は維持する**
- Card Link 20px → 17〜18px
- Category タグの 12px は据え置き（これ以上下げない）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff
Brand Blue:     #005bac （CTA・リンク・ナビの面。サイトの基準色）
Blue Active:    #337cbd （ナビの現在地）
Blue Tag:       #227abc （カテゴリタグの枠と文字）
Blue CTA:       #0d5daa （サイドの塗り CTA）
Blue Deep:      #00498a （AI 翻訳バッジ）
ROHTO Red:      #e60012 （★ロゴのスウッシュ専用。UI には使わない）
Tint:           #ebf2f7（淡い青の帯） / #f0f3f7（下層のブロック）
Panel:          #f2f2f2（ナビカード） / #f7f7f7（サイドナビ） / #efefef（検索ボタン）
Text:           #4d4d4d（本文・純黒ではない） / #323232（ナビ） / #1a1a1a（現在地）
Border:         #005bac（枠ピル） / #227abc（タグ） / #cccccc（PageTop）

JP Font:        "Noto Sans JP", sans-serif
                （自前実装では ヒラギノ角ゴ ProN / メイリオ のフォールバックを足す）
EN Font:        Roboto, sans-serif（italic・英字ブロック専用）

Body:           16px / weight 400 / lh 1.8（28.8px） / ls normal
Section Head:   36px / weight 600 / lh 1.5（54px）
Hero (EN):      Roboto italic 33px / 500 / lh 1.8 / ls 0.05em / #005bac
Hero Catch:     24px / weight 600 / lh 1.8（43.2px）
Card Link:      20px / weight 400 / lh 1.8 / #005bac
Weight:         400 / 500 / 600 のみ（700 を使わない）
Letter Spacing: normal（Roboto の英字見出しのみ 0.05em）
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         9990px（ピル） / 10px（カード） / 8px（汎用） / 5px（側 CTA）
                / 4px（タブ） / 16px 16px 0 0（ページ見出し） / 50%（円）
Shadow:         none（全要素）
Container:      1200px（メインビジュアルのメッセージのみ 1160px）
Breakpoints:    90em / 75em / 60em / 48em / 36em / 30em（★すべて em）
```

### プロンプト例

```
ロート製薬のデザインシステムに従って、企業情報のトップページを作成してください。
- 和文は "Noto Sans JP", sans-serif（実装では ヒラギノ角ゴ ProN, メイリオ を後ろに足す）
- 英字の見出しだけ Roboto の italic / letter-spacing 0.05em / 色 #005bac
- 地は白 #ffffff、本文は 16px / weight 400 / line-height 1.8、文字色は #4d4d4d（純黒にしない）
- セクション見出しは 36px / weight 600 / line-height 1.5。font-weight 700 は使わない
- 有彩色はブランドブルー #005bac を基準に #337cbd / #227abc / #0d5daa の同系だけ
  ROHTO レッド #e60012 はロゴのスウッシュにのみ使い、UI には出さない
- ヘッダーの CTA は #005bac の塗り・白文字・border-radius 9990px・padding 5.6px 19.6px・14px / 500
- 枠だけの CTA は 1px solid #005bac の 9990px ピル、カテゴリタグは 1px solid #227abc の
  9990px ピル（12px / 500）
- ナビカードは #f2f2f2 の面 + border-radius 10px + padding 20px 32px 20px 20px、
  文字は #005bac の 20px / line-height 1.8
- ニュースのタブは選択 = #005bac の塗り + radius 4px、非選択 = 透明 + #4d4d4d
- お知らせバナーと SNS の帯は淡い青 #ebf2f7 で敷く
- 検索は入力欄 radius 8px 0 0 8px（高さ 57px）＋ ボタン #005bac の radius 0 8px 8px 0
- 影は一切使わない。奥行きは白 → #ebf2f7 → #f2f2f2 → #005bac の面と角丸だけで作る
- コンテナ幅 1200px。ブレイクポイントは em 指定（90em / 75em / 60em / 48em / 36em / 30em）
- font-feature-settings は使わない（palt なし）。和文の letter-spacing は触らない
```
