# DESIGN.md — Mitsubishi Estate (mec.co.jp)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 三菱地所株式会社（Mitsubishi Estate Co., Ltd.）コーポレートサイト。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 大手デベロッパーの王道コーポレート。日英バイリンガルを前提とした堅実・余白の効いたレイアウト。Century Gothic + Noto Sans JP の組み合わせで、英字セクションタイトル（NEWS / TOPICS / SUSTAINABILITY）を大きく置き、和文サブテキストで補足する構成
- **密度**: ゆったり。セクション間の縦余白を強くとり、巨大な英字見出しで視覚的な区切りを作る
- **キーワード**: Corporate, Trustworthy, Bilingual, Spacious, Conservative

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

- **Brand Red** (`#dc000c`): 三菱地所のシグネチャー赤。お問合せ CTA・検索ボタン・主要アクション・強調点に使用。鮮やかで彩度の高い赤
- **Brand Red Dark** (`#d7000f`): プレス時に出るやや暗い赤（実測の従属トーン）

### Neutral（ニュートラル）

- **Text Primary** (`#000000`): 本文・見出しの基本色
- **Text Sub** (`#404040`): 控えめな本文
- **Text Tertiary** (`#757575` / `#959595` / `#999999`): 補助・キャプション・ラベル
- **Text Disabled** (`#c9c9c9`): 無効・低コントラスト
- **Beige Accent** (`#9f9889`): リード文・特徴コピー専用の暖色グレー（事業紹介の "超長期視点でのまちづくり…" 等）
- **Background Page** (`#ffffff`): 通常ページ背景
- **Background Hero** (`#f7f6f6`): ページタイトル帯（H1 が乗る薄いグレー）
- **Background Info Card** (`#f2f1ec`): 情報カードの薄いベージュ背景
- **Background Subtle** (`#efefef`): 二次ボタン・タグの背景

### Default Browser（未スタイル要素のデフォルト）

- **Default Link** (`#0000ee`): スタイル指定のないリンクで観測されるブラウザデフォルト青。基本的に使用しない（赤や黒で上書きする）

### Tag Color Hints（記事カテゴリタグ等）

- **Tag Green** (`#4da262`): カテゴリ識別用の濃緑
- **Tag Blue** (`#4a94bd`): カテゴリ識別用の青

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP** が和文の基本。コンテンツ本文・セクション見出し・H1 は Noto Sans JP を最優先
- 明朝体は使用していない

### 3.2 欧文フォント

- **Century Gothic**: ヘッダー・ナビゲーション・大型英字見出し（NEWS / TOPICS / SUSTAINABILITY）で先頭指定。OS搭載前提。Windows/macOS の標準フォント
- **Noto Sans**: フォールバックの欧文サンセリフ（Latin 文字）
- **Arial**: 一部のフォーム系ボタン（検索ボタン等）でブラウザデフォルトとして観測。意図して指定されているわけではない

### 3.3 font-family 指定

```css
/* グローバル（ヘッダー・ナビ・トップページの大型英字見出し） */
font-family: "Century Gothic", "Noto Sans", "Noto Sans JP", sans-serif;

/* ページコンテンツ（記事本文・H1・サブセクション） */
font-family: "Noto Sans JP", "Noto Sans", sans-serif;

/* 純和文 H1（ページタイトル） */
font-family: "Noto Sans JP", sans-serif;

/* 英字専用ラベル（"Our Business" 等のセクション見出し小） */
font-family: "Century Gothic", sans-serif;
```

**フォールバックの考え方**:
- グローバル領域は**欧文先頭**（Century Gothic）の独特な構成。これは英字見出しを Century Gothic で出すための指定で、和文文字には Noto Sans JP が後段で適用される
- 一方、コンテンツ領域は**和文先頭**（Noto Sans JP）に切り替わる。これにより記事本文の和文表示品質が安定する
- Noto Sans → Noto Sans JP の順は欧文専用フォントを優先するパターン

### 3.4 文字サイズ・ウェイト階層

| Role | Font Stack | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------------|------|--------|-------------|----------------|------|
| Display Hero (English) | Century Gothic | 58px | 700 | normal | normal | "TOPICS" 等。トップページ最大見出し |
| Display Large (English) | Century Gothic | 46px | 700 | normal | normal | "NEWS" 等 |
| Display Mid (English) | Century Gothic | 40px | 700 | normal | normal | "SUSTAINABILITY" 等 |
| Page Title H1 | Noto Sans JP | 34px | 700 | 47.6px (×1.4) | normal | 下層ページの見出し帯。bg: #f7f6f6 |
| Section Heading H2 | Noto Sans JP | 28px | 700 | 39.2px (×1.4) | normal | 下層ページのセクション見出し |
| Subsection H2 | Noto Sans JP | 24px | 700 | 33.6px (×1.4) | normal | "トップメッセージ" 等 |
| Card Title H3 | Noto Sans JP | 22px | 700 | 30.8px (×1.4) | normal | 小見出し |
| List Heading H3 | Noto Sans JP | 18px | 700 | 25.2px (×1.4) | normal | 事業一覧カードタイトル |
| Top H3 (English+JP) | Century Gothic | 28px | 700 | normal | normal | トップページ "オフィス事業" 等 |
| Eyebrow Label | Century Gothic | 24px | 400 | normal | normal | "Our Business" 等。color: #999 |
| Lead / Feature Copy | Noto Sans JP | 22px | 700 | 30.8px (×1.4) | normal | リード文。color: `#9f9889`（ベージュ）が特徴 |
| Body Default | Noto Sans JP | 16px | 400 | 28.8px–32px (×1.8–2.0) | normal | 記事本文・段落 |
| Body Compact | Noto Sans JP | 16px | 400 | 25.6px (×1.6) | normal | カード内テキスト |
| Caption | Noto Sans JP | 14px | 400 | 25.2px (×1.8) | normal | 補足・日付 |
| Small Label | Century Gothic | 12px | 400 | normal | normal | パンくず・メタ。color: #404040 |
| Nav Link | Century Gothic | 16px | 400 | normal | normal | ヘッダーナビ |
| Mega Nav Title | Century Gothic | 26px | 700 | normal | normal | メガメニューの分類タイトル |

### 3.5 行間・字間

- **コンテンツ本文の行間**: 1.6〜2.0（28.8 / 16, 32 / 16, 25.6 / 16）— 和文として標準的に広め。可読性重視
- **見出しの行間**: 一律 1.4（47.6 / 34, 39.2 / 28, 33.6 / 24, 30.8 / 22, 25.2 / 18）— ボトムアップで×1.4 が基本ルール
- **トップページ大型英字見出しの行間**: `normal`（Century Gothic ベースなので和文行間ルールを適用しない）
- **letter-spacing**: 全要素で `normal`。負トラッキングや字詰めは観測されず（ベタ組）

**ガイドライン**:
- 和文 H 系は **font-size × 1.4 = line-height** を厳守
- 本文は **× 1.6〜2.0** で広めに取る（コーポレート系の安心感）
- 字詰めはせず、フォント本来のメトリクスで組む

### 3.6 禁則処理・改行ルール

```css
/* 観測上、特殊な禁則設定なし（ブラウザデフォルト準拠） */
word-break: normal;
overflow-wrap: normal;
line-break: auto;
```

### 3.7 OpenType 機能

```css
font-feature-settings: normal;
```

- 全ページで `font-feature-settings: normal`。`palt`（プロポーショナルメトリクス）は適用されていない
- 字面はベタ組で、和文の文字幅を均等に保つ方針

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

**Primary CTA / Contact Pill**
- Background: `#dc000c`
- Text: `#ffffff`
- Border Radius: `50px`（完全な丸ピル）
- Font Family: `"Century Gothic", "Noto Sans", "Noto Sans JP", sans-serif`
- Font Size: 14px
- Font Weight: 400
- Padding: 横長の楕円ピル（高さに対して横幅が長い）

**Search Button**
- Background: `#dc000c`
- Text: `#ffffff`
- Border Radius: `32px`
- Font Size: 22px
- Font Weight: 400

**Secondary Button (Filter Tag)**
- Background: `#efefef`
- Text: `#000000`
- Border Radius: `0px`
- Font Size: 13.3333px（ブラウザ既定の `0.8333em`）

**Clear Button (Text)**
- Background: `#f7f6f6`
- Text: `#dc000c`
- Border Radius: `0px`
- Font Size: 14px
- 用途: 「選択条件をクリア」等のテキスト型 destructive 操作

**Modal Close**
- Background: `#ffffff`
- Border Radius: `50%`（円形）
- Font Family: Arial
- Font Size: 13px

### Links

- **Default Link Color**: 文中リンクは `#000000` ベースで下線。ブラウザデフォルト `#0000ee` のままになっている箇所もあるが、明示的なブランドリンクカラーは設定されていない
- **Hover**: 不透明度変化または下線追加（明示なし）

### Cards

**Info Card（事業紹介・関連情報）**
- Background: `#f2f1ec`（薄いベージュ）
- Text: `#000000`
- Padding: 内余白あり
- Border Radius: 0px
- Font Size: 18px / line-height 32.4px (×1.8)

**News Card**
- 背景白・区切り線で構成
- カード内 H3: 22px / 700

### Page Title Bar

- Background: `#f7f6f6`
- H1: Noto Sans JP / 34px / 700 / line-height 47.6px
- 下層ページ共通のヘッダー帯

### Inputs

- フォームの詳細は抽出データに含まれず（現状の主要ページにフォームが少ない）
- 検索ボックス・チェックボックス・ラジオは Arial / `13.3333px` 基準

---

## 5. Layout Principles

### Header

- **高さ**: 約 110px（body の `padding-top: 110px` で固定ヘッダー分を確保）
- **背景**: `#ffffff`
- **ナビゲーション**: 横並びテキストリンク + 右端に赤い「お問合せ」ピル CTA
- **言語切替**: JP / EN（2言語）

### Spacing Scale

| Token | Value |
|-------|-------|
| 明示的なスペーシングトークンは確認できず | — |

セクション間は数十〜100px超の縦余白を取り、コーポレート系として広めに構成。

### Container

- 明示的な max-width 値は抽出されないが、コンテンツ領域は中央寄せ・両端余白あり

### Grid

- 事業一覧・ニュース一覧は2〜4カラムのカードグリッド
- カラム数はブレークポイントに応じて変化

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 基本的にフラット |

- ボタン・カードに明示的な box-shadow は観測されず
- 区切りは色面の差（#f7f6f6 / #f2f1ec / #efefef）と境界線で表現

---

## 7. Do's and Don'ts

### Do（推奨）

- 大型英字見出し（Century Gothic 40〜58px / 700）でセクションを区切る
- ページタイトル帯は `#f7f6f6` 背景 + Noto Sans JP 34px / 700 で統一する
- 主要 CTA・コンタクトリンクは `#dc000c` のピル型ボタンで表現する
- 和文本文の line-height は 1.6〜2.0 で広めに取る
- 和文見出しは line-height 1.4 を厳守する（×1.4 ルール）
- リード・特徴コピーには `#9f9889`（ベージュ）を使い、本文と差別化する
- グローバル領域では Century Gothic を先頭に置き、コンテンツ領域では Noto Sans JP を先頭に置く（領域で stack を切り替える）

### Don't（禁止）

- letter-spacing を負の値にしない（ベタ組ベース）
- 本文に Century Gothic を使わない（英字見出し・ナビ専用）
- ブランド赤 `#dc000c` を本文や広面積背景に使わない（CTA・強調点・主要アクションのみ）
- `#0000ee`（ブラウザデフォルトリンク色）をそのまま見せない（必ず黒や赤で上書きする）
- 和文見出しの font-feature-settings を palt にしない（normal を維持）
- 派手なシャドウやグラデーションでフラット感を崩さない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | 〜767px | スマートフォン |
| Tablet | 768〜1024px | タブレット |
| Desktop | 1025px〜 | デスクトップ |

※ 具体的な数値は抽出データに含まれず。一般的なコーポレートサイト基準を推奨

### タッチターゲット

- 最小サイズ: 44px x 44px（WCAG 推奨）
- お問合せピル CTA はモバイルでも十分な高さを確保

### フォントサイズの調整

- モバイルでは Display 58px → 32px 程度、H1 34px → 24px 程度に縮小
- 本文 16px はそのまま維持

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
# Brand
Brand Red:        #DC000C   ← CTA・検索・強調
Page Bg:          #FFFFFF
Hero Bg:          #F7F6F6   ← ページタイトル帯
Info Card Bg:     #F2F1EC   ← ベージュ系カード
Subtle Bg:        #EFEFEF   ← 二次ボタン
Text Primary:     #000000
Text Sub:         #404040
Text Tertiary:    #999999
Beige Accent:     #9F9889   ← リード文専用

# Typography
Global Stack:     "Century Gothic", "Noto Sans", "Noto Sans JP", sans-serif
Content Stack:    "Noto Sans JP", "Noto Sans", sans-serif
Page H1 Stack:    "Noto Sans JP", sans-serif
Display Hero (EN): Century Gothic / 58px / 700 / lh: normal
Page H1:          Noto Sans JP / 34px / 700 / lh: 47.6px (×1.4)
Section H2:       Noto Sans JP / 28px / 700 / lh: 39.2px (×1.4)
Body:             Noto Sans JP / 16px / 400 / lh: 28.8-32px (×1.8-2.0)
letter-spacing:   normal（全要素ベタ組）
font-feature-settings: normal（palt 不使用）
```

### プロンプト例

```
三菱地所のコーポレートサイトのデザインシステムに従って、サービス紹介ページを作成してください。

- ページタイトル帯: bg #F7F6F6 / H1 "Noto Sans JP" 34px / 700 / line-height: 47.6px / color: #000000
- セクション英字見出し: "Century Gothic" 46-58px / 700 / lh: normal / color: #000000（"NEWS" "TOPICS" 等）
- セクション和文見出し: "Noto Sans JP" 28px / 700 / line-height: 39.2px / color: #000000
- リード文（特徴コピー）: "Noto Sans JP" 22px / 700 / line-height: 30.8px / color: #9F9889
- 本文: "Noto Sans JP" 16px / 400 / line-height: 28.8-32px / color: #000000
- 主要 CTA: bg #DC000C / color: #FFFFFF / border-radius: 50px / "Century Gothic" 14px / ピル型
- 情報カード: bg #F2F1EC / 角なし / 18px lh 32.4px の本文
- letter-spacing: 全要素 normal（ベタ組）
- 和文見出しの行間: font-size × 1.4 を厳守
- 和文本文の行間: × 1.6〜2.0（広め）
```

### Stack 切り替えのコツ

実サイトはヘッダー・ナビ・トップページ大型英字見出しでは **Century Gothic 先頭**、下層ページのコンテンツでは **Noto Sans JP 先頭** に stack を切り替えている。エージェント側でも領域に応じて使い分けると正確性が上がる:

1. グローバル/ヘッダー/英字見出し → Century Gothic 先頭の stack
2. 記事本文/H1/H2/H3 → Noto Sans JP 先頭の stack
