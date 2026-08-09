# DESIGN.md — 福光屋（FUKUMITSUYA）

> 株式会社福光屋（https://www.fukumitsuya.co.jp/）のデザイン仕様書。
> 1625 年（寛永 2 年）創業、金沢に本社を置く石川県で最も古い酒蔵。全量純米蔵として日本酒「加賀鳶」「黒帯」「福正宗」を醸し、酒粕由来の化粧品・発酵食品まで手がける。
> 最大の特徴は、**和文にモリサワの Web フォントを 2 系統使い、明朝（リュウミン）とゴシック（こぶりなゴシック）で役割を厳密に分ける**こと。**見出し・情緒は「リュウミン L-KL」、UI・本文は「こぶりなゴシック W1」**。そして**太さは `font-weight` ではなく W1 → W3 のファミリー切り替えで作り、`font-weight` は全要素 400 のまま**という実装。
> 色は白地に**深紅 `#b71a35`** と**焦茶 `#211c1c`**。角丸ゼロの矩形バッジと、`letter-spacing` を 0.05em〜0.23em まで段階的に開く組版が、老舗の落ち着きを作っている。
> 実サイトの computed style 実測（2026-08-09 取得。トップ＋「福光屋の酒造り」ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地に明朝を置き、字間で「間」を作る**。面色も影もほとんど使わず、細い罫線と余白で構造を作る。彩度を持つのは深紅 `#b71a35` のみで、バッジと通販導線にだけ現れる
- **福光屋について**: 400 年続く金沢の酒蔵。「純米蔵」「発酵」「金沢」が軸で、サイトも商品写真と読み物が半々。伝統を語るが、UI 自体は現代的でフラット
- **密度**: 中密度。トップは商品カテゴリ → お知らせ一覧 → 特集の積層。情報は詰まっているが、行間と字間で息を作る
- **キーワード**: 白地、リュウミン L-KL の見出し、こぶりなゴシック W1/W3、深紅 `#b71a35`、焦茶 `#211c1c`、radius 0 の矩形バッジ、和文＋英字の 2 段見出し
- **特徴**:
  - **和文はモリサワ Web フォント 2 系統**。**リュウミン**（`Ryumin Light KL` / `Ryumin Regular KL`）が明朝の見出し・情緒担当、**こぶりなゴシック**（`Koburina Gothic W1 JIS2004` / `W3 JIS2004`）が UI・本文担当
  - **`font-weight` は全要素 400**（ナビの一部 700 を除く）。太さは **W1 → W3 のファミリー名切り替え**で作る。`.c-gothic-bold` というクラスが `Koburina Gothic W3` に差し替える実装
  - **`.c-serif` クラスがリュウミンへの切替スイッチ**。見出しに付けると明朝になる
  - **セクション見出しは「和文明朝（33px リュウミン）＋ 英字ゴシック（12px / ls 0.2em / `#898989`）」の 2 段組**。日本語で意味を、英字で調子を与える定型
  - **`letter-spacing` を段階的に開く**。本文 `0.05em` → 見出し `0.085em` → 英字ラベル `0.2em` → セクションタイトル `0.2em`。**字間の広さが階層そのもの**
  - **角丸は 0**。NEWS / PRESS RELEASE バッジも矩形。円（`50%`）はページトップボタンなどのアイコンにのみ使う
  - 影は 2 種類のみ（`0 0 50px 5px rgba(0,0,0,.1)` / `0 25px 50px 5px rgba(0,0,0,.1)`）で、**広く薄いぼかし**。落ち影ではない
  - フォールバックの 2 番目が **游ゴシック体**。ヒラギノは **Pro**（ProN ではない）を指定する

---

## 2. Color Palette & Roles

> 実測値。地は純白 `#ffffff`、テキストは焦茶 `#211c1c`。彩度を持つのは深紅 `#b71a35` のみで、それ以外は無彩色〜低彩度のグレー階調。

### Brand（ブランド）

- **Crimson** (`#b71a35`, rgb 183,26,53): ブランドの中核。ヘッダーの「通信販売」CTA、NEWS / PRESS RELEASE バッジ、「オンラインショップ」「直営店」ラベル。**サイトで最も出現する彩度**で、日本酒の深紅を思わせる沈んだ赤
- **Sumi** (`#211c1c`, rgb 33,28,28): 基本テキスト色にして「お問い合わせ」CTA の面色。**純黒ではなくわずかに赤みを含んだ焦茶**。半透明 `rgba(33,28,28,0.6)` で画像上のスクリムとしても使う

### Neutral（面・罫・文字）

- **Background** (`#ffffff`): ページ地色。純白
- **Dark Brown** (`#39302d`, rgb 57,48,45): 商品カテゴリ（酒／食品／化粧品）のヘッダー面。`#211c1c` より一段明るい茶
- **Button Dark** (`#3e3a39`, rgb 62,58,57): 「もっと詳しく」「店舗一覧」等のソリッドボタン面
- **Gray CTA** (`#5e5d5c`, rgb 94,93,92): 「酒蔵見学のご案内」「GLOBAL SITE」の面色。深紅より弱い導線に使う
- **Sub Text** (`#727171`, rgb 114,113,113): 補足文・アウトラインボタンの枠線
- **Muted** (`#898989`, rgb 137,137,137): **英字ラベル専用の色**。2 段見出しの下段（"FUKUMITSUYA'S SAKE" 等）
- **Border / Rule** (`#c9caca`, rgb 201,202,202): 区切り罫。ニュース一覧の行間の細線
- **Surface** (`#efefef`, rgb 239,239,239): SNS リンク帯などの薄い面

### External Brand（外部サービス色）

通販導線でのみ使う。福光屋のパレットには含めない。

- **Rakuten** (`#bf0000`) / **Yahoo!** (`#e26615`) / **Amazon** (`#211c1c` に白文字)

### Semantic（意味的な色）

- 酒蔵サイトのため意味色は前面に希薄
- **Danger／Error**: 深紅 `#b71a35` をそのまま使わず、より明度を上げた赤（`#c8253c` 目安）にして CTA と区別する
- **Warning**: 「お酒は 20 歳になってから」の注意文は `#211c1c` の 11px で、色を変えずサイズで示す。同じ考え方でよい
- **Success**: 低彩度の緑（`#4a6b4f` 目安）。彩度を上げると和のトーンが崩れる

---

## 3. Typography Rules

> **モリサワの明朝（リュウミン）とゴシック（こぶりなゴシック）を役割で厳密に分ける**。太さは `font-weight` ではなく **W1 → W3 のファミリー切り替え**で作り、`font-weight` は 400 のまま。`letter-spacing` を 0.05em〜0.2em まで段階的に開くのが組版の要。

### 3.1 和文フォント

- **明朝体（見出し・情緒）**: **リュウミン**。`Ryumin Light KL`（L-KL）を見出しに、`Ryumin Regular KL`（R-KL）をナビの日本語ラベルに使う。モリサワの基幹明朝で、KL は「かな Light」系のファミリー
- **ゴシック体（UI・本文）**: **こぶりなゴシック JIS2004**。`Koburina Gothic W1 JIS2004`（細）と `Koburina Gothic W3 JIS2004`（中太）の 2 ウェイト。**小さめの字面でも読みやすい、ふところの狭いモダンゴシック**
- **フォールバック**: `游ゴシック体` → `Yu Gothic` → `YuGothic` → `ヒラギノ角ゴシック Pro` → `Hiragino Kaku Gothic Pro` → `メイリオ` → `Meiryo` → `Osaka` → `ＭＳ Ｐゴシック` → `MS PGothic` → `sans-serif`
- **ヒラギノは Pro を指定**（ProN ではない）。JIS90 字形側を選んでいる点に注意
- **明朝側のフォールバックは `serif` のみ**（`"Ryumin Light KL", serif`）。游明朝等を経由しない

### 3.2 欧文フォント

- 欧文専用のスタックは持たない。**こぶりなゴシック / リュウミンに含まれる欧文グリフをそのまま使う**
- そのため "FUKUMITSUYA'S SAKE" "GLOBAL SITE" "INFORMATION" などの英字ラベルも和文と同じ書体で組まれ、和欧のトーンが揃う
- 等幅フォントは使わない
- **preview.html での注記**: `Ryumin Light KL` / `Koburina Gothic W1・W3 JIS2004` はモリサワのライセンス Web フォントのため、ローカルの preview.html では表示できない。プレビューでは **Google Fonts の `Shippori Mincho`（400/500）を明朝の代替**、**`Zen Kaku Gothic New`（300/400/500）をゴシックの代替**に用いる。Zen Kaku Gothic New は**モリサワ提供の書体**で、こぶりなゴシックと同じ提供元・近い字面設計のため印象が最も近い。実装時は必ずモリサワ Web フォントを読み込むこと

### 3.3 font-family 指定

```css
/* 本文・UI（こぶりなゴシック W1） */
font-family: "Koburina Gothic W1 JIS2004", 游ゴシック体, "Yu Gothic", YuGothic,
             "ヒラギノ角ゴシック Pro", "Hiragino Kaku Gothic Pro",
             メイリオ, Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;

/* 強調・小見出し（こぶりなゴシック W3） — .c-gothic-bold */
font-family: "Koburina Gothic W3 JIS2004", 游ゴシック体, "Yu Gothic", YuGothic,
             "ヒラギノ角ゴシック Pro", "Hiragino Kaku Gothic Pro",
             メイリオ, Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;

/* 見出し・情緒（リュウミン L-KL） — .c-serif */
font-family: "Ryumin Light KL", serif;

/* ナビの日本語ラベル（リュウミン R-KL） */
font-family: "Ryumin Regular KL", serif;

/* body の既定 */
font-size: 14px;
font-weight: 400;          /* 全要素 400。太さはファミリー名で切り替える */
line-height: 1.6;          /* 22.4px */
letter-spacing: 0.05em;    /* 0.7px */
font-feature-settings: normal;   /* palt は使わない */
```

**フォールバックの考え方**:
- **和文フォントを先頭**に置く（和文の表示品質を優先）
- 2 番目が **游ゴシック体**（Windows / macOS 共通の受け皿）、3 番目が **ヒラギノ角ゴシック Pro**
- 明朝側は `serif` で締めるだけの短いチェーン。**明朝は Web フォントが当たることを前提**にしている
- **`font-weight` で太さを作らない**。必ず `W1` → `W3` にファミリー名を切り替える（合成ボールドはこぶりなゴシックの繊細な字面を潰す）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | リュウミン L-KL | 35px | 400 | 1.2 (42px) | 0.1em (3.5px) | 下層ページの `h2`（白文字・写真上） |
| Section Title (JP) | リュウミン L-KL | 33px | 400 | 1.6 (52.8px) | 0.021em (0.7px) | 「福光屋の酒」。字間は締める |
| Section Title (JP alt) | リュウミン L-KL | 33px | 400 | 1.6 (52.8px) | 0.085em (2.8px) | 「福光屋の直営店」。写真上では開く |
| Section Label (EN) | こぶりな W1 | 12px | 400 | 1.6 (19.2px) | **0.2em (2.4px)** | "FUKUMITSUYA'S SAKE" `#898989` |
| Section Head (EN) | こぶりな W1 | 20px | 400 | 1.6 (32px) | **0.2em (4px)** | "INFORMATION" / "TOPICS" |
| Category Title | リュウミン L-KL | 20px | 400 | 1.6 (32px) | 0.035em (0.7px) | 「酒」「食品」「化粧品」（濃茶面の白文字） |
| Heading 3 (Serif) | リュウミン L-KL | 18px | 400 | 1.6 (28.8px) | 0.039em (0.7px) | 読み物の小見出し |
| Lead / Copy | こぶりな W1 | 17px | 400 | 1.6 (27.2px) | 0.041em (0.7px) | カテゴリのリード文 |
| Nav Label (JP) | リュウミン R-KL | 16px | 400 | 1.0 (16px) | 0.1em (1.6px) | グローバルナビの日本語 |
| Nav Label (EN) | こぶりな W1 | 12px | 400 | 1.0 (12px) | **0.2em (2.4px)** | ナビ下段の英字 `#898989` |
| Sub Head | こぶりな **W3** | 16px | 400 | 1.6 (25.6px) | 0.044em (0.7px) | 強調小見出し（`.c-gothic-bold`） |
| List Item | こぶりな W1 | 15px | 400 | 1.6 (24px) | 0.047em (0.7px) | ニュースのタイトル |
| Outline Button | こぶりな **W3** | 15px | 400 | 1.6 (24px) | 0.1em (1.5px) | 「一覧をみる」 |
| Body | こぶりな W1 | 14px | 400 | **1.6 (22.4px)** | 0.05em (0.7px) | `body` 既定 |
| Body (Article) | こぶりな W1 | 14px | 400 | **2.0 (28px)** | 0.05em (0.7px) | 読み物本文。**行間が広がる** |
| Body (wide) | こぶりな W1 | 14px | 400 | 1.6 (22.4px) | **0.2em (2.8px)** | 写真上のラベル「蔵元見学」 |
| Small | こぶりな W1 | 13px | 400 | 1.6 (20.8px) | 0.054em (0.7px) | 住所・フッター |
| Caption | こぶりな W1 | 12px | 400 | 1.6 (19.2px) | normal | 商品説明 `#727171` |
| Badge | こぶりな W1 | 11px | 400 | 1.0〜1.6 | 0.064em (0.7px) | NEWS / PRESS RELEASE（白文字・深紅面） |
| Attention | こぶりな W1 | 11px | 400 | 1.6 (17.6px) | 0.064em (0.7px) | 「お酒は 20 歳になってから」 |

- **`font-weight` は全要素 400**。太く見せたい箇所は `.c-gothic-bold`（= `Koburina Gothic W3`）を付ける
- 例外はナビの一部（`font-weight: 700` が乗る）のみ
- **`line-height: 1.6` が全体の基準**。読み物本文だけ **2.0** に開く

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.6**（14px → 22.4px）。読み物本文は **2.0**（14px → 28px）
- **見出しの行間**: 明朝の大見出しは **1.2〜1.6**。33px → 52.8px（1.6）と、明朝としては広めに取る
- **字間 (letter-spacing)**: **段階的に開く**のがこのサイトの組版の核心
  - 本文・UI: **0.05em**（14px に対し 0.7px）
  - 見出し（写真上）: **0.085〜0.1em**
  - **英字ラベル・セクション見出し・写真上のラベル: 0.2em**
- **`palt` は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- **字間の広さで階層を作る**。サイズを上げるより先に `letter-spacing` を開くのが福光屋の作法
- 英字は必ず `0.2em` まで開く。和文と同じ字間で英字を組まない
- 本文 1.6、読み物 2.0。この 2 段だけで通す
- 明朝の見出しは行間を締めすぎない（1.6 が基準）。詰めると窮屈になり、老舗の余裕が消える

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 商品名の『黒帯』『加賀鳶』などは二重かぎ括弧で括られることが多い。括弧の前後で改行させない

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を掛けない */
```

- **`palt` は使わない**。こぶりなゴシック・リュウミンの等幅の字面をそのまま使う
- 字間の調整は **`letter-spacing` で開く方向のみ**。詰める方向には動かさない
- 和欧が同一書体（和文書体の欧文グリフ）のため、`kern` に頼らずとも混植が破綻しない

### 3.8 縦書き

- 現行サイトは全面横組み（`writing-mode: horizontal-tb`）
- 商品ラベルや蔵の紹介など、縦組みを見せる場合は以下

```css
writing-mode: vertical-rl;
text-orientation: mixed;
font-family: "Ryumin Light KL", serif;   /* 縦組みは明朝で */
```

---

## 4. Component Stylings

### Buttons

**Primary（深紅・矩形）** — 通販・購入の導線

- Background: `#b71a35`
- Text: `#ffffff`
- Padding: `14px 24px`（ヘッダー CTA は高さ 80px の帯として置かれる）
- Border Radius: **`0px`**
- Font: こぶりな W1 / 14px / weight 400 / ls 0.05em
- 例: 「通信販売」「公式通販」

**Dark（焦茶・矩形）** — 一般的な遷移

- Background: `#3e3a39`（フッター CTA は `#211c1c`）
- Text: `#ffffff`
- Padding: `20px 40px`
- Border Radius: **`0px`**
- Font: こぶりな W1 / 14〜16px / ls 0.05em
- 例: 「もっと詳しく」「店舗一覧」「お問い合わせ」

**Gray（弱い導線）**

- Background: `#5e5d5c`
- Text: `#ffffff`
- Padding: `15px`
- Border Radius: **`0px`**
- Font: こぶりな **W3** / 14px
- 例: 「酒蔵見学のご案内」「GLOBAL SITE」

**Outline（白地・矩形）**

- Background: `transparent`
- Text: `#211c1c`
- Border: `1px solid #727171`
- Padding: `10px 0`（幅は 380px 程度のブロックとして置く）
- Border Radius: **`0px`**
- Font: こぶりな **W3** / 15px / ls 0.1em
- 左端に `›` のシェブロンを置く
- 例: 「一覧をみる」「もっと詳しく」「直営店 一覧」

**Badge（深紅・矩形）**

- Background: `#b71a35`
- Text: `#ffffff`
- Padding: `6px 0`（幅 130px 程度の固定ブロック）
- Border Radius: **`0px`**
- Font: こぶりな W1 / 11px / ls 0.064em
- 例: 「NEWS」「PRESS RELEASE」「オンラインショップ」「直営店」

**Scroll Top（円）**

- Border Radius: `50%`。**サイトで円が許される唯一の要素**

### Inputs

- Background: `#ffffff`
- Border: `1px solid #c9caca`
- Border (focus): `1px solid #b71a35`
- Border Radius: **`0px`**
- Padding: `12px 14px`
- Font: こぶりな W1 / 14px / weight 400 / ls 0.05em
- Text Color: `#211c1c` / Placeholder: `#898989`

### Cards

- Background: `#ffffff`
- Border: なし。**細い罫 `1px solid #c9caca`** で行を区切る（ニュース一覧）
- Border Radius: **`0px`**（画像も角丸にしない）
- Padding: `0`（画像の下にテキストを直接置く）
- 構成: 画像 → タイトル（こぶりな W1 14px）→ 説明（12px `#727171`）
- 画像の上に情報を載せるときは `rgba(33,28,28,0.6)` のスクリムを掛け、中央に「もっと詳しく」を置く

### Section Heading（和文明朝＋英字の 2 段組）

サイトを通じて使われる定型。**この 2 段組が福光屋の見出しの型**。

```html
<p class="ja c-serif">福光屋の酒</p>
<p class="en c-gothic-thin">FUKUMITSUYA’S SAKE</p>
```

- 上段: リュウミン L-KL / 33px / lh 1.6 / ls 0.021〜0.085em / `#211c1c`（写真上では `#ffffff`）
- 下段: こぶりな W1 / 12px / lh 1.6 / **ls 0.2em** / `#898989`（写真上では `#ffffff`）

### Section Head（英字単独）

- こぶりな W1 / 20px / **ls 0.2em** / `#211c1c`
- 直下に `1px solid #c9caca` の罫を全幅で引く
- 例: 「INFORMATION」「TOPICS」

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 6px |
| S | 10px |
| M | 15px |
| L | 20px |
| XL | 40px |
| XXL | 60px |
| XXXL | 100px |

### Container

- Max Width: **1000px**（サイト全体の標準コンテナ）
- 読み物カラム: **680px**
- Padding (horizontal): 20〜40px
- ヘッダーの「通信販売」CTA は**コンテナを飛び出して右端に接地**する（高さ 80px の帯）

### Grid

- Columns: 商品・特集カードは 4 カラム、ニュースは 1 カラムのリスト
- Gutter: 20px
- KV は全幅ブリード、以下は 1000px のコンテナに収める

---

## 6. Depth & Elevation

実測の `box-shadow` は 2 種類のみ。いずれも**広く薄いぼかし**で、落ち影ではない。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。白地と細い罫 `#c9caca` で構成する |
| 1 | `0 0 50px 5px rgba(0,0,0,0.1)` | 全方向に広がる薄いぼかし。ドロップダウン・浮遊パネル |
| 2 | `0 25px 50px 5px rgba(0,0,0,0.1)` | 下方向に長く伸びるぼかし。モーダル・大きなパネル |

- 奥行きは主に **白 `#ffffff` × 焦茶 `#211c1c` / `#39302d` の面**と**細い罫 `#c9caca`** のコントラストで表現する
- 濃い落ち影を作らない。ぼかし半径 50px の薄い影が最大

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文は**リュウミン（見出し・情緒）とこぶりなゴシック（UI・本文）の 2 系統**で組み、役割を混ぜない
- 太さは **`Koburina Gothic W1` → `W3` のファミリー切り替え**で作る。`font-weight` は 400 のまま
- **字間の広さで階層を作る**。本文 0.05em → 見出し 0.085〜0.1em → **英字ラベルは 0.2em**
- セクション見出しは**「和文明朝 33px ＋ 英字ゴシック 12px / ls 0.2em / `#898989`」の 2 段組**にする
- 本文の行間は 1.6、読み物本文は 2.0
- 彩度は深紅 `#b71a35` に絞る。弱い導線は `#5e5d5c`、一般の遷移は `#3e3a39` のグレースケールで
- テキストは焦茶 `#211c1c`（純黒ではない）
- ボタン・バッジ・カード・画像は**すべて radius 0**
- 影は「広く薄いぼかし」（`0 0 50px 5px rgba(0,0,0,.1)`）に留める
- 区切りは面ではなく**細い罫 `1px solid #c9caca`** で引く

### Don't（禁止）

- **`font-weight: bold` で太さを作らない**（合成ボールドはこぶりなゴシックの繊細な字面を潰す。必ず W1 → W3 を切り替える）
- **明朝を本文・UI に使わない**（リュウミンは見出しとナビの日本語ラベルまで）
- **ゴシックでセクション見出しの和文を組まない**（和文の見出しは必ずリュウミン）
- **英字を和文と同じ字間で組まない**（英字ラベルは必ず 0.2em まで開く）
- **角丸を使わない**（radius が許されるのはページトップの円 `50%` のみ）
- `palt` を掛けない、字間を詰める方向に動かさない
- 純黒 `#000000` を使わない（テキストは焦茶 `#211c1c`）
- 深紅 `#b71a35` を広い面に使わない（バッジと通販 CTA に限定する点の色）
- 本文の行間を 1.5 以下にしない
- 濃い落ち影を作らない（ぼかし 50px の薄い影が上限）
- ヒラギノを **ProN** で指定しない（このサイトは **Pro**）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。グローバルナビはドロワー、「通信販売」CTA は下部固定に回る |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 4 カラム＋最大 1000px コンテナ |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。深紅バッジ（11px / padding 6px）は装飾なので対象外、リンクは行全体をタップ領域にする
- アウトラインボタンは幅 380px / 高さ 44px 前後で十分

### フォントサイズの調整

- 本文 14px は据え置く（13px を下回らない）
- 明朝の Section Title 33px → モバイルでは 22〜24px、Page Title 35px → 24〜26px
- 英字ラベル 12px は縮めない。**`letter-spacing: 0.2em` も維持する**（縮めると 2 段見出しの調子が崩れる）
- 行間 1.6（読み物 2.0）と本文字間 0.05em はモバイルでも維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff   （純白）
Text:           #211c1c   （焦茶。純黒は使わない）
Crimson:        #b71a35   （唯一の彩度。バッジ・通販 CTA）
Dark Brown:     #39302d   （商品カテゴリ面）
Button Dark:    #3e3a39   （ソリッドボタン面）
Gray CTA:       #5e5d5c   （弱い導線）
Sub Text:       #727171   （補足文・アウトライン枠）
Muted:          #898989   （英字ラベル専用）
Border:         #c9caca   （区切り罫）
Surface:        #efefef   （SNS 帯などの薄い面）
JP Serif:       "Ryumin Light KL", serif           ← 見出し・情緒（.c-serif）
JP Gothic:      "Koburina Gothic W1 JIS2004", 游ゴシック体, "ヒラギノ角ゴシック Pro", sans-serif
JP Gothic Bold: "Koburina Gothic W3 JIS2004", …    ← .c-gothic-bold（font-weight は 400 のまま）
Body:           14px / weight 400 / lh 1.6 / ls 0.05em
Body (Article): 14px / weight 400 / lh 2.0 / ls 0.05em
Section Title:  リュウミン 33px / lh 1.6 / ls 0.021〜0.085em
Section Label:  こぶりな W1 12px / ls 0.2em / #898989
Section Head:   こぶりな W1 20px / ls 0.2em ＋ 下に 1px solid #c9caca
Letter Spacing: 本文 0.05em → 見出し 0.085〜0.1em → 英字 0.2em（段階的に開く）
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         0（円 50% はページトップボタンのみ）
Shadow:         0 0 50px 5px rgba(0,0,0,.1) / 0 25px 50px 5px rgba(0,0,0,.1)
Container:      1000px（読み物 680px）
```

### プロンプト例

```
福光屋のデザインシステムに従って、日本酒の商品紹介ページを作成してください。
- 和文の見出しは "Ryumin Light KL"（無ければ Shippori Mincho → serif）、
  本文・UI は "Koburina Gothic W1 JIS2004"（無ければ 游ゴシック体 → ヒラギノ角ゴシック Pro → sans-serif）
- 太さは font-weight ではなく W1 → W3 のファミリー名切り替えで作る。font-weight は 400 のまま
- セクション見出しは 2 段組にする：
  上段＝リュウミン 33px / line-height 1.6 / letter-spacing 0.085em
  下段＝こぶりな W1 12px / letter-spacing 0.2em / #898989 の英字
- 「INFORMATION」のような英字単独の見出しは こぶりな W1 20px / letter-spacing 0.2em、
  直下に 1px solid #c9caca の罫を全幅で引く
- 本文は 14px / line-height 1.6 / letter-spacing 0.05em、読み物本文は line-height 2.0
- 地は純白 #ffffff、テキストは焦茶 #211c1c（純黒は使わない）
- 彩度は深紅 #b71a35 のみ。NEWS バッジと通販 CTA に使い、広い面には塗らない
- 一般の遷移ボタンは #3e3a39、弱い導線は #5e5d5c、アウトラインは 1px solid #727171
- border-radius はすべて 0（ページトップの円ボタンのみ 50%）
- 区切りは面ではなく 1px solid #c9caca の細い罫で引く
- 影は 0 0 50px 5px rgba(0,0,0,.1) までの広く薄いぼかしに留める
- コンテナ幅は最大 1000px、読み物カラムは 680px
- font-feature-settings は normal（palt は掛けない）
```
