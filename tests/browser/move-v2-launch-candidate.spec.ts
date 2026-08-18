import { test, expect } from '@playwright/test';
test('same URL launch composition and hardened reads', async ({ page, request }) => {
  await page.goto('/'); await expect(page).toHaveTitle(/Move/); await expect(page.getByRole('form',{name:'Mover discovery'})).toBeVisible({timeout:15000}); await expect(page.getByLabel('Origin ZIP')).toBeEditable();
  await page.goto('/local-movers'); await expect(page.getByRole('heading',{name:/Find local movers worth researching/i})).toBeVisible();
  const good=await request.get('/api/move-v2/discovery/search?originZip=33401'); expect(good.status()).toBe(200); const body=await good.text(); expect(body).not.toMatch(/decisionVersion|reviewer|experimental_derived/i);
  expect((await request.get('/api/move-v2/discovery/search?originZip=bad')).status()).toBe(400);
  expect((await request.get('/api/move-v2/discovery/compare?providerIds=x,y,z,q,r')).status()).toBe(400);
});
test('historical surfaces survive cutover composition', async ({ page }) => {
  for (const path of ['/companies/allied-van-lines','/companies/international-van-lines','/compare','/verify-dot','/moving-calculator','/my-move','/auto-transport']) { const response=await page.goto(path); expect(response?.status(),path).toBe(200); }
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',/^https:\/\/www\.movetrusthub\.com/);
});
