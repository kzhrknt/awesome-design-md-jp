# DESIGN.md — 東京都庭園美術館（Tokyo Metropolitan Teien Art Museum）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-01 / 対象: `https://www.teien-art-museum.ne.jp/`, `/exhibition/`

---

## 1. Visual Theme & Atmosphere

旧朝香宮邸というアール・デコ建築そのものが収蔵品である美術館。サイトもその性格を引き継ぎ、
**白ではなく温かみのあるグレージュ（`#ede8e2`）をページ地色**に敷き、写真をアーチ（半円）で
切り抜いて建物の開口部を思わせる構図をつくる。彩度は徹底して低く、差し色は「庭園」を想起させる
深緑と、展示種別を見分けるためのパステルの札だけ。

- **デザイン方針**: 静謐・端正。地色で品位をつくり、装飾ではなく余白と字間で格を出す
- **密度**: 低〜中。カード間の余白が広く、1画面あたりの情報量を抑えたメディア型
- **キーワード**: アール・デコ、グレージュ、深緑、アーチ、字間の広い端正な組版

**この美術館UIの特徴的な癖（他サイトと違う点）**

1. **ページ地色が白ではない**。`#ffffff` はカード面にだけ使う。地に白を敷くと別サイトになる
2. **letter-spacing が全要素 0.07em で統一**されている（後述 3.5）。1箇所だけ 0.12em の例外がある
3. **角丸が 5px / 3px / 50px の3値しかない**。中間の 8px・12px は使わない
4. **ボタンの左端だけ丸い**特殊形状（`50px 2px 2px 50px`）をヘッダーのユーティリティに使う

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値。すべて hex -->

### Brand（ブランド）

- **Teien Green** (`#00695b`): 深い緑。ロゴ、セカンダリボタンの文字、タブの選択状態、
  「募集中」タグ。**面として広く使わず、文字色・線・小さな面**に使うのが原則
- **Teien Mint** (`#7fbaaa`): 明るい青磁色。フッター手前の帯、区切りの面。Teien Green の対
- **Ink** (`#000000`): 主要CTAの面色。本文色も純黒

### Surface（面）

- **Page Background** (`#ede8e2`): **ページ地色**。温かいグレージュ。最も重要な1色
- **Surface White** (`#ffffff`): カード面
- **Surface Warm** (`#f9f7f3`): 開館情報などの薄い面
- **Surface Mint** (`#f2f7f7`): トピックス系セクションの面
- **Surface Pink** (`#f7f1f0`): 展覧会系セクションの面
- **Surface Gray** (`#c6d3d5`): フッターの面

### Category Chips（展示種別の札。ピル形）

| 種別 | 面 | 文字 |
|------|----|----|
| 展覧会 | `#f0df9d` | `#000000` |
| トピックス | `#b5cbed` | `#000000` |
| 重要なお知らせ | `#d82112` | `#ffffff` |

### Label / Status（角丸3pxの札）

| 用途 | 面 | 文字 |
|------|----|----|
| イベント | `#efbecd` | `#000000` |
| 開館日 | `#d8d065` | `#000000` |

### Semantic（意味的な色）

- **Danger** (`#d82112`): 重要なお知らせ。面色として使う唯一の高彩度
- **Attention** (`#b25300`): 「開催中」タグの文字＋枠。**線と文字だけで、面は塗らない**
- **Success / Open** (`#00695b`): 「募集中」タグ。Teien Green を流用

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文。純黒を使う
- **Text Accent** (`#00695b`): 補助操作の文字（検索、セカンダリボタン）
- **Heading Gold** (`#9b8821`): セクション見出しの金（`c-heading01 _gold`）
- **Border** (`#707070`): ボタン・入力の枠
- **Border Light** (`#d9d9d9`): カードの枠
- **Divider** (`#c6c6c6`): リセットボタンの面

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP（唯一の和文書体。明朝は使わない）
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ（UIラベル）**: Josefin Sans
  - 「Language」「Follow Us」など、**欧文だけで完結するUIラベル専用**
  - 和欧混植の本文には使わない（本文の欧文は Noto Sans JP の欧文グリフに任せる）

### 3.3 font-family 指定

```css
/* 本文・見出し・すべての和文 */
font-family: "Noto Sans JP", sans-serif;

/* 欧文のみのUIラベル（Language / Follow Us 等） */
font-family: "Josefin Sans", sans-serif;
```

**フォールバックの考え方**:
- 和文フォント1つ ＋ generic family のみ。**プラットフォーム依存フォント（游ゴシック・ヒラギノ）を
  チェーンに入れていない**。Webフォント単独で字形を固定する方針
- 欧文を先に置かない。Noto Sans JP の欧文グリフをそのまま使う

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Page Heading | Noto Sans JP | 32px | 500 | 1.43 (45.87px) | **0.12em** (3.84px) | 下層ページのタイトル。字間の例外 |
| Section Heading | Noto Sans JP | 24px | 500 | 1.5 (36px) | 0.07em (1.68px) | 一覧の展覧会名 |
| Feature Heading | Noto Sans JP | 22px | 500 | 1.5 (33px) | 0.07em (1.54px) | トップの主展覧会名 |
| Card Title | Noto Sans JP | 18px | 500 | 1.5 (27px) | 0.07em (1.26px) | カード見出し |
| Lead / Desc | Noto Sans JP | 17px | 400 | 1.5 (25.5px) | 0.07em (1.19px) | 会場名などの説明 |
| Body | Noto Sans JP | 16px | 400 | 1.5 (24px) | 0.07em (1.12px) | 本文の基準 |
| Nav | Noto Sans JP | 16px | 500 | 1.31 (21px) | 0.07em (1.12px) | グローバルナビ |
| List Title | Noto Sans JP | 15px | 500 | 1.53 (23px) | 0.07em (1.05px) | お知らせの見出し |
| Sub Nav | Noto Sans JP | 13px | 500 | 1.5 (19.5px) | 0.07em (1.12px) | 上部ユーティリティ |
| Caption | Noto Sans JP | 13px | 400 | 1.5 (19.5px) | 0.07em (0.91px) | 日付・住所 |
| Tag | Noto Sans JP | 12px | 400–500 | 1.5 | 0.07em (0.84px) | 札・タグ |
| Copyright | Noto Sans JP | 10px | 400 | 1.8 (18px) | 0.07em (0.7px) | 最小テキスト |
| Latin Label | Josefin Sans | 12px | 500 | 1.25 (15px) | 0.05em (0.6px) | Language 等 |

### 3.5 行間・字間

**このサイトで最も重要な規則**

- **letter-spacing は全要素 `0.07em` で統一**。16px なら 1.12px、13px なら 0.91px、
  10px なら 0.7px と、**サイズが変わっても比率が一定**。実測でこれが崩れる箇所は2つだけ:
  - 下層ページのタイトル（`c-heading02`）のみ **`0.12em`**。ここだけ大きく空けて格を出す
  - Josefin Sans の欧文ラベルのみ **`0.05em`**（欧文は詰め気味）
- **line-height は 1.5 が基準**。日本語サイトとしてはやや詰まった値だが、
  字間 0.07em が空いているぶん行が伸びるため、密度としては釣り合っている
- 例外: 下層タイトルのみ 1.43、コピーライトのみ 1.8

```css
/* サイト全体の基準 */
body {
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.07em;
}

/* 下層ページのタイトルだけ字間を広げる */
.page-heading {
  font-size: 32px;
  font-weight: 500;
  line-height: 1.43;
  letter-spacing: 0.12em;
}
```

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: anywhere;
line-break: strict;
```

- 展覧会名に `―`（ダーシ）や `～` が多用されるため、**約物を行頭に送らない**設定が要る
- 「ルーシー・リー展―東西をつなぐ優美のうつわ―」のような長い正式名称は
  2行に折り返す前提でカード高さを設計する

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使わない */
```

- **`palt` は全要素で無効**（実測 `font-feature-settings: normal`）
- 字詰めは palt ではなく **`letter-spacing: 0.07em` で「空ける」方向**に統一している。
  palt を足すと字間の設計が崩れるので**入れてはいけない**

### 3.8 縦書き

該当なし。全ページ横組み。

---

## 4. Component Stylings

### Buttons

**Primary（チケット購入などの主要CTA）**
- Background: `#000000`
- Text: `#ffffff`
- Padding: `11px 30px 12px`（下1px多い非対称）
- Border Radius: `5px`
- Font Size: `16px` / Weight: `500` / Letter Spacing: `0.07em`

**Secondary（一覧へ、詳細へ）**
- Background: `transparent`
- Text: `#00695b`
- Border: `1px solid #707070`
- Padding: `11px 30px 12px`（small: `10px 23px 11px` / 15px）
- Border Radius: `5px`

**Reset（絞り込み解除）**
- Background: `#c6c6c6` / Text: `#000000` / Radius: `5px` / Padding: `10px 23px 11px`

**Utility（ヘッダーの検索・言語切替）— 左端だけ丸い特殊形状**
- Border Radius: `50px 2px 2px 50px`
- 言語: Background `#000000` / Text `#ffffff` / Josefin Sans 12px / Padding `3px 20px 2px 24px`
- 検索: Background `rgba(255,255,255,.27)` / Text `#00695b` / Border `1px solid #707070` /
  Padding `2px 10px 2px 24px`

### Tabs

- 選択: Background `#00695b` / Text `#ffffff` / Radius `60px` / Padding `7px 30px 8px` / 18px 500
- 非選択: `transparent` / Text `#000000` / Border `1px solid #707070` / Radius `60px`

### Tags / Labels

**Category Chip（ピル）**
- Border Radius: `50px` / Padding: `5px 12px 6px` / 12px / Weight 500 / `0.07em`
- 面色は 2章の表を参照

**Label（角丸の札）**
- Border Radius: `3px` / Padding: `2px 10px 3px` / 13px / Weight 500

**Status Tag（枠だけのタグ）**
- Border Radius: `3px` / Padding: `5px 9px 6px` / 12px / Weight 400
- Background: `transparent`、**文字色と枠色を同色にする**（開催中 `#b25300` / 募集中 `#00695b`）

**Meta Chip（会期・会場のラベル）**
- Background: `#ede8e2`（＝ページ地色をそのまま札に使う）/ Radius `50px` /
  Padding `2px 18px` / 13px / Weight 500

### Link Card

- Background: `transparent` / Border: `1px solid #d9d9d9` / Radius: `5px`
- Padding: `6px 50px 6px 6px`（右に矢印アイコンぶんの余白）
- 見出し `#000000` 16px / 補助テキスト `#00695b` 16px 500

### Cards

- Background: `#ffffff`
- Border: なし（地色 `#ede8e2` とのコントラストで面を見せる）
- Border Radius: `0px`（**カードは角丸にしない**。角丸はボタンと札だけ）
- Shadow: `0 0 12px rgba(0,0,0,.1)`（浮かせるカードのみ）

---

## 5. Layout Principles

### Container

- **Max Width: `1248px`**（本文コンテンツ）
- **Wide: `1366px`**（メインビジュアル等の広い帯）
- Padding (horizontal): 24–40px

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 5px |
| S | 10px |
| M | 20px |
| N | 30px |
| L | 50px |
| XL | 80px |

### Grid

- ニュースカード: 3カラム / Gutter 30px
- 展覧会一覧: 2カラム（画像＋テキストの横並び）

### アーチ（このサイト固有の造形）

メインビジュアルは**上端が半円のアーチ形にクリップ**される。アール・デコ建築の開口部の引用。

```css
border-radius: 50% 50% 0 0 / 40% 40% 0 0;
```

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定。ほぼすべての要素 |
| 1 | `0 0 12px rgba(0,0,0,.1)` | 浮かせるカード・モーダル |

**影はほぼ使わない**。面の区別は影ではなく**地色（`#ede8e2`）と白（`#ffffff`）の差**でつける。

---

## 7. Do's and Don'ts

### Do（推奨）

- ページ地色に `#ede8e2` を敷く。白地にしない
- letter-spacing は `0.07em` を全体に効かせる。サイズごとにpx値を書かず em で指定する
- 緑（`#00695b`）は文字・線・小さな面に使う
- 展示種別の札は 2章の面色表どおりに塗り分ける
- 角丸は `5px`（ボタン）/ `3px`（札）/ `50px`〜`60px`（ピル・タブ）の3系統に限る
- 主要CTAは黒（`#000000`）。緑をCTAの面色にしない

### Don't（禁止）

- `font-feature-settings: "palt" 1` を足さない。字間設計が壊れる
- カードに角丸をつけない（角丸はボタンと札の役割）
- 影を多用しない。面の分離は地色の差で行う
- 緑 `#00695b` を広い面に塗らない（帯に使うのは明るい `#7fbaaa` のほう）
- letter-spacing を 0 に戻さない。このサイトの品位は字間で成立している
- 本文の line-height を 1.5 より大きくしない（字間が広いぶん行が離れすぎる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。ナビはハンバーガー |
| Tablet | 768–1023px | 2カラム |
| Desktop | ≥ 1024px | 3カラム。コンテナ 1248px |

### モバイルでの変化

- グローバルナビ → ハンバーガー（`c-hamburger`）
- 主要CTAは `_fullSP` で**横幅いっぱい**に伸びる
- 下層ページタイトルは 32px → 24px 前後に縮小（字間 0.12em は維持）

### タッチターゲット

- 最小 44px × 44px。札・タグはリンクにしない（表示専用）ため対象外

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Page Background: #ede8e2
Surface:         #ffffff
Text Color:      #000000
Brand Green:     #00695b
Accent Mint:     #7fbaaa
Primary CTA:     bg #000000 / text #ffffff / radius 5px
Font:            "Noto Sans JP", sans-serif
Latin UI Font:   "Josefin Sans", sans-serif
Body Size:       16px
Line Height:     1.5
Letter Spacing:  0.07em（全要素共通）
palt:            off
```

### プロンプト例

```
東京都庭園美術館のデザインシステムに従って、展覧会一覧ページを作成してください。
- ページ地色: #ede8e2（白地にしない）。カード面のみ #ffffff
- フォント: "Noto Sans JP", sans-serif。font-feature-settings は normal（paltを使わない）
- letter-spacing: 全体に 0.07em。ページタイトルのみ 0.12em
- line-height: 本文 1.5
- ページタイトル: 32px / weight 500 / letter-spacing 0.12em
- 展覧会名: 24px / weight 500 / line-height 1.5
- 種別の札はピル（radius 50px, padding 5px 12px 6px, 12px/500）で
  展覧会 #f0df9d、トピックス #b5cbed、重要なお知らせ #d82112（文字は白）
- 「開催中」は面を塗らず、文字と枠を #b25300 の1px線で（radius 3px）
- 主要CTA: 背景 #000000 / 文字 #ffffff / radius 5px / padding 11px 30px 12px
- セカンダリ: 透明 / 文字 #00695b / 枠 1px solid #707070 / radius 5px
- カードは角丸なし、影なし
- コンテナ幅 1248px
```
