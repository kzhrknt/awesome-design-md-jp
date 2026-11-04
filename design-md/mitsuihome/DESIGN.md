# DESIGN.md — 三井ホーム（MITSUI HOME）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-04 / 対象: `https://www.mitsuihome.co.jp/`, `/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **筑紫ゴシック1書体・角丸なし・影なし。** 面の色は生成りのベージュ（`#E8E6DF` / `#F3F2EF`）で、罫線と余白で組む。住宅メーカーの重さを書体の品で受けている
- **密度**: 中。ナビゲーションは 10〜14px と小さく詰め、本文は 16px / `line-height: 1.75` とゆったり組む
- **キーワード**: 筑紫ゴシック Pro、FontPlus、生成りベージュ、角丸ゼロ、影ゼロ

**このサイトの核心は4つある。**

1. **太さを `font-weight` ではなく `font-family` で切り替える。** 和文は FontPlus 配信の **`TsukuGoPro-M`（実測 150 / 127 要素）と `TsukuGoPro-B`（62 / 55 要素）の2ファミリー**で、どちらも `@font-face` 側が `font-weight: bold` を宣言している。**隠し div の幅実測で `font-weight` を 100〜900 まで振っても 633.03px から 1px も動かない**（合成太字も起きない）。太字にしたいなら `font-family` ごと `TsukuGoPro-B` に差し替える
2. **`body` に `font-family: TsukuGoPro-M !important` を当てている。** `html { font-size: 62.5% }`（= 10px）は 1440 / 1200 / 1024 / 834 / 769 / 768 / 767 / 390 / 375px の **9 幅すべてで完全固定**。レスポンシブでルートは一切動かない
3. **`body` の宣言が2つ競合していて、ページで基準が変わる。** トップは `font-size: 16px; line-height: 1.75; color: #000000`、下層（`/company/`）は `font-size: 1rem`（= **10px**）`; line-height: 1.6; color: #333333` が勝つ。**行間比の最頻値もトップ 1.75（91 要素）→ 下層 1.60（115 要素）と入れ替わる**
4. **CSS Custom Properties は実質 0 個。** トップの 2 個は Swiper の既定値、下層は 0 個。色もサイズも CSS に直書きされている

**`font-feature-settings: "palt"` は実測 5 要素だけ**（下層は 0 件）。しかも宣言の大半は接客ツール **KARTE のポップアップ（`.l-kartepopup-*`）**で、サイト本体は `.boxCommon02 .inner p` の 1 コンポーネントのみ。**このサイトは約物を詰めない設計**として扱う。

> **`TsukuGoPr5-M` は死んでいる。** CSS は KARTE のポップアップに `font-family: TsukuGoPr5-M !important`（**受け皿を書かない1語スタック**）を当てており、下層で 7 要素に解決されているが、`document.fonts` のステータスは **`error`**。隠し div の幅実測でも **1125px = `sans-serif` と同値**で、1 文字も当たっていない。**新規実装でこの名前を使わないこと。** ついでに同じ CSS のクラス名は `subtitile` / `titile` と2箇所ともタイプミスしている

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Mitsui Red（見出しリンク）** | **`#A61918`** | **可視 17 / 12 要素**。`戸建住宅トップ` 等のメガメニュー見出しリンク、ページャの現在位置 |
| **News Red（カテゴリ）** | **`#A10D29`** | 可視 7 要素。ニュースリリースの日付・カテゴリラベル |
| **MOCX Green** | **`#378A42`** | 可視 6 要素。トップの「木造建築による炭素固定量」のカウンタ数字と、その面 |
| Wood Brown | `#663E2E` | 炭素固定量ブロックの面（1 要素） |

> **赤が2つあるのは実装の実態。** `#A61918`（R166 G25 B24）と `#A10D29`（R161 G13 B41）は RGB で 5 / 12 / 17 しか違わず、スクリーンショットでは見分けがつかない。**それでも両方が実装されていて、使い分けは「ナビの見出しリンク」対「ニュースのカテゴリ」**。新規実装では `#A61918` に寄せてよいが、既存ページと並べるときは 2 色あることを前提にする

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): トップの本文・見出し。**可視 184 要素**。**トップは純黒を使う**
- **Text Primary（下層）** (`#333333`): 下層の本文。**可視 30 要素**。`body` の宣言違いでページをまたぐと色が変わる
- **Text on Dark** (`#FFFFFF`): 黒面・写真上のテキスト（可視 26 / 6 要素）
- **Text Muted** (`#646B76`): ニュースの日付（可視 9 要素）
- **Surface Beige** (`#E8E6DF`): セクションの面。**可視 10 要素**で最も多い面色
- **Surface Beige 2** (`#E8E5DE`): フッター周りの面（可視 3 要素。`#E8E6DF` とほぼ同値だが別実装）
- **Surface Light** (`#F3F2EF`): ヘッダー追従メニューのカード面（可視 5 要素）
- **Surface Gray** (`#EFEFEF`): 最も淡い面
- **Divider** (`#BEBEBE`): 区切り罫（可視 6 要素）
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (3/4)`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（既定）**: **筑紫ゴシック Pro M**（`TsukuGoPro-M`）。FontPlus（`webfont.fontplus.jp`）配信。`body` に `!important` で当たっている
- **ゴシック体（太）**: **筑紫ゴシック Pro B**（`TsukuGoPro-B`）。**M とは別ファミリー**として宣言され、見出し・ナビの第1階層に使う
- **明朝体**: **`FOT-TsukuMin Pro`**（筑紫明朝）が可視 **1 要素**だけ。災害のお見舞い文にのみ使われている。**明朝はこの用途以外に広げない**
- **使わないこと**: `TsukuGoPr5-M` は `@font-face` のステータスが `error` で、幅実測でも `sans-serif` と同値。**宣言しても描画されない**

### 3.2 欧文フォント

- **Poppins 700**（Google Fonts、`wght@700` の **1 本だけ**）: 可視 12 要素。炭素固定量カウンタの数字（49px）専用
- **Noto Sans JP 400 / 700**（Google Fonts）: 可視 11 要素。カウンタの注記と単位
- **FF Kievit**（`Kievit, sans-serif`）: 下層で `loaded`・可視 4 要素。`NEWS RELEASE` `IR INFORMATION` `TOPICS` の欧文小見出しだけ
- **宣言だけで使われないもの**: `FFKievitWebBold` / `FFKievitWebMedium` / `FFKievitWebLight` / `Asap` / `Roboto Condensed` 300・400 は全ページで `unloaded`。**フォールバック前提で組むこと**

> **Poppins の `wght@` は 700 の 1 本しかない。** カウンタに `font-weight: 400` を当てても **700 で描画される**。400 の Poppins は存在しないので指定しても意味がない

### 3.3 font-family 指定

```css
/* 本文・UI（既定） */
font-family: TsukuGoPro-M;          /* 実サイトは body に !important で当てている */

/* 見出し・ナビ第1階層（太字） */
font-family: TsukuGoPro-B;          /* font-weight では太くならない。ファミリーごと差し替える */

/* 欧文の数字（カウンタ） */
font-family: Poppins, sans-serif;

/* 欧文の小見出し */
font-family: Kievit, sans-serif;

/* 明朝（お見舞い文のみ） */
font-family: "FOT-TsukuMin Pro", serif;
```

**フォールバックの考え方**:
- **実サイトは和文に受け皿を1つも書いていない**（`font-family: TsukuGoPro-M` の1語）。FontPlus が落ちるとブラウザ既定に落ちる。**正しくは `TsukuGoPro-M, "ヒラギノ角ゴ ProN", "Yu Gothic Medium", sans-serif` のように受け皿を続ける**
- 欧文は `Poppins, sans-serif` / `Kievit, sans-serif` と受け皿がある。**和文だけ無い**のが実態
- **`TsukuGoPr5-M` を書かない**（死んだファミリー名）

### 3.4 文字サイズ・ウェイト階層

**ウェイトは「400 か 700 か」ではなく「M か B か」で決める。** CSS 上は 400 が 202 / 185 要素、700 が 37 / 12 要素だが、**どちらを指定しても描画される太さは `font-family` だけで決まる**。

| Role | Font | Size | Weight（CSS） | Line Height | Letter Spacing | 備考 |
|------|------|------|--------------|-------------|----------------|------|
| **Counter Number** | **Poppins** | **49px** | 700 | 1.37 (67px) | normal | 炭素固定量の数字。欧文専用 |
| Mega Menu Heading | **TsukuGoPro-B** | 18px | 400 | 1.40 | **1.08px (0.06em)** | `戸建住宅トップ` 等。色 `#A61918` |
| Section Title | TsukuGoPro-B | 20px | 800 | — | 1px (0.05em) | `トピックス` |
| **Body** | **TsukuGoPro-M** | **16px** | 400 | **1.75** (28px) | **0.32px (0.02em)** | トップの本文 |
| Body（下層） | TsukuGoPro-M | 16px | 400 | **1.60** | 0.32px | 下層は `body` の宣言が違う |
| Link Label | TsukuGoPro-M | 15px | 400 | 1.40 | **0.9px (0.06em)** | `注文住宅｜三井ホームオーダー` |
| UI Label | TsukuGoPro-M | **14px** | 400 | 1.70 | 0.84px (0.06em) | **最多（69 / 62 要素）** |
| Nav Item | TsukuGoPro-M | 13px | 400 | 1.70 | 0.78px (0.06em) | グローバルナビ |
| Caption / Note | TsukuGoPro-M | 12px | 400 | 1.60 | — | 注記・日付（67 / 53 要素） |
| **Eyebrow（欧文）** | **Kievit** | **12px** | 400 | — | **1.8px (0.15em)** | `NEWS RELEASE` `IR INFORMATION` |
| Category Label | TsukuGoPro-B | 11px | 400 | 2.73 | 0.66px (0.06em) | `サステナビリティ` `企業情報` |
| Fixed Menu Card | TsukuGoPro-M | 10px | 400 | 1.10 | normal | ヘッダー追従カード |
| Condolence | FOT-TsukuMin Pro | 16px | 400 | 1.58 | — | お見舞い文（1 要素） |

### 3.5 行間・字間

- **行間はページで変わる**: トップ **1.75**（91 要素）、下層 **1.60**（115 要素）。これは `body` の宣言が2つ競合している結果で、**どちらか一方に揃えるなら 1.75 を採る**（トップの本文設計）
- 次点は **1.40**（32 要素・リンクラベル）、**1.70**（20 / 13 要素・ナビ）、**2.14**（17 要素・フッターリンク）
- **字間は `normal` が既定**（実測 186 / 156 要素）
- **字間を足す要素は、自分で `em` を持っている。** サイズに比例して px が変わるのが根拠:

| Size | 実測 px | 換算 |
|------|--------|------|
| 18px | 1.08px | **0.06em** |
| 15px | 0.9px | **0.06em** |
| 14px | 0.84px | **0.06em** |
| 13px | 0.78px | **0.06em** |
| 11px | 0.66px | **0.06em** |
| 16px | 0.32px | 0.02em |
| 12px（欧文） | 1.8px | **0.15em** |

**ガイドライン**:
- **和文に足す字間は `0.06em` で統一する。** `body` から px で継承させず、**その要素に `em` で書く**（実サイトがそうしている）
- **欧文の小見出しだけ `0.15em`** と大きく空ける。和文に 0.15em を使わない
- 本文（16px）は `0.02em` とほぼ詰めない

### 3.6 禁則処理・改行ルール

```css
word-break: normal;        /* body の実測値 */
overflow-wrap: break-word;
line-break: strict;
```

- `word-break: break-all` は使わない（実サイトは `normal`）
- `word-break: auto-phrase` の宣言は無い

### 3.7 OpenType 機能

**実質的に使っていない。** `font-feature-settings: "palt"` の実測は**トップ 5 要素 / 下層 0 要素**。

- CSS 上の宣言は `.boxCommon02 .inner p`（本文の 1 コンポーネント）と、**接客ツール KARTE のポップアップ（`.l-kartepopup-textarea-titile` 等）**に限られる
- **KARTE 由来の宣言を「サイトの設計」と読まないこと。** サイト本体で `palt` が当たっているのは実質 1 コンポーネントだけ
- **新規実装では `palt` を足さない。** 筑紫ゴシック Pro の素の字送りで組むのがこのサイトの見え方

### 3.8 縦書き

該当なし（`writing-mode: vertical-*` の実測 0 要素）。

---

## 4. Component Stylings

**`border-radius` はほぼ `0px`。** トップに 4px（カウンタ数字の桁）、900px（カウンタ見出しのピル）、50%（アイコン）が各 1〜6 要素あるだけで、**下層は 0 種**。

**`box-shadow` は両ページとも 0 種。** 影で階層を作らないサイト。

### Buttons

**Primary（黒面）**
- Background: **`#000000`**
- Text: `#FFFFFF`
- Border: なし
- Padding: `18px 0`
- Border Radius: **`0px`**
- Font: **TsukuGoPro-M** / 13px / weight 400 / line-height 1.70
- 例: フッターの `PAGETOP`

**Fixed Menu Card（ヘッダー追従）**
- Background: **`#F3F2EF`**
- Text: `#000000`（下層は `#333333`）
- Border Radius: `0px`
- Padding: `11px 0 0 11px` / 2 行のときは `14px 0 0 11px`
- Font: TsukuGoPro-M / 10px / weight 400

**Pager（現在位置）**
- 現在位置: Background `#A61918` / Text `#000000`
- 非選択: Background `#D6D6D6`
- Border Radius: `0px` / Font 10px

### Badges / Chips

**Counter Pill（炭素固定量）**
- Background: **`#378A42`** / Text: `#FFFFFF`
- Border Radius: **`900px`**（このサイトで唯一のピル）
- Font: TsukuGoPro-M

**News Category**
- Text: **`#A10D29`** / 面なし
- Font: TsukuGoPro-M / 12px

### Cards

- Background: `#FFFFFF` または `#E8E6DF`
- Border: 罫線（`#BEBEBE`）
- Border Radius: **`0px`**
- Shadow: **なし**

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| S | 11px | 追従カード内側 |
| M | 18px | ボタン上下 |
| L | 20px | グリッドの gap |
| XL | 6% | 横方向の gap（割合指定） |

### Container

- **Max Width: 1140px**（実測 7 要素で最多。両ページ共通）
- 1180px（5 要素）/ 1280px（3 要素）/ 1182px（2 要素）も併用。**コンテナ幅は統一されていない**
- 本文ブロック: 840px / 1000px / 1130px / 1200px

### Grid

- トップはメガメニューを含む多段。カードは 4 カラム（205px 幅のサムネイル）
- 下層は 1140px の 1 カラム

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **両ページとも実測 0 種。例外なし** |

> **影を一切使わないサイト。** 面の区別は `#E8E6DF` / `#F3F2EF` / `#EFEFEF` のベージュ3段、境界は `#BEBEBE` の罫線で行う。**カードやボタンに `box-shadow` を足すとこのサイトではなくなる**

---

## 7. Do's and Don'ts

### Do（推奨）

- **太字は `font-family: TsukuGoPro-B` に差し替える。** `font-weight` では 1px も変わらない（幅実測で 100〜900 すべて 633.03px）
- **`html { font-size: 62.5% }`（10px）を固定する。** 9 幅で一度も動かない
- **本文は 16px / `line-height: 1.75`**。下層の 1.60 は `body` 宣言の競合による事故なので、新規実装では 1.75 に揃える
- **字間を足す要素には `em` で `0.06em` を書く**（`body` から px で継承させない）
- **欧文の小見出し（`NEWS RELEASE` 等）だけ `0.15em`** と空ける
- **`border-radius: 0` を既定にする**
- 面はベージュ3段（`#E8E6DF` / `#F3F2EF` / `#EFEFEF`）、罫線は `#BEBEBE`
- 和文スタックには受け皿を続ける（実サイトは1語だが、**正しくは `TsukuGoPro-M, "ヒラギノ角ゴ ProN", "Yu Gothic Medium", sans-serif`**）

### Don't（禁止）

- **`TsukuGoPr5-M` を指定しない**（`@font-face` のステータスが `error`、幅実測も `sans-serif` と同値）
- **`font-weight: 700` で太字を作ろうとしない**（筑紫ゴシック Pro M は 1 本きりで、合成太字も起きない）
- **`box-shadow` を足さない**（実測 0 種）
- **`border-radius` を 4px や 8px にしない**（カウンタの桁以外は 0px）
- **`font-feature-settings: "palt"` を足さない**（実測 5 要素、しかも大半は KARTE 由来）
- **Poppins に 400 を当てない**（読み込んでいるのは `wght@700` の 1 本だけ）
- **明朝（`FOT-TsukuMin Pro`）を見出しに広げない**（実サイトはお見舞い文の 1 要素のみ）
- CSS Custom Properties を前提にしない（自社トークンは 0 個）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 768px** | **`screen and (max-width: 768px)`。CSS 全文で 785 回と最多** |
| **Desktop** | **≥ 769px** | `screen and (min-width: 769px)`（326 回） |
| Narrow Desktop | 769–1120px | 入れ子の中間ブレークポイント |
| Wide Desktop | 1101–1440px | 入れ子の中間ブレークポイント |

### タッチターゲット

- `PAGETOP`（13px / padding `18px 0`）で高さ 58px — 44px を満たす
- **ヘッダー追従カードは 10px / padding 11px** と小さい。**モバイルでは高さを確保すること**

### フォントサイズの調整

- **`html` も `body` も 9 幅すべてで完全固定**（10px / 16px）。`rem` は全幅で同じ px に解決される
- 代わりに**コンポーネント単位で `vw` を使う**（例: `.boxCommon02 .inner p` のモバイル指定が `font-size: 3.41937vw`）。**ルートだけ測ると「完全固定のサイト」に見えるので注意**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Mitsui Red:   #A61918   （メガメニュー見出しリンク）
News Red:     #A10D29   （ニュースのカテゴリ）
MOCX Green:   #378A42
Text:         #000000   （下層は #333333）
Muted:        #646B76
Surface:      #E8E6DF / #F3F2EF / #EFEFEF
Divider:      #BEBEBE
Background:   #FFFFFF
Font (JP 本文): TsukuGoPro-M, "ヒラギノ角ゴ ProN", "Yu Gothic Medium", sans-serif
Font (JP 太字): TsukuGoPro-B, "ヒラギノ角ゴ ProN", "Yu Gothic Medium", sans-serif
Font (欧文数字): Poppins, sans-serif   ※wght@700 のみ
Font (欧文見出し): Kievit, sans-serif
Root:         html 10px（62.5%）固定 / body 16px
Line Height:  1.75（本文） / 1.70（ナビ） / 1.40（リンクラベル）
Letter Spacing: normal 既定、足すときは 0.06em（欧文見出しのみ 0.15em）
Border Radius: 0px
Box Shadow:   none
Container:    1140px
```

### プロンプト例

```
三井ホームのデザインシステムに従って、事業紹介ページを作成してください。
- 本文は font-family: TsukuGoPro-M / 16px / line-height 1.75 / letter-spacing 0.02em
- 太字は font-weight を上げず、font-family: TsukuGoPro-B に差し替える（M は 1 ウェイトしかなく font-weight が効かない）
- 和文スタックには "ヒラギノ角ゴ ProN", "Yu Gothic Medium", sans-serif を受け皿として続ける
- TsukuGoPr5-M は使わない（配信されていない）
- メガメニューの見出しリンクは TsukuGoPro-B / 18px / letter-spacing 0.06em / 色 #A61918
- 欧文の小見出し（NEWS RELEASE 等）は Kievit / 12px / letter-spacing 0.15em
- ナビは 13〜14px / letter-spacing 0.06em
- 面は #E8E6DF（セクション）と #F3F2EF（カード）、罫線は #BEBEBE
- border-radius はすべて 0px、box-shadow は一切使わない
- コンテナは max-width 1140px、ブレークポイントは 768/769px
- html の font-size は 62.5%（10px）で固定し、レスポンシブでルートを動かさない
- font-feature-settings: "palt" は使わない
```
