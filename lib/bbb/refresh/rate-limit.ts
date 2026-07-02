export const BBB_REFRESH_CONFIG = {
  requestDelayMs: 300,
  incrementalBatchSize: 60,
  fullBatchSize: 0,
  staleAfterHours: 24,
  maxRetries: 2,
  retryBackoffMs: 2000,
} as const;

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}