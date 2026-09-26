# DESIGN.md — 野村不動産（NOMURA REAL ESTATE DEVELOPMENT）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-26 / 対象: `https://www.nomura-re.co.jp/`, `/corporate/message/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **詰めて読ませる。** `font-feature-settings: "palt"` をトップページの **562 要素**に全面適用し、`letter-spacing: .04em` を body に1回書いて全体へ流す。文字色は**黒と白の2色だけ**。色は「事業セグメントの識別」にしか使わない
- **密度**: 高め。行間 1.75 で、約物が詰まった和文がブロックとして固まって見える
- **キーワード**: バーントオレンジ、`palt` 全面、黒と白の2色、10px の角丸、ほとんど見えない影

**このサイトの核心は4つある。**

1. **`palt` の全面適用。** トップページで **562 要素**、下層 `/corporate/message/` で **175 要素**。`「人々の“幸せ”と社会の“豊かさ”の最大化」を目指し` のような鉤括弧・引用符だらけの見出しでも、約物が閉じて1本の線に見える
2. **`letter-spacing` は body に1回だけ。** computed 値は **`0.64px`（= 16px × 0.04em）で、可視 123 要素中 119 要素**（下層は 57/58）。**子要素は px のまま継承**している。`em` を再宣言しているのはヒーローのコピーだけ（16px → `1.6px` = 0.1em）
3. **文字色は 2 色しかない。** 可視要素の `color` は **`#ffffff`（92 要素）と `#000000`（31 要素）のみ**。グレーの補助テキストすら使わない
4. **色は事業セグメントの識別子。** バーントオレンジ `#b85911` / `#9c4300` がブランド面、`#3862a5`（住まい）・`#e29460`（街づくり・商業施設）・`#8aad45`（ロジスティクス）がカテゴリタグ。**装飾ではなく分類のための色**

**CSS Custom Properties は自社トークン 0 個**（2 個は Swiper の既定値）。**Noto Sans JP は可変フォント（`weight: 100 900`）を読み込んでいるが、実際に使うのは 400 / 500 / 700 の3段だけ。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Burnt Orange（セクション面）** | **`#b85911`** | **塗り 2 要素**。`事業紹介` `採用情報` の大パネル全面。`border-radius: 50px 50px 0 0` で上 2 隅だけ大きく丸める |
| **Burnt Orange Deep（カード）** | **`#9c4300`** | **塗り 11 要素**。オレンジパネルの中に置くカード（`分譲住宅` `賃貸住宅` `ホテル` …）と、外部リンク（`野村不動産ホールディングス`）。**文字は白** |
| **Brand Purple** | **`#610f7a`** | 塗り 1 要素。ロゴマークとセクション見出し頭の小さな四角。**面として広く使わない** |

> **`interactive` の `color` を鵜呑みにしない。** `分譲住宅`（bg `#9c4300`）の `color` は `rgb(0,0,0)` と出るが、これは**ラベルを子の `<span>` に置いている構造**で、実際に描画される文字は白。スクリーンショットで確認済み。**`#9c4300` の上は白文字。**

### Category（事業セグメントのタグ色）

小さな角丸なしのチップ（`border-radius: 0` / `padding: 2px 10px 4px` / 12px / 白文字）にだけ使う。

| セグメント | 実装値 | 実測 |
|-----------|--------|------|
| 住まい | **`#3862a5`** | 塗り 3 要素 |
| 街づくり（複合開発）・商業施設 | **`#e29460`** | 塗り 2 要素 |
| ロジスティクス | **`#8aad45`** | 塗り 1 要素 |

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 31 要素**。**このサイトは本文に純黒を使う**
- **Text on Dark** (`#ffffff`): オレンジ面・写真・フッターの上（可視 92 要素）
- **Surface Warm** (`#f4f0ed`): **最も多い面（14 要素）**。ニュースカード、会社情報の導線、下層の本文ブロック
- **Surface Warm 2** (`#e9e4e1`): 採用セクションの下半分
- **Surface Gray** (`#e6e6e6`): 検索フォームの面
- **Footer Dark** (`#211f22` / `#2b282c`): フッター上下段
- **Cookie Popup** (`rgba(46, 44, 48, 0.95)`): 独自実装の Cookie 通知（外部 CMP ではない）
- **Background** (`#ffffff`): ページ背景。`html` / `body` に塗り指定が無く（`rgba(0,0,0,0)`）、`heroCover.canvasUnpainted: true`。トップの `resolved` は `viewportTopBySample (2/4)` 根拠で `#ffffff`、下層は `viewportTopBySample (9/12)` 根拠で `#f4f0ed`。**地色は白、本文ブロックの面が `#f4f0ed`** と読む

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一の和文）**: **Noto Sans JP**。`@font-face` は **可変フォント `weight: 100 900`**、`status: loaded`
- **可変で 100〜900 が使えるのに、実際に使うのは 400 / 500 / 700 の3段だけ。** 400 が 102/123 要素、500 が 16、700 が 5
- 明朝は使わない

### 3.2 欧文フォント

- **専用の欧文フォントを持たない。** `BLUE FRONT SHIBAURA` `View more` `© NOMURA REAL ESTATE DEVELOPMENT` などの英字も **Noto Sans JP の欧文グリフ**
- `swiper-icons` が宣言されているが `unloaded`

### 3.3 font-family 指定

```css
/* サイト全体で1本。実測 123 要素すべてがこれ */
font-family: "Noto Sans JP", sans-serif;
```

**フォールバックの考え方**:
- **チェーンは2段だけ。** `fontFamily` の分布に他の値が1つも出てこない（トップ 123/123、下層 58/58）。**例外の無い単一指定**
- OS フォント（游ゴシック・ヒラギノ）を挟んでいない。**`palt` を前提にした組版**なので、メトリクスの違う書体に落ちると詰め具合が変わる。**チェーンを足さないこと**

### 3.4 文字サイズ・ウェイト階層

ルートは標準の **16px**（`html` / `body` ともに 16px）。`rem` 換算はそのまま。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Page Title** | Noto Sans JP | **36px** | **500** | 1.50 (54px) | 0.64px（継承） | `代表ご挨拶`。下層ページの h1 |
| **Section Title** | Noto Sans JP | **28px** | **500** | 1.50 (42px) | 0.64px（継承） | `ニュース` `事業紹介` `会社情報` |
| Statement | Noto Sans JP | 24px | 500 | 1.75 (42px) | 0.64px（継承） | `「人々の“幸せ”と社会の“豊かさ”の最大化」を目指し、` |
| Sub Heading | Noto Sans JP | 24px | 500 | 1.75 | 0.64px | `野村不動産の街づくり` `野村不動産の開発力` |
| Card Title | Noto Sans JP | 20px | 400 | 1.75 (35px) | 0.64px | `分譲住宅` `賃貸住宅` `シニア住宅` |
| **Body** | Noto Sans JP | **16px** | **400** | **1.75** (28px) | **0.64px = 0.04em** | **本文。body 既定そのまま** |
| **Hero Copy** | Noto Sans JP | **16px** | 400 | **2.10** (33.6px) | **1.6px = 0.1em** | ヒーローのリード。**唯一 `em` を再宣言している箇所** |
| Nav / UI | Noto Sans JP | 14px | 400 | 1.20 (16.8px) | 0.64px | グローバルナビ（実測 59 要素で最多） |
| Breadcrumb | Noto Sans JP | 14px | 400 | 1.40 (19.6px) | 0.64px | `HOME ＞ 会社情報 ＞ 代表ご挨拶` |
| Nav Bold | Noto Sans JP | 14px | **700** | 1.20 | 0.64px | 選択中のグローバルナビ（実測 5 要素） |
| Category Tag | Noto Sans JP | 12px | 400 | 1.75 | 0.64px | `住まい` `商業施設` `ロジスティクス`（白文字） |
| Footer Link | Noto Sans JP | 12px | 400 | 1.75 | 0.64px | `サイトマップ` `個人情報の取扱いについて` |
| Ruby | Noto Sans JP | 8px | 400 | normal | 1.6px | ヒーロー内のルビ（`未来` に `あした`） |
| Copyright | Noto Sans JP | 10px | 400 | 1.75 | 0.64px | `© NOMURA REAL ESTATE DEV…` |

**700 は 5 要素だけ。** 見出しは基本 **500（Medium）**で組み、700 は選択中のナビにしか使わない。**可変フォントで 900 まで出せるが、使っていない。**

### 3.5 行間・字間

- **本文の行間**: **1.75**（16px / 28px）。**可視 103/123 要素**（下層 48/58）と圧倒的多数
- **見出しの行間**: **1.50**（28px / 42px、36px / 54px）
- **UI の行間**: **1.20**（14px / 16.8px）。ナビ・ボタン
- **ヒーローの行間**: **2.10**（16px / 33.6px）。ここだけ広げる
- **字間**: **`0.64px`（= 0.04em）が 119/123 要素**。body に1回書いて**px のまま継承**させている
- **例外**: ヒーローのリードだけ `1.6px`（0.1em）を再宣言（3 要素）

**ガイドライン**:
- **`letter-spacing: .04em` は body に1回だけ書く。** 子要素で `em` を再宣言すると、サイズごとに px が変わって継承の一様さが壊れる（このサイトはヒーロー以外それをしていない）
- **`0.04em` は「詰め」ではなく「詰めすぎないための最小値」。** 実際の字詰めは `palt` が担当している
- **`line-height: 1.75` と `palt` はセット。** `palt` で横が詰まる分、縦を 1.75 空けてバランスを取っている。**片方だけ真似ない**

### 3.6 禁則処理・改行ルール

```css
/* 和文本文 */
line-break: strict;
overflow-wrap: break-word;
word-break: normal;
```

- `palt` が効いているため、**行末の約物が詰まって見える**。`break-all` を入れると詰めた約物が行頭に落ちて台無しになるので使わない
- 統括的な見出し（`「人々の“幸せ”と社会の“豊かさ”の最大化」を目指し、価値創造の変革を推進してまいります。`）は **`<br>` で3行に割っている**。自動折り返しに任せない

### 3.7 OpenType 機能

```css
/* サイト全体（実測 562 要素） */
font-feature-settings: "palt";
```

- **`palt` を全面に当てる。** 本文・見出し・ナビ・タグまで区別なく適用している。**このサイトで最も特徴的な指定**
- `"palt" 1` ではなく **`"palt"` とだけ書いている**（値を省略すると 1 と同じ）。実装値をそのまま写すなら `font-feature-settings: "palt";`
- 数字の `tnum` は使っていない。日付（`2026年09月25日`）もプロポーショナルのまま

### 3.8 縦書き

```css
/* 該当なし。writing-mode の指定は 0 要素 */
```

縦組みは使っていない（`typography.verticalWriting` = 0 件）。

---

## 4. Component Stylings

### Buttons

**Primary（黒のピル）**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `0px 20px`（高さは行ボックスで確保）
- Border Radius: **`20px`**
- Font: Noto Sans JP / 16px / 400 / `letter-spacing: 0.64px`
- 右端に矢印付きの小さな丸を置く（`View more ›`）

**Secondary（枠線・小）**
- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #000000`
- Border Radius: **`4px`**
- Padding: `5px 10px`
- Font: Noto Sans JP / 14px / 400
- ヘッダーの `お問い合わせ`。**フッター版は `border-radius: 0` ＋ `1px solid #ffffff`**（背景が暗いため）

### List Links（会社情報の導線）

- Background: `#f4f0ed`
- Text: `#000000`
- Border Radius: **`10px`**
- Padding: **`16px 44px 16px 20px`**（右 44px は矢印の丸の場所）
- Font: Noto Sans JP / 16px / 400
- **外部リンク版は Background `#9c4300` ＋ 白文字**（`野村不動産ホールディングス` `IR情報`）

### Cards

**News Card**
- Background: `#f4f0ed`
- Border Radius: **`10px`**（実測 **66 要素**でこのサイトの既定）
- Padding: **`32px 32px 70px`**（下 70px は日付とタグの場所）
- Shadow: `rgba(0, 0, 0, 0.04) 3px 3px 5px 0`

**Business Card（オレンジパネル内）**
- Background: `#9c4300`
- Text: `#ffffff`
- Border Radius: `10px`
- 写真を左に、ラベルを右に置く 2 カラム

### Category Tag

- Background: `#3862a5` / `#e29460` / `#8aad45`（セグメント別）
- Text: `#ffffff`
- Border Radius: **`0px`**（**タグだけ角丸を使わない**）
- Padding: `2px 10px 4px`（**上下非対称**）
- Font: Noto Sans JP / 12px / 400

### Section Panel

- Background: `#b85911`
- Border Radius: **`50px 50px 0px 0px`**（**上 2 隅だけ 50px**）
- 中に `#9c4300` のカードを `10px` の角丸で並べる

### Inputs

- Background: `#e6e6e6`
- Border: なし
- Border Radius: `0px`
- Padding: `5px 10px`
- Font: Noto Sans JP / 14px / 400 / `letter-spacing: 0.64px`
- 右端に虫眼鏡アイコン

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 実測 |
|-------|-------|------|
| XS | 6px | `6px 32px` の行 gap |
| S | 16px | リンクの上下 padding |
| M | 20px | リンクの左 padding |
| L | **32px** | **最多の gap（4 要素）**。カード内 padding も 32px |
| XL | 44px | 矢印を置く右 padding |
| XXL | 70px | カード下部の余白 |
| Column gap | **6.639%** | **グリッドの列間は % で持つ**（実測 6 要素） |

### Container

- Max Width: **`1120px`**（実測 8 要素。**このサイトはこれ1つだけ**）
- 全幅パネル（`事業紹介` `採用情報`）はコンテナの外まで広がり、上 2 隅を `50px` で丸める
- Padding (horizontal): 20〜40px

### Grid

- Columns: 2（ニュース）/ 3（事業カード）
- Gutter: **`6.639%`**（可変）または `32px`（固定）
- 会社情報の導線は 2 カラム × 4 行

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | タグ・ボタン・オレンジパネル |
| **1** | **`rgba(0, 0, 0, 0.04) 3px 3px 5px 0`** | **既定のカード影（実測 28 要素）。右下方向・不透明度 4%** |
| 2 | `rgba(0, 0, 0, 0.1) 5px 5px 10px 0` | 一段上げたカード（実測 2 要素） |
| 3 | `rgba(0, 0, 0, 0.15) 0 0 10px 0` | ヘッダーのドロップダウン（実測 1 要素） |
| — | `rgba(0, 0, 0, 0.25) 0 4px 4px 0` | Cookie 通知（実測 1 要素） |

> **影は「右下に 3px ずらす」。** `0 2px 4px` のような真下の影ではなく、**X と Y に同じ量ずらす**のがこのサイトの型（`3px 3px` / `5px 5px`）。**不透明度 0.04 は見えるか見えないかの境目**で、黒に丸めたり濃くしたりしないこと。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`font-feature-settings: "palt"` を全要素に当てる。** 本文も見出しもナビもタグも例外なし
- **`letter-spacing: .04em` を body に1回だけ書き、子要素は px で継承させる**
- **`line-height: 1.75` を本文に、`1.50` を見出しに、`1.20` を UI に**
- **文字色は `#000000` と `#ffffff` の2色で通す**
- **カードの角丸は `10px`、ピルは `20px`、大パネルは `50px 50px 0 0`、タグは `0px`**
- **影は `rgba(0,0,0,0.04) 3px 3px 5px`。** X・Y を同量ずらす
- **色はセグメントの識別に使う**（住まい＝`#3862a5`、街づくり＝`#e29460`、物流＝`#8aad45`）

### Don't（禁止）

- **`palt` を外さない。** 外すと鉤括弧・引用符の多い見出しが間延びして、別のサイトになる
- **`letter-spacing` を子要素で `em` 再宣言しない**（ヒーローのリードを除く）。サイズごとに px が変わって継承の一様さが壊れる
- **グレーの文字を足さない。** 補助テキストも黒。`#666666` のような中間色は 1 要素も無い
- **`font-weight` を 300 や 900 にしない。** 可変フォント（`100 900`）を読んでいるが、実際の設計は **400 / 500 / 700 の3段**
- **見出しを 700 にしない。** 36px の h1 も 28px のセクション見出しも **500**。700 は選択中のナビ 5 要素だけ
- **影を濃くしない。** `0.04` を `0.1` に上げるとカードが浮いて、このサイトの平板さが失われる
- **タグに角丸を付けない。** カードが `10px` でもタグは `0px`
- **`font-family` に游ゴシック・ヒラギノを足さない。** メトリクスが変わると `palt` の詰め方が変わる

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | ≤ 576px | `(max-width: 576px)`（実測 7 回）。**主要な切替点** |
| Tablet | ≤ 768px | `(max-width: 768px)`（実測 2 回） |
| Tablet S | ≤ 767px | `screen and (max-width: 767px)` |
| Laptop | ≤ 1000px / ≤ 1152px | コンテナ 1120px を下回る帯の調整 |
| Desktop | ≤ 1440px | `screen and (max-width: 1440px)` |
| Wide | ≤ 1760px / ≤ 1920px | **ヒーローの拡大率をここで抑えている** |
| Hover | `(any-hover: hover)` / `(hover: none)` | **タッチ端末ではホバー演出を止める** |

> **上限側（`max-width: 1920px` / `1760px`）を持っているのが特徴。** コンテナは 1120px 固定だが、**ヒーローの背景と全幅パネルだけは画面幅に追従**させ、超ワイドで伸びすぎないよう段階的に抑えている。

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。会社情報の導線は `padding: 16px 44px 16px 20px` で満たす
- `(hover: none)` でホバー時の色変化・矢印アニメーションを無効化する

### フォントサイズの調整

- Page Title 36px → モバイルで 24〜28px、Section Title 28px → 20〜22px
- **本文 16px / `line-height: 1.75` / `palt` / `.04em` は据え置く**
- 事業カードは 3 カラム → 2 カラム → 1 カラム
- 全幅パネルの `border-radius: 50px 50px 0 0` はモバイルで 24px 程度に落としてよい

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:  #b85911   （セクション面） / #9c4300（カード）
Brand Purple:   #610f7a   （マークのみ）
Text Color:     #000000   ← グレーは使わない
Text on Dark:   #ffffff
Background:     #ffffff
Surface:        #f4f0ed   （最多の面）
Footer:         #211f22
Font:           "Noto Sans JP", sans-serif
Body Size:      16px
Body Weight:    400   （見出しは 500、700 はナビ選択時のみ）
Line Height:    1.75  （見出し 1.5 / UI 1.2）
Letter Spacing: 0.04em   ← body に1回だけ
palt:           全要素に適用
Radius:         カード 10px / ピル 20px / 大パネル 50px 50px 0 0 / タグ 0px
Box Shadow:     rgba(0,0,0,0.04) 3px 3px 5px 0
Container:      1120px
```

### プロンプト例

```
野村不動産のデザインシステムに従って、事業紹介の一覧ページを作ってください。
- フォントは "Noto Sans JP", sans-serif の1本
- body に font-feature-settings: "palt" と letter-spacing: .04em を書き、全要素へ継承させる
- 本文 16px / 400 / line-height: 1.75、セクション見出し 28px / 500 / line-height: 1.5
- 文字色は #000000 と #ffffff の2色だけ。グレーの補助テキストは作らない
- セクション全体を #b85911 の面で囲み、border-radius: 50px 50px 0 0 で上 2 隅だけ丸める
- その中のカードは #9c4300 / border-radius: 10px / 白文字
- 事業セグメントのタグは border-radius: 0 / padding: 2px 10px 4px / 12px / 白文字で、
  住まい=#3862a5、街づくり・商業施設=#e29460、ロジスティクス=#8aad45
- カードの影は rgba(0,0,0,0.04) 3px 3px 5px 0（X と Y を同量ずらす）
- コンテナは 1120px、列間は 6.639%
```
