import 'server-only';

import { createHash } from 'crypto';
import { isPortalDbReady, portalAdmin } from '@/lib/portal/db';
import type { CompanyClaim, SubmitClaimInput, VerificationMethod } from '@/lib/portal/types';
import { getCompanyBySlugAsync } from '@/lib/data-server';

function hashValue(value: string): string {
  return createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

function normalizeDot(value: string): string {
  return value.replace(/\D/g, '');
}

function emailDomain(email: string): string | null {
  const parts = email.trim().toLowerCase().split('@');
  return parts.length === 2 ? parts[1] : null;
}

function websiteDomain(website: string | null | undefined): string | null {
  if (!website) return null;
  try {
    const host = new URL(website.startsWith('http') ? website : `https://${website}`).hostname
      .replace(/^www\./, '')
      .toLowerCase();
    return host || null;
  } catch {
    return null;
  }
}

function inferVerificationMethod(
  email: string,
  website: string | null | undefined
): VerificationMethod {
  const eDomain = emailDomain(email);
  const wDomain = websiteDomain(website);
  if (eDomain && wDomain && (eDomain === wDomain || eDomain.endsWith(`.${wDomain}`))) {
    return 'email_domain';
  }
  return 'manual';
}

export async function getPendingClaims(): Promise<CompanyClaim[]> {
  if (!isPortalDbReady()) return [];
  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_claims')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(100);
  if (error || !data) return [];
  return data as CompanyClaim[];
}

export async function getClaimsForUser(userId: string, email: string): Promise<CompanyClaim[]> {
  if (!isPortalDbReady()) return [];
  const admin = portalAdmin();
  const { data } = await admin
    .from('company_claims')
    .select('*')
    .or(`claimant_user_id.eq.${userId},claimant_email.eq.${email.toLowerCase()}`)
    .order('created_at', { ascending: false })
    .limit(20);
  return (data as CompanyClaim[]) ?? [];
}

export async function checkClaimRateLimit(params: {
  ip: string | null;
  email: string;
}): Promise<{ allowed: boolean; reason?: string }> {
  if (!isPortalDbReady()) return { allowed: true };
  const admin = portalAdmin();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const emailHash = hashValue(params.email);

  if (params.ip) {
    const ipHash = hashValue(params.ip);
    const { count: ipCount } = await admin
      .from('portal_claim_rate_limits')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);
    if ((ipCount ?? 0) >= 5) {
      return { allowed: false, reason: 'Too many claim attempts from this network. Try again tomorrow.' };
    }
  }

  const { count: emailCount } = await admin
    .from('portal_claim_rate_limits')
    .select('id', { count: 'exact', head: true })
    .eq('email_hash', emailHash)
    .gte('created_at', since);
  if ((emailCount ?? 0) >= 3) {
    return { allowed: false, reason: 'Too many claim attempts for this email. Try again tomorrow.' };
  }

  return { allowed: true };
}

export async function recordClaimRateLimit(params: {
  ip: string | null;
  email: string;
}): Promise<void> {
  if (!isPortalDbReady()) return;
  const admin = portalAdmin();
  await admin.from('portal_claim_rate_limits').insert({
    ip_hash: params.ip ? hashValue(params.ip) : 'unknown',
    email_hash: hashValue(params.email),
  });
}

export type SubmitClaimResult =
  | { success: true; claimId: string; verificationMethod: VerificationMethod; message: string }
  | { success: false; error: string };

export async function submitCompanyClaim(
  input: SubmitClaimInput,
  options: { userId?: string | null; ip?: string | null } = {}
): Promise<SubmitClaimResult> {
  if (!isPortalDbReady()) {
    return { success: false, error: 'Claim system is not configured yet. Email support to claim your profile.' };
  }

  const name = input.claimantName?.trim();
  const email = input.claimantEmail?.trim().toLowerCase();
  const usdot = normalizeDot(input.usdotSubmitted ?? '');

  if (!name || name.length < 2) return { success: false, error: 'Full name is required.' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'A valid work email is required.' };
  }
  if (!usdot || usdot.length < 5) {
    return { success: false, error: 'Enter the company’s USDOT number for verification.' };
  }

  const company = await getCompanyBySlugAsync(input.companySlug);
  if (!company) return { success: false, error: 'Company profile not found.' };

  const companyDot = normalizeDot(company.usdotNumber ?? '');
  if (!companyDot || companyDot !== usdot) {
    return {
      success: false,
      error: 'USDOT number does not match this listing. Check the number on the public profile and try again.',
    };
  }

  const admin = portalAdmin();

  const { data: existingOwner } = await admin
    .from('company_owners')
    .select('id')
    .eq('company_id', company.id)
    .eq('status', 'active')
    .limit(1)
    .maybeSingle();

  if (existingOwner) {
    return {
      success: false,
      error: 'This profile already has a verified owner. Contact support if you need access transferred.',
    };
  }

  const { data: pending } = await admin
    .from('company_claims')
    .select('id')
    .eq('company_id', company.id)
    .eq('status', 'pending')
    .maybeSingle();

  if (pending) {
    return {
      success: false,
      error: 'A claim is already pending for this company. We will email the claimant when it is reviewed.',
    };
  }

  const rate = await checkClaimRateLimit({ ip: options.ip ?? null, email });
  if (!rate.allowed) return { success: false, error: rate.reason ?? 'Rate limited.' };

  const verificationMethod = inferVerificationMethod(email, company.website);

  const { data, error } = await admin
    .from('company_claims')
    .insert({
      company_id: company.id,
      company_slug: company.slug,
      company_name: company.name,
      claimant_user_id: options.userId ?? null,
      claimant_name: name,
      claimant_email: email,
      claimant_phone: input.claimantPhone?.trim() || null,
      claimant_title: input.claimantTitle?.trim() || null,
      usdot_submitted: usdot,
      verification_method: verificationMethod,
      status: 'pending',
      submitter_ip: options.ip ?? null,
      email_hash: hashValue(email),
    })
    .select('id')
    .single();

  if (error || !data) {
    console.error('[portal] claim insert failed', error?.message);
    return { success: false, error: 'Could not submit claim. Please try again.' };
  }

  await recordClaimRateLimit({ ip: options.ip ?? null, email });

  return {
    success: true,
    claimId: data.id,
    verificationMethod,
    message:
      verificationMethod === 'email_domain'
        ? 'Claim received. Your work email matches the company website domain — sign in with the magic link to continue. Our team will confirm ownership shortly.'
        : 'Claim received. Sign in with the magic link sent to your email. Our team will verify ownership against FMCSA / public records before activating your portal.',
  };
}

export async function linkClaimToUser(claimId: string, userId: string, email: string): Promise<void> {
  if (!isPortalDbReady()) return;
  const admin = portalAdmin();
  await admin
    .from('company_claims')
    .update({ claimant_user_id: userId })
    .eq('id', claimId)
    .eq('claimant_email', email.toLowerCase())
    .is('claimant_user_id', null);
}

export async function approveClaim(params: {
  claimId: string;
  moderatedBy: string;
  note?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isPortalDbReady()) return { success: false, error: 'Database not configured' };
  const admin = portalAdmin();

  const { data: claim, error: fetchErr } = await admin
    .from('company_claims')
    .select('*')
    .eq('id', params.claimId)
    .maybeSingle();

  if (fetchErr || !claim) return { success: false, error: 'Claim not found' };
  if (claim.status !== 'pending' && claim.status !== 'needs_info') {
    return { success: false, error: 'Claim is not pending' };
  }
  if (!claim.claimant_user_id) {
    return {
      success: false,
      error: 'Claimant has not signed in yet. They must complete magic-link login before approval.',
    };
  }

  const { error: ownerErr } = await admin.from('company_owners').upsert(
    {
      company_id: claim.company_id,
      company_slug: claim.company_slug,
      user_id: claim.claimant_user_id,
      claim_id: claim.id,
      role: 'owner',
      status: 'active',
      verified_at: new Date().toISOString(),
    },
    { onConflict: 'company_id,user_id' }
  );

  if (ownerErr) {
    return { success: false, error: ownerErr.message };
  }

  await admin.from('company_portal_profiles').upsert(
    {
      company_id: claim.company_id,
      company_slug: claim.company_slug,
    },
    { onConflict: 'company_id' }
  );

  await admin
    .from('company_claims')
    .update({
      status: 'approved',
      moderated_at: new Date().toISOString(),
      moderated_by: params.moderatedBy,
      moderation_note: params.note ?? null,
    })
    .eq('id', params.claimId);

  return { success: true };
}

export async function rejectClaim(params: {
  claimId: string;
  moderatedBy: string;
  note?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isPortalDbReady()) return { success: false, error: 'Database not configured' };
  const admin = portalAdmin();
  const { error } = await admin
    .from('company_claims')
    .update({
      status: 'rejected',
      moderated_at: new Date().toISOString(),
      moderated_by: params.moderatedBy,
      moderation_note: params.note ?? null,
    })
    .eq('id', params.claimId)
    .in('status', ['pending', 'needs_info']);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
