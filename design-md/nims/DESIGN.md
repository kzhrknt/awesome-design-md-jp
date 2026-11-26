# DESIGN.md — 物質・材料研究機構（NIMS）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-26 / 対象: `https://www.nims.go.jp/`, `/nims/index.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: ライトとダークの 2 モードを**色トークンの差し替えだけ**で持つ。白地に紺（`#15274C`）／黒地に淡いシアン（`#91E9FF`）。左に固定の縦ナビ、本文は全幅
- **密度**: 中。本文 16px に `line-height: 1.5`、サイドナビは 13px に `1.9`。**字間は一切触らない**
- **キーワード**: `prefers-color-scheme` 73 ブロック、トークン 30 個の二重定義、字間 normal、`palt` 不使用

**このサイトの核心は4つある。**

1. **ライト／ダークの 2 モードを、`:root` の 30 個のトークンで切り替える。** `@media (prefers-color-scheme: dark)` が CSS 全文に **73 ブロック**あり、30 個のうち **25 個がダークで別の値に差し替わる**。`body { background-color: var(--color-base); color: var(--color-text) }` の 2 行だけで、地色は `#fff → #222222`、文字は `#333333 → #E2E2E2` に反転する
2. **字間を 1 つも設計していない。** `letter-spacing` の宣言は CSS 全文で **5 つだけ**（`0.01em` ×2 / `0.03em` / `0.08em` / `0px` / `normal`）で、実測は **`normal` が 148/150 要素（トップ）・153/155 要素（下層）**。残り 2 要素は Cookie 同意バー（外部）。字面の調整は**行間だけ**でやる
3. **`font-feature-settings` が CSS 全文に 0 件。ただし効かないわけではない。** Noto Sans JP で実測すると `palt` は **−13.2%** 効く（`normal` 816.95px → `"palt"` 709.00px、40px）。**できるのに使っていない**ので、足すと既存のレイアウトと別物になる
4. **`html { font-size: 62.5% }`（= 10px）だけを書き、`body` に `font-size` の宣言が無い。** 19 幅すべてで `html: 10px` / `body: 10px`。各要素が `1.6rem`（16px）のように直書きしているので大半は実害が出ていないが、**宣言を書き忘れた要素は 10px で出る**。実測でも `fontSize` 分布に **10px が 13 要素**ある（`メインコンテンツへ移動` `(別ウィンドウで開きます)` など）

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

**同じトークン名がモードで別の色を指す。両方を並べて書く。**

| トークン | ライト | ダーク | 実測 |
|----------|--------|--------|------|
| `--color-primary01` | **`#15274C`** | **`#CCCCCC`** | 濃紺の面（ライト 22 要素）。ダークでは**色を捨ててグレーに退避** |
| `--color-primary02` | **`#00CCFF`** | **`#91E9FF`** | アクセントのシアン。ダークでは明度を上げる |
| `--color-corporate01` | **`#335599`** | **`#cccccc`** | コーポレートブルー。ダークではグレー |
| `--color-corporate02` | **`#335599`** | **`#00CCFF`** | **ライトでは `corporate01` と同値だが、ダークで別の色に分岐する** |
| `--color-hover01` | **`#0D41AC`** | **`#5AACFF`** | リンクのホバー／リンク文字（実測 16 要素） |
| `--color-text` | **`#333333`** | **`#E2E2E2`** | 本文（実測 **235 要素 / 239 要素**で最多） |
| `--color-alert` | **`#FF2626`** | **`#E62222`** | 警告。ダークではわずかに落とす |
| `--color-visited` | **`#551a8b`** | **`#BB83ED`** | 訪問済みリンク |

**モード共通（差し替えない 5 個）**: `--color-primary03` (`#0044CC`) / `--color-primary04` (`#002266`) / `--color-primary05` (`#0D41AC`) / `--color-secondary-gray07` (`#8892A5`) / `--color-text-sub1` (`#002266`)

> **`--color-primary00` はライトモードで空文字**（宣言が無い）。ダークでだけ `#15274C` が入る。**`var(--color-primary00)` を単独で使うとライトで無効になる。**

### Neutral（ニュートラル）

グレースケールのランプ 6 段が、**ダークで明度の順序ごと反転する**。

| トークン | ライト | ダーク |
|----------|--------|--------|
| `--color-base`（ページ地） | `#fff` | `#222222` |
| `--color-secondary-gray01` | `#777777` | `#888888` |
| `--color-secondary-gray02` | `#AAAAAA` | `#777777` |
| `--color-secondary-gray03` | `#CCCCCC` | `#666666` |
| `--color-secondary-gray04` | `#E0E0E0` | `#555555` |
| `--color-secondary-gray05` | `#EFEFEF` | `#444444` |
| `--color-secondary-gray06` | `#F7F7F7` | `#333333` |

青系の面 4 段は、**ダークでは同じ色の alpha 0.1 に置き換わる**（塗らずに透かす）。

| トークン | ライト | ダーク |
|----------|--------|--------|
| `--color-secondary-blue01` | `#7FA0E4` | `rgba(127, 160, 228, 0.1)` |
| `--color-secondary-blue02` | `#B2C6F0` | `rgba(178, 198, 240, 0.1)` |
| `--color-secondary-blue03` | `#E5ECFA` | `rgba(229, 236, 250, 0.1)` |
| `--color-secondary-blue04` | `#F1F5FD` | `rgba(241, 245, 253, 0.1)` |

### グラデーション

`--color-hover02` もモードで切り替わる。**角度・停止位置を丸めずそのまま写す。**

```css
/* ライト */
--color-hover02: linear-gradient(150deg, rgb(21,39,76) 45%, rgb(0,204,255) 140%, rgb(0,204,255) 90%);
/* ダーク */
--color-hover02: linear-gradient(150deg, rgba(51,85,153,1) 57%, rgba(145,233,255,1) 100%);
```

### アイコンの反転

SVG アイコンは**ファイルを差し替える方法と、`filter` で反転させる方法の 2 通り**を併用している。

```css
@media (prefers-color-scheme: dark) {
  .text-heading .head-h2::before { background: url(../img/icon/icon_head-h2_dark.svg); }  /* 差し替え */
  .p-text a.icon-pdf::before {
    filter: brightness(0) saturate(100%) invert(89%) sepia(4%) saturate(16%)
            hue-rotate(16deg) brightness(95%) contrast(85%) !important;                   /* 反転 */
  }
}
```

---

## 3. Typography Rules

### 3.1 和文フォント

- **既定**: **Noto Sans JP 1 ファミリーのみ**（Google Fonts、`wght@400;500;700;900`）。実測 **可視 150 要素（トップ）／ 155 要素（下層）＝ 100%**
- フォールバックは `sans-serif` **のみ**。`body { font-family: "Noto Sans JP", sans-serif }` の 2 語だけで、ヒラギノも游ゴシックもメイリオも書かれていない
- `@font-face` は 497 件あるが、これは Google Fonts の unicode-range サブセット。フォント要求は実測 **34 件**

### 3.2 欧文フォント

- **欧文専用の書体を持たない。** `Pick Up` `Press Release` `NEWS` `RECRUIT` などの英語ラベルも **Noto Sans JP で描画される**
- サイト内で唯一の別ファミリーは `slick`（カルーセルのアイコンフォント、`unloaded`）

### 3.3 font-family 指定

```css
html { font-size: 62.5%; }        /* = 10px。19 幅すべてで固定 */

body {
  background-color: var(--color-base);
  font-family: "Noto Sans JP", sans-serif;
  display: block;
  max-width: 100%;
  color: var(--color-text);
  /* font-size の宣言が無い → 10px のまま */
}
```

> **`body` に `font-size` を書いていない。** 各要素が `1.6rem`（16px）、`1.3rem`（13px）のように `rem` で直書きしている。**宣言を書き忘れた要素は 10px で描画される。**

### 3.4 文字サイズ・ウェイト階層

| 用途 | サイズ | weight | 実測件数 |
|------|--------|--------|----------|
| セクション見出し（欧文） | **40px** | 500 | 6 |
| ページ見出し（和文・下層） | 48px | 500 | 1 |
| カード見出し・リード | **20px** | 400 / 500 | 14 / 19 |
| 本文・ナビ | **16px** | 400 | **42 / 46（最多）** |
| リンク一覧 | 14px | 400 | 33 / 38 |
| サイドナビ・補足 | **13px** | 500 | 33 / 28 |
| 補助テキスト | 10px | 400 | 13 / 8 |

- 可視ウェイトは **400（102 / 120）／ 500（39 / 25）／ 700（7 / 8）** の 3 段。**600 の 2 要素は Cookie 同意バー（外部）**
- 実在するウェイトは **400 / 500 / 700 / 900 の 4 本**（URL の `wght@400;500;700;900` と一致）。100px の欧文文字列で実測すると `100・300・400 → 1059.58px` / `500 → 1084.28px` / `600・700 → 1116.25px` / `800・900 → 1148.20px` の 4 面に割れる
- **600 は 700、800 は 900 に丸まる。** 900 は宣言されているが可視 0 要素

### 3.5 行間・字間

**行間だけで密度を作る。4 段ある。**

| 行間比 | 件数（トップ / 下層） | 用途 |
|--------|------|------|
| **1.50** | 83 / 59 | 本文・カード |
| **1.90** | 29 / 48 | サイドナビ・フッターのリンク一覧（13px） |
| **1.15** | 32 / 24 | グローバルナビ |
| **1.80** | 4 / 21 | 下層の長い本文 |

**字間は一切指定しない。**

| 実測値 | 件数 | 正体 |
|--------|------|------|
| `normal` | **148 / 153** | サイト本体のすべて |
| `0.13008px` | 2 | Cookie 同意バー（外部スクリプト） |

> CSS 全文の `letter-spacing` 宣言は **5 つだけ**（`0.01em` ×2 / `0.03em` / `0.08em` / `0px` / `normal`）で、可視要素に 1 つも当たっていない。**`letter-spacing` を足すと、このサイトの字面ではなくなる。**

### 3.6 禁則処理・改行ルール

- `body { word-break: normal }`（19 幅すべて）。`break-all` も `auto-phrase` も使っていない

### 3.7 OpenType 機能

**`font-feature-settings` は CSS 全文に 0 件。実測も 0 要素。**

ただし **Noto Sans JP は `palt` のテーブルを持っており、足せば効く**。実測で `物質・材料研究機構「NIMS」は、研究する。`（40px・weight 400）が `normal` 816.95px → `"palt"` 709.00px ＝ **−13.2%**。

> **「書体が対応していないから使っていない」のではなく「できるのに使っていない」。** 親切のつもりで `palt` を足すと**和文が 13% 詰まり、カードの折り返し位置が全部変わる**。

### 3.8 縦書き

- **縦書きは使っていない**（`writing-mode: vertical-rl` 実測 0 要素・両ページ）

---

## 4. Component Stylings

### Buttons

```css
/* 一覧へのピル型リンク */
.c-buttonPill {
  border-radius: 100px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
}

/* サイドナビの寄附ボタン */
.c-sideDonate {
  padding: 5px;
  border: 1px solid var(--color-secondary-gray03);   /* ライト #CCCCCC / ダーク #666666 */
  border-radius: 20px;
  color: var(--color-text);
}

/* カテゴリバッジ（NEWS / RECRUIT） */
.c-badge {
  padding: 3px 12px;
  border-radius: 50px;
}
```

### Cards

```css
.c-card {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
}
```

- 角丸は **10px**（カード 11 / 19 要素）→ **100px**（ピル 6）→ **50px**（バッジ 5）→ **20px**（6）→ **32px**（1）、丸アイコンは `50%`（10 / 27）

### Inputs

- 検索はサイドナビの `検索` から開く。枠線は `1px solid #bbbbbb`

---

## 5. Layout Principles

### Spacing Scale

- gap は **18px**（10 要素で最多）→ **40px** → **30px 0** / **12px 0** → **10px**

### Container

- **最大幅を設けない。** 実測のコンテナは `100%` のみ（トップ 12 / 下層 28）。`body { max-width: 100% }`
- 左の固定ナビ（縦並び）＋ 右の本文という 2 カラム。ナビは 160px 前後

### Grid

- Pick Up のカルーセル、プレスリリースのカードは等幅の横並び。gap 18px

---

## 6. Depth & Elevation

**影はモードで濃さを変える。**

| 影 | 実測 | 用途 |
|----|------|------|
| `rgba(0, 0, 0, 0.1) 0px 0px 10px 0px` | 7 要素 | カード・ピルボタン（ライト基準） |
| `rgba(0, 0, 0, 0.7) 0px 0px 10px 0px` | 5 要素 | 写真の上のカテゴリバッジ（**alpha 0.7**） |

> **ぼかしだけで offset は 0。** 真下に落とさず、要素の四方に均等に広げる。ダークでは地が暗いぶん **alpha を 0.1 → 0.7 まで上げて**輪郭を立てている。

---

## 7. Do's and Don'ts

### Do（推奨）

- **色はすべて `var(--color-*)` 経由で書く。** ライト／ダークの差し替えは `@media (prefers-color-scheme: dark)` で `:root` を上書きするだけにする
- `body { background-color: var(--color-base); color: var(--color-text) }` の 2 行で地と文字を決める
- **密度は行間で作る**（本文 1.5 / リンク一覧 1.9 / ナビ 1.15 / 長文 1.8）
- `html { font-size: 62.5% }` ＋ `rem` 指定（`1.6rem` = 16px）
- ウェイトは **400 / 500 / 700 の 3 段**で組む
- ダークではアイコンを別ファイルに差し替えるか、`filter` で反転させる
- 影は `0 0 10px`。ダークでは alpha を上げる

### Don't（禁止）

- **`letter-spacing` を足さない。** 可視 150 要素中 148 要素が `normal`。字間を入れるとこのサイトの字面ではなくなる
- **`font-feature-settings: "palt"` を足さない。** 効いてしまう（−13.2%）ので、折り返し位置が全部変わる
- **`font-weight: 600` / `800` を使わない。** 実在は 400/500/700/900 で、600 は 700、800 は 900 に丸まる
- **`font-weight: 900` も使わない。** 読み込んではいるが可視 0 要素
- **ヒラギノ・游ゴシックをフォールバックに足さない。** 実サイトは `"Noto Sans JP", sans-serif` の 2 語だけ
- **`body` に `font-size` を書かない設計を真似しない。** 実サイトは `html` も `body` も 10px のままで、宣言し忘れた 13 要素が 10px で出ている。**再現するなら `body { font-size: 1.6rem }` を足す**
- **`var(--color-primary00)` を単独で使わない。** ライトモードで空文字なので無効になる
- **`--color-corporate01` と `--color-corporate02` を同じ色として扱わない。** ライトでは両方 `#335599` だが、ダークで `#cccccc` と `#00CCFF` に分岐する
- **コンテナに最大幅を設けない。** `max-width: 100%` の全幅レイアウト

---

## 8. Responsive Behavior

### Breakpoints

| ブレークポイント | 実測件数 |
|------------------|----------|
| `(max-width: 768px)` | **755** |
| `(min-width: 769px)` | **697** |
| `(prefers-color-scheme: dark)` | **71** |
| `(max-width: 1024px)` | 11 |

### ルート・本文の実測（19 幅で測定）

1920 / 1600 / 1440 / 1200 / 1024 / 992 / 991 / 834 / 769 / 768 / 767 / 600 / 480 / 390 / 375 / 320px → **すべて `html: 10px` / `body: 10px`**

> **ルートも `body` も 1px も動かない完全固定。** 流体（`vw` / `clamp()`）は使っておらず、レスポンシブは `@media` ごとの `rem` 値の書き分けだけで作る。

### タッチターゲット

- サイドナビは 13px / 行間 1.9（= 24.7px）に padding。カードは `20px 20px 23px`

### フォントサイズの調整

- 768px 以下で見出しを落とす（`.head-h2._large` の `4.4rem` は `min-width: 769px` の中でのみ適用）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
和文フォント: Noto Sans JP（Google Fonts・wght@400;500;700;900）
欧文フォント: 持たない（欧文も Noto Sans JP で組む）
フォールバック: sans-serif のみ
ルート: html 62.5%（= 10px・19 幅すべて固定）／ body に font-size 宣言なし
本文: 1.6rem（16px）/ line-height 1.5
行間: 本文 1.5 / リンク一覧 1.9 / ナビ 1.15 / 長文 1.8
字間: 指定しない（normal 148/150）
palt: 使わない（効くが使っていない）
---- ライト ----
地: #ffffff / 文字: #333333 / 紺面: #15274C / リンク: #0D41AC / アクセント: #00CCFF
---- ダーク ----
地: #222222 / 文字: #E2E2E2 / 面: #CCCCCC / リンク: #5AACFF / アクセント: #91E9FF
角丸: カード 10px / ピル 100px / バッジ 50px / 丸 50%
影: rgba(0,0,0,.1) 0 0 10px（ダークのバッジは alpha .7）
最大幅: なし（100%）
gap: 18px
```

### プロンプト例

```
NIMS のサイト（https://www.nims.go.jp/）の DESIGN.md に従って、
プレスリリースの一覧セクションを作ってください。

- 色はすべて :root の --color-* トークン経由。
  ライトは --color-base: #fff / --color-text: #333333、
  @media (prefers-color-scheme: dark) で #222222 / #E2E2E2 に差し替える
- font-family は "Noto Sans JP", sans-serif だけ。weight は 400 / 500 / 700
- letter-spacing も font-feature-settings も書かない
- 密度は行間で作る（本文 1.5、リンク一覧 1.9）
- カードは border-radius: 10px、box-shadow: rgba(0,0,0,.1) 0 0 10px。
  ダークではバッジの影の alpha を 0.7 に上げる
- 一覧へのリンクは border-radius: 100px のピル
- html は 62.5%、サイズは rem。コンテナに max-width を設けない
```
