# DESIGN.md — 清水建設（SHIMIZU CORPORATION）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-13 / 対象: `https://www.shimz.co.jp/`, `/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 青1色と白。Web フォントを和文に1本も使わず、OS ローカルの書体だけで組む。情報量の多い大企業サイトを、カテゴリ色のバッジと罫線で整理する
- **密度**: 高い。ニュース・IR・サステナビリティ・採用の導線がトップに全部並ぶ。本文の行間は 1.4〜1.6 と締まっている
- **キーワード**: シミズブルー、メイリオ先頭、Web フォント0本、カテゴリ色バッジ、字詰めなし

**このサイトの核心は5つある。**

1. **和文の Web フォントを1本も読み込まない。** フォントファイルの要求は **6 件すべて自社の `glyphs.woff`**（アイコンフォント）。`document.fonts` は `glyphs`（`loaded`）と `Oswald`（`unloaded`）だけ。**ローカルフォント依存それ自体が設計**
2. **`font-feature-settings` が CSS 全文に 0 件。** `palt` も `halt` も書かれていない
3. **`letter-spacing` の既定は `normal`**（実測 105/119 要素）。字間を空けるのは**グローバルナビの 11px 文字だけ**（`1.65px` ＝ 0.15em）
4. **`html { font-size: 62.5% }` を書いたのに、`body` で font-size を宣言し直していない。** その結果 **`body` の実寸が 10px のまま**（9 幅すべてで `html: 10px / body: 10px`）。`line-height` も宣言が無く UA 既定の `normal`（= 11.5px）。**サイズを書き忘れた要素はすべて 10px で出る**（実測: `a` と `li` の一部が 10px / 11.5px）
5. **ヒーローの大コピーは動画に焼き込まれている。** 「子どもたちに誇れるしごとを。」は `<video src="/movie/main_movie.mp4">`（1440×485）の中の文字で、**ヒーロー帯で実テキストの最大は 18px**

**CSS Custom Properties は 0 個**（`:root` にも `body` にも宣言が無い。読めなかった外部シートは Google Fonts と IR ウィジェットで、自社の設計トークンではない）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Shimizu Blue** | **`#356cb6`** | **可視の塗り面 5 要素（トップ）／ 10 要素（下層）**。**文字色としては 39 要素 / 33 要素**。グローバルナビ・リンク・ボタン・お知らせ帯。このサイトのブランド色 |
| **Warning Yellow** | **`#ffff00`** | **純黄**。「弊社を装った不審な訪問や電話にご注意ください」の注意喚起帯 1 要素。文字は **黒（`#000000`）** |

### Category Colors（ニュース種別のバッジ）

| 種別 | 実装値 | 出自 |
|---|---|---|
| ニュースリリース | **`#1565c0`** | Material Design **Blue 800** |
| IRニュース | **`#6a1b9a`** | Material Design **Purple 800** |
| イベント | **`#2e7d32`** | Material Design **Green 800** |
| サステナビリティ | **`#00838f`** | Material Design **Cyan 800** |

> **カテゴリ色の4つは Material Design の 800 番台をそのまま使っている。** ブランド青 `#356cb6` とは別系統で、**ニュースリリースの青 `#1565c0` はブランド青ではない**。2つの青が同じページに並ぶのが実装の実態。

### Section Colors（事業セクション）

| セクション | 実装値 |
|---|---|
| 建設事業 | `#bf543a` |
| 土木事業 | `#7b7b1e` |
| 海外建設事業 | `#be416f` |

こちらは Material ではない独自の3色。くすんだ暖色で、カテゴリバッジとは明確に別の系統。

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文・日付。`body { color: #333333 }` で宣言され、**可視 35 要素 / 6 要素**
- **Text Black** (`#000000`): 下層の大見出し、注意喚起帯の文字（可視 2 要素 / 12 要素）
- **Text on Dark** (`#ffffff`): 青面・動画の上のテキスト（可視 49 要素 / 40 要素）
- **Surface Gray** (`#f2f2f2`): 下層のカード面（可視 7 要素）
- **Surface Blue Tint** (`#eff3f9`): パンくず・新着情報の面（可視 2 要素）
- **Surface Blue Pale** (`#d7e2f0`): 技術研究所などのリンクカード（可視 1 要素）
- **Background（トップ）** (`#000000`): **トップは黒地**。ヒーローの動画が全幅で入るため（`pageBackground.resolved` = `rgb(0,0,0)` / 根拠 `viewportTopBySample (6/9)`）
- **Background（下層）** (`#ffffff`): 下層は白（根拠 `viewportTopBySample (6/6)`）

> **トップと下層でページの地色が違う。** トップは動画のために黒、下層は白。`pageBackground.resolved` を1ページだけ見ると取り違える。

---

## 3. Typography Rules

### 3.1 和文フォント

- **Web フォントは使わない。** OS ローカルの書体だけ
- **メイリオが先頭。** Windows を優先したスタック
- ヒラギノは **Pro**（`Hiragino Kaku Gothic Pro`）が先、ProN が後

### 3.2 欧文フォント

- **専用の欧文フォントは実質ゼロ。** `Oswald`（Google Fonts）を CSS 内 **19 箇所**で `font-family: "Oswald"` として指定し、`<link href="https://fonts.googleapis.com/css?family=Oswald">` も読み込んでいるが:
  - `document.fonts` では **5 件すべて `unloaded`**
  - **フォントファイルの要求が 0 件**（全 6 件が自社の `glyphs.woff`）
  - `distributions.fontFamily` に **可視 0 要素**

  指定先は `span.new`（赤い NEW バッジ）と `.button-more` で、**計測した 2 ページにはその要素が出てこない**。**宣言はあるが、このページでは1文字も描画されない**

- **アイコンフォント**: 自社の `glyphs`（`/shared/fonts/glyphs.woff`）。`loaded`

### 3.3 font-family 指定

```css
/* 実サイトの宣言 */
html { font-size: 62.5%; }          /* = 10px */

body {
  margin: 0;
  font-family: "メイリオ", Meiryo,
               "Hiragino Kaku Gothic Pro", "Hiragino Kaku Gothic ProN",
               "游ゴシック", "Yu Gothic", YuGothic,
               "ＭＳ ゴシック", sans-serif;
  font-weight: 400;
  color: #333333;
  min-width: 318px;
  /* font-size と line-height の宣言が無い */
}
```

実測 **124/125 要素**（トップ）／ **91/91 要素**（下層）がこの1本。

**このスタックの読み方**:

- **メイリオ先頭＝Windows 優先。** macOS では 3 番目の `Hiragino Kaku Gothic Pro` に落ちる
- **ヒラギノは Pro が ProN より前。** Pro と ProN は字形が違う（ProN が JIS2004 字形）。**順序は実サイトのとおり**
- **游ゴシックに Medium が1つも入っていない。** `"游ゴシック", "Yu Gothic", YuGothic` の3つだけで、Windows でここに当たると細い Regular で出る。ただしその前にメイリオがあるので、実際には到達しない
- `"ＭＳ ゴシック"` が全角の名前で入っている（等幅の MS ゴシック）

> **新規実装でこのスタックをそのまま使う理由は無い。** 意図（Web フォントを読まない・Windows を優先する）を引き継ぐなら、游ゴシック Medium を前に置いたスタックに置き換えるのが妥当。**ただし既存ページと並べるときは、メイリオ先頭であることが前提の字詰まりになっている**ことを踏まえる。

### 3.4 文字サイズ・ウェイト階層

| 役割 | font-size | weight | line-height | letter-spacing |
|------|-----------|--------|-------------|----------------|
| ページタイトル帯（下層） | **40px** | 400 | 72px (1.8) | normal |
| 大見出し | **36px** | 400 | 50.4px (**1.4**) | normal |
| 宇宙開発などの特集見出し | 32px | 400 / 700 | 44.8px (1.4) | normal |
| 下層 h1 | 32px | 400 | 41.6px (1.3) | normal |
| セクション見出し（h2） | **24px** | 700 | 33.6px (1.4) | normal |
| カードの見出し（h3） | 24px | 400 | 24px (1.0) | normal |
| 事業名 | 21px | — | 25.2px (1.2) | normal |
| リード文 | 20px | 400 | 36px (1.8) | normal |
| サブ見出し | 17px | — | — | normal |
| **本文（p）** | **16px** | 400 / 700 | **22.4px (1.4) / 25.6px (1.6)** | normal |
| ナビ（第2階層） | 15px | 400 | 24px (1.6) | **0.75px** |
| メニュー項目 | 14px | 400 | — | **0.7px** |
| 記事日付 | 12px | 400 | — | normal |
| **グローバルナビ** | **11px** | **700** | 15.4px (1.4) | **1.65px (0.15em)** |
| 宣言し忘れた要素 | **10px** | 400 | **11.5px** | normal |

**ウェイトは 400 と 700 の2段だけ。** 500 / 600 は1要素も無い。

- メイリオ / ヒラギノ角ゴ Pro はどちらも Regular と Bold の2本なので、**この2段は書体の実体と一致している**
- **太る位置が直感と逆**: 36px の大見出しは **weight 400**、24px のセクション見出しが **weight 700**、11px のナビが **weight 700**。**大きい文字ほど細い**

### 3.5 行間・字間

```css
html { font-size: 62.5%; }         /* = 10px */

body {
  /* font-size の宣言が無い → html の 10px がそのまま継承される */
  /* line-height の宣言も無い → UA 既定の normal（10px に対して 11.5px） */
  color: #333333;
  font-weight: 400;
  min-width: 318px;
}
```

> **`62.5%` を書いて `body` で戻していない。** `html { font-size: 62.5% }` は `rem` の基準を 10px にするための定番だが、通常は直後に `body { font-size: 1.4rem }` のように本文サイズを宣言し直す。このサイトはそれが無いため、**`body` の実寸が 10px のまま**になっている。
>
> 各要素が px を直書きしているので大半は実害が出ていないが、**宣言を書き忘れた要素はすべて 10px / 行間 11.5px で描画される**（実測: `a` と `li` の一部）。**この書き方を真似しない。**

- **`line-height` は各要素が宣言する。** `1.4` が最も多く（h2 24→33.6 / h3 32→44.8 / p 16→22.4 / li 11→15.4）、本文のまとまりだけ `1.6`（16→25.6）、リード文が `1.8`（20→36 / 40→72）
- **`letter-spacing` は `normal` が既定**（実測 105/119 要素・下層 71/91 要素）。空けるのは:
  - グローバルナビ 11px → **`1.65px`**（= 0.15em）
  - メニュー第2階層 15px → `0.75px`（= 0.05em）／ 14px → `0.7px`（= 0.05em）
  - コピーライト → `1.1px`
  - `.button-more` → `0.2rem`（= 2px。ただし Oswald 指定とセットで、計測した2ページには出てこない）

### 3.6 禁則処理・改行ルール

- `word-break` は **`normal`**（9 幅すべてで実測）
- ブラウザ既定の日本語禁則に任せる

### 3.7 OpenType 機能

- **CSS 全文に `font-feature-settings` が 0 件。** `palt` も `halt` も使っていない
- `tnum` も使っていない

> メイリオもヒラギノ角ゴ Pro も `palt` テーブルを持つので**足せば効いてしまう**。足すと既存の見出しと字送りが変わるため、**このサイトに合わせるなら書かない**。

### 3.8 縦書き

- **使っていない**（実測 `writing-mode: vertical-*` 0 要素）

---

## 4. Component Stylings

### Buttons

**プライマリ（青の面）**

```css
background-color: #356cb6;
color: #ffffff;
font-size: 16px;
font-weight: 700;
line-height: 25.6px;              /* 1.6 */
letter-spacing: normal;
border-radius: 30px;              /* 「新着情報一覧」「詳しく見る」 */
```

**セカンダリ（白地に青文字）**

```css
background-color: #ffffff;
color: #356cb6;
font-size: 16px;
font-weight: 700;
line-height: 28px;                /* 1.75 */
letter-spacing: normal;
```

**グローバルナビ（文字だけ）**

```css
color: #356cb6;                   /* アクティブは白文字に青面 */
font-size: 11px;
font-weight: 700;
line-height: 15.4px;              /* 1.4 */
letter-spacing: 1.65px;           /* 0.15em。このサイトで唯一の字空け */
```

### Badges / Chips

```css
/* ニュース種別バッジ（4色） */
color: #ffffff;
font-size: 11px;
font-weight: 700;
line-height: 20px;
letter-spacing: normal;
border-radius: 10px;
/* background-color は種別ごと:
   ニュースリリース #1565c0 / IRニュース #6a1b9a /
   イベント #2e7d32 / サステナビリティ #00838f */
```

```css
/* 事業セクションのラベル（3色） */
color: #ffffff;
font-size: 15px;
font-weight: 400;
line-height: 24px;                /* 1.6 */
/* 建設事業 #bf543a / 土木事業 #7b7b1e / 海外建設事業 #be416f */
```

### Cards

- 角丸は **10px**（ニュース）/ **5px**（技術研究所などのリンク）/ **30px**（ボタン）
- **部分角丸を使う**: タブの上辺だけ `0 4px 0 0`（実測 6 要素）、言語切替の左右 `3px 0 0 3px` / `0 3px 3px 0`

### Tabs

- トップの「新着情報 / ニュースリリース / IRニュース / サステナビリティニュース」は**4分割の等幅タブ**
- 選択状態は `#356cb6` の面に白文字、非選択は白地に `#333333`

---

## 5. Layout Principles

### Container

- **1200px**（トップで 26 要素。最頻）
- **1280px**（下層で 11 要素。下層の主コンテナ）／ **1272px**（10 要素）
- **1520px**（全幅に近いセクション。2 要素）
- 補助: `960px` / `950px` / `760px`
- `body { min-width: 318px }`

> **コンテナ幅が 1200 / 1280 / 1272 / 1520 と揃っていない。** トップと下層でテンプレートの世代が違う。新規実装では **下層の 1280px** に寄せる。

### Spacing Scale

- `gap` の実測は `20px` が1件だけ。**Flexbox の gap をほとんど使わず、margin / padding で組んでいる**

### Grid

- トップのメガメニューは 1280px 幅・5〜6 カラムの画像リンク
- 事業紹介は 3 カラム、ニュースは 1 カラムのリスト

---

## 6. Depth & Elevation

**影は実質使っていない。**

```css
/* 実測で最多（12 要素）— オフセットもぼかしも 0 */
box-shadow: rgba(0, 0, 0, 0.16) 0 0 0 0;

/* 1 要素だけ */
box-shadow: rgba(0, 0, 0, 0.25) 0 0 6px 0;
```

- **12 要素の影は `0 0 0 0`**。色は指定されているが、オフセットもぼかしも広がりも 0 なので**何も描画されない**。ホバーで値が入る前提の初期値
- 下層ページは `box-shadow` が **0 種**
- 浮きは面色（`#f2f2f2` / `#eff3f9` / `#d7e2f0`）と罫線で作る

---

## 7. Do's and Don'ts

### Do（推奨）

- **Web フォントを読み込まない。** 和文は OS ローカルの書体で組む
- `letter-spacing` は `normal` を既定にし、**11px のナビだけ 0.15em** 空ける
- `line-height` は各要素に書く。**1.4 を既定**、本文のまとまりは 1.6、リード文は 1.8
- ウェイトは **400 と 700** の2つだけ
- **大きい見出しほど細くする**（36px は 400、24px のセクション見出しは 700）
- ニュース種別は Material Design 800 番台の4色（`#1565c0` / `#6a1b9a` / `#2e7d32` / `#00838f`）、`border-radius: 10px` のバッジ
- 注意喚起は **純黄 `#ffff00` の帯に黒文字**
- ボタンは `#356cb6` の面に白文字、`border-radius: 30px`
- 影は使わない。面色と罫線で区切る

### Don't（禁止）

- **`html { font-size: 62.5% }` を書いて `body` の font-size を宣言し忘れない。** 実サイトはこれで body が 10px のまま残り、サイズを書き忘れた要素が 10px / 行間 11.5px で出ている。**`body { font-size: 1.6rem; line-height: 1.6 }` を必ず添える**
- **`font-feature-settings: "palt"` を足さない。** 実サイトは CSS 全文に 0 件。メイリオもヒラギノも `palt` を持つので、足すと既存の見出しと字送りが揃わなくなる
- **`font-weight` に 500 / 600 を指定しない。** メイリオ・ヒラギノ角ゴ Pro は Regular と Bold の2本で、500 は Regular として出る
- **`Oswald` を当てにしない。** CSS に 19 箇所あり Google Fonts も読み込んでいるが、**フォントファイルの要求は 0 件・可視 0 要素**。欧文を Oswald で組むつもりなら、まず実際に読み込まれるか確かめる
- **ヒーローの大コピーを Web フォントで実装しない。** 「子どもたちに誇れるしごとを。」は `main_movie.mp4` に焼き込まれた文字で、ヒーロー帯の実テキストは最大 18px
- **ブランド青 `#356cb6` とニュースリリースの青 `#1565c0` を同じ色に統合しない。** 実装では別の色で、同じページに並ぶ
- **トップの地色（黒）を下層に持ち込まない。** 下層は白
- **コンテナ幅を 1200px に揃えない。** 下層は 1280px が主。混在が実装の実態なので、新規は 1280px に寄せる
- **`box-shadow: rgba(0,0,0,.16) 0 0 0 0` をそのまま写さない。** 何も描画されない値

---

## 8. Responsive Behavior

### Breakpoints

実測の `@media`:

| 条件 | 役割 |
|---|---|
| `screen and (max-width: 767px)` / `(max-width: 767px)` | **主ブレークポイント。** モバイル |
| `(min-width: 768px)` | デスクトップ |
| `(min-width: 768px) and (max-width: 991px)` | タブレット |
| `(max-width: 1123px) and (min-width: 768px)` | 下層のコンテナ縮小 |
| `screen and (max-width: 991px)` / `(max-width: 768px)` | 補助 |
| `screen and (max-width: 320px)` | 極小 |

> `(min-width: 768px) and (min-width: 768px) and (max-width: 991px)` という**重複した条件**が実在する。書き写すときは1つに畳んでよい。

### ルートと本文のふるまい（9 幅で実測）

| 幅 | `html` | `body` | `line-height` | `letter-spacing` |
|---|---|---|---|---|
| 1440 / 1200 / 991 / 768 / 375 px | **10px** | **10px** | 11.5px | normal |

- **全幅で完全固定。** 流体の式も崖も1つも無い
- **`body` が 10px のままなのは仕様ではなく宣言漏れ**（§3.5 参照）

### タッチターゲット

- グローバルナビは 11px の文字だが、`line-height` と padding でリンク領域を確保している
- `body { min-width: 318px }` があり、それ以下では横スクロールになる

### フォントサイズの調整

- ルートが 10px なので CSS は `1.6rem` のように書ける（`rem × 10 = px`）。ただし実サイトは **px の直書きが主**
- 見出しサイズはブレークポイントをまたいで固定

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Shimizu Blue:   #356cb6
Warning Yellow: #ffff00   (文字は #000000)
Text:           #333333
Text Black:     #000000
Text on Dark:   #ffffff
Surface Gray:   #f2f2f2
Surface Tint:   #eff3f9 / #d7e2f0
Background:     #000000（トップ）/ #ffffff（下層）

Category: ニュースリリース #1565c0 / IR #6a1b9a / イベント #2e7d32 / サステナ #00838f
Section:  建設 #bf543a / 土木 #7b7b1e / 海外建設 #be416f

Font: "メイリオ", Meiryo, "Hiragino Kaku Gothic Pro", "Hiragino Kaku Gothic ProN", "游ゴシック", "Yu Gothic", YuGothic, "ＭＳ ゴシック", sans-serif
Web Font: 和文 0 本（アイコンの glyphs.woff のみ）
Root: html 62.5% (=10px) 全幅固定
Body: ★ 実サイトは font-size 未宣言で 10px。新規は 1.6rem / line-height 1.6 を書く
Weights: 400 / 700 のみ
Letter Spacing: normal（ナビ 11px だけ 1.65px = 0.15em）
Line Height: 1.4（既定）/ 1.6（本文）/ 1.8（リード）
font-feature-settings: なし
Border Radius: 10px（バッジ）/ 5px / 30px（ボタン）/ 部分角丸 0 4px 0 0
Box Shadow: なし
Container: 1280px（下層）/ 1200px（トップ）
```

### プロンプト例

```
清水建設のデザインシステムに従って、企業情報の下層ページを作成してください。
- Web フォントは読み込まない。font-family は "メイリオ", Meiryo,
  "Hiragino Kaku Gothic Pro", "Hiragino Kaku Gothic ProN", "游ゴシック", "Yu Gothic", YuGothic, "ＭＳ ゴシック", sans-serif
- html { font-size: 62.5% } に加えて body { font-size: 1.6rem; line-height: 1.6; color: #333333 } を必ず書く
  （実サイトは body の font-size を書き忘れており、そこは真似しない）
- font-feature-settings は書かない。letter-spacing も書かない（ナビの 11px だけ 0.15em）
- ウェイトは 400 と 700 だけ。36px の大見出しは weight 400、24px のセクション見出しは weight 700
- line-height は 1.4 を既定、本文のまとまりは 1.6、リード文は 1.8
- ページタイトル帯は 40px / weight 400 / line-height 1.8 / 白文字
- ボタンは背景 #356cb6 / 白文字 / 16px weight 700 / border-radius 30px
- ニュース種別バッジは 11px weight 700 / border-radius 10px / 白文字で、
  ニュースリリース #1565c0 / IRニュース #6a1b9a / イベント #2e7d32 / サステナビリティ #00838f
- 注意喚起の帯は背景 #ffff00 に黒文字
- box-shadow は使わない。面は #f2f2f2 / #eff3f9 で区切る
- コンテナは 1280px、ブレークポイントは 767/768px
```
