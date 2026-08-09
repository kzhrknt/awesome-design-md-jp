# DESIGN.md — Whatever（ホワットエバー）

> Whatever Inc.（https://whatever.co/ja/）のデザイン仕様書。
> 川村真司らが率いる東京・ニューヨーク・台北・ベルリンのクリエイティブスタジオ。"Make whatever. Rules, whatever." を掲げ、広告・プロダクト・空間・映像を横断してつくる。
> 最大の特徴は、**純白の地に純黒の Apercu Bold を極端に大きく置き（実測 `151px` = `10.5vw`）、角丸も影も一切使わない**こと。彩度は本文にはまったく無く、**9 色の蛍光的なブランドカラーを 2 色ずつ組んだ oklab グラデーション**として、ノイズテクスチャ（`noise.png`）と重ねて帯・文字マスクにだけ現れる。
> 和文は **Noto Sans JP**。ただし**和文リード文は `font-weight: 700`／`line-height: 2.31`** という、太くて行間が極端に広い組み方を採る。
> 実サイトの computed style 実測（2026-08-09 取得。日本語トップ＋Work 詳細ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白と黒とタイポグラフィだけの骨格に、グラデーションを差す**。UI パーツは限りなく少なく、角丸ゼロ・影ゼロ・枠線は 1px のみ。情報の階層は**文字サイズの極端なジャンプ**（12px ⇄ 151px）で作る
- **Whatever について**: 「考えて作る」を掲げるクリエイティブスタジオ。サイト自体が作品のショーケースで、Work のサムネイルが主役。UI は徹底して黒子に徹する
- **密度**: 低密度・全画面。`max-width` を持つコンテナがほぼ存在せず、要素は全幅にブリードする。1 セクション 1 メッセージ
- **キーワード**: 純白 `#ffffff` × 純黒 `#000000`、Apercu Bold の巨大見出し、10.5vw、radius 0、影ゼロ、9 色の蛍光グラデーション＋ノイズ、和文は Noto Sans JP Bold
- **特徴**:
  - **欧文は Apercu、和文は Noto Sans JP**。`font-family: Apercu, "Noto Sans JP", sans-serif` の 1 スタックを全要素で使い回し、**欧文優先**で並べる（欧文グリフは Apercu、和文は Noto Sans JP が受け持つ）
  - **`html { font-size: 10px }` が rem の基準**。`--font-size-ja: 1.5rem`（15px）／ `--font-size-en: 1.7rem`（17px）という **2 つだけの CSS 変数**で言語別の本文サイズを持つ
  - **見出しは vw ベースの流体**。ヒーローは `10.5vw`（1440px 幅で 151.23px）、セクション見出しは約 `2.64vw`（38px）
  - **和文リード文は weight 700 / lh 2.31**（27.5px → 63.45px）。**太いのに行間が極端に広い**という、和文としては珍しい組み方がブランドの声になっている
  - **ブランドカラーは 9 色**。`#0d44fb` `#29ebfe` `#00c745` `#89e82b` `#ffeb00` `#ff9201` `#ff2300` `#fd1eba` `#a725fc`。単色で使うことはほとんど無く、**2 色を `linear-gradient(to right in oklab, A, B)` で繋ぎ、`url("noise.png")` を上に重ねる**
  - **`in oklab` の補間指定が肝**。sRGB 補間では中間がくすむ色の組み合わせでも、oklab なら彩度を保ったまま繋がる
  - `.grad-effect-base` というクラスが見出しに付き、**テキストマスクとしてグラデーションを流す**演出に使う
  - **角丸は 0、影は 0、コンテナの `max-width` も無い**。唯一の枠線がタグの `1px solid #b4b4b4`

---

## 2. Color Palette & Roles

> 地は純白 `#ffffff`、文字は純黒 `#000000`。**UI に単色のブランドカラーは現れず、すべてグラデーションの構成色として使われる**。

### Brand Spectrum（グラデーションの構成色・9 色）

| 名前 | Hex | rgb |
|------|-----|-----|
| Blue | `#0d44fb` | 13,68,251 |
| Cyan | `#29ebfe` | 41,235,254 |
| Green | `#00c745` | 0,199,69 |
| Lime | `#89e82b` | 137,232,43 |
| Yellow | `#ffeb00` | 255,235,0 |
| Orange | `#ff9201` | 255,146,1 |
| Red | `#ff2300` | 255,35,0 |
| Magenta | `#fd1eba` | 253,30,186 |
| Purple | `#a725fc` | 167,37,252 |

- **9 色は色相環をほぼ均等に巡る**。任意の 2 色を選んで繋ぐと成立するように設計されている
- 単色のベタ塗りとしては使わない。**必ず 2 色のグラデーション**にする

### Gradient（実装）

```css
/* 実測される形。ノイズテクスチャを必ず重ねる */
background-image:
  url("/noise.png"),
  linear-gradient(to right in oklab, #0d44fb, #29ebfe);

/* 3 ストップ版（終端色を 2 回置いて後半をベタにする） */
background-image:
  url("/noise.png"),
  linear-gradient(to right in oklab, #ff2300, #ff9201, #ff9201);
```

- **`in oklab`（oklab 補間）を必ず指定する**。省略すると sRGB 補間になり、補色に近い組み合わせで中間がグレーに濁る
- 方向は `to right` が基本
- **終端色を 2 回書く 3 ストップ形**が多用される。前半でグラデーション、後半をベタにして文字を載せやすくする
- ノイズは PNG のタイル。グラデーションのバンディングを潰し、印刷物のような質感を与える

### Neutral（面・罫・文字）

- **Background** (`#ffffff`): ページ地色。純白
- **Ink** (`#000000`): テキスト・ボタンの面色。**純黒を使う**（軟らかい黒に逃げない）
- **Inverse** (`#ffffff`): 黒面の上のテキスト
- **Border** (`#b4b4b4`, rgb 180,180,180): カテゴリタグの 1px 枠。**サイトで唯一の罫線色**
- **Meta Gray** (`#cccccc`, rgb 204,204,204): 非活性の日付・言語切替（JA / EN / ZH）

### Semantic（意味的な色）

- スタジオサイトのため意味色は持たない。展開する際の目安は以下
- **Danger／Error**: `#ff2300`（Red）
- **Warning**: `#ff9201`（Orange）
- **Success**: `#00c745`（Green）
- **Info**: `#0d44fb`（Blue）
- 意味色として使うときも、**面はグラデーションではなく単色**にして装飾と区別する

---

## 3. Typography Rules

> **`Apercu, "Noto Sans JP", sans-serif` の 1 スタックを全要素で使い回す**。`html` の rem 基準が **10px** であること、見出しが **vw 基準の流体**であること、和文リードが **weight 700 / lh 2.31** であることが実装の要。

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP**（Google Fonts）。読み込むのは **300 / 500 / 700** の 3 ウェイトのみ
- 明朝体は使わない
- **和文は常にスタックの 2 番目**。先頭の Apercu が欧文グリフを取り、和文が Noto Sans JP に落ちる。**この順序が和欧の見え方を決めている**
- 300（本文）／ 500（カード見出し）／ 700（リード・大見出し・ボタン）の 3 段で使い分ける

### 3.2 欧文フォント

- **サンセリフ**: **Apercu**（Colophon Foundry）。幾何学とグロテスクの中間にある英国のサンセリフで、`a` `g` の字形が特徴的。ヒーローの `151px` Bold はこの書体の骨格を見せるための組み
- セリフ・等幅は使わない
- **preview.html での注記**: Apercu は Colophon Foundry のライセンスフォントのため、ローカルの preview.html では表示できない。プレビューでは **Google Fonts の `Archivo`（400/500/700）** を代替に用いる。Archivo はグロテスク系で `a` の骨格と字幅が Apercu に近く、巨大サイズでの印象が最も揃う。実装時は必ず Apercu を読み込むこと

### 3.3 font-family 指定

```css
/* rem の基準（16px ではない） */
html { font-size: 10px; }

:root {
  --font-size-ja: 1.5rem;   /* 15px — 日本語本文 */
  --font-size-en: 1.7rem;   /* 17px — 英語本文 */
}

/* 全要素で共通の 1 スタック */
font-family: Apercu, "Noto Sans JP", sans-serif;

/* body の既定 */
font-size: 15px;
font-weight: 300;
line-height: 2.0;         /* 30px */
letter-spacing: normal;
color: #000000;
font-feature-settings: normal;   /* palt は使わない */
```

**フォールバックの考え方**:
- **欧文を先頭**に置く（Apercu → Noto Sans JP → sans-serif）。和文サイトとしては珍しい欧文優先型で、英語ロゴ・英語見出しが多いスタジオサイトの性格に合わせている
- 和文は必ず 2 番目に置き、`sans-serif` で締める
- **言語ごとに本文サイズを変える**（日本語 15px / 英語 17px）。和文は字面が大きいので 2px 落とす、という考え方

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero | Apercu | **151.23px**（`10.5vw`） | 700 | normal | normal | "Make whatever. Rules, whatever." |
| Section Head | Apercu | 38.07px（約 `2.64vw`） | 700 | normal | normal | "Featured Works" / "Latest News" |
| Lead (JP) | Noto Sans JP | 27.50px（約 `1.91vw`） | **700** | **2.31 (63.45px)** | normal | 和文リード。太くて行間が極端に広い |
| Work Detail H2 | Apercu | 32px | 700 | 1.3 (41.6px) | 0.01em (0.32px) | 事例ページの見出し |
| Card Title | Apercu | 28px | 700 | 1.2 (33.6px) | normal | 作品名 |
| Button | Apercu | 18px | 700 | normal | 0.04em (0.72px) | 黒ボタンの文字 |
| Nav / CTA (JP) | Noto Sans JP | 16px | 700 | normal | 0.04em (0.64px) | 「お問い合わせ」 |
| Body (EN) | Apercu | 17px | **200** | 1.76 (30px) | normal | 事例ページの本文。**最も細い** |
| Body (JP) | Noto Sans JP | 15px | 300 | **2.0 (30px)** | normal | `body` 既定 |
| Card Meta | Noto Sans JP | 15px | 500 | 1.6 (24px) | normal | 作品の説明文 |
| Label / Tag | Apercu | 12px | 300 | normal | **0.12em (1.44px)** | カテゴリタグ・言語切替 |
| Caption | Apercu | 12px | 300 | normal | 0.03em (0.36px) | 日付・小さなメタ |
| Caption (inverse) | Apercu | 12px | 300 | normal | 0.07em (0.84px) | 濃色面上の小文字 |

- **サイズのジャンプが極端**（12px → 151px）。中間サイズをほとんど使わないことでコントラストを作っている
- **見出しは vw 基準の流体**。1440px 幅での実測から逆算すると Hero が `10.5vw`、セクション見出しが約 `2.64vw`
- **`font-weight: 200` が事例ページの本文**に使われる。Apercu の Extra Light で、和文が混じらない英語ページでのみ成立する細さ

### 3.5 行間・字間

- **和文本文の行間 (line-height)**: **2.0**（15px → 30px）
- **和文リードの行間**: **2.31**（27.5px → 63.45px）。**サイトで最も広い**。太い weight 700 に対して行間を極端に開くことで、圧を逃がしつつ 1 行 1 行を独立させる
- **欧文本文の行間**: **1.76**（17px → 30px）。和文と**行送りの実寸（30px）を揃えている**
- **見出しの行間**: `normal`（Apercu の既定 ≒ 1.2）。ヒーロー・セクション見出しは締める
- **字間 (letter-spacing)**: 本文は `normal`。**12px の小さなラベルだけ `0.12em` と大きく開く**。ボタンは `0.04em`
- **`palt` は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- 和文と欧文で**行送りの絶対値（30px）を揃える**。サイズは違っても行のリズムが揃う
- 太い和文ほど行間を開く（weight 700 なら 2.3 前後）
- 小さいラベルは大きく開く（12px に 0.12em）。大きい見出しは開かない
- 12px と 151px のような**極端なジャンプ**を恐れない。中間サイズで階層を埋めない

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- ヒーローの巨大見出しは**手動で改行位置を決める**（`.line1` / `.line2` のように行ごとに要素を分ける）。自動折り返しに任せない

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を掛けない */
```

- **`palt` は使わない**。Noto Sans JP の等幅の字面をそのまま使い、詰めは行わない
- 字間の調整は `letter-spacing` で行う（**開く方向のみ**）
- 欧文の `kern` は Apercu 側の既定に任せる

### 3.8 縦書き

- 該当なし。UI・記事とも横組み

---

## 4. Component Stylings

### Buttons

**Primary（黒の矩形）** — サイトで唯一のボタン形状

- Background: `#000000`
- Text: `#ffffff`
- Padding: `4px 6px 1px`（ボタンの箱は幅 256px / 高さ 60〜80px を別途与える）
- Border Radius: **`0px`**
- Border: なし
- Font: Apercu / 18px / weight 700 / ls 0.04em
- 例: 「Watch Reel」「Learn more」「All Works」
- ホバー: 面をブランドグラデーションに差し替える（`url(noise.png), linear-gradient(to right in oklab, A, B)`）

**Tag（カテゴリタグ）**

- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #b4b4b4`
- Padding: `9px 10px 7px`
- Border Radius: **`0px`**
- Font: Apercu / 12px / weight 300 / **ls 0.12em**
- 例: 「Branding」「Web / App」「Event / Installation」

### Inputs

- Background: `#ffffff`
- Border: `1px solid #b4b4b4`
- Border (focus): `1px solid #000000`
- Border Radius: **`0px`**
- Padding: `12px 14px`
- Font: Apercu / 15px / weight 300 / lh 2.0
- Text Color: `#000000` / Placeholder: `#cccccc`

### Cards（Work サムネイル）

- Background: `#ffffff`
- Border: なし
- Border Radius: **`0px`**（画像も角丸にしない）
- 構成: 画像 → 作品名（Apercu 28px / 700）→ 説明（Noto Sans JP 15px / 500）→ タグ（12px / 300 / ls 0.12em）
- Shadow: **なし**

### Gradient Band / Gradient Text

- 帯: `background-image: url("/noise.png"), linear-gradient(to right in oklab, A, B);`
- 文字マスク: 同じ背景に `background-clip: text; color: transparent;` を掛ける（`.grad-effect-base`）
- **必ずノイズを重ねる**。グラデーション単体では使わない

---

## 5. Layout Principles

### Spacing Scale

rem 基準が 10px なので、余白は 10 の倍数で刻みやすい。

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 10px |
| M | 20px |
| L | 40px |
| XL | 80px |
| XXL | 120px |
| XXXL | 200px |

### Container

- Max Width: **なし**。`max-width` を持つコンテナが実質存在せず、**要素は全幅にブリードする**
- 左右の padding だけで内容を寄せる（実測でおよそ 160px / 1440px 幅時 ≒ 11%）
- 読み物カラムは事例ページの本文ブロックで 600〜700px 程度

### Grid

- Featured Works は 2 カラムの大きなサムネイル、Latest News は 1 カラムのリスト
- Gutter: 40px
- **グリッドに合わせて見出しを縮めない**。見出しは vw で伸び、グリッドを跨いで置かれる

---

## 6. Depth & Elevation

**Whatever のサイトには `box-shadow` が存在しない。** 奥行きは黒面・白地・グラデーション帯のコントラストだけで作る。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定にして唯一**。白 `#ffffff` × 黒 `#000000` × グラデーション帯の 3 層で階層を作る |

- 浮遊感が必要なときは影ではなく**黒のベタ面**を置く
- グラデーション帯は最前面のレイヤーとして扱い、その上には白文字のみを載せる
- **ノイズテクスチャが唯一の「質感」**。影の代わりにこれが平面に厚みを与える

---

## 7. Do's and Don'ts

### Do（推奨）

- `font-family: Apercu, "Noto Sans JP", sans-serif` の **1 スタックを全要素で使い回す**（欧文優先）
- `html { font-size: 10px }` を rem の基準にし、`--font-size-ja: 1.5rem` / `--font-size-en: 1.7rem` で言語別の本文サイズを持つ
- 見出しは **vw 基準の流体**にする（ヒーロー `10.5vw`、セクション見出し `2.64vw`）
- **和文リードは weight 700 / line-height 2.3** で組む。太くして行間を開く
- 和文（15px / lh 2.0）と欧文（17px / lh 1.76）で**行送りの実寸 30px を揃える**
- 12px のラベルは `letter-spacing: 0.12em` と大きく開く
- グラデーションは **`linear-gradient(to right in oklab, A, B)` ＋ `url(noise.png)`** の組でのみ使う
- 9 色のスペクトラムから 2 色を選んで繋ぐ。組み合わせは自由に変えてよい
- ボタンは**黒ベタの矩形（radius 0）**。ホバーでグラデーションに差し替える

### Don't（禁止）

- **角丸を使わない**（ボタン・カード・画像・入力欄すべて radius 0）
- **box-shadow を使わない**（サイト全体に影が存在しない）
- **グラデーションを単色のベタ塗りに崩さない**（9 色は必ず 2 色 1 組で使う）
- **`in oklab` を省略しない**（sRGB 補間だと補色寄りの組み合わせで中間が濁る）
- **ノイズを外さない**（グラデーション単体はこのブランドの見え方ではない）
- 和文を先頭にしたスタックにしない（欧文優先の並びが Apercu の字面を出すための条件）
- 中間サイズで階層を埋めない（12px と 151px の落差そのものが設計）
- `palt` を掛けない、本文の `letter-spacing` を詰めない
- 軟らかい黒（`#222` 等）に逃げない。**テキストは純黒 `#000000`**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。ヒーローは vw のまま縮む。ナビはハンバーガー |
| Tablet | 768–1024px | Featured Works が 1〜2 カラム |
| Desktop | > 1024px | 2 カラム。コンテナは持たず全幅ブリード |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。黒ボタンは実測で 256 × 60〜80px あり十分
- 12px のタグは padding（`9px 10px 7px`）で高さ 30px 程度。モバイルでは縦 padding を 12px 以上に広げる

### フォントサイズの調整

- **見出しは vw なので自動で縮む**。ヒーロー `10.5vw` は 375px 幅で約 39px になり、そのままで成立する
- 和文本文 15px / 欧文本文 17px は据え置く
- 和文リードは 27.5px（`1.91vw`）→ モバイルでは 18〜20px 程度。**行間 2.3 は維持する**
- 12px のラベルは縮めない（`letter-spacing: 0.12em` も維持）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff   （純白）
Ink:            #000000   （純黒。軟らかい黒は使わない）
Border:         #b4b4b4   （タグの 1px 枠。サイト唯一の罫線色）
Meta Gray:      #cccccc   （非活性の日付・言語切替）
Spectrum:       #0d44fb #29ebfe #00c745 #89e82b #ffeb00 #ff9201 #ff2300 #fd1eba #a725fc
Gradient:       url("/noise.png"), linear-gradient(to right in oklab, A, B)
Font:           Apercu, "Noto Sans JP", sans-serif   ← 欧文優先の 1 スタック
rem Base:       html { font-size: 10px }   ← 16px ではない
--font-size-ja: 1.5rem (15px) / --font-size-en: 1.7rem (17px)
Body (JP):      15px / weight 300 / lh 2.0
Body (EN):      17px / weight 200 / lh 1.76   ← 行送りは和文と同じ 30px
Lead (JP):      約 1.91vw (27.5px) / weight 700 / lh 2.31
Hero:           10.5vw (1440px 幅で 151px) / weight 700
Section Head:   約 2.64vw (38px) / weight 700
Label:          12px / weight 300 / letter-spacing 0.12em
Button:         #000000 面 / #ffffff 文字 / 18px / weight 700 / ls 0.04em / radius 0
Radius:         0（すべて）
Shadow:         none（サイト全体に box-shadow が存在しない）
Container:      max-width なし（全幅ブリード。左右 padding のみ）
```

### プロンプト例

```
Whatever のデザインシステムに従って、クリエイティブスタジオの制作実績ページを作成してください。
- html の font-size は 10px にして、--font-size-ja: 1.5rem / --font-size-en: 1.7rem を定義する
- 全要素の font-family は Apercu, "Noto Sans JP", sans-serif（無ければ Archivo で代替）。
  欧文を先頭に置く順序を崩さない
- 地は純白 #ffffff、文字は純黒 #000000。軟らかい黒は使わない
- ヒーロー見出しは font-size: 10.5vw / weight 700 で、改行位置は要素を分けて手動で決める
- セクション見出しは 2.64vw / weight 700
- 和文リードは 1.91vw / weight 700 / line-height 2.31（太くして行間を極端に開く）
- 和文本文 15px / weight 300 / lh 2.0、欧文本文 17px / weight 200 / lh 1.76
  （行送りの実寸をどちらも 30px に揃える）
- カテゴリタグは 12px / weight 300 / letter-spacing 0.12em / 1px solid #b4b4b4 / radius 0
- ボタンは黒ベタの矩形（背景 #000000、文字 #ffffff、18px / weight 700 / ls 0.04em、radius 0）。
  ホバーでブランドグラデーションに差し替える
- グラデーションは必ず
  background-image: url("/noise.png"), linear-gradient(to right in oklab, A, B);
  の形で書く。A / B は #0d44fb #29ebfe #00c745 #89e82b #ffeb00 #ff9201 #ff2300 #fd1eba #a725fc
  の 9 色から 2 色を選ぶ。in oklab とノイズは省略しない
- border-radius はすべて 0、box-shadow は一切使わない
- max-width のコンテナを作らず、左右 padding だけで内容を寄せる
- font-feature-settings は normal（palt は掛けない）
```
