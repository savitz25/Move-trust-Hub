import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'narrow-iphone', width: 375, height: 812 },
  { name: 'pixel-7', width: 412, height: 839 },
  { name: 'wide-mobile', width: 430, height: 932 },
];

const providers = [
  '/companies/allied-van-lines',
  '/companies/international-van-lines',
  '/companies/georgia-home-movers-llc',
  '/companies/colonial-van-lines',
  '/companies/usa-family-moving-of-atlanta-llc',
  '/companies/american-van-lines',
  '/companies/amerisafe-van-lines',
  '/companies/morse-moving-storage-inc',
  '/companies/jk-moving-services',
  '/companies/two-men-and-a-truck',
  '/companies/royal-hawaiian-trucking-warehousing',
  '/companies/carson-valley-movers',
];

const criticalPages = [
  '/', '/local-movers?originZip=33401', '/compare', '/moving-calculator',
  '/local-movers/florida', '/local-movers/florida/miami-dade',
  '/moving-to/alabama', '/moving-to/alabama/huntsville-al', '/my-move',
  '/verify-dot', '/this-route-must-not-exist-task-014c1',
];

async function expectPageContained(page: import('@playwright/test').Page, route: string) {
  const dimensions = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(dimensions.scroll, `${route} overflowed at ${dimensions.client}px`).toBeLessThanOrEqual(dimensions.client + 1);
}

test('homepage discovery reveals reliably and remains usable at launch viewports', async ({ page }) => {
  for (const viewport of [...viewports, { name: 'tablet', width: 768, height: 1024 }, { name: 'desktop', width: 1280, height: 800 }]) {
    await page.setViewportSize(viewport);
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await page.goto('/');
      expect(response?.status(), `${viewport.name} attempt ${attempt + 1}`).toBe(200);
      const form = page.getByRole('form', { name: 'Mover discovery' });
      await expect(form, `${viewport.name} attempt ${attempt + 1}`).toBeVisible();
      const origin = form.getByLabel('Origin ZIP');
      await expect(origin).toBeEditable();
      await origin.fill('33401');
      await expect(form.getByRole('button', { name: 'Research movers' })).toBeEnabled();
      await expectPageContained(page, `home ${viewport.name} attempt ${attempt + 1}`);
    }
  }
});

test('provider templates stay viewport-contained across representative data shapes', async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of providers) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route} at ${viewport.name}`).toBe(200);
      await expect(page.getByRole('main')).toBeVisible();
      await expectPageContained(page, `${route} at ${viewport.name}`);
    }
  }
});

test('critical mobile surfaces do not create page-level horizontal overflow', async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of criticalPages) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect([200, 404], `${route} at ${viewport.name}`).toContain(response?.status());
      await expect(page.locator('body')).not.toBeEmpty();
      await expectPageContained(page, `${route} at ${viewport.name}`);
    }
  }
});
