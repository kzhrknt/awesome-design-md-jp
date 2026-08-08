# DESIGN.md — ヤッホーブルーイング（YOHO BREWING）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-08 / 対象: `https://yohobrewing.com/`, `/craft_beer/`, `/company/message/`

---

## 1. Visual Theme & Atmosphere

「よなよなエール」「水曜日のネコ」「インドの青鬼」を醸す長野・軽井沢のクラフトビール会社。
コーポレートサイトは**濃紺 `#112240` を地色に、蛍光に近い黄 `#F8E133` を差す2色**でできている。
黄と紺の反転をボタン・タブ・バッジで繰り返し、**同じ2色を役割ごとに入れ替える**のが設計の核。

- **デザイン方針**: 濃紺と黄の2色。中間色を挟まず、面と文字を反転させて階層をつくる
- **密度**: 中。1200px の版面に写真を大きく使い、本文は 800px に絞る
- **キーワード**: 濃紺×黄、太い4pxボーダーのピル、角丸10px、影ゼロ、weight は 500 と 700 の2値

**このサイトの特徴的な癖（他サイトと違う点）**

1. **`body` の地色が濃紺 `#112240`**。白地ではない。コンテンツ側が白や黄の面を
   敷いて上に乗る構造で、**セクションの隙間から常に紺が覗く**
2. **ボタンのボーダーが `4px`**。1px でも 2px でもなく 4px の太い罫を
   `border-radius: 80px` のピルに巻く。紺地の上でも白地の上でも輪郭が残る
3. **同じ2色を反転して3種のボタンをつくる**。黄地×紺文字 / 紺地×黄文字（枠は黄）/
   透明×紺文字（枠は紺）。**第3の色を足さない**
4. **`font-weight` の既定が 500**（Noto Sans JP Medium）。400 を使わない。
   見出し・ボタン・バッジが 700。**この2値だけ**
5. **`line-height: 1.6` が既定**。16px→25.6px、14px→22.4px。
   代表メッセージの大見出しだけ **2.4**（36px→86.4px）と極端に開く
6. **`letter-spacing: 0`（`normal` ではなく明示的な 0）がリセットで指定される**。
   字間を開けない方針
7. **商品バッジが円形**。`border-radius: 50%` に `6px solid #F8E133` の輪、
   中は `rgba(0,0,0,.3)` の半透明。ビール写真の上に直接置く
8. **`box-shadow` の宣言が CSS 全体で 0 件**
9. 酒類サイトのため、フッターに**20歳未満への配慮文**と「適正飲酒の取り組み」バナー
   （`#F1E2B0` のベージュ）を常設する

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style / CSS Custom Properties 実測値。すべて hex -->

### Brand（この2色がすべて）

| Token | 値 | 役割 |
|-------|-----|------|
| `--yh-navy` | `#112240` | **ページ地色**。ヘッダー、フッター、反転ボタンの面、タグの面 |
| `--yh-yellow` | `#F8E133` | **アクセント**。CTA の面、紺地の上の見出し文字、バッジの輪、斜めの帯 |

### Sub（黄の派生）

| Token | 値 | 役割 |
|-------|-----|------|
| `--yh-soft-yellow` | `#EABF4B` | 落ち着いた黄。下層ページのヒーロー面、小見出しのマーカー |
| `--yh-profile-bg` | `#F1E2B0` | ベージュ。「適正飲酒の取り組み」バナー、番号付きリストの面 |
| `--yh-beige` | `#e8daaa` | さらに淡いベージュ。補助的な面 |

### Base

- **Ink** (`#000000`): 白地・黄地の上の本文。`--yh-black`
- **On Navy** (`#ffffff`): 紺地の上の本文・タグ文字
- **Overlay** (`rgba(0, 0, 0, 0.3)`): 円形バッジの中身（写真を透かす）
- **Header Scrim** (`rgba(17, 34, 64, 0.85)`): スクロール時のヘッダー背景

```css
:root {
  --yh-navy:        #112240;
  --yh-yellow:      #F8E133;
  --yh-soft-yellow: #EABF4B;
  --yh-profile-bg:  #F1E2B0;
  --yh-beige:       #e8daaa;
  --yh-black:       #000000;
}
```

**色の使い分けの原則**

- **紺の上には黄**（見出し・ボタン文字・バッジ）
- **黄の上には紺**（ボタン文字・タブのアクティブ）
- **白の上には黒**（本文）
- 赤・緑・青を足さない。ビールのラベルは色数が多いが、**UI は紺と黄だけ**

---

## 3. Typography Rules

### 3.1 和文フォント

**Noto Sans JP 1本。** Webフォントはこれだけ。

- **本文・見出し・ボタン・すべて**: `"Noto Sans JP", sans-serif`
- **`html` の既定（フォールバック）**: `"Hiragino Kaku Gothic ProN"`

`font-optical-sizing: auto` を併記しており、可変フォントとして読み込んでいる。

### 3.2 欧文フォント

- **Inter**: `.inter` クラスを当てた欧文の見出し・数字だけに使う（weight 500）
- それ以外の欧文（`About YOHO Brewing`、`Beer Lineup` 等の英字サブタイトル）は
  **Noto Sans JP の欧文グリフをそのまま使う**

### 3.3 font-family 指定

```css
/* リセット — サイト全体 */
body {
  background: #112240;
  color: #000000;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 16px;
  font-weight: 500;              /* 400 ではない */
  font-optical-sizing: auto;
  line-height: 1.6;
  letter-spacing: 0;             /* normal ではなく 0 */
  -webkit-text-size-adjust: 100%;
}

/* フォーム部品にも同じ指定を明示（line-height だけ 2） */
input, select, textarea, button {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2;
  letter-spacing: 0;
}

/* 欧文の見出し・数字 */
.inter { font-family: "Inter", sans-serif; font-weight: 500; }
```

**フォールバックの考え方**:
- **Webフォント単独型**。`"Noto Sans JP", sans-serif` の2段だけ。
  プラットフォームフォントをチェーンに並べない
- `html` にだけヒラギノ角ゴ **ProN** を置き、Noto の読み込み前に和文が崩れないようにしている
- 欧文専用の Inter は**クラスで明示的に当てる**。チェーンに混ぜない

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | Noto Sans JP | 40px | **700** | 1.35 (54px) | 0 | 「プレスルーム」「代表メッセージ」。紺地なら `#F8E133` |
| Message Head | Noto Sans JP | 36px | **700** | **2.4** (86.4px) | 0 | 代表メッセージの大見出し。**行送りだけ極端に開く** |
| Section Title | Noto Sans JP | 40px | **700** | 1.4 (56px) | 0 | 「クラフトビールのはじまりと今」 |
| Sub Head | Noto Sans JP | 32px | **700** | 1.375 (44px) | 0 | 「About YOHO Brewing」「Breweries & Taprooms」 |
| Lead | Noto Sans JP | 24px | **700** | 1.375 (33px) | 0 | 「ヤッホーブルーイングとファンとの絆」 |
| Column Head | Noto Sans JP | 20px | **700** | 1.4 (28px) | 0 | 「コラム：ビール醸造プロセス」。`#EABF4B` のマーカー付き |
| Message Body | Noto Sans JP | 20px | 500 | **2.0** (40px) | 0 | 代表メッセージ本文 |
| Base (body) | Noto Sans JP | **16px** | **500** | **1.6** (25.6px) | 0 | 継承の基準値 |
| Emphasis | Noto Sans JP | 16px | **700** | 1.6 (25.6px) | 0 | リード文・強調 |
| Button Label | Noto Sans JP | 16px | **700** | **1.0** (16px) | 0 | 全ボタン共通 |
| Card Text | Noto Sans JP | 14px | 500 | 1.6 (22.4px) | 0 | ニュースカードの本文 |
| Tag / Badge | Noto Sans JP | 14px | **700** | 1.4〜1.6 | 0 | 「取り組み」「東京・新宿」 |
| Utility | Noto Sans JP | 12px | **700** | **1.0** (12px) | 0 | 「ONLINE STORE」「JP / EN」 |
| Breadcrumb | Noto Sans JP | 12px | **700** | 1.5 (18px) | 0 | 白文字（紺地） |
| Number Badge | Noto Sans JP | 32px | **700** | — | 0 | 醸造工程の丸数字（黄地） |

**ウェイトは 500 と 700 の2値だけ**。400 も 600 も使わない。
`h1〜h6` はリセットで `font-size: 100%; font-weight: 500;` に潰され、
必要な階層はクラス（`.c-heading_01` 等）で与える。

### 3.5 行間・字間

- **既定の `line-height` は `1.6`**。16px→25.6px、14px→22.4px。
  日本語サイトとしてはやや詰まり気味で、**軽快さと情報密度**を取っている
- **大見出しほど比率が下がる**（40px→1.35、32px→1.375）。
  文字が大きいので相対的な行送りを詰める、標準的なやり方
- **例外が2つ**:
  - **代表メッセージの h2 だけ `2.4`**（36px→86.4px）。読み物として大きく開く
  - **フォーム部品だけ `2.0`**（リセットで明示）
- **ボタンとユーティリティは `1.0`**。上下パディングで高さを作る
- **`letter-spacing` は `0`**。リセットで明示的に 0 を指定しており、
  `normal` ですらない。字間を開けるのは一部の英字ラベル（0.05em）だけ

```css
/* 本文 */
p { font-size: 16px; line-height: 1.6; letter-spacing: 0; font-weight: 500; }

/* 大見出し — 行送りは詰める */
.c-heading_01 { font-size: 40px; font-weight: 700; line-height: 1.35; }

/* 代表メッセージだけ極端に開く */
.p-message_head { font-size: 36px; font-weight: 700; line-height: 2.4; }

/* ボタン — 行送り 1.0 ＋ 上下パディングで高さを作る */
.c-nav_01 a { font-size: 16px; font-weight: 700; line-height: 1; padding: 0 28px; }
```

### 3.6 禁則処理・改行ルール

- 「ヤッホーブルーイング」「よなよなエール」「水曜日のネコ」「インドの青鬼」
  「僕ビール君ビール」などの商品名は途中で折らない
- 見出しは和文行と欧文行の**2行構成**が基本（「会社情報 / About YOHO Brewing」）。
  1行に混ぜない
- 醸造所名は「北海道・北広島」のように**中黒で地名と施設名を繋ぐ**。
  中黒の前後で折らない

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を使わない */
```

- **`palt` を使わない**。`letter-spacing: 0` と合わせて、
  **Noto Sans JP の等幅ベタ組みをそのまま出す**
- 詰め組みをしない代わりに、行送り 1.6 で軽さを出している

### 3.8 縦書き

ヒーロー左下の「SCROLL」インジケーターだけが縦方向のテキスト。
本文・見出しに縦組みは使わない。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| Noto Sans JP | **そのまま**（Google Fonts）| Webフォントとして公開されているため実サイトと同一 |
| Inter | **そのまま**（Google Fonts）| 同上 |

**代替不要。** 実サイトと同じ書体で再現できる数少ないケース。

---

## 4. Component Stylings

### Buttons

**3種すべて `border-radius: 80px` / `border-width: 4px` / 16px / weight 700 / padding `0 28px`。**
違うのは面色と文字色だけ。

**Primary（黄地 — 紺の上でも白の上でも使う）**

```css
.c-nav_01 a {
  background: #F8E133;
  border: 4px solid #F8E133;
  border-radius: 80px;
  color: #112240;
  font-size: 16px;
  font-weight: 700;
  padding: 0 28px;
}
```

用例: 「一覧はこちら」「詳しくはこちら」

**Inverse（紺地×黄枠 — 白い面の上で使う）**

```css
.c-nav_02 a {
  background: #112240;
  border: 4px solid #F8E133;
  border-radius: 80px;
  color: #F8E133;
}
```

用例: 「ご取材申し込みはこちら」

**Outline（透明×紺枠 — 白い面の上で使う）**

```css
.c-nav_03 a {
  background: transparent;
  border: 4px solid #112240;
  border-radius: 80px;
  color: #112240;
}
```

用例: 「詳しくはこちら」（低優先）

いずれも `:after` で右端に **8×14px の矢印**を置く（`right: 16〜20px` / `translateY(-50%)`）。

### Tabs（一覧のカテゴリ切替）

- Border Radius: `44px` / Border: `2px solid #F8E133` / Padding: `0 32px 2px`
- Font: 16px / weight 700
- **アクティブ**: `background: #F8E133` / `color: #112240`
- **非アクティブ**: `background: #112240` / `color: #F8E133`

**ボタンと同じ2色の反転**でアクティブを示す。下線やインジケーターを使わない。

### Language Switch

- Border Radius: `26px` / Padding: `0 0 2px` / 16px / weight 700
- **JP（選択中）**: `background: #F8E133` / `color: #112240` / `border: 1px solid #F8E133`
- **EN**: `background: transparent` / `color: #F8E133` / `border: 1px solid transparent`

### Badges

**Circle Badge（商品写真の上）**

```css
.badge {
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);   /* 写真を透かす */
  border: 6px solid #F8E133;        /* 太い黄の輪 */
  color: #F8E133;
  font-size: 16px;
  font-weight: 700;
}
```

用例: 「軽やかでハッとする味と香り」「トロピカルな香りのヘイジーIPA」——
**ビールの特徴を1行で書いた円**をボトル写真に重ねる。

**Number Badge（醸造工程）**

- `border-radius: 52px`（実質の円）/ `background: #F8E133` / `color: #000000`
- Font: 32px / weight 700 / Border: `1px solid #000000`

**Tag（カテゴリ・地名）**

- `border-radius: 10px` / `background: #112240` / `color: #ffffff`
- Padding: `0 10px`（カテゴリ）/ `7px 10px 8px`（地名）
- Font: 14px / weight 700

### Cards

- Border Radius: **`10px`**（サイト内で最も多い角丸。17箇所）
- Background: `#ffffff` / Border・Shadow: **なし**
- 構成: 写真（上端を 10px で丸める）→ タグ（紺）→ タイトル → 本文（14px / 1.6）

### Banner（適正飲酒）

- Background: `#F1E2B0` / Color: `#112240` / Border Radius: `10px`
- Padding: `0 60px 0 120px` — **左に大きくアキ**（イラストが入る）
- Font: 24px / weight 700

酒類サイトの必須要素。フッター直前に常設する。

### Navigation

**ヘッダー（紺地の1層）**

- 左: ロゴ（`YOHO BREWING` の白抜きロゴ・紺の角丸ブロック `0 0 10px`）
- 中: サイト名テキスト 14px / white
- 右: 「ONLINE STORE / よなよなの里」「RECRUIT」（12〜16px / weight 500〜700 / `#F8E133`）
  ＋ 言語切替ピル ＋ ハンバーガー（黄の面）
- スクロール時: `rgba(17, 34, 64, 0.85)` の半透明に切り替わる

**フッター**

- 紺地に白文字。「お問い合わせ」「製品のこと」等のリンク（16px / 500）
- **20歳未満への配慮文**（14px / 1.6 / white）を必ず置く

### Decoration（斜めの帯）

ヒーロー下端に **黄 `#F8E133` の斜めの帯**（`clip-path` で切った三角）が入り、
写真セクションと次のセクションを繋ぐ。左端に縦の「SCROLL」。

---

## 5. Layout Principles

### Container

| 用途 | Max Width |
|------|-----------|
| **標準コンテナ** | **1200px** |
| **読み物の版面** | **800px** |
| ワイド | 1264px |
| フルブリード | 1440px |

写真セクションはフルブリード、テキストは 800px に絞る**2段の版面**。

### Layout Structure

- 紺地（`body`）の上に、白 / 黄 / ベージュの面を積む1カラム
- トップは「ヒーロー写真＋吹き出し → 斜めの黄帯 → NEWS → 製品 → 会社情報 →
  醸造所 → プレスルーム → 適正飲酒バナー → フッター」

### Grid

- ニュースカード: 3〜4カラム
- 製品（円形バッジ付き）: 4カラム
- 醸造所カード: 2〜3カラム

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 10px |
| M | 20px |
| L | 28px（ボタン左右パディング）|
| XL | 60px |
| 2XL | 120px |

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべて。CSS に `box-shadow` の宣言が1件もない** |

**影を使わない。** 奥行きは次の3つでつくる。

1. **面色の反転** — 紺地の上に白のカード、白地の上に紺のボタン
2. **4px の太いボーダー** — ピル型ボタンの輪郭
3. **`border-radius: 10px`** — カードを地から切り離す

半透明を使うのは**円形バッジの中身 `rgba(0,0,0,.3)`** と
**スクロール時のヘッダー `rgba(17,34,64,.85)`** の2箇所だけ。

---

## 7. Do's and Don'ts

### Do（推奨）

- ページの地色を **`#112240`（濃紺）** にする。白地から始めない
- アクセントは **`#F8E133`（黄）1色**。紺と黄を反転させて階層をつくる
- `font-weight` は **500（本文）と 700（見出し・ボタン・バッジ）の2値**に限る
- `line-height` の既定は **1.6**。読み物の大見出しだけ 2.0〜2.4 に開く
- `letter-spacing` は **0**。`palt` も使わない（ベタ組み）
- ボタンは3種とも `border-radius: 80px` / `border: 4px` / `padding: 0 28px` /
  16px / weight 700 で揃え、**面色と文字色だけ入れ替える**
- カードの角丸は **10px** で統一する
- 商品の特徴は**円形バッジ**（`50%` / `6px solid #F8E133` / `rgba(0,0,0,.3)`）で写真に重ねる
- 見出しは和文＋欧文の2行にする（「会社情報 / About YOHO Brewing」）
- 酒類サイトとして**20歳未満への配慮文と適正飲酒バナー**を必ず置く

### Don't（禁止）

- 紺と黄以外の**有彩色を UI に足さない**（赤・緑・青のアクセントを作らない）
- `box-shadow` を使わない
- ボタンのボーダーを 1px / 2px にしない（**4px**）
- `font-weight: 400` / `600` を使わない
- `letter-spacing` を開けない（0 のまま）
- `palt` をかけない
- タブのアクティブを下線やインジケーターで示さない（**面色の反転**で示す）
- 本文の `line-height` を 1.6 より詰めない
- ヒーローの写真の上に CSS のスクリムを重ねない（円形バッジの半透明だけが例外）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 768px** | **主境界**。1カラム、ナビはドロワー |
| Desktop | ≥ 769px | 標準レイアウト |
| Narrow | ≤ 960px / ≤ 1000px | グリッドのカラム数を落とす |
| Tablet | ≤ 1024px / ≤ 1108px | ヘッダーのユーティリティを畳む |
| Wide | ≥ 1200px | コンテナを 1200px で固定 |

**`max-width: 768px` と `min-width: 769px` の対で書かれており、
モバイルとデスクトップを 768/769px で明確に分ける**（合計 40 箇所以上）。

### モバイルでの変化

- ヘッダーのユーティリティ（ONLINE STORE / RECRUIT）→ ドロワーに格納
- カードグリッド 4カラム → 1〜2カラム
- 版面 1200px / 800px → 画面幅 - 左右パディング
- **`font-size: 16px` / `line-height: 1.6` は変えない**（リセットでモバイルにも同値を再指定）
- ボタンは横幅いっぱいに伸ばす（`border-radius: 80px` は維持）

### タッチターゲット

- ボタンは `line-height: 1` ＋ 上下パディングで高さを確保する。
  モバイルでは 48px 以上にする（4px のボーダーが上下に乗るため実効は +8px）
- 円形バッジは装飾。タップ領域にしない

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Page Background: #112240（--yh-navy。ページ地色）
Accent:          #F8E133（--yh-yellow）
Soft Yellow:     #EABF4B（--yh-soft-yellow）
Beige:           #F1E2B0（--yh-profile-bg）/ #e8daaa（--yh-beige）
Ink:             #000000（白・黄の上）
On Navy:         #ffffff
Overlay:         rgba(0, 0, 0, 0.3)（円形バッジ）
Header Scrim:    rgba(17, 34, 64, 0.85)
Main Font:       "Noto Sans JP", sans-serif（font-optical-sizing: auto）
Latin Font:      "Inter", sans-serif（.inter クラスで明示）
Base Size:       16px
Line Height:     1.6（既定）/ 1.0（ボタン）/ 2.0（フォーム・メッセージ本文）/ 2.4（メッセージ見出し）
Letter Spacing:  0（明示指定。normal ではない）
Font Weight:     500（本文）/ 700（見出し・ボタン・バッジ）の2値のみ
Border Radius:   80px（ボタン）/ 44px（タブ）/ 26px（言語切替）/ 10px（カード・タグ）/ 50%（バッジ）
Border Width:    4px（ボタン）/ 2px（タブ）/ 6px（円形バッジの輪）
Shadow:          none（宣言ゼロ）
palt:            off
Container:       1200px（標準）/ 800px（読み物）/ 1264px（ワイド）
Breakpoints:     768px / 769px（主境界）/ 960px / 1000px / 1024px / 1108px / 1200px
```

### プロンプト例

```
ヤッホーブルーイング（YOHO BREWING）のデザインシステムに従って、製品一覧ページを作成してください。
- ページの地色は濃紺 #112240。その上に白いカード面を置く
- アクセントは黄 #F8E133 の1色。紺と黄以外の有彩色を使わない
- フォントは "Noto Sans JP", sans-serif の1本（font-optical-sizing: auto）
  欧文の見出し・数字だけ "Inter", sans-serif を明示的に当てる
- 本文は 16px / font-weight 500 / line-height 1.6 / letter-spacing 0
- 見出しは font-weight 700。40px→line-height 1.35、32px→1.375、24px→1.375
- font-weight は 500 と 700 の2値だけ。400 も 600 も使わない
- palt は使わない。letter-spacing は 0 のままベタ組み
- ボタンは3種。すべて border-radius 80px / border-width 4px / padding 0 28px /
  16px / weight 700 / line-height 1 で、面色と文字色だけ入れ替える:
    Primary  背景 #F8E133 / 枠 4px solid #F8E133 / 文字 #112240
    Inverse  背景 #112240 / 枠 4px solid #F8E133 / 文字 #F8E133
    Outline  背景 transparent / 枠 4px solid #112240 / 文字 #112240
  右端に 8×14px の矢印を :after で置く
- カテゴリタブは border-radius 44px / border 2px solid #F8E133 / padding 0 32px 2px。
  アクティブは黄地×紺文字、非アクティブは紺地×黄文字（下線は使わない）
- 商品カードは border-radius 10px、影なし・枠なし。カテゴリタグは
  背景 #112240 / 文字 #ffffff / radius 10px / padding 0 10px / 14px / weight 700
- 商品写真の上に円形バッジを重ねる:
  border-radius 50% / background rgba(0,0,0,.3) / border 6px solid #F8E133 /
  color #F8E133 / 16px / weight 700。中身はビールの特徴を1行で
- box-shadow は一切使わない
- 版面は写真セクションがフルブリード、テキストは 800px、標準コンテナは 1200px
- 見出しは和文＋欧文の2行（例: 「クラフトビール一覧」の下に「Beer Lineup」）
- 酒類サイトなので、フッター直前に #F1E2B0 のベージュ地・radius 10px の
  「適正飲酒の取り組み」バナーと、20歳未満への配慮文を必ず置く
```
