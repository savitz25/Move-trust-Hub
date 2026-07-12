/** Third-party script origins — no dns-prefetch/preconnect until after interaction. */
export const GTAG_SCRIPT_ORIGIN = 'https://www.googletagmanager.com';

export const GTAG_LOAD_OPTIONS = {
  async: true,
  defer: true,
  fetchPriority: 'low' as const,
  crossOrigin: 'anonymous' as const,
};

/**
 * Partytown is intentionally not used:
 * - Next.js 15 App Router + RSC conflicts with worker proxying
 * - Interaction-deferred gtag + Vercel Analytics keeps main-thread TBT low
 * - Self-hosted gtag mirror adds ops burden without PSI gain vs deferral
 */
export const THIRD_PARTY_STRATEGY = 'interaction-defer' as const;