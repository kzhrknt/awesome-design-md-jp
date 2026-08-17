# DESIGN.md — STARFLYER（スターフライヤー）

> 北九州を拠点とする航空会社スターフライヤーの公式サイト（https://www.starflyer.jp/）のデザイン仕様書。
> 黒い機体・黒い革シート・黒い機内という「黒のエアライン」をそのまま Web に持ち込んだ、**日本の航空会社では唯一の黒地サイト**。
> 最大の特徴は **2 つのデザインシステムが 1 つのドメインに同居している**こと。予約・運賃を扱う**実務サイトは OS 搭載のヒラギノ角ゴ Pro で組んだ黒枠 × 白面**、ブランドサイト（`/brand/`）は **Adobe Fonts の VDL V7明朝 ＋ IvyMode で組んだ全面黒**。同じブランドの「使う面」と「見せる面」が明確に切り分けられている。
> 差し色は**ダークレッド `#990000` ただ 1 色**。彩度を持つ色はここにしか出てこない。
> 実サイトの computed style 実測（2026-08-17 取得。トップページ + `/brand/`）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **黒いクロム（外枠）に白いコンテンツを載せる**。ヘッダー・左サイドレール・フッターが黒 `#000000`、その内側の作業領域が白 `#ffffff`。ページの `body` 自体が黒で、白は「上に置かれた面」
- **スターフライヤーについて**: 2006 年就航。全席本革・全席モニター・ハイブランドの機内サービスで「スマート ラグジュアリー」を掲げる。**黒はブランドの中心概念**であり、装飾ではない
- **密度**: 実務サイトは高密度（運賃表・時刻表・空席カレンダーが縦に積まれる）。ブランドサイトは極端に低密度（1 画面 1 メッセージ）
- **キーワード**: 黒地 × 白面、ダークレッド 1 色、radius 3px、ヒラギノ角ゴ Pro、VDL V7明朝、IvyMode イタリック、▸ の三角マーカー
- **特徴**:
  - **`body` の地色が黒 `#000000`**。コンテンツ面の白はその上に載る矩形で、両脇に黒が覗く構造。スクロールの端やフッター周りで必ず黒が見える
  - **左サイドに固定の縦レール**（航空券のご予約／予約確認・変更／航空券＋宿泊／運航状況／オンラインチェックイン／空席待ち）。アイコン＋2 行のラベルで、ここだけ常時追従する
  - **彩度を持つ色は `#990000`（ダークレッド）だけ**。「マイレージ会員に入会する」CTA、運賃の金額、テーブルの日曜列に使う。**朱赤ではなくワインレッド寄りの暗い赤**で、黒との相性を優先している
  - **`border-radius: 3px` がサイト全体の既定**（実測 145 箇所）。ピル（1000px）はごく一部のタグにしか出ない
  - **リンクの頭に `▸`（右向き三角）を必ず置く**。アイコンフォントではなく背景画像で、ナビ・リスト・見出しリンクすべてに一貫して付く
  - **`letter-spacing` を実務サイトでは一切使わない**（すべて `normal`）。逆に**ブランドサイトは 0.1〜0.5em まで大きく開く**。同じブランドで字間の方針が正反対
  - **`font-feature-settings` はどちらのサイトでも使わない**（`palt` なし）
  - ブランドサイトは**明朝体（VDL V7明朝）で全文を組む**。実務サイトはゴシックのみ。**書体で「見せる／使う」を分けている**

---

## 2. Color Palette & Roles

> CSS Custom Properties は定義されていない。すべて直値で書かれているため、実装側で変数化する場合は以下の名前を使う。

### Base（黒と白）

- **Black** (`#000000`): **`body` の地色**。ヘッダー・左サイドレール・フッターの面色
- **White** (`#ffffff`): コンテンツ面。黒の上に載る矩形
- **Near Black** (`#1e1e1e`): 濃色セクション（キャンペーン情報など）の面色。**純黒とわずかに差をつけて段差を作る**
- **Charcoal** (`#333333`): 本文の文字色。**黒地の上では `#ffffff`、白地の上では `#333333`**
- **Dark Slate** (`#40494f` / `#27384d` / `#4b4c4c`): 予約フォーム・運航状況フォームの面色。**黒よりわずかに青みを持たせた濃色パネル**

### Accent（差し色 — 1 色のみ）

- **Dark Red** (`#990000`): **サイト唯一の彩度を持つ色**
  - 「マイレージ会員に入会する」の塗り CTA（`#990000` の面に白文字、radius 2px）
  - 運賃の金額（`11,660円〜`）
  - テーブルの日曜列の見出し
  - `label` バッジ（10px / weight 700 / 白文字 / radius 0）
- 実装時、**この赤を明るく（`#cc0000` や `#e60012` に）振らない**。黒と並べたときの沈み具合がブランドの印象を決めている

### Neutral（面・罫）

- **Panel Gray** (`#f2f2f2`): セクションの薄面（CSR／法人契約など）
- **Light Gray** (`#e6e6e6`): バッジ・タグの面（「マイレージ」「インフォメーション」など、12px / radius 0 / padding 3px 10px 4px）
- **Button Gray** (`#efefef`): フォームの submit（UA 既定に近い `2px outset`）
- **Border Gray** (`#d1d1d1`): 白ボタンの枠
- **Input Border** (`#cccccc`): 入力欄・セレクトの枠
- **Ghost Border** (`#666666`): 黒地の上のゴーストボタンの枠
- **Muted Text** (`#cccccc`): 黒地の上の補助テキスト・ゴーストボタンの文字
- **Dot Gray** (`#737373` / `#999999`): カルーセルのドット（非選択）

### Table Tint（カレンダー／運賃表の列色）

- **Sunday Tint** (`#faf2f2`): 日曜列の淡い赤み
- **Saturday Tint** (`#f1f4fa`): 土曜列の淡い青み
- **Link Blue** (`#003399`): テーブル見出しの土曜表記。**サイトで唯一の青**

### Brand Site（`/brand/` — 全面黒）

- **Background**: `#000000`（`body` そのもの）
- **Text**: `#ffffff` 一色
- **Reserve Band**: 白面 `#ffffff` に黒文字（「空席照会・ご予約はこちら」の帯だけ反転する）

---

## 3. Typography Rules

> **実務サイトとブランドサイトで書体もルールも別**。この 2 つを混ぜないことが最重要。

### 3.1 和文フォント

**実務サイト（www.starflyer.jp）**

- **ゴシック体**: **ヒラギノ角ゴ Pro W3** を先頭に置く。以降 **メイリオ → MS Pゴシック**
- **ヒラギノは Pro（ProN ではない）**。かつ**ウェイト名込みの `"ヒラギノ角ゴ Pro W3"` 表記**を使う古い書き方
- **Web フォントを一切読み込まない**。OS 搭載フォントのみ
- 一部のセレクトだけ `メイリオ` を先頭に置く別スタックが混在する（実装のゆらぎ。踏襲しなくてよい）

**ブランドサイト（/brand/）**

- **明朝体**: **VDL V7明朝**（`vdl-v7mincho`／Adobe Fonts）。**和文本文・見出し・ボタンまですべて明朝で組む**
- モリサワ／VDL 系の直線的な明朝で、黒地に白抜きしたときに細部が飛ばない

### 3.2 欧文フォント

- **実務サイト**: 欧文専用の指定はない。和文スタックの `sans-serif` にフォールバックする
- **ブランドサイト**: **IvyMode**（`ivymode`／Adobe Fonts）。**ナビ・ラベル・ボタンの欧文はすべてこれのイタリック**
  - `BRAND TOP` `PRODUCT` `MOVIE` `PROJECT`（18px / weight 300 / **ls 0.12em**）
  - `BRAND MOVIE`（12px / **ls 0.5em**）
  - `More PRODUCT`（13px / ls 0.1em）
- 等幅フォントの指定はない

### 3.3 font-family 指定

```css
/* 実務サイト（予約・運賃・時刻表） */
font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
             メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;

/* ブランドサイト 和文（/brand/） */
font-family: vdl-v7mincho, sans-serif;   /* Adobe Fonts */

/* ブランドサイト 欧文（/brand/） */
font-family: ivymode, sans-serif;        /* Adobe Fonts。原則 italic */

/* 実務サイトはグローバルに */
letter-spacing: normal;
font-feature-settings: normal;
```

**フォールバックの考え方**:

- 実務サイトは **和文優先・OS フォントのみ**。予約導線の表示速度を落とさないための判断
- ブランドサイトは **Adobe Fonts の 2 書体（和文明朝＋欧文サンセリフ）だけ**。フォールバックは `sans-serif` 1 段しか用意していない。**ライセンスの効かない環境では明朝が消えてゴシックに落ちる**ので、自前実装では和文のフォールバックに游明朝・ヒラギノ明朝を足すこと

### 3.4 文字サイズ・ウェイト階層

#### 実務サイト

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Section Head | **28px** | 400 | **1.0 (28px)** | normal | 「運賃」「航空券＋ホテル」。**行間を詰めきる** |
| Section Head (2行) | 28px | 400 | 1.3 (36.4px) | normal | 折り返しがある見出しだけ 1.3 |
| Sub Head | 20px | 400 | 1.5 (30px) | normal | 黒地の上の見出し |
| Card Title | 18px | 400 | 1.5 (27px) | normal | バナー・特集の見出し |
| Body | **14px** | 400 | **1.5 (21px)** | normal | `body` 既定。色 `#333333` |
| Lead | 18px | 400 | 1.5 (27px) | normal | 説明文 |
| Nav | 14px | 400 | 1.0 (14px) | normal | グローバルナビ |
| Rail Label | 12px | 400 | 1.5 (18px) | normal | 左サイドレールの 2 行ラベル |
| Table Head | 12px | 400 | 1.5 (18px) | normal | 色は平日 `#333` / 日曜 `#990000` / 土曜 `#003399` |
| Badge | 12px | 400 | 1.0 (12px) | normal | `#e6e6e6` の面 |
| Label Badge | **10px** | **700** | 1.5 (15px) | normal | `#990000` の面に白文字。**サイトで唯一の 700** |
| Form | 13px | 400 | 1.15 (14.95px) | normal | セレクト・入力欄 |

- **`font-weight` は原則 400 のみ**。700 が出るのは `#990000` のラベルバッジだけ
- **見出しの階層は 28 → 20 → 18 → 14 の 4 段**。太さで差をつけず、サイズと色（黒地／白地）だけで階層を作る

#### ブランドサイト（/brand/）

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Nav | IvyMode *italic* | 18px | 300 | 1.0 (18px) | **0.12em (2.16px)** |
| Overline | IvyMode | 12px | 300 | 1.0 (12px) | **0.5em (6px)** |
| Catch | VDL V7明朝 | 20px | 500 | 1.0 (20px) | 0.12em (2.4px) |
| Copy | VDL V7明朝 | 18px | 300 | **2.5 (45px)** | 0.1em (1.8px) |
| Body | VDL V7明朝 | 13px | 300 | **1.92 (25px)** | 0.1em (1.3px) |
| Small / Link | VDL V7明朝 | 12px | 300 | **2.0 (24px)** | normal |
| Button | IvyMode | 13px | 300 | 1.0 | 0.1em (1.3px) |
| Copyright | IvyMode | 10px | 300 | 1.0 | 0.05em (0.5px) |

- **weight 300 が基本**。明朝の細さで「軽さ」を作る
- **行間が 1.9〜2.5 と極端に広い**。黒地に白抜きの明朝は行間を詰めると潰れるため

### 3.5 行間・字間

- **実務サイトの本文は 1.5（14px→21px）**。日本語サイトとしてはやや詰まった、情報密度優先の設定
- **実務サイトの見出しは 1.0**（28px→28px）。行間をゼロ詰めにして塊として見せる
- **ブランドサイトの本文は 1.92〜2.5**。同じブランドで本文の行間が 1.5 と 2.5 に分かれる
- **字間は実務サイト `normal` / ブランドサイト 0.1〜0.5em**。混ぜない
- `palt` はどちらでも使わない

**ガイドライン**:

- 予約フローや運賃表を作るときは **14px / 1.5 / ls normal** を守る。字間を開くと表が横に伸びて折り返しが増える
- ブランド訴求のページを作るときは **明朝 / weight 300 / lh 2.0 / ls 0.1em** に切り替える。**この 2 モードの中間を作らない**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:

- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 「羽田（東京）⇔ 北九州」のように**空港名を丸括弧で受ける表記が頻出**する。`word-break: break-all` にすると括弧が行頭に来るため使わない
- 運賃の「11,660円〜」は**数字と単位と波ダッシュを分割させない**。`white-space: nowrap` を掛ける

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* 全ページ共通。palt は使わない */
```

- **`palt` を掛けない**。実務サイトは等幅のまま表組みの桁を揃えるため、ブランドサイトは `letter-spacing` で明示的に開くため
- ブランドサイトで字間を作るのは `letter-spacing` の役目であり、`palt` で詰めてから開き直す設計にはなっていない

### 3.8 縦書き

- 該当なし。実務サイト・ブランドサイトとも横組み

---

## 4. Component Stylings

> **radius は 3px が既定**。2px（ヘッダー CTA）と 5px（一部の黒ボタン）が例外的に混ざる。

### Buttons

**Primary（ダークレッド塗り）— 唯一の有彩色 CTA**

- Background: `#990000`
- Text: `#ffffff`
- Border: `1px solid #990000`
- Border Radius: **`2px`**
- Font: 12px / weight 400 / lh 1.0 / ls normal
- 例: 「マイレージ会員に入会する」（ヘッダー右上）

**Secondary（白ボタン）— ヘッダーの対の CTA**

- Background: `#ffffff`
- Text: `#333333`
- Border: `1px solid #ffffff`
- Border Radius: `2px`
- Font: 12px / weight 400
- 例: 「ログイン」

**Tertiary（白地の線ボタン）— 本文中の主要導線**

- Background: `#ffffff`
- Text: `#000000` / `#333333`
- Border: `1px solid #d1d1d1`
- Border Radius: `3px`
- Padding: `10px 25px`
- Font: 14px / weight 400 / lh 1.5
- 例: 「運賃一覧へ」「キャンペーン一覧へ」

**Ghost（黒地の上）**

- Background: `transparent`
- Text: `#cccccc`
- Border: `1px solid #666666`
- Border Radius: `3px`
- Padding: `10px 25px` / `0 10px 0 5px`
- 例: 濃色セクション内のリンクボタン

**Black（塗り）**

- Background: `#000000`
- Text: `#ffffff`
- Border Radius: `3px`（小さいものは `5px`）
- Padding: `5px` / `10px 25px` / `0 25px`
- Font: 12〜18px / weight 400

**Brand Site（ゴーストの角ボタン）**

- Background: `transparent`
- Border: **`1px solid #ffffff`** / Border Radius: **`0`**
- Size: **250 × 50px 固定**（下部の大型は 350 × 65px）
- Label: **子要素の `<span>` に置く**（IvyMode 13px / ls 0.1em / `#ffffff`）
- 白帯の上では `1px solid #000000` ＋ 黒文字に反転する
- **radius を持たない唯一のボタン**。ブランドサイトだけ角を立てる

### Badges / Tags

**Gray Badge**

- Background: `#e6e6e6` / Text: `#000000`
- Border Radius: `0` / Padding: `3px 10px 4px`
- Font: 12px / weight 400 / lh 1.0
- 例: 「マイレージ」「インフォメーション」

**Red Label**

- Background: `#990000` / Text: `#ffffff`
- Border Radius: `0`
- Font: **10px / weight 700** / lh 1.5

### Inputs

- Background: `#ffffff`
- Border: `1px solid #cccccc`
- Border Radius: `3px`
- Padding: `0 17px 0 10px`
- Height: **42px**
- Font: 13px / weight 400
- Text: `#000000`
- セレクトも同じ寸法で揃える（`select` の右パディング 17px は矢印の逃げ）
- 濃色パネル（`#40494f`）の上に置く入力欄も**面は白のまま**。反転させない

### Tables（運賃表・時刻表・カレンダー）

- Border: 罫は `#cccccc` 系の 1px
- Header: 12px / weight 400 / lh 1.5
  - 平日 `#333333` ／ **日曜 `#990000`** ／ **土曜 `#003399`**
- Cell Tint: **日曜列 `#faf2f2` ／ 土曜列 `#f1f4fa`**
- 金額は 14〜18px の `#990000`、単位（円〜）だけ小さく落とす

### Cards（キャンペーン・特集バナー）

- Background: `transparent`（親セクションの面色を透かす）
- Border Radius: `0`（**画像は角丸なしの矩形**）
- 構成: 画像 → `▸` 付きのタイトル（18px）→ 説明（14px / lh 1.5）
- Shadow: なし

### Sections（面色の使い分け）

| セクション | 面色 | 文字色 |
|-----------|------|--------|
| ヘッダー | `#000000` | `#ffffff` |
| 左サイドレール | `#000000` | `#ffffff` |
| コンテンツ本体 | `#ffffff` | `#333333` |
| 薄面セクション（CSR / 法人契約） | `#f2f2f2` | `#333333` |
| 濃色セクション（キャンペーン） | `#1e1e1e` | `#ffffff` |
| 予約フォーム | `#40494f` | `#ffffff` |
| 運航状況フォーム | `#27384d` | `#ffffff` |
| フッター | `#000000` | `#ffffff` |
| ブランドサイト全体 | `#000000` | `#ffffff` |

---

## 5. Layout Principles

### Spacing Scale

CSS 変数はない。実測から起こすと 5 / 10 / 25 / 40 / 80px の系列。

| Token | Value | 用途 |
|-------|-------|------|
| XS | 5px | ボタン内側の最小パディング |
| S | 10px | 入力欄の左パディング、ボタン上下 |
| M | 25px | ボタン左右 |
| L | 40px | ブロック間 |
| XL | 80px | セクション間 |

### Container

- **セクション幅**: **1000px**（`tp-section` / `l-content-related` / `l-footer-inner`）
- **カルーセル幅**: 1020px（左右に 10px はみ出す）
- **フォーム幅**: 755px
- **左サイドレール**: 90px 固定。コンテンツはその右に寄る
- Padding (horizontal): 10〜25px

### Grid

- 運賃セクションは 2 カラム（左右に 3 行ずつ）＋ 右にバナー 1 列の変則 3 分割
- 特集バナーは 3 カラム（画像 → タイトル → 説明の縦積み）
- Gutter: 20〜40px
- **画像は角丸なし**。矩形のまま並べる

---

## 6. Depth & Elevation

**ほぼフラット。影は「浮かせる」ためではなく「クロムの境界を締める」ために使う。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。カード・ボタン・テーブルすべて |
| 1 | `0 0 2px rgba(119,119,119,1)` | ヘッダー（`#000` の下端をわずかに立てる） |
| 2 | `0 0 2px rgba(68,68,68,1)` | 左サイドレールの背景 |
| 3 | `2px 0 6px -1px rgba(0,0,0,0.2)` | 追従レールの右エッジ |

- **コンテンツ側には影を一切落とさない**。奥行きは **黒 `#000000` → `#1e1e1e` → `#f2f2f2` → `#ffffff`** の面のコントラストで作る
- ブランドサイトは影ゼロ。黒地とグラデーションの雲だけで奥行きを出す

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` の地色を黒 `#000000` にし、その上に白いコンテンツ面を置く**
- ヘッダー・左サイドレール・フッターを黒で統一し、**外枠が常に黒く見える**ようにする
- **有彩色は `#990000` だけ**に絞る。CTA・金額・日曜列に使う
- `border-radius: 3px` を既定にする（ヘッダー CTA だけ 2px）
- リンクの頭に **`▸` の三角マーカー**を置く
- 実務ページは **14px / lh 1.5 / ls normal / ヒラギノ角ゴ Pro** で組む
- ブランドページは **VDL V7明朝 ＋ IvyMode イタリック / weight 300 / lh 2.0 / ls 0.1em** に切り替える
- 入力欄・セレクトは **高さ 42px / 1px solid #cccccc / radius 3px** で揃える
- カレンダーと運賃表は**日曜 `#faf2f2` / 土曜 `#f1f4fa`** で列を塗り分ける
- ブランドサイトのボタンは**枠だけ・角 radius 0・250×50px**にする

### Don't（禁止）

- **`#990000` を明るい赤に振らない**（`#cc0000` `#e60012` は別ブランドの色になる）
- **実務サイトに `letter-spacing` を入れない**。表の桁が崩れる
- **ブランドサイトの字間を詰めない**。0.1em を下回ると明朝の白抜きが潰れる
- 2 つのモード（ゴシック実務／明朝ブランド）を**同じページで混ぜない**
- `palt` を掛けない
- 画像に `border-radius` を付けない
- コンテンツ領域に影を落とさない
- ヒラギノを **ProN** と書かない（**Pro**、しかも `"ヒラギノ角ゴ Pro W3"` のウェイト名込み表記）
- ブランドサイトのボタンで、**ラベルを `<a>` 直下のテキストノードに置かない**（実サイトは `<span>` に入れて色を当てている。`<a>` 自身の `color` は UA 既定のまま残る）

---

## 8. Responsive Behavior

### Breakpoints

実サイトは断点が多い。主要なものは以下。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。左サイドレールは下部固定のタブへ変わる |
| Tablet | 768–1024px | 2 カラム。ナビは折り返し |
| Small Desktop | 1025–1200px | セクション 1000px を維持しつつ左右パディングを詰める |
| Desktop | 1201–1365px | 標準 |
| Wide | ≥ 1366px | 標準（`min-width: 1366px` で追加調整） |

- 補助的に 900px / 950px / 1100px / 1150px の断点も使われている
- `print, screen and (min-width: 768px)` のように**印刷を PC レイアウトに寄せる**指定がある。予約確認・搭乗券の印刷を想定した設計

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- 入力欄・セレクトは **42px**。モバイルでは 44px 以上に引き上げること
- 線ボタンは `padding: 10px 25px` + 14px 行で 41px 相当。モバイルでは上下 12px に上げる
- 左サイドレールの各項目はアイコン＋2 行で 68px 程度あり、そのままで足りる

### フォントサイズの調整

- 本文 14px は据え置き（**モバイルでも下げない**。すでに小さい）
- Section Head 28px → 20〜22px に縮小し、**行間は 1.0 のまま**維持する
- 運賃の金額は 18px 以上を保つ（**モバイルで最も読ませたい数字**）
- ブランドサイトの `letter-spacing: 0.5em` はモバイルで 0.3em 程度まで詰めてよい（横幅が足りなくなるため）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Page Background: #000000 （body そのもの。白はこの上に載る面）
Content Surface: #ffffff
Dark Section:    #1e1e1e （キャンペーン） / #40494f（予約フォーム） / #27384d（運航状況）
Panel:           #f2f2f2 （薄面セクション） / #e6e6e6（バッジ）
Accent:          #990000 （唯一の有彩色。CTA・金額・日曜列）
Text:            #333333（白地） / #ffffff（黒地） / #cccccc（黒地の補助）
Border:          #d1d1d1（白ボタン） / #cccccc（入力欄） / #666666（黒地のゴースト）
Table Tint:      #faf2f2（日曜） / #f1f4fa（土曜） / #003399（土曜の見出し文字）

JP Font (実務):  "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
                 メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif
JP Font (brand): vdl-v7mincho, sans-serif        ← Adobe Fonts / 明朝
EN Font (brand): ivymode, sans-serif（italic）    ← Adobe Fonts

Body Size:       14px / weight 400 / lh 1.5（21px） / ls normal
Section Head:    28px / weight 400 / lh 1.0（28px） / ls normal
Brand Copy:      18px / weight 300 / lh 2.5（45px） / ls 0.1em（明朝）
Weight:          400 のみ（700 は #990000 のラベルバッジだけ）
Letter Spacing:  normal（実務） / 0.1〜0.5em（ブランド）
Feature:         font-feature-settings: normal（palt を使わない）
Radius:          3px（既定） / 2px（ヘッダー CTA） / 0（ブランドのボタン・画像）
Shadow:          コンテンツには無し。ヘッダー 0 0 2px #777、レール 2px 0 6px -1px rgba(0,0,0,.2)
Container:       1000px（セクション） / 1020px（カルーセル） / 755px（フォーム）
Side Rail:       90px 固定・左に追従
Input:           高さ 42px / 1px solid #cccccc / radius 3px / 13px
```

### プロンプト例

```
STARFLYER のデザインシステムに従って、国内線の運賃一覧ページを作成してください。
- body の地色は黒 #000000。その上に幅 1000px の白 #ffffff のコンテンツ面を置く
- ヘッダー・左サイドレール（幅 90px・追従）・フッターはすべて黒 #000000 に白文字
- 和文は "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", メイリオ… の OS フォントスタック
- 本文 14px / weight 400 / line-height 1.5 / letter-spacing normal（字間を開けない）
- セクション見出しは 28px / weight 400 / line-height 1.0（行間を詰めきる）
- 有彩色は #990000 だけ。運賃の金額と「マイレージ会員に入会する」CTA にのみ使う
  CTA は #990000 の塗り・白文字・border-radius 2px
- 本文中のボタンは白面 + 1px solid #d1d1d1 + radius 3px + padding 10px 25px
- 運賃表は日曜列を #faf2f2、土曜列を #f1f4fa で塗り、見出しの文字色を
  日曜 #990000 / 土曜 #003399 にする
- リンクの頭にはすべて ▸ の三角マーカーを置く
- 入力欄とセレクトは高さ 42px / 1px solid #cccccc / radius 3px / 13px で揃える
- font-feature-settings は使わない（palt なし）。画像に border-radius を付けない
- 影はコンテンツに落とさない。ヘッダーだけ 0 0 2px #777777
```

```
STARFLYER のブランドサイト（/brand/）のトーンで、機内サービスの紹介ページを作成してください。
- 全面黒 #000000、文字は白 #ffffff の 1 色のみ
- 和文は vdl-v7mincho（VDL V7明朝／Adobe Fonts）、欧文は ivymode の italic
- 本文 13px / weight 300 / line-height 1.92 / letter-spacing 0.1em
- リードコピーは 18px / weight 300 / line-height 2.5 / letter-spacing 0.1em
- 欧文のナビは 18px / weight 300 / letter-spacing 0.12em、オーバーラインは 12px / 0.5em
- ボタンは 250×50px の枠だけ（1px solid #ffffff、border-radius 0）。ラベルは
  <span> に入れて ivymode 13px / letter-spacing 0.1em で白に指定する
- 影を一切使わない。実務サイトのゴシック・radius 3px のルールをここに持ち込まない
```
