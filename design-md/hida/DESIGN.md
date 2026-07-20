# DESIGN.md — 飛騨産業 (HIDA)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 対象サイト: https://kitutuki.co.jp/
> 飛騨産業（HIDA）は岐阜県高山市の木製家具メーカー。1920年創業、キツツキマークで知られる。
> 実測はコーポレート／オンラインストア統合トップページの computed style に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白の余白と 1px の細罫だけで構成する、限りなく無装飾なギャラリー型。家具と森の写真が唯一の色面で、UI 側は色・影・角丸をすべて捨てている
- **密度**: 低密度。ファーストビューは全画面の写真スライダーと透過ヘッダーのみで、テキストはほぼ載せない
- **キーワード**: 静謐 / 素木（しらき） / 端正 / 余白 / 職人的
- **形状言語**: **すべて直角**（`border-radius: 0`）。角丸を使うのはスライダーのドット・SNS アイコン等の完全な円（`50%`）だけ。ボタンも塗らず、`1px solid #dcdcdc` の細い矩形で囲うだけ
- **奥行き**: `box-shadow` が**サイト全体で 1 つも存在しない**。重なりは白面と細罫と余白だけで表現する完全なフラット設計
- **書体の性格**: Web フォントを一切読み込まず、**游ゴシック体のみ**で組む。その代わり `letter-spacing: 0.1em` を全要素にグローバル適用し、字間の広さで「木肌の間（ま）」のような静けさを作っている。これが本サイト最大の特徴
- **差し色**: 面としての差し色は無い。唯一の彩度色はお知らせ日付の朱赤 `#c82832` のみ

---

## 2. Color Palette & Roles

<!-- 実測。塗り面は白／薄グレー／墨色の3つだけ。CSS Custom Properties は未使用（0件） -->

### Base（下地）

- **Background** (`#ffffff`): ページ全体の下地。純白。ヘッダー展開メニュー・カード面も同じ純白
- **Surface** (`#f5f5f5`): フッター全域の面色。白からごくわずかに沈めるだけのライトグレー
- **Surface Dark** (`#282828`): 検索モーダルのボタン面・SP メニューの帯など、反転させたい局所にだけ使う墨色
- **Overlay** (`rgba(0,0,0,0.6)`): モーダル背後の暗幕

### Text（文字色）

- **Text Primary** (`#282828`): 見出し・本文・ナビ・ボタン文字。純黒ではなく墨色。サイト内の文字色の圧倒的多数（実測 676 要素）
- **Text on Image** (`#ffffff`): 写真・墨色面の上に載る文字（ヒーロー上のロゴ、展開メニュー内リンク）
- **Text Muted** (`#a0a0a0`): 非選択の言語切替（EN）など、明確に沈める補助テキスト
- **Text Subtle** (`#f0f0f0`): 写真上に重なる非選択リンク（白背景の反対側の沈め方）
- **Text UA Black** (`#000000`): ヘッダー検索まわりの一部（ブラウザ既定色が残っている箇所）。**新規実装では使わず `#282828` に寄せる**

### Accent（差し色）

- **News Red** (`#c82832`): お知らせ一覧の日付テキストのみに使う朱赤。**面には絶対に使わない、文字色専用のアクセント**

### Line（罫）

- **Border** (`#dcdcdc`): 区切り線・ボタンの枠・カードの枠。サイト内で唯一の罫色（実測 14 箇所）。1px solid で統一

### 色に関する設計思想

- 塗り面は「白・#f5f5f5・#282828」の3枚だけ。中間のグレー面を作らない
- **枠線は 1 色（`#dcdcdc`）・1 太さ（1px）に統一**する。太くしたり濃くしたりして階層を作らない
- 彩度のある色は日付の朱赤 1 点のみ。ボタンやバッジに色を足すとサイトの静けさが崩れる
- 色ではなく「白い余白の量」で階層を作るのがこのサイトの流儀

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **游ゴシック体（Yu Gothic）単独**。Web フォントは一切読み込んでいない（実測: 全 889 要素が同一の游ゴシックチェーン）
- **明朝体**: 使用しない
- **注意**: 游ゴシックは macOS / Windows のシステムフォント。Windows では標準ウェイトが細すぎるため、チェーン内で **`游ゴシック Medium` / `Yu Gothic Medium`** を明示的に拾う指定になっている（後述 3.3）

### 3.2 欧文フォント

- **サンセリフ**: **専用指定なし**。欧文（HIDA / JP / EN / 日付）も游ゴシック体の Latin グリフで組む。最終フォールバックのみ `sans-serif`
- **ロゴ**: ヘッダーの「HIDA」はフォントではなく画像／SVG。極端に字間を開いた細身のジオメトリック大文字で、本文書体とは別系統
- **セリフ / 等幅**: 使用しない

> **代替フォントの注記**: 游ゴシックは macOS / Windows には標準搭載だが、Linux や一部環境では存在しない。
> preview.html では実チェーンをそのまま指定したうえで、末尾に Google Fonts の
> **Zen Kaku Gothic New**（游ゴシックに近い小さめの字面・低コントラストの人文的ゴシック）を
> フォールバックとして追加している。Noto Sans JP は字面が大きく骨格が硬いため、
> 本サイトの繊細な印象からは離れる。

### 3.3 font-family 指定

```css
/* 本文・見出し・ナビ・ボタン すべて共通（サイト全体でこの1本のみ） */
font-family: 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
  游ゴシック, "Yu Gothic", sans-serif;
```

**フォールバックの考え方**:
- 先頭は macOS の PostScript 名（`游ゴシック体` / `YuGothic`）
- 続いて **Windows 向けに Medium を先に拾う**（`游ゴシック Medium` / `Yu Gothic Medium`）。Windows の游ゴシック Regular は線が細く潰れるため、Medium を優先するのが定石
- 最後に Regular（`游ゴシック` / `Yu Gothic`）→ `sans-serif`
- 和文単独チェーン。欧文専用フォントを先頭に置かない＝**和欧すべて游ゴシックで組む**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Logo (h1) | 画像/SVG | 32px | 600 | — | 0.05em | ヘッダーの「HIDA」。実体は画像 |
| Section (h2) | 游ゴシック | 24px | 700 | 1.75 | 0.067em | セクション見出し（`.c_title`）。padding 24px 0 |
| Sub Label (h5) | 游ゴシック | 13px | 600 | 1.75 | 0.123em | フッター見出し（`.c-utiList__head`） |
| Nav | 游ゴシック | 12px | 600 | 1.0 | 0.133em | グローバルナビ。行間 1.0 で 1 行固定 |
| Body | 游ゴシック | 16px | 400 | 1.75 | 0.1em | 本文・カード見出し・ヘッダーメニュー |
| Button | 游ゴシック | 15px | 400 | 1.62 | 0.05em | アウトラインボタン（`.c-sib2-btn`） |
| Button Menu | 游ゴシック | 15px | 400 | 3.33 | 0.107em | ヘッダーメニュー内ボタン（行高 50px で高さを作る） |
| Caption | 游ゴシック | 12.8px | 400 | 1.75 | 0.125em | 日付・注記 |
| Small | 游ゴシック | 12px / 10px | 400–600 | 1.0–1.75 | 0.1em 相当 | コピーライト・アイコンラベル |

**ウェイトは 400 / 600 / 700 の 3 段のみ**。300 や 500 は使わない。

### 3.5 行間・字間

- **本文の行間 (line-height)**: `1.75`（16px 本文に対し 28px）。見出しも同じ `1.75`（24px に対し 42px）で、**本文と見出しの行間比率を揃える**のがこのサイトの特徴
- **見出しの行間**: `1.75`（本文と同値）。ナビだけ `1.0` で 1 行に固定
- **本文の字間 (letter-spacing)**: **`0.1em`（16px に対し 1.6px）をグローバル適用**。実測 806 要素が `1.6px`
- **見出しの字間**: 見出しも同じ `1.6px` 実値。ただし font-size が違うため em 換算では見出し 24px = `0.067em`、ナビ 12px = `0.133em` と**小さい文字ほど相対的に広がる**
- **ボタンの字間**: `0.75px`（15px に対し `0.05em`）とやや詰める

**ガイドライン**:
- `letter-spacing` は px の固定値（`1.6px`）で全体に効かせるのが実装の実態。em で書き直すと小サイズの字間が詰まり、サイトの印象が変わる点に注意
- 日本語で `0.1em` は相当広い部類。本サイトの静けさはここに依存しているので**詰めない**
- 行間 1.75 を下回らせない

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
word-break: normal;      /* 日本語の自然な折り返しに任せる */
line-break: strict;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`
- 見出しは短い語（「ピックアップ」「お知らせ」「木工の聖地　飛騨高山」）で構成し、そもそも折り返さない設計にする

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使用しない */
```

- **palt は全要素で OFF**（実測: `font-feature-settings` が `normal` 以外の要素は 0 件）
- 理由は明快で、`letter-spacing: 0.1em` でベタ組みを意図的に開いているため、`palt` で詰めると設計が相殺される
- **このサイトを再現する際は `palt` を有効にしない**

### 3.8 縦書き

該当なし。全面横組み。

---

## 4. Component Stylings

### Buttons

このサイトには**塗りボタンが存在しない**。すべてアウトライン（枠線）ボタン。

**Primary（アウトライン・矩形）** — `.btn_link`

- Background: `transparent`
- Text: `#282828`
- Border: `1px solid #dcdcdc`
- Border Radius: `0px`
- Width: `400px`（PC。中央寄せ）
- Font Size: `16px` / Weight `400` / Line Height `1.75`
- Letter Spacing: `0.1em`
- 右端に `>` の細線シェブロン（SVG, stroke `#282828`）を配置

**Secondary（アウトライン・左寄せ）** — `.c-sib2-btn`

- Background: `transparent`
- Text: `#282828`
- Border: `1px solid #dcdcdc`
- Border Radius: `0px`
- Padding: `15px`
- Text Align: `left`
- Font Size: `15px` / Line Height `1.62` / Letter Spacing `0.05em`

**Menu Button** — `.c-headerMenuBtn`

- Background: `#ffffff`
- Text: `#000000`
- Border: なし
- Font Size: `15px` / Line Height `50px`（行高で高さを作る）/ Letter Spacing `0.107em`

**ホバー**: 塗りを足さず、枠線または文字色をわずかに濃くする程度に留める。色を反転させない。

### Inputs

- Background: `#ffffff`
- Border: `1px solid #dcdcdc`
- Border (focus): `1px solid #282828`（枠線色を墨色に置き換える。リング／シャドウは使わない）
- Border Radius: `0px`
- Padding: `12px 15px`
- Font Size: `16px`（iOS のズーム防止のため 16px 未満にしない）
- Height: `48px` 前後

**エラー**: 枠線を `#c82832` に、エラーメッセージ文字も `#c82832`。背景は塗らない。

### Cards

- Background: `#ffffff`
- Border: なし（写真そのものがカードの輪郭）
- Border Radius: `0px`
- Padding: `0`（画像は天地左右いっぱい、テキストのみ画像下に `16px` 程度の余白で配置）
- Shadow: **なし**（Depth & Elevation 参照）
- キャプションは中央寄せ・`16px` / `400` / `0.1em`

### Divider

- `1px solid #dcdcdc`。フッターのセクション区切り・ボタン下線に使う唯一の罫

---

## 5. Layout Principles

### Spacing Scale

実測から逆算した 4 の倍数ベースのスケール。

| Token | Value | 用途 |
|-------|-------|------|
| XS | 8px | アイコンとラベルの間 |
| S | 16px | カード内テキスト間 |
| M | 24px | 見出しの上下 padding（`.c_title` = `24px 0`） |
| L | 50px | コンテナ左右 padding |
| XL | 60px | セクション下 padding |
| XXL | 120px | セクション間の大きな抜き |

### Container

- Max Width: `1280px`（`.l-container`）
- Padding (horizontal): `50px` → **コンテンツ幅 1180px**
- ピックアップ等の一部ブロックのみ `1200px` / padding `10px`
- ヒーロースライダーは全幅（`100vw`、コンテナ外）

### Grid

- Columns: 4（フッターナビ・カテゴリカード）、2（大判の商品カード）
- Gutter: `20px`〜`30px`
- カードは正方形〜横長（およそ 3:2）の写真＋下部中央キャプション

### Header

- `position: fixed`、高さ `80px` 前後
- ヒーロー上では**背景透過**（`s-topContents`）、スクロール後に白背景へ切り替わる
- 構成: 左＝ロゴ、中央＝グローバルナビ（12px/600）、右＝検索・アカウント・カート・言語切替・ハンバーガー

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべての要素** |

- **実測で `box-shadow` を持つ要素はサイト全体で 0 件**
- 奥行きは (1) 白と `#f5f5f5` の面の切り替え、(2) `1px solid #dcdcdc` の罫、(3) 余白の量 の 3 手段だけで表現する
- モーダルのみ背後に `rgba(0,0,0,0.6)` の暗幕を敷くが、モーダル自体に影は付けない
- **このデザインシステムで影を足すと即座に別物になる。カードにもドロップダウンにも影を付けない**

---

## 7. Do's and Don'ts

### Do（推奨）

- `letter-spacing: 1.6px`（16px 本文で `0.1em`）をグローバルに効かせる。字間の広さがこのブランドの声
- 行間は本文・見出しともに `1.75` で揃える
- ボタンは `1px solid #dcdcdc` のアウトライン矩形。右端に細線シェブロン `>` を添える
- 罫線は `#dcdcdc` 1色・1px のみに統一する
- 文字色は `#282828`。写真の上に載せるときだけ `#ffffff`
- 写真を主役にし、UI は白と細罫に徹する
- font-family チェーンに Windows 向けの `Yu Gothic Medium` を必ず含める

### Don't（禁止）

- **`border-radius` を付けない**（円形アイコン以外はすべて直角）
- **`box-shadow` を使わない**（サイト内に実例が 1 つも無い）
- **塗りボタンを作らない**。ブランド色でボタンを塗る CTA はこのサイトに存在しない
- `palt` を有効にしない（`letter-spacing 0.1em` と喧嘩する）
- 文字色に純黒 `#000000` を新規で使わない（既存の `#000000` はブラウザ既定の残り。`#282828` に寄せる）
- 朱赤 `#c82832` を背景色・ボタン色として使わない（日付の文字色専用）
- 日本語本文で `line-height` を 1.75 未満にしない
- 中間グレーの面色を増やさない（面は白 / `#f5f5f5` / `#282828` の 3 枚のみ）

---

## 8. Responsive Behavior

### Breakpoints

実測の media query から主要なもの。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。グローバルナビはハンバーガー内に格納 |
| Tablet | 768px – 1023px | 2カラム。ナビは一部省略 |
| Desktop | ≥ 1024px | 標準レイアウト |
| Wide | ≥ 1280px | コンテナ最大幅 1280px に到達 |

補助的に `640px` / `930px` / `1250px` / `1360px` のクエリも存在する。

### タッチターゲット

- 最小サイズ: 44px × 44px
- ヘッダーのアイコンボタンは 48px 角相当（`line-height: 48px` で確保）
- SP のメニュー項目は `line-height: 50px` で高さを取る

### フォントサイズの調整

- 本文 16px は SP でも据え置き（入力欄も 16px 未満にしない）
- セクション見出し h2 は 24px → 20px 程度に縮小
- ボタン幅 `400px` は SP では `100%`（左右 20px の余白付き）
- 字間 `0.1em` は SP でも維持する（縮めない）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:  なし（塗りボタン非使用）
Text Color:     #282828
Background:     #ffffff
Surface:        #f5f5f5
Border:         #dcdcdc （1px solid, 唯一の罫色）
Accent (text):  #c82832 （日付のみ）
Font:           游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック, "Yu Gothic", sans-serif
Body Size:      16px
Line Height:    1.75
Letter Spacing: 1.6px (= 0.1em)
Border Radius:  0
Box Shadow:     none
palt:           off
```

### プロンプト例

```
飛騨産業（HIDA）のデザインシステムに従って、木製家具の商品一覧ページを作成してください。

- 背景は #ffffff、文字色は #282828、フッターのみ #f5f5f5
- font-family: 游ゴシック体, YuGothic, "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック, "Yu Gothic", sans-serif
- letter-spacing: 1.6px を body にグローバル適用（palt は使わない）
- line-height は本文・見出しともに 1.75
- border-radius はすべて 0、box-shadow は一切使わない
- 罫線は 1px solid #dcdcdc のみ
- ボタンは塗らず、transparent 背景 + 1px solid #dcdcdc の矩形。右端に細線の > を置く
- カードは商品写真＋下部中央にキャプション（16px / 400）。枠線も影も付けない
- コンテナは max-width 1280px、左右 padding 50px
```
