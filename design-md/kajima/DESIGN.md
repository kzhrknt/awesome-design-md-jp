# DESIGN.md — 鹿島建設（KAJIMA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-21 / 対象: `https://www.kajima.co.jp/`, `/prof/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **字間を `em` の三段階（0.05 / 0.08 / 0.1）で自分で作る。** `palt` は 1 要素も使わない。書体は Noto Sans JP ＋ Roboto Condensed の和欧二層で、欧文の見出しだけコンデンス体に切り替える
- **密度**: 低め。写真を大きく使い、テキストはラベル的に短く置く。`line-height` は `body` で決めず、見出しは一律 1.40、本文は 1.50、ナビ・ラベルは 1.00
- **キーワード**: 0.05em、Roboto Condensed、角丸 4px、暖かい墨色、影ではなく 1px 枠

**このサイトの核心は4つある。**

1. **`letter-spacing` を全要素に `em` で当て、値は3段階しかない。** 実測はすべて px で返るが、サイズで割ると綺麗に揃う。
   - **0.05em（既定）**: 12px→0.6px / 13.33px→0.667px / **14px→0.7px（33 要素）** / **16px→0.8px（33 要素・body）** / **18px→0.9px（30 要素）** / 20px→1px / 22px→1.1px / 24px→1.2px
   - **0.08em（カード見出し）**: **18px→1.44px**
   - **0.1em（セクション大見出し・グローバルナビ）**: **16px→1.6px（9 要素）** / 24px→2.4px / **28px→2.8px** / **42px→4.2px**
   - **文字が大きいほど字間を広げる。** 唯一の例外は記事タイトル 31px→0.62px（0.02em）で、ここだけ詰める
2. **`font-feature-settings: "palt"` を 1 要素も使っていない**（実測 0 件）。**字送りは `letter-spacing` だけで作る**
3. **`body { line-height: normal }`。** 日本語サイトとしては珍しく、body で行間を決めない。**見出しは一律 1.40**（42px→58.8px / 28px→39.2px / 24px→33.6px / 22px→30.8px / 18px→25.2px）、**本文は 1.50**、ナビ・ラベルは **1.00**（実測 92 要素で最多）
4. **CSS Custom Properties が実質無い。** 実測 4 個のうち 2 個は Swiper 由来、残りは `--lock-scroll-spacing` と `--fw: 100vw` のみ。**色もフォントも変数化されていない**ので、値は直書きで写す

**枠線を `box-shadow` で描いている**（`rgb(158,163,166) 0 0 0 1px` が企業情報ページで 21 要素）。ぼかしのない `0 0 0 1px` は実質 1px の枠で、**影ではない**。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **鹿島レッド** | **`#e6002d`** | ヘッダーの `企業情報` 現在地マーカー。**可視は 1 要素だけ**で、面として大きくは使わない |
| **Recruit Gradient** | **`linear-gradient(90deg, #a4001d 0%, #ff626c 100%)`** | **可視 71 要素**。採用セクションのカード面・`採用 Recruting` ラベル。**このサイトで最も面積を取るブランド表現** |

> **赤は「面」ではなく「グラデーション」で出る。** 単色 `#e6002d` をベタ塗りで多用するとサイトの印象から外れる。

### Neutral（ニュートラル）

- **Text Primary** (`#363434`): 本文・見出し。**可視 78 要素（トップ）/ 83 要素（企業情報）**。**純黒ではなく暖かい墨色**
- **Text Secondary** (`#595757`): 日付・カテゴリ・補助テキスト（可視 23 要素）
- **Text Muted** (`#999999`): パンくずの現在地（可視 1 要素）
- **Text on Dark** (`#ffffff`): 写真・黒面の上（可視 57 要素）
- **Surface Dark** (`#1e1e1e`): 採用カードの下地（可視 71 要素）
- **Surface Darker** (`#3b3636`): 補助の暗面
- **Border / Shadow Line** (`#9ea3a6`): **`box-shadow: 0 0 0 1px` として引く枠**（企業情報ページで 21 要素）
- **Border (dark)** (`#595757`): 採用カードの枠（`1px solid`）
- **Surface Cool** (`#d8dce0`): `お探しの情報はありましたか？` のフィードバック帯（可視 72 要素）
- **Background** (`#f5f6f7`): **トップの地色**（`viewportTopBySample 12/12`）。下層ページは `#ffffff`
- **Divider** (`#cccccc`): 区切り線

### 外部由来（採用しない）

- **`#4b81e8`**: **クッキー同意バナー（CMP）の `同意する` ボタン専用**。書体も `Helvetica, Calibri, Arial` とサイト本体（Noto Sans JP）と違う。**ブランド色として扱わないこと**

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP 一択**（実測 145 要素 / 88 要素で圧倒的多数）。`@font-face` は `weight: 100 900` の可変フォントで `loaded` 済
- **明朝体は使わない**

### 3.2 欧文フォント

- **Roboto Condensed**（`weight: 100 900` 可変・`loaded`）: **英字のセクション見出し専用**。`NEWS` `PROJECTS` `TECHNOLOGY`（4 要素）、および和欧混植の `OUR BUSINESS` `TOPICS` `ABOUT COMPANY`（6 要素）
- **Roboto**（`weight: 100 900` 可変・`loaded`）: コピーライト・再生時間などの数字（1〜2 要素）
- **Oswald** は `@font-face` 宣言だけで **`unloaded`**。使わない

### 3.3 font-family 指定

```css
/* 本文・UI（既定） */
font-family: "Noto Sans JP", sans-serif;

/* 英字のセクション見出し */
font-family: "Roboto Condensed", sans-serif;

/* 和欧混植の見出し（和文は Noto Sans JP に落ちる） */
font-family: "Roboto Condensed", "Noto Sans JP", sans-serif;

/* 数字・コピーライト */
font-family: Roboto, sans-serif;
```

**フォールバックの考え方**:
- **和文優先だが、チェーンは短い。** OS フォントを並べず `sans-serif` で受ける（Web フォント前提の割り切り）
- **欧文の見出しだけ Roboto Condensed を先頭に置く。** 和文が混ざる見出しでは `"Roboto Condensed", "Noto Sans JP"` の順にして、**英字はコンデンス・和文は Noto** という二層にする

### 3.4 文字サイズ・ウェイト階層

`html { font-size: 16px }`（標準）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Section Display** | Noto Sans JP | **42px** | **700** | **58.8px (1.40)** | **4.2px = 0.1em** | `ニュース NEWS` `鹿島の事業` `企業情報` |
| **Page Heading** | Noto Sans JP | **28px** | 700 | 39.2px (1.40) | **2.8px = 0.1em** | `鹿島について` |
| Heading 2 | Noto Sans JP | 24px | 700 | 33.6px (1.40) | **2.4px = 0.1em** | `サステナビリティ` |
| Heading 2 (dense) | Noto Sans JP | 24px | 700 | 38.4px (1.60) | 1.2px = 0.05em | `どのような「情報」をお探しですか？` |
| Hero Copy | Noto Sans JP | **32px** | 700 | normal | 1.6px = 0.05em | `KAJIMAはつくる。` |
| Article Title | Noto Sans JP | **31px** | 700 | 31px (1.00) | **0.62px = 0.02em** | **ここだけ字間を詰める** |
| Heading 3 | Noto Sans JP | 22px | 700 | 30.8px (1.40) | 1.1px = 0.05em | `採用情報TOP` |
| **Card Heading** | Noto Sans JP | **18px** | **500** | **25.2px (1.40)** | **1.44px = 0.08em** | ニュース記事タイトル |
| List / Button | Noto Sans JP | 18px | 500〜700 | 18px (1.00) / 25.2px (1.40) | 0.9px = 0.05em | `経営理念` `すべて` |
| **Body / Nav** | Noto Sans JP | **16px** | **400** | **normal** | **0.8px = 0.05em** | body の既定 |
| Body (block) | Noto Sans JP | 16px | 500 | 24px (1.50) | 0.8px = 0.05em | 段落 |
| **Global Nav** | Noto Sans JP | 16px | 500 | 16px (1.00) | **1.6px = 0.1em** | `企業情報` `IR情報` `事業` |
| Meta | Noto Sans JP | 16px | 500 | 16px (1.00) | 0.8px = 0.05em | 日付（`#595757`） |
| Utility | Noto Sans JP | 14px | 500 | 14px (1.00) | 0.7px = 0.05em | `FAQ` `お問い合わせ` |
| Small | Noto Sans JP | 12px | 400〜500 | — | 0.6px = 0.05em | フッターの規約リンク |

**サイズ分布（トップ / 可視 94 要素）**: 16px (40) / 14px (33) / 18px (24) / 12px (12) / 20px (10) / 42px (9)

**ウェイト分布**: **500 (99)** / 700 (57) / 400 (3)
→ **既定は 500。** `body` は 400 だが、実際に文字が置かれる要素のほとんどが 500 に上書きされる

### 3.5 行間・字間

- **`body { line-height: normal }`。** 行間を body で決めない
- **見出しは一律 1.40**（42 / 28 / 24 / 22 / 18px すべて）
- **本文ブロックは 1.50**（16px → 24px）
- **ナビ・ラベル・日付は 1.00**（`line-height` = `font-size`。実測 92 要素で最多）
- **字間は `em` の三段階**:

```css
/* 既定 — body に1回書いて継承させる */
body { letter-spacing: 0.05em; }

/* カード見出し */
.card__title { letter-spacing: 0.08em; }

/* セクション大見出し・グローバルナビ */
.section__heading,
.gnav__item { letter-spacing: 0.1em; }

/* 記事タイトルだけ詰める */
.article__title { letter-spacing: 0.02em; }
```

**ガイドライン**:
- **`em` で書いて継承させる。** 子要素で px に置き換えない（実測は px で返るが、宣言は em）
- **`palt` を足さない。** このサイトは `letter-spacing` だけで字送りを作る
- 長い日本語本文を置く場面では `line-height: 1.5` を明示する（body は `normal` のまま）

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- **見出しは改行位置を手で決めている**（`鹿島建設がわかる、未来が見えるはやわかりKAJIMA` のような長い見出しを 1.40 の行間で2行に流す）

### 3.7 OpenType 機能

```css
/* 使わない */
```

- **`font-feature-settings` は実測 0 件。** `palt` も `kern` も `tnum` も当てていない
- **約物を詰めたい場合は `letter-spacing` を 0.02em 側へ動かす**のがこのサイトの流儀（記事タイトル 31px の例）

### 3.8 縦書き

該当なし（実測 0 要素）。

---

## 4. Component Stylings

### Buttons

**Primary（墨・角なし）**
- Background: **`#363434`** / Text: `#ffffff`
- Border: **`1px solid #363434`**
- Font: **16px / weight 500 / letter-spacing 0.8px（0.05em）**
- Padding: `0px 24px`（`すべてのお知らせを見る`）／ `0px 28px`（`サステナビリティTOPへ`）
- Border Radius: **`0px`**

**Card（採用・暗面）**
- Background: **`#1e1e1e`** / Text: `#ffffff`
- Border: **`1px solid #595757`**
- Padding: **`32px`**
- Border Radius: **`4px`**

**Badge（採用ラベル）**
- Background: **`linear-gradient(90deg, #a4001d 0%, #ff626c 100%)`** / Text: `#ffffff`
- Font: 14px / weight 500 / letter-spacing 0.7px
- Padding: `4px 12px` / Border Radius: `4px`

**Tab（`すべて` / `プレスリリース` / `更新情報`）**
- 選択: `#363434` / 18px / **weight 700** / letter-spacing 0.9px
- 非選択: `#595757` / 16px / weight 500 / letter-spacing 0.8px
- Padding: `16px 8px` / Border Radius: `4px` / 背景なし

**Accordion（`経営理念` など）**
- Background: `#ffffff` / Text: `#363434`
- Font: 18px / weight 500 / letter-spacing 0.9px
- Padding: `0px 24px 0px 28px`
- **枠は `box-shadow: 0 0 0 1px #9ea3a6`**（21 要素）

### Cards

- Background: `#ffffff`
- Border: **`1px solid #9ea3a6`**（実装は `box-shadow: 0 0 0 1px`）
- Border Radius: **`4px`**（実測 76 要素で最多。**このサイトの既定角丸**）
- Shadow: `rgba(0,0,0,0.2) 8px 4px 0 0`（**ぼかし 0 のオフセット影**を現在地マーカーに1件だけ）

### Inputs

- Font: 16px / weight 500 / letter-spacing 0.8px
- 検索欄は 18px / weight 500 / **letter-spacing normal**

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 8px | インライン要素の間 |
| S | **12px** | **カードグリッドの gap（実測 35 件で最多）** |
| M | 16px / 20px | リスト間 |
| L | **24px 32px** / 23px | **カードの row/column gap（7 件）** |
| XL | **40px** | セクション内（10 件） |
| XXL | 47px | 大区画 |

### Container

| 幅 | 実測 | 用途 |
|----|------|------|
| **1440px** | **12 要素（最多）** | **標準コンテナ** |
| 1680px | 3 | 広いセクション |
| 1730px / 1880px | 各1〜2 | ヒーロー・全幅 |
| 1320px / 1100px | 各1 | 本文 |
| 520px | 2 | サイドパネル |

- **`--fw: 100vw`** で全幅ブロックを作る

### Grid

- トップは「全幅ヒーロー（2枚の写真を左右に分割）→ カードグリッド」
- カードは gap 12px の等幅グリッド、大きめのセクションは `24px 32px`

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定** |
| 1 | **`0 0 0 1px #9ea3a6`** | **枠線の代用（21 要素）。ぼかし 0＝実質 1px border** |
| 1' | `0 0 0 1px #595757` | 暗面の枠 |
| 2 | `rgba(0,0,0,0.2) 8px 4px 0 0` | 現在地マーカー（**ぼかし 0 のズレ影**。1 要素） |
| 3 | `rgba(0,0,0,0.25) 0 8px 8px 0` | フローティング（1 要素） |

> **ぼかしのある影はほぼ使わない。** 階層は枠線と地色（`#f5f6f7` / `#ffffff`）で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`letter-spacing` は `em` で三段階**：既定 **0.05em**、カード見出し **0.08em**、セクション大見出しとグローバルナビ **0.1em**
- **body に `letter-spacing: 0.05em` を1回書いて継承させる**
- **見出しの `line-height` は一律 1.40**、本文ブロックは 1.50、ナビ・ラベルは 1.00
- 和文は **Noto Sans JP**、英字の見出しだけ **Roboto Condensed**
- 本文色は **`#363434`**（暖かい墨色）、補助は `#595757`
- 角丸は **4px** に統一。塗りボタンだけ **0px**
- 枠線は `#9ea3a6` を **`box-shadow: 0 0 0 1px`** で引く
- 赤を使うときは **グラデーション `linear-gradient(90deg, #a4001d, #ff626c)`**

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 件）
- **`letter-spacing` を px 固定で書かない。** `em` で書き、サイズに比例させる
- **本文色に `#000000` を使わない**（実サイトは `#363434`）
- **`body { line-height: 1.7 }` のような一括指定をしない。** 実サイトは `normal` で、ブロックごとに当てる
- **`#e6002d` をベタ塗りで多用しない**（実サイトは可視 1 要素）
- **`#4b81e8` を採用しない**（クッキーバナー＝外部 CMP の色。書体も `Helvetica, Calibri, Arial` で本体と別系統）
- **Oswald を前提に組まない**（宣言のみ・`unloaded`）
- ぼかしの強い `box-shadow` でカードを浮かせない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測 |
|------|-------|------|
| **Desktop** | **≥ 768px** | **`screen and (min-width: 768px)` が 377 件（圧倒的最多）** |
| **Mobile** | **≤ 767px** | `screen and (max-width: 767px)` 50 件 |
| Wide | ≥ 1440px | 18 件 |
| Wide (mid) | ≥ 1024px / ≥ 1153px | 11 件 / 3 件 |
| Ultra Wide | ≥ 1641px | 1 件 |
| Landscape | `≥768px and (orientation: landscape)` | 13 件 |

- **モバイルファースト。** 既定をモバイルで書き、`min-width: 768px` で PC を上書きする（`min-width` 系が `max-width` 系の 7 倍）

### タッチターゲット

- ユーティリティリンク（14px / padding `0px 8px`）は 44px を下回る。**モバイルでは高さを確保すること**
- タブ（padding `16px 8px`）・アコーディオン（18px）は満たす

### フォントサイズの調整

- 大見出し 42px はモバイルで縮む（`min-width: 768px` 側の値）
- **`letter-spacing` を em で書いてあるので、サイズが変われば字間も自動で追従する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Red:        #e6002d        （面には使わない。可視 1 要素）
Recruit Gradient: linear-gradient(90deg, #a4001d 0%, #ff626c 100%)
Text Primary:     #363434
Text Secondary:   #595757
Text Muted:       #999999
Surface Dark:     #1e1e1e
Border:           #9ea3a6   （box-shadow: 0 0 0 1px で引く）
Background:       #f5f6f7 （トップ） / #ffffff （下層）
Surface Cool:     #d8dce0

Font (本文):   "Noto Sans JP", sans-serif
Font (英見出し): "Roboto Condensed", sans-serif
Font (和欧混植): "Roboto Condensed", "Noto Sans JP", sans-serif

Body Size:      16px / weight 500（body 自体は 400）
Line Height:    normal（body） / 1.40（見出し） / 1.50（本文ブロック） / 1.00（ナビ・ラベル）
Letter Spacing: 0.05em（既定） / 0.08em（カード見出し） / 0.1em（大見出し・ナビ） / 0.02em（記事タイトル）
font-feature-settings: なし
Border Radius:  4px（既定） / 0px（塗りボタン）
```

### プロンプト例

```
鹿島建設のデザインシステムに従って、企業情報の一覧ページを作成してください。
- body は "Noto Sans JP" / 16px / letter-spacing 0.05em / line-height normal / color #363434
- セクション見出しは 42px / weight 700 / line-height 1.40 / letter-spacing 0.1em
- カード見出しは 18px / weight 500 / line-height 1.40 / letter-spacing 0.08em
- グローバルナビは 16px / weight 500 / line-height 1.00 / letter-spacing 0.1em
- 英字見出し（NEWS / PROJECTS）だけ "Roboto Condensed" にする
- font-feature-settings は一切書かない
- カードは border-radius 4px、枠は box-shadow: 0 0 0 1px #9ea3a6 で引く
- 塗りボタンは #363434 / #ffffff / 16px / weight 500 / border-radius 0px / padding 0 24px
- 地色は #f5f6f7、面は #ffffff
```
