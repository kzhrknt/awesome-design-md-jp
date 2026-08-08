# DESIGN.md — 印傳屋 上原勇七（INDEN-YA）

> このファイルはAIエージェントが正確な日本語UIを生成するためのデザイン仕様書です。
> セクションヘッダーは英語、値の説明は日本語で記述しています。
>
> 実測日: 2026-08-08 / 対象: `https://www.inden-ya.co.jp/`, `/about/patterns/`

---

## 1. Visual Theme & Atmosphere

天正10年（1582年）創業、甲州印伝の老舗。鹿革に漆で模様を置く工芸を扱う。
サイトは**白地・グレースケール・写真の全面表示**で組まれ、
色は商品写真の中にしかない。**紅 `#9b0e15` が現在地を示すためだけに1本引かれる。**

- **デザイン方針**: 白地に写真をフルブリード。UI は限りなく引く
- **密度**: 非常に低い。944px の版面に大きな余白
- **キーワード**: 筑紫ゴシック／筑紫明朝、`palt` グローバル、紅の下線1本、角丸 5px、CTA 2種

**このサイトの特徴的な癖（他サイトと違う点）**

1. **書体がフォントワークスの筑紫書体2種**。ゴシックは
   `FOT-筑紫ゴシック Pr5 R`、明朝は `FOT-筑紫明朝 Pr6 L`。
   **どちらも最も細いウェイト**（R と L）を選んでいる。FONTPLUS 配信
2. **見出しは明朝、本文はゴシック**という分業。
   老舗の工芸サイトでよくある「全部明朝」にしない
3. **`font-feature-settings: "palt"` が `body` に指定され全要素に継承される**
4. **フォールバックチェーンに `MyYuGothic` / `MyHiragino` / `MyYuMincho` /
   `MyHiraginoMincho` という自作エイリアスを挟む**。
   `@font-face` + `local()` で **Windows の游ゴシックを Medium にマッピング**する
   古典的な回避策を、明朝側にも適用している（後述 3.3）
5. **本文色が `rgba(0, 0, 0, .843)`**。`#272727` 相当だが、**アルファ付きで持つ**。
   写真の上に置いたときに下地が透ける
6. **UI の有彩色が紅 `#9b0e15` の1色だけ**。しかも
   **「現在地」を示す `border-bottom: 1px` と文字色にしか使わない**。
   面には一切塗らない
7. **CTA が 2種類だけ**。どちらも**黒ベタ `#000000` の角丸 5px**で、
   サイズ違い（20px / 16px）。ホバーで色を変えない
8. **`letter-spacing: 0.64px` を全要素の既定に置く**（16px で 0.04em）。
   見出しはサイズごとに 0.8 / 0.96 / 1.44 / 4px と個別に開く
9. **1280px 以上で `vw` 単位に切り替わる**。`border-radius: 0.39063vw`（= 1280px で 5px）
   のように、**大画面ではレイアウトごと比例拡大する**
10. **`h1` が本文中に存在しない**（ヘッダーの `h1` は 1px に潰したロゴ）。
    ページ見出しは下層ページのヒーローだけが `h1` を持つ

---

## 2. Color Palette & Roles

<!-- 実サイトの computed style 実測値 -->

### Base

- **Background** (`#ffffff`): ページ地色
- **Surface** (`#efefef`): 薄い面
- **Surface Alt** (`#ededed`): サブナビの面（「よくあるご質問」等）

### Ink

- **Body** (`rgba(0, 0, 0, .843)` ≒ `#272727`): **本文・見出しの既定色**。
  純黒ではなくアルファ付きの黒
- **Ink** (`#000000`): CTA の面色、一部のリンク
- **Text Sub** (`#333333`): グローバルナビ・パンくず
- **Text Muted** (`#666666`): タグ（「直営店」「企業情報」）の面色
- **Text Faint** (`#7c7c7c`) / (`#999999`): 補助

### Accent

- **紅 / Crimson** (`#9b0e15`): **サイト唯一の有彩色**。
  現在地の `border-bottom: 1px solid` と、現在地のリンク文字色。**面に塗らない**

### On Photo

- **On Photo** (`#ffffff`): 写真の上の見出し・キャプション

```
面色は #fff / #efefef / #ededed / #666 / #7c7c7c / #999 のグレーだけ。
色は商品写真（漆の黒・鹿革の色）が担う。UI に色を持ち込まない。
紅 #9b0e15 は「いまここ」を指すためだけの1本の線。
```

---

## 3. Typography Rules

### 3.1 和文フォント

**フォントワークスの筑紫書体2種。どちらも最も細いウェイトを使う。**

| 役割 | 書体 | PostScript 名 |
|------|------|--------------|
| **本文・ナビ・キャプション** | FOT-筑紫ゴシック Pr5 **R** | `TsukuGoPr5-R` |
| 強調（一部） | FOT-筑紫ゴシック Pr5 **D**（DemiBold）| `TsukuGoPr5-D` |
| **見出し・ヒーロー・CTA** | FOT-筑紫明朝 Pr6 **L**（Light）| `TsukuMinPr6-L` |

配信は **FONTPLUS**（サブセット配信。`fpbf_*` のハッシュ名で読み込まれる）。

**見出しは明朝、本文はゴシック。** 老舗の工芸サイトにありがちな
「全要素明朝」にせず、読ませる文はゴシックで軽くする。
筑紫明朝 L は横画が細く、大きく組むほど繊細に見える書体で、
50px のヒーロー見出しでその特性が出る。

### 3.2 欧文フォント

**欧文専用の書体を持たない。** 筑紫書体の欧文グリフをそのまま使う。
アイコンだけ `icomoon`（`font-feature-settings: "liga"`）。

`INDEN-YA` のロゴタイプは画像。

### 3.3 font-family 指定

**チェーンが長い。Webフォント → 自作エイリアス → OS フォント → 汎用の4段。**

```css
/* ゴシック（本文・ナビ） */
--font-gothic:
  "FOT-筑紫ゴシック Pr5 R", TsukuGoPr5-R,
  "游ゴシック Medium", "Yu Gothic Medium", 游ゴシック体, YuGothic,
  MyYuGothic, MyHiragino,
  メイリオ, Meiryo, Osaka, "MS UI Gothic", "ＭＳ Ｐゴシック", "MS PGothic",
  sans-serif;

/* 明朝（見出し・CTA） */
--font-mincho:
  "FOT-筑紫明朝 Pr6 L", TsukuMinPr6-L,
  MyYuMincho, MyHiraginoMincho,
  "ＭＳ Ｐ明朝", "MS PMincho", "ＭＳ 明朝", "MS Mincho",
  serif;

body {
  font-family: var(--font-gothic);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.69;              /* 27px */
  letter-spacing: 0.64px;         /* 0.04em */
  color: rgba(0, 0, 0, .843);
  font-feature-settings: "palt";  /* 全要素に継承 */
}
```

**`My*` エイリアスの正体**（このサイトの肝）:

```css
/* Windows の游ゴシックは Regular が細すぎるので Medium に寄せる */
@font-face { font-family: MyYuGothic; font-weight: normal;
             src: local("YuGothic-Medium"), local("Yu Gothic Medium"),
                  local("YuGothic-Regular"); }
@font-face { font-family: MyYuGothic; font-weight: bold;
             src: local("YuGothic-Bold"), local("Yu Gothic"); }

/* 明朝にも同じ手当てをする */
@font-face { font-family: MyYuMincho;  font-weight: 200; src: local("YuMincho-Demibold"); }
@font-face { font-family: MyYuMincho;  font-weight: normal; src: local("YuMincho-Regular"); }
@font-face { font-family: MyHiragino;  font-weight: normal;
             src: local("HiraginoSans-W3"), local("HiraKakuProN-W3"); }
@font-face { font-family: MyHiraginoMincho; font-weight: normal;
             src: local("HiraMinProN-W3"); }
```

- **游ゴシックの Windows 問題への対策を明朝側にも展開している**のが珍しい。
  `MyYuMincho` の `font-weight: 200` に **Demibold** を割り当て、
  細いウェイト指定でも痩せないようにしている
- **Webフォントの `@font-face` は `font-weight: bold` で宣言されている**。
  筑紫書体の R / L を bold にもマッピングすることで、
  **`font-weight: bold` が指定された箇所で合成太字（faux bold）が出ないようにしている**

**フォールバックの考え方**:
- Webフォント（筑紫）が最優先
- 次に **PostScript 名と日本語名の両方**を並べる（`"FOT-筑紫ゴシック Pr5 R"` と `TsukuGoPr5-R`）
- 游ゴシックは `"游ゴシック Medium"` → `"Yu Gothic Medium"` → `游ゴシック体` → `YuGothic`
  の4通りを並べ、その後ろに自作エイリアスを置く
- 最後にメイリオ・Osaka・MS ゴシックまで書く（**Windows 7 世代まで面倒を見る**）

### 3.4 文字サイズ・ウェイト階層

| Role | Font | Size | Weight | Line Height | Letter Spacing | 備考 |
|------|------|------|--------|-------------|----------------|------|
| Hero Title | 筑紫明朝 L | 50px | 400 | **0.68** (34px) | **4px** (0.08em) | 「模様」。白文字。**行送りが字面より小さい** |
| Hero Lead | 筑紫明朝 L | 24px | 400 | 1.46 (35px) | 0.64px | 「自然の力や四季の美しさを想う…」白文字 |
| Section Head | 筑紫明朝 L | 30px | 400 | **1.7** (51px) | 0.8px (0.027em) | 「お知らせ」「印伝の美と伝統の物語。」 |
| Sub Head | 筑紫明朝 L | 24px | 400 | 1.0〜1.7 | 0.96〜1.44px | 「小桜」「よくあるご質問」 |
| Nav | 筑紫明朝 L | 18px | 400 | 1.0 (18px) | 0.64px | 「トップ」「印傳屋について」。色 `#333333` |
| Nav Current | 筑紫明朝 L | 18px | 400 | 1.0 | 0.64px | 色 **`#9b0e15`** + `border-bottom: 1px solid #9b0e15` |
| Body | 筑紫ゴシック R | 16px | 400 | **1.69** (27px) | 0.64px (0.04em) | 本文。色 `rgba(0,0,0,.843)` |
| Body Emphasis | 筑紫ゴシック R | 16px | 400 | 1.69 | **0.96px** (0.06em) | お知らせ本文 |
| CTA L | 筑紫明朝 L | 20px | 400 | 1.0 | 0.64px | 「更紗「雀踊り」模様」 |
| CTA S | 筑紫明朝 L | 16px | 400 | 1.0 | normal | 「詳細を見る」 |
| Link | 筑紫ゴシック R | 16px | 400 | 1.0 | 0.64px | 「一覧へ」 |
| Tag | 筑紫ゴシック R | 14px | 400 | 1.0 | 0.64px | 「直営店」「企業情報」。白文字 |
| Caption | 筑紫ゴシック R | 14px | 400 | 1.7 (23.8px) | 0.64px | 写真キャプション |
| Copyright | 筑紫ゴシック R | 11px | 400 | 1.0 | 0.44px | フッター最下部 |

**`font-weight` は全要素 400。** 太字を使わない。
強調は書体そのものを DemiBold（`FOT-筑紫ゴシック Pr5 D`）に差し替えて表現する。

### 3.5 行間・字間

- **本文は 1.69**（16px → 27px）。明朝の見出しは **1.7**（30px → 51px）
- **ヒーロー見出しだけ `line-height` が字面より小さい**（50px → 34px = 0.68）。
  2文字の大見出しを画像の上に置くための詰めで、**多行の見出しには使わない**
- **ナビ・ボタン・タグの `line-height` は `1.0`**（サイズと同値）。箱に収める要素は詰める
- **`letter-spacing` の既定は 0.64px**（16px で 0.04em）。**px で固定**
  - 見出しはサイズごとに個別指定: 30px → 0.8px / 24px → 0.96〜1.44px / 50px → **4px**
  - 本文の強調は 0.96px（0.06em）
  - 11px のコピーライトだけ 0.44px（同じく 0.04em）

```css
/* 本文 — 筑紫ゴシック */
.body-text {
  font-family: var(--font-gothic);
  font-size: 16px; font-weight: 400;
  line-height: 1.69;         /* 27px */
  letter-spacing: 0.64px;    /* 0.04em */
  color: rgba(0, 0, 0, .843);
}

/* セクション見出し — 筑紫明朝 */
.section-head {
  font-family: var(--font-mincho);
  font-size: 30px; font-weight: 400;
  line-height: 1.7;          /* 51px */
  letter-spacing: 0.8px;
}

/* ヒーロー見出し — 短い語に限る */
.hero-title {
  font-family: var(--font-mincho);
  font-size: 50px; font-weight: 400;
  line-height: 34px;         /* 字面より小さい。2〜4文字専用 */
  letter-spacing: 4px;       /* 0.08em */
  color: #ffffff;
}
```

### 3.6 禁則処理・改行ルール

- **鉤括弧つきの模様名は途中で折らない**
  （`更紗「雀踊り」模様` `小桜` `とんぼ`）。`white-space: nowrap` を当てる
- 模様名のふりがなは `（とんぼ）` のように**全角括弧**で本文サイズの明朝で添える
- 「印傳屋」「印傳博物館」の**「傳」は旧字**。「伝」に直さない。
  ただし「印伝の世界」「印伝の美」は**新字**。**屋号は旧字、工芸名は新字**という
  使い分けを守る
- `letter-spacing: 4px` のヒーロー見出しは、**最後の文字の後ろにも字間が入る**ため
  中央揃えのときは `margin-right: -4px` で補正する

```css
h1, h2, h3 { word-break: keep-all; overflow-wrap: break-word; line-break: strict; }
.pattern-name { white-space: nowrap; }
```

### 3.7 OpenType 機能

```css
body { font-feature-settings: "palt"; }       /* 全要素に継承 */
.icon { font-feature-settings: "liga"; }      /* icomoon のリガチャ */
```

- **`body` に `palt` を置いて全要素へ継承させる**。サイト内で切る要素はない
- **`palt` と `letter-spacing: 0.64px` を併用する**。詰めてから 0.04em 開き直す
  という組み方で、約物だけが詰まり、字面は均等に開く
- **明朝の見出しでこの効果が最も出る**。`palt` なしで 30px の明朝を組むと
  括弧まわりが空いてしまう

### 3.8 縦書き

該当なし。全ページ横組み。

### 3.9 preview.html でのフォント代替

| 実サイト | preview.html | 理由 |
|---------|-------------|------|
| FOT-筑紫ゴシック Pr5 R | **Zen Kaku Gothic New**（Google Fonts）| 筑紫ゴシックは FONTPLUS 配信のため表示不可 |
| FOT-筑紫明朝 Pr6 L | **Shippori Mincho**（Google Fonts）| 筑紫明朝 L は横画が細く、Noto Serif JP より Shippori Mincho が近い |
| FOT-筑紫ゴシック Pr5 D | **Zen Kaku Gothic New 500** | DemiBold 相当 |

**筑紫明朝 L はふところが狭く、仮名が小ぶりで縦画が長い。**
Noto Serif JP は仮名が大きくモダンすぎるため、
**しっぽり明朝（Shippori Mincho）** の 400 が最も印象が近い。
どちらの代替でも `font-feature-settings: "palt"` と
`letter-spacing: 0.64px` を必ず添える。

---

## 4. Component Stylings

### Buttons

**黒ベタの角丸 5px。サイズ違いの2種類だけ。**

```css
/* CTA L — ヒーロー下の模様名 */
.btn-lg {
  background: #000000; color: #ffffff;
  border: 0; border-radius: 5px;
  padding: 16px 36px;
  font-family: var(--font-mincho);
  font-size: 20px; font-weight: 400; line-height: 1;
  letter-spacing: 0.64px;
  text-decoration: none;
}

/* CTA S */
.btn-sm {
  background: #000000; color: #ffffff;
  border: 0; border-radius: 5px;
  padding: 12.8px 28.8px;
  font-family: var(--font-mincho);
  font-size: 16px; font-weight: 400; line-height: 1;
  letter-spacing: normal;
}
```

用例: 「更紗「雀踊り」模様」（L）/「詳細を見る」（S）

**ボタンの文字が明朝**という点がこのサイトの声。
ホバーで色も影も変えない。**枠線ボタンを持たない。**

### Tags

```css
.tag {
  background: #666666; color: #ffffff;
  border-radius: 5px;
  padding: 7px 12.25px;
  font-family: var(--font-gothic);
  font-size: 14px; font-weight: 400; line-height: 1;
  letter-spacing: 0.64px;
}
```

用例: 「直営店」「企業情報」（お知らせのカテゴリ）

**角丸は CTA と同じ 5px。** グレー `#666666` で、紅を使わない。

### Text Link

```css
.link-more {
  color: #333333;
  font-family: var(--font-gothic);
  font-size: 16px; line-height: 1;
  letter-spacing: 0.64px;
  text-decoration: none;
}
.link-more::after { font-family: icomoon; content: "\e900"; margin-left: 8px; }
```

用例: 「一覧へ」。**枠を持たず、アイコン1つを添えるだけ。**

### Navigation

**ヘッダーは中央にロゴ、その下に横一列のナビ。**

```
        [印] INDEN-YA
トップ ｜ 印傳屋について ｜ 印伝の世界 ｜ 商品 ｜ 店舗情報 ｜ 🏛 印傳博物館 ｜ 🛒 オンラインショップ        🌐 Language
```

```css
.gnav a          { font-family: var(--font-mincho); font-size: 18px; color: #333333;
                   letter-spacing: 0.64px; line-height: 1; }
.gnav li.is-current      { border-bottom: 1px solid #9b0e15; }
.gnav li.is-current > a  { color: #9b0e15; }
.gnav li + li            { border-left: 1px solid #ddd; }   /* 縦の区切り */
```

- **現在地は「紅の1px下線 + 紅の文字色」で示す**。面を塗らない
- 項目の区切りは**縦の細い罫**
- 言語切替（日本語 / English / 簡体中文 / 繁体中文）も同じルールで、
  選択中に紅の下線が付く（14px）

**セクション内ナビ（`.p-cn`）**

```css
.section-nav a            { font-family: var(--font-mincho); font-size: 18px; color: #000000; }
.section-nav a.is-current { color: #9b0e15; }
```

用例: 「歴史 / 技 / 模様 / 素材」

### Hero

```css
.hero { position: relative; }
.hero img { width: 100%; display: block; }
.hero h1 { position: absolute; color: #ffffff; font-family: var(--font-mincho);
           font-size: 50px; line-height: 34px; letter-spacing: 4px; }
.hero p  { position: absolute; color: #ffffff; font-family: var(--font-mincho);
           font-size: 24px; line-height: 1.46; letter-spacing: 0.64px; }
```

**写真の上に白い明朝を直に置く。** スクリムも影も敷かない
（写真側が暗い前提の設計）。

### Slider

- Swiper 11。前後の矢印は `rgba(255,255,255,.35)` の円（`border-radius: 50%`）
- ページネーションは小さな円（`border-radius: 100%`）
- スライドのキャプションは黒ベタの CTA L と同じ見た目

### Sub Navigation

```css
.subnav { background: #ededed; }   /* 「よくあるご質問」「商品のご使用にあたって」「カタログ」 */
```

---

## 5. Layout Principles

### Container

| 用途 | Width |
|------|-------|
| **標準コンテナ** | **944px** |
| 記事・読み物 | 854px |
| 2カラム時の主 | 616px |
| 2カラム時の副 | 288px / 306px |
| カード | 452px |
| 狭い読み物 | 700px |
| ワイド | 1024px / 1264px |

### 大画面での比例拡大（このサイト特有）

`1280px` 以上では **`vw` 単位に切り替わる**。

```css
@media only screen and (min-width: 1280px) {
  .btn { border-radius: 0.39063vw; }   /* 1280px のとき 5px */
  .card { border-radius: 1.33333vw; }
}
```

**1280px を基準に全体が比例拡大する。** 固定 px でレイアウトを止めない。
1280px 以上を対象にした `@media` が **35 箇所**ある。

### Grid

- 商品・模様の一覧: 3カラム（944px 内）
- お知らせ: 日付 + タグ + タイトルの1行リスト
- 2カラムは 616px + 288px（左右非対称）

### Spacing Scale

| Token | Value |
|-------|-------|
| XS | 8px |
| S | 12px |
| M | 16px |
| L | 28px |
| XL | 36px |
| 2XL | 60px |
| 3XL | 100px |

### Border Radius

| 用途 | Value |
|------|-------|
| **CTA・タグ** | **5px**（≥1280px では `0.39063vw`）|
| カード | `1.33333vw` |
| スライダーの矢印・ドット | 50% / 100% |
| その他 | **0px** |

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|-------|--------|------|
| 0 | `none` | **ほぼすべて** |
| 1 | `0 4px 8px rgba(0,0,0,.08)` | わずかに浮かせるカード |
| 2 | `0 0 5px rgba(0,0,0,.2)` | ドロップダウン |
| 3 | `0 0 10px rgba(0,0,0,.2)` | 固定ヘッダー・モーダル |
| Focus | `0 0 0 5px #0099ff` | ブラウザ既定のフォーカスリング |

**影は 4 種類しか宣言されていない。** 階層は次の3つでつくる。

1. **写真のフルブリード** — 版面を超えることで前面に出す
2. **面色** — `#ffffff` → `#efefef` → `#ededed`
3. **黒ベタの CTA** — 唯一の「押せる」シグナル

---

## 7. Do's and Don'ts

### Do（推奨）

- **見出しは明朝（筑紫明朝 L）、本文はゴシック（筑紫ゴシック R）**に分ける
- `body` に **`font-feature-settings: "palt"`** を置いて全要素へ継承させる
- `letter-spacing` は既定 **0.64px**（0.04em）。見出しはサイズごとに 0.8 / 0.96 / 1.44 / 4px
- **`palt` と `letter-spacing` を併用する**（詰めてから開き直す）
- 本文の色は `rgba(0, 0, 0, .843)`。純黒を本文に使わない
- **`font-weight` は 400 のまま。** 強調は DemiBold の書体差し替えで表現する
- 有彩色は紅 `#9b0e15` だけ。**現在地の 1px 下線と文字色にしか使わない**
- CTA は黒ベタ `#000000` / `border-radius: 5px` の2サイズ
- タグはグレー `#666666` / 同じ角丸 5px
- ナビ項目の区切りは**縦の細い罫**
- 屋号は旧字「印傳屋」、工芸名は新字「印伝」
- 模様名（`更紗「雀踊り」模様`）は `white-space: nowrap`
- 1280px 以上では `vw` 単位で比例拡大させる

### Don't（禁止）

- 全要素を明朝にしない（本文はゴシック）
- **紅 `#9b0e15` を面に塗らない**（線と文字色だけ）
- 太字（`font-weight: 700`）を使わない
- 枠線ボタンを作らない（CTA は黒ベタ 2種だけ）
- ホバーで CTA の色・影を変えない
- 角丸を 5px 以外にしない（円形の矢印・ドットは例外）
- 濃い影を使わない（最大 `rgba(0,0,0,.2)`）
- ヒーロー見出しの `line-height: 34px`（字面以下）を**多行の見出しに使わない**
- 「印傳屋」を「印伝屋」と書かない
- `palt` を切らない

---

## 8. Responsive Behavior

### Breakpoints

**3段構成。`768px` と `1280px` の2本で切る。**

| Name | Width | 説明 |
|------|-------|------|
| **Mobile** | **≤ 767px** | ハンバーガー + ドロワー（`min-device-width: 320px` 併記が 38 箇所）|
| **Tablet / Desktop** | **≥ 768px** | 標準レイアウト（40 箇所）|
| **Wide** | **≥ 1280px** | **`vw` 単位に切り替え、比例拡大**（35 箇所）|

補助的に `600px` / `786px` / `1024px` も使う。

### モバイルでの変化

- グローバルナビ 7項目 → ハンバーガー + ドロワー
- 一覧 3カラム → 1カラム
- ヒーロー見出し 50px → 30px 前後
- CTA は `width: 100%`
- **`palt` と `letter-spacing: 0.64px` は維持する**（書体を切り替えない）

### 大画面（≥1280px）での変化

- `px` 指定が `vw` 指定に置き換わり、**全体が比例拡大する**
- `border-radius: 5px` → `0.39063vw`
- 文字サイズも `vw` に追随するため、**固定 px を前提にしない**

### タッチターゲット

- CTA L は `padding: 16px 36px` / 20px で高さ約 52px。基準を満たす
- タグ（`padding: 7px 12.25px` / 14px）は高さ約 28px。**押せる要素にする場合は
  モバイルで 44px に拡張する**
- ナビ 18px は行送り 1.0 のため、モバイルのドロワーでは上下パディングを 12px 以上取る

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background:      #ffffff
Surface:         #efefef / #ededed
Body Ink:        rgba(0, 0, 0, .843)（≒ #272727。純黒にしない）
Ink:             #000000（CTA の面色）
Text Sub:        #333333（ナビ）
Text Muted:      #666666（タグの面）/ #7c7c7c / #999999
Accent:          #9b0e15（紅。現在地の 1px 下線と文字色のみ。面に塗らない）
JP Gothic:       "FOT-筑紫ゴシック Pr5 R", TsukuGoPr5-R, "游ゴシック Medium",
                 "Yu Gothic Medium", 游ゴシック体, YuGothic, MyYuGothic, MyHiragino,
                 メイリオ, Meiryo, Osaka, "MS UI Gothic", "ＭＳ Ｐゴシック", "MS PGothic", sans-serif
JP Mincho:       "FOT-筑紫明朝 Pr6 L", TsukuMinPr6-L, MyYuMincho, MyHiraginoMincho,
                 "ＭＳ Ｐ明朝", "MS PMincho", "ＭＳ 明朝", "MS Mincho", serif
代替（preview）: 筑紫ゴシック → Zen Kaku Gothic New / 筑紫明朝 → Shippori Mincho
Base Size:       16px
Line Height:     1.69（本文 16px）/ 1.7（見出し 30px）/ 1.0（ナビ・ボタン・タグ）
Letter Spacing:  0.64px（既定 = 0.04em）/ 0.8px（30px）/ 0.96〜1.44px（24px）/ 4px（50px）
Font Weight:     400（全要素）。太字を使わず DemiBold の書体差し替えで強調する
Border Radius:   5px（CTA・タグ。≥1280px では 0.39063vw）/ 50%（スライダー）/ 0px（その他）
Shadow:          ほぼ none（最大 0 0 10px rgba(0,0,0,.2)）
palt:            on（body に指定し全体へ継承。letter-spacing と併用する）
Container:       944px（標準）/ 854px（読み物）/ 616px + 288px（2カラム）
Breakpoint:      767px / 768px / 1280px（1280px 以上は vw で比例拡大）
```

### プロンプト例

```
印傳屋（INDEN-YA）のデザインシステムに従って、商品一覧ページを作成してください。
- 地色は #ffffff。面は #efefef / #ededed のグレーだけ。UI に色を持ち込まない
- 有彩色は紅 #9b0e15 の1色のみ。現在地を示す border-bottom: 1px solid と文字色にだけ使い、
  面には絶対に塗らない
- 書体は見出しが明朝、本文がゴシックの分業:
    ゴシック: "FOT-筑紫ゴシック Pr5 R"（代替 Zen Kaku Gothic New）
    明朝:     "FOT-筑紫明朝 Pr6 L"（代替 Shippori Mincho）
- body に font-feature-settings: "palt" を置いて全要素へ継承させる
- letter-spacing は既定 0.64px（0.04em）。palt と併用する（詰めてから開き直す）
  見出しはサイズごとに 30px→0.8px、24px→0.96px、50px→4px
- 本文は 16px / 400 / line-height 1.69 / color rgba(0,0,0,.843)（純黒にしない）
- font-weight は全要素 400。太字を使わない
- ナビ・ボタン・タグの line-height は 1.0
- CTA は黒ベタの2種類だけ:
    L  背景 #000000 / 文字 #fff / radius 5px / padding 16px 36px / 明朝 20px
    S  背景 #000000 / 文字 #fff / radius 5px / padding 12.8px 28.8px / 明朝 16px
  ボタンの文字は明朝にする。枠線ボタンを作らない。ホバーで色や影を変えない
- タグは背景 #666666 / 文字 #fff / radius 5px / padding 7px 12.25px / ゴシック 14px
- グローバルナビは項目間を縦の 1px 罫で区切り、現在地だけ
  color #9b0e15 + border-bottom: 1px solid #9b0e15 にする
- ヒーローは写真をフルブリードにし、白い明朝を直に載せる（スクリム・影を敷かない）
  2〜4文字の大見出しは 50px / line-height 34px / letter-spacing 4px
  （多行の見出しにこの line-height を使わない）
- 模様名は white-space: nowrap（更紗「雀踊り」模様 を途中で折らない）
- 屋号は旧字「印傳屋」、工芸名は新字「印伝」で書き分ける
- 角丸は 5px に統一。影はほぼ使わない
- 版面は 944px 中央寄せ。ブレークポイントは 767/768px と 1280px の2本
```
