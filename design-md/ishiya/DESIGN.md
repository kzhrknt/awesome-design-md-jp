# DESIGN.md — 石屋製菓（ISHIYA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-02 / 対象: `https://www.ishiya.co.jp/`, `/about/`, `/shiroikoibito-cakes/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 白地に**ISHIYA ブルー `#005bac` 一色**で構造をつくる。北海道の雪と空の情景写真を大きく敷き、UI は写真の上に薄く乗る。装飾は罫線と字間に寄せ、影をほぼ使わない
- **密度**: ゆったり。コンテナは 1040px 固定で、左右に大きく余白を残す
- **キーワード**: 藍青、雪、広い字間、矩形、Playfair Display

**このサイトの核心は「欧文が Playfair Display のセリフ、和文が Noto Sans JP のゴシック」という和欧の役割分担**にある。`About` `Lineup` `News` `Shop` というグローバルナビの英字はすべて Playfair Display（セリフ）で組み、その真下に 11px のゴシックで「企業案内」「商品情報」と和文ルビのように添える。**英字をゴシックで組むと、この上品さは丸ごと消える。**

もうひとつの特徴が **`letter-spacing` が全階層で一律 `0.1em`** であること。本文 15px なら 1.5px、見出し 20.1px なら 2.01px と、サイズに比例して字間が開く。この「常に開いている字間」が全体の余韻をつくっている。

**root の `font-size` が `15px`**（16px ではない）。`rem` で組むと 1rem = 15px になるので、`1.34rem = 20.1px` のような半端な実測値が並ぶ。

---

## 2. Color Palette & Roles

CSS Custom Properties は **0個**。色はコンポーネント CSS に直書きされているので、以下はすべて computed style の実測値。

### Primary（ブランドカラー）

- **ISHIYA Blue** (`#005bac`): ブランドの中核。ロゴの角版、ヘッダーのピル CTA、セクション CTA の面色、ナビのリンク色。**実測で最多（面色 5件・文字色 50件）**
- **Deep Navy** (`#003767`): フッター最下部「関連サイト」バーの面
- **Navy** (`#00498a`): `#005bac` の暗い対。ホバー・押下用

### Secondary（第二の差し色）

- **ISHIYA Gold** (`#be9a60`): 「ブランドについて」CTA の面、ページトップへ戻る円形ボタン、一部の見出し文字色。**青の対になる金茶で、ここぞの1箇所にだけ置く**
- **Park Green** (`#124819`): 「白い恋人パーク 公式サイトへ」CTA 専用。グループ施設の識別色であり、汎用の success ではない

### Surface（面色）

- **Background** (`#ffffff`): ページ背景。`body` に明示指定
- **Cream** (`#fff4d5`): お知らせの強調帯などに稀に出る淡い面
- **Product Navy** (`#021336`): 商品特設ページ（白い恋人ケーキ）の全面背景。**コーポレート側では使わない**

### Neutral（ニュートラル）

- **Text Primary** (`#2d2622`): 本文。純黒ではなく、わずかに赤みのある焦茶。**実測 388 要素で圧倒的多数**
- **Text on Dark** (`#ffffff`): 写真・濃色面の上
- **Border** (`#cccccc`): 入力欄の枠、区切り線
- **Border Light** (`#dddddd`): 淡い罫線

### 2.5 混入している別サービスの色（採用禁止）

`uniqueBackgrounds` と `interactive` に **`#0e6cc1`** が 4〜5件出るが、これは**チャットボットウィジェット（「価格や取扱店舗などよくある質問」）由来**でブランド色ではない。

判別は簡単で、該当要素の `getBoundingClientRect()` が **すべて 0×0px**（未展開の吹き出し）。`_textPreview` も `チャットを開始する` / `適用` / `キャンセル` と、サイト本体のラベルとは語彙が違う。

同様に、`#0e6cc1` の要素だけ `border-radius` が `3px` / `4px` / `10px 10px 0 0` と半端な値を持つ。**サイト本体の radius は `0` か `36px`（ピル）か `50%`（円）の3つしかない。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（本文・ラベルの既定）**: **Noto Sans JP** → 游ゴシック → メイリオ
- **明朝体（ヘッダーの一部ボタン）**: **Noto Serif JP** → 游明朝 → メイリオ

明朝は「法人窓口」のようなヘッダー内の限定的なラベルにだけ現れる。本文には使わない。

### 3.2 欧文フォント

- **セリフ（見出し・ナビの英字）**: **Playfair Display**。Google Fonts から読み込み。ハイコントラストのディドネ系で、和文の Noto Sans JP と組み合わせて「洋菓子の格」を出す役
- **サンセリフ**: 独立した欧文サンセリフの指定は無い（和文スタックの Noto Sans JP が欧文も担当する）
- **等幅**: 定義なし

### 3.3 font-family 指定

```css
/* 本文・ナビの和文（既定） */
font-family: "Noto Sans JP", YuGothic, "Yu Gothic Medium", "Yu Gothic",
             Meiryo, メイリオ, sans-serif;

/* 見出し・ナビの英字 */
font-family: "Playfair Display", YuMincho, "Yu Mincho", Meiryo, メイリオ, serif;

/* ヘッダーの明朝ラベル（「法人窓口」等） */
font-family: "Noto Serif JP", YuMincho, "Yu Mincho", Meiryo, メイリオ, serif;
```

**フォールバックの考え方**:
- **和文先頭型**。Noto Sans JP を先頭に置き、欧文を先に置かない
- **欧文セリフのスタックにも和文（游明朝）を混ぜてある**。Playfair Display に日本語グリフは無いので、英字用のクラスをうっかり和文に当てても明朝で落ちる、という保険になっている
- Web フォントは `Noto Sans JP` と `Playfair Display` の2つだけ

### 3.4 文字サイズ・ウェイト階層

root が 15px のため、実測値は 15 の倍数まわりに寄る。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display EN | Playfair Display | 48px | 400 | 1.25 (60px) | 0.08em (3.84px) | 下層ページのヒーロー英字 |
| Display EN (top) | Playfair Display | 36px | 400 | 1.12 (40.32px) | 0.08em (2.88px) | トップのセクション英字見出し |
| Heading 1 | Noto Sans JP | 32px | 700 | 1.44 (46.2px) | 0.1em (3.21px) | 写真上の白見出し |
| Heading 2 (明朝) | Noto Serif JP | 25px | 400 | 1.8 (45.1px) | 0.1em (2.5px) | 下層のリード見出し |
| Nav EN | Playfair Display | 22px | 400 | 1.37 (30.2px) | 0.1em (2.2px) | グローバルナビの英字 |
| Heading 3 | Noto Sans JP | 20px | 700 | 1.6 (32.2px) | 0.1em (2.01px) | カード見出し |
| Lead | Noto Sans JP | 18px | 700 | 1.56 (28.1px) | 0.1em (1.8px) | 導入文 |
| Body | Noto Sans JP | 15px | 400 | **2.0 (30px)** | 0.1em (1.5px) | 本文。最多（89要素） |
| Body Bold | Noto Sans JP | 15px | 700 | 2.0 (30px) | 0.08em (1.2px) | ニュースカードの見出し |
| Caption | Noto Sans JP | 13px | 400 | 1.54 (20.1px) | 0.1em (1.3px) | フッター |
| Nav Sub (和文) | Noto Sans JP | 11px | 400 | 1.37 (15.2px) | 0.1em (1.11px) | 英字ナビの下の和文ラベル |
| Micro EN | Playfair Display | 10px | 400 | 1.0 | 0.18em (1.81px) | ロゴ脇の極小英字 |

**ウェイトは 400 と 700 の2段だけ**（明朝ラベルの 500 が例外）。500・600 は使わない。

### 3.5 行間・字間

- **本文の行間**: **2.0**（15px / 30px）。日本語本文としてもかなり広い部類で、余白の多いレイアウトと釣り合わせている
- **見出しの行間**: 1.12〜1.6。**サイズが大きいほど詰める**（36px→1.12、20px→1.6）
- **本文の字間**: **0.1em**。全階層で一律
- **Playfair Display の英字**: **0.08em**。和文より1段だけ狭い。極小サイズ（10px）だけ 0.18em まで開く

**ガイドライン**:
- 字間を 0 にしない。このサイトは 0.1em が既定で、詰めると別ブランドの見た目になる
- 逆に本文で 0.1em を超えて開かない。開くのは 10px 級の英字ラベルだけ

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

写真の上に白文字を重ねる場面が多いため、**見出しは意図した位置で `<br>` を入れて改行を固定**している。自動折り返しに任せていない。

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* 使用していない */
font-feature-settings: normal;
```

**`palt` は使っていない。** DOM 全走査 583 要素のうち `font-feature-settings` が `normal` 以外の要素は **1件のみ**（サードパーティのチャットウィジェット由来）。

字間は `palt` ではなく **`letter-spacing: 0.1em` のベタ組みで作られている**。詰め組みではなく開き組みのサイトなので、`palt` を足すと設計と逆方向に動く。

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**Primary（セクション CTA・矩形）**
- Background: `#005bac`
- Text: `#ffffff`
- Border: `1px solid #005bac`
- Padding: `11px 50px`（小）/ `17px 50px`（大）
- Border Radius: `0`
- Font Size: `15px` / Weight: `400`

**Primary Pill（ヘッダーの Online Shop）**
- Background: `#005bac`
- Text: `#ffffff`
- Border: `1px solid #005bac`
- Padding: `1px 17px 3px`
- Border Radius: **`36px`**
- Font Size: `15px` / Weight: `400`
- カートアイコンを左に添える

**Secondary（金茶）**
- Background: `#be9a60`
- Text: `#ffffff`
- Border: なし
- Padding: `14px 60px 16px`
- Border Radius: `0`

**Ghost（写真・濃色面の上）**
- Background: `transparent`
- Text: `#ffffff`
- Border: `1px solid #ffffff`
- Padding: `4px 6px 4px 8px`
- Border Radius: `0`
- Font: **Noto Serif JP / Weight 500**（明朝）

**Inverse（濃色面の上の白ボタン）**
- Background: `#ffffff`
- Text: `#005bac`
- Border: `1px solid #ffffff`
- Padding: `9px 50px`
- Border Radius: `0`

**Scroll to Top**
- Background: `#be9a60` / Text: `#ffffff`
- Border Radius: `50%`

> **`padding` が上下非対称**（`1px 17px 3px` / `14px 60px 16px`）。和文の字面が視覚的に上寄りになるのを、下パディングを 2px 厚くして補正している。左右のパディングは 50〜60px と極端に広い。

### Inputs

問い合わせフォームは **Bootstrap の `form-control` をそのまま使用**している（サイト本体のデザインシステムとは別系統）。

- Background: `#ffffff`
- Border: `1px solid #cccccc`
- Border Radius: `4px`
- Shadow: `inset 0 1px 1px rgba(0,0,0,0.075)`
- Font Size: `14px`
- Placeholder: `#555555`

> 新規実装では**本体側に合わせて `border-radius: 0` / `border: 1px solid #cccccc` / 影なし**に寄せるほうがサイトの意匠と揃う。

### Cards

- Background: `#ffffff`
- Border: なし（画像と余白だけで区切る）
- Border Radius: `0`
- Shadow: なし
- 見出しは 15px / 700 / `letter-spacing: 0.08em`

---

## 5. Layout Principles

### Spacing Scale

明示的なトークンは無い。実測から読み取れる値：

| Token | Value | 用途 |
|-------|-------|------|
| XS | 7px | インラインの隙間 |
| S | 10px | 小さなギャップ |
| M | 40px | カード間 |
| L | 50px | ボタンの左右パディング |
| XL | 60px | 金茶ボタンの左右パディング |

### Container

- Max Width: **1040px**（サイト全体の基準。実測 6要素）
- 全幅セクション: `1280px`
- 記事系の読み物幅: `800px`
- Padding (horizontal): 左右は `%` 指定（`6%` / `12.67%`）

### Grid

- ニュース: 3カラム / gutter 40px
- ナビの英字＋和文ペア: 縦積み（英字 22px の下に和文 11px）

---

## 6. Depth & Elevation

**ほぼフラット。影を使うのは可視要素で 3件だけ。**

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。カード・ボタン・ヘッダーすべて |
| 1 | `7px 7px 20px rgba(4,0,0,0.1)` | 一部のフローティング要素のみ |

**奥行きは影ではなく「白地 / 写真 / 濃色面」の3層で表現する。** カードに影を足さないこと。

---

## 7. Do's and Don'ts

### Do（推奨）

- **英字は Playfair Display（セリフ）で組む。** `About` `Lineup` `News` `Shop` などのナビ・見出しの英字はすべてこれ
- 英字ナビの下に **11px の和文ラベルを添える**（`About` / 企業案内）。この2段組みがナビの型
- `letter-spacing` は和文 **0.1em**、Playfair Display の英字 **0.08em** を守る
- 本文の `line-height` は **2.0**（15px / 30px）
- 面色は `#005bac` を主、`#be9a60` を従とし、**1画面に金茶は1箇所まで**
- ボタンの `padding` は下を 2px 厚くする（`11px 50px 13px` のように）
- `root` を 15px 前提で組む（`rem` を使うなら 1rem = 15px）

### Don't（禁止）

- **英字をゴシック（Noto Sans JP）で組まない。** Playfair Display を落とすとブランドの上品さが消える
- **`font-feature-settings: "palt"` を足さない。** このサイトは開き組みで、詰め組みは設計と逆
- `letter-spacing: normal` にしない。字間 0 は別ブランドの見た目になる
- 角丸を安易に足さない。radius は **`0` / `36px`（ピルのみ）/ `50%`（円のみ）の3つだけ**。`4px` や `8px` の中途半端な角丸は本体には存在しない
- カード・ボタンに影を付けない
- **`#0e6cc1`（チャットウィジェットの青）をブランド色として使わない**
- 商品特設ページの `Zen Maru Gothic` / `#021336` をコーポレート側に持ち込まない（8. 参照）
- 本文テキストに `#000000` を使わない（`#2d2622`）

---

## 8. 商品特設ページは別系統（重要）

`/shiroikoibito-cakes/` のような商品キャンペーンページは、**コーポレートサイトとは別のデザインシステム**で組まれている。ヘッダー／フッターだけが共通で、中身は総取り替えになる。

| | コーポレート | 商品特設（白い恋人ケーキ） |
|---|---|---|
| 和文 | Noto Sans JP（ゴシック） | **Zen Maru Gothic**（丸ゴシック） |
| 英字 | Playfair Display + 游明朝スタック | `"Playfair Display", serif`（和文フォールバック無し） |
| ページ背景 | `#ffffff` | **`#021336`（濃紺）** |
| 本文 | 15px / 2.0 / 0.1em | 14px / 2.0 / **`normal`** |
| 字間 | 一律 0.1em | **ほぼ `normal`、見出しは `-1.3px`（マイナス）** |
| CTA | 矩形 or ピル | `border-radius: 2px` の小さな角丸 |
| 面 | 白 | `rgba(255,255,255,0.1)` の半透明パネル |

**「ISHIYA のデザイン」として実装を頼まれたら、コーポレート側（本ドキュメント 1〜7章）を採用する。** 特設ページは商品ごとの一過性の意匠であり、ブランドの恒常的なシステムではない。

---

## 9. Responsive Behavior

### Breakpoints

メディアクエリの出現回数で見ると、**実質 960px の1本**でモバイル／デスクトップを切り替えている。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 600px | 細かい調整（12箇所） |
| Tablet / Mobile | ≤ **960px** | **主ブレークポイント（393箇所）**。ここでレイアウトが総入れ替わる |
| Desktop | ≥ 961px | `print, screen and (min-width: 961px)` として指定（103箇所） |
| Wide | ≥ 1041px | コンテナ 1040px を超えたときの調整 |

> **`print, screen and (min-width: 961px)` という書き方**を全体で使っている。印刷時にデスクトップレイアウトを当てる意図。

### タッチターゲット

- 最小サイズ: 44px × 44px
- ヘッダーのピル CTA は実測高さ 34px なので、**モバイルでは縦パディングを増やして 44px を確保する**

### フォントサイズの調整

- 本文は 15px を維持（モバイルでも縮めない）
- Playfair Display の見出しは 48px → 28px 前後まで縮める
- ナビの英字 22px + 和文 11px の2段組みは、モバイルではハンバーガー内の縦積みに変わる

---

## 10. Agent Prompt Guide

### クイックリファレンス

```
Primary Color:   #005bac   (ISHIYA Blue)
Secondary Color: #be9a60   (Gold)
Text Color:      #2d2622
Background:      #ffffff
Font (和文): "Noto Sans JP", YuGothic, "Yu Gothic Medium", "Yu Gothic", Meiryo, メイリオ, sans-serif
Font (英字): "Playfair Display", YuMincho, "Yu Mincho", Meiryo, メイリオ, serif
Root Size:       15px
Body Size:       15px
Line Height:     2.0
Letter Spacing:  0.1em (和文) / 0.08em (英字)
Radius:          0 / 36px (pill) / 50% (circle)
Shadow:          none
Container:       1040px
Breakpoint:      960px
```

### プロンプト例

```
石屋製菓（ISHIYA）のデザインシステムに従って、商品一覧セクションを作成してください。

- root の font-size は 15px。1rem = 15px として組む
- セクション見出しは英字を "Playfair Display" 36px / letter-spacing 0.08em で置き、
  その下に和文の小見出しを Noto Sans JP 11px / 0.1em で添える
- 本文は Noto Sans JP 15px / line-height 2.0 / letter-spacing 0.1em / color #2d2622
- カードは白背景・角丸なし・影なし。画像と余白だけで区切る
- 主 CTA は背景 #005bac / 文字 #ffffff / border-radius 0 / padding 11px 50px 13px
- ヘッダーの EC 導線だけ border-radius 36px のピルにする
- font-feature-settings は指定しない（palt は使わない）
- 金茶 #be9a60 は1画面に1箇所まで
```
