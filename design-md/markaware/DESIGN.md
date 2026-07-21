# DESIGN.md — MARKAWARE（マーカウェア）

> MARKAWARE（https://www.markaware.jp/）のデザイン仕様書。
> 石川俊介が手がける日本のメンズウェア／エシカルアパレルブランド。オーガニックコットンや環境負荷の低い素材を軸に、仕立ての精度と素材の背景を静かに語る。Shopify / EC-CUBE 系の EC。
> 最大の特徴は **暖かみのあるオフホワイト（グレージュ）#f7f6f3 の地** と **純黒 #000 の極小テキスト**、**塗りを持たないアウトライン（枠線）ピル型 CTA**、そして **ウェイトを 400 に統一し、大きさだけで階層をつくる** 抑制されたタイポグラフィ。装飾色を一切持たず、素材と余白で語る。
> 欧文は **ABC Diatype**（Dinamo のニュートラルなネオグロテスク）、和文は **游ゴシック体 Pr6N M**。
> 実サイトの computed style / CSS Custom Properties 実測（2026-07-21 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 暖かいオフホワイトの地に、極小の純黒テキストと広い余白で構成する、静謐でクラフト志向のミニマリズム。色で語らず、素材写真と行間・字送りの端正さで質を伝える
- **MARKAWARE について**: 石川俊介によるエシカル・メンズウェアブランド。オーガニック素材・トレーサビリティ・仕立ての精度を軸に、派手さを排し「良いものを長く」を体現する。Web もその思想通り、無彩色・低刺激・余白過多で組まれる
- **密度**: 低密度。大きなプロダクト／素材ビジュアルと広い余白、小さな英字・和文ラベル。情報を絞り、写真に語らせる
- **キーワード**: エシカル、ナチュラル、静謐、クラフト、抑制、暖色オフホワイト #f7f6f3、純黒 #000、ABC Diatype、游ゴシック、ピル型アウトライン CTA、ウェイト 400 統一、palt、広い余白
- **特徴**:
  - 地は純白ではなく **暖かいグレージュ #f7f6f3**。面の切り替えに near-white #fcfcfc と light greige #ecebe9 を使う
  - テキストは **純黒 #000 / near-black #080808**。補助に warm gray #8c8c8c（`--ep-color-points`）
  - **ウェイトは 400 に統一**。太字を持たず、階層は「サイズ」と「余白」だけでつくる（見出し 25px も本文 14px も同じ 400）
  - CTA は **塗りを持たないアウトライン**。透明地＋ `1px solid #000`＋黒文字、**ピル型（radius 100px）**。控えめで静か
  - **palt をグローバル（body）に適用**。和欧混植の字詰めを全体で効かせ、小さな文字でも端正に見せる（フォーム部品のみ palt 無効）
  - ナビ・ラベルは **小さな英字（Shop / New In / Sustainability）と和文** を 10〜11px で置く
  - 角丸はテキスト面・カード・入力では持たない（radius 0）が、**CTA だけはピル（radius 100px）** という対比

---

## 2. Color Palette & Roles

> 実サイトの computed style 実測値。装飾色を持たない暖色無彩色。すべて hex 表記。

### Core（背景・面）

- **Background (Greige)** (`#f7f6f3`): ページの基本地。ヒーロー・フッターを含む支配色（rgb(247,246,243)、上部 viewport 最大面積 1,038,240px²）
- **Surface / Near-White** (`#fcfcfc`): ヘッダー地・Shop 面など、地よりわずかに白い面（`site-header` bg）
- **Surface Tint / Light Greige** (`#ecebe9`): Care Guide・Sustainability など、地よりわずかに沈めたタイル面
- **Popup White** (`#ffffff`): ニュースレター／通知ポップアップの地（`--ep-white`）。ページ地とは分ける

### Text

- **Text** (`#000000`): 本文・見出し・リンクの基本テキスト（純黒。`--ep-color-text: #000`）
- **Text Near-Black** (`#080808`): ヒーローのタイトル／サブタイトル等（rgb(8,8,8)）。実質純黒だが厳密には別値
- **Text Muted** (`#8c8c8c`): ポイント表記・補助テキスト（`--ep-color-points`）。warm gray

### Border / Divider

- **Divider** (`#aaaaaa`): 罫線・区切りの標準グレー（rgb(170,170,170)）
- **Hairline Tint** (`#ecebe9`): 面の境目をそっと示す淡いグレージュ罫（Core と兼用）

### Brand / Accent

- **Ink（唯一の"色"）** (`#000000`): アクセントも黒。CTA の枠・文字、強調はすべて黒で行う。**有彩の差し色を持たない**のがブランドの姿勢
- （参考）`--swiper-theme-color: #007aff` はカルーセルライブラリ（Swiper）の既定値であり、**ブランドカラーではない**。UI に使わない

### Semantic

- **Danger / Error**: 実サイトは独立した赤を持たない（無彩色基調）。エラー表現が必要な場合のみ、本リポジトリ汎用の控えめな `#b23b32` を最小限あてる。基調の暖色無彩を崩さない
- **Success / Warning**: 専用色なし。必要時もテキスト＋黒枠で表現し、原色を持ち込まない

---

## 3. Typography Rules

> 欧文 **ABC Diatype**（Dinamo）＋和文 **游ゴシック体 Pr6N M**。**ウェイトは全要素 400 に統一**され、階層はサイズと余白でつくる。palt をグローバル適用。
> ABC Diatype はライセンスフォント（ローカル未所持では表示されない）。preview.html では **Inter**（ニュートラルなネオグロテスク）＋和文 **Noto Sans JP** で近似する。

### 3.1 和文フォント

- **ゴシック体**: `游ゴシック体 Pr6N M`（モリサワ Pr6N の游ゴシック Medium）を先頭に、`Yu Gothic Pr6N M` → `Yu Gothic Medium` → `Hiragino Kaku Gothic ProN` → `YuGothic` とフォールバック
- **Medium（M）を基準**にしている点に注意。Windows の素の `Yu Gothic`（Regular）は細く見えるため、`Yu Gothic Medium` を明示指定して太さを補っている
- 明朝体は使用しない

### 3.2 欧文フォント

- **サンセリフ**: `ABC Diatype`（Dinamo のネオグロテスク）。和文より前に置き、ラテン字形は Diatype を優先させる
- Diatype は Helvetica より癖がなくニュートラル。ロゴ・ナビ・価格・見出しすべてこの一系統
- セリフ・等幅は使用しない

### 3.3 font-family 指定

```css
/* 全要素共通（実測値） */
font-family: ABCDiatype, "游ゴシック体 Pr6N M", "Yu Gothic Pr6N M",
             "Yu Gothic Medium", "Hiragino Kaku Gothic ProN", YuGothic, sans-serif;
```

- **フォールバックの考え方**: 欧文 Diatype を先頭に置き（ラテンを優先）、和文は游ゴシック **Medium** 系で受ける。最後に generic `sans-serif`
- **preview.html での代替フォント**:
  - ABC Diatype（ライセンス／ローカル未所持で表示不可）→ **Inter**（Google Fonts。ニュートラルなネオグロテスクで Diatype に近い）
  - 游ゴシック体 Pr6N M → **Noto Sans JP**（preview 表示用。実機では OS の游ゴシック Medium を優先）

### 3.4 文字サイズ・ウェイト階層

> デスクトップ（1440px）実測 px。**すべて weight 400**。太字を持たず、サイズと余白で階層を出す。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Title | ABC Diatype | 25px | 400 | 1.44 (36px) | 0.03em (0.75px) | セクション見出し（h2「New In」）。色 #000 |
| Hero Title | ABC Diatype | 25px | 400 | 1.44 (36px) | 0.03em (0.75px) | ヒーロー見出し「Organic Giza」。色 #080808 |
| Heading (h1/中見出し) | ABC Diatype | 16px | 400 | 1.63 (26px) | 0.06em (0.96px) | ページ見出し／コレクション名。色 #000 |
| Post / Card Title | ABC Diatype | 16px | 400 | 1.63 (26px) | 0.03em (0.48px) | 記事タイトル「How to Care…」。色 #000 |
| Body | 和欧混植 | 14px | 400 | 1.80 (25.2px) | 0.04em (0.56px) | 本文・カート等。色 #000 |
| Hero Subtitle | ABC Diatype | 11px | 400 | 1.82 (20px) | 0.06em (0.66px) | ヒーロー補足「MARKAWARE 2026 Aut…」。色 #080808 |
| Product Title | 和欧混植 | 11px | 400 | 1.82 (20px) | 0.06em (0.66px) | 商品名。色 #000 |
| Brand Label | ABC Diatype | 10px | 400 | 1.80 (18px) | 0.05em (0.5px) | 「markaware」等の極小ブランド表記。色 #000 |
| Nav Item | ABC Diatype | 10px | 400 | (70px 行送り) | 0.05em (0.5px) | グローバルナビ（Shop / All）。色 #000 |

- **ウェイトは 400 のみ**。強調したい要素はサイズを上げるか余白で分ける。太字（700）を使わない
- 文字色は #000 が基本。ヒーローのみ #080808。補助に #8c8c8c
- **サイズで威圧しない**。本文 14px、ラベル 10〜11px、見出しでも 16〜25px と抑えめ

### 3.5 行間・字間

- **行間 (line-height)**: 本文 **1.8** と広め（日本語の可読性を優先）。見出しは 1.44〜1.63。小さなラベルでも 1.8 前後を確保
- **字間 (letter-spacing)**: **0.03〜0.06em の微量トラッキング**を全体にあてる。本文 0.04em、見出し 0.03〜0.06em、ラベル 0.05em。ベタ組みではなく、わずかに開けて端正さを出す
- 本文の行間 1.8 は欧文サイトより明確に広い。余白の多い版面と合わせて「静けさ」をつくる

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 和文の標準的な行頭・行末禁則を守る
- 行頭禁止: `）」』】、。・：；？！` ／ 行末禁止: `（「『【`
- 商品名・英字ラベルは折り返しを避け、ひとまとまりで見せる

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";  /* body にグローバル適用 */
```

- 実測では **body に `font-feature-settings: "palt"` がグローバル適用**されている（見出しだけでなく本文・ナビ・ラベルまで字詰めが効く）
- ただし **フォーム部品（button / input / select）は `normal`**（palt 無効）。入力値の等幅感・可読性を保つため
- 小さな文字（10〜14px）を palt ＋微量トラッキングで端正に見せるのが MARKAWARE の作法

### 3.8 縦書き

該当なし。横書きのみ。

---

## 4. Component Stylings

### Buttons

> **塗りを持たないアウトライン**が基本。透明地＋ `1px solid #000`＋黒文字。形は **ピル（radius 100px）**。テキスト面・カードが radius 0 なのに対し、CTA だけ丸めるのが対比のポイント。

**Primary（アウトライン・ピル）** — 「カートに入れる」「詳しく見る」等
- Background: `transparent`
- Text: `#000000`（ABC Diatype / 13px / 400）
- Border: `1px solid #000000`（near-black 版は `1px solid #080808`）
- Border Radius: `100px`（ピル）
- Padding: `7px 36px`
- Letter Spacing: 約 0.04em

**Small（アウトライン・ピル 小）** — 補助アクション
- Background: `transparent`
- Text: `#000000`（11px / 400）
- Border: `1px solid #000000`
- Border Radius: `100px`
- Padding: `2px 36px`

**Secondary（テキスト系）** — 「買い物を続ける」等
- Background: `transparent`
- Text: `#000000`（13px / 400）
- Border: なし〜ヘアライン、または同じピル枠
- Border Radius: `100px`
- Hover: 地に淡いグレージュ（`#ecebe9`）を敷く程度に留める

- **塗りつぶしボタンは基本使わない**。強い CTA でも黒枠アウトラインで通す。ホバーも地を反転させず、淡く沈める程度

### Inputs

- Background: `transparent` / `#fcfcfc`
- Border: `1px solid #aaaaaa`、または下線のみ
- Border (focus): `1px solid #000000` ＋ ごく薄い `rgba(0,0,0,0.08)` リング
- Border Radius: `0px`（**入力は角丸なし**。CTA のピルとは別扱い）
- Padding: 約 11px 13px
- Font: ABC Diatype / 13〜14px / palt 無効（`normal`）
- Label: ABC Diatype / 10〜14px（小さな和文・英字ラベル）

### Cards

- Background: `#f7f6f3`（地）／面を分けるとき `#fcfcfc` or `#ecebe9`
- Border: なし、または `#ecebe9` / `#aaaaaa` のヘアライン
- Border Radius: `0px`（**カード・画像枠は直角**）
- 大きな素材／プロダクト画像を直角の枠で置き、その下に ABC Diatype の商品名（11px / #000）＋価格を小さく添える
- 影は持たず、地・ヘアライン・余白で面を分ける

---

## 5. Layout Principles

### Spacing

- 大きなビジュアルと広い余白で構成。要素間を十分に空け、小さな文字（10〜14px）が窮屈に見えないようにする
- 罫線は #aaaaaa または #ecebe9 のヘアライン。区切りで主張せず、余白で間を取る

### Container

- ワイドなエディトリアル・グリッド。左右に余白を取り、素材／プロダクト画像を主役にする
- セクション間は縦余白を十分に確保（本文行間 1.8 と呼応させる）

### Grid

- 商品一覧はカードグリッド（2〜4 カラム、ビューポートで可変）
- Gutter: 中〜広め。画像の縦横比を揃え、ABC Diatype の小さなラベルを等間隔に並べる

---

## 6. Depth & Elevation

> MARKAWARE は影をほぼ使わない。暖色オフホワイトの地・ヘアライン・余白・直角で階層をつくる完全フラット設計。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 全コンポーネントの基本。#ecebe9 / #aaaaaa のヘアラインで面を分ける |
| 1 | `0 1px 2px rgba(0,0,0,0.05)` | ドロワー・ポップアップ等、必要箇所のみ最小限 |
| 2 | `0 8px 24px rgba(0,0,0,0.08)` | モーダル（ニュースレターポップアップ等）。地は #fff |

- 濃淡が必要なときは影ではなく **面色の差（#f7f6f3 / #fcfcfc / #ecebe9）** で表現する
- フラット・直角（CTA のみピル）・ヘアラインが基本姿勢

---

## 7. Do's and Don'ts

### Do（推奨）

- 地は純白ではなく暖かいグレージュ #f7f6f3 を使う。面の差は #fcfcfc / #ecebe9 で付ける
- 欧文は ABC Diatype（代替 Inter）、和文は游ゴシック体 Pr6N M（代替 Noto Sans JP）。この一系統で通す
- **ウェイトは 400 に統一**する。強調はサイズと余白で行う
- 本文の line-height は 1.8、見出しは 1.44〜1.63。字間は 0.03〜0.06em の微量トラッキングをあてる
- palt を body にグローバル適用する（フォーム部品のみ normal）
- CTA は塗りを持たないアウトライン（透明地＋ 1px solid #000）＋ピル（radius 100px）にする
- テキスト面・カード・入力は角丸なし（radius 0）。CTA だけピルという対比を守る
- 罫線は #ecebe9 / #aaaaaa のヘアラインにする
- 素材／プロダクト画像を大きく置き、UI は引く

### Don't（禁止）

- 地に純白 #ffffff をベタで使わない（暖色グレージュ #f7f6f3 が基調。純白はポップアップのみ）
- 太字（700）で強調しない（ウェイト 400 統一が個性）
- 有彩の差し色・原色を足さない（無彩色＋黒で通す。`--swiper-theme-color: #007aff` はブランド色ではない）
- 塗りつぶしボタンを多用しない（アウトライン CTA が基調）
- CTA を角丸ゼロの角ボタンにしない（**CTA はピル radius 100px**。逆にカード・入力を丸めない）
- 明朝や複数書体を混ぜない（Diatype ＋游ゴシックの一系統）
- 行間・字間を詰めすぎない（本文 lh 1.8／微量トラッキングで余白と静けさを出す）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1〜2 カラム、ナビはドロワー。画像を主役に縦積み |
| Tablet | 768–1023px | 2〜3 カラムの商品グリッド |
| Desktop | ≥ 1024px | 2〜4 カラムのワイドなエディトリアル・グリッド |

- 文字サイズはモバイルでも小さめ設計を保つが、本文は 14px 前後、ラベルは最低 10px を確保して可読性を守る
- 地の暖色グレージュ・ヘアライン・余白・直角＋ピル CTA の作りはブレークポイントを越えて一貫させる

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。ピル CTA の padding（7px 36px）でタップ領域を確保する

### フォントサイズの調整

- 本文 14px、ラベル 10〜11px を基準に、モバイルでも極端に縮めない
- 微量トラッキング（0.03〜0.06em）と palt は各ブレークポイントで維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background: #f7f6f3（暖色グレージュ・基調）/ 面 #fcfcfc（near-white）/ #ecebe9（tint）
Text: #000000（基本）/ #080808（ヒーロー）/ #8c8c8c（補助）
Border: #ecebe9（淡ヘアライン）/ #aaaaaa（標準罫）
Accent: なし（無彩色＋黒で通す。#007aff は Swiper 既定でブランド色ではない）
Font（全要素）: ABCDiatype, "游ゴシック体 Pr6N M", "Yu Gothic Medium", ... , sans-serif
              /* 代替: Inter（欧文）/ Noto Sans JP（和文） */
Weight: 400 に統一（太字を使わない。階層はサイズと余白で）
Body: 14px / lh 1.8 / letter-spacing 0.04em
見出し: 16〜25px / lh 1.44〜1.63 / letter-spacing 0.03〜0.06em
OpenType: font-feature-settings: "palt"（body にグローバル。フォーム部品のみ normal）
CTA: 透明地＋1px solid #000＋黒文字、ピル（radius 100px）、padding 7px 36px
Radius: テキスト面・カード・入力は 0px（直角）/ CTA のみ 100px（ピル）
```

### プロンプト例

```
MARKAWARE のデザインシステムに従って、エシカルなメンズウェア EC のトップ＋商品一覧を作成してください。
- 地は暖色グレージュ #f7f6f3（純白ではない）。面の差は #fcfcfc / #ecebe9 で付ける
- 書体は欧文 ABC Diatype（代替 Inter）＋和文 游ゴシック体 Pr6N M（代替 Noto Sans JP）の一系統
- ウェイトは 400 に統一。太字を使わず、強調はサイズと余白で行う
- テキストは #000（ヒーローのみ #080808）、補助 #8c8c8c。有彩の差し色は持たない
- 本文 14px / line-height 1.8 / letter-spacing 0.04em、見出し 16〜25px / lh 1.44〜1.63 / ls 0.03〜0.06em
- palt を body にグローバル適用（フォーム部品のみ normal）
- CTA は塗りを持たないアウトライン（透明地＋1px solid #000＋黒文字）、ピル型（radius 100px）、padding 7px 36px
- テキスト面・カード・入力は角丸ゼロ（直角）。CTA だけピルにするという対比を守る
- 罫線は #ecebe9 / #aaaaaa のヘアライン。影は使わず、面色差と余白で階層をつくる
- オーガニックコットンや仕立て・サステナビリティを語る、静かでクラフト志向のトーンにする
```
