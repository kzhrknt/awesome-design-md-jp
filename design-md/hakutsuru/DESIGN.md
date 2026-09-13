# DESIGN.md — 白鶴酒造（HAKUTSURU）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-13 / 対象: `https://www.hakutsuru.co.jp/`, `/product/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に**黒一色の罫と文字**。唯一の有彩色が**金 `#d5b45c`** で、これをナビのアクティブ状態と英字ラベルにだけ乗せる。見出しは明朝、本文はゴシックという**書体の役割分担**が明確
- **密度**: ゆったり。本文 14px に対し行送り 28px（2.0）。セクション間は 80〜120px
- **キーワード**: 金、明朝見出し、和欧2段、グレード別グラデーション、角丸なし

**このサイトの核心は3つある。**

1. **商品グレードを3色のグラデーション帯で表す。** プレミアム＝**金**、デイリー＝**緑**、スペシャル＝**赤**。いずれも `linear-gradient(-45deg, 濃 0%, 淡 40%, 淡 60%, 濃 100%)` という**中央が明るく両端が沈む同じ式**で作られており、箔押しの光沢を模している（4. 参照）
2. **`@font-face` で `MyYuGothicM` という別名を作り、Windows 游ゴシックの Regular が細すぎる問題を回避している。** SmartHR の `AdjustedYuGothic` と同じ発想だが、**指しているのは macOS の PostScript 名 `YuGothic-Medium`**（3.1 参照）
3. **見出しは明朝（Noto Serif JP）、本文はゴシック（游ゴシック Medium）**と書体で役割を分け、さらに**見出しは「和文 + 欧文」の2段**で組む（`ピックアップ` 30px 明朝 ＋ `PICK UP` 12px Lato 金）

**CSS Custom Properties は 0 個。** 設計はトークンではなくクラス名（`mod-head01` `contents` 等）に載っている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Primary（金）** | **`#d5b45c`** | **CSS 全文で 154 回**。可視テキスト 11 要素・面 5 要素。ナビのアクティブ項目、セクション見出しの英字、カルーセルの現在位置 |
| Gold Dark | `#aa9869` | CSS 7 回。プレミアム帯のグラデーション端、`PREMIUM` の文字 |
| Gold Light | `#cfbd8e` | プレミアム帯のグラデーション中央 |

> **金は「面を塗る色」ではなく「現在地と格を示す色」。** ナビの選択中の項目、英字ラベル、カルーセルのアクティブなドットに限って使われる。

### Grade（商品グレードの3色）

| グレード | 濃（0% / 100%） | 淡（40% / 60%） | CSS 出現 |
|----------|------------------|------------------|----------|
| **プレミアム** | `#aa9869` | `#cfbd8e` | 7 回 |
| **デイリー** | `#67907c` | `#88b19d` | 5 回 |
| **スペシャル** | `#8f0100` | `#ac4f4e` | 5 回 |

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Text Primary** | **`#000000`** | **可視 67 要素で最多**。本文・見出しのすべて。**このサイトは純黒を使う** |
| Text Muted | `#666666` | パンくず、ユーティリティリンク |
| Text on Dark | `#ffffff` | グラデーション帯・写真上 |
| **Background** | **`#ffffff`** | ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (3/3)`） |
| Surface | `#f6f7f9` | 検索窓・淡い面 |
| Surface Gray | `#efefef` | 商品一覧の面（下層で 8 要素） |
| Border / Inactive | `#aaaaaa` | 罫線、カルーセルの非アクティブなドット（5 要素） |

> **このサイトは本文に純黒 `#000000` を使う。** 多くのサイトが `#333` 前後に落とすなか、白地に黒罫・黒文字で通す設計を採っている。**トーンを下げると意図から外れる。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（本文・UI）**: **游ゴシック Medium**。`@font-face` の別名 `MyYuGothicM` 経由で使う
- **明朝体（見出し）**: **Noto Serif JP**（Web フォント。実測 400 / 900 が `loaded`）。`ヒラギノ明朝 ProN` がフォールバック

#### Windows 游ゴシック問題への対処（このサイトの方式）

```css
/* 実サイトの宣言 */
@font-face { font-family: MyYuGothicM; font-weight: 400; src: local("YuGothic-Medium"); }
@font-face { font-family: MyYuGothicM; font-weight: 700; src: local("YuGothic-Bold");   }
```

- **狙い**: 游ゴシック Regular が細すぎるため、**Regular 相当の指定で Medium を出す**。`MyYuGothicM` を `font-family` の**先頭**に置いて経由させる
- **方式の比較**（このリポジトリ収録の3例）:

  | サイト | 別名 | `src` に書く名前 | 効く環境 |
  |--------|------|------------------|----------|
  | SmartHR | `AdjustedYuGothic` | — | — |
  | **白鶴酒造** | **`MyYuGothicM`** | **`YuGothic-Medium`**（macOS の PostScript 名） | **macOS 寄り** |
  | カリモク家具 | （別名を作らず `Yu Gothic` を上書き） | `Yu Gothic Medium`（Windows のフォント名） | Windows 寄り |

- **`src` が `local()` だけなので、該当フォントが無い環境では解決しない。** 実測（headless Chrome）では 400 / 700 の両宣言が **`status: error`** となり、チェーンの次の `YuGothic` → `-apple-system` に落ちていた
- **両 OS を確実に押さえたいなら、`local()` を2つ並べて書くこと**（実サイトはどちらも片方しか書いていない）:

  ```css
  @font-face {
    font-family: MyYuGothicM;
    font-weight: 400;
    src: local("YuGothic-Medium"), local("Yu Gothic Medium");
  }
  ```

### 3.2 欧文フォント

- **Lato**（Web フォント。実測 400 が `loaded`）: **セクション見出しの英字、`SCROLL` 等のラベル**
- `AXIS Std` がフォールバックに入るが、実測で使われている形跡はない

> **`Cormorant Garamond` / `Questrial` / `Ubuntu` / `宋体` / `微软雅黑` が宣言されているが、実測ですべて `unloaded`。** Google Fonts から `@import` で一括読み込みしているだけで、参照する要素が無い。**設計フォントとして実装しないこと。**

### 3.3 font-family 指定

```css
/* 本文・UI（body の既定） */
font-family: MyYuGothicM, YuGothic, -apple-system, "system-ui",
             "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;

/* 見出し（明朝） */
font-family: "Noto Serif JP", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN",
             "游明朝", YuMincho, serif;

/* 欧文ラベル */
font-family: Lato, "Times New Roman", "AXIS Std", sans-serif;  /* ← 3.3 の注記を読むこと */
```

**フォールバックの考え方**:
- **`MyYuGothicM` を最優先**。この別名は `local()` でしか解決しないため、無い環境では即座に次の `YuGothic` に落ちる。**チェーンの2番目に素の `YuGothic` を置いておくのが安全弁**になっている
- `-apple-system` / `system-ui` を中盤に挟み、OS 標準へ素直に受け渡す

> **`Lato, "Times New Roman"` のフォールバックは誤り。** Lato はサンセリフなので、落ちたときに**セリフ体になってしまう**。**新規実装では `Lato, "Helvetica Neue", Arial, sans-serif` と書くこと。**（このリポジトリではライオンの `Jost, serif`、カリモク家具の `"Century Gothic", serif` にも同じ誤りがある）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Title (JA) | Noto Serif JP | 30px | 700 | 1.20 (36px) | normal | `プレミアム` `ピックアップ` |
| Page Title | Noto Serif JP | 28px | 700 | **1.50** (42px) | normal | `h1` `商品ラインアップ` |
| **Vertical Copy** | Noto Serif JP | **28px** | 700 | **2.00** (56px) | **0.05em** (1.4px) | `「米、水、人、酒造りの本質。」` **縦組み** |
| Statement | 游ゴシック | 24px | 700 | **2.00** (48px) | normal | `「日本酒はこんなに楽しい」` |
| Section Heading | 游ゴシック / Noto Serif JP | 21px | 700 | **2.00** (42px) | normal | `h2` 和欧2段の和文側 |
| **Vertical Sub** | Noto Serif JP | **18px** | 400 | **2.00** (36px) | **0.078em** (1.4px) | 縦組みの副文 |
| Sub Heading | 游ゴシック | 18px | 700 | 2.28 (41px) | normal | `h3` `白鶴公式ソーシャルメディア` |
| Lead | Noto Serif JP | 18px | 400 | **2.00** (36px) | normal | `大切なひとときを彩る、こだわりの商品です。` |
| Card Title | 游ゴシック | 18px | 400 | 1.50 (27px) | normal | レシピ名 |
| Nav Item | 游ゴシック | 16px | **700** | 1.40 (22.4px) | normal | グローバルナビ。**アクティブは金 `#d5b45c`** |
| Card Heading | 游ゴシック | 16px | 700 | **2.00** (32px) | normal | `h4` |
| Grade Label (EN) | Noto Serif JP | 16px | 700 | **2.00** (32px) | normal | `PREMIUM` 金系 `#aa9869` |
| Sub Heading (明朝) | Noto Serif JP | 16.38px | 700 | **2.00** (32.76px) | normal | `h3` 和欧2段 |
| **Body** | 游ゴシック | **14px** | 400 | **2.00** (28px) | normal | **本文。最頻** |
| Body (明朝) | Noto Serif JP | 14px | 400 | **2.00** (28px) | normal | 商品紹介の本文 |
| Button Label | 游ゴシック | 14px | 400〜700 | 1.50 (21px) | normal | `商品ラインアップへ` |
| Caption | 游ゴシック | 14px | 400 | 1.50 (21px) | normal | ニュースの要約 |
| Utility Nav | 游ゴシック | 12px | 400 | 2.50 (30px) | normal | `オンラインショップ` |
| **Section Label (EN)** | Lato | **12px** | 400 | 2.00 (24px) | **0.10em** (1.2px) | **`PICK UP` 金 `#d5b45c`** |
| Breadcrumb | 游ゴシック | 12px | 400 | 1.20 (14.4px) | normal | パンくず `#666666` |

### 3.5 行間・字間

- **行送りは `2.00` が基準。** 本文 14px / 28px、16px / 32px、18px / 36px、21px / 42px、24px / 48px、28px / 56px と、**サイズが変わっても比率 2.0 を維持する**（カリモク家具が絶対値 28px で揃えるのと対照的）
- **見出しだけ 1.2〜1.5 に締める**（30px / 36px = 1.20、28px / 42px = 1.50）
- **字間は既定 `normal`（実測 365 要素）**。開けるのは2箇所だけ
  - **縦組みのコピー: 1.4px**（28px で 0.05em、18px で 0.078em）
  - **英字ラベル `PICK UP` 等: 1.2px**（12px で 0.10em）

> **ロゴタイプ用の極端なマイナス字間がある。** 実測に `-4.34px`（2 要素）と `-5.6px`（1 要素）が出るが、これは**ロゴ・見出し画像まわりの詰め処理**であって本文の設計値ではない。**本文・UI に持ち込まないこと。**

**ガイドライン**:
- **行間 2.0 をサイト全体の既定にする。** 本文・リード・見出しのほとんどがこれ
- **字間は開けない。** 英字ラベルと縦組みのコピーだけが例外
- **`letter-spacing` は px に解決されて継承される。** 縦組みの 28px と 18px がどちらも `1.4px` なのは、親（28px 基準の `0.05em`）から px のまま渡っているため。**`0.05em` と書き写すと 18px 側が 0.9px になり実サイトと変わる**

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- 和欧2段の見出しは **`<span>` を2つ並べる**実装（`ピックアップ` + `PICK UP`）。`<br>` で押し込まない
- 鉤括弧付きのコピー（`「米、水、人、酒造りの本質。」`）は**括弧ごと1行に収める**前提で級数が決まっている

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* このサイトでは使用しない */
font-feature-settings: normal;
```

- **`palt` は実測 0 件。** 字詰めをしていない
- 鉤括弧の前後が空いて見えるが、**これはベタ組みのまま許容する設計**。約物半角（YakuHanJP）も使っていない

### 3.8 縦書き

**トップページのブランドステートメントに使う。** 実測 5 要素。

```css
.statement__copy {
  writing-mode: vertical-rl;
  font-family: "Noto Serif JP", "ヒラギノ明朝 ProN W3", serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 2.0;
  letter-spacing: 1.4px;   /* px で指定。em で書き直さないこと */
}

.statement__sub {
  writing-mode: vertical-rl;
  font-size: 18px;
  font-weight: 400;
  line-height: 2.0;
  letter-spacing: 1.4px;   /* 親から継承された px がそのまま効いている */
}
```

**縦組みで守ること**:
- **明朝体で組む。** 縦組みに游ゴシックは使わない
- `writing-mode: vertical-rl` では **`letter-spacing` が字送り（縦方向）、`line-height` が行間（横方向）**になる
- **用途はブランドステートメントに限定**。ナビゲーションや本文は横組み（丸亀製麺がナビまで縦に組むのとは対照的）

---

## 4. Component Stylings

### Buttons

**Outline（このサイトの基本形。実測で最多）**
- Background: `transparent` または `#ffffff`
- Text: `#000000`
- Border: **`1px solid #000000`**
- Border Radius: **`0`**
- Padding: `0 10px`（高さは `line-height` で確保）
- Font Size: 14px / Weight 400（強調時 700）
- 例: `商品ラインアップへ` `ピックアップへ` `白鶴を知るへ` `レシピへ` `日本酒を楽しむへ`

**Grade Gradient（商品グレードへの誘導。このサイトの主役）**

```css
/* プレミアム */
background: linear-gradient(-45deg, #aa9869 0%, #cfbd8e 40%, #cfbd8e 60%, #aa9869 100%);
/* デイリー */
background: linear-gradient(-45deg, #67907c 0%, #88b19d 40%, #88b19d 60%, #67907c 100%);
/* スペシャル */
background: linear-gradient(-45deg, #8f0100 0%, #ac4f4e 40%, #ac4f4e 60%, #8f0100 100%);

color: #ffffff;
border-radius: 0;
padding: 0 10px;
font-size: 14px;
```

- **3色とも同じ角度（-45deg）・同じストップ（0 / 40 / 60 / 100%）**で作る。**中央 20% を淡い色で通すことで箔の光沢に見せる**のがこの意匠の要点
- グレードを増やすときも**この式を保ったまま色だけ差し替える**こと

**White on Photo（写真上の白ボタン）**
- Background: `#ffffff` / Text: `#000000` / Border: `1px solid #ffffff` / Border Radius: `0`
- 例: `白鶴のあゆみ` `受賞実績`

### Carousel Dots

- Border Radius: **`5px`**（完全な円ではなく角丸の四角）
- 非アクティブ: `#aaaaaa` / **アクティブ: `#d5b45c`（金）**

### Cards

- Background: `#ffffff`（一覧ページの面は `#efefef`）
- Border Radius: **`0`**
- Shadow: **`0 5px 10px rgba(0,0,0,0.2)`**（実測 11 要素）
- 写真 → 見出し → 本文（14px / 28px）

### Section Heading（和欧2段）

```html
<h2>
  <span class="ja">プレミアム</span>   <!-- Noto Serif JP / 30px / 700 / #000 -->
  <span class="en">PREMIUM</span>      <!-- Lato / 12px / letter-spacing: 0.1em / #d5b45c -->
</h2>
```

- **和文が上、欧文が下。** 欧文は必ず**金**で、字間を `0.1em` 開ける
- グレード見出しでは欧文の色を `#aa9869`（濃い金）に落とす

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 4px | アイコンとラベルの間 |
| S | 24px | ブロック内の間隔 |
| M | 40px | 小セクション間 |
| L | **80px** | セクション間 |
| **XL** | **100px** | **大セクション間（実測 2 要素）** |
| XXL | **120px** | ページ上部・最大の区切り |

### Container

| Width | 用途 |
|-------|------|
| **1380px** | 最大コンテナ（実測 8 要素）。**このリポジトリ収録サイトの中では広い部類** |
| 1280〜1320px | セクション内のブロック |
| 860px | 本文カラム |
| 640 / 580px | カード |

- ビューポート 1440px に対し **1380px** まで使う、余白の少ない広いレイアウト

### Grid

- 商品カードは 3〜4 カラム
- **`gap` プロパティの使用は実測 0 件。** `margin` で組まれている。新規実装では `gap` を使ってよい

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|------|
| 0 | `none` | 罫線で仕切る面・ボタン | 既定 |
| **1** | **`0 5px 10px rgba(0,0,0,0.2)`** | **カード（唯一の影）** | **11 要素** |

- **影は1段のみ。** ボタン・帯・バッジには影を付けない
- カリモク家具（影 0 件）ほど徹底はしないが、**影で階層を作る設計ではない**。基本は罫線と面色

---

## 7. Do's and Don'ts

### Do（推奨）

- **`line-height: 2.0` をサイト全体の既定にする**（本文 14px なら 28px、見出し 21px なら 42px）
- **見出しは明朝（Noto Serif JP）、本文はゴシック（游ゴシック Medium）**と書体で役割を分ける
- **セクション見出しは「和文（明朝・黒）+ 欧文（Lato・金・`letter-spacing: 0.1em`）」の2段**で組む
- **`MyYuGothicM` の `@font-face` を先頭に置いて游ゴシック Medium を確保する**。`local()` は **macOS 名と Windows 名を両方書く**（3.1 参照）
- **商品グレードの帯は `linear-gradient(-45deg, 濃 0%, 淡 40%, 淡 60%, 濃 100%)` の式を保つ**
- 金 `#d5b45c` は**現在地と格を示す色**として使う（ナビのアクティブ、英字ラベル、カルーセルのアクティブなドット）
- **本文色は純黒 `#000000`**。このサイトはトーンを落とさない
- ボタン・カード・バッジは **`border-radius: 0`**
- 縦組みは**ブランドステートメントに限定**し、明朝で組む

### Don't（禁止）

- **`Lato, "Times New Roman"` と書かない**（サンセリフにセリフのフォールバックは誤り）。`Lato, "Helvetica Neue", Arial, sans-serif` とする
- **本文色を `#333` 等に薄めない。** 純黒がこのサイトの設計
- **ボタンを角丸にしない**（`border-radius: 0`）。カルーセルのドットだけが `5px`
- **金でセクションや大きな面を塗らない。** 金は文字と細い帯に限る
- **グラデーションの角度やストップを変えない。** 3グレードで式を揃えることが意匠の要
- **`letter-spacing` を em で書き直さない。** 縦組みの 1.4px は px で継承されている値で、`0.05em` と書くと級数ごとに変わってしまう
- **ロゴまわりのマイナス字間（`-4.34px` / `-5.6px`）を本文・UI に持ち込まない**
- `Cormorant Garamond` / `Questrial` / `Ubuntu` を実装しない（宣言はあるが実測 `unloaded`）
- **`font-feature-settings: "palt"` を足さない**
- ナビゲーションを縦組みにしない（縦組みはステートメント専用）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム、グローバルナビはドロワー |
| Tablet | ≤ 1379px | コンテナ 1380px → 100% |
| Desktop | ≥ 1380px | コンテナ 1380px |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- **アウトラインボタンは `padding: 0 10px` で高さを `line-height` に頼っている。** モバイルでは縦方向の padding を足して 44px を確保すること

### フォントサイズの調整

- 本文 14px は据え置き（`line-height: 2.0` も維持）
- セクション見出し 30px → モバイルでは 21〜24px。**行間 2.0 の原則は保つ**
- **縦組みのステートメントはモバイルで横組みに切り替える**（28px の縦組みは狭い画面で1画面に収まらない）
- 和欧2段の見出しは、モバイルでも2段を崩さない

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary (金):   #d5b45c   (ナビのアクティブ・英字ラベル・現在位置)
Gold Dark:      #aa9869
Text Primary:   #000000   (純黒を使う)
Text Muted:     #666666
Background:     #ffffff
Surface:        #f6f7f9 / #efefef
Border:         #000000 (ボタン) / #aaaaaa (罫・非アクティブ)

Grade Premium:  linear-gradient(-45deg, #aa9869 0%, #cfbd8e 40%, #cfbd8e 60%, #aa9869 100%)
Grade Daily:    linear-gradient(-45deg, #67907c 0%, #88b19d 40%, #88b19d 60%, #67907c 100%)
Grade Special:  linear-gradient(-45deg, #8f0100 0%, #ac4f4e 40%, #ac4f4e 60%, #8f0100 100%)

Font (本文・UI): MyYuGothicM, YuGothic, -apple-system, "Hiragino Kaku Gothic ProN", sans-serif
                 ※ @font-face: src: local("YuGothic-Medium"), local("Yu Gothic Medium");
Font (見出し):   "Noto Serif JP", "ヒラギノ明朝 ProN W3", "游明朝", serif
Font (欧文):     Lato, "Helvetica Neue", Arial, sans-serif

Body Size:      14px
Line Height:    2.0  （全サイズ共通。見出しのみ 1.2〜1.5）
Letter Spacing: normal（既定）/ 0.1em（英字ラベル）/ 1.4px（縦組み。px で指定）
palt:           使わない
Border Radius:  0   （カルーセルのドットのみ 5px）
Shadow:         0 5px 10px rgba(0,0,0,0.2)（カードのみ）
Container:      1380px
Section Gap:    80px / 100px / 120px
```

### プロンプト例

```
白鶴酒造のデザインシステムに従って、商品ラインアップページを作成してください。

- 背景は白、本文色は純黒 #000000（薄めない）、罫線は 1px solid #000000
- 本文は MyYuGothicM 系 14px / line-height: 2.0（28px）
- @font-face で MyYuGothicM を作り、src: local("YuGothic-Medium"), local("Yu Gothic Medium") とする
- セクション見出しは2段組み：
  和文 = "Noto Serif JP"（明朝）30px / 700 / #000
  欧文 = Lato 12px / letter-spacing: 0.1em / #d5b45c（金）
- 商品グレードのボタンは -45deg のグラデーション帯。
  プレミアム #aa9869→#cfbd8e、デイリー #67907c→#88b19d、スペシャル #8f0100→#ac4f4e
  （ストップは 0% / 40% / 60% / 100% で統一。白文字、border-radius: 0）
- 通常のボタンは透明地 + 1px solid #000 + padding: 0 10px + 14px、角丸なし
- カードは border-radius: 0、box-shadow: 0 5px 10px rgba(0,0,0,0.2)
- ナビのアクティブ項目は金 #d5b45c、それ以外は黒
- font-feature-settings: "palt" は使わない。letter-spacing は既定 normal
- コンテナは 1380px、セクション間は 100px
```
