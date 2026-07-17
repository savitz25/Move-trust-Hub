import 'server-only';

import { resolveCompanyDestinationsWithDebug } from '@/lib/destinations/resolve-company-destinations';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import {
  countyStorageKey,
  parseCountyStorageKey,
  stateSlugToCode,
} from '@/lib/portal/county-catalog';
import { portalAdmin } from '@/lib/portal/db';
import type { InterstateLane, PortalProfile, ServiceAreaMode } from '@/lib/portal/types';
import { US_STATES } from '@/lib/portal/us-states';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';

export type ServiceAreaPrefill = {
  mode: ServiceAreaMode;
  states: string[];
  counties: string[];
  radiusMiles: number | null;
  lanes: InterstateLane[];
  coverageNotes: string | null;
  prefillSources: string[];
  headquartersState: string | null;
};

function normalizeStoredCounties(raw: string[]): string[] {
  const out = new Set<string>();
  for (const entry of raw) {
    const parsed = parseCountyStorageKey(entry);
    if (parsed) {
      out.add(countyStorageKey(parsed.stateSlug, parsed.countySlug));
      continue;
    }
    // Legacy free-text county names cannot be mapped reliably — skip.
  }
  return [...out];
}

function collapseWholeStates(countyKeys: string[]): {
  wholeStateCodes: string[];
  partialCounties: string[];
} {
  const byState = new Map<string, Set<string>>();
  for (const key of countyKeys) {
    const parsed = parseCountyStorageKey(key);
    if (!parsed) continue;
    if (!byState.has(parsed.stateSlug)) byState.set(parsed.stateSlug, new Set());
    byState.get(parsed.stateSlug)!.add(parsed.countySlug);
  }

  const wholeStateCodes: string[] = [];
  const partialCounties: string[] = [];

  for (const [stateSlug, selected] of byState) {
    const all = getCountiesForState(stateSlug);
    const code = stateSlugToCode(stateSlug);
    if (!code) continue;

    if (all.length > 0 && selected.size >= all.length) {
      wholeStateCodes.push(code);
    } else {
      for (const countySlug of selected) {
        partialCounties.push(countyStorageKey(stateSlug, countySlug));
      }
      // Keep state in the selected list so the UI shows it expanded as partial
      wholeStateCodes.push(code);
    }
  }

  return {
    wholeStateCodes: [...new Set(wholeStateCodes)],
    partialCounties: [...new Set(partialCounties)],
  };
}

async function loadAssignmentCounties(companyId: string): Promise<string[]> {
  if (!isSupabaseAdminConfigured()) return [];
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('company_destination_assignments')
    .select('state_slug, county_slug')
    .eq('company_id', companyId);

  if (error || !data?.length) return [];
  return data.map((row) =>
    countyStorageKey(String(row.state_slug), String(row.county_slug))
  );
}

function hqStateFromHeadquarters(headquarters?: string | null): string | null {
  if (!headquarters) return null;
  const parts = headquarters.split(',').map((p) => p.trim());
  // Common: "City, ST" or "City, ST 12345"
  for (let i = parts.length - 1; i >= 0; i--) {
    const token = parts[i].replace(/\d+/g, '').trim().toUpperCase();
    const code = token.slice(0, 2);
    if (code.length === 2 && US_STATES.has(code)) return code;
  }
  return null;
}

/**
 * Merge portal profile, existing destination assignments, and HQ/FMCSA resolution
 * into a form-ready service area draft.
 */
export async function buildServiceAreaPrefill(params: {
  companyId: string;
  profile: PortalProfile;
  headquarters?: string | null;
  fmcsaRaw?: Record<string, unknown> | null;
  legalName?: string | null;
}): Promise<ServiceAreaPrefill> {
  const sources: string[] = [];
  const profileHasData =
    params.profile.service_area_states.length > 0 ||
    params.profile.service_area_counties.length > 0 ||
    params.profile.service_area_mode === 'national' ||
    (params.profile.primary_interstate_lanes?.length ?? 0) > 0;

  if (profileHasData) {
    sources.push('Saved portal profile');
    return {
      mode: params.profile.service_area_mode,
      states: params.profile.service_area_states,
      counties: normalizeStoredCounties(params.profile.service_area_counties),
      radiusMiles: params.profile.service_area_radius_miles,
      lanes: params.profile.primary_interstate_lanes ?? [],
      coverageNotes: params.profile.coverage_notes,
      prefillSources: sources,
      headquartersState: hqStateFromHeadquarters(params.headquarters),
    };
  }

  const assignmentKeys = await loadAssignmentCounties(params.companyId);
  if (assignmentKeys.length > 0) {
    sources.push('Existing county / destination assignments');
    const collapsed = collapseWholeStates(assignmentKeys);
    const mode: ServiceAreaMode =
      collapsed.wholeStateCodes.length >= 2 || assignmentKeys.length > 8
        ? 'regional'
        : 'local';

    return {
      mode,
      states: collapsed.wholeStateCodes,
      counties: collapsed.partialCounties,
      radiusMiles: mode === 'local' ? 50 : null,
      lanes: [],
      coverageNotes: null,
      prefillSources: sources,
      headquartersState: hqStateFromHeadquarters(params.headquarters),
    };
  }

  const resolved = resolveCompanyDestinationsWithDebug({
    headquarters: params.headquarters,
    fmcsaRaw: params.fmcsaRaw,
    legalName: params.legalName,
  });

  if (resolved.assignments.length > 0) {
    sources.push(
      resolved.source === 'fmcsa'
        ? 'FMCSA physical address'
        : 'Headquarters / onboarding address'
    );
    const keys = resolved.assignments.map((a) =>
      countyStorageKey(a.stateSlug, a.countySlug)
    );
    const collapsed = collapseWholeStates(keys);
    const hqState = hqStateFromHeadquarters(params.headquarters);

    return {
      mode: 'local',
      states: collapsed.wholeStateCodes.length
        ? collapsed.wholeStateCodes
        : hqState
          ? [hqState]
          : [],
      counties: keys,
      radiusMiles: 50,
      lanes: [],
      coverageNotes: null,
      prefillSources: sources,
      headquartersState: hqState,
    };
  }

  const hqState = hqStateFromHeadquarters(params.headquarters);
  if (hqState) {
    sources.push(`Headquarters state (${hqState})`);
    return {
      mode: 'local',
      states: [hqState],
      counties: [],
      radiusMiles: 50,
      lanes: [],
      coverageNotes: null,
      prefillSources: sources,
      headquartersState: hqState,
    };
  }

  return {
    mode: params.profile.service_area_mode || 'regional',
    states: [],
    counties: [],
    radiusMiles: params.profile.service_area_radius_miles,
    lanes: [],
    coverageNotes: null,
    prefillSources: sources.length ? sources : ['No prior coverage data — start fresh'],
    headquartersState: null,
  };
}

/** Optional: load fmcsa_raw for prefill when company object lacks it. */
export async function loadCompanyFmcsaRaw(
  companyId: string
): Promise<Record<string, unknown> | null> {
  try {
    const admin = portalAdmin();
    const { data } = await admin
      .from('companies')
      .select('fmcsa_raw')
      .eq('id', companyId)
      .maybeSingle();
    if (data?.fmcsa_raw && typeof data.fmcsa_raw === 'object') {
      return data.fmcsa_raw as Record<string, unknown>;
    }
  } catch {
    // admin may throw if not configured
  }
  return null;
}
