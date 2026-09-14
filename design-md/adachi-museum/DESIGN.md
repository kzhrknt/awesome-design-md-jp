# DESIGN.md — 足立美術館（ADACHI MUSEUM OF ART）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-14 / 対象: `https://www.adachi-museum.or.jp/`, `/gardens`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **和文明朝で組んだ美術館**。庭園の全画面映像に、細い明朝と広い字間を重ねる。角丸ゼロ・影ゼロ・罫線は 1px
- **密度**: 低い。余白と行間で「間」をつくる。本文の行間は **2.0**
- **キーワード**: しっぽり明朝、palt 全面、字間 1px/2px/4px の3段、和紙テクスチャ、角丸ゼロ

**このサイトの核心は4つある。**

1. **和文の主役は明朝（Shippori Mincho）で、本文を weight 600 で組む**（実測：明朝 125 要素 / Noto Sans JP 89 要素 / Libre Baskerville 14 要素）。しっぽり明朝は 400 が細いため、**本文・小見出しは 600 を既定**にしている。400 はヒーローの大きな惹句と展覧会名にだけ使う
2. **明朝とゴシックで「館の言葉」と「運用情報」を分けている。** 見出し・本文・グローバルナビ＝明朝、**日付・補足文・タグ・ドロワーナビ＝Noto Sans JP**。読み物と案内板を書体で切り分ける設計
3. **`letter-spacing` を 3 段で使い分ける**（実測：`normal` 118 / **`1px` 99** / `2px` 3 / `4px` 7）。**UI とゴシックには 1px、展覧会名には 2px、ヒーローと大見出しには 4px**。青幻舎のような「palt だけで字間は足さない」型とは正反対の、**空ける設計**
4. **`font-feature-settings: "palt"` は可視テキスト 228 件中 228 件に適用**。字間を足したうえで、約物のアキは潰す

**`border-radius` と `box-shadow` はトップページで可視 0 件**（下層の丸数字だけが `50%`）。

> **CSS Custom Properties は 49 個あるが、すべて WordPress / Gutenberg の既定値**（`--wp--preset--*`）**と Swiper の `--swiper-theme-color: #007aff`**。**足立美術館自身の設計トークンは 1 つも無い。** `--swiper-theme-color` の青は実サイトのどこにも出てこないので、**変数を見て実装しないこと**。以下はすべて computed style の実測値。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

このサイトに**彩度の高いブランド色は無い**。基調は**墨と和紙**で、金茶と緑が差し色として少量入る。

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **墨（文字・面）** | **`#121212`** | **可視 108 要素**。本文・見出し・ナビの文字色。**純黒ではない** |
| **Dark Fill** | **`#3b3a36`** | 縦組みの「チケットの購入」タブ、下層の丸数字。わずかに緑みのある黒 |
| **金茶（Gold）** | **`#69592a`** | 展覧会カードのラベル帯。`linear-gradient(90deg, transparent 0%, #69592a 47%, #69592a 100%)` で**左端を透明にして写真へ溶かす** |
| **金茶（Link）** | `#907b3d` | `開館時間・入館料の詳細はこちら` のリンク文字（可視 1 要素） |
| **金茶（Fill）** | `#927d3e` | 小さな面（可視 2 要素） |
| **緑** | `#007746` | **`23年連続日本一` の実績バッジ専用**（可視 2 要素）。これ以外に緑は出ない |

> **金茶が 3 値ある**（`#69592a` / `#907b3d` / `#927d3e`）。**1色に丸めない。** 帯は `#69592a`、文字は `#907b3d` が実装の実態。

### Neutral（ニュートラル）

- **Text Primary** (`#121212`): 本文・見出し（可視 108 要素）
- **Text Secondary** (`#3f3f3f`): 日付、補足文（可視 60 要素）。**Noto Sans JP とセットで使われる**
- **Text on Dark** (`#d6d6d6`): 暗い面・ドロワーナビの文字（可視 31 要素）
- **Text on Fill** (`#ffffff`): ヒーロー・タグ・縦タブ（可視 28 要素）
- **Header Button** (`#e9e9e9`): ヘッダーの `チケット購入` `アクセス` の面。罫線は `#dcdcdc`
- **Tag Fill** (`#5c5a56`): `庭園` `ご案内` のカテゴリタグ
- **Border Light** (`#e1ded7`): 実績バッジの枠。**わずかに温かみのあるグレー**
- **Border** (`#d9d9d9`) / **Border on Dark** (`#4d4b4b`)
- **Overlay** (`rgba(255,255,255,0.5)`): 写真の上に置く白半透明ボタン

### Background

- **ページ背景は白**。`html` / `body` ともに塗り指定が無く、**UA 既定のキャンバス**がそのまま出る
- **ヘッダーは和紙テクスチャの画像**: `background-image: url(.../common/background.jpg); background-repeat: repeat`

> **抽出スクリプトの `pageBackground.resolved` はトップで `rgb(59,58,54)`、`/gardens` で `rgb(0,0,0)` を返すが、これはページ背景ではない。** どちらも**上部ビューポートを覆う全画面の庭園映像／写真**を拾っている（根拠が `viewportTopBySample`）。**コンテンツ領域の地色は白**で、色が付くのはヘッダーのテクスチャとヒーローだけ。**この 1 点を取り違えると全体のトーンを暗く作ってしまう。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **明朝体（主役）**: **Shippori Mincho**（しっぽり明朝、Google Fonts）。ナビ・見出し・本文
- **ゴシック体（副）**: **Noto Sans JP**（可変フォント 100–900）。日付・補足文・タグ・ドロワーナビ

**ロード状況（実測 `document.fonts`）**:

| 書体 | loaded | unloaded |
|------|--------|----------|
| **Shippori Mincho** | **400 / 600 / 700** | 500 |
| **Noto Sans JP** | **100–900（可変）** | — |
| **Libre Baskerville** | 400 | 700 |
| swiper-icons | — | 400 |

> **Shippori Mincho の 500 は宣言されているがロードされない**（参照する要素が無い）。**使えるのは 400 / 600 / 700 の3段**。

### 3.2 欧文フォント

- **セリフ**: **Libre Baskerville**。`Topics` `Gardens/日本庭園` などの**欧文見出し専用**（可視 14 要素）。和文明朝と並べても浮かない、コントラストの穏やかなセリフを選んでいる
- 本文中の数字・日付（`2026.08.25`）は **Noto Sans JP の欧文グリフ**

### 3.3 font-family 指定

```css
/* 見出し・本文・グローバルナビ（和文の主役） */
font-family: "Shippori Mincho", serif;

/* 日付・補足文・タグ・ドロワーナビ */
font-family: "Noto Sans JP", sans-serif;

/* 欧文見出し */
font-family: "Libre Baskerville", serif;
```

**フォールバックの考え方**:
- **明朝には `serif`、ゴシックには `sans-serif`** と generic が正しく対応している（**欧文サンセリフに `serif` を書く誤りをこのサイトは犯していない**）
- ただし **Web フォントが落ちると generic 直行**。ローカルの和文明朝（`"Hiragino Mincho ProN", "Yu Mincho", serif`）をチェーンに足しておく方が安全

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Display（欧文）** | Libre Baskerville | **80px** | 400 | normal | **4px** | `Gardens/日本庭園` |
| **Hero Copy** | **Shippori Mincho** | **40px** | **400** | normal | **4px** | `名園の時間。名画の時間。` 白抜き |
| **Hero Sub（欧文）** | Libre Baskerville | 13px | 400 | 1.00 | 1px | `Time for Great Gardens.` |
| **Section Heading（欧文）** | Libre Baskerville | 26px | 400 | 1.00 | 1px | `Topics` |
| **Exhibition Title** | Shippori Mincho | **22px** | **400** | **1.40** (30.8px) | **2px** | 展覧会名 |
| **Heading 3** | Shippori Mincho | 20px | **600** | normal | normal | `足立美術館の庭園` |
| **Lead** | Shippori Mincho | 16px | **600** | **2.00** (32px) | normal | 節の導入文 |
| **Body** | **Shippori Mincho** | **14px** | **600** | **2.00** (28px) | normal | 本文 |
| **Body Small** | Shippori Mincho | 13px | 600 | **2.00** (26px) | normal | |
| **Global Nav** | Shippori Mincho | **14px** | **600** | 1.00 | normal | `ご利用案内` `庭　園` |
| **Utility Nav** | Shippori Mincho | 13px | 600 | normal | normal | `チケット購入` `アクセス` |
| **Caption / 補足** | **Noto Sans JP** | 14px | 400 | **2.00** (28px) | **1px** | 色 `#3f3f3f` |
| **Drawer Nav** | Noto Sans JP | 13px | 400 | normal | **1px** | 色 `#d6d6d6` |
| **Tag** | Noto Sans JP | 10px | 400 | 1.00 | **1px** | `庭園` `ご案内` |
| **Date** | Noto Sans JP | 13px | 400 | 1.80 | 1px | `2026.08.25` |

**ウェイトの分布**: 400 が 121 件、**600 が 98 件**、700 は 9 件だけ。**700 はグローバルナビのホバー・カレント表示に限る**。

### 3.5 行間・字間

- **本文の行間は `2.00`**（実測 38 要素）。13px → 26px、14px → 28px、16px → 32px と**比率で組まれている**
- **展覧会名は `1.40`**（22px / 30.8px）。**行間を詰めて塊に見せる**
- 1行で終わるナビ・欧文見出しは `1.00`
- **字間は 3 段**:

| 値 | 実測 | 使いどころ |
|----|------|-----------|
| `normal` | 118 要素 | **明朝の本文・見出し・グローバルナビ** |
| **`1px`** | **99 要素** | **Noto Sans JP 全般（補足・タグ・ドロワー）と欧文小見出し** |
| `2px` | 3 要素 | 展覧会名（22px） |
| `4px` | 7 要素 | ヒーロー惹句（40px）・欧文 Display（80px） |

> **字間は px の絶対値で宣言されている。** 40px の惹句の `4px` は 0.1em、80px の Display の `4px` は 0.05em に相当し、**em に読み替えると別物になる。** **px のまま書くこと**（森ビル・カリモク家具と同型の注意）。

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

- 展覧会名・会期は `（月）` `～` を含むため、**行頭に括弧閉じが来ない**よう `line-break: strict` を前提にする
- **明朝＋行間 2.0 の本文は 1 行 30〜40 字で折り返す**のが実サイトの見え方

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";
```

- **可視テキスト 228 件中 228 件に適用**。明朝・ゴシックの別なく全面
- **palt で約物を詰めたうえで `letter-spacing` を足す**のがこのサイトの組み方。**palt だけで済ませない**

### 3.8 縦書き

```css
/* サイド固定タブ「チケットの購入」 */
writing-mode: vertical-rl;
font-size: 14px;
letter-spacing: 1px;
color: #ffffff;
background: #3b3a36;
```

- **実測 1 要素のみ**（`span`、画面右端に固定されたチケット購入タブ）。**縦組みは装飾的なアクセントとして 1 ヶ所だけ使う**
- 残り 227 要素は `horizontal-tb`

---

## 4. Component Stylings

### Buttons

**Utility（ヘッダー：チケット購入 / アクセス）**
- Background: `#e9e9e9`
- Text: `#121212`
- Border: `1px solid #dcdcdc`
- Padding: `0 16px`
- Border Radius: **`0`**
- Font: Shippori Mincho 13px / **600**

**Vertical Tab（右端固定：チケットの購入）**
- Background: `#3b3a36`
- Text: `#ffffff`
- Padding: `22px 0 0`
- Border Radius: **`0`**
- Font: 16px / 600、ラベルは `writing-mode: vertical-rl` の 14px / `letter-spacing: 1px`

**Outline（実績バッジ：ミシュラン / 23YEARS）**
- Background: `transparent`
- Text: `#121212`
- Border: `1px solid #e1ded7`
- Padding: `0 24px 0 102px`（左に画像分の余白）
- Border Radius: **`0`**

**Overlay（写真の上のリンク）**
- Background: `rgba(255, 255, 255, 0.5)`
- Text: `#121212`
- Border: `1px solid #d9d9d9`
- Font: 16px / 600

**Outline on Dark（特別展リンク）**
- Background: `transparent` / Text: `#d6d6d6` / Border: `1px solid #4d4b4b` / 16px / 400 / `letter-spacing: 1px`

### Badges / Tags

| 種別 | Background | Text | Radius | Font |
|------|-----------|------|--------|------|
| **開催中 / 予　告**（一覧） | `#000000` | `#ffffff` | `0` | 14px / 600 |
| **開催中 / 予　告**（カード） | `linear-gradient(90deg, transparent 0%, #69592a 47%, #69592a 100%)` | `#ffffff` | `0` | 13px / 400 |
| **カテゴリタグ** | `#5c5a56` | `#ffffff` | `0` | Noto Sans JP 10px / 400 / `ls: 1px` |
| **実績（23年連続）** | `#007746` | `#ffffff` | `0` | 16px / 600 |
| **丸数字**（`/gardens`） | `#3b3a36` | `#ffffff` | **`50%`** | 14px / 600 |

> **カードのラベル帯は左端が透明のグラデーション。** 写真の上に置いたとき、帯の始まりが硬く切れないための処理。**単色の帯で代用すると印象が変わる。**

### Cards

- Background: 透明（白地がそのまま出る）
- Border: **なし**
- Border Radius: **`0`**
- Shadow: **なし**
- 写真＋ラベル帯（左上に重ねる）＋展覧会名（22px / 400 / `ls: 2px`）＋会期（13px / 400 / `ls: 1px`）

---

## 5. Layout Principles

### Spacing Scale

トークンは存在しない。実測から読み取れる実効スケール:

| Token | Value | 用途 |
|-------|-------|------|
| S | 10–16px | タグ・ボタンの左右 |
| M | 22–24px | ボタンの上下、要素間 |
| L | 50px | 帯ラベルの左パディング |
| XL | 102px | 実績バッジの左（画像領域） |

### Container

- **`max-width: 1000px`**（本文ブロック）と **`max-width: 1280px`**（広いセクション）の2段
- ヒーローは**ビューポート全面**（1440×900 実測）

### Grid

- Topics は横並びのカード、庭園紹介は**画像と本文の左右交互**

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| **0** | **none** | **全要素** |

**影は可視 0 件。角丸も（丸数字を除いて）0 件。** 奥行きは**写真と地色の明度差**だけで表す。

WordPress 既定の `--wp--preset--shadow--natural` 等は宣言されているが**1ヶ所も使われていない**。

---

## 7. Do's and Don'ts

### Do（推奨）

- **和文明朝（Shippori Mincho）の本文は weight 600 で組む。** 400 は 22px 以上の見出し・惹句に限る
- **本文の `line-height` は 2.00。** 13/26、14/28、16/32 と比率で揃える
- **`letter-spacing` は px の絶対値で 1px / 2px / 4px の3段。** 用途に応じて選ぶ（UI・ゴシック＝1px、展覧会名＝2px、大見出し＝4px）
- **`font-feature-settings: "palt"` を全テキストに当てたうえで字間を足す**
- **明朝とゴシックで役割を分ける。** 館の言葉＝明朝、日付・補足・タグ＝Noto Sans JP
- **角丸は使わない**（丸数字の `50%` のみ例外）
- **写真に重ねる帯は片側を透明にする**（`linear-gradient(90deg, transparent, #69592a)`）

### Don't（禁止）

- **ページ背景を暗く作らない。** 抽出結果の `pageBackground.resolved`（`rgb(59,58,54)` / `rgb(0,0,0)`）は**全画面ヒーローを拾った値**で、コンテンツ領域の地色は**白**
- **`letter-spacing` を em に読み替えない。** 4px は 40px の見出しでは 0.1em、80px では 0.05em にあたる。**px のまま宣言する**
- **明朝の本文を weight 400 で組まない。** しっぽり明朝の 400 は細く、14px の本文では痩せて見える（実サイトも 600 を使っている）
- **Shippori Mincho の 500 を使わない**（宣言はあるが `unloaded`）
- **影を足さない・角丸を足さない**
- **金茶を 1 色に丸めない**（帯 `#69592a` / 文字 `#907b3d`）
- **`--swiper-theme-color: #007aff` を設計色として読まない**（ライブラリ既定値）
- **`庭　園` のような全角スペースでの字送りを真似しない。** 実サイトは 2 文字の項目を 4 文字幅に揃えるために**全角スペースを文字列に入れている**が、これは読み上げ・検索・コピーを壊す。**同じ見た目は `letter-spacing` か固定幅で作ること**

---

## 8. Responsive Behavior

### Breakpoints

- メディアクエリはテーマ CSS に集約され、**外部シートのため実測できた条件は限られる**。実装上の基準は **1280px（広いセクション）/ 1000px（本文）** のコンテナ幅
- ヒーローは全ビューポート追従

### タッチターゲット

- ヘッダーのユーティリティボタンは高さ 約36px。**44px に届いていない。** 新規実装では 44px を確保すること
- **右端の縦組みタブはモバイルでも残す**のがこのサイトの導線設計

### フォントサイズの調整

- Display（80px）・Hero（40px）は**ビューポートに応じて縮める**
- **本文 14px / 行間 2.0 はモバイルでも維持する**（明朝の可読性がこの行間に依存している）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text Primary:    #121212
Text Secondary:  #3f3f3f
Dark Fill:       #3b3a36
Gold (帯):       #69592a
Gold (文字):     #907b3d
Green (実績):    #007746
Background:      #ffffff（ヘッダーのみ和紙テクスチャ画像）
Font (和文):     "Shippori Mincho", serif  ※本文は weight 600
Font (ゴシック):  "Noto Sans JP", sans-serif
Font (欧文):     "Libre Baskerville", serif
Body Size:       14px
Line Height:     2.0
Letter Spacing:  normal（明朝本文） / 1px（ゴシック・UI） / 2px（展覧会名） / 4px（大見出し）
OpenType:        font-feature-settings: "palt"
Radius:          0
Shadow:          なし
```

### プロンプト例

```
足立美術館のデザインシステムに従って、展覧会一覧ページを作成してください。
- 和文は "Shippori Mincho", serif。本文・小見出しは weight 600、展覧会名のみ 400
- 補足文・日付・タグは "Noto Sans JP", sans-serif に letter-spacing: 1px
- 全テキストに font-feature-settings: "palt"
- 本文の line-height は 2.0（14px なら 28px）
- 展覧会名は 22px / 400 / line-height 1.4 / letter-spacing 2px
- カードは写真の左上に「開催中」ラベル帯を重ねる。帯は
  linear-gradient(90deg, transparent 0%, #69592a 47%, #69592a 100%) で左端を透かす
- 角丸・影は一切使わない。地色は白、文字は #121212
- 欧文見出しは "Libre Baskerville", serif / letter-spacing 4px
```
