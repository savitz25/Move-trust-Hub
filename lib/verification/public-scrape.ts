import 'server-only';

import { fetchBbbBusinessSnapshot } from '@/lib/bbb/refresh/fetch-business';
import type {
  BbbScrapeDetails,
  BbbReviewSnippet,
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

function extractBbbProfileUrl(html: string): string | null {
  const match = html.match(/href="(\/us\/[^"]+\/profile\/[^"]+)"/i);
  if (!match?.[1]) return null;
  return `https://www.bbb.org${match[1].replace(/&amp;/g, '&')}`;
}

function parseLabeledField(html: string, labels: string[]): string | null {
  for (const label of labels) {
    const re = new RegExp(`${label}[^<]{0,40}</[^>]+>\\s*<[^>]+>\\s*([^<]+)`, 'i');
    const m = html.match(re);
    if (m?.[1]?.trim()) return m[1].trim();
    const inline = new RegExp(`${label}[:\\s]+([A-Za-z0-9 ,/]+)`, 'i');
    const m2 = html.match(inline);
    if (m2?.[1]?.trim()) return m2[1].trim();
  }
  return null;
}

function parseBbbReviewSnippets(html: string): BbbReviewSnippet[] {
  const snippets: BbbReviewSnippet[] = [];
  const blocks = html.match(/Customer Review[\s\S]{0,1200}/gi) ?? [];
  for (const block of blocks.slice(0, 3)) {
    const author =
      block.match(/(?:Customer|Reviewer)[:\s]+([A-Za-z][A-Za-z .'-]{1,40})/i)?.[1]?.trim() ??
      block.match(/"author"\s*:\s*"([^"]+)"/i)?.[1]?.trim();
    const date =
      block.match(/(?:Date|Posted)[:\s]+([A-Za-z]+ \d{1,2},? \d{4})/i)?.[1]?.trim() ??
      block.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/)?.[1]?.trim();
    const text =
      block.match(/"reviewBody"\s*:\s*"([^"]{20,400})"/i)?.[1]?.trim() ??
      block.match(/<p[^>]*>([^<]{30,400})<\/p>/i)?.[1]?.trim();
    if (text) {
      snippets.push({
        text: text.replace(/\s+/g, ' ').slice(0, 400),
        author,
        date,
      });
    }
  }
  return snippets;
}

async function scrapeBbbProfileDetails(profileUrl: string): Promise<BbbScrapeDetails> {
  const html = await fetchHtml(profileUrl);
  if (!html) {
    return {
      accreditation_status: null,
      file_opened_date: null,
      accredited_since: null,
      profile_url: profileUrl,
      review_snippets: [],
    };
  }

  const accredited = /BBB Accredited Business|Accredited Business/i.test(html);
  const notAccredited = /Not BBB Accredited|Not Accredited/i.test(html);
  const accreditation_status = accredited
    ? 'BBB Accredited Business'
    : notAccredited
      ? 'Not BBB Accredited'
      : null;

  return {
    accreditation_status,
    file_opened_date: parseLabeledField(html, ['File Opened', 'Business Started', 'Years in Business']),
    accredited_since: parseLabeledField(html, ['BBB Accredited Since', 'Accredited Since']),
    profile_url: profileUrl,
    review_snippets: parseBbbReviewSnippets(html),
  };
}

async function scrapeBbbPublic(
  companyName: string,
  city: string,
  state: string
): Promise<
  Pick<PublicScrapeData, 'bbb_rating' | 'bbb_review_count' | 'bbb_accredited' | 'bbb_details'> & {
    meta: PublicSourceMeta;
  }
> {
  const q = encodeURIComponent(`${companyName} ${city} ${state}`.trim());
  const url = `https://www.bbb.org/search?find_text=${q}&find_country=USA`;
  const html = await fetchHtml(url);
  if (!html) {
    return {
      bbb_rating: null,
      bbb_review_count: null,
      bbb_accredited: null,
      bbb_details: null,
      meta: { status: 'error', method: 'public_scrape', url, error: 'Request failed' },
    };
  }

  const gradeMatch = html.match(/\b(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F)\b/);
  const accredited = /accredited|BBB Accredited/i.test(html);
  const count = parseCount(html, [/(\d[\d,]*)\s*customer reviews/i, /(\d[\d,]*)\s*reviews/i]);

  const profileUrl = extractBbbProfileUrl(html);
  const bbb_details = profileUrl ? await scrapeBbbProfileDetails(profileUrl) : null;

  return {
    bbb_rating: gradeMatch?.[1] ?? null,
    bbb_review_count: count,
    bbb_accredited: accredited || null,
    bbb_details,
    meta: {
      status: gradeMatch || count || profileUrl ? 'ok' : 'not_found',
      method: 'public_scrape',
      url: profileUrl ?? url,
    },
  };
}

function bbbDetailsFromApiSnapshot(snapshot: {
  accredited: boolean;
  profileUrl?: string;
  customerReviews: number;
}): BbbScrapeDetails {
  return {
    accreditation_status: snapshot.accredited
      ? 'BBB Accredited Business'
      : 'Not BBB Accredited',
    file_opened_date: null,
    accredited_since: null,
    profile_url: snapshot.profileUrl ?? null,
    review_snippets: [],
  };
}

function flattenBbbDetailsForUi(
  details: BbbScrapeDetails | null
): Pick<
  PublicScrapeData,
  | 'bbb_accreditation_status'
  | 'bbb_file_opened'
  | 'bbb_accredited_since'
  | 'bbb_profile_url'
  | 'bbb_recent_reviews'
> {
  if (!details) {
    return {
      bbb_accreditation_status: null,
      bbb_file_opened: null,
      bbb_accredited_since: null,
      bbb_profile_url: null,
      bbb_recent_reviews: [],
    };
  }

  return {
    bbb_accreditation_status: details.accreditation_status,
    bbb_file_opened: details.file_opened_date,
    bbb_accredited_since: details.accredited_since,
    bbb_profile_url: details.profile_url,
    bbb_recent_reviews: details.review_snippets.map((snippet) => ({
      text: snippet.text,
      date: snippet.date,
      author: snippet.author,
    })),
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

/**
 * Enrich with BBB API (preferred) + public scrape fallbacks for BBB/Trustpilot/Yelp.
 * All scrape-sourced fields are labeled confidence: "public".
 */
export async function fetchPublicScrapeData(
  input: CompanyEnrichmentInput
): Promise<PublicScrapeData> {
  const now = new Date().toISOString();
  const geo = parseHeadquarters(input.headquarters);
  const city = input.city ?? geo.city;
  const state = input.state ?? geo.state;

  let bbb_rating: string | null = null;
  let bbb_review_count: number | null = null;
  let bbb_accredited: boolean | null = null;
  let bbb_details: BbbScrapeDetails | null = null;
  let bbbMeta: PublicSourceMeta | undefined;

  const bbbApi = await fetchBbbBusinessSnapshot({
    slug: input.legalName.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80),
    name: input.legalName,
    headquarters: input.headquarters ?? '',
  });

  if (bbbApi) {
    bbb_rating = bbbApi.rating;
    bbb_review_count = bbbApi.customerReviews ?? null;
    bbb_accredited = bbbApi.accredited;
    bbb_details = bbbDetailsFromApiSnapshot(bbbApi);
    if (bbbApi.profileUrl) {
      const profileDetails = await scrapeBbbProfileDetails(bbbApi.profileUrl);
      bbb_details = {
        ...bbb_details,
        ...profileDetails,
        accreditation_status:
          profileDetails.accreditation_status ?? bbb_details.accreditation_status,
        profile_url: bbbApi.profileUrl,
      };
    }
    bbbMeta = { status: 'ok', method: 'bbb_api', url: bbbApi.profileUrl };
  } else {
    const scraped = await scrapeBbbPublic(input.legalName, city, state);
    bbb_rating = scraped.bbb_rating;
    bbb_review_count = scraped.bbb_review_count;
    bbb_accredited = scraped.bbb_accredited;
    bbb_details = scraped.bbb_details;
    bbbMeta = scraped.meta;
  }

  const [trustpilot, yelp] = await Promise.all([
    scrapeTrustpilot(input.legalName),
    scrapeYelp(input.legalName, city, state),
  ]);

  const bbbUiFields = flattenBbbDetailsForUi(bbb_details);

  return {
    confidence: 'public',
    bbb_rating,
    bbb_review_count,
    bbb_accredited,
    bbb_details,
    ...bbbUiFields,
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