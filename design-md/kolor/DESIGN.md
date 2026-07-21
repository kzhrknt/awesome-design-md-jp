# DESIGN.md — kolor（カラー）

> kolor 公式オンラインストア（https://kolor.jp/）のデザイン仕様書。
> デザイナー・阿部潤一による前衛的日本メンズウェア／レディースウェアブランド。
> 素材の意外な組み合わせと構築的なテーラリングで国内外から高く評価される。
> 実サイトの computed style 実測（2026-07-21 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **ディープネイビー（#283249）を基調に、白と無彩色グレーで組み上げる建築的・スイス的なモノトーン**。角丸を排した直線的な矩形（radius 0）と、写真グリッドの余白でブランドの前衛性を静かに主張する。差し色は「Limited」バッジの**イエロー（#fbc02d）ただ一点**
- **密度**: 情報密度は低〜中。商品写真（グレー面 #e5e5e5 のプレースホルダ）を主役に、テキストは小さめ・簡潔。EC としての機能情報（価格・ラベル）はネイビーで端正にまとめる
- **キーワード**: ネイビーモノクローム、スイス・グロテスク、建築的、前衛、直線（radius 0）、イエローの一点差し、余白グリッド、palt 字詰め
- **特徴**:
  - **単色ブランド** — ネイビー #283249 が「ヒーロー背景・見出し・リンク・CTA の枠線・塗り CTA」のすべてを兼ねる。白地にネイビー、ネイビー地に白の 2 パターンで画面を構成
  - **イエローは唯一の差し色** — `Limited` バッジ（#fbc02d 地 + ネイビー文字）だけに使われる鋭いハイライト。出現回数はサイト全体でごく僅か
  - **radius 0 の直線設計** — 主要ボタン・ラベル・バッジは角丸なし。小さな UI（言語切替チップ・カート系）のみ radius 3〜4px を例外的に使用
  - **欧文は LTUnivers（Linotype Univers）** — クラシックなスイス・グロテスク。和文は Hiragino / メイリオ系にフォールバック
  - **palt が全体適用** — LTUnivers スタックには `font-feature-settings: "palt"` が本文・見出しともにかかる（後述 3.7）
  - **本文はグレー #666666・見出しはネイビー #283249** と色で階層を分離。純黒は本文に使わない
  - **本文 line-height は 1.4** と、和文サイトとしてはやや詰まった端正な組み。ゆったりさより「構築感」を優先

---

## 2. Color Palette & Roles

> 実サイトの computed style 実測値。すべて hex 表記（rgb → hex 変換済み）。

### Brand（ブランドカラー）

- **kolor Navy** (`#283249`): ブランドの支配色（rgb(40, 50, 73)）。**ヒーロー背景・見出し・リンク・価格・CTA の塗り／枠線**すべてに使う濃紺。白文字との組み合わせが基本
- **Limited Yellow** (`#fbc02d`): 唯一の差し色（rgb(251, 192, 45)）。**「Limited」バッジ専用**。ネイビー文字を乗せる。多用しないことでブランドの鋭さを保つ

### Neutral（ニュートラル）

- **Text Body** (`#666666`): 本文テキスト（rgb(102, 102, 102)）。body の既定色
- **Text Input** (`#222222`): 検索入力欄の入力文字（rgb(34, 34, 34)）
- **Product Gray** (`#e5e5e5`): 商品タイル／画像プレースホルダの面色（rgb(229, 229, 229)）。トップページで最頻出。※コレクション一覧では **#e7e7e7**（rgb(231, 231, 231)）とごく僅かに異なる
- **Chip Gray** (`#f3f3f6`): 言語・通貨切替チップの面色（rgb(243, 243, 246)。「JA」「JPY」）
- **Field Gray** (`#f1f1f1`): 一部入力欄の面色（rgb(241, 241, 241)）
- **Border** (`#e0e0e0`): 入力欄の細罫線（rgb(224, 224, 224)）

### Surface（背景）

- **Page White** (`#ffffff`): ページ本体の背景（白）。コレクション一覧・商品グリッドの地
- **Hero Navy** (`#283249`): ヒーロー／お知らせバー／サイトマップ等、ネイビー面の背景

### Text on Dark（暗色面上の文字）

- **Inverse Text** (`#ffffff`): ネイビー面上の見出し・ナビ・お知らせ文字
- **Overlay** (`rgba(18, 17, 39, 0.72)`): 翻訳切替オーバーレイの半透過ネイビー（#121127 @ 72%）。補助的

> **Note**: kolor のパレットは **「ネイビー単色 + イエロー一点」**。`#283249` の濃紺で構造を作り、白と数種のグレーで面を分け、`#fbc02d` は Limited バッジにのみ許す。**多色を持ち込まず、直線と余白で前衛性を語る引き算のパレット**。

---

## 3. Typography Rules

### 3.1 和文フォント

**ゴシック体（フォールバックスタック）**:
- ヒラギノ角ゴ系（実サイトでは `MyHiragino` として指定 → ヒラギノ角ゴ ProN 相当）
- メイリオ（Windows 向け）
- 明朝体は未使用（ゴシック一本）

### 3.2 欧文フォント

- **LTUnivers（Linotype Univers）** — 本文・見出し・UI すべてのメイン欧文。クラシックなスイス・グロテスク（サンセリフ）
- `AppleSystem` / `MySansSerif` を中間フォールバックに挟む独自スタック
- ボタン・一部入力欄のみ `sans-serif`（システム依存、palt なし）

### 3.3 font-family 指定

実サイトの宣言（`MySansSerif` `MyHiragino` は kolor の内部エイリアス）:

```css
/* 本文・見出し・UI（最も多用） */
font-family: LTUnivers, AppleSystem, MySansSerif, MyHiragino, メイリオ, sans-serif;

/* 一部のボタン・翻訳 UI（palt なし・システム依存） */
font-family: sans-serif;
```

**再現用に展開したチェーン（推奨）**:

```css
font-family: "LTUnivers", "Helvetica Neue", Arial,
             "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3",
             メイリオ, Meiryo, sans-serif;
```

**フォールバックの考え方**:
- **欧文先頭**（LTUnivers → システム sans）で欧文グリフの質感を優先
- 和文は ヒラギノ → メイリオ の順で OS にフォールバック
- **LTUnivers は商用ライセンス（Linotype）** — Web では自社配信。ローカル代替が必要（後述 preview 注記）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | Color | 用途 / `_context` |
|------|------|------|--------|-------------|----------------|-------|------|
| Store Title (h1) | LTUnivers | 32px | 400 | 32px (1.0) | normal | #666666 | ストアロゴ／最上位（header） |
| Hero Heading (h2) | LTUnivers | 24px | 700 | 24px (1.0) | normal | #ffffff | 「2026 AUTUMN/WINTER」ネイビー地に白（header hero） |
| Section Title (h2) | LTUnivers | 24px | 700 | 33.6px (1.4) | normal | #283249 | 「kolor BEACON」等（main.p-top） |
| Collection Label (h2) | LTUnivers | 22px | 400 | 30.8px (1.4) | normal | #283249 | 「Accessories」等（section.content） |
| Nav Label (a) | LTUnivers | 16px | 700 | 22.4px (1.4) | normal | #283249 | 「MEN / WOMEN」（nav.full） |
| Sitemap (h4) | LTUnivers | 16px | 700 | 16px (1.0) | normal | #ffffff / #283249 | サイトマップ見出し（nav.p-ui--sitemap） |
| Body | LTUnivers | 16px | 400 | 22.4px (1.4) | normal | #666666 | 本文（body 既定） |
| Sub Nav (a) | LTUnivers | 15px | 400 | 21px (1.4) | normal | #283249 | 「2026AW - MEN」（nav.full） |
| Announcement (a) | LTUnivers | 14px | 400 | 21px (1.5) | normal | #ffffff | お知らせバー、ネイビー地（announcement） |
| View All (a) | LTUnivers | 13px | 400 | 19.5px (1.5) | 1.04px (0.08em) | #283249 | 「すべての検索結果を見る」（header 検索） |
| Product Title (h2) | LTUnivers | 12px | 700 | 15.6px (1.3) | normal | #283249 | 品番タイトル（main.p-top） |
| Price (p) | LTUnivers | 12px | 400 | 18px (1.5) | normal | #283249 | 「¥26,400」（main.p-top） |
| Brand (h3) | LTUnivers | 12px | 400 | 18px (1.5) | normal | #666666 | 「kolor BEACON」ブランド名（main.p-top） |
| Footer Heading (h5) | LTUnivers | 10px | 400 | 14px (1.4) | normal | #ffffff / #283249 | 「NEWS LETTER」（footer） |
| Sitemap Link (a) | LTUnivers | 10px | 400 | 20px (2.0) | normal | #ffffff | 「All Items」（nav.p-ui--sitemap） |

> **`_context` の使い分け**: 同じ h2 でも、`header hero` の 24px/700 は**白・ネイビー地**、`main.p-top` の 24px/700 は**ネイビー・白地**、`section.content` の 22px/400 は**ネイビー・白地**と役割が違う。h4/h5 も nav 内では白（ネイビー地）とネイビー（白地）の 2 バリエーションが併存する。

### 3.5 行間・字間

- **本文 line-height**: `1.4`（22.4px / 16px）。和文サイトとしては詰め気味で、端正・構築的な印象を作る
- **見出し line-height**: `1.0`（ロゴ・ヒーロー）〜 `1.4`（セクション見出し）
- **letter-spacing**: 基本 `normal`。例外は「すべての検索結果を見る」リンクの **1.04px（13px で約 0.08em）** のみ。ブランド全体として字間を広げず、palt に字詰めを委ねる
- **意図**: 字間で「呼吸」させる AURALEE 系とは逆に、kolor は **line-height を締め、palt で詰める**ことで直線的・建築的なリズムを作る

### 3.6 禁則処理・改行ルール

```css
/* 推奨（EC の商品名・品番の折り返し対策） */
overflow-wrap: break-word;
line-break: strict;
```

- 品番（例: `26SBM-T14237S-08`）など長い英数字トークンがあるため `overflow-wrap: break-word` を推奨
- 和文の禁則はブラウザ既定に委ねる（特殊指定なし）

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* LTUnivers スタック全体に適用 */
```

- **palt は全体適用** — body・h1〜h5・p・a・span・nav・header・footer と、**LTUnivers を使う要素すべて**で `font-feature-settings: "palt"` が有効（実測で `ff-set="palt"` を確認）。**見出しだけでなく本文にもかかる**点が kolor の特徴
- **例外**: `sans-serif` 指定のボタン・翻訳 UI と、アイコンフォント（icomoon, `"liga"`）は palt 対象外（`ff-set=normal` / `"liga"`）
- palt により和欧混植でも字間が自動で詰まり、詰まった line-height と相まって構築的な密度が出る

### 3.8 縦書き

- 通常コンテンツでは未使用

---

## 4. Component Stylings

> radius は原則 **0px**（直線）。小さな補助 UI のみ 3〜4px。

### Buttons

#### Primary — Filled Navy（塗り CTA）
- 背景: `#283249`
- 文字色: `#ffffff`
- padding: `16px 30px`（小型は `8px 15px`）
- border-radius: **0px**
- font-size: 14px / font-weight: 400
- border: なし

#### Secondary — Outlined Navy（枠線 CTA）
- 背景: `#ffffff`
- 文字色: `#283249`
- border: `1px solid #283249`
- padding: `10px 18px`
- border-radius: **0px**
- font-size: 13px / font-weight: 400

#### Text Button — Bold Link（全幅リンク型）
- 背景: `#ffffff` または `#283249`
- 文字色: `#283249`（白地）／`#ffffff`（ネイビー地）
- padding: `14px 0 12.25px`
- border-radius: 0px
- font-size: 16px / font-weight: **700**

### Badges / Labels

#### Limited Badge（差し色）
- 背景: `#fbc02d`
- 文字色: `#283249`
- padding: `6px 12px 3px`
- border-radius: 0px
- font-size: 8px / font-weight: 700

#### Navy Badge
- 背景: `#283249`
- 文字色: `#ffffff`
- padding: `6px 12px 3px`
- border-radius: 0px
- font-size: 8px / font-weight: 700

#### Chip（言語・通貨切替）
- 背景: `#f3f3f6`
- 文字色: `#283249`（または `#000000`）
- padding: `5px 7.5px`
- border-radius: **3px**（例外的に角丸）
- font-size: 10px / font-weight: 400

### Inputs

- 背景: 透過 または `#f1f1f1`
- border: `1px solid #e0e0e0`
- border-radius: 4px（検索チップは 3px）
- padding: `8px 10px`
- font-size: 14〜16px / font-weight: 400
- 文字色: `#222222`
- ※検索入力（`ls-input`）は透過背景・radius 0

### Cards（商品カード）

- 背景: 透過（画像が主役）
- 画像プレースホルダ面: `#e5e5e5`（一覧では `#e7e7e7`）
- border: なし
- border-radius: **0px**
- 影: なし（フラット）
- 下部にネイビーのブランド名 12px / 品番 12px/700 / 価格 12px の 3 段組

---

## 5. Layout Principles

### Spacing Scale（実測から推定）

| Token | Value |
|-------|-------|
| XS | 6px |
| S | 12px |
| M | 18px |
| L | 30px |
| XL | 60px |
| XXL | 120px |

### Container

- 商品グリッドは白地にフルブリード気味。ヒーローはネイビーの全幅帯
- CTA padding は横 18〜30px を基準

### Grid

- 商品グリッド: 複数カラム（PC 3〜4 列）。グレー面のタイルを均等配置
- ヒーロー: ネイビー全幅 + 白見出し

---

## 6. Depth & Elevation

- **影は原則なし** — `box-shadow: none` のフラット設計。radius 0 の矩形と面色で構造を作る
- 段差は**影ではなく「ネイビー面 / 白面」のコントラスト**で表現する
- 罫線も控えめ（入力欄の `#e0e0e0` 程度）

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | ほぼすべての要素（フラット） |
| 1 | `0 1px 2px rgba(40,50,73,0.08)` | 必要な場合のドロップダウン程度（控えめに） |

---

## 7. Do's and Don'ts

### Do's

- **ネイビー #283249 を主役**にする（見出し・リンク・価格・CTA すべて）
- **白地ネイビー文字 / ネイビー地白文字** の 2 パターンで画面を構成する
- **イエロー #fbc02d は「Limited」バッジだけ**に使う（一点差し）
- **radius 0 の直線的な矩形**でボタン・ラベル・カードを作る
- **LTUnivers（またはグロテスク系代替）+ ヒラギノ/メイリオ** のチェーンを使う
- **palt を本文・見出しの両方に適用**する（`font-feature-settings: "palt"`）
- **本文グレー #666666・見出しネイビー #283249** と色で階層を分ける
- **本文 line-height 1.4** の端正な組みを保つ
- **影なし・フラット**を徹底する

### Don'ts

- **イエローを差し色以外に多用しない** — Limited バッジ専用の鋭さを守る
- **角丸を多用しない** — radius は原則 0。小チップの 3〜4px までが例外
- **本文に純黒 #000000 を使わない** — グレー #666666 が基本
- **line-height を広げすぎない** — 2.0 のようなゆったり組みは kolor の建築感を損なう
- **letter-spacing で無闇に広げない** — 字詰めは palt に委ね、基本 normal
- **多色を持ち込まない** — ネイビー + 白 + 数種のグレー + イエロー一点で完結させる
- **影で立体感を作らない** — 面のコントラストと直線で奥行きを出す

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | 縦積み・商品グリッド 2 列 |
| Tablet | ≤ 1024px | 商品グリッド 2〜3 列 |
| Desktop | > 1024px | 商品グリッド 3〜4 列 + ネイビー全幅ヒーロー |

### タッチターゲット

- CTA は padding 込みで最小 44px 高さを確保（塗り CTA の `16px 30px` で満たす）

### フォントサイズの調整

- 本文は PC/SP とも 16px 前後。見出しはモバイルでヒーロー 24px → 20px 程度に縮小
- palt はブレイクポイントに関わらず維持

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #283249   (kolor Navy — 見出し・リンク・CTA)
Accent Color:  #fbc02d   (Limited Yellow — バッジ専用の一点差し)
Text Color:    #666666   (本文グレー)
Background:    #ffffff   (白) / #283249 (ネイビー面)
Font: "LTUnivers", "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", メイリオ, sans-serif
Body Size: 16px
Line Height: 1.4
font-feature-settings: "palt"   (本文・見出しとも適用)
Border Radius: 0px（直線が基本）
```

### プロンプト例

```
kolor のデザインシステムに従って、商品一覧グリッドを作成してください。
- ブランドカラー: #283249（ネイビー）を見出し・価格・CTA に使う
- 差し色: #fbc02d（イエロー）は「Limited」バッジのみ
- 本文色: #666666、本文サイズ 16px / line-height 1.4
- フォント: LTUnivers 系グロテスク + ヒラギノ/メイリオ、font-feature-settings: "palt"
- ボタン: 塗りは #283249 地・白文字・padding 16px 30px・radius 0
          枠線は白地・ネイビー文字・1px solid #283249・padding 10px 18px・radius 0
- 商品タイルのプレースホルダ面: #e5e5e5、カードは影なし・radius 0
- 全体をネイビー + 白 + グレーのモノトーンでまとめ、角丸を使わない
```
