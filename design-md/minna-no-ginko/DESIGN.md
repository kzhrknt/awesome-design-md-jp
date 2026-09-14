# DESIGN.md — みんなの銀行（Minna no Ginko）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-14 / 対象: `https://www.minna-no-ginko.com/`, `/service/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **純黒・純白・蛍光イエローの3色**だけで組むデジタルバンク。**2px の太い黒罫**で矩形を描き、手描き風のモノクロイラストを載せる
- **密度**: 低い。1カラム 504px の縦スクロールを基本に、スマホアプリの導線をそのまま Web に持ち込んでいる
- **キーワード**: 純黒／純白、蛍光イエロー `#eeff00`、2px ボーダー、角丸ゼロの矩形ボタン＋pill のステッカー、palt なし

**このサイトの核心は4つある。**

1. **文字色は純黒 `#000000` と純白 `#ffffff` の2色だけ**（実測：`#000` 196 要素 / `#fff` 95 要素）。**グレーの文字が 1 つも出てこない。** 階調は `--gray-*` としてトークンには存在するが、本文には使われていない
2. **`font-feature-settings` は全 291 要素が `normal`。** **palt を一切使わない。** 代わりに **`letter-spacing: 0.8px` を全面に効かせている**（実測 218 要素）。和文を「詰める」のではなく「わずかに空ける」方向に振った設計
3. **ウェイトは 600 が主役**（実測 184 要素）。トークンの `--base-normal-weight` は `300` で、**長文の説明だけが 300**（80 要素）。見出し・ラベル・ボタンはすべて 600
4. **ボタンは `border-radius: 0` の矩形、ステッカーは `border-radius: 100px` の pill** と使い分ける。どちらも**枠線は 2px**

> **このサイトは 19 個の実効的な設計トークンを持つ**（`--accent` `--primary-black` `--inner-maxWidth` など）。WordPress 既定のような「使われない変数」ではなく、**実装値と一致している**。ただし**書体だけはトークンどおりに描画されない**（次項）。

---

## 2. Color Palette & Roles

### Design Tokens（実在する CSS 変数）

```css
--primary-black: #000;
--primary-white: #fff;
--accent: #ef0;                    /* = #eeff00 蛍光イエロー */
--notice: #DE0000;                 /* 警告・重要なお知らせ */
--gray:    #707070;
--gray-v2: #A1A1A1;
--gray-v3: #E5E5E5;
--gray-v4: #4d4d4d;
--light-gray: #f4f4f4;             /* ページ背景 */
--black-opacity1: color-mix(in srgb, #000 10%, transparent);
--black-opacity3: color-mix(in srgb, #000 30%, transparent);
--black-opacity5: color-mix(in srgb, #000 50%, transparent);
--black-opacity7: color-mix(in srgb, #000 70%, transparent);
--accent-opacity1: color-mix(in srgb, #ef0 10%, transparent);
--inner-maxWidth: 504px;
--base-font: "Hiragino Sans", "Noto Sans JP", sans-serif;
--base-normal-weight: 300;
```

### Primary

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Black** | **`#000000`** | **可視 196 要素**。文字・ボタンの面・全ボーダー。**このサイトは文字に純黒を使う** |
| **White** | **`#ffffff`** | 可視 95 要素。黒面の上の文字、カード・ボタンの面 |
| **Accent（蛍光イエロー）** | **`#eeff00`**（`--accent: #ef0`） | **可視 20 要素**。**内訳は 10×10px の小さな四角マーカー（`.owd-sub-marker`）と、サービス一覧の選択中タブ**。**広い面には塗らない** |

> **アクセントの使い方が特徴的。** 蛍光イエローは**見出し脇の 10px の四角**と**選択状態**にだけ現れる。面積は極小だがモノクロの中で強烈に目立つ。**背景やヒーローをこの色で塗らないこと**（実サイトはやっていない）。

### Semantic

- **Notice** (`#DE0000`): 重要なお知らせ・警告（トークン `--notice`）

### Neutral

- **Background** (`#f4f4f4`): ページ背景（`pageBackground.resolved` = `rgb(244,244,244)` / 根拠 `body`。トークン `--light-gray`）
- **Surface** (`#ffffff`): カード・ボタンの面
- **Surface Gray** (`#e5e5e5`): カードのカテゴリラベル（`--gray-v3`）
- **Divider** (`#cccccc`): 可視 8 要素の細い区切り
- **Gray Tokens**: `#707070` / `#A1A1A1` / `#4d4d4d` は**トークンには存在するが、可視テキストの色としては 1 件も観測されない**。アイコンや境界の補助に留まる

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **ヒラギノ角ゴシック（Hiragino Sans）を先頭**に置き、**Noto Sans JP をフォールバック**とする。明朝は使わない
- **OS フォント優先の設計**。macOS/iOS では常にヒラギノ、Windows/Android では Noto Sans JP が当たる

### 3.2 欧文フォント

- **Avenir Next** を先頭に置いた別チェーンを、**数字・英字ラベル専用**に使う（可視 40 要素）
- `POINT`（88px / 700）、`Point 01`（20px / 700）、`FEATURE`（14px / 600）、ページャの `2 / 10`（12px / 700）など

### 3.3 font-family 指定

```css
/* 和文・本文（トークン --base-font） */
font-family: "Hiragino Sans", "Noto Sans JP", sans-serif;

/* 数字・英字ラベル */
font-family: "Avenir Next", Roboto, "Hiragino Sans", "Noto Sans JP", system-ui, sans-serif;
```

**フォールバックの考え方**:
- **和文優先ではなく「ローカル優先」**。Web フォントを取りに行かず、OS の高品質な和文ゴシックに委ねる
- 欧文チェーンは **Avenir Next（macOS）→ Roboto（Android）→ ヒラギノ**と、**OS ごとに最良の欧文を当てる**構成

> **実測の重要な注意：`@font-face` で宣言された Web フォントは、計測した全ページで 1 つも `loaded` にならない。**
>
> | 宣言 | status |
> |------|--------|
> | Noto Sans JP（可変 100–900） | **unloaded** |
> | Roboto（可変 100–900 / 300） | **unloaded** |
> | OnlyNumberWeight 500 | **unloaded** |
>
> macOS ではチェーン先頭の **Hiragino Sans がローカルで解決するため、後続の Web フォントが読まれない**。つまり **Noto Sans JP と Roboto は「Windows / Android のための保険」**として配信されている。**フォント込みで見た目を再現するときは、検証環境の OS によって字面が変わる前提で組むこと。**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Display（欧文）** | Avenir Next | **88px** | **700** | 1.00 | **0.88px** | `POINT` |
| **Heading** | Hiragino Sans | 20–24px | **600** | 1.60 | **0.8px** | セクション見出し |
| **Label（欧文）** | Avenir Next | 20px | **700** | 2.00 | 0.8px | `Point 01` |
| **Body** | Hiragino Sans | **16px** | **600** | **1.67** | **0.8px** | UI・カードの本文 |
| **Body Long** | Hiragino Sans | 16px | **300** | **1.75** | 0.8px | **長文の説明のみ 300** |
| **Nav** | Hiragino Sans | 14–16px | 600 | 1.71 | 0.8px | グローバルナビ |
| **Button** | Hiragino Sans | **14px** | **600** | 1.33 | **0.8px** | |
| **Sticker / Chip** | Hiragino Sans | 16px | **300** | 1.50 | normal | pill のステッカー |
| **Tag** | Hiragino Sans | 14px | 400 | 1.50 | **0.6px** | `# すべての方` |
| **Caption** | Hiragino Sans | 12–14px | 300 | 1.60 | 0.8px | 注記・`※1` |

**ウェイトの分布**: **600 が 184 件**、300 が 80 件、700 が 24 件、400 は 3 件だけ。**中間の 400 / 500 をほぼ使わず、600 と 300 の 2 極で組む**のがこのサイトの構え。

### 3.5 行間・字間

- **行間は 1.6〜1.75 の間に集中**: `1.71`（102 要素）/ `1.67`（100 要素）/ `1.60`（23 要素）/ `1.75`（18 要素・長文）
- ボタン内は `1.33`、pill ステッカーは `1.50`、欧文 Display は `1.00`
- **`letter-spacing` は `0.8px` が全面**（実測 218 要素）

> **字間は px で宣言され、px のまま継承される。** 16px の本文でも 14px のボタンでも **実効値は同じ `0.8px`**（それぞれ 0.05em / 0.057em に相当）。**em に読み替えて各要素に再宣言すると、大きい文字ほど開きすぎて別物になる。** `0.8px` の固定値で書くこと。
>
> 例外は **`0.4px`**（ロゴの縦積み文字など 63 要素）、**`0.88px`**（88px の欧文 Display 7 要素）、**`0.6px`**（ハッシュタグ 3 要素）。

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

- 金融商品の注記（`※1` `※2`）が本文に混ざるため、**注記番号が行頭に落ちない**よう禁則を効かせる
- CTA のラベルは `最短5分で口座開設、\nすぐに使える※` のように**意図的な改行**を含む。**自動折り返しに任せない**

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* 実サイトは palt を使わない */
```

- **可視テキスト 291 件すべてが `normal`。** `palt` も `kern` も指定しない
- **代わりに `letter-spacing: 0.8px` で全体をわずかに開ける。** 詰める設計（青幻舎・足立美術館）とは逆方向
- **理由の推測**: 金額・口座番号・注記番号など**数字と記号の可読性**を優先する金融 UI では、約物を詰めると視認性が落ちる

### 3.8 縦書き

**該当なし。** 実測した全 291 要素が `writing-mode: horizontal-tb`。

---

## 4. Component Stylings

### Buttons

**すべてのボタンは高さ 56px / 幅 294px（デスクトップ）/ `border-radius: 0` / ボーダー 2px。**

**Primary（黒）**
- Background: `#000000`
- Text: `#ffffff`
- Border: `2px solid transparent`（**面と同じ幅の透明枠を持たせ、Secondary と寸法を揃える**）
- Padding: `0 24px` / Height: `56px`
- Border Radius: **`0`**
- Font: 14px / **600** / `letter-spacing: 0.8px`

**Primary on Dark（暗い面の上）**
- Background: `#000000` / Text: `#ffffff` / **Border: `2px solid #ffffff`**

**Secondary（白地）**
- Background: `#ffffff`
- Text: `#000000`
- Border: **`2px solid #000000`**
- 他は Primary と同一

**Header CTA（口座開設）**
- Background: `#000000` / Text: `#ffffff` / Border: `1px solid #000000` / Radius `0` / 12px / 600 / `ls: 0.8px`

### Stickers（pill）

サービス名を示す小さな pill。**ボタンとは別系統で、こちらだけ角丸を持つ。**

| 種別 | Background | Label | Border | Radius | Padding | Size |
|------|-----------|-------|--------|--------|---------|------|
| **Default** | `#ffffff` | `#000000` | `2px solid #000000` | **`100px`** | `4px 12px` | 16px / **300** / 高さ 24px |
| **Active / 強調** | `#000000` | `#ffffff` | `2px solid #000000` | `100px` | `4px 12px` | 16px / 300 / 高さ 26px |

> **実装上の注意：ラベルの文字色は pill 自身ではなく子要素（`<p>` / `<strong>`）に当たっている。** そのため黒い pill でも**要素自身の `color` は `#000000` のまま**で、白文字は子が持つ。**`<a>` や pill の直下にテキストノードを置かず、`<span>`/`<p>` に入れて色を当てること。**

### Selected State（サービス一覧）

- Background: **`#eeff00`**
- Border: `2px solid #000000`
- Border Radius: **`0`**
- Font: 16px / 300
- **選択されていない項目は `background: #ffffff`**。蛍光イエローは**選択の合図として使う**

### Cards

- Background: `#ffffff`（カテゴリラベルは `#e5e5e5`）
- Border: **`2px solid #000000`**
- Border Radius: **`0`**
- Padding: `12px 16px`
- Shadow: 原則なし（下記 6章）

### Markers

- **`.owd-sub-marker`**: **10×10px の `#eeff00` の正方形**。見出しの脇に置く。**可視 20 要素中の主役**

### Modal / CTA Sheet

- Background: `#f4f4f4`（内側）/ `#ffffff`（外枠）
- Padding: `40px` / `48px 16px`
- **上端だけ `border-radius: 60px 60px 0 0`** のボトムシート

---

## 5. Layout Principles

### Spacing Scale

`gap` の実測分布から読める実効スケール（**4px 基準**）:

| Token | Value | 実測 |
|-------|-------|------|
| **XS** | **4px** | **25 ヶ所**（最多。アイコンとラベルの間） |
| S | 8px / 10px / 12px | |
| **M** | **16px** | **21 ヶ所**（カード内、リスト項目間） |
| **L** | **24px** | **12 ヶ所**（ブロック間、ボタンの左右パディング） |
| XL | 40px | セクション間 |

### Container

| 用途 | Max Width |
|------|-----------|
| **本文カラム（`--inner-maxWidth`）** | **504px** |
| 広いセクション | 1120px / 1280px |
| モバイル基準 | 390px / 347px |

> **`--inner-maxWidth: 504px` がこのサイトの骨格。** デスクトップでも本文は 504px の1カラムに収まり、**スマホアプリの画面比率をそのまま拡大した構成**になっている。

### Grid

- 基本は**中央 1 カラム**。左右にソーシャル・ダウンロード導線を「吹き出し付きラベル」として配置

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| **0** | **none** | **ほぼ全要素**。奥行きは 2px の黒罫で表す |
| 1 | `0 4px 10px rgba(0, 0, 0, 0.1)` | 浮かせる小要素（可視 2 件） |
| 2 | `0 4px 20px rgba(0, 0, 0, 0.1)` | ボトムシート（可視 1 件） |

**影は可視 3 件しかない。** カードもボタンも影を持たず、**`2px solid #000000` の枠が影の役割を果たしている**。

---

## 7. Do's and Don'ts

### Do（推奨）

- **色は純黒・純白・`#eeff00` の3色で組む。** グレーの文字を増やさない
- **枠線は 2px。** 1px にすると線が痩せてこのサイトに見えなくなる
- **ボタンは `border-radius: 0` の矩形、ステッカーは `100px` の pill。** 使い分けを守る
- **`letter-spacing: 0.8px` を px の固定値で全面に当てる**
- **ウェイトは 600 と 300 の2極。** 見出し・ラベル・ボタンは 600、長文の説明だけ 300
- **Primary ボタンにも `2px solid transparent` を当てて Secondary と寸法を揃える**
- **蛍光イエローは 10px のマーカーと選択状態にだけ使う**
- **本文カラムは 504px（`--inner-maxWidth`）に収める**

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** このサイトは 291 要素すべて `normal`。約物を詰めると金額・注記の見え方が変わる
- **`letter-spacing` を em に読み替えない。** `0.8px` は px のまま全サイズで継承される
- **蛍光イエローを広い面に塗らない。** 実装は 10×10px のマーカーと選択タブのみ
- **影でカードを浮かせない。** 奥行きは 2px の黒罫が担う
- **pill やボタンの直下にテキストノードを置かない。** 文字色は子要素（`<p>` / `<strong>`）に当たっている。直置きすると黒 pill の上に黒文字が出る
- **Web フォントが当たる前提で検証しない。** macOS ではヒラギノがローカル解決し、`Noto Sans JP` / `Roboto` は `unloaded` のまま。**Windows で確認すると字面が変わる**
- **`--gray` `--gray-v2` `--gray-v4` を本文の文字色に使わない。** トークンには存在するが、可視テキストでは 1 件も使われていない

---

## 8. Responsive Behavior

### Breakpoints

実測したメディアクエリの出現回数順:

| Name | Condition | 説明 |
|------|-----------|------|
| **Mobile** | **`max-width: 896px`** | **主ブレークポイント（158 ルール）。** ここでレイアウトが総取り替えになる |
| Desktop | `min-width: 897px` | 12 ルール |
| Wide | `min-width: 1191px` | 7 ルール |
| Small Mobile | `max-width: 741px` / `430px` / `406px` | 細かい詰め |
| Hover 可否 | **`(hover: hover)`** | **50 ルール。** ホバー効果をポインタデバイスに限定している |

> **`(hover: hover)` を 50 ヶ所で使っている**のは、**タッチ端末でホバー状態が residue として残るのを避ける**ため。**スマホ起点のサービスらしい設計で、真似する価値がある。**

### タッチターゲット

- **ボタンの高さ 56px** — 44px 基準を十分に満たす
- pill ステッカーは高さ 24px だが、**これは表示用のラベルでタップ対象ではない**

### フォントサイズの調整

- 本文 16px はモバイルでも維持
- 欧文 Display（88px）はビューポートに応じて縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary:         #000000
On Primary:      #ffffff
Accent:          #eeff00（--accent: #ef0。10px のマーカーと選択状態のみ）
Notice:          #DE0000
Background:      #f4f4f4
Surface:         #ffffff
Border:          2px solid #000000
Font:            "Hiragino Sans", "Noto Sans JP", sans-serif
Font (数字・英字): "Avenir Next", Roboto, "Hiragino Sans", "Noto Sans JP", system-ui, sans-serif
Body Size:       16px
Weight:          600（UI・見出し） / 300（長文）
Line Height:     1.67〜1.75
Letter Spacing:  0.8px（px 固定・全面）
OpenType:        なし（palt を使わない）
Radius:          0（ボタン・カード） / 100px（ステッカー）
Container:       504px
Shadow:          原則なし
```

### プロンプト例

```
みんなの銀行のデザインシステムに従って、サービス紹介セクションを作成してください。
- フォントは "Hiragino Sans", "Noto Sans JP", sans-serif、数字と英字ラベルだけ
  "Avenir Next", Roboto, ... の別チェーン
- font-feature-settings は使わない。letter-spacing: 0.8px を px の固定値で全体に当てる
- 見出し・ラベル・ボタンは weight 600、長文の説明のみ 300
- 本文カラムは max-width: 504px の1カラム
- ボタンは 幅294px × 高さ56px / border-radius: 0 / border: 2px solid
  （Primary = 黒地に白文字＋2px solid transparent、Secondary = 白地に黒文字＋2px solid #000）
- サービス名の pill は border-radius: 100px / 2px solid #000 / padding 4px 12px / 16px / 300。
  ラベルは子要素に入れて色を当てる
- 選択中の項目だけ背景を #eeff00 にする。それ以外に蛍光イエローは 10×10px のマーカーのみ
- 影は使わない。奥行きは 2px の黒罫で出す
- 背景 #f4f4f4、面 #ffffff、文字は純黒 #000000
```
