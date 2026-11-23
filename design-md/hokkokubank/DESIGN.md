# DESIGN.md — 北國銀行（The Hokkoku Bank）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-23 / 対象: `https://www.hokkokubank.co.jp/index.html`, `/company/about/outline/profile.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **ぼかしゼロの「厚み」でボタンとカードを立たせる、やわらかい銀行。** 影は `box-shadow: <ベージュ> 0 4px 0 0` という**ぼかし半径 0 の面ずらし**で、23 要素すべてが同じ作り。角丸 80px のピル型 CTA と丸ゴシックのアクセント書体で、金融機関の硬さを抜いている
- **密度**: 中。本文は 16px / `line-height: 1.5`（24px）で、**16 幅すべてで 1px も動かない完全固定**
- **キーワード**: 自社ホスト配信の Noto Sans JP、ファミリーで作る太字、ぼかし 0 の立体ボタン、ピル型 CTA、Zen Maru Gothic のアクセント

**このサイトの核心は5つある。**

1. **太さを `font-weight` ではなく `font-family` で切り替える。** 自社ホストに `noto-sans`（= `NotoSansJP-Regular.woff`）と **`noto-sans-bold`（= `NotoSansJP-Bold.woff`）を別ファミリーとして**置き、CSS は `font-family: noto-sans-bold, noto-sans, sans-serif` と書く（トップ 60 要素 / 下層 15 要素）。**`font-weight` は 100〜900 のどれを当てても字幅が 1px も変わらない**（実スタック 100px で和文 2300.00px / 欧文 1134.61px が 9 段すべて一致）。合成太字すら起きないので、**太字はファミリーを差し替える以外に作れない**
2. **Typekit 風のハイフン区切り小文字の名前だが、Adobe Fonts ではない。** `noto-sans` / `noto-sans-bold` / `zen-maru-gothic` はどれも**自社ドメイン `/assets/fonts/` に置いた `.woff`**（フォント要求 4 件の host は `www.hokkokubank.co.jp` のみ）。CDP `CSS.getPlatformFontsForNode` の実描画は **Noto Sans JP** と **Zen Maru Gothic**
3. **正式名の `@font-face { font-family: "Zen Maru Gothic" }` は宣言されているが死んでいる。** `document.fonts` で 3 回出てきて**すべて `unloaded`**。実際に使われるのは別名の `zen-maru-gothic` のほうだけ（トップ 4 要素 / 下層 1 要素）
4. **`font-feature-settings` は CSS に 1 件も無く、当てても効かない。** 実スタック 100px で `normal` 2300.00px → `"palt"` **2300.00px（±0.00）**、`"halt"` も 2300.00px。配信されている `.woff` 版 Noto Sans JP が `palt` / `halt` テーブルを持っていない（Google Fonts 配信の Noto Sans JP なら −16% 程度効く）
5. **`html { font-size: 16px !important }`。** `!important` 付きの px 固定なので、**ユーザーがブラウザの文字サイズ設定を変えても本文が追従しない**。`body` は `font-size: 16px; font-size: 1rem` の二重宣言（後勝ちの `1rem` が採用されるが、`html` が固定なので結果は 16px）

**CSS Custom Properties は自社トークン 31 個（トップ）/ 46 個（下層）、プラットフォーム由来 0。** 色 26 個 ＋ **書体 3 個**（`--font_1` / `--font_2` / `--font_3`）で、**書体をトークンにしている**のがこのサイトの設計の要（上の 1. と 2. がトークンの形で見える）。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | トークン | 実装値 | 実測 |
|------|---------|--------|------|
| **Green（主 CTA・アイコン）** | `--color_pr_1` | **`#58bf43`** | 面 7 要素（`予約はこちら`、カルーセルの前後ボタン）／文字 3 要素（`おかねのこと、気軽に相談してみませんか？` `トップへ戻る`） |
| **Beige Gold（副 CTA の文字・バッジ）** | `--color_pr_2` | **`#a68a53`** | 面 8 要素（`お知らせ` のカテゴリバッジ）／文字 11 要素（`お手続き・ご相談は 店舗` `すでに口座をお持ちの方`） |
| **Beige Shadow（厚み）** | `--color_pr_3` | **`#d9ceb8`** | **`box-shadow` の色として 23 要素**。面としては 4 要素 |
| **Orange（強調 CTA）** | `--color_accent` | **`#f29718`** | 面 3 要素（`ご意見・ご要望の受付はこちら` `お困りごとはありませんか？`） |

> **下層ページのブランド緑は `#1ea603` で、トップの `#58bf43` とは別の緑。** 下層では見出しの文字色（29 要素）と CTA の面（4 要素）に使われる。**同じサイトに 2 つの緑が同居している**ので、ページごとに取り違えないこと。

### Semantic（意味的な色）

- **Alert** (`--color_alart` = `#fa3e3e`): `北國銀行からの重要なお知らせ` などの警告見出し（文字 17 要素）
- **New バッジ** (`--color_ctg_new` = `#facb3e` / 文字 `--color_ctg_new_t` = `#336629`): `NEW` タグ（面 3 要素）
- **カテゴリ色 10 色**（`--color_ctg_1`〜`--color_ctg_10`）: `#7790d9` / `#f2bc3d` / `#99bf26` / `#3eb395` / `#5cc3cc` / `#f27c55` / `#fa7d9c` / `#ac86bf` / `#a68a53` / `#888888`。実装で確認できたのは `#3eb395`（`マイホーム` `教育` `マイカー` のタグ 4 要素）
- **ニュース種別 5 色**（`--color_news_1`〜`5`）: `#a68a53` / `#f29718` / `#58bf43` / `#17b2e6` / `#888888`（実サイトの宣言は 3 桁の `#888`）。**ブランド色の使い回し＋水色 1 色**

### Neutral（ニュートラル）

- **Text Primary** (`--color_text` = `#333333`): 本文（トップ 84 要素 / 下層 58 要素）。**純黒を使わない**
- **Text Secondary** (`#5f5f5f`): フッターのリンク（18 要素）
- **Text Hover** (`--color_textHover` = `#707070`)
- **Line** (`--color_line` = `#cccccc`)
- **Surface Light** (`#f5f5f5`): 副 CTA の面（2 要素）
- **Surface Mint** (`--color_mn_bc` = `#f6faf5`): メインの地色トークン（可視では使われていない）
- **Surface Blue** (`#f2f7fc`): お知らせブロックの面（1 要素・210,120px²）
- **Background** (`--color_background` = `#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **本文・見出し（Regular）**: **Noto Sans JP Regular**。ただし `font-family` に書く名前は **`noto-sans`**（別名）
  - 実体は `https://www.hokkokubank.co.jp/assets/fonts/NotoSansJP-Regular.woff`。**woff2 ではなく woff**
- **太字**: **Noto Sans JP Bold**。`font-family` に書く名前は **`noto-sans-bold`**
  - 実体は `/assets/fonts/NotoSansJP-Bold.woff`
- **アクセント（丸ゴシック）**: **Zen Maru Gothic Bold**。名前は **`zen-maru-gothic`**
  - 実体は `/assets/fonts/ZenMaruGothic-Bold.woff`。相談・問い合わせの誘導コピーだけに当たる（トップ 4 要素 / 下層 1 要素）
- **`@font-face` は CSS 全文に 20 件**。フォント要求は **4 件**（上記 3 本 ＋ slick のアイコンフォント）で、すべて自社ドメイン

### 3.2 欧文フォント

- **専用の欧文書体は無い。** 欧文も和文と同じ Noto Sans JP で組む
- フォールバックは `sans-serif`（`--font_2` / `--font_3`）または `"ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, sans-serif`（`--font_1`）

### 3.3 font-family 指定

```css
:root {
  /* 実サイトのトークンそのまま */
  --font_1: noto-sans, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, sans-serif;
  --font_2: noto-sans-bold, noto-sans, sans-serif;   /* ← 太字はこれ */
  --font_3: zen-maru-gothic, sans-serif;             /* ← アクセント */
}

body { font-family: var(--font_1); }

/* 太くしたい要素は font-weight ではなくファミリーを差し替える */
.btn, .heading-bold { font-family: var(--font_2); }

/* 相談・問い合わせの誘導コピーだけ丸ゴシック */
.consult-lead { font-family: var(--font_3); }
```

- **`--font_1` にだけフォールバックのローカル書体が並び、`--font_2` / `--font_3` は `sans-serif` だけ。** Web フォントが落ちると**太字と丸ゴシックだけブラウザ既定に落ちる**（実サイトはこうだが、正しくは 3 本とも同じフォールバックを書く）
- `--font_1` の `メイリオ, Meiryo` は Windows 向けの保険。**ヒラギノが先にあるので macOS では到達しない**

### 3.4 文字サイズ・ウェイト階層

**トップページ（可視 168 要素）**

| 用途 | size | family | lh |
|------|------|--------|-----|
| セクション見出し | **26px** | `--font_2` | 39px (1.50) |
| サブ見出し | **22px** | `--font_2` / `--font_3` | 33px (1.50) |
| 本文・CTA | **16px** | `--font_1` / `--font_2` | 24px (1.50) ／ ボタンは 16px (1.00) |
| ナビ・リンク | **14px** | `--font_1` | 21px (1.50) |
| タグ・キャプション | **12px** | `--font_1` / `--font_2` | 12px (1.00) |

**下層ページ（企業情報・可視 105 要素）**

| 用途 | size | lh | letter-spacing |
|------|------|-----|----------------|
| スローガン（白抜き） | **56px** | 1.60 | **16.8px**（= 0.30em） |
| リード | **42px** | 1.60 | 2.52px（= 0.06em） |
| セクション見出し | **32px** | 1.80 | 3.2px（= 0.10em） |
| 中見出し | 28px / 20.8px | — | — |
| 本文 | **18px** | **2.20** | normal |
| 本文（標準） | 16px | 2.00 | normal |

- **ウェイトの実体は 2 段しかない**（Regular / Bold）。`distributions.fontWeight` に 400 / 500 / 700 が出るが、**どれを書いても描画は変わらない**（太さはファミリーが決める）
- **`font-weight: 500` は下層の CTA に 7 要素あるが、見た目は Regular と同じ**

### 3.5 行間・字間

- **`line-height` は無単位の比率**。`body { line-height: 1.5 }` が 24px として 16 幅すべてで一定
- **本文の比率はページで違う**: トップは **1.50 が 112 要素**で支配的、下層は **1.50 (50) / 1.80 (31) / 2.00 (24) / 2.20 (6)** と**読み物側だけゆるめる**
- **ボタンとタグは `line-height: 1.00`**（トップ 29 要素）
- **`letter-spacing` はトップが `normal` 168/168 で 100%。** 下層だけ見出しに個別の px を当てる（`16.8px` / `3.2px` / `2.88px` / `2.52px` / `0.9px` / `-0.08px`）
  - **px 宣言ではなく em 宣言が px に解決されたもの**（56px × 0.30 = 16.8px、32px × 0.10 = 3.2px と、サイズに比例している）。**各要素が自分で `em` を持つ型**なので、`em` のまま書いてよい
  - トップに字間の設計は無い。**トップの再現で `letter-spacing` を足さない**

### 3.6 禁則処理・改行ルール

- `word-break` / `line-break` / `overflow-wrap` の宣言は無し（ブラウザ既定）
- **下層の本文に康熙部首が混入している。** `⾏ U+2F8F`（4 回）/ `⾒ U+2F92` / `⽬ U+2F6C` の計 6 文字が 18px の本文に入っている（`社会が変われば、銀⾏に求められる役割も、` `だから北國銀⾏は、地域の「これから」を⾒すえて` `北國銀⾏はこれからも、あなたと同じ未来を⽬指す`）
  - **同じページの見出しは正しい「銀行」（U+884C）**。つまり**同じ語が同じサイトで 2 通りの文字コードで書かれている**
  - 字形はほぼ同じなので目では気づけない。**検索・コピー・読み上げが壊れる**ので、生成時は必ず通常の漢字（U+4E00–U+9FFF）で書く

### 3.7 OpenType 機能

- **`font-feature-settings` は CSS に 1 件も無い**（実測 0 要素）
- **足しても効かない。** 実スタック・100px で `「あア亜永い組設計展」（株）１２３ＡＢＣ、。・` を測ると
  `normal` **2300.00px** → `"palt"` **2300.00px**（±0.00）／ `"halt"` **2300.00px**（±0.00）
- 原因は**配信している `.woff` 版 Noto Sans JP が `palt` / `halt` テーブルを持っていない**こと。書体名は正しいが、機能が無い（Google Fonts 配信の Noto Sans JP なら同じ文字列で −16% 程度詰まる）
- **`"palt"` を足したくなったら、まず書体の調達元を変える必要がある**

### 3.8 縦書き

- **縦組みは 0 要素**（両ページ）。`writing-mode` の宣言も無し

---

## 4. Component Stylings

### Buttons

**Primary（緑のピル）**

```css
.btn-primary {
  font-family: var(--font_2);            /* noto-sans-bold */
  font-size: 16px; line-height: 24px;
  color: #ffffff;
  background: var(--color_pr_1);         /* #58bf43 */
  border: 0; border-radius: 80px;        /* ピル */
  padding: 12px 24px;
}
```

**Accent（オレンジのピル）** — 面を `var(--color_accent)`（`#f29718`）に替えるだけ。文字は白。

**Secondary（淡いグレー面・ベージュ文字）**

```css
.btn-secondary {
  font-family: var(--font_2);
  color: var(--color_pr_2);              /* #a68a53 */
  background: #f5f5f5;
  border: 0; border-radius: 80px;
}
```

**下層の CTA（厚み付き）**

```css
.btn-raised {
  font-family: var(--font_2);
  font-size: 18px; line-height: 32.4px;  /* 1.80 */
  color: #ffffff;
  background: #1ea603;                   /* 下層のブランド緑 */
  border-radius: 39px;
  box-shadow: rgb(199, 186, 159) 0 4px 0 0;   /* ← ぼかし 0 */
}
```

**Outline（白面・枠線・厚み）**

```css
.btn-outline {
  font-family: var(--font_2);
  font-size: 16px; line-height: 16px;
  color: var(--color_text);              /* #333333 */
  background: #ffffff;
  border: 1px solid #a6926c;
  border-radius: 8px;
  box-shadow: rgb(224, 214, 194) 0 3px 0 0;
}
```

- **ピル（80px）と角丸（8px / 39px）が混在している。** トップは 80px、下層は 39px と 8px

### Badges / Chips

```css
.tag-category { background: #3eb395; color: #ffffff; border-radius: 2px; font-size: 12px; line-height: 1; }
.tag-new      { background: var(--color_ctg_new); color: var(--color_ctg_new_t); border-radius: 2px; }
```

- **バッジだけ `border-radius: 2px`**（23 要素）。CTA の 80px と対照的に角を立てる

### Cards

```css
.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: rgb(217, 206, 184) 0 4px 0 0;   /* --color_pr_3 */
}
```

- **トップの `border-radius: 16px` が 28 要素**で最多。下層は 12px が 13 要素
- **カード上部だけ丸める指定もある**（`16px 16px 0px 0px` が 4 要素）

---

## 5. Layout Principles

### Spacing Scale

- gap はトップが `24px` 系（`normal 24px` 3 / `20px 24px` 1 / `24px 16px` 1 / `15px 40px` 1 / `normal 20px` 1）、下層が **`20px` 8 / `14px` 4 / `30px` 2** と**20px 刻み**
- **`7.2px` という半端な gap が下層に 1 件**（`0.4em` 相当）

### Container

| ページ | 最頻 | その他 |
|--------|------|--------|
| トップ | **1060px**（6 要素） | 1280px / 1400px / 1020px / 1000px / 800px |
| 下層 | **870px**（7 要素） | 1280px / 980px / 1000px |

- **トップ 1060px / 下層 870px** と、読み物側を狭める

### Grid

- トップのカード列は 3〜4 カラム。768px 未満で 1 カラム

---

## 6. Depth & Elevation

**このサイトの影は「ぼかし 0 の厚み」で統一されている。**

| 影 | 用途 | 件数 |
|----|------|------|
| `rgb(217, 206, 184) 0 4px 0 0` | カード・CTA（トップ） | **23**（トップ）/ 5（下層） |
| `rgb(199, 186, 159) 0 4px 0 0` | 下層の CTA | 4 |
| `rgb(224, 214, 194) 0 3px 0 0` | ログインボタン | 1 |
| `rgba(0, 0, 0, 0.08) 0 5px 10px 0` | メガメニュー | 1 |
| `rgba(0, 0, 0, 0.33) 0 0 15px 0` | カルーセルの矢印 | 2 |

- **本体の影 3 種はすべて `blur: 0` / `spread: 0`** で、色はベージュ系（`#d9ceb8` / `#c7ba9f` / `#e0d6c2`）。**黒の半透明に丸めない**
- ぼかしのある影が出るのは**メガメニューとカルーセル矢印だけ**

---

## 7. Do's and Don'ts

### Do（推奨）

- **太字は `font-family: noto-sans-bold, noto-sans, sans-serif` に差し替える。** トークンなら `var(--font_2)`
- **影は `0 4px 0 0` のベージュ**で書く。色は `--color_pr_3`（`#d9ceb8`）
- **CTA は `border-radius: 80px` のピル**、バッジは `2px`、カードは `16px`（下層 12px）
- **本文は 16px / `line-height: 1.5`**。読み物の下層だけ 18px / 2.20 にゆるめる
- **色はトークン名で呼ぶ**（`--color_pr_1` など。26 個すべて実装で使われているわけではないが、名前は設計の意図を持っている）
- **相談・問い合わせの誘導コピーだけ `var(--font_3)`（Zen Maru Gothic）** にする

### Don't（禁止）

- **`font-weight: 700` を書いて太字にしようとしない。** `noto-sans` は weight `normal` 1 本しか無く、**100〜900 のどれを当てても字幅が 1px も変わらない**（実測で 9 段すべて同値）。合成太字も起きないので、見た目は Regular のまま
- **`font-feature-settings: "palt"` を足さない。** 配信されている `.woff` 版 Noto Sans JP にテーブルが無く、**±0.00px で何も起きない**
- **`font-family: "Zen Maru Gothic"` と正式名で書かない。** その名前の `@font-face` は宣言されているが `unloaded` で、**一度も読み込まれない**。`zen-maru-gothic` と書く
- **トップに `letter-spacing` を足さない**（実サイトは `normal` 168/168）。字間を当てるのは下層の見出しだけで、しかも**サイズに比例する `em`**
- **影に `blur` を入れない。** `0 4px 8px rgba(0,0,0,.1)` のような一般的な影にすると別物になる
- **本文に康熙部首（`⾏` `⾒` `⽬` など U+2F00–U+2FDF）を混ぜない。** 実サイトの下層本文に 6 文字混入しているが、これは誤りなので再現しない。必ず通常の漢字で書く
- **`html { font-size: 16px !important }` を真似しない。** ユーザーの文字サイズ設定を無視する。再現するなら `!important` を外し、`body` の二重宣言（`font-size: 16px; font-size: 1rem`）も 1 行にまとめる
- **`--font_2` / `--font_3` のフォールバックを `sans-serif` 1 語のままにしない。** 実サイトはこうだが、正しくは `--font_1` と同じローカル書体を並べる

---

## 8. Responsive Behavior

### Breakpoints

| 条件 | 件数 | 用途 |
|------|------|------|
| `only screen and (max-width: 767px)` | **340**（トップ）/ 302（下層） | モバイル |
| `only screen and (min-width: 768px)` | 34 / 33 | デスクトップ |
| `only screen and (max-width: 1130px)` | 7 | ナビの折り返し |
| `only screen and (max-width: 450px)` | 9 | 小型端末 |
| `only screen and (min-width: 768px), print` | 6 | 印刷 |

### フォントサイズの調整

- **ルートも body も完全固定。** 1920 / 1440 / 1200 / 1024 / 992 / 991 / 834 / 769 / 768 / 767 / 600 / 481 / 480 / 414 / 375 / 320px の **16 幅すべてで `html: 16px` / `body: 16px` / `line-height: 24px`**。`vw` も `clamp()` も `%` の入れ子も無い
- **変わるのは要素単位の px の階段だけ**。768 → 767px で:
  - `h3`: **22px → 18px**（lh 33px → 27px）
  - `a`: **14px → 11px**（lh 21px → 11px）
  - `h2` / `p` は 18px / 16px のまま動かない
- **`rem` を使っても追従しない**（ルートが固定）。レスポンシブは `@media` の px 書き換えで作る

### タッチターゲット

- ピル型 CTA は高さ 48px 前後（16px × lh 24px ＋ padding 12px）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体（和文・Regular）: noto-sans（= 自社配信の Noto Sans JP Regular / .woff）
書体（和文・Bold）  : noto-sans-bold（= 自社配信の Noto Sans JP Bold）← weight ではなく family で切り替える
書体（アクセント）  : zen-maru-gothic（= Zen Maru Gothic Bold）
ブランド緑（トップ）: #58bf43    ブランド緑（下層）: #1ea603
ベージュゴールド    : #a68a53    厚みのベージュ    : #d9ceb8
アクセント橙        : #f29718    アラート赤        : #fa3e3e
本文色              : #333333    背景              : #ffffff
本文                : 16px / line-height 1.5 / letter-spacing normal
読み物の本文（下層）: 18px / line-height 2.20
影                  : box-shadow: #d9ceb8 0 4px 0 0  （ぼかし 0）
角丸                : CTA 80px（ピル）/ カード 16px / バッジ 2px
コンテナ            : トップ 1060px / 下層 870px
ルート              : html 16px 固定（16 幅すべて）。流体なし
palt                : 使わない（当てても ±0.00px で効かない）
縦組み              : 無し
```

### プロンプト例

> 北國銀行のデザインで、住宅ローン相談の CTA ブロックを作ってください。
> 書体は `font-family: noto-sans-bold, noto-sans, sans-serif`（**`font-weight` は上げない**）、
> ボタンは `#58bf43` の面に白文字・`border-radius: 80px`、
> カードは白面・`border-radius: 16px`・`box-shadow: #d9ceb8 0 4px 0 0`（ぼかし 0）。
> 本文は 16px / `line-height: 1.5` / `letter-spacing: normal`、
> 相談への誘導コピーだけ `font-family: zen-maru-gothic, sans-serif` にしてください。
> `font-feature-settings` は書かないでください。
