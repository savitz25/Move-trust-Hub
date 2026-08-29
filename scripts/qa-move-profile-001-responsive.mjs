import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('C:/Users/makei/.tmp-playwright-core/package.json');
const { chromium } = require('playwright-core');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'artifacts', 'move-profile-001');
mkdirSync(outDir, { recursive: true });

const BASE = process.env.MOVE_PROFILE_QA_BASE || 'http://localhost:3020';
const CHROME =
  process.env.MOVE_PROFILE_QA_CHROME ||
  'C:\\Users\\makei\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe';

const VIEWPORTS = [
  { w: 1440, h: 900 },
  { w: 1280, h: 800 },
  { w: 768, h: 1024 },
  { w: 430, h: 932 },
  { w: 390, h: 844 },
  { w: 375, h: 812 },
];

const PATHS = [
  '/companies/1-st-moving-corp',
  '/companies/shifl-inc',
  '/companies/two-men-and-a-truck-usdot-1199826',
  '/companies/gentletouch-moving-company',
];

const report = [];

async function measure(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - window.innerWidth;
    const hero = document.querySelector('[data-research-hero]');
    const heroRect = hero ? hero.getBoundingClientRect() : null;
    const actions = [...(hero ? hero.querySelectorAll('a, button') : [])]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
          w: Math.round(r.width),
          h: Math.round(r.height),
          short: r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40),
        };
      })
      .filter((a) => a.w > 0 && a.h > 0);
    const h1 = document.querySelector('h1');
    const title = h1 ? h1.textContent.trim() : '';
    const h1Count = document.querySelectorAll('h1').length;
    const notRecommended = /is not recommending this mover/i.test(hero ? hero.innerText : '');
    const legalLine = /FMCSA legal entity/i.test(hero ? hero.innerText : '');
    const clipped = [...document.querySelectorAll('[data-research-hero] h1, [data-research-hero] p, [data-research-hero] a, [data-research-hero] button')].filter(
      (el) => el.scrollWidth - el.clientWidth > 2,
    ).map((el) => (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80));
    return {
      innerWidth: window.innerWidth,
      scrollWidth: doc.scrollWidth,
      overflowPx: overflow,
      overflow: overflow > 1,
      title,
      h1Count,
      notRecommended,
      legalLine,
      heroHeight: heroRect ? Math.round(heroRect.height) : null,
      shortTargets: actions.filter((a) => a.short),
      clipped,
      hasVerify: /Verify DOT/i.test(document.body.innerText),
      hasScoreInHero: /Reputation Score|Trust Score/i.test(hero ? hero.innerText : ''),
    };
  });
}

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--disable-gpu', '--no-sandbox'],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  for (const path of PATHS) {
    const slug = path.split('/').pop();
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.w, height: vp.h });
      const url = `${BASE}${path}`;
      const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
      await page.waitForSelector('h1', { timeout: 120000 });
      await page.waitForTimeout(400);
      const metrics = await measure(page);
      const shot = `${slug}-${vp.w}.png`;
      await page.screenshot({ path: join(outDir, shot), fullPage: false });
      const row = {
        slug,
        viewport: vp.w,
        status: res?.status() ?? null,
        shot,
        ...metrics,
      };
      report.push(row);
      console.log(
        JSON.stringify({
          slug,
          w: vp.w,
          status: row.status,
          overflow: row.overflow,
          overflowPx: row.overflowPx,
          shortTargets: row.shortTargets.length,
          clipped: row.clipped.length,
          title: row.title,
        }),
      );
    }
  }

  writeFileSync(join(outDir, 'responsive-report.json'), JSON.stringify(report, null, 2));
  const fail = report.filter((r) => r.overflow || r.status !== 200);
  console.log(`\nWrote ${outDir}`);
  console.log(`overflow_failures=${fail.filter((r) => r.overflow).length}`);
  console.log(`http_failures=${fail.filter((r) => r.status !== 200).length}`);
  await browser.close();
  if (fail.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
