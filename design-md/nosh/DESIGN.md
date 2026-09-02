# DESIGN.md — nosh（ナッシュ）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-02 / 対象: `https://nosh.jp/`, `/menu`, `/chef`, `/login`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 生成りの白（`#fdfcfa`）を地に、**緑 `#63a351` 一色**で行動導線を通す。CTA は例外なく完全なピル（`border-radius: 9999px`）、カードは `8px` の角丸。料理写真を主役にして、UI は薄く引く
- **密度**: 情報量の多い商品一覧を、`8px` 角丸カードと 4px 基準の余白で整理する。B2C の EC でありながら業務 UI に近い密度
- **キーワード**: 緑、ピル、8px 角丸、生成り、4pxグリッド

**このサイトの核心は「CSS Custom Properties で設計されたトークン駆動の EC」であること。** 変数は **180個**、`--alias-color-*`（意味づけ層）と `--service-color-*`（サービス層）の2階層に分かれ、余白は `--service-size-0`〜`10`（4→256px）のスケールで管理されている。

**ただしトークンの宣言と実装がずれている箇所が複数ある**（2.4 / 3.5 参照）。**必ず実測値を採用すること。**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | トークン | 実測 |
|------|--------|----------|------|
| **Brand Green（実質の主色）** | **`#63a351`** | *（変数化されていない）* | **可視 70要素**。CTA の面、セクション見出し、ラベル、チップの文字 |
| Price Green | `#52a530` | `--service-color-primary` / `--alias-color-background-primary` | 可視 22要素。**割引価格の表示にしか出ない** |
| Focus Green | `#39bf00` | `--alias-color-border-primary-highlight` | 入力欄フォーカス時の枠のみ |
| Green Dark | `#3e8a1f` | `--service-color-primary-dark` | ホバー |
| Green Light | `#e2f3db` | `--service-color-primary-light` | 淡い面 |
| Green Pale | `#e1f0cc` | `--alias-color-background-accent-default` | アクセント面 |

> **トークンが `--service-color-primary: #52a530` と宣言しているが、実サイトの CTA・見出しは `#63a351`。** 変数どおりに実装すると、ボタンの緑が一段鮮やかにずれる。**主色として使うのは `#63a351`、`#52a530` は価格表示専用**と割り切ること。

### Sub Brand（サービス別の識別色）

- **nosh club** (`#1f3d06` / `--alias-color-noshClub-default`、文字 `#335f06`): 会員プログラム
- **nosh Gift** (`#0b7043` / `--alias-color-noshGift-default`)
- **Premium Menu** (`#94651b` 文字 / `#af9546` 枠 / `#fcf8f4` 面): プレミアムメニュー
- **Quick Delivery** (`#ffd24d` / `--alias-color-noshQuickDelivery-default`)

### Ranking（人気順バッジ）

| 順位 | 色 | トークン |
|------|-----|----------|
| 1位 | `#d4b932`（金） | `--alias-color-menuRanking-1-default` |
| 2位 | `#94a1a9`（銀） | `--alias-color-menuRanking-2-default` |
| 3位 | `#d29c4b`（銅） | `--alias-color-menuRanking-3-default` |
| 4位以下 | `#195c32`（深緑） | `--alias-color-menuRanking-default` |

### Semantic

- **Warning / Danger** (`#d80000` / `--alias-color-background-warning-default`)、淡色面 `#fae9eb`
- **Error** (`#e86767` / `--service-color-error`)、暗 `#e04949`、淡 `#ffe7e7`
- **Caution** (`#ffd24d`)、淡色面 `#fffff4`
- **Notice** (`#afcbd6`)、淡色面 `#fafbfc`
- **Sale** (`#ff4000`): 「初回¥1,500OFF」の赤橙。トークン化されていないが実装で使用
- **Star (rating)** (`#ffd937` / `--alias-color-menuStar-active-default`)

### Neutral（ニュートラル）

- **Text Primary** (`#333333` / `--alias-color-text-primary-default`): 本文。**実測 5,375 要素で圧倒的多数**
- **Text Rating** (`#2a2929` / `--alias-color-menuRating-text-default`): 評価まわりの数字（381要素）
- **Text Secondary** (`#818181` / `--service-color-text-secondary`)
- **Text Tertiary / Disabled** (`#bdbdbd` / `#cccccc`)
- **Placeholder** (`#999999`)
- **Background** (`#fdfcfa` / `--alias-color-background-tertiary-default`): **ページ背景。純白ではなくわずかに温かい生成り**
- **Surface** (`#ffffff`): カードの面
- **Surface Alt** (`#f5f7f8` / `--alias-color-background-secondary-default`)
- **Disable** (`#f1f1f1` / `--service-color-disable`): チップの面、無効状態
- **Border** (`#dddddd` / `--alias-color-border-primary-default`): カード・入力欄の枠
- **Border Secondary** (`#e1e1e1`) / **Border（service層）** (`#dedede`)

> **`--alias-color-border-primary-default: #ddd` と `--service-color-border-primary: #dedede` が併存**している。実装で使われているのは **`#dddddd`**（カード枠・入力欄）。

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP** のみ
- **明朝体**: `"Noto Serif JP", serif` の宣言は存在するが、トップ・メニュー・シェフの各ページで**実測ほぼゼロ**。恒常的な階層としては使わない

### 3.2 欧文フォント

- **サンセリフ**: **Roboto**
- **等幅 / セリフ**: 定義なし

### 3.3 font-family 指定 — 2本のスタックを使い分ける

```css
/* (A) 和文優先 — 文章・見出し・ナビ（既定） */
font-family: "Noto Sans JP", Roboto, sans-serif;

/* (B) 欧文優先 — 価格・数値・評価・英字見出し */
font-family: Roboto, "Noto Sans JP", sans-serif;
```

**このサイトは同じ2書体の「順序違い」を役割で切り替えている。**

- **(A) 和文優先**は本文・見出し・ナビ・ボタンラベルなど、和文が主の場面
- **(B) 欧文優先**は `¥1,500` `4.5` `100+` のような**数字が主の場面**（価格、評価、メニュー数、サイドバー）。Roboto の数字の字形を優先している
- **(B) の側だけ `letter-spacing` が `0.56px`（= 14px で 0.04em）** になる。トークン `--service-size-letterspacing-primary: 0.04em` はこちらに対応する

> **`body` は (B) 欧文優先**で宣言されているが、実際のテキストの大半は (A) を当てたクラスで組まれている。**どちらか一方に統一しないこと。**

**除外**: `Arial, "游ゴシック Medium", "Yu Gothic ", 游ゴシック体, YuGothic, …` という**レガシースタック**が一部の外部埋め込み（`aside.l-aside` 内のボタン）に出るが、これは別系統。設計には含めない。

### 3.4 文字サイズ・ウェイト階層

root の `font-size` は **10px**（`rem` で組むと 1.4rem = 14px）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | (B) Roboto先頭 | 56px | 700 | 1.0 (56px) | 0.3px | サイドバーの大数値 |
| Heading 1 | (A) | 40px | 700 | 1.7 (68px) | 0.3px | ヒーロー見出し |
| Heading 1 (site) | (A) | 28px | 500 | 1.8 (50.4px) | 0.3px | ロゴ／ページタイトル |
| Heading 2 | (A) | 28px | 700 | 1.5 (42px) | 0.3px | セクション見出し |
| Heading 2 (小) | (A) | 24px | 700 | 1.6 (38.4px) | 0.3px | サブセクション |
| Eyebrow | (A) | 16px | 700 | 1.8 (28.8px) | 0.3px | 見出しの上の緑ラベル |
| Heading 3 | (A) | 18px | 700 | 1.6 (28.8px) | 0.3px | カード見出し |
| Heading 4 | (A) | 16px | 700 | 1.0 (16px) | 0.3px | 小見出し |
| Lead | (A) | 16px | 500 | 1.6 (25.6px) | 0.3px | 導入文 |
| **Body** | (A) | **14px** | **500** | **1.8 (25.2px)** | **0.3px** | 本文（297要素） |
| **Card Text** | (A) | **14px** | 500 | **1.2 (16.8px)** | 0.3px | **カード内の詰まった行（最多 513要素）** |
| Body (compact) | (A) | 14px | 500 | 1.6 (22.4px) | 0.3px | 一覧内 |
| Caption | (A) | 12px | 500 | 1.6 (19.2px) | 0.3px | 補足（171要素） |
| Micro | (A) | 10px | 700 | 1.8 (18px) | 0.3px | 最小ラベル |

**ウェイトは 400 / 500 / 700 の3段。** `body` は 400 だが、**表示されるテキストの既定は 500**。

> **本文とカード内テキストで `line-height` が 1.8 と 1.2 に割れている。** 読ませる文章は 1.8、カード内の商品名や数値は 1.2 に詰める。**この2値の使い分けが nosh の組版の骨格**で、全部 1.8 にすると商品一覧が間延びする。

### 3.5 行間・字間

- **本文の行間**: **1.8**（14px / 25.2px）
- **カード内の行間**: **1.2**（14px / 16.8px）
- **見出しの行間**: 1.5〜1.7
- **字間**: **`0.3px` が実装の既定**（実測 1,118 要素）。14px なら 0.021em

#### 宣言 ≠ 実装（重要）

| トークン | 宣言 | 実測 |
|----------|------|------|
| `--service-size-lineheight-primary` | `1.7` | **本文は `1.8`**（14px/25.2px、16px/28.8px）。1.7 の実測はほぼ無い |
| `--service-size-letterspacing-primary` | `0.04em` | **既定は `0.3px`（≒0.021em）**。`0.04em`（= 0.56px）が出るのは (B) 欧文優先スタックの一部だけ（実測 1要素） |

> **変数を見て `line-height: 1.7` / `letter-spacing: 0.04em` で実装すると、行間も字間も実サイトより開く。** 実装値の `1.8` と `0.3px` を使うこと。

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

商品名が長い（「[8/21発売]たっぷり野菜と鯵の甘酢あん」）ため、**カード内は 2行でクランプ**する前提で `line-height: 1.2` を当てている。

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* 使用していない */
font-feature-settings: normal;
```

**`palt` は使っていない。** DOM 全走査 6,449 要素中、`font-feature-settings` が `normal` 以外の要素は **0件**。

字間は `letter-spacing: 0.3px` のベタ組みのみ。**`palt` を足すと商品名の字送りが変わり、カードの 2行クランプが崩れる。**

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**主 CTA は完全なピル。** ただし**実装のピル値が `9999px` と `1440px` で混在**している。**新規実装では `9999px` に統一する**（`--n-border-radius-max: 100vmax` も宣言されているが実測 0件）。

**Primary（塗りピル）**
- Background: `#63a351`
- Text: `#ffffff`
- Border: `1px solid #63a351`
- Padding: `16px 24px`（大）/ `8px 14px`（ヘッダー小）
- Border Radius: **`9999px`**
- Font Size: `16px` / Weight: `500`（ヘッダーは `700`）

**Secondary（白抜きピル）**
- Background: `#ffffff`
- Text: `#63a351`
- Border: `1px solid #63a351`
- Padding: `20px 0`（幅いっぱい）
- Border Radius: `9999px`
- Font Size: `18px` / Weight: `700`

**Ghost（透明ピル・フィルタ）**
- Background: `transparent`
- Text: `#63a351`
- Border: `1px solid #63a351`
- Padding: `8px 16px`
- Border Radius: `9999px`
- Font Size: `12px` / Weight: `400`

**On Photo（写真の上）**
- Background: `rgba(0, 0, 0, 0.5)`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Border Radius: `9999px`
- Font Size: `20px` / Weight: `700`

**Tab（カテゴリ切替）— ここだけピルではない**
- Active: 面 `#63a351` / 文字 `#ffffff`
- Inactive: 面 `#bdbdbd` / 文字 `#ffffff`
- Padding: `10px 15px` / Border Radius: **`5px`**
- Font Size: `16px` / Weight: `700`

### Badges / Chips

- **属性チップ**（「20代 女性」「自己投資」）: 面 `#f1f1f1` / 文字 `#63a351` / radius `4px` / padding `4px 8px` / 12px 500
- **数値チップ**（「1食あたり」）: 面 `#f1f1f1` / 文字 `#2a2929` / radius `9999px` / padding `8px 12px` / 12px 500
- **セールバッジ**: 面 `#ff4000` / 文字 `#ffffff` / radius `25px` / padding `3px 8px` / 12px 400
- **ランキングバッジ**: 面は順位色（金 `#d4b932` / 銀 `#94a1a9` / 銅 `#d29c4b` / 深緑 `#195c32`）/ radius **`0`** / padding `4px 8px` / 14px 500
- **プレミアム枠**: 面 `#ffffff` / 文字・枠 `#d29c4b` / radius `4px` / padding `8px`

### Cards

- Background: `#ffffff`
- Border: `1px solid #dddddd`
- Border Radius: **`8px`**（**実測 259要素で最頻。このサイトの角丸の基準値**）
- Shadow: なし
- 商品名: 14px / 400〜500 / `line-height: 1.2`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #dddddd`
- Border (focus): **`1px solid #39bf00`**（`--alias-color-border-primary-highlight`）
- Border Radius: `3px`
- Padding: `10px`
- Font Size: **`16px`**（iOS のズーム回避）
- Height: `40px`
- Placeholder: `#999999`
- Outline: `none`（枠色の変化だけでフォーカスを示す）

> **フォーカス時の緑 `#39bf00` は、CTA の緑 `#63a351` とも価格の緑 `#52a530` とも違う3つ目の緑。** 入力欄フォーカス専用として使い分ける。

---

## 5. Layout Principles

### Spacing Scale

`--service-size-0`〜`10` の **4px 基準の等比スケール**。余白はこの値から選ぶ。

| Token | Value |
|-------|-------|
| `--service-size-0` | 4px |
| `--service-size-1` | 8px |
| `--service-size-2` | 16px |
| `--service-size-3` | 24px |
| `--service-size-4` | 32px |
| `--service-size-5` | 48px |
| `--service-size-6` | 64px |
| `--service-size-7` | 96px |
| `--service-size-8` | 128px |
| `--service-size-9` | 192px |
| `--service-size-10` | 256px |

実測で頻出する `gap` は **6px（342件）/ 4px / 8px / 16px**。スケール外の 6px・2.5px はカード内の細かい詰めに使われている。

### Container

| 用途 | Max Width | トークン |
|------|-----------|----------|
| サイト全体 | **1280px** | — |
| ランディング／読み物 | **840px** | `--alias-size-lp-width-max-default` |
| マイページ | 1200px | `--alias-size-mypage-width-max-default` |
| 補助ブロック | 960px / 980px / 992px / 1024px | — |

### 固定要素の高さ（トークン化されている）

| 要素 | 高さ | トークン |
|------|------|----------|
| ヘッダー（LP） | 90px | `--n-c-header-height` |
| ヘッダー（アプリ内） | 70px | `--n-l-header-height` |
| 上部バナー | 50px | `--n-p-horizontal-banner-height` |
| パンくず | 45px | `--n-p-user-breadcrumb-height` |
| カート送信ボタン | 80px | `--n-c-button-cart-submit-height` |

`z-index` もトークン化されている（ヘッダー `999` / 追従 CTA `998`）。

### Grid

- 商品カード: 8px 角丸カードの等幅グリッド、gutter 16px
- カード内の細部: 6px / 4px の細かいギャップ

---

## 6. Depth & Elevation

**ほぼフラット。可視要素の `box-shadow` は 3件のみ。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・ボタン・ヘッダーすべて** |
| 1 | `0 4px 4px rgba(0,0,0,0.25)` | 追従 CTA など、ごく一部の浮く要素のみ |

**奥行きは影ではなく「生成りの地 `#fdfcfa` / 白いカード `#ffffff` / `1px #dddddd` の枠」で表現する。** カードに影を付けないこと。

---

## 7. Do's and Don'ts

### Do（推奨）

- **主色は実測値の `#63a351`** を使う（トークンの `#52a530` ではない）
- 主 CTA は必ず**完全なピル `border-radius: 9999px`**
- カードは **`border-radius: 8px` ＋ `1px solid #dddddd` ＋ 影なし**
- ページ背景は**生成り `#fdfcfa`**、カードの面が `#ffffff`。この2段で地と面を分ける
- 本文は `14px / 500 / line-height 1.8 / letter-spacing 0.3px`
- **カード内のテキストは `line-height: 1.2`** に詰める（本文と使い分ける）
- 数字が主のブロック（価格・評価・メニュー数）は **`Roboto, "Noto Sans JP", sans-serif` の欧文優先スタック**に切り替える
- 余白は `--service-size-*`（4px 基準）から選ぶ
- 入力欄の `font-size` は 16px（iOS のズーム回避）
- ランキング・プレミアム・nosh club などサービス別の識別色は、専用トークンの色を使う

### Don't（禁止）

- **トークンの `--service-color-primary: #52a530` を主色として実装しない。** CTA・見出しは `#63a351`
- **`--service-size-lineheight-primary: 1.7` / `--service-size-letterspacing-primary: 0.04em` をそのまま使わない。** 実装は `1.8` / `0.3px`
- 主 CTA の角丸を `8px` にしない（**ピルとカードで角丸を混同しない**）
- ピル値に `1440px` を新規で使わない（実装に混在しているが `9999px` に寄せる）
- **`font-feature-settings: "palt"` を足さない**（実測 0件。カードの行クランプが崩れる）
- カードに `box-shadow` を付けない
- ページ背景を純白 `#ffffff` にしない（`#fdfcfa`）
- **入力欄フォーカスの緑 `#39bf00` を CTA に使わない**（3つの緑を混ぜない）
- 本文テキストに `#000000` を使わない（`#333333`）
- `Arial, "游ゴシック Medium", …` のレガシースタックを真似ない（外部埋め込み由来）

---

## 8. Responsive Behavior

### Breakpoints

**`min-width` で書かれたモバイルファースト設計。** 実測の出現回数が突出しているのは 768px。

| Name | Width | 出現数 | 説明 |
|------|-------|--------|------|
| Mobile | < 481px | — | 既定（ベーススタイル） |
| Small | ≥ 481px | 95 | 小さな調整 |
| **Tablet** | **≥ 768px** | **1,628** | **主ブレークポイント。ここでレイアウトが総入れ替わる** |
| Desktop | ≥ 1024px | 257 | 2〜3カラム化 |
| Wide | ≥ 1180px | 162 | コンテナ 1280px に向けた調整 |
| Extra Wide | ≥ 1480px | 30 | 最大幅 |

補助的に `(max-width: 500px)`（55件）と `(any-hover: hover)`（61件）を使う。**`any-hover` でホバー演出をポインタ環境に限定**しているのは、タッチでのちらつきを避けるため。

### タッチターゲット

- 最小サイズ: 44px × 44px
- 入力欄の実測高さは 40px なので、**モバイルでは 44px 以上に広げる**
- ヘッダーの小ピル（padding `8px 14px`）はモバイルでは縦パディングを増やす

### フォントサイズの調整

- 本文 14px は維持
- 入力欄は 16px を下回らない
- Heading 1 の 40px は 24〜28px 程度まで縮める
- ヘッダー高さは 90px → 70px に切り替える（`--n-c-header-height` / `--n-l-header-height`）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:   #63a351   (実測値。トークンの #52a530 ではない)
Price Green:     #52a530   (割引価格の表示のみ)
Focus Green:     #39bf00   (入力欄フォーカスのみ)
Text Color:      #333333
Background:      #fdfcfa   (生成り)
Surface:         #ffffff
Border:          #dddddd
Font (和文優先): "Noto Sans JP", Roboto, sans-serif
Font (欧文優先): Roboto, "Noto Sans JP", sans-serif   ← 価格・数値
Root Size:       10px  (1.4rem = 14px)
Body Size:       14px / weight 500
Line Height:     1.8 (本文) / 1.2 (カード内)
Letter Spacing:  0.3px
Font Feature:    なし (palt を使わない)
Radius:          9999px (CTA ピル) / 8px (カード) / 4px (チップ) / 3px (入力欄)
Shadow:          none
Spacing:         4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px
Container:       1280px (全体) / 840px (LP)
Breakpoint:      768px (min-width / モバイルファースト)
```

### プロンプト例

```
nosh（ナッシュ）のデザインシステムに従って、メニュー一覧ページを作成してください。

- ページ背景は #fdfcfa（生成り）、カードの面は #ffffff
- カードは border-radius: 8px / border: 1px solid #dddddd / 影なし
- 主 CTA は面 #63a351・文字 #ffffff・border-radius: 9999px の完全なピル
  （padding 16px 24px / 16px / weight 500）
- 副 CTA は白背景 + 1px solid #63a351 + 緑文字の白抜きピル
- 本文は "Noto Sans JP", Roboto, sans-serif / 14px / 500 /
  line-height 1.8 / letter-spacing 0.3px / color #333333
- カード内の商品名は line-height 1.2 に詰めて 2行クランプ
- 価格・評価など数字が主の箇所だけ Roboto, "Noto Sans JP", sans-serif に切り替える
- 人気順バッジは 1位 #d4b932 / 2位 #94a1a9 / 3位 #d29c4b / 4位以下 #195c32、角丸なし
- 属性チップは面 #f1f1f1・文字 #63a351・border-radius 4px
- 余白は 4 / 8 / 16 / 24 / 32px のスケールから選ぶ
- font-feature-settings は指定しない
- モバイルファースト。min-width: 768px で 3カラムに切り替える
```
