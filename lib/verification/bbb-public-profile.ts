import 'server-only';

import type { BbbPublicReview, PublicSourceMeta } from '@/lib/verification/types';
import {
  SCRAPE_TIMEOUT_MS,
  SCRAPE_USER_AGENT,
  waitForScrapeSlot,
} from '@/lib/verification/scrape-rate-limit';

export type BbbPublicProfileResult = {
  bbb_rating: string | null;
  bbb_review_count: number | null;
  bbb_accredited: boolean | null;
  bbb_accreditation_status: string | null;
  bbb_file_opened: string | null;
  bbb_accredited_since: string | null;
  bbb_profile_url: string | null;
  bbb_recent_reviews: BbbPublicReview[];
  meta: PublicSourceMeta;
};

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

function absoluteBbbUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `https://www.bbb.org${path.startsWith('/') ? path : `/${path}`}`;
}

function extractLabelValue(html: string, label: string): string | null {
  const re = new RegExp(`${label}\\s*:?\\s*([^<\\n]+)`, 'i');
  const match = html.match(re);
  return match?.[1]?.trim().replace(/\s+/g, ' ') ?? null;
}

function parseBbbGrade(html: string): string | null {
  const patterns = [
    /BBB Rating[\s\S]{0,120}?(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F)\b/i,
    /\b(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F)\s*Rated by BBB/i,
    /"ratingValue"\s*:\s*"(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F)"/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].toUpperCase();
  }
  return null;
}

function parseJsonLdFoundingDate(html: string): string | null {
  const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of blocks) {
    try {
      const json = JSON.parse(block[1]!) as unknown;
      const items = Array.isArray(json) ? json : [json];
      for (const item of items) {
        if (item && typeof item === 'object' && 'foundingDate' in item) {
          const fd = (item as { foundingDate?: string }).foundingDate;
          if (fd) return fd;
        }
      }
    } catch {
      /* ignore malformed JSON-LD */
    }
  }
  return null;
}

function resolveProfileUrlFromSearch(html: string): string | null {
  const hq = html.match(/View HQ Business Profile[\s\S]*?href="([^"]+)"/i);
  if (hq?.[1]) return absoluteBbbUrl(hq[1]);

  const profileLinks = [
    ...html.matchAll(/href="(\/us\/[^"]+\/profile\/[^"?#]+)"/gi),
  ].map((m) => m[1]!);

  const hqLink = profileLinks.find((p) => !p.includes('/addressId/'));
  if (hqLink) return absoluteBbbUrl(hqLink);

  return profileLinks[0] ? absoluteBbbUrl(profileLinks[0]) : null;
}

function parseBbbReviewsPage(html: string): { count: number; reviews: BbbPublicReview[] } {
  const countMatch = html.match(/This business has\s+(\d+)\s+reviews?/i);
  const count = countMatch ? Number.parseInt(countMatch[1]!, 10) : 0;

  const reviews: BbbPublicReview[] = [];
  const reviewBlocks = html.matchAll(
    /class="[^"]*customer-review[^"]*"[\s\S]*?<\/(?:div|article)>/gi
  );

  for (const block of reviewBlocks) {
    const snippet = block[0];
    const text =
      snippet.match(/class="[^"]*review-text[^"]*"[^>]*>([\s\S]*?)<\//i)?.[1]?.replace(/<[^>]+>/g, '').trim() ??
      snippet.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
    const date = snippet.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/)?.[1];
    const author = snippet.match(/class="[^"]*reviewer[^"]*"[^>]*>([^<]+)/i)?.[1]?.trim();
    if (text && text.length > 10) {
      reviews.push({ text: text.slice(0, 500), date, author });
    }
    if (reviews.length >= 5) break;
  }

  return { count: Number.isFinite(count) ? count : reviews.length, reviews };
}

function parseBbbProfilePage(html: string, profileUrl: string): Omit<BbbPublicProfileResult, 'meta'> {
  const accredited =
    /BBB Accredited Since|This business is BBB Accredited|Accredited Business/i.test(html);
  const accreditedSince = extractLabelValue(html, 'BBB Accredited Since');
  const businessStarted = extractLabelValue(html, 'Business Started');
  const fileOpened =
    extractLabelValue(html, 'BBB File Opened') ??
    extractLabelValue(html, 'File Opened') ??
    businessStarted ??
    parseJsonLdFoundingDate(html);

  return {
    bbb_rating: parseBbbGrade(html),
    bbb_review_count: null,
    bbb_accredited: accredited || null,
    bbb_accreditation_status: accredited ? 'BBB Accredited' : 'Not BBB Accredited',
    bbb_file_opened: fileOpened,
    bbb_accredited_since: accreditedSince,
    bbb_profile_url: profileUrl,
    bbb_recent_reviews: [],
  };
}

/**
 * Deep BBB public scrape: search → HQ profile → customer reviews page.
 * Used for one-off tests and richer public_scrape_data.bbb_* fields.
 */
export async function fetchBbbPublicProfile(params: {
  companyName: string;
  city?: string;
  state?: string;
  headquarters?: string | null;
}): Promise<BbbPublicProfileResult> {
  const geoCity = params.city ?? '';
  const geoState = params.state ?? '';
  const query = encodeURIComponent(
    `${params.companyName} ${geoCity} ${geoState}`.trim() || params.companyName
  );
  const searchUrl = `https://www.bbb.org/search?find_text=${query}&find_country=USA`;

  const searchHtml = await fetchHtml(searchUrl);
  if (!searchHtml) {
    return {
      bbb_rating: null,
      bbb_review_count: null,
      bbb_accredited: null,
      bbb_accreditation_status: null,
      bbb_file_opened: null,
      bbb_accredited_since: null,
      bbb_profile_url: null,
      bbb_recent_reviews: [],
      meta: { status: 'error', method: 'public_scrape', url: searchUrl, error: 'Search failed' },
    };
  }

  const profileUrl = resolveProfileUrlFromSearch(searchHtml);
  if (!profileUrl) {
    return {
      bbb_rating: null,
      bbb_review_count: null,
      bbb_accredited: null,
      bbb_accreditation_status: null,
      bbb_file_opened: null,
      bbb_accredited_since: null,
      bbb_profile_url: null,
      bbb_recent_reviews: [],
      meta: { status: 'not_found', method: 'public_scrape', url: searchUrl },
    };
  }

  const profileHtml = await fetchHtml(profileUrl);
  if (!profileHtml) {
    return {
      bbb_rating: null,
      bbb_review_count: null,
      bbb_accredited: null,
      bbb_accreditation_status: null,
      bbb_file_opened: null,
      bbb_accredited_since: null,
      bbb_profile_url: profileUrl,
      bbb_recent_reviews: [],
      meta: { status: 'error', method: 'public_scrape', url: profileUrl, error: 'Profile fetch failed' },
    };
  }

  const parsed = parseBbbProfilePage(profileHtml, profileUrl);
  const reviewsUrl = `${profileUrl.replace(/\/$/, '')}/customer-reviews`;
  const reviewsHtml = await fetchHtml(reviewsUrl);
  const reviewsParsed = reviewsHtml ? parseBbbReviewsPage(reviewsHtml) : { count: 0, reviews: [] };

  return {
    ...parsed,
    bbb_review_count: reviewsParsed.count,
    bbb_recent_reviews: reviewsParsed.reviews,
    meta: {
      status: parsed.bbb_rating || parsed.bbb_accredited ? 'ok' : 'not_found',
      method: 'public_scrape',
      url: profileUrl,
    },
  };
}