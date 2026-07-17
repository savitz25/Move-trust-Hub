import 'server-only';

import { cache } from 'react';
import { getAuthenticatedUser } from '@/lib/save-my-move/auth';
import { isPortalDbReady, portalAdmin } from '@/lib/portal/db';
import type { CompanyOwner, PortalProfile, InterstateLane } from '@/lib/portal/types';

export async function getActiveOwnersForUser(userId: string): Promise<CompanyOwner[]> {
  if (!isPortalDbReady()) return [];
  const admin = portalAdmin();
  const { data, error } = await admin
    .from('company_owners')
    .select('id, company_id, company_slug, user_id, claim_id, role, status, verified_at')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('verified_at', { ascending: false });

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
  const admin = portalAdmin();
  const { data } = await admin
    .from('company_owners')
    .select('id')
    .eq('user_id', userId)
    .eq('company_id', companyId)
    .eq('status', 'active')
    .maybeSingle();
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
  const admin = portalAdmin();
  const { data } = await admin
    .from('company_owners')
    .select('id, company_id, company_slug, user_id, claim_id, role, status, verified_at')
    .eq('user_id', userId)
    .eq('company_slug', companySlug)
    .eq('status', 'active')
    .maybeSingle();
  return (data as CompanyOwner | null) ?? null;
}

export async function companyIsClaimed(companyId: string): Promise<boolean> {
  if (!isPortalDbReady()) return false;
  const admin = portalAdmin();
  const { data } = await admin
    .from('company_owners')
    .select('id')
    .eq('company_id', companyId)
    .eq('status', 'active')
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

export async function getPortalProfile(companyId: string): Promise<PortalProfile | null> {
  if (!isPortalDbReady()) return null;
  const admin = portalAdmin();
  const { data } = await admin
    .from('company_portal_profiles')
    .select(
      'company_id, company_slug, last_reputation_sync_at, last_reputation_sync_summary, service_area_mode, service_area_states, service_area_counties, service_area_radius_miles, primary_interstate_lanes, coverage_notes, updated_at'
    )
    .eq('company_id', companyId)
    .maybeSingle();

  if (!data) return null;

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

export async function ensurePortalProfile(
  companyId: string,
  companySlug: string
): Promise<PortalProfile> {
  const existing = await getPortalProfile(companyId);
  if (existing) return existing;

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

  if (error || !data) {
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
