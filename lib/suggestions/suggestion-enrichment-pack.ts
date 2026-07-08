import type { Json } from '@/types/supabase';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

const ENRICHMENT_KEY = '_enrichment';

export type StoredSuggestionEnrichment = {
  google: GooglePlacesData | null;
  publicScrape: PublicScrapeData | null;
  fetchedAt: string;
};

export type FmcsaPreviewWithEnrichment = FmcsaSuggestionPreview & {
  [ENRICHMENT_KEY]?: StoredSuggestionEnrichment;
};

/** Client-safe: extract FMCSA preview + packed enrichment from fmcsa_preview JSON. */
export function unpackFmcsaPreview(raw: Json | Record<string, unknown> | null | undefined): {
  fmcsa: FmcsaSuggestionPreview | null;
  enrichment: StoredSuggestionEnrichment | null;
} {
  if (!raw || typeof raw !== 'object') {
    return { fmcsa: null, enrichment: null };
  }

  const record = raw as FmcsaPreviewWithEnrichment;
  const enrichment = record[ENRICHMENT_KEY] ?? null;
  const { [ENRICHMENT_KEY]: _drop, ...fmcsa } = record;

  const hasCarrier = Boolean(fmcsa.legalName || fmcsa.usdot || fmcsa.displayNumber);
  return {
    fmcsa: hasCarrier ? (fmcsa as FmcsaSuggestionPreview) : null,
    enrichment: enrichment
      ? {
          google: enrichment.google ?? null,
          publicScrape: enrichment.publicScrape ?? null,
          fetchedAt: enrichment.fetchedAt ?? new Date().toISOString(),
        }
      : null,
  };
}