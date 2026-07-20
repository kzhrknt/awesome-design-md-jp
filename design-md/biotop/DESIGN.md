# DESIGN.md — BIOTOP（ビオトープ）

> BIOTOP（https://www.biotop.jp/）のデザイン仕様書。
> 東京・大阪・福岡・神戸・札幌に展開する、アパレル／フラワーショップ／カフェを内包した複合セレクトショップ（JUN グループ／WordPress ベース）。
> 最大の特徴は **画像を全面に敷き、その上に白文字を直接置く「雑誌の見開き」構成**、**din-2014 の大文字英字タイポグラフィ**、そして差し色をディープグリーン `#354443` ただ一色に絞った設計。角は基本的に立て（radius 0）、唯一 **タグ／ラベルだけが完全なピル（radius = 1.5em）** になる。
> 実サイトの computed style 実測（2026-07-20 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **画像が主役、UI は文字だけ**。全面写真の上に白の din-2014 を直接重ね、枠・影・装飾を持たない。ショップサイトというよりカルチャー誌のレイアウト
- **BIOTOP について**: 南貴之がディレクションした複合ショップ。アパレル・フラワー・カフェ・ギャラリーが同居する空間性を、Web でも「異なる写真ブロックの並置」で表現する
- **密度**: 低密度。1 ブロック＝1 ビジュアル＋数語の英字。スクロールするほど大判の写真パネルが切り替わる
- **キーワード**: din-2014、全面写真、白抜き文字、ディープグリーン #354443、大文字英字、ピルタグ、palt、余白、エディトリアル
- **特徴**:
  - 書体は **din-2014（Adobe Fonts）＋和文 游ゴシック系** の一系統。明朝は使わない
  - **`font-feature-settings: "palt"` がグローバル適用**（body から全要素へ継承）。和文は常に詰め組み
  - **`letter-spacing` もグローバルに約 0.05em**。英字大文字を広めに送って誌面感を出す
  - 有彩色は **ディープグリーン `#354443` のみ**。それ以外は白・黒・グレー
  - 面は **radius 0 の矩形パネル**。ただし **タグ／カテゴリラベルだけはピル（radius 1.5em、透明地＋1px 白枠）**
  - ウェイトは **300（Light）と 400（Regular）の二択**。太字（700）を使わない
  - 見出しは **フルードサイズ**（ビューポート連動）。1440px で 72px、日付や補助ラベルは 9px 台まで落ちる

---

## 2. Color Palette & Roles

> 実測値。CSS Custom Properties は WordPress のプリセット（`--wp--preset--color--*`）のみで、ブランド専用の変数は定義されていない。色は各コンポーネントに直接指定されている。

### Brand

- **BIOTOP Green** (`#354443`): 唯一のブランドカラー。深い青みのグリーン（≒モスグリーン）。BIOTOP PEOPLE / ONLINE 等の特集パネルのベタ地に使い、上に白文字を置く
- **Green Tint 15%** (`rgba(53, 68, 67, 0.15)` ≒ `#e1e3e3`): フッターの地。白地の上にブランドグリーンを 15% 敷いた淡いグレーグリーン

### Neutral（背景・面）

- **White** (`#ffffff`): ページ背景（`body` / `--wp--preset--color--white`）。写真パネル以外はすべて白
- **Panel Grey** (`#eaeaea`): 二次パネル（BIOTOP ONLINE カード等）の地。黒文字と組む
- **Black** (`#000000`): 本文・白地上の見出しテキスト

### Text

- **Text on White** (`#000000`): 白地・グレー地でのテキスト（純黒を使う）
- **Text on Image / Green** (`#ffffff`): 写真パネル・グリーンパネル上のテキスト。BIOTOP の主要テキストはほぼこちら
- **Text Green** (`#354443`): 白地上の補助テキスト（`(LATEST POST: 14.07.2026)` 等）に使う控えめな有彩テキスト

### Semantic

- 実サイトに独立したエラー／警告色は存在しない（フォーム UI が最小限のため）
- 実装が必要な場合は無彩色基調を崩さない範囲で `#b23b32`（エラー）を控えめに当て、成功は `#354443` を流用する

---

## 3. Typography Rules

> 全要素が同一の font-family を継承する単一スタック設計。**`palt` と `letter-spacing: 0.05em` がグローバルに効いている**のが最大の特徴で、和文・欧文とも常に詰め＋送りのかかった状態になる。

### 3.1 和文フォント

- **ゴシック体**: `游ゴシック` → `YuGothic` → `"Yu Gothic medium"` → `"Hiragino Sans"` → `Meiryo` の順
  - macOS では 游ゴシック、Windows では Yu Gothic（Medium 指定を挟んでウェイト不足を回避）、フォールバックにヒラギノ角ゴ／メイリオ
  - 日本語名 `游ゴシック` と英語名 `YuGothic` を**両方**書くのが実装上のポイント
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ**: `din-2014`（Adobe Fonts）。DIN 系のジオメトリック・グロテスク。BIOTOP の英字表現の核
- 見出し・ナビ・タグはほぼすべて **大文字（BIOTOP / ONLINE STORE / SHOP ALL / PICK UP）**
- **セリフ／等幅**: 使用しない

### 3.3 font-family 指定

```css
/* 全要素共通（body から継承） */
font-family: din-2014, 游ゴシック, YuGothic, "Yu Gothic medium",
             "Hiragino Sans", Meiryo, "sans-serif";
```

**フォールバックの考え方**:
- **欧文優先**。din-2014 を先頭に置き、ラテン字形は必ず DIN で出す
- 和文は 游ゴシック系 → ヒラギノ → メイリオと OS を横断してカバーする
- 実サイトでは末尾が `"sans-serif"` と**クォート付き**で書かれている（generic family としては無効な記法だが、前段のフォールバックが厚いため実害は出ていない）。**再実装時はクォートを外して `sans-serif` と書くこと**

**preview.html での代替フォント**:
- din-2014 は Adobe Fonts のドメインライセンスのためローカルでは表示できない。**Barlow（Google Fonts）** で代替する。Barlow は DIN 系の低コントラスト・グロテスクで、squarish な字面と大文字比率が din-2014 に最も近い
  - 次点の候補: **Archivo**（よりニュートラルなグロテスク。字幅は広め）
- 和文は `游ゴシック` 系のスタックをそのまま維持し、非搭載環境向けに **Noto Sans JP** を末尾に足す

### 3.4 文字サイズ・ウェイト階層

> デスクトップ（1440px）実測 px。**基準 13px に対する em スケール＋ビューポート連動のフルードサイズ**の併用で、値が 9.1 / 14.95 / 19.89 のような端数になる。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display / Feature Title | din-2014 | 72px（≒5vw） | 400 | 1.0 (71.89px) | 0.045em | `BIOTOP PEOPLE` 等の特集大見出し。白文字 |
| Display Light | din-2014 | 60px（≒4.1vw） | 300 | 1.0 (59.67px) | 0.045em | ブランド名の Light ウェイト表示 |
| Heading 1 | din-2014 | 29px | 300 | 1.2 (34.79px) | 0.045em | `PICK UP` 等のセクション見出し |
| Heading 2 | din-2014 | 21px | 300 | 1.2 (25.12px) | 0.045em | `News` 等のサブ見出し |
| Heading 3 | din-2014 | 19.9px | 400 | 1.0 (19.89px) | 0.033em | `ALL TOPICS` / `TOKYO` ナビ見出し |
| Lead / Caption | din-2014 | 18px | 300 | 1.6 (28.70px) | 0.04em | `(LATEST POST: …)` 等。色 #354443 |
| Nav Item (L) | din-2014 | 16px | 400 | 1.8 (28.78px) | 0.041em | メニューの主要項目（`ALL` 等） |
| Nav Item (M) | din-2014 | 15px | 300 | 1.4 (20.93px) | 0.043em | メニューの下層項目（`ABOUT` 等） |
| Body / Base | din-2014 | 13px | 400 | 1.8 (23.4px) | 0.05em | `body` の基準値。汎用テキスト |
| Tag / Pill | din-2014 | 13px | 400 | 1.0 (13px) | 0.05em | `EVENT` `#exclusive` 等のピルラベル |
| Small / Meta | din-2014 | 9.1px | 400 | 1.0–1.2 | 0.071em | `LATEST POST: 14.07.2026` / `Search` |

- **ウェイトは 300 と 400 の二択**。見出しほど Light（300）に振り、小さい文字を Regular（400）にする**逆説的な使い分け**が BIOTOP らしさ
- **700（Bold）は使わない**。強調はサイズと余白で作る
- 数字・日付は `20.05.2026` のように **ドット区切りの欧文表記**で統一する

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.8**（13px に対し 23.4px）。和文本文としてゆったりした標準値
- **見出しの行間**: **1.0**（大見出し）〜**1.2**（中見出し）。大きな英字は行送りを詰めてブロックとして見せる
- **字間 (letter-spacing)**: **グローバルに約 0.05em**。`body` に `0.65px / 13px = 0.05em` が指定され、全要素へ継承される
  - 大きな見出しでは相対的に 0.045em 前後まで下がる（px 固定ではなく em 系で追随している）
  - 小さいメタテキスト（9.1px）では 0.65px がそのまま効くため実効 **0.071em** と広くなり、結果的に極小文字の可読性が上がっている

**ガイドライン**:
- 白抜き文字は写真の上に置くため、字間を詰めすぎない（0.045em 以上を維持）
- 和文本文は line-height 1.8 を基準にする

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 和文の標準的な行頭・行末禁則を守る
- 行頭禁止: `）」』】、。・：；？！` ／ 行末禁止: `（「『【`
- **英字の見出し（BIOTOP PEOPLE / ONLINE STORE）は改行位置を手動で制御する**。単語途中で折り返さない

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";
```

- **`palt` がグローバルに適用されている**（`body` に指定 → 全要素へ継承）。BIOTOP は本文も含めて和文をプロポーショナル詰めする
- 実測上 `palt` が効いていないのは、ブラウザ既定のままの `<button>` / `<input>`（`font-feature-settings: normal`、`font-family: Arial`）のみ。**これはフォーム要素へのスタイル未適用によるもので、意図された設計ではない**。再実装時はフォーム要素にも同じ font-family と `palt` を当てること
- `palt` と `letter-spacing: 0.05em` の併用が BIOTOP の字組みの正体（詰めてから均等に開く）

### 3.8 縦書き

該当なし。横書きのみ。

---

## 4. Component Stylings

### Buttons

> BIOTOP の CTA は「塗りボタン」ではなく **写真パネルそのもの** と **枠だけのピルタグ** の二種類。塗りつぶしボタンは存在しない。

**Pill Tag（透明地・白枠）** — `EVENT` `#exclusive` `#BIRKENSTOCK for BIOTOP`
- Background: `transparent`
- Text: `#ffffff`（din-2014 / 13px / 400 / letter-spacing 0.05em / palt）
- Border: 1px solid `#ffffff`
- Border Radius: `19.5px`（= 1.5em。**完全なピル**）
- Padding: `2.6px 6.5px`（= 0.2em 0.5em）
- 大きめのバリエーション: font-size 19.6px / radius 27.5px / padding `0 11.8px`
- 写真の上に直接置くことを前提とした形。地色を持たせない

**Panel Link（写真／ベタ地パネル全体がリンク）**
- Background: `#354443`（グリーンパネル）または `#eaeaea`（グレーパネル）または写真
- Text: `#ffffff`（グリーン／写真上）または `#000000`（グレー上）
- Border: なし
- Border Radius: `0px`
- Padding: `30px`（グリーン）/ `20px 30px 30px`（グレー）
- Font: din-2014 / 13px / 400 / line-height 1.8

**Nav Link（テキストリンク）**
- Background: `transparent` / Border: なし / Radius: `0px`
- Text: `#ffffff`（オーバーレイメニュー内）
- Padding: `13px 13px 26px`
- 下線を持たず、位置と余白だけでリンクを示す

### Inputs

> 実サイトのフォームは検索窓のみで、ブラウザ既定スタイルのまま（`font-family: Arial`）。以下は BIOTOP のトーンに沿った推奨実装。

- Background: `transparent`（写真／グリーン上）または `#ffffff`（白地）
- Border: なし ＋ 下線 1px solid `rgba(255,255,255,0.5)`（オーバーレイ内）/ 1px solid `#354443`（白地）
- Border (focus): 下線 1px solid `#ffffff` / `#354443`
- Border Radius: `0px`
- Padding: 約 `8px 0`
- Font: din-2014 / 13px / letter-spacing 0.05em / `font-feature-settings: "palt"`
- Label: din-2014 / 9.1px / 400 / 大文字（`SEARCH` 等）

### Cards

- Background: 写真（全面）／ `#354443` ／ `#eaeaea`
- Border: なし
- Border Radius: `0px`
- Padding: `20px 30px 30px` 前後
- Shadow: なし（完全フラット）
- 構成: 大判ビジュアル ＋ 日付（`20.05.2026`）＋ 連番（`No.51`）＋ 大文字の名前（`MARI OKAMOTO`）
- カードは**すき間なく並べる**（gap 0）。パネル同士の色・写真の切り替わりが区切りになる

---

## 5. Layout Principles

### Spacing Scale

> 実測から読み取れる基本単位は **13px（本文サイズ）とその倍数**。パネル内側は 30px。

| Token | Value | 用途 |
|-------|-------|------|
| XS | 6.5px | ピルタグの左右 padding |
| S | 13px | ナビ項目の padding、行間の基準 |
| M | 20px | パネル上部の padding |
| L | 26px | ナビ項目の下 padding |
| XL | 30px | パネル内側の標準 padding |
| XXL | 35px | ヘッダーの左右 padding |

### Container

- **Max Width: なし（フルブリード）**。写真パネルはビューポート幅いっぱいに広がる
- ヘッダーのみ左右 `35px` の padding を持つ
- テキストブロックはパネル内側の 30px padding だけで位置を決める

### Grid

- Columns: **2 分割（1/2 + 1/4 + 1/4 等の不等分割）** を多用する
- Gutter: **0px**。パネルを隙間なく敷き詰め、色と写真の切り替わりで区切る
- 縦方向もセクション間の余白を取らず、パネルを直接連結する

---

## 6. Depth & Elevation

> BIOTOP は影を一切使わない。**面の色と写真の切り替わりだけ**で階層をつくる完全フラット設計。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 全コンポーネントの基本。実測でも全要素 `box-shadow: none` |
| 1 | `none`（色で表現） | パネルの重なりは `#354443` / `#eaeaea` / 写真の差で示す |
| 2 | `0 0 0 100vmax rgba(0,0,0,0.4)` 相当 | オーバーレイメニュー。影ではなく**全面の暗幕**で前後を分ける |

- 階層を出したいときは影ではなく **ブランドグリーンのベタ塗り**か **写真の明度差**を使う
- ピルタグの白枠も「浮かせる」ためではなく、写真上での可読性確保のための手段

---

## 7. Do's and Don'ts

### Do（推奨）

- 書体は `din-2014, 游ゴシック, YuGothic, "Yu Gothic medium", "Hiragino Sans", Meiryo, sans-serif` の一系統で通す（代替は Barlow ＋ Noto Sans JP）
- `font-feature-settings: "palt"` を **body にグローバル指定**する
- `letter-spacing` を **全体に約 0.05em** かける
- ウェイトは **300 と 400 の二択**。大見出しほど Light（300）に振る
- 有彩色は **ディープグリーン `#354443` のみ**に絞る
- 面・カード・パネルは **radius 0**、タグ／ラベルだけ **完全なピル（radius 1.5em）**
- 写真を全面に敷き、その上に **白文字**を直接置く
- 英字は大文字（BIOTOP / ONLINE STORE / PICK UP）、日付は `20.05.2026` のドット区切りで組む
- 本文の line-height は 1.8、大見出しは 1.0

### Don't（禁止）

- 影（`box-shadow`）を付けない。BIOTOP は完全フラット
- 塗りつぶしボタンを作らない（CTA は写真パネル or 白枠ピル）
- Bold（700）を使わない。強調はサイズと余白で
- グリーン以外の有彩色（赤・青・黄）を持ち込まない
- パネル間に gutter を空けない（隙間なく敷き詰める）
- 明朝体や第二の欧文書体を混ぜない
- 本文の `palt` を切らない（BIOTOP は本文も詰め組み）
- `font-family` の末尾を `"sans-serif"` とクォート付きで書かない（実サイトの記法だが不正。`sans-serif` と書く）
- コンテナに max-width を設けて中央寄せしない（フルブリードが基本）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラムに縦積み。パネルを順に並べる。ナビはハンバーガー（`menu`）から全面オーバーレイ |
| Tablet | 768–1023px | 2 カラム。不等分割は解いて等分に |
| Desktop | ≥ 1024px | 2〜4 分割のフルブリード・パネルグリッド |

- 見出しは **ビューポート連動のフルードサイズ**（`vw` 系）。ブレークポイントで段階的に切り替えるのではなく連続的に縮む
- ヘッダーの `menu` ボタン（右上の円形マーク）はどの幅でも固定表示

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- ピルタグは実測 padding が小さい（`2.6px 6.5px`）ため、**モバイルでは padding を広げてタップ領域を確保する**

### フォントサイズの調整

- 本文は 13px を維持。それ以下に落とさない
- 大見出しは vw 連動で縮むが、モバイルでも 32px 程度は確保して誌面感を残す
- メタテキスト（9.1px）はモバイルでは 10–11px まで戻して可読性を守る

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background: #ffffff（ページ）/ #354443（ブランドグリーンパネル）/ #eaeaea（グレーパネル）
Footer BG: rgba(53,68,67,0.15) ≒ #e1e3e3
Text: #000000（白・グレー地）/ #ffffff（写真・グリーン地）/ #354443（白地の補助テキスト）
Accent: #354443 のみ（有彩色は一色）
Font: din-2014, 游ゴシック, YuGothic, "Yu Gothic medium", "Hiragino Sans", Meiryo, sans-serif
      /* 代替: Barlow（欧文）+ Noto Sans JP（和文） */
Weight: 300 / 400 の二択（700 は使わない）
Body: 13px / line-height 1.8 / letter-spacing 0.05em
Display: 60–72px / weight 300–400 / line-height 1.0
Small: 9.1px / letter-spacing 0.071em
OpenType: font-feature-settings: "palt"（グローバル適用）
Radius: 0px（パネル・カード）/ 1.5em（ピルタグのみ）
CTA: 透明地＋1px solid #ffffff のピルタグ、または写真パネル全体をリンクに
Shadow: none（完全フラット）
Grid: フルブリード・gutter 0・パネル分割
```

### プロンプト例

```
BIOTOP のデザインシステムに従って、複合セレクトショップのトップページを作成してください。
- 書体は din-2014, 游ゴシック, YuGothic, "Yu Gothic medium", "Hiragino Sans", Meiryo, sans-serif
  （代替は Barlow ＋ Noto Sans JP）。明朝や他書体は混ぜない
- body に font-feature-settings: "palt" と letter-spacing: 0.05em をグローバル指定する
- ウェイトは 300 と 400 の二択。大見出しほど Light（300）に振り、Bold は使わない
- 有彩色はディープグリーン #354443 のみ。背景は白 #ffffff、二次パネルは #eaeaea、
  フッターは rgba(53,68,67,0.15)
- 写真を全面に敷き、その上に白文字（din-2014・大文字）を直接置く。塗りボタンは作らない
- CTA は「透明地＋1px solid #ffffff・radius 1.5em の完全なピルタグ」か、写真パネル全体のリンク
- パネル・カードは radius 0、gutter 0 で隙間なく敷き詰める。max-width は設けずフルブリード
- 影は一切使わない（box-shadow: none）。階層は面の色と写真の明度差でつくる
- 本文 13px / line-height 1.8、大見出し 60–72px / line-height 1.0、メタ 9.1px
- 日付は 20.05.2026 のドット区切り、連番は No.51 の形式で組む
```
