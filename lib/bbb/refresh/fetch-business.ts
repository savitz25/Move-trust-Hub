import 'server-only';

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import type { BbbBusinessSnapshot, BbbRating } from '@/lib/bbb/refresh/types';
import { BBB_REFRESH_CONFIG, sleep } from '@/lib/bbb/refresh/rate-limit';

const BBB_API_BASE = 'https://api.bbb.org/api/orgs';
const VALID_RATINGS = new Set([
  'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F',
]);

function normalizeRating(raw?: string | null): BbbRating {
  const value = (raw ?? '').trim().toUpperCase();
  if (!value) return 'NR';
  const normalized = value.replace(/\s+/g, '');
  const map: Record<string, BbbRating> = {
    'A+': 'A+', A: 'A', 'A-': 'A-',
    'B+': 'B+', B: 'B', 'B-': 'B-',
    'C+': 'C+', C: 'C', 'C-': 'C-',
    'D+': 'D+', D: 'D', 'D-': 'D-',
    F: 'F',
  };
  return map[normalized] ?? (VALID_RATINGS.has(normalized) ? (normalized as BbbRating) : 'NR');
}

function parseHeadquarters(hq: string | null | undefined): { city: string; state: string } {
  if (!hq) return { city: '', state: '' };
  const parts = hq.split(',').map((p) => p.trim());
  if (parts.length >= 2) {
    const state = parts[parts.length - 1].replace(/\d{5}(-\d{4})?/, '').trim();
    const city = parts[parts.length - 2] || parts[0];
    return { city, state: state.slice(0, 2).toUpperCase() };
  }
  return { city: parts[0] ?? '', state: '' };
}

function getApiKey(): string | null {
  return process.env.BBB_API_KEY?.trim() || null;
}

async function bbbFetch<T>(path: string, params?: Record<string, string>): Promise<T | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const url = new URL(`${BBB_API_BASE}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v) url.searchParams.set(k, v);
    }
  }

  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'User-Agent': 'MoveTrustHub/1.0 (directory refresh)',
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type BbbSearchHit = {
  businessId?: string;
  bbbId?: string;
  businessName?: string;
  rating?: string;
  isBBBAccredited?: boolean;
  accredited?: boolean;
  numberOfComplaints?: number;
  complaintCount?: number;
  customerReviewCount?: number;
  reviewCount?: number;
  alertCount?: number;
  url?: string;
  city?: string;
  state?: string;
};

type BbbSearchResponse = {
  results?: BbbSearchHit[];
  totalResults?: number;
};

type BbbProfileResponse = {
  businessId?: string;
  bbbId?: string;
  businessName?: string;
  name?: string;
  rating?: string;
  bbbRating?: string;
  isBBBAccredited?: boolean;
  accredited?: boolean;
  numberOfComplaints?: number;
  complaintCount?: number;
  complaintsInLast36Months?: number;
  customerReviewCount?: number;
  reviewCount?: number;
  alertCount?: number;
  url?: string;
};

function snapshotFromHit(hit: BbbSearchHit | BbbProfileResponse): BbbBusinessSnapshot | null {
  const businessId = hit.businessId;
  const bbbId = hit.bbbId;
  if (!businessId || !bbbId) return null;

  const accredited = Boolean(
    (hit as BbbSearchHit).isBBBAccredited ?? (hit as BbbSearchHit).accredited
  );

  const complaints =
    (hit as BbbProfileResponse).complaintsInLast36Months ??
    hit.numberOfComplaints ??
    hit.complaintCount ??
    0;

  return {
    businessId: String(businessId),
    bbbId: String(bbbId),
    name: hit.businessName ?? (hit as BbbProfileResponse).name ?? '',
    rating: normalizeRating(hit.rating ?? (hit as BbbProfileResponse).bbbRating),
    accredited,
    complaintsLast36m: Number(complaints) || 0,
    customerReviews: Number(hit.customerReviewCount ?? hit.reviewCount ?? 0) || 0,
    alertCount: Number(hit.alertCount ?? 0) || 0,
    profileUrl: hit.url,
    raw: hit as Record<string, unknown>,
  };
}

async function fetchByBusinessId(bbbBusinessId: string): Promise<BbbBusinessSnapshot | null> {
  const [bbbId, businessId] = bbbBusinessId.split('-');
  if (!bbbId || !businessId) return null;

  const profile = await bbbFetch<BbbProfileResponse>(`/${bbbId}/${businessId}`);
  if (!profile) return null;
  return snapshotFromHit(profile);
}

async function searchBusiness(
  name: string,
  city: string,
  state: string
): Promise<BbbBusinessSnapshot | null> {
  const json = await bbbFetch<BbbSearchResponse>('/search', {
    name,
    city,
    state,
    country: 'USA',
    type: 'business',
    pageSize: '5',
  });

  const hit = json?.results?.[0];
  if (!hit) return null;
  return snapshotFromHit(hit);
}

/** Optional bulk CSV fallback: BBB_BULK_CSV_PATH env points to exported profiles. */
function lookupBulkCsv(
  slug: string,
  name: string
): BbbBusinessSnapshot | null {
  const csvPath = process.env.BBB_BULK_CSV_PATH?.trim();
  if (!csvPath || !existsSync(csvPath)) return null;

  try {
    const content = readFileSync(resolve(csvPath), 'utf8');
    const lines = content.split('\n').slice(1);
    const needle = name.toLowerCase();

    for (const line of lines) {
      const cols = line.split(',').map((c) => c.replace(/^"|"$/g, '').trim());
      if (cols.length < 6) continue;
      const [rowSlug, rowName, bbbId, businessId, rating, accredited, complaints, reviews, alerts] = cols;
      if (rowSlug === slug || rowName.toLowerCase() === needle) {
        return {
          businessId,
          bbbId,
          name: rowName,
          rating: normalizeRating(rating),
          accredited: accredited === 'true' || accredited === '1' || accredited === 'yes',
          complaintsLast36m: Number(complaints) || 0,
          customerReviews: Number(reviews) || 0,
          alertCount: Number(alerts) || 0,
          raw: { source: 'bulk_csv', slug: rowSlug },
        };
      }
    }
  } catch {
    return null;
  }
  return null;
}

export async function fetchBbbBusinessSnapshot(input: {
  slug: string;
  name: string;
  headquarters?: string | null;
  website?: string | null;
  bbbBusinessId?: string | null;
}): Promise<BbbBusinessSnapshot | null> {
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= BBB_REFRESH_CONFIG.maxRetries; attempt++) {
    if (attempt > 0) {
      await sleep(BBB_REFRESH_CONFIG.retryBackoffMs * attempt);
    }

    try {
      if (input.bbbBusinessId) {
        const cached = await fetchByBusinessId(input.bbbBusinessId);
        if (cached) {
          await sleep(BBB_REFRESH_CONFIG.requestDelayMs);
          return cached;
        }
      }

      const { city, state } = parseHeadquarters(input.headquarters);
      const searched = await searchBusiness(input.name, city, state);
      if (searched) {
        await sleep(BBB_REFRESH_CONFIG.requestDelayMs);
        return searched;
      }

      const bulk = lookupBulkCsv(input.slug, input.name);
      if (bulk) return bulk;

      lastError = new Error(`No BBB match for ${input.name}`);
    } catch (err) {
      lastError = err;
    }
  }

  console.error('[bbb-refresh] fetch failed', { slug: input.slug, error: lastError });
  return null;
}