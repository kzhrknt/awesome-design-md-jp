# DESIGN.md — UPSIDER

> UPSIDER（https://up-sider.com/lp/）のデザイン仕様書。
> 「上場のための法人カード」を掲げる**法人カード／支出管理の B2B SaaS**。10 万社超が導入。
> **主 CTA はオレンジのグラデーションピル**（`linear-gradient(90deg, #f5833e 0%, #fead48 100%)`）。**サイト内で有彩色が出るのは、ほぼこの CTA だけ**
> **面色が `background-color` ではなく `background-image` で塗られている**。CTA の `background-color` は `rgba(0,0,0,0)` のまま。**`background-color` だけを見ると CTA が透明に見える**
> **書体が 2 本立て**。ヒーロー見出しと CTA ラベルは **`Noto Sans JP`**、本文と 2 次見出しは **`游ゴシック体` 先頭のシステムスタック**。ステップ番号だけ `Inter`
> **黒セクションが斜めに割れている**。`linear-gradient(108.58deg, #000 0 49.99%, #1f1f1f 49.99% 100%)` ——**同系色の黒 2 枚を 108.58 度で切り替える**ことで、ベタ塗りに見えない黒を作る
> 実サイトの computed style 実測（2026-08-24 取得。LP トップ ＋ `/lp/function/`）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白と黒の 2 極 ＋ オレンジ 1 点**。白セクションで説明し、黒セクションで断言する。**色で誘導するのは CTA だけ**
- **UPSIDER について**: 上場企業・スタートアップの管理部門／CFO 向け法人カード。訴求軸は「最大 10 億円の限度額」「対応スピード」「不正利用ほぼゼロ」で、**数字を大きく見せる構成**が全編にわたる
- **密度**: **低い**。h1 が 64px、h2 が 48px、黒セクションの上下 padding が **160px**。**1 スクリーン 1 メッセージ**
- **キーワード**: オレンジのグラデーションピル、`Noto Sans JP` ＋ 游ゴシックの 2 本立て、斜めに割れる黒、160px の縦余白、灰の枠線 `rgba(0,0,0,0.12)`
- **特徴**:
  - **有彩色がオレンジ 1 系統しかない**。`#f5833e` → `#fead48` のグラデーション。**それ以外は白・黒・灰だけ**
  - **CTA が `background-image` で塗られている**。`background-color` は透明。**トークン抽出でも `_fill` を見ないと拾えない**
  - **ピルの radius が場所ごとに違う**（ヘッダー 20px / ヒーロー 30px / 追従バー 100px）。**すべて「高さの半分以上」で結果的にピルになる**という設計
  - **影が灰色 `rgb(203,203,203)` のべた影**。`rgba` ではなく**不透明な灰**を `0 5px 15px` で落とす。追従 CTA だけ `rgb(0,0,0) 0 0 24px`
  - **黒が 3 段階**。`#000000`（斜め分割の片側）／`#1f1f1f`（もう片側・フッター・本文文字）／`#373737`（アクティブなドット）
  - **見出しに `letter-spacing` を当てているのは h1 だけ**（`2.56px` ＝ `0.04em`）。h2 以下はすべて `normal`
  - **line-height が 1.5 で統一**されている（48px/72px、36px/54px、30px/45px、24px/36px）。**本文だけ 1.75**（16px/28px）
  - **`font-feature-settings` は全要素 `normal`**。`palt` を使わない

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (3/3)`）。

### Brand（ブランド）

- **UPSIDER Orange**: **`linear-gradient(90deg, #f5833e 0%, #fead48 100%)`**
  - 開始 `#f5833e`（rgb 245,131,62）／終了 `#fead48`（rgb 254,173,72）
  - **主 CTA（「お申し込み」）の面。単色ではなく必ずグラデーションで使う**
  - **`background-image` で指定されている**（`background-color` は `rgba(0,0,0,0)` のまま）

### Ink（黒の階調）

| 役割 | 色 | rgb | 用途 |
|------|-----|-----|------|
| 文字（主） | **`#1f1f1f`** | 31,31,31 | `body` の既定色・見出し・本文 |
| 文字（リンク） | **`#1f2937`** | 31,41,55 | ナビリンク、白ボタンのラベル |
| 文字（ボタン） | **`#27272a`** | 39,39,42 | 追従 CTA の白ボタンラベル |
| 黒（分割の片側） | **`#000000`** | 0,0,0 | 斜め分割セクションの片側 |
| 黒（分割の片側） | **`#1f1f1f`** | 31,31,31 | もう片側。フッターの面 |
| 灰（濃） | **`#373737`** | 55,55,55 | カルーセルのアクティブドット |
| 灰（チップ） | **`#6b6b6b`** | 107,107,107 | 特徴チップの面（白文字） |
| 灰（中） | **`#9c9c9c`** | 156,156,156 | 注釈テキスト、非アクティブなドット |
| 灰（面） | **`#f3f3f3`** | 243,243,243 | 比較セクションの面 |
| 枠線 | **`rgba(0,0,0,0.12)`** | — | アウトラインボタンの罫 |
| 影 | **`rgb(203,203,203)`** | 203,203,203 | **不透明な灰**の影 |

### 斜め分割の黒

```css
/* 黒セクションはベタ塗りではなく、同系色の黒 2 枚を 108.58 度で切り替える */
background-image: linear-gradient(
  108.58deg,
  #000000 0%, #000000 49.99%,
  #1f1f1f 49.99%, #1f1f1f 100%
);
padding: 160px 0;
```

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（見出し・CTA）**: **Noto Sans JP**（Web フォント）
- **ゴシック体（本文・2次見出し）**: 游ゴシック体 → 游ゴシック → Yu Gothic → ヒラギノ角ゴ ProN W3 → メイリオ
- **明朝体**: **使用しない**

### 3.2 欧文フォント

- **サンセリフ**: **Inter**（ステップ番号 `STEP01` 等のラベル専用）／Arial（游ゴシックスタック内のフォールバック）
- **等幅**: 指定なし
- **アイコン**: Material Icons

### 3.3 font-family 指定

```css
/* 本文・2次見出し（body の既定）— 游ゴシック先頭のシステムスタック */
font-family: 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic",
             "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             Arial, メイリオ, Meiryo, sans-serif;

/* ヒーロー見出し h1 — Noto Sans JP 単独（フォールバックなし） */
font-family: "Noto Sans JP";

/* セクション見出し h2・CTA ラベル */
font-family: "Noto Sans JP", sans-serif;

/* 英字ラベル（STEP01 等） */
font-family: Inter, sans-serif;

/* Inter ＋ Noto Sans JP ＋ 游ゴシックの混植スタック（一部要素） */
font-family: Inter, "Noto Sans JP", 游ゴシック体, YuGothic, 游ゴシック,
             "Yu Gothic", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             メイリオ, Meiryo, sans-serif;
```

**フォールバックの考え方**:
- **見出し・CTA だけを `Noto Sans JP` にし、本文はシステムフォントに任せる**という割り切り。Web フォントの読み込み量を見出しに集中させている
- **`h1` の指定が `"Noto Sans JP"` 単独でフォールバックを持たない**のは実装上の弱点。**再現時は `"Noto Sans JP", sans-serif` と generic family を必ず足す**
- 游ゴシックスタックは **`游ゴシック体`（日本語名）→ `YuGothic`（英語名）→ `游ゴシック` → `"Yu Gothic"`** の 4 表記を並べる。Windows / macOS の名前差を吸収するための冗長化

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero (h1) | Noto Sans JP | **64px** | 700 | 83.2px (1.3) | **2.56px (0.04em)** | 「上場のための法人カード」 |
| Section (h2) | Noto Sans JP | **48px** | 700 | 72px (1.5) | normal | 白／黒セクションの主見出し |
| Section 小 (h2) | Noto Sans JP | 36px | 700 | 54px (1.5) | normal | 黒セクションの見出し |
| Case Title (h2) | 游ゴシック | 24px | 700 | 36px (1.5) | normal | 「株式会社SODA」 |
| Sub (h3) | 游ゴシック | 30px | 700 | 45px (1.5) | normal | 黒地・白文字 |
| Sub 細 (h3) | 游ゴシック | **36px** | **400** | 54px (1.5) | normal | 「日本最高レベルの利用先限定機能」。**大きいのに Regular** |
| Sub 細 (h3) | 游ゴシック | 30px | **400** | 67.5px (**2.25**) | normal | 「最大10億円の利用限度額」。**行間が極端に広い** |
| Feature (h4) | 游ゴシック | 24px | 700 | 42px (1.75) | normal | 黒地・白文字 |
| Label (h4) | 游ゴシック | 16px | 700 | 28px (1.75) | normal | 「課題」 |
| Lead | 游ゴシック | 30px | 700 | 45px (1.5) | normal | 「10万社を超す企業様が導入しています」 |
| Lead（小） | 游ゴシック | 24px | 700 | 36px (1.5) | normal | 「お申し込みから最短当日に…」 |
| Body | 游ゴシック | 16px | 400 | **28px (1.75)** | normal | 本文 |
| Body（既定） | 游ゴシック | 16px | 400 | 24px (1.5) | normal | `body` の既定値 |
| List | 游ゴシック | 24px / 18px | 400 | 1.5 | normal | ヒーローの箇条書き |
| CTA（追従） | Noto Sans JP | 24px | 400 | — | normal | 「資料ダウンロード」「お申し込み」 |
| CTA（ヒーロー） | Noto Sans JP | 20px | 400 | 20px (1.0) | normal | 「資料ダウンロード」 |
| Nav | 游ゴシック / Noto | 14.4px | 400 | 21.6px (1.5) | normal | ヘッダーナビ |
| Nav（モバイル） | 游ゴシック / Noto | 16px | 400 | 28px (1.75) | normal | ドロワー |
| Chip | 游ゴシック | 12px | 400 | 18px (1.5) | normal | 「高い限度額」「対応スピード」 |
| Step Label | **Inter** | 14px | 700 | 21px (1.5) | normal | `STEP01` |
| Caption | 游ゴシック | 12px | 400 | 18px (1.5) | normal | 注釈。色 `#9c9c9c` |

### 3.5 行間・字間

- **本文の行間**: **`1.75`**（16px / 28px）。`body` の既定は `1.5`（16px / 24px）だが、**記事的な本文ブロックは 1.75 に上げる**
- **見出しの行間**: **`1.5` で統一**（48px/72px、36px/54px、30px/45px、24px/36px）。**h1 だけ `1.3`**（64px/83.2px）
- **例外的に広い行間**: 「最大10億円の利用限度額」の h3 は **`2.25`**（30px/67.5px）。**1 行の見出しを縦方向に浮かせるための調整**
- **字間**: **`h1` の `0.04em`（2.56px）以外はすべて `normal`**

**ガイドライン**:
- **数字を大きく見せる見出しは weight 400 のまま拡大する**（36px / 400、30px / 400）。太らせずにサイズだけ上げるのが UPSIDER の作法
- 本文は必ず `line-height: 1.75`

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

- ヒーロー見出しは **`<br>` で改行位置を固定**（「上場のための / 法人カード」）
- 「電子帳簿保存法・インボイス制度対応」のような**中黒を含む長い専門語を途中で折らない**

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* サイト全体。palt を使わない */
```

- **`palt` を当てていない**。「最大10億円」「10万社」など**数字と和文の混植が多く、詰めると桁が読みにくくなる**ため

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary（オレンジのグラデーションピル）**
- Background: **`linear-gradient(90deg, #f5833e 0%, #fead48 100%)`**（**`background-image` で指定。`background-color` は透明のまま**）
- Text: `#ffffff`
- Border Radius: **ヘッダー `20px` / ヒーロー `30px` / 追従バー `100px`**
- Font: `"Noto Sans JP", sans-serif` / 16px（ヘッダー）・20px（ヒーロー）・24px（追従）/ Weight 400
- Shadow: ヒーロー `0 5px 15px rgb(203,203,203)` ／ 追従 `0 0 24px rgb(0,0,0)`

```css
.btn-primary {
  background-image: linear-gradient(90deg, #f5833e 0%, #fead48 100%);
  color: #fff;
  border-radius: 30px;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 20px;
  font-weight: 400;
  box-shadow: 0 5px 15px rgb(203, 203, 203);
}
```

**Secondary（白 ＋ 極薄の罫）**
- Background: `#ffffff`
- Text: **`#1f2937`**
- Border: **`1px solid rgba(0,0,0,0.12)`**
- Border Radius: **`20px`**
- Font Size: 16px（ヘッダー）／14.4px（ナビ）
- 例: 「お問い合わせ」

**Tertiary（白 ＋ 影のみ・罫なし）**
- Background: `#ffffff`
- Text: `#1f2937` / `#27272a`
- Border: **なし**
- Border Radius: **`30px`（ヒーロー）／ `100px`（追従・一覧）**
- Shadow: **`0 5px 15px rgb(203,203,203)`** ／ 一覧ボタンは `0 4px 24px rgb(203,203,203)`
- 例: 「資料ダウンロード」「すべて見る」「もっと見る」

**Chip（灰のピル）**
- Background: **`#6b6b6b`**
- Text: `#ffffff`
- Padding: **`4px 16px`**
- Border Radius: **`100px`**
- Font Size: 12px / Weight 400
- 例: 「高い限度額」「対応スピード」

**Carousel Dot**
- Background: 非アクティブ `#9c9c9c` ／ アクティブ **`#373737`**
- Border Radius: **`50%`**

### Inputs

- Background: `transparent`
- Border: **なし**（`0px none`）
- Border Radius: `0px`
- Padding: `12.5px 16px 12.5px 0`
- Font Size: 14–16px
- **枠線を持たず、下線または面の切り替えだけで入力欄を示す**

### Cards

- Background: `#ffffff`
- Border: なし
- Border Radius: **`0px`**（比較セクションのカード）
- 面: **`#f3f3f3`**
- Shadow: `none`（**カードには影を落とさない。影はボタン専用**）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 4px | チップの上下 |
| S | 16px | チップの左右 |
| M | 24px | ブロック間 |
| L | 64px | セクション内の要素間 |
| XL | 120px | セクション間 |
| XXL | **160px** | **黒セクションの上下 padding** |

### Container

- Max Width: **1200px**（ヒーローは 1440px 幅で左右に 144px の余白）
- Padding (horizontal): 16px（`header.px-4`）

### Grid

- ヒーロー: **左テキスト / 右ビジュアルの 2 分割**
- 導入ロゴ: 横スクロールの帯（2 段）
- 比較セクション: 課題 / 解決の 2 カラム

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **カード・セクション（既定）** |
| 1 | **`0 5px 15px rgb(203,203,203)`** | ヒーローの CTA ボタン |
| 2 | **`0 4px 24px rgb(203,203,203)`** | 「すべて見る」「もっと見る」 |
| 3 | **`0 0 24px rgb(0,0,0)`** | **追従 CTA バー**（黒の全周影） |

**影は不透明な灰 `rgb(203,203,203)` で落とす**（`rgba` ではない）。**影を持つのはボタンだけ**で、カードやセクションには一切落とさない。

---

## 7. Do's and Don'ts

### Do（推奨）

- **主 CTA は `background-image: linear-gradient(90deg, #f5833e 0%, #fead48 100%)` のピル**。単色オレンジで塗らない
- **有彩色は CTA だけに使う**。それ以外は白・黒・灰で組む
- **見出し・CTA ラベルは `"Noto Sans JP", sans-serif`、本文は游ゴシック先頭のシステムスタック**という 2 本立てを守る
- **見出しの `line-height` は 1.5、本文は 1.75**
- **数字を大きく見せる見出しは weight 400 のまま拡大する**（36px / 400）
- **黒セクションは `linear-gradient(108.58deg, #000 0 49.99%, #1f1f1f 49.99% 100%)` で斜めに割る**。上下 padding は 160px
- **影はボタンだけに落とす**。`rgb(203,203,203)` の不透明な灰を使う
- アウトラインボタンの罫は **`1px solid rgba(0,0,0,0.12)`**

### Don't（禁止）

- **`background-color` でオレンジを塗らない**。UPSIDER の CTA は `background-image` で塗られており、`background-color` は透明のまま
- **`h1` に `"Noto Sans JP"` 単独を指定しない**（実サイトはそうなっているが、generic family を必ず足す）
- **カードやセクションに影を落とさない**。影はボタン専用
- **オレンジ以外の有彩色を足さない**。青・緑・赤は一切登場しない
- **`font-feature-settings: "palt"` を当てない**（数字の桁が読みにくくなる）
- **黒セクションをベタ塗りの `#000000` にしない**。`#000` と `#1f1f1f` の 2 枚を斜めに切り替える
- **見出しに `letter-spacing` を当てない**（h1 の `0.04em` のみ例外）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。ナビは `nav.mobile-menu` のドロワーに畳む |
| Tablet | 768–1023px | ヒーローを縦積みに |
| Desktop | ≥ 1024px | ヒーロー 2 分割 ＋ ヘッダーナビ展開 |

### タッチターゲット

- 最小 44px × 44px。**追従 CTA バーは行高 84px** で確保
- **チップ（12px / padding 4px 16px）はタップ対象にしない**

### フォントサイズの調整

- h1: 64px → **32px**（`letter-spacing: 0.04em` は維持）
- h2: 48px → **24px**
- h3: 36px → **20px**
- 本文 16px は据え置き（`line-height: 1.75` も維持）
- **黒セクションの上下 padding 160px → 64px**
- ナビ 14.4px → **16px**（モバイルのドロワーでは大きくする）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary CTA:  linear-gradient(90deg, #f5833e 0%, #fead48 100%)  /* background-image で塗る */
Text Color:   #1f1f1f   /* リンク・ボタンラベルは #1f2937 */
Background:   #ffffff
Surface:      #f3f3f3
Dark Section: linear-gradient(108.58deg, #000 0 49.99%, #1f1f1f 49.99% 100%)
Chip:         #6b6b6b（白文字・radius 100px・padding 4px 16px）
Caption:      #9c9c9c
Border:       1px solid rgba(0,0,0,0.12)
Shadow:       0 5px 15px rgb(203,203,203)   /* ボタンのみ */
Font (見出し): "Noto Sans JP", sans-serif
Font (本文):  游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", "ヒラギノ角ゴ ProN W3",
              "Hiragino Kaku Gothic ProN", Arial, メイリオ, Meiryo, sans-serif
Body Size:    16px / 400 / line-height 1.75
Heading LH:   1.5（h1 のみ 1.3 ＋ letter-spacing 0.04em）
Radius:       20px / 30px / 100px（すべてピル）
```

### プロンプト例

```
UPSIDER のデザインシステムに従って、料金プランのセクションを作成してください。

- 地は #ffffff。比較ブロックだけ #f3f3f3 の面を敷く
- セクション見出しは "Noto Sans JP", sans-serif / 48px / 700 / line-height 1.5 / #1f1f1f
- 本文は 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", "ヒラギノ角ゴ ProN W3",
  "Hiragino Kaku Gothic ProN", Arial, メイリオ, Meiryo, sans-serif / 16px / 400 / line-height 1.75
- 金額は 36px / weight 400 のまま拡大する（太らせない）
- 主 CTA「お申し込み」は
  background-image: linear-gradient(90deg, #f5833e 0%, #fead48 100%)
  color: #fff / border-radius: 30px / "Noto Sans JP" 20px / 400
  box-shadow: 0 5px 15px rgb(203,203,203)
- 副 CTA「資料ダウンロード」は 白地 ＋ 罫なし ＋ 同じ影 ＋ radius 30px ＋ 文字 #1f2937
- 特徴チップは #6b6b6b の面 ＋ 白文字 12px ＋ radius 100px ＋ padding 4px 16px
- 訴求ブロックは linear-gradient(108.58deg, #000 0 49.99%, #1f1f1f 49.99% 100%) の
  黒セクションにして、上下 padding 160px、文字は白
- カードには影を落とさない（影はボタンだけ）
- オレンジ以外の有彩色は使わない
- font-feature-settings は normal のまま（palt を当てない）
```
