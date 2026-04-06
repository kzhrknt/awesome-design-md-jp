# DESIGN.md — [サービス名]

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。

---

## 1. Visual Theme & Atmosphere

<!-- サービスの視覚的な印象、デザイン哲学を記述する -->

- **デザイン方針**: （例: クリーン、プロフェッショナル、温かみのある）
- **密度**: （例: 情報密度が高い業務UI / ゆったりとしたメディア型）
- **キーワード**: （3〜5つの形容詞でデザインの雰囲気を表現）

---

## 2. Color Palette & Roles

<!-- 色はすべて hex 値で記述。実サイトの computed style に基づくこと -->

### Primary（ブランドカラー）

- **Primary** (`#______`): メインのブランドカラー。CTAボタン、リンク等に使用
- **Primary Dark** (`#______`): ホバー・プレス時のプライマリカラー

### Semantic（意味的な色）

- **Danger** (`#______`): エラー、削除、危険な操作
- **Warning** (`#______`): 警告、注意喚起
- **Success** (`#______`): 成功、完了

### Neutral（ニュートラル）

- **Text Primary** (`#______`): 本文テキスト
- **Text Secondary** (`#______`): 補足テキスト、ラベル
- **Text Disabled** (`#______`): 無効状態のテキスト
- **Border** (`#______`): 区切り線、入力欄の枠
- **Background** (`#______`): ページ背景
- **Surface** (`#______`): カード、モーダル等の面

---

## 3. Typography Rules

<!-- 日本語タイポグラフィの核心セクション。実サイトのCSSに基づいて正確に記述すること -->

### 3.1 和文フォント

<!-- 使用している和文フォントを優先度順に列挙 -->

- **ゴシック体**: （例: Noto Sans JP, 游ゴシック, ヒラギノ角ゴ ProN）
- **明朝体**（使用する場合）: （例: Noto Serif JP, 游明朝, ヒラギノ明朝 ProN）

### 3.2 欧文フォント

<!-- 和文と組み合わせる欧文フォント -->

- **サンセリフ**: （例: Helvetica Neue, Arial）
- **セリフ**（使用する場合）: （例: Georgia）
- **等幅**: （例: SFMono-Regular, Consolas, Menlo）

### 3.3 font-family 指定

<!-- 実際のCSS宣言をそのまま記述。フォールバックチェーンの順序が重要 -->

```css
/* 本文 */
font-family: "和文フォント", "欧文フォント", sans-serif;

/* 等幅 */
font-family: "等幅フォント", monospace;
```

**フォールバックの考え方**:
- 和文フォントを先に指定（日本語の表示品質を優先）
- 欧文フォントは和文フォント内の欧文グリフより優先したい場合のみ先に置く
- 最後に generic family（sans-serif / serif）を指定

### 3.4 文字サイズ・ウェイト階層

<!-- 実際のデザイントークンまたは使用されているサイズを記述 -->

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Display | — | —px | — | — | — | ページタイトル等 |
| Heading 1 | — | —px | — | — | — | セクション見出し |
| Heading 2 | — | —px | — | — | — | サブ見出し |
| Heading 3 | — | —px | — | — | — | 小見出し |
| Body | — | —px | — | — | — | 本文 |
| Caption | — | —px | — | — | — | 補足、注釈 |
| Small | — | —px | — | — | — | 最小テキスト |

### 3.5 行間・字間

- **本文の行間 (line-height)**: （例: 1.7〜2.0。日本語は欧文より広めが標準）
- **見出しの行間**: （例: 1.3〜1.5）
- **本文の字間 (letter-spacing)**: （例: 0.04em〜0.1em）
- **見出しの字間**: （例: 0〜0.05em）

**ガイドライン**:
- 日本語本文は `line-height: 1.5` 以上を推奨（1.7〜2.0が読みやすい）
- `letter-spacing` は全角文字の場合 `0.04em` 程度で可読性が向上する
- 欧文混じりの場合は `letter-spacing` が欧文に影響する点に注意

### 3.6 禁則処理・改行ルール

```css
/* 推奨設定 */
word-break: break-all;        /* または keep-all（ことばの途中で折り返さない） */
overflow-wrap: break-word;     /* 長いURLや英単語の折り返し */
line-break: strict;            /* 厳格な禁則処理 */
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》」】、。，．・：；？！`
- 行末禁止: `（「『【〔〈《「【`

### 3.7 OpenType 機能

```css
font-feature-settings: "palt" 1;  /* プロポーショナル字詰め */
font-feature-settings: "kern" 1;  /* カーニング */
```

- **palt**: 和文のプロポーショナル字詰め。見出しやナビゲーションに有効
- **kern**: 欧文のカーニング。和欧混植時に有効
- 本文には `palt` を適用しない方が可読性が高い場合がある

### 3.8 縦書き

<!-- 縦書きに対応する場合のみ記述 -->

```css
writing-mode: vertical-rl;
text-orientation: mixed;
```

該当なし / 対応する場合は上記を設定

---

## 4. Component Stylings

### Buttons

**Primary**
- Background: `#______`
- Text: `#______`
- Padding: —px —px
- Border Radius: —px
- Font Size: —px
- Font Weight: —

**Secondary**
- Background: `transparent`
- Text: `#______`
- Border: 1px solid `#______`
- Padding: —px —px
- Border Radius: —px

### Inputs

- Background: `#______`
- Border: 1px solid `#______`
- Border (focus): 1px solid `#______`
- Border Radius: —px
- Padding: —px —px
- Font Size: —px
- Height: —px

### Cards

- Background: `#______`
- Border: 1px solid `#______`
- Border Radius: —px
- Padding: —px
- Shadow: （Depth & Elevation セクション参照）

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | —px |
| S | —px |
| M | —px |
| L | —px |
| XL | —px |
| XXL | —px |

### Container

- Max Width: —px
- Padding (horizontal): —px

### Grid

- Columns: —
- Gutter: —px

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | フラットな要素 |
| 1 | `0 1px 2px rgba(0,0,0,0.1)` | カード、ドロップダウン |
| 2 | `0 4px 8px rgba(0,0,0,0.1)` | モーダル、ポップオーバー |
| 3 | `0 8px 24px rgba(0,0,0,0.15)` | ダイアログ、フローティング要素 |

---

## 7. Do's and Don'ts

### Do（推奨）

- フォントは必ずフォールバックチェーンを指定する
- 日本語本文の line-height は 1.5 以上にする
- 色のコントラスト比は WCAG AA 以上を確保する
- コンポーネントの余白は Spacing Scale に従う

### Don't（禁止）

- `font-family` に和文フォント1つだけを指定しない（環境依存になる）
- 日本語本文に `line-height: 1.2` 以下を使わない（可読性が著しく低下する）
- 全角・半角スペースを混在させない
- テキストの色に純粋な `#000000` を使わない（コントラストが強すぎる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ —px | モバイルレイアウト |
| Tablet | ≤ —px | タブレットレイアウト |
| Desktop | > —px | デスクトップレイアウト |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）

### フォントサイズの調整

- モバイルでは本文 14–16px、見出しはデスクトップの 70–80% 程度に縮小

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #______
Text Color: #______
Background: #______
Font: "和文フォント", "欧文フォント", sans-serif
Body Size: __px
Line Height: __
```

### プロンプト例

```
このサービスのデザインシステムに従って、ユーザー一覧テーブルを作成してください。
- プライマリカラー: #______
- フォント: 上記 font-family を使用
- 行間: 本文は line-height: __ を使用
- テーブルヘッダーの背景: #______
- ボーダー: #______
```
