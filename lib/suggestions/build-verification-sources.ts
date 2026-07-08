import 'server-only';

import type { VerificationSources } from '@/lib/verification/backfill-helpers';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';

export function buildVerificationSourcesFromOnboarding(input: {
  fmcsaSnapshot?: FmcsaCarrierSnapshot | null;
  fmcsaRaw?: Record<string, unknown> | null;
  google?: GooglePlacesData | null;
  publicScrape?: PublicScrapeData | null;
}): VerificationSources {
  const sources: VerificationSources = {
    fmcsa: {
      source: 'fmcsa_api',
      tier: 'primary',
      last_fetched: new Date().toISOString(),
      dot_number: input.fmcsaSnapshot?.dotNumber ?? null,
      mc_number: input.fmcsaSnapshot?.mcNumber ?? null,
      allowed_to_operate: input.fmcsaSnapshot?.allowedToOperate ?? null,
      authority_active: input.fmcsaSnapshot?.authorityActive ?? null,
      safety_rating: input.fmcsaSnapshot?.safetyRating ?? null,
    },
  };

  if (input.fmcsaRaw && Object.keys(input.fmcsaRaw).length > 0) {
    sources.fmcsa = { ...sources.fmcsa, raw: input.fmcsaRaw };
  }

  if (input.google) {
    sources.google = input.google;
  }

  if (input.publicScrape) {
    sources.public_scrape = input.publicScrape;
  }

  return sources;
}