# DESIGN.md — 日本ハム（Nipponham / NH Foods）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
> 実測日: 2026-11-05 / 対象: `https://www.nipponham.co.jp/`, `/food-allergy/`

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: **Web フォントは丸ゴシック1書体だけ、しかも見出し3要素にしか使わない。** 本文はすべて OS ローカルの游ゴシック系スタック。赤→橙のブランドグラデーションとピル（`border-radius: 50px`）、淡く広い影で、食品メーカーの親しみを作る
- **密度**: 中〜低。`body` 16px / `line-height: 1.6`、コンテナは **1620px** と広く取る
- **キーワード**: Zen Maru Gothic、丸ゴシック、ブランドグラデーション `#E6002D → #F04B17 → #FA9600`、ピル、字間ゼロ

**このサイトの核心は5つある。**

1. **Web フォント（Zen Maru Gothic）は可視 3 要素にしか出ない。** `document.fonts` では 500 / 700 が `loaded` だが、`distributions.fontFamily` での可視件数は**トップ 2 要素・下層 1 要素**。残る **262 / 265 要素と 103 / 104 要素**は `"Yu Gothic", "Hiragino Kaku Gothic Pro", "Hiragino Sans", Meiryo, Osaka, Arial, "MS PGothic", sans-serif` という OS ローカルスタック。**丸ゴシックは「コピーの書体」であって「サイトの書体」ではない**
2. **`palt` を当てれば 17.7% 詰まるのに、1 要素も使っていない。** 実ページに隠し div を作って `「日本ハム」、たんぱく質。（株）` を 40px の Zen Maru Gothic で測ると **`normal` 598.41px / `"palt"` 492.41px / `"halt"` 518.41px**。書体は `palt` テーブルを持っている。それでも `font-feature-settings` の実測は**両ページとも 0 件**、`letter-spacing` も **264 / 265 要素が `normal`**（例外は `公式アカウント一覧` の `-1px` 1 件だけ）。**このサイトは約物を一切詰めない**
3. **`body` の文字サイズとウェイトが 768 / 767px で切り替わる。** `html { font-size: 62.5% }`（= **10px**）は 1440 / 1200 / 1024 / 834 / 768 / 767 / 390 / 375px の **8 幅すべてで固定**だが、`body` は **768px まで `16px / 25.6px / weight 500`、767px 以下で `14px / 22.4px / weight 400`** に落ちる。**行間比 1.6 は両側で保たれる**（25.6/16 = 22.4/14 = 1.6）
4. **ヒーローのコピーはモバイルの方が大きい。** `.home-mv__catch` は 3 段構えで、**768px = 60px → 767px = 71.59px と 1px またぐだけで 19% 跳ね上がる**（下の表）。実テキストで、画像ではない
5. **CSS Custom Properties は実質 0 個。** `customPropertiesSummary.total` は両ページとも **0**。CSS 全文を走査しても `--toggle` / `--sp` の 2 個しかなく、どちらも `:root` ではなくトグル UI のローカル変数。**色・サイズ・影はすべて CSS に直書き**

> **ヒーローのコピーは実テキスト。** ヒーロー領域（`top < 900px`）の `img / svg / picture / video / canvas` を矩形で列挙すると、出てくるのは**ロゴ `cmn_logo01.svg`（237×52）とアイコン 2 点だけ**。「たんぱく質を、もっと自由に。」は `h1.home-mv__catch` の実テキスト（白・`text-shadow: 0 1px 1px rgba(0,15,30,.2)`）。**ここを画像に置き換えないこと**

---

## 2. Color Palette & Roles

### Primary（ブランドカラー）

| 役割 | 実装値 | 実測 |
|------|--------|------|
| **Nipponham Red** | **`#E6002D`** | **可視テキスト 33 要素**（`企業・IR情報` ボタン、重要なお知らせ、カテゴリ見出し）＋ 面 5 要素（カルーセルの現在位置ドット） |
| **ヒーローのグラデーション** | **`linear-gradient(90deg, #E6002D, #F04B17 60%, #FA9600)`** | `.home-mv` の面。**停止位置 60% を丸めない。** 赤から橙へ流す |

### Semantic（カテゴリの淡色面）

ニュースのカテゴリごとに淡い面色を当てている。**どれも文字色は `#333333` のまま**で、面だけで区別する。

| 役割 | 実装値 | 実測 |
|------|--------|------|
| 商品・サービス | `#FFDAAF` | 面 6 要素 |
| サステナビリティ | `#DFF28B` | 面 3 要素 |
| 企業情報 | `#D2F5F3` | 面 3 要素 |
| IR情報 | `#FDF3F4` | 面 2 要素 |
| レシピ | `#FAE5CD` | 面 1 要素 |

### Neutral（ニュートラル）

- **Text Primary** (`#333333`): 本文・見出し。**可視 214 / 99 要素**で圧倒的多数
- **Text Secondary** (`#282828`): ニュースの日付（可視 6 要素）。`#333333` とほぼ同値だが別実装
- **Text Muted** (`#666666`): タブの非選択ラベル、コピーライト（可視 3 / 2 要素）
- **Text on Brand** (`#FFFFFF`): グラデーション面・赤面の上の文字（可視 9 / 1 要素）
- **Surface Gray** (`#F5F5F5`): ヘッダー上段の面（4 要素）
- **Surface Gray 2** (`#F6F6F6`): カード面（2 / 1 要素）
- **Switch Track** (`#EDEDED`): 「商品・レシピ / 企業・IR」切替スイッチの面
- **Dot Inactive** (`#DDDDDD`): カルーセルの非選択ドット（面 17 / 2 要素）
- **Background** (`#FFFFFF`): ページ背景（`pageBackground.resolved` = `rgb(255,255,255)` / 根拠 `body`）
- **下層のヒーロー面**: `linear-gradient(#FFFFFF 5%, #FFEFD9 30%, #FFEFD9 100%)`。`/food-allergy/` の導入部。**上 5% だけ白から立ち上げる**

---

## 3. Typography Rules

### 3.1 和文フォント

- **コピー用（Web フォント）**: **Zen Maru Gothic**（Google Fonts・丸ゴシック）。`weight 500` と `700` が `loaded`、**`400` は宣言だけで可視 0**
- **本文・UI（OS ローカル）**: 游ゴシック → ヒラギノ角ゴ Pro → ヒラギノ角ゴシック → メイリオ の順。**Web フォントを読み込まない**
- `@font-face` は Google Fonts 配信の unicode-range 分割で **366 ブロック**、フォント要求は **12 件**。和文の分割配信なので `unloaded` が大量に出るのは正常

### 3.2 欧文フォント

- **専用の欧文書体は無い。** 和文スタック末尾の `Arial` に落ちる
- Zen Maru Gothic は欧文グリフも持つので、コピー内の英数字は丸ゴシックで出る

### 3.3 font-family 指定

```css
/* 本文・UI（= サイトのほぼ全部） */
body {
  font-family: "Yu Gothic", "Hiragino Kaku Gothic Pro", "Hiragino Sans",
               Meiryo, Osaka, Arial, "MS PGothic", sans-serif;
  font-size: 16px;
  font-weight: 500;        /* ★ 本文が 500。400 ではない */
  line-height: 1.6;
  word-break: break-word;
  color: #333333;
}

/* コピー専用のユーティリティクラス（実サイトの綴りそのまま） */
.home-u-ff-zenmaru {
  font-family: Zen Maru Gothic, YuGothic, Yu Gothic, Arial, メイリオ, Meiryo,
               ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro,
               ＭＳ Ｐゴシック, MS PGothic, sans-serif;
}
```

> **実サイトはフォント名をクォートしていないが、正しくは `"Zen Maru Gothic"` のように引用符で囲む。** 空白を含むフォント名は、クォートしないと解釈がブラウザ任せになる。`メイリオ` `ＭＳ Ｐゴシック` のような和文名も同じ

> **`body` の `font-weight: 500` を落とさないこと。** 游ゴシックには Medium が同梱されない環境があり、Windows では `500` が Regular にマッチして細く出る。**このサイトはスタックに `游ゴシック Medium` / `Yu Gothic Medium` を入れていない**ので、macOS（Medium 合成なし）と Windows で太さが揃わない。太さを厳密に揃えたい案件では `@font-face` で Medium を別名宣言する

### 3.4 文字サイズ・ウェイト階層

| 役割 | サイズ | ウェイト | 行間 | 書体 |
|------|--------|---------|------|------|
| **ヒーローコピー** (`.home-mv__catch`) | **下表（流体）** | **500** | `1.2`（モバイルは `1.3429`） | **Zen Maru Gothic** |
| セクション見出し（コピー寄り） | 40px | 700 | 64px（1.6） | **Zen Maru Gothic** |
| セクション見出し（通常） | 30px | 700 | 48px（1.6） | OS ローカル |
| ブロック見出し | 24px | 700 | 38.4px（1.6） | OS ローカル |
| カードタイトル | 20px | 700 | 28px（1.4） | OS ローカル |
| ナビ（グローバル） | 18px | 700 | — | OS ローカル |
| 本文 | **16px** | **500** | 25.6px（1.6） | OS ローカル |
| ナビ（上段）・日付 | 14〜15px | 500 | — | OS ローカル |
| タブ・バッジ | 12〜13px | 700 | — | OS ローカル |

- **ウェイトは 400 / 500 / 700 の 3 段**（可視 30 / 102 / 133 要素）。**600 も 900 も存在しない**
- **Zen Maru Gothic に 400 を当てないこと。** Google Fonts の URL は `wght@400;500;700` を読んでいるが、可視要素に 400 は 1 つも無い。実装は 500（ヒーロー）と 700（セクション見出し）だけ

### 3.5 行間・字間

- **行間は `1.6` を `body` に 1 回だけ書いて継承させる。** 無単位なので各要素が自分のサイズで再計算する。実測で**行間比 1.6 が 208 / 78 要素**と最多
- 例外は 1.4（カードタイトル）、1.2（ヒーローコピー）、1.36（アイコンナビ）
- **字間は触らない。** `letter-spacing` は **264 / 265 要素と 103 / 104 要素が `normal`**。`em` も `px` も配らない
- **`palt` も使わない。** 書体は対応しているが（実測で 17.7% 詰まる）、サイトの方針として約物をそのまま組む。**丸ゴシックの「、」「。」の後ろが空いて見えるのは意図した素の状態**

### 3.6 禁則処理・改行ルール

- `body { word-break: break-word }` を 8 幅すべてで確認。**`break-all` ではない**ので、欧文の単語は語の途中で折れず、入りきらない語だけ折る
- 改行位置の制御は CSS ではなく **`<br>` を手で入れる**（ヒーローコピー・セクション見出しとも）
- `word-break: auto-phrase` は使っていない

### 3.7 OpenType 機能

- **`font-feature-settings` の実測は両ページとも 0 件。** CSS 全文にも宣言が 1 つも無い
- **新規実装で `palt` を足すかどうかは設計判断。** 足せば 17.7% 詰まるが、現行サイトと並べると別物になる。**既存ページに合わせるなら `normal` のまま**

### 3.8 縦書き

- **縦組みは使っていない**（`typography.verticalWriting` が両ページとも空）

---

## 4. Component Stylings

### Buttons

```css
/* ピル型ボタン（最頻・可視 17 要素） */
.button {
  border-radius: 50px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .2);   /* 可視 66 要素。サイトの基本の影 */
  background: #ffffff;
  color: #333333;
  font-weight: 700;
}

/* タブ切替スイッチ（ヘッダー） */
.switch-btn {
  font-size: 13px;
  font-weight: 700;
  line-height: 15.6px;
  color: #666666;              /* 非選択。選択側は #ffffff */
  background: #ededed;
  border: 2px solid #ededed;
  border-radius: 30px;
}
```

### Badges / Chips

```css
/* ニュースのカテゴリバッジ */
.badge {
  font-size: 12px;
  font-weight: 700;
  line-height: 19.2px;
  padding: 3px 10px;
  border-radius: 50px;
  background: #ffdaaf;        /* カテゴリごとに面色を変える（2章参照） */
  color: #333333;             /* ★ 文字色は変えない */
}
```

### Cards

```css
.card {
  border-radius: 10px;                        /* 下層のカード */
  box-shadow: 1px 1px 3px 1px #cccccc;        /* 下層は実色の影（可視 8 要素） */
  background: rgba(255, 255, 255, .94);
}
```

- **角丸は 4 種**: `50px`（ピル）/ `50%`（丸ドット・可視 20 要素）/ `30px`（スイッチ）/ `20px 20px 0 0`（タブの上角）。下層で `10px` / `24px` が加わる
- **カルーセルのドットは `border-radius: 50%` の `<button role="tab">`**。非選択 `#DDDDDD`、選択 `#E6002D`

### Inputs

- 検索フォームは 16px / weight 400 / OS ローカル。**本文の 500 とウェイトが違う**（UA 既定の `<input>` が 400 のまま）

---

## 5. Layout Principles

### Container

- **最大幅 1620px**（可視 10 / 5 要素）。外枠は 1680px。下層には 1200px のブロックもある
- **1620px は収録サイト中でもかなり広い**。横に詰め込まず、カードを大きく見せる設計

### Spacing Scale

- `gap` の実測: `20px` / `23px` / `36px` / `0 20px` / `0 28px` / `0 30px` / `0 35px` / `35px 40px` / `5px 0`
- **5 の倍数が基本**。`23px` のような例外が少数ある

### Grid

- トップのアイコンナビは 3 列 × 2 行のグリッド（カード幅 ≈ 230px）
- ニュースと更新情報は 2 カラム（492px のコンテナが 2 つ）

---

## 6. Depth & Elevation

- **基本の影は 1 種類**: `0 1px 5px rgba(0, 0, 0, .2)` — **可視 66 要素**。ボタン・カード・アイコンナビすべてこれ
- 追従ヘッダー: `0 5px 5px -5px rgba(0, 0, 0, .2)`（下向きだけに出す）
- 下層のカード: `1px 1px 3px 1px #cccccc` / `1px 1px 5px 1px #cccccc` — **トップと下層で影の作り方が違う**（トップは `rgba` の黒、下層は `#cccccc` の実色）
- 罫線の代わりの影: `1px 1px 0 0 #e5e5e5 inset`

---

## 7. Do's and Don'ts

### Do（推奨）

- **本文は `font-weight: 500`**。`body` に 1 回書いて継承させる
- **行間は無単位の `1.6`** を `body` に 1 回だけ。子要素で px に書き直さない
- **字間は `normal`。** `letter-spacing` も `font-feature-settings` も足さない
- **丸ゴシックはコピーにだけ使う。** `.home-u-ff-zenmaru` 相当のユーティリティクラスを作り、必要な見出しに付ける
- **カテゴリは面色で分け、文字色は `#333333` のまま**にする
- 影は `0 1px 5px rgba(0, 0, 0, .2)` の 1 種で通す
- ボタンは `border-radius: 50px` のピル

### Don't（禁止）

- **Zen Maru Gothic を `body` に当てない。** 262/265 要素が OS ローカルなのが実装の実態で、全面に丸ゴシックを敷くと別のサイトになる
- **`letter-spacing` を配らない。** 「丸ゴシックだから詰めたい」と `palt` や負の字間を足すと、既存ページと並べたときに浮く
- **Zen Maru Gothic に `font-weight: 400` を当てない**（宣言はあるが実装では使われていない）
- **`line-height` を px の絶対値で書かない。** 768/767px で `body` のサイズが 16px → 14px に変わるので、px 固定だと行間比が崩れる
- **ヒーローのコピーを画像にしない**（実テキスト＋`text-shadow` で組んでいる）
- **CSS Custom Properties を前提にしない。** このサイトにはトークンが無い。値は直書きで揃える
- `word-break: break-all` にしない（`break-word` が実装値）

---

## 8. Responsive Behavior

### Breakpoints

```
only screen and (max-width: 767.98px)         ← 12 / 9 箇所（最頻）
print, screen and (min-width: 768px)          ← 7 / 5 箇所
print, screen and (min-width: 1260px)         ← 3 / 1 箇所
screen and (min-width: 768px) and (max-width: 1400px)
print                                          ← 3 / 1 箇所（印刷を常に併記する）
```

- **`767.98px` という 0.02px 刻みの境界**を使う（Bootstrap 系の作法）
- **`print` を常にセットで書く**のがこのサイトの癖

### フォントサイズの調整

**ルート（`html`）は 8 幅すべてで `10px` 固定。流体ではない。** 切り替わるのは `body` と個別要素。

| 幅 | `html` | `body` | `body` weight | `h2`（通常） |
|----|--------|--------|---------------|--------------|
| 1440px | 10px | 16px / 25.6px | **500** | 24px / 38.4px |
| 1200px | 10px | 16px / 25.6px | 500 | 24px / 38.4px |
| 1024px | 10px | 16px / 25.6px | 500 | 24px / 38.4px |
| 834px | 10px | 16px / 25.6px | 500 | 24px / 38.4px |
| **768px** | 10px | **16px / 25.6px** | **500** | 24px / 38.4px |
| **767px** | 10px | **14px / 22.4px** | **400** | **18px / 40px** |
| 390px | 10px | 14px / 22.4px | 400 | 18px / 40px |
| 375px | 10px | 14px / 22.4px | 400 | 18px / 40px |

- **767px で `body` のウェイトが 500 → 400 に落ちる。** サイズだけでなく太さも変わるので、モバイルは全体が一段軽く見える
- **`h2` はモバイルで `line-height: 40px` の絶対値になる**（18px に対して 2.22）。デスクトップの 1.6 とは別物

### ヒーローコピーの流体（3 段構え）

```css
/* ① モバイル（max-width: 767px） */
.home-mv__catch { font-size: 9.33333vw; line-height: 1.3429; }

/* ② デスクトップ既定（768px 〜 1400px） */
.home-mv__catch { font-size: 60px; line-height: 1.2; }

/* ③ ワイド（1401px 〜） */
.home-mv__catch {
  margin-left: -.1em;                                  /* 光学的な左揃え */
  font-size: clamp(48px, 4.7619vw, 92.3809px);
}
```

実測（`.home-mv__catch` の computed `font-size`）:

| 幅 | 実測 | 根拠 |
|----|------|------|
| 1940px | **92.3809px** | clamp の上限に到達 |
| 1600px | 76.1904px | `4.7619vw` |
| 1440px | 68.5714px | `4.7619vw` |
| **1400px** | **60px** | ② のデスクトップ既定 |
| 1200px | 60px | ② |
| 900px | 60px | ② |
| **768px** | **60px** | ② |
| **767px** | **71.5866px** | ① `9.33333vw` |
| 600px | 56px | ① |
| 375px | 35px | ① |

> **768 → 767px で 60px → 71.59px と 19% 跳ね上がる。** モバイルの方がデスクトップより大きいという逆向きの崖で、規定の 4 幅（1440 / 1200 / 834 / 375）では見えない。モバイルの `9.33333vw` が 60px を下回るのは **642.9px 以下**なので、**643〜767px の帯だけコピーがデスクトップより大きく出る**
>
> **`clamp(48px, 3.7619vw, 70px)` は英語版専用。** CSS 上では `html:lang(en) .home-mv__text .home-mv__catch` に書かれており、日本語ページには当たらない

### タッチターゲット

- ピルボタンは高さ 40px 以上。カルーセルのドットは直径 12px だが、親要素でタップ領域を確保している

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
書体（本文）: "Yu Gothic", "Hiragino Kaku Gothic Pro", "Hiragino Sans", Meiryo, Osaka, Arial, "MS PGothic", sans-serif
書体（コピー）: "Zen Maru Gothic", YuGothic, "Yu Gothic", Arial, メイリオ, Meiryo, sans-serif
ルート: html = 10px（62.5%）固定・全幅
本文: 16px / line-height 1.6（無単位）/ font-weight 500 / color #333333
      767px 以下は 14px / weight 400
字間: normal（全要素）
palt: 使わない（0 件）
ブランド赤: #E6002D
ヒーロー面: linear-gradient(90deg, #E6002D, #F04B17 60%, #FA9600)
角丸: 50px（ピル）/ 50%（ドット）/ 30px（スイッチ）/ 10px（下層カード）
影: 0 1px 5px rgba(0, 0, 0, .2)（66 要素・これ1種で通す）
コンテナ: 1620px
ブレークポイント: 767.98px / 768px / 1260px / 1400px
CSS 変数: 無し（直書き）
```

### プロンプト例

```
日本ハムのコーポレートサイトのスタイルで、商品カテゴリ一覧ページを作ってください。

- 本文は OS ローカルの游ゴシックスタック、16px / line-height 1.6（無単位）/ font-weight 500 / #333333
- Web フォント（Zen Maru Gothic）はページ見出し 1 本にだけ使う。本文には当てない
- letter-spacing は normal。palt も使わない
- カテゴリのバッジは border-radius: 50px、面色だけ変えて文字色は #333333 のまま
- カードは box-shadow: 0 1px 5px rgba(0, 0, 0, .2)
- コンテナ最大幅 1620px
- 767px 以下で body を 14px / font-weight 400 に落とす
- CSS 変数は使わず値を直書きする
```

```
ヒーローを実装してください。

- 面は linear-gradient(90deg, #E6002D, #F04B17 60%, #FA9600)
- コピーは Zen Maru Gothic / font-weight 500 / 白 / text-shadow: 0 1px 1px rgba(0, 15, 30, .2)
- font-size は 768〜1400px で 60px、1401px 以上で clamp(48px, 4.7619vw, 92.3809px)、
  767px 以下で 9.33333vw（line-height も 1.2 → 1.3429 に変える）
- 改行は <br> を手で入れる。letter-spacing は足さない
- コピーを画像にしない
```
