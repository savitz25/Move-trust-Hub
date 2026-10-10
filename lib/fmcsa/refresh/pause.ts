import type { RefreshMode } from '@/lib/fmcsa/refresh/types';

/**
 * TH-DPR-001 R2 step A.
 * Code pause so cron, GitHub Actions, and admin calls to `/api/refresh/fmcsa`
 * cannot insert another `fmcsa_refresh_runs` row while the stuck-run fix is pending.
 * Not an environment variable — the default is paused with no env write.
 * A later change can set one mode to false here without touching the route.
 */
export const FMCSA_REFRESH_PAUSED = true;

export const FMCSA_REFRESH_PAUSE_REASON =
  'FMCSA refresh paused: TH-DPR-001 R2 stuck-run fix pending';

const PAUSED_BY_MODE: Record<RefreshMode, boolean> = {
  full: FMCSA_REFRESH_PAUSED,
  incremental: false,
};

export function fmcsaRefreshPause(mode: RefreshMode): { paused: boolean; reason: string } {
  // Unknown modes stay paused. A later PR can set one known mode to false.
  const paused = PAUSED_BY_MODE[mode] ?? true;
  return {
    paused,
    reason: paused ? FMCSA_REFRESH_PAUSE_REASON : '',
  };
}
