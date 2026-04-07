# DESIGN.md — connpass

> connpass（https://connpass.com/）のデザイン仕様書。
> IT勉強会・イベント管理プラットフォーム。実サイトのCSS computed style に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 情報を効率よく伝える実用的なUI。イベント検索・管理に特化した機能優先のデザイン
- **密度**: 情報密度が高め。イベント一覧・グループ一覧を一覧性重視で表示
- **キーワード**: 実用的、シンプル、情報密度、オレンジ、エンジニア向け
- **特徴**: Lucida Grande をフォントスタック先頭に指定（珍しい構成）。見出しの font-weight が 400（細い）で、控えめな印象。connpassオレンジ/レッドがブランドカラー

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **connpass Orange** (`#f18d05`): メインのブランドカラー。ロゴ、CTAボタン、アクセントに使用
- **connpass Red** (`#e8283f`): セカンダリブランドカラー。強調、通知、重要アクションに使用

### Semantic（意味的な色）

- **Danger** (`#e8283f`): エラー、削除、危険な操作
- **Warning** (`#f18d05`): 警告、注意喚起
- **Success** (`#5cb85c`): 成功、完了、参加済み

### Neutral（ニュートラル）

- **Text Primary** (`#444`): 本文テキスト
- **Text Secondary** (`#888`): 補足テキスト、メタ情報
- **Text Disabled** (`#aaa`): 無効状態のテキスト
- **Text Heading** (`#333`): 見出しテキスト
- **Link** (`#0066cc`): リンクテキスト
- **Link Hover** (`#003366`): リンクホバー
- **Border** (`#ddd`): 区切り線、入力欄の枠
- **Border Light** (`#eee`): 薄い区切り線
- **Background** (`#fff`): ページ背景
- **Background Secondary** (`#f5f5f5`): セクション背景、サイドバー
- **Surface** (`#fff`): カード、モーダル等の面

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: ヒラギノ角ゴ Pro W3 (Hiragino Kaku Gothic Pro), MS Pゴシック

### 3.2 欧文フォント

- **サンセリフ**: Lucida Grande, Verdana
- **等幅**: Consolas, "Courier New", monospace

### 3.3 font-family 指定

```css
/* 本文 — Lucida Grande 先頭が特徴 */
font-family: "Lucida Grande", Verdana, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "MS Pゴシック", sans-serif;

/* 等幅 */
font-family: Consolas, "Courier New", monospace;
```

**フォールバックの考え方**:
- 欧文フォント（Lucida Grande, Verdana）を先頭に配置 — 欧文グリフの品質を優先する構成
- 和文フォントはヒラギノ角ゴ Pro W3 → MS Pゴシック の順
- 古典的な日本のWebサービスに多い構成（2010年代前半に主流）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display (h2) | 本文と同じ | 36px | 400 | 36px (1.0) | normal | 「エンジニアをつなぐ...」等 |
| Heading 2 | 本文と同じ | 24px | 400 | 24px (1.0) | normal | 「おすすめグループ」等 |
| Heading 3 | 本文と同じ | 18px | 400 | 24px (1.33) | normal | セクション小見出し |
| Body | 本文フォント | 12px | 400 | 18px (1.5) | normal | 本文テキスト |
| Caption | 本文と同じ | 11px | 400 | 16px (1.45) | normal | メタ情報、日時 |
| Small | 本文と同じ | 10px | 400 | 14px (1.4) | normal | 最小テキスト |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 18px（1.5倍）。日本語本文の最低ラインを確保
- **見出しの行間**: 1.0（見出しサイズと同値）。タイトで引き締まった印象
- **本文の字間 (letter-spacing)**: normal
- **見出しの字間**: normal

**ガイドライン**:
- 本文12pxは現代のWebサービスとしてはやや小さめ
- 見出しの line-height: 1.0 は詰まった印象を与えるため、複数行見出しでは注意が必要
- weight 400 の見出しは、サイズ差のみで階層を表現するスタイル

### 3.6 禁則処理・改行ルール

```css
/* 基本設定 */
word-wrap: break-word;
overflow-wrap: break-word;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》」】、。，．・：；？！`
- 行末禁止: `（「『【〔〈《「【`

### 3.7 OpenType 機能

```css
font-feature-settings: normal; /* palt 未使用 */
```

- **palt**: 未使用。本文12pxでは palt を適用しない方が可読性が高い
- 見出しにも palt は適用されていない

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary（CTAボタン — connpass Orange）**
- Background: `#f18d05`
- Text: `#fff`
- Padding: 8px 24px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 700

**Danger（connpass Red）**
- Background: `#e8283f`
- Text: `#fff`
- Padding: 8px 24px
- Border Radius: 4px
- Font Size: 14px
- Font Weight: 700

**Secondary**
- Background: `transparent`
- Text: `#444`
- Border: 1px solid `#ddd`
- Padding: 8px 24px
- Border Radius: 4px

### Inputs

- Background: `#fff`
- Border: 1px solid `#ddd`
- Border (focus): 1px solid `#f18d05`
- Border Radius: 4px
- Padding: 6px 10px
- Font Size: 12px
- Font Family: 本文と同じ

### Cards

- Background: `#fff`
- Border: 1px solid `#ddd`
- Border Radius: 4px
- Padding: 16px
- Shadow: none（フラットデザイン基調）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 32px |
| XXL | 48px |

### Container

- Max Width: 980px
- Padding (horizontal): 16px

### Grid

- Columns: 可変（イベント一覧は1カラム、トップは2〜3カラム）
- Gutter: 16px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素（基本） |
| 1 | `0 1px 3px rgba(0,0,0,0.12)` | カード、ホバー時 |
| 2 | `0 2px 6px rgba(0,0,0,0.15)` | ドロップダウン、ポップオーバー |

- connpass はフラットデザイン基調。影はほとんど使わず、ボーダーで区切る構成

---

## 7. Do's and Don'ts

### Do（推奨）

- フォントは Lucida Grande 先頭のフォールバックチェーンを維持する
- 本文の line-height は 1.5 以上にする
- 見出しは weight 400 を維持し、サイズで階層を表現する
- connpass Orange (`#f18d05`) をCTAの主要色として使用する
- イベント情報は情報密度を保ち、一覧性を重視する

### Don't（禁止）

- 見出しに太字（700）を多用しない — connpass のトーンは控えめな weight 400
- 本文サイズを12px未満にしない
- connpass Orange と connpass Red を同じコンテキストで混在させない
- 全角・半角スペースを混在させない
- リンク色に connpass Orange を使わない（リンクは `#0066cc` を維持）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 480px | モバイルレイアウト |
| Tablet | ≤ 768px | タブレットレイアウト |
| Desktop | > 768px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは本文 12–14px を維持、見出しはデスクトップの 70–80% に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #f18d05 (connpass Orange)
Secondary Color: #e8283f (connpass Red)
Text Color: #444
Background: #fff
Font: "Lucida Grande", Verdana, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "MS Pゴシック", sans-serif
Body Size: 12px
Line Height: 1.5
```

### プロンプト例

```
connpassのデザインシステムに従って、イベント一覧カードを作成してください。
- プライマリカラー: #f18d05（connpass Orange）
- フォント: "Lucida Grande", Verdana, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "MS Pゴシック", sans-serif
- 本文サイズ: 12px / line-height: 1.5
- 見出し: weight 400（細い）
- ボーダー: #ddd
- カード背景: #fff
- 参加ボタン: background #f18d05, color #fff, border-radius 4px
```
