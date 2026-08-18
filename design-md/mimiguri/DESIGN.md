# DESIGN.md — MIMIGURI（ミミグリ）

> 人と組織の経営コンサルティングファーム 株式会社MIMIGURI の公式サイト（https://mimiguri.co.jp/）のデザイン仕様書。
> 「創造性の土壌を耕す／Cultivate the Creativity」を掲げ、研究知（CULTIBASE）とコンサルティングを両輪で回す。
> 最大の特徴は **和文 Tazugane Gothic StdN ＋ 欧文 Palatino Sans LT Pro** という珍しい組み合わせと、**行間を `--lh-s: 1.5` / `--lh-m: 1.75` / `--lh-l: 2` の 3 トークンだけで統率する**こと。**サイト全体のほぼ全テキストが 1.75**で組まれている。
> 色はほぼ **`#111` と `#fff` の 2 色**。CTA も塗らず、**1px の枠と radius 50px のピル**だけで示す。
> リンクの下線は `text-decoration` ではなく **`background-image` のグラデーションを `background-size: 0 1px → 100% 1px` でアニメーション**させて引く。
> 実サイトの computed style 実測（2026-08-18 取得。トップページ + 提供サービスページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **絵が語り、UI は黙る**。ファーストビューは全画面の絵画的イラスト（森・土・果実）で、その上に白文字だけを置く。以降のセクションは白地・黒文字に切り替わり、装飾を一切足さない
- **MIMIGURI について**: 「創造性の土壌を耕す」を掲げる経営コンサルティングファーム。**「土壌を耕す」という比喩をビジュアルの中心に据えている**ため、ヒーローの絵が情報より先に立つ
- **密度**: 低〜中密度・企業サイト型。**セクション間を PC で `margin-top: 160px`〜`320px` 空ける**（SP は 100px）。1 画面に 1 メッセージ
- **キーワード**: Tazugane Gothic、Palatino Sans、`#111` と `#fff`、行間 1.75、ピル枠 CTA、グラデーション下線、余白 160/320px
- **特徴**:
  - **色を持たない**。CSS 変数に定義された色は `#111` `#707070` `#ddd` `#444` `#aaa` `#fff` `#d00` の 7 つで、**うち有彩色は `#d00`（バリデーション用）だけ**。ブランドカラーという概念を UI に持ち込まず、**色の役割はイラストが担う**
  - **行間トークンが 3 つしかない**。`--lh-s: 1.5` / `--lh-m: 1.75` / `--lh-l: 2`。**見出しも本文もキャプションも同じ 1.75** で、読み物本文だけ 2 に開く。日本語サイトとしてはかなり思い切った統一
  - **和文の太字は「別ファミリー」で切り替える**。`--font-jp: TazuganeGothicStdN-Regular` と `--font-jp-bold: TazuganeGothicStdN-Bold` の 2 変数を持ち、**`font-weight: 700` と同時にファミリー名も差し替える**
  - **欧文だけ Palatino Sans LT Pro に切り替える**。「PICKUP EVENT」「Creative Cultivation」「Business & Service」といったセクションの英語ラベル専用。**和文には一切かからない**
  - **CTA を塗らない**。「お問い合わせ」は `background: transparent` ＋ `1px solid` ＋ `border-radius: 50px`。**濃色（ヒーロー）の上では枠と文字が白、白地では `#111`** に反転する
  - **カードの角丸は 4px、影は `0 2px 6px rgba(0,0,0,.1)` の 1 種類だけ**。それ以外の面は影を持たない
  - **リンクの下線がグラデーション**。`background-image: linear-gradient(#111, #111)` を `background-size: 0 1px` で隠し、hover で `100% 1px` に伸ばす（`transition: background-size .2s cubic-bezier(.01,.65,.43,.98)`）
  - 実装は Tailwind ベース。**ブレークポイント名が `md`（≤768px）と `mdMin`（>768px）の 2 つ**という独自命名

---

## 2. Color Palette & Roles

> CSS Custom Properties が `:root` に定義されている。**そのまま使うこと**。

### Neutral（サイトの色はほぼこれだけ）

- **Black1** (`#111111`) — `--color-black1`: **本文・見出し・ボーダー・下線のすべて**。純黒 `#000` は使わない
- **Gray1** (`#707070`) — `--color-gray1`: 英語ラベル（PICKUP EVENT 等）、住所・コピーライト等のフッター補助テキスト
- **Gray2** (`#dddddd`) — `--color-gray2`: 区切り線・淡いボーダー
- **Gray3** (`#444444`) — `--color-gray3`: 補助テキストの濃いほう
- **Gray4** (`#aaaaaa`) — `--color-gray4`: プレースホルダ・無効状態
- **White1** (`#ffffff`) — `--color-white1`: **ページ背景・カードの面・濃色上の文字**

### Semantic（意味的な色）

- **Red1** (`#dd0000`) — `--color-red1`: **サイト唯一の有彩色**。フォームのエラー・必須マーク用
- Success / Warning は **定義されていない**。実装で追加する場合は `--color-red1` と同じ粒度で `--color-green1` 等を足し、**UI に色を増やさない**方針を守る

### Overlay

- **Scrim** (`rgba(0, 0, 0, .7)`): ヒーロー画像の上に白文字を置くときの暗幕。**SP のメニュー展開時にも使う**

### 背景の扱い

- **ページ背景は `#ffffff`**。ただし `html` / `body` に塗り指定はなく、**UA 既定のキャンバスが白として見えている**状態（実測の根拠も `ua-default-canvas`）。実装では `body { background: var(--color-white1); }` を明示すること
- **ヒーローは画像そのものが背景**。色ではなくイラストが面を作る

---

## 3. Typography Rules

> **和文 Tazugane Gothic StdN ＋ 欧文 Palatino Sans LT Pro**。`palt` は使わず、**字間は原則 `normal`**。行間は 3 トークンだけ。

### 3.1 和文フォント

- **ゴシック体**: **Tazugane Gothic StdN**（田附ゴシック / Monotype）
  - Regular: `TazuganeGothicStdN-Regular`
  - Bold: `TazuganeGothicStdN-Bold`
- **Regular と Bold が別ファミリー名**として定義されている。可変フォントでもウェイト指定でもなく、**ファミリーを差し替えて太字にする**実装
- 明朝体は使わない
- Tazugane Gothic は **Neue Frutiger と字面・重心を合わせて設計された和文書体**。ヒューマニスト系の欧文と混植したときに、和文だけが重く沈まないのが選定理由と考えられる

### 3.2 欧文フォント

- **サンセリフ**: **Palatino Sans LT Pro**（`PalatinoSansLTPro-Regular`）
  - Hermann Zapf 設計のヒューマニストサンセリフ。**セクションの英語ラベル専用**に使う
  - 例: 「PICKUP EVENT」14px / ls 0.7px、「Creative Cultivation」20px / ls 1px、「Business & Service」14px / ls 0.7px
- **欧文フォントを本文には使わない**。和文中の英数字は Tazugane Gothic の欧文グリフに任せる
- 等幅フォントの指定はない

### 3.3 font-family 指定

```css
:root {
  --font-jp:      "TazuganeGothicStdN-Regular", sans-serif;
  --font-jp-bold: "TazuganeGothicStdN-Bold", sans-serif;
  --font-en:      "PalatinoSansLTPro-Regular", sans-serif;

  --fw-regular: 400;
  --fw-medium:  500;
  --fw-bold:    700;

  --lh-s: 1.5;
  --lh-m: 1.75;
  --lh-l: 2;
}

/* 本文・UI */
font-family: var(--font-jp);
font-weight: var(--fw-regular);
line-height: var(--lh-m);          /* 1.75 */
letter-spacing: normal;
font-feature-settings: normal;     /* palt は使わない */

/* 太字（ファミリーごと差し替える） */
font-family: var(--font-jp-bold);
font-weight: var(--fw-bold);

/* 英語ラベル */
font-family: var(--font-en);
letter-spacing: .05em;
```

**フォールバックの考え方**:

- **フォールバックは `sans-serif` の 1 段だけ**。Web フォントが落ちたときに游ゴシックやヒラギノを挟まず、OS の既定サンセリフへ直接落とす割り切り
- **Web フォントが必須の設計**。ライセンス上 Tazugane Gothic を使えない実装では、**同じヒューマニスト系の和文（例: Zen Kaku Gothic New、Noto Sans JP）に置き換え、行間 1.75 と `letter-spacing: normal` を守る**ほうが印象は近くなる
- **`--font-jp-bold` を用意する**のを忘れない。`font-weight: 700` だけ指定して合成太字（fake bold）にすると、Tazugane の字面が崩れる

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Title | 和文 Bold | **48px** | **700** | 1.75 (84px) | normal | 下層ページの `h1`「提供サービス」 |
| Section Head | 和文 Bold | **40px** | **700** | 1.75 (70px) | normal | 「人と組織の可能性を最大限に活かした〜」 |
| Hero Catch | 和文 Regular | 30px | 400 | 1.75 (52.5px) | **3px (0.1em)** | 「創造性の土壌を耕す」。**唯一の広い字間** |
| Sub Head | 和文 Bold | 28px | **700** | 1.75 (49px) | normal | 「吸収合併によって生まれた〜」 |
| Card Head | 和文 Bold | 24px | **700** | 1.75 (42px) | normal | 「ルールのデザイン」 |
| English Lead | **Palatino** | 20px | 400 | 1.75 (35px) | **1px (0.05em)** | 「Creative Cultivation」 |
| Item Title | 和文 Bold | 18px | **700** | 1.75 (31.5px) | normal | 記事タイトル・「CULTIBASE Lab」 |
| Lead Body | 和文 Regular | 18px | 400 | **2.0 (36px)** | normal | **読ませる本文。ここだけ `--lh-l`** |
| Nav (SP) | 和文 Bold | 18px | **700** | 2.0 (36px) | normal | 展開メニューの第 1 階層 |
| Body | 和文 Regular | 16px | 400 | 1.75 (28px) | normal | `body` 既定 |
| UI / Nav | 和文 Regular | 14px | 400 | 1.75 (24.5px) | normal | グローバルナビ・二次リンク |
| CTA | 和文 Bold | 14px | **700** | 1.75 (24.5px) | normal | 「お問い合わせ」 |
| English Label | **Palatino** | 14px | 400 | 1.75 (24.5px) | **0.7px (0.05em)** | 「PICKUP EVENT」。色 `#707070` |
| Meta | 和文 Regular | 14px | 400 | 1.75 (24.5px) | normal | 日付＋タイトルの一行メタ |
| Caption | 和文 Regular | 12px | 400 | 1.75 (21px) | normal | 住所・コピーライト。色 `#707070` |
| Tag | 和文 Bold | 12px | **700** | 1.75 (21px) | normal | 「会員サービス」 |

- **weight は 400 と 700 の 2 値運用**（`--fw-medium: 500` は定義だけあり、実測では使われていない）
- **サイズだけで階層を作る**。色や字間で見出しを強調しない

### 3.5 行間・字間

- **原則 1.75（`--lh-m`）**。見出しからキャプションまで、実測したほぼ全要素がこの比率
- **読ませる本文だけ 2.0（`--lh-l`）**。18px のリード文・説明文がこれに当たる
- **1.5（`--lh-s`）は密に詰めたいとき用**のトークン。トップページの実測には現れない
- **字間は `normal`**。例外は次の 2 つだけ
  - **ヒーローのキャッチ（30px）に `letter-spacing: 3px`（0.1em）**。1 行しかない短文を絵の上で伸ばすための処理
  - **Palatino Sans の英語ラベルに `0.05em`**（14px→0.7px / 20px→1px）
- `palt` は使わない

**ガイドライン**:

- **見出しに 1.3 のような詰まった行間を持ち込まない**。40px の見出しでも 1.75（＝70px）を維持するのが MIMIGURI の版面
- **0.1em の字間を本文に広げない**。ヒーロー 1 箇所限定の演出
- 英語ラベルは **必ず Palatino Sans ＋ 0.05em ＋ `#707070`** の 3 点セットで使う

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
word-break: normal;
line-break: strict;
```

**禁則対象**:

- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 「CULTIBASE Lab」「Creative Cultivation」など**和欧混植が頻出**する。`word-break: break-all` は使わない（英単語が途中で割れる）
- 見出しは 40px / 行間 1.75 で 2〜3 行に折り返す前提。**`<br>` での手動改行に頼らない**

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* 全ページ共通 */
```

- **`palt` を掛けない**。Tazugane Gothic の字面をそのまま使い、詰めが必要な箇所だけ `letter-spacing` で調整する方針
- 欧文は Palatino Sans 側のカーニングに任せる（`kern` の明示指定なし）

### 3.8 縦書き

**縦組みは使わない。** `writing-mode` の指定は全ページで 0 件。

---

## 4. Component Stylings

> **塗りボタンが存在しない**。CTA は「枠だけのピル」1 種類。

### Buttons

**Primary CTA（枠だけのピル）— ヘッダー「お問い合わせ」**

- Background: **`transparent`**
- Text: 白地では `#111111` ／ **濃色（ヒーロー）の上では `#ffffff`**
- Border: **`1px solid currentColor`**（白地では `#111`、ヒーロー上では `#fff`）
- Border Radius: **`50px`**（ピル）
- Padding: **`6px 24px`**
- Font: 和文 Bold 14px / **700** / lh 1.75
- Transition: `all .2s cubic-bezier(.01,.65,.43,.98)`
- **背景を塗らないので、下のイラストが透ける**のが要点

**Text Link（グラデーション下線）— サイトの主要な導線**

```css
.link {
  text-decoration: none;
  background-image: linear-gradient(#111, #111);   /* = --color-black1 */
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 0 1px;                          /* 通常は見えない */
  transition: background-size .2s cubic-bezier(.01, .65, .43, .98),
              color        .2s cubic-bezier(.01, .65, .43, .98);
}
.link:hover { background-size: 100% 1px; }         /* 右から左へ伸びる */
```

- **`text-decoration: underline` を使わない**。下線の太さ（1px 固定）と伸びる方向を制御するため
- フッターの二次リンク（プライバシーポリシー、X(Twitter)、CULTIBASE Radio 等）はすべてこの方式
- `body.win` のときだけ `padding-bottom: 0` に補正するルールがある（**Windows で下線位置がずれる対策**）

### Cards

- Background: **`#ffffff`**
- Border Radius: **`4px`**
- Shadow: **`0 2px 6px rgba(0, 0, 0, .1)`**（サイトで唯一の影）
- `overflow: hidden` で画像を角丸に沿わせる
- 構成: 画像 → タイトル（18px / 700 / lh 1.75）→ 補足（14px / 400）
- **PC は横並び、SP は `flex-col-reverse`**（画像が下に回る）

### Badges / Tags

- **面色を持たない**。「会員サービス」等のラベルは **12px / weight 700 / `#111`** の素のテキスト
- 面で囲みたい場合も**カードの radius 4px に揃える**（ピル 50px は CTA 専用）

### Inputs

- 実測できるフォームがトップ／サービスページに無いため、**以下は変数から導いた推奨値**
- Background: `#ffffff`
- Border: `1px solid var(--color-gray2)`(#ddd) → focus は `1px solid var(--color-black1)`(#111)
- Border Radius: `4px`（カードに揃える）
- Padding: `12px 16px` / Font: 16px / lh 1.75
- Placeholder: `var(--color-gray4)`(#aaa)
- Error: 枠と文言を **`var(--color-red1)`(#dd0000)**
- **フォーカスリングは実サイトでは UA 既定のまま**（`outline: auto 1px #005fcc`）。**実装では必ず可視のリングを明示すること**（この点はサイトの実装をそのまま真似しない）

### Header

- Height: **`97px`（PC） / `64px`（SP）** — `--header-height-pc` / `--header-height-sp`
- `position: fixed`。**`--main-offset-pc: -97px` で本文を持ち上げ、ヒーロー画像をヘッダーの裏に潜り込ませる**
- ヒーロー上では**ロゴ・ナビ・CTA がすべて白**、スクロール後の白地では `#111` に反転する

---

## 5. Layout Principles

### Spacing Scale

実測値から起こしたスケール（Tailwind の任意値で指定されている）。

| Token | Value | 用途 |
|-------|-------|------|
| XS | 10px | SP のグリッド gap |
| S | 15–16px | SP のグリッド gap ／ PC のカード内 gap |
| M | 20px | カードグリッドの gap |
| L | 32px | 見出しとコンテンツの間 |
| XL | 40px | セクション内の 2 カラム gap ／ 左右の外余白 |
| XXL | 48px | サービスカードの gap |
| Section (SP) | **100px** | セクション間の `margin-top` |
| Section (PC) | **160px** | セクション間の `margin-top` |
| Section (PC 大) | **320px** | 章が変わるところの `margin-top` |

- **セクション間の余白が 160px / 320px と極端に広い**。これが「1 画面 1 メッセージ」の体感を作っている

### Container

- Max Width: **`1200px`**（`box-content` なのでこれが**コンテンツ幅**）
- Padding (horizontal): **`40px`**（PC） / SP は左右 20px 相当
- 中央寄せ: `margin-inline: auto`

### Grid

- **2 カラムが基本**（`mdMin:grid-cols-2`）
- Gutter: `48px`（サービスカード） / `40px 0`（縦のみ空ける 2 カラム） / `20px`（記事カード）
- SP では 1 カラムに落とし、gap を `10px`〜`15px` に詰める

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。セクション・ヘッダー・CTA すべて影なし** |
| 1 | **`0 2px 6px rgba(0, 0, 0, .1)`** | **カードのみ**（radius 4px と必ずセット） |
| — | — | Level 2 以上は**存在しない**。モーダル・ドロワーも影ではなく `rgba(0,0,0,.7)` の暗幕で階層を示す |

- **影で階層を作らないサイト**。奥行きは「余白」と「暗幕」で表現する

---

## 7. Do's and Don'ts

### Do（推奨）

- **行間は 1.75 を既定にする**。読ませる本文だけ 2.0 に開く
- **太字は `--font-jp-bold` にファミリーごと切り替える**（`font-weight: 700` と併用）
- **英語ラベルは Palatino Sans ＋ `letter-spacing: .05em` ＋ `#707070`** の 3 点セットで統一する
- **CTA は塗らずに `1px` 枠 ＋ `border-radius: 50px`**。濃色の上では枠・文字ともに白に反転させる
- **リンクの下線は `background-size` アニメーション**で引く（0 → 100%、0.2s、`cubic-bezier(.01,.65,.43,.98)`）
- **セクション間は PC で 160px 以上空ける**
- 色は `--color-*` の 7 変数から選ぶ。**足すなら理由を持って足す**

### Don't（禁止）

- **色を増やさない**。ブランドカラーを新設して CTA を塗ると、このサイトの設計が崩れる
- **`text-decoration: underline` を直接使わない**（下線の太さと出方が変わる）
- **`palt` を掛けない**。字詰めは `letter-spacing` で行う
- **見出しの行間を 1.3 に詰めない**。40px でも 1.75 を守る
- **ヒーローの `letter-spacing: 3px` を他所へ持ち出さない**
- **カード以外に影を付けない**。radius 50px は CTA 専用、radius 4px はカード専用
- **フォーカスリングを UA 既定のまま放置しない**（実サイトはそうなっているが、実装では明示する）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| `md` | **≤ 768px** | モバイル。1 カラム、ヘッダー 64px、ドロワーナビ |
| `mdMin` | **> 768px** | タブレット〜デスクトップ。2 カラム、ヘッダー 97px |
| （補助） | ≤ 1279px / ≥ 1280px | ヒーローの絵と大見出しの縮小に使う |
| （hover） | `@media (hover: hover) and (min-width: 1101px)` | **下線アニメーションはホバー可能な広い画面でだけ有効** |

- **`md` / `mdMin` という 2 分岐が実装の基本**。中間のタブレット専用レイアウトを持たない

### レイアウトの切り替え

- グリッド: `grid-cols-2` → 1 カラム
- gap: `48px` / `40px` / `20px` → `15px` / `10px`
- セクション間: `160px`（PC）/ `320px`（PC 大） → **`100px`**（SP）
- ヘッダー: `97px` → `64px`（`--header-height-sp`）。**ナビはハンバーガー ＋ 全画面ドロワー**（暗幕 `rgba(0,0,0,.7)`）
- ドロワー内は **第 1 階層 18px / 700 / lh 2.0**、第 2 階層 14px / 400

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- CTA のピルは `6px 24px` パディングのため、**SP では上下パディングを 12px 以上に増やして 44px を確保する**

### フォントサイズの調整

- 見出しは `48px` → 28〜32px、`40px` → 24〜28px 程度に縮める
- **本文 16px / リード 18px は SP でも下げない**（行間 1.75〜2.0 を保てば読める）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text Color:   #111111   (--color-black1)
Sub Text:     #707070   (--color-gray1)
Border:       #dddddd   (--color-gray2)
Background:   #ffffff   (--color-white1)
Error:        #dd0000   (--color-red1)

Font (JP):        "TazuganeGothicStdN-Regular", sans-serif
Font (JP Bold):   "TazuganeGothicStdN-Bold", sans-serif
Font (EN label):  "PalatinoSansLTPro-Regular", sans-serif

Body Size:    16px
Line Height:  1.75  (読ませる本文は 2.0)
Letter Spacing: normal  (英語ラベルのみ .05em)
palt:         使わない

CTA:          transparent / 1px solid currentColor / radius 50px / padding 6px 24px / 14px 700
Card:         #fff / radius 4px / shadow 0 2px 6px rgba(0,0,0,.1)
Container:    1200px + padding 40px
Breakpoint:   768px (md / mdMin)
```

### プロンプト例

```
MIMIGURI のデザインシステムに従って、サービス紹介セクションを作成してください。

- フォント: 和文 "TazuganeGothicStdN-Regular"、太字は "TazuganeGothicStdN-Bold" にファミリーごと切り替える
- 英語ラベル（"Our Service" 等）は "PalatinoSansLTPro-Regular" / letter-spacing: .05em / 色 #707070
- 見出し 40px / 700 / line-height 1.75、本文 18px / 400 / line-height 2.0
- letter-spacing は normal、font-feature-settings も normal（palt を掛けない）
- CTA は塗らない: background: transparent / border: 1px solid #111 / border-radius: 50px / padding: 6px 24px / 14px / 700
- カードは #fff / border-radius: 4px / box-shadow: 0 2px 6px rgba(0,0,0,.1)
- リンクの下線は background-image のグラデーションを background-size: 0 1px → 100% 1px でアニメーション
- コンテナは max-width 1200px + padding 0 40px、セクション間は margin-top 160px
- 768px 以下で 1 カラム、gap を 15px に、セクション間を 100px に詰める
```
