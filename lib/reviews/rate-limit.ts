import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { hashEmail, hashIp } from '@/lib/reviews/hash';

const IP_DAILY_LIMIT = 5;
const EMAIL_COMPANY_DAYS = 90;

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: string };

export async function checkReviewRateLimit(params: {
  ip: string | null;
  email: string;
  companyId: string;
}): Promise<RateLimitResult> {
  if (!isSupabaseAdminConfigured()) {
    return { allowed: true };
  }

  const admin = createAdminClient();
  const emailHash = hashEmail(params.email);
  const ipHash = params.ip ? hashIp(params.ip) : null;

  if (ipHash) {
    const dayAgo = new Date(Date.now() - 86400000).toISOString();
    const { count } = await admin
      .from('company_reviews')
      .select('id', { count: 'exact', head: true })
      .eq('submitter_ip', params.ip)
      .gte('created_at', dayAgo);

    if ((count ?? 0) >= IP_DAILY_LIMIT) {
      return {
        allowed: false,
        reason: 'Too many review submissions from your network today. Try again tomorrow.',
      };
    }
  }

  const windowStart = new Date(
    Date.now() - EMAIL_COMPANY_DAYS * 86400000
  ).toISOString();

  const { data: duplicate } = await admin
    .from('company_reviews')
    .select('id')
    .eq('company_id', params.companyId)
    .eq('email_hash', emailHash)
    .neq('status', 'rejected')
    .gte('created_at', windowStart)
    .limit(1);

  if (duplicate?.length) {
    return {
      allowed: false,
      reason:
        'You already submitted a review for this carrier recently. Contact us if you need to update it.',
    };
  }

  if (ipHash) {
    await admin.from('review_rate_limits').insert({
      ip_hash: ipHash,
      email_hash: emailHash,
    });
  }

  return { allowed: true };
}