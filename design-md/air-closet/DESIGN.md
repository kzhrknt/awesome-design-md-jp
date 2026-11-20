# DESIGN.md — エアークローゼット（airCloset）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-20 / 対象: `https://www.air-closet.com/`, `/fashion-type-diagnosis/guide/`, `/style-book/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **モバイルの設計図を 1 枚だけ持ち、`html` の `font-size` で拡大縮小する。** デスクトップでも中身は 680px の 1 カラムで、375px のレイアウトをそのまま 1.8 倍に引き伸ばしている
- **密度**: 低い。1 画面に 1 メッセージ。本文が 25.2px（デスクトップ実測）という大きさで、縦に長く読ませる LP 型
- **キーワード**: 680px の 1 カラム、root 18px、游明朝の見出し、ピル型の赤 CTA、字間 normal

**このサイトの核心は 4 つある。**

1. **`html { font-size: 18px }`（680px 以上）と `html { font-size: 2.67vw }`（680px 未満）の 2 段だけ。** サイズ・余白・角丸・ギャップがすべて `rem` で書かれているので、**ルート 1 行で全体が等比に伸び縮みする**。375px で root は 10.0125px になり、18 / 10.0125 = **1.798 倍**。デスクトップは「375px の設計を 1.8 倍にしたもの」だと読んでよい
2. **和文 Web フォントを 2 ファミリー宣言しているのに、1 バイトも落ちてこない。** `document.fonts` には Noto Sans JP が 4 ウェイト × 124 サブセット、Noto Serif JP が 4 ウェイト × 124 サブセット並ぶが、**実測で `loaded` は Inter 400 と Inter 600 の 2 本だけ**。フォントファイルのリクエストも **1 件（Inter）**。理由は 3.3 のとおり**スタックの 4 番目**にあって到達しないから
3. **実際に和文を描画しているのは OS 同梱フォント。** CDP の `CSS.getPlatformFontsForNode` で実測すると、本文は **`Hiragino Kaku Gothic Pro`**（スタック 2 番目）、ヒーローの見出し「プロが選ぶ、コーデが届く。」は **`YuMincho`**（スタック 1 番目）
4. **`letter-spacing: normal` が可視 229 要素中 229 要素。** 字間を 1 箇所も触っていない。`font-feature-settings` も 0 件、縦組みも 0 件

**CSS Custom Properties は実質 0 個**（total 2・両方 Swiper の既定値、自社トークン 0）。値はすべて CSS に直書きされている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **airCloset Red** | **`#bf0c0c`** | **面 16 要素・文字 19 要素**。`無料診断を始める` の CTA、ログインリンク |
| **Brown** | **`#6a4509`** | **文字 50 要素**（セクション見出し、`01` `02` `03` の連番）。面としても 2 要素（`無料` バッジ） |
| **Gold** | **`#cb9e3d`** | 面 3 要素。`more / もっと知りたい！` の丸ボタン |

### Semantic（意味的な色）

- **Success / OK** (`#81c6af`): 比較表の `OK`（可視 3 要素）
- **Danger / NG** (`#d96a84`): 比較表の `NG`（可視 3 要素）
- **Warning**: このサイトには存在しない。注意喚起は `#bf0c0c` の赤で代用する

### Neutral（ニュートラル）

- **Text Primary** (`#151309`): 本文。**可視 98 要素で最多**。純黒ではなく**わずかに黄みを帯びた黒**
- **Text Tag** (`#755726`): `#コンサバ` `#カジュアル` などのタグ文字（可視 14 要素）
- **Text Muted** (`#9d9178`): 注釈・`Point01` などのラベル（可視 13 要素）
- **Text Sub** (`#333333`): サロン紹介ブロックだけで使う本文色（可視 5 要素）
- **Background** (`#f5f5f4`): ページ背景。**面 23 要素で最多**
- **Surface Cream** (`#f8f3e7`): 強調ブロックの面（5 要素）
- **Surface Gray** (`#e3e2dd`): 比較表・ステップ表の面（5 要素）
- **Surface Light** (`#ececea`): 「4つのポイント」ブロックの面（1 要素）
- **Text on Dark** (`#ffffff`): 赤 CTA・ヒーロー写真上のテキスト（可視 21 要素）

> **純黒 `#000000` は 2 要素しか無い**（画像上の見出し 2 箇所）。**本文色に `#000000` を使わない。** 既定は `#151309`。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **ヒラギノ角ゴ Pro**（macOS で実際に描画される書体。CDP 実測で `Hiragino Kaku Gothic Pro`）。Windows では游ゴシック、その次にメイリオ
- **明朝体**: **游明朝（YuMincho）**。ヒーローの見出し・リード文だけで使う（可視 3 要素）
- **Web フォントは和文を 1 本も使っていない。** Noto Sans JP / Noto Serif JP は宣言されているが、スタックの 4 番目にあるため到達せず、全サブセットが `unloaded`

### 3.2 欧文フォント

- **サンセリフ**: **Inter**（Google Fonts。400 と 600 の 2 ウェイトだけが `loaded`）。数字の強調（`50` `300` `01`）とバッジに使う
- **セリフ**: 欧文セリフは使っていない
- **等幅**: 使っていない

### 3.3 font-family 指定

```css
/* 本文（実サイトの宣言そのまま） */
font-family: "Noto Sans", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
             "Noto Sans JP", "游ゴシック体", "Yu Gothic", YuGothic, "メイリオ", "Meiryo";

/* 数字・バッジ（Inter を先頭に差し替えただけで、後ろは同じ） */
font-family: "Inter", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
             "Noto Sans JP", "游ゴシック体", "Yu Gothic", YuGothic, "メイリオ", "Meiryo";

/* 見出し・リード（明朝） */
font-family: "YuMincho", "Yu Mincho", "Hiragino Mincho ProN",
             "Noto Serif JP", "Times New Roman", "Times", "serif";
```

**フォールバックの考え方 — このスタックは 2 箇所で壊れている。両方書く。**

1. **先頭の `"Noto Sans"` は存在しない名前。** `@font-face` にも `document.fonts` にも `Noto Sans` は 1 件も無い（読み込んでいるのは `Noto Sans JP` / `Noto Serif JP` / `Inter` の 3 つ）。**必ず外れて 2 番目のヒラギノ角ゴ Pro に落ちる**。欧文も和文も同じ書体で出る
2. **`"Noto Sans JP"` / `"Noto Serif JP"` は 4 番目にあり、到達しない。** 1〜3 番目（ヒラギノ／游ゴシック／游明朝／ヒラギノ明朝）は macOS・Windows のどちらかに必ず存在するので、**Noto まで降りる端末がほぼ無い**。結果、Google Fonts から和文を取得しているつもりで**実際のフォント要求は Inter の 1 件だけ**

**正しくはこう書く**（この DESIGN.md を参照して新規実装するとき）:

```css
/* 死んだ別名を外し、Web フォントを使いたいなら 2 番目に置く */
font-family: "Noto Sans JP", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
             "游ゴシック体", "Yu Gothic", YuGothic, sans-serif;
```

- 最後に generic family（`sans-serif` / `serif`）を必ず置く。実サイトの本文スタックは **generic family で終わっていない**
- 明朝スタックの末尾 `"serif"` は**引用符付き**で書かれている。引用符を付けると「`serif` という名前のフォント」を探す指定になり受け皿が死ぬ。**`serif` は裸で書く**

### 3.4 文字サイズ・ウェイト階層

**すべて `rem` 換算。1rem = 18px（680px 以上）。**

| 用途 | 実測値（1440px） | rem | weight | 実測件数 |
|------|------|------|--------|------|
| ヒーロー見出し（明朝） | **66.6px** | 3.7rem | 600 | 1 |
| 連番（`01` `02` `03`） | **115.2px** | 6.4rem | 600 | 4 |
| 数字の強調（`50` `300`） | 57.6px | 3.2rem | 600 | 11 |
| 中見出し | 43.2px | 2.4rem | 600〜700 | 8 |
| 小見出し | 36px | 2rem | 600 | **39** |
| CTA ラベル | 28.8px | 1.6rem | 600 | **47** |
| **本文** | **25.2px** | **1.4rem** | 400 | **75（最多）** |
| タグ | 23.04px | 1.28rem | 600 | 14 |
| 補助テキスト | 21.6px | 1.2rem | 400〜500 | 14 |
| 規約リンク | 15px | — | 500 | 7 |

**ウェイトは 600 が既定（可視 161 要素）。** 400 が 46、700 が 15、500 が 6、900 が 1。

> **描画される太さは 2 段しか無い。** 実体の `Hiragino Kaku Gothic Pro` は **W3 と W6 の 2 本**なので、**400 → W3 / 600 → W6** が素直に当たり、**700 と 900 は W6 からブラウザが合成した偽の太字**になる。**700 を使わず 600 で止める。**

### 3.5 行間・字間

| 用途 | line-height | 実測件数 |
|------|------------|------|
| **既定** | **1.50** | **188（可視 229 中）** |
| 見出し・明朝のリード | 1.40 | 21 |
| タグ | 1.35 | 14 |
| `Point01` ラベル | 3.50 | 4 |

- **`letter-spacing` は `normal` が 229 / 229 要素。** 字間を 1 箇所も宣言していない
- `line-height` は**すべて無単位の比率**。`em` 宣言も px 固定も無い（比率 1.00 未満が 1 件も出ない）
- **本文の 1.50 は、25.2px に対して 37.8px。** 和文としては詰まり気味だが、1 行の文字数が少ない（680px に 25.2px なので 1 行 27 字前後）ので成立している

### 3.6 禁則処理・改行ルール

- `word-break` の宣言なし（ブラウザ既定の `normal`）。**`break-all` も `auto-phrase` も使っていない**
- 改行は `<br>` で手で入れている（`プロが選ぶ、` / `コーデが届く。` のように読点で割る）
- `text-align` は中央揃えが基本。**680px の狭いカラムなので、和文の中央揃えでも行頭が揃って見える**

### 3.7 OpenType 機能

- **`font-feature-settings` は 0 要素。** `palt` も `halt` も使っていない
- 実体がヒラギノ角ゴ Pro なので `palt` を足せば効いてしまう。**足すと既存ページと別物になるので足さない**
- 数字は Inter で組むため、和文の約物とは別の字送りになる。ここに `tnum` 等を足す必要はない（実サイトは 0 件）

### 3.8 縦書き

- **`writing-mode: vertical-rl` は 0 要素。** このサイトに縦組みは存在しない
- ヒーローの大きな明朝も横組み。**縦組みを足さない**

---

## 4. Component Stylings

**`border-radius` も `rem` で書かれている。1rem = 18px。**

### Buttons

**Primary（`無料診断を始める`）**
- Background: **`#bf0c0c`**
- Text: `#ffffff`
- Border: **`3px solid #bf0c0c`**（面と同色の枠。押下時に枠だけ残す設計）
- Border Radius: **`144px`（= 8rem・完全なピル）**
- Font: 28.8px（1.6rem） / weight 600 / line-height 1.50
- Shadow: なし

**Secondary（`もっと知りたい！`）**
- Background: **`#cb9e3d`**
- Text: `#ffffff`
- Border Radius: `180px`（= 10rem）
- Padding: `7.2px 18px`

**Text（`登録・診断済みの方はログイン`）**
- Background: なし / Text: **`#bf0c0c`** / 下線あり
- Font: 21.6px（1.2rem） / weight 500

### Badges / Chips

**Tag（`#コンサバ` `#カジュアル` `#クール`）**
- Background: `#ffffff` / Text: **`#755726`**
- Border Radius: **`162px`（= 9rem）**
- Padding: `5.76px 18px`（= 0.32rem 1rem）
- Font: 23.04px（1.28rem） / weight 600

**Badge（`無料`）**
- Background: **`#6a4509`** / Text: `#ffffff`
- Padding: `7.2px 18px`（= 0.4rem 1rem）

**Stat Pill（`廃棄物排出量27％削減`）**
- Background: **`rgba(255, 255, 255, 0.8)`**（写真の上に半透明の白）
- Border Radius: `180px`
- 可視 3 要素

### Inputs

- ログインは外部ボタン（`メールでログイン` / `LINEでログイン` / `Appleでサインイン`）に寄せており、**トップページに素の `input` が無い**
- ボタンの Padding は `0px 16px` / `0px 5px`、Border は `0px solid rgba(118, 118, 118, 0.3)`

### Cards

**Plan Card（料金プラン）**
- Background: `#ffffff`
- Border Radius: **`28.8px`（= 1.6rem）**
- Shadow: **`0 3px 6px rgba(106, 69, 9, 0.16)`**（影の色が**ブラウン `#6a4509`**。黒ではない）
- 可視 6 要素

**Voice Card（利用者の声）**
- Border Radius: `14.4px`（= 0.8rem）
- Shadow: **`0 5.4px 10.8px rgba(106, 69, 9, 0.16)`**（= 0.3rem 0.6rem。**影のぼかし半径まで rem**）
- 可視 4 要素

**Compare Cell（比較表）**
- Background: `#e3e2dd` / Border Radius: `7.2px`（= 0.4rem）

**Section（上だけ角丸）**
- Border Radius: **`28.8px 28.8px 0px 0px`**（可視 3 要素。セクションの頭だけ丸める）

---

## 5. Layout Principles

### Spacing Scale

**すべて `rem`（1rem = 18px）。**

| Token | Value | rem | 用途 |
|-------|-------|-----|------|
| XS | 9px | 0.5rem | アイコンと文字の間（gap 6 要素） |
| S | 18px | 1rem | チップ内側の左右 |
| M | 21.6px | 1.2rem | カード間の gap（6 要素） |
| L | 27px | 1.5rem | ブロック間の gap |

### Container

- **Max Width: 680px**（実測 3 要素。**デスクトップでもこの幅から広がらない**）
- ページ背景 `#f5f5f4` が左右に残り、中央に 680px の白いカラムが立つ
- **ヒーロー写真も 680px 幅**（`fv_01_2026aw_autumn.png` は 1360×2418px＝680px の 2 倍。**縦に長い 1:1.78 の縦位置写真**）

### Grid

- 基本は 1 カラム。横に並ぶのは比較表（2 列）とプランカード（3 列）だけ
- **グリッドではなく縦積み。** `grid-template-columns` は `1fr 1fr` が 1 箇所（診断ページ）のみ

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。** CTA・タグ・バッジはすべてフラット |
| 1 | **`0 3px 6px rgba(106, 69, 9, 0.16)`** | プランカード（可視 6 要素） |
| 2 | **`0 5.4px 10.8px rgba(106, 69, 9, 0.16)`** | 利用者の声カード（可視 4 要素） |
| 3 | `0 0 20px rgba(0, 0, 0, 0.1)` | ヒーロー直下の追従ブロック（1 要素のみ） |

> **影の色が黒ではなくブランドのブラウン `#6a4509` の 16%。** `rgba(0,0,0,0.16)` に丸めると面の印象が変わる。**そのまま書き写すこと。**
> Level 2 の `5.4px` / `10.8px` は 0.3rem / 0.6rem。**影のオフセットとぼかしまで rem スケールに乗っている。**

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 18px }`（≥680px）／`2.67vw`（<680px）を再現する。** サイズ・余白・角丸・影をすべて `rem` で書けば、この 1 行で全体が追従する
- **コンテナは 680px で止める。** デスクトップでも横に広げない
- **本文は 25.2px（1.4rem）/ line-height 1.50 / weight 400**
- **見出しは游明朝（`YuMincho` 先頭）、本文はヒラギノ角ゴ Pro**（宣言は `"Noto Sans"` 始まりだが実体はこれ）
- **`letter-spacing: normal` を貫く**
- **角丸はピル（`144px` / `162px` / `180px`）か、`28.8px` / `14.4px` / `7.2px`** の 3 段
- 影の色は **`rgba(106, 69, 9, 0.16)`**（ブランドブラウン）
- 本文色は **`#151309`**、見出しとラベルは `#6a4509`
- CTA は **`#bf0c0c` ＋ 3px の同色枠 ＋ `border-radius: 144px`**

### Don't（禁止）

- **`font-weight: 700` / `900` を使わない。** 実体のヒラギノ角ゴ Pro は W3 / W6 の 2 本しか無く、**700 以上は合成太字**になる。太字は **600** で止める
- **`font-family` の先頭に `"Noto Sans"` を書かない。** このサイトでは存在しない名前で、必ず外れる（真似すると意図が伝わらない）
- **Noto Sans JP / Noto Serif JP を前提に組まない。** 宣言はあるが**全サブセットが `unloaded`**、フォント要求は Inter の 1 件だけ
- **generic family を引用符で囲まない**（実サイトは `"serif"` と書いており、末尾の受け皿が死んでいる）
- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素。足すと字詰めが変わる）
- **`letter-spacing` を足さない**（実サイトは 229 / 229 要素が `normal`）
- **`writing-mode: vertical-rl` を使わない**（0 要素）
- **影を黒にしない**（`rgba(0,0,0,.16)` ではなく `rgba(106,69,9,.16)`）
- **本文色を `#000000` にしない**（実サイトは `#151309`）
- **px を直書きしない。** ルートが 680px 未満で `2.67vw` に切り替わるため、**px で書いた箇所だけがモバイルで追従しなくなる**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Root switch** | **680px** | **`html` が `18px` 固定 → `2.67vw` に切り替わる唯一の境目** |
| Tablet | ≤ 823px / ≤ 820px | 一部ブロックの並び替え |
| Mobile | ≤ 480px / ≤ 375px | 細部の調整 |
| Hover | `(hover: hover) and (pointer: fine)` | ホバー演出の出し分け |

**ルートの実測（幅 → `html` の `font-size`）**

| 幅 | `html` | 式 |
|---|---|---|
| 1920 / 1440 / 1200 / 992 / 834 / 768 / **680px** | **18px** | `font-size: 18px` |
| **679px** | **18.1293px** | `font-size: 2.67vw` |
| 480px | 12.816px | 〃 |
| 414px | 11.0538px | 〃 |
| 375px | **10.0125px** | 〃 |
| 320px | 8.544px | 〃 |

> **680 → 679px で 18 → 18.1293px と、わずかに上へ跳ねる**（+0.7%）。`2.67vw` が 18px に一致するのは 674.2px なので、`min-width: 680px` の切り替え点と式の交点が 6px ずれている。**崖というより段差で、見た目の破綻は無い。**
> **18 / 10.0125 = 1.798。** デスクトップ（≥680px）は **375px の設計を 1.8 倍に拡大したもの**として読む。

### タッチターゲット

- CTA は 28.8px の文字に `144px` のピル、タグは `5.76px 18px` の padding。375px 換算でも 44px を満たす
- 規約リンク（15px・**px 直書き**）だけはルートに追従しない。**モバイルでも 15px のまま**なので、タップ領域を別途確保すること

### フォントサイズの調整

- **メディアクエリでの `font-size` 調整は無い。** すべて `rem` 経由でルートに追従する
- **例外は px 直書きの 15px（規約リンク）と 14px（コピーライト）の 2 箇所だけ**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Red:   #bf0c0c
Brown:       #6a4509
Gold:        #cb9e3d
Text:        #151309
Tag Text:    #755726
Muted:       #9d9178
Background:  #f5f5f4
Surface:     #f8f3e7 / #e3e2dd / #ececea
OK / NG:     #81c6af / #d96a84

Root: html { font-size: 18px }  /* ≥680px */
      html { font-size: 2.67vw } /* <680px */
Container: 680px（デスクトップでも広げない）

Font (本文): "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic, sans-serif
Font (見出し): YuMincho, "Yu Mincho", "Hiragino Mincho ProN", serif
Font (数字): Inter

Body Size: 25.2px (1.4rem) / weight 400
Line Height: 1.50（既定） / 1.40（見出し）
Letter Spacing: normal（例外なし）
Weight: 400 と 600 の 2 段だけ（700 以上は使わない）
Border Radius: 144px / 162px / 180px（ピル）, 28.8px, 14.4px, 7.2px
Shadow: 0 3px 6px rgba(106,69,9,.16) / 0 5.4px 10.8px rgba(106,69,9,.16)
```

### プロンプト例

```
airCloset のデザインシステムに従って、サービス紹介の LP を作成してください。
- html { font-size: 18px } を 680px 以上、html { font-size: 2.67vw } を 680px 未満に当てる
- サイズ・余白・角丸・影はすべて rem で書く（px 直書きしない）
- コンテナは max-width: 680px で中央寄せ、外側の地色は #f5f5f4
- 本文は 1.4rem / line-height 1.50 / weight 400 / color #151309
- 見出しは font-family: YuMincho, "Yu Mincho", "Hiragino Mincho ProN", serif で 3.7rem / weight 600 / line-height 1.40
- 本文のフォントは "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic, sans-serif
- 数字の強調だけ Inter（3.2rem / weight 600）
- letter-spacing は全要素 normal、font-feature-settings は書かない
- font-weight は 400 と 600 だけ使う（700 以上は合成太字になるので禁止）
- CTA は背景 #bf0c0c / 文字 #ffffff / border 3px solid #bf0c0c / border-radius 144px / 1.6rem weight 600
- タグは背景 #ffffff / 文字 #755726 / border-radius 162px / padding 0.32rem 1rem
- カードは border-radius 1.6rem、影は 0 3px 6px rgba(106,69,9,.16)
```
