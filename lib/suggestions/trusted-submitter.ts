import 'server-only';

import { isAdminSession } from '@/lib/admin/auth';
import {
  isTrustedSubmitterEmail,
  normalizeTrustedEmail,
} from '@/lib/suggestions/trusted-emails';

export {
  getTrustedSubmitterEmails,
  isTrustedSubmitterEmail,
  normalizeTrustedEmail,
} from '@/lib/suggestions/trusted-emails';

export type TrustedSubmitterReason = 'admin_session' | 'admin_email' | null;

/**
 * Trusted submitters may bypass daily suggestion limits and publish directly
 * for BOTH Interstate and Intrastate / Local onboarding.
 *
 * Trust sources (either is enough):
 * 1. Logged-in admin session (mth_admin_session cookie)
 * 2. Submission email matches configured admin emails (e.g. info@movetrusthub.com)
 */
export async function isTrustedCompanySubmitter(
  submissionEmail?: string | null
): Promise<boolean> {
  if (await isAdminSession()) return true;
  if (isTrustedSubmitterEmail(submissionEmail)) return true;
  return false;
}

export async function resolveTrustedSubmitter(
  submissionEmail?: string | null
): Promise<{ trusted: boolean; reason: TrustedSubmitterReason }> {
  if (await isAdminSession()) {
    return { trusted: true, reason: 'admin_session' };
  }
  if (isTrustedSubmitterEmail(submissionEmail)) {
    return { trusted: true, reason: 'admin_email' };
  }
  return { trusted: false, reason: null };
}
