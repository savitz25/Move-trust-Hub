import { FMCSA_REFRESH_BUDGET } from '@/lib/fmcsa/refresh/budget';
import { fmcsaRefreshPause } from '@/lib/fmcsa/refresh/pause';
import type { RefreshMode } from '@/lib/fmcsa/refresh/types';

export const FMCSA_CANARY_MAX_LIMIT = FMCSA_REFRESH_BUDGET.canaryMaxLimit;

export type CanaryDecision =
  | { ok: true; limit: number; mode: 'incremental' }
  | { ok: false; status: number; error: string; paused?: boolean };

/**
 * Bounded incremental canary. Returns null when this request is not a canary.
 *
 * Shape is checked first. A well-formed canary then honors step A's
 * `fmcsaRefreshPause` and does not bypass it. Admin or cron auth is enforced
 * by the route and the admin action before this runs.
 */
export function evaluateCanaryRequest(input: {
  canary: boolean;
  limit: number | undefined;
  mode: RefreshMode;
}): CanaryDecision | null {
  if (!input.canary) return null;

  if (input.mode !== 'incremental') {
    return {
      ok: false,
      status: 400,
      error: 'Canary runs are incremental only. Omit mode=full.',
    };
  }

  const limit = input.limit;
  if (limit == null || !Number.isInteger(limit) || limit < 1 || limit > FMCSA_CANARY_MAX_LIMIT) {
    return {
      ok: false,
      status: 400,
      error: `Canary requires an integer limit from 1 to ${FMCSA_CANARY_MAX_LIMIT}.`,
    };
  }

  const pause = fmcsaRefreshPause('incremental');
  if (pause.paused) {
    return {
      ok: false,
      status: 200,
      paused: true,
      error: pause.reason,
    };
  }

  return { ok: true, limit, mode: 'incremental' };
}
