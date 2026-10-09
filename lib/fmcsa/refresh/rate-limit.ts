export const FMCSA_REFRESH_CONFIG = {
  /** Delay between FMCSA API calls (ms) — stay under QCMobile rate limits */
  requestDelayMs: 250,
  /** Max carriers per incremental cron invocation */
  incrementalBatchSize: 80,
  /**
   * Historical SQL batch size for a full run. 0 means no batch-size cap here.
   * One invocation is bounded by `fullInvocationCap` instead.
   */
  fullBatchSize: 0,
  /**
   * Companies one full-mode invocation may refresh (about 120 of ~5,957).
   * Weekly full mode is a bounded best-effort sweep. The incremental daily
   * run is the main freshness path.
   */
  fullInvocationCap: 120,
  /** Stale threshold for incremental refresh */
  staleAfterHours: 24,
  /** Retry failed carrier lookups */
  maxRetries: 2,
  retryBackoffMs: 1500,
  /** Name search pagination (FMCSA caps at 50 per page) */
  nameSearchPageSize: 50,
  nameSearchMaxPages: 3,
  /** Minimum fuzzy-match score (0–1) to accept a name fallback */
  nameSearchMinConfidence: 0.78,
  /** Best match must beat runner-up by at least this margin */
  nameSearchMinGap: 0.1,
} as const;

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}