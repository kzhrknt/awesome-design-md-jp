# DESIGN.md — 博展（HAKUTEN）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-22 / 対象: `https://www.hakuten.co.jp/`, `/our-vision`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **色は `#3b3b3d` と白の 2 つだけ。** 影は 1 つも無く（`box-shadow` 2 ページとも 0 種）、罫線もほとんど無い。全画面の動画ヒーローの上に大きな和文の白コピーを置き、以降はグレーと白の面だけで組む。体験デザイン会社が、事例写真を主役にするために自分の色を消した設計
- **密度**: 低い。1 画面に 1 つの主題。`our-vision` では **88px の欧文見出し**と 36px の和文を交互に積む
- **キーワード**: `--vw<N>px` トークン、`min(1.25vw, 18px)`、Be Vietnam Pro、単色 `#3b3b3d`、影ゼロ

**このサイトの核心は4つある。**

1. **CSS 変数 78 個のうち約 72 個が `--vw<N>px` という「設計 px を名前にして値は vw」のサイズトークン。** `--vw18px: 1.25vw`（= 18 ÷ 1440 × 100）、`--vw48px: 3.333333vw`、`--vw56px: 3.888888vw` — **分母はすべて 1440px**。`_s` サフィックス付きは **分母 375px**（`--vw18px_s: 4.8vw` = 18 ÷ 375 × 100）。**色のトークンは 1 つも無い**
2. **`html` は 19 幅すべて 16px で固定なのに、`body` が `min(var(--vw18px), 18px)` ＝ `min(1.25vw, 18px)` の流体。** 1440px 以上で 18px に張り付き、そこから下は 1.25vw で縮み続ける。**最小は 769px の 9.6125px**。`html` だけ測ると「完全固定のサイト」に見える
3. **769 → 768px で 1.66 倍に跳ぶ。** 768px 以下は設計幅が 375px 側（`--vw*_s`）に切り替わるため、`body` が 9.6125px → **16px**、`h2` が 25.63px → **81.92px（3.2 倍）** になる。**タブレット帯（769〜1024px）だけ本文が 9.6〜12.8px まで縮む**
4. **`font-feature-settings: "palt"` が効くのに 22 要素にしか配っていない。** 当たっているのは Web マガジン「tex」の記事タイトル（`.top-media__title` 18px）と導入文だけ。Noto Sans JP の実スタックで測ると約物が **-23.36%** 詰まるので、**できるのにやっていない**

**`line-height` は `body` に宣言が無い**（実測 `normal`）。可視要素でも `normal` が最多（トップ 35 要素 / 下層 21 要素）＝ **UA 既定のまま組まれている要素が多い**。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Hakuten Charcoal** | **`#3b3b3d`** | **このサイト唯一の色。** 文字色として可視 29 要素（トップ）/ 43 要素（下層）、塗り面として 10 要素 / 5 要素。ヘッダー、フッター、ヒーローの地、`our-vision` の面 |

> **ブランド色が 1 色しか無い。** 彩度を持つ色が 1 つも出てこない。事例写真とヒーローの動画が色を担い、UI は無彩色に徹する。

### Neutral（ニュートラル）

- **Text on Dark** (`#ffffff`): 可視 72 要素（トップ）/ 46 要素（下層）。**このサイトで最も多い文字色**
- **Text Secondary** (`#3c3c3c`): 事例カードのクライアント名・案件名（可視 10 要素）。`#3b3b3d` とは 1 だけ違う
- **Text Muted** (`#959595`): タグ（`#BtoB` `#展示会/学会出展`）（可視 11 要素）
- **Text Label** (`#838383`): `MEDIA` `NEWS` のラベル（可視 5 要素）
- **Surface Light** (`#e9e8e7`): スライダーのページネーション、見出し背景（可視 8 要素）
- **Border** (`#5c5c5c`): `WORKS一覧` `MORE` のピル枠（`1px solid`）
- **Background** (`#ffffff`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)`）

> **`#3b3b3d` / `#3c3c3c` / `#5c5c5c` / `#838383` / `#959595` と、ほぼ同じグレーが 5 段ある。** 用途が違うので全部拾う。

### Gradients

| 用途 | 値 | 実測 |
|---|---|---|
| **写真の上の覆い** | `linear-gradient(rgba(255,255,255,0), rgba(0,0,0,0.8))` | **可視 20 要素**。記事サムネイルの下半分を暗くして白文字を読ませる |
| **ホバーの半割り** | `linear-gradient(to right, rgb(59,59,61) 0%, rgb(59,59,61) 50%, rgb(255,255,255) 50%, rgb(255,255,255) 100%)` | 可視 7 要素。**ハードストップで左半分だけ塗り、スライドさせて面を反転する** |
| **下層の半割り** | `linear-gradient(to right, rgb(59,59,61) 50%, rgba(255,255,255,0) 50%)` | `our-vision` の 1 要素 |

> **停止位置 `50%` を 2 回書くハードストップ**がこのサイトの装飾語彙。グラデーションとして滑らかに見せる意図は無い。

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP**（Google Fonts）。`css2?family=Be+Vietnam+Pro:wght@200;500;700&family=Noto+Sans+JP:wght@100;300;400;500;700&display=swap`
  - **実在するウェイトは 100 / 300 / 400 / 500 / 700 の 5 本**
  - 実スタック・100px の欧文で実測すると `"Noto Sans JP", sans-serif` は
    **100・200 → 751.70px ／ 300 → 769.41px ／ 400 → 794.84px ／ 500 → 813.64px ／ 600〜900 → 837.98px** の 5 面
  - **`font-weight: 900` を指定しても 700 で描画される**（合成太字も起きない）。`our-vision` の `挑戦を続ける。` `真摯であろう。` `強みを磨く。`（36px / weight 900 / 5 要素）は**実際には 700**

### 3.2 欧文フォント

- **Be Vietnam Pro**（Google Fonts）。`wght@200;500;700` の **3 本だけ**
  - 実測（`"Be Vietnam Pro", "Noto Sans JP", sans-serif` / 100px / `Handgloves 2026`）：
    **100・200・300 → 830.00px ／ 400・500 → 872.81px ／ 600〜900 → 889.50px**
  - **3 段しか存在しない。** `distributions.fontWeight` には 200 / 300 / 400 / 500 / 700 / 900 の 6 値が出るが、**描画は 200 / 500 / 700 の 3 段に丸められる**
- `SERVICE` `WORKS` `STORY` `PURPOSE` `VISION` `VALUE` などのナビ・大見出しはすべて欧文

### 3.3 font-family 指定

```css
/* 実サイトの宣言 */
body {
  color: rgb(59, 59, 61);
  font-family: "Noto Sans JP", sans-serif;
  font-size: min(var(--vw18px), 18px);   /* = min(1.25vw, 18px) */
  cursor: default;
  overflow-y: auto;
}

/* 欧文を先に置くスタック（ナビ・見出し・CTA） */
font-family: "Be Vietnam Pro", "Noto Sans JP", sans-serif;
```

> **和欧の 2 本立てが素直に書けている。** 欧文要素では Be Vietnam Pro を先頭に置き、受け皿に Noto Sans JP を入れてあるので、**欧文スタックに和文が混じっても generic に落ちない**。
> `body` 側は Noto Sans JP 単体なので、**本文中の欧文は Noto Sans JP の欧文グリフで出る**（Be Vietnam Pro にはならない）。

### 3.4 文字サイズ・ウェイト階層

`html` = **16px**（19 幅すべて固定）。`body` = **`min(1.25vw, 18px)`**（1440px で 18px、769px で 9.6125px、768px 以下で 16px）。

**サイズはすべて `--vw<N>px` トークン経由**。下表の px は **1440px のときの値**。

| 役割 | Size (@1440) | Weight | Line Height | Letter Spacing | 実測 |
|------|------|--------|-------------|----------------|------|
| **大見出し（欧）** | **88px** | 700 | — | **-2.2px（-0.025em）** | `PURPOSE` `VISION` `VALUE`（`our-vision` 3 要素） |
| セクション見出し（欧） | **48px** | 700 | 67.2px（1.40） | normal | `CONTACT` ほか |
| **信条（和）** | **36px** | **900 → 実際は 700** | — | **-0.72px（-0.02em）** | `挑戦を続ける。` `真摯であろう。` `強みを磨く。` |
| ナビ（開いた状態） | **32px** | 700 | **0.80** | normal | `TOP` `SERVICE` `WORKS`（9 要素）。**行間が 1 を切る** |
| 本文・記事タイトル | **18px** | 400 / 700 | **normal**（宣言なし） | **0.9px（0.05em）** | 可視 34 要素（トップ最多） |
| CTA | **16px** | **200** | normal | normal | `RECRUIT` `CONTACT` `WORKS一覧` |
| 事例キャプション | **14px** | 500 | 1.50 | **0.7px（0.05em）** | `#BtoB` などのタグ |
| クライアント名 | **12px** | 400 | 1.50 | **0.6px（0.05em）** | 事例カードの社名 |
| ナビ（閉じた状態） | **13px** | 700 | **1.00** | normal | ヘッダーの `SERVICE` `WORKS` |
| フッター | **9.99999px**（`--vw10px`） | **300** | 1.30 | **0.999999px** | `サイトマップ` `サイトポリシー`。**`--vw*` 由来の端数** |

> **weight は 200 / 300 / 400 / 500 / 700 / 900 の 6 値が書かれているが、実際に出るのは 3〜5 段**（→ 3.1 / 3.2）。
> **CTA の weight 200 が特徴。** `RECRUIT` `CONTACT` `WORKS一覧` が極細で組まれている。

### 3.5 行間・字間

- **`letter-spacing` は `normal` が既定。** 可視 86 要素（トップ）/ 67 要素（下層）が `normal`
  - 字間を当てているのは **0.05em 相当が 3 種**（18px → 0.9px / 14px → 0.7px / 12px → 0.6px）＝ **`em` 宣言が各サイズで px に解決されている**
  - **大見出しだけ負の字間**：88px → `-2.2px`（-0.025em）、36px → `-0.72px`（-0.02em）
  - **小さい文字は空け、大きい文字は詰める**という設計
  - `0.999999px` `1.716px` `2.88px` のような端数は **`--vw*` トークン由来**（`--vw*` は vw なので 1440px での解決値に端数が出る）
- **`line-height` は宣言していない要素が多い。** `normal` が可視 35 要素（トップ）/ 21 要素（下層）で最多
  - 宣言しているのは `1.50`（30 要素 = 事例カード）、`1.00`（24 要素 = ナビ）、`1.43`（11 要素 = タグ）、**`0.80`（9 要素 = 開いたナビの 32px）**、`1.30`（8 要素 = フッター）、`1.87`（7 要素 = ニュース）、`1.78`（`our-vision` の本文 15 要素）
  - **`0.80` は行が重なる値。** 32px のナビを詰めて積むための意図的な指定

### 3.6 禁則処理・改行ルール

- `word-break: normal`（`body` 実測）。`auto-phrase` も `break-all` も使っていない
- 改行は `<br class="sp">` で手動制御

### 3.7 OpenType 機能

- **`font-feature-settings: "palt"` は 22 要素だけ**（クロス集計 `"palt" @ horizontal-tb` 22 件）。当たっているのは
  - `.top-media__title`（18px / Web マガジン「tex」の記事タイトル・21 要素）
  - `.top-media__lead`（18px / `これからの"体験"を考えるWebマガジン`・1 要素）
  - **サイト本体の見出し・本文には 1 つも配っていない**
- **効かないわけではない。** 実スタック（`"Noto Sans JP", sans-serif`）・48px で実測：

  | テスト文字列 | normal | "palt" | 差 |
  |---|---|---|---|
  | `「あ」、「い」。（う）・（え）` | 576.00px | **441.47px** | **-23.36%** |
  | `ABC123あいう、。` | 408.97px | **375.52px** | **-8.18%** |
  | `CONTACT`（欧文） | 244.81px | 244.81px | ±0.00% |

- **つまり「できるのに使っていない」。** 新規実装で `body` に配ると既存の 1 ブロックと字送りが揃うが、**他のブロックは全部詰まる**ので別物になる。**既存に合わせるなら 22 要素と同じ範囲に限る**

### 3.8 縦書き

- **縦組みは使っていない**（`verticalSamples` が 2 ページとも空）

---

## 4. Component Stylings

### Buttons

| 種類 | 実装 |
|------|------|
| **Pill Outline（主 CTA）** | 背景 透明 / 文字 `#3b3b3d` / **`border-radius: 19px`** / `1px solid #5c5c5c` / 16px / **weight 200** / line-height 16px（1.00） |
| **Nav Item（面）** | 背景 `#3b3b3d` または `#e9e8e7` / 18px / weight 400 / **`border-radius: 0`** / line-height `normal` |
| **Pagination（丸）** | **`border-radius: 100%`** / 13.3333px / 背景 `#e9e8e7`（非選択）・`#3b3b3d`（選択中） |
| **Icon（丸）** | `border-radius: 50%`（`our-vision` 5 要素） |

> **角丸は `19px`（ピル）/ `50%` / `100%` の 3 つだけで、面のボタンは角丸ゼロ。** `4px` `8px` のような中間の角丸は語彙に無い。

### Cards

- 事例カードは **枠も影も無い**。写真の上に `linear-gradient(rgba(255,255,255,0), rgba(0,0,0,0.8))` を重ねて白文字を載せる
- **写真の覆いは要素自身の `background-image` に重ねる**（別要素の絶対配置にしない）

---

## 5. Layout Principles

### Container

- **`1200px`**（2 ページとも 2 要素）。`our-vision` には `90%` も 3 要素

### Spacing Scale

- **余白も `--vw<N>px` トークンから取る。** `--vw4px` 〜 `--vw56px` が 2px 刻み〜で約 36 段（`2,4,5,6,8,10,11,12,13,14,15,16,17,18,19,20,21,22,24,25,26,28,30,32,34,36,38,40,42,44,45,46,48,50,56`）、同じ番号の `_s` 版がモバイル用
- `gap` は 1 つも使っていない（実測 `gaps: []`）

### Easing

`:root` に 4 つ宣言されている。**アニメーションの語彙もトークン化されている唯一の非サイズ変数**。

```css
--easeOutExpo:    cubic-bezier(0.16, 1, 0.3, 1);
--easeOutQuint:   cubic-bezier(0.22, 1, 0.36, 1);
--easeOutCirc:    cubic-bezier(0, 0.55, 0.45, 1);
--easeInOutCirc:  cubic-bezier(0.85, 0, 0.15, 1);
```

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **全要素。`box-shadow` は 2 ページとも 0 種** |

> **影を一切使わないサイト。** 階層は `#3b3b3d` の面、`#e9e8e7` の淡い面、写真の上のグラデーションの覆いで作る。

---

## 7. Do's and Don'ts

### Do（推奨）

- **サイズと余白は `--vw<N>px` トークンで配る。** 値は `N ÷ 1440 × 100` の `vw`、モバイルは `N ÷ 375 × 100` の `vw`（`_s`）
  ```css
  :root { --vw18px: 1.25vw; --vw48px: 3.333333vw; --vw18px_s: 4.8vw; }
  body { font-size: min(var(--vw18px), 18px); }
  ```
- **`html` は 16px 固定にして、流体は `body` 側で作る**
- **色は `#3b3b3d` と白の 2 つに収める**。グレーの段は `#3c3c3c` / `#5c5c5c` / `#838383` / `#959595` / `#e9e8e7`
- **欧文スタックは `"Be Vietnam Pro", "Noto Sans JP", sans-serif`**（受け皿に和文書体を入れる）
- **weight は Be Vietnam Pro が 200 / 500 / 700、Noto Sans JP が 100 / 300 / 400 / 500 / 700**。この範囲で組む
- **CTA は weight 200 の極細**（16px / `border-radius: 19px` / `1px solid #5c5c5c`）
- **小さい文字には 0.05em の字間、大きい見出しには -0.02〜-0.025em の負の字間**
- 写真の上の文字は `linear-gradient(rgba(255,255,255,0), rgba(0,0,0,0.8))` を**要素自身の `background-image` に重ねる**
- ホバーの面反転はハードストップ（`50%` を 2 回書く `linear-gradient(to right, …)`）
- **`box-shadow` を使わない**
- イージングは `--easeOutExpo` / `--easeOutQuint` / `--easeOutCirc` / `--easeInOutCirc` の 4 つから選ぶ

### Don't（禁止）

- **`font-weight: 900` を当てない。** Noto Sans JP は 700 までしか読み込んでおらず、**900 は 700 で描画される**（合成太字も起きない）。実サイトの `挑戦を続ける。` がそうなっている
- **Be Vietnam Pro に 300 や 400 を当てない。** 実在は 200 / 500 / 700 の 3 本で、300 → 200、400 → 500 に丸められる
- **`font-feature-settings: "palt"` を `body` に配らない。** 実サイトは 22 要素（Web マガジンの記事タイトル）だけ。全体に配ると既存と別物になる
- **`line-height` を全部宣言し直さない。** 実サイトは `normal` のまま組んでいる要素が最多。ただし**本文ブロックには必ず宣言する**（`1.50` / `1.78`）
- **ナビの `line-height: 0.80` を本文に使わない**（32px のナビ専用。行が重なる）
- **`box-shadow` を足さない**（実サイトは 0 種）
- **角丸に `4px` や `8px` を使わない。** 語彙は `19px`（ピル）/ `50%` / `100%` / `0` だけ
- **彩度のある色を足さない**（実サイトの色は `#3b3b3d` と白だけ）
- **`--vw*` トークンを px に読み替えない。** 読み替えると 1440px 以外の幅で全部ずれる

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | **主ブレークポイント**（`only screen and (max-width: 768px)` がトップ 29 件 / `our-vision` 178 件） |
| Desktop | ≥ 769px | `screen and (min-width: 769px)` 3 件 |
| Small | ≤ 600px / ≤ 480px | 各 2 件 |

### ルートと body の実測（19 幅）

| 幅 | `html` | `body` | `p` | `h2` |
|---|---|---|---|---|
| 1920px | 16px | **18px** | 18px | 48px |
| **1440px** | 16px | **18px**（上限） | 18px | 48px |
| 1200px | 16px | 15px | 15px | 40px |
| 1024px | 16px | 12.8px | 12.8px | 34.13px |
| 900px | 16px | 11.25px | 11.25px | 30px |
| 834px | 16px | 10.425px | 10.425px | 27.8px |
| **769px** | 16px | **9.6125px（最小）** | 9.6125px | 25.63px |
| **768px** | 16px | **16px（1.66 倍に跳ぶ）** | **30.72px** | **81.92px（3.2 倍）** |
| 375px | 16px | 16px | 15px | 40px |

> **崖は 769 / 768px の 1 箇所。** 768px を境に設計幅が 1440px 側から 375px 側（`--vw*_s`）に切り替わるため、
> **モバイルの方が本文が大きい**（375px で 15px、769px で 9.61px）。
> **タブレット帯（769〜1024px）だけ本文が 9.6〜12.8px まで縮む**のがこの設計の弱点。
> 規定の 4 幅（1440 / 1200 / 834 / 375）だけ測ると、769px の最小も 768px の崖も見えない。

### フォントサイズの調整

- `html` は 1920px から 374px まで **16px から 1px も動かない**。可変はすべて `body` と `--vw*` 側
- **`body` の上限クランプは 18px**（`min(var(--vw18px), 18px)`）。1440px 以上では縮まない

### タッチターゲット

- CTA（16px / `border-radius: 19px` / padding あり）は 44px を満たす
- **フッターのリンク（10px / weight 300）とページネーション（13.33px / 丸）は小さいので、モバイルでは 44px を確保すること**
- 768px 以下では `--vw*_s` に切り替わるため、デスクトップで小さい要素もモバイルでは相対的に大きくなる

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Hakuten Charcoal: #3b3b3d（唯一のブランド色）
Text Secondary:   #3c3c3c
Border:           #5c5c5c
Text Label:       #838383
Text Muted:       #959595
Surface Light:    #e9e8e7
Background:       #ffffff
Font (JP): "Noto Sans JP", sans-serif          ← weight 100/300/400/500/700
Font (EN): "Be Vietnam Pro", "Noto Sans JP", sans-serif  ← weight 200/500/700
Root:   html 16px 全幅固定 / body min(var(--vw18px), 18px) = min(1.25vw, 18px)
Token:  --vw<N>px = N ÷ 1440 × 100 vw ／ --vw<N>px_s = N ÷ 375 × 100 vw
Body:   18px @1440 / line-height normal / letter-spacing 0.9px (0.05em)
H2:     48px @1440 / weight 700 / line-height 1.40 / letter-spacing normal
大見出し: 88px / weight 700 / letter-spacing -2.2px (-0.025em)
CTA:    16px / weight 200 / border-radius 19px / 1px solid #5c5c5c
Border Radius: 19px / 50% / 100% / 0
Box Shadow: none（全要素）
palt:   22 要素だけ（Web マガジンの記事タイトル）。body には配らない
Easing: --easeOutExpo / --easeOutQuint / --easeOutCirc / --easeInOutCirc
Container: 1200px
Breakpoint: 768px（1 箇所・769→768 で 1.66 倍に跳ぶ）
```

### プロンプト例

```
博展のデザインシステムに従って、事例一覧ページを作成してください。
- :root に --vw<N>px トークンを置く（値は N ÷ 1440 × 100 の vw。例 --vw18px: 1.25vw）
  モバイル用は --vw<N>px_s（N ÷ 375 × 100 の vw。例 --vw18px_s: 4.8vw）
- html は 16px 固定、body は min(var(--vw18px), 18px)
- 768px 以下で --vw*_s 側に切り替える
- font-family は本文が "Noto Sans JP", sans-serif、
  欧文見出しが "Be Vietnam Pro", "Noto Sans JP", sans-serif
- weight は Be Vietnam Pro が 200/500/700、Noto Sans JP が 100/300/400/500/700 のみ
  （900 を指定しても 700 で出るので使わない）
- 大見出しは 88px / weight 700 / letter-spacing -2.2px
- 本文・記事タイトルは 18px / letter-spacing 0.9px、line-height は宣言しない（normal）
  ただし本文ブロックだけ line-height 1.50 を当てる
- CTA は透明 + 1px solid #5c5c5c / border-radius 19px / 16px / weight 200
- 色は #3b3b3d と #ffffff の 2 つだけ。面は #e9e8e7
- 事例カードは枠も影も無し。写真の上に
  linear-gradient(rgba(255,255,255,0), rgba(0,0,0,0.8)) を
  要素自身の background-image に重ねて白文字を載せる
- ホバーの面反転は linear-gradient(to right, #3b3b3d 0%, #3b3b3d 50%, #ffffff 50%, #ffffff 100%)
- font-feature-settings は書かない（実サイトは記事タイトル 22 要素だけ）
- box-shadow は一切使わない。コンテナは 1200px
```
