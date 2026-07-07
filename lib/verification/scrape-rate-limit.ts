import 'server-only';

/** In-memory rate limiter for respectful public scraping (per-process). */
const buckets = new Map<string, number[]>();

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

export async function waitForScrapeSlot(source: string): Promise<void> {
  const now = Date.now();
  const key = source;
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    const oldest = hits[0]!;
    const wait = WINDOW_MS - (now - oldest) + 50;
    await new Promise((r) => setTimeout(r, Math.min(wait, 5_000)));
  }
  hits.push(Date.now());
  buckets.set(key, hits);
}

export const SCRAPE_USER_AGENT =
  'MoveTrustHubBot/1.0 (+https://www.movetrusthub.com; company-verification)';

export const SCRAPE_TIMEOUT_MS = 8_000;