# DESIGN.md — 熊谷組（KUMAGAI GUMI）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-03 / 対象: `https://www.kumagaigumi.co.jp/`, `/company/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **`body` に1行書いて全部に効かせる。** `font-family` / `line-height: 1.8` / `font-feature-settings: "palt"` / `letter-spacing: .05em` を `body` の1宣言にまとめ、**1191 要素へ継承**させている。CSS 変数は 1 個も無い
- **密度**: 低い。本文の行間が **1.8**、見出しの余白が大きく、円形のマスクと大きな角丸（20〜34px）でゆるく区切る
- **キーワード**: palt 全面、生成り色の地（`#fdfaed`）、円のマスク、Montserrat の大見出し、1文の中でウェイトを変える

**このサイトの核心は4つある。**

1. **`palt` を `body` に1行書いて 1191 要素へ継承している。** 実測は `"palt" @ horizontal-tb` が 1191 件で、**軸の取り違え（縦組みに `halt` を当てる類）は起きていない**。字詰めはサイト全体の既定であって、見出しだけの演出ではない
2. **地色が白ではない。** ページ背景は **`#fdfaed`**（生成り）。ヒーローの円形は一段明るい **`#fefbec`** で、**2色の生成りを重ねている**
3. **ヒーローのコピーは1文の中でサイズとウェイトを変える。** `高める、つくる、` が **72px / weight 700**、`そして、` が **40px / weight 500**、`支える。` が 72px に戻る。**実テキスト**で、画像ではない
4. **和文と欧文で `letter-spacing` の設計が逆。** 和文は `body` の `.05em` が **0.8px として継承**され、欧文（Montserrat）の大見出しは **`normal`**（42px / 60px / 72px はすべて字間ゼロ）

**CSS Custom Properties は両ページとも 0 個。** 色もサイズも全部ハードコードされている。**「変数が無い＝設計が無い」ではない**例で、`body` の1宣言が変数の役割を果たしている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Kumagai Blue** | **`#0063BE`** | **可視 13 要素の塗り面**。CTA のピル、`JP` の言語切替、カテゴリバッジ、`Top message` などの英字見出しの文字色 |
| **Cream（地）** | **`#fdfaed`** | **ページ背景**（根拠 `viewportTopBySample (3/6)`）。トピックス帯、フッター |
| **Cream Light** | **`#fefbec`** | ヒーローの円形、`Corporate Information` / `Recruit` のカード面（可視 5 要素） |
| **Pale Blue** | **`#e9f4fb`** | Cookie バーの面（4 要素） |

> **生成りが 2 色あるのは実装の実態。** `#fdfaed`（地）と `#fefbec`（面）は RGB で 1〜2 しか違わないが、**どちらも実装されていて、地の上に一段明るい円が乗る**構図を作っている。片方に丸めると、ヒーローの円が消える。

### Accent（プロジェクト分類の 9 色）

トップ下部のプロジェクト一覧に、**面色としてのみ** 9 色が使われる（文字色には使わない。各 2〜3 要素）。

| 実装値 | 色 |
|---|---|
| `#2dcdd7` | シアン |
| `#ed9a17` | オレンジ |
| `#76d241` | ライムグリーン |
| `#f3da2f` | イエロー |
| `#f07490` | ピンク |
| `#39d1a0` | ミントグリーン |
| `#368bd9` | ブルー |
| `#ec8254` | コーラル |
| `#e974f0` | マゼンタ |
| `#54b5e7` | スカイブルー |

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文・ヒーローのコピー（実測の本文色）
- **Text Heading** (`#111111`): `h1` / `h2` / `h4`。**本文の `#333333` より一段濃い**
- **Text Muted** (`#666666`): `ニュース一覧` などの補助リンク、パンくずの現在地
- **Text on Blue** (`#ffffff`): `#0063BE` の面の上
- **Border** (`#f6f6f6`): カードの枠（`2px solid`）。**罫線が面色より薄いグレー**
- **Background**: `#fdfaed`

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Noto Sans JP**。**自社サーバーから配信**している（フォント要求 17 件すべて `www.kumagaigumi.co.jp` ドメイン。Google Fonts は使っていない）
- **読み込んでいるウェイトは 400 / 500 / 700 の 3 本**（`document.fonts` で `loaded`）
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ**: **Montserrat**。**400 と 700 が `loaded`**、300 と 500 は宣言のみで `unloaded`
- 用途は **セクションの英字見出しと数字**（`News` `Projects` `Corporate Information` `Top message` `01` `02`）。本文の欧文には使わない
- フォールバックは `Montserrat, arial, sans-serif`

### 3.3 font-family 指定

```css
/* サイト全体の既定 — この1宣言が 1191 要素へ継承される */
body {
  font-family: "Noto Sans JP", sans-serif;
  line-height: 1.8;
  font-feature-settings: "palt";
  letter-spacing: .05em;
}

/* 英字見出し・数字 */
font-family: Montserrat, arial, sans-serif;
```

**フォールバックの考え方**:
- **和文優先。** Noto Sans JP を先頭に置き、欧文グリフもそのまま使う（英字見出しだけ Montserrat に切り替える）
- **`sans-serif` 1 語で受ける割り切り。** 游ゴシック・ヒラギノを並べない
- Montserrat 側の `arial` は小文字で書かれている（CSS は大小を区別しないので実害は無い）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Hero Copy（大）** | Noto Sans JP | **72px** | **700** | **1.40** (100.8px) | **9px (0.125em)** | **`高める、つくる、` `支える。`** |
| **Hero Copy（小）** | Noto Sans JP | **40px** | **500** | 1.40 (56px) | **9px (0.225em)** | **`そして、`。px が継承されるので字間だけ広く見える** |
| English Display | Montserrat | **72px** | 700 | 1.20 (86.4px) | normal | 下層の `h1`（`Corporate Information`） |
| English Section | Montserrat | **60px** | 700 | 1.30 (78px) | normal | トップの `h2`（`News` `Projects`） |
| English Section（小） | Montserrat | 42px | 700 | — | normal | `Company` |
| English Label | Montserrat | 24px | 700 | 1.20 (28.8px) | 1.2px | `Top message`（`#0063BE`） |
| English Label（小） | Montserrat | 14px | — | — | 0.7px | `Company` 等のカード内ラベル |
| Number | Montserrat | 20px / 31px | — | — | 0.9px / 1.55px | `01` `02` |
| JA Heading | Noto Sans JP | 32px | 700 | 1.40 (44.8px) | normal | `h1`（和文） |
| JA Sub Heading | Noto Sans JP | 24px | 700 | 1.40 (33.6px) | normal | `h2`（和文） |
| Card Heading | Noto Sans JP | 18px | 500 | 1.40 (25.2px) | 0.9px | `中期経営計画` |
| **Body** | Noto Sans JP | **16px** | **400** | **1.80** (28.8px) | **0.8px** | **`body` の既定。実測 91 要素** |
| Body（下層・本文） | Noto Sans JP | 15px | 400 | 1.40 (21px) | 0.75px | `p` の既定 |
| **UI / List** | Noto Sans JP | **13px** | 400 / 500 | 1.40 (18.2px) | **0.8px** | **実測 120 要素で最多**。`ニュース一覧` `JP` |
| Label | Noto Sans JP | 14px | 400 | 1.40 (19.6px) | 0.8px | フィルタの `すべて` `お知らせ` |
| Caption | Noto Sans JP | 12px | 400 | — | 0.6px | `受賞実績` |
| Small | Noto Sans JP | 11px | 400 | 1.80 (19.8px) | 0.55px | `プレスリリース` |

> **600 を指定すると 700 で出る。** `@font-face` は **400 / 500 / 700 の 3 本**だけ。隠し要素の実測でも 100–400 が同じ幅、500 が別、600–900 が 700 と同じ幅に揃う。**中間の太さは作れない。**

### 3.5 行間・字間

- **本文の行間**: **1.80**（`body` の宣言。実測 54 要素で最多）
- **見出し・カードの行間**: **1.40**
- **英字大見出しの行間**: **1.20〜1.30**
- **和文の字間**: **`body` の `.05em` が 16px に掛かって `0.8px` になり、そのまま px で全子孫へ継承される**
- **欧文大見出しの字間**: **`normal`**（42px / 60px / 72px）

**字間の継承について（重要）**:

`body { letter-spacing: .05em }` は **16px × 0.05 = 0.8px という絶対値**になって降りる。実測で裏が取れる:

| 要素のサイズ | letter-spacing | 実質 em | 件数 |
|---|---|---|---|
| 13px | **0.8px** | 0.062em | 120 |
| 16px | **0.8px** | 0.05em | 91 |
| 14px | **0.8px** | 0.057em | 36 |

**小さい文字ほど字間が広く見える。** 一方、自分で `.05em` を宣言し直している要素もある（18px → 0.9px / 12px → 0.6px / 15px → 0.75px）。

**ヒーローだけ別設計**: 72px の `高める、` が **9px（0.125em）**、その中の 40px の `そして、` が **9px を継承して 0.225em 相当**になる。**サイズを下げた語ほど字間が広く開く**のがこの見出しの効き目。

**ガイドライン**:
- **`letter-spacing` は `body` に1回だけ書く。** 子要素で `em` を再宣言すると、このサイトの「小さい文字ほど広い」質感が消える
- **`line-height: 1.8` も `body` に1回。** 無単位なので各要素が自分のサイズで再計算する（px で書かない）

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- **`word-break` は `body` も含め全要素 `normal`**（実測）。`break-all` は使わない
- ヒーローのコピーは `<span>` ごとに改行位置を固定している（`高める、` / `つくる、` / `そして、支える。`）

### 3.7 OpenType 機能

**`font-feature-settings: "palt"` を `body` に1行だけ書き、1191 要素へ継承させている。**

```css
body { font-feature-settings: "palt"; }
```

- 実測は **`"palt" @ horizontal-tb` が 1191 件**。縦組みは使っていないので、**軸の取り違え（`halt` / `vpal` の混在）は起きていない**
- **`palt` の上から字間を足し直していない。** `body` の `.05em` は `palt` とセットで設計されており、**「詰めてから、わずかに空ける」の二段構え**。片方だけ再現すると別物になる
- 隠し要素での実測: `（株）熊谷、組。「設計」` が 40px で **469.61px →（palt）369.61px**。約物 6 個ぶんきっちり詰まる

### 3.8 縦書き

**該当なし。** 実測 0 要素。

---

## 4. Component Stylings

**角丸が 7 種類ある。** 円（`50%`）から 10px まで、用途ごとに別の値を使う。

### Buttons

**Pill（フィルタ・選択中）**
- Background: `#0063BE` / Text: `#ffffff`
- Border Radius: **`17px`** / Padding: `5px 20px 4px`
- Font: 14px / 400 / letter-spacing 0.8px / `font-feature-settings: "palt"`

**Pill（小・バッジ）**
- Background: `#0063BE` / Text: `#ffffff`
- Border Radius: `11px`
- Font: 11px / 400 / letter-spacing 0.55px

**Outlined（Cookie 同意）**
- Background: `transparent` / Text: `#111111`
- Border: `1px solid #111111` / Border Radius: `10px`
- Font: 16px / 400 / letter-spacing `normal`

### Cards

**大カード（Corporate Information / Recruit）**
- Background: `#fefbec`
- Border Radius: **`20px`** / Padding: `10px`
- Font: 16px / 400 / line-height 1.80 / letter-spacing 0.8px

**ナビゲーションカード（下層）**
- Background: `transparent`
- Border: **`2px solid #f6f6f6`** / Border Radius: `20px`
- Padding: **`40px 30px 120px`**（**下に大きく空ける**。矢印アイコンの場所）
- Box Shadow: **`rgba(2, 34, 110, 0.09) 0 0 70px 0`**（サイト唯一の影）

**重要なお知らせ（帯）**
- Background: `#fdfaed`
- Border Radius: **`34px`** / Padding: `22px 85px 23px 94px`
- Font: 16px / 400 / line-height 1.80

### Hero

- 左: **`#fefbec` の円**（コピーを内側に置く）
- 右: **写真を円形にマスク**した画像
- **円が 2 つ並ぶのがトップの骨格**

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | `8px` | 細かい並び |
| S | `20px` | — |
| M | `30px` | カードの横間隔（`2px 30px` が 5 要素） |
| L | `40px` | グリッドの既定（3 要素） |
| Fluid | `0 2.5%` | 画面幅に対する横間隔（2 要素） |

### Container

- **Max Width: `1366px`**（実測 24 要素で最多。両ページ共通）
- 広い面: `1440px` / `1800px`
- 記事カラム: `885px`

### Grid

- カードは `gap: 2px 30px` の横並び、セクション間は `gap: 40px`
- 一部のグリッドは **`gap: 0 2.5%`** と割合で持つ（コンテナ幅に追従する）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **ほぼすべての要素** |
| 1 | **`rgba(2, 34, 110, 0.09) 0 0 70px 0`** | 下層のナビゲーションカードのみ |

**影は 1 種類しかない。** しかも**黒ではなく濃紺（`rgb(2,34,110)`）の 9% で、ぼかし 70px・オフセット 0**。真下に落とすのではなく、カードの周囲をうっすら沈ませる使い方。

- **黒い影に丸めない。** `rgba(0,0,0,.1)` に置き換えると、生成りの地の上で濁って見える
- **オフセットを付けない**（`0 0 70px 0`）。浮かせるのではなく、輪郭をぼかす目的

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body` に `font-family` / `line-height: 1.8` / `font-feature-settings: "palt"` / `letter-spacing: .05em` の4つをまとめて書く。** これがこのサイトの設計そのもの
- **`palt` と `.05em` は必ずセットで使う**（詰めてから、わずかに空ける）
- **地色は `#fdfaed`、面は `#fefbec`** の 2 段で使い分ける
- 英字の見出しは **Montserrat 700 / letter-spacing `normal`** で組む
- 和文の見出しは `#111111`、本文は `#333333` と濃さを変える
- 影を使うときは **`rgba(2,34,110,.09) 0 0 70px 0`** だけ
- 角丸は用途ごとに `10px` / `11px` / `17px` / `20px` / `34px` / `50%` を使い分ける

### Don't（禁止）

- **`font-weight: 600` を使わない。** `@font-face` は 400 / 500 / 700 の 3 本で、600 は 700 で出る
- **`letter-spacing` を子要素で `em` 再宣言しない。** `body` から 0.8px が降りる設計で、小さい文字ほど字間が広く見えるのが狙い
- **`line-height` を px で書かない。** `body` の `1.8` は無単位で、各要素が自分のサイズで再計算する
- **`palt` を外さない**（全要素の既定）。また `halt` や `vpal` に置き換えない（横組みのサイトなので `vpal` は黙って無視される）
- **地色を `#ffffff` にしない。** 生成り（`#fdfaed`）が前提で、白にするとヒーローの円が消える
- **黒い影・オフセット付きの影を足さない**
- **CSS 変数が無いことを「設計が無い」と読まない。** 値はハードコードだが、`body` の1宣言に設計が集約されている
- Montserrat の **300 / 500 を使わない**（宣言はあるが `unloaded`）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 767px** | `screen and (max-width: 767px)`（**ルール数 1552 件で最多**） |
| **Desktop** | **≥ 768px** | `print, screen and (min-width: 768px)`（1020 件） |
| Tablet | 768–960px | `print, screen and (min-width: 768px) and (max-width: 960px)` |
| Narrow Desktop | 768–1260px | `screen and (min-width: 768px) and (max-width: 1260px)` |
| Wide | ≥ 1260px | `screen and (min-width: 1260px)` |

**実質 768px の 1 本で切り替わる設計。** `print` を併記しているので、印刷時はデスクトップ版が出る。

### ルートの文字サイズ

**`html` は全幅で 10px 固定。流体も `clamp()` も使っていない。**

| 画面幅 | `html` | `body` | `body` の line-height / letter-spacing |
|---|---|---|---|
| 1440px | **10px** | 16px | 28.8px / 0.8px |
| 1024px | **10px** | 16px | 28.8px / 0.8px |
| 768px | **10px** | 16px | 28.8px / 0.8px |
| **767px** | **10px** | **15px** | **27px / 0.75px** |
| 375px | **10px** | 15px | 27px / 0.75px |

- `html { font-size: 62.5% }` ＝ 10px。**`rem` は ×10 で px になる**（`1.6rem` = 16px）
- **`body` だけが 768/767 で 16px → 15px に切り替わる。** 比率（1.8）と `.05em` はそのままなので、行間と字間も 27px / 0.75px に連動して縮む
- 段差は 1px ぶんで、崖は無い

### 見出しのサイズ切替

| 要素 | ≥768px | ≤767px |
|---|---|---|
| `h1` | 32px | 30px |
| `h2`（和文） | 24px | 22.5px |
| `p` | 15px（1200px 以下は 13px） | 15px |

**すべて `body` の 16px → 15px（×0.9375）に連動している。** 見出しごとの個別指定ではない。

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）。`border-radius: 17px` のピル（高さ約 28px）はタップ領域を padding で広げる

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:  #0063BE
Text Color:     #333333（本文） / #111111（見出し） / #666666（補助）
Background:     #fdfaed（地） / #fefbec（面）
Border:         #f6f6f6（2px solid）
Font (JA):      "Noto Sans JP", sans-serif   ← 400 / 500 / 700 のみ
Font (EN):      Montserrat, arial, sans-serif ← 400 / 700 のみ
Body Size:      16px（≤767px は 15px）
Line Height:    1.8（body に無単位で1回）
Letter Spacing: .05em（body に1回。子で再宣言しない）
font-feature-settings: "palt"（body に1回。全要素へ継承）
Shadow:         rgba(2,34,110,.09) 0 0 70px 0（1種のみ）
Container:      1366px
```

### プロンプト例

```
熊谷組のデザインシステムに従って、お知らせ一覧とカードを作成してください。
- body に次の4つをまとめて書き、子要素では再宣言しない:
    font-family: "Noto Sans JP", sans-serif;
    line-height: 1.8;
    font-feature-settings: "palt";
    letter-spacing: .05em;
- 地色は #fdfaed、カードの面は #fefbec、枠は 2px solid #f6f6f6
- 一覧の行は 13px / 400、日付とカテゴリは同じ 13px で色だけ変える（#666666）
- 選択中のフィルタは #0063BE の塗り、border-radius: 17px、白文字 14px
- カードは border-radius: 20px、padding: 40px 30px 120px
- 影は rgba(2,34,110,.09) 0 0 70px 0 だけ。黒い影やオフセット付きは使わない
- セクションの英字見出しは Montserrat 700 / 60px / letter-spacing: normal
- font-weight に 600 を使わない（700 で出る）
- コンテナ幅は 1366px、グリッドの gap は 40px
```
