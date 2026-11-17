# DESIGN.md — 日本特殊陶業（Niterra）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-17 / 対象: `https://www.niterragroup.com/`, `/at_a_glance/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **9 段のカラーランプを 3 系統きっちり持つ、教科書どおりのデザイントークン設計。** ティール `#005d63` を軸に、モザイク状のタイルで写真と見出しを組む
- **密度**: 高い。トップのヒーローは写真タイルと見出しを隙間 2px で敷き詰めた格子。数値は 60px で大きく打つ
- **キーワード**: Niterra ティール、9 段ランプ、Outfit、モザイクタイル、角丸 4px

**このサイトの核心は4つある。**

1. **書体を役割で 3 本に分け、CSS 変数に名前を付けている。** `--font-jp`（Noto Sans JP）／ `--font-en`（Outfit）／ **`--font-en-unit`（Figtree → Outfit）**。実測は和文 127〜145 要素 ／ Outfit 21〜28 要素 ／ Figtree スタック 1〜5 要素
2. **その `--font-en-unit` が、和文の単位にも当たっている。** 数値カードの「7,312**億円**」「1936**年**」の単位は `<small>` で `--font-en-unit` が付くが、**Figtree も Outfit も CJK を持たない**。CDP の `CSS.getPlatformFontsForNode` で実測すると「年」「億円」は **`Hiragino Kaku Gothic ProN`**（= `system-ui` へのフォールバック）、「%」だけ **`Figtree`**、同じブロックの「拠点」は **`Noto Sans JP`**。**1 つの数値ブロックの中で 3 つの書体が混ざり、OS が変われば和文の単位の字面も変わる**
3. **既定ウェイトが 500。** `fontWeight` の最多は 2 ページとも **500（128 / 109 要素）**で、400 は欧文ラベルと長文だけ。Noto Sans JP を 300/400/500/600/700 の 5 本読んでいる
4. **`letter-spacing` の既定は `normal`**（140 / 134 要素）。字間を足すのは 60px の数値（3px ＝ 0.05em）と 32px の見出し（1.92px ＝ 0.06em）など**数えるほど**

**`font-feature-settings` は 2 ページとも 0 要素。** ただし効かないのではなく、**効くのに使っていない**（実スタック・32px / weight 700 で実測 `normal` 971.48px → `"palt"` 887.77px ＝ **−8.6%**）。

---

## 2. Color Palette & Roles

**9 段 × 3 系統のランプがそのまま CSS 変数になっている。** 下の表は宣言値で、可視要素に出るものには「実測」を添えた。

### Primary（ブランドカラー）

| トークン | 実装値 | 実測 |
|---|---|---|
| `--niterra-primary-100` | `#f6fafa` | |
| `--niterra-primary-200` | `#cde9eb` | |
| `--niterra-primary-300` | `#a4d7da` | |
| `--niterra-primary-400` | `#6ab9bf` | |
| `--niterra-primary-500` | `#3fa5ac` | |
| `--niterra-primary-600` | `#2a8c96` | |
| `--niterra-primary-700` | `#007b84` | 面 2 要素 |
| **`--niterra-primary-800`** | **`#005d63`** | **見出しの文字 28 / 43 要素・面 9 / 11 要素。実質のブランド色** |
| `--niterra-primary-900` | `#003f45` | |

`--color-primary: #005d63` という短縮エイリアスも別に宣言されている。

### Semantic（意味的な色）

| トークン | 実装値 | 実測 |
|---|---|---|
| `--niterra-secondary-400` | `#ffc95d` | **NEW バッジの面 6 要素 ／ 英字ラベルの文字 6 要素** |
| `--niterra-secondary-800` | `#9b5d06` | 下層の英字見出し 9 要素 |
| `--niterra-text-link` | `#19869e` | リンク |
| `--niterra-text-link-hover` | `#1877ab` | |
| `--niterra-base-bg` | `#f4f7f7` | ページ外周 |
| （トークン外） | `#006228` | 下層の製品カテゴリタグ 6 要素 |
| （トークン外） | `#ff0000` | 下層の製品カテゴリタグ 4 要素 |

> **`#138995` は Cookie 同意バナー（Complianz 系の `cf2Lf6` クラス）の色で、トークンにも実装にも無い。** `interactive` の上位に「同意する／調整する／拒否する」が並ぶが、**サイトの CTA ではない**

### Neutral（ニュートラル）

| トークン | 実装値 | 実測 |
|---|---|---|
| `--niterra-neutral-100` | `#ffffff` | ページ背景・反転文字 73 / 76 要素 |
| `--niterra-neutral-200` | `#f2f4f4` | 下層のヒーローの地 |
| `--niterra-neutral-300` | `#e5e8e8` | 数値カードの地 6 / 7 要素 |
| `--niterra-neutral-400` | `#c2c6c6` | |
| `--niterra-neutral-500` | `#9da3a3` | |
| `--niterra-neutral-600` | `#6a6e6e` | 注記・補助 6 要素 |
| **`--niterra-neutral-700`** | **`#4a5252`** | **UI テキスト 32 / 20 要素** |
| **`--niterra-neutral-800`** | **`#273535`** | **本文 10 / 9 要素。`--color-fg` も同値** |
| `--niterra-neutral-900` | `#0d2020` | |

短縮エイリアス: `--color-bg: #ffffff` / `--color-fg: #273535` / `--color-muted: #666666` / `--color-border: #e2e2e2` / `--radius: 8px` / `--space: 16px`

> **`--color-muted: #666666` と `--color-border: #e2e2e2` はランプのどの段とも一致しない別値。** ランプが正でエイリアスが古い、という二重化が残っている

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP（Google Fonts）を 300 / 400 / 500 / 600 / 700 の 5 ウェイト。** `document.fonts` は各ウェイト 124 件ずつ（loaded 38 / unloaded 86）
- フォント要求は 40 件、すべて `fonts.gstatic.com`。自社ホストの書体は無い
- フォールバックは **`system-ui, -apple-system, "Hiragino Kaku Gothic ProN", sans-serif`**

### 3.2 欧文フォント

- **Outfit**（100/300/400/500/600/700 を要求、実際に `loaded` するのは 400/500/600）: 英字の見出し・ラベル（`At a Glance` / `Management Plan` / `Investor's Guide`）に 21〜28 要素
- **Figtree**（500/600 を要求、`loaded` は 600）: **数値の単位専用**。実測で Figtree のグリフが出るのは `%` だけ
- 読み込みは 1 本の URL: `css2?family=Figtree:wght@500;600&family=Noto+Sans+JP:wght@300;400;500;600;700&family=Outfit:wght@100;300;400;500;600;700&display=swap`

### 3.3 font-family 指定

```css
:root {
  --font:         "Noto Sans JP", system-ui, -apple-system, "Hiragino Kaku Gothic ProN", sans-serif;
  --font-jp:      "Noto Sans JP", system-ui, -apple-system, "Hiragino Kaku Gothic ProN", sans-serif;
  --font-en:      "Outfit", system-ui, -apple-system, sans-serif;
  --font-en-unit: "Figtree", "Outfit", system-ui, -apple-system, sans-serif;
  --font-en-jp:   "Outfit", "Noto Sans JP", system-ui, -apple-system, sans-serif;
}

/* 実サイトでの当て方 */
body                  { font-family: var(--font-jp); font-weight: 500; }
.c-stats__value small { font-family: var(--font-en-unit); }  /* ← ここが問題 */
.c-header__lang-item  { font-family: var(--font-en-unit); }
```

> **`--font-en-unit` は名前のとおり「欧文の単位」用だが、実サイトでは和文の単位（年・億円）にも当たっている。**
> 実測（CDP の `CSS.getPlatformFontsForNode`）:
> | テキスト | 指定スタック | 実際に描画された書体 |
> |---|---|---|
> | `年` | `--font-en-unit` | **Hiragino Kaku Gothic ProN**（= `system-ui`） |
> | `億円` | `--font-en-unit` | **Hiragino Kaku Gothic ProN** |
> | `%` | `--font-en-unit` | **Figtree** |
> | `拠点` | `--font-jp` | **Noto Sans JP** |
>
> **再現するときは、和文の単位には `--font-jp` を当てる。** `--font-en-unit` は `%` や `+` のような記号だけに限る。
> `--font-en-jp`（Outfit → Noto Sans JP）は欧和混植用で、下層の `SOEC固体酸化物形水電解セル` など 2 要素に使われている

### 3.4 文字サイズ・ウェイト階層

**ルートは 820px を境に 2 段で切り替わる**（`@media (min-width: 820px)` が 261 / 327 件と、このサイトの主要なブレークポイント）。

| 幅 | `html` | `body` |
|---|---|---|
| 1920 〜 820px | **16px** | 16px |
| 819 〜 320px | **14px** | 14px |

| 役割 | size（≥1312px） | weight | letter-spacing | line-height | 実測 |
|------|------|--------|----------------|-------------|------|
| ヒーロー大見出し（`.p-top__catch-main`） | **64px**（流体・下記 8 章） | 700 | normal | 1.30 | 2 要素 |
| ヒーローのサブ | 32px | 400 | 1.32px（0.04em） | 1.30 | 2 要素 |
| 数値（60px） | 60px | 600 | 3px（0.05em） | normal | 8〜9 要素 |
| 数値の単位 | 32px | 600 | normal | normal | 5 要素（`--font-en-unit`） |
| セクション見出し | 32px | 700 | 1.92px（0.06em） | 1.05 〜 1.30 | |
| カード見出し | 24px | 500 | 0.48px（0.02em） | 1.30 | 8 要素 |
| リード文 | 18px | 400 | 0.54px（0.03em） | 1.80 | 10 / 25 要素 |
| 本文・ラベル | 16px | 400 / 500 | normal | 1.50 | 18 / 8 要素 |
| 英字ラベル（Outfit） | 16px | 500 | normal | **1.00** | 18 要素 |
| ナビ | 14px | 500 | 0.7px（0.05em） | 1.50 | 8 / 13 要素 |
| ユーティリティ | 13px | 500 | normal | 1.50 | 13 / 11 要素 |
| 日付・バッジ | 12px | 500 | normal | 1.20 | **66 / 55 要素で最多** |
| 最小ラベル | 10px | 500 | normal | 1.50 | 10 要素 |

**ウェイトは 300 / 400 / 500 / 600 / 700 の 5 段。既定は 500。**
300 は社是の 4 語（独立自営・素志貫徹・至誠信実）と Cookie バナー、700 はヒーローと「車のエンジン回りに」など 2〜7 要素しかない。

### 3.5 行間・字間

- **`line-height` は無単位の比率。** 既定は **1.50（85 / 81 要素）**。長文は 1.80、カード見出しは 1.30、日付・バッジは 1.20
- **英字ラベル（Outfit）だけ `line-height: 1.00`**（18 / 24 要素）。行間ゼロで英字を詰めて置く設計なので、**和文に同じ値を当てない**
- **`letter-spacing` は既定 `normal`。** 足すのは次の 8 種だけで、どれも要素が `em` を自分で持つ型

| 宣言 | 実測 px | 当たる要素 |
|---|---|---|
| `normal` | — | 140 / 134 要素（既定） |
| `0.05em` | 60px → 3px | 大きい数値 |
| `0.06em` | 32px → 1.92px | セクション見出し |
| `0.05em` | 14px → 0.7px | ナビ |
| `0.04em` | 33px → 1.32px / 24px → 0.96px | ヒーローのサブ・縦組みの和文 |
| `0.03em` | 18px → 0.54px | リード文 |
| `0.02em` | 24px → 0.48px | カード見出し |
| `0.07em` | 12px → 0.84px | 英字の小ラベル |

### 3.6 禁則処理・改行ルール

- CSS には `word-break: break-word` / `word-break: normal` / `word-break: normal !important` の 3 宣言があり、**`body` の実効値は `normal`**
- ヒーローの見出しは `｢地球を輝かせる企業｣となる` のように**鉤括弧を半角風の `｢ ｣`（U+FF62 / U+FF63）で打ってある**。全角の `「 」` ではない
- 見出しの折り返しは `<span>` で区切って手で制御している（`“特殊な”技術と発想で` / `社会的課題を解決し、` / `｢地球を輝かせる` / `企業｣となる`）

### 3.7 OpenType 機能

- **`font-feature-settings` は 2 ページとも 0 要素。** `palt` も `halt` も `pwid` も使っていない
- **効かないのではなく、使っていない。** 実スタック（`"Noto Sans JP", system-ui, -apple-system, "Hiragino Kaku Gothic ProN", sans-serif`）・32px・weight 700 で実測:

| 設定 | 幅 | 差 |
|---|---|---|
| `normal` | 971.48px | — |
| `"palt"` | 887.77px | **−8.6%** |
| `"halt"` | 907.48px | −6.6% |
| `"pwid"` | 1003.48px | +3.3% |
| `sans-serif`（比較） | 987.14px | — |

> **`palt` を足すと見出しの折り返し位置が変わり、`<span>` で手組みした改行が崩れる。** 再現するときも足さない

### 3.8 縦書き

- **トップは 0 要素。下層（`/at_a_glance/`）に `vertical-rl` が 12 要素**ある。本物の縦組みで、章の見出しに使われている

| クラス | 書体 | size | line-height | letter-spacing | 内容 |
|---|---|---|---|---|---|
| `p-glance__v-en` | `--font-en`（Outfit） | 20px | 20px（1.00） | normal | `About Niterra` / `Our Strengths` / `By the Numbers` |
| `p-glance__v-ja` | `--font-jp`（Noto Sans JP） | 32px | 33.6px（1.05） | **0.96px（0.03em）** | `どんな会社？` など |

- **欧文も縦組みにしている**（`Outfit` の `About Niterra` が `vertical-rl`）。欧文を縦に流すと 1 文字ずつ立つので、短い語だけに使う
- **章見出しは欧文が左・和文が右。** 1440px での実測は `p-glance__v-en` が `left: 160px`、`p-glance__v-ja` が `left: 192px`。親は**素の `flex`（row）**で、DOM 順は欧文 → 和文
- **社是の 4 語だけ `flex-direction: row-reverse`。** 実測の `left` は `独立自営` 1164 → `素志貫徹` 1065 → `至誠信実` 966 → `四海兄弟` 868 と**右から左へ**並ぶ。縦組みを横に並べるときは、素の `flex` だと DOM 順に左→右へ置かれて**日本語の縦組みとして読む向きと逆**になる。各語は `title`（40px / weight 300）と `text`（14px / weight 400）をさらに `row-reverse` で入れ子にしている
- **縦組みに `palt` は当たっていない**（そもそも 0 要素）。縦組みで詰めたい場合に `palt` を足すのは誤り（軸が違うので無視される）。使うなら `vpal`

---

## 4. Component Stylings

### Buttons

| 種類 | 面 | 文字 | radius | padding | size / weight |
|---|---|---|---|---|---|
| タイル（モザイクのカード） | `#005d63` | `#ffffff` | `0` | — | 16px（Outfit） / 500 ＋ 24px（和文） / 500 |
| テキストリンク（→付き） | 透明 | `#005d63` | — | — | 18px / 500 |
| 汎用ボタン | — | — | **`--radius: 8px`** | **`--space: 16px`** | — |

- **このサイトは「ボタン」をほとんど使わない。** 導線は写真タイルと矢印付きテキストリンクで作る

### Badges / Chips

| 種類 | 面 | 文字 | radius | padding | size / weight |
|---|---|---|---|---|---|
| NEW | `#ffc95d` | `#005d63` | **4px** | `4px 8px` | 12px / 500（Outfit） |
| カテゴリ（トピックス／その他） | 透明 ＋ `1px solid` | — | **9999px**（ピル） | — | 12px / 500 |
| 製品タグ（下層） | `#006228` / `#ff0000` / `#6a6e6e` | `#ffffff` | 4px | — | 12px / 500 |

- **バッジに 2 つの角丸を使い分ける**: 状態（NEW）は 4px の角丸、分類（トピックス）は `9999px` のピル

### Inputs

| 項目 | 値 |
|---|---|
| 面 | `#ffffff` |
| border | `1px solid` `--color-border: #e2e2e2` |
| radius | `--radius: 8px` |
| 文字 | 14px / 500 / `#4a5252` |

### Cards

| 項目 | 数値カード | 製品カード（下層） |
|---|---|---|
| 面 | `#e5e8e8`（neutral-300） | `#ffffff` |
| radius | `0` | `8px` |
| border | なし | なし |
| box-shadow | なし | `rgba(0,0,0,0.1) 0 2px 8px`（1 要素のみ） |
| 見出し | 60px / 600 / ls 3px | 18px / 400 / line-height 1.80 |

---

## 5. Layout Principles

### Spacing Scale

`--space: 16px` が基準。実測の `gap`:

| 値 | 件数（トップ / 下層） | 用途 |
|---|---|---|
| `2px` | 4 / — | **モザイクタイルの隙間** |
| `12px` | 1 / — | |
| `16px` | 5 / 9 | カード内 |
| `20px` | 6 / 6 | リスト |
| `24px` | 4 / 4 | |
| `32px` | 5 / 7 | カードグリッド |
| `40px` | 5 / 5 | セクション内 |
| `48px` | — / 2 | |
| `96px` | 1 / 1 | セクション間 |

- **ヒーローのタイル格子だけ `gap: 2px`**。ほかは 16px の倍数

### Container

| 値 | 用途 |
|---|---|
| **1312px** | トップのコンテンツ幅（ヒーロー見出しの流体の上限もこの幅で止まる） |
| **1168px** | 下層のコンテンツ幅 |
| 1440px | 全幅のセクション |
| 930px / 580px / 450px | 本文の読み幅 |

### Grid

- ヒーロー: **モザイクのタイル格子**（写真とテキストのタイルを `gap: 2px` で敷き詰める）
- ニュース: 1 カラムのリスト（日付 12px ＋ バッジ ＋ 見出し）
- 数値（At a Glance）: 3 カラム、カードの地は `#e5e8e8`
- 下層の製品: 3〜4 カラム（`gap: 16px` / `32px`）

---

## 6. Depth & Elevation

**このサイトはほぼ影を使わない。** 実測の `box-shadow` は 2 ページ合わせて 2 種類だけで、片方は Cookie バナー由来。

| 影 | 件数 | 用途 |
|---|---|---|
| `rgba(0, 0, 0, 0.1) 0px 2px 8px 0px` | 1（下層） | 社是のカード |
| `rgba(0, 0, 0, 0.1) 0px 0px 24px 0px` | 1 | **Cookie バナー（サイト本体ではない）** |

- 奥行きは影ではなく**面色の段差（neutral-200 / 300 と白）とタイルの 2px の隙間**で作る
- `border-radius` は **4px（バッジ）／ 8px（`--radius`）／ 9999px（ピル）／ 50%（アイコン）** の 4 種。**モザイクタイルは角丸ゼロ**
- 区切りの罫線に `linear-gradient(to right, #e5eaea 0, #e5eaea 1px, transparent 1px, transparent 50%, …)` の**ハードストップ**を使っている箇所がある（破線を `border` ではなくグラデーションで引く）

---

## 7. Do's and Don'ts

### Do（推奨）

- **書体を `--font-jp` / `--font-en` / `--font-en-unit` の 3 本に分けて変数で持つ**
- **フォールバックは `system-ui, -apple-system, "Hiragino Kaku Gothic ProN", sans-serif`** を和文に、`system-ui, -apple-system, sans-serif` を欧文に
- **既定ウェイトは 500。** `body { font-weight: 500 }` から始める
- **9 段のランプを 3 系統（primary / secondary / neutral）で持ち、実装では 700〜800 段と 200〜300 段を使う**
- **ブランド色は `#005d63`（primary-800）、アクセントは `#ffc95d`（secondary-400）、本文は `#273535`（neutral-800）、UI は `#4a5252`（neutral-700）**
- **`letter-spacing` は `normal` を既定にして、必要な要素にだけ `em` で足す**（数値 0.05em / 見出し 0.06em / ナビ 0.05em）
- **英字ラベル（Outfit）は `line-height: 1.00`**
- **ルートは 820px を境に 16px → 14px の 2 段切替**
- **モザイクタイルの隙間は 2px**、それ以外の `gap` は 16px の倍数
- 影は使わず、面色の段差で奥行きを作る

### Don't（禁止）

- **和文の単位（年・億円・個・社）に `--font-en-unit` を当てない。** 実サイトはこれをやっているが、Figtree も Outfit も CJK を持たないので **OS ローカルの書体（macOS なら Hiragino、Windows なら Yu Gothic UI）に落ちて、同じ数値ブロックの中で字面が割れる**。和文の単位には `--font-jp` を使う
- **`font-feature-settings: "palt"` を足さない。** 実サイトは 0 要素で、足すと字送りが **−8.6%** 変わり、`<span>` で手組みした見出しの改行が崩れる
- **縦組みに `palt` を足さない**（軸が違うので黙って無視される。使うなら `vpal`）
- **`--color-muted: #666666` / `--color-border: #e2e2e2` をランプの値だと思わない**（どの段とも一致しない旧エイリアス）
- **`#138995` をブランド色として使わない**（Cookie 同意バナーの色）
- **`border-radius` を一律にしない。** 状態バッジ 4px ／ 分類バッジ 9999px ／ カード 8px ／ **モザイクタイルは 0**
- **影を足さない**（実サイトはサイト本体で 1 要素だけ）
- **鉤括弧を `「 」` に直さない。** 実サイトの見出しは `｢ ｣`（U+FF62 / U+FF63）
- ウェイト 100 / 200 / 800 / 900 を要求しない（`@font-face` が無い）

---

## 8. Responsive Behavior

### Breakpoints

**`(min-width: 820px)` が主軸**（261 / 327 件）。Bootstrap の既定（576 / 768 / 992 / 1200 / 1400px）も混ざっているが、ほとんど使われていない。

| クエリ | 件数（トップ / 下層） |
|---|---|
| **`(min-width: 820px)`** | **261 / 327** |
| `(min-width: 768px)` | 12 / 12 |
| `(min-width: 820px) and (max-width: 999.98px)` | — |
| `(min-width: 820px) and (max-width: 1359.98px)` | — |
| `(prefers-reduced-motion: reduce)` | 8 |
| `(max-width: 767.98px)` / `(max-width: 490px)` / `(max-width: 390px)` / `(max-width: 340px)` | 少数 |

### タッチターゲット

- ナビは 14px / `line-height: 1.5` ＋ `padding` で 44px 以上
- モザイクタイルはタイル全体がリンク（最小でも 256×80px）
- バッジは `padding: 4px 8px` で**タップ対象ではない**（表示専用）

### フォントサイズの調整

**ヒーロー見出し（`.p-top__catch-main`）は 3 段構成で、820 / 819px に大きな崖がある。**

| 幅 | 実測 | 式 |
|---|---|---|
| 1920 / 1440 / **1312px** | **64px** | 上限クランプ |
| 1200px | 58.2194px | `(100vw − 72px) × 16 ÷ 310` |
| 1024px | 49.1355px | 同上 |
| 900px | 42.7355px | 同上 |
| **820px** | **38.6065px** | 同上（デスクトップ側の最小） |
| **819px** | **56.784px** | **`6.93333vw`（= 26 ÷ 375）** |
| 768px | 53.248px | 同上 |
| 375px | **26px** | 同上（モバイル設計幅 375px でちょうど） |

> **820 → 819px で 38.61px → 56.78px、1px またいで 1.47 倍に跳ぶ**（モバイルのほうが大きい）。規定の 4 幅（1440 / 1200 / 834 / 375px）だけを測ると崖が見えない。
> デスクトップ側の上限 64px にちょうど届くのは **1312px ＝ コンテナ幅**。

ほかの流体:

- `font-size: clamp(24px, 24px + (100vw - 820px) * 8 / 220, 32px)` — 820〜1040px で 24 → 32px の手書き線形補間
- `font-size: clamp(12px, (100vw - 880px) * 0.00556 + 12px, 14px)` — 880〜1240px で 12 → 14px
- `<p>` は 960px 以上で 24px 固定、960 〜 820px で `2.5vw`、819px 以下で 20.496px 固定

> **`--pc-px` / `--sp-px` という流体単位の変数が CSS にあるが、宣言は `html:lang(en)` の中だけ。** 日本語ページでは未定義で、`calc(38 * var(--pc-px))` は無効になる。**英語版専用の仕組みなので、日本語の再現では使わない**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Teal:   #005d63   （--niterra-primary-800 / --color-primary）
Accent:       #ffc95d   （--niterra-secondary-400・NEW バッジ）
Link:         #19869e   （--niterra-text-link）
Text:         #273535   （--niterra-neutral-800 / --color-fg）
UI Text:      #4a5252   （--niterra-neutral-700）
Muted:        #6a6e6e   （--niterra-neutral-600）
Card BG:      #e5e8e8   （--niterra-neutral-300）
Surface:      #f2f4f4   （--niterra-neutral-200）
Page BG:      #ffffff ／ 外周 #f4f7f7（--niterra-base-bg）
Border:       #e2e2e2   （--color-border）
Font (JP):    "Noto Sans JP", system-ui, -apple-system, "Hiragino Kaku Gothic ProN", sans-serif
Font (EN):    "Outfit", system-ui, -apple-system, sans-serif
Font (unit):  "Figtree", "Outfit", system-ui, -apple-system, sans-serif  ← 記号だけに使う
Google Fonts: css2?family=Figtree:wght@500;600&family=Noto+Sans+JP:wght@300;400;500;600;700&family=Outfit:wght@100;300;400;500;600;700&display=swap
Root:         16px（≥820px） / 14px（≤819px）
Base Weight:  500
Weights:      300 / 400 / 500 / 600 / 700
Line Height:  1.50（既定） / 1.80（長文） / 1.30（見出し） / 1.20（日付） / 1.00（Outfit の英字ラベル）
Letter Spacing: normal（既定） / 0.05em（数値・ナビ） / 0.06em（32px 見出し） / 0.03em（リード） / 0.02em（カード見出し）
Border Radius: 4px（状態バッジ） / 8px（--radius） / 9999px（分類ピル） / 0（モザイクタイル）
Spacing:      --space: 16px、タイルの gap だけ 2px
Container:    1312px（トップ） / 1168px（下層）
Shadow:       使わない
palt:         使わない（0 要素）
```

### プロンプト例

```
日本特殊陶業（Niterra）のデザインシステムに従って、企業紹介ページを作成してください。
- :root に --font-jp / --font-en / --font-en-unit と、primary / secondary / neutral の 9 段ランプを定義する
- body は font-family: var(--font-jp) / font-weight: 500 / line-height: 1.50 / letter-spacing: normal
- ルートは @media (min-width: 820px) で 16px、それ未満は 14px
- ヒーロー見出しは weight 700 / line-height 1.30 で、
  1312px 以上 64px 固定、820〜1312px は calc((100vw - 72px) * 16 / 310)、819px 以下は 6.93333vw
- 見出しの折り返しは <span> で手で区切る。鉤括弧は ｢ ｣（U+FF62 / U+FF63）を使う
- セクション見出しは 32px / weight 700 / letter-spacing 1.92px
- 英字ラベルは Outfit 16px / weight 500 / line-height 1.00 / 色 #ffc95d
- 数値は 60px / weight 600 / letter-spacing 3px、単位（年・億円）は var(--font-jp) の 32px / weight 600
  ※ 和文の単位に var(--font-en-unit) を当てないこと（CJK を持たず OS 書体に落ちる）
- 本文は 16px / 400 / line-height 1.50 / 色 #273535、リード文は 18px / line-height 1.80 / letter-spacing 0.54px
- 日付・バッジは 12px / weight 500 / line-height 1.20
- NEW バッジは背景 #ffc95d / 文字 #005d63 / border-radius 4px / padding 4px 8px / Outfit 12px weight 500
- 分類バッジは border-radius 9999px の枠線ピル
- ヒーローは写真とテキストのタイルを gap: 2px で敷き詰めるモザイク格子。タイルの角丸は 0
- 数値カードの地は #e5e8e8、角丸なし
- box-shadow は使わない。奥行きは面色の段差で作る
- font-feature-settings は書かない（palt を足すと字送りが 8.6% 変わる）
- コンテナは 1312px、gap は 16 / 20 / 24 / 32 / 40px
```
