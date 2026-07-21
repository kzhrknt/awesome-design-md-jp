# DESIGN.md — SIX（シックス）

> SIX inc.（https://www.sixinc.jp/）のデザイン仕様書。
> 東京・南青山を拠点とする、カンヌ／ADFEST 等で数々の賞を獲る独立系クリエイティブ・エージェンシー。TOYOTA・ＳＭＢＣ日興証券（日興フロッギー）・popIn Aladdin 等のブランド／コミュニケーション開発を手がける。
> 最大の特徴は **純白 → ライトグレー（#eeeeee）→ ニアブラック（#1a1a1a）だけのモノクローム基調** に、**ただ一点だけ差す彩度の高い赤（#f23030）** を効かせた、大胆でエディトリアルな作例主義。ヒーローは欧文グロテスク（Maison Neue）の巨大な見出し、実績（WORKS）はニアブラックの面に白文字を大きく置くカード。角丸は一切なし（radius 0）、面色ボタンを持たず、作例ビジュアルそのものを主役にする。和文は **YakuHanJP（約物半角詰め）＋ 游ゴシック** で組み、本文の行間を 2.0 とゆったり取る。
> 実サイトの computed style 実測（2026-07-21 取得）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **モノクローム＋一点の赤**。ベースは純白・ライトグレー・ニアブラックの無彩色で、彩度を持つのは赤 #f23030 ただ一色。この赤を住所ラベルなど極めて限定的に差すことで、静かな画面に緊張感を与える。全体は「余白・大きな欧文タイポグラフィ・作例ビジュアル」で構成する、広告代理店らしい自信のあるエディトリアル
- **SIX について**: TOYOTA・ＳＭＢＣ日興証券・popIn Aladdin 等のブランド／プロダクト／コミュニケーションを横断的に開発する独立系クリエイティブ・エージェンシー。サイトは "We inspire the mark." のステートメントと WORKS（実績）を中心に据え、UI 自体は限りなく引く。作例を邪魔しない設計思想
- **密度**: 低〜中密度。巨大な欧文ヒーロー（80px）と、ニアブラックの WORKS カードをグリッドに並べる。和文本文は line-height 2.0 で広く、余白をたっぷり取る
- **キーワード**: モノクローム、一点の赤 #f23030、ニアブラック #1a1a1a、大きな欧文グロテスク（Maison Neue）、角丸なし（radius 0）、広い余白、エディトリアル、作例主義、YakuHanJP
- **特徴**:
  - パレットは **無彩色＋赤 1 色**。背景は白 #ffffff とライトグレー #eeeeee（ヒーロー／cover 帯）、作例カードはニアブラック #1a1a1a / #262626。テキストは #222222 / #404040 のダークグレー階調。差し色の赤 #f23030 は住所ラベル等ごく一部にだけ乗る
  - **欧文と和文でフォントを完全に使い分ける**。欧文ディスプレイ／英数は **Maison Neue**（Milieu Grotesque のグロテスク）、和文は **YakuHanJP → 游ゴシック** チェーン。ヒーローの "We inspire the mark." は Maison Neue 80px / weight 700
  - **角丸は一切使わない（radius 0px）**。ボタン・カード・入力欄すべてシャープな直角。面色ボタン（塗りのブランドカラー CTA）を持たず、WORKS カード（ニアブラック地＋白文字）や "READ MORE" テキストリンクが CTA を兼ねる
  - 和文は **letter-spacing 0.05em（0.7px / 14px）**、セクションラベルの英字は **0.1em（1.6px / 16px）** と広めのトラッキング。ヒーロー欧文だけ **-0.015em** と負に詰める
  - 本文の行間は **2.0**（36px / 18px）とゆったり。見出し・UI ラベルは 1.0〜1.1 とタイト

---

## 2. Color Palette & Roles

> 実サイトの computed style 実測値。無彩色ベース＋赤 1 色。すべて hex 表記（rgb→hex 変換済み）。

### Primary（アクセント — 唯一の彩度）

- **Accent Red** (`#f23030`): サイト唯一の彩度を持つ色（rgb 242,48,48）。フッター住所ラベルの地などに極小面積で差す。ブランドの "一点の赤"。多用しない
- **Accent Red は塗りの汎用 CTA ではない**: SIX は面色のブランドカラーボタンを持たない。赤はあくまでラベル／アクセント。CTA 相当はニアブラック面（下記 Surface Dark）とテキストリンクが担う

### Semantic（意味的な色）

- 専用のセマンティックカラー（Danger / Warning / Success）は **実サイトに定義されていない**。エラー表示等が必要な場合は、アクセントの赤 #f23030 をエラー色に転用するか、本リポジトリ汎用の Error `#e34837` を最小限あてる

### Neutral（ニュートラル — 基調）

- **Text Strong** (`#222222`): 見出し・ナビ・強調テキスト（rgb 34,34,34）。純黒 #000 は使わない
- **Text Primary** (`#404040`): 本文の基本テキスト（rgb 64,64,64）。body の既定色
- **Text Muted** (`#808080`): メタ情報・NEWS ラベル・補足（rgb 128,128,128）
- **Text on Dark** (`#ffffff`): ニアブラック作例カード・赤ラベル上の白文字
- **Button Text (ghost)** (`#333333`): テキストボタン "OUR SERVICE" の文字色（rgb 51,51,51）
- **Background** (`#ffffff`): ページ・ヘッダーの基本地（body bg）
- **Background Cover** (`#eeeeee`): ヒーロー／cover_video 帯の地（rgb 238,238,238）。上部 viewport で最大面積
- **Surface Tint** (`#f7f7f7`): NEWS 等セクション帯の面（rgb 247,247,247）
- **Surface Dark** (`#1a1a1a`): WORKS（実績）カードの地（rgb 26,26,26）。白文字を大きく乗せる主役面
- **Surface Dark Alt** (`#262626`): 一部の暗面・オーバーレイ（rgb 38,38,38）

---

## 3. Typography Rules

> 実サイトは **欧文＝Maison Neue（Milieu Grotesque）** と **和文＝YakuHanJP ＋ 游ゴシック** を明確に使い分ける。
> Maison Neue は商用ライセンス（Milieu Grotesque）のため preview.html では表示できない。代替は後述。

### 3.1 和文フォント

- **ゴシック体（基本書体）**: YakuHanJP → "Yu Gothic" → 游ゴシック → YuGothic → 游ゴシック体 → "Hiragino Kaku Gothic ProN"（ヒラギノ角ゴ ProN）→ sans-serif。**和文はすべてこのチェーン**
- **YakuHanJP について**: 約物（「」（）、。など）を半角詰めする専用フォント。フォールバックの先頭に置き、後続の 游ゴシック等で本体グリフを表示させる合わせ技。見出し・ナビの約物まわりを引き締める SIX の要
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ（グロテスク）**: **Maison Neue**（Milieu Grotesque）→ sans-serif。body・ヒーロー見出し・英数はこのグロテスクを使う（`ff=MaisonNeue, sans-serif`）
- **セリフ / 等幅**: 実サイトでは持たない

### 3.3 font-family 指定

```css
/* 欧文・英数・ヒーロー見出し（body の既定） */
font-family: "MaisonNeue", sans-serif;

/* 和文（見出し・本文・ナビ） */
font-family: "YakuHanJP", "Yu Gothic", "游ゴシック", "YuGothic", "游ゴシック体",
             "Hiragino Kaku Gothic ProN", sans-serif;
```

- **フォールバックの考え方**: 欧文と和文でチェーンを分ける。欧文は Maison Neue → sans-serif とシンプル。和文は YakuHanJP（約物半角詰め）を先頭に置き、游ゴシック系 → ヒラギノ → sans-serif で閉じる。和文フォントを 1 つだけ指定せず、必ず sans-serif で閉じる

**preview.html での代替フォント**:
- Maison Neue（Milieu Grotesque のニュートラルなグロテスク）→ **Work Sans**（Google Fonts。初期グロテスクを下敷きにした端正なサンセリフで、Maison Neue のプロポーションに近い。weight 400/500/700）。Inter よりもグロテスク由来の字形が Maison Neue に近いため Work Sans を採用
- YakuHanJP ＋ 游ゴシック → **Noto Sans JP**（Google Fonts。weight 400/500/700）。約物半角詰めは Web フォントでは再現しきれないため、代替では `font-feature-settings: "palt" 1` で近似する

### 3.4 文字サイズ・ウェイト階層

> デスクトップ（1440px）での computed style 実測 px。`_context` を併記。

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (Hero, en) | Maison Neue | 80px | 700 | 1.1 (88px) | -0.015em (-1.2px) | ヒーロー "We inspire the mark."（header.main_copy）色 #404040 |
| Work Title (en) | 和文チェーン | 48px | 400 | 1.0 (48px) | 0.015em (0.7px) | WORKS カード見出し "GR Brand Communication"（article.title）色 #ffffff（ダーク地） |
| Client Name (en) | 和文チェーン | 24px | 400 | 1.0 (24px) | 0.03em (0.7px) | クライアント名 "TOYOTA"（article.client）色 #ffffff |
| Body (和文) | 和文チェーン | 18px | 400 | 2.0 (36px) | 0.04em (0.7px) | ステートメント本文（article.text.ja）色 #404040 |
| Body S / News (和文) | 和文チェーン | 16px | 400 | 2.0 (32px) | 0.04em (0.7px) | NEWS 本文・補足（article.text.ja）色 #808080 |
| Section Label (en) | 和文チェーン | 16px | 400 | 1.0 (16px) | 0.1em (1.6px) | "NEWS" 等セクションラベル（article.title.ja）色 #808080 |
| Nav / UI (en/和文) | 和文チェーン | 14px | 400 | 1.0 (14px) | 0.05em (0.7px) | グローバルナビ WORKS / SERVICE / PEOPLE、READ MORE、住所（色 #222222 / #404040 / #ffffff） |

- **ウェイトは 400 が基本**。階層はサイズと余白、そして地色（白／ニアブラック）のコントラストで作る。太字 700 はヒーロー見出しにほぼ限定
- ヒーローだけ欧文を **-0.015em** と負に詰めて塊感を出し、それ以外の英字ラベルは **0.05〜0.1em** と広く開ける
- 色は本文 #404040、見出し・ナビ #222222、メタ #808080、ダーク地では #ffffff

### 3.5 行間・字間

- **本文の行間 (line-height)**: **2.0**（36px / 18px、32px / 16px）。和文本文をゆったり組む SIX の核
- **見出し・UI の行間**: 1.0〜1.1（ヒーロー 88px/80px = 1.1、ラベル類は 1.0 のベタ）
- **和文本文の字間 (letter-spacing)**: 0.04em（0.7px / 18px）〜 0.05em（0.7px / 14px）
- **英字セクションラベルの字間**: 0.1em（1.6px / 16px）と広く開けてラベルらしく見せる
- **ヒーロー欧文の字間**: -0.015em（-1.2px / 80px）と詰める

**ガイドライン**:
- 和文本文は line-height 2.0・letter-spacing 0.04〜0.05em で広く端正に
- 英字のセクションラベル（NEWS / WORKS 等）は 0.1em の広いトラッキングでキャプション化する
- 大きな欧文見出しだけは負のトラッキングで塊にする

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
```

- 行頭禁止: `）」』】、。・：；？！`
- 行末禁止: `（「『【`

### 3.7 OpenType 機能

```css
/* 原典は YakuHanJP による約物半角詰め。実測 computed は font-feature-settings: normal */
font-feature-settings: normal;

/* preview.html（代替 Noto Sans JP）では palt で約物詰めを近似する */
font-feature-settings: "palt" 1;
```

- **重要**: SIX の約物詰めは `palt` ではなく **YakuHanJP フォント自体**で実現している（computed の `font-feature-settings` は normal）。原典を忠実に再現するなら YakuHanJP を font-family チェーン先頭に置く
- Web フォント代替（Noto Sans JP）で近い見た目を出す場合は、見出し・ナビに `palt` を有効化して約物の間延びを抑える

### 3.8 縦書き

該当なし。横書きのみ。

---

## 4. Component Stylings

> SIX は **角丸を一切使わず（radius 0px）**、塗りのブランドカラーボタンを持たない。CTA はニアブラック面（WORKS カード）とテキストリンクが担う。

### Buttons

**Primary（ニアブラック面 / 白文字）** — WORKS カード・主要 CTA 相当
- Background: `#1a1a1a`（Surface Dark）
- Text: `#ffffff`
- Border: なし
- Border Radius: `0px`（直角）
- Padding: 目安 16px 28px
- Font: 和文チェーン / 14px / 400 / letter-spacing 0.05em（英字ラベル）

**Text / Ghost（テキストリンク）** — "OUR SERVICE" / "READ MORE"
- Background: `transparent`
- Text: `#333333`（明地）/ `#ffffff`（ダーク地）
- Border: なし（または下線・矢印を添える）
- Font: 14px / 400 / letter-spacing 0.05em
- ホバーで下線または矢印（→）を伸ばす控えめな反応

**Accent（赤ラベル）** — 限定用途
- Background: `#f23030`（Accent Red）
- Text: `#ffffff`
- Border Radius: `0px`
- 汎用ボタンではなく、住所ラベル等の "一点の赤" として最小面積で使う

### Inputs

> 実サイトは WORKS 中心の構成でフォーム抽出データが取れなかった。下記は基調トークンからの推定値（角丸なしを踏襲）。

- Background: `#ffffff`
- Border: 1px solid `#dddddd`
- Border (focus): 1px solid `#222222`（ダークグレー）＋薄い墨リング
- Border Radius: `0px`（直角。サイト全体が radius 0）
- Padding: 約 12px 14px
- Font: 和文チェーン / 16px / 400 / letter-spacing 0.04em
- Label: 14px / 400

### Cards

**WORKS カード（主役）**
- Background: `#1a1a1a`（Surface Dark）/ 一部 `#262626`
- Text: `#ffffff`（作例名 48px、クライアント名 24px、READ MORE 14px）
- Border: なし
- Border Radius: `0px`
- 作例ビジュアル（画像）を大きく置き、その上／下にニアブラック地＋白文字で作例名・クライアント名・READ MORE を重ねるエディトリアル構成
- 影は持たない（フラット。Depth セクション参照）

---

## 5. Layout Principles

### Spacing Scale

> 実サイトに明示のトークンは出力されなかったため、8px グリッド基準の目安スケール。

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 16px |
| M | 24px |
| L | 40px |
| XL | 64px |
| XXL | 104px |

### Container

- Max Width: 明示トークンなし。ワイドなエディトリアル・グリッドを取り、左右に広い余白を空ける
- Padding (horizontal): 目安 6〜9vw（ヘッダー／フッターの左右余白）

### Grid

- Columns: WORKS 一覧はカードグリッド（おおむね 2〜3 カラム、ビューポート幅で可変）
- Gutter: 24〜40px（M〜L）
- 作例ビジュアルは大きく、余白を広く取って作例を主役にする

---

## 6. Depth & Elevation

> SIX は影をほぼ使わず、白地・ライトグレー面・ニアブラック面のコントラストで階層を作る。フラットが基本。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 全コンポーネントの基本。白／ライトグレー／ニアブラックの面で階層を分ける |
| 1 | `0 1px 3px rgba(0,0,0,0.08)` | ドロップダウン・ドロワー等、必要な箇所だけ最小限 |
| 2 | `0 12px 32px rgba(0,0,0,0.16)` | モーダル等（実サイトでは稀） |

- 階層表現の主役は影ではなく **地色のコントラスト**（白 ↔ #1a1a1a）。作例カードをニアブラックで沈めることで奥行きを作る

---

## 7. Do's and Don'ts

### Do（推奨）

- 基調は無彩色（白 #ffffff / ライトグレー #eeeeee / ニアブラック #1a1a1a）。彩度は赤 #f23030 一色だけを極小面積で差す
- 欧文と和文でフォントを使い分ける（欧文＝Maison Neue、和文＝YakuHanJP ＋ 游ゴシック）
- 角丸は使わない（radius 0px）。ボタン・カード・入力欄すべて直角
- 和文本文は line-height 2.0 とゆったり取る
- 英字セクションラベルは letter-spacing 0.1em と広く開けてキャプション化する
- 大きな欧文ヒーローだけは -0.015em と詰めて塊感を出す
- CTA は塗りのカラーボタンではなく、ニアブラック面カード＋テキストリンクで作る
- テキスト色は純黒 #000 ではなく #222222 / #404040 を使う
- 作例ビジュアルを主役にし、UI は静かに引く

### Don't（禁止）

- 赤 #f23030 を面色ボタン等に多用しない（一点差しが命）
- 角丸（border-radius）を付けない
- 塗りのブランドカラー・ボタンを作らない
- 和文を明朝で組まない（ゴシックが基本）
- 和文フォントを 1 つだけ指定しない（必ず sans-serif で閉じるチェーンを書く）
- 本文の行間を詰めすぎない（2.0 を保つ）
- 本文に純黒 #000 を使わない（#404040 を使う）
- 装飾的なアクセントカラーを赤以外に足さない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム、ナビはドロワー、ヒーロー欧文を縮小 |
| Tablet | 768–1023px | 2 カラムの WORKS グリッド |
| Desktop | ≥ 1024px | 2〜3 カラムのエディトリアル・グリッド、ヒーロー 80px |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- ヒーロー欧文（80px）はモバイルで 40〜48px 程度に縮小
- 和文本文は 16px 前後を確保し、line-height 2.0 を維持
- 英字ラベルの letter-spacing 0.1em はモバイルでも維持する

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Base: #ffffff (white) / #eeeeee (cover) / #f7f7f7 (tint) / #1a1a1a (dark surface)
Accent: #f23030 (赤・一点差しのみ)
Text: #222222 (strong) / #404040 (body) / #808080 (muted) / #ffffff (on dark)
欧文 Font: "MaisonNeue", sans-serif            /* 代替: "Work Sans" */
和文 Font: "YakuHanJP", "Yu Gothic", 游ゴシック, sans-serif  /* 代替: "Noto Sans JP" */
Hero (en): 80px / 700 / lh 1.1 / ls -0.015em
Body (和文): 18px / 400 / lh 2.0 / ls 0.04em
Section Label (en): 16px / 400 / ls 0.1em
Nav / UI: 14px / 400 / ls 0.05em
Radius: 0px（角丸なし）
Button: 面色 CTA なし。ニアブラック #1a1a1a 地＋白文字カード or テキストリンク
```

### プロンプト例

```
SIX のデザインシステムに従って、WORKS（実績）一覧ページを作成してください。
- 基調は無彩色: 背景 #ffffff / cover 帯 #eeeeee、作例カードはニアブラック #1a1a1a ＋白文字
- 彩度は赤 #f23030 一色だけを、ラベルなど極小面積に差す（面色ボタンには使わない）
- 欧文・英数は "MaisonNeue", sans-serif（代替 Work Sans）、和文は "YakuHanJP", "Yu Gothic", 游ゴシック, sans-serif（代替 Noto Sans JP）
- 角丸は一切使わない（border-radius: 0）
- ヒーローの欧文見出しは 80px / weight 700 / letter-spacing -0.015em で大きく塊に
- 和文本文は 18px / line-height 2.0 / letter-spacing 0.04em、英字セクションラベルは 0.1em の広いトラッキング
- CTA は塗りのカラーボタンではなく、ニアブラック地＋白文字の作例カードと "READ MORE" テキストリンクで作る
- テキスト色は #222222（見出し）/ #404040（本文）/ #808080（メタ）、純黒 #000 は使わない
- 作例ビジュアルを大きく主役に置き、UI は静かに引く
```
