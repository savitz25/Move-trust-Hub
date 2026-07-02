'use server';

import { assertAdminSession } from '@/lib/admin/auth';
import { runBbbRefresh } from '@/lib/bbb/refresh/runner';
import type { RefreshMode } from '@/lib/bbb/refresh/types';

export async function triggerBbbRefreshAction(input?: {
  mode?: RefreshMode;
  force?: boolean;
  limit?: number;
}) {
  await assertAdminSession();

  return runBbbRefresh({
    mode: input?.mode ?? 'incremental',
    triggeredBy: 'admin',
    force: input?.force ?? true,
    limit: input?.limit,
  });
}