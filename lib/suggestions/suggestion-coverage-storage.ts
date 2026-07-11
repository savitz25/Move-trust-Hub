import 'server-only';

import type { Json } from '@/types/supabase';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import { toJsonbColumn } from '@/lib/suggestions/jsonb-payload';

const COVERAGE_KEY = '_coverage';

export type FmcsaPreviewWithCoverage = FmcsaSuggestionPreview & {
  [COVERAGE_KEY]?: WebsiteCoverageData | null;
};

export function packFmcsaPreviewWithCoverage(
  fmcsaPreview: FmcsaSuggestionPreview | null,
  coverage: WebsiteCoverageData | null
): Json | null {
  if (!fmcsaPreview) return null;
  const payload: FmcsaPreviewWithCoverage = {
    ...fmcsaPreview,
    [COVERAGE_KEY]: coverage,
  };
  return toJsonbColumn(payload, { label: 'fmcsa_preview', maxBytes: 95_000 });
}

export function unpackCoverageFromFmcsaPreview(
  raw: Json | Record<string, unknown> | null | undefined
): WebsiteCoverageData | null {
  if (!raw || typeof raw !== 'object') return null;
  const record = raw as FmcsaPreviewWithCoverage;
  const coverage = record[COVERAGE_KEY];
  if (!coverage || typeof coverage !== 'object') return null;
  return coverage as WebsiteCoverageData;
}

export function mergeCoverageIntoFmcsaPreview(
  existing: Json | null | undefined,
  coverage: WebsiteCoverageData | null
): Json | null {
  if (!coverage) return existing ?? null;
  if (!existing || typeof existing !== 'object') {
    return toJsonbColumn({ [COVERAGE_KEY]: coverage }, { label: 'fmcsa_preview', maxBytes: 95_000 });
  }

  const record = existing as FmcsaPreviewWithCoverage;
  return toJsonbColumn(
    { ...record, [COVERAGE_KEY]: coverage },
    { label: 'fmcsa_preview', maxBytes: 95_000 }
  );
}