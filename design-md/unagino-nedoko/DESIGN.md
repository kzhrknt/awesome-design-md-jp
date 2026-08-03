# DESIGN.md — うなぎの寝床（UNAGINO NEDOKO）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-03 / 対象: `https://unagino-nedoko.net/`, `/about`, `/archives/62590/`

---

## 1. Visual Theme & Atmosphere

福岡県八女市の「地域文化商社」。九州の職人・産地と生活者をつなぐ実店舗とECを運営し、
久留米絣の「MONPE」で知られる。サイトは白地・左固定サイドバー・
**ほぼ全文が明朝（DNP 秀英アンチック）** という構成で、**商品カタログというより
産地の読み物**として組まれている。

- **デザイン方針**: 白地に明朝1本。有彩色は小さなバッジにだけ許す
- **密度**: 高い。左に常時サイドバー、本文は870px幅に写真とテキストを詰める
- **キーワード**: 明朝、左固定サイドバー、和欧二段ナビ、palt全面適用、藍と赤茶のバッジ

**このサイトの特徴的な癖（他サイトと違う点）**

1. **本文フォントが明朝（`dnp-shuei-anti-std` = DNP 秀英アンチック）**。
   `body` の既定は游ゴシックだが、実際に文字が乗る要素はほぼすべて明朝に上書きされる。
   ゴシックが残るのはロゴまわりと一部の見出しだけ
2. **`font-feature-settings: "palt"` がサイト全体に効く**。`body` から継承しており、
   例外は下層ページの `h1` だけ（そこは `"palt" 0` で**明示的にオフ**）
3. **`line-height` の既定が `1.0`（font-size と同値）**。行送りは「読ませる要素」に
   個別指定する設計。ナビ・見出し・価格は全部 1.0
4. **グローバルナビが和文＋欧文の二段**。「うなぎの寝床 / About us」のように
   1つの `<li>` に和文と欧文が縦に積まれる
5. **`letter-spacing` が font-size の 0.1 倍で揃う**（14px→1.4px、15px→1.5px、
   16px→1.6px、22px→2.2px）。つまり**実質 `0.1em` 固定**
6. **バッジ4色が商品状態を表す**（新商品＝深紅 / オリジナル＝濃紺 / 在庫限り＝茶 /
   再入荷＝サーモン）。この4色以外の有彩色を UI に使わない
7. スライドインするサイドドロワーだけが**濃紺 `#1a1a41` のベタ塗り**

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値。すべて hex -->

### Base（基調）

- **Background** (`#ffffff`): ページ地色（`body` に明示指定）
- **Ink** (`#121212`): 見出し・ナビ・価格。純黒ではなく 18,18,18
- **Ink Black** (`#000000`): 記事タイトル・記事内リンク
- **Text Muted** (`#555555`): アウトラインボタンの文字、カテゴリラベル
- **Text Caption** (`#787878`): 商品カードの補足見出し
- **Text Sub** (`#676767`): 補助テキスト

### Indigo（藍 — このサイトの基調色）

- **Navy** (`#1a1a41`): サイドドロワーの地色、「オリジナル」バッジ
- **Indigo** (`#4d4d77`): 塗りCTA「写真一覧から探す」の面色
- **Indigo Border** (`#6c6c84`): 写真上に置く枠線ボタンの罫
- **Indigo Text** (`#717188`): 「一覧へ」等の小リンク文字
- **Navy Deep** (`#0f0d3f`) / **Violet Navy** (`#4b4a86`): 差し色（ごく少量）

### Badge（商品状態 — 4色で固定）

| ラベル | 値 | 意味 |
|--------|-----|------|
| 新商品 | `#8b1b18` | 深紅。新着 |
| オリジナル | `#1a1a41` | 濃紺。UNA PRODUCTS（自社開発） |
| 在庫限り | `#8d654a` | 茶。残りわずか |
| 再入荷 | `#e4ab9c` | サーモン。再入荷 |

### Neutral（罫・面）

- **Border** (`#d8d8d8`): ピル型ボタンの罫
- **Border Wide** (`#d9d9d9`): 全幅ボタンの罫
- **Border Gray** (`#b4b4b5`): 小さな枠線ボタンの罫
- **Overlay** (`rgba(0, 0, 0, 0.05)`): サイズ表のセル背景
- **Divider Gray** (`#979797`)

**注意**: 商品写真は色数が多いが、**UI の有彩色はバッジ4色と藍系だけ**。
「安い」「セール」的な赤や黄を足さない。

---

## 3. Typography Rules

### 3.1 和文フォント

**明朝が主役、ゴシックは脇役**という配分。

- **明朝体（本文・見出し・ナビ・ボタン — ほぼ全部）**:
  `dnp-shuei-anti-std`（DNP 秀英アンチック / Adobe Fonts）
- **ゴシック体（`body` の既定値・ロゴまわり）**:
  `"游ゴシック Medium", "Yu Gothic Medium"` 系のプラットフォームフォント

`dnp-shuei-anti-std` は**かながアンチック体（丸みのある太めの仮名）、漢字が明朝**という
組み合わせの書体。一般的な明朝より仮名が骨太で、産地・手仕事の文脈に合う声になる。

### 3.2 欧文フォント

- **サンセリフ**: `Helvetica, Arial, sans-serif` — 英語ページ（Shopping Guide）専用

和文チェーンの中には欧文フォントを混ぜていない。**欧文は明朝チェーンの
`serif` フォールバックで拾わせる**か、英語ページで Helvetica に切り替える。

### 3.3 font-family 指定

```css
/* 本文・見出し・ナビ・ボタン（明朝） */
font-family: dnp-shuei-anti-std, 游明朝体, 游明朝, YuMincho,
             "ヒラギノ明朝 ProN", "Hiragino Mincho ProN",
             "ＭＳ Ｐ明朝", "MS PMincho", serif;

/* body の既定値・ロゴまわり（ゴシック） */
font-family: "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic,
             "Hiragino Sans", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, sans-serif;

/* 英語ページ */
font-family: Helvetica, Arial, sans-serif;
```

**フォールバックの考え方**:
- **和文優先チェーン**。先頭に Adobe Fonts の和文を置き、Win（游明朝）→
  Mac（ヒラギノ明朝 ProN）→ 旧Win（ＭＳ Ｐ明朝）の順で落とす
- ゴシックは **游ゴシック Medium が先頭**。Windows の游ゴシック細すぎ問題を
  Medium 指定で回避している（`@font-face` での再マッピングは使っていない）
- 欧文専用フォントをチェーンに混ぜない。**和文書体の欧文グリフをそのまま使う**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Logo | 游ゴシック Medium | 28px | 400 | **1.0** | 0 | サイトロゴ（h1） |
| Page Title | 秀英アンチック | 26px | 400 | **1.0** | **0.15em** (3.9px) | 下層 h1「はじめに」／`palt` オフ |
| Section Title | 秀英アンチック | 22px | 400 | **1.0** | 0.1em (2.2px) | 「おしらせ」 |
| Lead | 秀英アンチック | 21px | 400 | 1.7 (35.7px) | 0.08em (1.68px) | 理念のリード文 |
| Sub Head | 游ゴシック Medium | 21px | 400 | **1.0** | 0 | 「地域文化商社として対話を生みたい」 |
| Card Title | 秀英アンチック | 16px | 400 | 1.6 (25.6px) | 0.1em (1.6px) | 特集カード見出し |
| Category Head | 秀英アンチック | 16.38px | 400 | 1.0 / 1.5 | 0 | 「UNA PRODUCTS」 |
| List Title | 秀英アンチック | 15px | 400 | 1.6 (24px) | 0.1em (1.5px) | 記事一覧の見出し |
| Nav | 秀英アンチック | 14px | 400 | **1.0** | 0 | グローバルナビ（和文行） |
| Base (body) | 游ゴシック Medium | 14px | 400 | **1.0** (14px) | 0 | 継承の基準値 |
| Article Title | 秀英アンチック | 14px | 400 | 1.7 (23.8px) | 0.1em (1.4px) | 記事リストのタイトル |
| Category Label | 秀英アンチック | 12px | 400 | **1.0** | 0.12em (1.44px) | 「おしらせ一覧」 |
| Price | 秀英アンチック | 12px | **700** | **1.0** | 0.08em (0.96px) | 「19,800円(税込)」 |
| Caption | 秀英アンチック | 11px | 400 | 1.8 (19.8px) | 0.1em (1.1px) | 「[お買い物]」 |
| Sub Caption | 秀英アンチック | 11px | 400 | 1.7 (18.7px) | 0.04em (0.44px) | 商品カードの補足 |
| Micro Label | 秀英アンチック | 10px | 400 | 1.5 (15px) | 0.06em (0.6px) | 「創業者・顧問白水」 |
| Badge | 秀英アンチック | 10px | **700** | **1.0** | 0.04em (0.4px) | 「新商品」「オリジナル」 |
| EN Heading | Helvetica | 38px | **300** | 1.4 (53.2px) | 0.02em (0.76px) | 英語ページ見出し |
| EN Body | Helvetica | 15px | 400 | 1.7〜1.9 | 0〜0.02em | 英語ページ本文 |

**ウェイトは 400 と 700 の2値だけ**（欧文見出しの 300 が唯一の例外）。
700 を使うのは**価格とバッジのみ**。見出しを太らせない。

### 3.5 行間・字間

- **既定の `line-height` は `1.0`**。font-size と同値。見出し・ナビ・価格・バッジは全部これ
- **読ませる要素だけ 1.6〜1.8 に開く**。記事タイトル 1.7、カード見出し 1.6、
  キャプション 1.8、リード 1.7
- **`letter-spacing` は実質 `0.1em` 固定**。14px→1.4px、15px→1.5px、16px→1.6px、
  22px→2.2px と、どのサイズでも font-size の 0.1 倍で出る
- 例外は下層ページの h1（**0.15em**）と、小さめの補足（0.04〜0.08em）
- ナビ・ロゴ・base は `letter-spacing: normal`

```css
/* 記事タイトル — 読ませる要素 */
.article-title {
  font-family: dnp-shuei-anti-std, 游明朝体, serif;
  font-size: 14px;
  line-height: 1.7;
  letter-spacing: 0.1em;
  font-feature-settings: "palt";
}

/* 見出し・ナビ — 行送りを詰める */
.section-title {
  font-size: 22px;
  line-height: 1.0;          /* font-size と同値 */
  letter-spacing: 0.1em;
}

/* 下層ページの h1 だけ palt を切る */
.page-title {
  font-size: 26px;
  line-height: 1.0;
  letter-spacing: 0.15em;
  font-feature-settings: "palt" 0;   /* 明示的にオフ */
}
```

### 3.6 禁則処理・改行ルール

- 「うなぎの寝床」「UNA PRODUCTS」「MONPE」は途中で折らない
- グローバルナビは和文と欧文を `<br>` 相当で必ず2行に分ける
  （「店舗のこと / About Store」）。1行に混ぜない
- 商品名に含まれる `「」` は `palt` で詰まる前提で行頭に置かない

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";
```

- **`body` から継承してサイト全体に効く**。実測で `body` 自身が `"palt"` を持つ
- **唯一の例外が下層ページの `h1`**。ここだけ `"palt" 0` で無効化されている。
  26px / `letter-spacing: 0.15em` と大きく開くため、詰め組と喧嘩させない判断
- 明朝の仮名が詰まることで、和文の見出しが**版面として締まって見える**

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| dnp-shuei-anti-std（DNP 秀英アンチック / Adobe Fonts） | **Shippori Mincho**（Google Fonts） | Adobe Fonts はドメインライセンスのためローカル表示不可。仮名が骨太で懐が広い明朝として最も印象が近い。より細い印象が欲しい場合は Zen Old Mincho |
| 游ゴシック Medium | **Zen Kaku Gothic New**（Google Fonts） | 游ゴシックの字面の広さ・素直な骨格に近い |
| Helvetica | **そのまま**（システムフォント） | 英語ページのみ |

---

## 4. Component Stylings

### Buttons

**Filled（塗りCTA — 藍）**

- Background: `#4d4d77` / Text: `#ffffff`
- Border Radius: `4px`
- Padding: `20px 0 18px 2px` — **上下だけ厚く、左右はほぼゼロ**（全幅ブロック前提）
- Font: 14px / weight 400 / `letter-spacing: normal`

```css
.btn-filled {
  display: block;
  background: #4d4d77;
  color: #fff;
  border-radius: 4px;
  padding: 20px 0 18px 2px;
  font-size: 14px;
  text-align: center;
}
```

用例: 「写真一覧から探す」

**Outline Pill（一覧へ導く小ボタン）**

- Background: `transparent` / Text: `#555555`
- Border: `1px solid #d8d8d8`
- Border Radius: `20px`
- Padding: `8px 14px 8px 16px` — **左右が非対称**（右に矢印が入る想定）
- Font: 12px / weight 400 / `letter-spacing: 0.12em` (1.44px)

用例: 「おしらせ一覧」「企画展一覧」「全カテゴリから探す」

**Outline Tiny（インデックスリンク）**

- Border: `1px solid #b4b4b5` / Text: `#717188`
- Border Radius: `2px` / Padding: `4px 4px 4px 8px`
- Font: 10px / `letter-spacing: 0.15em` (1.5px)

用例: 「一覧へ」

**Wide Outline（全幅の角ゼロボタン）**

- Border: `1px solid #d9d9d9` / Text: `#000000`
- Border Radius: **`0px`** / Padding: `20px`
- Font: 18px / `letter-spacing: 0.15em` (2.7px)

用例: 「企画展・店休日カレンダー」

**Outline on Photo（写真の上）**

- Border: `1px solid #6c6c84` / Text: `#ffffff`
- Border Radius: `3px` / Padding: `5px 7px 5px 8px`
- Font: 12px / `letter-spacing: 0.15em` (1.8px)

### Badges（商品状態 — 4色）

- Border Radius: `2px`
- Padding: `3px 4px 4px` — **下だけ1px厚い**
- Font: 10px / weight **700** / `letter-spacing: 0.04em`
- Text: `#ffffff`

```css
.badge      { border-radius: 2px; padding: 3px 4px 4px;
              font-size: 10px; font-weight: 700;
              letter-spacing: .04em; color: #fff; }
.badge-new  { background: #8b1b18; }  /* 新商品 */
.badge-orig { background: #1a1a41; }  /* オリジナル */
.badge-last { background: #8d654a; }  /* 在庫限り */
.badge-back { background: #e4ab9c; }  /* 再入荷 */
```

### Cards（商品カード・記事カード）

- Background: `transparent`（白地にそのまま置く）
- Border / Shadow: なし
- 構成: 写真 → バッジ（左上）→ 商品名（明朝 11px / 1.7）→ 価格（明朝 12px / 700）

### Navigation

**グローバルナビ（和欧二段）**

```html
<li><a href="/about">うなぎの寝床<span>About us</span></a></li>
```

- 和文: 明朝 14px / `line-height: 1.0` / `letter-spacing: normal` / `#121212`
- 欧文: 同チェーンの小さめ。和文の直下に置く
- **必ず2行**。1行にまとめない

**左固定サイドバー**

- 白地。カテゴリ見出し（16.38px 明朝）＋ 和文＋欧文の2段リンク（「衣 / Clothing」）
- 幅は約230px。本文カラムは 870px

**サイドドロワー（スライドイン）**

- 地色 `#1a1a41`（濃紺のベタ）/ 幅 340px / 文字は白
- **サイト内で唯一の暗い面**

### Tables（サイズ表・在庫表）

- セル背景: `rgba(0, 0, 0, 0.05)`
- 文字: 明朝 13〜14px / `line-height: 1.0`
- 価格セルのみ weight 700

---

## 5. Layout Principles

### Container

| 用途 | Max Width |
|------|-----------|
| 本文カラム | **870px** |
| 記事内の狭い版面 | 824px / 730px |
| フルブリード | 1440px |
| サイドドロワー | 340px（固定幅） |

### Layout Structure

- **左固定サイドバー ＋ 右本文** の2カラム。サイドバーはスクロール追従
- ヘッダーは上部にお知らせ帯 → ロゴ ＋ 和欧二段ナビ → ユーティリティ（会社概要・採用情報・
  カート・お問い合わせ）の3層

### Grid

- 特集カード: 3〜4カラム
- 商品一覧: 4カラム
- 記事一覧: 2カラム（写真＋タイトル）

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 20px |
| L | 40px |
| XL | 80px |

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・ボタン・写真すべて** |
| 1 | `rgba(0, 0, 0, 0.1) 2px 6px 10px 0px` | 浮かせるパネル（ドロワー・ドロップダウン） |
| — | `rgb(128, 128, 128) 0px 0px 5px 0px` | フォーカス／ブラウザ既定に近い扱い |

**影はほぼ使わない**。カードはすべて影ゼロで白地に置く。
奥行きは影ではなく**罫線（`#d8d8d8` / `#d9d9d9`）と余白**でつくる。

---

## 7. Do's and Don'ts

### Do（推奨）

- 本文・見出し・ナビ・ボタンをすべて**明朝**で組む（`dnp-shuei-anti-std` 系）
- `font-feature-settings: "palt"` をサイト全体に効かせる
- `letter-spacing` は **font-size の 0.1 倍**で統一する
- 既定の `line-height` は **1.0**。読ませる要素だけ 1.6〜1.8 に開く
- グローバルナビ・サイドバーは**和文＋欧文の2段**にする
- 商品状態のバッジは4色（`#8b1b18` / `#1a1a41` / `#8d654a` / `#e4ab9c`）に限定する
- ボタンは用途ごとに角丸を変える（塗り 4px / ピル 20px / 小 2px / 全幅 0px）
- 太字（700）は**価格とバッジだけ**に使う

### Don't（禁止）

- 見出しをゴシックにしない（ゴシックは `body` の既定とロゴまわりだけ）
- 見出しを太字にしない（すべて weight 400）
- バッジ4色と藍系以外の**有彩色を UI に足さない**
- カードに影を付けない（罫線と余白で分ける）
- 本文の `line-height` を 1.0 のまま読ませない（読ませる要素は必ず 1.6 以上）
- 下層ページの h1 に `palt` を効かせない（そこだけ `"palt" 0`）
- ナビの和文と欧文を1行に混ぜない

---

## 8. Responsive Behavior

### Breakpoints

**固定サイドバーを畳むための「絞り込みラダー」**を持つ。

| Name | Width | 説明 |
|------|-------|------|
| Mobile S | ≤ 600px | 最小。カードは1カラム |
| Mobile | ≤ 767px | サイドバーをドロワー化。ナビはハンバーガー |
| Squeeze | 1300 / 1340 / 1360 / 1380 / 1400 / 1415 / 1439 / 1455px | **サイドバー幅と本文幅を段階的に詰める**中間ブレークポイント群 |
| Desktop | ≥ 1440px | サイドバー固定表示。本文 870px |

`max-width: 1300px` 〜 `1455px` に8段のブレークポイントが刻まれている。
**2カラムを崩さずに幅だけ削る**ための設計で、1440px を境に一気に組み替えるのではなく
なだらかに縮める。

### モバイルでの変化

- 左サイドバー → `#1a1a41` のスライドインドロワー（幅340px）
- 和欧二段ナビは**2段のまま維持する**（欧文行を消さない）
- 本文 870px → 画面幅 - 左右パディング
- 商品グリッド 4カラム → 2カラム

### タッチターゲット

- 最小 44px × 44px。ピル型ボタンは上下 8px パディング ＋ 12px 文字で約 30px なので、
  モバイルでは上下パディングを 14px に増やして確保する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Ink:             #121212 / #000000（記事）
Text Muted:      #555555 / #787878 / #676767
Navy:            #1a1a41（ドロワー地色・オリジナルバッジ）
Indigo:          #4d4d77（塗りCTA）
Indigo Border:   #6c6c84 / Indigo Text: #717188
Badge:           #8b1b18（新商品）/ #1a1a41（オリジナル）/
                 #8d654a（在庫限り）/ #e4ab9c（再入荷）
Border:          #d8d8d8 / #d9d9d9 / #b4b4b5
Overlay:         rgba(0, 0, 0, 0.05)
Main Font:       dnp-shuei-anti-std, 游明朝体, 游明朝, YuMincho,
                 "ヒラギノ明朝 ProN", "Hiragino Mincho ProN", serif
Sub Font:        "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体,
                 YuGothic, "Hiragino Sans", メイリオ, Meiryo, sans-serif
Base Size:       14px
Line Height:     1.0（既定）/ 1.6〜1.8（読ませる要素）
Letter Spacing:  0.1em（font-size × 0.1 で統一）/ 0.15em（下層 h1）
Font Weight:     400（既定）/ 700（価格・バッジのみ）
Border Radius:   4px（塗り）/ 20px（ピル）/ 2px（小・バッジ）/ 0px（全幅）
Shadow:          none（既定）
palt:            on（body から全体に継承。下層 h1 のみ "palt" 0）
Container:       870px（本文）/ 1440px（フル）
```

### プロンプト例

```
うなぎの寝床（UNAGINO NEDOKO）のデザインシステムに従って、商品一覧ページを作成してください。
- ページ背景は #ffffff、文字は #121212
- 本文・見出し・ナビ・ボタンはすべて明朝で組む
  font-family: dnp-shuei-anti-std, 游明朝体, 游明朝, YuMincho,
               "ヒラギノ明朝 ProN", "Hiragino Mincho ProN", serif
  （preview 用の代替は "Shippori Mincho", serif）
- font-feature-settings: "palt" をページ全体に効かせる
- letter-spacing は font-size の 0.1 倍で統一（14px→1.4px、22px→2.2px）
- line-height の既定は 1.0。記事タイトル・キャプションだけ 1.6〜1.8 に開く
- font-weight は 400。太字 700 は価格とバッジだけ
- レイアウトは「左固定サイドバー（幅230px・カテゴリナビ）＋ 本文 870px」の2カラム
- グローバルナビとサイドバーのリンクは和文＋欧文の2段
  （例: 「衣」の下に「Clothing」）
- 商品カードは影なし・枠なし。写真の左上に状態バッジを置く
  バッジ: border-radius 2px / padding 3px 4px 4px / 10px / weight 700
  新商品 #8b1b18、オリジナル #1a1a41、在庫限り #8d654a、再入荷 #e4ab9c
- 一覧へのリンクはピル型（transparent / 1px solid #d8d8d8 / radius 20px /
  padding 8px 14px 8px 16px / 12px / letter-spacing 0.12em / color #555555）
- 主要CTAは塗り（#4d4d77 / #fff / radius 4px / padding 20px 0 18px 2px）
- 影は使わない。区切りは #d8d8d8 の1px罫線
- バッジ4色と藍系（#1a1a41 / #4d4d77）以外の有彩色を足さない
```
