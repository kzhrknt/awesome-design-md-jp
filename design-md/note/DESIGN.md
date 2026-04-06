# DESIGN.md — note

> note（https://note.com/）のデザイン仕様書。
> 実サイトのCSS（Tailwind CSS v3.4.1 + Svelte スコープドスタイル）および CSS Custom Properties に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 読みやすさを最優先にした、落ち着いたメディアプラットフォーム。書き手と読み手の体験を大切にし、コンテンツが主役のデザイン
- **密度**: ゆったりとした余白。記事コンテンツエリアは 620px 幅で可読性を重視
- **キーワード**: 読みやすい、温かい、ミニマル、コンテンツファースト、落ち着き
- **特徴**: 純粋な黒（`#000000`）ではなく、ほぼ黒の `#08131a` を使用し、柔らかい読書体験を提供。ダークモード完全対応

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **note Green** (`#5ac8b8`): ブランドアイデンティティカラー。ロゴ、アクセントに使用

### Semantic（意味的な色） — CSS Custom Properties 実測値

- **Success** — surface: `#1e7b65`, text: `#1e7b65`, subdued: `#e6f6f2`
- **Danger** — surface: `#b22323`, text: `#b22323`, subdued: `#fdf3f3`
- **Caution** — surface: `#916626`, text: `#916626`, subdued: `#fefbea`
- **Like** — surface: `#d13e5c`, text: `#d13e5c`
- **Offer** — surface: `#d13e5c`, text: `#d13e5c`
- **Badge** (`#d53c21`): 通知バッジ
- **Point** — text: `#8b7f2c`

### Neutral — Gray Scale

- **Gray 900** (`#08131a`): 本文テキスト（ほぼ黒）
- **Gray 800** (`#202a30`): 濃いテキスト
- **Gray 700** (`#363f42`): 強調テキスト
- **Gray 600** (`#5a656b`): セカンダリテキスト
- **Gray 500** (`#7e888f`): 薄いテキスト
- **Gray 400** (`#9ca7ad`): プレースホルダー
- **Gray 300** (`#aeb7bd`): 無効状態
- **Gray 200** (`#c5ccd1`): 薄いボーダー
- **Gray 100** (`#dce0e3`): ボーダー
- **Gray 50** (`#f5f8fa`): セカンダリ背景

### Text（テキスト色 — CSS Custom Properties）

- **Text Primary** (`#08131a`): 本文テキスト。ダーク: `hsla(0,0%,100%,0.90)`
- **Text Secondary** (`rgba(8,19,26,0.66)`): 補足テキスト。ダーク: `hsla(0,0%,100%,0.66)`
- **Text Clickable Icon** (`rgba(8,19,26,0.50)`): クリック可能アイコン
- **Text Disabled** (`rgba(8,19,26,0.50)`): 無効テキスト
- **Text Invert** (`#ffffff`): 反転テキスト（暗い背景上）
- **Text Placeholder** (`#888`): プレースホルダー

### Surface & Borders

- **Background Primary** (`#fff`): ページ背景
- **Background Secondary** (`#f5f8fa`): セクション背景
- **Surface Normal** (`#fff`): カード等の面
- **Surface Primary** (`#08131a`): プライマリ面（CTA等）。reaction: `#202a30`
- **Surface Secondary** (`#43709d`): セカンダリ面
- **Surface Tertiary** (`#5a656b`): 第三階層面
- **Surface Quaternary** (`#f5f8fa`): 第四階層面
- **Surface Invert** (`#000`): 反転面
- **Surface Clear** (`hsla(0,0%,100%,0)`): 透明面
- **Border Default** (`rgba(8,19,26,0.14)`): 標準ボーダー
- **Border Strong** (`rgba(8,19,26,0.22)`): 強いボーダー
- **Border Weak** (`#f5f8fa`): 弱いボーダー
- **Border Primary** (`#08131a`): プライマリボーダー
- **Border Focus** (`#292d9e`): フォーカスリング（darkblue-600）
- **Border Invert** (`#fff`): 反転ボーダー

### Accent / Action

- **Custom Accent** (`#08131a`): CTA（ライトモード）。reaction: `#202a30`
- **Disabled** (`rgba(0,0,0,0.14)`): 無効状態の面

### Social Colors

- **note** (`#5ac8b8`), **Twitter/X** (`#000`), **Facebook** (`#1877f2`), **Hatena** (`#00a4df`), **LINE** (`#00b900`), **Threads** (`#000`)

---

## 3. Typography Rules

### 3.1 和文フォント

**ゴシック体（デフォルト）**:
- ヒラギノ角ゴ ProN（macOS）
- Noto Sans JP（Windows フォールバック）
- メイリオ（Windows 追加フォールバック）

**明朝体（記事本文のオプション）**:
- ヒラギノ明朝 ProN / Pro（macOS）
- BIZ UDPMincho（Windows）
- 游明朝 / Yu Mincho（クロスプラットフォーム）
- MS PMincho（レガシー Windows）

### 3.2 欧文フォント

- **サンセリフ**: Helvetica Neue, Arial
- **セリフ**: 明朝体フォールバック内で対応
- **等幅**: SFMono-Regular, Consolas, Menlo, Courier
- **数字専用**: Open Sans（数字の可読性向上）

### 3.3 font-family 指定

```css
/* デフォルト（ゴシック体） */
font-family: "Helvetica Neue", "Hiragino Sans", "Hiragino Kaku Gothic ProN",
  Arial, "Noto Sans JP", Meiryo, sans-serif;

/* 明朝体（記事本文オプション） */
font-family: "Hiragino Mincho ProN", "Hiragino Mincho Pro", HGSMinchoE,
  "Yu Mincho", YuMincho, "MS PMincho", serif;

/* 等幅 */
font-family: SFMono-Regular, Consolas, Menlo, Courier, monospace;

/* 欧文のみ */
font-family: "Helvetica Neue", Arial;

/* 数字専用 */
font-family: "Open Sans", sans-serif;

/* 絵文字対応 */
font-family: PrimaryEmojiFont, "Helvetica Neue", "Hiragino Kaku Gothic ProN",
  "Hiragino Sans", "Apple Color Emoji", "noto color emoji", Arial,
  "Segoe UI Emoji", "Segoe UI Symbol", Meiryo, sans-serif;

/* Windows（YakuHan 約物フォント対応） */
font-family: YakuHanJPs, Arial, Meiryo, sans-serif;

/* Windows 明朝体（YakuHan 対応） */
font-family: YakuHanMPs, "BIZ UDPMincho", "Yu Mincho", YuMincho,
  "MS PMincho", serif;
```

**フォールバックの考え方**:
- 欧文フォント（Helvetica Neue）を先に指定し、欧文の表示品質を優先
- macOS の和文フォント（ヒラギノ）→ Windows の和文フォント（Noto Sans JP, メイリオ）の順
- 明朝体は記事本文のオプションとして別スタックを用意
- YakuHan フォントで約物の幅を半角に揃えるオプションあり
- 数字専用の Open Sans スタックで、数字の可読性を向上

### 3.4 文字サイズ・ウェイト階層

> 以下は DevTools の computed style による実測値（2026-04-06 取得）

**記事ページ**

| Role | Size | Weight | Line Height | Letter Spacing | palt | 備考 |
|------|------|--------|-------------|----------------|------|------|
| Article Title (h1) | 32px | 700 | 48px (×1.5) | 1.28px (0.04em) | あり | 記事タイトル |
| Heading 2 | 28px | 700 | 36px (×1.286) | 1.12px (0.04em) | あり | セクション見出し |
| Body (p) | 18px | 400 | 36px (×2.0) | normal | なし | 記事本文 |
| Input | 14px | 400 | 21px (×1.5) | normal | なし | 検索欄等 |

**トップページ**

| Role | Size | Weight | Line Height | Letter Spacing | palt | 備考 |
|------|------|--------|-------------|----------------|------|------|
| Heading 2 | 16px | 600 | 24px (×1.5) | normal | なし | セクション見出し |
| Heading 3 | 16px | 600 | 24px (×1.5) | 0.64px (0.04em) | あり | カード見出し等 |
| Caption (p) | 12px | 600 | 18px (×1.5) | normal | なし | カード内テキスト |
| Button | 16px | 400 | 24px (×1.5) | normal | なし | ボタン |
| Input | 14px | 400 | 21px (×1.5) | normal | なし | 検索欄 |

### 3.5 行間・字間

**行間 (line-height)** — 実測値:
- body グローバル: `24px` (16px × 1.5)
- 記事本文 (p): `36px` (18px × **2.0**) — 読み物コンテンツのため非常にゆったり
- 記事タイトル (h1): `48px` (32px × 1.5)
- 記事 h2: `36px` (28px × 1.286)
- UI テキスト: `24px` (16px × 1.5)

**字間 (letter-spacing)** — 実測値:
- 本文 (p): `normal`（0.04em は**適用されていない**）
- 記事タイトル (h1): `1.28px` (= 0.04em) — **見出し専用**
- 記事 h2: `1.12px` (= 0.04em) — **見出し専用**
- トップ h3: `0.64px` (= 0.04em) — **見出し専用**
- body / button / input / a: `normal`

**ガイドライン**:
- `letter-spacing: 0.04em` と `palt` は**見出し専用**。本文には適用しない
- 記事本文の可読性は `font-size: 18px` + `line-height: 2.0` のゆったりした行間で確保している
- トップページの見出しは weight `600`（semibold）、記事ページは `700`（bold）と使い分けている

### 3.6 禁則処理・改行ルール

```css
/* グローバル設定（<body>） */
word-wrap: break-word;

/* フォントレンダリング */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
font-kerning: auto;
```

- `word-wrap: break-word` をグローバルに適用し、長い URL や英単語の折り返しに対応
- フォントスムージングを有効にし、macOS での表示品質を向上

### 3.7 OpenType 機能

```css
/* 見出し (h1, h2, トップ h3) にのみ適用 — 実測確認済 */
font-feature-settings: "palt";

/* 本文 (p), body, button, input, a には適用されていない */
font-feature-settings: normal;
```

- **palt**: 和文のプロポーショナル字詰め。**見出し要素にのみ適用**
- 本文への palt 適用は確認されなかった（可読性への配慮と推測）
- CSS Custom Property `--font-feature-settings-palt` として定義されているが、適用先は限定的

### 3.8 縦書き

- 該当なし。note は横書きのみ

---

## 4. Component Stylings

### Buttons

**Primary（CTA）**
- Background: `#08131a`（ライトモード）
- Text: `#ffffff`
- Border Radius: 適度な角丸
- Font Size: 1rem (16px)
- Font Weight: 700

**Like Button**
- Active Color: `#d13e5c`
- Text: `#d13e5c`

### Cards（記事カード）

- Background: `#fff`
- Border: `rgba(8,19,26,0.14)`
- Border Radius: 12px
- Shadow: `--elevation-1`（下記参照）

### Navigation

- Background: `#fff`
- Border Bottom: `rgba(8,19,26,0.14)`
- Height: 64px（デスクトップ）/ 48px（モバイル）

---

## 5. Layout Principles

### Content Width

| Area | Width | 用途 |
|------|-------|------|
| Main Content | 940px | メインコンテンツ幅 |
| Article (Small) | 620px | 記事本文、読み物コンテンツ |
| Timeline | 580px | タイムラインフィード |
| Editor | 580px | 記事エディタ |
| Two-Column Main | 610px | 2カラムレイアウトのメイン |
| Two-Column Sub | 280px | 2カラムレイアウトのサイドバー |

### Spacing

- Tailwind CSS のデフォルトスペーシングスケール（4px ベース）を使用

---

## 6. Depth & Elevation

> CSS Custom Properties 実測値

| Level | Shadow | 用途 |
|-------|--------|------|
| `--elevation-1` | `0px 1px 3px 1px rgba(0,0,0,0.14), 0px 1px 2px 0px rgba(0,0,0,0.22)` | カード |
| `--elevation-4` | `0px 4px 8px 3px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.22)` | ドロップダウン |
| `--elevation-6` | `0px 6px 10px 4px rgba(0,0,0,0.14), 0px 2px 3px 0px rgba(0,0,0,0.22)` | モーダル、ダイアログ |

- すべてデュアルシャドウ（ambient light + key light）構成
- ambient: `rgba(0,0,0,0.14)` = `--color-blackAlpha-100`
- key: `rgba(0,0,0,0.22)` = `--color-blackAlpha-200`
- hover/reaction 時のオーバーレイ: `rgba(8,19,26,0.03)` = `--color-grayAlpha-50`

---

## 7. Do's and Don'ts

### Do（推奨）

- テキスト色は `#08131a`（ほぼ黒）を使い、純粋な `#000000` を避ける（柔らかい読書体験）
- セカンダリテキストは同じ色相の opacity 違い（`rgba(8,19,26,0.66)`）で表現する
- 記事本文は `font-size: 18px` + `line-height: 2.0` で組む（ゆったりした行間で可読性確保）
- `letter-spacing: 0.04em` と `palt` は**見出し (h1, h2) にのみ**適用する
- 明朝体オプションを提供する場合は、完全な明朝体フォールバックチェーンを使う
- ダークモードでは全色をCSS Custom Propertiesで切り替える
- 記事コンテンツ幅は 620px を維持する（可読性の最適幅）

### Don't（禁止）

- 純粋な `#000000` をテキストに使わない（コントラストが強すぎて読み疲れする）
- 記事コンテンツ幅を 620px 以上にしない（1行が長すぎると可読性が低下する）
- ブランドカラー `#5ac8b8` をテキストに使わない（白背景でコントラスト不足）
- ゴシック体と明朝体を同じ文章内で混ぜない
- `letter-spacing: 0.04em` や `palt` を本文 (p) に適用しない（実サイトでも見出し専用）
- YakuHan フォントなしで約物の半角化を期待しない

---

## 8. Responsive Behavior

### Breakpoints

> CSS Custom Properties 実測値（`--size-breakpoint-*`）

| Name | Width | 説明 |
|------|-------|------|
| XS | 361px | 狭いモバイル |
| SM | 481px | モバイル |
| MD | 769px | タブレット |
| LG | 941px | 小さいデスクトップ |
| XL | 1280px | デスクトップ |
| 2XL | ≤ 2048px | 大画面 |

### タッチターゲット

- 最小サイズ: 44px × 44px

### Dark Mode

- `prefers-color-scheme: dark` および `.theme-dark` クラスで対応
- すべてのセマンティックカラーが CSS Custom Properties で切り替わる

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Brand Color: #5ac8b8（ロゴ・アクセント用）
CTA Background: #08131a（ライトモード）
Text Primary: #08131a
Text Secondary: rgba(8,19,26,0.66)
Background: #ffffff
Background Secondary: #f5f8fa
Border: rgba(8,19,26,0.14)
Like Color: #d13e5c
Danger: #b22323
Success: #1e7b65
Focus Ring: #292d9e

Sans-Serif Font: "Helvetica Neue", "Hiragino Sans",
  "Hiragino Kaku Gothic ProN", Arial, "Noto Sans JP", Meiryo, sans-serif
Serif Font: "Hiragino Mincho ProN", "Hiragino Mincho Pro", HGSMinchoE,
  "Yu Mincho", YuMincho, "MS PMincho", serif

Body Size (top): 16px / line-height: 1.5 / letter-spacing: normal
Body Size (article): 18px / line-height: 2.0 / letter-spacing: normal
Heading: letter-spacing: 0.04em + font-feature-settings: "palt"
Article Width: 620px
```

### プロンプト例

```
note のデザインに従って、記事一覧ページを作成してください。
- フォント: "Helvetica Neue", "Hiragino Sans", "Hiragino Kaku Gothic ProN",
    Arial, "Noto Sans JP", Meiryo, sans-serif
- テキスト色: #08131a（純粋な黒は使わない）
- セカンダリテキスト: rgba(8,19,26,0.66)
- 背景: #ffffff、セクション背景: #f5f8fa
- ボーダー: rgba(8,19,26,0.14)
- 記事カード幅: 620px 以内
- 記事本文: 18px, line-height: 2.0, letter-spacing: normal
- 見出し: letter-spacing: 0.04em, font-feature-settings: "palt"
- ダークモード対応: CSS Custom Properties で色を切り替え
```
