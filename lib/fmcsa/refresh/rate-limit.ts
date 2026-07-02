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
} as const;

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}