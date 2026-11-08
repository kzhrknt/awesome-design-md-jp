# DESIGN.md — 住友生命（Sumitomo Life）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-08 / 対象: `https://www.sumitomolife.co.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **和文を二重に詰める。** `font-feature-settings: "palt"` をサイズのユーティリティクラスに同梱して配り、**その上から負の `letter-spacing` を `em` で重ねる**。面は白ベースで、CTA は**オレンジ→赤のグラデーションのピル**（`border-radius: 900px`）。影は 1 種も使わない
- **密度**: 中〜高。トップの可視テキストは 157 要素。本文 16px・ナビ 14px・日付 12px の 3 段が全体の 8 割
- **キーワード**: palt＋負字間の二重詰め、グラデーションのピル、影ゼロ、可変フォント、768px の崖

**このサイトの核心は5つある。**

1. **`palt` の宣言位置が「タイポグラフィのサイズユーティリティ」。** `.t-xxsmall` / `.t-xsmall` / `.t-small` / `.t-base` / `.t-large` / `.t-xlarge` の 6 クラスと `.mod-button` / `.mod-button02` に `font-feature-settings: "palt"` が書いてある。**サイズを当てると詰めが自動で付いてくる**設計。実測 **116 要素**（トップ）/ 84 要素 / 75 要素（下層）
2. **その `palt` で詰めた上から、さらに負の字間を重ねている。** `-0.01em` / `-0.015em` / `-0.03em` の 3 段を各要素が `em` で宣言する。**詰めてから空け直す設計（阪急阪神不動産・MICIN）の逆で、詰めた上にさらに詰める**
3. **ただし大見出しだけは正の字間。** 36px のヒーロー見出し `住友生命は一人ひとりのウェルビーイングに貢献します` は **`+0.03em`（1.08px）**。詰める設計の中で、ここだけ広げている
4. **`html` には `font-size` の宣言が 1 つも無い**（UA 既定の 16px）。切り替わるのは `body` だけで、**768px → 767px で `1rem`（16px）→ `0.875rem`（14px）**
5. **CSS Custom Properties は 4 個しか無く、しかも全部 `--embed-*`**（`--embed-sub-background-color` など、埋め込みウィジェット用）。**自社の設計トークンは存在しない**

**書体は Noto Sans JP の可変フォント 1 本。** Google Fonts の URL が `wght@400..900` なので、**400〜900 のどの値も本当に出る**（丸められない）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **住友生命レッド（面）** | **`#e50012`** | 塗り面 7 要素。`Vitality` のバナー、`ニュースリリース` の見出し帯、フッターのコピーライト帯 |
| **リンクレッド（文字）** | **`#ff3502`** | **文字色 34 要素**。本文中のリンク、ニュースのタイトル |
| **CTA グラデーション** | **`linear-gradient(to right, #ff9d00 0, #ff9d00 50%, #e50012 100%)`** | **面 6 要素**。`ウェルビーイング` `ご契約者さまTOP` `スミセイダイレクトサービスログイン` などの主要ボタン |
| **文字グラデーション** | **`linear-gradient(90deg, #ff9d00 0, #e50012 60%)`** | **3 要素**。`background-clip: text` で**文字そのものに流す**（`ウェルビーイング` `for your well-being`） |

> **面の赤（`#e50012`）と文字の赤（`#ff3502`）は別物。** 前者は帯とバナー、後者は本文リンク。**どちらかに寄せない。**

> **グラデーションは 2 本あり、用途が違う。** 50% まで `#ff9d00` を平らに置いてから赤へ送る**ボタン用**と、60% で赤に着地する**文字用**。角度・停止位置をそのまま写す。

### Neutral（ニュートラル）

- **Text Primary** (`#1e1e1e`): 本文・見出し。**可視 95 要素（最多）**。純黒ではない
- **Text Muted** (`#666666`): ニュースの日付、カテゴリラベル（可視 24 要素）
- **Text Disabled** (`#999999`): 下層の日付（可視 4 要素）
- **Text on Brand** (`#ffffff`): グラデーションボタン・赤帯の上（可視 76 要素）
- **Surface** (`#f8f8f8`): カードの地（面 5〜11 要素）
- **Surface Alert** (`#fdeeee`): `重要なお知らせ` の淡い赤い面（面 2 要素）
- **Surface Accent** (`#fef8db`): `--embed-sub-background-color` の淡い黄（埋め込み用）
- **Border** (`#cccccc`): ピルボタンの枠線
- **Background** (`#ffffff`): ページ背景

> **`pageBackground.resolved` は信用しない。** トップは `rgb(217,217,217)`（根拠 `viewportTopBySample (9/12)`）、下層は `rgb(0,0,0)` を返すが、**どちらもメガメニューのオーバーレイを拾っている**。実際の地色は白。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Noto Sans JP**（Google Fonts・**可変フォント `wght@400..900`**）。可視 233 要素（トップ）/ 155 要素（下層）
- **明朝体**: 使用しない（2 ページとも可視 0 要素）

### 3.2 欧文フォント

- **Open Sans**（400 / 500 / 700）。可視 **5 要素**だけ。`for your well-being` と、ウェルビーイングストーリーの連番 `01` `05` `13`
- 日付や金額は Noto Sans JP の欧文グリフで組まれている

### 3.3 font-family 指定

```css
/* 和文・既定（可視 233 / 155 要素） */
font-family: "Noto Sans JP", sans-serif;

/* 欧文の飾り（可視 5 / 2 要素） */
font-family: "Open Sans", sans-serif;
```

```html
<!-- 実際の読み込み（1 本） -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400..900&family=Open+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

**フォールバックの考え方**:
- **和文スタックは 2 語だけ。** `"Noto Sans JP", sans-serif` で、OS ローカル書体を 1 つも挟まない。Web フォントが落ちたら即 generic に行く割り切り
- **フォント要求は 43 件、すべて `fonts.gstatic.com`。** 自社ホストからのフォント配信は無い
- `@font-face` の `Noto Sans JP` は **`weight: 400 900` の 1 本**（可変フォント）。`Open Sans` は 400 / 500 / 700 の 3 本

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Hero Copy** | Noto Sans JP | **36px** | 700 | **1.40**（50.4px） | **+0.03em**（1.08px） | `住友生命は一人ひとりのウェルビーイングに貢献します`。**ここだけ正の字間** |
| **Page Title（下層 h1）** | Noto Sans JP | **46px** | 700 | 1.40 | −0.015em | `住友生命について` |
| **Section Heading** | Noto Sans JP | **30px** | 500 / 700 | 1.20 | normal | `ご契約者さま` `保険をお考えのお客さま` |
| **Sub Heading** | Noto Sans JP | **28px** | 700 | 1.40 | −0.015em | `住友生命グループの紹介` `会社情報` |
| **Lead** | Noto Sans JP | **20px** | 700 | 1.40 | −0.015em（−0.3px） | `ニュースリリース` `お知らせ` |
| **Nav（グローバル）** | Noto Sans JP | **18px** | 600 | 1.40 | −0.015em（−0.27px） | `ご契約者さま` `法人のお客さま` |
| **Body** | Noto Sans JP | **16px** | 400 | **1.60**（25.6px） | normal / −0.01em | **既定**（可視 56 要素） |
| **Body Strong** | Noto Sans JP | 16px | 700 | 1.40 | **−0.015em**（−0.24px） | 見出し的な本文 |
| **Nav / Label** | Noto Sans JP | **14px** | 500 | 1.60 | normal | `ニュース` `お問合わせ`（可視 71 要素で最多） |
| **Button Label** | Noto Sans JP | 14px | 600 | 1.40 | **−0.03em**（−0.42px） | ピルボタンの中（12 要素） |
| **Caption / Date** | Noto Sans JP | **12px** | 400 | 1.40 | **−0.01em**（−0.12px） | 日付・注記（可視 66 要素） |
| **Legal** | Noto Sans JP | 10px | 800 | 1.60 | normal | コピーライト、`TOP` |
| **欧文の飾り** | Open Sans | 30 / 72px | 700 | 1.20 | — | `for your well-being` |

**ウェイトは 400 / 500 / 600 / 700 / 800 の 5 段。** 可変フォント（`wght@400..900`）なのでどれも実在する。

> **幅の実測でウェイトは判定できない。** 和文の文字列で `font-weight` を 100〜900 に振っても**9 段すべて 2037.00px** に揃う（CJK グリフは等幅）。**判定は `document.fonts` の `weight: "400 900"` と Google Fonts の URL の 2 つで行う。**

### 3.5 行間・字間

- **本文の行間**: **1.60**（`body { line-height: 25.6px }` = 16 × 1.6）。可視 127 要素で最多
- **見出し・ボタンの行間**: **1.40**（37 要素）
- **セクション見出しの行間**: **1.20**（61 要素）
- **字間**: `normal` が 142 要素、残りは**すべて負**

#### 字間は「各要素が `em` を宣言する」型

| 宣言 | 実測 px（サイズ別） | 用途 |
|------|--------------------|------|
| **`-0.01em`** | 12px → **−0.12px**（56 要素）／ 16px → −0.16px | 日付、注記、本文リンク |
| **`-0.015em`** | 12px → −0.18px ／ 14px → −0.21px ／ 16px → **−0.24px**（25 要素）／ 18px → −0.27px ／ 20px → −0.3px ／ 28px → −0.42px | 見出し、ナビ、強調 |
| **`-0.03em`** | 14px → **−0.42px**（12 要素） | ピルボタンのラベル |
| **`+0.03em`** | 36px → **+1.08px**（2 要素） | **ヒーロー見出しだけ** |

> **サイズが違うと px が変わる（12px→−0.12px、16px→−0.16px）ので、`body` からの px 継承ではなく各要素が `em` を持っている。** 再現するときも `em` で書く。

### 3.6 禁則処理・改行ルール

- `body { word-break: normal }`（9 幅すべて）。`break-all` も `auto-phrase` も使わない
- 見出しは `<br>` で手動改行している（`住友生命は一人ひとりの<br>ウェルビーイングに<br>貢献します`）

### 3.7 OpenType 機能

```css
/* 実測 116 要素（トップ）/ 84 / 75 要素 */
.t-xxsmall, .t-xsmall, .t-small, .t-base, .t-large, .t-xlarge { font-feature-settings: "palt"; }
.mod-button, .mod-button02 { font-feature-settings: "palt"; }
.mod-colorBox._sdContact .__btnList li .mod-serviceBtn { font-feature-settings: "palt"; }
.vas-ai-summary-toggle-container .vas-ai-summary-toggle { font-feature-settings: "palt"; }
```

- **`palt` は本当に効いている。** 同一ページ・同一書体で隠し div を作り、`「ウェルビーイング」に、貢献します。（株）` を 100px で測ると **`normal` 2037.00px → `"palt"` 1673.91px（−17.8%）**
- **宣言位置が `body` でも `*` でも `html` でもなく、サイズのユーティリティクラス。** 件数だけ見ると継承と区別がつかないので、CSS を読んで確かめること
- `tnum` / `halt` / `vpal` などは使っていない

### 3.8 縦書き

- 使用しない（2 ページとも `writing-mode: vertical-*` が 0 要素）

### 3.9 ルートと本文のブレークポイント

| 幅 | `html` | `body` | `body` の `line-height` | `p` の字間 |
|----|--------|--------|------------------------|-----------|
| 1940 / 1440 / 1200 / 1024 / 834 / **768**px | **16px** | **16px** | 25.6px | −0.16px |
| **767** / 390 / 375px | **16px** | **14px** | 22.4px | −0.14px |

```css
html { /* font-size の宣言なし。UA 既定の 16px */ }
body { font-size: 1rem; }                      /* ≥ 768px */
@media (max-width: 767px) { body { font-size: 0.875rem; } }
```

- **崖は 768 / 767px の 1 箇所だけ**で、16px → 14px（0.875 倍）。`vw` も `clamp()` も使っていない
- **`html` を触っていないので、ユーザーのブラウザ文字サイズ設定がそのまま効く。** `rem` は常に OS/ブラウザ基準
- 字間は `em` なので本文の縮小に自動で追従する（−0.16px → −0.14px）

---

## 4. Component Stylings

### Buttons

**Primary（グラデーションのピル）**
- Background: `linear-gradient(to right, #ff9d00 0, #ff9d00 50%, #e50012 100%)`
- Text: `#ffffff` / Font Size: 16px / Weight: 700 / Letter Spacing: **−0.24px（−0.015em）**
- Border Radius: **900px**（完全なピル。実測 16 要素）
- Shadow: **なし**

**Secondary（白地・枠線のピル）**
- Background: `#ffffff` / Text: `#1e1e1e` / Border: `1px solid #cccccc`
- Font Size: 14px / Weight: 700 / Letter Spacing: −0.21px（−0.015em）
- Border Radius: **900px**

**Tertiary（小さい枠線のピル）**
- Font Size: 12px / Weight: 700 / Letter Spacing: −0.18px
- Border: `1px solid #cccccc` / Border Radius: **21px**

**Text Link**
- Color: `#ff3502` / Font Size: 14px / Weight: 400 または 700 / 下線なし

### Cards

- Border Radius: **6px**（実測 22 要素で最多）
- 面: `#ffffff` または `#f8f8f8`
- Shadow: **なし**（サイト全体で `box-shadow` は 0 種）

### Alert Box

- Background: `#fdeeee` / Border Radius: 6px
- 見出しの帯: `#e50012` / 文字 `#ffffff` / `border-radius: 6px 6px 0 0`

### Badge（ニュースカテゴリ）

- 文字 `#666666` / 12px / weight 400

---

## 5. Layout Principles

### Container

| 幅 | 実測 | 用途 |
|----|------|------|
| **1780px** | **10 箇所（トップで最多）** | トップの全幅セクション |
| **1380px** | 5 箇所（下層で最多） | 下層の標準コンテンツ |
| 1408 / 1280px | 2 箇所ずつ | 補助 |
| 800 / 696 / 680 / 596 / 520 / 440px | 1〜3 箇所 | カード・テキストブロック |

> **トップ（1780px）と下層（1380px）でコンテナ幅が違う。** トップは広く使い、下層は読みやすさ側に寄せている。

### Gap Scale

`8px` / `10px` / `16px` / `24px` / `29px` / `32px` / `40px` / `64px` / `80px` / `96px`

### Border Radius Scale

| 用途 | 値 | 実測 |
|------|----|------|
| カード・アラート | **6px** | 22 要素 |
| ピルボタン | **900px** | 16 要素 |
| 小さいピル | 21px | 1 要素 |
| アイコン・ドット | 50% | 8 要素 |
| フォームの端 | `6px 0 0 6px` / `0 6px 6px 0` | 1〜2 要素 |
| ログインボタン | 4px | 4 要素 |

**`900px` は丸めない。** ピルの意図で極端な値を書いているので、`9999px` に置き換えても見た目は同じだが、既存 CSS と突き合わせるときはこの値で探す。

---

## 6. Depth & Elevation

**影は使わない。** `box-shadow` の分布は **2 ページとも 0 種**。

例外は 1 つだけで、**ページ下部のフローティング CTA** が `rgba(0, 0, 0, 0.2) 0 0 30px 10px`（offset 0 の全方位グロー）を持つ。これは面を浮かせるためではなく、**スクロール中のコンテンツから切り離すため**。

> **カードに影を足さない。** 階層は面の色（`#ffffff` / `#f8f8f8`）と 6px の角丸だけで作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **サイズのユーティリティに `palt` を同梱する**（`.t-base` 等）。サイズと詰めをセットで扱うのがこのサイトの型
- **`palt` の上から負の `letter-spacing` を `em` で重ねる**（`-0.01em` / `-0.015em` / `-0.03em` の 3 段）
- **ヒーローの大見出しだけ `+0.03em` にする**（詰めない）
- **本文の `line-height` は 1.60**、見出し・ボタンは 1.40、セクション見出しは 1.20
- **`font-weight` は 400 / 500 / 600 / 700 / 800 を自由に使ってよい**（可変フォント）
- **CTA はグラデーションのピル**（`border-radius: 900px`）
- **文字のグラデーションは `background-clip: text` で**（`linear-gradient(90deg, #ff9d00 0, #e50012 60%)`）
- **本文色は `#1e1e1e`**、リンクは `#ff3502`、帯・バナーの面は `#e50012`
- `body` のサイズは `1rem` / `0.875rem` で、崖は 767px に 1 箇所だけ

### Don't（禁止）

- **`box-shadow` を足さない**（サイト全体で 0 種）
- **`letter-spacing` を px で配らない**（サイズに追従しなくなる。`em` が正）
- **`palt` を `body` に 1 行で書かない**（このサイトはユーティリティ側に持たせている。`body` に書くと CMP やフォーム部品まで詰まる）
- **面の赤と文字の赤を統一しない**（`#e50012` と `#ff3502` は別役）
- **本文色に純黒 `#000000` を使わない**（`#1e1e1e` が正）
- **CSS Custom Properties があるつもりで書かない**（4 個しかなく、全部埋め込みウィジェット用）
- **`html` に `font-size` を書かない**（このサイトは UA 既定に任せている）
- **角丸 `900px` を `8px` 程度に丸めない**（ピルが設計）

### 実サイトの事実として知っておくこと

- **ヒーローのコピーは画像に焼き込まれている。** `mv_00.png`（1448×704）/ `mv_06.webp` / `mv_08.webp` のスライドで、`alt` に `Vitality＆ 救Ｑ隊Ｃｕｂｅ` などが入る。**ここを Web フォントで組み直さない**
- **`font-size: 0px` の要素が 4 つある**（`住友生命 公式X（Twitter）` などの SNS リンク）。`lineHeightRatio` が `NaN` で出るが異常ではない
- **Google Fonts の CSS は CORS で読めない**（`styleSheetAccess.blocked: 1`）。ただし自社 CSS は 1〜2 枚とも読めており、**そこに設計トークンは 4 個しか無い**のは確か
- `pageBackground.resolved` はメガメニューのオーバーレイを拾って `rgb(217,217,217)` / `rgb(0,0,0)` を返す。地色は白

---

## 8. Responsive Behavior

### Breakpoints

| Name | Query | 実測 |
|------|-------|------|
| **Mobile** | `(max-width: 767px)` | 本文サイズの崖 |
| Tablet | `print, screen and (min-width: 768px)` | 1 箇所 |
| Desktop | `print, screen and (min-width: 900px)` / `(min-width: 936px)` / `(min-width: 1025px)` | 1〜2 箇所ずつ |
| Wide | `print, screen and (min-width: 1280px)` | 2 箇所 |
| Ultra Wide | **`print, screen and (min-width: 1704px)`** | 2 箇所 |

> **メディアクエリに `print` を並記している**（`print, screen and (min-width: …)`）。印刷時もデスクトップのレイアウトで出す意図。

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- 767px 以下で `body` が 16px → 14px。**字間は `em` なので自動で −0.16px → −0.14px に追従する**
- 見出しは `rem` ではなく px 指定のものが多いので、個別にメディアクエリを当てる

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Red (面):     #e50012   ← 帯・バナー・フッター
Brand Red (文字):   #ff3502   ← 本文リンク・ニュースタイトル
CTA Gradient:       linear-gradient(to right, #ff9d00 0, #ff9d00 50%, #e50012 100%)
Text Gradient:      linear-gradient(90deg, #ff9d00 0, #e50012 60%)  ← background-clip: text
Text Color:         #1e1e1e   ← 本文（純黒ではない）
Text Muted:         #666666
Surface:            #f8f8f8
Surface Alert:      #fdeeee
Border:             #cccccc
Background:         #ffffff
Font:               "Noto Sans JP", sans-serif   ← 可変 wght@400..900
English Accent:     "Open Sans", sans-serif      ← 5 要素のみ
Root:               html に font-size の宣言なし（UA 既定 16px）
Body Size:          1rem（≥768px） / 0.875rem（≤767px）
Line Height:        1.6（本文） / 1.4（見出し・ボタン） / 1.2（セクション見出し）
Letter Spacing:     -0.01em（小） / -0.015em（見出し） / -0.03em（ボタン） / +0.03em（ヒーロー）
Font Feature:       "palt"  ← サイズユーティリティに同梱（116 要素）
Font Weight:        400 / 500 / 600 / 700 / 800
Radius:             6px（カード） / 900px（ピル） / 21px（小ピル） / 50%（アイコン）
Shadow:             なし（0 種）
Container:          1780px（トップ） / 1380px（下層）
CSS Variables:      4 個のみ・全部 --embed-*（設計トークンは無い）
```

### プロンプト例

```
住友生命のデザインシステムに従って、商品一覧のカードセクションを作成してください。

- font-family は "Noto Sans JP", sans-serif の 1 本
  （Google Fonts の可変フォント wght@400..900。400/500/600/700/800 を自由に使ってよい）
- サイズのユーティリティクラス（.t-base / .t-large など）に
  font-feature-settings: "palt" を同梱し、サイズと詰めをセットで配る
- その上から letter-spacing を em で重ねる
  本文・日付 = -0.01em / 見出し・ナビ = -0.015em / ボタンのラベル = -0.03em
- セクションの大見出しだけは +0.03em（詰めずに広げる）
- line-height は本文 1.6 / 見出し・ボタン 1.4 / セクション見出し 1.2
- 本文色 #1e1e1e、補助 #666666、リンク #ff3502
- カードは background #ffffff / border-radius 6px / box-shadow なし
- CTA は linear-gradient(to right, #ff9d00 0, #ff9d00 50%, #e50012 100%) /
  文字 #ffffff / 16px / weight 700 / letter-spacing -0.015em / border-radius 900px
- セクション見出しには background-clip: text で
  linear-gradient(90deg, #ff9d00 0, #e50012 60%) を流す
- コンテナは max-width 1380px
- html に font-size は書かない。body を 1rem、767px 以下で 0.875rem に落とす
- box-shadow はどこにも使わない
```
