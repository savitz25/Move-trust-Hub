import 'server-only';

import type { Json } from '@/types/supabase';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import { toJsonbColumn } from '@/lib/suggestions/jsonb-payload';
import {
  COVERAGE_PACK_KEY,
  type FmcsaPreviewWithCoverage,
} from '@/lib/suggestions/suggestion-coverage-pack';

export { unpackCoverageFromFmcsaPreview } from '@/lib/suggestions/suggestion-coverage-pack';
export type { FmcsaPreviewWithCoverage } from '@/lib/suggestions/suggestion-coverage-pack';

export function packFmcsaPreviewWithCoverage(
  fmcsaPreview: FmcsaSuggestionPreview | null,
  coverage: WebsiteCoverageData | null
): Json | null {
  if (!fmcsaPreview) return null;
  const payload: FmcsaPreviewWithCoverage = {
    ...fmcsaPreview,
    [COVERAGE_PACK_KEY]: coverage,
  };
  return toJsonbColumn(payload, { label: 'fmcsa_preview', maxBytes: 95_000 });
}

export function mergeCoverageIntoFmcsaPreview(
  existing: Json | null | undefined,
  coverage: WebsiteCoverageData | null
): Json | null {
  if (!coverage) return existing ?? null;
  if (!existing || typeof existing !== 'object') {
    return toJsonbColumn({ [COVERAGE_PACK_KEY]: coverage }, { label: 'fmcsa_preview', maxBytes: 95_000 });
  }

  const record = existing as FmcsaPreviewWithCoverage;
  return toJsonbColumn(
    { ...record, [COVERAGE_PACK_KEY]: coverage },
    { label: 'fmcsa_preview', maxBytes: 95_000 }
  );
}