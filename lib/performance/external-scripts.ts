/**
 * Partytown is intentionally not used:
 * - Next.js 15 App Router + RSC conflicts with worker proxying
 * - Vercel Analytics stays interaction-deferred for main-thread time
 */
export const THIRD_PARTY_STRATEGY = 'interaction-defer' as const;
