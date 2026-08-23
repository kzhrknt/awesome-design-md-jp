# DESIGN.md — Mr. CHEESECAKE

> Mr. CHEESECAKE（https://mr-cheesecake.com/）のデザイン仕様書。
> 「世界一じゃなく、あなたの人生最高に。」を掲げる**チーズケーキの D2C ブランド**（Shopify）。日曜と月曜だけのオンライン販売から始まり、GINZA SIX・羽田空港などの常設店に広がった。
> **書体は `Noto Sans JP` の 1 本だけ**。明朝も欧文専用フォントも使わない。**階層は「太さ」ではなく「余白」で作る**
> **本文のウェイトが 300（Light）**。`body { font-weight: 300 }` から始め、見出しでも 500 までしか上げない。**700 は価格と商品名にしか出ない**
> **`border-radius: 2px`**。0 でも 8 でもなく **2px**。ほとんど直角に見えるが、角がわずかに丸い——この 1 値がサイト全体の手触りを決めている
> **色はスレートグレー**。主色 `#5a686c`（青みのある灰）、文字 `#252a2c`、面 `#f5f4f0`（温かい生成り）。**チーズケーキの写真の色を邪魔しないよう、UI から彩度を抜いている**
> 実サイトの computed style 実測（2026-08-20 取得。トップ ＋ 商品詳細 `mc0001`）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **余白で見せる**。1 画面に 1 メッセージ。ファーストビューは全画面写真 ＋ ロゴだけ、次のセクションはキャッチと 4 行のコピーだけで 1 画面を使い切る
- **Mr. CHEESECAKE について**: シェフ・田村浩二によるチーズケーキブランド。**「いつ買えるか」が体験の中心**（週 2 日の販売、抽選販売、店舗限定）で、UI にも「オンライン限定」「旗艦店」といった**入手経路のバッジ**が多い
- **密度**: **低い**。EC でありながらグリッドを詰めない。商品カードは 4 カラムで、カード間の余白を大きく取る
- **キーワード**: `Noto Sans JP` 一択、weight 300 の本文、`radius: 2px`、スレートグレー `#5a686c`、影ゼロ、英字大文字 ＋ 0.13em
- **特徴**:
  - **`body { font-weight: 300 }`**。日本語サイトで Light を既定にするのは珍しい。**細さそのものが上品さの表現**になっている
  - **見出しも太らせない**。`h2` は 18〜24px の **weight 500**。**700 が出るのは価格（`¥3,996（税込）`）と商品名だけ**
  - **セクション見出しが全部英字の大文字**（`ONLINE STORE` `TOPICS` `NEWS` `MAIL MAGAZINE`）。**`letter-spacing: 0.13em` で開く**
  - **`border-radius` が 2px で統一**されている。ボタン・カード・入力欄すべて。**バッジだけ 4px、チップだけ 24px のピル**
  - **影を一切使わない**（全要素 `box-shadow: none`）。区切りは**面色**（`#f5f4f0` / `#f5f5f5` / `#ebebeb`）と**1px の罫**
  - **ボタンの padding が左右非対称**（`0 0 0 18px` / `15px 40px 15px 24px`）。**右側に矢印アイコンを置くための余白**
  - **文字色に `rgba(0,0,0,0.86)` を使う**。`#252a2c` と併用されており、**純黒を避けつつ写真の上でも沈む**設計
  - **暖色は 2 か所だけ**。「旗艦店」バッジの金 `#ca8a12` と、抽選販売ブロックのクリーム `#fff2dc`

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）。

### Brand（ブランド）

- **Slate** (`#5a686c`, rgb 90,104,108): **主色**。CTA の面（「カートに追加」「価格ボタン」）。**青みのある中間灰**
- **Slate Dark** (`#4b5d62`, rgb 75,93,98): **セカンダリ CTA の面**（「選択する」）。Slate より暗く青い
- **Ink Slate** (`#484e4d`, rgb 72,78,77): **リンク・アウトラインボタンの文字色**、`TOPICS` 帯の面。**緑みのある濃灰**

### Gray Scale（灰の階調）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| 文字（主） | **`#252a2c`** | 37,42,44 | 見出し・本文 |
| 文字（既定） | **`rgba(0,0,0,0.86)`** | — | `body` の色。純黒を避ける |
| ナビ | **`#242a2d`** | 36,42,45 | ヘッダーのナビ文字 |
| リンク・枠 | **`#484e4d`** | 72,78,77 | リンク、アウトラインボタン、帯 |
| CTA | **`#5a686c`** | 90,104,108 | 主 CTA の面 |
| CTA（暗） | **`#4b5d62`** | 75,93,98 | 副 CTA の面 |
| 補足文字・バッジ | **`#768185`** | 118,129,133 | 「オンライン限定」「テイクアウト」 |
| 淡い青灰 | **`#abbcc1`** | 171,188,193 | 区切り・装飾面 |
| アナウンスバー | **`rgba(83,91,94,0.898)`** | — | 最上段の告知帯（白文字） |

### Surface（面色）

| 面 | 色 | rgb | 用途 |
|----|-----|-----|------|
| 生成り | **`#f5f4f0`** | 245,244,240 | 記事カード・店舗紹介の面。**わずかに黄みがある** |
| 灰（淡） | **`#f5f5f5`** | 245,245,245 | 商品概要・注記のブロック |
| 生成り（濃） | **`#f7f5ef`** | 247,245,239 | POPUP STORE ブロック |
| 灰 | **`#ebebeb`** / **`#e9e9e8`** | — | 区切り・画像プレースホルダ |
| 帯（濃） | **`#484e4d`** | 72,78,77 | `TOPICS` 見出し帯・メルマガ登録ボタン |

### Accent（暖色 — 2 か所だけ）

- **Gold** (`#ca8a12`, rgb 202,138,18): **「旗艦店」バッジだけ**。サイト内で最も彩度の高い色
- **Cream** (`#fff2dc`, rgb 255,242,220): **抽選販売の告知ブロックだけ**

- **この 2 色以外に暖色を使わない**。**写真（チーズケーキの黄色〜きつね色）が暖色を担当する**ため、UI は灰に徹する

### Semantic（意味的な色）

- **Info / 補足**: `#768185`（バッジ・注記）
- **Warning / 告知**: `rgba(83,91,94,0.898)` のアナウンスバー ＋ 白文字。**赤や黄を使わない**
- **Highlight / 特別販売**: `#fff2dc`（クリーム）の面
- **Danger・Success**: 実サイトに専用色を持たない。**原色を持ち込まず、`#252a2c`（強）と `#768185`（弱）で表現する**

---

## 3. Typography Rules

> **`Noto Sans JP` 一択**、**weight 300 の本文**、**英字大文字 ＋ 0.13em** の 3 点がこのサイトの核。

### 3.1 和文フォント

```css
--font-body: "Noto Sans JP", sans-serif;
--font-head: "Noto Sans JP", sans-serif;   /* 見出しも本文と同じ */
```

- **`--font-body` と `--font-head` が同じ値**。**見出し用の書体を持たない**
- **明朝を一切使わない**
- **ウェイトは 300 / 400 / 500 / 600 / 700 の 5 段**だが、**使い分けは実質 3 段**:
  - **300（Light）= 既定**。`body` / `nav` / `header` / `footer` / ヒーローのリード文
  - **400（Regular）= 本文**。説明文・住所・注記
  - **500（Medium）= 見出し・ラベル・小見出し**。**サイトの見出しはここで止まる**
  - **600 / 700 = 価格と商品名だけ**（`¥4,779 (税込)` / `Mr. CHEESECAKE Classic`）

### 3.2 欧文フォント

- **欧文専用フォントを持たない**。`ABOUT` `ONLINE STORE` `VIEW MORE` もすべて `Noto Sans JP`
- **`button` だけ `"Noto Sans JP", Helvetica, Arial, sans-serif`** とフォールバックが付く
- **英字は必ず大文字 ＋ 広い字間**で使う（`letter-spacing: 0.10〜0.13em`）
- **ロゴタイプ（Mr. CHEESECAKE）は画像**。字間を大きく開いたサンセリフのレタリング

### 3.3 font-family 指定

```css
:root {
  --font-body: "Noto Sans JP", sans-serif;
  --font-head: "Noto Sans JP", sans-serif;
}

body {
  font-family: var(--font-body);
  font-weight: 300;            /* Light が既定 */
  color: rgba(0, 0, 0, 0.86);  /* 純黒を避ける */
  font-size: 16px;
}

button, input, select, textarea {
  font-family: "Noto Sans JP", Helvetica, Arial, sans-serif;
}
```

**フォールバックの考え方**:
- **`Noto Sans JP` → `sans-serif` の 2 段だけ**。ヒラギノ・游ゴシック・メイリオを列挙しない
- **Web フォントの読み込みに全面的に依存する**設計。**実装では `"Hiragino Sans", "Yu Gothic"` を足して劣化を抑えることを推奨**
- **`Noto Sans JP` は Light（300）を持つ**。**300 を使う設計なので、ウェイトの読み込みを 300 / 400 / 500 / 700 に絞る**

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Letter Spacing | 用途 |
|------|------|--------|-------------|----------------|------|
| Display | **32px** | **500** | 1.5 (48px) | **0.10em** (3.2px) | ヒーローのキャッチ 1 行目 |
| Page Title | 22px | 500 | 1.6 (35.2px) | 0.04em (0.88px) | 「世界一じゃなく、あなたの人生最高に。」 |
| Section Head（英字） | 18–24px | 500 | 1.5 (27–36px) | **0.13em** (2.34–3.12px) | `ONLINE STORE` `TOPICS` `NEWS` `MAIL MAGAZINE` |
| Section Head（和文） | 18–20px | 500 / 600 | 1.5–1.8 | 0.04–0.08em | 「香りが織りなす新しい体験」「商品概要」 |
| Heading 3 | 16–22px | 500 | 1.5–1.6 | 0.04em | 「STORE」「1.冷凍」 |
| Lead | 18px | **300** | **1.8** (32.4px) | 0.03em | ヒーロー下の 4 行コピー |
| Body | 16px | 400 | **1.8** (28.8px) | 0.04em (0.64px) | 本文 |
| Body（詰め） | 16px | 400 | 1.6 (25.6px) | 0.04em | 注記・箇条書き |
| Product Name | 16px | **700** | 1.5 (24px) | 0.04em | 商品名 |
| Price | 15–18px | **600 / 700** | 1.45–2.8 | 0.04–0.06em | 価格 |
| Caption | 14–15px | 400 / 500 | 1.8 | 0.04em | 住所・日付 |
| Badge | 12px | 500 | 1.83 (22px) | 0.03em | 「オンライン限定」「テイクアウト」 |

- **Display（32px / 500 / 0.10em）はヒーローの 1 行目だけ**。2 行目以降は 22px に落ちる
- **英字のセクション見出しは 0.13em**。和文の見出し（0.04em）と**明確に差を付ける**

### 3.5 行間・字間

- **本文の行間**: **1.8**（16px → 28.8px）が既定。**注記・箇条書きだけ 1.6**
- **リード文の行間**: **1.8** ＋ **weight 300** ＋ 18px。**細く・大きく・広く**の 3 点で「読ませる」
- **見出しの行間**: **1.5**（18px → 27px / 24px → 36px）
- **字間**:
  - **本文・見出し（和文）: 0.04em**（16px → 0.64px）が既定
  - **英字の見出し: 0.13em**（18px → 2.34px / 24px → 3.12px）
  - **Display: 0.10em**（32px → 3.2px）
  - **`VIEW MORE`: 0.10em**（16px → 1.6px）
  - **ボタン: 0.06em**（16px → 0.96px）、**メルマガの「登録」だけ 0.125em**（2px）
  - **`letter-spacing: normal`**: `body` / `nav` / `header` / `footer` の器

**ガイドライン**:
- **和文 0.04em / 英字 0.13em** の 2 段で覚える。**英字を和文と同じ字間で組まない**
- **行間 1.8 を既定**にする。**チーズケーキの写真と余白の多い構図に合わせて、テキストも呼吸させる**
- **weight 300 の 18px リード**は、このブランドの声のトーンそのもの。**太らせない**

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- **キャッチコピーは意図的な位置で改行する**（「世界一じゃなく、／ あなたの人生最高に。」）。**`<br>` で改行位置を固定し、自動折り返しに任せない**
- **商品名は英字が混じる**（`Mr. CHEESECAKE Classic` `Week-end Citron`）。**`word-break: break-all` にすると英単語が割れる**ので使わない
- **価格は `¥3,996（税込）` の全角括弧表記**。**括弧の前で折り返させない**
- **行頭禁止**: `）」』】〕〉》、。，．・：；？！`／**行末禁止**: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* このサイトは palt を使わない */
```

- **`palt` を一切使っていない**（全要素 `font-feature-settings: normal`）
- **理由**: 字間を **0.04em 開く**設計なので、約物を詰める palt と方向が合わない
- **`（税込）` の全角括弧が開いたまま組まれる**のがこのサイトの見え方。**palt を足すとここが詰まって印象が変わる**

### 3.8 縦書き

該当なし。**全ページ横書き**。

---

## 4. Component Stylings

### Buttons

> **`border-radius: 2px` で統一**。**padding が左右非対称**（右に矢印アイコンを置くため）。

**Primary（塗り）**

- Background: **`#5a686c`** ／ Text: **`rgba(255,255,255,0.86)`**（**純白ではない**）
- Border: なし ／ Border Radius: **`2px`** ／ Shadow: **なし**
- Padding: **`0 0 0 18px`**（**左だけ 18px。高さは `line-height: 42px` / `58px` で作る**）
- Font: 15–16px / **weight 700** / `letter-spacing: 0.06em`
- 例: 「カートに追加」「¥3,996（税込）」

**Secondary（暗い塗り）**

- Background: **`#4b5d62`** ／ Text: `rgba(255,255,255,0.86)` ／ Radius: `2px`
- Font: 14.4–16px / weight 500 / `letter-spacing: 0.06em`
- 例: 「選択する」

**Tertiary（淡い塗り ＋ 枠）**

- Background: **`rgba(90,104,108,0.1)`** ／ Text: **`#484e4d`**
- Border: **`1px solid #5a686c`** ／ Radius: `2px`
- Padding: `0 0 0 12px`〜`0 0 0 18px` ／ Font: 14.4px / weight 500 / `letter-spacing: 0.06em`
- 例: 「カートに進む」

**Outline（枠線）**

- Background: `transparent` ／ Text: **`#484e4d`**
- Border: **`1px solid rgba(85,95,95,0.4)`** ／ Radius: `2px`
- Padding: **`15px 40px 15px 24px`**（**右 40px / 左 24px。右に矢印**）
- Font: 14–16px / weight 400 / `letter-spacing: 0.03〜0.035em`
- 例: 「すべての商品をみる」「記事をもっと読む」「Instagramをフォローする」

**Text Link（`VIEW MORE`）**

- 文字 **`#484e4d`** / 16px / weight 400 / **`letter-spacing: 0.10em`**
- **下に 1px の罫を引く**（ボタンの形にしない）

### Badges / Chips

| 種別 | 面 | 文字 | 枠 | Radius | Font |
|------|-----|------|-----|--------|------|
| **店舗種別** | **`#768185`** | `#ffffff` | なし | **`4px`** | 12px / 500 / 0.05em |
| **旗艦店** | **`#ca8a12`** | `#ffffff` | なし | **`4px`** | 12px / 500 / 0.05em |
| **入手経路** | `transparent` | **`#768185`** | **`1px solid #768185`** | **`24px`（ピル）** | 12px / 500 / 0.03em |

- Padding: 塗りは `4px 8px`、ピルは `0 12px`
- **塗り＝店舗の種別（施設側の属性）、ピル＝入手経路（買い手の条件）**。この対応を崩さない

### Cards

**商品カード**

- Background: `#ffffff` ／ Border: なし ／ Radius: **`2px`** ／ Shadow: **なし**
- 構成: 画像 → **入手経路チップ**（12px ピル）→ **商品名（16px / 700）** → **価格ボタン（`#5a686c` 塗り）**
- **価格そのものがボタンになっている**（`¥3,996（税込）` を押すとカートへ）

**記事・店舗カード**

- Background: **`#f5f4f0`** ／ Radius: `2px`
- 構成: 画像 → タイトル（16px / 500 / lh 1.6）→ 補足

**注記ブロック**

- Background: **`#f5f5f5`** ／ Padding: 24px 以上 ／ Font: 16px / 400 / lh 1.6

**告知ブロック（抽選販売）**

- Background: **`#fff2dc`**（クリーム）／ 見出し 20px / 600 / `letter-spacing: 0.05em`

### Inputs

- Background: `#ffffff` ／ Border: **`1px solid #abbcc1`**
- Border (focus): **`1px solid #5a686c`**
- Border Radius: **`2px`** ／ Padding: `12px 16px`
- Font: **18px** / weight 400 ／ Text: **`#484e4d`** ／ Placeholder: `#768185`
- Error: `1px solid #ca8a12` ＋ エラーテキスト 14px / `#252a2c`。**原色の赤を使わない**
- **メルマガの登録ボタンは面 `#484e4d` ＋ 白文字 / 16px / `letter-spacing: 0.125em`**

### Announcement Bar

- Background: **`rgba(83,91,94,0.898)`** ／ Text: `#ffffff` / 14–16px / weight 400 / `letter-spacing: 0.04em`
- **ヘッダーの直下に全幅で敷く**。赤や黄を使わない

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 12px |
| L | 18px |
| XL | 24px |
| XXL | 40px |
| Section | **80px 以上** |

- **ボタンの `padding: 15px 40px 15px 24px`** に見える通り、**18 / 24 / 40 が主要な値**
- **セクション間は 1 画面近い余白を取る**。トップの「キャッチ ＋ 4 行コピー」だけで 1 スクリーンを使う

### Container

- ヘッダー: **左にロゴ、中央にナビ（5 項目・英字大文字）、右にカートとアカウント**
- **ナビは英字のみ**（`ABOUT` / `ONLINE STORE` / `STORE` / `YOUR CITY` / `NEWS`）。14–18px / weight 400–500 / `letter-spacing: 0.04em`
- ヘッダー直下に**アナウンスバー**（全幅）
- フッター: 面 `#484e4d` ／ 白文字 / weight 300
- ファーストビュー: **全画面写真 ＋ 中央に白いロゴ**。テキストを重ねない

### Grid

- 商品一覧: **4 カラム**（余白を広く取る）
- 店舗一覧: **2〜3 カラム**（面 `#f5f4f0` のカード）
- 記事: 1 カラム
- Gutter: 24px 目安
- **セクションの区切りは面色（`#f5f4f0` / `#f5f5f5`）と余白**。罫線は `VIEW MORE` の下線だけ

---

## 6. Depth & Elevation

**このサイトは影を持たない。**`box-shadow` は全要素 `none`。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | **`none`** | **すべての要素** |

- **奥行きは面色と余白でつくる**:

| 面 | 色 | 用途 |
|----|-----|------|
| 地 | `#ffffff` | ページ全体・商品カード |
| 生成り | `#f5f4f0` | 記事・店舗カード |
| 灰（淡） | `#f5f5f5` | 注記・商品概要 |
| 生成り（濃） | `#f7f5ef` | POPUP STORE |
| クリーム | `#fff2dc` | 抽選販売の告知 |
| 帯（濃） | `#484e4d` | `TOPICS` 見出し・フッター |
| スクリム | `rgba(83,91,94,0.898)` | アナウンスバー |

- **`border-radius: 2px` が唯一の「立体感」**。影を足さず、この 2px だけで面の輪郭を柔らげる

---

## 7. Do's and Don'ts

### Do（推奨）

- **書体は `"Noto Sans JP", sans-serif` の 1 本**にする。見出し用の書体を持たない（`--font-body` と `--font-head` を同値にする）
- **`body { font-weight: 300 }` から始める**。**見出しは 500 まで、700 は価格と商品名だけ**
- **英字は大文字 ＋ `letter-spacing: 0.13em`**、**和文は 0.04em**。この 2 段を使い分ける
- **本文の `line-height` は 1.8**（注記だけ 1.6）
- **`border-radius: 2px` で統一**する（ボタン・カード・入力欄）。**バッジだけ 4px、入手経路チップだけ 24px のピル**
- **ボタンの padding を右に寄せる**（`15px 40px 15px 24px`）。右端に矢印を置く前提で組む
- **主 CTA の文字は `rgba(255,255,255,0.86)`**。純白にしない
- **文字色は `#252a2c` / `rgba(0,0,0,0.86)`**。純黒を使わない
- **影を使わない**。階層は面色（`#ffffff` → `#f5f4f0` → `#f5f5f5` → `#484e4d`）と余白でつくる
- **暖色は「旗艦店」バッジの `#ca8a12` と抽選告知の `#fff2dc` の 2 か所だけ**にする
- **キャッチコピーは `<br>` で改行位置を固定する**
- **セクションごとに 1 画面近い余白を取る**。詰めない

### Don't（禁止）

- **`font-feature-settings: "palt"` を使わない**。`（税込）` の全角括弧が詰まって印象が変わる
- **明朝を持ち込まない**。書体は 1 本だけ
- **見出しを 700 にしない**。太らせずに、サイズと余白で階層をつくる
- **英字を和文と同じ字間（0.04em）で組まない**。**英字は 0.13em**
- **`border-radius` を 0 や 8px にしない**。**2px がこのサイトの手触り**
- **影を足さない**。カードに `box-shadow` を付けるとこのサイトの平面性が壊れる
- **原色（赤・青・緑）を使わない**。警告も `rgba(83,91,94,.898)` の灰帯で出す
- **暖色を増やさない**。写真が暖色を担当する
- **`word-break: break-all` を使わない**（`Week-end Citron` のような商品名が割れる）
- **本文の行間を 1.6 未満にしない**
- **フォールバックを `sans-serif` だけにしたまま Web フォントの読み込み失敗を放置しない**。実装では `"Hiragino Sans", "Yu Gothic"` を足す
- **weight 300 を 400 に置き換えない**。細さがこのブランドの声のトーン

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1〜2 カラム。ナビはハンバーガー。ファーストビューは全画面写真のまま |
| Tablet | 768–1023px | 商品一覧 2〜3 カラム |
| Desktop | ≥ 1024px | 商品一覧 4 カラム。ナビ 5 項目を中央に常設 |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）
- **Primary Button は `line-height: 42px`〜`58px` で高さを作る**。基準を満たす
- **Outline Button は `padding: 15px 40px 15px 24px` ＋ 16px** で高さ 54px。基準を満たす
- **バッジは `padding: 4px 8px` ＋ 12px で高さ 26px**。**バッジ単体をタップ対象にせず、カード全体をタップ領域にする**
- **入手経路チップ（ピル・高さ 22px）も同様**にカードのタップ領域に含める
- **`VIEW MORE` は下線付きテキスト**。**タップ領域を上下 12px ずつ広げる**

### フォントサイズの調整

- Display 32px → **24px**。**`letter-spacing: 0.10em` は維持する**
- Page Title 22px → 20px
- Section Head（英字）24px → 18px。**`letter-spacing: 0.13em` は維持する**（ここを詰めると英字見出しの印象が変わる）
- Lead 18px / weight 300 → **16px / weight 300**（**ウェイトは下げない**）
- 本文 16px / lh 1.8 は据え置く
- Badge 12px は据え置く（これ以上小さくしない）
- **入力欄の 18px は据え置く**（iOS の自動ズーム防止のため 16px 以上を保つ）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff   （ページ地色）
Slate:           #5a686c   （主色。主 CTA の面）
Slate Dark:      #4b5d62   （副 CTA の面）
Ink Slate:       #484e4d   （リンク・アウトライン文字・帯・フッター）
Text:            #252a2c   （見出し・本文）／ rgba(0,0,0,.86)（body の既定色）
Muted:           #768185   （補足・バッジ）
Pale:            #abbcc1   （区切り・入力欄の枠）
Surface:         #f5f4f0   （記事・店舗カード。わずかに黄みのある生成り）
                 #f5f5f5   （注記・商品概要）／ #f7f5ef（POPUP）／ #ebebeb（区切り）
Accent Gold:     #ca8a12   （「旗艦店」バッジだけ）
Accent Cream:    #fff2dc   （抽選販売の告知だけ）
Announcement:    rgba(83,91,94,.898) ＋ 白文字
Font:            "Noto Sans JP", sans-serif  ← 見出しも本文も同じ 1 本
                 button だけ "Noto Sans JP", Helvetica, Arial, sans-serif
Weight:          300（既定・リード）/ 400（本文）/ 500（見出し・ラベル）
                 600–700 は価格と商品名だけ
Display:         32px / 500 / lh 1.5 / ls 0.10em
Section Head:    英字 18–24px / 500 / lh 1.5 / ls 0.13em（大文字）
                 和文 18–20px / 500 / ls 0.04em
Body:            16px / 400 / lh 1.8 / ls 0.04em
Lead:            18px / 300 / lh 1.8 / ls 0.03em
Feature:         font-feature-settings: normal（palt を使わない）
Radius:          2px（ボタン・カード・入力欄）/ 4px（塗りバッジ）/ 24px（入手経路チップ）
Shadow:          none（全要素）
Spacing:         4 / 8 / 12 / 18 / 24 / 40px、セクション間は 80px 以上
```

### プロンプト例

```
Mr. CHEESECAKE のデザインシステムに従って、商品一覧ページを作成してください。
- 書体は "Noto Sans JP", sans-serif の 1 本だけ。見出し用の書体を持たない
  （--font-body と --font-head を同じ値にする）。button だけ Helvetica, Arial を足す
- body { font-weight: 300 } から始める。見出しは weight 500 までにとどめ、
  700 を使うのは価格と商品名だけ
- 英字と和文で字間を変える：
  英字のセクション見出し（ONLINE STORE / NEWS）は大文字 ＋ 18–24px / 500 / letter-spacing 0.13em
  和文の見出し・本文は letter-spacing 0.04em
- 本文は 16px / 400 / line-height 1.8 / color #252a2c。注記だけ line-height 1.6
- ヒーローのリード文は 18px / weight 300 / line-height 1.8（太らせない）
- font-feature-settings は normal のまま。palt を使わない（「（税込）」の括弧が詰まるため）
- 配色は彩度を抜いたスレートグレーで組む：
  地 #ffffff、主色 #5a686c、副 #4b5d62、リンク・帯 #484e4d、
  補足 #768185、枠 #abbcc1、面 #f5f4f0 / #f5f5f5、文字 #252a2c
  暖色は「旗艦店」バッジの #ca8a12 と抽選告知の #fff2dc の 2 か所だけ。原色は使わない
- border-radius は 2px で統一する（ボタン・カード・入力欄）。
  塗りバッジだけ 4px、入手経路チップだけ 24px のピルにする
- 主 CTA は 面 #5a686c ＋ 文字 rgba(255,255,255,.86) ＋ radius 2px ＋
  padding 0 0 0 18px ＋ line-height 42px（右端に矢印を置く前提）＋ 15px weight 700 / ls 0.06em
- アウトラインボタンは 透明 ＋ 文字 #484e4d ＋ border 1px solid rgba(85,95,95,.4) ＋
  padding 15px 40px 15px 24px ＋ radius 2px
- 「もっと見る」は VIEW MORE（英字・16px・ls 0.10em）＋ 下に 1px の罫。ボタンの形にしない
- 商品カードは 画像 → 入手経路チップ（ピル）→ 商品名 16px/700 → 価格ボタン（#5a686c 塗り）の順。
  価格そのものをボタンにする
- box-shadow は一切使わない。階層は面色（#ffffff → #f5f4f0 → #f5f5f5 → #484e4d）と余白でつくる
- キャッチコピーは <br> で改行位置を固定する
- セクション間は 80px 以上の余白を取る。商品一覧は 4 カラムで、カード間の余白を広く取る
```
