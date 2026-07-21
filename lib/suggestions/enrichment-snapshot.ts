import 'server-only';

import type { EnrichmentSnapshotInput } from '@/lib/suggestions/enrichment-snapshot-schema';
import type { CompanyEnrichmentResult, GooglePlacesData } from '@/lib/verification/types';
import { enrichCompanySources } from '@/lib/verification/enrich-company';

const SNAPSHOT_MAX_AGE_MS = 20 * 60 * 1000;

function isFresh(fetchedAt?: string | null): boolean {
  if (!fetchedAt) return false;
  const ts = Date.parse(fetchedAt);
  if (Number.isNaN(ts)) return false;
  return Date.now() - ts <= SNAPSHOT_MAX_AGE_MS;
}

/**
 * Prefer a fresh client preview snapshot to avoid a second slow scrape on submit.
 * Falls back to server-side enrichment when snapshot is missing or stale.
 */
export async function resolveSubmissionEnrichment(input: {
  legalName: string;
  dbaName?: string | null;
  headquarters?: string | null;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  snapshot?: EnrichmentSnapshotInput;
}): Promise<CompanyEnrichmentResult> {
  const snapshot = input.snapshot;
  if (snapshot && isFresh(snapshot.fetchedAt)) {
    const google: GooglePlacesData | null =
      snapshot.google && snapshot.google.status !== 'skipped'
        ? (snapshot.google as GooglePlacesData)
        : null;

    return {
      google,
      publicScrape: snapshot.publicScrape ?? null,
      fetchedAt: snapshot.fetchedAt ?? new Date().toISOString(),
    };
  }

  return enrichCompanySources({
    legalName: input.legalName,
    dbaName: input.dbaName,
    headquarters: input.headquarters,
    phone: input.phone,
    city: input.city,
    state: input.state,
  });
}