# DESIGN.md — ヌーラボ（Nulab）

> 株式会社ヌーラボ（https://nulab.com/ja/）のデザイン仕様書。
> 2004 年福岡創業。Backlog / Cacoo / Nulab Pass / Nulab Flowbase を開発・提供するコラボレーションツールベンダー。
> 最大の特徴は、**サービスごとに「淡いティントの面」を割り当てる**こと。Backlog はミント `#edfaf6`、Cacoo は青 `#eef2fa`、Nulab Pass はラベンダー `#f4f3ff`、Flowbase はシアン `#effbff`。**面色そのものが製品の識別子**になっている。
> CTA は 2 系統に分かれる。**サービス導線はグレーパープル `#74758b`、コーポレートの決定操作はブランドパープル `#7a6abf`**。同じ形（radius 4px）で色だけを役割で分ける。
> **`palt` を掛けず、`letter-spacing` は 0.02em（本文）と 0.05em（リード・大見出し）の 2 段のみ**。
> 実サイトの computed style 実測（2026-08-12 取得。トップ＋「会社概要」ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地に、淡いティントの大きな面**。彩度の高い色は CTA とロゴだけに閉じ込め、面は必ず明度 95% 以上のパステルに落とす。**「賑やかだが、うるさくない」**を色の設計で作る
- **ヌーラボについて**: 「“このチームで一緒に仕事できてよかった”を世界中に生み出していく。」がミッション。**製品が 4 つあり、それぞれにブランドカラーがある**という難題を、「濃い色はロゴに、淡い色は面に」の分業で解いている
- **密度**: 中密度。トップは 全幅 KV（イラスト）→ サービス紹介の縦積みティントブロック → ニュース。**1 サービス = 1 ブロック**で、面色が切り替わることが章の区切りになる
- **キーワード**: 白地、サービス別ティント、グレーパープル CTA、ブランドパープル、radius 4px、Noto Sans JP、影は 1 段だけ
- **特徴**:
  - **和文・欧文を 1 つのスタックで通す**。`"Noto Sans JP"` 先頭の 8 段フォールバック。**要素ごとに書体を切り替えない**
  - **サービスごとのティント面**が設計の核。`#edfaf6`（Backlog）/ `#eef2fa`（Cacoo）/ `#f4f3ff`（Nulab Pass）/ `#effbff`（Flowbase）。**いずれも彩度は低く、白との差は 3〜5% 程度**
  - **CTA が 2 系統**。サービス導線は **`#74758b`（グレーパープル）**、コーポレートの決定操作（同意する・お問い合わせ）は **`#7a6abf`（ブランドパープル）**。**形は同じで色だけ違う**
  - **ボタンの radius は 4px で固定**。pill を使わない（検索窓だけが radius 50px の例外）
  - **ボタンの border は必ず 2px**。塗りボタンでも `2px solid transparent` を置き、アウトライン版と高さを揃える
  - **KV はネイビー `#27455c` の 1 面**。ページ内で唯一の暗い大面積で、ここだけ白抜き
  - **本文は `#17171c`、補足は `#6a6a6a`** の 2 段。純黒を使わない
  - **`box-shadow` は実質 1 段**（`rgba(28,28,28,0.2) 0 2px 4px`）。浮かせるのはドロップダウンだけ
  - **`palt` を掛けない**（`font-feature-settings: normal`）

---

## 2. Color Palette & Roles

> 実測値。地は純白 `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）。**濃い色（パープル・ネイビー）と淡い色（ティント）が明確に分離**しており、中間の彩度がほとんど存在しない。

### Brand（ブランド）

- **Brand Purple** (`#7a6abf`, rgb 122,106,191): **主色**。コーポレートの決定操作（「同意する」「お問い合わせ」「すべて許可する」）、テキストリンク、アウトラインボタンの枠。**「ヌーラボ自身の意思」を表す色**
- **Deep Purple** (`#615499`, rgb 97,84,153): リード文の色。`#7a6abf` を一段沈めた版。**24px の太字リード（「つながりの力を引き出し、チームをドライブさせる」）専用**
- **Purple Alt** (`#7e67c5`, rgb 126,103,197): Value カード（Try First / Love Differences）の面。主色よりわずかに青寄り
- **Slate Purple** (`#74758b`, rgb 116,117,139): **サービス導線 CTA の面**。「Backlog を詳しく見る」「Cacoo を詳しく見る」等。**製品側の導線は必ずこの色**
- **Slate Purple Light** (`#75768b`, rgb 117,118,139): ニュースカードの面。CTA の `#74758b` と 1 の差しかないが**別トークンとして運用されている**
- **Slate Outline** (`#5d5e6f`, rgb 93,94,111): アウトラインボタンの枠と文字（「サービス一覧を見る」）
- **Navy** (`#27455c`, rgb 39,69,92): **KV の地色**。ページ内で唯一の暗い大面積
- **Mint Accent** (`#50e3c2`, rgb 80,227,194): ページ内ナビの現在位置インジケーター。Backlog のロゴ色に由来する**唯一の高彩度アクセント**
- **Link Blue** (`#3860be`, rgb 56,96,190): 一部フィルタ UI のアイコン面

### Service Tints（サービス別ティント面）— このサイトの核

- **Backlog Mint** (`#edfaf6`, rgb 237,250,246): Backlog 紹介ブロックの面
- **Cacoo Blue** (`#eef2fa`, rgb 238,242,250): Cacoo 紹介ブロックの面
- **Nulab Pass Lavender** (`#f4f3ff`, rgb 244,243,255): Nulab Pass 紹介ブロックの面
- **Flowbase Cyan** (`#effbff`, rgb 239,251,255): Nulab Flowbase 紹介ブロックの面
- **Purple Tint** (`#f3f0fa`, rgb 243,240,250): コーポレート側のセクション面。ブランドパープルの薄版

> **4 つのティントはいずれも白との差が 3〜5%**。並べたときに「4 つある」と分かる程度の差にとどめ、**どれか 1 つが目立つことがない**ように設計されている。

### Neutral（面・文字）

- **Background** (`#ffffff`): ページ地色
- **Surface** (`#f5f5f7`, rgb 245,245,247): ミッションステートメントのセクション面
- **Surface 2** (`#f9f9f9`, rgb 249,249,249): フッター上部・Mission＆Value セクションの面
- **Surface 3** (`#f2f2f2` / `#f4f4f4`): 問い合わせブロック等の面
- **Ink** (`#17171c`, rgb 23,23,28): 見出し・本文の主文字色。**純黒 `#000000` は使わない**
- **Ink Muted** (`#6a6a6a`, rgb 106,106,106): 補足文・フッター・ナビの文字色。`body` の既定色
- **Ink Dark** (`#282828`, rgb 40,40,40): モーダル内の見出し
- **Border** (`#d1d1d1`, rgb 209,209,209): 検索入力の枠

### Semantic（意味的な色）

サイト上に明示的なエラー色・成功色は現れない。実装時は以下を目安にする。

- **Danger／Error**: `#c1392b` 目安。**パープルと衝突しない彩度**に抑える
- **Warning**: `#b8860b` 目安。ティント面の上でも見えること
- **Success**: `#3b8f6d` 目安。Backlog のミント `#edfaf6` と混同されないよう明度を下げる
- **非活性**: 面 `#f2f2f2` ／ 枠 `#d1d1d1` ／ 文字 `#6a6a6a`

---

## 3. Typography Rules

> **1 つのフォントスタックで和欧すべてを通す**。`"Noto Sans JP"` 先頭の 8 段。字間は **0.02em（本文）と 0.05em（リード・大見出し）の 2 段**のみで、それ以外は `normal`。

### 3.1 和文フォント

- **全要素共通**: **Noto Sans JP**（Google Fonts）。Adobe Fonts に依存しないため、**preview.html でも実サイトと同じ書体が出る**
- **ウェイト**: **400（本文）/ 600（一部の UI ラベル）/ 700（見出し・ボタン）** の 3 段
- **フォールバック**: `"hiragino sans"` → `"Hiragino Kaku Gothic ProN"` → `meiryo` → `helvetica` → `roboto` → `arial` → `sans-serif`
- **和文を先頭に置く和文優先スタック**。欧文専用書体を先に置かないため、**英数字も Noto Sans JP の字形で出る**
- ヌーラボは**フォールバックに `meiryo` を明示**している。Windows 環境での可読性を優先した判断で、游ゴシックより先に置かれている

### 3.2 欧文フォント

- **欧文専用の書体を持たない**。製品名（Backlog / Cacoo / Nulab Pass）も Noto Sans JP の英字グリフで組む
- 例外はサードパーティ製の同意管理モーダルのみで、そこだけ `Gilroy, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif` が当たる。**自社の設計には持ち込まない**
- 等幅フォントは使わない
- **preview.html での注記**: Noto Sans JP は Google Fonts から取得できるため、**代替フォントを立てる必要がない**。実サイトと同じ書体で確認できる

### 3.3 font-family 指定

```css
/* 全要素共通 */
font-family: "Noto Sans JP", "hiragino sans", "Hiragino Kaku Gothic ProN",
             meiryo, helvetica, roboto, arial, sans-serif;

/* body の既定 */
font-size: 16px;
font-weight: 400;
line-height: 1.5;              /* 24px */
letter-spacing: normal;
color: #6a6a6a;
font-feature-settings: normal; /* palt は使わない */
```

**フォールバックの考え方**:
- **和文を先頭に置く**。欧文専用書体で先取りせず、英数字も和文書体の字形に揃える
- **`meiryo` を `Hiragino` の直後に置く**（游ゴシックより優先）。Windows での本文の太りを避ける
- **要素ごとに `font-family` を切り替えない**。1 スタックで通すのがこのサイトの方針
- Web フォントが落ちても崩れないよう、`hiragino sans` / `meiryo` の 2 つで OS 双方を押さえる

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Letter Spacing | Color | 備考 |
|------|------|--------|-------------|----------------|-------|------|
| Section Head (Large) | 46px | **700** | 1.3 (59.8px) | **0.05em (2.3px)** | `#17171c` | 「チームワークマネジメント」 |
| Hero Head | 40px | **700** | **1.4 (56px)** | normal | `#ffffff` | KV の白抜き 2 行 |
| Sub Head | 25px | **700** | 1.52 (38px) | normal | `#17171c` | 「コラボレーションで生まれる無限の可能性を体験」 |
| Section Head | 24px | **700** | 1.5 (36px) | normal | `#17171c` | 「サービス紹介」 |
| Lead (Purple) | 24px | **700** | 1.5 (36px) | **0.05em (1.2px)** | **`#615499`** | 「つながりの力を引き出し、チームをドライブさせる」 |
| Lead (Body) | 20px | 400 | 1.44 (28.8px) | normal | `#6a6a6a` | 「製品のリリース情報やユーザーイベントなど最新…」 |
| Card Title | 18px | **700** | 1.6 (28.8px) | normal | `#ffffff` | ニュースカードの見出し |
| Footer Head | 18px | **700** | 1.6 (28.8px) | normal | `#6a6a6a` | 「サービス内容」 |
| Body | 16px | 400 | **1.7 (27.2px)** | **0.02em (0.32px)** | `#17171c` | サービス説明の本文 |
| Body (Dense) | 16px | 400 | 1.6 (25.6px) | 0.02em (0.32px) | `#17171c` | 長めの説明段落 |
| Button Label | 16px | **700** | 1.4 (22.4px) | normal | `#ffffff` / `#5d5e6f` | 「Backlog を詳しく見る」 |
| Nav | 16px | 400 | 1.0 (16px) | normal | `#17171c` | グローバルナビ |
| Footer Nav | 16px | 400 | 1.3 (20.8px) | normal | `#6a6a6a` | 「全サービス」 |
| Sub Head (Small) | 16px | **700** | 1.4 (22.4px) | normal | `#ffffff` | 導入事例カードの見出し |
| Link (Purple) | 14px | 400 | 1.5 (21px) | normal | **`#7a6abf`** | 「Backlog ユーザーコミュニティ「JBUG」」 |
| Note | 14px | 400 | 1.3 (18.2px) | normal | `#6a6a6a` | 「（新しいタブで開く）」 |
| Modal Label | 14px | **600** | 1.7 (23.8px) | 0.01em (0.14px) | `#7a6abf` | 「クッキー設定」 |

- **本文の行間は 1.7**（16px → 27.2px）。日本語サイトとしては標準的だが、**見出しの 1.3〜1.5 と明確に分けている**
- **見出しは 46px / 40px / 25px / 24px の 4 段**。中間サイズ（30〜36px）を作らない
- **`letter-spacing` は 2 段だけ**: 本文 **0.02em**、リードと 46px 大見出し **0.05em**。それ以外は `normal`
- **ウェイトは 400 と 700 の 2 極**。600 はサードパーティ UI 由来で、自社設計では使わない
- **リンクの色 `#7a6abf` は 14px の小さいテキストにだけ**当てる。本文中のリンクは下線で示す

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.7**（16px → 27.2px）。密度を上げたい段落だけ 1.6
- **見出しの行間**: **1.3〜1.5**。46px 大見出しは 1.3、24〜25px の中見出しは 1.5、KV の 40px だけ **1.4**（2 行に割って読ませるため広め）
- **ナビの行間**: **1.0**（16px → 16px）。1 行しか入らない要素は行送りをゼロにする
- **字間 (letter-spacing)**:
  - **本文: 0.02em**（16px → 0.32px）
  - **リード・46px 大見出し: 0.05em**（24px → 1.2px / 46px → 2.3px）
  - **それ以外は `normal`**（ナビ・ボタン・カード見出し・KV）
- **`palt` は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- **字間の 2 段（0.02em / 0.05em）以外の値を作らない**。ボタンとナビは `normal` のまま
- **KV の見出しには字間を当てない**。40px の白抜きは字間ゼロで塊として見せる
- **リードの 0.05em は色（`#615499`）とセットで動く**。字間だけ、色だけを真似しない
- 本文の行間 1.7 を下回らない（密度を上げても 1.6 まで）
- ボタンのラベルは行間 1.4。ボタン内で 2 行に折らない前提の値

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- **製品名は必ず「欧文（カタカナ）」の組**で書く（`Backlog（バックログ）` / `Cacoo（カクー）` / `Nulab Pass（ヌーラボ パス）`）。**欧文と丸括弧の間で折らない**
- 「コラボレーション」「プラットフォーム」等の長いカタカナ語は、**意味の切れ目で折る**
- **KV の見出しは意図した位置で改行する**（「“このチームで一緒に仕事できてよかった”」／「を世界中に生み出していく。」）。自動折り返しに任せない
- ボタンのラベル（「Backlog を詳しく見る」）は折り返さない（`white-space: nowrap`）

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を掛けない */
```

- **`palt` は使わない**。Noto Sans JP の等幅の字面をそのまま使う
- 字間は `letter-spacing` を**開く方向でのみ**調整する（0.02em / 0.05em）
- **和欧が同じ書体**なので、`Backlog（バックログ）` のような混植でも字形が揃う。**混植を避ける必要がない**のがこのサイトの利点
- 数字はプロポーショナルのまま。表組みで桁を揃える必要があるときだけ `font-feature-settings: "tnum"` を足す

### 3.8 縦書き

- 現行サイトは全面横組み（`writing-mode: horizontal-tb`）
- 縦組みを使う予定がない設計。もし必要になった場合は以下

```css
writing-mode: vertical-rl;
text-orientation: mixed;
font-family: "Noto Sans JP", "hiragino sans", "Hiragino Kaku Gothic ProN",
             meiryo, sans-serif;
letter-spacing: 0.05em;   /* 縦組みは見出しの字間に揃える */
line-height: 1.7;
```

- 縦組み中の英数字は `text-combine-upright: all` で 2 桁までを縦中横にする
- **製品名（Backlog / Cacoo）は縦組みに入れない**。横組みブロックに逃がす

---

## 4. Component Stylings

### Buttons

**Service CTA（サービス導線）** — 最も使用頻度の高い形

- Background: **`#74758b`**（スレートパープル）
- Text: `#ffffff`
- Border: **`2px solid transparent`**（アウトライン版と高さを揃えるためのゼロ幅枠）
- Padding: **`8px 14px 8px 38px`**（左に 38px＝アイコン用の余白）
- Border Radius: **`4px`**
- Font: 16px / **weight 700** / lh 1.4 / ls normal
- 例: 「Backlog を詳しく見る」「Cacoo を詳しく見る」「Nulab Pass を詳しく見る」「Nulab Flowbase を詳しく見る」
- **左に製品アイコン、右に外部リンクアイコン**を置く。padding-left 38px はアイコンのための固定値

**Brand CTA（コーポレートの決定操作）**

- Background: **`#7a6abf`**（ブランドパープル）
- Text: `#ffffff`
- Border: `1px solid #7a6abf` ／ 全幅版は `2px solid transparent`
- Padding: `12px 30px`（モーダル）／ `8px 30px`（ページ内）
- Border Radius: **`4px`**
- Font: 16px / **weight 700**
- 例: 「お問い合わせ」「すべて許可する」「この内容で許可する」「チームワークマネジメントを詳しく見る」
- **サービス導線（`#74758b`）と形は同一。色だけで役割を分ける**

**Outline CTA**

- Background: `#ffffff`
- Text: **`#5d5e6f`**
- Border: **`2px solid #5d5e6f`**
- Padding: **`14px 14px 14px 38px`**（塗りより上下が厚い）
- Border Radius: **`4px`**
- Font: 16px / **weight 700** / lh 1.54
- 例: 「サービス一覧を見る」
- ブランドパープル版のアウトライン（`2px solid #7a6abf` / 文字 `#7a6abf`）は「すべて拒否する」に使う

**Text Button**

- Background: `#ffffff`
- Text: **`#7a6abf`**
- Border: なし
- Padding: `8px 0`
- Font: 14px / weight 600
- 例: 「クッキー設定」

### Badges / Tags

サイト上に独立したバッジ・タグ要素は存在しない。ニュースの分類は**カードの面色そのもの**（`#75768b`）で示し、文字ラベルを別枠に切り出さない。

- 実装で必要になった場合は、**ボタンと同じ radius 4px**にし、pill（radius 9999px）を持ち込まない
- 面はサービスティント（`#edfaf6` / `#eef2fa` / `#f4f3ff` / `#effbff`）、文字は `#17171c`

### Inputs

- Background: `#ffffff`
- Border: **`1px solid #d1d1d1`**
- Border (focus): `1px solid #7a6abf`（ブランドパープル）
- Border Radius: **`50px`** — **検索窓だけが pill**。他の UI は radius 4px
- Padding: `6px 35px 6px 15px`（右に検索アイコン用の余白）
- Font: 12.8px / weight 400
- Text Color: `#17171c` / Placeholder: `#6a6a6a`
- **フォーム入力欄（複数行の問い合わせ等）は radius 4px** に揃える。pill は検索専用

### Cards

**Service Block（サービス紹介ブロック）** — このサイトを象徴する形

- Background: **サービス別ティント**（`#edfaf6` / `#eef2fa` / `#f4f3ff` / `#effbff`）
- Border: なし
- Border Radius: **`16px`**
- Padding: `64px 96px` 目安
- 構成: **左に「ロゴ → 説明文 → CTA → 関連リンク」、右にプロダクトのスクリーンショット**の 2 カラム
- 見出しは製品ロゴ画像で置き換え、テキスト見出しを持たない
- **面色が製品の識別子**。ブロックが切り替わったことを色で伝える

**News Card**

- Background: **`#75768b`**（スレートパープル）
- Text: `#ffffff`
- Border Radius: `4px`
- Padding: `20px`
- 構成: 日付（18px / weight 400）→ 見出し（18px / weight 700 / lh 1.6）
- **写真を持たない色面のカード**。ティント面と対になる濃い面

### Hero

- Background: **`#27455c`**（ネイビー）＋ イラスト
- 見出し: **40px / weight 700 / lh 1.4 / `#ffffff`**（2 行に手動改行）
- 補足: **16px / weight 400 / lh 1.5 / `#ffffff`**
- Border Radius: `0`
- **ページ内で唯一の暗い大面積**。以降のセクションはすべて白かティント

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 48px |
| XXL | 80px |
| XXXL | 120px |

### Container

- Max Width: **1200px**（サイト全体の標準コンテナ）
- サブコンテナ: **1120px** / **960px**
- 読み物カラム: **816px**
- Padding (horizontal): 24〜48px
- **KV は全幅ブリード**（左右に余白を残さない）。以降のセクションは 1200px に収める
- ヘッダーは全幅・白地・不透過。KV に重ねない

### Grid

- Columns: サービス紹介は **2 カラム（テキスト / スクリーンショット）**、ニュースは **3 カラム**、フッターは 4 カラム
- Gutter: 24px
- **セクションの区切りはティント面で作る**: 白 → `#edfaf6` → 白 → `#eef2fa` → … と、**白とティントを交互に敷く**
- サービスブロックは **radius 16px の角丸で内側に浮かせる**（全幅ブリードにしない）
- CTA はブロック内の左寄せ。中央寄せにしない

---

## 6. Depth & Elevation

**実測の `box-shadow` は実質 1 段**。浮かせるのはドロップダウンだけで、カード・ボタンには影を付けない。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **カード・ボタン・サービスブロック・入力欄のすべて** |
| 1 | `0 2px 4px rgba(28,28,28,0.2)` | グローバルナビのドロップダウン、言語切替メニュー |

- 奥行きは **ティント面（`#edfaf6` 等）と radius 16px の角丸**で表現する。**影ではなく面色と角丸が階層を作る**
- **カードに影を付けない**。ニュースカードは色面（`#75768b`）そのもので浮いて見せる
- **ボタンに影を付けない**。完全にフラット
- 影を使うのは「画面の外に重なるもの」（ドロップダウン・モーダル）だけ

---

## 7. Do's and Don'ts

### Do（推奨）

- **1 つのフォントスタック（`"Noto Sans JP"` 先頭の 8 段）で和欧すべてを通す**
- フォールバックには **`hiragino sans` と `meiryo` の両方**を入れ、游ゴシックより `meiryo` を優先する
- **サービスごとに淡いティント面を割り当てる**（`#edfaf6` / `#eef2fa` / `#f4f3ff` / `#effbff`）。**白との差は 3〜5% に抑える**
- **CTA を 2 系統に分ける**。サービス導線は `#74758b`、コーポレートの決定操作は `#7a6abf`。**形は同じで色だけ変える**
- **ボタンの radius は 4px で固定**する
- **ボタンの border は必ず 2px**（塗りボタンも `2px solid transparent`）。アウトライン版と高さを揃える
- サービス CTA は **`padding: 8px 14px 8px 38px`** で左にアイコン用の余白を確保する
- **本文は 16px / lh 1.7 / ls 0.02em**、リードと 46px 大見出しだけ ls 0.05em
- **リードは `#615499` ＋ 24px ＋ weight 700 ＋ ls 0.05em** のセットで作る
- **文字色は `#17171c`（主）と `#6a6a6a`（従）の 2 段**で通す
- **KV はネイビー `#27455c` の 1 面**にとどめ、ページ内で唯一の暗い大面積にする
- サービスブロックは **radius 16px** の角丸で内側に浮かせる
- **影はドロップダウンだけ**（`0 2px 4px rgba(28,28,28,0.2)`）
- 製品名は **「Backlog（バックログ）」の欧文＋カタカナ**で表記する
- コンテナ幅は **1200px**、読み物カラムは **816px**

### Don't（禁止）

- **要素ごとに `font-family` を切り替えない**（1 スタックで通す設計）
- **欧文専用書体を先頭に置かない**（英数字も Noto Sans JP の字形で出すのが方針）
- **ティントの彩度を上げない**。白との差が 5% を超えると 4 つ並べたときに 1 つだけ目立つ
- **サービス導線に `#7a6abf`（ブランドパープル）を使わない**（製品側は `#74758b`）
- **ボタンに pill（radius 9999px）を使わない**。radius 4px で固定（pill は検索窓だけ）
- **ボタンの border を 1px や 0 にしない**（塗りでも 2px。高さが揃わなくなる）
- **カードやボタンに影を付けない**（影はドロップダウン専用）
- **字間の 2 段（0.02em / 0.05em）以外の値を作らない**。ナビ・ボタンは `normal` のまま
- **KV の見出しに字間を当てない**
- **本文の行間を 1.6 未満にしない**
- **純黒 `#000000` を使わない**（主文字は `#17171c`）
- **和文見出しを weight 600 にしない**（600 はサードパーティ UI 由来。自社設計は 400 / 700 の 2 極）
- `palt` を掛けない、字間を詰める方向に動かさない
- **ミント `#50e3c2` を面に広げない**（現在位置インジケーターだけの高彩度アクセント）
- **KV 以外に暗い大面積を作らない**

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。サービスブロックは「ロゴ → 説明 → CTA → 画像」の縦積み。ナビはドロワー |
| Tablet | 768–1024px | 2 カラム。ニュースは 2 列 |
| Desktop | > 1024px | サービスは 2 カラム、ニュースは 3 列＋最大 1200px コンテナ |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）。サービス CTA は **padding `8px 14px 8px 38px` ＋ 16px / lh 1.4 で高さ 44px** を確保する
- サービスブロックは**ブロック全体をタップ領域にしない**（内部に CTA と関連リンクが複数あるため）
- ニュースカードは**カード全体をタップ領域**にする
- 検索窓（radius 50px / padding 6px）はモバイルで**上下 padding を 10px に広げる**

### フォントサイズの調整

- 本文 16px は据え置く（14px を下回らない）
- Section Head 46px → モバイルでは 28〜32px。**`letter-spacing: 0.05em` は維持する**
- Hero Head 40px → 24〜28px。**手動改行の位置をモバイル用に組み直す**
- Lead 24px → 18〜20px。**色 `#615499` と weight 700 は維持する**
- ナビ 16px は縮めない
- **本文の行間 1.7 と字間 0.02em はモバイルでも維持する**
- ボタンのラベル 16px は縮めない（タップ領域の高さが崩れる）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff   （純白）
Brand Purple:    #7a6abf   （コーポレートの決定操作・リンク・アウトライン枠）
Deep Purple:     #615499   （24px リード文専用）
Slate Purple:    #74758b   （サービス導線 CTA の面）
Slate Light:     #75768b   （ニュースカードの面）
Slate Outline:   #5d5e6f   （アウトラインボタンの枠と文字）
Navy:            #27455c   （KV の地色。唯一の暗い大面積）
Mint Accent:     #50e3c2   （現在位置インジケーターのみ）
Backlog Tint:    #edfaf6   ┐
Cacoo Tint:      #eef2fa   │ サービス別ティント面
Pass Tint:       #f4f3ff   │ 白との差は 3〜5%
Flowbase Tint:   #effbff   ┘
Purple Tint:     #f3f0fa   （コーポレート側のセクション面）
Surface:         #f5f5f7 / #f9f9f9 / #f2f2f2
Ink:             #17171c   （見出し・本文。純黒は使わない）
Ink Muted:       #6a6a6a   （補足・フッター・body の既定色）
Border:          #d1d1d1   （検索入力の枠）
Font:            "Noto Sans JP", "hiragino sans", "Hiragino Kaku Gothic ProN",
                 meiryo, helvetica, roboto, arial, sans-serif  ← 全要素共通
Body:            16px / weight 400 / lh 1.7 / ls 0.02em (0.32px)
Heading:         46px / 40px / 25px / 24px の 4 段 / weight 700 / lh 1.3〜1.5
Lead:            24px / weight 700 / lh 1.5 / ls 0.05em / #615499
Letter Spacing:  2 段だけ — 本文 0.02em / リード・46px 見出し 0.05em / 他は normal
Weight:          400 と 700 の 2 極（600 は使わない）
Feature:         font-feature-settings: normal（palt を使わない）
Radius:          ボタン・カード 4px / サービスブロック 16px / 検索窓 50px
Border:          ボタンは必ず 2px（塗りは 2px solid transparent）
Shadow:          none（ドロップダウンのみ 0 2px 4px rgba(28,28,28,0.2)）
Container:       1200px（サブ 1120 / 960px、読み物 816px）
```

### プロンプト例

```
ヌーラボのデザインシステムに従って、SaaS プロダクトの紹介ページを作成してください。
- フォントは "Noto Sans JP", "hiragino sans", "Hiragino Kaku Gothic ProN", meiryo,
  helvetica, roboto, arial, sans-serif の 1 スタックを全要素に当てる。
  要素ごとに font-family を切り替えず、英数字も和文書体の字形で出す
- 本文は 16px / weight 400 / line-height 1.7 / letter-spacing 0.02em (0.32px)、
  文字色 #17171c。補足文は #6a6a6a。純黒 #000000 は使わない
- letter-spacing は 2 段だけ：本文 0.02em / リードと 46px 大見出し 0.05em。
  ナビ・ボタン・KV 見出しは normal のまま
- 見出しは 46px / 40px / 25px / 24px の 4 段、weight 700、line-height 1.3〜1.5。
  中間サイズ（30〜36px）を作らない。weight は 400 と 700 の 2 極で、600 は使わない
- リード文は 24px / weight 700 / line-height 1.5 / letter-spacing 0.05em /
  色 #615499 のセットで作る（色・字間・ウェイトを分解しない）
- 製品ごとに淡いティント面のブロックを作る：#edfaf6 / #eef2fa / #f4f3ff / #effbff。
  いずれも白との差は 3〜5% に抑え、どれか 1 つが目立たないようにする。
  ブロックは border-radius 16px で内側に浮かせ、白 → ティント → 白 と交互に敷く
- CTA は 2 系統に分ける。製品への導線は面 #74758b、コーポレートの決定操作は面 #7a6abf。
  形は同一で色だけ変える：border-radius 4px / border 2px solid transparent /
  padding 8px 14px 8px 38px（左はアイコン用）/ 16px weight 700 / 文字 #ffffff
- アウトラインボタンは背景 #ffffff / 2px solid #5d5e6f / 文字 #5d5e6f /
  padding 14px 14px 14px 38px / border-radius 4px
- ボタンの border は塗りでも必ず 2px（2px solid transparent）。アウトライン版と高さを揃える
- pill（border-radius 9999px）は使わない。radius 50px は検索窓だけの例外
- ニュースカードは面 #75768b・文字 #ffffff・radius 4px。写真を持たない色面のカードにする
- KV は #27455c のネイビー 1 面、見出し 40px / weight 700 / line-height 1.4 / 白抜き。
  ページ内で唯一の暗い大面積にし、以降は白かティントで通す
- box-shadow はカード・ボタンに一切使わない。使うのはドロップダウンのみで
  0 2px 4px rgba(28,28,28,0.2)。奥行きはティント面と radius 16px で作る
- 製品名は「Backlog（バックログ）」のように欧文＋カタカナで表記し、欧文と丸括弧の間で折らない
- コンテナ幅は最大 1200px、読み物カラムは 816px
- font-feature-settings は normal（palt は掛けない）
```
