# DESIGN.md — 船橋屋（FUNABASHIYA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-18 / 対象: `https://www.funabashiya.co.jp/`, `/aboutus/history.php`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **サイト全体が明朝一書体。** 文化二年（1805年）創業のくず餅屋。黒と白だけで組み、色を使うのは日付ラベルの臙脂と通販ボタンの赤だけ。全画面の写真の上に白い細罫の額を置いて見出しを載せる
- **密度**: 低い。1 行の情報量を抑え、**字を大きく空けて置く**。トップの可視テキストは 70 要素しかない
- **キーワード**: 明朝一本、約物半角、大きな字空け、額縁、黒と白

**このサイトの核心は4つある。**

1. **約物半角フォント「YakuHanMP」を明朝の前に重ねている。** `font-family` の先頭は書体ではなく **`YakuHanMP_Noto`**（jsDelivr 配信の `yakuhanjp@3.2.0`）で、括弧・句読点のグリフだけを持つ。**実体の書体は 2 番目の `Noto Serif JP`。** 括弧が多い和文（`「くず餅」`『大江戸風流くらべ』）でも、`letter-spacing` や `palt` に頼らず約物だけが半角で詰まる
2. **字間はすべて em 宣言の 3 段階。** CSS 全文で `0.06em`(15回) / `0.15em`(6回) / `0.12em`(2回)。**本文 0.06em、一覧・日付 0.15em、大見出し 0.12em。** px で書かれた字間は 1 つもない
3. **本文の weight が 600。** 明朝の本文を Regular ではなく **SemiBold** で組む（`/aboutus/history.php` の本文 16px / 600 / line-height 2.00）。**400 に落とすと本文が消える**
4. **`font-feature-settings: "palt"` は 0 要素**（CSS 全文でも 0 回）。**詰めは約物フォントに任せ、CSS では触らない**

CSS Custom Properties は **0 個**（`customPropertiesSummary.own = 0`）。設計トークンを持たず、CSS に直値で書く実装。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Notice Red（日付ラベル）** | **`#cf1030`** | CSS 全文で **6 回**。トップの新着情報の日付 `2026.08.31 催事情報` など**可視 5 要素**。このサイトで最も目立つ色 |
| **Shop Red（通販ボタン）** | **`#b93242`** | CSS 全文で **5 回**。右下に固定される丸い `ONLINE SHOP` ボタン**のみ**（可視 1 要素） |
| **Sumi（面）** | **`#080604`** | SNS アイコンの丸い面（可視 6 要素）。純黒ではなく僅かに温かい墨色 |

> **赤が 2 つあるのは実装の実態。** `#cf1030` は文字色、`#b93242` はボタンの面色。**役割が違うので統一しない。**

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し・ナビすべて。**可視 56 / 53 要素**（トップ / 下層）。**このサイトは本文に純黒を使う**
- **Text on Dark** (`#ffffff`): 写真の上の見出し、黒帯のラベル
- **Dark Maroon** (`#450510`): 下層フッターの通販ダイヤル（可視 2 要素）
- **Pale Pink** (`#f0b3be` / 枠は `#f1b7c1`): トップのフッターの通販ダイヤルと、その 1px 枠
- **Label Gray** (`#747474`): `催事情報` `お知らせ` の小さなカテゴリバッジの面（可視 5 要素）
- **Surface Lavender** (`#f6f5f8`): グローバルナビの引き出しの面
- **Surface Gray** (`#f0f0f0`): 下層ページの引用ブロックの面
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

> **トップは全画面写真がビューポートを覆う**（`heroCover.heroCovered: true` / `img` 1471×828）。**地色は写真の色ではなく `#ffffff`。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **明朝体（サイト唯一の和文書体）**: **Noto Serif JP**（Google Fonts、400 / 500 / 600 / 700 を宣言）。フォールバックは ヒラギノ明朝 ProN → 游明朝
- **約物フォント**: **YakuHanMP_Noto**（`yakuhanjp@3.2.0` / jsDelivr、Regular・SemiBold・Bold の 3 ウェイトを読み込む）。**括弧と句読点のグリフしか持たない**ので、単独では和文を描画しない
- **ゴシック体は使わない。** サイト全体で 1 要素も無い

### 3.2 欧文フォント

- **Neuton**（Google Fonts、300 / 700）。**日付・電話番号・コピーライトだけ**に使うセリフ体（可視 7 要素 / 2 要素）
- **宣言は `Neuton, sans-serif`。フォールバックが誤り**（Neuton はセリフ体なので `serif` が正しい）。**実サイトはこうだが、新規実装では `Neuton, serif` と書くこと**

### 3.3 font-family 指定

```css
/* 本文・見出し・UI（サイト既定） */
font-family: YakuHanMP_Noto, "Noto Serif JP", "Hiragino Mincho ProN",
             "Yu Mincho", YuMincho, serif;

/* 日付・電話番号・コピーライト（欧文のみ） */
/* 実サイトは Neuton, sans-serif だが、正しくは serif */
font-family: Neuton, serif;
```

```html
<!-- 約物フォントの読み込み。書体本体より先に置く -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.2.0/dist/css/yakuhanmp.min.css">
```

**フォールバックの考え方**:
- **1 番目は書体ではなく約物フォント。** `YakuHanMP_Noto` は括弧・句読点しか持たないので、残りのグリフは自動的に 2 番目の `Noto Serif JP` が描く。**順序を入れ替えると約物が半角にならない**
- 和文優先。欧文を先頭に置かず、Noto Serif JP の欧文グリフで統一する
- **`YakuHanMP`（明朝用）と `YakuHanJP`（ゴシック用）は別物。** 明朝と組むときは **MP** を使う

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Section Heading（下層）** | Noto Serif JP | **27px** | **600** | **1.70** (45.9px) | **3.24px = 0.12em** | `船橋屋の創業と「くず餅」のはじまり`。上下に 1px の罫 |
| Feature Heading | Noto Serif JP | 30px | 600 | 1.70 | 3.6px = 0.12em | `本店に訪れた文化人` |
| **Block Heading（トップ）** | Noto Serif JP | **24px** | 400 | **1.00** | **3.6px = 0.15em** | `9月の商品情報` `新着情報` |
| Global Nav | Noto Serif JP | 21px | 400 | 3.52 (74px) | 2.1px = 0.10em | 引き出しナビ。**行間 74px と極端に広い** |
| Body (default) | Noto Serif JP | 20px | 400 | 1.50 (30px) | normal | `body` の既定値 |
| **Article Body** | Noto Serif JP | **16px** | **600** | **2.00** (32px) | **0.96px = 0.06em** | **本文。Regular ではなく SemiBold** |
| Figure Caption | Noto Serif JP | 16px | **700** | 1.50 (24px) | normal | 写真の見出し（`現在の船橋屋`） |
| **News Date** | **Neuton** | **19px** | **700** | 1.00 | **2.85px = 0.15em** | `2026.08.31 催事情報`。**色 `#cf1030`** |
| **List Item** | Noto Serif JP | **15px** | 400 | **1.70** (25.5px) | **2.25px = 0.15em** | 商品名・お知らせ本文。**最も多い役割（可視 32 要素）** |
| Category Badge | Noto Serif JP | 12px | 400 | 1.00 | 1.8px = 0.15em | `催事情報`。白文字 / 面 `#747474` |
| Update Label | Noto Serif JP | 16px | 400 | 1.50 (24px) | 1.28px = 0.08em | `UPDATE 2026.08.31`。白文字 / 面 `#333333` |
| Tel（トップ） | Neuton | 16px | 400 | 1.88 (30px) | 2.4px = 0.15em | ピンクの枠付き |

### 3.5 行間・字間

- **本文の行間**: **2.00**（16px / 32px）。日本語の読み物として広い側
- **見出しの行間**: **1.70**（27px / 45.9px）。**見出しも詰めない**のがこのサイトの特徴。詰めるのはトップの `24px / 1.00` のブロック見出しだけ
- **一覧の行間**: **1.70**（15px / 25.5px）
- **字間は 3 段階しかない**:

| 用途 | 値 | 実測 |
|------|----|------|
| 本文 | **`0.06em`** | CSS 全文で **15 回**（最多） |
| 一覧・日付・小見出し・バッジ | **`0.15em`** | CSS 全文で 6 回 / 可視 24 + 5 + 3 + 5 要素 |
| 大見出し（27px・30px・20px） | **`0.12em`** | CSS 全文で 2 回 |

**ガイドライン**:
- **字間は必ず `em` で書く。** px で書くとサイズを変えたとき比率が崩れる。**実サイトに px 宣言の字間は 1 つも無い**
- **本文（0.06em）と見出し（0.12em）で倍の差をつける。** 見出しほど大きく空けるのがこのサイトの調子
- **本文の weight は 600。** 明朝 400 では線が細く、字間 0.06em と噛み合わない

### 3.6 禁則処理・改行ルール

- 見出しは折り返さない前提で組む（罫線付きの見出しは 1 行 + 中央揃え）
- 本文は 1 行 約 40 字（16px / コンテナ 600px 前後）
- `word-break: break-all` は使わない

### 3.7 OpenType 機能

**このサイトは `font-feature-settings` を一切使っていない**（実測 0 要素 / CSS 全文で `palt` 0 回）。

- **`palt` を足さないこと。** 約物の詰めは **YakuHanMP が担当**している。`palt` を重ねると二重に詰まって字面が壊れる
- **約物フォントを使わないなら `palt` を検討してよい**が、**このサイトの再現としては約物フォント側を選ぶ**

### 3.8 縦書き

該当なし（`typography.verticalWriting` = 0 件）。ロゴの「元祖くず餅 船橋屋 創業文化二年」は画像。

---

## 4. Component Stylings

**`border-radius` は基本 `0px`。** 角丸は SNS アイコンと通販ボタンの `100%`（円）だけ（可視 7 要素）。

### Buttons

**Floating Shop Button（ONLINE SHOP）**
- Background: **`#b93242`** / Text: `#ffffff`
- Border Radius: **`100%`**（正円）
- 右下に固定。サイト唯一の面色 CTA

**Hero Button（詳しくはこちら）**
- Background: `rgba(0, 0, 0, 0.8)`（写真の上に敷く半透明の黒）
- Text: `#ffffff` / Border Radius: `0px`
- 白い 1px の額（`border: 1px solid #ffffff`）の中に置く

**Tel Button（トップのフッター）**
- Background: `transparent` / Text: `#f1b7c1`
- Border: **`1px solid #f1b7c1`** / Border Radius: `0px`
- Font: Neuton 16px / weight 400 / line-height 1.88 / letter-spacing 0.15em

**Recruit Bar**
- Background: `#3e3e3e` / Text: `#ffffff`
- Font: 23px / weight 400 / line-height 1.00 / Border Radius: `0px`

### Badges / Chips

**Category Badge（催事情報・お知らせ）**
- Background: **`#747474`** / Text: `#ffffff`
- Padding: `6px 10px`
- Font: **12px / weight 400 / letter-spacing 0.15em**
- Border Radius: `0px`

**Update Label**
- Background: `#333333` / Text: `#ffffff`
- Padding: `8px 12px` 相当 / Font: 16px / letter-spacing 0.08em

**SNS Icon**
- Background: **`#080604`** / Border Radius: **`100%`**
- テキストは `font-size: 0` で隠す（アイコンは背景画像）

### Cards

- Background: `#ffffff` / Border: なし / Border Radius: `0px`
- Shadow: **`none`**（サイト全体で影は 0 種）
- カードの区別は**余白と写真**で行う。罫線も影も使わない

### Frames（このサイト固有）

- **ヒーローの額**: `1px solid #ffffff` の矩形を写真の上に重ね、その中に見出しを置く
- **見出しの罫**: 下層の `h2` は上下に 1px の黒罫。見出しと罫の間は広めに空ける

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 6px | バッジ内側の上下 |
| S | 10px | バッジ内側の左右 |
| M | 20px | ブロック内側 |
| L | 40px | ブロック間 |
| XL | 80px | セクション間 |

### Container

- **Max Width: 1400px**（CSS 全文で 4 回。最頻）
- 広いセクション: **1600px** / 本文セクション: **1200px**
- 本文カラムは 2 カラム（テキスト 1 / 写真 1）

### Grid

- 下層は「本文（左）／写真（右）」の 2 カラム。次の節で左右を入れ替える
- トップは全画面写真 → 商品情報の横並び（5 列）→ 新着情報（日付 + 本文の定義リスト）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **サイト全体。影は 1 種も無い**（実測 0 種） |

> **影を使わないサイト。** 階層は「写真か、白地か」「額の中か、外か」で作る。**カードに `box-shadow` を足さない。**

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-family` の先頭に `YakuHanMP_Noto` を置く。** 書体本体は 2 番目の `Noto Serif JP`
- **字間は `em` で 3 段階**（本文 `0.06em` / 一覧・日付 `0.15em` / 大見出し `0.12em`）
- **本文は 16px / weight 600 / line-height 2.00**。明朝の本文を SemiBold で組む
- **見出しの行間も 1.70 と広く取る**（詰めるのはトップの 24px ブロック見出しだけ）
- 日付は **Neuton 19px / weight 700 / `#cf1030`**
- **`border-radius: 0`** を既定にし、円は SNS アイコンと通販ボタンだけ
- 本文色は **純黒 `#000000`**
- ヒーローは**写真の上に白い 1px の額**を置き、その中に見出しを入れる

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素。約物フォントと二重になる）
- **`YakuHanJP`（ゴシック用）で代用しない。** 明朝には **`YakuHanMP`**
- **字間を px で書かない**（実サイトは全部 em）
- **本文を weight 400 にしない**（実サイトは 600）
- **ゴシック体を混ぜない**（サイト全体で 1 要素も無い）
- **カードに枠線や影を足さない**（実サイトは影 0 種）
- `Neuton, sans-serif` をそのまま真似しない（**Neuton はセリフ体。`serif` が正しい**）
- 日付ラベルの `#cf1030` と通販ボタンの `#b93242` を 1 色に統一しない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 780px** | `@media (max-width: 780px)`（CSS 全文で 3 回） |
| **Desktop** | **≥ 781px** | `@media (min-width: 781px)`（同 3 回） |
| Container 上限 | 1200 / 1360 / 1400 / 1440px | セクションごとに使い分け |

- **781px という半端な値で PC / SP を切っている**。780px を含めない意図

### タッチターゲット

- 通販ボタン（正円）・グローバルナビ（行高 74px）は 44px を満たす
- **カテゴリバッジ（12px / 上下 6px = 24px 高）は下回る**。バッジ自体はリンクではないので実害は無いが、**タップ対象にするなら高さを足すこと**

### フォントサイズの調整

- 本文 16px、一覧 15px はブレークポイントをまたいで固定
- 見出し 27px はモバイルで縮む（`0.12em` の字間は維持する）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Notice Red:  #cf1030   （日付ラベルの文字色）
Shop Red:    #b93242   （ONLINE SHOP ボタンの面）
Sumi:        #080604   （SNS アイコンの面）
Text:        #000000
Label Gray:  #747474
Surface:     #f6f5f8 / #f0f0f0
Background:  #ffffff

Font (JP): YakuHanMP_Noto, "Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", YuMincho, serif
Font (EN): Neuton, serif   ※実サイトは sans-serif と誤記
約物: https://cdn.jsdelivr.net/npm/yakuhanjp@3.2.0/dist/css/yakuhanmp.min.css

Body:      16px / weight 600 / line-height 2.00 / letter-spacing 0.06em
List:      15px / weight 400 / line-height 1.70 / letter-spacing 0.15em
Heading:   27px / weight 600 / line-height 1.70 / letter-spacing 0.12em
Date:      Neuton 19px / weight 700 / letter-spacing 0.15em / #cf1030
Border Radius: 0px（円は SNS アイコンと通販ボタンのみ）
Shadow: none
Container: 1400px
palt: 使わない
```

### プロンプト例

```
船橋屋のデザインシステムに従って、老舗和菓子店の「沿革」ページを作成してください。
- font-family は YakuHanMP_Noto を先頭に、"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", YuMincho, serif と続ける
- yakuhanjp@3.2.0 の yakuhanmp.min.css を CDN から読み込む（約物を半角にするため）
- font-feature-settings: "palt" は使わない
- 本文は 16px / weight 600 / line-height 2.00 / letter-spacing 0.06em
- 見出しは 27px / weight 600 / line-height 1.70 / letter-spacing 0.12em、上下に 1px の黒罫を引く
- 一覧項目は 15px / line-height 1.70 / letter-spacing 0.15em
- 日付は Neuton 19px / weight 700 / letter-spacing 0.15em、色は #cf1030
- 本文色は純黒 #000000、背景は #ffffff
- border-radius はすべて 0px、box-shadow は使わない
- ヒーローは全画面写真の上に 1px solid #ffffff の額を重ね、その中に白い見出しを置く
- コンテナ幅 1400px、ブレークポイントは 780/781px
```
