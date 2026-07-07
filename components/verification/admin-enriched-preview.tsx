import { MultiSourcePreviewCard } from '@/components/verification/multi-source-preview-card';
import type { PendingSuggestion } from '@/lib/suggestions/queries';
import type { EnrichedCompanyPreview } from '@/lib/suggestions/types';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';

type Props = {
  suggestion: PendingSuggestion;
};

export function AdminEnrichedPreview({ suggestion }: Props) {
  const preview: EnrichedCompanyPreview = {
    fmcsa: (suggestion.fmcsa_preview as FmcsaSuggestionPreview | null) ?? null,
    google: (suggestion.google_data as GooglePlacesData | null) ?? null,
    publicScrape: (suggestion.public_scrape_data as PublicScrapeData | null) ?? null,
    fetchedAt: suggestion.created_at,
  };

  return <MultiSourcePreviewCard preview={preview} showFmcsa={Boolean(preview.fmcsa)} />;
}