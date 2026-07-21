import 'server-only';

import type { Json } from '@/types/supabase';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import type { CompanyEnrichmentResult, GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';
import { parseHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';
import { enrichCompanySources } from '@/lib/verification/enrich-company';
import { toJsonbColumn } from '@/lib/suggestions/jsonb-payload';
import {
  unpackFmcsaPreview,
  type FmcsaPreviewWithEnrichment,
  type StoredSuggestionEnrichment,
} from '@/lib/suggestions/suggestion-enrichment-pack';

export type { StoredSuggestionEnrichment, FmcsaPreviewWithEnrichment } from '@/lib/suggestions/suggestion-enrichment-pack';
export { unpackFmcsaPreview } from '@/lib/suggestions/suggestion-enrichment-pack';

const ENRICHMENT_KEY = '_enrichment';

export function packFmcsaPreviewWithEnrichment(
  fmcsaPreview: FmcsaSuggestionPreview | null,
  enrichment: CompanyEnrichmentResult
): Json | null {
  if (!fmcsaPreview) return null;

  const payload: FmcsaPreviewWithEnrichment = {
    ...fmcsaPreview,
    [ENRICHMENT_KEY]: {
      google: enrichment.google,
      publicScrape: enrichment.publicScrape,
      fetchedAt: enrichment.fetchedAt,
    },
  };

  return toJsonbColumn(payload, { label: 'fmcsa_preview', maxBytes: 90_000 });
}

export function enrichmentFromSuggestionRow(row: {
  google_data?: Json | null;
  public_scrape_data?: Json | null;
  fmcsa_preview?: Json | null;
  legal_name?: string | null;
  name?: string | null;
  headquarters?: string | null;
  phone?: string | null;
  usdot?: string | null;
}): StoredSuggestionEnrichment | null {
  if (row.google_data || row.public_scrape_data) {
    return {
      google: (row.google_data as GooglePlacesData | null) ?? null,
      publicScrape: (row.public_scrape_data as PublicScrapeData | null) ?? null,
      fetchedAt: new Date().toISOString(),
    };
  }

  const packed = unpackFmcsaPreview(row.fmcsa_preview);
  if (packed.enrichment) return packed.enrichment;

  return null;
}

/** Resolve enrichment for approval — stored snapshot first, then live fetch. */
export async function resolveApprovalEnrichment(row: {
  google_data?: Json | null;
  public_scrape_data?: Json | null;
  fmcsa_preview?: Json | null;
  legal_name?: string | null;
  name?: string | null;
  headquarters?: string | null;
  phone?: string | null;
  usdot?: string | null;
}): Promise<CompanyEnrichmentResult> {
  const stored = enrichmentFromSuggestionRow(row);
  if (stored && (stored.google || stored.publicScrape)) {
    return {
      google: stored.google,
      publicScrape: stored.publicScrape,
      fetchedAt: stored.fetchedAt,
    };
  }

  const legalName = row.legal_name || row.name || '';
  const { city, state } = parseHeadquarters(row.headquarters);

  return enrichCompanySources({
    // name is often DBA/public; legal_name is entity — multi-query tries both.
    legalName: row.legal_name || legalName,
    dbaName: row.name && row.name !== row.legal_name ? row.name : null,
    headquarters: row.headquarters,
    phone: row.phone,
    city,
    state,
    usdotNumber: row.usdot?.replace(/\D/g, '') || null,
  });
}