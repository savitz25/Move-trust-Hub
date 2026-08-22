import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), 'after');
mkdirSync(out, { recursive: true });
const origin = process.env.MTH_ORIGIN || 'http://127.0.0.1:3016';
const extraHTTPHeaders = origin.includes('localhost') || origin.includes('127.0.0.1')
  ? { 'x-forwarded-proto': 'https' }
  : undefined;

const browser = await chromium.launch({ headless: true });
const report = {};

async function measure(page) {
  return page.evaluate(() => {
    const header = document.querySelector('header.th-header, header');
    const lock = document.querySelector('.th-logo-lockup');
    const mark = document.querySelector('.th-logo-mark');
    const sw = [...document.querySelectorAll('button')].find((b) => /Switch Hub/i.test(b.textContent || ''));
    const menu = document.querySelector('button[aria-label="Open menu"], button[aria-label="Close menu"]');
    const strip = [...document.querySelectorAll('div')].some((el) => {
      const t = (el.textContent || '').trim();
      const b = el.getBoundingClientRect();
      return t.startsWith('Ask Trust Hub network') && b.y < 40 && b.height < 80 && b.width > 400;
    });
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
    };
    return {
      viewport: { w: innerWidth, h: innerHeight },
      overflowX: document.documentElement.scrollWidth > innerWidth + 1,
      overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      header: r(header),
      lock: r(lock),
      mark: r(mark),
      switchHub: r(sw),
      menu: r(menu),
      stackedBarPresent: strip,
    };
  });
}

try {
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, extraHTTPHeaders });
  const p = await desk.newPage();
  await p.goto(origin + '/', { waitUntil: 'networkidle', timeout: 90000 });
  await p.waitForTimeout(700);
  report.desktop1440 = await measure(p);
  await p.screenshot({ path: join(out, 'desktop-1440.jpg'), type: 'jpeg', quality: 72 });
  const hh = report.desktop1440.header?.h || 69;
  await p.screenshot({
    path: join(out, 'header-desktop.png'),
    type: 'png',
    clip: { x: 0, y: 0, width: 1440, height: Math.min(hh + 4, 90) },
  });
  await p.getByRole('button', { name: 'Switch Hub' }).click();
  await p.waitForTimeout(300);
  await p.screenshot({ path: join(out, 'desktop-switch.jpg'), type: 'jpeg', quality: 72 });
  await p.keyboard.press('Escape');
  await desk.close();

  for (const w of [1280, 1024, 768, 430, 375]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, extraHTTPHeaders });
    const page = await ctx.newPage();
    await page.goto(origin + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(400);
    report[`w${w}`] = await measure(page);
    await page.screenshot({ path: join(out, `w${w}.jpg`), type: 'jpeg', quality: 68 });
    await ctx.close();
  }

  const mob = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    extraHTTPHeaders,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const mp = await mob.newPage();
  await mp.goto(origin + '/', { waitUntil: 'networkidle', timeout: 90000 });
  await mp.waitForTimeout(500);
  report.mobile390 = await measure(mp);
  await mp.screenshot({ path: join(out, 'mobile-390.jpg'), type: 'jpeg', quality: 72 });
  const mh = report.mobile390.header?.h || 57;
  await mp.screenshot({
    path: join(out, 'header-mobile.png'),
    type: 'png',
    clip: { x: 0, y: 0, width: 390, height: Math.min(mh + 4, 80) },
  });
  await mp.getByRole('button', { name: 'Open menu' }).click();
  await mp.waitForTimeout(400);
  await mp.screenshot({ path: join(out, 'mobile-drawer.jpg'), type: 'jpeg', quality: 72 });
  await mp.evaluate(() => {
    const el = document.querySelector('.th-drawer');
    if (el) el.scrollTop = el.scrollHeight;
  });
  await mp.waitForTimeout(200);
  await mp.screenshot({ path: join(out, 'mobile-network.jpg'), type: 'jpeg', quality: 72 });
  await mob.close();

  const ctxPage = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, extraHTTPHeaders });
  const cp = await ctxPage.newPage();
  await cp.goto(origin + '/moving-calculator', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await cp.waitForTimeout(800);
  report.calculator = await measure(cp);
  await cp.screenshot({ path: join(out, 'contextual-calculator.jpg'), type: 'jpeg', quality: 70 });
  await ctxPage.close();
} finally {
  await browser.close();
}

writeFileSync(join(out, 'qa.json'), JSON.stringify(report, null, 2));
const d = report.desktop1440 || {};
const m = report.mobile390 || {};
const checks = [];
const ok = (cond, label) => checks.push({ label, pass: !!cond });
ok(d.header && Math.abs(d.header.h - 69) <= 1, `desktop header ${d.header?.h} ≈ 69`);
ok(d.mark && Math.abs(d.mark.h - 36) <= 1, `desktop mark ${d.mark?.h} ≈ 36`);
ok(d.lock && Math.abs(d.lock.x - 144) <= 2, `logo left ${d.lock?.x} ≈ 144`);
ok(d.switchHub && d.switchHub.h === 44, `switch ${d.switchHub?.h} = 44`);
ok(d.overflowX === false, 'desktop no overflow');
ok(!d.stackedBarPresent, 'no Ask network strip');
ok(m.header && Math.abs(m.header.h - 57) <= 1, `mobile header ${m.header?.h} ≈ 57`);
ok(m.mark && Math.abs(m.mark.h - 30) <= 1, `mobile mark ${m.mark?.h} ≈ 30`);
ok(m.menu && m.menu.h >= 44 && m.menu.w >= 44, `menu ${m.menu?.w}×${m.menu?.h}`);
ok(!m.overflowX, 'mobile no overflow');
const t1024 = report.w1024 || {};
ok(t1024.header && Math.abs(t1024.header.h - 69) <= 1, `1024 header ${t1024.header?.h}`);
ok(t1024.overflowX === false, '1024 no overflow');
const failed = checks.filter((c) => !c.pass);
console.log(JSON.stringify({ origin, checks, failed, report }, null, 2));
if (failed.length) process.exit(1);
