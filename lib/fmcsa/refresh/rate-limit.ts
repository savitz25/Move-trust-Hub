export const FMCSA_REFRESH_CONFIG = {
  /** Delay between FMCSA API calls (ms) — stay under QCMobile rate limits */
  requestDelayMs: 250,
  /** Max carriers per incremental cron invocation */
  incrementalBatchSize: 80,
  /** Max carriers per full weekly run (0 = unlimited) */
  fullBatchSize: 0,
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