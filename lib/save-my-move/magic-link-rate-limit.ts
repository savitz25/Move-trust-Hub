import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { hashEmail, hashIp } from '@/lib/reviews/hash';

const MAX_EMAIL_REQUESTS_PER_HOUR = 5;
const MAX_IP_REQUESTS_PER_HOUR = 15;
const WINDOW_MS = 60 * 60 * 1000;

export type MagicLinkRateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: string };

type RateLimitRow = {
  request_count: number;
  window_start: string;
};

type RateLimitBump =
  | { allowed: false; reason: string }
  | { allowed: true; nextCount: number; nextWindowStart: string };

function computeRateLimitBump(
  row: RateLimitRow | null,
  now: Date,
  maxRequests: number
): RateLimitBump {
  if (!row) {
    return {
      allowed: true,
      nextCount: 1,
      nextWindowStart: now.toISOString(),
    };
  }

  const windowStart = new Date(row.window_start).getTime();
  const inWindow = now.getTime() - windowStart < WINDOW_MS;
  if (inWindow && row.request_count >= maxRequests) {
    return {
      allowed: false,
      reason: 'Too many requests. Try again in an hour.',
    };
  }

  return {
    allowed: true,
    nextCount: inWindow ? row.request_count + 1 : 1,
    nextWindowStart: inWindow ? row.window_start : now.toISOString(),
  };
}

async function checkEmailRateLimit(email: string): Promise<MagicLinkRateLimitResult> {
  const admin = createAdminClient();
  const now = new Date();
  const emailHash = hashEmail(email);

  const { data: existing, error: selectError } = await admin
    .from('magic_link_rate_limits')
    .select('request_count, window_start')
    .eq('email_hash', emailHash)
    .maybeSingle();

  if (selectError) throw selectError;

  const bumped = computeRateLimitBump(existing, now, MAX_EMAIL_REQUESTS_PER_HOUR);
  if (!bumped.allowed) return bumped;

  if (existing) {
    const { error } = await admin.from('magic_link_rate_limits').upsert({
      email_hash: emailHash,
      request_count: bumped.nextCount,
      window_start: bumped.nextWindowStart,
      last_request_at: now.toISOString(),
    });
    if (error) throw error;
  } else {
    const { error } = await admin.from('magic_link_rate_limits').insert({
      email_hash: emailHash,
      request_count: bumped.nextCount,
      window_start: bumped.nextWindowStart,
      last_request_at: now.toISOString(),
    });
    if (error) throw error;
  }

  return { allowed: true };
}

async function checkIpRateLimit(ip: string): Promise<MagicLinkRateLimitResult> {
  const admin = createAdminClient();
  const now = new Date();
  const ipHash = hashIp(ip);

  const { data: existing, error: selectError } = await admin
    .from('magic_link_ip_rate_limits')
    .select('request_count, window_start')
    .eq('ip_hash', ipHash)
    .maybeSingle();

  if (selectError) throw selectError;

  const bumped = computeRateLimitBump(existing, now, MAX_IP_REQUESTS_PER_HOUR);
  if (!bumped.allowed) return bumped;

  if (existing) {
    const { error } = await admin.from('magic_link_ip_rate_limits').upsert({
      ip_hash: ipHash,
      request_count: bumped.nextCount,
      window_start: bumped.nextWindowStart,
      last_request_at: now.toISOString(),
    });
    if (error) throw error;
  } else {
    const { error } = await admin.from('magic_link_ip_rate_limits').insert({
      ip_hash: ipHash,
      request_count: bumped.nextCount,
      window_start: bumped.nextWindowStart,
      last_request_at: now.toISOString(),
    });
    if (error) throw error;
  }

  return { allowed: true };
}

export async function checkMagicLinkRateLimit(params: {
  email: string;
  ip: string | null;
}): Promise<MagicLinkRateLimitResult> {
  if (!isSupabaseAdminConfigured()) {
    return { allowed: true };
  }

  if (params.ip) {
    const ipResult = await checkIpRateLimit(params.ip);
    if (!ipResult.allowed) return ipResult;
  }

  return checkEmailRateLimit(params.email);
}