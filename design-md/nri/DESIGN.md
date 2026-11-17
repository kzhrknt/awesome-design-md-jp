# DESIGN.md — 野村総合研究所（NRI）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-17 / 対象: `https://www.nri.com/jp`, `/jp/service/index.html`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **Noto Sans JP の可変フォント1本で、欧文も和文も全部組む。** 色はネイビー `#00196e` の一色主義。角丸 12px のカードを白地に淡い影で浮かせる、現代的なコンサルティングファームの構え
- **密度**: 中庸。ヒーローは 64px の大見出しと 830px の全画面背景でゆったり、下層はカードを 12px の角丸で敷き詰めて情報量を上げる
- **キーワード**: NRI ネイビー、可変フォント1本、角丸12px、淡い影、カード

**このサイトの核心は4つある。**

1. **書体は Noto Sans JP ただ1本。それも可変フォント。** 読み込んでいるのは `fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400..700&display=swap` の**1本だけ**で、`document.fonts` も `Noto Sans JP / 400 700` の 124 サブセット（loaded 32 / unloaded 92）しか持たない。**`distributions.fontFamily` は 2 ページとも `"Noto Sans JP", sans-serif` 1 種類で 100%**（トップ 108/108 要素・下層 104/104 要素）。ヒーローの `Dream up the future.未来創発` も**欧文と和文が同じ 1 要素・同じ書体**で組まれている（64px / weight 400 / letter-spacing 0.4px）
2. **ウェイトは 400/500/600/700 の 4 段を全部使う。** 可変フォントの軸が `400..700` なので中間の 500・600 が本物のウェイトとして出る（実測 400 = 53 要素 / 500 = 26 / 700 = 17 / 600 = 12）。**300 以下と 800 以上は軸の外なので要求しても出ない**
3. **`font-feature-settings` は実質ゼロ。** `palt` は 2 ページとも **0 要素**。効かないのではなく、**効くのに使っていない**（実スタック・64px で実測 `normal` 1934.17px → `"palt"` 1762.84px ＝ **−8.9%**）。字詰めは `letter-spacing` の `em` 指定だけで作っている
4. **CSS 変数 8 個のうち 4 個が同じネイビーの別名。** `--color-NRINavy` / `--color-navy` / `--color-link` / `--color-btn-primary` がすべて `#00196e`。設計トークンというより「1 色しか無い」ことの表明

**`letter-spacing` の既定は `normal`**（トップ 52 要素が最多）で、**字間を足すのは見出しとラベルだけ**。`word-break` は `normal`、縦組みは 2 ページとも 0 要素。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| NRI ネイビー | `#00196e` | ナビの文字 12 要素 ／ CTA の面 7 要素 ／ `--color-NRINavy` `--color-navy` `--color-link` `--color-btn-primary` の 4 変数が同値 |
| リンク（下層の業種・テーマ） | `#005bac` | 下層ページの文字色 **25 要素で最多**。**トークンには入っていない**（ハードコード） |
| フォーカスリング | `#64afc3` | `--color-focus`。ネイビーではなく明るい水色 |

> **`#00196e` と `#005bac` は別の青で、どちらも実装されている。** ネイビーはナビ・CTA・グローバルなリンク、`#005bac` は下層のサービス一覧カードの見出しに使われる。**片方に寄せない**

### Semantic（意味的な色）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| CTA の面 | `#00196e` | 白文字 ／ `border: 1px solid #00196e`（面と同色の枠を必ず置く） |
| カードの枠 | `#e0e0e0` | トップのカード 1px solid |
| 一覧カードの枠 | `#eeeeee` | 下層のサービスカード 1px solid |
| 入力欄の面 | `#efefef` | 検索ボックス |

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| 本文（最濃） | `#0a0a0a` | 13 要素。ヒーローのサブコピー・セクション見出し |
| 見出し・カード本文 | `#222222` | 17 要素。`--color-black` の宣言値もこれ |
| ニュース本文 | `#333333` | 16 要素 |
| 補助テキスト | `#525252` | 18 要素で最多。リード文・ラベル |
| 日付・メタ | `#4f4f4f` | 12 要素 |
| 面（白） | `#ffffff` | `--color-white` |
| 薄いグレーの面 | `#f9f9f9` / `#fafafa` | セクションの地 |
| 言語切替の面 | `#fcfcfc` | |

> **黒が 5 段ある（`#0a0a0a` / `#222222` / `#333333` / `#4f4f4f` / `#525252`）が、トークンは `--color-black: #222` の 1 つだけ。** 宣言と実装が合っていないので、**変数の値をそのまま本文色に使わない**

---

## 3. Typography Rules

### 3.1 和文フォント

- **Noto Sans JP（Google Fonts・可変フォント `wght@400..700`）1 本のみ。** フォールバックは `sans-serif` だけ
- `document.fonts` は `Noto Sans JP / 400 700` が 124 件（loaded 32 / unloaded 92）。和文は unicode-range で百数十本に分割されるので、**`unloaded` が大量に出るのが正常**
- フォント要求は 32 件、すべて `fonts.gstatic.com`。**自社ホストの書体も Adobe Fonts も無い**
- OS ローカルの書体（ヒラギノ・游ゴシック・メイリオ）は **1 つもスタックに書かれていない**

### 3.2 欧文フォント

- **欧文専用の書体を読み込んでいない。** `Dream up the future.` も `Fundmark Report` も **Noto Sans JP の欧文グリフ**で出る
- 読み込んでいる `@font-face` のうち Noto Sans JP 以外は `swiper-icons`（Swiper のアイコン）だけで、これは `unloaded`

### 3.3 font-family 指定

```css
:root {
  /* 実サイトは html に font-size を変数で当てている */
}
body {
  --font-size: 16px;
  --font-family: "Noto Sans JP", sans-serif;
}
html { font-size: var(--font-size); }   /* 実測 16px（全幅固定） */

/* 実際に全要素へ降りているスタック */
* { font-family: "Noto Sans JP", sans-serif; }
```

> **`--font-size` / `--font-family` は `body` にだけ宣言されている**（`:root` には無い）。`extractCustomProperties` 系の走査は `:root` しか見ないので、この 2 個は「変数が無い」と誤認されやすい。
> 再現するときは `:root` に置いてよい（挙動は同じ）。

### 3.4 文字サイズ・ウェイト階層

ルートは **全幅で `html: 16px` / `body: 16px` 固定**（1920 / 1600 / 1441 / 1440 / 1200 / 1026 / 1025 / 1024 / 900 / 834 / 821 / 820 / 819 / 768 / 767 / 600 / 430 / 375 / 320px の 19 幅で 1px も動かない）。流体も崖も無い。

| 役割 | size | weight | letter-spacing | line-height | 実測 |
|------|------|--------|----------------|-------------|------|
| ヒーロー大見出し | 64px | 400 | 0.4px（0.00625em） | 1.40 | 1 要素。`Dream up the future.未来創発` |
| 下層のリード | 48px | 400 | 0.4px | 1.40 | 1 要素 |
| セクション見出し | 34px | 500 | 1.6px（0.047em） | 1.40 | 3 要素 |
| 中見出し | 24px | 700 | normal | 1.40 | 2 要素 |
| カード見出し（下層） | 20px | 500 | 0.8px（0.04em） | 1.25 | 25 要素 |
| リード文 | 18px | 600 | 0.2px | 1.50 | 9 要素 |
| ニュース見出し | 17px | 400 | normal | 1.47 | 5 要素 |
| 本文・CTA | 16px | 400 / 700 | normal / 0.64px | 1.50 | 29 要素 |
| ナビ・ラベル | 14px | 500 | 0.28px（0.02em） | 1.50 | 28 要素 |
| メタ・日付 | 12px | 400 | 0.28px | 1.50 | 23 要素 |
| フッターの法務リンク | 10px | 400 | 0.2px | 1.50 | 6 要素 |

**ウェイトは 400 / 500 / 600 / 700 の 4 段だけ。** 可変フォントの軸が `400..700` なので、**300 や 900 を当てても 400 / 700 に丸められる**（合成太字にもならない）。

### 3.5 行間・字間

- **`line-height` は無単位の比率**で各要素が宣言し直す。最多は **1.50（トップ 55 要素 / 下層 41 要素）**。カードは 1.40、本文の長い段落は 1.75〜1.80、下層のカード見出しだけ 1.25 と詰める
- **`letter-spacing` は `em` を各要素が持つ型。** `body` から px で継承しているのではない（サイズに比例して px が変わる）

| 宣言 | 実測 px | 当たる要素 |
|---|---|---|
| `normal` | — | 既定。トップ 52 要素・下層 34 要素 |
| `0.02em` | 14px → 0.28px / 12px → 0.28px | ナビ・ラベル・日付（最多 32 要素） |
| `0.04em` | 16px → 0.64px / 14px → 0.56px / 20px → 0.8px | CTA・パンくず・カード見出し |
| `0.047em` | 34px → 1.6px | セクション見出し |
| `0.0125em` | 16px → 0.2px | リード文・フッター |
| `0.00625em` | 64px → 0.4px | ヒーロー |

> **大きい文字ほど `em` が小さい。** 64px の見出しは 0.00625em とほぼ `normal`、14px のラベルは 0.02em、20px のカード見出しは 0.04em。**一律の字間を配らない**

### 3.6 禁則処理・改行ルール

- `body` の `word-break` は **`normal`**（`break-all` も `auto-phrase` も使っていない）。日本語の禁則処理はブラウザ既定に任せる
- ヒーローの `Dream up the future.未来創発` は**改行を CSS に任せず 1 要素に詰めている**。欧文と和文の境目にスペースは無い
- 下層のカード見出しは `line-height: 1.25` で 2 行に折れる前提。**`white-space: nowrap` は使っていない**

### 3.7 OpenType 機能

- **`palt` は 2 ページとも 0 要素。** ただし書体は機能を持っている（実スタック・64px・weight 400 で実測 `normal` 1934.17px → `"palt"` 1762.84px ＝ **−8.9%**、`"halt"` 1806.17px ＝ −6.6%）。**足すと既存のレイアウトと別物になる**ので、再現するときも足さない
- **`pwid` が 1 要素だけある。** フッターのバナー見出し（`.nav-footer div.--banner .ttl-lv2--menu`・14px・「オウンドメディア」）。CSS の宣言はこうなっている:

```css
.nav-footer div.--banner .ttl-lv2--menu {
  color: var(--Foreground-Low-Emphasis, #525252);
  leading-trim: both;        /* ブラウザ未対応 */
  text-edge: cap;            /* ブラウザ未対応 */
  font-feature-settings: "pwid" on;
}
```

> **`leading-trim` / `text-edge` と `var(--Foreground-Low-Emphasis, …)` は Figma が吐く CSS。** 変数は定義されていないのでフォールバックの `#525252` が効き、2 つのプロパティはブラウザが無視する。**残っているのは意図ではなくコピペの痕跡**なので、再現しない。`pwid` は和文を全角幅に戻す指定で、ここでは **+3.3%**（1934.17 → 1998.17px）広がる

### 3.8 縦書き

- **縦組みは 2 ページとも 0 要素。** `writing-mode` は全要素 `horizontal-tb`
- 縦組みを足す理由がどこにも無い設計なので、**再現するときも入れない**

---

## 4. Component Stylings

### Buttons

| 種類 | 面 | 文字 | radius | padding | size / weight | letter-spacing |
|---|---|---|---|---|---|---|
| 主 CTA（一覧へ） | `#00196e` | `#ffffff` | **12px** | `12px 8px 12px 24px` | 16px / 700 | 0.64px |
| 主 CTA（小） | `#00196e` | `#ffffff` | **8px** | `12px 64px 12px 76px` | 14px / 700 | 0.56px |
| 枠だけ（ヒーロー上） | 透明 | `#ffffff` | 8px | `12px 16px 12px 32px` | 14px / 600 | 0.56px |
| 言語切替 | 透明 | `#000000` | 8px | `0` | 16px / 400 | normal |

- **面色のボタンは必ず `border: 1px solid` を面と同色で置く**（`1px solid #00196e`）。枠だけのボタンは `1px solid #ffffff`
- **padding が左右非対称**（`12px 8px 12px 24px`）。右に矢印アイコンを絶対配置する前提で、左を厚くしている

### Badges / Chips

| 種類 | 面 | 文字 | radius | size |
|---|---|---|---|---|
| カテゴリ（出版・刊行物／レポート） | 透明 | `#525252` | — | 12px / 400 |
| 新着 | — | — | — | バッジ自体を使わず日付で見せる |

### Inputs

| 項目 | 値 |
|---|---|
| 面 | `#efefef` |
| radius | `8px` |
| border | `0` |
| size / weight | 16px / 400 |
| 文字色 | `#000000` |
| フォーカスリング | `#64afc3`（`--color-focus`） |

### Cards

| 項目 | トップ | 下層（サービス一覧） |
|---|---|---|
| 面 | `#ffffff` | `#ffffff` |
| radius | **12px** | **12px** |
| border | `1px solid #e0e0e0` | `1px solid #eeeeee` |
| box-shadow | `rgba(0,0,0,0.1) 0 1px 3px` | `rgba(0,0,0,0.06) 0 1px 2px` |
| padding | `0`（中身で調整） | `24px` |
| 見出し | 16px / 400 / `#222222` | 20px / 500 / `#005bac` / ls 0.8px |

- **ヒーロー直下の 3 枚カードだけ `rgba(255,255,255,0.4)` の半透明**（背景の `bg__mv.avif` を透かす）＋ `radius: 16px`

---

## 5. Layout Principles

### Spacing Scale

8px の倍数が基調。実測で出た `gap`:

| 値 | 用途 |
|---|---|
| `8px` | アイコンとラベル |
| `12px 8px` | バッジ列 |
| `16px` | カード内の要素 |
| `0 24px` / `0 32px` | 横並びのナビ |
| `32px` | カードグリッド（下層） |
| `40px` | セクション内のブロック |
| `24px 96px` | フッターのリンク群 |
| `80px` | セクション間 |

`padding` は `12px` / `24px` が基本単位。

### Container

| 値 | 用途 |
|---|---|
| **1440px** | 全幅のセクション（ヒーロー・背景帯）。トップで 10 箇所 |
| **1120px** | 本文カラム。下層で 6 箇所 |

### Grid

- トップのカード: 3 カラム（`gap: 40px`）
- 下層の業種・テーマ一覧: 3〜4 カラム（`gap: 32px` / `20px 16px`）
- ニュース: 1 カラムのリスト（日付 + 見出し）

---

## 6. Depth & Elevation

影は **4 種類あり、すべて「ほぼ真下に 1px、ごく淡く」**。黒に丸めずそのまま写す。

| 影 | 件数 | 用途 |
|---|---|---|
| `rgba(0, 0, 0, 0.06) 0px 1px 2px 0px` | 26（下層） | 業種・テーマのカード |
| `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px` | 7 | 出版物・レポートのカード |
| `rgba(0, 0, 0, 0.2) 0px 1px 4px 0px` | 4 | ネイビーの CTA |
| `rgba(0, 0, 0, 0.1) 0px 4px 10px 0px` | 1 | コラムのカード（唯一の「浮く」影） |
| `rgba(255, 255, 255, 0.5) 0px 0px 2px 0px` | 1 | ヒーロー上の白文字（**白い影**で背景写真から浮かせる） |

- **`blur` は 2〜4px しか使わない。** カードを持ち上げるのではなく、輪郭をわずかに立てるだけ
- `border-radius` は **12px が支配的**（トップ 30 要素 / 下層 53 要素）。次いで 14px（ナビのドロップダウン 16 要素）、16px（ヒーロー直下のカード）、8px（ボタン・入力）、24px（コラムのカード）、`50%`（アイコン）、`2px`（ハンバーガーの線）

---

## 7. Do's and Don'ts

### Do（推奨）

- **書体は `"Noto Sans JP", sans-serif` だけを書く。** 欧文も和文もこれで組む（ヒーローの `Dream up the future.` を含む）
- **Google Fonts は可変フォントの 1 本で読む**: `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400..700&display=swap`
- **ウェイトは 400 / 500 / 600 / 700 の 4 段で設計する**
- **`line-height` は無単位の比率で各要素に書く。** 既定は 1.50、カードは 1.40、長い段落は 1.75〜1.80
- **`letter-spacing` は `em` で各要素に当てる。** ナビ 0.02em、CTA・カード見出し 0.04em、セクション見出し 0.047em。**64px の大見出しはほぼ `normal`（0.00625em）**
- **ブランド色は `#00196e` の一色。** 面と同色の `1px solid` を必ず添える
- **カードの角丸は 12px、ボタンは状況に応じて 8px か 12px**
- **影は `0 1px 2〜4px` の淡いもの**。`rgba(0,0,0,0.06)` / `0.1` / `0.2` を用途で使い分ける
- **フォーカスリングは `#64afc3`**（ブランドのネイビーではない）
- コンテナは全幅 1440px / 本文 1120px

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない。** 実サイトは 0 要素で、足すと字送りが **−8.9%** 変わって別物になる
- **`pwid` を真似しない。** 1 要素だけに残っているのは Figma のエクスポート（`leading-trim` / `text-edge` / 未定義の `var(--Foreground-Low-Emphasis)` とセット）の痕跡
- **ヒラギノ・游ゴシック・メイリオをスタックに足さない。** 実サイトのフォールバックは `sans-serif` ひとつだけ
- **weight 300 / 800 / 900 を要求しない。** 可変軸が `400..700` なので出ない
- **`--color-black: #222` をそのまま本文色に使わない。** 実装の本文は `#0a0a0a` / `#333333` / `#525252` が中心
- **`#00196e` と `#005bac` を片方に寄せない。** 下層のカード見出しは `#005bac` が 25 要素で最多
- **ルートを `62.5%` や `vw` に書き換えない。** 実サイトは 19 幅すべてで 16px 固定
- **縦組みを入れない**（実測 0 要素）
- **`word-break: break-all` を足さない**（実サイトは `normal`）
- `letter-spacing` を `body` に 1 回だけ書いて px で継承させない（実サイトは要素ごとの `em`）

---

## 8. Responsive Behavior

### Breakpoints

**モバイルファースト（`min-width`）**。実測で出た件数:

| クエリ | 件数（トップ / 下層） |
|---|---|
| `screen and (min-width: 768px)` | 467 / 296 |
| `screen and (min-width: 1025px)` | 196 / 126 |
| `screen and (max-width: 767px)` | 58 / 30 |
| `screen and (min-width: 1441px)` | 多数 |

- 主要な境目は **768px と 1025px**。1441px は全幅セクションの上限処理
- `820 / 819px` `751 / 750px` には崖が無い（実測で確認）

### タッチターゲット

- CTA は `padding: 12px 8px 12px 24px` ＋ 16px の文字で**高さ 48px 相当**
- ナビのリンクは 14px / `line-height: 1.5` ＋ 上下 `padding` で 44px 以上
- アイコンボタンは `border-radius: 50%` の円形

### フォントサイズの調整

- **ルートは固定のまま、要素側も px 固定。** `clamp()` も `vw` も `rem` 連動も使っていない
- 唯一の変化は **375px 以下で `<p>` が 18px → 16px** に落ちること（メディアクエリによる段階切替）
- ヒーローは 64px のまま（モバイルでは別クラスが当たる）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
NRI Navy:     #00196e   （ナビ・CTA・リンク・--color-NRINavy / --color-navy / --color-link / --color-btn-primary）
Sub Blue:     #005bac   （下層のカード見出し・トークン外）
Focus Ring:   #64afc3   （--color-focus）
Text:         #0a0a0a / #222222 / #333333 / #525252 / #4f4f4f
Border:       #e0e0e0（トップ） / #eeeeee（下層）
Surface:      #ffffff / #f9f9f9 / #fafafa
Input BG:     #efefef
Font:         "Noto Sans JP", sans-serif   ← これ 1 本だけ（欧文も和文も）
Google Fonts: css2?family=Noto+Sans+JP:wght@400..700&display=swap
Root:         16px 固定（全幅・流体なし）
Weights:      400 / 500 / 600 / 700（可変軸 400..700）
Line Height:  1.50（既定） / 1.40（カード・見出し） / 1.75〜1.80（長文） / 1.25（下層カード見出し）
Letter Spacing: normal（既定） / 0.02em（ナビ・ラベル） / 0.04em（CTA・カード見出し） / 0.047em（34px 見出し） / 0.00625em（64px ヒーロー）
Border Radius: 12px（カード・CTA） / 8px（ボタン小・入力） / 14px / 16px / 24px / 50%
Shadow:       rgba(0,0,0,0.06) 0 1px 2px ／ rgba(0,0,0,0.1) 0 1px 3px ／ rgba(0,0,0,0.2) 0 1px 4px
Container:    1440px（全幅） / 1120px（本文）
palt:         使わない（0 要素）
```

### プロンプト例

```
野村総合研究所（NRI）のデザインシステムに従って、サービス一覧ページを作成してください。
- font-family は "Noto Sans JP", sans-serif だけ。欧文見出しも同じ書体で組む
- Google Fonts は css2?family=Noto+Sans+JP:wght@400..700&display=swap の 1 本だけ読む
- ルートは 16px 固定。clamp() も vw も使わない
- ヒーローは 64px / weight 400 / letter-spacing 0.4px / line-height 1.40、欧文と和文を 1 要素に続けて書く
- セクション見出しは 34px / weight 500 / letter-spacing 1.6px / line-height 1.40
- カード見出しは 20px / weight 500 / letter-spacing 0.8px / line-height 1.25、文字色は #005bac
- 本文は 16px / 400 / line-height 1.50 / letter-spacing normal、色は #333333
- ナビ・ラベルは 14px / weight 500 / letter-spacing 0.28px
- CTA は背景 #00196e / 白文字 / border 1px solid #00196e / border-radius 12px /
  padding 12px 8px 12px 24px / 16px weight 700 / letter-spacing 0.64px
- カードは白地 / border 1px solid #eeeeee / border-radius 12px / padding 24px /
  box-shadow rgba(0,0,0,0.06) 0 1px 2px
- 入力欄は背景 #efefef / border 0 / border-radius 8px、フォーカスリングは #64afc3
- font-feature-settings は書かない（palt も pwid も使わない）
- 縦組みは使わない。word-break は normal
- コンテナは全幅 1440px、本文カラム 1120px。gap は 32px / 40px
- ブレークポイントは min-width 768px と min-width 1025px のモバイルファースト
```
