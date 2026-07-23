# DESIGN.md — HASUNA（ハスナ）

> HASUNA（https://www.hasuna.co.jp/）のデザイン仕様書。
> 「Ethical Jewelry（エシカルジュエリー）」を掲げ、鉱山採掘から流通までの透明性に配慮した素材でジュエリーをつくる日本のブランド。上品で禁欲的な、静かなラグジュアリーを標榜する。
> 最大の特徴は **見出しも本文もすべて Times New Roman（セリフ）一系統で組む**設計、色数を **無彩色のグレー（純黒を避けた `#363636` / `#666666`）** に絞った端正さ、**角丸ゼロ（radius 0px）のシャープな矩形ボタン**、そして **本文行間 2.4 という非常に広い余白**。有彩色はセール価格の朱赤 `#f94c43` にしか現れない。
> 実サイトの computed style 実測（2026-07-23 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **禁欲的なラグジュアリー**。装飾を削ぎ、セリフ体の細いストロークと無彩色、広い行間だけで「上質さ」と「静けさ」を表現する。宝飾のきらびやかさを Web で誇張せず、余白と製品写真に語らせる
- **HASUNA について**: エシカルジュエリー。素材のトレーサビリティと作り手への配慮を思想の核に置き、その真摯さを Web でも装飾過多を避けた端正なグレー基調で体現する
- **密度**: 低密度。全幅の製品写真を大きく置き、テキストは Times New Roman のセリフで小さく静かに添える
- **キーワード**: Times New Roman、セリフ一系統、無彩色グレー、#363636、#666666、角丸 0px、行間 2.4、矩形ボタン、エシカル
- **特徴**:
  - 書体は **Times New Roman → Times → serif** のセリフスタック一系統。和文の明示指定はなく、OS の明朝（游明朝／ヒラギノ明朝）にフォールバックする。ゴシックは使わない
  - ウェイトは **400（Regular）が本文・見出しとも既定**。強調の小ラベルにのみ 700 が出る
  - テキスト色は **`#666666`（温かみのあるミディアムグレー）が本文・見出しの標準**。ロゴ・ナビ・強調には **ほぼ黒の炭色 `#363636`** を使う。純黒 `#000000` は避ける
  - **`line-height` が非常に広い（本文で 2.4、見出しで 1.65）**。セリフを静かに、ゆったり組む
  - 字間は基本 **normal**。連番ラベル「01 / 02」のみ広い字送り（letter-spacing 2.4px ≒ 0.13〜0.2em）
  - 有彩色は **セール価格の朱赤 `#f94c43`** に限定。あとは無彩色に徹する
  - **ボタンは一貫して角丸 0px の矩形**。ピル型・角丸は使わない。面色ボタン（`#808080`）とアウトライン・テキストリンクを使い分ける
  - 区切りは **1px のごく淡い罫線（`#e8e8e8` / `#e1e1e1`）**

---

## 2. Color Palette & Roles

> 実測値。CSS Custom Properties が定義されている（`--text-color` 等）。前面に出る有彩色は事実上「セール価格の朱赤 `#f94c43`」のみで、あとは白と 2 段階のグレー。Shopify ベースだが高度にカスタムされており、パレットは徹底して無彩色に絞られている。

### Brand（無彩色の主役）

- **Text Grey** (`#666666`): 本文・見出しの標準色（`--text-color`, `--heading-color`）。温かみのあるミディアムグレー。フッターの地色（`--footer-background`）にも使う
- **Charcoal** (`#363636`): ロゴ・ナビ・強調テキスト・リンク（`--link-color`）。ほぼ黒に近い炭色だが純黒ではない。締め色として最前面の可読性を担う
- **Button Grey** (`#808080`): 面色ボタンの背景（`--button-background`）。テキストは白

### Neutral（背景・面・罫）

- **White** (`#ffffff`): 基本のページ背景（`--background`）。ボタン・フッターのテキスト色
- **Light Grey** (`#f6f6f6`): 淡いグレーの面（`--light-background`, `--secondary-elements-background`）。セクション帯・カード地
- **Border Grey** (`#e8e8e8`): ヘアライン罫（`--border-color`）
- **Header Border** (`#e1e1e1`): ヘッダー下の境界罫
- **Footer Border** (`#7d7d7d`): フッター内の淡い仕切り罫

### Accent / Semantic

- **Sale Red** (`#f94c43`): 数少ない有彩色アクセント。**セール価格の表示にのみ**使う（`--product-sale-price-color`）。通常は登場しない
- **System Link Blue** (`#486ae4`): ニュースレター等のシステムリンク色。稀に出る程度
- 独立したエラー／警告色は前面に存在しない。実装が必要なら無彩色基調を保ちつつ、エラーはセール色を流用せず沈んだ赤 `#c0392b` 程度に留める

---

## 3. Typography Rules

> **Times New Roman のセリフスタック一系統**・**全編ウェイト 400**・**本文行間 2.4／見出し 1.65**・字間は基本 normal。HASUNA の端正さはこの「セリフ一系統＋非常に広い行間」で作られている。

### 3.1 和文フォント

- **和文フォントの明示指定は無い**。`font-family` は `"Times New Roman", Times, serif` のみで宣言され、和文は **OS の明朝（游明朝 / ヒラギノ明朝）にフォールバック**して表示される
- したがって Mac では ヒラギノ明朝、Windows では 游明朝（無ければ MS 明朝）で組まれる。ゴシックにはならない
- 実装で和文を明示したい場合は、セリフの意図を保つため **游明朝 → ヒラギノ明朝 → serif** を Times New Roman の後ろに足す

### 3.2 欧文フォント

- **セリフ（主役）**: Times New Roman → Times → serif
- 欧文専用 Web フォントは読み込んでいない。OS 内蔵の Times New Roman を前提とした古典的なセリフ設計
- サンセリフ・ゴシックは使わない

> **preview.html での代替**: Times New Roman はシステムフォントのため Web フォントとして配信されない。プレビューでは字形の近い Google セリフ（欧文: **PT Serif**、和文: **Noto Serif JP**）で代替し、実サイトの Times New Roman ＋ OS 明朝の雰囲気を再現している。実装時は必ず `"Times New Roman", Times, serif` を先頭に置くこと。

### 3.3 font-family 指定

```css
/* 本文・見出し共通（セリフの単一スタック。和文の明示指定は無い） */
font-family: "Times New Roman", Times, serif;
font-weight: 400;
font-style: normal;

/* 和文を明示したい場合の推奨拡張 */
font-family: "Times New Roman", Times, 游明朝, YuMincho,
             "Hiragino Mincho ProN", "ヒラギノ明朝 ProN", serif;
```

**フォールバックの考え方**:
- Times New Roman を先頭に置き、欧文はそのまま Times → serif に落とす
- 和文は明示指定が無く OS の明朝に委ねる。末尾は必ず `serif` にしてゴシック化を防ぐ
- セリフが本文でサンセリフにならないことを最優先する

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Logo (h1) | Times New Roman | 14px | 400 | 1.65 (23.1px) | normal | ロゴ / #363636 |
| Section (h2) | Times New Roman | 24px | 400 | 1.65 (39.6px) | normal | "Item" 等 / #666666・写真上は #ffffff |
| Sub (h2 小) | Times New Roman | 18px | 400 | 1.65 (29.7px) | normal | 小見出し / #666666 |
| Body (p) | Times New Roman | 14px | 400 | 2.4 (33.6px) | normal | 本文 / #666666 |
| Emphasis (p 強調) | Times New Roman | 11px | 700 | 2.4 (26.4px) | normal | "NEW ARRIVAL：.." / #666666 |
| Link (a) | Times New Roman | 12–14px | 400 | 1.65–2.4 | normal | #666666・暗背景で #ffffff |
| Number Label | Times New Roman | 12–18px | 400 | — | 2.4px (≒0.13–0.2em) | 連番 "01 / 02" / #666666 |
| Nav / Header | Times New Roman | 14px | 400 | 1.65 (23.1px) | normal | #363636 |

- **基本は weight 400**。太字は強調小ラベルの 700 のみ。サイズと余白で階層を作る

### 3.5 行間・字間

- **本文の行間**: **2.4**（14px→33.6px）。非常に広い、静かなセリフの余白。HASUNA の署名的な値
- **見出し・ロゴ・ナビの行間**: **1.65**（14px→23.1px、24px→39.6px、18px→29.7px）
- **字間 (letter-spacing)**: 基本 **normal**。ベタ組みに近い自然な送り
- **例外**: 連番ラベル「01 / 02」のみ letter-spacing **2.4px**（≒ 0.13〜0.2em）で大きく開け、記号的なリズムを作る

**ガイドライン**:
- 本文は line-height 2.4 を守る（詰めると端正さと静けさが失われる）
- 見出しは 1.65 に抑え、本文との差でメリハリを付ける
- 字間は本文で広げず normal、連番ラベルのみ大きく開ける

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
font-feature-settings: normal;   /* palt / kern は明示適用していない */
```

- 実測は `normal`。Times New Roman ＋ OS 明朝のベタ組みをそのまま活かす。和文見出しで詰めたい場合のみ `"palt" 1` を局所適用する。欧文の `kern` はブラウザ既定に委ねる

### 3.8 縦書き

- 主要導線は横組み。ロゴ「HASUNA」も横組み
- 縦組みは使用していない。用いる場合はセリフスタックのまま `writing-mode: vertical-rl; text-orientation: mixed;`（ただし Times New Roman は縦組みに最適化されないため、和文明朝を明示する）

---

## 4. Component Stylings

### Buttons

HASUNA は **角丸 0px の矩形ボタン**で統一する。面色（`#808080`）ボタン・アウトラインボタン・テキストリンクを使い分け、ピル型は使わない。

**Filled（面色）**
- Background: `#808080`（`--button-background`）
- Text: `#ffffff`
- Border: なし
- Border Radius: `0px`
- Padding: `14px 28px`
- Font: Times New Roman, 14px, weight 400

**Outline（主要導線）**
- Background: `transparent`
- Text: `#666666`
- Border: `1px solid #e8e8e8`〜`#808080`
- Border Radius: `0px`
- Padding: `14px 28px`
- Font: Times New Roman, 14px, weight 400
- 例: 「オンラインストアへ」「Necklace」「Ring」

**Text（テキストリンク）**
- Background: `#ffffff`
- Text: `#363636` / `#666666`
- Border Radius: `0px`
- Padding: `0`
- 例: 「About HASUNA」「My Wishlist」

### Inputs

- Background: `#ffffff`
- Border: `1px solid #e8e8e8`
- Border (focus): `1px solid #808080`（無彩色を保つ）
- Border Radius: `0px`
- Padding: `12px 14px`
- Font: Times New Roman, 14px, weight 400
- Text Color: `#666666`

### Cards

- Background: `#ffffff`（または `#f6f6f6` の淡い面／製品写真そのもの）
- Border: なし／必要時 `1px solid #e8e8e8`
- Border Radius: `0`
- Padding: `24px`
- Shadow: なし（フラット）
- 製品写真を大きく置き、下にセリフで品名・素材・価格を小さく添える。セール時のみ価格を `#f94c43` に

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
| XXL | 120px |

余白を広く取り、セクション間は XL〜XXL で静かな「間」を作る。ヘッダー高は 80px（header-base-height）。

### Container

- Max Width: 1200px 目安（製品写真は全幅ブリードを多用）
- Padding (horizontal): 24〜40px

### Grid

- Columns: 12（実運用は 1〜4 カラムの素朴な構成）
- Gutter: 24〜40px
- 製品一覧は写真中心のシンプルなグリッド。装飾を足さず罫線と余白で区切る

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼ全要素がフラット |
| 1 | `0 1px 3px rgba(0,0,0,0.06)` | 使う場合のみ。ドロップダウン等 |
| 2 | `0 8px 24px rgba(0,0,0,0.08)` | モーダル・カート等の限定用途 |

- 基本は **影を使わない**。奥行きは余白と写真、1px のヘアライン罫で表現する

---

## 7. Do's and Don'ts

### Do（推奨）

- セリフスタック（Times New Roman → Times → serif）の末尾を必ず `serif` にする
- 本文・見出しとも weight 400 で組み、サイズと余白で階層を作る
- テキストは標準 `#666666`、強調・ロゴ・ナビは `#363636`。純黒を避ける
- 本文の line-height を 2.4 に、見出しを 1.65 に保つ
- ボタン・入力・カードの角丸は一貫して 0px（シャープな矩形）
- 有彩色はセール価格の `#f94c43` に限定する
- 区切りは 1px のヘアライン罫（`#e8e8e8` / `#e1e1e1`）で軽く

### Don't（禁止）

- セリフの代わりにゴシック（サンセリフ）を本文に使わない
- 太字（weight 700）を強調小ラベル以外で多用しない
- 角丸・ピル型ボタンを使わない（radius は 0px で統一）
- セール色以外の鮮やかな彩色をアクセントに足さない
- 本文の line-height を 1.8 以下に詰めない（端正さと静けさが失われる）
- 純黒 `#000000` を本文・見出しに使わない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。製品写真は全幅 |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 3〜4 カラム＋広い余白 |

### タッチターゲット

- 最小サイズ: 44px × 44px。矩形ボタンは padding `14px 28px` で高さを確保

### フォントサイズの調整

- モバイルでも本文 14px を維持（セリフは細いため下げすぎない）
- 見出し 24px → 20px 程度に縮小。行間は本文 2.4 / 見出し 1.65 を据え置き、余白を保つ

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text Color:     #666666   （本文・見出しの標準。純黒は使わない）
Emphasis/Link:  #363636   （ロゴ・ナビ・強調の炭色）
Button (面色):  #808080 / text #ffffff
Sale Accent:    #f94c43   （セール価格のみ）
Background:     #ffffff ／ 面 #f6f6f6
Border:         #e8e8e8 / #e1e1e1
Font:           "Times New Roman", Times, serif（和文は明示指定なし→OS明朝）
Body Weight:    400（見出しも400、強調小ラベルのみ700）
Body Size:      14px
Line Height:    2.4（本文）／ 1.65（見出し・ナビ）
Letter Spacing: normal（連番ラベルのみ 2.4px ≒ 0.15em）
Button Radius:  0px（角丸なし・矩形で統一）
```

### プロンプト例

```
HASUNA のデザインシステムに従って、製品紹介ページを作成してください。
- フォント: "Times New Roman", Times, serif（見出しも本文も weight 400。和文は明示指定せず OS 明朝に委ねる）
- テキスト色 #666666（本文・見出し）、強調・ロゴ・ナビは #363636。純黒は禁止
- 行間は本文 2.4、見出し・ナビ 1.65。字間は normal（連番ラベルのみ 2.4px 開ける）
- 背景は白 #ffffff、面は #f6f6f6。製品写真を全幅で大きく置き、余白を広く取る
- ボタン・入力・カードの角丸は 0px で統一。面色ボタンは背景 #808080・文字 #ffffff
- 有彩色はセール価格の #f94c43 のみ。あとは無彩色に徹する
- 区切りは 1px のヘアライン罫（#e8e8e8）。影・角丸は使わない
```
