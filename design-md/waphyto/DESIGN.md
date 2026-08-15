# DESIGN.md — Waphyto（ワフィト）

> Waphyto（https://waphyto.com/）のデザイン仕様書。
> 岐阜・東濃の植物と発酵の技術をもとにした植物療法ブランド。**「和 × phyto（植物）」**を名に持ち、スキンケア・フェムケアを展開する。
> **地が `#f0ebe1`（生成りのベージュ）**。白地ではない。**ページ全体が紙の色で、写真とカードだけが白く浮く**という反転した明度設計をとる。
> **本文が明朝（`Noto Serif JP`）**。しかも **`line-height: 2.0`（14px → 28px）**、**`letter-spacing: 0.05em`**。**14px という小さい本文を、行間と字間だけで読ませる**
> **書体が 3 系統に分かれる**。本文＝`Noto Serif JP`（明朝）／ 欧文見出し＝`Bentham`（オールドスタイル・セリフ）／ ナビ・ボタン＝`dnp-shuei-gothic-gin-std`（秀英角ゴシック銀）。**読ませる文字は明朝、操作する文字はゴシック**
> **`border-radius` は全要素 0px**。角丸が 1 つも無い。
> 実サイトの computed style 実測（2026-08-15 取得。トップ ＋ すべての商品）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **生成りの地 `#f0ebe1` に、白い写真とカードを置く**。線も面も最小限で、**余白と写真の白さが構造をつくる**
- **Waphyto について**: 植物療法士・小林ダイスケ氏の監修と東濃の植物を軸にしたブランド。**製品写真が常に主役**で、UI は写真の邪魔をしない位置に退く
- **密度**: **低い**。ファーストビューは製品写真 1 枚（横長のスライダー）とロゴだけ。ヘッダーは高さ 88px 前後で、ロゴ・検索・カートの 3 要素しか置かない
- **キーワード**: 生成り `#f0ebe1`、明朝の本文、`Bentham`、秀英角ゴシック銀、セージ `#6c8b7e`、テラコッタ `#e96952`、角丸ゼロ、行間 2.0
- **特徴**:
  - **本文が明朝（`Noto Serif JP` / 14px / weight 400）**。**日本語 EC で本文を明朝にするのは少数派**で、これがブランドの声になっている
  - **欧文見出しに `Bentham`**（18 世紀のオールドスタイル・セリフ）。`Topics` `Moments of Care` `UV Care Kit` `Subscription Service` といった**見出しが常に英語**で置かれ、和文の説明が下に続く
  - **ナビ・ボタンだけゴシック**（`dnp-shuei-gothic-gin-std` ＝ **秀英角ゴシック銀 / DNP・Adobe Fonts**）。**weight 500 固定**
  - **`letter-spacing: 0.7px`（14px に対して 0.05em）が全要素に効く**。ボタンだけ `1px` に上げる
  - **`border-radius: 0px` が全要素**。ボタン・ラベル・カード・入力のすべてが直角
  - **`box-shadow` はほぼ無い**。例外は画面端に貼り付く「私のお気に入り」タブの **`0 0 25px rgba(0,0,0,0.2)`** だけ
  - **有彩色が 3 つだけ**。セージ `#6c8b7e`（実行）／ テラコッタ `#e96952`・`#ca6e61`（お気に入り・定期便）／ スレート `#344150`（ログイン）
  - **地・面・線がすべてベージュの階調**（`#f0ebe1` / `#f9f7f3` / `#efebe2` / `#dad1ca` / `#dfd4bf`）。**5 段の生成り**を持つ

---

## 2. Color Palette & Roles

> 実測値。地は `#f0ebe1`（`pageBackground.resolved` = `rgb(240,235,225)` / 根拠 `body`。CSS 変数 `--body-color` / `--color-primary-background` と一致）。

### Base（生成りの 5 段）

- **Body** (`#f0ebe1`, rgb 240,235,225): **ページ地色**。**純白ではない**。`--body-color` / `--color-primary-background`
- **Surface** (`#ffffff`): **写真・商品カード・ドロワー・入力の面**。`--body-secondary-color` / `--color-secondary-background`
- **Surface Warm** (`#f9f7f3`, rgb 249,247,243): タブの非選択状態など、**白と地の中間**
- **Beige Button** (`#efebe2`, rgb 239,235,226): 「新規会員登録」ボタンの面。**地よりわずかに明るいだけ**（`#f0ebe1` との差は 1）
- **Beige Deep** (`#dfd4bf`, rgb 223,212,191): コレクションのヘッダー帯

### Brand（有彩色は 3 系統だけ）

- **Sage** (`#6c8b7e`, rgb 108,139,126): **実行の色**。「もっと読み込む」ボタン、ニュースレター送信、Q&A タブ。**植物の色を「進む」に割り当てる**
- **Terracotta** (`#e96952`, rgb 233,105,82): **「私のお気に入り」タブ**。画面右端に縦に貼り付く
- **Terracotta Muted** (`#ca6e61`, rgb 202,110,97): **「定期お届け便対象」ラベル**。Terracotta より彩度を落とす。**同じ赤系でも、タブ＝鮮やか／ラベル＝くすませる**と使い分ける
- **Slate** (`#344150`, rgb 52,65,80): 「ログイン」ボタンの面。**濃紺寄りのスレート**

### Neutral（ニュートラル）

- **Ink** (`#304251`, rgb 48,66,81): **既定の文字色**。本文・見出し・ナビ。**黒ではなく、青みのあるスレート**
- **Ink Alt** (`#3e4a58`, rgb 62,74,88): 商品ラベルの文字。**Ink よりわずかに明るい**
- **Nav Ink** (`#333333`): ドロワー内のナビ文字。**ここだけ純グレー**
- **Border** (`#dad1ca` / `#d8d1cb`, rgb 218,209,202): 商品カードの枠、区切り罫
- **Muted** (`#7d7d7d`): 商品の絞り込みラベル（枠と文字）
- **Overlay** (`rgba(0,0,0,0.5)`): スライダーのページャ背景

> **注意**: **`#304251` / `#344150` / `#3e4a58` の 3 つは肉眼でほぼ区別できない**。それぞれ**本文 / ログインボタンの面 / ラベル文字**と用途が違うが、**新規実装では `#304251` に寄せて 1 つに統合してよい**。実サイトの 3 色併存は Shopify テーマの設定値とカスタム CSS が混在した結果と見られる。

### Semantic（意味的な色）

- **Danger／Error**: **`#ca6e61`（Terracotta Muted）を流用する**
- **Warning**: `#dfd4bf`（Beige Deep）＋ 文字 `#304251`
- **Success**: **`#6c8b7e`（Sage）を流用する**
- **非活性**: 面 `#f9f7f3` ／ 文字 `#7d7d7d` ／ 枠 `#dad1ca`
- **Sold Out**: **面 `#000000` ／ 文字 `#ffffff` / 11px / weight 700**（実サイトの実測。**サイト唯一の純黒の面**）

---

## 3. Typography Rules

> **本文が明朝**、**欧文見出しが `Bentham`**、**UI だけゴシック**という 3 系統の使い分けが核。

### 3.1 和文フォント

**用途で 2 書体を使い分ける**。

- **本文・見出し（読ませる文字）**: **`"Noto Serif JP", serif`**
  - `--body-font-stack: "Noto Serif JP", serif`
  - **本文 14px / weight 400 / `line-height: 28px`（2.0）/ `letter-spacing: 0.7px`（0.05em）/ `#304251`**
  - **商品名・記事タイトル・見出しもこれ**（18.06px など）
- **ナビ・ボタン・ラベル（操作する文字）**: **`dnp-shuei-gothic-gin-std, sans-serif`**
  - **秀英角ゴシック銀**（DNP / Adobe Fonts）。**weight 500 固定**
  - ドロワーのナビ、ログイン／新規会員登録、タブ、「もっと読み込む」、ニュースレター送信
  - **ドメインライセンスのためローカルの preview では表示されない**（後述）
- **`--navigation-font-stack: "Noto Sans JP", serif`** も定義されている（一部のナビ用）
  - **`sans` を指定して `serif` にフォールバックする**という食い違いがある。**Noto Sans JP の読み込みに失敗すると明朝に落ちる**。**自社実装では真似しない**（`sans-serif` で終える）

### 3.2 欧文フォント

- **見出し・ロゴまわり**: **`Bentham, "Noto Serif JP", serif`**
  - `--header-font-stack: "Bentham", "Noto Sans JP", serif`
  - **Bentham は 18 世紀の書体をもとにしたオールドスタイル・セリフ**（Google Fonts で入手可）。**細く、ストロークのコントラストが穏やか**で、明朝の和文と重心が合う
  - `Topics` `Moments of Care` `UV Care Kit` `Subscription Service` `About Us` などの**セクション見出しは常に英語 ＋ Bentham**
  - **`--header-text-size: 32px`（SP は 24px）**
- **和文明朝 × 欧文オールドスタイル・セリフ**という組み合わせがブランドの声。**サンセリフの欧文を混ぜない**
- **英字の商品名（`UV Care Kit`）も Bentham**。和文の説明文（`透明感*あふれる、きらめくツヤ肌へ`）は Noto Serif JP

### 3.3 font-family 指定

```css
/* CSS 変数（実サイト） */
--body-font-stack:       "Noto Serif JP", serif;
--header-font-stack:     "Bentham", "Noto Sans JP", serif;
--navigation-font-stack: "Noto Sans JP", serif;
--base-font-size:        14px;
--header-text-size-px:   32px;   /* SP: 24px */
--heading-spacing:       1px;
--font-weight-normal:    400;
--font-weight-bold:      700;

/* body */
font-family: "Noto Serif JP", serif;
font-size: 14px;
font-weight: 400;
line-height: 28px;          /* 2.0 */
letter-spacing: 0.7px;      /* 0.05em */
color: #304251;
background-color: #f0ebe1;
font-feature-settings: normal;

/* ナビ・ボタン */
font-family: dnp-shuei-gothic-gin-std, sans-serif;
font-weight: 500;
```

- **`--base-font-size: 14px`**。**16px ではなく 14px が基準**
- **`line-height` を `28px` と px で持つ**。`2.0` の比率ではなく実寸で固定されているため、**フォントサイズを変えると比率が崩れる**。**実装では `2.0` の比率で持ち直す**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | Color | 備考 |
|------|------|------|--------|-------------|----------------|-------|------|
| **Section Head（英）** | **Bentham** | **32px** | 400 | 1.4 (44.8px) | **1px** | `#304251` | 「Topics」。**SP は 24px** |
| Card Title | Noto Serif JP | **18.06px** | 400 | 1.4 (25.28px) | 0.7px (0.04em) | `#304251` | 記事タイトル。**明朝のまま太らせない** |
| Drawer Nav | 秀英角ゴ銀 | 18px | **500** | **2.0 (36px)** | 0.7px | `#333333` | 「Products 製品情報」 |
| Drawer Item | Noto Serif JP | 18px | 400 | 2.0 (36px) | 0.7px | `#304251` | 「ログイン」「新商品・限定商品」 |
| Sub Nav | 秀英角ゴ銀 | 16px | 500 | 2.0 (32px) | 0.7px | `#333333` | ドロワーの下位項目 |
| Tab | 秀英角ゴ銀 | 16px | 500 | 2.0 (32px) | 0.7px | `#304251` | 「おすすめアイテム」「初めての方に」 |
| **Body** | **Noto Serif JP** | **14px** | **400** | **2.0 (28px)** | **0.7px (0.05em)** | `#304251` | **サイトの基準** |
| Button | 秀英角ゴ銀 | 14px | **500** | 1.5 (21px) | **1px (0.07em)** | `#ffffff` | 「ログイン」「もっと読み込む」 |
| Nav Sub Label | Noto Sans JP | 13px | 500 | 2.0 (26px) | 0.7px | `#333333` | ナビ内の和文補足 |
| Favorite Tab | Noto Serif JP | 12px | 400 | **2.5 (30px)** | 0.7px | `#ffffff` | 「私のお気に入り」（縦タブ） |
| **Label / Badge** | Noto Serif JP | **11px** | 400 | 1.5 | 0.7px | `#3e4a58` / `#ffffff` | 「デリケートゾーン用洗浄料」「定期お届け便対象」 |
| Sold Out | Noto Serif JP | 11px | **700** | 1.5 | 0.7px | `#ffffff` | 面は `#000000`。**700 が出る唯一の箇所** |

- **weight は 400（本文・見出し）と 500（UI）の 2 段**。**700 は Sold Out バッジだけ**
- **見出しを太らせない**。32px の `Topics` も 400 のまま
- **`line-height` は 2.0 が支配的**。14px でも 18px でも 2.0（28px / 36px）

### 3.5 行間・字間

- **行間 (line-height)**: **2.0 が既定**（14px → 28px、18px → 36px）
  - **見出し（32px）だけ 1.4**、**カードタイトル（18.06px）は 1.4**
  - **お気に入りタブ（12px / 縦組みのラベル）は 2.5**
  - **14px という小さい本文を、行間 2.0 で読ませる**のがこのサイトの設計。**行間を詰めると成立しない**
- **字間 (letter-spacing)**: **`0.7px` を全要素に**（14px に対して **0.05em**）
  - **ボタン・見出しだけ `1px`**（`--heading-spacing: 1px`）。14px で 0.07em、32px で 0.03em
  - **px 固定のため、大きい文字ほど相対的に詰まる**。32px の見出しで 0.03em は自然な締まり

**ガイドライン**:
- **本文は「14px / 明朝 / 行間 2.0 / 字間 0.05em」をセットで守る**。1 つでも外すと読めなくなる
- **行間 2.0 を 1.6 に詰めない**。明朝の 14px は行間で支えている
- **見出しを太らせない**（400 のまま。サイズと書体で階層を作る）
- **`letter-spacing` を要素ごとに変えない**。0.7px（本文）と 1px（ボタン・見出し）の 2 値だけ
- **`font-feature-settings` は使わない**（実サイトは全要素 `normal`）

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- **商品名は折り返さない**（`スキンケアUVクリーム` `デリケートゾーン用洗浄料`）。ラベルの中では `white-space: nowrap`
- **`Waphyto` は常に半角ラテン、大文字始まり**。カタカナ（ワフィト）で置換しない
- **記事タイトルの `【】` は行頭に置かない**（`【Waphyto×kuroneko】愛用品から生まれた、…`）。**`【` の直前で折る**
- **`×`（全角の乗算記号）の前後で折らない**（`Waphyto×kuroneko` は 1 単位）
- **注記の `*`（`透明感*あふれる`）は前の文字から離さない**。米印の直前で折らない
- **英語の見出し（`UV Care Kit` / `Moments of Care`）は折り返さない**。1 行に収まる幅を確保する
- 成分名・カタカナ語（`ボディウォッシュ`）は中黒がないため、**カタカナの途中で折れる**。`word-break: keep-all` は当てず、`max-width` で幅を確保する

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* 全要素 */
```

- **このサイトは OpenType 機能を使わない**。`palt` も `chws` も無し
- **代わりに `letter-spacing: 0.7px` を全体に効かせる**。**明朝は約物のアキが元々広いので、`palt` を当てると印象が硬くなる**——**あえて詰めない**という選択
- **`palt` を足したくなったら、本文ではなく英語見出し（Bentham）に当てる**のが安全。ただし欧文には効かないため、**実質は「使わない」で通す**

### 3.8 縦書き

**このサイトは本文に縦組みを使わない**。ただし**画面右端の「私のお気に入り」タブが縦のラベル**になっている（1 文字ずつ縦に積む形）。

```css
/* お気に入りタブ（縦ラベル） */
writing-mode: vertical-rl;
font-family: "Noto Serif JP", serif;
font-size: 12px;
font-weight: 400;
line-height: 2.5;               /* 30px */
letter-spacing: 0.7px;
color: #ffffff;
background: #e96952;            /* Terracotta */
box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
border-radius: 0;
```

- **縦ラベルは画面端に固定する**。本文カラムに縦組みを持ち込まない
- **製品の使用感やブランドストーリーを縦組みで組む場合**は以下を目安にする:

```css
writing-mode: vertical-rl;
text-orientation: mixed;
font-family: "Noto Serif JP", serif;
font-size: 14px;
line-height: 2.2;               /* 横組みの 2.0 より少し広く */
letter-spacing: 0.7px;
font-feature-settings: "vpal";  /* 縦組みのときだけ約物を詰める */
```

- **縦組みでは書体を変えない**（本文はもともと明朝）
- 縦中横は 2 桁まで（`text-combine-upright: all`）

---

## 4. Component Stylings

### Buttons

**このサイトのボタンは全て `border-radius: 0px` の矩形**。書体は**秀英角ゴシック銀 / weight 500 / `letter-spacing: 1px`**。

**Primary（実行）— Sage**

- Background: **`#6c8b7e`**（セージ）
- Text: `#ffffff`
- Border: なし
- Padding: **`10px 35px`**
- Border Radius: **`0px`** ／ Shadow: なし
- Font: 秀英角ゴ銀 / **14px / weight 500 / lh 1.42 / `letter-spacing: 1px`**
- 例: 「もっと読み込む」、ニュースレターの送信
- **「進む・増やす」操作は必ずセージ**

**Dark（アカウント）— Slate**

- Background: **`#344150`** ／ Text: `#ffffff`
- Padding: **`15px`** ／ Border Radius: **`0px`**
- Font: 秀英角ゴ銀 / 14px / weight 500 / `letter-spacing: 0.7px`
- 例: 「ログイン」

**Beige（副次）**

- Background: **`#efebe2`** ／ Text: **`#000000`**
- Padding: **`15px`** ／ Border Radius: **`0px`**
- Font: 秀英角ゴ銀 / 14px / weight 500
- 例: 「新規会員登録」
- **地（`#f0ebe1`）とほぼ同じ明度**。**ログイン（濃紺）と並べて主従を作る**

**Outline（絞り込み）**

- Background: **透明**
- Text: `#304251` ／ Border: **`1px solid rgba(48, 66, 81, 0.5)`**（Ink の 50%）
- Padding: **`10px`** ／ Border Radius: **`0px`**
- Font: Noto Serif JP / 14px / weight 400
- 例: 「すべての商品」
- **枠に半透明の Ink を使う**。専用の枠色を持たない

### Labels / Badges

| 種類 | 面 | 文字 | サイズ | 例 |
|------|-----|------|--------|-----|
| **商品説明ラベル** | `#dad1ca` | `#3e4a58` | 11px / 400 / padding `1px 10px` | 「デリケートゾーン用洗浄料」 |
| **定期便ラベル** | `#ca6e61` | `#ffffff` | 11px / 400 / padding `0 5px` / border `1px solid #ca6e61` | 「定期お届け便対象」 |
| **お悩みタグ** | 透明 | `#7d7d7d` | 11px / 400 / border `1px solid #7d7d7d` | 「ごわつき・乾燥」「キメ」 |
| **Sold Out** | **`#000000`** | `#ffffff` | 11px / **700** / padding `10px 20px` | 品切れ |

- **すべて `border-radius: 0px`**
- **面ありのラベルと枠だけのタグを使い分ける**。**属性（用途）＝面あり、状態（悩み）＝枠だけ**

### Cards（商品）

- Background: **`#ffffff`**（地 `#f0ebe1` の上に白で浮かせる）
- Border: **`1px solid #d8d1cb`**
- Border Radius: **`0px`** ／ Shadow: **なし**
- Padding: **`30px 30px 10px`** — **下だけ 10px に詰める**（商品名とラベルが下に続くため）
- 構成: 商品写真 → 商品名（Noto Serif JP）→ 説明ラベル（`#dad1ca` の面）→ 価格
- **枠は生成りの罫（`#d8d1cb`）**。グレーの罫を使わない

### Tabs

- 選択: 面 **`#ffffff`** ／ 非選択: 面 **`#f9f7f3`**
- Text: `#304251` ／ Padding: **`20px 40px`** ／ Border Radius: **`0px`**
- Font: 秀英角ゴ銀 / 16px / weight 500
- **白と「わずかに温かい白」の差だけで選択状態を表す**。下線もアクセント色も使わない

### Inputs

- Background: **`#ffffff`**
- Border: **`1px solid #dad1ca`**
- Border Radius: **`0px`**
- Padding: `12px 16px` 目安
- Font: **Noto Serif JP / 14px / weight 400 / lh 2.0 / `letter-spacing: 0.7px`** — **入力欄も明朝**
- Text Color: `#304251` ／ Placeholder: `#7d7d7d`
- Focus: **`1px solid #6c8b7e`**（セージ）。影は付けない
- Error: **`1px solid #ca6e61`**
- 送信ボタンは **`#6c8b7e` の矩形**（ニュースレターと同じ形）

### Favorite Tab（画面右端の縦タブ）

- Background: **`#e96952`**（テラコッタ）／ Text: `#ffffff`
- Padding: **`0 15px 0 36px`** — **左に 36px の余白を取ってアイコンを置く**
- Border Radius: **`0px`**
- Shadow: **`0 0 25px 0 rgba(0, 0, 0, 0.2)`** — **サイトで唯一の影**。オフセット 0・ぼかし 25px の広い滲み
- Font: Noto Serif JP / 12px / weight 400 / lh 2.5
- **画面右端に貼り付いてスクロールしても残る**

---

## 5. Layout Principles

### Spacing Scale

**5 の倍数**が基準。`10 / 15 / 20 / 30 / 35 / 40` が繰り返し現れる。

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 10px |
| M | 15px |
| L | 20px |
| XL | 30px |
| XXL | 40px |

- **ボタンの `padding` は `10px 35px` / `15px`**、**カードは `30px 30px 10px`**、**タブは `20px 40px`**

### Container

- Max Width: 1200px 目安（商品グリッドは 5 カラム ＝ `large--one-fifth`）
- ヘッダー: **全幅・地の色（`#f0ebe1`）**。**高さ 88px 前後**で、左にハンバーガー、**中央にロゴ**、右に検索とカート
- **ロゴは常に中央**。左右対称に置く
- **ファーストビューは横長の製品写真スライダー**（ページャは `rgba(0,0,0,0.5)` の丸）

### Grid

- 商品一覧: **5 カラム**（`large--one-fifth`）／ タブレット 3 カラム（`medium--one-third`）／ モバイル 2 カラム（`small--one-half`）
- Topics: **3 カラム**（写真 ＋ 英語見出しの重ね ＋ 和文タイトル）
- Gutter: 30px 目安
- **写真の上に英語見出しを白抜きで重ねる**（`Moments of Care` / `UV Care Kit` / `Subscription Service`）。**和文のタイトルは写真の下に置く**

---

## 6. Depth & Elevation

**実測の `box-shadow` は 1 種類だけ**。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | **`none`** | **ボタン・カード・タブ・入力・ヘッダーのすべて** |
| 1 | **`0 0 25px 0 rgba(0, 0, 0, 0.2)`** | **「私のお気に入り」縦タブのみ**。オフセット 0・ぼかし 25px |

- **奥行きは「地より明るい白」で作る**:

| 面 | 色 | 用途 |
|----|-----|------|
| 地 | `#f0ebe1` | ページ全体・ヘッダー |
| 面（温） | `#f9f7f3` | 非選択タブ |
| 面（白） | `#ffffff` | 商品カード・ドロワー・入力・選択タブ |
| 帯 | `#dfd4bf` | コレクションのヘッダー |

- **白が「手前」を意味する**。一般的な「白地 ＋ グレーの面」と**明度の方向が逆**
- **線は 1px の生成り罫**（`#dad1ca` / `#d8d1cb`）。**グレーの罫を使わない**
- **`border-radius` は全要素 0px**。角丸で階層を作らない

---

## 7. Do's and Don'ts

### Do（推奨）

- **地を `#f0ebe1`（生成り）にする**。純白の地にしない
- **手前に来るものを白（`#ffffff`）にする**。**地より明るくして浮かせる**
- **本文を明朝（`"Noto Serif JP", serif`）で組む**。14px / weight 400
- **本文は「14px / 行間 2.0 / 字間 0.05em」をセットで守る**
- **欧文の見出しに `Bentham`** を使う。**セクション見出しは英語 ＋ 和文の説明**という二段で置く
- **ナビ・ボタン・タブだけゴシック（秀英角ゴシック銀 / weight 500）**にする。**読ませる文字は明朝、操作する文字はゴシック**
- **`letter-spacing` は 0.7px（本文）と 1px（ボタン・見出し）の 2 値**に絞る
- **`border-radius: 0px` を全要素に**。角丸を 1 つも作らない
- **有彩色は 3 系統に絞る**: セージ `#6c8b7e`（実行）／ テラコッタ `#e96952`・`#ca6e61`（お気に入り・定期便）／ スレート `#344150`（アカウント）
- **セージを「進む」に固定する**。読み込み・送信はすべてセージ
- **罫は生成り（`#dad1ca`）**にする。グレーの罫を使わない
- **ラベルは「属性＝面あり／状態＝枠だけ」**で形を分ける
- **見出しを太らせない**（32px も 400）。**700 は Sold Out バッジだけ**
- **タブの選択状態は白と `#f9f7f3` の差だけ**で表す
- **写真の上に英語見出しを白抜きで重ね、和文タイトルは写真の下に置く**

### Don't（禁止）

- **本文をゴシックにしない**。明朝がブランドの声
- **行間 2.0 を 1.6 に詰めない**（14px の明朝が読めなくなる）
- **本文を 16px に上げない**。**14px ＋ 行間 2.0 がこのサイトの設計**（上げるなら行間も比率で保つ）
- **欧文にサンセリフを混ぜない**（`Bentham` か `Noto Serif JP` の欧文グリフ）
- **`--navigation-font-stack: "Noto Sans JP", serif` の書き方を真似しない**（sans を指定して serif に落ちる。`sans-serif` で終える）
- **`line-height` を px 固定で持たない**（実サイトは `28px` 固定。**比率 2.0 で持つ**）
- **角丸を持ち込まない**。ピルもカードの角丸も作らない
- **影を足さない**。影はお気に入りタブの 1 つだけ
- **グレー（`#cccccc` 等）の罫・面を使わない**。すべて生成りの階調で作る
- **`palt` / `chws` を当てない**（明朝のアキを詰めると印象が硬くなる）
- **見出しを bold にしない**
- **セージとテラコッタの役割を入れ替えない**（セージ＝進む、テラコッタ＝保存・定期）
- **`#304251` / `#344150` / `#3e4a58` を新規に増やさない**。**新規実装では `#304251` に統合する**
- **`Waphyto` をカタカナ表記に置き換えない**

---

## 8. Responsive Behavior

### Breakpoints

Shopify テーマの規定に沿う（`small--` / `medium--` / `large--`）。

| Name | Width | 説明 |
|------|-------|------|
| Small | ≤ 767px | 商品 **2 カラム**（`small--one-half`）。ナビはドロワー。**英語見出しは 24px（`--header-text-size-sp`）** |
| Medium | 768–1023px | 商品 **3 カラム**（`medium--one-third`） |
| Large | ≥ 1024px | 商品 **5 カラム**（`large--one-fifth`）。Topics 3 カラム |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）
- **Primary（Sage）は `padding 10px 35px` ＋ 14px / lh 1.5 で高さ 41px**。**モバイルでは `padding 14px 35px` に広げて 49px を確保する**
- **Dark / Beige は `padding 15px` ＋ 14px で高さ 51px**。基準を満たす
- **ラベル（11px / `padding 1px 10px`）はタップ対象にしない**。**商品カード全体をタップ領域にする**
- **お気に入りの縦タブは幅 36px 以上**を確保する（アイコン ＋ 縦ラベル）
- **絞り込みの Outline ボタンは `padding 10px` で高さ 41px**。モバイルでは 14px に広げる

### フォントサイズの調整

- **本文 14px は据え置く**（**行間 2.0 も維持する**）。これ以上小さくしない
- **英語見出し 32px → 24px**（`--header-text-size-sp: 24px`）。**`Bentham` と weight 400 は維持する**
- カードタイトル 18.06px → 16px。**明朝と weight 400 を維持する**
- ドロワーナビ 18px → 16px。**行間 2.0 を維持する**
- ラベル 11px は据え置く（面と枠で読ませる）
- **`letter-spacing: 0.7px` はモバイルでも維持する**
- **モバイルでも角丸をゼロに保つ**（タップしやすさのために角丸を足さない）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #f0ebe1   （ページ地色。生成りのベージュ。純白ではない）
Surface:         #ffffff   （商品カード・ドロワー・入力・選択タブ。地より明るく浮かせる）
Surface Warm:    #f9f7f3   （非選択タブ）
Beige Button:    #efebe2   （「新規会員登録」の面）
Beige Deep:      #dfd4bf   （コレクションのヘッダー帯）
Sage:            #6c8b7e   （実行の色。もっと読み込む・送信・フォーカス）
Terracotta:      #e96952   （お気に入りの縦タブ）
Terracotta Mut.: #ca6e61   （定期お届け便ラベル・エラー）
Slate:           #344150   （ログインボタンの面）
Ink:             #304251   （既定の文字色。青みのあるスレート）
Border:          #dad1ca / #d8d1cb   （カードの枠・区切り罫。グレーではない）
Muted:           #7d7d7d   （絞り込みタグの枠と文字）
Sold Out:        面 #000000 / 文字 #ffffff（サイト唯一の純黒の面）
Font (本文):      "Noto Serif JP", serif        ← 本文・見出し・入力まで明朝
Font (欧文見出し): "Bentham", serif             ← オールドスタイル・セリフ
Font (UI):       dnp-shuei-gothic-gin-std, sans-serif  ← 秀英角ゴシック銀 / weight 500
Body:            14px / weight 400 / lh 2.0 (28px) / ls 0.7px (0.05em) / #304251
Heading (英):     32px（SP 24px）/ weight 400 / lh 1.4 / ls 1px / Bentham
Weight:          400（本文・見出し）/ 500（UI）。700 は Sold Out バッジのみ
Line Height:     2.0（既定）/ 1.4（見出し・カードタイトル）/ 2.5（縦タブ）
Letter Spacing:  0.7px（本文）/ 1px（ボタン・見出し）の 2 値だけ
Feature:         font-feature-settings: normal（palt も chws も使わない）
Radius:          全要素 0px（角丸は 1 つも無い）
Shadow:          全要素 none。例外は お気に入り縦タブの 0 0 25px rgba(0,0,0,.2) だけ
Grid:            商品 5 カラム（PC）/ 3（タブレット）/ 2（モバイル）
Spacing:         5 の倍数（10 / 15 / 20 / 30 / 35 / 40）
```

### プロンプト例

```
Waphyto のデザインシステムに従って、植物由来スキンケアの商品一覧ページを作成してください。
- 地は #f0ebe1（生成りのベージュ）。白地にしない。
  商品カード・入力・選択中のタブだけを #ffffff にして、地より明るく浮かせる
  （一般的な「白地 ＋ グレーの面」と明度の方向が逆）
- 書体を 3 系統で使い分ける：
  本文・商品名・入力＝"Noto Serif JP", serif（明朝）
  英語の見出し＝Bentham, serif（オールドスタイル・セリフ）
  ナビ・ボタン・タブ＝ゴシック（実サイトは dnp-shuei-gothic-gin-std / weight 500）
  「読ませる文字は明朝、操作する文字はゴシック」を守る
- 本文は 14px / weight 400 / line-height 2.0（28px）/ letter-spacing 0.7px（0.05em）/ #304251。
  16px に上げない。行間 2.0 を詰めない
- セクション見出しは英語 ＋ Bentham（32px / weight 400 / lh 1.4 / ls 1px）で置き、
  和文の説明をその下に続ける。見出しを bold にしない
- letter-spacing は 0.7px（本文）と 1px（ボタン・見出し）の 2 値だけ。
  font-feature-settings は normal（palt も chws も使わない）
- border-radius は全要素 0px。角丸を 1 つも作らない
- box-shadow は使わない。例外は画面右端に固定する「お気に入り」縦タブだけで、
  面 #e96952 ＋ box-shadow: 0 0 25px 0 rgba(0,0,0,.2) ＋ writing-mode: vertical-rl
- ボタンは矩形（radius 0）で 3 種類：
  実行＝面 #6c8b7e ＋ 白文字 ＋ padding 10px 35px ＋ 14px weight 500 ＋ ls 1px（もっと読み込む・送信）
  アカウント＝面 #344150 ＋ 白文字 ＋ padding 15px（ログイン）
  副次＝面 #efebe2 ＋ 黒文字 ＋ padding 15px（新規会員登録）
  絞り込み＝透明 ＋ 1px solid rgba(48,66,81,.5) ＋ padding 10px
- ラベルは形で意味を分ける：
  属性（用途）＝面あり（#dad1ca の面 ＋ #3e4a58 の文字 / 11px / padding 1px 10px）
  状態（悩み）＝枠だけ（1px solid #7d7d7d / 透明 / 11px）
  定期便＝面 #ca6e61 ＋ 白文字。Sold Out だけ面 #000000 ＋ 700
- 商品カードは面 #ffffff ＋ 1px solid #d8d1cb ＋ radius 0 ＋ padding 30px 30px 10px。
  罫は生成り（#dad1ca 系）にして、グレーの罫を使わない
- タブの選択状態は #ffffff と #f9f7f3 の差だけで表す（下線もアクセント色も使わない）
- 商品グリッドは PC 5 カラム / タブレット 3 カラム / モバイル 2 カラム
- Topics は 3 カラムで、写真の上に英語見出しを白抜きで重ね、和文タイトルは写真の下に置く
- 余白は 5 の倍数（10 / 15 / 20 / 30 / 35 / 40）で刻む
- ヘッダーは地と同じ #f0ebe1、ロゴは常に中央、左にハンバーガー、右に検索とカート
```
