# DESIGN.md — dancyu（ダンチュウ）

> プレジデント社の食雑誌『dancyu』の公式サイト（https://dancyu.jp/）のデザイン仕様書。
> 1990 年創刊、「食こそエンターテインメント」を掲げる。Web 版は「プロが教えるレシピ／厳選！店探し／食のストーリー／連載」の 4 本柱と、会員制コミュニティ「食いしん坊倶楽部」で構成される。
> 最大の特徴は **`border-radius` が全ページでゼロ**であること。ボタン・バッジ・カード・画像まで角を一切丸めず、**赤 `#cc0700` の面と 2px の枠線だけで UI を組む**。雑誌の版面をそのまま Web に持ち込んだ設計。
> 和文は **游ゴシック Medium を先頭に置く**（Regular ではなく Medium）。**12px の UI テキストにだけ `letter-spacing: -1.2px`（-0.1em）の強いマイナス字間**を掛ける、日本語サイトでは珍しい詰め方をする。
> 特集セクションは **`writing-mode: vertical-rl` で 40px の縦組み見出し**を立てる。
> 実サイトの computed style 実測（2026-08-17 取得。トップページ + 記事ページ）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **料理写真を全幅で見せ、UI は赤・黒・生成りの 3 色に絞る**。角丸ゼロ・影ほぼ無しで、面と罫線だけで構造を作る
- **dancyu について**: 食に特化した月刊誌。**写真とテキストの密度が高い**のが誌面の特徴で、Web でもそれを保っている
- **密度**: 中〜高密度・メディア型。キービジュアル（全幅カルーセル）→ ピックアップ → 連載 → 食いしん坊倶楽部 → 編集部のおすすめ、と縦に積む
- **キーワード**: radius 0、朱赤 `#cc0700`、深紅 `#950500`、生成り `#f5efda`、游ゴシック Medium、ls -1.2px、縦組み見出し、2px の枠線
- **特徴**:
  - **`border-radius` を使わない**。ボタン・バッジ・カード・画像・入力欄すべて角のまま。実測で radius を持つのは検索ボックスの 1 箇所（`4px 4px 0 0`）だけ
  - **枠線は 2px**。1px ではなく 2px の実線で囲むのが dancyu のボタン。**ロゴの赤い囲みと同じ太さ**に揃えている
  - **`letter-spacing: -1.2px` を 12px の UI テキストに掛ける**（= **-0.1em**）。「倶楽部入会（無料）」「ログイン」「メニュー」など。**日本語で -0.1em はかなり強い詰め**で、小さいボタンに文字を収めるための処理
  - **赤が 3 段階**ある。ブランド赤 `#cc0700`（CTA・見出し・日付）／深紅 `#950500`（特集セクションの全面）／コーラル `#db524d`（カルーセルの非選択ドット）
  - **生成り `#f5efda`** が唯一の「紙の色」。深紅の上に置くカードと、検索ブロックの面に使う
  - **見出しはすべて weight 700**。本文は 400。**中間のウェイトを使わない**
  - **特集セクションの見出しは縦組み**（`writing-mode: vertical-rl` / 40px / lh 1.3）。日本地図のアウトラインを背景に、右端に縦書きで立てる
  - **影は 1 種類だけ**：`10px 10px 60px rgba(4,0,0,0.08)`。**右下に大きくずらした極端に柔らかい影**で、ピックアップ記事のカードにだけ使う
  - 日付だけ **Lato**（欧文サンセリフ）に切り替え、色を `#cc0700` にする

---

## 2. Color Palette & Roles

> CSS Custom Properties は定義されていない。すべて直値。実装側で変数化する場合は以下の名前を使う。

### Brand（赤の 3 段階）

- **Brand Red** (`#cc0700`): **主要 CTA・見出しの強調・日付・SP ナビの枠**
  - 「倶楽部入会（無料）」（塗り・白文字・radius 0）
  - 「入部はこちら（登録無料）」（2px の枠のみ）
  - 記事の日付（Lato 14px / weight 700）
- **Deep Red** (`#950500`): **「食いしん坊倶楽部」特集セクションの全面**。縦組み見出しと日本地図を白の線で乗せる
- **Coral** (`#db524d`): カルーセルの非選択ドット。**唯一の「弱い赤」**

### Neutral（面・文字）

- **Background** (`#ffffff`): ページ地色
- **Ink** (`#000000`): **本文と見出しの文字色。dancyu は純黒を使う**
- **Charcoal** (`#262626`): 「一覧を見る」の全幅バー、フッターの面色
- **Gray Text** (`#4c4c4c`): 記事の要約・リード
- **Divider Gray** (`#cccccc`): 罫線・区切り
- **Chip Gray** (`#e5e5e5`): 「AD」バッジの面。文字は `rgba(38,38,38,0.5)`

### Paper（紙の色）

- **Cream** (`#f5efda`): **深紅セクションに置くカードの面**、キーワード検索ブロックの面
- **Warm White** (`#f5f2eb`): 記事ページの「案内する人」ブロックの面。クリームよりさらに淡い

### Semantic（意味的な色）

- dancyu は食メディアのため意味色が前面に出ない
- **Info / Primary**: ブランド赤 `#cc0700` を流用
- **Danger／Error**: `#cc0700`（同色。フォームのエラーも赤で示す）
- **Disabled**: `#cccccc` の罫と `rgba(38,38,38,0.5)` の文字

---

## 3. Typography Rules

> **游ゴシック Medium を先頭に置く和文優先スタック**。Web フォントは日付用の **Lato** だけ。`palt` は使わない。**12px の UI にだけ -0.1em の強い詰め**を掛ける。

### 3.1 和文フォント

- **ゴシック体**: **游ゴシック Medium** を先頭に置く。`"Yu Gothic Medium"` → `"游ゴシック Medium"` → `"Yu Gothic"` → `游ゴシック` → `YuGothic` → `游ゴシック体` の **6 表記を並べて**環境差を吸収し、以降 **ヒラギノ角ゴ Pro W3 → メイリオ** と繋ぐ
- **Regular ではなく Medium を先頭に指定する**のが要点。游ゴシックは Windows の Regular（400）が細く見えるため、**Medium を明示して太さを確保する**（SmartHR が `@font-face` で解決している問題を、dancyu はフォント名指定で解決している）
- **和文の Web フォントは読み込まない**。写真の読み込みを優先する判断
- 明朝体は使わない

### 3.2 欧文フォント

- **サンセリフ**: **Lato**（`Lato, sans-serif`）。**日付と「AD」バッジにだけ**使う
  - 日付: 14px / weight 700 / lh 1.29（18px） / 色 `#cc0700`
  - AD バッジ: 10px / weight 400 / lh 2.5（25px）
- それ以外の欧文（`dancyu` のロゴ、`Google Maps` のボタン等）は和文スタックにそのまま流す
- 等幅フォントの指定はない

### 3.3 font-family 指定

```css
/* 本文・UI（和文優先。Medium を先頭に置く） */
font-family: "Yu Gothic Medium", "游ゴシック Medium", "Yu Gothic", 游ゴシック,
             YuGothic, 游ゴシック体, "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif;

/* 日付・AD バッジ（欧文のみ） */
font-family: Lato, sans-serif;

/* グローバル */
letter-spacing: normal;
font-feature-settings: normal;   /* palt は使わない */

/* 12px の UI テキストにだけ */
letter-spacing: -1.2px;          /* = -0.1em。日本語では強い詰め */
```

**フォールバックの考え方**:

- **和文を先頭**に置く（游ゴシック Medium）。日本語の表示品質を優先する方針
- **Medium の表記を 2 つ（`"Yu Gothic Medium"` / `"游ゴシック Medium"`）並べる**のが肝。片方だけだと環境によって Regular に落ちる
- ヒラギノは **Pro**、しかもウェイト名込みの `"ヒラギノ角ゴ Pro W3"` 表記
- **`sans-serif` の直前に MS Pゴシックを入れない**（dancyu はメイリオで止めている）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Feature Head（縦組み） | 和文 | **40px** | **700** | 1.3 (52px) | normal | `writing-mode: vertical-rl`。「食いしん坊倶楽部」 |
| Article Title (詳細) | 和文 | 34px | **700** | 1.35 (46px) | normal | 記事ページの `h1` |
| Hero Title | 和文 | 32px | **700** | 1.31 (42px) | normal | トップの最上位見出し |
| Section Head | 和文 | 30px | **700** | 1.0–1.6 (30–48px) | normal | 「関連する記事」「編集部のおすすめ」 |
| Card Title (L) | 和文 | 26px | **700** | 1.31 (34px) | normal | ピックアップ記事 |
| Card Title (M) | 和文 | 22px | **700** | 1.27 (28px) | normal | おすすめ記事 |
| Card Title (S) | 和文 | 20px | **700** | 1.3 (26px) | normal | 連載一覧 |
| Feature Body | 和文 | 18px | 400 | 1.61 (29px) | normal | 特集の説明文（白文字） |
| Bar Button | 和文 | 18px | **700** | **4.44 (80px)** | normal | 「一覧を見る」。**行高でバーの高さを作る** |
| Lead | 和文 | 15px | 400 | 1.53 (23px) | normal | トップのリード文。色 `#4c4c4c` |
| Article Body | 和文 | **15px** | 400 | **1.73 (26px)** | normal | 記事本文。**最も読ませる行間** |
| Sub Head | 和文 | 17px | **700** | 2.47 (42px) | normal | 記事内の小見出し「案内する人」「店舗情報」 |
| Body | 和文 | 14px | 400 | 1.6 (22.4px) | normal | `body` 既定 |
| Nav | 和文 | 15px | **700** | 1.53 (23px) | normal | グローバルナビ |
| Caption | 和文 | 13px | 400 | 1.46–1.69 (19–22px) | normal | 記事の要約・店舗情報 |
| Credit | 和文 | 12px | 400 | 2.17 (26px) | normal | 「文：〇〇　写真：〇〇」 |
| UI (詰め) | 和文 | 12px | **700** | 1.6 (19.2px) | **-0.1em (-1.2px)** | ボタン・「メニュー」「検索」 |
| Date | **Lato** | 14px | **700** | 1.29 (18px) | normal | **色 `#cc0700`** |
| AD Badge | **Lato** | 10px | 400 | 2.5 (25px) | normal | 面 `#e5e5e5` / 文字 `rgba(38,38,38,.5)` |

- **weight は 700 と 400 の 2 値だけ**。500 や 600 を使わない
- **見出しは例外なく 700**。サイズだけで階層を作る
- **行間は見出し 1.27〜1.35、本文 1.6〜1.73** と明確に分かれる

### 3.5 行間・字間

- **記事本文の行間は 1.73**（15px→26px）。日本語の読み物として十分に開く
- **トップの本文は 1.6**（14px→22.4px）。一覧では少し詰める
- **見出しの行間は 1.27〜1.35**。2〜3 行の折り返し前提
- **字間は原則 `normal`**。ただし **12px の UI テキストだけ `-1.2px`（-0.1em）** に詰める
- `palt` は使わない

**ガイドライン**:

- **-1.2px を大きい文字に適用しない**。12px の小さいボタン専用の処理で、見出しに掛けると字面がぶつかる
- 記事本文は **15px / 1.73** を守る。14px に落とさない（トップの一覧と記事で明確に差をつけている）
- 「一覧を見る」のような全幅バーは、**padding ではなく `line-height: 80px` で高さを作る**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:

- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 記事タイトルに **`【マヨネーズと海苔が隠し味】`** のような隅付き括弧が頻出する。`word-break: break-all` にすると括弧が行頭に来るため使わない
- 店名の欧文（`Horse and the sun`）と和文が混在する。**欧文の単語を途中で割らない**
- 「〜」「⇔」「･」など記号を含む店名・路線名が多い。`white-space` の指定は行わず、禁則に任せる

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* 全ページ共通 */
```

- **`palt` を掛けない**。字間の調整はすべて `letter-spacing` で行う
- 12px の UI に掛ける `-1.2px` は `palt` の代わりではなく、**プロポーショナル化ではなく一律の詰め**である点に注意（かなと漢字が同じ量だけ詰まる）

### 3.8 縦書き

**dancyu は縦組みを実際に使う。**

```css
/* 特集セクションの見出し */
writing-mode: vertical-rl;
font-size: 40px;
font-weight: 700;
line-height: 1.3;   /* 縦組みでは字間ではなく行間として効く */
letter-spacing: normal;
```

- 「食いしん坊倶楽部」の見出しを、深紅 `#950500` の面の**右端に縦書きで立てる**
- 同じテキストを持つ親の `div.block__event__index` も `vertical-rl`。**ラッパーごと縦組みにする**
- 縦組みにするのは**セクション見出し 1 箇所だけ**。本文・記事タイトルは横組み
- 実装時は `text-orientation: upright` を指定しない（**英数字は横倒しのままでよい**という判断）

---

## 4. Component Stylings

> **`border-radius: 0` が絶対のルール**。枠線は 2px。

### Buttons

**Primary（ブランド赤の塗り）**

- Background: `#cc0700`
- Text: `#ffffff`
- Border: なし
- Border Radius: **`0`**
- Padding: `5px`（左右は幅で確保）
- Font: 12px / **weight 700** / lh 1.6 / **ls -1.2px**
- 例: 「倶楽部入会（無料）」（ヘッダー右上）

**Secondary（黒の枠）**

- Background: `#ffffff`
- Text: `#000000`
- Border: **`1px solid #000000`**
- Border Radius: `0` / Padding: `5px`
- Font: 12px / weight 700 / **ls -1.2px**
- 例: 「ログイン」「マイページ」

**Red Outline（2px の枠）— コミュニティ導線**

- Background: `transparent`
- Text: `#cc0700`
- Border: **`2px solid #cc0700`**
- Border Radius: `0`
- Font: 13px / weight 700 / lh 3.38（44px）
- 例: 「入部はこちら（登録無料）」「プロが教えるレシピ」（SP ナビ）

**Bar（全幅の黒バー）— 一覧への導線**

- Background: `#262626`
- Text: `#ffffff`
- Border Radius: `0`
- Font: 18px / **weight 700** / **lh 4.44（80px）**
- 幅は親いっぱい、右端に `▶` を置く
- 例: 「一覧を見る」

**White Outline（濃色の上）**

- Background: `transparent` / Text: `#ffffff`
- Border: **`2px solid #ffffff`** / Border Radius: `0`
- 例: フッターの「PRESIDENT Storeで購入する」「雑誌の予約購読はこちらから」

**Inline Link（記事内）**

- Background: `#000000` / Text: `#ffffff`
- Border Radius: `0`
- Font: 15px / weight 700 / lh 3.6（54px）
- 例: 「この連載のほかの記事を読む」「Google Maps」

### Badges

**AD バッジ**

- Background: `#e5e5e5` / Text: `rgba(38, 38, 38, 0.5)`
- Border Radius: `0`
- Font: **Lato** 10px / weight 400 / lh 2.5
- **記事タイトルの直前にインラインで置く**

**Date（バッジではなくテキスト）**

- Font: **Lato** 14px / **weight 700** / 色 **`#cc0700`**
- 記事メタの先頭に置き、連載名を続ける

### Cards（記事）

- Background: `#ffffff`
- Border Radius: **`0`**（**画像も角丸なし**）
- 構成: 画像 → タイトル（20〜26px / 700 / lh 1.3）→ 要約（13px / 400 / lh 1.46 / `#4c4c4c`）→ 日付（Lato 14px / `#cc0700`）
- Shadow: **ピックアップ記事のみ** `10px 10px 60px rgba(4, 0, 0, 0.08)`。それ以外は影なし
- パディングの大きいカード（`60px 50px`）とパディングなしのカードが混在する。**ヒーロー級だけ余白を大きく取る**

### Inputs

- Background: `#ffffff`
- Border: なし（下罫または親ブロックの面で表現）
- Border Radius: `0`（検索ボックスの親だけ `4px 4px 0 0`）
- Padding: `5px`
- Font: **20px** / weight 400 / lh 1.6
- Text: `#000000`
- **検索の入力欄が 20px と大きい**のが特徴。キーワード検索は生成り `#f5efda` の面に置く

### Sections（面色の使い分け）

| セクション | 面色 | 文字色 |
|-----------|------|--------|
| 通常のコンテンツ | `#ffffff` | `#000000` |
| 食いしん坊倶楽部（特集） | **`#950500`（深紅）** | `#ffffff` |
| 特集内のカード | **`#f5efda`（生成り）** | `#000000` |
| キーワード検索 | `#f5efda` | `#000000` |
| 記事内「案内する人」 | `#f5f2eb`（ウォームホワイト） | `#000000` |
| 一覧バー | `#262626` | `#ffffff` |
| フッター | `#262626` | `#ffffff` |

---

## 5. Layout Principles

### Spacing Scale

CSS 変数はない。実測から起こすと 5 / 10 / 20 / 40 / 50 / 60px の系列。

| Token | Value | 用途 |
|-------|-------|------|
| XS | 5px | ボタン内側 |
| S | 10px | チップ・タグの間隔 |
| M | 20px | ブロック内の縦間隔 |
| L | 40px | 特集カードのパディング |
| XL | 50–60px | ヒーローカードのパディング（`60px 50px`） |

### Container

- **明示的な `max-width` を持つコンテナがない**。セクションごとに `%` と `vw` で幅を決める（実測でコンテナ要素が 0 件）
- キービジュアル・特集セクションは **全幅（100vw）**
- 記事本文は概ね 700〜800px 相当に収まるが、**px 固定ではない**
- Padding (horizontal): 20〜50px

### Grid

- キービジュアルは全幅カルーセル（写真 + 右下にオーバーレイした白いカード）
- ピックアップは 2 カラム（大きいパディング `60px 50px` のカード）
- 連載・おすすめは 3〜4 カラム
- **画像は角丸なし**。矩形のまま並べる
- **写真を画面の端まで到達させる**（左右のマージンを取らない）配置が多い

---

## 6. Depth & Elevation

**影は 1 種類だけ。しかも極端に柔らかい。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。ボタン・バッジ・通常のカード・画像すべて |
| 1 | **`10px 10px 60px rgba(4, 0, 0, 0.08)`** | ピックアップ記事のカード、記事ページの追従ヘッダー |

- **オフセットが右下に 10px ずつ、ぼかしが 60px** という極端な設定。**輪郭を持たない「にじみ」**として効く
- 影の色が純黒ではなく **`rgba(4, 0, 0, .08)`**（わずかに赤み）。ブランド赤との相性を取っている
- 奥行きは **白 × 生成り `#f5efda` × 深紅 `#950500` × 黒 `#262626`** の面のコントラストで作る

---

## 7. Do's and Don'ts

### Do（推奨）

- **`border-radius: 0` を貫く**。ボタン・バッジ・カード・画像・入力欄すべて角のまま
- **枠線は 2px**（`2px solid #cc0700` / `2px solid #ffffff`）。ヘッダーの小さいボタンだけ 1px
- 和文は **`"Yu Gothic Medium"` を先頭**に置き、Medium 表記を 2 つ（英名・和名）並べる
- **12px の UI テキストにだけ `letter-spacing: -1.2px`** を掛ける
- 見出しは例外なく **weight 700**、本文は 400。**中間ウェイトを使わない**
- 記事本文は **15px / line-height 1.73**、トップの一覧は 14px / 1.6 と使い分ける
- 日付は **Lato 14px / weight 700 / `#cc0700`**
- 全幅バーの高さは **`line-height: 80px`** で作る
- 特集セクションは **深紅 `#950500` の全面 + `writing-mode: vertical-rl` の 40px 縦組み見出し**
- 特集内のカードは **生成り `#f5efda`**
- 影は **`10px 10px 60px rgba(4,0,0,.08)` ただ 1 種類**をピックアップ記事にだけ

### Don't（禁止）

- **角を丸めない**。radius を 4px でも入れた瞬間に dancyu ではなくなる
- **`-1.2px` を 12px より大きい文字に掛けない**（見出しで字面がぶつかる）
- weight 500 / 600 を使わない
- `palt` を掛けない
- **赤を 1 色に統一しない**。`#cc0700`（UI）／`#950500`（特集面）／`#db524d`（ドット）の 3 段を保つ
- 影を複数段用意しない（Level 1 の 1 種類だけ）
- 画像に `border-radius` を付けない
- 游ゴシックを **Regular で指定しない**（Windows で細くなる。**Medium を明示する**）
- ヒラギノを **ProN** と書かない（**Pro**、ウェイト名込みの `"ヒラギノ角ゴ Pro W3"`）

---

## 8. Responsive Behavior

### Breakpoints

**主断点が 813px**という珍しい値。以降は 1200 / 1260 / 1550 で調整する。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 813px | 1 カラム。グローバルナビは「メニュー」に格納し、下部に赤枠の SP ナビを出す |
| Tablet | 814–1200px | 2 カラム |
| Desktop | 1201–1549px | 3〜4 カラム |
| Wide | ≥ 1550px | キービジュアルを最大化 |

- 補助的に 650px / 880px / 1060px / 1340px / 1440px の断点も使われている
- **SP 専用のナビ（`block__sp-nav`）が別途ある**。`2px solid #cc0700` の枠に 13px / lh 44px で「プロが教えるレシピ」「厳選！店探し」を並べる

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- SP ナビは `line-height: 44px` でちょうど 44px を確保している
- ヘッダーの「倶楽部入会（無料）」は `padding: 5px` + 12px 行で 29px 程度。**モバイルでは上下 12px に引き上げる**
- 全幅バーは 80px あり、そのままで足りる

### フォントサイズの調整

- **記事本文 15px は据え置き**（モバイルでも下げない）
- Article Title 34px → 24〜26px、Hero Title 32px → 22px 程度に縮小し、**行間 1.3 台を維持**する
- **縦組みの特集見出し 40px はモバイルで 28〜32px に落とす**（画面高が足りなくなるため）
- `letter-spacing: -1.2px` はモバイルでも維持する（**ボタン幅の制約はモバイルの方が厳しい**）
- 日付の Lato 14px は据え置き

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:     #ffffff
Brand Red:      #cc0700 （CTA・日付・見出しの強調・SP ナビの枠）
Deep Red:       #950500 （食いしん坊倶楽部セクションの全面）
Coral:          #db524d （カルーセルの非選択ドット）
Cream:          #f5efda （深紅の上のカード・検索ブロック）
Warm White:     #f5f2eb （記事内の紹介ブロック）
Charcoal:       #262626 （一覧バー・フッターの面）
Text:           #000000（本文・見出し） / #4c4c4c（要約・リード）
Chip:           #e5e5e5 の面 + rgba(38,38,38,.5) の文字（AD バッジ）
Border:         #cccccc（罫） / 2px solid #cc0700（ボタン） / 2px solid #ffffff（濃色上）

JP Font:        "Yu Gothic Medium", "游ゴシック Medium", "Yu Gothic", 游ゴシック,
                YuGothic, 游ゴシック体, "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif
EN Font:        Lato, sans-serif（日付・AD バッジのみ）

Body:           14px / 400 / lh 1.6（22.4px）
Article Body:   15px / 400 / lh 1.73（26px）
Headings:       すべて weight 700。34 / 32 / 30 / 26 / 22 / 20px
Vertical Head:  40px / 700 / lh 1.3 / writing-mode: vertical-rl
Bar Button:     18px / 700 / line-height 80px（高さを行高で作る）
UI (12px):      700 / letter-spacing -1.2px（-0.1em）★ 12px 専用
Date:           Lato 14px / 700 / #cc0700
Letter Spacing: normal（12px の UI のみ -1.2px）
Feature:        font-feature-settings: normal（palt を使わない）
Radius:         0 （全要素。例外は検索ボックスの 4px 4px 0 0 のみ）
Shadow:         10px 10px 60px rgba(4,0,0,.08) （ピックアップ記事のみ。他は none）
Breakpoint:     813px（主断点） / 1200 / 1260 / 1550
```

### プロンプト例

```
dancyu のデザインシステムに従って、レシピ記事の一覧ページを作成してください。
- 和文は "Yu Gothic Medium", "游ゴシック Medium", "Yu Gothic", 游ゴシック, YuGothic,
  游ゴシック体, "ヒラギノ角ゴ Pro W3", メイリオ, sans-serif（Medium を先頭に置く）
- 日付だけ Lato 14px / weight 700 / 色 #cc0700
- 地は白 #ffffff、本文とタイトルは純黒 #000000、要約は #4c4c4c
- 本文 14px / line-height 1.6、記事詳細の本文は 15px / line-height 1.73
- 見出しはすべて weight 700。カードタイトル 26px / line-height 1.31
- border-radius は全要素 0。角を一切丸めない（画像・入力欄も含む）
- ヘッダーの「倶楽部入会（無料）」は #cc0700 の塗り・白文字・12px / weight 700 /
  letter-spacing -1.2px。「ログイン」は白面 + 1px solid #000000
- コミュニティ導線は 2px solid #cc0700 の枠だけのボタン（13px / line-height 44px）
- 一覧への導線は全幅の #262626 バー。18px / weight 700 / line-height 80px で高さを作る
- 「食いしん坊倶楽部」セクションは #950500 の全面に白文字、見出しは
  writing-mode: vertical-rl の 40px / weight 700 縦組み、カードは生成り #f5efda
- AD バッジは #e5e5e5 の面に Lato 10px / rgba(38,38,38,.5)
- 影はピックアップ記事のカードにだけ 10px 10px 60px rgba(4,0,0,.08)。他は none
- font-feature-settings は使わない（palt なし）。主断点は 813px
```
