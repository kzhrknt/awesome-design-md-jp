# DESIGN.md — 森ビル（Mori Building）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-03 / 対象: `https://www.mori.co.jp/`, `/business/`, `/company/profile/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **色を持たない。** 有彩色は「もっと見る」のリンク青1色だけで、UI はすべて**黒の不透明度（`rgba(0,0,0,0.05)` / `0.8`）**で組む。写真と映像に色を全部預け、インターフェースは無彩色で退く
- **密度**: 文字サイズが **10 / 12 / 14 / 16 / 18 / 21 / 24px の7段しかなく**、最大でも 24px。巨大な見出しを使わずに、写真の面積で階層をつける建築的な設計
- **キーワード**: モノクローム、モリサワ、小さな文字、角丸3px、写真主役

**このサイトの核心は3つある。**

1. **書体がすべてモリサワの Web フォント。** 本文＝**中ゴシックBBB Pr6 M**、見出し・ラベル＝**見出ゴ MB31 Pr6**、欧文＝**Univers Next Pro**、そして特別な一言だけ**リュウミン Pr6 M**（明朝）。**4書体を役割で厳密に使い分けている**
2. **`font-feature-settings: "palt"` が body から全体に効いている**（実測 537要素）。CSS 中の宣言はわずか3箇所で、継承でサイト全体に行き渡る
3. **`letter-spacing: -0.02em` を body（14px）に一度だけ宣言し、computed `-0.28px` が全要素に継承される**。**子要素の font-size が何であっても -0.28px 固定**（実測 566要素）

**CSS Custom Properties は実質存在しない**（3個のうち2個は Swiper の既定値）。設計はトークンではなく **`font s_21 w_b` `block-item round` `button-round` のようなユーティリティ／BEM 風クラス名**に載っている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

**このサイトにブランドカラーと呼べる有彩色は存在しない。** UI の「色」は黒と白の不透明度で作る。

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Surface（淡い面）** | **`rgba(0, 0, 0, 0.05)`** | **可視 77要素で最多**。カード・リスト項目・「もっと見る」の面 |
| **Filled Button（濃い面）** | **`rgba(0, 0, 0, 0.8)`** | 可視 11要素。塗りボタン（「ニュースリリース一覧」「会社情報」「事業内容」） |
| Glass（写真の上の面） | `rgba(255, 255, 255, 0.5)` | 可視 10要素。写真に重ねる半透明の白 |
| Glass Light | `rgba(255, 255, 255, 0.2)` | 可視 9要素 |
| Scrim | `rgba(0, 0, 0, 0.3)` / `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)` | 写真下端のテキスト可読性確保 |

### Accent（唯一の有彩色）

- **Link Blue** (`#296acc`): 「HILLS LIFE」の見出しと一部のリンクのみ。**可視 8要素**。CSS 全文でも 1 回しか出ない
- **Pale Blue** (`rgba(162, 195, 245, 0.3)`): 1要素のみのハイライト面

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文。**可視 422要素**。**このサイトは本文に純黒を使う**
- **Text on Dark** (`#ffffff`): 可視 138要素
- **Text Secondary** (`#515252`): 「企業情報」見出し、英字ラベル（可視 6要素）
- **Gray** (`#9fa0a0`): 罫線・区切り（可視 4要素。CSS 全文で 23回）
- **Gray Light** (`#e2e3e3`): 下層ページの背景面（`/business/` のページ背景）
- **Background** (`#ffffff`): ページ背景（実測 `viewportTopBySample 12/12` で確定）

> **本文に `#333333` を使わないこと。** 実サイトは純黒 `#000000`。一般的な「日本語本文に純黒は避ける」定石とは逆で、これがこのブランドの硬質さを作っている。

---

## 3. Typography Rules

### 3.1 和文フォント

すべて **Morisawa Fonts（MFW）の Web フォント**。バリアブル（ウェイト軸 1–1000）で配信されている。

- **ゴシック体（本文）**: **中ゴシックBBB Pr6 M** — `MFW-GothicBBBPr6-Medium`（実測 474要素）
- **ゴシック体（見出し・ラベル）**: **見出ゴ MB31 Pr6** — `MFW-MidashiGoPr6-MB31`（実測 69要素）
- **明朝体（特別な一言のみ）**: **リュウミン Pr6 M** — `MFW-RoHMinchoPro-Md`（実測 3要素）。`MFW-RoHMinchoPro-Lt`（L）も宣言されているが未使用

### 3.2 欧文フォント

- **サンセリフ**: **Univers Next Pro**（`UniversNextPro-Bold` 23要素 / `UniversNextPro-Regular` 3要素）
- 「OUR STORY」「HILLS LIFE」「TOPICS」「Our Businesses」「JA / EN」「©Copyright」など、**欧文はすべて Univers**。和文書体の欧文グリフを使わない

### 3.3 font-family 指定 — 4本のスタックを役割で使い分ける

```css
/* (A) 本文・リンク・ナビ（既定） */
font-family: MFW-GothicBBBPr6-Medium, sans-serif;

/* (B) 見出し・ラベル・ボタン文言・カードタイトル */
font-family: MFW-MidashiGoPr6-MB31, sans-serif;

/* (C) 欧文（英字見出し・言語切替・コピーライト） */
font-family: UniversNextPro-Bold, sans-serif;
font-family: UniversNextPro-Regular, sans-serif;

/* (D) 明朝アクセント — 「森ビルの想い」のような標語のみ */
font-family: YakuHanMP, MFW-RoHMinchoPro-Md, serif;

/* 入力欄のみ OS 依存スタック */
font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", sans-serif;
```

**フォールバックの考え方**:
- 和文・欧文を**書体で分けず、役割で分ける**。同じ「見出し」でも和文なら (B)、英字なら (C)
- **(D) の先頭 `YakuHanMP` は約物半角用の従属フォント**。`（「』` などの括弧・句読点だけを半角幅で拾い、それ以外は後続のリュウミンに落ちる。**明朝の標語を組むときはこの2段構成を必ず維持する**
- Morisawa Fonts はドメインライセンスのため、ローカルの再現には代替書体が必要（下記 3.9 参照）

### 3.4 文字サイズ・ウェイト階層

**サイズは 10 / 12 / 14 / 16 / 18 / 21 / 24px の7段のみ。** `font s_21` のようなユーティリティクラスで指定される。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | (B) 見出ゴ | 24px | 400 | 1.28 (30.72px) | -0.28px | 下層ページの表題 |
| Section Title (EN) | (C) Univers Bold | 21px | 400 | 1.73 (36.33px) | -0.28px | 「OUR STORY」「HILLS LIFE」 |
| Section Title (JP) | (D) リュウミン | 21px | 400 | 1.78 (37.38px) | **1.47px** | 「森ビルの想い」— 明朝の標語 |
| Section Label | (B) 見出ゴ | 21px | 400 | 1.7 (35.7px) | -0.28px | 「企業情報」（`#515252`） |
| Card Title | (B) 見出ゴ | 18px | 600 | 1.28 (23.04px) | -0.28px | ニュース見出し |
| Date | (A) 中ゴ | 18px | 400 | 1.28 (23.04px) | -0.28px | 「2026/06/12」 |
| Body | (A) 中ゴ | **16px** | 400 | **1.7 (27.2px)** | -0.28px | 本文 |
| List Title | (B) 見出ゴ | 16px | 400 | 1.28 (20.48px) | -0.28px | カード内タイトル |
| Body (nav 既定) | (A) 中ゴ | **14px** | 400 | **1.0 (14px)** | -0.28px | ナビ・フッターの器 |
| Label | (B) 見出ゴ | 14px | 400 | 1.28 (17.92px) | -0.28px | ボタン文言・キャプション |
| Button Label | (B) 見出ゴ | 14px | 700 | 1.28 (17.92px) | -0.28px | 塗りボタンの文言 |
| Label (EN) | (C) Univers Bold | 14px | 400 | 1.73 (24.22px) | -0.28px | 「TOPICS」 |
| Label (EN小) | (C) Univers Reg | 14px | 400 | 1.37 (19.18px) | **1.36px** | 「Our Businesses」 |
| Nav Item | (B) 見出ゴ | 12px | 400 | 1.7 (20.4px) | -0.28px | グローバルナビ |
| Caption | (A) 中ゴ | 12px | 400 | 1.28 (15.36px) | -0.28px | 補足 |
| Micro | (C) Univers | 10px | 400 | 1.73 (17.3px) | -0.28px / 0.3px | 「JA / EN」「©Copyright」 |

**ウェイトは実測で 400 / 600 / 700 の3段。既定は 400。** モリサワのバリアブルフォント（軸 1–1000）を使っているため、`font-weight` を指定しなくても書体そのものの太さ（中ゴ＝M、見出ゴ＝MB31）で階層がつく。**「見出しだから bold」ではなく「見出しだから見出ゴ」という設計。**

### 3.5 行間・字間 — このサイト最大の特徴

```css
/* body に一度だけ宣言される */
body {
  font-size: 14px;
  letter-spacing: -0.02em;        /* → computed: -0.28px */
  font-feature-settings: "palt";
}
```

**`-0.02em` は body の 14px で `-0.28px` に解決され、その computed 値が全要素に継承される。** つまり:

| 要素の font-size | 実効 letter-spacing | em 換算 |
|------------------|---------------------|---------|
| 10px | -0.28px | **-0.028em** |
| 14px | -0.28px | -0.02em |
| 16px | -0.28px | -0.0175em |
| 21px | -0.28px | -0.0133em |
| 24px | -0.28px | **-0.0117em** |

**大きい文字ほど相対的な詰めが弱くなる。** これは意図的というより CSS の継承（`letter-spacing` は em ではなく計算後の px が継承される）の帰結だが、**実サイトの見た目はこの値なので、実装時も `-0.28px` を固定値で当てるのが正しい**。子要素ごとに `-0.02em` を再宣言すると別物になる。

**例外は2つだけ**（どちらも「広げる」方向）:
- **明朝の標語**（リュウミン 21px）: `letter-spacing: 1.47px`（= 0.07em）— **ゆったり開く**
- **欧文の小ラベル**（Univers Regular 14px）: `letter-spacing: 1.36px`（≒ 0.097em）— トラッキングを効かせた英字

**行間は 1.28 と 1.7 の2値**に集約される。

- **1.28**: 見出し・ラベル・カードタイトル（詰める）
- **1.7**: 本文・英字見出し・ナビ（開く）
- **1.0**: ナビ／フッターの「器」要素（14px で `line-height: 14px`）。中身の実テキストは 1.28 か 1.7 を持つ

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- カードタイトルは `-webkit-line-clamp: 2` で2行に切り詰める（`.line-clamp-2`）
- 施設名「虎ノ門ヒルズ」「麻布台ヒルズ」は途中で折らない
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
body { font-feature-settings: "palt"; }
```

- **`palt` が body から全体に継承される**（実測 537要素）。**このサイトは本文にも palt を効かせている**
- ただし `<button>` など一部のフォーム要素は UA スタイルで `normal` に戻る（実測でも button 系は `normal`）。**再宣言して揃える必要はない**
- `kern` の明示指定はなし

### 3.8 縦書き

該当なし。全要素 `horizontal-tb`。

### 3.9 ローカル再現のための代替フォント

Morisawa Fonts はドメインライセンスのため、`preview.html` 等のローカル環境では表示されない。**提供元の設計思想が近い書体で代替する**。

| 実サイト | 役割 | Google Fonts 代替 |
|----------|------|-------------------|
| MFW-GothicBBBPr6-Medium（中ゴシックBBB M） | 本文 | **Noto Sans JP 400** |
| MFW-MidashiGoPr6-MB31（見出ゴ MB31） | 見出し・ラベル | **Noto Sans JP 700** |
| MFW-RoHMinchoPro-Md（リュウミン M） | 明朝アクセント | **Shippori Mincho** または Noto Serif JP 400 |
| UniversNextPro-Bold / Regular | 欧文 | **Inter** 700 / 400（グロテスク系で骨格が近い） |

---

## 4. Component Stylings

### Buttons

角丸は **`3px` が基本**。ピルは「タグ」だけに使う。

**Filled（塗りボタン）**
- Background: `rgba(0, 0, 0, 0.8)`
- Text: `#ffffff`
- Padding: `20px`（大）/ `15px`（標準）
- Border Radius: `3px`
- Font: 16px / 700（大）または 14px / 400（標準）/ 見出ゴ
- Border: なし

**Tonal（淡い面のボタン）**
- Background: `rgba(0, 0, 0, 0.05)`
- Text: `#000000`
- Padding: `15px`
- Border Radius: `3px`（リスト内では `0px`）
- Font: 14px / 400 / 中ゴ

**Ghost（枠なし・面なしのナビボタン）**
- Background: `#ffffff`
- Text: `#000000`
- Padding: `10px 30px`
- Border Radius: `3px`
- Font: 14px / 400

**Circle Arrow（写真上の丸い矢印）**
- Background: `#ffffff`
- Border Radius: `50%`
- 直径 約72px、中央に `>` アイコン
- 写真セクションへの導線に使う。**このサイトの主要な CTA 形式**

### Tags

- Background: `#ffffff`
- Text: `#000000`
- Border Radius: **`100px`（ピル）**
- Padding: `9px 20px`
- Font: 16px / 600 / 見出ゴ
- 例: 「受賞関連」「虎ノ門ヒルズ」（プレスリリースの絞り込み）

### Cards

- Background: `#ffffff` または `rgba(0, 0, 0, 0.05)`
- Border Radius: `3px`（`box-round`）/ `5px`（画像コンテナ）
- Border: なし
- Shadow: 既定は `none`。浮かせる場合のみ `0 0 32px rgba(0,0,0,0.1)`
- 写真の上に文字を載せる場合は下端にグラデーションのスクリムを敷く

### Dropdown / Bottom Rounded

- Border Radius: `0px 0px 3px 3px`（実測 8要素）— ヘッダーから降りてくるメニュー

### Inputs

サイト内に一般的なフォームは検索欄のみ。

- Font: `"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", sans-serif`（**ここだけ OS 依存スタック**）
- Font Size: 16px
- Text: `#000000`
- Letter Spacing: -0.28px（継承）

---

## 5. Layout Principles

### Container

- **Max Width: 1140px**（実測で最頻出。`/company/profile/` で12回）
- **本文カラム: 741px**（記事・会社概要の読み物幅。実測40回）
- 全幅セクション: 1440px（viewport 幅いっぱい）
- 中間幅: 1240px / 1340px

> **本文を 741px に絞るのがこのサイトの読み物設計。** 16px / line-height 1.7 で1行あたり約44文字になり、日本語の可読上限に収まる。

### Border Radius Scale

| 用途 | 値 |
|------|-----|
| 既定（カード・ボタン・パネル） | **3px** |
| 画像コンテナ | 5px |
| ドロップダウン下端 | `0 0 3px 3px` |
| タグ | 100px（ピル） |
| 丸アイコン・丸矢印 | 50% |

### Grid

- ニュース／プロジェクト一覧は 2〜4カラム。カード間の余白は 20px 前後
- 写真セクションは全幅（bleed）で、テキストは container 内に収める

### Motion

```css
--moveUpRightValue: 5px;   /* ホバー時に右上へ 5px 動かす */
```

- 唯一の CSS 変数らしい変数。**ホバーで要素が右上に 5px 滑る**のがこのサイトのインタラクション

---

## 6. Depth & Elevation

**影はほとんど使わない。** 階層は写真の面積と `rgba(0,0,0,0.05)` の面で表現する。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。ボタン・カード・タグはすべて影なし |
| 1 | `0px 0px 32px rgba(0, 0, 0, 0.1)` | 浮かせるパネル（実測 5要素）。**offset ゼロの全方向ソフトシャドウ** |

> `0 0 32px` は**方向を持たない影**。ドロップシャドウではなくアンビエントな光の回り込みとして使われている。下方向オフセットの影に置き換えないこと。

---

## 7. Do's and Don'ts

### Do（推奨）

- **UI の面は `rgba(0,0,0,0.05)` と `rgba(0,0,0,0.8)` で作る。** 不透明色（`#f5f5f5` 等）に置き換えない — 写真の上に重ねたときの馴染み方が変わる
- **本文の文字色は `#000000`**（純黒）
- **`letter-spacing: -0.28px` を固定値で当てる**（`-0.02em` を各要素で再宣言しない）
- **`font-feature-settings: "palt"` を body に置いて全体に継承させる**
- 書体は役割で切り替える: 本文＝中ゴ、見出し・ラベル＝見出ゴ、欧文＝Univers、標語＝リュウミン
- 明朝の標語だけは `letter-spacing: 1.47px`（0.07em）で開く
- 角丸は `3px`。タグだけ `100px`
- 本文カラムは 741px、コンテナは 1140px
- 行間は 1.28（見出し）と 1.7（本文）の2値に寄せる

### Don't（禁止）

- **文字サイズを 7段（10/12/14/16/18/21/24px）から外さない。** 32px や 40px の大見出しは存在しない
- **有彩色を増やさない。** 青 `#296acc` 以外の色を UI に持ち込まない
- **見出しを `font-weight: 700` で作らない。** 太さではなく**書体（見出ゴ）**で見出しにする
- **`letter-spacing` を `em` で各要素に再宣言しない。** 大きい文字の詰めが強くなりすぎて実サイトと変わる
- ボタンに影を付けない
- 角丸を 8px 以上にしない（タグの 100px を除く）
- 欧文を和文書体（中ゴ・見出ゴ）の欧文グリフで組まない。**英字は必ず Univers 系**
- 明朝を本文に使わない。リュウミンは標語1行だけの特別な役

---

## 8. Responsive Behavior

### Breakpoints

CSS の `@media` に現れる境界値は多いが、設計上の主要な区切りは次の5つ。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | モバイル（375 / 500 / 640px の補助境界あり） |
| Tablet | ≤ 1024px | タブレット |
| Desktop | ≥ 1025px | デスクトップ |
| Wide | ≥ 1200px | コンテナ最大幅（1140px）に到達 |
| Extra Wide | ≥ 1440px | 全幅セクションの上限 |

### タッチターゲット

- 塗りボタン（14px / padding 15px）の実高は約 48px — 44px 基準を満たす
- ナビ項目（12px / line-height 20.4px）は SP では padding を足して 44px を確保する
- 丸矢印ボタンは直径 72px 前後で十分

### フォントサイズの調整

- 本文 16px はモバイルでも維持する
- 見出しは 24px → 21px、21px → 18px と**1段下げる**（7段スケールの中で移動させ、中間値を作らない）
- 本文カラム 741px は SP では左右 20px 前後の余白を残して全幅に

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Surface (light):   rgba(0, 0, 0, 0.05)
Surface (filled):  rgba(0, 0, 0, 0.8)
Glass:             rgba(255, 255, 255, 0.5)
Text:              #000000
Text Secondary:    #515252
Text on Dark:      #ffffff
Accent (link):     #296acc
Gray (rule):       #9fa0a0
Gray Light:        #e2e3e3
Background:        #ffffff

Font (body):       MFW-GothicBBBPr6-Medium, sans-serif   → 代替 Noto Sans JP 400
Font (heading):    MFW-MidashiGoPr6-MB31, sans-serif     → 代替 Noto Sans JP 700
Font (latin):      UniversNextPro-Bold, sans-serif       → 代替 Inter 700
Font (serif):      YakuHanMP, MFW-RoHMinchoPro-Md, serif → 代替 Shippori Mincho

Size Scale:        10 / 12 / 14 / 16 / 18 / 21 / 24px  (これ以外を作らない)
Body Size:         16px
Line Height:       1.7 (本文) / 1.28 (見出し・ラベル)
Letter Spacing:    -0.28px  (固定値。em で再宣言しない)
Font Feature:      "palt"   (body に置いて継承)
Radius:            3px (既定) / 100px (タグ) / 50% (丸)
Container:         1140px / 本文カラム 741px
Shadow:            0 0 32px rgba(0,0,0,0.1)  (使う場合のみ)
```

### プロンプト例

```
森ビルのデザインシステムに従って、プレスリリース一覧のページを作成してください。

- body に letter-spacing: -0.28px と font-feature-settings: "palt" を置き、全体に継承させる
- 本文フォント: Noto Sans JP 400（実サイトは中ゴシックBBB Pr6 M の代替）
- 見出し・ラベル・ボタン文言: Noto Sans JP 700（実サイトは見出ゴ MB31 Pr6 の代替）
- 英字ラベル（PRESS RELEASE 等）: Inter 700
- ページタイトル: 24px / line-height 1.28
- カードタイトル: 18px / weight 600 / line-height 1.28 / 2行で line-clamp
- 日付: 18px / weight 400
- 本文: 16px / line-height 1.7 / color #000000
- カード: 背景 rgba(0,0,0,0.05)、border-radius 3px、影なし
- 絞り込みタグ: 背景 #ffffff、border-radius 100px、padding 9px 20px、16px/600
- 「もっと見る」ボタン: 背景 rgba(0,0,0,0.05)、border-radius 3px、padding 15px、14px
- 「一覧を見る」ボタン: 背景 rgba(0,0,0,0.8)、文字 #ffffff、border-radius 3px、padding 20px、16px/700
- ホバーで要素を右上に 5px 移動させる
- コンテナ 1140px、本文カラム 741px
- 有彩色は使わない（リンクの #296acc を除く）
```
