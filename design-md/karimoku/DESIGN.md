# DESIGN.md — カリモク家具（karimoku）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-13 / 対象: `https://www.karimoku.co.jp/`, `/concept/index.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に**影を1つも使わない**完全フラット。角丸もほぼ持たず（`border-radius: 0` が 77 要素）、罫線と余白だけで面を仕切る。家具の写真を主役に立て、UI は徹底して引く
- **密度**: 余白が非常に大きい。セクションの `padding-top` は 60 / 90 / 120px。本文は 14px と小さく、行送りは 28px で固定
- **キーワード**: フラット、行送り固定、和欧2段、字空け、無影

**このサイトの核心は3つある。**

1. **`line-height` が font-size に関係なく `28px` 固定である。** 実測 **215 要素**が `14px / 28px`。さらに `18px / 28px`（24 要素）、`20px / 28px`（14 要素）、`24px / 28px`（10 要素）、`16px / 28px`（9 要素）、そして **`30px / 28px`（7 要素、行間が font-size より小さい）** まで同じ 28px を使う。**比率ではなく絶対値で行送りを揃える**、活版の込め物に近い設計
2. **`@font-face` で「游ゴシック」という名前そのものを上書きし、ウェイト 100〜400 をすべて Medium にマッピングしている。** Windows の游ゴシック Regular が細すぎる問題への対処で、SmartHR の `AdjustedYuGothic`・白鶴酒造の `MyYuGothicM` と**同じ目的を、別名を作らず元の名前を乗っ取る方式**で解いている（3.1 参照）
3. **セクション見出しは「欧文 + 和文」の2段組み**で、**欧文側に `letter-spacing: 0.1〜0.2em` の強い字空け**を当てる（`Support` 16px→3.2px、`Selection` 34px→3.4px、和文 30px→3px）。実測で 3px 以上の字間を持つ要素が 19 個ある

**CSS Custom Properties は 0 個。** 設計はトークンではなくクラス名に載っている。

---

## 2. Color Palette & Roles

### Neutral（このサイトの主役）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Text Primary** | **`#282828`** | **可視 108 要素で最多**。本文・見出しのすべて。純黒ではない |
| **Text Secondary** | **`#505050`** | 可視 23 要素。ナビ・補助リンク |
| Text Tertiary | `#646464` | 可視 2 要素。カードの補足 |
| Text Link (旧実装) | `#333333` | 下層ナビの一部 |
| Text on Dark | `#ffffff` | 濃面・写真上 |
| **Background** | **`#ffffff`** | ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `ua-default-canvas`。**`html` / `body` ともに塗り指定が無く、UA 既定のキャンバスが出ている**） |
| **Surface** | **`#ecebea`** | **`uniqueBackgrounds` 1 位（21 回）**。カード・選択肢の面。白との差がごく小さい温かいグレー |
| Surface Gray | `#f0f0f0` | `コーポレートサイト` ボタンの面 |
| Surface Dark | `#2c2c2c` | `オンラインショップ` ボタンの面 |
| Border | `#c8c8c8` | 枠ボタン・区切り罫（`1px solid`） |

### Accent（差し色。いずれも面積は小さい）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Brown（木の色）** | **`#725941`** | 可視テキスト 6 要素。シリーズ名（`NEIVIE（ネイビ）` 等） |
| **Green** | **`#557857`** | 可視テキスト 2 要素。`Tecnique&Quality カリモクのこだわり` の見出し |

### Badge（ニュースの分類バッジ）

| 分類 | 面色 | 文字 |
|------|------|------|
| 重要 / 新商品情報 | **`#bba685`**（砂色） | `#ffffff` |
| お知らせ | **`#a0ccc4`**（水色） | `#ffffff` |
| イベント情報 | **`#e1cc84`**（薄黄） | `#ffffff` |
| （汎用） | `#9f9b93`（グレー） | `#ffffff` |

- バッジは **`border-radius: 0` / `padding: 0 4px` / 11px** の小さな矩形。**丸めない**
- 4色とも**彩度が低く、白文字とのコントラストはぎりぎり**。小さい文字に使う前提の配色

> **`#ff0000`（純赤）が可視 1 要素にある**が、これは `弊社の偽サイトにご注意ください` という**注意喚起文の1箇所限り**。デザインシステムの色ではない。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（本文・UI）**: **游ゴシック Medium**（OS ローカル）。`@font-face` で名前を上書きして Medium を強制している
- **明朝体（見出し）**: **Noto Serif JP**（Web フォント。実測 400 / 500 / 700 が `loaded`）。商品名・特集の見出しに使う

#### Windows 游ゴシック問題への対処（このサイトの方式）

```css
/* 実サイトの宣言。100〜400 をすべて Medium に、bold を Bold に向ける */
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Medium"); font-weight: 100; }
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Medium"); font-weight: 200; }
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Medium"); font-weight: 300; }
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Medium"); font-weight: 400; }
@font-face { font-family: "Yu Gothic"; src: local("Yu Gothic Bold");   font-weight: bold; }
```

- **狙い**: Windows の游ゴシック Regular は Web 表示で細く掠れるため、Regular 相当の指定が来ても **Medium を出す**
- **方式の違い**: SmartHR は `AdjustedYuGothic`、白鶴酒造は `MyYuGothicM` という**別名を新設**して font-family の先頭に置く。カリモクは**「Yu Gothic」という名前自体を再定義**するので、`font-family` 側を書き換えずに済む
- **トレードオフ**: 別名方式と違い、**このドキュメント内のすべての `Yu Gothic` 指定に影響が及ぶ**。意図的に Regular を使いたい箇所があっても選べない
- **`src` が `local()` だけなので、游ゴシックが入っていない環境では解決しない。** 実測（macOS / headless Chrome）では `font-weight: 400` と `bold` の 2 宣言が **`status: error`**（ローカルに該当フォントが無い）となり、チェーンの次の `YuGothic` → `Hiragino Sans` に落ちていた。**Windows 向けの補正であり、Mac では効かない**ことを前提に設計すること
- 指している名前 `Yu Gothic Medium` は **Windows のフォント名**。macOS 側の PostScript 名は `YuGothic-Medium` で別（白鶴酒造はこちらを指している）

### 3.2 欧文フォント

- **Century Gothic**（OS ローカル）: **セクション見出しの英語・和欧2段の欧文側**。幾何学的サンセリフで、字空けを当てて使う
- `Font Awesome 5 Free` 900 が `loaded`（アイコン用）

> **`Noto Sans JP` は 300 / 400 / 500 / 700 の全ウェイト × 124 サブセットが `@font-face` 宣言されているが、実測ですべて `unloaded`。** 参照する要素が 1 つも無い。**設計フォントとして実装しないこと。**

### 3.3 font-family 指定

```css
/* 本文・UI（body の既定） */
font-family: "Yu Gothic", YuGothic, "Hiragino Sans", "ヒラギノ角ゴ Pro W3",
             "Hiragino Kaku Gothic Pro", メイリオ, Meiryo,
             "ＭＳ Ｐゴシック", Osaka, Arial, Verdana, sans-serif;

/* 見出し（明朝） */
font-family: "Noto Serif JP", 游明朝体, "Yu Mincho", YuMincho,
             "ヒラギノ明朝 ProN", "Hiragino Mincho ProN", serif;

/* 欧文見出し */
font-family: "Century Gothic", serif;   /* ← 実サイトの記述。3.3 の注記を読むこと */
```

**フォールバックの考え方**:
- **和文優先**。`Yu Gothic` を先頭に置き、上書きした `@font-face` を必ず経由させる
- **Windows → macOS → レガシーの順**に並べる長いチェーン。`ＭＳ Ｐゴシック` `Osaka` まで含む古い作法だが、**游ゴシック補正と組み合わさっているため実害は小さい**

> **`"Century Gothic", serif` のフォールバックは誤り。** Century Gothic はサンセリフなので、フォントが無い環境では**明朝／セリフに落ちる**。**新規実装では `"Century Gothic", "Questrial", sans-serif` と書くこと。**（このリポジトリではライオンの `Jost, serif`、白鶴酒造の `Lato, "Times New Roman"` にも同じ誤りがある）

> **下層ページに旧実装が同居している。** `/concept/index.html` の一部は `"ＭＳ Ｐゴシック", "Hiragino Kaku Gothic Pro", ...` を先頭に持ち、リンク色も `#0066cc`（UA 既定寄りの青）や `#55698a` になっている。**トップページ側が現行の設計**であり、下層の旧実装を写さないこと。

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Title (EN) | Century Gothic | 34px | 400 | 0.82 (28px) | **0.1em** (3.4px) | `Selection` 白 |
| Section Lead (JA) | Noto Serif JP | 30px | 400 | 0.93 (28px) | **0.1em** (3px) | `家具選びを様々な情報でサポートいたします。` |
| Card Title | Noto Serif JP | 24px | 700 | 1.17 (28px) | normal | `ダイニングチェア部門` |
| Product Name | Century Gothic | 20px | 700 | 1.40 (28px) | normal | `Contract Use` |
| Choice Title | Noto Serif JP | 20px | **500** | 1.40 (28px) | normal | `ソファの選び方` |
| Sub Heading | 游ゴシック | 20px | 700 | 1.40 (28px) | normal | `h4` `CT61 モデル` |
| Series Name | Century Gothic | 18px | 700 | 1.56 (28px) | normal | `NEIVIE（ネイビ）` 茶 `#725941` |
| Nav Label (JA) | 游ゴシック | 18px | 400 | 1.00 (18px) | **0.054em** (0.98px) | `WEBカタログ` |
| Button Label | 游ゴシック | 18px | 400 | 1.56 (28px) | normal | `カリモクのこだわり 一覧へ` |
| Section Label (EN) | Century Gothic | 16px | 400 | 1.75 (28px) | **0.2em** (3.2px) | `Support` **最も字間が広い** |
| **Body** | 游ゴシック | **14px** | 400 | **2.00** (28px) | normal | **本文。実測 215 要素で最多** |
| Body Bold | 游ゴシック | 14px | 700 | 2.00 (28px) | normal | `h1` `個人のお客さまサイト` |
| List Item | 游ゴシック | 14px | 400 | 1.50 (21px) | normal | 一覧項目 |
| Nav Item | 游ゴシック | 14px | 400 | 1.00 (14px) | **0.07em** (0.98px) | グローバルナビ |
| Sub Nav | 游ゴシック | 14px | 400 | 1.40 (19.6px) | 0.05em (0.7px) | `会社案内` |
| Nav Label (EN) | Century Gothic | 12px | 400 | 1.00 (12px) | **0.082em** (0.98px) | `Digital catalog` |
| Utility Nav | 游ゴシック | 12px | 400 | 1.00 (12px) | **0.06em** (0.72px) | `サステナビリティ` |
| Badge | 游ゴシック | 11px | 400 | 1.5 | normal | `重要` `お知らせ` |
| Micro | 游ゴシック | 9px | 400 | 1.20 (10.8px) | **0.07em** (0.63px) | `コーポレートサイト` |

### 3.5 行間・字間

- **行送りは `28px` の絶対値で固定する。** これがこのサイトの最大の特徴。font-size 12 / 14 / 16 / 18 / 20 / 24 / 30px のすべてが `line-height: 28px` を共有する
  - 本文 14px では **2.00**
  - 見出し 20px では 1.40、24px では 1.17
  - **30px では 0.93 と、行間が font-size を下回る**（2行以上になると字面が重なりかける。実装時は1行で収まる見出しにのみ使うこと）
- **ナビ・ラベルは `line-height` を font-size と同値**にして（12px/12px、14px/14px、18px/18px）、和欧2段を密着させる
- **字間は既定 `normal`（実測 381 要素）**。開けるのは2種類だけ
  - **セクション見出し（欧文・和文とも）: 0.1〜0.2em**（3〜3.6px）
  - **ナビ・小さいラベル: 0.05〜0.08em**（0.63〜0.98px）

**ガイドライン**:
- **行送り 28px は「本文 14px に対する 2.0」から来ている。** 本文サイズを変えるならこの基準値ごと引き直すこと。28px だけ残すと大きい見出しで破綻する
- **小さい文字ほど字間を開ける**（9px で 0.07em、12px で 0.06〜0.08em）。游ゴシックの小級数が潰れるのを防ぐ処置
- **`letter-spacing` は px に解決されて継承される。** `0.98px` が 14px・18px の両方に出るのは、14px 基準の `0.07em` が子へ px のまま渡っているため

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- ソース中に **タブと改行がそのまま残っている**（`Contract Use\n\t\t\t\t業務用家具`）。和欧2段の見出しは HTML の改行で組まれており、`white-space` に依存しない書き方になっている
- 2段見出しは **`<span>` を2つ並べて `display: block`** にする実装。1つの要素に `<br>` で押し込まない

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* このサイトでは使用しない */
font-feature-settings: normal;
```

- **`palt` は実測 0 件。** 字詰めは一切していない
- 字面の調整は **`letter-spacing` を開く方向**でのみ行う。詰める処理は入れない

### 3.8 縦書き

**使用しない**（実測 0 件）。すべて横組み。

---

## 4. Component Stylings

### Buttons

**Outline（このサイトの基本形）**
- Background: `#ffffff`
- Text: `#282828`
- Border: **`1px solid #c8c8c8`**
- Border Radius: **`0`**
- Padding: `15px 10px`（見出し付きは `30px 10px 15px`）
- Font Size: 18px / Weight 400
- Shadow: **なし**
- 例: `カリモクのこだわり 一覧へ` `その他の家具を探す` `オンラインショップで探す`

**Surface（淡い面のボタン）**
- Background: **`#ecebea`**
- Text: `#282828`
- Border: `1px solid #ffffff`
- Border Radius: `0`
- Padding: `10px`（選択肢は `5px`）
- Font Size: 18〜20px / Weight 400〜500
- 例: `このモデルのページを見る` `ソファの選び方` `テレビボードの選び方`

**Solid Dark（オンラインショップ）**
- Background: `#2c2c2c` / Text: `#ffffff` / Border Radius: **`3px`** / Font Size: 9px

**Solid Gray（コーポレートサイト）**
- Background: `#f0f0f0` / Text: `#282828` / Border Radius: **`3px`** / Font Size: 9px

**Wide Solid（全幅の誘導）**
- Background: `#9f9b93` / Text: `#ffffff` / Border Radius: `0` / Padding: `20px 10px` / Font Size: 18px
- 例: `お近くのショールーム・ギャラリーを探す`

### Badges

- Border Radius: **`0`** / Padding: **`0 4px`** / Font Size: **11px** / Text: `#ffffff`
- 面色は 2. の Badge 表を参照

### Carousel Controls

- Background: `#999397`（グレー）または `#99b49b`（緑）
- Border Radius: **`100px`**（サイト中で唯一の完全な丸）
- **これ以外に pill / 丸を使わない**

### Cards

- Background: `#ffffff` または `#ecebea`
- Border: 罫線のみ（`1px solid #c8c8c8`）
- Border Radius: **`0`**
- **Shadow: なし**
- 写真 → 見出し（Noto Serif JP）→ 本文（游ゴシック 14px / 28px）の順

---

## 5. Layout Principles

### Spacing Scale

`padding-top` の実測分布から、**20 / 40 / 50 / 60 / 65 / 70 / 75 / 90 / 120px** が使われている。

| Token | Value | 用途 |
|-------|-------|------|
| S | 20px | ブロック内の間隔 |
| M | 40px | 小セクション間 |
| **L** | **60px** | **セクション間（実測 10 要素で最多）** |
| **XL** | **90px** | **大セクション間（6 要素）** |
| XXL | 120px | ページ上部・最大の区切り |

- **28px の行送りと 60 / 90 / 120px の余白**は、いずれも 28〜30px 系の倍数に近い。行送りを基準に余白を積む設計

### Container

| Width | 用途 |
|-------|------|
| **1200px** | 標準コンテナ（実測 13 要素） |
| 1040px | 本文ブロック |
| 740 / 640 / 600px | 記事カラム・カード |

- ビューポート幅いっぱい（1440px）の帯を敷き、その中で 1200px に絞る構成

### Grid

- カードは 2〜4 カラム
- **`gap` プロパティの使用は実測 0 件。** レイアウトは `margin` / `padding` と float 系の旧来手法で組まれている。新規実装では `gap` を使ってよいが、値は 20 / 40 / 60px に合わせること

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| **0** | **`none`** | **すべての要素** |

- **`box-shadow` の実測は 0 件。サイト全体で影を1つも使っていない。**
- 階層は **罫線（`1px solid #c8c8c8`）と面色（`#ffffff` / `#ecebea`）の差**だけで表現する
- **モーダル・ドロップダウンにも影を付けない。** 浮かせたいときは面色を変えるか罫を引く

---

## 7. Do's and Don'ts

### Do（推奨）

- **`line-height` は `28px` の絶対値で統一する**（本文 14px に対する 2.0 が基準）
- **`border-radius: 0` を既定にする。** 丸めるのはカルーセルの操作ボタン（`100px`）と極小のユーティリティボタン（`3px`）だけ
- **`box-shadow` を使わない。** 階層は罫線と面色で作る
- **セクション見出しは「欧文 + 和文」の2段**で組み、欧文側に `letter-spacing: 0.1〜0.2em` を当てる
- **小さい文字（9〜12px）には `letter-spacing: 0.06〜0.08em`** を入れて潰れを防ぐ
- **游ゴシックは `@font-face` で Medium にマッピングしてから使う**（3.1 の宣言をそのまま採用してよい）
- 見出しには **Noto Serif JP（明朝）**、本文には游ゴシックと、書体で役割を分ける
- 本文色は純黒ではなく **`#282828`**

### Don't（禁止）

- **`box-shadow` を足さない。** 1箇所でも入れるとこのサイトの質感から外れる
- **カードやボタンを角丸にしない**（`border-radius: 0` が既定）
- **`font-size: 30px` に `line-height: 28px` をそのまま流用しない。** 実サイトにはこの組み合わせがあるが、2行になると字面が重なる。**新規実装では 30px 以上の見出しに `line-height: 1.3` 程度を別途当てること**
- **`"Century Gothic", serif` と書かない**（サンセリフにセリフのフォールバックは誤り）。`"Century Gothic", "Questrial", sans-serif` とする
- **`Noto Sans JP` を実装しない**（宣言はあるが実測ですべて `unloaded`）
- **`/concept/` 系の旧実装（`ＭＳ Ｐゴシック` 先頭・`#0066cc` のリンク）を写さない**
- バッジを丸めない（`border-radius: 0` / `padding: 0 4px`）
- `#ff0000` を設計色として使わない（注意喚起の1箇所限り）
- **`font-feature-settings: "palt"` を足さない**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム、グローバルナビはドロワー |
| Tablet | ≤ 1199px | コンテナ 1200px → 100% |
| Desktop | ≥ 1200px | コンテナ 1200px |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- **ユーティリティボタン（9px / `border-radius: 3px`）は実サイトでタッチ基準を下回る。** モバイルでは 12px 以上に拡大し、タップ領域を 44px 確保すること

### フォントサイズの調整

- 本文 14px は据え置き（`line-height: 28px` も維持）
- セクション見出し 30〜34px → モバイルでは 20〜24px。**このとき `letter-spacing` は 0.1em のまま比率で維持する**（px 固定で持ち込まない）
- 和欧2段の見出しは、モバイルでも2段を崩さない

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text Primary:   #282828   (純黒は使わない)
Text Secondary: #505050
Background:     #ffffff
Surface:        #ecebea
Border:         #c8c8c8
Accent (Brown): #725941
Accent (Green): #557857

Font (本文・UI): "Yu Gothic", YuGothic, "Hiragino Sans", sans-serif
                 ※ @font-face で 100〜400 を local("Yu Gothic Medium") に上書きする
Font (見出し):   "Noto Serif JP", 游明朝体, "Yu Mincho", serif
Font (欧文):     "Century Gothic", "Questrial", sans-serif

Body Size:      14px
Line Height:    28px （絶対値。全サイズ共通）
Letter Spacing: normal（既定）/ 0.1〜0.2em（セクション見出し）/ 0.06〜0.08em（9〜12px）
palt:           使わない
Border Radius:  0   （カルーセル操作のみ 100px、極小ボタンのみ 3px）
Shadow:         なし（サイト全体で 0 件）
Container:      1200px
Section Gap:    60px / 90px / 120px
```

### プロンプト例

```
カリモク家具のデザインシステムに従って、商品一覧ページを作成してください。

- 背景は白、カードの面は #ecebea、罫線は 1px solid #c8c8c8
- 本文色は #282828、補助テキストは #505050
- 本文は "Yu Gothic" 系 14px / line-height: 28px（絶対値）
- @font-face で "Yu Gothic" の font-weight 100〜400 を local("Yu Gothic Medium") に向ける
- 商品名の見出しは "Noto Serif JP"（明朝）20〜24px / line-height: 28px
- セクション見出しは英語（"Century Gothic", "Questrial", sans-serif / 16px / letter-spacing: 0.2em）と
  日本語（Noto Serif JP / 30px / letter-spacing: 0.1em）の2段で組む。ただし 30px には line-height: 1.3 を当てる
- box-shadow は一切使わない。border-radius は 0
- ボタンは白地 + 1px solid #c8c8c8 + padding: 15px 10px + 18px、角丸なし
- バッジは border-radius: 0 / padding: 0 4px / 11px / 白文字、面色は #bba685（重要）#a0ccc4（お知らせ）#e1cc84（イベント）
- セクション間の余白は 60px / 90px、コンテナは 1200px
- font-feature-settings: "palt" は使わない
```
