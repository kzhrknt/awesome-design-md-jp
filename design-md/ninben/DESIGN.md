# DESIGN.md — にんべん（NINBEN）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-03 / 対象: `https://www.ninben.co.jp/`, `/about/`, `/company/philosophy/`

---

## 1. Visual Theme & Atmosphere

1699年（元禄12年）創業、日本橋の鰹節専門店。「この国の味、ここから。」を掲げる。
サイトは**生成りの地色 `#f8f8f5`** に**ヒラギノ明朝の大見出し**を置き、
本文はヒラギノ角ゴで `line-height: 2.0` に開く。**朱赤 `#e7190a` は
ロゴ・カレント・ホバー下線にだけ現れる**。

- **デザイン方針**: 生成り地＋明朝の大見出し。朱赤を1点だけ差す
- **密度**: 中〜低。写真を大きく使い、本文は2.0の行送りでゆったり読ませる
- **キーワード**: 生成り、明朝の大見出し、朱赤の下線、角丸なし、影なし

**このサイトの特徴的な癖（他サイトと違う点）**

1. **ページ地色が `#f8f8f5`**（生成り）。`html` / `body` は透明で、
   セクションの面色として敷かれている。純白ではない
2. **Webフォントを一切使わない**。CSS Custom Property もわずか2つ。
   ヒラギノ／メイリオ／游明朝のプラットフォームフォントだけで組む
3. **ゴシックが `Pro`、明朝が `ProN`**。本文は `"ヒラギノ角ゴ Pro"`（ProN ではない）、
   見出しは `"ヒラギノ明朝 ProN"`。**同じサイト内で Pro と ProN が混在する**
4. **`font-weight` がほぼ全部 `400`**。h1〜h3 も本文も 400。太字はロゴだけ。
   階層は**書体（明朝／ゴシック）とサイズ**でつくる
5. **リンクのホバー下線が `linear-gradient` で実装されている**。
   `background: linear-gradient(rgba(0,0,0,0) calc(100% - 1px), #e7190a 0)` を
   リンク内側の `<span>` に当て、**下1pxだけを朱赤で塗る**。`text-decoration` は使わない
6. **`border-radius` は `50%` と `3px` しか存在しない**。角丸の矩形が事実上ない。
   丸いのは円形バッジと PAGE TOP ボタンだけ
7. **`box-shadow` が1件もない**。影を完全に排除している
8. キャッチコピーの `letter-spacing` が **0.13em**（42px に 5.46px）と極端に広い

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値。すべて hex -->

### Base（基調）

- **Background** (`#f8f8f5`): **ページ地色**。生成り。トップ・下層の主面
- **Surface White** (`#ffffff`): 記事本文エリア、カードの面
- **Ink** (`#1b120f`): 見出し・本文・ナビ。黒茶（純黒ではない）
- **Text Sub** (`#6e6765`): サブナビ、補足リンク、タグ文字
- **Text on Photo** (`#ffffff`): 写真の上に置く見出し・本文

### Brand（ブランド）

- **Brand Red** (`#e7190a`): **朱赤**。ロゴ、カレントページ、ホバー下線、円形バッジ
- **Ink Fill** (`#1b120f`): 塗りリンク・PAGE TOP ボタンの面色

### Neutral（ニュートラル）

- **Surface Tag** (`#efefec`): 「ニュースリリース」等のタグ面
- **Text Muted** (`#6e6765`): 二次情報

**注意**: 有彩色は**朱赤 `#e7190a` の1色だけ**。緑・青・黄を足さない。
朱赤は「いま居る場所」と「触れる場所」にだけ現れる。

---

## 3. Typography Rules

### 3.1 和文フォント

**役割で明確に2系統に分ける**。

- **明朝体（見出し・キャッチコピー）**: `"ヒラギノ明朝 ProN", HiraMinProN-W3, 游明朝体`
- **ゴシック体（本文・ナビ・UI）**: `"ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", メイリオ`

**Webフォントを1本も読み込んでいない**。老舗の声を、端末の標準搭載書体だけでつくる。

> **Pro / ProN の混在に注意**: ゴシックは `Pro`、明朝は `ProN` を指定している。
> ProN は JIS2004 字形（辻・﨑などの正字）、Pro は JIS90 字形。
> 本文と見出しで字形が変わるが、**実サイトがそう書いているのでそのまま踏襲する**。

### 3.2 欧文フォント

専用の欧文フォントを持たない。**和文チェーンの `sans-serif` / `serif` フォールバックに委ねる**。
「ENGLISH」「PAGE TOP」「NIHONBASHI」等の欧文もヒラギノの欧文グリフで表示される。

### 3.3 font-family 指定

```css
/* 見出し・キャッチコピー（明朝） */
font-family: "ヒラギノ明朝 ProN", HiraMinProN-W3,
             游明朝体, "Yu Mincho", YuMincho, serif;

/* 本文・ナビ・UI（ゴシック） */
font-family: "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
             メイリオ, Meiryo, sans-serif;
```

**フォールバックの考え方**:
- **和文優先チェーン**。欧文フォントを先頭に置かない
- **Mac（ヒラギノ）が先、Windows（メイリオ／游明朝）が後**
- 游ゴシックをチェーンに入れていない。Windows はメイリオで受ける割り切り
- Webフォントを積まないぶん、**表示は端末依存で揺れる前提**の設計

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | ヒラギノ明朝 ProN | **56px** | 400 | 1.4 (78.4px) | 0 | 下層 h1「にんべんとは」 |
| Catch Copy | ヒラギノ明朝 ProN | 42px | 400 | 1.556 (65.33px) | **0.13em** (5.46px) | 「この国の味、ここから。」／**縦組み**（3.8 参照） |
| Section Title | ヒラギノ明朝 ProN | 42px | 400 | **1.714** (72px) | 0 | 「商品情報」 |
| Sub Section | ヒラギノ明朝 ProN | 28px | 400 | 1.682 (47.09px) | 0 | 「ブランドサイト」 |
| Banner Title | ヒラギノ明朝 ProN | 28px | 400 | 1.682 (47.09px) | 0 | 写真上・白文字 |
| Photo Title | ヒラギノ角ゴ Pro | 24px | 400 | **1.176** (28.24px) | 0.05em (1.2px) | 「日本橋本店」 |
| Recipe Title | ヒラギノ角ゴ Pro | 24px | 400 | 1.556 (37.33px) | 0.05em (1.2px) | 写真上・白文字 |
| Card Title | ヒラギノ角ゴ Pro | 20px | 400 | 1.5 (30px) | 0 | 「だし」「にんべんの約束」 |
| Card Title S | ヒラギノ角ゴ Pro | 18px | 400 | 1.5 (27px) | 0 | スライダー内の見出し |
| Body | ヒラギノ角ゴ Pro | 16px | 400 | **2.0** (32px) | 0.05em (0.8px) | 本文 |
| Body on Photo | ヒラギノ角ゴ Pro | 16px | 400 | 1.769 (28.31px) | 0.1em (1.6px) | バナーの説明文 |
| Nav | ヒラギノ角ゴ Pro | 15px | 400 | 1.733 (26px) | 0 | グローバルナビ |
| Card Text | ヒラギノ角ゴ Pro | 15px | 400 | 1.667 (25px) | 0 | カードの説明 |
| Caption on Photo | ヒラギノ角ゴ Pro | 15px | 400 | 1.385 (20.77px) | 0 | 「本物のだしの美味しさを体験」 |
| Breadcrumb | ヒラギノ角ゴ Pro | 13px | 400 | 1.769 (23px) | 0 | パンくず |
| Utility | ヒラギノ角ゴ Pro | 12px | 400 | 1.667 (20px) | **-0.07em** (-0.84px) | 「ネットショップ」 |
| Utility EN | ヒラギノ角ゴ Pro | 12px | 400 | 1.667 (20px) | 0.04em (0.48px) | 「ENGLISH」 |
| Sub Nav | ヒラギノ角ゴ Pro | 12px | 400 | **2.0** (24px) | 0 | ドロワー内の子リンク・`#6e6765` |
| Tag | ヒラギノ角ゴ Pro | 11px | 400 | — | **-0.04em** (-0.44px) | 「ニュースリリース」 |
| Base (body) | ヒラギノ角ゴ Pro | 16px | 400 | normal | 0 | 継承の基準値 |

**ウェイトは `400` 一択**。h1 のロゴだけ 700。
**明朝と角ゴの切替、サイズ、行送りの3つで階層をつくる**。

### 3.5 行間・字間

- **和文本文の `line-height` は `2.0`**（16px → 32px）。老舗の読み物としての余裕
- **明朝の大見出しは 1.55〜1.71**。42px → 65.33px / 72px。
  **サイズが大きいほど行送りを比率で詰めない**のがこのサイトの選択
- 写真の上に重なる見出しだけ **1.18** と極端に詰める（24px → 28.24px）
- **`letter-spacing` の基本は `0.05em`**（本文 0.8px ÷ 16px、写真見出し 1.2px ÷ 24px）
- **キャッチコピーだけ `0.13em`**（5.46px ÷ 42px）。「この国の味、ここから。」は
  **縦組み**なので、この字間は一文字ずつの縦の間隔として効く（3.8 参照）
- 写真上の本文は `0.1em`（1.6px ÷ 16px）と本文より広げる
- **カタカナのユーティリティは負の字間**。「ネットショップ」は `-0.07em`、
  タグは `-0.04em`。**狭い枠に収めるために詰める**

```css
/* 本文 */
.body {
  font-family: "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, sans-serif;
  font-size: 16px;
  line-height: 2.0;
  letter-spacing: 0.05em;
  color: #1b120f;
}

/* キャッチコピー */
.catch {
  font-family: "ヒラギノ明朝 ProN", HiraMinProN-W3, 游明朝体, serif;
  font-size: 42px;
  font-weight: 400;
  line-height: 1.556;
  letter-spacing: 0.13em;
}
```

### 3.6 禁則処理・改行ルール

- 「この国の味、ここから。」は縦組みの**1行に収める**前提。読点で折らない
- 「本枯鰹節」「フレッシュパック」「つゆの素」は途中で折らない
- 商品カテゴリ名の中黒（「つゆ・白だし・たれ・ぽん酢」）は行頭に来ないようにする

### 3.7 OpenType 機能

```css
font-feature-settings: normal;
```

- **`palt` を使っていない**。実測ですべての要素が `normal`
- 詰め組は `palt` ではなく **`letter-spacing` の正負で手当てしている**
  （見出しは `+0.13em` で開き、狭いユーティリティは `-0.07em` で詰める）
- **プロポーショナル詰めを前提にしたレイアウトを組まないこと**

### 3.8 縦書き

**使う。ただし1箇所だけ**。ブランドステートメント「この国の味、ここから。」の
`h2`（`p-about__title`）が `writing-mode: vertical-rl` の**縦組み**で置かれている。

```css
.brand-statement {
  writing-mode: vertical-rl;
  font-family: "ヒラギノ明朝 ProN", HiraMinProN-W3, 游明朝体, serif;
  font-size: 42px;
  font-weight: 400;
  line-height: 1.556;
  letter-spacing: 0.13em;   /* 縦組みでは行間ではなく字間として効く */
}
```

- **縦組みは 42px の明朝、`letter-spacing: 0.13em`**。この字間は
  横組みの見出しではなく**縦組みの一文字ずつの間隔**として設計されている
- 本文・ナビ・カード・フッターはすべて横組み。**縦組みを増やさない**
- 縦組みにするのは「店の名乗り」に相当する一文だけ、という使い分け

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| ヒラギノ明朝 ProN | **Shippori Mincho**（Google Fonts） | ヒラギノ明朝の穏やかな字面に近い。Noto Serif JP より横画が細く印象が合う |
| ヒラギノ角ゴ Pro | **Zen Kaku Gothic New**（Google Fonts） | ヒラギノ角ゴの広い字面・素直な骨格に近い |

**Mac 環境ではフォールバックが実サイトと一致する**ため、
`font-family` に実サイトの指定をそのまま先頭に置き、Google Fonts をその後ろに置く。

---

## 4. Component Stylings

### Links（このサイトの主役 — グラデーション下線）

**ホバー時に朱赤の下線が伸びる**。これがサイト全体の基本インタラクション。

```css
.link span {
  background: linear-gradient(rgba(0, 0, 0, 0) calc(100% - 1px), #e7190a 0);
  background-size: 0 100%;
  background-repeat: no-repeat;
  padding-bottom: 5px;
  transition: background-size .3s;
}
.link:hover span { background-size: 100% 100%; }
```

- **`text-decoration: underline` を使わない**。`linear-gradient` で下1pxだけを塗る
- 下線の色は必ず `#e7190a`（文字色が `#1b120f` でも下線は朱赤）
- `padding-bottom` で下線位置を調整（ナビ 5px / 見出し 1px / 本文リンク 1px）
- **カレントページはテキスト自体が `#e7190a`** になる

### Buttons

**Block Link（塗り）**

- Background: `#1b120f` / Text: `#ffffff`
- Border Radius: **`0px`**
- Padding: `5px 0` / Width: 244px（固定）/ Height: 57px
- Font: 15px / weight 400 / `letter-spacing: 0.053em` (0.8px)

```css
.btn-block {
  display: flex; align-items: center; justify-content: center;
  width: 244px; height: 57px;
  background: #1b120f;
  color: #fff;
  border-radius: 0;
  font-size: 15px;
  letter-spacing: .053em;
}
```

**Text Link（既定の「もっと見る」）**

塗りのボタンではなく、**グラデーション下線のテキストリンク**が既定。

- Font: 16px / weight 400 / Color: `#1b120f`
- 「すべての商品を見る」「レシピ一覧を見る」「一覧を見る」

### Badges

**Circle Badge（円形の札）**

- Background: `#e7190a` / Text: `#ffffff`
- Border Radius: **`50%`**
- Size: 80px（大・「今月のレシピ」2行）/ 40px（小・「お勧め」）
- Font: 13px（大）/ 12px（小）/ weight 400

写真の**左上に重ねる**。矩形のリボンではなく円。

**Tag（分類ラベル）**

- Background: `#efefec` / Text: `#6e6765`
- Border Radius: `3px` / Padding: `5px`
- Font: 11px / `letter-spacing: -0.04em`

用例: 「ニュースリリース」

### PAGE TOP

- Background: `#1b120f` / Border Radius: `50%` / Size: 56px × 56px
- フッターに固定

### Cards

- Background: `#ffffff`（生成り地の上に白の面）
- Border / Shadow: **なし**
- 構成: 写真（16:9 または 1:1）→ 見出し（角ゴ 20px / 1.5）→ 説明（角ゴ 15px / 1.667）
- 写真の上に文字を置くときは**白文字 ＋ 写真そのものを暗く処理した画像**を使う
  （CSS のスクリムを重ねていない）

### Navigation

- ヘッダー: ロゴ（朱赤の家紋 ＋ 明朝の「にんべん」）左、ナビ中央、
  検索・ネットショップ・カート右
- ナビ: 角ゴ 15px / `line-height: 1.733` / `#1b120f`。カレントは `#e7190a`
- ドロワー内の子リンクは 12px / `line-height: 2.0` / `#6e6765`
- ユーティリティ（ENGLISH / サイトマップ / プライバシーポリシー）は 12px

---

## 5. Layout Principles

### Container

| 用途 | Max Width |
|------|-----------|
| 標準 | **1200px** |
| 読み物・狭い版面 | 1000px |
| フルブリード | 1440px |

### Grid

- 商品カテゴリ: 4カラム（`c-cardCol4`）
- 企業情報カード: 3カラム（`c-cardCol3`）
- レシピ / 店舗: 写真グリッド（`c-gridRecipe` / `c-gridShop`）
- スライダー: 3〜4カラムの横スクロール（`c-swiperCol3` / `c-swiperCol4`）

### Hero

- 全幅の写真スライダー。中央に明朝の縦組み・横組みコピーを重ねる
- 生成り `#f8f8f5` の面がヒーローの外側を囲む

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 10px |
| M | 20px |
| L | 40px |
| XL | 80px |
| XXL | 120px |

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべての要素** |

**`box-shadow` が実測で1件もない**。カード・ヘッダー・ドロワー・モーダルすべて影なし。

奥行きは以下でつくる:
- **面色の差**（生成り `#f8f8f5` の上に白 `#ffffff` のカード）
- **写真そのもの**（暗く処理した写真の上に白文字）
- **1px の罫線**

---

## 7. Do's and Don'ts

### Do（推奨）

- ページ地色は **`#f8f8f5`**（生成り）。カードだけ `#ffffff` に上げる
- 見出しは**ヒラギノ明朝 ProN**、本文・UIは**ヒラギノ角ゴ Pro**で分ける
- `font-weight` は **400 で通す**。ロゴ以外に太字を使わない
- 和文本文の `line-height` は **2.0**、`letter-spacing` は **0.05em**
- ブランドステートメントは `writing-mode: vertical-rl` の縦組み・明朝 42px /
  `letter-spacing: 0.13em`
- リンクのホバーは **`linear-gradient` の朱赤1px下線**で表現する
- カレントページの文字色を `#e7190a` にする
- バッジは**円形（`border-radius: 50%`）**。矩形のリボンにしない
- 狭い枠のカタカナ（「ネットショップ」）は**負の字間**で詰める

### Don't（禁止）

- **影を使わない**（`box-shadow` はサイト全体で0件）
- **角丸の矩形をつくらない**（`border-radius` は 50% と 3px のみ）
- **朱赤 `#e7190a` 以外の有彩色を足さない**
- 見出しを太字にしない（明朝の 400 で十分な階層がつく）
- `text-decoration: underline` を使わない（グラデーション下線に統一）
- `font-feature-settings: "palt"` を当てない（このサイトは詰め組を使わない）
- Webフォントを追加しない（プラットフォームフォントで組む設計）
- 本文の `line-height` を 1.8 未満にしない

---

## 8. Responsive Behavior

### Breakpoints

**`999px / 1000px` を主境界とする**（一般的な 768px ではない）。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。ナビはハンバーガー＋アコーディオン |
| Tablet | 768–999px | 2カラム。グローバルナビは畳む |
| Desktop | ≥ 1000px | フルナビ表示。コンテナ 1200px |
| Wide | ≥ 1360px / 1400px / 1750px | ヒーロー・写真の拡大 |

さらに `320 / 340 / 360 / 370 / 375 / 500 / 600px` の細かい分岐があり、
**小型端末での明朝見出しの折返しを1pxずつ調整している**。

### Print

`@media print` を持つ。企業情報・お客様窓口ページの印刷を想定。

### モバイルでの変化

- グローバルナビ → ハンバーガー。展開後は `c-accordion` の階層メニュー
  （親 15px / 子 12px `#6e6765`）
- 明朝見出し 56px → 32px 前後、42px → 24px 前後。
  **縦組みのステートメントと `letter-spacing: 0.13em` は維持する**
- 本文 16px / 2.0 は**変えない**
- カード 4カラム → 2カラム → 1カラム

### タッチターゲット

- 最小 44px × 44px。円形バッジ 40px は装飾のため対象外
- Block Link は 57px の高さを確保済み

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #f8f8f5（生成り・ページ地色）
Surface:         #ffffff（カード・本文エリア）
Ink:             #1b120f（見出し・本文）
Text Sub:        #6e6765（サブナビ・タグ文字）
Brand Red:       #e7190a（ロゴ・カレント・ホバー下線・円形バッジ）
Surface Tag:     #efefec
Heading Font:    "ヒラギノ明朝 ProN", HiraMinProN-W3, 游明朝体, "Yu Mincho", serif
Body Font:       "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, sans-serif
Base Size:       16px
Line Height:     2.0（本文）/ 1.55〜1.71（明朝見出し）/ 1.18（写真上の見出し）
Letter Spacing:  0.05em（本文）/ 0.13em（キャッチコピー）/ -0.07em（狭い枠のカタカナ）
Font Weight:     400（すべて。ロゴのみ 700）
Border Radius:   50%（円形バッジ・PAGE TOP）/ 3px（タグ）/ 0px（それ以外すべて）
Shadow:          none（サイト全体で0件）
palt:            off（font-feature-settings: normal）
Container:       1200px（標準）/ 1000px（読み物）
Vertical:        writing-mode: vertical-rl（ブランドステートメント1箇所のみ）
Hover:           linear-gradient(rgba(0,0,0,0) calc(100% - 1px), #e7190a 0)
```

### プロンプト例

```
にんべん（NINBEN）のデザインシステムに従って、商品カテゴリページを作成してください。
- ページ背景は #f8f8f5（生成り）。カードだけ #ffffff
- 文字色は #1b120f、補足は #6e6765
- 見出しは "ヒラギノ明朝 ProN", HiraMinProN-W3, 游明朝体, "Yu Mincho", serif
  ページ見出し 56px / line-height 1.4
  セクション見出し 42px / line-height 1.714
  キャッチコピー 42px / line-height 1.556 / letter-spacing 0.13em
- 本文・ナビは "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, sans-serif
  16px / line-height 2.0 / letter-spacing 0.05em
- font-weight はすべて 400。太字を使わない
- リンクのホバーは text-decoration ではなくグラデーション下線で実装する
  background: linear-gradient(rgba(0,0,0,0) calc(100% - 1px), #e7190a 0);
  background-size: 0 100% → hover で 100% 100%
- カレントページの文字色は #e7190a
- 写真の左上に置く札は円形（border-radius: 50% / 背景 #e7190a / 白文字 / 40px または 80px）
- 分類タグは #efefec の背景に #6e6765、border-radius 3px、11px、letter-spacing -0.04em
- 主要CTAは #1b120f の塗り、border-radius 0、幅244px / 高さ57px / 15px
- box-shadow を一切使わない。角丸の矩形をつくらない
- 有彩色は #e7190a のみ。他の色を足さない
- font-feature-settings は normal（palt を当てない）
- コンテナ幅 1200px、商品カテゴリは4カラム
```
