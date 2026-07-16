# DESIGN.md — Landscape Products (ランドスケーププロダクツ)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 対象サイト: https://landscape-products.net/
> Landscape Products（BAGN Inc.）は、家具・プロダクトデザイン、インテリアデザイン、ショップ（Playmountain 等）、コーヒーカルチャーを手がける東京のデザインスタジオ。
> 純黒 `#000000` のフルブリード画像ステージを主役に、明るい `#f1f1f0` の UI パネルへ黒テキストを小さく静かに組む、ギャラリーのように寡黙なレイアウト。
> 実測はブランドサイト トップ（フルスクリーン スライドショー）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 画面全体を占める純黒 `#000000` の画像ステージ（フルスクリーンのスライドショー）を主役に据え、その周囲・下部に明るい `#f1f1f0` の UI パネルを敷いて情報を静かに置く。写真が語り、UI は極小のグロテスク体テキストとリンクだけに徹する。装飾・面塗り・影を持たない
- **密度**: 低密度。文字は 11〜16px 基調と全体に小さく、広い余白と行間（≒1.8）でゆったり配置する。面で埋めず、余白と写真で領域を分ける
- **キーワード**: ギャラリー / イメージフォワード / 黒のステージ / 寡黙 / ニュートラル グロテスク
- **形状言語**: CTA は面塗りボタンを持たず、テキストリンク（＋必要に応じて 1px の細罫アンダーライン）が基本。角丸はほぼゼロ（`border-radius: 0` 基調）。丸みや影で飾らず、写真と余白で構成する
- **書体の性格**: ニュートラルなグロテスク（カスタム "CBold" / "CRegular"）を**ウェイト 500** で通し、欧文ラベルや数字には Inter を併用する。字間はごくわずか（≒0.01em）。太らせず、大きくせず、小さく静かに置くのがこのブランドの流儀

---

## 2. Color Palette & Roles

<!-- 実サイトの pageBackground / computedStyles / interactive 実測に基づく。基調は「純黒の画像ステージ＋明るいオフホワイトの UI パネル」 -->

### Base（下地）

- **Stage Black** (`#000000`): ヒーローのフルスクリーン画像スライドが乗る純黒のステージ（実測 `div::before.bg_slide_wrap`、上部 viewport の支配色＝面積 7.29M px）。画像を引き立てる暗い舞台であり、CSS 変数 `--wp--preset--color--black: #000000` に一致
- **Panel Light** (`#f1f1f0`): メニュー・コンテンツ パネルの下地（rgb(241,241,240)）。`body` の実測背景で、上部 viewport サンプル 12 点すべてがこの色。ごくわずかに緑みを帯びた明るいオフホワイト
- **Ink Black** (`#000000`): 明るいパネル上の見出し・本文・罫・リンクの基調色。純黒
- **White** (`#ffffff`): 黒ステージ・写真の上に乗るテキスト色。純白

### Text（文字色）

- **Text on Light** (`#000000`): 明るいパネル上のテキスト。純黒
- **Text on Dark** (`#ffffff`): 黒ステージ・画像上のテキスト。純白

### 色に関する設計思想

- 基調は「純黒の画像ステージ `#000000`」「明るいパネル `#f1f1f0`」「純黒 or 純白のテキスト」の実質2〜3色。彩色はほぼ写真に委ねる
- **未装飾のリンクがデフォルト青 `rgb(0,0,238)` として一部で計測されるが、これはブランドカラーではない**。ブランドのリンクは黒 `#000000`。青は無視すること
- ブランドの世界観は「色」ではなく「黒のステージ・大判写真・余白・極小のグロテスク体」で作る。色数を絞ることでギャラリーのような静けさを保つ

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: カスタム グロテスク "CBold" / "CRegular"（→ 代替は Noto Sans JP）を基本に、`-apple-system`（ヒラギノ角ゴ ProN）→ 游ゴシック → メイリオへフォールバック
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ（本文・見出し・ラベル）**: カスタム グロテスク **"CBold" / "CRegular"**（ニュートラルなネオグロテスク。実測ウェイト **500**）。加えて欧文ラベル・数字に **Inter** を併用する
- **セリフ / 等幅**: 使用しない

> **代替フォントの注記**: "CBold" / "CRegular" はライセンスされたカスタム グロテスクで、ローカル・preview.html では表示できない。
> - "CBold" / "CRegular"（Latin）→ **Inter**（ニュートラルなグロテスクで印象が近い。Google Fonts で読み込み可）
> - 和文 → **Noto Sans JP**（Google Fonts で直接読み込める）
> - 実サイトの実測 font-family（フォールバックチェーン全体）:
>   `CBold, Inter, MFW-PFutoGoB101Pr6N-Medium, -apple-system, "Hiragino Kaku Gothic ProN", "Noto Sans JP", 游ゴシック, YuGothic, "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, sans-serif`

### 3.3 font-family 指定

```css
/* 本文・UI（和文） */
font-family: "Noto Sans JP", system-ui, -apple-system, sans-serif;

/* 欧文ラベル・数字 */
font-family: "CBold", "Inter", "Helvetica Neue", Arial, sans-serif;
```

**フォールバックの考え方**:
- 実サイトは欧文カスタム体 → Inter → 和文 → OS フォントの順で単一チェーンにまとめている
- preview では和文 UI を Noto Sans JP、欧文ラベルを Inter に分けて指定する
- 見出し・本文・ラベルとも**ウェイトは 500 で統一**。階層はサイズと余白で作り、太さでは作らない

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (EN) | CBold → Inter | 54.72px | 500 | 1.0 | 0.003em | ヒーロー／header の大型欧文（span 実測 54.72px） |
| Heading (JP/EN) | CBold → Noto Sans JP | 16px | 500 | 1.8 | 0.01em | セクション見出し（lh 28.8px ≈ 1.8） |
| Nav Label (EN) | CBold → Inter | 14px | 500 | 1.0 | normal | グローバルナビ（Product Design 等） |
| Body (JP) | Noto Sans JP | 16px | 500 | 1.8 | 0.01em | 本文（lh 28.8px ≈ 1.8） |
| Body Small (JP) | Noto Sans JP | 12px | 500 | 1.7 | 0.01em | 補足本文（白文字 / 画像上, lh 20.4px） |
| Caption / Footer (JP) | Noto Sans JP | 11px | 500 | 1.8 | 0.01em | キャプション・フッター（lh 19.8px ≈ 1.8） |

### 3.5 行間・字間

- **本文・見出しの行間 (line-height)**: `1.8`（16px 本文で 28.8px）。日本語の可読性と静けさのため広めに取る
- **キャプション／フッターの行間**: `1.8`（11px で 19.8px）
- **欧文ナビ／大型ディスプレイの行間**: `1.0`（サイズ＝行高で詰める）
- **字間 (letter-spacing)**: `0.16px`（16px で ≒`0.01em`）。全体にごくわずかだけ開く。ナビラベル（14px）は `normal`
- BAUM のような大きなトラッキング（0.08em）は使わない。**ほぼ字間なしの均一なグロテスク**が特徴

**ガイドライン**:
- 文字は 11〜16px と全体に小さく、`line-height: 1.8` を確保して読ませる
- ウェイトは 500 に統一し、サイズと余白で階層を作る（太字で強調しない）
- 字間は 0.01em ほどのごく僅か。開きすぎない・詰めすぎない

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
font-feature-settings: normal;  /* palt は使わない */
```

- 実測では `font-feature-settings: normal`。palt は使わず、字間は `letter-spacing`（≒0.01em）で微調整する
- カスタム グロテスクを素の字幅で置くことで、均一で寡黙な印象を保つ

### 3.8 縦書き

該当なし（横書きのみ）。

---

## 4. Component Stylings

面塗りボタンを持たず、テキストリンク基調。装飾・影・強い角丸を避ける（`border-radius: 0` 基調）。

### Buttons / Links（CTA）

実サイトでは面塗りの CTA ボタンは計測されず、CTA はテキストリンク／ナビ スタイル。

**Text Link（基本）**
- Background: `transparent`
- Text: `#000000`（明るいパネル上）/ `#ffffff`（黒ステージ・画像上）
- Border: なし、または hover 時に 1px の細罫アンダーライン
- Font: 14–16px / weight 500 / letter-spacing ≒0.01em（14px は normal）
- 例: 「Product Design」「Interior Design」「Shop」

**Outline（補助・任意）**
- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #000000`
- Border Radius: `0px`
- Padding: `10px 20px`
- Font: 14px / weight 500
- 面塗りを避けたい本ブランドで、どうしても囲みが必要な場合のみ

### Inputs

- Background: `#ffffff`（または `#f1f1f0` のまま）
- Border: `1px solid #000000`（細い黒罫、または下線）
- Border (focus): `1px solid #000000`（罫を維持し、下線を濃くする）
- Border Radius: `0px`
- Padding: `12px 14px`
- Font Size: 14–16px

### Cards

- Background: `#f1f1f0`（パネルのまま）または `#ffffff`
- Border: なし（写真＋テキストのみ）、または `1px solid #000000` の細罫
- Border Radius: `0px`
- Shadow: なし（フラット）
- プロジェクトカードは大判写真＋カテゴリ名（Product Design / Interior Design / Shop）＋短いキャプションの最小構成。角ゼロで端正に

---

## 5. Layout Principles

### Spacing Philosophy

黒のフルブリード画像ステージを主役に据え、その下・周囲に明るい `#f1f1f0` のパネルで情報をゆったり置く。要素は面や罫で囲まず、広い余白で分ける。密度は上げない。

### Spacing Scale（推定）

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 48px |
| XL | 80px |
| XXL | 120px |

### Container

- Max Width: 1280px（ヒーロー／画像ステージはフルブリード＝画面全幅）
- Padding (horizontal): 24–40px

### Grid

- Columns: 12（プロジェクト一覧は 2〜3 カラム）
- Gutter: 24–40px
- 大判写真をゆったり配置し、キャプションは短く小さく添える

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼ全ての面はフラット |
| 1 | `0 1px 3px rgba(0,0,0,0.08)` | ドロップダウン等の最小限の浮き |
| 2 | `0 8px 24px rgba(0,0,0,0.12)` | モーダル・ナビのオーバーレイ |

- 影はほぼ使わない。奥行きは「黒のステージ」「大判写真」「余白」で表現する

---

## 7. Do's and Don'ts

### Do（推奨）

- ヒーロー／メインビジュアルは純黒 `#000000` のフルブリード画像ステージにする（写真が主役）
- UI パネルは明るい `#f1f1f0`、その上のテキストは純黒 `#000000`。黒ステージ・画像上のテキストは純白 `#ffffff`
- 文字は 11〜16px と小さく、**ウェイト 500** で統一し、line-height 1.8 を確保する
- 字間はごくわずか（≒0.01em）。均一なグロテスク体（CBold → Inter / 和文 Noto Sans JP）で組む
- CTA はテキストリンク基調。面塗りボタン・角丸・影を避ける（`border-radius: 0`）
- ナビ・カテゴリは「Product Design」「Interior Design」「Shop」のように短い欧文ラベルで

### Don't（禁止）

- 未装飾リンクのデフォルト青 `rgb(0,0,238)` をブランドカラーとして扱わない（ブランドのリンクは黒）
- 彩度の高い面塗り・原色を使わない（彩りは写真に委ねる）
- 文字を太字（700 等）で強調しない・大きくしない（500・小サイズ・余白で階層を作る）
- 角丸・強い影・面塗りボタンを足さない（フラット・角ゼロ・テキストリンク基調）
- 和文フォント1つだけを指定しない（必ずフォールバックチェーンを書く）
- 黒ステージと明るいパネルのコントラストが生む静けさを、装飾で壊さない

---

## 8. Responsive Behavior

### Breakpoints（推定）

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | 1 カラム。ナビはハンバーガー＋オーバーレイ。画像ステージは全幅 |
| Tablet | ≤ 1024px | 2 カラム |
| Desktop | > 1024px | 2〜3 カラム＋フルブリード画像ステージ |

### タッチターゲット

- 最小サイズ: 44px × 44px

### フォントサイズの調整

- 本文は 16px 基調だが、モバイルでも 11px 未満に落とさず line-height 1.8 を保つ
- 大型ディスプレイ欧文（54.72px）はモバイルで 32〜40px に縮小。ウェイト 500 は維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Stage(黒ステージ):  #000000（フルブリード画像）
Panel(明パネル):    #f1f1f0
Ink / 罫 / リンク:  #000000
Text on Dark:       #ffffff
Font(JP):     "Noto Sans JP", system-ui, -apple-system, sans-serif
Font(EN):     "CBold", "Inter", "Helvetica Neue", Arial, sans-serif（→ Inter 代替）
Weight:       500（全体で統一）
Body Size:    11–16px
Line Height:  1.8（本文・見出し）
字間:         ≒0.01em（14px ナビは normal）
palt:         off / font-feature-settings: normal
Radius:       0（全要素）
CTA:          テキストリンク基調（面塗りボタンなし）
Card:         radius 0 / shadow なし / 写真＋短いキャプション
無視する色:   デフォルト青 rgb(0,0,238)（ブランド色ではない）
```

### プロンプト例

```
Landscape Products のデザインシステムに従って、家具・プロダクトデザイン スタジオのプロジェクト一覧を作成してください。
- ヒーローは純黒 #000000 のフルブリード画像ステージ、テキストは白 #ffffff
- コンテンツ／メニュー パネルは明るい #f1f1f0、その上のテキストは黒 #000000
- フォント（和文）: "Noto Sans JP", system-ui, -apple-system, sans-serif
- フォント（欧文ラベル）: "CBold"（→ Inter 代替）, "Inter", "Helvetica Neue", Arial, sans-serif
- 文字は 11〜16px・ウェイト 500 で統一、line-height 1.8、字間 ≒0.01em
- すべての面・入力欄は border-radius: 0、影なし
- CTA はテキストリンク基調（面塗りボタンは使わない）
- プロジェクトカードは大判写真＋カテゴリ名（Product Design / Interior Design / Shop）＋短いキャプション
- 未装飾リンクのデフォルト青は使わない。リンクは黒
```

### Web ライセンスフォントが使えない環境での代替指針

- 欧文 CBold / CRegular → **Inter**（ニュートラルなグロテスク）
- 和文 → **Noto Sans JP**（Google Fonts で直接利用可）
- 代替でも「純黒のフルブリード画像ステージ・明るい #f1f1f0 パネル・極小で均一なウェイト 500 のグロテスク体・広い余白・テキストリンク基調」を守れば世界観は再現できる
