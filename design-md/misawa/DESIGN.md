# DESIGN.md — ミサワホーム（MISAWA HOME）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-25 / 対象: `https://www.misawa.co.jp/`, `https://www.misawa.co.jp/kodate/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地・墨 `#333333`・青 `#0078be` で組むハウスメーカーのコーポレートサイト。和文は **約物サブセット ＋ 和文 ＋ 総称の 3 層スタック**で積み、欧文は **Outfit** に分ける
- **密度**: 詰め気味。コンテナ 1200px、行間は **1.40〜1.46** に集中。情報量の多いメガメニューを持つ
- **キーワード**: YakuHanJP ＋ Noto Sans JP ＋ Outfit、**`palt` と YakuHanJP の併用**、**`rem` の基準が 10px**、**欧文を縦に組む**、影は 1 種だけ

**このサイトの核心は6つある。**

1. **`body` の `font-family` は `"Hiragino Kaku Gothic ProN"` だが、実際に描かれているのは Noto Sans JP。** そのスタックを持つのは**可視 309 要素のうち 11 要素だけ**。実体は `Yakuhanjp, "Noto Sans JP", sans-serif` が **176 要素**、`"Noto Sans JP", sans-serif` が **102 要素**。**`body` の宣言を見て書体を決めないこと**
2. **`YakuHanJP`（約物サブセット）と `font-feature-settings: "palt"` を併用している。** `palt` は **860 要素**に継承されている。約物のアキを詰める手段が**二重に入っている**。→ 3.7 を必ず読むこと
3. **`html { font-size: 10px }`。** `rem` は 10px 基準。**16px 基準で `rem` を換算しないこと**
4. **`font-weight` は実質 400 一本。** 可視 309 要素のうち **400 が 301 要素**、600 が 7、700 が 1。`Noto Sans JP` は**可変フォント（100〜900）で読み込んでいる**のに、太さで階層を作っていない
5. **欧文ラベルを `writing-mode: vertical-rl` で縦に組んでいる。** `HOME+Advanced` `HOME+Upgrade Life` など **5 要素**。和文ではなく**欧文を縦に**する。→ 3.8 を必ず読むこと
6. **コーポレートトップと `/kodate/`（注文住宅）は別のデザインシステム。** 下層は `Noto Sans JP` 単独スタック・`Oswald` / `Nobel-Book`・**weight 300** を使い、**字間は `normal`（174 要素）で `palt` も無い**。→ 3.9 を必ず読むこと

---

## 2. Color Palette & Roles

**青 1 色を導線に使う。文字は墨 `#333333`。**

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Primary（ブルー）** | **`#0078be`** | **面 71 要素・文字 31 要素**。CTA の枠線と文字、セクションラベル（`PICK UP` `BAUHAUS`）、見出しの強調 |
| **Ink（本文・ナビ）** | **`#333333`** | **文字 225 要素**。黒ではなく墨 |
| Navy（サブブランド） | `#0e3e6a` | 文字 19 要素。`MISAWA HOME LOUNGE` `Home Club` `THINK LIFE` のサービス名 |
| Surface（下地） | `#f8f8f8` | 面 3 要素。「お知らせ」「ニュースリリース」の帯 |
| Surface（相談窓口） | `#d6dee3` | 面 1 要素。「ご相談窓口 CONTACT」 |
| Surface（会社案内） | `#6d7b84` | 面 1 要素。「ミサワホームについて ABOUT US」 |
| Text Faint | `#c7c7c7` | 文字 5 要素。縦組みの欧文ラベル |
| Text Muted | `#666666` | 文字 7 要素。フッターの説明文 |
| Background | `#ffffff` | ページ背景（`html` / `body` ともに透明・UA 既定の白） |

**ホームラウンジの 3 導線だけ色分けしている（各 1 要素）。**

| 導線 | 色 |
|------|-----|
| これから住まいをご検討の方 | `#0c436f`（紺） |
| これから土地活用・賃貸経営をご検討の方 | `#882e2e`（臙脂） |
| これからリフォームをご検討の方 | `#7e6e27`（黄土） |

> **`#0078be` と `#0e3e6a` は使い分けている。** 導線・CTA は `#0078be`、サービスブランド名は `#0e3e6a`。**混ぜないこと。**
> **ヒーローの上の白文字は半透明の面（`rgba(255,255,255,0.29)`）に乗せている**（`BAUHAUS` `FINLAND` のタブ）。ベタ塗りではない。

---

## 3. Typography Rules

### 3.1 和文フォント

**約物サブセット ＋ 和文 ＋ 総称の 3 層。**

| スタック | 役割 | 実測（トップ・可視 309 要素） |
|----------|------|------|
| **`Yakuhanjp, "Noto Sans JP", sans-serif`** | 見出し・リード・CTA | **176 要素** |
| **`"Noto Sans JP", sans-serif`** | ナビ・メガメニュー・リスト | **102 要素** |
| `Outfit, sans-serif` | 欧文ラベル | 20 要素 |
| `"Hiragino Kaku Gothic ProN"` | フッターの注記のみ | **11 要素** |

> **`body` は `"Hiragino Kaku Gothic ProN"` と宣言されているが、それが効いているのはフッター注記の 11 要素だけ。** 実体は Noto Sans JP。**`computedStyles.body` を根拠に書体を決めない。**

`document.fonts` の実測（トップ）:

| family | weight | status |
|--------|--------|--------|
| **Noto Sans JP** | **100 900（可変）** | **loaded** |
| **Outfit** | **100 900（可変）** | **loaded** |
| **YakuHanJP** | **400** | **loaded** |
| YakuHanJP | 100 / 200 / 300 / 500 / 600 / 700 / 800 / 900 | **unloaded** |

> **YakuHanJP は 9 ウェイト宣言されているが `loaded` は 400 だけ。** 400 以外のウェイトを当てると、**約物だけ Noto Sans JP に落ちて全角に戻る**。3.4 で `font-weight` を 400 に固定する理由がこれ。
> **Noto Sans JP と Outfit は可変フォント**として 1 本で 100〜900 を持つ。それでも実装は 400 しか使っていない。

### 3.2 欧文フォント

**Outfit（Google Fonts・可変）。20 要素。**

- セクションラベル — `PICK UP`（30px）
- ヒーローのタブ — `BAUHAUS` / `FINLAND`
- **縦組みの事業ラベル** — `HOME+Advanced` など 5 要素（3.8 参照）

**本文中の英数字は Noto Sans JP のラテングリフで描かれる。** Outfit はラベル専用。

### 3.3 font-family 指定

```css
/* 見出し・リード・CTA — 約物を詰めたい文字 */
font-family: Yakuhanjp, "Noto Sans JP", sans-serif;

/* ナビ・メガメニュー・リスト — 約物が出てこない短い文字 */
font-family: "Noto Sans JP", sans-serif;

/* 欧文ラベル */
font-family: Outfit, sans-serif;
```

**フォールバックの考え方**

- **`YakuHanJP` を先頭に置く。** 約物（`、。「」（）・：；`）だけを収録したサブセットなので、**それ以外の文字は自動的に次の `"Noto Sans JP"` に落ちる**。これが「約物だけ半角」の仕組み
- 和文のローカルフォント名（游ゴシック・ヒラギノ）を**スタックに書いていない**。Noto Sans JP が落ちたら `sans-serif`（OS 既定）に直行する
- **`Yakuhanjp` と小文字で書かれている**が、`@font-face` の宣言は `YakuHanJP`。CSS の `font-family` は大文字小文字を区別しないので動作するものの、**新規実装では `YakuHanJP` と正しく書くこと**
- **スタックを 2 系統に分けているのが設計。** 約物が出る文（見出し・リード）は YakuHanJP 付き、出ない短い語（ナビ項目）は Noto Sans JP 単独。**全域に YakuHanJP を当てていない**

### 3.4 文字サイズ・ウェイト階層

**`html { font-size: 10px }`・`body { font-size: 10px }`。`rem` は 10px 基準。**

| 役割 | 書体 | size | weight | line-height | letter-spacing |
|------|------|------|--------|-------------|----------------|
| 大見出し（CTA セクション） | YakuHanJP + Noto Sans JP | 31px | 400 | 42px（1.35） | 3.1px（**0.1em**） |
| 欧文セクションラベル | Outfit | 30px | 400 | 38px（1.27） | 0.96px（継承） |
| セクション見出し | YakuHanJP + Noto Sans JP | 26px | 400 | 46px（1.77） | 2.08px（**0.08em**） |
| 小見出し | YakuHanJP + Noto Sans JP | 24px | 400 | 35px（1.46） | 2.4px（**0.1em**） |
| メガメニューの見出し | Noto Sans JP | 22px | 400 | 32.12px（1.46） | 0.88px（継承） |
| サービス名 | Noto Sans JP | 18px | 400 | 1.46 | 0.36px（継承） |
| **本文（リード）** | **YakuHanJP + Noto Sans JP** | **15px** | **400** | **27px（1.80）** | **1.5px（0.1em）** |
| **本文（一般）** | **YakuHanJP + Noto Sans JP** | **15px** | **400** | **21px（1.40）** | **0.96px（継承）** |
| ナビ・リスト | Noto Sans JP | 15px | 400 | 21.9px（1.46） | 0.36px（継承） |
| メガメニューのボタン | Noto Sans JP | 15px | **600** | 21.9px（1.46） | normal |
| CTA・補助 | YakuHanJP + Noto Sans JP | 12px | 400 | 16.8px（1.40） | 0.96px（継承） |
| タグ・注記 | Noto Sans JP | 12px | 400 | 17.52px（1.46） | 0.88px（継承） |
| フッター注記 | Hiragino Kaku Gothic ProN | 11px | 400 | 1.45 | — |

**サイズの分布（トップ・可視 309 要素）**: 15px(135) → 14px(62) → 12px(35) → 22px(16) → 16px(14) → 11px(11) → 18px(9)

**ウェイトの分布**

| ページ | 300 | 400 | 600 | 700 |
|--------|-----|-----|-----|-----|
| トップ | — | **301** | 7 | 1 |
| `/kodate/` | あり | 237 | — | あり |

> **400 一本で組む。** 600 はメガメニューの開閉ボタン 7 要素だけ、700 は緊急のお見舞い告知 1 要素だけ。**見出しを太字にしていない。階層はサイズと字間で作る。**
> **`font-weight` を 400 以外にすると YakuHanJP が外れる**（`loaded` は 400 のみ）。見出しを太くすると**約物だけ全角に戻る**。

### 3.5 行間・字間

**行間は 1.40〜1.46 に集中している。**

| 値 | 実測（トップ） | 用途 |
|----|------|------|
| **1.46** | **92 要素** | ナビ・リスト・メガメニュー・カード |
| **1.40** | **84 要素** | 本文・CTA・ホームラウンジ導線 |
| **1.43** | **57 要素** | フッターのリンク群 |
| 1.44 | 15 要素 | グローバルナビ |
| 1.80 | 8 要素 | **緊急告知（お見舞い）の本文だけ**行間を開ける |
| 1.77 | — | セクション見出しの 2 行組（26px / 46px） |
| 1.27 / 1.25 / 1.35 | 各 7〜11 要素 | 欧文ラベル・大見出し |

> **本文の行間が 1.40 と狭い。** 日本語サイトの標準（1.7〜2.0）より詰まっている。**情報量の多いコーポレートサイトの密度**として意図的に選ばれている。**1.8 に広げないこと**（広げてよいのは緊急告知だけ）。

**字間は「継承の px」と「見出しの em」の 2 流儀が同居している。**

| 流儀 | 値 | 実測 | 当たる先 |
|------|----|------|----------|
| **継承（px）** | **0.96px** | **79 要素** | YakuHanJP スタックの全域。**15px でも 30px でも 0.96px のまま** |
| **継承（px）** | **0.36px** | **61 要素** | Noto Sans JP スタックのナビ・リスト。**10px でも 15px でも 0.36px** |
| 継承（px） | 0.88px | 18 要素 | メガメニュー。**12px でも 22px でも 0.88px** |
| 継承（px） | 1.4px | 53 要素 | メガメニューの見出し群 |
| 継承（px） | 1.44px | 19 要素 | グローバルナビ |
| **em を各要素に** | **0.1em** | 1.5px(13) / 2.4px(7) / 3.1px(7) | 15px→1.5px、24px→2.4px、31px→3.1px |
| **em を各要素に** | **0.08em** | 2.08px | 26px の大見出し |
| `normal` | — | 24 要素 | メガメニューの開閉ボタン・一部の span |

> **`0.96px` `0.36px` `0.88px` を `em` に読み替えないこと。** サイズが違うのに px が同じ＝**上位要素に書いた `em` が px として継承されている**。子要素で `em` を書き直すと値が変わる。
> **見出しの `0.1em` / `0.08em` は逆に各要素に当てている**（サイズに比例して px が変わる）。**大きい文字ほど空ける**設計。

### 3.6 禁則処理・改行ルール

- 見出しは**要素を分けて改行**（「新築戸建・土地活用」「リフォーム・不動産」）。`<br>` に頼っていない
- メガメニューのラベルは `[注文住宅]` のように**角括弧を別 `span`** にして、親と別の字間を当てている
- 行末揃えは **`text-align: left`**

### 3.7 OpenType 機能

**`font-feature-settings: "palt"` が 860 要素に継承されている。しかも `YakuHanJP` と併用している。**

これは**約物を詰める手段が二重に入っている**状態。

| 要素 | 約物を詰めているもの |
|------|----------------------|
| `Yakuhanjp, "Noto Sans JP", sans-serif`（176 要素） | **YakuHanJP のサブセットグリフ**が約物を半角で描く。`palt` も継承されている |
| `"Noto Sans JP", sans-serif`（102 要素） | **`palt` だけ**が効く |

> **新規実装ではどちらか一方に寄せること。**
> - **YakuHanJP を使うなら `palt` は書かない**（約物は YakuHanJP が処理する）
> - **`palt` だけで済ませるなら YakuHanJP を読み込まない**（リクエストが 1 本減る）
>
> 実サイトは両方入れているが、**同じ目的の処理を重ねる必要はない**。`tnum` は使っていない（数字の字幅は揃えていない）。

**`/kodate/` では `font-feature-settings` が 0 要素。** 同じサイト内で `palt` の有無が分かれている。

### 3.8 縦書き

**縦組みは 5 要素。すべて欧文ラベル。**

```css
/* 事業領域のラベル（HOME+Advanced など） */
.section-projects__copy {
  writing-mode: vertical-rl;
  font-family: Outfit, sans-serif;   /* 和文ではなく欧文 */
  font-size: 15px;
  line-height: 19px;                 /* 1.27 */
  letter-spacing: 1.2px;             /* 0.08em */
  color: #c7c7c7;
}
```

- **和文を縦に組んでいるのではない。** `HOME+Advanced` `HOME+Upgrade Life` `HOME+Create-Value` `HOME+Global Partners` `HOME+More Heart` の **5 つの事業ラベルを、欧文のまま縦に倒している**
- 色は `#c7c7c7`（淡いグレー）。**背景の装飾として置かれている**
- 下層（`/kodate/`）には縦組みが**無い**
- **外部ウィジェット由来ではない**（`classes` が `section-projects__copy` の自前クラス）

> **欧文を縦組みにすると字が横倒しになる。** ここでは意図的にそうしている（装飾）。**読ませる文字には使わないこと。**

### 3.9 同一サイト内の 2 つのデザインシステム

**コーポレートトップと `/kodate/`（注文住宅）は別系統。**

| | トップ（コーポレート） | `/kodate/`（注文住宅） |
|---|---|---|
| 和文スタック | `Yakuhanjp, "Noto Sans JP", sans-serif` | **`"Noto Sans JP", sans-serif` 単独** |
| 欧文 | Outfit（可変） | **Oswald / Nobel-Book** |
| weight | 400 / 600 / 700 | **300 / 400 / 500 / 700 / 900** |
| `font-feature-settings` | `palt` 860 要素 | **0 要素** |
| 字間 | 継承の px ＋ 見出しの em | **`normal` が 174 要素** |
| `body` の font-size | 10px | **11px** |
| 縦組み | 5 要素 | 0 |
| コンテナ | 1200px（21 箇所） | 1200px（1 箇所） |
| ブレークポイント | `screen and (max-width: 480px)` **447 件** | 480 / 375 / 414 / 320 / 750 / 1200 / 1921px |

> **この DESIGN.md はコーポレート（トップ）側を採用している。** `/kodate/` は商品サイトとして別に作られており、**`font-weight: 300` の細い見出し（45px / 58px）と `Nobel-Book` の大きな欧文（78px）**という別の顔を持つ。
> **新規実装ではコーポレート側に統一すること。** 両方を混ぜると、字間（px 継承 vs `normal`）と太さ（400 一本 vs 300〜900）が衝突する。

---

## 4. Component Stylings

### Buttons

**面を塗らない。白地に青い枠線が基本。**

```css
/* Primary — 白地＋青枠（「カタログ請求」「住まいのご相談」） */
.btn-primary {
  font-family: Yakuhanjp, "Noto Sans JP", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;      /* 1.40 */
  letter-spacing: 0.96px;   /* 継承値 */
  color: #0078be;
  background: #ffffff;
  border: 1px solid #0078be;
  border-radius: 4px;
  box-shadow: none;
}

/* Secondary — 白地・枠なし（メガメニューの項目） */
.btn-secondary {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
  letter-spacing: 0.36px;   /* 継承値 */
  color: #333333;
  background: #ffffff;
  border: 0;
  border-radius: 4px;
}

/* メガメニューの開閉ボタン — ここだけ 600 */
.btn-menu {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 21.9px;
  letter-spacing: normal;
  color: #ffffff;
  background: #0078be;
}
```

> **`border-radius: 4px` が既定**（実測 150 要素）。ピルにも直角にもしない。
> **CTA を青ベタで塗らない。** 青は枠線と文字に使う（ベタ塗りはメガメニューの開閉ボタンだけ）。

### Cards

```css
.card {
  background: #ffffff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 0 10px 0;  /* 影は 1 種だけ */
}
```

> **影は 1 種類しかない（15 要素）。** `rgba(0,0,0,0.12) 0 0 10px 0` — **offset なしの全方向ぼかし**。濃さも 0.12 で淡い。**別の影を作らないこと。**

### Inputs

フォーム要素は露出していない。実装するなら**ボタンに合わせて `border-radius: 4px`・`border: 1px solid #0078be`・フォーカスリングは `#0078be`** で揃える。

---

## 5. Layout Principles

### Container

| 値 | 実測 | 用途 |
|----|------|------|
| **1200px** | **トップ 21 箇所・下層 1 箇所** | 標準コンテナ。**ほぼ唯一の幅** |
| `calc(100% - 120px)` | 1 箇所 | 全幅帯（左右 60px ずつ余白） |
| 1227px | 1 箇所 | カルーセルのはみ出し分 |

### Spacing Scale

`gap` の実測値: **4 / 14 / 15 / 30 / 32 / 50 / 58 / 80px**。

**最頻値は 50px（7 箇所）**。セクション内のカラム間はここで揃える。

| 用途 | 値 |
|------|-----|
| カラム間・カード間 | **50px** |
| セクション間 | 80px |
| 小さい要素間 | 14 / 15px |
| アイコンと文字の間 | 4px |

### Grid

- メガメニューは**多段**（「住まい」「土地活用」「リフォーム」「複合開発」…）。1 枚の中に 20 項目以上が並ぶ
- ヒーローは**タブ切り替え付きの全画面**（`BAUHAUS` / `FINLAND`）。タブは `rgba(255,255,255,0.29)` の半透明面
- 円形要素（`border-radius: 50%`）が 116 箇所 — アイコン・矢印ボタン

---

## 6. Depth & Elevation

**`box-shadow` は 1 種類だけ（15 要素）。**

```css
box-shadow: rgba(0, 0, 0, 0.12) 0 0 10px 0;
```

- **offset は 0。** 下に落とさず、全方向に均等にぼかす
- 濃さは **0.12**。強く落とさない

層は次の 3 つで作る。

1. **この 1 種類の影** — カードを浮かせるとき
2. **面色の差** — `#ffffff` / `#f8f8f9` / `#d6dee3` / `#6d7b84`
3. **罫** — CTA の `1px solid #0078be`

> **影を増やさないこと。** hover で影を濃くする指定も無い（hover は `@media (hover: hover)` で別に管理されている）。

### Border Radius

| 値 | 実測 | 用途 |
|----|------|------|
| **4px** | **150 要素** | **既定**。CTA・カード・入力欄 |
| 50% | 116 要素 | アイコン・矢印ボタン |
| 8px | 6 要素 | 「ミサワホームについて ABOUT US」の大きい面 |

---

## 7. Do's and Don'ts

### Do（推奨）

- **スタックを 2 系統に分ける。** 約物が出る文（見出し・リード）は `Yakuhanjp, "Noto Sans JP", sans-serif`、短い語（ナビ）は `"Noto Sans JP", sans-serif`
- **`html { font-size: 10px }` を前提に `rem` を書く**
- **`font-weight` は 400 で通す。** 階層はサイズと字間で作る
- **字間は上位要素に書いて px で継承させる**（`0.96px` / `0.36px`）。**見出しだけ `0.1em` / `0.08em` を各要素に**
- **行間は 1.40〜1.46**。広げるのは緊急告知（1.80）だけ
- **CTA は白地＋`#0078be` の 1px 枠**、`border-radius: 4px`
- 影は **`rgba(0,0,0,0.12) 0 0 10px 0` の 1 種類だけ**
- コンテナ **1200px**、`gap` は **50px** を基準に

### Don't（禁止）

- **`body` の `"Hiragino Kaku Gothic ProN"` を書体の根拠にしない。** 実体は Noto Sans JP（それが効いているのは 11 要素だけ）
- **`YakuHanJP` と `palt` を両方書かない。** 実サイトは併用しているが、**同じ目的の処理を重ねる必要はない**。どちらか一方に寄せる
- **`font-weight` を 400 以外にしない。** YakuHanJP は 400 しか `loaded` ではないため、**約物だけ全角に戻る**
- **`letter-spacing` の継承値（0.96px / 0.36px / 0.88px）を `em` に読み替えない。** サイズが違っても同じ px であることが設計
- **本文の行間を 1.8 に広げない。** このサイトの密度は 1.40
- **青 `#0078be` をベタ塗りの CTA にしない。** 枠線と文字に使う
- **影を増やさない。** 実測 1 種・offset 0・濃さ 0.12
- **`/kodate/` の作法（`normal` 字間・weight 300・Oswald / Nobel-Book）を混ぜない。** 別のデザインシステム
- **縦組みを和文に使わない。** 縦に組んでいるのは欧文の装飾ラベルだけ

---

## 8. Responsive Behavior

### Breakpoints

| メディアクエリ | 実測（トップ） | 意味 |
|----------------|------|------|
| **`screen and (max-width: 480px)`** | **447 件** | **主軸**。スマートフォン |
| **`screen and (min-width: 481px)`** | **47 件** | PC・タブレット |
| `(hover: hover)` / `(hover: none)` | 各 19 件 | ホバーの有無で分岐 |
| `(min-width: 481px) and (max-width: 768px) and (max-aspect-ratio: 1/1)` | 3 件 | **縦向きタブレット専用** |
| `screen and (hover: hover) and (min-width: 481px)` ほか | 各 1 件 | 組み合わせ |

> **480px を境に二分している。** 中間のタブレット幅に専用のレイアウトを持たず、**`max-aspect-ratio: 1/1`（画面が縦長かどうか）で縦向きタブレットだけを拾う**のが特徴。
> **`(hover: hover)` と `(hover: none)` を両方書いている。** タッチデバイスにはホバーの代わりの表現を当てている。**新規実装でも `:hover` は `@media (hover: hover)` の中に書く。**

### タッチターゲット

メガメニューの項目は 15px の文字に上下パディングを足して 44px 相当を確保している。**文字サイズを上げずにパディングで作る。**

### フォントサイズの調整

480px 以下では本文 15px を保ち、見出し（31px / 30px / 26px / 24px）を縮める。**本文は縮めない。**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体:
  見出し・リード・CTA … Yakuhanjp, "Noto Sans JP", sans-serif  （400 のみ）
  ナビ・リスト        … "Noto Sans JP", sans-serif             （400 / 600）
  欧文ラベル          … Outfit, sans-serif                     （400）
色:
  ブルー #0078be（枠線・文字）／ 本文 #333333 ／ サービス名 #0e3e6a
  下地 #f8f8f8 ／ 相談窓口 #d6dee3 ／ 会社案内 #6d7b84 ／ 背景 #ffffff
ルート: html / body ともに font-size: 10px（rem は 10px 基準）
字間:  上位要素に書いて px で継承（0.96px / 0.36px）／見出しだけ 0.1em・0.08em
行間:  1.40〜1.46（緊急告知だけ 1.80）
太さ:  400 で通す（YakuHanJP は 400 しか loaded ではない）
形:    radius 4px ／ 影は rgba(0,0,0,0.12) 0 0 10px 0 の 1 種のみ
       コンテナ 1200px ／ gap 50px ／ BP 480px
```

### プロンプト例

> ミサワホームの DESIGN.md に従って、商品ラインアップのページを作ってください。
> 見出しとリードは `Yakuhanjp, "Noto Sans JP", sans-serif`、ナビとリストは `"Noto Sans JP", sans-serif` に分けてください。
> `html` と `body` の `font-size` は 10px です。`font-weight` は 400 で通してください（YakuHanJP が 400 しか読み込まれていないため、太くすると約物が全角に戻ります）。
> 字間は本文・ナビに **px で継承**させ（`0.96px` / `0.36px`）、見出しにだけ `letter-spacing: 0.1em` を各要素に当ててください。
> 行間は 1.4〜1.46 にしてください（1.8 に広げないでください）。
> CTA は白地に `#0078be` の 1px 枠・`border-radius: 4px`。影は `rgba(0,0,0,0.12) 0 0 10px 0` の 1 種類だけ使ってください。
> コンテナは 1200px、`gap` は 50px、ブレークポイントは 480px です。
> **`palt` は書かないでください**（YakuHanJP が約物を処理します）。

### 検証チェックリスト

- [ ] 書体を `body` の `"Hiragino Kaku Gothic ProN"` から決めていないか（実体は Noto Sans JP）
- [ ] `YakuHanJP` と `palt` を両方書いていないか
- [ ] `font-weight` が 400 で通っているか（400 以外だと約物が全角に戻る）
- [ ] `letter-spacing` の継承値を `em` に読み替えていないか
- [ ] 行間が 1.40〜1.46 か（1.8 に広げていないか）
- [ ] `html { font-size: 10px }` になっているか
- [ ] CTA を青ベタで塗っていないか（白地＋青枠）
- [ ] 影が 1 種類（`rgba(0,0,0,0.12) 0 0 10px 0`）だけか
- [ ] 縦組みを和文に使っていないか（欧文ラベルの装飾のみ）
- [ ] `/kodate/` 側の作法（`normal` 字間・weight 300）を混ぜていないか
