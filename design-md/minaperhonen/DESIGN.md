# DESIGN.md — mina perhonen（ミナ ペルホネン）

> minä perhonen｜ミナ ペルホネン（https://www.mina-perhonen.jp/）のデザイン仕様書。
> デザイナー皆川明が1995年に設立した、オリジナルの手描きテキスタイル・刺繍で知られる日本のファッション／テキスタイルブランド。「minä perhonen」はフィンランド語で「私｜蝶」を意味する。長く着られる、世代を超えて受け継がれる「特別な日常着」という哲学を持つ。
> 最大の特徴は **和文本文に明朝体（游明朝）を選ぶ数少ない設計**。テック的なモダンさではなく、手仕事の温かみと文学的な静けさを、**インクを紙に落としたような近似モノクロ（白 ＋ ほぼ黒 #212121）** の組版で表現する。ブランドアクセント色を持たず、色数を極限まで削ぎ落とした、エディトリアルで詩的なシステム。
> 実サイトの computed style 実測（2026-07-26 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **静謐・エディトリアル・文学的**。余白を贅沢に取り、細い罫と静かな明朝体で、ギャラリーの図録や詩集のような紙面をつくる。ファッションブランドでありながら喧騒がなく、テキスタイルの手仕事と「ものを長く大切にする」哲学が、余白と書体そのもので語られる
- **mina perhonen について**: 1995年設立。オリジナルの手描きテキスタイル・刺繍を核に、服・生地・器・家具まで展開する。Web も同じ思想で、写真とわずかな文字だけを白い紙面に置き、色で主張しない。プロダクト（生地）の色彩の豊かさに対し、サイトは意図的に近似モノクロに徹する
- **密度**: 低密度。大きな余白、細い区切り線、静かなタイポグラフィ。情報を詰め込まず、ゆったりと呼吸する紙面
- **キーワード**: 明朝体（游明朝）、近似モノクロ、白と #212121、Adobe Garamond Pro、Helvetica Neue、行間1.8、余白過多、テキストリンク（塗りボタン非採用）
- **特徴**:
  - **和文本文に明朝体（游明朝）を採用**する数少ない設計。ゴシックのテック感を避け、セリフの温かさ・文学性を選ぶ
  - 欧文の見出し・ブランド表記（"minä perhonen" / "Season"）は **Adobe Garamond Pro（オールドスタイル・セリフ）**。上品でクラシックな欧文セリフ
  - ラテンのナビ・ラベル・フッターは **Helvetica Neue**。小さく、字間を広げて（0.1em〜0.2em）静かに配置
  - **ブランドアクセント色を持たない**。色は 白 / ほぼ黒 #212121 / 補助の #333333 / グレー #999999、そして意味的な赤 #ff0000（カート空・警告）だけ
  - CTA は **塗りボタンを使わず、下線付きのテキストリンク**が基調。押し付けがましさのない導線
  - 本文の **行間は 1.8（16px→28.8px）**。日本語の明朝を読みやすくゆったり組む
  - **palt を使わない**（`font-feature-settings: normal`）。詰めずに、素直な字送りで明朝の呼吸を残す

---

## 2. Color Palette & Roles

> 実測値。CSS Custom Properties は定義されていない。ページ背景は html/body ともに **白 #ffffff**、本文テキストは **#212121（ほぼ黒）**。ヘッダーの一部オーバーレイに #333333 が現れる。**ブランドアクセント色は存在しない**。「白い紙 ＋ インクのような近似黒」の、意図的に色を削ぎ落とした設計と捉える。

### Brand（ブランド）

- **Ink Black** (`#212121`): 本文テキスト・見出しの基調色。純黒 `#000000` ではなく、わずかに和らげたインクのような黒。紙に落としたインクの温度感を出す
- **Paper White** (`#ffffff`): ページ背景。すべての面はこの白い紙の上に置かれる。ブランドの「余白」を担う最重要の色

### Surface / Neutral（面色・ニュートラル）

- **Overlay Dark** (`#333333`): ヘッダーの小さなオーバーレイ・一部の面に現れる二次的な暗色。#212121 より一段明るい
- **Gray** (`#999999`): 日付・キャプション等の最小テキスト（10px の "2026.07.25" 等）。控えめな補助情報

### Semantic（意味的な色）

- **Danger / Alert** (`#ff0000`): カート空の注記「＊かごには何も入っていません。」等に使われる純赤。このサイトで唯一の彩度を持つ色で、警告・エラー・欠品の意味的シグナルに限定される。装飾やアクセントには使わない
- Warning / Success 専用色は持たない。必要なら意味的赤 `#ff0000` を注意喚起に、情報は本文黒 `#212121` で表現する

### Text（テキスト階層）

- **Text Primary** (`#212121`): 本文・見出し
- **Text Muted** (`#999999`): 日付・最小キャプション
- **Border / Rule** (`#212121` 極細 / 実装では 1px の淡い罫): 区切り線は黒の細罫を基調に、必要に応じて淡いグレーで

---

## 3. Typography Rules

> 和文本文に **游明朝（Japanese Mincho / セリフ）** を据える、このジャンルでは異例の設計。欧文の見出し・ブランド表記は **Adobe Garamond Pro（オールドスタイル・セリフ）**、ラテンのナビ・ラベル・フッターは **Helvetica Neue**。本文は **行間 1.8**、**palt は不使用**（`font-feature-settings: normal`）で、明朝の素直な字送りを保つ。

### 3.1 和文フォント

- **明朝体（本文・見出しの主役）**: 游明朝, "Yu Mincho", YuMincho, "Noto Serif JP"（セリフ。本文・見出しの和文はこの明朝一系統）
- **ゴシック体（限定用途）**: 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", "Noto Sans JP"（「サインイン・登録」等のラベルのみゴシックを使う）
- 本文は明朝が基調。ゴシックはごく一部のUIラベルに限られる

### 3.2 欧文フォント

- **セリフ（見出し・ブランド表記）**: adobe-garamond-pro（Adobe Fonts。オールドスタイルのセリフ。"minä perhonen" / "Season" / h2 見出しに使う）
- **サンセリフ（ナビ・ラベル・フッター）**: "Helvetica Neue", arial（"FASHION" 等のナビ、フッター、日付ラベル）
- 等幅は主要導線では使わない
- **preview.html での注記**: 游明朝は macOS/Windows のシステムフォントで Google Fonts に無いため、プレビューでは **Google Fonts の Shippori Mincho（游明朝に近い和文明朝）** を代替に用いる。adobe-garamond-pro（Adobe Fonts / ドメインライセンス）は表示できないため **EB Garamond（Google Fonts）** で代替する。実装時は必ず游明朝（システム）と adobe-garamond-pro（Adobe Fonts）を読み込むこと

### 3.3 font-family 指定

```css
/* 本文・和文見出し（明朝） */
font-family: 游明朝, "Yu Mincho", YuMincho, "Noto Serif JP", serif;

/* 欧文見出し・ブランド表記（オールドスタイル・セリフ） */
font-family: adobe-garamond-pro, serif;

/* ラテンのナビ・ラベル・フッター（サンセリフ） */
font-family: "Helvetica Neue", arial, sans-serif;

/* 一部UIラベル（ゴシック） */
font-family: 游ゴシック体, YuGothic, 游ゴシック, "Yu Gothic", "Noto Sans JP", sans-serif;
```

**フォールバックの考え方**:
- 和文本文は游明朝を先頭に、無い環境では Noto Serif JP → serif に落とす（明朝の質感を最後まで保つ）
- 欧文セリフは adobe-garamond-pro → serif、ラテン系は Helvetica Neue → arial → sans-serif
- **和文本文の末尾は必ず `serif`**（ゴシックに落とさない。明朝の性格を守る）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Heading 1 (h1) | 游明朝 | 36px | 400 | 1.2 (43.2px) | normal | ページタイトル "About" 等 |
| Heading 2 EN (h2) | adobe-garamond-pro | 24px | 400 | 1.2 (28.8px) | normal | ブランド表記 "minä perhonen" |
| Heading 2 JP (h2) | 游明朝 | 24px | 400〜500 | 1.2 (28.8px) | normal | 和文小見出し「皆川 明」等 |
| Heading 3 EN (h3) | adobe-garamond-pro | 24px | 400 | 1.2 (28.8px) | normal | 欧文小見出し |
| Heading 3 JP (h3) | 游明朝 | 16px | 500 | 1.5 (24px) | normal | 和文小見出し |
| Nav EN | "Helvetica Neue" | 14px | 500 | ~1.2 (17px) | 0.1em (1.4px) | "FASHION" 等 |
| Nav Serif | adobe-garamond-pro | 18px | 400 | 1.22 (22px) | normal | "Season" 等 |
| Body | 游明朝 | 16px | 400 | 1.8 (28.8px) | normal〜0.05em | 本文（記事内は ls 0.05em） |
| Body Emphasis | 游明朝 | 16px | 500 | 1.8 (28.8px) | 0.05em (0.8px) | 記事内の強調段落 |
| Label (Gothic) | 游ゴシック体 | 14px | 700 | 1.2 (17px) | 0.2em (2.8px) | 「サインイン・登録」 |
| Caption / Footer | "Helvetica Neue" | 12px | 400 | 1.6 (19.2px) | 0.05em (0.6px) | フッター著作権表記 |
| Small / Date | "Helvetica Neue" | 10px | 400 | 1.2 (12px) | 0.15em (1.5px) | 日付ラベル・color #999999 |
| Alert | 游明朝 | 16px | 600 | 1.5 (24px) | normal | 「＊かごには何も入っていません。」color #ff0000 |

- 本文は **weight 400** が既定。強調段落で 500、見出しは 400〜500、ゴシックラベルのみ 700。ウェイトのコントラストは弱く、静かに揃える

### 3.5 行間・字間

- **本文の行間 (line-height)**: **1.8**（16px→28.8px）。日本語の明朝をゆったり読ませる基準
- **見出しの行間**: **1.2**（36px→43.2px、24px→28.8px）。見出しは詰めて塊にする
- **本文の字間 (letter-spacing)**: **normal**（トップ）〜 **0.05em**（記事本文 16px 基準 0.8px）。ごくわずかに開ける程度で、詰めない
- **ナビ・ラベルの字間**: ラテンは **0.1em（"FASHION"）**、ゴシックラベルは **0.2em（"サインイン・登録"）**、日付は **0.15em**。小さなラテン文字は字間を大きく開けて静かなリズムを作る
- **ブランド欧文セリフ ("minä perhonen" / "Season")**: **normal**。オールドスタイルの自然な字送りを尊重する

**ガイドライン**:
- 日本語本文は明朝で line-height 1.8 を基準にゆったり組む（詰めない）
- 本文の letter-spacing は normal 〜 0.05em にとどめ、palt で詰めない
- 小さなラテン・ラベルは逆に字間を大きく（0.1〜0.2em）開けて、静けさとエディトリアル感を出す

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

### 3.7 OpenType 機能

```css
font-feature-settings: normal;   /* palt は使わない */
```

- **palt は不使用**（実測 `font-feature-settings: normal`）。明朝の素直な字送りを保ち、詰めによる緊張感を避ける
- 見出しでも palt を掛けず、余白と字間で調整する
- kern は環境依存に任せ、明示的な字詰めはしない

### 3.8 縦書き

- 該当なし。主要導線はすべて横組み
- 用いる場合は `writing-mode: vertical-rl; text-orientation: mixed;`（明朝は縦組みとの相性が良く、図録的な用途では検討に値する）

---

## 4. Component Stylings

### Buttons

> **重要**: 実サイトには塗りつぶしの CTA ボタン（filled button）が存在せず、`interactive` 抽出は空だった。導線は基本的に **下線付きのテキストリンク**で構成される。以下はブランドの性格に合わせて設計した、控えめで上品なボタン仕様。実装でも、まずテキストリンク（border-bottom）を優先し、塗りボタンは本当に必要な箇所に限ること。

**Text Link（基調・推奨）**
- Background: `transparent`
- Text: `#212121`
- Border-bottom: `1px solid #212121`
- Padding: `0 0 2px`
- Font: 游明朝, 16px, weight 400
- ホバー: 下線・文字色を薄める（opacity 0.6 程度）
- 用途: サイト全体の主要導線。押し付けがましくないリンク

**Outline（枠線・静か）**
- Background: `transparent`
- Text: `#212121`
- Border: `1px solid #212121`
- Padding: `14px 28px`
- Border Radius: `0`（角丸を使わず、紙面の端正さを保つ）
- Font: 游明朝 / adobe-garamond-pro, 14〜16px, weight 400
- 用途: 「View More」等の穏やかなセカンダリ導線

**Quiet Dark（塗り・最小限）**
- Background: `#212121`
- Text: `#ffffff`
- Padding: `14px 32px`
- Border Radius: `0`
- Font: 游明朝, 16px, weight 500
- 用途: どうしても面で見せたい場合の最終手段。角丸なし・彩度なしで静けさを保つ

### Inputs

- Background: `#ffffff`
- Border: `1px solid #999999`（または下線のみの `border-bottom: 1px solid #212121`）
- Border (focus): `1px solid #212121`
- Border Radius: `0`
- Padding: `12px 4px`
- Font: 游明朝, 16px, weight 400
- Text Color: `#212121` / Placeholder: `#999999`
- 罫は細く、角丸を持たせない。下線のみのフィールドも紙面によく合う

### Cards

- Background: `#ffffff`
- Border: なし（余白と写真だけで区切る）／必要時 `1px solid` の淡い罫
- Border Radius: `0`
- Padding: 写真は余白なしで大きく、テキストブロックのみ内側に余白
- Shadow: なし（フラット。Depth & Elevation 参照）
- テキスタイル・生地の写真を大きく置き、下に品名（游明朝 #212121）と補助情報（Helvetica Neue #999999・日付等）を静かに添える。角丸・影・枠線に頼らず、余白で構成する

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 48px |
| XL | 80px |
| XXL | 120px |

余白がこのシステムの主役。セクション間は XL〜XXL で大きく取り、要素は余白で区切る（罫や面色に頼りすぎない）。

### Container

- Max Width: 1080px 目安（写真は全幅ブリードも可）
- Padding (horizontal): 24〜48px

### Grid

- Columns: 12（実運用は 2〜3 カラムの写真グリッド）
- Gutter: 24〜48px
- テキスタイル・製品の写真グリッドは、間隔を広く取り、キャプションを小さく静かに置く

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。余白と細罫だけで構成しフラット |
| 1 | `0 1px 3px rgba(0,0,0,0.06)` | ドロップダウン等の限定用途 |
| 2 | `0 4px 16px rgba(0,0,0,0.08)` | モーダル・ポップオーバー |
| 3 | `0 12px 32px rgba(0,0,0,0.12)` | ダイアログ・フローティング |

- 奥行きはほぼ使わない。**余白と細罫、写真そのもの**で構成し、影は最小限に。角丸も使わず、紙面の端正さを保つ

---

## 7. Do's and Don'ts

### Do（推奨）

- 和文本文は **游明朝（明朝体）** で組む（末尾は `serif`。ゴシックに落とさない）
- 欧文の見出し・ブランド表記は adobe-garamond-pro、ラテンのナビ・ラベルは Helvetica Neue を使い分ける
- 日本語本文の行間は 1.8 を基準にゆったり組む
- 色は 白 と ほぼ黒 #212121 を基調に、**近似モノクロ**を貫く
- 導線は下線付きのテキストリンクを基調にする（塗りボタンに頼らない）
- 小さなラテン・ラベルは字間を大きく（0.1〜0.2em）開けて静けさを出す
- 余白を贅沢に取り、セクション間は XL〜XXL で区切る
- 意味的な赤 #ff0000 は警告・欠品のシグナルにだけ使う

### Don't（禁止）

- 和文本文にゴシック体を使わない（このブランドの温かさは明朝が担う）
- `palt` で本文を詰めない（`font-feature-settings: normal` が基本。明朝の呼吸を残す）
- 彩度のあるアクセント色やグラデーションを足さない（近似モノクロを崩す）
- 角丸・ドロップシャドウを多用しない（フラットで端正な紙面を保つ）
- 純黒 `#000000` ではなく `#212121` を使う（インクのような和らいだ黒）
- 意味的な赤 #ff0000 を装飾・アクセントに流用しない（警告以外に使わない）
- 塗りつぶしの派手な CTA を主導線に据えない（テキストリンクが基調）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。写真は全幅、余白は縮小しても保つ |
| Tablet | 768–1024px | 2 カラム |
| Desktop | > 1024px | 2〜3 カラム＋大きな余白 |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）。テキストリンクは十分な行間・padding でタップ領域を確保

### フォントサイズの調整

- モバイルでは本文 15〜16px を維持（明朝の可読性のため小さくしすぎない）
- 見出し 36px → 24〜28px 程度に縮小し、行間はゆったり保つ
- 小さなラテン・ラベル（10〜12px）はモバイルでも字間を保ち、詰めない

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand/Text:   #212121   （インクのようなほぼ黒。純黒は使わない）
Background:   #ffffff   （紙のような白。余白が主役）
Sub/Overlay:  #333333 / #999999（二次暗色 / 最小キャプション）
Alert:        #ff0000   （警告・欠品のみ。アクセントに流用しない）
アクセント色: なし（意図的な近似モノクロ）
和文 Font:    游明朝, "Yu Mincho", YuMincho, "Noto Serif JP", serif（明朝／末尾 serif）
欧文 Serif:   adobe-garamond-pro, serif（ブランド表記・見出し）
ラテン Font:  "Helvetica Neue", arial, sans-serif（ナビ・ラベル・フッター）
Body Weight:  400（強調 500 / ゴシックラベル 700）
Body Size:    16px
Line Height:  1.8（本文）／ 1.2（見出し）
Letter Spacing: normal〜0.05em（本文）／ 0.1〜0.2em（小ラテン・ラベル）
palt:         off（font-feature-settings: normal）
Button:       下線付きテキストリンク基調（塗りボタンは最小限・角丸なし）
```

### プロンプト例

```
mina perhonen（ミナ ペルホネン）のデザインシステムに従って、テキスタイル製品の紹介ページを作成してください。
- 和文本文は游明朝（明朝体）で組む: 游明朝, "Yu Mincho", YuMincho, "Noto Serif JP", serif（末尾は serif）
- 欧文の見出し・ブランド表記は adobe-garamond-pro、ラテンのナビ・ラベルは "Helvetica Neue"
- 本文は 16px・weight 400・行間 1.8・letter-spacing は normal〜0.05em。palt は使わない
- 色は白 #ffffff と ほぼ黒 #212121 の近似モノクロを貫く。アクセント色は足さない
- 導線は下線付きのテキストリンク（border-bottom: 1px solid #212121）を基調にし、派手な塗りボタンは使わない
- 小さなラテン・ラベル（"FASHION" 等）は字間を 0.1〜0.2em 開けて静かに置く
- 余白を贅沢に取り、角丸・ドロップシャドウは使わずフラットに構成する
- 警告・欠品の注記だけ #ff0000 を使う（それ以外に赤は使わない）
```
