# DESIGN.md — KIGI（キギ）

> KIGI｜キギ（https://ki-gi.com/）のデザイン仕様書。
> アートディレクター 植原亮輔とデザイナー 渡邉良重が 2012 年に設立した東京のデザインスタジオ。DRAFT 在籍時に D-BROS を手がけた二人による、アートディレクション／グラフィック／プロダクト・アートを横断する制作を軸に据える。
> 最大の特徴は **極小で端正な和文ゴシック（FOT-筑紫ゴシック Pr5 L・10px）** と、**特大の欧文 Helvetica ディスプレイ（作品タイトル 65px / weight 700）** の落差、そして **アシッドなミント／ティール系のアクセント（#00c69e / #00ffcc）** を **柔らかいライトグレー #e6e6e6 の地** と **作品面の黒 #000000** に効かせる設計。文字色は純黒ではなく **温かみのある暗褐色 #221815**。全面に `font-feature-settings: "palt"` が効く。
> 実サイトの computed style 実測（2026-07-26 取得。CMS は WordPress）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **詩的でクラフト志向、遊びと精度の同居**。ナビゲーションや説明文は極小の和文ゴシックで囁くように置き、作品タイトルには特大の Helvetica を大胆にぶつける。この「小さい和文 × 大きい欧文」の落差そのものがスタジオの佇まいを作る
- **KIGI について**: アートディレクション・グラフィック・プロダクト／アートを横断するデザインスタジオ。Web はギャラリー然として作品写真を主役に置き、UI 要素は最小限。装飾より余白と組版で語る
- **密度**: 低密度・ギャラリー型。ライトグレーの地に作品サムネイルを並べ、ホバーで黒面へ沈める。テキストは極小・少量で、視線を写真に集める
- **キーワード**: ライトグレー #e6e6e6、暗褐色 #221815、極小筑紫ゴシック 10px、特大 Helvetica 65px、アシッドティール #00c69e、ミント #00ffcc、palt グローバル
- **特徴**:
  - 地色は **柔らかなライトグレー `#e6e6e6`**。純白でも純黒でもない中間色をキャンバスに使い、作品と余白を上品に沈める
  - 文字色は **温かみのある暗褐色 `#221815`**（茶を含んだ黒）。**純黒 `#000000` は作品サムネイル面・ホバー面にのみ**使い、テキストには使わない
  - 和文は **FOT-筑紫ゴシック Pr5 L（FONTWORKS）を 10px という極小**で用いる。ヒューマニストで空気感のあるゴシックを小さく組むのが KIGI の署名
  - 欧文は **Helvetica（Bold / Light）**。作品タイトルは **65px / weight 700 の白抜き**、ナビ "WORKS / WE ARE… / NEWS" は **28px / weight 700 のティール `#00c69e`**、フッターの "INSTAGRAM" / "info@ki-gi.com" は **Helvetica Light 30px / weight 200**
  - アクセントは **アシッドなミント／ティール**。ナビのティール `#00c69e`、メニューパネルの鮮烈なミント `#00ffcc`、落ち着いたティール `#78c2be` の三段。グレー／黒の地に対して効かせる
  - **`font-feature-settings: "palt"` がグローバル**に効く。極小の和文でも字詰めを整える
  - WordPress サイトのため `--wp--preset--*`（汎用パレット・グラデーション・影・font-size）が定義されるが、これらは**利用可能なトークンであってブランド色ではない**。ブランドの実体は暗褐色・ライトグレー・黒・アシッドティール

---

## 2. Color Palette & Roles

> 実測値。body の地は **ライトグレー `#e6e6e6`**、テキストは **暗褐色 `#221815`**、作品／ホバー面が **黒 `#000000`**。アクセントはアシッドなミント／ティール三段。WordPress の `--wp--preset--color--*` は汎用プリセットで、ブランド色とは区別する。

### Brand（ブランド）

- **Warm Near-Black** (`#221815`, rgb 34,24,21): 本文・ナビ・見出しのテキスト色。**茶を含んだ暗褐色**で、純黒より柔らかく温かい。KIGI がテキストに使う基本色
- **Light Gray Canvas** (`#e6e6e6`, rgb 230,230,230): body の地色。純白を避けた柔らかいライトグレーで、作品と余白を上品に沈めるキャンバス
- **Black** (`#000000`, `--wp--preset--color--black`): 作品サムネイル面・ホバー面。作品写真の背景や、ホバー時に沈む面にのみ使う。**テキストには使わない**

### Accent（アシッドティール／ミント）

- **Accent Teal** (`#00c69e`, rgb 0,198,158): ナビゲーション "WORKS / WE ARE… / NEWS" の欧文色。緑寄りのアシッドなティール。リンク・インタラクションの基準色
- **Vivid Mint** (`#00ffcc`, rgb 0,255,204): メニューパネル（`menu__left-col`）の面色。最も鮮烈なミント。オーバーレイ・強アクセントの面に使う
- **Muted Teal** (`#78c2be`, rgb 120,194,190): 落ち着いたティール。淡い面・補助アクセント。ミントを鎮めたトーン

### Neutral（面・罫）

- **White** (`#ffffff`, `--wp--preset--color--white`): カード面・反転文字。ライトグレー地の上に置く白面
- **Gray Border** (`#d9d9d9` 目安): 区切り線・入力欄の枠。ライトグレー地より一段濃いグレー
- **Sub Text** (`#6b6b6b` 目安): 補助テキスト。暗褐色 `#221815` を薄めたグレー

### Semantic（意味的な色）

- KIGI はスタジオ・ポートフォリオのため意味色は前面に希薄
- **Danger／Error**: 必要なら暖色の赤（`#cf2e2e`, `--wp--preset--color--vivid-red`）を流用
- **Success**: アクセントのティール `#00c69e` を成功・完了に流用してよい

---

## 3. Typography Rules

> 和文 **FOT-筑紫ゴシック Pr5 L（FONTWORKS）を 10px の極小**で、欧文 **Helvetica（Bold / Light）を 28〜65px の特大**で使う、極端な大小のコントラストが核心。全体に **`font-feature-settings: "palt"`** がグローバルに効く。テキスト色は暗褐色 `#221815`。

### 3.1 和文フォント

- **ゴシック体**: FOT-筑紫ゴシック Pr5 L（`TsukuGoPr5-L`。FONTWORKS のヒューマニスト・ゴシック Light）。本文・ナビ・キャプションの和文はこれ一系統
- 明朝体は使わない
- **極小運用が特徴**: 10px / weight 400 / line-height 15px（=1.5）という小ささで、空気感のある字面を作る

### 3.2 欧文フォント

- **サンセリフ（グロテスク）**: Helvetica。ディスプレイ・タイトルは `HelveticaLTWXX-Bold`、軽い表示は `HelveticaLTWXX-Light`。作品タイトル・ナビ・フッターの欧文に使う
- Helvetica はシステムフォントのため、実装・プレビューとも `"Helvetica Neue", Helvetica, Arial, sans-serif` のスタックで再現できる
- **preview.html での注記**: 和文の FOT-筑紫ゴシック Pr5 L は **FONTWORKS（Web フォント／ライセンス）** のため、ローカルの preview.html では表示できない。プレビューでは **Google Fonts の "Zen Kaku Gothic New"（weight 300/400/500）** を字形の近いヒューマニスト・ゴシック代替に用い、小サイズ＋字間調整＋ palt で雰囲気を寄せる。実装時は必ず FOT-筑紫ゴシック Pr5 L を読み込むこと

### 3.3 font-family 指定

```css
/* 和文（本文・ナビ・キャプション） */
font-family: "FOT-筑紫ゴシック Pr5 L", TsukuGoPr5-L, sans-serif;

/* 欧文ディスプレイ・タイトル（Bold） */
font-family: HelveticaLTWXX-Bold, HelveticaLTWXX-Light, Helvetica, sans-serif;

/* 欧文の軽い表示（フッター等・Light） */
font-family: HelveticaLTWXX-Light, Helvetica, sans-serif;

/* 全体に適用 */
font-feature-settings: "palt";
```

**フォールバックの考え方**:
- 和文は筑紫ゴシック Light を先頭に置き、無ければ `sans-serif` へ落とす
- 欧文ディスプレイは Bold → Light → Helvetica → `sans-serif`
- 末尾は必ず `sans-serif`
- `palt` はサイト全体に効かせる（極小の和文でも字詰めを整える）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Work Title | Helvetica Bold | 65px | 700 | 1.1 (71.5px) | normal | 作品タイトル（作品写真上・白抜き） |
| Nav | Helvetica Bold | 28px | 700 | 1.0 (28px) | normal | "WORKS / WE ARE… / NEWS"（ティール #00c69e） |
| Footer Link | Helvetica Light | 30px | 200 | 1.0 (30px) | 0（メール等は 0.058em） | "INSTAGRAM" / "info@ki-gi.com" |
| Body / Nav (JP) | 筑紫ゴシック Pr5 L | 10px | 400 | 1.5 (15px) | normal | 和文ナビ・本文・キャプション（極小） |

- 欧文は **weight 700（Bold）と 200（Light）の二極**。中間ウェイトは使わない
- 和文は **weight 400 の 10px 一択**に近い。サイズで階層を作らず、大小は欧文側で担う
- フッターのメールアドレスのみ **letter-spacing 1.75px（30px 基準で 0.058em）** と広げる

### 3.5 行間・字間

- **和文本文の行間 (line-height)**: **1.5**（10px→15px）。極小サイズを詰めすぎず、空気を残す
- **欧文ディスプレイの行間**: 作品タイトルは 1.1（65px→71.5px）、ナビ・フッターは 1.0（詰める）
- **字間 (letter-spacing)**: 基本は `normal`。**フッターのメールアドレスのみ 0.058em（1.75px）** と広げてリズムを作る
- **palt**: サイト全体に適用。極小和文の字詰めを整える署名的設定

**ガイドライン**:
- 和文は 10px という極小でも line-height 1.5 を確保し、詰めすぎない
- 欧文ディスプレイ（65px）は line-height を 1.0〜1.1 に締めて塊として見せる
- 大小のコントラスト（10px の和文 ↔ 65px の欧文）を恐れず作る。これが KIGI のリズム

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
font-feature-settings: "palt";   /* サイト全体にグローバル適用 */
```

- **palt**: KIGI は **サイト全体に palt を効かせる**。極小の和文ナビ・本文でも字詰めを整え、端正な字面を保つ
- 欧文 Helvetica にも同じ宣言が乗るが、主眼は和文の字詰め

### 3.8 縦書き

- 該当なし。主要導線はすべて横組み
- 用いる場合は `writing-mode: vertical-rl; text-orientation: mixed;`

---

## 4. Component Stylings

> **実サイトは塗りつぶし CTA を持たない**「タイポグラフィがナビゲーションを兼ねる」設計（極小の和文リンク＋特大の Helvetica）。以下のボタンは、その識別性を保ったまま実務用途に拡張した**推定・オンブランドの提案**。作品面の黒 `#000000` とアシッドティール `#00c69e` を基調にする。

### Buttons

**Primary（暗褐色・ソリッド）**
- Background: `#221815`（暗褐色。純黒 `#000000` を作品面に温存するため、UI ボタンは暗褐色を使う）
- Text: `#ffffff`
- Padding: `14px 22px`
- Border Radius: `0`（角丸を持たないシャープな矩形が KIGI のトーンに合う。柔らかくするなら 2px まで）
- Font: Helvetica Bold / 14px / weight 700、または筑紫ゴシック 10px
- Feature: `font-feature-settings: "palt"`

**Accent（ティール・アウトライン）**
- Background: `transparent`
- Text: `#00c69e`
- Border: `1px solid #00c69e`
- Padding: `13px 21px`
- Border Radius: `0`
- 用途: リンク的アクション・二次導線。ホバーで面を `#00c69e`、文字を白へ反転

**Text Link（欧文ナビ流用）**
- ティール `#00c69e` の Helvetica Bold（ナビと同じ）。下線なし。作品タイトルは白抜き 65px

### Inputs

- Background: `#ffffff`
- Border: `1px solid #d9d9d9`
- Border (focus): `1px solid #00c69e`（アシッドティール）
- Border Radius: `0`
- Padding: `12px 14px`
- Font: 筑紫ゴシック Pr5 L / 13〜14px（フォーム内は 10px より大きめに確保）
- Text Color: `#221815` / Placeholder: `#9a9a9a`

### Cards

- Background: `#000000`（作品サムネイル面）または `#ffffff`（情報カード）
- Border: なし
- Border Radius: `0`
- Padding: 写真は余白ゼロで全面、テキストは `14px 16px`
- Shadow: 基本フラット（Depth & Elevation 参照）
- 作品写真を全面に置き、ホバーで黒面 `#000000` に沈めて白抜きの作品タイトル（Helvetica 65px 相当）を出す。品名・キャプションは極小の筑紫ゴシック

---

## 5. Layout Principles

### Spacing Scale

WordPress の `--wp--preset--spacing--*`（rem 基準）を px 換算した実トークン：

| Token | Value | 由来 |
|-------|-------|------|
| XS | 7px | `--spacing--20` = 0.44rem |
| S | 11px | `--spacing--30` = 0.67rem |
| M | 16px | `--spacing--40` = 1rem |
| L | 24px | `--spacing--50` = 1.5rem |
| XL | 36px | `--spacing--60` = 2.25rem |
| XXL | 54px | `--spacing--70` = 3.38rem |
| XXXL | 81px | `--spacing--80` = 5.06rem |

余白は広めに取り、作品グリッドの間はライトグレーの地を効かせる。

### Container

- Max Width: 1280px 目安（作品グリッド・ヒーローは全幅ブリード）
- Padding (horizontal): 24〜40px

### Grid

- Columns: 作品一覧は 2〜3 カラムの写真グリッド
- Gutter: 16〜24px
- 作品サムネイルは正方（`--wp--preset--aspect-ratio--square` = 1）や 4:3 を基準に、ホバーで黒面へ反転

---

## 6. Depth & Elevation

WordPress プリセットの影トークンが実在する。KIGI のトーンでは、ぼかしの少ない **sharp / crisp（オフセット影・ぼかしゼロ）** がグラフィカルで相性が良い。

| Level | Shadow | 由来 / 用途 |
|-------|--------|------|
| 0 | none | 既定。ライトグレー地でフラットに構成 |
| 1 | `6px 6px 9px rgba(0,0,0,0.2)` | `--shadow--natural`。カード・浮遊要素の自然な影 |
| 2 | `6px 6px 0px rgba(0,0,0,0.2)` | `--shadow--sharp`。ぼかしゼロのオフセット影（グラフィカル） |
| 3 | `6px 6px 0px rgba(0,0,0,1)` | `--shadow--crisp`。黒のくっきりしたオフセット影（作品的な強調） |

- 奥行きは基本的に **ライトグレー地と黒面のコントラスト** で表現し、影を使う場合は **sharp / crisp のオフセット影**でグラフィックの手触りを出す

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文は FOT-筑紫ゴシック Pr5 L を **極小（10px 前後）** で、欧文 Helvetica を **特大（28〜65px）** で使い、大小のコントラストを作る
- テキスト色は暗褐色 `#221815` を使う（純黒ではなく温かみのある黒）
- 地色は柔らかいライトグレー `#e6e6e6`。作品面・ホバー面にのみ黒 `#000000` を使う
- アクセントはアシッドなティール／ミント（`#00c69e` / `#00ffcc` / `#78c2be`）をグレー・黒の地に効かせる
- `font-feature-settings: "palt"` をサイト全体に効かせる
- 欧文ウェイトは 700（Bold）と 200（Light）の二極で使い分ける
- 影を使うなら sharp / crisp のオフセット影でグラフィカルに

### Don't（禁止）

- テキストに純黒 `#000000` を使わない（KIGI のテキストは暗褐色 `#221815`。純黒は作品面専用）
- 地色に純白を使わない（ライトグレー `#e6e6e6` が KIGI のキャンバス）
- 和文を大きくして欧文と同格に扱わない（10px の和文 × 特大 Helvetica の落差が署名）
- 欧文に中途半端な中間ウェイトを使わない（Bold 700 / Light 200 の二極）
- アクセントのミント／ティールを多用して面を埋めない（グレー・黒の地に点で効かせる）
- `palt` を切らない（極小和文の字詰めが崩れる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1〜2 カラムの作品グリッド。ヒーローは全幅 |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 2〜3 カラム＋広い余白 |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。極小の和文リンクはタップ領域を padding で確保する

### フォントサイズの調整

- 和文本文は 10px を基準に、モバイルでは可読性のため 11〜12px まで上げてよい
- 欧文の作品タイトル 65px → モバイルでは 36〜44px 程度に縮小。ナビ 28px → 20px 程度。行間は締めたまま保つ

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Text Color:     #221815   （暗褐色。純黒ではなく温かみのある黒）
Canvas/BG:      #e6e6e6   （柔らかいライトグレー）
Work/Hover:     #000000   （作品面・ホバー面のみ）
Accent:         #00c69e（ティール・ナビ/リンク） / #00ffcc（ミント・面） / #78c2be（淡ティール）
JP Font:        "FOT-筑紫ゴシック Pr5 L", TsukuGoPr5-L, sans-serif
EN Font:        HelveticaLTWXX-Bold, HelveticaLTWXX-Light, Helvetica, sans-serif
JP Body Size:   10px（極小） / weight 400 / lh 1.5
EN Display:     28〜65px / weight 700（Bold）・フッターは 200（Light）
Feature:        font-feature-settings: "palt"（全体）
Radius:         0（シャープな矩形）
```

### プロンプト例

```
KIGI（キギ）のデザインシステムに従って、デザインスタジオの作品紹介ページを作成してください。
- 地色は柔らかいライトグレー #e6e6e6。テキストは暗褐色 #221815（純黒は使わない）
- 和文は "FOT-筑紫ゴシック Pr5 L"（無ければ sans-serif）を 10px・weight 400・行間 1.5 の極小で組む
- 作品タイトルは Helvetica Bold の特大（65px 相当・weight 700・白抜き）で大胆に置く
- ナビゲーション "WORKS / WE ARE… / NEWS" は Helvetica Bold 28px・weight 700・ティール #00c69e
- 作品サムネイルは黒面 #000000 の上に写真を全面配置し、ホバーで黒に沈めて白抜きタイトルを出す
- アクセントのミント／ティール（#00c69e / #00ffcc / #78c2be）はグレー・黒の地に点で効かせる
- font-feature-settings: "palt" をサイト全体に適用。角丸は 0 のシャープな矩形
- 影を使う場合は crisp なオフセット影 6px 6px 0px rgba(0,0,0,1) でグラフィカルに
```
