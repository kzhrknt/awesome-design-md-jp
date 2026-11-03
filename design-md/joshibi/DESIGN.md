# DESIGN.md — 女子美術大学（Joshibi University of Art and Design）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-03 / 対象: `https://www.joshibi.ac.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **影をひとつも使わず、色と縦組みで区切る。** `box-shadow` は両ページ合わせて **0 種**。セクションの境は罫線でも影でもなく、**左端に立てた縦組みの見出しと、学科ごとに違う色**で付ける
- **密度**: 中程度。本文は 14px / 行間 1.5 が基本で、ニュース一覧は詰めて並べるが、学科紹介は行間 1.8〜2.0 とゆったり組む
- **キーワード**: 秀英角ゴシック銀、YakuHanJP、縦組みの section 見出し、学科カラー、影ゼロ

**このサイトの核心は4つある。**

1. **`palt` を 1 要素も使わず、約物の詰めを YakuHanJP に任せている**（実測 `font-feature-settings` は全要素 `normal`＝**0 件**）。代わりに **YakuHanJP**（約物だけを切り出したサブセットフォント）をスタックの**先頭**に置き、`「」（）、。` だけが詰まった状態で組まれる。**`palt` を足すと二重に詰まって別物になる**
2. **書体は3本立て。和文＝秀英角ゴシック銀（Adobe Fonts）、約物＝YakuHanJP（npm CDN）、数字と欧文＝tt-commons-pro。** 日付・`NEW` バッジだけが tt-commons-pro で組まれる（実測 25 要素）
3. **セクション見出しが縦組み。** `writing-mode: vertical-rl` が実測 **17 要素**、すべて自社クラス（`home-pickup__ttl` `home-news__ttl` など計7本の `home-*__ttl home-ttl-01`）。20px / weight 700 / 37px 幅の左カラムに立てる。**外部ウィジェット由来ではない、本物の縦組み**
4. **本文の既定ウェイトが 500。** 実測 169 要素が weight 500 で最多（400 は 26 要素しかない）。秀英角ゴシック銀は **M(500) と DB(600) の2本**だけを読み込んでおり、**細い 400 は存在しない**

**`body` の `font-family` は素の `sans-serif` 1 語しかない。** 設計上のスタックは CSS 変数 `--font-ja-01` としてコンポーネント側に当てられている（実測 236 要素）。**`body` の computed style を見て「このサイトはヒラギノ」と読むと間違える。**

---

## 2. Color Palette & Roles

### Primary（学科・領域カラー）

**このサイトにブランド色は1色ではなく8色ある。** `--color-key-01`〜`08` として宣言され、セクション見出しの文字色と学科カードの面色に使い分けられる。

| トークン | 実装値 | 実測 |
|------|--------|------|
| `--color-key-01` | **`#F2879F`**（ピンク） | 見出し `ピックアップニュース` の文字色、`NEW` バッジの面（**可視 28 要素**・最多） |
| `--color-key-02` | **`#57ACCE`**（ブルー） | デザイン・工芸学科のカード面（可視 13 要素）。下層ページの h1 / h2 の文字色 |
| `--color-key-03` | **`#C38A57`**（ブラウン） | 面として 3 要素 |
| `--color-key-04` | **`#62B47B`**（グリーン） | アート・デザイン表現学科のカード面（可視 15 要素）、見出し `受験生のみなさまへ` |
| `--color-key-05` | **`#EA9C07`**（アンバー） | 短期大学部のカード面（可視 8 要素） |
| `--color-key-06` | **`#E67556`**（オレンジ） | 見出し `美術館・ギャラリー`、`開催中` バッジの面 |
| `--color-key-07` | **`#4A699B`**（ネイビー） | 宣言はあるが**両ページとも可視 0 要素** |
| `--color-key-08` | **`#BC8E9C`**（ダスティローズ） | `お知らせ` のラベル文字（可視 7 要素） |

### Course / Examinee（学科コース色）

| トークン | 実装値 | 備考 |
|------|--------|------|
| `--color-course-01` | `#F2879F` | key-01 と同値 |
| `--color-course-02` | `#57ACCE` | key-02 と同値 |
| `--color-course-03` | `#62B47B` | key-04 と同値 |
| `--color-course-04` | **`#FFF000`**（蛍光イエロー） | **共創デザイン学科だけの色**（可視 3 要素）。key 系に同値が無い唯一の色 |
| `--color-course-05` | `#EA9C07` | key-05 と同値 |
| `--color-examinee` | **`#A2FF8B`**（ライムグリーン） | 受験生ナビ導線用。**両ページとも可視 0 要素**（ヒーロー写真に焼き込まれた色としてのみ存在） |

> **`--color-key-*` と `--color-course-*` は5色が同じ値で二重に宣言されている。** 新規実装では `--color-key-*` 側を正とし、`--color-course-04` の `#FFF000` だけを別枠で持つとよい。

### Neutral（ニュートラル）

- **Text Primary** (`#333333` / `--color-main-01`): 本文・見出し（**可視 104 要素**）。**純黒は使わない**
- **Text Secondary** (`#707070` / `--color-main-02`): 補助リンク、フッターの一覧（可視 50 要素）
- **Text Muted** (`#999999` / `--color-main-03`): 肩書き・キャンパス名（可視 7 要素）。`--color-border-01` と同値
- **Text on Color** (`#ffffff`): 学科カードの上の文字（可視 77 要素）
- **Border** (`#cccccc` / `--color-border-02`): 罫線。`--color-focus-01` と同値
- **Surface Gray** (`#F7F7F5` / `--color-gray-01`): タブの面、資料請求ブロック。**下層ページのページ背景でもある**
- **Background**: トップは `#ffffff`（根拠 `viewportTopBySample (1/1)`）、**下層は `#F7F7F5`**（根拠 `viewportTopBySample (3/4)`）。**ページによって地色が違う**
- **Danger** (`#FF0000` / `--color-red-01`): 宣言のみ。可視 0 要素

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **秀英角ゴシック銀 Std**（`dnp-shuei-gothic-gin-std` / 大日本印刷、Adobe Fonts 配信）。**M(500) と DB(600) の 2 ウェイトだけ**が `loaded`
- **約物サブセット**: **YakuHanJP 4.0.1**（`cdn.jsdelivr.net/npm/yakuhanjp@4.0.1`）。Medium / SemiBold / Bold の **3 本**が `loaded`。`「」（）、。` などの約物だけを持ち、それ以外の文字はスタックの次（秀英角ゴ銀）に落ちる
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ**: **tt-commons-pro**（TypeType、Adobe Fonts 配信）。**日付・`NEW` バッジ・`PAGE TOP` 専用**（実測 25 要素）。本文の欧文には使わない
- 和文スタックの中の欧文グリフは秀英角ゴシック銀のものがそのまま出る

### 3.3 font-family 指定

```css
:root {
  --font-ja-01: YakuHanJP, "dnp-shuei-gothic-gin-std", sans-serif;
  --font-en-01: "tt-commons-pro", sans-serif;
}

/* 本文・UI（実測 236 要素） */
font-family: var(--font-ja-01);

/* 日付・数字・ラテン（実測 25 要素） */
font-family: var(--font-en-01);
```

**フォールバックの考え方**:
- **YakuHanJP を必ず先頭に置く。** 約物専用サブセットなので、先頭でなければ機能しない。2 番目に置くと秀英角ゴ銀の約物が先に当たり、詰めが効かなくなる
- **実サイトは `body { font-family: sans-serif }` のまま放置している。** 正しくは `body` にも `var(--font-ja-01)` を当てる（現状、`<body>` 直下の素のテキストだけヒラギノで出る）
- **Adobe Fonts の2書体はドメインライセンス。** 手元で再現するときは秀英角ゴ銀 → `Zen Kaku Gothic New`、tt-commons-pro → `Jost` などで代替する

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Site Title | 秀英角ゴ銀 | 28px | 700 | 2.00 (56px) | 0.7px | トップの `h1`（視覚的にはロゴ画像の裏） |
| **Section Heading（縦組み）** | 秀英角ゴ銀 | **20px** | **700** | **1.85** (37px) | 0.7px | **`writing-mode: vertical-rl`。7本すべてこれ** |
| Page Title（下層） | 秀英角ゴ銀 | 22px | 700 | 1.60 (35.2px) | normal | `#57ACCE` |
| Sub Heading（下層） | 秀英角ゴ銀 | 20px | **500** | 1.40 (28px) | normal | `#57ACCE`。**下層の h2 は 500 で、700 にしない** |
| Card Heading | 秀英角ゴ銀 | 18px | 600 | 1.80 (32.4px) | 0.7px | ニュース見出し |
| Global Nav | 秀英角ゴ銀 | 15px | 600 | 1.50 (22.5px) | 0.8px | `NEWS・展覧会` など |
| Nav (Drawer) | 秀英角ゴ銀 | 18px | 500 | 1.00 (18px) | 0.8px | ドロワー内 |
| List Heading | 秀英角ゴ銀 | 16px | 600 | 1.80 (28.8px) | 0.7px | `入試情報` |
| **Body** | 秀英角ゴ銀 | **14px** | **500** | **2.00** (28px) | 0.7px | **本文の既定。実測 109 要素が 14px** |
| Body (記事) | 秀英角ゴ銀 | 14px | 500 | 2.00 (28px) | normal | 下層の本文は字間 `normal` |
| Card Title | 秀英角ゴ銀 | 14px | 600 / 700 | 1.80 (25.2px) | 0.7px | `卒業生インタビュー` |
| Label | 秀英角ゴ銀 | 13px | 600 | 1.50 (19.5px) | 0.7px | `重要なお知らせ` |
| Course Label | 秀英角ゴ銀 | 13px | 500 | 1.80 (23.4px) | 0.7px | 学科カード上の白文字 |
| Utility Nav | 秀英角ゴ銀 | 12px | 500 | 2.00 (24px) | 0.8px | `公開講座` `情報の公表` |
| Footer | 秀英角ゴ銀 | 12px | 500 | 1.50 (18px) | 0.6px | — |
| **Date** | **tt-commons-pro** | 12px | 400 | 2.00 (24px) | 0.7px | **`2026.07.27`。欧文書体はここ** |
| **Badge `NEW`** | **tt-commons-pro** | 14px | 400 | 2.00 (28px) | 0.7px | `border-radius: 50%` の円。面は `#F2879F` |
| Badge `開催中` | 秀英角ゴ銀 | 13px | 500 | 1.30 (16.9px) | 0.65px | 面 `#E67556` / radius 4px |
| `PAGE TOP` | 秀英角ゴ銀 | 13px | 500 | 1.00 | **1.3px** | サイト唯一の広い字間 |

**ウェイトは 500 / 600 / 700 の3段しかない。** 400 が付く可視要素は 26 個で、そのほとんどが tt-commons-pro の日付。

> **700 を当てても DB(600) で出る。** `@font-face` は `dnp-shuei-gothic-gin-std` の **500 と 600 の 2 本しか存在しない**（`document.fonts` で確認）。CSS が 700 を指定している 15 要素は、CSS フォントマッチングで 600 に解決される。**「もっと太く」は作れないので、太さで差を付けたい場面は 500 → 600 の 1 段しか使えない。**

### 3.5 行間・字間

- **本文の行間**: **2.00**（14px / 28px）。学科紹介は **1.80**（49 要素）
- **UI の行間**: **1.50** が最多（実測 156 要素）
- **縦組み見出しの行間**: **1.85**（20px / 37px）
- **字間**: **`0.05em` を数か所のコンテナで宣言し、そこから px で継承させている**

**字間の継承について（重要）**:

実測値は **0.6px（96 要素）/ 0.7px（146 要素）/ 0.8px（16 要素）** の3つに割れるが、これは「サイズごとに `em` を当て直している」のではない。

```
12px の箱で 0.05em を宣言 → 0.6px が子へ降りる（12px の子も 20px の子も 0.6px）
14px の箱で 0.05em を宣言 → 0.7px が子へ降りる（28px の h1 も 0.7px）
16px の箱で 0.05em を宣言 → 0.8px が子へ降りる（12px の子も 0.8px）
```

実測で裏が取れる: **16px の要素に 0.7px が 41 件**（14px の親から継承）、**12px の要素に 0.8px が 16 件**（16px の親から継承）、**28px の `h1` が 0.7px**。サイズに比例していない。

**ガイドライン**:
- **`letter-spacing: 0.05em` はブロックの先頭で1回だけ宣言する。** 子要素で `em` を再宣言しない（親の px がそのまま降りるのが、このサイトの設計）
- **`line-height` は比率（単位なし）で書く。** px 固定にすると 14px / 20px / 28px で行送りが破綻する

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- **`word-break` は `body` も含め全要素 `normal`**（実測）。`break-all` は使わない
- 縦組み見出しの改行は **`<br class="u-md-min">`** で明示的に折っている。`<b>` で行ごとに包んで、デスクトップだけ 2 行に割る構造

### 3.7 OpenType 機能

**`font-feature-settings` は両ページとも 0 要素**（全要素 `normal`）。

- **`palt` を足さないこと。** このサイトは **YakuHanJP を和文スタックの先頭に置く**ことで約物の詰めを実現している。`palt` を重ねると約物が二重に詰まる
- YakuHanJP は約物だけのサブセットなので、**仮名・漢字の字送りは秀英角ゴシック銀の素のまま**。「約物だけ詰まって、本文の字送りは素直」という組み方がこのサイトの質感

### 3.8 縦書き

**セクション見出しだけ縦組み。実測 17 要素（うち `h2` が 7 本）。**

```css
.home-ttl-01 {
  writing-mode: vertical-rl;
  font-family: var(--font-ja-01);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.85;      /* 37px */
  letter-spacing: 0.7px;
}
```

- 幅 **37px の列**（2行になると 74px）を本文カラムの左に立てる。実測位置は `left: 210〜252px`
- **`<b>` で行を包み、`vertical-rl` の自然な折り返しに任せる。** `display: flex` で並べ直してはいけない（DOM 順に左→右へ置かれ、**縦組みの読む向き（右→左）と逆になる**）。実測でも 1 行目が `x=252`、2 行目が `x=215` と**右から左**に並んでいる
- 長音符（`ー`）だけ `<span>` で包んで個別に回している（`ギャラリー` `ニュース`）

> **ヒーローの黄緑の縦組み（`受験生ナビ` `女子美`）は実テキストではない。** `mv_img_*.jpg`（1440×630）に焼き込まれている。DOM には該当要素が無い。**ここを Web フォントで再現しようとしないこと。**

---

## 4. Component Stylings

**`box-shadow` は両ページ合わせて 0 種。影を一切使わない。**

### Buttons

**Pill（主要導線）**
- Background: `#F7F7F5`
- Text: `#707070`
- Border Radius: **`64px`**（実測 5 要素。`女子美について` `大学の学部・学科一覧` など）
- Font Size: 16px / Weight 500 / Letter Spacing 0.7px

**Pill（大）**
- Border Radius: `56px`（資料請求ブロック 1 要素）

### Badges / Chips

**`NEW`（円）**
- Background: `#F2879F` / Text: `#ffffff`
- Border Radius: **`50%`**（実測 74 要素でサイト最多の角丸）
- Font: tt-commons-pro 14px / 400 / line-height 28px（＝正円になる）

**`開催中` / `近日開催`**
- Background: `#E67556`（開催中）/ Text: `#ffffff`
- Border Radius: `4px` / Padding: `1.3px 6.5px`
- Font: 13px / 500 / letter-spacing 0.65px

### Cards

**学科カード**
- Background: 学科色（`#57ACCE` / `#62B47B` / `#EA9C07` / `#FFF000`）
- Text: `#ffffff` 13px / 500 / line-height 1.80
- Border Radius: `0`
- 写真の上に **`linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.24) 100%)`** を重ねて白文字を載せる（実測 3 要素）

**重要なお知らせ**
- Border Radius: **`8px 8px 0 0`**（見出し）/ **`0 8px 8px`**（本文）。上下で分けて指定する
- 見出し: 13px / 600、本文: `#333333`

### Tabs

- Background（選択時）: `#F7F7F5` / Text: `#707070`
- Border Radius: `4px 4px 0 0`
- Font: 16px / 500 / letter-spacing 0.7px

---

## 5. Layout Principles

### Spacing Scale

実測の `gap` は 2 系統。

| Token | Value | 用途 |
|-------|-------|------|
| XS | `10px` | ニュース一覧の行間（3 要素） |
| S | `24px` | カードグリッド（2 要素） |
| M | `26px` | 下層ページのカラム間（`0 26px` が 7 要素） |
| L | `32px` | `10px 32px` |
| XL | `40px` | `40px 26px` |

### Container

- **Max Width: `1074px`**（実測 7 要素で最多。両ページ共通の本文幅）
- 広い面: `1116px`（2 要素）/ `1212px`（1 要素）
- 記事カラム: `922px` / `994px` / `939px`
- カード単位: `448px` / `479px`

### Grid

- トップは縦組み見出し（37px 幅）＋ 本文カラムの **2 カラム**
- 学科カードは可変の横並び、`gap: 24px`

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべての要素** |

**`box-shadow` は両ページで 1 件も検出されなかった（0 種）。** 階層は**面の色（`#ffffff` と `#F7F7F5`）と角丸だけ**で表す。

- カードを浮かせない。**`0 2px 8px rgba(0,0,0,.1)` のような既定の影を足すと、このサイトの平らな質感が壊れる**
- 写真の上の白文字は、影ではなく **`linear-gradient` のオーバーレイ**で可読性を確保する

---

## 7. Do's and Don'ts

### Do（推奨）

- **`YakuHanJP` をスタックの先頭に置く。** 約物の詰めはこれが担当する
- **本文のウェイトは 500 を既定にする。** 400 はこのサイトの本文には存在しない
- **`letter-spacing: 0.05em` はブロックの先頭で 1 回だけ宣言する**（子は px で継承する）
- **`line-height` は単位なしの比率で書く**（本文 2.0 / UI 1.5 / 縦組み見出し 1.85）
- セクション見出しは **`writing-mode: vertical-rl` の 37px 列**として左に立てる
- 学科・領域を表すときは `--color-key-*` の 8 色から選ぶ
- 写真の上の白文字には `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.24))` を敷く

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** YakuHanJP と二重になる（実サイトは 0 要素）
- **`font-weight: 700` を「もっと太く」の意味で使わない。** 秀英角ゴシック銀は 500 / 600 の 2 本しか読み込んでおらず、700 は 600 で出る
- **`box-shadow` を足さない**（サイト全体で 0 種）
- **`body { font-family: sans-serif }` をそのまま真似しない。** これは実サイトの取りこぼしで、正しくは `var(--font-ja-01)` を当てる
- **縦組みの見出しを `display: flex` で横に並べ直さない。** DOM 順に左→右へ置かれ、日本語の縦組みとして読む向きと逆になる
- **ヒーローの縦組みロゴタイプを Web フォントで組まない**（写真に焼き込まれている）
- **`--color-key-07`（`#4A699B`）と `--color-examinee`（`#A2FF8B`）を使わない。** 宣言はあるが両ページとも可視 0 要素
- 下層ページの地色を `#ffffff` と決め打ちしない（**`#F7F7F5`**）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Fluid | ≤ 389px | **`html { font-size: 4.1025641026vw }`**（設計幅 390px） |
| Mobile | ≤ 767px | `screen and (max-width: 767px)` |
| Tablet | ≤ 991px / ≤ 1024px | `(max-width: 991px)` / `screen and (max-width: 1024px)` |
| Desktop | ≥ 992px | `(min-width: 992px)` / `screen and (min-width: 60em)` |
| Wide | 1025–1600px | `screen and (min-width: 1025px) and (max-width: 1600px)` |

### ルートの文字サイズ

**`html` は 390px まで 16px 固定、それ以下だけ `vw` で縮む。**

| 画面幅 | `html` | `body` |
|---|---|---|
| 1440px | 16px | 16px |
| 768px | 16px | 16px |
| **390px** | **16px** | 16px |
| **389px** | **15.959px** | 15.959px |
| 375px | 15.3846px | 15.3846px |

- 式は **`4.1025641026vw`**（= 100vw ÷ 24.375）。**390px でちょうど 16px に着地する**ので、ブレークポイントで段差が出ない（連続）
- **モバイル設計幅は 390px。** iPhone 14/15 の論理幅
- 逆に言うと **390px より広い画面では一切スケールしない**。可変なのは最小側だけ

### 見出しのサイズ切替

- カード見出し `h3`: 1440–1200px で **18px** → 1024–768px で **20px**（**タブレットで大きくなる**）→ 767px 以下で **16px**
- `h1` / `h2` は 1440px から 767px まで 32px / 24px のまま動かない

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）。`NEW` バッジ（28px の円）は装飾なのでタップ対象にしない

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Colors: #F2879F / #57ACCE / #62B47B / #EA9C07 / #E67556 （学科で使い分け）
Text Color:     #333333  (secondary: #707070 / muted: #999999)
Background:     #ffffff（トップ） / #F7F7F5（下層）
Font (JA):      YakuHanJP, "dnp-shuei-gothic-gin-std", sans-serif
Font (EN/数字):  "tt-commons-pro", sans-serif
Body Size:      14px
Body Weight:    500   ← 400 ではない
Line Height:    2.0（本文） / 1.5（UI）
Letter Spacing: 0.05em をブロック先頭で1回だけ
palt:           使わない（YakuHanJP が担当）
box-shadow:     使わない
```

### プロンプト例

```
女子美術大学のデザインシステムに従って、お知らせ一覧を作成してください。
- フォント: YakuHanJP, "dnp-shuei-gothic-gin-std", sans-serif
  （font-feature-settings の palt は付けない。約物は YakuHanJP が詰める）
- 本文: 14px / font-weight: 500 / line-height: 2.0
- letter-spacing: 一覧のラッパーに 0.05em を1回だけ宣言し、子には書かない
- セクション見出しは writing-mode: vertical-rl、20px / 700 / line-height 1.85 で
  左に 37px の列として立てる（flex で横に並べ直さない）
- 日付は "tt-commons-pro" 12px / 400 で組む
- 新着は #F2879F の正円バッジ（border-radius: 50%）に白の NEW
- カードに box-shadow は付けない。面は #ffffff、区切りは #F7F7F5 で取る
- コンテナ幅は 1074px
```
