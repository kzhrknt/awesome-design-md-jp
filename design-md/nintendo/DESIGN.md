# DESIGN.md — Nintendo Japan (nintendo.com/jp)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 任天堂株式会社（Nintendo Co., Ltd.）日本公式サイト。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 大手家電・玩具メーカーの王道。白基調 × 赤アクセントで親しみやすさと信頼感を両立。装飾を抑えてカード・グリッド主導で情報を整理する典型的なコンシューマー導線
- **密度**: ゆったり目。本文の line-height は **2.0**（業界水準より広い）と、可読性を最優先する設計
- **キーワード**: Friendly, Iconic Red, Spacious, Clean, Consumer-first

---

## 2. Color Palette & Roles

### CSS Custom Properties（実測値・`--ncom-*` 名前空間）

実サイトは Nintendo.com 共通設計システム `ncom` の Custom Properties を使用している（Switch 2 ページに完全な定義が見られる）。

```css
/* === Brand === */
--ncom-color-red:        #e60012;  /* シグネチャー赤。CTA・強調 */
--ncom-color-deep-red:   #cf0001;  /* プレス時の濃い赤 */

/* === Neutral === */
--ncom-color-white:      #fff;
--ncom-color-black:      #000;
--ncom-color-gray:       #c8c8c8;
--ncom-color-gray-100:   #f8f7f6;  /* 最薄の背景 */
--ncom-color-gray-300:   #e6e6e6;  /* 中間グレー */
--ncom-color-gray-500:   #d9d9d9;  /* やや濃いグレー */
--ncom-color-blue-gray:  #e6e6e6;  /* 青寄りのグレー（実際は gray-300 と同値） */

/* === Text === */
--ncom-color-heading:    #1b1b1b;  /* 見出し本色 */
--ncom-color-txt:        #3c3c3c;  /* 本文 */
--ncom-color-txt-sub:    #8c8c8c;  /* 補足・キャプション */

/* === Accent === */
--ncom-color-gold:       #9d7c00;  /* 高級アクセント */
--ncom-color-light-blue: #00a5e6;  /* 機能アクセント */
--ncom-color-yellow:     #fff000;  /* 注意・ハイライト */
--ncom-color-chat:       #f58c14;  /* チャット系オレンジ */
--ncom-color-share:      #08b3bf;  /* シェア系ティール */
--ncom-color-card:       #808088;  /* カード境界 */
```

### Primary（ブランドカラー）

- **Brand Red** (`#e60012`): 任天堂のシグネチャー赤。CTA ボタン・主要アクション・強調点に使用
- **Deep Red** (`#cf0001`): プレス・アクティブ時のフォローカラー

### Text Roles

- **Heading** (`#1b1b1b`): 大見出し（純粋な黒より少し柔らかい黒）
- **Text Primary** (`#3c3c3c`): 本文（グレー寄りの黒）
- **Text Sub** (`#8c8c8c`): 補足・日付・メタ情報

### Background Roles

- **Page Bg** (`#ffffff`): ページ背景
- **Surface 100** (`#f8f7f6`): 最薄ベージュ系背景（カード・セクション区切り）
- **Surface 300** (`#e6e6e6`): 中間グレー（検索ボックス背景等）
- **Footer Bg** (`#f2f2f2`): フッター（実測値。Custom Property には未定義）

---

## 3. Typography Rules

### 3.1 和文フォント

任天堂は **YakuHanJPs（約物半角フォント）+ Hiragino Kaku Gothic ProN + ncomJp** という非常に丁寧な多重スタックを採用している。

- **YakuHanJPs**（約物専用）: 全角句読点（、。「」（）等）を半角幅で表示するためのオープンソース約物専用フォント。和欧混植時の不自然な空白を排除する
- **Hiragino Kaku Gothic ProN**: macOS / iOS 標準の和文ゴシック（メイン本文）
- **ヒラギノ角ゴ ProN W3**: 日本語ファミリ名でのフォールバック
- **ncomJp**: 任天堂が定義した独自ファミリ名（おそらく Web フォント）
- **明朝体**: 使用していない

### 3.2 欧文フォント

- **Roboto**（Google Fonts）: 数字・英字を表示する標準サンセリフ。News ページの年月見出し（38px）等で純粋な Roboto のみ指定の例も
- **Arial**: 一部のフォーム要素・ボタンでブラウザデフォルトとして観測

### 3.3 font-family 指定

実サイトの Custom Property:

```css
/* メイン和文スタック（ja） */
--ncom-ff-ja: "YakuHanJPs", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Arial, "ncomJp", sans-serif;

/* Noto 系スタック（noto） */
--ncom-ff-noto: "Noto Sans JP", "Roboto", Arial, "ncomJp", sans-serif;

/* Latin 専用（数字・英文） */
--ncom-ff-roboto: "Roboto", sans-serif;
```

実 body の computed style はこれに **Roboto** を間に挟んだ拡張形:

```css
font-family: "YakuHanJPs", "Roboto", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Arial, "ncomJp", sans-serif;
```

**フォールバックの考え方**:
- **YakuHanJPs を最優先**（約物だけ半角化）→ **Roboto（欧文）** → **Hiragino（和文）** の順で「約物」「欧文」「和文」を別フォントが受け持つ三段構成
- これにより和欧混植時の句読点まわりの空白が綺麗になり、欧字も Roboto で統一される
- News ページの年月見出しなど、**純粋に Latin 文字しか出ない箇所では `Roboto, sans-serif` のみを指定**してフォントロード負荷を下げている

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Body | YakuHan + Roboto + Hiragino | 16px | 400 | 32px (×2.0) | normal | 本文。color: #3c3c3c |
| Heading Lv1 | YakuHan + Roboto + Hiragino | 30px | 600 | 54px (×1.8) | 0.9px (≈0.03em) | `ncom-c-center-heading-lv1`。color: #1b1b1b |
| Heading Lv1 (sub) | YakuHan + Roboto + Hiragino | 16px | 600 | 28.8px (×1.8) | 0.48px (≈0.03em) | 中見出し系 |
| Section H3 | YakuHan + Roboto + Hiragino | 16px | 700 | 32px (×2.0) | normal | カード見出し |
| News Year-Month | Roboto | 38px | 400 | 38px (×1.0) | normal | "2026.4" 等。color: #8c8c8c |
| News Day | YakuHan + Roboto + Hiragino | 16px | 400 | 16px (×1.0) | normal | "28火" 等 |
| News Article Title | YakuHan + Roboto + Hiragino | 14px | 400 | 22.4px (×1.6) | normal | 一覧の記事タイトル |
| Nav Main Item | YakuHan + Roboto + Hiragino | 14px | 700 | 72px (header height) | normal | "本体・グッズ" 等 |
| Nav Item (tracked) | YakuHan + Roboto + Hiragino | 14px | 700 | 75px | 0.84px (≈0.06em) | "本体・グッズ" 一部 |
| Nav Tight | YakuHan + Roboto + Hiragino | 14px | 700 | 72px | -0.7px (≈-0.05em) | "ゲームソフト"（やや詰め） |
| Nav Sub | YakuHan + Roboto + Hiragino | 10px | 700 | 18px (×1.8) | normal | "さがす" "ストア" 等の極小ナビ |
| Link Button | YakuHan + Roboto + Hiragino | 16px | 400 | 24px (×1.5) | normal | `ncom-c-link-btn` |

### 3.5 行間・字間

- **本文の line-height: 2.0**（32px / 16px）— 業界平均（1.6〜1.8）よりかなり広く、読みやすさ最優先の設計
- **見出しの line-height: 1.8**（54 / 30, 28.8 / 16）— 和文見出しの標準より広め
- **News タイトル: 1.6**（22.4 / 14）— 一覧で省スペース
- **letter-spacing**:
  - 通常: `normal`
  - 見出しは **0.03em〜0.06em** の微小プラストラッキング（30px 見出しで 0.9px 等）
  - 一部のナビ項目（"ゲームソフト"）で **-0.7px の負トラッキング**（コンテンツに合わせて手調整）

**ガイドライン**:
- 本文は **× 2.0** で広めにとる（任天堂らしい優しさ）
- 見出しはわずかにプラストラッキング（0.03em 程度）して読みやすく
- 多くの場合は normal で十分。letter-spacing をアグレッシブに使わない

### 3.6 禁則処理・改行ルール

```css
/* 観測上の特殊指定なし。ブラウザデフォルト + YakuHanJPs による句読点幅最適化が中心 */
word-break: normal;
overflow-wrap: normal;
line-break: auto;
```

YakuHanJPs を最先頭に置くことで「、。「」」等の約物が半角化され、和文の改行・字間が自然になる。

### 3.7 OpenType / 特殊機能

```css
/* font-feature-settings は明示指定なし（normal） */
/* 代わりに leading-trim プロパティを使う前提で変数定義 */
--ncom-leading-trim: calc((1em - 1lh) / 2);
```

- `palt` は使わず、約物半角化は **YakuHanJPs フォント側** に責任を持たせる方式
- **leading-trim**（CSS の半行送り削除）を独自トークンで定義しているのが特徴的。見出しの上下余白を 1lh 基準で自動計算する

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Link Button (`ncom-c-link-btn`)**
- Font Size: 16px
- Font Weight: 400
- Line Height: 24px (×1.5)
- 横長のリンクボタン。ホワイト・透明背景バリエーションあり

**Pager Button (`nc3-a-buttonPager`)**
- Background: `#e60012`（ブランド赤）
- Color: `#e60012`（テキストも赤）→ アクティブ時の表現
- Font Family: Arial（システムデフォルト）
- Font Size: 13.3333px（ブラウザ既定）
- Border Radius: 0px

**Search Box Button**
- Background: `#e6e6e6`（gray-300）
- Color: `#b4b4b4`
- Font Size: 16px / 700
- Border Radius: 2px

**Header Nav Item (Mega Drop Trigger)**
- Background: transparent
- Color: `#3c3c3c`
- Font Size: 14px / 700
- Line Height: 72px（ヘッダー高さに合わせる）

### Links

- **Default Link**: 標準的な下線リンク。ブランド赤を多用しない
- **Hover**: 不透明度・下線・色変化のいずれか（明示的指定は箇所により異なる）

### Cards

実サイトはカードベースのレイアウトが中心:
- **News Card**: 14px / lh 22.4px (×1.6) のタイトル + 16px の日付 + 38px の年月（Roboto）
- **Game Card**: 画像優先のサムネイル + タイトル + 価格

明示的な汎用カード CSS は単一トークンとしては定義されておらず、ページごとに専用クラス（`switch2-classics-soft-heading-txt` 等）を持つ。

### Inputs

- 検索ボックスは bg `#e6e6e6` / border-radius 2px のフラットスタイル
- ラベル・プレースホルダーの色は `#b4b4b4`〜`#8c8c8c`

### Mega Drop Menu

ヘッダーの "本体・グッズ" "ゲームソフト" 等はマウスオーバーで巨大なメガドロップが展開される。
- ヘッダー高さ: 72px
- メガドロップ展開時はオーバーレイで全幅表示

---

## 5. Layout Principles

### Header

- **高さ**: 72px（ナビ項目の line-height と一致）
- **背景**: 白（透明〜白）
- **構成**: ロゴ + 主要ナビ + 検索 + アカウント + ストア
- **Sticky**: スクロール時も固定

### Spacing Scale

明示的なスペーシングトークンは抽出範囲では検出されず（コンポーネント単位で個別定義）。

### Container

- メインコンテンツは中央寄せ・両端余白あり
- グリッドベースのカードレイアウトが基本

### Animation Tokens

```css
--ncom-ease-scaleUp: cubic-bezier(0.455, 0.03, 0.515, 0.955);
```

スケールアップ系のアニメーションに使う ease-in-out 系のキュービックベジェ。任天堂 UI のソフトな弾みを表現。

### CSS-only Layout Variables

```css
--left:        -25vw;
--left--minus: -25vw;
--modal--height: 100vh;
```

メガドロップやモーダルのオフセット・全幅高さを CSS 変数で制御。

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 基本的にフラット |

- 明示的な box-shadow トークンは確認できず
- 色面の差（白・gray-100・gray-300）と境界線で奥行きを表現

---

## 7. Do's and Don'ts

### Do（推奨）

- 本文の line-height は **2.0** で広めに取る（任天堂らしいゆったり感）
- 見出しに **letter-spacing 0.03〜0.06em** のわずかなプラストラッキングを入れる
- 約物（、。「」）を含む和文には **YakuHanJPs を最優先**で指定する
- font-family は YakuHan → Roboto → Hiragino → ncomJp の順で指定する
- ブランド赤 `#e60012` は CTA・強調・主要アクションに限定して使う
- グレースケールは Custom Property の 100 / 300 / 500 を活用する
- 純 Latin 文字のみの箇所では `Roboto, sans-serif` の単独指定で軽量化する
- アニメーションには `cubic-bezier(0.455, 0.03, 0.515, 0.955)` のスケールアップ ease を使う

### Don't（禁止）

- font-feature-settings: palt をかけない（約物半角化は YakuHanJPs フォント側の責務）
- 本文を line-height 1.5 で組まない（任天堂は 2.0 が基準）
- ブランド赤を本文や広面積背景に使わない（強調点専用）
- Hiragino を最先頭に置かない（必ず YakuHanJPs を先頭にして約物優先）
- 見出しのウェイトを 700 / 900 に上げすぎない（**600** が中心）
- 派手なシャドウやグラデーションでフラット感を崩さない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | 〜767px | スマートフォン |
| Tablet | 768〜1024px | タブレット |
| Desktop | 1025px〜 | デスクトップ |

### タッチターゲット

- 最小 44 × 44px（WCAG 推奨）
- ヘッダーの主要ナビは PC で 72px の高さ

### フォントサイズの調整

- モバイルでは見出し 30px → 22〜24px、News 年月 38px → 28px 程度に縮小
- 本文 16px は維持（line-height は 1.8〜2.0 をキープ）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
# Brand
Brand Red:       #E60012   ← CTA・強調
Deep Red:        #CF0001   ← プレス時

# Text
Heading:         #1B1B1B
Body:            #3C3C3C
Sub:             #8C8C8C

# Backgrounds
Page:            #FFFFFF
Surface 100:     #F8F7F6   ← カード薄背景
Surface 300:     #E6E6E6   ← 検索ボックス
Footer:          #F2F2F2

# Typography
Body Stack:    "YakuHanJPs", "Roboto", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Arial, "ncomJp", sans-serif
Latin-only:    "Roboto", sans-serif
Body:          16px / 400 / lh 32px (×2.0) / ls normal / color #3C3C3C
Heading Lv1:   30px / 600 / lh 54px (×1.8) / ls 0.9px (≈0.03em) / color #1B1B1B
News Y-M:      38px / 400 / lh 38px / Roboto only / color #8C8C8C
Nav Item:      14px / 700 / lh 72px / ls normal
font-feature-settings: normal（約物は YakuHanJPs に任せる）
```

### プロンプト例

```
Nintendo Japan のデザインシステムに従って、ゲームソフト紹介ページを作成してください。

- font-family: "YakuHanJPs", "Roboto", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Arial, sans-serif
- Latin 専用領域（年月日・価格等）: "Roboto", sans-serif で軽量化
- 本文: 16px / 400 / line-height 32px (×2.0) / color: #3C3C3C / letter-spacing: normal
- 見出し Lv1: 30px / 600 / line-height 54px / letter-spacing: 0.9px / color: #1B1B1B
- 見出し Lv2: 16px / 600 / line-height 28.8px / letter-spacing: 0.48px / color: #1B1B1B
- 主要 CTA: bg #E60012 / color: #FFFFFF / hover bg: #CF0001
- カード背景: #F8F7F6 / 区切り線: #E6E6E6
- アニメーション: cubic-bezier(0.455, 0.03, 0.515, 0.955) のスケールアップ
- 約物（、。「」）は YakuHanJPs に任せ、palt は使わない
```

### YakuHanJPs について

実サイトでは **YakuHanJPs**（約物半角フォント）を最優先で読み込むことで、和欧混植時の句読点まわりの空白を最適化している。

- 元プロジェクト: <https://github.com/qrac/yakuhanjp>
- 配信: jsdelivr 等の CDN で利用可能
- ライセンス: MIT
- 使い方: フォントを `@font-face` で読み込み、family 名を最優先に指定すれば全角約物だけが半角化される

このフォントを使うと `palt`（OpenType プロポーショナルメトリクス）を使わなくても約物の余白が自然になるため、Nintendo は意図的に palt を OFF にしている。
