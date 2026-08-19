import 'server-only';

export function moveV2Flags() {
  const previewCandidate = process.env.VERCEL_ENV === 'preview';
  return {
    enabled: process.env.MOVE_ENABLE_V2 === 'true' || previewCandidate,
    realProviderData: process.env.MOVE_ENABLE_REAL_PROVIDER_DATA === 'true' || previewCandidate,
    googleEnrichment: process.env.MOVE_ENABLE_GOOGLE_ENRICHMENT === 'true',
    websiteEnrichment: process.env.MOVE_ENABLE_WEBSITE_ENRICHMENT === 'true',
    internalReview: process.env.MOVE_ENABLE_INTERNAL_REVIEW === 'true',
    publicReads: process.env.MOVE_ENABLE_PUBLIC_READS === 'true' || previewCandidate,
    sameUrlComposition: process.env.MOVE_ENABLE_SAME_URL_COMPOSITION === 'true' || previewCandidate,
  } as const;
}
