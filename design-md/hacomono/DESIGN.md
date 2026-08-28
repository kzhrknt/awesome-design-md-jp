# DESIGN.md — hacomono

> hacomono（https://www.hacomono.jp/）のデザイン仕様書。
> フィットネスジム・スクール・公共施設向けの**会員管理／予約／決済 SaaS** のサービスサイト。
> **有彩色を 1 色も持たない完全モノクローム**。`template.css`（390KB）に現れる色は `#fff` `#1a1a1a` `#d2d2d2` `#eff1f4` `#767676` `#f7f6f6` `#e9ebee` … と**すべて無彩色**で、青も緑も赤も 1 回も出てこない。色は写真とプロダクト UI のスクリーンショットだけが持つ
> **和文の `font-family` 宣言は CSS 全体でたった 1 つ**。`"Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体", sans-serif` ——**Web フォントを使わず游ゴシック 1 本**で組む
> **影はブラーを持たない**。`box-shadow: 20px 20px 0 0 #F7F6F6` のように**面をずらして重ねる**のが既定で、ぼかした影は全 CSS で 2 か所しかない
> **CSS Custom Property は全部が罠**。`--color-base-primary: #012677`（濃紺）も `--border-radius-button: 200px`（ピル）も `--font-family-ja: YakuHanJP, "Noto Sans JP"…` も、**LeadGrid という埋め込み CMS のテーマ既定値**であって hacomono 本体では 1 か所も使われていない（第 2 節末に詳述）
> 実サイトの computed style 実測（2026-08-27 取得。トップ ＋ 機能ページ `/function/`）＋ `template.css` の直接 grep に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白とグレーだけで階層を作る**。ブランド色で誘導するのではなく、`#1a1a1a` のほぼ黒い塗りボタンと `#eff1f4` の薄い面、そして余白の量だけで「どこを見るか」を決めさせる。SaaS のサービスサイトとしては珍しく、**彩度が完全にゼロ**
- **hacomono について**: 店舗・施設・スクールの入会・予約・決済・会員管理をオンラインで完結させる業務システム。導入対象がジム／スクール／公共施設と幅広いため、**業種の色（フィットネス＝赤、スクール＝青、のような連想）を UI 側で持たない**設計になっている
- **密度**: **中**。1200px（`75rem`）のコンテナに大きめの余白を取り、カードは 6px の角丸で細かく刻まない。本文は 14〜15px と小さめだが行間を 1.6〜1.7 取って詰まらせない
- **キーワード**: モノクローム、游ゴシック 1 本、6px の角丸、ブラーなしのオフセット影、`letter-spacing: 0.04em` の見出し、写真だけが色を持つ
- **特徴**:
  - **有彩色ゼロ**。`template.css` 中の色指定は `#fff`（100 回）`#1a1a1a`（90 回）`#d2d2d2`（39 回）`#eff1f4`（30 回）`#767676`（23 回）`#f7f6f6`（21 回）`#e9ebee`（11 回）`#f2f2f2`（8 回）`#818181`（6 回）`#dadada` `#4f4f4f`（各 4 回）`#ebedef` `#d9d9d9`（各 3 回）で、**有彩色は 1 つも無い**
  - **主 CTA と副 CTA を「濃さ」で分ける**。「資料・デモを見る」は `#1a1a1a`、「お問い合わせ」は `#767676`。**同じ形・同じ大きさで、明度差だけが優先度を表す**
  - **影がブラーを持たない**。`box-shadow: 20px 20px 0 0 #F7F6F6` / `1.25rem 1.25rem 0 0 #EFF1F4` ——**単色の面を右下 20px にずらして敷く**「版ズレ」風の表現。ぼかした影（`0px 4px 24px rgba(0,0,0,0.25)`）は全 CSS で 2 回だけ
  - **和文は游ゴシックのみ**。`font-family` 宣言は CSS 全体で 4 つしかなく（うち 2 つは `monospace`、1 つは `inherit`）、**和文スタックは 1 本きり**。ヒラギノも Noto Sans JP も指定していない
  - **`letter-spacing: 0.04em` は見出し専用**。CSS 上 17 回宣言されており、実測でも 40px 見出しが `1.6px`、28px 見出しが `1.12px` ＝いずれも **0.04em**。**本文は `normal`**
  - **`font-feature-settings` は全要素 `normal`**。**`palt` を使わない**
  - **ブレイクポイントが実質 1 本**。`@media screen and (max-width: 767px)` が **739 回**で、他は 10 回程度。**768px を境に 2 レイアウト**しか持たない

---

## 2. Color Palette & Roles

> 地は白ではなく**淡いグレー**。`pageBackground.resolved` はトップが `rgb(233,235,238)` ＝ `#e9ebee`（根拠 `viewportTopBySample (4/6)`）、機能ページが `rgb(247,246,246)` ＝ `#f7f6f6`（同 `4/8`）。**白 `#ffffff` はページ地ではなくカードの面**。

### Brand（ブランド）

- **hacomono Black** (`#1a1a1a`, rgb 26,26,26): **主色**。CSS 出現 **90 回**。主 CTA の面、本文と見出しの文字色、アウトラインボタンの罫。**この 1 色がブランドカラーの役割を全部担う**
- **Secondary Gray** (`#767676`, rgb 118,118,118): **副 CTA の面**（「お問い合わせ」）。23 回。**主 CTA と形は同一で、明度だけを落とす**
- **Text Gray** (`#4f4f4f`, rgb 79,79,79): タグチップの文字。4 回
- **Muted** (`#818181`, rgb 129,129,129): 補助テキスト。6 回

### Neutral（ニュートラル）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| 文字（主） | **`#1a1a1a`** | 26,26,26 | `body` の既定色。見出し・本文とも同じ |
| 文字（淡） | **`#b0b0b0`** | 176,176,176 | 機能ページのパンくず・注記（12px） |
| 罫 | **`#d2d2d2`** | 210,210,210 | 区切り線・カードの枠。**CSS 出現 39 回で無彩色のうち 3 番目** |
| 罫（淡） | **`#d9d9d9`** | 217,217,217 | 補助罫。3 回 |

### Surface（面色）

| 面 | 色 | rgb | 用途 |
|----|-----|-----|------|
| ページ地（トップ） | **`#e9ebee`** | 233,235,238 | ヒーロー周りの地。11 回 |
| ページ地（下層） | **`#f7f6f6`** | 247,246,246 | 機能ページ等の地。**わずかに赤みがある灰**。21 回 |
| パネル | **`#eff1f4`** | 239,241,244 | カード・フッター・ナビカードの面。**30 回で最頻の面色**。`#e9ebee` よりわずかに明るく青みが強い |
| カード | **`#ffffff`** | 255,255,255 | 記事カード・アウトラインボタンの地。100 回 |
| 汎用灰 | **`#f2f2f2`** | 242,242,242 | 画像プレースホルダ等。8 回 |
| チップ | **`#dadada`** | 218,218,218 | タグチップ（`#パーソナルジム` 等）の面。4 回 |
| 影用 | **`#ebedef`** | 235,237,239 | オフセット影に使う面。3 回 |

> **`#e9ebee` / `#eff1f4` / `#ebedef` / `#f2f2f2` / `#f7f6f6` は近接した 5 つの灰**で、区別を諦めて 1 色に丸めると版面の階層が崩れる。**地 → パネル → カード**の 3 段だけは必ず守る。

### ⚠️ CSS Custom Property は使ってはいけない

抽出された `customProperties` には**もっともらしいブランドトークンが並ぶが、hacomono 本体は 1 つも使っていない**。すべて `sdk.gig.goleadgrid.com` から読み込まれる **LeadGrid（CMS）のテーマ既定値**で、HTML 中に `leadgrid` の文字列が 143 回出現する。

| 宣言されている変数 | 値 | 実装 |
|---|---|---|
| `--color-base-primary` | `#012677`（濃紺） | **未使用**。HTML 中の `012677` は宣言の 1 回のみ |
| `--color-base-secondary` | `#FDD247`（黄） | **未使用** |
| `--color-base-footerBackground` | `#011748`（濃紺） | **未使用**。実際のフッターは `#eff1f4` |
| `--border-radius-button` | `200px`（ピル） | **未使用**。実装は **6px**（`0.375rem`） |
| `--font-family-ja` | `YakuHanJP, "Noto Sans JP", …` | **未使用**。実装は游ゴシック 1 本 |
| `--leadgrid-*`（70 個以上） | `calc(N / 1440 * 100vw)` 形式 | LeadGrid のセクションテンプレート専用 |

**変数を見て実装すると、紺と黄のピル UI という別物のサイトができあがる。** 必ず computed style（本ファイルの値）に従うこと。
`yakuhanjp.min.css` も CDN から読み込まれているが、`template.css` の和文スタックに `YakuHanJP` は含まれない ——**約物半角は効いていない**。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **游ゴシック 1 本**（`"Yu Gothic"` → `"游ゴシック"` → `YuGothic` → `"游ゴシック体"`）
- **明朝体**: 使用しない
- Web フォントを読み込まないため、**表示は OS 依存**。macOS では游ゴシック、Windows では Yu Gothic（後述の Medium 問題に注意）

### 3.2 欧文フォント

- **サンセリフ**: 専用指定なし。**游ゴシックに内蔵された欧文グリフをそのまま使う**（`sans-serif` に落ちるのは游ゴシック非搭載環境のみ）
- **等幅**: `monospace, monospace`（normalize 由来。UI では使用しない）

### 3.3 font-family 指定

```css
/* サイト全体（これ 1 つだけ。CSS 全体で和文スタックはこの宣言のみ） */
font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体", sans-serif;
```

**フォールバックの考え方**:
- **和文優先・欧文指定なし**。数字やアルファベットも游ゴシックの欧文グリフで組む
- 4 つの別名（`"Yu Gothic"` / `"游ゴシック"` / `YuGothic` / `"游ゴシック体"`）を並べるのは、**Windows と macOS で参照名が違う**ため。1 つに減らすと片方で当たらない
- **Windows の游ゴシックは Regular が細すぎる**。`font-weight: 400` が Light にマッピングされる環境があるため、本文で薄く見える場合は `@font-face` で Medium を割り当てる（SmartHR の `AdjustedYuGothic` と同じ対処）

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Display | 40px | 700 | 48px (**1.2**) | 1.6px (**0.04em**) | トップの数値・大見出し |
| Display (機能) | 42px | 700 | 63px (**1.5**) | normal | 機能ページの大数値 |
| Heading 1 | 32px | 700 | 36.8px (**1.15**) | normal | 下層ページのページタイトル |
| Heading 2 (A) | 36px | 700 | 57.6px (**1.6**) | normal | セクション見出し（ゆったり） |
| Heading 2 (B) | 36px | 700 | 54px (**1.5**) | normal | セクション見出し |
| Heading 2 (C) | 36px | 700 | 41.4px (**1.15**) | normal | セクション見出し（詰め） |
| Heading 2 (D) | 34px | 700 | 51px (**1.5**) | normal | 機能ページ |
| Heading 2 (E) | 28px | 700 | 39.2px (**1.4**) | 1.12px (**0.04em**) | 小さめのセクション見出し |
| Heading 3 (A) | 24px | 700 | 36px (**1.5**) | normal | カード見出し |
| Heading 3 (B) | 20px | 700 | 20px (**1.0**) | normal | 詰めた小見出し |
| Heading 3 (C) | 18px | 700 | 27px (**1.5**) | normal | カード見出し |
| Heading 3 (D) | 16px | 700 | 24px (**1.5**) | normal | 最小の見出し |
| Body (L) | 16px | 400 | 18.4px (**1.15**) | normal | `body` の既定値。**実際の本文には使わない** |
| Body (M) | 15px | 400 | 25.5px (**1.7**) | normal | 機能ページの本文 |
| Body (S) | 14px | 400 | 22.4px (**1.6**) | normal | トップの本文 |
| Label | 14px | 700 | 21px (**1.5**) | normal | ボタン・ナビのラベル |
| Caption | 12px | 400 | 18px (**1.5**) | normal | 注記 |
| Micro | 8px | 700 | 32px | 0.8px (**0.1em**) | 装飾的な極小ラベル |

> **`body` の `line-height: 1.15`（18.4px / 16px）を本文にそのまま使わない。** これは normalize 相当の初期値で、実際の段落 `<p>` はすべて 14px/1.6 か 15px/1.7 に上書きされている。**16px/1.15 のまま日本語を流すと行が団子になる**。

### 3.5 行間・字間

- **本文の行間**: **1.6〜1.7**（14px → 22.4px、15px → 25.5px）
- **見出しの行間**: **1.15〜1.6** と幅がある。**同じ 36px の h2 に 1.6 / 1.5 / 1.15 の 3 種が併存**しており、1 行に収まる短い見出しは詰め、2 行以上になるものは広げるという使い分け
- **本文の字間**: `normal`
- **見出しの字間**: **`0.04em`**（CSS 上 17 回宣言。40px → 1.6px、28px → 1.12px で実測一致）。ただし全部の見出しに付くわけではなく、**36px 系の h2 は `normal`**

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

- 見出しは**意図した位置で改行**させる（`<br>` を入れる）運用。「店舗・施設・スクール。／理想の運営はこれひとつで」のように**句点で 2 行に割る**のがトップの型

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* 全要素。palt を使わない */
```

- **`palt` を適用しない**。中黒（`・`）と読点で区切る見出しが多く、詰めると語の切れ目が失われるため
- `yakuhanjp.css` は CDN から読み込まれているが、**和文スタックに `YakuHanJP` が入っていないので効いていない**。約物を半角にしたい場合は自分でスタック先頭に足す必要がある

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary（資料・デモを見る）**
- Background: `#1a1a1a`
- Text: `#ffffff`
- Padding: `14px 12px 14px 24px`（**右だけ 12px**。矢印アイコンを右端に置くため）
- Border Radius: `6px`（`0.375rem`）
- Font Size: `14px` / Weight: `700`
- Shadow: `none`

**Secondary（お問い合わせ）**
- Background: `#767676`
- Text: `#ffffff`
- 他は Primary と**完全に同一**（padding・radius・サイズ・ウェイト）
- **形を変えず、面の明度だけで優先度を落とす**のが hacomono の型

**Outline（詳しく見る / 一覧を見る / hacomonoとは）**
- Background: `#ffffff`
- Text: `#1a1a1a`
- Border: `1px solid #1a1a1a`
- Border Radius: `6px`
- Padding: `14px 12px 14px 24px` ／ `14px 32px`（アイコン無しの場合）
- Font Size: `14px` / Weight: `700`

**Outline（もっと見る — 一覧の追加読み込み）**
- Border Radius: **`4px`**（`0.25rem`。他の 6px と違う）
- Padding: `16px 13px 16px 32px`

**Large CTA（フッター上の 2 枚組）**
- Background: `#1a1a1a`（資料・デモダウンロード） / `#767676`（お問い合わせ）
- Padding: `34px 32px` ／ Font Size: `16px` / Weight: `400`
- Border Radius: `6px`

### Chips / Tags

- Background: `#dadada`
- Text: `#4f4f4f`
- Border Radius: **`2px`**（**ピルにしない**）
- Padding: `3px 11px 4px`（**上下非対称**）
- Font Size: `12px` / Weight: `700`
- 表記は `#パーソナルジム` のように**先頭にハッシュを付ける**

### Badge（オプション機能）

- Background: `#767676` / Text: `#ffffff`
- Border Radius: `5px`（`0.3125rem`）／ Padding: `6px` ／ 13px / 700

### Cards

- Background: `#ffffff`（記事カード） / `#eff1f4`（ナビカード）
- Border Radius: `6px`。画像を含むカードの上端は `8px 8px 0 0`（`0.5rem 0.5rem 0 0`、CSS 6 回）
- Padding: `36px 24px 24px 36px`（ナビカード。**左右非対称**）
- Shadow: なし。必要なら §6 のオフセット面

### Panels

- Background: `#eff1f4`
- Border Radius: `6px`
- フッター全体も `#eff1f4` の面

---

## 5. Layout Principles

### Spacing Scale

`rem` ベース（1rem = 16px）。`gap` の実出現順：

| Token | Value | 出現 |
|-------|-------|------|
| XS | `0.375rem` (6px) | 15 回 |
| S | `0.5rem` (8px) | 23 回 |
| M | `0.75rem` (12px) | **32 回で最頻** |
| L | `1.25rem` (20px) | 21 回 |
| XL | `1.5rem` (24px) | 17 回 |
| XXL | `2rem` (32px) | 14 回 |

### Radius Scale

| Value | px | 出現 | 用途 |
|-------|----|------|------|
| `0.5rem` | 8px | **55 回** | カード・画像 |
| `0.375rem` | 6px | 20 回 | **ボタン・パネル** |
| `1.25rem` | 20px | 19 回 | 大きめのブロック |
| `0.25rem` | 4px | 17 回 | 小さいボタン |
| `50%` | — | 16 回 | アイコンの円 |
| `0.3125rem` | 5px | 6 回 | バッジ |
| `0.5rem 0.5rem 0 0` | 8px 上端のみ | 6 回 | 画像付きカードの頭 |

**ピル（9999px / 200px）は 1 つも無い。**

### Container

- Max Width: **`75rem`（1200px）**（7 回）。狭いブロックは `50rem`（800px、6 回）、最大幅は `90rem`（1440px、2 回）
- Padding (horizontal): 32px 前後

### Grid

- カードは 2〜4 カラム。`gap: 0.75rem`〜`1.5rem`

---

## 6. Depth & Elevation

**ブラー付きの影をほぼ使わない。** 深さは「面を右下にずらして重ねる」ことで表す。

| Level | 指定 | 出現 | 用途 |
|-------|------|------|------|
| 0 | `none` | 既定 | ほぼすべての要素 |
| 1 | `box-shadow: 1.25rem 1.25rem 0 0 #EFF1F4` | 2 回 | 画像・カードの版ズレ。**ブラー 0** |
| 1' | `box-shadow: 20px 20px 0 0 #F7F6F6` | 2 回 | 同上（`px` 指定版） |
| 2 | `box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25)` | 2 回 | **CSS 全体で唯一のぼかし影**。追従ヘッダー等 |

**カードにふわっとした影を付けない。** hacomono らしさは「ずらした単色の面」にある。

---

## 7. Do's and Don'ts

### Do（推奨）

- **無彩色だけで組む**。色が必要なら写真かプロダクト UI のスクリーンショットで持ち込む
- **主 CTA `#1a1a1a` / 副 CTA `#767676`** と、**形を変えずに明度だけで優先度を落とす**
- ボタンの radius は **6px**。カードは **8px**
- 本文は **14px/1.6** または **15px/1.7**。`body` の 16px/1.15 を本文に使わない
- 見出しに字間を入れるときは **`0.04em`**
- 地 `#e9ebee` or `#f7f6f6` → パネル `#eff1f4` → カード `#ffffff` の **3 段の面**で階層を作る
- 影を使うなら **`20px 20px 0 0` のブラー無しオフセット**
- 和文スタックは **4 つの別名を全部書く**（`"Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体"`）

### Don't（禁止）

- **`--color-base-primary: #012677` などの CSS 変数を使わない**。LeadGrid CMS のテーマ既定値であって hacomono の色ではない
- **`--border-radius-button: 200px` に従ってピルにしない**。実装は 6px
- **有彩色のアクセントを足さない**。青いリンク・緑の成功表示を入れた時点でトーンが崩れる
- **ぼかした影を多用しない**（CSS 全体で 2 回しかない）
- **`palt` を有効にしない**（`font-feature-settings` は全要素 `normal`）
- **日本語本文に `line-height: 1.15` を使わない**
- Noto Sans JP やヒラギノをスタックに足さない（**游ゴシックの字面で設計されている**）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ **767px** | **`@media screen and (max-width: 767px)` が 739 回**。実質これ 1 本 |
| Desktop | ≥ 768px | `min-width: 768px` は 10 回のみ |

補助的に `1439px` / `1350px` / `1320px` / `1240px` が各 2 回だけ現れる。

### タッチターゲット

- ボタンは `padding: 14px` 上下 ＋ 14px 行高 ＝ **約 45px**。44px の WCAG 基準を満たす

### フォントサイズの調整

- 見出しは 768px 未満で 36px → 24〜28px 相当に縮む。**本文（14〜15px）は据え置き**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #1a1a1a       （副 CTA は #767676）
Text Color:    #1a1a1a
Background:    #e9ebee（地） / #eff1f4（パネル） / #ffffff（カード）
Border:        #d2d2d2
Font:          "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体", sans-serif
Body Size:     14px（line-height 1.6） または 15px（1.7）
Heading:       36px / 700 / line-height 1.5、字間は 0.04em（付ける場合のみ）
Radius:        ボタン 6px / カード 8px（ピルは使わない）
Shadow:        なし。使うなら 20px 20px 0 0 #f7f6f6（ブラー 0）
palt:          off
```

### プロンプト例

```
hacomono のデザインシステムに従って、料金プラン比較テーブルを作成してください。
- 有彩色は一切使わない（無彩色のみ）
- 推奨プランの CTA は #1a1a1a 塗り・白文字・radius 6px・14px/700、
  他プランの CTA は同じ形のまま面を #767676 に落とす
- テーブルのヘッダー行は #eff1f4、セルの地は #ffffff、罫は 1px solid #d2d2d2
- フォントは "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体", sans-serif
- 本文 14px / line-height 1.6、見出し 24px / 700 / line-height 1.5
- 影は付けない。強調したいカードだけ box-shadow: 20px 20px 0 0 #f7f6f6（ブラー 0）
- font-feature-settings は normal（palt を使わない）
```
