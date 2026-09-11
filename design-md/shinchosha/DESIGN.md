# DESIGN.md — 新潮社（SHINCHOSHA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-11 / 対象: `https://www.shinchosha.co.jp/`, `/book/115351/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **黒・白・黄の3色だけ。** 角丸を一切使わず（`border-radius: 0`）、罫線と面で組む。出版社の目録をそのままウェブにしたような、書誌情報に忠実な設計
- **密度**: 高い。本の情報（書名・著者・価格・発売日・判型・ISBN）を表で詰めて見せる。一方で書籍の紹介文は `line-height: 2.13` とゆったり組む
- **キーワード**: 新潮イエロー、游ゴシック、明朝の惹句、角丸ゼロ、目録

**このサイトの核心は3つある。**

1. **本文＝游ゴシック、惹句＝游明朝の二書体制。** 書誌ページのキャッチコピーだけが **游明朝 32px / weight 700 / line-height 1.5** で組まれ、それ以外は全部 游ゴシック体（実測 游ゴシック体 261 要素 / 游明朝 35 要素）。**明朝は「本の言葉」にだけ使う**
2. **フッターの見出しに Type Project の「TP明朝 StdN High B」を Web フォントで配信している**（`mti_font_element` クラス＝モリサワ TypeSquare 経由、実測 5 要素・`loaded` 済）。本文は OS フォント、ブランドの一語だけ有償書体という割り切り
3. **`letter-spacing` は `normal` が既定**（実測 272 要素）。**字間を空けるのは黄色バッジ（0.158em）と一部ラベル（0.024em）だけ。** 本文を詰めも空けもしない、書籍組版に近い構え

**`font-feature-settings: "palt"` は 1 要素も使っていない**（実測 0 件）。CSS Custom Properties も実質 0 個（トップに 3 個あるのは Swiper の既定値）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **新潮イエロー** | **`#ffed1b`** | **可視 19 要素**。CSS 全文で 24 回。`最新号` `新刊` のバッジ、ページ最上部の帯、カテゴリ見出しの下線 |
| **Cart Yellow** | **`#fdec54`** | 書誌ページの **`ネットで購入` ボタン専用**（CSS 全文で 4 回）。`#ffed1b` より淡い |
| **Black（面）** | **`#000000`** | **可視 10 要素の塗り面**。タブの選択状態、グローバルナビのモーダルトリガー、フッター全面 |

> **黄色が2つあるのは実装の実態。** `#ffed1b` がブランド色、`#fdec54` は購入ボタン専用の淡い黄。**新規実装では `#ffed1b` に寄せてよいが、既存ページと並べるときは 2 色あることを前提にする。**

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出し。**可視 198 要素**。**このサイトは本文に純黒を使う**
- **Text on Dark** (`#ffffff`): 黒面・フッター上のテキスト（可視 55 要素）
- **Text Muted** (`#9b9b9b`): 発売日、`もっと見る`、補助情報（**可視 43 要素**。CSS 全文で 109 回）
- **Link Blue** (`#008bbe`): カード内のリンク・アイコン（可視 4 要素。CSS 全文で 8 回）
- **Border** (`#cbcbcb`): カードの枠、`もっと見る` の枠（CSS 全文で **88 回**。このサイトで最も多い罫線色）
- **Surface Gray** (`#efefef`): 判型・ジャンルのチップ、雑誌一覧の面（**可視 37 要素**）
- **Surface Light** (`#f5f5f5`): 検索フォームの面
- **Surface Lighter** (`#fafafa`): 最も淡い面
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（既定）**: **游ゴシック体**。Windows の Medium 問題に対応するため `"Yu Gothic M"` / `"游ゴシック Medium"` / `"Yu Gothic Medium"` を明示的にチェーンへ入れている
- **明朝体（惹句・フッター見出し）**: **游明朝**。書誌ページのキャッチコピー専用
- **Web フォント（ブランド用）**: **TP明朝 StdN High B**（Type Project、TypeSquare 配信）。フッターの見出しのみ

### 3.2 欧文フォント

- 専用の欧文フォントは持たない。数字・アルファベット（価格・ISBN・日付）も**游ゴシック体の欧文グリフ**をそのまま使う
- `Arno W08 Dsp`（Adobe）が `@font-face` で宣言されているが、**実測した全ページで `unloaded`**（参照する要素が存在しない）。**フォールバック前提で組むこと**

### 3.3 font-family 指定

```css
/* 本文・UI（既定） */
font-family: 游ゴシック体, YuGothic, "Yu Gothic M", "游ゴシック Medium", "Yu Gothic Medium",
             "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN W3", HiraKakuProN-W3,
             "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN",
             "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro",
             メイリオ, Meiryo, sans-serif;

/* 惹句・キャッチコピー */
font-family: 游明朝, YuMincho, "Hiragino Mincho ProN", Meiryo, serif;

/* フッター見出し（Web フォント） */
font-family: "TP Mincho StdN High B", 游明朝, YuMincho, "Hiragino Mincho ProN", serif;
```

**フォールバックの考え方**:
- **和文優先。** 欧文を先頭に置かず、游ゴシック体の欧文グリフで統一する
- **游ゴシックの Windows 対策**: 素の `YuGothic` は Light にマッピングされて細くなるため、`"Yu Gothic M"` `"游ゴシック Medium"` `"Yu Gothic Medium"` を**必ず並べる**
- ヒラギノは **ProN W3 → ProN → Pro** の順で 6 通り書き分けている。**環境差を潰しにいく丁寧なチェーン**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Catch Copy** | **游明朝** | **32px** | **700** | **1.50** (48px) | normal | **書誌ページの惹句。明朝はここだけ** |
| Section Heading | 游明朝 | 32px | 700 | 1.50 | normal | トップのセクション見出し |
| Book Title | 游ゴシック体 | 26px | 700 | 1.23 (32px) | normal | `h1.mod-r-detail__title` |
| Article Heading | 游ゴシック体 | 24px | 700 | 1.25 (30px) | normal | 書評のタイトル |
| Footer Heading | TP明朝 StdN High B | 22px | 400 | 1.50 (33px) | normal | フッター（白文字） |
| Author / Price | 游ゴシック体 | 18px | 400 / 700 | 1.56 (28px) | normal | 著者名・価格 |
| Sub Heading | 游ゴシック体 | 18px | 700 | 1.78 (32px) | normal | `書評` 等 |
| **Body** | 游ゴシック体 | **16px** | 400 | **2.13** (34px) | normal | **書籍紹介文** |
| Body Bold | 游ゴシック体 | 16px | 700 | 2.13 (34px) | normal | `書誌情報` 等の小見出し |
| List Item | 游ゴシック体 | 14px | 400 | 1.57 (22px) | normal | パンくず・分類 |
| UI Label | 游ゴシック体 | 14px | 400 / 700 | 1.46 (20.44px) | normal | タブ・ボタン |
| Date | 游ゴシック体 | 14px | 400 | 1.43 (20px) | normal | `#9b9b9b` |
| Spec Table | 游ゴシック体 | 12.8px | 400 / 700 | 1.50 (19.2px) | normal | 書誌情報の表 |
| Chip | 游ゴシック体 | 12px | 400 | 2.13 (25.5px) | normal | `文庫` `電子書籍あり` |
| Caption | 游ゴシック体 | 12px | 400 | 1.50 (18px) | normal | 発売日 |
| **Badge** | 游ゴシック体 | **10px** | **700** | 1.00 | **0.158em** | **`最新号` `新刊`。唯一の字間** |
| Copyright | 游ゴシック体 | 11px | 500 | 1.50 (16.5px) | normal | フッター |

### 3.5 行間・字間

- **書籍紹介文の行間**: **2.13**（16px / 34px）。**読み物として最も広い**
- **UI の行間**: **1.46**（実測 140 要素で最多）、次いで **1.50**（67 要素）
- **見出しの行間**: **1.20〜1.25**（26px / 32px、24px / 30px）。**惹句だけ 1.50**
- **字間**: **`normal` が既定**（実測 272 要素）。例外は **黄色バッジの 0.158em**（19 要素）と一部ラベルの 0.024em（10 要素）だけ

**ガイドライン**:
- **日本語本文に `letter-spacing` を足さない。** このサイトは游ゴシックの素の字送りを信じる設計で、字間を空けると印象が変わる
- **見出しは 1.2〜1.25 と詰める**（32px の惹句だけ 1.5）。本文は 2.13 と広げる。**この落差が紙面らしさを作っている**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 書名・著者名は折り返さずに 1 行で収める前提（`h1` 幅 500px に 26px）
- `word-break: break-all` は使わない（書名の途中で割れるため）

### 3.7 OpenType 機能

**このサイトは `font-feature-settings` を一切使っていない**（実測 0 要素）。

- **`palt` を足さないこと。** 游ゴシックの既定の字送りのまま組むのがこのサイトの設計。括弧の多い書名（`『村上春樹WORKS』`）でも詰めない

### 3.8 縦書き

該当なし。書影は画像として扱う。

---

## 4. Component Stylings

**`border-radius` はサイト全体で `0px`。** 例外は書誌ページのカートアイコン（`100%`）とフッター上部の丸ボタン（`50px`）のみ。

### Buttons

**Primary（購入 CTA）**
- Background: **`#fdec54`**
- Text: `#000000`
- Border: **`2px solid #000000`**
- Padding: `15px 10px 14px`
- Border Radius: **`0px`**
- Font: 16px / **weight 700** / line-height 1.69
- Size: 245 × 60px

**Secondary（白＋黒枠）**
- Background: `#ffffff`
- Text: `#000000`
- Border: `1px solid #000000`
- Padding: `10px`（`4px 5px 3px` の小型版もあり）
- Border Radius: `0px`
- Font: 14px / weight 500〜700

**Tab（選択状態）**
- Background: `#000000`
- Text: `#ffffff`
- Border Radius: `0px`
- Font: 14px / weight 700
- 非選択は背景なし・黒文字

**Ghost（`もっと見る`）**
- Background: `transparent`
- Text: `#9b9b9b`
- Border: `1px solid #cbcbcb`
- Padding: `2px 10px`
- Font: 12px / weight 700

**Nav Trigger（`本・雑誌・ウェブ`）**
- Background: `#000000` / Text: `#ffffff`
- Size: 212 × 50px / Border Radius: `0px`

### Badges / Chips

**Badge（新着表示）**
- Background: **`#ffed1b`** / Text: `#000000`
- Padding: `3px 10px`
- Font: **10px / weight 700 / letter-spacing 0.158em**
- Border Radius: `0px`

**Chip（判型・属性）**
- Background: `#efefef` / Text: `#000000`（書誌ページでは `#4a4a4a`）
- Padding: `0px 5px`（アイコン用は `5px`）
- Font: 12px（アイコン用は 10px / weight 700）

### Inputs

- Background: **`#f5f5f5`**
- Border: なし
- Border Radius: `0px`
- Height: **50px**
- Padding: `5px 60px 5px 5px`（右に検索ボタン分のアキ）
- Font Size: 16px
- 併設する `select` も同じ `#f5f5f5` / 50px / radius 0

### Cards

- Background: `#ffffff`
- Border: **`1px solid #cbcbcb`**（薄いカードは `#cbcbcb`、画像枠は `#9b9b9b`）
- Border Radius: `0px`
- Padding: `20px`
- Shadow: なし

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 3px | バッジ内側の上下 |
| S | 5px | チップ内側 |
| M | 10px | ボタン内側 |
| L | 20px | カード内側 |
| XL | 40px | セクション間 |

### Container

- **Max Width: 1060px**（実測 19 要素で最多。CSS でも `max-width: 1060px` を宣言）
- **本文カラム: 700px**（書評・プロフィール）
- **書誌ブロック: 500px**（書影の右に置く書名・著者・紹介文）
- **フォーム幅: 1000px**

### Grid

- トップは 5 分割のモザイク（書影バナー）＋ 4 カラムのカード列
- 書誌ページは「書影（左）／情報 500px（右）」の 2 カラム

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・ボタン・チップはすべてフラット** |
| 1 | `0 0 20px rgba(0, 0, 0, 0.15)` | **サイト全体で 1 要素のみ**（モーダル／追従ヘッダー） |

> **影で階層を作らないサイト。** カードの区別は `1px solid #cbcbcb` の罫線、面の区別は `#efefef` / `#f5f5f5` で行う。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`border-radius: 0` を貫く。** 角丸はこのサイトの語彙に無い
- **游ゴシックのチェーンに `"Yu Gothic M"` / `"游ゴシック Medium"` / `"Yu Gothic Medium"` を必ず入れる**（Windows で Light に落ちるのを防ぐ）
- **惹句・キャッチコピーだけ游明朝にする。** 32px / weight 700 / line-height 1.5
- **本文は `line-height: 2.13`（16px / 34px）、見出しは 1.2〜1.25** と落差をつける
- **`letter-spacing: normal` を既定にする**
- 黄色バッジは **10px / weight 700 / `letter-spacing: 0.158em`**（この字間はバッジ専用）
- 罫線は `#cbcbcb`、補助テキストは `#9b9b9b`
- 本文色は **純黒 `#000000`**

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素）
- **本文に `letter-spacing` を足さない**
- **`border-radius` を 4px や 8px にしない**
- **カードやボタンに `box-shadow` を足さない**（実サイトは 1 要素のみ）
- **見出しを明朝にしない。** 明朝は**惹句とフッター見出しだけ**。書名・セクション見出しはゴシック
- `Arno W08 Dsp` を前提に組まない（宣言はあるがロードされない）
- 本文色を `#333333` にしない（実サイトは純黒）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 720px | モバイルレイアウト（`max-width: 720px`） |
| Desktop | ≥ 1080px | デスクトップレイアウト（`min-width: 1080px`。CSS 全文で最多） |
| Container | ≤ 1060px | コンテナ幅の上限 |

- **PC と SP で CSS ファイル自体を分けている**（`/common_v2/css/` と `/common_v2/sp/css/`）。レスポンシブというより**出し分け**に近い設計

### タッチターゲット

- 購入 CTA 245 × 60px、タブ 50px 高、入力欄 50px 高 — いずれも 44px を満たす
- `もっと見る`（30px 高）と チップ（26px 高）は下回るため、**モバイルでは高さを確保すること**

### フォントサイズの調整

- 本文 16px、書誌表 12.8px はブレークポイントをまたいで固定

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Yellow: #ffed1b
Cart Yellow:  #fdec54
Text Color:   #000000
Muted:        #9b9b9b
Border:       #cbcbcb
Surface:      #efefef
Background:   #ffffff
Font (JP): 游ゴシック体, YuGothic, "Yu Gothic M", "游ゴシック Medium", "Yu Gothic Medium", "ヒラギノ角ゴ ProN W3", メイリオ, Meiryo, sans-serif
Font (惹句): 游明朝, YuMincho, "Hiragino Mincho ProN", Meiryo, serif
Body Size: 16px
Line Height: 2.13（本文） / 1.46（UI） / 1.2（見出し）
Letter Spacing: normal
Border Radius: 0px
```

### プロンプト例

```
新潮社のデザインシステムに従って、書籍詳細ページを作成してください。
- font-family は游ゴシック体を先頭に、"Yu Gothic M" / "游ゴシック Medium" / "Yu Gothic Medium" を続ける
- キャッチコピーだけ游明朝 32px / weight 700 / line-height 1.5
- 書名は 26px / weight 700 / line-height 1.23、紹介文は 16px / line-height 2.13
- letter-spacing は normal（バッジのみ 0.158em）
- 「ネットで購入」ボタンは背景 #fdec54 / 2px solid #000000 / border-radius 0 / 16px weight 700 / 245×60px
- 「新刊」バッジは背景 #ffed1b / 10px / weight 700 / letter-spacing 0.158em
- 判型チップは背景 #efefef / 12px、発売日は #9b9b9b
- カードの枠は 1px solid #cbcbcb、box-shadow は使わない
- すべての border-radius は 0px、コンテナは 1060px、書誌カラムは 500px
```
