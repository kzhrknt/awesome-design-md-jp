# DESIGN.md — 京都精華大学（KYOTO SEIKA UNIVERSITY）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-10 / 対象: `https://www.kyoto-seika.ac.jp/`, `https://www.kyoto-seika.ac.jp/about/idea/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **装飾をすべて外す。** 角丸 0・影 0・CSS 変数 0。純黒 `#000000` と水色だけで組み、**下線まで `linear-gradient` のハードストップで引く**。美術大学らしく、画面の情報は文字と写真だけにする
- **密度**: 低い。`line-height: 2.0` が最多（46 要素）で、学部・コース名を大きく空けて並べる
- **キーワード**: Web フォント 0 本、純黒、水色 3 種、角丸 0・影 0、下線はグラデーション

**このサイトの核心は5つある。**

1. **Web フォントを 1 本も読み込まない。** フォントファイルのリクエストは **0 件**。`document.fonts` に載るのは `Anton`（×3・`unloaded`）と `swiper-icons`（`unloaded`）だけで、本文はすべて OS のローカル書体
2. **欧文の `Barlow` は 30 要素に指定されているのに、1 本も宣言されていない。** 原因は Google Fonts の URL:
   **`fonts.googleapis.com/css?family=Anton&family=Barlow:400,600,700&display=swap`**。
   `/css?`（v1 エンドポイント）に `&family=` を重ねる v2 の書き方を混ぜているため、**返ってくるのは Anton の 3 本だけで Barlow は 1 件も含まれない**。ステータスは 200 なのでエラーにならず、**黙って `sans-serif` に落ちる**
3. **`font-feature-settings` は 0 要素だが、これは「効かない」のではなく「やっていない」。** 同一ページ・同一スタックで `normal` **937.97px** → `"palt"` **881.89px** の **−6.0%** が実測できる。**ヒラギノは詰められるのに使っていない**
4. **下線を `text-decoration` ではなく背景のハードストップで引く。**
   `linear-gradient(rgba(0,0,0,0) 95%, rgb(0,193,249) 95%)` が **36 要素**。停止位置を **95% と 94% で打ち分けている**
5. **ヒーローの巨大な「写真で塗られた文字」は `<canvas>`。** `.mainVisual` の中に **2732×1372** の canvas があり、`O E K S / I Y A T` の字形はそこに描かれている。`document.images` にも `writing-mode` にも出てこない

---

## 2. Color Palette & Roles

**CSS Custom Properties は実質 0 個。** `:root` にあるのは Swiper の既定値 2 個（`--swiper-theme-color` / `--swiper-navigation-size`）だけで、**自社トークンは 1 つも無い**。色はすべて CSS に直書きされている。

### Primary（ブランドカラー）

**水色が 3 つあり、用途が違う。まとめてはいけない。**

| 実装値 | 実測 | 用途 |
|--------|------|------|
| **`#1dc5ff`** | 可視 2 要素 | **ヒーローのコピー「話そう、セイカと。」と `CLICK`**（文字色） |
| **`#00c1f9`** | **36 要素** | **リンクの下線**（`linear-gradient(transparent 95%, #00c1f9 95%)`） |
| **`#01a6db`** | 2 要素 | **パンくず**（`HOME` `大学紹介`） |

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Text Primary** | **`#000000`** | **可視 104 要素（下層 87 要素）**。**このサイトは本文に純黒を使う** |
| **Surface Dark** | **`#545454`** | 施設カードの面（`情報館` `京都精華大学ギャラリーTerra-S` など 8 要素）／CTA の面 |
| **Text Muted** | `#999999` | `MORE`（3 要素） |
| **Text Secondary** | `#666666` | `受賞・出版等` `その他`（3 要素） |
| **Text on Dark** | `#ffffff` | 暗い面の上の文字（8 要素） |
| **Background** | `#ffffff` | ページ背景（`pageBackground.resolved` = `rgb(255,255,255)`） |

> **純黒 `#000000` が既定。** `#333333` や `#222222` に置き換えると印象が変わる。

---

## 3. Typography Rules

### 3.1 和文フォント

**Web フォントは使わない。OS のローカル書体だけで組む。**

- **ゴシック体（唯一）**: `Hiragino Kaku Gothic Pro`（macOS）→ `游ゴシック体` / `Yu Gothic`（Windows）→ `メイリオ`
- 明朝体は使っていない
- フォント要求 **0 件**。`@font-face` は CSS 全文で **1 件のみ**で、それは Swiper のアイコン（base64 の woff）

### 3.2 欧文フォント

- **宣言**: `Barlow`（400 / 600 / 700）と `Anton`
- **実態**: **どちらも 1 本も読み込まれていない**
  - `Barlow` は Google Fonts の URL の書き方が原因で **CSS に 1 件も含まれない**（3.3 を参照）
  - `Anton` は 3 本が宣言されるが**可視 0 要素**なのでダウンロードされない（`unloaded` が正常）
- `Barlow` を指定している 30 要素（`LANGUAGE` `ENGLISH` `MENU` `CLICK` `DIALOGUE` `12/6`）は、**端末に Barlow が入っていなければ `sans-serif` で描画される**

### 3.3 font-family 指定

```css
/* 本文（実サイトのまま） */
font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", "ヒラギノ角ゴ W3",
             游ゴシック体, "Yu Gothic", YuGothic, メイリオ, sans-serif;

/* 欧文ラベル（実サイトのまま・Barlow は届いていない） */
font-family: 'Barlow', sans-serif;
font-family: 'Barlow', "Hiragino Kaku Gothic Pro", /* …以下和文スタックと同じ */ ;
```

#### 実サイトはこうだが、正しくはこう ①：Google Fonts の URL

```css
/* 実サイト — Barlow が 1 本も返ってこない（200 OK なので気づけない） */
@import url("https://fonts.googleapis.com/css?family=Anton&family=Barlow:400,600,700&display=swap");

/* 正しくは v2 エンドポイントを使う */
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;600;700&display=swap");

/* または v1 のまま書くなら | で区切る */
@import url("https://fonts.googleapis.com/css?family=Anton|Barlow:400,600,700&display=swap");
```

> **`/css?`（v1）は `family=` を 1 つしか見ない。** 2 つ目以降は黙って捨てられる。
> 実際にこの URL を叩くと、返るのは `font-family: 'Anton'` の `@font-face` 3 件だけだった。

#### 実サイトはこうだが、正しくはこう ②：游ゴシックの Medium

```css
/* 実サイト — Medium がスタックに 1 つも無い */
… 游ゴシック体, "Yu Gothic", YuGothic, メイリオ, sans-serif;

/* 正しくは Medium を Regular より前に置く */
… "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, "Yu Gothic", YuGothic, メイリオ, sans-serif;
```

**Windows では `游ゴシック`（Regular）に当たって細く出る。** このサイトは `font-weight: 700` を 47 要素に当てているので、その分は合成太字で補われるが、**400 の本文は macOS（ヒラギノ）より明らかに細くなる。**

### 3.4 文字サイズ・ウェイト階層

`html` は **`font-size: 62.5%` ＝ 10px**。`body` も 10px。
**1940 / 1440 / 1200 / 1025 / 1024 / 834 / 769 / 768 / 767 / 415 / 390 / 375px の 15 幅すべてで 10px 固定**（流体も崖も無い）。
サイズは `rem`（`2rem` = 20px）と `font-size: %`（CSS 全文で 17 箇所）で刻む。

| 用途 | 実測 px | rem | weight | 実測件数 |
|------|---------|-----|--------|----------|
| ヒーローのコピー | **45px** | 4.5rem | **700** | 1 要素 |
| ページ見出し | **32px** | 3.2rem | 700 | 下層 3 要素 |
| セクション見出し（和欧併記） | **26px** | 2.6rem | 700 | 5 要素 |
| 中見出し | **22px** | 2.2rem | 700 | 5 要素 |
| **本文 `p`** | **20px** | **2rem** | 400 | — |
| 小見出し・学部名 | **18px** | 1.8rem | 700 | 18 要素 |
| リスト・ナビ | **16px** | 1.6rem | 400 | 28 要素 |
| ラベル（`CLICK` `MORE`） | **14px** | 1.4rem | **600** | 20 要素 |
| コース名 | **13px** | 1.3rem | 400 | 20 要素 |
| 注記 | **12px** | 1.2rem | 400 | 10 要素 |
| 最小ラベル（`LANGUAGE` `MENU`） | **11px** | 1.1rem | 600 | 2 要素 |

> **`1rem` = 10px。** `2rem` と書いて 20px になる設計なので、**16px 前提で `rem` を書くと全部 1.6 倍ずれる。**

#### ウェイトは実質 2 面（600 と 700 は合成太字）

`Hiragino Kaku Gothic Pro` は **W3 の 1 本**しか持たない。隠し div の実測は 2 面に割れた。

| 指定 | 実測幅 | 実際の描画 |
|------|--------|-----------|
| 100 / 200 / 300 / 400 / 500 | **937.97px** | **W3（Regular）** |
| **600** / **700** / 900 | **947.25px** | **合成太字**（ブラウザが W3 を太らせている） |

**実サイトは 400（58 要素）/ 700（47 要素）/ 600（15 要素）を使っているが、600 と 700 の見た目は同じ。**
**600 と 700 を書き分けない。** どちらも同じ合成太字になる。

### 3.5 行間・字間

#### 行間

| 用途 | line-height | 実測件数 |
|------|-------------|----------|
| **既定（本文・リンク）** | **2.00** | トップ 46 / 下層 41 要素（最多） |
| コース名のリスト | **1.65** | 20 要素 |
| 学部名 | **1.80** | 12〜15 要素 |
| カード見出し | **1.60** | 16 要素 |
| ニュース見出し | 1.70 | 6 要素 |
| 1 行もの（`LANGUAGE` など） | 1.00 | 4〜5 要素 |

**1 未満の比率が 1 件も無い**＝無単位で宣言されており、絶対値 px は降っていない。

#### 字間

`body` に **`letter-spacing: .05em`**。`body` が 10px なので **`0.5px` が継承値**（トップ 56 要素）。
**ただし大きい文字には要素側で `em` を当て直している**ので、2 つの方式が混在する。

| 要素 | font-size | letter-spacing | 由来 |
|------|-----------|----------------|------|
| 本文・ナビ | 16px / 13px | **0.5px** | **body から継承**（56 要素） |
| 学部名・リスト | 16px | **0.8px** | 要素側 `0.05em` |
| フッターリンク | 14px | **0.7px** | 要素側 `0.05em` |
| 学部カードの見出し | 22px | **1.76px** | 要素側 **`0.08em`** |
| セクション見出し（和） | 26px | **1.82px** | 要素側 **`0.07em`** |
| セクション見出し（欧） | 16px | **1.60004px** | 要素側 **`0.1em`** |
| ページ見出し（下層） | 32px | **2.5px** | 要素側 **`0.078em`** |
| **ヒーローのコピー** | **45px** | **3.15px** | 要素側 **`0.07em`** |

> **`0.5px` は「10px × 0.05em」の結果**であって設計値ではない。**px で書かない。**
> 大きい見出しほど `em` を上げる（0.05 → 0.07 → 0.08 → 0.1em）のがこのサイトの字間設計。

### 3.6 禁則処理・改行ルール

- `body` の `word-break` は **`normal`**（15 幅すべてで変化なし）
- `word-break: break-all` も `overflow-wrap` も `auto-phrase` も使っていない。**ブラウザ既定の禁則処理に任せる**

### 3.7 OpenType 機能

- **`font-feature-settings` は両ページとも 0 要素。** CSS にも宣言が無い
- **ただし書体は対応している。** 同一ページ・同一スタックで
  `normal` **937.97px** → `"palt"` **881.89px**（**−6.0%**）／ `"halt"` **897.97px**
- つまり **「効かない」のではなく「できるのにやっていない」**
- **既存ページに `palt` を足すと、見出しの字幅が 6% 詰まって別物になる。** 再現するときは**書かない**のが正しい

### 3.8 縦書き

**使っていない**（`writing-mode: vertical-rl` は両ページとも 0 要素）。

---

## 4. Component Stylings

### 下線（このサイトで最も特徴的な部品）

`text-decoration` を使わず、**背景のハードストップ**で引く。

```css
/* リンクの水色下線（実測 36 要素） */
background-image: linear-gradient(rgba(0, 0, 0, 0) 95%, #00c1f9 95%);

/* 黒の下線（実測 7〜8 要素） */
background-image: linear-gradient(rgba(0, 0, 0, 0) 95%, #000000 95%);

/* 太めの黒下線（実測 6 要素・停止位置が 94%） */
background-image: linear-gradient(rgba(0, 0, 0, 0) 94%, #000000 94%);
```

- **停止位置 95% と 94% を打ち分けて太さを変えている。** 丸めない
- 利点は、`text-decoration` と違って**下線の位置と太さを行の高さに対して決められる**こと

### Buttons

| 種類 | 面 | 文字 | radius | size / weight / 字間 |
|------|----|------|--------|---------------------|
| **Primary（施設・CTA）** | **`#545454`** | `#ffffff` | **0** | 18px / 700 / 0.5px |
| **テキストリンク** | 透明 | `#000000` | 0 | 18px / 700 / 0.5px |
| **リストリンク** | 透明 | `#000000` | 0 | 16px / 700 / 0.5px |
| **`MORE`** | 透明 | `#999999` | 0 | 14px / 600 / 1px |

### Cards

- **角丸 0・影 0。** 面と罫線だけで組む
- トップに `border-radius: 0 20px` が 1 要素、`50%` が 1 要素（アイコン）あるだけで、**下層ページの角丸は 0 種**

### 見出しの和欧併記

セクション見出しは**和文と欧文を 1 行に重ねる**（`大学からのお知らせINFORMATION` が 1 要素として取れる）。

```css
.section-title      { font-size: 2.6rem; font-weight: 700; letter-spacing: .07em; }  /* 和文 26px */
.section-title .en  { font-size: 1.6rem; font-weight: 600; letter-spacing: .1em;
                      font-family: 'Barlow', sans-serif; }                            /* 欧文 16px */
```

---

## 5. Layout Principles

### Container

- `max-width` のトークンは持たない（実測のコンテナ値は下層の `100%` が 1 件のみ）
- 幅は `%` と `vw` で組む（`html { padding: 60px 6.4vw 6.4vw }` のように**パディング側を `vw`** にする）

### Spacing

`gap` の実測は **`30px normal`（16 要素）** と **`40px`（2 要素）**、`18px 28px`、`0 20px`。
8 や 4 の倍数グリッドではなく、**10 の倍数**で刻む（`html` が 10px なので `3rem` = 30px）。

### Breakpoints

```
767px / 768px   ← 主ブレークポイント（max-width:767 が 76 件、min-width:768 が 25 件）
1160px          ← 中間（7 件）
359px / 350px   ← 小型端末向けの入れ子（max-width:767 and max-width:359 が 9 件）
print           ← 印刷用（7 件）
```

> **`screen and (max-width: 767px) and (max-width: 359px)` という入れ子の書き方**をしている。
> 最小端末（359px / 350px）まで面倒を見るのがこのサイトの方針。

---

## 6. Depth & Elevation

**影は 1 つも無い**（`box-shadow` は両ページとも **0 種**）。

- 面の分離は **`#545454` の塗り**と**罫線**だけで行う
- **角丸も実質 0。** 下層ページの `border-radius` は 0 種
- **グラデーションは下線にしか使わない**（上記のハードストップ 3 種）

```css
/* このサイトに存在しないもの */
box-shadow: …;        /* 0 件 */
border-radius: 8px;   /* 下層 0 件 */
```

---

## 7. Do's and Don'ts

### Do（推奨）

- **Web フォントを読み込まない。** OS のローカル書体スタックだけで組む
- **`html { font-size: 62.5% }` で `1rem` = 10px にする**
- **本文色は純黒 `#000000`**
- **`line-height` の既定は `2.0`**
- **字間は `body` に `.05em`、大きい見出しだけ要素側で 0.07 〜 0.1em に上げる**
- **下線は `linear-gradient(transparent 95%, #00c1f9 95%)`**（`text-decoration` を使わない）
- **角丸 0・影 0 を貫く**
- 水色は用途で **`#1dc5ff`（コピー）/ `#00c1f9`（下線）/ `#01a6db`（パンくず）** を使い分ける

### Don't（禁止）

- **`fonts.googleapis.com/css?family=A&family=B` と書かない。** v1 エンドポイントは 2 つ目以降の `family=` を捨てる。`css2?` を使うか `|` で区切る
- **`font-weight: 600` と `700` を書き分けない。** ヒラギノ角ゴ Pro は W3 の 1 本だけで、どちらも同じ合成太字になる
- **`font-feature-settings: "palt"` を足さない。** 書体は対応しているが（実測 −6.0%）、このサイトは意図的に使っていない。足すと見出しの字幅が変わる
- **`letter-spacing: 0.5px` と px で書かない。** `body` の `.05em` が正（ルートが 10px なので px 直書きは崩れる）
- **`rem` を 16px 前提で書かない。** `1rem` = 10px
- **角丸や影を足さない。** 下層ページには 1 つも存在しない
- **ヒーローの巨大な文字を CSS で実装しない。** 実物は `<canvas>`（2732×1372）に描かれている
- **水色を 1 つにまとめない。** 3 つあるのが実装の実態
- 本文に `#333333` を使わない（純黒が正）

---

## 8. Responsive Behavior

### ルートは完全固定

`html` も `body` も **15 幅すべてで 10px**。`letter-spacing` は `0.5px`、`line-height` は `20px` のまま動かない。
**変わるのは要素側だけ**で、しかも 767px の 1 箇所。

| 幅 | `html` | `body` | `h2` | `p` |
|----|--------|--------|------|-----|
| 1940 〜 **768px** | 10px | 10px | 10px（継承） | **20px** |
| **767px** 〜 375px | 10px | 10px | **12px** | **18px** |

- **崖も流体も無い。** `vw` が使われるのは `html` の `padding`（`6.4vw`）だけ
- 359px / 350px 以下でさらに微調整が入る

### タッチターゲット

- ナビのボタンは 44px 前後
- モバイルではヒーローの canvas が縮小され、コピーは横組みのまま

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
和文:      "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", "ヒラギノ角ゴ W3",
           游ゴシック体, "Yu Gothic", YuGothic, メイリオ, sans-serif
Webフォント: 使わない（0 本）
ルート:    html { font-size: 62.5% } → 1rem = 10px（全幅固定）
本文:      2rem（20px）/ line-height 2.0 / letter-spacing .05em
ウェイト:  400 と 700 の 2 段（600 は 700 と同じ合成太字）
本文色:    #000000（純黒）
水色:      #1dc5ff（コピー）/ #00c1f9（下線）/ #01a6db（パンくず）
面:        #545454
下線:      linear-gradient(rgba(0,0,0,0) 95%, #00c1f9 95%)
radius:    0
影:        なし
palt:      使わない
BP:        767px / 768px / 1160px / 359px
```

### プロンプト例

> 京都精華大学のデザインでニュース一覧を作って。Web フォントは読み込まず、
> `"Hiragino Kaku Gothic Pro", … , sans-serif` のローカルスタックで組む。
> `html { font-size: 62.5% }` にして `1rem` = 10px、本文は `2rem` / `line-height: 2.0` /
> `letter-spacing: .05em`、見出しは `2.6rem` / 700 / `letter-spacing: .07em`。
> 文字色は純黒 `#000000`、リンクの下線は
> `background-image: linear-gradient(rgba(0,0,0,0) 95%, #00c1f9 95%)` で引く。
> **角丸と影は 0**。`font-feature-settings` は書かない。`font-weight` は 400 と 700 だけ。
