# DESIGN.md — 東京オペラシティ アートギャラリー（Tokyo Opera City Art Gallery）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-17 / 対象: `https://www.operacity.jp/ag/`, `https://www.operacity.jp/ag/exh/current_exhibitions/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **Web フォントを 1 つも使わない**。OS 標準の游ゴシック体に全面依存し、字間もいじらず、オレンジ1色で導線を引く美術館サイト
- **密度**: 中程度。コンテナ 1100px の中央寄せ、白地に点線の罫を引いて区切る
- **キーワード**: 游ゴシック体、**字間 `normal`**、**palt なし**、オレンジ `#e46a00`、シアン `#04a7c4`、**ボーダー 2px**

**このサイトの核心は4つある。**

1. **Web フォントがゼロ。** `document.fonts` に載るのは Swiper のアイコンフォント（`swiper-icons`・`unloaded`）だけ。**和文も欧文も 100% 端末のローカルフォント**で描画される
2. **`letter-spacing` は可視 300 要素中 298 要素が `normal`。** 例外は 2 つだけ（ヘッダーのサイト名 `0.28px`、見出し「アクセス」`1.728px`）。**このサイトは字を詰めも空けもしない**
3. **`font-feature-settings` は全要素 `normal`。palt を一切使わない。** 前項と合わせて、**和文組版に一切手を入れていない**設計
4. **ウェイトは 400 と 700 の2値だけ**（可視 95 要素中 700 が 50、400 が 45）。中間ウェイトを使わない

> **CSS Custom Properties は 4 個しかなく、うち 2 個は Swiper 由来**（`--swiper-theme-color` / `--swiper-navigation-size`）。自社トークンは `--clientWidth: 1440px` と `--zindex-header: 10` の2つだけ。**実装値そのものを仕様として扱うこと。**

---

## 2. Color Palette & Roles

**4色しかない。**

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Ink（本文・見出し）** | **`#000000`** | **可視 247 要素**。このサイトは**純黒を使う** |
| **Brand Orange** | **`#e46a00`** | **文字色 24 要素 / 面色 2 要素**。サイト名、リンク、CTA の枠と文字、セクション見出しの導線 |
| **White** | `#ffffff` | 可視 23 要素。オレンジ面・紺面の上の文字 |
| **Navy（支援セクション）** | **`#001e46`** | **文字色 5 要素 / 面色 2 要素**。フッター手前の「Arts友の会 / ご支援」帯 |
| Cyan（ヘッダーのピル） | **`#04a7c4`** | 面色 2 要素。ヘッダー右上の「Arts 友の会」「ご支援のお願い」 |
| Surface | `#f7f7f7` | 面色 3 要素。セクションの下地 |
| Dark surface | `#272727` | 面色 1 要素。「本日休館日」の黒帯 |

> **オレンジ `#e46a00` が導線、シアン `#04a7c4` はヘッダー右上の2つのピル専用、紺 `#001e46` は支援セクション専用。** シアンと紺を他の場所に持ち出さないこと。

### 点線の罫（このサイトの特徴的な区切り）

背景画像ではなく **`linear-gradient` で描いた点線**を使う（実測 3 箇所）。

```css
background: linear-gradient(to right,
  #707070, #707070 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px);
background-size: 4px 1px;
background-repeat: repeat-x;
```

> **`border-style: dotted` ではなくグラデーションで描く。** 2px の点 ＋ 2px の空きで、ブラウザ差の出ない均一な点線になる。

---

## 3. Typography Rules

### 3.1 和文フォント

**游ゴシック体（OS ローカル）のみ。Web フォントを配信しない。**

実測: 可視テキスト 95 要素のうち **95 要素すべて**が同じ 1 本のスタック。

### 3.2 欧文フォント

**専用の欧文フォントを持たない。** 和文と同じスタックの先頭（游ゴシック体）でラテン文字も描画される。数字（`2026.07.18［土］`）も同様。

### 3.3 font-family 指定

**このサイトのスタックは、Windows の游ゴシック問題を「フォールバック順」だけで解いている。**

```css
body {
  font-family: 游ゴシック体, YuGothic,
               "游ゴシック Medium", "Yu Gothic Medium",
               游ゴシック, "Yu Gothic",
               "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
               Osaka, メイリオ, Meiryo, "ＭＳ Ｐゴシック", sans-serif;
}
```

**順序の意味**

| 位置 | 名前 | 当たる環境 |
|------|------|-----------|
| 1–2 | `游ゴシック体` / `YuGothic` | **macOS**（Regular が当たる） |
| 3–4 | `游ゴシック Medium` / `Yu Gothic Medium` | **Windows**（← Regular より先に Medium を指定して細すぎを回避） |
| 5–6 | `游ゴシック` / `Yu Gothic` | Windows の保険（Regular） |
| 7–8 | ヒラギノ角ゴ Pro W3 | 游ゴシック非搭載の macOS |
| 9–12 | Osaka / メイリオ / ＭＳ Ｐゴシック | 旧 Windows |

> **`@font-face` を使わずに Windows の游ゴシック問題を回避している。** このリポジトリに収録済みの3流儀（SmartHR の別名 `AdjustedYuGothic`、白鶴酒造の別名 `MyYuGothicM`、カリモク家具の `Yu Gothic` 上書き）とは別の、**4つ目の流儀＝スタック順で解決する方式**。
> **利点**: CSS が1行で済み、`@font-face` の保守が要らない。
> **欠点**: Windows で Medium が当たるため、**macOS（Regular）と Windows（Medium）で太さが揃わない**。太さを厳密に揃えたいなら `@font-face` 方式を選ぶこと。
> **末尾の `メイリオ` / `ＭＳ Ｐゴシック` は現行環境ではまず到達しない。** 新規実装では落としてよい。

### 3.4 文字サイズ・ウェイト階層

`html` / `body` ともに `font-size: 16px`。

| 役割 | size | weight | line-height | letter-spacing |
|------|------|--------|-------------|----------------|
| **大見出し（セクション）** | **38px** | **700** | 38px（**1.0**）/ 57px（1.5） | normal |
| ページ見出し | 34px | **500** | 58px（1.71） | 0.34px |
| 中見出し | 32px | 700 | 53.33px（1.67） | normal（「アクセス」のみ 1.728px） |
| 小見出し | 24px | 700 | 40px（1.67） | normal |
| 展覧会タイトル | 18px | 700 | 30px（1.67） | normal |
| ナビ（第1階層） | 18px | 700 | 30px（1.67） | normal |
| ナビ（第2階層） | 15px | 700 | 25px（1.67） | normal |
| **本文** | **16px** | **400** | **26.67px（1.67）** | **normal** |
| 説明文・キャプション | 14px | 400 | 23.33px（1.67）/ 24px（1.71） | normal |
| サイト名（ヘッダー） | 14px | 700 | 22px（1.57） | 0.28px |
| ラベル・バッジ | 13px | 700 | 21.67px（1.67） | normal |
| フッター小 | 12px | 400 | 20px（1.67） | normal |

**サイズの分布（可視 95 要素）**: 14px(28) → 16px(20) → 15px(11) → 18px(11) → 12px(9) → 13px(8)

**ウェイトの分布**: **700 が 50、400 が 45。中間は下層ページの `h1` に 500 が 1 要素あるのみ。**

> **見出しは 700、本文は 400 の2値で組む。** 500 や 600 を使わない。

### 3.5 行間・字間

**字間は使わない。**

実測（可視 300 要素）:

| 値 | 出現 |
|----|------|
| **`normal`** | **298** |
| `0.28px` | 1（ヘッダーのサイト名・14px × 0.02em） |
| `1.728px` | 1（見出し「アクセス」・32px × 0.054em） |

> **`letter-spacing` を書かないこと。** このサイトの和文組版は「ブラウザ既定のまま」が仕様。
> 例外の 2 要素は狙ってというより実装上の揺れに近い。**再現する必要はない。**

**行間は 1.67 でほぼ統一。**

| 比率 | 出現 | 用途 |
|------|------|------|
| **1.67** | **67** | **本文・見出し・ナビ — ほぼすべて** |
| 1.50 | 6 | ニュース見出し |
| 1.0 | 1 | 大見出し（38px / 38px） |
| 4.38 / 3.62 / 2.62 | 8 | ボタンの1行ラベル（`line-height` で高さを作っている） |

> **`line-height: 1.67`（= 16px に対する 26.6667px）を全体の既定にする。** 和文サイトとしては標準的。
> **ボタンの高さは `padding` ではなく `line-height` で作られている**（例: 16px の文字に `line-height: 70px`）。この手法をそのまま写すか、`padding` に置き換えるかは実装者の判断でよいが、**混在させないこと**。

### 3.6 禁則処理・改行ルール

- `word-break` / `line-break` の明示指定なし。ブラウザ既定の日本語禁則に任せる
- 日付は **`2026.07.18［土］ - 09.23［水］`** のように**全角の白抜き角括弧 `［ ］`** で曜日を囲む。ハイフンではなく **`─`（罫線素片）または `-`** で期間をつなぐ
- 展覧会名の区切りに **`─`（U+2500）** を使う（例: `種と根っこ ─ 都市の耕し方`）

### 3.7 OpenType 機能

**使わない。**

実測: 可視 300 要素すべてが `font-feature-settings: normal`。**`palt` も `pkna` も当たっていない。**

> **このサイトは和文の字詰めを一切しない。** 游ゴシック体のプロポーショナルでない約物をそのまま見せる設計で、字間 `normal` と一貫している。**palt を足さないこと。**

### 3.8 縦書き

**使わない。** 実測で `writing-mode: vertical-rl` の要素は 0。

> 展覧会ページに現れる縦組みのタイポグラフィは、**展覧会側のキービジュアル画像**であってサイトの実装ではない。

---

## 4. Component Stylings

### Buttons

**ボーダーは 2px が基本。** 角丸は原則 0、ピルだけ例外。

```css
/* Primary（塗り）— 「オンラインチケット」「これまでのトピックス」 */
.btn-orange {
  background: #e46a00;
  color: #ffffff;
  border: 2px solid #e46a00;   /* ← 面色と同色の 2px 枠を必ず併せて指定 */
  border-radius: 0;
  font-size: 13px;             /* 大きいものは 16px */
  font-weight: 700;
}

/* Outline（白地）— 「お問い合わせフォーム」 */
.btn-orange-outline {
  background: #ffffff;
  color: #e46a00;
  border: 2px solid #e46a00;
  border-radius: 0;
  font-size: 13px;
  font-weight: 700;
}

/* Ghost（オレンジ文字＋細枠）— 「アクセス」「館内マップ」 */
.btn-orange-ghost {
  background: transparent;
  color: #e46a00;
  border: 1px solid #e46a00;
  border-radius: 0;
  font-size: 13px;
  font-weight: 700;
}

/* Reversed（写真の上）— 「オンラインチケット」 */
.btn-orange-rev {
  background: transparent;
  color: #ffffff;
  border: 2px solid #e46a00;   /* 枠だけオレンジ、文字は白 */
  border-radius: 0;
  font-size: 16px;
  font-weight: 700;
}

/* Navy（支援セクション）— 「Arts友の会」「東京オペラシティへのご支援」 */
.btn-navy {
  background: #ffffff;
  color: #001e46;
  border: 2px solid #ffffff;
  border-radius: 0;
  font-size: 16px;
  font-weight: 700;
}
```

### Pills

```css
/* ヘッダー右上の2つ — このサイトで唯一のシアン */
.pill-cyan {
  background: #04a7c4;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 400;
}

/* 写真の上の丸ボタン — 「開館スケジュール」 */
.pill-outline-white {
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 400;
  line-height: 31px;
}

/* お知らせの種別 */
.pill-press {
  background: #ffffff;
  color: #e46a00;
  border: 1px solid #e46a00;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
}
```

### Badges

```css
/* 会場表示「会場：ギャラリー 1, 2」 */
.badge-place {
  background: #ffffff;
  color: #000000;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 400;
}
```

### 角丸スケール（実測）

| 値 | 出現 | 用途 |
|----|------|------|
| **0px** | **290** | **既定。ボタン・カード・帯のすべて** |
| 6px | 3 | 会場バッジ |
| 2px | 3 | 小さなラベル |
| 25px | 2 | 丸ピル（開館スケジュール、プレスリリース） |
| 12px | 2 | ヘッダーのシアンピル |
| 28px | 1 | ページトップへ戻る円ボタン |

---

## 5. Layout Principles

### Container

| 値 | 用途 |
|----|------|
| **1100px** | **本文コンテンツの最大幅（最頻・6 箇所）** |
| 780px / 765px | 文章ブロック |
| 100% | 全幅の帯（黒帯・紺帯・フッター） |

`--clientWidth: 1440px` が JS から設定される（レイアウト計算用）。

### Grid

- 展覧会カードは 2〜3 カラム
- トピックスは**日付＋本文の2カラム**（日付列は左寄せ固定幅）で、行間を**点線の罫**で区切る

### z-index

`--zindex-header: 10`（ヘッダーの固定表示）

---

## 6. Depth & Elevation

**ほぼフラット。**

| レベル | 値 | 実測 |
|--------|----|------|
| 0（既定） | `none` | **可視 299 要素** |
| 1（唯一の影） | `rgba(0,0,0,.16) 0 2px 6px 0` | **1 要素** |

> **カード・ボタンに影を足さないこと。** 階層は **2px のオレンジ枠**、**点線の罫**、**`#f7f7f7` の面**、**黒帯 `#272727` / 紺帯 `#001e46`** で表す。

---

## 7. Do's and Don'ts

### Do（推奨）

- **Web フォントを読み込まない。** 游ゴシック体のスタック 1 本で組む
- **`font-family` の 3〜4 番目に `"游ゴシック Medium", "Yu Gothic Medium"` を置く**（Windows で Regular が細すぎるのを避ける）
- **`letter-spacing` を書かない**（`normal` のまま）
- **`font-feature-settings` を書かない**（palt を使わない）
- **ウェイトは 400 と 700 の2値**で組む
- **`line-height: 1.67` を既定**にする
- **ボタンの枠は 2px**。塗りボタンにも面色と同色の 2px 枠を併せて書く
- 区切り線は **`linear-gradient` の点線**（2px の点 ＋ 2px の空き）
- 日付は **`2026.07.18［土］`**（全角白抜き角括弧）、期間の区切りは **`─`**
- 色は**黒・オレンジ・白・紺・シアン**の5つに絞る

### Don't（禁止）

- **`palt` を当てない。** 実サイトは 300 要素すべてが `normal`
- **`letter-spacing` を足さない。** 「和文だから字間を開ける」という一般則をこのサイトに持ち込まない
- **Web フォント（Noto Sans JP など）を読み込まない。** ローカルフォント依存がこのサイトの設計
- **`font-weight` に 500 / 600 を使わない**（400 と 700 の2値）
- **角丸を既定にしない。** 290/300 要素が 0px。丸くするのはピルとバッジだけ
- **影を足さない**
- **シアン `#04a7c4` をヘッダーのピル以外に使わない。** 紺 `#001e46` を支援セクション以外に使わない
- **塗りボタンに `border: none` を書かない。** 実サイトは面色と同色の 2px 枠を併せ持つ（ホバーで反転させるための実装）
- **`border-style: dotted` で点線を引かない**（グラデーション方式）
- **スタック末尾の `メイリオ` / `ＭＳ Ｐゴシック` を必須と考えない。** 新規実装では落としてよい

---

## 8. Responsive Behavior

### Breakpoints

**min-width と `not all and (min-width)` を併用する古典的な方式。** 実測の出現回数順:

| 値 | 出現 | 位置づけ |
|----|------|----------|
| **`(min-width: 835px)`** | 30 | **主ブレークポイント（PC 表示の開始）** |
| `(min-width: 768px)` | 26 | タブレット |
| `not all and (min-width: 835px)` | 25 | **835px 未満（= スマホ）専用の打ち消し** |
| `not all and (min-width: 1080px)` | 8 | 1080px 未満 |
| `screen and (min-width: 1025px) and (max-width: 1100px)` | 4 | コンテナ幅の調整帯 |
| `screen and (max-width: 640px)` | 3 | 小型スマホ |
| `(max-width: 374px)` | 2 | 最小幅 |

> **`835px` が PC / スマホの境界。** 768px や 1024px ではない点に注意。

### タッチターゲット

ボタンの高さは `line-height`（31px / 34px / 70px）で作られている。**`line-height: 70px` の CTA は十分だが、`line-height: 31px` のピルは 44px に届かない。新規実装では `padding` で 44px 以上を確保すること。**

### フォントサイズの調整

`html` は 16px 固定。サイズは px で直接指定。

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ブランドカラー: #e46a00（オレンジ・導線）
サブ: #04a7c4（シアン・ヘッダーのピル専用）/ #001e46（紺・支援セクション専用）
本文色: #000000（純黒）
背景: #ffffff / 面 #f7f7f7 / 黒帯 #272727
罫線: #cccccc（バッジ）/ 点線は #707070 のグラデーション

フォント: Web フォントなし。OS ローカルのみ
游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック,
"Yu Gothic", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka,
メイリオ, Meiryo, "ＭＳ Ｐゴシック", sans-serif

本文: 16px / line-height 1.67 / letter-spacing normal / weight 400
見出し: 38px・32px・24px・18px / weight 700 / line-height 1.67（38px のみ 1.0）
letter-spacing: 書かない
font-feature-settings: 書かない（palt なし）

ボタン枠: 2px solid
角丸: 0（既定）/ 12px・25px（ピル）/ 6px（バッジ）
影: なし
コンテナ: 1100px
ブレークポイント: 835px（PC/スマホの境界）
```

### プロンプト例

```
東京オペラシティ アートギャラリーのデザインシステムで美術館サイトを作って。

- Web フォントは読み込まない。font-family は
  游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック,
  "Yu Gothic", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif
  （3〜4番目に Medium を置いて Windows で細くなるのを避ける）
- letter-spacing は書かない（normal のまま）
- font-feature-settings も書かない（palt を使わない）
- font-weight は 400 と 700 の2値だけ
- line-height は 1.67 を既定に、38px の大見出しだけ 1.0
- 本文色は純黒 #000000、導線はオレンジ #e46a00
- ボタンは border: 2px solid #e46a00 を必ず併せ、border-radius は 0
  塗り = 背景 #e46a00 + 文字 #ffffff、白地 = 背景 #ffffff + 文字 #e46a00
- ヘッダー右上の2つだけシアン #04a7c4 の border-radius: 12px のピル
- 支援セクションは背景 #001e46 に白枠 2px の白ボタン
- 区切り線は linear-gradient(to right, #707070, #707070 2px, transparent 2px, transparent 4px)
  を background-size: 4px 1px / repeat-x で敷いた点線
- 影は使わない。コンテナは 1100px
- ブレークポイントは 835px を境界にする
- 日付は 2026.07.18［土］ の形式、期間の区切りは ─ を使う
```
