# DESIGN.md — Digital Agency Japan (digital.go.jp)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> デジタル庁公式ウェブサイト。アクセシビリティ・公共サービスのリファレンス。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: アクセシビリティ・可読性最優先の公共サービスデザイン。装飾を抑え、深い藍色 `#00118f` を機能色として一貫運用。WCAG 準拠を意識した余裕ある文字組み
- **密度**: ゆったり。本文 17px / 見出し最大 45px の大きめスケールで、高齢者・視覚障害者にも読みやすい設計
- **キーワード**: Accessible, Public Service, Trustworthy, Calm Navy, Methodical Tracking

---

## 2. Color Palette & Roles

| Role | Hex | 備考 |
|------|-----|------|
| **Accent Navy** | `#00118F` | デジタル庁シグネチャー濃藍。リンク・フォーカス・選択状態の色 |
| Accent Bg | `#D9E6FF` | 選択中の背景（言語切替アクティブ等） |
| Text Primary | `#333333` | 本文・見出し |
| Text Sub | `#4D4D4D` | 補足テキスト（"選択したカテゴリの新着…" 等） |
| Background | `#FFFFFF` | ページ背景 |
| Border / Focus Ring | `#00118F` | リンク色と統一 |

### Color Roles

- **Brand Navy** (`#00118F`): リンク・スキップリンク・アクセントテキスト・focus indicator。明度が低く（青寄りの濃紺）、白背景に対して十分なコントラスト比を確保
- **Selected Background** (`#D9E6FF`): 言語切替の現在選択（"日本語" 選択時のチップ背景）
- **Text Primary** (`#333333`): 本文・見出し共通。純黒 #000 は使わず、わずかにソフトな #333 で目に優しい
- **Text Sub** (`#4D4D4D`): 説明文・キャプション
- **White** (`#FFFFFF`): 背景

公共サイトとして極めてミニマルなパレット。装飾色（成功緑・警告赤等）は最小限の使用に留められ、ベージュやグレースケールの間色も排除されている。

---

## 3. Typography Rules

### 3.1 和文フォント

```css
font-family:
  "Noto Sans JP",
  -apple-system,
  blinkmacsystemfont,
  "Segoe UI",
  ...sans-serif;
```

- **Noto Sans JP** を最先頭に置く明確な指定
- 続いて macOS / Windows / Android のシステムサンセリフ（San Francisco / Segoe UI）でフォールバック
- 明朝体は使用していない

### 3.2 欧文フォント

- 和文スタックの2番目以降に欧文システムフォントが含まれており、欧文専用 stack は別途持たない
- `-apple-system` / `BlinkMacSystemFont` / `Segoe UI` の OS デフォルト UI サンセリフを利用

### 3.3 font-family 指定

```css
/* グローバル */
font-family:
  "Noto Sans JP",
  -apple-system,
  blinkmacsystemfont,
  "Segoe UI",
  Helvetica,
  Arial,
  sans-serif;
```

**フォールバックの考え方**:
- Noto Sans JP がロード前でも、各 OS のシステム UI フォントで自然に表示される
- Web フォントの遅延ロード対策としてシステムフォントを多段に配置

### 3.4 文字サイズ・ウェイト階層

**Body サイズが 17px** という珍しい設定。標準的な 16px より +1px 大きく、可読性を優先。

| Role | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|--------|-------------|----------------|------|
| Body | 17px | 400 | 28.9px (×1.7) | 0.34px (≈0.02em) | 通常本文 |
| H1 (Page Title) | **45px** | 700 | 63px (×1.4) | 0.45px (≈0.01em) | "新着・更新" "政策" 等 |
| H2 (Section Major) | 32px | 700 | 48px (×1.5) | 0.32px (≈0.01em) | "計画等" "デジタル庁の概要" |
| H2 (Section) | 28px | 700 | 42px (×1.5) | 0.28px (≈0.01em) | "重要なお知らせ" |
| H3 | 28px | 700 | 42px (×1.5) | 0.28px (≈0.01em) | サブセクション |
| H3 (alt) | 18px | 700 | 28.8px (×1.6) | 0.36px (≈0.02em) | "採用種別" |
| H4 | 22px | 700 | 33px (×1.5) | 0.44px (≈0.02em) | "マイナンバー…" |
| Caption | 16px | 400 | 27.2px (×1.7) | 0.32px (≈0.02em) | 説明・補足 |
| Header Item | 14px | 400 | 14px (×1.0) | 0.28px (≈0.02em) | グローバルナビ |
| Header Item Active | 14px | **800** | 14px | 0.28px | 現在ページ（**ExtraBold**） |
| Footer Phone | 14px | 400 | 14px | 0.28px | 連絡先表記 |
| Skip Link | 17px | 700 | 28.9px | 0.34px | "本文へ移動"。color: `#00118F` |
| Lang Selector Active | 16px | 700 | 16px | 0.32px | 日本語/English の選択状態 |

### 3.5 行間・字間

#### 字間の哲学：**全要素に 0.02em の一貫したプラストラッキング**

これがデジタル庁デザインの最大の特徴です。

| font-size | letter-spacing | em 換算 |
|-----------|----------------|---------|
| 14px | 0.28px | 0.020em |
| 16px | 0.32px | 0.020em |
| 17px | 0.34px | 0.020em |
| 18px | 0.36px | 0.020em |
| 22px | 0.44px | 0.020em |
| 28px | 0.28px | 0.010em ※ |
| 32px | 0.32px | 0.010em ※ |
| 45px | 0.45px | 0.010em ※ |

**※ 大型見出しは em 換算で 0.01em（半分）に縮小**。サイズが上がるほど相対的なトラッキングは小さくなる、洗練されたタイポグラフィ設計。

#### 行間ルール

- **Body**: 1.7（28.9 / 17）— 公共系として広め
- **見出し**: 1.4〜1.6 — サイズに応じて段階的に
- **Header Item**: 1.0（行高 = font-size）— 横並びナビ用にタイト

### 3.6 禁則処理・改行ルール

明示的な指定なし。ただし可読性重視のため `word-break: keep-all` 推奨。

### 3.7 OpenType / 特殊機能

- `font-feature-settings: normal`
- `palt` 不使用（ベタ組）

### 3.8 縦書き

該当なし

---

## 4. Component Stylings

### Buttons

- **Header Items / Lang Selector**: `border-radius: 9999px`（完全 pill 型）
  - 現在ページ: bg `#D9E6FF` / color `#00118F` / **font-weight 800**
  - 通常: bg transparent / color `#333`
- **Skip Link** (アクセシビリティ): bg transparent / color `#00118F` / radius 4px / font-weight 700

### Links

- **Default Link**: `#00118F`（深い藍）/ 下線あり
- **Hover**: 不透明度・下線維持
- **Visited**: 同色（区別なし）

リンク色を一色に統一することでナビゲーションの予測可能性を高める。

### Cards (News / Topics)

- bg #fff / border #ddd 等の控えめなボーダー
- card title: 17px / 400 / lh 28.9px / ls 0.34px

### Header

- 高さ: **5rem (80px)** — `--header-block-size: 5rem` で定義
- ロゴ + 横並びナビ + 言語切替

### Page Title (H1)

- font-size 45px / font-weight 700 / line-height 63px / letter-spacing 0.45px
- 余白を大きく取り、ページの主題を明確に提示

---

## 5. Layout Principles

### Spacing & Container

- 中央寄せレイアウト
- 大きな縦余白（公共サイトとして焦らせない）

### Header

```css
:root {
  --header-block-size: 5rem; /* 80px */
}
```

### Grid

- 1〜3 カラムのレスポンシブグリッド

---

## 6. Depth & Elevation

- **完全フラット**
- box-shadow を使用しない
- 階層は色面（白背景 vs `#D9E6FF`）と境界線で表現

---

## 7. Do's and Don'ts

### Do（推奨）

- リンクは必ず **`#00118F`（濃藍）** で統一する（メリハリのある色を1つに絞る）
- 本文は **17px**（標準より +1px 大）でアクセシビリティを確保する
- letter-spacing は **0.02em の一貫値**で全要素に適用する
- 大型見出しは em 換算で **0.01em** に縮小（サイズの逆比）
- font-weight 800（ExtraBold）は現在ページの強調等、限定的にのみ使う
- 完全フラット、shadow を使わない
- 言語切替は pill 型（border-radius 9999px）

### Don't（禁止）

- 純黒 `#000` を使わない（`#333` を使う）
- リンク色を複数持たない（混乱を生む）
- box-shadow で奥行きを作らない（フラット原則）
- letter-spacing を負にしない（読みづらさを生む）
- 装飾的なフォントや英字書体を混ぜない（公共サイトとしての中立性）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | 〜767px | スマホ |
| Tablet | 768〜1024px | タブレット |
| Desktop | 1025px〜 | デスクトップ |

### タッチターゲット

- 最小 44 × 44px（WCAG 推奨）
- ヘッダーアイテムは line-height: 14px / padding を加えて 44px 以上を確保

### フォントサイズの調整

- 本文 17px は維持（モバイルでも縮小しない）
- 大型 H1 45px → モバイルで 28px 程度に縮小推奨

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
# Brand
Accent Navy:        #00118F   ← リンク・focus・選択状態
Accent Bg:          #D9E6FF   ← 選択中の背景

# Text
Text Primary:       #333333
Text Sub:           #4D4D4D
Background:         #FFFFFF

# Typography
Font:               "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
Body:               17px / 400 / lh 28.9px (×1.7) / ls 0.34px (0.02em)
H1 (Page Title):    45px / 700 / lh 63px (×1.4) / ls 0.45px (0.01em)
H2 (Section):       32px / 700 / lh 48px (×1.5) / ls 0.32px (0.01em)
H2 (Hero):          28px / 700 / lh 42px / ls 0.28px (0.01em)
H3:                 28px / 700 / lh 42px (×1.5)
H4:                 22px / 700 / lh 33px (×1.5) / ls 0.44px (0.02em)
Header Item:        14px / 400 / lh 14px / ls 0.28px / pill (radius 9999px)
Active State:       font-weight: 800 + bg #D9E6FF + color #00118F

# Header
Header Height:      5rem (80px) — var(--header-block-size)

# Letter-spacing 哲学
本文〜中見出し:      0.02em（font-size × 0.02 を px で算出）
大型見出し:         0.01em（サイズに反比例）
```

### プロンプト例

```
デジタル庁のデザインシステムに従って、政策ページを作成してください。

- font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- 本文: 17px / 400 / line-height 28.9px (×1.7) / letter-spacing 0.34px / color: #333333
- ページ H1: 45px / 700 / line-height 63px (×1.4) / letter-spacing 0.45px / color: #333
- セクション H2: 32px / 700 / line-height 48px / letter-spacing 0.32px
- リンク・focus: color #00118F (深い藍) — 一色統一
- 選択状態: bg #D9E6FF / color #00118F / font-weight 800
- 全要素 letter-spacing 0.02em (font-size の 2%) で統一
- ヘッダー高さ: 5rem (80px)
- shadow を使わない完全フラット
- 装飾的な色（緑・赤・オレンジ等）を使わない
- 純黒 #000 ではなく #333 を使う
```

### アクセシビリティの参照デザインとして

デジタル庁のサイトは **公共サービスデザインのリファレンス** として参考価値が高く、特に:
- 一色に統一された rich link color
- 大きめの本文サイズ（17px）
- font-size 比例の一貫した letter-spacing
- WCAG 準拠の touch target / contrast ratio

これらは民間サイトでもアクセシビリティを重視する場合に応用可能。
