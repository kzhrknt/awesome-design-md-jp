# DESIGN.md — 有隣堂（YURINDO）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-08-31 / 対象: `https://www.yurindo.co.jp/`, `/store/bookstore/`, `/topics/36340/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白ではなく**生成りのクリーム地（`#f8f5ee`）をページ背景に敷く**。その上に白のカードを角丸で浮かべ、深緑1色でアクセントを付ける。紙と印刷物の手ざわりを画面に持ち込む設計
- **密度**: 書店らしく要素は多いが、カード同士の余白を広く取り、面ごとにクリーム／ミント／白を塗り分けて視覚的に切り分けている
- **キーワード**: 生成り、深緑、丸み、文久ゴシック、紙もの

**3つの特徴が同時に効いている:**
1. **本文ウェイトが `500`（Medium）**。`400` ではない。文字が少し太く、紙の印刷に近い黒みになる
2. **`font-feature-settings: "palt"` が全要素にかかっている**（実測で確認済み。ヘッダーの `arial` 指定 span を除く全要素）。字間 `0.08em` との併用で、詰めてから空けるという二段構えの調整
3. **見出しが `toppan-bunkyu-gothic-pr6n`**（凸版文久ゴシック / Adobe Fonts）。明朝の骨格を持つ人文系ゴシックで、本文の Noto Sans JP と明確に対比される

一部のセクション背景には **32px 方眼の `repeating-linear-gradient`**（罫線 `#dad6cb` / 地 `#f5f0e4`）が敷かれる。方眼紙のモチーフ。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Yurindo Green** (`#007d48`): ブランドの中核。CTA の面色、見出しの差し色、リンク色を兼ねる。トップの `uniqueBackgrounds` で 43 件
- **Deep Green** (`#274633`): フッター周辺の濃い面。緑の暗色対
- **Sage** (`#a8c5b8`): 罫線・区切りに使う淡い緑

### Surface（面色）— このサイトの肝

- **Background** (`#f8f5ee`): **ページ背景。白ではない**。`body` に明示指定（`pageBackground.resolved` 根拠 `body`）
- **Mint Tint** (`#f3faf7`): **最多の面色（88件）**。チップ・タブ・丸アイコンボタンの地
- **Mint Border** (`#c2d9c8`): 上記チップの枠。ミント地とセットで必ず使う
- **Cream Surface** (`#f5f0e4`): クリームよりわずかに濃い面。カテゴリ帯・方眼背景の地
- **Ivory** (`#fbfaf2`): セクション見出しブロックの最も淡い面
- **White** (`#ffffff`): カードの面。**背景がクリームなので白が「浮き」として機能する**

### Semantic / Status

- **Stock Available** (`#2b6295`): 「在庫がある」バッジ（青）
- **Stock None** (`#a35c1b`): 「在庫がない」バッジ（茶）

### Overlay

- `rgba(46, 42, 42, 0.9)`: Cookie バナー
- `rgba(0, 125, 72, 0.9)`: 右端の固定「店舗一覧」タブ
- `rgba(41, 68, 84, 0.9)`: 右端の固定「在庫検索」タブ

### Neutral（ニュートラル）

- **Text Primary** (`#2e2a2a`): 本文。純黒ではなくわずかに赤みのある墨色
- **Text Input** (`#444746`): 入力欄の文字
- **Grid Rule** (`#dad6cb`): 方眼背景の罫線

---

## 3. Typography Rules

### 3.1 和文フォント

- **本文ゴシック**: **Noto Sans JP のみ**（フォールバックは generic の `sans-serif` だけ）
- **見出しゴシック**: **凸版文久ゴシック（`toppan-bunkyu-gothic-pr6n`）**。Adobe Fonts 供給。`serif` にフォールバックする宣言になっている
- **明朝体**: 使用しない（文久ゴシックが明朝寄りの役割を担う）

### 3.2 欧文フォント

- **サンセリフ**: **Work Sans**（英字のアイブロウ／ラベル用）
- **等幅**: 定義なし

### 3.3 font-family 指定

```css
/* 本文・ナビゲーション・UI 全般 */
font-family: "Noto Sans JP", sans-serif;

/* 見出し（h2〜h4・ナビラベル） */
font-family: toppan-bunkyu-gothic-pr6n, serif;

/* 英字ラベル・アイブロウ */
font-family: "Work Sans", sans-serif;
```

**フォールバックの考え方**:
- **和文フォントを単独で指定する割り切り型**。Web フォント前提で、ローカルフォントを並べない
- 見出しのフォールバックが `serif` なのは意図的。凸版文久ゴシックが読めない環境では**ゴシックではなく明朝に落ちる**（骨格の近さを優先している）
- **Adobe Fonts はドメインライセンスのため、複製環境では表示できない。** 代替は下記参照

> **preview.html での代替フォント**: `toppan-bunkyu-gothic-pr6n` は Adobe Fonts のドメイン制限があるためローカルで表示できない。**Google Fonts の `Zen Old Mincho` または `Shippori Mincho` ではなく、`Zen Kaku Gothic New` に `serif` を併記する**のが近い。文久ゴシックは「明朝の骨格を持つゴシック」なので、明朝に振ると太さが合わない。

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Heading | 凸版文久ゴシック | 40px | 600 | 1.4 (56px) | 0.06em (2.4px) | トップの大見出し |
| Article H2 | 凸版文久ゴシック | 38px | 600 | 1.21 (46px) | 0.08em (3.04px) | 記事タイトル |
| Section H2 | 凸版文久ゴシック | 29px | 600 | 1.45 (42px) | 0.04em (1.16px) | 記事内の中見出し |
| H3 | 凸版文久ゴシック | 28px | 600 | 1.39 (39px) | 0.06em (1.68px) | 記事内の小見出し |
| H3 (card) | 凸版文久ゴシック | 23px | 600 | 1.52 (35px) | 0.03em (0.69px) | カード見出し |
| H3 (small) | 凸版文久ゴシック | 18px | 600 | 1.56 (28px) | 0.02em (0.36px) | 最小の見出し |
| H4 | 凸版文久ゴシック | 20px | 600 | 1.4 (28px) | 0.06em (1.2px) | 記事内 |
| H4 (label) | Noto Sans JP | 19px | 500 | 1.26 (24px) | 0.045em (0.855px) | `#007d48` のラベル見出し |
| Lead | Noto Sans JP | 27px | 500 | 1.19 (32px) | 0.06em (1.62px) | 記事のリード |
| **Body** | **Noto Sans JP** | **18px** | **500** | **1.9 (34.2px)** | **0.08em (1.44px)** | **本文の基準値** |
| Body (green) | Noto Sans JP | 18px | 500 | 1.89 (34px) | 0.05em (0.9px) | 強調段落 `#007d48` |
| Nav Label | 凸版文久ゴシック | 16px | 600 | 1.0 (16px) | 0.06em (0.96px) | グローバルナビ |
| Nav Link | Noto Sans JP | 15px | 500 | 1.6 (24px) | 0.035em (0.525px) | `#007d48` |
| Table | Noto Sans JP | 16px | 500 | 1.9 (30.4px) | 0.09em (1.44px) | 店舗情報テーブル |
| Caption | Noto Sans JP | 15px | 500 | 1.6 (24px) | 0.03em (0.45px) | 補足 |
| Small | Noto Sans JP | 14px | 500 | 1.9 (26.6px) | 0.1em (1.44px) | 最小テキスト |
| Eyebrow (EN) | Work Sans | 16px | 500 | 1.0 (16px) | 0.04em (0.64px) | 英字ラベル |

> **`font-weight: 400` はほぼ登場しない。** 基準は `500`、見出しは `600`、ロゴまわりだけ `700`。

### 3.5 行間・字間

- **本文の行間**: **1.9**（34.2px / 18px）。日本語サイトの中でもかなり広い部類
- **見出しの行間**: 1.2〜1.56。サイズが大きいほど詰める
- **本文の字間**: **0.08em**（1.44px / 18px）。この値がサイト全体の基準
- **見出しの字間**: 0.02em〜0.08em。ヒーローの 40px でも 0.06em を入れる

**ガイドライン**:
- **`palt` と `letter-spacing: 0.08em` を必ずセットで使う。** どちらか片方だけだと字面が変わる。`palt` で約物とかなを詰め、`letter-spacing` で全体を均一に空け直す
- 本文 18px / 行間 1.9 はセットで再現する。16px に落とすなら行間も 1.8 程度に合わせる

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`
- 見出しは字間が広いため折り返し位置がずれやすい。長い書名は `<br>` で明示的に折る

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";
```

- **`palt` はサイト全体にかかっている（本文を含む）。** 見出し限定ではない
- 例外はヘッダー内の `arial, sans-serif` を当てた span（アイコン用）のみで `normal`
- **`palt` 単独では字間が詰まりすぎる**ため、`letter-spacing: 0.08em` で空け直す前提の設計

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

`--radius: 8px` が唯一の自前 CSS 変数。実際には **4px（213件）> 8px（56件）> 999px（30件）> 50%（28件）> 16px（14件）> 12px（10件）** の順で使われる。

### Buttons

**Primary Pill（主要CTA・右矢印つき）**
- Background: `#007d48`
- Text: `#ffffff`
- Padding: `8px 52px 8px 24px` ← **右の 52px は矢印アイコンの領域**
- Border Radius: `999px`
- Font Size: `16px` / Font Weight: `500` / Letter Spacing: `0.04em`

**Primary Rounded（「アルバイト募集中」等）**
- Background: `#007d48`
- Text: `#ffffff`
- Padding: `16px 24px`
- Border Radius: `28px`
- Font Size: `16px` / Font Weight: `500` / Letter Spacing: `0.03em`

**Tab（フィルタタブ）**
- アクティブ: Background `#007d48` / Text `#ffffff` / Border `1px solid #007d48`
- 非アクティブ: Background `#ffffff` / Text `#007d48` / Border `1px solid #007d48`
- Border Radius: `8px` / Font Size: `18px` / Font Weight: `500` / Letter Spacing: `0.02em`

**Tint Chip（カテゴリチップ）**
- Background: `#f3faf7`
- Text: `#007d48`
- Border: `1px solid #c2d9c8`
- Padding: `0 8px`
- Border Radius: `4px`
- Font Size: `16px` / Font Weight: `500`

**Circle Icon Button**
- Background: `#f3faf7` / Text: `#007d48` / Border: `1px solid #c2d9c8`
- Border Radius: `50%` / Font Size: `19px`

**Sticky Side Tab（右端固定）**
- Background: `rgba(0, 125, 72, 0.9)`（店舗一覧）/ `rgba(41, 68, 84, 0.9)`（在庫検索）
- Border Radius: `8px 0 0 8px`（左だけ丸める）

**Card Footer Label（カード下端に食い込む帯）**
- Background: `#007d48` / Text: `#ffffff`
- Border Radius: `0 0 8px 8px`
- Padding: `12px 0` / Font Size: `17px` / Font Weight: `600` / Letter Spacing: `0.1em`

### Badges

- 在庫あり: Background `#2b6295` / Text `#ffffff`
- 在庫なし: Background `#a35c1b` / Text `#ffffff`
- Padding: `0 6px 2px` / Border Radius: `4px` / Font Size: `17px` / Font Weight: `500`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #c2d9c8`
- Border Radius: `4px`
- Padding: `0 10px`
- Font Size: `16px` / Font Weight: `500` / Text: `#444746`
- 検索ボタンは `#007d48` のベタで、入力欄の右に `0 8px 8px 0` の角丸で連結する

### Cards

- Background: `#ffffff`（**背景がクリーム `#f8f5ee` なので白が浮きになる**）
- Border: なし（面色の差だけで区切る）
- Border Radius: `8px`（標準）/ `16px`（大型）
- Padding: `20px` / `24px 32px` / `32px` / `40px 48px`
- Shadow: **使わない**

### Special: 方眼背景

```css
background-image:
  repeating-linear-gradient(90deg, #dad6cb, #dad6cb 1px, transparent 0, transparent 32px),
  repeating-linear-gradient(0deg,  #dad6cb, #dad6cb 1px, #f5f0e4 0, #f5f0e4 32px);
```

「有隣堂しか知らない世界」など、コンテンツ紹介ブロックの地に使う。**32px の方眼**。

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 12px |
| M | 16px |
| L | 24px |
| XL | 32px |
| XXL | 48px |

### Container

- Max Width: **1360px**（標準）/ **1440px**（フルブリード寄りのセクション）
- Card Min Width: 260px（グリッドの最小カラム幅）
- Padding (horizontal): 16px（モバイル）／ 24〜40px（デスクトップ）

### Grid

- 商品・店舗カード: 4カラム（最小 260px の auto-fill）
- Gutter: 24px 前後

---

## 6. Depth & Elevation

**このサイトは影で階層を作らない。** DOM 全走査で見つかる `box-shadow` は白の淡いグロー1件のみ。

| Level | 表現 | 用途 |
|-------|------|------|
| 0 | ページ背景 `#f8f5ee` | 地 |
| 1 | 面色 `#ffffff` ＋ `border-radius: 8px` | カード。**クリーム地に白を置くことが「浮き」** |
| 2 | 面色 `#f3faf7` ＋ `1px solid #c2d9c8` | チップ・タブ。ミント地＋ミント枠 |
| 3 | `rgba(46, 42, 42, 0.9)` 等の不透明オーバーレイ | Cookie バナー・固定タブ |

WordPress の `--wp--preset--shadow--*`（natural / deep / sharp / outlined / crisp）は**宣言されているが1箇所も使われていない**。

---

## 7. Do's and Don'ts

### Do（推奨）

- **ページ背景は `#f8f5ee`（クリーム）にする。`#ffffff` にしない**
- 本文は `font-weight: 500` / `18px` / `line-height: 1.9` / `letter-spacing: 0.08em`
- `font-feature-settings: "palt"` を全体に当て、`letter-spacing` で空け直す
- 見出しは `toppan-bunkyu-gothic-pr6n, serif`（フォールバックは `serif` のまま）
- チップは「ミント地 `#f3faf7` ＋ ミント枠 `#c2d9c8` ＋ 緑文字 `#007d48`」の3点セットで作る
- カードは白 `#ffffff` ＋ `border-radius: 8px` ＋ 枠なし。浮きは背景との明度差で出す
- 角丸は 4px（小）/ 8px（標準）/ 16px（大）/ 999px（ピル）から選ぶ

### Don't（禁止）

- **ページ背景を白にしない。** 白はカードの色であり、地の色ではない
- **本文を `font-weight: 400` にしない。** このサイトの基準は `500`
- `palt` だけ入れて `letter-spacing` を省かない（詰まりすぎる）
- 見出しのフォールバックを `sans-serif` に変えない（`serif` が正しい）
- WordPress のプリセット色（`--wp--preset--color--*`）を使わない。**全部未使用の既定値**
- 影でカードを浮かせない
- 純黒 `#000000` を文字色に使わない（`#2e2a2a`）

---

## 8. Responsive Behavior

### Breakpoints

CSS の `@media` から実測した主要な分岐。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。グローバルナビはドロワー、固定タブは下端へ |
| Tablet | 768px – 1179px | 2カラム |
| Desktop | 1180px – 1439px | 3〜4カラム。max-width 1360px |
| Wide | ≥ 1440px | 4カラム。max-width 1440px |

1230 / 1250 / 1270 / 1290 / 1330 / 1370 / 1600 / 1700px にも細かい調整が入る。

### タッチターゲット

- 最小 44px × 44px。ピルボタン（`padding: 8px 52px 8px 24px` / 16px）は約 40px なので、モバイルでは縦 `padding` を 12px に増やす

### フォントサイズの調整

- ヒーロー見出し 40px → 26px 程度
- 記事 H2 38px → 24px 程度
- **本文 18px は据え置き**（もともと大きめの設定なので下げない）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #007d48
Deep Green: #274633
Background: #f8f5ee   ← 白ではない
Surface (card): #ffffff
Surface (tint): #f3faf7  / border #c2d9c8
Surface (cream): #f5f0e4 / #fbfaf2
Text Color: #2e2a2a
Badge: #2b6295（在庫あり）/ #a35c1b（在庫なし）
Font (body): "Noto Sans JP", sans-serif
Font (heading): toppan-bunkyu-gothic-pr6n, serif
Font (EN): "Work Sans", sans-serif
Body: 18px / 500 / line-height 1.9 / letter-spacing 0.08em
font-feature-settings: "palt"（全体）
Border Radius: 4 / 8 / 16 / 999px
Shadow: なし
```

### プロンプト例

```
有隣堂のデザインシステムに従って、店舗一覧ページを作成してください。
- ページ背景は #f8f5ee（クリーム）。白ではない
- カードは #ffffff / border-radius 8px / 枠なし / padding 24px 32px
- 見出しは toppan-bunkyu-gothic-pr6n, serif / 600 / 23px / line-height 1.52 / letter-spacing 0.03em
- 本文は "Noto Sans JP", sans-serif / 500 / 18px / line-height 1.9 / letter-spacing 0.08em
- font-feature-settings: "palt" を body に当てる
- エリア絞り込みチップは 背景 #f3faf7 / 文字 #007d48 / 枠 1px solid #c2d9c8 / radius 4px / padding 0 8px
- 「詳しく見る」は #007d48 のピル（radius 999px）、白文字 16px / 500、padding 8px 52px 8px 24px
- 在庫バッジは #2b6295（あり）/ #a35c1b（なし）、radius 4px
- 影は使わない。浮きはクリーム地に白カードを置くことで表す
- コンテナ幅は 1360px、カードは最小 260px の 4 カラム
```
