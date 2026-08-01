# DESIGN.md — カミナシ（KAMINASHI）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-01 / 対象: `https://kaminashi.jp/`, `/case/`

---

## 1. Visual Theme & Atmosphere

ノンデスクワーカー向けの現場DXプラットフォーム。工場・食品製造・物流の現場が読者なので、
**遠くからでも読める強さ**が全体の設計思想になっている。原色に近い青（`#0360e5`）を
ヒーローに大きく敷き、CTAは黄色（`#ffdb22`）の巨大なピル。見出しは Noto Sans JP の
**Black（900）** で、日本語Webでは最も重いウェイト帯を常用する。

- **デザイン方針**: 高コントラスト・大きい文字・迷わせない。B2B SaaS の縦長LPの定型を、
  ウェイトと彩度で最大限に押し切る
- **密度**: 中〜高。1セクション1メッセージだが、セクション数が多い縦長構成
- **キーワード**: コバルトブルー、イエローCTA、Black 900、ピル、現場

**このSaaS LPの特徴的な癖（他サイトと違う点）**

1. **見出しの標準ウェイトが 900**。700 は「やや軽い」扱いで、強調は 900 が既定
2. **line-height が全域 1.4**。日本語本文の推奨（1.7〜2.0）よりかなり詰まっている
3. **ヒーローの巨大文字だけ letter-spacing が負**（`-0.04em`〜`-0.05em`）。
   しかも**かな・漢字で値を変えている**（漢字は 0、かなは負）
4. **CTAの黄色に 2 つの近似値が混在**（`#ffdb22` / `#ffdf24`）。トークン整理が追いついていない
5. **STUDIO（ノーコード）製**。CSS変数は `--s-color-<hash>` 形式で意味が読めない

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style と CSS Custom Properties の実測値 -->

### Brand（ブランド）

- **Kaminashi Blue** (`#0360e5`): ブランドの主色。ヒーローの地、見出しの強調、
  チップの枠と文字、FAQ の開閉ボタン。**面としても文字としても使う唯一の色**
- **Blue Deep** (`#0046a9` / `#004fbf`): グラデーションの終端。単色では使わない
- **Cyan** (`#00afea`): 補助のアクセント。図版やアイコンに少量

```css
/* ヒーロー／CTA帯のグラデーション（実測） */
background: linear-gradient(#0360e5 0%, #0046a9 100%);
background: linear-gradient(169deg, #0060e5 0%, #004fbf 100%);
```

### CTA（行動喚起）

- **Kaminashi Yellow** (`#ffdb22`): **主要CTAの面色**。ヘッダーの「資料ダウンロード」、
  ヒーローの巨大ボタン
- **Yellow Alt** (`#ffdf24`): 同用途で併存する近似値（CSS変数 `--s-color-77804c76`）
- **CTA Text** (`#333333`): 黄色の上に載る文字。**白ではなく濃いグレー**。
  黄色地に白文字はコントラストが取れないため

### Surface（面）

- **Background** (`#ffffff`): ページ地色
- **Surface Blue Pale** (`#e8f2ff`): 業種リスト等の淡い青面。最頻出のセクション背景
- **Surface Blue Pale 2** (`#ebf4ff`): 課題リストの面。上とほぼ同値で併存
- **Surface Gray** (`#f5f5f5`): FAQ・導入フローの面
- **Surface Gray 2** (`#eeeff0`): 区切りの面
- **Surface Beige** (`#f6f2ed`): 一部セクションの温かい面
- **Border** (`#d9d9d9`): 罫・枠

### Service Accent（サービス別の識別色）

4つのプロダクトを見出しの文字色だけで区別する。**面は塗らない**。

| サービス | 色 |
|---------|-----|
| 現場帳票システム | `#3b5bdb` |
| 設備保全 | `#5130b0` |
| 研修・マニュアル | `#e86c00` |
| コミュニケーション | `#ab3400` |

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文・ナビ。**純黒 `#000000` は見出しの一部にのみ使う**
- **Text Heading** (`#000000`): セクション見出し
- **Text Muted** (`#888787`): 補助ラベル（「現場DXプラットフォーム」等）
- **Text on Blue** (`#ffffff`): 青地の上の文字
- **Danger** (`#e5412b`): 警告・注意

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP（唯一の和文書体）
- **明朝体**: 使用しない

ウェイトは **500 / 700 / 900** の3段を使う。**900（Black）が見出しの既定**。

### 3.2 欧文フォント

- **Lato**: フッターのカテゴリ名など、欧文まじりの小さいラベル
- **Poppins**: CSS変数に定義（`--s-font-05aeaf10`）。数字・見出しの一部
- **Material Symbols Outlined / Material Symbols Rounded / Material Icons**:
  アイコンフォント。`file_download` `mail` `chevron_right` `play_arrow` 等をリガチャで表示

### 3.3 font-family 指定

```css
/* 本文・見出し（和文） */
font-family: "Noto Sans JP";

/* 欧文ラベル */
font-family: Lato;
font-family: Poppins;

/* アイコン */
font-family: "Material Symbols Outlined";
font-feature-settings: "liga";
```

**フォールバックの考え方**:
- **`sans-serif` すらチェーンに書いていない**箇所が多い（STUDIO の出力）。
  実装するときは `"Noto Sans JP", sans-serif` と generic family を必ず足すこと
- ページ骨格（`body` / レイアウト用 `div`）は `sans-serif` のまま。
  文字を持つ要素にだけ `Noto Sans JP` が当たる構造

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero (漢字) | Noto Sans JP | 72–89px | 700 | 1.4 | 0〜0.01em | 「現場」「DX」 |
| Hero (かな) | Noto Sans JP | 44–70px | 700 | 1.4 | **-0.04〜-0.05em** | 「なら」「まるっと」「カミナシ」 |
| Section Heading | Noto Sans JP | 48px | 700 | 1.4 (67.2px) | 0.08em (3.84px) | 「カミナシの特徴」 |
| Heading | Noto Sans JP | 38px | 900 | 1.4 (53.2px) | 0.08em (3.04px) | 強調（黄文字） |
| Heading 2 | Noto Sans JP | 32px | 900 | 1.4 (44.8px) | 0.08em (2.56px) | 「導入事例」「お知らせ」 |
| Sub Heading | Noto Sans JP | 20px | 900 | 1.4 (28px) | 0.08em (1.6px) | サービス名 |
| Nav | Noto Sans JP | 13–14px | 700 | 1.4 (18.2/19.6px) | 0.08em | グローバルナビ |
| Chip | Noto Sans JP | 14px | 900 | — | 0.08em (1.12px) | 機能タグ |
| Small / Label | Noto Sans JP | 12px | 500 | 1.4 (16.8px) | 0.08em (0.96px) | 補助ラベル |

### 3.5 行間・字間

- **line-height は全域 `1.4`**。日本語本文の一般的推奨（1.7〜2.0）よりかなり詰まっている。
  1文が短くセンタリングされた見出しが主体のLPなので成立しているが、
  **長い本文をこの行間で組むと読みにくくなる**。段落主体の画面では 1.7 以上に緩めること
- **letter-spacing は `0.08em` が基準**。16px 換算で 1.28px。見出しから小ラベルまで一貫
- **ヒーローの巨大文字だけ負のトラッキング**。しかも文字種で値を変えている:
  - 漢字（「現場」72px / 「DX」89px）… `0` 〜 `0.01em`
  - かな（「なら」44px / 「まるっと」46px / 「カミナシ」70px）… `-0.05em` / `-0.05em` / `-0.04em`

  かなは字面が小さいため、ベタ組みだと漢字より間延びして見える。それを負の字送りで
  詰めて、漢字とかなの見た目の密度を揃えている。**大きい見出しほどこの補正が要る**

```css
/* 基準 */
body {
  font-family: "Noto Sans JP", sans-serif;
  line-height: 1.4;
  letter-spacing: 0.08em;
  color: #333;
}

/* セクション見出し */
.section-heading {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.08em;
}

/* ヒーロー — かなだけ詰める */
.hero-kanji { font-size: 72px; font-weight: 700; letter-spacing: 0; }
.hero-kana  { font-size: 70px; font-weight: 700; letter-spacing: -0.04em; }
```

### 3.6 禁則処理・改行ルール

```css
word-break: normal;
overflow-wrap: break-word;
line-break: strict;
```

- ヒーローのコピーは**改行位置を人手で決めている**（「現場DXなら／まるっと／カミナシで」）。
  自動折り返しに任せず、`<br>` かブロック分割で意図した位置に折る
- 「現場DXプラットフォーム「カミナシ」」のように**鉤括弧が語中に入る**表記が頻出。
  行頭に `」` が来ないよう禁則を効かせる

### 3.7 OpenType 機能

```css
font-feature-settings: normal;  /* palt は使わない */
```

- **`palt` は無効**（アイコンフォントの `"liga"` を除き実測 `normal`）
- 字詰めは palt ではなく `letter-spacing`（正負両方向）で制御する

### 3.8 縦書き

該当なし。全ページ横組み。

---

## 4. Component Stylings

### Buttons

**Primary CTA（資料ダウンロード）— 黄色のピル**
- Background: `#ffdb22`
- Text: `#333333`（**白文字にしない**。黄色地とのコントラストが取れない）
- Border Radius: `60px`（ヒーロー等の大型）/ `32px`（ヘッダー内）
- Padding: `0 16px` ＋ 高さで調整（大型は 72px 前後、ヘッダーは 48px 前後）
- 右端に Material Symbols の `file_download` アイコンを添える
- Shadow: `0 6px 15px rgba(0,0,0,.2)`（大型CTAのみ。押せる感じを出す）

**Secondary（お問い合わせ）— 白のピル**
- Background: `#ffffff`
- Text: `#333333`
- Border: `1px solid #d9d9d9`（青地の上では枠なし）
- Border Radius: `32px`
- 右端に `mail` アイコン

**Blue CTA（帯の中）**
- Background: `linear-gradient(#0360e5 0%, #004fbf 100%)`
- Text: `#ffffff` / Border Radius: `100px`
- Padding: `16px 16px 16px 24px`

**FAQ Toggle**
- Background: `#0360e5` / Border Radius: `32px` / Padding: `16px 32px`
- 右端に `keyboard_arrow_down`

### Chips / Tags

**機能タグ（枠線のピル）**
- Background: `#ffffff` / Text: `#0360e5`
- Border: `1px solid #0360e5`
- Border Radius: `24px` / Padding: `4px 16px`
- Font: `14px` / Weight **900** / `letter-spacing: 0.08em`

**業種リンク（面のみ）**
- Background: `#e8f2ff` / Text: `#333333` / Border Radius: `0px` / Padding: `5px 0`

### Cards

- Background: `#ffffff`
- Border Radius: `8px`（標準）/ `32px`（大きい訴求カード）
- Shadow: `0 0 24px rgba(0,0,0,.08)`
- Padding: 24–40px

### Section Shape（このLP固有の造形）

セクションの下端だけを大きく丸める形を多用する。

```css
border-radius: 0 0 32px 32px;
```

左右どちらかだけを丸める変種もある（`32px 0 0 32px` / `0 32px 32px 0`）。

---

## 5. Layout Principles

### Container

- Max Width: `1200px` 前後（セクションごとに `calc()` で可変）
- Padding (horizontal): 20px（モバイル）/ 40px（デスクトップ）

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 32px |
| XL | 64px |
| XXL | 120px |

### Grid

- 業種リスト: 4カラム（`calc(25% - 15px)`）
- 導入事例: 2カラム（`calc(46% - 28.62px)`）
- 課題カード: 3カラム

### Border Radius Scale

| Token | Value | 用途 |
|-------|-------|------|
| card | `8px` | 通常のカード |
| chip | `24px` | 機能タグ |
| button | `32px` | ヘッダーのボタン、FAQ |
| hero-cta | `60px` | ヒーローの大型CTA |
| pill | `100px` | 帯の中のCTA |
| circle | `50%` | 閉じるボタン |

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | 既定 |
| 1 | `0 0 24px rgba(0,0,0,.08)` | カード。柔らかく広い影 |
| 2 | `0 6px 15px rgba(0,0,0,.2)` | 主要CTA。下方向に強い影で「押せる」を示す |

**影の使い分けが明確**: カードは方向を持たない広い影、ボタンは下方向の濃い影。

---

## 7. Do's and Don'ts

### Do（推奨）

- 見出しは Noto Sans JP の **900（Black）** を既定にする
- letter-spacing は `0.08em` を全体に効かせる
- **巨大な見出しのかなだけ `-0.04em` 程度に詰める**（漢字は 0 のまま）
- 主要CTAは黄色 `#ffdb22` のピル、文字は `#333333`
- 青 `#0360e5` は面にも文字にも使ってよい唯一の色
- 淡い青面（`#e8f2ff`）でセクションを区切る
- CTAには下方向の影（`0 6px 15px rgba(0,0,0,.2)`）を付ける
- ヒーローのコピーは改行位置を明示的に指定する

### Don't（禁止）

- 黄色いCTAに**白文字を載せない**（コントラスト不足）
- `font-feature-settings: "palt" 1` を足さない
- **長い本文を `line-height: 1.4` で組まない**。段落主体の画面では 1.7 以上に緩める
- サービス識別色（`#3b5bdb` 等）を**面色に使わない**。見出しの文字色専用
- 角丸を中途半端な値にしない。`8 / 24 / 32 / 60 / 100 / 50%` のスケールに乗せる
- 見出しウェイトを 400 にしない（このブランドの声は 700〜900）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1カラム。ナビはハンバーガー |
| Tablet | 768–1023px | 2カラム |
| Desktop | ≥ 1024px | 4カラム |

### モバイルでの変化

- ヒーロー 72–89px → 36–44px 前後。**負のトラッキングは維持する**
- セクション見出し 48px → 28px 前後
- CTAは横幅いっぱいのピル（`border-radius: 60px` のまま）
- 業種リスト 4カラム → 2カラム

### タッチターゲット

- 最小 44px × 44px。主要CTAは高さ 64px 以上取る

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Brand Blue:      #0360e5
CTA Yellow:      #ffdb22（文字は #333333）
Surface Pale:    #e8f2ff
Text Primary:    #333333
Text Heading:    #000000
Text Muted:      #888787
Font:            "Noto Sans JP", sans-serif
Heading Weight:  900（既定）/ 700
Body Size:       14–16px
Line Height:     1.4
Letter Spacing:  0.08em（巨大見出しのかなのみ -0.04em）
Radius:          8 / 24 / 32 / 60 / 100 / 50%
palt:            off
```

### プロンプト例

```
カミナシのデザインシステムに従って、SaaS のサービス紹介LPを作成してください。
- 背景 #ffffff、本文 #333333、見出し #000000
- フォント: "Noto Sans JP", sans-serif
- 見出しの既定ウェイトは 900（Black）。ナビは 700
- line-height は 1.4、letter-spacing は 0.08em を全体に
- ヒーローは背景 linear-gradient(#0360e5 0%, #0046a9 100%) に白文字
  コピーは 70px 前後で、かなの部分だけ letter-spacing: -0.04em で詰める
  （漢字部分は letter-spacing: 0 のまま）
- 主要CTA: 背景 #ffdb22 / 文字 #333333 / border-radius 60px /
  box-shadow 0 6px 15px rgba(0,0,0,.2)。白文字にしない
- セカンダリ: 背景 #ffffff / 文字 #333333 / border-radius 32px
- 機能タグ: 背景 #ffffff / 文字と枠 #0360e5 / 1px / radius 24px /
  14px / weight 900
- セクションの区切りは背景 #e8f2ff の淡い青面で
- カードは radius 8px、box-shadow 0 0 24px rgba(0,0,0,.08)
- セクションの下端だけ border-radius: 0 0 32px 32px で丸める
- コンテナ幅 1200px
```
