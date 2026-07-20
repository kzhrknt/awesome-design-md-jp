# DESIGN.md — ONIBUS COFFEE (オニバスコーヒー)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 対象サイト: https://onibuscoffee.com/
> ONIBUS COFFEE は東京・奥沢を拠点とするスペシャルティコーヒーの焙煎所／カフェ。
> 「コーヒーで、街と暮らしを豊かにする。/ Connecting people through coffee.」を掲げる。
> EC は Shopify 上に構築されており、生豆の産地や生産者名を商品名に据えたラインナップが並ぶ。
> 温かいアイボリー（`#f8f6f4`）を下地に、黒の細罫と大きく開いた字間で組む、
> 角丸ゼロ・影ゼロの静かなクラフト EC。
> 実測はトップページ / 全商品一覧（`/collections/all`）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 焙煎所の紙袋を思わせる温かいアイボリー `#f8f6f4` を全面の下地に敷き、黒の 1px 罫と字間を大きく開いた小さな文字で組む。装飾を一切足さず、商品写真（白バックのコーヒーバッグ）と余白だけで構成する。角丸・影・面塗りボタンを使わない「引き算のクラフト EC」
- **密度**: 低〜中密度。商品グリッドは 4 カラムで並ぶが、ガター 8px と詰めつつカード自体には枠も影も付けない。文字は 12〜18px と小さめで、代わりに字間（`letter-spacing`）を大きく開いて呼吸させる
- **キーワード**: アイボリー地 / スペシャルティ / 角ゼロ / 疎な字間 / 焙煎所 / クラフト EC
- **形状言語**: **すべての要素が `border-radius: 0`**。Shopify のテーマ変数（`--buttons-radius-outset: 0px` / `--product-card-corner-radius: 0` / `--badge-corner-radius: 0` / `--media-radius: 0px`）がいずれもゼロで、丸みが徹底的に排除されている。影も全変数が `opacity: 0` で完全にフラット
- **書体の性格**: 欧文は **tenon**（Typotheque のヒューマニスト サンセリフ）。和文は `MyYuGothicM` → 游ゴシックへ落とすスタックで、Windows でも中太を確保する構成。ウェイトは Regular(400) が基調で、セクション見出しだけ Bold(700) ＋ `letter-spacing: 0.2em` という極端な字間で「ラベル」として立たせる
- **ブランドの署名**: (1) 最上部の**ダークブラウン `#40150b` の告知バー**（焙煎豆の色）、(2) 商品サムネイル左上の**オリーブイエロー `#c4c22c` のランキング バッジ**、(3) 透明・1px 黒罫・角ゼロの CTA

---

## 2. Color Palette & Roles

<!-- 実サイトの pageBackground / computedStyles / interactive / uniqueBackgrounds 実測に基づく -->

### Base（下地）

- **Background** (`#f8f6f4`): ページ全体の下地。温かいアイボリー（rgb(248,246,244)）。**`html` と `body` の両方が同じ値**で、上部 viewport の 12 点サンプルのうち告知バー以外の 9 点すべてがこの色を返す。**この下地こそがブランドの決定的な特徴**
- **Surface** (`#ffffff`): 商品画像の背景・検索入力欄・ドロップダウンなど、下地から一段持ち上げる面。純白
- **Ink Black** (`#000000`): 本文・商品名・価格・CTA の罫の基調色。純黒

### Brand / Accent（ブランド・アクセント）

- **Roast Brown** (`#40150b`): ダークブラウン（rgb(64,21,11））。最上部の送料無料告知バーとポップアップの帯に使う面色。**深煎りの豆の色**であり、下地のアイボリーに対して唯一の濃い面。文字は白 `#ffffff`
- **Olive Yellow** (`#c4c22c`): オリーブイエロー（rgb(196,194,44)）。「人気NO.1 / NO.2 / NO.3」ランキング バッジの面色。文字は白 `#ffffff`。**サイト中で最も彩度の高い色だが、使用箇所は 3 枚のサムネイルのみ**という徹底した節度が特徴
- **Badge Gray** (`#888888`): 「NEW」バッジの面色（rgb(136,136,136)）。文字は白 `#ffffff`。ランキングより一段弱い告知として使う

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・商品名・価格。純黒
- **Text Heading** (`#464646`): セクション見出し（`h2.c-headerLine`）専用の濃いグレー（rgb(70,70,70)）。**本文の純黒よりわずかに退けてある**
- **Text Muted / Line** (`#bfb7af`): 温かいグレージュ（rgb(191,183,175)）。セクション見出しの下罫（`border-bottom: 1px solid`）と、メニュー内のキャッチコピー文字色を兼ねる。**罫と補助文字を同じ色で統一している点がこのサイトの流儀**
- **Border** (`#000000`): CTA・入力欄の枠は純黒 1px
- **Line Soft** (`#bfb7af`): 見出し下線・区切り罫

### 色に関する設計思想

- 基調は「アイボリー地 `#f8f6f4`」「純黒の文字と罫 `#000000`」「白の商品面 `#ffffff`」の 3 色
- 濃い面は**ダークブラウン `#40150b` だけ**。告知バーという 1 箇所に限定して使い、ページ内で乱用しない
- 有彩色は**オリーブイエロー `#c4c22c` だけ**。ランキング バッジという 1 用途に限定する
- 罫と補助文字はどちらも `#bfb7af`。グレーではなく**わずかに黄みを含んだグレージュ**にすることで、アイボリーの下地となじませる
- CTA に面色を持たせない（透明＋黒罫）ため、ページ全体が「紙に印字した」ような静けさになる

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: `MyYuGothicM` → `游ゴシック` / `Yu Gothic` / `YuGothic` → `ヒラギノ角ゴ ProN` / `Hiragino Kaku Gothic ProN` → `メイリオ` / `Meiryo` → `sans-serif`
  - **`MyYuGothicM` は Windows の游ゴシック Medium 問題への対策**。Windows の游ゴシックは Regular が細すぎるため、`@font-face` で Medium にマッピングした別名を先頭に置き、Windows でも中太を確保している（SmartHR の `AdjustedYuGothic` と同種の手法）
  - 和名・英名の両方を書く（`游ゴシック` と `Yu Gothic` / `メイリオ` と `Meiryo`）ことで、OS の言語設定に依らず解決させている
  - **ヒラギノは ProN**（Pro ではない）
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ**: **tenon**（Typotheque のヒューマニスト サンセリフ。低コントラストで開いたアペチュアを持つ）。**フォールバックチェーンの先頭**に置かれ、和文フォントより優先される。欧文グリフを tenon で拾い、和文グリフだけが游ゴシックに落ちる設計
- **欧文専用の指定**: 英語キャッチコピー・メルマガ入力欄など一部は `font-family: tenon, sans-serif` と和文を省いた短いスタックを使う
- **セリフ / 等幅**: 使用しない

> **代替フォントの注記**: tenon は Typotheque の Web ライセンス フォントのため、ローカル・preview.html では表示できない。
> - tenon → **Work Sans**（低コントラストのヒューマニスト サンセリフで、開いたアペチュアと骨格が近い。次点は Hanken Grotesk）
> - 和文 `MyYuGothicM` / 游ゴシック → **Zen Kaku Gothic New**（游ゴシックに近い、やや古典的で線の細い和文ゴシック。Noto Sans JP より印象が近い）
> - preview.html では CSS 変数だけでなく**インラインスタイルのフォント指定も代替フォントに揃えること**

### 3.3 font-family 指定

```css
/* 基本（body / 見出し / 商品名 / 価格 / ナビ すべて共通） */
font-family: tenon, MyYuGothicM, 游ゴシック, "Yu Gothic", YuGothic,
             "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, sans-serif;

/* 欧文のみのテキスト（英語キャッチ・メルマガ入力欄） */
font-family: tenon, sans-serif;
```

**フォールバックの考え方**:
- **欧文（tenon）を先頭**に置き、ラテン グリフをブランド書体で拾う（note や Apple JP と同じ「欧文優先」方針）
- 和文は Windows 対策の `MyYuGothicM` を先に、次に游ゴシック（和名・英名の両方）、macOS のヒラギノ ProN、最後にメイリオ
- **サイト全体でこの 1 スタックのみ**。見出し・本文・UI でフォントを切り替えない。階層はサイズ・ウェイト・字間だけで作る

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Heading | tenon + 游ゴシック | 18px | 700 | 1.72（30.96px） | 0.2em（3.6px） | `h2.c-headerLine`「新着」。color `#464646`、`border-bottom: 1px solid #bfb7af`、`padding-bottom: 18px` |
| Category Title (on image) | tenon + 游ゴシック | 18px | 700 | 1.0 | 0.2em（3.6px） | 写真上のカテゴリー名「コーヒー」。color `#ffffff` |
| Catch (JP) | tenon + 游ゴシック | 18px | 400 | 1.0 | 0.04em（0.7px） | 「コーヒーで、街と暮らしを豊かにする。」 |
| Catch (EN) | tenon | 14px | 400 | 1.0 | 0.1em（1.4px） | 「Connecting people through coffee.」**欧文は字間を倍に開く** |
| Body / Nav | tenon + 游ゴシック | 14px | 400 | 1.0 | 0.05em（0.7px） | `body` 既定値。ナビ・リスト・告知バーも同値 |
| Product Name | tenon + 游ゴシック | 14px | 400 | 1.71（23.94px） | 0.05em（0.7px） | `p.c-cardHeading`。**2 行に折り返す前提で行間だけ広げる** |
| Price | tenon + 游ゴシック | 14px | 400 | 1.0 | 0.05em（0.7px） | 商品名と同一。価格を太字で強調しない |
| Accordion Title | tenon + 游ゴシック | 16px | 700 | 1.8（28.8px） | 0.05em（0.7px） | 「マイメニュー」等のナビ見出し |
| Button / CTA | tenon + 游ゴシック | 12px | 400 | 1.0 | 0.05em（0.6px） | `.c-buttonLink` |
| Badge | tenon + 游ゴシック | 12px | 400 | 1.0 | 0.06em（0.7px） | 「人気NO.1」「NEW」 |
| Input (search) | tenon + 游ゴシック | 16px | 400 | 1.0 | normal | 検索入力欄。iOS のズーム回避のため 16px |
| Input (mailmagazine) | tenon | 14px | 400 | 1.0 | normal | 下線のみの入力欄 |

### 3.5 行間・字間

- **既定の行間 (line-height)**: **`1.0`（＝ font-size と同値）**。ナビ・価格・ボタン・キャッチなど、1 行で完結するテキストはすべて行間ゼロ相当で組み、要素間の余白で間隔を作る
- **折り返す本文の行間**: `1.7〜1.8`（商品名 1.71 / アコーディオン見出し 1.8 / セクション見出し 1.72）。**2 行以上になる箇所だけ行間を広げる**という明確な使い分け
- **既定の字間 (letter-spacing)**: **`0.05em`（0.7px / 14px）**。`body` に設定されており、サイト全体に効く
- **欧文の字間**: `0.1em`（1.4px / 14px）。**和文の 2 倍**に開く
- **見出しの字間**: **`0.2em`（3.6px / 18px）**。極端に開いてラベル的に見せる、このサイト最大の特徴
- **CTA の字間**: `0.05em`（0.6px / 12px）

**ガイドライン**:
- 日本語本文としては行間 1.0 は極端に狭い。**これは「1 行テキストのみ」という前提でのみ成立する**。段落を組む場合は 1.7〜1.8 を使う
- 字間はすべての階層で開く方向（詰めない）。見出し 0.2em → 欧文 0.1em → 本文 0.05em という段階を守る
- 見出しに `0.2em` を入れると和文が大きく散るため、**見出しは短い単語（「新着」「コーヒー」）に限定**する

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 商品名は「コロンビア / ルイス・フェリペ」のように**産地とプロデューサーをスラッシュで区切る**。折り返しはスラッシュの後で起こるのが自然

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使わない */
```

- 実測ではすべての要素で `font-feature-settings: normal`。**palt は使用しない**
- 字間を詰める代わりに `letter-spacing` で開く方向に振っているため、palt による詰めは方針と矛盾する

### 3.8 縦書き

該当なし（横書きのみ）。

---

## 4. Component Stylings

**すべての要素で `border-radius: 0`、`box-shadow: none`。** Shopify テーマ変数もすべて 0 / opacity 0 に設定されている。

### Buttons

**Primary CTA（`.c-buttonLink`）— 透明・黒罫・角ゼロ**

このサイトの主要 CTA はすべてこの 1 種類。「全ての商品を見る」「商品を見る」「詳しく見る」「全て見る」いずれも同一スタイル。

- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #000000`
- Border Radius: `0`
- Padding: `2px 25px 0`（**上下非対称**。ベースラインを視覚的に中央へ寄せるための微調整）
- Size: 実測 `180px × 36px`
- Font Size: 12px
- Font Weight: 400
- Letter Spacing: `0.05em`（0.6px）
- Box Shadow: `none`
- Hover（推奨）: `background: #000000; color: #ffffff`（反転）

> **重要**: このサイトには**塗りつぶしのプライマリボタンが存在しない**。CTA を目立たせるために面色を足さないこと。

**Secondary（`.c-mailmagazineButton`）— 罫なしテキストボタン**

- Background: `transparent`
- Text: `#000000`
- Border: なし
- Font Size: 12px / Weight 400
- 例: メルマガの「登録」

### Badges

**Ranking Badge（人気NO.1〜3）**

- Background: `#c4c22c`（オリーブイエロー）
- Text: `#ffffff`
- Border Radius: `0`
- Padding: `0 11px`
- Font Size: 12px / Weight 400 / Letter Spacing `0.06em`
- 配置: 商品サムネイルの**左上に絶対配置**

**New Badge（NEW）**

- Background: `#888888`
- Text: `#ffffff`
- 他は Ranking Badge と同一

### Section Heading（`.c-headerLine`）

見出しは「ラベル＋下罫」で構成する、このサイト固有のコンポーネント。

- Font Size: 18px / Weight 700
- Color: `#464646`
- Letter Spacing: `0.2em`
- Line Height: `1.72`
- Padding: `0 0 18px`
- Border Bottom: `1px solid #bfb7af`

### Inputs

**検索入力欄（`.c-searchForm_input`）**

- Background: `#ffffff`
- Border: なし（面の白で入力欄を示す）
- Border Radius: `0`
- Padding: `0 0 0 24px`
- Font Size: 16px
- Letter Spacing: `normal`（入力欄だけ字間を開かない）

**メルマガ入力欄（`.c-mailmagazineInput`）— 下線のみ**

- Background: `transparent`
- Border: `border-bottom: 1px solid #000000` のみ
- Border Radius: `0`
- Padding: `0 0 10px`
- Font Size: 14px
- Font Family: `tenon, sans-serif`

**Focus（推奨）**

- Border（下線）を `#000000` の 2px に増す、または `outline: 1px solid #000000`
- 色相を変えない（ブランドに accent の focus 色が存在しないため）

### Cards（Product Card）

- Background: `transparent`（下地のアイボリーのまま）
- Border: **なし**（`--product-card-border-width: 0`）
- Border Radius: `0`（`--product-card-corner-radius: 0`）
- Box Shadow: **なし**（`--product-card-shadow-opacity: 0`）
- Image Padding: `0`（`--product-card-image-padding: 0`）
- Text Alignment: `center`（実サイトの商品名・価格は中央揃え。テーマ変数の `left` は上書きされている）
- 構成: 正方形の商品写真（白バック）＋ 商品名（14px / lh 1.71）＋ 価格（14px）。バッジがある場合のみ画像左上に重ねる
- **カードを枠や影で囲わない**。白バックの商品写真そのものが「面」として機能し、アイボリーの下地と対比する

---

## 5. Layout Principles

### Spacing Philosophy

コンテナ幅 1200px の中に、ガター 8px の密なグリッドで商品を並べる。**要素同士の間隔は詰めつつ、上下のセクション間には大きな余白（ヘッダー上部 80px 等）を取る**。カードに枠を付けないぶん、写真の白と下地のアイボリーのコントラストで区画を示す。

### Spacing Scale（実測 + 推定）

| Token | Value | 用途 |
|-------|-------|------|
| XS | 4px | モバイルのグリッド ガター（`--grid-mobile-*`） |
| S | 8px | デスクトップのグリッド ガター（`--grid-desktop-vertical/horizontal-spacing`） |
| M | 18px | 見出しの下パディング |
| L | 40px | フッター下パディング |
| XL | 80px | ヘッダー上パディング |
| XXL | 120px | セクション間 |

### Container

- Max Width: **1200px**（`.c-baseLayout` 実測。Shopify 変数 `--page-width: 120rem` に対応）
- Padding: `80px 0 0`（ヘッダー）/ `0 0 40px`（フッター）
- ヒーロー画像・カテゴリー写真はフルブリード可

### Grid

- Product Grid: **4 カラム**（デスクトップ 1200px 内）
- Gutter: **8px**（デスクトップ）/ 4px（モバイル）
- Section Spacing: `--spacing-sections-desktop: 0px` — セクション自体には余白を持たせず、中身のパディングで制御する

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。ほぼすべての要素** |
| 1 | `0 4px 5px rgba(0,0,0,0.05)` | ポップアップのみ（`--popup-shadow-*` 実測値） |

- Shopify テーマ変数の影は**ほぼすべて `opacity: 0`**（`--media-shadow-opacity: 0.0` / `--product-card-shadow-opacity: 0` / `--buttons-shadow-opacity: 0` / `--drawer-shadow-opacity: 0.0`）。唯一 `--popup-shadow-opacity: 0.05` だけが値を持つ
- 奥行きは「白の商品写真」「1px の黒罫」「グレージュの下罫 `#bfb7af`」「余白」で表現する。影で持ち上げない

---

## 7. Do's and Don'ts

### Do（推奨）

- 下地は温かいアイボリー `#f8f6f4`、文字と罫は純黒 `#000000`、商品面は白 `#ffffff` の 3 色を基調にする
- 濃い面はダークブラウン `#40150b`（告知バー）に限定し、有彩色はオリーブイエロー `#c4c22c`（ランキング バッジ）に限定する
- **すべての要素を `border-radius: 0` にする**（Shopify のテーマ変数がすべて 0 で徹底されている）
- **CTA は透明背景 ＋ `1px solid #000000` ＋ 角ゼロ ＋ 12px / 字間 0.05em**。塗りつぶしボタンは作らない
- 字間は開く方向に段階を付ける — 見出し `0.2em` > 欧文 `0.1em` > 本文・UI `0.05em`
- 1 行で完結するテキストは `line-height: 1.0`、2 行以上に折り返す商品名・段落は `1.7〜1.8` を使う
- セクション見出しは `#464646` / 18px / 700 / 字間 0.2em ＋ `border-bottom: 1px solid #bfb7af` の「ラベル＋下罫」型にする
- 商品カードは枠も影も付けず、白バックの正方形写真＋中央揃えの商品名・価格だけで構成する
- 和文スタックの先頭に `MyYuGothicM` を置き、Windows の游ゴシック Regular が細くなる問題を回避する

### Don't（禁止）

- 角丸を付けない（`border-radius` は全要素 0。8px の角丸すら使わない）
- 影を付けない（ポップアップ以外は `box-shadow: none`）
- CTA に背景色を塗らない（面色のプライマリボタンはサイト内に存在しない）
- オリーブイエロー `#c4c22c` をランキング バッジ以外に広げない。ダークブラウン `#40150b` を告知バー以外の面に塗らない
- `letter-spacing` を詰めたり `palt` を有効にしたりしない（このブランドは開く方向に統一している）
- 折り返す日本語の段落に `line-height: 1.0` を適用しない（1 行テキスト限定のルール）
- 見出しの `0.2em` を長い文章に適用しない（短い単語のラベルに限る）
- 価格を太字や赤字で強調しない（商品名と同じ 14px / 400 / `#000000`）
- 和文フォント 1 つだけを指定しない（必ずフォールバックチェーン全体を書く）
- 純白 `#ffffff` をページ背景に使わない（下地は必ずアイボリー `#f8f6f4`）

---

## 8. Responsive Behavior

### Breakpoints（推定）

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 749px | 商品グリッド 2 カラム。ナビはハンバーガー＋ドロワー |
| Tablet | ≤ 989px | 商品グリッド 3 カラム |
| Desktop | > 989px | 商品グリッド 4 カラム / コンテナ 1200px |

### タッチターゲット

- 最小サイズ: 44px × 44px
- CTA の実測は 180px × 36px。**モバイルでは高さを 44px 以上に拡張する**（幅は 100% でも可）

### フォントサイズの調整

- 本文 14px は据え置き（これ以上小さくしない）
- 検索入力欄は **16px を維持**する（iOS の自動ズーム回避）
- セクション見出し 18px はモバイルでも維持しつつ、字間を `0.2em → 0.12em` に緩めて折り返しを防ぐ
- グリッド ガターは 8px → 4px（`--grid-mobile-*`）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #f8f6f4（温かいアイボリー / html・body 共通）
Surface:        #ffffff（商品写真・検索入力欄）
Ink / 罫 / CTA: #000000
Roast Brown:    #40150b（告知バーの面。文字は #ffffff）
Olive Yellow:   #c4c22c（人気NO.x バッジ。文字は #ffffff）
Badge Gray:     #888888（NEW バッジ。文字は #ffffff）
Heading Text:   #464646
Muted / Line:   #bfb7af（見出し下罫・補助文字）
Font:           tenon, MyYuGothicM, 游ゴシック, "Yu Gothic", YuGothic,
                "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN",
                メイリオ, Meiryo, sans-serif
                （→ Work Sans + Zen Kaku Gothic New で代替）
Body Size:      14px / line-height 1.0 / letter-spacing 0.05em
段落 line-height: 1.7〜1.8（2 行以上に折り返す場合）
Heading:        18px / 700 / #464646 / letter-spacing 0.2em
                + border-bottom 1px solid #bfb7af / padding-bottom 18px
EN Text:        14px / letter-spacing 0.1em
CTA:            transparent / #000 / 1px solid #000 / radius 0
                / padding 2px 25px 0 / 12px / letter-spacing 0.05em / 180×36px
Badge:          radius 0 / padding 0 11px / 12px / letter-spacing 0.06em
Radius:         0（全要素）
Shadow:         none（ポップアップのみ 0 4px 5px rgba(0,0,0,0.05)）
palt:           off
Container:      1200px
Grid:           4 カラム / gutter 8px
```

### プロンプト例

```
ONIBUS COFFEE のデザインシステムに従って、スペシャルティコーヒーの商品一覧セクションを作成してください。
- 下地: #f8f6f4（温かいアイボリー）、商品写真の面: #ffffff、文字と罫: #000000
- フォント: tenon, MyYuGothicM, 游ゴシック, "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN",
  "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif
  （tenon が使えない環境では Work Sans + Zen Kaku Gothic New で代替）
- すべての要素を border-radius: 0、box-shadow: none にする
- セクション見出し「新着」は 18px / 700 / #464646 / letter-spacing 0.2em、
  下に border-bottom: 1px solid #bfb7af を引き、padding-bottom: 18px
- 商品カードは枠も影も付けず、正方形の白バック写真＋中央揃えの商品名（14px / line-height 1.71）
  ＋ 価格（14px / 400 / #000000）だけで構成する。4 カラム / gutter 8px
- 人気商品には左上に #c4c22c・白文字・角ゼロ・padding 0 11px のバッジ、
  新商品には #888888 の同型バッジを重ねる
- CTA「全ての商品を見る」は透明背景 ＋ 1px solid #000000 ＋ 角ゼロ ＋ 12px ＋ letter-spacing 0.05em、
  180×36px。塗りつぶしボタンは使わない
- 字間は開く方向のみ（見出し 0.2em / 欧文 0.1em / 本文 0.05em）。palt は使わない
- ページ最上部に #40150b・白文字・14px の送料無料告知バーを 1 本だけ置く
```

### Web ライセンスフォントが使えない環境での代替指針

- 欧文 tenon → **Work Sans**（低コントラストのヒューマニスト サンセリフ。次点 Hanken Grotesk）
- 和文 MyYuGothicM / 游ゴシック → **Zen Kaku Gothic New**（游ゴシックに近い骨格。Noto Sans JP より印象が近い）
- 代替でも「アイボリーの下地・純黒の文字と細罫・角ゼロ／影ゼロ・枠なしの商品カード・開いた字間（見出し 0.2em）・ダークブラウンの告知バー・オリーブイエローのバッジ 1 色」を守れば世界観は再現できる
