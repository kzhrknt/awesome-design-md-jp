# DESIGN.md — ライオン（LION）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-11 / 対象: `https://www.lion.co.jp/ja/`, `/ja/company/philosophy/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に**深緑1色**。塗り面をほとんど使わず、**線・丸・緑の文字**で階層をつくる。生活用品メーカーの企業サイトとして、清潔さと落ち着きを両立させている
- **密度**: ゆったり。本文 16px、記事の行間は **2.0**。コンテナ幅 1200px に対して本文カラムは 677〜900px に絞る
- **キーワード**: 深緑、約物半角、palt、円形ボタン、白地

**このサイトの核心は3つある。**

1. **`YakuHanJPs_Noto` が font-family の先頭に立っている。** 約物（`、。「」（）`）だけを半角字形に差し替える [YakuHanJP](https://yakuhanjp.qranoko.jp/) の Noto 用サブセットで、**実測 209 要素**がこの指定を持つ。日本語の括弧・句読点まわりのアキを詰めるための設計で、このリポジトリ収録サイトの中でも実装が明確な部類
2. **`font-feature-settings: "palt"` が全体に効いている**（**実測 816 要素**）。CSS 中の宣言はわずか 3 箇所で、`body` からの継承でサイト全体に行き渡る。**YakuHanJP と palt の併用**がこのサイトの字組みの正体
3. **`letter-spacing: 0.06em` を基準にしている**（CSS 全文で `0.06em` の宣言 9 箇所）。ただし **computed は px に解決されて継承される**ため、宣言のない子要素は font-size が何であっても **0.96px 固定**になる（実測 0.06em=91要素 / 0.069em=57要素 / 0.04em=20要素 — これは全部同じ 0.96px）

**CSS Custom Properties は実質存在しない**（トップに 2 個あるのは Swiper の既定値、下層は 0 個）。設計はトークンではなくクラス名（`mod-h1` `philosophy-concept-title-ja` `inner-sns-head`）に載っている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Primary（深緑）** | **`#007a46`** | **CSS 全文で 663 回**。可視テキスト 30 要素・面 5 要素。リンク、見出し、円形ボタン、ピル CTA のすべて |
| Primary Light（見出し用） | `#00854c` | CSS 8 回。企業理念ページの `PURPOSE / 存在意義` `BELIEFS` 等の中見出し |
| Primary Pale | `#00a05c` | CSS 2 回。面 1 要素 |

> **`#00b140`（明るい緑）を設計色として使わないこと。** `uniqueBackgrounds` では `#007a46` と並んで 6 回出るが、**実測した 6 要素はすべて OneTrust（Cookie 同意バナー）のボタン**で、サイト自身の CSS には 1 回も出てこない。ロゴの緑に近いため紛らわしいが、**UI の面色は `#007a46` だけ**。

### Surface（淡い面）

- **Surface Green** (`#f3f8f6`): サイドナビの選択項目、淡い緑の面（可視 3 要素）
- **Surface Blue** (`#f2f6f9`): 情報ブロックの面（可視 3 要素）
- **Surface Gray** (`#f4f4f4`): 汎用の淡いグレー面
- **Pale Blue** (`#cddcf2`): 図版・図解の面
- **Gray Disc** (`#c2cbcc`): カルーセルの非アクティブな円形ボタン（可視 3 要素）
- **Navy** (`#000333`): 図版内のダーク面

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文。**可視 131 要素で最多**
- **Text Footer** (`#202020`): フッターのテキスト（可視 37 要素）
- **Text Heading** (`#000000`): `h1` `h2` の見出しのみ（可視 10 要素）
- **Text on Dark** (`#ffffff`): 緑面・写真上のテキスト
- **Text Muted** (`#444444`): ヘッダーの補助リンク
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP**（Web フォント）。**約物半角サブセット `YakuHanJPs_Noto` を必ず前置する**
- 明朝体は使用しない

### 3.2 欧文フォント

- **サンセリフ（見出し）**: **Jost**（Web フォント）。英語見出しと `view more` に限定して使う
  - `Topics` `News release` `Group`: **54px / weight 500 / line-height 1.30 / letter-spacing 1.44px**（色は `#007a46`）
  - `view more`: 16px / weight 400 / `#007a46`
- **サンセリフ（本文中の欧文）**: Noto Sans JP の欧文グリフをそのまま使う（専用指定なし）

### 3.3 font-family 指定

```css
/* 本文・UI（トップページ / 共通ヘッダー・フッター） */
font-family: YakuHanJPs_Noto, "Noto Sans JP", "Hiragino kaku Gothic ProN", Meiryo, sans-serif;

/* 欧文見出し・view more */
font-family: Jost, serif;
```

**フォールバックの考え方**:
- **`YakuHanJPs_Noto` を最優先**。このフォントは**約物のグリフしか持たない**ため、残りの文字は次の `"Noto Sans JP"` に自動的に落ちる。これが「約物だけ半角」を実現する仕組み
- 以降は OS 標準（ヒラギノ角ゴ ProN → メイリオ）で受ける

> **実装の不整合（実測で確認）**: **下層ページ（`/ja/company/philosophy/`）の `body` は `"Noto Sans JP", sans-serif` だけで、`YakuHanJPs_Noto` が抜けている。** 共通ヘッダー／フッターの要素だけが `YakuHanJPs_Noto` を保っている。**新規実装では全ページで前置を統一すること。**

> **`Jost, serif` の `serif` フォールバックは誤り。** Jost はサンセリフなので、落ちたときに明朝／セリフになってしまう。**新規実装では `Jost, sans-serif` と書くこと。**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (EN) | Jost | 54px | 500 | 1.30 (70.2px) | 0.027em (1.44px) | `Topics` `News release` |
| Page Title | Noto Sans JP | 46px | 700 | **1.60** (73.6px) | 0.06em (2.76px) | `h1.mod-h1` |
| Section Heading | Noto Sans JP | 32px | 700 | 1.30 (41.6px) | 0.06em (1.92px) | 緑 `#007a46` |
| Slogan Heading | Noto Sans JP | 26px | 700 | 1.08 (28.17px) | 0.10em (2.6px) | `企業スローガン` |
| Sub Heading (緑) | Noto Sans JP | 26px | 600 | **1.75** (45.5px) | 0.05em (1.3px) | `#00854c` |
| Concept Label | Noto Sans JP | 18px | 400 | 1.73 (31.2px) | 0.025em (0.45px) | `PURPOSE / 存在意義`、`#00854c` |
| Lead / Catch | Noto Sans JP | 24px | 700 | **1.60** (38.4px) | 0.06em (1.44px) | 本文中の強調文 |
| **Body** | Noto Sans JP | **16px** | 400 | **2.00** (32px) | 0.06em (0.96px) | **記事本文** |
| Body Small | Noto Sans JP | 14px | 400 | **2.00** (28px) | 0.05em (0.7px) | 補足本文 |
| UI Label | Noto Sans JP | 16px | 400 | 1.30 (20.8px) | 0.06em (0.96px) | ナビ・ボタン |
| Nav Item | Noto Sans JP | 15px | 500 | 1.30 (19.5px) | 0.06em (0.9px) | グローバルナビ |
| Caption | Noto Sans JP | 14px | 400 | 1.30 (18.2px) | 0.06em (0.84px) | SNS 見出し等 |
| Small | Noto Sans JP | 13px | 400 | 1.30 (16.9px) | 0.06em (0.78px) | コピーライト |
| Micro | Noto Sans JP | 10px | 400 | 1.30 (13px) | 0.06em (0.6px) | ナビの英字補助 |

### 3.5 行間・字間

- **記事本文の行間**: **2.00**（16px / 32px、14px / 28px のどちらも 2.0）
- **UI・ナビの行間**: **1.30**（実測 172 要素で最多）。ボタン・ナビ・ラベルはすべてこれ
- **ページタイトル・リード文の行間**: **1.60**
- **字間**: **`0.06em` が基準**（本文・ナビ・見出しの大半）。一部の見出しのみ 0.10em（26px スローガン）や 0.025em（18px コンセプトラベル）

**ガイドライン**:
- **本文は 2.0、UI は 1.3 と、明確に二層に分ける。** 中間の 1.5〜1.7 はこのサイトでは使われない
- **`letter-spacing` は `em` で宣言する。** ただし宣言していない子要素には **計算後の px（0.96px）がそのまま継承される**点に注意する。「全部 0.06em」と思って実装すると、大きい見出しほど実サイトより空いてしまう

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 見出しは `<br>` による明示的な改行を多用する（`企業理念はパーパス（存在意義）、<br>ビリーフス、DNA…`）。**文節で折り返す位置を人が決める**設計

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";
```

- **`palt` を `body` に一度だけ当てて全体に継承させる**（実測 816 要素に適用）
- **ただし Cookie バナー（OneTrust）と一部の `button` は `normal`。** 外部ウィジェットには効かない
- **`YakuHanJPs_Noto` と `palt` を併用する。** 前者が約物のグリフ自体を半角に、後者が残りの文字のアキを詰める。役割が違うので両方入れる

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

**このサイトには「塗りの長方形ボタン」がほとんど存在しない。** CTA は**円形**か**ピル**、それ以外はテキストリンク。

### Buttons

**Primary（ピル）**
- Background: `#007a46`
- Text: `#ffffff`
- Border Radius: **`50px`**
- Font: Noto Sans JP / 16px / 400

**Circle Outline（`view more` の矢印。最頻出）**
- Size: **54 × 54px**
- Background: `#ffffff`
- Border: **`2px solid #007a46`**
- Border Radius: **`50%`**
- 中身は矢印アイコン。**ラベル `view more` は円の外に Jost で置く**

**Circle Filled（検索トリガー等）**
- Size: 32 × 32px
- Background: `#007a46`
- Border Radius: `50%`

**Circle Muted（カルーセルの非アクティブ）**
- Background: `#c2cbcc` / Border Radius: `50%`

**Nav Item（サイドナビの選択状態）**
- Background: `#f3f8f6`
- Text: `#007a46`
- Padding: `12px 10px 13px`
- Border Radius: **`0px`**
- Font: 15px / 400

**Skip Link（アクセシビリティ）**
- Background: `#ffffff` / Text: `#007a46`
- Border: `1px solid #007a46` / Border Radius: `3px`
- Padding: `7px 8px`

**Text Link**
- Color: `#007a46`、塗りなし。左に 30px のアキを取ってアイコンを置く

### Inputs

- Background: `#ffffff`
- Border Radius: `0px`
- Font Size: 16px（ヘッダー検索）
- 検索の送信ラベルは 18px / weight 700 / `#007a46`

### Cards

- Background: `#ffffff` または `#f2f6f9` / `#f3f8f6`
- Border Radius: `0px`
- Shadow: 原則なし（下記参照）

---

## 5. Layout Principles

### Spacing Scale

明示的なトークンは無い。実測で繰り返し現れる値：

| Token | Value | 用途 |
|-------|-------|------|
| XS | 6px | ラベル下のアキ |
| S | 10px | ボタン内側の左右 |
| M | 12–13px | ボタン内側の上下 |
| L | 30px | テキストリンクのアイコン幅 |
| XL | 110px | セクション上部のアキ |

### Container

- **Max Width: 1200px**（実測 1196 / 1200 / 1236 / 1240 が並ぶ）
- **本文カラム: 677px**（企業理念ページの読み物幅）
- **中間カラム: 900px**（スローガン等の中央寄せブロック）

### Grid

- フル幅（1440px）のセクション背景の中に 1200px のコンテナを置く二層構造

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・ボタンはフラット** |
| 1 | `0 0 18px rgba(0, 0, 0, 0.2)` | **サイト全体で 1 要素のみ**（追従ヘッダー） |

> **影をほとんど使わないサイト。** カードやボタンに影を足さないこと。面の区別は背景色（`#f3f8f6` / `#f2f6f9`）と罫線で行う。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-family` の先頭に `YakuHanJPs_Noto` を置く。** 約物だけが半角になり、残りは `"Noto Sans JP"` に落ちる
- **`body` に `font-feature-settings: "palt"` を一度だけ宣言して継承させる**
- **記事本文は `line-height: 2.0`、UI は `1.3`** と二層で使い分ける
- **`letter-spacing: 0.06em` を基準**にする
- **CTA は円形（`border-radius: 50%`）かピル（`50px`）**にする。長方形の塗りボタンはこのサイトの語彙に無い
- 英語見出しは **Jost / weight 500 / `#007a46`** で組む
- 本文色は `#333333`、見出しのみ `#000000`

### Don't（禁止）

- **`#00b140` を設計色として使わない。** サイトの CSS に存在せず、Cookie 同意バナー（OneTrust）の色でしかない
- **`Jost, serif` と書かない。** 実サイトの記述だがフォールバックが誤り。`Jost, sans-serif` と書く
- **下層ページだからといって `YakuHanJPs_Noto` を省かない。** 実サイトは抜けているが、これは統一すべき不整合
- **カード・ボタンに `box-shadow` を足さない**（実サイトは 1 要素のみ）
- **`border-radius` を 4px や 8px にしない。** このサイトの角丸は **0px / 3px / 50px / 50%** の4値しかない
- 本文に `line-height: 1.5` 以下を使わない（このサイトの本文は 2.0）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 768px** | **主ブレークポイント**（CSS 全文で `max-width: 768px` が 111 回。次点の 1300px は 16 回） |
| Desktop | ≥ 769px | デスクトップレイアウト |
| Wide 調整 | ≤ 1000 / 1160 / 1200 / 1300px | コンテナ幅の微調整のみ |

### タッチターゲット

- 円形 CTA は 54 × 54px（WCAG の 44px を満たす）
- 検索トリガーの 32 × 32px は**下回るため、モバイルでは拡大すること**

### フォントサイズの調整

- 一部の見出しは `vw` ベースで可変（`21.92px` `13.008px` `11.04px` のような端数はその痕跡）
- 本文 16px はブレークポイントをまたいで固定

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #007a46
Text Color:    #333333
Heading Color: #000000
Background:    #ffffff
Font (JP): YakuHanJPs_Noto, "Noto Sans JP", "Hiragino kaku Gothic ProN", Meiryo, sans-serif
Font (EN heading): Jost, sans-serif
Body Size: 16px
Line Height: 2.0（本文） / 1.3（UI）
Letter Spacing: 0.06em
font-feature-settings: "palt"
Button Radius: 50px（ピル） / 50%（円）
```

### プロンプト例

```
ライオンのデザインシステムに従って、企業理念ページのセクションを作成してください。
- font-family の先頭に YakuHanJPs_Noto を置き、"Noto Sans JP" を続ける
- body に font-feature-settings: "palt" を宣言する
- 本文は 16px / line-height: 2.0 / letter-spacing: 0.06em / 色 #333333
- セクション見出しは 32px / weight 700 / 色 #007a46
- 英語のラベル（PURPOSE / BELIEFS）は Jost / weight 500 / 色 #007a46
- 「view more」は 54×54px の白丸に 2px solid #007a46 のボーダー、ラベルは円の外
- 塗りの長方形ボタン・box-shadow・4px や 8px の角丸は使わない
- 本文カラムは 677px、コンテナは 1200px
```
