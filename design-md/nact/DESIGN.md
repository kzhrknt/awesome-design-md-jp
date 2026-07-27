# DESIGN.md — 国立新美術館（The National Art Center, Tokyo）

> 国立新美術館（https://www.nact.jp/）のデザイン仕様書。
> 2007 年開館、六本木。黒川紀章設計の波打つガラスカーテンウォールで知られる、コレクションを持たない「アートセンター」型の美術館。**シンボルマークは佐藤可士和による「新」の一字**で、縦画・横画を切り離した幾何学的な構成が館のアイデンティティになっている。
> Web の最大の特徴は、**赤 `#d7322d` と墨 `#222222` の二色だけで組む禁欲的な設計**と、**`border-radius: 5px 0` / `20px 0` という左右非対称の角丸**。ヘッダーは黒帯 `#222222`、地は純白。和文は **ヒラギノ角ゴ Pro W3**（ProN ではなく **Pro**）を先頭に置き、UI の欧文には **Roboto** を当てる。
> 実サイトの computed style 実測（2026-07-27 取得。トップ＋企画展一覧ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **静謐で中立**。作品・展覧会のビジュアルが主役で、UI は赤と墨の二色に絞って一切主張しない。コレクションを持たない館の「器」としての性格が、そのまま色数の少なさに出ている
- **国立新美術館について**: 公募展・企画展・ライブラリー・レストランを併設する複合文化施設。建築そのものが観光対象でもあるため、Web でも建築写真が大きく扱われる
- **密度**: 中密度。全幅の建築ビジュアルスライダーの下に、展覧会カード・タグ・お知らせが規則的に並ぶ。行間 1.7 でゆったり組む
- **キーワード**: 墨 #222222、朱赤 #d7322d、純白の地、非対称角丸 5px 0、ヒラギノ角ゴ **Pro** W3、行間 1.7、Roboto の UI 欧文
- **特徴**:
  - 色は実質 **墨 `#222222` と赤 `#d7322d` の 2 色**。ヘッダーの黒帯とアクティブなタグ・検索ボタンにしか彩度がない
  - **`border-radius` が左右非対称**。タグチップは `5px 0`（左上と右下だけ 5px）、カードリンクは `20px 0`。**これが国立新美術館の UI の署名**で、単純な角丸やピルとは異なるリズムを作る
  - 和文は **`ヒラギノ角ゴ Pro W3`** を先頭に置く。**ProN ではなく Pro**（字形の新旧が異なる別物なので取り違えない）。第 2 候補が `Noto Sans JP`
  - **`line-height: 1.7`（16px→27.2px）がほぼ全要素に一律**で効く。見出しにも本文にも同じ行間が乗るのが特徴
  - **見出しは `font-weight: 700`**、本文は 400。ウェイトは二極でサイズだけが変わる
  - **`letter-spacing` は `normal`**（字間を触らない）、**`font-feature-settings` も `normal`**（palt を使わない）
  - ヘッダー右上の機能ナビ（カレンダー／チケット／アクセス／検索／Language）は **黒帯 `#222222` に白抜き**、フォントは **Roboto**

---

## 2. Color Palette & Roles

> 実測値。地は純白 `#ffffff`、テキストと黒帯が `#222222`、唯一のアクセントが朱赤 `#d7322d`。面のグレーは `#eeeeee`、罫は `#cccccc` / `#dddddd`。

### Brand（ブランド）

- **Sumi / Ink** (`#222222`, rgb 34,34,34): **本文・見出しの基本テキスト色であり、ヘッダー黒帯の面色でもある**。純黒 `#000000` は使わない
- **NACT Red** (`#d7322d`, rgb 215,50,45): 唯一のアクセント。検索ボタンの面色、アクティブなタグチップの文字・枠、モーダルの閉じるボタン。**朱を含んだ赤**で、警告色ではなくブランド色として使う

### Neutral（面・罫）

- **Background** (`#ffffff`): ページ地色。純白
- **Surface Gray** (`#eeeeee`, rgb 238,238,238): セクション面・Cookie バナー・パンくず帯。白地に段差をつける薄グレー
- **Border** (`#cccccc`, rgb 204,204,204): 入力欄・アウトラインボタン・非アクティブタグの枠
- **Divider** (`#dddddd`, rgb 221,221,221): サイトマップ等の区切り線
- **Sub Text** (`#666666`): 日付・注釈・カードのメタ情報
- **Form Text** (`#55595c`): 検索ウィジェット内のテキスト（外部ウィジェット由来）
- **Calendar Navy** (`#000019`, rgb 0,0,25): カレンダーパネルの面色。ごくわずかに青を含んだ黒
- **Pale Red Tint** (`#fceaea`, rgb 252,234,234): 赤の淡いティント。ハイライト行・選択状態の面に使う

### Semantic（意味的な色）

- 美術館サイトのため意味色は最小限。**赤 `#d7322d` が「開催中／アクティブ」を兼ねる**
- **Active／Current**: `#d7322d`（タグ「#開催中」「#開催予定」は赤枠＋赤文字、それ以外は `#cccccc` 枠＋`#222222` 文字）
- **Danger／Error**: 同じ `#d7322d` を用いる。ブランド色と警告色が同一である点に注意し、エラー表示にはアイコンや文言で明示する
- **Success**: 専用色を持たない。墨 `#222222` で表現する

---

## 3. Typography Rules

> **ヒラギノ角ゴ Pro W3 → Noto Sans JP** のスタックに、UI 欧文だけ **Roboto** を当てる二層構成。**`line-height: 1.7` がほぼ全要素に一律**、`letter-spacing` と `font-feature-settings` はともに `normal`。ウェイトは 400 / 700 の二極。

### 3.1 和文フォント

- **ゴシック体**: **ヒラギノ角ゴ Pro W3**（`"ヒラギノ角ゴ Pro W3"` → `"Hiragino Kaku Gothic Pro"`）。第 2 候補に **Noto Sans JP** を置き、Web フォントとして補う
- **ProN ではなく Pro を指定している**点に注意。ProN は JIS2004 字形、Pro は JIS90 字形で**別物**。実装時に取り違えないこと
- 明朝体は使わない
- 見出しは同じファミリーの **weight 700**（`W3` を指定しつつ合成ボールドで太らせる実装）

### 3.2 欧文フォント

- **UI 欧文**: **Roboto**（`Roboto, sans-serif`）。ヘッダーの機能ナビ、日付表示、タブ、リストのメタ情報に使う
- **フォーム／ウィジェット**: `"Helvetica Neue", Helvetica, Arial, sans-serif`（検索ウィジェット等の外部コンポーネント由来）
- 和文本文中の欧文は、和文スタック（ヒラギノ／Noto Sans JP）の欧文グリフをそのまま使う
- **preview.html での注記**: ヒラギノ角ゴ Pro W3 は macOS 同梱フォントのため Windows・Linux では表示されない。プレビューでは **Google Fonts の "Noto Sans JP"（weight 400/700）** を用いる。これは**実サイトのフォールバック第 2 候補そのもの**なので、代替ではなく実装どおりの表示になる。欧文の **Roboto** も Google Fonts から読み込める

### 3.3 font-family 指定

```css
/* 和文（本文・見出し・カード） */
font-family: "ヒラギノ角ゴ Pro W3", "Noto Sans JP", "Hiragino Kaku Gothic Pro",
             "メイリオ", Meiryo, sans-serif;

/* UI 欧文（ヘッダー機能ナビ・日付・タブ） */
font-family: Roboto, sans-serif;

/* フォーム・外部ウィジェット */
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

/* グローバル */
line-height: 1.7;
letter-spacing: normal;
font-feature-settings: normal;
```

**フォールバックの考え方**:
- 和文を先頭に置く（日本語の表示品質を優先）
- macOS のヒラギノ → Web フォントの Noto Sans JP → Windows のメイリオ、という順で環境を吸収する
- **`Pro` と `ProN` を混在させない**
- UI の欧文だけは和文スタックから切り離し、Roboto で統一する

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Site Title | ヒラギノ角ゴ Pro W3 | 32px | 700 | 1.7 (27.2px) | normal | `h1`（ヘッダー） |
| Page Title | ヒラギノ角ゴ Pro W3 | 30.4px | 700 | 1.26 (38.4px) | normal | 下層ページの `h1`（=1.9rem） |
| Heading 1 | ヒラギノ角ゴ Pro W3 | 28.8px | 700 | 1.7 | normal | セクション見出し（=1.8rem） |
| Lead Number | ヒラギノ角ゴ Pro W3 | 25.6px | 700 | 1.7 | normal | 強調テキスト（=1.6rem） |
| Heading 2 | ヒラギノ角ゴ Pro W3 | 24px | 700 | 1.7 | normal | サブ見出し（=1.5rem） |
| Heading 3 | ヒラギノ角ゴ Pro W3 | 22.4px | 700 | 1.7 | normal | 小見出し（=1.4rem） |
| Header Nav (EN) | Roboto | 19.2px | 400 | 1.7 | normal | 黒帯の時刻表示（白抜き・=1.2rem） |
| Body | ヒラギノ角ゴ Pro W3 | 16px | 400 | **1.7 (27.2px)** | normal | `body` 既定 |
| Nav Link | ヒラギノ角ゴ Pro W3 | 16px | 400/700 | 1.5 (24px) | normal | グローバルナビ（現在地は 700） |
| Caption | ヒラギノ角ゴ Pro W3 | 14.4px | 400 | 1.7 | normal | 日付・メタ情報 `#666666`（=0.9rem） |
| Tag Chip | ヒラギノ角ゴ Pro W3 | 12.8px | 400 | — | normal | タグ（=0.8rem） |
| Header Small (EN) | Roboto | 9.6px | 400 | 1.7 | normal | 黒帯のアイコンラベル（=0.6rem） |

- **サイズは 16px を基準にした rem 刻み**（0.6 / 0.8 / 0.9 / 1.2 / 1.4 / 1.5 / 1.6 / 1.8 / 1.9rem）
- **ウェイトは 400 と 700 の二極**。中間ウェイトを使わない
- グローバルナビは現在地のみ 700 で示す

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.7**（16px→27.2px）。**見出しにも同じ 1.7 が一律で乗る**のがこのサイトの特徴
- **例外**: 下層ページの `h1` のみ 1.26（30.4px→38.4px）、グローバルナビのみ 1.5（16px→24px）
- **字間 (letter-spacing)**: **全要素 `normal`**。字間を一切触らない
- **palt は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- 見出しを詰めたくなっても 1.7 のまま置く。均一な行間が館の静けさを作っている
- 字間を触らない方針を守る。開いても詰めても中立さが失われる
- 16px 基準の rem 刻みでサイズを決め、中途半端な px 値を挟まない

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
letter-spacing: normal;
```

- **palt を使わない**。字間・字詰めを一切操作せず、ヒラギノ角ゴの素の字面のまま組む
- 展覧会名には欧文・記号・年号が混在するため、詰め処理を入れずに素直に流す方が事故が少ない

### 3.8 縦書き

- 該当なし。すべて横組み
- 展覧会の題字などで用いる場合は `writing-mode: vertical-rl; text-orientation: mixed;`

---

## 4. Component Stylings

> **左右非対称の角丸（`5px 0` / `20px 0`）がこのサイトの署名**。単純な角丸やピルに置き換えないこと。

### Buttons

**Primary（赤・ソリッド）**
- Background: `#d7322d`
- Text: `#ffffff`
- Padding: `10px 50px 10px 30px`（右にアイコン用の余白を取る）
- Border Radius: `5px`
- Font: 13.33px（=0.833rem） / weight 400
- 例: 検索ボタン

**Secondary（白地・グレーアウトライン）**
- Background: `transparent`
- Text: `#222222`
- Border: `1px solid #cccccc`
- Padding: `10px 50px 10px 30px`
- Border Radius: `8px`
- Font: 16px / weight 400
- 例: 「もっと見る」「展覧会・イベントをもっと見る」

**Text Button（赤・枠なし）**
- Text: `#d7322d` / Background: `transparent` / Border: なし
- Padding: `6px 0` / Border Radius: `5px`
- 例: 「クリア」

**Close（赤・太枠）**
- Background: `transparent` / Text: `#d7322d`
- Border: `2px solid #d7322d`
- Border Radius: `10px`
- Padding: `16px 16px 16px 64px`

### Tag Chips（非対称角丸・署名的コンポーネント）

**Active（開催中／開催予定）**
- Background: `transparent`
- Text / Border: `#d7322d` / `1px solid #d7322d`
- **Border Radius: `5px 0`**（左上・右下のみ 5px、右上・左下は 0）
- Padding: `3.2px 8px`
- Font: 12.8px / weight 400
- ラベルは `#` 始まり（例: `#開催中` `#開催予定`）

**Inactive（すべて／終了）**
- Text: `#222222` / Border: `1px solid #cccccc`
- **Border Radius: `5px 0`** / Padding: `3.2px 8px`

### Card Link（展覧会・コラム）

- Background: `transparent` / Text: `#222222`
- **Border Radius: `20px 0`**（左上・右下のみ 20px）
- Padding: `16px`
- Font: 16px / weight 400 / lh 1.7
- 日付・カテゴリは 14.4px の `#666666`

### Inputs

- Background: `#ffffff`
- Border: `1px solid #cccccc`
- Border (focus): `1px solid #d7322d`
- Border Radius: `5px`
- Padding: `8px 16px`
- Font: 16px（フォームは 16px 未満にしない。iOS の自動ズーム回避）
- Text Color: `#222222` / Placeholder: `#666666`

### Header Bar（黒帯）

- Background: `#222222`
- Text: `#ffffff`
- 機能ナビ（カレンダー／チケット／アクセス／検索／Language）を Roboto で組む
- ラベルは 9.6px、時刻・日付表示は 19.2px

---

## 5. Layout Principles

### Spacing Scale

16px 基準の rem 刻み。

| Token | Value |
|-------|-------|
| XS | 3.2px (0.2rem) |
| S | 8px (0.5rem) |
| M | 16px (1rem) |
| L | 24px (1.5rem) |
| XL | 40px (2.5rem) |
| XXL | 64px (4rem) |

### Container

- Max Width: **1400px**（サイドのナビ列は 192px）
- Padding (horizontal): 16〜40px
- KV の建築ビジュアルスライダーは全幅ブリード

### Grid

- Columns: 展覧会カードは 3 カラム、コラムは 2〜3 カラム
- Gutter: 16〜24px
- カードは `border-radius: 20px 0` の非対称角丸で切る

---

## 6. Depth & Elevation

実測の box-shadow は外部ウィジェット由来の 1 種のみで、**サイト本体は実質フラット**。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。ほぼ全要素がフラット |
| 1 | `0 1px 1px rgba(0,0,0,0.1)` | カード・ドロップダウンを控えめに浮かせる場合 |
| 2 | `0 4px 12px rgba(0,0,0,0.12)` | モーダル・ポップオーバー（推定・オンブランド） |

- 奥行きは **白 `#ffffff` × 薄グレー `#eeeeee` × 黒帯 `#222222`** の面の差と、`#cccccc` の 1px 罫で表現する
- 影を足すより、非対称角丸と罫で領域を切る方がこのサイトのトーンに合う

---

## 7. Do's and Don'ts

### Do（推奨）

- 色は **墨 `#222222` と赤 `#d7322d` の 2 色**に絞る。面は `#eeeeee`、罫は `#cccccc`
- **`border-radius: 5px 0`（タグ）／`20px 0`（カード）の左右非対称角丸**を守る。これが館の UI の署名
- 和文は **ヒラギノ角ゴ Pro W3 → Noto Sans JP** の順で指定する（**ProN ではなく Pro**）
- **行間 1.7 を見出しにも一律で適用**する
- `letter-spacing: normal` / `font-feature-settings: normal` を保つ（字間を触らない）
- ウェイトは 400 と 700 の二極。現在地・見出しのみ 700
- サイズは 16px 基準の rem 刻み（0.8 / 0.9 / 1.2 / 1.4 / 1.5 / 1.8 / 1.9rem）で決める
- ヘッダーの機能ナビは黒帯 `#222222` に白抜き、欧文は Roboto

### Don't（禁止）

- **`ヒラギノ角ゴ ProN` を指定しない**（実サイトは `Pro`。ProN は JIS2004 字形で別物）
- **非対称角丸を単純な角丸やピルに置き換えない**（`5px 0` を `5px` にしない）
- テキストに純黒 `#000000` を使わない（墨 `#222222` を使う）
- 赤 `#d7322d` を広い面に多用しない（検索ボタンとアクティブ状態に限定する点の色）
- 見出しの行間を詰めない（1.7 の均一さが静けさを作っている）
- `letter-spacing` や `palt` で字間を操作しない
- 中間ウェイト（500 / 600）を使わない
- 強い影・グラデーションを使わない（実質フラットな設計）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。黒帯ナビはハンバーガーに集約 |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 3 カラム＋最大 1400px コンテナ |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。12.8px のタグチップは padding でタップ領域を確保する

### フォントサイズの調整

- 本文 16px は据え置き（フォーム入力欄も 16px を下回らない）
- Site Title 32px → モバイルでは 22〜24px、Heading 1 28.8px → 20〜22px 程度に縮小
- **行間 1.7 はモバイルでも維持する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff   （純白）
Text / Bar:     #222222   （墨。純黒は使わない。ヘッダー黒帯の面色でもある）
Accent:         #d7322d   （NACT Red。唯一のアクセント）
Surface:        #eeeeee
Border:         #cccccc / #dddddd
Sub Text:       #666666
Tint:           #fceaea   （赤の淡いティント）
JP Font:        "ヒラギノ角ゴ Pro W3", "Noto Sans JP", "Hiragino Kaku Gothic Pro", メイリオ, sans-serif
EN (UI) Font:   Roboto, sans-serif
Body Size:      16px / weight 400 / lh 1.7
Heading:        weight 700 / lh 1.7（下層 h1 のみ 1.26）
Letter Spacing: normal（触らない）
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         5px 0（タグ） / 20px 0（カード） / 5px（ボタン） / 8px（アウトライン）
Container:      1400px
```

### プロンプト例

```
国立新美術館のデザインシステムに従って、展覧会一覧ページを作成してください。
- 色は墨 #222222 と朱赤 #d7322d の 2 色のみ。面は #eeeeee、罫は #cccccc
- テキストに純黒 #000000 は使わず #222222 を使う
- 和文は "ヒラギノ角ゴ Pro W3", "Noto Sans JP" の順で指定する（ProN ではなく Pro）
- ヘッダーの機能ナビは黒帯 #222222 に白抜き、欧文は Roboto
- 本文 16px・行間 1.7。見出しにも同じ行間 1.7 を一律で適用する
- letter-spacing は normal、font-feature-settings も normal（字間を触らない）
- ウェイトは 400 と 700 の二極のみ。見出しと現在地ナビだけ 700
- タグチップは border-radius: 5px 0 の左右非対称角丸。
  アクティブ（#開催中 / #開催予定）は赤枠＋赤文字、それ以外は #cccccc 枠＋#222222 文字
- 展覧会カードは border-radius: 20px 0 の非対称角丸、padding 16px、日付は 14.4px の #666666
- 検索ボタンは #d7322d のソリッド（radius 5px、白文字、padding 10px 50px 10px 30px）
- 「もっと見る」は白地＋#cccccc アウトライン（radius 8px）
- 影は使わずフラットに。コンテナ幅は最大 1400px
```
