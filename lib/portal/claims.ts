import 'server-only';

import { createHash } from 'crypto';
import { isPortalDbReady, portalAdmin } from '@/lib/portal/db';
import {
  checkFallbackClaimRateLimit,
  insertFallbackClaim,
  linkFallbackClaimToUser,
  listFallbackClaims,
  recordFallbackClaimRateLimit,
  updateFallbackClaimStatus,
} from '@/lib/portal/claim-fallback';
import {
  getPortalTableMode,
  isMissingRelationError,
  mapClaimDbError,
} from '@/lib/portal/schema';
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

function logClaim(event: string, meta: Record<string, unknown>) {
  console.info(`[portal.claim] ${event}`, meta);
}

export async function getPendingClaims(): Promise<CompanyClaim[]> {
  if (!isPortalDbReady()) return [];

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    return listFallbackClaims({ status: 'pending', limit: 100 });
  }

  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_claims')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(100);

  if (isMissingRelationError(error)) {
    return listFallbackClaims({ status: 'pending', limit: 100 });
  }
  if (error || !data) {
    console.error('[portal.claim] getPendingClaims failed', error?.code, error?.message);
    return [];
  }
  return data as CompanyClaim[];
}

export async function getClaimsForUser(userId: string, email: string): Promise<CompanyClaim[]> {
  if (!isPortalDbReady()) return [];

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    return listFallbackClaims({ email, userId, limit: 20 });
  }

  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_claims')
    .select('*')
    .or(`claimant_user_id.eq.${userId},claimant_email.eq.${email.toLowerCase()}`)
    .order('created_at', { ascending: false })
    .limit(20);

  if (isMissingRelationError(error)) {
    return listFallbackClaims({ email, userId, limit: 20 });
  }
  return (data as CompanyClaim[]) ?? [];
}

export async function checkClaimRateLimit(params: {
  ip: string | null;
  email: string;
}): Promise<{ allowed: boolean; reason?: string }> {
  if (!isPortalDbReady()) return { allowed: true };

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    return checkFallbackClaimRateLimit(params);
  }

  const admin = portalAdmin();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const emailHash = hashValue(params.email);

  if (params.ip) {
    const ipHash = hashValue(params.ip);
    const { count: ipCount, error: ipErr } = await admin
      .from('portal_claim_rate_limits')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);
    if (isMissingRelationError(ipErr)) {
      return checkFallbackClaimRateLimit(params);
    }
    if ((ipCount ?? 0) >= 5) {
      return { allowed: false, reason: 'Too many claim attempts from this network. Try again tomorrow.' };
    }
  }

  const { count: emailCount, error: emailErr } = await admin
    .from('portal_claim_rate_limits')
    .select('id', { count: 'exact', head: true })
    .eq('email_hash', emailHash)
    .gte('created_at', since);
  if (isMissingRelationError(emailErr)) {
    return checkFallbackClaimRateLimit(params);
  }
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

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    await recordFallbackClaimRateLimit(params);
    return;
  }

  const admin = portalAdmin();
  const { error } = await admin.from('portal_claim_rate_limits').insert({
    ip_hash: params.ip ? hashValue(params.ip) : 'unknown',
    email_hash: hashValue(params.email),
  });
  if (isMissingRelationError(error)) {
    await recordFallbackClaimRateLimit(params);
  }
}

export type SubmitClaimResult =
  | { success: true; claimId: string; verificationMethod: VerificationMethod; message: string }
  | { success: false; error: string };

export async function submitCompanyClaim(
  input: SubmitClaimInput,
  options: { userId?: string | null; ip?: string | null } = {}
): Promise<SubmitClaimResult> {
  if (!isPortalDbReady()) {
    logClaim('not_configured', { slug: input.companySlug });
    return {
      success: false,
      error:
        'Claim system is not configured yet. Email info@movetrusthub.com with your company name and USDOT to claim your profile.',
    };
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
  if (!company) {
    logClaim('company_not_found', { slug: input.companySlug });
    return { success: false, error: 'Company profile not found.' };
  }

  const companyDot = normalizeDot(company.usdotNumber ?? '');
  if (!companyDot || companyDot !== usdot) {
    logClaim('usdot_mismatch', {
      slug: company.slug,
      submitted: usdot,
      expected: companyDot || null,
    });
    return {
      success: false,
      error: `USDOT number does not match this listing (expected ${companyDot || 'the number on the public profile'}). Check the profile and try again.`,
    };
  }

  const mode = await getPortalTableMode();
  logClaim('submit_start', {
    mode,
    slug: company.slug,
    companyId: company.id,
    email,
    usdot,
    hasUser: Boolean(options.userId),
  });

  const admin = portalAdmin();

  // --- Active owner check ---
  if (mode === 'native') {
    const { data: existingOwner, error: ownerErr } = await admin
      .from('company_owners')
      .select('id')
      .eq('company_id', company.id)
      .eq('status', 'active')
      .limit(1)
      .maybeSingle();

    if (isMissingRelationError(ownerErr)) {
      // fall through with fallback checks
    } else if (existingOwner) {
      return {
        success: false,
        error:
          'This profile already has a verified owner. Contact support if you need access transferred.',
      };
    }
  }

  // Approved fallback claims count as claimed
  if (mode === 'fallback') {
    const approved = await listFallbackClaims({
      companyId: company.id,
      status: 'approved',
      limit: 1,
    });
    if (approved.length > 0) {
      return {
        success: false,
        error:
          'This profile already has a verified owner. Contact support if you need access transferred.',
      };
    }
  }

  // --- Pending claim check ---
  if (mode === 'native') {
    const { data: pending, error: pendingErr } = await admin
      .from('company_claims')
      .select('id')
      .eq('company_id', company.id)
      .eq('status', 'pending')
      .maybeSingle();

    if (isMissingRelationError(pendingErr)) {
      // handled via fallback insert path below
    } else if (pending) {
      return {
        success: false,
        error:
          'A claim is already pending for this company. We will email the claimant when it is reviewed.',
      };
    }
  }

  if (mode === 'fallback') {
    const pending = await listFallbackClaims({
      companyId: company.id,
      status: 'pending',
      limit: 1,
    });
    if (pending.length > 0) {
      return {
        success: false,
        error:
          'A claim is already pending for this company. We will email the claimant when it is reviewed.',
      };
    }
  }

  const rate = await checkClaimRateLimit({ ip: options.ip ?? null, email });
  if (!rate.allowed) {
    logClaim('rate_limited', { email, reason: rate.reason });
    return { success: false, error: rate.reason ?? 'Rate limited.' };
  }

  const verificationMethod = inferVerificationMethod(email, company.website);

  // --- Insert ---
  if (mode === 'fallback') {
    const inserted = await insertFallbackClaim({
      companyId: company.id,
      companySlug: company.slug,
      companyName: company.name,
      claimantName: name,
      claimantEmail: email,
      claimantPhone: input.claimantPhone?.trim() || null,
      claimantTitle: input.claimantTitle?.trim() || null,
      usdotSubmitted: usdot,
      verificationMethod,
      claimantUserId: options.userId ?? null,
      ip: options.ip ?? null,
    });

    if ('error' in inserted) {
      logClaim('fallback_insert_failed', {
        code: inserted.error?.code,
        message: inserted.error?.message,
        details: inserted.error?.details,
        slug: company.slug,
      });
      return { success: false, error: mapClaimDbError(inserted.error) };
    }

    await recordClaimRateLimit({ ip: options.ip ?? null, email });
    logClaim('fallback_insert_ok', { claimId: inserted.id, slug: company.slug });

    return {
      success: true,
      claimId: inserted.id,
      verificationMethod,
      message: successMessage(verificationMethod),
    };
  }

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

  if (isMissingRelationError(error)) {
    logClaim('native_missing_fallback', { slug: company.slug, message: error?.message });
    const inserted = await insertFallbackClaim({
      companyId: company.id,
      companySlug: company.slug,
      companyName: company.name,
      claimantName: name,
      claimantEmail: email,
      claimantPhone: input.claimantPhone?.trim() || null,
      claimantTitle: input.claimantTitle?.trim() || null,
      usdotSubmitted: usdot,
      verificationMethod,
      claimantUserId: options.userId ?? null,
      ip: options.ip ?? null,
    });

    if ('error' in inserted) {
      logClaim('fallback_insert_failed', {
        code: inserted.error?.code,
        message: inserted.error?.message,
      });
      return { success: false, error: mapClaimDbError(inserted.error) };
    }

    await recordClaimRateLimit({ ip: options.ip ?? null, email });
    return {
      success: true,
      claimId: inserted.id,
      verificationMethod,
      message: successMessage(verificationMethod),
    };
  }

  if (error || !data) {
    logClaim('native_insert_failed', {
      code: error?.code,
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
      slug: company.slug,
      companyId: company.id,
    });
    return { success: false, error: mapClaimDbError(error) };
  }

  await recordClaimRateLimit({ ip: options.ip ?? null, email });
  logClaim('native_insert_ok', { claimId: data.id, slug: company.slug });

  return {
    success: true,
    claimId: data.id,
    verificationMethod,
    message: successMessage(verificationMethod),
  };
}

function successMessage(verificationMethod: VerificationMethod): string {
  return verificationMethod === 'email_domain'
    ? 'Claim received. Your work email matches the company website domain — sign in with the magic link to continue. Our team will confirm ownership shortly.'
    : 'Claim received. Sign in with the magic link sent to your email. Our team will verify ownership against FMCSA / public records before activating your portal.';
}

export async function linkClaimToUser(claimId: string, userId: string, email: string): Promise<void> {
  if (!isPortalDbReady()) return;

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    await linkFallbackClaimToUser(claimId, userId, email);
    return;
  }

  const admin = portalAdmin();
  const { error } = await admin
    .from('company_claims')
    .update({ claimant_user_id: userId })
    .eq('id', claimId)
    .eq('claimant_email', email.toLowerCase())
    .is('claimant_user_id', null);

  if (isMissingRelationError(error)) {
    await linkFallbackClaimToUser(claimId, userId, email);
  }
}

export async function approveClaim(params: {
  claimId: string;
  moderatedBy: string;
  note?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isPortalDbReady()) return { success: false, error: 'Database not configured' };

  const mode = await getPortalTableMode();

  if (mode === 'fallback') {
    const claims = await listFallbackClaims({ limit: 200 });
    const claim = claims.find((c) => c.id === params.claimId);
    if (!claim) return { success: false, error: 'Claim not found' };
    if (claim.status !== 'pending' && claim.status !== 'needs_info') {
      return { success: false, error: 'Claim is not pending' };
    }
    if (!claim.claimant_user_id) {
      return {
        success: false,
        error: 'Claimant has not signed in yet. They must complete magic-link login before approval.',
      };
    }

    const updated = await updateFallbackClaimStatus({
      claimId: params.claimId,
      status: 'approved',
      moderatedBy: params.moderatedBy,
      note: params.note,
      claimantUserId: claim.claimant_user_id,
    });
    if (updated.error) return { success: false, error: updated.error };
    logClaim('fallback_approved', { claimId: params.claimId, companyId: claim.company_id });
    return { success: true };
  }

  const admin = portalAdmin();

  const { data: claim, error: fetchErr } = await admin
    .from('company_claims')
    .select('*')
    .eq('id', params.claimId)
    .maybeSingle();

  if (isMissingRelationError(fetchErr)) {
    const claims = await listFallbackClaims({ limit: 200 });
    const fb = claims.find((c) => c.id === params.claimId);
    if (!fb) return { success: false, error: 'Claim not found' };
    if (!fb.claimant_user_id) {
      return {
        success: false,
        error:
          'Claimant has not signed in yet. They must complete magic-link login before approval.',
      };
    }
    const updated = await updateFallbackClaimStatus({
      claimId: params.claimId,
      status: 'approved',
      moderatedBy: params.moderatedBy,
      note: params.note,
      claimantUserId: fb.claimant_user_id,
    });
    if (updated.error) return { success: false, error: updated.error };
    return { success: true };
  }

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
    logClaim('approve_owner_failed', { message: ownerErr.message, claimId: params.claimId });
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

  logClaim('native_approved', { claimId: params.claimId, companyId: claim.company_id });
  return { success: true };
}

export async function rejectClaim(params: {
  claimId: string;
  moderatedBy: string;
  note?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isPortalDbReady()) return { success: false, error: 'Database not configured' };

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    const updated = await updateFallbackClaimStatus({
      claimId: params.claimId,
      status: 'rejected',
      moderatedBy: params.moderatedBy,
      note: params.note,
    });
    if (updated.error) return { success: false, error: updated.error };
    return { success: true };
  }

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

  if (isMissingRelationError(error)) {
    const updated = await updateFallbackClaimStatus({
      claimId: params.claimId,
      status: 'rejected',
      moderatedBy: params.moderatedBy,
      note: params.note,
    });
    if (updated.error) return { success: false, error: updated.error };
    return { success: true };
  }

  if (error) return { success: false, error: error.message };
  return { success: true };
}
