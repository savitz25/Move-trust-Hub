import 'server-only';

import { fetchBbbBusinessSnapshot } from '@/lib/bbb/refresh/fetch-business';
import {
  bbbResultFromApiSnapshot,
  fetchBbbPublicScrape,
} from '@/lib/verification/bbb-public-scrape';
import type {
  CompanyEnrichmentInput,
  PublicScrapeData,
  PublicSourceMeta,
} from '@/lib/verification/types';
import {
  SCRAPE_TIMEOUT_MS,
  SCRAPE_USER_AGENT,
  waitForScrapeSlot,
} from '@/lib/verification/scrape-rate-limit';

async function fetchHtml(url: string): Promise<string | null> {
  await waitForScrapeSlot(new URL(url).hostname);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SCRAPE_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'User-Agent': SCRAPE_USER_AGENT,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function parseRating(html: string, patterns: RegExp[]): number | null {
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) {
      const n = Number.parseFloat(m[1]);
      if (!Number.isNaN(n) && n >= 0 && n <= 5) return n;
    }
  }
  return null;
}

function parseCount(html: string, patterns: RegExp[]): number | null {
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) {
      const n = Number.parseInt(m[1].replace(/,/g, ''), 10);
      if (!Number.isNaN(n) && n >= 0) return n;
    }
  }
  return null;
}

async function scrapeTrustpilot(
  companyName: string
): Promise<Pick<PublicScrapeData, 'trustpilot_rating' | 'trustpilot_review_count'> & { meta: PublicSourceMeta }> {
  const q = encodeURIComponent(`${companyName} moving`);
  const url = `https://www.trustpilot.com/search?query=${q}`;
  const html = await fetchHtml(url);
  if (!html) {
    return {
      trustpilot_rating: null,
      trustpilot_review_count: null,
      meta: { status: 'error', method: 'public_scrape', url, error: 'Request failed' },
    };
  }

  const rating = parseRating(html, [
    /"ratingValue"\s*:\s*([\d.]+)/,
    /TrustScore[^>]*>[\s\S]*?([\d.]+)\s*out of 5/i,
    /star-rating[^>]*>[\s\S]*?([\d.]+)/i,
  ]);
  const count = parseCount(html, [
    /"reviewCount"\s*:\s*"?(\d+)/,
    /(\d[\d,]*)\s*reviews?/i,
  ]);

  return {
    trustpilot_rating: rating,
    trustpilot_review_count: count,
    meta: {
      status: rating || count ? 'ok' : 'not_found',
      method: 'public_scrape',
      url,
    },
  };
}

async function scrapeYelp(
  companyName: string,
  city: string,
  state: string
): Promise<Pick<PublicScrapeData, 'yelp_rating' | 'yelp_review_count'> & { meta: PublicSourceMeta }> {
  const loc = encodeURIComponent([city, state].filter(Boolean).join(', ') || 'United States');
  const q = encodeURIComponent(companyName);
  const url = `https://www.yelp.com/search?find_desc=${q}&find_loc=${loc}`;
  const html = await fetchHtml(url);
  if (!html) {
    return {
      yelp_rating: null,
      yelp_review_count: null,
      meta: { status: 'error', method: 'public_scrape', url, error: 'Request failed' },
    };
  }

  const rating = parseRating(html, [
    /"rating"\s*:\s*([\d.]+)/,
    /aria-label="([\d.]+) star rating"/i,
    /star rating[^>]*>[\s\S]*?([\d.]+)/i,
  ]);
  const count = parseCount(html, [
    /"reviewCount"\s*:\s*"?(\d+)/,
    /(\d[\d,]*)\s*review/i,
  ]);

  return {
    yelp_rating: rating,
    yelp_review_count: count,
    meta: {
      status: rating || count ? 'ok' : 'not_found',
      method: 'public_scrape',
      url,
    },
  };
}

function parseHeadquarters(hq?: string | null): { city: string; state: string } {
  if (!hq) return { city: '', state: '' };
  const parts = hq.split(',').map((p) => p.trim());
  if (parts.length >= 2) {
    const state = parts[parts.length - 1].replace(/\d{5}(-\d{4})?/, '').trim();
    const city = parts[parts.length - 2] || parts[0];
    return { city, state: state.slice(0, 2).toUpperCase() };
  }
  return { city: parts[0] ?? '', state: '' };
}

/** Clear BBB fields when company is not listed — prevents stale bogus ratings in storage. */
function bbbFieldsFromScrape(
  listed: boolean,
  scrape: Awaited<ReturnType<typeof fetchBbbPublicScrape>>
): Pick<
  PublicScrapeData,
  | 'bbb_rating'
  | 'bbb_review_count'
  | 'bbb_accredited'
  | 'bbb_details'
  | 'bbb_accreditation_status'
  | 'bbb_file_opened'
  | 'bbb_accredited_since'
  | 'bbb_profile_url'
  | 'bbb_recent_reviews'
> & { bbbMeta: PublicSourceMeta | undefined } {
  if (!listed) {
    return {
      bbb_rating: null,
      bbb_review_count: null,
      bbb_accredited: null,
      bbb_details: null,
      bbb_accreditation_status: null,
      bbb_file_opened: null,
      bbb_accredited_since: null,
      bbb_profile_url: null,
      bbb_recent_reviews: [],
      bbbMeta: scrape.meta,
    };
  }

  return {
    bbb_rating: scrape.bbb_rating,
    bbb_review_count: scrape.bbb_review_count,
    bbb_accredited: scrape.bbb_accredited,
    bbb_details: scrape.bbb_details,
    bbb_accreditation_status: scrape.bbb_accreditation_status,
    bbb_file_opened: scrape.bbb_file_opened,
    bbb_accredited_since: scrape.bbb_accredited_since,
    bbb_profile_url: scrape.bbb_profile_url,
    bbb_recent_reviews: scrape.bbb_recent_reviews,
    bbbMeta: scrape.meta,
  };
}

/**
 * Enrich with BBB (API preferred, robust public scrape fallback) + Trustpilot/Yelp.
 * BBB fields are null when the company has no confirmed BBB listing.
 */
export async function fetchPublicScrapeData(
  input: CompanyEnrichmentInput
): Promise<PublicScrapeData> {
  const now = new Date().toISOString();
  const geo = parseHeadquarters(input.headquarters);
  const city = input.city ?? geo.city;
  const state = input.state ?? geo.state;

  const bbbInput = {
    companyName: input.legalName,
    city,
    state,
    headquarters: input.headquarters,
    usdotNumber: input.usdotNumber,
  };

  let bbbScrape = await fetchBbbPublicScrape(bbbInput);

  const bbbApi = await fetchBbbBusinessSnapshot({
    slug: input.legalName.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80),
    name: input.legalName,
    headquarters: input.headquarters ?? '',
  });

  if (bbbApi) {
    bbbScrape = await bbbResultFromApiSnapshot(
      {
        accredited: bbbApi.accredited,
        rating: bbbApi.rating,
        customerReviews: bbbApi.customerReviews,
        profileUrl: bbbApi.profileUrl,
      },
      bbbInput
    );
  }

  const { bbbMeta, ...bbbFields } = bbbFieldsFromScrape(bbbScrape.listed, bbbScrape);

  const [trustpilot, yelp] = await Promise.all([
    scrapeTrustpilot(input.legalName),
    scrapeYelp(input.legalName, city, state),
  ]);

  return {
    confidence: 'public',
    ...bbbFields,
    trustpilot_rating: trustpilot.trustpilot_rating,
    trustpilot_review_count: trustpilot.trustpilot_review_count,
    yelp_rating: yelp.yelp_rating,
    yelp_review_count: yelp.yelp_review_count,
    sources: {
      bbb: bbbMeta,
      trustpilot: trustpilot.meta,
      yelp: yelp.meta,
    },
    last_scraped_at: now,
  };
}