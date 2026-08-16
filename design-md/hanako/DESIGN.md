# DESIGN.md — Hanako Web（ハナコ）

> マガジンハウス『Hanako』の公式サイト Hanako Web（https://hanako.tokyo/）のデザイン仕様書。
> 1988 年創刊の女性誌。Web 版は WordPress 上に構築され、FOOD / TRAVEL / FORTUNE / HEALTH / LEARN / MAMA / SUSTAINABLE / CULTURE / WORK&MONEY の 9 カテゴリを持つ。
> 最大の特徴は、**`--theme-color` という 1 つの CSS 変数を差し替えるだけでページ全体の面色が切り替わる「6 色のパステル・テーマシステム」**。ペールグリーン / ペールオレンジ / ペールレッド / ペールブルー / ペールイエロー / ペールパープルの 6 色が `--theme-color-1` 〜 `-6` として定義され、カテゴリごとに 1 色が `--theme-color` に代入される。
> 和文は **游ゴシック体を先頭**に置く和文優先スタック、欧文見出しは **Montserrat**。**`letter-spacing: 0.03em` がグローバル**、`palt` は見出し・ナビにだけ掛ける。**`font-weight: 300`（Light）を UI に多用する**のも珍しい。
> 実サイトの computed style 実測（2026-08-16 取得。トップページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **写真が主役、UI は白と淡色の余白**。彩度の高い色を UI に一切使わず、パステル 6 色の面と白だけで構成する。線は細く、ボタンはすべて枠だけのゴーストピル
- **Hanako について**: 「おいしい」「どこ行く？」が主戦場のライフスタイル誌。**料理・旅・雑貨の写真が画面の 7 割を占める**ため、UI は徹底して引く設計になっている
- **密度**: 低〜中密度・メディア型。ヒーロー 3 枚 → New Articles → Videos → Ranking → Community と、セクションごとに面色を替えて縦に積む
- **キーワード**: 6 色パステルのテーマ変数、游ゴシック優先、Montserrat の欧文見出し、weight 300、ゴーストピル、ls 0.03em グローバル
- **特徴**:
  - **`--theme-color` を差し替えるだけでページ全体の面色が変わる**。6 色（`--theme-color-1` 〜 `-6`）から 1 色を選び、セクション背景・区切り面に流す。トップページは `#dbe8e8`（ペールブルー）
  - **ボタンに面色を持たせない**。「View More」「FOLLOW US!」はすべて **`1px solid` の枠だけのピル**。塗りボタンはランキングの選択タブ（黒）だけ
  - **`font-weight: 300`（Light）を UI に使う**。「View More」ボタン、フッター、ハンバーガー、入力欄がすべて 300。**軽さが Hanako のトーン**
  - **`letter-spacing: 0.48px`（16px に対し 0.03em）がグローバル**。見出しは 0.64px / 0.72px（0.04em）まで開く
  - **`font-feature-settings: "palt"` は見出し・ナビ・タグにだけ掛け、本文には掛けない**
  - **欧文見出しは Montserrat 単独**（`Montserrat, sans-serif`）で、和文を挟まない。`New Articles` `Videos` `RANKING` などのセクション名がこれ
  - 濃色セクションが 3 種：**ブルーグレー `#6f7f89`（Videos）／シルバー `#adb8c3`（Community）／ダークグレー `#333333`（フッター）**
  - 記事メタ（日付）は Montserrat 14px の **シルバー `#adb8c3`**。本文の黒との差を大きく取る

---

## 2. Color Palette & Roles

> CSS Custom Properties として整理されている。**6 色のパステルが `--theme-color-1` 〜 `-6` に、選択中の 1 色が `--theme-color` に入る**構造。

### Theme Colors（6 色パステル／カテゴリごとに切り替わる）

| 変数 | 値 | 名前 |
|------|----|------|
| `--theme-color-1` / `--c-pale-green` | `#e3e8d3` | ペールグリーン |
| `--theme-color-2` / `--c-pale-orange` | `#f8ecd9` | ペールオレンジ |
| `--theme-color-3` / `--c-pale-red` | `#f2e5e2` | ペールレッド |
| `--theme-color-4` / `--c-pale-blue` | `#dbe8e8` | ペールブルー |
| `--theme-color-5` / `--c-pale-yellow` | `#f8f8ed` | ペールイエロー |
| `--theme-color-6` / `--c-pale-purple` | `#f2edf5` | ペールパープル |

- **`--theme-color` に上記のいずれかが代入される**。トップページは `#dbe8e8`（= `--theme-color-4`）
- セクション背景（New Articles / POPULAR TAGS など）と区切り面に流す
- **どれも明度が非常に高く彩度が低い**。写真の色を邪魔しないための設計

### Neutral（面・罫・文字）

- **Background** (`#ffffff` / `--theme-color-background`): ページ地色
- **Ink** (`#000000` / `--c-black`): `body` と記事タイトルの文字色。**Hanako は本文に純黒を使う**
- **Dark Gray** (`#333333` / `--c-dark-gray` / `--theme-color-black`): 見出し（`h4`）・ボタンの枠と文字・**フッターの面色**
- **Gray** (`#707070` / `--theme-color-grey`): 補助テキスト
- **Light Gray** (`#a3a3a3` / `--theme-color-light`): 非選択タブの枠と文字
- **Silver** (`#adb8c3` / `--c-silver` / `--theme-color-mask`): **記事の日付・メタ情報の文字色**、ロゴ、および「Join our Community」セクションの面色
- **Blue Gray** (`#6f7f89` / `--c-blue-gray` / `--theme-color-background-dark`): **Videos セクションの濃色面**。白抜き文字を載せる
- **Pale Gray** (`#d7dce1` / `--c-pale-gray`): 区切り線・淡い面
- **Light Gray BG** (`#eeeeee` / `--c-light-gray`): 汎用の薄面

### Accent（差し色）

- **Accent Blue** (`#5889ac`, rgb 88,137,172): 「Today I feel...」フローティングバーの面色、「Old Issue」ボタンの枠と文字。**サイト唯一の彩度を持つ色で、点でしか使わない**

### Semantic（意味的な色）

- Hanako は雑誌メディアのため意味色が前面に出ない
- **Info**: アクセントブルー `#5889ac` を流用
- **Danger／Error**: `#cf2e2e`（WordPress プリセットの vivid-red）を用いる
- **Success**: パステルの `--theme-color-1` `#e3e8d3` を面に使う

---

## 3. Typography Rules

> **和文は游ゴシック体を先頭に置く和文優先スタック**、**欧文見出しは Montserrat 単独**。`letter-spacing: 0.03em` がグローバル、`palt` は見出し・ナビにだけ。**`font-weight: 300` を UI に多用する**のが Hanako の軽さを作っている。

### 3.1 和文フォント

- **ゴシック体**: **游ゴシック体**（`游ゴシック体` → `"Yu Gothic"` → `YuGothic`）を先頭に置き、以降 **ヒラギノ角ゴ Pro → メイリオ → MS Pゴシック** と繋ぐ
- **ヒラギノは Pro（ProN ではない）**。`"ヒラギノ角ゴ Pro"` / `"Hiragino Kaku Gothic Pro"` の 2 表記を並べる
- **Web フォントを一切使わない**。OS 搭載フォントだけで組む（写真の読み込みを優先する判断）
- 明朝体は使わない
- **Windows の游ゴシック問題**: 游ゴシックは Windows で Regular（400）が細く見える。Hanako は `font-weight: 300` を多用するため、Windows では**さらに細く落ちる**。実装時は Windows 向けに 300 → 400 へ引き上げるフォールバックを検討すること

### 3.2 欧文フォント

- **サンセリフ**: **Montserrat**。2 通りの使い分けがある
  - **`Montserrat, sans-serif`（単独）**: 欧文だけのセクション見出し（`Hanako Magazine Official` `Join our Community`）と日付
  - **`Montserrat, 游ゴシック体, …`（和文を後続）**: 和欧混じりの見出し・ラベル（`New Articles` `Hanako Magazine` `DAILY`）
- 等幅フォントの指定はない

### 3.3 font-family 指定

```css
/* 本文・UI（和文優先） */
font-family: 游ゴシック体, "Yu Gothic", YuGothic, "ヒラギノ角ゴ Pro",
             "Hiragino Kaku Gothic Pro", メイリオ, Meiryo,
             "MS Pゴシック", "MS PGothic", sans-serif;

/* 和欧混じりの見出し・ラベル */
font-family: Montserrat, 游ゴシック体, "Yu Gothic", YuGothic, "ヒラギノ角ゴ Pro",
             "Hiragino Kaku Gothic Pro", メイリオ, Meiryo,
             "MS Pゴシック", "MS PGothic", sans-serif;

/* 欧文のみのセクション見出し・日付 */
font-family: Montserrat, sans-serif;

/* グローバル */
letter-spacing: 0.03em;   /* 16px に対し 0.48px */
```

**フォールバックの考え方**:
- **和文を先頭**に置く（游ゴシック体）。日本語の表示品質を優先する方針
- 欧文が主体のときだけ **Montserrat を先頭**に差し替える。**3 種類のスタックを用途で使い分ける**
- 游ゴシックは 3 表記（`游ゴシック体` / `"Yu Gothic"` / `YuGothic`）を並べて環境差を吸収する
- ヒラギノは **Pro**。ProN と混同しない

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | palt | 備考 |
|------|------|------|--------|-------------|----------------|------|------|
| Section Head (EN) | **Montserrat 単独** | 30px | 400 | 1.0–1.2 | 0.016em (0.48px) | ✓ | `Hanako Magazine Official`（白文字） |
| Section Head | Montserrat + 和文 | 26px | 400 | 1.2 (31.2px) | 0.018em (0.48px) | — | `New Articles` |
| Article Title | 和文 | 18px | **700** | **1.75 (31.5px)** | 0.04em (0.72px) | — | 記事タイトル。**サイトで唯一の 700** |
| Lead | 和文 | 20.16px | 400 | 1.4 (28.2px) | 0.024em (0.48px) | — | リード文 |
| Sub Head | Montserrat + 和文 | 16px | 400 | 1.2 (19.2px) | 0.04em (0.64px) | ✓ | `h4`「Hanako Magazine」「Videos」 |
| Body | 和文 | 16px | 400 | **1.55 (24.8px)** | 0.03em (0.48px) | — | `body` 既定 |
| Nav | 和文 | 16px | 400 | 1.0 (16px) | 0.03em (0.48px) | ✓ | グローバルナビ「FOOD おいしい」 |
| Meta / Date | **Montserrat 単独** | 14px | 400 | 1.6 (22.4px) | normal | ✓ | 日付。**色 `#adb8c3`** |
| Tag | 和文 | 14px | 400 | 1.0 (14px) | 0.034em (0.48px) | ✓ | `#手土産` などのタグピル |
| Button | 和文 | 15px | **300** | 1.5 (22.5px) | normal | — | 「View More」 |
| Button (EN) | Montserrat + 和文 | 12px | **600** | 1.0 (12px) | **0.083em (1px)** | — | 「Follow us!」 |
| Nav Sub | 和文 | 10px | 400 | 1.5 (15px) | 0.048em (0.48px) | ✓ | ナビ下層 |
| Ranking Label | Montserrat + 和文 | 10px | 400 | 1.55 (15.5px) | 0.048em (0.48px) | — | `DAILY` / `WEEKLY` / `MONTHLY` |
| Footer Note | 和文 | 11px | **300** | 1.6 (17.6px) | 0.044em (0.48px) | — | 注記（白文字） |
| Footer Small | 和文 | 10px | **300** | 1.6 (16px) | 0.048em (0.48px) | — | 著作権表記 |

- **`font-weight: 700` が出るのは記事タイトル（18px）だけ**。それ以外は 400 か 300
- **`font-weight: 300` が UI の広い範囲（ボタン・フッター・入力欄・ハンバーガー）に使われる**。これが Hanako の軽さの正体
- `letter-spacing` は **px 固定 0.48px** で書かれているため、**サイズが小さいほど相対的に広がる**（10px なら 0.048em）。小さい文字ほど字間が開く設計

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.55**（16px→24.8px）。記事タイトルは **1.75**（18px→31.5px）と最も開く
- **見出しの行間**: **1.0〜1.2**（30px→30px / 26px→31.2px / 16px→19.2px）と締める
- **字間 (letter-spacing)**: **グローバルに 0.48px**（16px 基準で 0.03em）。見出し・記事タイトルは 0.64px / 0.72px（0.04em）、欧文ボタンは 1px（0.083em）
- **palt は見出し・ナビ・タグ・日付にだけ掛け、本文には掛けない**

**ガイドライン**:
- **見出しは締めて（1.0〜1.2）、記事タイトルは開く（1.75）**。この落差が Hanako のリズム
- 字間は px 固定で 0.48px を保つ。**em に変換して一律にしない**（小さい文字ほど開くのが意図）
- 本文 16px / 行間 1.55 を守る。写真キャプションでも 14px を下回らない

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 記事タイトルに **`【福島】`「ままどおる」** のような括弧・鉤括弧が頻出する。`word-break: break-all` にすると括弧が行頭に来るため使わない
- タイトルは 2〜3 行で折り返す前提。`line-height: 1.75` が効くのはこのため

### 3.7 OpenType 機能

```css
/* 見出し・ナビ・タグ・日付 */
font-feature-settings: "palt";

/* 本文 */
font-feature-settings: normal;
```

- **`palt` の適用先が明確に分かれる**。見出し（`h3` / `h4`）・グローバルナビ・タグピル・日付には掛け、**本文と記事タイトルには掛けない**
- 見出しは字面を詰めて塊として見せ、読ませるテキストは等幅のまま `letter-spacing` で開く、という使い分け

### 3.8 縦書き

- 該当なし。UI・記事とも横組み

---

## 4. Component Stylings

> **ボタンは原則「枠だけ」**。塗りボタンはランキングの選択タブ 1 種のみ。

### Buttons

**Primary（ゴーストピル）— 主要 CTA**
- Background: `transparent`
- Text: `#333333`
- Border: `1px solid #333333`
- Border Radius: `43.5px`（高さいっぱいの完全な丸端）
- Padding: `15px 30px`
- Font: 和文 / 15px / **weight 300** / ls normal
- 例: 「View More」
- 濃色セクション上では Text / Border を `#ffffff` に反転する

**Secondary（欧文ゴーストピル）**
- Background: `transparent`
- Text: `#333333` / Border: `1px solid #333333`
- Border Radius: `999px`
- Padding: `10px 20px`
- Font: Montserrat / 14px / weight 500 / **ls 1.4px（0.1em）**
- 例: 「FOLLOW US!」

**Accent（アクセントブルー）**
- Background: `#ffffff`
- Text: `#5889ac` / Border: `1px solid #5889ac`
- Border Radius: `99px`
- Padding: `8px 10px`
- Font: 11px / weight 400
- 例: 「Old Issue」

### Tabs（ランキング切替）

**Active（塗り）**
- Background: `#000000` / Text: `#ffffff`
- Border: `1px solid #000000` / Border Radius: **`5px`**
- Padding: `0 10px` / Font: Montserrat + 和文 / 10px / weight 400
- 例: 「DAILY」

**Inactive（枠）**
- Background: `transparent` / Text: `#a3a3a3`
- Border: `1px solid #a3a3a3` / Border Radius: `5px`
- 例: 「WEEKLY」「MONTHLY」
- **タブだけが角丸 5px の矩形**。ほかのボタンはすべてピル

### Tags

- Background: `#ffffff` / Text: `#000000`
- Border: なし
- Border Radius: `99px`
- Padding: `12px 16px`
- Font: 14px / weight 400 / ls 0.48px / `palt`
- 例: 「#手土産」「#シュークリーム」
- **パステル面（`--theme-color`）の上に白いピルを置く**のが定型

### Cards（記事）

- Background: `transparent`（親セクションの面色を透かす）
- Border: なし / Border Radius: `0`（**画像は角丸なしの矩形**）
- 構成: 画像 → タイトル（18px / 700 / lh 1.75）→ カテゴリ ｜ 日付（Montserrat 14px / `#adb8c3`）
- Shadow: なし

### Inputs

- Background: `#ffffff`
- Border: `1px solid #d7dce1`
- Border Radius: `5px`
- Padding: `12px 16px`
- Font: 和文 / 15–16px / **weight 300**
- Text: `#333333` / Placeholder: `#a3a3a3`

### Sections（面色の使い分け）

| セクション | 面色 | 文字色 |
|-----------|------|--------|
| 記事一覧・タグ | `--theme-color`（例 `#dbe8e8`） | `#000000` |
| Videos | `#6f7f89`（ブルーグレー） | `#ffffff` |
| Join our Community | `#adb8c3`（シルバー） | `#ffffff` |
| Footer | `#333333`（ダークグレー） | `#ffffff` |
| Today I feel...（固定バー） | `#5889ac`（アクセントブルー） | `#ffffff` |

---

## 5. Layout Principles

### Spacing Scale

CSS 変数として定義されている。

| Token | 変数 | Value |
|-------|------|-------|
| Section Gap | `--theme-section-gap` | `5rem`（80px） |
| Block Gap | `--theme-block-gap` | `3rem`（48px） |
| Grid Gap | `--theme-grid-gap` | `3rem`（48px） |
| XS | — | 8px |
| S | — | 16px |
| M | — | 24px |

- **セクション間 80px、ブロック間 48px、グリッドの溝 48px**。溝が広いのがメディアらしい余白設計

### Container

- **Section Max Width**: `--theme-section-max-width` = **74rem（1184px）**
- **本文カラム幅**: `--theme-p-max-width` = **48rem（768px）**
- WordPress 側: `--wp--style--global--content-size` = **800px** / `--wp--style--global--wide-size` = **1280px**
- Padding (horizontal): 16〜24px

### Grid

- ヒーローは 3 カラム（画像のアスペクトは縦長・横長を混在させる）
- New Articles は 2 カラム + サイドバー（雑誌カバー・バナー）
- Gutter: 48px（`--theme-grid-gap`）
- **画像は角丸なし。矩形のまま並べる**

---

## 6. Depth & Elevation

**フラット。影を使わない。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。カード・ボタン・タグすべて |
| 1 | `0 6px 9px rgba(0,0,0,0.2)` | WordPress プリセット（`--wp--preset--shadow--natural`）。**Hanako の UI では使っていない** |

- WordPress のプリセット影（`natural` / `deep` / `sharp` / `outlined` / `crisp`）は変数としては存在するが、**実際のページでは適用されていない**
- 奥行きは **白 × 6 色パステル × ブルーグレー `#6f7f89` × シルバー `#adb8c3` × ダークグレー `#333333`** の面のコントラストだけで作る
- 写真そのものが最大の「面」であり、そこに影を足さない

---

## 7. Do's and Don'ts

### Do（推奨）

- **面色は `--theme-color` 経由で参照する**。6 色（`#e3e8d3` `#f8ecd9` `#f2e5e2` `#dbe8e8` `#f8f8ed` `#f2edf5`）から 1 色を選び、カテゴリで切り替える
- 和文は **游ゴシック体を先頭**に置く。欧文が主体のときだけ Montserrat を先頭に差し替える
- **ボタンは枠だけのピル**にする（`1px solid` / radius 43.5px 〜 999px）
- `font-weight: 300` を UI（ボタン・フッター・入力欄）に使い、軽さを出す
- 記事タイトルだけ **700 / 18px / line-height 1.75** で重くする
- `letter-spacing: 0.48px` をグローバルに効かせる（**px 固定のまま**）
- `palt` は見出し・ナビ・タグ・日付にだけ掛ける
- 日付・メタは Montserrat 14px の **シルバー `#adb8c3`** に沈める
- 濃色セクションは `#6f7f89` → `#adb8c3` → `#333333` の 3 段を使い分ける
- **画像は角丸なしの矩形**で並べる

### Don't（禁止）

- **ボタンに面色を塗らない**（例外はランキングの選択タブ `#000000` のみ）
- 彩度の高い色を UI に使わない（アクセントブルー `#5889ac` を点で使うのが上限）
- **影を落とさない**（WordPress プリセットの影が変数にあっても使わない）
- 画像に `border-radius` を付けない
- 本文に `palt` を掛けない
- `letter-spacing` を em に変換して一律にしない（px 固定 0.48px が意図。小さい文字ほど開く）
- 記事タイトル以外に `font-weight: 700` を使わない
- Web フォントを追加しない（OS 搭載フォントで組むのが方針）
- ヒラギノを ProN と書かない（**Pro** が正しい）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。グローバルナビはハンバーガー（`header-menu-button`）に格納 |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 3 カラム＋最大 1184px（本文カラム 768px） |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- 「View More」は `padding: 15px 30px` + 15px の行で 52px 相当の高さを確保している
- タグピルは `padding: 12px 16px` で 38px。モバイルでは上下パディングを 14px に上げること

### フォントサイズの調整

- 本文 16px は据え置き（モバイルでも下げない）
- Section Head 30px → 22〜24px、26px → 20px 程度に縮小
- 記事タイトル 18px は据え置き。**行間 1.75 を維持する**（モバイルほど折り返しが増えるため）
- `letter-spacing: 0.48px` はモバイルでも維持する
- `font-weight: 300` は小サイズで潰れやすい。**モバイルの 10〜11px は 400 に上げてよい**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff （--theme-color-background）
Theme Colors:   --theme-color-1 #e3e8d3（ペールグリーン）
                --theme-color-2 #f8ecd9（ペールオレンジ）
                --theme-color-3 #f2e5e2（ペールレッド）
                --theme-color-4 #dbe8e8（ペールブルー）
                --theme-color-5 #f8f8ed（ペールイエロー）
                --theme-color-6 #f2edf5（ペールパープル）
                → 1 色を --theme-color に代入してページ全体に流す
Text:           #000000（本文・記事タイトル） / #333333（見出し・ボタン）
Meta:           #adb8c3 （日付・シルバー）
Dark Sections:  #6f7f89（Videos） / #adb8c3（Community） / #333333（フッター）
Accent:         #5889ac （点でのみ使用）
Border:         #d7dce1（罫・入力欄） / #333333（ボタン枠） / #a3a3a3（非選択タブ）
JP Font:        游ゴシック体, "Yu Gothic", YuGothic, "ヒラギノ角ゴ Pro",
                "Hiragino Kaku Gothic Pro", メイリオ, Meiryo,
                "MS Pゴシック", "MS PGothic", sans-serif
EN Font:        Montserrat, sans-serif（欧文見出し・日付）
Body Size:      16px / weight 400 / lh 1.55（24.8px）
Article Title:  18px / weight 700 / lh 1.75 / ls 0.04em
Light UI:       weight 300（ボタン・フッター・入力欄）
Letter Spacing: 0.48px（px 固定。グローバル） / 見出しは 0.64–0.72px
Feature:        font-feature-settings: "palt"（見出し・ナビ・タグ・日付のみ）
Radius:         43.5px / 999px（ボタン・タグのピル） / 5px（タブ・入力欄） / 0（画像）
Shadow:         なし
Container:      1184px（--theme-section-max-width） / 768px（本文カラム）
Gaps:           section 80px / block 48px / grid 48px
```

### プロンプト例

```
Hanako Web のデザインシステムに従って、FOOD カテゴリの記事一覧ページを作成してください。
- 和文は 游ゴシック体, "Yu Gothic", YuGothic, "ヒラギノ角ゴ Pro", メイリオ… の和文優先スタック
- 欧文のセクション見出し（New Articles など）と日付は Montserrat, sans-serif
- セクションの面色は --theme-color を定義して参照する。FOOD には --theme-color-1 #e3e8d3 を割り当てる
- 地は白 #ffffff、テキストは #000000、見出しとボタンは #333333、日付は #adb8c3
- 本文 16px / weight 400 / line-height 1.55、letter-spacing 0.48px（px 固定でグローバル）
- 記事タイトルは 18px / weight 700 / line-height 1.75 / letter-spacing 0.72px（palt は掛けない）
- 見出し・ナビ・タグ・日付にだけ font-feature-settings: "palt" を掛ける
- ボタンは面色を持たせず、1px solid #333333・border-radius 43.5px のゴーストピル
  文字は 15px / weight 300（「View More」）
- タグは白い面の border-radius 99px ピル、padding 12px 16px、14px / weight 400
- ランキングのタブだけ塗り（選択 = #000000 の面に白文字、非選択 = #a3a3a3 の枠）で radius 5px
- Videos セクションは #6f7f89、Community は #adb8c3、フッターは #333333 の面に白抜き文字
- 画像に border-radius を付けない。影も一切使わない
- コンテナ幅 1184px、本文カラム 768px、セクション間 80px・グリッドの溝 48px
```
