/**
 * TH-DPR-001 step C — time budget and abandoned-run detection.
 *
 * Vercel hard-kills the route at maxDuration (300s) without running finally.
 * The budget stops new company work early enough to write a terminal row.
 * A running row is abandoned once `started_at` is at least maxDuration plus
 * 60s. A process cannot still be alive past maxDuration. Checkpoints can lag
 * on a slow FMCSA day, so a stale heartbeat is observability only.
 */

import { FMCSA_REFRESH_CONFIG } from '@/lib/fmcsa/refresh/rate-limit';

export const FMCSA_REFRESH_BUDGET = {
  /** Matches `export const maxDuration = 300` on the FMCSA refresh route. */
  maxDurationMs: 300_000,
  /** Stop picking up companies ~60s before the platform hard kill. */
  runBudgetMs: 240_000,
  /** Abandon a running row once it is at least maxDuration plus this grace. */
  abandonMarginMs: 60_000,
  /**
   * Do not start a company, and abort an in-flight FMCSA fetch, when less than
   * this remains before maxDuration. Leaves room to write the terminal row
   * before the platform kill (~280s into a 300s invocation).
   */
  finalizeReserveMs: 20_000,
  /**
   * Observability only. Checkpoints land between companies (every 5 or 15s),
   * and a live fetch can run longer than this. Abandon detection must not
   * consult it: a row younger than maxDuration plus `abandonMarginMs` stays
   * a live lock even when `last_heartbeat_at` is older than this.
   */
  heartbeatStaleMs: 90_000,
  checkpointIntervalMs: 15_000,
  checkpointEveryCompanies: 5,
  /**
   * Production default is `FMCSA_REFRESH_CONFIG.fullInvocationCap`.
   * Injected budgets may override it in tests.
   */
  fullInvocationCap: FMCSA_REFRESH_CONFIG.fullInvocationCap,
  canaryMaxLimit: 10,
} as const;

export type FmcsaRefreshBudgetConfig = {
  maxDurationMs: number;
  runBudgetMs: number;
  abandonMarginMs: number;
  finalizeReserveMs: number;
  heartbeatStaleMs: number;
  checkpointIntervalMs: number;
  checkpointEveryCompanies: number;
  fullInvocationCap: number;
  canaryMaxLimit: number;
};

export function abandonAfterMs(config: Pick<FmcsaRefreshBudgetConfig, 'maxDurationMs' | 'abandonMarginMs'>): number {
  return config.maxDurationMs + config.abandonMarginMs;
}

/** Reads `metadata.last_heartbeat_at` for observability. Not an abandon input. */
export function readHeartbeatMs(metadata: unknown): number | null {
  if (!metadata || typeof metadata !== 'object') return null;
  const raw = (metadata as Record<string, unknown>).last_heartbeat_at;
  if (typeof raw !== 'string' || !raw.trim()) return null;
  const ms = Date.parse(raw);
  return Number.isFinite(ms) ? ms : null;
}

/**
 * A running row is abandoned once `now - started_at >= maxDuration + 60s`
 * (6 minutes). Vercel ends the invocation by maxDuration, so age is the signal.
 *
 * `metadata.last_heartbeat_at` is not consulted. A missing or stale heartbeat
 * must not abandon a younger row.
 */
export function isRunningRowAbandoned(
  row: { started_at: string | null; metadata?: unknown },
  nowMs: number,
  config: Pick<FmcsaRefreshBudgetConfig, 'maxDurationMs' | 'abandonMarginMs'>
): boolean {
  const started = row.started_at ? Date.parse(row.started_at) : Number.NaN;
  if (!Number.isFinite(started)) return true;
  return nowMs - started >= abandonAfterMs(config);
}

export function isFetchAbortError(error: unknown): boolean {
  if (error == null || typeof error !== 'object') return false;
  const name = (error as { name?: string }).name;
  return name === 'AbortError' || name === 'TimeoutError';
}

/**
 * Per-call FMCSA fetch deadline. Same contract as
 * `AbortSignal.timeout(remainingMs - reserveMs)`: the signal aborts after
 * `timeoutMs` so one slow response cannot run past the finalize reserve.
 */
export function createFetchTimeout(timeoutMs: number): { signal: AbortSignal; cancel: () => void } {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return {
      signal: AbortSignal.abort(new DOMException('The operation timed out.', 'TimeoutError')),
      cancel() {},
    };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort(new DOMException('The operation timed out.', 'TimeoutError'));
  }, timeoutMs);
  if (typeof timer.unref === 'function') timer.unref();
  return {
    signal: controller.signal,
    cancel() {
      clearTimeout(timer);
    },
  };
}

export function releaseIdempotencyKey(key: string, suffix: string): string {
  if (key.includes('#')) return key;
  return `${key}#${suffix}`;
}
