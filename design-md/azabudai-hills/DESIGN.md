# DESIGN.md — 麻布台ヒルズ（AZABUDAI HILLS）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-08 / 対象: `https://www.azabudai-hills.com/`, `/about/`

---

## 1. Visual Theme & Atmosphere

森ビルの「Modern Urban Village」。8.1ha の街区に住・職・遊が同居する複合施設のサイト。
**白地に深緑1色**という都市開発サイトとしては極端に禁欲的な配色で、
色は写真と緑（グリーン&ウェルネス）だけが担う。

- **デザイン方針**: 白地 + 深緑 `#003a40` / 緑 `#00875f` の2段。写真をフルブリードで見せる
- **密度**: 低い。940px の版面に大きな余白と大きな写真
- **キーワード**: YakuHanJP、自社Latin書体、深緑、角丸 10px、塗りボタンを持たない

**このサイトの特徴的な癖（他サイトと違う点）**

1. **`YakuHanJP` をフォントチェーンの先頭に置く**。約物（`、。「」（）`）だけを
   半角字形に差し替える専用フォントで、**和文チェーン全体の先頭に必ず来る**。
   `letter-spacing` を一切使わずに約物のアキだけを詰める設計
2. **`letter-spacing` が全要素で `normal`**。字間で調整せず、YakuHanJP に任せる。
   例外はコンセプト見出し（1px）と英字見出し（0.99〜1.05px）だけ
3. **自社の Latin ディスプレイ書体を3種 self-host する**
   （`AZABUDAI-regular.woff` / `-bold.woff` / `-condence.woff`）。
   欧文見出しは全部これ。和文には一切使わない
4. **`body` の `font-family` が `Arial, "Helvetica Neue", Helvetica, sans-serif`**
   （Webflow の既定のまま）。**和文チェーンは要素ごとに個別指定する**という
   逆転した構造。`body` の設定を信用してはいけない
5. **主要 CTA が枠線ボタン1種だけ**。`1px solid #003a40` / `border-radius: 10px` /
   幅 300px / 高さ 50px。**塗りの CTA を持たない**
6. **緑が2段ある**。`#00875f`（アクション・ナビの下線・検索ボタン）と
   `#003a40`（見出し・本文・枠線）。**濃い方は文字色、薄い方は面色**という役割分担
7. **淡緑 `#e6f0e7` のセクション面**。コンセプト文の背景に使う唯一の色面
8. **見出しの `font-weight` が 500**。700 を使わず、`Noto Sans JP` の Medium で
   見出しを立てる
9. **Webflow 製**。ブレークポイントが `479 / 767 / 991 / 1170px` の Webflow 既定
10. 写真クレジット（`©Raquel Deniz`）を **`rgba(0,0,0,.08)` の極薄い面**に
    白文字で重ねる

---

## 2. Color Palette & Roles

<!-- 実サイトの CSS Custom Property + computed style 実測値 -->

### Base

- **Background** (`#ffffff`): ページ地色（`body`。`--white`）
- **Surface Light** (`#f8f8f8`): 薄いグレー面（`--light-grey` / `--white-01`）
- **Surface Green** (`#e6f0e7`): **淡緑の面**。コンセプト・施設概要セクション（`--light-green-01`）
- **Surface Green Pale** (`#f1f9e2`): さらに淡い緑（`--light-green-02`）

### Brand（緑の2段）

- **Deep Green** (`#003a40`): **見出し・本文・CTA の枠線**。ほぼ黒に見える深緑（`--dark-green`）
- **Green** (`#00875f`): **アクション色**。ロゴ下線・ナビのアイコン・検索ボタン・
  カテゴリリンクの枠（`--green`）
- **Green Hover** (`#179c75`): ホバー時の緑
- **Light Green** (`#b9e972`): 差し色の黄緑（`--green-01`）
- **Sage** (`#c3dc93`): 英字見出しの色（`--green-02`）。「OUR STORY」

### Neutral

- **Ink** (`#000000`): ナビの現在地・見出しの一部（`--bkack`。**タイポ誤記のまま公開されている**）
- **Text** (`#333333`): 本文・ナビ（`--black-01`）
- **Text Muted** (`#5c5c5c`): 補足（`--dark-grey`）
- **Text Faint** (`#8c8c8c`): 注釈（`--grey`）
- **Divider** (`#dddddd`) / (`#cdcdcd`): ページネーション・区切り
- **Greige** (`#e1dcdc`): 面（`--greyge`）
- **Brown** (`#9b8376`): アート・ギャラリー系の差し色（`--brown`）

### On Photo

- **On Photo** (`#ffffff`): 写真上のロゴ・見出し（`--azabudi-txt`）
- **Photo Scrim**: `linear-gradient(rgba(255,255,255,0), rgba(0,0,0,0) 0%, rgba(0,0,0,.1) 50%, #000 90%)`
- **Credit Chip**: `rgba(0,0,0,.08)` の面に白文字 12px

```
UI の有彩色は緑だけ。赤・青・黄を一切足さない。
「Green & Wellness」というコンセプトを配色そのもので言っている。
```

---

## 3. Typography Rules

### 3.1 和文フォント

**チェーンの先頭は必ず `YakuHanJP`。**

```css
font-family: YakuHanJP, "Noto Sans JP", "Hiragino Sans",
             "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
```

`YakuHanJP` は約物（`、。「」『』（）` 等）だけを収録した半角字形フォント。
**チェーンの先頭に置くことで、約物だけがこのフォントに当たり、
残りの文字は次の `Noto Sans JP` に落ちる**。CDN から読み込む。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@4.0.0/dist/css/yakuhanjp.css">
```

本文フォントは **Noto Sans JP**（Google Fonts、weight 100〜900 の全ウェイト）。
macOS では `Hiragino Sans`、Windows では `Meiryo` に落とすフォールバックを持つが、
実運用では Noto Sans JP が当たる。

**簡略版のチェーンも併存する。** `about` ページの一部要素は
`"Noto Sans JP", sans-serif` と YakuHanJP なしで書かれている。
**新規に組むときは YakuHanJP 付きの完全なチェーンに揃える。**

### 3.2 欧文フォント

**自社の Latin ディスプレイ書体を3種 self-host している。**

```css
@font-face { font-family: "Azabudai Regular";  src: url("../fonts/AZABUDAI-regular.woff")  format("woff"); font-weight: 400; }
@font-face { font-family: "Azabudai Bold";     src: url("../fonts/AZABUDAI-bold.woff")     format("woff"); font-weight: 700; }
@font-face { font-family: "Azabudai Condence"; src: url("../fonts/AZABUDAI-condence.woff") format("woff"); font-weight: 400; }
```

| Family | 用途 | 実測 |
|--------|------|------|
| `Azabudai Bold` | ページタイトル | 54px / 400 / lh 1.1 / 色 `#ffffff` |
| `Azabudai Regular` | セクション見出し | 32〜33px / 400 / lh 1.0〜1.2 / ls 0.99px |
| `Azabudai Condence` | 幅の狭い見出し | 35px / 400 / lh 1.0 / ls 1.05px |

**英字見出しは必ずこの3種のどれか。** Noto Sans JP の欧文グリフを見出しに使わない。
ロゴの「AZABUDAI HILLS」も同じ骨格の字形で、**サイト全体の欧文が
ロゴと同じ声で喋る**。

`font-weight` は `400` を指定する（Bold は family 名で切り替える）。

### 3.3 font-family 指定

```css
/* body は Webflow 既定のまま。ここを和文にしない */
body {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 14px;
  line-height: 1.43;   /* 20px */
  color: #000000;
}

/* 和文は要素ごとに指定する */
.jp {
  font-family: YakuHanJP, "Noto Sans JP", "Hiragino Sans",
               "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  letter-spacing: normal;
}

/* 英字見出し */
.en-title      { font-family: "Azabudai Bold", sans-serif; font-weight: 400; }
.en-section    { font-family: "Azabudai Regular", sans-serif; font-weight: 400; }
.en-condensed  { font-family: "Azabudai Condence", sans-serif; font-weight: 400; }
```

**フォールバックの考え方**:
- **約物専用フォントが先頭**（`YakuHanJP`）→ 和文Webフォント（`Noto Sans JP`）→
  macOS（`Hiragino Sans` / `Hiragino Kaku Gothic ProN`）→ Windows（`Meiryo`）→ generic
- 欧文は**和文チェーンに混ぜず**、別 family で明示する
- `body` の Arial チェーンに依存しない（和文を持たないため）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title (EN) | Azabudai Bold | 54px | 400 | 1.1 (59.4px) | normal | 「ABOUT AZABUDAI HILLS」。色 `#ffffff` |
| Section Title (EN) | Azabudai Condence | 35px | 400 | 1.0 (35px) | **1.05px** | 「SPECIAL INTERVIEW」 |
| Section Title (EN) | Azabudai Regular | 33px | 400 | 1.2 (39.6px) | **0.99px** | 「What's on」 |
| Section Label (EN) | Azabudai Regular | 32px | 400 | 1.0 (32px) | normal | 「OUR STORY」。色 `#c3dc93` |
| Concept Head | YakuHanJP + Noto Sans JP | 28px | **500** | 1.4 (39.2px) | **1px** | 「緑あふれる広場のような街へ、ようこそ。」色 `#003a40` |
| Section Head | YakuHanJP + Noto Sans JP | 24px | **500** | 1.4 (33.6px) | normal | 「施設概要」「立地」。色 `#003a40` |
| Sub Head | Noto Sans JP | 20px | **700** | 1.5 (30px) | normal | 「ワークプレイス」。色 `#003a40` |
| Card Title | YakuHanJP + Noto Sans JP | 18px | 500 | 1.4 (25.2px) | normal | 施設名 |
| Body | YakuHanJP + Noto Sans JP | 15px | 400 | **1.86** (27.9px) | normal | 本文。色 `#333333` |
| Body Green | YakuHanJP + Noto Sans JP | 15px | 400 | **1.7** (25.5px) | normal | 深緑の本文。色 `#003a40` |
| Nav | YakuHanJP + Noto Sans JP | 15px | 400 | 1.2 (18px) | normal | 「最新情報」「ショップ＆レストラン」 |
| Nav Sub | YakuHanJP + Noto Sans JP | 15px | 400 | 1.52 (22.77px) | normal | ドロワー内。色 `#333333` |
| Strong | YakuHanJP + Noto Sans JP | 15px | **700** | 1.5 (22.5px) | normal | 「タワー形状および外観デザイン」 |
| Utility | YakuHanJP + Noto Sans JP | 12px | 400 | 1.52 (18.2px) | normal | ヘッダー右上「アクセス」等 |
| Footer Link | YakuHanJP + Noto Sans JP | 12px | **300** | 1.5 | normal | フッター。色 `#e2e2e2` |
| Credit | Noto Sans JP | 12px | 400 | 1.5 | normal | 「©Raquel Deniz」。写真上に白文字 |

**ウェイトは 300 / 400 / 500 / 700 の4値。**
**見出しは 500**（Medium）が基本で、700 を使うのは小見出し（20px / 15px）だけ。
**大きい見出しほど軽い**という逆転した設計で、これが上品さの正体。

### 3.5 行間・字間

- **本文は 1.7〜1.86**。15px → 25.5px（緑の本文）/ 27.9px（黒の本文）
- **見出しは 1.4**。英字見出しは **1.0〜1.2** まで詰める
- **`letter-spacing` は全要素 `normal`**。字間で調整しない
  - 例外1: コンセプト見出し 28px → **1px**（0.036em）
  - 例外2: 英字見出し 33px → 0.99px / 35px → 1.05px（どちらも **0.03em**）
- **`letter-spacing: normal` で成立するのは YakuHanJP が約物を詰めているから**。
  YakuHanJP を外すと約物のアキが目立つので、**セットで扱う**

```css
/* 本文 */
.body-text {
  font-family: YakuHanJP, "Noto Sans JP", "Hiragino Sans",
               "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.86;      /* 27.9px */
  letter-spacing: normal;
  color: #333333;
}

/* コンセプト見出し — 中央揃え・1行ずつ改行 */
.concept-head {
  font-size: 28px;
  font-weight: 500;
  line-height: 1.4;       /* 39.2px */
  letter-spacing: 1px;    /* 唯一の和文の字間指定 */
  color: #003a40;
  text-align: center;
}
```

### 3.6 禁則処理・改行ルール

- **コンセプト文は1行ずつ `<br>` で改行し、中央揃えにする**。
  自動折り返しに任せず、意味の切れ目で改行する

  ```
  麻布台ヒルズのコンセプトは、
  「緑に包まれ、人と人をつなぐ「広場」のような街−Modern Urban Village−」です。
  都市の本質はそこに生きる人にあるからこそ、
  ```

- **約物の処理は YakuHanJP に任せる**。`text-spacing` や `letter-spacing` の
  マイナス値で詰めない
- 「麻布台ヒルズ」「Modern Urban Village」「Green&Wellness」は途中で折らない
- 施設名の中黒（`ショップ＆レストラン` `アート＆ギャラリー`）は
  **全角アンパサンド `＆`** を使う。半角 `&` に置き換えない
- 「−」は全角マイナス（U+2212 ではなく U+FF0D）を使っている

### 3.7 OpenType 機能

```css
/* font-feature-settings は使わない（normal） */
```

- **`palt` を使わない。** 約物のアキは `YakuHanJP` が字形レベルで解決するため、
  OpenType 機能に頼らない
- **`palt` と `YakuHanJP` を併用しない**。二重に詰まって和文が窮屈になる

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| YakuHanJP | **そのまま**（jsDelivr CDN）| MIT ライセンスの公開フォント |
| Noto Sans JP | **そのまま**（Google Fonts）| 公開Webフォント |
| Azabudai Regular / Bold / Condence | **Jost**（Google Fonts）で代替 | **自社フォント。配信されない** |

`Azabudai` はジオメトリックサンセリフ寄りで、大文字の字幅が広く
トラッキングを開いて使う。Google Fonts では **Jost**（Futura 系ジオメトリック）が
骨格・字幅ともに近い。`letter-spacing: 0.03em` を必ず添える。

---

## 4. Component Stylings

### Buttons

**主要 CTA は枠線ボタン1種類。塗りの CTA を持たない。**

```css
/* Primary — サイト唯一の主要 CTA */
.btn-outline {
  display: flex; align-items: center; justify-content: center;
  width: 300px; height: 50px;
  background: transparent;
  color: #003a40;
  border: 1px solid #003a40;
  border-radius: 10px;
  font-family: YakuHanJP, "Noto Sans JP", "Hiragino Sans",
               "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  font-size: 15px; font-weight: 400; letter-spacing: normal;
  text-decoration: none;
}
```

用例: 「麻布台ヒルズについて →」「詳しく見る →」

右端に `→` を置く（`::after` の矢印ではなく文字として入っている）。

```css
/* Category Link — 枠線・角丸なし */
.btn-category {
  background: transparent;
  color: #00875f;
  border: 1px solid #00875f;
  border-radius: 0;          /* こちらは角丸を持たない */
  padding: 12px;
  font-size: 15px; font-weight: 400;
}
```

用例: 「レストラン」「ショップ」「サービス」「マーケット」

```css
/* Search Submit — 唯一の塗りボタン（検索フォーム内） */
.btn-search {
  background: #00875f; color: #ffffff;
  border: 0; border-radius: 0;
  padding: 10.4px 24px 9.6px;
  font-size: 15px; font-weight: 400;
}
```

**塗りは検索ボタンだけ。** ページ本体の CTA を塗らない。

### Cards

```css
.card {
  background: #ffffff;
  border-radius: 10px;               /* 0.625rem */
  box-shadow: 0 4px 10px rgba(0,0,0,.05);
  overflow: hidden;
}
```

- 写真は 16:9 または 4:3。**カード幅いっぱいのフルブリード**
- 写真の下に施設名（18px / 500）とカテゴリ（12px / `#5c5c5c`）
- 角丸は **10px 一択**。カード・ボタン・画像すべて同じ

### Photo Credit

```css
.credit {
  background: rgba(0,0,0,.08);
  color: #ffffff;
  font-size: 12px; font-weight: 400;
  padding: 2px 8px;
  border-radius: 0;
}
```

写真の隅に置く。黒ベタではなく **8% の極薄い面**で、写真の階調を殺さない。

### Pagination

```css
.page-num        { background: #dddddd; color: #333333; border-radius: 3px; padding: 2px 8px; font-size: 12.8px; }
.page-num.is-current { background: #666666; color: #eeeeee; }
```

角丸 **3px**。カード（10px）と使い分ける。

### Navigation

**2段構成のヘッダー。**

```
1段目: JP▾（言語切替）  ロゴ「AZABUDAI HILLS」＋緑の下線  麻布台ヒルズについて / アクセス / インフォメーション / 🔍
2段目: 最新情報 / ショップ＆レストラン / マーケット / アート＆ギャラリー / ホテル＆レジデンス /
       ワークプレイス / スクール / グリーン＆ウェルネス
```

- ロゴの下に **`#00875f` の 4px 帯**を引く。サイトのアイデンティティ
- 1段目のユーティリティは 12px / `#333333`
- 2段目のグローバルナビは 15px / `#000000`。現在地は **`#00875f`**
- ヘッダーは白背景。境界線を引かず、影 `0 4px 10px rgba(0,0,0,.05)` で浮かせる

### Search Overlay

```css
.search-overlay { background: rgba(255,255,255,.85); }
.search-input   { background: #f7f7f7; border: 0; border-radius: 0; font-size: 15px; }
```

### Sections

- 既定は白 `#ffffff`
- コンセプト・施設概要は **淡緑 `#e6f0e7`**
- ヒーローと写真セクションは**フルブリード**（コンテナ幅を超える）
- 写真の下端に `linear-gradient(…, rgba(0,0,0,.1) 50%, #000 90%)` のスクリムを重ね、
  白い見出しを載せる

---

## 5. Layout Principles

### Container

| 用途 | Max Width |
|------|-----------|
| **標準コンテナ** | **940px**（Webflow 既定）|
| 読み物 | 728px |
| 写真セクション | フルブリード（100vw）|
| サムネイル | 360px / 195px |

### Grid

- 施設カード: 3カラム（940px 内）→ 991px 以下で 2カラム → 767px 以下で 1カラム
- グローバルナビ: 8項目の横並び。991px 以下でハンバーガー
- カテゴリリンク: 4カラム（レストラン / ショップ / サービス / マーケット）

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 10px |
| M | 12px |
| L | 24px |
| XL | 40px |
| 2XL | 60px |
| 3XL | 100px（セクション間）|

### Border Radius

| 用途 | Value |
|------|-------|
| **カード・CTA・画像** | **10px**（0.625rem）|
| ページネーション | 3px |
| アイコン・アバター | 50% |
| ピル（言語切替等） | 999rem |
| カテゴリリンク | **0px**（角丸を持たない）|

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | セクション・本文 |
| **1** | **`0 4px 10px rgba(0,0,0,.05)`** | **ヘッダー・カード。最頻出** |
| 2 | `0 0 10px rgba(0,0,0,.1)` | ドロワー・ドロップダウン |
| 3 | `0 0 0 3px rgba(0,0,0,.25), 0 …` | 検索オーバーレイ |
| Focus | `0 0 3px 1px #3898ec` | Webflow 既定のフォーカスリング |

**影は薄い。** 最大でも `rgba(0,0,0,.1)`。階層は次の3つでつくる。

1. **面色** — `#ffffff` → `#f8f8f8` → `#e6f0e7`
2. **写真のフルブリード** — コンテナを超えることで前面に出す
3. **`0 4px 10px rgba(0,0,0,.05)`** — 影は「浮いている」と言うだけの最小限

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文チェーンの**先頭に必ず `YakuHanJP`** を置く
  （`YakuHanJP, "Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif`）
- `letter-spacing` は **`normal`**。約物のアキは YakuHanJP に任せる
- 英字見出しは `Azabudai Regular / Bold / Condence` を使い、`letter-spacing: 0.03em` を添える
- 見出しの `font-weight` は **500**。700 は 20px 以下の小見出しだけ
- 本文の `line-height` は **1.7〜1.86**
- 有彩色は緑だけ。`#003a40`（文字・枠）と `#00875f`（アクション）を使い分ける
- CTA は**枠線ボタン**（`1px solid #003a40` / radius 10px / 300×50px）
- 角丸は **10px** に統一する
- コンセプト文は `<br>` で意味の切れ目に改行し、中央揃えにする
- 「＆」は全角を使う（`ショップ＆レストラン`）
- 写真クレジットは `rgba(0,0,0,.08)` の極薄い面に白文字

### Don't（禁止）

- `font-feature-settings: "palt"` を使わない（YakuHanJP と併用しない）
- `letter-spacing` を和文に大きく足さない（例外は 28px 見出しの 1px だけ）
- **主要 CTA を塗らない**（塗りは検索ボタンだけ）
- 見出しに `font-weight: 700` 以上を使わない（大見出しほど軽くする）
- 緑以外の有彩色（赤・青・黄）を UI に足さない
- `body` の `font-family`（Arial チェーン）に和文を頼らない
- カードの角丸を 10px 以外にしない
- 濃い影を使わない（最大 `rgba(0,0,0,.1)`）
- 半角の `&` や `~` を施設名に使わない

---

## 8. Responsive Behavior

### Breakpoints

Webflow 既定の4段。

| Name | Width | 説明 |
|------|-------|------|
| Mobile P | ≤ 479px | 最小 |
| **Mobile L** | **≤ 767px** | **主境界**（15箇所）。1カラム化 |
| Tablet | ≤ 991px | ナビがハンバーガーへ |
| Desktop S | ≤ 1170px | コンテナが縮む |
| Desktop | ≥ 1171px | 標準 |

補助的に `500px` / `415px` も使う。

### モバイルでの変化

- グローバルナビ 8項目 → ハンバーガー + フルスクリーンドロワー
- カード 3カラム → 2カラム（≤991px）→ 1カラム（≤767px）
- ページタイトル 54px → 32px 前後
- コンセプト見出し 28px → 20px 前後
- CTA `width: 300px` → `width: 100%`
- **`letter-spacing: normal` と YakuHanJP は維持する**

### タッチターゲット

- CTA は 300×50px で基準を満たす
- 1段目のユーティリティ（12px）はモバイルではドロワーに移し、15px 以上に上げる
- ページネーション（`padding: 2px 8px`）はモバイルで 44px 四方に拡張する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Surface:         #f8f8f8
Surface Green:   #e6f0e7（コンセプト・概要セクション）
Deep Green:      #003a40（見出し・本文・CTA の枠線）
Green:           #00875f（アクション・ロゴ下線・検索ボタン / hover #179c75）
Sage:            #c3dc93（英字ラベル）
Text:            #333333
Text Muted:      #5c5c5c / #8c8c8c
Divider:         #dddddd
JP Font:         YakuHanJP, "Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
EN Font:         "Azabudai Bold" / "Azabudai Regular" / "Azabudai Condence"（自社。代替は Jost）
Base Size:       15px（本文）/ 14px（body 既定）
Line Height:     1.86（本文 15px）/ 1.4（和文見出し）/ 1.0〜1.2（英字見出し）
Letter Spacing:  normal（全要素）/ 1px（28px 見出し）/ 0.03em（英字見出し）
Font Weight:     300 / 400 / 500（見出し）/ 700（20px 以下の小見出しのみ）
Border Radius:   10px（カード・CTA・画像）/ 3px（ページネーション）/ 0px（カテゴリリンク）
Shadow:          0 4px 10px rgba(0,0,0,.05)
palt:            off（YakuHanJP が約物を処理するため不要）
Container:       940px（標準）/ 728px（読み物）/ フルブリード（写真）
Breakpoint:      767px（主）/ 479 / 991 / 1170px
```

### プロンプト例

```
麻布台ヒルズ（AZABUDAI HILLS）のデザインシステムに従って、
施設紹介ページを作成してください。
- 地色は #ffffff。コンセプト文のセクションだけ #e6f0e7 の淡緑の面にする
- 有彩色は緑だけ。#003a40（見出し・本文・枠線）と #00875f（アクション）の2段で使い分け、
  赤・青・黄を一切足さない
- 和文のフォントチェーンは必ず先頭に YakuHanJP を置く:
    YakuHanJP, "Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
  約物のアキは YakuHanJP に任せるので、letter-spacing は normal のままにする
  font-feature-settings: "palt" は使わない（二重に詰まる）
- 英字見出しは別 family（Jost で代替）に letter-spacing: 0.03em を添える。
  和文チェーンで英字見出しを組まない
- 見出しの font-weight は 500。700 を使うのは 20px 以下の小見出しだけ
  （大見出しほど軽くする）
- 本文は 15px / 400 / line-height 1.86 / color #333333
- コンセプト見出しは 28px / 500 / line-height 1.4 / letter-spacing 1px /
  color #003a40 / 中央揃え。意味の切れ目で <br> を入れる
- 主要 CTA は枠線ボタン1種だけ:
  width 300px / height 50px / transparent / 1px solid #003a40 /
  border-radius 10px / 15px / 400 / 右端に →
  塗りの CTA を作らない（塗るのは検索の送信ボタン #00875f だけ）
- カテゴリリンクは 1px solid #00875f / border-radius 0 / padding 12px
- カードは border-radius 10px / box-shadow 0 4px 10px rgba(0,0,0,.05)。角丸は 10px に統一する
- 写真はフルブリード。下端に linear-gradient(rgba(0,0,0,0) 50%, #000 90%) のスクリムを重ね、
  白い見出しを載せる。クレジットは rgba(0,0,0,.08) の面に白文字 12px
- 「＆」は全角を使う（ショップ＆レストラン）
- 版面は 940px 中央寄せ。主ブレークポイントは 767px（ほかに 479 / 991 / 1170px）
```
