# DESIGN.md — ニッカウヰスキー（NIKKA WHISKY）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-26 / 対象: `https://www.nikka.com/`, `https://www.nikka.com/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **字を空けて「間」を作る。** 和文に `palt` を一切かけず、逆に `letter-spacing: 0.18em` を body に当てて全文を開く。行間も本文 2.33、リード文 3.10 と極端に広い。角丸・影・面の塗り分けをほぼ使わず、**余白と字送りだけで格を出す**
- **密度**: きわめて低い。1440px 幅のトップページで可視テキストは 105 要素しかない。スクロールのたびに1ブロックずつ現れる
- **キーワード**: 黒、アイボリー、大きく開いた字送り、欧文セリフの頭文字、罫線1本のボタン

**このサイトの核心は4つある。**

1. **ルートが 13px。** `html` / `body` ともに `font-size: 13px`。**`rem` は 16px 基準ではない**（`1rem = 13px`）。この前提を外すと全サイズが 1.23 倍ずれる
2. **`letter-spacing: 0.18em` を body に1回書いて全文へ流す。** body の computed 値は `2.34px`（= 13px × 0.18）。子要素の多くはこの **px をそのまま継承**し（15px の CTA でも `2.34px`）、見出し・リードなど一部だけ `0.18em` を**再宣言**してサイズに比例させている（32px → `5.76px`、14px → `2.52px`、16px → `2.88px`）。**継承と再宣言が混在しているのが実装の実態**
3. **`font-feature-settings: "palt"` は 1 要素も無い**（実測 0 件）。字を詰めずに空ける設計なので、**palt を足すと真逆になる**
4. **`@font-face` のフォールバックが全部 `serif`。** `"Noto Sans JP", serif` / `Lato, serif` / `Vollkorn, serif`。Noto Sans JP も Lato もサンセリフなので、**これは実サイトの誤り**（Web フォントが落ちると和文ゴシックが明朝に化ける）。新規実装では `sans-serif` に直すこと

**CSS Custom Properties は自社トークン 0 個**（トップの 2 個は Swiper の既定値、`/about/` は 0 個）。色・字間・サイズはすべて直書き。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Black** | **`#000000`** | **可視テキスト 108 要素**（`/about/`）。ヘッダーの帯（`rgba(0,0,0,.8)`）、フッター全面、ボタンの枠線。**このサイトのブランド色は黒** |
| **Ivory（html 背景）** | **`#f9f7ef`** | `html` の背景。**body に覆われるので通常は見えない**。オーバースクロール時とロード直後にだけ出る |
| **Page Gray（body 背景）** | **`#e9e9e9`** | `body` の背景。**実質のページ地色**（`pageBackground.resolved` = `rgb(233,233,233)` / 根拠 `body`） |

> **トップページの `resolved` は信用しない。** `heroCover.heroCovered: true` で、上部ビューポートは `video.movie_container`（1600×900）に覆われている。抽出ログも `html: rgb(249,247,239) / body: rgb(233,233,233) が本来のページ背景` と注記している。**地色は `#e9e9e9`。**

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 108 要素**。このサイトは本文に純黒を使う
- **Text on Dark** (`#ffffff`): 黒帯・フッター上の見出し（可視 8〜10 要素）
- **Text Muted on Dark** (`#cccccc`): フッターとメガメニューのリンク（**可視 24 要素**）。黒地の上の第2階層はこの1色だけ
- **Surface Search** (`#92a6a9`): 検索オーバーレイの面。くすんだ青灰。**サイト内で唯一の有彩色の面**
- **Background** (`#e9e9e9`) / **Background (html)** (`#f9f7ef`)

### 採用しない色

- **`#0033ff` / `#cddcf2` / `#3860be` / `#6699cc` / `#6aaae4` / `#f8f8f8` / `#f4f4f4`** — すべて **OneTrust（CMP）由来**。`interactive` の `_textPreview` が `Cookieの利用に同意する` `すべて許可する` `Apply` `個別に設定する` で、`font-size` も `13.008px` / `14.4px` と CMP 特有の端数。**ブランド色ではない**
- **`#27455c`** — `uniqueBackgrounds` に 8 要素あるが**可視テキストを1つも持たず、`interactive` にも出ず、フルページのスクリーンショットでも確認できなかった**。不可視要素の可能性が高いので採用しない

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の和文）**: **Noto Sans JP**。`@font-face` は可変フォントで `weight: 400 700`、`status: loaded`。**明朝は使わない**
- 実際に使うウェイトは **400 が主体**（`/about/` で 119/144 要素）。500 は 4 要素、700 は CMP だけ

### 3.2 欧文フォント

- **セリフ（見出し・頭文字）**: **Vollkorn**。`weight: 400 700` の可変、`loaded`。`OUR BRANDS` `ABOUT US` のような**大きな英字見出し専用**（56〜72px）。1文字ずつ `<span>` に分割されて出る（`js_split_text`）
- **サンセリフ（ナビ・ラベル）**: **Lato**。`300` と `400` が `loaded`、**`700` は宣言されているが `unloaded`**（参照する要素が無い）。**欧文の太字は存在しないと考えてよい**
- グローバルナビは Lato **300（Light）** 15px

### 3.3 font-family 指定

```css
/* 実サイトの宣言（フォールバックが serif なのは誤り） */
font-family: "Noto Sans JP", serif;   /* 和文・UI */
font-family: Lato, serif;             /* 欧文ナビ・ラベル */
font-family: Vollkorn, serif;         /* 欧文の大見出し */
font-family: Lato, "Noto Sans JP", serif;  /* パンくず（和欧混植） */

/* 正しくはこう書く */
font-family: "Noto Sans JP", sans-serif;
font-family: Lato, "Noto Sans JP", sans-serif;
font-family: Vollkorn, "Noto Serif JP", serif;   /* Vollkorn はセリフなので serif で正しい */
```

**フォールバックの考え方**:
- **和文は Noto Sans JP 一本。** OS フォントの指定を持たないので、Web フォントが落ちると generic に直行する
- **`Lato, serif` と `"Noto Sans JP", serif` は直すこと。** Lato も Noto Sans JP もサンセリフで、`serif` に落ちると別の書体になる。実害が出るのは Web フォント未読込の一瞬と、フォント配信が失敗した環境
- **`Vollkorn, serif` だけは正しい**。Vollkorn はセリフ体なので、落ちても系統が変わらない

### 3.4 文字サイズ・ウェイト階層

**ルートは 13px。** `html { font-size: 13px }` / `body { font-size: 13px }`。下表の `rem` 換算は 13px 基準。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Display（英字）** | **Vollkorn** | **72px** | 400 | **1.10** (79.2px) | **3.6px = 0.05em** | トップの `OUR BRANDS`。1文字ずつ span |
| Display S（英字） | Vollkorn | 64px | 400 | 0.90 (57.6px) | 3.2px = 0.05em | 下層の `ABOUT US` |
| Display XS（英字） | Vollkorn | 56px | 400 | 0.90 (50.4px) | 2.8px = 0.05em | セクション見出し |
| Number（英字） | Vollkorn | 40px | 400 | 0.90 | 2px = 0.05em | `PICK UP` の連番 |
| **Section Title（和文）** | **Noto Sans JP** | **32px** | **400** | **1.30** (41.6px) | **5.76px = 0.18em** | `ご挨拶`。**見出しも太らせない** |
| Sub Heading（和文） | Noto Sans JP | 32px | 400 | 1.50 (48px) | 5.76px = 0.18em | `北海道 余市蒸溜所` |
| **Lead（和文）** | **Noto Sans JP** | **18px** | **400** | **3.10** (55.8px) | **4.5px = 0.25em** | **会社案内の理念文。最も開いた組** |
| Lead 2（和文） | Noto Sans JP | 18px | 400 | 2.33 (41.9px) | 3.24px = 0.18em | 見出し直下の導入 |
| **Body（和文）** | **Noto Sans JP** | **15px** | **400** | **2.33** (35px) | **2.7px = 0.18em** | **本文。`/about/` で 37 要素** |
| Nav（欧文） | Lato | 15px | **300** | 1.04 (15.6px) | 1.5px = 0.10em | グローバルナビ。白文字 |
| Nav Label（和文） | Noto Sans JP | 14px | 400 | 1.11 (15.6px) | 2.52px = 0.18em | `商品紹介` `蒸溜所` |
| Button（和文） | Noto Sans JP | 15px | 500 | 1.04 (15.6px) | 2.34px（継承） | 枠線ボタン。**再宣言せず px を継承** |
| Base / Footer | Noto Sans JP | 13px | 400 | 1.20 (15.6px) | 2.34px = 0.18em | body 既定。フッターリンク |
| Footer Head（欧文） | Lato | 13px | 400 | 1.20 | 1.3px = 0.10em | `OUR BRANDS` 等のフッター見出し |
| Breadcrumb | Lato, Noto Sans JP | 12px | 400 | 1.30 (15.6px) | 1.2px = 0.10em | `TOP ＞ 会社案内` |
| Legal | Noto Sans JP | 11px | 400 | 1.42 | normal | `ストップ！20歳未満飲酒` の帯 |

**トラックは3本しかない。** `0.05em`（Vollkorn の大英字）／ `0.10em`（Lato の欧文ラベル）／ `0.18em`（和文すべて）。例外はリード文の `0.25em` と、下層ボタンの `1.95px`（13px → 0.15em）だけ。

### 3.5 行間・字間

- **本文の行間**: **2.33**（15px / 35px）。日本語本文としても広い部類
- **リード文の行間**: **3.10**（18px / 55.8px）。**1行ごとに独立して見えるほど空ける**。会社案内の理念文がこれ
- **見出しの行間**: **1.30**（32px / 41.6px）。大見出しだけ詰める
- **UI の行間**: **1.04〜1.20**。ナビ・ボタン・フッターは1行想定
- **字間の既定**: **`0.18em`**。body に1回だけ書いて全体へ流す
- **英字の字間**: Vollkorn の大見出しは **`0.05em`**、Lato のラベルは **`0.10em`**

**ガイドライン**:
- **`letter-spacing` は body に1回だけ書く。** 子要素で再宣言するのは、サイズに比例させたい見出し・本文だけ
- **和文に `0.18em` を当てても読める理由は行間 2.33 とセット**だから。字間だけ真似て行間を 1.6 に詰めると、行が団子になる
- **`0.18em` を `18px` と書き間違えないこと。** 13px 基準なので computed は `2.34px`

### 3.6 禁則処理・改行ルール

```css
/* 和文本文 */
line-break: strict;
overflow-wrap: break-word;
word-break: normal;       /* break-all は使わない */
```

- **字間を大きく取っているので、`break-all` を入れると行末が特にばらつく**。避けること
- 大英字見出しは1文字ずつ `<span>` に割られているため、**`<span>` 単位で折り返す**。意図した位置で改行させたいときは `<br>` を明示する
- リード文（行間 3.10）は**書き手が改行位置を決めている**。自動折り返しに任せず `<br>` で組む

### 3.7 OpenType 機能

```css
/* 実サイトは font-feature-settings を 1 要素も指定していない（実測 0 件） */
```

- **`palt` を使わない。** このサイトは字を詰めるのではなく空ける設計で、`palt` を足すと約物が閉じて意図が反転する
- 括弧・句読点の間隔も**素のまま**。`「大日本果汁株式会社」を設立したことから` のような鉤括弧の前後も詰めない
- 欧文の `kern` も明示していない（ブラウザ既定に任せている）

### 3.8 縦書き

```css
/* 該当なし。writing-mode の指定は 0 要素 */
```

縦組みは使っていない（`typography.verticalWriting` = 0 件）。

---

## 4. Component Stylings

### Buttons

**Primary（枠線ボタン）— このサイトの主要 CTA はこれ1種類だけ**
- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #000000`
- Border Radius: **`0px`**
- Font: Noto Sans JP / 15px / **500**
- Letter Spacing: `2.34px`（body から継承。**再宣言しない**）
- Line Height: 1.04

**Language Toggle（ピル）**
- Background: `transparent`
- Border Radius: **`100px`**（JP / EN の切替のみ）
- Font: Noto Sans JP / 13px / 400
- 選択中は黒の塗り＋白文字

**Number Badge（連番）**
- Border Radius: `50%`
- Font: Vollkorn / 40px / 400 / `letter-spacing: 2px`

> **面で塗る CTA は存在しない。** 青い塗りボタン（`#0033ff`）は OneTrust の Cookie バナーで、サイトの部品ではない。**「目立つボタン」を作りたくなっても、罫線1本に留めること。**

### Inputs

- Background: `#92a6a9`（検索オーバーレイの面の上に置く）
- Border: なし
- Border Radius: `0px`
- Font: Noto Sans JP / 13px / 400 / `letter-spacing: 2.34px`
- Placeholder: `検索キーワード入力`
- フォーカス: 下線1本（`1px solid #000000`）

### Cards

- Background: `transparent`（地色 `#e9e9e9` のまま）
- Border: なし。**カードは面でも枠でもなく、画像と余白で区切る**
- Border Radius: `0px`（例外は `16px` が 2 要素のみ）
- Shadow: なし

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 実測 |
|-------|-------|------|
| XS | 10px | gap |
| S | 15px | gap |
| M | **24px** | **トップで最多の gap（13 要素）** |
| L | **34px** | `/about/` で最多の gap（8 要素） |
| XL | 62px | セクション内 |
| XXL | **80px** | セクション間 |
| 3XL | 88px | `88px 57.6px` の行間 gap |

### Container

- Max Width: **`1200px`**（実測 6 要素で最多）
- 幅いっぱいの帯は `100%`（ヘッダー・フッター・ヒーロー）
- Padding (horizontal): 40px 前後（1440px 表示でロゴ左端が 24px）

### Grid

- Columns: 2〜4（ブランド一覧は 3 カラム、フッターは 4 カラム）
- Gutter: **24px**（トップ）/ **34px**（下層）
- 大英字見出しは**グリッドの外**に置き、左端揃えで大きく張り出す

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| **0** | **`none`** | **既定。サイトの全部品がこれ** |
| — | `rgba(0,0,0,0.2) 0 0 18px 0` | **OneTrust の Cookie バナーだけ**（実測 1 要素）。サイトの部品ではない |
| — | `rgb(0,0,0) 0 0 0 2px inset` | 内側の2px リング（実測 2 要素）。枠線の代用 |

**このサイトは影を使わない。** 奥行きは「黒帯 `rgba(0,0,0,.8)` を重ねる」ことだけで表す。`box-shadow` を足さないこと。

---

## 7. Do's and Don'ts

### Do（推奨）

- **ルートを 13px にする**（`html { font-size: 13px }`）。`rem` を使うなら 13px 基準で計算する
- **`letter-spacing: .18em` を body に1回書く**。子要素は継承させる
- **和文本文は 15px / `line-height: 2.33` / `0.18em`**。字間と行間はセットで指定する
- **大きな英字見出しは Vollkorn（セリフ）**、ナビ・ラベルは Lato 300（Light）
- **CTA は `1px solid #000000` / `border-radius: 0`** の枠線ボタン1種類で通す
- **リード文は `<br>` で改行位置を決める**（行間 3.10 は自動折り返しと相性が悪い）

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** 字を空ける設計に対して真逆の効果になる
- **`letter-spacing` を `normal` に戻さない。** 0.18em が無いとブランドの「間」が消える
- **`font-family` のフォールバックを `serif` のまま真似しない。** `"Noto Sans JP", serif` / `Lato, serif` は実サイトの誤り。`sans-serif` に直す
- **Lato の 700 を使わない。** `@font-face` はあるが `unloaded`。欧文に太字は用意されていない
- **和文の見出しを 700 にしない。** 32px の見出しも weight 400。太らせると別のブランドになる
- **`box-shadow` / `border-radius` を足さない。** 角丸は JP/EN ピル（100px）と連番（50%）だけ
- **青 `#0033ff` を採用しない。** OneTrust の色であってニッカの色ではない
- **下層ページを直リンクで検証しない。** `/story/` `/distilleries/` `/discover/` 配下は**年齢認証ゲート**に入り、`title` が `年齢認証 | NIKKA WHISKY` の別デザインになる。ゲート外なのは `/` と `/about/`

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 576px | `(max-width: 576px)`（実測 7 回） |
| Tablet | ≤ 767px | `screen and (max-width: 767px)`（実測 7 回）。**主要な切替点** |
| Desktop | ≥ 768px | `screen and (min-width: 768px)`（実測 4 回） |
| Desktop M | 768–1280px | `screen and (min-width: 768px) and (max-width: 1280px)` |
| Desktop L | 768–1511px | `screen and (min-width: 768px) and (max-width: 1511px)` |
| Wide | ≥ 1281px | `screen and (min-width: 1281px)` |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。枠線ボタンは `padding` で高さを確保する

### フォントサイズの調整

- 大英字見出し（72px）はモバイルで 40px 前後まで落とす
- **和文本文 15px と `0.18em` は据え置く。** 狭い画面で字間を詰めると、このサイトらしさが最初に失われる
- リード文の `line-height: 3.10` はモバイルでは 2.4 程度に抑えてよい（画面高に対して空きすぎるため）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Root font-size: 13px   ← 16px ではない
Primary Color:  #000000
Text Color:     #000000
Text on Dark:   #cccccc
Background:     #e9e9e9   （html は #f9f7ef）
Font (和文):    "Noto Sans JP", sans-serif
Font (欧文):    Lato, sans-serif   / 大見出しは Vollkorn, serif
Body Size:      15px
Line Height:    2.33
Letter Spacing: 0.18em   ← body に1回だけ
palt:           使わない
Border Radius:  0px
Box Shadow:     なし
Container:      1200px
```

### プロンプト例

```
ニッカウヰスキーのデザインシステムに従って、蒸溜所紹介ページを作ってください。
- ルートの font-size は 13px（16px ではない）
- body に letter-spacing: .18em を1回だけ書き、子要素には再宣言しない
- 和文は "Noto Sans JP", sans-serif / 400。見出しも 400 のままで太らせない
- 本文は 15px / line-height: 2.33
- セクション見出しは英字を Vollkorn 56px / letter-spacing: .05em、その右に和文 32px / .18em を添える
- CTA は 1px solid #000000 / border-radius: 0 / 15px / weight 500 の1種類だけ
- font-feature-settings: "palt" は使わない
- box-shadow は使わない。地色は #e9e9e9
```
