import type { Json } from '@/types/supabase';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';

export const COVERAGE_PACK_KEY = '_coverage';

export type FmcsaPreviewWithCoverage = FmcsaSuggestionPreview & {
  [COVERAGE_PACK_KEY]?: WebsiteCoverageData | null;
};

/** Client-safe: extract website coverage packed in fmcsa_preview JSON. */
export function unpackCoverageFromFmcsaPreview(
  raw: Json | Record<string, unknown> | null | undefined
): WebsiteCoverageData | null {
  if (!raw || typeof raw !== 'object') return null;
  const record = raw as FmcsaPreviewWithCoverage;
  const coverage = record[COVERAGE_PACK_KEY];
  if (!coverage || typeof coverage !== 'object') return null;
  return coverage as WebsiteCoverageData;
}