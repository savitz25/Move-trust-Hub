'use server';

import { assertAdminSession } from '@/lib/admin/auth';
import { runFmcsaRefresh } from '@/lib/fmcsa/refresh/runner';
import type { RefreshMode } from '@/lib/fmcsa/refresh/types';

export async function triggerFmcsaRefreshAction(input?: {
  mode?: RefreshMode;
  force?: boolean;
  limit?: number;
}) {
  await assertAdminSession();

  return runFmcsaRefresh({
    mode: input?.mode ?? 'incremental',
    triggeredBy: 'admin',
    force: input?.force ?? true,
    limit: input?.limit,
  });
}