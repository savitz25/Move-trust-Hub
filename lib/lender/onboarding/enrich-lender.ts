import 'server-only';

import { fetchCfpbComplaintSummary } from '@/lib/lender/onboarding/cfpb-lookup';
import {
  computeCountyExperienceScore,
  resolveCountyFromAddress,
} from '@/lib/lender/onboarding/county-score';
import type { EnrichedLenderPreview, NmlsSuggestionPreview } from '@/lib/lender/onboarding/types';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';
import { fetchPublicScrapeData } from '@/lib/verification/public-scrape';

export async function enrichLenderSources(
  nmls: NmlsSuggestionPreview,
  zipOverride?: string | null
): Promise<EnrichedLenderPreview> {
  const zip = zipOverride ?? nmls.zip;
  const geo = resolveCountyFromAddress({
    zip,
    city: nmls.city,
    state: nmls.state,
  });

  const enrichmentInput = {
    legalName: nmls.legalName,
    headquarters: [nmls.streetAddress, nmls.city, nmls.state, nmls.zip].filter(Boolean).join(', '),
    phone: nmls.phone ?? undefined,
    city: nmls.city ?? undefined,
    state: nmls.state ?? undefined,
    usdotNumber: undefined,
  };

  const [googleResult, publicScrape, cfpb] = await Promise.all([
    fetchGooglePlacesData({
      ...enrichmentInput,
      businessCategory: 'mortgage lender',
    }),
    fetchPublicScrapeData(enrichmentInput),
    fetchCfpbComplaintSummary(nmls.legalName),
  ]);

  const google = googleResult.status === 'skipped' ? null : googleResult;
  const countyExperienceScore = computeCountyExperienceScore({
    countySlug: geo.countySlug,
    stateSlug: geo.stateSlug,
    licenseCount: nmls.licenses.length,
    googleRating: google?.rating ?? null,
    cfpbComplaints: cfpb.complaintCount,
  });

  return {
    nmls,
    google,
    publicScrape,
    cfpb,
    countySlug: geo.countySlug,
    stateSlug: geo.stateSlug,
    countyExperienceScore,
    fetchedAt: new Date().toISOString(),
  };
}