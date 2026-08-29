import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('C:/Users/makei/.tmp-playwright-core/package.json');
const { chromium } = require('playwright-core');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const browser = await chromium.launch({
  executablePath:
    'C:\\Users\\makei\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3020/companies/shifl-inc', {
  waitUntil: 'domcontentloaded',
  timeout: 120000,
});
await page.waitForSelector('[data-research-hero]');
await page.locator('summary', { hasText: 'Trace this record' }).click();
await page.waitForTimeout(400);
const open = await page.locator('[data-profile-event="profile_trace_opened"]').evaluate((el) =>
  Boolean(el.open),
);
await page.screenshot({
  path: join(root, 'artifacts/move-profile-001/shifl-inc-1440-trace.png'),
  fullPage: false,
});
console.log(`traceOpen=${open}`);
await browser.close();
