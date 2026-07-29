# DESIGN.md — 十和田市現代美術館（Towada Art Center）

> 十和田市現代美術館（https://towadaartcenter.com/）のデザイン仕様書。
> 2008 年開館、青森県十和田市。西沢立衛による「白いキューブの集合体」の建築で知られ、館内外に常設展示されたコミッションワークと、官庁街通りを含む「Arts Towada」構想全体をひとつのブランドとして運用している。
> 最大の特徴は、**ページ全体をスカイブルー `#53c1e4` の 12px の枠で囲む**こと。ヘッダーもフッターもコンテンツも、この枠の内側に収まる。ブラウザのビューポートそのものを「展示室の額縁」に見立てた設計で、日本の美術館サイトでは珍しい。
> 和文は Adobe Fonts の **A-OTF 中ゴシック BBB Pr6N**、欧文は **Plain**（Optimo）。`font-feature-settings: "palt"` を**サイト全域**に効かせ、`letter-spacing` は全域 `normal` に据え置く。
> 実サイトの computed style 実測（2026-07-29 取得。トップ＋企画展一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **青空と白い建築**。館の代表的な写真（快晴の空を背にした白いキューブ群）から色を引き、UI をスカイブルー 1 色と無彩色だけで組む。作品写真が持ち込む色は枠の内側に閉じ込め、枠自体は常に同じ青で固定する
- **十和田市現代美術館について**: 屋外にも作品が点在する「まちに開かれた美術館」であり、**「今日開いているか」がサイトの最重要情報**。そのためヘッダー最上段に開館状況バッジ（`7月29日(水) ◎ 本日開館 9:00 - 17:00`）を常設し、開館時はコーラル `#ff7e74` のベタ面で示す
- **密度**: 中密度。トップは全画面のヒーロースライダー → スケジュール → 企画展 → イベントと縦に積む。フォントサイズが 12 / 14.4 / 16.8 / 21.6 / 31.2px と細かく刻まれており、階層は太さではなくサイズで作る
- **キーワード**: スカイブルーの 12px 額縁、Plain ＋ 中ゴシック BBB、`palt` 全域、ウェイトは 400 一本、角丸 0、コーラルの開館バッジ
- **特徴**:
  - **`font-weight` がサイト全域で 400**。見出しも本文もナビもすべて同じ太さで、階層はサイズと色だけで作る。中ゴシック BBB のふところが広く、31.2px でも 400 で十分な存在感が出るためこの設計が成立する
  - **`font-feature-settings: "palt"` が全域**。MOT のように見出しと本文で切り替えるのではなく、body から一律に掛かる
  - **`letter-spacing` は全域 `normal`**。詰めは `palt` だけに任せる
  - **角丸は 0px、影は none**。ナビは縦罫で区切り、面は塗るか塗らないかの 2 択
  - 色は **スカイブルー `#53c1e4`（枠・ナビ現在地・ページトップ）／ ペールブルー `#c1e9f5`（ヒーロー地・フッター）／ コーラル `#ff7e74`（開館バッジ）／ グレー `#565656`（本文）** の 4 色で足りる
  - 多言語 5 種（Ja / En / Cn / Tw / Ko）をヘッダーに横並びで置き、現在言語だけスカイブルーのベタで反転する

---

## 2. Color Palette & Roles

> 実測値。ページ地色は白 `#ffffff`、本文はグレー `#565656`（純黒ではない）。有彩色はスカイブルー系 2 段とコーラル 1 色のみ。

### Brand（ブランド）

- **Towada Sky** (`#53c1e4`, rgb 83,193,228): **サイトの象徴色**。ページ全体を囲む 12px の枠、ナビの現在地、言語切替のアクティブ、フッターの「ページトップ」に使う。十和田の空の青
- **Towada Sky Pale** (`#c1e9f5`, rgb 193,233,245): ヒーロースライダーの地色とフッター全体の面色。Towada Sky を明度側に振った同系色。**上部ビューポートで最大面積を占める色**（実測 1,296,000px² ＝ 1440×900 全面）
- **Coral** (`#ff7e74`, rgb 255,126,116): **開館状況バッジ専用**。「本日開館」を示す唯一の暖色で、青一色の画面の中で真っ先に目に入る位置（ヘッダー左上）に置かれる

### Surface（面）

- **Background** (`#ffffff`): ページ地色。下層ページは全面白
- **Gray 50** (`#f1f1f1`, rgb 241,241,241): カード画像のプレースホルダ面・一覧のサムネイル枠
- **Gray 100** (`#ededed`, rgb 237,237,237): セクション区切りの薄面

### Neutral（文字・罫）

- **Text Primary** (`#565656`, rgb 86,86,86): **本文・見出しの基本色**。純黒を使わず、やや退いたグレーで組む。白地＋写真の多い画面で文字が硬く出過ぎないようにする選択
- **Text on Brand** (`#ffffff`): スカイブルー面・コーラル面の上の文字
- **Border**: ナビの区切りは罫線ではなく**セル間の余白と背景の切り替え**で作る。明示的な border は `#ededed` 相当

### Semantic（意味的な色）

- **Open（開館中）**: `#ff7e74` ベタ ＋ 白文字 ＋ `◎` 記号。**色記号（◎ / ×）を必ず併記する**
- **Closed（休館日）**: 同じバッジの面色をグレー `#565656` に落とし、記号を `×` に替える
- Info / Danger など汎用の意味色は持たない。必要な場合はコーラルを流用せず、文字色と 1px 罫に留める

---

## 3. Typography Rules

> **和文 A-OTF 中ゴシック BBB Pr6N ＋ 欧文 Plain**。`palt` が全域、`letter-spacing` は全域 `normal`、`font-weight` は全域 400。行間は本文 1.64、見出し 1.35 前後。

### 3.1 和文フォント

- **ゴシック体**: **A-OTF 中ゴシック BBB Pr6N**（`a-otf-gothic-bbb-pr6n`）。写研由来のモリサワ定番書体で、Adobe Fonts 経由で配信されている。**この 1 書体・1 ウェイトだけ**で全ページを組む
- 中ゴシック BBB は本来「中」ウェイトのみの単一ウェイト書体であり、**サイト全域が `font-weight: 400` なのはこの書体の設計に忠実に従った結果**。太字表現が必要な箇所は太らせずに文字サイズで対応する
- フォールバックは `-apple-system` → `system-ui` → `Helvetica Neue` → `Yu Gothic` → `YuGothic` → `Verdana` → `Meiryo` → `M+ 1p` → `sans-serif`
- 明朝体は UI に使わない

### 3.2 欧文フォント

- **サンセリフ**: **Plain**（Optimo、François Rappo）。グロテスク系のスイス書体で、館名英字「Towada Art Center」やナビの `Ja / En / Cn / Tw / Ko`、`𝕏` などの記号に当たる
- **Plain が和文より先頭**。欧文グリフは Plain、和文は自動的に中ゴシック BBB に落ちる古典的な和欧分離
- **preview.html での注記**: `Plain` は Optimo、`a-otf-gothic-bbb-pr6n` は Adobe Fonts のライセンスフォントで、いずれもローカルの preview.html では表示できない。プレビューでは欧文に **Archivo**、和文に **Shippori Antique B1** ではなく **Zen Kaku Gothic Antique** を代替として用いる。Zen Kaku Gothic Antique は中ゴシック BBB と同じく「線幅が均一で、かなのふところがやや狭い」古典的ゴシックの性格を持ち、単一ウェイト運用時の印象が近い。実装時は必ず Plain と A-OTF 中ゴシック BBB Pr6N を読み込むこと

### 3.3 font-family 指定

```css
/* サイト全域で共通 */
font-family: Plain, a-otf-gothic-bbb-pr6n, -apple-system, "system-ui",
  "Helvetica Neue", "Yu Gothic", YuGothic, Verdana, Meiryo, "M+ 1p", sans-serif;
font-feature-settings: "palt";
font-weight: 400;
letter-spacing: normal;
```

**フォールバックの考え方**:
- **欧文 Plain が先頭、和文 中ゴシック BBB が 2 番目**。以降は OS フォント
- **`Yu Gothic` と `YuGothic` を両方書く**。Windows（`Yu Gothic`）と macOS（`YuGothic`）でフォント名が異なるための保険
- **`M+ 1p` を最後段に置く**のは Linux / Android 環境向けの明示的な指定。5 言語対応サイトとして、CJK が確実に表示されるチェーンを組んでいる

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Title | 中ゴ BBB | 31.2px | **400** | 1.35 (42px) | normal | `h2`「スケジュール」「開催中・今後の企画展」 |
| Exhibition Title | 中ゴ BBB | 21.6px | **400** | 1.39 (30px) | normal | `h3.textsize-medium` 展覧会名 |
| Symbol / Icon | Plain | 22.67px | **400** | 1.59 (36px) | normal | `𝕏` などヘッダーの記号 |
| Body / Sub Title | 中ゴ BBB | 16.8px | **400** | **1.64** (27.6px) | normal | `body` 既定。`h3` の小サイズも同値 |
| Nav Item | 中ゴ BBB | 14.4px | **400** | 1.2 (17.28px) | normal | グローバルナビ。padding `0 14.4px` |
| Lang Switch | Plain | 14.4px | **400** | 2.5 (36px) | normal | `Ja / En / Cn / Tw / Ko` |
| Meta / Badge | 中ゴ BBB | 12px | **400** | 3.0 (36px) | normal | 開館バッジ・住所。padding `0 12px` |

- **ウェイトは 400 のみ**。太字は使わない
- **サイズが 1.2 倍刻み**（12 → 14.4 → 16.8 → 21.6 → 31.2）。`0.75rem × 1.2^n` に相当する等比階層で、`14.4px` `16.8px` `21.6px` `31.2px` という半端な実測値はこの掛け算から出ている

### 3.5 行間・字間

- **行間 (line-height)**: **本文 1.64**（16.8px → 27.6px）、**見出し 1.35〜1.39**（31.2 → 42、21.6 → 30）。日本語本文としては標準的で、大きい文字ほど比率を下げる素直な設計
- **バッジ・ナビの行送りは行間ではなく「高さ」**。12px に対する `line-height: 36px`（3.0）は、バッジの高さを 36px に固定するための指定であって読み物の行送りではない。**この値を本文に流用しないこと**
- **字間 (letter-spacing)**: **全域 `normal`**。1 箇所の例外もない
- **詰めは `palt` が全部担当する**。中ゴシック BBB は仮想ボディいっぱいに字面が入る設計なので、`palt` を掛けるだけで括弧・句読点の空きが締まる

**ガイドライン**:
- 本文は 16.8px / 1.64 を基準にする。読み物ページで 3 行以上続く場合も 1.64 で足りる
- 見出しを大きくするときは行間比を下げる（31.2px なら 1.35）
- **`letter-spacing` を足さない**。中ゴシック BBB に字間を開くと写研由来の均質な字面が崩れる

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 展覧会名・作家名（例:「椿昇 フリーダムー像(ゾウ)と生きる」）は改行位置が意味を壊す。`<wbr>` または `<br>` で明示する
- 5 言語で同じレイアウトを共有するため、**中国語・韓国語でも破綻しない幅**を前提にコンテナを設計する

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* サイト全域 */
```

- **`palt`（プロポーショナル字詰め）がグローバル**。見出しと本文で切り替えない
- **`lnum` は使っていない**。日付・時刻は「7月29日(水) 9:00 - 17:00」のように和文の中に埋めるため、中ゴシック BBB の既定数字をそのまま使う
- ライブラリ由来の要素（Flickity のボタン、PhotoSwipe のクローズボタン）だけ `font-feature-settings: normal` に戻る。**これは実装漏れではなくライブラリの既定値**なので、自作 UI では `palt` を継承させること

### 3.8 縦書き

- 該当なし。UI・展覧会情報とも横組み
- 展覧会キービジュアル内の縦組みは画像として扱う。CSS の `writing-mode` は使っていない

---

## 4. Component Stylings

### Frame（額縁）— 十和田で最も特徴的な要素

```css
/* body 直下に 4 本の span を置き、ページ全体を囲む */
.frame-top    { position: absolute; top: 0; left: 0; right: 0;  height: 12px; z-index: 9; background: #53c1e4; }
.frame-left   { position: fixed;    top: 0; left: 0;  width: 12px; height: 150vh; z-index: 9; background: #53c1e4; }
.frame-right  { position: fixed;    top: 0; right: 0; width: 12px; height: 150vh; z-index: 9; background: #53c1e4; }
.frame-bottom { position: fixed;    bottom: 0; left: 0; right: 0; height: 12px; z-index: 9; background: #53c1e4; }
```

- **幅は 12px 固定**。左右・下は `position: fixed` でスクロールしても残り、上だけ `absolute` でページと一緒に動く
- `z-index: 9` でヘッダー（固定ナビ）より前面に置く
- **コンテンツは枠の内側に収める**。`body` に `padding: 12px` は入れず、各セクション側で左右 12px 以上の余白を確保する

### Buttons

**Primary（スカイブルー・ベタ・角丸 0）**
- Background: `#53c1e4`
- Text: `#ffffff`
- Padding: `0 12px`（高さは `line-height` で決める）
- Border Radius: **`0px`**
- Font: 14.4〜16.8px / weight 400 / `palt`
- 例: ナビ現在地、言語切替のアクティブ、フッター「ページトップ」

**Text Link（下線なし・グレー）**
- Background: `transparent`
- Text: `#565656`
- Border Radius: `0px`
- Font: 14.4〜16.8px / weight 400
- **十和田は一覧リンクをボタン化しない**。文字リンクを縦に積み、ホバーでスカイブルーに変える

### Status Badge（開館状況）

- Background: `#ff7e74`（開館）／ `#565656`（休館）
- Text: `#ffffff`
- Padding: `0 12px`
- Height: 36px（`font-size: 12px` × `line-height: 36px`）
- Border Radius: **`0px`**
- 中身: `7月29日(水) ◎ 本日開館 9:00 - 17:00`
- **記号（◎ / ×）を必ず文言に含める**。色だけで開閉を示さない

### Language Switcher

- 5 言語（`Ja` `En` `Cn` `Tw` `Ko`）を横並びのセルで置く
- アクティブ: `#53c1e4` ベタ ＋ 白文字、非アクティブ: 透明 ＋ `#565656`
- Padding: `0 12px` / Font: Plain 14.4px / Border Radius: `0px`
- ヒーロー上（白文字で反転する領域）では非アクティブも白文字になる

### Global Nav

- 項目: `ご利用案内` / `美術館について` / `コレクション` / `企画展・プロジェクト` / `イベント` / `ラーニング・支援`
- Font: 14.4px / weight 400 / `line-height: 17.28px`
- Padding: `0 14.4px` / セル高さ 48px
- 現在地は `#53c1e4` ベタで反転（`.is-current`）
- **ドロップダウンは面色ではなく白背景 ＋ 余白**で開く

### Cards（展覧会・イベント）

- Background: `#ffffff`（画像枠のプレースホルダは `#f1f1f1`）
- Border: なし
- Border Radius: **`0px`**（画像も角を落とさない）
- 構成: 画像 → 展覧会名（21.6px / 400）→ 会期（16.8px / 400）
- Shadow: なし

### Hero Slider

- Background: `#c1e9f5`（画像読み込み前もこの色が見える）
- ライブラリ: Flickity。ページャは丸ドット、アクティブは塗り
- **画像は全画面ブリード**。枠の 12px だけを残して端まで使う
- 画像上のテキストは白 ＋ `text-shadow` なしで、暗部にのみ配置する

---

## 5. Layout Principles

### Spacing Scale

| Token | Value |
|-------|-------|
| Frame | 12px |
| XS | 12px |
| S | 14.4px |
| M | 24px |
| L | 36px |
| XL | 48px |
| XXL | 72px |

- 実測のパディングは `12px` / `14.4px` に集中する。**タイポの 1.2 倍階層（12 × 1.2 = 14.4）が余白側にも効いている**

### Container

- Max Width: **ビューポート全幅**。固定の最大幅を持たない
- 左右の実効パディング: 12px（枠）＋ セクション側の余白
- ヒーロー・展覧会画像は全幅ブリード、テキストブロックは内側に寄せる

### Grid

- Columns: 展覧会・イベントのサムネイルは 3〜4 カラム
- Gutter: 24px
- **トップは「全幅のヒーロー」→「スケジュール（横スクロール）」→「カードグリッド」の 3 層**

---

## 6. Depth & Elevation

実測ではほぼ全要素が `box-shadow: none`。**十和田は影を使わず、面色と `z-index` だけで階層を作る**。

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | none | 既定。本文・カード・画像 |
| 1 | none（面色差） | `#ffffff` × `#f1f1f1` × `#ededed` の面の差で分離 |
| 2 | none（`z-index: 9`） | **スカイブルーの額縁**。最前面に固定される |
| 3 | `rgba(255,255,255,0.2)` の半透明面 | ヒーロー上の操作要素（画像を透かしつつ触れることを示す） |

- **奥行きは「白 → `#f1f1f1` → `#c1e9f5` → `#53c1e4`」の 4 段の面**で表現する
- モーダル（PhotoSwipe の画像拡大）だけ黒の暗幕を使うが、これはライブラリ既定

---

## 7. Do's and Don'ts

### Do（推奨）

- **ページ全体を `#53c1e4` の 12px の枠で囲む**。左右・下は `position: fixed`、上は `absolute`、`z-index: 9`
- 和文は A-OTF 中ゴシック BBB Pr6N、欧文は Plain。**font-family は欧文を先頭に置く**
- **`font-weight` は 400 に統一する**。階層はサイズだけで作る
- **`font-feature-settings: "palt"` を body から全域に効かせる**（見出しと本文で切り替えない）
- `letter-spacing` は全域 `normal` にする
- 文字サイズは **1.2 倍の等比階層**（12 / 14.4 / 16.8 / 21.6 / 31.2px）から選ぶ
- 本文色は純黒ではなく **`#565656`** を使う
- 開館状況をヘッダー最上段に常設し、**開館時はコーラル `#ff7e74`、記号 `◎` / `×` を文言に含める**
- 角丸は 0px、影は none。面は塗るか塗らないかの 2 択にする
- 多言語切替（Ja / En / Cn / Tw / Ko）を横並びで置き、現在言語だけ `#53c1e4` で反転する

### Don't（禁止）

- **枠の色をコンテンツに合わせて変えない**。`#53c1e4` は常に固定で、これが館のアイデンティティ
- **`font-weight: 700` を使わない**。中ゴシック BBB は単一ウェイト書体であり、太らせると合成ボールドで字面が潰れる
- **バッジ・ナビの `line-height`（36px / 17.28px）を本文に流用しない**。あれは高さ指定であって行送りではない。本文は必ず **1.64** を使う
- `letter-spacing` を独自に足さない。全域 `normal` が中ゴシック BBB の字面の前提
- 角丸を付けない。**カード・画像・ボタン・バッジすべて 0px**
- 影を落とさない。階層は面色と `z-index` で作る
- コーラル `#ff7e74` を開館バッジ以外に使わない。**唯一の暖色であることに意味がある**
- 開閉状態を色だけで示さない（`◎` / `×` を必ず併記する）
- ライブラリ既定の `font-feature-settings: normal` を自作 UI にコピーしない。`palt` を継承させる

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。ナビはハンバーガー。**枠は 12px のまま維持する** |
| Tablet | 768–1024px | 2 カラム。ヒーローは高さを縮めて全幅維持 |
| Desktop | > 1024px | 3〜4 カラム＋全幅ヒーロー |

- **枠の 12px はブレークポイントに関わらず変えない**。狭い画面ほど枠の存在感が増すが、それがこのサイトの意図

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- ナビセル高さ 48px、バッジ高さ 36px。**バッジは 36px なので、タップ可能にする場合は上下の余白で 44px を確保する**

### フォントサイズの調整

- 本文 16.8px は据え置き。ナビ 14.4px も維持する
- Section Title 31.2px → モバイルでは 21.6px（1 段下の階層値）に落とす。**1.2 倍階層の中から選ぶことでリズムが崩れない**
- 5 言語切替はモバイルではドロップダウンに畳む

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Frame:          #53c1e4  12px（上 absolute / 左右下 fixed / z-index 9）
Background:     #ffffff
Text:           #565656  （純黒ではない）
Brand:          #53c1e4  （Towada Sky）
Brand Pale:     #c1e9f5  （ヒーロー地・フッター）
Accent:         #ff7e74  （開館バッジ専用。唯一の暖色）
Gray:           #f1f1f1 / #ededed
JP Font:        a-otf-gothic-bbb-pr6n, "Yu Gothic", YuGothic, Meiryo, "M+ 1p", sans-serif
Latin Font:     Plain, -apple-system, "system-ui", "Helvetica Neue", Verdana（和文より先頭）
Body Size:      16.8px / weight 400
Weight:         400（全域。700 を使わない）
Size Scale:     12 / 14.4 / 16.8 / 21.6 / 31.2px（1.2 倍の等比）
Line Height:    1.64（本文） / 1.35〜1.39（見出し）
Letter Spacing: normal（全域）
Feature:        "palt"（全域。見出し／本文で切り替えない）
Radius:         0px（全要素）
Shadow:         none
```

### プロンプト例

```
十和田市現代美術館のデザインシステムに従って、企画展一覧ページを作成してください。
- ページ全体をスカイブルー #53c1e4 の 12px の枠で囲む。
  上辺は position:absolute、左右と下辺は position:fixed、いずれも z-index:9
- 欧文は Plain（無ければ Archivo / sans-serif）を font-family の先頭に置き、
  和文は A-OTF 中ゴシック BBB Pr6N（無ければ Zen Kaku Gothic Antique）に落とす
- font-feature-settings: "palt" を body から全域に効かせる
- font-weight は全域 400。太字は使わず、サイズだけで階層を作る
- 文字サイズは 12 / 14.4 / 16.8 / 21.6 / 31.2px の 1.2 倍等比階層から選ぶ
- letter-spacing は全域 normal
- line-height は本文 1.64、見出し 1.35。ただしバッジやナビの高さ指定
  （12px に対する 36px 等）を本文に流用しない
- 地は白 #ffffff、本文は純黒ではなく #565656
- ヒーローとフッターの面色はペールブルー #c1e9f5
- ヘッダー最上段に開館状況バッジを常設する。開館時はコーラル #ff7e74 ベタ・白文字・
  角丸 0px・padding 0 12px・高さ 36px で「7月29日(水) ◎ 本日開館 9:00 - 17:00」と表示し、
  休館時は面色を #565656、記号を × に替える（色だけで状態を示さない）
- グローバルナビの現在地は #53c1e4 ベタ・白文字で反転させる
- 言語切替（Ja / En / Cn / Tw / Ko）を横並びで置き、現在言語だけ #53c1e4 で反転する
- 角丸は全要素 0px、box-shadow は none。階層は面色と z-index で作る
```
