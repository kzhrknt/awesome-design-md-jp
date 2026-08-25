# DESIGN.md — JRA 日本中央競馬会

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

> **参照元**: JRA 日本中央競馬会 公式ウェブサイト <https://www.jra.go.jp/> のトップページ構造
> **スタイル方針**: Modernism（Swiss / International Typographic Style）
> **実装スタック**: 静的 HTML + CSS / Tailwind CSS v4（`@theme` によるトークン定義）
> 実サイトは固定幅 PC レイアウト + 別ドメイン SP サイト（sp.jra.jp）という構成ですが、本仕様では **1 つのレスポンシブ実装に統合**します。観測値と本仕様が異なる場合は本仕様を優先してください。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 装飾を持たず、グリッド・タイポグラフィ・余白・1本の罫線だけで階層を作る。競馬という「数字とデータの競技」を、Swiss スタイルの規律で扱う
- **密度**: 情報密度が高い一覧型。競馬情報サイトの本質は一覧性であり、余白を増やす方向のリデザインは行わず、密度を保ったまま可読性で解く
- **キーワード**: Swiss, Grid-Driven, Rule-Only, Data-First, Restrained

**三原則**

1. **罫線は 1px、影は 0。** 面の分離は境界線と余白のみで行う
2. **色は意味のためだけに使う。** 緑 = JRA、赤 = GⅠ / 締切、黒 = 本文。装飾色は存在しない
3. **数字が主役。** オッズ・馬番・発走時刻は `tabular-nums` の等幅で、本文より大きく組む

**情報構造（トップページのセクション順）**

セクション順は情報の優先度そのものなので、デザイン変更時も並べ替えない。

`1 Global header` → `2 Mega menu` → `3 Utility strip（よく見られる項目）` → `4 This week（今週の開催・注目レース）` → `5 Pickup news` → `6 発走時刻のお知らせ` → `7 Campaign` → `8 各種サービス` → `9 JRAニュース（タブ）` → `10 競馬場・施設` → `11 Footer`

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Primary** (`#007853`): メインのブランドカラー。ヘッダー / フッターの地色、CTAボタン、セクション見出しの 4px アンダーライン
- **Primary Dark** (`#004E36`): ホバー・プレス時のプライマリカラー
- **Primary Tint** (`#E8F4EF`): 緑地上の白ボタンのホバー面

**使用面積のルール**: 緑を大面積で使ってよいのは**ヘッダーとフッターの 2 箇所だけ**。本文領域では primary ボタンと見出しアンダーラインに限定する。使用比率の目安は Background 70% / Text 20% / Border 7% / Primary 2% / Semantic 1%。

**緑地の上のボタン**: 緑地に緑ボタンは沈むため、白地 `#FFFFFF` + `#007853` 文字に反転する。

### Semantic（意味的な色）

- **Danger** (`#D81920`): GⅠ表記、締切間近、発走変更、エラー
- **Warning** (`#E05A12`): 注意喚起。18px 以上または太字でのみ文字色に使用可（4.1:1）
- **Success** (`#007853`): 完了・発売中。Primary と同値（緑は JRA では「正常」の意味を持つ）

### Neutral（ニュートラル）

- **Text Primary** (`#0A0A0A`): 本文テキスト
- **Text Secondary** (`#4A4A4A`): 補足テキスト、ラベル
- **Text Disabled** (`#8C8C8C`): 無効状態のテキスト。**本文・リンクには使わない**（3.5:1）
- **Border** (`#D4D4D4`): 区切り線、入力欄の枠、1px 罫線
- **Background** (`#FFFFFF`): ページ背景
- **Surface** (`#F4F4F4`): ユーティリティ帯、テーブル行ホバー、コードの地

### コントラスト比

| 前景 | 背景 | 比率 | 判定 |
|------|------|------|------|
| Text Primary `#0A0A0A` | Background | 19.8:1 | AAA |
| Text Secondary `#4A4A4A` | Background | 8.9:1 | AAA |
| Text Disabled `#8C8C8C` | Background | 3.5:1 | 非テキストのみ |
| Primary `#007853` | Background | 5.5:1 | AA |
| Danger `#D81920` | Background | 5.4:1 | AA |
| Background | Primary `#007853` | 5.5:1 | AA（ヘッダー / フッターの白文字） |

### 枠番カラー（競馬の規約・変更不可）

意匠ではなく規約なので値を変えない。表示は **20px の正方形・角丸なし**。色だけで意味を伝えないため、必ず馬番の数字を併記する。

| 枠 | 色 | 備考 |
|----|-----|------|
| 1 | `#FFFFFF` | 白地のため `1px solid #D4D4D4` を付ける |
| 2 | `#1A1A1A` | |
| 3 | `#E60012` | |
| 4 | `#0068B7` | |
| 5 | `#F6AA00` | |
| 6 | `#009944` | Primary と混同させない。並置しない |
| 7 | `#F39800` | |
| 8 | `#E85298` | |

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP, ヒラギノ角ゴ ProN, 游ゴシック, Meiryo
- **明朝体**: 使用しない（Modernism はサンセリフのみ）

### 3.2 欧文フォント

- **サンセリフ**: Archivo, Helvetica Neue, Arial
- **セリフ**: 使用しない
- **等幅**: SFMono-Regular, Consolas, Menlo（コード表記のみ。数値は Archivo + `tabular-nums` で扱う）

### 3.3 font-family 指定

```css
/* 本文 */
font-family: "Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN",
             "Yu Gothic", Meiryo, sans-serif;

/* 欧文・数字（オッズ、発走時刻、馬番、日付） */
font-family: "Archivo", "Helvetica Neue", Arial, sans-serif;

/* 等幅 */
font-family: SFMono-Regular, Consolas, Menlo, monospace;
```

**フォールバックの考え方**:

- 和文フォントを先に指定（日本語の表示品質を優先）
- **数字要素には欧文スタックを明示指定する。** 和文を先に置くと数字が Noto Sans JP のグリフに吸われ、Archivo の字面が出ない
- 最後に generic family（sans-serif）を指定
- Web フォントのロードに失敗しても情報が伝わること。`font-display: swap`

### 3.4 文字サイズ・ウェイト階層

タイプスケールは 1.333（Perfect Fourth）。中間段を意図的に持たない。和文ウェイトは **400 と 700 の 2 段階のみ**（500・600 は使わない）。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | 和文 | 88px | 700 | 0.92 | -0.03em | 大型キービジュアル |
| Heading 1 | 和文 | 48px | 700 | 1.05 | -0.02em | ページタイトル |
| Heading 2 | 和文 | 28px | 700 | 1.20 | -0.02em | セクション見出し |
| Heading 3 | 和文 | 20px | 700 | 1.35 | -0.01em | カードタイトル |
| Body | 和文 | 15px | 400 | 1.75 | 0.04em | 本文 |
| Caption | 和文 | 13px | 400 | 1.60 | 0.04em | 補足、注釈 |
| Small | 和文 | 13px | 400 | 1.60 | 0.04em | 最小テキスト（下限） |
| Number L | 欧文 | 36px | 700 | 1.00 | 0 | オッズ、発走時刻 |
| Number M | 欧文 | 18px | 700 | 1.00 | 0 | 馬番、R番号、斤量 |

```css
@theme {
  --text-display: 5.5rem;    --text-display--line-height: 0.92;
  --text-h1:      3rem;      --text-h1--line-height: 1.05;
  --text-h2:      1.75rem;   --text-h2--line-height: 1.2;
  --text-h3:      1.25rem;   --text-h3--line-height: 1.35;
  --text-body:    0.9375rem; --text-body--line-height: 1.75;
  --text-note:    0.8125rem; --text-note--line-height: 1.6;
  --text-num-lg:  2.25rem;   --text-num-lg--line-height: 1;
  --text-num-md:  1.125rem;  --text-num-md--line-height: 1;
}
```

**最小フォントサイズは 13px。** それ以下は法令表記など明確な理由がある場合のみ。

### 3.5 行間・字間

- **本文の行間 (line-height)**: `1.75`。欧文混在を理由に 1.5 へ落とさない
- **見出しの行間**: `1.05〜1.35`。和文見出しに 1.5 以上を与えない
- **本文の字間 (letter-spacing)**: `0.04em`。和文はベタ組だと詰まって見える
- **見出しの字間**: `-0.03em〜-0.01em`。和文の大サイズはむしろ詰める

**ガイドライン**:

- 日本語本文は `line-height: 1.5` 以上が必須。本仕様では 1.75 を厳守する
- `letter-spacing: 0.04em` は全角文字の可読性を上げる
- 数値要素には `letter-spacing` を掛けない（欧文の字送りが崩れる）

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
body {
  line-break: strict;          /* 厳格な禁則処理 */
  overflow-wrap: anywhere;     /* 長いURLや英数字の折り返し */
  text-wrap: pretty;           /* 段落末尾の孤立行を回避 */
}
h1, h2, h3 { text-wrap: balance; }

/* レース名・馬名は語中で折り返さない */
.horse-name, .race-name { word-break: keep-all; }
```

**禁則対象**:

- 行頭禁止: `）」』】〕〉》、。，．・：；？！ー々ぁぃぅぇぉっゃゅょ`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* 見出し・ナビゲーション — プロポーショナル字詰め */
h1, h2, h3, nav { font-feature-settings: "palt" 1; }

/* 本文 — ベタ組。palt は掛けない */
body { font-feature-settings: normal; }

/* 数値 — 等幅数字。必須 */
.num, table { font-variant-numeric: tabular-nums; }
```

- **palt**: 見出しとナビゲーションにのみ適用。**本文には適用しない**（`letter-spacing: 0.04em` と競合し、字間が不均一になる）
- **kern**: 欧文のカーニング。和欧混植の見出しで有効
- **tabular-nums**: オッズ・斤量・発走時刻・日付に必須。数値が縦に揃わない表は不合格とする

### 3.8 縦書き

該当なし。Web の可読性とアクセシビリティを優先し、使用しない。

---

## 4. Component Stylings

### Buttons

高さ **44px**（タップターゲット下限）/ Border Radius **0** / `transition: background-color 120ms`。
Focus: `outline: 2px solid #0A0A0A; outline-offset: 2px`（緑地の上では `#FFFFFF`）。

**Primary**

- Background: `#007853`
- Text: `#FFFFFF`
- Padding: 0px 24px
- Border Radius: 0px
- Font Size: 13px
- Font Weight: 700

**Secondary**

- Background: `transparent`
- Text: `#0A0A0A`
- Border: 1px solid `#0A0A0A`
- Padding: 0px 24px
- Border Radius: 0px

**On-Brand**（緑地の上に置くボタン）

- Background: `#FFFFFF`
- Text: `#007853`
- Border: なし
- Hover Background: `#E8F4EF`

**Danger**

- Background: `#D81920`
- Text: `#FFFFFF`
- 用途: 締切間近、発走変更

### Inputs

- Background: `#FFFFFF`
- Border: 1px solid `#D4D4D4`
- Border (focus): 1px solid `#0A0A0A` + `outline: 2px solid #0A0A0A; outline-offset: 2px`
- Border Radius: 0px
- Padding: 0px 12px
- Font Size: 15px
- Height: 44px

### Cards

- Background: `#FFFFFF`
- Border: 1px solid `#D4D4D4`
- Border Radius: 0px
- Padding: 24px
- Shadow: なし（Depth & Elevation セクション参照）
- Hover: Border を `#0A0A0A` に、内部画像を `scale(1.03)` 200ms。**カード自体は動かさない**

### Tables（出馬表・オッズ）

競馬情報サイトの中核コンポーネント。

- `border-collapse: collapse` / `font-variant-numeric: tabular-nums`
- `th`: Padding 12px 8px / Font 13px 700 / 下端のみ `2px solid #0A0A0A`
- `td`: Padding 14px 8px / 下端 `1px solid #D4D4D4`
- Row Hover: Background `#F4F4F4`
- **ゼブラストライプは使わない。** 区切りは 1px 罫線のみ
- 最上位オッズは `#D81920` + 700
- 横スクロール時は 1 列目（馬番）を `position: sticky; left: 0` で固定

### Lists（ニュース一覧）

- `grid-template-columns: 7.5rem 6rem 1fr`（日付 / カテゴリ / 見出し）
- 日付は欧文スタック + `tabular-nums`
- カテゴリは `#4A4A4A` のプレーンテキスト。**バッジ化しない**

### Links

| 状態 | 指定 |
|------|------|
| Default | `color: #0A0A0A` / 下線なし |
| Hover | `text-decoration: underline; text-underline-offset: 3px`（サイズ・ウェイトは変えない） |
| Visited | 変化なし（一覧性を優先。既読色は使わない） |
| Focus | `outline: 2px solid #0A0A0A; outline-offset: 2px` |

`a` と `a:hover` の色は必ず明示定義する。未定義のままだとブラウザ既定の青が出る。

### Grade Label（GⅠ / GⅡ / GⅢ）

**塗りバッジにしない。** 文字として組み、GⅠ のみ `#D81920` + 700。GⅡ / GⅢ は本文色。

---

## 5. Layout Principles

### Spacing Scale

縦方向の余白は以下の 6 値のみを使う。中間値を足さない。

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 40px |
| XL | 64px |
| XXL | 96px |

| 用途 | 値 |
|------|-----|
| 要素間 | 16px (S) |
| セクション内ブロック間 | 40px (L) |
| セクション間 | 96px (XXL) |

### Container

- Max Width: 1280px
- Padding (horizontal): 32px（1024px 未満では 20px）

### Grid

- Columns: 12
- Gutter: 24px

| セクション | ≤ 767px | 768–1023px | ≥ 1024px |
|-----------|---------|------------|----------|
| This week | 1 col | 2 col | 3 col |
| News | 1 col | 2 col | 8/4 split |
| Services | 2 col | 4 col | 6 col |

### Corner Radius

```css
@theme {
  --radius-none: 0px;    /* 全コンポーネントの既定 */
  --radius-pill: 999px;  /* タグのみ許可 */
}
```

---

## 6. Depth & Elevation

**`box-shadow` は使用しない。** Modernism における深度は「面の重なり」ではなく「罫線の強さ」で示す。

| Level | Shadow | 代替表現 | 用途 |
|-------|--------|----------|------|
| 0 | none | なし | ページ地、フラットな要素 |
| 1 | none | `1px solid #D4D4D4` | カード、テーブル、入力欄 |
| 2 | none | `1px solid #0A0A0A` | メガメニュー、ドロップダウン |
| 3 | none | `1px solid #0A0A0A` + 背景の全面オーバーレイ | モーダル、ダイアログ |

メガメニューは高さアニメーションではなく **opacity 120ms のみ**で開閉する（レイアウトシフトを起こさない）。

---

## 7. Do's and Don'ts

### Do（推奨）

- フォントは必ずフォールバックチェーンを指定する
- 数字要素には欧文スタック（Archivo）を明示指定する
- 日本語本文は `line-height: 1.75` / `letter-spacing: 0.04em`
- 見出しは負の字間（-0.02em）+ `font-feature-settings: "palt" 1`
- 和文ウェイトは 400 と 700 の 2 段階に留める
- 数値・時刻・オッズ・馬番はすべて `font-variant-numeric: tabular-nums`
- 面の分離は 1px 罫線で行う
- ブランド緑 `#007853` は大面積ではヘッダーとフッターのみ
- 緑地の上のボタンは白地 + 緑文字に反転する
- 縦方向の余白は Spacing Scale の 6 値から選ぶ
- 色のコントラスト比は WCAG AA 以上を確保する
- タップターゲットは 44×44px 以上
- Focus は 2px の outline + offset 2px
- 色だけで状態を示さず、必ず文字か記号を併記する
- `prefers-reduced-motion: reduce` で全 transition を `0.01ms` にする

### Don't（禁止）

- `font-family` に和文フォント1つだけを指定しない（環境依存になる）
- 日本語本文に `line-height: 1.2` 以下を使わない
- 本文に `palt` を掛けない（見出し・ナビゲーションのみ）
- 和文に 500・600 のウェイトを使わない
- テキストの色に純粋な `#000000` を使わない（本仕様は `#0A0A0A`）
- Text Disabled `#8C8C8C` を本文・リンク色に使わない
- 全角・半角スペースを混在させない
- `box-shadow` を使わない（0 件が正）
- 角丸を使わない（タグの pill のみ例外）
- グラデーション背景を使わない（ブランド緑のグラデも不可）
- 意味のない色を足さない（既定の青リンク、紫のアクセント）
- テーブルにゼブラストライプを敷かない
- 数値列を `tabular-nums` なしで組まない
- グレードを塗りバッジにしない
- 中央揃えの本文段落を作らない
- スクロール連動のフェードインを使わない（情報が遅れて現れる設計は害）
- アイコンとテキストで同じことを二度言わない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 479px | 1カラム。ナビはドロワー |
| Tablet | ≤ 767px | 2カラムまで |
| Laptop | ≤ 1023px | コンテナ余白 20px |
| Desktop | > 1024px | 12カラム / コンテナ 1280px |

実サイトのような PC / SP のドメイン分離は行わず、**1 つのレスポンシブ実装**で全幅に対応する。

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- ボタン・タブ・テーブル行のリンクすべてに適用

### フォントサイズの調整

- **本文 15px は全ブレークポイントで固定。** モバイルで縮小しない（一覧性が損なわれる）
- Display / Heading 1 のみ `clamp()` で縮小: `clamp(2.25rem, 1.4rem + 2.4vw, 3rem)`

### テーブル

320px 幅では横スクロール + 馬番列を `position: sticky; left: 0`。**列を落とさない**（一覧性が損なわれる）。

### ヘッダー

- ≤ 767px: ナビをドロワーに格納。ログインボタンは残す（最優先導線）
- ≥ 768px: 全項目を表示

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #007853
Primary Dark:  #004E36
Danger:        #D81920
Text Color:    #0A0A0A
Text Sub:      #4A4A4A
Border:        #D4D4D4
Background:    #FFFFFF
Surface:       #F4F4F4

Font (和文): "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif
Font (数字): "Archivo", "Helvetica Neue", Arial, sans-serif
Body Size:   15px
Line Height: 1.75
Letter Spacing: 0.04em（本文）/ -0.02em（見出し）
Weights:     400 / 700 のみ

Numbers:  font-variant-numeric: tabular-nums（必須）
Headings: font-feature-settings: "palt" 1（本文には掛けない）

Button:   height 44px / padding 0 24px / radius 0 / weight 700
Radius:   0（pill タグのみ例外）
Shadow:   使用しない。浮きは 1px solid #0A0A0A で表現
Spacing:  8 / 16 / 24 / 40 / 64 / 96 の 6 値のみ
Container: 1280px / padding 32px（1024px 未満は 20px）
Grid:     12 columns / gutter 24px
Focus:    outline 2px #0A0A0A + offset 2px

枠番カラー（規約・変更不可）:
1 #FFFFFF(+border) / 2 #1A1A1A / 3 #E60012 / 4 #0068B7
5 #F6AA00 / 6 #009944 / 7 #F39800 / 8 #E85298
```

### プロンプト例

```
JRA のデザインシステムに従って、出馬表ページを作成してください。

- プライマリカラー: #007853（ヘッダーとフッターの地色。文字は白）
- ヘッダー内のログインボタンは白地 + #007853 文字（緑地に緑を置かない）
- フォント: "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif
- 数字要素は "Archivo", "Helvetica Neue", Arial, sans-serif を明示指定
- 行間: 本文は line-height: 1.75 / letter-spacing: 0.04em / color #0A0A0A
- 見出し: font-weight 700 / letter-spacing -0.02em / font-feature-settings: "palt" 1
- テーブルヘッダーの背景: 透明（下端のみ 2px solid #0A0A0A）
- ボーダー: #D4D4D4（行区切りは 1px）
- ゼブラストライプは使わない
- 数値列すべてに font-variant-numeric: tabular-nums
- 枠番は 20px の正方形（角丸なし）+ 馬番の数字を併記
- GⅠ は文字で組み #D81920（塗りバッジにしない）
- box-shadow と border-radius は 0 件
- 縦の余白は 8 / 16 / 24 / 40 / 64 / 96 のみ
- ボタン高さ 44px / radius 0 / focus は outline 2px + offset 2px
- 320px 幅で横スクロール + 馬番列を position: sticky; left: 0
- prefers-reduced-motion 対応
```

### 実装チェックリスト

- [ ] `box-shadow` の使用箇所が 0 件
- [ ] `border-radius` がタグの pill 以外で 0 件
- [ ] 縦方向の余白が 8 / 16 / 24 / 40 / 64 / 96 の 6 値だけ
- [ ] 数値列すべてに `tabular-nums` が効いている
- [ ] 数字要素に欧文スタックが明示指定されている
- [ ] 緑の大面積使用がヘッダーとフッターの 2 箇所のみ
- [ ] 和文のウェイトが 400 と 700 の 2 種類だけ
- [ ] 本文の `line-height` が 1.75 / `letter-spacing` が 0.04em
- [ ] 本文に `palt` が掛かっていない
- [ ] `#000000` が使われていない（`#0A0A0A`）
- [ ] `a` と `a:hover` の色が明示定義されている
- [ ] 全インタラクティブ要素に 2px の outline フォーカスリング
- [ ] タップターゲットが 44×44px 以上
- [ ] 320px 幅でテーブルが横スクロール + 馬番列 sticky
- [ ] `prefers-reduced-motion` 対応済み
