# DESIGN.md — モリサワ（Morisawa）

> 株式会社モリサワ（https://www.morisawa.co.jp/）のデザイン仕様書。
> 1924 年に邦文写真植字機を発明した大阪の書体メーカー。現在は Morisawa Fonts / MORISAWA PASSPORT / UD 書体 / Web フォントを核に、日本語書体そのものを事業とする。
> 最大の特徴は、**自社の UD 書体「UD 新ゴ NT」（`MFW-UDShinGoNTPr6N`）を Web フォントとしてサイト全体に適用**していること。Light / Regular / Medium の 3 ウェイトだけで階層を作り、**`letter-spacing: 0.05em`（14px に対し 0.7px）をグローバルに効かせる**。地は純白 `#ffffff`、フッターは黒 `#0c0c0c`、リンクは `#0086ce`、見出しは `#3071b9`、プロモバーは鮮烈な `#003cff`。
> 実サイトの computed style 実測（2026-07-27 取得。トップ＋フォント製品ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **書体そのものが主役**。装飾・面色・影を極力使わず、白地に文字を置くことで書体の字面を見せる。UI は書体の引き立て役に徹する
- **モリサワについて**: 写植機から始まった書体メーカー。UD（ユニバーサルデザイン）書体を主力の一つに据えており、**自社サイトが自社 UD 書体のショーケースになっている**
- **密度**: 中密度・情報整理型。KV は書体を大きく見せるビジュアル、以下はニュース／製品／事例が整然と積層する。写真より文字が支配的
- **キーワード**: 純白の地、UD 新ゴ NT、Light 主体、ls 0.05em グローバル、ブルー #0086ce / #3071b9、鮮烈な #003cff、黒フッター #0c0c0c
- **特徴**:
  - **和文は自社 Web フォント `MFW-UDShinGoNTPr6N`（UD 新ゴ NT Pr6N）一系統**。Light（本文・大半の UI）／ Reg（見出し）／ Med（強調小見出し）の 3 ウェイトのみ
  - **CSS の `font-weight` はほぼ 400 のまま**で、太さは**フォントファミリー名の切り替え**（`-Light` / `-Reg` / `-Med`）で表現する。UD 書体を正しいウェイトで出すための設計。合成ボーラーに頼らない
  - **`letter-spacing: 0.7px`（14px 基準で 0.05em）がグローバル**に効く。UD 書体の広めの字面に、さらに一段の空きを与える
  - **`font-feature-settings` は `normal`（palt を使わない）**。UD 書体は等幅の字面設計が読みやすさの根拠なので、プロポーショナル詰めを掛けない
  - 青は **3 段**。リンク・アイコンの `#0086ce`、見出し・ピルの `#3071b9`、プロモ／強調の鮮烈な `#003cff`
  - CTA は **チャコール `#4c4c4c` のソリッド（radius 4px）** と **白地＋ブルー文字のアウトライン（radius 8px）** の 2 種。彩度の高いブルーはボタンではなく見出しと帯に使う
  - フッターは **黒 `#0c0c0c` の面**で、サイト全体の白を締める

---

## 2. Color Palette & Roles

> 実測値。地は純白 `#ffffff`、テキストは `#000000` / `#0c0c0c`、フッターが黒面 `#0c0c0c`。青はリンク `#0086ce` ／ 見出し `#3071b9` ／ 強調 `#003cff` の 3 段構成。

### Brand（ブランド）

- **Link Blue** (`#0086ce`, rgb 0,134,206): リンク・アイコン・アウトラインボタンの文字色。サイトで最も出現するブランドブルー
- **Heading Blue** (`#3071b9`, rgb 48,113,185): セクション見出し（`h2` 56px / 30px）とピルバッジの面色。リンクより一段沈んだ落ち着いた青
- **Vivid Blue** (`#003cff`, rgb 0,60,255): Morisawa Fonts プロモバーの面色、および製品ページの小見出し（`h3` 18px Medium）。**最も彩度が高く、点で使う強調色**。半透明 `rgba(0,60,255,0.85)` のオーバーレイ面としても使う

### Accent（副次アクセント）

- **Cyan** (`#00a3e9`, rgb 0,163,233): 製品カテゴリ面（個人／法人・教育機関向け等）の面色
- **Yellow** (`#ffcc19`, rgb 255,204,25): 「組込みフォント」「オリジナルフォント」カテゴリの面色。青の対極に置く暖色アクセント
- **Sky** (`#8ed8f6`, rgb 142,216,246): Web フォントカテゴリの淡い面色
- **Pale Blue** (`#b8cef9`, rgb 184,206,249): KV 下のリード面。ごく淡い青
- **Pale Yellow** (`#feeea4`, rgb 254,238,164): UD 書体の訴求ブロック等、注意を引く淡い黄面
- **Deep Blue** (`#137ecb`, rgb 19,126,203): MORISAWA PASSPORT 製品ラインナップの面色

### Neutral（面・罫・文字）

- **Background** (`#ffffff`): ページ地色。純白
- **Ink** (`#000000`): `body` / 見出しの基本テキスト色。**モリサワは見出し・本文に純黒を使う**（書体の字面を素直に見せるため）
- **Ink Soft** (`#0c0c0c`, rgb 12,12,12): 本文段落・ヘッダーリンクのやや軟らかい黒。**フッターの面色でもある**
- **CTA Charcoal** (`#4c4c4c`, rgb 76,76,76): 主要 CTA ボタンの面色
- **Dark Gray** (`#333333`): 製品カード（Select Pack 等）の面色
- **Sub Text** (`#666666`): 注釈・キャプション
- **Muted** (`#7f7f7f` / `#999999`): 非活性ナビ／フッターの小文字（`#999999` は 12.5px の著作権表記）
- **Surface Gray** (`#f7f7f7` / `#f5f5f5` / `#f6f7f8`): カード・セクションの面。ごく薄いグレーで白地に段差をつける
- **Border / Track** (`#e5e5e5`, rgb 229,229,229): 区切り線・ページネーションのトラック。`#bfbfbf` は非活性ドット
- **Skip Nav** (`#f0f0f0`): 「サイトメニューを読み飛ばして本文へ移動」のスキップリンク面

### Semantic（意味的な色）

- モリサワは書体メーカーサイトのため意味色は前面に希薄
- **Info**: リンクブルー `#0086ce` を流用
- **Danger／Error**: 暖色の赤（`#cc3333` 目安）を用いる。青系の情報色と明確に分ける
- **Success**: シアン `#00a3e9` を流用してよい

---

## 3. Typography Rules

> **自社 UD 書体「UD 新ゴ NT Pr6N」（`MFW-UDShinGoNTPr6N`）を Web フォントで全面適用**。Light / Reg / Med の 3 ウェイトを**ファミリー名の切り替え**で使い分け、`font-weight` は 400 のまま置くのが実装の要。`letter-spacing: 0.05em` がグローバル、`palt` は使わない。

### 3.1 和文フォント

- **ゴシック体**: **UD 新ゴ NT Pr6N**（`MFW-UDShinGoNTPr6N-Light` / `-Reg` / `-Med`）。モリサワの UD 書体シリーズの中核で、判読性を最優先に設計されたモダンゴシック。本文・見出し・UI すべてこれ一系統
- **多言語フォールバック**: `MFW-UDShinGoHangKoc-Lig` / `-Reg`（ハングル用 UD 新ゴ）が和文の直後に置かれる。日中韓を 1 つの字面設計で揃えるための指定
- 明朝体は本文・UI に使わない（KV のビジュアルは画像として書体を見せる）
- **ウェイトはファミリー名で切る**: `-Light`（本文・ナビ・大半の UI）／`-Reg`（見出し）／`-Med`（強調小見出し・18px の青見出し）

### 3.2 欧文フォント

- 欧文専用のスタックは持たない。**UD 新ゴ NT に含まれる欧文グリフをそのまま使う**（和欧同一書体）
- そのため "Morisawa Fonts" "MORISAWA PASSPORT" 等の製品名も和文と同じ字面で組まれ、和欧のトーンが揃う
- **preview.html での注記**: `MFW-UDShinGoNTPr6N` は Morisawa Fonts の Web フォント（ライセンス）のため、ローカルの preview.html では表示できない。プレビューでは **Google Fonts の "BIZ UDPGothic"（weight 400/700）** を代替に用いる。**BIZ UD ゴシックはモリサワ自身が Google Fonts に提供している UD 書体**であり、UD 新ゴ NT と同じ UD 設計思想・同じ提供元のため、代替として最も印象が近い。実装時は必ず `MFW-UDShinGoNTPr6N` を読み込むこと

### 3.3 font-family 指定

```css
/* 本文・ナビ・UI（Light） */
font-family: MFW-UDShinGoNTPr6N-Light, MFW-UDShinGoHangKoc-Lig, sans-serif;

/* 見出し（Regular） */
font-family: MFW-UDShinGoNTPr6N-Reg, MFW-UDShinGoHangKoc-Reg, sans-serif;

/* 強調小見出し（Medium） */
font-family: MFW-UDShinGoNTPr6N-Med, sans-serif;

/* グローバル */
letter-spacing: 0.05em;          /* 14px に対し 0.7px */
font-feature-settings: normal;   /* palt は使わない */
```

**フォールバックの考え方**:
- 和文 UD 書体を先頭に置き、その直後にハングル用 UD 書体を並べて多言語の字面を揃える
- 最後は `sans-serif`
- **`font-weight` で太さを作らない**。必ずファミリー名（`-Light` / `-Reg` / `-Med`）を切り替える。合成ボールドは UD 書体の判読性設計を壊す

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (Products) | UD新ゴ NT Reg | 56px | 400 | 1.0 (56px) | 0.05em | セクション見出し `#3071b9` |
| Display (Concept) | UD新ゴ NT Reg | 50px | 400 | 1.4 (70px) | 0.05em | コンセプト見出し（黒） |
| Page Title | UD新ゴ NT Light | 36px | 400 | 1.7 (61.2px) | 0.05em | `h1`（ヘッダー領域） |
| Section Head | UD新ゴ NT Reg | 30px | 500 | 1.0 (30px) | 0.05em | PICK UP / 事例 / 企業情報 |
| Heading 2 | UD新ゴ NT Light | 28px | 400 | 1.7 (47.6px) | 0.05em | 製品ページの `h2` |
| Heading 3 | UD新ゴ NT Reg | 24px | 400 | 1.5 (36px) | 0.05em | 小見出し |
| Accent Head | UD新ゴ NT **Med** | 18px | 400 | 1.7 (30.6px) | 0.044em (0.8px) | 青の強調小見出し `#003cff` |
| Lead | UD新ゴ NT Light | 20px | 400 | 1.8 (36px) | 0.05em | リード文 |
| Body | UD新ゴ NT Light | 14px | 400 | 1.5 (21px) | 0.05em | `body` 既定 |
| Body (Article) | UD新ゴ NT Light | 14px | 400 | **2.0 (28px)** | 0.05em | 製品ページの読み物本文 |
| Caption | UD新ゴ NT Light | 12px | 400 | 1.5–1.7 | 0.05em | 注釈・パンくず |
| Footer Small | UD新ゴ NT Light | 12.5px | 400 | 1.4 (17.5px) | 0.08em (1px) | 著作権表記 `#999999` |

- **`font-weight: 500` が出るのは 30px のセクション見出しのみ**。それ以外はすべて 400 で、太さはファミリー名側で持つ
- ナビの一部は `letter-spacing: 1.4px`（14px 基準で **0.1em**）とさらに広げる

### 3.5 行間・字間

- **本文の行間 (line-height)**: 既定 **1.5**（14px→21px）。読み物ページの本文は **2.0**（14px→28px）まで開く
- **見出しの行間**: 大見出しは **1.0〜1.4**（56px→56px / 50px→70px）と締め、中見出しは **1.5〜1.7**
- **字間 (letter-spacing)**: **グローバルに 0.05em（14px に対し 0.7px）**。ナビの一部は 0.1em、フッターの小文字は 0.08em
- **palt は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- UD 書体は字面が広いので、行間を詰めすぎると重く見える。本文 1.5 以上、読み物は 2.0 を基準に
- 字間はサイト全体で 0.05em を保つ。ここを 0 に戻すとモリサワらしい「開いた」印象が失われる
- 大見出しは行間 1.0 まで締めてよい。サイズのコントラストで階層を作る

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
font-feature-settings: normal;   /* palt を掛けない */
```

- **palt は使わない**。UD 新ゴ NT は等幅の字面設計そのものが判読性の根拠であり、プロポーショナル詰めを掛けると UD 書体を採用する意味が薄れる
- 字間の調整は **`letter-spacing: 0.05em`** で行う（詰めるのではなく開く方向）
- 和欧が同一書体のため、`kern` に頼らずとも和欧の混植が破綻しない

### 3.8 縦書き

- 該当なし。UI・記事とも横組み
- 書体見本など縦組みを見せる場合は `writing-mode: vertical-rl; text-orientation: mixed;`

---

## 4. Component Stylings

### Buttons

**Primary（チャコール・ソリッド）**
- Background: `#4c4c4c`
- Text: `#ffffff`
- Padding: `12.6px 18.2px 14px`
- Border Radius: `4px`
- Font: UD新ゴ NT Light / 14px / weight 400 / ls 0.05em
- 例: 「フォント採用事例を見る」「ダウンロード」「お問合せ」「よくあるご質問」

**Secondary（白地・ブルーアウトライン）**
- Background: `#ffffff`
- Text: `#0086ce`
- Border: `1px solid #0086ce`（実測は矢印付きのため右パディングが広い）
- Padding: `12px 48px 12px 16px`
- Border Radius: `8px`
- Font: 14px / weight 400
- 例: 「スタンダードプラン」「教育機関プラン」「Web フォント」

**Pill（ブルー・タグ型）**
- Background: `#3071b9`
- Text: `#ffffff`
- Padding: `4px 20px`
- Border Radius: `22px`
- Font: 14px / weight 400
- 例: 「note」「FONT SWITCH PROJECT」など出典・カテゴリの表示

**Promo Bar（画面下部固定）**
- Background: `#003cff`（または `rgba(0,60,255,0.85)`）
- Text: `#ffffff`
- 中に白面・ブルー文字の小ボタン「Morisawa Fonts」を置く

### Inputs

- Background: `#ffffff`
- Border: `1px solid #e5e5e5`
- Border (focus): `1px solid #0086ce`
- Border Radius: `4px`
- Padding: `12px 14px`
- Font: UD新ゴ NT Light / 14px / ls 0.05em
- Text Color: `#0c0c0c` / Placeholder: `#7f7f7f`

### Cards

- Background: `#ffffff`、または面カードとして `#f7f7f7` / `#f5f5f5` / `#f6f7f8`
- 濃色カード: `#333333`（製品パック）／カテゴリ面は `#00a3e9`・`#ffcc19`・`#8ed8f6`
- Border: なし（面色の差で分離）／必要なら `1px solid #e5e5e5`
- Border Radius: `4px`（小）〜`8px`（大）
- Padding: `24px`
- Shadow: 基本フラット。浮かせる場合のみ Depth & Elevation 参照

### Pagination（KV スライダー）

- Track: `#e5e5e5`、非活性ドット `#bfbfbf`、文字色 `#0086ce`
- Border Radius: `50%`（円）／横長インジケータは `7px`

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 40px |
| XXL | 64px |
| XXXL | 96px |

### Container

- Max Width: **1200px**（実測の最大値）。読み物カラムは **620px**、標準コンテンツは **1032px / 1040px / 1100px**、中間幅に **890px** を併用
- Padding (horizontal): 24〜40px

### Grid

- Columns: 製品・事例カードは 3〜4 カラム、ニュースは 1 カラムのリスト
- Gutter: 24px
- KV は全幅ブリード、以下のセクションは 1032〜1200px のコンテナに収める

---

## 6. Depth & Elevation

実測の box-shadow に基づく。全体はフラット寄りで、影は**細い 1px の輪郭**か**広く薄いぼかし**の二極。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。白地と薄グレー面の差で構成 |
| 1 | `0 0 0 1px rgba(0,0,0,0.15)` | 1px の輪郭影。ボタン・入力欄の縁取り |
| 2 | `0 1px 0 0 rgba(0,0,0,0.15)` | 下辺のみの薄い影。ヘッダー・区切り |
| 3 | `0 2px 20px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.07)` | 広く薄いぼかし。ドロップダウン・浮遊カード |

- 奥行きは主に **白 `#ffffff` × 薄グレー `#f7f7f7` × 黒フッター `#0c0c0c`** の面のコントラストで表現する
- 濃い影を落とさない。書体の輪郭を邪魔しないことを優先する

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文は `MFW-UDShinGoNTPr6N`（UD 新ゴ NT）一系統で組み、太さは **`-Light` / `-Reg` / `-Med` のファミリー切り替え**で作る
- `letter-spacing: 0.05em` をサイト全体に効かせる（ナビは 0.1em まで開いてよい）
- 本文の行間は 1.5、読み物本文は 2.0 を基準にする
- 青は用途で 3 段に分ける（リンク `#0086ce` ／ 見出し `#3071b9` ／ 強調 `#003cff`）
- CTA はチャコール `#4c4c4c` のソリッド（radius 4px）とブルーアウトライン（radius 8px）の 2 種に絞る
- 地は純白、面の段差は `#f7f7f7` 系の極薄グレーで作る。フッターだけ黒 `#0c0c0c` で締める
- カテゴリ面には黄 `#ffcc19` やシアン `#00a3e9` を使い、青一色に沈めない

### Don't（禁止）

- **`font-weight: bold` で太さを作らない**（合成ボールドは UD 書体の判読性設計を壊す。必ずファミリー名を切り替える）
- **`palt` を掛けない**（UD 書体は等幅の字面設計が判読性の根拠。詰めるのではなく `letter-spacing` で開く）
- `letter-spacing: normal` に戻さない（モリサワらしい開いた字面が失われる）
- 明朝体を本文・UI に混ぜない（書体見本のビジュアルを除く）
- 鮮烈な `#003cff` を広い面に多用しない（プロモバーと小見出しに限定する点の色）
- 本文の行間を 1.4 以下にしない（UD 書体は字面が広く、詰めると重くなる）
- 濃い影・強い角丸を使わない（radius は 4〜8px、ピルのみ 22px）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。KV は全幅、カードは縦積み |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 3〜4 カラム＋最大 1200px コンテナ |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。14px の小さなリンクは padding でタップ領域を確保する

### フォントサイズの調整

- 本文 14px は据え置き（モバイルでも 14px を下回らない）。読み物本文は 15〜16px まで上げてよい
- Display 56px → モバイルでは 32〜36px、Page Title 36px → 24〜28px 程度に縮小
- 行間・字間（1.5 以上 / 0.05em）はモバイルでも維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff   （純白）
Text:           #000000 / #0c0c0c（段落・ヘッダーリンク）
Footer BG:      #0c0c0c   （黒面）
Link Blue:      #0086ce
Heading Blue:   #3071b9
Vivid Blue:     #003cff   （プロモバー・強調小見出しのみ）
Accent:         #00a3e9（シアン） / #ffcc19（イエロー） / #8ed8f6（スカイ）
CTA:            #4c4c4c（ソリッド・radius 4px） / 白地＋#0086ce アウトライン（radius 8px）
Surface:        #f7f7f7 / #f5f5f5 / #f6f7f8
Border:         #e5e5e5
JP Font:        MFW-UDShinGoNTPr6N-Light / -Reg / -Med, MFW-UDShinGoHangKoc-Lig, sans-serif
Body Size:      14px / weight 400 / lh 1.5（読み物は lh 2.0）
Letter Spacing: 0.05em（グローバル。ナビは 0.1em）
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         4px（小） / 8px（大） / 22px（ピル）
Container:      1200px（読み物 620px）
```

### プロンプト例

```
モリサワのデザインシステムに従って、フォント製品の紹介ページを作成してください。
- 和文は UD 新ゴ NT（MFW-UDShinGoNTPr6N-Light / -Reg / -Med、無ければ sans-serif）を使う
- 太さは font-weight ではなくファミリー名（-Light / -Reg / -Med）の切り替えで表現する
- letter-spacing: 0.05em をサイト全体に効かせる。font-feature-settings は normal（palt は掛けない）
- 地は純白 #ffffff、本文は #000000 / 段落は #0c0c0c、フッターだけ黒面 #0c0c0c
- 本文 14px・行間 1.5、読み物本文は行間 2.0
- セクション見出しは UD新ゴ Reg 56px・行間 1.0・色 #3071b9
- 青の強調小見出しは UD新ゴ Med 18px・行間 1.7・色 #003cff
- 主要 CTA はチャコール #4c4c4c のソリッド（radius 4px、白文字）、
  副次 CTA は白地＋#0086ce のアウトライン（radius 8px）
- 製品カテゴリの面色にはシアン #00a3e9・イエロー #ffcc19・スカイ #8ed8f6 を使う
- カード面は #f7f7f7 系の極薄グレー。影は使わないか 0 0 0 1px rgba(0,0,0,.15) 程度に留める
- コンテナ幅は最大 1200px、読み物カラムは 620px
```
