# DESIGN.md — TableCheck（テーブルチェック）

> TableCheck（https://www.tablecheck.com/ja/）のデザイン仕様書。
> 東京発の**飲食店向け予約・顧客管理 SaaS**と、その上に載る**一般ユーザー向けグルメ予約サイト**。予約フォームは加盟店ごとに埋め込まれるため、**同じデザインシステムが数千店舗の画面に展開される**前提で作られている。
> **CSS Custom Properties が 282 個**。フォント／タイプスケール／色（6 系統 × 8〜12 段）／radius 6 段／spacing 8 段／elevation 5 種／z-index 4 段まで、**日本語圏のサービスでは屈指の網羅度**でトークン化されている。
> **`--locale-font-family` という「ロケール別にスタックの先頭だけ差し替える」変数を持つ**。多言語展開のための実装で、日本語ロケールでは `"IBM Plex Sans","Noto Sans"` が入る。和文 Web フォントは読み込まず、**ヒラギノ角ゴ ProN → Yu Gothic UI → 游ゴシック体 → Meiryo UI** の OS フォントに任せる。
> **主 CTA が黒（`#292929`）でウェイト 400**。ブランドカラーの紫はロゴ・見出しの差し色・選択中チップの枠にしか使わず、**ボタンには一切乗せない**。
> **`letter-spacing` も `font-feature-settings` も明示的に `normal` にリセットしている**。字間を触らない方針をトークンレベルで宣言している。
> 実サイトの computed style 実測（2026-08-28 取得。トップ ＋ 東京エリア `/ja/japan/tokyo`）＋ 読み込まれる CSS 517KB の直接集計に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地・薄い枠・小さい角丸**。料理写真が主役なので、UI は `#e5e5e5` の 1px 枠と 4px / 8px の角丸だけで構成する。面色を持つのは主 CTA の黒と、選択中を示す淡い紫だけ
- **TableCheck について**: レストランの予約・順番待ち・事前決済（TableCheck Pay）・待たずに入れる「Fastpass」を提供する。**検索 → 一覧 → 店舗 → 予約フォーム**という導線が中心で、カードとチップの密度が高い
- **密度**: **高い**。1120px の中に 3 列のカードグリッド、その中にさらに 3 段の店舗リストが入る。ただし本文の行間は 1.5 を確保する
- **キーワード**: IBM Plex Sans、`#292929` の黒 CTA、4px と 8px の 2 段角丸、999px の pill チップ、紫は差し色だけ
- **特徴**:
  - **radius が 2 段しかない実質**。`--border-radius-small: 4px`（CSS 参照 **140 回**）と `--border-radius-large: 8px`（**123 回**）でほぼ全部を賄う。**ボタンとバッジは 4px、カードと入力欄は 8px**
  - **`--border-radius-medium` と `--border-radius-large` が同じ 8px**。トークンは 6 段あるが、実質 `micro 2px / small 4px / 8px / x-large 16px / full 999px` の 5 段
  - **チップだけ pill**（`999px`）。エリア・条件の絞り込みチップは完全な pill で、それ以外の角丸とはっきり区別する
  - **ボタンの `font-weight` が 400**。日本語 UI で主 CTA を Regular に置くのは珍しく、これが TableCheck の軽さを作っている。太いのは**バッジ（12px / 600）とラベル（14px / 600）**の側
  - **ヒーローの見出しに AI グラデーションが入る**。「レストラン」の 4 文字だけ `linear-gradient(105deg, #7935d2 0%, #7935d2 45%, #a50ff080 55%, #f85c7980 65%, #8d6fe980 75%, #3c64ff80 85%, #7935d2 ...)` を `background-clip: text` で乗せる。**`--ai-color-1〜4` としてトークン化されている**
  - **ユーティリティヘッダーが淡い紫**（`--utility-header-color: #f7efff` ＝ `--purple-50`）。ブランド色を最も薄めた面をヘッダー最上部に敷く
  - **`font-feature-settings: normal` を 3 箇所で明示**。継承で `palt` が入り込むのを防いでいる

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `viewportTopBySample (5/7)`）。セクションの面は `--grey-100: #f9f9f9`。

### Brand（ブランド）

- **TableCheck Purple** (`#7935d2`, rgb 121,53,210): **主色**。`--brand-static` として宣言。ロゴ、ヒーロー見出しの強調語（36px / 600）、TableCheck Pay のバナー面
- **⚠️ `--purple-700` は `#7832d2` で 1 トーン違う**。実測値は `#7935d2` なので、**`--brand-static` を使う**。`--purple-700` を参照すると微妙にずれる
- **Purple 600** (`#8e4ae7`): **選択中チップの枠**
- **Purple 50** (`#f7efff`): 選択中チップの面、**ユーティリティヘッダーの地**
- **Purple 100〜950**: `#f1e5ff` / `#e2ccff`（`--light-purple`）/ `#dcc1ff` / `#b080ee` / `#a56eec` / `#9f60f1` / `#8e4ae7` / `#7832d2` / `#54268e` / `#3d1f62` / `#31194e`

### Neutral（`--grey-*`。**12 段**）

| トークン | 値 | 用途 |
|---------|-----|------|
| `--grey-50` | `#fdfdfd` | 最も淡い面 |
| `--grey-100` | `#f9f9f9` | **セクションの地**（ヒーロー背景） |
| `--grey-150` | `#f7f7f7` | カード内の淡い面 |
| `--grey-200` | `#eee` | 区切り |
| **`--grey-300`** | **`#e5e5e5`** | **カード・入力欄・非選択チップの枠。UI の骨格** |
| `--grey-400` | `#dbdbdb` | 無効状態の枠 |
| `--grey-500` | `#cecece` | 無効状態の文字 |
| `--grey-600` | `#bfbfbf` | プレースホルダ |
| `--grey-700` | `#989898` | 補助アイコン |
| `--grey-725` | `#848484` | — |
| **`--grey-750`** | **`#666`** | **補助テキスト**（説明文・件数） |
| `--grey-800` | `#4b4b4b` | — |
| `--grey-850` | `#3a3a3a` | — |
| **`--grey-900`** | **`#292929`** | **本文の色 かつ 主 CTA の面色** |
| `--grey-950` | `#1e1e1e` | アプリ訴求バナーの面 |
| `--grey` | `#1a1a1a` | 最も濃い黒 |

### Semantic（各 8 段。100 / 200 / 300 / 500 / 600 / 700 / 800 / 900）

| 役割 | 100 | 500 | **700（主）** | 900 |
|------|-----|-----|--------------|-----|
| **Info** | `#dfeffe` | `#7fb4e9` | **`#06c`** | `#003d7a` |
| **Success** | `#e9fedf` | `#69b261` | **`#067900`** | `#045500` |
| **Warning** | `#fffae5` | `#e7c05c` | **`#926b07`** | `#734400` |
| **Orange** | `#ffedca` | `#d29249` | **`#af5d00`** | `#723c00` |

- **Danger / Error**: `--red-status: #e50303`
- **Rating（★の色）**: `--rating-color: #f69709`
- **Link（既定）**: `--light-blue: #0066cc`（`--info-700` と同値）

### Badge（キャンペーン・特集のバッジ面。淡い彩度の 7 色）

| トークン | 値 |
|---------|-----|
| `--badge-pink` | `#ffc2b9` |
| `--badge-purple` | `#c4a1f4` |
| `--badge-blue` | `#b0e1ff` |
| `--badge-green-1` | `#b6e0d6` |
| `--badge-green-2` | `#3dc5b4` |
| `--badge-green-3` | `#006c63` |
| `--badge-cream` | `#ffe5b0` |

キャンペーン枠の面（実測 `#b0dbda`）はこの系統。**すべて彩度を抑えた淡色**で、料理写真と競合しない。

### AI グラデーション

```css
--ai-color-1: #a50ff080;   /* 紫 */
--ai-color-2: #f85c7980;   /* コーラル */
--ai-color-3: #8d6fe980;   /* 藤 */
--ai-color-4: #3c64ff80;   /* 青 */
--ai-gradient-color: linear-gradient(to right,
  #a50ff080 0%, #f85c7980 30%, #8d6fe980 60%, #3c64ff80 100%);
```

**すべてアルファ 0.5（`80`）付き**。ヒーロー見出しでは両端をブランド紫に固定し、中央だけこの 4 色を通す。

### Text

| 役割 | 色 | トークン |
|------|-----|---------|
| **本文・見出し** | **`#292929`** | `--grey-900` / `--lighter-text-color` |
| 補助テキスト | **`#666`** | `--grey-750` |
| 強い黒 | `#000000` | ヘッダーのユーティリティリンク、フッター見出し |
| 写真の上 | `#ffffff` | — |
| リンク | `#0066cc` | `--light-blue` |

### ⚠️ トークンの値をそのまま実装しない

| 見た目 | トークンの宣言 | 実測値 |
|--------|--------------|-------|
| ブランド紫 | **`--brand-static: #7935d2`**（正） / `--purple-700: #7832d2`（誤用しやすい） | **`#7935d2`** |
| H1 の行間 | `--h1-line-height: 48px` | **実測 44px** |
| `--swiper-theme-color` | `#007aff` | **Swiper の既定値。TableCheck の色ではない** |

---

## 3. Typography Rules

### 3.1 和文フォント

**和文 Web フォントを読み込まない。OS のフォントに任せる。**

- **ゴシック体**: **ヒラギノ角ゴ ProN** → **Yu Gothic UI** → **Yu Gothic** → **游ゴシック体** → **Meiryo UI** → **メイリオ**
- **明朝体**: 使用しない

**`Yu Gothic UI` / `Meiryo UI` を先に置いているのが特徴**。Windows で UI 用の詰まったメトリクスを優先し、**業務 UI としての情報密度を確保する**（本文用の `Yu Gothic` はその後ろ）。

### 3.2 欧文フォント

- **サンセリフ**: **IBM Plex Sans**（**スタックの先頭。2 回書かれている**）→ **Noto Sans** → `-apple-system` → `BlinkMacSystemFont` → `system-ui` → Segoe UI → Roboto → Oxygen → Ubuntu → Helvetica Neue
- **等幅**: **IBM Plex Mono** → Menlo → Monaco → Consolas → Courier New
- **絵文字**: Apple Color Emoji / Segoe UI Emoji / Segoe UI Symbol / Noto Color Emoji（**スタック末尾に明示**）

### 3.3 font-family 指定

```css
/* ロケール別に差し替わる先頭部分（ja では IBM Plex Sans + Noto Sans）*/
--locale-font-family: "IBM Plex Sans", "Noto Sans";

/* サイト全体 */
--font-family:
  "IBM Plex Sans", "IBM Plex Sans", "Noto Sans",
  -apple-system, BlinkMacSystemFont, "system-ui", "Segoe UI", Roboto,
  Oxygen, Ubuntu, "Helvetica Neue",
  "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3",
  "Yu Gothic UI", "Yu Gothic", 游ゴシック体,
  "Meiryo UI", Meiryo, メイリオ,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji",
  sans-serif, system-ui;

/* 等幅 */
--font-family-monospace:
  "IBM Plex Mono", Menlo, Monaco, Consolas, "Courier New", monospace;
```

**フォールバックの考え方**:
- **欧文優先**。IBM Plex Sans で英数字・記号を統一し、和文は OS に任せる
- **`--locale-font-family` で先頭だけを差し替える**多言語設計。日本語以外のロケールでは別の欧文フォントが入る
- **和文は ProN → UI 系 → 通常** の順。`Yu Gothic UI` を `Yu Gothic` より先に置くのは情報密度を優先する意図
- **絵文字フォントをスタックに明示する**。予約ステータスや国旗の絵文字が Times にフォールバックするのを防ぐ

### 3.4 文字サイズ・ウェイト階層

**トークンで完全に定義されている**（サイズ・ウェイト・行間の 3 点セット）。

| トークン | サイズ | ウェイト | line-height | 比率 |
|---------|-------|---------|------------|------|
| `headline` | 54px | **700** | 64px | 1.19 |
| **`h1`** | **36px** | **600** | 48px（**実測 44px**） | 1.22 |
| `h2` | 24px | **400** | 32px | 1.33 |
| `h3` | 20px | **600** | 24px | 1.20 |
| `h4` | 20px | **400** | 24px | 1.20 |
| `h5` | 16px | **600** | 24px | 1.50 |
| **`body-1`** | **16px** | **400** | **24px** | **1.50** |
| **`body-2`** | **14px** | **400** | **20px** | **1.43** |
| `small` | 12px | 400 | 18px | 1.50 |
| `label` | 14px | **600** | 20px | 1.43 |

**`h2` と `h4` がウェイト 400**。24px / 20px の見出しをあえて Regular に置き、**太さではなくサイズで階層を作る**。

補助のサイズ変数: `--font-size-xs: 12px` / `--font-size-s: 14px`。
補助の行間変数: `--line-height-xs: 18px` / `--line-height-s: 20px`。

**実測されたその他のバリエーション**

| 用途 | サイズ / ウェイト / 行間 | 色 |
|------|----------------------|-----|
| カードの説明文 | 14px / 400 / 19.6px（1.4） | `#666` |
| 店舗名（リスト内） | 16px / 400 / 22.4px（1.4） | `#292929` |
| バッジ | 12px / **600** / 16px（1.33） | `#292929` |
| ヘッダーのユーティリティリンク | 12px / 400 / 18px（1.5） | `#000000` |
| ボタンのラベル | 14〜16px / **400** / 20〜24px | `#ffffff` |

### 3.5 行間・字間

**行間 — トークンが px 固定**

| 用途 | 値 | 比率 |
|------|-----|------|
| 本文（16px） | **24px** | 1.5 |
| 本文（14px） | **20px** | 1.43 |
| 小（12px） | 18px | 1.5 |
| 見出し（20〜36px） | 24 / 32 / 48px | 1.2〜1.33 |

- **`line-height` を比率ではなく px で持つ**。カードの高さを揃えるための実装で、**行間を比率に置き換えるとグリッドが崩れる**
- 日本語本文としては **1.43〜1.5 とやや詰め気味**。情報量を優先する業務 UI 寄りの設計

**字間**

- **すべて `normal`**。CSS 中の `letter-spacing` 宣言は **`normal` が 3 個** と `-.36px` が 1 個だけ
- **`normal` を明示的に書いている**のが要点。継承や外部埋め込みで字間が入り込むのを防いでいる
- **見出しにもトラッキングを入れない**

### 3.6 禁則処理・改行ルール

- **ヒーローの見出しだけ手動改行**（「全国の人気」／「レストランを探す」）。2 行目の「レストラン」にグラデーションを当てるため
- **店舗名・料理ジャンルは 1 行で省略**（`text-overflow: ellipsis`）。「ガストロノミー "ジョエル・…」「プレゼンテ スギ （PRESENT…」のように途中で切る
- カード幅は 1120px の 3 列で **約 350px**。14px の説明文で **1 行あたり約 25 字**
- `word-break` / `overflow-wrap` の指定は無く、**ブラウザ既定の日本語禁則に任せる**

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* CSS 中に 3 箇所、明示的にリセット */
```

- **`palt` を使わない**。それどころか **`normal` を明示して継承を切っている**。埋め込み予約フォームが加盟店サイトの CSS を継承しないための実装
- 数字の指定も無し。金額・人数・時刻は IBM Plex Sans の既定字形で出る

### 3.8 縦書き

- **使用しない**。`writing-mode` の指定なし

---

## 4. Component Stylings

### Buttons

**① プライマリ（黒・最頻出）**

```css
background: #292929;                /* --grey-900 */
color: #ffffff;
border: 1px solid #292929;
border-radius: 4px;                 /* --border-radius-small */
font-size: 16px;                    /* 小さい版は 14px */
font-weight: 400;                   /* ← Regular。太字にしない */
padding: 9px 11px;                  /* アイコンのみのときは 7px */
```

「ログイン」「6 店舗すべてを表示」「すべてのレストランを見る」。**ブランドの紫はボタンに使わない**。

**② セカンダリ（枠線）**

```css
background: transparent;            /* または #ffffff */
color: #292929;
border: 1px solid #e5e5e5;          /* --grey-300 */
border-radius: 8px;                 /* --border-radius-large */
font-size: 16px;
font-weight: 400;
padding: 12px;
```

**③ テキストボタン**

```css
background: transparent;
color: #292929;
border: none;
border-radius: 4px;
font-size: 14〜16px;
font-weight: 400;
padding: 8px;
```

### Chips（絞り込み。**pill**）

**選択中**

```css
background: #f7efff;                /* --purple-50 */
color: #292929;
border: 1px solid #8e4ae7;          /* --purple-600 */
border-radius: 999px;               /* --border-radius-full */
font-size: 14px;
font-weight: 400;
padding: 7px 11px;
```

**非選択**

```css
background: #ffffff;
color: #666666;                     /* --grey-750 */
border: 1px solid #e5e5e5;          /* --grey-300 */
border-radius: 999px;
font-size: 14px;
font-weight: 400;
padding: 7px 11px;
```

**選択状態は「面の色を変える」のではなく「枠を紫にして面を最も薄い紫にする」**。文字色は選択で `#666` → `#292929` に濃くなる。

### Badges（料理ジャンル・条件のタグ）

```css
background: #ffffff;
color: #292929;
border: 1px solid #e5e5e5;
border-radius: 4px;                 /* pill ではない */
font-size: 12px;
font-weight: 600;                   /* ← ボタンより太い */
padding: 4px 6px;                   /* 小さい版は 2px 6px */
```

`居酒屋` `飲み会` `大人数向け` のような属性表示。**チップ（pill / 400）とバッジ（4px / 600）は別物**なので混同しない。

### Cards

```css
background: #ffffff;
border: 1px solid #e5e5e5;          /* --grey-300 */
border-radius: 8px;                 /* --border-radius-large */
padding: 12px;                      /* --spacing-l3 */
box-shadow: none;                   /* 既定では影なし */
```

**写真の上に重ねる浮遊カード**（ヒーローの「居酒屋 金曜日 夜」など）:

```css
background: rgba(255, 255, 255, 0.7);   /* 半透明の白 */
border: 1px solid rgba(0, 0, 0, 0.1);   /* --lighter-grey-border */
border-radius: 8px;
padding: 8px 12px 12px;
```

**キャンペーンカード**は `--badge-*` 系の淡色（実測 `#b0dbda`）を面に敷き、枠は `#e5e5e5` のまま。

### Inputs

```css
/* 検索欄（外枠のコンテナが枠と角丸を持ち、input 自体は素通し）*/
background: transparent;
color: #000000;
border: none;
border-radius: 0;
font-size: 16px;                    /* iOS のズーム回避 */
padding: 0;
height: 35px;
```

**外側のコンテナが `border-radius: 8px` ＋ `1px solid #e5e5e5` を持ち、`input` 自体は完全に透明**。アイコンと入力欄を同じ枠に収めるための構成。

**フォーカス / エラー**

```css
/* フォーカス */
box-shadow: 0 0 0 1px var(--focus);   /* 強調時は 0 0 0 2px */

/* エラー */
box-shadow: 0 0 0 1px var(--error);
```

**枠線ではなく `box-shadow` のスプレッドでリングを描く**（レイアウトをずらさないため）。

### Utility Header

```css
background: #f7efff;                /* --utility-header-color = --purple-50 */
font-size: 12px;
color: #000000;
```

---

## 5. Layout Principles

### Container

| 用途 | 幅 |
|------|-----|
| **コンテンツ幅** | **1120px** |
| 内側のグリッド | 1088px |
| モーダル・フォーム | 540px / 576px |
| サイドのカラム | 224px / 181px / 160px |
| ヒーローの画像枠の角丸 | `--storefront-hero-image-radius: 16px` |

### Spacing Scale（`--spacing-l1〜l8`）

| トークン | 値 |
|---------|-----|
| `--spacing-l1` | **4px** |
| `--spacing-l2` | **8px** |
| `--spacing-l3` | **12px** |
| `--spacing-l4` | **16px** |
| `--spacing-l5` | **24px** |
| `--spacing-l6` | **32px** |
| `--spacing-l7` | **40px** |
| `--spacing-l8` | **48px** |

`--section-spacing: 12px`。**4px 起点で 4 → 8 → 12 → 16 → 24 → 32 → 40 → 48**。

### Radius Scale

| トークン | 値 | CSS 参照 | 用途 |
|---------|-----|---------|------|
| `--border-radius-micro` | 2px | — | 極小の装飾 |
| **`--border-radius-small`** | **4px** | **140 回** | **ボタン・バッジ** |
| `--border-radius-medium` | 8px | 8 回 | （`large` と同値） |
| **`--border-radius-large`** | **8px** | **123 回** | **カード・入力欄** |
| `--border-radius-x-large` | 16px | 6 回 | ヒーロー画像・大きなパネル |
| **`--border-radius-full`** | **999px** | **17 回** | **絞り込みチップ** |

`50%` は 27 回（アイコン・アバター）。

### Z-index Scale

`--z-index-1: 10` / `--z-index-2: 20` / `--z-index-3: 30` / `--z-index-4: 40`。**10 刻みの 4 段だけ**。

---

## 6. Depth & Elevation

**トークン化された 5 種類**。カードは既定で影を持たず、浮くもの（ドロップダウン・ポップオーバー）にだけ当てる。

```css
--elevation-small-raised:
  0 1px 2px -1px rgb(0 0 0 / .2), 0 2px 6px -2px rgb(0 0 0 / .1);
--elevation-medium-raised:
  0 1px 4px -1px rgb(0 0 0 / .2), 0 2px 6px -2px rgb(0 0 0 / .1);
--elevation-large-raised:
  0 2px 8px -1px rgb(0 0 0 / .2), 0 2px 12px -4px rgb(0 0 0 / .1);
--elevation-light-small:  0 0 3px 0 rgba(0, 0, 0, .1);
--elevation-dark-large:   0 0 12px rgba(0, 0, 0, .8);
```

**2 層構造**（近い小さな影 ＋ 遠い大きな影）で、どちらも**負のスプレッド**を持つ。これで影が要素の外にはみ出さず、密なグリッドでも滲まない。

**実測で最も多い影**は `rgba(0,0,0,.2) 0 1px 2px -1px, rgba(0,0,0,.1) 0 2px 6px -2px`（**14 箇所**）＝ `--elevation-small-raised`。

**枠線ベースの影**

```css
--light-grey-border:   #4c4b4b1a;   /* rgba(76,75,75,.1) */
--lighter-grey-border: #0000001a;   /* rgba(0,0,0,.1) */
```

半透明の白カードには `--lighter-grey-border` を枠に使う。

---

## 7. Do's and Don'ts

### Do（推奨）

- **主 CTA は黒（`#292929`）に白文字、`font-weight: 400`、`border-radius: 4px`**。太字にしない
- **紫（`#7935d2`）は差し色として使う**。ロゴ・見出しの強調語・選択中チップの枠まで
- **`--brand-static: #7935d2` を参照する**。`--purple-700: #7832d2` は 1 トーンずれる
- **radius は 4px（ボタン・バッジ）と 8px（カード・入力欄）の 2 段**、絞り込みチップだけ `999px`
- **枠は `#e5e5e5`（`--grey-300`）に統一する**。UI の骨格はこの 1px 枠で作る
- **`line-height` は px で指定する**（16px→24px / 14px→20px）。比率にするとカードの高さが揃わなくなる
- **`letter-spacing: normal` と `font-feature-settings: normal` を明示する**。埋め込み先の CSS を継承しないため
- **絵文字フォントをスタック末尾に書く**（Apple Color Emoji / Segoe UI Emoji / Noto Color Emoji）
- **フォーカス／エラーのリングは `box-shadow` のスプレッド**で描く（`0 0 0 1px` / `0 0 0 2px`）。`border` を太らせない
- **和文は `Yu Gothic UI` を `Yu Gothic` より先に置く**（UI メトリクスを優先）
- **バッジは 12px / 600、チップは 14px / 400**。太さで役割を分ける
- **影は `--elevation-*` の 2 層構造をそのまま使う**。負のスプレッドを削らない

### Don't（禁止）

- **ボタンに紫を乗せない**。TableCheck の CTA は黒
- **ボタンを太字にしない**（400 のまま）
- **`--swiper-theme-color: #007aff` を拾わない**。Swiper ライブラリの既定値
- **`letter-spacing` を入れない**。見出しも本文も `normal`
- **`palt` を足さない**。むしろ `normal` にリセットする方針
- **カードに既定で影を付けない**。枠（`1px solid #e5e5e5`）＋ 角丸 8px で表現する
- **チップとバッジを混同しない**。チップは pill / 400 / 絞り込み用、バッジは 4px / 600 / 属性表示用
- **和文 Web フォントを読み込まない**。OS フォントに任せる設計
- **`line-height` を比率に置き換えない**
- **radius を増やさない**。4px / 8px / 999px の 3 種で足りる
- **`--h1-line-height: 48px` をそのまま信じない**。実測は 44px

---

## 8. Responsive Behavior

### Breakpoints

| 幅 | レイアウト |
|----|-----------|
| `> 1200px` | コンテンツ 1120px 中央。カード 3 列 |
| `768〜1200px` | 流動幅。カード 2 列。エリアチップは横スクロール |
| `< 768px` | 1 カラム。検索欄がヘッダーからヒーローへ移動 |

### タッチターゲット

- 主 CTA は `padding: 9px 11px` ＋ 16px / 行間 24px で高さ **約 44px**
- チップは `padding: 7px 11px` ＋ 14px / 行間 20px で高さ **約 36px**。**モバイルでは上下を 10px に広げて 44px を確保する**
- バッジ（`padding: 4px 6px` / 12px）は**表示専用**でタップ対象にしない

### フォントサイズの調整

- **入力欄は 16px を死守する**（iOS の自動ズーム回避）
- 本文 16px / 行間 24px はそのまま
- `headline` 54px → 32px、`h1` 36px → 24〜28px に落とす
- 補助テキスト 14px / 行間 20px はそのまま

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
ページ背景: #ffffff（セクション面 #f9f9f9）
本文:      16px / 400 / line-height 24px / #292929
           "IBM Plex Sans", "Noto Sans", -apple-system, system-ui, "Segoe UI",
           "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Yu Gothic", 游ゴシック体,
           "Meiryo UI", Meiryo, "Apple Color Emoji", sans-serif
補助:      14px / 400 / line-height 20px / #666666
h1:        36px / 600 / line-height 44px / #292929
ブランド色:  #7935d2（--brand-static）— ロゴ・見出しの強調語・選択チップの枠のみ
主 CTA:    #292929 / 白文字 / 1px solid #292929 / radius 4px / 16px 400 / padding 9px 11px
チップ:     選択 #f7efff + 1px solid #8e4ae7 / 非選択 #fff + 1px solid #e5e5e5
           radius 999px / 14px 400 / padding 7px 11px
バッジ:     #fff / #292929 / 1px solid #e5e5e5 / radius 4px / 12px 600 / padding 4px 6px
カード:     #fff / 1px solid #e5e5e5 / radius 8px / padding 12px / 影なし
枠の色:     #e5e5e5（--grey-300）
radius:    4px（ボタン・バッジ）/ 8px（カード・入力欄）/ 999px（チップ）/ 16px（ヒーロー画像）
spacing:   4 / 8 / 12 / 16 / 24 / 32 / 40 / 48
影:        0 1px 2px -1px rgba(0,0,0,.2), 0 2px 6px -2px rgba(0,0,0,.1)
フォーカス:  box-shadow: 0 0 0 2px（border は太らせない）
コンテンツ幅: 1120px
字間:       normal（明示）
palt:      normal にリセット（使わない）
```

### プロンプト例

```
TableCheck（https://www.tablecheck.com/ja/）のデザインで、
レストラン検索の一覧ページを作ってください。

- ページ背景は #ffffff、セクションの面は #f9f9f9
- フォントは "IBM Plex Sans", "Noto Sans", -apple-system, system-ui, "Segoe UI",
  "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Yu Gothic", 游ゴシック体,
  "Meiryo UI", Meiryo, "Apple Color Emoji", sans-serif
- 本文は 16px / 400 / line-height 24px / #292929、補助テキストは 14px / 400 /
  line-height 20px / #666666。line-height は比率ではなく px で指定する
- 見出しは h1 36px / 600 / line-height 44px、h2 24px / 400、h3 20px / 600
- letter-spacing は normal、font-feature-settings も normal を明示する
- 主 CTA は「background #292929 / 白文字 / 1px solid #292929 / border-radius 4px /
  font-size 16px / font-weight 400 / padding 9px 11px」。ボタンは太字にせず、紫も使わない
- 絞り込みチップは border-radius 999px。選択中は「面 #f7efff / 枠 1px solid #8e4ae7 /
  文字 #292929」、非選択は「面 #fff / 枠 1px solid #e5e5e5 / 文字 #666」
- ジャンルバッジは border-radius 4px / 12px / font-weight 600 / 1px solid #e5e5e5
- カードは「#fff / 1px solid #e5e5e5 / border-radius 8px / padding 12px / 影なし」
- 検索欄は外側コンテナが border-radius 8px + 1px solid #e5e5e5 を持ち、
  input 自体は透明・枠なし・font-size 16px
- フォーカスリングは box-shadow: 0 0 0 2px で描く（border を太らせない）
- 余白は 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 のスケールから選ぶ
- コンテンツ幅は 1120px、カードは 3 列グリッド
- 紫 #7935d2 はロゴと見出しの強調語だけに使う
```
