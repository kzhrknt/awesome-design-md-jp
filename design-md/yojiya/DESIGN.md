# DESIGN.md — よーじや（よーじやグループ）

> よーじやグループ（https://www.yojiya.co.jp/）のデザイン仕様書。
> 明治 37 年創業、京都のあぶらとり紙で知られる。**「みんなが喜ぶ京都にする」**をビジョンに掲げるグループのコーポレートサイト。
> **縦書きが構造として組み込まれている**。ヒーローのコピー（61px）だけでなく、セクションラベル（NEWS／お知らせ）と回遊カードの見出し（28.8px）も `writing-mode: vertical-rl`。**このサイトで縦書きは装飾ではなく、レイアウトの骨格**。
> **角丸を 1 つずつずらす**。回遊カードは 8 枚それぞれ `border-radius` の当たる角が違う（`50px 0 0`、`0 0 50px 50px`、`0 50px 0 0` …）。CSS 中の非対称 radius 宣言は 20 個以上あり、**「全部同じ角丸」はこのサイトの流儀ではない**。
> **影はぼかさない**。`box-shadow: 12px 12px 0 0 #DC878C` / `0 8px 0 #5F5046` のように、**ずらした無地の面**を影の代わりに置く。ぼけた影は `0 0 4px 1px rgba(0,0,0,.08)` の 3 回だけ。
> **色は温かい茶とベージュとサンゴ**。文字色は黒でもグレーでもなく `#5f5046`（CSS 出現 186 回）。ブランドの赤 `#af2e29` は**ハンバーガーメニューの 9×9px の四角 2 つにしか使われていない**。
> フォントは Adobe Fonts の **DNP 秀英角ゴシック銀（`dnp-shuei-gothic-gin-std`）** ＋ **Proxima Nova**。
> 実サイトの computed style 実測（2026-08-30 取得。トップ ＋ 会社案内 `/company` ＋ 店舗一覧 `/archives/shop`）＋ 読み込まれる CSS 340KB の直接集計に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **京都の景色を全画面で見せ、その上に縦組みのコピーを一本通す**。ファーストビューは川と山の写真に「みんなが喜ぶ／京都にする」を 2 行の縦書きで右端に立て、左下に横組みのリードを小さく置く。**縦と横を意図的に交差させる**のがこのサイトの構図
- **よーじやについて**: あぶらとり紙・化粧品の製造小売に加え、カフェ・宿泊・企業向け事業を持つグループ。**商品サイトではなくグループのステートメントサイト**なので、EC 的な要素（価格・カート）を持たない
- **密度**: **低い**。コンテンツ幅は 1000px（1440px ビューポート）、本文の行間は **2.0**（会社案内の長文は **2.25**）。1 画面の情報量は少ない
- **キーワード**: 縦書き、`#5f5046` の茶、ベージュ `#ebe6dc`、サンゴ `#dc878c`、非対称の角丸、ずらした無地の影
- **特徴**:
  - **和文の下に必ず欧文を添える**。`お知らせ / NEWS`、`事業紹介 / BUSINESS`、`店舗一覧 / OUR SHOP`。和文は秀英角ゴシック銀、欧文は Proxima Nova で、**サイズ差ではなく書体差で階層を作る**
  - **`letter-spacing: 0.06em` がサイト全体の既定**（16px に対し 0.96px。CSS 宣言 36 回）。見出しではさらに広げ、ステートメント見出しは **0.16em**（38px に対し 6px）まで開く
  - **ボタンはすべてピル、ただし半径がばらばら**。`999px`（ニュース一覧）、`60px`（採用情報）、`52px`（フッターの大カード）、`30px`（カテゴリチップ）、`20px`（フッターの小ボタン）。**「pill に統一」ではなく「要素の高さに応じて半径を選ぶ」**
  - **`font-feature-settings` の宣言が 0 個**（＝ `palt` を使わない）。字詰めではなく `letter-spacing` で組む
  - **難読漢字にだけ font-family を差し替える**。店舗一覧の「**祇**園」は `font-family: "Hiragino Sans", "Yu Gothic", sans-serif` に切り替えて、示す偏（礻ではなく示）の字形を出している。**Web フォント側の字形が意図と違うとき、その字だけ OS フォントへ逃がす**という実装
  - **ハンバーガーアイコンが唯一の赤**。`.menu_icon_part` の 9×9px の四角 2 つだけが `#af2e29`。ページ全体を見渡してもここにしか赤がない

---

## 2. Color Palette & Roles

> 地は `#ffffff`。トップは `pageBackground.resolved` が `ua-default-canvas`（html / body ともに塗り指定なし）。
> **下層ページで `viewportTopByArea` がベージュ `#ebe6dc` を返すことがあるが、これはフッター上部の面**。コンテンツ領域は白のまま。

### Brand（ブランド）

- **Sumi Brown** (`#5f5046`, rgb 95,80,70): **本文・見出し・ナビ・ボタン文字すべての色**。CSS 出現 **186 回**でサイト最多。**黒（`#000000`）もグレーも一切使わない**
- **Yojiya Coral** (`#dc878c`, rgb 220,135,140): **アクセント**。英字ラベル（NEWS / VALUE 01）、ずらし影の色。CSS 出現 **48 回**
- **Kyo Beige** (`#ebe6dc`, rgb 235,230,220): **面色**。採用情報ボタン、フッターの CTA ボタン、セクションの地。CSS 出現 **29 回**
- **Sakura Pink** (`#e1b9b4`, rgb 225,185,180): **大きな面**（フッターの「店舗一覧 / OUR SHOP」カード、会社案内の代表あいさつブロック）。CSS 出現 **10 回**
- **Beni Red** (`#af2e29`, rgb 175,46,41): **ハンバーガーメニューのアイコン（9×9px × 2）のみ**。CSS 出現 4 回。**面にも文字にも使わない**

### Neutral

| 役割 | 色 | 用途 |
|------|-----|------|
| ページ地 | `#ffffff` | 全ページ共通 |
| 面（ベージュ） | `#ebe6dc` | ボタン・セクションの地 |
| 面（ピンク） | `#e1b9b4` | フッターの大カード・引用ブロック |
| 罫線 | `#beb9af` (rgb 190,185,175) | アウトラインボタン・チップの枠 |
| 日付・補足 | `#8a7c70` (rgb 138,124,112) | ニュース一覧の日付 |
| 写真の上 | `#ffffff` | ヒーローのコピー・リード、回遊カードの見出し |

### ⚠️ ブランド色として拾ってはいけない色

WordPress（ブロックエディタ）を使っているため、`customProperties` に **`--wp--preset--color--*` が 11 色、グラデーションが 12 種類**入っている（`#cf2e2e` / `#ff6900` / `#0693e3` など）。**これらは 1 つも画面に出てこない WordPress の既定パレット**で、`--wp-admin-theme-color: #007cba` も管理画面の色。**`customProperties` を色の出典にしない**こと。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **DNP 秀英角ゴシック銀**（`dnp-shuei-gothic-gin-std`、Adobe Fonts）。フォールバックは `sans-serif` のみ
- **明朝体**: 使用しない
- **例外**: 「祇」など Web フォント側の字形を採りたくない漢字だけ `"Hiragino Sans", "Yu Gothic", sans-serif` に差し替える

> **秀英角ゴシック銀について**: 大日本印刷の秀英体ファミリーのうち、角ゴシックの**細めの系統（銀）**。同ファミリーの「金」より線が細く、和文の中に空気が残る。よーじやの余白の多いレイアウトはこの書体を前提にしている。
> **Adobe Fonts はドメインライセンスのため、この DESIGN.md の preview.html では表示されない**。代替として Google Fonts の **Zen Kaku Gothic New**（`wght 300/400/500/700`）を使う。

### 3.2 欧文フォント

- **サンセリフ**: **Proxima Nova**（`proxima-nova`、Adobe Fonts）。CSS 出現 46 回
- **用途**: 英字のセクションラベル（NEWS / BUSINESS / OUR SHOP / MESSAGE / VALUE 01）、日付、コピーライト
- **等幅**: 指定なし

> Proxima Nova の Google Fonts 代替は **Montserrat**（幾何学サンセリフ）。`wght 300` が使えるので、`OUR SHOP`（45px / 300）のような細い大文字組みも再現できる。

### 3.3 font-family 指定

**和文優先の 2 本立て**。和文と欧文で書体を明確に分ける。

```css
/* 和文（本文・見出し・ナビ・ボタン） */
font-family: dnp-shuei-gothic-gin-std, sans-serif;

/* 欧文（英字ラベル・日付・コピーライト） */
font-family: proxima-nova, sans-serif;

/* 字形を OS フォントへ逃がす例（「祇」園） */
.gi_shimesu { font-family: "Hiragino Sans", "Yu Gothic", sans-serif; }
```

**フォールバックの考え方**:
- 和文と欧文を**同じ要素に混ぜない**。`お知らせ` と `NEWS` は別の要素にして書体を分ける
- 欧文フォントを和文スタックの先頭に置かない（秀英の欧文グリフをそのまま使う場面がない設計）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Copy（縦） | 秀英角ゴシック銀 | 61px | 500 | 61px (1.0) | 4.5px (0.074em) | `writing-mode: vertical-rl` / 白 |
| Hero Lead | 秀英角ゴシック銀 | 17px | 500 | 34px (**2.0**) | 1.5px (0.088em) | 白 |
| Statement H2 | 秀英角ゴシック銀 | 40px | 700 | 56px (1.4) | 4px (0.1em) | 会社案内 |
| Statement H2（英） | Proxima Nova | 40px | 700 | 56px (1.4) | 2.4px (0.06em) | `VISION / MISSION / VALUE` |
| MVV Text | 秀英角ゴシック銀 | 38px | 700 | 57px (1.5) | **6px (0.16em)** | サイト最大の字間 |
| Page H2 | 秀英角ゴシック銀 | 34px | 700 | 47.6〜51px (1.4〜1.5) | 2.04px (0.06em) | 下層見出し |
| Section Label（英・縦） | Proxima Nova | 36px | 600 | 36px (1.0) | 2.16px (0.06em) | `NEWS` / 色 `#dc878c` |
| Card Title（縦） | 秀英角ゴシック銀 | 28.8px | 600 | 37.44px (1.3) | 1.5px (0.052em) | 回遊カード / 白 |
| H3 | 秀英角ゴシック銀 | 24px | 700 | 24px (1.0) | 0.96px (0.04em) | 店舗一覧の都道府県 |
| Body | 秀英角ゴシック銀 | 16px | 400 | 32px (**2.0**) | 0.96px (**0.06em**) | `body` |
| Body（長文） | 秀英角ゴシック銀 | 16px | 400 | 36px (**2.25**) | 0.96px (0.06em) | 会社案内の沿革・説明文 |
| Body（強） | 秀英角ゴシック銀 | 16px | 700 | 32px (2.0) | 0.64px (0.04em) | 店舗名 |
| Footer CTA（英） | Proxima Nova | 45px | **300** | 49.5px (1.1) | 3px (0.067em) | `OUR SHOP` |
| Footer CTA（和） | 秀英角ゴシック銀 | 17px | 500 | 23.8px (1.4) | 2px (**0.118em**) | `店舗一覧` |
| Nav | 秀英角ゴシック銀 | 16px | 700 | 24.96px (1.56) | 1px (0.0625em) | グローバルナビ |
| Nav（サブ） | 秀英角ゴシック銀 | 14px | **300** | 28px (2.0) | 0.96px | ドロワー内の子項目 |
| Label（英・小） | Proxima Nova | 13–14px | 700 | 13–14px (1.0) | 1–2px (0.08〜0.14em) | `MESSAGE` / `VALUE 01` |
| Date | Proxima Nova | 13px | 500 | 13px (1.0) | 1.3px (0.1em) | 色 `#8a7c70` |
| Copyright | Proxima Nova | 11px | 400 | 15.4px (1.4) | 0.7px | — |

**ウェイトは 300 / 400 / 500 / 600 / 700 の 5 段**を使い分ける。特に **300 を積極的に使う**（ドロワーの子項目、`OUR SHOP`）のがこのサイトの特徴。

### 3.5 行間・字間

- **本文の行間**: **2.0**（16px → 32px）。長文セクションは **2.25**（36px）
- **見出しの行間**: **1.0〜1.5**。縦書きの見出しは 1.0（＝字間 0 の行送り）
- **本文の字間**: **`0.06em`**（16px → 0.96px）。CSS 宣言 36 回でサイト既定
- **見出しの字間**: **0.06em 〜 0.16em**。**文字が大きいほど字間を広げる**（38px の MVV で 0.16em）

**ガイドライン**:
- 日本語本文は `letter-spacing: 0.06em` ＋ `line-height: 2.0` をセットで使う。**どちらか片方だけだと、このサイトの間延びした空気にならない**
- 大見出しは `line-height` を 1.0〜1.5 に締め、代わりに `letter-spacing` を開く

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

**行頭禁止**: `）」』】〕〉》、。，．・：；？！`
**行末禁止**: `（「『【〔〈《`

- ヒーローのコピーは **`<span>` を 1 行 = 1 要素にして手で改行**している（`みんなが喜ぶ` / `京都にする`）。縦書きで自動折り返しに任せない

### 3.7 OpenType 機能

```css
/* よーじやは font-feature-settings を一切宣言しない */
font-feature-settings: normal;
```

- **`palt` は使わない**。CSS 全文に `palt` は **0 回**
- 約物のアキは `letter-spacing: 0.06em` に吸収させる設計。**`palt` を後から足すと字間が二重に効いて崩れる**

### 3.8 縦書き

**このサイトの中核**。装飾ではなくレイアウトの骨格として使う。

```css
/* ヒーローのコピー */
.fv_copy_line {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 61px;
  font-weight: 500;
  line-height: 1;            /* 縦書きでは「行の間隔」＝列の間隔 */
  letter-spacing: 0.074em;
  color: #fff;
}

/* セクションラベル（和欧を縦に並べる） */
.top_news_en { writing-mode: vertical-rl; font-family: proxima-nova; font-size: 36px; color: #dc878c; }
.top_news_jp { writing-mode: vertical-rl; font-size: 16px; color: #5f5046; }
```

**縦書きで使う要素**:
- ヒーローのメインコピー（61px / 2 行）
- セクションラベル（`NEWS` ＋ `お知らせ`。英字も縦に流す）
- 回遊カードの見出し（`事業紹介` 28.8px ＋ `BUSINESS` 15px）

**注意点**:
- `text-orientation: mixed` により、**欧文は 90° 回転して縦に流れる**（`NEWS` が横倒しになる）。これは意図した表現。全角回転させたい場合は `upright` を使うが、このサイトは使っていない
- 縦書き要素では `line-height` が**列と列の間隔**になる。1.0 だと列が接するので、**外側の要素の `gap` で間隔を作る**
- 縦書きの高さは親の `height` で決まる。SP（≤ 767px）では横書きに戻す実装が必要

---

## 4. Component Stylings

### Buttons

**Pill（アウトライン）— ニュース一覧の「お知らせ一覧」**

- Background: `#ffffff`
- Text: `#5f5046`
- Border: `1px solid #beb9af`
- Padding: `0 0 0 30px`（右端に矢印の丸を置くため右 padding は 0）
- Border Radius: **`999px`**
- Font Size: 16px / Weight 400 / `letter-spacing: 0.04em`

**Pill（ベージュ塗り）— 採用情報**

- Background: `#ebe6dc`
- Text: `#5f5046`
- Padding: `0 54px 0 20px`
- Border Radius: **`60px`**
- Font Size: 14px / Weight 600 / `letter-spacing: 0.06em`

**Pill（フッターの選択ボタン）**

- Background: `#ebe6dc`（一般のお客さま／企業さま）または `#ffffff`（よーじや／10 そば）
- Padding: `0 16px`
- Border Radius: **`20px`**
- Font Size: 16px / Weight 400

**Chip（ニュースのカテゴリ）**

- Background: `#ffffff`
- Border: `1px solid #beb9af`
- Padding: `0 10px`
- Border Radius: **`30px`**
- Font Size: 12px / Weight 400

> **半径の選び方**: 要素の高さに合わせて `20px` → `30px` → `60px` → `999px` を選ぶ。**すべて `9999px` に統一しない**。

### Card（回遊カード）

**8 枚それぞれ角丸の当たる角が違う**のが最大の特徴。

```css
.top_link_card_img1 { border-radius: 50px 0 0 0; }
.top_link_card_img2 { border-radius: 0 0 50px 50px; }
.top_link_card_img3 { border-radius: 0 50px 0 0; }
.top_link_card_img5 { border-radius: 50px 50px 0 0; }
.top_link_card_img6 { border-radius: 0 0 50px 0; }
.top_link_card_img7 { border-radius: 0 0 0 50px; }
.top_link_card_img8 { border-radius: 0 50px 0 0; }
```

- 見出しは**縦書き**（28.8px / 600 / 白）＋ 英字（15px）
- 写真の上に文字を載せるため、スクリムを敷く

**大カード（フッターの「店舗一覧 / OUR SHOP」）**

- Background: `#e1b9b4`
- Padding: `70px 30px 40px`
- Border Radius: `52px`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #beb9af`
- Border Radius: `30px`（1 行入力） / `20px`（テキストエリア）
- Padding: `12px 20px`
- Font Size: 16px / `letter-spacing: 0.06em`
- Focus: `box-shadow: 0 0 0 2pt #185abc`（実サイトの実装。**フォーカスリングだけブランド外の青**）

---

## 5. Layout Principles

### Spacing Scale

CSS 変数を持たない（WordPress の `--wp--preset--spacing--*` は未使用）。実測から導ける段階は以下。

| Token | Value | 用途 |
|-------|-------|------|
| XS | 7px | チップ間 |
| S | 10–12px | カード内のテキスト間 |
| M | 25px | カード間 |
| L | 34px | ブロック間 |
| XL | 70px | セクション内の上余白（大カードの padding-top） |

### Container

- Max Width: **1000px**（1440px ビューポートでの実測）
- ヒーロー・回遊カードは全幅（100vw）

### Grid

- 回遊カード: 4 カラム × 2 段 / gap `10px 12px`
- ニュース一覧: 1 カラム（横並びのメタ ＋ タイトル）

---

## 6. Depth & Elevation

**ぼかした影をほとんど使わない**。ずらした無地の面を影に見立てる。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定 |
| 1（ずらし・サンゴ） | `12px 12px 0 0 #dc878c` / `13px 13px 0 0 #dc878c` | 写真ブロック・見出しブロックの背後 |
| 2（ずらし・茶） | `0 8px 0 #5f5046` | 押せる要素の立体感 |
| 3（ぼかし） | `0 0 4px 1px rgba(0,0,0,.08)` | ヘッダー固定時のみ（3 回だけ） |

```css
/* このサイトらしい「影」の作り方 */
.block { box-shadow: 12px 12px 0 0 #dc878c; }   /* ぼかさない・ずらすだけ */
```

**`rgba(0,0,0,.2)` のような一般的なドロップシャドウを足さないこと**。ブランドの色面をずらして重ねるのがこのサイトの奥行き表現。

---

## 7. Do's and Don'ts

### Do（推奨）

- **文字色は `#5f5046`**。黒もグレーも使わない
- 本文は `line-height: 2.0` ＋ `letter-spacing: 0.06em` を**必ずセットで**
- 見出しは**大きいほど字間を広げる**（38px なら 0.16em）
- 和文と欧文は**別要素に分けて書体を切り替える**（秀英角ゴシック銀 / Proxima Nova）
- ボタンはピル。ただし**高さに応じて `20px` / `30px` / `60px` / `999px` を選ぶ**
- カードの角丸は**枚ごとにずらす**（`50px` を 1〜2 箇所の角にだけ当てる）
- 影は**ずらした無地の面**（`12px 12px 0 0 #dc878c`）
- 縦書きを使うときは `text-orientation: mixed` ＋ 手動改行

### Don't（禁止）

- **`#af2e29`（赤）を面や文字に使わない**。ハンバーガーアイコンの 9×9px 専用
- **`customProperties` の色を使わない**。`--wp--preset--color--*` は WordPress の既定で、このサイトでは 1 色も使われていない
- **`palt` を有効にしない**。`letter-spacing: 0.06em` と二重に効いて字間が崩れる
- **すべてのボタンを同じ半径に揃えない**。半径のばらつきが設計の一部
- **ぼかした影を足さない**
- 縦書きの中に `line-height: 2.0` を持ち込まない（列間が開きすぎる。縦書きは 1.0）
- 本文に `font-weight: 700` を常用しない（強調は 700、既定は 400、補助は 300）

---

## 8. Responsive Behavior

### Breakpoints

**PC ファースト**。`max-width` で下に落とす。

| Name | Width | 宣言回数 | 説明 |
|------|-------|---------|------|
| Mobile | ≤ 767px | **70** | **主分岐**。縦書きの多くを横書きに戻す |
| Tablet | ≤ 1000px | 7 | コンテナ幅の切り替え |
| Small Desktop | ≤ 1100px | 16 | グローバルナビの折り返し |
| Mobile S | ≤ 480px | 3 | ヒーローのコピーサイズ |

```css
/* 主分岐 */
@media screen and (max-width: 767px) { /* SP */ }
```

### タッチターゲット

- 最小サイズ: 44px × 44px
- 採用情報ボタンは高さ 40px ＋ 上下の余白で 44px を確保

### フォントサイズの調整

- ヒーローのコピー: 61px → SP では 32〜36px 程度
- 本文 16px は SP でも維持（**`line-height: 2.0` も維持する**。ここを詰めると別のサイトになる）
- Statement 見出し 40px → SP 26px 程度
- **SP では回遊カードの縦書きを横書きに戻す**（縦書きのままだとカード高が画面を超える）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text Color:    #5f5046
Accent:        #dc878c
Surface:       #ebe6dc     /* ベージュ */
Surface (大):  #e1b9b4     /* ピンク */
Border:        #beb9af
Sub Text:      #8a7c70
Background:    #ffffff
Font (JP):     dnp-shuei-gothic-gin-std, sans-serif
               → 代替: "Zen Kaku Gothic New", sans-serif
Font (EN):     proxima-nova, sans-serif
               → 代替: "Montserrat", sans-serif
Body Size:     16px
Line Height:   2.0（長文は 2.25）
Letter Spacing: 0.06em
Border Radius: 20 / 30 / 60 / 999px（高さで選ぶ）
Box Shadow:    12px 12px 0 0 #dc878c（ぼかさない）
```

### プロンプト例

```
よーじやのデザインシステムに従って、店舗一覧ページを作成してください。
- 文字色は #5f5046（黒は使わない）、地は #ffffff
- 和文フォント: "Zen Kaku Gothic New", sans-serif
- 欧文フォント: "Montserrat", sans-serif（英字ラベル・日付のみ）
- 本文: 16px / line-height 2.0 / letter-spacing 0.06em
- セクションラベルは「SHOP（Montserrat 36px #dc878c）」と「店舗一覧（16px #5f5046）」を
  writing-mode: vertical-rl で縦に並べる
- カテゴリチップ: 白地 + 1px solid #beb9af + border-radius 30px + 12px
- 一覧ボタン: 白地 + 1px solid #beb9af + border-radius 999px + 右端に丸い矢印
- カードは 4 枚それぞれ違う角に border-radius: 50px を当てる
- 影はぼかさず box-shadow: 12px 12px 0 0 #dc878c
```

### 実装時の落とし穴

- **`letter-spacing: 0.06em` を忘れると、行間 2.0 だけが効いて「間延びしただけ」に見える**。字間と行間はセット
- **縦書き要素の `line-height` を 1.5 以上にしない**。列がばらけて読めなくなる
- **Adobe Fonts（秀英角ゴシック銀 / Proxima Nova）はドメインライセンス**。自分のドメインでは表示されないので、代替フォントを前提に設計する
- 「祇」のように**字形が意図と違う漢字は、その字だけ `"Hiragino Sans", "Yu Gothic"` に逃がす**手が実サイトで使われている
