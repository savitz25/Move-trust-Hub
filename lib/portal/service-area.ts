import 'server-only';

import { ensurePortalProfile } from '@/lib/portal/ownership';
import { portalAdmin } from '@/lib/portal/db';
import type { ServiceAreaInput, ServiceAreaMode } from '@/lib/portal/types';
import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { US_STATES } from '@/lib/portal/us-states';

function normalizeStates(states: string[]): string[] {
  return [...new Set(states.map((s) => s.trim().toUpperCase()).filter((s) => US_STATES.has(s)))];
}

function coverageLabelFromMode(mode: ServiceAreaMode, states: string[]): string {
  if (mode === 'national') return 'All 50 States';
  if (mode === 'local') return 'Local';
  if (states.length === 0) return 'Continental US';
  if (states.length >= 40) return 'All 50 States';
  if (states.length >= 15) return 'Continental US';
  // Best-effort region label for directory filter compatibility
  const east = ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'DE', 'MD', 'VA', 'WV', 'NC', 'SC', 'GA', 'FL', 'DC'];
  const west = ['CA', 'OR', 'WA', 'NV', 'AZ', 'UT', 'ID', 'MT', 'WY', 'CO', 'NM', 'HI', 'AK'];
  const south = ['TX', 'OK', 'AR', 'LA', 'MS', 'AL', 'TN', 'KY', 'FL', 'GA', 'SC', 'NC', 'VA'];
  const midwest = ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'];
  const set = new Set(states);
  const score = (list: string[]) => list.filter((s) => set.has(s)).length;
  const scores = [
    { label: 'East Coast', n: score(east) },
    { label: 'West Coast', n: score(west) },
    { label: 'South', n: score(south) },
    { label: 'Midwest', n: score(midwest) },
  ].sort((a, b) => b.n - a.n);
  return scores[0].n > 0 ? scores[0].label : 'Continental US';
}

/**
 * "Verified coverage" heuristic: states with review activity or listed HQ/authority.
 * Owners can claim broader areas; UI shows which are verified vs claimed.
 */
export async function getVerifiedCoverageSignals(params: {
  companyId: string;
  headquarters?: string | null;
  usdotNumber?: string | null;
}): Promise<{ verifiedStates: string[]; notes: string[] }> {
  const notes: string[] = [];
  const verified = new Set<string>();

  const hq = params.headquarters ?? '';
  const hqState = hq.split(',').map((p) => p.trim())[1]?.slice(0, 2).toUpperCase();
  if (hqState && US_STATES.has(hqState)) {
    verified.add(hqState);
    notes.push(`Headquarters state (${hqState}) counted as verified coverage.`);
  }

  // FMCSA authority is interstate by nature when active — signal national capability, not spam
  if (params.usdotNumber) {
    notes.push('Active USDOT authority supports interstate lane claims (not local spam expansion).');
  }

  return { verifiedStates: Array.from(verified), notes };
}

export async function updateServiceArea(params: {
  companyId: string;
  companySlug: string;
  userId: string;
  input: ServiceAreaInput;
}): Promise<{ success: boolean; error?: string }> {
  await ensurePortalProfile(params.companyId, params.companySlug);

  const mode = params.input.mode;
  let states = normalizeStates(params.input.states);
  let counties = [...new Set(params.input.counties.map((c) => c.trim()).filter(Boolean))].slice(
    0,
    200
  );
  let radius = params.input.radiusMiles;

  if (mode === 'national') {
    states = [];
    counties = [];
    radius = null;
  } else if (mode === 'regional') {
    if (states.length === 0) {
      return { success: false, error: 'Select at least one state for regional coverage.' };
    }
    if (states.length > 25) {
      return {
        success: false,
        error: 'For 25+ states, switch to National coverage instead of listing every state.',
      };
    }
    radius = null;
  } else {
    // local
    if (!radius || radius < 10 || radius > 500) {
      return { success: false, error: 'Local coverage requires a radius between 10 and 500 miles from HQ.' };
    }
    if (states.length === 0 && counties.length === 0) {
      return {
        success: false,
        error: 'Select your home state (and optional counties) for local coverage.',
      };
    }
  }

  const lanes = (params.input.primaryInterstateLanes ?? [])
    .map((l) => ({
      from: String(l.from ?? '').trim().slice(0, 80),
      to: String(l.to ?? '').trim().slice(0, 80),
    }))
    .filter((l) => l.from && l.to)
    .slice(0, 20);

  if (lanes.length > 20) {
    return { success: false, error: 'Maximum 20 primary interstate lanes.' };
  }

  const admin = portalAdmin();
  const { error } = await admin
    .from('company_portal_profiles')
    .update({
      service_area_mode: mode,
      service_area_states: states,
      service_area_counties: counties,
      service_area_radius_miles: radius,
      primary_interstate_lanes: lanes,
      coverage_notes: params.input.coverageNotes?.trim().slice(0, 500) || null,
      updated_by: params.userId,
    })
    .eq('company_id', params.companyId);

  if (error) return { success: false, error: error.message };

  // Keep directory `coverage` in sync with a coarse Region-compatible label
  const coverage = coverageLabelFromMode(mode, states);
  await admin
    .from('companies')
    .update({
      coverage,
      last_updated: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.companyId);

  revalidatePublishedCompany(params.companySlug);
  return { success: true };
}
