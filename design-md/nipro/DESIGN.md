# DESIGN.md — ニプロ（NIPRO）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-05 / 対象: `https://www.nipro.co.jp/`, `/corporate/mission-vision-value/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **角丸ゼロ・影ゼロ。** 面と罫線と字間だけで組む。Google Fonts を 3 ファミリー（Roboto / Noto Sans JP / Noto Serif JP）読み込み、**見出しに `0.08em` の字空けと `palt`** を当てる。医療機器メーカーの硬さを、角の立った矩形と広い字間で作る
- **密度**: 高。`body` の `line-height` が **1.1** という異例の詰まり方で、各コンポーネントが自分で行間を取り直す
- **キーワード**: Roboto 先頭の和欧二層、`palt`、`0.08em` の字空け、角丸ゼロ、影ゼロ、`em` の入れ子

**このサイトの核心は5つある。**

1. **`body { line-height: 1.1 }` が無単位で全要素に降りる。** CSS に `body { text-align: center; line-height: 1.1 }` と書かれており、実測でも**行間比 1.10 が 63 / 50 要素**と最多。無単位なので各要素が自分のサイズで再計算するが、**行間を宣言し忘れたブロックは行が潰れる**。本文ブロックには必ず `line-height` を書くこと
2. **サイズがすべて `em` の入れ子で、掛け算になる。** CSS の `font-size` 宣言は `0.5em` / `0.55em` / `0.75em` / `0.875em` / `0.93em` / `1.08em` / `1.125em` / `1.25em` / `1.375em` / `1.75em` / `2em` / `2.25em` / `2.5em` …と **`em` ばかり**（`rem` は 0 件、`%` は `100%` の 2 件のみ）。`#business div h3 { font-size: 2.312em }` が **16 × 2.312 = 36.992px**、その中の `strong { font-size: 1.35em }` が **36.992 × 1.35 = 49.9392px**。**端数は流体でも `%` 入れ子でもなく、`em` の掛け算**
3. **字間は見出しが各自 `0.08em` を持つ（継承ではない）。** 28px → 2.24px、36px → 2.88px、40px → 3.2px と**サイズに比例して px が変わる**ので `em` を各要素に当てている型。`body` は `normal`、本文 135 / 95 要素も `normal`
4. **ヒーローのコピーは画像。** 「すべてのいのちに、よろこびを。」は `main.png`（**362×258px**、`alt` に同じ文言）。背後の `main01.jpg`〜`main05.jpg`（1440×787px）が切り替わるスライドショー。**DOM に該当するテキスト要素は無い**
5. **CSS Custom Properties は 0 個。** 両ページとも `customPropertiesSummary.total: 0`。CSS 全文（96KB）を走査しても `--` で始まる宣言が 1 つも無い。**色・サイズ・字間はすべて直書き**

> **グレーが 7 段ある。** `#6D6D6D`（48 / 51 要素）/ `#323232`（35 / 17）/ `#464646`（13 / 11）/ `#505050`（11）/ `#1E1E1E`（9）/ `#6E6E6E`（6）/ `#4A4949`（5）。**`#6D6D6D` と `#6E6E6E` は RGB で 1 しか違わない**が、どちらも実装されている。新規実装では用途ごとに下の表の値を使う

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **NIPRO Blue** | **`#004386`** | **可視テキスト 11 要素**（`M` `V` `V` の頭文字、`声`、見出しリンク）＋ **面 2 / 3 要素**（CMP の同意ボタン、フッター、下層のページ見出し帯） |
| **Brand Site Tab** | **`rgba(0, 94, 173, .9)`** | 右端に貼り付く縦組みタブ `BRAND SITE` の面（1 要素）。**`#004386` とは別の青** |
| Pale Blue Surface | `#F2F5F9` | 下層のパンくず直下の面（1 要素） |
| Icon Blue | `#8BB6D8` | CMP の閉じる `×`（1 要素） |

### Neutral（ニュートラル）

- **Text Muted** (`#6D6D6D`): ナビ・リスト項目。**可視 48 / 51 要素で最多**。本文より薄い色がサイトの基調
- **Text Primary** (`#323232`): 見出し・ロゴ（可視 35 / 17 要素）
- **Text Body** (`#464646`): `body` の既定色（可視 13 / 11 要素）
- **Text Dark** (`#1E1E1E`): ニュースのカテゴリ（可視 9 要素）。`English` ボタンの面にも使う
- **Text Gray** (`#505050`): ニュース本文（可視 11 要素）
- **Text Gray 2** (`#6E6E6E`): ニュースの日付（可視 6 要素）
- **Text Gray 3** (`#4A4949`): メガメニューの見出し（可視 5 / 4 要素）
- **Text on Dark** (`#FFFFFF`): 青面・黒面の上の文字（可視 5 要素）
- **Disabled / Decline** (`#AAAAAA`): CMP の「同意しない」の面
- **Surface Gray** (`#F1F1F1`): メガメニューの面
- **Surface Gray 2** (`#F2F2F2`): 下層のパンくず・サイドナビの面
- **Nav Label** (`#DCDCDC`): `English` ボタンの文字
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body` ・下層は `viewportTopBySample (3/3)`）

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック（既定）**: **Noto Sans JP**（Google Fonts）。`400 / 500 / 700 / 900` の **4 ウェイトすべてが `loaded`**
- **明朝（ヒーロー直下の見出し専用）**: **Noto Serif JP**。`500` と `700` が `loaded`（`400` / `600` は `unloaded`）。**可視は 2 要素だけ**（`独自の製品・技術で 医療現場の声に応える。` と、その中の `声`）
- フォント要求は **53 件**（`fonts.gstatic.com`）。和文は unicode-range で分割配信されるので `unloaded` が大量に出るのは正常

### 3.2 欧文フォント

- **Roboto**（Google Fonts）。`400 / 500 / 700 / 900` が `loaded`
- **スタックの先頭に置いて欧文を優先**している（`Roboto, "Noto Sans JP", sans-serif`）。欧文の見出し（`Topics` / `News Release` / `IR News`）は weight **900** で組む
- カルーセルの `Previous` / `Next` だけ `Arial`（Slick の既定値。サイトの設計ではない）

### 3.3 font-family 指定

```css
body {
  font-family: Roboto, "Noto Sans JP", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.1;            /* ★ 無単位。異例に詰まっている */
  letter-spacing: normal;
  word-break: normal;
  text-align: center;          /* ★ レガシーな中央寄せハック */
  color: #464646;
}

/* 明朝はヒーロー直下の 1 コンポーネントだけ */
#business div h3 {
  font-family: "Noto Serif JP", serif;
  font-size: 2.312em;          /* = 36.992px */
  font-weight: 500;
  letter-spacing: .03em;       /* = 1.10976px */
  width: 110%;                 /* 枠をはみ出させるためのハック */
  margin-right: -10%;
  margin-bottom: .8em;
}
#business div h3 strong {
  font-size: 1.35em;           /* = 49.9392px。em なので掛け算される */
  font-weight: 700;
  color: #004386;
}
```

> **`body { text-align: center }` は中身の左揃えを各ブロックで打ち消す前提の書き方。** 新規実装では真似せず、必要な要素にだけ `text-align: center` を当てる

> **`em` の入れ子に注意。** `h3` の `letter-spacing: .03em` は 36.992px に対して **1.10976px** という絶対値になり、そのまま子の `strong`（49.9392px）へ降りる。結果、**同じ 1 行の中で親 0.03em・子 0.0222em と実効字間が違う**。字間を揃えたいなら子にも `letter-spacing` を書き直す

### 3.4 文字サイズ・ウェイト階層

| 役割 | サイズ | ウェイト | 行間 | 字間 | 書体 |
|------|--------|---------|------|------|------|
| 欧文セクション見出し | 28px | **900** | 30.8px（1.1） | **2.24px**（0.08em） | Roboto |
| 和文セクション見出し | 40px | 700 | 44px（1.1） | **3.2px**（0.08em） | Noto Sans JP |
| ページ見出し（下層） | 36〜40px | 700 | 1.1 | **2.88 / 3.2px**（0.08em） | Noto Sans JP |
| **明朝の導入見出し** | **36.992px** | **500** | 40.6912px（1.1） | 1.10976px（0.03em） | **Noto Serif JP** |
| 　└ 強調（`strong`） | **49.9392px** | **700** | 54.9331px（1.1） | 1.10976px（**0.0222em**） | **Noto Serif JP** |
| 対象者ナビ | 32px | **900** | 35.2px（1.1） | normal | Noto Sans JP |
| フッター見出し | 26px | 700 | 41.6px（1.6） | 1.3px（0.05em） | Noto Sans JP |
| メガメニュー見出し | 22px | 500 | 24.2px（1.1） | normal | Noto Sans JP |
| リード文 | 20px | 400 | 1.75〜1.8 | normal | Noto Sans JP |
| ナビ・リスト | 18px | 400 | 28.8px（1.6） | normal | Noto Sans JP |
| 本文 | **16px** | **400** | **17.6px（1.1）** | normal | Noto Sans JP |
| 小見出し・日付 | 14px | 400 | 15.4px（1.1） | normal | Noto Sans JP |
| ロゴ（`h1`） | 16px | 700 | 17.6px | 1.28px（0.08em） | Roboto |

- **ウェイトは 400 / 500 / 700 / 900 の 4 段。** 読み込んでいる 4 本と完全に一致する
- **`h1` はロゴだけで 16px。** ページ見出しは `h2` 以下に割り当てられている。**見出しレベルとサイズが対応していない**ので、スタイルはクラスで当てる
- **900 は欧文の見出し（`Topics` / `News Release` / `IR News`）と対象者ナビにだけ**。和文の大見出しは 700 で止める

### 3.5 行間・字間

- **`line-height` は `body` の無単位 `1.1` が基準。** 実測で 1.10 が 63 / 50 要素。読ませるブロックは各自で取り直している（1.6 が 29 / 12 要素、1.75 が 5 / 2、1.8 が 3）
- **1.1 は「見出し用の行間」が `body` に書かれている状態**。**本文ブロックを作ったら必ず `line-height: 1.6` 以上を宣言すること**。宣言を忘れると日本語が読めない密度になる
- **字間は見出しに `0.08em` を各要素が持つ。** `body` には書かない（`normal`）。実測の px はサイズに比例している（28px→2.24 / 36px→2.88 / 40px→3.2 / 24px→1.92）
- 例外は明朝見出しの `0.03em`、フッター見出しの `0.05em`、縦組みタブの `0.12em`（4.608px / 38.4px）

### 3.6 禁則処理・改行ルール

- `body { word-break: normal }`（8 幅すべてで確認）。**`break-all` も `auto-phrase` も使っていない**
- 改行は `<br>` を手で入れる（経営理念のリード文など）

### 3.7 OpenType 機能

- **`font-feature-settings: "palt"` が 67 / 64 要素**。すべて `horizontal-tb` で、**縦横の軸の取り違えは無い**
- **実際に効いている。** 実ページに隠し div を作り、`「ニプロ」、医療機器。（株）` を 40px の Noto Sans JP で測ると **`normal` 520.00px / `"palt"` 432.73px（−16.8%）**
- **`palt` で詰めた上から `0.08em` の正の字間を足し直す二段構え。** 片方だけ再現すると別物になる

### 3.8 縦書き

- **縦組みは 1 要素だけ。** 右端に貼り付く `BRAND SITE` タブ（`writing-mode: vertical-rl`、面 `rgba(0, 94, 173, .9)`、`letter-spacing: 4.608px` = 0.12em）
- **本文・見出しは横組み。** 縦組みを本文に広げないこと

---

## 4. Component Stylings

### Buttons

```css
/* 一次ボタン（CMP の同意・下層の見出し帯） */
.button-primary {
  background: #004386;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  line-height: 17.6px;        /* 1.1 */
  letter-spacing: normal;
  border-radius: 0;           /* ★ 角丸なし */
  box-shadow: none;           /* ★ 影なし */
  padding: 8px 0;
}

/* 二次ボタン（辞退・無効） */
.button-secondary { background: #aaaaaa; color: #ffffff; }

/* 黒ボタン（一覧を見る） */
.button-more {
  background: #000000;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;          /* 1.75。ここだけ行間を広く取る */
  border-radius: 0;
}

/* 小さな言語切替 */
.button-lang {
  background: #1e1e1e;
  color: #dcdcdc;
  font-size: 14px;
  font-weight: 400;
  line-height: 15.4px;
  padding: 5px 0;
  border-radius: 0;
}
```

### Cards / Surfaces

```css
.surface { background: #f1f1f1; border-radius: 0; box-shadow: none; }
.surface--pale { background: #f2f5f9; }   /* 下層のパンくず直下 */
.surface--gray { background: #f2f2f2; }   /* サイドナビ */
```

- **`border-radius` は実測 1 種・1 要素（`1px`）だけ。** 事実上**角丸を使わない**
- **`box-shadow` は 0 種。** 両ページで 1 要素も無い。**浮かせない・影を足さない**

### Inputs

- 検索フォームは 14px / weight 400 / 角丸なし

---

## 5. Layout Principles

### Container

- **最大幅 1300px**（可視 1 要素）。下層も同じ
- 一部のセクションは `@media (min-width: 1261px)` で `width: 1160px` に絞る

### Spacing Scale

- `gap` の実測: `30px` / `15px 30px`
- 余白は `em` で書かれているものが多い（`margin-bottom: .8em` など）。**サイズを変えると余白も一緒に動く**

### Grid

- トップのニュース/IR は 2 カラム
- 事業紹介は 3 カラム、対象者ナビは 3 カラム

---

## 6. Depth & Elevation

- **影は 1 つも無い（実測 0 種）。** 面の切り替えと罫線だけで階層を作る
- **角丸も無い。** すべて直角の矩形
- 重なりは `z-index` と不透明度で作る（`rgba(255, 255, 255, .9)` のヒーロー上のテキストボックス、`rgba(0, 94, 173, .9)` のタブ）

---

## 7. Do's and Don'ts

### Do（推奨）

- **`body { line-height: 1.1 }` を再現するなら、本文ブロックに必ず `line-height: 1.6` 以上を書く**
- **見出しに `letter-spacing: .08em` を各要素で当てる**（`body` には書かない）
- **`font-feature-settings: "palt"` を本文〜見出しに当てたうえで、正の字間を足す**
- **角丸 0・影 0 を守る。** 矩形と面色で組む
- 欧文の見出しは Roboto の weight 900、和文の大見出しは Noto Sans JP の weight 700
- 明朝（Noto Serif JP）は**導入の 1 見出しだけ**に使う

### Don't（禁止）

- **`line-height: 1.1` を本文にそのまま降ろさない。** 日本語が読めない密度になる
- **サイズを `rem` に書き換えない。** このサイトは `em` の入れ子で組まれており、`rem` にすると親子関係（`h3` 2.312em → `strong` 1.35em）が壊れる
- **`border-radius` と `box-shadow` を足さない。** 実測 0 なので、足すと一気に別のサイトに見える
- **ヒーローのコピーをテキストで組み直さない** — 現行は `main.png`（362×258）の画像。テキスト化するなら明朝ではなくデザイン側の判断が要る
- **`body { text-align: center }` を真似しない。** 必要な要素にだけ当てる
- **`h1` にページ見出しのスタイルを当てない**（このサイトの `h1` はロゴで 16px）
- **CSS Custom Properties を前提にしない。** トークンは 0 個
- **縦組みを `BRAND SITE` タブ以外に広げない**

---

## 8. Responsive Behavior

### Breakpoints

```
screen and (max-width: 700px)    ← 31 / 47 箇所（最頻）
screen and (max-width: 1020px)   ← 13 箇所
screen and (max-width: 600px)    ← 12 / 16 箇所
screen and (max-width: 500px)    ← 12 / 18 箇所
screen and (max-width: 400px)    ← 12 / 14 箇所
screen and (max-width: 900px)    ← 8 / 15 箇所
screen and (max-width: 1300px)   ← 7 箇所
screen and (max-width: 1000px)   ← 6 / 10 箇所
screen and (max-width: 420px)
```

- **すべて `max-width` のデスクトップファースト。** `min-width` は使っていない
- **段が 9 つ以上ある**。700px が最頻で、400 / 420 / 500 / 600 と小さい側も細かく刻む

### フォントサイズの調整

**`html` も `body` も 8 幅すべてで完全固定。ルートは一切動かない。**

| 幅 | `html` | `body` | `h2` | `h3`（明朝） |
|----|--------|--------|------|--------------|
| 1440px | 16px | 16px / 17.6px / 400 | 28px / 30.8px | 36.992px / 40.6912px |
| 1200px | 16px | 16px / 17.6px / 400 | 28px / 30.8px | 36.992px / 40.6912px |
| 1024px | 16px | 16px / 17.6px / 400 | 28px / 30.8px | 36.992px / 40.6912px |
| 834px | 16px | 16px / 17.6px / 400 | 28px / 30.8px | 36.992px / 40.6912px |
| **768px** | 16px | 16px / 17.6px / 400 | 28px / 30.8px | **34px / 37.4px** |
| 767px | 16px | 16px / 17.6px / 400 | 28px / 30.8px | 34px / 37.4px |
| **390px** | 16px | 16px / 17.6px / 400 | **17.5px / 19.25px** | **22.75px / 25.025px** |
| 375px | 16px | 16px / 17.6px / 400 | 17.5px / 19.25px | 22.75px / 25.025px |

- **`html { font-size }` の宣言が CSS に 1 つも無い。** `16px` はブラウザ既定（UA）そのもの。測り損ねではない
- **`body` は 375px でも 16px のまま。** モバイルでも本文を縮めない
- 見出しだけがブレークポイントで段階的に縮む。`17.5px`（= 28 × 0.625）/ `22.75px`（= 34 × 0.669）のような端数は **`em` の係数が変わるため**

### タッチターゲット

- ボタンの `padding` は `8px 0` / `5px 0` と小さく、高さは親で確保している。**モバイルでは 44px 以上を別途確保すること**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体: Roboto, "Noto Sans JP", sans-serif（欧文優先の和欧二層）
明朝: "Noto Serif JP", serif（導入見出し 1 コンポーネントのみ）
ルート: html = 16px（UA 既定・宣言なし）・全幅固定
本文: 16px / line-height 1.1（無単位！）/ font-weight 400 / color #464646
      ※ 読ませるブロックは line-height 1.6 以上を必ず宣言
字間: body は normal。見出しは各要素に 0.08em
palt: 使う（67 要素・実測 −16.8%）
ウェイト: 400 / 500 / 700 / 900 の 4 段
ブランド青: #004386
角丸: 0（実測 1 種のみ）
影: 0 種（使わない）
コンテナ: 1300px
ブレークポイント: 400 / 420 / 500 / 600 / 700 / 900 / 1000 / 1020 / 1300px（すべて max-width）
サイズ単位: em（rem は 0 件）
CSS 変数: 無し（直書き）
word-break: normal
```

### プロンプト例

```
ニプロのコーポレートサイトのスタイルで、事業紹介ページを作ってください。

- font-family: Roboto, "Noto Sans JP", sans-serif
- body は 16px / font-weight 400 / #464646、line-height は 1.1（無単位）
  ただし本文の <p> には line-height: 1.6 を必ず書く
- 見出しは font-weight 700、letter-spacing: .08em を各見出しに直接当てる
- font-feature-settings: "palt" を本文と見出しに当てる
- border-radius も box-shadow も使わない（実測 0）
- ブランド青は #004386。グレーは #6D6D6D（ナビ）/ #323232（見出し）/ #464646（本文）を使い分ける
- コンテナ最大幅 1300px、ブレークポイントは max-width の 700px / 1020px
- サイズは em で書く（rem は使わない）
- CSS 変数は使わず値を直書きする
```

```
導入の見出しブロックを作ってください。

- 見出しは "Noto Serif JP", serif / font-size: 2.312em（= 36.992px）/ font-weight 500 /
  letter-spacing: .03em / color #323232
- その中の強調語を <strong> にして font-size: 1.35em（= 49.9392px）/ font-weight 700 /
  color #004386
- strong には letter-spacing を書き直す（親の .03em が px で降りて 0.0222em になるため）
- 明朝はこのブロックだけ。他の見出しは Noto Sans JP に戻す
```
