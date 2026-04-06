# DESIGN.md — freee

> freee（https://www.freee.co.jp/）のデザイン仕様書。
> freee Vibes Design System（https://vibes.freee.co.jp/）の公式デザイントークンおよびコーポレートサイトのCSSに基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 親しみやすく、明快な業務UI。複雑な会計・人事業務を、直感的で軽やかなインターフェースで提供する
- **密度**: プロダクトUIは中程度の情報密度。コーポレートサイトはゆったりとした余白
- **キーワード**: 親しみやすい、明快、信頼性、シンプル、アクセシブル
- **特徴**: ブルーを基調としたクリーンな配色。プロダクトUI（Vibes）とコーポレートサイトで異なるフォント戦略を持つ

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Primary Blue** (`#2864f0`): メインのブランドカラー。CTAボタン、リンク、アクティブ状態
- **Primary Hover** (`#285ac8`): ホバー時のプライマリカラー
- **Primary Dark** (`#1e46aa`): プレス時・ダーク系アクセント
- **Primary Darkest** (`#143278`): 最も暗いブルー

### Blue Scale（P パレット）

`#ebf3ff` → `#dce8ff` → `#aac8ff` → `#73a5ff` → `#2864f0` → `#3264dc` → `#285ac8` → `#1e46aa` → `#23418c` → `#143278`

### Semantic（意味的な色）

- **Danger** (`#dc1e32`): エラー、削除、バリデーションエラー。ホバー: `#a51428`
- **Warning** (`#ffb91e`): 警告、注意喚起。ダーク: `#be8c14`
- **Success** (`#00963c`): 成功、完了
- **Orange** (`#fa6414`): 通知、アクセント

### Neutral（ニュートラル）

- **Text Primary** (`#323232`): 本文テキスト、見出し
- **Text Secondary** (`#595959`): 補足テキスト（コーポレートサイト）
- **Text Muted** (`#6e6b6b`): 薄いテキスト
- **Text Tertiary** (`#8c8989`): 第三階層テキスト、アイコン
- **Darkest** (`#1e1e1e`): 最も暗いニュートラル

### Surface & Borders

- **White** (`#ffffff`): コンポーネントのベース背景
- **Background Light** (`#f7f5f5`): カード背景、セクション背景
- **Background Lighter** (`#f0eded`): 軽いグレー背景
- **Border** (`#e9e7e7`): 区切り線、ボーダー
- **Input Border** (`#e1dcdc`): フォーム入力欄の枠

---

## 3. Typography Rules

### 3.1 和文フォント

freee は2つのコンテキストで異なるフォント戦略を使用：

**プロダクトUI（Vibes）**: システムフォント
- ヒラギノ角ゴ ProN（macOS）
- メイリオ（Windows）

**コーポレートサイト**: Webフォント
- Noto Sans JP（Google Fonts）

### 3.2 欧文フォント

**プロダクトUI（Vibes）**:
- -apple-system, BlinkMacSystemFont（macOS システムフォント）
- Helvetica Neue（macOS）
- Arial（Windows フォールバック）

**コーポレートサイト**:
- Noto Sans（Google Fonts）
- museo-sans（一部モジュール）

### 3.3 font-family 指定

```css
/* プロダクトUI（Vibes Design System） */
font-family: '-apple-system', BlinkMacSystemFont, 'Helvetica Neue',
  'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', Arial,
  'メイリオ', Meiryo, sans-serif;

/* コーポレートサイト（本文） */
font-family: "Noto Sans JP", sans-serif;

/* コーポレートサイト（一部モジュール） */
font-family: "Noto Sans", "Noto Sans JP", sans-serif;
```

**フォールバックの考え方（Vibes）**:
- システムフォントを最優先（macOS: -apple-system → Helvetica Neue → ヒラギノ角ゴ）
- 欧文フォントを和文フォントより先に指定（欧文の表示品質を優先）
- Windows: Arial → メイリオの順
- 最後に `sans-serif`

### 3.4 文字サイズ・ウェイト階層

**プロダクトUI（Vibes）**

| Role | Token | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|-------|------|--------|-------------|----------------|------|
| Heading 1 | FontSize1500 | 1.5rem (24px) | 700 | 1.5 | 0 | ページタイトル |
| Heading 2 | FontSize1000 | 1rem (16px) | 700 | 1.5 | 0 | セクション見出し |
| Heading 3 | FontSize0875 | 0.875rem (14px) | 700 | 1.5 | 0 | サブ見出し |
| Body | FontSize0875 | 0.875rem (14px) | 400 | 1.5 | 0 | 本文（標準） |
| Caption | FontSize0750 | 0.75rem (12px) | 400 | 1.5 | 0 | キャプション |
| Smallest | FontSize0625 | 0.625rem (10px) | 400 | 1.5 | 0 | アイコンラベル |

**コーポレートサイト**

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| H1 | 44px | 700 | 1.2 | 0.05em | ヒーロー見出し |
| H2 | 40px | 700 | 1.2 | 0.04em | セクション見出し |
| H3 | 34px | 700 | 1.25 | 0.04em | サブ見出し |
| H4 | 24px | 700 | 1.3 | 0 | 小見出し |
| Body | 16px | 400 | 1.5 | 0 | 本文 |
| Small | 14px | 400 | 1.5 | 0 | 補足テキスト |
| XSmall | 12px | 400 | 1.5 | 0 | 注釈 |

### 3.5 行間・字間

**行間 (line-height)**:
- プロダクトUI（Vibes）: すべて `1.5`（統一値）
- コーポレートサイト: 本文 `1.5`、見出し `1.15`〜`1.35`
- ボタン: `1.15`

**字間 (letter-spacing)**:
- プロダクトUI: `0`（デフォルト）
- コーポレートサイト見出し: `0.04em`〜`0.05em`
- ナビゲーション: `0.1em`
- 価格表示: `0.15em`〜`0.25em`
- タイトな表示: `-0.01em`

**ガイドライン**:
- プロダクトUIは一貫して `line-height: 1.5` を使用し、シンプルさを優先
- コーポレートサイトは文脈に応じて行間を変化させ、見出しはタイト、本文はゆったり

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
```

- Vibes Design System では特別な禁則処理の指定なし（ブラウザデフォルトに依存）

### 3.7 OpenType 機能

- デザイントークンに OpenType 機能の明示的な指定なし
- Noto Sans JP のデフォルトカーニングを使用

### 3.8 縦書き

- 該当なし。freee は横書きのみ

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#2864f0`
- Text: `#ffffff`
- Border Radius: `99rem`（pill 型。Vibes の Full トークン）
- Font Size: 0.875rem (14px)
- Height (default): 2.25rem (36px)
- Height (small): 1.5rem (24px)
- Height (large): 3rem (48px)

**Secondary**
- Background: `transparent`
- Text: `#2864f0`
- Border: 1px solid `#2864f0`
- Border Radius: `99rem`

**Danger**
- Background: `#dc1e32`
- Text: `#ffffff`
- Border Radius: `99rem`

### Inputs

- Background: `#ffffff`
- Border: 1px solid `#e1dcdc`
- Border (focus): 2px solid `#2864f0`
- Border Radius: 0.5rem (8px)
- Font Size: 0.875rem (14px)
- Height: 2.25rem (36px)
- Padding: 8px 12px

### Cards

- Background: `#ffffff`
- Border Radius: 0.75rem (12px)
- Shadow: `0 0 1rem rgba(0,0,0,0.1), 0 0.125rem 0.25rem rgba(0,0,0,0.2)`

---

## 5. Layout Principles

### Spacing Scale（Vibes）

| Token | Value |
|-------|-------|
| XSmall | 0.25rem (4px) |
| Small | 0.5rem (8px) |
| Basic | 1rem (16px) |
| Large | 1.5rem (24px) |
| XLarge | 2rem (32px) |
| XXLarge | 3rem (48px) |

### Border Radius Scale（Vibes、セマンティック）

| Token | Value | 用途 |
|-------|-------|------|
| MiniPadding | 0.25rem (4px) | フォーカスリング等 |
| Base | 0.5rem (8px) | 入力欄、基本要素 |
| Card | 0.75rem (12px) | カード |
| Floating | 1rem (16px) | ポップアップ、フローティング |
| Dialog | 1.5rem (24px) | ダイアログ |
| Full | 99rem | ピル型ボタン |

### Container

- Max Width: 70rem (1120px)

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| Card | `0 0 1rem rgba(0,0,0,0.1), 0 0.125rem 0.25rem rgba(0,0,0,0.2)` | カード |
| Floating | `0 0 1.5rem rgba(0,0,0,0.1), 0 0.25rem 0.5rem rgba(0,0,0,0.2)` | フローティング要素 |
| Popup | `0 0 2rem rgba(0,0,0,0.1), 0 0.375rem 0.75rem rgba(0,0,0,0.2)` | ポップアップ、バルーン |

- すべてのシャドウはデュアルシャドウ（広い拡散 + 近い影）構成
- Transition: `0.2s`（インタラクティブ要素）、`0.3s`（フェード）

---

## 7. Do's and Don'ts

### Do（推奨）

- プロダクトUIとコーポレートサイトでフォント戦略が異なることを認識する
- プロダクトUIにはシステムフォントスタック（Vibes）を使い、Webフォントの読み込みを避ける
- ボタンはピル型（`border-radius: 99rem`）を標準とする
- スペーシングは 4px の倍数に揃える（Vibes の spacing scale に準拠）
- 色のコントラスト比は WCAG AA 以上を確保する

### Don't（禁止）

- コーポレートサイトのフォント（Noto Sans JP）をプロダクトUIに使わない（パフォーマンスに影響）
- プロダクトUIで `border-radius` を角型（0px）にしない。Vibes のラジアススケールに従う
- テキスト色に純粋な `#000000` を使わない。`#323232` を使用する
- ブランドブルー `#2864f0` の上に暗い色のテキストを置かない（コントラスト不足）
- コーポレートサイトの見出しで `letter-spacing: 0` にしない。`0.04em` 以上を使う

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Narrow Mobile | ≤ 375px | 狭いモバイル |
| Mobile | ≤ 768px | モバイル |
| Tablet | ≤ 1024px | タブレット |
| Desktop | > 1024px | デスクトップ |

### モバイル対応

- プロダクトUI: 見出しサイズが圧縮される（H1: 1rem、H2: 0.875rem、H3: 0.875rem）
- ボタンの高さはモバイルでも維持（タッチターゲット確保）

### タッチターゲット

- 最小サイズ: 36px（Vibes デフォルト。Small ボタンは 24px だがタッチ対象の場合は注意）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #2864f0
Text Color: #323232
Text Secondary: #595959
Background: #f7f5f5
Surface: #ffffff
Border: #e9e7e7
Danger: #dc1e32
Success: #00963c

Product UI Font: '-apple-system', BlinkMacSystemFont, 'Helvetica Neue',
  'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', Arial,
  'メイリオ', Meiryo, sans-serif
Website Font: "Noto Sans JP", sans-serif

Body Size (Product): 14px
Body Size (Website): 16px
Line Height: 1.5
Button Radius: 99rem (pill)
```

### プロンプト例

```
freee のデザインシステム（Vibes）に従って、請求書一覧画面を作成してください。
- フォント: '-apple-system', BlinkMacSystemFont, 'Helvetica Neue',
    'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', Arial,
    'メイリオ', Meiryo, sans-serif
- テキスト色: #323232
- プライマリボタン: 背景 #2864f0、テキスト #ffffff、角丸 99rem（ピル型）
- 入力欄: ボーダー #e1dcdc、角丸 8px、高さ 36px
- カード: 角丸 12px、シャドウ 0 0 1rem rgba(0,0,0,0.1)
- スペーシング: 4px の倍数
```
