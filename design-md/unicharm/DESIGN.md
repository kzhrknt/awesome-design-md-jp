# DESIGN.md — ユニ・チャーム (Unicharm)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-18 / 対象: `https://www.unicharm.co.jp/ja/home.html`, `/ja/company/topmessage.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **Web フォントを 1 本も使わず、OS の游ゴシックだけで組む。** 面はほぼ白一色で、塗るのはフッターのクリーム帯と角丸 40px のグレーの pill だけ。影を一切落とさない、素材メーカーの実直なコーポレートサイト
- **密度**: ゆったり。本文 16px・行間 1.7 の 1 サイズ主義で、見出しも 20/21/28px の 3 段しかない
- **キーワード**: OS ローカル書体のみ、白地、影ゼロ、角丸 40px の pill、1280px グリッド

**このサイトの核心は 5 つある。**

1. **Web フォントを 1 本も読み込まない。** `@font-face` は CSS 全文に **0 件**。`distributions.fontFamily` は 2 ページとも**たった 1 種類のスタック**で 100%（トップ 122/122 要素・下層 63/63 要素）。CDP の `CSS.getPlatformFontsForNode` で実描画書体を取ると、和文要素はすべて **`YuGothic`**（macOS の游ゴシック体）に解決される
2. **それなのに Google Fonts で Noto Sans JP を読み込ませている。** `@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap)` があり `document.fonts` にも `Noto Sans JP 400 / 700` が載るが、**CSS 全文に `Noto Sans JP` という `font-family` 指定が 1 度も無く**（grep 0 件）、可視要素も **0 件**、フォントファイルの要求も **0 件**（実際に飛んだ 2 件は FontAwesome と検索ウィジェットの欧文）。**宣言だけで呼び出し側に書かれていない**
3. **Windows の游ゴシック問題は「スタック順」だけで解いている。** `@font-face` による別名方式を使わず、`游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック, "Yu Gothic", …` と **Medium を Regular より前に置く**。macOS は 1〜2 番目、Windows は 3〜4 番目が当たる
4. **字間は `body` に `0.05em` を 1 回書いて、`0.8px` という絶対値で全部に降ろす。** 可視 122 要素中 **101 要素が `0.8px`**。`em` 宣言は親の `font-size`（16px）で px に解決されてから継承されるので、**下層の 50px の h1 でも字間は 0.8px のまま**（= 0.016em）。大きい文字ほど字間が消える
5. **ヒーローの大見出しは画像。** ファーストビューの「いっしょなら、なんでもできそう。いつまでも。／ Love Your Possibilities」は 1280×670 の JPG が 9 枚回るカルーセルで、**ヒーロー帯の最大テキストは 16px のナビゲーション**しかない。`alt` は `Love Your Possibilities` `共生社会の実現をめざして` と正しく入っている

**`font-feature-settings` は 2 ページとも 0 要素**、`writing-mode` も 0 要素、**`box-shadow` はサイト本体に 1 つも無い**（唯一の影は Cookie バナー）。**CSS Custom Properties は 0 個**（読めなかったシート 0 枚・`body` 宣言 0 個まで確認済み）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| ブランドオレンジ | `#f08100` | メニューボタン・PAGE TOP の丸ボタン（`border-radius: 50%`）の面。**本文やリンクには一切使わない** |
| ブランドネイビー | `#1e2766` | ヒーローカルーセルの再生/停止・インジケーターの面 |
| リンク青 | `#3860be` | 本文中のテキストリンク |

> **ブランド色が「面」として出るのはアイコンボタンとカルーセル操作だけ。** ロゴの青とオレンジはすべて画像で、CSS の色としては出てこない。**ページの印象は白地とグレーで作られている**

### Semantic（意味的な色）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| CTA の面（pill） | `#e8e8e8` | 573×81px / `border-radius: 40px` / `padding: 24px 30px` / 18px・weight 700 |
| 入力欄の面 | `#f5f5f5` | サイト内検索ボックス（`border-radius: 18px`） |
| フッターのナビ帯 | `#fdf9f1` | 1440×328px のクリーム色の帯。**サイト唯一の有彩色の大面積** |

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| 本文・見出し | `#262626` | トップ 111 要素・下層 59 要素でいずれも最多。**純黒は使わない** |
| 補助テキスト | `#696969` | リード文・注記 |
| 小見出しのラベル | `#555555` | カード内の分類ラベル |
| ページ背景 | `#ffffff` | `body` に直接指定。2 ページとも根拠 `body` |
| 面（カード） | `#ffffff` | カードも白地で、枠も影も付けずに余白だけで区切る |

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: 游ゴシック体 / 游ゴシック Medium（OS ローカル）→ ヒラギノ角ゴ Pro → メイリオ → ＭＳ Ｐゴシック
- **明朝体**: 使用しない（セリフ系の和文は 2 ページとも可視 0 要素）

> **ヒラギノの指定は `Pro` であって `ProN` ではない。** `ProN` は JIS2004 字形、`Pro` は JIS90 字形で、「辻」「葛」などの字形が変わる。実サイトのまま書き写すが、**新規に組むなら `ProN` を使うほうがよい**

### 3.2 欧文フォント

- **サンセリフ**: 和文スタックの欧文グリフをそのまま使う。**欧文専用の書体を 1 つも指定していない**（游ゴシック体の欧文が出る）
- **セリフ / 等幅**: 使用しない

### 3.3 font-family 指定

```css
/* 全要素共通。サイト内にこのスタック 1 種類しか存在しない */
font-family: 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
             游ゴシック, "Yu Gothic", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
             メイリオ, Meiryo, "ＭＳ Ｐゴシック", sans-serif;
```

**フォールバックの考え方**:
- **Medium を Regular より前に置く**のがこのスタックの要。macOS は `游ゴシック体` / `YuGothic`（Regular）に当たり、Windows は `"游ゴシック Medium"` / `"Yu Gothic Medium"` に当たる。`@font-face` を 1 行も書かずに Windows の游ゴシックが細く出る問題を避けられる
- 代償として **macOS は Regular・Windows は Medium で出るので、太さが OS 間で揃わない**。厳密に揃えたい案件では `@font-face` でローカル別名を作る方式を選ぶ
- 末尾の generic family は `sans-serif` 1 つ。**途中に generic を挟んでいない**ので、スタックの全候補が生きている

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | 游ゴシック体 | 50px | 700 | 60px (1.20) | 0.8px | 下層ページの h1（「トップメッセージ」）。**トップページに h1 の実体は無い** |
| Heading 1 | 游ゴシック体 | 28px | 700 | 39.2px (1.40) | 0.8px | セクション見出し（9 要素） |
| Heading 2 | 游ゴシック体 | 22px | 700 | 30.8px (1.40) | 0.8px | カテゴリ見出し（7 要素） |
| Heading 3 | 游ゴシック体 | 21px / 20px | 700 | 29.4px / 28px (1.40) | 0.8px | 小見出し |
| CTA | 游ゴシック体 | 18px | 700 | 30.6px (1.70) | 0.8px | pill ボタンのラベル |
| Body | 游ゴシック体 | 16px | 400 | 27.2px (1.70) | 0.8px | 本文。可視 74 要素で最多 |
| Caption | 游ゴシック体 | 14px | 400 | 23.8px (1.70) | 0.8px | 補足・ユーティリティナビ |
| Small | 游ゴシック体 | 13px / 12px | 400 | 1.70 | 0.8px | フッターリンク・注記 |

> **ウェイトは 400 と 700 の 2 段だけ**（トップは 400 が 60 要素・700 が 60 要素でちょうど半々）。**600 が 2 要素だけ出るが、これは Cookie バナーのボタンでサイト本体ではない**。500 は 1 要素も無い

### 3.5 行間・字間

- **本文の行間**: `line-height: 1.7`（**無単位**。`body` に宣言。CSS には `1.5` と `1.7` の 2 宣言があり後勝ちで `1.7`）。16px なら 27.2px
- **見出しの行間**: `1.40`（28px → 39.2px、21px → 29.4px）。Display だけ `1.20`
- **本文の字間**: `body { letter-spacing: 0.05em }` ＝ **`0.8px` が絶対値として全子孫へ降りる**
- **ナビゲーションの字間**: `-0.005em` ＝ `-0.08px`（グローバルナビの 8 要素だけ、わずかに詰める）

```css
/* 実サイトの書き方。em を body に 1 回だけ書いて px で継承させる */
body {
  font-size: 16px;
  line-height: 1.7;          /* 無単位。各要素が自分のサイズで再計算する */
  letter-spacing: 0.05em;    /* 16px × 0.05 = 0.8px という絶対値が降りる */
}
```

> **`line-height` と `letter-spacing` が同じ `body` 宣言にあるのに、継承のしかたが正反対。** `line-height: 1.7` は無単位なので各要素が自分の `font-size` で掛け直すが、`letter-spacing: 0.05em` は 16px で px に解決されてから降りる。**結果、50px の見出しは行間 1.20 で組み直されるのに、字間だけ 0.8px（0.016em）のまま**になる

### 3.6 禁則処理・改行ルール

```css
body {
  word-break: break-word;   /* 実サイトの指定。overflow-wrap: break-word の別名 */
}
```

- `word-break: break-word` は**非標準の別名**で、実際には `overflow-wrap: break-word` として扱われる。長い英単語・URL だけを折り返し、日本語の禁則処理は既定のまま残る
- `line-break` / `overflow-wrap` の明示指定は無い
- **`word-break: break-all` ではない。** 熟語の途中では折らない

### 3.7 OpenType 機能

```css
/* 実サイトは font-feature-settings を 1 要素にも当てていない（実測 0 件） */
```

- **`palt` は 2 ページとも 0 要素。** CSS に出てくる `font-feature-settings` はリセット由来の `inherit` だけ
- **ただし游ゴシック体は `palt` を持っており、足せば効く。** 実スタック・40px・weight 400 で隠し要素の幅を測ると `normal` **1027.61px** → `"palt"` **920.64px**（**−10.41%**）、`"halt"` は **947.61px**（−7.79%）
- **だから「効かないから使っていない」ではなく「効くのに使っていない」。** 再現時に親切のつもりで `palt` を足すと、**見出しの字面が 1 割詰まって別物になる**

### 3.8 縦書き

```css
/* 使用しない。writing-mode は 2 ページとも 0 要素 */
```

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary（pill）**
- Background: `#e8e8e8`
- Text: `#262626`
- Padding: 24px 30px
- Border Radius: 40px
- Font Size: 18px
- Font Weight: 700

**Icon（円形）**
- Background: `#f08100`
- Size: 円形（`border-radius: 50%`）
- 用途: ハンバーガーメニュー / PAGE TOP

**Carousel control**
- Background: `#1e2766`
- Border Radius: 50%（再生・停止）/ 30px（前へ・次へ）

### Badges / Chips

- カテゴリラベルは面を塗らず、`#555555` の 14px・weight 700 の文字だけで表す

### Inputs

- Background: `#f5f5f5`
- Border: なし
- Border Radius: 18px
- Height: 34px
- Font Size: 16px

### Cards

- Background: `#ffffff`
- Border: なし
- Border Radius: 0px
- Shadow: **なし**
- 区切りは余白と 1px の罫線だけで作る

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 30px |
| XXL | 60px |

> CSS 変数が 0 個なので**スケールは明示されていない**。上表は実測値（`padding: 24px 30px` など）から読み取った実用値

### Container

- Max Width: 1280px（14 要素で最多）
- サブコンテナ: 1180px / 720px
- Padding (horizontal): 20px

### Grid

- Columns: 3 列（`width: 33.3333%`）と 4 列（`width: 25%`）。**CSS Grid ではなく `%` 指定の float / flex**
- Gutter: `gap` の宣言は 0 件。余白は `margin` と `padding` で作る

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **サイト本体のすべての要素** |
| — | `rgba(0,0,0,0.2) 0px 0px 18px 0px` | Cookie バナー（OneTrust 由来。サイトの設計ではない） |

> **このサイトには影が存在しない。** 可視要素の `box-shadow` は 2 ページとも 1 種類しか出ず、その 1 つが CMP のもの。**カードを浮かせたくなっても影を足さない**

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-family` は 1 種類だけを全体に当てる。** このサイトはスタックが 1 本しかなく、見出しも本文も同じ書体で組む
- **Windows 対策は「Medium を Regular より前に置く」だけで済ませる。** `@font-face` を書かない方針ならこれが最短
- `letter-spacing` は `body` に `0.05em` を 1 回だけ書く。**子要素では再宣言しない**（実サイトがそうしている）
- `line-height` は無単位の `1.7` を `body` に、見出しには `1.4` を当て直す
- 本文色は `#262626`。**純黒 `#000000` を使わない**
- CTA は `border-radius: 40px` の pill。面は `#e8e8e8` で、ブランドオレンジは使わない
- 面を区切るときは影ではなく余白と罫線を使う

### Don't（禁止）

- **`palt` を足さない。** 游ゴシック体では **−10.4%** 効いてしまい、見出しの字面が実サイトと別物になる
- **`letter-spacing` を `em` のまま各要素に配らない。** 実サイトは 50px の見出しでも字間 0.8px（0.016em）。`em` を配り直すと大見出しだけ字間が 3 倍に広がる
- **`line-height` を px の絶対値で書かない。** 無単位の `1.7` でないと見出しで行が潰れる
- **Noto Sans JP を足さない。** 実サイトは読み込みだけして 1 文字も使っていない。印象を合わせたいなら OS ローカルの游ゴシックのまま組む
- **ヒラギノを `ProN` に書き換えない**（実サイトは `Pro`）。新規設計で `ProN` を選ぶ場合は、字形が変わることを明記する
- **ウェイトに 500 / 600 を使わない。** 実サイトは 400 と 700 の 2 段だけ
- **影を落とさない。** `box-shadow` はサイト本体に 1 つも無い
- **ヒーローの大見出しを Web フォントで実装しない。** 実サイトは 1280×670 の JPG で、テキストとしては存在しない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | `screen and (max-width: 768px)` が 7 件 ＋ `(max-width: 768px)` が 6 件 |
| Desktop | ≥ 769px | `screen and (min-width: 769px), print` が **41 件で最多**。印刷も同じ扱い |

> **ブレークポイントは 768/769 の 1 本だけ。** タブレット用の中間段は無い

### ルートと本文サイズ

- `html` に `font-size` の宣言が **CSS に 1 件も無い** → **UA 既定の 16px**
- `body { font-size: 16px }`
- **1920 / 1600 / 1440 / 1280 / 1200 / 1080 / 1079 / 1024 / 992 / 834 / 768 / 767 / 600 / 480 / 414 / 390 / 375 / 360 / 320px の 19 幅すべてで `html` も `body` も 16px から 1px も動かない。** 流体スケーリングは使っていない

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- CTA の pill は高さ 81px あり余裕がある

### フォントサイズの調整

- 本文 16px はモバイルでも変えない
- 見出しだけ 768px 以下で縮める: h2 `20px → 18px` / h3 `21px → 18px`

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #f08100（アイコンボタンのみ）
Text Color: #262626
Background: #ffffff
Surface (band): #fdf9f1
CTA fill: #e8e8e8 / radius 40px
Font: 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
      游ゴシック, "Yu Gothic", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
      メイリオ, Meiryo, "ＭＳ Ｐゴシック", sans-serif
Body Size: 16px
Line Height: 1.7（無単位）
Letter Spacing: body に 0.05em（= 0.8px が全体へ継承される）
font-feature-settings: 使わない
box-shadow: 使わない
Web フォント: 1 本も使わない
```

### プロンプト例

```
ユニ・チャームのデザインシステムに従って、企業情報の一覧ページを作成してください。
- Web フォントは一切読み込まず、font-family は上記スタックをそのまま使う
- body に font-size:16px / line-height:1.7（無単位）/ letter-spacing:0.05em を書き、
  子要素では letter-spacing を再宣言しない
- 本文色は #262626、背景は #ffffff、カードに枠も影も付けない
- CTA は背景 #e8e8e8・border-radius 40px・padding 24px 30px・18px/700 の pill
- 見出しは 28px/700（行間 1.4）、小見出しは 21px/700、ウェイトは 400 と 700 だけ
- font-feature-settings は書かない（palt を足すと字面が 1 割詰まる）
- コンテナ幅は 1280px、ブレークポイントは 768/769px の 1 本だけ
```
