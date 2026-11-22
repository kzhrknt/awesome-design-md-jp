# DESIGN.md — セラミック・ジャパン（Ceramic Japan）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-22 / 対象: `https://ceramic-japan.co.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **明朝の見出しと、ゆったりした行送りの本文だけで組む。** 色は白・黒に近いグレー（`#1a1a1a`）・チャコール（`#404040`）の3つしか使わない。影は 1 つも無い（実測 `box-shadow` 0 種）。瀬戸の陶磁器メーカーが、製品写真を主役に置くための無彩色の器として設計されている
- **密度**: 低い。本文は **`line-height: 2.00`**（14px / 28px）で組み、セクション見出しは 30px の明朝＋12px の欧文を縦に積む
- **キーワード**: Shippori Mincho、全画面スライド、和欧2段見出し、無彩色、影ゼロ

**このサイトの核心は4つある。**

1. **見出しは Shippori Mincho（Google Fonts）、本文は OS のゴシック。** 可視要素のスタックは `"EB Garamond", "Shippori Mincho", serif` が最多（トップ 50 要素 / 下層 38 要素）で、実描画は **Shippori Mincho Medium**。一方で本文 `<p>` のスタックは `Roboto, dnp-shuei-gothic-gin-std, san-serif` で、**実描画は OS のヒラギノ角ゴ ProN**（CDP `CSS.getPlatformFontsForNode` で実測）。**見出しだけ Web フォント、本文は端末任せ**という二層構造
2. **スタック先頭の `"EB Garamond"` は 1 バイトも読み込まれていない死んだ名前。** CSS の `@import` は **Shippori Mincho と Roboto の 2 本だけ**で、EB Garamond の `@font-face` も `@import` も `<link>` も存在しない（フォント要求 24 件の内訳は `shipporimincho` 23 / `roboto` 1）。結果、**欧文は OS の `serif` に落ちる**（macOS ならヒラギノ明朝 ProN）
3. **`font-feature-settings: "palt"` を 26 要素に配っているが、1px も効いていない。** Google Fonts 配信の Shippori Mincho が `palt` テーブルを持たないため。実スタック・30px で実測すると `normal` 270.00px → `"palt"` **270.00px（±0.00）**、約物だけの文字列でも 450.00px → 450.00px で**完全一致**（→ 3.7）
4. **`html` も `body` も 10px。** `html { font-size: 62.5% }` ではなく **`html { font-size: 10px }` ＋ `body { font-size: 100% }`** という書き方で、19 幅すべて 10px から動かない。`1rem = 10px`

**CSS Custom Properties は自社トークンが 0 個**（`customPropertiesSummary.own: 0`）。`body` 側に 48 個あるが全部 `--wp--preset--*`（WordPress / Gutenberg の既定値）で、**サイトの設計とは無関係**。色もサイズも CSS に直書きされている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Charcoal（面）** | **`#404040`** | **可視 5 要素の塗り面**（トップ）/ 4 要素（下層）。`セラミック・ジャパンについて` `製品一覧` `新着情報一覧` のセクション CTA、`お問い合わせ` ボタン |
| **Text Primary** | **`#1a1a1a`** | **可視 39 要素**（トップ）/ 33 要素（下層）。`body { color: rgb(26,26,26) }` から継承。**純黒ではない** |

> **このサイトにブランド色は無い。** 彩度を持つ面が 1 つも無く、色で主張する代わりに**製品写真の色**を立たせている。

### Neutral（ニュートラル）

- **Text on Dark** (`#ffffff`): ヒーロー上のコピー、チャコール面の文字（可視 24 要素）
- **Text Black** (`#000000`): ヘッダーのナビ、言語切替、パンくず（可視 12 要素）。**本文の `#1a1a1a` とは別**
- **Surface Gray** (`#f5f5f5`): セクションの面（`製品一覧` ブロック、`セラミック・ジャパンのストーリー` ブロック。各ページ 1 要素）
- **Surface Warm** (`#c8c6c0`): フッターの `Follow us` ブロック（各ページ 1 要素）。**わずかに暖色に寄った唯一のグレー**
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `ua-default-canvas`）

> **`html` にも `body` にも背景色の宣言が無い。** 白はブラウザ既定のキャンバスであって、サイトが塗っているわけではない。トップのビューポート上部は全画面スライド（`img` 1477×862）に覆われている。

---

## 3. Typography Rules

### 3.1 和文フォント

- **明朝体（見出し・CTA・ナビ）**: **Shippori Mincho**（しっぽり明朝 / Google Fonts）。`@import url("https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&display=swap")`
  - **実際に `loaded` しているのは 400 と 500 だけ**（400: loaded 6 / unloaded 116、500: loaded 17 / unloaded 105。和文は unicode-range で 122 サブセットに分割されるので unloaded が大量に出るのは正常）
  - **600 / 700 / 800 は 1 サブセットも読み込まれていない**（→ 3.4 の落とし穴）
- **ゴシック体（本文）**: **OS フォント**。Web フォントを当てていない。macOS ではヒラギノ角ゴ ProN、Windows では端末既定

### 3.2 欧文フォント

- **実装上は Roboto**（`@import` 済み、`loaded` は 400 / 500 の各 1 サブセット）。ただし当たっているのは本文スタックの先頭だけ
- **`"EB Garamond"` は存在しない。** スタックの先頭に 2 種類（`"EB Garamond", "Shippori Mincho", serif` と `"EB Garamond", serif`）書かれているが、**読み込み処理が 1 つも無い**ため必ず外れる
  - `"EB Garamond", "Shippori Mincho", serif` → 欧文は Shippori Mincho（欧文グリフを持つ）で出る
  - `"EB Garamond", serif` **（可視 13 要素）→ 欧文は OS の `serif`**。macOS ならヒラギノ明朝 ProN、Windows なら MS P明朝
- 実測（CDP `CSS.getPlatformFontsForNode`）では、トップの `h2` が `["Hiragino Mincho ProN:19", "Shippori Mincho Medium:14"]` と返る。**1 つの見出しの中で、和文「セラミック・ジャパンについて」が Shippori Mincho、欧文「About Ceramic Japan」がヒラギノ明朝に割れている**

### 3.3 font-family 指定

```css
/* 実サイトの宣言（CSS 全文で 9 種） */
body {
  color: rgb(26, 26, 26);
  font-family: "EB Garamond", "Shippori Mincho", serif;
  font-size: 100%;                    /* html 10px を継承 → 10px */
}

/* 本文・UI（実測で p がこれ） */
.c-txt__basic {
  font-family: Roboto, dnp-shuei-gothic-gin-std, san-serif;  /* ← 実サイトのまま */
}
```

> **この CSS には 3 つの事故が同居している。**
> 1. **`san-serif` はタイプミス**（正しくは `sans-serif`）。無効な名前なので無視され、**受け皿が無くなる**
> 2. **`dnp-shuei-gothic-gin-std`（秀英角ゴシック銀 / Adobe Fonts）の読み込み処理が無い。** Typekit の kit も `@font-face` も存在しない
> 3. **`"EB Garamond"` も読み込まれていない**（→ 3.2）
>
> **結果として本文は「Roboto（欧文のみ）→ 和文は全部ブラウザ既定」になる。**
> **正しくはこう書く：**
> ```css
> /* 見出し */
> font-family: "EB Garamond", "Shippori Mincho", serif;  /* EB Garamond を実際に読み込むなら */
> /* 本文 */
> font-family: Roboto, "Noto Sans JP", "ヒラギノ角ゴ ProN", sans-serif;
> ```

### 3.4 文字サイズ・ウェイト階層

`html` = `body` = **10px**（19 幅すべて固定・`1rem = 10px`）。

| 役割 | Size | Weight | Line Height | Letter Spacing | 実測 |
|------|------|--------|-------------|----------------|------|
| ヒーローコピー | **30px** | 500 | 42px（1.40） | **0.5px**（0.017em） | `想いが伝わるデザイン` / `想いを届ける技術力`。**実テキスト**（画像ではない） |
| セクション見出し（和） | **30px** | 500 | 42px（1.40） | 0.5px | `.c-ttl__01 > .jp`。834px 以下で **24px**、374px 以下で **20px** |
| セクション見出し（欧） | **12px** | 500 | 16.8px（1.40） | — | `.c-ttl__01 > .en`。`About Ceramic Japan` `Products` |
| 小見出し | **18px** | 400 | — | **-0.75px**（-0.042em） | `オリジナル製品` `OEM`。**字間を詰める** |
| 本文 | **14px** | 400 | **28px（2.00）** | **1.25px**（0.089em） | 600px 以下で **12px / 24px**。**字間と行送りを両方広げる** |
| UI・ナビ | **12px** | 500 | 16.8px（1.40） | 0.2px | ヘッダーのナビ、ニュース一覧 |
| CTA（面） | **16px** | 500 | 22.4px（1.40） | **1px**（0.063em） | チャコール面のボタン |
| CTA（枠） | 16px / 12px | 500 | 1.40 | **-1.5px** | ピル型ボタン。**面の CTA とは字間の符号が逆** |
| 言語切替 | **11px** | **600** | 15.4px | normal | `Ja` `En`。**このサイトで weight 600 はこの 2 要素だけ** |

> **weight 600 以上を当てると書体が変わる。** Shippori Mincho は 600 / 700 / 800 が 1 サブセットも読み込まれていないため、**フォールバックして OS の明朝（macOS ならヒラギノ明朝 W6）で描画される**。
> 実スタック・100px の欧文で実測すると `"EB Garamond", "Shippori Mincho", serif` は
> **100〜400 → 806.70px（Shippori Mincho Regular）／ 500 → 825.11px（Shippori Mincho Medium）／ 600〜900 → 860.31px（OS の明朝）** の 3 面に割れる。
> **使ってよいのは 400 と 500 だけ。**

### 3.5 行間・字間

- **`letter-spacing` は各要素が px を直接持つ。** `body` に宣言は無く（実測 `normal`）、`normal` が可視 31 要素（トップ）/ 27 要素（下層）で最多。字間を当てている要素は px 値がばらばらで、**サイズに比例していない**
  - 本文 14px → **1.25px**（0.089em）
  - 見出し 30px → **0.5px**（0.017em）
  - 小見出し 18px → **-0.75px**（-0.042em）
  - CTA 16px → **1px**（0.063em）／ ピル CTA 16px → **-1.5px**
  - **大きい文字ほど字間が狭い。** 本文を広げて見出しを締める、逆向きの設計
- **`line-height` は 2 段しかない。** `1.40`（可視 61 要素 = UI・見出し）と **`2.00`**（7 要素 = 本文）。下層も `1.40` 42 要素 / `2.00` 11 要素
- **`h2` の字間はブレークポイントで変わる。** 1024px 以上では `1.5px`、**1024px 以下では `normal`**。1 回の計測を「このサイトの字間」と書かないこと

### 3.6 禁則処理・改行ルール

- `word-break: normal`（`body` 実測）。`auto-phrase` も `break-all` も使っていない
- **改行は `<br class="pc">` / `<br class="sp">` で手動制御**。ヒーローのコピーも `<span>` で 2 行に割っている

### 3.7 OpenType 機能

- **`font-feature-settings: "palt"` が 26 要素（トップ）/ 8 要素（下層）に当たっているが、効果は 0。**
  - クロス集計は `"palt" @ horizontal-tb` 26 件のみ（軸の取り違えは無い）
  - **実スタック（`"EB Garamond", "Shippori Mincho", serif`）・30px で測ると、`normal` と `"palt"` の幅が完全に一致する**

    | テスト文字列 | normal | "palt" | 差 |
    |---|---|---|---|
    | `想いを届ける技術力` | 270.00px | **270.00px** | **±0.00%** |
    | `「あ」、「い」。（う）・（え）` | 450.00px | **450.00px** | **±0.00%** |
    | `ABC123あいう、。` | 265.30px | **265.30px** | **±0.00%** |

  - **原因は書体側。** Google Fonts 配信の Shippori Mincho は `palt` テーブルを持たない（`"halt"` `"pwid"` も同じく ±0.00）
- **約物を詰めたいなら書体を替えるしかない。** `palt` を足しても何も起きない

### 3.8 縦書き

- **縦組みは使っていない**（トップは `verticalSamples` が空。下層に `vertical-lr` が 1 要素あるが装飾要素）

---

## 4. Component Stylings

### Buttons

| 種類 | 実装 |
|------|------|
| **Primary（面）** | 背景 `#404040` / 文字 `#ffffff` / **`border-radius: 2px`** / 16px / weight 500 / `letter-spacing: 1px` / line-height 1.40 |
| **Pill Outline（ヘッダー）** | 背景 透明 / 文字 `#ffffff` / **`border-radius: 30px`** / `1px solid #ffffff` / 12px / weight 500 |
| **Pill Outline（本文中）** | 背景 透明 / 文字 `#1a1a1a` / **`border-radius: 20px`** / `1px solid #404040` / 12px / `letter-spacing: -1.5px` |
| **Pill Solid** | 背景 `#ffffff` / 文字 `#000000` / `border-radius: 30px` / 12px |
| **言語切替（丸）** | **`border-radius: 50%`** / `2px solid #ffffff` / 11px / **weight 600** / 選択中は背景 `#ffffff`・文字 `#000000` |

> **角丸が 4 段ある**（`2px` 10 要素 / `20px` 2 要素 / `30px` 2 要素 / `50%` 7 要素）。
> **面のボタンだけ `2px` で、枠のボタンはピル。** 面＝四角、枠＝丸、という使い分け。

### Cards

- ニュース一覧・製品一覧ともに**枠も影も無い**。写真とテキストを縦に積むだけ
- 区切りは面色（`#f5f5f5`）で行う

---

## 5. Layout Principles

### Container

- **`1039px`**（トップ 8 要素 / 下層 5 要素）。下層には `1130px` と `600px` も 1 つずつ
- `1039px` という半端な値は実装の実態。**そのまま使う**

### Spacing Scale

- ユーティリティクラスで余白を当てる方式。`mbpc-40` `mbsp-40` `mbpc-33` `mbsp-34` `mbpc-35` `mbsp-20` `mbsp-25` のように **PC / SP で別のクラス**を並べて書く（`mb` + `pc|sp` + px 値）
- `gap` は 1 つも使っていない（実測 `gaps: []`）。マージンだけで組む

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **全要素。`box-shadow` は 2 ページとも 0 種** |

> **影を一切使わないサイト。** 階層は面色（`#ffffff` / `#f5f5f5` / `#c8c6c0`）と 1px の枠だけで作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **見出しは Shippori Mincho、weight は 400 か 500 だけ**を使う
- **`html { font-size: 10px }` を前提に `rem` を書く**（`1.4rem` = 14px）
- **本文は 14px / `line-height: 2.00` / `letter-spacing: 1.25px`**。600px 以下で 12px / 24px に落とす
- **見出しは字間を締め、本文は広げる**（30px → 0.5px、18px → -0.75px、14px → 1.25px）
- **セクション見出しは「和文 30px ＋ 欧文 12px」を縦に積む**
- 面の CTA は `#404040` / `border-radius: 2px`、枠の CTA はピル（`20px` / `30px`）
- **`box-shadow` を使わない**。区切りは面色と 1px の枠
- 色は `#1a1a1a`（本文）/ `#404040`（面）/ `#ffffff` / `#f5f5f5` / `#c8c6c0` の 5 つに収める

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** Shippori Mincho は `palt` テーブルを持たず、実測で ±0.00%。足しても何も起きない
- **weight 600 / 700 / 800 を当てない。** Shippori Mincho のそのウェイトは読み込まれておらず、**OS の明朝に化ける**（実測で幅が 825.11px → 860.31px に跳ぶ）
- **`"EB Garamond"` をスタックの先頭に書くなら、必ず読み込む。** 実サイトは読み込んでいないので、この名前は 1 度も使われていない
- **`san-serif` と書かない**（実サイトのタイプミス。正しくは `sans-serif`）
- **`dnp-shuei-gothic-gin-std` を前提に組まない**（Adobe Fonts の読み込み処理が無い）
- **`letter-spacing` を `em` で配らない。** このサイトは各要素が px を直接持ち、サイズに比例していない
- **`line-height` を 1.5〜1.7 にしない。** 本文は 2.00、UI は 1.40 の 2 段だけ
- **純黒 `#000000` を本文に使わない**（本文は `#1a1a1a`。`#000000` はナビとパンくずだけ）
- **CSS 変数でトークンを組まない**（実サイトの自社トークンは 0 個。値は直書き）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 834px | **主ブレークポイント**（`screen and (max-width: 834px)` が CSS 全文で **399 件**） |
| Desktop | ≥ 835px | `screen and (min-width: 835px)` が 216 件 |
| Small | ≤ 640px | 43 件。本文が 14px → 12px に落ちる境目は 640px |
| XSmall | ≤ 374px | 40 件。見出しが 24px → 20px |

- **`html` / `body` は 1920px から 374px まで 10px のまま動かない**（19 幅で実測）。流体スケーリングは一切無い
- 可変なのは**要素側の `font-size` を段で切り替える**ところだけ

### フォントサイズの調整

| 要素 | ≥835px | 834〜375px | ≤374px |
|---|---|---|---|
| 見出し（`.jp`） | 30px | **24px** | **20px** |
| 本文 | 14px | 14px（≤640px で **12px**） | 12px |
| 字間（本文） | 1.25px | 1.25px | 1.25px |

- **`h2` の `letter-spacing` は 1024px を境に `1.5px` → `normal` に変わる**

### タッチターゲット

- 面の CTA は 16px / line-height 1.40 ＋ padding で 44px を満たす
- **言語切替の丸ボタン（11px / `border-radius: 50%`）は小さいので、モバイルでは 44px を確保すること**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text Primary:   #1a1a1a
Text Black:     #000000（ナビ・パンくずのみ）
Surface Dark:   #404040（面の CTA）
Surface Gray:   #f5f5f5
Surface Warm:   #c8c6c0
Background:     #ffffff
Font (見出し):  "Shippori Mincho", serif   ← weight 400 / 500 のみ
Font (本文):    Roboto, "Noto Sans JP", "ヒラギノ角ゴ ProN", sans-serif
Root:           html = body = 10px（1rem = 10px・全幅固定）
Body Size:      14px / line-height 28px (2.00) / letter-spacing 1.25px
Heading:        30px / weight 500 / line-height 42px (1.40) / letter-spacing 0.5px
UI:             12px / weight 500 / line-height 1.40 / letter-spacing 0.2px
Border Radius:  2px（面の CTA） / 20px・30px（枠の CTA） / 50%（丸）
Box Shadow:     none（全要素）
palt:           使わない（書体が対応していない）
Container:      1039px
Breakpoint:     834px / 640px / 374px
```

### プロンプト例

```
セラミック・ジャパンのデザインシステムに従って、製品紹介ページを作成してください。
- html と body の font-size は 10px（1rem = 10px）。全幅で固定し、流体スケーリングはしない
- 見出しは "Shippori Mincho", serif / 30px / weight 500 / line-height 42px / letter-spacing 0.5px
  - weight は 400 と 500 だけ。600 以上は OS の明朝に化けるので使わない
- セクション見出しは「和文 30px」の下に「欧文 12px / weight 500」を積む 2 段組み
- 本文は 14px / line-height 28px (2.00) / letter-spacing 1.25px、色は #1a1a1a
- 小見出し 18px は letter-spacing -0.75px（見出しほど字間を締める）
- font-feature-settings は書かない（Shippori Mincho は palt が効かない）
- 面のボタンは背景 #404040 / 文字 #ffffff / border-radius 2px / 16px / letter-spacing 1px
- 枠のボタンは透明 + 1px solid / border-radius 20px または 30px / 12px / letter-spacing -1.5px
- box-shadow は一切使わない。区切りは面色 #f5f5f5 と 1px の枠だけ
- コンテナは 1039px、834px 以下で見出しを 24px、640px 以下で本文を 12px に落とす
```
