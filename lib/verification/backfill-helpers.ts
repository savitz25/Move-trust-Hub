import type {
  CompanyEnrichmentResult,
  GooglePlacesData,
  PublicScrapeData,
} from '@/lib/verification/types';
import { isUsableGoogleSnapshot } from '@/lib/verification/google-places';

/** Only refresh enrichment when missing or older than this many days. */
export const ENRICHMENT_STALE_DAYS = 30;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export type VerificationSources = {
  google?: GooglePlacesData | null;
  public_scrape?: PublicScrapeData | null;
  fmcsa?: Record<string, unknown>;
  bbb?: Record<string, unknown>;
  [key: string]: unknown;
};

export type MoverCompanyRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  verification_sources: VerificationSources;
  verification_last_synced_at: string | null;
  overall_rating: number | null;
  review_count: number | null;
};

export function parseVerificationSources(raw: unknown): VerificationSources {
  if (!raw || typeof raw !== 'object') return {};
  return raw as VerificationSources;
}

export function googleFromVerificationSources(
  sources: VerificationSources
): GooglePlacesData | null {
  return parseGoogleData(sources.google);
}

export function publicScrapeFromVerificationSources(
  sources: VerificationSources
): PublicScrapeData | null {
  return parsePublicScrapeData(sources.public_scrape);
}

export function parseGoogleData(raw: unknown): GooglePlacesData | null {
  if (!raw || typeof raw !== 'object') return null;
  const data = raw as GooglePlacesData;
  // Legacy snapshots may omit status but still have rating/place_id.
  if (!data.status && (data.rating != null || data.place_id || data.review_count != null)) {
    return { ...data, status: 'ok', source: data.source ?? 'google_places_api' };
  }
  return data;
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
  if (isUsableGoogleSnapshot(google)) {
    return isEnrichmentStale(google.last_fetched);
  }
  // Failed / not_found / skipped — retry sooner than full stale window
  return isEnrichmentStale(google.last_fetched, 3);
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
  const google = googleFromVerificationSources(row.verification_sources);
  const scrape = publicScrapeFromVerificationSources(row.verification_sources);
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
 * Merges google + public_scrape into verification_sources; may update overall_rating,
 * review_count, verification_last_synced_at, and last_updated.
 */
export function buildVerificationBackfillUpdate(
  row: MoverCompanyRow,
  enrichment: CompanyEnrichmentResult,
  refreshGoogle: boolean,
  refreshScrape: boolean
): Record<string, unknown> | null {
  const updates: Record<string, unknown> = {};
  const nextSources: VerificationSources = { ...row.verification_sources };
  let changed = false;

  if (refreshGoogle && enrichment.google) {
    const existing = googleFromVerificationSources(row.verification_sources);
    const incoming = enrichment.google;

    // Never overwrite a usable Google snapshot with a failed / empty fetch.
    const shouldApply =
      isUsableGoogleSnapshot(incoming) ||
      (!isUsableGoogleSnapshot(existing) &&
        (incoming.status === 'not_found' ||
          incoming.status === 'error' ||
          incoming.status === 'skipped' ||
          !existing));

    if (shouldApply) {
      nextSources.google = isUsableGoogleSnapshot(incoming)
        ? incoming
        : existing && isUsableGoogleSnapshot(existing)
          ? existing
          : incoming;
      changed = true;

      if (isUsableGoogleSnapshot(incoming) && incoming.rating != null && incoming.rating > 0) {
        updates.overall_rating = incoming.rating;
        if (incoming.review_count != null) {
          updates.review_count = incoming.review_count;
        }
      }
    }
  }

  if (refreshScrape && enrichment.publicScrape) {
    nextSources.public_scrape = enrichment.publicScrape;
    changed = true;
  }

  if (!changed) return null;

  updates.verification_sources = nextSources;
  updates.verification_last_synced_at = new Date().toISOString();
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