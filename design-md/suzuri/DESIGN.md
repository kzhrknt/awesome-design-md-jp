# DESIGN.md — SUZURI（スズリ）

> SUZURI（https://suzuri.jp/）のデザイン仕様書。
> GMO ペパボが運営する、**画像 1 枚からオリジナルグッズを作って売れる**マーケットプレイス。933 万点超のアイテムが並ぶ。
> **ペパボ共通のデザインシステム「Nachiguro（なちぐろ）」の上に構築されている**。クラスは `ncgr-` 接頭辞、アイコンは `"Nachiguro Icons"` という専用フォント、CSS は `packs/nachiguro.*.css`（1.89MB）。**トークンは 25/50/75/100〜900 の 12 段スケールを 6 系統持つ、日本語圏では珍しく整った設計体系**
> **面色はすべて二重の `linear-gradient` で塗られている**。`background-color` は透明のまま `background-image: linear-gradient(#067bbf,#067bbf)` で単色を作る。**`background-color` だけを見ると全ボタンが「色なし」に見える**
> **トークンの値と実装の値がずれている**。`--color-primary-500: #007bbb` は CSS 全体で**宣言の 1 回しか出てこない**のに、ボタンの面は `#067bbf` が **1002 回**。`--color-danger-500: #e83929` に対して実装は `#bf2213` が **1960 回**（第 2 節末に詳述）
> **ボタンのウェイトが 400**。日本語 UI で主 CTA を Regular のまま置くのは珍しく、これが SUZURI の軽さを作っている
> 実サイトの computed style 実測（2026-08-27 取得。トップ ＋ T シャツ一覧 `/categories/t-shirts`）＋ `nachiguro.css` の直接 grep に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **白地にグレーのカード、青を 1 点だけ**。並ぶのはクリエイターの作品画像そのものなので、UI は徹底して引く。彩度を持つのは主 CTA の青と、ランキングの金銀銅、いいねの赤だけ
- **SUZURI について**: 画像をアップロードすると T シャツ・スマホケース・マグカップ等に自動で載り、そのまま販売までできるサービス。**「つくる人」と「買う人」が同じ画面に同居する**ため、ヘッダーには常に「自分用につくる」「ショップで販売する」の 2 つが並ぶ
- **密度**: **高い**。1 画面に商品サムネイルが 7〜8 列並ぶ。ただし**本文の行間は 1.8** と広く取り、文字が詰まらない
- **キーワード**: Nachiguro、8px の角丸、二重グラデーションの面、下辺 2px の押し込み影、`line-height: 1.8`、ボタンは 400
- **特徴**:
  - **radius が 8px にほぼ統一**。`border-radius: .5rem`（8px）が **322 回**で圧倒的。次が `1.25rem`（20px）104 回、`1rem`（16px）53 回。**同じ 8px をボタン・カード・チップ・入力欄すべてに使う**
  - **ボタンに「押し込みの縁」がある**。`box-shadow: 0 -.1px 1px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.12), 0 0 transparent, 0 0 rgba(255,255,255,.5), 0 -2px rgba(0,0,0,.24)` ——**最後の `0 -2px rgba(0,0,0,.24)` が下辺だけを暗くする**。iOS 的なベベル表現
  - **ホバーは色を差し替えず、白 8% を重ねる**。`linear-gradient(rgba(255,255,255,.08), rgba(255,255,255,.08))` を面の上に足す。だから面が 2 層でも 3 層でも成立する
  - **`letter-spacing` は全部 `normal`**。CSS 中の宣言 21 個がすべて `normal`。**字間を触らない**
  - **`font-feature-settings` の宣言が 1 つも無い**（＝ `palt` を使わない）
  - **ランキング 1〜3 位が金・銀・銅**。`#fbca4d`（warning-500）／`#b0b0b0`（default-200）／`#ce4216`（secondary-600）。**4 位以降は白地に `#d0d0d0` の枠**に落ちる
  - **ページ最上部の GMO グループ帯（`#30f4c5` の「無料診断」等）と最下部のグループフッター（`#005bac`、9.5px）は SUZURI のデザインではない**。GMO 全社共通のウィジェットなので、色を拾うときは必ず除外する

---

## 2. Color Palette & Roles

> 地は `#ffffff`（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）。トップ・一覧ページとも同じ。

### Brand（ブランド）

- **SUZURI Blue** (`#067bbf`, rgb 6,123,191): **主色**。CSS 出現 **1002 回**。主 CTA（「自分用につくる」「詳しく見る」「この条件で絞り込む」）の面、テキストリンクの色。**トークン `--color-primary-500` の値 `#007bbb` とは別値なので注意**（下記）
- **Primary 500（トークン値）** (`#007bbb`, rgb 0,123,187): `New!` バッジの面など、**Nachiguro のボタン以外**で使われる。JIS 慣用色の「紺碧」に近い
- **Primary 600** (`#006fa8`): 小見出しのリンク色（16px / 700）
- **Primary 900** (`#00507a`): 淡い青バッジの文字
- **Primary 50** (`#e6f2f8`): 「人気アイテム」バッジの面
- **Like Red** (`#bf2213`, rgb 191,34,19): **いいね数の文字色**。CSS 出現 **1960 回で全色中トップ**。トークン `--color-danger-500`（`#e83929`）とは別値
- **Campaign Blue** (`#2058e5`, rgb 32,88,229): 「法人ノベルティをつくる」CTA と右下のフローティングボタン。**`nachiguro.css` に 0 回** ＝ SUZURI 側が独自に足した色

### Semantic（Nachiguro のセマンティック 500）

| 役割 | トークン | 値 | 実装での現れ方 |
|------|---------|-----|---------------|
| Primary | `--color-primary-500` | `#007bbb` | `New!` バッジ。**ボタンは `#067bbf`** |
| Secondary | `--color-secondary-500` | `#e54918` | 実装は 600 の `#ce4216`（ランキング 3 位） |
| Success | `--color-success-500` | `#4bae4f` | 状態インジケータ |
| Warning | `--color-warning-500` | `#fbca4d` | **ランキング 1 位のメダル** |
| Danger | `--color-danger-500` | `#e83929` | **実装は `#bf2213`**（1960 回） |

各系統は `25 / 50 / 75 / 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900` の **12 段**を持つ。

### Neutral（`--color-default-*`）

| トークン | 値 | 用途 |
|---------|-----|------|
| `--color-default-25` | `#f7f7f7` | 一覧ページの地。**49 回** |
| `--color-default-50` | `#efefef` | セクションの面・`--color-secondary-background`。**37 回** |
| `--color-default-75` | `#dfdfdf` | セグメント／フィルタボタンの面・`--color-separator`。**16 回** |
| `--color-default-100` | `#d0d0d0` | ランキング 4 位以降の枠 |
| `--color-default-200` | `#b0b0b0` | **ランキング 2 位のメダル** |
| `--color-default-300` | `#909090` | `--color-secondary-label`（補助テキスト） |
| `--color-default-900` | `#3f3f3f` | `--color-label` ＝ **本文の既定色** |

### Text（実測）

| 役割 | 色 | 用途 |
|------|-----|------|
| 本文 | **`#3f3f3f`** | `body` の既定色 |
| 見出し | **`#393c41`** | h2 / h3。**本文より青みが強い**。CSS 出現 25 回 |
| ナビ | **`#3a3e40`** | ヘッダー内のリンク・見出し |
| ボタンラベル（枠線） | **`#63686b`** | アウトラインボタン・アイコン。**CSS 出現 1144 回**。ホバー時の面色でもある |
| 補助 | **`#909090`** | 日付・件数など |

### SNS ブランド色（Nachiguro が定義）

`--color-brand-x: #000` / `--color-brand-line: #00c300` / `--color-brand-facebook: #305097` / `--color-brand-instagram: #2a5b83` / `--color-brand-nicovideo: #efb10a` / `--color-brand-twitter: #55acee`。**各色に `-dark` / `-darkest` が対で定義**されている。

### ⚠️ トークンの値をそのまま実装しない

**Nachiguro はトークンを持っているが、ボタンの面はトークンを参照していない。**

| 見た目 | トークンの宣言 | CSS 中の実出現 | 実装値 | 実出現 |
|--------|--------------|--------------|--------|--------|
| 主 CTA の青 | `--color-primary-500: #007bbb` | **1 回**（宣言のみ） | `#067bbf` | **1002 回** |
| いいねの赤 | `--color-danger-500: #e83929` | 宣言のみ | `#bf2213` | **1960 回** |
| アウトラインの文字 | `--color-default-*` 経由 | — | `#63686b` | **1144 回** |

ビルド時に色が焼き込まれており、**変数を読んで `#007bbb` で実装すると 1 トーンずれる**。**`computedStyles` / `interactive` の実測値を採用すること。**

---

## 3. Typography Rules

### 3.1 和文フォント

- **ゴシック体**: **Noto Sans JP**（欧文の後ろに置く）。Web フォントは読み込まず、OS 側の Noto Sans CJK / Noto Sans JP に任せる
- **明朝体**: 使用しない

### 3.2 欧文フォント

- **サンセリフ**: **Open Sans**（**スタックの先頭**）→ `apple-system` → `system-ui` → Roboto → Lucida Grande → Helvetica → Arial
- **アイコン**: **`"Nachiguro Icons"`**（Nachiguro 専用のアイコンフォント）。CSS 中 22 回宣言。16px / 24px / 25px / 32px で使われる
- **等幅**: 指定なし

### 3.3 font-family 指定

```css
/* サイト全体 */
font-family: "Open Sans", "Noto Sans JP", apple-system, "system-ui",
             Roboto, "Lucida Grande", Helvetica, Arial, sans-serif;

/* アイコン（Nachiguro Icons） */
font-family: "Nachiguro Icons";

/* ペパボ共通フッターだけ別スタック */
font-family: "Noto Sans JP", -apple-system, "system-ui", "Segoe UI",
             Roboto, "Helvetica Neue", Arial, sans-serif;
```

**フォールバックの考え方**:
- **欧文優先**。`Open Sans` を先頭に置き、数字・アルファベット（価格・件数・「933 万点」）を Open Sans で組む。**和文は Noto Sans JP に落ちる**
- クリエイター名・作品名に欧文が多く混じるサービスなので、**欧文の字面を先に決める**設計は理にかなっている
- **フッターだけ和文優先**（ペパボ共通コンポーネントのため）。1 サイト内で 2 つの方針が同居している

### 3.4 文字サイズ・ウェイト階層

| Role | Size | Weight | Line Height | Color | 備考 |
|------|------|--------|-------------|-------|------|
| Heading 1 (section) | 26px | 700 | 40px (**1.54**) | `#393c41` | セクション大見出し |
| Heading 2 | 21px | 700 | 32px (**1.52**) | `#393c41` | ブロック見出し |
| Heading 2 (nav) | 21px | 700 | 24px (**1.14**) | `#3a3e40` | ヘッダー内の見出し |
| Heading 3 (link) | 16px | 700 | 28.8px (**1.8**) | `#006fa8` | リンクになる小見出し |
| Body | 16px | 400 | 28.8px (**1.8**) | `#3f3f3f` | `body` の既定 |
| Body (compact) | 16px | 400 | 24px (**1.5**) | `#3f3f3f` | リスト内 |
| Button | 16px / 14px | **400** | 24px (**1.5** / **1.71**) | 面による | **Regular のまま** |
| Caption | 13px | 400 | 19.5px (**1.5**) | `#3f3f3f` | 補足 |
| Caption (loose) | 13px | 400 | 23.4px (**1.8**) | `#909090` | 日付・件数 |
| Caption (bold) | 13px | 700 | 23.4px (**1.8**) | `#3f3f3f` | 強調した補足 |
| Chip / Badge | 12px | 400 | 21.6px (**1.8**) | `#fff` on `#007bbb` | `New!` 等 |
| Badge (bold) | 12px | 700 | 18px (**1.5**) | `#00507a` on `#e6f2f8` | 「人気アイテム」 |
| Nav item | 14px | 700 | 48px | `#3a3e40` | カテゴリナビ（`nav.category-navigation`） |
| Icon | 16 / 24 / 25 / 32px | 400 | 1.0 | — | `"Nachiguro Icons"` |

CSS 上の `font-size` は `1.5rem`（24px、425 回・主にアイコン）／`1rem`（16px、306 回）／`.875rem`（14px、39 回）／`1.125rem`（18px、34 回）／`.75rem`（12px、32 回）／`1.3125rem`（21px、23 回）。

### 3.5 行間・字間

- **本文の行間**: **1.8**（16px → 28.8px）。日本語本文としてかなり広い部類
- **見出しの行間**: **1.5 前後**（26px → 40px ＝ 1.54、21px → 32px ＝ 1.52）
- **ボタン・リスト内**: **1.5**（24px 固定）。CSS 中 `line-height: 1.5rem` が **96 回**で最頻
- **字間**: **全要素 `normal`**。CSS 中の `letter-spacing` 宣言 21 個がすべて `normal`。**日本語でも字間を触らない**

### 3.6 禁則処理・改行ルール

```css
word-break: break-all;
overflow-wrap: break-word;
line-break: strict;
```

- **ボタンは `white-space: nowrap` ＋ `text-overflow: ellipsis`**（`.ncgr-button` の既定）。ラベルが長いと折り返さずに省略される。**日本語ラベルは 8 文字前後に収める**
- 作品タイトルはユーザー入力なので、カード内では 1〜2 行で省略する前提で組む

### 3.7 OpenType 機能

```css
/* 宣言なし = font-feature-settings: normal */
```

- **`palt` を使わない**。CSS 全体に `font-feature-settings` の宣言が 1 つも無い
- 字間も `normal` のままなので、**和文の詰めは一切行わない**

### 3.8 縦書き

該当なし。

---

## 4. Component Stylings

### Buttons（`.ncgr-button`）

**共通の骨格**

```css
.ncgr-button {
  display: inline-flex; justify-content: center; align-items: center;
  gap: .25rem;                 /* アイコンとラベルの間 */
  height: 2.5rem;              /* 40px 固定 */
  padding: 0;                  /* 高さで決め、上下 padding を持たない */
  border-radius: .5rem;        /* 8px */
  font-size: 1rem;             /* 16px */
  font-weight: 400;            /* ← Regular */
  line-height: 1.5rem;         /* 24px */
  white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
  box-shadow: 0 -.1px 1px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.12),
              0 0 transparent, 0 0 rgba(255,255,255,.5),
              0 -2px rgba(0,0,0,.24);   /* 最後の 1 本が下辺の押し込み */
}
```

**Primary（自分用につくる / 詳しく見る / この条件で絞り込む）**
- Fill: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), linear-gradient(#067bbf, #067bbf)`
  — ＝ 見た目は `#067bbf` の単色。**`background-color` は透明**
- Text: `#ffffff` ／ Border: `1px solid rgba(0,0,0,0)`（透明の 1px。塗りと枠線で高さを揃えるため）
- Border Radius: `8px`

**Secondary / Outline（ショップで販売する / カラー絞り込み / 人気順）**
- Fill: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), linear-gradient(#ffffff, #ffffff)` ＝ 白
- Text: `#63686b` ／ Border: **`1px solid rgba(57,60,65,0.2)`**（`#393c41` の 20%）
- Border Radius: `8px`

**Ghost（ログイン / お問い合わせ・ご相談 / 条件をクリア）**
- Fill: 完全に透明（`linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0))` の二重）
- Text: `#63686b`（`条件をクリア` は `#067bbf`）／ Border: `1px solid rgba(0,0,0,0)`

**Segmented（ヘッダーの「自分用につくる／ショップで販売する」）**
- Background: `#dfdfdf`（`--color-segmented-control-background` は `#d0d0d0`）
- Text: `#3f3f3f` ／ Border Radius: `8px` ／ 14px / 400

**Campaign（法人ノベルティをつくる）**
- Fill: `linear-gradient(#2058e5, #2058e5)` ／ Text: `#ffffff` ／ Radius `8px`
- **Nachiguro の色ではなく SUZURI 独自**

**Hover（全バリアント共通）**
```css
background-image: linear-gradient(rgba(255,255,255,.08), rgba(255,255,255,.08)),
                  /* …元の面 … */;
```
**色を差し替えず、白 8% を 1 枚重ねる。**

### Chips / Badges

| 種別 | 面 | 文字 | Radius | Padding | Size |
|------|----|------|--------|---------|------|
| `New!` | `#007bbb` | `#ffffff` | **`500px`（ピル）** | `4px 8px` | 12px / 400 |
| 人気アイテム | `#e6f2f8` | `#00507a` | **`0px`（角）** | `4px 8px` | 12px / 700 |
| チャットで探す | `#3f3f3f` | `#ffffff` | `20px` | `6px 12px 6px 8px` | 13px / 600 |

### Ranking Medals

| 順位 | 面 | 文字 | Radius | Size |
|------|----|------|--------|------|
| 1 位 | **`#fbca4d`**（金） | `#ffffff` | `32px` | 14px / 700 |
| 2 位 | **`#b0b0b0`**（銀） | `#ffffff` | `32px` | 14px / 700 |
| 3 位 | **`#ce4216`**（銅） | `#ffffff` | `32px` | 14px / 700 |
| 4 位〜 | `#ffffff` | `#3f3f3f` | `32px` ＋ `1px solid #d0d0d0` | 14px / 700 |

### Floating Action Button

- Background: `#2058e5` ／ Border: **`3px solid #ffffff`** ／ Border Radius: `800px`
- 右下固定。白い太枠でコンテンツから浮かせる

### Inputs

- Background: `#ffffff`（`--color-textfield-background`）
- 検索バーの面: `#dfdfdf`（`--color-search-bar-background`）
- Placeholder: `rgba(0,0,0,0.2)`（`--color-placeholder-text`）
- Font Size: 14px / 16px、`line-height: normal`

### Cards

- Background: `#ffffff` ／ Border Radius: `8px`
- 一覧の地は `#f7f7f7`、セクションの面は `#efefef`
- 区切り線: `#dfdfdf`（`--color-separator`）

---

## 5. Layout Principles

### Radius Scale

| Value | px | 出現 | 用途 |
|-------|----|------|------|
| `.5rem` | **8px** | **322 回** | **ボタン・カード・入力欄・チップ。既定** |
| `1.25rem` | 20px | 104 回 | 大きめのブロック |
| `1rem` | 16px | 53 回 | 中サイズ |
| `1.75rem` | 28px | 52 回 | 丸め強め |
| `1.5rem` | 24px | 52 回 | 丸め強め |
| `.75rem` | 12px | 52 回 | 小さめ |
| `.25rem` | 4px | 12 回 | 最小 |
| `0` | — | 17 回 | 角バッジ |

### Sizing

| 用途 | 値 |
|------|-----|
| ボタン高 | `2.5rem`（40px） |
| 大ボタン高 | `3.5rem`（56px） |
| 中ボタン高 | `3rem`（48px） |
| 小要素 | `2rem`（32px） / `1.5rem`（24px） |
| アイコン間の gap | `.25rem`（4px） |

### Breakpoints（`nachiguro.css` の実出現）

| Query | 出現 |
|-------|------|
| `max-width: 768px` | 22 回 |
| `min-width: 1280px` | 21 回 |
| `min-width: 720px` | 16 回 |
| `min-width: 540px` | 16 回 |
| `max-width: 480px` | 14 回 |
| `min-width: 768px` | 5 回 |

**540 / 720 / 768 / 1280 の 4 段**でグリッドを組み替える。商品グリッドは幅に応じて 2 → 4 → 7〜8 列。

---

## 6. Depth & Elevation

| Level | Shadow | 出現 | 用途 |
|-------|--------|------|------|
| 0 | `none` | 1160 回 | 既定 |
| — | `inherit` | 1050 回 | 継承 |
| 1 | `0 -.1px 1px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.12), 0 0 transparent` | **420 回** | **ボタンの既定**。ごく薄い |
| 1' | `… , 0 0 rgba(255,255,255,.5), 0 -2px rgba(0,0,0,.24)` | 308 回 | 上に**下辺 2px の押し込み**を足したもの |
| 2 | `inset 0 -2px rgba(0,0,0,.24)` | 308 回 | 押された状態 |
| 3 | `rgba(0,0,0,0.14) 0 2px 2px …` | — | カルーセルの矢印ボタン |

**深さは「浮かせる」ではなく「縁を作る」ために使う。** `0 -2px rgba(0,0,0,.24)` が下辺だけを暗くし、物理的なボタンの厚みを表現する。

---

## 7. Do's and Don'ts

### Do（推奨）

- **radius は 8px**。ボタンもカードも入力欄もチップも同じ 8px で揃える
- **面は `linear-gradient(色, 色)` の二重指定で塗る**（Nachiguro の作法。ホバーで白 8% を重ねられる）
- **ホバーは色を変えず `rgba(255,255,255,.08)` を 1 枚重ねる**
- ボタンには **`0 -2px rgba(0,0,0,.24)`** の下辺だけの影を入れて厚みを出す
- **ボタンのラベルは `font-weight: 400`**。太字にしない
- **本文は `line-height: 1.8`**、リスト・ボタン内は **1.5（24px 固定）**
- **`letter-spacing` は `normal`**、**`palt` は off**
- テキストは `#3f3f3f`（本文）／`#393c41`（見出し）／`#63686b`（枠線ボタンのラベル）／`#909090`（補助）で使い分ける
- ランキングは **金 `#fbca4d` / 銀 `#b0b0b0` / 銅 `#ce4216`**、4 位以降は白地に `#d0d0d0` の枠

### Don't（禁止）

- **`--color-primary-500`（`#007bbb`）をボタンの面に使わない**。実装は `#067bbf`
- **`--color-danger-500`（`#e83929`）をいいねの色に使わない**。実装は `#bf2213`
- **`background-color` だけで面色を判定しない**（二重グラデーションで塗られており、`background-color` は透明）
- **ボタンのラベルを長くしない**。`white-space: nowrap` ＋ `ellipsis` なので折り返さず切れる
- **字間・`palt` を触らない**
- **GMO グループの帯（`#30f4c5`）とグループフッター（`#005bac`）を SUZURI の色として扱わない**
- 主 CTA を太字にしない（Nachiguro のボタンは 400）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Small Mobile | ≤ 480px | 商品グリッド 2 列 |
| Mobile | ≤ 768px | ヘッダーのセグメントを畳む |
| Tablet | ≥ 540px / ≥ 720px | グリッド 3〜4 列 |
| Desktop | ≥ 768px | 通常レイアウト |
| Wide | ≥ 1280px | 商品グリッド 7〜8 列 |

### タッチターゲット

- ボタン高は **40px**（`2.5rem`）。44px 未満なので、**モバイルでは `3rem`（48px）または `3.5rem`（56px）の modifier を使う**

### フォントサイズの調整

- 本文 16px は据え置き。見出し 26px は 21px 相当へ縮める

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Primary Color: #067bbf       （トークンの #007bbb ではない）
Accent (like): #bf2213
Text Color:    #3f3f3f       （見出しは #393c41 / 枠線ボタンは #63686b）
Background:    #ffffff       （面 #efefef / 一覧の地 #f7f7f7 / 区切り #dfdfdf）
Font:          "Open Sans", "Noto Sans JP", apple-system, "system-ui",
               Roboto, "Lucida Grande", Helvetica, Arial, sans-serif
Body Size:     16px / line-height 1.8
Button:        height 40px / radius 8px / 16px / weight 400 / padding 0
Radius:        8px（ほぼ全部）
Shadow:        0 -.1px 1px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.12),
               0 -2px rgba(0,0,0,.24)
letter-spacing: normal ／ palt: off
```

### プロンプト例

```
SUZURI（Nachiguro デザインシステム）に従って、商品一覧のフィルタバーを作成してください。
- 主ボタン「この条件で絞り込む」は面 #067bbf・白文字・radius 8px・高さ 40px・16px/400
  面は background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0)),
  linear-gradient(#067bbf,#067bbf) の二重グラデーションで塗る
- 絞り込みチップ（カラー / サイズ / 人気順）は白地・文字 #63686b・
  border: 1px solid rgba(57,60,65,0.2)・radius 8px
- 「条件をクリア」は面を持たないゴーストボタン（文字 #067bbf）
- ホバーは色を変えず linear-gradient(rgba(255,255,255,.08), rgba(255,255,255,.08)) を重ねる
- ボタンには box-shadow: 0 -.1px 1px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.12),
  0 -2px rgba(0,0,0,.24) を付ける
- フォントは "Open Sans", "Noto Sans JP", apple-system, ... 本文 16px / line-height 1.8
- letter-spacing は normal、font-feature-settings は指定しない
```
