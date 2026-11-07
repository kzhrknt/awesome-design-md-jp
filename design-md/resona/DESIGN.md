# DESIGN.md — りそなホールディングス（Resona Holdings）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-07 / 対象: `https://www.resona-gr.co.jp/`, `/holdings/about/brand/index.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **りそなグリーン1色で全部を仕切る。** 面も文字もリンクも同じ `#008756`。角丸は 3〜5px の控えめな値だけで、影は 1 種類しか存在しない。株価・ニュース・IR を 1200px の中に詰める金融サイトの構え
- **密度**: 高い。トップの可視テキストは 185 要素。株価パネル・銀行選択・ニュース一覧が右カラムに積み上がる
- **キーワード**: りそなグリーン、游ゴシック、Webフォント0本、em の入れ子、文字サイズ拡大

**このサイトの核心は4つある。**

1. **和文 Web フォントを 1 本も読み込まない。** `@font-face` は 5 件あるが**全部アイコンフォント**（`icon` / `icon_hd` / `icon_type2018` / `iconVer2`）で、フォントファイルの要求も 3 件すべてアイコン。本文は OS ローカルの游ゴシック体に完全に委ねている
2. **サイズをほぼ全部 `em` で書く。** `font-size` の宣言は `0.667em` / `0.778em` / `0.833em` / `0.85em` / `0.857em` / `0.889em` / `1.44em` / `1.5em` / `1.6em`。**最多のサイズ `14.004px` は 18px × 0.778 の結果**（実測 74 要素）。`16.002px`（×0.889）、`25.92px`（×1.44）、`37.008px`（×2.056）も同じ出どころ。**この入れ子が「文字サイズ拡大」機能の土台になっている**（→ 3.9 節）
3. **`letter-spacing` は 2 ページとも全要素 `normal`。** 実測 185 / 111 要素すべて。**字間を詰めも空けもしない。** `font-feature-settings` も 0 件で `palt` は使っていない
4. **`word-break: break-all` を `body` に 1 行。** 日本語の禁則処理を無効にして、行末で熟語の途中でも折り返す（→ 3.6 節）

**CSS Custom Properties は 0 個**（`styleSheetAccess.blocked = 0` / `body` 宣言も 0 で確定）。色もサイズも CSS に直値で書かれている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **りそなグリーン** | **`#008756`** | **文字色 53 要素 ＋ 塗り面 10 要素**。グローバルナビの帯、`銀行の店舗・ATM検索` ボタン、`[最新]決算・IR関連資料 一括ダウンロード` ボタン、本文中のリンク色 |
| **Search Orange** | **`#fea230`** | **検索ボタン専用**（`検 索` の 1 要素）。緑の検索バーの右端に挿す補色 |
| **Accent Orange** | `#ee6d34` | 1 要素。注意喚起系のアクセント |

> **緑は「リンクの色」と「面の色」を兼ねる。** 新規実装でリンク色を黒にしないこと。このサイトでは `#008756` がそのままリンクのシグナルになっている。

### Category Badge（ニュース種別の 4 色）

| ラベル | 面 | 文字 |
|--------|----|------|
| `お知らせ` | `#ffc174` | `#000000` |
| `商品・サービス` | `#a5dabe` | `#000000` |
| `IR` | `#b0dbea` | `#000000` |
| `更新情報` | `#f9b0c3` | `#000000` |

4 色とも **`border-radius: 5px` / `padding: 4px 3px` / `font-size: 12px` / `font-weight: 700` / 文字は黒**で揃っている。**面だけ変えて文字は黒のまま**が規則。

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 122 要素**。**このサイトは本文に純黒を使う**
- **Text Dark** (`#333333`): 検索ボタンのラベルのみ（1 要素）
- **Text on Green** (`#ffffff`): 緑面の上のテキスト（可視 8 要素）
- **Danger** (`#ff0000`): `ご注意ください` の 1 要素のみ
- **Surface Light Green** (`#f0f9f1`): ナビのドロップダウン面、下層ページの h1 帯（可視 4 要素）
- **Surface Green Tint** (`#e2f3eb`): グローバルナビの選択・ホバー面（可視 4 要素）
- **Surface Gray** (`#f7f7f7`) / **Border Gray** (`#dbdbdb`) / `#eaeaea`: 区切りと淡い面
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

### 区切り線はグラデーションで作っている

```css
/* ニュースリストの区切り（実測 10 要素） */
background: linear-gradient(#ffffff 48%, #dedede 48%, #dedede 52%, #ffffff 52%, #ffffff 100%);

/* 緑版（実測 2 要素） */
background: linear-gradient(#ffffff 48%, #008756 48%, #008756 52%, #ffffff 52%, #ffffff 100%);
```

`border-bottom` ではなく**面のハードストップ**で 4% ぶんの線を引く。`background-size` と組み合わせてリスト項目の間に敷かれている。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の書体）**: **游ゴシック体**。macOS は `游ゴシック体`、Windows は `Yu Gothic`、その後ヒラギノ → ＭＳ Ｐゴシック → メイリオへ落ちる
- **明朝体**: 使用しない（2 ページとも明朝系が可視 0 要素）
- **Web フォント**: **0 本**。読むのはアイコンフォントだけ

### 3.2 欧文フォント

- 専用の欧文フォントを持たない。数字（株価 `2,108.5`、日付 `2026年11月06日`）も**游ゴシック体の欧文グリフ**で組む
- `ＭＳ Ｐゴシック` / `MS PGothic` がチェーンに入っているが、これは古い Windows への保険

### 3.3 font-family 指定

```css
/* 全要素共通（これ1本しかない。実測 185 / 111 要素） */
font-family: 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic",
             "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
             "ＭＳ Ｐゴシック", "MS PGothic", メイリオ, sans-serif;
```

**フォールバックの考え方**:
- **和文優先。** 欧文フォントを先頭に置かない
- **ただしこのチェーンには Medium が 1 つも入っていない**（`游ゴシック Medium` / `Yu Gothic Medium` が無い）。詳細は 3.4 節

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Page Title（下層 h1）** | 游ゴシック体 | **37.008px**（= 18px × 2.056em） | 400 | 1.14 | normal | 淡緑 `#f0f9f1` の帯の上 |
| **Section Heading** | 游ゴシック体 | **26px** | 700 | 1.05 | normal | `株価情報` など |
| **Sub Heading** | 游ゴシック体 | **25.92px**（= 18px × 1.44em） | 700 | 1.44 | normal | ナビのドロップダウン見出し |
| **Body / Button** | 游ゴシック体 | **18px** | 500 / 700 | **1.75**（31.5px） | normal | **デスクトップの既定** |
| **Nav / List** | 游ゴシック体 | **14.004px**（= 18px × 0.778em） | 500 | 1.86 | normal | **最多の 74 要素** |
| **Utility** | 游ゴシック体 | 14px | 700 | 1.29 | normal | `よくあるご質問` `文字サイズ` |
| **Caption** | 游ゴシック体 | 12px | 700 | 1.50 | normal | バッジ、`情報提供：時事通信社` |

**ウェイトは 500 と 700 の 2 段だけ**（実測 500 = 109 要素 / 700 = 75 要素 / 400 = 1 要素）。

> **ただし weight 500 は 400 と同じ字面で出る。** 同一ページに隠し div を置いて `font-weight` だけ変え `getBoundingClientRect().width` を比べると、**100〜500 が 685.11px / 600〜900 が 704.55px の 2 面しかない**。游ゴシックは Regular と Bold の 2 本しか持たないため、CSS フォントマッチングで **500 → Regular、600 → Bold** に解決される。
>
> **`font-weight: 500` を書いても中太にはならない。** 中太を使いたいなら 3.3 節のチェーンに `"游ゴシック Medium", "Yu Gothic Medium"` を**追加する必要がある**（このサイトは入れていない）。

### 3.5 行間・字間

- **本文の行間**: **1.75**（`body { font-size: 18px; line-height: 1.75 }` = 31.5px）。実測 99 要素
- **リスト・ナビの行間**: **1.86**（実測 27 要素）
- **ユーティリティ**: 1.29 / 1.50
- **ボタン・ラベル**: `line-height: 1.00`（実測 37 要素）。面の中で 1 行を縦中央に置くための値
- **字間**: **`normal` 以外を一切使わない**（実測 185 / 111 要素）

> **`line-height` に絶対 px が 4 要素だけ混ざる**（`26px / 25.48px` = 0.98、`15px / 14px` = 0.93）。株価パネルとフッターのごく一部。**この 2 つを比率に直すと行が開いてレイアウトがずれる。px のまま書き写すこと。**

### 3.6 禁則処理・改行ルール

```css
body {
  word-break: break-all;   /* 実測値。日本語の禁則処理を無効にする */
}
```

- **`word-break: break-all` が `body` に当たっている。** 行末で熟語の途中でも、欧文の単語の途中でも折り返す
- 1200px のコンテンツ幅に対して情報を詰めるための選択。**右端のラギングは出ないが、読み上げと可読性は犠牲になる**
- **再現するならこの 1 行を忘れない。** 省くと行末の折り返し位置が実サイトと変わる

### 3.7 OpenType 機能

```css
/* このサイトは font-feature-settings を一切書いていない（実測 0 件） */
```

- **`palt` も `halt` も使っていない。** 全角の約物（`「」（）・`）はベタ組みのまま出る
- **親切のつもりで `palt` を足さない。** 游ゴシック体は `palt` を持つので足せば効いてしまい、既存ページと字幅が変わる

### 3.8 縦書き

```css
/* 該当なし（実測 writing-mode: vertical-* は 0 要素） */
```

### 3.9 文字サイズ拡大（アクセシビリティ機能）

ヘッダー右上に `標準` / `拡大` の 2 段のトグルがある。

```html
<li><a href="javascript:;" class="jsNormal select">標準</a></li>
<li><a href="javascript:;" class="jsEnlarge">拡大</a></li>
```

**仕掛けは `html` のクラス差し替え**（`jsFontNormal` ⇄ `jsFontLarge`）。

| | 標準 | 拡大 |
|---|---|---|
| `html` の `font-size` | **10px**（変わらない） | **10px**（変わらない） |
| `body` の `font-size` | 18px（変わらない） | 18px（変わらない） |
| `main` の `font-size` | **18px** | **24px** |

**ルートは動かさない。** CSS 側に `.jsFontLarge <セレクタ> { font-size: Npx }` を**1 つずつ手書きで並べている**（`.jsFontLarge .tabs li { font-size: 26px }`、`.jsFontLarge .catIndex .blockColumn2 figcaption { font-size: 28px }` など）。

> **この方式は取りこぼす。** 拡大したあとに実測すると、`main` は 18 → 24px に増えるのに **`p` は 12px のまま、`h2` は 26px のまま**。`em` で組んだ部分は `main` の拡大に連動するが、**px で直書きした要素は置き去りになる**。
>
> **新規実装でこの機能を作るなら、`html` の `font-size` を変えて `rem` で連動させる**（→ `rekihaku` / `smbc` の DESIGN.md が同じ機能を root 方式で実装している）。手書きで列挙する方式は、ページが増えるたびに追従漏れが出る。

---

## 4. Component Stylings

### Buttons

**Primary（緑の面）**
- Background: `#008756`
- Text: `#ffffff`
- Font Size: 18px / Weight: 700 / Line Height: 18px
- Padding: `13.5px 5px`
- Border Radius: **4px**
- Shadow: `rgba(0, 0, 0, 0.098) 0 8px 2px -5px`

**Search（オレンジの面）**
- Background: `#fea230`
- Text: `#333333`
- Font Size: 18px / Weight: 700
- Border: `1px solid #ffffff`
- Border Radius: **`0 3px 3px 0`**（左側の入力欄と合わせて 1 つの角丸を作る）

**Font Size Toggle（選択中）**
- Background: `#008756` / Text: `#ffffff` / Font Size: 14px / Weight: 700
- Padding: `5px 15px`
- Border: `1px solid #008756`
- Border Radius: **`3px 0 0 3px`**（`標準` が左、`拡大` が右で 1 つのピルを割る）

### Badges（ニュース種別）

- Background: 2 章の 4 色 / Text: `#000000`
- Font Size: 12px / Weight: 700
- Padding: `4px 3px`
- Border Radius: **5px**

### Tabs / Cards

- タブ: `border-radius: 3px 3px 0 0`（実測 6 要素）、その下のパネルが `0 0 3px 3px`（3 要素）
- カード面: `#ffffff`、区切りは 2 章のグラデーション線

---

## 5. Layout Principles

### Container

- **Max Width: 1200px**（実測 1 箇所）
- 左右の余白はコンテナ内で `padding` を持つ

### Spacing Scale

明示的なトークンは無い（CSS 変数 0 個）。実測されたボタンの padding は以下。

| 用途 | Padding |
|------|---------|
| バッジ | `4px 3px` |
| トグル | `5px 15px` |
| リンクボタン | `10.5px 10px 10.5px 5px` |
| 主要ボタン | `13.5px 5px` |

**`10.5px` / `13.5px` という半端な値は `em` 由来**（18px 基準）。px で直書きせず、元の `em` の意図（0.583em / 0.75em）を保つ。

---

## 6. Depth & Elevation

| Level | Shadow | 実測 | 用途 |
|-------|--------|------|------|
| 0 | none | 大多数 | 面・カード・バッジ |
| 1 | **`rgba(0, 0, 0, 0.098) 0 8px 2px -5px`** | **8 要素** | ボタンのみ |

> **影はこの 1 種類しかない。** しかも `spread: -5px` で下に 8px ずらした「浮き」ではなく**接地感のある薄い影**。`0 2px 4px rgba(0,0,0,.1)` のような一般的な値に置き換えないこと。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-family` はこの 1 本だけを全要素に使う**（和文・欧文・数字すべて）
- **サイズは `em` で書き、18px（モバイルは 16px）の `body` から入れ子で導く**。`14.004px` のような端数はその結果であって、px で直書きする値ではない
- **本文の `line-height` は 1.75、リストは 1.86**
- **`letter-spacing: normal` を守る**
- **`word-break: break-all` を `body` に書く**
- **リンクの文字色は `#008756`**（黒にしない）
- ニュースのバッジは**面だけ 4 色、文字は黒**
- 区切り線は `linear-gradient` のハードストップで引く
- 影はボタンの 1 種類だけ

### Don't（禁止）

- **`font-weight: 500` で中太を期待しない。** 游ゴシックは R / B の 2 本で、500 は Regular として出る。中太が要るならチェーンに `"游ゴシック Medium", "Yu Gothic Medium"` を足す
- **`font-feature-settings: "palt"` を足さない**（実測 0 件。足すと字幅が変わる）
- **`letter-spacing` を `em` で配らない**（このサイトは `normal` が設計）
- **`line-height` の `0.98` / `0.93` を比率に直さない**（`25.48px` / `14px` という絶対値が意図）
- **文字サイズ拡大を `main` の px 列挙で実装しない**（→ 3.9 節。取りこぼす）
- **CSS Custom Properties があるつもりで書かない**（実測 0 個）
- Web フォントを足さない（和文 Web フォント 0 本がこのサイトの設計）

### 実サイトの事実として知っておくこと

- **ヒーローの大きなコピー「りそなグループ統合報告書 2026」はテキストではなく画像**（`img_mv02.png` 880×495、`alt="りそなグループ統合報告書2026特設サイトへのリンク 別ウィンドウで開きます"`）。**ここを Web フォントで組み直さない**
- 株価パネルの数値は外部配信の `<img>`（`SS0071_TSE_JP_V2.gif` 186×94）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測の挙動 |
|------|-------|-----------|
| Mobile | ≤ 320px | 最小の調整（1 箇所） |
| Mobile+ | ≥ 415px / ≥ 568px | レイアウトの段階切替（1 / 10 箇所） |
| **Tablet 以下** | **≤ 896px** | **`body { font-size: 16px; line-height: 1.5625 }`**（5 箇所） |
| **Desktop** | **≥ 897px** | **`body { font-size: 18px; line-height: 1.75 }`**（4 箇所） |

### ルートと本文の実測（9 幅）

| 幅 | `html` | `body` | `body` の line-height |
|----|--------|--------|----------------------|
| 1920 / 1440 / 1200 / 1024px | **10px** | **18px** | 31.5px |
| 834 / 768 / 767 / 390 / 375px | **10px** | **16px** | 25px |

- **`html { font-size: 62.5% }` = 10px が全幅で完全固定。** 流体（`vw` / `clamp()`）は一切使っていない
- **変わるのは `body` だけで、896 / 897px を境に 18px ⇄ 16px の 2 段**
- **行間も同時に 1.75 ⇄ 1.5625 に切り替わる。** モバイルで行間を詰めるのは意図した設計
- `em` の入れ子なので、**`body` が 16px に落ちると全サイズが 8/9 に縮む**（`14.004px` → `12.448px`）

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #008756   （面・リンク・ナビ 兼用）
Search Accent: #fea230
Text Color:    #000000
Background:    #ffffff
Surface:       #f0f9f1 / #e2f3eb
Font:          游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic",
               "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
               "ＭＳ Ｐゴシック", "MS PGothic", メイリオ, sans-serif
Root:          html { font-size: 62.5% }  ← 10px 固定
Body Size:     18px（≥897px） / 16px（≤896px）
Line Height:   1.75（≥897px） / 1.5625（≤896px）
Letter Spacing: normal（全要素）
word-break:    break-all
Radius:        4px（ボタン） / 5px（バッジ） / 3px（トグル・タブ）
Shadow:        rgba(0,0,0,.098) 0 8px 2px -5px  ← これ1種のみ
Container:     1200px
Web Font:      なし（アイコンフォントのみ）
CSS Variables: なし（0個）
```

### プロンプト例

```
りそなホールディングスのデザインシステムに従って、IR 情報の一覧セクションを作成してください。

- font-family は上記 1 本のみ。Web フォントは読み込まない
- html は font-size: 62.5%（10px）に固定し、body を 18px / line-height 1.75 にする
- 各要素のサイズは px ではなく em で body から導く（例: ナビは 0.778em = 14.004px）
- letter-spacing は全要素 normal。font-feature-settings は書かない
- body に word-break: break-all を当てる
- 項目の区切り線は border ではなく linear-gradient(#ffffff 48%, #dedede 48%, #dedede 52%, #ffffff 52%) で引く
- 種別バッジは面だけ 4 色（#ffc174 / #a5dabe / #b0dbea / #f9b0c3）、文字は #000000、
  font-size 12px / weight 700 / padding 4px 3px / border-radius 5px
- 一覧下部の「一覧を見る」ボタンは背景 #008756・文字 #ffffff・18px/700・
  padding 13.5px 5px・border-radius 4px・box-shadow rgba(0,0,0,.098) 0 8px 2px -5px
- font-weight は 500 と 700 のみ使う。ただし 500 は游ゴシックでは Regular として描画される点に注意
- 896px 以下で body を 16px / line-height 1.5625 に切り替える
```
