import type {
  CompanyEnrichmentResult,
  GooglePlacesData,
  PublicScrapeData,
} from '@/lib/verification/types';

/** Only refresh enrichment when missing or older than this many days. */
export const ENRICHMENT_STALE_DAYS = 30;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export type MoverCompanyRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  google_data: GooglePlacesData | null;
  public_scrape_data: PublicScrapeData | null;
  overall_rating: number | null;
  review_count: number | null;
};

export function parseGoogleData(raw: unknown): GooglePlacesData | null {
  if (!raw || typeof raw !== 'object') return null;
  return raw as GooglePlacesData;
}

export function parsePublicScrapeData(raw: unknown): PublicScrapeData | null {
  if (!raw || typeof raw !== 'object') return null;
  return raw as PublicScrapeData;
}

export function isEnrichmentStale(
  iso: string | null | undefined,
  staleDays = ENRICHMENT_STALE_DAYS
): boolean {
  if (!iso) return true;
  const parsed = Date.parse(iso);
  if (Number.isNaN(parsed)) return true;
  return Date.now() - parsed > staleDays * MS_PER_DAY;
}

export function needsGoogleEnrichment(
  google: GooglePlacesData | null,
  options?: { force?: boolean }
): boolean {
  if (options?.force) return true;
  if (!google) return true;
  if (google.status === 'ok' && (google.rating != null || google.review_count != null)) {
    return isEnrichmentStale(google.last_fetched);
  }
  return isEnrichmentStale(google.last_fetched);
}

export function needsPublicScrapeEnrichment(
  scrape: PublicScrapeData | null,
  options?: { force?: boolean }
): boolean {
  if (options?.force) return true;
  if (!scrape) return true;
  return isEnrichmentStale(scrape.last_scraped_at);
}

export function companyNeedsVerificationBackfill(
  row: MoverCompanyRow,
  options?: { force?: boolean }
): { needsGoogle: boolean; needsScrape: boolean; needsAny: boolean } {
  const google = parseGoogleData(row.google_data);
  const scrape = parsePublicScrapeData(row.public_scrape_data);
  const needsGoogle = needsGoogleEnrichment(google, options);
  const needsScrape = needsPublicScrapeEnrichment(scrape, options);
  return {
    needsGoogle,
    needsScrape,
    needsAny: needsGoogle || needsScrape,
  };
}

/**
 * Build a safe partial update — never touches FMCSA / BBB official columns on companies.
 * Only google_data, public_scrape_data, overall_rating, review_count, last_updated.
 */
export function buildVerificationBackfillUpdate(
  row: MoverCompanyRow,
  enrichment: CompanyEnrichmentResult,
  refreshGoogle: boolean,
  refreshScrape: boolean
): Record<string, unknown> | null {
  const updates: Record<string, unknown> = {};
  let changed = false;

  if (refreshGoogle && enrichment.google) {
    const existing = parseGoogleData(row.google_data);
    const incoming = enrichment.google;

    const shouldApply =
      incoming.status === 'ok' ||
      incoming.status === 'not_found' ||
      !existing;

    if (shouldApply) {
      updates.google_data = incoming;
      changed = true;

      if (incoming.status === 'ok' && incoming.rating != null && incoming.rating > 0) {
        updates.overall_rating = incoming.rating;
        if (incoming.review_count != null) {
          updates.review_count = incoming.review_count;
        }
      }
    }
  }

  if (refreshScrape && enrichment.publicScrape) {
    updates.public_scrape_data = enrichment.publicScrape;
    changed = true;
  }

  if (!changed) return null;

  updates.last_updated = new Date().toISOString().slice(0, 10);
  return updates;
}

/** FMCSA + authority fields — explicitly excluded from backfill updates. */
export const FMCSA_PROTECTED_COLUMNS = [
  'usdot_number',
  'mc_number',
  'fmcsa_safety_rating',
  'fmcsa_complaints',
  'fmcsa_shipments',
  'fmcsa_last_checked',
  'authority_active',
  'out_of_service',
  'complaints_last_12m',
  'revocation_date',
  'data_hash',
  'bbb_rating',
  'bbb_accredited',
  'bbb_last_checked',
  'bbb_customer_reviews',
  'bbb_data_hash',
  'bbb_business_id',
  'bbb_alert_count',
] as const;