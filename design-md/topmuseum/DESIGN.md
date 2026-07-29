# DESIGN.md — 東京都写真美術館（TOP MUSEUM / Tokyo Photographic Art Museum）

> 東京都写真美術館（https://topmuseum.jp/）のデザイン仕様書。
> 1995 年開館、東京・恵比寿ガーデンプレイス。写真と映像を専門とする日本初の公立美術館で、通称「TOP MUSEUM」。
> 最大の特徴は、**UI から色をほぼ完全に抜く**こと。白地・黒文字・グレー 6 段だけで組み、写真作品と展覧会ポスターだけが色を持つ。**写真美術館としての「地は白、額は黒 1px」という原則**を CSS レベルで徹底している。
> 和文は **游ゴシック体 Pr6N（M / D）**、欧文は **Univers Next W04**（Light / Regular）。`letter-spacing` が**全域 −0.05em**という、日本語サイトとしてはかなり詰めた字間を採る。`font-feature-settings: "palt"` も全域。
> もうひとつの要点は、**ヘッダーに常設されたアクセシビリティ切替**（配色 `青 / 黒 / 黄`、文字サイズ `大 / 小`）。公立館としての責務が UI の一等地に置かれている。
> `html { font-size: 10px }` を基準に **`--s0` 〜 `--s19` の 0.5em 刻みスペーシング**、**`--k` / `--g1〜g6` / `--c1〜c6` の色**、**`--fzS/--fz/--fzM/--fzL`**、**`--lhS/--lh/--lhL`** という 101 個の CSS Custom Properties でトークン化されている。
> 実サイトの computed style 実測（2026-07-29 取得。トップ＋展覧会一覧）に基づく。

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **写真が唯一の色。UI は白と黒 1px の額。** 面色・角丸・影を持たず、区切りは 1px または 2px の黒罫だけで作る。展覧会ポスターを原寸に近い大きさで白地に置く構成は、写真集の見開きに近い
- **TOP MUSEUM について**: 東京都の美術館として、**開館状況・観覧料・アクセシビリティが一等地に置かれる**。ヘッダーには「本日は開館しております(10:00−18:00)」のステータスに加え、**配色切替（青 / 黒 / 黄）と文字サイズ切替（大 / 小）**が常設される。これは装飾ではなく機能で、色を抜いた UI が成立している理由でもある（配色を差し替えても壊れない）
- **密度**: 低〜中密度。1130px のコンテナに 1 カラムのブロックを縦に積む。余白が大きく、展覧会ビジュアルの周囲は必ず白で抜く
- **キーワード**: 白地、純黒、Univers Next ＋ 游ゴシック Pr6N、**ls −0.05em 全域**、`palt` 全域、黒 2px の囲み、角丸 2px の a11y ボタン、1rem = 10px
- **特徴**:
  - **`letter-spacing: -0.05em` が全域**。10px → −0.5px、14px → −0.7px、15px → −0.75px、18px → −0.9px、20px → −1px と、実測値がすべて基準サイズ × −0.05 で揃う。**日本語サイトで全域マイナス字間は珍しく、これが TOP MUSEUM の字面を決めている**
  - **例外は 36px のセクション見出しだけ**。ここだけ `letter-spacing: 1px`（＝ +0.028em）に反転する。大きい欧文（`CURRENT` `NEWS` `CALENDAR`）を組むための正の字間
  - **セクション見出しは「欧文＋和文」の 2 段**。`CURRENT` ＋「開催中の展覧会・上映」、`ABOUT US` ＋「東京都写真美術館について」というように、Univers Next の欧文を上に、游ゴシックの和文を下に置く
  - **`html { font-size: 10px }`**。`--fz: 1.6rem` = 16px という rem 設計で、**文字サイズ切替（大 / 小）はルートの font-size を動かすだけで全体に効く**
  - `--c1` 〜 `--c6` に 6 色の有彩色トークンが定義されているが、**トップページでは 1 つも使われていない**。カテゴリ分類など下層の用途に予約されている
  - 角丸は **2px（アクセシビリティボタン）／ 4px（`--bdrs1`）／ 6px（`--bdrs2`）** の 3 段だが、実際に見えるのは 2px だけ

---

## 2. Color Palette & Roles

> 実測値。地は白 `#ffffff`、文字は純黒 `#000000`。**トップページの UI に有彩色は存在しない**。`--c1`〜`--c6` は下層用の予約トークン。

### Brand（ブランド）

- **Ink** (`#000000`): 文字・罫・囲みのすべて。**TOP MUSEUM は黒を「ブランドカラー」として使う**。ロゴタイプ `TOP MUSEUM`（Univers Next）も館名も純黒
- **Paper** (`#ffffff`): ページ地色。ヘッダー・ナビ・カード・すべての面

> **注**: CSS 変数の `--k: #111` は「ほぼ黒」のトークンだが、実際の描画色は `#000000`。**実装では純黒を使うこと**。

### Surface（面）

- **Background** (`#ffffff`): ページ地色。面色を持つブロックは存在しない
- **Gray 1** (`#f5f5f5`, `--g1`): 最も薄い面。ホバー・非活性の背景
- **Gray 2** (`#ededed`, `--g2`): 区切りブロックの面
- **Calendar Closed** (`#d9d9d9`, rgb 217,217,217): **カレンダーの休館日セル**。トップページで有彩色以外に唯一使われる面色
- **Gray 5 / 6** (`#777777` / `#666666`, `--g5` / `--g6`): 補助テキスト
- **Toolbar Active** (`#5c5c5c`, rgb 92,92,92): 文字サイズ切替のアクティブ状態（`小` が選択中のとき）

### Neutral（文字・罫）

- **Text Primary** (`#000000`): 見出し・本文
- **Text Secondary** (`#333333` / `#555555`, `--k2` / `--k3`): 補助テキスト
- **Text Tertiary** (`#212121`): テーブル（カレンダー）内の文字
- **Border** (`#cccccc` / `#aaaaaa`, `--g3` / `--g4`): 一般の罫
- **Border Strong** (`#000000`): **囲みは黒 1px または 2px**。お知らせボックスは `2px solid #000`、アクセシビリティボタンは `1px solid #000`

### Semantic（意味的な色）

| Token | Value | 用途 |
|-------|-------|------|
| `--c1` | `#1678bf` | 予約（青） |
| `--c2` | `#66caf2` | 予約（水色） |
| `--c3` | `#d8695d` | 予約（赤茶） |
| `--c4` | `#50cc85` | 予約（緑） |
| `--c5` | `#b277e0` | 予約（紫） |
| `--c6` | `#e0c332` | 予約（黄） |
| `--cCaution` | `#e20c0c` | **警告・エラー。UI で唯一の「意味を持つ有彩色」** |

- **開館状況は色ではなく記号と文言**で示す（緑の `✓` アイコン ＋「本日は開館しております(10:00−18:00)」）
- **カレンダーの休館日は面色 `#d9d9d9`** ＋ 凡例。色だけに頼らない

> **注**: `#007aff` という色が Swiper（スライダーライブラリ）のページャに出るが、これはライブラリ既定値であり **TOP MUSEUM のブランドカラーではない**。実装時に流用しないこと。

### アクセシビリティ配色（ユーザー切替）

ヘッダーの `青 / 黒 / 黄` ボタンで**ページ全体の配色を差し替える**。既定は白地・黒文字。

| Mode | 地 | 文字 | 用途 |
|------|----|----|------|
| 既定 | `#ffffff` | `#000000` | 通常閲覧 |
| 青 | 濃紺系 | 白 | 反転・低輝度 |
| 黒 | `#000000` | 白 | ハイコントラスト反転 |
| 黄 | 黄系 | 黒 | 弱視・色覚配慮 |

- **この切替が成立するのは UI に有彩色が無いから**。面色や差し色を足すと切替時に破綻する

---

## 3. Typography Rules

> **和文 游ゴシック体 Pr6N（M / D）＋ 欧文 Univers Next W04（Light / Regular）**。`letter-spacing` は**全域 −0.05em**（36px 見出しのみ +1px）、`font-feature-settings: "palt"` も全域。`html { font-size: 10px }` の rem 設計。

### 3.1 和文フォント

- **ゴシック体**: **游ゴシック体 Pr6N**。ウェイトは **M（Medium）** と **D（Demibold）** の 2 段で、Web フォント配信サービス経由（実測のフォント名は `A+EqpB-游ゴシック体 Pr6N M` / `A+EqpB-游ゴシック体 Pr6N D`。`A+EqpB-` は配信側が付与するプレフィックス）
- **`font-weight` は CSS 上ほぼ 400 のまま**。太さは `font-weight` ではなく **フォントファミリを M → D に差し替えて**表現する。**これが游ゴシックを Web で使うときの正しい作法**で、合成ボールドによる字面の潰れを避けられる
- **Windows の游ゴシック問題を Web フォント配信で回避している**。ローカルの游ゴシックに頼らないため、`@font-face` での Medium マッピングは不要
- 明朝体は UI に使わない（展覧会ポスター内の明朝は画像）

### 3.2 欧文フォント

- **サンセリフ**: **Univers Next W04**（Monotype）。`Light` と `Regular` の 2 ウェイト。Univers はスイス・グロテスクの古典で、**写真作品のキャプション書体として美術館・写真集で定番**
- **Univers Next が和文より先頭**。`TOP MUSEUM` のロゴタイプ、セクション見出しの `CURRENT` `NEWS` `CALENDAR` `EVENTS` `UPCOMING` `PICK UP` `ABOUT US`、年号・時刻がすべて Univers の字面で出る
- **本文系のフォールバック末尾が `sans-serif` ではなく `NoChattering` になっている**。実在しない／グリフを持たない名前を終端に置くことで、Web フォント未読込時に OS フォントへ落ちるのを抑える意図と読める（本 DESIGN.md は computed style の実測に基づくもので、この意図自体はサイト側の公表情報ではない）。**新規実装では真似せず、`sans-serif` で締めること**
- **preview.html での注記**: `Univers Next W04` は Monotype、游ゴシック体 Pr6N は Web フォント配信サービスのライセンスフォントで、いずれもローカルの preview.html では表示できない。プレビューでは欧文に **Archivo**、和文に **Zen Kaku Gothic New**（400 / 500）を代替として用いる。Archivo は Univers と同じグロテスク系で、Zen Kaku Gothic New は游ゴシックに近いモダンな骨格を持つ。実装時は必ず Univers Next と游ゴシック Pr6N を読み込むこと

### 3.3 font-family 指定

```css
html { font-size: 10px; }   /* 1rem = 10px。文字サイズ切替はここを動かす */

/* 本文・Light 系 */
font-family: "Univers Next W04 Light", "A+EqpB-游ゴシック体 Pr6N M", NoChattering;

/* 標準 */
font-family: "Univers Next W04 Regular", "A+EqpB-游ゴシック体 Pr6N M", sans-serif;

/* 強調（太さはファミリで切り替える） */
font-family: "Univers Next W04 Regular", "A+EqpB-游ゴシック体 Pr6N D";

/* グローバル */
letter-spacing: -0.05em;
font-feature-settings: "palt";
font-weight: 400;
```

**フォールバックの考え方**:
- **欧文 Univers Next が先頭、和文 游ゴシック Pr6N が 2 番目**。和欧の役割分担を font-family の順序だけで実現する
- **太さの切替は `font-weight` ではなくファミリ名**（`Pr6N M` ↔ `Pr6N D`）。游ゴシックの Medium / Demibold をそれぞれ実体として読み込む
- 原典はフォールバック末尾に `NoChattering` を置くパターンと `sans-serif` で締めるパターンが混在する。**新規実装では `sans-serif` で締めること**

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Section Heading | Univers + 游ゴ D | 36px | 400 | **1.0** (36px) | **+1px** | `h2.h01`。欧文＋和文の 2 段（`CURRENT` ＋「開催中の展覧会・上映」） |
| Status | 游ゴ D | 24px | 400 | 1.2 (28.8px) | −0.05em | 「本日は開館しております(10:00−18:00)」 |
| Date Display | Univers | 22px | 400 | 1.0 (22px) | −0.032em | 「2026.7.22」 |
| Sub Heading | 游ゴ M | 20px | 400 | 1.3 (26px) | −0.05em | 日付見出し「（木）」 |
| Table / Calendar | 游ゴ M | 18px | 400 | 1.0 (18px) | −0.05em | カレンダーの日付 |
| Lead | 游ゴ M | 18px | 400 | 1.6 (28.8px) | −0.05em | 「ご来館のお客様は、こちらをご確認ください。」 |
| Body | 游ゴ M | 16px (`--fz` 1.6rem) | 400 | **1.8** (`--lh`) | −0.05em | 既定の本文 |
| Body / About | 游ゴ M | 15px | 400 | 1.6 (24px) | −0.05em | 「東京都写真美術館は、…」 |
| Nav Item | 游ゴ M | 14〜15px | 400 | 1.0〜1.9 | −0.05em | グローバルナビ。padding `0 20px` |
| Caption | 游ゴ M | 12px | 400 | 1.5 (18px) | −0.05em | フッター住所 |
| Micro | 游ゴ M | 10px | 400 | 1.0 (10px) | −0.05em | 補助ラベル。1rem 基準値 |

**トークン定義**:

```css
--fzS: 1.4rem;  /* 14px */
--fz:  1.6rem;  /* 16px */
--fzM: 1.8rem;  /* 18px */
--fzL: 2rem;    /* 20px */

--lhS: 1.4;
--lh:  1.8;     /* 本文の既定 */
--lhL: 2.4;
```

- **ウェイトは CSS 上ほぼ 400 一本**。太さの階層はフォントファミリ（游ゴ M / D、Univers Light / Regular）で作る
- **`--lh: 1.8` が本文の既定**。日本語の読み物として標準的で、`--lhL: 2.4` は解説文など特に読ませたい箇所に使う

### 3.5 行間・字間

- **行間 (line-height)**: **本文 1.8（`--lh`）**、短い見出し・テーブルは 1.0、リードは 1.6、ゆったり読ませるときは 2.4（`--lhL`）
- **字間 (letter-spacing)**: **全域 −0.05em**。実測値がすべて基準サイズ × −0.05 で揃う（10 → −0.5 / 14 → −0.7 / 15 → −0.75 / 18 → −0.9 / 20 → −1）
- **例外は 36px のセクション見出しの `+1px` のみ**。大きい欧文を組むための正の字間
- **`palt` と `-0.05em` を重ねている**のがこのサイトの要点。`palt` で約物の空きを詰めたうえで、さらに全文字を 5% 詰める。**游ゴシックの字面がやや空きがちなのを補正する組み方**

**ガイドライン**:
- **本文にも `-0.05em` を掛ける**。これが TOP MUSEUM の字面の前提で、外すと途端に間延びする
- **ただし 12px 以下の小さい文字では −0.05em が可読性を下げる**。10〜12px のキャプションは −0.03em 程度に緩めることを検討する
- 36px 以上の見出しでは字間を正に振る（欧文 `CURRENT` `ABOUT US` を組むため）
- 本文の行間は 1.8 を基準にする。**字間を詰めたぶん、行間は詰めない**

### 3.6 禁則処理・改行ルール

```css
overflow-wrap: break-word;
line-break: strict;
word-break: normal;
```

**禁則対象**:
- 行頭禁止: `）」』】〕〉》、。，．・：；？！`
- 行末禁止: `（「『【〔〈《`

- 展覧会名（例:「出光真子 おんなのさくひん ―ある映像作家の自伝」）は作家名とサブタイトルの境で改行させる。`<br>` で明示すること
- **「10:00−18:00」の中黒・全角ダッシュは分割しない**。`<span style="white-space:nowrap">` で括る

### 3.7 OpenType 機能

```css
font-feature-settings: "palt";   /* サイト全域 */
letter-spacing: -0.05em;         /* 併用 */
```

- **`palt`（プロポーショナル字詰め）がグローバル**。見出しと本文で切り替えない
- **`palt` と負の `letter-spacing` を併用する**。`palt` は約物と仮名の空きを詰め、`letter-spacing` は全文字を一律に詰める。役割が違うので重ねてよい
- **`lnum` は使っていない**。游ゴシック Pr6N の既定数字で「2026.7.22」「10:00−18:00」を組む
- アクセシビリティボタン・検索フォームなど、**フォーム系の要素だけ `font-feature-settings: normal`** に戻る（`palt` を掛けると入力値がずれるため）

### 3.8 縦書き

- 該当なし。UI・展覧会情報とも横組み
- 展覧会ポスター内の縦組みは画像として扱う

---

## 4. Component Stylings

### Accessibility Toolbar（ヘッダー常設）— TOP MUSEUM で最も特徴的な要素

配色切替（`青` `黒` `黄`）と文字サイズ切替（`大` `小`）をヘッダー右上に常設する。

**Toolbar Button**
- Size: `30px × 30px`
- Background: `transparent`（既定）／ `#5c5c5c` ＋ 白文字（アクティブ）
- Border: `1px solid #000000`
- Border Radius: **`2px`**
- Font: 14px / weight 400 / `font-feature-settings: normal`
- グループ幅: `120px`（30px × 3 ＋ 余白）、グループ高さ: `40px`

```css
.a11y-btn {
  width: 30px; height: 30px;
  border: 1px solid #000; border-radius: 2px;
  background: transparent; color: #000;
  font-size: 14px; font-feature-settings: normal;
}
.a11y-btn.is-active { background: #5c5c5c; color: #fff; }
```

- **文字サイズ切替は `html { font-size }` を動かす**。10px → 12px 程度に上げれば rem 指定の全テキストが連動する
- **配色切替はページ全体の配色を差し替える**。UI に有彩色が無いことが前提

### Status Line（開館状況）

- 中身: 緑の `✓` アイコン ＋「本日は開館しております(10:00−18:00)」
- Font: 游ゴ D / 24px / `line-height: 1.2` / `letter-spacing: -0.05em`
- Color: `#000000`（面色は持たない）
- **休館時は文言と記号を替える**。色だけで示さない

### Notice Box（お知らせ囲み）

- Background: `transparent`
- Border: **`2px solid #000000`**
- Border Radius: **`0px`**
- Padding: `10px`
- Font: 18px / `line-height: 1.6` / `letter-spacing: -0.05em`
- 中のリンクは黒 ＋ 下線
- **TOP MUSEUM の「囲み」は 2px の黒罫**。面色で塗らない

### Buttons

**Primary（黒アウトライン・角丸 0）**
- Background: `transparent`
- Text: `#000000`
- Border: `1px solid #000000`
- Border Radius: `0px`（`--bdrs1: 4px` / `--bdrs2: 6px` も定義されているが、実際に使われるのは a11y ボタンの 2px のみ）
- Padding: `var(--s2) var(--s4)` = `1em 2em`
- Font: 16px / weight 400 / `letter-spacing: -0.05em`

**Text Link**
- Background: `transparent`
- Text: `#000000` ＋ 下線
- **一覧リンクはボタン化せず、下線付きの黒文字リンクで並べる**

### Section Heading（欧文＋和文の 2 段）

```html
<h2 class="h01"><span class="en">CURRENT</span><span class="ja">開催中の展覧会・上映</span></h2>
```

- 欧文: Univers Next / 36px / `letter-spacing: 1px` / `line-height: 1.0`
- 和文: 游ゴ D / 18〜20px / `letter-spacing: -0.05em`
- **上下に大きく余白を取る**（`--s8` = 4em 前後）。罫線は引かない

### Cards（展覧会・お知らせ）

- Background: `#ffffff`
- Border: なし（余白と 1px 罫で分離）
- Border Radius: **`0px`**（展覧会ポスター画像も角を落とさない）
- 構成: ポスター画像 → 展覧会名（18〜20px）→ 会期（Univers 22px）
- Shadow: なし

### Calendar

- Table: `.clndr-table` / 18px / `letter-spacing: -0.05em` / 文字色 `#212121`
- 開館日セル: `#ffffff`
- **休館日セル: `#d9d9d9`**（`clndr-bc-gl` クラス）
- Border Radius: `0px`
- **凡例を必ず併記する**。面色だけで開閉を示さない

### Forms

- Background: `#ffffff`
- Border: `1px solid #cccccc`（`--g3`）
- Border Radius: `0px`
- Padding: `var(--s1) var(--s2)`
- Font: 15px / `font-feature-settings: normal`（`palt` を外す）
- Focus: `border-color: #000000`
- Error: `--cCaution` (`#e20c0c`) を文字色と 1px 罫に使う。**面で塗らない**

---

## 5. Layout Principles

### Spacing Scale — `0.5em` 刻みのトークン

```css
--s0: 0.5em;
--s1: calc(0.5em * 1);   /* 0.5em */
--s2: calc(0.5em * 2);   /* 1em */
--s3: calc(0.5em * 3);   /* 1.5em */
--s4: calc(0.5em * 4);   /* 2em */
--s5: calc(0.5em * 5);   /* 2.5em */
--s6: calc(0.5em * 6);   /* 3em */
/* … --s19 まで連続 */
--spa: 15px;             /* コンテナの左右パディング */
```

- **`em` 基準なので、親要素の font-size に連動して余白が伸縮する**。文字サイズ切替（大 / 小）で余白も一緒に変わる設計
- `--s0` 〜 `--s19` まで 0.5em 刻みで連続して定義されている。**任意の値を書かず、必ずトークンから選ぶ**

### Container

- Max Width: **1130px**
- Padding (horizontal): **15px**（`--spa`）
- ヘッダー・フッターは全幅、中身だけ 1130px に収める
- 展覧会ポスターは 1130px の中でさらに余白を取り、**周囲を必ず白で抜く**

### Grid

- Columns: 展覧会・お知らせとも 1 カラムの縦積みが基本。カード一覧は 2〜3 カラム
- Gutter: `--s4`（2em）
- **トップは「ステータス → お知らせ囲み → 展覧会スライダー → セクション（CURRENT / NEWS / CALENDAR / EVENTS / UPCOMING / PICK UP / ABOUT US）」の縦一列**

---

## 6. Depth & Elevation

```css
--bxs1: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
--bxs2: 0px -6px 0px -2px rgba(0, 0, 0, 0.2) inset;
--txs1: 0px 0px 12px rgba(0, 0, 0, 0.6);
```

実測では**ほぼ全要素が `box-shadow: none`**。トークンは定義されているが使われていない。**TOP MUSEUM は影ではなく黒罫で階層を作る**。

| Level | 表現 | 用途 |
|-------|------|------|
| 0 | none | 既定。本文・カード・画像 |
| 1 | `1px solid #cccccc` | 一般の区切り罫 |
| 2 | **`2px solid #000000`** | お知らせ囲み・重要ブロック。**これが TOP MUSEUM の「浮き」** |
| 3 | `--bxs1`（`0 0 10px rgba(0,0,0,.2)`） | ドロップダウン・モーダル（必要な場合のみ） |
| — | `--txs1`（`0 0 12px rgba(0,0,0,.6)`） | 画像上に白文字を載せる場合の text-shadow |

- **奥行きは「罫の太さ」で表現する**。1px → 2px の 2 段しかない
- モバイルには `--text-shadow-mobile` という強い多重シャドウが定義されており、**ヒーロー画像上の白文字を確実に読ませる**ために使う

---

## 7. Do's and Don'ts

### Do（推奨）

- **`letter-spacing: -0.05em` を全域に掛ける**。本文にも掛けること。これが TOP MUSEUM の字面の前提
- **`font-feature-settings: "palt"` と負の字間を併用する**。役割が違うので重ねてよい
- 和文は游ゴシック体 Pr6N、欧文は Univers Next。**font-family は欧文を先頭に置く**
- **太さは `font-weight` ではなくフォントファミリで切り替える**（游ゴ M ↔ 游ゴ D、Univers Light ↔ Regular）
- **`html { font-size: 10px }` の rem 設計にする**。文字サイズ切替がルート 1 箇所で効く
- 余白は `--s0`〜`--s19`（0.5em 刻み）のトークンから選ぶ。**`em` 基準にして文字サイズ切替に連動させる**
- 本文は `--fz: 1.6rem` / `--lh: 1.8`。読ませたい解説は `--lhL: 2.4`
- **セクション見出しは「Univers の欧文 36px（ls +1px）＋ 游ゴ D の和文」の 2 段**にする
- 囲みは**黒 2px の罫**。面色で塗らない
- **アクセシビリティ切替（配色 青/黒/黄、文字サイズ 大/小）をヘッダーに常設する**。ボタンは 30×30px / 1px solid #000 / radius 2px、アクティブは `#5c5c5c` ＋ 白文字
- 状態は色ではなく**記号と文言**で示す（開館 ✓、休館日は面色 `#d9d9d9` ＋ 凡例）
- コンテナは 1130px、左右パディング 15px

### Don't（禁止）

- **本文の `letter-spacing` を `normal` に戻さない**。全域 −0.05em が前提で、外すと字面が間延びする
- **ただし 10〜12px の小さい文字に −0.05em をそのまま掛けない**。可読性が落ちるので −0.03em 程度に緩める
- **`font-weight: 700` で游ゴシックを太らせない**。合成ボールドで字面が潰れる。必ず Pr6N D を読み込む
- **`--c1`〜`--c6` をトップレベルの UI に持ち込まない**。これらは下層のカテゴリ分類用の予約トークンで、色を足すと**アクセシビリティ配色切替が破綻する**
- Swiper 既定の `#007aff` を流用しない
- 面色でブロックを塗らない。**囲みは黒 1px / 2px の罫だけ**
- 角丸を大きくしない。**実際に使われるのは a11y ボタンの 2px のみ**、他は 0px
- 影を落とさない。`--bxs1` はドロップダウン等の例外用
- 開館状況・休館日を色だけで示さない（記号・文言・凡例を必ず併記する）
- 余白に任意の px 値を書かない。`--s*` トークンから選ぶ
- フォーム要素に `palt` を掛けない（入力値がずれる）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | 説明 |
|------|-------|------|
| Mobile | ≤ 767px | 1 カラム。ナビはハンバーガー。a11y ツールバーはメニュー内へ畳む |
| Tablet | 768–1024px | 2 カラム。展覧会ポスターは 1 カラム維持 |
| Desktop | > 1024px | コンテナ 1130px。ナビは横一列 |

### タッチターゲット

- 最小サイズ: 44px × 44px（WCAG基準）
- **a11y ボタンは 30×30px なので、モバイルでは 44px に拡大する**。デスクトップの見た目を優先してモバイルでも 30px にしないこと
- ナビ項目は `padding: 0 20px` ＋ 高さ 44px 以上を確保する

### フォントサイズの調整

- **モバイルでは `html { font-size }` を 10px のまま維持し、個別の rem 値で調整する**（ルートを動かすとユーザーの文字サイズ切替と干渉する）
- Section Heading 36px → モバイルでは 24〜28px。**このとき `letter-spacing` は +1px のまま維持する**（欧文の可読性のため）
- 本文 16px（`--fz`）は据え置き
- **画像上の白文字には `--text-shadow-mobile` を当てる**。モバイルは画像の情報量に対して文字が相対的に大きくなり、コントラストが落ちやすい

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Root:           html { font-size: 10px }  （1rem = 10px）
Background:     #ffffff
Text:           #000000   （純黒。--k: #111 は使わず #000 を使う）
Gray:           #f5f5f5 / #ededed / #cccccc / #aaaaaa / #777777 / #666666
Calendar Closed:#d9d9d9
Toolbar Active: #5c5c5c
Caution:        #e20c0c   （唯一の意味を持つ有彩色）
Reserved:       #1678bf / #66caf2 / #d8695d / #50cc85 / #b277e0 / #e0c332（下層用。UI に出さない）
JP Font:        "游ゴシック体 Pr6N M"（本文） / "游ゴシック体 Pr6N D"（強調）
Latin Font:     "Univers Next W04 Light" / "Univers Next W04 Regular"（和文より先頭）
Body Size:      1.6rem (16px)   --fzS 1.4rem / --fz 1.6rem / --fzM 1.8rem / --fzL 2rem
Weight:         400（全域。太さはファミリ M↔D で切り替える）
Line Height:    --lhS 1.4 / --lh 1.8（本文） / --lhL 2.4
Letter Spacing: -0.05em（全域） / +1px（36px セクション見出しのみ）
Feature:        "palt"（全域。フォーム要素のみ normal）
Spacing:        --s0〜--s19 = calc(0.5em * n)   --spa 15px
Container:      1130px / padding 0 15px
Radius:         0px（原則） / 2px（a11y ボタンのみ）
Border:         1px solid #ccc（一般） / 2px solid #000（囲み）
Shadow:         none（--bxs1 はドロップダウン等の例外用）
```

### プロンプト例

```
東京都写真美術館（TOP MUSEUM）のデザインシステムに従って、展覧会一覧ページを作成してください。
- html { font-size: 10px } を基準にした rem 設計にする
- 欧文は Univers Next W04（無ければ Archivo / sans-serif）を font-family の先頭に置き、
  和文は游ゴシック体 Pr6N M（無ければ Zen Kaku Gothic New 400）に落とす
- 強調は font-weight を上げず、游ゴシック体 Pr6N D（代替: Zen Kaku Gothic New 500）に
  ファミリを差し替えて表現する。font-weight は全域 400
- letter-spacing は全域 -0.05em。ただし 36px のセクション見出しだけ +1px に反転する。
  10〜12px の小さい文字は -0.03em に緩める
- font-feature-settings: "palt" を全域に効かせる（フォーム要素のみ normal）
- 本文は 1.6rem / line-height 1.8。解説文は 2.4 も可
- 余白は --s0〜--s19（calc(0.5em * n)）のトークンから選ぶ。任意の px 値を書かない
- コンテナは max-width 1130px、左右 padding 15px
- 地は白 #ffffff、文字は純黒 #000000。UI に有彩色を一切使わない
- セクション見出しは「Univers の欧文 36px（ls +1px）＋ 游ゴ D の和文」の 2 段にする
  （例: CURRENT ＋ 開催中の展覧会・上映）
- お知らせの囲みは 2px solid #000000・角丸 0px・padding 10px。面色で塗らない
- ヘッダー右上に配色切替（青/黒/黄）と文字サイズ切替（大/小）を常設する。
  ボタンは 30×30px・1px solid #000・border-radius 2px、
  アクティブは背景 #5c5c5c ＋ 白文字。font-feature-settings は normal
- 開館状況は「本日は開館しております(10:00−18:00)」を游ゴ D 24px で表示し、
  記号と文言で示す（色だけに頼らない）
- カレンダーの休館日セルは #d9d9d9 ＋ 凡例を併記する
- 角丸は原則 0px、影は使わない。階層は 1px / 2px の黒罫で作る
```
