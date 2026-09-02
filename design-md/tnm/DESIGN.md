# DESIGN.md — 東京国立博物館（Tokyo National Museum / 東博）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-02 / 対象: `https://www.tnm.jp/?lang=ja`, `/modules/r_collection/`, `/modules/r_free_page/index.php?id=113`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地・**炭黒 `#2b2b2b`**・**深緑 `#1b854d`** の3色でほぼ全てを組む。角丸を一切使わない矩形の面と、1px の罫線だけで構造をつくる。影はゼロ
- **密度**: 情報量は多いが、行間 2.0 と広い余白で読ませる。所蔵品・展示スケジュール・開館カレンダーという「調べるためのUI」を、装飾なしで整理する設計
- **キーワード**: 炭黒、深緑、矩形、palt、行間2.0

**このサイトの核心は3つ。**

1. **`font-feature-settings: "palt"` がページ全体にかかっている。** DOM 全走査 2,024 要素のうち **1,929 要素**が `palt`。和文の字送りを詰めた上で `letter-spacing: 1px` で開き直す、という二段構えの組み方をしている
2. **`line-height` が階層を問わずほぼ `2.0`。** 本文 16px/32px、見出し 40px/80px、大見出し 50px/100px。**見出しでも詰めない**のが特徴で、一般的な「見出しは 1.3」とは真逆
3. **角丸が存在しない。** 可視要素で `border-radius` が 0 でないのは、SNS アイコンの `50%`（8件）と Language ボタンの `3px`（1件）だけ

---

## 2. Color Palette & Roles

CSS Custom Properties は **0個**。以下はすべて computed style の実測値。

### Primary（構造色）

- **Charcoal** (`#2b2b2b`): サイトの基幹色。本文の文字色（**実測 933 要素で最多**）、濃色パネルの面、主要ボタンの面と枠。**このサイトの「黒」は純黒ではなく `#2b2b2b`**
- **Black** (`#000000`): 「予告」バッジ、白ボタンの上の文字色。`#2b2b2b` と使い分けている（26件）

### Accent（行動色）

- **TNM Green** (`#1b854d`): **チケット購入・通知登録など「行動させる」導線の専用色**。展示項目の左縦罫、「注目」バッジ、「電子チケット販売」ボタンの面。**汎用の success ではなく、東博の CTA 色**
- **Link Blue** (`#2869dd`): 本文中のテキストリンク（実測 137 要素）。ボタンには一切使わない

### Calendar（開館カレンダー専用の状態色）

開館カレンダーは**色だけでなく記号（○ ☽ ▲ ×）も併記**して状態を示す。色覚に依存しない設計。

| 状態 | 面色 | 記号 | 意味 |
|------|------|------|------|
| 開館日 | `#ffffff` | ○ | 通常開館 |
| 夜間開館日 | **`#93278f`**（紫） | ☽ | 20時まで開館 |
| 休館日 | **`#666666`**（グレー） | × | 休館 |
| 限定開館日 | — | ▲ | 限定開館 |

### Semantic

- **Danger** (`#990000`): 来館案内ページの注意書き（休館・変更のお知らせ）。**深い赤で、鮮やかな赤は使わない**

### Neutral（ニュートラル）

- **Text Primary** (`#2b2b2b`): 本文
- **Text on Dark** (`#ffffff`): 濃色パネルの上（実測 808 要素）
- **Background** (`#ffffff`): ページ背景。`body` に明示指定
- **Surface Dark** (`#2b2b2b`): 「本日の開館情報」「カレンダーから来館日を選択」等の濃色パネル
- **Divider** (`#4d4d4d`): 濃色パネル内の罫線

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP** → ヒラギノ角ゴ ProN → ヒラギノ角ゴシック → メイリオ
- **明朝体**: 使用しない

ロゴ（「東京国立博物館」の明朝）は画像であり、Web フォントではない。**本文に明朝を持ち込まないこと。**

### 3.2 欧文フォント

- **サンセリフ**: **Helvetica Neue** → Arial。**和文より前に置く欧文優先型**
- **セリフ / 等幅**: 定義なし

### 3.3 font-family 指定

```css
/* サイト全体で単一のスタック */
font-family: "Helvetica Neue", Arial, "Noto Sans JP",
             "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
```

**フォールバックの考え方**:
- **欧文優先型。** `Helvetica Neue` → `Arial` を先頭に置き、和文グリフだけを Noto Sans JP 以降に任せる。数字・年号・欧文の作品名が多いサイトなので、欧文の字形を優先している
- `ヒラギノ角ゴ ProN`（JIS2004 字形）。Pro ではない
- **`font-family` はこの1本だけ。** 見出し用・本文用の使い分けが存在しない
- ブラウザ既定の `Arial` 単独が出る箇所（Google 翻訳ウィジェット、`input[type=submit]` 等）は**サードパーティ／UA 既定**であり、設計には含めない

### 3.4 文字サイズ・ウェイト階層

root の `font-size` は **10px**（`rem` で組むと 1.6rem = 16px）。

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Display | 50px | 700 | **2.0 (100px)** | 1px | コレクションページの大見出し |
| Heading 1 | 44px | 700 | 1.5 (66px) | 1px | 写真上のヒーロー見出し |
| Heading 2 | 40px | 700 | **2.0 (80px)** | 1px | 下層ページのページタイトル |
| Heading 2 (top) | 35px | 700 | 1.5 (52.5px) | 1px | トップのセクション見出し |
| Heading 3 | 24px | 700 | 1.5 (36px) | 1px | サブ見出し |
| Heading 4 | 22px | 700 | **2.0 (44px)** | 1px | 表の見出し・小見出し |
| Lead | 22px | 500 | 2.0 (44px) | 1px | 濃色パネルのリード |
| Body | **16px** | **500** | **2.0 (32px)** | 1px | 本文。最多（152要素） |
| Body (compact) | 16px | 500 | 1.5 (24px) | 1px | リスト内（150要素） |
| Nav | 16px | 700 | 1.6 (25.6px) | 1px | グローバルナビ |
| Nav (large) | 18px | 700 | 1.6 (28.8px) | 1px | ナビの親項目 |
| Caption | 14px | 700 | normal | 1px | ヘッダーのユーティリティ |

> **本文のウェイトが `400` ではなく `500`。** ヒラギノ / Noto Sans JP の Medium を本文に使うことで、白地に対する黒の締まりを出している。`400` で実装すると全体が薄く見える。

### 3.5 行間・字間

- **行間**: **2.0 が既定**。本文も見出しも 2.0。詰めるのは 1.5 / 1.6 の2段だけ
- **字間**: **`1px` 固定（`em` ではない）**。サイト全体で `letter-spacing: 1px` の1値のみ（実測 437 要素すべて）

> **字間が `px` 固定であることの意味**: 16px 本文では 0.0625em、40px 見出しでは 0.025em になる。**サイズが大きいほど相対的に詰まって見える**設計で、大見出しが締まり、本文がゆったりする。`0.06em` のような `em` 指定に置き換えると、見出しがだらしなく開くので**必ず `1px` で書くこと**。

**ガイドライン**:
- 見出しで `line-height` を 1.2〜1.3 に詰めない。このサイトは見出しでも 2.0 を基本にする
- ただし写真の上に乗る大きなヒーロー見出し（44px）だけは 1.5 に落ちる

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

作品名・展示名が長いため、**濃色パネル内の見出しは意図した位置で改行**している。表組み（料金表・開館時間）が多く、セル内の折り返しは自動に任せる。

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";
```

**`palt` をページ全体（`body`）に適用している。** 実測 2,024 要素中 **1,929 要素**（95%）が `palt` 有効。無効な 95 要素は Google 翻訳ウィジェットと `input` / `button` の UA 既定スタイル。

**`palt` と `letter-spacing: 1px` の併用がこのサイトの組み方**。`palt` で括弧・句読点まわりのアキを詰め、そのうえで一律 1px 開き直すことで、和欧混植でも字送りが乱れない。

> 片方だけ真似ない。`palt` だけ入れると全体が詰まりすぎ、`letter-spacing` だけ入れると括弧の前後が空きすぎる。

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**すべて `border-radius: 0`。** ボタンは「面 or 枠」の2形式しかない。

**Primary Solid（構造・遷移）**
- Background: `#2b2b2b`
- Text: `#ffffff`
- Border: `1px solid #2b2b2b`
- Padding: `13.5px 22.5px`
- Border Radius: `0`
- Font Size: `18px` / Weight: `700`

**Action Solid（チケット・通知／緑）**
- Background: `#1b854d`
- Text: `#ffffff`
- Border: `1px solid #1b854d`
- Padding: `6.4px 56px 6.4px 16px`
- Border Radius: `0`
- Font Size: `16px` / Weight: `700`

**Outline（副次的な導線）**
- Background: `transparent`
- Text: `#2b2b2b`
- Border: `1px solid #2b2b2b`
- Padding: `8px 16px` / `6.4px 56px 6.4px 16px`
- Border Radius: `0`

**Outline Heavy（言語切替）**
- Border: **`2px solid #2b2b2b`**
- Padding: `6.4px 52px`

**Inverse（濃色パネルの上）**
- Background: `#ffffff`
- Text: `#000000`
- Border: `1px solid #ffffff`
- Padding: `13.5px 22.5px`

**Card Link（アイコン付きの大きな導線）**
- Background: `#ffffff` / Text: `#2b2b2b`
- Padding: `18.4px 12px 18.4px 36px`
- Font Size: `20〜24px` / Weight: `700`

> **`padding` の右が極端に広い（`56px`）のは、右端に `>` シェブロンを置くため。** 左が `36px` 広いパターンは左端にアイコンを置くため。**この非対称パディングがボタンの型**なので、`padding: 8px 16px` の均等に直さないこと。

### Badges

- **展示中**: 面 `#2b2b2b` / 文字 `#ffffff` / padding `10px 6px` / radius `0`
- **注目**: 面 `#1b854d` / 文字 `#ffffff` / padding `10px 6px` / radius `0`
- **予告**: 面 `#000000` / 文字 `#ffffff` / padding `6px 18px` / radius `0` / 20px 700

### Pagination

- 現在ページ: 面 `#1b854d` / 文字 `#ffffff` / border `1px solid #1b854d` / radius `2px`
- 他ページ: 面 `#ffffff` / 文字 `#333333` / border `1px solid #2b2b2b` / radius `2px`
- Padding: `4px 8px`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #2b2b2b`
- Border Radius: `0`
- Font Size: `16px`（iOS のズーム回避のため 16px を下回らない）
- 検索フォームは既定で折りたたまれ、虫眼鏡アイコンで展開する

### Cards / Panels

- **濃色パネル**: 面 `#2b2b2b` / 文字 `#ffffff` / radius `0` / 影なし
- **展示リスト項目**: 左に `#1b854d` の縦罫（3〜4px）＋ 白背景
- 表組み: `th` は 22px/700、`td` は 16px/500、罫線 1px

---

## 5. Layout Principles

### Spacing Scale

明示トークンは無い。実測のギャップ：

| Token | Value | 用途 |
|-------|-------|------|
| XS | 5px | インライン |
| S | 8px | バッジ内 |
| M | **16px** | **最頻。カード間・グリッドの gutter（22箇所）** |
| L | 30px | セクション内 |
| XL | 50px | セクション間 |

### Container

- Max Width: **1280px**（実測 10要素で最多）
- 全幅ラッパー: `1336px`
- 記事幅: `1070px`

### Grid

- トップの主要ブロック: 左 `914px` ＋ 右 `384px` の2カラム（開館情報 ＋ カレンダー）
- 展示一覧: 16px gutter の等幅グリッド

---

## 6. Depth & Elevation

**影は 1件も存在しない。可視要素の `box-shadow` は実測 0件。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべての要素** |

**奥行きは「白地 / 炭黒パネル / 写真」の3層と 1px の罫線だけで表現する。** カードやモーダルに影を足すと、このサイトの平面的な整理感が崩れる。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` に `font-feature-settings: "palt"` を当て、同時に `letter-spacing: 1px` を指定する。** この2つはセット
- `letter-spacing` は **`1px` の固定値**で書く（`em` に置き換えない）
- `line-height` は **2.0 を既定**にする。見出しでも詰めない
- 本文のウェイトは **`500`**（`400` ではない）
- 面色は `#2b2b2b`（構造）と `#1b854d`（行動）の2色に絞る
- ボタンの `padding` は右 56px / 左 16px の非対称にし、右端にシェブロンを置く
- カレンダーなど状態を色で示す箇所は、**必ず記号（○ ☽ ▲ ×）を併記**する
- `font-size` は 16px を下回らない（`input` も含む）

### Don't（禁止）

- **`border-radius` を足さない。** このサイトの角丸は SNS アイコンの `50%` と Language ボタンの `3px` だけ
- **`box-shadow` を使わない。** 実測 0件
- **見出しの `line-height` を 1.2〜1.3 に詰めない**（2.0 が既定）
- `letter-spacing` を `em` で書かない（大見出しがだらしなく開く）
- **リンク色 `#2869dd` をボタンの面色に使わない**（テキストリンク専用）
- 緑 `#1b854d` を汎用の success として使わない（**チケット・通知など行動導線の専用色**）
- 明朝体を持ち込まない（ロゴは画像）
- 本文テキストに `#000000` を使わない（`#2b2b2b`）
- `Arial` 単独のスタックを真似ない（UA 既定・翻訳ウィジェット由来）

---

## 8. Responsive Behavior

### Breakpoints

**実質 768px の1本**でモバイル／デスクトップを切り替える（実測 57箇所と突出）。それ以外は個別要素の微調整。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ **768px** | **主ブレークポイント**。2カラムが縦積みになる |
| Narrow Desktop | ≤ 1120px / 1200px | ナビの折り返し調整 |
| Desktop | > 1280px | コンテナ 1280px で頭打ち |

### タッチターゲット

- 最小サイズ: 44px × 44px
- カレンダーのセルは実測 40px 前後なので、**モバイルでは高さを 44px 以上に広げる**
- Language ボタン（padding `1.3px 6.5px`）は**デスクトップ専用の小さなユーティリティ**。モバイルでは別の導線にする

### フォントサイズの調整

- 本文 16px は維持（縮めない）
- Display 50px / Heading 40px は 24〜28px 程度まで縮める
- 行間 2.0 はモバイルでも維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:   #2b2b2b   (Charcoal / 構造)
Accent Color:    #1b854d   (TNM Green / 行動)
Link Color:      #2869dd
Danger:          #990000
Text Color:      #2b2b2b
Background:      #ffffff
Font: "Helvetica Neue", Arial, "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
Root Size:       10px  (1.6rem = 16px)
Body Size:       16px / weight 500
Line Height:     2.0
Letter Spacing:  1px  (固定値)
Font Feature:    "palt"  (body に全体適用)
Radius:          0
Shadow:          none
Container:       1280px
Breakpoint:      768px
```

### プロンプト例

```
東京国立博物館（東博）のデザインシステムに従って、展覧会一覧ページを作成してください。

- body に font-feature-settings: "palt" と letter-spacing: 1px を当てる
  （letter-spacing は em ではなく 1px 固定）
- 本文は 16px / font-weight 500 / line-height 2.0 / color #2b2b2b
- 見出しも line-height 2.0 を維持する（詰めない）
- border-radius は 0。box-shadow は使わない
- 「本日の開館情報」のような要約ブロックは #2b2b2b の濃色パネル＋白文字
- 展示項目は左に #1b854d の縦罫を 4px 引く
- 「チケット購入」ボタンだけ面色 #1b854d、それ以外の遷移ボタンは #2b2b2b
- ボタンの padding は 6.4px 56px 6.4px 16px（右端に > シェブロンを置くため）
- 状態を色で示す箇所は必ず記号（○ ☽ ▲ ×）を併記する
- コンテナ幅 1280px、ブレークポイント 768px
```
