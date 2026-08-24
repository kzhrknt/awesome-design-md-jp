# DESIGN.md — シャトレーゼ（CHATERAISE）

> シャトレーゼ（https://www.chateraise.co.jp/）のデザイン仕様書。
> 山梨発、洋菓子・和菓子・アイスを「工場直売」で売る**菓子ブランドの EC ＋ 店舗案内サイト**。
> **`font-feature-settings: "palt"` がサイト全体に効いている**。`body` から継承され、見出し・本文・ナビ・フッターまで**全要素が詰め組み**。本サイト集の中でも珍しい「本文まで palt」型
> **書体が `ヒラギノ角ゴ Pro W6` 先頭**。`ProN` ではなく **`Pro`**、しかも**ウェイト付きのフォント名を先頭に置く**。つまり **`font-weight: 400` の本文でも実際は W6（Semibold）相当で表示される**
> **特集見出しだけ `font-family: serif` の 1 語**。和文フォント名を書かず generic family に丸投げしており、**macOS ではヒラギノ明朝、Windows では MS 明朝に化ける**
> **色はワインレッドの 2 段構え**。見出し `#551937`（深いプラム）とリンク・タグ `#aa0046`（クリムゾン）。**CTA の面だけブラウン `#5a2d14`**
> 実サイトの computed style 実測（2026-08-24 取得。トップ ＋ `/ec/`）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **生成りの地にワインレッドの線**。面を強く塗らず、**細い罫のピル**と**極小の角丸バッジ**を積み重ねる。写真（ケーキ）が主役なので、UI 側は彩度を抑えたベージュ〜クリームで支える
- **シャトレーゼについて**: 「工場直売」「Web 予約・店舗受取」「オンラインショップ」の 3 導線が並立する。**通販と店舗のどちらの話をしているかをタグ（`#通販` `#店舗`）で常時示す**のが情報設計の核
- **密度**: **高い**。`body` が 14px、タグ・バッジが 10〜13px。1 画面に特集バナー・ホットキーワード・カード一覧が同居する
- **キーワード**: 全域 `palt`、`ヒラギノ角ゴ Pro W6`、ワインレッド `#551937` / `#aa0046`、ブラウンのピル `#5a2d14`、クリーム `#fffdf7`、黄色いマーカー線
- **特徴**:
  - **`palt` が `body` から全継承**されている。**日本語サイトで本文にまで `palt` を当てる例は少数派**。商品名・キャッチが詰まって見えるのはこのため
  - **`ヒラギノ角ゴ Pro W6` を font-family の先頭に置く**。ウェイト指定ではなくフォント名で太さを決めている。**`font-weight: 400` と `700` の見た目の差が小さい**
  - **`Pro`（`ProN` ではない）**。JIS90 字形。Mr. CHEESECAKE や note の `ProN` 系とは字形が違う
  - **`border-radius` が 7 段階**（`0` / `2px` / `4px` / `9px` / `10px` / `30px` / `100px`）。**タグは 2px の「ほぼ直角」、ボタンは 30px のピル**とはっきり使い分ける
  - **マーカー線がグラデーションで実装されている**：`linear-gradient(transparent 80%, #ffda6a 20%)`。**下 20% だけ黄色く塗る蛍光ペン**
  - **特集見出しの font-family が `serif` の 1 語だけ**。和文明朝の指定がなく **OS 依存**（後述の Don't 参照）
  - **タグの色分けが情報の種類を表す**：`#通販` = 青 `#83b7d8`、`#店舗` = ピンク `#e397ac`、`#グループ` = マゼンタ `#b74674`
  - **影が極端に薄い**（`rgba(0,0,0,0.03) 0 1px 3px` / `rgba(37,28,41,0.06) 0 4px 12px`）。**影の色に紫みのある `rgb(37,28,41)` を使う**

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `html`）。ただし**主要セクションはクリーム `#fffdf7` で塗られている**。

### Brand（ブランド）

- **Plum** (`#551937`, rgb 85,25,55): **主色**。見出し（h2 / h3）、ナビの太字項目、メガメニューの小見出し。**深いプラム**
- **Crimson** (`#aa0046`, rgb 170,0,70): **リンク・タグ・アウトライン CTA の文字色と罫**。Plum より明るく彩度が高い
- **Magenta Deep** (`#8d075c`, rgb 141,7,92): **「Web予約する」「一覧を見る」ボタンの 1px 罫**。Crimson の文字に対して罫だけ紫寄りにする
- **Brown** (`#5a2d14`, rgb 90,45,20): **「オンラインショップ」ピルの面**（白文字）。**唯一の塗り CTA**

### Accent（アクセント・タグ）

| タグ | 色 | rgb | 意味 |
|------|-----|-----|------|
| `#通販` | **`#83b7d8`** | 131,183,216 | 通販の話題（青） |
| `#店舗` | **`#e397ac`** | 227,151,172 | 店舗の話題（ピンク） |
| `#グループ` | **`#b74674`** | 183,70,116 | グループブランドの話題（マゼンタ） |
| マーカー | **`#ffda6a`** | 255,218,106 | 強調の蛍光ペン線 |

### Neutral（ニュートラル）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| 文字（主） | **`#121212`** | 18,18,18 | `body` の既定色・本文・ナビ |
| 面（濃） | **`#121212`** | 18,18,18 | 「とじる」帯・重要告知の面（白文字） |

### Surface（面色）

| 面 | 色 | rgb | 用途 |
|----|-----|-----|------|
| 灰 | **`#f5f5f5`** | 245,245,245 | ホットキーワードのチップの面。**最頻（34 回）** |
| ベージュ | **`#f0ebde`** | 240,235,222 | メガメニューのカテゴリ帯 |
| クリーム | **`#fffdf7`** | 255,253,247 | **主要セクションの面。地の白よりわずかに黄み** |
| 生成り | **`#f8f2eb`** | 248,242,235 | SNS ブロックの面 |
| 罫（淡） | **`#f0efec`** | 240,239,236 | `LIMITED` / `TOPICS` バッジの 1px 罫 |
| 淡赤 | **`#fceded`** | 252,237,237 | 「移動中や夜に…」の悩みブロック |
| 告知グラデ | **`linear-gradient(140deg, #fffaeb 10%, #fff3eb 60%, …)`** | — | 「お知らせ NEWS」ブロックの面 |

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **ヒラギノ角ゴ Pro W6** → Hiragino Kaku Gothic Pro → ヒラギノ角ゴ ProN → Hiragino Sans → メイリオ
- **明朝体**: **指定なし**（generic `serif` に丸投げ。特集見出しのみ）

### 3.2 欧文フォント

- **サンセリフ**: Helvetica Neue → Arial（和文の**あと**に置かれている）
- **等幅**: 指定なし

### 3.3 font-family 指定

```css
/* 本文・見出し・ナビ・フッター（body から全継承） */
font-family: "ヒラギノ角ゴ Pro W6", "Hiragino Kaku Gothic Pro",
             "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
             "Hiragino Sans", Meiryo, sans-serif;

/* 特集見出し（h2 / 一部 h3）— 実サイトはこの 1 語だけ */
font-family: serif;
```

**フォールバックの考え方**:
- **先頭が `ヒラギノ角ゴ Pro W6`**。**ウェイトをフォント名で固定している**ため、macOS では `font-weight: 400` でも W6（Semibold）で描画される。**Windows ではメイリオ Regular に落ちるので、太さの印象が大きく変わる**
- **`Pro`（JIS90）と `ProN`（JIS2004）を両方並べる**という珍しい構成。`Pro` を先、`ProN` を後に置いている
- **欧文（Helvetica Neue / Arial）が和文より後ろ**。数字・アルファベットもヒラギノの欧文グリフで出る
- **`serif` 1 語の指定は環境依存**（macOS = ヒラギノ明朝 ProN、Windows = MS 明朝、Android = Noto Serif）。**再現時は明示的な和文明朝スタックに置き換える**（下の Don't 参照）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero (h2) | **serif** | **31px** | **400** | 46.5px (1.5) | **2px (0.065em)** | 「シャトレーゼ会員になると…」白文字 |
| Feature (h2) | **serif** | 32px | 700 | 48px (1.5) | 0.4px (0.0125em) | 「SNS・ニュース更新中」。色 `#551937` |
| Section (h2) | **serif** | 24px | 700 | 36px (1.5) | 1px (0.04em) | 「通販おすすめ特集」。色 `#121212` |
| Sub (h3) | **serif** | 24px | 700 | 36px (1.5) | 0.4px | 「素材・製法」。色 `#551937` |
| Sub (h3) | ゴシック | 21px | 400 | 31.5px (1.5) | 0.4px | 汎用の小見出し |
| Brand (h3) | ゴシック | 18px | 700 | 36px (**2.0**) | 0.4px | 「YATSUDOKI」。色 `#551937` |
| Category (h3) | ゴシック | 18px | 700 | 27px (1.5) | 1px (0.055em) | 「新商品」。色 `#551937` |
| Label (h3) | ゴシック | 14px | 700 | 21px (1.5) | 0.4px | 「ホットキーワード」 |
| Menu (h3) | ゴシック | 14px | 700 | 28px (**2.0**) | 0.4px | メガメニュー内。色 `#551937` |
| Lead (h4) | ゴシック | 16px | 400 | 24px (1.5) | 0.4px | 「移動中や夜にお買い物をしたいとき」 |
| Body | ゴシック | **14px** | 400 | 21px (**1.5**) | **0.4px (0.029em)** | `body` の既定。色 `#121212` |
| Body（記事） | ゴシック | 14px | 400 | 25.2px (**1.8**) | 0.4px | 「素材は、おいしさの原点。…」 |
| Body（太） | ゴシック | 14px | 700 | 21px (1.5) | 0.4px | 商品名 |
| Caption | ゴシック | 13px | 400 | 19.5px (1.5) | 0.4px | SNS 案内文 |
| Nav | ゴシック | 14px | 400 | 21px (1.5) | 0.4px | グローバルナビ |
| Nav（太） | ゴシック | 14px | 700 | 21px (1.5) | 0.4px | 「商品・通販」。色 `#551937` |
| Nav（小・太） | ゴシック | 13px | 700 | 19.5px (1.5) | **1px (0.077em)** | メガメニューのカテゴリ |
| Nav（項目） | ゴシック | 14px | 400 | 20.02px (1.43) | 1px | 「敬老の日デコレーション」 |
| Utility | ゴシック | 12px | 400 | 18px (1.5) | 0.4px | ヘッダー最上段「ご利用ガイド」 |
| Tag | ゴシック | 14px | 700 | — | 0.4px | `#アイス` 等。色 `#aa0046` |
| Badge | ゴシック | **10px** | 700 | — | — | `LIMITED` / `TOPICS`。色 `#aa0046` |
| Tag（色付き） | ゴシック | 11px | 700 | — | — | `#通販` `#店舗` `#グループ`。白文字 |

### 3.5 行間・字間

- **本文の行間**: **`1.5`**（14px / 21px）。**記事的な本文だけ `1.8`**（14px / 25.2px）
- **見出しの行間**: **`1.5` で統一**（32px/48px、31px/46.5px、24px/36px、21px/31.5px）
- **例外的に広い行間**: ブランド見出し（18px / 36px = **2.0**）とメガメニュー見出し（14px / 28px = **2.0**）
- **本文の字間**: **`0.4px`（14px に対し ≒ `0.029em`）**。**サイト全体の既定**
- **見出しの字間**: `0.4px` 〜 **`2px`**（ヒーローの 31px 見出し ＝ `0.065em`）
- **メガメニューの字間**: **`1px`**（13px に対し `0.077em` ＝ かなり開く）／一部 `1.5px`

**ガイドライン**:
- **`letter-spacing: 0.4px` は px 指定**。サイズを変えるときは **em に換算**（14px → `0.029em`）
- **`palt` が効いた上に `letter-spacing` を足している**。詰めてから開き直す構成なので、**片方だけ真似すると印象が変わる**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

- 商品名は「【通販限定】8月限定！夏休み福箱！」のように**隅付き括弧と感嘆符が多い**。`palt` と組み合わせると括弧が強く詰まるので、**行頭・行末の禁則を必ず有効にする**
- **行頭禁止**: `）」』】〕〉》、。，．・：；？！`
- **行末禁止**: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* body に指定し、全要素へ継承させる（シャトレーゼの実装） */
font-feature-settings: "palt";
```

- **`palt` をサイト全体に適用している**。`body` / `h2` / `h3` / `h4` / `p` / `a` / `span` / `li` / `nav` / `header` / `footer` の**すべてで `"palt"` を実測**
- **例外は `button` と `input` だけ**（`normal`）。**フォーム要素には詰め組みを適用しない**
- **`palt` ＋ `letter-spacing: 0.4px` の併用**が特徴。詰めたうえで一律に開き直すことで、**括弧まわりだけが詰まり、かな・漢字の字間は保たれる**

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary（ブラウンのピル — 唯一の塗り CTA）**
- Background: **`#5a2d14`**
- Text: `#ffffff`
- Padding: **`9px`**
- Border Radius: **`100px`**
- Font Size: 12px / Weight 400
- 例: 「オンラインショップ」

**Secondary（白のピル ＋ クリムゾンの罫）**
- Background: `#ffffff`
- Text: **`#aa0046`**
- Border: **`1px solid #aa0046`**
- Padding: **`8px 10px`**
- Border Radius: **`30px`**
- Font Size: 14px / Weight 400
- 例: 「新商品」「通販限定詰合せ」

**Secondary Wide（白のピル ＋ マゼンタの罫）**
- Background: `#ffffff`
- Text: `#aa0046`
- Border: **`1px solid #8d075c`**（**文字はクリムゾン、罫はマゼンタ**）
- Padding: **`16px 0 14px`**（左右は幅いっぱい・**上下が非対称**）
- Border Radius: `30px`
- Font Size: 14px / Weight 400
- 例: 「Web予約する」「一覧を見る」

**Nav Pill（白のピル・グローバルナビ）**
- Background: `#ffffff`
- Text: **`#551937`**
- Border: `1px solid #ffffff`
- Padding: **`10px 24px`**
- Border Radius: **`30px`**
- Font Size: 14px / Weight 700
- 例: 「商品・通販」「Web予約・店舗受取」

**Keyword Chip（灰の面・ほぼ直角）**
- Background: **`#f5f5f5`**
- Text: `#aa0046`
- Padding: **`10px 20px`**
- Border Radius: **`2px`**
- Font Size: 14px / Weight 700
- 例: `#アイス` `#チョコバッキー`

**Category Tag（色付きの面・ほぼ直角）**
- Background: `#83b7d8`（通販）／ `#e397ac`（店舗）／ `#b74674`（グループ）
- Text: `#ffffff`
- Padding: **`4px 6px 2px`**（**下だけ狭い非対称**）
- Border Radius: **`2px`**
- Font Size: 11px / Weight 700

**Status Badge（白 ＋ 極淡の罫）**
- Background: `#ffffff`
- Text: `#aa0046`
- Border: **`1px solid #f0efec`**
- Padding: **`4px 23px 4px 25px`**（**左右が非対称**）
- Border Radius: **`10px`**
- Font Size: **10px** / Weight 700
- 例: `LIMITED` `TOPICS`

**Menu Category Bar（ベージュの帯）**
- Background: **`#f0ebde`**
- Text: `#551937`
- Padding: `11px 0 10px`
- Border Radius: **`0px`**
- Font Size: 13px / Weight 700

### Marker（強調の蛍光ペン線）

```css
.marker {
  background-image: linear-gradient(transparent 80%, #ffda6a 20%);
  color: #aa0046;
  font-size: 16px;
}
```

**下 20% だけを黄色 `#ffda6a` で塗る**。文字色はクリムゾン `#aa0046`。

### Inputs

- Background: `#ffffff`
- Border: **なし**（`0px none`）
- Border Radius: **`30px`**（**ピル型の検索窓**）
- Padding: **`0 15px`**
- Font Size: 12px
- **`font-feature-settings` は `normal`**（`palt` を継承させない）

### Cards

- Background: `#ffffff`
- Border: なし
- Border Radius: **`9px`**（お知らせカード）／`4px`（メニュー項目）
- Padding: **`11px`**
- Shadow: `rgba(0,0,0,0.03) 0 1px 3px` ／ `rgba(37,28,41,0.06) 0 4px 12px`

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 2px | タグの下パディング |
| S | 4–6px | タグの内側 |
| M | 9–11px | ピル CTA・カードの内側 |
| L | 15–16px | 入力欄の左右、ボタンの上下 |
| XL | 20–24px | チップ・ナビピルの左右 |

### Container

- Max Width: **1280px**（1440px ビューポートで左右に 80px 前後の余白）
- Padding (horizontal): 20px

### Grid

- 特集カード: **3 カラム**
- 商品カード: 4 カラム
- ホットキーワード: 中央揃えのチップ列（折り返し）
- メガメニュー: カテゴリ帯 ＋ 多段リスト

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定（ボタン・タグ・帯） |
| 1 | **`0 1px 3px rgba(0,0,0,0.03)`** | カード。**ほぼ見えない濃度** |
| 2 | **`0 4px 12px rgba(37,28,41,0.06)`** | 浮かせるカード・ドロップダウン。**影の色が紫みの `rgb(37,28,41)`** |

**影は 2 段階だけ、かつ極端に薄い**。階層は主に**面色（`#ffffff` → `#fffdf7` → `#f8f2eb` → `#f5f5f5` → `#f0ebde`）**で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` に `font-feature-settings: "palt"` を指定し、全要素に継承させる**。ただし **`button` / `input` だけは `normal` に戻す**
- **`palt` と `letter-spacing: 0.4px`（≒ `0.029em`）を併用する**。詰めてから一律に開き直すのがシャトレーゼの組み方
- **色は 2 段構えのワインレッドで組む**：見出し `#551937`、リンク・タグ・罫 `#aa0046`。**塗り CTA だけブラウン `#5a2d14`**
- **radius を役割で使い分ける**：ボタン・入力 = `30px`（ピル）／タグ・チップ = `2px`（ほぼ直角）／カード = `9px`／バッジ = `10px`
- **タグの色で情報の種類を示す**：通販 = `#83b7d8`、店舗 = `#e397ac`、グループ = `#b74674`
- **強調は `linear-gradient(transparent 80%, #ffda6a 20%)` のマーカー線**で入れる。太字や色替えより先にこれを使う
- **面はクリーム `#fffdf7` を基調にする**。純白の地に対してわずかに黄みを持たせる
- 影は `0 1px 3px rgba(0,0,0,0.03)` / `0 4px 12px rgba(37,28,41,0.06)` の 2 段階だけ

### Don't（禁止）

- **`font-family: serif` の 1 語で明朝を指定しない**。実サイトはそうなっているが **OS 依存で字形が大きく変わる**。再現時は明示的に書く:
  ```css
  font-family: "Hiragino Mincho ProN", "Yu Mincho", "YuMincho",
               "Noto Serif JP", serif;
  ```
- **`ヒラギノ角ゴ Pro W6` を先頭に置いたまま `font-weight` で太さを作ろうとしない**。フォント名側で W6 が固定されるため、**400 と 700 の差がほとんど出ない**。Windows ではメイリオ Regular に落ちて印象が変わる点も併せて設計する
- **`button` / `input` に `palt` を継承させない**（実サイトも `normal`）。フォームの文字が詰まって読みにくくなる
- **タグをピル（30px）にしない**。タグ・チップは `2px` の「ほぼ直角」が本サイトの型
- **`#551937` と `#aa0046` を混同しない**。前者は見出し・ナビの文字、後者はリンク・タグ・罫
- **濃い影を落とさない**。最大でも `rgba(37,28,41,0.06)`
- **本文を 14px より小さくしない**（既定が 14px と既に小さい）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。メガメニューはドロワー（`とじる` 帯 `#121212`） |
| Tablet | 768–1023px | カード 2 カラム |
| Desktop | ≥ 1024px | カード 3〜4 カラム ＋ グローバルナビのピル展開 |

### タッチターゲット

- 最小 44px × 44px。**ナビピル（padding `10px 24px` ＋ 14px）で確保**
- **カテゴリタグ（11px / padding `4px 6px 2px`）はタップ対象にしない**

### フォントサイズの調整

- 特集見出し 32px → **20px**
- セクション見出し 24px → **18px**
- 本文 14px は**据え置き**（これ以上小さくしない）
- **ナビの `letter-spacing: 1px` はモバイルでは `0.4px` に揃える**
- モバイルでは**下部に「オンラインショップ」の追従ピル**を置く

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Heading Color: #551937   /* 深いプラム */
Link / Tag:    #aa0046   /* クリムゾン */
Button Border: #8d075c   /* マゼンタ（罫だけ） */
Fill CTA:      #5a2d14   /* ブラウン。唯一の塗り */
Text Color:    #121212
Background:    #ffffff（セクションは #fffdf7）
Surface:       #f5f5f5 / #f0ebde / #f8f2eb
Tags:          #83b7d8（通販）/ #e397ac（店舗）/ #b74674（グループ）
Marker:        linear-gradient(transparent 80%, #ffda6a 20%)
Font:          "ヒラギノ角ゴ Pro W6", "Hiragino Kaku Gothic Pro", "Helvetica Neue",
               Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
Serif:         "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif  /* 特集見出し */
Body Size:     14px / 400 / line-height 1.5 / letter-spacing 0.029em
palt:          body に "palt"（button / input だけ normal）
Radius:        30px（ボタン・入力）/ 2px（タグ）/ 9px（カード）/ 10px（バッジ）
Shadow:        0 1px 3px rgba(0,0,0,.03) / 0 4px 12px rgba(37,28,41,.06)
```

### プロンプト例

```
シャトレーゼのデザインシステムに従って、季節フェアの特集ページを作成してください。

- body に font-feature-settings: "palt" を指定し全体へ継承させる。
  ただし button と input だけ normal に戻す
- 本文フォントは
  "ヒラギノ角ゴ Pro W6", "Hiragino Kaku Gothic Pro", "Helvetica Neue", Arial,
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
  本文は 14px / 400 / line-height 1.5 / letter-spacing 0.029em / #121212
- 特集見出しは明朝で 24px / 700 / line-height 1.5 / letter-spacing 0.04em / #551937
  明朝は "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif と明示する
- セクションの面はクリーム #fffdf7。カードは白 ＋ radius 9px ＋
  box-shadow: 0 4px 12px rgba(37,28,41,.06)
- 「オンラインショップ」CTA は #5a2d14 の塗り ＋ 白文字 12px ＋ radius 100px ＋ padding 9px
- 「一覧を見る」は 白地 ＋ 文字 #aa0046 ＋ border 1px solid #8d075c ＋ radius 30px ＋
  padding 16px 0 14px
- ホットキーワードのチップは #f5f5f5 の面 ＋ 文字 #aa0046 14px/700 ＋ radius 2px ＋ padding 10px 20px
- 商品カードには #通販（#83b7d8）/ #店舗（#e397ac）のタグを白文字 11px/700 ＋ radius 2px で付ける
- 強調は linear-gradient(transparent 80%, #ffda6a 20%) のマーカー線で入れる
- 影は最大でも rgba(37,28,41,.06)。濃い影は使わない
```
