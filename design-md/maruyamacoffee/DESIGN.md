# DESIGN.md — 丸山珈琲（MARUYAMA COFFEE）

> 株式会社丸山珈琲（https://www.maruyamacoffee.com/）のデザイン仕様書。
> 1991 年、長野県軽井沢に創業したスペシャルティコーヒーの焙煎・小売企業。バイヤーが産地に足を運ぶ「ダイレクトトレード」と、カップ・オブ・エクセレンス国際審査員を務める丸山健太郎氏で知られる。
> 最大の特徴は、**ブランド色を純黒ではなく `#231815` に置く**こと。これは日本の DTP でスミベタに使われる標準値そのもので、**印刷物のインクの黒をそのまま Web に持ち込んでいる**。
> 組版は **`line-height: 2.0` を本文の基準にし、リード文だけ 2.5 まで開く**。字間は `letter-spacing` ではなく **`palt`（プロポーショナルメトリクス）で詰める**方向に振っている。
> CTA は **`border-radius: 16000px` の完全なピル**に **3px の太い枠**を重ねた、輪郭の強い形。
> なお**コーポレートサイトとオンラインストアで組版系が完全に分かれている**（前者は Noto Sans JP ＋ `palt`、後者はヒラギノ ProN ＋ `palt` なし）。本書は**コーポレートサイト側を正**とし、相違点を明記する。
> 実サイトの computed style 実測（2026-08-11 取得。トップ＋オンラインストア）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地に大きな写真、テキストは細く広く**。焙煎・産地・店舗の写真が主役で、文字は `line-height: 2.0` の余裕で受ける。彩度をほぼ持たず、**インクの黒 `#231815` とクリーム `#fcf6e9` の 2 色**で成立させる
- **丸山珈琲について**: 軽井沢発のスペシャルティコーヒー。「一杯のコーヒーから始まる美味しさの世界」がタグライン。**産地・生産者・カッピングという専門性を、装飾せずに写真と余白で伝える**構え
- **密度**: 低密度。トップは全画面 KV → PICK UP → 商品 → 取り組み の縦積みで、1 画面あたりの情報量を意図的に絞る
- **キーワード**: 白地、Noto Sans JP、`palt` オン、インクの黒 `#231815`、クリーム `#fcf6e9`、行間 2.0、3px 枠の完全ピル、影なし
- **特徴**:
  - **ブランド色が `#231815`**。純黒 `#000000` ではなく、**日本の印刷で「スミ」に使われる標準値**。焙煎豆の色でもあり、印刷物との連続性を作る
  - **`font-feature-settings: "palt"` を全体に掛ける**。字間は `letter-spacing` を開くのではなく、**プロポーショナルメトリクスで詰める**方向
  - **`line-height: 2.0` が本文の基準**（14px → 28px）。リード文だけ **2.5**（20px → 50px）まで開く
  - **CTA は `border-radius: 16000px` の完全ピル ＋ `3px solid #231815`**。塗りと枠が同色で、**輪郭の太さだけで存在感を作る**
  - **欧文は Roboto**。"pick up" "Our challenge" などのラベルに使い、**`letter-spacing` を 0.1〜0.12em まで開く**。和文は詰め、欧文は開く
  - **`box-shadow` は 1 つも使わない**（実測 0 件）
  - **オンラインストアは別系統**。ヒラギノ ProN ベースで `palt` なし、`line-height` は 1.0〜1.4 と詰まる。**焙煎度バッジ `#4e4e4e`（radius 4px）とフレーバータグのクリーム面 `#fcf6e9`** はストア側にのみ現れる

---

## 2. Color Palette & Roles

> 実測値。地は純白 `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `html`）、テキストはインクの黒 `#231815`。**有彩色をほぼ持たない**。

### Brand（ブランド）

- **Ink Black** (`#231815`, rgb 35,24,21): **ブランドの中核にして唯一の主色**。テキスト・CTA 面・CTA 枠・言語トグル・PICK UP 帯のすべて。**日本の DTP でスミベタに使われる標準値**そのもので、わずかに赤みを含んだ焙煎豆の黒
- **Cream** (`#fcf6e9`, rgb 252,246,233): フレーバータグの面（「卓越した味わい」「花のような香り」「柑橘系のフルーツの爽やかさ」）。**カフェオレの色**にあたる唯一の暖色面

### Neutral（面・罫・文字）

- **Background** (`#ffffff`): ページ地色。純白
- **Surface Warm** (`#f7f6f4`, rgb 247,246,244): 「丸山珈琲オンラインストア」「丸山珈琲通信」などの導線ブロックの面。**わずかに暖かい白**
- **Roast Badge** (`#4e4e4e`, rgb 78,78,78): 焙煎度バッジ（「中煎り」「深煎り」「中深煎り」）の面。**ストア側にのみ現れる**
- **Gray** (`#808080`, rgb 128,128,128): 補足・非活性
- **Surface Gray** (`#eeeeee`, rgb 238,238,238): お知らせ一覧の行の面
- **Surface Gray 2** (`#f1f1f1`, rgb 241,241,241): カテゴリ一覧セクションの面
- **Dark Panel** (`#262626`, rgb 38,38,38): 「ABOUT 丸山珈琲の想い」の暗いパネル
- **Scrim** (`rgba(255,255,255,0.95)`): ヘッダーのスクロール時オーバーレイ
- **Outline on Dark** (`rgba(255,255,255,0.8)`): 暗い面上のアウトラインボタンの枠

### Semantic（意味的な色）

コーヒーの EC サイトのため意味色は前面に希薄。**必要なら以下を目安にする**。

- **Danger／Error**: `#231815` をそのまま使わず、低彩度の赤（`#a83b32` 目安）。彩度を上げると焙煎のトーンが崩れる
- **Warning**: 低彩度の琥珀（`#a8792e` 目安）
- **Success**: 低彩度の緑（`#4a6b4f` 目安）
- **在庫切れ・非活性**: `#808080`

---

## 3. Typography Rules

> **`palt` で詰め、`line-height` で開く**。字間は `letter-spacing` をほぼ使わず（`normal`）、プロポーショナルメトリクスに任せる。代わりに行間を **2.0**（リード文は **2.5**）まで開いて余裕を作る。欧文（Roboto）だけは `letter-spacing` を 0.1em 以上に開く。

### 3.1 和文フォント

- **本文・見出し・UI すべて**: **Noto Sans JP**。ウェイトは **400 / 500 / 600 / 700** の 4 段
- **フォールバック**: `"Helvetica Neue"` → `Arial` → `"Hiragino Kaku Gothic ProN"` → `"Hiragino Sans"` → `Meiryo` → `sans-serif`
- **欧文優先のフォールバック順**。Noto Sans JP の次が Helvetica Neue / Arial で、和文フォントより先に欧文が来る。**欧文が欧文らしく出ることを優先**した順序
- **ヒラギノは ProN**（Pro ではない）。JIS2004 字形側
- **游ゴシックを経由しない**。macOS は Hiragino Sans、Windows は Meiryo で受ける
- **オンラインストア側は別スタック**: `helvetica, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif`。**Noto Sans JP を読み込まず、Helvetica が先頭**。レガシー EC 基盤のため組版系が分かれている

### 3.2 欧文フォント

- **Roboto** を欧文ラベル専用に使う。"pick up" "Our challenge" "JP" "EN" など
- **`letter-spacing` を 0.1〜0.12em まで開く**（11px → 1.1px / 14px → 1.68px）。**和文は `palt` で詰め、欧文は開く**という非対称な設計
- ウェイトは **600 / 700**。欧文ラベルは常に太い
- 等幅フォントは使わない
- **preview.html での注記**: Noto Sans JP・Roboto はいずれも **Google Fonts で提供されている**ため、**プレビューでも実サイトと同じ書体で表示できる**。代替は不要

### 3.3 font-family 指定

```css
/* コーポレートサイト（正） */
font-family: "Noto Sans JP", "Helvetica Neue", Arial,
             "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;

/* 欧文ラベル */
font-family: Roboto, sans-serif;

/* オンラインストア（レガシー系。新規実装では使わない） */
font-family: helvetica, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, sans-serif;

/* body の既定 */
font-size: 14px;
font-weight: 400;
line-height: 2.0;                 /* 28px */
letter-spacing: normal;           /* 字間は palt に任せる */
color: #231815;
font-feature-settings: "palt";    /* 全体に掛ける */
```

**フォールバックの考え方**:
- **和文 Web フォント（Noto Sans JP）を先頭**に置く
- 2 番目・3 番目が **Helvetica Neue / Arial** という欧文優先。和欧混植で欧文が Noto Sans JP の欧文グリフに落ちるのを避ける
- 和文の受け皿は **ヒラギノ ProN → Hiragino Sans → Meiryo**。**游ゴシックを使わない**
- **`palt` を必ず併記する**。これが無いと字面が間延びして印象が変わる

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Title | Noto Sans JP | 40px | 400 | **1.5 (60px)** | normal | 「私たちの取り組み」。**大きくても weight 400** |
| Sub Section | Noto Sans JP | 24px | 400 | 1.5 (36px) | normal | 「丸山珈琲のスペシャルブランド」 |
| Lead / Tagline | Noto Sans JP | 20px | 400 | **2.5 (50px)** | 0.05em (1px) | 「丸山珈琲は美味しさで癒しと幸せを創る会社です」 |
| Heading 3 (EN) | Noto Sans JP | 20px | 400 | 1.4 (28px) | normal | "ABOUT US" |
| Nav Label | Noto Sans JP | 15px | **500** | 2.0 (30px) | normal | グローバルナビ |
| Product Title | Noto Sans JP | 15px | **500** | 2.0 (30px) | normal | 「丸山珈琲のブレンド 深煎り」 |
| Card Title | Noto Sans JP | 15px | 500 | 1.4 (21px) | normal | ニュースカードの見出し |
| Body | Noto Sans JP | 14px | 400 | **2.0 (28px)** | normal | `body` の基準 |
| News Title | Noto Sans JP | 14px | **500** | 2.0 (28px) | normal | 「【新商品】…」 |
| Label (EN) | **Roboto** | 14px | **600** | 2.0 (28px) | **0.12em (1.68px)** | "Our challenge" |
| Utility Link | Noto Sans JP | 13px | **700** | 1.67 (21.7px) | normal | 「採用情報」「お問い合わせ」 |
| Footer Link | Noto Sans JP | 13px | 500 | 2.0 (26px) | **-0.025em (-0.325px)** | フッターのサイトマップ。**唯一の負の字間** |
| Lang Toggle | **Roboto** | 13px | **700** | 1.0〜2.0 | normal | "JP" / "EN" |
| Meta | Noto Sans JP | 12px | 400 | 2.0 (24px) | normal | 「プレスリリース」 |
| Header Utility | Noto Sans JP | 11px | **600** | 1.3 (14.3px) | normal | 「オンラインストア」 |
| Badge (EN) | **Roboto** | 11px | **700** | 2.0 (22px) | **0.1em (1.1px)** | "pick up"（白文字・`#231815` 面） |
| Caption | Noto Sans JP | 10px | **600** | 1.3 (13px) | normal | 「メニュー」 |

- **`letter-spacing` は原則 `normal`**。字間の調整は `palt` に任せる
- **例外は 3 つ**: リード文（0.05em）、Roboto の欧文ラベル（0.1〜0.12em）、フッターリンク（**-0.025em**）
- **`line-height: 2.0` が基準**。見出しだけ 1.4〜1.5 に締め、リード文だけ 2.5 に開く
- **大見出しほど weight が軽い**。40px の Section Title が weight 400 で、13px のユーティリティリンクが weight 700。**サイズと太さを反比例させる**のがこのサイトの階層設計

### 3.5 行間・字間

- **本文の行間 (line-height)**: **2.0**（14px → 28px）。日本語 Web としても広い部類で、白地の余白と合わせて「間」を作る
- **リード文の行間**: **2.5**（20px → 50px）。**サイトで最も開く行間**。タグラインを 1 行ずつ独立させる意図
- **見出しの行間**: **1.4〜1.5**。サイズが上がるほど締める
- **字間 (letter-spacing)**: 和文は **`normal`**。**`palt` に任せる**
  - リード文のみ: **0.05em**
  - Roboto の欧文ラベル: **0.1〜0.12em**
  - フッターリンクのみ: **-0.025em**（詰める）
- **`palt` を全体に掛ける**（`font-feature-settings: "palt"`）

**ガイドライン**:
- **字間は `letter-spacing` で作らず `palt` で作る**。福光屋のように開いていく設計ではなく、**詰めて字面を揃える**方向
- **行間で階層を作る**。見出し 1.4〜1.5 → 本文 2.0 → リード 2.5
- **サイズと太さを反比例させる**。大きい見出しは weight 400、小さいラベルは weight 600〜700
- 欧文（Roboto）だけは必ず 0.1em 以上に開く。和文と同じ字間で欧文を組まない
- 本文の行間 2.0 を下回らない

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 商品名の「丸山珈琲のブレンド 深煎り」「アグロタケシ ゲイシャ 80g」は**全角スペースと半角の単位を含む**。数量・単位（`80g` `1,302円`）の途中で改行させない
- 産地名（「コスタリカ」「エチオピア」）と農園名の間で改行してよいが、農園名の内部では折らない
- 【新商品】【8/1】などの隅付き括弧は前後で改行させない

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* 全体に掛ける */
```

- **`palt` を全体に掛ける**。Noto Sans JP の等幅の字面を詰め、和欧混植のアキを均す
- **`letter-spacing` を開く方向には動かさない**。`palt` で詰めた字面をそのまま使うのがこのサイトの手触り
- 欧文（Roboto）側は `palt` の対象外なので、**`letter-spacing` で明示的に開く**
- **オンラインストア側は `palt` を掛けていない**（`font-feature-settings: normal`）。新規実装ではコーポレート側に揃える

### 3.8 縦書き

- 現行サイトは全面横組み（`writing-mode: horizontal-tb`）
- 商品ラベルや産地紹介で縦組みを見せる場合は以下

```css
writing-mode: vertical-rl;
text-orientation: mixed;
font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif;
font-feature-settings: "palt";
line-height: 2.0;   /* 縦組みでも行間（＝行送りの左右幅）は 2.0 を保つ */
```

- 縦組みでも**ゴシックのまま**。明朝に切り替えない

---

## 4. Component Stylings

### Buttons

**Primary（インクの黒・完全ピル）** — 主要導線

- Background: `#231815`
- Text: `#ffffff`
- Border: **`3px solid #231815`**（面色と同色の太い枠）
- Padding: `0 8px`（高さはブロックで与える。実測の押しボタンは幅 320px / 高さ 56px 前後）
- Border Radius: **`16000px`**（完全なピル。実質 `9999px`）
- Font: Noto Sans JP / 14〜15px / weight 500
- 例: 「オンラインストアをみる」「お知らせ一覧をみる」
- **枠と面が同色**なので、hover で面を白に抜くと枠だけが残る反転が作れる

**Outline on Dark（暗い面上のアウトライン）**

- Background: `transparent`
- Text: `#ffffff`
- Border: **`1px solid rgba(255,255,255,0.8)`**
- Border Radius: **`0px`** — **暗い面上では矩形に切り替わる**
- Font: Noto Sans JP / 14px / weight 400
- 例: 「お問い合わせ」「メールマガジンのご登録」「FAX ご注文用紙・豆価格表（PDF）」「アレルギー表示」

**Language Toggle（ピル・トグル）**

- Track Background: `#231815`
- Track Border Radius: **`1000px`**
- Active Thumb: `#ffffff` の面 / radius `1000px` / padding `0 0 0 12px`
- Text: Roboto / 13px / weight 700。選択中 `#231815`（白面上）/ 非選択 `#ffffff`（黒面上）
- 例: 「JP / EN」

**Header Store Button（黒の矩形ブロック）**

- Background: `#231815`（実測 `#000000` に近い黒面）
- Text: `#ffffff`
- Border Radius: **`0px`**
- Font: Noto Sans JP / 11px / weight 600 / lh 1.3
- ヘッダー右端に**高さいっぱいの矩形ブロック**として接地する。カートアイコン＋2 行のラベル
- 例: 「オンラインストア」

### Badges

**Roast Level（焙煎度バッジ・角丸 4px）** — オンラインストア

- Background: `#4e4e4e`
- Text: `#ffffff`
- Padding: `2px 6px 1px`（**下だけ 1px 詰める**）
- Border Radius: **`4px`**
- Font: 13px / weight 400
- 例: 「中煎り」「深煎り」「中深煎り」

**Flavor Tag（クリーム面・矩形）** — オンラインストア

- Background: `#fcf6e9`
- Text: `#231815`
- Border Radius: **`0px`**
- Font: 13px / weight 400
- 例: 「卓越した味わい」「花のような香り」「柑橘系のフルーツの爽やかさ」

**Pick Up（黒面・矩形）**

- Background: `#231815`
- Text: `#ffffff`
- Border Radius: **`0px`**
- Font: **Roboto** / 11px / weight 700 / **ls 0.1em**
- 例: "pick up"（KV 右下のプレスリリース枠）

### Inputs

- Background: `#ffffff`
- Border: `1px solid #dddddd`
- Border (focus): `1px solid #231815`
- Border Radius: **`4px`**（バッジと同じ角丸に揃える）
- Padding: `12px 14px`
- Font: Noto Sans JP / 14px / weight 400 / lh 2.0
- Text Color: `#231815` / Placeholder: `#808080`
- **`palt` を掛ける**（入力中も字面を揃える）

### Cards

- Background: `#ffffff`（導線ブロックは `#f7f6f4`）
- Border: なし。**影も罫もない**
- Border Radius: **`0px`**（画像も角丸にしない）
- Padding: `0`（画像の下にテキストを直接置く）
- 構成: **画像 → カテゴリ（12px `#808080`）→ タイトル（15px / weight 500 / lh 1.4）→ 日付**
- 商品カードは **画像 → 焙煎度バッジ（`#4e4e4e` / radius 4px）→ 商品名 → フレーバータグ（クリーム面）→ 価格**

### Section Heading

- **和文単独**: Noto Sans JP / 40px / **weight 400** / lh 1.5 / `#231815`
- **英字ラベルを添える場合**: Roboto / 14px / weight 600 / **ls 0.12em** / `#231815` を和文の上または下に置く
- 例: 「私たちの取り組み」＋ "Our challenge"
- **大きい和文を細く、小さい英字を太く**組むのがこのサイトの見出しの型

### Dark Panel

- Background: `#262626`
- Text: `#ffffff`
- Border Radius: **`0px`**
- 内部のボタンは **Outline on Dark**（`1px solid rgba(255,255,255,0.8)` / radius 0）
- 例: 「ABOUT 丸山珈琲の想い」

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 12px |
| L | 20px |
| XL | 40px |
| XXL | 80px |
| XXXL | 120px |

### Container

- Max Width: **1200px**（サイト全体の標準コンテナ）
- 読み物カラム: **720px**
- Padding (horizontal): 20〜40px
- **KV は全画面ブリード**（`100vw` × `100vh` 相当）。ヘッダーは KV に重ねて透過させ、右端の「オンラインストア」黒ブロックだけが不透過で残る

### Grid

- Columns: 商品カードは 4 カラム、ニュースは 3 カラム、導線ブロックは 2 カラム
- Gutter: 20〜40px
- **1 セクション 1 メッセージ**。縦に大きく間を空けて積む（セクション間 80〜120px）
- SNS アイコンは右端に**縦一列で固定**する

---

## 6. Depth & Elevation

**実測の `box-shadow` は 0 件**。このサイトは影を一切使わない。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべて**。白地・面色・写真だけで構成する |
| — | `rgba(255,255,255,0.95)` | ヘッダーのスクロール時オーバーレイ（影ではなく半透明の面） |

- 奥行きは **白 `#ffffff` × 暖白 `#f7f6f4` × 黒 `#231815` / `#262626` の面**と**大きな写真**のコントラストで表現する
- **落ち影・浮き上がりを作らない**。カードもボタンも完全にフラット
- 前後関係が必要なときは**面色を切り替える**（純白 → 暖白 `#f7f6f4` → 黒 `#262626`）
- 唯一の「厚み」は **CTA の 3px の枠**。影の代わりに輪郭の太さで押し出す

---

## 7. Do's and Don'ts

### Do（推奨）

- テキスト・CTA は**インクの黒 `#231815`**（純黒 `#000000` ではない）
- **`font-feature-settings: "palt"` を全体に掛ける**
- **字間は `letter-spacing` ではなく `palt` で作る**。和文は `normal` のまま
- **行間で階層を作る**。見出し 1.4〜1.5 → 本文 **2.0** → リード文 **2.5**
- **サイズと太さを反比例させる**。40px の見出しは weight 400、11px のラベルは weight 700
- 欧文ラベルは **Roboto / weight 600〜700 / ls 0.1〜0.12em** で開く
- 主要 CTA は **`border-radius: 16000px` の完全ピル ＋ `3px solid #231815`**（枠と面を同色に）
- 暗い面の上ではボタンを**矩形 ＋ `1px solid rgba(255,255,255,0.8)`** に切り替える
- 面の切り替えは 純白 → 暖白 `#f7f6f4` → 黒 `#262626` の 3 段で
- **影を使わない**。厚みは CTA の 3px の枠だけで作る
- ヒラギノは **ProN** を指定する（Pro ではない）
- **1 セクション 1 メッセージ**。セクション間を 80〜120px 空ける

### Don't（禁止）

- **純黒 `#000000` を使わない**（テキストも CTA も `#231815`）
- **`letter-spacing` を開いて字間を作らない**（`palt` で詰めるのがこのブランドの手触り）
- **`palt` を外さない**（外すと字面が間延びして印象が変わる）
- **大見出しを太くしない**（40px の見出しは weight 400 のまま。太くすると重心が下がる）
- **本文の行間を 2.0 未満にしない**
- **欧文を和文と同じ字間で組まない**（Roboto は必ず 0.1em 以上に開く）
- **CTA の角丸を中途半端にしない**（ピルは完全な `16000px`。8px などの中間値を使わない）
- **暗い面の上でピル CTA を使わない**（暗い面では矩形アウトラインに切り替える）
- **影を作らない**（`box-shadow` の実測は 0 件）
- **有彩色を足さない**（クリーム `#fcf6e9` 以外の暖色面を作らない）
- **ヒラギノを Pro で指定しない**（このサイトは **ProN**）
- **游ゴシックをフォールバックに入れない**（このサイトのチェーンには存在しない）
- **オンラインストア側の組版系（Helvetica 先頭 / `palt` なし / lh 1.0〜1.4）を新規実装に持ち込まない**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。グローバルナビはドロワー、SNS の縦列は非表示 |
| Tablet | 768–1024px | 2 カラム。商品カードは 2 列 |
| Desktop | > 1024px | 4 カラム＋最大 1200px コンテナ |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）。11px のバッジは装飾なので対象外、カードは**カード全体をタップ領域**にする
- ピル CTA は高さ 48〜56px を確保する（3px の枠を含めて）
- 言語トグルは片側 44px 以上
- ヘッダー右端の「オンラインストア」ブロックはモバイルでもヘッダー高さいっぱいを保つ

### フォントサイズの調整

- 本文 14px は据え置く（13px を下回らない）
- Section Title 40px → モバイルでは 26〜28px。**weight 400 のまま**
- リード文 20px → 17px。**`line-height: 2.5` は維持する**（このサイトの余裕そのもの）
- Roboto の欧文ラベル 11〜14px は縮めない。**`letter-spacing: 0.1em` も維持する**
- **本文の行間 2.0 と `palt` はモバイルでも維持する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff   （純白）
Ink Black:      #231815   （ブランド色。テキスト・CTA。純黒は使わない）
Cream:          #fcf6e9   （フレーバータグの面。唯一の暖色面）
Surface Warm:   #f7f6f4   （導線ブロックの面）
Roast Badge:    #4e4e4e   （焙煎度バッジ）
Gray:           #808080   （補足・非活性）
Surface Gray:   #eeeeee / #f1f1f1  （一覧・カテゴリの面）
Dark Panel:     #262626   （暗いパネル）
Outline (dark): rgba(255,255,255,0.8)  （暗い面上の枠）
JP:             "Noto Sans JP", "Helvetica Neue", Arial,
                "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif
EN Label:       Roboto, sans-serif    ← weight 600/700 / ls 0.1〜0.12em
Body:           14px / weight 400 / lh 2.0 / ls normal
Lead:           20px / weight 400 / lh 2.5 / ls 0.05em
Section Title:  40px / weight 400 / lh 1.5 / ls normal   ← 大きくても細い
Nav / Product:  15px / weight 500 / lh 2.0
Badge (EN):     Roboto 11px / weight 700 / ls 0.1em
Letter Spacing: normal（字間は palt で作る。欧文だけ 0.1em 以上に開く）
Feature:        font-feature-settings: "palt"（全体に掛ける）
Radius:         CTA 16000px（完全ピル）/ バッジ・入力 4px / それ以外 0
CTA Border:     3px solid #231815（面色と同色の太い枠）
Shadow:         none（実測 0 件。厚みは 3px の枠で作る）
Container:      1200px（読み物 720px）
```

### プロンプト例

```
丸山珈琲のデザインシステムに従って、コーヒー豆の商品紹介ページを作成してください。
- 和文は "Noto Sans JP", "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
  "Hiragino Sans", Meiryo, sans-serif（游ゴシックは入れない。ヒラギノは ProN）
- font-feature-settings: "palt" を全体に掛ける。letter-spacing は normal のまま
  （字間は palt で詰めて作る。開く方向には動かさない）
- 本文は 14px / line-height 2.0、リード文は 20px / line-height 2.5 / ls 0.05em
- セクション見出しは 40px だが font-weight は 400 のまま（大きい和文を細く組む）
- 欧文ラベルは Roboto / weight 600〜700 / letter-spacing 0.1〜0.12em で開く
- テキストと CTA はインクの黒 #231815（純黒 #000000 は使わない）
- 主要 CTA は border-radius: 16000px の完全ピル ＋ 3px solid #231815。
  面と枠を同色にし、hover で面を白に抜いて枠だけ残す
- 暗い面（#262626）の上ではボタンを矩形 ＋ 1px solid rgba(255,255,255,0.8) に切り替える
- 商品カードは「画像 → 焙煎度バッジ（#4e4e4e / radius 4px / 白文字）→ 商品名 15px/500
  → フレーバータグ（#fcf6e9 の面 / radius 0）→ 価格」
- 面の切り替えは 純白 #ffffff → 暖白 #f7f6f4 → 黒 #262626 の 3 段だけ
- box-shadow は一切使わない。厚みは CTA の 3px の枠だけで作る
- 有彩色はクリーム #fcf6e9 以外に足さない
- 1 セクション 1 メッセージ。セクション間は 80〜120px 空ける
- コンテナ幅は最大 1200px、読み物カラムは 720px
```
