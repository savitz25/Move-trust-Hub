'use server';

import { assertAdminSession } from '@/lib/admin/auth';
import { evaluateCanaryRequest } from '@/lib/fmcsa/refresh/canary';
import { runFmcsaRefresh } from '@/lib/fmcsa/refresh/runner';
import type { RefreshMode, RefreshRunResult } from '@/lib/fmcsa/refresh/types';

export async function triggerFmcsaRefreshAction(input?: {
  mode?: RefreshMode;
  force?: boolean;
  limit?: number;
  canary?: boolean;
}): Promise<RefreshRunResult> {
  await assertAdminSession();

  const mode = input?.mode ?? 'incremental';
  const canary = input?.canary === true;
  const decision = evaluateCanaryRequest({
    canary,
    limit: input?.limit,
    mode,
  });

  if (decision && !decision.ok) {
    return {
      runId: '',
      mode,
      status: 'failed',
      companiesTotal: 0,
      companiesProcessed: 0,
      companiesUpdated: 0,
      companiesFailed: 0,
      changesDetected: 0,
      errors: [decision.error],
      durationMs: 0,
      skipped: true,
      skipReason: decision.error,
    };
  }

  return runFmcsaRefresh({
    mode: decision?.mode ?? mode,
    triggeredBy: 'admin',
    force: canary ? (input?.force ?? false) : (input?.force ?? true),
    limit: decision?.limit ?? input?.limit,
    canary,
  });
}