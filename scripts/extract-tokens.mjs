#!/usr/bin/env node
/**
 * extract-tokens.mjs
 *
 * ヘッドレス Chrome で指定 URL を開き、デザイントークンを自動抽出する。
 *
 * 使い方:
 *   node scripts/extract-tokens.mjs https://note.com/
 *   node scripts/extract-tokens.mjs https://note.com/ https://note.com/info/n/nXXXX
 *   node scripts/extract-tokens.mjs --out results.json https://smarthr.jp/
 *
 * SPA サイト対策:
 *   - 各ページで自動スクロールし、遅延レンダリングされるコンテンツを読み込む
 *   - 同一ドメインで複数 URL を指定した場合、最初の URL からページ内遷移を試みる
 *     （bot 検知で直接アクセスが弾かれるサイト対策）
 *
 * 出力:
 *   1. computedStyles — 主要要素のスタイルバリエーション（同じタグでも異なるスタイルは別エントリ）
 *   2. customProperties — :root / html の CSS Custom Properties
 */

import puppeteer from "puppeteer";
import { writeFileSync } from "node:fs";

// --- 設定 ---

const CSS_PROPS = [
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "color",
  "background-color",
  "border-radius",
  "border",
  "box-shadow",
  "font-feature-settings",
  "padding",
];

const DEDUP_KEYS = [
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "color",
  "background-color",
  "font-feature-settings",
];

const TARGET_TAGS = [
  "h1", "h2", "h3", "h4", "h5",
  "p", "a", "span", "li",
  "button",
  "input", "select", "textarea", "label",
  "nav", "header", "footer",
  "table", "th", "td",
];

const MAX_VARIANTS_PER_TAG = 8;
const MAX_SCAN_PER_TAG = 30;

// --- CLI ---

const args = process.argv.slice(2);
let outFile = null;
const urls = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--out" && args[i + 1]) {
    outFile = args[++i];
  } else if (args[i].startsWith("http")) {
    urls.push(args[i]);
  } else {
    console.error(`不明な引数: ${args[i]}`);
    process.exit(1);
  }
}

if (urls.length === 0) {
  console.error(
    "使い方: node scripts/extract-tokens.mjs [--out file.json] <URL> [URL ...]"
  );
  process.exit(1);
}

// --- ブラウザ内で実行する関数 ---

function extractAllVariants(targetTags, props, dedupKeys, maxVariants, maxScan) {
  const results = {};

  const body = document.body;
  if (body) {
    const s = getComputedStyle(body);
    const values = {};
    for (const p of props) values[p] = s.getPropertyValue(p);
    results.body = [values];
  }

  for (const tag of targetTags) {
    const elements = document.querySelectorAll(tag);
    if (elements.length === 0) {
      results[tag] = [];
      continue;
    }

    const seen = new Set();
    const variants = [];
    const limit = Math.min(elements.length, maxScan);

    for (let i = 0; i < limit && variants.length < maxVariants; i++) {
      const el = elements[i];

      // 非表示要素スキップ
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;

      const key = dedupKeys.map((k) => cs.getPropertyValue(k)).join("|");
      if (seen.has(key)) continue;
      seen.add(key);

      const values = {};
      for (const p of props) values[p] = cs.getPropertyValue(p);
      values._tag = tag;
      values._index = i;
      values._classes = el.className ? String(el.className).slice(0, 150) : "";
      values._textPreview = (el.textContent || "").trim().slice(0, 60);
      const parent = el.closest(
        "main, article, [role='main'], .article, .content, .entry, nav, header, footer, aside"
      );
      values._context = parent
        ? parent.tagName.toLowerCase() +
          (parent.className ? "." + String(parent.className).split(" ")[0] : "")
        : "unknown";

      variants.push(values);
    }

    results[tag] = variants;
  }

  return results;
}

function extractCustomProperties() {
  const styles = getComputedStyle(document.documentElement);
  const vars = {};

  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = [...sheet.cssRules];
    } catch {
      continue;
    }
    for (const rule of rules) {
      if (
        rule.selectorText === ":root" ||
        rule.selectorText === "html" ||
        rule.selectorText === ":root, :host"
      ) {
        for (const prop of rule.style) {
          if (prop.startsWith("--")) {
            vars[prop] = styles.getPropertyValue(prop).trim();
          }
        }
      }
    }
  }
  return vars;
}

// --- スクロールしてコンテンツを描画させる ---

async function autoScroll(page) {
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 300;
    const maxScrolls = 8;
    let scrolled = 0;
    while (scrolled < maxScrolls) {
      window.scrollBy(0, distance);
      await new Promise((r) => setTimeout(r, delay));
      scrolled++;
    }
    // 先頭に戻す
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
}

// --- メイン ---

async function extractFromUrl(page, url, isNavigation) {
  console.error(`→ ${url} を読み込み中...`);

  if (isNavigation) {
    // SPA 内遷移: page.goto ではなく直接 location.href を書き換える
    await page.evaluate((u) => {
      window.location.href = u;
    }, url);
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });
  } else {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  }

  // スクロールして遅延コンテンツを読み込む
  await new Promise((r) => setTimeout(r, 2000));
  await autoScroll(page);

  // 404 検出
  const pageTitle = await page.title();
  const is404 = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    return h1 && h1.textContent.includes("お探しのページが見つかりません");
  });
  if (is404) {
    console.error(`  ⚠ 404ページが返されました (title: ${pageTitle})`);
  }

  console.error("  computed styles を取得中...");
  const computedStyles = await page.evaluate(
    extractAllVariants,
    TARGET_TAGS,
    CSS_PROPS,
    DEDUP_KEYS,
    MAX_VARIANTS_PER_TAG,
    MAX_SCAN_PER_TAG
  );

  let totalVariants = 0;
  for (const variants of Object.values(computedStyles)) {
    if (Array.isArray(variants)) totalVariants += variants.length;
  }

  console.error("  CSS Custom Properties を取得中...");
  const customProperties = await page.evaluate(extractCustomProperties);

  const propCount = Object.keys(customProperties).length;
  console.error(
    `  完了: ${totalVariants} バリエーション, ${propCount} Custom Properties`
  );

  return { url, title: pageTitle, is404, computedStyles, customProperties };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--lang=ja-JP"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  const results = [];

  // 同一ドメインの URL 群はページ内遷移を使う（bot 検知対策）
  for (let i = 0; i < urls.length; i++) {
    try {
      const isNavigation = i > 0 && new URL(urls[i]).origin === new URL(urls[0]).origin;
      const result = await extractFromUrl(page, urls[i], isNavigation);

      // 404 の場合、そのドメインのリンクから記事を探して自動リトライ
      if (result.is404 && urls[i].match(/\/n\/n/)) {
        console.error("  → トップからリンク経由で記事ページを探索中...");
        const origin = new URL(urls[i]).origin;
        await page.goto(origin, { waitUntil: "networkidle2", timeout: 30000 });
        await new Promise((r) => setTimeout(r, 2000));

        const articleLink = await page.evaluate((o) => {
          const links = [...document.querySelectorAll("a")];
          return links.map((a) => a.href).find((h) => h.startsWith(o) && h.match(/\/n\/n/));
        }, origin);

        if (articleLink) {
          console.error(`  → 発見: ${articleLink}`);
          const retry = await extractFromUrl(page, articleLink, true);
          retry._originalUrl = urls[i];
          retry._note = "元URLが404のため、トップページからリンク経由で代替記事を取得";
          results.push(retry);
          continue;
        }
      }

      results.push(result);
    } catch (err) {
      console.error(`  エラー: ${err.message}`);
      results.push({ url: urls[i], error: err.message });
    }
  }

  await browser.close();

  const output = JSON.stringify(
    { extractedAt: new Date().toISOString(), pages: results },
    null,
    2
  );

  if (outFile) {
    writeFileSync(outFile, output);
    console.error(`\n結果を ${outFile} に保存しました`);
  } else {
    console.log(output);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
