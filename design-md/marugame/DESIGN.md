# DESIGN.md — 丸亀製麺（MARUGAME SEIMEN）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-09-13 / 対象: `https://www.marugame-seimen.com/`, `/menu/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 生成りの地（`#fbf7ef`）に**明朝体だけで組む**。うどん屋の看板と暖簾の質感をそのまま Web に移したような設計で、ゴシック体は 10px の注記にしか出てこない
- **密度**: ゆったり。本文 16px、コピーの行間は **2.0〜2.3**。コンテナ幅 1200 / 960 / 880px の三段
- **キーワード**: 明朝、縦組み、ベタ組み、生成り、単一ウェイト

**このサイトの核心は3つある。**

1. **可視テキストの `font-weight` が全部 `400` である。** 太字が1つも無い。代わりに **TypeSquare（モリサワ）から4書体を配信**し、**書体と級数の差だけで階層をつくる**。見出しは秀英初号明朝、UI とナビは游明朝 Pr6N M、注記だけ游ゴシック Pr6N M——という使い分けで、ウェイトを一切使わない設計はこのリポジトリ収録サイトの中でも珍しい
2. **`writing-mode: vertical-rl` が実測 54 要素**。グローバルナビ（`メニュー` `こだわり` `お店を探す` `お持ち帰り` `公式アプリ`）とヒーローのコピーが**縦組み**。装飾ではなくナビゲーションの主動線が縦に流れる
3. **`font-feature-settings: "palt"` は実測 0 件。字詰めを一切しない。** `letter-spacing` も **`normal` が 600 要素**で既定であり、字間を開けるのは見出し・ナビ・惹句だけ。**明朝のベタ組み**がこのサイトの字組みの正体

**CSS Custom Properties は実質存在しない**（2ページとも `--swiper-theme-color` の1個のみ。これは Swiper の既定値でサイトの設計色ではない）。設計は CSS Modules のハッシュ付きクラス名（`header_o-header__menu-list__ns` 等）に載っている。

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Primary（紅）** | **`#c81432`** | **CSS 全文で 164 回**。可視テキスト 16 要素・面 14 要素。ロゴの角印、価格、強調、アクセント罫 |

> ブランド赤は**面を大きく塗るためではなく、点で効かせるために使う**。ヒーローもカードも生成り地のままで、赤が乗るのは角印・価格・小さなラベルに限られる。

### Neutral（ニュートラル）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Text Primary（墨）** | **`#44413c`** | **可視 88 要素で最多**。本文・ナビ・フッターのすべて。純黒ではなく茶みのある墨色 |
| Text Heading | `#000000` | 可視 15 要素。`h2` `h3` と大きな見出しのみ |
| Text Muted | `#666666` | 可視 9 要素。注記・日付 |
| Text on Dark | `#ffffff` | 写真上のコピー、フッター |
| **Background（生成り）** | **`#fbf7ef`** | ページ背景（`pageBackground.resolved` = `rgb(251,247,239)` / 根拠 `body`）。CSS 16 回 |
| **Surface（淡い面）** | **`#f2eee6`** | CSS 44 回。カード・セクションの面。背景より一段濃い生成り |
| Surface Gray | `#f2f2f2` | 汎用の淡いグレー面（5 要素） |
| Surface Dark | `#44413c` | フッターの濃い面。本文色と同一の値を面に使う |
| Surface Blue Gray | `#dee5ec` | 言語切替の面（2 要素） |

### Gradient（面のグラデーション）

```css
/* 木目・和紙を思わせるセクション見出しの帯 */
background: linear-gradient(rgb(229, 217, 200) 0px, rgb(211, 191, 163));   /* #e5d9c8 → #d3bfa3 */

/* 写真の下端を地に溶かすスクリム（カードのフェード） */
background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 90%, #ffffff 100%);

/* 写真上にコピーを載せるための暗いスクリム */
background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.3) 100%);
```

> `rgb(241, 205, 0)`（黄）と `rgb(39, 49, 59)`（紺）が可視要素に各 1〜5 件出るが、**CSS 全文に 1 回も現れない**（外部ウィジェット由来）。設計色として採用しないこと。

---

## 3. Typography Rules

### 3.1 和文フォント

**4書体すべて TypeSquare（モリサワ）の Web フォント配信**（`//wf.typesquare.com/...`）。ローカルフォントには依存しない。

| 書体 | 役割 |
|------|------|
| **秀英初号明朝**（`Shuei ShogoMincho`） | **見出し・惹句・ナビ・本文コピー**。このサイトの主役。DNP 秀英体の初号明朝で、筆の抑揚が強く看板文字の風格がある |
| **游明朝 Pr6N M**（`Yu Mincho Pr6N M`） | **`body` の既定／UI・ヘッダー・フッター・キャプション**。秀英が当たらない箇所を受ける穏やかな明朝 |
| **游明朝 Pr6N D**（`Yu Mincho Pr6N D`） | ごく一部のボタン（Demibold 相当の太さを持つ游明朝） |
| **游ゴシック Pr6N M**（`Yu Gothic Pr6N M`） | **10px の注記とコピーライトのみ**。サイト中で唯一のゴシック |

- **明朝体が主・ゴシック体が従**という、和文サイトとしては逆転した構成
- `@font-face` は 4 書体とも **`font-weight: Bold` と宣言されている**が、これは TypeSquare が生成する宣言の癖で、**computed の `font-weight` は全要素 400**。太さの指定として読まないこと

### 3.2 欧文フォント

- **専用の欧文フォントは無い。** 和文書体（秀英初号明朝・游明朝 Pr6N）の欧文グリフをそのまま使う
- Swiper 等のウィジェットが `Arial` を 13.3333px で使う箇所があるが、これはブラウザ既定であって設計ではない

> **`EB Garamond` / `Lora` / `Noto Sans` が `@font-face` で宣言されているが、実測ですべて `unloaded`**（`document.fonts` の status）。参照する要素が存在しない。**これらを設計フォントとして実装しないこと。**

### 3.3 font-family 指定

```css
/* body の既定（UI・ヘッダー・フッター・キャプション） */
font-family: "Yu Mincho Pr6N M", serif;

/* 見出し・惹句・ナビ・本文コピー（サイトの主役） */
font-family: "Shuei ShogoMincho", serif;

/* 注記・コピーライト（唯一のゴシック） */
font-family: "Yu Gothic Pr6N M", sans-serif;
```

**フォールバックの考え方**:
- **generic family が正しく `serif` / `sans-serif` に対応している**（明朝には `serif`、ゴシックには `sans-serif`）。このリポジトリには `Jost, serif`（ライオン）のように書体の分類とフォールバックが食い違う実装が複数あるが、**丸亀製麺は一致している**。新規実装でもこの対応を守ること
- Web フォント1つ＋generic のみという**短いチェーン**。TypeSquare が落ちたときは OS の明朝（ヒラギノ明朝 / 游明朝 / MS 明朝）が受ける前提

### 3.4 文字サイズ・ウェイト階層

**Weight は全行 400。** 階層は「書体 × 級数 × 字間」でつくる。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Copy | 秀英初号明朝 | 48px | 400 | **1.67** (80px) | 0.042em (2px) | `打ち立て茹でたて、夏は冷たく。` 白・**縦組み** |
| Page Title | 秀英初号明朝 | 48px | 400 | 1.33 (64px) | 0.027em (1.28px) | `h1` `メニュー` 白 |
| Section Title | 秀英初号明朝 | 38px | 400 | 1.47 (56px) | 0.05em (1.9px) | `h3` `うどん` |
| Statement | 秀英初号明朝 | 40px | 400 | 1.50 (60px) | **0.15em** (6px) | `北海道産小麦100％` 白。**最も字間が広い** |
| Tagline | 秀英初号明朝 | 30px | 400 | normal | **0.08em** (2.4px) | `ここのうどんは、生きている。` |
| Section Heading | 秀英初号明朝 | 24px | 400 | 1.50 (36px) | 0.05em (1.2px) | `h2` `おすすめ・限定メニュー` |
| Section Heading S | 秀英初号明朝 | 22px | 400 | 1.64 (36px) | normal | `h2` `お知らせ` |
| Lead | 秀英初号明朝 | 22px | 400 | **2.00** (44px) | normal | `使っているのは、北海道産小麦と塩と水だけ。` |
| Lead Wide | 秀英初号明朝 | 20px | 400 | **2.30** (46px) | 0.06em (1.2px) | `すべての店で、粉からつくる。` **最も行間が広い** |
| Sub Heading | 秀英初号明朝 | 18px | 400 | 1.67 (30px) | normal | `h3` `お店での注文方法` |
| **Body** | 秀英初号明朝 | **16px** | 400 | **2.00** (32px) | **0.12em** (1.92px) | **本文。字間が広い** |
| UI Default | 游明朝 Pr6N M | 16px | 400 | 1.50 (24px) | normal | ナビ・フッターの既定 |
| **Nav Item** | 秀英初号明朝 | **14px** | 400 | normal | **0.10em** (1.4px) | **縦組みのグローバルナビ** |
| Caption | 秀英初号明朝 | 14px | 400 | 1.43 (20px) | 0.05em (0.7px) | 日付・カードの補足 |
| Caption Mincho | 游明朝 Pr6N M | 12px | 400 | 1.83 (22px) | normal | カードの説明文 |
| Micro (Gothic) | 游ゴシック Pr6N M | 10px | 400 | 2.40 (24px) | normal | **コピーライトのみ。唯一のゴシック** |

### 3.5 行間・字間

- **本文・リードの行間**: **2.00〜2.30**。明朝のベタ組みを読ませるため、このリポジトリでも最も広い部類
- **見出しの行間**: **1.33〜1.67**。級数が上がるほど比率を下げる
- **字間の既定は `normal`（ベタ組み）**。実測で `normal` が 600 要素と圧倒的
- **字間を開けるのは4箇所だけ**:
  - 本文 16px → **0.12em**（1.92px）
  - ナビ 14px → **0.10em**（1.4px）
  - 見出し 24〜38px → **0.05em**
  - 惹句 40px → **0.15em**（6px。最大）

**ガイドライン**:
- **級数が大きいほど字間を広げる**（24px で 0.05em、40px で 0.15em）。明朝の大見出しは字面が詰まって見えるため、ここを空けるのがこのサイトの作法
- **本文 16px の 0.12em は意図的に広い。** 明朝＋行間 2.0 と組で成立しているので、行間を詰めるなら字間も見直すこと
- **`letter-spacing` は px に解決されて子要素へ継承される。** 例えばナビの 1.4px は、親で `0.1em`（14px 基準）として宣言された値。子で級数を変えても px は 1.4px のまま残る

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- コピーの改行は **`\n` を明示的に入れて制御している**（`打ち立て茹でたて、\n夏は冷たく。`）。自動折り返しに任せず、意味の切れ目で改行位置を決める
- 一部のコピーに **`​`（ゼロ幅スペース）** が入っており、折り返し可能位置の明示に使われている

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
/* このサイトでは使用しない */
font-feature-settings: normal;
```

- **`palt` は実測 0 件。字詰めを一切しない。**
- **理由は書体の側にある。** 秀英初号明朝も游明朝 Pr6N も、仮想ボディいっぱいに字面を設計した書体で、ベタ組みでちょうど良く見えるように作られている。ここに `palt` を掛けると詰まりすぎる
- **新規実装で `palt` を足さないこと。** このサイトの字組みは「ベタ組み＋広い `letter-spacing`」という、`palt` とは逆方向の設計

### 3.8 縦書き

**このサイトの主要なナビゲーションは縦組みである。** 実測 54 要素。

```css
/* グローバルナビ（ヘッダー左の縦並び） */
.header__menu-list {
  writing-mode: vertical-rl;
  font-family: "Shuei ShogoMincho", serif;
  font-size: 14px;
  letter-spacing: 0.1em;   /* 縦組みでは字送りになる */
}

/* ヒーローのコピー */
.key-visual__copy {
  writing-mode: vertical-rl;
  font-size: 48px;
  line-height: 1.67;
  letter-spacing: 0.042em;
}
```

**縦組みで守ること**:
- `writing-mode: vertical-rl` を当てると **`letter-spacing` は字送り（縦方向）、`line-height` は行間（横方向）になる**。横組みの感覚で値を決めない
- **行は右から左に流れる。** ナビの項目順は上から下・右から左
- 英数字を含めるときは `text-orientation: mixed`（既定）で縦中横にならない点に注意。`text-combine-upright: all` が要るのは2〜3桁の数字だけ
- ロゴ横のキャッチ `ここのうどんは、生きている。` も縦組み。**縦組みは装飾ではなくこのブランドの基本姿勢**として扱う

---

## 4. Component Stylings

### Buttons

**Primary（白地・角丸の面ボタン）**
- Background: `#ffffff`
- Text: `#44413c`
- Border Radius: **6px**
- Padding: 16px 32px 程度
- Font: `"Shuei ShogoMincho", serif` / 16px / **400**
- Shadow: `0 1px 2px rgba(0,0,0,0.16)`
- 例: `うどんづくりのこだわり` `メニュー一覧へ` `麺職人たち`

**Ghost（透明・角丸の枠ボタン）**
- Background: `transparent`
- Text: `#44413c`
- Border Radius: **6px**（一部 2px）
- 例: `うどん` `うどん弁当` `丸亀製麺の取り組み`

**Overlay Control（写真上の小さな操作ボタン）**
- Background: `rgba(0,0,0,0.2)`
- Text: `#ffffff`
- Border Radius: **2px**
- Font Size: 13.3333px（ブラウザ既定）
- 例: `一時停止` `Language`

> **ボタンにも `font-weight: 400` を使う。** 太字にしない。強調は級数と余白で作る。

### Cards

- Background: `#ffffff`
- Border Radius: **6px**
- Shadow: **`0 1px 2px rgba(0,0,0,0.16)`**（実測 39 要素で最多）
- 写真の下端に白のスクリム（3.5 の `linear-gradient` 参照）を重ねて地に溶かす
- 本文: 游明朝 Pr6N M 12px / line-height 1.83

### Section Band（セクション見出しの帯）

```css
background: linear-gradient(#e5d9c8 0%, #d3bfa3 100%);
box-shadow: inset 0 3px 6px rgba(0,0,0,0.16);   /* 内側の影で沈ませる */
```

- 和紙・木目を思わせる帯。**`inset` の影で「掘り込んだ」表現**にしている（実測 5 要素）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value | 用途 |
|-------|-------|------|
| XS | 8px | アイコンとラベルの間 |
| S | 12px | カード内の行間 |
| M | **16px** | **最頻の gap（実測 14 要素）** |
| L | **24px** | セクション内ブロック間（実測 8 要素）／`padding-top` の最頻値（19 要素） |
| XL | 40px | セクション間 |
| XXL | 80px | 大セクション間 |

### Container

| Width | 用途 |
|-------|------|
| **1200px** | 最大コンテナ（実測 29 要素で最多） |
| **960px** | 標準コンテンツ幅（26 要素） |
| **880px** | 本文カラム（19 要素） |

- 横幅 1440px のビューポートに対し、**本文は 880px まで絞る**。明朝の長文を読ませるための設計

### Grid

- カードは 2〜4 カラム、gap 16px / 24px
- 一部に `gap: 7%` の比率指定あり

---

## 6. Depth & Elevation

| Level | Shadow | 用途 | 実測 |
|-------|--------|------|------|
| 0 | `none` | 地の面・帯 | — |
| **1** | **`0 1px 2px rgba(0,0,0,0.16)`** | **カード・ボタン（最頻）** | **39 要素** |
| 1' | `0 1px 2px 1px rgba(0,0,0,0.1)` | 一部の浮いた要素 | 1 要素 |
| inset | `inset 0 3px 6px rgba(0,0,0,0.16)` | セクション帯を掘り込む | 5 要素 |
| inset' | `inset 0 3px 6px rgba(0,0,0,0.08)` | 淡い掘り込み | 4 要素 |

- **影は浅い1段のみ。** モーダル用の深い影は使わない
- **`inset` を「沈める」表現として積極的に使う**のがこのサイトの特徴

---

## 7. Do's and Don'ts

### Do（推奨）

- **すべてのテキストを `font-weight: 400` で組む。** 階層は書体（秀英初号明朝 / 游明朝 Pr6N M）と級数で作る
- **本文・リードの `line-height` は 2.0 以上**にする（16px なら 32px、20px なら 46px）
- **級数が大きい見出しほど `letter-spacing` を広げる**（24px で 0.05em、40px で 0.15em）
- **ナビゲーションとヒーローのコピーは `writing-mode: vertical-rl`** で縦に組む
- ブランド赤 `#c81432` は**点で効かせる**（角印・価格・小ラベル）
- 地は純白ではなく**生成り `#fbf7ef`**、面は一段濃い `#f2eee6`
- 本文色は純黒ではなく**墨色 `#44413c`**
- `font-family` の generic は**明朝に `serif`、ゴシックに `sans-serif`** を正しく対応させる

### Don't（禁止）

- **`font-weight: 700` / `bold` を使わない。** このサイトに太字は存在しない。太く見せたいときは級数を上げる
- **`font-feature-settings: "palt"` を足さない。** 秀英初号明朝・游明朝 Pr6N はベタ組み前提の設計で、詰めると崩れる
- **本文をゴシック体で組まない。** ゴシック（游ゴシック Pr6N M）は 10px のコピーライトにしか使わない
- **`line-height: 1.5` 以下で本文を組まない。** 明朝＋広い字間との組で 2.0 が要る
- **ブランド赤でヒーローやセクションを塗り潰さない。** 面は生成り系で通す
- `EB Garamond` / `Lora` / `Noto Sans` を実装しない（宣言はあるが実測 `unloaded`）
- カルーセルの `Arial` 13.3333px を設計値として写さない（ブラウザ既定）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 768px | `mobile-header` に切り替わる（別コンポーネント） |
| Tablet | ≤ 1024px | コンテナを 960px → 100% に |
| Desktop | > 1024px | コンテナ 1200 / 960 / 880px |

- **ヘッダーはデスクトップ（`header_o-header`）とモバイル（`mobile-header_o-mobile-header`）で別実装**。縦組みナビはデスクトップ側にのみ存在する
- **モバイルでは縦組みナビを横組みのドロワーに置き換える**。狭い画面で縦組みを維持すると1画面に収まらないため

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- ヒーローコピー 48px → モバイルでは 30〜38px 程度
- 本文 16px は据え置き（`line-height: 2.0` と `letter-spacing: 0.12em` も維持）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #c81432   (紅。点で効かせる)
Text Color:    #44413c   (墨。純黒は使わない)
Heading Color: #000000
Background:    #fbf7ef   (生成り)
Surface:       #f2eee6

Font (見出し・本文): "Shuei ShogoMincho", serif      /* 秀英初号明朝 */
Font (UI・既定):     "Yu Mincho Pr6N M", serif        /* 游明朝 Pr6N M */
Font (注記のみ):     "Yu Gothic Pr6N M", sans-serif   /* 游ゴシック Pr6N M */

Body Size:      16px
Font Weight:    400 （全要素。太字は存在しない）
Line Height:    2.0  （本文）/ 1.5〜1.67（見出し）
Letter Spacing: 0.12em（本文）/ 0.05em（見出し）/ normal（既定）
palt:           使わない
Border Radius:  6px （カード・ボタン）
Shadow:         0 1px 2px rgba(0,0,0,0.16)
```

### プロンプト例

```
丸亀製麺のデザインシステムに従って、メニュー一覧ページを作成してください。

- 背景は生成り #fbf7ef、カードの面は白、セクションの面は #f2eee6
- 本文色は #44413c（純黒 #000 は h2/h3 の見出しだけ）
- 見出しと本文は "Shuei ShogoMincho", serif（明朝）。UI とフッターは "Yu Mincho Pr6N M", serif
- すべてのテキストを font-weight: 400 で組む。太字は一切使わない
- 本文は 16px / line-height: 2.0 / letter-spacing: 0.12em
- セクション見出しは 24px / line-height: 1.5 / letter-spacing: 0.05em
- font-feature-settings: "palt" は使わない（ベタ組み）
- グローバルナビは writing-mode: vertical-rl の縦組み、14px / letter-spacing: 0.1em
- カードは border-radius: 6px、box-shadow: 0 1px 2px rgba(0,0,0,0.16)
- 価格とラベルにだけブランド赤 #c81432 を使う。面は塗らない
- コンテナは最大 1200px、本文カラムは 880px に絞る
```
