# DESIGN.md — 京都国立博物館（Kyoto National Museum）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-24 / 対象: `https://www.kyohaku.go.jp/jp/`, `https://www.kyohaku.go.jp/jp/visit/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地・**Noto Sans JP 1 本**・墨色 `#222222` で組む国立博物館のコーポレートサイト。装飾を足さず、**朱 `#d64000` だけ**を導線に使う
- **密度**: ゆったり。コンテナ 1320px、本文の行間は **2.00**（15px / 30px）
- **キーワード**: Noto Sans JP、**`rem` の基準が 10px**、**字間 0.05em を各要素に当てる**、ピル型 CTA（radius 42px）、朱 `#d64000`

**このサイトの核心は5つある。**

1. **Web フォントは 400 と 700 しか読み込んでいないのに、CSS は 500 を当てている。** Google Fonts の URL は `family=Noto+Sans+JP:wght@400;700`。それなのに `font-weight: 500` が**トップで 66 要素・下層で 66 要素**ある。**500 は存在しないので、CSS のフォントマッチングで 400 が選ばれる**（合成太字にもならない）。→ 3.4 を必ず読むこと
2. **`html { font-size: 10px }`。** `rem` は 10px 基準。`1.5rem = 15px`。**16px 基準で `rem` を換算しないこと**
3. **字間は「本文 `normal` / 見出し・ボタン `0.05em`」の 2 値だけ。** しかも `em` を**各要素に当てている**（18px→0.9px、16px→0.8px、15px→0.75px、14px→0.7px、13px→0.65px と、サイズに比例して px が変わる）。body から px を継承させる設計ではない
4. **多言語を `&text=` サブセットで解いている。** Noto Sans SC / TC / KR を、**それぞれ注意書き 1 文に出てくる文字だけ**読み込む（`...&text=%E7%B0%A1%E4%BD%93...`）。フォント丸ごとではない
5. **CSS Custom Properties が 0 個。** 変数は 1 つも定義されていない。**実装値そのものが仕様**

> **`palt` は 1 要素も無く、縦組みも無い。** 和文組版に手を入れているのは「見出しに 0.05em を足す」ことだけ。

---

## 2. Color Palette & Roles

**色数が極端に少ない。文字色は実質 2 色。**

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Ink（本文・見出し・ナビ）** | **`#222222`** | **文字 228 要素（トップ）/ 106 要素（下層）**。黒ではなく墨 |
| **Accent（朱）** | **`#d64000`** | 文字 20 要素。展示カードの「開催予定」「開催中」ラベル**専用** |
| Alert（注意） | `#be0000` | 文字 3 要素。「ご来館の皆様へ」「申込期間」の注意書き |
| Text Muted | `#757575` | 文字 22 要素。フッターのサブ項目、コレクション分類、コピーライト |
| Surface（面） | `#f2f2f2` | 面 33 要素。ニュース帯・フッター・カードの下地 |
| Divider | `#efefef` | 面 7 要素。区切りの細い帯 |
| Inverse（黒帯） | `#222222` | 面 11 要素。「09/24 休館」の開館状況バッジ |
| Disabled Surface | `#dbdbdb` | 面 1 要素。CMP の「拒否する」ボタン |
| Background | `#ffffff` | ページ背景 |

> **朱 `#d64000` は展示ステータスのラベル専用。** ボタンにも見出しにも使われていない。**CTA に朱を塗らないこと**（このサイトの CTA は白地＋墨の枠）。
> `#be0000` と `#d64000` は別物。**注意喚起は `#be0000`、展示ステータスは `#d64000`** と使い分ける。

---

## 3. Typography Rules

### 3.1 和文フォント

**Noto Sans JP のみ。** 可視テキスト 283 要素のうち **282 要素**が `"Noto Sans JP", sans-serif`。残り 1 要素は開館状況バッジの日付（Manrope）。

`document.fonts` の実測:

| family | weight | status |
|--------|--------|--------|
| **Noto Sans JP** | **400** | **loaded** |
| **Noto Sans JP** | **700** | **loaded** |
| Noto Sans SC / TC / KR | 400 | loaded（`&text=` サブセット・多言語の注意書き専用） |
| Noto Sans SC / TC / KR | 700 | unloaded |
| Manrope | 400 | loaded |
| Manrope | 700 | unloaded |
| slick（キャリア用アイコン） | normal | unloaded |

> **描画に使えるのは Noto Sans JP の 400 と 700 だけ。** ここが 3.4 の「500 問題」の根拠になる。

### 3.2 欧文フォント

**Manrope（400）。ただし使われているのは 1 要素だけ**（ヘッダー右下の開館状況バッジ「09/24」）。

本文中の英数字は Noto Sans JP のラテングリフで描かれる。**欧文のために別スタックを組んでいない。**

### 3.3 font-family 指定

```css
/* 本文・見出し・ナビ — サイトのほぼ全域 */
font-family: "Noto Sans JP", sans-serif;

/* 開館状況バッジの日付のみ */
font-family: Manrope, sans-serif;
```

**フォールバックの考え方**

- **和文のローカルフォント名を一切書いていない。** Noto Sans JP が落ちたら `sans-serif`（OS 既定）に直行する
- Windows / macOS の書き分け（游ゴシック問題）を**やっていない**。Web フォント 1 本に寄せきる方針
- 多言語ページでは `Noto Sans SC` / `Noto Sans TC` / `Noto Sans KR` を**同じ 1 文のためだけに**読み込む

```html
<!-- 実サイトの読み込み方（簡体字の例・文字を URL に埋めてサブセット化） -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap&text=简体中文欢迎来到京都国立博物馆。…">
```

> **`&text=` を付けると、その文字だけの極小サブセットが返る。** 中国語・韓国語の注意書きを 1 文だけ出すページで、フォント全体（数 MB）を読み込まずに済ませている。**多言語の一言だけを正しい書体で出したいときの実装例として再利用できる。**

### 3.4 文字サイズ・ウェイト階層

**`html { font-size: 10px }`。`rem` は 10px 基準。**

| 役割 | size | weight（CSS 宣言） | **実際に描画される weight** | line-height | letter-spacing |
|------|------|------|------|-------------|----------------|
| ページ見出し（下層 h1） | 30px | 500 | **400** | 1.38 | 0.9px（0.03em） |
| セクション見出し | 30px | 700 | 700 | 1.53 | normal |
| 大見出し（`09/24` 帯・ページタイトル） | 26px | 500 | **400** | 1.00 / 1.38 | normal |
| 中見出し | 24px | 700 | 700 | 1.66 | 1.2px（**0.05em**） |
| カード見出し・展示タイトル | 18px | 700 | 700 | 1.38 / 2.00 | 0.9px（**0.05em**） |
| ナビ（グローバル） | 16px | 500 | **400** | 1.67 | 0.8px（**0.05em**） |
| **本文** | **15px** | **400** | **400** | **30px（2.00）** | **normal** |
| リスト・カード本文 | 15px | 500 | **400** | 1.67 | normal |
| CTA・ボタン | 14px | 700 | 700 | 1.00 | 0.7px（**0.05em**） |
| 補助テキスト・日付 | 14px | 400 | 400 | 1.67 | normal |
| 申請リンク（小ピル） | 13px | 400 | 400 | 1.00 | 0.65px（**0.05em**） |
| コピーライト | 11px | 400 | 400 | 1.25 | normal |

**サイズの分布（トップ・可視 283 要素）**: 15px(121) → 14px(94) → 18px(30) → 26px(7) → 16px(6) → 30px(4) → 13px(4)

**ウェイトの分布**

| ページ | 400 | 500 | 700 |
|--------|-----|-----|-----|
| トップ | **123** | 66 | 94 |
| 下層（ご利用案内） | 24 | **66** | 19 |

> **`font-weight: 500` は読み込まれていない。** Google Fonts の URL は `wght@400;700` で、`document.fonts` にも 400 と 700 しか載らない。
> CSS フォントマッチングは 500 を要求されたとき **400 → 300 → … → 600 → 700 の順**に探すので、**実際には 400 が当たる**（合成太字も入らない）。
> **つまり、このサイトの見た目のウェイトは 400 と 700 の 2 段しかない。**
> **再現するときは 2 択でよい。** 500 をそのまま書くなら「400 と同じ太さで出る」ことを承知の上で書く。**500 を「中間の太さ」として設計に組み込まないこと。**
> 逆に、**500 を本当に中間の太さで出したいなら `wght@400;500;700` に増やす**（表示は変わるので、上の表の「実際に描画される weight」列も変わる）。

### 3.5 行間・字間

**本文の行間は 2.00。** 15px に対して 30px を当てている（`rem` 基準が 10px なので `3rem`）。

| 比率 | 出現（トップ） | 用途 |
|------|------|------|
| **2.00** | 25 | **本文**（15px / 30px）、カード内の説明文 |
| 1.67 | 58 | ナビ、リンクリスト、フッター項目 |
| 1.66 | 58 | 住所・営業情報などの塊 |
| 1.00 | 58 | バッジ、ボタン、1 行ラベル |
| 1.38 | 26 | 展示タイトル（2〜3 行になる見出し） |
| 1.50 | 13 | ニュース見出し |
| 1.33 / 1.25 | 各 10 | フッターの 2 段組リンク |

**字間は「本文 `normal` / 見出し・ボタン 0.05em」の 2 値。**

実測（トップ・可視 283 要素）:

| 値 | 出現 | サイズ | em 換算 |
|----|------|--------|---------|
| **`normal`** | **217** | 本文・補助テキスト全般 | — |
| 0.9px | 34 | 18px | **0.05em** |
| 0.75px | 10 | 15px | **0.05em** |
| 0.7px | 7 | 14px | **0.05em** |
| 0.8px | 6 | 16px | **0.05em** |
| 0.65px | 4 | 13px | **0.05em** |
| 1.2px | 2 | 24px | **0.05em** |
| 0.78px | 1 | 26px（Manrope の日付） | 0.03em |
| 0.28px | 2 | 14px（CMP バナー） | 0.02em・**外部 CMP 由来。再現しない** |

> **サイズが違うのに px が比例して変わっている＝ `em` を各要素に当てている。**
> body に 1 回書いて継承させる設計ではないので、**見出し・ナビ・ボタンのそれぞれに `letter-spacing: 0.05em` を書く**。
> **本文には書かない。** 15px の本文 121 要素はすべて `normal`。

```css
/* 本文 — 字間は触らない */
body { font-size: 1.5rem; line-height: 3rem; letter-spacing: normal; } /* = 15px / 30px, html は 10px */

/* 見出し・ナビ・ボタン — 各要素に 0.05em */
.heading, .nav__item, .btn { letter-spacing: 0.05em; }
```

### 3.6 禁則処理・改行ルール

実サイトは `word-break` / `line-break` を明示していない（ブラウザ既定）。**新規実装では以下を推奨する。**

```css
word-break: normal;        /* 和文はブラウザ既定の禁則に任せる */
overflow-wrap: anywhere;   /* 長い URL・英単語の突き抜けだけ防ぐ */
line-break: strict;        /* 小書き仮名・長音符も行頭に来させない */
```

**禁則対象**
- 行頭禁止: `）」』】〕〉》、。，．・：；？！ー々ゃゅょっ`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* このサイトは font-feature-settings を一切指定していない */
font-feature-settings: normal;
```

- **`palt` は 0 要素。** 可視 283 要素すべてが `normal`
- 約物の詰めは行わず、**見出しの `letter-spacing: 0.05em` で「開く」方向に振っている**（詰めるのではなく空ける設計）
- 再現時に親切心で `palt` を足さないこと。**足すと見出しの字面が変わる**

### 3.8 縦書き

```css
/* 該当なし */
```

`writing-mode: vertical-rl` は 0 要素。**横組みのみ。**

---

## 4. Component Stylings

### Buttons

**Primary（枠線ピル）** — このサイトの標準 CTA。**面を塗らない。**

- Background: `#ffffff`
- Text: `#222222`
- Border: 1px solid `#222222`
- Padding: `16.1px 56px 16.8px`（横幅の広いもの）/ `16.1px 21px 16.8px`（狭いもの）
- Border Radius: `42px`
- Font Size: 14px / Weight: 700 / Letter Spacing: 0.7px（0.05em）/ Line Height: 14px

> **padding の上下が非対称（上 16.1px / 下 16.8px）。** 和文はベースラインより下の余白が視覚的に狭く見えるため、**下を 0.7px 厚くしている**。ピル型ボタンに和文を入れるときの実装として真似する価値がある。

**Secondary（小ピル・申請リンク）**

- Background: `#ffffff`
- Text: `#222222`
- Border: 1px solid `#222222`
- Padding: `15.6px 52px`
- Border Radius: `39px`
- Font Size: 13px / Weight: **400** / Letter Spacing: 0.65px（0.05em）

**Inverse（黒帯リンク）**

- Background: `#222222`
- Text: `#ffffff`
- Padding: `20px 30px`
- Border Radius: `0px`
- Font Size: 20px / Weight: 400 / Letter Spacing: normal

### Badges / Chips

**展示ステータス（「開催予定」「開催中」）**

- Background: `#ffffff`
- Text: **`#d64000`**
- Border Radius: `9px`
- Padding: `18px 22.5px`
- Font Size: 18px / Weight: 700 / Letter Spacing: 0.9px（0.05em）
- Shadow: `0 5px 18px rgba(0,0,0,0.1)`

**開館状況バッジ（「09/24 休館」）**

- Background: `#222222` / Text: `#ffffff`
- 日付だけ Manrope 26px、ラベル「休館」は Noto Sans JP 20px
- Shadow: `0 10px 20px rgba(0,0,0,0.16)`

### Inputs

実サイトのトップ・下層に可視の入力欄は無い（検索はアイコンからモーダルで開く）。**新規実装では下記に揃える。**

- Background: `#ffffff`
- Border: 1px solid `#dbdbdb`
- Border (focus): 1px solid `#222222`
- Border Radius: `4px`
- Padding: `12px 16px`
- Font Size: 15px
- Height: 48px

### Cards

- Background: `#ffffff`（ニュース帯の中は `#f2f2f2`）
- Border: なし
- Border Radius: `9px`（ステータスバッジ付きの展示カード）/ `0px`（ニュース・リンクカード）
- Padding: `40px 0px`（ニュース行）
- Shadow: `0 5px 18px rgba(0,0,0,0.1)`

---

## 5. Layout Principles

### Spacing Scale

`rem` が 10px 基準なので、**値はすべて 10 の倍数に寄っている**。

| Token | Value | `rem` 表記 |
|-------|-------|-----------|
| XS | 4px | 0.4rem |
| S | 10px | 1rem |
| M | 20px | 2rem |
| L | 40px | 4rem |
| XL | 60px | 6rem |
| XXL | 100px | 10rem |

### Container

- Max Width: **1320px**（トップの主要セクション・14 箇所）
- Max Width（ヘッダー / フッター）: **1440px**（7 箇所）
- Max Width（下層本文）: **1200px**（6 箇所）
- Padding (horizontal): 20px

### Grid

- Columns: 3（展示カード）/ 2（フッターのリンク 2 段組）
- Gutter: 20px

---

## 6. Depth & Elevation

**影は 2 種類しかない。**

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|------|
| 0 | `none` | ほぼすべての要素 | 可視 283 要素中 279 |
| 1 | `0 5px 18px rgba(0,0,0,0.1)` | 展示カードのステータスバッジ | 3 要素 |
| 2 | `0 10px 20px rgba(0,0,0,0.16)` | 開館状況バッジ（画面右下に浮く） | 1 要素 |

> **下層ページには影が 1 つも無い。** 影は「トップで浮かせる 2 つの要素」専用。**カードやモーダルに影を足さないこと。**

---

## 7. Do's and Don'ts

### Do（推奨）

- `html { font-size: 10px }` を前提に `rem` を計算する（`1.5rem = 15px`）
- 本文は **15px / line-height 30px（2.00）/ letter-spacing normal**
- 見出し・ナビ・ボタンには**それぞれ `letter-spacing: 0.05em` を書く**
- 文字色は `#222222`。補助は `#757575`
- CTA は**白地＋ 1px `#222222` の枠＋ radius 42px のピル**
- ピル型ボタンの padding は**下を 0.5〜1px 厚くする**（実サイト: 上 16.1px / 下 16.8px）
- 多言語の短い注意書きは `&text=` サブセットで読み込む

### Don't（禁止）

- **`font-weight: 500` を「中間の太さ」として使わない。** Web フォントに 500 が無く、400 で描画される
- **`rem` を 16px 基準で換算しない**（すべて 1.6 倍ずれる）
- 本文に `letter-spacing` を足さない（121 要素すべて `normal`）
- `font-feature-settings: "palt"` を足さない（実サイトは 0 要素）
- 朱 `#d64000` をボタンや見出しに塗らない（展示ステータスのラベル専用）
- 文字色に `#000000` を使わない（実サイトは `#222222`）
- カード・モーダルに影を足さない（影は 2 要素だけ）
- CSS 変数があるつもりで書かない（**このサイトの変数は 0 個**）

---

## 8. Responsive Behavior

### Breakpoints

実測されたメディアクエリ（件数順）:

| Name | 条件 | 出現 |
|------|------|------|
| Desktop | `print, screen and (min-width: 768px)` | 300 |
| **Mobile** | `screen and (max-width: 767px)` | **225** |
| Mobile（別記法） | `only screen and (max-width: 767px)` | 88 |
| Wide | `screen and (min-width: 992px)` | 7 |
| Wide+ | `screen and (min-width: 1200px)` | 7 |
| Print | `print` | 5 |

> **主たる分岐は 767/768px の 1 本。** 992 / 1200 / 1440 は補助。**モバイルファーストではなく、`max-width: 767px` でモバイルを上書きする書き方**（`min-width: 768px` が既定側）。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。コンテナは左右 20px パディング |
| Tablet / Desktop | ≥ 768px | 3 カラム。コンテナ 1320px |
| Wide | ≥ 1440px | ヘッダー・フッターのみ 1440px まで広がる |

### タッチターゲット

- 最小サイズ: 44px × 44px
- 実サイトの CTA は高さ **48.3px**（14px × line-height 14px ＋ padding 16.1/18.2）で基準を満たす

### フォントサイズの調整

- 本文 15px はモバイルでも据え置き（`rem` が 10px 基準なので比率で縮めない）
- 見出し 30px → モバイルでは 22〜24px 程度に縮める
- **`letter-spacing: 0.05em` は `em` なのでサイズに追従する。モバイル用に書き直す必要はない**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #222222   （文字・枠線・黒帯）
Accent Color:  #d64000   （展示ステータスのラベル専用）
Alert Color:   #be0000
Text Muted:    #757575
Surface:       #f2f2f2
Background:    #ffffff
Font: "Noto Sans JP", sans-serif
Root Font Size: 10px      ← rem は 10px 基準
Body Size: 15px
Line Height: 2.00 (30px)
Body Letter Spacing: normal
Heading Letter Spacing: 0.05em （各要素に書く）
Weights: 400 / 700 のみ（500 は読み込まれていないので 400 で出る）
Button: 白地 + 1px #222222 + radius 42px + padding 16.1px 56px 16.8px
```

### プロンプト例

```
京都国立博物館のデザインシステムに従って、展示一覧ページを作成してください。

- html の font-size は 10px。rem はすべて 10px 基準で計算すること
- フォント: "Noto Sans JP", sans-serif の 1 本だけ。ウェイトは 400 と 700 のみ使う
  （500 は Web フォントに存在しないので使わない）
- 本文: 15px / line-height 30px / letter-spacing normal / color #222222
- 見出し・ナビ・ボタンには letter-spacing: 0.05em を各要素に書く
- font-feature-settings は指定しない（palt を足さない）
- 展示ステータス（開催中／開催予定）のラベルは文字色 #d64000、
  白地・radius 9px・box-shadow 0 5px 18px rgba(0,0,0,0.1)
- CTA は白地 + 1px solid #222222 + border-radius 42px、
  padding は 16.1px 56px 16.8px（下を 0.7px 厚くする）
- カードやモーダルに影を足さない
- コンテナ幅 1320px、ブレークポイントは max-width: 767px
```
