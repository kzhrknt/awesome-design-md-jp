# DESIGN.md — アユーラ（AYURA）

> アユーラ（https://www.ayura.co.jp/）のデザイン仕様書。
> 「**ストレスに着目した**」スキンケアブランドの公式サイト兼オンラインストア。
> **塗りボタンが 1 つもない**。CTA はすべて**白地 + `#c8c8c8` の 1px 枠 + `border-radius: 25px`** の pill。**面で押さず、線で示す**
> **地が白ではない**。`#f8f5f5` — わずかに赤みを含んだオフホワイトで、**下層ページは全面がこの色**（商品一覧は 9/9 サンプル一致）
> **和文はヒラギノ ProN 先頭、欧文見出しは `Poppins`**。ラベル・セクション見出しの `Poppins` には **`letter-spacing: 0.15em` 前後**という極端な字間が当たる
> **リード文だけ明朝**（`"Noto Serif JP", serif` 22px w500）。本文はゴシックのまま、**惹句だけ書体を変える**
> 実サイトの computed style 実測（2026-08-23 取得。トップ ＋ 商品一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **静けさと余白**。彩度をほぼ持たず、`#f8f5f5` の温かいオフホワイトの上に商品写真と細い線だけを置く。**線が細く、字間が広い**
- **アユーラについて**: 1994 年創業のスキンケアブランド。「メディテーション」「インナーバランス」といった語彙を持ち、**騒がしくない画面設計**がそのままブランドの語り口になっている
- **密度**: **低**。1 セクション 1 メッセージ。カードは並べるが、要素間の余白を大きく取る
- **キーワード**: `#f8f5f5` オフホワイト、`#3c3c3c` 墨、`Poppins` の広い字間、pill アウトライン、`Noto Serif JP` のリード、影ゼロ
- **特徴**:
  - **塗り CTA が存在しない**。主要導線（`View More` / `ショッピングガイドはこちら` / `アユーラについて` / `Mail Magazine`）は**すべて白地 + `1px solid #c8c8c8` + `border-radius: 25px`**。**面色で優先度をつける設計を持たない**
  - **地が `#f8f5f5`**。`html` / `body` はどちらも透明で、**セクション側が塗る**。トップはヒーローが写真なので白く見えるが、**下層ページは全面が `#f8f5f5`**
  - **欧文の字間が極端に広い**。`Poppins` の見出しは **0.155em**（24px → 3.72px）、`View More` は **0.155em**（16px → 2.48px）。**和文の字間は 0.04em 程度に抑える**という非対称
  - **リード文だけ明朝**。`"Noto Serif JP", serif` 22px w500 / 行間 1.35 / 字間 0.015em。**本文には使わない**
  - **行間が詰まっている**。`line-height` が `font-size` と同値（16px → 16px = **1.0**）の要素が多い。**1 行で収まるラベル・見出しに限って行間を殺す**設計
  - **円が繰り返しモチーフ**。カート個数バッジ、スライダーのドット、メニューアイコンがすべて `border-radius: 50%`
  - **影を使わない**。すべての要素で `box-shadow: none`
  - **画像リンクが多い**。`<a>` の直下が `<img>` だけの構造が頻出する（後述の注意点）

---

## 2. Color Palette & Roles

> 地は **`#f8f5f5`**（`pageBackground.resolved` = `rgb(248,245,245)`。商品一覧ページで 12 点サンプル中 9/9 が一致）。
> ただし `html` / `body` は透明で、**塗っているのは各セクション**（`section.top-topics` など）。トップのヒーロー部は写真のため白く見える。

### Base（地）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| **Page Background** | **`#f8f5f5`** | 248,245,245 | **地**。下層ページは全面。トップはセクション面 |
| Surface（別トーン） | **`#f5f1f0`** | 245,241,240 | メールマガジン登録ブロック |
| Surface（白） | **`#ffffff`** | 255,255,255 | カード面、ボタンの面、ヘッダー |

- **`#f8f5f5` と `#f5f1f0` は別トーン**。前者が地、後者が地の上に置く一段濃い面

### Neutral（ニュートラル）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| **Text Primary** | **`#3c3c3c`** | 60,60,60 | **既定の文字色**。見出し・本文・ナビすべて。純黒を使わない |
| Text Secondary | **`#87877d`** | 135,135,125 | 補足テキスト、バッジの文字、カート個数バッジの面 |
| Text Secondary（別トーン） | **`#878782`** | 135,135,130 | 送料無料バー（`rgba(135,135,130,.9)`）、丸ボタンの枠 |
| Border | **`#c8c8c8`** | 200,200,200 | **CTA の枠、バッジの枠、区切り線**。サイトで最も使われる線色 |

- **`#3c3c3c` が全文字色**。見出しも本文もキャプションもこの 1 色で、**濃淡はサイズと `#87877d` の 2 段階だけ**
- **`#c8c8c8` が「ボタンの形」を作っている**。塗りがないため、**この線色を変えると CTA が消える**
- グレーが**わずかに黄緑に振れている**（`#87877d` / `#878782`）。純グレーにしない

### 使ってはいけない色

- **`#06c755`（LINE グリーン）が `h2` に 1 件出るが、これは LINE 公式アカウント誘導ブロックの外部指定**。ブランドカラーではない
- **`rgb(0, 0, 238)`（UA 既定のリンク青）が `<a>` の computed に出るが、計測失敗ではない**。後述

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: `Hiragino Kaku Gothic ProN` → `Hiragino Kaku Gothic Pro` → `游ゴシック体` → `YuGothic` → `游ゴシック Medium` → `Yu Gothic Medium` → `游ゴシック` → `Yu Gothic` → `sans-serif`
- **明朝体**: **`Noto Serif JP`**（リード文専用）

- **ヒラギノは ProN が先頭**（Pro ではない）。**ProN と Pro は別物**なので順序を守る
- **游ゴシックを 4 表記並べている**。`游ゴシック体` / `YuGothic` / `游ゴシック Medium` / `Yu Gothic Medium` / `游ゴシック` / `Yu Gothic` の順で、**Windows の游ゴシック細すぎ問題を Medium 指定で回避している**

### 3.2 欧文フォント

- **サンセリフ**: **`Poppins`**（幾何学サンセリフ）。セクション見出し・英字ラベル・数値
- **セリフ**: `serif`（`Noto Serif JP` のフォールバック）

- **`Poppins` は和文より前に置かれる**（`Poppins, "Hiragino Kaku Gothic ProN", …`）。**欧文グリフを Poppins に取らせる意図**

### 3.3 font-family 指定

```css
/* 本文・既定 */
font-family: "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro",
             游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
             游ゴシック, "Yu Gothic", sans-serif;

/* セクション見出し・英字ラベル（欧文を Poppins に取らせる） */
font-family: Poppins, "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro",
             游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
             游ゴシック, "Yu Gothic", sans-serif;

/* 英字のみのラベル（バッジ・数値） */
font-family: Poppins, sans-serif;

/* リード文（惹句）だけ明朝 */
font-family: "Noto Serif JP", serif;
```

**フォールバックの考え方**:
- **和文優先が既定**（ヒラギノ ProN が先頭）
- **欧文を目立たせたい見出しだけ `Poppins` を先頭に足す**。和文チェーンはそのまま後ろに残す
- 游ゴシックは **Medium 表記を必ず含める**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section (欧文) | Poppins + 和文 | 24px | 400 | **1.0** (24px) | **0.155em** (3.72px) | `TOPICS` 等。**字間が極端に広い** |
| Section (欧文・小) | Poppins + 和文 | 22px | 400 | 1.0 (22px) | **0.155em** (3.41px) | `Recommend` 等 |
| Lead（明朝） | Noto Serif JP | 22px | **500** | 1.35 (29.6px) | 0.015em (0.33px) | **惹句。サイト唯一の明朝** |
| Heading（和文） | 和文 | 28px | **600** | 1.0 (28px) | 0.04em (1.12px) | 見出し。**唯一の semibold** |
| Label (欧文) | Poppins | 18px | 400 | 1.0 (18px) | 0.029em (0.52px) | 英字ラベル |
| Body | 和文 | 16px | 400 | **1.0** (16px) | normal | 既定 |
| Sub Heading | 和文 | 16px | 400 | 1.0 (16px) | 0.04em (0.64px) | ナビ内見出し |
| Nav Item（強） | 和文 | 14px | **700** | 1.0 (14px) | 0.046em (0.64px) | メニュー内の親項目 |
| Nav / Label | 和文 | 14px | 400 | 1.0 (14px) | 0.04em (0.56px) | ナビ・CTA ラベル |
| Caption | 和文 | 13px | 400 | 1.0 (13px) | 0.04em (0.52px) | フッター・補足 |
| Caption（小） | 和文 | 12px | 400 | 1.0 (12px) | 0.04em (0.48px) | 注記 |
| Badge | 游ゴシック | 11px | 400 | — | 0.04em (0.44px) | `NEW` / `キャンペーン` |
| Count | Poppins | 10px | 400 | 1.0 (10px) | normal | カート個数 |

- **`line-height` が `font-size` と同値（= 1.0）の要素が非常に多い**。これは**1 行で収まる見出し・ラベル・ナビ**に限った設計で、**複数行の本文にそのまま適用してはいけない**
- ウェイトは **400 が基本**。600 は和文見出し（28px）、700 はメニューの親項目（14px）、500 は明朝リードのみ

### 3.5 行間・字間

- **本文の行間**: **1.0〜1.4**。1 行ラベルは 1.0、明朝リードは **1.35**
- **見出しの行間**: **1.0**
- **和文の字間**: **0.04em**（12〜16px 帯で一貫）
- **欧文見出し（Poppins）の字間**: **0.155em** ← **和文の約 4 倍**
- **明朝リードの字間**: 0.015em（**ほぼベタ**）

**ガイドライン**:
- **和文は 0.04em、欧文見出しは 0.15em** という 2 段構えを守る。混ぜない
- **`line-height: 1.0` は 1 行要素専用**。段落を組むときは **1.7〜1.8** に上げる（実サイトの段落組みは画像内に収まっているため、Web テキストの本文組み値は持たない）
- **明朝リードだけはベタ組みに近づける**（字間 0.015em）

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 商品名に「インクリーゼ モイストローション II」のような**カタカナ + ローマ数字**が入るため、`word-break: break-all` は使わない

### 3.7 OpenType 機能

- **`font-feature-settings` は全要素で `normal`**。**`palt` を使っていない**
- 字詰めは `letter-spacing` で明示的に行う（和文 0.04em / 欧文 0.155em）

```css
/* このサイトの方針 */
font-feature-settings: normal;
letter-spacing: 0.04em;  /* 和文 */
```

### 3.8 縦書き

- **ヒーローのコピーは縦組みだが、画像として焼き込まれている**（「ゆらぎに、凛と。芽吹きの生命水。」）。CSS の `writing-mode` は使っていない
- Web テキストで縦組みを再現する場合は `writing-mode: vertical-rl; text-orientation: mixed;`

---

## 4. Component Stylings

### Buttons

**このサイトに塗りボタンは存在しない。すべてアウトラインの pill。**

**Primary（白地 pill）** — `View More` / `ショッピングガイドはこちら` / `アユーラについて` / `Mail Magazine`

- Background: **`#ffffff`**
- Text: `#3c3c3c`
- Border: **`1px solid #c8c8c8`**
- Padding: `17px 0`（幅は親に対して 100%、テキストは中央揃え）
- Border Radius: **`25px`**
- Font Size: 14px（和文）/ 16px（`Poppins` 英字）
- Letter Spacing: 0.04em（和文）/ **0.155em**（英字）

**Secondary（濃い面の上）** — `オンラインメンバー登録`

- Background: `transparent`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Padding: `7.5px 15px`
- Border Radius: **`15px`**
- Font Size: 13px / ls 0.04em

**Notification Bar** — `税込 5,500円以上購入で送料無料!!`

- Background: `rgba(135, 135, 130, 0.9)`
- Text: `#ffffff`
- Border Radius: `0px`
- Padding: `0 50px 0 15px`
- Font Size: 14px / ls 0.04em

### Badges

- Background: `#ffffff`
- Text: **`#87877d`**
- Border: `1px solid #c8c8c8`
- Border Radius: **`0px`** ← **バッジだけ角丸を持たない**
- Padding: `4.5px 6.13px`
- Font Size: 11px / ls 0.04em
- 例: `NEW` / `キャンペーン`

### Count Badge（カート個数）

- Background: `#87877d`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Border Radius: **`50%`**
- Font: `Poppins` 10px

### Circle Buttons（アイコン・スライダードット）

- Border Radius: **`50%`**
- 枠線タイプ: `1px solid #878782`
- 塗りタイプ: `#3c3c3c`（現在地）/ `#c8c8c8`（非現在地）

### Inputs

- Background: `#ffffff`
- Border: `1px solid #ffffff`（**検索欄は枠を白にして消している**）
- Border Radius: `2px`
- Padding: `6.5px 0`
- Font Size: 12px

### Cards

- Background: `#ffffff`
- Border: なし（区切りは `#c8c8c8` の罫線）
- Border Radius: `0px`
- Shadow: なし

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 5px | ナビ内テキストの内側 |
| S | 14px | ナビ項目の上下 |
| M | 18px | グリッドの `gap` |
| L | 22px | ナビ項目の左右 |
| XL | 30px | ブロックの内側 |
| XXL | 55px | セクション上部 |
| 3XL | 70px | フッター上部 |

### Container

- **`max-width` をほぼ使わない**。幅は `%` と固定 `width` で組む
- グリッドの `gap`: `18px`

### Grid

- 商品カード: 3〜4 カラム（デスクトップ）
- カテゴリリンク: 横一列 8 項目（下線付きテキストリンク）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **全要素。例外なし** |

- **実測したすべての要素で `box-shadow: none`**
- 階層は**面色（`#ffffff` / `#f8f5f5` / `#f5f1f0`）と `#c8c8c8` の罫線**だけで表現する
- モーダル・ドロワーも影を持たない

---

## 7. Do's and Don'ts

### ⚠ `rgb(0, 0, 238)` は計測失敗ではない

`interactive` / `computedStyles` の `<a>` に **UA 既定のリンク青 `rgb(0,0,238)`** が現れるが、**これはサイトの不具合でも計測ミスでもない**。

- 該当する `<a>` は**直下に `<img>` しか持たない画像リンク**で、**テキストノードを持たない**。CSS が `color` を当てていないため UA 既定色が残る
- **子要素まで辿ると正しい色が当たっている**（例: カート個数の `<span>` は `rgb(255,255,255)`）
- **判別法**: 当該 `<a>` の子要素の computed color を見る。子に色が当たっていれば正常、子まで青なら計測が効いていない

**実装時の注意**: `<a>` の直下にテキストノードを置く場合は**必ず `color` を明示する**。置かないと UA 青に落ちる。

### Do（推奨）

- **CTA は白地 + `1px solid #c8c8c8` + `border-radius: 25px` の pill**にする。**塗りボタンを作らない**
- **地は `#f8f5f5`**。下層ページは全面この色で塗る
- **文字色は `#3c3c3c`**。補足は `#87877d`。この 2 色以外を使わない
- **和文は `letter-spacing: 0.04em`、欧文見出し（`Poppins`）は `0.15em` 前後**に開く
- **ヒラギノは ProN を先頭**に置く（Pro ではない）
- **游ゴシックは Medium 表記を含めて 6 段書く**（Windows で細くなるのを防ぐ）
- **惹句（リード文）だけ `"Noto Serif JP", serif` 22px w500 / 行間 1.35** にする
- **`box-shadow` は使わない**。階層は面色と罫線で
- 円形要素（アイコン・ドット・個数バッジ）は `border-radius: 50%` で統一

### Don't（禁止）

- **塗りの CTA を作らない**。優先度は**サイズと配置**でつける
- **バッジに角丸を付けない**（`border-radius: 0px`。pill CTA と対比させている）
- **`palt` を使わない**。字詰めは `letter-spacing` で明示する
- **`line-height: 1.0` を複数行の本文に使わない**。1 行で収まるラベル・見出し専用
- **和文と欧文で同じ `letter-spacing` を使わない**（0.04em と 0.155em を混同しない）
- **`#06c755` を使わない**。LINE 誘導ブロックの外部指定であってブランド色ではない
- **純黒 `#000000` を文字に使わない**（`#3c3c3c` を使う）
- **`<a>` の直下にテキストを置いて `color` を省略しない**（UA 青になる）

---

## 8. Responsive Behavior

### Breakpoints

media query に実在する値:

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 640px | 1 カラム（`641px` で切り替え） |
| Tablet | ≤ 767px | `767px` / `768px` |
| Desktop（小） | ≤ 1024px | `976px` / `1024px` / `1025px` |
| Desktop（大） | ≥ 1068px | `1068px` / `1176px` |

- ルート `font-size` は **16px 固定**（375px〜1920px で変化なし）

### タッチターゲット

- 最小 44px × 44px
- pill CTA の `padding: 17px 0` は高さ約 48px を確保しており基準を満たす

### フォントサイズの調整

- **本文 16px はブレークポイントを跨いでも固定**
- モバイルでは**セクション見出しの `Poppins` を 24px → 20px 前後に落とし、字間 0.155em は維持する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #f8f5f5   （下層ページは全面。トップはセクション面）
Surface:         #ffffff / #f5f1f0
Text Color:      #3c3c3c
Text Secondary:  #87877d
Border / CTA枠:  #c8c8c8
Font (和文):     "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro",
                 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
                 游ゴシック, "Yu Gothic", sans-serif
Font (欧文):     Poppins
Font (リード):   "Noto Serif JP", serif  22px / w500 / lh 1.35
Body Size:       16px
Letter Spacing:  0.04em（和文） / 0.155em（Poppins 見出し）
CTA:             白地 + 1px solid #c8c8c8 + border-radius: 25px（塗りなし）
Badge:           白地 + 1px solid #c8c8c8 + border-radius: 0px
Box Shadow:      none
font-feature-settings: normal（palt を使わない）
```

### プロンプト例

```
アユーラのデザインシステムに従って、商品一覧ページを作成してください。
- 背景: #f8f5f5（ページ全面）、カード面は #ffffff
- 文字色: #3c3c3c、補足は #87877d。純黒は使わない
- フォント: "Hiragino Kaku Gothic ProN" 先頭の和文チェーン
  セクション見出しは Poppins を先頭に足し、letter-spacing: 0.155em
  和文の letter-spacing は 0.04em
- リード文だけ "Noto Serif JP", serif / 22px / w500 / line-height: 1.35
- CTA は塗らない: 背景 #ffffff、border: 1px solid #c8c8c8、
  border-radius: 25px、padding: 17px 0、中央揃え
- バッジは border-radius: 0px、白地に 1px solid #c8c8c8、文字 #87877d、11px
- box-shadow は一切使わない。階層は面色と #c8c8c8 の罫線で表現する
- font-feature-settings は normal のまま（palt を使わない）
```
