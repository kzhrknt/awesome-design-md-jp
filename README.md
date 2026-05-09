<p align="center">
  <img src="designmd-jp.jpg" alt="Awesome Design MD JP" width="100%">
</p>

# Awesome Design MD JP

> A curated collection of `DESIGN.md` files for Japanese web services — enabling AI agents to generate accurate Japanese UI with proper typography, font stacks, and typographic rules.

**[日本語](#日本語) | [English](#english)**

---

## 日本語

### DESIGN.md とは

[DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) は Google Stitch が提唱するフォーマットで、AIエージェントが一貫したUIを生成するためのデザイン仕様書です。プレーンテキストのMarkdownで記述し、コードベースに `AGENTS.md`（作り方）と並べて `DESIGN.md`（見た目と雰囲気）として配置します。

### なぜ日本語版が必要か

既存の [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) は欧米の55以上のサービスをカバーしていますが、**日本語タイポグラフィの仕様は完全に欠落しています**。日本語UIには根本的に異なるタイポグラフィ仕様が必要です：

- **和文フォントのフォールバックチェーン**（和文 → 欧文 → generic）
- **広い行間**（line-height 1.5〜2.0、欧文の1.4〜1.5とは異なる）
- **日本語の字間**（本文に0.04〜0.1em程度）
- **禁則処理**（句読点や括弧の行頭・行末ルール）
- **OpenType機能**（`palt`, `kern` によるプロポーショナル組版）
- **混植ルール**（和文と欧文の組み合わせ規則）

これらの仕様がなければ、AIエージェントは間違ったフォント、詰まった行間、壊れた句読点処理の日本語UIを生成してしまいます。

### プレビュー

各 DESIGN.md のデザイントークンを可視化したショーケースページ（`preview.html`）を同梱しています。

<p align="center">
  <a href="https://kzhrknt.github.io/awesome-design-md-jp/gallery.html">Gallery (179 sites)</a>
</p>

<table>
<tr>
<td align="center"><strong>Apple</strong><br><img src="design-md/apple/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MUJI</strong><br><img src="design-md/muji/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mercari</strong><br><img src="design-md/mercari/preview-screenshot.png" width="120"></td>
<td align="center"><strong>STUDIO</strong><br><img src="design-md/studio/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SmartHR</strong><br><img src="design-md/smarthr/preview-screenshot.png" width="120"></td>
<td align="center"><strong>freee</strong><br><img src="design-md/freee/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>note</strong><br><img src="design-md/note/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Novasell</strong><br><img src="design-md/novasell/preview-screenshot.png" width="120"></td>
<td align="center"><strong>WIRED</strong><br><img src="design-md/wired/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Toyota</strong><br><img src="design-md/toyota/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LINE</strong><br><img src="design-md/line/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Cookpad</strong><br><img src="design-md/cookpad/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>MF</strong><br><img src="design-md/moneyforward/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Cybozu</strong><br><img src="design-md/cybozu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Qiita</strong><br><img src="design-md/qiita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Rakuten</strong><br><img src="design-md/rakuten/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Tabelog</strong><br><img src="design-md/tabelog/preview-screenshot.png" width="120"></td>
<td align="center"><strong>pixiv</strong><br><img src="design-md/pixiv/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Zenn</strong><br><img src="design-md/zenn/preview-screenshot.png" width="120"></td>
<td align="center"><strong>connpass</strong><br><img src="design-md/connpass/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Sansan</strong><br><img src="design-md/sansan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Notion</strong><br><img src="design-md/notion/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ABEMA</strong><br><img src="design-md/abema/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Droga5</strong><br><img src="design-md/droga5/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>三菱地所</strong><br><img src="design-md/mec/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Nintendo</strong><br><img src="design-md/nintendo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>UNIQLO</strong><br><img src="design-md/uniqlo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>星野リゾート</strong><br><img src="design-md/hoshinoresorts/preview-screenshot.png" width="120"></td>
<td align="center"><strong>デジタル庁</strong><br><img src="design-md/digital-go/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PayPay</strong><br><img src="design-md/paypay/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>日経電子版</strong><br><img src="design-md/nikkei/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MOSH</strong><br><img src="design-md/mosh/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Shiseido</strong><br><img src="design-md/shiseido/preview-screenshot.png" width="120"></td>
<td align="center"><strong>STORES</strong><br><img src="design-md/stores/preview-screenshot.png" width="120"></td>
<td align="center"><strong>一休.com</strong><br><img src="design-md/ikyu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Wantedly</strong><br><img src="design-md/wantedly/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Snow Peak</strong><br><img src="design-md/snowpeak/preview-screenshot.png" width="120"></td>
<td align="center"><strong>JINS</strong><br><img src="design-md/jins/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ヤマハ</strong><br><img src="design-md/yamaha/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BAKE</strong><br><img src="design-md/bake/preview-screenshot.png" width="120"></td>
<td align="center"><strong>nendo</strong><br><img src="design-md/nendo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BEAMS</strong><br><img src="design-md/beams/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>サンリオ</strong><br><img src="design-md/sanrio/preview-screenshot.png" width="120"></td>
<td align="center"><strong>吉田カバン</strong><br><img src="design-md/yoshidakaban/preview-screenshot.png" width="120"></td>
<td align="center"><strong>中川政七商店</strong><br><img src="design-md/nakagawa/preview-screenshot.png" width="120"></td>
<td align="center"><strong>POLA</strong><br><img src="design-md/pola/preview-screenshot.png" width="120"></td>
<td align="center"><strong>D&amp;DEPARTMENT</strong><br><img src="design-md/ddepartment/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Takram</strong><br><img src="design-md/takram/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>KOKUYO</strong><br><img src="design-md/kokuyo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Gマーク</strong><br><img src="design-md/g-mark/preview-screenshot.png" width="120"></td>
<td align="center"><strong>teamLab</strong><br><img src="design-md/teamlab/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ISSEY MIYAKE</strong><br><img src="design-md/isseymiyake/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SOU・SOU</strong><br><img src="design-md/sousou/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PARCO</strong><br><img src="design-md/parco/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>とらや</strong><br><img src="design-md/toraya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>IDÉE</strong><br><img src="design-md/idee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mazda</strong><br><img src="design-md/mazda/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BRUTUS</strong><br><img src="design-md/brutus/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ACTUS</strong><br><img src="design-md/actus/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KINTO</strong><br><img src="design-md/kinto/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>21_21 DS</strong><br><img src="design-md/2121designsight/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Pen Online</strong><br><img src="design-md/penonline/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LEXUS</strong><br><img src="design-md/lexus/preview-screenshot.png" width="120"></td>
<td align="center"><strong>マルニ木工</strong><br><img src="design-md/maruni/preview-screenshot.png" width="120"></td>
<td align="center"><strong>POPEYE</strong><br><img src="design-md/popeye/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ミナ ペルホネン</strong><br><img src="design-md/mina-perhonen/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NDC</strong><br><img src="design-md/ndc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>代官山 蔦屋書店</strong><br><img src="design-md/daikanyama-tsite/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BALMUDA</strong><br><img src="design-md/balmuda/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ほぼ日</strong><br><img src="design-md/hobonichi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>±0</strong><br><img src="design-md/plusminuszero/preview-screenshot.png" width="120"></td>
<td align="center"><strong>サントリー</strong><br><img src="design-md/suntory/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>GINZA SIX</strong><br><img src="design-md/ginza6/preview-screenshot.png" width="120"></td>
<td align="center"><strong>東京ミッドタウン</strong><br><img src="design-md/tokyo-midtown/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Casa BRUTUS</strong><br><img src="design-md/casa-brutus/preview-screenshot.png" width="120"></td>
<td align="center"><strong>AURALEE</strong><br><img src="design-md/auralee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Karimoku NS</strong><br><img src="design-md/karimoku-newstandard/preview-screenshot.png" width="120"></td>
<td align="center"><strong>カキモリ</strong><br><img src="design-md/kakimori/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>グランドセイコー</strong><br><img src="design-md/grand-seiko/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CIBONE</strong><br><img src="design-md/cibone/preview-screenshot.png" width="120"></td>
<td align="center"><strong>POSTALCO</strong><br><img src="design-md/postalco/preview-screenshot.png" width="120"></td>
<td align="center"><strong>OSAJI</strong><br><img src="design-md/osaji/preview-screenshot.png" width="120"></td>
<td align="center"><strong>45R</strong><br><img src="design-md/45r/preview-screenshot.png" width="120"></td>
<td align="center"><strong>sacai</strong><br><img src="design-md/sacai/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>AKOMEYA</strong><br><img src="design-md/akomeya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>森美術館</strong><br><img src="design-md/mori-art-museum/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Vermicular</strong><br><img src="design-md/vermicular/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TRUNK(HOTEL)</strong><br><img src="design-md/trunk-hotel/preview-screenshot.png" width="120"></td>
<td align="center"><strong>アマン東京</strong><br><img src="design-md/aman-tokyo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>土屋鞄</strong><br><img src="design-md/tsuchiya-kaban/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>HARIO</strong><br><img src="design-md/hario/preview-screenshot.png" width="120"></td>
<td align="center"><strong>能作</strong><br><img src="design-md/nousaku/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Aesop</strong><br><img src="design-md/aesop/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOMORROWLAND</strong><br><img src="design-md/tomorrowland/preview-screenshot.png" width="120"></td>
<td align="center"><strong>カルビー</strong><br><img src="design-md/calbee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>YAECA</strong><br><img src="design-md/yaeca/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CLASKA</strong><br><img src="design-md/claska/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DEAN&amp;DELUCA</strong><br><img src="design-md/deandeluca/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TRAVELER'S</strong><br><img src="design-md/travelers-company/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Dandelion</strong><br><img src="design-md/dandelionchocolate/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HIGASHIYA</strong><br><img src="design-md/higashiya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Soup Stock</strong><br><img src="design-md/soupstocktokyo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>1616/arita</strong><br><img src="design-md/1616arita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>THREE</strong><br><img src="design-md/three/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Blue Bottle</strong><br><img src="design-md/bluebottlecoffee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HASAMI</strong><br><img src="design-md/hasami-porcelain/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Spiral</strong><br><img src="design-md/spiral/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MARKS&WEB</strong><br><img src="design-md/marksandweb/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>TODAY'S SPECIAL</strong><br><img src="design-md/todaysspecial/preview-screenshot.png" width="120"></td>
<td align="center"><strong>cado</strong><br><img src="design-md/cado/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SHIRO</strong><br><img src="design-md/shiro/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TRUCK</strong><br><img src="design-md/truck-furniture/preview-screenshot.png" width="120"></td>
<td align="center"><strong>IKEUCHI</strong><br><img src="design-md/ikeuchi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>NOT A HOTEL</strong><br><img src="design-md/notahotel/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>HERALBONY</strong><br><img src="design-md/heralbony/preview-screenshot.png" width="120"></td>
<td align="center"><strong>北欧暮らし</strong><br><img src="design-md/hokuohkurashi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>cowcamo</strong><br><img src="design-md/cowcamo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>FABRIC TOKYO</strong><br><img src="design-md/fabrictokyo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>objcts.io</strong><br><img src="design-md/objcts-io/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Goldwin</strong><br><img src="design-md/goldwin/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>MOTHERHOUSE</strong><br><img src="design-md/motherhouse/preview-screenshot.png" width="120"></td>
<td align="center"><strong>uka</strong><br><img src="design-md/uka/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SANU</strong><br><img src="design-md/sanu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Francfranc</strong><br><img src="design-md/francfranc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KEYUCA</strong><br><img src="design-md/keyuca/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Minimal</strong><br><img src="design-md/minimal/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>ORBIS</strong><br><img src="design-md/orbis/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BOTANIST</strong><br><img src="design-md/botanist/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KASHIYAMA</strong><br><img src="design-md/kashiyama/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TENTIAL</strong><br><img src="design-md/tential/preview-screenshot.png" width="120"></td>
<td align="center"><strong>10YC</strong><br><img src="design-md/10yc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LUMINE</strong><br><img src="design-md/lumine/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>nanamica</strong><br><img src="design-md/nanamica/preview-screenshot.png" width="120"></td>
<td align="center"><strong>IPSA</strong><br><img src="design-md/ipsa/preview-screenshot.png" width="120"></td>
<td align="center"><strong>YAMAP</strong><br><img src="design-md/yamap/preview-screenshot.png" width="120"></td>
<td align="center"><strong>COHINA</strong><br><img src="design-md/cohina/preview-screenshot.png" width="120"></td>
<td align="center"><strong>and wander</strong><br><img src="design-md/andwander/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SONY</strong><br><img src="design-md/sony/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DESCENTE</strong><br><img src="design-md/descente/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOTO</strong><br><img src="design-md/toto/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>KUON</strong><br><img src="design-md/kuon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ReFa</strong><br><img src="design-md/refa/preview-screenshot.png" width="120"></td>
<td align="center"><strong>mt</strong><br><img src="design-md/mt/preview-screenshot.png" width="120"></td>
<td align="center"><strong>FUJIFILM</strong><br><img src="design-md/fujifilm/preview-screenshot.png" width="120"></td>
<td align="center"><strong>UNITED ARROWS</strong><br><img src="design-md/united-arrows/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KIRIN</strong><br><img src="design-md/kirin/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mizuno</strong><br><img src="design-md/mizuno/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PILOT</strong><br><img src="design-md/pilot/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SHARP</strong><br><img src="design-md/sharp/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Panasonic</strong><br><img src="design-md/panasonic/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MIKIMOTO</strong><br><img src="design-md/mikimoto/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SAPPORO</strong><br><img src="design-md/sapporo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LOFT</strong><br><img src="design-md/loft/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Canon</strong><br><img src="design-md/canon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SUBARU</strong><br><img src="design-md/subaru/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>博報堂</strong><br><img src="design-md/hakuhodo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Cygames</strong><br><img src="design-md/cygames/preview-screenshot.png" width="120"></td>
<td align="center"><strong>OWNDAYS</strong><br><img src="design-md/owndays/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LEMNOS</strong><br><img src="design-md/lemnos/preview-screenshot.png" width="120"></td>
<td align="center"><strong>GU</strong><br><img src="design-md/gu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CITIZEN</strong><br><img src="design-md/citizen/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CFCL</strong><br><img src="design-md/cfcl/preview-screenshot.png" width="120"></td>
<td align="center"><strong>D-BROS</strong><br><img src="design-md/d-bros/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SIGMA</strong><br><img src="design-md/sigma/preview-screenshot.png" width="120"></td>
<td align="center"><strong>伊藤園</strong><br><img src="design-md/itoen/preview-screenshot.png" width="120"></td>
<td align="center"><strong>カインズ</strong><br><img src="design-md/cainz/preview-screenshot.png" width="120"></td>
<td align="center"><strong>カゴメ</strong><br><img src="design-md/kagome/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>KAPITAL</strong><br><img src="design-md/kapital/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ANREALAGE</strong><br><img src="design-md/anrealage/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KURKKU FIELDS</strong><br><img src="design-md/kurkkufields/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KOSÉ</strong><br><img src="design-md/kose/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CASIO</strong><br><img src="design-md/casio/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HOSOO</strong><br><img src="design-md/hosoo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>WACOAL</strong><br><img src="design-md/wacoal/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TIGER</strong><br><img src="design-md/tiger/preview-screenshot.png" width="120"></td>
<td align="center"><strong>キユーピー</strong><br><img src="design-md/kewpie/preview-screenshot.png" width="120"></td>
<td align="center"><strong>visvim</strong><br><img src="design-md/visvim/preview-screenshot.png" width="120"></td>
<td align="center"><strong>NEIGHBORHOOD</strong><br><img src="design-md/neighborhood/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Afternoon Tea</strong><br><img src="design-md/afternoontea/preview-screenshot.png" width="120"></td>
</tr>
</table>

### テンプレートの使い方

1. [`template/DESIGN.md`](template/DESIGN.md) をコピー
2. 各セクションを対象サービスの実際のCSS値で埋める
3. セクションヘッダーは英語のまま（AIエージェントの可読性のため）
4. 値の説明やDo's and Don'tsは日本語で記述

### セクション構成

テンプレートは以下の9セクションで構成されています（標準フォーマットを日本語タイポグラフィ向けに拡張）：

1. **Visual Theme & Atmosphere** — 視覚テーマと雰囲気
2. **Color Palette & Roles** — カラーパレットと役割
3. **Typography Rules** — タイポグラフィ（日本語拡張の核心）
   - 3.1 和文フォント
   - 3.2 欧文フォント
   - 3.3 font-family指定（フォールバック込み）
   - 3.4 文字サイズ・ウェイト階層
   - 3.5 行間・字間
   - 3.6 禁則処理・改行ルール
   - 3.7 OpenType機能
   - 3.8 縦書き（該当する場合）
4. **Component Stylings** — コンポーネントスタイル
5. **Layout Principles** — レイアウト原則
6. **Depth & Elevation** — 深度と影
7. **Do's and Don'ts** — デザインガードレール
8. **Responsive Behavior** — レスポンシブ挙動
9. **Agent Prompt Guide** — エージェント向けプロンプトガイド

### コントリビュート

日本語サービスの DESIGN.md 追加を歓迎します。[CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

---

## English

### What is DESIGN.md?

[DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) is a format introduced by Google Stitch — a plain-text markdown file that AI agents read to generate consistent UI. It sits alongside `AGENTS.md` (how to build) as `DESIGN.md` (how it should look and feel).

### Why a Japanese Edition?

The existing [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) covers 55+ Western services but has **zero coverage of Japanese typography**. Japanese UI requires fundamentally different typographic specifications:

- **CJK font-family fallback chains** (和文 → 欧文 → generic)
- **Higher line-height** (1.5–2.0 vs Western 1.4–1.5)
- **Japanese letter-spacing** (0.04–0.1em for body text)
- **Kinsoku shori (禁則処理)** — line-break rules for CJK punctuation
- **OpenType features** (`palt`, `kern`) for proportional Japanese typesetting
- **Mixed typesetting (混植)** — rules for combining Japanese and Latin typefaces

Without these specifications, AI agents produce Japanese UI with broken typography — wrong fonts, cramped line-height, and mishandled punctuation.

### Included Sites

| Service | Category | DESIGN.md | Preview |
|---------|----------|-----------|---------|
| [Apple Japan](https://www.apple.com/jp/) | Consumer Tech | [DESIGN.md](design-md/apple/DESIGN.md) | [preview.html](design-md/apple/preview.html) |
| [SmartHR](https://smarthr.jp/) | HR SaaS | [DESIGN.md](design-md/smarthr/DESIGN.md) | [preview.html](design-md/smarthr/preview.html) |
| [freee](https://www.freee.co.jp/) | Fintech SaaS | [DESIGN.md](design-md/freee/DESIGN.md) | [preview.html](design-md/freee/preview.html) |
| [note](https://note.com/) | Media Platform | [DESIGN.md](design-md/note/DESIGN.md) | [preview.html](design-md/note/preview.html) |
| [Novasell](https://novasell.com/) | AI Agency | [DESIGN.md](design-md/novasell/DESIGN.md) | [preview.html](design-md/novasell/preview.html) |
| [MUJI](https://www.muji.com/jp/ja/store) | Retail / Lifestyle | [DESIGN.md](design-md/muji/DESIGN.md) | [preview.html](design-md/muji/preview.html) |
| [Mercari](https://www.mercari.com/jp/) | C2C Marketplace | [DESIGN.md](design-md/mercari/DESIGN.md) | [preview.html](design-md/mercari/preview.html) |
| [STUDIO](https://studio.design/ja) | No-Code Design | [DESIGN.md](design-md/studio/DESIGN.md) | [preview.html](design-md/studio/preview.html) |
| [Toyota](https://toyota.jp/) | Automotive | [DESIGN.md](design-md/toyota/DESIGN.md) | [preview.html](design-md/toyota/preview.html) |
| [LINE](https://line.me/ja/) | Messenger | [DESIGN.md](design-md/line/DESIGN.md) | [preview.html](design-md/line/preview.html) |
| [Cookpad](https://cookpad.com/) | Recipe / UGC | [DESIGN.md](design-md/cookpad/DESIGN.md) | [preview.html](design-md/cookpad/preview.html) |
| [MoneyForward](https://moneyforward.com/) | Fintech | [DESIGN.md](design-md/moneyforward/DESIGN.md) | [preview.html](design-md/moneyforward/preview.html) |
| [Cybozu](https://cybozu.co.jp/) | Groupware | [DESIGN.md](design-md/cybozu/DESIGN.md) | [preview.html](design-md/cybozu/preview.html) |
| [Qiita](https://qiita.com/) | Developer Community | [DESIGN.md](design-md/qiita/DESIGN.md) | [preview.html](design-md/qiita/preview.html) |
| [Rakuten](https://www.rakuten.co.jp/) | EC | [DESIGN.md](design-md/rakuten/DESIGN.md) | [preview.html](design-md/rakuten/preview.html) |
| [Tabelog](https://tabelog.com/) | Gourmet | [DESIGN.md](design-md/tabelog/DESIGN.md) | [preview.html](design-md/tabelog/preview.html) |
| [pixiv](https://www.pixiv.net/) | Creator Platform | [DESIGN.md](design-md/pixiv/DESIGN.md) | [preview.html](design-md/pixiv/preview.html) |
| [Zenn](https://zenn.dev/) | Tech Articles | [DESIGN.md](design-md/zenn/DESIGN.md) | [preview.html](design-md/zenn/preview.html) |
| [connpass](https://connpass.com/) | Tech Events | [DESIGN.md](design-md/connpass/DESIGN.md) | [preview.html](design-md/connpass/preview.html) |
| [Sansan](https://jp.sansan.com/) | Business Card SaaS | [DESIGN.md](design-md/sansan/DESIGN.md) | [preview.html](design-md/sansan/preview.html) |
| [Notion](https://www.notion.so/ja) | Productivity | [DESIGN.md](design-md/notion/DESIGN.md) | [preview.html](design-md/notion/preview.html) |
| [ABEMA](https://abema.tv/) | Video Streaming | [DESIGN.md](design-md/abema/DESIGN.md) | [preview.html](design-md/abema/preview.html) |
| [Droga5](https://droga5.jp/) | Creative Agency | [DESIGN.md](design-md/droga5/DESIGN.md) | [preview.html](design-md/droga5/preview.html) |
| [WIRED.jp](https://wired.jp/) | Tech Media | [DESIGN.md](design-md/wired/DESIGN.md) | [preview.html](design-md/wired/preview.html) |
| [Mitsubishi Estate](https://www.mec.co.jp/) | Real Estate | [DESIGN.md](design-md/mec/DESIGN.md) | [preview.html](design-md/mec/preview.html) |
| [Nintendo](https://www.nintendo.com/jp/) | Gaming | [DESIGN.md](design-md/nintendo/DESIGN.md) | [preview.html](design-md/nintendo/preview.html) |
| [UNIQLO](https://www.uniqlo.com/jp/ja/) | Apparel EC | [DESIGN.md](design-md/uniqlo/DESIGN.md) | [preview.html](design-md/uniqlo/preview.html) |
| [Hoshino Resorts](https://hoshinoresorts.com/) | Hospitality | [DESIGN.md](design-md/hoshinoresorts/DESIGN.md) | [preview.html](design-md/hoshinoresorts/preview.html) |
| [Digital Agency](https://www.digital.go.jp/) | Public / Gov | [DESIGN.md](design-md/digital-go/DESIGN.md) | [preview.html](design-md/digital-go/preview.html) |
| [PayPay](https://paypay.ne.jp/) | Fintech | [DESIGN.md](design-md/paypay/DESIGN.md) | [preview.html](design-md/paypay/preview.html) |
| [Nikkei](https://www.nikkei.com/) | News / Editorial | [DESIGN.md](design-md/nikkei/DESIGN.md) | [preview.html](design-md/nikkei/preview.html) |
| [MOSH](https://mosh.jp/) | Creator Platform / SaaS | [DESIGN.md](design-md/mosh/DESIGN.md) | [preview.html](design-md/mosh/preview.html) |
| [Shiseido](https://www.shiseido.co.jp/) | Cosmetics / Beauty | [DESIGN.md](design-md/shiseido/DESIGN.md) | [preview.html](design-md/shiseido/preview.html) |
| [STORES](https://stores.fun/) | Commerce SaaS | [DESIGN.md](design-md/stores/DESIGN.md) | [preview.html](design-md/stores/preview.html) |
| [Ikyu](https://www.ikyu.com/) | Hospitality / Reservation | [DESIGN.md](design-md/ikyu/DESIGN.md) | [preview.html](design-md/ikyu/preview.html) |
| [Wantedly](https://www.wantedly.com/) | Recruiting / Business SNS | [DESIGN.md](design-md/wantedly/DESIGN.md) | [preview.html](design-md/wantedly/preview.html) |
| [Snow Peak](https://www.snowpeak.co.jp/) | Outdoor / Lifestyle | [DESIGN.md](design-md/snowpeak/DESIGN.md) | [preview.html](design-md/snowpeak/preview.html) |
| [JINS](https://www.jins.com/jp/) | Eyewear / D2C | [DESIGN.md](design-md/jins/DESIGN.md) | [preview.html](design-md/jins/preview.html) |
| [Yamaha](https://www.yamaha.com/ja/) | Corporate / Manufacturing | [DESIGN.md](design-md/yamaha/DESIGN.md) | [preview.html](design-md/yamaha/preview.html) |
| [BAKE INC.](https://bake-jp.com/) | Confectionary / Brand | [DESIGN.md](design-md/bake/DESIGN.md) | [preview.html](design-md/bake/preview.html) |
| [nendo](https://www.nendo.jp/jp/) | Design Studio | [DESIGN.md](design-md/nendo/DESIGN.md) | [preview.html](design-md/nendo/preview.html) |
| [BEAMS](https://www.beams.co.jp/) | Select Shop / Apparel | [DESIGN.md](design-md/beams/DESIGN.md) | [preview.html](design-md/beams/preview.html) |
| [Sanrio](https://www.sanrio.co.jp/) | Character / Lifestyle | [DESIGN.md](design-md/sanrio/DESIGN.md) | [preview.html](design-md/sanrio/preview.html) |
| [Yoshida & Co. (PORTER)](https://www.yoshidakaban.com/) | Bag Manufacturer / Heritage Brand | [DESIGN.md](design-md/yoshidakaban/DESIGN.md) | [preview.html](design-md/yoshidakaban/preview.html) |
| [Nakagawa Masashichi Shoten](https://www.nakagawa-masashichi.jp/) | Heritage Craft / Lifestyle | [DESIGN.md](design-md/nakagawa/DESIGN.md) | [preview.html](design-md/nakagawa/preview.html) |
| [POLA](https://www.pola.co.jp/) | Cosmetics / Beauty | [DESIGN.md](design-md/pola/DESIGN.md) | [preview.html](design-md/pola/preview.html) |
| [D&DEPARTMENT](https://www.d-department.com/) | Long Life Design / Curated Retail | [DESIGN.md](design-md/ddepartment/DESIGN.md) | [preview.html](design-md/ddepartment/preview.html) |
| [Takram](https://ja.takram.com/) | Design Innovation Firm | [DESIGN.md](design-md/takram/DESIGN.md) | [preview.html](design-md/takram/preview.html) |
| [KOKUYO](https://www.kokuyo.co.jp/) | Stationery / Furniture / Space | [DESIGN.md](design-md/kokuyo/DESIGN.md) | [preview.html](design-md/kokuyo/preview.html) |
| [GOOD DESIGN AWARD](https://www.g-mark.org/) | Design Award / Public | [DESIGN.md](design-md/g-mark/DESIGN.md) | [preview.html](design-md/g-mark/preview.html) |
| [teamLab](https://www.teamlab.art/jp/) | Digital Art Collective | [DESIGN.md](design-md/teamlab/DESIGN.md) | [preview.html](design-md/teamlab/preview.html) |
| [ISSEY MIYAKE](https://www.isseymiyake.com/ja) | Fashion / Apparel | [DESIGN.md](design-md/isseymiyake/DESIGN.md) | [preview.html](design-md/isseymiyake/preview.html) |
| [SOU・SOU](https://www.sousou.co.jp/) | Textile / Heritage Apparel | [DESIGN.md](design-md/sousou/DESIGN.md) | [preview.html](design-md/sousou/preview.html) |
| [PARCO](https://www.parco.co.jp/) | Retail / Commercial Real Estate | [DESIGN.md](design-md/parco/DESIGN.md) | [preview.html](design-md/parco/preview.html) |
| [Toraya (虎屋)](https://www.toraya-group.co.jp/) | Heritage Confectionery / Wagashi | [DESIGN.md](design-md/toraya/DESIGN.md) | [preview.html](design-md/toraya/preview.html) |
| [IDÉE](https://www.idee-online.com/) | Furniture / Lifestyle Retail | [DESIGN.md](design-md/idee/DESIGN.md) | [preview.html](design-md/idee/preview.html) |
| [Mazda](https://www.mazda.com/ja/) | Automotive / Corporate | [DESIGN.md](design-md/mazda/DESIGN.md) | [preview.html](design-md/mazda/preview.html) |
| [BRUTUS](https://brutus.jp/) | Magazine / Editorial | [DESIGN.md](design-md/brutus/DESIGN.md) | [preview.html](design-md/brutus/preview.html) |
| [ACTUS](https://www.actus-interior.com/) | Furniture / Interior Retail | [DESIGN.md](design-md/actus/DESIGN.md) | [preview.html](design-md/actus/preview.html) |
| [KINTO](https://kinto.co.jp/) | Lifestyle / Tableware | [DESIGN.md](design-md/kinto/DESIGN.md) | [preview.html](design-md/kinto/preview.html) |
| [21_21 DESIGN SIGHT](https://www.2121designsight.jp/) | Design Museum | [DESIGN.md](design-md/2121designsight/DESIGN.md) | [preview.html](design-md/2121designsight/preview.html) |
| [Pen Online](https://www.pen-online.jp/) | Magazine / Editorial | [DESIGN.md](design-md/penonline/DESIGN.md) | [preview.html](design-md/penonline/preview.html) |
| [LEXUS](https://lexus.jp/) | Automotive / Luxury | [DESIGN.md](design-md/lexus/DESIGN.md) | [preview.html](design-md/lexus/preview.html) |
| [Maruni (マルニ木工)](https://www.maruni.com/jp) | Furniture / Heritage Craft | [DESIGN.md](design-md/maruni/DESIGN.md) | [preview.html](design-md/maruni/preview.html) |
| [POPEYE](https://popeyemagazine.jp/) | Magazine / Editorial | [DESIGN.md](design-md/popeye/DESIGN.md) | [preview.html](design-md/popeye/preview.html) |
| [mina perhonen](https://www.mina-perhonen.jp/) | Textile / Fashion / Heritage | [DESIGN.md](design-md/mina-perhonen/DESIGN.md) | [preview.html](design-md/mina-perhonen/preview.html) |
| [Nippon Design Center](https://www.ndc.co.jp/) | Design Firm / Editorial | [DESIGN.md](design-md/ndc/DESIGN.md) | [preview.html](design-md/ndc/preview.html) |
| [Daikanyama T-SITE](https://store.tsite.jp/daikanyama/) | Bookstore / Cultural Complex | [DESIGN.md](design-md/daikanyama-tsite/DESIGN.md) | [preview.html](design-md/daikanyama-tsite/preview.html) |
| [BALMUDA](https://www.balmuda.com/jp/) | Home Appliance / Product Design | [DESIGN.md](design-md/balmuda/DESIGN.md) | [preview.html](design-md/balmuda/preview.html) |
| [Hobonichi (ほぼ日刊イトイ新聞)](https://www.1101.com/) | Web Magazine / EC | [DESIGN.md](design-md/hobonichi/DESIGN.md) | [preview.html](design-md/hobonichi/preview.html) |
| [±0 (Plus Minus Zero)](https://www.plusminuszero.jp/) | Product Design / Home Appliance | [DESIGN.md](design-md/plusminuszero/DESIGN.md) | [preview.html](design-md/plusminuszero/preview.html) |
| [Suntory (サントリー)](https://www.suntory.co.jp/) | Beverage / Corporate | [DESIGN.md](design-md/suntory/DESIGN.md) | [preview.html](design-md/suntory/preview.html) |
| [GINZA SIX (銀座シックス)](https://ginza6.tokyo/) | Luxury Retail / Commercial Complex | [DESIGN.md](design-md/ginza6/DESIGN.md) | [preview.html](design-md/ginza6/preview.html) |
| [Tokyo Midtown (東京ミッドタウン)](https://www.tokyo-midtown.com/jp/) | Urban Development / Cultural Complex | [DESIGN.md](design-md/tokyo-midtown/DESIGN.md) | [preview.html](design-md/tokyo-midtown/preview.html) |
| [Casa BRUTUS](https://casabrutus.com/) | Magazine / Design Editorial | [DESIGN.md](design-md/casa-brutus/DESIGN.md) | [preview.html](design-md/casa-brutus/preview.html) |
| [AURALEE](https://auralee.jp/) | Fashion / Apparel | [DESIGN.md](design-md/auralee/DESIGN.md) | [preview.html](design-md/auralee/preview.html) |
| [Karimoku New Standard](https://www.karimoku-newstandard.jp/) | Furniture / Heritage Craft | [DESIGN.md](design-md/karimoku-newstandard/DESIGN.md) | [preview.html](design-md/karimoku-newstandard/preview.html) |
| [Kakimori (カキモリ)](https://kakimori.com/) | Stationery / Custom Craft | [DESIGN.md](design-md/kakimori/DESIGN.md) | [preview.html](design-md/kakimori/preview.html) |
| [Grand Seiko (グランドセイコー)](https://www.grand-seiko.com/jp-ja) | Luxury Watch / Heritage | [DESIGN.md](design-md/grand-seiko/DESIGN.md) | [preview.html](design-md/grand-seiko/preview.html) |
| [CIBONE (シボネ)](https://www.cibone.com/) | Lifestyle Retail / Editorial | [DESIGN.md](design-md/cibone/DESIGN.md) | [preview.html](design-md/cibone/preview.html) |
| [POSTALCO (ポスタルコ)](https://www.postalco.net/) | Leather / Stationery / Design Studio | [DESIGN.md](design-md/postalco/DESIGN.md) | [preview.html](design-md/postalco/preview.html) |
| [OSAJI (オサジ)](https://osaji.net/) | Skincare / Lifestyle | [DESIGN.md](design-md/osaji/DESIGN.md) | [preview.html](design-md/osaji/preview.html) |
| [45R (フォーティーファイブアール)](https://www.45r.jp/) | Fashion / Apparel / Heritage | [DESIGN.md](design-md/45r/DESIGN.md) | [preview.html](design-md/45r/preview.html) |
| [sacai (サカイ)](https://www.sacai.jp/) | Fashion / Apparel | [DESIGN.md](design-md/sacai/DESIGN.md) | [preview.html](design-md/sacai/preview.html) |
| [AKOMEYA TOKYO (アコメヤ トーキョー)](https://www.akomeya.jp/) | Lifestyle / Specialty Grocery | [DESIGN.md](design-md/akomeya/DESIGN.md) | [preview.html](design-md/akomeya/preview.html) |
| [Mori Art Museum (森美術館)](https://www.mori.art.museum/jp/) | Contemporary Art Museum | [DESIGN.md](design-md/mori-art-museum/DESIGN.md) | [preview.html](design-md/mori-art-museum/preview.html) |
| [Vermicular (バーミキュラ)](https://www.vermicular.jp/) | Cookware / Product Design | [DESIGN.md](design-md/vermicular/DESIGN.md) | [preview.html](design-md/vermicular/preview.html) |
| [TRUNK(HOTEL)](https://trunk-hotel.com/) | Boutique Hotel / Hospitality | [DESIGN.md](design-md/trunk-hotel/DESIGN.md) | [preview.html](design-md/trunk-hotel/preview.html) |
| [Aman Tokyo (アマン東京)](https://www.aman.com/ja-jp/resorts/aman-tokyo) | Luxury Hotel / Hospitality | [DESIGN.md](design-md/aman-tokyo/DESIGN.md) | [preview.html](design-md/aman-tokyo/preview.html) |
| [Tsuchiya Kaban (土屋鞄製造所)](https://tsuchiya-kaban.jp/) | Leather Goods / Heritage Craft | [DESIGN.md](design-md/tsuchiya-kaban/DESIGN.md) | [preview.html](design-md/tsuchiya-kaban/preview.html) |
| [HARIO (ハリオ)](https://www.hario.com/) | Glass / Coffee Equipment | [DESIGN.md](design-md/hario/DESIGN.md) | [preview.html](design-md/hario/preview.html) |
| [Nousaku (能作)](https://www.nousaku.co.jp/) | Tin Craft / Heritage Manufacturing | [DESIGN.md](design-md/nousaku/DESIGN.md) | [preview.html](design-md/nousaku/preview.html) |
| [Aesop (イソップ)](https://www.aesop.com/jp/) | Luxury Skincare / Beauty | [DESIGN.md](design-md/aesop/DESIGN.md) | [preview.html](design-md/aesop/preview.html) |
| [TOMORROWLAND (トゥモローランド)](https://www.tomorrowland.co.jp/) | Fashion / Apparel | [DESIGN.md](design-md/tomorrowland/DESIGN.md) | [preview.html](design-md/tomorrowland/preview.html) |
| [Calbee (カルビー)](https://www.calbee.co.jp/) | Consumer Food / Corporate | [DESIGN.md](design-md/calbee/DESIGN.md) | [preview.html](design-md/calbee/preview.html) |
| [YAECA (ヤエカ)](https://yaeca.com/) | Fashion / Lifestyle | [DESIGN.md](design-md/yaeca/DESIGN.md) | [preview.html](design-md/yaeca/preview.html) |
| [CLASKA (クラスカ)](https://www.claska.com/) | Design / Lifestyle | [DESIGN.md](design-md/claska/DESIGN.md) | [preview.html](design-md/claska/preview.html) |
| [DEAN & DELUCA (ディーンアンドデルーカ)](https://www.deandeluca.co.jp/) | Premium Food / Lifestyle | [DESIGN.md](design-md/deandeluca/DESIGN.md) | [preview.html](design-md/deandeluca/preview.html) |
| [TRAVELER'S COMPANY (トラベラーズカンパニー)](https://www.travelers-company.com/) | Stationery / Lifestyle | [DESIGN.md](design-md/travelers-company/DESIGN.md) | [preview.html](design-md/travelers-company/preview.html) |
| [Dandelion Chocolate (ダンデライオン・チョコレート)](https://dandelionchocolate.jp/) | Craft Chocolate / Food | [DESIGN.md](design-md/dandelionchocolate/DESIGN.md) | [preview.html](design-md/dandelionchocolate/preview.html) |
| [HIGASHIYA (ひがしや)](https://www.higashiya.com/) | Japanese Confectionery / Food | [DESIGN.md](design-md/higashiya/DESIGN.md) | [preview.html](design-md/higashiya/preview.html) |
| [Soup Stock Tokyo (スープストックトーキョー)](https://www.soup-stock-tokyo.com/) | Food / Restaurant | [DESIGN.md](design-md/soupstocktokyo/DESIGN.md) | [preview.html](design-md/soupstocktokyo/preview.html) |
| [1616 / arita japan](https://www.1616arita.jp/) | Porcelain / Product Design | [DESIGN.md](design-md/1616arita/DESIGN.md) | [preview.html](design-md/1616arita/preview.html) |
| [THREE (スリー)](https://www.threecosmetics.com/) | Cosmetics / Beauty | [DESIGN.md](design-md/three/DESIGN.md) | [preview.html](design-md/three/preview.html) |
| [Blue Bottle Coffee Japan (ブルーボトルコーヒー)](https://store.bluebottlecoffee.jp/) | Cafe / EC | [DESIGN.md](design-md/bluebottlecoffee/DESIGN.md) | [preview.html](design-md/bluebottlecoffee/preview.html) |
| [HASAMI PORCELAIN (ハサミポーセリン)](https://www.hasami-porcelain.com/) | Porcelain / Product Design | [DESIGN.md](design-md/hasami-porcelain/DESIGN.md) | [preview.html](design-md/hasami-porcelain/preview.html) |
| [Spiral (スパイラル)](https://www.spiral.co.jp/) | Art / Cultural Complex | [DESIGN.md](design-md/spiral/DESIGN.md) | [preview.html](design-md/spiral/preview.html) |
| [MARKS&WEB (マークスアンドウェブ)](https://www.marksandweb.com/) | Natural Cosmetics / EC | [DESIGN.md](design-md/marksandweb/DESIGN.md) | [preview.html](design-md/marksandweb/preview.html) |
| [TODAY'S SPECIAL (トゥデイズスペシャル)](https://www.todaysspecial.jp/) | Lifestyle Store / EC | [DESIGN.md](design-md/todaysspecial/DESIGN.md) | [preview.html](design-md/todaysspecial/preview.html) |
| [cado (カドー)](https://cado.com/) | Home Appliance / Product Design | [DESIGN.md](design-md/cado/DESIGN.md) | [preview.html](design-md/cado/preview.html) |
| [SHIRO (シロ)](https://shiro-shiro.jp/) | Natural Cosmetics / Beauty | [DESIGN.md](design-md/shiro/DESIGN.md) | [preview.html](design-md/shiro/preview.html) |
| [TRUCK FURNITURE (トラックファニチャー)](https://www.truck-furniture.co.jp/) | Furniture / Handcraft | [DESIGN.md](design-md/truck-furniture/DESIGN.md) | [preview.html](design-md/truck-furniture/preview.html) |
| [IKEUCHI ORGANIC (イケウチオーガニック)](https://www.ikeuchi.org/) | Organic Towel / Lifestyle | [DESIGN.md](design-md/ikeuchi/DESIGN.md) | [preview.html](design-md/ikeuchi/preview.html) |
| [NOT A HOTEL](https://notahotel.com/) | Architecture / Hospitality | [DESIGN.md](design-md/notahotel/DESIGN.md) | [preview.html](design-md/notahotel/preview.html) |
| [HERALBONY (ヘラルボニー)](https://www.heralbony.com/) | Art / Social Enterprise | [DESIGN.md](design-md/heralbony/DESIGN.md) | [preview.html](design-md/heralbony/preview.html) |
| [北欧、暮らしの道具店](https://hokuohkurashi.com/) | Lifestyle EC / Media Commerce | [DESIGN.md](design-md/hokuohkurashi/DESIGN.md) | [preview.html](design-md/hokuohkurashi/preview.html) |
| [cowcamo（カウカモ）](https://cowcamo.jp/) | Real Estate / Marketplace | [DESIGN.md](design-md/cowcamo/DESIGN.md) | [preview.html](design-md/cowcamo/preview.html) |
| [FABRIC TOKYO](https://fabric-tokyo.com/) | D2C Fashion / Custom Order | [DESIGN.md](design-md/fabrictokyo/DESIGN.md) | [preview.html](design-md/fabrictokyo/preview.html) |
| [objcts.io](https://objcts.io/) | D2C Leather Goods | [DESIGN.md](design-md/objcts-io/DESIGN.md) | [preview.html](design-md/objcts-io/preview.html) |
| [Goldwin (ゴールドウイン)](https://www.goldwin.co.jp/) | Outdoor / Sports Apparel | [DESIGN.md](design-md/goldwin/DESIGN.md) | [preview.html](design-md/goldwin/preview.html) |
| [MOTHERHOUSE (マザーハウス)](https://www.mother-house.jp/) | Bags / Social Enterprise | [DESIGN.md](design-md/motherhouse/DESIGN.md) | [preview.html](design-md/motherhouse/preview.html) |
| [uka (ウカ)](https://www.uka.co.jp/) | Beauty / Nail Care | [DESIGN.md](design-md/uka/DESIGN.md) | [preview.html](design-md/uka/preview.html) |
| [SANU 2nd Home](https://sa-nu.com/) | Second Home / Hospitality | [DESIGN.md](design-md/sanu/DESIGN.md) | [preview.html](design-md/sanu/preview.html) |
| [Francfranc (フランフラン)](https://francfranc.com/) | Interior / Lifestyle EC | [DESIGN.md](design-md/francfranc/DESIGN.md) | [preview.html](design-md/francfranc/preview.html) |
| [KEYUCA (ケユカ)](https://www.keyuca.com/) | Furniture / Lifestyle EC | [DESIGN.md](design-md/keyuca/DESIGN.md) | [preview.html](design-md/keyuca/preview.html) |
| [Minimal (ミニマル)](https://mini-mal.tokyo/) | Craft Chocolate / D2C | [DESIGN.md](design-md/minimal/DESIGN.md) | [preview.html](design-md/minimal/preview.html) |
| [ORBIS (オルビス)](https://www.orbis.co.jp/) | Cosmetics / Beauty | [DESIGN.md](design-md/orbis/DESIGN.md) | [preview.html](design-md/orbis/preview.html) |
| [BOTANIST (ボタニスト)](https://botanistofficial.com/) | Botanical Hair & Body Care | [DESIGN.md](design-md/botanist/DESIGN.md) | [preview.html](design-md/botanist/preview.html) |
| [KASHIYAMA (カシヤマ)](https://kashiyama1927.jp/) | Custom Order Suits / Fashion | [DESIGN.md](design-md/kashiyama/DESIGN.md) | [preview.html](design-md/kashiyama/preview.html) |
| [TENTIAL](https://tential.jp/) | Wellness / Conditioning EC | [DESIGN.md](design-md/tential/DESIGN.md) | [preview.html](design-md/tential/preview.html) |
| [10YC](https://10yc.jp/) | D2C Fashion / Sustainability | [DESIGN.md](design-md/10yc/DESIGN.md) | [preview.html](design-md/10yc/preview.html) |
| [LUMINE (ルミネ)](https://www.lumine.ne.jp/) | Fashion Retail / Commercial Complex | [DESIGN.md](design-md/lumine/DESIGN.md) | [preview.html](design-md/lumine/preview.html) |
| [nanamica (ナナミカ)](https://www.nanamica.com/) | Premium Outdoor / Fashion | [DESIGN.md](design-md/nanamica/DESIGN.md) | [preview.html](design-md/nanamica/preview.html) |
| [IPSA (イプサ)](https://www.ipsa.co.jp/) | Cosmetics / Skincare | [DESIGN.md](design-md/ipsa/DESIGN.md) | [preview.html](design-md/ipsa/preview.html) |
| [YAMAP (ヤマップ)](https://yamap.com/) | Outdoor / Community App | [DESIGN.md](design-md/yamap/DESIGN.md) | [preview.html](design-md/yamap/preview.html) |
| [COHINA (コヒナ)](https://cohina.net/) | D2C Fashion / Petite | [DESIGN.md](design-md/cohina/DESIGN.md) | [preview.html](design-md/cohina/preview.html) |
| [and wander (アンドワンダー)](https://www.andwander.com/) | Outdoor Fashion / Technical Wear | [DESIGN.md](design-md/andwander/DESIGN.md) | [preview.html](design-md/andwander/preview.html) |
| [SONY (ソニー)](https://www.sony.co.jp/) | Electronics / Entertainment | [DESIGN.md](design-md/sony/DESIGN.md) | [preview.html](design-md/sony/preview.html) |
| [DESCENTE (デサント)](https://www.descente.co.jp/) | Sportswear / Corporate | [DESIGN.md](design-md/descente/DESIGN.md) | [preview.html](design-md/descente/preview.html) |
| [TOTO](https://jp.toto.com/) | Housing Equipment / Corporate | [DESIGN.md](design-md/toto/DESIGN.md) | [preview.html](design-md/toto/preview.html) |
| [KUON (クオン)](https://kuon.tokyo/) | Fashion / Artisanal Menswear | [DESIGN.md](design-md/kuon/DESIGN.md) | [preview.html](design-md/kuon/preview.html) |
| [ReFa (リファ)](https://www.refa.net/) | Beauty Device / Premium Beauty | [DESIGN.md](design-md/refa/DESIGN.md) | [preview.html](design-md/refa/preview.html) |
| [mt masking tape](https://www.masking-tape.jp/) | Stationery / Design Tape | [DESIGN.md](design-md/mt/DESIGN.md) | [preview.html](design-md/mt/preview.html) |
| [FUJIFILM (富士フイルム)](https://www.fujifilm.com/jp/ja) | Imaging / Healthcare / Corporate | [DESIGN.md](design-md/fujifilm/DESIGN.md) | [preview.html](design-md/fujifilm/preview.html) |
| [UNITED ARROWS (ユナイテッドアローズ)](https://www.united-arrows.co.jp/) | Fashion / Select Shop Corporate | [DESIGN.md](design-md/united-arrows/DESIGN.md) | [preview.html](design-md/united-arrows/preview.html) |
| [KIRIN (キリン)](https://www.kirin.co.jp/) | Beverage / Corporate | [DESIGN.md](design-md/kirin/DESIGN.md) | [preview.html](design-md/kirin/preview.html) |
| [Mizuno (ミズノ)](https://www.mizuno.jp/) | Sports / EC | [DESIGN.md](design-md/mizuno/DESIGN.md) | [preview.html](design-md/mizuno/preview.html) |
| [PILOT (パイロット)](https://www.pilot.co.jp/) | Writing Instruments / Stationery | [DESIGN.md](design-md/pilot/DESIGN.md) | [preview.html](design-md/pilot/preview.html) |
| [SHARP (シャープ)](https://jp.sharp/) | Electronics / Home Appliance | [DESIGN.md](design-md/sharp/DESIGN.md) | [preview.html](design-md/sharp/preview.html) |
| [Panasonic (パナソニック)](https://www.panasonic.com/jp/) | Electronics / Consumer Tech | [DESIGN.md](design-md/panasonic/DESIGN.md) | [preview.html](design-md/panasonic/preview.html) |
| [MIKIMOTO (ミキモト)](https://www.mikimoto.com/jp-ja/) | Luxury Jewelry / Heritage | [DESIGN.md](design-md/mikimoto/DESIGN.md) | [preview.html](design-md/mikimoto/preview.html) |
| [SAPPORO (サッポロビール)](https://www.sapporobeer.jp/) | Beverage / Corporate | [DESIGN.md](design-md/sapporo/DESIGN.md) | [preview.html](design-md/sapporo/preview.html) |
| [LOFT (ロフト)](https://www.loft.co.jp/) | Retail / Lifestyle | [DESIGN.md](design-md/loft/DESIGN.md) | [preview.html](design-md/loft/preview.html) |
| [Canon (キヤノン)](https://canon.jp/) | Imaging / Electronics | [DESIGN.md](design-md/canon/DESIGN.md) | [preview.html](design-md/canon/preview.html) |
| [SUBARU (スバル)](https://www.subaru.jp/) | Automotive | [DESIGN.md](design-md/subaru/DESIGN.md) | [preview.html](design-md/subaru/preview.html) |
| [Hakuhodo (博報堂)](https://www.hakuhodo.co.jp/) | Advertising / Agency | [DESIGN.md](design-md/hakuhodo/DESIGN.md) | [preview.html](design-md/hakuhodo/preview.html) |
| [Cygames (サイゲームス)](https://www.cygames.co.jp/) | Gaming / Entertainment | [DESIGN.md](design-md/cygames/DESIGN.md) | [preview.html](design-md/cygames/preview.html) |
| [OWNDAYS (オンデーズ)](https://www.owndays.com/jp/ja) | Eyewear / Retail | [DESIGN.md](design-md/owndays/DESIGN.md) | [preview.html](design-md/owndays/preview.html) |
| [Lemnos (タカタレムノス)](https://www.lemnos.jp/) | Design Clock / Product Design | [DESIGN.md](design-md/lemnos/DESIGN.md) | [preview.html](design-md/lemnos/preview.html) |
| [GU (ジーユー)](https://www.gu-global.com/jp/ja/) | Fashion / Apparel EC | [DESIGN.md](design-md/gu/DESIGN.md) | [preview.html](design-md/gu/preview.html) |
| [CITIZEN (シチズン)](https://citizen.jp/) | Watch / EC | [DESIGN.md](design-md/citizen/DESIGN.md) | [preview.html](design-md/citizen/preview.html) |
| [CFCL](https://www.cfcl.jp/) | Fashion / 3D Knit | [DESIGN.md](design-md/cfcl/DESIGN.md) | [preview.html](design-md/cfcl/preview.html) |
| [D-BROS (ディーブロス)](https://www.d-bros.jp/) | Design Products / Lifestyle | [DESIGN.md](design-md/d-bros/DESIGN.md) | [preview.html](design-md/d-bros/preview.html) |
| [SIGMA (シグマ)](https://www.sigma-global.com/jp/) | Camera / Optical Equipment | [DESIGN.md](design-md/sigma/DESIGN.md) | [preview.html](design-md/sigma/preview.html) |
| [ITO EN (伊藤園)](https://www.itoen.co.jp/) | Beverage / Tea | [DESIGN.md](design-md/itoen/DESIGN.md) | [preview.html](design-md/itoen/preview.html) |
| [CAINZ (カインズ)](https://www.cainz.com/) | Home Improvement / Retail EC | [DESIGN.md](design-md/cainz/DESIGN.md) | [preview.html](design-md/cainz/preview.html) |
| [Kagome (カゴメ)](https://www.kagome.co.jp/) | Food & Beverage / Corporate | [DESIGN.md](design-md/kagome/DESIGN.md) | [preview.html](design-md/kagome/preview.html) |
| [KAPITAL (キャピタル)](https://www.kapital.jp/) | Fashion / Denim / Heritage | [DESIGN.md](design-md/kapital/DESIGN.md) | [preview.html](design-md/kapital/preview.html) |
| [ANREALAGE (アンリアレイジ)](https://www.anrealage.com/) | Fashion / Avant-Garde | [DESIGN.md](design-md/anrealage/DESIGN.md) | [preview.html](design-md/anrealage/preview.html) |
| [KURKKU FIELDS (クルックフィールズ)](https://kurkkufields.jp/) | Sustainable Farm / Art / Food | [DESIGN.md](design-md/kurkkufields/DESIGN.md) | [preview.html](design-md/kurkkufields/preview.html) |
| [KOSÉ (コーセー)](https://www.kose.co.jp/) | Cosmetics / Beauty EC | [DESIGN.md](design-md/kose/DESIGN.md) | [preview.html](design-md/kose/preview.html) |
| [CASIO (カシオ)](https://www.casio.co.jp/) | Electronics / Corporate | [DESIGN.md](design-md/casio/DESIGN.md) | [preview.html](design-md/casio/preview.html) |
| [HOSOO (細尾)](https://hosoo.co.jp/) | Textile / Heritage Craft | [DESIGN.md](design-md/hosoo/DESIGN.md) | [preview.html](design-md/hosoo/preview.html) |
| [WACOAL (ワコール)](https://www.wacoal.jp/) | Apparel / Innerwear | [DESIGN.md](design-md/wacoal/DESIGN.md) | [preview.html](design-md/wacoal/preview.html) |
| [TIGER (タイガー魔法瓶)](https://www.tiger-corporation.com/) | Home Appliance / Thermos | [DESIGN.md](design-md/tiger/DESIGN.md) | [preview.html](design-md/tiger/preview.html) |
| [KEWPIE (キユーピー)](https://www.kewpie.co.jp/) | Food & Beverage / Consumer | [DESIGN.md](design-md/kewpie/DESIGN.md) | [preview.html](design-md/kewpie/preview.html) |
| [visvim (ビズビム)](https://www.visvim.tv/) | Fashion / Premium Lifestyle | [DESIGN.md](design-md/visvim/DESIGN.md) | [preview.html](design-md/visvim/preview.html) |
| [NEIGHBORHOOD (ネイバーフッド)](https://www.neighborhood.jp/) | Fashion / Streetwear | [DESIGN.md](design-md/neighborhood/DESIGN.md) | [preview.html](design-md/neighborhood/preview.html) |
| [Afternoon Tea (アフタヌーンティー)](https://www.afternoon-tea.net/) | Lifestyle / Retail | [DESIGN.md](design-md/afternoontea/DESIGN.md) | [preview.html](design-md/afternoontea/preview.html) |
| [XECIN](https://xecin.jp/) | Web Development Lab | [DESIGN.md](design-md/xecin/DESIGN.md) | [preview.html](design-md/xecin/preview.html) |

### Previews

<p align="center">
  <a href="https://kzhrknt.github.io/awesome-design-md-jp/gallery.html">Gallery (179 sites)</a>
</p>

<table>
<tr>
<td align="center"><strong>Apple</strong><br><img src="design-md/apple/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MUJI</strong><br><img src="design-md/muji/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mercari</strong><br><img src="design-md/mercari/preview-screenshot.png" width="120"></td>
<td align="center"><strong>STUDIO</strong><br><img src="design-md/studio/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SmartHR</strong><br><img src="design-md/smarthr/preview-screenshot.png" width="120"></td>
<td align="center"><strong>freee</strong><br><img src="design-md/freee/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>note</strong><br><img src="design-md/note/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Novasell</strong><br><img src="design-md/novasell/preview-screenshot.png" width="120"></td>
<td align="center"><strong>WIRED</strong><br><img src="design-md/wired/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Toyota</strong><br><img src="design-md/toyota/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LINE</strong><br><img src="design-md/line/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Cookpad</strong><br><img src="design-md/cookpad/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>MF</strong><br><img src="design-md/moneyforward/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Cybozu</strong><br><img src="design-md/cybozu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Qiita</strong><br><img src="design-md/qiita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Rakuten</strong><br><img src="design-md/rakuten/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Tabelog</strong><br><img src="design-md/tabelog/preview-screenshot.png" width="120"></td>
<td align="center"><strong>pixiv</strong><br><img src="design-md/pixiv/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Zenn</strong><br><img src="design-md/zenn/preview-screenshot.png" width="120"></td>
<td align="center"><strong>connpass</strong><br><img src="design-md/connpass/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Sansan</strong><br><img src="design-md/sansan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Notion</strong><br><img src="design-md/notion/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ABEMA</strong><br><img src="design-md/abema/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Droga5</strong><br><img src="design-md/droga5/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>三菱地所</strong><br><img src="design-md/mec/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Nintendo</strong><br><img src="design-md/nintendo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>UNIQLO</strong><br><img src="design-md/uniqlo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>星野リゾート</strong><br><img src="design-md/hoshinoresorts/preview-screenshot.png" width="120"></td>
<td align="center"><strong>デジタル庁</strong><br><img src="design-md/digital-go/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PayPay</strong><br><img src="design-md/paypay/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>日経電子版</strong><br><img src="design-md/nikkei/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MOSH</strong><br><img src="design-md/mosh/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Shiseido</strong><br><img src="design-md/shiseido/preview-screenshot.png" width="120"></td>
<td align="center"><strong>STORES</strong><br><img src="design-md/stores/preview-screenshot.png" width="120"></td>
<td align="center"><strong>一休.com</strong><br><img src="design-md/ikyu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Wantedly</strong><br><img src="design-md/wantedly/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Snow Peak</strong><br><img src="design-md/snowpeak/preview-screenshot.png" width="120"></td>
<td align="center"><strong>JINS</strong><br><img src="design-md/jins/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Yamaha</strong><br><img src="design-md/yamaha/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BAKE</strong><br><img src="design-md/bake/preview-screenshot.png" width="120"></td>
<td align="center"><strong>nendo</strong><br><img src="design-md/nendo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BEAMS</strong><br><img src="design-md/beams/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Sanrio</strong><br><img src="design-md/sanrio/preview-screenshot.png" width="120"></td>
<td align="center"><strong>吉田カバン</strong><br><img src="design-md/yoshidakaban/preview-screenshot.png" width="120"></td>
<td align="center"><strong>中川政七商店</strong><br><img src="design-md/nakagawa/preview-screenshot.png" width="120"></td>
<td align="center"><strong>POLA</strong><br><img src="design-md/pola/preview-screenshot.png" width="120"></td>
<td align="center"><strong>D&amp;DEPARTMENT</strong><br><img src="design-md/ddepartment/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Takram</strong><br><img src="design-md/takram/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>KOKUYO</strong><br><img src="design-md/kokuyo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>G-Mark</strong><br><img src="design-md/g-mark/preview-screenshot.png" width="120"></td>
<td align="center"><strong>teamLab</strong><br><img src="design-md/teamlab/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ISSEY MIYAKE</strong><br><img src="design-md/isseymiyake/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SOU・SOU</strong><br><img src="design-md/sousou/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PARCO</strong><br><img src="design-md/parco/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>とらや</strong><br><img src="design-md/toraya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>IDÉE</strong><br><img src="design-md/idee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mazda</strong><br><img src="design-md/mazda/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BRUTUS</strong><br><img src="design-md/brutus/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ACTUS</strong><br><img src="design-md/actus/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KINTO</strong><br><img src="design-md/kinto/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>21_21 DS</strong><br><img src="design-md/2121designsight/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Pen Online</strong><br><img src="design-md/penonline/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LEXUS</strong><br><img src="design-md/lexus/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Maruni</strong><br><img src="design-md/maruni/preview-screenshot.png" width="120"></td>
<td align="center"><strong>POPEYE</strong><br><img src="design-md/popeye/preview-screenshot.png" width="120"></td>
<td align="center"><strong>mina perhonen</strong><br><img src="design-md/mina-perhonen/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NDC</strong><br><img src="design-md/ndc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>T-SITE Daikanyama</strong><br><img src="design-md/daikanyama-tsite/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BALMUDA</strong><br><img src="design-md/balmuda/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Hobonichi</strong><br><img src="design-md/hobonichi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>±0</strong><br><img src="design-md/plusminuszero/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Suntory</strong><br><img src="design-md/suntory/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>GINZA SIX</strong><br><img src="design-md/ginza6/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Tokyo Midtown</strong><br><img src="design-md/tokyo-midtown/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Casa BRUTUS</strong><br><img src="design-md/casa-brutus/preview-screenshot.png" width="120"></td>
<td align="center"><strong>AURALEE</strong><br><img src="design-md/auralee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Karimoku NS</strong><br><img src="design-md/karimoku-newstandard/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kakimori</strong><br><img src="design-md/kakimori/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Grand Seiko</strong><br><img src="design-md/grand-seiko/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CIBONE</strong><br><img src="design-md/cibone/preview-screenshot.png" width="120"></td>
<td align="center"><strong>POSTALCO</strong><br><img src="design-md/postalco/preview-screenshot.png" width="120"></td>
<td align="center"><strong>OSAJI</strong><br><img src="design-md/osaji/preview-screenshot.png" width="120"></td>
<td align="center"><strong>45R</strong><br><img src="design-md/45r/preview-screenshot.png" width="120"></td>
<td align="center"><strong>sacai</strong><br><img src="design-md/sacai/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>AKOMEYA</strong><br><img src="design-md/akomeya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mori Art Museum</strong><br><img src="design-md/mori-art-museum/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Vermicular</strong><br><img src="design-md/vermicular/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TRUNK(HOTEL)</strong><br><img src="design-md/trunk-hotel/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Aman Tokyo</strong><br><img src="design-md/aman-tokyo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>土屋鞄</strong><br><img src="design-md/tsuchiya-kaban/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>HARIO</strong><br><img src="design-md/hario/preview-screenshot.png" width="120"></td>
<td align="center"><strong>能作</strong><br><img src="design-md/nousaku/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Aesop</strong><br><img src="design-md/aesop/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOMORROWLAND</strong><br><img src="design-md/tomorrowland/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Calbee</strong><br><img src="design-md/calbee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>YAECA</strong><br><img src="design-md/yaeca/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CLASKA</strong><br><img src="design-md/claska/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DEAN&amp;DELUCA</strong><br><img src="design-md/deandeluca/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TRAVELER'S</strong><br><img src="design-md/travelers-company/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Dandelion</strong><br><img src="design-md/dandelionchocolate/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HIGASHIYA</strong><br><img src="design-md/higashiya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Soup Stock</strong><br><img src="design-md/soupstocktokyo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>1616/arita</strong><br><img src="design-md/1616arita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>THREE</strong><br><img src="design-md/three/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Blue Bottle</strong><br><img src="design-md/bluebottlecoffee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HASAMI</strong><br><img src="design-md/hasami-porcelain/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Spiral</strong><br><img src="design-md/spiral/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MARKS&WEB</strong><br><img src="design-md/marksandweb/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>TODAY'S SPECIAL</strong><br><img src="design-md/todaysspecial/preview-screenshot.png" width="120"></td>
<td align="center"><strong>cado</strong><br><img src="design-md/cado/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SHIRO</strong><br><img src="design-md/shiro/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TRUCK</strong><br><img src="design-md/truck-furniture/preview-screenshot.png" width="120"></td>
<td align="center"><strong>IKEUCHI</strong><br><img src="design-md/ikeuchi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>NOT A HOTEL</strong><br><img src="design-md/notahotel/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>HERALBONY</strong><br><img src="design-md/heralbony/preview-screenshot.png" width="120"></td>
<td align="center"><strong>北欧暮らし</strong><br><img src="design-md/hokuohkurashi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>cowcamo</strong><br><img src="design-md/cowcamo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>FABRIC TOKYO</strong><br><img src="design-md/fabrictokyo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>objcts.io</strong><br><img src="design-md/objcts-io/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Goldwin</strong><br><img src="design-md/goldwin/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>MOTHERHOUSE</strong><br><img src="design-md/motherhouse/preview-screenshot.png" width="120"></td>
<td align="center"><strong>uka</strong><br><img src="design-md/uka/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SANU</strong><br><img src="design-md/sanu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Francfranc</strong><br><img src="design-md/francfranc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KEYUCA</strong><br><img src="design-md/keyuca/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Minimal</strong><br><img src="design-md/minimal/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>ORBIS</strong><br><img src="design-md/orbis/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BOTANIST</strong><br><img src="design-md/botanist/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KASHIYAMA</strong><br><img src="design-md/kashiyama/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TENTIAL</strong><br><img src="design-md/tential/preview-screenshot.png" width="120"></td>
<td align="center"><strong>10YC</strong><br><img src="design-md/10yc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LUMINE</strong><br><img src="design-md/lumine/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>nanamica</strong><br><img src="design-md/nanamica/preview-screenshot.png" width="120"></td>
<td align="center"><strong>IPSA</strong><br><img src="design-md/ipsa/preview-screenshot.png" width="120"></td>
<td align="center"><strong>YAMAP</strong><br><img src="design-md/yamap/preview-screenshot.png" width="120"></td>
<td align="center"><strong>COHINA</strong><br><img src="design-md/cohina/preview-screenshot.png" width="120"></td>
<td align="center"><strong>and wander</strong><br><img src="design-md/andwander/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SONY</strong><br><img src="design-md/sony/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DESCENTE</strong><br><img src="design-md/descente/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOTO</strong><br><img src="design-md/toto/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>KUON</strong><br><img src="design-md/kuon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ReFa</strong><br><img src="design-md/refa/preview-screenshot.png" width="120"></td>
<td align="center"><strong>mt</strong><br><img src="design-md/mt/preview-screenshot.png" width="120"></td>
<td align="center"><strong>FUJIFILM</strong><br><img src="design-md/fujifilm/preview-screenshot.png" width="120"></td>
<td align="center"><strong>UNITED ARROWS</strong><br><img src="design-md/united-arrows/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KIRIN</strong><br><img src="design-md/kirin/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mizuno</strong><br><img src="design-md/mizuno/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PILOT</strong><br><img src="design-md/pilot/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SHARP</strong><br><img src="design-md/sharp/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Panasonic</strong><br><img src="design-md/panasonic/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MIKIMOTO</strong><br><img src="design-md/mikimoto/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SAPPORO</strong><br><img src="design-md/sapporo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LOFT</strong><br><img src="design-md/loft/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Canon</strong><br><img src="design-md/canon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SUBARU</strong><br><img src="design-md/subaru/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Hakuhodo</strong><br><img src="design-md/hakuhodo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Cygames</strong><br><img src="design-md/cygames/preview-screenshot.png" width="120"></td>
<td align="center"><strong>OWNDAYS</strong><br><img src="design-md/owndays/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LEMNOS</strong><br><img src="design-md/lemnos/preview-screenshot.png" width="120"></td>
<td align="center"><strong>GU</strong><br><img src="design-md/gu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CITIZEN</strong><br><img src="design-md/citizen/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CFCL</strong><br><img src="design-md/cfcl/preview-screenshot.png" width="120"></td>
<td align="center"><strong>D-BROS</strong><br><img src="design-md/d-bros/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SIGMA</strong><br><img src="design-md/sigma/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ITO EN</strong><br><img src="design-md/itoen/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CAINZ</strong><br><img src="design-md/cainz/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kagome</strong><br><img src="design-md/kagome/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>KAPITAL</strong><br><img src="design-md/kapital/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ANREALAGE</strong><br><img src="design-md/anrealage/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KURKKU FIELDS</strong><br><img src="design-md/kurkkufields/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KOSÉ</strong><br><img src="design-md/kose/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CASIO</strong><br><img src="design-md/casio/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HOSOO</strong><br><img src="design-md/hosoo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>WACOAL</strong><br><img src="design-md/wacoal/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TIGER</strong><br><img src="design-md/tiger/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kewpie</strong><br><img src="design-md/kewpie/preview-screenshot.png" width="120"></td>
<td align="center"><strong>visvim</strong><br><img src="design-md/visvim/preview-screenshot.png" width="120"></td>
<td align="center"><strong>NEIGHBORHOOD</strong><br><img src="design-md/neighborhood/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Afternoon Tea</strong><br><img src="design-md/afternoontea/preview-screenshot.png" width="120"></td>
</tr>
</table>

### Template

Use [`template/DESIGN.md`](template/DESIGN.md) to create your own Japanese DESIGN.md. It extends the standard 9-section format with detailed Japanese typography subsections.

---

## Credits

Inspired by [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md). The 9-section DESIGN.md format and preview.html concept originate from that project.

## Disclaimer

The DESIGN.md files in this repository are **not official design system documentation** from the respective companies. All design token values are extracted from publicly available CSS on each service's website using browser computed styles. Service names and trademarks belong to their respective owners.

## License

[MIT](LICENSE)
