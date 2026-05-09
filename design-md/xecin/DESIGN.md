# DESIGN.md — XECIN

> XECIN（https://xecin.jp/）のデザイン仕様書。
> AIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実サイトのグローバル CSS（Astro でバンドルされる `:root` CSS カスタムプロパティ）に基づく実測値。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: シャープ・ダーク・モダン。装飾を排したミニマルな黒基調コーポレートデザイン。深みのある暗色と鮮やかなクリムゾン（深紅）グラデーションのコントラストで、技術力と信頼感を表現
- **密度**: セクション単位で余白を大きく取った低密度レイアウト。情報は絞り込まれており、コンテンツの見通しが良い
- **キーワード**: 鋭利、暗色、プロフェッショナル、緊張感、技術主導
- **特徴**:
  - ヒーローは超暗色（`#0c0408`）背景に写真をオーバーレイ。ライトセクションは純白 `#fff` または微かなローズがかった `#faf3f6`
  - ブランドカラーはクリムゾン系グラデーション（`#b82048` → `#d03060`）
  - ボタン・CTA の角丸は **0（シャープエッジ）** — ブランドの最も特徴的なデザイン判断
  - 表示フォント（Barlow Condensed）と和文フォント（Noto Sans JP）を明確に使い分け

---

## 2. Color Palette & Roles

<!-- 実サイト `:root` CSS カスタムプロパティから直接取得 -->

### Primary（ブランドカラー）

- **Crimson** (`#b82048`): ブランドグラデーション開始色（`--gd`）。ボタン・アクセントライン・ホバー効果・アイコンに使用
- **Rose** (`#d03060`): ブランドグラデーション終了色（`--gd2`）。CTA ボタン・見出しアクセントに使用
- **Light Rose** (`#e04878`): ブランドカラーのライト版（`--gd3`）。グラデーション内の明るい段階

### Dark（ダーク系）

- **Ink** (`#0c0408`): 本文テキスト・ナビ背景（`--ink`）。純粋な黒ではなく深いパープルがかった黒
- **Deep Ink** (`#1e0814`): ヒーロー背景・フッター背景（`--ink2`）。より深いダーク

### Neutral Muted（ミュート系）

- **Mauve** (`#705060`): 補足テキスト・説明文（`--tm`）。ローズがかったグレー
- **Dark Mauve** (`#4a3040`): より濃いセカンダリテキスト（`--ts`）

### Background Scale

- **White** (`#ffffff`): メインページ背景（`--bg`）
- **Rose 50** (`#faf3f6`): サービス/ケース等ライトセクション背景（`--bg2`）
- **Rose 100** (`#f2e6ec`): カード間ギャップ・区切り（`--bg3`）
- **Rose 200** (`#ead8e0`): より濃いサーフェス（`--bg4`）

### Border

- **Brand Border** (`rgba(184, 32, 72, 0.15)`): セクション区切り・カードボーダー（`--bd` = `#b8204826`）
- **Subtle Border** (`rgba(184, 32, 72, 0.07)`): 微細区切り（`--bds` = `#b8204812`）

---

## 3. Typography Rules

<!-- Google Fonts 経由で読み込み。font-family 指定はサイト CSS に基づく -->

### 3.1 和文フォント

- **ゴシック体**: Noto Sans JP（Google Fonts）。ウェイト 300/400/500/700/900 を読み込み
- 明朝体: 使用なし

### 3.2 欧文フォント

- **コンデンスドサンセリフ（表示用）**: Barlow Condensed（Google Fonts）。ウェイト 400/600/700/800/900 を読み込み
- **等幅**: 未使用（プロダクトUIなし）

### 3.3 font-family 指定

```css
/* 和文本文・説明文 */
font-family: "Noto Sans JP", sans-serif;   /* --font-body */

/* ロゴ・見出し・ラベル・CTA ボタン（英数字主体の表示用） */
font-family: "Barlow Condensed", sans-serif;  /* --font-display */
```

**フォールバックの考え方**:
- 和文本文は Noto Sans JP + sans-serif フォールバック（Noto が読み込めない環境でもシステム和文フォントに切り替わる）
- 表示フォント（Barlow Condensed）は英数字・大文字ラベル専用。和文には使わない
- ロゴ文字列「XECIN」は Barlow Condensed + font-weight 900 が正確な指定

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero H1 | Barlow Condensed | clamp(40px, 9vw, 120px) | 900 | 0.95 | — | ヒーロー大見出し（超タイト） |
| Section Display | Barlow Condensed | clamp(48px, 7vw, 88px) | 900 | 1.0 | -0.01em | セクション英語タイトル |
| CTA Heading | Barlow Condensed | clamp(36px, 6vw, 72px) | 900 | 1.05 | -0.01em | CTAセクション見出し |
| Band H2 | Barlow Condensed | clamp(28px, 4.5vw, 56px) | 900 | 1.1 | -0.01em | フォトバンド見出し |
| Step Title | Noto Sans JP | 20px | 900 | — | -0.01em | ステップ・実績見出し |
| FAQ / Body H3 | Noto Sans JP | 15px | 700 | 1.5 | — | FAQ 質問・中見出し |
| Body | Noto Sans JP | 13–14px | 300 | 1.85–1.9 | — | 説明文・本文 |
| Caption / Small | Noto Sans JP | 12–13px | 300–400 | — | 0.07–0.08em | ナビリンク・補足 |
| Label / Eyebrow | Barlow Condensed | 10–12px | 700 | — | 0.16–0.22em | 大文字ラベル・タグ |

### 3.5 行間・字間

- **本文の行間 (line-height)**: `1.85〜1.9`（日本語説明文・カード本文）
- **見出しの行間（英語コンデンスド）**: `0.95〜1.1`（超タイト。英語大文字表示専用）
- **本文の字間 (letter-spacing)**: `0.07〜0.08em`（日本語本文・ナビリンク）
- **ラベル・アイブロウの字間**: `0.16〜0.22em`（大文字英字ラベル）
- **見出し letter-spacing**: `-0.01em`（軽く詰める）

**ガイドライン**:
- 日本語本文 `line-height: 1.85` 以上で可読性を確保（このサイトの標準）
- Barlow Condensed の `letter-spacing: 0.16em+` は大文字ラベル専用設定。和文に適用しないこと
- 本文 font-weight 300 は Noto Sans JP の Light ウェイト。細身で洗練された印象

### 3.6 禁則処理・改行ルール

```css
/* サイトで観測されたスタイル */
overflow-x: hidden;  /* 横スクロール防止 */
```

- 禁則処理の明示的な CSS 指定なし（ブラウザデフォルトに依存）
- 長い単語・URLの折り返し用の `overflow-wrap` 指定なし
- ヒーロー h1 内で `white-space: nowrap` を特定のスパンに適用

**禁則対象（一般原則）**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

**推奨実装**（本サイトは未適用、CJK 品質向上のため）：
```css
body {
  word-break: normal;
  overflow-wrap: break-word;
  line-break: strict;
}
```

### 3.7 OpenType 機能

```css
/* サイト全体設定（body タグ） */
-webkit-font-smoothing: antialiased;  /* アンチエイリアス強制適用 */
```

- `font-feature-settings` の明示的指定なし
- Noto Sans JP のデフォルト設定をそのまま使用
- `antialiased` 指定により macOS/iOS での文字がやや細く表示される（意図的）

**推奨実装**（本サイトは未適用）：
```css
body {
  font-feature-settings: "palt" 1, "kern" 1;
  /* palt: プロポーショナル字詰め */
  /* kern: カーニング */
}
```

### 3.8 縦書き

- 該当なし。横書きのみ

---

## 4. Component Stylings

### Buttons

**Primary CTA（グラデーション）**
- Background: `linear-gradient(135deg, #b82048, #d03060)`
- Text: `#ffffff`
- Border Radius: **0px（シャープエッジ。角丸なし）**
- Font: Barlow Condensed 12px, weight 700
- Letter Spacing: 0.12em
- Text Transform: uppercase
- Padding: 14px 36px
- Hover: `opacity: 0.88`, `transform: translateY(-1px)`

**Secondary（アウトライン・白背景用）**
- Background: `transparent`
- Border: `1px solid rgba(255, 255, 255, 0.25)`
- Text: `rgba(255, 255, 255, 0.6)` → hover: `rgba(255, 255, 255, 1.0)`（色変化）
- Border Radius: **0px**
- Padding: 13px 28px
- Hover Border: `1px solid #b82048`、Text: `#b82048`

**Nav CTA（ナビゲーション右端）**
- Background: `#0c0408`
- Text: `#ffffff`
- Font: Barlow Condensed 11px, weight 700
- Letter Spacing: 0.12em
- Text Transform: uppercase
- Padding: 9px 22px
- Border Radius: **0px**
- Hover: `background: #b82048`

**Cases / Section CTA（ブランドカラー単色）**
- Background: `#b82048`
- Text: `#ffffff`
- Font: Barlow Condensed 11px, weight 700
- Letter Spacing: 0.16em
- Padding: 16px 44px
- Border Radius: **0px**
- Hover: `background: #0c0408`

### Inputs

- 問い合わせフォームは別ページ（`/contact`）。汎用 UI コンポーネントは以下をデフォルトとして使用
- Border: `1px solid rgba(184, 32, 72, 0.15)` (`--bd`)
- Border Radius: 0px（サイトポリシーに合わせてシャープ）
- Background: `#ffffff`
- Focus Border: `#b82048`（ブランドカラー）

### Cards（Service Cards）

- Background: `#ffffff`
- Border Top: `3px solid transparent` → hover: `3px solid #b82048`
- Border Radius: **0px**
- Padding (body): 28px 28px 32px
- Shadow (hover): `0 6px 32px rgba(184, 32, 72, 0.1)` — ブランドカラーティント
- Image Height: 200px, `object-fit: cover`, `filter: brightness(0.85) saturate(0.75)` → hover 解除

### Cards（NS/News Section）

- Background: `#ffffff`
- Border: `1px solid #f0f0f0`
- Border Radius: **6px**（このカードのみ例外的に角丸あり）
- Padding: 24px
- Shadow: `0 6px 20px rgba(0, 0, 0, 0.05)`

### Navigation

- Background: `rgba(255, 255, 255, 0.95)` + `backdrop-filter: blur(16px)`
- Border Bottom: `1px solid rgba(184, 32, 72, 0.12)`
- Height: 64px
- Padding: 0 52px
- Position: fixed（スクロール追従）

---

## 5. Layout Principles

### Spacing Scale

8px ベースのスペーシング。実サイトで頻出する値:

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 32px |
| 2XL | 52px |
| 3XL | 96px |

### Container

- Max Width: 1200px (`--container`)
- Padding (horizontal): 52px (`--section-pad-h`)
- Section Padding (vertical): 96px (`--section-pad-v`)

### Grid

- Service Cards: 3カラム, gap 2px（tight grid）
- Cases / Works: 2カラム, gap 3px（tight grid）
- Nav + Footer: flexbox（space-between）

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素（デフォルト） |
| 1 | `0 6px 20px rgba(0,0,0,0.05)` | NS カード |
| 2 | `0 6px 32px rgba(184,32,72,0.1)` | サービスカード・ケースカード（hover 時）、ブランドカラーティント |
| 3 | — | 未定義（モーダル等は使用なし） |

**特記**: このサイトのシャドウは通常の黒でなくブランドカラー（クリムゾン）がティントされる。UIの統一感のある設計。

---

## 7. Do's and Don'ts

### Do（推奨）

- ボタン・CTA の `border-radius` は **0px**（角丸なし）を厳守する — このサイトの最も特徴的なデザイン判断
- 表示フォント（Barlow Condensed）は英数字・大文字ラベル・ロゴ文字列にのみ使用する
- 日本語本文の `line-height` は `1.85` 以上を使用する（1.9 が標準）
- カード hover 時のシャドウは `rgba(184, 32, 72, 0.1)` のブランドカラーティントにする
- ダークセクションの背景は `#0c0408`（Ink）または `#1e0814`（Deep Ink）を使う
- アクセントライン・区切り線には `rgba(184, 32, 72, 0.15)` のブランドカラーを使う
- セクションタイトルの英語部分は Barlow Condensed 900 weight + uppercase で統一する

### Don't（禁止）

- ボタン・CTA に `border-radius` を付けない（角丸は NS/News Section カードの例外を除き使わない）
- Barlow Condensed を日本語テキストのレンダリングに使用しない（Latin 専用フォント）
- 純粋な黒 `#000000` をテキストカラーに使わない。必ず `#0c0408`（Ink）を使う
- ブランドグラデーション（`#b82048` → `#d03060`）の向きを `135deg` 以外に変えない
- 本文テキスト color を `#705060`（Mauve）より明るいグレーにしない（コントラスト不足）
- 日本語本文に `font-weight: 400` 以上を使わない（Light = 300 が基本）
- ダーク背景セクションのテキストに純白 `#ffffff` 以外の色を使う場合は `rgba(255,255,255,0.6)` 以上を確保する

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 600px | スマートフォン（NS セクション変更点） |
| Tablet/SP | ≤ 768px | タブレット・大型スマートフォン（ほとんどのグリッド変更点） |
| Desktop | > 768px | デスクトップレイアウト |

### タッチターゲット

- Nav CTA ボタン: 約 38px 高さ（padding 9px × 2 + font-size 11px）

### フォントサイズの調整

- `clamp()` により流動的にスケール。`min(mobile)` → `max(desktop)` で自動調整
- Hero h1: `clamp(40px, 9vw, 120px)`
- Section display: `clamp(48px, 7vw, 88px)`
- 本文・説明文は固定値（13–14px）でデスクトップ・モバイルとも同一

### モバイルでのレイアウト変更

- Section padding: `96px 52px` → `56–64px 16–20px`
- Service cards: 3カラム → 1カラム
- Cases grid: 2カラム → 1カラム
- Nav: ハンバーガーメニュー化、リンクをドロワー表示
- Band strip（サイド画像帯）: `display: none`

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Gradient: linear-gradient(135deg, #b82048, #d03060)
Primary Color: #b82048
Text Color (Ink): #0c0408
Text Secondary (Mauve): #705060
Background: #ffffff
Background Alt: #faf3f6
Dark Background: #0c0408
Border Color: rgba(184, 32, 72, 0.15)
Display Font: "Barlow Condensed", sans-serif  （英数字・ラベル用）
Body Font: "Noto Sans JP", sans-serif         （日本語本文用）
Body Size: 13–14px
Body Line Height: 1.85–1.9
Body Font Weight: 300
Button Border Radius: 0px（角丸なし）
```

### プロンプト例

```
XECINのデザインシステムに従って、サービス紹介カードを作成してください。
- カード背景: #ffffff
- border-radius: 0px（角丸なし）
- 上部ボーダー: 3px solid transparent（hover 時 #b82048）
- hover 時 shadow: 0 6px 32px rgba(184,32,72,0.1)
- カテゴリラベル: font-family "Barlow Condensed", font-size 12px, weight 700, letter-spacing 0.22em, color #b82048, uppercase
- タイトル: font-family "Noto Sans JP", font-size 14px, weight 700, color #0c0408
- 説明文: font-family "Noto Sans JP", font-size 13px, weight 300, line-height 1.85, color #705060
- CTAボタン: background linear-gradient(135deg,#b82048,#d03060), color #fff, font-family "Barlow Condensed", font-size 12px, weight 700, letter-spacing 0.12em, uppercase, padding 14px 36px, border-radius 0
```
