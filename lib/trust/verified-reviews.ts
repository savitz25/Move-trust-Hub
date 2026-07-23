import { getCompanyBySlug, seedCompanies } from '@/data/seed-companies';
import { getReviewsForCompany, seedReviews } from '@/data/seed-reviews';
import { CURATED_LISTING_POLICY } from '@/lib/trust/curated-listing-policy';
import type { CountyTestimonial } from '@/lib/local-movers/county-seo';
import type { LocalMover } from '@/lib/local-movers/types';
import type { Review } from '@/types';

export type AttributableReview = CountyTestimonial & {
  reviewId: string;
  source: string;
  date: string;
  companyName?: string;
  companySlug?: string;
};

const SLUG_TO_COMPANY_ID: Record<string, string> = Object.fromEntries(
  seedCompanies.map((c) => [c.slug, c.id])
);

/** Full state names used to detect clearly off-market review locations. */
const US_STATE_NAMES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
  'District of Columbia',
] as const;

export function companyIdFromProfileSlug(profileSlug: string): string | undefined {
  return SLUG_TO_COMPANY_ID[profileSlug] ?? getCompanyBySlug(profileSlug)?.id;
}

export function isAttributableReview(review: Review): boolean {
  if (!review.verified) return false;
  return (CURATED_LISTING_POLICY.attributableReviewSources as readonly string[]).includes(
    review.source
  );
}

export function toAttributableReview(review: Review, companyName?: string): AttributableReview {
  return {
    reviewId: review.id,
    quote: review.content,
    name: review.author,
    location: review.location ?? 'United States',
    rating: review.rating,
    source: review.source,
    date: review.date,
    companyName,
  };
}

export function getAttributableReviewsForCompany(
  companyId: string,
  limit = 3
): AttributableReview[] {
  const company = seedCompanies.find((c) => c.id === companyId);
  return getReviewsForCompany(companyId, limit * 2)
    .filter(isAttributableReview)
    .slice(0, limit)
    .map((r) => toAttributableReview(r, company?.name));
}

export function getAttributableReviewsForMover(mover: LocalMover, limit = 3): AttributableReview[] {
  if (!mover.profileSlug) return [];
  const companyId = companyIdFromProfileSlug(mover.profileSlug);
  if (!companyId) return [];
  return getAttributableReviewsForCompany(companyId, limit);
}

export type CountyReviewBlock = {
  reviews: AttributableReview[];
  hasLocalSource: boolean;
  title: string;
  summary: string;
};

export type CountyReviewBlockOptions = {
  preferLocalMovers?: LocalMover[];
  countyLabel?: string;
  /** County seat / short name tokens for local-market mention scoring */
  marketTokens?: string[];
  /** Full state name, e.g. "Florida" */
  stateName?: string;
  /** State code, e.g. "FL" */
  stateCode?: string;
};

function buildMarketTokens(options?: CountyReviewBlockOptions): string[] {
  const tokens = new Set<string>();
  for (const t of options?.marketTokens ?? []) {
    const v = t.trim().toLowerCase();
    if (v.length >= 3) tokens.add(v);
  }
  const label = (options?.countyLabel ?? '').toLowerCase();
  if (label.length >= 3) {
    tokens.add(label);
    tokens.add(label.replace(/\s+county\b/, '').trim());
  }
  if (options?.stateName) tokens.add(options.stateName.toLowerCase());
  if (options?.stateCode) tokens.add(options.stateCode.toLowerCase());
  return [...tokens].filter(Boolean);
}

/** Prefer reviews that mention county/state/local market in quote or location. */
export function reviewMentionsLocalMarket(
  review: AttributableReview,
  marketTokens: string[]
): boolean {
  if (marketTokens.length === 0) return false;
  const hay = `${review.quote} ${review.location}`.toLowerCase();
  return marketTokens.some((t) => t.length >= 3 && hay.includes(t));
}

/**
 * True when review location clearly names a different US state than the page state
 * (e.g. Atlanta, GA on a Dallas page; Nashville on an Orlando page).
 */
export function reviewLocationConflictsWithPageState(
  location: string,
  stateName?: string,
  stateCode?: string
): boolean {
  if (!stateName && !stateCode) return false;
  const loc = location.trim();
  if (!loc || /^united states$/i.test(loc)) return false;

  const pageName = (stateName ?? '').toLowerCase();
  const pageCode = (stateCode ?? '').toUpperCase();

  // Longer names first so "West Virginia" wins over "Virginia".
  const names = [...US_STATE_NAMES].sort((a, b) => b.length - a.length);
  for (const name of names) {
    if (pageName && name.toLowerCase() === pageName) continue;
    const re = new RegExp(`\\b${name.replace(/\s+/g, '\\s+')}\\b`, 'i');
    if (re.test(loc)) return true;
  }

  // Two-letter state codes after comma: "Atlanta, GA"
  const codeMatch = loc.match(/,\s*([A-Za-z]{2})\s*$/);
  if (codeMatch) {
    const code = codeMatch[1]!.toUpperCase();
    if (pageCode && code !== pageCode && code !== 'US' && code !== 'USA') return true;
  }

  return false;
}

/**
 * Pull attributable Google reviews from directory-linked movers on this list.
 *
 * Global Tier 1 rule:
 * A) Prefer reviews that mention the county/state/local market
 * B) If no sufficiently local/attributable reviews → suppress the block
 * C) Never backfill national/off-market review trios onto county pages
 */
export function buildCountyReviewBlock(
  movers: LocalMover[],
  maxReviews = 3,
  options?: CountyReviewBlockOptions
): CountyReviewBlock {
  const countyLabel = options?.countyLabel ?? 'this county';
  // Explicit preferLocalMovers (even empty) means: only treat those as in-market sources.
  // Empty local segment → suppress county-page review quotes entirely (schema-safe).
  const preferProvided = options?.preferLocalMovers !== undefined;
  const prefer = preferProvided ? options!.preferLocalMovers! : movers;
  const marketTokens = buildMarketTokens(options);

  if (preferProvided && prefer.length === 0) {
    return { reviews: [], hasLocalSource: false, title: '', summary: '' };
  }

  const preferIds = new Set(prefer.map((m) => m.id));

  const collect = (pool: LocalMover[]): AttributableReview[] => {
    const out: AttributableReview[] = [];
    const seen = new Set<string>();
    for (const mover of pool) {
      if (!mover.profileSlug) continue;
      for (const review of getAttributableReviewsForMover(mover, 4)) {
        if (seen.has(review.reviewId)) continue;
        if (
          reviewLocationConflictsWithPageState(
            review.location,
            options?.stateName,
            options?.stateCode
          )
        ) {
          continue;
        }
        seen.add(review.reviewId);
        out.push({
          ...review,
          companyName: review.companyName ?? mover.name,
          companySlug: mover.profileSlug,
        });
      }
    }
    return out;
  };

  // Only collect from preferred (local/in-state) pool when prefer was provided.
  // Do not backfill national-only reviews onto county pages.
  let candidates = collect(prefer);
  if (!preferProvided && candidates.length < maxReviews * 2) {
    const rest = movers.filter((m) => !preferIds.has(m.id));
    const seen = new Set(candidates.map((r) => r.reviewId));
    for (const r of collect(rest)) {
      if (seen.has(r.reviewId)) continue;
      candidates.push(r);
    }
  }

  if (candidates.length === 0) {
    return { reviews: [], hasLocalSource: false, title: '', summary: '' };
  }

  // A) Prefer market-mention reviews; B) if none are local enough when tokens known, suppress.
  const localMention = candidates.filter((r) => reviewMentionsLocalMarket(r, marketTokens));
  let selected: AttributableReview[];

  if (localMention.length > 0) {
    selected = localMention
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, maxReviews);
  } else if (preferProvided && marketTokens.length > 0) {
    // Prefer-local path with market tokens but no review text mentions the market:
    // still allow company-attributable local/in-state reviews (directory-linked).
    // Off-state location conflicts already filtered. Do not invent off-market trios.
    selected = candidates
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, maxReviews);
  } else if (preferProvided) {
    selected = candidates
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, maxReviews);
  } else {
    // No prefer pool and no market mentions → suppress (avoid recycled national trios).
    return { reviews: [], hasLocalSource: false, title: '', summary: '' };
  }

  const hasLocalSource =
    preferProvided &&
    selected.length > 0 &&
    selected.some((r) =>
      prefer.some((m) => m.profileSlug && m.profileSlug === r.companySlug)
    );

  // B) County pages that pass preferLocalMovers only show the block when hasLocalSource.
  if (preferProvided && !hasLocalSource) {
    return { reviews: [], hasLocalSource: false, title: '', summary: '' };
  }

  if (selected.length === 0) {
    return { reviews: [], hasLocalSource: false, title: '', summary: '' };
  }

  if (hasLocalSource || preferProvided) {
    return {
      reviews: selected,
      hasLocalSource: true,
      title: `Attributed reviews from local/in-state carriers on this ${countyLabel} page`,
      summary: `${selected.length} named Google reviews from local/in-state directory listings on this page (not claimed as ${countyLabel}-only experiences).`,
    };
  }

  return {
    reviews: selected,
    hasLocalSource: false,
    title: `Named Google reviews from directory carriers that serve ${countyLabel}`,
    summary: `These reviews are national/company-level — not ${countyLabel}-specific social proof.`,
  };
}

export function buildAttributableCountyReviews(
  movers: LocalMover[],
  maxReviews = 3
): AttributableReview[] {
  return buildCountyReviewBlock(movers, maxReviews).reviews;
}

export function hasAttributableCountyReviews(movers: LocalMover[]): boolean {
  return buildAttributableCountyReviews(movers, 1).length > 0;
}

export function countAttributableReviews(): number {
  return seedReviews.filter(isAttributableReview).length;
}

export function getHomepageAttributableReviews(limit = 4): AttributableReview[] {
  return seedReviews
    .filter(isAttributableReview)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map((r) => {
      const company = seedCompanies.find((c) => c.id === r.companyId);
      return {
        ...toAttributableReview(r, company?.name),
        companyName: company?.name,
        companySlug: company?.slug,
      };
    });
}

/** Mover may emit AggregateRating schema only when directory-linked with attributable reviews. */
export function moverHasSchemaAggregateRating(mover: LocalMover): boolean {
  if (!mover.profileSlug) return false;
  const companyId = companyIdFromProfileSlug(mover.profileSlug);
  if (!companyId) return false;
  return getAttributableReviewsForCompany(companyId, 1).length > 0;
}
