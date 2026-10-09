/**
 * TH-DPR-001 step C — time budget and abandoned-run detection.
 *
 * Vercel hard-kills the route at maxDuration (300s) without running finally.
 * The budget stops new company work early enough to write a terminal row.
 * A running row is abandoned only when `started_at` is older than maxDuration
 * plus a margin. Checkpoints can lag by more than 90s on a slow FMCSA day,
 * so a stale heartbeat is observability and is not an abandon signal.
 */

import { FMCSA_REFRESH_CONFIG } from '@/lib/fmcsa/refresh/rate-limit';

export const FMCSA_REFRESH_BUDGET = {
  /** Matches `export const maxDuration = 300` on the FMCSA refresh route. */
  maxDurationMs: 300_000,
  /** Stop picking up companies ~60s before the platform hard kill. */
  runBudgetMs: 240_000,
  /** Grace after maxDuration before started_at alone marks a row abandoned. */
  abandonMarginMs: 10 * 60 * 1000,
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
 * A running row is abandoned only when `started_at` is older than maxDuration
 * plus the margin (15 minutes). Vercel ends the invocation by maxDuration, so
 * age is the reliable signal.
 *
 * `metadata.last_heartbeat_at` is not consulted. A missing or stale heartbeat
 * must not abandon a younger row, and a fresh heartbeat must not keep a row
 * older than that window alive.
 */
export function isRunningRowAbandoned(
  row: { started_at: string | null; metadata?: unknown },
  nowMs: number,
  config: Pick<FmcsaRefreshBudgetConfig, 'maxDurationMs' | 'abandonMarginMs'>
): boolean {
  const started = row.started_at ? Date.parse(row.started_at) : Number.NaN;
  if (!Number.isFinite(started)) return true;
  return nowMs - started > abandonAfterMs(config);
}

export function releaseIdempotencyKey(key: string, suffix: string): string {
  if (key.includes('#')) return key;
  return `${key}#${suffix}`;
}
