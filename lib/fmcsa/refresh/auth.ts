import 'server-only';

import { isAdminSession } from '@/lib/admin/auth';

export type RefreshAuthSource = 'cron' | 'admin' | null;

function getCronSecret(): string | null {
  return process.env.CRON_SECRET?.trim() || null;
}

/** Verify cron bearer token or admin session for refresh endpoints. */
export async function verifyRefreshAuth(
  request: Request
): Promise<{ authorized: boolean; source: RefreshAuthSource }> {
  const cronSecret = getCronSecret();
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

export function isFmcsaRefreshConfigured(): boolean {
  return Boolean(process.env.FMCSA_WEB_KEY?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}