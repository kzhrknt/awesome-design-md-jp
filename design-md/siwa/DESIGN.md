# DESIGN.md — SIWA｜紙和（しわ / Siwa）

> SIWA｜紙和（https://siwa.jp/）のデザイン仕様書。
> 山梨・大直（おおなお）の和紙メーカーと、プロダクトデザイナー **深澤直人** が協業して生まれた、破れにくい和紙素材「ナオロン」のバッグ・小物ブランド。使い込むほど風合いが増す紙製品を扱う。
> 最大の特徴は **Noto Serif JP（明朝）＋ウェイト 300 で全編を組む**設計、**行間 2.3 という極端に広い余白**、そして色数を **和紙そのものの色（白）と、経年の風合いを思わせる暖かなトープ `#867d6b`** に絞った静けさ。純黒を使わず、テキストは柔らかな `#404040`。ロゴは字間を大きく開けた「S I W A｜紙 和」。
> 実サイトの computed style 実測（2026-07-22 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **紙の余白**。装飾を削ぎ、明朝の細いストロークと広い行間だけで「和紙の質感」と「静けさ」を表現する。UI というより一枚の上質な紙面
- **SIWA について**: 深澤直人デザインの和紙プロダクト。「しわ（皺）」の風合いを愛でる思想を、Web でも余白と細字で体現する。派手さを排し、素材と製品写真に語らせる
- **密度**: きわめて低密度。全幅の映像・写真を大きく置き、テキストは明朝で小さく静かに添える
- **キーワード**: Noto Serif JP、明朝、ウェイト300、行間2.3、トープ #867d6b、#404040、ハイライン罫、余白、深澤直人
- **特徴**:
  - 書体は **Noto Serif JP → 游明朝 → ヒラギノ明朝** の明朝スタック一系統。ゴシックは使わない
  - ウェイトは **300（Light）が本文・見出しとも既定**。太字を使わず、サイズと余白で階層を作る
  - テキスト色は **`#404040`（柔らかな炭色）**。純黒 `#000000` は避ける
  - **`line-height` が非常に広い（本文リンク・ナビで 2.3、段落で 1.5）**。明朝を静かに、ゆったり組む
  - **`letter-spacing: 0.28px`（≒ 0.02em）** をほぼ全要素に。控えめだが均等に送る
  - 有彩色は **暖かなトープ／グレージュ `#867d6b`** をリンクに使う程度。あとは無彩色
  - 区切りは **1px のごく淡い罫線（ヘアライン）**。ナビの「Products｜Shop」も細い縦罫で仕切る
  - ボタンは面をほぼ持たず、テキストリンク中心。EC 部分の最小限の UI にのみ矩形ボタンが出る

---

## 2. Color Palette & Roles

> 実測値。CSS Custom Properties は未定義。前面に出る有彩色は事実上「トープ `#867d6b`」のみで、あとは白と柔らかな炭色。`uniqueBackgrounds` 上位に出る `rgba(43,51,63,*)`／`rgba(115,133,159,*)` は動画プレーヤー（VideoJS）のオーバーレイ由来で、ブランド面色ではない点に注意。

### Brand

- **Washi Taupe** (`#867d6b`): 実質唯一のブランドアクセント。和紙・麻布を思わせる暖かなグレージュ／トープ。テキストリンク、強調の小見出しに使う。彩度が低く、紙の色に溶け込む
- **Slate Ink** (`#2b333f`): 濃紺寄りのダークスレート。フッターやオーバーレイ、動画 UI の暗色として限定的に使う。黒の代わりの「締め色」

### Neutral（背景・面）

- **White** (`#ffffff`): 基本のページ背景（`.bg-window`）。紙そのものの白
- **Text Charcoal** (`#404040`): 本文・見出しの標準テキスト色（純黒は使わない）
- **Text Ink** (`#3d3737`): 一部リンク・強調テキストのやや濃い炭色
- **Panel Grey** (`#efefef`): 淡いグレーの面（区切り帯・サムネイル地）
- **Line Grey** (`#e0e0e0` 目安): ヘアライン罫（ナビの仕切り・セクション境界）

### Semantic

- 独立したエラー／警告色は前面に存在しない（フォームは最小限）
- 実装が必要なら無彩色基調を保ちつつ、エラーは沈んだ赤 `#9c4a3c` 程度に留め、成功・強調は `#867d6b` を流用する

---

## 3. Typography Rules

> 明朝スタック一系統・**全編ウェイト 300**・**行間 2.3（段落は 1.5）**・letter-spacing 0.02em。SIWA の静けさはこの「細字＋広い行間」で作られている。

### 3.1 和文フォント

- **明朝体（主役）**: Noto Serif JP → 游明朝 → YuMincho → ヒラギノ明朝 → serif
- ゴシック体は本文では使わない（Products/Shop の一部システム UI で Arial に落ちる程度）

### 3.2 欧文フォント

- **セリフ**: Noto Serif JP 内蔵の欧文、および serif フォールバック
- **サンセリフ**: Arial / Helvetica（フォームの一部・動画 UI のみ）
- 欧文専用 Web フォントは主要導線では使わない

### 3.3 font-family 指定

```css
/* 本文・見出し共通（明朝の単一スタック） */
font-family: "Noto Serif JP", 游明朝, YuMincho, "Hiragino Mincho ProN",
             "ヒラギノ明朝 ProN", serif;
font-weight: 300;

/* 個別の見出し等では簡略化された宣言も併存 */
font-family: "Noto Serif JP", serif;
```

**フォールバックの考え方**:
- Noto Serif JP を先頭に置き、無い環境では游明朝 → ヒラギノ明朝 → serif に落とす
- Windows で MS 明朝に落ちても破綻しないよう末尾は必ず `serif`
- 明朝が本文でゴシックにならないことを最優先する

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading (h3) | Noto Serif JP | 25.2px | 300 | 1.4 (35.28px) | 0.01em | セクション見出し |
| Heading (h1) | Noto Serif JP | 19.6px | 300 | 1.6 (31.36px) | normal | ページ見出し |
| Lead / Link | Noto Serif JP | 18.2px | 300 | 2.3 (41.86px) | 0.02em | 大きめリンク・導入 |
| Body (段落) | Noto Serif JP | 16.8px | 300 | 1.5 (25.2px) | 0.02em | 読み物本文 |
| Body / Nav | Noto Serif JP | 14px | 300 | 2.3 (32.2px) | 0.02em | 標準テキスト・ナビ |
| Sub (h4) | Noto Serif JP | 12.6px | 300 | 1.3 (16.38px) | 0.02em | 小ラベル |
| Caption | Noto Serif JP | 12px | 300 | 1.4 (16.8px) | 0.02em | 補助テキスト |

- **すべて weight 300**。見出しでも太らせず、サイズと余白だけで階層を作るのが SIWA の流儀

### 3.5 行間・字間

- **標準テキスト・ナビの行間**: **2.3**（14px→32.2px、18.2px→41.86px）。極端に広い明朝の余白
- **段落本文の行間**: **1.5**（16.8px→25.2px）。読み物として詰めるところは詰める
- **見出しの行間**: 1.4〜1.6（25.2px→35.28px、19.6px→31.36px）
- **字間 (letter-spacing)**: **0.28px 固定（14px 基準で 0.02em）**。控えめな均等送り

**ガイドライン**:
- ナビ・単発テキストは line-height 2.0 以上、長い段落は 1.5〜1.8 に、と用途で切り替える
- letter-spacing は 0.02em 程度に抑える（広げすぎると紙面の締まりが失われる）
- 太字を使わず、weight 300 のまま組む

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

- 実測は `normal`。明朝のベタ組みを letter-spacing の均等送りで整える。見出しで詰めたい場合のみ `"palt" 1` を局所適用

### 3.8 縦書き

- 主要導線は横組み。ロゴ「S I W A｜紙 和」は字間を大きく開けた横組み
- 縦組みを用いる場合は明朝スタックのまま `writing-mode: vertical-rl; text-orientation: mixed;`

---

## 4. Component Stylings

### Buttons

SIWA は面色ボタンをほとんど使わず、**テキストリンク（トープの下線・色替え）** が主役。EC（Shop）の最小 UI にのみ矩形ボタンが出る。

**Primary（テキストリンク）**
- Background: `transparent`
- Text: `#867d6b`（トープ）／ ホバーで `#404040`
- Text Decoration: 下線、または前後に細い罫
- Font: Noto Serif JP, 18px 前後, weight 300

**Secondary（EC の矩形ボタン）**
- Background: `#ffffff`（または淡い面）
- Text: `#2b333f`
- Border: `1px solid #e0e0e0`
- Border Radius: `2px`（ごく僅かに丸める程度）
- Padding: `6px 14px`
- Font: 12〜14px

### Inputs

- Background: `#ffffff`
- Border: `1px solid #e0e0e0`（下線のみのミニマル実装でも可）
- Border (focus): `1px solid #867d6b`
- Border Radius: `2px`
- Padding: `8px 12px`
- Font: Noto Serif JP, 14px, weight 300
- Text Color: `#404040`

### Cards

- Background: `#ffffff`（または製品写真そのもの）
- Border: なし／必要時 `1px solid #efefef`
- Border Radius: `0`
- Padding: `24px`
- Shadow: なし（フラット）
- 製品写真を大きく置き、下に明朝で品名・素材を小さく添える。ヘアライン罫で仕切る

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

余白を広く取り、セクション間は XL〜XXL で「紙の間」を作る。

### Container

- Max Width: 1200px 目安（映像・写真は全幅ブリードを多用）
- Padding (horizontal): 24〜40px

### Grid

- Columns: 12（実運用は 1〜3 カラムの素朴な構成）
- Gutter: 24〜40px
- 製品一覧は写真中心のシンプルなグリッド。装飾を足さず罫線で区切る

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼ全要素がフラット |
| 1 | `0 2px 8px rgba(0,0,0,0.05)` | 使う場合のみ。ドロップダウン等 |
| 2 | `0 8px 24px rgba(0,0,0,0.08)` | モーダル・カート等の限定用途 |

- 基本は **影を使わない**。奥行きは余白と写真、ヘアライン罫で表現する

---

## 7. Do's and Don'ts

### Do（推奨）

- 明朝スタックの末尾を必ず `serif` にする
- 本文・見出しとも weight 300 で組み、サイズと余白で階層を作る
- テキスト色は `#404040`。純黒を避ける
- アクセントはトープ `#867d6b` に絞り、リンクや小見出しに静かに使う
- ナビ・単発テキストは line-height 2.0 以上、段落は 1.5 前後に切り替える
- 区切りは 1px のヘアライン罫で軽く

### Don't（禁止）

- 明朝の代わりにゴシックを本文に使わない
- 太字（weight 700）で強調しない
- トープ以外の鮮やかな彩色をアクセントに足さない
- 角丸や影を強くしてボタンを目立たせない（テキストリンク中心）
- line-height を 1.4 以下に詰めない（静けさが失われる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。映像・写真は全幅 |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 2〜3 カラム＋広い余白 |

### タッチターゲット

- 最小サイズ: 44px × 44px。テキストリンクは行間の広さでタップ領域を確保

### フォントサイズの調整

- モバイルでも本文 14〜16px を維持（明朝は細いため下げすぎない）
- 見出し 25px → 20px 程度に縮小。行間は据え置きで余白を保つ

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary/Accent: #867d6b   （トープ / リンク・小見出し）
Text Color:     #404040   （純黒は使わない）
Ink (締め色):   #2b333f
Background:     #ffffff
Font:           "Noto Serif JP", 游明朝, YuMincho, "Hiragino Mincho ProN", serif
Body Weight:    300（見出しも300）
Body Size:      14〜16.8px
Line Height:    2.3（ナビ・単発）／ 1.5（段落）
Letter Spacing: 0.02em
Button:         テキストリンク中心。面色ボタンは最小限（radius 2px）
```

### プロンプト例

```
SIWA｜紙和のデザインシステムに従って、製品紹介ページを作成してください。
- フォント: "Noto Serif JP", 游明朝, YuMincho, "Hiragino Mincho ProN", serif（見出しも本文も weight 300）
- テキスト色 #404040（純黒禁止）、letter-spacing 0.02em
- 行間はナビ・単発テキストで 2.3、段落本文で 1.5 に切り替える
- 背景は白。製品写真を全幅で大きく置き、余白を広く取る
- アクセントはトープ #867d6b のみ。リンクと小見出しに静かに使う
- ボタンはテキストリンク中心。区切りは 1px のヘアライン罫
- 影・角丸・太字は使わず、サイズと余白と細い罫線だけで構成する
```
