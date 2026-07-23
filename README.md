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
  <a href="https://kzhrknt.github.io/awesome-design-md-jp/gallery.html">Gallery (405 sites)</a>
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
<tr>
<td align="center"><strong>shu uemura</strong><br><img src="design-md/shuuemura/preview-screenshot.png" width="120"></td>
<td align="center"><strong>YOKU MOKU</strong><br><img src="design-md/yokumoku/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HUMAN MADE</strong><br><img src="design-md/humanmade/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Notion Dev</strong><br><img src="design-md/notion-dev/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ZOZO</strong><br><img src="design-md/zozo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CyberAgent</strong><br><img src="design-md/cyberagent/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LIFULL</strong><br><img src="design-md/lifull/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BASE</strong><br><img src="design-md/base/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DAIKIN</strong><br><img src="design-md/daikin/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Recruit</strong><br><img src="design-md/recruit/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ATON</strong><br><img src="design-md/aton/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mame Kurogouchi</strong><br><img src="design-md/mamekurogouchi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PRESS BUTTER SAND</strong><br><img src="design-md/buttersand/preview-screenshot.png" width="120"></td>
<td align="center"><strong>RMK</strong><br><img src="design-md/rmk/preview-screenshot.png" width="120"></td>
<td align="center"><strong>amadana</strong><br><img src="design-md/amadana/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Oisix</strong><br><img src="design-md/oisix/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>JAL</strong><br><img src="design-md/jal/preview-screenshot.png" width="120"></td>
<td align="center"><strong>タイミー</strong><br><img src="design-md/timee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kyash</strong><br><img src="design-md/kyash/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Honda</strong><br><img src="design-md/honda/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ANA</strong><br><img src="design-md/ana/preview-screenshot.png" width="120"></td>
<td align="center"><strong>一保堂茶舗</strong><br><img src="design-md/ippodo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DECORTÉ</strong><br><img src="design-md/decorte/preview-screenshot.png" width="120"></td>
<td align="center"><strong>tokyobike</strong><br><img src="design-md/tokyobike/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MOONSTAR</strong><br><img src="design-md/moonstar/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TASAKI</strong><br><img src="design-md/tasaki/preview-screenshot.png" width="120"></td>
<td align="center"><strong>COEDO</strong><br><img src="design-md/coedo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ITOYA</strong><br><img src="design-md/itoya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>dentsu</strong><br><img src="design-md/dentsu/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>graniph</strong><br><img src="design-md/graniph/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Fujitsu</strong><br><img src="design-md/fujitsu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Onitsuka Tiger</strong><br><img src="design-md/onitsukatiger/preview-screenshot.png" width="120"></td>
<td align="center"><strong>URBAN RESEARCH</strong><br><img src="design-md/urbanresearch/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SNIDEL</strong><br><img src="design-md/snidel/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DAISO</strong><br><img src="design-md/daiso/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ニトリ</strong><br><img src="design-md/nitori/preview-screenshot.png" width="120"></td>
<td align="center"><strong>JILL STUART Beauty</strong><br><img src="design-md/jillstuart-beauty/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NISSAN</strong><br><img src="design-md/nissan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Meiji</strong><br><img src="design-md/meiji/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Roland</strong><br><img src="design-md/roland/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BAPE</strong><br><img src="design-md/bape/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SHIPS</strong><br><img src="design-md/ships/preview-screenshot.png" width="120"></td>
<td align="center"><strong>GANZO</strong><br><img src="design-md/ganzo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Studio Ghibli</strong><br><img src="design-md/ghibli/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Seiko</strong><br><img src="design-md/seiko/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Asahi Beer</strong><br><img src="design-md/asahibeer/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Nikon</strong><br><img src="design-md/nikon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ROYCE'</strong><br><img src="design-md/royce/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KEYENCE</strong><br><img src="design-md/keyence/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Yohji Yamamoto</strong><br><img src="design-md/yohjiyamamoto/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Wacom</strong><br><img src="design-md/wacom/preview-screenshot.png" width="120"></td>
<td align="center"><strong>白鳳堂</strong><br><img src="design-md/hakuhodo-brushes/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Shimano</strong><br><img src="design-md/shimano/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Bridgestone</strong><br><img src="design-md/bridgestone/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Yonex</strong><br><img src="design-md/yonex/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Nissin</strong><br><img src="design-md/nissin/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HYKE</strong><br><img src="design-md/hyke/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Komeda</strong><br><img src="design-md/komeda/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Zoff</strong><br><img src="design-md/zoff/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LUPICIA</strong><br><img src="design-md/lupicia/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Tabio</strong><br><img src="design-md/tabio/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Glico</strong><br><img src="design-md/glico/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kao</strong><br><img src="design-md/kao/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Morinaga</strong><br><img src="design-md/morinaga/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>LIXIL</strong><br><img src="design-md/lixil/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Ajinomoto</strong><br><img src="design-md/ajinomoto/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BANDAI NAMCO</strong><br><img src="design-md/bandainamco/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>LAWSON</strong><br><img src="design-md/lawson/preview-screenshot.png" width="120"></td>
<td align="center"><strong>青山フラワーマーケット</strong><br><img src="design-md/aoyamaflowermarket/preview-screenshot.png" width="120"></td>
<td align="center"><strong>猿田彦珈琲</strong><br><img src="design-md/sarutahiko/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NTT Group</strong><br><img src="design-md/ntt/preview-screenshot.png" width="120"></td>
<td align="center"><strong>伊藤忠商事</strong><br><img src="design-md/itochu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>住友林業</strong><br><img src="design-md/sumitomo-forestry/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>日立製作所</strong><br><img src="design-md/hitachi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>三井不動産</strong><br><img src="design-md/mitsui-fudosan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>クボタ</strong><br><img src="design-md/kubota/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>一風堂</strong><br><img src="design-md/ippudo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ZENB</strong><br><img src="design-md/zenb/preview-screenshot.png" width="120"></td>
<td align="center"><strong>クラシル</strong><br><img src="design-md/kurashiru/preview-screenshot.png" width="120"></td>
<td align="center"><strong>大和ハウス</strong><br><img src="design-md/daiwahouse/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOPPAN</strong><br><img src="design-md/toppan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>AGC</strong><br><img src="design-md/agc/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SEGA</strong><br><img src="design-md/sega/preview-screenshot.png" width="120"></td>
<td align="center"><strong>積水ハウス</strong><br><img src="design-md/sekisuihouse/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Audio-Technica</strong><br><img src="design-md/audio-technica/preview-screenshot.png" width="120"></td>
<td align="center"><strong>NTTドコモ</strong><br><img src="design-md/docomo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SAKE HUNDRED</strong><br><img src="design-md/sakehundred/preview-screenshot.png" width="120"></td>
<td align="center"><strong>FELISSIMO</strong><br><img src="design-md/felissimo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>MIXI</strong><br><img src="design-md/mixi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DeNA</strong><br><img src="design-md/dena/preview-screenshot.png" width="120"></td>
<td align="center"><strong>カルピス</strong><br><img src="design-md/calpis/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>WHILL</strong><br><img src="design-md/whill/preview-screenshot.png" width="120"></td>
<td align="center"><strong>niko and...</strong><br><img src="design-md/nikoand/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DULTON</strong><br><img src="design-md/dulton/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>GREEN SPOON</strong><br><img src="design-md/greenspoon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HIGHTIDE</strong><br><img src="design-md/hightide/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LOWYA</strong><br><img src="design-md/lowya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Yakult</strong><br><img src="design-md/yakult/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Brother</strong><br><img src="design-md/brother/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ZOJIRUSHI</strong><br><img src="design-md/zojirushi/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>TAKEO</strong><br><img src="design-md/takeo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Sghr</strong><br><img src="design-md/sghr/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TENERITA</strong><br><img src="design-md/tenerita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>AMBUSH</strong><br><img src="design-md/ambush/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Clé de Peau</strong><br><img src="design-md/cledepeau/preview-screenshot.png" width="120"></td>
<td align="center"><strong>FANCL</strong><br><img src="design-md/fancl/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SoftBank</strong><br><img src="design-md/softbank/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KALDI</strong><br><img src="design-md/kaldi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>nano universe</strong><br><img src="design-md/nanouniverse/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>OMRON</strong><br><img src="design-md/omron/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SUQQU</strong><br><img src="design-md/suqqu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ポカリスエット</strong><br><img src="design-md/pocarisweat/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DASSAI</strong><br><img src="design-md/dassai/preview-screenshot.png" width="120"></td>
<td align="center"><strong>UNDERCOVER</strong><br><img src="design-md/undercover/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LUSH</strong><br><img src="design-md/lush/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NANGA</strong><br><img src="design-md/nanga/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KURAND</strong><br><img src="design-md/kurand/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Time & Style</strong><br><img src="design-md/timeandstyle/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Hender Scheme</strong><br><img src="design-md/henderscheme/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Spiber</strong><br><img src="design-md/spiber/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ARTS&SCIENCE</strong><br><img src="design-md/arts-science/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SUZUKI</strong><br><img src="design-md/suzuki/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TANITA</strong><br><img src="design-md/tanita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ASKUL</strong><br><img src="design-md/askul/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>LUUP</strong><br><img src="design-md/luup/preview-screenshot.png" width="120"></td>
<td align="center"><strong>RAKSUL</strong><br><img src="design-md/raksul/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Benesse</strong><br><img src="design-md/benesse/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>貝印</strong><br><img src="design-md/kai/preview-screenshot.png" width="120"></td>
<td align="center"><strong>一蘭</strong><br><img src="design-md/ichiran/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BAYCREW'S</strong><br><img src="design-md/baycrew/preview-screenshot.png" width="120"></td>
<td align="center"><strong>1LDK</strong><br><img src="design-md/1ldk/preview-screenshot.png" width="120"></td>
<td align="center"><strong>aeru</strong><br><img src="design-md/aeru/preview-screenshot.png" width="120"></td>
<td align="center"><strong>cotogoto</strong><br><img src="design-md/cotogoto/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CAMPFIRE</strong><br><img src="design-md/campfire/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Creema</strong><br><img src="design-md/creema/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Chatwork</strong><br><img src="design-md/chatwork/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Hands</strong><br><img src="design-md/hands/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PLST</strong><br><img src="design-md/plst/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MOS BURGER</strong><br><img src="design-md/mosburger/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CHOYA</strong><br><img src="design-md/choya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TULLY'S</strong><br><img src="design-md/tullys/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kalita</strong><br><img src="design-md/kalita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ALBION</strong><br><img src="design-md/albion/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Square Enix</strong><br><img src="design-md/square-enix/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ITOKI</strong><br><img src="design-md/itoki/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>mont-bell</strong><br><img src="design-md/montbell/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CAPCOM</strong><br><img src="design-md/capcom/preview-screenshot.png" width="120"></td>
<td align="center"><strong>UCC</strong><br><img src="design-md/ucc/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Kyocera</strong><br><img src="design-md/kyocera/preview-screenshot.png" width="120"></td>
<td align="center"><strong>au</strong><br><img src="design-md/au/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ENEOS</strong><br><img src="design-md/eneos/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>TOKYU</strong><br><img src="design-md/tokyu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LOTTE</strong><br><img src="design-md/lotte/preview-screenshot.png" width="120"></td>
<td align="center"><strong>高島屋</strong><br><img src="design-md/takashimaya/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>KUMON</strong><br><img src="design-md/kumon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>東京メトロ</strong><br><img src="design-md/tokyometro/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Epson</strong><br><img src="design-md/epson/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>キッコーマン</strong><br><img src="design-md/kikkoman/preview-screenshot.png" width="120"></td>
<td align="center"><strong>JR東日本</strong><br><img src="design-md/jreast/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOSHIBA</strong><br><img src="design-md/toshiba/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SmartNews</strong><br><img src="design-md/smartnews/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOMBOW</strong><br><img src="design-md/tombow/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KING JIM</strong><br><img src="design-md/kingjim/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>mybest</strong><br><img src="design-md/mybest/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Ubie</strong><br><img src="design-md/ubie/preview-screenshot.png" width="120"></td>
<td align="center"><strong>READYFOR</strong><br><img src="design-md/readyfor/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Plaid</strong><br><img src="design-md/plaid/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LayerX</strong><br><img src="design-md/layerx/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Schoo</strong><br><img src="design-md/schoo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>THE</strong><br><img src="design-md/the/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CLAS</strong><br><img src="design-md/clas/preview-screenshot.png" width="120"></td>
<td align="center"><strong>graf</strong><br><img src="design-md/graf/preview-screenshot.png" width="120"></td>
<td align="center"><strong>10X</strong><br><img src="design-md/10x/preview-screenshot.png" width="120"></td>
<td align="center"><strong>NEWT</strong><br><img src="design-md/newt/preview-screenshot.png" width="120"></td>
<td align="center"><strong>天童木工</strong><br><img src="design-md/tendo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>&Premium</strong><br><img src="design-md/and-premium/preview-screenshot.png" width="120"></td>
<td align="center"><strong>GO</strong><br><img src="design-md/goinc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>OMO</strong><br><img src="design-md/omo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MOHEIM</strong><br><img src="design-md/moheim/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TENGA</strong><br><img src="design-md/tenga/preview-screenshot.png" width="120"></td>
<td align="center"><strong>K5</strong><br><img src="design-md/k5/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>TYPICA</strong><br><img src="design-md/typica/preview-screenshot.png" width="120"></td>
<td align="center"><strong>東京茶寮</strong><br><img src="design-md/tokyosaryo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DDD HOTEL</strong><br><img src="design-md/dddhotel/preview-screenshot.png" width="120"></td>
<td align="center"><strong>AXIS</strong><br><img src="design-md/axis/preview-screenshot.png" width="120"></td>
<td align="center"><strong>good design company</strong><br><img src="design-md/good-design-company/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DRAFT</strong><br><img src="design-md/draft/preview-screenshot.png" width="120"></td>
<td align="center"><strong>茅乃舎</strong><br><img src="design-md/kayanoya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Graphpaper</strong><br><img src="design-md/graphpaper/preview-screenshot.png" width="120"></td>
<td align="center"><strong>美術手帖</strong><br><img src="design-md/bijutsutecho/preview-screenshot.png" width="120"></td>
<td align="center"><strong>石巻工房</strong><br><img src="design-md/ishinomaki-lab/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NOHGA HOTEL</strong><br><img src="design-md/nohga-hotel/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PostCoffee</strong><br><img src="design-md/postcoffee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Ambientec</strong><br><img src="design-md/ambientec/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>釜浅商店</strong><br><img src="design-md/kamaasa/preview-screenshot.png" width="120"></td>
<td align="center"><strong>東屋</strong><br><img src="design-md/azmaya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>たねや</strong><br><img src="design-md/taneya/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>White Mtn.</strong><br><img src="design-md/whitemountaineering/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Artizon</strong><br><img src="design-md/artizon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>カンディハウス</strong><br><img src="design-md/condehouse/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Celvoke</strong><br><img src="design-md/celvoke/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Discover Japan</strong><br><img src="design-md/discoverjapan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BAUM</strong><br><img src="design-md/baum/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CINRA</strong><br><img src="design-md/cinra/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Loftwork</strong><br><img src="design-md/loftwork/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Subsequence</strong><br><img src="design-md/subsequence/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>PUEBCO</strong><br><img src="design-md/puebco/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Landscape Products</strong><br><img src="design-md/landscape-products/preview-screenshot.png" width="120"></td>
<td align="center"><strong>金沢21世紀美術館</strong><br><img src="design-md/kanazawa21/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>ONIBUS COFFEE</strong><br><img src="design-md/onibuscoffee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>暮しの手帖</strong><br><img src="design-md/kurashi-no-techo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BIOTOP</strong><br><img src="design-md/biotop/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>オカムラ</strong><br><img src="design-md/okamura/preview-screenshot.png" width="120"></td>
<td align="center"><strong>飛騨産業</strong><br><img src="design-md/hida/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>MARKAWARE</strong><br><img src="design-md/markaware/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SIX</strong><br><img src="design-md/sixinc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>kolor</strong><br><img src="design-md/kolor/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>開化堂</strong><br><img src="design-md/kaikado/preview-screenshot.png" width="120"></td>
<td align="center"><strong>山と道</strong><br><img src="design-md/yamatomichi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SIWA｜紙和</strong><br><img src="design-md/siwa/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DELFONICS</strong><br><img src="design-md/delfonics/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HASUNA</strong><br><img src="design-md/hasuna/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SIRI SIRI</strong><br><img src="design-md/sirisiri/preview-screenshot.png" width="120"></td>
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
| [Notion Dev](https://www.notion.com/ja/product/dev) | Developer Platform | [DESIGN.md](design-md/notion-dev/DESIGN.md) | [preview.html](design-md/notion-dev/preview.html) |
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
| [shu uemura (シュウ ウエムラ)](https://www.shuuemura.jp/) | Cosmetics / Beauty | [DESIGN.md](design-md/shuuemura/DESIGN.md) | [preview.html](design-md/shuuemura/preview.html) |
| [YOKU MOKU (ヨックモック)](https://www.yokumoku.co.jp/) | Confectionery / Premium Gift | [DESIGN.md](design-md/yokumoku/DESIGN.md) | [preview.html](design-md/yokumoku/preview.html) |
| [HUMAN MADE (ヒューマンメイド)](https://humanmade.jp/) | Fashion / Streetwear | [DESIGN.md](design-md/humanmade/DESIGN.md) | [preview.html](design-md/humanmade/preview.html) |
| [ZOZO (ゾゾ)](https://corp.zozo.com/) | Fashion Tech / Corporate | [DESIGN.md](design-md/zozo/DESIGN.md) | [preview.html](design-md/zozo/preview.html) |
| [CyberAgent (サイバーエージェント)](https://www.cyberagent.co.jp/) | Internet / Media / Corporate | [DESIGN.md](design-md/cyberagent/DESIGN.md) | [preview.html](design-md/cyberagent/preview.html) |
| [LIFULL (ライフル)](https://lifull.com/) | Real Estate Tech / Corporate | [DESIGN.md](design-md/lifull/DESIGN.md) | [preview.html](design-md/lifull/preview.html) |
| [BASE (ベイス)](https://thebase.com/) | EC Platform / SaaS | [DESIGN.md](design-md/base/DESIGN.md) | [preview.html](design-md/base/preview.html) |
| [DAIKIN (ダイキン工業)](https://www.daikin.co.jp/) | HVAC / Manufacturing / Corporate | [DESIGN.md](design-md/daikin/DESIGN.md) | [preview.html](design-md/daikin/preview.html) |
| [Recruit (リクルート)](https://www.recruit.co.jp/) | Tech / HR / Corporate | [DESIGN.md](design-md/recruit/DESIGN.md) | [preview.html](design-md/recruit/preview.html) |
| [ATON (エイトン)](https://aton-tokyo.com/) | Fashion / Luxury | [DESIGN.md](design-md/aton/DESIGN.md) | [preview.html](design-md/aton/preview.html) |
| [Mame Kurogouchi (マメクロゴウチ)](https://www.mamekurogouchi.com/) | Fashion / Haute Couture | [DESIGN.md](design-md/mamekurogouchi/DESIGN.md) | [preview.html](design-md/mamekurogouchi/preview.html) |
| [PRESS BUTTER SAND (プレスバターサンド)](https://buttersand.com/) | Confectionery / Food | [DESIGN.md](design-md/buttersand/DESIGN.md) | [preview.html](design-md/buttersand/preview.html) |
| [RMK](https://www.rmkrmk.com/ja) | Cosmetics / Beauty | [DESIGN.md](design-md/rmk/DESIGN.md) | [preview.html](design-md/rmk/preview.html) |
| [amadana](https://amadana.com/) | Electronics / Lifestyle | [DESIGN.md](design-md/amadana/DESIGN.md) | [preview.html](design-md/amadana/preview.html) |
| [Oisix ra daichi](https://www.oisixradaichi.co.jp/) | Food / Agriculture | [DESIGN.md](design-md/oisix/DESIGN.md) | [preview.html](design-md/oisix/preview.html) |
| [JAL (日本航空)](https://www.jal.co.jp/) | Aviation / Consumer | [DESIGN.md](design-md/jal/DESIGN.md) | [preview.html](design-md/jal/preview.html) |
| [Timee (タイミー)](https://timee.co.jp/) | Gig Work / Consumer | [DESIGN.md](design-md/timee/DESIGN.md) | [preview.html](design-md/timee/preview.html) |
| [Kyash (キャッシュ)](https://www.kyash.co/) | Fintech / Consumer | [DESIGN.md](design-md/kyash/DESIGN.md) | [preview.html](design-md/kyash/preview.html) |
| [Goodpatch (グッドパッチ)](https://goodpatch.com/) | Design Company | [DESIGN.md](design-md/goodpatch/DESIGN.md) | [preview.html](design-md/goodpatch/preview.html) |
| [BASE FOOD (ベースフード)](https://basefood.co.jp/) | D2C Food / Complete Nutrition | [DESIGN.md](design-md/basefood/DESIGN.md) | [preview.html](design-md/basefood/preview.html) |
| [Kracie (クラシエ)](https://www.kracie.co.jp/) | Consumer Goods / Healthcare | [DESIGN.md](design-md/kracie/DESIGN.md) | [preview.html](design-md/kracie/preview.html) |
| [Honda (本田技研工業)](https://www.honda.co.jp/) | Automotive / Mobility | [DESIGN.md](design-md/honda/DESIGN.md) | [preview.html](design-md/honda/preview.html) |
| [ANA (全日本空輸)](https://www.ana.co.jp/) | Aviation / Consumer | [DESIGN.md](design-md/ana/DESIGN.md) | [preview.html](design-md/ana/preview.html) |
| [一保堂茶舗 (IPPODO)](https://www.ippodo-tea.co.jp/) | Tea / Traditional Retail | [DESIGN.md](design-md/ippodo/DESIGN.md) | [preview.html](design-md/ippodo/preview.html) |
| [DECORTÉ (コスメデコルテ)](https://www.decorte.com/) | Luxury Cosmetics / Beauty | [DESIGN.md](design-md/decorte/DESIGN.md) | [preview.html](design-md/decorte/preview.html) |
| [tokyobike (トーキョーバイク)](https://tokyobike.com/) | Bicycle / Lifestyle | [DESIGN.md](design-md/tokyobike/DESIGN.md) | [preview.html](design-md/tokyobike/preview.html) |
| [MOONSTAR (ムーンスター)](https://www.moonstar.co.jp/) | Shoes / Heritage Manufacturing | [DESIGN.md](design-md/moonstar/DESIGN.md) | [preview.html](design-md/moonstar/preview.html) |
| [TASAKI (タサキ)](https://www.tasaki.co.jp/) | Luxury Jewelry / Heritage | [DESIGN.md](design-md/tasaki/DESIGN.md) | [preview.html](design-md/tasaki/preview.html) |
| [COEDO Brewery (コエドブルワリー)](https://coedobrewery.com/) | Craft Beer / Beverage | [DESIGN.md](design-md/coedo/DESIGN.md) | [preview.html](design-md/coedo/preview.html) |
| [ITOYA (銀座 伊東屋)](https://www.ito-ya.co.jp/) | Stationery / Heritage Retail | [DESIGN.md](design-md/itoya/DESIGN.md) | [preview.html](design-md/itoya/preview.html) |
| [dentsu (電通)](https://www.dentsu.co.jp/) | Advertising / Agency | [DESIGN.md](design-md/dentsu/DESIGN.md) | [preview.html](design-md/dentsu/preview.html) |
| [graniph (グラニフ)](https://www.graniph.com/) | D2C Fashion / Design T-shirts | [DESIGN.md](design-md/graniph/DESIGN.md) | [preview.html](design-md/graniph/preview.html) |
| [Fujitsu (富士通)](https://www.fujitsu.com/jp/) | Enterprise Tech / Corporate | [DESIGN.md](design-md/fujitsu/DESIGN.md) | [preview.html](design-md/fujitsu/preview.html) |
| [Onitsuka Tiger (オニツカタイガー)](https://www.onitsukatiger.com/jp/ja-jp/) | Fashion / Luxury Sneakers | [DESIGN.md](design-md/onitsukatiger/DESIGN.md) | [preview.html](design-md/onitsukatiger/preview.html) |
| [URBAN RESEARCH (アーバンリサーチ)](https://www.urban-research.jp/) | Select Shop / Fashion EC | [DESIGN.md](design-md/urbanresearch/DESIGN.md) | [preview.html](design-md/urbanresearch/preview.html) |
| [SNIDEL (スナイデル)](https://snidel.com/) | Women's Fashion / D2C | [DESIGN.md](design-md/snidel/DESIGN.md) | [preview.html](design-md/snidel/preview.html) |
| [DAISO (ダイソー)](https://www.daiso-sangyo.co.jp/) | Retail / Variety Store | [DESIGN.md](design-md/daiso/DESIGN.md) | [preview.html](design-md/daiso/preview.html) |
| [Nitori (ニトリ)](https://www.nitori-net.jp/) | Home Furnishing / EC | [DESIGN.md](design-md/nitori/DESIGN.md) | [preview.html](design-md/nitori/preview.html) |
| [JILL STUART Beauty (ジル スチュアート ビューティ)](https://www.jillstuart-beauty.com/) | Luxury Cosmetics / Beauty | [DESIGN.md](design-md/jillstuart-beauty/DESIGN.md) | [preview.html](design-md/jillstuart-beauty/preview.html) |
| [NISSAN (日産自動車)](https://www.nissan.co.jp/) | Automotive / Manufacturing | [DESIGN.md](design-md/nissan/DESIGN.md) | [preview.html](design-md/nissan/preview.html) |
| [Meiji (明治)](https://www.meiji.co.jp/) | Food / Confectionery | [DESIGN.md](design-md/meiji/DESIGN.md) | [preview.html](design-md/meiji/preview.html) |
| [Roland (ローランド)](https://www.roland.com/jp/) | Musical Instruments / Manufacturing | [DESIGN.md](design-md/roland/DESIGN.md) | [preview.html](design-md/roland/preview.html) |
| [BAPE (ア ベイシング エイプ)](https://bape.com/) | Streetwear / Fashion EC | [DESIGN.md](design-md/bape/DESIGN.md) | [preview.html](design-md/bape/preview.html) |
| [SHIPS (シップス)](https://www.shipsltd.co.jp/) | Select Shop / Fashion EC | [DESIGN.md](design-md/ships/DESIGN.md) | [preview.html](design-md/ships/preview.html) |
| [GANZO (ガンゾ)](https://www.ganzo.ne.jp/) | Leather Goods / Craft Luxury | [DESIGN.md](design-md/ganzo/DESIGN.md) | [preview.html](design-md/ganzo/preview.html) |
| [Studio Ghibli (スタジオジブリ)](https://www.ghibli.jp/) | Animation Studio / Entertainment | [DESIGN.md](design-md/ghibli/DESIGN.md) | [preview.html](design-md/ghibli/preview.html) |
| [Seiko (セイコー)](https://www.seikowatches.com/jp-ja/) | Watch / Precision Manufacturing | [DESIGN.md](design-md/seiko/DESIGN.md) | [preview.html](design-md/seiko/preview.html) |
| [Asahi Beer (アサヒビール)](https://www.asahibeer.co.jp/) | Beverage / Brewery | [DESIGN.md](design-md/asahibeer/DESIGN.md) | [preview.html](design-md/asahibeer/preview.html) |
| [Nikon (ニコン)](https://www.nikon.co.jp/) | Camera / Optics Manufacturer | [DESIGN.md](design-md/nikon/DESIGN.md) | [preview.html](design-md/nikon/preview.html) |
| [ROYCE' (ロイズ)](https://www.royce.com/) | Confectionery / Chocolate | [DESIGN.md](design-md/royce/DESIGN.md) | [preview.html](design-md/royce/preview.html) |
| [KEYENCE (キーエンス)](https://www.keyence.co.jp/) | B2B Industrial Sensors / FA | [DESIGN.md](design-md/keyence/DESIGN.md) | [preview.html](design-md/keyence/preview.html) |
| [Yohji Yamamoto (ヨウジヤマモト)](https://www.yohjiyamamoto.co.jp/) | Fashion / Avant-Garde | [DESIGN.md](design-md/yohjiyamamoto/DESIGN.md) | [preview.html](design-md/yohjiyamamoto/preview.html) |
| [Wacom (ワコム)](https://www.wacom.com/ja-jp) | Creative Technology / Pen Tablets | [DESIGN.md](design-md/wacom/DESIGN.md) | [preview.html](design-md/wacom/preview.html) |
| [Hakuhodo Brushes (白鳳堂)](https://www.hakuho-do.co.jp/) | Makeup Brushes / Heritage Craft | [DESIGN.md](design-md/hakuhodo-brushes/DESIGN.md) | [preview.html](design-md/hakuhodo-brushes/preview.html) |
| [Shimano (シマノ)](https://www.shimano.com/jp/) | Precision Components / Manufacturing | [DESIGN.md](design-md/shimano/DESIGN.md) | [preview.html](design-md/shimano/preview.html) |
| [Bridgestone (ブリヂストン)](https://www.bridgestone.co.jp/) | Tire / Manufacturing | [DESIGN.md](design-md/bridgestone/DESIGN.md) | [preview.html](design-md/bridgestone/preview.html) |
| [Yonex (ヨネックス)](https://www.yonex.co.jp/) | Sports Equipment | [DESIGN.md](design-md/yonex/DESIGN.md) | [preview.html](design-md/yonex/preview.html) |
| [Nissin (日清食品)](https://www.nissin.com/jp/) | Food / FMCG | [DESIGN.md](design-md/nissin/DESIGN.md) | [preview.html](design-md/nissin/preview.html) |
| [HYKE](https://hyke.jp/) | Fashion / Apparel | [DESIGN.md](design-md/hyke/DESIGN.md) | [preview.html](design-md/hyke/preview.html) |
| [Komeda (コメダ珈琲店)](https://www.komeda.co.jp/) | Food & Beverage / Café | [DESIGN.md](design-md/komeda/DESIGN.md) | [preview.html](design-md/komeda/preview.html) |
| [Zoff (ゾフ)](https://www.zoff.co.jp/) | Eyewear / Retail | [DESIGN.md](design-md/zoff/DESIGN.md) | [preview.html](design-md/zoff/preview.html) |
| [LUPICIA (ルピシア)](https://www.lupicia.com/) | Tea / Specialty Retail | [DESIGN.md](design-md/lupicia/DESIGN.md) | [preview.html](design-md/lupicia/preview.html) |
| [Tabio (タビオ / 靴下屋)](https://tabio.com/jp/) | Hosiery / Apparel | [DESIGN.md](design-md/tabio/DESIGN.md) | [preview.html](design-md/tabio/preview.html) |
| [Glico (江崎グリコ)](https://www.glico.com/jp/) | Food & Beverage / Confectionery | [DESIGN.md](design-md/glico/DESIGN.md) | [preview.html](design-md/glico/preview.html) |
| [Kao (花王)](https://www.kao.com/jp/) | Consumer Goods / FMCG | [DESIGN.md](design-md/kao/DESIGN.md) | [preview.html](design-md/kao/preview.html) |
| [Morinaga (森永製菓)](https://www.morinaga.co.jp/) | Food & Beverage / Confectionery | [DESIGN.md](design-md/morinaga/DESIGN.md) | [preview.html](design-md/morinaga/preview.html) |
| [LIXIL (リクシル)](https://www.lixil.co.jp/) | Housing / Building Materials | [DESIGN.md](design-md/lixil/DESIGN.md) | [preview.html](design-md/lixil/preview.html) |
| [Ajinomoto (味の素)](https://www.ajinomoto.co.jp/) | Food & Beverage / Amino Science | [DESIGN.md](design-md/ajinomoto/DESIGN.md) | [preview.html](design-md/ajinomoto/preview.html) |
| [BANDAI NAMCO Entertainment](https://www.bandainamcoent.co.jp/) | Gaming / Entertainment | [DESIGN.md](design-md/bandainamco/DESIGN.md) | [preview.html](design-md/bandainamco/preview.html) |
| [LAWSON (ローソン)](https://www.lawson.co.jp/) | Retail / Convenience Store | [DESIGN.md](design-md/lawson/DESIGN.md) | [preview.html](design-md/lawson/preview.html) |
| [Aoyama Flower Market (青山フラワーマーケット)](https://www.aoyamaflowermarket.com/) | Retail / Flower Shop | [DESIGN.md](design-md/aoyamaflowermarket/DESIGN.md) | [preview.html](design-md/aoyamaflowermarket/preview.html) |
| [Sarutahiko Coffee (猿田彦珈琲)](https://sarutahiko.co/) | Food & Beverage / Specialty Coffee | [DESIGN.md](design-md/sarutahiko/DESIGN.md) | [preview.html](design-md/sarutahiko/preview.html) |
| [NTT Group (NTTグループ)](https://group.ntt/jp/) | Telecom / ICT | [DESIGN.md](design-md/ntt/DESIGN.md) | [preview.html](design-md/ntt/preview.html) |
| [ITOCHU Corporation (伊藤忠商事)](https://www.itochu.co.jp/) | Trading / Conglomerate | [DESIGN.md](design-md/itochu/DESIGN.md) | [preview.html](design-md/itochu/preview.html) |
| [Sumitomo Forestry (住友林業)](https://sfc.jp/) | Housing / Forestry | [DESIGN.md](design-md/sumitomo-forestry/DESIGN.md) | [preview.html](design-md/sumitomo-forestry/preview.html) |
| [HITACHI (日立製作所)](https://www.hitachi.co.jp/) | Technology / Industrial | [DESIGN.md](design-md/hitachi/DESIGN.md) | [preview.html](design-md/hitachi/preview.html) |
| [Mitsui Fudosan (三井不動産)](https://www.mitsuifudosan.co.jp/) | Real Estate / Developer | [DESIGN.md](design-md/mitsui-fudosan/DESIGN.md) | [preview.html](design-md/mitsui-fudosan/preview.html) |
| [KUBOTA (クボタ)](https://www.kubota.co.jp/) | Machinery / Agriculture | [DESIGN.md](design-md/kubota/DESIGN.md) | [preview.html](design-md/kubota/preview.html) |
| [IPPUDO (一風堂)](https://www.ippudo.com/) | Food / Restaurant | [DESIGN.md](design-md/ippudo/DESIGN.md) | [preview.html](design-md/ippudo/preview.html) |
| [ZENB (ゼンブ)](https://zenb.jp/) | Food / D2C | [DESIGN.md](design-md/zenb/DESIGN.md) | [preview.html](design-md/zenb/preview.html) |
| [kurashiru (クラシル)](https://www.kurashiru.com/) | Recipe / Media | [DESIGN.md](design-md/kurashiru/DESIGN.md) | [preview.html](design-md/kurashiru/preview.html) |
| [DAIWA HOUSE (大和ハウス工業)](https://www.daiwahouse.co.jp/) | Housing / Construction / Corporate | [DESIGN.md](design-md/daiwahouse/DESIGN.md) | [preview.html](design-md/daiwahouse/preview.html) |
| [TOPPAN (TOPPANホールディングス)](https://www.holdings.toppan.com/ja/) | Printing / Communications / Corporate | [DESIGN.md](design-md/toppan/DESIGN.md) | [preview.html](design-md/toppan/preview.html) |
| [AGC (AGC株式会社)](https://www.agc.com/jp/ja/) | Materials / Glass / Corporate | [DESIGN.md](design-md/agc/DESIGN.md) | [preview.html](design-md/agc/preview.html) |
| [SEGA (セガ)](https://www.sega.co.jp/) | Gaming / Entertainment | [DESIGN.md](design-md/sega/DESIGN.md) | [preview.html](design-md/sega/preview.html) |
| [SEKISUI HOUSE (積水ハウス)](https://www.sekisuihouse.co.jp/) | Housing / Construction | [DESIGN.md](design-md/sekisuihouse/DESIGN.md) | [preview.html](design-md/sekisuihouse/preview.html) |
| [Audio-Technica (オーディオテクニカ)](https://www.audio-technica.co.jp/) | Audio Equipment / Consumer Electronics | [DESIGN.md](design-md/audio-technica/DESIGN.md) | [preview.html](design-md/audio-technica/preview.html) |
| [NTT docomo (NTTドコモ)](https://www.docomo.ne.jp/) | Telecom / Corporate | [DESIGN.md](design-md/docomo/DESIGN.md) | [preview.html](design-md/docomo/preview.html) |
| [SAKE HUNDRED (サケハンドレッド)](https://sake100.com/) | Luxury Sake / D2C | [DESIGN.md](design-md/sakehundred/DESIGN.md) | [preview.html](design-md/sakehundred/preview.html) |
| [FELISSIMO (フェリシモ)](https://www.felissimo.co.jp/) | Lifestyle / Subscription EC | [DESIGN.md](design-md/felissimo/DESIGN.md) | [preview.html](design-md/felissimo/preview.html) |
| [MIXI (ミクシィ)](https://mixi.co.jp/) | Tech / Gaming | [DESIGN.md](design-md/mixi/DESIGN.md) | [preview.html](design-md/mixi/preview.html) |
| [DeNA (ディー・エヌ・エー)](https://dena.com/jp/) | Internet / Entertainment | [DESIGN.md](design-md/dena/DESIGN.md) | [preview.html](design-md/dena/preview.html) |
| [Calpis (カルピス)](https://www.calpis.info/) | Beverage / Consumer Brand | [DESIGN.md](design-md/calpis/DESIGN.md) | [preview.html](design-md/calpis/preview.html) |
| [WHILL (ウィル)](https://whill.inc/) | Mobility / Healthcare | [DESIGN.md](design-md/whill/DESIGN.md) | [preview.html](design-md/whill/preview.html) |
| [niko and... (ニコアンド)](https://www.nikoand.jp/) | Fashion / Lifestyle | [DESIGN.md](design-md/nikoand/DESIGN.md) | [preview.html](design-md/nikoand/preview.html) |
| [DULTON (ダルトン)](https://www.dulton.jp/) | Home Goods / Interior | [DESIGN.md](design-md/dulton/DESIGN.md) | [preview.html](design-md/dulton/preview.html) |
| [GREEN SPOON (グリーンスプーン)](https://green-spoon.jp/) | Food / Subscription | [DESIGN.md](design-md/greenspoon/DESIGN.md) | [preview.html](design-md/greenspoon/preview.html) |
| [HIGHTIDE (ハイタイド)](https://www.hightide.co.jp/) | Stationery / Lifestyle | [DESIGN.md](design-md/hightide/DESIGN.md) | [preview.html](design-md/hightide/preview.html) |
| [LOWYA (ロウヤ)](https://www.low-ya.com/) | Furniture / Interior | [DESIGN.md](design-md/lowya/DESIGN.md) | [preview.html](design-md/lowya/preview.html) |
| [Yakult (ヤクルト)](https://www.yakult.co.jp/) | Food / Beverage | [DESIGN.md](design-md/yakult/DESIGN.md) | [preview.html](design-md/yakult/preview.html) |
| [Brother (ブラザー)](https://www.brother.co.jp/) | Technology / Manufacturing | [DESIGN.md](design-md/brother/DESIGN.md) | [preview.html](design-md/brother/preview.html) |
| [ZOJIRUSHI (象印マホービン)](https://www.zojirushi.co.jp/) | Home Appliances | [DESIGN.md](design-md/zojirushi/DESIGN.md) | [preview.html](design-md/zojirushi/preview.html) |
| [TAKEO (竹尾)](https://www.takeo.co.jp/) | Fine Paper | [DESIGN.md](design-md/takeo/DESIGN.md) | [preview.html](design-md/takeo/preview.html) |
| [Sghr (菅原工芸硝子)](https://www.sugahara.com/) | Handblown Glass | [DESIGN.md](design-md/sghr/DESIGN.md) | [preview.html](design-md/sghr/preview.html) |
| [TENERITA (テネリータ)](https://www.tenerita.com/) | Organic Cotton | [DESIGN.md](design-md/tenerita/DESIGN.md) | [preview.html](design-md/tenerita/preview.html) |
| [AMBUSH (アンブッシュ)](https://www.ambushdesign.com/) | Fashion / Jewelry | [DESIGN.md](design-md/ambush/DESIGN.md) | [preview.html](design-md/ambush/preview.html) |
| [Clé de Peau Beauté (クレ・ド・ポー ボーテ)](https://www.cledepeau-beaute.com/ja-jp/) | Luxury Beauty | [DESIGN.md](design-md/cledepeau/DESIGN.md) | [preview.html](design-md/cledepeau/preview.html) |
| [FANCL (ファンケル)](https://www.fancl.co.jp/) | Beauty / Health | [DESIGN.md](design-md/fancl/DESIGN.md) | [preview.html](design-md/fancl/preview.html) |
| [SoftBank (ソフトバンク)](https://www.softbank.jp/) | Telecom | [DESIGN.md](design-md/softbank/DESIGN.md) | [preview.html](design-md/softbank/preview.html) |
| [KALDI Coffee Farm (カルディ)](https://www.kaldi.co.jp/) | Food Retail | [DESIGN.md](design-md/kaldi/DESIGN.md) | [preview.html](design-md/kaldi/preview.html) |
| [nano universe (ナノ・ユニバース)](https://www.nanouniverse.jp/) | Fashion | [DESIGN.md](design-md/nanouniverse/DESIGN.md) | [preview.html](design-md/nanouniverse/preview.html) |
| [OMRON (オムロン)](https://www.omron.com/jp/ja/) | Healthcare / Electronics | [DESIGN.md](design-md/omron/DESIGN.md) | [preview.html](design-md/omron/preview.html) |
| [SUQQU (スック)](https://www.suqqu.com/ja/) | Luxury Beauty | [DESIGN.md](design-md/suqqu/DESIGN.md) | [preview.html](design-md/suqqu/preview.html) |
| [Pocari Sweat (ポカリスエット)](https://pocarisweat.jp/) | Beverage / Consumer Brand | [DESIGN.md](design-md/pocarisweat/DESIGN.md) | [preview.html](design-md/pocarisweat/preview.html) |
| [DASSAI (獺祭)](https://www.asahishuzo.ne.jp/) | Premium Sake | [DESIGN.md](design-md/dassai/DESIGN.md) | [preview.html](design-md/dassai/preview.html) |
| [UNDERCOVER (アンダーカバー)](https://undercoverism.com/) | Avant-Garde Fashion | [DESIGN.md](design-md/undercover/DESIGN.md) | [preview.html](design-md/undercover/preview.html) |
| [LUSH Japan (ラッシュ)](https://www.lush.com/jp/ja) | Handmade Cosmetics | [DESIGN.md](design-md/lush/DESIGN.md) | [preview.html](design-md/lush/preview.html) |
| [NANGA (ナンガ)](https://nanga.jp/) | Outdoor / Down | [DESIGN.md](design-md/nanga/DESIGN.md) | [preview.html](design-md/nanga/preview.html) |
| [KURAND (クランド)](https://kurand.jp/) | Craft Sake EC | [DESIGN.md](design-md/kurand/DESIGN.md) | [preview.html](design-md/kurand/preview.html) |
| [Time & Style (タイムアンドスタイル)](https://www.timeandstyle.com/jp/) | Premium Furniture | [DESIGN.md](design-md/timeandstyle/DESIGN.md) | [preview.html](design-md/timeandstyle/preview.html) |
| [Hender Scheme (エンダースキーマ)](https://henderscheme.com/) | Leather Goods / Fashion | [DESIGN.md](design-md/henderscheme/DESIGN.md) | [preview.html](design-md/henderscheme/preview.html) |
| [Spiber (スパイバー)](https://spiber.inc/) | Biotech / Materials | [DESIGN.md](design-md/spiber/DESIGN.md) | [preview.html](design-md/spiber/preview.html) |
| [ARTS&SCIENCE (アーツアンドサイエンス)](https://arts-science.com/) | Fashion / Lifestyle | [DESIGN.md](design-md/arts-science/DESIGN.md) | [preview.html](design-md/arts-science/preview.html) |
| [SUZUKI (スズキ)](https://www.suzuki.co.jp/) | Automotive | [DESIGN.md](design-md/suzuki/DESIGN.md) | [preview.html](design-md/suzuki/preview.html) |
| [TANITA (タニタ)](https://www.tanita.co.jp/) | Health / Wellness | [DESIGN.md](design-md/tanita/DESIGN.md) | [preview.html](design-md/tanita/preview.html) |
| [ASKUL (アスクル)](https://www.askul.co.jp/) | Office Supplies / EC | [DESIGN.md](design-md/askul/DESIGN.md) | [preview.html](design-md/askul/preview.html) |
| [LUUP (ループ)](https://luup.sc/) | Mobility / Sharing | [DESIGN.md](design-md/luup/DESIGN.md) | [preview.html](design-md/luup/preview.html) |
| [RAKSUL (ラクスル)](https://raksul.com/) | Printing / EC | [DESIGN.md](design-md/raksul/DESIGN.md) | [preview.html](design-md/raksul/preview.html) |
| [Benesse (ベネッセ)](https://www.benesse.co.jp/) | Education / Corporate | [DESIGN.md](design-md/benesse/DESIGN.md) | [preview.html](design-md/benesse/preview.html) |
| [KAI (貝印)](https://www.kai-group.com/) | Kitchen / Beauty / Manufacturing | [DESIGN.md](design-md/kai/DESIGN.md) | [preview.html](design-md/kai/preview.html) |
| [ICHIRAN (一蘭)](https://ichiran.com/) | Food / Restaurant | [DESIGN.md](design-md/ichiran/DESIGN.md) | [preview.html](design-md/ichiran/preview.html) |
| [BAYCREW'S (ベイクルーズ)](https://baycrews.jp/) | Fashion EC / Retail | [DESIGN.md](design-md/baycrew/DESIGN.md) | [preview.html](design-md/baycrew/preview.html) |
| [1LDK](https://1ldkshop.com/) | Fashion / Select Shop | [DESIGN.md](design-md/1ldk/DESIGN.md) | [preview.html](design-md/1ldk/preview.html) |
| [aeru (和える)](https://a-eru.co.jp/) | Traditional Crafts / Social Enterprise | [DESIGN.md](design-md/aeru/DESIGN.md) | [preview.html](design-md/aeru/preview.html) |
| [cotogoto (コトゴト)](https://www.cotogoto.jp/) | Kitchenware / Lifestyle EC | [DESIGN.md](design-md/cotogoto/DESIGN.md) | [preview.html](design-md/cotogoto/preview.html) |
| [CAMPFIRE (キャンプファイヤー)](https://camp-fire.jp/) | Crowdfunding | [DESIGN.md](design-md/campfire/DESIGN.md) | [preview.html](design-md/campfire/preview.html) |
| [Creema (クリーマ)](https://www.creema.jp/) | Handmade Marketplace | [DESIGN.md](design-md/creema/DESIGN.md) | [preview.html](design-md/creema/preview.html) |
| [Chatwork (チャットワーク)](https://go.chatwork.com/ja/) | Business Chat SaaS | [DESIGN.md](design-md/chatwork/DESIGN.md) | [preview.html](design-md/chatwork/preview.html) |
| [Hands (ハンズ)](https://hands.net/) | Lifestyle Retail / EC | [DESIGN.md](design-md/hands/DESIGN.md) | [preview.html](design-md/hands/preview.html) |
| [PLST (プラステ)](https://www.plst.com/jp/) | Fashion EC | [DESIGN.md](design-md/plst/DESIGN.md) | [preview.html](design-md/plst/preview.html) |
| [MOS BURGER (モスバーガー)](https://www.mos.jp/) | Food / Restaurant | [DESIGN.md](design-md/mosburger/DESIGN.md) | [preview.html](design-md/mosburger/preview.html) |
| [CHOYA (チョーヤ)](https://www.choya.co.jp/) | Beverage / Plum Wine | [DESIGN.md](design-md/choya/DESIGN.md) | [preview.html](design-md/choya/preview.html) |
| [TULLY'S COFFEE (タリーズコーヒー)](https://www.tullys.co.jp/) | Cafe / Coffee Chain | [DESIGN.md](design-md/tullys/DESIGN.md) | [preview.html](design-md/tullys/preview.html) |
| [Kalita (カリタ)](https://www.kalita.co.jp/) | Coffee Equipment / Manufacturing | [DESIGN.md](design-md/kalita/DESIGN.md) | [preview.html](design-md/kalita/preview.html) |
| [ALBION (アルビオン)](https://www.albion.co.jp/) | Cosmetics / Beauty | [DESIGN.md](design-md/albion/DESIGN.md) | [preview.html](design-md/albion/preview.html) |
| [Square Enix (スクウェア・エニックス)](https://www.jp.square-enix.com/) | Gaming / Entertainment | [DESIGN.md](design-md/square-enix/DESIGN.md) | [preview.html](design-md/square-enix/preview.html) |
| [ITOKI (イトーキ)](https://www.itoki.jp/) | Office Furniture / Manufacturing | [DESIGN.md](design-md/itoki/DESIGN.md) | [preview.html](design-md/itoki/preview.html) |
| [mont-bell (モンベル)](https://www.montbell.jp/) | Outdoor / Mountaineering | [DESIGN.md](design-md/montbell/DESIGN.md) | [preview.html](design-md/montbell/preview.html) |
| [CAPCOM (カプコン)](https://www.capcom.co.jp/) | Gaming / Entertainment | [DESIGN.md](design-md/capcom/DESIGN.md) | [preview.html](design-md/capcom/preview.html) |
| [UCC Ueshima Coffee (UCC上島珈琲)](https://www.ucc.co.jp/) | Food & Beverage / Coffee | [DESIGN.md](design-md/ucc/DESIGN.md) | [preview.html](design-md/ucc/preview.html) |
| [Kyocera (京セラ)](https://www.kyocera.co.jp/) | Electronics / Manufacturing | [DESIGN.md](design-md/kyocera/DESIGN.md) | [preview.html](design-md/kyocera/preview.html) |
| [au (KDDI)](https://www.au.com/) | Telecommunications | [DESIGN.md](design-md/au/DESIGN.md) | [preview.html](design-md/au/preview.html) |
| [ENEOS (エネオス)](https://www.eneos.co.jp/) | Energy / Petroleum | [DESIGN.md](design-md/eneos/DESIGN.md) | [preview.html](design-md/eneos/preview.html) |
| [TOKYU (東急)](https://www.tokyu.co.jp/) | Railway / Lifestyle | [DESIGN.md](design-md/tokyu/DESIGN.md) | [preview.html](design-md/tokyu/preview.html) |
| [LOTTE (ロッテ)](https://www.lotte.co.jp/) | Food & Beverage / Confectionery | [DESIGN.md](design-md/lotte/DESIGN.md) | [preview.html](design-md/lotte/preview.html) |
| [TAKASHIMAYA (高島屋)](https://www.takashimaya.co.jp/) | Retail / Department Store | [DESIGN.md](design-md/takashimaya/DESIGN.md) | [preview.html](design-md/takashimaya/preview.html) |
| [KUMON (公文)](https://www.kumon.ne.jp/) | Education | [DESIGN.md](design-md/kumon/DESIGN.md) | [preview.html](design-md/kumon/preview.html) |
| [Tokyo Metro (東京メトロ)](https://www.tokyometro.jp/) | Transit / Infrastructure | [DESIGN.md](design-md/tokyometro/DESIGN.md) | [preview.html](design-md/tokyometro/preview.html) |
| [Epson (エプソン)](https://www.epson.jp/) | Technology / Manufacturing | [DESIGN.md](design-md/epson/DESIGN.md) | [preview.html](design-md/epson/preview.html) |
| [Kikkoman (キッコーマン)](https://www.kikkoman.co.jp/) | Food & Beverage | [DESIGN.md](design-md/kikkoman/DESIGN.md) | [preview.html](design-md/kikkoman/preview.html) |
| [JR East (JR東日本)](https://www.jreast.co.jp/) | Railway / Transit | [DESIGN.md](design-md/jreast/DESIGN.md) | [preview.html](design-md/jreast/preview.html) |
| [Toshiba (東芝)](https://www.global.toshiba/jp.html) | Technology / Energy | [DESIGN.md](design-md/toshiba/DESIGN.md) | [preview.html](design-md/toshiba/preview.html) |
| [SmartNews (スマートニュース)](https://www.smartnews.com/ja/) | News / Media | [DESIGN.md](design-md/smartnews/DESIGN.md) | [preview.html](design-md/smartnews/preview.html) |
| [TOMBOW (トンボ鉛筆)](https://www.tombow.com/) | Stationery / Manufacturing | [DESIGN.md](design-md/tombow/DESIGN.md) | [preview.html](design-md/tombow/preview.html) |
| [KING JIM (キングジム)](https://www.kingjim.co.jp/) | Office Products / Stationery | [DESIGN.md](design-md/kingjim/DESIGN.md) | [preview.html](design-md/kingjim/preview.html) |
| [mybest (マイベスト)](https://my-best.com/) | Product Comparison / Media | [DESIGN.md](design-md/mybest/DESIGN.md) | [preview.html](design-md/mybest/preview.html) |
| [Ubie (ユビー)](https://ubie.life/) | Healthcare AI / Tech | [DESIGN.md](design-md/ubie/DESIGN.md) | [preview.html](design-md/ubie/preview.html) |
| [READYFOR (レディーフォー)](https://readyfor.jp/) | Crowdfunding / Platform | [DESIGN.md](design-md/readyfor/DESIGN.md) | [preview.html](design-md/readyfor/preview.html) |
| [Plaid (プレイド)](https://plaid.co.jp/) | CX / SaaS | [DESIGN.md](design-md/plaid/DESIGN.md) | [preview.html](design-md/plaid/preview.html) |
| [LayerX (レイヤーエックス)](https://layerx.co.jp/) | DX / Fintech | [DESIGN.md](design-md/layerx/DESIGN.md) | [preview.html](design-md/layerx/preview.html) |
| [Schoo (スクー)](https://schoo.jp/) | EdTech / Online Learning | [DESIGN.md](design-md/schoo/DESIGN.md) | [preview.html](design-md/schoo/preview.html) |
| [THE (ザ)](https://the-web.co.jp/) | Design Products / EC | [DESIGN.md](design-md/the/DESIGN.md) | [preview.html](design-md/the/preview.html) |
| [CLAS (クラス)](https://clas.style/) | Furniture Rental / Subscription | [DESIGN.md](design-md/clas/DESIGN.md) | [preview.html](design-md/clas/preview.html) |
| [graf (グラフ)](https://www.graf-d3.com/) | Design Collective / Furniture | [DESIGN.md](design-md/graf/DESIGN.md) | [preview.html](design-md/graf/preview.html) |
| [10X](https://10x.co.jp/) | Retail SaaS / OMO | [DESIGN.md](design-md/10x/DESIGN.md) | [preview.html](design-md/10x/preview.html) |
| [NEWT (令和トラベル)](https://www.newt.net/) | Travel / Booking | [DESIGN.md](design-md/newt/DESIGN.md) | [preview.html](design-md/newt/preview.html) |
| [天童木工 (Tendo Mokko)](https://www.tendo-mokko.co.jp/) | Furniture / Design Heritage | [DESIGN.md](design-md/tendo/DESIGN.md) | [preview.html](design-md/tendo/preview.html) |
| [&Premium](https://andpremium.jp/) | Lifestyle Magazine | [DESIGN.md](design-md/and-premium/DESIGN.md) | [preview.html](design-md/and-premium/preview.html) |
| [GO (GO株式会社)](https://goinc.jp/) | Mobility Tech | [DESIGN.md](design-md/goinc/DESIGN.md) | [preview.html](design-md/goinc/preview.html) |
| [OMO by 星野リゾート](https://omo-hotels.com/) | Hotel / Hospitality | [DESIGN.md](design-md/omo/DESIGN.md) | [preview.html](design-md/omo/preview.html) |
| [MOHEIM (モハイム)](https://moheim.com/) | Lifestyle / Homeware | [DESIGN.md](design-md/moheim/DESIGN.md) | [preview.html](design-md/moheim/preview.html) |
| [TENGA (テンガ)](https://www.tenga.co.jp/) | Lifestyle / Product Design | [DESIGN.md](design-md/tenga/DESIGN.md) | [preview.html](design-md/tenga/preview.html) |
| [K5](https://k5-tokyo.com/) | Hotel / Hospitality | [DESIGN.md](design-md/k5/DESIGN.md) | [preview.html](design-md/k5/preview.html) |
| [TYPICA (ティピカ)](https://typica.jp/) | Specialty Coffee / Marketplace | [DESIGN.md](design-md/typica/DESIGN.md) | [preview.html](design-md/typica/preview.html) |
| [東京茶寮 (Tokyo Saryo)](https://www.tokyosaryo.jp/) | Tea / Cafe | [DESIGN.md](design-md/tokyosaryo/DESIGN.md) | [preview.html](design-md/tokyosaryo/preview.html) |
| [DDD HOTEL](https://dddhotel.jp/) | Hotel / Design Hotel | [DESIGN.md](design-md/dddhotel/DESIGN.md) | [preview.html](design-md/dddhotel/preview.html) |
| [AXIS (アクシス)](https://www.axismag.jp/) | Design Magazine / Media | [DESIGN.md](design-md/axis/DESIGN.md) | [preview.html](design-md/axis/preview.html) |
| [good design company](https://gooddesigncompany.com/) | Branding / Design Studio | [DESIGN.md](design-md/good-design-company/DESIGN.md) | [preview.html](design-md/good-design-company/preview.html) |
| [DRAFT (ドラフト)](https://www.draft.co.jp/) | Branding / Design Studio | [DESIGN.md](design-md/draft/DESIGN.md) | [preview.html](design-md/draft/preview.html) |
| [茅乃舎 (Kayanoya)](https://www.kayanoya.com/) | Food / Dashi / Premium Brand | [DESIGN.md](design-md/kayanoya/DESIGN.md) | [preview.html](design-md/kayanoya/preview.html) |
| [Graphpaper (グラフペーパー)](https://graphpaper-tokyo.com/) | Fashion / Select Shop | [DESIGN.md](design-md/graphpaper/DESIGN.md) | [preview.html](design-md/graphpaper/preview.html) |
| [美術手帖 (Bijutsu Techo)](https://bijutsutecho.com/) | Art Media / Magazine | [DESIGN.md](design-md/bijutsutecho/DESIGN.md) | [preview.html](design-md/bijutsutecho/preview.html) |
| [石巻工房 (Ishinomaki Laboratory)](https://ishinomaki-lab.org/) | Furniture / Product Design | [DESIGN.md](design-md/ishinomaki-lab/DESIGN.md) | [preview.html](design-md/ishinomaki-lab/preview.html) |
| [NOHGA HOTEL (ノーガホテル)](https://www.nohgahotel.com/) | Hotel / Design Hotel | [DESIGN.md](design-md/nohga-hotel/DESIGN.md) | [preview.html](design-md/nohga-hotel/preview.html) |
| [PostCoffee (ポストコーヒー)](https://postcoffee.co/) | D2C / Specialty Coffee | [DESIGN.md](design-md/postcoffee/DESIGN.md) | [preview.html](design-md/postcoffee/preview.html) |
| [Ambientec (アンビエンテック)](https://ambientec.co.jp/) | Lighting / Product Design | [DESIGN.md](design-md/ambientec/DESIGN.md) | [preview.html](design-md/ambientec/preview.html) |
| [釜浅商店 (Kama-asa)](https://www.kama-asa.co.jp/) | Kitchen Tools / Craft Retail | [DESIGN.md](design-md/kamaasa/DESIGN.md) | [preview.html](design-md/kamaasa/preview.html) |
| [東屋 (Azmaya)](https://www.azmaya.co.jp/) | Homeware / Product Design | [DESIGN.md](design-md/azmaya/DESIGN.md) | [preview.html](design-md/azmaya/preview.html) |
| [たねや (Taneya)](https://taneya.jp/) | Confectionery / Wagashi | [DESIGN.md](design-md/taneya/DESIGN.md) | [preview.html](design-md/taneya/preview.html) |
| [White Mountaineering](https://whitemountaineering.com/) | Fashion / Apparel | [DESIGN.md](design-md/whitemountaineering/DESIGN.md) | [preview.html](design-md/whitemountaineering/preview.html) |
| [アーティゾン美術館 (Artizon Museum)](https://www.artizon.museum/) | Museum / Art | [DESIGN.md](design-md/artizon/DESIGN.md) | [preview.html](design-md/artizon/preview.html) |
| [カンディハウス (Conde House)](https://www.condehouse.co.jp/) | Furniture / Product Design | [DESIGN.md](design-md/condehouse/DESIGN.md) | [preview.html](design-md/condehouse/preview.html) |
| [Celvoke (セルヴォーク)](https://celvoke.com/) | Cosmetics / Beauty | [DESIGN.md](design-md/celvoke/DESIGN.md) | [preview.html](design-md/celvoke/preview.html) |
| [Discover Japan (ディスカバー・ジャパン)](https://discoverjapan-web.com/) | Media / Magazine | [DESIGN.md](design-md/discoverjapan/DESIGN.md) | [preview.html](design-md/discoverjapan/preview.html) |
| [BAUM (バウム)](https://www.baumjapan.com/) | Botanical Skincare / Beauty | [DESIGN.md](design-md/baum/DESIGN.md) | [preview.html](design-md/baum/preview.html) |
| [CINRA (シンラ)](https://www.cinra.net/) | Culture Media / Editorial | [DESIGN.md](design-md/cinra/DESIGN.md) | [preview.html](design-md/cinra/preview.html) |
| [Loftwork (ロフトワーク)](https://loftwork.com/jp/) | Creative Company / Agency | [DESIGN.md](design-md/loftwork/DESIGN.md) | [preview.html](design-md/loftwork/preview.html) |
| [Subsequence (サブシーケンス)](https://subsequence.tv/) | Culture Magazine / Editorial | [DESIGN.md](design-md/subsequence/DESIGN.md) | [preview.html](design-md/subsequence/preview.html) |
| [PUEBCO (プエブコ)](https://www.puebco.com/) | Homeware / Lifestyle | [DESIGN.md](design-md/puebco/DESIGN.md) | [preview.html](design-md/puebco/preview.html) |
| [Landscape Products (ランドスケーププロダクツ)](https://landscape-products.net/) | Design Studio / Shop | [DESIGN.md](design-md/landscape-products/DESIGN.md) | [preview.html](design-md/landscape-products/preview.html) |
| [金沢21世紀美術館 (21st Century Museum of Contemporary Art, Kanazawa)](https://www.kanazawa21.jp/) | Contemporary Art Museum | [DESIGN.md](design-md/kanazawa21/DESIGN.md) | [preview.html](design-md/kanazawa21/preview.html) |
| [ONIBUS COFFEE (オニバスコーヒー)](https://onibuscoffee.com/) | D2C / Specialty Coffee | [DESIGN.md](design-md/onibuscoffee/DESIGN.md) | [preview.html](design-md/onibuscoffee/preview.html) |
| [暮しの手帖 (Kurashi no Techo)](https://www.kurashi-no-techo.co.jp/) | Media / Magazine | [DESIGN.md](design-md/kurashi-no-techo/DESIGN.md) | [preview.html](design-md/kurashi-no-techo/preview.html) |
| [BIOTOP (ビオトープ)](https://www.biotop.jp/) | Select Shop / Lifestyle | [DESIGN.md](design-md/biotop/DESIGN.md) | [preview.html](design-md/biotop/preview.html) |
| [オカムラ (Okamura)](https://www.okamura.co.jp/) | Office Furniture / Workplace | [DESIGN.md](design-md/okamura/DESIGN.md) | [preview.html](design-md/okamura/preview.html) |
| [飛騨産業 (HIDA)](https://kitutuki.co.jp/) | Wood Furniture / Manufacturer | [DESIGN.md](design-md/hida/DESIGN.md) | [preview.html](design-md/hida/preview.html) |
| [MARKAWARE (マーカウェア)](https://www.markaware.jp/) | Fashion / Menswear | [DESIGN.md](design-md/markaware/DESIGN.md) | [preview.html](design-md/markaware/preview.html) |
| [SIX (シックス)](https://www.sixinc.jp/) | Creative Agency | [DESIGN.md](design-md/sixinc/DESIGN.md) | [preview.html](design-md/sixinc/preview.html) |
| [kolor (カラー)](https://kolor.jp/) | Fashion / Apparel | [DESIGN.md](design-md/kolor/DESIGN.md) | [preview.html](design-md/kolor/preview.html) |
| [開化堂 (Kaikado)](https://www.kaikado.jp/) | Craft / Tea Caddy (Kyoto) | [DESIGN.md](design-md/kaikado/DESIGN.md) | [preview.html](design-md/kaikado/preview.html) |
| [山と道 (Yamatomichi)](https://www.yamatomichi.com/) | Outdoor / UL Hiking Gear | [DESIGN.md](design-md/yamatomichi/DESIGN.md) | [preview.html](design-md/yamatomichi/preview.html) |
| [SIWA｜紙和 (Siwa)](https://siwa.jp/) | Washi Paper Products / Design | [DESIGN.md](design-md/siwa/DESIGN.md) | [preview.html](design-md/siwa/preview.html) |
| [DELFONICS (デルフォニックス)](https://www.delfonics.com/) | Stationery / Design | [DESIGN.md](design-md/delfonics/DESIGN.md) | [preview.html](design-md/delfonics/preview.html) |
| [HASUNA (ハスナ)](https://www.hasuna.co.jp/) | Ethical Jewelry | [DESIGN.md](design-md/hasuna/DESIGN.md) | [preview.html](design-md/hasuna/preview.html) |
| [SIRI SIRI (シリシリ)](https://sirisiri.jp/) | Jewelry / Glass Craft | [DESIGN.md](design-md/sirisiri/DESIGN.md) | [preview.html](design-md/sirisiri/preview.html) |

### Previews

<p align="center">
  <a href="https://kzhrknt.github.io/awesome-design-md-jp/gallery.html">Gallery (405 sites)</a>
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
<tr>
<td align="center"><strong>shu uemura</strong><br><img src="design-md/shuuemura/preview-screenshot.png" width="120"></td>
<td align="center"><strong>YOKU MOKU</strong><br><img src="design-md/yokumoku/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HUMAN MADE</strong><br><img src="design-md/humanmade/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Notion Dev</strong><br><img src="design-md/notion-dev/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ZOZO</strong><br><img src="design-md/zozo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CyberAgent</strong><br><img src="design-md/cyberagent/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LIFULL</strong><br><img src="design-md/lifull/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BASE</strong><br><img src="design-md/base/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DAIKIN</strong><br><img src="design-md/daikin/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Recruit</strong><br><img src="design-md/recruit/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ATON</strong><br><img src="design-md/aton/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mame Kurogouchi</strong><br><img src="design-md/mamekurogouchi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PRESS BUTTER SAND</strong><br><img src="design-md/buttersand/preview-screenshot.png" width="120"></td>
<td align="center"><strong>RMK</strong><br><img src="design-md/rmk/preview-screenshot.png" width="120"></td>
<td align="center"><strong>amadana</strong><br><img src="design-md/amadana/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Oisix</strong><br><img src="design-md/oisix/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>JAL</strong><br><img src="design-md/jal/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Timee</strong><br><img src="design-md/timee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kyash</strong><br><img src="design-md/kyash/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Honda</strong><br><img src="design-md/honda/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ANA</strong><br><img src="design-md/ana/preview-screenshot.png" width="120"></td>
<td align="center"><strong>IPPODO</strong><br><img src="design-md/ippodo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DECORTÉ</strong><br><img src="design-md/decorte/preview-screenshot.png" width="120"></td>
<td align="center"><strong>tokyobike</strong><br><img src="design-md/tokyobike/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MOONSTAR</strong><br><img src="design-md/moonstar/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TASAKI</strong><br><img src="design-md/tasaki/preview-screenshot.png" width="120"></td>
<td align="center"><strong>COEDO</strong><br><img src="design-md/coedo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ITOYA</strong><br><img src="design-md/itoya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>dentsu</strong><br><img src="design-md/dentsu/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>graniph</strong><br><img src="design-md/graniph/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Fujitsu</strong><br><img src="design-md/fujitsu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Onitsuka Tiger</strong><br><img src="design-md/onitsukatiger/preview-screenshot.png" width="120"></td>
<td align="center"><strong>URBAN RESEARCH</strong><br><img src="design-md/urbanresearch/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SNIDEL</strong><br><img src="design-md/snidel/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DAISO</strong><br><img src="design-md/daiso/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Nitori</strong><br><img src="design-md/nitori/preview-screenshot.png" width="120"></td>
<td align="center"><strong>JILL STUART Beauty</strong><br><img src="design-md/jillstuart-beauty/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NISSAN</strong><br><img src="design-md/nissan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Meiji</strong><br><img src="design-md/meiji/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Roland</strong><br><img src="design-md/roland/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BAPE</strong><br><img src="design-md/bape/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SHIPS</strong><br><img src="design-md/ships/preview-screenshot.png" width="120"></td>
<td align="center"><strong>GANZO</strong><br><img src="design-md/ganzo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Studio Ghibli</strong><br><img src="design-md/ghibli/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Seiko</strong><br><img src="design-md/seiko/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Asahi Beer</strong><br><img src="design-md/asahibeer/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Nikon</strong><br><img src="design-md/nikon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ROYCE'</strong><br><img src="design-md/royce/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KEYENCE</strong><br><img src="design-md/keyence/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Yohji Yamamoto</strong><br><img src="design-md/yohjiyamamoto/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Wacom</strong><br><img src="design-md/wacom/preview-screenshot.png" width="120"></td>
<td align="center"><strong>白鳳堂</strong><br><img src="design-md/hakuhodo-brushes/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Shimano</strong><br><img src="design-md/shimano/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Bridgestone</strong><br><img src="design-md/bridgestone/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Yonex</strong><br><img src="design-md/yonex/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Nissin</strong><br><img src="design-md/nissin/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HYKE</strong><br><img src="design-md/hyke/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Komeda</strong><br><img src="design-md/komeda/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Zoff</strong><br><img src="design-md/zoff/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LUPICIA</strong><br><img src="design-md/lupicia/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Tabio</strong><br><img src="design-md/tabio/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Glico</strong><br><img src="design-md/glico/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kao</strong><br><img src="design-md/kao/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Morinaga</strong><br><img src="design-md/morinaga/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>LIXIL</strong><br><img src="design-md/lixil/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Ajinomoto</strong><br><img src="design-md/ajinomoto/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BANDAI NAMCO</strong><br><img src="design-md/bandainamco/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>LAWSON</strong><br><img src="design-md/lawson/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Aoyama Flower Market</strong><br><img src="design-md/aoyamaflowermarket/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Sarutahiko Coffee</strong><br><img src="design-md/sarutahiko/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NTT Group</strong><br><img src="design-md/ntt/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ITOCHU</strong><br><img src="design-md/itochu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Sumitomo Forestry</strong><br><img src="design-md/sumitomo-forestry/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>HITACHI</strong><br><img src="design-md/hitachi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Mitsui Fudosan</strong><br><img src="design-md/mitsui-fudosan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KUBOTA</strong><br><img src="design-md/kubota/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>IPPUDO</strong><br><img src="design-md/ippudo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ZENB</strong><br><img src="design-md/zenb/preview-screenshot.png" width="120"></td>
<td align="center"><strong>kurashiru</strong><br><img src="design-md/kurashiru/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DAIWA HOUSE</strong><br><img src="design-md/daiwahouse/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOPPAN</strong><br><img src="design-md/toppan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>AGC</strong><br><img src="design-md/agc/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SEGA</strong><br><img src="design-md/sega/preview-screenshot.png" width="120"></td>
<td align="center"><strong>積水ハウス</strong><br><img src="design-md/sekisuihouse/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Audio-Technica</strong><br><img src="design-md/audio-technica/preview-screenshot.png" width="120"></td>
<td align="center"><strong>NTTドコモ</strong><br><img src="design-md/docomo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SAKE HUNDRED</strong><br><img src="design-md/sakehundred/preview-screenshot.png" width="120"></td>
<td align="center"><strong>FELISSIMO</strong><br><img src="design-md/felissimo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>MIXI</strong><br><img src="design-md/mixi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DeNA</strong><br><img src="design-md/dena/preview-screenshot.png" width="120"></td>
<td align="center"><strong>カルピス</strong><br><img src="design-md/calpis/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>WHILL</strong><br><img src="design-md/whill/preview-screenshot.png" width="120"></td>
<td align="center"><strong>niko and...</strong><br><img src="design-md/nikoand/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DULTON</strong><br><img src="design-md/dulton/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>GREEN SPOON</strong><br><img src="design-md/greenspoon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HIGHTIDE</strong><br><img src="design-md/hightide/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LOWYA</strong><br><img src="design-md/lowya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Yakult</strong><br><img src="design-md/yakult/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Brother</strong><br><img src="design-md/brother/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ZOJIRUSHI</strong><br><img src="design-md/zojirushi/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>TAKEO</strong><br><img src="design-md/takeo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Sghr</strong><br><img src="design-md/sghr/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TENERITA</strong><br><img src="design-md/tenerita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>AMBUSH</strong><br><img src="design-md/ambush/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Clé de Peau</strong><br><img src="design-md/cledepeau/preview-screenshot.png" width="120"></td>
<td align="center"><strong>FANCL</strong><br><img src="design-md/fancl/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SoftBank</strong><br><img src="design-md/softbank/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KALDI</strong><br><img src="design-md/kaldi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>nano universe</strong><br><img src="design-md/nanouniverse/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>OMRON</strong><br><img src="design-md/omron/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SUQQU</strong><br><img src="design-md/suqqu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Pocari Sweat</strong><br><img src="design-md/pocarisweat/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DASSAI</strong><br><img src="design-md/dassai/preview-screenshot.png" width="120"></td>
<td align="center"><strong>UNDERCOVER</strong><br><img src="design-md/undercover/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LUSH</strong><br><img src="design-md/lush/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NANGA</strong><br><img src="design-md/nanga/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KURAND</strong><br><img src="design-md/kurand/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Time & Style</strong><br><img src="design-md/timeandstyle/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Hender Scheme</strong><br><img src="design-md/henderscheme/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Spiber</strong><br><img src="design-md/spiber/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ARTS&SCIENCE</strong><br><img src="design-md/arts-science/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SUZUKI</strong><br><img src="design-md/suzuki/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TANITA</strong><br><img src="design-md/tanita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ASKUL</strong><br><img src="design-md/askul/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>LUUP</strong><br><img src="design-md/luup/preview-screenshot.png" width="120"></td>
<td align="center"><strong>RAKSUL</strong><br><img src="design-md/raksul/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Benesse</strong><br><img src="design-md/benesse/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>貝印</strong><br><img src="design-md/kai/preview-screenshot.png" width="120"></td>
<td align="center"><strong>一蘭</strong><br><img src="design-md/ichiran/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BAYCREW'S</strong><br><img src="design-md/baycrew/preview-screenshot.png" width="120"></td>
<td align="center"><strong>1LDK</strong><br><img src="design-md/1ldk/preview-screenshot.png" width="120"></td>
<td align="center"><strong>aeru</strong><br><img src="design-md/aeru/preview-screenshot.png" width="120"></td>
<td align="center"><strong>cotogoto</strong><br><img src="design-md/cotogoto/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CAMPFIRE</strong><br><img src="design-md/campfire/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Creema</strong><br><img src="design-md/creema/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Chatwork</strong><br><img src="design-md/chatwork/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Hands</strong><br><img src="design-md/hands/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PLST</strong><br><img src="design-md/plst/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MOS BURGER</strong><br><img src="design-md/mosburger/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CHOYA</strong><br><img src="design-md/choya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TULLY'S</strong><br><img src="design-md/tullys/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Kalita</strong><br><img src="design-md/kalita/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ALBION</strong><br><img src="design-md/albion/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Square Enix</strong><br><img src="design-md/square-enix/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ITOKI</strong><br><img src="design-md/itoki/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>mont-bell</strong><br><img src="design-md/montbell/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CAPCOM</strong><br><img src="design-md/capcom/preview-screenshot.png" width="120"></td>
<td align="center"><strong>UCC</strong><br><img src="design-md/ucc/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Kyocera</strong><br><img src="design-md/kyocera/preview-screenshot.png" width="120"></td>
<td align="center"><strong>au</strong><br><img src="design-md/au/preview-screenshot.png" width="120"></td>
<td align="center"><strong>ENEOS</strong><br><img src="design-md/eneos/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>TOKYU</strong><br><img src="design-md/tokyu/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LOTTE</strong><br><img src="design-md/lotte/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TAKASHIMAYA</strong><br><img src="design-md/takashimaya/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>KUMON</strong><br><img src="design-md/kumon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Tokyo Metro</strong><br><img src="design-md/tokyometro/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Epson</strong><br><img src="design-md/epson/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Kikkoman</strong><br><img src="design-md/kikkoman/preview-screenshot.png" width="120"></td>
<td align="center"><strong>JR East</strong><br><img src="design-md/jreast/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Toshiba</strong><br><img src="design-md/toshiba/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>SmartNews</strong><br><img src="design-md/smartnews/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TOMBOW</strong><br><img src="design-md/tombow/preview-screenshot.png" width="120"></td>
<td align="center"><strong>KING JIM</strong><br><img src="design-md/kingjim/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>mybest</strong><br><img src="design-md/mybest/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Ubie</strong><br><img src="design-md/ubie/preview-screenshot.png" width="120"></td>
<td align="center"><strong>READYFOR</strong><br><img src="design-md/readyfor/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Plaid</strong><br><img src="design-md/plaid/preview-screenshot.png" width="120"></td>
<td align="center"><strong>LayerX</strong><br><img src="design-md/layerx/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Schoo</strong><br><img src="design-md/schoo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>THE</strong><br><img src="design-md/the/preview-screenshot.png" width="120"></td>
<td align="center"><strong>CLAS</strong><br><img src="design-md/clas/preview-screenshot.png" width="120"></td>
<td align="center"><strong>graf</strong><br><img src="design-md/graf/preview-screenshot.png" width="120"></td>
<td align="center"><strong>10X</strong><br><img src="design-md/10x/preview-screenshot.png" width="120"></td>
<td align="center"><strong>NEWT</strong><br><img src="design-md/newt/preview-screenshot.png" width="120"></td>
<td align="center"><strong>天童木工</strong><br><img src="design-md/tendo/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>&Premium</strong><br><img src="design-md/and-premium/preview-screenshot.png" width="120"></td>
<td align="center"><strong>GO</strong><br><img src="design-md/goinc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>OMO</strong><br><img src="design-md/omo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>MOHEIM</strong><br><img src="design-md/moheim/preview-screenshot.png" width="120"></td>
<td align="center"><strong>TENGA</strong><br><img src="design-md/tenga/preview-screenshot.png" width="120"></td>
<td align="center"><strong>K5</strong><br><img src="design-md/k5/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>TYPICA</strong><br><img src="design-md/typica/preview-screenshot.png" width="120"></td>
<td align="center"><strong>東京茶寮</strong><br><img src="design-md/tokyosaryo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>DDD HOTEL</strong><br><img src="design-md/dddhotel/preview-screenshot.png" width="120"></td>
<td align="center"><strong>AXIS</strong><br><img src="design-md/axis/preview-screenshot.png" width="120"></td>
<td align="center"><strong>good design company</strong><br><img src="design-md/good-design-company/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DRAFT</strong><br><img src="design-md/draft/preview-screenshot.png" width="120"></td>
<td align="center"><strong>茅乃舎</strong><br><img src="design-md/kayanoya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Graphpaper</strong><br><img src="design-md/graphpaper/preview-screenshot.png" width="120"></td>
<td align="center"><strong>美術手帖</strong><br><img src="design-md/bijutsutecho/preview-screenshot.png" width="120"></td>
<td align="center"><strong>石巻工房</strong><br><img src="design-md/ishinomaki-lab/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>NOHGA HOTEL</strong><br><img src="design-md/nohga-hotel/preview-screenshot.png" width="120"></td>
<td align="center"><strong>PostCoffee</strong><br><img src="design-md/postcoffee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Ambientec</strong><br><img src="design-md/ambientec/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>釜浅商店</strong><br><img src="design-md/kamaasa/preview-screenshot.png" width="120"></td>
<td align="center"><strong>東屋</strong><br><img src="design-md/azmaya/preview-screenshot.png" width="120"></td>
<td align="center"><strong>たねや</strong><br><img src="design-md/taneya/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>White Mtn.</strong><br><img src="design-md/whitemountaineering/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Artizon</strong><br><img src="design-md/artizon/preview-screenshot.png" width="120"></td>
<td align="center"><strong>カンディハウス</strong><br><img src="design-md/condehouse/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>Celvoke</strong><br><img src="design-md/celvoke/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Discover Japan</strong><br><img src="design-md/discoverjapan/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BAUM</strong><br><img src="design-md/baum/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>CINRA</strong><br><img src="design-md/cinra/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Loftwork</strong><br><img src="design-md/loftwork/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Subsequence</strong><br><img src="design-md/subsequence/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>PUEBCO</strong><br><img src="design-md/puebco/preview-screenshot.png" width="120"></td>
<td align="center"><strong>Landscape Products</strong><br><img src="design-md/landscape-products/preview-screenshot.png" width="120"></td>
<td align="center"><strong>金沢21世紀美術館</strong><br><img src="design-md/kanazawa21/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>ONIBUS COFFEE</strong><br><img src="design-md/onibuscoffee/preview-screenshot.png" width="120"></td>
<td align="center"><strong>暮しの手帖</strong><br><img src="design-md/kurashi-no-techo/preview-screenshot.png" width="120"></td>
<td align="center"><strong>BIOTOP</strong><br><img src="design-md/biotop/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>オカムラ</strong><br><img src="design-md/okamura/preview-screenshot.png" width="120"></td>
<td align="center"><strong>飛騨産業</strong><br><img src="design-md/hida/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>MARKAWARE</strong><br><img src="design-md/markaware/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SIX</strong><br><img src="design-md/sixinc/preview-screenshot.png" width="120"></td>
<td align="center"><strong>kolor</strong><br><img src="design-md/kolor/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>開化堂</strong><br><img src="design-md/kaikado/preview-screenshot.png" width="120"></td>
<td align="center"><strong>山と道</strong><br><img src="design-md/yamatomichi/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SIWA｜紙和</strong><br><img src="design-md/siwa/preview-screenshot.png" width="120"></td>
</tr>
<tr>
<td align="center"><strong>DELFONICS</strong><br><img src="design-md/delfonics/preview-screenshot.png" width="120"></td>
<td align="center"><strong>HASUNA</strong><br><img src="design-md/hasuna/preview-screenshot.png" width="120"></td>
<td align="center"><strong>SIRI SIRI</strong><br><img src="design-md/sirisiri/preview-screenshot.png" width="120"></td>
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
