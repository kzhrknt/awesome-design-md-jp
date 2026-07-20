# DESIGN.md — 暮しの手帖 (Kurashi no Techo)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 対象サイト: https://www.kurashi-no-techo.co.jp/
> 暮しの手帖は1948年創刊の生活総合誌。手描きの題字・すみずみまで手仕事の匂いがする誌面づくりで知られる。
> Web も誌面の延長にあり、**純白の紙面に DNP 秀英明朝の黒い文字を組み、要所に手仕事めいた原色の面色を置く**構成。
> 見出しやセクションタイトルに**縦書き（`writing-mode: vertical-rl`）**を使うのが最大の署名。
> 実測はトップページに基づく（WordPress サイト）。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白い紙の上に明朝体の黒い文字を組む、雑誌の誌面そのもの。装飾は最小限で、写真・書影・イラストを主役に据える。UI らしいグラデーションやガラス効果は一切なく、**面色は「刷り色」のようにベタで置く**。角丸もほぼ使わず、直線と余白で構成する
- **密度**: 低〜中密度。本文 18px という大きめの文字を `line-height: 1.75` で組み、セクション間に 80px の余白を取る。読み物としての落ち着きを最優先する
- **キーワード**: 明朝 / 誌面 / 縦書き / 刷り色 / 手仕事 / ゆったり
- **形状言語**: パネル・画像枠・囲み罫はすべて `border-radius: 0`。丸みを使うのは「バッジ（円 = 50%）」と「トピックスの pill（20px）」の2つだけで、これが誌面の中のアクセントとして効く。影も書影サムネイル（`0 3px 6px rgba(0,0,0,0.16)`）にだけ許す
- **書体の性格**: 全体を **DNP 秀英明朝 Pr6N** が支配する。ナビ・見出し・本文・キャプションまで明朝で通し、**価格や「もっと見る」といった実務的な情報だけを DNP 秀英角ゴシック銀 Std に切り替える**という、誌面の組版そのままの使い分け。字間は開かず（`normal`）、`palt` も使わない

---

## 2. Color Palette & Roles

<!-- 実サイトの pageBackground / computedStyles / interactive / uniqueBackgrounds 実測に基づく -->

### Base（下地）

- **Background** (`#ffffff`): ページ全体の下地。純白。`body` 実測 `rgb(255,255,255)`、上部 viewport の 12 点サンプルすべてが白。CSS 変数 `--wp--preset--color--white` と一致。**白い紙であることがこのブランドの前提**
- **Ink** (`#000000`): `body` / `header` / `footer` の基準文字色。純黒
- **Text Primary** (`#222222`): 見出し・本文・リンクの実効文字色（`rgb(34,34,34)`）。純黒からわずかに退けた墨色で、紙の印刷に近い印象を作る

### Signature Fills（刷り色 = ブランドの署名面色）

セクションごとに1色のベタ面を敷く。彩度を落とさず、印刷インキのようにはっきり置くのが流儀。

- **Techo Yellow** (`#fae67a`): `rgb(250,230,122)`。最頻出（32要素）。最新号紹介パネル `.new_item`、「もっと見る」帯 `.more`、書影カルーセルの背景。**事実上のブランドカラー**
- **Pale Yellow** (`#f8f89c`): `rgb(248,248,156)`。ヘッダー右上のトピックス pill の面色。Techo Yellow より一段淡い
- **Pale Blue** (`#cadfe5`): `rgb(202,223,229)`。「手帖通信」セクション `.tsushin_wrap` のベタ面。連載・読み物の領域を示す
- **Eggshell** (`#efefe2`): `rgb(239,239,226)`。書影・商品画像を置く台紙（`p.img`）。白より一段暖かいオフホワイトで、書影を紙の上に置いたように見せる
- **Off White** (`#f8f8f8`): `rgb(248,248,248)`。「今日の献立」ボックス `.top_todays_menu` の面。1px の黒罫で囲む

### Badge Colors（バッジ = 円形の刷り色）

- **Badge Red** (`#df2016`): `rgb(223,32,22)`。「最新刊」バッジ。文字は `#ffffff`
- **Badge Blue** (`#73bed3`): `rgb(115,190,211)`。「近刊予定」バッジ。文字は `#ffffff`

### Neutral

- **Border** (`#000000`): 囲み罫・セクションタイトルの枠。**1px の黒罫のみ**。グレーの罫は使わない
- **Surface** (`#ffffff`): カード・面。基本は下地と同じ白

### 色に関する設計思想

- 基調は「白 `#ffffff` × 墨 `#222222`」の2色。ここに**セクション単位で刷り色を1色だけ**敷く
- 刷り色は Techo Yellow `#fae67a` を主役に、Pale Blue `#cadfe5` / Eggshell `#efefe2` / Off White `#f8f8f8` を従える
- バッジの Red / Blue は**円形・小面積でのみ**使う。面として広げない
- グレーの階調（`#666` `#999` 等）をほぼ使わない。強弱は文字サイズと余白で作る

---

## 3. Typography Rules

### 3.1 和文フォント

- **明朝体（主役）**: **DNP 秀英明朝 Pr6N**（`dnp-shuei-mincho-pr6n`）。Adobe Fonts 経由。ナビ・見出し・本文・キャプション・バッジまで、サイト全体を明朝で通す
- **ゴシック体（従）**: **DNP 秀英角ゴシック銀 Std**（`dnp-shuei-gothic-gin-std`）。価格表示（`p.price`）と「もっと見る」リンクにのみ使用。実務情報を明朝から切り離すための限定使用

### 3.2 欧文フォント

- 欧文専用フォントの宣言はない。秀英明朝 Pr6N / 秀英角ゴシック銀 Std に含まれる欧文グリフをそのまま使い、`serif` / `sans-serif` にフォールバックする
- 数字（価格・号数・日付）も和文書体の欧文グリフで組まれるため、和文との馴染みがよい

### 3.3 font-family 指定

```css
/* 本文・見出し・ナビ（サイト全体の既定） */
font-family: dnp-shuei-mincho-pr6n, serif;

/* 価格・「もっと見る」等の実務情報 */
font-family: dnp-shuei-gothic-gin-std, sans-serif;
```

**フォールバックの考え方**:
- 和文フォントを1つだけ指定し、あとは generic family（`serif` / `sans-serif`）に委ねる潔い構成
- 再現する場合は環境依存を避けるため、`"ヒラギノ明朝 ProN", "Yu Mincho", serif` 等を明示的に足すことを推奨する

> **代替フォントの注記**: DNP 秀英明朝 Pr6N / 秀英角ゴシック銀 Std は Adobe Fonts のドメインライセンスのため、
> ローカル・preview.html では表示できない。
> - 秀英明朝 Pr6N → **Shippori Mincho**（しっぽり明朝。秀英明朝と同じく「本文用として設計された、やや細めで穏やかな和文明朝」で印象が近い）
> - 秀英角ゴシック銀 Std → **Zen Kaku Gothic New**（ふところがやや狭く、明朝と併置しても浮かないヒューマニストなゴシック）
> - preview.html の `:root` 変数だけでなく、**インラインスタイルのフォント指定も同じ代替に揃えること**

### 3.4 文字サイズ・ウェイト階層

すべて `font-weight: 400`（フッターリンクのみ 500）。**ウェイトで階層を作らず、サイズと縦横（縦書き/横書き）で作る**のがこのサイトの特徴。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Cover Title（縦書き） | 秀英明朝 | 36px | 400 | 1.5 (54px) | normal | `p.type1` 号数タイトル。`writing-mode: vertical-rl` |
| Feature Title | 秀英明朝 | 40px | 400 | 1.4 (56px) | normal | `p.ttl` 特集見出し |
| Sub Feature | 秀英明朝 | 28px | 400 | 1.4 (39.2px) | normal | `p.ttl2` |
| Section Title | 秀英明朝 | 27px | 400 | 1.75 (47.25px) | normal | `h2.top_sec_ttl`。**縦書き＋黒罫の囲み**で置く |
| Nav（グローバル） | 秀英明朝 | 24px | 400 | 1.75 (42px) | normal | `nav a` |
| Footer Link | 秀英明朝 | 22px | **500** | 1.75 (38.5px) | normal | `footer a`。サイト唯一の 500 |
| Lead / Sub Copy | 秀英明朝 | 20px | 400 | 1.5 (30px) | normal | `p.type2` リード文、ヘッダーナビ（lh 1.0） |
| Body | 秀英明朝 | 18px | 400 | 1.75 (31.5px) | normal | 本文・記事タイトル・トピックス |
| Price / Meta | 秀英角ゴシック銀 | 14px | 400 | 1.5 (21px) | normal | `p.price` 価格表示 |
| Badge | 秀英明朝 | 12px | 400 | 1.75 (21px) | normal | 「最新刊」「近刊予定」 |

### 3.5 行間・字間

- **本文の行間 (line-height)**: `1.75`（18px 本文で 31.5px）。18px という大きめの文字に対して 1.75 を取り、誌面のようにゆったり読ませる
- **セクション見出しの行間**: `1.75`（27px で 47.25px）。見出しも本文と同じ比率を保つのが特徴
- **大見出し（40px / 28px）の行間**: `1.4`
- **縦書きタイトルの行間**: `1.5`（36px で 54px）。縦書きでは line-height が「列の間隔」になるため、詰めすぎない
- **字間 (letter-spacing)**: 全要素を通して **`normal`**。開かない・詰めない

**ガイドライン**:
- 本文サイズを 16px ではなく **18px** に取ることで、明朝体の可読性を確保している。明朝を本文に使う場合はサイズを大きめに取る
- 行間はサイズが大きくなるほど比率を落とす（18〜27px → 1.75、28〜40px → 1.4〜1.5）
- 字間を触らないのがこのブランドの流儀。階層はサイズでのみ作る

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 縦書きブロックでは行の折り返し位置が誌面の印象を大きく左右するため、`line-break: strict` を必ず指定する

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使わない */
```

- 実測では全要素が `font-feature-settings: normal`、`letter-spacing: normal`。**palt は off**
- 明朝体のベタ組み（全角送り）をそのまま活かす方針。詰め処理をかけると誌面らしさが失われる

### 3.8 縦書き

**このサイトの最大の署名**。セクションタイトルと表紙まわりのタイトルに縦書きを使う。

```css
writing-mode: vertical-rl;
text-orientation: mixed;
```

適用箇所（実測）:
- `p.type1`（号数タイトル「暮しの手帖 第5世紀42号」）: 36px / line-height 54px（1.5）
- `p.img.pc` / `p.img.sp`（表紙まわりのタイトル画像枠）
- `h2.top_sec_ttl`（セクションタイトル）: 27px。**1px の黒罫で囲んだ縦長のボックス**に入れ、コンテンツの右側に配置する

**実装上の注意**:
- 縦書きボックスは高さが内容で決まるため、`height` ではなく `max-height` と `padding` で調整する
- 縦中横（半角数字を横に組む）が必要な場合は `text-combine-upright: digits 2` を併用する
- 縦書き要素の `letter-spacing` は行の詰まりに直結するので `normal` を守る

---

## 4. Component Stylings

角丸は原則ゼロ。丸みは「バッジ（円）」と「トピックス pill」の2つに限定する。

### Topics Pill（ヘッダー右上のお知らせ）

- Background: `#f8f89c`
- Text: `#222222`
- Border: なし
- Border Radius: `20px`（pill）
- Padding: `5px 16px`
- Font: 秀英明朝 18px / weight 400 / line-height 1.6（28.8px）
- 例: 「【7月28日開催！】暮しの手帖の紙祭り」

### Badges（円形バッジ）

書影の左上に重ねる小さな円。**正円（`border-radius: 50%`）で、テキストは中央揃え**。

**最新刊**
- Background: `#df2016`
- Text: `#ffffff`
- Border Radius: `50%`
- Size: 約 72px 径
- Font: 秀英明朝 12px / line-height 1.75（21px）

**近刊予定**
- Background: `#73bed3`
- Text: `#ffffff`
- Border Radius: `50%`
- Size: 約 72px 径
- Font: 秀英明朝 12px / line-height 1.75（21px）

### "More" Bar（もっと見る）

セクション右下に置かれる、刷り色のベタ帯。ボタンというより「誌面の続きへの導線」。

- Background: そのセクションの刷り色（`#fae67a` または `#cadfe5`）
- Text: `#222222`
- Border Radius: `0`
- Font: **秀英角ゴシック銀** 18px / line-height 1.75（31.5px）
- 矢印記号（→ を丸で囲んだ記号）をテキスト右に添える

### Outline Button（定期購読等）

- Background: `transparent`
- Text: `#222222`
- Border: `1px solid #000000`
- Border Radius: `0`
- Padding: `16px 20px`
- Font: 秀英明朝 18px / line-height 1.75
- 矢印記号を末尾に添える

### Panels / Sections

**刷り色パネル**
- Background: `#fae67a`（最新号）/ `#cadfe5`（手帖通信）
- Border Radius: `0`
- Padding: `50px 40px 48px 70px`（`.new_item`）/ `60px 70px 60px 84px`（`.tsushin_wrap`）
- Shadow: なし

**囲み罫ボックス（今日の献立）**
- Background: `#f8f8f8`
- Border: `1px solid #000000`
- Border Radius: `0`
- Padding: `50px 70px`

### Cards（書影 / 商品カード）

- Image Plate Background: `#efefe2`（書影を置く台紙）
- Card Background: `transparent`（下地の白または刷り色のまま）
- Border: なし
- Border Radius: `0`
- Image Shadow: `0 3px 6px rgba(0, 0, 0, 0.16)`（**書影サムネイルのみ**）
- 構成: 台紙付き書影 →（バッジ）→ タイトル（明朝 18px）→ 発売時期（小）→ 価格（ゴシック 14px）

### Inputs

<!-- トップページに入力欄が存在しないため、サイトの形状言語から導出した推奨仕様 -->

- Background: `#ffffff`
- Border: `1px solid #000000`
- Border (focus): `2px solid #000000`（色は変えず、罫を太くする）
- Border Radius: `0`
- Padding: `12px 16px`
- Font Size: 18px（秀英明朝）
- Error Border: `1px solid #df2016`、エラーテキストも `#df2016`

---

## 5. Layout Principles

### Spacing Philosophy

セクションごとに `80px` の縦余白を取り、その中で刷り色のベタ面と白場を交互に置く。左に縦組みのセクションタイトル、右にコンテンツ、というような**誌面的な非対称レイアウト**を積極的に使う。

### Spacing Scale（実測ベース）

| Token | Value | 用途 |
|-------|-------|------|
| XS | 8px | テキストブロックの上下 padding |
| S | 16px | pill の左右 padding |
| M | 40px | パネル内側の左右余白 |
| L | 50px | パネル内側の上下余白 |
| XL | 70px | 大きなパネルの左右余白、囲み罫ボックス |
| XXL | 80px | セクション間、フッター上下 |

### Container

- Max Width: `1400px`（`.wrap`）
- 実効コンテンツ幅: 約 `1240px`
- Footer Padding: `80px 100px`
- Section Padding: `80px 0`（`.top_sec`）

### Grid

- Columns: 12（書影一覧は 2〜4 カラム）
- Gutter: 40px 前後
- **左サイドバー型のヘッダー**（ロゴ＋グローバルナビを画面左に縦積み）とメインカラムの2分割が基本形
- 縦書きのセクションタイトルはコンテンツの左右どちらかに「柱」として立てる

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。パネル・カード・帯・バッジはすべてフラット |
| 1 | `0 3px 6px rgba(0, 0, 0, 0.16)` | **書影サムネイルのみ**。本が紙面に置かれている感じを出す |
| 2 | `0 8px 24px rgba(0, 0, 0, 0.16)` | モーダル・SPメニューのオーバーレイ（推奨値） |

- 影は「モノとしての本」を表現するためだけに使う。UI 要素には付けない
- 奥行きは影ではなく、**刷り色のベタ面と白場のコントラスト**で作る

---

## 7. Do's and Don'ts

### Do（推奨）

- 下地は純白 `#ffffff`、文字は墨 `#222222` を基調にする
- 全体を明朝体（秀英明朝 → Shippori Mincho 代替）で組み、**価格・「もっと見る」等の実務情報だけ**をゴシックに切り替える
- 本文は 18px / `line-height: 1.75` と大きめ・ゆったりに取る
- セクションタイトルは**縦書き（`writing-mode: vertical-rl`）＋1px 黒罫の囲み**で組む
- 刷り色（`#fae67a` / `#cadfe5` / `#efefe2` / `#f8f8f8`）を**セクション単位で1色だけ**ベタ面として敷く
- 角丸は 0 を既定にし、バッジ（`50%`）とトピックス pill（`20px`）にのみ丸みを許す
- 字間は `normal`、`palt` は off。ベタ組みを守る
- 書影には `#efefe2` の台紙と `0 3px 6px rgba(0,0,0,0.16)` の影を添える
- ウェイトは 400 で通し、階層はサイズと縦横で作る

### Don't（禁止）

- 本文をゴシック体で組まない（明朝がこのブランドの声）
- 本文を 16px 以下に落とさない（明朝の可読性が崩れる）
- パネル・カード・ボタンに角丸を付けない（`border-radius: 0` が既定）
- 影をカードやボタンに付けない（影は書影だけ）
- バッジの赤 `#df2016` / 青 `#73bed3` を面色として広く塗らない（円形の小面積限定）
- グレーの階調（`#666` `#999`）で階層を作らない。強弱はサイズと余白で作る
- 字間を開けたり `palt` で詰めたりしない
- 太字（700）で見出しを強調しない。ウェイトは 400 が基本
- 和文フォント1つだけを指定しない（必ずフォールバックチェーンを書く）

---

## 8. Responsive Behavior

### Breakpoints（推定）

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。左サイドバーのナビはハンバーガー（`.spnavi`）に格納 |
| Tablet | ≤ 1024px | 2 カラム。縦書きタイトルは維持 |
| Desktop | > 1024px | 左サイドバー＋メインカラム。max-width 1400px |

- 表紙まわりは `p.img.pc` / `p.img.sp` のように **PC / SP で別の画像を出し分ける**実装

### タッチターゲット

- 最小サイズ: 44px × 44px
- 円形バッジ（約 72px 径）はそのままでタッチターゲットを満たす

### フォントサイズの調整

- 本文 18px はモバイルでも 16px 未満に落とさない（明朝の可読性のため）
- 大見出し（40px）はモバイルで 24〜28px に縮小。`line-height` 1.4 と字間 `normal` は維持する
- 縦書きのセクションタイトル（27px）はモバイルでは 18〜20px に縮小するか、横書きに切り替える

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff（純白）
Text Primary:    #222222（墨）
Ink / Border:    #000000（1px 黒罫）
Techo Yellow:    #fae67a（主要な刷り色・最新号パネル / もっと見る帯）
Pale Yellow:     #f8f89c（トピックス pill）
Pale Blue:       #cadfe5（手帖通信セクション）
Eggshell:        #efefe2（書影の台紙）
Off White:       #f8f8f8（囲み罫ボックス）
Badge Red:       #df2016（最新刊）
Badge Blue:      #73bed3（近刊予定）
Font(明朝/主):    dnp-shuei-mincho-pr6n, serif（→ Shippori Mincho 代替）
Font(ゴシック/従): dnp-shuei-gothic-gin-std, sans-serif（→ Zen Kaku Gothic New 代替）
Body Size:       18px
Line Height:     1.75（本文・見出し 27px まで）/ 1.4〜1.5（28px 以上）
Letter Spacing:  normal（全体）
palt:            off
Font Weight:     400（フッターリンクのみ 500）
Radius:          0（既定）/ 20px（トピックス pill）/ 50%（バッジ）
Shadow:          none（既定）/ 0 3px 6px rgba(0,0,0,0.16)（書影のみ）
縦書き:           writing-mode: vertical-rl（セクションタイトル・号数タイトル）
Container:       max-width 1400px / セクション余白 80px
```

### プロンプト例

```
暮しの手帖のデザインシステムに従って、生活誌の最新号紹介セクションを作成してください。
- 下地: #ffffff、文字: #222222、罫: 1px solid #000000
- フォント: Shippori Mincho（明朝）でサイト全体を組み、価格と「もっと見る」のみ Zen Kaku Gothic New
- 本文 18px / line-height 1.75、字間は normal、palt off、font-weight は 400 で統一
- セクションタイトル「新刊・既刊情報」は writing-mode: vertical-rl の縦書きにし、1px の黒罫で囲んだ縦長ボックスに入れて右側に置く
- 最新号パネルの背景は刷り色 #fae67a のベタ面（border-radius: 0、影なし、padding 50px 40px 48px 70px）
- 書影は #efefe2 の台紙に置き、画像にのみ box-shadow: 0 3px 6px rgba(0,0,0,0.16) を付ける
- 書影の左上に「最新刊」バッジ（#df2016 / #fff / border-radius: 50%）を重ねる
- セクション右下に「もっと見る →」の帯（背景 #fae67a、角丸なし、ゴシック 18px）を置く
- 角丸はバッジ（50%）とトピックス pill（20px）以外すべて 0
```

### Adobe Fonts が使えない環境での代替指針

- 明朝 DNP 秀英明朝 Pr6N → **Shippori Mincho**（Google Fonts。本文用に設計された穏やかな和文明朝で、秀英明朝の落ち着きに近い）
- ゴシック DNP 秀英角ゴシック銀 Std → **Zen Kaku Gothic New**（Google Fonts。明朝と併置しても浮かないヒューマニストなゴシック）
- 代替でも「純白の下地・明朝体で通す組版・18px / line-height 1.75 の本文・縦書きのセクションタイトル・角丸ゼロ・セクション単位のベタな刷り色・書影だけの控えめな影・字間 normal」を守れば誌面の世界観は再現できる
