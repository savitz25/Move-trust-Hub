import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const shots = 'test-results/task-014b1/screenshots';
const routes = [
  '/', '/local-movers', '/companies/allied-van-lines', '/compare',
  '/local-movers/florida', '/local-movers/florida/miami-dade',
  '/moving-calculator', '/my-move', '/auto-transport',
  '/about', '/about/how-we-score-movers', '/resources/fmcsa',
];

test.beforeAll(() => mkdirSync(shots, { recursive: true }));

test('Task 014B.1 production-build surface and browser safety audit', async ({ page }, info) => {
  const fatal: string[] = [];
  page.on('pageerror', error => fatal.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error' && /hydration|uncaught|referenceerror|typeerror/i.test(message.text())) {
      fatal.push(`console: ${message.text()}`);
    }
  });

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('body')).not.toBeEmpty();
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count()) await expect(canonical).toHaveAttribute('href', /^https:\/\/www\.movetrusthub\.com(?:\/|$)/);
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots ?? '', `${route} robots`).not.toMatch(/noindex/i);
    const localLegacyLinks = await page.locator('a[href^="/lender"],a[href^="/insurance"]').count();
    expect(localLegacyLinks, `${route} obsolete cross-vertical links`).toBe(0);
    const width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(width.scroll, `${route} horizontal overflow`).toBeLessThanOrEqual(width.client + 1);
  }

  await page.goto('/this-route-must-not-exist-task-014b1');
  await expect(page.getByText(/not found|404/i).first()).toBeVisible();
  await page.screenshot({ path: `${shots}/${info.project.name}-404.png`, fullPage: true });
  await page.goto('/');
  await page.screenshot({ path: `${shots}/${info.project.name}-home.png`, fullPage: true });
  expect(fatal).toEqual([]);
});
