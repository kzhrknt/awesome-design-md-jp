# DESIGN.md — DELFONICS（デルフォニックス）

> DELFONICS｜デルフォニックス（https://www.delfonics.com/）のデザイン仕様書。
> 「ロルバーン（Rollbahn）」ノートや文具・雑貨で知られる、東京発のモダンな文具・デザインブランド。エディトリアルで遊びのある紙面設計が特徴。
> 最大の特徴は **シグネチャーの鮮烈な朱赤 `#ff3700`（ヒーロー全面）** と、**特大の英字ディスプレイ（102px の "Stationery" 等）＋ Neue Frutiger World（欧文グロテスク）× Noto Sans JP** の組版、そして **純黒 `#000000` を実際に使う数少ない設計** と **黒面＋白抜きの角丸ボタン／白縁のピル型タグ**。本文は行間 2.3 と非常に広い。
> 実サイトの computed style 実測（2026-07-23 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **モダン・エディトリアル**。雑誌の表紙のように特大の英字を大胆に置き、朱赤の面と黒のタイポグラフィでリズムを作る。文具ブランドらしい「遊び」と、グロテスク書体による端正さを両立する
- **DELFONICS について**: ロルバーンをはじめとする文具・ステーショナリーの企画ブランド。プロダクトの色数の豊かさに対し、Web は朱赤・黒・白（＋アイボリー）に絞り、写真とタイポグラフィで見せる
- **密度**: 中〜低密度。特大ディスプレイ英字と広い行間（本文 2.3）でゆったり組み、面色（朱赤・アイボリー・グレー）でセクションを切り替える
- **キーワード**: 朱赤 #ff3700、Neue Frutiger World、特大英字ディスプレイ、純黒 #000000、黒の角丸ボタン、白縁ピルタグ、行間2.3、palt
- **特徴**:
  - シグネチャーは **鮮烈な朱赤 `#ff3700`**。トップの `l-page` 全面に敷かれ、白抜き文字・白縁ピルタグと組み合わさる
  - 欧文は **Neue Frutiger World（Adobe Fonts / フルティガー系グロテスク）**、和文は **Noto Sans JP**。欧文優先のスタック
  - **特大英字ディスプレイ（102px / ls -0.03em）** を "Stationery" 等の見出しに使い、雑誌的なインパクトを出す
  - テキスト・ボタン面に **純黒 `#000000` を実際に使う**（多くのサイトが避ける中で、あえて締まった黒を採用）
  - ボタンは **黒面＋白抜き（radius 8px）／ round（radius 20px）／白縁のピルタグ（radius 100px）** を使い分け。`font-feature-settings: "palt"` を適用
  - 本文の **行間は 2.3（15px→34.5px）と非常に広い**。日本語をゆったり読ませる
  - 面色は **白・アイボリー `#ffffe6`・淡いグレー `#f3f3f3`** を切り替え。差し色に朱赤
  - カレンダー系のサブUIに土曜ブルー `#006dc1` / 日曜・セール赤 `#ff0056` が出る

---

## 2. Color Palette & Roles

> 実測値。CSS Custom Properties（`--color-*` / `--theme-*`）が定義されている。html/body のベースは白＋黒文字で、トップの `l-page` div が全面 `#ff3700`（朱赤ヒーロー）。「白／アイボリー面 ＋ シグネチャー朱赤 #ff3700 のヒーロー・アクセント ＋ 黒の文字・ボタン」と捉える。

### Brand（ブランド）

- **Signature Red** (`#ff3700`, `--color-red` / `--theme-primary`): 最重要のシグネチャーカラー。ヒーロー全面の朱赤、アクセント、一部見出し（`Contact:` / `Index` 等の h3）に使う。鮮烈な橙寄りの赤で、ブランドの顔
- **Black** (`#000000`, `--color-black` / `--color-base`): 本文テキスト、ボタン面。**純黒をあえて採用**する数少ない設計。締まった黒でエディトリアルな端正さを出す
- **White** (`#ffffff`, `--theme-secondary`): コンテンツ面、朱赤・黒地の上の白抜き文字

### Surface（面色）

- **Ivory** (`#ffffe6`, `--color-ivory`): 淡いアイボリーの面色。白と差をつけた柔らかいセクション地
- **Gray** (`#f3f3f3`, `--color-gray`): 淡いグレーの面（カード地・区切り帯）
- **Gray 50** (`#e9eaea`, `--color-gray-50`): やや濃いグレー面・境界

### Neutral（テキスト・罫）

- **Gray 100** (`#9a9a9a`, `--color-gray-100`): 補助テキスト・プレースホルダ
- **Gray 250** (`#7f7f7f`, `--color-gray-250`): 中間のサブテキスト
- **Gray 300** (`#636363`, `--color-gray-300`): 本文に次ぐテキスト
- **Gray 400** (`#525252`, `--color-gray-400`): 濃いめのサブテキスト・ラベル
- **Cell Border** (`#d9d9d9`): カレンダーセル等の罫線

### Semantic / Calendar（意味的な色・カレンダー系）

- **Sale / Sun Red** (`#ff0056`): 日曜・セール・強調（シグネチャー赤とは別のマゼンタ寄りの赤）。エラーにも流用可
- **Sat Blue** (`#006dc1`): 土曜・情報系のアクセント
- 独立した Success 色は前面に希薄。必要なら土曜ブルー `#006dc1` を情報系に流用する

---

## 3. Typography Rules

> 欧文 **Neue Frutiger World（グロテスク）** ＋ 和文 **Noto Sans JP** の欧文優先スタック。特大ディスプレイ英字（102px）から 12px の注記まで、**weight 400 / 500 / 600 / 700 を使い分け**る。本文は **行間 2.3** と非常に広く、ボタン等に **palt** を適用する。

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP（サンセリフ。本文・見出しの和文はこれ一系統）
- 明朝体は使わない
- 一部の本文 `p` は `"Noto Sans JP"` 単独指定のケースもある

### 3.2 欧文フォント

- **サンセリフ（グロテスク）**: Neue Frutiger World（Adobe Fonts。フルティガー系の端正なグロテスク。欧文見出し・ディスプレイ・本文の欧文グリフに使う）
- 最後に generic の `sans-serif` へフォールバック
- **preview.html での注記**: Neue Frutiger World は **Adobe Fonts（ドメインライセンス）** のため、ローカルの preview.html では表示できない。プレビューでは **Google Fonts の Figtree（フルティガー系に近い幾何グロテスク）** を代替に用いる。実装時は必ず Adobe Fonts の Neue Frutiger World を読み込むこと

### 3.3 font-family 指定

```css
/* 本文・見出し共通（欧文優先スタック） */
font-family: neue-frutiger-world, "Noto Sans JP", sans-serif;

/* 一部の本文 p は和文単独指定も併存 */
font-family: "Noto Sans JP";
```

**フォールバックの考え方**:
- 欧文グロテスク Neue Frutiger World を先頭に置き、和文グリフは Noto Sans JP が担う（欧文の字形品質を優先）
- Neue Frutiger World が無い環境では Noto Sans JP → sans-serif に落とす
- 末尾は必ず `sans-serif`

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (h2) | Neue Frutiger World | 102px | 400 | 1.0 (102px) | -0.03em (-3.06px) | 特大英字 "Stationery" 等 |
| Heading 1 (h1) | neue-frutiger-world / Noto Sans JP | 30px | 700 | 1.5 (45px) | normal | ロゴ・大見出し |
| Heading 2 (h2) | neue-frutiger-world / Noto Sans JP | 40px | 700 | 1.5 (60px) | normal | 赤地の見出し "Schedule:"（白抜き） |
| Heading 4 (h4) | neue-frutiger-world | 32px | 400 | 1.0 (32px) | normal | 白抜き見出し |
| Heading 3 (h3) | neue-frutiger-world | 20px | 400〜600 | 1.5 (30px) | normal | 400=白 / 600・500=朱赤（Contact: / Index） |
| Nav | neue-frutiger-world | 16px | 400 | 1.5 (24px) | 0.04em (4%) | グローバルナビ |
| Button | neue-frutiger-world | 16px | 700 | 1.5 (24px) | normal | ヘッダー検索等 |
| Body | Noto Sans JP | 15px | 500 | 2.3 (34.5px) | -0.02em (-0.3px) | 日本語本文（行間が非常に広い） |
| Small | Noto Sans JP | 12px | 400〜500 | 1.3〜1.5 (15.6〜18px) | -0.02em (-0.24px) | 注記・キャプション |

- 本文は **weight 500** が既定。見出しは 700、ディスプレイ英字は 400、小見出しは 400〜600 と用途で切り替える

### 3.5 行間・字間

- **本文の行間 (line-height)**: **2.3**（15px→34.5px）。日本語本文を非常にゆったり読ませる DELFONICS の流儀
- **見出しの行間**: 1.5（30px→45px、40px→60px）。ディスプレイ英字・h4 は 1.0（詰める）
- **本文の字間 (letter-spacing)**: **-0.02em（15px 基準で -0.3px）**。わずかに詰める
- **ナビの字間**: **0.04em（4%）**。ナビは逆に広げてリズムを作る
- **ディスプレイ英字の字間**: **-0.03em（-3.06px）**。特大英字を締めて塊にする

**ガイドライン**:
- 日本語本文は line-height 2.3 を基準にゆったり組む（詰めない）
- 本文の letter-spacing はわずかにマイナス（-0.02em 程度）、ナビは +0.04em と用途で反転させる
- 特大ディスプレイ英字は letter-spacing をマイナスに詰めて塊として見せる

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
font-feature-settings: "palt";   /* ボタン・CTA 等に適用 */
```

- **palt**: ボタン・CTA など短い和欧混植のラベルに適用し、字詰めを整える
- 本文長文には無理に palt を適用しない（行間 2.3 のゆったりした組みを保つ）

### 3.8 縦書き

- 該当なし。主要導線はすべて横組み
- 用いる場合は `writing-mode: vertical-rl; text-orientation: mixed;`

---

## 4. Component Stylings

### Buttons

DELFONICS のボタンは **黒面＋白抜き** を基調に、角丸の大きさ（8px / 20px / 100px）で性格を分ける。CTA には `font-feature-settings: "palt"` が付く。

**Primary（黒・角丸）**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `18px 21px`
- Border Radius: `8px`
- Font: neue-frutiger-world, weight 700
- Feature: `font-feature-settings: "palt"`
- 例: "About Us" / "Place"

**Inverse（白・角丸）**
- Background: `#ffffff`
- Text: `#000000`
- Padding: `18px 21px`
- Border Radius: `8px`
- Border: 必要に応じて `1px solid #000000`
- 例: "View More"

**Round（黒・ラウンド）**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `15px`
- Border Radius: `20px`
- 例: "Recruit" / "For Businesses"

**Pill Tag（白縁・ピル）**
- Background: `transparent`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Padding: `4px 10px`
- Border Radius: `100px`
- 用途: 朱赤ヒーロー上のカテゴリタグ（"Rollbahn" / "Diary" 等）

### Inputs

- Background: `#ffffff`
- Border: `1px solid #e9eaea`（`--color-gray-50`）
- Border (focus): `1px solid #000000`（または朱赤 `#ff3700`）
- Border Radius: `8px`
- Padding: `14px 16px`
- Font: neue-frutiger-world, "Noto Sans JP", 15px
- Text Color: `#000000` / Placeholder: `#9a9a9a`

### Cards

- Background: `#ffffff`（または `#f3f3f3` の淡いグレー地）
- Border: なし／必要時 `1px solid #e9eaea`
- Border Radius: `8px`
- Padding: `20px`
- Shadow: 基本フラット（Depth & Elevation 参照）
- 製品写真を大きく置き、下に品名（黒）と補助情報（グレー）を添える。カテゴリはピルタグで示す

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 12px |
| M | 20px |
| L | 32px |
| XL | 60px |
| XXL | 100px |

面色（朱赤・アイボリー・グレー）でセクションを切り替え、間は XL〜XXL で取る。

### Container

- Max Width: 1200px 目安（ヒーローや面色帯は全幅ブリード）
- Padding (horizontal): 20〜40px

### Grid

- Columns: 12（実運用は 2〜4 カラムの製品グリッド）
- Gutter: 20〜32px
- 製品一覧は写真中心のグリッド。カテゴリはピルタグで整理する

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。面色・罫で構成しフラット |
| 1 | `0 2px 8px rgba(0,0,0,0.06)` | カード・ドロップダウン |
| 2 | `0 8px 24px rgba(0,0,0,0.10)` | モーダル・ポップオーバー |
| 3 | `0 16px 40px rgba(0,0,0,0.14)` | ダイアログ・フローティング |

- 奥行きは基本的に **面色（朱赤・アイボリー・グレー）と角丸** で表現し、影は控えめに使う

---

## 7. Do's and Don'ts

### Do（推奨）

- 欧文は Neue Frutiger World、和文は Noto Sans JP の欧文優先スタックで組む（末尾は `sans-serif`）
- シグネチャーの朱赤 `#ff3700` はヒーロー・アクセントに大胆に使う
- 日本語本文の行間は 2.3 を基準にゆったり組む
- ボタンは黒面＋白抜きを基調に、角丸（8px / 20px / 100px）で性格を分ける
- ヒーロー上のカテゴリは白縁のピルタグ（radius 100px）で示す
- ボタン・CTA には `font-feature-settings: "palt"` を適用する
- 特大ディスプレイ英字は letter-spacing をマイナス（-0.03em）に詰める

### Don't（禁止）

- `font-family` に和文フォント1つだけを指定しない（欧文の字形品質が落ちる）
- 日本語本文の行間を詰めすぎない（2.3 の広い組みが DELFONICS のリズム）
- 朱赤 `#ff3700` とセール赤 `#ff0056` を混同しない（前者はブランド、後者はカレンダー・強調）
- ボタンの角丸を統一してしまわない（8px / 20px / 100px の使い分けが性格を作る）
- ナビの字間を詰めない（ナビは +0.04em と広げる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1〜2 カラム。ヒーローは全幅 |
| Tablet | 768–1024px | 2〜3 カラム |
| Desktop | > 1024px | 3〜4 カラム＋面色帯 |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。角丸ボタンは padding で十分な高さを確保

### フォントサイズの調整

- モバイルでは本文 14〜15px を維持
- 特大ディスプレイ英字 102px → 48〜64px 程度に縮小。見出し 40px → 28px 程度に縮小し、行間はゆったり保つ

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary/Brand:  #ff3700   （シグネチャー朱赤 / ヒーロー・アクセント）
Text/Button:    #000000   （純黒をあえて採用）
Surface:        #ffffff / #ffffe6（アイボリー） / #f3f3f3（グレー）
Sub Text:       #636363 / #9a9a9a
Accent(cal):    #ff0056（セール・日曜） / #006dc1（土曜）
Font:           neue-frutiger-world, "Noto Sans JP", sans-serif
Body Weight:    500（見出し 700 / ディスプレイ 400）
Body Size:      15px
Line Height:    2.3（本文）／ 1.5（見出し）／ 1.0（ディスプレイ英字）
Letter Spacing: -0.02em（本文）／ 0.04em（ナビ）／ -0.03em（ディスプレイ）
Button:         黒面＋白抜き radius 8px / round 20px / 白縁ピル 100px、palt 適用
```

### プロンプト例

```
DELFONICS（デルフォニックス）のデザインシステムに従って、文具の商品紹介ページを作成してください。
- フォント: neue-frutiger-world, "Noto Sans JP", sans-serif（末尾は sans-serif）
- ヒーローはシグネチャー朱赤 #ff3700 の全面。見出しは白抜き、カテゴリは白縁のピルタグ（radius 100px）
- 本文は Noto Sans JP・15px・weight 500・行間 2.3・letter-spacing -0.02em
- 特大の英字ディスプレイ（"Stationery" 等）を weight 400・letter-spacing -0.03em で大胆に置く
- ボタンは黒面＋白抜き（radius 8px、padding 18px 21px、palt 適用）を基調に、round は radius 20px
- テキスト・ボタン面には純黒 #000000 を使う。面色は白 / アイボリー #ffffe6 / グレー #f3f3f3 で切り替える
- セール・日曜の強調は #ff0056、土曜は #006dc1（ブランドの朱赤 #ff3700 とは区別する）
```
