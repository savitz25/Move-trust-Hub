import 'server-only';

import { createHash } from 'crypto';
import { portalAdmin } from '@/lib/portal/db';
import type { CompanyClaim, ClaimStatus, VerificationMethod } from '@/lib/portal/types';

/** Marker stored on company_suggestions rows used as portal claims. */
export const PORTAL_CLAIM_SOURCE = 'portal_claim';

export type PortalClaimPayload = {
  portal_claim: true;
  company_id: string;
  company_slug: string;
  company_name: string;
  claimant_user_id: string | null;
  claimant_title: string | null;
  usdot_submitted: string;
  verification_method: VerificationMethod;
  claimant_phone: string | null;
};

function hashValue(value: string): string {
  return createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

function asPayload(raw: unknown): PortalClaimPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  if (obj.portal_claim !== true) return null;
  if (typeof obj.company_id !== 'string' || typeof obj.company_slug !== 'string') return null;
  return obj as unknown as PortalClaimPayload;
}

function suggestionToClaim(row: Record<string, unknown>): CompanyClaim | null {
  const payload = asPayload(row.fmcsa_preview) ?? (() => {
    try {
      const details = typeof row.details === 'string' ? JSON.parse(row.details) : row.details;
      if (details && typeof details === 'object' && (details as { type?: string }).type === 'portal_claim') {
        const d = details as Record<string, unknown>;
        return {
          portal_claim: true as const,
          company_id: String(d.company_id ?? row.company_id ?? ''),
          company_slug: String(d.company_slug ?? ''),
          company_name: String(d.company_name ?? row.name ?? ''),
          claimant_user_id: (d.claimant_user_id as string | null) ?? null,
          claimant_title: (d.claimant_title as string | null) ?? null,
          usdot_submitted: String(d.usdot_submitted ?? row.usdot ?? ''),
          verification_method: (d.verification_method as VerificationMethod) ?? 'manual',
          claimant_phone: (d.claimant_phone as string | null) ?? (row.phone as string | null) ?? null,
        };
      }
    } catch {
      /* ignore */
    }
    return null;
  })();

  if (!payload?.company_id || !payload.company_slug) return null;

  const status = (row.status as ClaimStatus) ?? 'pending';
  // company_suggestions has no needs_info — map only known statuses
  const normalized: ClaimStatus =
    status === 'approved' || status === 'rejected' || status === 'needs_info'
      ? status
      : 'pending';

  return {
    id: String(row.id),
    company_id: payload.company_id,
    company_slug: payload.company_slug,
    company_name: payload.company_name || String(row.name ?? ''),
    claimant_user_id: payload.claimant_user_id,
    claimant_name: String(row.suggested_by_name ?? ''),
    claimant_email: String(row.suggested_by_email ?? '').toLowerCase(),
    claimant_phone: payload.claimant_phone,
    claimant_title: payload.claimant_title,
    usdot_submitted: payload.usdot_submitted,
    verification_method: payload.verification_method,
    status: normalized,
    moderation_note: (row.moderation_note as string | null) ?? null,
    moderated_at: (row.moderated_at as string | null) ?? null,
    moderated_by: (row.moderated_by as string | null) ?? null,
    created_at: String(row.created_at ?? new Date().toISOString()),
    updated_at: String(row.updated_at ?? row.created_at ?? new Date().toISOString()),
  };
}

export async function listFallbackClaims(filters: {
  status?: ClaimStatus;
  companyId?: string;
  email?: string;
  userId?: string;
  limit?: number;
}): Promise<CompanyClaim[]> {
  const admin = portalAdmin();
  let q = admin
    .from('company_suggestions')
    .select('*')
    .eq('source_page', PORTAL_CLAIM_SOURCE)
    .order('created_at', { ascending: false })
    .limit(filters.limit ?? 50);

  if (filters.status) {
    q = q.eq('status', filters.status === 'needs_info' ? 'pending' : filters.status);
  }
  if (filters.companyId) {
    q = q.eq('company_id', filters.companyId);
  }
  if (filters.email) {
    q = q.eq('suggested_by_email', filters.email.toLowerCase());
  }
  // PostgREST JSON filter when looking up ownership by user id
  if (filters.userId && !filters.email) {
    q = q.contains('fmcsa_preview', { claimant_user_id: filters.userId });
  }

  const { data, error } = await q;
  if (error || !data) {
    console.error('[portal] fallback claims list failed', error?.code, error?.message);
    return [];
  }

  let claims = (data as Record<string, unknown>[])
    .map(suggestionToClaim)
    .filter((c): c is CompanyClaim => Boolean(c));

  if (filters.userId) {
    claims = claims.filter(
      (c) =>
        c.claimant_user_id === filters.userId ||
        (filters.email ? c.claimant_email === filters.email.toLowerCase() : false)
    );
  }

  return claims;
}

export async function insertFallbackClaim(input: {
  companyId: string;
  companySlug: string;
  companyName: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone?: string | null;
  claimantTitle?: string | null;
  usdotSubmitted: string;
  verificationMethod: VerificationMethod;
  claimantUserId?: string | null;
  ip?: string | null;
}): Promise<{ id: string } | { error: { code?: string; message?: string; details?: string } }> {
  const admin = portalAdmin();
  const email = input.claimantEmail.trim().toLowerCase();
  const payload: PortalClaimPayload = {
    portal_claim: true,
    company_id: input.companyId,
    company_slug: input.companySlug,
    company_name: input.companyName,
    claimant_user_id: input.claimantUserId ?? null,
    claimant_title: input.claimantTitle ?? null,
    usdot_submitted: input.usdotSubmitted,
    verification_method: input.verificationMethod,
    claimant_phone: input.claimantPhone ?? null,
  };

  const row = {
    name: input.companyName,
    usdot: input.usdotSubmitted,
    company_id: input.companyId,
    suggested_by_name: input.claimantName,
    suggested_by_email: email,
    phone: input.claimantPhone ?? null,
    email_hash: hashValue(email),
    submitter_ip: input.ip ?? null,
    ip_hash: input.ip ? hashValue(input.ip) : null,
    source_page: PORTAL_CLAIM_SOURCE,
    status: 'pending' as const,
    details: JSON.stringify({
      type: 'portal_claim',
      ...payload,
    }),
    fmcsa_preview: payload,
    moderation_note: null,
  };

  const { data, error } = await admin
    .from('company_suggestions')
    .insert(row)
    .select('id')
    .single();

  if (error || !data) {
    return { error: error ?? { message: 'Insert returned no row' } };
  }

  return { id: data.id as string };
}

export async function linkFallbackClaimToUser(
  claimId: string,
  userId: string,
  email: string
): Promise<void> {
  const admin = portalAdmin();
  const { data: row } = await admin
    .from('company_suggestions')
    .select('id, fmcsa_preview, details, suggested_by_email')
    .eq('id', claimId)
    .eq('source_page', PORTAL_CLAIM_SOURCE)
    .eq('suggested_by_email', email.toLowerCase())
    .maybeSingle();

  if (!row) return;

  const prev =
    row.fmcsa_preview && typeof row.fmcsa_preview === 'object'
      ? (row.fmcsa_preview as Record<string, unknown>)
      : {};
  const next = { ...prev, portal_claim: true, claimant_user_id: userId };

  await admin
    .from('company_suggestions')
    .update({ fmcsa_preview: next })
    .eq('id', claimId);
}

export async function updateFallbackClaimStatus(params: {
  claimId: string;
  status: 'approved' | 'rejected';
  moderatedBy: string;
  note?: string;
  claimantUserId?: string | null;
}): Promise<{ error?: string }> {
  const admin = portalAdmin();
  const { data: row } = await admin
    .from('company_suggestions')
    .select('fmcsa_preview')
    .eq('id', params.claimId)
    .eq('source_page', PORTAL_CLAIM_SOURCE)
    .maybeSingle();

  const prev =
    row?.fmcsa_preview && typeof row.fmcsa_preview === 'object'
      ? (row.fmcsa_preview as Record<string, unknown>)
      : {};
  const next = {
    ...prev,
    portal_claim: true,
    ...(params.claimantUserId
      ? { claimant_user_id: params.claimantUserId }
      : {}),
  };

  const { error } = await admin
    .from('company_suggestions')
    .update({
      status: params.status,
      moderated_at: new Date().toISOString(),
      moderated_by: params.moderatedBy,
      moderation_note: params.note ?? null,
      fmcsa_preview: next,
    })
    .eq('id', params.claimId)
    .eq('source_page', PORTAL_CLAIM_SOURCE);

  if (error) return { error: error.message };
  return {};
}

export async function recordFallbackClaimRateLimit(params: {
  ip: string | null;
  email: string;
}): Promise<void> {
  const admin = portalAdmin();
  await admin.from('suggestion_rate_limits').insert({
    ip_hash: params.ip ? hashValue(params.ip) : 'unknown',
    email_hash: hashValue(params.email),
  });
}

export async function checkFallbackClaimRateLimit(params: {
  ip: string | null;
  email: string;
}): Promise<{ allowed: boolean; reason?: string }> {
  const admin = portalAdmin();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const emailHash = hashValue(params.email);

  if (params.ip) {
    const ipHash = hashValue(params.ip);
    const { count: ipCount } = await admin
      .from('suggestion_rate_limits')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);
    if ((ipCount ?? 0) >= 8) {
      return {
        allowed: false,
        reason: 'Too many claim attempts from this network. Try again tomorrow.',
      };
    }
  }

  const { count: emailCount } = await admin
    .from('suggestion_rate_limits')
    .select('id', { count: 'exact', head: true })
    .eq('email_hash', emailHash)
    .gte('created_at', since);
  if ((emailCount ?? 0) >= 3) {
    return {
      allowed: false,
      reason: 'Too many claim attempts for this email. Try again tomorrow.',
    };
  }

  return { allowed: true };
}
