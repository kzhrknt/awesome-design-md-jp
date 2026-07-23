# DESIGN.md — SIRI SIRI（シリシリ）

> SIRI SIRI（https://sirisiri.jp/）のデザイン仕様書。
> 建築を学んだデザイナー岡本菜穂が主宰する、日本のクラフトマンシップを軸にした現代ジュエリーブランド。江戸切子ガラス（KIRIKO）や籐編み、漆といった伝統素材を、建築的でミニマルな造形へ翻訳したコレクションで国内外のデザイン賞を受けている。
> 最大の特徴は **欧文グロテスク ABC Diatype（Dinamo）＋ 和文ヒラギノ角ゴ／游ゴシックを、ウェイト300（Light）主体で組む**こと、白地×純黒の静謐、**詩的な日本語コピーにだけ明朝（ヒラギノ明朝／游明朝）を差す**対比、そして唯一の有彩アクセント **スレートブルー `#b2c2c9`**（"予約商品 Pre-order" バッジ）。テキストリンクは下線ベース・角丸ゼロで、面ボタンをほぼ持たない。
> 実サイトの computed style 実測（2026-07-23 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **建築的なミニマリズム**。装飾を削ぎ、細いグロテスク（ABC Diatype）と Light ウェイト、白地の余白で「軽やかさ」と「静けさ」を作る。宝飾ブランドにありがちな装飾過多を避け、素材（切子ガラス・籐・漆）と製品写真に語らせる
- **SIRI SIRI について**: 建築出身の岡本菜穂が手がける現代ジュエリー。伝統工芸の技法を建築的な構造で再構成する思想を、Web でも「白・黒・細字・矩形」という最小の言語で体現する
- **密度**: 低密度。全幅の製品／ビジュアル写真を大きく置き、テキストは Light ウェイトで小さく静かに添える
- **キーワード**: ABC Diatype、グロテスク、ウェイト300、白地×純黒、明朝の差し色、スレートブルー #b2c2c9、角丸ゼロ、下線リンク
- **特徴**:
  - 欧文の主役は **ABC Diatype（Dinamo のスイス系グロテスク）**。和文はヒラギノ角ゴ／游ゴシックで受ける
  - ウェイトは **300（Light）が既定**。ナビ・見出し h2・本文とも 300 で、太字はブランドロゴ（h1 / 700）に限る
  - テキスト色は **純黒 `#000000`**。SIRI SIRI は柔らかい炭色ではなく、切子ガラスの黒さを思わせる硬質な純黒を使う
  - **詩的な日本語リード文にだけ明朝（ヒラギノ明朝 ProN／游明朝）を差す**。グロテスクの硬質さと明朝の情緒を対比させるのがブランドの声
  - 有彩色は **スレートブルー `#b2c2c9`（切子ガラスの青みを想起）** を "予約商品 Pre-order" バッジの面色に使う程度。あとは無彩色
  - 角丸は **一貫して 0px**。ボタン・バッジ・入力欄すべて矩形
  - CTA は **面ボタンをほぼ持たず、下線付きテキストリンク**（"View More" / "Detail" / "Shop Event"）が主役
  - 補足・お知らせ帯はグレー `#777777` テキスト＋淡いグレー面 `#e3e3e3` / `#f7f7f7`

---

## 2. Color Palette & Roles

> 実測値。SIRI SIRI は Shopify 構築で、独自の CSS Custom Properties はほぼ未定義（`--swym-*` などウィッシュリスト系のみ）。ブランド色をトークンに頼らず、白・純黒・単一のスレートブルーで組み立てているため、ここに挙げる hex を直接指定するのが正確。

### Brand（アクセント）

- **Slate Blue** (`#b2c2c9`): **実質唯一の有彩ブランドアクセント**。切子ガラス／青みがかった氷を想起させる淡いスレートブルー。"予約商品 Pre-order" バッジの面色に使う（白文字を乗せる）。ここぞという1点にだけ差し、多用しない
- **System Blue** (`#377dff`): 稀に出るシステム／リンク色（フォームのバリデーション成功、外部リンク等）。ブランドアクセントではなく機能色

### Neutral（背景・面・テキスト）

- **White** (`#ffffff`): 基本のページ背景。読み込み時に `.loading` の白オーバーレイが掛かる
- **Black** (`#000000`): 本文・見出し・ロゴの標準テキスト色。**純黒を積極的に使う**（切子の硬質な黒）。暗背景のナビオーバーレイにも使用
- **Text Grey** (`#777777`): お知らせ・補足・二次テキストのグレー
- **Surface Light** (`#f7f7f7`): 最も淡いグレー面（セクション地・カード地）
- **Surface Grey** (`#e3e3e3`): お知らせ帯・ボタン地の淡いグレー面

### Semantic

- 独立したエラー／警告色は前面にほぼ存在しない（EC の最小フォームのみ）
- 実装が必要なら無彩色基調を保ちつつ、エラーは沈んだ赤 `#c0392b` 程度に留め、成功・情報は System Blue `#377dff` を流用する
- アクセントのスレートブルー `#b2c2c9` は「予約」というステータス専用の意味を持つため、成功／情報色に流用しない

---

## 3. Typography Rules

> 欧文 = ABC Diatype（グロテスク）、和文 = ヒラギノ角ゴ／游ゴシック、**全編ウェイト 300 主体**。詩的なコピーにだけ明朝を差す。純黒 `#000000`、字間はタイト〜ニュートラル（-0.2〜0.5px）。

### 3.1 和文フォント

- **ゴシック体（主役）**: ヒラギノ角ゴ Pro（"Hiragino Kaku Gothic Pro"）→ 游ゴシック（YuGothic）→ "ヒラギノ角ゴ Pro" → "MS Gothic" → Meiryo → sans-serif
- **明朝体（詩的コピー専用の差し色）**: "Hiragino Mincho ProN" → YuMincho → "Yu Mincho" → serif
  - 使いどころは限定的。KIRIKO などコレクションの詩的なリード文（例 "KIRIKO — The L..."）に明朝を当て、グロテスクの硬質さと情緒を対比させる
  - 本文・ナビ・見出しは明朝にしない。明朝はあくまで「差し色」

### 3.2 欧文フォント

- **グロテスク（主役）**: **ABC Diatype**（Dinamo）→ ヒラギノ角ゴ／游ゴシックへフォールバック
  - ABC Diatype は Dinamo のスイス系ネオグロテスク。均質でニュートラルな骨格が SIRI SIRI の建築的トーンを作る
  - **ライセンス制限のあるフォント**（Dinamo のドメインライセンス）。`preview.html` ではローカル表示できないため、Google Fonts のグロテスク（`Inter` または `Archivo`）で代替する。DESIGN.md 上の正規指定は ABC Diatype
- **サンセリフ（フォールバック）**: ヒラギノ角ゴ Pro / 游ゴシック / MS Gothic / Meiryo
- カート等の一部システム UI では Arial に落ちる

### 3.3 font-family 指定

```css
/* 欧文・主フォント（本文・ナビ・見出し共通） */
font-family: ABCDiatype-Regular, "Hiragino Kaku Gothic Pro", 游ゴシック,
             YuGothic, "ヒラギノ角ゴ Pro", "MS Gothic", Meiryo, sans-serif;
font-weight: 300;

/* 詩的コピー用の明朝（差し色） */
font-family: "Hiragino Mincho ProN", YuMincho, "Yu Mincho", serif;
font-weight: 300;

/* 一部はゴシック単独宣言も併存 */
font-family: "Hiragino Kaku Gothic Pro", 游ゴシック, sans-serif;
```

**フォールバックの考え方**:
- ABC Diatype を先頭に置き、無い環境では和文ゴシック（ヒラギノ角ゴ → 游ゴシック）へ落とす
- 欧文グロテスクを優先することで、和欧混植でも均質でニュートラルな骨格を保つ
- Windows で MS Gothic / Meiryo に落ちても破綻しないよう末尾は `sans-serif`
- 明朝は詩的コピー専用。末尾を必ず `serif` にする

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Logo (h1) | ABC Diatype | 28px | 700 | normal | normal | ブランドロゴ（唯一の太字） |
| Heading (h2) | ABC Diatype | 22px | 300 | 1.44 (31.68px) | -0.2〜0.4px (≒ -0.01〜0.02em) | セクション見出し・写真上コピー（#000 or #fff） |
| Lead (明朝) | Hiragino Mincho ProN | 20px | 300 | normal | 0.5px (≒ 0.025em) | 詩的リード（"KIRIKO — The L.."／暗背景で #fff） |
| Lead (欧字) | ABC Diatype | 16px | 400 | normal | normal | 英字リード（"Scroll Down"／#fff） |
| Body / Nav | ABC Diatype | 14px | 300 | normal〜1.4 | normal | 標準テキスト・ナビ・ヘッダー（#000） |
| List / Span | ABC Diatype | 14px | 300 | normal | normal | リスト項目・スパン（#000） |
| Link | ABC Diatype | 12px | 300 | 2.5 (30px) | normal | 小リンク（暗背景 #fff / お知らせ #777） |
| Input | ABC Diatype | 16px | 400 | normal | normal | フォーム入力 |

- **主役は weight 300**。見出し h2 も本文もナビも 300 で組み、太字はロゴ（h1 / 700）だけに限定する
- 明朝の詩的リードは 20px / weight 300。グロテスクの中に情緒を1点差す

### 3.5 行間・字間

- **見出しの行間**: **1.44**（22px→31.68px）。詰まり気味でタイトに
- **本文・ナビの行間**: normal〜1.4。欧文グロテスク基準でやや詰める（和紙系サイトのような広い行間は取らない）
- **小リンクの行間**: 2.5（12px→30px）。クリック領域確保のための例外
- **字間 (letter-spacing)**: **タイト〜ニュートラル**。見出しで **-0.2〜0.4px（≒ -0.01〜0.02em）**、明朝リードで **0.5px（≒ 0.025em）**、本文は normal
- SIRI SIRI は「広い行間で和のゆったり」ではなく「詰まった行間で建築的な硬質さ」を選ぶ点に注意

**ガイドライン**:
- 見出しは line-height 1.44 前後、本文は 1.4〜1.6 に抑えてタイトに組む
- letter-spacing は 0 前後〜わずかにマイナス。広げすぎるとグロテスクの均質さが崩れる
- 太字を使わず、weight 300 のまま組む

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
word-break: normal;
line-break: strict;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt は明示適用していない */
```

- 実測は `normal`。ABC Diatype はプロポーショナル欧文なのでベタ組みでも均質。和文見出しで詰めたい場合のみ `"palt" 1` を局所適用する
- 和欧混植のカーニングは `"kern" 1` を任意で

### 3.8 縦書き

- 主要導線はすべて横組み。建築的なグリッドを横組みで構成する
- 縦組みを用いる場合は明朝スタックのまま `writing-mode: vertical-rl; text-orientation: mixed;`（該当箇所は現状なし）

---

## 4. Component Stylings

### Buttons

SIRI SIRI は面色ボタンをほとんど使わず、**下線付きテキストリンク** が主役。ステータス表示のバッジと、お知らせ帯の淡いグレーボタンが加わる。**角丸はすべて 0px**。

**Primary（テキストリンク）**
- Background: `transparent`
- Text: `#000000`
- Border: `1px solid`（下線的なボーダー。テキスト下に引く）
- Border Radius: `0`
- Padding: `0`
- Font: ABC Diatype, 14px 前後, weight 300
- 例: "View More" / "Detail" / "Shop Event"

**Pre-order Badge（ステータスバッジ）**
- Background: `#b2c2c9`（スレートブルー）
- Text: `#ffffff`
- Border Radius: `0`
- Padding: `4px 21px 6px`
- Font: ヒラギノ角ゴ Pro, weight 300
- 例: "予約商品 Pre-order"。ブランド唯一の有彩面。ここぞの1点に

**Notice Button（お知らせボタン）**
- Background: `#e3e3e3` または `#ffffff`
- Text: `#777777`
- Border Radius: `0`
- Padding: `15px 50px 18px`
- Font: ABC Diatype, weight 300

### Inputs

- Background: `#ffffff`
- Border: `1px solid #000000`（またはヘアラインのグレー。矩形）
- Border (focus): `1px solid #000000` を保ち、下線を濃くする程度（過度な色付けをしない）
- Border Radius: `0`
- Padding: `10px 14px`
- Font: ABC Diatype, 16px, weight 400
- Text Color: `#000000`

### Cards

- Background: `#ffffff`（または製品写真そのもの）
- Border: なし／必要時 `1px solid #e3e3e3`
- Border Radius: `0`
- Padding: `0`（画像を四辺までブリード）／テキスト部は `16px`
- Shadow: なし（フラット）
- 製品写真を大きく矩形で置き、下に ABC Diatype の Light で品名・価格を小さく添える。予約商品には `#b2c2c9` のバッジを重ねる

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

余白を広く取り、セクション間は XL〜XXL で建築的な「間」を作る。矩形とグリッドの整列を崩さない。

### Container

- Max Width: 1200px 目安（製品・ビジュアル写真は全幅ブリードを多用）
- Padding (horizontal): 24〜40px

### Grid

- Columns: 12（実運用は 2〜3 カラムの製品グリッド）
- Gutter: 24〜40px
- 製品一覧は写真中心の均等グリッド。角丸を付けず、矩形を整然と並べる。装飾を足さず余白で仕切る

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼ全要素がフラット |
| 1 | `0 1px 2px rgba(0,0,0,0.06)` | 使う場合のみ。ドロップダウン等 |
| 2 | `0 8px 24px rgba(0,0,0,0.10)` | モーダル・カート等の限定用途 |

- 基本は **影を使わない**。奥行きは余白と写真、矩形の重なりで表現する。切子ガラスの透明感に合わせ、影は極力薄く

---

## 7. Do's and Don'ts

### Do（推奨）

- 欧文は ABC Diatype を先頭に、和文ゴシック（ヒラギノ角ゴ／游ゴシック）へフォールバックさせる
- 本文・見出し・ナビとも weight 300 で組み、太字はロゴだけに限定する
- テキスト色は純黒 `#000000` を積極的に使う（切子の硬質な黒）
- 詩的な日本語リードにだけ明朝を差し、グロテスクと対比させる
- 角丸は 0px で統一し、矩形とグリッドの整列を保つ
- 有彩アクセントはスレートブルー `#b2c2c9` に絞り、"予約 / Pre-order" のステータスにだけ使う
- CTA は下線付きテキストリンクを主役にする

### Don't（禁止）

- 明朝を本文・ナビ・見出しに広く使わない（明朝は詩的コピー専用の差し色）
- weight 700 の太字で強調を多用しない（ロゴ以外は 300）
- スレートブルー以外の鮮やかな彩色をアクセントに足さない
- 角丸や影を強くしてボタンを目立たせない（矩形・下線リンク中心）
- 行間を広げすぎない（和紙系のような 2.0 超は SIRI SIRI の硬質さに合わない。見出しは 1.44 前後）
- テキスト色を柔らかいグレーに逃がさない（本文は純黒、補足のみ #777777）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。製品写真は全幅 |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 2〜3 カラム＋広い余白 |

### タッチターゲット

- 最小サイズ: 44px × 44px。下線テキストリンクは上下パディングでタップ領域を確保

### フォントサイズの調整

- モバイルでも本文 14〜16px を維持
- 見出し 22px → 18〜20px 程度に縮小。行間 1.44 は据え置き、字間もタイトなまま保つ

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Accent:         #b2c2c9   （スレートブルー / "予約 Pre-order" バッジ専用）
Text Color:     #000000   （純黒を積極使用）
Secondary Text: #777777   （お知らせ・補足）
Surface:        #f7f7f7 / #e3e3e3
Background:     #ffffff
Font (欧文/主): ABCDiatype-Regular, "Hiragino Kaku Gothic Pro", 游ゴシック, YuGothic, "MS Gothic", Meiryo, sans-serif
Font (明朝/差): "Hiragino Mincho ProN", YuMincho, "Yu Mincho", serif  ← 詩的コピー専用
Body Weight:    300（見出しも300。太字はロゴ h1=700 のみ）
Body Size:      14〜16px
Line Height:    見出し 1.44 ／ 本文 1.4〜1.6（詰まり気味）
Letter Spacing: -0.01〜0.02em（タイト〜ニュートラル）
Radius:         0px（全コンポーネント矩形）
Button:         下線付きテキストリンク中心。面ボタンは最小限
```

### プロンプト例

```
SIRI SIRI のデザインシステムに従って、ジュエリー製品ページを作成してください。
- 欧文/主フォント: ABCDiatype-Regular, "Hiragino Kaku Gothic Pro", 游ゴシック, YuGothic, sans-serif（見出しも本文も weight 300）
- テキスト色は純黒 #000000、補足のみ #777777。letter-spacing はタイト（0 前後〜-0.02em）
- 詩的なリード文にだけ明朝 "Hiragino Mincho ProN", YuMincho, serif を weight 300 で差す
- 背景は白 #ffffff。製品写真を全幅で大きく、矩形で置く
- 角丸は全て 0px。ボタンは下線付きテキストリンクを主役に
- 有彩アクセントはスレートブルー #b2c2c9 のみ。"予約商品 Pre-order" バッジ（白文字）にだけ使う
- 影・角丸・太字は使わず、白・純黒・細字・矩形・余白で建築的に構成する
```
