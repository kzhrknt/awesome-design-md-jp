# DESIGN.md — ログラス（Loglass）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-08 / 対象: `https://www.loglass.jp/`, `/case-study`

---

## 1. Visual Theme & Atmosphere

経営管理クラウド「Loglass」のプロダクトサイト。数字を扱うB2B SaaSらしく、
**白地・青1色・角丸の小さいカード**で構成された、静かで手数の少ない画面。
派手な装飾を持たない代わりに、**199個の CSS Custom Property による
デザイントークン体系**がサイト全体を統制している。

- **デザイン方針**: 白地 + コバルトブルー `#2352c8` の1アクセント。情報を邪魔しない
- **密度**: 中程度。1200px の版面に 8px グリッドのカードを並べる
- **キーワード**: トークン駆動、11段階カラースケール、px 指定の字間、Noto Sans JP 1本、角丸 4/8px

**このサイトの特徴的な癖（他サイトと違う点）**

1. **`letter-spacing` を em ではなく px で持つ**。`--tracking-normal: 0.28px` が
   14px にも 40px にも同じ 0.28px でかかる。つまり**文字が大きくなるほど
   相対的な字間は詰まる**（14px → 0.02em、40px → 0.007em）。em 換算しない
2. **11段階のカラースケール（0〜10 / 1〜10）を6色相ぶん持つ**。
   neutral・blue・orange・turquoise・green・red。UI に出るのは blue だけだが、
   グラフ用に `--color-chart-categorical-1` 〜 `-11` が別途定義されている
3. **`--radius-lg` と `--radius-md` がどちらも 8px**。スケールの途中が意図的に潰してある
4. **ボタンの角丸が 4px と 8px の2値**。サイズ違いではなく**配置場所で使い分ける**
   （ヘッダー内 = 4px / セクション内 = 8px）。バッジだけ `9999px` のピル
5. **見出しに `font-feature-settings` を使わない**（`normal`）。
   例外はヒーローのスライド見出しだけで、そこだけ **游ゴシック + `"palt"`**
   という別チェーン（`--font-yugothic`）に切り替わる
6. **`line-height` を % で持つ**（`--leading-normal: 170%`）。px でも数値でもない
7. **影が 20 種類以上ある**。`--shadow-card` / `--shadow-floating` /
   `--shadow-ai-hero` / `--shadow-benefit-card` … と**用途名で命名**され、
   多くが `color-mix(in srgb, #2352c8 20%, transparent)` の**ブランド色つきの影**
8. **CTA が3系統**。青 `#2352c8`（主）/ 黒 `#171725`（副）/ 橙 `#e77623`（資料DL）。
   橙はサイト内で「ダウンロード」だけに使う
9. グラデーションは **`90deg` の青→水色（`#2352c8` → `#67bcff`）** が基本形。
   バナーと「詳しく見る」ボタンに使う
10. 最下部の CTA セクションだけ **`linear-gradient(48deg, #000c2a, #02010c)` の
    ほぼ黒**に反転する

---

## 2. Color Palette & Roles

<!-- 実サイトの CSS Custom Property 実測値。すべて hex -->

### Base

- **Background** (`#ffffff`): ページ地色（`body`。`--color-bg-white` / `--color-neutral-0`）
- **Surface Muted** (`#f1f1f5`): セクションの面。**画面上で最も広い面積**（`--color-bg-muted` / `--color-surface-secondary` / `--color-neutral-2`）
- **Surface Subtle** (`#fafafb`): カード内のさらに薄い面（`--color-bg-surface` / `--color-neutral-1`）
- **Surface Blue** (`#f8fafd`) / (`#eef5ff`): 青みのある面（`--color-bg-blue-light` / `--color-bg-blue-lighter`）

### Brand / CTA

- **Primary** (`#2352c8`): ブランド青。CTA・リンク・アイコン（`--color-cta-primary` / `--color-text-brand` / `--color-text-link` / `--color-blue-8`）
- **Primary Hover** (`#1337a1`): 押下・ホバー（`--color-cta-primary-hover` / `--color-text-active` / `--color-blue-9`）
- **Secondary** (`#171725`): 黒の CTA（`--color-cta-secondary` / `--color-bg-primary` / `--color-neutral-10`）
- **Secondary Hover** (`#3f3f4a`): 同ホバー（`--color-neutral-9`）
- **Accent** (`#e77623`): 橙。**資料ダウンロードだけ**に使う（`--color-cta-accent` / `--color-orange-6`）
- **Accent Hover** (`#c3540a`): 同ホバー（`--color-orange-7`）
- **AI Light** (`#67bcff`): グラデーションの明るい端（`--color-blue-ai-light`）

### Text

- **Text Primary** (`#171725`): 見出し・本文（`--color-text-primary`）
- **Text Normal** (`#3f3f4a`): 既定の文字色（`--color-text-normal`）
- **Text Secondary** (`#6c6c7f`): 補足・注釈（`--color-text-secondary` / `--color-text-annotation`）
- **Text Placeholder** (`#9090a1`): 入力欄のプレースホルダ
- **Text Disabled** (`#b5b5be`): 無効状態
- **Text On Fill** (`#ffffff`): 塗りの上の文字（`--color-text-onfill` / `--color-text-normal-inverse`）

### Border

- **Border Soft** (`#f1f1f5`): 面と同色の弱い罫
- **Border Medium** (`#d5d5dc`): 入力欄・アウトラインボタンの罫（`--color-border-divider` と同値）
- **Border Hard** (`#b5b5be`): 強い罫
- **Border Error** (`#d3403a`)

### Semantic

| 役割 | Surface | Text |
|------|---------|------|
| Info | `#f0f7ff` | `#026572` |
| Success | `#eafbe5` | `#108a10` |
| Warning | `#fff2de` | `#c3540a` |
| Error | `#ffede9` | `#d3403a` |
| Disabled | `#b5b5be` | `#b5b5be` |

### Neutral Scale（0 → 10）

```
#fff → #fafafb → #f1f1f5 → #e2e2ea → #d5d5dc → #b5b5be
     → #9090a1 → #6c6c7f → #50505d → #3f3f4a → #171725
```

### Blue Scale（1 → 10）

```
#f8fafd → #eef5ff → #d5e4fb → #bdd4f7 → #90ade3
       → #7295de → #4673d4 → #2352c8 → #1337a1 → #062073
```

同じ 10 段階が **orange / turquoise / green / red** にも用意されている
（`--color-orange-1` 〜 `-10` 等）。UI に出るのは blue と orange-6 だけ。

### Chart（グラフ専用の 11 色）

```
#2352c8 / #d5e4fb / #29a4b3 / #bfebef / #37ac32 / #cdecc6
       / #e77623 / #ffdebf / #ee6e66 / #ffdbd4 / #b5b5be
```

**濃 → 淡の対で並ぶ**（濃い青の次は薄い青）。系列が増えても色相の数は増やさない。

### Gradients

```css
/* バナー・小さいCTA — 水平方向の青→水色 */
background: linear-gradient(90deg, #2352c8, #67bcff);

/* 見出しの強調面 */
background: linear-gradient(135deg, #1337a1, #2352c8);

/* 最下部の CTA セクション（唯一の暗い面） */
background: linear-gradient(48deg, #000c2a, #02010c);
```

---

## 3. Typography Rules

### 3.1 和文フォント

**Noto Sans JP 1本。** 明朝を使わない。

```css
--font-heading: "Noto Sans JP", sans-serif;
--font-body:    "Noto Sans JP", sans-serif;
```

見出しと本文でトークンを分けているが、**中身は同じ**。
プラットフォームフォント（ヒラギノ・游ゴシック）をチェーンに並べない
**Webフォント単独型**で、落ちる先は generic な `sans-serif` だけ。

**例外がひとつだけある。** ヒーローのスライド見出しは游ゴシックに切り替わる。

```css
--font-yugothic: YuGothic, "游ゴシック体", "游ゴシック", "Yu Gothic", sans-serif;
```

### 3.2 欧文フォント

| トークン | 値 | 用途 |
|---------|-----|------|
| `--font-display` | `"Montserrat", sans-serif` | 数値・ラベルの表示用 |
| `--font-accent` | `"Libre Baskerville", serif` | 引用・アクセント |
| `--font-mono` | `"avenir-next-lt-pro", "Avenir Next", sans-serif` | **等幅ではない**。命名だけが mono |

`--font-mono` に実際の等幅書体が入っていない点に注意。数字の桁を揃えたい場合は
`font-variant-numeric: tabular-nums` を別途指定する。

### 3.3 font-family 指定

```css
:root {
  --font-heading: "Noto Sans JP", sans-serif;
  --font-body:    "Noto Sans JP", sans-serif;
  --font-yugothic: YuGothic, "游ゴシック体", "游ゴシック", "Yu Gothic", sans-serif;
}

body {
  font-family: var(--font-body);
  font-size: 14px;               /* 16px ではない */
  font-weight: 400;
  line-height: 1.6;              /* 22.4px */
  letter-spacing: 0.28px;        /* em ではなく px */
  color: #171725;
  font-feature-settings: normal; /* palt は使わない */
}

/* ヒーローのスライド見出しだけ游ゴシック + palt */
.hero-slide-title {
  font-family: var(--font-yugothic);
  font-size: 48px;
  font-weight: 600;
  line-height: 1.4;              /* 67.2px */
  letter-spacing: 0.28px;
  font-feature-settings: "palt";
}
```

**フォールバックの考え方**:
- Webフォント単独。プラットフォームフォントを並べない
- 和文が先頭。欧文専用チェーンを持たず、Noto Sans JP の欧文グリフをそのまま使う
- 游ゴシックチェーンだけは**和文名を3種（`游ゴシック体` / `游ゴシック` / `Yu Gothic`）並べる**
  — Windows / macOS の名前ゆれを吸収するため

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Hero Head | 60px | 600 | 1.4 (84px) | 0.28px | 「AI × 経営分析」 |
| Hero Slide | 48px | 600 | 1.4 (67.2px) | 0.28px | **游ゴシック + palt**。色 `#ffffff` |
| Section Head | 40px | 600 | 1.4 (56px) | 0.28px | 「意思決定がその場で進む」 |
| Section Head S | 32px | 600 | 1.4 (44.8px) | **1.6px** | 「ピックアップ資料」。ここだけ字間が広い |
| Sub Head | 24px | 600 | 1.4 (33.6px) | 0.28px | 「数日単位の集計が、わずか数分、数秒に」 |
| Lead | 20px | 600 | 1.4 (28px) | 0.28px | 「利益構造・予実をクリアに可視化」 |
| Card Title | 18px | 600 | 1.4 (25.2px) | 0.28〜0.36px | 事例カードの見出し |
| Body | 16px | 400 | **1.7** (27.2px) | 0.28px | 読ませる本文。色 `#6c6c7f` |
| Body Dense | 16px | 400 | **1.8** (28.8px) | 0.28px | 資料説明。色 `#171725` |
| Base（body） | 14px | 400 | **1.6** (22.4px) | 0.28px | 既定 |
| Nav | 14px | 600 | 1.43 (20px) | 0.28px | 「サービス一覧」「事例」 |
| Button | 14px | **700** | 1.43 (20px) | 0.28px | 「お問い合わせ」「資料ダウンロード」 |
| Meta | 14px | 500 | 1.8 (25.2px) | 0.36px | 「1,001〜5,000名」 |
| Badge | 12px | 500 | 1.33 (16px) | **normal** | 「プレスリリース」「受付中」 |
| Caption | 12px | 400 | 1.7 (20.4px) | 0.28px | 「※1 累計（2025年…」。色 `#6c6c7f` |
| Kicker | 14px | **900** | 1.43 (20px) | 0.28px | 「New Release」。**italic** |

**ウェイトは 400 / 500 / 600 / 700 の4値。** 見出しは一貫して **600**（700 ではない）。
700 はボタンとインラインの強調だけ。**900 はバナーの「New Release」1箇所だけ**で、
そこだけ `font-style: italic` が付く。

### 3.5 行間・字間

```css
--leading-tight:   130%;   /* 使用箇所少 */
--leading-snug:    140%;   /* 見出しすべて */
--leading-normal:  170%;   /* 本文 16px */
--leading-relaxed: 180%;   /* 読ませる本文 */

--tracking-tight:  0.24px;
--tracking-normal: 0.28px; /* 既定 */
--tracking-wide:   0.36px;
--tracking-wider:  0.4px;
```

- **見出しは一律 1.4（140%）**。サイズが 24px でも 60px でも変えない
- **本文は 1.6〜1.8**。14px は 1.6、16px は 1.7〜1.8
- **`letter-spacing` は px 固定**。既定 0.28px を全要素に効かせ、
  例外は「ピックアップ資料」の 1.6px と、バッジの `normal` だけ
- **em に換算しない**。40px の見出しに 0.28px（= 0.007em）がかかる設計は
  意図的で、**大きい文字ほどベタ組みに寄せる**

### 3.6 禁則処理・改行ルール

- 「Loglass」「Loglass 経営管理」は途中で折らない
- 「予実管理」「経営企画」「意思決定」など四字の漢語は熟語のまま折り返す
- 注釈（`※1 累計（2025年10月31日時点）…`）は 12px / `#6c6c7f` / `line-height: 1.7`。
  **括弧つきの長文なので `line-break: strict` を効かせる**
- 数字と単位（`-10,800` `-3.68pt`）はバッジ内で折らない

```css
h1, h2, h3 { word-break: keep-all; overflow-wrap: break-word; }
.caption   { line-break: strict; }
```

### 3.7 OpenType 機能

```css
body { font-feature-settings: normal; }        /* palt を使わない */
.hero-slide-title { font-feature-settings: "palt"; }  /* 例外はここだけ */
```

- **サイト全体で `palt` を使わない**。Noto Sans JP のベタ組みのまま、
  字間は `letter-spacing: 0.28px` で開ける
- **游ゴシックに切り替わるヒーロー見出しだけ `palt`**。
  游ゴシックは仮名が広いので詰め組みにしないと締まらない
- 数字を並べるダッシュボード風の UI では `tabular-nums` を足す

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| Noto Sans JP | **そのまま**（Google Fonts）| 公開Webフォント |
| Montserrat | **そのまま**（Google Fonts）| 同上 |
| Libre Baskerville | **そのまま**（Google Fonts）| 同上 |
| 游ゴシック | **Noto Sans JP + `palt`** で代替 | OS 同梱フォントのため環境依存 |
| avenir-next-lt-pro | **Montserrat** で代替 | Adobe Fonts のため配信不可 |

---

## 4. Component Stylings

### Buttons

**角丸は配置場所で決まる。ヘッダー内は 4px、セクション内は 8px。**

```css
/* Primary S（ヘッダー） */
.btn-primary-sm {
  background: #2352c8; color: #ffffff;
  border: 0; border-radius: 4px;      /* --radius-sm */
  padding: 6px 12px;
  font-size: 14px; font-weight: 700; line-height: 1.43;
  letter-spacing: 0.28px;
}

/* Primary M（セクション内） */
.btn-primary {
  background: #2352c8; color: #ffffff;
  border: 0; border-radius: 8px;      /* --radius-md */
  padding: 10px 20px;
  font-size: 16px; font-weight: 700; line-height: 1.5;
}

/* Secondary — 黒 */
.btn-secondary {
  background: #171725; color: #ffffff;
  border-radius: 4px; padding: 6px 12px;
  font-size: 14px; font-weight: 500;
}

/* Outline */
.btn-outline {
  background: transparent; color: #171725;
  border: 1px solid #d5d5dc; border-radius: 4px;
  padding: 6px 12px; font-size: 14px; font-weight: 700;
}

/* Gradient — 「詳しく見る」 */
.btn-gradient {
  background: linear-gradient(90deg, #2352c8, #67bcff);
  color: #ffffff; border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px; font-weight: 700;
  display: inline-flex; justify-content: space-between; gap: 16px;
}

/* Accent — 資料ダウンロード専用 */
.btn-accent {
  background: #e77623; color: #ffffff;
  border-radius: 4px; padding: 0 24px; height: 44px;
  font-size: 14px; font-weight: 600;
}
```

ホバーは色を1段階濃くするだけ（`#2352c8` → `#1337a1`、`#171725` → `#3f3f4a`、
`#e77623` → `#c3540a`）。拡大も影の追加もしない。

### Badges（ピル）

```css
.badge {
  display: inline-flex; align-items: center;
  border-radius: 9999px;            /* --radius-full */
  padding: 2px 10px;
  font-size: 12px; font-weight: 500; line-height: 1.33;
  letter-spacing: normal;           /* バッジだけ字間を持たない */
}
.badge-muted   { background: #f1f1f5; color: #2352c8; }  /* 「プレスリリース」 */
.badge-primary { background: #2352c8; color: #ffffff; }  /* 「受付中」 */
```

**ボタンは角丸、バッジはピル。** この2つを混同しない。

### Cards

```css
.card {
  background: #ffffff;
  border-radius: 12px;              /* --radius-xl */
  box-shadow: 0 10px 30px -20px rgba(23,23,37,.2),
              0 16px 30px -30px rgba(23,23,37,.2);  /* --shadow-card */
  padding: 24px;
}
.card:hover {
  box-shadow: 0 30px 60px -20px rgba(23,23,37,.1),
              0 16px 40px -30px rgba(23,23,37,.1),
              0 0 0 1px rgba(23,23,37,.05);         /* --shadow-card-hover */
}
```

**影のぼかし半径に対して spread が大きな負の値**（`-20px` `-30px`）。
真下に落とさず、**要素の輪郭から少しだけにじませる**のがこのサイトの影の作り方。

### Inputs

```css
.input {
  background: #ffffff; color: #171725;
  border: 1px solid #d5d5dc; border-radius: 4px;
  padding: 10px 12px;
  font-size: 14px; font-weight: 400; line-height: 1.6;
  letter-spacing: 0.28px;
}
.input::placeholder { color: #9090a1; }
.input:focus { border-color: #2352c8; outline: 2px solid #eef5ff; }
.input[aria-invalid] { border-color: #d3403a; background: #ffede9; }
```

### Sections

- 既定は白 `#ffffff`
- 交互に `#f1f1f5`（`--color-bg-muted`）を敷く。**罫線でなく面色で区切る**
- カード内のさらに薄い面は `#fafafb`
- 最下部の CTA だけ `linear-gradient(48deg, #000c2a, #02010c)` に反転し、
  文字を `#ffffff` にする

---

## 5. Layout Principles

### Container

| 用途 | Max Width | トークン |
|------|-----------|---------|
| **標準コンテナ** | **1200px** | `--container-max` |
| ヘッダー | 1280px | `--container-header` |
| 左右パディング | 40px | `--container-padding` |
| 読み物・フォーム | 520px / 480px | — |

### Grid

- 特徴カード: 3カラム（1200px 内）
- 事例カード: 3カラム、モバイルで1カラム
- 導入ロゴ: 横スクロールのマーキー（両端に
  `linear-gradient(to right, #fff, transparent)` のフェードを重ねる）

### Spacing Scale

8px 基準。`px-2.5`（10px）/ `py-0.5`（2px）のような **4px の半段**も使う。

| Token | Value |
|-------|-------|
| 2XS | 2px |
| XS | 4px |
| S | 8px |
| M | 12px |
| L | 16px |
| XL | 24px |
| 2XL | 32px |
| 3XL | 40px |
| 4XL | 64px |

### Border Radius

| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | **8px**（md と同値）|
| `--radius-xl` | 12px |
| `--radius-2xl` | 16px |
| `--radius-full` | 9999px |

---

## 6. Depth & Elevation

**汎用スケールと用途別トークンの2系統を持つ。**

### 汎用（Tailwind 由来）

| Level | Shadow |
|-------|--------|
| sm | `0 1px 2px rgba(0,0,0,.05)` |
| md | `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)` |
| lg | `0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)` |
| xl | `0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)` |

### 用途別（このサイトの本体）

| Token | Shadow | 用途 |
|-------|--------|------|
| `--shadow-card` | `0 10px 30px -20px rgba(23,23,37,.2), 0 16px 30px -30px rgba(23,23,37,.2)` | カード |
| `--shadow-card-hover` | `0 30px 60px -20px …, 0 16px 40px -30px …, 0 0 0 1px …` | カードのホバー |
| `--shadow-floating` | `0 0 32px rgba(23,23,37,.18), 0 0 8px rgba(23,23,37,.08)` | 浮遊要素（offset 0）|
| `--shadow-ai-hero` | `0 10px 80px -12px color-mix(in srgb, #2352c8 30%, transparent)` | **青い影**。AIセクション |
| `--shadow-benefit-card` | `0 2px 20px color-mix(in srgb, #2352c8 20%, transparent), 0 2px 0 #2352c8` | 影 + 下辺の青い実線 |
| `--shadow-cta-card-hover` | `0 0 0 3px #e77623` | 影ではなく**橙のリング** |

**影に色を持たせる。** `color-mix(in srgb, #2352c8 …%, transparent)` で
ブランド色を薄めた影を落とし、黒い影と使い分ける。

---

## 7. Do's and Don'ts

### Do（推奨）

- 色は CSS Custom Property 経由で参照する（`var(--color-cta-primary)`）。
  hex を直書きしない
- `letter-spacing` は **px** で指定する（既定 `0.28px`）。em に換算しない
- 見出しの `line-height` は**サイズによらず 1.4** に揃える
- 見出しのウェイトは **600**。700 はボタンとインライン強調だけ
- ボタンの角丸は**ヘッダー内 4px / セクション内 8px**
- バッジは `border-radius: 9999px` のピル + `letter-spacing: normal`
- セクションの区切りは **`#ffffff` と `#f1f1f5` の面色差**でつくる
- 影は用途別トークンを使い、必要なら `color-mix` でブランド色を混ぜる
- グラフは `--color-chart-categorical-1` 〜 `-11` の順で使う（濃淡の対になっている）
- 橙 `#e77623` は「資料ダウンロード」以外に使わない

### Don't（禁止）

- `font-feature-settings: "palt"` を全体にかけない（Noto Sans JP はベタ組み）
- 見出しに `font-weight: 700` 以上を使わない（900 は「New Release」のみ）
- `letter-spacing` を `0.02em` のように em で書かない
- ボタンをピル（9999px）にしない（ピルはバッジ専用）
- 罫線でセクションを区切らない（面色で区切る）
- `--font-mono` を等幅として使わない（中身は Avenir Next）
- 明朝体を混ぜない
- ホバーで拡大・移動をさせない（色を1段階濃くするだけ）

---

## 8. Responsive Behavior

### Breakpoints

Tailwind CSS v4 の既定スケール（rem 指定）。

| Name | Width | 説明 |
|------|-------|------|
| sm | ≥ 40rem (640px) | — |
| **md** | **≥ 48rem (768px)** | **主境界**。ナビがドロワーから横並びへ |
| lg | ≥ 64rem (1024px) | カラム数の増加 |
| xl | ≥ 80rem (1280px) | ヘッダーが `--container-header` に届く |
| 2xl | ≥ 96rem (1536px) | — |

### モバイルでの変化

- グローバルナビ → ハンバーガー + ドロワー（`max-h: calc(100dvh - 4rem)`）
- ヒーロー見出し 60px → 24px（`text-2xl md:text-3xl lg:text-4xl`）
- カード 3カラム → 1カラム
- ボタンは `width: 100%`
- **`letter-spacing: 0.28px` と `line-height` は変えない**

### モーション

```css
@media (prefers-reduced-motion: reduce) { /* 5箇所で無効化 */ }
@media (hover: hover)                   { /* ホバー演出はここでのみ */ }
```

**タッチ端末でホバー演出を出さない。** `@media (hover: hover)` で囲う。

### タッチターゲット

- ヘッダーのボタンは `padding: 6px 12px` で高さ約 32px。
  モバイルでは 44px 以上に増やす
- グラデーション CTA は `height: 44px` で既に基準を満たす

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Surface Muted:   #f1f1f5（セクションの面）
Surface Subtle:  #fafafb
Primary:         #2352c8（hover #1337a1）
Secondary:       #171725（hover #3f3f4a）
Accent:          #e77623（資料DL専用 / hover #c3540a）
Text Primary:    #171725
Text Normal:     #3f3f4a
Text Secondary:  #6c6c7f
Border:          #d5d5dc（弱い罫は #f1f1f5）
Gradient:        linear-gradient(90deg, #2352c8, #67bcff)
Dark Section:    linear-gradient(48deg, #000c2a, #02010c)
JP/EN Font:      "Noto Sans JP", sans-serif（1本）
Hero Slide Font: YuGothic, "游ゴシック体", "游ゴシック", "Yu Gothic", sans-serif + palt
Base Size:       14px（body）/ 16px（読ませる本文）
Line Height:     1.6（14px）/ 1.7〜1.8（16px）/ 1.4（見出しすべて）
Letter Spacing:  0.28px（px 固定。em に換算しない）
Font Weight:     400 / 500 / 600（見出し）/ 700（ボタン）
Border Radius:   4px（ヘッダー内ボタン）/ 8px（セクション内ボタン）/ 12px（カード）/ 9999px（バッジ）
Shadow:          0 10px 30px -20px rgba(23,23,37,.2), 0 16px 30px -30px rgba(23,23,37,.2)
palt:            off（游ゴシックのヒーロー見出しだけ on）
Container:       1200px（標準）/ 1280px（ヘッダー）/ padding 40px
Breakpoint:      768px（主）/ 640 / 1024 / 1280 / 1536px
```

### プロンプト例

```
ログラス（Loglass）のデザインシステムに従って、経営ダッシュボードの一覧画面を作成してください。
- 地色は #ffffff。セクションの区切りは #f1f1f5 の面色差でつくり、罫線を引かない
- フォントは "Noto Sans JP", sans-serif の1本。明朝を混ぜない
- font-feature-settings は normal（palt をかけない）
- letter-spacing は 0.28px を px で指定する（em に換算しない）。バッジだけ normal
- line-height は見出しがサイズによらず 1.4、本文 14px は 1.6、16px は 1.7
- 見出しは font-weight 600（700 にしない）。ボタンだけ 700
- CTA は3系統:
    Primary  背景 #2352c8 / 文字 #fff / radius 8px / padding 10px 20px / 16px / 700
    Secondary背景 #171725 / 文字 #fff / radius 4px / padding 6px 12px / 14px / 500
    Outline  透明 / 文字 #171725 / 1px solid #d5d5dc / radius 4px
  ホバーは色を1段階濃くするだけ（#2352c8 → #1337a1）。拡大や影の追加をしない
- バッジは radius 9999px のピル / padding 2px 10px / 12px / 500 / letter-spacing normal
    muted   背景 #f1f1f5 / 文字 #2352c8
    primary 背景 #2352c8 / 文字 #fff
- カードは radius 12px、影は
  0 10px 30px -20px rgba(23,23,37,.2), 0 16px 30px -30px rgba(23,23,37,.2)
- グラフの系列色は #2352c8 → #d5e4fb → #29a4b3 → #bfebef → #37ac32 → #cdecc6 の順
  （濃・淡の対で並べる）
- 数値セルは font-variant-numeric: tabular-nums で桁を揃える
- 版面は 1200px 中央寄せ、左右パディング 40px。主ブレークポイントは 768px
- ホバー演出は @media (hover: hover) で囲い、
  @media (prefers-reduced-motion: reduce) で無効化する
```
