# DESIGN.md — 9h ナインアワーズ（nine hours）

> ナインアワーズ（https://ninehours.co.jp/）のデザイン仕様書。
> 「汗を洗い流す 1h ／ 眠る 7h ／ 身支度する 1h ＝ 9h」というコンセプトで 2009 年に開業したカプセルホテル。
> サインは廣村正彰、プロダクトデザインは柴田文江、ロゴタイプは廣村デザイン事務所。**Web も同じ設計思想で、白と黒とグレー 10 段だけで組まれている**。
> 最大の特徴は **`YakuHanJP`（約物半角）をフォントスタックの先頭に置いていること**。和文の約物（`、。「」（）`）だけを半角字形に差し替える専用 Web フォントで、**フォント指定 1 行で日本語の約物アキを詰める**手法。ホテル・美術館系の日本語サイトで最も効果が出る組版テクニックだが、実装しているサイトは多くない。
> もうひとつの見どころは **ボタンの `border` が塗りと同色の 2px で必ず入っていること**。塗りボタンと枠線ボタンが**まったく同じ寸法**になるので、状態や文脈で入れ替えてもレイアウトが 1px も動かない。
> 実サイトの computed style 実測（2026-07-31 取得。トップ＋店舗一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **無彩色だけで組み、色は「注意」にしか使わない。** 面は黒（`#000000`）・白（`#ffffff`）・グレー 10 段のみ。彩度を持つのは `--key`（赤 `#e93a28`）と `--yellow`（`#fdd22b`）の 2 色だけで、どちらも**セクションラベルと注意喚起にしか出てこない**。画面の色は全部、客室とアメニティの写真が持つ
- **9h について**: カプセルホテルなので、**「泊まる」ではなく「1h + 7h + 1h」という時間の分解**がブランドの核。サイトもその通りで、ヒーローは黒地に写真、その下は白地に情報が淡々と積まれる。**ホテルサイトにありがちな「情緒的なコピー ＋ 大きな明朝」を一切やらない**
- **密度**: 中程度。`max-width: 960px` の 1 カラムに、写真ブロックと表組みが交互に積まれる。文字は小さくないが、行間が広い（本文 1.98）ので圧迫感がない
- **キーワード**: 無彩色、YakuHanJP（約物半角）、Noto Sans JP 700、9 段の等間隔グレー、radius 8px、影ゼロ
- **特徴**:
  - **`YakuHanJP` がフォントスタックの先頭**。`YakuHanJP, "Noto Sans JP", sans-serif` の 1 行で、約物だけ半角・それ以外は Noto Sans JP という混植が成立する（YakuHanJP は約物のグリフしか持たないため、残りは自動的に次のフォントへ落ちる）。**`font-feature-settings: "palt"` は使っていない**。palt が「全字の詰め」なのに対し、YakuHanJP は「約物だけの詰め」——**効かせる範囲が違う**
  - **本文の `font-weight` が 700**。`body` からして 700 で、Noto Sans JP の Bold が地の文になる。ゴシック体の太い字面を、広い行間（1.98）と字間（0.06em）で緩めるという組み方。**400 が出てくるのは CSS 変数 `--fontWeight` の定義だけで、実際の描画にはほぼ登場しない**
  - **ボタンは必ず `border: 2px solid` を塗りと同色で持つ**。黒ボタンは `background: #000000` ＋ `border: 2px solid #000000`、白ボタンは `#ffffff` ＋ `2px solid #ffffff`。**枠線ボタン（塗り透明 ＋ 黒 2px）と外形が完全に一致する**ので、同じ場所で入れ替えてもガタつかない
  - **影が 1 つも存在しない**。トップ・店舗一覧の全要素で `box-shadow: none`。奥行きは黒地／白地の面の切り替えだけで作る
  - **`--key`（赤 `#e93a28`）はセクション見出しの文字色**であって、ボタンの色ではない。CTA は黒。**「ブランドカラー＝ CTA の色」と短絡しない**
  - グレーは `--gray1` 〜 `--gray9` が **25 → 220 の完全な等間隔 9 段**（1 段あたり 24.375）。`--gray10` だけがこの数列から外れた 233 で、**入力欄の面色専用**に足されている
  - **2 つの組版系が同居している**。サイト本体は「700 ／ 字間 0.06em ／ 行間 1.98」、予約ウィジェットは「600 ／ 字間 normal ／ 行間 1.5」。**新規に作るなら本体側（700 / 0.06em / 1.98）に寄せる**

---

## 2. Color Palette & Roles

> CSS Custom Properties は `:root` に 20 個。色は **`--main` / `--body` / `--link` / `--white` / `--key` / `--yellow` ＋ グレー 10 段**だけ。

### Brand（ブランド）

- **Main** (`#000000`, `--main`): **面積で見た実質のブランド色**。ヒーローの地、CTA の塗り、本文の色すべて
- **Body** (`#000000`, `--body`): 本文の文字色。`--main` と同値
- **Link** (`#000000`, `--link`): リンクの文字色。**リンクを色で区別しない**（下線と位置で示す）
- **White** (`#ffffff`, `--white`): コンテンツページの地、反転 CTA の塗り

> **注**: `--main` / `--body` / `--link` が**全部 `#000000` の別名**になっている。役割ごとにトークンを分けたうえで、いまは同じ値を入れてある状態。実装でもこの 3 つは分けて参照する（あとでリンクだけ色を持たせられる）。

### Accent（差し色。2 色だけ）

| Token | Value | 用途 |
|-------|-------|------|
| `--key` | `#e93a28` | **セクション見出しの文字色**（18px / 700）。赤。塗りには使わない |
| `--yellow` | `#fdd22b` | 注意喚起・キャンペーンの下地 |

- **どちらも「面」ではなく「文字と小さな下地」でしか使わない**。ボタンやカードを赤で塗らない

### Gray Scale（9 段の等間隔 ＋ 1）

| Token | Value | RGB 値 | 用途 |
|-------|-------|--------|------|
| `--gray1` | `#191919` | 25 | 反転面の中の面 |
| `--gray2` | `#313131` | 49 | |
| `--gray3` | `#4a4a4a` | 74 | 補助テキスト（濃） |
| `--gray4` | `#626262` | 98 | |
| `--gray5` | `#7a7a7a` | 122 | 補助テキスト |
| `--gray6` | `#939393` | 147 | |
| `--gray7` | `#ababab` | 171 | **プレースホルダ・無効状態** |
| `--gray8` | `#c4c4c4` | 196 | 罫 |
| `--gray9` | `#dcdcdc` | 220 | 薄い罫・区切り |
| `--gray10` | `#e9e9e9` | 233 | **入力欄の面（数列から外れた特例）** |

- **`--gray1` 〜 `--gray9` は 25 + 24.375 × (n−1) の等間隔**。9 段が数学的にきれいに並ぶ（25 / 49 / 74 / 98 / 122 / 147 / 171 / 196 / 220）
- **`--gray10` = 233 だけがこの数列に乗らない**。220 の次は 244 のはずなので、**入力欄の面色として意図的に足された 1 段**。検索フォームの背景がこれ
- グレーは**文字と罫にしか使わない**。カードの面はグレーではなく白のまま

### Semantic（意味的な色）

**専用のセマンティック色トークンは存在しない。**

| Role | 実サイトでの表現 |
|------|-----------------|
| 注意 / 強調 | `--key` `#e93a28` の文字 |
| キャンペーン | `--yellow` `#fdd22b` の下地 |
| 無効 | `--gray7` `#ababab` の文字 |
| （エラー・成功） | 定義なし。**必要なら `--key` を流用し、緑を新規に足さない** |

### Overlay

- **Scrim on photo** (`rgba(255, 255, 255, 0.3)`): 写真の上に置くゴーストボタンの下地。**写真の上では白を透かす**（黒を敷かない）

---

## 3. Typography Rules

### 3.1 和文フォント

- **約物**: **YakuHanJP**（約物半角）。`、。，．：；！？「」『』（）〔〕［］｛｝〈〉《》` の**約物グリフだけ**を持つ Web フォント。スタックの先頭に置くことで、約物が半角字形に、それ以外は次のフォントに落ちる
- **ゴシック体**: **Noto Sans JP**。約物以外のすべて（かな・漢字・欧文）
- **明朝体**: 使用しない

> **YakuHanJP とは**: 日本語の約物は全角ボックスの中で描かれるため、`」。` のように連続すると 1 文字分以上のアキができる。YakuHanJP は約物だけを半角幅のグリフに差し替える Web フォントで、**`font-feature-settings: "palt"` と違って「約物だけ」を対象にする**。palt は欧文・数字を含む全字を詰めるので数字の並びが崩れることがあるが、YakuHanJP にはその副作用がない。CDN（jsDelivr 等）または npm の `yakuhanjp` から読み込む。

### 3.2 欧文フォント

- **サンセリフ**: **Noto Sans JP** の内蔵欧文グリフをそのまま使う。**欧文専用フォントを併用しない**
- **等幅**: 定義なし

### 3.3 font-family 指定

```css
/* 全域（--fontFamily） */
font-family: YakuHanJP, "Noto Sans JP", sans-serif;
```

**フォールバックの考え方**:
- **約物 → 和文 → generic の 3 段だけ**。游ゴシック・ヒラギノへのフォールバックは持たない（Noto Sans JP を Web フォントとして必ず読み込む前提）
- **YakuHanJP を必ず先頭に置く**。2 番目以降に置くと約物が Noto Sans JP の全角字形で描かれてしまい、効果が消える
- **欧文は Noto Sans JP に任せる**。Helvetica 系を先頭に置くと約物より欧文の優先度が上がり、YakuHanJP の意図と競合する

```css
/* YakuHanJP の読み込み例（約物のみのサブセット） */
@import url("https://cdn.jsdelivr.net/npm/yakuhanjp@4.1.1/dist/css/yakuhanjp.min.css");
```

### 3.4 文字サイズ・ウェイト階層

**`letter-spacing` は px 直書きで、見出し 0.08em ／ 本文 0.06em の 2 系統**（下の「実測 em 換算」列を参照）。

| Role | Size | Weight | Line Height | Letter Spacing | 実測 em 換算 | 用途 |
|------|------|--------|-------------|----------------|-------------|------|
| Hero (h2) | 34px | 700 | 54.4px (**1.6**) | 2.72px | **0.08em** | ヒーロー見出し |
| Display (h2) | 30px | 700 | 48px (**1.6**) | 2.4px | **0.08em** | セクション大見出し |
| Heading (h2 / h3) | 26px | 700 | 36.4px (**1.4**) | 2.08px | **0.08em** | 反転面の見出し（白文字） |
| **Section Label (h2)** | 18px | 700 | 32.4px (1.8) | 0.96px | 0.053em | **`--key` `#e93a28` の赤。セクションの札** |
| Lead (p) | 18px | 700 | 34.2px (**1.9**) | 0.96px | 0.053em | リード文 |
| **Body (p)** | **16px** | **700** | **31.68px (1.98)** | **0.96px** | **0.06em** | **本文。`body` の既定値** |
| Nav (a) | 16px | 700 | 24px (1.5) | 0.96px | 0.06em | グローバルナビ |
| Body Small (p) | 14px | 700 | 23.8px (1.7) | 0.96px | 0.069em | 補助本文 |
| Body Small（反転） | 14px | 700 | 28px (**2.0**) | 0.96px | 0.069em | 黒地の上の本文 |
| Caption | 11px | 700 | 22px (**2.0**) | 0.96px | **0.087em** | 注記 |
| Tag | 11px | 700 | 19.8px (1.8) | 0.96px | 0.087em | 枠線タグ（radius 0） |
| Widget Body | 16px | **600** | 24px (1.5) | **normal** | — | **予約ウィジェット系** |
| Widget Small | 14px | **600** | 21px (1.5) | **normal** | — | 予約ウィジェット系 |
| Widget Caption | 12px | **600** | 18px (1.5) | **normal** | — | 予約ウィジェット系 |

- **`letter-spacing` は 0.96px が既定として継承される**。16px の本文では 0.06em だが、**継承されたまま 11px まで落ちると 0.087em に膨らむ**。小さい文字ほど相対的に字間が広がるので、キャプションが「ゆったり見える」のはこの副作用
- **見出しだけは px を上書きして 0.08em に揃えている**（34px→2.72 / 30px→2.4 / 26px→2.08）。**見出しは em 一定、本文以下は px 一定**という二重構造
- **ウェイトは 700 と 600 の 2 段のみ**。400 は `--fontWeight` に定義されているが実描画にはほぼ出ない。**和文の地の文が 700** というのがこのサイトの最大の癖

### 3.5 行間・字間

- **本文の行間**: **1.98**（16px → 31.68px）。日本語サイトの中でも広い部類
- **反転面・キャプションの行間**: **2.0**（14px → 28px、11px → 22px）
- **見出しの行間**: **1.4 〜 1.6**（26px → 1.4 / 30px・34px → 1.6）
- **本文の字間**: **0.06em**（0.96px）
- **見出しの字間**: **0.08em**

**ガイドライン**:
- **行間は「見出し 1.4–1.6／本文 1.9–2.0」の 2 極に振る**。中間の 1.7 前後をあまり使わない
- 本文が 700 と太いぶん、**行間と字間で緩める**という設計。ウェイトだけ 400 に落とすと字間・行間が過剰に見えるので、**3 つはセットで変える**

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- **約物のアキは YakuHanJP が処理する**ので、`font-feature-settings` での追い込みは不要
- 見出しは手で改行位置を決めている（「1h + 7h + 1h」のような要素を行またぎさせない）

### 3.7 OpenType 機能

```css
/* このサイトは font-feature-settings を使わない */
font-feature-settings: normal;   /* 全域 */
```

- **`palt` は使っていない**。約物の詰めは **YakuHanJP（フォント差し替え）で解決**している
- **palt と YakuHanJP を併用しない**。両方効かせると約物が二重に詰まって食い込む
- `kern` も明示していない

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

**すべてのボタンが `border-radius: 8px` と `border: 2px solid` を持つ。** 塗りボタンの border は**塗りと同色**。これにより塗り／枠線を入れ替えても外形が変わらない。

**Primary（黒・大）**
- Background: `#000000`
- Text: `#ffffff`
- Border: `2px solid #000000`
- Border Radius: `8px`
- Padding: `13px 20px`
- Font: `16px` / `700`

**Primary（黒・小）**
- Background: `#060606`
- Text: `#f9f9f9`
- Border: `2px solid #060606`
- Border Radius: `8px`
- Padding: `5px 10px`
- Font: `14px` / `600`

> **注**: 小サイズだけ `#060606` / `#f9f9f9` という**純黒・純白から 6 だけずらした値**を使う。小さい面積で純黒が沈みすぎるのを避けるための微調整と見られる。**大サイズは `#000000` / `#ffffff`**。

**Secondary（枠線）**
- Background: `transparent`
- Text: `#060606`
- Border: `2px solid #060606`
- Border Radius: `8px`
- Padding: `5px 10px`（小）／ `13px 20px`（大）
- Font: `14px` / `600`（小）／ `16px` / `700`（大）

**Inverse（黒地の上の白ボタン）**
- Background: `#ffffff`
- Text: `#000000`
- Border: `2px solid #ffffff`
- Border Radius: `8px`
- Padding: `13px 20px`
- Font: `16px` / `600`

**Ghost（写真の上）**
- Background: `rgba(255, 255, 255, 0.3)`
- Text: `#ffffff`
- Border: なし
- Border Radius: `8px`
- Padding: `13px 20px`
- Font: `12px` / `600`

### Tags / Labels

- Background: `transparent`
- Text: `#000000`
- Border: `2px solid #000000`
- **Border Radius: `0px`** ← ボタンと違い**角丸を持たない**
- Padding: `0.5px 5px`
- Font: `11px` / `700` / `letter-spacing: 0.96px`

> **タグだけ radius 0**。「押せるもの＝ 8px の角丸」「状態を示す札＝直角」という**形の役割分担**になっている。

### Inputs

**検索フォーム（グレー地・角丸なし）**
- Background: `#e9e9e9`（`--gray10`）
- Border: なし
- Border Radius: `0px`
- Padding: `5px 27px`
- Font: `14px` / `600`

**予約フォーム（白地・角丸 8px）**
- Background: `#ffffff`
- Border Radius: `8px`
- Padding: `4px 20px`
- Font: `16px` / `600`（iOS の自動ズーム回避）

**Select**
- Background: `#ffffff`
- Border Radius: `8px`
- Padding: `9px 35px 9px 13px`（右の 35px は矢印アイコン分）
- Font: `16px` / `600`

**Label / Placeholder**
- Label: `16px` / `700` / `#000000`
- Placeholder: `16px` / `700` / `#ababab`（`--gray7`）

### Cards

- Background: `#ffffff`
- Border: なし、または `1px solid #dcdcdc`（`--gray9`）
- Border Radius: `8px`
- **Shadow: なし**（下記 Elevation 参照）

---

## 5. Layout Principles

### Container

- **Max Width: `960px`** — サイト全体の基準幅。CSS 中 143 箇所で `max-width: 960px` が指定される
- サブ幅: `823px`（読み物）／ `1200px`（ワイドな写真ブロック）／ `1037px`（ヘッダー）
- Padding (horizontal): デスクトップ `0`（960px のまま）／ モバイルは `16px`〜`20px`

### Spacing

`--dimension-*` のような寸法トークンは**存在しない**。実測値から読み取れる刻みは次のとおり。

| Value | 用途 |
|-------|------|
| `5px` / `10px` | 小ボタンの padding |
| `13px` / `20px` | 大ボタンの padding |
| `27px` | 検索欄の左右 padding（アイコン分） |
| `35px` | select の右 padding（矢印分） |

- **4px グリッドではない**。`5 / 10 / 13 / 20` という**5 と 10 を基準にした刻み**

### Grid

- 1 カラム（960px）が基本。店舗一覧・アメニティは 2〜3 カラム
- 写真ブロックだけ 960px を超えて `1200px` まで広がる

---

## 6. Depth & Elevation

**影は 1 つも使われていない。** トップ・店舗一覧の全要素で `box-shadow: none`。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **すべて。カード・ボタン・ヘッダーを含む** |

- **奥行きは「黒地 ↔ 白地」の面の切り替えだけで作る**。ヒーローと反転セクションが `#000000`、それ以外が `#ffffff`
- カードを浮かせたい場合も、影ではなく `1px solid #dcdcdc`（`--gray9`）の罫で分ける

### Motion

| Property | Value |
|----------|-------|
| Duration（既定） | `0.4s` |
| Duration（ヒーローのフェード） | `2s` |
| Easing | `cubic-bezier(.33, 1, .68, 1)`（easeOutCubic） |
| 対象プロパティ | `opacity` / `transform` / `color` / `background-color` |

- **ほぼ全部が `0.4s`**。速度差でヒエラルキーを作らない
- ヒーローの写真だけ `2s` でゆっくり出す

---

## 7. Do's and Don'ts

### Do（推奨）

- **`YakuHanJP` を font-family の先頭に置く**（`YakuHanJP, "Noto Sans JP", sans-serif`）
- **和文の地の文を `font-weight: 700` にする**。そのうえで行間 1.98・字間 0.06em で緩める（3 点セット）
- **ボタンには塗りと同色の `border: 2px solid` を必ず入れる**（塗り／枠線を入れ替えても寸法が変わらない）
- 角丸は **8px（押せるもの）／ 0px（札・検索欄）** の 2 択に寄せる
- グレーは `--gray1` 〜 `--gray10` から選ぶ。中間値を新規に作らない
- **リンクを色で区別しない**（`--link` は `#000000`）。下線と配置で示す
- 見出しの字間は `0.08em`、本文以下は `0.96px` 固定
- トランジションは `0.4s` / `cubic-bezier(.33, 1, .68, 1)` に統一する

### Don't（禁止）

- **`font-feature-settings: "palt"` を併用しない**。YakuHanJP と二重にかかって約物が食い込む
- **`--key` `#e93a28` でボタンを塗らない**。赤はセクション見出しの文字色。CTA は黒
- **影を付けない**（`box-shadow` は 1 箇所も使われていない）。階層は黒地／白地で作る
- 本文の `line-height` を 1.5 に下げない（700 の地の文が詰まって読めなくなる）
- タグ・ラベルに角丸を付けない（radius 0 が「押せない札」の目印）
- グレーをカードの面色に使わない（面は白のまま、罫で分ける）
- 予約ウィジェット側の組版（600 / 字間 normal / 行間 1.5）を**新規ページの基準にしない**
- 欧文専用フォント（Helvetica 等）をスタックの先頭に足さない

---

## 8. Responsive Behavior

### Breakpoints

**デスクトップファースト（`max-width`）**。`max-width: 960px` が実質唯一の分岐点で、CSS の 143 箇所で使われる。

| Name | Query | 説明 |
|------|-------|------|
| Mobile / Tablet | `max-width: 960px` | **主分岐。ここで 1 カラムに落ちる** |
| Desktop | `min-width: 961px` | 既定のレイアウト |
| Desktop（狭） | `max-width: 1200px) and (min-width: 961px` | 960px 固定幅を保ったまま余白だけ詰める帯 |
| Header | `max-width: 1037px` | ヘッダーのナビだけ先に畳む |
| 横向き低背 | `max-height: 300px`, `max-width: 800px) and (orientation: landscape` | 横向きスマホでヒーローを縮める |

- **`961px` という半端な値**は `960px` の 1px 上。**`max-width: 960px` と `min-width: 961px` で穴なく分ける**書き方
- **ヘッダーだけ 1037px で先に畳む**。コンテンツ（960px）より先にナビが窮屈になるため

### タッチターゲット

- 大ボタン: `24px（行）+ 13px × 2 + 2px × 2（border）= 54px` → **44px 基準を満たす**
- 小ボタン: `21px + 5px × 2 + 2px × 2 = 35px` → **基準未満。主要 CTA には小サイズを使わない**

### フォントサイズの調整

- 本文 `16px` はブレークポイントで変えない
- ヒーロー見出しは `34px` → モバイルで `26px` 前後へ。**字間は `0.08em` のまま維持する**（px 直書きなので、サイズを変えたら px も再計算する）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Main / Body / Link:  #000000（--main / --body / --link。3 つとも同値）
Background:          #ffffff（コンテンツ） / #000000（ヒーロー・反転）
Key (accent):        #e93a28（--key。セクション見出しの文字色。塗りに使わない）
Yellow:              #fdd22b（--yellow。注意喚起）
Gray:                #191919 #313131 #4a4a4a #626262 #7a7a7a
                     #939393 #ababab #c4c4c4 #dcdcdc #e9e9e9（--gray1〜10）
Input Surface:       #e9e9e9（--gray10）
Placeholder:         #ababab（--gray7）
Font:                YakuHanJP, "Noto Sans JP", sans-serif
Body Size:           16px / weight 700
Line Height:         1.98（本文） / 1.4〜1.6（見出し） / 2.0（反転・注記）
Letter Spacing:      0.96px（本文以下・固定） / 0.08em（見出し）
Font Feature:        なし（palt は使わない。約物は YakuHanJP が処理）
Radius:              8px（ボタン・入力欄・カード） / 0px（タグ・検索欄）
Border:              2px solid（ボタンは塗りと同色で必ず入れる）
Shadow:              none（1 箇所も使わない）
Container:           960px
Breakpoint:          max-width 960px（主分岐）
Motion:              .4s cubic-bezier(.33, 1, .68, 1)
```

### プロンプト例

```
9h ナインアワーズのデザインシステムに従って、客室タイプの比較セクションを作成してください。
- font-family: YakuHanJP, "Noto Sans JP", sans-serif（YakuHanJP を必ず先頭に）
- font-feature-settings は使わない（palt を併用しない）
- コンテナ: max-width 960px
- セクション見出し: 18px / 700 / line-height 32.4px / color #e93a28
- 大見出し: 30px / 700 / line-height 48px / letter-spacing 2.4px（0.08em）
- 本文: 16px / 700 / line-height 31.68px / letter-spacing 0.96px
- カード: 背景 #ffffff / radius 8px / 影なし / 罫は 1px solid #dcdcdc
- CTA: 背景 #000000 / 文字 #ffffff / border 2px solid #000000 / radius 8px /
       padding 13px 20px / 16px / 700
- 副 CTA: 背景 transparent / 文字 #060606 / border 2px solid #060606（外形は CTA と同一）
- 「満室」等のタグ: 背景 transparent / border 2px solid #000000 / radius 0 / 11px / 700
- 影は一切使わない。階層は白地と黒地の切り替えで作る
- ブレークポイントは max-width: 960px の 1 本
```
