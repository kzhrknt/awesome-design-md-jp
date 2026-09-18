# DESIGN.md — 熊本市現代美術館（CAMK）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-18 / 対象: `https://www.camk.jp/`, `/exhibition/placard/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地に黒の文字、アクセントは緑 1 色。** 展覧会のビジュアルを主役にし、UI は徹底して引く。見出しは大きく**細く**（weight 300）、本文は行間 2.00 でゆったり流す
- **密度**: 中。トップは展覧会・イベント・コレクションの定義リストを積む構成。可視テキスト 154 要素のうち 117 要素が同じ字間で組まれている
- **キーワード**: 10px ルート、細い大見出し、CAMK グリーン、不透明度で作る階層、角丸 4px

**このサイトの核心は4つある。**

1. **`html { font-size: 10px }`。** rem は **×10** で読む。`1.45rem = 14.5px`、`1.575rem = 15.75px` のように **0.5px / 0.25px 刻みの半端なサイズが並ぶ**のはこのため。**px 換算を 16px 基準でやると全部ずれる**
2. **字間は rem 宣言の 5 段階。** 既定は **`0.01rem`（= 0.1px）で可視 356 / 117 要素**。詰めるのは **ヘッダーナビ `-0.03rem`（-0.3px、37 要素）** と **展覧会の会期表示 `-0.05rem`（-0.5px、128 要素）** だけ。**px に読み替えず rem のまま書く**
3. **大見出しが weight 300（Light）。** `h2` 32px / 300、`h3` 28px / 300。**太字で強くするのではなく、大きく細くして静かにする**。逆に小さいラベルほど 500 / 600 と太くする
4. **黒は 1 色だが、不透明度で 7 段階に割っている。** `rgba(0,0,0,.9)` → `.85` → `.8` → `.75` → `.65` → `.55` → `.5`。**グレーの hex を増やさず alpha で階層を作る**

`font-feature-settings: "palt"` は **0 要素**（CSS 全文でも 0 回）。CSS Custom Properties も **0 個**（`customPropertiesSummary.own = 0`）。**設計トークンは持たず、CSS に直値で書く実装**。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **CAMK Green** | **`#5bb016`** | CSS 全文で **27 回**。**可視 35 要素**（トップ）。開館日の告知、カテゴリ見出し、`詳しく見る`、`お知らせ` バッジの面、`開催中／入場無料` の帯、現在の言語（`日本語`） |
| Green 85% | `rgba(91, 176, 22, 0.85)` | ブログの日付（可視 5 要素） |
| **Dark Chip** | **`#333333`** | 展覧会ページの `みどころ１` バッジの面（可視 3 要素）。**緑を使わない唯一のバッジ** |

> **緑は「開いている／今やっている」を示す色。** 日付・会期・カテゴリ・リンク誘導がすべて緑で、**それ以外の文字は黒**。装飾として緑を撒かない。

### Neutral（ニュートラル）

**このサイトのグレーは hex ではなく `rgba(0,0,0,α)`。**

| 役割 | 実装値 | 用途 | 実測 |
|------|--------|------|------|
| Text Primary | **`#000000`** | 見出し・本文 | 可視 **449 / 112 要素**（最多） |
| Title | `rgba(0, 0, 0, 0.9)` | 一覧のタイトル行 | 7 要素 |
| Breadcrumb | `rgba(0, 0, 0, 0.85)` | パンくず | 2 要素 |
| Nav Link | `rgba(0, 0, 0, 0.8)` | `English` などのナビ | 5 要素 |
| Section Link | `rgba(0, 0, 0, 0.75)` | ページ内リンク | 4 要素 |
| Description | `rgba(0, 0, 0, 0.7)` / `0.65` | 説明文・キャプション | 9 / 8 要素 |
| Date Muted | `rgba(0, 0, 0, 0.55)` | 会期 | 1 要素 |
| Latin Sub | `rgba(0, 0, 0, 0.5)` | 英語併記（`Art Communication`） | 30 要素 |
| Text on Color | `#ffffff` | 緑・黒の面の上 | 18 / 16 要素 |
| Surface Gray | `#eeeeee` | 検索欄の丸い閉じるボタン | — |
| Background | `#ffffff` | ページ背景（`viewportTopBySample 12/12`） | — |

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体（サイト唯一の和文書体）**: **Noto Sans JP**（Web フォント。300 / 400 / 500 / 600 を `loaded` 済み）
- **明朝体は使わない。** サイト全体で 1 要素も無い
- フォールバックは **`sans-serif` のみ**。ヒラギノや游ゴシックを書かない**割り切った 2 段スタック**

### 3.2 欧文フォント

- **Lato**（Web フォント。300 / 400 を `loaded` 済み）。**日付・時刻・`MENU` など数字と英字だけ**に使う
- **和文より先に置く**（`Lato, "Noto Sans JP", sans-serif`）。Lato に無いグリフは Noto Sans JP が受ける

### 3.3 font-family 指定

```css
/* 本文・見出し・UI（サイト既定） */
font-family: "Noto Sans JP", sans-serif;

/* 日付・時刻・英字ラベル */
font-family: Lato, "Noto Sans JP", sans-serif;

/* ルート。rem はすべて ×10 で読む */
html { font-size: 10px; }
```

**フォールバックの考え方**:
- **和文は 2 段だけ。** `"Noto Sans JP", sans-serif` 以上は書かない
- **欧文を混ぜたい箇所だけ Lato を先頭に足す。** 和文は必ず後ろに残す（`Lato, "Noto Sans JP", sans-serif`）
- **`html { font-size: 10px }` を先に決める。** これを 16px のまま `1.45rem` と書くと 23.2px になり、設計が崩れる

### 3.4 文字サイズ・ウェイト階層

**rem 宣言（×10）と px 実測を併記する。**

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| **Page Title** | Noto Sans JP | **3.2rem = 32px** | **300** | **1.20** (38.4px) | 0.01rem | **展覧会名。Light で大きく** |
| **Section Heading** | Noto Sans JP | **2.8rem = 28px** | **300** | **1.60** (44.8px) | 0.01rem | `展覧会のみどころ` |
| **Event Date（大）** | Lato | **2.4rem = 24px** | **600** | 1.00 | **-0.05rem = -0.5px** | `2026.8.5（水） 〜 10.31（土）`。**唯一の大きな詰め（可視 128 要素）** |
| Sub Heading | Noto Sans JP | 2.1rem = 21px | 500 | 1.60 (33.6px) | 0.01rem | `みどころ１ 時を超える声と実践` |
| Card Title | Noto Sans JP | 2.0rem = 20px | 300 | 1.30 | 0.01rem | `プラカードのために` |
| Notice Bar | Noto Sans JP | 1.8rem = 18px | 500 | 1.00 | 0.01rem | `お知らせ`（白文字 / 緑面） |
| **Article Body** | Noto Sans JP | **1.5rem = 15px** | 400 | **2.00** (30px) | 0.01rem | **本文。行間 2.00** |
| Lead Body | Noto Sans JP | 1.575rem = 15.75px | 400 | 2.00 (31.5px) | 0.01rem | リード文。**15.75px という半端は 10px ルートの帰結** |
| Quote / Note | Noto Sans JP | 1.45rem = 14.5px | 400 | 2.00 (29px) | 0.01rem | 引用・注記 |
| **Global Nav** | Noto Sans JP | **1.45rem = 14.5px** | 400 | **1.80** | **-0.03rem = -0.3px** | `来館案内` `展覧会`。**ナビだけ軽く詰める（37 要素）** |
| Today Bar | Lato | 1.4rem = 14px | 500 | 1.00 | 0.01rem | `2026年9月18日（金） 本日は開館日`。**色 `#5bb016`** |
| Breadcrumb | Noto Sans JP | 1.35rem = 13.5px | 400 | 1.70 (22.95px) | 0.01rem | `ホーム ＞ 展覧会` |
| Category Label | Noto Sans JP | 1.3rem = 13px | 400 | 1.40 (18.2px) | 0.01rem | `ギャラリーⅠ・Ⅱ 開催予定の展覧会`。**色 `#5bb016`** |
| Caption | Noto Sans JP | 1.3rem = 13px | 400 | 1.60 | 0.01rem | 作品キャプション（`rgba(0,0,0,.7)`） |
| Chip | Noto Sans JP | 1.2rem = 12px | 500 | 1.00 | 0.01rem | `みどころ１`（白文字 / `#333333`） |
| **Menu Label** | **Lato** | **1.1rem = 11px** | **600** | 1.00 | **0.1rem = 1px** | `MENU`。**唯一の大きな字空け** |
| Latin Heading | Noto Sans JP | — | 400 | — | **0.08rem = 0.8px** | `Exhibition` `events`（和文見出しに添える英語） |
| Latin Year | Lato | — | 600 | — | **0.06rem = 0.6px** | `2026`（会期の年） |

### 3.5 行間・字間

- **本文の行間**: **2.00**（15px / 30px）。**トップ・下層とも最多（75 要素）**。日本語の読み物として標準〜広い
- **一覧の行間**: **1.60**（134 要素）／ナビ **1.80**（69 要素）
- **見出しの行間**: **1.20〜1.30**（32px の展覧会名で 1.20）。**サイズが大きいほど詰める**
- **字間は rem で 5 段階**:

| 用途 | 値 | 実測 |
|------|----|------|
| **既定（ほぼ全要素）** | **`0.01rem`**（0.1px） | 可視 **356 / 117 要素** |
| ヘッダーナビ | **`-0.03rem`**（-0.3px） | 37 要素 |
| 会期・日付（大） | **`-0.05rem`**（-0.5px） | 128 要素 |
| 会期の年・状態ラベル | `0.06rem` / `0.04rem` | 33 / 5 要素 |
| 英字ラベル・`MENU` | `0.08rem` / `0.1rem` | 4 / 1 要素 |

**ガイドライン**:
- **字間は `rem` で書く。** `html { font-size: 10px }` があるので `0.01rem = 0.1px`。**em にも px にも読み替えない**
- **既定は `0.01rem`。** 「字間を触らない」ではなく「ごく僅かに開ける」が既定値
- **詰めるのはナビと日付だけ。** 本文を詰めない
- **見出しは太くせず、大きく細く**（32px / 300）。**700 を使わない**（サイト全体で 0 要素）

### 3.6 禁則処理・改行ルール

- 展覧会名は折り返す前提（32px / line-height 1.20）
- 会期は `2026.9.19（土）〜 11.29（日）` を 1 行で保つ（`-0.05rem` で詰めるのはこのため）
- `word-break: break-all` は使わない

### 3.7 OpenType 機能

**このサイトは `font-feature-settings` を一切使っていない**（実測 0 要素 / CSS 全文で `palt` 0 回）。

- **`palt` を足さないこと。** 括弧の多い会期表記（`2026.9.19（土）`）は **`letter-spacing: -0.05rem`** で詰めている。**同じ場所に `palt` を重ねると詰まりすぎる**

### 3.8 縦書き

該当なし（`typography.verticalWriting` = 0 件）。展覧会のメインビジュアルは画像。

---

## 4. Component Stylings

**`border-radius` は 4px が既定**（可視 36 / 19 要素）。バッジは 2〜3px、丸ボタンは 50px。

### Buttons

**Notice Bar（お知らせ）**
- Background: **`#5bb016`** / Text: `#ffffff`
- Padding: **`8px 15px`**
- Border Radius: **`2px`**
- Font: 18px / **weight 500** / line-height 1.00 / letter-spacing 0.01rem

**Status Ribbon（開催中／入場無料）**
- Background: **`#5bb016`** / Text: `#ffffff`
- Padding: **`6px 10px`**
- Border Radius: **`0px 0px 4px 4px`**（画像の下端に貼り付く形）
- Font: 15px / weight 400

**Card Link（開催予定 … ギャラリー）**
- Background: `transparent` / Text: `#000000`
- Border: `1px solid transparent`（枠は持つが透明。ホバーで出す設計）
- Padding: **`10px 10px 20px`** / Border Radius: `0px`
- Font: 15px / weight 400

**Close Button（検索）**
- Background: `#eeeeee` / Text: `#000000`
- Border Radius: **`50px`** / Font: 16px

**Carousel Arrow**
- Background: `rgba(0, 0, 0, 0.2)` / Border Radius: **`50%`** / Padding: `12px 14px`
- 非選択のものは `rgba(0, 0, 0, 0.15)` / `border-radius: 50px`

### Badges / Chips

**Point Badge（みどころ１）**
- Background: **`#333333`** / Text: `#ffffff`
- Padding: **`8px 10px`**
- Border Radius: **`3px`**
- Font: **12px / weight 500 / letter-spacing 0.01rem**

### Cards

- Background: `#ffffff` / Border Radius: **`4px`**
- Shadow: **`none`**（サイト全体で影は 0 種）
- カードの区別は**画像と余白**。罫線も影も使わない

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 6px | ステータス帯の上下 |
| S | 10px | カード内側・バッジ内側 |
| M | 15px | 通知バーの左右 |
| L | 20px | カード下部 |
| XL | 40px〜 | セクション間 |

### Container

- **Max Width: 1290px**（CSS 全文で 3 回。最頻）
- 本文カラム: **700px** / 中カラム: **652px** / 狭カラム: **528px**
- サイドの画像枠: 344px / 400px

### Grid

- トップは「カテゴリ見出し（緑・13px）／タイトル（15px）／説明（13px）」の定義リストを縦に積む
- 展覧会ページは「作家名の縦リスト（左）／メインビジュアル（右）」＋ページ内アンカー 4 本

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **サイト全体。影は 1 種も無い**（実測 0 種） |

> **影を使わないサイト。** 階層は**文字の不透明度**（`rgba(0,0,0,.9)` 〜 `.5`）と**緑か黒か**で作る。**カードに `box-shadow` を足さない。**

---

## 7. Do's and Don'ts

### Do（推奨）

- **`html { font-size: 10px }` を先に書く。** rem は ×10
- **字間は `rem`**（既定 `0.01rem` / ナビ `-0.03rem` / 会期 `-0.05rem`）
- **大見出しは 32px / weight 300**、小さいラベルほど 500〜600 と太くする
- **本文は 15px / line-height 2.00**
- 日付・時刻・英字は **Lato を先頭に**（`Lato, "Noto Sans JP", sans-serif`）
- **グレーは `rgba(0,0,0,α)` で作る**（`.9` `.85` `.8` `.75` `.65` `.55` `.5`）
- 緑 `#5bb016` は**「開いている・今やっている・次に読む」**にだけ使う
- `border-radius` は **4px** を既定、バッジは 2〜3px

### Don't（禁止）

- **`font-feature-settings: "palt"` を足さない**（実サイトは 0 要素。会期は `-0.05rem` で詰めている）
- **rem を 16px 基準で換算しない**（`1.45rem` は 23.2px ではなく **14.5px**）
- **字間を px や em に読み替えない**（実サイトは全部 rem）
- **見出しに weight 700 を使わない**（サイト全体で 0 要素。**最大でも 600**）
- **本文を詰めない**（詰めるのはナビと日付だけ）
- **グレーの hex（`#666666` `#999999`）を足さない**（alpha で作る）
- **カードに影や枠線を足さない**（実サイトは影 0 種）
- 明朝体を混ぜない（サイト全体で 0 要素）

---

## 8. Responsive Behavior

### Breakpoints

**モバイルファースト。`min-width` で積み上げる。**

| Name | Width | 実測（CSS 全文の出現数） |
|------|-------|------|
| SP-L | **≥ 400px** | 2 |
| Tablet-S | **≥ 541px** | 2 |
| Tablet | **≥ 600px** | 3 |
| **Tablet-L** | **≥ 768px** | **3** |
| **PC** | **≥ 960px** | **3** |
| PC-L | ≥ 1024px / ≥ 1100px | 1 / 1 |
| **PC-XL** | **≥ 1280px** | **3** |
| Wide | ≥ 1440px | 1 |

### タッチターゲット

- 通知バー（18px + 上下 8px = 34px 高）、ステータス帯（15px + 上下 6px = 27px 高）は **44px を下回る**
- **モバイルではこれらを 44px まで伸ばすこと**。カルーセルの丸ボタン（12px 14px の padding）も同様

### フォントサイズの調整

- 本文 15px、ナビ 14.5px はブレークポイントをまたいで固定
- 展覧会名 32px はモバイルで縮む。**縮めても weight 300 と line-height 1.20 は維持する**

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
CAMK Green: #5bb016
Dark Chip:  #333333
Text:       #000000
Grays:      rgba(0,0,0,.9) / .85 / .8 / .75 / .65 / .55 / .5
Surface:    #eeeeee
Background: #ffffff

html { font-size: 10px }   ← rem は ×10
Font (JP): "Noto Sans JP", sans-serif
Font (EN): Lato, "Noto Sans JP", sans-serif

Body:     1.5rem (15px) / weight 400 / line-height 2.00 / letter-spacing 0.01rem
Nav:      1.45rem (14.5px) / weight 400 / line-height 1.80 / letter-spacing -0.03rem
Title:    3.2rem (32px) / weight 300 / line-height 1.20
Date:     Lato 2.4rem (24px) / weight 600 / letter-spacing -0.05rem
Border Radius: 4px（バッジ 2〜3px / 丸ボタン 50px）
Shadow: none
Container: 1290px（本文 700px）
Breakpoints: min-width 600 / 768 / 960 / 1280px
palt: 使わない / weight 700: 使わない
```

### プロンプト例

```
熊本市現代美術館（CAMK）のデザインシステムに従って、展覧会詳細ページを作成してください。
- html { font-size: 10px } を先に書き、以降のサイズはすべて rem（×10）で指定する
- font-family は "Noto Sans JP", sans-serif。日付と英字だけ Lato, "Noto Sans JP", sans-serif
- 展覧会名は 3.2rem / weight 300 / line-height 1.20（太字にしない）
- 本文は 1.5rem / line-height 2.00 / letter-spacing 0.01rem
- ヘッダーナビは 1.45rem / letter-spacing -0.03rem、会期は Lato 2.4rem / weight 600 / letter-spacing -0.05rem
- font-feature-settings: "palt" は使わない
- アクセント色は #5bb016 のみ。開館情報・カテゴリ見出し・「詳しく見る」に使う
- 本文以外のグレーは rgba(0,0,0,0.9) 〜 rgba(0,0,0,0.5) の不透明度で作る（グレーの hex を足さない）
- border-radius はカード 4px、バッジ 2〜3px。box-shadow は使わない
- コンテナ 1290px、本文カラム 700px、ブレークポイントは min-width 600/768/960/1280px
```
