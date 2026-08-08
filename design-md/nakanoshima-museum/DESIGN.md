# DESIGN.md — 大阪中之島美術館（NAKANOSHIMA MUSEUM OF ART, OSAKA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-08 / 対象: `https://nakka-art.jp/`, `/nakka-news/`

---

## 1. Visual Theme & Atmosphere

2022年開館、遠藤克彦建築研究所による黒い直方体の美術館。サイトも建築と揃えて
**白と黒だけ**でつくられている。有彩色はサイト全体で1つも使われていない
（色があるのは展覧会ポスターの画像だけ）。

- **デザイン方針**: 白地・黒文字・グレーの1px罫。面色は使わない
- **密度**: 低い。960px の版面に、行送り 2.0 で余白を大きく取る
- **キーワード**: 専用書体、両端揃え、約物半角、モノクローム、角丸ゼロ、影ゼロ

**このサイトの特徴的な癖（他サイトと違う点）**

1. **専用書体「NakanoshimaFont」を Light / Medium / Thin の3ウェイトで自前配信**。
   `@font-face` で `.woff` / `.otf` を直接読ませており、Adobe Fonts でも Google Fonts でもない。
   館のVIと同じ骨格の書体をUIにもそのまま使う
2. **`YakuHanJPs`（約物半角）を併載**。`「」（）、。` の左右アキを詰めるための
   専用サブセット書体を、本文書体とは別に読み込んでいる。日本語サイトでここまで
   約物処理を作り込む例は珍しい
3. **`text-align: justify` がリセットで全要素に適用される**。段落だけでなく
   見出し・ナビ・リンクまで両端揃え。組版としての「箱に文字を詰める」思想
4. **`line-break: strict` も同じリセットで全要素に適用**。禁則をブラウザ既定の
   `auto` ではなく厳格モードで効かせている
5. **`font-weight: 500` がリセットの既定値**。専用書体の Light を 500 として扱い、
   太字が要る箇所だけ別ファミリー（`NakanoshimaFont-M`）に**差し替える**。
   ウェイト値ではなくファミリー名で太さを切り替える設計
6. **`line-height: 2` がリセットの既定値**。14px 本文で行送り 28px
7. **`box-shadow` の宣言が CSS 全体で 0 件**。奥行きは 1px の罫線だけでつくる
8. **CTA が枠線のみ**。塗りのボタンは「開催中」バッジ（黒地に白文字）だけで、
   「チケット購入」「オンラインストア」すら `1px solid #808080` の枠線ボタン

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値。すべて hex -->

### Base（基調 — これがほぼ全部）

- **Background** (`#ffffff`): ページ地色
- **Ink** (`#000000`): 本文・見出し・ナビ・リンク。**純黒**
- **On Dark** (`#ffffff`): 黒バッジの上の文字

### Neutral（罫・面）

- **Border Gray** (`#808080`): **このサイトの主役の罫**。枠線ボタン、リスト区切り、
  セクション境界。1px solid で使う
- **Surface Gray** (`#ededed`): 検索パネルの面
- **Surface Light** (`#f7f7f7`): 言語切替の面
- **Divider** (`#cecece`): 検索ボックス内の細い仕切り
- **Text Muted** (`#4d4d4d`): ドロップダウン内のカレント項目

### Accent

**なし。** サイト内に有彩色は存在しない。強調は「黒地に白文字」で行う。

```
有彩色を1色も使わない設計。ブランドカラーを足したくなっても足さない。
展覧会ごとの色は、ポスター画像の中だけで表現する。
```

---

## 3. Typography Rules

### 3.1 和文フォント

**館の専用書体1本。** フォールバックはヒラギノ角ゴ Pro → 游ゴシック → メイリオ。

- **本文・見出し・ナビ（Light 相当）**: `NakanoshimaFont`
- **強調・小見出し（Medium 相当）**: `NakanoshimaFont-M`
- **極細（大見出し・数字）**: `NakanoshimaFont-T`
- **約物の詰め**: `YakuHanJPs`（Light）

```css
@font-face { font-family: 'NakanoshimaFont';
             src: url('font/NakanoshimaFont-Light.woff') format('woff'),
                  url('font/NakanoshimaFont-Light.otf') format('opentype'); }
@font-face { font-family: 'NakanoshimaFont-M';
             src: url('font/NakanoshimaFont-Medium.otf') format('opentype'); }
@font-face { font-family: 'NakanoshimaFont-T';
             src: url('font/NakanoshimaFont-Thin.otf') format('opentype'); }
@font-face { font-family: 'YakuHanJPs'; font-display: swap;
             src: url('font/YakuHanJPs-Light.woff') format('woff'); }
```

**太さをウェイト値で切り替えない。** `font-weight` は全要素 500 のまま固定し、
太くしたいところは `font-family: "NakanoshimaFont-M"` に**書体を差し替える**。
専用書体が可変フォントではなく個別ファイルで配信されているための設計。

### 3.2 欧文フォント

専用の欧文フォントを持たない。**`NakanoshimaFont` の欧文グリフをそのまま使う**。
ロゴの `NAKANOSHIMA MUSEUM OF ART, OSAKA`（`A` の横棒がない特徴的な字形）も同じ書体。

WordPress テーマの名残で Open Sans が読み込まれているが、**実際には1文字も使われていない**
（`document.fonts` は全て `unloaded`）。

### 3.3 font-family 指定

```css
/* リセットで全要素に一括指定 */
html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, li, th, td, ... {
  font-family: "NakanoshimaFont", "Hiragino Kaku Gothic Pro", "Yu Gothic",
               "YuGothic", "Meiryo UI", Meiryo, "MS PGothic", sans-serif;
  font-weight: 500;
  line-height: 2;
  text-align: justify;
  line-break: strict;
  word-break: break-word;
  overflow-wrap: break-word;
}

/* 小見出し・強調 */
.heading-medium { font-family: "NakanoshimaFont-M"; }

/* 極細（大きな数字・大見出し） */
.heading-thin   { font-family: "NakanoshimaFont-T"; }
```

**フォールバックの考え方**:
- **和文優先チェーン**。先頭に専用書体を置き、Mac（ヒラギノ角ゴ **Pro**）→
  Win（游ゴシック / Meiryo UI）→ 旧Win（MS PGothic）の順で落とす
- ヒラギノは **ProN ではなく Pro**。専用書体が読めない環境でも約物の見え方を揃える意図
- **欧文フォントをチェーンに混ぜない**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Site Title | NakanoshimaFont | 28px | 500 | **2.0** (56px) | 0 | ロゴ（h1） |
| Section Head | NakanoshimaFont | 21px | 500 | **2.0** (42px) | 0 | 「協賛企業」 |
| Section Title | NakanoshimaFont | 20px | 500 | **2.0** (40px) | **0.06em** (1.2px) | 「展覧会」「Topics」 |
| Sub Section | NakanoshimaFont | 18px | 500 | **2.0** (36px) | **0.06em** (1.08px) | h3 |
| Lead | NakanoshimaFont | 16px | 500 | **2.0** (32px) | 0 | 導入文 |
| Card Title | NakanoshimaFont | 16px | 500 | 1.75 (28px) | 0 | 展覧会名 |
| Base (body) | NakanoshimaFont | **14px** | 500 | **2.0** (28px) | 0 | 継承の基準値 |
| Nav | NakanoshimaFont | 15px | 500 | **2.0** (30px) | 0 | グローバルナビ |
| Utility / Caption | NakanoshimaFont | 12px | 500 | **2.0** (24px) | **0.07em** (0.84px) | 「メンバーシップ」「JP」 |
| Button Label | NakanoshimaFont | 12px | 500 | **1.0** (12px) | 0 | 「チケット購入」 |
| Micro | NakanoshimaFont | 9px | 500 | **2.0** (18px) | 0 | 言語切替の記号 |

**ウェイトは 500 の1値だけ**。太くするときは `NakanoshimaFont-M` へ書体を差し替える。

### 3.5 行間・字間

- **既定の `line-height` は `2.0`**。本文 14px で 28px。ナビも見出しも 2.0
- **例外は「箱に入る文字」だけ 1.0**。枠線ボタンのラベル、黒バッジ。
  上下パディングで高さを作るため行送りは詰める
- **`letter-spacing` は 0.06em が主役**（20px→1.2px、18px→1.08px）。
  ユーティリティの小さい文字だけ 0.07em、キャッチ的な扱いで 0.2em
- **本文（14px）は `letter-spacing: normal`**。字間を開けるのは見出しと小さい文字だけ

```css
/* 本文 — 字間は開けず、行送りだけ 2.0 */
p {
  font-size: 14px;
  line-height: 2;          /* 28px */
  letter-spacing: normal;
  text-align: justify;
  line-break: strict;
}

/* セクション見出し */
h2 {
  font-size: 20px;
  line-height: 2;          /* 40px */
  letter-spacing: 0.06em;  /* 1.2px */
}

/* 枠線ボタン — 行送りだけ 1.0 に落とす */
.btn-outline {
  font-size: 12px;
  line-height: 1;
  padding: 10px 26px 7px 10px;
}
```

### 3.6 禁則処理・改行ルール

**このサイトの中核。** リセット段階で全要素に効かせている。

```css
* {
  text-align: justify;      /* 両端揃え */
  line-break: strict;       /* 禁則を厳格モードで */
  word-break: break-word;
  overflow-wrap: break-word;
}
```

- **`line-break: strict`** — ブラウザ既定の `auto` では行頭に来てしまう
  小書き仮名（ゃゅょっ）や長音符（ー）を、厳格モードで行頭禁則に含める
- **`text-align: justify`** — 段落・見出し・ナビ・リンクまで両端揃え。
  日本語は文字幅が均一なので、欧文と違って単語間が間延びしにくい
- **`YakuHanJPs`** で `「」（）、。` の左右アキを半角に詰める。
  `palt` を使わずに約物だけを詰める、より制御しやすいやり方
- 「大阪中之島美術館」「NAKANOSHIMA MUSEUM OF ART, OSAKA」は途中で折らない

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt は使わない */
```

- **`palt` を一切使わない**。詰めは `YakuHanJPs`（約物専用サブセット）に任せる
- `palt` は全文字のプロポーショナル詰めなので、和欧混植で欧文まで詰まってしまう。
  約物だけを詰めるサブセット書体のほうが**制御が効く**という判断

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| NakanoshimaFont（館の専用書体・自前配信） | **Zen Kaku Gothic New**（Google Fonts）| 専用書体はサイト外配信不可。低コントラストで字面が広く、細めの現代ゴシックとして骨格が近い |
| NakanoshimaFont-M | **Zen Kaku Gothic New 500** | Medium 差し替えの代替 |
| NakanoshimaFont-T | **Zen Kaku Gothic New 300** | Thin 差し替えの代替 |
| YakuHanJPs | **なし**（再現しない）| 約物半角は専用サブセットが必要。preview では `font-feature-settings` を触らず素のまま表示する |

---

## 4. Component Stylings

### Buttons

**Outline（このサイトの標準CTA）**

- Background: `transparent` / Text: `#000000`
- Border: `1px solid #808080`
- Border Radius: **`0px`**
- Padding: `10px 26px 7px 10px` — **右に外部リンクアイコンが入るため右だけ厚い。
  上下も非対称（上10 / 下7）**
- Font: 12px / `line-height: 1.0` / `letter-spacing: normal`

```css
.btn-outline {
  display: inline-block;
  background: transparent;
  color: #000;
  border: 1px solid #808080;
  border-radius: 0;
  padding: 10px 26px 7px 10px;
  font-size: 12px;
  line-height: 1;
  text-align: center;
}
```

用例: 「チケット購入」「オンラインストア」「MORE」

**Filled（黒ベタ — バッジ扱い）**

- Background: `#000000` / Text: `#ffffff`
- Border: `1px solid #000000` / Border Radius: `0px`
- Padding: `7px 8px 4px`（**上下非対称**）
- Font: 12px / `line-height: 1.0`

用例: 「開催中」ステータスバッジ

**塗りのボタンは実質このバッジだけ。** 主要導線（チケット購入）ですら枠線で、
色や面積で優劣をつけない。

### Calendar（開館カレンダー）

トップページの中核コンポーネント。

- 日付セル: `<a>` / `border-radius: 100%`（円）/ `padding: 0`
- 開館日: 黒文字 / 休館日: グレー / イベント日: 白文字（黒い円の上）
- ヘッダー行（曜日）: 16px / `line-height: 2.0`

**サイト内で `border-radius` が効いているのはこのカレンダーの円だけ。**

### Cards（展覧会カード・ニュースカード）

- Background: `transparent`（白地にそのまま置く）
- Border / Shadow: **なし**。上下の区切りは `1px solid #808080`
- 構成: ポスター画像 → ステータスバッジ（黒）→ 展覧会名（16px / 1.75）→ 会期（14px / 2.0）

### Navigation

**ヘッダー（3層構造）**

1. ユーティリティ行: 「メンバーシップ / 寄附 / 施設を借りる / 大阪中之島美術館について」
   ＋ SNSアイコン ＋ 言語切替（12px / `letter-spacing: 0.07em`）
2. ロゴ行: シンボル ＋ `NAKANOSHIMA MUSEUM OF ART, OSAKA`
3. グローバルナビ: 「展覧会 / 参加する / 訪ねる / 学ぶ / コレクション」＋ 検索 ＋
   枠線CTA 2つ（15px / `line-height: 2.0`）

**動詞でナビを組む。** 「展覧会情報」ではなく「訪ねる」「学ぶ」「参加する」。

### Forms（検索）

- Input: `1px solid #808080` / `border-radius: 0` / 12px
- 検索パネル面: `#ededed`
- チェックボックスのラベル: 12px / `line-height: 2.0`

### Tables

- 罫線: `1px solid #808080`（上罫を引き、`margin-top: -1px` で重ねる）
- セル: 14px / `line-height: 2.0` / `text-align: justify`

---

## 5. Layout Principles

### Container

| 用途 | Max Width |
|------|-----------|
| **標準コンテナ** | **960px** |
| ヘッダー内側 | 1267px |
| カード列 | 892px |
| フルブリード | 1440px |

### Layout Structure

- 1カラム中央寄せ。サイドバーを持たない
- トップは「ヒーロー動画 → NEWS 1行 → 展覧会 → イベント → Topics → カレンダー → 協賛企業」
- セクション間は `1px solid #808080` の罫線で区切る

### Grid

- 展覧会カード: 2カラム（960px を等分）
- ニュース一覧: 1カラム（日付 + タイトルの横並び）
- カレンダー: 7列（曜日）

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 10px |
| M | 20px |
| L | 40px |
| XL | 80px |

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべて。CSS に `box-shadow` の宣言が1件もない** |

**影を1つも使わない。** 階層は次の2つだけでつくる。

1. **1px の罫線 `#808080`** — セクション・カード・リストの境界
2. **面色 `#ededed` / `#f7f7f7`** — 検索パネル、言語切替

黒バッジ（`#000000`）が唯一「浮いて見える」要素だが、これも影ではなく
**面色のコントラスト**で成立している。

---

## 7. Do's and Don'ts

### Do（推奨）

- 白 `#ffffff` と黒 `#000000` だけで組む。罫は `#808080` の1px
- `text-align: justify` と `line-break: strict` を**全要素に**効かせる
- `line-height` の既定を **2.0** にする（14px 本文 → 28px）
- `font-weight` は 500 固定。太くしたいときは**書体を差し替える**（Medium ファミリー）
- `letter-spacing` は見出し 0.06em / ユーティリティ 0.07em。**本文は normal**
- 約物の詰めは `palt` ではなく **YakuHanJPs**（約物半角サブセット）で行う
- CTA は枠線（`1px solid #808080` / radius 0）。塗りはステータスバッジだけ
- ナビは動詞で組む（「訪ねる」「学ぶ」「参加する」）
- 版面は 960px。1カラムで中央に置く

### Don't（禁止）

- **有彩色を足さない**。ブランドカラーもアクセントカラーも作らない
- `border-radius` を矩形に付けない（円形のカレンダーセルだけが例外）
- `box-shadow` を使わない
- 主要CTAを塗りボタンにしない（枠線で揃える）
- 本文の `line-height` を 1.5 以下に詰めない
- `font-weight: 700` を書かない（専用書体に 700 のファイルが無い）
- `palt` を全体にかけない（約物だけを詰める）
- 見出しを大きくしすぎない（最大 28px。h2 は 20px）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。ナビはハンバーガー＋ドロワー |
| Tablet | ≥ 959px | グローバルナビを展開 |
| Desktop | ≥ 1069px | ヘッダー3層をフル表示 |
| Squeeze | 1070〜1260px | ナビの字間・パディングを詰める中間帯 |
| Wide | ≥ 1600px | ヒーローを拡大 |

**モバイルの主境界は 767px**（`@media all and (max-width: 767px)`）。
デスクトップ側は 959 / 1069 / 1260 / 1600px と細かく刻む。

### モバイルでの変化

- グローバルナビ → スライドインドロワー（`nav.globalMenuSp`）
- ヘッダー3層 → ロゴ ＋ ハンバーガーの1層
- 展覧会カード 2カラム → 1カラム
- カレンダーは 7列を維持（セルの円が縮む）
- **`text-align: justify` と `line-height: 2.0` はモバイルでも維持する**

### タッチターゲット

- カレンダーの日付セルは円形。モバイルでは直径 40px 以上を確保する
- 枠線ボタンは 12px / padding `10px 26px 7px 10px` で高さ約 31px。
  モバイルでは上下パディングを 14px に増やして 44px を確保する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Ink:             #000000（純黒）
On Dark:         #ffffff
Border:          #808080（1px solid — 主役の罫）
Surface:         #ededed（検索パネル）/ #f7f7f7（言語切替）
Divider:         #cecece
Text Muted:      #4d4d4d
Accent:          なし（有彩色ゼロ）
Main Font:       "NakanoshimaFont", "Hiragino Kaku Gothic Pro", "Yu Gothic",
                 "YuGothic", "Meiryo UI", Meiryo, "MS PGothic", sans-serif
Bold Font:       "NakanoshimaFont-M"（ウェイトではなく書体で切り替える）
Thin Font:       "NakanoshimaFont-T"
約物:            YakuHanJPs（約物半角サブセット）
Base Size:       14px
Line Height:     2.0（既定）/ 1.0（ボタン・バッジ）/ 1.75（カード見出し）
Letter Spacing:  normal（本文）/ 0.06em（見出し）/ 0.07em（ユーティリティ）
Font Weight:     500（全要素固定）
text-align:      justify（全要素）
line-break:      strict（全要素）
Border Radius:   0px（矩形すべて）/ 100%（カレンダーのセルだけ）
Shadow:          none（宣言ゼロ）
palt:            off（約物は YakuHanJPs で詰める）
Container:       960px（標準）/ 1267px（ヘッダー）/ 1440px（フル）
Breakpoints:     767px / 959px / 1069px / 1260px / 1600px
```

### プロンプト例

```
大阪中之島美術館（NAKANOSHIMA MUSEUM OF ART, OSAKA）のデザインシステムに従って、
展覧会一覧ページを作成してください。
- 有彩色は1色も使わない。白 #ffffff の地に黒 #000000 の文字、罫は #808080 の 1px solid
- リセットで全要素に次を効かせる:
    font-family: "NakanoshimaFont", "Hiragino Kaku Gothic Pro", "Yu Gothic",
                 "YuGothic", "Meiryo UI", Meiryo, "MS PGothic", sans-serif;
    font-weight: 500;
    line-height: 2;
    text-align: justify;
    line-break: strict;
    word-break: break-word;
  （preview 用の代替書体は "Zen Kaku Gothic New", sans-serif）
- 本文は 14px / line-height 2.0（28px）/ letter-spacing normal
- 見出しは h2 20px / line-height 2.0 / letter-spacing 0.06em、h3 18px / 0.06em
- 太字にしたい箇所は font-weight を上げず、font-family を "NakanoshimaFont-M" に差し替える
- palt は使わない。約物の詰めは YakuHanJPs（約物半角サブセット）に任せる
- CTA は枠線ボタン: transparent / 1px solid #808080 / border-radius 0 /
  padding 10px 26px 7px 10px / 12px / line-height 1
- ステータス表示だけ黒ベタのバッジ: #000000 / #ffffff / radius 0 / padding 7px 8px 4px / 12px
- カードは影なし・枠なし。区切りは #808080 の 1px 罫線
- border-radius は 0。円（100%）を使うのは開館カレンダーの日付セルだけ
- box-shadow は一切使わない
- 版面は 960px 中央寄せの1カラム。サイドバーを作らない
- ナビは動詞で組む（「展覧会」「参加する」「訪ねる」「学ぶ」「コレクション」）
```
