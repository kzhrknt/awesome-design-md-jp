# DESIGN.md — Preferred Networks（PFN）

> 株式会社 Preferred Networks（https://www.preferred.jp/ja/）のデザイン仕様書。
> 2014 年創業。深層学習の研究開発から**自社設計の AI プロセッサ（MN-Core）まで、AI 技術のバリューチェーンを垂直統合**する日本の AI 企業。
> 最大の特徴は **`letter-spacing` と `line-height` が「36px を境に切り替わる」1 本の規則で全ページを通している**こと。**36px 以上は `0.03em` / `1.3`、30px 以下は `0.05em` / `1.5`**。例外がほとんど無い。
> 色は **`#1a4aff`（電圧の高い青）1 色**。**面色は塗らず、`background-image` のグラデーションで塗る**ため、`background-color` を読むだけでは色が一切見えない。
> ヒーローの大見出しは **`background-clip: text` によるグラデーション文字**（濃紺 → 青）。**`color` は `rgba(0,0,0,0)` を返す**。
> **`font-weight` は 400 がほぼすべて**。72px の見出しも Regular で、太らせずにサイズだけで階層を作る。
> **`font-feature-settings: "palt"` が全要素に継承される**。
> 実サイトの computed style 実測（2026-08-15 取得。日本語トップ ＋ ニュース一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地に、Regular の大きな和文と 1 色の青**。装飾を持たず、**タイポグラフィのサイズ差と青のグラデーションだけ**で構成する。研究開発企業らしい理知的な静けさ
- **PFN について**: 「現実世界を計算可能にし、共に未来を創り出す」がミッション。**半導体からアプリケーションまでの垂直統合**という事業構造を、サイトでは**「白地の説明 → 濃紺のグラデーションカード」という 2 層の切り替え**で表現している
- **密度**: 中程度。**ヒーローは 72px の見出し 1 つだけ**で、以降は白地セクションと濃紺カードが交互に現れる
- **キーワード**: `#1a4aff`、グラデーション文字、radius 6px / 16px、weight 400 一択、`palt`、Noto Sans JP
- **特徴**:
  - **`letter-spacing` と `line-height` が 36px を境に切り替わる**。**≥36px → `0.03em` / `1.3`、≤30px → `0.05em` / `1.5`**、**14px だけ `0.05em` / `1.3`**。この 1 本の規則が全ページを貫く
  - **`font-weight` は 400 が原則**。**500 が現れるのはドロワーの見出しリンク（20px）だけ**。72px の h1 も 48px の h2 も Regular
  - **面を `background-color` で塗らない**。CTA も濃紺カードも **`background-image: linear-gradient(...)`** で塗る。ソリッドな青も **「全ストップが同色のグラデーション」**（`linear-gradient(160deg, #1a4aff, #1a4aff)`）として書かれている
  - **ヒーローの大見出しは `background-clip: text` のグラデーション文字**。`linear-gradient(160deg, #010947, #0043af 51%, #0046ff 99%)` を文字で切り抜く。**`color` は `rgba(0,0,0,0)`**
  - **radius は 2 段だけ**: **ボタン `6px`（`rounded-md`）／ カード `16px`（`rounded-2xl`）**。ニュースの告知バーだけ `80px` のピル
  - **`box-shadow` を 1 つも使わない**。奥行きは**濃紺グラデーションのカード**が担う
  - **`font-feature-settings: "palt"`** が `body` から全要素に継承される
  - 実装は **Tailwind CSS ＋ Mantine**。**`--mantine-*` の CSS 変数は 250 個あるが、すべてライブラリの既定値でブランド設計とは無関係**

---

## 2. Color Palette & Roles

> 実測値。地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (12/12)`。**html / body ともに塗り指定が無く、`background-color` からは判定できない**）。
> **重要**: このサイトは**面色を `background-image` で塗る**。`background-color` だけを見ると **CTA も濃紺カードも「透明」**に見える。**必ず `background-image` を読むこと**。

### Brand（ブランド）

- **PFN Blue** (`#1a4aff`, rgb 26,74,255): **唯一の主色**。CTA の面、リンク文字、告知バーの枠、アウトラインボタンの文字。**`uniqueBackgrounds` で最頻（16 回）**
  - 面として塗られるときは **`linear-gradient(160deg, #1a4aff 0px, #1a4aff ...)`**（全ストップ同色）
- **Deep Navy** (`#0d318f`, rgb 13,49,143): Cookie バーの面とボタン。**青の暗い側**

### Gradients（このサイトの面色の実体）

- **Heading Gradient**: **`linear-gradient(160deg, #010947, #0043af 51.03%, #0046ff 99.04%)`**
  - **`background-clip: text` で大見出しに掛ける**。左上の濃紺から右下の鮮青へ。**文字色ではなくグラデーションで見出しを塗る**
- **Card Gradient（濃紺）**: **`linear-gradient(160deg, #01053f 20%, #001b6d 40%, #022d73 60%, #00237e 70%, #000a58 90%)`**
  - **5 ストップ**。ステートメントカード・事業紹介カードの面。**両端が最も暗く、中央が明るい**（斜めに光が差す）
- **Card Gradient（放射）**: **`radial-gradient(circle at 76% 84%, #002fd7 0px, #000e7e 100%)`**
  - 採用セクションのカード。**右下に光源を置く**
- **Solid-as-Gradient**: **`linear-gradient(160deg, #1a4aff, #1a4aff)`** — CTA の面。**ソリッドもグラデーションとして書く**（appearance をトークンで切り替えるための実装）

### Neutral（ニュートラル）

- **Background** (`#ffffff`): ページ地色。**純白**
- **Surface Tint** (`#f3f7ff`, rgb 243,247,255): 告知バーの面。**青の最も薄い版**
- **Surface Gray** (`#f7f7f8`, rgb 247,247,248): 事業紹介セクションの面。**ほぼ無彩色**
- **Ink** (`#000000`): 本文・ナビの文字。**純黒を使う**
- **Ink Inverse** (`#ffffff`): 濃紺カードの上の文字
- **Ink Inverse Muted** (`rgba(255,255,255,0.9)` / `rgba(255,255,255,0.7)`): 濃紺カード上の補足・日付。**白を透過で弱める**（別の色を足さない）
- **Border** (`rgba(0,0,0,0.2)`): CTA の枠。実測は `oklab(0 0 0 / 0.2)` で出る
- **Divider** (`#90a1b9`, rgb 144,161,185): 罫線

### Semantic（意味的な色）

意味色は**サイト内に現れない**。実装で必要になった場合は以下を目安にする。

- **Danger／Error**: `#d62828` 目安。**`#1a4aff` と明度を揃える**
- **Warning**: 新色を足さず、**`#0d318f`（既存の Deep Navy）＋ 枠**で表す
- **Success**: `#1a4aff`（既存の PFN Blue）を流用する
- **非活性**: 面 `#f7f7f8` ／ 文字 `rgba(0,0,0,0.4)`

---

## 3. Typography Rules

> **「36px を境に `letter-spacing` と `line-height` が切り替わる」1 本の規則**がこのサイトの核。書体は Noto Sans JP 単独、ウェイトは 400 一択。

### 3.1 和文フォント

- **全要素共通**: **`"Noto Sans JP", "Noto Sans JP Fallback"`**
  - **`"Noto Sans JP Fallback"` は Next.js の `next/font` が自動生成するローカル調整フォント**。実在の書体ではなく、**Web フォント読み込み前後で文字幅がずれない（CLS を防ぐ）ためのメトリクス合わせ**。`size-adjust` / `ascent-override` を持つ
  - 一部の要素（ニュース見出しなど）は **`"Noto Sans JP", sans-serif`** とだけ書かれている
- **OS 標準書体（游ゴシック・ヒラギノ・メイリオ）をフォールバックに並べない**。**Noto Sans JP 単独**の構成
- **ウェイト**: **400 が原則**。**500 はドロワーの見出しリンク（20px）だけ**。**700 は 1 箇所も現れない**
  - **72px の h1 も 48px の h2 も 400**。**太さで階層を作らず、サイズと色（グラデーション）で作る**

### 3.2 欧文フォント

- **欧文専用の書体を持たない**。`Preferred Networks` `PFN` `MN-Core` `AI` はすべて **Noto Sans JP の字形**で出る
- ロゴのみ SVG
- 等幅フォントは使わない（`--mantine-font-family-monospace` は宣言されているが未使用）
- **preview.html での注記**: **Noto Sans JP は Google Fonts で取得できるため、実サイトと同じ書体でプレビューできる**。`"Noto Sans JP Fallback"` は Next.js の内部生成なので**そのまま書かず、`sans-serif` に置き換えてよい**

### 3.3 font-family 指定

```css
/* 全要素共通 */
font-family: "Noto Sans JP", sans-serif;
/* 実サイトは "Noto Sans JP", "Noto Sans JP Fallback"。
   Fallback は next/font のメトリクス合わせで、自前実装では不要 */

/* body の既定 */
font-size: 16px;
font-weight: 400;
line-height: 1.6;                /* 25.6px。ただし各要素は 1.5 / 1.3 で上書きする */
letter-spacing: normal;          /* body は開かない。要素ごとに当てる */
color: #000000;
font-feature-settings: "palt";   /* ← 全要素に継承される */
```

**フォールバックの考え方**:
- **Noto Sans JP 単独**。OS 標準書体を並べない
- **`body` の `letter-spacing` は `normal`**。字間は**サイズ帯ごとに個別に当てる**（後述の規則）
- **`body` の `line-height: 1.6` は継承の初期値**で、実際のテキストはすべて 1.5 か 1.3 に上書きされる

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Letter Spacing | Color | 備考 |
|------|------|--------|-------------|----------------|-------|------|
| Hero (h1) | **72px** | **400** | **1.3** (93.6px) | **0.03em** (2.16px) | **グラデーション** | `background-clip: text`。`color` は透明 |
| Statement (h2) | **48px** | **400** | **1.3** (62.4px) | **0.03em** (1.44px) | `#ffffff` / グラデーション | 濃紺カード上 ／ 白地上 |
| Section Head (h2) | **36px** | **400** | **1.3** (46.8px) | **0.03em** (1.08px) | `#ffffff` | 「注目ニュース」 |
| Lead (h2) | 30px | 400 | **1.5** (45px) | **0.05em** (1.5px) | `#ffffff` / グラデーション | 「最先端の技術を最適な形で実装」 |
| Card Head (h3) | 24px | 400 | 1.5 (36px) | 0.05em (1.2px) | `#000000` | 「世界最高水準の AI 技術を擁する…」 |
| Industry (h3) | 22px | 400 | 1.5 (33px) | 0.05em (1.1px) | `#000000` | 「製造業」 |
| Nav (drawer) | 20px | **500** | 1.5 (30px) | 0.05em (1px) | `#000000` | 「企業情報」。**500 が出る唯一の箇所** |
| Body (L) | 18px | 400 | 1.5 (27px) | 0.05em (0.9px) | `#000000` / `#ffffff` | 本文（大） |
| Body | 16px | 400 | 1.5 (24px) | 0.05em (0.8px) | `#000000` / `#ffffff` | 本文の基準 |
| Button | 16px | 400 | 1.5 | **normal** | `#ffffff` / `#1a4aff` | **ボタンだけ字間を開かない** |
| Nav | 14px | 400 | **1.3** (18.2px) | 0.05em (0.7px) | `#000000` | グローバルナビ |
| Meta / Date | 14px | 400 | **1.3** (18.2px) | 0.05em (0.7px) | `rgba(255,255,255,0.7)` | 「2026.07.16」 |
| Small | 12px | 400 | 1.5 (18px) | 0.05em (0.6px) | `#000000` | 「ENGLISH」 |

- **`font-weight` は 400 が原則**。**500 はドロワーの 20px リンクだけ、700 はゼロ**
- **`letter-spacing` は 2 値だけ**: **≥36px → `0.03em`**、**≤30px → `0.05em`**。**ボタンだけ `normal`**
- **`line-height` は 2 値だけ**: **≥36px → `1.3`**、**16〜30px → `1.5`**、**14px → `1.3`**
  - **14px が 1.3 なのは「行が短い UI テキスト（ナビ・日付）だから」**。本文サイズ帯（16〜30px）だけが 1.5

### 3.5 行間・字間

**このサイトの字送りは 1 本の規則で説明できる。**

| サイズ帯 | letter-spacing | line-height | 性格 |
|---------|---------------|-------------|------|
| **≥ 36px** | **0.03em** | **1.3** | 見出し。**字間を締め、行を詰めて塊にする** |
| **16〜30px** | **0.05em** | **1.5** | 本文・小見出し。**字間を開き、行を空けて読ませる** |
| **14px 以下** | 0.05em | **1.3** | UI テキスト。字間は本文と同じ、行だけ詰める |
| **ボタン** | **normal** | 1.5 | **唯一の例外**。ピル／矩形の中で横に伸びないよう字間を切る |

- **大見出しほど字間が狭い**（0.03em）のは、**72px という大きさで 0.05em を当てると単語が散る**ため。**サイズが上がるほど締める**という原則
- **`body` に `letter-spacing` を置かない**。サイズ帯ごとに当てる
- **1.3 と 1.5 の 2 値しかない**。1.6 や 1.75 は使わない

**ガイドライン**:
- **新しい文字サイズを足すときは、36px の境界のどちら側かを先に決める**。そこで `letter-spacing` と `line-height` が自動的に決まる
- **ボタンの `letter-spacing: normal` を守る**。ボタンだけは規則の外に置く
- **`line-height` に 1.4 や 1.6 を持ち込まない**。1.3 と 1.5 の 2 値で通す
- **weight を上げて強調しない**。強調は**サイズ・色（グラデーション）・面（濃紺カード）**で作る

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- **`palt` が効いているため約物は詰まっている**。追加のマージンを入れない
- **ミッションステートメントは意図した位置で改行させる**（`現実世界を計算可能にし、` / `共に未来を創り出す`）。**読点の直後で折る**。`<br>` か `max-width` で制御し、自動折り返しに任せない
- **`background-clip: text` の見出しは、改行位置でグラデーションが分断されない**（要素全体に 1 枚のグラデーションが掛かる）。**行ごとに要素を分けないこと**（分けるとグラデーションが行ごとにリセットされる）
- 製品名・略語（`MN-Core`、`PFN`、`Preferred Networks (PFN)`）は**ハイフン・括弧の途中で折らない**（`white-space: nowrap`）
- 「半導体からアプリケーションまで、AI 技術のバリューチェーンを垂直統合」のような**長い名詞句は読点で折る**
- 日付（`2026.07.16`）はドットの前後で折らない
- ボタンのラベル（「お問い合わせ」「業界一覧」）は折り返さない

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* body から全要素に継承 */
```

- **`palt` を `body` に置いて全要素へ継承させる**。約物が自動で詰まる
- **その上で `letter-spacing` を 0.03em / 0.05em で開き直す**。**「詰めてから開く」の二段構え**
- **`palt` と `letter-spacing: 0.05em` の組み合わせが本文の基準**。`palt` を外すと約物が空いて間延びする
- 英数字の多い文書（`MN-Core` `AI` `72` など）が混じるので、**必要なら `"palt", "pkna"` を足す**と欧文プロポーショナルも効く（現行サイトは `palt` のみ）
- **`tnum`（等幅数字）は未使用**。ニュース日付の桁を揃えたい場合は足す

### 3.8 縦書き

- 現行サイトは全面横組み（`writing-mode: horizontal-tb`）
- 縦組みを使う場合は以下

```css
writing-mode: vertical-rl;
text-orientation: mixed;
font-family: "Noto Sans JP", sans-serif;
font-weight: 400;
letter-spacing: 0.05em;   /* 本文帯の字間を維持する */
line-height: 1.9;         /* 縦組みは横組みの 1.5 より広げる */
font-feature-settings: "vpal";   /* 縦組みでは palt ではなく vpal */
```

- 縦組み中の英数字（`AI` `MN-Core`）は `text-combine-upright: all` を 2 桁までに限定する。**それ以上は横倒しのまま**にする（`MN-Core` は縦中横にしない）
- **`background-clip: text` のグラデーション文字は縦組みに持ち込まない**。グラデーションの角度（160deg）が縦組みでは意味を失う

---

## 4. Component Stylings

> **radius は 2 段だけ**（ボタン `6px` / カード `16px`）。**面は `background-image` のグラデーションで塗る**。**影は使わない**。

### Buttons

**Primary（塗り）**

- Background: **`linear-gradient(160deg, #1a4aff 0px, #1a4aff 100%)`**
  — **`background-color` ではない**。ソリッドも全ストップ同色のグラデーションで書く
- Text: **`#ffffff`**
- Border: **`1px solid rgba(0,0,0,0.2)`**
- Padding: **`12px 24px`**
- Border Radius: **`6px`**
- Font: 16px / **weight 400** / lh 1.5 / **`letter-spacing: normal`**
- 例: ヘッダーの「お問い合わせ」
- **枠が `rgba(0,0,0,0.2)` の半透明黒**。青の面に暗い縁が乗って、わずかに沈んで見える

**Secondary（白地・文字だけ青）**

- Background: **`#ffffff`**
- Text: **`#1a4aff`**
- Border: **なし**（`0px solid #1a4aff`）
- Padding: **`0 24px`**（大）／ **`0 16px`**（小）
- Border Radius: **`6px`**
- Font: 16px（大）／ 14px（小） / weight 400 / ls 0.05em
- 例: フッターの「お問い合わせ」「事業内容」「研究開発」「ニュース一覧」「採用情報」
- **枠を持たない**。青い文字だけで押せることを示す

**On-Navy（濃紺カード上）**

- Background: **`linear-gradient(160deg, #1a4aff, #1a4aff)`**
- Text: `#ffffff`
- Border: **なし**
- Padding: `0 16px`
- Border Radius: **`6px`**
- Font: 14px / weight 400 / ls 0.05em
- 例: 濃紺カード内の「業界一覧」「企業情報」「創業者メッセージ」

**Announcement Pill（告知バー）— radius 80px**

- Background: **`#f3f7ff`**（青の最薄）
- Text: `#000000`（末尾の「詳細 ›」だけ `#1a4aff`）
- Border: **`1px solid #1a4aff`**
- Padding: **`12px 20px`**
- Border Radius: **`80px`** — **サイト唯一のピル**
- Font: 14px / weight 400 / ls 0.05em
- 例: 「Noetra によるフィジカル AI 向け国産マルチモーダル基盤モデル開発に参画」
- **左端にベルアイコン（青い円）、右端に「詳細 ›」を縦罫で区切って置く**
- **ピルはこの告知バーだけ**。他の操作要素は必ず 6px の矩形

### Cards

**Navy Statement Card — このサイトの主役**

- Background: **`linear-gradient(160deg, #01053f 20%, #001b6d 40%, #022d73 60%, #00237e 70%, #000a58 90%)`**
- Border Radius: **`16px`**（`rounded-2xl`）
- Shadow: **なし**
- Overflow: `hidden`
- Text: `#ffffff`（見出し）／ `rgba(255,255,255,0.9)`（本文）／ `rgba(255,255,255,0.7)`（日付）
- 構成: 48px / 400 の見出し → 18px / 400 の本文 → On-Navy ボタン
- **白地セクションと濃紺カードを交互に置く**のがページのリズム。**濃紺カードが「章」の単位**

**Radial Card（採用）**

- Background: **`radial-gradient(circle at 76% 84%, #002fd7 0px, #000e7e 100%)`**
- Border Radius: `16px`
- **右下に光源**。ステートメントカード（線形）と使い分ける

**Light Card（事業紹介）**

- Background: **`#f7f7f8`**
- Border Radius: `16px`
- Text: `#000000`
- 構成: 22〜24px / 400 の見出し → 16px / 400 の本文

### Inputs

実サイトに公開フォームが無いため、**このサイトの原則（radius 6px / 影なし / weight 400）から導くと以下**。

- Background: `#ffffff`
- Border: **`1px solid rgba(0,0,0,0.2)`**（Primary ボタンの枠と同じ）
- Border (focus): **`1px solid #1a4aff`**
- Border Radius: **`6px`**
- Padding: **`12px 16px`**
- Font: 16px / weight 400 / ls 0.05em / Text Color: `#000000`
- Placeholder: `rgba(0,0,0,0.4)`

### Cookie Banner

- Background: `#ffffff`
- Text: 13px / weight 400 / lh 1.5 / `#333333`
- Link: **`#0d318f`**（Deep Navy。**`#1a4aff` ではない**）
- Accept ボタン: 面 **`#0d318f`** / 文字 `#ffffff` / **radius `0px`** / padding `3.25px 6.5px`
- Settings ボタン: 白地 / 文字 `#0d318f` / **`2px solid #0d318f`** / radius `0px`
- **Cookie バーだけ設計が違う**（radius 0、色が Deep Navy、枠 2px）。**サードパーティの CMP なので、自社実装のリファレンスにしない**

---

## 5. Layout Principles

### Spacing Scale

Tailwind の `0.25rem` 系スケール。

| Token | Value |
|-------|-------|
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 6 | 24px |
| 8 | 32px |
| 12 | 48px |
| 20 | 80px |

### Container

- Max Width: **1200px** 目安（1440px 幅でカードが左右 120px の余白を持つ）
- 読み物カラム: **760px** 目安
- Padding (horizontal): 24〜120px
- ヘッダーは **`position: fixed`・白地・不透過**。**KV に重ねない**
- **ヘッダー構成**: 左にロゴ（SVG）→ 中央にナビ 7 項目（14px / 400）→ 右に Primary ボタン ＋ 縦罫 ＋ `ENGLISH`（12px）

### Grid

- Columns: 業界カードは **3〜4 カラム**、ニュースは 1 カラム
- Gutter: 16〜24px
- **ページのリズムは「白地セクション → 濃紺カード → 白地セクション」の交互**。**セクションごとに地色を変えるのではなく、カードの面色で章を切る**
- **告知バーはヘッダー直下・コンテナ幅の左寄せ**（全幅にしない）
- 濃紺カードは **`overflow: hidden` ＋ radius 16px** で、内部の装飾グラフィックを切り抜く

---

## 6. Depth & Elevation

**実測の `box-shadow` は 0 段**。サイト内に影が 1 つも存在しない。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | **`none`** | **全要素**。ボタン・カード・ヘッダー・告知バーのすべて |

- **奥行きは「濃紺グラデーションのカード」が担う**。影の代わりに**面の暗さ**で層を作る:

| 層 | 面 | 用途 |
|----|-----|------|
| 地 | `#ffffff` | ページ全体 |
| 薄い面 | `#f7f7f8` / `#f3f7ff` | 事業紹介カード / 告知バー |
| 主役の面 | **濃紺グラデーション** | ステートメント・事業カード |

- **枠線は 1px の 2 種類だけ**: `rgba(0,0,0,0.2)`（Primary ボタン）と `#1a4aff`（告知バー）
- **`--mantine-shadow-xs〜xl` は Mantine の既定値で、サイトでは 1 つも使われていない**。**ライブラリの CSS 変数をブランドトークンと取り違えないこと**（`--mantine-primary-color-*` の水色系 10 段も同様に未使用。**PFN の青 `#1a4aff` は Mantine のパレットに存在しない**）

---

## 7. Do's and Don'ts

### Do（推奨）

- **`letter-spacing` と `line-height` を「36px の境界」で切り替える**。**≥36px → 0.03em / 1.3、16〜30px → 0.05em / 1.5、14px → 0.05em / 1.3**
- **`font-weight` は 400 で通す**。500 はドロワーの 20px リンクだけ、**700 は使わない**
- **強調はサイズ・グラデーション・面の暗さで作る**。太さで作らない
- **有彩色は `#1a4aff` の 1 色**に絞る
- **面は `background-image: linear-gradient(...)` で塗る**。ソリッドも**全ストップ同色のグラデーション**として書く（appearance をトークンで切り替えられる）
- **大見出しは `background-clip: text` のグラデーション文字**にする（`linear-gradient(160deg, #010947, #0043af 51%, #0046ff 99%)`）。**`color` は `transparent`**
- **radius は 6px（ボタン）と 16px（カード）の 2 段**にする
- **告知バーだけ radius 80px のピル**にする。他の操作要素をピルにしない
- **`box-shadow` を使わない**。奥行きは濃紺カードで作る
- **`font-feature-settings: "palt"` を `body` に置いて全継承させる**
- **ボタンの `letter-spacing` だけ `normal`** にする
- **白地セクションと濃紺カードを交互に置く**。濃紺カードを「章」の単位にする
- **濃紺カード上の弱いテキストは白の透過**（0.9 / 0.7）で作る。別の色を足さない
- **ミッションステートメントは読点で改行させる**（`<br>` か `max-width`）
- **`background-clip: text` の見出しを行ごとに要素分割しない**（グラデーションがリセットされる）
- **Noto Sans JP 単独**でフォールバックを組む

### Don't（禁止）

- **`font-weight: 700` を使わない**。太字での強調はこのサイトの語彙に無い
- **`line-height` に 1.4 / 1.6 / 1.75 を持ち込まない**。**1.3 と 1.5 の 2 値だけ**
- **`letter-spacing` を 0.03em / 0.05em / normal 以外の値にしない**
- **36px の境界を跨いで字間・行間を混ぜない**（48px に 0.05em を当てない）
- **`body` に `letter-spacing` を置いて全継承させない**（サイズ帯ごとに当てる）
- **ボタンの中で `letter-spacing` を開かない**（`normal` を守る）
- **色を増やさない**。有彩色は `#1a4aff` だけ。Deep Navy `#0d318f` は Cookie バー由来なので UI に持ち出さない
- **`background-color` で面を塗らない**（グラデーションで塗る実装に揃える）
- **影を付けない**。`0 2px 8px` のような一般的なカードシャドウを持ち込まない
- **radius を増やさない**（6px / 16px / 告知バーの 80px 以外を作らない）
- **操作要素をピルにしない**（ピルは告知バーだけ）
- **濃紺カードを 2 枚続けて置かない**（白地を挟んでリズムを作る）
- **`--mantine-*` の色・影・radius をブランドトークンとして使わない**（250 個すべてライブラリ既定値。**PFN の青は Mantine のパレットに無い**）
- **`"Noto Sans JP Fallback"` を自前実装にコピーしない**（`next/font` が生成する内部フォント）
- **游ゴシック・ヒラギノをフォールバックに並べない**
- **グラデーション文字を縦組みに持ち込まない**
- **Cookie バーの設計（radius 0 / 枠 2px / Deep Navy）を自社 UI の参照にしない**（サードパーティ CMP）

---

## 8. Responsive Behavior

### Breakpoints

Tailwind の既定ブレークポイントに従う。

| Name | Width | 説明 |
|------|-------|------|
| Mobile | < 768px (`md` 未満) | 1 カラム。ナビはドロワー。**`ENGLISH` は `hidden md:block` で非表示** |
| Tablet | 768–1023px (`md`) | 2 カラム。濃紺カードの padding を詰める |
| Desktop | ≥ 1024px (`lg`) | ナビ 7 項目を横並び。業界カードは 3〜4 カラム |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG 基準）
- **Primary ボタンは `padding 12px 24px` ＋ 16px / lh 1.5 で高さ 48px**。基準を満たす
- **Secondary ボタンは `padding 0 24px`（縦 padding ゼロ）**。**高さは親のフレックスで決まるため、モバイルでは `min-height: 44px` を明示する**
- **On-Navy ボタン（14px / `padding 0 16px`）も同様に `min-height: 44px` が必要**
- **告知バーは全体をタップ領域**にする（「詳細 ›」だけを押させない）
- カードは**カード全体をタップ領域**にする

### フォントサイズの調整

- 本文 16px は据え置く（14px を下回らない）
- **Hero 72px → モバイルでは 32〜36px。36px を下回ったら `letter-spacing` を 0.05em、`line-height` を 1.5 に切り替える**（境界の規則をモバイルでも守る）
- **Statement 48px → 28〜30px。同じく 36px を割った時点で 0.05em / 1.5 に切り替える**
- Section Head 36px → 24〜26px（→ 0.05em / 1.5）
- Card Head 24px → 20px。**0.05em / 1.5 は維持する**
- Nav 14px → 14px（据え置き）
- Button 16px → 15px まで。**`letter-spacing: normal` と高さ 44px は維持する**
- **`font-weight: 400` はモバイルでも維持する**（小さくなっても太らせない）
- **`palt` はモバイルでも維持する**
- **radius 6px / 16px はモバイルでも変えない**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff   （ページ地色。純白。html/body に塗り指定は無い）
Surface Tint:    #f3f7ff   （告知バーの面。青の最薄）
Surface Gray:    #f7f7f8   （事業紹介カードの面）
PFN Blue:        #1a4aff   （唯一の主色。CTA・リンク・枠）
Deep Navy:       #0d318f   （Cookie バー専用。UI に持ち出さない）
Ink:             #000000   （本文・ナビ。純黒を使う）
Ink Inverse:     #ffffff / rgba(255,255,255,0.9) / rgba(255,255,255,0.7)
Border:          rgba(0,0,0,0.2)（Primary ボタン枠）/ #1a4aff（告知バー枠）

--- 面はすべて background-image で塗る（background-color は使わない）---
CTA:             linear-gradient(160deg, #1a4aff, #1a4aff)   ← ソリッドもグラデで書く
見出し:           linear-gradient(160deg, #010947, #0043af 51.03%, #0046ff 99.04%)
                 ＋ background-clip: text ＋ color: transparent
濃紺カード:        linear-gradient(160deg, #01053f 20%, #001b6d 40%, #022d73 60%,
                                   #00237e 70%, #000a58 90%)
放射カード:        radial-gradient(circle at 76% 84%, #002fd7 0px, #000e7e 100%)

Font:            "Noto Sans JP", sans-serif（Noto Sans JP 単独。OS 書体を並べない）
Body:            16px / weight 400 / lh 1.5 / ls 0.05em / #000000
Weight:          400 一択。500 はドロワーの 20px リンクだけ。700 は使わない

--- 字送りは「36px の境界」1 本の規則 ---
≥ 36px   … letter-spacing 0.03em / line-height 1.3   （72 / 48 / 36px）
16〜30px … letter-spacing 0.05em / line-height 1.5   （30 / 24 / 22 / 20 / 18 / 16px）
≤ 14px   … letter-spacing 0.05em / line-height 1.3   （14 / 12px）
ボタン     … letter-spacing normal                     （唯一の例外）

Feature:         font-feature-settings: "palt" を body に置いて全継承
Radius:          ボタン 6px / カード 16px / 告知バーのみ 80px（サイト唯一のピル）
Shadow:          全要素 none（奥行きは濃紺カードの面で作る）
Container:       1200px（読み物 760px）
Rhythm:          白地セクション → 濃紺カード → 白地セクション の交互
```

### プロンプト例

```
Preferred Networks（PFN）のデザインシステムに従って、AI 企業の「事業内容」ページを作成してください。
- フォントは "Noto Sans JP", sans-serif。Noto Sans JP 単独で、
  游ゴシック・ヒラギノ・メイリオをフォールバックに並べない
- body に font-feature-settings: "palt" を置いて全要素に継承させる。
  body には letter-spacing を置かない（サイズ帯ごとに当てる）
- 字送りは「36px の境界」1 本の規則で決める：
  36px 以上 → letter-spacing 0.03em / line-height 1.3
  16〜30px  → letter-spacing 0.05em / line-height 1.5
  14px 以下 → letter-spacing 0.05em / line-height 1.3
  ボタンだけ letter-spacing: normal
  line-height は 1.3 と 1.5 の 2 値だけ。1.4 や 1.6 を持ち込まない
- font-weight は 400 で通す。700 は一切使わない。
  72px の見出しも 48px の見出しも Regular。
  強調はサイズ・グラデーション・面の暗さで作り、太さでは作らない
- 有彩色は #1a4aff（PFN Blue）の 1 色だけ。色を増やさない
- 面は background-color ではなく background-image のグラデーションで塗る。
  ソリッドな青も linear-gradient(160deg, #1a4aff, #1a4aff) と全ストップ同色で書く
- ページの大見出しは background-clip: text のグラデーション文字にする：
  background-image: linear-gradient(160deg, #010947, #0043af 51.03%, #0046ff 99.04%);
  background-clip: text; color: transparent;
  見出しを行ごとに要素分割しない（グラデーションがリセットされる）
- ページのリズムは「白地セクション → 濃紺カード → 白地セクション」の交互にする。
  濃紺カードが章の単位：
  background: linear-gradient(160deg, #01053f 20%, #001b6d 40%, #022d73 60%,
                              #00237e 70%, #000a58 90%);
  border-radius: 16px; overflow: hidden;
  カード上の文字は #ffffff、本文は rgba(255,255,255,0.9)、日付は rgba(255,255,255,0.7)。
  弱いテキストに別の色を足さず、白の透過で作る
- ボタンは radius 6px：
  Primary＝面 linear-gradient(160deg,#1a4aff,#1a4aff) ＋ 文字 #ffffff ＋
    1px solid rgba(0,0,0,0.2) ＋ padding 12px 24px ＋ 16px weight 400 ＋ ls normal
  Secondary＝白地 ＋ 文字 #1a4aff ＋ 枠なし ＋ padding 0 24px
  濃紺カード上＝面 #1a4aff ＋ 文字 #ffffff ＋ 枠なし ＋ padding 0 16px ＋ 14px
- ヘッダー直下の告知バーだけ radius 80px のピルにする：
  面 #f3f7ff ＋ 1px solid #1a4aff ＋ padding 12px 20px ＋ 14px。
  左にベルアイコン、右に「詳細 ›」を縦罫で区切る。
  他の操作要素はピルにしない（radius は 6px と 16px の 2 段だけ）
- box-shadow は一切使わない。奥行きは濃紺カードの面で作る
- ミッションステートメントは読点の位置で改行させる（<br> か max-width で制御）。
  MN-Core や Preferred Networks (PFN) はハイフン・括弧の途中で折らない
- コンテナ幅は 1200px、読み物カラムは 760px
```
