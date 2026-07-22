# DESIGN.md — 山と道（やまとみち / Yamatomichi）

> 山と道（https://www.yamatomichi.com/）のデザイン仕様書。
> ウルトラライト・ハイキング（UL）の道具を作る山道具メーカー。読み物「JOURNAL」とコミュニティ「HLC」を軸にした、EC より雑誌に近い構成の公式サイト（Next.js ベース）。
> 最大の特徴は **筑紫ゴシック（Fontworks）＋ Helvetica Now Text の和欧混植**、**白地に大きく角丸したパネル／カード**、**プライマリの青 `#0386f0`**、そして **記事カードごとに色を変える多色エディトリアル**（ベージュ・オリーブ・コーラル・ピンク…）。CTA は青のピル、カテゴリは淡いグレーのピルタグ。
> 実サイトの computed style 実測（2026-07-22 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **アウトドア × エディトリアル**。プロダクト EC でありながら、トップは JOURNAL 記事の色とりどりのカードが主役。山の空気（自然色）とデジタルの明快さ（青）を同居させる
- **山と道について**: 「本当に必要な道具を形にしていく」思想の UL ギア・ブランド。作り手の言葉・ハイキング文化・コミュニティ活動を長文記事で発信するため、Web はメディア的に設計されている
- **密度**: 中密度。大きなヒーローパネルの下に、色分けされた記事カードがグリッドで積層する。文字は多いが余白と角丸で軽やかに見せる
- **キーワード**: 筑紫ゴシック、Helvetica Now、白地、大きな角丸、青 #0386f0、ベージュ #dfceaa、多色カード、ピルCTA、ピルタグ
- **特徴**:
  - 和文は **筑紫ゴシック（TsukuGoPr5-R / TsukuGoPro-B）**、欧文は **Helvetica Now Text（Light / Medium）** を合成した和欧混植
  - ウェイトは **本文 300（Light）／強調・見出し 600（Medium 相当）** の二択が基本
  - 面は **大きく角丸**（ヒーロー／特集パネルは 10〜24px、CTA は 26〜30px のピル、タグは 14px のピル）。ただし **記事一覧カードは radius 0**
  - プライマリ色は **青 `#0386f0`**（リンク／主要 CTA パネル／「一覧を見る」ボタン）
  - **記事カードは 1 枚ごとに背景色が変わる**多色設計。ベージュ・オリーブ・ゴールド・コーラル・ピンク・クリーム等を巡回させ、誌面の楽しさを出す
  - ブランドマークは円形にレイアウトした「ULTRALIGHT HIKING 山と道」の英字リング

---

## 2. Color Palette & Roles

> 実測値。CSS Custom Properties はほぼ未使用（`--swiper-theme-color: #007aff` 等ライブラリ由来のみ）。色は各コンポーネントに直接指定されている。ブランドの主軸は「青 `#0386f0` ＋ ベージュ `#dfceaa`」の二本柱。

### Brand

- **Yamatomichi Blue** (`#0386f0`): プライマリ。主要 CTA パネル・「一覧を見る」ボタンに使う鮮やかな青。リンク文字は近縁の `#0085ee`、ボタンの一部は `#1e88e5` と微差の青が併存する
- **Trail Beige** (`#dfceaa`): 準ブランドカラー。出現頻度が青に次いで高い、砂・枯草を思わせる暖色ベージュ。地色・記事カード・図版背景に多用され、山と道の「自然」を担う

### Editorial Card Palette（記事カードの多色）

記事カードは背景色を巡回させる。文字色は明度に応じて黒／白を切り替える。

- **Olive** (`#9db033`) — 白文字
- **Gold** (`#d3ac45`) — 白文字
- **Sky** (`#47a2e3`) — 白文字
- **Coral** (`#f25745`) — 白文字
- **Pink** (`#f171c4`) — 白文字
- **Slate** (`#7f8896`) — 白文字
- **Mint** (`#bed387`) — 黒文字
- **Peach** (`#fad7b9`) — 黒文字
- **Cream** (`#fffaea`) — 黒文字
- **Lavender** (`#e3dde1`) — 黒文字

### Neutral（背景・面）

- **White** (`#ffffff`): ページ背景（`body`）
- **Panel Grey** (`#eeeeee`): 図版・メニュー画像の地
- **Tag Grey** (`#ebebeb`): カテゴリバッジの地
- **Line Grey** (`#9d9d9d`): アウトライン・ボタン枠線
- **Text Black** (`#000000`): 本文・見出しテキスト
- **Text on Color** (`#ffffff`): 濃色カード・青パネル上のテキスト

### Semantic

- 独立したエラー／警告色は前面にはほぼ出ない。実装が必要なら、エラーは記事パレットの `#f25745`（コーラル）を転用し、成功・情報は青 `#0386f0` を流用すると世界観に収まる

---

## 3. Typography Rules

> 和文 **筑紫ゴシック**・欧文 **Helvetica Now Text** を 1 フォント名に合成した和欧混植スタック。ウェイトは Light(300) と Medium(600) の二段で、`palt` は明示適用していない。

### 3.1 和文フォント

- **ゴシック体（Light 本文用）**: 筑紫ゴシック Pr5 R（`TsukuGoPr5-R`）→ ヒラギノ角ゴ ProN W3 → sans-serif
- **ゴシック体（Bold 見出し用）**: 筑紫ゴシック Pro B（`TsukuGoPro-B`）→ ヒラギノ角ゴ ProN W6 → sans-serif
- 筑紫ゴシックは Fontworks（LETS）の Web フォント。ヒューマニストで温かみのある字面が山と道の個性を担う

### 3.2 欧文フォント

- **サンセリフ（本文）**: Helvetica Now Text Light
- **サンセリフ（見出し）**: Helvetica Now Text Medium
- 実際の宣言では和文フォント名と欧文フォント名が **1 つの family 名として連結**されている（例: `TsukuGoPr5-R-HelveticaNowTextLight`）。CSS では下記のように和欧を並べて再現する

### 3.3 font-family 指定

```css
/* 本文（Light） */
font-family: "TsukuGoPr5-R", "Helvetica Now Text", "ヒラギノ角ゴ ProN W3",
             "Hiragino Kaku Gothic ProN", sans-serif;
font-weight: 300;

/* 見出し・強調（Medium/Bold） */
font-family: "TsukuGoPro-B", "Helvetica Now Text", "ヒラギノ角ゴ ProN W6",
             "Hiragino Kaku Gothic ProN", sans-serif;
font-weight: 600;

/* 入力フォーム（和文ゴシックにフォールバック） */
font-family: "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", sans-serif;
```

**フォールバックの考え方**:
- 筑紫ゴシックが読めない環境ではヒラギノ角ゴ ProN → sans-serif に落とす
- 欧文を和文グリフより優先したい箇所は Helvetica Now Text を前に置く
- 筑紫が無い場合でも「ヒューマニストなゴシック」の印象を保つため、末尾は必ず sans-serif

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (h1) | 筑紫ゴシック B | 48px | 600 | 1.4 (67.2px) | normal | ページ大見出し |
| Heading | 筑紫ゴシック B | 24px | 600 | 1.4 (33.6px) | normal | セクション見出し |
| Sub | 筑紫ゴシック B | 20px | 600 | 1.4 (28px) | normal | カードタイトル |
| Body | 筑紫ゴシック R | 16〜18px | 300 | 1.4 (25.2px) | normal | 標準本文 |
| Body Strong | 筑紫ゴシック B | 16px | 600 | 1.4 (22.4px) | normal | 強調本文・リンク |
| Caption / Tag | 筑紫ゴシック | 14px | 300〜600 | 1.4 (19.6px) | normal | 補助・カテゴリ |

- 見出し・強調は **600**、読み物本文は **300**。line-height は概ね **1.4** で統一

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.4 前後**（16px→22.4px、18px→25.2px）。エディトリアルながら詰め気味で、カード内に多くの文字を収める
- **見出しの行間**: 1.4（48px→67.2px、24px→33.6px）と本文と揃える
- **字間 (letter-spacing)**: **normal（0）**。筑紫ゴシックの字面をそのまま活かす

**ガイドライン**:
- 読み物本文は 16〜18px / line-height 1.6〜1.8 まで広げると長文記事で読みやすい（トップのカードは 1.4 で密に）
- letter-spacing は 0 を基本に。英字大見出しのみ僅かに詰めてよい

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
font-feature-settings: normal;   /* palt は明示適用していない */
```

- 実測は `normal`。筑紫ゴシックのベタ組みを活かす。見出しで詰めたい場合のみ `"palt" 1` を局所適用

### 3.8 縦書き

- 該当なし（全編横組み）

---

## 4. Component Stylings

### Buttons

**Primary（青ピル CTA）**
- Background: `#0386f0`（一部 `#1e88e5`）
- Text: `#ffffff`
- Border Radius: `26〜30px`（ピル）
- Padding: `10px 24px`
- Font: 筑紫ゴシック B, 20px, weight 600
- 例: 「一覧を見る」

**Secondary（アウトライン・ラベル）**
- Background: `transparent`
- Text: `#0085ee`（青）または `#000000`
- Border: `1px solid #9d9d9d`
- Border Radius: `10px`
- 例: 記事バナー「山と道の考えるウルトラライトハイキング」

**Tag / Category（ピルタグ）**
- Background: `#ebebeb`
- Text: `#000000`
- Border Radius: `14px`（ピル）
- Padding: `3px 10px`
- Font Size: 14px
- 例: `COMMUNITY` / `INFORMATION` / `PLAYLIST`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #dddddd`
- Border (focus): `1px solid #0386f0`
- Border Radius: `8px`
- Padding: `10px 14px`
- Font: ヒラギノ角ゴ ProN, 14〜16px, weight 300
- Text Color: `#000000`

### Cards

**特集／ヒーローパネル（角丸）**
- Background: 画像、または `#0386f0` などのブランド色
- Border Radius: `16〜24px`（大きめの角丸）
- Padding: 内容により可変（テキストは中央〜下寄せ）
- Shadow: なし（フラット。色面と画像で存在感を出す）

**記事一覧カード（角ゼロ・多色）**
- Background: 記事ごとに巡回する多色（§2 参照）
- Text: 明度に応じ黒／白
- Border Radius: `0`
- Padding: `16px`
- カードタイトルは 20px / weight 600

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 40px |
| XXL | 64px |

### Container

- Max Width: 1280px 目安
- Padding (horizontal): 16〜24px（モバイルは 16px）

### Grid

- Columns: 12
- Gutter: 16〜24px
- トップは「大きなヒーロー2分割 → 3カラムの記事カード群」の積層。カード間は 16px 前後

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。色面・角丸で存在感を出す |
| 1 | `0 2px 8px rgba(0,0,0,0.08)` | ホバー時のカード浮き上がり |
| 2 | `0 8px 24px rgba(0,0,0,0.12)` | ドロップダウン・モーダル |

- 基本はフラット。奥行きは **色分けと角丸**で表現し、影は最小限に

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文 筑紫ゴシック＋欧文 Helvetica Now の混植を維持し、末尾を sans-serif にする
- 本文は weight 300、見出し・強調は weight 600 の二段で組む
- プライマリ CTA は青 `#0386f0` のピル、カテゴリは淡グレーのピルタグにする
- 記事カードは多色パレットを巡回させ、明度で黒／白文字を切り替える
- ヒーロー・特集は大きな角丸、記事一覧カードは角ゼロ、と使い分ける

### Don't（禁止）

- 明朝体を使わない（山と道はゴシック一系統）
- 青を複数のまったく別の色相に散らさない（`#0386f0` 系にまとめる）
- ベージュ `#dfceaa` を無視して真っ白一辺倒にしない（自然色が個性）
- すべてのカードに影を付けて重くしない（色面と角丸で軽く見せる）
- letter-spacing を過度に広げない（normal が基本）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。ヒーローは縦積み |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 2分割ヒーロー＋3カラムカード |

### タッチターゲット

- 最小サイズ: 44px × 44px。ピル CTA・タグは縦 padding で確保

### フォントサイズの調整

- モバイルでは h1 48px → 28〜32px、カードタイトル 20px → 18px 程度に縮小
- 本文 16px は維持。line-height は据え置き

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #0386f0   （青 / リンク・主要CTA）
Accent:        #dfceaa   （ベージュ / 自然色の地）
Text Color:    #000000
Background:    #ffffff
Font (body):   "TsukuGoPr5-R", "Helvetica Now Text", "ヒラギノ角ゴ ProN W3", sans-serif  (weight 300)
Font (head):   "TsukuGoPro-B", "Helvetica Now Text", "ヒラギノ角ゴ ProN W6", sans-serif  (weight 600)
Body Size:     16px
Line Height:   1.4（長文は1.6〜1.8）
Letter Spacing:normal
CTA:           青ピル radius 26–30px / タグ 淡グレーピル radius 14px
```

### プロンプト例

```
山と道のデザインシステムに従って、JOURNAL 記事一覧ページを作成してください。
- 和文フォント: 筑紫ゴシック（TsukuGoPr5-R / TsukuGoPro-B）、欧文 Helvetica Now Text
- 本文 weight 300 / 見出し weight 600、line-height 1.4、letter-spacing 0
- 背景は白。ヒーローは大きな角丸パネル（16〜24px）で青 #0386f0 を使う
- 記事カードは 1 枚ごとに背景色を巡回（ベージュ #dfceaa / オリーブ #9db033 / コーラル #f25745 / ピンク #f171c4 …）、明度で黒白文字を切替
- カテゴリは淡グレー #ebebeb のピルタグ（radius 14px）
- 主要 CTA「一覧を見る」は青 #0386f0 のピル（radius 26–30px、白文字）
```
