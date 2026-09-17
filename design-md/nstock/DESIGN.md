# DESIGN.md — Nstock（株式報酬）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-17 / 対象: `https://nstock.com/`, `https://nstock.com/service`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地・インディゴ1色・角丸4pxで組む、**装飾を足さない B2B SaaS**。影は実質ゼロ、罫線と余白だけで階層をつくる
- **密度**: 中程度。コンテナ 1120px の中央寄せに 8px 刻みのグリッドを敷く
- **キーワード**: インディゴ `#2227b2`、角丸 4px、影なし、Manrope＋Noto Sans JP の二層、**palt は見出しだけ**

**このサイトの核心は4つある。**

1. **欧文と和文で別々のフォントを積んでいる。** `Manrope`（欧文）→ `Noto Sans JP`（和文）の順で並べ、数字とラテン文字は Manrope、かなと漢字は Noto Sans JP が受け持つ。**欧文だけの見出し（`Problems` `Solutions` `Planning`）は和文を積まない別スタック**を使う（3.3 参照）
2. **`font-feature-settings: "palt"` は可視 540 要素中 9 要素にしか効いていない。** その 9 要素は**すべて見出し**（h1 / h2 / h3）と円形ラベルの「設計」「管理」「活用」。**本文には一切 palt を当てない**
3. **`letter-spacing` は body で一度だけ宣言され、px として 493 要素に継承される。** 実測 `0.368px`（= 16px × 0.023em）。見出しだけが em で再宣言して 0.05〜0.06em まで開く
4. **影は 1 種類・3 要素だけ。** `rgba(0,0,0,0.08) 2px 4px 4px 0px` がヒーローの浮きラベルに当たるのみで、**カードにもボタンにも影がない**

> **このサイトに CSS Custom Properties は 1 個も存在しない。** Next.js の CSS Modules（`index-module-scss-module__XXXX__button` のようなハッシュ付きクラス名）で組まれており、トークンはビルド時に解決されている。**実装値そのものを仕様として扱うこと。**

---

## 2. Color Palette & Roles

### Primary

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Brand Indigo** | **`#2227b2`** | **文字色として 34 要素 / 面色として 8 要素**。主要 CTA の面、リンク色、数値の強調、セクションラベル（`Problems` `Solutions`）、アウトラインボタンの枠 |
| **Ink（本文）** | **`#0f131a`** | **可視 464 要素**。見出しも本文も同じ黒。純黒 `#000` は使わない |
| **White** | `#ffffff` | 可視 29 要素。インディゴ面の上の文字、カード・ボタンの面 |

### Secondary（サービス3領域の色分け）

サービスを3つに分けて紹介する箇所だけ、バッジに色を振り分ける。**この3色はバッジ以外に登場しない。**

| ラベル | 実装値 | 用途 |
|--------|--------|------|
| 設計 / Planning | `#085f96`（青） | バッジ面 |
| 管理 / Admin | `#2227b2`（ブランドのインディゴ） | バッジ面 |
| 活用 / Enablement | `#4622b2`（紫） | バッジ面 |

> **3色は「青 → インディゴ → 紫」と色相が連続している。** 真ん中がブランド色になるよう配置されている。無関係な色を足さないこと。

### Neutral

| 役割 | 実装値 | 用途 |
|------|--------|------|
| Text / secondary | `#3c4149` | 補足文、ログインボタンの文字（可視 6 要素） |
| Text / muted | `#6d727c` | 注釈、カテゴリラベル（可視 7 要素） |
| Border / strong | `#afb6c1` | セカンダリボタンの枠 |
| Border / default | `#e9eaed` | カードの枠 |
| Border / subtle | `#d4d8dd` | タグの枠 |
| Surface | `#f3f4f7` | フッター面、ステータスバッジの面 |
| Page background | **`#ffffff`** | `body` に直接指定（根拠: body） |
| Nav overlay | `#40444d` / `#2f305d` | モバイルメニューの面、ヒーロー背面の濃紺 |

### Semantic

| 役割 | 実装値 | 用途 |
|------|--------|------|
| Success / 提供予定 | `#0d735b` | `#f3f4f7` 面のバッジ文字 |

### Gradients

面を白から浮かせるためだけに使う、**ほぼ無彩色に近い淡いグラデーション**。

```css
/* 実績バー */
background: linear-gradient(90deg, rgba(218,219,247,.5), rgba(180,212,241,.5));
/* セクション面 */
background: linear-gradient(96.8deg, #f5fafd 6.38%, #f5f6fd 51.98%, #f7f5fd 110.34%);
```

> **グラデーションを彩度の高い色でつくらないこと。** 実サイトはいずれも白に限りなく近く、面の切れ目を示すためだけに使っている。

---

## 3. Typography Rules

### 3.1 和文フォント

**`Noto Sans JP` のみ。** Google Fonts を `next/font` 経由でサブセット配信している。

- **実際にロードされるウェイトは 400 / 500 / 600 の3つだけ。** `@font-face` は 700 も宣言しているが `document.fonts` の status は **`unloaded`**（= 参照する要素がページに存在しない）。**和文で 700 を使わないこと**
- フォールバックに `Noto Sans JP Fallback`（`size-adjust` で字幅を合わせたローカル代替）が自動挿入される。手書きする場合は不要

### 3.2 欧文フォント

**`Manrope`。** 400 / 500 / 600 / 700 がロード済み、**800 は `unloaded`**。

- 数字の強調（`100` 社以上）だけが **700** を使う。それ以外の欧文は 600 まで
- セクションラベル（`Problems` `Solutions` `Planning` `Admin` `Enablement`）は**和文を積まないスタック**で指定される（3.3）

### 3.3 font-family 指定

**2種類のスタックを使い分ける。**

```css
/* (a) 既定 — 和欧混植。html / body に指定し、ほぼ全要素が継承する（可視 108 / 118 要素） */
font-family: Manrope, "Manrope Fallback", "Noto Sans JP", "Noto Sans JP Fallback",
             "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;

/* (b) 欧文専用 — ラテン文字だけの見出し・数字に使う（可視 10 要素） */
font-family: Manrope, "Manrope Fallback";
```

- **(a) は欧文 Manrope が先、和文 Noto Sans JP が後。** ブラウザは字ごとにスタックを走査するので、この順で「ラテン文字と数字は Manrope、かなと漢字は Noto Sans JP」が成立する
- **(b) には generic family（`sans-serif`）が無い。** 実サイトの実装どおりだが、**新規実装では末尾に `sans-serif` を足すこと**（Manrope が落ちたときの受け皿が無い）
- 末尾のローカルフォールバックは `Hiragino Kaku Gothic ProN` → `Hiragino Sans` → `Meiryo`。**游ゴシックを積んでいない**

### 3.4 文字サイズ・ウェイト階層

`html` / `body` ともに `font-size: 16px`。

| 役割 | size | weight | line-height | letter-spacing | 実測 |
|------|------|--------|-------------|----------------|------|
| **ヒーロー見出し** | **56px** | 600 | 67.2px（**1.2**） | **2.8px（0.05em）** | h1。palt あり |
| **セクション見出し** | 32px | 600 | 52.8px（1.65） | 1.92px（**0.06em**） | h2。palt あり |
| セクション見出し（小） | 24px | 600 | 39.6px（1.65） | 1.44px（0.06em） | h2 |
| 大リード | 20px | 500 | 35px（1.75） | 0.368px（継承） | p |
| 小見出し | 20px | 600 | 31px（1.55） | 0.6px（0.03em） | h3 |
| 小見出し（カード） | 18px | 600 | 27.9px（1.55） | 0.368px（継承） | h3 |
| **本文** | **16px** | **400** | **28.8px（1.8）** | **0.368px（継承）** | body 既定 |
| 本文（強調） | 16px | 500 | 28px（1.75） | 0.368px | |
| 補足・リスト | 14px | 400 | 20.3px（1.45） | 0.368px | 最頻サイズ（可視 51 要素） |
| ラベル・バッジ | 13px / 12px | 600 | 20.15px / 14.4px | 0.368px | |
| 注釈 | 11px | 400 | 16.72px（1.52） | 0.368px | `#6d727c` |

**ウェイトの分布（可視テキスト 118 要素）**: 600 が 50、400 が 45、500 が 22、**700 は 1 要素（数字の `100`）だけ**。

> **見出しは 600 で止める。** このサイトは和文で 700 を一切使わない（そもそもロードされていない）。

### 3.5 行間・字間

**字間は「body で一度だけ宣言 → px で継承」型。**

- `body { letter-spacing: 0.023em }` 相当 → **`0.368px` に解決され、可視 540 要素中 493 要素がそのまま継承する**
- **em で再宣言するのは見出しだけ**: 56px → 0.05em、32px / 24px → 0.06em、20px → 0.03em
- **この px 継承を em に読み替えて各要素に書き直さないこと。** 14px の要素に `0.023em` を再宣言すると 0.322px になり、実サイトの 0.368px とズレる。**継承させるか、見出しにだけ em を書く**

**行間は用途で段階を持つ。**

| 比率 | 用途 | 実測 |
|------|------|------|
| **1.2** | ヒーロー見出し、ボタン文字、ナビ | 39 要素（最多） |
| 1.0 | ボタンの1行ラベル、数字 | 15 要素 |
| 1.45 | 箇条書き・リスト項目 | 14 要素 |
| 1.55 | カードの小見出し、浮きラベル | 11 要素 |
| **1.65** | **セクション見出し・段落本文** | 15 要素 |
| **1.8** | **body 既定（長文の本文）** | 4 要素＋継承 |

> **和文の長文は 1.8。** 見出しほど詰め、本文ほど開く、という素直な設計。

### 3.6 禁則処理・改行ルール

- 実サイトは `word-break` / `line-break` を明示していない。ブラウザ既定の日本語禁則に任せている
- ヒーロー見出し「株式報酬、まるごとプロに。」のように**読点で意味が切れる短い一文**を使い、折り返しを起こさない長さに収めている。**長い見出しを折り返させる設計ではない**

### 3.7 OpenType 機能

**`font-feature-settings: "palt"` は見出しにだけ当てる。**

実測: 可視 540 要素のうち **9 要素**。内訳は以下がすべて。

| 要素 | テキスト |
|------|----------|
| h1 | 株式報酬、まるごとプロに。 |
| h2 | 株式報酬の課題、誰に相談していますか？ |
| h2 | その課題、Nstock株式報酬がまるごと解決します |
| h2 | 導入・活用事例 |
| h2 | お知らせ |
| h3 | 株式報酬のこと、まるごとご相談ください。 |
| span ×3 | 設計 / 管理 / 活用（円形ラベル） |

```css
/* 見出しにだけ当てる */
h1, h2, h3 { font-feature-settings: "palt"; }
/* 本文には当てない（実サイトは body に palt を書いていない） */
```

> **本文に palt を当てないこと。** 16px / 1.8 の本文は約物が半角になると逆に読みにくい、という判断が実装に表れている。

### 3.8 縦書き

**使わない。** 実測で `writing-mode: vertical-rl` の要素は 0。

---

## 4. Component Stylings

### Buttons

**角丸は 4px が基本。フッターの大型 CTA だけ 6px。**

```css
/* Primary — 主要CTA「プロに相談する」 */
.button-primary {
  background: #2227b2;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 18px 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.368px;
}

/* Primary (large) — フッターの大型CTA */
.button-primary-lg {
  background: #2227b2;
  color: #ffffff;
  border-radius: 6px;
  padding: 20px 24px;
  font-size: 16px;
  font-weight: 400;
}

/* Secondary — 「ログイン」 */
.button-secondary {
  background: #ffffff;
  color: #3c4149;
  border: 1px solid #afb6c1;
  border-radius: 4px;
  padding: 18px 16px;
  font-size: 16px;
  font-weight: 600;
}

/* Outline — 「◯◯を詳しく見る」「一覧を見る」 */
.button-outline {
  background: #ffffff;
  color: #0f131a;         /* 枠はインディゴ、文字は黒 */
  border: 1px solid #2227b2;
  border-radius: 4px;
  padding: 16px;          /* 一覧系は 20px */
  font-size: 16px;
  font-weight: 400;
}
```

> **アウトラインボタンの文字色はインディゴではなく黒 `#0f131a`。** 枠だけがインディゴ。ここを揃えないこと（実サイトがそうしている）。

### Badges / Labels

```css
/* サービス領域バッジ（面色） */
.badge-service {
  background: #085f96;    /* または #2227b2 / #4622b2 */
  color: #ffffff;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  font-weight: 400;
}

/* 課題ラベル（枠のみ・角丸ゼロ） */
.label-column {
  background: transparent;
  color: #2227b2;
  border: 1px solid #2227b2;
  border-radius: 0;       /* ← 角丸を付けない */
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
}

/* カテゴリタグ */
.tag-category {
  background: #ffffff;
  color: #6d727c;
  border: 1px solid #d4d8dd;
  border-radius: 2px;     /* ← 2px。4px ではない */
  padding: 6px;
  font-size: 12px;
  font-weight: 500;
}

/* ステータスバッジ */
.badge-status {
  background: #f3f4f7;
  color: #0d735b;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 600;
}

/* ヒーローの浮きラベル — このサイトで唯一影が付く要素 */
.floating-label {
  background: rgba(255,255,255,.88);
  color: #0f131a;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: rgba(0,0,0,.08) 2px 4px 4px 0;
}
```

### Cards

```css
.card {
  background: #ffffff;
  border: 1px solid #e9eaed;
  border-radius: 4px;
  padding: 0;             /* 内側の要素が余白を持つ */
  box-shadow: none;       /* ← 影なし */
}
```

### 角丸スケール（実測）

| 値 | 出現 | 用途 |
|----|------|------|
| **0px** | 490 | **既定。ほとんどの要素** |
| 6px | 22 | セクション面、フッターCTA、タブ |
| 4px | 19 | ボタン、カード、バッジ |
| 50% | 4 | 円形ラベル（設計 / 管理 / 活用）、カルーセルの丸ボタン |
| 2px | 3 | カテゴリタグ |
| 9999px | 1 | タブのトラック |

---

## 5. Layout Principles

### Container

| 値 | 用途 |
|----|------|
| **1120px** | **本文コンテンツの最大幅（最頻）** |
| 1440px | ヒーロー・全幅セクション |
| 603px / 540px | 文章ブロックの読み幅 |

### Spacing Scale

**8px 刻み。** 実測の gap 出現順:

`8px`(10) → `32px`(8) → `16px`(8) → `24px`(7) → `40px`(6) → `20px`(5) → `64px`(3) → `12px`(3)

### Grid

- 3カラム（サービス3領域 / 事例カード）が基本
- ロゴ帯は横スクロールのマーキー

---

## 6. Depth & Elevation

**このサイトはほぼフラット。**

| レベル | 値 | 実測 |
|--------|----|------|
| 0（既定） | `none` | **可視 537 要素** |
| 1（唯一の影） | `rgba(0,0,0,.08) 2px 4px 4px 0` | **3 要素**（ヒーローの浮きラベルのみ） |

> **カードやボタンに影を足さないこと。** 階層は `1px solid #e9eaed` の罫線と `#f3f4f7` / 淡いグラデーションの面で表す。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-family` は欧文 → 和文の順**（`Manrope` → `Noto Sans JP`）。数字とラテン文字を Manrope に拾わせる
- **`letter-spacing` は body に 1 回だけ書いて継承させる**（実測 `0.368px`）。見出しだけ `0.05em` / `0.06em` で再宣言する
- **`palt` は h1 / h2 / h3 にだけ当てる**
- **和文のウェイトは 400 / 500 / 600 の3段**で組む
- 角丸は **4px**（ボタン・カード）、面は **6px**、タグは **2px** と使い分ける
- 階層は**罫線と面色**で作る。影は使わない
- CTA は**塗り（インディゴ）とアウトライン（枠だけインディゴ・文字は黒）の2種**に絞る

### Don't（禁止）

- **和文に `font-weight: 700` 以上を使わない。** Noto Sans JP の 700 はロードされていないので、指定すると合成ボールドになる
- **欧文に `font-weight: 800` を使わない**（Manrope 800 も `unloaded`）
- **本文に `palt` を当てない。** 実サイトは見出し 9 要素にしか当てていない
- **`letter-spacing` を em のまま各要素に再宣言しない。** 継承される px 値（0.368px）と食い違う
- **影を足さない。** 実サイトの影は 1 種類 3 要素だけ
- **彩度の高いグラデーションを作らない。** 実サイトのグラデーションはすべて白に近い
- **アウトラインボタンの文字をインディゴにしない**（枠だけがインディゴ、文字は `#0f131a`）
- **純黒 `#000000` を本文に使わない**（`#0f131a`）
- 欧文専用スタック `Manrope, "Manrope Fallback"` をそのまま写さず、**末尾に `sans-serif` を足す**

---

## 8. Responsive Behavior

### Breakpoints

**min-width 方式（モバイルファースト）。** 実測の出現回数順:

| 値 | 出現 | 位置づけ |
|----|------|----------|
| **1024px** | 150 | **主ブレークポイント** |
| 768px | 96 | タブレット |
| 1280px | 65 | ワイド |
| 640px | 7 | 大きめのスマホ |

`(prefers-reduced-motion: reduce)` も 1 箇所で扱っている。**アニメーションを入れる場合は必ず対応すること。**

### タッチターゲット

主要 CTA は `padding: 18px 16px` ＋ `font-size: 16px` / `line-height: 1` で実高さ約 52px。**44px 以上を確保している。**

### フォントサイズの調整

`html` は 16px 固定（`rem` 基準を変えていない）。サイズは px で直接指定されている。

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ブランドカラー: #2227b2（インディゴ）
本文色: #0f131a / 補足 #3c4149 / 注釈 #6d727c
背景: #ffffff / 面 #f3f4f7
罫線: #e9eaed（カード）/ #afb6c1（ボタン）/ #d4d8dd（タグ）

和文: Noto Sans JP（400/500/600 のみ）
欧文: Manrope（400/500/600/700）
スタック: Manrope, "Manrope Fallback", "Noto Sans JP", "Noto Sans JP Fallback",
          "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif

本文: 16px / line-height 1.8 / letter-spacing 0.368px（body から継承）
見出し: 56px・32px・24px・20px / weight 600 / line-height 1.2〜1.65 / 0.05〜0.06em
palt: 見出しのみ（h1/h2/h3）。本文には当てない

角丸: 4px（ボタン・カード）/ 6px（面・大型CTA）/ 2px（タグ）/ 0（既定）
影: なし
コンテナ: 1120px
余白: 8px 刻み（8/12/16/20/24/32/40/64）
```

### プロンプト例

```
Nstock のデザインシステムでランディングページを作って。

- font-family は Manrope, "Manrope Fallback", "Noto Sans JP", "Noto Sans JP Fallback",
  "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
- body に letter-spacing: 0.023em を1回だけ書き、子要素では再宣言しない
- font-feature-settings: "palt" は h1/h2/h3 にだけ当てる
- 和文のウェイトは 400/500/600 だけ使う（700 は使わない）
- 本文 16px / line-height 1.8、見出し 32px / weight 600 / letter-spacing 0.06em
- 主要CTA は背景 #2227b2・文字 #ffffff・角丸 4px・padding 18px 16px・weight 600
- セカンダリは白地に 1px solid #2227b2 の枠、文字は #0f131a（枠だけブランド色）
- 影は使わない。階層は 1px solid #e9eaed の罫線と #f3f4f7 の面で表す
- コンテナ 1120px、余白は 8px 刻み
```
