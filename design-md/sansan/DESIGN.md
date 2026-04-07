# DESIGN.md — Sansan

> Sansan（https://jp.sansan.com/）のデザイン仕様書。
> コーポレートサイトの computed style 実測値に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: プロフェッショナルかつ信頼感のあるビジネスSaaSデザイン。深いネイビーブルーを基調とし、堅実さと先進性を両立
- **密度**: LPらしいゆったりとしたセクション構成だが、body の line-height: 1.0 と極めてタイトな行間が特徴的
- **キーワード**: 信頼、堅実、ネイビーブルー、ビジネス、クリーン
- **特徴**: helvetica を先頭（小文字）に配置し、游ゴシックと組み合わせる欧文優先のフォントスタック。大見出し 54.8px の迫力ある数値。CSS カスタムプロパティ 51件

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Sansan Navy** (`#042a6d`): メインのブランドカラー。ダークネイビーで信頼感を表現
- **Sansan Blue** (`#2566d4`): CTAボタン、リンク、アクセント要素に使用

### Semantic（意味的な色）

- **Danger** (`#cc0000`): エラー、削除、危険な操作
- **Warning** (`#f5a623`): 警告、注意喚起
- **Success** (`#2e8b57`): 成功、完了

### Neutral（ニュートラル）

- **Text Primary** (`#1a1a1a`): 本文テキスト
- **Text Secondary** (`#666666`): 補足テキスト、ラベル
- **Text Disabled** (`#999999`): 無効状態のテキスト
- **Border** (`#dddddd`): 区切り線、入力欄の枠
- **Background** (`#ffffff`): ページ背景
- **Surface** (`#f5f5f5`): カード、セクション背景

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: 游ゴシック（YuGothic / Yu Gothic）、ヒラギノ角ゴ Pro W3（Hiragino Kaku Gothic Pro）

### 3.2 欧文フォント

- **サンセリフ**: helvetica（小文字指定）、arial
- 欧文フォントを和文より先に指定する欧文優先の構成

### 3.3 font-family 指定

```css
/* 本文 — 実測値 */
font-family: helvetica, arial, YuGothic, "Yu Gothic", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif;
```

**フォールバックの考え方**:
- helvetica を先頭に配置（欧文グリフの表示品質を優先）
- 游ゴシックは macOS 用（YuGothic）と Windows 用（Yu Gothic）の両方を指定
- ヒラギノ角ゴ Pro W3 は macOS 向けフォールバック
- generic family `sans-serif` で締める

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | helvetica, 游ゴシック | 54.8px | 700 | 76.7px (×1.4) | normal | ヒーロー大見出し |
| Heading 1 | helvetica, 游ゴシック | 40px | 700 | 56px (×1.4) | normal | セクション見出し |
| Heading 2 | helvetica, 游ゴシック | 28px | 700 | 39.2px (×1.4) | normal | サブ見出し |
| Heading 3 | helvetica, 游ゴシック | 20px | 700 | 28px (×1.4) | normal | 小見出し |
| Body | helvetica, 游ゴシック | 14px | 400 | 14px (×1.0) | normal | 本文（極めてタイト） |
| Caption | helvetica, 游ゴシック | 12px | 400 | 12px (×1.0) | normal | 補足、注釈 |
| Small | helvetica, 游ゴシック | 10px | 400 | 10px (×1.0) | normal | 最小テキスト |

### 3.5 行間・字間

- **本文の行間 (line-height)**: 1.0（14px / 14px）。極めてタイトな設定で、一般的な日本語組版の慣例（1.5〜2.0）とは大きく異なる
- **見出しの行間**: 1.4（Display 54.8px → lh: 76.7px、H1 40px → lh: 56px）
- **本文の字間 (letter-spacing)**: normal
- **見出しの字間**: normal

**注意事項**:
- body の line-height: 1.0 はSansanサイト固有の設計。コンポーネント単位で個別に line-height を設定している可能性が高い
- 日本語本文コンテンツを作成する場合は、コンポーネント側で line-height: 1.5〜1.8 を上書きすることを推奨

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

### 3.7 OpenType 機能

```css
/* 実測値 */
font-feature-settings: normal;  /* palt 未適用 */
```

- palt（プロポーショナル字詰め）は適用されていない
- 見出し・本文ともに font-feature-settings: normal

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary（CTA）**
- Background: `#2566d4`（Sansan Blue）
- Text: `#ffffff`
- Padding: 12px 32px
- Border Radius: 4px
- Font Size: 16px
- Font Weight: 700

**Secondary（Outline）**
- Background: `transparent`
- Text: `#2566d4`
- Border: 1px solid `#2566d4`
- Padding: 12px 32px
- Border Radius: 4px

**Navy（ダーク背景用）**
- Background: `#042a6d`
- Text: `#ffffff`
- Padding: 12px 32px
- Border Radius: 4px
- Font Size: 16px
- Font Weight: 700

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#dddddd`
- Border (focus): 1px solid `#2566d4`
- Border Radius: 4px
- Padding: 10px 14px
- Font Size: 14px
- Height: 44px

### Cards

- Background: `#ffffff`
- Border: 1px solid `#eeeeee`
- Border Radius: 8px
- Padding: 24px
- Shadow: 0 2px 8px rgba(0,0,0,0.08)

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 4px |
| S | 8px |
| M | 16px |
| L | 24px |
| XL | 40px |
| XXL | 64px |

### Container

- Max Width: 1200px
- Padding (horizontal): 20px

### Grid

- Columns: 12
- Gutter: 24px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 2px 8px rgba(0,0,0,0.08)` | カード、ドロップダウン |
| 2 | `0 4px 16px rgba(0,0,0,0.12)` | モーダル、ポップオーバー |
| 3 | `0 8px 32px rgba(0,0,0,0.16)` | ダイアログ、フローティング要素 |

---

## 7. Do's and Don'ts

### Do（推奨）

- helvetica を font-family の先頭に指定し、欧文の表示品質を優先する
- 游ゴシックは macOS / Windows 両対応のフォールバックを記述する
- 見出しの line-height は 1.4 程度を維持する
- Sansan Navy (`#042a6d`) と Sansan Blue (`#2566d4`) を使い分ける（Navy: ブランド背景、Blue: CTA）
- コンポーネント単位で適切な line-height を設定する

### Don't（禁止）

- 日本語の長文本文に line-height: 1.0 をそのまま使わない（body 値はリセット用）
- helvetica を大文字で書かない（実サイトは小文字指定）
- Sansan Navy をテキストカラーとして使わない（背景色として使用する）
- テキストの色に純粋な `#000000` を使わない（`#1a1a1a` を使用）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | モバイルレイアウト |
| Tablet | ≤ 1023px | タブレットレイアウト |
| Desktop | > 1024px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは Display 54.8px → 28〜32px 程度に縮小
- H1 40px → 24〜28px 程度に縮小
- Body は 14px を維持

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color (Navy): #042a6d
Primary Color (Blue): #2566d4
Text Color: #1a1a1a
Background: #ffffff
Font: helvetica, arial, YuGothic, "Yu Gothic", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", sans-serif
Body Size: 14px
Line Height (body): 1.0（※コンポーネント単位で上書き推奨）
Line Height (heading): 1.4
```

### プロンプト例

```
Sansanのデザインシステムに従って、名刺管理サービスの機能紹介セクションを作成してください。
- プライマリカラー: #042a6d（Navy）/ #2566d4（Blue CTA）
- フォント: helvetica, arial, YuGothic, "Yu Gothic", sans-serif
- 見出し: 40px / 700 / line-height: 1.4
- 本文: 14px / 400（コンポーネント内は line-height: 1.6〜1.8 を推奨）
- ボタン: background #2566d4, border-radius 4px, padding 12px 32px
- カード: border-radius 8px, shadow 0 2px 8px rgba(0,0,0,0.08)
```
