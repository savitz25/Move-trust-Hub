import 'server-only';

import type { Json } from '@/types/supabase';
import { unpackCoverageFromFmcsaPreview } from '@/lib/suggestions/suggestion-coverage-storage';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';

export function coverageFromSuggestionRow(row: {
  fmcsa_preview?: Json | null;
}): WebsiteCoverageData | null {
  return unpackCoverageFromFmcsaPreview(row.fmcsa_preview);
}