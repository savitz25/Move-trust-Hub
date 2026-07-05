import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { hashEmail, hashIp } from '@/lib/reviews/hash';

const IP_DAILY_LIMIT = 5;
const EMAIL_DAILY_LIMIT = 3;

export type SuggestionRateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: string };

export async function checkSuggestionRateLimit(params: {
  ip: string | null;
  email: string;
}): Promise<SuggestionRateLimitResult> {
  if (!isSupabaseAdminConfigured()) {
    return { allowed: true };
  }

  const admin = createAdminClient();
  const emailHash = hashEmail(params.email);
  const ipHash = params.ip ? hashIp(params.ip) : null;
  const dayAgo = new Date(Date.now() - 86400000).toISOString();

  if (ipHash) {
    const { count } = await admin
      .from('company_suggestions')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', dayAgo);

    if ((count ?? 0) >= IP_DAILY_LIMIT) {
      return {
        allowed: false,
        reason: 'Too many suggestions from your network today. Try again tomorrow.',
      };
    }
  }

  const { count: emailCount } = await admin
    .from('company_suggestions')
    .select('id', { count: 'exact', head: true })
    .eq('email_hash', emailHash)
    .gte('created_at', dayAgo);

  if ((emailCount ?? 0) >= EMAIL_DAILY_LIMIT) {
    return {
      allowed: false,
      reason: 'You have reached the daily suggestion limit for this email.',
    };
  }

  if (ipHash) {
    await admin.from('suggestion_rate_limits').insert({
      ip_hash: ipHash,
      email_hash: emailHash,
    });
  }

  return { allowed: true };
}