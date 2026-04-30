# DESIGN.md — Nikkei (nikkei.com)

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 日本経済新聞 電子版（NIKKEI Digital）公式サイト。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 新聞・出版の延長として **テキスト密度の極致**。装飾を排し、見出しサイズの段階的差別化（27px / 24px / 22px / 20px / 18px / 16px）と font-weight 700 で**情報優先順位**を視覚化する
- **密度**: 高い。1スクリーンに大量の見出し・記事タイトルを並べ、読者がスキャンできる新聞紙面の構造をデジタルで再現
- **キーワード**: Information-Dense, Text-First, Newspaper Heritage, System Font Stack, Editorial Hierarchy

---

## 2. Color Palette & Roles

| Role | Hex | 備考 |
|------|-----|------|
| Text Primary | `#333333` | 本文・見出し共通 |
| Text Sub | `#5C5C5C` | 記事本文の引用・引き出し |
| Text Sub 2 | `#757575` | キャプション |
| **Brand Navy** | `#003E70` | ログインボタン背景。日経の伝統的な企業色 |
| **Subscription Orange** | `#F58700` | "お申し込み" ボタン。新規購読への誘導 |
| **CTA Blue** | `#0068BC` | フィードバック等の主要 CTA |
| **Link Blue** | `#326691` | 通常リンク（Skip Link 含む）。落ち着いた紺色寄り |
| **Help Link Blue** | `#113366` | 旧ヘルプページ系の濃いリンク |
| **Footer Copy Blue** | `#143A65` | フッター copyright 色 |
| **LIVE Red** | `#EB1400` | "LIVE中" ピル背景。緊急性表示 |
| Background | `#FFFFFF` | ページ背景 |
| Bg Subtle | `#FAFAFA` | サービス紹介ボタン等の薄い背景 |
| Bg Subtle 2 | `#F8F8F8` | Markets ページの検索ボックス |

### Color Roles

新聞らしい **重層的なブルー** と、**明確な購読 CTA オレンジ** が共存する独特の配色:

- **#003E70（ネイビー）**: ログイン・契約者向けの企業色
- **#F58700（オレンジ）**: 新規購読の "お申し込み" — ターゲットを明確に分けるためログインとは色を変える
- **#326691（ダスティブルー）**: 一般的なリンク色。新聞らしい落ち着き

### State Colors

「LIVE中」表示の `#EB1400`（コーラルレッド寄りの朱）はピル型 + 16px radius で目立たせる、これもデジタル時代の新聞らしい emergency 設計。

---

## 3. Typography Rules

### 3.1 和文フォント

```css
/* メインの body 用スタック（驚くべきことに和文フォント明示なし） */
font-family:
  -apple-system,
  "system-ui",
  "Segoe UI",
  Roboto,
  Oxygen,
  ...sans-serif;
```

**特徴**: Nikkei のメイン body は **和文フォントを明示しない** OS システム UI フォント主体のスタック。日本語は OS 標準（macOS の Hiragino、Windows の 游ゴシック等）に任せる方針。

ただし旧 ヘルプページ等のレガシー領域では伝統的な指定:
```css
font-family:
  "ヒラギノ角ゴ Pro W3",
  "Hiragino Kaku Gothic Pro",
  "ＭＳ Ｐゴシック",
  ...sans-serif;
```

### 3.2 欧文フォント

- `-apple-system` / `system-ui` / `Segoe UI` / `Roboto` / `Oxygen` という多 OS のシステムフォント混在 stack
- Web フォントは使わない（パフォーマンス・新聞らしい中立性を重視）

### 3.3 font-family 指定（まとめ）

```css
/* メイン nikkei.com */
font-family:
  -apple-system,
  "system-ui",
  "Segoe UI",
  Roboto,
  Oxygen,
  Ubuntu,
  "Helvetica Neue",
  Arial,
  sans-serif;

/* ヘルプページ等のレガシー領域 */
font-family:
  "ヒラギノ角ゴ Pro W3",
  "Hiragino Kaku Gothic Pro",
  "ＭＳ Ｐゴシック",
  Osaka,
  ...sans-serif;
```

**フォールバックの考え方**:
- メインはシステムフォントを最優先 = 各 OS のネイティブな読書体験を尊重
- 和文フォントを明示しないことで、Web フォントロード遅延・FOIT を完全回避
- レガシーページのみ伝統的な指定が残る

### 3.4 文字サイズ・ウェイト階層

新聞らしく **多段階の見出しスケール** を駆使する。

| Role | Size | Weight | Line Height | LH ratio | 備考 |
|------|------|--------|-------------|----------|------|
| **Hero Article H2** | 27px | 700 | 36.45px | ×1.35 | トップ記事。"ビッグテックがAI投資で…" |
| Major Article | 24px | 700 | 36px | ×1.5 | "【LIVE】｢トランプ危機｣…" |
| Article (Lead) | 22px | 700 | 33px | ×1.5 | "パウエル氏…" |
| Article Standard | 20px | 700 | 30px | ×1.5 | "スズキのインド戦略…" |
| Article (Smaller) | 18px | 700 | 27px | ×1.5 | "円相場…" |
| Section Title | 20px | 700 | 30px | ×1.5 | "マーケット" "ビジネス" 等 |
| Hub Card Large | 28px | 700 | 37.8px | ×1.35 | ビジネス hub のメイン記事 |
| Compact List Item | 16px | 700 | 24px | ×1.5 | "速報ニュース" 等のリンク |
| Article Meta | 14px | 700 | 23.1px | ×1.65 | "新着" 等のラベル |
| Body | 16px | 400 | 24px | ×1.5 | 標準本文 |
| Article Excerpt | 14px | 400 | 23.1px | ×1.65 | 記事の引き出し。color #5C5C5C |
| Caption | 12px | 400 | 19.8px | ×1.65 | 注釈・Copyright |
| Header Item | 13px | 700 | 21.45px | ×1.65 | "朝刊・夕刊" 等 |
| Header Item Inactive | 13px | 400 | 17.55px or 19.5px | | サービスナビ |
| Subscribe CTA | 12px | 700 | 19.8px | ×1.65 | "お申し込み"。bg #F58700 / 白 |
| Login | 12px | 700 | 19.8px | ×1.65 | "ログイン"。bg #003E70 / 白 |
| LIVE Pill | 13px | 700 | 13px | ×1.0 | "LIVE中"。bg #EB1400 / 白 / radius 16px |

### 3.5 行間・字間

- **letter-spacing**: 全要素 `normal` — 新聞らしいベタ組徹底
- **line-height**:
  - **記事本文系**: ×1.65（23.1 / 14, 19.8 / 12）— やや広め
  - **見出し**: ×1.35〜1.5
  - **大型 hero**: ×1.35（37.8 / 28, 36.45 / 27）— 詰め気味
  - **横並びナビ**: ×1.0〜1.65

**特徴**: Nikkei は letter-spacing をデザインツールとして使わない。純粋にシステムフォントのデフォルトメトリクスのみで組む。

### 3.6 禁則処理・改行ルール

明示的指定なし。ブラウザデフォルトに任せる。

### 3.7 OpenType / 特殊機能

- `font-feature-settings: normal`
- `palt` 不使用

### 3.8 縦書き

Web 版は横書きのみ。

---

## 4. Component Stylings

### Buttons

**Subscribe CTA**
- Background: `#F58700`（オレンジ）
- Color: `#FFFFFF`
- Border Radius: 2px
- Font Size: 12px / 700

**Login Button**
- Background: `#003E70`（ネイビー）
- Color: `#FFFFFF`
- Border Radius: 2px
- Font Size: 12px / 700

**Feedback CTA**
- Background: `#0068BC`
- Color: `#FFFFFF`
- Border Radius: 2px
- Font Size: 14px / 400 or 700

**Service Nav Button**
- Background: `#FAFAFA`
- Color: `#333`
- Border Radius: 2px

### LIVE Indicator

```css
.live-pill {
  background: #EB1400;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 700;
  line-height: 13px;
  padding: 2px 8px;
  border-radius: 16px;
}
```

### Tab / Section Header

特徴的な装飾: "もっと見る" ボタンに **`border-radius: 2px 2px 0px 0px`**（上の角だけ丸い）が使われる。タブ風の表現。

### Article Card

- 画像 + 見出し（700）+ 引き出し（400 / #5C5C5C）+ 日付（12px / #757575）
- カード自体に明示的な border は持たず、罫線で区切る新聞紙面風

### Header

- Sticky ヘッダー
- ロゴ + ナビ + 検索 + ログイン/購読 CTA
- 細密で情報量の多い設計

---

## 5. Layout Principles

### Container

- 大規模なグリッドレイアウト
- メイン記事 + サイドバー + フッターの3カラム以上

### Grid (Article List)

- 1〜4 カラムの可変グリッド
- 大記事は 1 カラム、小記事は 4 カラム以上に並ぶ

### Border Radius

- 全体的に **2px**（最小限の角丸） + LIVE ピルの 16px が例外
- タブ風要素は `2px 2px 0px 0px`

---

## 6. Depth & Elevation

明示的な box-shadow は控えめ。ヘッダーに薄い shadow がある程度で、基本フラット。新聞紙面のように奥行きを使わない。

---

## 7. Do's and Don'ts

### Do（推奨）

- font-family は **OS システム UI フォント主体**（`-apple-system, system-ui, Segoe UI, Roboto`）
- 和文フォントは **明示しない**（OS デフォルトに任せる）
- 見出しは **段階的サイズ差**（27/24/22/20/18/16）+ font-weight 700 でヒエラルキを表現
- 購読 CTA は **オレンジ #F58700**、ログインは **ネイビー #003E70** で**ターゲットを色分け**
- リンクは落ち着いた **#326691（ダスティブルー）**
- LIVE 表示は **#EB1400 + radius 16px ピル** で目立たせる
- letter-spacing は **全要素 normal** でベタ組
- 装飾を排し、**情報密度** を最優先する

### Don't（禁止）

- Web フォントを読み込まない（OS フォント優先）
- letter-spacing をいじらない
- 派手なシャドウ・グラデーションを使わない（新聞らしさを損なう）
- リンク色を多色に分けない（ナビは #003E70、リンクは #326691、購読は #F58700 の3色を厳守）
- 大型バナー的なヒーローを置かない（紙面構造を保つ）
- box-shadow で奥行きを作らない

---

## 8. Responsive Behavior

明示的なブレークポイントは抽出データに含まれず。記事密度の高さから、モバイルでは1カラム、タブレット以上で2〜3カラム化が標準的。

### Breakpoints（推奨）

| Name | Width | 説明 |
|------|-------|------|
| Mobile | 〜767px | 1 カラム |
| Tablet | 768〜1024px | 2 カラム |
| Desktop | 1025〜1440px | 3〜4 カラム |
| Wide | 1441px〜 | 4〜5 カラム + サイドバー |

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
# Brand
Subscribe Orange:   #F58700   ← "お申し込み" CTA
Login Navy:         #003E70   ← "ログイン" CTA
CTA Blue:           #0068BC   ← フィードバック等
Link Blue:          #326691   ← 通常リンク・skip link
LIVE Red:           #EB1400   ← LIVE 表示

# Text
Text Primary:       #333333
Text Sub:           #5C5C5C
Text Caption:       #757575

# Typography
Font:               -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, sans-serif
Body:               16px / 400 / lh 24px (×1.5) / ls normal
Hero Article H2:    27px / 700 / lh 36.45px (×1.35)
Article Lead:       22-24px / 700 / lh ×1.5
Article Standard:   18-20px / 700 / lh ×1.5
Compact List:       16px / 700 / lh 24px (×1.5)
Body Excerpt:       14px / 400 / lh 23.1px (×1.65) / color #5C5C5C
Caption:            12px / 400 / lh 19.8px (×1.65)
letter-spacing:     全 normal（新聞らしいベタ組）

# Components
Subscribe CTA:      bg #F58700 / radius 2px / 12px 700
Login Button:       bg #003E70 / radius 2px / 12px 700
LIVE Pill:          bg #EB1400 / radius 16px / 13px 700 / lh 13px
Tab "もっと見る":   border-radius 2px 2px 0 0
```

### プロンプト例

```
日経電子版のデザインシステムに従って、ニュース一覧ページを作成してください。

- font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, sans-serif
- 和文フォントは明示しない（OS デフォルトに任せる）
- ヒーロー記事 H2: 27px / 700 / line-height 36.45px (×1.35) / color #333
- 主要記事: 24px / 700 / line-height 36px (×1.5)
- 標準記事: 20px / 700 / line-height 30px (×1.5)
- 引き出し: 14px / 400 / line-height 23.1px (×1.65) / color #5C5C5C
- 購読 CTA: bg #F58700 / color #fff / radius 2px / 12px 700
- ログイン: bg #003E70 / color #fff / radius 2px / 12px 700
- LIVE 表示: bg #EB1400 / color #fff / radius 16px / 13px 700 / lh 13px
- リンク: color #326691（ダスティブルー）
- letter-spacing: 全 normal
- 装飾を排し、情報密度を優先する新聞紙面風レイアウト
- 1スクリーンに大量の見出しを並べ、サイズ差で優先順位を視覚化
```

### 新聞デジタル化のリファレンスとして

Nikkei の設計は **「テキストを読ませる UI」のリファレンス** として参考価値が高く:
- Web フォントを使わないパフォーマンス最優先
- letter-spacing 0 のベタ組
- 5〜6段階の見出しサイズで紙面構造を再現
- リンク色を機能別に分けるアフォーダンス
- 装飾を徹底的に排した情報優先設計

これらは情報密度が要求される業務系ダッシュボード・社内ツール・ナレッジベース等にも応用可能。
