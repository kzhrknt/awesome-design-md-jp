# DESIGN.md — 大阪芸術大学（Osaka University of Arts）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-27 / 対象: `https://www.osaka-geidai.ac.jp/`, `/preparatory_student`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 黒地（`#212121`）に蛍光イエロー（`#ecff00`）。角を丸めず、影を落とさず、面の色とグラデーション文字だけでコントラストを作る
- **密度**: 中。本文 18px に `line-height: 1.67`、ナビは 12〜14px。`--margin-*` の 8 段スケールで余白を刻む
- **キーワード**: ダーク固定、蛍光イエロー 183 回、角丸ほぼ無し、影 0 種、グラデーション文字

**このサイトの核心は5つある。**

1. **ライト／ダークの切り替えではなく、ダークが唯一のテーマ。** `body { background: #212121 }`（`--baseDarkGray`）で、文字は白が **94/138 要素**。`prefers-color-scheme` のブロックは 1 件も無い
2. **蛍光イエロー `#ecff00` が全体を支配する。** `var(--primary)` の参照が CSS 全文で **183 回**（白 `--white` の 203 回に次ぐ 2 位）。面・文字・枠・ホバーのすべてがこの 1 色で、**他に彩度のある色はピンク `#ff67d7`（25 回）だけ**
3. **書体の変数が 3 つあるのに、中身が全部同じ。** `--font-family-main` / `--font-family-hind` / `--font-family-midashigo` の 3 つとも値は **`'Zen Kaku Gothic New', sans-serif`**。
   名前が示すはずの Hind（欧文）も A-OTF 見出ゴ MB31 Pr6N も実体として当たっていない。しかも **`--font-family-main` は参照 0 回**
4. **Adobe Fonts の「A-OTF 見出ゴ MB31 Pr6N」を読み込んだまま、1 要素も使っていない。** Typekit（`use.typekit.net/rst6btm.js`）経由で `a-otf-midashi-go-mb31-pr6n` が **`document.fonts` 上 `loaded`**、フォント要求も実際に発生している。
   それでも CSS 側の呼び出しは Typekit が吐く `.tk-a-otf-midashi-go-mb31-pr6n` ユーティリティクラスだけで、**可視要素の `font-family` は 2 ページとも Zen Kaku Gothic New が 124/138 要素**。CDP の `CSS.getPlatformFontsForNode` でも全要素 `Zen Kaku Gothic New` が返る
5. **角丸と影を使わない。** `border-radius` はトップが `2px` 31 要素（カテゴリタグ）とロゴの `50px` 1 件、下層は `50%` 1 件だけ。**`box-shadow` は 2 ページとも 0 種**。立体感を一切作らず、面の色だけで前後を表す

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| トークン | 値 | 役割 | 実測 |
|----------|-----|------|------|
| `--primary` | **`#ecff00`** | 蛍光イエロー。面・文字・枠・ホバーのすべて | 面 10 要素 ／ 文字 15 要素 ／ **var 参照 183 回** |
| `--secondary` | **`#ff67d7`** | ピンク。グラデーションの相方、カテゴリ見出し | 文字 1 要素 ／ var 参照 25 回 |
| `--primary-a25` | `rgba(236, 255, 0, 0.25)` | ホバーの薄い面 | var 参照 12 回 |
| `--primary-a85` | `rgba(236, 255, 0, 0.85)` | 固定バナーの地 | 1 要素 |
| `--primary-dark` | `#d7ca00` | イエローのプレス状態 | var 参照 2 回 |
| `--primary-extradark` | `#2b2c1e` | イエローを黒に沈めた面 | var 参照 1 回 |

**宣言はあるが使われていない色（Don't に入れる）**

- `--primary-a05`（`rgba(236,255,0,.05)`）… **var 参照 0 回**
- `--primary-vivid-dark`（`#e6c200`）… **var 参照 0 回**。ただし**同じ値がグラデーションにハードコードで 2 件出ている**（`linear-gradient(to right, #e6c200, #ff67d7)`）
- `--pink`（`#f364cd`）… var 参照 2 回だが可視 0 要素。**ピンクは `--secondary` の `#ff67d7` が実装**

### Neutral（ニュートラル）

- **Background** (`#212121` = `--baseDarkGray`): ページ背景。`body` が持つ
- **Surface Dark** (`#000000` = `--baseBlack`): カード・タグの面（**var 参照 114 回**）
- **Surface Near-black** (`#050505` = `--black`): ボタン・カードの面（実測 5〜6 要素）
- **Text Primary** (`#ffffff` = `--white`): 本文・見出し（実測 **94 要素で最多**、var 参照 203 回）
- **Text Secondary** (`#999999` = `--gray`): 日付・カテゴリ・フッター（実測 36 要素）
- **Text on Yellow** (`#000000`): イエローの面に載る文字は**純黒**
- **Border / Tag Surface** (`#dddddd` = `--gray02`): カテゴリタグの面（実測 19 要素）
- **Thin Gray** (`#f4f4f4` = `--thinGray`): タグの文字（実測 10 要素）
- **Dark Gray 系**: `--ExtradarkGray: #424242`（14 回）／ `--MiddleDarkGray: #4f4f4f`（4 回）／ `--darkGray: #6a6268`（**37 回**。わずかに赤紫寄りのグレー）

### 黒の透明度ランプ（8 段）

`--baseBlack-a24 / -a50 / -a60 / -a70 / -a75 / -a80 / -a85 / -a90`。**写真の上に文字を置くときの覆いの濃さ**を 8 段で持つ。ヒーローは `rgba(0,0,0,.32)`（変数ではなく直書き）

### グラデーション（文字に流す）

```css
/* background-clip: text で文字そのものに流す。面には使わない */
background: linear-gradient(to right, #ecff00, #ff67d7);              /* 8 要素（下層） */
background: linear-gradient(to right, #ff67d7, #ecff00);              /* 1 要素・逆向き */
background: linear-gradient(to right, #e6c200, #ff67d7);              /* 2 要素・暗いイエロー */
background: linear-gradient(to right bottom, #ecff00, #ff67d7);       /* 1 要素・面 */
```

- **方向が 4 種、配色が 3 種ある。角度と停止位置を丸めない**
- 「Topics」「About」「Information」といった**欧文の見出しと、セクションのリード文**に使う

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Zen Kaku Gothic New（Google Fonts）**のみ**。実測 **124/138 要素で 100%**
- **明朝体**: 使用しない
- **A-OTF 見出ゴ MB31 Pr6N（Adobe Fonts）は読み込まれているが、可視 0 要素**（下記 3.3 参照）

### 3.2 欧文フォント

- 欧文専用の書体を持たない。`--font-family-hind` という変数名は残っているが、中身は Zen Kaku Gothic New
- 数字・欧文も Zen Kaku Gothic New の従属欧文で組む

### 3.3 font-family 指定

```css
/* 実サイトの変数宣言。3 つとも中身が同じ */
:root {
  --font-family-main:      'Zen Kaku Gothic New', sans-serif;  /* 参照 0 回 */
  --font-family-hind:      'Zen Kaku Gothic New', sans-serif;  /* 参照 6 回 */
  --font-family-midashigo: 'Zen Kaku Gothic New', sans-serif;  /* 参照 15 回 */
}
body { font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 14px; }
```

```html
<!-- Google Fonts。この 5 ウェイトを宣言するが loaded は 400 / 500 / 700 の 3 本 -->
<link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap">
<!-- Adobe Fonts。読み込まれるが 1 要素も使われていない -->
<script src="https://use.typekit.net/rst6btm.js"></script>
```

- **変数名に惑わされない。`--font-family-midashigo` は見出ゴではなく Zen Kaku Gothic New**
- **A-OTF 見出ゴを再現しない。** 実装は Zen Kaku Gothic New 一本で、見出ゴを当てると別サイトになる
- Zen Kaku Gothic New は Adobe Fonts でもローカルでも出ないので、**preview では Google Fonts から読む**

### 3.4 文字サイズ・ウェイト階層

**サイズは `--fontsize-*` と `--fontline-*` のトークンで管理され、PC と SP で別名を持つ。**

| トークン | PC | SP | 対になる行送り（PC / SP） | 参照回数（PC / SP） |
|----------|-----|-----|--------------------------|---------------------|
| `--fontsize-pagetitle` | **56px** | 32px | 68px / 40px | 2 / 1 |
| `--fontsize-xl` | **48px** | 32px | 62px / 44px | 3 / 3 |
| `--fontsize-l` | **24px** | 24px | 34px / 34px | 10 / 3 |
| `--fontsize-m` | **18px** | 16px | 30px / 28px | **55 / 61** |
| `--fontsize-s` | **14px** | 14px | 22px / 26px | 26 / 42 |
| `--fontsize-xs` | **12px** | 12px | 16px / 22px | 4 / 5 |

- **`clamp()` を使わない。** 幅ごとの可変ではなく、**変数名を `--fontsize-m` / `--fontsize-sp-m` と差し替える**方式
- 実測サイズ（下層）: 18px 65 要素 ／ 14px 36 ／ 12px 21 ／ 40px 5 ／ 24px 4 ／ 48px 3 ／ 56px 1
- **ウェイトは 400 / 500 / 700 の 3 段**（下層の実測 700:80 / 500:35 / 400:23）。
  宣言は `wght@300;400;500;700;900` だが、**`document.fonts` で `loaded` なのは 400 / 500 / 700 の 3 本だけ**。300 と 900 を当てても落ちてこない
- CDP では weight 500 の要素が `Zen Kaku Gothic New Medium` と別ファミリー名で返る。**500 は実在する**

### 3.5 行間・字間

- **行送りは比率ではなく px のトークン**で持つ（`--fontline-m: 30px` が `--fontsize-m: 18px` に対応 → 比率 1.67）。
  **「サイズ × 比率」ではなく「サイズと行送りを対で選ぶ」**設計
- `body` の `line-height` は **16.1px（= 14px × 1.15）**。これは normalize 由来の既定値で、**各要素が宣言し直さないと行が詰まる**
- 実測の行間比（下層）: `1.86` 29 ／ `1.50` 28 ／ `1.67` 26 ／ `1.33` 14 ／ `1.57` 8 ／ `1.15` 7
- **字間はほぼ px の直書き。`em` に読み替えない。**
  実測はトップが `0.4px` 60 ／ `normal` 45 ／ `0.8px` 14 ／ `0.5px` 4 ／ `1.1px` 1、
  下層が **`normal` 115** ／ `0.4px` 10 ／ `0.8px` 9 ／ `0.5px` 4
- **ページによって字間の配り方が正反対**になる。トップはカテゴリタグやナビに `0.4px` を広く配り、下層は本文が全部 `normal`。**1 ページだけ測って「このサイトの字間」と書かない**
- CSS の宣言は 82 件で、`0.33px` `0.4px` `0.5px` `0.6px` `0.7px` `0.8px` `1px` `1.1px` `1.8px` `4px` と **px が 10 種**、`em` は `0.05em` の 1 件だけ

### 3.6 禁則処理・改行ルール

- `word-break` / `auto-phrase` の宣言なし。ブラウザ既定に任せる
- ヒーローのコピーは `<br>` で 2 行に手割り（`境界なんかない` / `世界が注目するアートの最先端を走れ`）

### 3.7 OpenType 機能

- **`font-feature-settings` の宣言が CSS 全文に 0 件。** 実測も 0 要素
- Zen Kaku Gothic New は `palt` を持つが**使っていない**。足すと字送りが変わるので、既存の行割りと合わなくなる

### 3.8 縦書き

- 縦組みは使用しない（`writing-mode` の実測 0 要素）

---

## 4. Component Stylings

### Buttons

```css
/* Primary — 蛍光イエローの面に黒文字。角は丸めない */
.btn-primary {
  background: var(--primary);      /* #ecff00 */
  color: #000000;
  font-size: 18px;
  font-weight: 700;
  line-height: 23.4px;             /* 1.3 */
  border: 1px solid var(--primary);
  border-radius: 0;                /* ← 角丸なし */
}

/* Inverse — 黒の面にイエロー文字 */
.btn-inverse {
  background: #000000;
  color: var(--primary);
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  border: 1px solid #000000;
  border-radius: 0;
}

/* Outline — 白地にイエローの枠、文字は黒 */
.btn-outline {
  background: #ffffff;
  color: #000000;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.5px;
  border: 2px solid var(--primary);
  border-radius: 0;
}
```

- **3 種とも `border-radius: 0`**。角丸のボタンは存在しない
- ヘッダーの「受験生の方」ボタンだけ `font-size: 14px; letter-spacing: 0.5px; line-height: 23.94px`

### Badges / Chips

```css
.category-tag {
  background: #dddddd;          /* または #000000 */
  color: #999999;               /* #dddddd の面には #999999、#000000 の面には #f4f4f4 */
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;         /* 一覧では 18px */
  letter-spacing: 0.4px;
  border-radius: 2px;        /* 実測 31 要素。このサイト唯一の角丸 */
}
```

### Cards

- 面は `#000000` または `#050505`。**角丸なし・影なし**。写真の上には `--baseBlack-a*` の覆いを重ねる

### グラデーション文字

```css
.gradient-text {
  background: linear-gradient(to right, #ecff00, #ff67d7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
}
```

---

## 5. Layout Principles

### Spacing Scale

**`--margin-*` の 8 段。これ以外の余白を作らない。**

| トークン | 値 | 参照回数 |
|----------|-----|----------|
| `--margin-xmini` | 8px | 13 |
| `--margin-mini` | 16px | 53 |
| `--margin-xxs` | 24px | 23 |
| `--margin-xs` | 32px | 17 |
| `--margin-s` | 40px | 51 |
| `--margin-m` | **64px** | **75（最多）** |
| `--margin-l` | 80px | 11 |
| `--margin-xl` | 120px | 7 |

### Container

```css
--layout-inner: 1280px;   /* 参照 24 回。本文の最大幅 */
--layout-main:  916px;    /* 2 カラム時の本文 */
--layout-side:  300px;    /* サイドバー */
```

### Grid

- 実測の `gap` は `20px` 3 件 ／ `18px 32px` 2 件 ／ `16px` 1 件 ／ `4px` 1 件。**`gap` はほとんど使わず `--margin-*` で間隔を作る**

### アニメーション

```css
--transition-duration: 0.3s;                                   /* 参照 54 回 */
--animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);  /* 参照 9 回 */
--hover-opacity: 0.8;                                          /* 参照 6 回 */
```

- **ホバーは色を変えず `opacity: 0.8` に落とす**のが既定

---

## 6. Depth & Elevation

- **`box-shadow` は 2 ページとも 0 種。影を 1 つも使わない**
- 前後関係は (a) 面の色（`#212121` → `#000000` → `#050505`）(b) 黒の透明度ランプ（`--baseBlack-a24`〜`-a90`）(c) イエローの枠、の 3 つだけで表す
- `border-radius` もほぼ使わない（タグの `2px` 31 要素 ／ ロゴの `50px` 1 要素 ／ 下層の `50%` 1 要素）

---

## 7. Do's and Don'ts

### Do（推奨）

- 地色は **`#212121`**、文字は **`#ffffff`**、アクセントは **`#ecff00` 1 色**
- **ボタンもカードも `border-radius: 0`。角丸はカテゴリタグの `2px` だけ**
- **影を使わない。** 立体は面の色と透明度ランプで作る
- サイズは `--fontsize-*`（PC）と `--fontsize-sp-*`（SP）を**変数名ごと差し替える**。`clamp()` にしない
- 行送りは `--fontline-*` の px を**サイズと対で**選ぶ
- 余白は `--margin-*` の 8 段から選ぶ（既定は `--margin-m: 64px`）
- グラデーション文字は `background-clip: text` ＋ `linear-gradient(to right, #ecff00, #ff67d7)`
- ホバーは `opacity: 0.8` と `transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)`

### Don't（禁止）

- **A-OTF 見出ゴ MB31 Pr6N を実装しない。** 読み込まれてはいるが可視 0 要素で、実体は Zen Kaku Gothic New
- **`--font-family-midashigo` という変数名から書体を推測しない。** 3 つの書体変数は中身が全部同じ
- **`font-weight: 300` / `900` を当てない。** 宣言はあるが `loaded` なのは 400 / 500 / 700 の 3 本だけ
- **`letter-spacing` を `em` に読み替えない。** 宣言 82 件のうち 81 件が px で、サイズが変わっても値は変わらない
- **トップの字間（`0.4px` 60 要素）を下層にも当てない。** 下層は `normal` が 115/138
- **`font-feature-settings: "palt"` を足さない**（宣言 0 件）
- **角丸と影を足さない。** `box-shadow` は 2 ページとも 0 種
- **`--primary-a05` と `--primary-vivid-dark` を使わない**（var 参照 0 回）。`#e6c200` が要るときはグラデーションに直書きする
- **`--pink: #f364cd` を使わない。** 実装のピンクは `--secondary: #ff67d7`
- **本文に康熙部首を混ぜない。** 実サイトのニュース見出しに `⼤`（U+2F24・康熙部首）が 2 件混入している（「モレスキン×⼤阪芸術⼤学共同プロジェクト」）。字形はほぼ同じだが**検索・コピー・読み上げが壊れる**ので、通常の「大」（U+5927）で書く

---

## 8. Responsive Behavior

### Breakpoints

| クエリ | 件数 | 用途 |
|--------|------|------|
| `(max-width: 767px)` | 7 | スマートフォン |
| `(min-width: 768px)` | 4 | タブレット以上 |
| `(max-width: 1280px)` | 4 | `--layout-inner` の折り返し |
| `(min-width: 768px) and (max-width: 1024px)` | 2 | タブレット |
| `(max-width: 896px) and (orientation: landscape)` | 5 | 横向きスマートフォン |
| `(hover: hover)` | 1 | ホバー可能な環境だけ |

- **`html: 16px` / `body: 14px` は 1920〜374px の 15 幅で 1px も動かない。** ルートは流体ではない
- **`orientation: landscape` のクエリを 7 件持つ**（キャンパスマップの表示調整）。縦横の向きでレイアウトを変える数少ないサイト

### タッチターゲット

- ボタンの実高は `line-height: 23.4〜30px` + padding。カテゴリタグは `line-height: 18〜24px` と小さい

### フォントサイズの調整

- **`--fontsize-sp-*` に差し替える**（`m: 18px → 16px`、`xl: 48px → 32px`、`pagetitle: 56px → 32px`）
- 行送りも `--fontline-sp-*` に差し替える（`m: 30px → 28px`、`s: 22px → 26px`）。
  **`s` だけ SP のほうが行送りが広い**（22px → 26px）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体: 'Zen Kaku Gothic New', sans-serif（Google Fonts・1 本のみ）
      wght@300;400;500;700;900 を宣言するが、使えるのは 400 / 500 / 700
地色: #212121（body）/ 面は #000000 と #050505
文字: #ffffff（本文）/ #999999（日付・補足）/ イエローの面には #000000
アクセント: #ecff00（蛍光イエロー・1 色）/ #ff67d7（ピンク・グラデーションの相方）
グラデーション文字: linear-gradient(to right, #ecff00, #ff67d7) + background-clip: text
サイズ: --fontsize-pagetitle 56 / xl 48 / l 24 / m 18 / s 14 / xs 12（PC）
        SP は --fontsize-sp-* に差し替え（32 / 32 / 24 / 16 / 14 / 12）
行送り: --fontline-* を px で対にする（m: 30px ↔ 18px = 1.67）
字間: px の直書き（0.4px / 0.5px / 0.8px / 1.1px）。下層本文は normal
余白: --margin- xmini 8 / mini 16 / xxs 24 / xs 32 / s 40 / m 64 / l 80 / xl 120
コンテナ: --layout-inner 1280px
角丸: 0 が既定。タグのみ 2px
影: 0 種（使わない）
palt: 使わない（宣言 0 件）
ホバー: opacity .8 / transition .3s cubic-bezier(.215,.61,.355,1)
```

### プロンプト例

> 大阪芸術大学の DESIGN.md に従って、学科一覧のカードグリッドを作ってください。
> 地色 `#212121`、カードの面は `#000000`、文字は白。書体は Google Fonts の
> `'Zen Kaku Gothic New', sans-serif` 1 本で、ウェイトは 400 / 500 / 700 だけ使うこと。
> 見出しは `--fontsize-xl: 48px` ＋ `--fontline-xl: 62px`、本文は `18px / 30px`。
> カテゴリタグだけ `border-radius: 2px` で、カードもボタンも角は丸めない。
> `box-shadow` は使わず、写真の上の文字は `rgba(0,0,0,.6)` の覆いで読ませる。
> セクション見出しは `linear-gradient(to right, #ecff00, #ff67d7)` を
> `background-clip: text` で文字に流す。`letter-spacing` は px で、本文は `normal`。
