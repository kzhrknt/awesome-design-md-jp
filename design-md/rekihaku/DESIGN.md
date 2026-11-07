# DESIGN.md — 国立歴史民俗博物館（National Museum of Japanese History）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-07 / 対象: `https://www.rekihaku.ac.jp/`, `/exhibitions/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **黒を主役に据える。** CSS 変数の `--primary-color` も `--text-color` も **`#000000`**。影はぼかし 0 の**ハードシャドウ**（`6px 6px 0` / `10px 10px 0`）で、版ズレのような印刷っぽい陰を作る。ナビの帯は `#ffea5c` の黄、ページの地は `#ffefef` の淡いピンク
- **密度**: 中。セクション見出しを**縦組み**で左右に立て、横に展示の写真を並べる
- **キーワード**: 黒が主役、縦組み見出し、ハードシャドウ、3段の文字サイズ、ウェイトが丸まる

**このサイトの核心は4つある。**

1. **CSS が指定した `font-weight: 600` は、実際には 700 で描画される。** Google Fonts の URL は `Noto+Sans+JP:wght@400;700;900` の **3 本だけ**。隠し div での実測は **100〜500 → 685.31px / 600〜700 → 703.48px / 800〜900 → 713.72px の 3 面**で、**600 は 700 に、800 は 900 に丸められる**。それでも分布上は **600 が 177 要素で最多**（→ 3.4 節）
2. **`body` の `font-size` が 3 帯の流体で、768 / 769px に 3.18 倍の崖がある。** `769px → 9.007px`（最小）から `768px → 28.672px` へ 1px またいで跳ね上がる。**規定の 4 幅（1440 / 1200 / 834 / 375px）では崖が見えない**（→ 8 節）
3. **セクション見出しが本物の縦組み**（実測 15 要素・`h2.tt` が 130×604px）。**375px でも 15 要素のまま維持する**（モバイルで横組みに戻さない）
4. **自社 CSS 変数 39 個のうち 18 個が `url(...)` の画像パス**。ホバー時のアイコン差し替えを変数で切り替える設計。色の変数は `--module-*` に集約されている

**`font-feature-settings` は 0 件**（`palt` を使っていない）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Primary / Text** | **`#000000`** | **`--primary-color` と `--text-color` の両方がこれ。文字色 201 要素（最多）＋ CTA の面 8 要素** |
| **Nav Yellow** | **`#ffea5c`** | **`--module-sidebar-bg`**。グローバルナビの帯（下層ページでは 688,478px² の最大面積） |
| **Page Background** | **`#ffefef`** | ページの地（`pageBackground.resolved` / 根拠 `viewportTopBySample (6/6)`）。**白ではない淡いピンク** |

> **このサイトはブランド色を持たない。** 主役は黒で、黄色は「ナビの帯」という場所に結びついた色。**`--primary-color` を企業カラーに読み替えない。**

### Module Colors（CSS 変数・セクションごとの差し色）

| 変数 | 値 | 用途 |
|------|----|------|
| `--module-color-aside` | `#95c4ff` | 補助カラムの面 |
| `--module-color-hover` / `--module-color-aside-hover` | `#d37d00` | ホバー |
| `--moudle-more-color` | `#9b5100` | `もっと見る`（**変数名の `moudle` は実サイトの綴りのまま**） |
| `--module-text-color` / `--module-qa-color` | `#32629f` | モジュール内の文字 |
| `--module-sidebar-bg` | `#ffea5c` | ナビ帯 |
| `--module-calendar-bg` | `#bdd5f4` | カレンダー |
| `--module-table-bg` | `#dae8fa` | 表のヘッダー |
| `--outline-color` | `#9b5100` | フォーカスリング |
| `--module-mark-bg` | `linear-gradient(to top, rgba(50,98,159,.5) 30%, transparent 30%)` | **蛍光ペン風のマーカー**（モバイルは 25%） |
| `--fc-event-bg-color` 〜 `04` | `#157de9` / `#db374d` / `#027c86` / `#907206` | FullCalendar のイベント種別 4 色 |
| `--fc-holiday-bg` | `#e8e8e8` | 休館日 |
| `--font-base` | `'Noto Sans JP', sans-serif` | 本文 |
| `--font-en` | `'Urbanist', sans-serif` | 欧文・数字 |

### Category Badge（展示種別）

| ラベル | 面 | 文字 |
|--------|----|------|
| `歴博フォーラム` / `歴博講演会` | `#907206` | `#ffffff` |
| `植物苑特別企画` | `#027c86` | `#ffffff` |
| `企画展示` | `#063e86` | `#ffffff` |

3 種とも **`border-radius: 12px 0` / `padding: 3px 9px` / `font-size: 12px` / `font-weight: 600`**。**角丸が左上と右下だけ**という特徴的な形。

### Neutral / Accent

- **Text Primary** (`#000000`): 本文・見出し。**可視 201 要素**
- **Text on Dark** (`#ffffff`): 黒面・色面の上（可視 23 要素）
- **Accent Orange** (`#e68900`): 第 5 展示室の番号・見出し（可視 16 要素）。展示室ごとに色が変わる
- **Link Blue** (`#006ad8`): 企画展示のリンク（可視 8 要素）
- **Danger** (`#ff0000`): `【重要なお知らせ】`（可視 4 要素）
- **Surface Gray** (`#f0f0f0`): `職員の採用情報` などのピルボタンの面（9 要素）
- **Overlay** (`rgba(255,255,255,0.45)` / `rgba(255,255,255,0.3)`): 写真の上に敷く白のベール（9 / 5 要素）
- **Accent Tints**: `#fdb1a2` / `#ffb779` / `#95c4ff` / `#fff089` / `#e89867` / `#b1e2a8` / `#ade399` / `#b4d7ff` / `#becbdd`

### JS が供給する変数

```css
/* html の inline style に JS が書き込む（実測 1440px 時） */
--vw: 14.4px;   /* = 100vw / 100 */
--vh: 9px;      /* = 実ビューポート高 / 100 */
```

モバイル Safari のアドレスバーで `vh` がずれる問題を避けるための定番の仕込み。**`calc(var(--vh) * 100)` で全画面高を取る。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の和文）**: **Noto Sans JP**（Google Fonts）。実測 234 / 128 要素
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **Urbanist**（Google Fonts、weight 800）。**時刻・数字・`Language` にだけ使う**（実測 19 / 14 要素）
- `9:30` `16:30` の開館時刻、展示室の番号 `1`〜`6` がこれ

### 3.3 font-family 指定

```css
:root {
  --font-base: 'Noto Sans JP', sans-serif;   /* 和文・既定 */
  --font-en:   'Urbanist', sans-serif;       /* 欧文・数字 */
}

/* 本文（実測 234 / 128 要素） */
font-family: "Noto Sans JP", sans-serif;

/* 時刻・番号（実測 19 / 14 要素） */
font-family: Urbanist, sans-serif;
```

```html
<!-- 実際の読み込み -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Urbanist:ital,wght@0,800;1,700&display=swap" rel="stylesheet">
```

**フォールバックの考え方**:
- **generic family 1 つだけの短いチェーン。** OS ローカルの和文を経由せず、Web フォントが落ちたら即 `sans-serif`
- **`@font-face` は 2 件しか出ない**（`glyphs` / `swiper-icons`）。Noto Sans JP と Urbanist は Google Fonts の CSS 側で宣言されており、CORS で `cssRules` が読めない。**フォント要求は実測 42 件が `fonts.gstatic.com` に飛んでいる**ので、読み込みは確実に起きている
- Noto Sans JP は `unicode-range` で数百本に分割されるため、`document.fonts` に `unloaded` が大量に並ぶ。**これは正常**

### 3.4 文字サイズ・ウェイト階層

**標準（`html` 10px / `body` 16px、1440px）での実測値。**

| Role | Font | Size | Weight（CSS） | **実際に出るウェイト** | Line Height | Letter Spacing | 備考 |
|------|------|------|---------------|------------------------|-------------|----------------|------|
| **Page Title（h1）** | Noto Sans JP | **32px** | 900 | **900** | — | — | `総合展示` |
| **Section Heading（縦組み）** | Noto Sans JP | **33px** | 900 | **900** | 1.15 | 1.98px（0.06em） | `h2.tt` 130×604px |
| **Display** | Noto Sans JP | **27px** | 600 | **700** | 1.26 | **2.7px（0.1em）** | `第5展示室近代` `植物苑特別企画` |
| **Sub Heading** | Noto Sans JP | **18px** | 600 | **700** | 1.28 | 1.08px（0.06em） | `総合展示一覧へ` |
| **Lead** | Noto Sans JP | **17px** | 400 | **400** | 1.69 | 0.51px（0.03em） | `【重要なお知らせ】` の本文 |
| **Body** | Noto Sans JP | **16px**（= 1.6rem） | 400 | **400** | **2.00**（32px） | **0.48px（0.03em）** | **既定** |
| **Caption** | Noto Sans JP | **15px** | 600 | **700** | 1.20 | 1.5px（0.1em） | 展示の説明文 |
| **Nav** | Noto Sans JP | **14px** | 600 | **700** | — | 1.2px / 0.42px | `展示・イベント` `総合展示` |
| **List** | Noto Sans JP | **13px** | 600 | **700** | **2.62** | **1.3px（0.1em）** | 展示室リスト（26 要素） |
| **Small** | Noto Sans JP | **12px** | 600 | **700** | 1.80 | 1.2px（0.1em） | `開館時間・入館料` |
| **Utility** | Noto Sans JP | **11px** | 700 | **700** | — | — | `公式SNS` `文字サイズ` |
| **Time / Number** | **Urbanist** | **18px** | 800 | **900** | — | — | `9:30` `16:30` `5` |

> ### ウェイトが丸まる（このサイトで最も重要な事実）
>
> Google Fonts の URL は **`Noto+Sans+JP:wght@400;700;900`**。読み込んでいるのは **400 / 700 / 900 の 3 本だけ**。
>
> 同一ページに隠し div を置いて `font-weight` だけ振り、`getBoundingClientRect().width` を比べた実測:
>
> | `font-weight` | 実測幅 | 実際に当たる面 |
> |---|---|---|
> | 100 / 200 / 300 / 400 / **500** | **685.31px** | **400（Regular）** |
> | **600** / 700 | **703.48px** | **700（Bold）** |
> | **800** / 900 | **713.72px** | **900（Black）** |
>
> **CSS は 600 を 177 要素（最多）に当てているが、描画はすべて 700。** Urbanist も `wght@800` しか読まないので、**800 指定は 800 のまま**（`ital,wght@0,800;1,700` で 800 normal と 700 italic）。
>
> **再現するときは `600` をそのまま書いてよい**（実サイトと同じ結果になる）。ただし **Google Fonts の URL に 600 を足すと別物になる**（本当に SemiBold が降ってきて、既存ページより細く出る）。

### 3.5 行間・字間

- **本文の行間**: **2.00**（`body { line-height: 2 }` = 32px）。**日本語本文として広い側**
- **リストの行間**: **2.62**（13px / 34px。実測 26 要素）
- **見出しの行間**: 1.15〜1.28
- **`line-height: 1.00` が 98 要素**。1 未満の比率が **1 件も出ない**ので、**`em` や px の絶対値ではなく無単位の `1`** と確定できる

> **字間は「継承」と「宣言」が混ざっている。**
>
> - **継承**: `body { letter-spacing: 0.03em }` が **px の絶対値で降りる**（16px → **0.48px** が 29 要素、17px の Lead も 0.51px、14px の項目も 0.42px）
> - **宣言**: 要素側が自分で **`0.1em`** を持つ（13px → **1.3px** が 26 要素、27px → **2.7px**、15px → **1.5px**、12px → **1.2px**）
>
> **サイズが違うのに px が同じなら継承、サイズに比例して px が変わるなら em の宣言。** このサイトは両方あるので、**本文は `body` に 1 回だけ `0.03em` を書き、リストと見出しには個別に `0.1em` を当てる**。

### 3.6 禁則処理・改行ルール

```css
body {
  word-break: normal;   /* 実測値。ブラウザ既定の日本語禁則に任せる */
}
```

- `word-break` も `auto-phrase` も指定していない
- コンテナを 1130px / 1000px に絞ることで行長を抑えている

### 3.7 OpenType 機能

```css
/* このサイトは font-feature-settings を一切書いていない（実測 0 件） */
```

- **`palt` を使っていない。** Noto Sans JP は `palt` を持つので足せば効いてしまう
- **足さないこと。** 本文は `0.03em`、見出しは `0.1em` で**空けている**設計なので、`palt` で詰めると方向が逆になる

### 3.8 縦書き

```css
/* セクション見出し（実測 15 要素） */
.tt {
  writing-mode: vertical-rl;
  font-size: 33px;
  font-weight: 900;          /* 実際に 900 で出る */
  letter-spacing: 0.06em;    /* = 1.98px */
  line-height: 1.15;
}
```

- **`h2.tt` が 130×604px**（`総合展示`）、`250×503px`（`くらしの植物苑`）。**写真の横に縦の柱として立つ**
- **`small` も縦組み**（34×174px）。英語の読み `総合展示` を小さく添える
- **タブの見出しも縦組み**（`li.tab-switch__trigger` 67×174px、`1 じぶんにつながる博物館`）
- **375px でも縦組みのまま**（実測 15 要素で変わらない）。**モバイルで横組みに戻す設計ではない**

> **縦組みを横に並べるときは `flex-direction: row-reverse` にする。** 素の `display: flex` だと DOM 順に左→右へ置かれ、日本語の縦組みとして読む向き（右→左）と逆になる。

### 3.9 文字サイズ切替（アクセシビリティ機能）

ヘッダーの `文字サイズ` に `標準` / `大` / `特大` の 3 段がある。

```html
<div class="header-size__list">
  <label><input type="radio" name="size" value="f_size_standard" hidden checked><span tabindex="0">標準</span></label>
  <label><input type="radio" name="size" value="f_size_middle"   hidden><span tabindex="0">大</span></label>
  <label><input type="radio" name="size" value="f_size_large"    hidden><span tabindex="0">特大</span></label>
</div>
```

**仕掛けは `html` の `data-size` 属性。**

```css
html                              { font-size: 10px }
html[data-size="f_size_middle"]   { font-size: 12px }
html[data-size="f_size_large"]    { font-size: 15px }
```

実測値:

| | 標準 | 大 | 特大 |
|---|---|---|---|
| `html` | **10px** | **12px** | **15px** |
| `body` | **16px** | **19.2px** | **24px** |
| `h1` | 32px | 38.4px | 48px |
| `h2` | 24px | 28.8px | 36px |
| `body` の `letter-spacing` | 0.48px | 0.576px | 0.72px |
| 倍率 | ×1.0 | **×1.2** | **×1.5** |

- **ルートを動かし、`rem` で全体が連動する。** `letter-spacing` の `0.03em` も自動で追従する
- 選択は **localStorage（`headerSize`）に永続化**される
- `<input type="radio" hidden>` + `<label>` + `<span tabindex="0">` の構成。**ラジオの意味論を保ったまま見た目を作る**正しい作り

> **サイズを px で直書きすると、この機能が丸ごと壊れる。** 3.4 節の px 値は「標準（`html` 10px）のときの値」であって、実装は `rem` で書く。

---

## 4. Component Stylings

### Buttons

**Primary（黒のピル）**
- Background: `#000000` / Text: `#ffffff`
- Font Size: 15px（セクション内）/ 18px（一覧へ）、Weight: 600（**実際は 700**）
- Padding: `0 70px`
- Border Radius: **9999px**
- Shadow: **`rgba(0, 0, 0, 0.2) 6px 6px 0 0`**（ぼかし 0 のハードシャドウ）

**Secondary（グレーのピル）**
- Background: `#f0f0f0` / Text: `#000000`
- Font Size: 14px / Weight: 600（**実際は 700**）
- Padding: `8px 35px 8px 24px`（右が広いのは矢印アイコンぶん）
- Border: `1px solid #f0f0f0`
- Border Radius: **50px**

### Badges（展示種別）

- Background: 2 章の 3 色 / Text: `#ffffff`
- Font Size: 12px / Weight: 600（**実際は 700**）
- Padding: `3px 9px`
- Border Radius: **`12px 0`**（左上と右下だけ丸める）

### Cards / Tiles

- Border Radius: **5px**（39 要素で最多）、**12px**（27 要素）、`6px`（14 要素）
- Shadow: **`rgba(0, 0, 0, 0.2) 10px 10px 0 0`**（`開館時間・入館料` `アクセス` `フロアマップ` の 4 要素）

### Marker（蛍光ペン）

```css
background: var(--module-mark-bg);
/* = linear-gradient(to top, rgba(50, 98, 159, 0.5) 30%, transparent 30%) */
/* モバイルは --module-mark-bg-sp で 25% */
```

**下から 30% だけを青で塗る。** 文字の下半分にマーカーが掛かる表現。

---

## 5. Layout Principles

### Container

| 値 | 実測 | 用途 |
|----|------|------|
| **1130px** | 4 箇所 | 主要コンテンツ |
| **1000px** | 2 箇所 | 狭いセクション |
| 410px | 1 箇所 | カラム |

### Gap

| 値 | 実測 |
|----|------|
| **45px** | 2 箇所 |
| `30px 70px` | 1 箇所 |
| `12px` | 1 箇所 |

### Border Radius Scale

| 用途 | 値 | 実測 |
|------|----|------|
| カード・タイル | **5px** | 39 要素 |
| パネル | **12px** | 27 要素 |
| 日付ラベル | **6px** | 14 要素 |
| ピルボタン | **9999px** / **50px** | 8 / — 要素 |
| バッジ | **`12px 0`** | 8 要素 |
| アイコン | `50%` | 27 要素 |

---

## 6. Depth & Elevation

| Level | Shadow | 実測 | 用途 |
|-------|--------|------|------|
| 1 | **`rgba(0, 0, 0, 0.2) 6px 6px 0 0`** | **6 要素** | ピルボタン（`展示・イベント一覧へ` `カレンダー` `総合展示一覧へ`） |
| 2 | **`rgba(0, 0, 0, 0.2) 10px 10px 0 0`** | **4 要素** | 大きなタイル（`開館時間・入館料` `アクセス` `フロアマップ`） |
| 3 | `rgba(0, 0, 0, 0.3) 3px 3px 12px 0` | 4 要素 | 浮かせる要素 |
| 4 | `rgba(0, 0, 0, 0.16) 0 3px 12px 0` | 1 要素 | 言語切替のドロップダウン |

> **Level 1 / 2 は `blur: 0` / `spread: 0` のハードシャドウ。** ぼかさず、右下にベタの黒を 20% で置く。**版ズレ・シルクスクリーンのような印刷的な陰**で、このサイトの個性そのもの。
>
> **`0 2px 8px rgba(0,0,0,.1)` のような一般的な「浮き」に置き換えないこと。** 要素の大きさに応じて **6px → 10px** とオフセットを変えているのも意図。

---

## 7. Do's and Don'ts

### Do（推奨）

- **主役は黒**（`--primary-color: #000` / `--text-color: #000`）。文字も CTA の面も黒
- **ページの地は `#ffefef`**（白ではない）
- **サイズは `rem` で書く**（`html` 10px 基準。本文 = `1.6rem`）。文字サイズ切替が `rem` に依存している
- **本文の `line-height` は 2.00、リストは 2.62**
- **`letter-spacing` は `body` に `0.03em` を 1 回。リスト・見出しには個別に `0.1em`**
- **ハードシャドウを使う**（`rgba(0,0,0,.2) 6px 6px 0` / `10px 10px 0`）
- **セクション見出しは縦組み**（`writing-mode: vertical-rl` / 900 / `0.06em`）。**モバイルでも維持する**
- バッジの角丸は **`12px 0`**（左上と右下だけ）
- 欧文・数字は **Urbanist 800**
- `--vh` を JS で供給し、全画面高は `calc(var(--vh) * 100)` で取る

### Don't（禁止）

- **Google Fonts の URL に `600` を足さない。** このサイトは `wght@400;700;900` の 3 本だけで、CSS の `600` は 700 として出るのが正しい挙動。600 を読み込むと既存より細くなる
- **`font-feature-settings: "palt"` を足さない**（実測 0 件。しかも字間を空ける設計なので方向が逆）
- **サイズを px で直書きしない**（→ 3.9 節。文字サイズ切替が効かなくなる）
- **`letter-spacing` を全部 `em` で配らない**（本文は `body` からの px 継承が設計）
- **`line-height: 1.00` を `em` や px に書き換えない**（無単位の `1` が正）
- **影をぼかさない**（`blur: 0` がこのサイトの陰）
- **縦組みをモバイルで横組みに戻さない**（375px でも 15 要素のまま）
- **`--primary-color` を企業カラーに読み替えない**（黒が設計）

### 実サイトの事実として知っておくこと

- **ヒーローの手描き風コピー「ようこそ。「自分につながる」歴史民俗博物館へ」は PNG 画像**（`banner.png` 356×208、`alt` も同文）。**Web フォントで組み直さない**
- **変数名 `--moudle-more-color` は実サイトの綴りのまま**（`module` のタイプミス）。既存 CSS と突き合わせるときはこの綴りで探す
- Google Fonts の CSS は CORS で `cssRules` が読めない。**そこに自社トークンは無い**（自社変数 39 個はすべて自前の CSS 側）
- Noto Sans JP は `unicode-range` で分割されるため `document.fonts` に `unloaded` が大量に並ぶ。**異常ではない**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 | `body` の `font-size` |
|------|-------|------|----------------------|
| **Mobile** | **≤ 768px** | 17 箇所 | **`3.73333vw`** |
| **Tablet / 小型 Desktop** | **769〜1365px** | 17 箇所 | **`1.1713vw`** |
| **Desktop** | **≥ 1366px**（+ `print`） | 17 箇所 | **`1.6rem`**（= 16px 固定） |
| Wide | ≥ 1960px | 1 箇所 | — |
| Hover 可能な端末 | `(hover: hover)` | **78 箇所** | — |

```css
@media (min-width: 1366px), print {
  body { font-size: 1.6rem;     line-height: 2; letter-spacing: 0.03em }
}
@media (min-width: 769px) and (max-width: 1365px) {
  body { font-size: 1.1713vw;   line-height: 2; letter-spacing: 0.03em }
}
@media only screen and (max-width: 768px) {
  body { font-size: 3.73333vw;  line-height: 2; letter-spacing: 0.03em }
}
```

### ルートと本文の実測（12 幅）

| 幅 | `html` | `body` | `line-height` | `letter-spacing` |
|----|--------|--------|---------------|------------------|
| 1380px | 10px | **16px** | 32px | 0.48px |
| **1366px** | 10px | **16px** | 32px | 0.48px |
| **1365px** | 10px | **15.9883px** | 31.9766px | 0.4796px |
| 1200px | 10px | 14.0556px | 28.1113px | 0.4217px |
| 1024px | 10px | 11.9941px | 23.9883px | 0.3598px |
| 900px | 10px | 10.5417px | 21.0835px | 0.3163px |
| 834px | 10px | 9.7687px | 19.5373px | 0.2931px |
| 800px | 10px | 9.3704px | 18.7408px | 0.2811px |
| **769px** | 10px | **9.0073px ← 最小** | 18.0146px | 0.2702px |
| **768px** | 10px | **28.672px ← 3.18倍に跳ぶ** | 57.344px | 0.8602px |
| 500px | 10px | 18.6667px | 37.3333px | 0.56px |
| 428px | 10px | **15.9787px** | 31.9573px | 0.4794px |
| 375px | 10px | **14px** | 28px | 0.42px |

> ### 崖とレンジの読み方
>
> - **`html { font-size: 10px }` は全幅で固定。** 動くのは `body` だけ
> - **1366px でちょうど 16px**（`1.1713vw` × 1366 = 15.999）。**上の帯との継ぎ目は連続している**
> - **769px で 9.007px が最小。** 834px でも 9.77px で、**タブレット帯の本文は 10px を切る**
> - **768 / 769px に 3.18 倍の崖がある。** モバイル帯の `3.73333vw` が 768px では 28.672px になるため。**モバイルレイアウトに幅の上限を掛けていない**
> - **モバイル帯の設計幅は 375px**（`3.73333vw` × 375 = 14px）。**428px でちょうど 16px**
> - **規定の 4 幅（1440 / 1200 / 834 / 375px）では崖が見えない。** 崖を確かめるには `distributions.layout.breakpoints` に出る `only screen and (max-width: 768px)` の境界 ±1px を測る

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary / Text:   #000000   ← --primary-color も --text-color も黒
Nav Yellow:       #ffea5c   ← --module-sidebar-bg
Background:       #ffefef   ← 白ではない淡いピンク
Accent Orange:    #e68900
Link Blue:        #006ad8
Module Text:      #32629f
Danger:           #ff0000
Font (和文):      "Noto Sans JP", sans-serif        ← --font-base
Font (欧文/数字): Urbanist, sans-serif              ← --font-en
Google Fonts:     Noto+Sans+JP:wght@400;700;900 / Urbanist:ital,wght@0,800;1,700
Root:             html { font-size: 10px }  ← 全幅固定
                  html[data-size="f_size_middle"] { font-size: 12px }
                  html[data-size="f_size_large"]  { font-size: 15px }
Body Size:        1.6rem（≥1366px） / 1.1713vw（769-1365px） / 3.73333vw（≤768px）
Line Height:      2（本文） / 2.62（リスト） / 1.15-1.28（見出し）
Letter Spacing:   0.03em（body から継承） / 0.1em（リスト・見出しに個別）
Font Weight:      400 / 600（→700で描画） / 900
Radius:           5px（カード） / 12px（パネル） / 9999px（ピル） / 12px 0（バッジ）
Shadow:           rgba(0,0,0,.2) 6px 6px 0   ← ぼかし0のハードシャドウ
                  rgba(0,0,0,.2) 10px 10px 0
Container:        1130px / 1000px
Gap:              45px
縦組み:            h2.tt { writing-mode: vertical-rl; font-weight: 900 }  ← モバイルでも維持
```

### プロンプト例

```
国立歴史民俗博物館のデザインシステムに従って、企画展一覧のセクションを作成してください。

- font-family は "Noto Sans JP", sans-serif。数字と時刻だけ Urbanist, sans-serif
- Google Fonts は wght@400;700;900 の 3 本だけ読む（600 を足さない）
- html は font-size: 10px に固定し、サイズはすべて rem で書く（本文 1.6rem）
- 本文の line-height は 2、letter-spacing は body に 0.03em を 1 回だけ書いて継承させる
- リストの項目は 1.3rem / line-height 2.62 / letter-spacing 0.1em を個別に当てる
- font-feature-settings は書かない
- ページの地は #ffefef、文字は #000000
- セクション見出しは writing-mode: vertical-rl / font-size 3.3rem / font-weight 900 /
  letter-spacing 0.06em で左に縦の柱として立てる。横に並べるときは flex-direction: row-reverse
- 種別バッジは面が #907206 / #027c86 / #063e86、文字 #ffffff、12px / weight 600 /
  padding 3px 9px / border-radius 12px 0
- カードは border-radius 5px、タイルには box-shadow rgba(0,0,0,.2) 10px 10px 0 0 を当てる
- 「一覧へ」ボタンは background #000000 / 文字 #ffffff / weight 600 / padding 0 70px /
  border-radius 9999px / box-shadow rgba(0,0,0,.2) 6px 6px 0 0
- コンテナは max-width 1130px、gap は 45px
- 1366px 以上は body 1.6rem 固定、769〜1365px は 1.1713vw、768px 以下は 3.73333vw
```
