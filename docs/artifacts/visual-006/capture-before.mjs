import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), 'before');
mkdirSync(out, { recursive: true });
const origin = process.env.MTH_ORIGIN || 'https://www.movetrusthub.com';

const browser = await chromium.launch({ headless: true });
const report = {};

async function measure(page) {
  return page.evaluate(() => {
    const header = document.querySelector('nav[aria-label="Primary"], header');
    const networkBar = [...document.querySelectorAll('div')].find((el) => {
      const t = el.textContent || '';
      const b = el.getBoundingClientRect();
      return /Ask Trust Hub network/i.test(t) && b.height < 80 && b.y < 90 && b.width > 300;
    });
    const logo = document.querySelector('nav a[href="/"], header a[href="/"]');
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
    };
    return {
      viewport: { w: innerWidth, h: innerHeight },
      overflowX: document.documentElement.scrollWidth > innerWidth + 1,
      header: r(header),
      networkBar: r(networkBar),
      logo: r(logo),
      stackedChrome:
        (networkBar ? networkBar.getBoundingClientRect().height : 0) +
        (header ? header.getBoundingClientRect().height : 0),
    };
  });
}

try {
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await desk.newPage();
  await p.goto(origin + '/', { waitUntil: 'networkidle', timeout: 90000 });
  await p.waitForTimeout(800);
  report.desktop1440 = await measure(p);
  await p.screenshot({ path: join(out, 'desktop-1440.jpg'), type: 'jpeg', quality: 72 });
  const hh = Math.min((report.desktop1440.stackedChrome || 160) + 8, 220);
  await p.screenshot({
    path: join(out, 'header-desktop.png'),
    type: 'png',
    clip: { x: 0, y: 0, width: 1440, height: hh },
  });
  await desk.close();

  const mob = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const mp = await mob.newPage();
  await mp.goto(origin + '/', { waitUntil: 'networkidle', timeout: 90000 });
  await mp.waitForTimeout(600);
  report.mobile390 = await measure(mp);
  await mp.screenshot({ path: join(out, 'mobile-390.jpg'), type: 'jpeg', quality: 72 });
  const mh = Math.min((report.mobile390.stackedChrome || 160) + 8, 220);
  await mp.screenshot({
    path: join(out, 'header-mobile.png'),
    type: 'png',
    clip: { x: 0, y: 0, width: 390, height: mh },
  });
  await mob.close();
} finally {
  await browser.close();
}

writeFileSync(join(out, 'qa.json'), JSON.stringify({ origin, report }, null, 2));
console.log(JSON.stringify({ origin, report }, null, 2));
