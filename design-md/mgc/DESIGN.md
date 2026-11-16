# DESIGN.md — 三菱ガス化学（Mitsubishi Gas Chemical）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-16 / 対象: `https://www.mgc.co.jp/`, `/products/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **青 1 色で情報を捌く化学メーカーのサイト。** 製品数の多さを、角丸 10px のカードと `#eff5f7` の淡い面で整理する。影は使わない
- **密度**: 高い。製品一覧は 50音・製品群・用途・事業部の 4 軸で絞り込む検索 UI を持ち、`#0072bf` のタグが下層だけで **178 要素**並ぶ
- **キーワード**: MGC ブルー、角丸10px、`--space*` トークン、`pwid`、ルート10px／本文16px

**このサイトの核心は4つある。**

1. **`body { font-feature-settings: "pwid" }` を 1 行書いて 1172 要素へ継承しているが、実際の文面には 1px も効いていない。** 実測（実スタック・40px）で `中期経営計画「Grow UP 2026」` が `normal` **595.45px** → `"pwid"` **595.45px**（**±0.00px**）。**代わりに `"palt"` なら 555.45px（−6.7%）になる**。詳細は 3.7 節
2. **ルートは 10px、本文は 16px。** `html { font-size: 10px }`（＝`1rem = 10px`）に対し `body` が 16px を宣言し直す。19 幅すべてで両方とも固定
3. **自社トークン 16 個。** プラットフォーム由来は 0。余白は `--spaceSS: 10px` 〜 `--spaceXL: 120px` の 7 段、色は `--linkColor` / `--linkHoverColor` / `--linkColorvisited` / `--keyColor` / `--bdrColor` ほか
4. **字間は `body` から `0.8px` という絶対値で降りる。** 可視 136 要素（下層 110 要素）が同じ 0.8px。**サイズが違っても同じ px** ＝ `0.05em` を `body` に 1 回書いて継承させている

### 計測で判明した「宣言 ≠ 実装」

| 宣言 | 実装 | 扱い |
|---|---|---|
| `--keyColor: #D42522`（三菱の赤） | **可視 0 要素。** 文字色・背景・ボーダーのいずれにも `rgb(212,37,34)` は出ない。赤系の背景色自体が 1 つも無い | **「キーカラー」という名前のトークンが、サイトのどこにも描画されていない。** 実質のブランド色は `--linkColor: #0072bf` |
| `body { font-feature-settings: "pwid" }`（1172 要素） | **実文面で 0.0%。** 効くのは約物だけで、しかも**広がる**（3.7 節） | 詰める意図なら `palt` に差し替える |
| `@font-face: Roboto` 500 / 700 | **`unloaded`**、可視 0 要素 | 読み込んでいない |
| `@font-face: Noto Sans` 500 / 700 | `loaded` だが可視は **`JP` / `EN` の言語切替 2 要素**のみ | 言語切替バッジ専用 |
| `@font-face: FontAwesome` | `unloaded` | アイコン用の名残 |
| `--contensWidth: 1300px` | 綴りが `contents` ではなく **`contens`**。値は正しく効いている | **名前をそのまま写す**（直すと参照が切れる） |

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | トークン | 実装値 | 実測 |
|------|------|--------|------|
| **MGC ブルー** | `--linkColor` | **`#0072bf`** | **トップ 52 要素 / 下層 178 要素の面**。タグ、CTA、リンク文字（可視 19 要素） |
| **Deep Blue** | — | **`#0064b6`** | 見出し帯・事業部門ラベルの面（トップ 11 / 下層 5 要素）。`#0072bf` より一段濃い |
| **Navy** | — | **`#204579`** | 下層のページタイトル帯（489,600px² の大面積） |
| **Hover Blue** | `--linkHoverColor` | **`#0053d5`** | リンクのホバー |
| **Visited** | `--linkColorvisited` | **`#990099`** | 訪問済みリンク |
| **Key Color** | `--keyColor` | **`#D42522`** | **可視 0 要素**（上表参照） |

> **青が 3 段ある（`#0072bf` / `#0064b6` / `#204579`）。** 面の役割で使い分けている（タグ・CTA ＝ `#0072bf` / セクション見出し ＝ `#0064b6` / ページタイトル帯 ＝ `#204579`）。**1 色に丸めない。**

### Neutral（ニュートラル）

- **Text Primary** (`#222222`): 本文・見出し。**可視 94 要素**（下層 90 要素）。純黒は使わない
- **Text Secondary** (`#666666`): 日付、カテゴリ、`EN`（可視 13 要素）
- **Text Tertiary** (`#333333`): グローバルナビ（可視 9 要素）
- **Border** (`--bdrColor` = `#ADB4B9`): 罫線
- **Divider** (`#cccccc`): **可視 54 要素の面**（メガメニューの区切り。両ページとも同数）
- **Surface Light** (`--bgColorLightBlue` = `#EFF5F7`): IR 系カード・絞り込みパネルの面（トップ 4 / 下層 13 要素）
- **Surface Border** (`--bgBdrLightBlue` = `#D3E0E5`): 上の面の枠、スライダーのドット
- **Surface Lighter** (`#edf3f5` / `#e2fbff`): 検索パネル・製品情報の面
- **Surface Dark** (`#222222`): フッター（可視 50 要素）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

### グラデーション（2 種・各 1 要素）

```css
/* 製品検索パネル */
background: linear-gradient(360deg, #0e6ec8 0%, #004893 100%);

/* 事業部門セクション（緑→黄の淡い幕） */
background: linear-gradient(rgba(0, 181, 157, 0.25) 0%, rgba(254, 194, 49, 0.25) 100%);
```

角度 `360deg`・停止位置・alpha `0.25` は**そのまま写す**。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（唯一）**: **Noto Sans JP**。Google Fonts で **400 / 500 / 700** の 3 本が `loaded`（100 は `unloaded`）。受け皿に **ヒラギノ角ゴ ProN** を明示

### 3.2 欧文フォント

- **Noto Sans**（Google Fonts / 500・700 が `loaded`）: **言語切替の `JP` / `EN` 2 要素だけ**
- **Roboto**: `@font-face` はあるが **`unloaded`**・可視 0 要素
- **Arial**: スライダーのページ番号（5 要素）
- **generic `sans-serif`**: Cookie 同意バナー（外部ウィジェット。5 要素）

### 3.3 font-family 指定

```css
/* 本文・見出し・ナビ（サイトのほぼ全要素） */
font-family: "Noto Sans JP", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", sans-serif;

/* 言語切替バッジのみ */
font-family: "Noto Sans", sans-serif;
```

**フォールバックの考え方**:
- Web フォント → OS 同梱のヒラギノ角ゴ ProN → generic の 3 段。**メイリオや游ゴシックは入れていない**（Windows は generic `sans-serif` に落ちる）
- **ProN と Pro は別物。** このサイトは **ProN**

### 3.4 文字サイズ・ウェイト階層

**ルートが 10px なので `1rem = 10px`。** 本文の 16px は `body` の宣言で、`rem` 換算では `1.6rem`。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Headline | Noto Sans JP | **46px** | 400 | 1.30 | **-2.6px** | カルーセルの見出し。**負の字間**（3.5 節） |
| Hero Lead | Noto Sans JP | 26px | 400 | 1.30 | **-2.6px** | 同じ -2.6px が親から降りる |
| Hero Sub | Noto Sans JP | 22px | 400 | 1.50 | 0.8px | `～「伸びる」「勝てる」「サステナブル」～` |
| Section Heading | Noto Sans JP | **24px** | **700** | 1.40 | 0.8px | `製品を探す` `関連事業部` |
| Card Heading | Noto Sans JP | **20px** | 500 | 1.40 | 0.8px | `ニュース` `C1ケミカル事業部` |
| Body / Nav | Noto Sans JP | **16px** | **500** | **1.40** | **0.8px** | 最多（トップ 57 / 下層 41 要素） |
| Body Alt | Noto Sans JP | **14px** | 400 | 1.40 | 0.8px | パンくず・カテゴリ（下層 42 要素） |
| Reading | Noto Sans JP | 16〜20px | 400 | **1.85** | 0.8px | 製品説明の読ませる段落 |
| Tag | （generic） | 14px | 700 | 1.00 | 0.8px | `#0072bf` の丸タグ |
| Caption | Noto Sans JP | 12〜13.3333px | 400 | 1.40 | 0.8px | 補助情報 |

**weight は 400 / 500 / 700 の 3 段。** `@font-face` も 400 / 500 / 700 が `loaded` なので**合成太字は起きない**。600 は読み込んでいないので使わない。

### 3.5 行間・字間

- **行間は `1.40` が既定**（トップ 115 要素 / 下層 86 要素）。**読ませる段落だけ `1.85`**、見出しは `1.30`、バッジは `1.00`
- **字間は `body` に `0.05em` を 1 回書いて `0.8px` の絶対値で継承させる**（16px × 0.05 = 0.8px。可視 136 / 110 要素）
  - **サイズが変わっても 0.8px のまま。** 24px の見出しでも 0.8px ＝ 0.033em、12px のキャプションでも 0.8px ＝ 0.067em。**大きい文字ほど字間が相対的に消える**
- **ヒーローだけ負の字間 `-2.6px`。** しかもこれも**絶対値の継承**で、26px の `.lead` に当たった値が 46px の子へそのまま降りる:

| 要素 | font-size | letter-spacing | em 換算 |
|---|---|---|---|
| `.lead` | 26px | **-2.6px** | **-0.10em** |
| 子の見出し | **46px** | **-2.6px** | **-0.057em** |

> **意図は「-0.1em で詰める」だが、大きい方の見出しでは -0.057em しか効いていない。** 再現するときは**この px の継承ごと写す**（`em` で配り直すと見出しが詰まりすぎる）。

```css
html { font-size: 10px; }              /* 1rem = 10px */
body {
  font-size: 16px;
  letter-spacing: 0.05em;              /* → 0.8px が絶対値で全子孫に降りる */
  line-height: 1.4;
  font-feature-settings: "pwid";       /* ← 実際には効いていない。3.7 節 */
}
.hero .lead { font-size: 26px; letter-spacing: -0.1em; }   /* → -2.6px が子へ */
```

### 3.6 禁則処理・改行ルール

- `body { word-break: normal }`（実測・19 幅すべて）。`auto-phrase` も `break-all` も使っていない

### 3.7 OpenType 機能 — `pwid` は効いていない

```css
/* 実サイト */
body { font-feature-settings: "pwid"; }   /* → 1172 要素へ継承（すべて horizontal-tb） */
```

`html` は `normal`、宣言は **`body` の 1 行だけ**。`palt` も `halt` も 1 件も無い。

**実測（実スタック `"Noto Sans JP", "ヒラギノ角ゴ ProN", …` / 40px / 隠し span の幅）:**

| 文字列 | `normal` | `"pwid"` | 差 | `"palt"` | 差 |
|---|---|---|---|---|---|
| **`中期経営計画「Grow UP 2026」`**（実際の見出し） | 595.45px | **595.45px** | **±0.00（0.0%）** | 555.45px | **−6.7%** |
| `三菱ガス化学株式会社`（漢字かな） | 408.00px | **408.00px** | **±0.00** | 402.17px | −1.4% |
| `MGC Grow UP 2026`（半角英数） | 366.73px | **366.73px** | **±0.00** | 366.73px | ±0.00 |
| `ＭＧＣ　２０２６`（全角英数） | 326.41px | **326.41px** | **±0.00** | 273.25px | −16.3% |
| `、。「」（）・：；`（約物の連続） | 287.20px | **367.20px** | **+27.9%（広がる）** | 187.20px | −34.8% |

- **実際のページ文面では 1px も変わらない。** 漢字・かな・半角英数・全角英数のどれにも効かない
- **唯一動くのは約物が連続したときで、しかも 27.9% 広がる**（詰まるのではない）
- **詰めたいなら `palt`。** 同じ見出しで −6.7%、全角英数で −16.3%、約物で −34.8%

> **`font-feature-settings` が宣言されていることと、効いていることは別。** このサイトは「`palt` が効かない」のではなく **「`palt` ではなく `pwid` を書いてしまっている」**。既存ページと見た目を揃えるなら `pwid` のままにし、**詰めたいなら `palt` に差し替える**（その瞬間に全ページの折り返しが変わる点に注意）。

### 3.8 縦書き

**該当なし。** `writing-mode: vertical-*` は 2 ページとも 0 要素。

---

## 4. Component Stylings

### Buttons

**Tag / Pill（製品カテゴリ・`すべて` 等）**
- Background: `#0072bf` / Text: `#ffffff`
- Border: `1px solid #0072bf`
- Font: 14px / **700** / `letter-spacing: 0.8px` / `line-height: 14px`
- **Border Radius: `18px`**
- Shadow: `none`

**Card Link（淡い面）**
- Background: `--bgColorLightBlue` `#EFF5F7` / Text: `#0072bf`
- Border: `1px solid #0072bf`
- Font: 16px / 500 / `letter-spacing: 0.8px` / `line-height: 29.6px`
- **Border Radius: `10px`**

**Section Banner（濃い面）**
- Background: `#0064b6` / Text: `#ffffff`
- Font: 500 / `letter-spacing: 0.8px`
- **Border Radius: `10px`**

**Hero CTA（枠線・白面）**
- Background: `#ffffff` / Text: `#222222`
- **Border Radius: `40px`**（ヒーローのみ。6 要素）

**Slider Dot**
- `border-radius: 50%` / 未選択 `--bgBdrLightBlue` `#D3E0E5` / 選択 `#0064b6`
- Border: `2px solid`（面と同色）

### Cards

- **Border Radius: `10px`**（トップ 10 要素 / 下層 15 要素。**このサイトの既定の角丸**）
- 絞り込みパネルのタブだけ `10px 10px 0 0`
- 細かい部品は `5px`
- Shadow: `none`

### Inputs（製品検索）

- Background: `#ffffff`
- 検索ボタンは `border-radius: 0 5px 5px 0`（右側だけ丸める）
- パネル全体は `linear-gradient(360deg, #0e6ec8 0%, #004893 100%)` の上

---

## 5. Layout Principles

### Spacing Scale（自社トークン・16 個中 7 個が余白）

| Token | Value |
|-------|-------|
| `--spaceSS` | **10px** |
| `--spaceS` | **20px** |
| `--spaceM` | **30px** |
| `--spaceTtl` | **48px**（見出しの下） |
| `--spaceL` | **60px** |
| `--spaceLL` | **80px** |
| `--spaceXL` | **120px** |

**10 → 20 → 30 → 48 → 60 → 80 → 120 の 7 段。** `--spaceTtl` だけスケールから外れた用途名なので、**見出し直下の余白はこれを使う。**

### Container

| Token / 実測 | Value | 用途 |
|---|---|---|
| （実測） | **`1700px`** | 最外（両ページとも 9 件） |
| `--contensWidth` | **`1300px`** | 本文コンテナ（綴りは `contens`） |
| `--bothSides` | **`4.8%`** | 左右の余白 |
| （実測） | `980px` / `750px` / `710px` | 個別 |

### Grid

- 実測 `gap`: `normal 10px` / `normal 30px` / `normal 26px` / `normal 24px` / `60px 3%` / `normal 5%` など。**`%` と px が混在**

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **サイト本体のすべての要素** |
| — | `rgba(0, 0, 0, 0.5) 0 5px 15px` | **Cookie 同意バナーのみ**（外部ウィジェット） |

**`distributions.boxShadow` は両ページとも 1 種で、それが CMP。つまりサイト本体の影は 0。** 奥行きは**角丸 10px のカードと `#EFF5F7` の淡い面**で作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 10px }` / `body { font-size: 16px }`** を前提にする（`1rem = 10px`）
- **字間は `body` に `0.05em` を 1 回だけ書く。** 各要素で `em` を再宣言しない（0.8px の絶対値継承がこのサイトの設計）
- **余白は `--spaceSS` 〜 `--spaceXL` の 7 段から選ぶ。** 見出しの下は `--spaceTtl: 48px`
- **角丸は 10px が既定。** タグは 18px、ヒーロー CTA は 40px、ドットは 50%
- 青は役割で使い分ける（タグ・CTA `#0072bf` / セクション `#0064b6` / ページタイトル帯 `#204579`）
- 本文の行間は **1.40**、読ませる段落は **1.85**
- weight は **400 / 500 / 700** の 3 段

### Don't（禁止）

- **`font-feature-settings: "pwid"` を「字詰めの設定」として真似しない。** 実測で本文に 0.0%、約物では逆に +27.9% 広がる。**詰めたいなら `palt`**
- **`--keyColor: #D42522` をブランド色として実装しない。** 可視 0 要素。実質のブランド色は `#0072bf`
- **`box-shadow` を足さない。** サイト本体は実測 0 種
- **ヒーローの `-2.6px` を `em` に読み替えない。** 26px の親に当てた `-0.1em` が 46px の子へ px のまま降りる設計
- **`font-weight: 600` を当てない。** 400 / 500 / 700 しか読み込んでいない
- **`--contensWidth` の綴りを直さない**（`contents` ではなく `contens`）
- **フォールバックに Pro を書かない。** このサイトは **ProN**
- 純黒 `#000000` を本文に使わない（`#222222`）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 実測件数 |
|------|-------|---|
| Wide | `min-width: 1700px` | 4 件 |
| Desktop | `min-width: 1300px` | **8 件** |
| Tablet+ | `min-width: 1024px` | 3 件 |
| （以下、要素ごとに 980px / 768px） | | |

### ルートも body も一切動かない

実測 19 幅（1920 / 1440 / 1200 / 1101 / 1100 / 1024 / 980 / 979 / 834 / 769 / 768 / 767 / 600 / 599 / 461 / 460 / 375 / 374 / 320px）で:

- `html`: **10px 固定**
- `body`: **16px 固定**
- `body { letter-spacing }`: **0.8px 固定**
- `body { line-height }`: **16px 固定**
- `body { word-break }`: **normal 固定**

**流体（`vw` / `clamp()`）はルートにも body にも無い。** 変わるのは要素側だけ:

| 要素 | ≥ 1024px | 980〜768px | ≤ 767px |
|---|---|---|---|
| セクション見出し | **20px** | **18px** | 18px |
| 本文段落 | 26px | 30px | **18px** |

> 下層には `16.8841px` `22.3262px` `43.5365px` のような端数が出る（絞り込みパネルと事業部門ラベル）。**コンテナ幅に対する `%` 計算の結果**で、ルートの流体ではない。

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）を確保する

### フォントサイズの調整

- 本文 16px は全幅で据え置き。縮むのは見出し（20 → 18px）と段落（26/30 → 18px）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Root Font Size: 10px   ← 1rem = 10px
Body Size:      16px
Text Primary:   #222222
Text Secondary: #666666
Primary Blue:   #0072bf   ← --linkColor。実質のブランド色
Deep Blue:      #0064b6
Navy:           #204579
Hover:          #0053d5
Visited:        #990099
Surface Light:  #EFF5F7   ← --bgColorLightBlue
Surface Border: #D3E0E5   ← --bgBdrLightBlue
Border:         #ADB4B9   ← --bdrColor
Divider:        #cccccc
Background:     #ffffff

Font: "Noto Sans JP", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", sans-serif
Weights:        400 / 500 / 700（600 は無い）
Line Height:    1.4（既定）/ 1.85（読ませる段落）/ 1.3（見出し）
Letter Spacing: body に 0.05em を 1 回 → 0.8px が継承
Border Radius:  10px（既定）/ 18px（タグ）/ 40px（ヒーローCTA）/ 50%（ドット）
Box Shadow:     none
Spacing:        10 / 20 / 30 / 48 / 60 / 80 / 120px
Container:      1700px（最外）/ 1300px（本文）/ 左右 4.8%
```

### プロンプト例

```
三菱ガス化学のデザインシステムに従って、製品カテゴリの一覧ページを作成してください。

- html は font-size: 10px、body は font-size: 16px / line-height: 1.4
- 字間は body に letter-spacing: 0.05em を 1 回だけ書く（子要素では再宣言しない）
- font-family: "Noto Sans JP", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", sans-serif
  weight は 400 / 500 / 700 のみ
- カードは border-radius: 10px / 背景 #EFF5F7 / 枠 1px solid #0072bf / 文字 #0072bf
- カテゴリタグは border-radius: 18px / 背景 #0072bf / 白文字 / 14px / weight 700
- セクション見出しの帯は #0064b6、ページタイトル帯は #204579
- 余白は 10 / 20 / 30 / 48 / 60 / 80 / 120px から選ぶ。見出しの下は 48px
- コンテナは最外 1700px、本文 1300px、左右 4.8%
- box-shadow は使わない
- font-feature-settings は書かない（実サイトの "pwid" は本文に効いていない。
  詰めたい場合のみ "palt" を明示的に選ぶ）
```
