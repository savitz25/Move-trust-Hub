import 'server-only';

import { isAdminSession } from '@/lib/admin/auth';

/** Logged-in admins may bypass rate limits and publish directly to the directory. */
export async function isTrustedCompanySubmitter(): Promise<boolean> {
  return isAdminSession();
}