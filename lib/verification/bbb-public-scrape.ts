import 'server-only';

import type {
  BbbScrapeDetails,
  BbbReviewSnippet,
  PublicSourceMeta,
} from '@/lib/verification/types';
import {
  SCRAPE_TIMEOUT_MS,
  SCRAPE_USER_AGENT,
  waitForScrapeSlot,
} from '@/lib/verification/scrape-rate-limit';

/** Valid BBB letter grades — never accept arbitrary matches from search-page HTML. */
const BBB_GRADES = ['A+', 'A-', 'A', 'B+', 'B-', 'B', 'C+', 'C-', 'C', 'D+', 'D-', 'D', 'F'] as const;
const POOR_GRADES = new Set(['D+', 'D', 'D-', 'F']);

export type BbbPublicScrapeInput = {
  companyName: string;
  city?: string;
  state?: string;
  headquarters?: string | null;
  usdotNumber?: string | null;
};

export type BbbPublicScrapeResult = {
  bbb_rating: string | null;
  bbb_review_count: number | null;
  bbb_accredited: boolean | null;
  bbb_details: BbbScrapeDetails | null;
  bbb_accreditation_status: string | null;
  bbb_file_opened: string | null;
  bbb_accredited_since: string | null;
  bbb_profile_url: string | null;
  bbb_recent_reviews: Array<{ text: string; date?: string; author?: string }>;
  meta: PublicSourceMeta;
  /** True only when we confirmed a real bbb.org business profile for this company. */
  listed: boolean;
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

function normalizeBusinessName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(
      /\b(inc|llc|ltd|corp|corporation|company|co|the|and|moving|movers|storage|services|group)\b/g,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
}

/** Token overlap score (0–1) for matching search hits to the target company. */
export function scoreBbbNameMatch(targetName: string, candidateName: string): number {
  const targetTokens = normalizeBusinessName(targetName)
    .split(' ')
    .filter((t) => t.length > 2);
  const candidateTokens = normalizeBusinessName(candidateName)
    .split(' ')
    .filter((t) => t.length > 2);
  if (!targetTokens.length || !candidateTokens.length) return 0;

  const candidateSet = new Set(candidateTokens);
  let overlap = 0;
  for (const token of targetTokens) {
    if (candidateSet.has(token)) overlap++;
  }
  return overlap / Math.max(targetTokens.length, candidateTokens.length);
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

function parseBbbGradeFromProfile(html: string): string | null {
  const patterns = [
    /BBB Rating[\s\S]{0,160}?(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F)\b/i,
    /\b(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F)\s*(?:Rated by BBB|BBB Rating)/i,
    /"ratingValue"\s*:\s*"(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F)"/i,
    /itemprop="ratingValue"[^>]*content="(A\+|A-|A|B\+|B-|B|C\+|C-|C|D\+|D-|D|F)"/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) {
      const grade = m[1].toUpperCase();
      if ((BBB_GRADES as readonly string[]).includes(grade)) return grade;
    }
  }
  return null;
}

function extractLabelValue(html: string, label: string): string | null {
  const re = new RegExp(`${label}\\s*:?\\s*([^<\\n]+)`, 'i');
  const match = html.match(re);
  return match?.[1]?.trim().replace(/\s+/g, ' ') ?? null;
}

function parseJsonLdFoundingDate(html: string): string | null {
  const blocks = [
    ...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
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

function parseYearsSinceDate(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const yearMatch = raw.match(/\b(19|20)\d{2}\b/);
  if (!yearMatch) return null;
  const year = Number.parseInt(yearMatch[0], 10);
  if (Number.isNaN(year)) return null;
  return new Date().getFullYear() - year;
}

/**
 * Log when scraped BBB data looks like a wrong profile match.
 * Does not block display — operators can inspect warnings in backfill logs.
 */
export function warnIfSuspiciousBbbScrape(
  input: BbbPublicScrapeInput,
  result: Pick<
    BbbPublicScrapeResult,
    'bbb_rating' | 'bbb_accredited' | 'bbb_file_opened' | 'bbb_profile_url' | 'listed'
  >
): void {
  if (!result.listed || !result.bbb_rating) return;

  const years = parseYearsSinceDate(result.bbb_file_opened);
  const isPoor = POOR_GRADES.has(result.bbb_rating);

  if (isPoor && years != null && years >= 15) {
    console.warn('[bbb-scrape] suspicious: poor grade on long-established business', {
      company: input.companyName,
      rating: result.bbb_rating,
      fileOpened: result.bbb_file_opened,
      profileUrl: result.bbb_profile_url,
      usdot: input.usdotNumber ?? undefined,
    });
  }

  if (result.bbb_accredited && isPoor) {
    console.warn('[bbb-scrape] suspicious: accredited business with poor grade — verify profile match', {
      company: input.companyName,
      rating: result.bbb_rating,
      profileUrl: result.bbb_profile_url,
    });
  }
}

type BbbSearchCandidate = {
  name: string;
  profileUrl: string;
  city?: string;
  state?: string;
};

function extractSearchCandidates(html: string): BbbSearchCandidate[] {
  const seen = new Set<string>();
  const candidates: BbbSearchCandidate[] = [];

  const patterns = [
    /href="(\/us\/[^"]+\/profile\/[^"?#]+)"[^>]*>([^<]{3,120})</gi,
    /href="(\/us\/[^"]+\/profile\/[^"?#]+)"[\s\S]{0,400}?<[^>]*class="[^"]*business-name[^"]*"[^>]*>([^<]+)</gi,
  ];

  for (const re of patterns) {
    for (const match of html.matchAll(re)) {
      const path = match[1]?.replace(/&amp;/g, '&');
      const name = match[2]?.replace(/<[^>]+>/g, '').trim();
      if (!path || !name || path.includes('/addressId/')) continue;
      const profileUrl = absoluteBbbUrl(path);
      if (seen.has(profileUrl)) continue;
      seen.add(profileUrl);

      const context = match[0] ?? '';
      const city = context.match(/([A-Za-z .'-]+),\s*([A-Z]{2})\b/)?.[1]?.trim();
      const state = context.match(/,\s*([A-Z]{2})\b/)?.[1]?.trim();

      candidates.push({ name, profileUrl, city, state });
    }
  }

  const hqMatch = html.match(/View HQ Business Profile[\s\S]*?href="([^"]+)"/i);
  if (hqMatch?.[1]) {
    const profileUrl = absoluteBbbUrl(hqMatch[1]);
    if (!seen.has(profileUrl)) {
      seen.add(profileUrl);
      candidates.unshift({ name: '', profileUrl });
    }
  }

  return candidates;
}

function searchIndicatesNoResults(html: string): boolean {
  return /no results found|0 results|couldn't find|we didn't find|no businesses found/i.test(html);
}

function scoreSearchCandidate(
  candidate: BbbSearchCandidate,
  input: BbbPublicScrapeInput,
  geo: { city: string; state: string }
): number {
  let score = candidate.name ? scoreBbbNameMatch(input.companyName, candidate.name) : 0.35;

  const targetCity = (input.city ?? geo.city).trim().toLowerCase();
  const targetState = (input.state ?? geo.state).trim().toUpperCase();
  if (targetCity && candidate.city && candidate.city.toLowerCase().includes(targetCity)) {
    score += 0.12;
  }
  if (targetState && candidate.state && candidate.state.toUpperCase() === targetState) {
    score += 0.1;
  }

  return score;
}

function extractBusinessNameFromProfile(html: string): string | null {
  return (
    html.match(/<h1[^>]*class="[^"]*business-name[^"]*"[^>]*>([^<]+)/i)?.[1]?.trim() ??
    html.match(/<h1[^>]*>([^<]{3,120})</i)?.[1]?.trim() ??
    html.match(/"name"\s*:\s*"([^"]{3,120})"/i)?.[1]?.trim() ??
    null
  );
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

function parseBbbReviewsPage(html: string): { count: number; reviews: BbbReviewSnippet[] } {
  const countMatch = html.match(/This business has\s+(\d+)\s+reviews?/i);
  const count = countMatch ? Number.parseInt(countMatch[1]!, 10) : 0;

  const reviews: BbbReviewSnippet[] = [];
  for (const block of html.matchAll(
    /class="[^"]*customer-review[^"]*"[\s\S]*?<\/(?:div|article)>/gi
  )) {
    const snippet = block[0];
    const text =
      snippet
        .match(/class="[^"]*review-text[^"]*"[^>]*>([\s\S]*?)<\//i)?.[1]
        ?.replace(/<[^>]+>/g, '')
        .trim() ??
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

async function parseBbbProfilePage(
  profileHtml: string,
  profileUrl: string,
  input: BbbPublicScrapeInput
): Promise<Omit<BbbPublicScrapeResult, 'meta' | 'listed'> | null> {
  const pageName = extractBusinessNameFromProfile(profileHtml);
  if (pageName && scoreBbbNameMatch(input.companyName, pageName) < 0.35) {
    console.warn('[bbb-scrape] profile name mismatch — skipping', {
      company: input.companyName,
      profileName: pageName,
      profileUrl,
    });
    return null;
  }

  if (!/bbb\.org\/us\//i.test(profileUrl)) {
    return null;
  }

  const accredited = /BBB Accredited Since|This business is BBB Accredited|Accredited Business/i.test(
    profileHtml
  );
  const notAccredited = /Not BBB Accredited|This business is not BBB Accredited/i.test(profileHtml);
  const accreditation_status = accredited
    ? 'BBB Accredited Business'
    : notAccredited
      ? 'Not BBB Accredited'
      : null;

  const accredited_since = extractLabelValue(profileHtml, 'BBB Accredited Since');
  const businessStarted = extractLabelValue(profileHtml, 'Business Started');
  const file_opened =
    extractLabelValue(profileHtml, 'BBB File Opened') ??
    extractLabelValue(profileHtml, 'File Opened') ??
    businessStarted ??
    parseJsonLdFoundingDate(profileHtml);

  const rating = parseBbbGradeFromProfile(profileHtml);

  const reviewsUrl = `${profileUrl.replace(/\/$/, '')}/customer-reviews`;
  const reviewsHtml = await fetchHtml(reviewsUrl);
  const reviewsParsed = reviewsHtml
    ? parseBbbReviewsPage(reviewsHtml)
    : { count: 0, reviews: parseBbbReviewSnippets(profileHtml) };

  const details: BbbScrapeDetails = {
    accreditation_status,
    file_opened_date: file_opened,
    accredited_since,
    profile_url: profileUrl,
    review_snippets: reviewsParsed.reviews,
  };

  return {
    bbb_rating: rating,
    bbb_review_count: reviewsParsed.count,
    bbb_accredited: accredited ? true : notAccredited ? false : null,
    bbb_details: details,
    bbb_accreditation_status: accreditation_status,
    bbb_file_opened: file_opened,
    bbb_accredited_since: accredited_since,
    bbb_profile_url: profileUrl,
    bbb_recent_reviews: reviewsParsed.reviews.map((r) => ({
      text: r.text,
      date: r.date,
      author: r.author,
    })),
  };
}

function emptyBbbResult(
  meta: PublicSourceMeta
): BbbPublicScrapeResult {
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
    meta,
    listed: false,
  };
}

function buildSearchQueries(input: BbbPublicScrapeInput, geo: { city: string; state: string }): string[] {
  const queries = new Set<string>();
  const city = input.city ?? geo.city;
  const state = input.state ?? geo.state;

  if (city && state) queries.add(`${input.companyName} ${city} ${state}`);
  if (state) queries.add(`${input.companyName} ${state}`);
  if (input.usdotNumber) queries.add(`${input.companyName} USDOT ${input.usdotNumber}`);
  queries.add(input.companyName);
  return [...queries];
}

/**
 * Robust public BBB scrape: search → score profile candidates → parse profile page only.
 * Returns listed=false when no confirmed BBB profile exists (hide BBB UI on profiles).
 */
export async function fetchBbbPublicScrape(
  input: BbbPublicScrapeInput
): Promise<BbbPublicScrapeResult> {
  const geo = parseHeadquarters(input.headquarters);
  const queries = buildSearchQueries(input, geo);

  let bestCandidate: { candidate: BbbSearchCandidate; score: number } | null = null;
  let lastSearchUrl = `https://www.bbb.org/search?find_text=${encodeURIComponent(input.companyName)}&find_country=USA`;

  for (const query of queries) {
    const searchUrl = `https://www.bbb.org/search?find_text=${encodeURIComponent(query)}&find_country=USA`;
    lastSearchUrl = searchUrl;
    const searchHtml = await fetchHtml(searchUrl);
    if (!searchHtml) continue;

    if (searchIndicatesNoResults(searchHtml)) continue;

    const candidates = extractSearchCandidates(searchHtml);
    for (const candidate of candidates) {
      const score = scoreSearchCandidate(candidate, input, geo);
      if (score < 0.4) continue;
      if (!bestCandidate || score > bestCandidate.score) {
        bestCandidate = { candidate, score };
      }
    }

    if (bestCandidate && bestCandidate.score >= 0.65) break;
  }

  if (!bestCandidate) {
    return emptyBbbResult({
      status: 'not_found',
      method: 'public_scrape',
      url: lastSearchUrl,
    });
  }

  const profileHtml = await fetchHtml(bestCandidate.candidate.profileUrl);
  if (!profileHtml) {
    return emptyBbbResult({
      status: 'error',
      method: 'public_scrape',
      url: bestCandidate.candidate.profileUrl,
      error: 'Profile fetch failed',
    });
  }

  const parsed = await parseBbbProfilePage(
    profileHtml,
    bestCandidate.candidate.profileUrl,
    input
  );

  if (!parsed) {
    return emptyBbbResult({
      status: 'not_found',
      method: 'public_scrape',
      url: bestCandidate.candidate.profileUrl,
      error: 'Profile did not match company',
    });
  }

  const hasSubstantiveData = Boolean(
    parsed.bbb_rating ||
      parsed.bbb_accreditation_status ||
      parsed.bbb_file_opened ||
      parsed.bbb_profile_url
  );

  if (!hasSubstantiveData) {
    return emptyBbbResult({
      status: 'not_found',
      method: 'public_scrape',
      url: bestCandidate.candidate.profileUrl,
    });
  }

  const result: BbbPublicScrapeResult = {
    ...parsed,
    meta: {
      status: 'ok',
      method: 'public_scrape',
      url: parsed.bbb_profile_url ?? bestCandidate.candidate.profileUrl,
    },
    listed: true,
  };

  warnIfSuspiciousBbbScrape(input, result);
  return result;
}

/** Map official BBB API snapshot + optional profile scrape into the same result shape. */
export async function bbbResultFromApiSnapshot(
  snapshot: {
    accredited: boolean;
    rating: string;
    customerReviews?: number;
    profileUrl?: string;
  },
  input: BbbPublicScrapeInput
): Promise<BbbPublicScrapeResult> {
  if (!snapshot.profileUrl) {
    const rating = snapshot.rating && snapshot.rating !== 'NR' ? snapshot.rating : null;
    if (!rating && !snapshot.accredited) {
      return emptyBbbResult({
        status: 'not_found',
        method: 'bbb_api',
      });
    }
    return {
      bbb_rating: rating,
      bbb_review_count: snapshot.customerReviews ?? null,
      bbb_accredited: snapshot.accredited,
      bbb_details: {
        accreditation_status: snapshot.accredited
          ? 'BBB Accredited Business'
          : 'Not BBB Accredited',
        file_opened_date: null,
        accredited_since: null,
        profile_url: null,
        review_snippets: [],
      },
      bbb_accreditation_status: snapshot.accredited
        ? 'BBB Accredited Business'
        : 'Not BBB Accredited',
      bbb_file_opened: null,
      bbb_accredited_since: null,
      bbb_profile_url: null,
      bbb_recent_reviews: [],
      meta: { status: 'ok', method: 'bbb_api' },
      listed: Boolean(rating || snapshot.accredited),
    };
  }

  const profileHtml = await fetchHtml(snapshot.profileUrl);
  const parsed = profileHtml
    ? await parseBbbProfilePage(profileHtml, snapshot.profileUrl, input)
    : null;

  const base: BbbPublicScrapeResult = parsed
    ? { ...parsed, listed: true, meta: { status: 'ok', method: 'bbb_api', url: snapshot.profileUrl } }
    : {
        bbb_rating: snapshot.rating !== 'NR' ? snapshot.rating : null,
        bbb_review_count: snapshot.customerReviews ?? null,
        bbb_accredited: snapshot.accredited,
        bbb_details: {
          accreditation_status: snapshot.accredited
            ? 'BBB Accredited Business'
            : 'Not BBB Accredited',
          file_opened_date: null,
          accredited_since: null,
          profile_url: snapshot.profileUrl,
          review_snippets: [],
        },
        bbb_accreditation_status: snapshot.accredited
          ? 'BBB Accredited Business'
          : 'Not BBB Accredited',
        bbb_file_opened: null,
        bbb_accredited_since: null,
        bbb_profile_url: snapshot.profileUrl,
        bbb_recent_reviews: [],
        meta: { status: 'ok', method: 'bbb_api', url: snapshot.profileUrl },
        listed: true,
      };

  if (parsed) {
    base.bbb_rating = parsed.bbb_rating ?? (snapshot.rating !== 'NR' ? snapshot.rating : null);
    base.bbb_review_count = parsed.bbb_review_count ?? snapshot.customerReviews ?? null;
  }

  warnIfSuspiciousBbbScrape(input, base);
  return base;
}