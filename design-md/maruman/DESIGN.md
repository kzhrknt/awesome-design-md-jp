# DESIGN.md — マルマン（Maruman）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-24 / 対象: `https://www.e-maruman.co.jp/`, `https://www.e-maruman.co.jp/policy/paper/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **太字を使わない。** 可視 126 要素のうち `font-weight: 700` は **1 要素だけ**。階層は「サイズ」と「0.06em の字空け」だけでつくる、紙の会社らしい静かな誌面
- **密度**: 低い。コンテナ 1300px、本文の行間は **2.00**（16px / 32px）。余白で読ませる
- **キーワード**: 游ゴシック体、**ウェイト 400 一本**、**見出しは 0.06em の字空け**、墨 `#231815`、黄 `#f8b500`、**角丸ゼロ**

**このサイトの核心は5つある。**

1. **ウェイトが 1 段しかない。** トップ 126 要素中 **400 が 125 / 700 が 1**、下層 61 要素中 **400 が 60 / 700 が 1**。**「太字で強調する」という手段を持っていない**サイト
2. **代わりに `letter-spacing: 0.06em` で見出しをつくる。** 16px→0.96px、18px→1.08px、24px→1.44px、26px→1.56px、30px→1.8px、32px→1.92px、34px→2.04px、36px→2.16px。**サイズに比例して px が変わる＝ `em` を各要素に当てている**
3. **本文の字間は `normal`。** 可視 126 要素中 95 要素が `normal`。**字空けは見出しと欧文ラベル専用**
4. **`@font-face` の `MyYuGothicM` が実測環境で解決していない。** `src: local("YuGothic-Medium")` の 1 名だけを指定しており、`document.fonts` は **status `error`**、`document.fonts.check('16px MyYuGothicM')` は **false**。実際に描画されるのは次点の `YuGothic`
5. **角丸をほぼ使わない。** CTA は `border-radius: 0`。丸いのは円形のドット（`50%`）と、ヘッダー右上の 1 つのピル（`40px`）だけ

> **文字色は `#231815`。** 純黒ではなく、印刷のスミに近い暖かい黒。**紙の会社が選んだ黒**として扱う。

---

## 2. Color Palette & Roles

**色は 4 つしかない。**

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Ink（本文・見出し・ナビ）** | **`#231815`** | **文字 76 要素（トップ）/ 54 要素（下層）**。印刷のスミに近い暖色寄りの黒 |
| **Brand Yellow** | **`#f8b500`** | 文字 11 要素 / 面 3 要素。欧文ラベル（`PICK UP` / `SCROLL` / `STATIONERY ARTICLE`）、検索ボタン、CMP の「同意」、下層の見出し |
| Ink（純黒） | `#000000` | 文字 15 要素。カテゴリ名・シーン名の見出し、アウトライン CTA の枠と文字 |
| Text Muted | `#999999` | 文字 20 要素。日付、タグ、パンくず |
| Surface | `#f7f7f7` | 面 7 要素。ニュース・サイトマップ帯の下地 |
| Surface（半透明） | `rgba(247, 248, 249, 0.8)` | 面 4 要素。シーンカードのオーバーレイ |
| Divider | `#eeeeee` | 面 1 要素。フッター上の区切り |
| Dot（非アクティブ） | `#cccccc` | 面 6 要素。カルーセルのページャ |
| Alert | `#ff0000` | 面 1 要素。ニュースの「NEW」丸バッジ |
| Background | `#ffffff` | ページ背景 |

> **黄 `#f8b500` と純黒 `#000000` と墨 `#231815` の 3 つが役割で分かれている。**
> - 墨 `#231815` … 本文・ナビ・ほとんどの文字
> - 純黒 `#000000` … **「カテゴリから探す」「シーンから探す」の見出しと、アウトライン CTA の枠**
> - 黄 `#f8b500` … **欧文ラベルと、面を塗る 3 箇所だけ**
>
> **和文の見出しに黄色を使わない**（下層の `紙へのこだわり` が唯一の例外で 1 要素）。

---

## 3. Typography Rules

### 3.1 和文フォント

**游ゴシック体。ただし `@font-face` の別名が解決していない。**

`document.fonts` の実測:

| family | weight | status |
|--------|--------|--------|
| **MyYuGothicM** | **normal** | **error** |
| **MyYuGothicM** | **bold** | **error** |
| Montserrat | 400 | **loaded** |
| Montserrat | 400 | unloaded（重複宣言） |
| FontAwesome | normal | unloaded |

宣言はこうなっている。

```css
@font-face { font-family: MyYuGothicM; font-weight: normal; src: local("YuGothic-Medium"); }
@font-face { font-family: MyYuGothicM; font-weight: bold;   src: local("YuGothic-Bold"); }
```

> **`src` に `local()` を 1 名しか書いていない。** 一般的な別名方式は `local("YuGothic-Medium"), local("Yu Gothic Medium"), local("YuGothic-Regular")` と複数書いて環境差を吸収するが、ここは 1 名のみ。
> **実測（macOS / Chrome）では両方 `error`。`document.fonts.check('16px MyYuGothicM')` も `false`。** つまり `MyYuGothicM` は当たらず、**スタックの次点 `YuGothic` が描画に使われている**。
> **再現するときは「意図＝ Windows で游ゴシック Medium を当てる」「実態＝落ちたら YuGothic（Regular）」の両方を把握しておくこと。** 別名方式を新規に書くなら `local()` を複数並べる。

### 3.2 欧文フォント

**Montserrat（400 のみ）。** 可視 126 要素中 15 要素。

用途は**欧文ラベル専用**: `SCROLL` / `PICK UP` / `STATIONERY ARTICLE` / `WRITE` / `DRAW` / `STUDY` / `WORK` / `VIEW MORE` / `FOLLOW US` / `NEW`。

> **本文や和文見出しには使わない。** 和文の隣に置く「小さな英字ラベル」だけを Montserrat にして、**そこに 0.06em の字空けを掛ける**のがこのサイトの型。

### 3.3 font-family 指定

```css
/* 本文・見出し・ナビ */
body {
  font-family: MyYuGothicM, YuGothic, -apple-system, "system-ui",
               "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
}

/* 欧文ラベル */
.en-label { font-family: Montserrat, sans-serif; }
```

**順序の意味**

| 位置 | 名前 | 当たる環境 |
|------|------|-----------|
| 1 | **`MyYuGothicM`** | **`@font-face` の別名（Windows の游ゴシックを Medium で当てる意図）。実測では解決せず** |
| 2 | **`YuGothic`** | **macOS の游ゴシック体（Regular）。実測ではここが当たっている** |
| 3–4 | -apple-system / system-ui | Apple 系の保険 |
| 5 | ヒラギノ角ゴ ProN | 游ゴシック非搭載の macOS |
| 6 | Meiryo | 旧 Windows |

> **Windows の游ゴシック問題を「別名 `@font-face`」で解こうとしている流儀。** このリポジトリの収録例では SmartHR（`AdjustedYuGothic`）・白鶴酒造（同じく `MyYuGothicM`）と同型。
> **ただし本例は `local()` が 1 名しかないため落ちやすい。** 新規実装で真似るなら:
> ```css
> @font-face {
>   font-family: MyYuGothicM; font-weight: normal;
>   src: local("YuGothic-Medium"), local("Yu Gothic Medium"), local("YuGothic-Regular");
> }
> ```

### 3.4 文字サイズ・ウェイト階層

**`html { font-size: 10px }`。`rem` は 10px 基準。**

| 役割 | Font | size | weight | line-height | letter-spacing |
|------|------|------|--------|-------------|----------------|
| ページ見出し（下層 h1） | 游ゴシック | 36px | **400** | 1.60 | 2.16px（**0.06em**） |
| セクション見出し | 游ゴシック | 36px | **400** | 1.60 | 2.16px（**0.06em**） |
| パンくずの親（下層） | 游ゴシック | 34px | **400** | 1.60 | 2.04px（**0.06em**） |
| 中見出し | 游ゴシック | 30px | **400** | 1.60 | 1.8px（**0.06em**） |
| カテゴリ見出し | 游ゴシック | 26px | **400** | 1.60 | 1.56px（**0.06em**） |
| リード文 | 游ゴシック | 20px | **400** | 2.00 | normal |
| CTA・記事見出し | 游ゴシック | 18px | **400** | 1.50 | 1.08px（**0.06em**） |
| **本文** | **游ゴシック** | **16px** | **400** | **32px（2.00）** | **normal** |
| ナビ（グローバル） | 游ゴシック | 16px | **400** | 1.00 | normal |
| 欧文ラベル | **Montserrat** | 16px | **400** | 2.00 | 0.96px（**0.06em**） |
| 補助テキスト・日付 | 游ゴシック | 14px | **400** | 2.00 | normal |
| シーンラベル（小） | 游ゴシック | 12px | **400** | 1.60 | normal |
| ヘッダーの小文字 | 游ゴシック | 10px | **400** | 1.20 | normal |
| **唯一の 700** | 游ゴシック | 20px / 36px | **700** | 1.60 | 0.06em |

**サイズの分布（トップ・可視 126 要素）**: 16px(52) → 14px(26) → 12px(12) → 26px(10) → 18px(7) → 36px(6)

**ウェイトの分布**

| ページ | 400 | 700 |
|--------|-----|-----|
| トップ | **125** | **1** |
| 下層（紙へのこだわり） | **60** | **1** |

> **このサイトは太字で階層をつくらない。**
> 700 はトップで「紙を手がけて 100 年あまり。…」のリード 1 要素、下層で「紙へのこだわり」の見出し 1 要素だけ。**例外であって規則ではない。**
> **見出しを目立たせる手段は 2 つ ——「サイズを上げる」と「`letter-spacing: 0.06em` を掛ける」。**
> **500 / 600 は 1 要素も無い。** 中間ウェイトを新規に持ち込まないこと。
> なお `MyYuGothicM` の `bold` 面（`local("YuGothic-Bold")`）も `error` なので、**仮に 700 を書いても意図した太さでは出ない**（YuGothic の Bold か合成太字になる）。

### 3.5 行間・字間

**本文の行間は 2.00。** 16px に対して 32px（`rem` 基準 10px なので `3.2rem`）。

| 比率 | 出現（トップ） | 用途 |
|------|------|------|
| **2.00** | **68** | **本文**、補助テキスト、欧文ラベル |
| 1.60 | 30 | 見出し（26px 以上） |
| 1.00 | 10 | グローバルナビ |
| 1.50 | 5 | 記事カードの見出し |
| 1.20 | 3 | ヘッダー右上のピル、パンくず |

**字間は「本文 `normal` / 見出し・欧文ラベル 0.06em」の 2 値。**

実測（トップ・可視 126 要素）:

| 値 | 出現 | サイズ | em 換算 |
|----|------|--------|---------|
| **`normal`** | **95** | 本文・ナビ・補助テキスト | — |
| 1.44px | 13 | 24px | **0.06em** |
| 1.56px | 10 | 26px | **0.06em** |
| 0.96px | 5 | 16px | **0.06em** |
| 1.08px | 2 | 18px | **0.06em** |
| 2.16px | 1 | 36px | **0.06em** |

下層（可視 61 要素）:

| 値 | 出現 | サイズ | em 換算 |
|----|------|--------|---------|
| **`normal`** | **52** | 本文 | — |
| 1.8px | 6 | 30px | **0.06em** |
| 1.92px | 1 | 32px | **0.06em** |
| 2.04px | 1 | 34px | **0.06em** |
| 2.16px | 1 | 36px | **0.06em** |

> **どのサイズでも 0.06em に揃う ＝ `em` を各要素に当てている。** body に 1 回書いて継承させる設計ではない。
> **見出しと欧文ラベルには `letter-spacing: 0.06em` を書き、本文には書かない。**

```css
/* 本文 — 字間は触らない */
body { font-size: 1.6rem; line-height: 3.2rem; letter-spacing: normal; } /* = 16px / 32px, html は 10px */

/* 見出し・欧文ラベル — 各要素に 0.06em */
.heading, .en-label { letter-spacing: 0.06em; }
```

> **補足**: 隠れているドロップダウン内の項目に `letter-spacing: -0.31em`（16px で -4.96px）が当たっている要素があるが、**これは `display: none` のメニューで可視ではない**。再現しないこと。

### 3.6 禁則処理・改行ルール

実サイトは `word-break` / `line-break` を明示していない（ブラウザ既定）。**新規実装では以下を推奨する。**

```css
word-break: normal;
overflow-wrap: anywhere;
line-break: strict;
```

**禁則対象**
- 行頭禁止: `）」』】〕〉》、。，．・：；？！ー々ゃゅょっ`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* このサイトは font-feature-settings を一切指定していない */
font-feature-settings: normal;
```

- **`palt` は 0 要素。** 可視 126 要素すべてが `normal`
- 約物を詰めず、**逆に 0.06em で開く**方向に振っている。詰めと開きを同時にやらない
- **`palt` を足さないこと。** 足すと見出しの字面が締まって、このサイトの「ゆるい」印象が消える

### 3.8 縦書き

```css
/* 該当なし */
```

`writing-mode: vertical-rl` は 0 要素。**横組みのみ。**

---

## 4. Component Stylings

### Buttons

**Primary（黄ボタン・角丸なし）**

- Background: `#f8b500`
- Text: `#ffffff`
- Border: 1px solid `#f8b500`
- **Border Radius: `0px`**
- Font Size: 18px / Weight: **400** / Line Height: 27px / Letter Spacing: normal

**Secondary（アウトライン・角丸なし）**

- Background: `transparent`
- Text: `#000000`
- Border: 1px solid `#000000`
- **Border Radius: `0px`**
- Padding: `0px 10px`（小）
- Font Size: 18px（大）/ 12px（小）/ Weight: **400**

**ヘッダー右上のピル（唯一の角丸ボタン）**

- Background: `#999999`
- Text: `#ffffff`
- Border Radius: `40px`
- Padding: `6px 20px`
- Font Size: 14px / Weight: 400 / Line Height: 16.8px

> **CTA を丸くしないこと。** radius が付くのはヘッダー右上の 1 つだけで、それ以外は角のままか円（`50%`）。

### Badges / Chips

**NEW バッジ（円形）**

- Background: `#ff0000` / Text: `#ffffff`
- Border Radius: `50%`
- Font: **Montserrat** 16px / 400 / letter-spacing 0.96px（0.06em）

**カルーセルのページャ**

- 非アクティブ: `#cccccc` / アクティブ: `#f8b500`
- Border Radius: `50%`

### Inputs

実サイトの可視領域に入力欄は無い（検索はアイコンから展開）。**新規実装では下記に揃える。**

- Background: `#ffffff`
- Border: 1px solid `#cccccc`
- Border (focus): 1px solid `#231815`
- **Border Radius: `0px`**（このサイトの流儀に合わせる）
- Padding: `10px 14px`
- Font Size: 16px
- Height: 44px

### Cards

- Background: `#ffffff`（帯の中は `#f7f7f7`）
- Border: なし
- **Border Radius: `0px`**
- Padding: 0（画像＋テキストを縦に積むだけ）
- Shadow: **なし**
- シーンカードのオーバーレイ: `rgba(247, 248, 249, 0.8)` / `rgba(255, 255, 255, 0.8)`

---

## 5. Layout Principles

### Spacing Scale

`rem` が 10px 基準なので、値は 10 の倍数に寄っている。

| Token | Value | `rem` 表記 |
|-------|-------|-----------|
| XS | 6px | 0.6rem |
| S | 10px | 1rem |
| M | 20px | 2rem |
| L | 40px | 4rem |
| XL | 80px | 8rem |
| XXL | 120px | 12rem |

### Container

- Max Width: **1300px**（本文セクション・6 箇所）
- Max Width（全幅寄りのセクション）: **1500px**（3 箇所）
- Padding (horizontal): 20px

### Grid

- Columns: 4（カテゴリ）/ 4（シーン）/ 3（記事カード）
- Gutter: 20px

---

## 6. Depth & Elevation

**影を使わない。**

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|------|
| 0 | `none` | **ほぼすべての要素** | 可視 126 要素中 125 |
| 1 | `0 5px 10px -10px rgba(0,0,0,0.3)` | フッター上の `FOLLOW US` 帯 | 1 要素 |

> **唯一の影は spread が `-10px`** なので、実際にはほとんど見えない。**このサイトは「影で階層をつくらない」。**
> カード・ボタン・モーダルに影を足さないこと。面の分離は `#f7f7f7` の帯と余白でやる。

---

## 7. Do's and Don'ts

### Do（推奨）

- `html { font-size: 10px }` を前提に `rem` を計算する（`1.6rem = 16px`）
- 本文は **16px / line-height 32px（2.00）/ letter-spacing normal / color `#231815`**
- **見出しと欧文ラベルには `letter-spacing: 0.06em` を各要素に書く**
- **ウェイトは 400 だけで組む。** 階層はサイズ（16 → 18 → 26 → 30 → 36px）と字空けでつくる
- 欧文ラベル（`PICK UP` / `VIEW MORE` など）は Montserrat 400 ＋ 0.06em
- CTA は**角丸なし**（`border-radius: 0`）
- 黄 `#f8b500` は欧文ラベルと面 3 箇所だけに使う
- `@font-face` の別名方式を使うなら `local()` を複数並べる

### Don't（禁止）

- **`font-weight: 700` を見出しに使わない。** 実サイトは 1 ページに 1 要素だけ。しかも `MyYuGothicM` の bold 面は `error` で、意図した太さでは出ない
- **`font-weight: 500` / `600` を持ち込まない**（0 要素）
- 本文に `letter-spacing` を足さない（95 / 126 要素が `normal`）
- `font-feature-settings: "palt"` を足さない（0 要素）
- **CTA・カードに角丸を付けない**（radius が付くのはヘッダーのピル 1 つと円形のドットだけ）
- 影を足さない（実質 0）
- 文字色に `#000000` を使わない（本文は `#231815`。純黒はカテゴリ見出しとアウトライン CTA の枠だけ）
- `rem` を 16px 基準で換算しない
- CSS 変数があるつもりで書かない（**このサイトの変数は 0 個**）

---

## 8. Responsive Behavior

### Breakpoints

実測されたメディアクエリ（件数順）:

| Name | 条件 | 出現 |
|------|------|------|
| **Mobile** | **`screen and (max-width: 767px)`** | **288** |
| **Tablet** | **`screen and (max-width: 1024px)`** | **143** |
| Container | `screen and (max-width: 1300px)` | 3 |
| Mobile（別記法） | `screen and (max-width: 768px)` | 2 |
| IE 互換 | `(-ms-high-contrast: none)` | 1 |
| Print | `print` | 1 |

> **すべて `max-width`。デスクトップファーストで、狭い方を上書きしていく書き方。**
> 主たる分岐は **1024px（タブレット）と 767px（モバイル）の 2 本**。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1〜2 カラム。コンテナは左右 20px パディング |
| Tablet | ≤ 1024px | 2〜3 カラム |
| Desktop | > 1024px | 4 カラム。コンテナ 1300px（一部 1500px） |

### タッチターゲット

- 最小サイズ: 44px × 44px
- ヘッダー右上のピルは高さ 28.8px（14px × 1.2 ＋ padding 6px×2）。**モバイルでは高さを 44px に引き上げること**

### フォントサイズの調整

- 本文 16px はモバイルでも据え置き
- 見出し 36px → モバイルでは 24〜26px 程度に縮める
- **`letter-spacing: 0.06em` は `em` なのでサイズに追従する。書き直す必要はない**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Ink (text):   #231815   （本文・ナビ。純黒ではない）
Black:        #000000   （カテゴリ見出し・アウトライン CTA の枠）
Brand Yellow: #f8b500   （欧文ラベル・面 3 箇所）
Text Muted:   #999999
Surface:      #f7f7f7
Background:   #ffffff
Font (和文): MyYuGothicM, YuGothic, -apple-system, "system-ui",
             "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
Font (欧文ラベル): Montserrat, sans-serif
Root Font Size: 10px      ← rem は 10px 基準
Body Size: 16px
Line Height: 2.00 (32px)
Body Letter Spacing: normal
Heading Letter Spacing: 0.06em （各要素に書く）
Weights: 400 のみ（700 は 1 ページに 1 要素の例外）
Border Radius: 0（CTA・カードとも）
Shadow: なし
```

### プロンプト例

```
マルマンのデザインシステムに従って、製品カテゴリ一覧ページを作成してください。

- html の font-size は 10px。rem はすべて 10px 基準で計算すること
- 和文フォント: MyYuGothicM, YuGothic, -apple-system, "system-ui",
  "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
- font-weight は 400 だけを使う。太字（700・600・500）は使わない。
  見出しは font-size を上げ、letter-spacing: 0.06em を各要素に書いて目立たせる
- 本文: 16px / line-height 32px / letter-spacing normal / color #231815
- 見出し: 26px・30px・36px のいずれか / 400 / line-height 1.6 / 0.06em
- 欧文の小ラベル（PICK UP / VIEW MORE など）は Montserrat 400 + 0.06em、
  色は #f8b500
- CTA は border-radius: 0。黄ボタンは背景 #f8b500 + 白文字、
  アウトラインは 1px solid #000000 + 黒文字（背景なし）
- box-shadow は使わない。面の分離は #f7f7f7 の帯と余白でつくる
- font-feature-settings（palt）は指定しない
- コンテナ 1300px、ブレークポイントは max-width: 1024px と max-width: 767px
```
