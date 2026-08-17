import 'server-only';

export function moveV2Flags() {
  return {
    enabled: process.env.MOVE_ENABLE_V2 === 'true',
    realProviderData: process.env.MOVE_ENABLE_REAL_PROVIDER_DATA === 'true',
    googleEnrichment: process.env.MOVE_ENABLE_GOOGLE_ENRICHMENT === 'true',
    websiteEnrichment: process.env.MOVE_ENABLE_WEBSITE_ENRICHMENT === 'true',
    internalReview: process.env.MOVE_ENABLE_INTERNAL_REVIEW === 'true',
  } as const;
}
