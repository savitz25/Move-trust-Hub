import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { hashEmail, hashIp } from '@/lib/reviews/hash';
import { logger } from '@/lib/logging/logger';

/**
 * Review submission rate limits (spam protection without blocking normal use).
 *
 * | Signal              | Limit                         | Window    |
 * |---------------------|-------------------------------|-----------|
 * | IP address          | 8 submissions                 | 1 hour    |
 * | IP address          | 25 submissions                | 24 hours  |
 * | Email (global)      | 12 submissions                | 24 hours  |
 * | Email + same carrier| 1 non-rejected review         | 30 days   |
 *
 * Prior limit was IP 3/day — far too aggressive for testing and multi-carrier reviews.
 * Shared NAT / office Wi‑Fi also collides many people onto one IP.
 */
export const REVIEW_RATE_LIMITS = {
  ipPerHour: 8,
  ipPerDay: 25,
  emailPerDay: 12,
  /** Same email cannot re-review the same carrier for this many days (unless rejected). */
  emailCompanyCooldownDays: 30,
} as const;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: string; code?: string };

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
  const emailNorm = params.email.trim().toLowerCase();

  // --- 1) Same email + same carrier (duplicate review) ---
  const companyWindowStart = new Date(
    Date.now() - REVIEW_RATE_LIMITS.emailCompanyCooldownDays * DAY_MS
  ).toISOString();

  const { data: duplicate, error: dupError } = await admin
    .from('company_reviews')
    .select('id')
    .eq('company_id', params.companyId)
    .eq('email_hash', emailHash)
    .neq('status', 'rejected')
    .gte('created_at', companyWindowStart)
    .limit(1);

  if (dupError) {
    logger.warn('review.rate_limit_query_failed', {
      check: 'email_company',
      message: dupError.message,
    });
    // Fail open on infra errors so legitimate users are not blocked
  } else if (duplicate?.length) {
    logger.info('review.rate_limit_hit', {
      code: 'email_company_cooldown',
      companyId: params.companyId,
      emailHashPrefix: emailHash.slice(0, 8),
      ipHashPrefix: ipHash?.slice(0, 8) ?? null,
    });
    return {
      allowed: false,
      code: 'email_company_cooldown',
      reason: `You already submitted a review for this carrier in the last ${REVIEW_RATE_LIMITS.emailCompanyCooldownDays} days. Contact us if you need to update it.`,
    };
  }

  // --- 2) Email global daily (abuse from rotating IPs) ---
  const dayAgo = new Date(Date.now() - DAY_MS).toISOString();
  const { count: emailDayCount, error: emailDayError } = await admin
    .from('company_reviews')
    .select('id', { count: 'exact', head: true })
    .eq('email_hash', emailHash)
    .gte('created_at', dayAgo);

  if (emailDayError) {
    logger.warn('review.rate_limit_query_failed', {
      check: 'email_day',
      message: emailDayError.message,
    });
  } else if ((emailDayCount ?? 0) >= REVIEW_RATE_LIMITS.emailPerDay) {
    logger.info('review.rate_limit_hit', {
      code: 'email_day',
      count: emailDayCount,
      limit: REVIEW_RATE_LIMITS.emailPerDay,
      emailHashPrefix: emailHash.slice(0, 8),
      ipHashPrefix: ipHash?.slice(0, 8) ?? null,
    });
    return {
      allowed: false,
      code: 'email_day',
      reason: `You've reached the daily limit of ${REVIEW_RATE_LIMITS.emailPerDay} reviews for this email. Try again tomorrow, or use a different email if you're helping multiple households.`,
    };
  }

  // --- 3) IP hourly + daily (shared NAT still gets headroom for real use) ---
  if (params.ip) {
    const hourAgo = new Date(Date.now() - HOUR_MS).toISOString();

    const { count: ipHourCount, error: ipHourError } = await admin
      .from('company_reviews')
      .select('id', { count: 'exact', head: true })
      .eq('submitter_ip', params.ip)
      .gte('created_at', hourAgo);

    if (ipHourError) {
      logger.warn('review.rate_limit_query_failed', {
        check: 'ip_hour',
        message: ipHourError.message,
      });
    } else if ((ipHourCount ?? 0) >= REVIEW_RATE_LIMITS.ipPerHour) {
      logger.info('review.rate_limit_hit', {
        code: 'ip_hour',
        count: ipHourCount,
        limit: REVIEW_RATE_LIMITS.ipPerHour,
        emailHashPrefix: emailHash.slice(0, 8),
        ipHashPrefix: ipHash?.slice(0, 8) ?? null,
      });
      return {
        allowed: false,
        code: 'ip_hour',
        reason: `Too many reviews from this network in the last hour (limit ${REVIEW_RATE_LIMITS.ipPerHour}). Wait a bit and try again, or submit from a different network.`,
      };
    }

    const { count: ipDayCount, error: ipDayError } = await admin
      .from('company_reviews')
      .select('id', { count: 'exact', head: true })
      .eq('submitter_ip', params.ip)
      .gte('created_at', dayAgo);

    if (ipDayError) {
      logger.warn('review.rate_limit_query_failed', {
        check: 'ip_day',
        message: ipDayError.message,
      });
    } else if ((ipDayCount ?? 0) >= REVIEW_RATE_LIMITS.ipPerDay) {
      logger.info('review.rate_limit_hit', {
        code: 'ip_day',
        count: ipDayCount,
        limit: REVIEW_RATE_LIMITS.ipPerDay,
        emailHashPrefix: emailHash.slice(0, 8),
        ipHashPrefix: ipHash?.slice(0, 8) ?? null,
      });
      return {
        allowed: false,
        code: 'ip_day',
        reason: `This network has reached the daily review limit (${REVIEW_RATE_LIMITS.ipPerDay}/day). Try again tomorrow, or submit from a different connection if you're on shared Wi‑Fi.`,
      };
    }
  }

  // Audit trail (best-effort; not used for hard blocks)
  if (ipHash) {
    const { error: auditError } = await admin.from('review_rate_limits').insert({
      ip_hash: ipHash,
      email_hash: emailHash,
    });
    if (auditError) {
      logger.warn('review.rate_limit_audit_failed', {
        message: auditError.message,
      });
    }
  }

  logger.info('review.rate_limit_ok', {
    emailNormLength: emailNorm.length,
    emailHashPrefix: emailHash.slice(0, 8),
    ipHashPrefix: ipHash?.slice(0, 8) ?? null,
    companyId: params.companyId,
  });

  return { allowed: true };
}
