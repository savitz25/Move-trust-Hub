/**
 * TH-DPR-001 step C — time budget and abandoned-run detection.
 *
 * Vercel hard-kills the route at maxDuration (300s) without running finally.
 * The budget stops new company work early enough to write a terminal row.
 * A running row older than maxDuration plus a margin, or whose checkpoint
 * heartbeat is stale, is treated as abandoned rather than as a live lock.
 */

export const FMCSA_REFRESH_BUDGET = {
  /** Matches `export const maxDuration = 300` on the FMCSA refresh route. */
  maxDurationMs: 300_000,
  /** Stop picking up companies ~60s before the platform hard kill. */
  runBudgetMs: 240_000,
  /** Grace after maxDuration before started_at alone marks a row abandoned. */
  abandonMarginMs: 10 * 60 * 1000,
  /**
   * No checkpoint newer than this means the worker is gone.
   * Longer than the 15s checkpoint interval, shorter than a human retry.
   */
  heartbeatStaleMs: 90_000,
  checkpointIntervalMs: 15_000,
  checkpointEveryCompanies: 5,
  /**
   * Full mode used to select ~10_000 companies (`fullBatchSize: 0`).
   * One invocation selects at most this many, oldest `fmcsa_last_checked` first.
   */
  fullInvocationCap: 120,
  canaryMaxLimit: 10,
} as const;

export type FmcsaRefreshBudgetConfig = {
  maxDurationMs: number;
  runBudgetMs: number;
  abandonMarginMs: number;
  heartbeatStaleMs: number;
  checkpointIntervalMs: number;
  checkpointEveryCompanies: number;
  fullInvocationCap: number;
  canaryMaxLimit: number;
};

export function abandonAfterMs(config: Pick<FmcsaRefreshBudgetConfig, 'maxDurationMs' | 'abandonMarginMs'>): number {
  return config.maxDurationMs + config.abandonMarginMs;
}

export function readHeartbeatMs(metadata: unknown): number | null {
  if (!metadata || typeof metadata !== 'object') return null;
  const raw = (metadata as Record<string, unknown>).last_heartbeat_at;
  if (typeof raw !== 'string' || !raw.trim()) return null;
  const ms = Date.parse(raw);
  return Number.isFinite(ms) ? ms : null;
}

/**
 * A running row is abandoned when it cannot still be inside the platform
 * window, or when its last checkpoint heartbeat is stale. A missing heartbeat
 * is stale once the row is older than `heartbeatStaleMs` (a just-started run
 * with no checkpoint yet is still active).
 */
export function isRunningRowAbandoned(
  row: { started_at: string | null; metadata?: unknown },
  nowMs: number,
  config: Pick<FmcsaRefreshBudgetConfig, 'maxDurationMs' | 'abandonMarginMs' | 'heartbeatStaleMs'>
): boolean {
  const started = row.started_at ? Date.parse(row.started_at) : Number.NaN;
  if (!Number.isFinite(started)) return true;
  const age = nowMs - started;
  if (age > abandonAfterMs(config)) return true;
  const heartbeat = readHeartbeatMs(row.metadata);
  if (heartbeat == null) return age > config.heartbeatStaleMs;
  return nowMs - heartbeat > config.heartbeatStaleMs;
}

export function releaseIdempotencyKey(key: string, suffix: string): string {
  if (key.includes('#')) return key;
  return `${key}#${suffix}`;
}
