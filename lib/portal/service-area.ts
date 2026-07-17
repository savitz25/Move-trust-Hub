import 'server-only';

import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import { ensurePortalProfile } from '@/lib/portal/ownership';
import { portalAdmin } from '@/lib/portal/db';
import { isMissingRelationError } from '@/lib/portal/schema';
import { propagateServiceAreaAssignments } from '@/lib/portal/service-area-propagate';
import {
  parseCountyStorageKey,
  countyStorageKey,
  stateCodeToSlug,
} from '@/lib/portal/county-catalog';
import type { ServiceAreaInput, ServiceAreaMode } from '@/lib/portal/types';
import { US_STATES } from '@/lib/portal/us-states';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { localStates } from '@/lib/local-movers/states';

function normalizeStates(states: string[]): string[] {
  return [...new Set(states.map((s) => s.trim().toUpperCase()).filter((s) => US_STATES.has(s)))];
}

function normalizeCountyKeys(counties: string[]): string[] {
  const out = new Set<string>();
  for (const raw of counties) {
    const parsed = parseCountyStorageKey(raw);
    if (parsed) {
      out.add(countyStorageKey(parsed.stateSlug, parsed.countySlug));
      continue;
    }
    // Allow "CODE/county-slug" from the editor
    const slash = raw.indexOf('/');
    if (slash > 0) {
      const left = raw.slice(0, slash).trim();
      const right = raw.slice(slash + 1).trim().toLowerCase();
      if (US_STATES.has(left.toUpperCase())) {
        const slug = stateCodeToSlug(left.toUpperCase());
        if (slug && right) out.add(countyStorageKey(slug, right));
      } else if (left && right) {
        out.add(countyStorageKey(left.toLowerCase(), right));
      }
    }
  }
  return [...out].slice(0, 500);
}

function coverageLabelFromMode(mode: ServiceAreaMode, states: string[]): string {
  if (mode === 'national') return 'All 50 States';
  if (mode === 'local') return 'Local';
  if (states.length === 0) return 'Continental US';
  if (states.length >= 40) return 'All 50 States';
  if (states.length >= 15) return 'Continental US';
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
 * "Verified coverage" heuristic: HQ state, destination assignments, USDOT signal.
 */
export async function getVerifiedCoverageSignals(params: {
  companyId: string;
  headquarters?: string | null;
  usdotNumber?: string | null;
}): Promise<{ verifiedStates: string[]; notes: string[] }> {
  const notes: string[] = [];
  const verified = new Set<string>();

  const hq = params.headquarters ?? '';
  const parts = hq.split(',').map((p) => p.trim());
  for (let i = parts.length - 1; i >= 0; i--) {
    const token = parts[i].replace(/\d+/g, '').trim().toUpperCase();
    const hqState = token.slice(0, 2);
    if (hqState && US_STATES.has(hqState)) {
      verified.add(hqState);
      notes.push(`Headquarters state (${hqState}) counted as verified coverage.`);
      break;
    }
  }

  if (isSupabaseAdminConfigured()) {
    try {
      const admin = createAdminClient();
      const { data } = await admin
        .from('company_destination_assignments')
        .select('state_slug')
        .eq('company_id', params.companyId);
      if (data?.length) {
        for (const row of data) {
          const code = localStates.find((s) => s.slug === row.state_slug)?.code;
          if (code) verified.add(code);
        }
        notes.push(
          `${data.length} county assignment(s) from onboarding / prior coverage linked to verified listings.`
        );
      }
    } catch {
      // ignore
    }
  }

  if (params.usdotNumber) {
    notes.push('Active USDOT authority supports interstate lane claims (not local spam expansion).');
  }

  return { verifiedStates: Array.from(verified), notes };
}

export type UpdateServiceAreaResult = {
  success: boolean;
  error?: string;
  locations?: string[];
  destinationHrefs?: string[];
  assignedCountyCount?: number;
};

export async function updateServiceArea(params: {
  companyId: string;
  companySlug: string;
  userId: string;
  input: ServiceAreaInput;
  headquarters?: string | null;
}): Promise<UpdateServiceAreaResult> {
  await ensurePortalProfile(params.companyId, params.companySlug);

  const mode = params.input.mode;
  let states = normalizeStates(params.input.states);
  let counties = normalizeCountyKeys(params.input.counties);
  let radius = params.input.radiusMiles;

  // Ensure states include any state implied by county keys
  for (const key of counties) {
    const parsed = parseCountyStorageKey(key);
    if (!parsed) continue;
    const code = localStates.find((s) => s.slug === parsed.stateSlug)?.code;
    if (code && !states.includes(code)) states.push(code);
  }

  if (mode === 'national') {
    states = [];
    counties = [];
    radius = null;
  } else if (mode === 'regional') {
    if (states.length === 0 && counties.length === 0) {
      return { success: false, error: 'Select at least one state or county for regional coverage.' };
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
    if (radius != null && (radius < 10 || radius > 500)) {
      return { success: false, error: 'Local coverage radius must be between 10 and 500 miles.' };
    }
    if (!radius) radius = 50;
    if (states.length === 0 && counties.length === 0) {
      return {
        success: false,
        error: 'Select your home state and/or counties for local coverage.',
      };
    }
  }

  const lanes = (params.input.primaryInterstateLanes ?? [])
    .map((l) => ({
      from: String(l.from ?? '').trim().toUpperCase().slice(0, 80),
      to: String(l.to ?? '').trim().toUpperCase().slice(0, 80),
    }))
    .filter((l) => l.from && l.to)
    .slice(0, 20);

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

  if (error && !isMissingRelationError(error)) {
    return { success: false, error: error.message };
  }

  const coverage = coverageLabelFromMode(mode, states);
  await admin
    .from('companies')
    .update({
      coverage,
      last_updated: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.companyId);

  const propagation = await propagateServiceAreaAssignments({
    companyId: params.companyId,
    companySlug: params.companySlug,
    headquarters: params.headquarters,
    mode,
    states,
    counties,
  });

  revalidatePublishedCompany(params.companySlug);

  const locations =
    mode === 'national'
      ? ['National coverage (all 50 states)']
      : propagation.locationLabels.length > 0
        ? propagation.locationLabels
        : states.map((s) => localStates.find((x) => x.code === s)?.name ?? s);

  return {
    success: true,
    locations,
    destinationHrefs: propagation.destinationHrefs,
    assignedCountyCount: propagation.assignedCounties.length,
  };
}
