# DESIGN.md — 芝浦工業大学（Shibaura Institute of Technology）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-17 / 対象: `https://www.shibaura-it.ac.jp/`, `/about/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **`palt` を `body` に 1 行書いて全要素（3993 要素）に配る、全面字詰め型。** 文字は黒 `#000000`、ブランドの深緑 `#134e3b` は見出しとラベルだけ。角丸 6px の箱を罫線で組む
- **密度**: 高い。13px の本文が 274 要素と支配的で、大学サイトらしくリンクが多い。一方ヒーローだけは 68px の見出しを `letter-spacing: 0.12em` で大きく空ける
- **キーワード**: 全面 palt、13px 本文、深緑 `#134e3b`、文字集合サブセット、750px の崖

**このサイトの核心は4つある。**

1. **`palt` を `body` に 1 行だけ書いて全要素に配っている。** `.sit body { font-family: "Noto Sans JP", sans-serif; font-weight: 400; font-feature-settings: "palt" }` で、実測 **3993 要素（トップ）／ 2806 要素（下層）**。実スタック・30px で `normal` 906.64px → `"palt"` 826.34px ＝ **−8.9%**。本当に効いている
2. **ただし、その `palt` が縦組みの 4 要素にも降りている。** `font-feature-settings` × `writing-mode` のクロス集計は `"palt" @ horizontal-tb` 3993 ／ **`"palt" @ vertical-rl` 4**。縦組みに必要なのは `vpal` で、`palt` は**エラーも警告も出さずに無視される**。右端の固定タブ（アクセス・お問い合わせ・公開講座・寄付）は詰まっていない
3. **数字のためだけに Inter を「文字集合サブセット」で読んでいる。** `https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap&text=,0123456789ACEGHLNRSU` — Google Fonts の `text=` パラメータで、**カンマ・数字 10 文字・大文字 10 文字の計 21 文字だけ**入ったファイルを配信させている。実測で Inter が当たるのは日付（`2026/11/13`）と番号（`1` `2` `3`）の 11 / 5 要素
4. **トップと下層でルートが違う。** トップは `html` に `font-size` の宣言が無く **UA 既定の 16px**、下層は `62.5%` で **10px**。`body` はどちらも 15px なので本文の見た目は揃うが、**`rem` の意味が 1.6 倍ずれる**

**CSS Custom Properties は実質 3 個**（`--header-height: 80px` / `--dvh` / `--height`）。残り 13 個は Swiper の既定値で、**設計トークンは持っていない。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| 深緑（見出し・ナビ） | `#134e3b` | **文字 56 / 51 要素** ／ 面 22 / 4 要素 ／ `rgba(19,78,59,0.2)` の薄い面 27 要素 |
| ティール（CTA・リンク） | `#008482` | 面 21 / 9 要素（「一覧へ戻る」など） ／ 文字 1 / 2 要素（「寄付」） |

### Semantic（意味的な色）

カテゴリのバッジが色で分かれている。

| 役割 | 実装値 | 実測 |
|------|--------|------|
| セミナー・行事 | `#008482` | バッジの面 |
| 連携・貢献／研究／お知らせ | `#4274b7` | バッジの面 8 要素 |
| 大学院の専攻 | `#7e498b` | バッジの面 8 要素 |
| 終了ラベル | `#9d2c3b` | 文字 2 要素 |
| 番号 1 / 2 / 3（下層） | `#42c9b0` / `#ed82ab` / `#f6a84c` | 各 1 要素 |
| **UA 既定の青（未スタイル）** | `#0000ee` | **9 要素**。スキップリンク（`目次` / `本文` / `芝浦工業大学`）が `<a>` のまま放置されている |

> **`#0000ee` はブランド色ではなく、スタイルを当て忘れた `<a>` の UA 既定色。** 再現するときは色を当てる

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| 本文（既定） | `#000000` | **364 / 339 要素で圧倒的最多** |
| 補助テキスト | `#646464` | 77 / 6 要素 |
| 下層の見出し補助 | `#969696` | 5 要素（`The Best in Japan` など） |
| 下層の本文 | `#333333` | 10 要素 |
| 反転文字 | `#ffffff` | 52 / 8 要素 |
| 枠線 | `#d7d7d7` | ボタン・カードの `1px solid` |
| 区切り | `#cccccc` | 48 要素 |
| 面（薄） | `#f5f5f5` / `#fafafa` | セクションの地 |

### グラデーション

ヒーロー下の帯と下層のタイトル背景に、**1 種類のグラデーションを使い回している**。角度と停止位置は丸めずそのまま写す。

```css
background-image:
  linear-gradient(270deg,
    #4aaed3 0px, #4aaed3 6.41026%,
    #4ac4d3 23.8462%,
    #89f2b8 76.1538%,
    #bef2dc 87.1795%, #bef2dc 100%),
  url("/assets/img/common/_noise.svg");
```

> **グラデーションの上にノイズの SVG を重ねている**（2 枚重ねの `background-image`）。平坦な色面にならない

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP（Google Fonts）を 300 / 400 / 500 / 700 の 4 ウェイト。** `document.fonts` は各ウェイト 124 件（loaded 51 / unloaded 73）
- フォールバックは **`sans-serif` だけ**。ヒラギノ・游ゴシック・メイリオは 1 つも書かれていない
- 読み込み: `css2?family=Lexend:wght@200;300;600&family=Noto+Sans+JP:wght@300;400;500;700&display=swap`
- フォント要求 59 件、すべて `fonts.gstatic.com`

### 3.2 欧文フォント

| 書体 | 要求ウェイト | `loaded` | 実測 | 用途 |
|---|---|---|---|---|
| **Lexend** | 200 / 300 / 600 | 300 / 600 | 43 / 13 要素 | `LANGUAGE` `SEARCH` `Special Contents` `Information` `About SIT` など英字の見出し・ラベル |
| **Inter** | 400 / 600 | 400（トップ） / 600（下層） | 11 / 5 要素 | **日付と番号だけ**（`2026/11/13` `1` `2` `3`） |

**Inter の読み込みが特殊で、文字集合を指定したサブセット配信になっている。**

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap&text=,0123456789ACEGHLNRSU">
```

> Google Fonts の **`text=` パラメータ**は「この文字だけ入ったフォントファイルを返す」機能。ここでは**カンマ・数字 0〜9・大文字 A C E G H L N R S U の計 21 文字**だけが配信される。
> **指定外の文字（小文字・和文・記号）を Inter で組もうとしても出ない**（`sans-serif` に落ちる）ので、**用途を日付と番号に限ること自体が設計の一部**。
> `document.fonts` でも Inter は **1 サブセットしか載らない**（Noto Sans JP の 124 件と対照的）。これが「サブセット配信か普通の配信か」の見分け方になる

### 3.3 font-family 指定

```css
.sit body {
  overflow-y: scroll;
  overflow-x: hidden;
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 400;
  font-feature-settings: "palt";   /* ← 全要素へ継承（実測 3993 要素） */
}

/* 英字ラベル */
.lexend { font-family: Lexend, sans-serif; }

/* 日付・番号だけ */
.date   { font-family: Inter, sans-serif; }
```

> **設計トークンは無い。** `:root` にあるのは `--header-height: 80px` / `--dvh` / `--height` の 3 個だけで、色もサイズも全部ハードコード

### 3.4 文字サイズ・ウェイト階層

**ルートはトップと下層で違う。** `body` だけが 750px を境に `vw` 流体へ切り替わる（8 章）。

| ページ | `html` | `body`（≥751px） |
|---|---|---|
| トップ（`/`） | **16px**（宣言なし＝UA 既定） | 15px |
| 下層（`/about/`） | **10px**（`62.5%`） | 15px |

| 役割 | size | weight | letter-spacing | line-height | 実測 |
|------|------|--------|----------------|-------------|------|
| ヒーロー見出し | **68px** | **700** | **8.16px（0.12em）** | 1.32 | 12 要素（**1 文字 1 要素**） |
| 下層 h1 | 46px | 500 | 1.84px（0.04em） | — | |
| 英字セクション見出し（Lexend） | 54px | 600 | — | — | 5 要素（`Information` `Student` `Support`） |
| 下層の大見出し | 40px | 500 | 1.92px（0.048em） | 1.50 | 3 要素 |
| セクション見出し | 30px | 400 | normal | 1.67 | |
| 中見出し | 24px | 500 | 0.96px（0.04em） | 1.67 | 11 要素 |
| ニュース見出し | 20px | 500 | 0.6px（0.03em） | 1.60 | 11 要素 |
| ナビ大 | 17px | 500 | 0.68px（0.04em） | 1.53 | **82 / 52 要素** |
| 本文・リンク | 15px | 400 | normal | 2.00 | 46 / 28 要素 |
| ユーティリティ | 14px | 400 | 0.56px（0.04em） | 1.86 | 59 / 25 要素 |
| **メニューのリンク** | **13px** | **500** | **0.52px（0.04em）** | **1.38** | **274 要素で最多（2 ページとも同数）** |
| コピーライト | 12.2727px | 400 | — | — | 30 要素 |
| 縦組みタブ | 14px | 400 | **−0.56px（−0.04em）** | 2.00 | 4 要素 |

**ウェイトは 300 / 400 / 500 / 700 の 4 段。既定は 500**（400 / 373 要素）。
700 は**ヒーローの 12 文字だけ**。300 は `LANGUAGE` / `SEARCH` / `日本語` の 6 要素だけ。
**600 は Lexend 専用**（Noto Sans JP の `@font-face` に 600 は無いので、和文に 600 を当てると 700 で出る）。

### 3.5 行間・字間

- **`line-height` は無単位の比率。** 最多は **1.38（274 / 274 要素）** ＝ メガメニューのリンク。本文は **2.00**（69 / 30 要素）とゆったり、ナビは 1.53 / 1.86 / 1.67
- **`letter-spacing` は `em` を各要素が持つ型。** 0.04em が中心で、サイズに比例して px が変わる

| 宣言 | 実測 px | 当たる要素 |
|---|---|---|
| `0.04em` | 13px → **0.52px（274 要素で最多）** / 24px → 0.96px / 17px → 0.68px / 14px → 0.56px / 46px → 1.84px | メニュー・見出し・ナビ |
| `normal` | — | 本文（237 / 119 要素） |
| **`0.12em`** | 68px → **8.16px** | **ヒーロー見出しだけ** |
| `0.048em` | 40px → 1.92px | 下層の大見出し |
| `0.032em` | 40px → 1.28px | 下層のリード |
| `0.03em` | 20px → 0.6px | ニュース見出し |
| **`−0.04em`** | 14px → **−0.56px** | **縦組みタブだけ（唯一の負値）** |

> **ヒーローだけ 0.12em（8.16px）と大きく空け、縦組みタブだけ −0.04em と詰める。** それ以外は 0.04em か `normal` の 2 択

### 3.6 禁則処理・改行ルール

- `body` の `word-break` は **`normal`**。`break-all` も `auto-phrase` も使っていない
- **ヒーローの見出しは 1 文字ずつ `<span>` に割ってある**（`世` `界` `に` … が別要素で、各 68px / weight 700 / letter-spacing 8.16px）。文字ごとのアニメーションのためで、**`letter-spacing` が最後の文字の右にも効くので、行末に 8.16px の余白が残る**
- 下層の見出しは `<br>` で手改行している（`教育の理念` / `世界に学び、世界に貢献するグローバル理工学人材の育成`）

### 3.7 OpenType 機能

- **`palt` を `body` に 1 行だけ書いて全要素に配る。** 実測 **3993 要素（トップ）／ 2806 要素（下層）**
- 効果は本物（実スタック `"Noto Sans JP", sans-serif`・30px・weight 400 で実測）:

| 設定 | 幅 | 差 |
|---|---|---|
| `normal` | 906.64px | — |
| **`"palt"`** | **826.34px** | **−8.9%** |
| `"halt"` | 846.64px | −6.6% |
| `"pwid"` | 936.64px | +3.3% |
| `sans-serif`（比較） | 917.95px | — |

- **ただし縦組み 4 要素にも `palt` が降りている。** クロス集計は `"palt" @ horizontal-tb` **3993** ／ `"palt" @ vertical-rl` **4**。
  **横組み用の `palt` は縦組みでは無視される**（エラーも警告も出ない）。縦組みを詰めたいなら `vpal` / `vhal` / `vkrn` を使う。
  再現するときは `:not([style*="vertical"])` などで横組みに限るか、縦組み側で `font-feature-settings: "vpal"` に上書きする

### 3.8 縦書き

- **`vertical-rl` が 2 ページとも 4 要素。** 画面右端に固定された縦タブ（`アクセス` / `お問い合わせ` / `公開講座` / `寄付`）

| 項目 | 値 |
|---|---|
| `writing-mode` | `vertical-rl` |
| 書体 | `"Noto Sans JP", sans-serif` |
| size | 14px |
| line-height | 28px（**2.00**） |
| letter-spacing | **−0.56px（−0.04em）** |
| 面 | `#008482`（寄付のみ） / 白 |

- **縦組みは「縦に積む」のではなく「縦に流す」。** 右端の 1 本のバーに 4 つのタブを縦積みしている（親は `flex-direction: column`）。横並びではないので `row-reverse` は不要
- **縦組みだけ字間が負**（−0.04em）。横組みは 0.04em の正なので、**符号が逆**

---

## 4. Component Stylings

### Buttons

| 種類 | 面 | 文字 | radius | padding | size / weight |
|---|---|---|---|---|---|
| 主 CTA（一覧へ戻る） | `#008482` | `#ffffff` | **0** | `0` | 15px / 400 |
| ナビの箱（卒業生の方 など） | `#ffffff` | `#000000` | **6px** | `0 20px 0 30px` | 15px / 400 |
| 下層のメニュー箱 | `#ffffff` | `#000000` | **6px** | `14px 50px 14px 20px` | 15px / 400 |
| 枠だけ（大学概要 など） | 透明 | `#000000` | 6px | `0 20px 0 30px` | 15px / 400 |
| 寄付 | `#ffffff` | `#008482` | 8px | `16px 0` | 15px / 400 |

- **箱の枠は `1px solid #d7d7d7`**。面色のボタンは枠なし
- **padding が左右非対称**（`0 20px 0 30px` / `14px 50px 14px 20px`）。左にアイコン、右に矢印を絶対配置する前提

### Badges / Chips

| 種類 | 面 | 文字 | radius | padding | size / weight |
|---|---|---|---|---|---|
| セミナー・行事 | `#008482` | `#ffffff` | **3px** | `0 10px` | 14px / 400 |
| 連携・貢献／研究／お知らせ | `#4274b7` | `#ffffff` | 3px | `0 10px` | 14px / 400 |
| 専攻 | `#7e498b` | `#ffffff` | 3px | `0 10px` | 14px / 400 |

- **バッジだけ角丸 3px**（ボタンの 6px の半分）

### Inputs

| 項目 | 値 |
|---|---|
| 面 | `#ffffff` |
| border | `1px solid #d7d7d7` |
| radius | `6px`（検索は `20px`） |
| size / weight | 15px / 400 |
| 文字色 | `#000000` |

### Cards

| 項目 | 値 |
|---|---|
| 面 | `#ffffff` / `#fafafa` / `#f5f5f5` |
| radius | **6px**（58 / 23 要素で最多） |
| border | `1px solid #d7d7d7` |
| box-shadow | 使わない（サイト全体で 1 要素のみ） |
| 日付 | Inter 400 / `#646464` |
| 見出し | 20px / 500 / line-height 1.60 / letter-spacing 0.6px |

- **角丸の派生形を素直に使う**: `6px 6px 0 0`（タブの上端）／ `6px 0 0 6px`（横並びの左端）／ `0 30px 30px 0`（左端から伸びる帯）／ `10px 10px 0 0`（SVG の図版）

---

## 5. Layout Principles

### Spacing Scale

**`gap` に `%` を混ぜるのがこのサイトの特徴。**

| 値 | 件数 | 用途 |
|---|---|---|
| **`40px 2.92683%`** | 9 | カードグリッド（行は px、列は %） |
| `10px` | 9 | バッジ列・小さい並び |
| `20px 10px` | 6 | |
| `0 20px` | 1 | |
| `40px` | 1 / 6 | セクション内 |
| `0 5.12821%` / `40px 5.12821%` / `20px 2.5641%`（下層） | 各 1 | |
| `normal 28px` | 1 | |

> `2.92683%` = 1200px に対する 35.12px、`5.12821%` = 1200px に対する 61.54px。**列方向だけ % で、行方向は px 固定**

### Container

| 値 | 用途 |
|---|---|
| **`95%`** | ほぼ唯一のコンテナ指定。`max-width` の px 値を持たない |
| `--header-height: 80px` | ヘッダーの高さ（唯一の設計トークン） |

> **`max-width: 1200px` のような上限が無い。** 1920px でもコンテンツは 95% まで広がる

### Grid

- トップのニュース: 1 カラムのリスト（日付 Inter ＋ バッジ ＋ 見出し）
- メガメニュー: 多カラム（13px / 500 のリンクが 274 要素）
- 下層の項目: 2〜3 カラム（`gap: 40px 2.92683%`）
- 右端: 縦タブの固定バー（`writing-mode: vertical-rl`）

---

## 6. Depth & Elevation

**影をほぼ使わない。** 実測の `box-shadow` は 2 ページとも **1 種類・1 要素だけ**。

| 影 | 件数 | 用途 |
|---|---|---|
| `rgba(0, 0, 0, 0.5) 0px 5px 30px 0px` | 1 | オープニングのカーテン（`div.curtain`） |

- 奥行きは **`1px solid #d7d7d7` の枠線と `#f5f5f5` / `#fafafa` の面色**で作る
- `border-radius` は **6px が支配的**（58 / 23 要素）。次いで `50%`（アイコン 50 / 6 要素）、**3px（バッジ 26 要素）**、`5px`、`6px 6px 0 0`、`10px 10px 0 0`、`0 30px 30px 0`、`20px`（検索）、`8px`（寄付）
- トップには `div.cover`（`rgba(0,0,0,0.2)`）と `div.curtain`（`#000000`）が全画面（1440×?）で重なる**オープニング演出**がある。計測時にページ背景を黒と誤認させるので、**地色は白**

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` に `font-feature-settings: "palt"` を 1 行だけ書いて全要素に配る。** これがこのサイトの最大の特徴
- **ただし縦組みの要素では `vpal` に上書きする**（横組み用の `palt` は縦では無視される）
- **書体は `"Noto Sans JP", sans-serif` ＋ 英字ラベルに Lexend ＋ 日付・番号に Inter の 3 本**
- **Inter は `text=` で文字集合を絞って読む**: `css2?family=Inter:wght@400;600&display=swap&text=,0123456789ACEGHLNRSU`。日付と番号以外に使わない
- **本文の既定ウェイトは 500**（Noto Sans JP の `@font-face` は 300 / 400 / 500 / 700）
- **`letter-spacing` は 0.04em を既定にする。** 13px → 0.52px、17px → 0.68px、24px → 0.96px
- **ヒーローだけ 0.12em（68px → 8.16px）と大きく空ける**
- **縦組みタブだけ −0.04em と詰める**（符号が逆）
- **`line-height` はメニュー 1.38 / 本文 2.00 / ナビ 1.53〜1.86 / ヒーロー 1.32**
- **角丸は箱 6px、バッジ 3px、アイコン 50%**
- **影は使わない。** `1px solid #d7d7d7` と `#f5f5f5` の面で奥行きを作る
- グラデーションを使うときは**ノイズの SVG を重ねる**（2 枚重ねの `background-image`）
- コンテナは `95%`（`max-width` の px 上限を置かない）

### Don't（禁止）

- **縦組みに `palt` を当てない。** 実サイトは 4 要素でこれをやっているが、横組み用の軸なので**黙って無視される**。詰めたいなら `vpal`
- **和文に weight 600 を当てない。** `@font-face` が 300 / 400 / 500 / 700 なので 700 で出る（600 は Lexend 専用）
- **Inter で小文字・和文・記号を組まない。** `text=` で 21 文字しか配信されていないので `sans-serif` に落ちる
- **スキップリンクを素の `<a>` のまま置かない。** 実サイトは `目次` / `本文` / `芝浦工業大学` の 9 要素が **UA 既定の `#0000ee`** のまま
- **ヒラギノ・游ゴシック・メイリオをスタックに足さない**（実サイトのフォールバックは `sans-serif` ひとつ）
- **ルートを 1 つに決めつけない。** 実サイトはトップ 16px / 下層 10px の 2 世代が同居している。**`rem` で寸法を書くとページによって 1.6 倍ずれる**ので、px で書く
- **`body` の `font-size` を px 固定にしない。** 750px 以下で `3.4666666667vw` に切り替わる（8 章）
- **`box-shadow` を足さない**（サイト全体で 1 要素だけ）
- **`word-break: break-all` を足さない**（実サイトは `normal`）
- **設計トークンを前提にしない。** 実サイトの CSS 変数は `--header-height` ほか 3 個だけで、色もサイズも全部ハードコード

---

## 8. Responsive Behavior

### Breakpoints

**トップと下層でブレークポイントの書き方が違う（2 世代同居）。**

| ページ | 主なクエリ | 件数 |
|---|---|---|
| トップ | `print, screen and (min-width: 751px)` / `screen and (max-width: 750px)` / `screen and (min-width: 751px) and (max-width: 1280px)` | 各 3 |
| 下層 | `screen and (max-width: 1259px)` / `screen and (max-width: 959px)` / `screen and (max-width: 1519px)` / `screen and (max-width: 1399px)` | 328 / 138 / 25 / — |

- **トップはモバイルファーストの `min-width: 751px`、下層はデスクトップファーストの `max-width` 系**
- どちらのページでも**実際の崖は 751 / 750px**

### タッチターゲット

- メニューのリンクは 13px / `line-height: 1.38` ＋ `padding` で 44px 以上
- ナビの箱は `padding: 14px 50px 14px 20px` で高さ 48px 相当
- 縦タブは幅 40px 程度 × 文字数ぶんの高さ

### フォントサイズの調整

**`html` は固定（トップ 16px / 下層 10px）のまま、`body` だけが 750px を境に `vw` 流体へ切り替わる。**

```css
@media print, screen and (min-width: 751px) { body { font-size: 15px; } }
@media screen and (max-width: 750px)        { body { font-size: 3.4666666667vw; } }
```

実測（19 幅）:

| 幅 | `html`（トップ / 下層） | `body` | h1（トップ / 下層） |
|---|---|---|---|
| 1920 〜 **751px** | 16px / 10px | **15px**（固定） | 30px / 46px |
| **750px** | 16px / 10px | **26px** | **52px / 60px** |
| 430px | 16px / 10px | 14.9067px | 29.81px / 34.40px |
| **375px** | 16px / 10px | **13px** | 26px / 30px |
| 320px | 16px / 10px | 11.0933px | 22.19px / 25.60px |

> **751 → 750px で `body` が 15px → 26px、1px またいで 1.73 倍に跳ぶ**（モバイルのほうが大きい）。h1 も 30 → 52px（下層は 46 → 60px）。
> `3.4666666667vw` = **26 ÷ 750**。375px でちょうど 13px に着地するので、**モバイルの設計幅は 750px（= 375pt × 2 の 2 倍解像度カンバス）**。
> 規定の 4 幅（1440 / 1200 / 834 / 375px）では 834px も 375px も素直に見えるので、**崖が見えない**。

モバイル専用の見出しには、ほかにも `vw` の直書きが 8 種ある:
`10.6666666667vw` / `4.5333333333vw` / `4.2666666667vw` / `4vw` / `3.4666666667vw` / `3.2vw` / `2.9333333333vw` / `2.6666666667vw`
（どれも分母 750px のスケール。`4vw` = 30 ÷ 750、`10.6666666667vw` = 80 ÷ 750）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Deep Green:   #134e3b   （見出し・ナビ・面）
Teal:         #008482   （CTA・リンク・バッジ）
Category:     #4274b7（連携/研究/お知らせ） / #7e498b（専攻） / #9d2c3b（終了）
Text:         #000000（既定・364 要素） / #646464（補助） / #333333 / #969696
White:        #ffffff
Border:       #d7d7d7 ／ 区切り #cccccc
Surface:      #f5f5f5 / #fafafa
Gradient:     linear-gradient(270deg, #4aaed3 0, #4aaed3 6.41026%, #4ac4d3 23.8462%,
                              #89f2b8 76.1538%, #bef2dc 87.1795%, #bef2dc 100%) ＋ ノイズ SVG
Font (JP):    "Noto Sans JP", sans-serif        300 / 400 / 500 / 700
Font (EN):    Lexend, sans-serif                200 / 300 / 600
Font (数字):  Inter, sans-serif                 400 / 600（text= で 21 文字だけ配信）
Google Fonts: css2?family=Lexend:wght@200;300;600&family=Noto+Sans+JP:wght@300;400;500;700&display=swap
              css2?family=Inter:wght@400;600&display=swap&text=,0123456789ACEGHLNRSU
Root:         html トップ 16px / 下層 10px（2 世代）  body 15px（≥751px） → 3.4666666667vw（≤750px）
Base Weight:  500
Line Height:  1.38（メニュー・最多） / 2.00（本文） / 1.53〜1.86（ナビ） / 1.32（ヒーロー）
Letter Spacing: 0.04em（既定） / 0.12em（68px ヒーロー） / −0.04em（縦組みタブ） / normal（本文）
Border Radius: 6px（箱） / 3px（バッジ） / 50%（アイコン） / 8px（寄付） / 20px（検索）
Container:    95%（px の上限なし）  --header-height: 80px
Gap:          40px 2.92683%（行は px・列は %）
Shadow:       使わない
palt:         body に 1 行（全要素・実測 −8.9%）／ 縦組みには vpal
```

### プロンプト例

```
芝浦工業大学のデザインシステムに従って、大学紹介ページを作成してください。
- body に font-family: "Noto Sans JP", sans-serif / font-weight: 400 / font-feature-settings: "palt" を書き、
  全要素に継承させる（これがこのサイトの核心）
- ただし writing-mode: vertical-rl の要素では font-feature-settings: "vpal" に上書きする
- Google Fonts は 2 本読む:
  css2?family=Lexend:wght@200;300;600&family=Noto+Sans+JP:wght@300;400;500;700&display=swap
  css2?family=Inter:wght@400;600&display=swap&text=,0123456789ACEGHLNRSU
- Inter は日付（2026/11/13）と番号（1 2 3）だけに使う。小文字や和文には使わない
- 英字の見出し・ラベル（LANGUAGE / SEARCH / Information）は Lexend
- body は @media (min-width: 751px) で 15px、@media (max-width: 750px) で 3.4666666667vw
- ヒーロー見出しは 68px / weight 700 / letter-spacing 8.16px / line-height 1.32 / 白、
  1 文字ずつ <span> に割る
- メニューのリンクは 13px / weight 500 / letter-spacing 0.52px / line-height 1.38
- 本文は 15px / weight 400 / letter-spacing normal / line-height 2.00 / 色 #000000
- 中見出しは 24px / weight 500 / letter-spacing 0.96px / line-height 1.67
- ナビ大は 17px / weight 500 / letter-spacing 0.68px / line-height 1.53、色 #134e3b
- 画面右端に writing-mode: vertical-rl の固定タブを 4 つ縦に積む
  （14px / line-height 28px / letter-spacing -0.56px。「寄付」だけ背景 #008482）
- ボタンは白地 / border 1px solid #d7d7d7 / border-radius 6px / padding 14px 50px 14px 20px / 15px
- バッジは背景 #008482・#4274b7・#7e498b / 白文字 / border-radius 3px / padding 0 10px / 14px
- カードは白地 / border 1px solid #d7d7d7 / border-radius 6px、box-shadow は使わない
- グラデーションを使うときは linear-gradient(270deg, #4aaed3 0, ...) にノイズ SVG を重ねる
- 和文に weight 600 を当てない（@font-face に無いので 700 で出る）
- コンテナは 95%、カードグリッドの gap は 40px 2.92683%
- word-break は normal
```
