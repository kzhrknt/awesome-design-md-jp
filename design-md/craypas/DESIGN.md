# DESIGN.md — サクラクレパス（SAKURA）

> 株式会社サクラクレパス（https://www.craypas.co.jp/）のデザイン仕様書。
> 1921 年創業。**クレパス**（1925 年発売、同社の登録商標）、クーピーペンシル、ボールサインを擁する画材・文具メーカー。
> **白地に赤 1 色 ＋ 画材の色**という二層構造。UI の骨格は赤と黒だけで組み、色が要る場所（カテゴリ、ハッシュタグ、メガメニュー）には**クレパスの色箱のように多色を割り当てる**。
> **⚠️ 赤が 5 種類混在している**。`#ff0302`（NEW バッジ）、`#cb0201`（主 CTA）、`#fe0000`（タブ）、CSS キーワード `red` = `#ff0000`（ヘッダー CTA）、`#d90000`（全幅の帯）。**CSS 中に `red` というキーワード指定が 82 箇所**あり、これが色ブレの主因。新規実装では下記の Do's and Don'ts に従って 2 色に整理すること
> **Web フォントを読み込まない**。`"Yu Gothic Medium"` を先頭に置く OS フォントスタック。CSS Custom Properties は **0 個**
> **`palt` を 106 箇所宣言しているのに、トップ・商品ページでは 1 要素も効いていない**。宣言はすべて `.c-stafflist__item` など採用・スタッフ系コンポーネントに閉じており、computed は全要素 `normal`
> **角丸は 8px / 16px / 10px / 50% / 15px / 20px と多段**。`border-radius` の宣言は合計 500 件超で、統一トークンを持たない
> 実サイトの computed style 実測（2026-08-30 取得。トップ ＋ 商品トップ `/products/`）＋ 読み込まれる CSS 1.18MB の直接集計に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白と余白を広く取り、写真と赤で引っ張る**。ヒーローは 3 枚並びのスライダー、その下は白地に写真カードを大きく置く構成。区切りは罫線ではなく **全幅の赤い帯（`#d90000`）と淡い面色**で作る
- **サクラクレパスについて**: 幼児・学校向けの画材から、`SAKURA craft_lab` のようなプレミアム筆記具まで幅を持つ。**サイトも「子ども向けのポップさ」と「工業製品の端正さ」を両立させる必要があり、多色と赤 1 色を場面で切り替えている**
- **密度**: **中〜低**。コンテンツ幅は 1152px（1440px ビューポート）、本文の行間は **1.5**。カード間の余白が広く、スクロール量は多い
- **キーワード**: 白地、赤の丸バッジ、丸ゴシック的な角丸、画材の多色、影付きの押せる面
- **特徴**:
  - **NEW バッジが「丸」**。56×56px の正円（`border-radius: 50px`）に `#ff0302`、白の 2px 枠付きで写真の左上に重ねる。**このサイトで最も目に入るブランド要素**
  - **主 CTA は影を持つ**。`box-shadow: 0 5px 10px 0 rgba(0,0,0,.1)`（CSS 出現 72 回）。**ゼブラ・よーじやと違い、押せる面は浮かせる**
  - **リンクの行頭に赤い丸ポチ**を置く（`::before` の 8px 円）。一覧のタイトルはすべてこの形
  - **カテゴリ・ハッシュタグに画材の色を割り当てる**。「観る」`#3090c1` / 「体験」`#d41c19` / 「知る」`#005330`、ハッシュタグは `#12b4e0`（シアン）と `#f069a8`（ピンク）を交互に。**クレパスの色箱を UI に持ち込んでいる**
  - **メガメニューは対象者ごとに面色が変わる**。教職員 `#feffb2`（淡黄）／企業情報 `#366d91`（藍）／採用情報 `#7dd78f`（若草）
  - **`letter-spacing` は見出しにだけ効く**。本文は `normal`、見出しは `0.05em`〜`0.15em`。CSS 宣言の最頻値は `1px`（42 回）と `.05em`（27 回）
  - **アウトラインボタンの枠が淡い赤**（`1px solid #ff8080`）。黒やグレーの枠を使わない

---

## 2. Color Palette & Roles

> 地は `#ffffff`。`pageBackground.resolved` は `viewportTopBySample (3/4)`。

### Brand（ブランド）

- **Sakura Red** (`#ff0302`, rgb 255,3,2): **ブランドの赤**。NEW バッジ、カテゴリ見出しのアイコン、行頭の丸ポチ。CSS 出現 **18 回**でこの色群の最多
- **Deep Red** (`#cb0201`, rgb 203,2,1): **主 CTA の面色**（「もっと見る」「もっと詳しく商品を探す」）。CSS 出現 **9 回**
- **Band Red** (`#d90000`, rgb 217,0,0): 全幅の赤い帯（ブランドメッセージのセクション）
- **Crimson** (`#9a0816`, rgb 154,8,22): メガメニュー内のリンク文字。CSS 出現 4 回

### ⚠️ 赤のブレ（実装の実態）

| 色 | 出所 | 使われている場所 |
|----|------|----------------|
| `#ff0302` | CSS 18 回 | NEW バッジ（56px の正円）、カテゴリ見出し |
| `#cb0201` | CSS 9 回 | 主 CTA（radius 8px ＋ 影） |
| `#fe0000` | CSS 10 回 | タブの選択状態「ALL」（radius 20px） |
| **`red`（= `#ff0000`）** | **CSS キーワード 82 回**（うち `background-color:red` 10 回） | ヘッダーの「お問い合わせ」、ONLINE SHOP の枠、スライダーの操作ボタン |
| `#d90000` | CSS 1 回 | 全幅の赤い帯 |
| `#d9261c` | インライン | スクロールインジケータ |

**`red` キーワードが色ブレの主因**。新規実装では `#ff0302`（ブランド）と `#cb0201`（押せる面）の 2 色に整理する。

### 画材の色（カテゴリ・タグ）

| 用途 | 色 | 形 |
|------|-----|-----|
| 「観る」 | `#3090c1` | pill（radius 18.5px） |
| 「体験」 | `#d41c19` | pill |
| 「知る」 | `#005330` | pill |
| ハッシュタグ（奇数） | `#12b4e0` | 矩形（radius 0） |
| ハッシュタグ（偶数） | `#f069a8` | 矩形（radius 0） |
| メガメニュー・教職員 | `#feffb2` | 全幅の面 |
| メガメニュー・企業情報 | `#366d91` | 全幅の面 |
| メガメニュー・採用情報 | `#7dd78f` | 全幅の面 |

### Neutral / Surface

| 役割 | 色 | 用途 | CSS 出現 |
|------|-----|------|---------|
| ページ地 | `#ffffff` | 全ページ共通 | — |
| 面（淡赤） | `#ffe4e4` | ニュースのカテゴリチップ。**トップのユニーク背景色 1 位（57 回）** | 5 |
| 面（グレー） | `#f7f7f7` / `#f8f8f8` | スライダーの操作領域 | 9 |
| 枠（淡赤） | `#ff8080` | アウトラインボタンの枠 | 10 |

### Text

| 役割 | 色 | 用途 |
|------|-----|------|
| 本文 | **`#000000`** | `body` の既定色。**このサイトは純黒を使う** |
| 見出し（濃） | `#333333` | h3、ナビ、チップの文字 |
| 見出し（淡） | `#54544c` | 商品名・記事タイトル。**わずかに緑を含む墨色** |
| リンク（メニュー内） | `#9a0816` | メガメニューの子項目 |
| 反転 | `#ffffff` | 赤い帯・カテゴリ pill・NEW バッジの上 |

---

## 3. Typography Rules

### 3.1 和文フォント

**Web フォントを読み込まない。OS のフォントに任せる。**

- **ゴシック体**: **游ゴシック Medium**（Windows / macOS）→ **ヒラギノ角ゴ Pro W3**（macOS）→ **メイリオ**（Windows）
- **明朝体**: 使用しない
- **アイコンフォント**: `icomoon`（カテゴリ見出しのアイコン用。スタックの**先頭**に置かれる）

> **⚠️ Windows の游ゴシック問題**: `"Yu Gothic Medium"` は Windows 8.1 以降に同梱されるが、**`font-weight: 700` を当てると游ゴシック Bold ではなく合成太字になる**環境がある。SmartHR のように `@font-face` で Medium / Bold をマッピングする対策は、**このサイトでは行われていない**。見出しの多くが `font-weight: 700` なので、Windows では想定より太く潰れて見える可能性がある

### 3.2 欧文フォント

- **サンセリフ**: 和文フォント内の欧文グリフをそのまま使う（欧文専用フォントを先頭に置かない）
- **等幅**: 指定なし

### 3.3 font-family 指定

**和文優先のロングスタック**。

```css
/* 本文・見出し・UI すべて */
font-family: "Yu Gothic Medium", "游ゴシック Medium", YuGothic, 游ゴシック体,
             "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif;

/* アイコン付きの見出し（icomoon を先頭に足す） */
font-family: icomoon, "Yu Gothic Medium", "游ゴシック Medium", YuGothic, 游ゴシック体,
             "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif;
```

**フォールバックの考え方**:
- 英語名（`"Yu Gothic Medium"`）と日本語名（`"游ゴシック Medium"`）を**両方書く**（環境によって参照名が違うため）
- `YuGothic` / `游ゴシック体` はスペースなしの別名。**4 つ書いて初めて游ゴシックが確実に当たる**
- macOS 向けに `"ヒラギノ角ゴ Pro W3"`、Windows 旧環境向けに `メイリオ` を後段に置く
- **アイコンフォントは必ず先頭**（和文より前に置かないと合字が拾えない）

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Section Title | 32px | 700 | 48px (**1.5**) | 1.6px (0.05em) | 「おすすめ商品」 |
| Section Title（英） | 32px | 700 | 48px (1.5) | 4.8px (**0.15em**) | 「SAKURA PRESS」 |
| Hero Title | 32px | 700 | 41.6px (1.3) | 3.2px (0.1em) | 写真の上・白 |
| Page Title | 26px | 700 | 33.8px (1.3) | 2.6px (0.1em) | 下層の `h2` |
| Mega Menu Title | 26px | 700 | 39px (1.5) | normal | メガメニューの対象者名 |
| Category Title | 20px | 700 | 20px (1.0) | normal | アイコン付き。`#ff0302` または白 |
| CTA / Badge | 18px | 700 | 18〜27px | normal | 「もっと見る」「NEW」 |
| H3 | 18px | 700 | 27px (1.5) | normal | `#333333` |
| H3（商品名） | 16px | 700 | 24px (1.5) | normal | `#54544c` |
| Body | 16px | 400 | 24px (**1.5**) | normal | `body` |
| Nav / Link | 16px | 700 | 24px (1.5) | normal | ナビ・メニュー項目 |
| Tag | 14px | 400 | — | normal | ハッシュタグ |
| Chip | 12px | 700 | — | normal | ニュースのカテゴリ |

**`1.5` がこのサイトの基準行間**（`body` の 24 / 16）。見出しも本文も 1.5 で、締めるのは 1.3（ヒーロー・下層見出し）だけ。

### 3.5 行間・字間

- **本文の行間**: **1.5**。CSS 宣言では `1`（174 回・1 行に固定する要素）、`1.5`（112 回）、`1.4`（102 回）の順に多い
- **見出しの行間**: **1.3〜1.5**
- **本文の字間**: **`normal`**
- **見出しの字間**: `0.05em`（和文見出し）／ **`0.1em`〜`0.15em`**（英字見出し・ヒーロー）

**ガイドライン**:
- **本文に `letter-spacing` を足さない**。このサイトは見出しにだけ字間を入れる
- 英字の見出し（`SAKURA PRESS` など）は `0.15em` まで開ける。**和文見出しは `0.05em` に留める**
- 日本語本文の `line-height: 1.5` は下限に近い。**行長が長いブロックでは 1.7〜1.8 に上げる**（実サイトも記事本文では `1.8125` を使っている）

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

**行頭禁止**: `）」』】〕〉》、。，．・：；？！`
**行末禁止**: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* 宣言はあるが、トップ・商品ページでは効いていない */
font-feature-settings: "palt";
```

- **CSS 中に `palt` が 106 箇所**あるが、**computed で `font-feature-settings` が `normal` 以外になる要素は 0 件**（トップ・商品トップとも）
- 宣言先はすべて `.c-stafflist__item .txtarea__tit` など**採用・スタッフ紹介系のコンポーネント**で、トップページには存在しない
- **⚠️ 「CSS に書いてある ＝ 効いている」ではない**。字詰めの有無は必ず computed で確認する
- 新規実装では、**見出しにだけ `palt` を当て、本文には当てない**（実サイトの宣言もすべて見出し・ラベル系）

### 3.8 縦書き

該当なし。`writing-mode` の宣言は存在しない。

---

## 4. Component Stylings

### Buttons

**Primary（主 CTA）— 「もっと見る」**

- Background: `#cb0201`
- Text: `#ffffff`
- Padding: `15px 30px`
- Border Radius: **`8px`**
- Font Size: 18px / Weight 700
- Shadow: **`0 5px 10px 0 rgba(0,0,0,.1)`**（CSS 出現 72 回）
- 右端に `+` を置く

```css
.btn-primary {
  padding: 15px 30px;
  border: 0;
  border-radius: 8px;
  background: #cb0201;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .1);
}
```

**Header CTA — 「お問い合わせ」**

- Background: `red`（= `#ff0000`。**実装の実態。新規では `#cb0201` に寄せる**）
- Text: `#ffffff`
- Padding: `20px 0`
- Border Radius: **`7px`**
- Font Size: 16px / Weight 700

**Outline — 「ONLINE SHOP」**

- Background: `#ffffff`
- Text / Border: `2px solid #ff0000`
- Border Radius: `7px`
- Padding: `32px 0 6px 11px`（上にカートアイコンを置くため上 padding が広い）

**Outline Pill — メガメニュー内の導線**

- Background: `transparent`
- Text: `#333333`
- Border: **`1px solid #ff8080`**（淡い赤。黒やグレーは使わない）
- Padding: `8px 30px`
- Border Radius: `30px` または `9999px`
- Font Size: 16px / Weight 700
- 右端に `→`

**Tab — 「ALL / お知らせ / リリース」**

- 選択: Background `#fe0000` / Text `#ffffff` / Border Radius `20px` / Padding `6px 0`
- 非選択: Background `transparent` / Text `#000000` / Border Radius `20px`

### Badge / Chip

**NEW バッジ（このサイトの象徴）**

```css
.products-new {
  width: 56px;
  height: 56px;
  padding: 17px 0;
  border: 2px solid #fff;
  border-radius: 50px;       /* 正円 */
  background: #ff0302;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}
```

**カテゴリチップ（ニュース）**

- Background: `#ffe4e4` / Text: `#333333`
- Padding: `4px 15px` / Border Radius: `20px` / 12px / 700

**カテゴリ pill（観る・体験・知る）**

- Background: `#3090c1` / `#d41c19` / `#005330` / Text: `#ffffff`
- Padding: `5px 50px` / Border Radius: `18.5px` / 16px / 700

**ハッシュタグ**

- Background: `#12b4e0` / `#f069a8`（交互） / Text: `#ffffff`
- Padding: `4px 8px 10px 15px` / **Border Radius: `0`** / 14px / 400
- **タグだけ角丸を持たない**

### Link（一覧のタイトル）

行頭に 8px の赤い正円を `::before` で置く。

```css
.list-link::before {
  content: "";
  display: inline-block;
  width: 8px; height: 8px;
  margin-right: 8px;
  border-radius: 50%;
  background: #ff0302;
}
```

### Cards

- Background: `#ffffff`
- Border: なし（写真そのものがカードの面）
- Border Radius: `8px`〜`16px`
- Shadow: `0 10px 10px -6px rgba(0,0,0,.25)`（CSS 出現 **96 回**でサイト最多）

---

## 5. Layout Principles

### Spacing Scale

CSS 変数を持たないため、実測から導ける段階のみ。

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 15px |
| M | 30–32px |
| L | 40px |
| XL | 60px |

### Container

- Max Width: **1152px**（1440px ビューポートでの実測。最頻値 36 回）
- サブコンテナ: 1028px / 1000px / 830px
- 赤い帯・ヒーローは全幅（100vw）

### Grid

- 商品カード: 4 カラム / gap `32px`
- 記事カード: 3 カラム / gap `40px 30px`

---

## 6. Depth & Elevation

**このサイトは影を積極的に使う**。押せる面・浮いている面を影で示す。

| Level | Shadow | 用途 | CSS 出現 |
|-------|--------|------|---------|
| 0 | `none` | フラットな要素 | 18 |
| 1 | `0 5px 10px 0 rgba(0,0,0,.1)` | **主 CTA・ボタン** | **72** |
| 2 | `0 10px 10px -6px rgba(0,0,0,.25)` | **カード・写真ブロック** | **96** |
| 3 | `0 2px 15px 0 rgba(0,0,0,.1)` | 固定ヘッダー・メガメニュー | 18 |
| 4 | `0 5px 10px 3px rgba(0,0,0,.3)` | モーダル・オーバーレイ | 20 |

---

## 7. Do's and Don'ts

### Do（推奨）

- **赤は 2 色に整理する**。ブランド／バッジ = `#ff0302`、押せる面 = `#cb0201`
- NEW バッジは **56px の正円 ＋ 白 2px 枠 ＋ `#ff0302`**。この形を崩さない
- 押せる面には影を付ける（`0 5px 10px 0 rgba(0,0,0,.1)`）
- アウトラインボタンの枠は **淡い赤 `#ff8080`**。黒やグレーの枠を使わない
- 一覧のリンクは行頭に **8px の赤い丸**
- カテゴリ・タグには**画材の色**（シアン・ピンク・藍・若草）を割り当ててよい。ただし**UI の骨格（ボタン・見出し）には赤しか使わない**
- 本文の `line-height` は **1.5**、`letter-spacing` は `normal`
- 英字見出しの字間は `0.1em`〜`0.15em`、和文見出しは `0.05em`
- `font-family` は英語名・日本語名・スペースなし別名を**すべて列挙する**

### Don't（禁止）

- **CSS キーワード `red` を使わない**。実サイトに 82 箇所あり、これが `#ff0000` / `#ff0302` / `#fe0000` の混在を生んでいる。**必ず hex で書く**
- **本文に `letter-spacing` を足さない**
- **`palt` をグローバルに当てない**。実サイトの宣言もスタッフ紹介などの見出し限定
- **ハッシュタグに角丸を付けない**（`border-radius: 0` が意図）
- 見出しの `font-weight: 700` を Windows で確認せずに使わない（游ゴシックの合成太字問題）
- カテゴリ pill の 3 色（`#3090c1` / `#d41c19` / `#005330`）を**ボタンに転用しない**。分類のための色であって、押せることを示す色ではない

---

## 8. Responsive Behavior

### Breakpoints

**PC ファースト**。`max-width` で下に落とす。

| Name | Width | 宣言回数 | 説明 |
|------|-------|---------|------|
| Mobile | ≤ 767px | **1028** | **主分岐**。メガメニュー → ドロワーへ |
| Tablet | ≥ 768px | 457 | PC レイアウトの起点 |
| Desktop | ≤ 1279px | 193 | コンテナ幅の縮小 |
| Wide | ≥ 1600px | 6 | ヒーローの最大化 |

```css
/* 主分岐 */
@media screen and (max-width: 767px) { /* SP */ }
```

### タッチターゲット

- 最小サイズ: 44px × 44px
- 主 CTA は実測 `320 × 57px`
- NEW バッジは 56×56px（タップ対象ではなく表示のみ）

### フォントサイズの調整

- セクション見出し 32px → SP 22〜24px
- 本文 16px は SP でも維持
- 主 CTA 18px → SP 16px、幅は 100%（左右 15px のマージン）
- **メガメニュー（対象者ごとの色面）は SP では出さない**。アコーディオンのドロワーに置き換える

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Red:     #ff0302     /* バッジ・アイコン・丸ポチ */
CTA Red:       #cb0201     /* 押せる面 */
Text Color:    #000000
Sub Text:      #333333 / #54544c
Chip Surface:  #ffe4e4
Outline:       #ff8080
Background:    #ffffff
Font: "Yu Gothic Medium", "游ゴシック Medium", YuGothic, 游ゴシック体,
      "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif
Body Size:     16px
Line Height:   1.5
Letter Spacing: normal（見出しのみ 0.05em / 英字 0.1〜0.15em）
Border Radius: 8px（ボタン）/ 20px（チップ）/ 50%（バッジ）/ 0（タグ）
Box Shadow:    0 5px 10px 0 rgba(0,0,0,.1)（ボタン）
               0 10px 10px -6px rgba(0,0,0,.25)（カード）
```

### プロンプト例

```
サクラクレパスのデザインシステムに従って、商品一覧ページを作成してください。
- フォント: "Yu Gothic Medium", "游ゴシック Medium", YuGothic, 游ゴシック体,
  "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif
- 本文: 16px / line-height 1.5 / letter-spacing normal / #000000
- セクション見出し: 32px / 700 / line-height 1.5 / letter-spacing 0.05em
- 新商品には 56×56px の正円バッジ「NEW」（#ff0302 / 白 2px 枠 / 18px / 700）を
  カード画像の左上に重ねる
- 主 CTA: #cb0201 / 白文字 / padding 15px 30px / border-radius 8px / 18px / 700 /
  box-shadow 0 5px 10px 0 rgba(0,0,0,.1)、右端に「＋」
- カードの影: 0 10px 10px -6px rgba(0,0,0,.25)
- ハッシュタグは #12b4e0 と #f069a8 を交互に、border-radius 0
- 赤は #ff0302 と #cb0201 の 2 色だけ。CSS キーワード red は使わない
```

### 実装時の落とし穴

- **`red` と書かないこと**。実サイトの色ブレはここから来ている
- **`palt` は CSS にあるが効いていない**。実装の意図を確認せずに全体へ当てると、既存ページと字送りが変わる
- 游ゴシックは **`font-weight: 700` の実体を持たない環境がある**。太い見出しを多用する設計なので、Windows での見え方を必ず確認する
- **カード（角丸 8〜16px ＋ 影）とタグ（角丸 0）を同じ「囲み」と考えない**。役割で形が違う
