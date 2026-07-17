import 'server-only';

import { cache } from 'react';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { isPortalDbReady, portalAdmin } from '@/lib/portal/db';
import { listFallbackClaims } from '@/lib/portal/claim-fallback';
import { getPortalTableMode, isMissingRelationError } from '@/lib/portal/schema';
import type { CompanyOwner, PortalProfile, InterstateLane } from '@/lib/portal/types';

async function ownersFromFallbackClaims(userId: string): Promise<CompanyOwner[]> {
  const approved = await listFallbackClaims({ status: 'approved', userId, limit: 50 });
  return approved
    .filter((c) => c.claimant_user_id === userId)
    .map((c) => ({
      id: `fallback-${c.id}`,
      company_id: c.company_id,
      company_slug: c.company_slug,
      user_id: userId,
      claim_id: c.id,
      role: 'owner' as const,
      status: 'active' as const,
      verified_at: c.moderated_at ?? c.updated_at,
      company_name: c.company_name,
    }));
}

export async function getActiveOwnersForUser(userId: string): Promise<CompanyOwner[]> {
  if (!isPortalDbReady()) return [];

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    return ownersFromFallbackClaims(userId);
  }

  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_owners')
    .select('id, company_id, company_slug, user_id, claim_id, role, status, verified_at')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('verified_at', { ascending: false });

  if (isMissingRelationError(error)) {
    return ownersFromFallbackClaims(userId);
  }
  if (error || !data) return [];

  const owners = data as CompanyOwner[];
  if (owners.length === 0) return owners;

  const companyIds = owners.map((o) => o.company_id);
  const { data: companies } = await admin
    .from('companies')
    .select('id, name')
    .in('id', companyIds);

  const nameById = new Map(
    (companies ?? []).map((c: { id: string; name: string }) => [c.id, c.name])
  );

  return owners.map((o) => ({
    ...o,
    company_name: nameById.get(o.company_id) ?? o.company_slug,
  }));
}

export const getActiveOwnersForUserCached = cache(getActiveOwnersForUser);

export async function isVerifiedOwnerOfCompany(
  userId: string,
  companyId: string
): Promise<boolean> {
  if (!isPortalDbReady()) return false;

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    const owners = await ownersFromFallbackClaims(userId);
    return owners.some((o) => o.company_id === companyId);
  }

  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_owners')
    .select('id')
    .eq('user_id', userId)
    .eq('company_id', companyId)
    .eq('status', 'active')
    .maybeSingle();

  if (isMissingRelationError(error)) {
    const owners = await ownersFromFallbackClaims(userId);
    return owners.some((o) => o.company_id === companyId);
  }
  return Boolean(data);
}

export async function requireVerifiedOwner(companyId: string) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error('UNAUTHORIZED');
  const ok = await isVerifiedOwnerOfCompany(user.id, companyId);
  if (!ok) throw new Error('FORBIDDEN');
  return user;
}

export async function getOwnerByCompanySlug(
  userId: string,
  companySlug: string
): Promise<CompanyOwner | null> {
  if (!isPortalDbReady()) return null;

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    const owners = await ownersFromFallbackClaims(userId);
    return owners.find((o) => o.company_slug === companySlug) ?? null;
  }

  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_owners')
    .select('id, company_id, company_slug, user_id, claim_id, role, status, verified_at')
    .eq('user_id', userId)
    .eq('company_slug', companySlug)
    .eq('status', 'active')
    .maybeSingle();

  if (isMissingRelationError(error)) {
    const owners = await ownersFromFallbackClaims(userId);
    return owners.find((o) => o.company_slug === companySlug) ?? null;
  }
  return (data as CompanyOwner | null) ?? null;
}

export async function companyIsClaimed(companyId: string): Promise<boolean> {
  if (!isPortalDbReady()) return false;

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    const approved = await listFallbackClaims({
      companyId,
      status: 'approved',
      limit: 1,
    });
    return approved.length > 0;
  }

  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_owners')
    .select('id')
    .eq('company_id', companyId)
    .eq('status', 'active')
    .limit(1)
    .maybeSingle();

  if (isMissingRelationError(error)) {
    const approved = await listFallbackClaims({
      companyId,
      status: 'approved',
      limit: 1,
    });
    return approved.length > 0;
  }
  return Boolean(data);
}

export async function getPortalProfile(companyId: string): Promise<PortalProfile | null> {
  if (!isPortalDbReady()) return null;

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    return null;
  }

  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_portal_profiles')
    .select(
      'company_id, company_slug, last_reputation_sync_at, last_reputation_sync_summary, service_area_mode, service_area_states, service_area_counties, service_area_radius_miles, primary_interstate_lanes, coverage_notes, updated_at'
    )
    .eq('company_id', companyId)
    .maybeSingle();

  if (isMissingRelationError(error) || !data) return null;

  const lanes = Array.isArray(data.primary_interstate_lanes)
    ? (data.primary_interstate_lanes as InterstateLane[])
    : [];

  return {
    company_id: data.company_id,
    company_slug: data.company_slug,
    last_reputation_sync_at: data.last_reputation_sync_at,
    last_reputation_sync_summary: data.last_reputation_sync_summary ?? null,
    service_area_mode: data.service_area_mode,
    service_area_states: data.service_area_states ?? [],
    service_area_counties: data.service_area_counties ?? [],
    service_area_radius_miles: data.service_area_radius_miles,
    primary_interstate_lanes: lanes,
    coverage_notes: data.coverage_notes,
    updated_at: data.updated_at,
  };
}

function emptyPortalProfile(companyId: string, companySlug: string): PortalProfile {
  return {
    company_id: companyId,
    company_slug: companySlug,
    last_reputation_sync_at: null,
    last_reputation_sync_summary: null,
    service_area_mode: 'regional',
    service_area_states: [],
    service_area_counties: [],
    service_area_radius_miles: null,
    primary_interstate_lanes: [],
    coverage_notes: null,
    updated_at: new Date().toISOString(),
  };
}

export async function ensurePortalProfile(
  companyId: string,
  companySlug: string
): Promise<PortalProfile> {
  const existing = await getPortalProfile(companyId);
  if (existing) return existing;

  const mode = await getPortalTableMode();
  if (mode === 'fallback') {
    return emptyPortalProfile(companyId, companySlug);
  }

  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_portal_profiles')
    .upsert(
      {
        company_id: companyId,
        company_slug: companySlug,
      },
      { onConflict: 'company_id' }
    )
    .select(
      'company_id, company_slug, last_reputation_sync_at, last_reputation_sync_summary, service_area_mode, service_area_states, service_area_counties, service_area_radius_miles, primary_interstate_lanes, coverage_notes, updated_at'
    )
    .single();

  if (isMissingRelationError(error) || error || !data) {
    return emptyPortalProfile(companyId, companySlug);
  }

  return {
    company_id: data.company_id,
    company_slug: data.company_slug,
    last_reputation_sync_at: data.last_reputation_sync_at,
    last_reputation_sync_summary: data.last_reputation_sync_summary ?? null,
    service_area_mode: data.service_area_mode,
    service_area_states: data.service_area_states ?? [],
    service_area_counties: data.service_area_counties ?? [],
    service_area_radius_miles: data.service_area_radius_miles,
    primary_interstate_lanes: Array.isArray(data.primary_interstate_lanes)
      ? data.primary_interstate_lanes
      : [],
    coverage_notes: data.coverage_notes,
    updated_at: data.updated_at,
  };
}
