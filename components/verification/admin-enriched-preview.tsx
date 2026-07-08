import { MultiSourcePreviewCard } from '@/components/verification/multi-source-preview-card';
import type { PendingSuggestion } from '@/lib/suggestions/queries';
import type { EnrichedCompanyPreview } from '@/lib/suggestions/types';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';
import { unpackFmcsaPreview } from '@/lib/suggestions/suggestion-enrichment-pack';

type Props = {
  suggestion: PendingSuggestion;
};

export function AdminEnrichedPreview({ suggestion }: Props) {
  const packed = unpackFmcsaPreview(suggestion.fmcsa_preview);
  const preview: EnrichedCompanyPreview = {
    fmcsa: packed.fmcsa,
    google:
      (suggestion.google_data as GooglePlacesData | null) ??
      packed.enrichment?.google ??
      null,
    publicScrape:
      (suggestion.public_scrape_data as PublicScrapeData | null) ??
      packed.enrichment?.publicScrape ??
      null,
    fetchedAt: packed.enrichment?.fetchedAt ?? suggestion.created_at,
  };

  return <MultiSourcePreviewCard preview={preview} showFmcsa={Boolean(preview.fmcsa)} />;
}