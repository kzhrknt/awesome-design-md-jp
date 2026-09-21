# DESIGN.md — 国立科学博物館（National Museum of Nature and Science）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-21 / 対象: `https://www.kahaku.go.jp/`, `/tenji/index.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **書体そのものがアクセシビリティ設計**。モリサワの UD フォント（TBUD ゴシック）を Web フォントで配信し、字間には一切手を入れず、詰めは `palt` に任せる。赤・黒・白の3色で、影を1つも使わない
- **密度**: 中程度。本文 17px に対して行間 34px（2.00）、リード文は 20px / 50px（2.50）と、日本語としても相当ゆったり組む
- **キーワード**: UD ゴシック、palt 全面適用、字間ゼロ、科博レッド、影なし

**このサイトの核心は4つある。**

1. **和文書体は「TBUDゴシック」3ウェイト＋「UDタイポス」の計4本。すべて CSS 変数で名指しされている。** `--font-sans-jp-r/b/e`（Regular / Bold / ExBold）と `--font-accent-jp`（UDTypos510Std）。実測でも TBUDGoStd-Bold 175 要素 / ExBold 74 要素 / Regular 103 要素 / UDTypos510Std 3 要素（トップ）で、**この4本以外の和文書体は1要素も無い**
2. **`font-feature-settings: "palt"` を全面適用している（実測 トップ 1948 要素 / 展示 TOP 1837 要素）。** 収録サイト中で最大級の適用数
3. **`letter-spacing` は `normal` 一択（実測 355/355 要素）。** 詰めは書体と `palt` に任せ、CSS では字間を作らない。**例外は UD タイポスの大見出しだけ**（`日本館` `地球館` に 14px ＝ 0.2em、`屋外展示` に 13.5px）
4. **書体名とウェイトを1対1でセットにして変数化している。** `--font-sans-jp-b: "MFW-TBUDGoStd-Bold"` と `--font-sans-jp-b-weight: 600` が必ず対で使われる。**太さは `font-weight` ではなく書体名で切り替える設計**で、`@font-face` 側は `font-weight: 1 1000` を受けるため合成太字が起きない

**影は 0 種**（`box-shadow` 実測 0 件）。面の区別は `#F0F0F0` の地色と `1px solid #F0F0F0` の枠で行う。

### アクセシビリティ機構（このサイト固有）

ヘッダーに **`文字サイズ 大 / 小`** と **`反転表示`** のトグルがある。そのため CSS 変数に**高コントラスト用のブランド色**が別に用意されている。

- 通常: `--main-color: #d61d00`
- 高コントラスト: `--main-color-hc: #AD133F`

**実測（通常モード）では `#d61d00` が可視 28 要素（トップ）/ 44 要素（展示 TOP）。`#AD133F` は 0 要素。** 反転表示を実装しない場合でも、**ブランド赤には濃い方の代替色が対になっている**ことを前提に設計する。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 変数 | 実測 |
|------|--------|------|------|
| **科博レッド** | **`#d61d00`** | `--main-color` | **可視 28 要素（トップ）/ 44 要素（展示 TOP）**。本日の開館情報パネル、`開催中` バッジ、`日本館を見る` `展示一覧` などの CTA、`詳しく見る` の pill |
| **科博レッド（高コントラスト）** | **`#AD133F`** | `--main-color-hc` | 反転表示モード専用。**通常モードでは可視 0 要素** |

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文・見出し。**可視 193 要素**（実サイトの宣言は `--text-color: #222` と 3 桁。`#222222` と同値）。**純黒は使わない**
- **Text on Dark** (`#ffffff`): 赤面・黒面・写真上のテキスト（可視 161 要素）
- **Surface Dark** (`#222222`): `本日開館` `企画展` バッジ、日付切替タブ、文字サイズボタンの塗り面（可視 20 要素）
- **Surface Gray** (`#666666`): `予告` バッジ、非選択タブ（可視 6 要素）
- **Background** (`#F0F0F0`): **ページの地色**（`--main-bg-color`）。`main.lo-globalContainer` が敷く。カード枠の色にも使う
- **Surface** (`#ffffff`): カード・パネルの面（`--white-color`）
- **Link Blue** (`#0034D1`): カード内リンクの文字色（`--main-link-color`。実測 interactive 2 要素）

> **`pageBackground.resolved` は `rgb(255,255,255)`（根拠 `body`）だが、実際に見えている地色は `#F0F0F0`。** `main.lo-globalContainer` が 1,094,400px² を占めて白を覆う。**コンテンツの地色は `#F0F0F0` として組むこと。**

---

## 3. Typography Rules

### 3.1 和文フォント

すべて **モリサワ Fonts（MFW）配信の Web フォント**。`document.fonts` で `loaded` を確認済み。

| 変数 | 書体 | ウェイト変数 | 用途 |
|------|------|--------------|------|
| `--font-sans-jp-r` | **MFW-TBUDGoStd-Regular** | `--font-sans-jp-r-weight: 400` | 本文・注記・フォーム |
| `--font-sans-jp-b` | **MFW-TBUDGoStd-Bold** | `--font-sans-jp-b-weight: 600` | カード見出し・ナビ・ボタン（**最多 175 要素**） |
| `--font-sans-jp-e` | **MFW-TBUDGoStd-ExBold** | `--font-sans-jp-e-weight: 800` | セクション見出し（40px）・バッジ |
| `--font-accent-jp` | **MFW-UDTypos510Std-Regular** | `--font-accent-jp-weight: 500` | **展示名の特大見出しだけ**（`日本館` `地球館`） |

- **TBUD ゴシック**も**UD タイポス**もモリサワのユニバーサルデザイン書体。**この選定自体がサイトの主張**なので、代替する場合も UD 系を選ぶ
- `MFW-UDTypos512Std-Regular` も `@font-face` で宣言されているが、実測した全ページで **`unloaded`**。使わない

### 3.2 欧文フォント

- **専用の欧文書体を持たない。** 数字・アルファベットも TBUD ゴシックの欧文グリフをそのまま使う
- フォールバックに `"Helvetica Neue", Arial` を置く
- **Google Fonts が10ファミリー `@font-face` 宣言されているが、実測した全ページで全件 `unloaded`**：Barlow（100〜900 の9本）、M PLUS Rounded 1c、Noto Sans JP、Noto Serif JP、Shippori Mincho B1、Yusei Magic、Zen Maru Gothic（5本）。**宣言はあるが描画には一切使われていない。これらを前提に組まないこと**

### 3.3 font-family 指定

```css
:root {
  --font-sans-jp-r: "MFW-TBUDGoStd-Regular";
  --font-sans-jp-b: "MFW-TBUDGoStd-Bold";
  --font-sans-jp-e: "MFW-TBUDGoStd-ExBold";
  --font-accent-jp: "MFW-UDTypos510Std-Regular";
  --font-sans-jp-r-weight: 400;
  --font-sans-jp-b-weight: 600;
  --font-sans-jp-e-weight: 800;
  --font-accent-jp-weight: 500;
}

/* 本文（body） */
font-family: var(--font-sans-jp-r), "Helvetica Neue", Arial,
             "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
font-weight: var(--font-sans-jp-r-weight);

/* 見出し・ナビ・ボタン */
font-family: var(--font-sans-jp-b);
font-weight: var(--font-sans-jp-b-weight);   /* 600 */

/* セクション見出し */
font-family: var(--font-sans-jp-e);
font-weight: var(--font-sans-jp-e-weight);   /* 800 */

/* 展示名の特大見出しのみ */
font-family: var(--font-accent-jp);
```

**フォールバックの考え方**:
- **和文優先。** Web フォントを先頭に置き、欧文フォールバックはその後ろ
- **太さは書体名で切り替える。** `font-family` を Bold の書体に差し替えたうえで `font-weight` も一緒に動かす。`@font-face` 側が `font-weight: 1 1000` を受けるため、600 / 800 を指定しても**ブラウザの合成太字にはならない**
- **`font-weight` だけで太くしない。** Regular の書体名のまま 700 を当てると合成太字になる

### 3.4 文字サイズ・ウェイト階層

`html { font-size: 10px }`。**`rem` は ×10 で px に直す**（1.7rem = 17px）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Gallery Display** | **UDTypos510Std** | **48px** | 800 | **96px (2.00)** | normal | 展示名。縦組み版は 70px / lh 70px / **ls 14px (0.2em)** |
| **Section Heading** | **TBUDGoStd-ExBold** | **40px** | **800** | 40px (1.00) / 64px (1.60) | normal | `お知らせ` `特別展・企画展` `常設展` |
| Heading (card) | TBUDGoStd-Bold | 22px | 600 | 44px (2.00) | normal | カードタイトル |
| Heading (small) | TBUDGoStd-ExBold | 20px | 800 | 32px (1.60) | normal | `展示検索` |
| **Lead** | **TBUDGoStd-Bold** | **20px** | 600 | **50px (2.50)** / 60px (3.00) | normal | **リード文だけ極端に行間を開ける** |
| Nav | TBUDGoStd-ExBold | 18px | 800 | 27px (1.50) | normal | グローバルナビ |
| Nav (sub) | TBUDGoStd-Bold | 18px | 600 | 27px (1.50) | normal | ドロワー内リンク |
| **Body** | **TBUDGoStd-Regular** | **17px** | **400** | **34px (2.00)** | normal | 本文（body の既定） |
| Body (dense) | TBUDGoStd-Regular | 16px | 400 | 32px (2.00) | normal | 表・カード本文 |
| List item | TBUDGoStd-Bold | 16px | 600 | 32px (2.00) | normal | 会員名など |
| Caption | TBUDGoStd-Regular | 15px | 400 | 22.5px (1.50) | normal | 注記 |
| Button | TBUDGoStd-Bold | 14px | 600 | 21px (1.50) | normal | ヘッダーのボタン |
| Small | TBUDGoStd-Regular | 13px | 400 | 16.25px (1.25) | normal | `検索` `Language` `メニュー` |

**サイズ分布（トップ / 可視 355 要素）**: 16px (116) / 18px (92) / 15px (45) / 13px (33) / 22px (16) / 20px (15) / 17px (13)

**ウェイト分布（トップ）**: 600 (175) / 400 (101) / 800 (77) / 700 (2)
→ **700 は `文字サイズ 大 / 小` ボタンの2要素だけ。** ここだけ `bold` の素指定が残っている

### 3.5 行間・字間

- **本文の行間**: **2.00**（17px → 34px）。**これが body の既定値**
- **リード文の行間**: **2.50〜3.00**（20px → 50px / 60px）。**日本語サイトでも最大級に広い**
- **見出しの行間**: 1.00〜1.60。40px 見出しは lh 40px（詰める）か 64px（1.60）
- **UI（ナビ・ボタン）の行間**: 1.25〜1.50
- **字間**: **`normal`。全ページを通してこれが既定**（実測 355/355・371/374 要素）

**ガイドライン**:
- **`letter-spacing` を書かない。** UD 書体と `palt` で字送りを作る設計なので、CSS で字間を足すと二重にかかる
- **例外は UD タイポスの特大見出しだけ**：`letter-spacing: 14px`（70px に対して 0.2em）。このときは `palt` の効果より字空けが勝つ
- 行間比 分布（トップ）: 1.50 (86) / 1.63 (79) / **2.00 (78)** / 1.25 (30) / 1.88 (27) / 1.00 (19)

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- 展示名・特別展名は長いため、**見出しでも折り返しを許す**（`white-space: nowrap` を当てない）

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* グローバルに適用 */
```

- **`palt` は全要素に効かせる（実測 1948 要素 / 1837 要素）。** 見出しだけではなく本文・ナビ・フォームまで含む
- **`palt` を効かせたうえで `letter-spacing: normal` を守る**のがこのサイトの組み方。両方を足さない
- `kern` `tnum` は使っていない

### 3.8 縦書き

```css
writing-mode: vertical-rl;
```

**展示 TOP で 12 要素が縦組み**（`ob-tenjiHeading__txtJp` / `ob-tenjiHeading__txtEn`）。外部ウィジェット由来ではなく、**サイト本体の展示名見出し**。

```css
.exhibit-heading__jp {
  writing-mode: vertical-rl;
  font-family: var(--font-accent-jp);   /* UDTypos510Std */
  font-size: 70px;
  line-height: 70px;                     /* 1.00 */
  letter-spacing: 14px;                  /* 0.2em。縦組みでは字間を開ける */
}
.exhibit-heading__en {
  writing-mode: vertical-rl;
  font-family: var(--font-accent-jp);
  font-size: 20px;
  line-height: 40px;                     /* 2.00 */
  letter-spacing: normal;
}
```

- **和文（`日本館`）と欧文（`Japan Gallery`）を並べて縦に組む。** 欧文側は字間 normal のまま

---

## 4. Component Stylings

### Buttons

**Primary（赤・塗り）**
- Background: **`#d61d00`**
- Text: `#ffffff`
- Font: **18px / TBUDGoStd-Bold / weight 600**
- Padding: `0px 8px`（`日本館を見る`）／ `4px 32px`（`展示一覧`）
- Border Radius: **`4px`**

**Primary（赤・pill）**
- Background: `#d61d00` / Text: `#ffffff`
- Font: **15px / TBUDGoStd-ExBold / weight 800**
- Padding: `8px 30px`
- Border Radius: **`1440px`**（完全な pill。実サイトは極端な値を入れている）

**Dark（黒・塗り）**
- Background: **`#222222`** / Text: `#ffffff`
- Font: 17px / TBUDGoStd-Bold / weight 600
- Padding: `4px 21px`
- Border Radius: `4px`

**Outlined（白＋黒枠）**
- Background: `#ffffff` / Text: **`#0034D1`**（リンク色）
- Border: **`2px solid #222222`**
- Border Radius: `10px`
- Font: 17px / weight 400

**Text Size Toggle（`大` / `小`）**
- Background: `#222222` / Text: `#ffffff`
- Font: **11px / weight 700**（サイト唯一の 700）
- Border Radius: `2px`

### Badges / Chips

すべて **TBUDGoStd-ExBold 16px / weight 800 / padding `4px 16px 4px 20px` / radius `0px`**。塗り色だけで状態を分ける。

| ラベル | 背景 | 文字 |
|--------|------|------|
| `開催中` | **`#d61d00`** | `#ffffff` |
| `企画展` / `その他の展示` | `#222222` | `#ffffff` |
| `予告` | `#666666` | `#ffffff` |

**日付タブ（`前日` / `今日` / `明日`）**
- 選択: `#666666` / 非選択: `#222222`、いずれも 14px / weight 700 / radius `6px`

### Cards

- Background: `#ffffff`
- Border: **`1px solid #F0F0F0`**（地色と同じ色の枠）
- Border Radius: **`12px`**（大カード）／ **`10px`**（ニュース行）／ **`15px`**（展示トピックス）
- Padding: `26px 16px 43px`（**下が厚い**）／ `24px 64px 24px 30px`（右にアイコン分のアキ）
- Shadow: **なし**

### Inputs

- Font: 20px / TBUDGoStd-Regular / weight 400
- Line Height: 40px（2.00）
- Text: `#000000`

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 4px | バッジ内側の上下 |
| S | 8px | ボタン内側の左右 |
| M | **18px / 20px** | **カードグリッドの gap（最多 27 件 / 44 件）** |
| L | 24px / 30px / 34px | セクション内の間隔 |
| XL | 40px / 46px | セクション間 |
| XXL | 80px | 大区画の間隔 |

### Container

| 幅 | 実測 | 用途 |
|----|------|------|
| **1440px** | 7 要素 | **最大幅** |
| 1290px / 1320px / 1280px | 各1 | セクション内側 |
| 1160px | 2 | 本文幅 |
| 920px | 4 | 記事カラム |
| **560px** | **6 要素** | カード・パネル |

### Grid

- トップは「ヒーロー（左）＋ 開館情報・イベントパネル（右）」の非対称2カラム
- カードは gap 18px / 20px の3〜4カラム

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **全要素。`box-shadow` は実測 0 件** |

> **影を1つも使わないサイト。** 階層は (a) 地色 `#F0F0F0` と面 `#ffffff` の差、(b) `1px solid #F0F0F0` の枠、(c) `border-radius` の大きさ（4 / 6 / 10 / 12 / 15 / 20 / 1440px）で表す。

---

## 7. Do's and Don'ts

### Do（推奨）

- **和文は TBUD ゴシック（UD 書体）を使う。** 用途ごとに Regular / Bold / ExBold を**書体名ごと差し替える**
- **書体名とウェイトを対で変数化する**（`--font-sans-jp-b` と `--font-sans-jp-b-weight: 600`）
- **`font-feature-settings: "palt"` をグローバルに当てる**
- **`letter-spacing: normal` を守る**（例外は縦組みの UD タイポス見出しのみ）
- 本文は **17px / line-height 34px（2.00）**、リード文は **20px / 50px（2.50）**
- 本文色は **`#222222`**、地色は **`#F0F0F0`**、面は `#ffffff`
- ブランド赤 `#d61d00` には **高コントラスト用の `#AD133F` を対で用意する**
- `html { font-size: 10px }` を前提に `rem` を読む（1.7rem = 17px）

### Don't（禁止）

- **`letter-spacing` を本文・見出しに足さない**（`palt` と二重にかかる）
- **`font-weight` だけで太字にしない。** 書体名を Bold / ExBold に切り替える
- **`box-shadow` を足さない**（実サイトは 0 件）
- **Noto Sans JP / Barlow / Zen Maru Gothic を使わない。** `@font-face` はあるが全て `unloaded`
- **`MFW-UDTypos512Std-Regular` を使わない**（宣言のみ・`unloaded`）
- 本文色に `#000000` を使わない（実サイトは `#222222`）
- 本文の行間を 1.5 以下にしない（実サイトは 2.00）
- ページの地色を `#ffffff` と決めつけない（**見えている地色は `#F0F0F0`**）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|------|-------|------|
| **Mobile / Tablet** | **≤ 1023px** | **`screen and (max-width: 1023px)` が 979 件（最多）** |
| **Desktop** | **≥ 1024px** | `screen and (min-width: 1024px)` 124 件 |
| Mobile | ≤ 767px | 40 件 |
| Wide 調整 | ≤ 1560px / 1440px / 1400px / 1280px | 25 / 14 / 7 / 22 件 |
| Small | ≤ 550px | 2 件 |

- **1024px が主分岐**。それ未満は「モバイル用の別レイアウト」として 979 件のルールが当たる

### タッチターゲット

- ヘッダーボタン（14px / padding 0）と `大` `小`（11px）は 44px を下回る。**モバイルでは高さを確保すること**
- 赤 CTA（18px / padding 4px 32px）は満たす

### フォントサイズの調整

- 本文 17px、ナビ 18px はブレークポイントをまたいで固定
- **`文字サイズ 大 / 小` のトグルがあるため、`rem` ベースで組んで拡大に追従できるようにする**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Red:        #d61d00   (--main-color)
Brand Red (HC):   #AD133F   (--main-color-hc / 反転表示用)
Text Color:       #222222   (--text-color)
Link Color:       #0034D1   (--main-link-color)
Background:       #F0F0F0   (--main-bg-color)
Surface:          #ffffff   (--white-color)
Surface Dark:     #222222
Surface Gray:     #666666

Font (本文):  "MFW-TBUDGoStd-Regular", "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", sans-serif  / weight 400
Font (見出し): "MFW-TBUDGoStd-Bold" / weight 600
Font (大見出し): "MFW-TBUDGoStd-ExBold" / weight 800
Font (展示名): "MFW-UDTypos510Std-Regular"

html font-size: 10px   (1rem = 10px)
Body Size:      17px
Line Height:    2.00 (34px) / リード 2.50 (50px) / 見出し 1.00〜1.60
Letter Spacing: normal （縦組み見出しのみ 0.2em）
font-feature-settings: "palt"   ← 全要素
Border Radius:  4px (ボタン) / 10-12px (カード) / 1440px (pill) / 0px (バッジ)
Box Shadow:     なし
```

### プロンプト例

```
国立科学博物館のデザインシステムに従って、展示一覧ページを作成してください。
- html { font-size: 10px }、body は "MFW-TBUDGoStd-Regular" / 17px / line-height 34px / color #222222
- 全要素に font-feature-settings: "palt" を当て、letter-spacing は normal のままにする
- 見出しは "MFW-TBUDGoStd-ExBold" / 40px / weight 800 / line-height 64px
- カード見出しは "MFW-TBUDGoStd-Bold" / 22px / weight 600 / line-height 44px
- ページの地色は #F0F0F0、カードは #ffffff / 1px solid #F0F0F0 / border-radius 12px / 影なし
- 状態バッジは 16px / ExBold / weight 800 / radius 0px、開催中=#d61d00、企画展=#222222、予告=#666666
- CTA は #d61d00 / #ffffff / 18px / weight 600 / border-radius 4px
- box-shadow は使わない
```
