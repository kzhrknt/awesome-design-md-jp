# DESIGN.md — 奈良国立博物館（NARA NATIONAL MUSEUM）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-26 / 対象: `https://www.narahaku.go.jp/`, `/about/greeting/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **密度を「太さ」で作る。** 字間は `normal`、`palt` も無し。代わりに**本文を含むほぼ全要素が `font-weight: 500`（Medium）**で、行間は 1.80 に固定されている。字送りをいじらずにウェイトだけ1段上げる、という珍しい設計
- **密度**: 中庸。行間 1.80 が全ページで揃っていて、見出しから注記まで同じリズムで流れる
- **キーワード**: 深緑、Medium 基調、行間 1.80 の一様さ、片側だけ大きく丸める角、マーカー風の見出し

**このサイトの核心は4つある。**

1. **ルートが 10px。** `html { font-size: 10px }`、`body { font-size: 16px }`。**`rem` は 16px 基準ではない**（`1rem = 10px`、`1.4rem = 14px`）。この前提を外すと全サイズが 1.6 倍ずれる
2. **本文ウェイトが 500。** 可視 194 要素のうち **167 要素が `font-weight: 500`**（下層 `/about/greeting/` では 60/67）。400 はわずか 10 要素。**Noto Sans JP の Regular ではなく Medium が既定**
3. **行間 1.80 が全ページで一様。** トップで 165/194、下層では **67/67 要素すべて**が `line-height: 1.8`。見出しも本文も注記も同じ
4. **字間は `normal` が既定**（実測 170/194）。例外は **`2px` / `4px` / `1px` / `3px` の px 直書きが計 24 要素だけ**で、いずれも装飾的な見出し・数字ブロック

**`font-feature-settings: "palt"` は 1 要素も無い**（実測 0 件）。CSS Custom Properties は **自社トークン 0 個**（60 個はすべて WordPress / Gutenberg 由来：`WordPress admin` 11・`WordPress / Gutenberg` 49）。**`--wp--preset--*` を設計トークンと読み違えないこと。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Nara Green** | **`#198479`** | **塗り面 26 要素 / 文字 8 要素**。ロゴパネル、`SEARCH` `MENU` の丸ボタン、選択中のタブ、`名品展` `特別展` のバッジ、下層の見出し文字 |
| **Charcoal（面）** | **`#2e2e2e`** | **塗り面 17 要素**。`見るトップ` `参加するトップ` のピル、カテゴリ導線の帯 |
| **Alert Red** | **`#e71337`** | 塗り 2 要素 ＋ 文字 2 要素。`開催中`（赤の塗り）と `開催予定`（赤の枠＋赤文字）の会期バッジ |

> **ブランド緑は CMP にも使われている。** Cookie バナー（STRIGHT by IIJ）の `すべて拒否する` `すべてのCookieを受け入れる` が `#198479` / `border-radius: 18px`。ただし**同じ緑がロゴパネル・`SEARCH` / `MENU` ボタン・タブ・展覧会バッジにも出ている**ので、CMP 由来ではなくサイトの色と判定してよい。**`18px` の角丸だけは CMP のもの**なので採用しない。

### Accent（数字・データを読ませるための色）

`奈良博を数字で知る` ブロックでだけ使われる。**通常の UI には出さない。**

- **Gold** (`#c57f23`): `館蔵品には` `国宝 13件` など所蔵数のカウント（可視 6 要素）
- **Purple** (`#6f3e8f`): `現在の館長は` `26代目` など人物のカウント（可視 5 要素）
- **Cream** (`#f2d69a`): `本日開館` の文字色（開館カレンダー上）

### Neutral（ニュートラル）

- **Text Primary** (`#323131`): 本文・見出し。**可視 64 要素**。**純黒ではなく `#323131`**
- **Text on Dark** (`#ffffff`): 緑・チャコール面の上のテキスト（可視 91 要素）
- **Text Black** (`#000000`): 一部の見出し・リンク（可視 9 要素）。`#323131` と混在している
- **Link Blue** (`#004d8a`): CMP 内のリンク（可視 2 要素）。**サイト本体のリンクは黒のまま**
- **Border** (`#707070`): `1px solid` の枠線。カード状リンク・`Language` ピル
- **Surface** (`#f5f5f5`): お知らせ・展覧会カードの面（可視 4 要素）
- **Surface Warm** (`#f9f8f4`): `参加する` `奈良博について` のブロック（可視 2 要素）
- **Surface Sand** (`#e8e3de`): `学ぶ・調べる` のブロック
- **Surface Sub** (`#f8f8f8`): 下層ページのタイトル帯
- **Marker Gray** (`#f0f0f0`): 見出しの下半分に敷く帯（下記 4. 参照）
- **Stone** (`#7a7671`): 下層の導線カード
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`。両ページとも一致）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の和文）**: **Noto Sans JP**。`@font-face` は **400 / 500 / 700 の3本立て**（可変フォントではない）。トップでは 400・500・700 が `loaded`、下層 `/about/greeting/` では **500 と 700 だけが `loaded`**（400 を使う要素がほぼ無い）
- **明朝は使わない。** ただしロゴタイプと下層ページ背景の透かし文字（`NARA NATIONAL MUSEUM`）は画像・別実装

### 3.2 欧文フォント

- **専用の欧文フォントを持たない。** `Language` `SEARCH` `MENU` `HOME` などの英字も **Noto Sans JP の欧文グリフ**をそのまま使う
- `Font Awesome`（5/6）と `slick` が `@font-face` で宣言されているが、実測した全ページで **`unloaded`**。アイコンフォントは実質使われていない

### 3.3 font-family 指定

```css
/* 本文・UI（サイト全体で1本） */
font-family: "Noto Sans JP", sans-serif;
```

**フォールバックの考え方**:
- **チェーンは2段だけ。** OS フォント（ヒラギノ・游ゴシック）の指定を持たないので、Web フォントが落ちると generic sans-serif に直行する
- **`sans-serif` 止まりを短いと感じても足さないこと。** 游ゴシックやヒラギノを挟むと、**Medium 基調（weight 500）の見え方が環境ごとに変わる**（游ゴシックは素の指定だと Light に寄る）。Noto Sans JP で 500 を配信し切るのがこのサイトの前提
- CMP（Cookie バナー）だけ `sans-serif` 単独で組まれている（可視 10 要素）。**サイト側の指定ではない**

### 3.4 文字サイズ・ウェイト階層

**ルートは 10px。** `html { font-size: 10px }` / `body { font-size: 16px }`。`rem` 換算は 10px 基準（`2.7rem = 27px`）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Page Title** | Noto Sans JP | **27px** | **700** | 1.80 (48.6px) | **2px** | `館長あいさつ` `見る展覧会`。下層では **900 を指定しているが 700 で出る**（下記参照） |
| Stat Number | Noto Sans JP | 24px | 400 | 1.80 | **4px** | `現在` `館長` `奈良博`。色は `#6f3e8f` / `#c57f23` |
| Card Title | Noto Sans JP | 18px | 700 | 1.80 (32.4px) | normal | `ナラハク仏像セレクション` `第78回 正倉院展` |
| Person | Noto Sans JP | 18px | 500 | 1.80 | normal | `館長 井上 洋一` |
| **Body** | Noto Sans JP | **16px** | **500** | **1.80** (28.8px) | **normal** | **本文。body 既定そのまま** |
| Body Lead | Noto Sans JP | 16px | 500 | **2.20** (35.2px) | normal | 展覧会の紹介文（2 要素のみ） |
| UI / Caption | Noto Sans JP | 14px | 500 | 1.80 (25.2px) | normal | 注記・ボタン内・`もっと見る`（実測 44 要素） |
| Tab | Noto Sans JP | 15px | 500 | 1.80 | normal | `すべて` `トピックス` `プレスリリース` |
| Menu Item | Noto Sans JP | 13px | 500 | 1.80 | normal | `組織・職員紹介` `ならはくボランティア` |
| Small | Noto Sans JP | 12px | 500 | 1.80 (21.6px) | normal | `Language` `閉館中` `本日開館`（実測 40 要素） |
| Building Label | Noto Sans JP | 11px | 500 | **1.00** | normal | `仏像館` `青銅器館` `東新館`（カレンダー凡例） |
| Icon Label | Noto Sans JP | 7px | 500 | 1.80 | normal | 丸ボタン内の `SEARCH` `MENU` |

**`font-weight: 900` は 700 で描画される。** 下層 `/about/greeting/` の `館長あいさつ` に `900` が当たっているが、`@font-face` は **400 / 500 / 700 の3本しか無い**。可変フォントでもないため、**ブラウザは 700 を選ぶ**。意図した重さは出ていない。**新規実装では 700 と書くこと。**

### 3.5 行間・字間

- **行間は 1.80 の一択。** トップ 165/194、下層 **67/67 要素**。見出しも本文も注記も同じ
- **例外**: `2.20`（展覧会の紹介文 2 要素）、`1.00`（カレンダー凡例 19 要素）、`1.20`（数字 2 要素）
- **字間の既定は `normal`**（実測 170/194）
- **字間を足すのは 24 要素だけ**、いずれも **px 直書き**:
  - `2px` — ページタイトル 27px（10 要素）
  - `4px` — 統計ブロックの 24px（8 要素）
  - `1px` — 小見出し `講座` `催し物`（4 要素）
  - `3px` — ロゴ周辺の `国立博物館` `114`（2 要素）

**ガイドライン**:
- **`letter-spacing` を `em` に読み替えないこと。** このサイトは px で直書きしており、サイズとの比も揃っていない（27px に 2px = 0.074em、24px に 4px = 0.167em）。**そのまま px で書く**
- **本文に字間を足さない。** 密度は weight 500 と行間 1.80 で作られている
- **`line-height: 1.8` を見出しにも適用する。** 見出しだけ 1.2〜1.3 に詰めると、このサイトの均質なリズムが崩れる

### 3.6 禁則処理・改行ルール

```css
/* 和文本文 */
line-break: strict;
overflow-wrap: break-word;
word-break: normal;
```

- 展覧会名は `名品展「ナラハク仏像セレクション　―受け継ぎ、未来へ―」` のように**鉤括弧・ダーシ・全角スペースが混じる**。`break-all` を使うと括弧が行頭に落ちるので使わない
- 行間 1.80 は 2〜4 行の見出しでも破綻しない。**見出しの折り返しを恐れて行間を詰めない**

### 3.7 OpenType 機能

```css
/* 実サイトは font-feature-settings を 1 要素も指定していない（実測 0 件） */
```

- **`palt` を使わない。** 鉤括弧の多い展覧会名でも詰めない。字間 `normal` と合わせて、Noto Sans JP の素のメトリクスをそのまま出す
- `YakuHanJP` のような約物サブセットも使っていない

### 3.8 縦書き

```css
/* 該当なし。writing-mode の指定は 0 要素 */
```

縦組みは使っていない（`typography.verticalWriting` = 0 件）。

---

## 4. Component Stylings

### Buttons

**Primary（緑のピル）**
- Background: `#198479`
- Text: `#ffffff`
- Padding: `14px 26px`
- Border Radius: **`100px`**
- Font: Noto Sans JP / 15px / **500** / `letter-spacing: normal`

**Secondary（チャコールのピル・アイコン付き）**
- Background: `#2e2e2e`
- Text: `#ffffff`
- Padding: **`10px 70px 10px 60px`**（**左右非対称。左にアイコン、右に矢印の場所を空ける**）
- Border Radius: `100px`
- Font: Noto Sans JP / 14px / 500

**Ghost（白のピル・非選択タブ）**
- Background: `#ffffff`
- Text: `#323131`
- Padding: `14px 26px`
- Border Radius: `100px`
- Border: なし

**Outline（`Language` ピル）**
- Background: `transparent`
- Border: `1px solid #707070`
- Border Radius: `100px`
- Padding: `6px 20px 8px 35px`（左に地球アイコン）
- Font: Noto Sans JP / 12px / 500

**Icon Button（丸）**
- Background: `#198479`
- Border Radius: **`100%`**
- Font: Noto Sans JP / 7px / 500（`SEARCH` `MENU` の文字を下に入れる）

### Badges

| 種類 | Background | Text | Radius | Padding | Size/Weight |
|------|-----------|------|--------|---------|-------------|
| `名品展` `特別展` | `#198479` | `#ffffff` | **`0px`** | `4px 10px` | 12px / 500 |
| `開催中` | `#e71337` | `#ffffff` | `0px` | `4px 12px` | 14px / 500 |
| `開催予定` | `#ffffff` | `#e71337` | `0px` | `4px 12px` | 14px / 500 |

> **`開催予定` の枠線は `border` ではなく `box-shadow`。** 実測値は `border: 0px solid` ＋ `box-shadow: rgb(231,19,55) 0 0 0 1px inset`。**内側 1px のリングで枠を描いている**ので、レイアウトが 1px もずれない。**この書き方を踏襲すること。**

### Cards

- Background: `#ffffff`（記事面は `#f5f5f5`）
- Border: `1px solid #707070`
- Border Radius: **`0px`**
- Padding: `18px 12px`（リンクカード）/ `11px 55px 11px 12px`（右に矢印が入るもの）
- Shadow: なし

### Section Panels — **片側だけ大きく丸める**

このサイトの角丸は「全部丸める」のではなく、**1〜2 隅だけ大きく落とす**。

| 値 | 用途 |
|----|------|
| `60px 0px 0px` | `お知らせ` セクションの面（左上だけ 60px） |
| `0px 0px 60px` | `奈良博について` のブロック（右下だけ 60px） |
| `60px 0px` | カルーセルの外枠（左上・右下） |
| `0px 0px 15px` | ロゴパネル（右下だけ 15px） |
| `100px` | ピル型ボタン（14 要素） |
| `100%` | 丸アイコンボタン（3 要素） |
| `6px` | `MENU` の小要素（4 要素） |

> **`18px` は採用しない。** Cookie バナー（STRIGHT）のボタン専用（4 要素）。

### Heading Marker — 見出しの下半分に帯を敷く

```css
/* 下層ページのセクション見出し */
background: linear-gradient(rgba(0, 0, 0, 0) 60%, rgb(240, 240, 240) 60%);
color: #198479;
font-size: 27px;
font-weight: 700;   /* 実サイトは 900 だが 700 で描画される */
letter-spacing: 2px;
line-height: 1.8;
```

**上 60% は透明、下 40% に `#f0f0f0` を敷く**という蛍光ペン風の処理。緑の見出し文字と組み合わせる。

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 実測 |
|-------|-------|------|
| XS | 1px | 区切り |
| S | **10px** | **最多の gap（7 要素）** |
| M | **12px** | gap（5 要素）。`10px 15px` の組み合わせも 5 要素 |
| L | 20px / 25px | `20px 12px`（2 要素）、`25px`（2 要素） |
| XL | 30px | セクション内 |
| XXL | 35px | セクション間 |

### Container

- Max Width: **`1080px`**（実測 7 要素で最多）
- 記事カラム: `1000px`（2 要素）
- ヘッダー・フッター: `1120px`
- 一部のワイドブロック: `1200px`
- Padding (horizontal): 20px 前後

### Grid

- Columns: 2〜4（展覧会カードは 2〜3、メニューは 4）
- Gutter: **10px / 12px**（かなり詰める）
- ロゴパネルは**グリッドの外**。ページ左上に緑の矩形として固定し、右下だけ 15px 丸める

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| **0** | **`none`** | **既定。カード・ボタン・バッジ・パネルすべて** |
| 1 | `rgb(231,19,55) 0 0 0 1px inset` | `開催予定` バッジの赤いリング（実測 2 要素）。**枠線の代用** |
| — | `rgba(0,0,0,0.5) 0 5px 15px 0` | **Cookie バナーだけ**（実測 1 要素）。サイトの部品ではない |

**このサイトは影を使わない。** 区別は「緑・チャコールの塗り」「`1px solid #707070` の枠」「`#f5f5f5` / `#f9f8f4` / `#e8e3de` の淡い面」で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **ルートを 10px にする**（`html { font-size: 10px }`）。`rem` を使うなら 10px 基準で計算する
- **本文を `font-weight: 500` で組む。** これがこのサイトの既定であり、密度の作り方そのもの
- **`line-height: 1.8` を見出しから注記まで一様に当てる**
- **字間は `normal`。** 足すときだけ px で直書きする（`2px` / `4px`）
- **本文の色は `#323131`**（純黒ではない）
- **角丸は1〜2隅だけ大きく落とす**（`60px 0 0` / `0 0 60px`）。ピルは `100px`、カードは `0px`
- **枠線が 1px のバッジは `box-shadow: inset 0 0 0 1px` で描く**（レイアウトがずれない）

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実測 0 件）
- **本文に `letter-spacing` を足さない。** 密度はウェイトで出している
- **`font-weight: 900` を書かない。** `@font-face` は 400 / 500 / 700 の3本だけで、900 は 700 で描画される。実サイトにこの誤りがあるが**真似しないこと**
- **`font-family` に游ゴシック・ヒラギノを足さない。** Medium（500）の見え方が環境ごとに変わる
- **`--wp--preset--*` を設計トークンとして読まない。** 60 個の CSS 変数はすべて WordPress / Gutenberg 由来で、**自社トークンは 0 個**
- **`border-radius: 18px` と `#004d8a` のリンク色を採用しない。** どちらも Cookie バナー（STRIGHT by IIJ）のもの
- **`box-shadow` でカードを浮かせない**
- **統計ブロックの金 `#c57f23` / 紫 `#6f3e8f` を通常の UI に持ち込まない。** 数字を読ませるためだけの色

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | ≤ 767px | `screen and (max-width: 767px)`（実測 **217 回**）。**圧倒的に主要な切替点** |
| Desktop | ≥ 767px | `screen and (min-width: 767px)`（実測 18 回） |
| Tablet（端末幅） | ≤ 1024px | `screen and (max-device-width: 1024px)`（実測 17 回）。**`device-width` である点に注意** |
| Gutenberg | ≥ 600px / ≥ 782px | `(min-width: 600px)` 8 回 / `(min-width: 782px)` 6 回。**WordPress 側の既定** |
| iPad | 834–1366px | `(min-width: 834px) and (max-width: 1366px)` |

> **`max-width: 767px` と `min-width: 767px` が併用されている**（767px ちょうどで両方に当たる）。実装時は片方を 768px に直してよい。

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。ピルボタンは `padding: 14px 26px` で満たす
- 丸アイコンボタン（`SEARCH` / `MENU`）は 56px 程度

### フォントサイズの調整

- ページタイトル 27px → モバイルで 20〜22px
- **本文 16px と `font-weight: 500`、`line-height: 1.8` は据え置く**
- 統計ブロックの 24px / `letter-spacing: 4px` はモバイルで字間を 2px に落としてよい

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Root font-size: 10px   ← 16px ではない
Primary Color:  #198479   （Nara Green）
Panel Dark:     #2e2e2e
Alert:          #e71337
Text Color:     #323131   （純黒ではない）
Background:     #ffffff
Surface:        #f5f5f5 / #f9f8f4 / #e8e3de
Border:         #707070
Font:           "Noto Sans JP", sans-serif
Body Size:      16px
Body Weight:    500        ← 400 ではない
Line Height:    1.8        ← 見出しも本文も同じ
Letter Spacing: normal
palt:           使わない
Radius:         ピル 100px / カード 0px / パネルは 1〜2隅だけ 60px
Box Shadow:     なし
Container:      1080px
```

### プロンプト例

```
奈良国立博物館のデザインシステムに従って、展覧会一覧ページを作ってください。
- html の font-size は 10px（rem は 10px 基準）
- フォントは "Noto Sans JP", sans-serif の1本。本文は 16px / font-weight: 500
- line-height は見出しから注記まで 1.8 で統一。letter-spacing は normal
- font-feature-settings: "palt" は使わない
- ブランド緑 #198479、本文色 #323131、背景 #ffffff、カード面 #f5f5f5
- 会期バッジは「開催中＝#e71337 の塗り・白文字」「開催予定＝白地に box-shadow: inset 0 0 0 1px #e71337・赤文字」、どちらも border-radius: 0
- 「もっと見る」は #2e2e2e のピル（border-radius: 100px / padding: 10px 70px 10px 60px / 14px / 500）
- セクションの面は左上だけ border-radius: 60px 0 0 で落とす
- box-shadow は使わない
- コンテナは 1080px、gap は 10〜12px
```
