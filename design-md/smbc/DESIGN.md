# DESIGN.md — 三井住友銀行（SMBC）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-07 / 対象: `https://www.smbc.co.jp/`, `/aboutus/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **深緑 `#004831` と墨 `#141d1d` の 2 色で文字を組み、面はライムイエロー `#edf3b2` で軽く抜く。** 影は黒ではなく**緑がかったグレー**（`rgba(81,127,111,…)`）。角丸はピル（58.4px）とカード（10px）の 2 系統
- **密度**: 高い。トップの可視テキストは 378 要素。ただし**本文の 1/3 が 12px**（123 要素）で、小さい文字に情報を詰める銀行サイトの構え
- **キーワード**: SMBCグリーン、ライムイエロー、12px主体、緑の影、ウェイト2段

**このサイトの核心は4つある。**

1. **宣言したウェイトと描画されるウェイトが完全に一致している唯一の作り。** `@font-face` は **Regular と Bold の 2 本**だけ、`font-weight` の分布も **400（273 要素）と 700（105 要素）の 2 段**だけ。隠し div での実測も **100〜500 が 676.05px / 600〜900 が 694.33px の 2 面**で、**CSS が指定したウェイトがそのまま出る**
2. **`noto-sans` というファミリー名で自社ホストの Noto Sans JP を配信している。** Google Fonts でも Adobe Fonts でもない。実体は `/kojin/cmn/fonts/Noto_Sans_JP/NotoSansJP-Regular.otf` と `-Bold.otf` の **`.otf` 2 本**（→ 3.2 節に注意点）
3. **ルートも本文も 9 幅すべてで完全固定。** `html { font-size: 62.5% }` = 10px、`body { font-size: 1.6rem; line-height: 1.5 }` = 16px が 1920px から 375px まで 1 度も動かない。流体（`vw` / `clamp()`）はゼロ
4. **`letter-spacing` は 2 ページとも全要素 `normal`**（実測 378 / 106 要素）。`font-feature-settings` も 0 件

**CSS Custom Properties は 0 個。** 読めなかったシートは 1 枚あるが、それは翻訳ウィジェット（`j.wovn.io`）のもので自社 CSS ではない。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **SMBC グリーン** | **`#004831`** | **文字色 202 要素（最多）＋ 塗り面 6 要素**。見出し、ナビ、`口座開設` ボタン、カルーセルの現在位置 |
| **Deep Green（面の変種）** | `#017a4f` | 1 要素。帯のアクセント |
| **Lime Yellow** | **`#edf3b2`** | **塗り面 42 要素（最多の面色）**。`NISA` `投資信託` などのタグ、セクションの地 |
| **Lime** | `#c4d700` | カルーセルの `Next` ボタン |

> **文字の緑と面のライムは役割が分かれている。** `#004831` は文字とボタンの面、`#edf3b2` はタグとセクションの地。**面に `#004831` を広く敷かない**（このサイトでは 6 要素しかない）。

### Accent（カテゴリの差し色）

| 色 | 用途 |
|----|------|
| `#fa8200`（オレンジ） | `アプリでログイン` ボタン |
| `#8a75ae`（紫） | カテゴリ面 |
| `#fcd866`（黄） | カテゴリ面 |
| `#66bee8`（空色） | カテゴリ面 |
| `#e2efbc`（淡ライム） | セクションの地 |

### Neutral（ニュートラル）

- **Text Primary** (`#141d1d`): 本文。**可視 129 要素**。**純黒ではなくわずかに青緑に寄った墨**
- **Text Brand** (`#004831`): 見出し・ナビ・リンク。**可視 202 要素でこちらが最多**
- **Text Muted** (`#788883`): 日付、補助ラベル（可視 18 要素）。**こちらも緑に寄っている**
- **Text on Dark** (`#ffffff`): 緑面・オレンジ面の上（可視 26 要素）
- **Danger** (`#c83030`): `近年多発している金融犯罪にご注意ください` などの警告リンク（可視 3 要素）
- **Surface** (`#f9f9f9` / `#f5f5f5` / `#f8f8f8` / `#fefbf1` / `#f3f8f6`): 淡い面を 5 段持つ
- **Surface Gray-Green** (`#d5dedb`): カルーセルの非選択ドット（10 要素）
- **Danger Surface** (`#ffebeb`): 警告帯の地
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (3/3)`）

> **グレーが全部わずかに緑を含んでいる**（`#788883` / `#d5dedb` / `#f3f8f6`）。純グレー（`#888888` 等）に丸めない。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（既定）**: **Noto Sans JP**（自社ホスト配信、ファミリー名は `noto-sans`）
- **フォールバック**: ヒラギノ角ゴ ProN W3 → メイリオ
- **明朝体**: 使用しない（2 ページとも可視 0 要素）

### 3.2 欧文フォント

- **`roboto`** が `@font-face` で宣言されているが、**配信ファイルは `RobotoCondensed-Regular.ttf` / `RobotoCondensed-Bold.ttf`**。**名前は Roboto、中身は Roboto Condensed。** トップでは `unloaded`（使っている要素が無い）
- **`Olive`**（200 / 400 / 700 の 3 ウェイト）は **Olive ブランドページ専用**。`OLIVE-Whisper.otf` / `OLIVE-Nature.woff` / `OLIVE-Impact.woff` を宣言しているが、**トップでは 3 本とも `unloaded`**
- 数字（金利 `年1.5％～14.5％`、日付）は **Noto Sans JP の欧文グリフ**で組まれている

### 3.3 font-family 指定

```css
/* 全要素共通（実測 378 / 106 要素。これ1本しかない） */
font-family: noto-sans, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, sans-serif;
```

```css
/* @font-face の実測（10 件） */
@font-face { font-family: noto-sans;      src: url("/kojin/cmn/fonts/Noto_Sans_JP/NotoSansJP-Regular.otf") }
@font-face { font-family: noto-sans-bold; src: url("/kojin/cmn/fonts/Noto_Sans_JP/NotoSansJP-Bold.otf") }
@font-face { font-family: noto-sans; font-weight: 700;
             src: url("/kojin/cmn/fonts/Noto_Sans_JP/NotoSansJP-Bold.otf") }
```

**フォールバックの考え方**:
- **和文優先。** `noto-sans` が先頭で、以降は OS ローカル
- **`noto-sans` は Google Fonts の名前ではない。** 外部 CDN を使わず自社ドメインから配る設計
- **同じ Bold ファイルを 2 通りで宣言している。** `noto-sans-bold` という**独立ファミリー**と、`noto-sans` の **`font-weight: 700`**。実際に使われるのは後者（分布の 700 = 105 要素）。前者はトップで `unloaded`

> **`.otf` で配信している点に注意。** Noto Sans JP の OTF はフル CJK グリフを含むため woff2 より大幅に重い。**再現するときは woff2 + `unicode-range` のサブセットに置き換えてよい**（見た目は変わらない）。

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Hero Copy** | Noto Sans JP | **46px** | 700 | **1.30**（59.8px） | normal | `SMBC Wealth` `カードローン`（実測 23 要素） |
| **Page Title（下層 h1）** | Noto Sans JP | **36px** | 700 | 1.00 | normal | `企業情報` |
| **Lead** | Noto Sans JP | **28px** | 700 | 1.30 | normal | `わたしは` `トップメッセージ` |
| **Section Heading** | Noto Sans JP | **24px** | 700 | 1.00 | normal | `キャンペーン` `商品・サービス` |
| **Sub Heading** | Noto Sans JP | **18px** | 700 | 1.50 | normal | `SMBCダイレクト` `クレジットカード` |
| **Body** | Noto Sans JP | **16px**（= 1.6rem） | 400 | **1.50**（24px） | normal | **既定**（実測 101 要素） |
| **Nav / Button** | Noto Sans JP | **14px** | 700 | 1.10 | normal | `個人` `法人` `口座開設` |
| **Tag / Utility** | Noto Sans JP | **13px** | 700 | 1.50 | normal | `NISA` `投資信託` `文字サイズ` |
| **Caption** | Noto Sans JP | **12px** | 400 | 1.50 | normal | **最多の 123 要素**。日付、注記、フッターナビ |
| **Legal** | Noto Sans JP | 10px | 400 | 1.50 | normal | コピーライト |

**ウェイトは 400 と 700 の 2 段だけ。** 300 も 500 も 600 も 1 要素も無い。

> **実測の裏付け**: 隠し div で `font-weight` だけ 100〜900 に振って幅を比べると、**100〜500 → 676.05px / 600〜900 → 694.33px の 2 面**。`@font-face` が Regular / Bold の 2 本しか無いことと一致する。**500 や 600 を書いても 400 / 700 に丸められる。**

### 3.5 行間・字間

- **本文の行間**: **1.50**（`body { line-height: 1.5 }` = 24px）。**実測 297 / 101 要素で圧倒的多数**
- **ヒーロー・リードの行間**: **1.30**（実測 23 要素）
- **ボタンの行間**: 1.10（実測 15 要素）
- **セクション見出しの行間**: **1.00**（実測 7 要素）
- **字間**: **全要素 `normal`**（実測 378 / 106 要素）

> **`line-height` は無単位。** 1 未満の比率が 1 件も出ないので、`em` や px の絶対値ではなく無単位の継承と確定できる。**`line-height: 1.5` を `body` に 1 回書いて継承させる設計**なので、子要素で宣言し直さない。

### 3.6 禁則処理・改行ルール

```css
body {
  word-break: normal;   /* 実測値。日本語の禁則処理はブラウザ既定に任せる */
}
```

- **`word-break` も `line-break` も `auto-phrase` も指定していない。** ブラウザ既定の日本語禁則にそのまま委ねる
- 16px / `line-height: 1.5` の本文に対して、**コンテナを 1280px に制限して行長を抑える**のが実際の対策

### 3.7 OpenType 機能

```css
/* このサイトは font-feature-settings を一切書いていない（実測 0 件） */
```

- **`palt` を使っていない。** Noto Sans JP は `palt` を持つので、足せば効いてしまう
- **足さないこと。** 12px 主体のレイアウトで字幅が変わると、詰めたぶんだけ行の折り返し位置がずれる

### 3.8 縦書き

```css
/* 該当なし（実測 writing-mode: vertical-* は 0 要素） */
```

### 3.9 文字サイズ切替（アクセシビリティ機能）

ヘッダーの `文字サイズ` ボタンを押すとポップオーバーが開き、`小` / `標準` / `大` の 3 段から選ぶ。

```html
<button type="button" id="header-fontSizeSwitch"
        aria-controls="header-fontSizePanel" aria-haspopup="true" aria-expanded="false"
        class="icon-link02 fn-popup01"><span class="inner">文字サイズ</span></button>

<div role="dialog" id="header-fontSizePanel" aria-labelledby="header-fontSizeSwitch" class="popup">
  <ul class="list">
    <li class="item"><button type="button" class="btn fn-fsSmall"><span>小</span></button></li>
    <li class="item"><button type="button" class="btn fn-fsdDfault"><span>標準</span></button></li>
    <li class="item"><button type="button" class="btn fn-fsLarge"><span>大</span></button></li>
  </ul>
</div>
```

**仕掛けは `html` のクラス差し替え。** 実測値は以下。

| | 小 | 標準 | 大 |
|---|---|---|---|
| `html` のクラス | `-fsSmall` | `-fsdDfault` | `-fsLarge` |
| **`html` の `font-size`** | **8px** | **10px** | **12px** |
| **`body` の `font-size`** | **12.8px** | **16px** | **19.2px** |
| 倍率 | ×0.8 | ×1.0 | ×1.2 |

- **ルートを動かし、`rem` で全体が連動する**。本文 16px も `1.6rem` なので自動で追従する
- 選択は **Cookie（`REM…`）に永続化**される
- `aria-haspopup` / `aria-expanded` / `role="dialog"` / `aria-labelledby` が揃っている。**ポップオーバーとしてのアクセシビリティ実装は正しい**

> **クラス名の `fn-fsdDfault` は実サイトの綴りをそのまま写したもの**（`Default` のタイプミス）。**再現するときは `fn-fsDefault` に直してよい**が、既存の JS と突き合わせるときはこの綴りで探す。

> **サイズを px で直書きすると、この機能が丸ごと壊れる。** 3.4 節の px 値は「標準（html 10px）のときの値」であって、実装は `rem` で書く。

---

## 4. Component Stylings

### Buttons

**Primary（ピル・緑）**
- Background: `#004831` / Text: `#ffffff`
- Font Size: 16px / Weight: 400
- Padding: `3px 15px`
- Border Radius: **58.4px**（完全なピル）

**Accent（ピル・オレンジ）**
- Background: `#fa8200` / Text: `#ffffff`
- 他は Primary と同じ（`58.4px` のピル）

**Carousel Dot**
- Size: 円（`border-radius: 50%`）
- 現在位置: `#004831` / 非選択: `#d5dedb` / `Next`: `#c4d700`
- `font-size: 0`（ラベルは視覚的に隠す）

### Tags

- Background: `#edf3b2` / Text: `#141d1d`
- Font Size: 13px / Weight: 700
- Padding: `2px 8px`
- Border Radius: **4px**

### Cards

- Border Radius: **10px**（実測 42 要素で最多）
- Shadow: `rgba(81, 127, 111, 0.16) 0 7px 35px 0`（6 章）
- 面: `#ffffff` または `#f9f9f9`

### Hero Panel

- 写真の上に白いカードを重ね、**`border-radius: 23px`**（実測 23 要素）
- 左から `linear-gradient(to right, #004831 10%, rgba(0,72,49,0) 42%)` を重ねて文字の可読性を確保

---

## 5. Layout Principles

### Container

- **Max Width: 1280px**（実測 20 箇所で最多）
- 補助: `1230px`（1 箇所）、`100%`（6 箇所）

### Border Radius Scale

| 用途 | 値 | 実測 |
|------|----|------|
| タグ・小さい面 | **4px** | 32 要素 |
| カード | **10px** | 42 要素 |
| ヒーローのパネル | **23px** | 23 要素 |
| ピルボタン | **58.4px** | — |
| ドット・アイコン | **50%** | 13 要素 |
| 片側だけ | `0 0 0 20px` | 23 要素 |

**`23px` と `58.4px` は丸めない。** 半端に見えるがそのまま書く。

---

## 6. Depth & Elevation

| Level | Shadow | 実測 | 用途 |
|-------|--------|------|------|
| 1 | **`rgba(20, 29, 29, 0.05) 0 0 4px 0, rgba(20, 29, 29, 0.08) 0 12px 14px 0`** | **7 要素** | ナビのドロップダウン（**2 枚重ね**） |
| 2 | **`rgba(81, 127, 111, 0.16) 0 7px 35px 0`** | **13 要素** | カード（`SMBCダイレクト` `クレジットカード` など） |
| 3 | **`rgba(81, 127, 111, 0.25) 0 0 18px 0`** | **11 要素** | キャンペーンカード（**offset 0 の全方位グロー**） |

> **影の色が黒ではない。** Level 2 / 3 は `rgb(81, 127, 111)` = **緑がかったグレー**。Level 1 だけ本文色 `#141d1d` を使う。**`rgba(0,0,0,…)` に置き換えると、面の下が灰色に濁ってサイトの印象が変わる。**

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-weight` は 400 と 700 だけ使う**（他の値を書いてもこの 2 つに丸められる）
- **サイズは `rem` で書く**（`html` 10px 基準。本文 = `1.6rem`）。文字サイズ切替が `rem` に依存している
- **本文の `line-height` は 1.50**、ヒーロー・リードは 1.30、見出しは 1.00
- **`letter-spacing` は全要素 `normal`**
- **文字色は `#004831`（見出し・リンク）と `#141d1d`（本文）の 2 本立て**
- **グレーは緑を含ませる**（`#788883` / `#d5dedb`）
- **影の色は `rgba(81,127,111,…)`**
- カードは `border-radius: 10px`、タグは `4px`、ボタンはピル
- コンテナは 1280px

### Don't（禁止）

- **`font-weight: 500` / `600` を書かない**（Regular / Bold の 2 本しか無い）
- **`font-feature-settings: "palt"` を足さない**（実測 0 件）
- **`letter-spacing` を `em` で配らない**
- **サイズを px で直書きしない**（→ 3.9 節。文字サイズ切替が効かなくなる）
- **影を `rgba(0,0,0,…)` にしない**（緑がかった影が設計）
- **本文色に純黒 `#000000` を使わない**（`#141d1d` が正）
- **面に `#004831` を広く敷かない**（面は `#edf3b2` が主役）
- `23px` / `58.4px` の角丸を丸めない
- CSS Custom Properties があるつもりで書かない（実測 0 個）

### 実サイトの事実として知っておくこと

- **`roboto` という `@font-face` の実体は Roboto Condensed。** 名前と中身が違う。再現するなら `font-family: roboto-condensed` と正しく名付ける
- **ヒーローは `<picture>` + webp のスライドショー**（1440×547 を 6 枚以上、`index_img_kv_*.webp`）。写真に焼き込まれた `SMBC Wealth` は画像だが、**左のカードに乗る 46px の見出しは実テキスト**。両者を混同しない
- **`font-size: 0px` の要素が 36 個ある**（`line-height` が `NaN` で出る）。カルーセルの `自動再生停止` などスクリーンリーダー専用のラベル。**分布の `0px` を異常値として扱わない**
- 翻訳ウィジェット（`j.wovn.io`）の CSS は CORS で読めない。**そこに自社トークンは無い**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|------|-------|------|
| Small Mobile | ≤ 374px | 2 箇所 |
| **Mobile** | **≤ 767px** | **10 箇所（最多）** |
| **Tablet** | **768〜1024px** | **4 箇所** |
| **Desktop** | **≥ 768px / ≥ 1025px** | 4 / 1 箇所 |

### ルートと本文の実測（9 幅）

| 幅 | `html` | `body` | `line-height` | `letter-spacing` |
|----|--------|--------|---------------|------------------|
| 1920 / 1440 / 1200 / 1024 / 834 / 768 / 767 / 390 / 375px | **10px** | **16px** | **24px** | **normal** |

- **9 幅すべてで 1 度も動かない。** `vw` も `clamp()` も `%` の入れ子も使っていない
- **幅で変えるのはレイアウト（カラム数・折り返し）だけで、文字の大きさは変えない**
- 文字の大きさを変えるのは**ユーザーの操作（3.9 節の文字サイズ切替）だけ**という方針

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary (文字):   #004831   ← 見出し・ナビ・リンク（可視202要素で最多）
Primary (面):     #004831   ← ボタンのみ（6要素）
Surface Accent:   #edf3b2   ← タグ・セクションの地（面の最多42要素）
Text Color:       #141d1d   ← 本文（純黒ではない）
Text Muted:       #788883
Danger:           #c83030
Background:       #ffffff
Font:             noto-sans, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
                  メイリオ, Meiryo, sans-serif
Root:             html { font-size: 62.5% }  ← 10px 固定・9幅すべて不変
Body Size:        1.6rem（16px）
Line Height:      1.5（本文） / 1.3（ヒーロー） / 1.0（見出し）
Letter Spacing:   normal（全要素）
Font Weight:      400 / 700 のみ
Radius:           4px（タグ） / 10px（カード） / 23px（ヒーローパネル） / 58.4px（ピル）
Shadow:           rgba(81,127,111,.16) 0 7px 35px   ← 緑がかった影
Container:        1280px
CSS Variables:    なし（0個）
```

### プロンプト例

```
三井住友銀行のデザインシステムに従って、商品一覧カードのセクションを作成してください。

- font-family は上記 1 本。font-weight は 400 と 700 だけ使う（500/600 は書かない）
- html は font-size: 62.5%（10px）に固定し、サイズはすべて rem で書く
  （本文 1.6rem / 見出し 2.4rem / キャプション 1.2rem）
- 本文の line-height は 1.5、見出しは 1.0。letter-spacing は全要素 normal
- font-feature-settings は書かない
- 見出しの文字色は #004831、本文は #141d1d、補助テキストは #788883
- カードは background #ffffff / border-radius 10px /
  box-shadow rgba(81,127,111,.16) 0 7px 35px 0
- カード内のタグは background #edf3b2 / 文字 #141d1d / 13px / weight 700 /
  padding 2px 8px / border-radius 4px
- CTA は background #004831 / 文字 #ffffff / 16px / weight 400 /
  padding 3px 15px / border-radius 58.4px
- コンテナは max-width 1280px
- 767px 以下で 1 カラムに畳む。ただし文字サイズは変えない（幅で文字は変えない設計）
```
