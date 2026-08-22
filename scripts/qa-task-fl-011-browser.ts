/**
 * FL-011 live browser QA for Wave 1 after VISUAL-006 network shell.
 * Google Places: 0. Read-only. Screenshots under docs/observation/fl-state-wave1/screenshots/.
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { createRequire } from 'module';
import { spawnSync } from 'child_process';

const BASE = (process.env.QA_BASE_URL || 'https://www.movetrusthub.com').replace(/\/$/, '');
const OUT_DIR = resolve(process.cwd(), 'docs/observation/fl-state-wave1/screenshots');

const PAGES = [
  { slug: 'doug-s-hourly-muscle-movers-packers-inc', note: 'long-name' },
  { slug: 'clover-systems-llc', note: 'phone-only-miami-dade' },
  { slug: 'adios-moving-llc', note: 'broward' },
  { slug: 'gentletouch-moving-company', note: 'pinellas-short' },
];

const VIEWPORTS = [
  { name: 'pixel', width: 412, height: 915 },
  { name: 'iphone', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  try {
    return require('playwright') as typeof import('playwright');
  } catch {
    const installPkg = spawnSync('npm', ['install', '--no-save', 'playwright@1.49.1'], {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    });
    if (installPkg.status !== 0) throw new Error('npm install playwright failed');
    const installBrowser = spawnSync('npx', ['playwright', 'install', 'chromium'], {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    });
    if (installBrowser.status !== 0) throw new Error('playwright install chromium failed');
    return require('playwright') as typeof import('playwright');
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  const results: Array<Record<string, unknown>> = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'MoveTrustHub-FL011-browser/1.0',
    });
    const page = await context.newPage();
    const consoleErrors: string[] = [];
    page.on('pageerror', (err) => consoleErrors.push(String(err)));
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    for (const row of PAGES) {
      const url = `${BASE}/companies/${row.slug}`;
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(800);
      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const h1 = document.querySelector('h1');
        const header = document.querySelector('header');
        const fdacs = [...document.querySelectorAll('h2, h1, p, span, dd')].find((el) =>
          /IM\d+/i.test(el.textContent || '')
        );
        const florida = /Florida Intrastate Mover/i.test(document.body.innerText);
        const verifyUsdot = /Verify USDOT on FMCSA SAFER/i.test(document.body.innerText);
        const noFederal = /No federal mover identifier is currently linked/i.test(document.body.innerText);
        const h1Box = h1?.getBoundingClientRect();
        const headerBox = header?.getBoundingClientRect();
        const overlap =
          Boolean(h1Box && headerBox && headerBox.bottom > h1Box.top + 4 && headerBox.top < h1Box.bottom);
        return {
          overflowX: Math.max(0, Math.round(doc.scrollWidth - window.innerWidth)),
          innerWidth: window.innerWidth,
          scrollWidth: doc.scrollWidth,
          h1: h1?.textContent?.trim() ?? null,
          h1Wraps: h1 ? h1.scrollHeight > h1.clientHeight * 0.9 && (h1.textContent || '').length > 24 : false,
          florida,
          verifyUsdot,
          noFederal,
          imVisible: Boolean(fdacs),
          headerOverlap: overlap,
          title: document.title,
        };
      });
      const file = `${row.slug}--${vp.name}.png`;
      await page.screenshot({ path: resolve(OUT_DIR, file), fullPage: true });
      results.push({
        slug: row.slug,
        note: row.note,
        viewport: vp.name,
        status: resp?.status() ?? 0,
        screenshot: `docs/observation/fl-state-wave1/screenshots/${file}`,
        consoleErrors: consoleErrors.slice(),
        ...metrics,
      });
      consoleErrors.length = 0;
    }
    await context.close();
  }

  await browser.close();
  const report = {
    google_places_requests: 0,
    retrieved_at: new Date().toISOString(),
    base: BASE,
    overflow_failures: results.filter((r) => Number(r.overflowX) > 0),
    header_overlap: results.filter((r) => r.headerOverlap),
    missing_florida: results.filter((r) => !r.florida),
    verify_usdot: results.filter((r) => r.verifyUsdot),
    results,
  };
  writeFileSync(
    resolve(process.cwd(), 'docs/observation/fl-state-wave1/browser-qa.json'),
    JSON.stringify(report, null, 2) + '\n'
  );
  console.log(
    JSON.stringify(
      {
        pages: PAGES.length,
        viewports: VIEWPORTS.length,
        shots: results.length,
        overflow_failures: report.overflow_failures.length,
        header_overlap: report.header_overlap.length,
        verify_usdot: report.verify_usdot.length,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
