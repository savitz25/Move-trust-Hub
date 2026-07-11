import 'server-only';

import { createAdminClient } from '@/lib/lender/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/lender/supabase/config';

const IP_DAILY_LIMIT = 5;
const EMAIL_DAILY_LIMIT = 3;

export async function checkLenderOnboardingRateLimit(params: {
  ip: string | null;
  email: string;
  ipHash: string | null;
  emailHash: string;
}): Promise<{ allowed: boolean; reason?: string }> {
  if (!isSupabaseAdminConfigured()) {
    return { allowed: false, reason: 'Submissions are temporarily unavailable.' };
  }

  const admin = createAdminClient();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  if (params.ipHash) {
    const { count } = await admin
      .from('lender_onboarding_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', params.ipHash)
      .gte('created_at', since);
    if ((count ?? 0) >= IP_DAILY_LIMIT) {
      return { allowed: false, reason: 'Daily submission limit reached. Try again tomorrow.' };
    }
  }

  const { count: emailCount } = await admin
    .from('lender_onboarding_submissions')
    .select('id', { count: 'exact', head: true })
    .eq('email_hash', params.emailHash)
    .gte('created_at', since);

  if ((emailCount ?? 0) >= EMAIL_DAILY_LIMIT) {
    return {
      allowed: false,
      reason: 'This email has reached the daily submission limit.',
    };
  }

  return { allowed: true };
}