# DESIGN.md — Peach Aviation（ピーチ）

> Peach Aviation 株式会社（https://www.flypeach.com/jp）のデザイン仕様書。
> 2012 年就航、関西国際空港を拠点とする日本初の本格 LCC。「愛あるフライトを、すべての人に。」を掲げる。
> 最大の特徴は、**対角の 2 隅だけを丸める非対称 `border-radius`（`0px 20px` / `0px 42px` / `0px 12px`）** を UI 全体に効かせていること。桃の実と葉のかたちをそのままコンポーネントの輪郭にした設計で、**同じ形が 1 つも 4 隅対称になっていない**。
> **テキストの基本色が黒でもグレーでもなくブラウン `#6d564a`**、地はクリーム `#fff9f3`・ベージュ `#f6ede4`、主色はマゼンタ寄りのピンク `#e65080`。
> 和文は **Noto Sans JP**、欧文は **Montserrat** を先頭に置く欧文優先スタック。
> 実サイトの computed style 実測（2026-08-16 取得。トップページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **「桃」を輪郭で表現する**。色をピンクに寄せるだけでなく、**角丸を対角 2 隅に寄せた非対称形**（葉のかたち）をボタン・カード・チップの共通言語にしている。円形の面（桃の実）を背景に大きく重ねてリズムを作る
- **Peach について**: LCC ゆえ「安く・わかりやすく」が最優先。予約フォームをファーストビュー直下に置き、そこから下は導線カードが整然と並ぶ。**装飾は輪郭と面色に寄せ、文字組みは徹底して平易**
- **密度**: 中〜高密度・機能優先。予約フォーム → 導線グリッド（9 枚）→ プロモーション → おすすめ情報 → お知らせ、と用途別に面色を変えて積む
- **キーワード**: 非対称 radius、ブラウンの文字色 `#6d564a`、ピンク `#e65080`、クリーム `#fff9f3`、Montserrat + Noto Sans JP、影ほぼ無し
- **特徴**:
  - **`border-radius` に非対称の 2 値指定を使う**。`0px 20px`（左上・右下が 0、右上・左下が 20px）が最頻出で 23 箇所、カードは `0px 42px`、CTA は `0px 12px`。**これが Peach の「かたち」そのもの**
  - **テキストの基本色がブラウン `#6d564a`**。純黒も無彩色のグレーも使わない。ベージュの地に対して柔らかいコントラストを作る
  - **ピンクは 2 段**。CTA・アクティブタブの `#e65080`（マゼンタ寄り）と、トグル・アイコンの `#ef8da5`（明るいコーラル）
  - **地は白ではなくクリーム**。`#fff9f3` → `#f6ede4` → `#eddfd4` の 3 段のベージュでセクションを塗り分ける
  - **フッターがピンク面 `#e5869a`**。白抜き文字で締める
  - **`letter-spacing` はサイト全体で `normal`**、`font-feature-settings` も `normal`。字間の調整をしない
  - ウェイトは **400 / 600 / 700** の 3 段で、`u-weightSB`（SemiBold=600）・`u-weightB`（Bold=700）というユーティリティクラスで付ける
  - 枠線が**太い**。カードは `3px solid #e2c3a6`、チップは `2px solid #e2c3a6`。1px の細罫を使わない

---

## 2. Color Palette & Roles

> 実測値。テキストはブラウン `#6d564a`、地はクリーム `#fff9f3`、主色はピンク `#e65080`。

### Brand（ブランド）

- **Peach Pink** (`#e65080`, rgb 230,80,128): 主要 CTA（「ログイン/登録」「検索」）とアクティブタブの面色。**サイトで最も強い色**
- **Coral Pink** (`#ef8da5`, rgb 239,141,165): 往復／片道トグルの選択面、モバイルナビのアイコン、カルーセルの現在位置ドット。**Peach Pink より一段明るく、頻度は高いが強さは弱い**
- **Footer Pink** (`#e5869a`, rgb 229,134,154): フッターの面色。白抜き文字で置く
- **Pale Pink** (`#f9d0db`, rgb 249,208,219): 導線カードのアイコン背景、ホバー面
- **Notice Pink** (`#fce7ed`, rgb 252,231,237): 「重要なお知らせ」バーの面色

### Base（地・面）

- **Cream** (`#fff9f3`, rgb 255,249,243): ページの基調となる淡いクリーム。ドロワーメニューの面色でもある
- **Beige** (`#f6ede4`, rgb 246,237,228): 導線グリッド・おすすめ情報セクションの面色
- **Beige Deep** (`#eddfd4`, rgb 237,223,212): さらに一段濃いベージュ。カレンダーの外枠・区切り面
- **Beige Calendar** (`#f5ede5`, rgb 245,237,229): カレンダーヘッダーの面色
- **White** (`#ffffff`): カード・フォーム・入力欄の面

### Neutral（文字・罫）

- **Brown Text** (`#6d564a`, rgb 109,86,74): **基本テキスト色**。本文・見出し・ナビ・ラベルすべて。純黒を使わない
- **Brown Text Deep** (`#6a574c`, rgb 106,87,76): カレンダーの曜日ヘッダーなど、ごくわずかに沈めた文字色
- **Tan** (`#c39378`, rgb 195,147,120): ヘッダーのメニューアイコン・補助アイコンの色
- **Border Tan** (`#e2c3a6`, rgb 226,195,166): **カード（3px）・チップ（2px）の枠線色**
- **Inactive Gray** (`#d3ccc9`, rgb 211,204,201): 非選択タブの面色、入力欄のプレースホルダ
- **Muted Gray** (`#958d87`, rgb 149,141,135): カレンダーの非活性ボタン
- **Scrim** (`rgba(0,0,0,0.65)`): 画像上のオーバーレイ

### Semantic（意味的な色）

- **Danger / Holiday** (`#bf0008`, rgb 191,0,8): カレンダーの日曜・祝日。エラー表示にも使う
- **Info / Saturday** (`#5172aa`, rgb 81,114,170): カレンダーの土曜。青系はここにしか出ない
- **Notice**: `#fce7ed` の面 ＋ `#e65080` の文字（「重要なお知らせ」）
- **Success**: サイト上に専用色を持たない。`#ef8da5` を流用する

---

## 3. Typography Rules

> **欧文 Montserrat を先頭に置き、和文 Noto Sans JP → 游ゴシック → ヒラギノ → メイリオと繋ぐ欧文優先スタック**。`letter-spacing` も `font-feature-settings` も全体で `normal`。ウェイト 400 / 600 / 700 の 3 段だけで階層を作る。

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP** を第一候補に置き、以降 **游ゴシック体 → 游ゴシック → Yu Gothic → ヒラギノ角ゴ Pro W3 → メイリオ → Osaka** と繋ぐ長いフォールバック
- **游ゴシックの指定が 4 通り並ぶ**（`游ゴシック体` / `YuGothic` / `游ゴシック` / `Yu Gothic`）。macOS・Windows の両方で確実に游ゴシックを掴むための冗長指定
- ヒラギノは **Pro W3**（ProN ではない）。旧環境向けの保険
- 明朝体は使わない

### 3.2 欧文フォント

- **サンセリフ**: **Montserrat**。**スタックの先頭**に置き、欧文グリフ（`Peach` `KIX` `2026/08/13` 等）をすべて Montserrat で出す
- 幾何学サンセリフの Montserrat は「peach」ロゴの丸みと相性がよく、**数字（運賃・日付・空港コード）の見え方を統一する**目的が大きい
- 等幅フォントの指定はない

### 3.3 font-family 指定

```css
/* 全体（欧文優先） */
font-family: Montserrat, "Noto Sans JP", 游ゴシック体, YuGothic, 游ゴシック,
             "Yu Gothic", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
             メイリオ, Meiryo, Osaka, sans-serif;

/* 全体 */
letter-spacing: normal;
font-feature-settings: normal;   /* palt を使わない */
```

**フォールバックの考え方**:
- **欧文 Montserrat を先頭**に置く。和文フォント内の欧文グリフより Montserrat を優先させたいため
- その直後に Web フォントの **Noto Sans JP**、以降は OS 搭載の游ゴシック → ヒラギノ → メイリオ → Osaka と、**新しい環境から古い環境の順**に並べる
- 游ゴシックは表記ゆれ 4 種を全部書く。1 つだけでは環境によって外れる

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Head | Montserrat + Noto Sans JP | 30px | **700** | 1.5 (45px) | normal | `u-weightB`「おすすめ情報」 |
| Sub Head | 同上 | 22px | **600** | 1.5 (33px) | normal | `u-weightSB`「お知らせ」 |
| Lead / Card Head | 同上 | 18px | **600** | 1.6 (28.8px) | normal | `u-fontL u-weightSB` |
| Nav Head | 同上 | 18px | **700** | 1.4 (25.2px) | normal | グローバルナビの見出し |
| Nav Item | 同上 | 17px | **600** | 1.0 (17px) | normal | 「予約・旅の準備」 |
| Nav Sub | 同上 | 15px | **600** | 1.3 (19.5px) | normal | 「路線・時刻表」 |
| Body | 同上 | 16px | 400 | **1.6 (25.6px)** | normal | `body` 既定 |
| Body Emphasis | 同上 | 16px | **600** | 1.6 (25.6px) | normal | `u-weightSB` |
| Body (card) | 同上 | 16px | 400 | 1.5 (24px) | normal | カード内の説明文 |
| Caption | 同上 | 14px | **600** | 1.6 (22.4px) | normal | `u-fontS u-weightSB` |
| Micro Label | 同上 | 10px | **600** | 1.0 (10px) | normal | アイコン下の「メニュー」 |
| Icon | 同上 | 34px | 400 | 1.0 (34px) | normal | アイコンフォント |
| Calendar Day | 同上 | 32px | 400 | 1.0 (32px) | normal | 日付セル |

- **`font-weight: 600`（SemiBold）が階層の主役**。400 は本文、700 は最上位見出しとメイン CTA だけ
- 1 行で置くラベル・ナビは `line-height: 1.0`、折り返す本文は **1.5〜1.6**
- ユーティリティクラス（`u-fontS` = 14px / `u-fontL` = 18px / `u-weightSB` = 600 / `u-weightB` = 700）でサイズとウェイトを付ける実装

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.6**（16px→25.6px）。カード内の説明文は 1.5（16px→24px）
- **見出しの行間**: **1.5**（30px→45px / 22px→33px）。ナビは 1.0〜1.4
- **字間 (letter-spacing)**: **サイト全体で `normal`**。字間の調整を一切しない
- **palt は使わない**（`font-feature-settings: normal`）

**ガイドライン**:
- **字間をいじらない**のが Peach の方針。読みやすさは行間 1.6 と 16px の本文サイズで確保する
- 本文 16px は LCC の「誰でも読める」要件に直結する。**14px 以下を本文に使わない**
- 太さのコントラストは 400 ↔ 600 で作る。600 と 700 の差は最上位の見出しにだけ使う

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 「搭乗の流れ（国内線 / 国際線）」「大人(12歳以上)」のように**括弧つきラベルが多い**。`word-break: break-all` にすると括弧が行頭に来るため使わない
- 空港コード（`KIX` `MMB` `KUH`）は 3 文字で必ず 1 行に収める

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt を掛けない */
```

- **`palt` を使わない**。ラベルが短く括弧を多く含むため、プロポーショナル詰めを掛けると括弧まわりが不自然に寄る
- 欧文は Montserrat が担うため、和欧混植の詰めを `kern` に頼る必要がない

### 3.8 縦書き

- 該当なし。UI・記事とも横組み

---

## 4. Component Stylings

> **`border-radius` の非対称指定が Peach の骨格**。`0px 20px` は「左上・右下 = 0 / 右上・左下 = 20px」を意味し、桃の葉のような輪郭になる。対称に丸めない。

### Border Radius Scale（実測の出現頻度順）

| 値 | 出現 | 形 | 用途 |
|----|------|----|------|
| `5px` | 89 | 対称・微小 | 入力欄、カレンダーのセル、汎用の小要素 |
| `50%` | 54 | 円 | アイコン背景、カルーセルのドット、丸ボタン |
| `10px` | 41 | 対称 | 画像・バナーの角 |
| `550px` | 25 | ピル | タグ・ラベル（実質完全な丸端） |
| **`0px 20px`** | **23** | **非対称** | **チップ・導線ボタン（Peach の基本形）** |
| **`0px 42px`** | 8 | 非対称・大 | 導線カード |
| `1700px` | 6 | ピル | 大きな面のピル |
| **`0px 12px`** | 5 | 非対称・小 | ヘッダーの主要 CTA |
| `10px 10px 0 0` | 3 | 上のみ | タブ・見出し帯 |
| `450px` | 2 | ピル | カレンダーの日付ピル |

### Buttons

**Primary（ヘッダー CTA）**
- Background: `#e65080` / Text: `#ffffff`
- **Border Radius: `0px 12px`**（非対称）
- Padding: `10px 24px`
- Font: 16px / weight **700**
- 例: 「ログイン/登録」

**Tab Active（フォーム切替）**
- Background: `#e65080` / Text: `#ffffff`
- Border Radius: `0`（上辺だけ丸める実装のときは `10px 10px 0 0`）
- Padding: `5px 15px`
- Font: 18px / weight 600
- 例: 「フライト検索・ご予約」

**Tab Inactive**
- Background: `#d3ccc9` / Text: `#6d564a`
- 同形状。**非活性はグレーの面色で表す**（枠線や透明度で表さない）
- 例: 「予約の確認」「運航情報」

**Toggle（往復／片道）**
- Selected: Background `#ef8da5` / Text `#ffffff` / Padding `10px 20px` / 16px / weight 600
- Unselected: Background `#ffffff` / Text `#6d564a` / weight 600
- **Coral Pink を使う**（Peach Pink は使わない）

**Chip（導線ボタン）**
- Background: `#ffffff` / Text: `#6d564a`
- Border: **`2px solid #e2c3a6`**
- **Border Radius: `0px 20px`**（非対称・最頻出）
- Padding: `8px 25px 8px 10px`（右側は矢印アイコン分）
- Font: 16px / weight 400
- 例: 「路線・時刻表」「運賃タイプ」

**Pill（タグ・日付）**
- Background: `#f6ede4` / Text: `#6d564a`
- Border Radius: `450px` 〜 `550px`（実質完全な丸端）
- Padding: `5px 12px`
- Font: 9〜12px

### Cards

- Background: `#ffffff`
- Border: **`3px solid #e2c3a6`**（**3px の太枠**）
- **Border Radius: `0px 42px`**（非対称・大）
- Padding: `6px 15px 20px`
- Font: 16px / weight 400 / color `#6d564a`
- 例: 「搭乗の流れ（国内線 / 国際線）」「フライトの検索・予約」
- **影は落とさない**。太枠と非対称の輪郭でカードを立てる

### Inputs

- Background: `#ffffff`
- Border: `1px solid #e2c3a6`
- Border Radius: `5px`
- Padding: `12px 16px`
- Font: 16px / weight 600
- Text: `#6d564a` / Placeholder: `#d3ccc9`
- **入力欄だけは対称の `5px`**。非対称形はボタン・カードに限る

### Notice Bar

- Background: `#fce7ed` / Text: `#e65080`
- 全幅・角丸なし。ヘッダー直下に置く
- 例: 「重要なお知らせ： 夏休み期間中の混雑について」

### Calendar

- 外枠: `#eddfd4` / ヘッダー面: `#f5ede5`
- セル: `#ffffff` / radius `5px` / 32px の日付
- 土曜 `#5172aa` / 日曜・祝日 `#bf0008` / 平日 `#6d564a`
- 非活性ボタン: `#958d87`

### Footer

- Background: **`#e5869a`**（ピンク面）/ Text: `#ffffff`
- Font: 16px / weight 400

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 10px |
| M | 15px |
| L | 24px |
| XL | 40px |
| XXL | 60px |

### Container

- Max Width: **1300px**（最外）／ **1000px・1020px**（本体コンテンツ）／ **650px**（狭いカラム）
- 背景の円形モチーフのみ **1920px** まで広げてブリードさせる
- Padding (horizontal): 15〜24px

### Grid

- 導線グリッドは **5 カラム × 2 段（計 9 枚 + 大 1 枚）**
- おすすめ情報・プロモーションは 4 カラムのカルーセル
- Gutter: 10〜15px
- **背景に大きな円（桃の実）を重ねてセクションの境界をぼかす**。矩形の境界線でセクションを切らない

---

## 6. Depth & Elevation

**ほぼフラット。影は 1 種類のみ。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。カード・ボタン・チップすべて |
| 1 | `0 0 10px rgba(0,0,0,0.1)` | 固定ヘッダー・ドロワーなど、重なりを示す最小限の箇所のみ（実測 3 箇所） |

- 奥行きは **クリーム `#fff9f3` × ベージュ `#f6ede4` × ベージュ濃 `#eddfd4` × 白 `#ffffff`** の 4 段の面で作る
- カードの立体感は **3px の太枠 `#e2c3a6`** が担う。影ではない
- 画像上に文字を置くときは `rgba(0,0,0,0.65)` のスクリムを敷く

---

## 7. Do's and Don'ts

### Do（推奨）

- **`border-radius` は非対称の 2 値で書く**。基本は `0px 20px`、カードは `0px 42px`、主要 CTA は `0px 12px`
- テキストは**ブラウン `#6d564a`** を基本にする（黒もグレーも使わない）
- 地はクリーム `#fff9f3` → ベージュ `#f6ede4` → `#eddfd4` の 3 段で塗り分ける
- ピンクは用途で 2 段に分ける（CTA・アクティブは `#e65080`、トグル・アイコンは `#ef8da5`）
- カードは `3px solid #e2c3a6`、チップは `2px solid #e2c3a6` の**太枠**で立てる
- 本文は 16px / line-height 1.6 を守る（LCC の可読性要件）
- 太さは 400 ↔ 600 のコントラストで作る。700 は最上位見出しと主要 CTA のみ
- `letter-spacing` は `normal` のまま触らない
- 欧文・数字は Montserrat に載せる（スタックの先頭に置く）
- セクションの境界は罫線ではなく**背景の大きな円形モチーフ**でぼかす

### Don't（禁止）

- **4 隅を対称に丸めない**（`border-radius: 20px` と書いてはいけない。`0px 20px` が Peach の形）
- テキストに `#000000` や無彩色のグレーを使わない（すべてブラウン系）
- 地に純白 `#ffffff` を敷き詰めない（白はカード・フォームの面に限る）
- **影でカードを浮かせない**。太枠で立てる
- 1px の細罫を使わない（枠線は 2px か 3px）
- `letter-spacing` を触らない、`palt` を掛けない
- 本文を 14px 以下にしない
- `#e65080` と `#ef8da5` を混用しない（CTA は前者、トグル・アイコンは後者）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1〜2 カラム。ナビは下部固定バー（`p-bottomFixHeaderNav`）に切り替わる |
| Tablet | 768–1024px | 3 カラム |
| Desktop | > 1024px | 5 カラム＋最大 1300px（本体 1000〜1020px） |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- **モバイルでは下部固定ナビ**にアイコン（34px）＋ ラベル（10px / weight 600）を積む。アイコン色は `#ef8da5`

### フォントサイズの調整

- 本文 16px は据え置き（**モバイルでも下げない**。LCC の可読性方針）
- Section Head 30px → 22〜24px、Sub Head 22px → 18px 程度に縮小
- 行間 1.6 はモバイルでも維持する
- 非対称 radius の値はモバイルで縮める（カード `0px 42px` → `0px 24px` 程度）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #fff9f3（クリーム） / #f6ede4（ベージュ） / #eddfd4（ベージュ濃）
Surface:        #ffffff（カード・フォーム）
Text:           #6d564a （ブラウン。黒・グレーを使わない）
Peach Pink:     #e65080 （主要 CTA・アクティブタブ）
Coral Pink:     #ef8da5 （トグル・アイコン・ドット）
Footer BG:      #e5869a （白抜き文字）
Notice:         #fce7ed の面 + #e65080 の文字
Border:         #e2c3a6 （カード 3px / チップ 2px / 入力欄 1px）
Inactive:       #d3ccc9
Calendar:       土 #5172aa / 日・祝 #bf0008
Font:           Montserrat, "Noto Sans JP", 游ゴシック体, YuGothic, 游ゴシック,
                "Yu Gothic", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",
                メイリオ, Meiryo, Osaka, sans-serif
Body Size:      16px / weight 400 / lh 1.6（25.6px）
Weights:        400（本文） / 600（強調・ナビ） / 700（最上位見出し・主要CTA）
Letter Spacing: normal（サイト全体で触らない）
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         0px 20px（チップ・基本形） / 0px 42px（カード） / 0px 12px（CTA）
                5px（入力欄） / 50%（アイコン） / 550px（ピル）
Shadow:         なし（ヘッダー等のみ 0 0 10px rgba(0,0,0,.1)）
Container:      1300px（最外） / 1000–1020px（本体） / 650px（狭カラム）
```

### プロンプト例

```
Peach Aviation のデザインシステムに従って、運賃タイプの比較ページを作成してください。
- フォントは Montserrat を先頭に置き、和文は "Noto Sans JP" → 游ゴシック → ヒラギノ → メイリオと繋ぐ
- テキストの基本色はブラウン #6d564a（黒・無彩色グレーは使わない）
- 地はクリーム #fff9f3、セクション面はベージュ #f6ede4 / #eddfd4、カードは白 #ffffff
- border-radius は必ず非対称の 2 値で書く：
  カード = 0px 42px、チップ・導線ボタン = 0px 20px、主要 CTA = 0px 12px、入力欄のみ 5px
- カードは border: 3px solid #e2c3a6、チップは 2px solid #e2c3a6。影は使わない
- 主要 CTA は #e65080 の面に白文字・16px/700・radius 0px 12px
- 往復／片道のようなトグルは #ef8da5 の面に白文字（#e65080 は使わない）
- 非選択タブは #d3ccc9 の面に #6d564a の文字
- 本文は 16px / weight 400 / line-height 1.6、強調は weight 600、最上位見出しのみ 700
- letter-spacing は normal のまま、font-feature-settings も normal（palt を掛けない）
- セクションの区切りは罫線ではなく、背景に大きな円形（桃の実）を重ねてぼかす
- コンテナ幅は最外 1300px、本体コンテンツ 1000px
```
