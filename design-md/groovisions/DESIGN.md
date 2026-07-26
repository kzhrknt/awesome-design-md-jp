# DESIGN.md — groovisions（グルーヴィジョンズ）

> groovisions（https://groovisions.com/）のデザイン仕様書。
> 1993年に京都で設立、1997年に東京へ拠点を移したデザインスタジオ。アバター／キャラクターシステム「chappie（チャッピー）」で知られ、グラフィック・モーション・Web・アートディレクションを横断する。
> 最大の特徴は **ブランドアクセント色を一切持たないモノクロ設計** と、**すべてを Helvetica Neue Light 一書体で組む徹底した均質さ**。本文色は黒ではなく **中間グレー `#9f9f9f`**、リンクのホバー・強調だけが **ニアブラック `#333333`** に沈む。色は作品サムネイルが担い、UI そのものは限りなく匿名で、体系的で、禁欲的。
> 実サイトの computed style 実測（2026-07-26 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **システマティックな中立性と抑制**。UI から表情を極限まで削ぎ落とし、白地・単一書体・単一の中間グレーだけで構成する。色・装飾・強弱で語らず、掲載される作品（サムネイル）に色を委ねる。表現的なブランディングの対極にある、匿名で体系的なデザイン言語
- **groovisions について**: グラフィックからモーション、Web、アートディレクションまでを横断するデザインスタジオ。自社サイトは作品集の器に徹し、器そのものは無色透明であろうとする。装飾を足すのではなく、引くことで洗練を得る
- **密度**: 低密度。余白を大きく取り、ヘアラインの罫と作品サムネイルのグリッドだけで画面を成立させる。文字は少なく、静か
- **キーワード**: モノクロ、Helvetica Neue Light、中間グレー #9f9f9f、ニアブラック #333333、アクセント色なし、匿名性、体系性、余白、ヘアライン、weight 400 のみ
- **特徴**:
  - **ブランドアクセント色が存在しない**。ページ背景は純白 `#ffffff`、文字は中間グレー `#9f9f9f`、ホバー・強調のみ `#333333`。彩度を持つ色は UI に一切登場しない
  - **すべてが Helvetica Neue Light（weight 400 の Light フェイス）一書体**。見出しも本文もナビもフッターも同じフォント・同じウェイト。和文は Hiragino Kaku Gothic Pro にフォールバック
  - **本文色に黒を使わない**。既定は `#9f9f9f` という、本文としては異例に明るいグレー。淡く、クリニカルで、主張しない
  - `font-feature-settings: normal`（**palt なし**）。字詰めもかけず、素の組みのまま置く
  - サイズ差もごく僅か（見出し 20px / 本文 16px / 注記 14px）で、階層は大きさより **色（グレー→ニアブラック）とレイアウト** で示す
  - letter-spacing は一貫して小さな正の値（約 0.02〜0.04em）。冷たく整った、機械的なリズムを作る

---

## 2. Color Palette & Roles

> 実測値。CSS Custom Properties は定義されていない（`customProperties` 空）。彩度を持つブランド色は存在せず、実質 **白・中間グレー・ニアブラックの3色** で全 UI が成立する。「純白の面 ＋ 中間グレー #9f9f9f の文字 ＋ ホバー・強調のニアブラック #333333」と捉える。

### Brand（ブランド）

- **本作は無彩色設計**。ブランドカラー／アクセントカラーは**意図的に存在しない**。色は掲載作品のサムネイルが担い、UI 側は無色を貫く。これが groovisions の設計思想そのもの

### Neutral（テキスト・面・罫）

- **Background** (`#ffffff`): ページ背景。html / body / header すべて純白
- **Text Primary** (`#9f9f9f`, rgb 159,159,159): **本文・見出し・ナビ・フッターの既定テキスト色**。黒ではなく中間グレーを本文に使う、この設計の核。淡く均質
- **Text Emphasis / Link Hover** (`#333333`, rgb 51,51,51): リンクのホバー・アクティブ、ロゴのアクティブ状態、サムネイルのオーバーレイに使うニアブラック。**唯一の「濃い」色**で、インタラクションと強調だけに現れる
- **Hairline / Border**（推奨 `#e5e5e5`〜`#eeeeee`）: 区切り線・入力欄の枠。実サイトは罫を極力細く淡く引く。中間グレーより明るいヘアラインを推奨

### Semantic（意味的な色）

- 実サイトに Success / Warning など**意味的な色は存在しない**（テキストリンクのみで面ボタンすら無い）
- **Danger**（推奨 `#c0392b` 前後）: フォームのエラー状態用に**このリポジトリが推測で追加**した色。実サイトには対応する実測値が無い。使う場合も彩度を抑え、モノクロ設計を壊さないこと

---

## 3. Typography Rules

> **Helvetica Neue Light 一書体・weight 400 のみ** で全階層を組む、極めて均質なタイポグラフィ。欧文優先スタックで、和文は Hiragino Kaku Gothic Pro にフォールバックする。サイズ差は小さく（20 / 16 / 14px）、階層は色とレイアウトが担う。**palt は使わない**。

### 3.1 和文フォント

- **ゴシック体**: Hiragino Kaku Gothic Pro（ヒラギノ角ゴ **Pro**。ProN ではない）。次いで `ＭＳ Ｐゴシック`。和文専用の Web フォントは読み込まず、OS 標準のヒラギノにフォールバックさせる
- 明朝体は使わない

### 3.2 欧文フォント

- **サンセリフ**: Helvetica Neue Light（`HelveticaNeue-Light` / `"Helvetica Neue Light"`）を先頭に、`"Helvetica Neue"` → Helvetica → Arial の順でフォールバック。**Light フェイスを明示指定**するのが特徴
- セリフ・等幅は使わない

### 3.3 font-family 指定

```css
/* 全要素共通（欧文優先スタック・Light フェイス指定） */
font-family: HelveticaNeue-Light, "Helvetica Neue Light", "Helvetica Neue",
  Helvetica, Arial, "Hiragino Kaku Gothic Pro", "ＭＳ Ｐゴシック", sans-serif;
```

**フォールバックの考え方**:
- 先頭で `HelveticaNeue-Light` という **Light フェイスを直接指定**し、細く軽い印象を担保する
- 欧文グリフは Helvetica Neue が、和文グリフは Hiragino Kaku Gothic Pro が担う（欧文優先）
- Light フェイスが無い環境では通常の Helvetica Neue → Helvetica → Arial に落とす
- 末尾は必ず `sans-serif`

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Logo (h1) | Helvetica Neue Light | 20px | 400 | 1.8 (36px) | 0.02em (0.4px) | "groovisions" ロゴ |
| Nav | Helvetica Neue Light | 20px | 400 | 1.8 (36px) | 0.04em (0.8px) | "works" 等のグローバルナビ |
| Nav (small) | Helvetica Neue Light | 16px | 400 | 1.5 (24px) | 0.04em (0.64px) | ナビ内の補助リンク |
| Body | Helvetica Neue Light | 16px | 400 | 1.5 (24px) | normal〜0.04em | 本文 |
| List item | Helvetica Neue Light | 20px | 400 | 1.5 (30px) | normal | 作品リスト・"#chappie" 等 |
| Caption / Footer | Helvetica Neue Light | 14px | 400 | 2.0 (28px) | 0.04em (0.56px) | "© 2026 groovisions" 等 |

- **ウェイトは全階層 400（Light フェイス）で固定**。太字による強調は使わない。階層はサイズ（20 / 16 / 14px）と色（グレー→ニアブラック）で作る

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.5**（16px→24px）。注記・フッターは **2.0**（14px→28px）とさらに広く、ゆったり静かに置く
- **見出し・ロゴ・ナビの行間**: **1.8**（20px→36px）。作品リストは 1.5（20px→30px）
- **本文の字間 (letter-spacing)**: 小さな正の値、**約 0.04em**（16px 基準で 0.64px）。詰めず、わずかに開いた機械的なリズム
- **ロゴの字間**: **0.02em**（0.4px）。ナビ・フッターは **0.04em** とやや広め

**ガイドライン**:
- letter-spacing は一貫して **+0.02〜0.04em の小さな正の値**。マイナス詰めは使わない（冷たく整った印象を維持する）
- 日本語本文は line-height 1.5 以上。注記系は 2.0 まで広げてよい
- ウェイトを増やして強調しない。強調は色（`#9f9f9f` → `#333333`）で行う

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を使わない */
```

- **palt は使わない**（実測 `font-feature-settings: normal`）。字詰めをかけず、素の組みのまま置くのが groovisions の流儀
- kern も明示的には有効化しない。均質さを優先する

### 3.8 縦書き

- 該当なし。すべて横組み
- 用いる場合は `writing-mode: vertical-rl; text-orientation: mixed;`

---

## 4. Component Stylings

### Buttons

> **実サイトに面ボタン（塗りの CTA）は存在しない**。導線はすべて Helvetica Neue Light のプレーンなテキストリンクで、既定 `#9f9f9f` → ホバー `#333333` に沈むだけ。以下は preview 用に、モノクロ設計を壊さない範囲で**このリポジトリが設計した抑制的なボタン**。実装時はまずテキストリンクを検討すること。

**Text Link（実サイトの基本形）**
- Background: `transparent`
- Text: `#9f9f9f` → hover `#333333`
- 装飾・下線・面色なし。色の変化だけでインタラクションを示す

**Primary（ニアブラック面・preview 用）**
- Background: `#333333`
- Text: `#ffffff`
- Padding: `14px 24px`
- Border Radius: `2px`（ほぼ角のまま。丸めない）
- Font: Helvetica Neue Light, weight 400, letter-spacing 0.04em

**Secondary（細罫アウトライン・preview 用）**
- Background: `transparent`
- Text: `#9f9f9f` → hover `#333333`
- Border: `1px solid #cccccc` → hover `1px solid #333333`
- Padding: `14px 24px`
- Border Radius: `2px`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #e5e5e5`（ヘアライン）
- Border (focus): `1px solid #333333`（彩度を持つフォーカスリングは使わない）
- Border Radius: `2px`
- Padding: `12px 14px`
- Font: Helvetica Neue Light, 16px
- Text Color: `#333333` / Placeholder: `#9f9f9f`

### Cards

- Background: `#ffffff`
- Border: なし／必要時 `1px solid #eeeeee` のヘアライン
- Border Radius: `0`（角丸を使わず、四角い作品サムネイルをそのまま置く）
- Padding: `0`（画像は罫まで一杯に。テキストは下に余白を取って添える）
- Shadow: なし（フラット）
- 作品サムネイルを大きく置き、下に作品名・種別（グレー）を小さく添える。ホバーで `#333333` のオーバーレイが乗る

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 40px |
| XL | 64px |
| XXL | 96px |

余白を大きく取り、ヘアラインの罫と作品グリッドだけで構成する。セクション間は XL〜XXL。

### Container

- Max Width: 1200px 目安（作品グリッドは全幅に近づける）
- Padding (horizontal): 24〜40px

### Grid

- Columns: 12（実運用は作品サムネイルの 2〜4 カラムグリッド）
- Gutter: 16〜24px
- サムネイルは正方形〜横位置で均等に敷き詰め、色は作品側に委ねる

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼ全ての要素がフラット |
| 1 | `0 1px 3px rgba(0,0,0,0.06)` | ドロップダウン等（最小限） |
| 2 | `0 4px 12px rgba(0,0,0,0.08)` | モーダル・ポップオーバー |

- 奥行きはほとんど使わない。面はフラットに、区切りは**影ではなくヘアライン罫**で示すのが groovisions の流儀

---

## 7. Do's and Don'ts

### Do（推奨）

- UI は白 `#ffffff`・中間グレー `#9f9f9f`・ニアブラック `#333333` の3色で完結させる
- 文字はすべて Helvetica Neue Light（`HelveticaNeue-Light` を先頭に指定）・weight 400 で組む
- 本文色は黒ではなく中間グレー `#9f9f9f` を既定にする
- 強調・インタラクションは色（`#9f9f9f` → `#333333`）で示し、太字を使わない
- letter-spacing は +0.02〜0.04em の小さな正の値で統一する
- 区切りは影ではなくヘアライン罫で引き、面はフラットに保つ
- 色は掲載作品のサムネイルに委ね、UI そのものは無色を貫く

### Don't（禁止）

- 彩度を持つアクセント色を UI に足さない（モノクロ設計がブランドの核）
- 本文に純黒 `#000000` を使わない（既定は `#9f9f9f`、濃くしても `#333333` まで）
- 見出しをウェイトで強調しない（全階層 weight 400。強調は色とサイズで）
- palt をかけない（`font-feature-settings: normal` を維持する）
- letter-spacing をマイナスに詰めない（冷たく整ったリズムが崩れる）
- 角丸・影を多用しない（角はほぼ立てたまま、面はフラット）
- 塗りの派手な CTA ボタンを安易に置かない（基本はテキストリンク）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1〜2 カラム。ナビは折り畳み |
| Tablet | 768–1024px | 2〜3 カラムの作品グリッド |
| Desktop | > 1024px | 3〜4 カラムの作品グリッド |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。テキストリンクは padding で十分な当たり判定を確保する

### フォントサイズの調整

- モバイルでも本文 16px を維持（サイズ差が小さい設計なので縮小は最小限）
- ロゴ・ナビ 20px はモバイルで 18px 程度まで。行間・字間はそのまま保つ

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Accent:   なし（意図的にモノクロ。色は作品サムネイルが担う）
Background:      #ffffff
Text Primary:   #9f9f9f   （本文・見出し・ナビの既定。黒ではなく中間グレー）
Text Emphasis:  #333333   （リンクホバー・強調・サムネイルオーバーレイ）
Hairline:       #e5e5e5 前後（区切り罫・入力枠）
Font:           HelveticaNeue-Light, "Helvetica Neue Light", "Helvetica Neue",
                Helvetica, Arial, "Hiragino Kaku Gothic Pro", sans-serif
Weight:         400 のみ（全階層。太字強調なし）
Body Size:      16px
Line Height:    1.5（本文）／ 1.8（ロゴ・ナビ）／ 2.0（注記・フッター）
Letter Spacing: 0.02〜0.04em（小さな正の値で統一）
Feature:        palt なし（font-feature-settings: normal）
Buttons:        基本はテキストリンク。面が要る場合のみ #333333 / 細罫、radius 2px
```

### プロンプト例

```
groovisions（グルーヴィジョンズ）のデザインシステムに従って、作品一覧ページを作成してください。
- 配色はモノクロ厳守。背景 #ffffff、文字は中間グレー #9f9f9f、ホバー・強調のみ #333333。彩度を持つアクセント色は一切追加しない
- フォントは HelveticaNeue-Light を先頭にした欧文優先スタック、全要素 weight 400（太字を使わない）
- 本文 16px・行間 1.5・letter-spacing 0.04em。ロゴ・ナビは 20px・行間 1.8。注記・フッターは 14px・行間 2.0
- palt は使わない（font-feature-settings: normal）
- 区切りは影ではなくヘアライン罫（#e5e5e5 前後）。カードは角丸なし・フラット
- ボタンは基本テキストリンク（#9f9f9f → hover #333333）。面が必要なら #333333 の塗りか細罫アウトライン、radius 2px に留める
- 色は作品サムネイルに委ね、UI 自体は無色・匿名・体系的に保つ
```
