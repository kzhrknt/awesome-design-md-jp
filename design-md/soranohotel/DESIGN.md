# DESIGN.md — SORANO HOTEL（ソラノホテル）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-17 / 対象: `https://soranohotel.com/`, `https://soranohotel.com/plan/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **明朝体・角丸ゼロ・影ゼロ**。字間を大きく開けて余白で読ませる、ウェルビーイングホテルの静かな組版
- **密度**: 低い。コンテナ 1860px の全幅レイアウトに、セクション間 100〜220px の余白を取る
- **キーワード**: 明朝（Noto Serif JP）、**字間 0.1em を全面に**、ヒーローは **0.3em**、ウェイト **350**、紺 `#274875`、生成りの地 `#f9f8f6`

**このサイトの核心は5つある。**

1. **本文が明朝体。** 可視テキスト 292 要素のうち **194 要素が `Noto Serif JP` 系**、ゴシック（`Inter` + `Noto Sans JP`）はわずか 18 要素。**ゴシックはナビ・ラベル・日付など「読ませない文字」専用**
2. **`font-feature-settings: "palt"` が可視 1046 要素中 1045 要素に効いている。** 実質グローバル適用。Nstock のような「見出しだけ」ではなく、**このサイトは全面で約物を詰める**
3. **字間の基準は `0.1em`。** `--letter-spacing-body: 0.1em` が body に効き、**`1.4px` として可視 736 要素に継承される**。ヒーロー見出しだけが **`0.3em`（32px → 9.6px）** まで開く
4. **`font-weight: 350` が既定。** `--font-weight-normal: 350` という**非整数ウェイト**を可変フォントで指定している（可視 199 要素）。強調は 500 のみで、**700 は 1 要素も無い**
5. **角丸ゼロ・影ゼロ。** `border-radius: 0` が 1008 要素、`box-shadow: none` が 1043 要素。**丸いのは円形要素（100%）35 個だけ**

> **`html { font-size: 10px }`。** `1rem = 10px` の日本語サイト定番の設定で、トークンは `--font-size-body-md: 1.4rem`（= 14px）のように書かれている。**rem を 16px 基準で読み替えないこと。**

---

## 2. Color Palette & Roles

### Design Tokens（実在する CSS 変数・自社トークン 85 個）

```css
/* Color */
--color-dark:              #1a1a1a;
--color-black:             #000;
--color-blue:              #5988c6;
--color-blue-hover:        #476d9e;
--color-dark-blue:         #274875;
--color-dark-blue-hover:   #1f3a5e;
--color-white-hover:       #eeebe7;
--color-sorano-bllue:      #88ade2;   /* 変数名の綴りは実サイトのまま（bllue） */
--color-gold:              #a89469;
--color-gold-hover:        #867654;
--color-brown:             #332727;
--color-gray:              #eeebe7;
--color-beige:             #d1c3bc;
--color-red:               #c71212;
--color-orange:            #c74012;
--color-font-dark:         #1a1a1a;
--color-bg-primary:        #f9f8f6;
--color-bg-gray:           #eeebe7;
--color-bg-light-gray:     #f4f2ef;
--color-bg-dark-blue:      #30517b;
--color-bg-dark:           #171513;
--color-border-gray:       rgba(0,0,0,0.12);
--color-border-dark-gray:  rgba(0,0,0,0.25);
--color-border-light-gray: rgba(0,0,0,0.06);
--color-border-white-gray: rgba(255,255,255,0.3);
--color-link:              #1a1a1a;
--color-link-hover:        #1a1a1a;
```

> **宣言 ≠ 実装。** DOM を 1 周して数えると、トップページで実際に描画されるのは **`#1a1a1a`（832 要素）/ `#ffffff`（206）/ `#5988c6`（4）** の3色と、面色の **`#274875`（9）/ `#5988c6`（21）/ `#f9f8f6`（2）** だけ。
> **`--color-gold` `--color-beige` `--color-brown` `--color-red` `--color-orange` `--color-sorano-bllue` は宣言されているが 1 要素も描画されない。** 変数一覧を見て金や茶を配色に持ち込まないこと。

### 実装されている色

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Ink（本文・見出し）** | **`#1a1a1a`** | **可視 832 要素**。純黒 `#000` ではない |
| **White** | `#ffffff` | 可視 206 要素。写真の上の文字、紺面の上の文字 |
| **Navy（CTA）** | **`#274875`** | **面色 9 要素**。宿泊予約・空室検索・お問い合せ — **すべての塗りボタン** |
| **Blue（カテゴリ）** | **`#5988c6`** | **面色 21 要素**。ニュースのカテゴリバッジ（インフォメーション／お知らせ）。文字色としても 4 要素 |
| **Page background** | **`#f9f8f6`** | `body` に指定（根拠: body）。**純白ではない生成り** |
| Border | `rgba(0,0,0,0.12)` | フッターのボタン枠 |

> **紺 `#274875` は「押せるもの」、水色 `#5988c6` は「分類」。** 役割が完全に分かれている。混ぜないこと。

---

## 3. Typography Rules

### 3.1 和文フォント

**明朝（既定）と ゴシック（補助）の二層。**

| 層 | トークン | 実体 | 実測 |
|----|----------|------|------|
| **明朝（既定）** | `--font-family-serif` | **`notoSerifJp` / `Noto Serif JP`** | **194 要素**。本文・和文見出し・ニュース見出し |
| ゴシック（補助） | `--font-family-sans` | `Inter` + `Noto Sans JP` | 18 要素。`SORANO NEWS` などの欧文小見出し、ラベル |

- **`notoSerifJp` は自前でホストする `@font-face` 名**（`Noto Serif JP` とは別名）。**400 と 500 の2ウェイトだけが `loaded`**
- 游明朝・ヒラギノ明朝はフォールバックとして積むが、Web フォントが効くので通常は使われない

### 3.2 欧文フォント

**用途別に3つ。**

| トークン | 実体 | 用途 | ロード状況 |
|----------|------|------|-----------|
| `--font-family-eng` | **`Cardo`**（セリフ） | 欧文の飾り見出し（`SORANO NEWS` `STANDARD` `Reservation` `MEMBERSHIP`） | **400 のみ `loaded`。700 は `unloaded`** |
| `--font-family-sans` | `Inter` | 和欧混植のゴシック、数字 | `loaded` |
| `--font-family-eng-connoisseur` | `Cormorant` | 会員制施設ページ専用 | トップでは未使用 |

> **`Cardo` に `font-weight: 700` を指定しないこと。** ロードされないため合成ボールドになる。実サイトは 400 / 500 で使っている。

### 3.3 font-family 指定

```css
/* 明朝 — 既定。本文・和文見出し */
--font-family-serif: "notoSerifJp", "Noto Serif JP", "游明朝", "Yu Mincho", yumincho,
                     "Hiragino Mincho Pro", serif;

/* ゴシック — ナビ・ラベル・日付 */
--font-family-sans: "Inter", "Noto Sans JP", hiragino-kaku-gothic-pron, "Hiragino Sans",
                    "Hiragino Kaku Gothic ProN", "Yu Gothic", yugothic, meiryo, sans-serif;

/* 欧文セリフ — 飾り見出し */
--font-family-eng: "Cardo", "notoSerifJp", "Noto Serif JP", "游明朝", "Yu Mincho", yumincho,
                   "Hiragino Mincho Pro", serif;

/* 欧文ゴシック — 日付など */
--font-family-eng-sub: "Inter", sans-serif;
```

- **`body` に指定されているのはゴシック（`--font-family-sans`）**。明朝は本文要素側で上書きしている。**「明朝が既定」なのは実際の描画分布であって、継承の既定ではない**
- **generic family の対応は正しい**（明朝 → `serif`、ゴシック → `sans-serif`）。このリポジトリで頻出する「サンセリフに `serif` を書く誤り」は起きていない

### 3.4 文字サイズ・ウェイト階層

`html { font-size: 10px }` / `body { font-size: 1.4rem = 14px }`。

**サイズトークン（rem → px）**

```css
--font-size-body-xl:   1.6rem;  /* 16px */
--font-size-body-lg:   1.5rem;  /* 15px */
--font-size-body-md:   1.4rem;  /* 14px ← body 既定 */
--font-size-body-sm:   1.3rem;  /* 13px */
--font-size-body-xs:   1.2rem;  /* 12px */
--font-size-body-2xs:  1.1rem;  /* 11px */
--font-size-body-3xs:  1rem;    /* 10px */

--font-size-heading-2xl: 4.4rem; /* 44px */
--font-size-heading-xl:  4rem;   /* 40px */
--font-size-heading-lg:  3.2rem; /* 32px */
--font-size-heading-md:  2.4rem; /* 24px */
--font-size-heading-sm:  2rem;   /* 20px */
--font-size-heading-xs:  1.8rem; /* 18px */
--font-size-heading-2xs: 1.6rem; /* 16px */
--font-size-heading-3xs: 1.4rem; /* 14px */
--font-size-heading-4xs: 1.2rem; /* 12px */

--font-weight-normal: 350;   /* ← 400 ではない */
--font-weight-medium: 500;
```

**実測の階層**

| 役割 | size | weight | line-height | letter-spacing | 書体 |
|------|------|--------|-------------|----------------|------|
| **ヒーロー見出し** | **32px** | **350** | 48px（1.5） | **9.6px（0.3em）** | 明朝 |
| 欧文飾り見出し | 44px | 500 | 52.8px（1.2） | 2.64px（**0.06em**） | Cardo |
| 大見出し（和文） | 40px | 350 | 68px（**1.7**） | 4px（0.1em） | 明朝 |
| 欧文見出し | 32px | 500 | 38.4px（1.2） | 1.92px（0.06em） | Cardo |
| 中見出し | 24px | 350 / 500 | 28.8〜40.8px | 2.4px（0.1em） | 明朝 |
| 小見出し | 20px | 350 | 32px（1.6） | 2px（0.1em） | 明朝 |
| 小見出し（記事） | 16px | 500 | 28.8px（1.8） | 1.6px（0.1em） | 明朝 |
| **本文** | **14px** | **350** | **28px（2.0）** | **1.4px（0.1em）** | 明朝 |
| 本文（長文） | 14px | 350 | 30.8px（**2.2**） | 1.4px | 明朝 |
| 補足 | 13px | 350 | 23.4〜26px（1.8〜2.0） | 1.3px（0.1em） | 明朝 |
| ラベル・キャプション | 12px | 350 | 21.6px（1.8） | 1.2px（0.1em） | 明朝 |
| カテゴリバッジ | 11px | 350 | — | 1.1px（0.1em） | ゴシック |

**ウェイトの分布（可視テキスト 292 要素）**: **350 が 199**、500 が 90、400 が 3。**700 は 0。**

> **`font-weight: 350` を 400 に丸めないこと。** 可変フォント（`notoSerifJp` / `Inter` / `Noto Sans JP`）に対する指定で、400 より一段細い。このサイトの「薄さ」はここから来ている。

### 3.5 行間・字間

**字間トークン（すべて em で宣言 → px で継承）**

```css
--letter-spacing-body:       0.1em;   /* ← 既定。body に効く */
--letter-spacing-heading:    0.1em;
--letter-spacing-heading-en: 0.06em;  /* 欧文見出し（Cardo） */
--letter-spacing-copy:       0.1em;
--letter-spacing-xxl: 0.2em;
--letter-spacing-xl:  0.15em;
--letter-spacing-l:   0.12em;
--letter-spacing-m:   0.1em;
--letter-spacing-s:   0.05em;
--letter-spacing-xs:  0.02em;
--letter-spacing-no:  0;
```

**実測の分布（可視 1046 要素）**

| 値 | 出現 | 換算 | 用途 |
|----|------|------|------|
| **1.4px** | **736** | 14px × 0.1em | **body から継承** |
| 1.2px | 74 | 12px × 0.1em | キャプション |
| 2.64px | 60 | 44px × 0.06em | 欧文飾り見出し |
| 1.3px | 38 | 13px × 0.1em | 補足 |
| 1.6px | 37 | 16px × 0.1em | 小見出し |
| 4px | 22 | 40px × 0.1em | 大見出し |
| **9.6px** | **18** | **32px × 0.3em** | **ヒーロー見出しのみ** |
| 1.92px | 14 | 32px × 0.06em | 欧文見出し |

> **和文は一律 0.1em、欧文は 0.06em、ヒーローだけ 0.3em。** この3段だけ覚えればよい。
> **ヒーローの 0.3em は「東 京 に あ っ て 、」のように一文字ずつ離して見せるための値**で、本文に適用すると読めなくなる。**見出し1つにだけ使う。**

**行間トークン**

```css
--line-height-body:        2;     /* 本文 */
--line-height-body-sm:     1.8;   /* 補足 */
--line-height-heading:     1.6;   /* 和文見出し */
--line-height-copy:        1.7;   /* リード文 */
--line-height-heading-eng: 1.2;   /* 欧文見出し */
```

実測の最多は **1.2（79 要素）→ 2.2（64）→ 1.5（38）→ 1.8（36）→ 1.0（30）**。
**長文ほど開き、欧文見出しほど詰める。** 本文 14px に対する 28px（2.0）と、長文の 30.8px（2.2）が和文の骨格。

### 3.6 禁則処理・改行ルール

- 実サイトは HTML 側で改行位置を手で決めている（`都心からわずか30分、\n大きな空と豊かな…`）。**自動折り返しに任せず、意味の切れ目で改行を入れる設計**
- `word-break` / `line-break` の明示指定は無し

### 3.7 OpenType 機能

**`palt` を全面に当てる。**

実測: 可視 1046 要素のうち **1045 要素**が `font-feature-settings: "palt"`。下層ページ（`/plan/`）でも 538 要素。

```css
body { font-feature-settings: "palt"; }
```

> **字間 0.1em と palt を同時に使うのがこのサイトの組版。** palt で約物を詰めて、`letter-spacing` で全体を開く。**どちらか一方だけにしないこと**（palt を外すと約物まわりが間延びし、字間を外すと詰まって見える）。

### 3.8 縦書き

**サイト本体は縦組みを使わない。**

実測で `writing-mode: vertical-rl` の要素は 4 個あるが、**すべて外部の AI チャットウィジェット（`talkappi-*`）由来**でサイトの設計ではない。**縦組みを実装に持ち込まないこと。**

---

## 4. Component Stylings

### Buttons

**角丸は 0。塗りは紺 `#274875` の1種類だけ。**

```css
/* Primary — 宿泊予約 / 空室検索 / 各種予約 */
.button-primary {
  background: #274875;      /* --color-dark-blue */
  color: #ffffff;
  border: none;
  border-radius: 0;         /* ← 角丸ゼロ */
  padding: 30px 20px;       /* 大 */
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1em;
  box-shadow: none;
}
.button-primary:hover { background: #1f3a5e; }  /* --color-dark-blue-hover */

/* Primary (small) — お問い合せ */
.button-primary-sm {
  background: #274875;
  color: #ffffff;
  border-radius: 0;
  padding: 13px 20px;
  font-size: 13px;
  font-weight: 350;
}

/* Outline — フッターの導線 */
.button-outline {
  background: transparent;
  color: #1a1a1a;
  border: 1px solid rgba(0,0,0,.12);   /* --color-border-gray */
  border-radius: 0;
  padding: 20px 20px 20px 30px;
  font-size: 14px;
  font-weight: 350;
}

/* Floating — 画面右下に固定される予約ボタン */
.button-floating {
  background: #274875;
  color: #ffffff;
  border-radius: 0;
  /* 和文 14px / 0.05em ＋ 欧文 10px / 0.1em(Cardo) の2段組 */
}
```

### Badges

```css
/* ニュースのカテゴリ */
.badge-category {
  background: #5988c6;      /* --color-blue */
  color: #ffffff;
  border-radius: 0;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 350;
  letter-spacing: 0.1em;
  font-family: var(--font-family-sans);  /* ← ここだけゴシック */
}
```

### Links

```css
/* 下線がホバーで伸びるテキストリンク */
.link-anim {
  color: #1a1a1a;
  text-decoration: none;
  /* 下線は疑似要素で描く。border-radius も box-shadow も持たない */
}
```

### 角丸スケール（実測）

| 値 | 出現 | 用途 |
|----|------|------|
| **0px** | **1008** | **既定。ボタンもカードもバッジもすべて** |
| 100% | 35 | 円形の装飾・アイコン |
| 50% | 2 | 円形ボタン |
| 5px | 1 | 外部チャットウィジェット（サイトの設計ではない） |

---

## 5. Layout Principles

### Container

| 値 | 用途 |
|----|------|
| **1860px** | **最大幅（最頻・14 箇所）**。ほぼ全幅レイアウト |
| 50% / 33.3% / 25% | カラム分割 |
| 472px | 文章ブロック |

```css
--site-padding: 6.25vw;   /* 左右の余白はビューポート比 */
--header-height: 8rem;    /* 80px */
```

### Spacing Scale

**rem（= 10px 基準）の 2 系統。**

```css
/* セクション間 */
--space-section-lg: 22rem;   /* 220px */
--space-section-md: 15rem;   /* 150px */
--space-section-sm: 10rem;   /* 100px */

/* 要素間 */
--space-element-3xl: 12rem;  /* 120px */
--space-element-2xl: 9.6rem; /*  96px */
--space-element-xl:  8rem;   /*  80px */
--space-element-lg:  6.4rem; /*  64px */
--space-element-md:  4.8rem; /*  48px */
--space-element-sm:  3.6rem; /*  36px */
--space-element-xs:  2.4rem; /*  24px */
--space-element-2xs: 1.6rem; /*  16px */
--space-element-3xs: 1.2rem; /*  12px */
--space-element-4xs: 0.8rem; /*   8px */
```

> **セクション間は 100〜220px。** この余白の大きさがサイトの静けさをつくっている。**詰めないこと。**

---

## 6. Depth & Elevation

**影を使わない。**

実測: `box-shadow: none` が可視 1046 要素中 **1043 要素**。残り3つは
(a) 値が `rgba(0,0,0,0)` で透明、(b)(c) 外部チャットウィジェット由来。

> **カード・ボタン・ヘッダーに影を足さないこと。** 階層は `rgba(0,0,0,.12)` の細い罫線、`#f9f8f6` / `#eeebe7` / `#f4f2ef` の面、そして余白で表す。

---

## 7. Do's and Don'ts

### Do（推奨）

- **本文を明朝（`Noto Serif JP`）で組む。** ゴシックはナビ・ラベル・日付などの短い文字に限る
- **`letter-spacing: 0.1em` を body に書いて全体に継承させる**（実測 `1.4px`）
- **`font-feature-settings: "palt"` を body に書いて全面に当てる**
- **ヒーロー見出しだけ `letter-spacing: 0.3em`** にして一文字ずつ離す
- **`font-weight: 350` を既定にする**（可変フォント前提）。強調は 500
- 欧文の飾り見出しは **`Cardo` / 0.06em / line-height 1.2**
- 本文の行間は **2.0**、長文は **2.2**
- **角丸 0・影 0** を貫く
- ページ背景は純白ではなく **`#f9f8f6`**
- `html { font-size: 10px }` を敷き、サイズを rem で書く

### Don't（禁止）

- **`border-radius` を付けない。** 実サイトは 1008 要素が 0px。丸いのは円形装飾だけ
- **`box-shadow` を使わない**
- **`font-weight: 700` を使わない。** 実サイトは 0 要素。`Cardo` の 700 と `notoSerifJp` の 700 はロードされていない
- **`font-weight: 350` を 400 に丸めない**
- **ヒーローの 0.3em を本文に広げない**（読めなくなる）
- **`letter-spacing` を em のまま子要素に再宣言しない。** body から px（1.4px）で継承される
- **縦組みを使わない。** 実測の縦組み 4 要素は外部チャットウィジェット由来でサイトの設計ではない
- **`--color-gold` `--color-beige` `--color-brown` `--color-red` `--color-orange` `--color-sorano-bllue` を配色に使わない。** 変数は存在するが実サイトでは 1 要素も描画されていない
- **紺 `#274875` と水色 `#5988c6` の役割を混ぜない**（紺＝押せるもの、水色＝分類）
- **純黒 `#000000` / 純白の背景を使わない**（`#1a1a1a` / `#f9f8f6`）
- **`palt` と字間のどちらか一方だけにしない**（両方でひとつの組版）

---

## 8. Responsive Behavior

### Breakpoints

**max-width 方式（デスクトップファースト）。** 実測の出現回数順:

| 値 | 出現 | 位置づけ |
|----|------|----------|
| **`(max-width: 767px)`** | 499 | **スマホ** |
| **`(max-width: 1024px)`** | 493 | **タブレット** |
| `only screen and (width <= 767px)` | 128 | 新記法（同じ境界） |
| `only screen and (width >= 768px) and (width <= 1279px)` | 42 | タブレット帯 |
| `(hover: hover) and (pointer: fine)` | 21 | ホバー可能なデバイスのみ |
| `not (prefers-reduced-motion)` | 6 | アニメーション |
| `print` | 5 | 印刷 |

> **ホバー効果は `(hover: hover) and (pointer: fine)` で囲む。** タッチデバイスでホバーが貼り付くのを避けている。
> **`not (prefers-reduced-motion)` でアニメーションを囲む。** 実サイトが 6 箇所で実施している。

### タッチターゲット

主要 CTA は `padding: 30px 20px` ＋ 16px の文字で実高さ 80px 超。**十分に大きい。**

### フォントサイズの調整

`html { font-size: 10px }` のまま、ブレークポイントごとに `--font-size-*` を差し替える方式。**rem 基準そのものは変えていない。**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ブランドカラー: #274875（紺・CTA）/ #5988c6（水色・カテゴリ）
本文色: #1a1a1a
背景: #f9f8f6（生成り）/ 面 #eeebe7, #f4f2ef
罫線: rgba(0,0,0,0.12)

和文（既定）: Noto Serif JP（明朝）— notoSerifJp 400/500
和文（補助）: Inter + Noto Sans JP（ゴシック）— ナビ・ラベル・日付のみ
欧文（飾り）: Cardo（400 のみ）

root: html { font-size: 10px } → 1rem = 10px
本文: 14px / line-height 2.0 / letter-spacing 0.1em / font-weight 350
長文: line-height 2.2
ヒーロー: 32px / weight 350 / line-height 1.5 / letter-spacing 0.3em
欧文見出し: Cardo / 44px / weight 500 / line-height 1.2 / letter-spacing 0.06em
palt: 全面（body に指定）

角丸: 0（すべて）
影: なし
コンテナ: 1860px / 左右余白 6.25vw / ヘッダー 80px
セクション余白: 100 / 150 / 220px
```

### プロンプト例

```
SORANO HOTEL のデザインシステムでホテルのトップページを作って。

- html { font-size: 10px } を敷き、サイズは rem で書く
- 本文は明朝: "notoSerifJp", "Noto Serif JP", "游明朝", "Yu Mincho", yumincho,
  "Hiragino Mincho Pro", serif
- ナビ・ラベル・日付だけゴシック: "Inter", "Noto Sans JP", hiragino-kaku-gothic-pron,
  "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", yugothic, meiryo, sans-serif
- 欧文の飾り見出しは "Cardo", serif（400 のみ。700 は使わない）
- body に font-feature-settings: "palt" と letter-spacing: 0.1em を書いて全面に継承させる
- font-weight の既定は 350、強調は 500。700 は使わない
- 本文 14px / line-height 2.0、長文は 2.2
- ヒーロー見出しだけ 32px / letter-spacing 0.3em で一文字ずつ離す
- 欧文見出しは letter-spacing 0.06em / line-height 1.2
- CTA は背景 #274875・文字 #ffffff・border-radius 0・padding 30px 20px・weight 500
- カテゴリバッジは背景 #5988c6・11px・ゴシック
- border-radius と box-shadow は一切使わない
- ページ背景は #f9f8f6、本文色は #1a1a1a（純黒・純白を使わない）
- セクション間の余白は 100〜220px を取る
- ホバー効果は @media (hover: hover) and (pointer: fine) で囲む
```
