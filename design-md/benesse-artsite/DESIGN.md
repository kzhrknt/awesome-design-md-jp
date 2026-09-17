# DESIGN.md — ベネッセアートサイト直島（Benesse Art Site Naoshima）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-17 / 対象: `https://benesse-artsite.jp/`, `/art/chichu.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **サイト全体を明朝 1 書体で組む。** 角丸ゼロ、影ほぼゼロ、面は白とごく薄いグレーだけ。文字は小さく（本文 14px・ラベル 12px）、写真を大きく置く
- **密度**: 中〜高。トップの可視テキストは 230 要素、施設ページは 328 要素。文字を小さく詰め、行間 1.5 で整える
- **キーワード**: I-OTF-UD明朝、ウェイト1本、角丸ゼロ、瀬戸内ブルー、px 直書き

**このサイトの核心は 5 つある。**

1. **和文も欧文も `"I-OTF-UD明朝Pro R"` だけ。** `font-family` の宣言が**この 1 語だけでフォールバックが無い**（可視 217/230 要素）。ナビも本文もボタンも日付も、すべて同じ明朝。例外はカルーセルの数字 13 要素の `Arial` と、施設ページの定義リスト 20 要素だけ
2. **ウェイトが実質 1 本しかない。** `@font-face` は `I-OTF-UD明朝Pro R`（**R＝Regular の書体名なのに `font-weight: bold` で宣言されている**）1 つだけ。トップの実測は **400 が 220 要素 / 500 が 10 要素で、700 は 0 要素**。**太さで階層を作らない設計**
3. **CSS Custom Properties が 0 個。** トップも施設ページも `own: 0 / platform: 0`。**すべて px の直書き**
4. **ページの地色は白ではない。** `pageBackground.resolved` は `body` 由来の `rgb(255,255,255)` だが、ビューポート面積で最大なのは **`main.g-main` の `#f5f5f5`（1,296,000px²）**。**コンテンツの地色は `#f5f5f5`**
5. **`letter-spacing` は `normal` が既定（185/230 要素）。字間を空けるのは見出しだけ**（`1.4px` / `1.6px` / `1.8px` / 縦組み `6px`）

**`font-feature-settings` は 1 要素も使っていない**（`palt` 0 件）。UD明朝の素の字送りをそのまま使う。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **予約ブルー（面）** | **`#3799cc`** | **面 10 要素**。`宿泊予約` `美術館予約` のヘッダーボタン、`詳しく見る` のアイコン面 |
| **リンクブルー（文字・枠）** | **`#3d9fd2`** | 文字 1 要素 ＋ 施設ページの `オンラインチケットの購入はこちら` の **枠と面**。`こちら` のインラインリンク |

> **青が 2 つある。** `#3799cc`（面）と `#3d9fd2`（文字・枠）で **rgb(55,153,204) と rgb(61,159,210)** ——数値がわずかに違うだけで役割が分かれている。**実装の実態としてそうなっているので、既存ページに合わせるなら 2 色を使い分ける。新規に組むなら `#3799cc` に寄せてよい。**

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Text Primary** | **`#000000`** | **可視 182 要素**。**このサイトは本文に純黒を使う** |
| Text Secondary | `#333333` | 可視 24 要素。お知らせ帯・`MENU`・施設ページ CTA の文字 |
| Text on Dark | `#ffffff` | 青面・黒面の上（7 要素） |
| **Content Background** | **`#f5f5f5`** | **`main` の地色。ビューポート最大面積**。プランのタグ面にも使う |
| Page Background | `#ffffff` | `body`（`pageBackground.resolved`） |
| Surface Gray | `#d8d8d8` | `よくあるご質問` ボタン、施設ページの `アートのご紹介` `建築のご紹介` |
| Surface Gray Light | `#e0e0e0` | `半日` `1泊2日` のタグ |
| Carousel Dot | `#bababa` | ページネーションの非選択（選択は `#000000`） |
| Column BG (施設) | `#eeeeee` / `#dddddd` | 施設ページの左右 2 カラム |

### Semantic

- **Alert Red** (`#ff0000`): **純赤**。休館のお知らせ日付など、可視 2 要素のみ。**使用は極めて限定的**

---

## 3. Typography Rules

### 3.1 和文フォント

- **明朝体（サイト唯一の書体）**: **`I-OTF-UD明朝Pro R`**（イワタ UD明朝 Pro Regular、**FONTPLUS 配信**）。`document.fonts` で `loaded`
- **ゴシック体（施設ページの定義リストのみ）**: 游ゴシック（可視 20 要素）
- **`@font-face` は 2 本だけ**：`fpbf_ac93d8111`（FONTPLUS の難読化されたサブセット名、`loaded`）と `I-OTF-UD明朝Pro R`（`font-weight: bold` で宣言、`loaded`）

> **`I-OTF-UD明朝Pro R` は Regular の書体名なのに `font-weight: bold` で `@font-face` が宣言されている。** 結果として **`font-weight: 400` を指定しても `700` を指定しても同じ Regular のファイルが当たり、太さが変わらない。** 施設ページの CTA が `font-weight: 700` を持っているが、**画面上は太くならない**（合成ボールドも発生しない）。**太さで階層を作れないサイト**と理解して組むこと。

### 3.2 欧文フォント

- **専用の欧文フォントは持たない。** `Language` `MENU` `English` などのラテン文字も UD明朝の欧文グリフをそのまま使う
- 例外：**カルーセルのページ番号 13 要素だけ `Arial`**（`font-size: 0px` で視覚的には隠され、ドットに置き換えられている）

### 3.3 font-family 指定

```css
/* サイト全体（本文・見出し・UI・数字すべて） */
font-family: "I-OTF-UD明朝Pro R";

/* 施設ページの定義リスト（開催日・所要時間・定員）だけゴシック */
font-family: 游ゴシック, YuGothic, "Hiragino Kaku ProN", メイリオ, sans-serif;
```

**フォールバックの考え方**:
- **実サイトは本文にフォールバックを一切書いていない。** `"I-OTF-UD明朝Pro R"` が読み込めなければブラウザ既定の書体（多くの環境でゴシック）に落ちる
- **新規に組むなら `"I-OTF-UD明朝Pro R", "ヒラギノ明朝 ProN", "Hiragino Mincho ProN", "游明朝", YuMincho, serif` と続けること。** 最低限 `serif` は置く。**明朝を意図した面がゴシックに落ちると設計が別物になる**
- **実サイトのゴシック指定には誤りがある。** 定義リストの `"Hiragino Kaku ProN"` は**存在しないフォント名**で、正しくは **`"Hiragino Kaku Gothic ProN"`**。macOS では当たらず `メイリオ` も無いので `sans-serif` に落ちている。さらに `font-weight: 900` は游ゴシックに存在せず**合成ボールド**になる。**新規実装では `"Hiragino Kaku Gothic ProN"` と正しく書き、weight は 500〜700 に留めること**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Vertical Heading** | UD明朝 | **30px** | 400 | **1.00** | **`6px`（0.2em）** | **`writing-mode: vertical-rl`。`アートと暮らす島々へ。`** |
| Nav Heading | UD明朝 | 30px | 400 | 1.12 | **`1.8px`（0.06em）** | `ご来島の方へ` `島×アートの魅力`（8 要素） |
| Feature Heading | UD明朝 | 22px | 400 | 1.40 | — | `アートを巡る` `島時間をたのしむ` |
| Story Heading | UD明朝 | 20px | 400 | 1.30 | `1.6px`（0.08em） | `お知らせ`、読み物の見出し |
| Plan Title | UD明朝 | 18px | 500 | 1.40 | — | `直島 半日プラン(…)` |
| **Body** | UD明朝 | **16px** | 400 | **1.50** | **normal** | **可視 57 要素。読み物の既定** |
| Body (`<body>`) | UD明朝 | **14px** | 400 | **1.60**（22.4px） | normal | `body` の宣言値 |
| Button Label | UD明朝 | 14px | 400 | 1.00 | normal | `宿泊予約` `美術館予約` |
| **Caption / UI** | UD明朝 | **12px** | 400 / 500 | 1.50 | normal | **可視 94 要素で最多**。お知らせ帯・タグ・注記 |
| Date | UD明朝 | 12px | 400 | 1.60 | `0.6px`（0.05em） | `2026年09月11日` |
| Language / Label | UD明朝 | 10px | 400 | 1.50 | — | `Language` `English` `簡体字` |
| Ruby | UD明朝 | **7px** | 400 | normal | — | **ルビ（`故ふるきを温たずねて`）** |
| MENU | UD明朝 | 8px | 400 | 1.50 | — | ハンバーガー下のラベル |
| **読み物本文** | UD明朝 | 16px | 400 | **2.20** | `1.4px` | **物語ページ。最も広い行間** |
| 施設本文 | UD明朝 | 16px | 400 | **1.72** | normal | 作品解説（施設ページ 61 要素） |
| 営業情報 | UD明朝 | 14px | 400 | **2.09** | normal | 営業時間・定休日（25 要素） |
| 定義リスト | **游ゴシック** | 14px | **900** | 1.50 | normal | **施設ページのみ。合成ボールド** |

> **`font-size: 12px` が 94 要素で最多。** 日本語 UI としてかなり小さい。**明朝のフトコロが小さいぶん、12px は読みづらくなりやすい。新規に組むなら 13〜14px へ上げる判断も妥当** ——ただしこのサイトの印象を再現するなら 12px のまま。

### 3.5 行間・字間

- **既定の行間は `1.50`**（可視 143/230 要素）。**明朝で 1.5 は締まっている部類**
- **読み物の行間は `2.20`** / **営業情報は `2.09`** / **作品解説は `1.72`** ——**読ませる箇所だけ 1.7〜2.2 に広げる**
- **ボタン・ラベルは `1.00`**（25 要素）
- **字間は `normal` が既定**（185/230 要素）。空けるのは見出しのみ：
  - 縦組み見出し **`6px`（30px に対して 0.2em）**
  - ナビ見出し **`1.8px`（30px に対して 0.06em）**
  - 読み物見出し **`1.6px`（20px に対して 0.08em）**
  - 読み物本文 **`1.4px`**（可視 23 要素）
  - 日付 **`0.6px`**

**ガイドライン**:
- **本文に `letter-spacing` を足さない。** UD明朝の素の字送りで組む
- **見出しは px で字間を宣言する**（`em` ではない）。**実サイトは px 直書きなので、px のまま写すこと**
- **太さではなくサイズと字間で階層を作る。** ウェイトは実質 1 本しか使えない

### 3.6 禁則処理・改行ルール

- **ルビを使う。** `故ふるきを温たずねて、新しきを知る` のように本文 14px に対してルビ 7px（ちょうど半分）
- `word-break: break-all` は使わない

### 3.7 OpenType 機能

**このサイトは `font-feature-settings` を一切使っていない**（実測 0 要素）。

- **`palt` を足さないこと。** UD明朝はもともと字面がやや小さめで、詰めると窮屈になる

### 3.8 縦書き

- **`writing-mode: vertical-rl` は 1 要素**：トップの `h2.top-art__heading` **`アートと暮らす島々へ。`**
  - `font-size: 30px` / `line-height: 30px`（1.00）/ **`letter-spacing: 6px`（0.2em）** / UD明朝
- **外部ウィジェット由来ではなく、サイト本体の見出し**（クラス名 `top-art__heading`）
- **縦組みするなら字間を 0.2em 空ける。** 縦組みの明朝は詰まって見えるため

---

## 4. Component Stylings

**`border-radius` はサイト全体で `0px`。** 例外はカルーセルのドット（`50%`、14 要素）とアイコンの `100%` / `20px` が各 1 要素だけ。

### Buttons

**Primary（予約 CTA）**
- Background: **`#3799cc`** / Text: `#ffffff`
- Border: なし
- **Padding: `14px 20px 14px 45px`**（**左が 45px ——アイコンを絶対配置する分のアキ**）
- Border Radius: **`0px`**
- Font: **14px / weight 400** / line-height 1.00 / `letter-spacing: normal`

**Secondary（`よくあるご質問`）**
- Background: **`#d8d8d8`** / Text: `#000000`
- Padding: `14px 20px 14px 44px`
- Border Radius: `0px`
- Font: 12px / weight 400

**Outline（施設ページのチケット CTA）**
- Background: **`#3d9fd2`** / Text: `#333333`
- **Border: `1px solid #3d9fd2`**
- Padding: `7px 14px`
- Border Radius: `0px`
- Font: 14px / **weight 700（ただし前述のとおり太さは変わらない）**

**Section Link（`アートのご紹介` `建築のご紹介`）**
- Background: `#d8d8d8` / Text: `#000000`
- **Padding: `30px`**（大きな面として置く）
- Border Radius: `0px` / Font: 16px / weight 400

**Text Link（`詳しく見る`）**
- Background: なし（アイコンだけ `#3799cc`）
- Text: **`#3d9fd2`**
- Padding: `8px 0`
- Font: 14px / weight 400

### Tags / Chips

- `直島` など地域タグ: Background **`#f5f5f5`** / Text `#000000` / **Padding `0 6px`** / 12px / **weight 500**
- `半日` `1泊2日` など期間タグ: Background **`#e0e0e0`** / 同上

### Carousel

- ドット: **`border-radius: 50%`**。非選択 **`#bababa`** / 選択 **`#000000`**
- 数字ラベルは `font-size: 0px` で視覚的に消し、ドットに置き換えている（スクリーンリーダー用に残す実装）

### Cards

- Background: `#ffffff`
- Border Radius: **`0px`**
- Border: なし
- **カード上の見出しに `linear-gradient(to right bottom, rgba(255,255,255,0.8) 0.05%, rgba(255,255,255,0.4) 99.95%)` を重ねる**（写真の上に文字を載せるための白いベール、8 要素）

---

## 5. Layout Principles

### Spacing Scale

**px 直書き。トークンは存在しない。**

| Value | 用途 |
|-------|------|
| 6px | タグ内側（左右） |
| 10px | 小さな gap |
| 14px | ボタン内側（上下） |
| 15px | カード間 |
| **20px** | **行間の gap（9 要素）・カード内側** |
| 30px | セクション内の大きな面の内側 |
| **40px** | **列間（`20px 40px` の grid-gap、8 要素）** |
| **100px** | **セクション間（`normal 100px`、8 要素）** |

### Container

- **Max Width: 1000px**（**実測 11 要素で最多**。本文・カードグリッドの基準）
- ワイド: **1300px** / **1500px**（ヒーロー・全幅の写真）
- 本文カラム: **800px** / **760px** / **600px**（読み物）

### Grid

- トップは「大きな写真＋テキスト」の 2 カラムと、3〜4 列のカードグリッド
- 施設ページは `div.left`（`#eeeeee`）/ `div.right`（`#dddddd`）の**2 カラムを地色で塗り分ける**

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| **0** | `none` | **既定。ボタン・カード・タグはすべてフラット** |
| 1 | **`0 20px 30px rgba(23, 73, 77, 0.15)`** | **トップに 3 要素のみ**。浮かせるカード |

> **影は 3 要素しか使わない。** しかもその影は**純黒ではなく `rgba(23,73,77,…)`（深い青緑）**。瀬戸内の海と島の色を影にまで入れている。**`rgba(0,0,0,0.15)` に置き換えないこと。**
> 施設ページには影が 1 つも無い（0 種）。

---

## 7. Do's and Don'ts

### Do（推奨）

- **サイト全体を 1 書体（UD明朝）で組む。** ナビもボタンも日付も明朝
- **フォールバックを必ず書く**：`"I-OTF-UD明朝Pro R", "ヒラギノ明朝 ProN", "Hiragino Mincho ProN", "游明朝", YuMincho, serif`（実サイトは書いていないが、明朝に落ちることが設計上不可欠）
- **ウェイトは 400 を既定にする。** 太字で階層を作らない
- **`border-radius: 0` を貫く**（カルーセルのドットのみ `50%`）
- **本文色は純黒 `#000000`**、副次は `#333333`
- **コンテンツの地色は `#f5f5f5`**（`body` は白だが、`main` は薄グレー）
- **`letter-spacing` は `normal` を既定に、見出しだけ px で空ける**（30px 見出しに 1.8px、20px 見出しに 1.6px）
- **縦組みの見出しは `letter-spacing: 6px`（0.2em）**
- **読ませる文章の行間は 1.72〜2.20、UI は 1.50、ボタンは 1.00**
- **予約 CTA の padding は `14px 20px 14px 45px`**（左のアキにアイコンを置く）
- **影は `rgba(23, 73, 77, 0.15)`**（青緑）。使うのは全ページで数箇所だけ
- ルビは本文のちょうど半分のサイズ（14px → 7px）

### Don't（禁止）

- **見出しをゴシックにしない。** ゴシックは施設ページの定義リスト 20 要素だけ
- **`font-weight: 700` で太さを期待しない**（`@font-face` が Regular を bold にマップしているため変化しない）
- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素）
- **本文に `letter-spacing` を足さない**
- **`border-radius` を 4px や 8px にしない**
- **CSS Custom Properties を前提にしない**（実サイトは 0 個。px 直書き）
- **影を `rgba(0,0,0,…)` にしない**（青緑が入る）
- `"Hiragino Kaku ProN"` と書かない（**存在しない名前**。正しくは `"Hiragino Kaku Gothic ProN"`）
- 游ゴシックに `font-weight: 900` を指定しない（存在せず合成ボールドになる）
- 赤 `#ff0000` を汎用のアクセントに使わない（休館告知など 2 要素のみ）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測件数 | 説明 |
|------|-------|---------|------|
| **Desktop** | **`screen and (min-width: 768px)`** | **27** | **主境界** |
| **Mobile** | **`screen and (max-width: 767px)`** | **27** | **主境界（対称に書く）** |
| Tablet | `screen and (max-width: 1000px) and (min-width: 768px)` | 1 | コンテナ幅の調整 |
| Wide | `screen and (min-width: 1001px)` | 1 | — |
| 微調整 | `max-width: 990px` / `768px` / `640px` / `447px` / `440px` / `375px` | 各 1 | 個別の崩れ対策 |

> **`min-width: 768px` と `max-width: 767px` を 27 件ずつ対に書く**のがこのサイトの流儀。**どちらか片方だけ書かない。**

### タッチターゲット

- 予約ボタン: 高さ 42px（14+14+14）— **44px をわずかに下回る。モバイルでは padding を 15px に上げること**
- `詳しく見る`: 高さ 30px、タグ: 高さ 18px — **いずれも大きく下回る。モバイルでは縦 padding を確保すること**

### フォントサイズの調整

- `body` 14px / 本文 16px / UI 12px はブレークポイントをまたいで固定
- 縦組み見出し 30px も固定（モバイルでは行数が増える）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
予約ブルー（面）:   #3799cc
リンクブルー（文字）: #3d9fd2
Text:              #000000
Text Secondary:    #333333
Content BG:        #f5f5f5
Page BG:           #ffffff
Surface Gray:      #d8d8d8 / #e0e0e0
Alert:             #ff0000（限定）
Font: "I-OTF-UD明朝Pro R", "ヒラギノ明朝 ProN", "Hiragino Mincho ProN", "游明朝", YuMincho, serif
Weight: 400 のみ（700 を指定しても太くならない）
Body Size: 14px（body） / 16px（本文） / 12px（UI・最多）
Line Height: 1.50（既定） / 2.20（読み物） / 1.72（解説） / 1.00（ボタン）
Letter Spacing: normal（本文） / 1.8px（30px見出し） / 1.6px（20px見出し） / 6px（縦組み）
Border Radius: 0px
Container: 1000px（本文） / 1300〜1500px（ワイド） / 800px・600px（読み物）
Section Gap: 100px / Column Gap: 40px
Shadow: 0 20px 30px rgba(23, 73, 77, 0.15)（3要素のみ）
Custom Properties: なし（px 直書き）
palt: 使わない
Breakpoint: min-width 768px / max-width 767px（対で書く）
```

### プロンプト例

```
ベネッセアートサイト直島のデザインシステムに従って、美術館の施設紹介ページを作成してください。
- サイト全体を1書体で組む:
  font-family: "I-OTF-UD明朝Pro R", "ヒラギノ明朝 ProN", "Hiragino Mincho ProN", "游明朝", YuMincho, serif
  ナビ・ボタン・日付・数字もすべてこの明朝
- font-weight は 400 のみ。太字で階層を作らず、サイズと字間で作る
- body 14px / line-height 1.60、本文 16px / line-height 1.50、作品解説は 1.72、営業情報は 2.09
- UIラベル・注記は 12px（このサイトで最多のサイズ）
- letter-spacing は normal を既定に、30px見出しだけ 1.8px、20px見出しは 1.6px（em ではなく px で書く）
- トップの縦組み見出しは writing-mode: vertical-rl / 30px / line-height 1.00 / letter-spacing 6px
- border-radius はすべて 0px（カルーセルのドットだけ 50%）
- 本文色 #000000、副次 #333333、コンテンツの地色 #f5f5f5、ページ背景 #ffffff
- 予約ボタンは背景 #3799cc / 白文字 / padding 14px 20px 14px 45px / radius 0 / 14px weight 400
  （左の45pxはアイコン用のアキ）
- 副次ボタンは背景 #d8d8d8 / 黒文字、テキストリンクは #3d9fd2
- 写真の上に見出しを載せるときは
  linear-gradient(to right bottom, rgba(255,255,255,.8) .05%, rgba(255,255,255,.4) 99.95%) を重ねる
- 影は原則なし。使う場合のみ 0 20px 30px rgba(23,73,77,.15)（黒ではなく青緑）
- CSS変数は使わず px 直書き。コンテナ 1000px、セクション間 100px、列間 40px
- font-feature-settings は書かない
- メディアクエリは min-width:768px と max-width:767px を対で書く
```
