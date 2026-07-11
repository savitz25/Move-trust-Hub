import 'server-only';

import { parseNmlsEntityHtml, nmlsSearchUrl } from '@/lib/lender/onboarding/nmls-parse';
import type { NmlsSuggestionPreview } from '@/lib/lender/onboarding/types';
import { logger } from '@/lib/logging/logger';

const NMLS_SEARCH = 'https://www.nmlsconsumeraccess.org/';
const SCRAPE_TIMEOUT_MS = 45_000;

export type NmlsSearchCandidate = {
  nmlsId: string;
  name: string;
  entityType: string;
  location: string | null;
};

async function launchBrowser() {
  const { chromium } = await import('playwright-core');

  const isServerless = Boolean(
    process.env.AWS_LAMBDA_FUNCTION_VERSION ||
      process.env.VERCEL ||
      process.env.NMLS_CHROMIUM_SERVERLESS === '1'
  );

  if (isServerless) {
    const chromiumPkg = await import('@sparticuz/chromium');
    const executablePath = await chromiumPkg.default.executablePath();
    return chromium.launch({
      args: chromiumPkg.default.args,
      executablePath,
      headless: true,
    });
  }

  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?.trim();
  return chromium.launch({
    headless: true,
    executablePath: executablePath || undefined,
  });
}

export async function lookupNmlsByIdPlaywright(
  nmlsId: string
): Promise<NmlsSuggestionPreview | null> {
  let browser = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    });
    page.setDefaultTimeout(SCRAPE_TIMEOUT_MS);

    const url = nmlsSearchUrl(nmlsId);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: SCRAPE_TIMEOUT_MS });
    await page.waitForTimeout(1500);

    const html = await page.content();
    const parsed = parseNmlsEntityHtml(html, nmlsId, 'playwright');
    if (parsed) return parsed;

    logger.warn('lender.nmls.playwright_parse_failed', { nmlsId, htmlLength: html.length });
    return null;
  } catch (err) {
    logger.error('lender.nmls.playwright_error', {
      nmlsId,
      message: err instanceof Error ? err.message : 'unknown',
    });
    return null;
  } finally {
    await browser?.close().catch(() => undefined);
  }
}

export async function searchNmlsByNamePlaywright(
  companyName: string,
  state?: string
): Promise<NmlsSearchCandidate[]> {
  let browser = null;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    });
    page.setDefaultTimeout(SCRAPE_TIMEOUT_MS);

    await page.goto(NMLS_SEARCH, { waitUntil: 'domcontentloaded', timeout: SCRAPE_TIMEOUT_MS });

    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill(companyName);
    if (state) {
      const stateSelect = page.locator('select').first();
      if ((await stateSelect.count()) > 0) {
        await stateSelect.selectOption({ label: state }).catch(() => undefined);
      }
    }

    await page.keyboard.press('Enter');
    await page.waitForTimeout(2500);

    const rows = await page.locator('table tr').all();
    const candidates: NmlsSearchCandidate[] = [];

    for (const row of rows.slice(0, 15)) {
      const text = (await row.innerText()).replace(/\s+/g, ' ').trim();
      const idMatch = text.match(/NMLS\s*#?\s*(\d{4,10})/i);
      if (!idMatch) continue;
      const parts = text.split(/\t|\|/).map((p) => p.trim()).filter(Boolean);
      candidates.push({
        nmlsId: idMatch[1],
        name: parts[0] ?? companyName,
        entityType: parts.find((p) => /company|branch|individual/i.test(p)) ?? 'COMPANY',
        location: parts.find((p) => /,\s*[A-Z]{2}/.test(p)) ?? null,
      });
    }

    return candidates;
  } catch (err) {
    logger.error('lender.nmls.name_search_error', {
      companyName,
      message: err instanceof Error ? err.message : 'unknown',
    });
    return [];
  } finally {
    await browser?.close().catch(() => undefined);
  }
}