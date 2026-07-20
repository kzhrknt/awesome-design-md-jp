# DESIGN.md — 金沢21世紀美術館 (21st Century Museum of Contemporary Art, Kanazawa)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 対象サイト: https://www.kanazawa21.jp/
> 金沢21世紀美術館は、SANAA（妹島和世＋西沢立衛）設計の円形の建築で知られる公立の現代美術館。
> サイトも建築と同じく「白い地に、円と一色のオレンジ」で構成される。純白の面に作品写真を大きく置き、
> UI の彩色はブランドオレンジ `#f1832c` 一色に絞る。ステータス・カテゴリーは丸ピル（`border-radius: 900px`）の
> ラベルで示し、遷移ボタンも同じピル形で統一する。円をモチーフにした形状言語がサイト全体を貫く。
> 実測はトップページ / 展覧会一覧に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 純白（`#ffffff`）の地に作品写真をフルブリードで敷き、UI の色はブランドオレンジ `#f1832c` 一色に限定する。面を分けるのは白と極薄のグレー（`#f9f9f9` / `#f6f6f6`）だけ。彩度のある色は「オレンジのみ」という厳格な一色運用が、公立美術館らしい中立性と、企画展ごとに変わる作品写真の発色を両立させている
- **密度**: 中密度。展覧会・イベント・お知らせを並列に並べるカード型の情報設計で、写真＋ピルラベル＋日付＋タイトルという最小構成のパネルを反復する
- **キーワード**: 白地 / ブランドオレンジ一色 / 円（ピル） / SANAA / 公共性 / 写真主役
- **形状言語**: **円がモチーフ**。ステータスラベル・カテゴリーラベル・遷移ボタンはすべて `border-radius: 900px` の完全なピル形。スライダーのページネーションは `border-radius: 50%` の正円。一方でヘッダーの主要 CTA（チケット購入）だけは `border-radius: 0`（角ゼロの帯）で、ピルの群れの中で異質な「行動の帯」として立つ
- **書体の性格**: 和文は **游ゴシック体** をフォールバック先頭に置いた和文優先スタック。字間は基本 `normal`、`palt` は英字ラベル（Language / copyright）だけに限定的に適用。**行間はサイト全体でほぼ `1.63` に統一**されており（14px→22.82px, 16px→26.08px, 17px→27.71px, 25px→40.75px がすべて 1.63）、この一定比が誌面の均質なリズムを作っている

---

## 2. Color Palette & Roles

<!-- 実サイトの pageBackground / computedStyles / interactive / uniqueBackgrounds 実測に基づく。基調は「純白 + オレンジ一色 + グレースケール」 -->

### Base（下地）

- **Background** (`#ffffff`): ページ全体の下地。`body` の実測背景。純白。html は透明で、見える地色はこの純白
- **Surface Tint** (`#f9f9f9`): パネルの画像枠（`.panel__img`）の下地。写真が読み込まれる前の受け皿、および画像の余白を埋める極薄グレー
- **Surface Sunken** (`#f6f6f6`): フッター（`.footer`）およびスライダーのスロット下地。ページ末尾を一段沈める極薄グレー
- **Overlay** (`rgba(255,255,255,0.9)`): モーダル／トースト（休館のお知らせ）の面。**白の半透明**で、背後の作品写真をうっすら透かす

### Brand（ブランドカラー）

- **Brand Orange** (`#f1832c`): rgb(241,131,44)。**サイト唯一の彩度ある色**。ロゴ「21」、主要 CTA「チケット購入はこちら」の帯背景、「開催中」ステータスラベルの面、カテゴリーラベルの罫と文字、スライダーの現在位置ドット、重要なお知らせの見出し、フッターのコピーライトまで、色が必要な場所はすべてこの一色で担う
- **Brand Orange（面）**: 背景 `#f1832c` × 文字 `#ffffff`
- **Brand Orange（罫・文字）**: 背景 `#ffffff` × 文字 `#f1832c` × 罫 `1px solid #f1832c`

### Semantic（意味的な色）

このサイトは「エラー／警告／成功」の三色体系を持たず、**ステータスをオレンジとグレーの2値で表現**する。

- **Active / Important** (`#f1832c`): 「開催中」「重要なお知らせ」「有料」など、いま注意を向けるべき状態
- **Inactive / Upcoming** (`#969696`): rgb(150,150,150)。「開催予定」「無料」など、まだ始まっていない・強調しない状態。グレーの面塗り（`#969696` × `#ffffff`）または罫（`1px solid #969696` × 文字 `#969696`）で示す
- **Danger**: 専用色を持たない。フォームのエラー等が必要な場合は `#d0021b` 相当を最小限で足し、ブランドオレンジと混同させない

### Neutral（ニュートラル）

- **Text Primary** (`#323232`): rgb(50,50,50)。見出し・本文の基調色。**純黒ではなくわずかに退けた墨**
- **Text Base** (`#000000`): `body` の継承色。ナビ等の一部リンクに残る
- **Text on Dark** (`#ffffff`): 作品写真の上に重ねるヒーローのタイトル・日付
- **Text Muted** (`#969696`): 補助テキスト、非強調ステータス
- **Border** (`#a9a9a9`): rgb(169,169,169)。遷移ボタン（`.warrow-btn`）の外周罫
- **Border Light** (`#e8e8e8`): スライダーのページネーション（非アクティブ）の罫

### 色に関する設計思想

- 基調は「純白 `#ffffff`」「墨 `#323232`」「ブランドオレンジ `#f1832c`」の3色。ここに極薄グレー2色（`#f9f9f9` / `#f6f6f6`）とグレー2色（`#969696` / `#a9a9a9`）が加わるだけ
- **彩度のある色はオレンジ1色に限る**。展覧会ごとの作品写真が強い色を持つため、UI 側は徹底して無彩色＋オレンジに退く
- ステータスは「オレンジ＝いま起きていること」「グレー＝これから／補足」の2値で運用する
- 面塗り（`#f1832c` 背景）と罫（`#f1832c` 罫＋文字）を使い分け、同じオレンジで強度の階層を作る

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **游ゴシック体**（`游ゴシック体` → `YuGothic` → `游ゴシック` → `"Yu Gothic"` → `"Hiragino Kaku Gothic ProN"` → `Meiryo`）。Mac の游ゴシック（`游ゴシック体` / `YuGothic`）を最優先し、Windows の游ゴシック（`游ゴシック` / `Yu Gothic`）、ヒラギノ角ゴ ProN、Meiryo と続く**和文優先スタック**。Web フォントは使っていない
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ**: 和文スタック内の欧文グリフ（游ゴシックの Latin）をそのまま使う。欧文専用の指定を先頭に置かない
- **Roboto**: フッターのコピーライト（`.copyright`）のみ `font-family: Roboto` を単独指定。10px / `font-feature-settings: "palt"` で最小に置く
- **セリフ / 等幅**: 使用しない

> **代替フォントの注記**: 游ゴシックは macOS / Windows にバンドルされる OS フォントで、Google Fonts には存在しない。Linux やフォント未搭載環境では表示できないため、preview.html では次のように扱う。
> - 実スタックをそのまま先頭に置き、**末尾に Google Fonts の `Zen Kaku Gothic New` を追加**する（游ゴシックと同じく低コントラストで骨格の素直なヒューマニスト系ゴシックのため、印象が近い）
> - `Roboto` は Google Fonts でそのまま利用可
> - preview.html のインラインスタイル側のフォント指定も同じスタックに揃える
> - **Windows の游ゴシック問題**: Windows の `Yu Gothic` は Regular が細すぎるため、`font-weight: 400` の本文が痩せて見える。`@font-face` で `Yu Gothic Medium` を Regular にマッピングするか、本文を `font-weight: 500` 相当で組むことを検討する

### 3.3 font-family 指定

```css
/* 本文・UI（和文優先スタック） */
font-family: 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", YuGothic,
             "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;

/* コピーライト等の最小欧文ラベル */
font-family: Roboto, sans-serif;
```

**フォールバックの考え方**:
- 和文を先頭に置き、日本語の表示品質を最優先する（欧文グリフも游ゴシックの Latin をそのまま使う）
- Mac 名（`游ゴシック体` / `YuGothic`）→ Windows 名（`游ゴシック` / `Yu Gothic`）→ ヒラギノ → Meiryo の順で、両 OS を確実にカバーする
- ウェイトは **400 と 700 の2段**が基本。中間の 500 は英字ラベル（Language）にのみ現れる。階層はサイズとウェイトの2軸で作る

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Title | 游ゴシック体 | 25px | 700 | 1.63 (40.75px) | normal | 写真上の展覧会タイトル（白文字） |
| Hero Subtitle | 游ゴシック体 | 25px | 400 | 1.63 (40.75px) | normal | 写真上の会期（白文字） |
| Section Title | 游ゴシック体 | 26px | 700 | 1.2 (31.2px) | normal | 「展覧会」「イベント」等の区分見出し |
| Panel Title | 游ゴシック体 | 17px | 700 | 1.63 (27.71px) | normal | 展覧会カードのタイトル |
| Sub Heading | 游ゴシック体 | 16px | 700 | 1.63 (26.08px) | normal | 小見出し・関連施設名 |
| Widget Title | 游ゴシック体 | 15px | 700 | 1.63 (24.45px) | normal | 「本日の美術館」等のウィジェット見出し |
| Body | 游ゴシック体 | 16px | 400 | 1.63 (26.08px) | normal | 本文・カードの日付 |
| Body Emphasis | 游ゴシック体 | 16px | 700 | 2.0 (32px) | normal | 強調本文（お知らせ／コンセプト文） |
| Nav Link | 游ゴシック体 | 14px | 700 | 1.0 (14px) | normal | グローバルナビ |
| Meta / Notice | 游ゴシック体 | 14px | 700 | 1.63 (22.82px) | normal | 「重要なお知らせ：」等（オレンジ） |
| Label (pill) | 游ゴシック体 | 13px | 700 | 1.0 | normal | ステータス／カテゴリーのピルラベル |
| Small | 游ゴシック体 | 13px | 400 | 1.6 (20.8px) | 0.02em (0.26px) | 注釈・トースト本文 |
| Caption | 游ゴシック体 | 12px | 700 | 1.63 (19.56px) | normal | 曜日表示等の極小テキスト |
| Copyright | Roboto | 10px | 400 | 1.6 (16px) | normal | フッター最下部（オレンジ・palt on） |

### 3.5 行間・字間

- **本文の行間 (line-height)**: **`1.63`**。このサイトの決定的な特徴で、14px / 15px / 16px / 17px / 18px / 25px のいずれも 1.63 倍の行間で組まれる（22.82 / 24.45 / 26.08 / 27.71 / 29.34 / 40.75px）。日本語として十分な余裕を持ちつつ、情報量の多い美術館サイトが間延びしない絶妙な値
- **強調本文の行間**: `2.0`（16px で 32px）。お知らせ・コンセプト文など読ませる段落だけ広げる
- **セクション見出しの行間**: `1.2`（26px で 31.2px）。見出しだけは詰める
- **ナビ・ピルラベルの行間**: `1.0`。1行に収まる UI 要素は行間ゼロ相当にして高さを揃える
- **字間 (letter-spacing)**: 原則 **`normal`**。例外は 13px / 16px の一部テキストで `0.26px`（= `0.02em`）

**ガイドライン**:
- 本文・見出しを問わず `line-height: 1.63` を既定にすれば、このサイトのリズムはほぼ再現できる
- 字間は開かない。階層はサイズ（12〜26px）とウェイト（400 / 700）で作る
- ピルラベル・ナビは `line-height: 1.0` にし、高さは padding で制御する

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 展覧会タイトルは固有名詞・記号（「アペルト21」「路上、お邪魔ですか？」等）を含むため、`word-break: break-all` は使わず語のまとまりを保つ

### 3.7 OpenType 機能

```css
/* 既定 */
font-feature-settings: normal;

/* 英字の小ラベル・コピーライトのみ */
font-feature-settings: "palt";
```

- **本文・見出しは `palt` を使わない**（`font-feature-settings: normal`）。和文の字送りはベタ組みのまま
- `palt` を当てるのは「Language」ラベル（12〜14px / weight 500 / オレンジ）と、フッターの Roboto コピーライト（10px）のみ。**極小の欧文ラベルを詰めるためだけの限定運用**
- この使い分け（本文ベタ組み／極小ラベルのみ palt）を守ると、公共施設らしい素直な読み味になる

### 3.8 縦書き

該当なし（横書きのみ）。

---

## 4. Component Stylings

**形状の原則**: ステータス／カテゴリーのラベルと遷移ボタンは `border-radius: 900px` の完全なピル。スライダーのドットは `border-radius: 50%` の正円。ヘッダーの主要 CTA だけ `border-radius: 0` の角ゼロ帯。

### Buttons

**Primary CTA（チケット購入 / 角ゼロの帯）**
- Background: `#f1832c`
- Text: `#ffffff`
- Border: なし
- Border Radius: `0px`（**ピルではない**。ヘッダー右下に貼り付く帯として置く）
- Padding: `0 20px`（高さは行ボックスで確保。実装上は 48px 前後）
- Font Size: 14px / Weight 700 / line-height 1.63
- 右端に `>`（シェブロン）を白で置く
- 例: 「チケット購入はこちら」

**Secondary CTA（予約導線 / 反転）**
- Background: `#ffffff`
- Text: `#f1832c`
- Border: なし
- Border Radius: `0px`
- Padding: `0 20px`
- Font Size: 14px / Weight 700
- 右端に `>` をオレンジで置く
- 例: 「スイミング・プール鑑賞の予約」。Primary の直下に積み、2段の帯として一体で見せる

**Ghost Pill（一覧への遷移 / `.warrow-btn`）**
- Background: `#ffffff`
- Text: `#323232`
- Border: `1px solid #a9a9a9`
- Border Radius: `900px`（完全なピル）
- Padding: `10px 55px 8px 33px`（**右に大きく振った非対称パディング**。右端に置くシェブロンの分を空ける。上下も 10px / 8px と非対称で、游ゴシックの文字の光学的中心を合わせている）
- Font Size: 14px / Weight 700 / line-height 1.5
- 例: 「展覧会ページへ」「イベントページへ」「出版刊行物ページへ」。セクション末尾に必ず1つ置く

### Labels / Badges（ピルラベル）

すべて共通で `border-radius: 900px` / `padding: 5px 11px 4px` / `font-size: 13px` / `font-weight: 700`。**4バリアント**で状態とカテゴリーを表す。

| Variant | Background | Text | Border | 用途 |
|---------|-----------|------|--------|------|
| `important`（面・オレンジ） | `#f1832c` | `#ffffff` | `1px solid #f1832c` | 「開催中」— いま体験できるもの |
| `primary`（罫・オレンジ） | `#ffffff` | `#f1832c` | `1px solid #f1832c` | 「有料」「イベント」「トーク」「ワークショップ」「パフォーマンス」「ラーニングプログラム」「交流イベント」「友の会」 |
| `secondary`（面・グレー） | `#969696` | `#ffffff` | `1px solid #969696` | 「開催予定」— まだ始まっていないもの |
| `default`（罫・グレー） | `#ffffff` | `#969696` | `1px solid #969696` | 「無料」等の非強調属性 |

- padding が `5px 11px 4px` と上下非対称なのは、和文の文字面をピルの視覚的中心に置くための調整
- 1枚のカードに「状態ラベル1つ＋カテゴリーラベル1〜2つ」を並べるのが基本

### Pagination Dots

- Shape: `border-radius: 50%`（正円）
- 非アクティブ: Background `#ffffff` / Border `1px solid #e8e8e8`
- アクティブ: Background `#f1832c` / Border `1px solid #e8e8e8`
- ヒーロースライダーの現在位置表示。**円の建築モチーフをそのまま UI に持ち込んだ要素**

### Inputs

- Background: `transparent`（下地の白をそのまま見せる）
- Border: なし（罫を持たず、アイコンとプレースホルダだけで入力欄を示す）
- Border Radius: `0px`
- Padding: `0 0 0 30px`（左に虫眼鏡アイコン分を空ける）
- Font Size: 20px（検索フィールド）/ Weight 400 / line-height 1.5
- Color: `#000000`
- フォーム用途では罫を足す場合、`1px solid #a9a9a9`、フォーカス時 `1px solid #f1832c` とし、ボタンの罫色に揃える

### Cards（パネル）

- Background: `#ffffff`
- 画像枠: `#f9f9f9`（写真読み込み前・余白の受け皿）
- Border: なし
- Border Radius: `0px`（**カードは角ゼロ**。丸いのはピルと円だけ）
- Shadow: なし（フラット）
- 構成: 画像 → ピルラベル群（状態＋カテゴリー）→ 日付（16px / 400）→ タイトル（17px / 700 / `#323232`）の順に上から積む

### Toast / Modal

- Background: `rgba(255,255,255,0.9)`（背後の作品写真を透かす半透明の白）
- Border Radius: `0px`
- 見出し: 16px / 700 / letter-spacing `0.02em`
- 本文: 13px / 400 / line-height 1.6 / letter-spacing `0.02em`
- 閉じるボタン: オレンジ `#f1832c` の `×`
- 左上にオレンジのアクセント罫を短く置く

---

## 5. Layout Principles

### Spacing Philosophy

純白の余白を広く取り、作品写真をフルブリードで見せる。セクションは罫ではなく余白と見出しで区切り、末尾に必ずピル形の遷移ボタン（`.warrow-btn`）を1つ置いて閉じる。フッターだけ `#f6f6f6` に沈めてページの終端を示す。

### Spacing Scale（推定）

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 11px |
| M | 20px |
| L | 33px |
| XL | 55px |
| XXL | 80px |

（ピルラベルの `5px 11px`、CTA の `0 20px`、`.warrow-btn` の `33px / 55px` から導いた実測ベースのスケール）

### Container

- Max Width: 1280px（ヒーロースライダー・作品写真はフルブリード）
- Padding (horizontal): 20〜40px

### Grid

- Columns: 12
- Gutter: 20〜30px
- 展覧会・イベントのパネルは 3〜4 カラム。関連施設（`.tomonokai-panel`）は 4 カラム
- ヘッダーは左にロゴ（円のシンボル）、右に「本日の美術館」カレンダーウィジェット（白い浮きカード）、右下に CTA の帯2段という非対称配置

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。パネル・セクション・ラベルはすべてフラット |
| 1 | `0 1px 3px rgba(0,0,0,0.08)` | 「本日の美術館」ウィジェット、ドロップダウン |
| 2 | `0 4px 16px rgba(0,0,0,0.10)` | トースト（お知らせ）、モーダル |

- 影はほぼ使わない。奥行きは「白の面」「極薄グレーの面（`#f9f9f9` / `#f6f6f6`）」「作品写真の上の半透明白」で表現する
- 作品写真の上に置く要素は、影ではなく**半透明の白**（`rgba(255,255,255,0.9)`）で持ち上げる

---

## 7. Do's and Don'ts

### Do（推奨）

- 下地は純白 `#ffffff`、文字は墨 `#323232`、彩色はブランドオレンジ `#f1832c` の**1色だけ**にする
- ステータス・カテゴリーのラベルは `border-radius: 900px` の完全なピルにし、`padding: 5px 11px 4px` / 13px / 700 で統一する
- ラベルは4バリアント（面オレンジ＝開催中 / 罫オレンジ＝カテゴリー・有料 / 面グレー＝開催予定 / 罫グレー＝無料）で運用する
- 一覧への遷移は `.warrow-btn`（白地・`1px solid #a9a9a9` の罫・ピル・右に振った非対称パディング `10px 55px 8px 33px`）で統一し、セクション末尾に1つ置く
- ヘッダーの主要 CTA だけは `border-radius: 0` の角ゼロ帯（`#f1832c` × `#ffffff`）にして、ピルの群れから際立たせる
- **行間は `1.63` を既定**にする（14px→22.82px, 16px→26.08px, 17px→27.71px, 25px→40.75px）。読ませる段落だけ `2.0` に広げる
- 字間は `normal`。`palt` は極小の欧文ラベル（Language / copyright）にのみ限定して当てる
- カード・モーダル・入力欄は `border-radius: 0` の角ゼロ・影なしにする
- 和文フォントは Mac 名 → Windows 名 → ヒラギノ → Meiryo の順で必ずフォールバックチェーンを書く

### Don't（禁止）

- オレンジ以外の彩度ある色を UI に足さない（作品写真の発色を殺す）
- ステータスに赤・緑・青の三色信号を使わない（オレンジとグレーの2値で表す）
- カード・モーダルに角丸や影を付けない（丸いのはピルラベルと正円ドットだけ）
- ピルラベルを半端な角丸（`4px` や `8px`）にしない（`900px` の完全なピルを守る）
- 本文・見出しに `palt` を当てない（ベタ組みが基調）
- 字間を開けない（`normal`。例外は 13px 前後の注釈の `0.02em` のみ）
- 和文本文の line-height を 1.5 未満に詰めない（1.63 が基準）
- テキストに純黒 `#000000` を多用しない（本文は `#323232`）
- 和文フォントを1つだけ指定しない（游ゴシックは Mac 名と Windows 名の両方が必要）

---

## 8. Responsive Behavior

### Breakpoints（推定）

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。ナビはハンバーガー、CTA の帯は画面下部に固定 |
| Tablet | ≤ 1024px | 2カラム |
| Desktop | > 1024px | 3〜4カラム＋フルブリードのヒーロースライダー |

### タッチターゲット

- 最小サイズ: 44px × 44px
- ピルラベルは 13px / padding `5px 11px 4px` と小さいため、**タップ対象にはしない**（表示専用）。タップ領域はカード全体で取る

### フォントサイズの調整

- 本文は 16px 基調。モバイルでも 14px 未満に落とさず、`line-height: 1.63` を保つ
- ヒーローのタイトル（25px）はモバイルで 18〜20px に縮小。会期表示（25px / 400）は 14〜16px に
- セクション見出し（26px / 700）はモバイルで 20px 程度に
- ピルラベル（13px）はモバイルでも縮小しない（可読性の下限）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff（純白）
Surface Tint:    #f9f9f9（画像枠）
Surface Sunken:  #f6f6f6（フッター）
Brand Orange:    #f1832c（サイト唯一の彩色）
Text Primary:    #323232
Text Muted:      #969696
Border:          #a9a9a9
Border Light:    #e8e8e8
Font:            游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", YuGothic,
                 "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
                 （→ Zen Kaku Gothic New 代替）
Font (label):    Roboto（10px コピーライトのみ）
Body Size:       16px
Line Height:     1.63（全体の既定）/ 2.0（読ませる段落）/ 1.2（セクション見出し）
Letter Spacing:  normal（例外: 13px 注釈の 0.02em）
palt:            off（例外: 極小欧文ラベルのみ on）
Radius:          900px（ピルラベル・遷移ボタン）/ 50%（ドット）/ 0（カード・CTA帯・入力欄）
CTA(帯):         #f1832c / #ffffff / radius 0 / padding 0 20px / 14px 700 / 右にシェブロン
CTA(反転帯):     #ffffff / #f1832c / radius 0 / padding 0 20px / 14px 700
Ghost Pill:      #ffffff / #323232 / 1px solid #a9a9a9 / radius 900px / padding 10px 55px 8px 33px
Label 開催中:    #f1832c / #ffffff / 1px solid #f1832c / radius 900px / padding 5px 11px 4px / 13px 700
Label カテゴリー: #ffffff / #f1832c / 1px solid #f1832c / 同上
Label 開催予定:  #969696 / #ffffff / 1px solid #969696 / 同上
Label 無料:      #ffffff / #969696 / 1px solid #969696 / 同上
Card:            radius 0 / shadow なし / 画像枠 #f9f9f9
```

### プロンプト例

```
金沢21世紀美術館のデザインシステムに従って、展覧会一覧セクションを作成してください。
- 下地: #ffffff（純白）、画像枠: #f9f9f9、文字: #323232
- 彩色はブランドオレンジ #f1832c の1色のみ。他の彩度ある色は使わない
- フォント: 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", YuGothic, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif
- 本文 16px / line-height 1.63、字間 normal、palt off
- 各カードは「画像 → ピルラベル群 → 日付 16px/400 → タイトル 17px/700」の順で積む
- ピルラベルは border-radius 900px / padding 5px 11px 4px / 13px / 700 で統一
  - 開催中 = #f1832c 面 × #ffffff 文字
  - 開催予定 = #969696 面 × #ffffff 文字
  - カテゴリー（イベント・トーク等）= #ffffff 面 × #f1832c 文字 × 1px solid #f1832c
  - 無料 = #ffffff 面 × #969696 文字 × 1px solid #969696
- カード自体は border-radius 0・影なし・罫なしのフラット
- セクション末尾に「展覧会ページへ」の Ghost Pill（白地 / 1px solid #a9a9a9 / radius 900px /
  padding 10px 55px 8px 33px / 14px 700 / 右端にシェブロン）を1つ置く
```

### OS フォントが使えない環境での代替指針

- 游ゴシック（游ゴシック体 / Yu Gothic）は macOS / Windows の OS フォントで、Google Fonts には存在しない
- 代替は **Zen Kaku Gothic New**（低コントラストで骨格の素直なヒューマニスト系ゴシック。游ゴシックに印象が近い）
- Roboto は Google Fonts でそのまま利用可
- 代替フォントでも「純白の地・オレンジ一色の彩色・完全なピル形のラベル・角ゼロのカード・影なし・行間 1.63・字間 normal」を守れば世界観は再現できる
