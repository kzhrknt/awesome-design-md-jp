# DESIGN.md — スマートバンク（SmartBank, Inc.）

> 株式会社スマートバンク（https://smartbank.co.jp/）のデザイン仕様書。
> 2019 年創業のフィンテックスタートアップ。家計簿プリペイドカード「B/43」を経て、現在は AI 家計管理アプリ「ワンバンク」を提供する。
> 最大の特徴は、**サイトが「デザインシステムそのもの」で組まれていること**。`:root` に **371 個の CSS Custom Properties** が載っており、色・寸法・タイポグラフィ・モーション・グラデーションが全部トークン化されている。しかも **iOS / Android / Web の 3 プラットフォーム分のフォントファミリ**が同じ層で定義される（`--font-family-ios-japanese` 等）。**アプリの design token をそのまま Web に流している**構成で、コーポレートサイトとしては極端に体系化されている。
> 和文は **Noto Sans JP**、欧文の見出し・ナビは **Poppins**。`font-feature-settings: "palt"` が全域。`letter-spacing` は全域 `normal`。
> 見どころは 2 つ。ひとつは **文字サイズが 128 ÷ n（n = 1〜12）の調和数列**でできていること。もうひとつは **面色がすべて `background-image: linear-gradient()` 経由**で塗られていること（後述。抽出スクリプトを騙す実装）。
> 実サイトの computed style 実測（2026-07-30 取得。トップ＋ Culture）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地・黒文字・黒ピル。差し色はグラデーション 1 本だけ。** UI の面はほぼ無彩色（白 / `#f5f5f5` / 黒）で組み、彩度はヒーロー見出しの**コーラル→サン（`#ff5c4d` → `#ffbe18`）のグラデーション文字**と、写真だけが持つ。金融サービスの信頼感を無彩色で、プロダクトの体温をグラデーションで出す配分
- **スマートバンクについて**: プリペイドカードのアプリなので、**トークンにプロダクト固有の概念がそのまま入っている**。`--color-prepaid-card-my-card-*`（自分のカード＝コーラル）、`--color-prepaid-card-pair-card-*`（ペアカード＝ミント）、`--color-prepaid-card-junior-card-*`（ジュニアカード＝スカイ）という 3 種のカード色が、色スケールとグラデーションの両方で定義されている。**カードの種類を色で見分けさせる設計が、トークン層に刻まれている**
- **密度**: 低密度。1200px のコンテナに大きな写真ブロックと余白を交互に積む。文字は少なく、写真とグラデーションが画面を占める
- **キーワード**: 白地、黒ピル（radius 312px）、Noto Sans JP ＋ Poppins、`palt` 全域、128/n の調和数列、10 色 × 11 段のカラースケール、グラデーション文字
- **特徴**:
  - **ページ背景色を CSS で一切指定していない**。`html` も `body` も `background-color: rgba(0, 0, 0, 0)`。白地はブラウザ既定のキャンバスがそのまま出ている。**実装では `#ffffff` を明示すること**（ダークモードのユーザー設定で崩れるため）
  - **面色は `background-color` ではなく `background-image` で塗る**。黒ピルボタンは `background-image: linear-gradient(rgb(0,0,0), rgb(0,0,0))` ——「全ストップが同色のグラデーション」で、実質ソリッドな黒。`-appearance-matte` / `-appearance-gradient` を **1 プロパティで切り替える**ためにこうなっている。`background-color` を読むだけの実装からは「面色なし」に見える
  - **ヒーロー見出しは 1 行の中で 2 色を混ぜる**。「人々が**本当に欲しかったもの**をつくる。」の傍点部分だけが `linear-gradient(68.49deg, #ff5c4d 25%, #ffbe18 100%)` ＋ `background-clip: text`。前後は `rgba(0,0,0,0.87)` の黒。**強調を太さではなく色で作る**
  - **セクション見出しは「欧文＋和文」の 2 段**。`Product`（Poppins 25.6px / 600）の下に「プロダクト情報」（Noto Sans JP 12.8px / 700 / `rgba(0,0,0,0.6)`）。TOP MUSEUM と同じ型だが、こちらは欧文が Poppins のジオメトリックサンセリフ
  - **角丸は 8px（カード）と 312px（ピル）の 2 択**。トークンには 2/4/8/12/16/32px が定義されているが、**実際に見えるのは 8px と 312px だけ**。中間の角丸を使わないことで「四角いカード」と「完全な丸」のコントラストがはっきりする
  - `--letter-spacing-comfort: 2px` というトークンがあるが、**トップページでは 1 箇所も使われていない**（全域 `normal`）

---

## 2. Color Palette & Roles

> 実測値。トークンは **10 色 × 11 段（10 / 20 / 30 / 40 / 50 / 60 / 70 / 80 / 90 / 95 / 99）のスケール層**と、その上に載る**セマンティック層**の 2 階建て。実装では**必ずセマンティック層を参照する**（スケールを直接使わない）。

### Brand（ブランド）

- **Interactive Base** (`#1dd0b0`, `--color-interactive-base` = mint 60): **プライマリ。操作できるものの色**。選択状態 `--color-selected-base`、成功 `--color-impression-positive-base` も同じ値
- **Interactive Base Variant** (`#0fbea0`, mint 50): ホバー・プレス
- **Ink** (`rgba(0, 0, 0, 0.87)` = `#000000de`, `--color-text-default-high`): 文字とピルボタンの面。**コーポレートサイトで最も面積を持つ「ブランド色」は実質この黒**
- **Paper** (`#ffffff`): ページ地色

> **注**: ミント `#1dd0b0` は**アプリ側のプライマリ**で、コーポレートサイトの CTA は黒ピル。「ブランドカラー = CTA の色」と短絡しないこと。

### Gradient（差し色）

| Token | Value | 用途 |
|-------|-------|------|
| `--gradient-scale-coral-100` | `linear-gradient(68.49deg, #ff5c4d 25%, #ffbe18 100%)` | **ヒーロー見出しのグラデーション文字**／マイカード |
| `--gradient-scale-mint-100` | `linear-gradient(59.54deg, #1dd0b0 30%, #89dc65 100%)` | ペアカード |
| `--gradient-scale-sky-100` | `linear-gradient(90deg, #54c8e8 30%, #afe2e3 100%)` | ジュニアカード |

- 各グラデーションに **`-20`（不透明度 20%）/ `-60` / `-100` の 3 段**がある。`-20` は容器（container）、`-60` はスクリム、`-100` は面
- **角度もトークンの一部**。コーラルは 68.49deg、ミントは 59.54deg、スカイは 90deg。**流用時に角度を変えない**

### Surface（面）

- **Background Default Base** (`#ffffff`, `--color-background-default-base`): ページ・カードの地
- **Background Default Accent** (`#f9f6f2`, wood 99): **温かみのある生成りの面**。木調スケールの最も薄い段
- **Background Inverse Base** (`#141816`, stone 10): 反転セクションの地
- **Background Inverse Accent** (`#424645`, stone 30): 反転セクション内の面
- **List Surface** (`#f5f5f5`, stone 99): **求人・記事リンクカードの面**。トップページで最も出現回数が多い面色（10 回）
- **Scrim** (`rgba(0, 0, 0, 0.5)`, `--color-scrim`): モーダル背後の覆い

### Neutral（文字・罫）

- **Text Default High** (`rgba(0, 0, 0, 0.87)`): 見出し・本文
- **Text Default Mid** (`rgba(0, 0, 0, 0.6)`): 補助テキスト。**和文サブ見出しがこの段**
- **Text Default Low** (`rgba(0, 0, 0, 0.38)`): 無効状態
- **Text Inverse High / Mid / Low** (`#ffffff` / `rgba(255,255,255,0.7)` / `rgba(255,255,255,0.5)`): 反転面の文字
- **Border Default High / Mid / Low** (`rgba(0,0,0,0.4)` / `rgba(0,0,0,0.2)` / `rgba(0,0,0,0.1)`): 罫。**フォーカスリングは High**

> **注**: 文字色に純黒 `#000000` は使わない。すべて **alpha 付きの黒**（`0.87` / `0.6` / `0.38`）。面に対する不透明度で階層を作る設計なので、反転面でもそのまま成立する。

### Semantic（意味的な色）

| Role | Base | Base Variant | Container | On Container |
|------|------|--------------|-----------|--------------|
| Positive（成功） | `#1dd0b0` | `#0fbea0` | `#cff4ed` | `#176256` |
| Attention（注意） | `#eb923c` | `#dc8935` | `#f9e1d1` | `#684525` |
| Negative（エラー） | `#ff5c4d` | `#ee3b1c` | `#ffe6e3` | `#763831` |
| Promotion（訴求） | `#ffc919` | `#e9b700` | `#fff1cf` | `#705918` |
| AI（AI 機能） | `#a97ee1` | `#8b54c9` | `#efe2ff` | `#3e275a` |

- **4 スロット構成が全セマンティック色で共通**: `base`（面 / アイコン）、`base-variant`（ホバー）、`container`（薄い面）、`on-container`（薄い面上の文字）。**この 4 点セットは必ず組で使う**（container の上に base の文字を置かない）
- **`message-ai` にグレープ（紫）が割り当てられている**。AI 家計管理アプリなので「AI が言っていること」を色で区別する

### State（状態レイヤー）

| Token | Value | 用途 |
|-------|-------|------|
| `--color-state-default-hover` | `rgba(0, 0, 0, 0.12)` | ホバーの覆い |
| `--color-state-default-focused` | `rgba(0, 0, 0, 0.12)` | フォーカスの覆い |
| `--color-state-default-selected` | `rgba(29, 208, 176, 0.08)` | 選択（ミントの薄膜） |
| `--color-state-inverse-hover` | `rgba(255, 255, 255, 0.24)` | 反転面のホバー |
| `--opacity-state-disabled` | `0.38` | 無効状態 |

- 状態は**色を差し替えず、半透明の膜を重ねる**（Material 系の state layer 方式）。だから 10 色どのボタンでも同じ実装で成立する

### カラースケール（下層トークン）

10 色 × 11 段。**直接参照しない**が、セマンティック色を追加するときの原資になる。

| Hue | 50（代表値） | 用途の目安 |
|-----|------|-----------|
| mint | `#0fbea0` | プライマリ・成功・ペアカード |
| coral | `#ee3b1c` | エラー・マイカード |
| carrot | `#dc8935` | 注意 |
| sun | `#e9b700` | 訴求・キャンペーン |
| sky | `#64b6df` | ジュニアカード |
| marine | `#4e79ef` | 情報 |
| grape | `#8b54c9` | AI |
| peach | `#ea62a0` | 装飾 |
| wood | `#a9a089` | **温かみのある面（生成り〜茶）** |
| stone | `#8e908f` | **無彩色の面・文字** |

- 段は `10`（最暗）→ `99`（最明）。**`95` と `99` が薄い面用に 2 段用意されている**のが特徴で、`#f9f6f2`（wood 99）や `#f5f5f5`（stone 99）がここから来る

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP**（`--font-family-web-japanese`）。単独指定で、游ゴシック・ヒラギノへのフォールバックは持たない
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ（本文）**: **Open Sans**（`--font-family-web-latin`）
- **サンセリフ（見出し・ナビ）**: **Poppins**（`--font-family-web-corporate-accent`）。ジオメトリックサンセリフ。`Company` `Product` `News` `Media` `Blog` などの欧文ナビ・セクション見出しに使う
- **アクセント**: Montserrat（`--font-family-web-accent`）。トークンには定義されているが**トップページでは未使用**
- **等幅**: 定義なし

### 3.3 font-family 指定

```css
/* 本文・和文（既定） */
font-family: "Noto Sans JP", "Open Sans", apple-system, "system-ui", Roboto,
             "Lucida Grande", Helvetica, Arial, sans-serif;

/* 欧文見出し・ナビ（和文を含まない） */
font-family: Poppins, "Open Sans", apple-system, "system-ui", Roboto,
             "Lucida Grande", Helvetica, Arial, sans-serif;

/* 欧文見出しで和文が混じりうる場合 */
font-family: Poppins, "Noto Sans JP", "Open Sans", apple-system, "system-ui",
             Roboto, "Lucida Grande", Helvetica, Arial, sans-serif;
```

**フォールバックの考え方**:
- **和文優先**（`"Noto Sans JP"` が先頭）。和文の字形を Noto Sans JP に固定し、欧文は Noto Sans JP 内蔵の欧文グリフで組む
- **欧文見出しだけ Poppins を先頭に置いて逆転させる**。`Product` を Poppins で組み、和文が混じったら Noto Sans JP に落ちる
- `apple-system` → `system-ui` → `Roboto` の順に OS 既定へ落ちる保険付き

**マルチプラットフォームのトークン**:

| Token | Value | 備考 |
|-------|-------|------|
| `--font-family-ios-latin` | `"SF Pro Text"` | |
| `--font-family-ios-japanese` | `"SF Pro Text"` | **iOS では和欧を分けない**（SF Pro Text が和文も持つ） |
| `--font-family-android-latin` | `Roboto` | |
| `--font-family-android-japanese` | `"SF Pro Text"` | **Android にも SF Pro Text が指定されている**。実機では Roboto / Noto Sans CJK に落ちる想定 |
| `--font-family-web-latin` | `"Open Sans"` | |
| `--font-family-web-japanese` | `"Noto Sans JP"` | |

> **注**: `--font-family-android-japanese` に `"SF Pro Text"` が入っているのは、**Web からは検証できないトークン層の設定**。Web 実装ではこの値を流用しないこと。

### 3.4 文字サイズ・ウェイト階層

**文字サイズは 128 ÷ n（n = 1〜12）の調和数列**。隣り合う段の比が **2/1, 3/2, 4/3, 5/4, 6/5, 7/6, 8/7, 9/8, 10/9, 11/10, 12/11** と、きれいに `(n+1)/n` で並ぶ。

| Token | Value | ≈ 128 / n | 用途 |
|-------|-------|-----------|------|
| `--font-size-six-extra-large` | `128px` | 128 / 1（厳密） | 特大ディスプレイ |
| `--font-size-five-extra-large` | `64px` | 128 / 2（厳密） | **ヒーロー見出し** |
| `--font-size-four-extra-large` | `42.6672px` | 128 / 3 | ディスプレイ |
| `--font-size-three-extra-large` | `32px` | 128 / 4（厳密） | **セクション見出し（h3）** |
| `--font-size-two-extra-large` | `25.6px` | 128 / 5（厳密） | **欧文セクションラベル（Poppins）** |
| `--font-size-extra-large` | `21.332px` | 128 / 6 | リード文 |
| `--font-size-large` | `18.2864px` | 128 / 7 | 大きめ本文 |
| `--font-size-medium` | `16px` | 128 / 8（厳密） | **本文** |
| `--font-size-small` | `14.2224px` | 128 / 9 | **既定（body）・補助テキスト** |
| `--font-size-extra-small` | `12.8px` | 128 / 10（厳密） | キャプション・和文サブ見出し |
| `--font-size-two-extra-small` | `11.6368px` | 128 / 11 | **小ピルボタンのラベル** |
| `--font-size-three-extra-small` | `10.6672px` | 128 / 12 | 最小テキスト |

- **`14.2224px` のような値は端数の事故ではなく設計値**。`128 / 9 = 14.2222…` を丸めたもの。割り切れる 6 段（128 / 64 / 32 / 25.6 / 16 / 12.8）は厳密値、割り切れない 6 段は**小数第 4 位で丸められている**（ずれは最大 0.0013px）。実装では **px を直書きせず必ずトークンを参照する**
- 実測の階層:

| Role | Font | Size | Weight | Line Height | 備考 |
|------|------|------|--------|-------------|------|
| Hero (h1) | Noto Sans JP | 64px | 700 | 96px (1.5) | 一部にグラデーション文字 |
| Hero 欧文 | Poppins | 21.332px | 600 | 40px (1.875) | `Make things people truly wanted.` |
| Section 欧文 | Poppins | 25.6px | 600 | 48px (1.875) | `Product` |
| Section 和文 | Noto Sans JP | 12.8px | 700 | 24px (1.875) | 「プロダクト情報」／色 `rgba(0,0,0,0.6)` |
| Heading (h3) | Noto Sans JP | 32px | 700 | 64px (2.0) | 「ワンバンク」 |
| Card Title | Noto Sans JP | 16px | 700 | 28px (1.75) | |
| Body | Noto Sans JP | 16px | 400 | 28px (1.75) | |
| Body Small | Noto Sans JP | 14.2224px | 400 | 28px (1.97) | **body の既定** |
| Caption | Noto Sans JP | 12.8px | 400 | 24px (1.875) | |
| Button (S) | Noto Sans JP | 11.6368px | 700 | 20px (1.72) | |
| Button (M / L) | Noto Sans JP | 16px | 700 | 28px (1.75) | |
| Copyright | Poppins | 12.8px | 600 | 24px | `© SmartBank, Inc.` |

**ウェイトは 3 段のみ**:

| Token | Value |
|-------|-------|
| `--font-weight-normal` | `400` |
| `--font-weight-semi-bold` | `600` |
| `--font-weight-bold` | `700` |

- **和文は 400 / 700 の 2 段、欧文（Poppins）は 600** という使い分け。和文に 600 は使わない

### 3.5 行間・字間

**line-height は「3 密度 × 12 段」のトークン。すべて px 指定で、すべて 4 の倍数。**

| Size | comfort | normal | dense |
|------|---------|--------|-------|
| 128px | 224px | 192px | 160px |
| 64px | 112px | 96px | 80px |
| 42.6672px | 72px | 64px | 64px |
| 32px | 64px | 48px | 40px |
| 25.6px | 48px | 40px | 36px |
| 21.332px | 40px | 32px | 28px |
| 18.2864px | 32px | 28px | 24px |
| **16px（本文）** | **28px** | 24px | 20px |
| 14.2224px | 28px | 24px | 20px |
| 12.8px | 24px | 20px | 16px |
| 11.6368px | 20px | 20px | 16px |
| 10.6672px | 20px | 16px | 12px |

- **サイトは `comfort` を既定に使う**。本文 16px → 28px = **1.75**
- **line-height を比率ではなく px で持つ**ため、4px グリッドにベースラインが揃う。実装で比率に読み替えると崩れる
- **`letter-spacing` は全域 `normal`**。`--letter-spacing-comfort: 2px` は定義されているがトップページでは未使用。**和文に字間を入れない方針**

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- ヒーロー見出しは**手で改行位置を決めている**（「人々が本当に欲しかったものをつくる。」を 1 行に収める）。自動折り返しに任せない

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* 全域 */
```

- **`palt` が全要素に効いている**。見出しだけでなく本文・ボタン・ナビもすべて字詰めあり
- **例外はアイコンフォントの `<p>`／`<span>`（Arial）だけ**で、ここは `normal`
- `kern` は明示していない

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons

ボタンは `_rounded-button` の 1 コンポーネントで、`appearance`（matte / gradient）× `color`（neutral / inverse）× `size`（small / medium / large）× `width`（hug / fill）の組み合わせ。

**Primary（黒ピル・matte / neutral）**
- Fill: `background-image: linear-gradient(#000000, #000000)`（**`background-color` ではない**）
- Text: `#ffffff`
- Border Radius: `312px`（`--dimension-scale-312`。完全なピル）
- Font Weight: `700`
- サイズ:

| Size | Padding | Font Size | Line Height |
|------|---------|-----------|-------------|
| Small | `8px 24px` | `11.6368px` | `20px` |
| Medium | `12px 32px` | `16px` | `28px` |
| Large | `16px 48px` | `16px` | `28px` |

**Inverse（白ピル）**
- Fill: `#ffffff`
- Text: `rgba(0, 0, 0, 0.87)`
- Border Radius: `312px`
- Padding / Font: Primary と同じ

**実装時の注意**: 面色を `background-image: linear-gradient()` で持つのは **matte / gradient を 1 プロパティで切り替える**ため。ソリッドな見た目が欲しいだけなら `background-color` で実装して構わないが、**グラデーション版（`--gradient-scale-*-100`）と同じコンポーネントで扱いたい場合は `background-image` に寄せる**。

### Cards / List Links

- Background: `#f5f5f5`（stone 99）
- Border: なし
- Border Radius: `8px`（`--dimension-radius-medium`）
- Text: `rgba(0, 0, 0, 0.87)`
- Font Size: `14.2224px` / Weight `400`（タイトルは `16px` / `700`）
- 求人リンク・記事リンクはこのカードで統一される

### Inputs

- Background: `#ffffff`
- Border: `1px solid rgba(0, 0, 0, 0.2)`（`--color-border-default-mid`）
- Border Radius: `8px`
- Padding: `12px 16px`
- Font Size: `16px`（iOS の自動ズーム回避）
- **Focus**: `outline: 2px solid rgba(0, 0, 0, 0.4); outline-offset: 2px`
- Error: Border を `#ff5c4d`、メッセージを `#763831` on `#ffe6e3`

### Focus（全体）

```css
:focus { background-color: var(--color-state-default-focused); }  /* rgba(0,0,0,0.12) */
:focus-visible {
  outline: var(--dimension-border-large) solid var(--color-border-default-high); /* 2px / rgba(0,0,0,0.4) */
  outline-offset: var(--dimension-border-large);                                  /* 2px */
}
```

- **フォーカスリングにブランド色を使わない**。無彩色の黒 2px。反転面でも `--color-border-inverse-high` に差し替えるだけで成立する

### Badges

- 意味的なバッジは `container` + `on-container` の組で作る（例: 成功 = `#cff4ed` の面に `#176256` の文字）
- Border Radius: `312px`（ピル）または `8px`

---

## 5. Layout Principles

### Spacing Scale

**2 層構造**。`--dimension-scale-*` が原資、`--dimension-spacing-*` が意味づけ。

| Token | Value |
|-------|-------|
| `--dimension-spacing-three-extra-small` | `2px` |
| `--dimension-spacing-two-extra-small` | `4px` |
| `--dimension-spacing-extra-small` | `8px` |
| `--dimension-spacing-small` | `12px` |
| `--dimension-spacing-medium` | `16px` |
| `--dimension-spacing-large` | `24px` |
| `--dimension-spacing-extra-large` | `32px` |
| `--dimension-spacing-two-extra-large` | `48px` |
| `--dimension-spacing-three-extra-large` | `56px` |
| `--dimension-spacing-four-extra-large` | `72px` |
| `--dimension-spacing-five-extra-large` | `96px` |
| `--dimension-spacing-six-extra-large` | `128px` |

- `--dimension-scale-*` は `0 / 1 / 2 / 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 36 / 40 / 48 / 56 / 64 / 72 / 80 / 96 / 112 / 120 / 128 / 144 / 160 / 168 / 176 / 192 / 216 / 224 / 240 / 256 / 264 / 288 / 312 px` の 33 段。**最大値 312 がピルの radius にも使われている**
- **4px グリッド**。8px 未満は 1 / 2px の 2 段だけ（罫の太さ用）

### Border / Radius

| Token | Value | 用途 |
|-------|-------|------|
| `--dimension-border-medium` | `1px` | 通常の罫 |
| `--dimension-border-large` | `2px` | **フォーカスリング** |
| `--dimension-border-extra-large` | `4px` | 強調の罫 |
| `--dimension-radius-extra-small` | `2px` | |
| `--dimension-radius-small` | `4px` | |
| `--dimension-radius-medium` | `8px` | **カード（実使用）** |
| `--dimension-radius-large` | `12px` | |
| `--dimension-radius-extra-large` | `16px` | 画像ブロック（実使用） |
| `--dimension-radius-two-extra-large` | `32px` | 大きな画像ブロック（実使用） |
| （`--dimension-scale-312`） | `312px` | **ピルボタン（実使用）** |

### Container

- Max Width: `1200px`（既定）／ `960px`（読み物・テキスト主体のブロック）
- Padding (horizontal): フッターの実測は `72px`（`--dimension-spacing-four-extra-large`）。モバイルは `16px`〜`24px` に落とす

### Grid

- 求人・記事リストは 1 カラム（縦積み）。写真ブロックは 2〜3 カラム
- Gutter: `16px`（`--dimension-spacing-medium`）

---

## 6. Depth & Elevation

**影のトークンは存在しない。奥行きは面色（`#ffffff` / `#f5f5f5` / `#141816`）で作る。**

実サイトで使われている影は 2 つだけ。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **既定。カード・ボタンはすべてこれ** |
| 1 | `2px 2px 8px 2px rgba(0, 0, 0, 0.1)` | 例外的な浮き要素。`--dimension-scale-2` / `-2` / `-8` / `-2` から組む |
| Sticky | `0 -4px 24px rgba(0, 0, 0, 0.12)` | 画面下部に固定されるバー（上向きの影） |

- **影の値も寸法トークンから組む**（`box-shadow: var(--dimension-scale-2) var(--dimension-scale-2) var(--dimension-scale-8) var(--dimension-scale-2) ...`）。数値を直書きしない

### Motion

| Token | Value |
|-------|-------|
| `--duration-scale-*` | `0 / 50 / 100 / 150 / 200 / 250 / 300 / 350 / 400 / 450 / 500 / 550 / 600 / 700 / 800 / 900 / 1000 ms`（50ms 刻み） |
| `--cubic-bezier-feedback` | `cubic-bezier(0, 0, 1, 1)`（= linear。押した瞬間の反応） |
| `--cubic-bezier-motion-move` | `cubic-bezier(.83, 0, .17, 1)`（両端が強い ease-in-out。移動） |
| `--cubic-bezier-motion-enter` | `cubic-bezier(.24, 1, .32, 1)`（出だしが速い ease-out。登場） |
| `--cubic-bezier-motion-exit` | `cubic-bezier(.64, 0, .78, 0)`（ease-in。退場） |

- **登場と退場でイージングを分ける**。登場は速く始まってゆっくり止まり、退場はゆっくり始まって速く消える

---

## 7. Do's and Don'ts

### Do（推奨）

- **セマンティック層のトークンを参照する**（`--color-interactive-base`。`--color-scale-mint-60` を直接使わない）
- **文字サイズはトークンで指定する**。`14.2224px` を px 直書きしない（`128 / 9` の設計値）
- **line-height は px で指定する**（4px グリッドに乗せる）。比率に読み替えない
- `font-feature-settings: "palt"` を全域に効かせる
- **ページ背景に `#ffffff` を明示する**（原典は未指定でブラウザ既定に頼っている）
- 状態表現は色の差し替えではなく **`--color-state-*` の半透明の膜を重ねる**
- セマンティック色は `base` / `base-variant` / `container` / `on-container` の 4 点セットで組む
- 角丸は **8px（カード）と 312px（ピル）の 2 択**に寄せる

### Don't（禁止）

- **文字色に純黒 `#000000` を使わない**。`rgba(0, 0, 0, 0.87)` を使う
- **ミント `#1dd0b0` をコーポレートサイトの CTA 色に使わない**。CTA は黒ピル。ミントはアプリのプライマリ
- **グラデーションの角度を変えない**（コーラル 68.49deg / ミント 59.54deg / スカイ 90deg）
- **グラデーション文字を多用しない**。ヒーロー見出しの一部（1 ページに 1 箇所）だけ
- 和文に `font-weight: 600` を使わない（600 は Poppins 用）
- `letter-spacing` を和文に入れない（全域 `normal`）
- 中間の角丸（4px / 12px）を新規に持ち込まない
- `--font-family-android-japanese: "SF Pro Text"` を Web 実装に流用しない
- 影でカードを浮かせない（面色 `#f5f5f5` で階層を作る）

---

## 8. Responsive Behavior

### Breakpoints

**モバイルファースト（`min-width`）**。

| Name | Query | 説明 |
|------|-------|------|
| Mobile | 既定 | 〜639px |
| Small | `min-width: 640px` | 大きめスマホ |
| Tablet | `min-width: 768px` | タブレット |
| Desktop | `min-width: 1024px` | デスクトップ |
| Wide | `min-width: 1400px` | ワイド |

- `@media screen and not (min-width: 768px)` という **`not` 付きの記法**を使う（`max-width` を書かない）

### タッチターゲット

- ピルボタン Small で `20px + 8px × 2 = 36px`、Medium で `28px + 12px × 2 = 52px`。**主要 CTA は Medium 以上を使う**（44px 基準を満たす）

### フォントサイズの調整

- 本文はブレークポイントで変えない（`14.2224px` / `16px` 固定）
- ヒーロー見出しは `64px`（`five-extra-large`）→ モバイルで `32px`（`three-extra-large`）へ**段を飛ばして落とす**（間の `42.6672px` は経由しない）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary (CTA):     #000000（黒ピル・radius 312px）
Interactive:       #1dd0b0（--color-interactive-base / アプリのプライマリ）
Accent Gradient:   linear-gradient(68.49deg, #ff5c4d 25%, #ffbe18 100%)
Text:              rgba(0, 0, 0, 0.87)
Text Secondary:    rgba(0, 0, 0, 0.6)
Background:        #ffffff
Surface:           #f5f5f5
Surface Warm:      #f9f6f2
Font (JA):         "Noto Sans JP", "Open Sans", apple-system, "system-ui", Roboto, "Lucida Grande", Helvetica, Arial, sans-serif
Font (EN 見出し):  Poppins, "Open Sans", apple-system, "system-ui", Roboto, Helvetica, Arial, sans-serif
Body Size:         14.2224px（= 128/9） / 16px（= 128/8）
Line Height:       28px（px 指定・4px グリッド）
Letter Spacing:    normal
Font Feature:      "palt"（全域）
Radius:            8px（カード） / 312px（ピル）
Focus:             outline: 2px solid rgba(0,0,0,0.4); outline-offset: 2px
```

### プロンプト例

```
スマートバンクのデザインシステムに従って、料金プランの比較セクションを作成してください。
- ページ背景: #ffffff を明示指定
- カード: 背景 #f5f5f5 / radius 8px / 影なし
- 見出し: Noto Sans JP 32px / 700 / line-height 64px
- 欧文ラベル: Poppins 25.6px / 600 を上段、和文 12.8px / 700 rgba(0,0,0,0.6) を下段の 2 段組み
- 本文: 16px / 400 / line-height 28px / letter-spacing normal
- font-feature-settings: "palt" を全体に適用
- CTA: 黒ピル（背景 #000000 / 文字 #ffffff / radius 312px / padding 16px 48px / 16px / 700）
- おすすめプランのバッジのみ #cff4ed の面に #176256 の文字
- 余白は 8 / 16 / 24 / 32 / 48 / 72px から選ぶ（4px グリッド）
```
