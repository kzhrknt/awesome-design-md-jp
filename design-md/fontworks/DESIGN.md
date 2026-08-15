# DESIGN.md — フォントワークス（Monotype 株式会社）

> フォントワークス（https://fontworks.co.jp/）のデザイン仕様書。
> 筑紫書体・UD角ゴ・たづがね角ゴシックを擁する日本の書体メーカー。**2026 年に商号を Monotype 株式会社へ変更**し、サイト上部に告知バーが立つ（ドメインとプロダクト名「フォントワークス LETS」は継続）。
> **サイト自体が書体見本である**。ページの地は `#fafafa`、ファーストビューは `#d70c19` と `#b1000f` の紅 2 面で、その上に**自社書体のグリフを 1 文字だけ巨大に置く**。UI の文字は 10〜16px と小さく、**大きい文字は常に「商品としての書体」**に譲る。
> **和文フォントを 5 系統の CSS 変数で持ち、用途で完全に使い分ける**（`--font-family-gothic` / `-old-gothic` / `-ud-gothic` / `-mincho` / `-title-mincho`）。**UI は UD角ゴ_スモール、地の文は筑紫ゴシック、KV のタグは筑紫明朝**。
> **`font-feature-settings: "chws"` が `body` から全要素に継承される**。`palt` ではなく **`chws`（Contextual Half-width Spacing）** を既定に置くのは、書体メーカーならではの選択。
> 実サイトの computed style 実測（2026-08-15 取得。トップ ＋ 書体検索）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **地を `#fafafa` に落とし、紅 `#d70c19` の面と黒 `#1a1a1a` だけで構成する**。装飾はほぼ無く、**面の分割と文字サイズの落差**だけで組み立てる
- **フォントワークスについて**: 筑紫書体（藤田重信）で知られる書体メーカー。年間定額の「LETS」を運営する。サイトの役割は**書体を見せること**で、UI は徹底して脇役に回る
- **密度**: **UI は低密度・書体見本は高密度**。ファーストビューは 1 グリフ ＋ 書体名だけ。一方 `/fontsearch` は 431 書体をグリッドで並べる
- **キーワード**: 紅 `#d70c19`、`#fafafa` の地、UD角ゴ_スモール、筑紫明朝のタグ、`chws`、アウトラインのピル、radius 32px / 100px
- **特徴**:
  - **和文フォントを 5 系統の CSS 変数で持つ**。`gothic` / `old-gothic` / `ud-gothic` / `mincho` / `title-mincho`。**すべて自社書体で、フォールバックが游書体**
  - **ウェイトも変数化されている**（`--font-weight-r: 300` 〜 `--font-weight-e: 700`）。**フォントワークスのウェイト名（R / M / RB / D / B / E）を CSS の数値へ対応させた命名**
  - **`font-feature-settings: "chws"` が `body` から全要素に継承される**。**カードの見出しとニュース見出しだけ `"halt"`、KV のタグだけ `"palt"`** と、3 種の OpenType 機能を意図的に打ち分ける
  - **KV のタグ（`# アニメ` `# 藤田重信`）だけが明朝**。UI がゴシック一色の中で、**タグの列だけ筑紫明朝 ＋ `letter-spacing: 0.05em` ＋ `palt`** で組まれる
  - **CTA はすべて白地のアウトライン**。塗りボタンは**存在しない**（塗りが乗るのはツールチップ・ページネーションの現在地・非活性だけ）
  - **radius は 32px と 100px の 2 値のみ**。小さいピルは 32px、丸い要素は 100px。**中間の角丸（4〜16px）を使わない**
  - **`box-shadow` を使わない**。奥行きは `#fafafa` / `#ffffff` / `#1a1a1a` / 紅の面と 1px の細罫だけ
  - **`letter-spacing` は原則 `normal`**。字間を開けるのは**筑紫明朝のタグ（0.05em）だけ**

---

## 2. Color Palette & Roles

> 実測値。地は `#fafafa`（`pageBackground.resolved` = `rgb(250,250,250)` / 根拠 `body`）。**純白ではない**。
> ファーストビューの支配色は `#d70c19`（912,120 px² / `div.p-topKv`）。

### Brand（ブランド）

- **Crimson** (`#d70c19`, rgb 215,12,25): **主色**。CTA の枠と文字、カード見出し、リンク、ページネーションの現在地。**KV 左面の紅**
- **Deep Crimson** (`#b1000f`, rgb 177,0,15): **第 2 の紅**。**KV 右面と、その上に並ぶタグの面**。`uniqueBackgrounds` で最頻（61 回）。**主色より一段暗く沈めて、明朝のタグを白抜きで置く土台にする**
- **Notice Black** (`#0a1111`, rgb 10,17,17): 商号変更の告知バー。**純黒ではなく、わずかに青緑を含む黒**

### Neutral（ニュートラル）

- **Ink** (`#1a1a1a`, rgb 26,26,26): **既定の文字色**。見出し・本文・ナビ。ツールチップとメニューボタンの面にも使う
- **Background** (`#fafafa`, rgb 250,250,250): **ページ地色**。ヘッダーもこの色で、地と一体化する
- **Surface** (`#ffffff`): **ボタン・入力・フィルタチップの面**。地より明るい白を「押せるもの」に割り当てる
- **Border** (`#dddddd`, rgb 221,221,221): セカンダリボタン・フィルタチップの枠
- **Disabled** (`#c9c9c9`, rgb 201,201,201): 非活性ボタンの面（文字は白）

### Semantic（意味的な色）

意味色は**サイト内に存在しない**。実装で必要になった場合は以下を目安にする。

- **Danger／Error**: **`#d70c19`（既存の Crimson）をそのまま使う**。新しい赤を足さない
- **Warning**: `#b1000f`（Deep Crimson）＋ 白抜き
- **Success**: `#1a1a1a`（Ink）で表す。**緑を持ち込まない**（サイトに有彩色は紅しか無い）
- **非活性**: 面 `#c9c9c9` ／ 文字 `#ffffff`

---

## 3. Typography Rules

> **5 系統の和文フォントを CSS 変数で持ち、用途で使い分ける**ことと、**`chws` を既定に置く**ことがこのサイトの核。

### 3.1 和文フォント

**すべて自社（フォントワークス）の書体**。5 つの変数で管理される。

```css
--font-family-gothic:       "Tsukushi Gothic", "Yu Gothic", "YuGothic", sans-serif;
--font-family-old-gothic:   "Tsukushi Old Gothic", "Yu Gothic", "YuGothic", sans-serif;
--font-family-ud-gothic:    "UD Kakugo Small", "Hiragino Sans", sans-serif;
--font-family-mincho:       "Tsukushi Mincho", "Yu Mincho", "YuMincho", serif;
--font-family-title-mincho: "Telop Mincho", "Yu Mincho", "YuMincho", serif;
```

- **`body` の既定は `--font-family-gothic`（筑紫ゴシック）**。ヘッダー・フッターの器もこれ
- **UI の実体は `--font-family-ud-gothic`（UD角ゴ_スモール）**。ナビ・ボタン・ニュース・カード・フィルタ・ツールチップ**のほぼ全部**がこれで組まれる。**「読ませる小さい文字」に UD 書体を当てる**という判断
- **`--font-family-mincho`（筑紫明朝）は KV のタグ専用**。`# アニメ` `# Fate/Grand Order` `# 藤田重信` の列だけが明朝になる
- **フォールバックが游書体（Yu Gothic / Yu Mincho）**。**Noto を経由しない**。自社書体 → OS 標準書体 → ジェネリックの 3 段
  - **ヒラギノは UD 系にだけ置かれる**（`"UD Kakugo Small", "Hiragino Sans"`）。ゴシック系のフォールバックはヒラギノを飛ばして游ゴシックに落ちる
- **ライセンスはドメイン配信**。ローカルの preview では表示されない（後述）

### 3.2 ウェイト

**フォントワークスのウェイト名を CSS 変数にした命名**を持つ。

```css
--font-weight-r:  300;   /* R  = Regular */
--font-weight-m:  400;   /* M  = Medium */
--font-weight-rb: 450;   /* RB = Regular Bold */
--font-weight-d:  500;   /* D  = Demibold */
--font-weight-b:  600;   /* B  = Bold */
--font-weight-e:  700;   /* E  = Extrabold */
```

- **実際に使われるのは 300 / 400 / 450 / 500 / 600 の 5 段**。700（E）は変数として持つが本文組版には現れない
- **300（R）が「軽い本文・説明文・フィルタのラベル」**、**500（D）が「見出し・ナビ・ボタン」**という二極の使い分け
- **450（RB）は筑紫明朝のタグだけ**。**明朝にだけ中間ウェイトを当てる**
- **和文の見出しを 600 以上に太らせない**。最大でも 600（KV のキャンペーンバナー）

### 3.3 font-family 指定

```css
/* body */
font-family: "Tsukushi Gothic", "Yu Gothic", "YuGothic", sans-serif;
font-size: 16px;
font-weight: 400;
color: #1a1a1a;
background-color: #fafafa;
letter-spacing: normal;              /* 既定は開かない */
font-feature-settings: "chws";       /* ← 全要素に継承される */

/* UI（ナビ・ボタン・カード・ニュース） */
font-family: "UD Kakugo Small", "Hiragino Sans", sans-serif;

/* KV のタグのみ */
font-family: "Tsukushi Mincho", "Yu Mincho", "YuMincho", serif;
font-weight: 450;
letter-spacing: 0.05em;
font-feature-settings: "palt";
```

- **`letter-spacing` の既定は `normal`**。**開くのは明朝のタグだけ**
- **`font-feature-settings` は 3 種を打ち分ける**（3.7 参照）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | Color | 備考 |
|------|------|------|--------|-------------|----------------|-------|------|
| **書体見本（specimen）** | 各書体 | **40px** | 300 | **1.333 (53.33px)** | normal | `#1a1a1a` | 「テロップ明朝」。**サイトで最も大きい文字は常に商品の書体** |
| KV Campaign | 筑紫ゴシック | 24px | **600** | 1.0 | normal | `#ffffff` | バナー見出し。**600 が出る唯一の箇所** |
| **KV Tag** | **筑紫明朝** | **20.57px** | **450** | 1.0 | **1.03px (0.05em)** | `#d70c19` / `#ffffff` | 「# 藤田重信」。**唯一の明朝・唯一の字間** |
| Footer Title | UD角ゴ | 20px | 500 | 1.0 | normal | `#ffffff` | 「Menu」 |
| Card Title (h2) | UD角ゴ | 18px | 500 | **1.667 (30px)** | normal | `#d70c19` | **カード見出しは紅** |
| Footer Nav Title (h3) | UD角ゴ | 18px | 500 | 1.0 | normal | `#ffffff` | 「企業情報」 |
| Button (L) | UD角ゴ | 18px | 400 | 1.0 | normal | `#d70c19` | 大きめの CTA |
| Body / Nav | UD角ゴ | 16px | **300** | 1.0 | normal | `#1a1a1a` | 「書体見本」「あ 明朝系」。**本文系は 300 で軽い** |
| Section Lead | 筑紫ゴシック | 16px | 400 | 1.0 | normal | `#1a1a1a` | セクションの導入文 |
| Card Text | UD角ゴ | 14px | **300** | **1.875 (26.25px)** | normal | `#1a1a1a` | **読ませる文章だけ行間 1.875** |
| Card Title (small) | UD角ゴ | 14px | 500 | **1.875 (26.25px)** | normal | `#d70c19` | `halt` が掛かる |
| Nav Item | UD角ゴ | 14px | 500 | 1.0 | normal | `#1a1a1a` | 「企業情報」 |
| News Item | UD角ゴ | 14px | 300 | 1.0 | normal | `#1a1a1a` | 日付 |
| News Link | UD角ゴ | 14px | 500 | 1.0 | normal | `#1a1a1a` | 見出しリンク。`halt` |
| External Link | UD角ゴ | 14px | 300 | **1.714 (24px)** | normal | `#d70c19` | 「LETSサイト」 |
| Filter Title | UD角ゴ | 14px | 500 | 1.429 (20px) | normal | `#1a1a1a` | 「言語」「カテゴリー」 |
| **Button (S)** | UD角ゴ | **12px** | **400 / 500** | **1.571 (18.86px)** | normal | `#1a1a1a` / `#d70c19` | 「書体見本」「ニュース」 |
| Chip / Toggle | UD角ゴ | 12px | 400 | 1.0 | normal | `#1a1a1a` | 「書体一覧」「あとで見る(0)」 |
| Filter Chip | UD角ゴ | **10px** | **300** | 1.0 | normal | `#1a1a1a` | 「アニメ」「出版・印刷」 |
| Tooltip | UD角ゴ | 10px | 400 | 1.0 | normal | `#ffffff` | 面 `#1a1a1a` |
| Style Label | UD角ゴ | 10px | 500 | 1.0 | normal | `#1a1a1a` | 「太さ」 |

- **UI の文字が 10〜18px に収まる**。**20px を超えるのは書体見本と KV だけ**
- **`line-height` は 1.0 が既定**（要素の高さで間隔を作る）。**読ませるテキストだけ 1.571 / 1.667 / 1.714 / 1.875 に広げる**
- **紅 `#d70c19` は「文字色」としても使う**。カード見出し・外部リンク・小ボタンの文字

### 3.5 行間・字間

- **行間 (line-height)**: **既定は 1.0**。ボックスの `padding` で間隔を作り、行送りでは作らない
  - **読ませるブロックだけ広げる**: カード本文 **1.875**（14px → 26.25px）、外部リンク **1.714**、カード見出し **1.667**、小ボタン **1.571**
  - **1.875 は日本語本文としてかなり広い**。14px の小さい文字を読ませるための処置
- **字間 (letter-spacing)**: **既定 `normal`。全 UI で開かない**
  - **例外は筑紫明朝のタグだけ**: `1.03px`（20.57px に対して **0.05em**）
  - **`chws` が効いているため、約物は自動で詰まる**。その上に `letter-spacing` を足さない

**ガイドライン**:
- **`letter-spacing: normal` を既定にする**。UI の文字は 10〜14px と小さく、字間を開くと語のまとまりが崩れる
- **字間を開けるのは明朝のときだけ**。**ゴシックには絶対に当てない**
- **行間は「1.0 か 1.6〜1.9」の二択**。中間（1.3〜1.5）を持ち込まない
- **`chws` と `letter-spacing` を併用しない**。詰めと開きを同時にやらない

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- **`chws` が約物の詰めを担当する**。`「」（）` の前後にマージンを足さない
- **書体名は絶対に折り返さない**（`テロップ明朝（N仕様）` `UD角ゴ_スモール Pr6 DB` `たづがね角ゴシック StdN Bold`）。**書体名は 1 つの固有名詞**で、`white-space: nowrap` を当てる
- **`Pro` / `ProN` / `Std` / `StdN` / `Pr6` の記号は名前の一部**。数字やアルファベットの途中で折らない
- **KV のタグは 1 タグ 1 行**。`# Fate/Grand Order` のスラッシュで折らない
- ニュース見出し（`フォントワークス LETS ゲーム・アプリ組込・頒布オプションおよび Monotype LETS ゲーム組込・頒布オプション提供開始のご案内`）は**中黒「・」の直後で折る**のが自然。半角スペースの前後で折ってよい
- ボタンのラベル（「書体見本」「ニュース」「あとで見る」）は折り返さない

### 3.7 OpenType 機能

**このサイトは 3 種の機能を意図的に打ち分ける**。書体メーカーのサイトらしい、最も参照価値の高い部分。

```css
/* 既定（body から全要素へ継承） */
font-feature-settings: "chws";

/* カード見出し・ニュース見出し */
font-feature-settings: "halt";

/* KV のタグ（筑紫明朝） */
font-feature-settings: "palt";
```

| 機能 | 意味 | 適用先 | 効き方 |
|------|------|--------|--------|
| **`chws`** | **Contextual Half-width Spacing**（文脈依存の半角化） | **既定・全要素** | **前後の文字を見て約物を詰める**。`。」` のような連続だけを半角化し、単独の `。` は詰めない |
| **`halt`** | Alternate Half Widths（一律半角） | カード見出し・ニュース見出し | **約物を無条件に半角へ**。短い見出しを締める |
| **`palt`** | Proportional Alternate Widths（プロポーショナル） | KV のタグ（明朝）のみ | 字幅を詰めた上で `letter-spacing: 0.05em` で開き直す |

- **既定を `palt` ではなく `chws` にする**のがこのサイトの立場。**`palt` は全文字を詰めるので長文で字間が不揃いになるが、`chws` は文脈を見るので本文向き**
- **見出しには `halt`、タグには `palt`** と、**文字数が少なく詰め切ってよい場所にだけ強い機能を当てる**
- **`chws` は比較的新しい機能で、対応書体が要る**（自社書体だから使える）。**フォールバックの游ゴシックでは効かない**ので、`chws` に依存したレイアウト（幅計算）を組まない
- **`font-feature-settings` を `normal` に戻す要素がある**（`button` / `input` / `select`）。**フォームコントロールでは OpenType 機能を切る**

### 3.8 縦書き

**このサイトは縦組みを使わない**。書体見本も UI もすべて横組み。

- **縦組みが必要になった場合**（書籍向けの書体紹介など）は以下を目安にする:

```css
writing-mode: vertical-rl;
text-orientation: mixed;
font-family: "Tsukushi Mincho", "Yu Mincho", "YuMincho", serif;  /* 縦組みは明朝 */
font-size: 18px;
line-height: 2.0;                  /* 縦組みは列間として広く取る */
letter-spacing: 0.05em;            /* 明朝のときだけ開く */
font-feature-settings: "vpal";     /* 縦組みでは chws / palt ではなく vpal */
```

- **縦組みにするなら書体は明朝に切り替える**。UD角ゴを縦に倒さない
- **`chws` は横組み用**。縦組みでは **`vpal`** を使う
- 縦中横は 2 桁まで（`text-combine-upright: all`）

---

## 4. Component Stylings

### Buttons

**このサイトに塗りボタンは存在しない**。CTA はすべて**白地 ＋ 1px の枠**。

**Primary Outline（小）— 主要な遷移**

- Background: **`#ffffff`**
- Text: **`#d70c19`**
- Border: **`1px solid #d70c19`**
- Padding: **`6px 13px`**
- Border Radius: **`32px`**
- Font: UD角ゴ / **12px / weight 500 / lh 1.571 (18.86px) / ls normal**
- 例: 「ニュース ›」（お知らせバー内）
- **文字と枠を同じ紅にし、面は白のまま**

**Secondary Outline（小）— 副次的な遷移**

- Background: **`#ffffff`**
- Text: **`#1a1a1a`**
- Border: **`1px solid #dddddd`**
- Padding: **`6px 13px`**
- Border Radius: **`32px`**
- Font: UD角ゴ / **12px / weight 400 / lh 1.571 / ls normal**
- 例: 「書体見本 ›」「お問い合わせ ▾」（ヘッダー右）
- **枠の色だけで主従を分ける**。形・padding・radius はプライマリと完全に同一

**Primary Outline（大）**

- Background: `#ffffff` ／ Text: `#d70c19` ／ Border: **`1px solid #d70c19`**
- Border Radius: **`32px`** ／ Font: **18px / weight 400**
- 例: 各プラン・資料請求への導線

**Filter Chip（絞り込み）**

- Background: **`#ffffff`**
- Text: `#1a1a1a`
- Border: **`1px solid #dddddd`**
- Padding: **`7px 10px`**（アイコン付きは `0 16px`）
- Border Radius: **`100px`** — **ボタンの 32px と違い、チップは完全な円弧**
- Font: UD角ゴ / **10px / weight 300**
- 例: 「アニメ」「ゲーム」「出版・印刷」「オリジナルフォント制作」

**KV Tag（明朝のタグ）**

- Background: **`#b1000f`**（KV 右面と同色 ＝ 面に溶ける）
- Text: `#ffffff`（現在地は `#d70c19` 文字 ＋ 白面）
- Border: **`1px solid rgba(255, 255, 255, 0.3)`** — **半透明の白枠**
- Padding: **`3px 13px`**
- Border Radius: **`32px`**
- Font: **筑紫明朝 / 16〜20.57px / weight 300〜450 / `letter-spacing: 0.05em` / `palt`**
- 例: 「# アニメ」「# 藤田重信」「# たづがね角ゴシック ↗」
- **サイトで唯一の明朝、唯一の字間、唯一の半透明ボーダー**

**Tooltip**

- Background: **`#1a1a1a`** ／ Text: `#ffffff`
- Padding: `0 10px` ／ Border Radius: **`100px`**
- Font: UD角ゴ / **10px / weight 400**
- 例: 「グリッドビュー」「リストビュー」「フォントサイズ」

**Pagination（現在地）**

- Background: **`#d70c19`** ／ Text: `#ffffff`
- Border Radius: **`100px`** ／ Font: 12px / weight 500
- 現在地以外は**透明 ＋ `1px solid #dddddd` ＋ 文字 `#d70c19`**

**Disabled**

- Background: **`#c9c9c9`** ／ Text: `#ffffff`
- Border Radius: **`100px`** ／ Font: 14px / weight 500 / lh 1.4

### Cards（書体・記事）

- Background: `#ffffff`
- Border: なし（**区切りは 1px `#dddddd` の罫**）
- Border Radius: **`0px`** — **ボタンはピル、カードは角丸ゼロ**
- Shadow: **なし**
- 構成: サムネイル → 見出し（14〜18px / **500** / **紅 `#d70c19`** / `halt`）→ 本文（14px / **300** / lh **1.875**）
- **カードの見出しだけ紅にする**。本文は `#1a1a1a` のまま

### Notice Bar（商号変更の告知）

- Background: **`#0a1111`**
- Text: `#ffffff`（**下線付きリンク**）
- Font: 筑紫ゴシック / 16px / weight 400
- Border Radius: `0px` ／ 全幅
- **ページ最上部に置く**。KV の紅の直上に黒帯を敷いて、告知を切り分ける

### Specimen Block（書体見本）

- Background: `#fafafa`（地のまま）
- 書体名: UD角ゴ / **14px / weight 500**
- 見本の文字: **その書体自身 / 40px / weight 300 / lh 1.333**
- **見本の文字には自社書体のフルネームを直接指定する**（`"FOT-テロップ明朝 Pro D"` `UDKakugo_SmallPr6-DB` `TazuganeGothicStdN-Bold`）。変数を経由しない
- **`Pro` と `ProN` を並べて見せる**（`テロップ明朝` と `テロップ明朝（N仕様）`）。**字形の違いを見せるのが目的なので、両方を等価に並べる**

### Inputs

- Background: **`#ffffff`**
- Border: **`1px solid #dddddd`**
- Border Radius: **`32px`**（検索）／ 入力欄は `0px` も併用
- Padding: `6px 13px` 目安 ／ Font: UD角ゴ / **12px / weight 300 / lh 32px**
- Text Color: `#1a1a1a` ／ Placeholder: `#c9c9c9`
- **`font-feature-settings: normal`** — **フォームコントロールでは OpenType 機能を切る**
- Focus: **`1px solid #d70c19`**（枠を紅に変える。影は付けない）
- `select` は UA 既定（`sans-serif` / `1px solid #767676`）のまま置かれている箇所がある。**自社実装では `--font-family-ud-gothic` を明示する**

---

## 5. Layout Principles

### Spacing Scale

**4px 基準**のスケール。ボタンの `padding` が `6px 13px` / `3px 13px` / `7px 10px` と**奇数を含む**のは、**1px の枠を含めた実寸を揃えるため**。

| Token | Value |
|-------|-------|
| XXS | 3px |
| XS | 6px |
| S | 10px / 13px |
| M | 16px |
| L | 32px |
| XL | 40px |
| XXL | 60px |

### Container

- ヘッダー Padding: **`0 40px 0 60px`** — **左右非対称**。左（ロゴ側）を 60px、右（CTA 側）を 40px
- Max Width: 1440px 目安（KV は全幅ブリード）
- **KV は縦 2 分割**。左 `#d70c19` にグリフ、右 `#b1000f` にタグの列
- ヘッダーは `#fafafa`（地と同色）で、**境界を持たない**

### Grid

- 書体一覧: **グリッドビュー / リストビューを切り替えられる**（トグルは 12px のチップ）
- カード: 3〜4 カラム / Gutter 32px 目安
- **フィルタは左カラムに縦積み**（「言語」「カテゴリー」…）。チップは折り返して並ぶ
- ページネーションは**丸（radius 100px）を横並び**

---

## 6. Depth & Elevation

**実測の `box-shadow` は 0 段**。サイト内に影が 1 つも存在しない。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | **`none`** | **全要素**。ボタン・カード・ヘッダー・ツールチップのすべて |

- **奥行きは面色の 4 段で表す**:

| 面 | 色 | 用途 |
|----|-----|------|
| 地 | `#fafafa` | ページ全体・ヘッダー |
| 押せるもの | `#ffffff` | ボタン・入力・フィルタチップ |
| 反転 | `#1a1a1a` | ツールチップ・メニューボタン・フッター |
| 紅 | `#d70c19` / `#b1000f` | KV・現在地・強調 |

- **線は 1px のみ**。`1px solid #dddddd`（枠・区切り）、`1px solid #d70c19`（プライマリ）、`1px solid rgba(255,255,255,0.3)`（KV タグ）の 3 種類
- **地が `#fafafa` で、面が `#ffffff`**。**この 5 の差だけで「押せるもの」を浮かせている**。影を足さない

---

## 7. Do's and Don'ts

### Do（推奨）

- **和文フォントを用途別の CSS 変数で持つ**（`gothic` / `ud-gothic` / `mincho` の 3 系統は最低限）
- **UI の文字（10〜16px）には UD 書体を当てる**。小さい文字ほど UD の効きが大きい
- **ウェイトを変数化し、書体側のウェイト名（R / M / RB / D / B / E）と対応づける**
- **`font-feature-settings: "chws"` を `body` に置いて全継承させる**。長文では `palt` より `chws`
- **見出しには `halt`、明朝のタグには `palt`** と、短い文字列にだけ強い詰めを当てる
- **`letter-spacing` は `normal` を既定にする**。開くのは明朝のときだけ（0.05em）
- **`line-height` は 1.0 を既定にし、読ませるブロックだけ 1.6〜1.9 に広げる**
- **CTA は白地 ＋ 1px の枠**にする。枠の色（`#d70c19` / `#dddddd`）だけで主従を分ける
- **radius は 32px（ボタン）と 100px（チップ・丸）の 2 値に絞る**
- **カードは角丸ゼロ**にして、ピルとの対比を保つ
- **`box-shadow` を使わない**。地 `#fafafa` と面 `#ffffff` の差で浮かせる
- **地は `#fafafa`**。純白にしない
- **書体名は `white-space: nowrap`** で折り返さない
- **フォームコントロールでは `font-feature-settings: normal`** に戻す
- **大きい文字は書体見本に譲る**。UI の見出しを 20px 以上にしない

### Don't（禁止）

- **`palt` を既定に置かない**。本文には `chws` を使う（`palt` は全文字を詰めるため長文で不揃いになる）
- **`chws` に幅計算を依存させない**（フォールバックの游書体では効かない）
- **ゴシックに `letter-spacing` を当てない**。字間を開くのは明朝だけ
- **塗りボタンを作らない**。塗りが乗るのはツールチップ・現在地・非活性だけ
- **radius に 4px / 8px / 16px を持ち込まない**（32px か 100px の 2 値）
- **カードを角丸にしない**
- **影を付けない**。`0 2px 8px` のような一般的なカードシャドウを持ち込まない
- **有彩色を増やさない**。紅 2 段（`#d70c19` / `#b1000f`）以外の色相を足さない
- **地を `#ffffff` にしない**（`#fafafa` と面の白の差が消え、ボタンが沈む）
- **書体名を折り返さない**。`Pro` / `ProN` / `Std` / `Pr6` を名前から切り離さない
- **明朝を UI に持ち込まない**（明朝は KV のタグ専用）
- **`line-height` に 1.3〜1.5 の中間値を使わない**
- **見出しを 700 で組まない**（変数として持つが、組版には出さない）
- **KV タグの半透明ボーダー `rgba(255,255,255,0.3)` を不透明にしない**（面に溶ける設計が崩れる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | **KV の 2 分割を縦積みに**（グリフ → タグの列）。ナビはハンバーガー（`#1a1a1a` の丸） |
| Tablet | 768–1024px | 書体一覧は 2 カラム。フィルタはドロワーに格納 |
| Desktop | > 1024px | KV は左右 2 分割。フィルタは左カラム常設 |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）
- **Button (S) は `padding 6px 13px` ＋ 12px / lh 1.571 で高さ 32.9px**。**モバイルでは `padding 12px 20px` に広げて 44px を確保する**
- **Filter Chip は `padding 7px 10px` ＋ 10px で高さ 24px**。**モバイルでは 10px フォント・`padding 12px 14px` にして 40px 以上へ**
- **KV Tag は `padding 3px 13px` で高さ 26px**。**タグの列は行間（`row-gap`）を 12px 以上取って、隣接タップを防ぐ**
- **ツールチップはタップ対象にしない**（hover 専用）。モバイルではラベルを常時表示に切り替える
- ハンバーガー（`#1a1a1a` の丸 / radius 100px）は 44px × 44px 以上

### フォントサイズの調整

- **UI の 10px はモバイルでも 10px のまま据え置かない**。**12px へ引き上げる**（UD 書体でも 10px は小さい）
- Body / Nav 16px は据え置く
- **書体見本 40px → 32px**。**書体見本だけは縮めすぎない**（字形が読めなくなる）
- KV Tag 20.57px → 16px。**`letter-spacing: 0.05em` と `palt` は維持する**
- Card Title 18px → 16px。**紅 `#d70c19` と `halt` は維持する**
- **カード本文の `line-height: 1.875` はモバイルでも維持する**（14px の可読性を支えている）
- **`chws` の全体継承はモバイルでも維持する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #fafafa   （ページ地色。純白ではない）
Surface:         #ffffff   （ボタン・入力・チップの面。「押せるもの」の白）
Crimson:         #d70c19   （主色。CTA の枠と文字・カード見出し・現在地）
Deep Crimson:    #b1000f   （KV 右面 ＋ その上のタグの面）
Notice Black:    #0a1111   （商号変更の告知バー）
Ink:             #1a1a1a   （既定の文字色・ツールチップ／メニューの面）
Border:          #dddddd   （セカンダリの枠・区切り罫）
Disabled:        #c9c9c9   （非活性の面。文字は白）
Font (既定):      "Tsukushi Gothic", "Yu Gothic", "YuGothic", sans-serif
Font (UI):       "UD Kakugo Small", "Hiragino Sans", sans-serif   ← UI はほぼ全部これ
Font (KV タグ):   "Tsukushi Mincho", "Yu Mincho", "YuMincho", serif ← 唯一の明朝
Weight:          300(R) / 400(M) / 450(RB) / 500(D) / 600(B)。変数名は書体のウェイト名に対応
                 本文・説明は 300、見出し・ナビ・ボタンは 500 の二極
Body:            16px / weight 300〜400 / lh 1.0 / ls normal / #1a1a1a
Line Height:     1.0（既定）/ 1.571（小ボタン）/ 1.667（カード見出し）/ 1.875（カード本文）
Letter Spacing:  normal（既定・全 UI）。例外は明朝タグの 0.05em だけ
Feature:         font-feature-settings: "chws" を body に置いて全継承
                 見出し＝"halt" / KV タグ＝"palt" / フォーム＝normal
Radius:          ボタン 32px / チップ・丸 100px / カード 0px（この 3 値だけ）
Shadow:          全要素 none（影は存在しない）
Border:          1px solid #dddddd（枠・区切り）/ 1px solid #d70c19（プライマリ）/
                 1px solid rgba(255,255,255,0.3)（KV タグ）
CTA:             塗りボタンは無い。すべて白地 ＋ 1px 枠のアウトライン
Header:          padding 0 40px 0 60px（左右非対称）/ 背景は地と同じ #fafafa
```

### プロンプト例

```
フォントワークス（Monotype 株式会社）のデザインシステムに従って、書体の一覧・詳細ページを作成してください。
- 和文フォントを用途別の CSS 変数で 3 系統持つ：
  --font-family-gothic: "Tsukushi Gothic", "Yu Gothic", "YuGothic", sans-serif（body の既定）
  --font-family-ud-gothic: "UD Kakugo Small", "Hiragino Sans", sans-serif（UI のほぼ全部）
  --font-family-mincho: "Tsukushi Mincho", "Yu Mincho", "YuMincho", serif（KV のタグだけ）
  フォールバックは游書体。Noto を経由しない
- ウェイトも変数化する：--font-weight-r:300 / -m:400 / -rb:450 / -d:500 / -b:600。
  本文・説明文は 300、見出し・ナビ・ボタンは 500 の二極で使う。700 は使わない
- body に font-feature-settings: "chws" を置いて全要素に継承させる。
  カード見出し・ニュース見出しだけ "halt"、KV のタグ（明朝）だけ "palt"、
  button/input/select は normal に戻す
- letter-spacing は normal を既定にする。開くのは明朝のタグだけ（0.05em）
- line-height は 1.0 を既定にし、読ませるブロックだけ広げる：
  カード本文 1.875（14px→26.25px）/ カード見出し 1.667 / 小ボタン 1.571
- 地は #fafafa、押せるものの面は #ffffff。この差だけで浮かせ、box-shadow は一切使わない
- CTA はすべて白地のアウトライン。塗りボタンは作らない：
  プライマリ＝白地 ＋ 1px solid #d70c19 ＋ 文字 #d70c19 / radius 32px / padding 6px 13px / 12px weight 500
  セカンダリ＝白地 ＋ 1px solid #dddddd ＋ 文字 #1a1a1a / 同じ形・同じ padding
  絞り込みチップ＝白地 ＋ 1px solid #dddddd / radius 100px / padding 7px 10px / 10px weight 300
- KV は縦 2 分割にする：左 #d70c19 に書体のグリフを 1 文字だけ巨大に置き、
  右 #b1000f にタグの列を置く。タグは面 #b1000f ＋ 1px solid rgba(255,255,255,0.3) ＋
  radius 32px ＋ 筑紫明朝 ＋ letter-spacing 0.05em ＋ palt
- カードは border-radius: 0px。見出しだけ紅 #d70c19、本文は #1a1a1a
- radius は 32px（ボタン）と 100px（チップ・丸）と 0px（カード）の 3 値だけ。
  4px / 8px / 16px を使わない
- 有彩色は紅 2 段（#d70c19 / #b1000f）だけ。他の色相を足さない
- 書体見本の文字だけを 40px / weight 300 / line-height 1.333 で大きく置く。
  UI の見出しは 20px を超えさせない（大きい文字は常に商品の書体に譲る）
- 書体名（テロップ明朝 Pro D / UD角ゴ_スモール Pr6 DB 等）は white-space: nowrap で折り返さない。
  Pro と ProN は両方を等価に並べて字形の違いを見せる
- ヘッダーの padding は 0 40px 0 60px（左右非対称）、背景は地と同じ #fafafa で境界を持たせない
```
