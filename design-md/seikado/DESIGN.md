# DESIGN.md — 静嘉堂文庫美術館（せいかどうぶんこびじゅつかん）

> 東京・丸の内の静嘉堂＠丸の内（明治生命館 1 階）を拠点とする静嘉堂文庫美術館の公式サイト（https://www.seikado.or.jp/）のデザイン仕様書。
> 岩崎彌之助・小彌太父子の蒐集による国宝 7 件・重要文化財 84 件を含む約 20 万冊の古典籍と 6,500 件の東洋古美術を収蔵。国宝「曜変天目」で知られる。
> 最大の特徴は **ページ地色が白ではなく `#e5dfd5`（生成り）** であること。`--main-color` としてトークン化され、**紙の色の上に白いカードを載せる**構成をとる。
> 書体は **見出し・ナビ＝ Shippori Mincho（しっぽり明朝）／本文＝ Noto Sans JP Light(300)／英字＝ Minion Pro** の三層。**UI の骨格を明朝が担う**、美術館サイトらしい設計。
> **`letter-spacing` は全サイズ一律 `0.8px`（px 固定）**、**`line-height` は一律 `1.8`**。**`html { font-size: 62.5% }` で 1rem = 10px** とし、すべて rem で書く。
> **影を一切使わない**（実測 0 件）。奥行きは `1px solid #aaa` の罫と面色だけで作る。
> 実サイトの computed style 実測（2026-08-18 取得。トップページ + 利用案内ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **生成りの紙の上に、紺の明朝で組む**。作品写真は大きく、UI は罫と面色だけで静かに支える
- **静嘉堂文庫美術館について**: 2022 年に世田谷・岡本から丸の内へギャラリーを移した。**重厚な西洋建築（明治生命館）に東洋古美術を置く**という二重性が、生成り＋紺＋金という配色に表れている
- **密度**: 中密度・展覧会情報型。開館日カレンダー、展覧会、イベント、所蔵品紹介を 1 ページに積む
- **キーワード**: 生成り `#e5dfd5`、紺 `#003e7f`、焦茶 `#2c251f`、金 `#e0ba71`、しっぽり明朝、Noto Sans JP Light、行間 1.8、字間 0.8px、影なし
- **特徴**:
  - **ページ背景が生成り `#e5dfd5`**。`--main-color` として定義され、`body` に直接当たっている。**白 `#ffffff` は「カードやボタンの面」であって地色ではない**
  - **見出しと UI が明朝**。h1〜h4、ナビ、ヒーロー、ラベルまで Shippori Mincho。**ゴシック（Noto Sans JP）は本文と一部のユーティリティだけ**
  - **本文が Light(300)**。Noto Sans JP を weight 300 で組み、行間 1.8・字間 0.8px でゆったり流す。**Regular(400) にしない**のが印象を決めている
  - **`letter-spacing: 0.8px` を px で固定**。36px の見出しでは 0.022em、10px のキャプションでは 0.08em になる。**「大きい文字ほど字間が締まる」効果**が結果的に生まれている
  - **`line-height: 1.8` が全体の基準**。例外はヒーローの大見出し（1.2）とニュース本文（1.5）だけ
  - **`html { font-size: 62.5% }`**（1rem = 10px）。CSS はすべて rem で書かれる（`1.4rem` = 14px）
  - **影が 0 件**。`box-shadow` を一切使わず、**`1px solid #aaa` の罫（123 箇所）**で領域を仕切る
  - **角丸は 5px / 10px / 30px の 3 段階**。ボタン 10px、ステータスバッジ 5px、丸い装飾 30px 以上
  - **チケット CTA だけ形が違う**。`border-radius: 0 10px 10px 0` の左端が角ばった赤茶 `#a0371e` のバー（350×60px）を画面左下に固定する
  - **開館日カレンダーが情報設計の中心**。日曜 `#dd0000` / 土曜 `#0000dd` / 平日 `#333`、日付は `#777`、展覧会・イベントを色チップで重ねる

---

## 2. Color Palette & Roles

> CSS Custom Properties が `:root` に定義されている。**そのまま使うこと**。

### Base（紙と面）

- **Main** (`#e5dfd5`) — `--main-color`: **ページ地色（生成り）**。`body` に直接当たる。**この色がサイトの印象そのもの**
- **Sub** (`#ffffff`) — `--sub-color`: **カード・ボタン・カレンダーの面**。地色ではなく「載せるもの」の色

### Point（差し色）

- **Point** (`#003e7f`) — `--point-color`: **紺**。見出し（h1〜h4）、ヘッダーの開館日ブロック、展覧会ラベル、ステータスバッジの文字。**サイトの主役色**
- **Point2** (`#2c251f`) — `--point-color2`: **焦茶**。本文の文字色、イベントラベルの面、ナビの暗幕、画像下のグラデーション
- **Point3** (`#e0ba71`) — `--point-color3`: **金**。`#update-box strong`（更新情報の強調）に使う**唯一の華やかな色**。1.6rem
- **Notice** (`#e05803`) — `--notice-color`: **橙**。注意書き（`.attention` 1.4rem）と、休館日を示す `del` の二重取り消し線（`border-top: 4px double`）

### Accent（変数化されていない実測色）

- **Ticket Red** (`#a0371e`): **チケット購入 CTA のバー**。左下固定、350×60px
- **Deep Red** (`#910000`): グローバルナビ内のチケット関連項目の面
- **Gold Chip** (`#dbd455`): カレンダーの「イベント（スライドトーク等）」チップ。文字は `#333`

### Calendar（開館日カレンダー専用）

- **Closed** (`#d8d8d8`): 休館日のセル
- **Tint Pink** (`#f3e4ea`): 日曜・特定日のセル
- **Tint Mint** (`#ebf3f3`): 平日のセル
- **Sunday Text** (`#dd0000`) / **Saturday Text** (`#0000dd`) / **Weekday Text** (`#333333`) / **Date Text** (`#777777`)

### Neutral（罫）

- **Hairline** (`#aaaaaa`): **主役の罫線（実測 123 箇所）**。セクション・テーブル・カードの区切り
- **Hairline Light** (`#cccccc`): 補助の罫
- **Hairline White** (`#ffffff`): 濃色の上に引く白罫（`.white-line`）
- **Scrim** (`rgba(0, 0, 0, .8)` / `rgba(44, 37, 31, .7)`): ナビ展開時の暗幕・画像のオーバーレイ
- **Image Gradient**: `linear-gradient(to top, transparent 0%, transparent 50%, #2c251f 90%)` — 画像上部に文字を置くための焦茶のかぶせ

---

## 3. Typography Rules

> **明朝が骨格、ゴシックが本文**。`palt` は使わず、**字間 0.8px（px 固定）・行間 1.8** を全体に効かせる。

### 3.1 和文フォント

- **明朝体**: **Shippori Mincho（しっぽり明朝）** — `--mincho-font: 'Shippori Mincho', serif`
  - **見出し（h1〜h4）・グローバルナビ・ヒーロー・展覧会ラベル・ステータスバッジ**に使う
  - weight は **300 / 400 / 500 / 700** を使い分ける（ナビの第 2 階層が 300、既定 400、小見出し・ナビ第 1 階層が 500、「開催中」バッジが 700）
- **ゴシック体**: **Noto Sans JP** — `--gothic-font: 'Noto Sans JP', sans-serif`
  - **本文・注釈・ヘッダーのユーティリティ（LANGUAGE / ENGLISH / リンク集）・ボタンのラベル**に使う
  - **本文は weight 300（Light）**。400 にしない
- **明朝を「見出し用の飾り」にしない**。ナビもラベルも明朝で、**ゴシックのほうが脇役**という珍しい役割配分

### 3.2 欧文フォント

- **セリフ**: **Minion Pro** — `--entitle-font: 'minion-pro', serif`（Adobe Fonts）
  - **セクション名の英語表記専用**（「News」「Collection」「Information / Access」）
  - 24px / weight 400 / **ls 0.48px（0.02em）** / 色 `#003e7f`。**和文見出しの上に小さく置く**
- **サンセリフ**: 欧文専用の指定はなく、Noto Sans JP の欧文グリフに流す
- **カレンダーだけ別スタック**: `"Helvetica Neue", Helvetica, "Hiragino Kaku Gothic ProN", …`（テーブルの数字を等幅感のある欧文で揃えるため）

### 3.3 font-family 指定

```css
:root {
  --main-color:   #e5dfd5;
  --sub-color:    #fff;
  --point-color:  #003e7f;
  --point-color2: #2c251f;
  --point-color3: #e0ba71;
  --notice-color: #e05803;
  --gothic-font: 'Noto Sans JP', sans-serif;
  --mincho-font: 'Shippori Mincho', serif;
  --entitle-font: 'minion-pro', serif;
}

html { font-size: 62.5%; }   /* ★ 1rem = 10px。以降すべて rem で書く */

body {
  background: var(--main-color);
  font-family: var(--mincho-font);   /* ★ 既定が明朝 */
  font-size: 1rem;                   /* = 10px（リセット用の基準） */
  line-height: 1.8;                  /* ★ 全体の基準 */
  letter-spacing: .08rem;            /* = 0.8px。px 固定で全サイズ共通 */
  font-feature-settings: normal;     /* palt は使わない */
}

/* 本文 */
p { font-family: var(--gothic-font); font-size: 1.4rem; font-weight: 300; }

/* セクションの英語表記 */
.en-title { font-family: var(--entitle-font); font-size: 2.4rem; letter-spacing: .048rem; color: var(--point-color); }

/* カレンダーだけ別スタック */
table { font-family: "Helvetica Neue", Helvetica, "Hiragino Kaku Gothic ProN",
                     "ヒラギノ角ゴ ProN W3", Arial, "メイリオ", Meiryo, sans-serif; }
```

**フォールバックの考え方**:

- **明朝・ゴシックとも Google Fonts で完結**する（Shippori Mincho / Noto Sans JP）。**フォールバックは `serif` / `sans-serif` の 1 段だけ**で、游明朝やヒラギノを名指ししない
- **Adobe Fonts に依存するのは英字の Minion Pro だけ**。落ちても `serif` に落ちるため、和文の見え方は壊れない
- Minion Pro を使えない環境では、**EB Garamond / Cormorant Garamond** など**オールドスタイルのセリフ**に置き換えると印象が近い（`Noto Serif` は現代的すぎる）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Title | **明朝** | **38px** | **500** | **1.2 (45.6px)** | 0.8px | 展覧会名。白文字で写真に重ねる |
| Section Head | **明朝** | **36px** | 400 | 1.8 (64.8px) | 0.8px | 「お知らせ」「所蔵品紹介」。色 `#003e7f` |
| Sub Head | **明朝** | 28px | 400 | 1.8 (50.4px) | 0.8px | 「関連イベント」。色 `#003e7f` |
| English Title | **Minion Pro** | 24px | 400 | 1.0 (24px) | **0.48px (0.02em)** | 「News」「Collection」。和文見出しの上 |
| Hero Sub | **明朝** | 24px | 400 | 1.2 (28.8px) | 0.8px | 「十二ヶ月風俗図巻 大公開」 |
| Small Head | **明朝** | 18px | **500** | 1.8 (32.4px) | 0.8px | 「ご予約ならびにオンラインチケットのご購入」 |
| Status | **明朝** | 18px | **700** | 1.8 (32.4px) | 0.8px | 「開催中」。**サイトで唯一の 700** |
| Caption on Photo | **明朝** | 18px | 400 | 1.8 (32.4px) | **1.8px (0.1em)** | 「ミュージアムショップ」。**開いた字間** |
| Open Hours | ゴシック | 18px | **500** | 1.8 (32.4px) | 0.8px | 「本日は開館日」。白文字／紺地 |
| Label | **明朝** | 16px | 400 | 1.4 (22.4px) | 0.8px | 「展覧会」ラベル（紺地に白） |
| Button | ゴシック | 16px | 400 | 1.0 | 0.8px | 「詳しく見る」「年間スケジュール」 |
| Body | ゴシック | **14px** | **300** | **1.8 (25.2px)** | 0.8px | **本文。Light で組む** |
| News Body | ゴシック | 14px | 400 | 1.5 (21px) | 0.8px | お知らせの一覧。色 `#2c251f` |
| Time | ゴシック | 14px | **500** | 1.8 (25.2px) | 0.8px | 「10:00 - 17:00」 |
| Chip | ゴシック | 14px | 400 | — | 0.8px | カレンダーの展覧会・イベントチップ |
| Nav (1st) | **明朝** | 13px | **500** | 1.8 (23.4px) | 0.8px | ドロワーの第 1 階層。白文字 |
| Date | **明朝** | 13px | 400 | 1.5 (19.5px) | 0.8px | 「［前期］6/27(土)〜7/26(日)」 |
| Utility | ゴシック | 12px | 400 | 1.0–1.8 | 0.8px | 「リンク集」「ENGLISH」「サイトマップ」 |
| LANGUAGE | ゴシック | 12px | **700** | 1.8 (21.6px) | 0.8px | 言語切替のラベル |
| Supplement | ゴシック | 12px | **300** | 1.8 (21.6px) | 0.8px | 「※日時指定予約優先です。」 |
| Credit | **明朝** | 10px | 400 | 1.8 (18px) | 0.8px | 「Photo by Keizo Kioku」・作品キャプション |

- **weight は 300 / 400 / 500 / 700 の 4 値**。ただし **700 は「開催中」バッジとカレンダーの曜日ヘッダー、LANGUAGE ラベルの 3 箇所だけ**
- **本文の 300（Light）が最大の特徴**。ここを 400 にすると全体の軽やかさが失われる

### 3.5 行間・字間

- **行間は `1.8` が全体の基準**。見出しもキャプションも同じ
  - 例外 1: **ヒーローの大見出し（38px / 24px）は 1.2** — 写真の上で 2 行に収めるため
  - 例外 2: **ニュース本文は 1.5**、ラベルは 1.4 — 一覧の行数を抑えるため
- **字間は `0.8px` の px 固定**。em ではないため、**大きい文字ほど相対的に締まって見える**（36px→0.022em、10px→0.08em）
  - 例外 1: **写真上のキャプション（18px）だけ 1.8px（0.1em）** に開く
  - 例外 2: **Minion Pro の英字は 0.48px（0.02em）**
- `palt` は使わない

**ガイドライン**:

- **行間 1.8 を崩さない**。日本語の読み物として十分に開き、生成りの地色と合わせて「余白の多い版面」を作っている
- **字間を em に置き換えない**。0.8px 固定という設計をそのまま持つ（em にすると見出しが間延びする）
- **本文は必ず Noto Sans JP の 300**。見出しは Shippori Mincho の 400／500

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
word-break: normal;
line-break: strict;
```

**禁則対象**:

- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 「元禄! 師宣劇場」「民藝 SHOCK!!」のように**感嘆符・和欧混植を含む展覧会名**が頻出する
- 「菱川師宣「十二ヶ月風俗図巻」 江戸時代・17世紀」のような**かぎ括弧＋中黒＋漢数字**のキャプションを割らない
- 「［前期］6/27(土)〜7/26(日)」の**角括弧・スラッシュ・波ダッシュ**を行頭に送らない
- `word-break: break-all` は使わない

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* 全ページ共通 */
```

- **`palt` を掛けない**。Shippori Mincho の字面をそのまま使い、`letter-spacing: 0.8px` だけで調整する
- 明朝に `palt` を効かせると括弧と句読点が詰まり、**古美術のキャプションが読みにくくなる**

### 3.8 縦書き

**縦組みは使わない。** `writing-mode` の指定は 0 件（ロゴの「静嘉堂文庫美術館」は画像）。

---

## 4. Component Stylings

> **影を使わない**。ボタンは白面 ＋ radius 10px、バッジは面色 ＋ radius 0 / 5px。

### Buttons

**White Button（サイトの標準）— `.white-btn`**

- Background: **`#ffffff`**（生成りの地色から浮かせる）
- Text: **`#2c251f`**
- Border: なし（`.white-line` を足すと `1px solid #ffffff`）
- Border Radius: **`10px`**
- Size: **`240 × 50px`（`.small`） / `.wide` は幅いっぱい**
- Font: **ゴシック 16px / 400 / ls 0.8px**
- 例: 「詳しく見る」「年間スケジュール」「所蔵品紹介」「アクセス」

**Ticket CTA（サイトで最も強い導線）— `.ticket-btn`**

- Background: **`#a0371e`**（赤茶）
- Text: `#ffffff`
- Border Radius: **`0 10px 10px 0`**（**左端だけ角ばる**）
- Size: **`350 × 60px`** / Padding: `0 0 0 20px`
- **画面左下に固定表示**し、右端に `→` を置く
- 例: 「チケット購入・日時指定予約」

**Nav Ticket（ドロワー内）**

- Background: `#910000`（深紅） / Text: `#ffffff`
- 明朝 13px / 500

### Badges / Labels

| 種別 | 面 | 文字 | Radius | Padding | Font |
|------|----|------|--------|---------|------|
| 展覧会ラベル `.label-exhibition` | **`#003e7f`** | `#ffffff` | **`0`** | `8px` | 明朝 16px / 400 |
| イベントラベル `.label-lecture` | **`#2c251f`** | `#ffffff` | `0` | `8px` | 明朝 16px / 400 |
| ステータス「開催中」 | `#ffffff` | **`#003e7f`** | `0` | — | 明朝 18px / **700** |
| ステータス「予告」 `.status-preview` | `#ffffff` | `#003e7f` | **`5px`** | `0 5px` | 14px |
| メタ「会期」「日程」 | `#ffffff` | `#2c251f` | **`5px`** | `2px 6px` | 14px |
| カレンダー展覧会チップ | **`#003e7f`** | `#eeeeee` | `0` | `0 4px` | 14px |
| カレンダーイベントチップ | **`#dbd455`** | `#333333` | `0` | `0 4px` | 14px |

- **大きいラベルは radius 0、小さいステータスは radius 5px** という使い分け

### Cards

- Background: **`#ffffff`**（生成りの地色に対して面を作る）
- Border: **`1px solid #aaaaaa`**（**影の代わり**）
- Border Radius: `0`〜`10px`
- Shadow: **なし（サイト全体で 0 件）**
- 構成: 画像 → ラベル（紺 or 焦茶）→ タイトル（明朝）→ 会期（明朝 13px）→ 白ボタン

### Calendar（開館日カレンダー）

- 面: `#ffffff` / 罫: `1px solid #aaaaaa`
- 曜日ヘッダー: **16.2px / 700**。日 `#dd0000` / 土 `#0000dd` / 平日 `#333333`
- 日付: **18px / 400 / `#777777` / lh 1.8**
- セルの色分け: 休館 `#d8d8d8` / 日曜・特定日 `#f3e4ea` / 平日 `#ebf3f3`
- 休館日は **`del` に `border-top: 4px double #e05803`** の二重取り消し線を重ねる
- フォントはここだけ `"Helvetica Neue", Helvetica, "Hiragino Kaku Gothic ProN", …`

### Header

- Background: **`#e5dfd5`**（地色と同じ）
- 開館日ブロック: **`#003e7f` の面に白文字**。「本日は」12px / 500、「開館日」18px / 500、「10:00 - 17:00」14px / 500
- ユーティリティ（リンク集 / サイトマップ / プレスルーム / ENGLISH）: **ゴシック 12px / 400 / `#003e7f`**
- LANGUAGE セレクタ: 白面 ＋ radius 30px（ピル）

### Global Nav（ドロワー）

- Background: **`rgba(0, 0, 0, .8)`** の暗幕
- 第 1 階層: 明朝 13px / **500** / 白
- 第 2 階層: 明朝 11px / **300** / 白
- 画像の上に文字を置く箇所は `linear-gradient(to top, transparent 0%, transparent 50%, #2c251f 90%)` をかぶせる

### Inputs

- 実測できるフォームがトップ／利用案内ページに無いため、**以下は変数から導いた推奨値**
- Background: `#ffffff` / Border: `1px solid #aaaaaa` / Border Radius: `5px`
- Padding: `12px 16px` / Font: ゴシック 14px / 300 / lh 1.8 / ls 0.8px
- Focus: `border-color: #003e7f` ＋ **可視のフォーカスリングを明示**する
- Error: **`#e05803`（`--notice-color`）** の文字と枠。**赤 `#dd0000` はカレンダーの日曜専用**なので流用しない

---

## 5. Layout Principles

### Spacing Scale

`html { font-size: 62.5% }` により **1rem = 10px**。余白も rem で持つ。

| Token | rem | px | 用途 |
|-------|-----|----|------|
| XS | 0.4rem | 4px | チップの左右パディング |
| S | 0.8rem | 8px | ラベルのパディング |
| M | 2rem | 20px | チケットバーの左パディング |
| L | 4rem | 40px | ブロック間 |
| XL | 6rem | 60px | セクション間 |
| XXL | 10rem | 100px | 章の区切り |

### Container

- Max Width: **`1200px`**（本文ブロックは `1000px` / `700px` も併用）
- 中央寄せ: `margin-inline: auto`
- Padding (horizontal): 20px 前後（SP は 15px）

### Grid

- 展覧会・所蔵品は **2〜3 カラム**
- 区切りは **`1px solid #aaaaaa`**。gap ではなく罫で仕切る箇所が多い
- カレンダーは 7 列のテーブル（`<table>` を使う。div グリッドに置き換えない）

---

## 6. Depth & Elevation

**影を使わない。実測で `box-shadow` は 0 件。**

| Level | 表現 | 用途 |
|-------|------|------|
| 0 | **`#e5dfd5` の地色そのまま** | セクション・ヘッダー |
| 1 | **`#ffffff` の面**（生成りとの明度差で浮かせる） | カード・ボタン・カレンダー |
| 1' | **`1px solid #aaaaaa` の罫** | 面を持たないブロックの境界 |
| 2 | **`rgba(0, 0, 0, .8)` の暗幕** | グローバルナビ展開時 |
| 2' | **`linear-gradient(to top, transparent 0%, transparent 50%, #2c251f 90%)`** | 画像の上に文字を置くとき |

- **奥行きは「地色 → 白面 → 暗幕」の 3 段だけ**で表現する
- **`box-shadow` を足さないこと**。影を入れた瞬間に、紙の上に物を置いた質感が壊れる

---

## 7. Do's and Don'ts

### Do（推奨）

- **ページ地色は `#e5dfd5`（生成り）**。白は「載せるもの」の色として使う
- **見出し・ナビ・ラベルは Shippori Mincho**、**本文は Noto Sans JP の 300（Light）**
- **`line-height: 1.8` / `letter-spacing: 0.8px` を全体に効かせる**（字間は px 固定のまま）
- **`html { font-size: 62.5% }` を置き、すべて rem で書く**
- **英語のセクション名は Minion Pro 24px / ls 0.02em / `#003e7f`** で和文見出しの上に置く
- **ボタンは白面 ＋ radius 10px**。240×50px を標準サイズにする
- **チケット CTA は `#a0371e` ＋ `border-radius: 0 10px 10px 0`** で左下に固定する
- **区切りは `1px solid #aaaaaa`**
- 金 `#e0ba71` は**更新情報の強調 1 用途だけ**に留める

### Don't（禁止）

- **背景を白にしない**。`#e5dfd5` を白に変えると、このサイトのデザインは成立しない
- **`box-shadow` を使わない**（サイト全体で 0 件）
- **本文を weight 400 にしない**。300 の軽さが版面をつくっている
- **字間を em に置き換えない**。0.8px 固定という設計を守る
- **`palt` を掛けない**
- **赤 `#dd0000` を UI に流用しない**（カレンダーの日曜専用）。注意喚起は橙 `#e05803`
- **見出しをゴシックにしない**。このサイトは明朝が骨格
- **カレンダーを div グリッドに置き換えない**（`<table>` ＋ `<del>` の意味づけを保つ）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Wide | > 1280px | 最大幅 1200px のコンテナ |
| Desktop | ≤ 1280px / ≤ 1200px | カラム数と余白の調整 |
| Tablet | **`(max-width: 1200px) and (min-width: 768px)`** | タブレット専用の分岐を持つ（`orientation: portrait` の指定も併用） |
| Mobile | **≤ 768px / ≤ 767px** | 1 カラム、ドロワーナビ |
| Small | ≤ 375px / ≤ 320px / ≤ 280px | **小型端末まで 3 段階で詰める** |

- **`max-width: 280px` まで面倒を見る**のが特徴。古い小型端末でカレンダーが破綻しないようにしている

### レイアウトの切り替え

- グリッド: 3 カラム → 2 カラム → 1 カラム
- ナビ: 横並び ＋ ハンバーガー → **全画面ドロワー（`rgba(0,0,0,.8)` の暗幕）**
- チケット CTA: 左下固定のまま。**SP では幅いっぱいのバー**にする
- カレンダー: 7 列を維持し、**チップのテキストを省略表示**に切り替える

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- 白ボタンは 50px 高なので基準を満たす。**ラベル・チップ（padding 8px / 0 4px）はタップ領域を別途確保する**

### フォントサイズの調整

- 見出し: `36px` → 24px、ヒーロー `38px` → 24〜28px
- **本文 14px / lh 1.8 / weight 300 は下げない**
- 字間 0.8px は px 固定のため**そのまま維持**（SP で小さくすると相対的に開いて見え、かえって読みやすい）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:   #e5dfd5   (--main-color)   ★白ではない
Surface:      #ffffff   (--sub-color)
Point:        #003e7f   (--point-color)  見出し・紺のラベル
Point2:       #2c251f   (--point-color2) 本文の文字色・イベントラベル
Point3:       #e0ba71   (--point-color3) 更新情報の強調のみ
Notice:       #e05803   (--notice-color) 注意書き・休館日の二重線
Ticket:       #a0371e   チケット CTA
Hairline:     #aaaaaa   1px solid（影の代わり）

Font (見出し・ナビ): 'Shippori Mincho', serif
Font (本文):        'Noto Sans JP', sans-serif  ★weight 300
Font (英字):        'minion-pro', serif

Root:          html { font-size: 62.5% }  → 1rem = 10px
Body Size:     14px (1.4rem) / weight 300
Line Height:   1.8   （ヒーローのみ 1.2、ニュースは 1.5）
Letter Spacing: 0.8px（px 固定。全サイズ共通）
palt:          使わない
Shadow:        なし（0 件）
Radius:        ボタン 10px / ステータス 5px / ラベル 0
Container:     1200px
Breakpoint:    1200px, 768px, 375px, 320px, 280px
```

### プロンプト例

```
静嘉堂文庫美術館のデザインシステムに従って、展覧会一覧セクションを作成してください。

- ページ背景は #e5dfd5（生成り）。白 #ffffff はカード・ボタンの面としてだけ使う
- html { font-size: 62.5% } を置き、以降は rem で記述する
- 見出しは 'Shippori Mincho', serif / 36px / 400 / line-height: 1.8 / letter-spacing: .8px / 色 #003e7f
- 見出しの上に英語表記を 'minion-pro', serif / 24px / letter-spacing: .48px / 色 #003e7f で置く
- 本文は 'Noto Sans JP', sans-serif / 14px / font-weight: 300 / line-height: 1.8 / letter-spacing: .8px / 色 #2c251f
- 展覧会ラベルは背景 #003e7f・白文字・border-radius: 0・padding: 8px、イベントラベルは #2c251f
- ステータス（予告・会期）は白背景 / border-radius: 5px / padding: 2px 6px
- ボタンは背景 #ffffff / 色 #2c251f / border-radius: 10px / 240×50px / Noto Sans JP 16px
- チケット CTA は背景 #a0371e / border-radius: 0 10px 10px 0 / 350×60px を画面左下に固定
- box-shadow は使わない。区切りは 1px solid #aaaaaa
- font-feature-settings は normal（palt を掛けない）
- コンテナは max-width 1200px。768px 以下で 1 カラム、ナビは rgba(0,0,0,.8) の全画面ドロワー
```
