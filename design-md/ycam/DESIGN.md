# DESIGN.md — 山口情報芸術センター［YCAM］

> 山口情報芸術センター［YCAM］（https://www.ycam.jp/）のデザイン仕様書。
> 2003 年開館（設計: 磯崎新）の**メディアアートセンター**。展覧会・映画上映・ワークショップ・研究開発（YCAM InterLab）を 1 サイトで案内する。
> **字詰めをたった 1 つのユーティリティクラスに集約している**。`.u-text-palt { font-feature-settings: "palt"; letter-spacing: -0.05em }` — **palt と負の字間を必ずセットで当てる**。日本語サイトの多くが字間を「開く」中で、**YCAM は詰める**
> **文字サイズが画面幅で伸びる**。ルート `font-size` は 1344px 未満 16px 固定 → 1840px で 20px。**全サイズが rem 指定**なので、大画面ではレイアウトごと拡大する
> **色は teal と orange の 2 色だけ**。主色 `#176e71`（深い青緑）、副色 `#ba4a00`（焦げたオレンジ）。**「開催中」「本日は開館日です」という時間の情報にだけオレンジを使う**
> 実サイトの computed style 実測（2026-08-20 取得。トップ ＋ イベント詳細「即興！」）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地 ＋ teal ＋ orange の 3 色で全部やる**。装飾を持たず、色は意味にだけ割り当てる。写真（作品・上映・館内）が面積の主役で、UI はその邪魔をしない
- **YCAM について**: 山口市の公共文化施設。**「開いているか」「今日は何があるか」を最優先に見せる**情報設計で、ヘッダー最上段に「きょうのYCAM」と開館ステータスが常駐する
- **密度**: **中〜高**。トップは スライダー → きょうのYCAM → 上映 → 開催イベント → プロジェクト → お知らせ と縦に積む。1 画面あたりの情報量は多いが、行間 1.75 で緩める
- **キーワード**: teal `#176e71`、orange `#ba4a00`、`palt` ＋ `letter-spacing: -0.05em`、`border-radius: 3px`、流体ルート font-size、影ゼロ
- **特徴**:
  - **字詰めは `.u-text-palt` の 1 クラスに集約**。`font-feature-settings: "palt"` と `letter-spacing: -0.05em` が**必ず同時に当たる**。片方だけを使う場所がない
  - **`letter-spacing` が負**（-0.05em）。日本語の見出しを**詰めて塊にする**方針で、開いて散らす設計（芸術祭サイトに多い）とは真逆
  - **ルート `font-size` が流体**。1344px 未満 = 16px、1440px = **16.6px**、1504px = 17px、1680px = 18px、1840px 以上 = 20px。**px を直接書かず、すべて rem で組む**
  - **`border-radius` は 3px だけ**。ボタン・ページャ・見出しタブに 3px、それ以外は 0px。**8px も pill も使わない**
  - **影を一切使わない**（`box-shadow: none`）。面の区別は**色**（`#f1f1f1` / `#f8f8f8` / `#ebf4f4` / `#c8eced`）でつける
  - **見出しがタブの形をしている**。詳細ページの `h2` は teal ベタ ＋ 白文字 ＋ **`border-radius: 3px 3px 0 0`**（上だけ角丸）で、下のテキストブロックに乗る
  - **バッジが 3 系統ある**: 塗り（`#ba4a00` / `#176e71` / `#666666`）＝ 状態、白地 ＋ 1px 枠 ＝ 補足、白地 ＋ teal 文字 ＝ 場所
  - **アクセシビリティの作り込みが濃い**。skip link、`<h2>メインナビゲーション</h2>`、`<label>言語を切り替える</label>` が実装されている。**視覚的に見えない見出しとラベルを必ず置く**

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）。

### Brand（ブランド）

- **YCAM Teal** (`#176e71`, rgb 23,110,113): **主色**。ボタンの面、見出しタブの面、リンク文字、タブの現在地、ページャの現在地、「きょうのYCAM」の面
- **YCAM Orange** (`#ba4a00`, rgb 186,74,0): **副色**。**「開催中」「イベント」「映画上映」「本日は開館日です」——時間の状態にだけ使う**

> **⚠ CSS 変数と実装値が違う**。`:root` は `--ycam-color-main: #176a71` を宣言しているが、**コンポーネント CSS は `#176e71` を直書きしている**（ycam.css に 34 箇所、top.css に 15 箇所）。**実際に描画される teal は `#176e71`**。変数の値をそのまま使うと 1 トーンずれる。
> 副色は `--ycam-color-sub: #ba4a00` と実装値が一致する。

### Teal Scale（面色）

| 面 | 色 | rgb | 用途 |
|----|-----|-----|------|
| 濃 | **`#0f494b`** | 15,73,75 | お知らせ見出しの帯 |
| 主 | **`#176e71`** | 23,110,113 | ボタン・見出しタブ・現在地 |
| 文字（濃） | **`#0a494b`** | 10,73,75 | 「ページ上部へ戻る」の文字 |
| 淡 | **`#c8eced`** | 200,236,237 | ページ上部へ戻る帯、上映日の見出し |
| 淡（別トーン） | **`#c8edee`** | 200,237,238 | サブナビゲーション |
| 極淡 | **`#ebf4f4`** | 235,244,244 | ページャの非現在地 |

- **teal の淡色が 2 トーン混在する**（`#c8eced` と `#c8edee`）。**新規実装では `#c8eced` に寄せる**

### Neutral（ニュートラル）

- **Ink** (`#333333`, rgb 51,51,51): **既定の文字色**。`html { color: #333 }` で宣言。**純黒を使わない**
- **Surface Gray** (`#f1f1f1`, rgb 241,241,241): 非活性タブ、ヘッダードロップダウン、スライダーの下地
- **Surface Gray（淡）** (`#f8f8f8` / `#f7f7f7`): お知らせカード、関連イベントカード
- **Disabled** (`#666666`, rgb 102,102,102): **「準備中」バッジの面**（白文字）
- **Background** (`#ffffff`): ページ地色
- **Scrim** (`rgba(0,0,0,0.5)` / `rgba(0,0,0,0.6)`): 写真の上に文字を乗せるとき。**`0.6` は撮影クレジット専用**

### External（外部リンク）

- **External Blue** (`#004b9e`, rgb 0,75,158): **特設ウェブサイトへ出るボタンだけ**。teal と混ぜない

### Semantic（意味的な色）

- **Success / 開催中**: **`#ba4a00`**（Orange）。**「成功」ではなく「いま起きている」の色**
- **Info / 補足**: `#176e71`（Teal）
- **Disabled / 準備中**: `#666666` ＋ 白文字
- **Warning・Danger**: 実サイトに専用色を持たない。**新しい赤を持ち込まず、`#ba4a00` を強調として流用する**

---

## 3. Typography Rules

> **`.u-text-palt`（palt ＋ -0.05em）**と**流体ルート font-size** の 2 点がこのサイトの核。

### 3.1 和文フォント

- **和文の第 1 候補は 游ゴシック体**（`游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック, "Yu Gothic"`）
- 続いて `"Noto Sans CJK JP"` → `"ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN"` → `メイリオ, Meiryo` → `"ＭＳ Ｐゴシック"`
- **Web フォントを和文に使っていない**（YakuHanJPs を除く）。**OS のフォントで組む**方針
- **ウェイトは 400 / 500 / 700 の 3 段**
  - **500 が本文**（`p` / `li` / `td`）。400 は器（`body` / `nav` / ラッパー）に残る既定値
  - **700 が見出し・ラベル・ボタン・ナビ**。太いか細いかの二択で階層をつくる

### 3.2 欧文フォント

- **先頭が `YakuHanJPs`**。これは**約物（括弧・句読点）だけを半角にする Web フォント**で、欧文書体ではない。**先頭に置くことで、和文フォントより先に約物を拾わせる**
- 欧文本体は `"open sans", "Open Sans"` → `LinotypeUnivers, Univers` → `"Helvetica Neue", Helvetica` → `Roboto` → `"Noto Sans", "Droid Sans"` → `Verdana`
- **Univers（Linotype）が入っている**のが特徴。**館名ロゴの欧文が Univers 系**で、その字面を Web でも狙っている
- **`button` / `select` だけ font-family が Arial（UA 既定）に落ちる**。**実装では `button, select { font-family: inherit }` を必ず書く**（実サイトの取りこぼし）

### 3.3 font-family 指定

```css
/* html / body — サイト全体 */
font-family:
  YakuHanJPs,                                   /* 約物半角（先頭に置く） */
  "open sans", "Open Sans",
  LinotypeUnivers, Univers,
  "Helvetica Neue", Helvetica, Roboto,
  "Noto Sans", "Droid Sans", Verdana,
  游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
  游ゴシック, "Yu Gothic",
  "Noto Sans CJK JP",
  "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
  メイリオ, Meiryo,
  "ＭＳ Ｐゴシック",
  sans-serif;

/* UA 既定に落ちるのを防ぐ（実サイトの取りこぼしを補う） */
button, select, input, textarea { font-family: inherit; }
```

**フォールバックの考え方**:
- **1 番目は書体ではなく「約物の処理」**（YakuHanJPs）。和文書体の前に置かないと効かない
- **欧文 → 和文の順**。和文フォント内の欧文グリフより Open Sans / Univers を優先する
- **游ゴシックを先頭に置く**ため、Windows では「游ゴシック Medium」を明示的に列挙して細さを回避している

### 3.4 文字サイズ・ウェイト階層

> **すべて rem。ルートが画面幅で伸びる**（下表の px は **1440px 幅・ルート 16.6px** 時点の実測）。

| Role | rem | px @1440 | Weight | Line Height | Letter Spacing | 用途 |
|------|-----|----------|--------|-------------|----------------|------|
| Page Title | 2.25rem | 37.35px | 400 | 1.333 (49.8px) | -0.05em | 詳細ページの `h1` |
| Section Head | 2rem | 33.2px | 400 / 700 | 1.75 (58.1px) | -0.05em | 「開催イベント」「映画上映」 |
| Sub Head | 1.875rem | 31.125px | 700 | 1.333 (41.5px) | -0.05em | 記事内リード見出し |
| Heading 3 | 1.5rem | 24.9px | 700 | 1.75 (43.575px) | -0.05em | 「今週の上映プログラム」「8月20日（木）」 |
| Heading（タブ） | 1rem | 16.6px | 700 | — | -0.05em | teal ベタの `c-heading-1` |
| Nav / Card Title | 1.125rem | 18.675px | 500 / 700 | 1.0〜1.75 | -0.05em | ナビ、カード見出し |
| Nav（ドロップダウン） | 1.05rem | 17.43px | 400 / 700 | 1.0〜1.25 | -0.05em | ヘッダー展開メニュー |
| Body | 1rem | 16.6px | 500 | **1.75 (29.05px)** | -0.05em | 本文・リスト |
| Body（読み物） | 1rem | 16.6px | 500 | **2.0 (33.2px)** | normal | 記事の説明文。**palt を外す** |
| Caption | 0.875rem | 14.525px | 400 / 500 / 700 | 1.0〜1.75 | -0.05em | 日付、ラベル、カード補足 |
| Small | 0.8rem | 13.28px | 400 / 700 | 1.0 | -0.05em | ヘッダー最上段のユーティリティ |
| Tiny | 0.75rem | 12.45px | 500 / 700 | 1.5〜2.08 | -0.05em / -0.033em | バッジ、撮影クレジット |
| Micro | 0.625rem | 10.375px | 700 | 1.75 | normal | サイドの関連情報 |

- **Section Head の weight が 400 と 700 で混在する**（「開催イベント」= 400、「YCAMについて」= 700）。**新規実装では 700 に統一してよい**
- **数字とラベルを同じ行で組むとき、日付だけ 1.5rem に上げる**（「**8月20日**（木） 10:00〜20:00」）

### 3.5 行間・字間

- **本文の行間**: **1.75**（16.6px → 29.05px）が既定
- **読み物本文の行間**: **2.0**（16.6px → 33.2px）。イベント詳細の説明文だけ広げる
- **見出しの行間**: **1.25〜1.4**（`h1` 1.333 / `h3` 1.25）。ただし**セクション見出しは 1.75** と広い
- **字間**: **`-0.05em`（負）が既定**。`.u-text-palt` を当てた全要素に効く
- **例外**: フッター見出しだけ **-0.033em**（12.45px → -0.415px）
- **`letter-spacing: normal` になる場所**: `body` / 記事の読み物本文 / ボタン内テキスト / パンくず / SNS 共有

**ガイドライン**:
- **`palt` と `letter-spacing: -0.05em` は必ずセットで当てる**。palt だけだと詰まりすぎ、負の字間だけだと約物の空きが残る
- **読ませる本文には palt を当てない**（`letter-spacing: normal` ＋ `line-height: 2.0`）。**見出し・ラベル・ナビだけ詰める**
- 行間は **1.75 を既定、読み物 2.0、見出し 1.25〜1.4** の 3 段で足りる

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
word-break: normal;
overflow-wrap: break-word;   /* 長い URL・作品名の英字 */
line-break: strict;
```

- **作品名・アーティスト名に欧文が混じる**（`Forest Symphony` `Filament＋YCAM`）。**`word-break: break-all` にすると欧文が途中で割れる**ので使わない
- 日付表記は `2026年8月27日（木）〜30日（日）` の形。**波ダッシュの前後で折り返させない**（`white-space: nowrap` を日付ブロックに当てる）
- **行頭禁止**: `）」』】〕〉》、。，．・：；？！`／**行末禁止**: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* このサイトの字詰めは、この 1 クラスに集約されている */
.u-text-palt,
.u-text__palt {
  font-feature-settings: "palt";
  letter-spacing: -0.05em;
}
```

- **`palt` の適用先**: 見出し（`h1`〜`h4`）、ナビ、ラベル、バッジ、カードタイトル、テーブルの `th` / `td`
- **`palt` を当てない場所**: `body`、記事の読み物本文、パンくず、SNS 共有、フッターの一部
- **`kern` は明示していない**（ブラウザ既定に任せる）
- **グローバル適用ではない**。**クラスを当てた要素にだけ効く**設計なので、実装時も「詰めたい要素にだけ `.u-text-palt` を付ける」

### 3.8 縦書き

該当なし。**全ページ横書き**。

---

## 4. Component Stylings

### Buttons

**Primary（塗り）**

- Background: **`#176e71`**
- Text: `#ffffff` ／ Font: **1rem / weight 700**（大） または 0.85rem / 700（小）
- Padding: **`1rem`**（16.6px 全周）／ 小さいものは `0.85rem`
- Border Radius: **`3px`**
- Border: なし ／ Shadow: **なし**
- 例: 「前売り券販売・申込受付があるイベント一覧」「イベントカレンダーを見る」「きょうのYCAMを見る」

**Secondary（アウトライン）**

- Background: `#ffffff` ／ Text: **`#176e71`**
- Border: **`2px solid #176e71`**（**1px ではなく 2px**）
- Padding: **`0.8rem 2rem`**（13.28px 33.2px）
- Border Radius: **`0px`**（**塗りは 3px、枠線は 0px** と形で区別する）
- Font: 1rem / weight 700
- 例: 「YCAMについて詳しく見る」

**External（外部サイト）**

- Background: **`#004b9e`** ／ Text: `#ffffff` ／ Radius: `3px`
- Padding: `0.34rem 2.21rem 0.34rem 0.85rem`（**右に矢印アイコン分の余白を取る**）
- 例: 「特設ウェブサイト」

### Heading Tab（見出し）

**このサイト固有の形**。詳細ページの `h2` は**タブの形**で下のブロックに乗る。

- Background: **`#176e71`** ／ Text: `#ffffff`
- Border Radius: **`3px 3px 0 0`**（**上だけ角丸**）
- Padding: `0 1rem` ／ Font: 1rem / weight 700 / `letter-spacing: -0.05em`
- 例: 「プロフィール」「料金」「備考」

### Badges / Labels

**3 系統を形と色で区別する。全部 `border-radius: 0px`。**

| 種別 | 面 | 文字 | 枠 | 用途 |
|------|-----|------|-----|------|
| **状態（進行中）** | **`#ba4a00`** | `#ffffff` | 1〜2px solid 同色 | 「開催中」「イベント」「映画上映」 |
| **状態（未開始）** | **`#666666`** | `#ffffff` | なし | 「準備中」 |
| **カテゴリ** | **`#176e71`** | `#ffffff` | なし | 「プレスリリース」 |
| **補足（期限）** | `#ffffff` | `#333333` | **1px solid `#ba4a00`** | 「あと4日」 |
| **補足（チケット）** | `#ffffff` | `#333333` | **1px solid `#176e71`** | 「前売り券販売中」「申込受付中」 |
| **場所** | `#ffffff` | **`#176e71`** | **1px solid `#176e71`** | 「館外」 |

- Padding: `0.2rem 0.5rem`（3.32px 8.3px）／ カード上のものは `0.125rem 1rem`
- Font: 0.75〜0.875rem / weight 400（補足）または 700（状態）
- **塗り＝いま起きていること、白地＋枠＝条件・場所**。この対応を崩さない

### Tabs

- 現在地: 面 **`#176e71`** ／ 文字 `#ffffff`
- 非現在地: 面 **`#f1f1f1`** ／ 文字 **`#176e71`**
- Padding: `0.5rem` ／ Radius: **`0px`** ／ Font: 1rem / weight 700
- 例: 「すべて / お知らせ / プレスリリース」

### Pagination

- 現在地: 面 `#176e71` ／ 白文字 ／ **Radius `3px`**
- 非現在地: 面 **`#ebf4f4`** ／ 文字 `#176e71` ／ Radius `0px`
- Font: 1.125rem / weight 700

### Cards

**イベントカード**

- Background: `#ffffff` ／ Border: なし ／ Radius: `0px` ／ Shadow: **なし**
- 構成: 画像 → 冠称（0.875rem / 500）→ **タイトル（1rem / 700 / `#176e71` / 下線）** → 会期（1rem / 500）→ **状態バッジ**
- **タイトルに下線を引く**。teal ＋ 下線が「押せるもの」の合図

**関連カード**

- Background: **`#f7f7f7`** ／ Radius `0px`

**お知らせカード**

- Background: **`#f8f8f8`** ／ 日付（0.875rem）→ タイトル（1rem / 500）

**写真クレジット**

- Background: **`rgba(0,0,0,0.6)`** ／ 文字 `#ffffff` / 0.75rem / 700 ／ Padding `0.5rem`

### Inputs

実サイトの公開フォームは言語切替の `<select>` と絞り込みが中心。**このサイトの原則（radius 3px / teal / 影なし）から導くと以下**。

- Background: `#ffffff` ／ Border: **`1px solid #666666`**
- Border (focus): **`2px solid #176e71`** ＋ `outline-offset: -2px`（**実サイトが `outline-offset: -2px` を使っている**）
- Border Radius: **`3px`** ／ Padding: `0.5rem 0.85rem`
- Font: 1rem / weight 500 ／ Text: `#333333` ／ Placeholder: `#666666`
- Error: `2px solid #ba4a00` ＋ エラーテキスト `#ba4a00` / 0.875rem / 700
- **`<select>` には必ず `<label>` を付ける**（実サイトは「言語を切り替える」「表示するお知らせのカテゴリを切り替える」を実装済み）

### Skip Link

- **`skip to main content` を `<body>` 直後に置く**（`.c-skiplink`）
- Background: `#ffffff` ／ 文字 `#176e71` / 1.125rem / 700 ／ Padding: `0.8rem 2rem`

---

## 5. Layout Principles

### Spacing Scale

**rem ベース。ルートが伸びるので、余白も画面幅で拡大する。**

| Token | rem | px @1440 |
|-------|-----|----------|
| XS | 0.25rem | 4.15px |
| S | 0.5rem | 8.3px |
| M | 0.8rem | 13.28px |
| L | 1rem | 16.6px |
| XL | 1.5rem | 24.9px |
| XXL | 2rem | 33.2px |

- **ボタンの `padding: 1rem`（全周同値）**、**アウトラインボタンの `0.8rem 2rem`（縦:横 = 1:2.5）**

### Container

- コンテンツ幅: **1200px 目安**（`@media (max-width: 1279px)` でレイアウトが切り替わる）
- ヘッダー: **3 段構成**
  1. 最上段（左）「きょうのYCAM」= teal ベタ ＋ 開館ステータス（orange 文字）／（右）アクセス・お知らせ・言語切替
  2. 中段 ロゴ ＋ メインナビ（7 項目）
  3. ドロップダウン（面 `#f1f1f1`）
- フッター: **面 `#0f494b`（濃 teal）＋ 白文字**
- **「ページ上部へ戻る」は淡 teal `#c8eced` の帯**で全幅に敷く

### Grid

- イベント一覧: **3 カラム**（画像 ＋ 冠称 ＋ タイトル ＋ 会期 ＋ バッジ）
- 上映スケジュール: **1 カラムの時刻リスト**（左に teal の縦罫、時刻 → サムネイル → 作品名）
- お知らせ: タブ ＋ 1 カラムリスト
- Gutter: 1.5rem 目安
- **セクションの区切りは teal の 2px 横罫**。セクション見出しの上に引く

---

## 6. Depth & Elevation

**このサイトは影を持たない。**`box-shadow` は全要素 `none`。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | **`none`** | **すべての要素** |

- **奥行きは面色でつくる**:

| 面 | 色 | 用途 |
|----|-----|------|
| 地 | `#ffffff` | ページ全体・カード |
| 面（灰） | `#f1f1f1` | 非活性タブ・ドロップダウン |
| 面（淡灰） | `#f8f8f8` / `#f7f7f7` | お知らせ・関連カード |
| 面（極淡 teal） | `#ebf4f4` | ページャ非現在地 |
| 面（淡 teal） | `#c8eced` | 上部へ戻る帯・上映日見出し |
| 面（主 teal） | `#176e71` | ボタン・見出しタブ・現在地 |
| 面（濃 teal） | `#0f494b` | フッター・お知らせ見出し |
| スクリム | `rgba(0,0,0,0.5)` / `rgba(0,0,0,0.6)` | 写真の上の文字 |

- **カードに影も枠も付けない**。**画像の輪郭とテキストの塊だけでカードに見せる**

---

## 7. Do's and Don'ts

### Do（推奨）

- **字詰めは `.u-text-palt` の 1 クラスにまとめる**（`font-feature-settings: "palt"` ＋ `letter-spacing: -0.05em`）。**片方だけを当てない**
- **`palt` は見出し・ナビ・ラベル・バッジにだけ当てる**。**読ませる本文は `letter-spacing: normal` ＋ `line-height: 2.0`**
- **文字サイズは全部 rem で書く**。ルートを 1344px 未満 16px 固定 → 1840px で 20px に伸ばす
- **teal は `#176e71` を使う**（CSS 変数の `#176a71` ではない）
- **オレンジ `#ba4a00` は「いま起きていること」にだけ使う**（開催中・本日は開館日です）
- **`border-radius` は 3px（塗りボタン・ページャ）と 0px（枠線ボタン・バッジ・タブ）の二択**にする
- **見出しは teal ベタ ＋ `border-radius: 3px 3px 0 0`** のタブ形にする
- **アウトラインボタンの枠は 2px** にする（1px にすると teal が痩せる）
- **カードのタイトルは teal ＋ 下線**にする。押せるものの合図を色と下線の両方で出す
- **影を使わない**。面色（白 → `#f8f8f8` → `#f1f1f1` → `#ebf4f4` → `#c8eced` → `#176e71` → `#0f494b`）で階層をつくる
- **skip link と不可視の見出し・ラベルを必ず置く**（`<h2>メインナビゲーション</h2>`、`<label>言語を切り替える</label>`）
- **`button, select { font-family: inherit }` を書く**（実サイトはここで Arial に落ちている）
- **フォーカスリングは `2px solid #176e71` ＋ `outline-offset: -2px`**

### Don't（禁止）

- **`letter-spacing` を正の値にしない**。このサイトの字間は**負（-0.05em）**が既定
- **`palt` を `body` にグローバル適用しない**。読み物の本文が詰まって読みにくくなる
- **文字サイズを px で書かない**。ルートの流体スケールが効かなくなる
- **CSS 変数 `--ycam-color-main`（`#176a71`）をそのまま使わない**。**実装値は `#176e71`**
- **オレンジを装飾・強調一般に広げない**。「時間の状態」以外に使うと開館ステータスが埋もれる
- **角丸を増やさない**（8px / pill を持ち込まない。3px か 0px の二択）
- **影を足さない**。カードに `box-shadow` を付けるとこのサイトの平面性が壊れる
- **`word-break: break-all` を使わない**（作品名の欧文が途中で割れる）
- **teal の淡色を新規に増やさない**（`#c8eced` と `#c8edee` の 2 トーン混在はすでに揺れている。`#c8eced` に寄せる）
- **バッジに角丸を付けない**。塗り＝状態／白地＋枠＝条件、の対応も崩さない
- **和文に Web フォントを持ち込まない**（游ゴシック → Noto Sans CJK JP → ヒラギノの OS フォントで組む方針）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 544px | 1 カラム。ヘッダーはハンバーガー。カードは縦積み |
| Tablet | 545–767px | 2 カラム。ナビは折りたたみ |
| Small Desktop | 768–1023px | イベント一覧 2 カラム |
| Desktop | 1024–1343px | 3 カラム。**ルート font-size 16px 固定** |
| Wide | 1344–1839px | **ルート font-size が 16 → 20px へ伸びる**（1440px = 16.6px / 1504px = 17px / 1680px = 18px） |
| Ultra Wide | ≥ 1840px | **ルート font-size 20px で頭打ち** |

- **`@media(max-width:544px)` が最も多く書かれている**（rwd/top.css に 90 箇所）。**モバイルの作り込みが主戦場**

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）
- **Primary Button は `padding: 1rem` ＋ 1rem / lh 1.5** で高さ 58px 前後。基準を満たす
- **バッジは `padding: 0.2rem 0.5rem` ＋ 0.875rem で高さ 21px**。**バッジ単体をタップ対象にせず、カード全体をタップ領域にする**
- **タブは `padding: 0.5rem` ＋ 1rem で高さ 42px**。**モバイルでは `padding: 0.75rem` に広げて 44px を確保する**
- ヘッダー最上段の小さなリンク（0.8rem）は、**モバイルではドロワー内の 1rem 行に置き換える**

### フォントサイズの調整

- **モバイルではルートが 16px 固定**になるため、rem の値をそのまま使えばデスクトップの約 80% に自動で縮む。**追加の縮小指定は原則不要**
- Section Head 2rem は据え置く（16px × 2 = 32px）
- Page Title 2.25rem → **1.75rem** に落とす（36px は 375px 幅で 1 行に 10 文字しか入らない）
- 本文 1rem / lh 1.75 は据え置く
- **`letter-spacing: -0.05em` はモバイルでも維持する**（詰めた組みがブランドの印象）
- Tiny 0.75rem（12px）はこれ以上小さくしない

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff   （ページ地色）
YCAM Teal:       #176e71   （主色。ボタン・見出しタブ・リンク・現在地）
                 ※ CSS 変数 --ycam-color-main は #176a71 だが実装は #176e71
YCAM Orange:     #ba4a00   （副色。開催中・本日は開館日です＝「いま」の色）
Deep Teal:       #0f494b   （フッター・お知らせ見出しの帯）
Pale Teal:       #c8eced   （上部へ戻る帯・上映日見出し）
Faint Teal:      #ebf4f4   （ページャ非現在地）
Surface Gray:    #f1f1f1   （非活性タブ・ドロップダウン）／ #f8f8f8 #f7f7f7（カード）
Disabled:        #666666   （準備中バッジ。白文字）
External Blue:   #004b9e   （外部サイトへ出るボタンだけ）
Ink:             #333333   （既定の文字色。純黒ではない）
Scrim:           rgba(0,0,0,.5) / rgba(0,0,0,.6)（写真の上の文字）
Font:            YakuHanJPs, "Open Sans", Univers, "Helvetica Neue", Roboto,
                 游ゴシック体, YuGothic, "游ゴシック Medium", "Noto Sans CJK JP",
                 "ヒラギノ角ゴ ProN W3", メイリオ, sans-serif
                 ※ 先頭の YakuHanJPs は約物半角フォント。順序を変えない
Root:            1344px 未満 16px 固定 → 1840px で 20px（流体）。全サイズ rem
Weight:          500（本文）/ 700（見出し・ナビ・ボタン・ラベル）。400 は器のみ
Body:            1rem / weight 500 / lh 1.75 / ls -0.05em / #333333
読み物本文:       1rem / weight 500 / lh 2.0 / ls normal（palt を外す）
Line Height:     1.0（ラベル）/ 1.25〜1.4（見出し）/ 1.75（既定）/ 2.0（読み物）
Letter Spacing:  -0.05em（既定・負）。読み物本文とパンくずだけ normal
Feature:         .u-text-palt { font-feature-settings:"palt"; letter-spacing:-0.05em }
Radius:          3px（塗りボタン・ページャ）/ 3px 3px 0 0（見出しタブ）/ 0px（枠線・バッジ・タブ）
Shadow:          none（全要素）。階層は面色でつくる
Container:       1200px
```

### プロンプト例

```
YCAM（山口情報芸術センター）のデザインシステムに従って、展覧会の一覧ページを作成してください。
- 書体は YakuHanJPs, "Open Sans", Univers, "Helvetica Neue", 游ゴシック体, YuGothic,
  "游ゴシック Medium", "Noto Sans CJK JP", "ヒラギノ角ゴ ProN W3", メイリオ, sans-serif。
  先頭の YakuHanJPs（約物半角フォント）を必ず 1 番目に置く
- button, select にも font-family: inherit を当てる
- 文字サイズはすべて rem で書き、ルートを
  html { font-size: 16px } @media(min-width:1344px){ 16→20px へ伸ばす } @media(min-width:1840px){ 20px }
  とする
- 字詰めは .u-text-palt { font-feature-settings:"palt"; letter-spacing:-0.05em } の 1 クラスに集約し、
  見出し・ナビ・ラベル・バッジにだけ当てる。
  読ませる本文には当てず、letter-spacing: normal / line-height: 2.0 にする
- 本文は 1rem / weight 500 / line-height 1.75 / letter-spacing -0.05em / color #333333
- weight は 500（本文）と 700（見出し・ナビ・ボタン・ラベル）の二択にする
- 配色は teal と orange の 2 色だけ：
  主色 #176e71、副色 #ba4a00、濃 #0f494b、淡 #c8eced、極淡 #ebf4f4、
  面（灰）#f1f1f1 / #f8f8f8、文字 #333333、非活性 #666666
- オレンジ #ba4a00 は「開催中」「本日は開館日です」など"いま起きていること"にだけ使う
- 塗りボタン: 面 #176e71 ＋ 白文字 ＋ padding 1rem ＋ radius 3px ＋ 1rem weight 700。影は付けない
- 枠線ボタン: 白地 ＋ 文字 #176e71 ＋ border 2px solid #176e71 ＋ padding 0.8rem 2rem ＋ radius 0px
- セクション見出しは teal ベタ ＋ 白文字 ＋ border-radius: 3px 3px 0 0 のタブ形にして、
  下のテキストブロックに乗せる
- バッジは全部 radius 0px。塗り（#ba4a00 / #176e71 / #666666）＝状態、
  白地 ＋ 1px 枠（#ba4a00 / #176e71）＝条件・場所、で使い分ける
- カードのタイトルは #176e71 ＋ 下線。カードには影も枠も付けない
- box-shadow は一切使わない。階層は面色（白 → #f8f8f8 → #f1f1f1 → #ebf4f4 → #c8eced → #176e71 → #0f494b）でつくる
- skip link（skip to main content）と、視覚的に見えない <h2>メインナビゲーション</h2>、
  <select> 用の <label> を必ず置く
- フォーカスリングは 2px solid #176e71 ＋ outline-offset: -2px
- コンテナ幅は 1200px、イベント一覧は 3 カラム
```
