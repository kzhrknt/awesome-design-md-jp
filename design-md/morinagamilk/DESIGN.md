# DESIGN.md — 森永乳業（MORINAGA MILK INDUSTRY）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-04 / 対象: `https://www.morinagamilk.co.jp/`, `/corporate/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 生成りのベージュ（`#FAF5EF`）と淡いオレンジ（`#F6D1AD`）の面に、丸みのある角丸と淡い影でカードを置く。食品メーカーらしい、やわらかく親しみのある構え
- **密度**: 低い。本文 18px / 行間 1.75、カードの padding は 36px と大きく取る
- **キーワード**: M PLUS 1p（届いていない）、ベージュとオレンジ、等倍の影、崖のある流体見出し

**このサイトの核心は4つある。**

1. **`"M PLUS 1p"` を 106 / 64 要素に宣言しているが、1 バイトも読み込んでいない。** 判定は 4 点 —— ①`document.fonts` に `M PLUS 1p` が 1 件も無い（あるのは `noto` / `mmiicons` / `slick`）②Google Fonts の `<link>` が **1 本も無い** ③フォントファイルのリクエスト 5 件はすべて **Noto Sans JP のサブセット**と自ドメインの `mmi.woff`（アイコン）④**隠し div の幅実測で `"M PLUS 1p"` = `sans-serif` = 1125px と完全に一致**。**実際に描画されているのは OS の `sans-serif`**（macOS はヒラギノ角ゴ、Windows は游ゴシック UI）
2. **読み込んでいる唯一の和文 Web フォントは、`noto` という自前の別名で 1 要素にしか当たっていない。** `@font-face { font-family: noto; src: url(…gstatic の Noto Sans JP…) }` が `loaded` だが、可視要素はトップの「大切なお知らせ」と下層の「一覧へ」の各 1 件だけ
3. **`html` も `body` も 16px で完全固定なのに、見出しと本文は `vw` の流体で、767 / 768px に大きな崖がある。** `h2` は `3.2vw`（デスクトップ）→ **`8vw`（モバイル）で 2.50 倍**、`p` は `min(2.5vw, 30px)` → **`5vw` で 2.00 倍**跳ぶ。**ルートだけ測ると「完全固定のサイト」に見える**
4. **`body { line-height: normal }`。** 行間の宣言が `body` に無いため、ブロックごとに宣言し直さないとブラウザ既定が降りる。実測でも `normal` のまま出ている要素が 15 件ある

**`font-feature-settings` の実測は 0 要素、CSS Custom Properties も 0 個。** 色・サイズ・角丸はすべて CSS に直書きされている。

> **角丸と影が統一されていない。** `border-radius` は実測で **5px / 5.4px / 8px / 9px / 10.5px / 11px / 16px / 30px / 42px / 45px** の 10 種（`5px 5px 25.5px` のような 3 値指定もある）。`box-shadow` も 5 種あり、しかも **`rgba(0,0,0,0.1) 3.6px 3.6px 3.6px 1.8px` のように x / y / ぼかしを同じ値にする等倍の書き方**をしている。**新規実装では下の表の代表値に寄せる**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Morinaga Red（リンク）** | **`#F62837`** | 可視 3 要素 ＋ 面 1 要素。`新商品` `キャンペーン` `ブランドサイト` のリンクと、丸ボタンの面 |
| **Category Red** | **`#D8222F`** | **可視 5 要素**。`CM/キャンペーン` `レシピ` のカテゴリラベル（`<i>` 要素） |
| **Category Blue** | **`#17A0E8`** | **可視 5 要素**。`商品情報` `研究開発` のカテゴリラベル |
| **Heading Navy** | **`#053781`** | `森永乳業のビフィズス菌研究`（h2・46.08px） |
| Link Navy | `#0A3066` | 下層の `一覧へ` ボタンの文字と枠 |
| Recruit Navy | `#002B72` | 下層の採用バナーの面 |
| Breadcrumb Blue | `#237CBC` | パンくずの `HOME` |
| Accent Brown | `#CE8B5A` | `「季節を楽しむおすすめレシピ」公開中！` |

> **赤が 2 つ・紺が 3 つある。** 赤は「リンク（`#F62837`）」対「カテゴリラベル（`#D8222F`）」、紺は「見出し（`#053781`）」「ボタン（`#0A3066`）」「バナーの面（`#002B72`）」で役割が分かれている。**同じ色の濃淡ではなく、別々に直書きされた別の色**として扱う

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文・見出し。**可視 73 / 40 要素**で最多
- **Text Secondary** (`#333333`): 本文の一部・リード文（可視 15 / 10 要素）
- **Text Muted** (`#666666`): 日付（可視 10 / 5 要素）
- **Text on Dark** (`#FFFFFF`): 写真・紺面の上
- **Surface Beige** (`#FAF5EF`): セクションとメガメニューの面（**可視 3 要素**）
- **Surface Peach** (`#F6D1AD`): CTA ボタンの面（**可視 4 要素**）
- **Surface Light** (`#F9F9F8`): 下層の採用ブロックの面
- **Border** (`#D7D7D7`): カードの枠（`1px solid`）
- **Border Light** (`#CCCCCC`): 下層のカードの枠 ／ `TOP` ボタンの面
- **Border Gray** (`#E0DEDC`): `閉じる` ボタンの面
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (4/4)`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **実際に描画されているのは OS の `sans-serif`**（macOS: ヒラギノ角ゴ ProN / Windows: 游ゴシック UI）
- **CSS の宣言は `"M PLUS 1p", sans-serif`**（106 / 64 要素、`.mplus` というユーティリティクラス名まで用意されている）が、**配信されていないため必ず 2 番目の `sans-serif` に落ちる**
- **`noto`（= Noto Sans JP の自前別名）**: 唯一 `loaded` している和文 Web フォント。可視 **1 要素**だけ
- **レガシースタックの残骸**: `メイリオ, Meiryo, "Hiragino Kaku Gothic ProN", …` が 8 / 2 要素に残っている（スライダーの `停止` / `再生`、パンくず、`TOP` ボタン）

> **「M PLUS 1p を使っているサイト」と読まないこと。** CSS の grep 件数とクラス名（`.mplus`）は豊富だが、**実際の描画には 1 文字も使われていない**。再現するなら 2 つの道がある ——
> **(a) 実サイトの見た目を再現する** → `font-family: sans-serif` と書く
> **(b) 設計意図を再現する** → Google Fonts から M PLUS 1p を**実際に読み込んだうえで**指定する（実サイトはこれができていない）

### 3.2 欧文フォント

- 専用の欧文フォントは持たない
- スライダーのページ番号だけ `font-family: Arial`（可視 13 要素・`font-size: 0px` で視覚的には隠している）

### 3.3 font-family 指定

```css
/* 実サイトの宣言（M PLUS 1p は配信されていないので sans-serif で出る） */
font-family: "M PLUS 1p", sans-serif;

/* 設計意図どおりに実装するなら、Google Fonts を実際に読み込んだうえで */
/* <link href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;500;700&display=swap" rel="stylesheet"> */
font-family: "M PLUS 1p", "ヒラギノ角ゴ ProN", "Yu Gothic Medium", sans-serif;

/* 実サイトに残っているレガシースタック（新規では使わない） */
font-family: メイリオ, Meiryo, "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3",
             "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
             "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic,
             Helvetica, Arial, sans-serif;
```

**フォールバックの考え方**:
- **実サイトの受け皿は `sans-serif` の 1 語だけ。** M PLUS 1p が届かないので、実質これが本番書体になっている
- **レガシースタック（メイリオ先頭）を新規実装に持ち込まない。** 残っているのはスライダーのボタンとパンくずだけ

### 3.4 文字サイズ・ウェイト階層

**ウェイトは CSS 上 400（61 / 58 要素）と 500（59 / 1 要素）が拮抗しているが、実体が OS 書体なので 400 と 500 は同じ太さで出る。** 幅実測でも **100〜500 → 696.45px / 600〜900 → 760.2px の 2 段**にしか割れない。700 は 8 要素だけ。

| Role | Size | Weight | Line Height | 備考 |
|------|------|--------|-------------|------|
| **Section Heading（流体）** | **46.08px**（1440px）→ **24.576px**（768px）→ **61.36px**（767px） | 400 | 1.10 (50.688px) | **`3.2vw` / `8vw`。767 / 768px に 2.50 倍の崖** |
| Page Title（下層） | 44px | 400 | — | `会社情報` |
| Sub Heading | 28px / 24px | 400 | 1.20 | `更新情報` `ニュースリリース` |
| Card Title（下層） | 22px | 400 | — | `理念体系` `社長メッセージ` |
| **Body（流体）** | **30px**（≥1200px・頭打ち）→ **19.2px**（768px）→ **38.35px**（767px） | 400 / 500 | **1.75** | **`min(2.5vw, 30px)` / `5vw`。2.00 倍の崖** |
| **Article Title** | **18px** | 400 | 1.50 | **最多（37 / 23 要素）** |
| List Item | 15px | 400 | 1.40 | 日付つきのリスト |
| Hero h1 | **15px**（≥768px）/ **13px**（≤767px） | 400 | — | 固定の 2 段 |
| Nav | 16px | **700** | 1.38 | グローバルナビ（weight 700 はここだけ） |
| Utility Nav | 14px | 400 | 2.14 | `Global` `通信販売サイト` |
| Breadcrumb | 12px | 400 | 1.00 | レガシースタック |

### 3.5 行間・字間

- **本文の行間は 1.75**（実測 **56 / 25 要素**で最多）
- 次点は **1.50**（12 要素）、**1.40**（12 要素）、**1.38**（8 要素・ナビ）、**1.30**（8 要素・レシピ名）、**1.20**（6 要素）
- **`body { line-height: normal }`**。宣言が無いので、**実測で `normal` のまま出ている要素が 15 件ある**（主にナビ）
- **字間は `normal` が既定**（実測 117 / 67 要素）。例外は商品カテゴリのチップの **`-0.35px`**（11 要素）だけ

**ガイドライン**:
- **`body` に `line-height: 1.75` を必ず宣言する。** 実サイトは宣言しておらず、ブロックごとに書き直している（抜けると行が詰まる）
- **本文に `letter-spacing` を足さない**（実測 `normal`）
- 見出しの行間は **1.10〜1.20** と詰める。本文 1.75 との落差がこのサイトのリズム

### 3.6 禁則処理・改行ルール

```css
word-break: normal;        /* body の実測値 */
overflow-wrap: break-word;
line-break: strict;
```

- `word-break: break-all` は使わない
- `word-break: auto-phrase` の宣言も無い

### 3.7 OpenType 機能

**`font-feature-settings` の実測は両ページとも 0 要素。**

- **`palt` を足さないこと。** そもそも本番書体が OS の `sans-serif` なので、`palt` を当てても端末によって挙動が変わる

### 3.8 縦書き

該当なし（`writing-mode: vertical-*` の実測 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（ピーチ面）**
- Background: **`#F6D1AD`**
- Text: `#222222`
- Border: なし
- Border Radius: **`9px`**
- Padding: `18px 0`（大型は `36px 36px 36px 45px`）
- Font: 18px / weight 400〜500
- Shadow: **`rgba(0, 0, 0, 0.1) 3.6px 3.6px 3.6px 1.8px`**
- 例: `機能性表示食品` `栄養成分一覧` `販売店検索`

**Secondary（枠線）**
- Background: `transparent`
- Text: `#222222`
- Border: **`1px solid #D7D7D7`**
- Border Radius: **`5.4px`**
- Padding: `0 0 0 36px`
- Font: 18px / weight 400
- 例: `新商品` `商品紹介` `ブランドサイト`

**Card Link（下層）**
- Background: `transparent` / Text: `#333333`
- Border: `1px solid #CCCCCC`
- Border Radius: **`11px`**
- Padding: `17.6px 44px 17.6px 55px`
- Font: 22px / weight 400
- Shadow: `rgba(0, 0, 0, 0.2) 2px 2px 4px 0`

**Outline Navy（`一覧へ`）**
- Background: `#FFFFFF` / Text: **`#0A3066`**
- Border: `1px solid #0A3066`
- Border Radius: **`16px`**
- Padding: `0 25px` / Font: 15px / **font-family: `noto`**
- Shadow: `rgba(0, 0, 0, 0.3) 2px 3px 5px 0`

### Badges / Chips

**Category Chip**
- Background: `transparent`
- Text / Border: **`#17A0E8`**（商品情報・研究開発）または **`#D8222F`**（CM/キャンペーン・レシピ）
- Border: `1px solid`（同色）
- Border Radius: **`42px`** / 大型は `45px`
- Padding: `0 8.4px` / Font: 14px

**Product Chip**
- Border Radius: **`5px`**
- Letter Spacing: **`-0.35px`**（このサイト唯一の字間）
- 例: `牛乳類` `飲料` `ヨーグルト`

### Cards

- Background: `#FFFFFF`
- Border: `1px solid #D7D7D7`（下層は `#CCCCCC`）
- Border Radius: **`8px`**（下層は `10.5px`）
- Shadow: **`rgba(0, 0, 0, 0.1) 3.2px 3.2px 3.2px 1.6px`**

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| S | 18px | ボタン上下 |
| M | 24px | グリッドの gap |
| L | 36px | 大型ボタン内側 |
| XL | 44〜55px | カードリンクの左右 |
| 割合 | `0 1.5%` / `2.38%` | 横方向の gap |

### Container

- **Max Width: 1400px**（実測 7 / 6 要素で最多。両ページ共通）
- 本文ブロック: 1000px

### Grid

- トップはヒーロー（左にイラスト ＋ 右に中央揃えのコピー）＋ カード列
- バナーは 565 × 266px のカルーセル

---

## 6. Depth & Elevation

| Level | Shadow | 実測 | 用途 |
|-------|--------|------|------|
| 1 | **`rgba(0, 0, 0, 0.1) 3.6px 3.6px 3.6px 1.8px`** | **16 要素** | ピーチ面のボタン |
| 2 | `rgba(0, 0, 0, 0.1) 3.2px 3.2px 3.2px 1.6px` | 5 要素 | カード |
| 3 | `rgba(0, 0, 0, 0.2) 2px 2px 4px 0` | 8 要素 | 下層のカードリンク |
| 4 | `rgba(0, 0, 0, 0.3) 2px 3px 5px 0` | 1 要素 | `一覧へ` ボタン |
| 5 | `rgba(0, 0, 0, 0.3) 0 0 10px 0` | 1 要素 | メガメニューのパネル |

> **影の書き方が独特。** Level 1・2 は **x / y / ぼかしを同じ値にし、広がりをその半分にする**（`3.6 3.6 3.6 1.8`）。一般的な「真下に落とす影」ではなく、**右下に等距離で落ちる影**になる。再現するときはこの比率をそのまま写す
>
> **影の種類が 5 つあるのは実装の実態。** 新規実装では **Level 1（ボタン）と Level 2（カード）の 2 段**に絞ってよい

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` に `line-height: 1.75` を宣言する**（実サイトは `normal` のままで、ブロックごとに書き直している）
- **本文 1.75 / 見出し 1.10〜1.20** の落差をつける
- **`letter-spacing: normal` を既定にする**（例外は商品チップの `-0.35px` だけ）
- **CTA はピーチ面 `#F6D1AD` / `border-radius: 9px` / 影 `rgba(0,0,0,.1) 3.6px 3.6px 3.6px 1.8px`**
- **カテゴリチップは枠線だけ**（面なし）で、`border-radius: 42px` のピル。色は `#17A0E8`（商品・研究）と `#D8222F`（CM・レシピ）の 2 系統
- 本文色は **`#222222`**、リード文は `#333333`、日付は `#666666`
- 面はベージュ `#FAF5EF` とピーチ `#F6D1AD` の 2 色
- コンテナは **1400px**
- **M PLUS 1p を使うなら、Google Fonts を実際に `<link>` で読み込む**（実サイトはこれを忘れている）

### Don't（禁止）

- **`"M PLUS 1p"` と書いただけで届いていると思わない。** 実サイトは 106 要素に宣言しながらフォントファイルを 1 件も要求していない
- **レガシースタック（メイリオ先頭）を新規実装に持ち込まない**（実サイトでも 8 要素の残骸）
- **`font-weight: 500` を「中太」として使わない**（本番書体が OS 書体なので 400 と同じ太さで出る）
- **`font-feature-settings: "palt"` を足さない**（実測 0 要素）
- **`border-radius` を 10 種類に散らさない**（実サイトの実態だが、設計としては誤り）
- **影を 5 種類に散らさない**（2 段で足りる）
- **本文に `letter-spacing` を足さない**
- 見出しと本文の `vw` 指定を `rem` に読み替えない（`html` は 16px 固定なので `rem` では追従しない）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 767px** | **`screen and (max-width: 767px)`。CSS 全文で 23 回と最多** |
| **Desktop** | **≥ 768px** | `screen and (min-width: 768px)`（6 回） |
| Mid | 768–1200px | 入れ子の中間 |
| Wide | 1200–1400px | コンテナ上限まで |
| Narrow | ≤ 360px | 最小幅の微調整 |

### タッチターゲット

- ピーチ面のボタン（18px / padding `18px 0`）で高さ 63px — 44px を満たす
- カテゴリチップ（14px / padding `0 8.4px`）は高さが足りない。**モバイルでは高さを確保すること**

### フォントサイズの調整

**`html` も `body` も 1440 / 1200 / 1024 / 834 / 769 / 768 / 767 / 390 / 375px の 9 幅すべてで 16px 固定。** 動くのは見出しと本文の側。

| 幅 | `h2` | `p` | `h1` |
|----|------|-----|------|
| 1440px | 46.08px | 30px（頭打ち） | 15px |
| 1200px | 38.4px | 30px | 15px |
| 1024px | 32.768px | 25.6px | 15px |
| 834px | 26.688px | 20.85px | 15px |
| 769px | 24.608px | 19.225px | 15px |
| **768px** | **24.576px** | **19.2px** | 15px |
| **767px** | **61.36px** | **38.35px** | **13px** |
| 390px | 31.2px | 19.5px | 13px |
| 375px | 30px | 18.75px | 13px |

- **`h2` = `3.2vw`（≥768px）/ `8vw`（≤767px）。1px またぐだけで 2.50 倍に跳ぶ**
- **`p` = `min(2.5vw, 30px)`（≥768px）/ `5vw`（≤767px）。2.00 倍に跳ぶ**
- **`h1` は 15px / 13px の固定 2 段**
- **モバイルの設計幅は 767px**（`8vw` × 767 = 61.36px）

> **規定の 4 幅（1440 / 1200 / 834 / 375px）では崖が見えない。** 834px も 375px も「ただの流体」に見えるので、**必ず 767 / 768px を測ること**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Link Red:      #F62837
Category Red:  #D8222F   （CM・レシピ）
Category Blue: #17A0E8   （商品情報・研究開発）
Heading Navy:  #053781
Button Navy:   #0A3066
Text:          #222222 / #333333
Muted:         #666666
Surface:       #FAF5EF（ベージュ） / #F6D1AD（ピーチ）
Border:        #D7D7D7 / #CCCCCC
Background:    #FFFFFF
Font (実サイト): sans-serif   ※"M PLUS 1p" は宣言のみで未配信
Font (意図):    "M PLUS 1p", "ヒラギノ角ゴ ProN", "Yu Gothic Medium", sans-serif
                （Google Fonts の <link> を必ず入れる）
Root:          html 16px / body 16px（9 幅で完全固定）
Line Height:   1.75（本文） / 1.10〜1.20（見出し）
Letter Spacing: normal（商品チップのみ -0.35px）
Border Radius: 9px（ボタン） / 8px（カード） / 42px（チップ）
Shadow:        rgba(0,0,0,.1) 3.6px 3.6px 3.6px 1.8px（ボタン）
               rgba(0,0,0,.1) 3.2px 3.2px 3.2px 1.6px（カード）
Container:     1400px
Breakpoint:    767 / 768px（崖あり）
```

### プロンプト例

```
森永乳業のデザインシステムに従って、商品紹介ページを作成してください。
- font-family は "M PLUS 1p", "ヒラギノ角ゴ ProN", "Yu Gothic Medium", sans-serif
  （Google Fonts の <link> を必ず入れること。実サイトは宣言だけで読み込みを忘れている）
- body に line-height: 1.75 を明示的に宣言する
- 見出しの行間は 1.10〜1.20、本文は 1.75 と落差をつける
- letter-spacing は normal（商品チップだけ -0.35px）
- h2 は font-size: 3.2vw（768px 以上）/ 8vw（767px 以下）、p は min(2.5vw, 30px) / 5vw
  html は 16px 固定なので rem では追従しない。vw を直接書く
- CTA は背景 #F6D1AD / border-radius 9px / padding 18px 0 / 18px
  影は rgba(0,0,0,.1) 3.6px 3.6px 3.6px 1.8px（x・y・ぼかしを同値、広がりはその半分）
- 枠線ボタンは 1px solid #D7D7D7 / border-radius 5.4px / 背景なし
- カテゴリチップは枠線のみのピル（border-radius 42px）。色は商品・研究が #17A0E8、CM・レシピが #D8222F
- カードは 1px solid #D7D7D7 / border-radius 8px / 影 rgba(0,0,0,.1) 3.2px 3.2px 3.2px 1.6px
- 本文色は #222222、リード文は #333333、日付は #666666
- セクションの面はベージュ #FAF5EF、コンテナは max-width 1400px
- font-feature-settings: "palt" は使わない
- border-radius と影は上の値に絞る（実サイトは radius 10 種・影 5 種に散っているが設計としては誤り）
```
