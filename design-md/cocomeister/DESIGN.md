# DESIGN.md — ココマイスター（COCOMEISTER）

> ココマイスター（https://cocomeister.jp/）のデザイン仕様書。
> 日本の職人が英国・イタリアの革を仕立てる**レザーグッズブランド**の公式 EC（Shopify）。財布・鞄・小物を「革の種類」と「シリーズ」の 2 軸で見せる。
> **見出しは明朝、UI はゴシック**。この分業が全ページで徹底されている。**商品名・セクション見出し・キャッチはすべて `Noto Serif JP` / ヒラギノ明朝**、ナビ・ボタン・価格は `Noto Sans` 系
> **字間が広い**。セクション見出しは **`letter-spacing: 0.10〜0.13em`**、英字の小見出し（`RESTOCK` `NEW ARRIVAL`）は **0.24〜0.28em**。**明朝を開いて組むことで「余白のある高級感」を作る**
> **角丸ゼロ**。Shopify テーマの `--button-border-radius: 0.0rem` / `--input-border-radius: 0.0rem` の通り、ボタンも入力欄も直角。**丸くなるのはバッジ・チップ・カルーセル矢印だけ（`999px` のピル）**
> **色は「革の色」**。主色 `#241a00`（焦茶の黒）、CTA は金 `#a5843a`、面はクリーム `#f5f1e8` / `#f3efe6`。**原色を 1 つも使わない**
> 実サイトの computed style 実測（2026-08-20 取得。トップ ＋ 鞄・バッグ一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **革の色だけで組む**。焦茶（`#241a00`）→ 金（`#a5843a`）→ クリーム（`#f5f1e8`）の 3 段。写真は暗く落ち着いたトーンで、その上に**白い明朝**を置く
- **ココマイスターについて**: 「革を育てる」を軸にしたブランド。**シリーズ名（ダーリントン、ブライドル、コードバン…）が商品の識別単位**で、サイトの導線も「革・シリーズ → 形 → 商品」の順に組まれている
- **密度**: **高い**。EC なのでカードが大量に並ぶが、**カード間の余白を広く取り、見出しの字間を開いて**密度感を殺している
- **キーワード**: 明朝の見出し、`letter-spacing: 0.1em+`、金 `#a5843a`、クリーム `#f5f1e8`、角丸ゼロ、極薄の影
- **特徴**:
  - **明朝とゴシックの役割が完全に分かれている**。**読ませる文字（見出し・商品名・キャッチ）は明朝、操作する文字（ナビ・ボタン・価格・バッジ）はゴシック**
  - **見出しの字間が 0.10〜0.13em**。日本語の明朝を**開いて**組む。「新作、続々登場。」「鞄を形から選ぶ」がその形
  - **英字の小見出しが極端に開く**（`RESTOCK` = 11px / `letter-spacing: 3.08px` = **0.28em**）。金色 ＋ 大文字 ＋ 超広字間の 3 点セットで「章の扉」を作る
  - **角丸ゼロ**。ボタン・入力欄・カード・ページャすべて `border-radius: 0px`。**ピル（`999px`）はバッジ・チップ・カルーセル矢印だけ**
  - **影がほぼ無い**（`0 2px 8px rgba(0,0,0,.05)` 〜 `0 5px 30px rgba(0,0,0,.05)`）。**透明度 5% の 3 段**しか持たない
  - **CTA が金のグラデーション**。`linear-gradient(90deg, rgba(160,121,62,…))` ＋ ピルで、**再販売・入荷通知のような「特別な導線」にだけ使う**
  - **写真の上のボタンは半透明の黒 ＋ 白 1px 枠**（`rgba(0,0,0,0.16〜0.18)`）。**面色を持たせず、写真を透けさせる**
  - **⚠ Shopify テーマ変数と実装が食い違う**（後述）。`--heading-font-family` は `"Noto Sans Japanese"` を宣言しているが、**実際の見出しは全部明朝**

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）。

### Brand（ブランド）

- **Leather Black** (`#241a00`, rgb 36,26,0): **主色**。`--c-color-primary`。文字色、アナウンスバー、フッター、ページャの現在地。**純黒ではなく黄みを含んだ焦茶の黒**
- **Gold** (`#a5843a`, rgb 165,132,58): **CTA の色**。ヒーローの「商品を見る」の面、金グラデーションの基色
- **Cream** (`#f5f1e8`, rgb 245,241,232): **主要な面色**。革の紹介カード、セクションの地

### Gold Scale（金の階調）

| 用途 | 色 | rgb | 備考 |
|------|-----|-----|------|
| CTA（塗り） | **`#a5843a`** | 165,132,58 | 「商品を見る」 |
| 英字ラベル（濃） | **`#9a7d1f`** | 154,125,31 | `Pick Up KABAN` |
| 英字ラベル | **`#a0793e`** | 160,121,62 | `RESTOCK` |
| 英字ラベル（淡） | **`#9b7a4f`** | 155,122,79 | `NEW ARRIVAL` |
| 英字ラベル（渋） | **`#8a6a35`** | 138,106,53 | `Bag Category` |
| 明るい金 | **`#c8aa62`** | 200,170,98 | 暗い面の上の英字（`Bag Special Contents`） |
| 淡い金 | **`#d7c287`** | 215,194,135 | 暗い面の上の英字（`Shoulder Bag`） |

- **金が 7 トーンに散っている**。**新規実装では `#a5843a`（塗り）と `#8a6a35`（明るい面の上の文字）と `#c8aa62`（暗い面の上の文字）の 3 つに絞る**

### Cream / Surface（面色）

| 面 | 色 | rgb | 用途 |
|----|-----|-----|------|
| クリーム | **`#f5f1e8`** | 245,241,232 | 革の紹介カード |
| クリーム（淡） | **`#f3efe6`** | 243,239,230 | 一覧ページの地 |
| ベージュ | **`#eee8dd`** | 238,232,221 | 革カードの別トーン |
| ベージュ（濃） | **`#e8e3d9`** | 232,227,217 | 「新商品」バッジの面 |
| グレージュ | **`#f2f1f0`** | 242,241,240 | `--c-color-bg-light` |
| ボーダー | **`#d3d1cc`** | 211,209,204 | `--c-color-border` |

### Dark Surface（暗い面）

| 面 | 色 | rgb | 用途 |
|----|-----|-----|------|
| 焦茶の黒 | **`#241a00`** | 36,26,0 | アナウンスバー・フッター |
| 黒（茶寄り） | **`#15110c`** | 21,17,12 | 「経年育成タイプ」等のカテゴリカード |
| 黒（灰寄り） | **`#211b14`** | 33,27,20 | 商品名の文字色 |
| 濃茶 | **`#2b1608`** | 43,22,8 | バッジの下地（`0.48` の透過で使う） |
| 焦茶 | **`#2b1a10`** | 43,26,16 | 見出しの文字色 |

**グラデーション**（暗い面の質感づくり）:

```css
/* カテゴリカードの面 */
background: linear-gradient(135deg, #21160e 0%, #6b5536 48%, #2b2118 100%);

/* 特集ブロック（金の光を差す） */
background:
  radial-gradient(circle at 72% 42%, rgba(165,132,58,.18), rgba(0,0,0,0) 35%),
  linear-gradient(135deg, #1a1510 0%, #0f0d0b 100%);

/* 写真の上のスクリム（下端だけ暗くする） */
background: linear-gradient(rgba(0,0,0,0) 16%, rgba(0,0,0,.6) 100%);
```

### Neutral（ニュートラル）

- **Text Primary** (`#241a00`): 本文・見出し
- **Text Secondary** (`#7c7666`, rgb 124,118,102): `--c-color-secondary`
- **Text Muted** (`#756b5e`, rgb 117,107,94): 日付・商品説明
- **Text Muted（茶寄り）** (`#6f6250`, rgb 111,98,80): セクションのリード文
- **Disabled** (`#999999`): `--c-color-muted`
- **Background** (`#ffffff`)

### Semantic（意味的な色）

- **Sold Out / 非活性**: `rgba(36,26,0,0.82)` の面 ＋ 白文字（ピル）
- **Restock / 再販売**: `rgba(43,22,8,0.48)` の面 ＋ `rgba(255,255,255,0.96)` 文字（ピル ＋ 1px 白枠）
- **New**: `#e8e3d9` の面 ＋ `#241a00` 文字
- **Danger / Warning / Success**: 実サイトに専用色を持たない。**原色を持ち込まず、`#241a00`（強）と `#a5843a`（注目）で表現する**
- **⚠ `--c-color-accent: #0070c9`（Shopify 既定の青）が変数に残っているが、実際には使われていない**。**この青を使わない**

---

## 3. Typography Rules

> **明朝（見出し）とゴシック（UI）の分業**、**0.1em を超える字間**の 2 点がこのサイトの核。

### 3.1 和文フォント

**明朝体（見出し・商品名・キャッチ）**

```css
font-family: "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif;
```

- **ヒーロー見出し・セクション見出し・商品名がすべてこれ**
- **カードの商品名だけ別の順序**になっている箇所がある（`"Hiragino Mincho ProN", "Yu Mincho", YuMincho, serif` = **OS フォント優先**）。**新規実装では `Noto Serif JP` を先頭に統一する**

**ゴシック体（UI・本文・価格）**

```css
font-family: "Noto Sans Japanese", sans-serif;   /* Shopify がホストする Noto Sans JP */
```

- ナビ、アナウンスバー、価格、リード文、日付
- **ボタンだけ別の宣言**（`"Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif`）。**フォールバックが付いているのはボタンだけ**

> **⚠ 書体の宣言が 5 系統に割れている**（明朝 3 種・ゴシック 2 種）。実装では**明朝 1 本・ゴシック 1 本**に整理する。

- **ウェイトは 400 / 500 / 600 の 3 段**。**700 を使わない**
  - **明朝は 500 が基準**（見出し・商品名）。太らせずに大きさで階層をつくる
  - **ゴシックは 400 が基準**、強調に 500

### 3.2 欧文フォント

- **英字の小見出しに `Times New Roman` を先頭指定している箇所がある**（`Bag Category` `Pick Up KABAN` `Shoulder Bag`）
  - `font-family: "Times New Roman", "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif`
  - **セリフ体の英字を明朝の和文と並べる**ための指定。**大文字 ＋ 0.16〜0.28em の字間**で使う
- **ロゴタイプ（COCOMEISTER）は画像**。細いセリフ体のレタリング

### 3.3 font-family 指定

```css
/* 見出し・商品名・キャッチ（明朝） */
--font-serif: "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif;

/* UI・本文・価格（ゴシック） */
--font-sans: "Noto Sans JP", "Hiragino Sans", "Yu Gothic", "Noto Sans Japanese", sans-serif;

/* 英字の小見出し（セリフ体の欧文） */
--font-eyebrow: "Times New Roman", "Noto Serif JP", "Yu Mincho", serif;
```

**フォールバックの考え方**:
- **和文フォントを先に指定**（`Noto Serif JP` / `Noto Sans JP`）
- **明朝は `Yu Mincho` → `Hiragino Mincho ProN` の順**（Windows を先に置く。Mac は次で必ず拾える）
- **英字の小見出しだけ `Times New Roman` を先頭に置く**。ここは意図的な和欧分離

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 用途 |
|------|------|------|--------|-------------|----------------|------|
| Hero Title | 明朝 | 38–42px | 500 | 1.30–1.34 | **0.08–0.09em** | ヒーローのキャッチ |
| Section Head | 明朝 | 38–43px | 400 / 500 | 1.45–1.55 | **0.10–0.12em** | 「鞄を形から選ぶ」「直営店のご案内」 |
| Section Head（小） | 明朝 | 25–31px | 400 / 500 | 1.45–1.55 | **0.13–0.18em** | 「新作、続々登場。」「PICK UP シリーズ」 |
| Category Title | 明朝 | 26–31px | 400 / 500 | 1.40–1.45 | **0.08em** | 「経年育成タイプ」「ショルダーバッグ」 |
| Product Name | 明朝 | 16–20px | 400 / 500 | 1.40–1.55 | **0.045–0.075em** | 商品名 |
| Eyebrow（英字） | Times / 明朝 | 11–13px | 400 / 500 | 1.0–1.5 | **0.16–0.28em** | `RESTOCK` `NEW ARRIVAL` `Bag Category` |
| Lead | 明朝 | 17–19px | 400 | **2.0** | 0.075–0.08em | ヒーロー下の説明文 |
| Body | ゴシック | 16px | 400 | **1.65** | normal | 既定 |
| Body（読み物） | ゴシック / 明朝 | 14px | 400 | **2.0** | 0.05em | セクションのリード文 |
| Caption | ゴシック | 12px | 400 | 1.70 | 0.18em | ナビの小項目 |
| Micro | ゴシック | 9px | 400 / 500 | 1.45–1.60 | 0.03–0.16em | カードの日付・補足 |
| Price | ゴシック | 15–18px | 500 / 600 | 1.45 | 0.04em | 価格 |

- **見出しは 25px 以上のとき必ず明朝**。それ以下の商品名も明朝だが、**UI ラベルはサイズにかかわらずゴシック**
- **9px の極小テキストがある**（カードの日付・補足）。**モバイルでは 11px 以上に引き上げる**

### 3.5 行間・字間

- **本文の行間**: **1.65**（16px → 26.4px）が既定
- **読み物・リード文の行間**: **2.0**（14px → 28px / 17px → 34px）
- **見出しの行間**: **1.30〜1.55**。**字間が広い分、行間は詰めすぎない**
- **字間**:
  - **セクション見出し: 0.10〜0.13em**（明朝を開く）
  - **ヒーロー見出し: 0.08〜0.09em**
  - **商品名: 0.045〜0.075em**
  - **英字の小見出し: 0.16〜0.28em**（大文字 ＋ 金色 ＋ 超広字間）
  - **本文: normal〜0.05em**
  - **ボタン: 0.05〜0.14em**（`padding: 0 42px` のアウトラインボタンほど広い）

**ガイドライン**:
- **明朝で組む見出しは必ず字間を 0.08em 以上開く**。詰めると「和文の明朝」ではなく「本文の拡大」に見える
- **英字ラベルは 0.2em 前後 ＋ 大文字 ＋ 金色**をセットで使う。3 つ揃って初めて「扉」になる
- **本文（ゴシック）の字間は開かない**。開くのは見出しとラベルだけ

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- **商品名にカタカナの長い連結が多い**（「ダーリントン バックパックスリム」「マルティーニ レオナルド」）。**半角スペースで区切って改行位置を作る**のがこのサイトの表記慣習
- **シリーズ名（英字）と商品名（和文）を 2 行で組む**（`Darlington` / `ダーリントン LOGショルダー`）
- **行頭禁止**: `）」』】〕〉》、。，．・：；？！`／**行末禁止**: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* このサイトは palt を使わない */
```

- **`palt` を一切使っていない**（全要素 `font-feature-settings: normal`）
- **理由**: 字間を **0.1em 以上開く**設計なので、**約物を詰める palt と方向が逆**
- **実装でも palt を足さない**。足すと括弧まわりだけ詰まり、開いた字間との落差が出る

### 3.8 縦書き

該当なし。**全ページ横書き**。

---

## 4. Component Stylings

### Buttons

> **`--button-border-radius: 0.0rem`**。**塗りも枠線も直角**。

**Primary（金の塗り）**

- Background: **`#a5843a`** ／ Text: `#ffffff`
- Border: `1px solid #a5843a` ／ Border Radius: **`0px`**
- Padding: **`0 24px`**（高さは line-height で作る）
- Font: **14px / weight 400 / `letter-spacing: 0.1em`**（ゴシック）
- 例: ヒーローの「商品を見る」

**Secondary（アウトライン）**

- Background: `transparent` ／ Text: **`#241a00`**
- Border: **`1px solid rgba(36,26,0,0.35)`**（**枠は主色の透過**）
- Padding: **`0 42px`** ／ Radius: `0px`
- Font: **13px / weight 400 / `letter-spacing: 0.12em`**
- 例: 「ジャーナル一覧を見る」「すべてのシリーズを見る」

**Ghost（写真の上）**

- Background: **`rgba(0,0,0,0.16)`〜`rgba(0,0,0,0.18)`** ／ Text: `#ffffff`
- Border: **`1px solid rgba(255,255,255,0.5)`** ／ Radius: `0px`
- Padding: `0 20px`〜`0 24px` ／ Font: 12–14px / `letter-spacing: 0.075em`
- **写真の上に置くボタンは必ずこの形**。白い塗りにしない

**Special（金のグラデーション ＋ ピル）**

```css
background: linear-gradient(90deg, rgba(160,121,62,.18), rgba(160,121,62,.06));
border: 1px solid rgba(160,121,62,.45);
border-radius: 999px;
padding: 8px 13px;
color: #806139;
font-size: 12px;
font-weight: 600;
letter-spacing: 0.07em;
```

- **再販売の予告など「特別な告知」にだけ使う**。通常の CTA に使わない

### Badges / Chips

**ここだけがピル（`border-radius: 999px`）。**

| 種別 | 面 | 文字 | 枠 | Padding | Font |
|------|-----|------|-----|---------|------|
| **Pick Up** | `rgba(36,26,0,0.82)` | `#ffffff` | なし | `0 12px` | 11px / 0.08em |
| **Sold Out** | `rgba(36,26,0,0.82)` | `#ffffff` | なし | `0 10px` | 10px / 0.075em |
| **再販売** | `rgba(43,22,8,0.48)` | `rgba(255,255,255,0.96)` | `1px solid rgba(255,255,255,0.5)` | `0 10px` | 10px / 0.08em |
| **新商品** | `#e8e3d9` | `#241a00` | なし | `0 12px` | 11px / 0.08em |
| **絞り込みチップ** | `rgba(255,255,255,0.44)` | `rgba(43,26,16,0.66)` | `1px solid rgba(153,124,74,0.4)` | `12px 14px` | 12px / 0.05em |

### Cards

**商品カード**

- Background: `#ffffff` ／ Border: なし ／ Radius: **`0px`**
- Shadow: **`0 2px 8px rgba(0,0,0,0.05)`**（`--shadow-sm`）
- 構成: 画像 → 日付 or 連番（9px / `#756b5e`）→ **商品名（16–20px / 明朝 / 500）** → 価格（ゴシック）
- **カードの左上にピルのバッジを重ねる**（`Pick Up` / `Sold Out` / `再販売`）

**革の紹介カード**

- Background: **`#f5f1e8`** または **`#eee8dd`** ／ Border: `1px solid #ded8cd` ／ Radius: `0px`
- 構成: 英字（Times / 金）→ 和名（明朝）→ 説明（14px / lh 2.0）

**カテゴリカード（暗い面）**

- Background: 前掲のグラデーション ／ 文字 `#ffffff`
- 英字ラベル（`#c8aa62` / `#d7c287`）→ 和文見出し（明朝 26–31px / 0.08em）

### Pagination

- 現在地: 面 **`#241a00`** ／ 白文字 ／ `1px solid #241a00` ／ Radius `0px` ／ Padding `0 14px`
- 非現在地: 面 `rgba(255,255,255,0.52)` ／ 文字 `#241a00` ／ `1px solid rgba(80,64,40,0.3)`
- Font: 13px / 明朝 / `letter-spacing: 0.05em`

### Carousel Controls

- **円形**（`border-radius: 999px`）／ 面 `rgba(0,0,0,0.18)` ／ 文字 `#ffffff` ／ 枠 `1px solid rgba(255,255,255,0.5)`
- Font: 18px

### Inputs

> **`--input-border-radius: 0.0rem`**。

- Background: `#ffffff` ／ Border: **`1px solid #d3d1cc`**（`--c-color-border`）
- Border (focus): **`1px solid #a5843a`**（金）
- Border Radius: **`0px`** ／ Padding: `12px 16px`
- Font: 16px / ゴシック / weight 400 ／ Text: `#241a00` ／ Placeholder: `#999999`
- Error: `1px solid #8a2f14` 相当 ＋ エラーテキスト。**原色の赤を使わず、革の色域に寄せる**
- `<select>`: 12px / `letter-spacing: 0.04em` / 角丸ゼロ

---

## 5. Layout Principles

### Spacing Scale

**Shopify テーマの変数（`--c-space-*`）をそのまま使う。**

| Token | Value |
|-------|-------|
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 15 | 60px |
| 20 | **80px** |

- **セクション間は 80px（`--c-space-20`）**

### Radius Scale

| Token | Value | 実際の使用 |
|-------|-------|-----------|
| `--c-radius-sm` | 4px | **未使用** |
| `--c-radius-md` | 8px | **未使用** |
| `--c-radius-lg` | 12px | **未使用** |
| `--c-radius-xl` | 20px | **未使用** |
| `--c-radius-2xl` | 24px | **未使用** |
| `--c-radius-pill` | 100px | バッジ・チップ（実装は `999px`） |
| `--c-radius-full` | 50% | カルーセル矢印 |

- **⚠ 変数は 7 段あるが、実際に使われるのはピルと円だけ**。**4〜24px の角丸は 1 箇所も使われていない**

### Container

- ヘッダー: **中央にロゴ、左にハンバーガー、右にアカウント・検索・カート**（Shopify の標準構成）
- **最上段にアナウンスバー**（面 `#241a00` ／ 白文字 15px / weight 500 / `letter-spacing: 0.035em`）
- フッター: 面 `#241a00` ／ 白文字
- ヒーロー: **全幅の写真 ＋ 左に半透明のテキストパネル**

### Grid

- 商品一覧: **3〜4 カラム**
- 特集カード: **2 カラム**（大きな画像 ＋ 明朝の見出し）
- 革の紹介: **横スクロールのカルーセル**
- Gutter: 24px 目安
- **セクションの区切りは面色**（`#f3efe6` / `#f5f1e8` の帯）。罫線を使わない

---

## 6. Depth & Elevation

**影は 3 段だが、すべて透明度 5%。**「浮かせる」のではなく「わずかに持ち上げる」。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | セクション・バッジ・ボタン |
| 1 | **`0 2px 8px rgba(0,0,0,0.05)`** | `--shadow-sm`。商品カード |
| 2 | **`0 5px 15px rgba(0,0,0,0.05)`** | `--shadow`。ドロップダウン |
| 3 | **`0 5px 30px rgba(0,0,0,0.05)`** | `--shadow-md`。モーダル・ドロワー |

- **3 段とも `rgba(0,0,0,0.05)` で不透明度が同じ**。**変わるのはぼかし半径だけ**（8 → 15 → 30px）
- **奥行きは主に面色でつくる**:

| 面 | 色 | 用途 |
|----|-----|------|
| 地 | `#ffffff` | ページ全体・商品カード |
| クリーム | `#f5f1e8` / `#f3efe6` | セクションの地・革カード |
| ベージュ | `#eee8dd` / `#e8e3d9` | カードの別トーン・バッジ |
| 暗い面 | `#15110c` / グラデーション | カテゴリカード・特集 |
| 最暗 | `#241a00` | アナウンスバー・フッター |

---

## 7. Do's and Don'ts

### Do（推奨）

- **見出し・商品名・キャッチは明朝**（`"Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif`）、**ナビ・ボタン・価格・バッジはゴシック**にする。この分業を全ページで守る
- **明朝の見出しは字間を 0.08em 以上開く**（セクション見出しは 0.10〜0.13em）
- **英字の小見出しは「大文字 ＋ 金色 ＋ 0.2em 前後の字間」の 3 点セット**にする（`RESTOCK` `NEW ARRIVAL`）
- **weight は 400 / 500 / 600 の 3 段**にとどめる。**700 を使わない**（明朝が潰れる）
- **`border-radius: 0px` を原則**にする。**ピル（`999px`）はバッジ・チップ・カルーセル矢印だけ**
- **CTA は金 `#a5843a` の塗り ＋ 白文字 ＋ 直角**にする
- **写真の上のボタンは `rgba(0,0,0,0.16)` ＋ 1px の白枠**にする
- **影は `rgba(0,0,0,0.05)` の 3 段だけ**。ぼかし半径（8 / 15 / 30px）で使い分ける
- **面色はクリームの階調**（`#f5f1e8` / `#f3efe6` / `#eee8dd` / `#e8e3d9`）で作る
- **本文の行間は 1.65、リード文は 2.0** にする
- **商品名は半角スペースで区切って改行位置を作る**（「ダーリントン バックパックスリム」）
- **セクションの区切りは罫線ではなく面色の帯**にする

### Don't（禁止）

- **`font-feature-settings: "palt"` を使わない**。字間を開く設計と方向が逆
- **見出しをゴシックにしない**。Shopify テーマ変数（`--heading-font-family: "Noto Sans Japanese"`）を信じて実装すると**このブランドの見た目が消える**
- **見出しの字間を詰めない**（0.08em を下回ると「本文を大きくしただけ」に見える）
- **本文（ゴシック）の字間を 0.05em より開かない**。開くのは見出しとラベルだけ
- **`--c-color-accent: #0070c9`（Shopify 既定の青）を使わない**。**サイト内に原色は 1 つも存在しない**
- **`--c-radius-sm`〜`2xl`（4〜24px）を使わない**。**実サイトでは 1 箇所も使われていない**
- **ボタンや入力欄を角丸にしない**（`--button-border-radius: 0.0rem`）
- **影を濃くしない**。`rgba(0,0,0,0.05)` を超える影はこのサイトに存在しない
- **金を 7 トーンに散らさない**（実サイトは散っている）。`#a5843a` / `#8a6a35` / `#c8aa62` の 3 つに絞る
- **weight 700 を使わない**
- **9px の極小テキストをモバイルに持ち込まない**（11px 以上に上げる）
- **書体の宣言を増やさない**。**明朝 1 本・ゴシック 1 本 ＋ 英字ラベル用の Times** の 3 宣言で足りる

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 749px | 1〜2 カラム。ヒーローのテキストパネルは全幅。ハンバーガー ＋ 中央ロゴ |
| Tablet | 750–989px | 商品一覧 2〜3 カラム |
| Desktop | ≥ 990px | 商品一覧 3〜4 カラム。特集カード 2 カラム |

（Shopify の標準ブレークポイントに準拠）

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）
- **Primary Button は `padding: 0 24px` ＋ 14px / lh 1.65** で高さ 46px 前後。基準を満たす
- **アウトラインボタンは `padding: 0 42px`** と横に長い。**モバイルでは全幅（`width: 100%`）に切り替える**
- **バッジは高さ 20px 前後**。**バッジ単体をタップ対象にせず、カード全体をタップ領域にする**
- **カルーセル矢印は円形 36px**。**モバイルでは 44px に拡大するか、スワイプに委ねて非表示にする**

### フォントサイズの調整

- Hero Title 38–42px → **26–28px**。**`letter-spacing: 0.08em` は維持する**
- Section Head 38–43px → **24–26px**。**字間は 0.1em を維持する**（ここを詰めるとブランドの印象が変わる）
- Category Title 26–31px → 20px
- Product Name 16–20px → 15–16px（明朝のまま）
- Eyebrow（英字）11–13px は据え置き。**0.2em の字間も維持する**
- 本文 16px / lh 1.65 は据え置く
- **Micro 9px は 11px に引き上げる**（明朝・クリーム地では 9px が読めない）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff   （ページ地色）
Leather Black:   #241a00   （主色。文字・アナウンスバー・フッター・ページャ現在地）
Gold:            #a5843a   （CTA の塗り）／ #8a6a35（明るい面の上の英字）
                 #c8aa62   （暗い面の上の英字）
Cream:           #f5f1e8   （主要な面色）／ #f3efe6（一覧の地）
Beige:           #eee8dd   （革カード）／ #e8e3d9（「新商品」バッジ）
Border:          #d3d1cc
Dark Surface:    #15110c   （カテゴリカード）／ #211b14（商品名の文字）
Text Muted:      #756b5e   （日付・説明）／ #7c7666（secondary）／ #999999（disabled）
使わない色:       #0070c9（Shopify 既定の青。変数に残っているが未使用）
Serif（見出し）:  "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif
Sans（UI）:      "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif
Eyebrow（英字）:  "Times New Roman", "Noto Serif JP", "Yu Mincho", serif
Weight:          400 / 500 / 600 の 3 段。700 は使わない
Hero:            38–42px / 明朝 / 500 / lh 1.3 / ls 0.08em
Section Head:    38–43px / 明朝 / 500 / lh 1.5 / ls 0.10–0.13em
Product Name:    16–20px / 明朝 / 500 / lh 1.45 / ls 0.05em
Eyebrow:         11–13px / Times / 大文字 / 金 / ls 0.2em 前後
Body:            16px / ゴシック / 400 / lh 1.65 / ls normal
Lead:            14–17px / lh 2.0 / ls 0.05em
Feature:         font-feature-settings: normal（palt を使わない）
Radius:          0px（ボタン・入力欄・カード・ページャ）
                 999px（バッジ・チップ・カルーセル矢印だけ）
Shadow:          0 2px 8px rgba(0,0,0,.05) / 0 5px 15px rgba(0,0,0,.05) / 0 5px 30px rgba(0,0,0,.05)
Spacing:         4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 60 / 80px
```

### プロンプト例

```
ココマイスターのデザインシステムに従って、革小物の商品一覧ページを作成してください。
- 書体は 2 本立てにする：
  見出し・商品名・キャッチ = "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif（明朝）
  ナビ・ボタン・価格・バッジ・本文 = "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif
  英字の小見出しだけ "Times New Roman", "Noto Serif JP", serif
- weight は 400 / 500 / 600 の 3 段だけ。700 は使わない
- 明朝の見出しは字間を開く：
  ヒーロー 38–42px / 500 / lh 1.3 / letter-spacing 0.08em
  セクション見出し 38–43px / 500 / lh 1.5 / letter-spacing 0.12em
  商品名 16–20px / 500 / lh 1.45 / letter-spacing 0.05em
- 英字の小見出し（RESTOCK / NEW ARRIVAL / Bag Category）は
  「大文字 ＋ 金色 #8a6a35 ＋ letter-spacing 0.2em ＋ 11–13px」の 3 点セットで組む
- 本文はゴシック 16px / 400 / line-height 1.65 / letter-spacing normal。
  リード文だけ 14px / line-height 2.0 / letter-spacing 0.05em
- font-feature-settings は normal のまま。palt を使わない（字間を開く設計と逆になる）
- 配色は革の色だけで組む：
  地 #ffffff、主色 #241a00、CTA の金 #a5843a、
  面 #f5f1e8 / #f3efe6 / #eee8dd、ボーダー #d3d1cc、
  暗い面 #15110c、補足文字 #756b5e。原色（特に青 #0070c9）は使わない
- border-radius は 0px を原則にする。ボタン・入力欄・カード・ページャはすべて直角。
  ピル（999px）にしてよいのはバッジ・チップ・カルーセル矢印だけ
- CTA は 面 #a5843a ＋ 白文字 ＋ padding 0 24px ＋ radius 0 ＋ 14px / ls 0.1em
- アウトラインボタンは 透明 ＋ 文字 #241a00 ＋ border 1px solid rgba(36,26,0,.35) ＋
  padding 0 42px ＋ 13px / ls 0.12em
- 写真の上のボタンは rgba(0,0,0,.16) ＋ 1px solid rgba(255,255,255,.5) ＋ 白文字にする
- 商品カードは影 0 2px 8px rgba(0,0,0,.05) のみ。左上に rgba(36,26,0,.82) のピルバッジを重ねる
- セクションの区切りは罫線ではなくクリームの面色（#f3efe6 / #f5f1e8）の帯で作る
- 余白は 4/8/12/16/20/24/32/40/48/60/80px のスケールに従い、セクション間は 80px
- 商品一覧は 3〜4 カラム
```
