# DESIGN.md — ANDPAD（アンドパッド）

> 株式会社アンドパッド（https://andpad.co.jp/）のデザイン仕様書。
> 建設現場の施工管理・経営を一元化するクラウドサービス「ANDPAD」を提供する SaaS 企業のコーポレートサイト。
> 最大の特徴は、**和文にモリサワの Web フォント（TypeSquare）を使い、太さを `font-weight` ではなくファミリー名で切り替える**こと。本文・UI は**中ゴシック BBB**（`Gothic Medium BBB`）、強調段落は**太ゴ B101**（`Futo Go B101`）。欧文は**自社ホストの San Francisco（`SF Display` / `SF Text`）**で、英字の見出しだけが別書体になる和欧分離型。
> 色は白地 `#ffffff` に**ANDPAD レッド `#ef3340`** の一点突破。角丸はピル（`38.36px`）**のみ**で、それ以外は radius 0・影ゼロの徹底したフラット。
> 実サイトの computed style 実測（2026-08-09 取得。トップ＋ミッションページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地・フラット・赤の一点**。面色も影も使わず、余白と 1px の輪郭だけで構造を作る。彩度を持つのは `#ef3340` ただ一色で、それを帯・アイコン・ボタンの輪郭・見出し脇の矩形に「点」で置く
- **ANDPAD について**: 建設業界向けの施工管理 SaaS。現場写真・図面・工程・原価を 1 つに束ねるプロダクトで、サイトも「現場の実写 → 整理された情報」という構成を取る
- **密度**: 中〜低密度。KV は全幅の現場実写ムービー、以下はセクションごとに大きく余白を取って積層する。1 画面に詰め込まない
- **キーワード**: 純白の地、ANDPAD レッド `#ef3340`、モリサワ Web フォント、ピルだけの角丸、影ゼロ、英字見出しは San Francisco、黒フッター `#222222`
- **特徴**:
  - **和文はモリサワ TypeSquare の 2 書体**。本文・ナビ・UI が**中ゴシック BBB**、強調したい段落・小見出しが**太ゴ B101**。`typesquare_option` クラスが要素に付く実装
  - **英字の見出しだけ `SF Display`（自社ホスト）に切り替わる**。"Service" "History of ANDPAD" などのセクション名は和文書体を経由しない。和欧を 1 書体で揃えず、**役割ごとに書体を分ける**設計
  - **`html { font-size: 14px }` が rem の基準**。`2.8rem = 39.2px`、`1.4rem = 19.6px` のように 14 の倍数で階層が刻まれる（16px 基準ではない点に注意）
  - **`body` の `font-weight` が `505`** という中間値。TypeSquare の可変軸を微調整した実装で、`500` でも `600` でもない。太字は `600` / `700` を使う
  - **`letter-spacing` はほぼ `normal`**。開くのは大見出しだけ（39.2px → `0.1em`、46px → `0.14em`）。本文は詰めも開きもしない
  - **角丸はピル `38.36px` の 1 種類だけ**。カード・入力欄・画像はすべて radius 0。**box-shadow は 1 つも存在しない**
  - CTA は**面色を持たない**。`1px solid #ef3340` のアウトラインピルが標準で、濃色背景の上では白枠、白地の上では黒枠に反転する 3 バリエーション
  - セクション見出しは**赤い矩形ブロック（`105px` の左パディング）＋ 英字**という組み。矩形は `::before` で置かれる

---

## 2. Color Palette & Roles

> 実測値。地は純白 `#ffffff`、テキストは `#222222`。彩度を持つのは `#ef3340`（と沈んだ `#c8102e`）のみで、それ以外は無彩色。

### Brand（ブランド）

- **ANDPAD Red** (`#ef3340`, rgb 239,51,64): ブランドの中核。ロゴ、採用バンドの面色、ボタンの輪郭、見出し脇の矩形、ナビのアクティブ表示、アイコン。**サイトで唯一の彩度**
- **ANDPAD Red Dark** (`#c8102e`, rgb 200,16,46): ミッションページで併記されるもう一段沈んだ赤。ホバー・プレス、および赤の重なりを避けたい箇所に使う

### Neutral（面・罫・文字）

- **Background** (`#ffffff`): ページ地色。純白
- **Ink** (`#222222`, rgb 34,34,34): `body` の基本テキスト色。**フッターの面色でもある**。純黒 `#000000` は使わない
- **Surface Alt** (`#fafafa`, rgb 250,250,250): News / Company セクションの面。白地との差はごくわずかで、区切りを「感じさせる」程度に留める
- **Meta Gray** (`#adb5bd`, rgb 173,181,189): ニュースの日付。青みを含んだ淡いグレー
- **Overlay** (`rgba(0,0,0,0.1)`): 会社情報ブロックの画像上に掛ける薄いスクリム
- **Inverse** (`#ffffff`): 濃色面（赤バンド・黒フッター）上のテキストとボタン輪郭

### Semantic（意味的な色）

- コーポレートサイトのため意味色は前面に希薄。プロダクト UI へ展開する際の目安は以下
- **Danger／Error**: ブランドレッド `#ef3340` をそのまま流用せず、沈んだ `#c8102e` を使う（CTA の赤と混同させない）
- **Warning**: 暖色のアンバー（`#e8a33d` 目安）
- **Success**: 緑（`#2f9e5f` 目安）
- **Info**: `#222222` ＋ 罫線で表現し、青は足さない（サイトに青が一切存在しないため）

---

## 3. Typography Rules

> **和文はモリサワ Web フォント（TypeSquare）の 2 書体、英字見出しは自社ホストの San Francisco**。太さはファミリー名の切り替えで作り、`html` の rem 基準が **14px** である点が実装の要。

### 3.1 和文フォント

- **本文・ナビ・UI**: **中ゴシック BBB**（`Gothic Medium BBB`）。モリサワの定番ゴシックで、写植由来の落ち着いた字面。サイトの大半はこれ
- **強調段落・小見出し**: **太ゴ B101**（`Futo Go B101`）。中ゴシック BBB より一段太く、力のある字面。サービス説明の段落やミッションページの `h3` に使う
- **フォールバック**: `ヒラギノ角ゴ ProN W3` → `Hiragino Kaku Gothic ProN` → `Arial` → `メイリオ` → `Meiryo` → `sans-serif`。**ProN**（JIS2004 字形）を指定する点に注意（Pro ではない）
- 明朝体は使わない

### 3.2 欧文フォント

- **`SF Display`（自社ホスト）**: 英字のセクション見出し専用。"Service" "History of ANDPAD" など。weight 100〜900 の 9 段を `@font-face` で読み込んでいる
- **`SF Text`（自社ホスト）**: 小さめの英字用（同じく 100〜800）
- **`Material Icons`**: `chevron_right` 等のアイコンフォント
- 和文スタック内の欧文は `Arial` にフォールバックする。**英字見出しだけが SF に切り替わる**ため、和文段落中の英単語と英字見出しでは書体が異なる
- **preview.html での注記**: `Gothic Medium BBB` / `Futo Go B101` はモリサワ TypeSquare のライセンス Web フォントのため、ローカルの preview.html では表示できない。プレビューでは **Google Fonts の `Zen Kaku Gothic New`（400/500/700）** を代替に用いる。Zen Kaku Gothic New は**モリサワ提供の書体**で、中ゴシック BBB 系の落ち着いた字面に最も近い。`SF Display` は **`-apple-system` / `system-ui`** で代替できる（macOS / iOS では実物の San Francisco が出る）。実装時は必ず TypeSquare を読み込むこと

### 3.3 font-family 指定

```css
/* rem の基準（16px ではない） */
html { font-size: 14px; }

/* 本文・ナビ・UI（中ゴシックBBB） */
font-family: "Gothic Medium BBB", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             Arial, メイリオ, Meiryo, sans-serif;

/* 強調段落・小見出し（太ゴB101） */
font-family: "Futo Go B101", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
             Arial, メイリオ, Meiryo, sans-serif;

/* 英字の見出し（自社ホストの San Francisco） */
font-family: "SF Display";
font-family: "SF Text";

/* body の既定 */
font-size: 13px;
font-weight: 505;        /* 500 でも 600 でもない中間値 */
line-height: 1.85;       /* 24.05px */
letter-spacing: normal;
font-feature-settings: normal;   /* palt は使わない */
```

**フォールバックの考え方**:
- 和文 Web フォントを先頭に置き、その直後に **ヒラギノ角ゴ ProN W3** を並べる（JIS2004 字形で字形を揃える）
- 欧文の `Arial` は和文フォールバックの**後ろ**。和文書体の欧文グリフを優先する
- **英字見出しは和文スタックを使わず `"SF Display"` 単独**で指定する。ここだけ和欧の系統が切れる
- 太さは**ファミリー名（中ゴシック BBB ↔ 太ゴ B101）の切り替え**で作るのが原則。`font-weight` は補助

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Mission Display | SF Display | 46px | 500 | 1.5 (69px) | 0.14em (6.44px) | ミッションページの英字 `h2` |
| Section Head (EN) | SF Display | 42px | 700 | 1.2 (50.4px) | normal | "History of ANDPAD" |
| Section Head (EN) | SF Display | 35px | 600 | 1.0 (35px) | normal | "Service"。赤矩形＋左パディング 105px |
| Section Head (JP) | 太ゴ B101 | 39.2px | 600 | 1.5 (58.8px) | 0.1em (3.92px) | 和文の大見出し（2.8rem） |
| Heading 3 | 太ゴ B101 | 28px | 600 | 1.5 (42px) | normal | ミッションページの小見出し（2rem） |
| Heading 3 (EN) | SF Display | 25.2px | 700 | 1.5 (37.8px) | normal | 英字の小見出し（1.8rem） |
| Heading 4 | 太ゴ B101 | 19.6px | 600 | 1.5 (29.25px) | normal | 1.4rem |
| Lead / Emphasis | 太ゴ B101 | 13px | 505 | 1.85 (24.05px) | normal | サービス説明の段落 |
| Body | 中ゴシック BBB | 13px | **505** | 1.85 (24.05px) | normal | `body` 既定 |
| Body Bold | 中ゴシック BBB | 13px | 700 | 2.2 (28.6px) | normal | リンク・強調。**行間が広がる** |
| Nav (Drawer) | 中ゴシック BBB | 14px | 700 | 1.85 (25.9px) | normal | ドロワーナビ・`#ef3340` |
| Caption | 中ゴシック BBB | 11.9px | 700 | 1.3 (15.47px) | normal | 図版のキャプション（0.85rem） |
| Meta / Date | 中ゴシック BBB | 13px | 505 | 1.85 | normal | ニュース日付 `#adb5bd` |

- **`font-weight: 505` は誤記ではない**。`body` に実際に指定されている中間値で、TypeSquare の可変軸を微調整した結果。太字を作るときは `600`（見出し）／ `700`（リンク・ナビ）を使う
- **サイズはすべて 14px 基準の rem**。`0.85rem = 11.9px` / `1.4rem = 19.6px` / `2rem = 28px` / `2.8rem = 39.2px`
- **weight 700 の要素は行間が 2.2 に広がる**（13px → 28.6px）。太い字面に余白を足して重さを逃がす設計

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.85**（13px → 24.05px）。太字は **2.2**（13px → 28.6px）
- **見出しの行間**: 英字大見出しは **1.0〜1.2**（35px → 35px / 42px → 50.4px）と締める。和文見出しは **1.5**
- **字間 (letter-spacing)**: 本文・UI は **`normal`**。開くのは大見出しだけで、和文 39.2px に `0.1em`、英字 46px に `0.14em`
- **`palt` は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- 本文は 1.85 を基準にし、詰めない。SaaS のコーポレートサイトとして「読ませる」ことを優先している
- 太字にしたら行間も広げる（1.85 → 2.2）。中ゴシック BBB / 太ゴ B101 は字面が詰まって見えやすい
- 字間はいじらない。開くのは 35px を超える見出しに限る

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

- **`palt` は使わない**。中ゴシック BBB の等幅の字面をそのまま活かす
- 字間を触らない設計なので、`kern` に依存する箇所もない
- 見出しで字を開きたいときは `letter-spacing` を使う（詰める方向には動かさない）

### 3.8 縦書き

- 該当なし。UI・記事とも横組み

---

## 4. Component Stylings

### Buttons

**Primary（赤アウトライン・ピル）** — サイトの標準 CTA。面色を持たない

- Background: `transparent`
- Text: `#222222`
- Border: `1px solid #ef3340`
- Padding: `5.25px 10.5px`（実測。幅は `c-button--animation__8rem` 等のクラスで min-width を与える）
- Border Radius: `38.36px`（ピル）
- Font: 中ゴシック BBB / 13px / weight 700 / lh 2.2
- 例: 「ミッション」「サービスサイト」「ニュース一覧」「10周年特設サイトはこちら」

**Inverse（白アウトライン・ピル）** — 赤バンドや写真の上

- Background: `transparent`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Padding / Radius: Primary と同じ
- 例: 「採用情報」（赤バンド `#ef3340` の上）

**Inverse Black（黒アウトライン・ピル）** — 淡い面の上

- Background: `transparent`
- Text: `#222222`
- Border: `1px solid #222222`
- Padding / Radius: Primary と同じ
- 例: 「会社情報」

**Icon Button（丸・赤）**

- `1px solid #ef3340` の正円（`border-radius: 50%`）に矢印アイコンを 1 つ置く
- 「続きを見る」のような文字を伴わない導線に使う

### Inputs

- Background: `#ffffff`
- Border: `1px solid #222222`（サイトはフラットなため、罫は本文色と同系で引く）
- Border (focus): `1px solid #ef3340`
- Border Radius: `0px`（**入力欄はピルにしない**）
- Padding: `12px 14px`
- Font: 中ゴシック BBB / 13px / weight 505 / lh 1.85
- Text Color: `#222222` / Placeholder: `#adb5bd`

### Cards

- Background: `#ffffff` または `#fafafa`
- Border: なし（面色の差と余白で分離する）
- Border Radius: `0px`
- Padding: `56px`（大ブロック）／ `24px`（小カード）
- Shadow: **なし**（サイト全体に box-shadow が 1 つも存在しない）

### Section Heading（赤矩形＋英字）

- `h2` に `padding-left: 105px` を与え、`::before` で赤い矩形（`#ef3340`）を左に置く
- 文字は `SF Display` 35px / weight 600 / lh 1.0
- 矩形の高さは見出しの行高に揃える（実測でおよそ 35px 前後の帯）

### Band（採用バンド）

- Background: `#ef3340`
- Text: `#ffffff`
- Padding: `56px`
- 中に Inverse（白アウトライン）ボタンを 1 つ置く

---

## 5. Layout Principles

### Spacing Scale

14px を rem 基準とするため、余白も 14 の倍数と 7 の倍数が主軸になる。

| Token | Value |
|-------|-------|
| XS | 7px |
| S | 14px |
| M | 21px |
| L | 28px |
| XL | 56px |
| XXL | 77px |
| XXXL | 84px |

- 実測されたセクション padding は `56px 0 84px`（History）／ `77px 0`（News）／ ヘッダー `21px 0`

### Container

- Max Width: **1140px**（サイト全体の標準コンテナ）
- サブカラム: **570px**（1140 の半分。2 カラム構成）
- 中間幅として **760px / 900px / 950px / 980px** を併用
- Padding (horizontal): 20〜40px

### Grid

- Columns: サービス・ニュースは 2 カラム（570px × 2）、カードは 3 カラム
- Gutter: 28px
- KV は全幅ブリード（現場実写のムービー）、以下は 1140px のコンテナに収める

---

## 6. Depth & Elevation

**ANDPAD のサイトには `box-shadow` が 1 つも存在しない。** 奥行きは面色の差と余白だけで作る。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定にして唯一**。白 `#ffffff` × 極薄グレー `#fafafa` × 黒 `#222222` × 赤 `#ef3340` の面で階層を作る |
| （必要な場合のみ） | `0 1px 0 0 rgba(0,0,0,0.08)` | スティッキーヘッダーの下辺。原典には存在しないが、プロダクト UI へ展開する際の最小の目安 |

- 浮遊感が必要なときは影ではなく**余白を広げる**か**面色を変える**
- 画像の上に情報を載せるときは `rgba(0,0,0,0.1)` のスクリムを掛ける

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文は**中ゴシック BBB（本文・UI）と 太ゴ B101（強調）の 2 書体**で組み、太さはファミリー切り替えで作る
- `html { font-size: 14px }` を rem の基準にする（16px 基準にすると全サイズがずれる）
- 本文は 13px / 行間 1.85、太字にしたら行間を 2.2 に広げる
- 彩度は `#ef3340` **一色だけ**に絞る。赤を置いていない場所は無彩色で通す
- CTA は**面を塗らずアウトラインのピル**（radius 38.36px、border 1px）にする。背景に応じて赤枠／白枠／黒枠を選ぶ
- セクション見出しは**赤い矩形 ＋ 英字（SF Display）**の組で作る
- 影を使わず、余白と面色（`#ffffff` / `#fafafa` / `#222222` / `#ef3340`）で階層を作る
- 英字の大見出しだけ `SF Display` に切り替える。和文見出しは 太ゴ B101

### Don't（禁止）

- **カード・入力欄・画像に角丸をつけない**（radius が許されるのはピル 38.36px とアイコンの円のみ）
- **box-shadow を足さない**（原典はサイト全体で影ゼロ。影を入れた瞬間に別ブランドになる）
- CTA を**赤で塗りつぶさない**（ANDPAD の赤は輪郭と帯の色であって、ボタンの面色ではない）
- 赤以外の彩度（青・緑・黄）を UI に持ち込まない
- `palt` を掛けない、本文の `letter-spacing` を触らない
- 本文の行間を 1.5 以下にしない（詰めると中ゴシック BBB の字面が重くなる）
- 純黒 `#000000` を使わない（テキストもフッターも `#222222`）
- 和文スタックで英字見出しを組まない（`Arial` に落ちて印象が変わる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。KV は全幅ムービー、セクションは縦積み。ナビはドロワー（`nav.drawer-nav`） |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 2〜3 カラム＋最大 1140px コンテナ |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。ピルボタンは padding が `5.25px 10.5px` と小さいので、モバイルでは縦 padding を 12px 以上に広げる
- ドロワーナビの項目は 14px / weight 700 で、行間 1.85 分の余白を確保する

### フォントサイズの調整

- 本文 13px は据え置く（14px まで上げてもよい）
- 英字 Display 46px → モバイルでは 28〜32px、Section Head 35px → 24〜26px 程度に縮小
- 和文大見出し 39.2px（2.8rem）→ 24〜28px（1.7〜2rem）
- 見出しの `letter-spacing`（0.1em / 0.14em）はモバイルでは 0.05em 程度まで戻してよい
- 行間 1.85 はモバイルでも維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff   （純白）
Surface Alt:    #fafafa   （News / Company セクション面）
Text:           #222222   （フッターの面色でもある。純黒は使わない）
Meta Gray:      #adb5bd   （ニュース日付）
Brand Red:      #ef3340   （唯一の彩度。帯・輪郭・矩形・アイコン）
Brand Red Dark: #c8102e   （ホバー・沈めたい赤）
JP Font (body): "Gothic Medium BBB", "ヒラギノ角ゴ ProN W3", Arial, メイリオ, sans-serif
JP Font (bold): "Futo Go B101", "ヒラギノ角ゴ ProN W3", Arial, メイリオ, sans-serif
EN Heading:     "SF Display"（自社ホストの San Francisco）
rem Base:       html { font-size: 14px }   ← 16px ではない
Body:           13px / weight 505 / lh 1.85 / ls normal
Body Bold:      13px / weight 700 / lh 2.2
Letter Spacing: normal（見出しのみ 0.1em〜0.14em）
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         38.36px（ピル）のみ。他はすべて 0
Shadow:         none（サイト全体に box-shadow が存在しない）
Container:      1140px（サブカラム 570px）
```

### プロンプト例

```
ANDPAD のデザインシステムに従って、施工管理サービスの機能紹介ページを作成してください。
- html の font-size は 14px にして、すべてのサイズを rem で 14 の倍数として刻む
- 和文の本文・UI は "Gothic Medium BBB"（無ければ ヒラギノ角ゴ ProN W3 → sans-serif）、
  強調段落は "Futo Go B101" に切り替える
- 英字のセクション見出しだけ "SF Display"（無ければ -apple-system / system-ui）を使う
- body は 13px / font-weight 505 / line-height 1.85 / letter-spacing normal、
  太字は weight 700 にして line-height を 2.2 に広げる
- 地は純白 #ffffff、セクション面は #fafafa、テキストとフッターは #222222（純黒は使わない）
- 彩度は #ef3340 一色に絞る。CTA は面を塗らず 1px solid #ef3340 のアウトラインピル
  （border-radius: 38.36px、padding 5.25px 10.5px、13px / weight 700）
- 赤バンドの上では白枠、淡い面の上では黒枠にボタンを反転させる
- セクション見出しは左に赤い矩形（#ef3340）を置き、padding-left: 105px、
  文字は SF Display 35px / weight 600 / line-height 1.0
- 和文の大見出しは 太ゴ B101 39.2px / weight 600 / lh 1.5 / letter-spacing 0.1em
- box-shadow は一切使わない。カード・入力欄・画像の border-radius は 0
- コンテナ幅は最大 1140px、2 カラムは 570px ずつ、gutter 28px
- font-feature-settings は normal（palt は掛けない）
```
