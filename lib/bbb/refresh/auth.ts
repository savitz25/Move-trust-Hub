import 'server-only';

import { isAdminSession } from '@/lib/admin/auth';

export type RefreshAuthSource = 'cron' | 'admin' | null;

export async function verifyRefreshAuth(
  request: Request
): Promise<{ authorized: boolean; source: RefreshAuthSource }> {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get('authorization') ?? '';
  const cronHeader = request.headers.get('x-cron-secret') ?? '';

  if (cronSecret) {
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (bearer === cronSecret || cronHeader === cronSecret) {
      return { authorized: true, source: 'cron' };
    }
  }

  if (await isAdminSession()) {
    return { authorized: true, source: 'admin' };
  }

  return { authorized: false, source: null };
}

export function isBbbRefreshConfigured(): boolean {
  return Boolean(
    process.env.BBB_API_KEY?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}