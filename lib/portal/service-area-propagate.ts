import 'server-only';

import { revalidatePath, revalidateTag } from 'next/cache';
import { getAutoDestinationHubLinkForCounty } from '@/lib/destinations/hub-county-linking';
import { getMarketBySlug } from '@/lib/destinations/markets';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { getCountyPath } from '@/lib/local-movers/paths';
import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';
import { localStates } from '@/lib/local-movers/states';
import {
  parseCountyStorageKey,
  stateCodeToSlug,
} from '@/lib/portal/county-catalog';
import type { ServiceAreaMode } from '@/lib/portal/types';
import { logger } from '@/lib/logging/logger';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import type { Database } from '@/types/supabase';

type AssignmentInsert =
  Database['public']['Tables']['company_destination_assignments']['Insert'];

const PORTAL_SOURCE = 'portal_service_area';
const UPSERT_BATCH = 80;
const MAX_REVALIDATE_PATHS = 120;

export type CoverageCounty = {
  stateSlug: string;
  countySlug: string;
  countyName?: string;
};

export type PropagationResult = {
  assignedCounties: CoverageCounty[];
  locationLabels: string[];
  destinationHrefs: string[];
};

function destinationSlugFromHref(href: string): string | null {
  const cleaned = href.replace(/^\/moving-to\//, '').replace(/\/$/, '');
  if (!cleaned) return null;
  const parts = cleaned.split('/');
  return parts[parts.length - 1] ?? null;
}

/**
 * Expand mode + states + county keys into concrete county rows for assignment.
 * National mode returns empty (coverage label only — no 3k-row spam).
 */
export function expandServiceAreaToCounties(params: {
  mode: ServiceAreaMode;
  states: string[];
  counties: string[];
}): CoverageCounty[] {
  if (params.mode === 'national') return [];

  const map = new Map<string, CoverageCounty>();

  const add = (stateSlug: string, countySlug: string, countyName?: string) => {
    map.set(`${stateSlug}/${countySlug}`, { stateSlug, countySlug, countyName });
  };

  // Explicit county selections
  for (const key of params.counties) {
    const parsed = parseCountyStorageKey(key);
    if (!parsed) continue;
    const counties = getCountiesForState(parsed.stateSlug);
    const match = counties.find((c) => c.slug === parsed.countySlug);
    if (match) add(parsed.stateSlug, parsed.countySlug, match.name);
  }

  // Whole-state expansion when a state is selected with zero explicit counties
  const countiesByState = new Map<string, number>();
  for (const c of map.values()) {
    countiesByState.set(c.stateSlug, (countiesByState.get(c.stateSlug) ?? 0) + 1);
  }

  for (const code of params.states) {
    const stateSlug = stateCodeToSlug(code);
    if (!stateSlug) continue;
    if ((countiesByState.get(stateSlug) ?? 0) > 0) continue;
    for (const county of getCountiesForState(stateSlug)) {
      add(stateSlug, county.slug, county.name);
    }
  }

  return [...map.values()];
}

function labelForCounty(c: CoverageCounty): string {
  const state = localStates.find((s) => s.slug === c.stateSlug);
  const name = c.countyName ?? c.countySlug;
  return state ? `${name}, ${state.code}` : `${c.stateSlug}/${c.countySlug}`;
}

/**
 * Sync portal coverage into company_destination_assignments and revalidate
 * affected local-movers + moving-to routes.
 */
export async function propagateServiceAreaAssignments(params: {
  companyId: string;
  companySlug: string;
  headquarters?: string | null;
  mode: ServiceAreaMode;
  states: string[];
  counties: string[];
}): Promise<PropagationResult> {
  const assigned = expandServiceAreaToCounties({
    mode: params.mode,
    states: params.states,
    counties: params.counties,
  });

  const locationLabels = assigned.map(labelForCounty).slice(0, 40);
  const destinationHrefs = new Set<string>();

  if (!isSupabaseAdminConfigured()) {
    return {
      assignedCounties: assigned,
      locationLabels,
      destinationHrefs: [],
    };
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();
  const selectedKeys = new Set(assigned.map((c) => `${c.stateSlug}/${c.countySlug}`));

  // Remove prior portal-owned rows no longer selected (preserve HQ/onboarding/admin)
  const { data: existingPortal } = await admin
    .from('company_destination_assignments')
    .select('id, state_slug, county_slug')
    .eq('company_id', params.companyId)
    .eq('source', PORTAL_SOURCE);

  const toDelete = (existingPortal ?? []).filter(
    (row) => !selectedKeys.has(`${row.state_slug}/${row.county_slug}`)
  );

  if (toDelete.length > 0) {
    const ids = toDelete.map((r) => r.id);
    for (let i = 0; i < ids.length; i += UPSERT_BATCH) {
      const chunk = ids.slice(i, i + UPSERT_BATCH);
      await admin.from('company_destination_assignments').delete().in('id', chunk);
    }
  }

  // Upsert current selection
  const rows: AssignmentInsert[] = assigned.map((c) => {
    const hub = getAutoDestinationHubLinkForCounty(c.stateSlug, c.countySlug, c.countyName);
    if (hub?.href) destinationHrefs.add(hub.href);
    return {
      company_id: params.companyId,
      company_slug: params.companySlug,
      state_slug: c.stateSlug,
      county_slug: c.countySlug,
      destination_slug: hub ? destinationSlugFromHref(hub.href) : null,
      headquarters: params.headquarters ?? null,
      source: PORTAL_SOURCE,
      updated_at: now,
    };
  });

  for (let i = 0; i < rows.length; i += UPSERT_BATCH) {
    const chunk = rows.slice(i, i + UPSERT_BATCH);
    const { error } = await admin
      .from('company_destination_assignments')
      .upsert(chunk as AssignmentInsert[], {
        onConflict: 'company_id,state_slug,county_slug',
      });
    if (error) {
      logger.error('portal.service_area_assign_failed', {
        companySlug: params.companySlug,
        message: error.message,
        batchStart: i,
      });
    }
  }

  revalidateCoveragePaths(assigned, [...destinationHrefs]);

  try {
    revalidateTag(APPROVED_COUNTY_MOVERS_TAG);
  } catch {
    // outside Next runtime
  }

  logger.info('portal.service_area_propagated', {
    companySlug: params.companySlug,
    mode: params.mode,
    countyCount: assigned.length,
    destinations: [...destinationHrefs].slice(0, 20),
  });

  return {
    assignedCounties: assigned,
    locationLabels,
    destinationHrefs: [...destinationHrefs],
  };
}

function revalidateCoveragePaths(
  counties: CoverageCounty[],
  destinationHrefs: string[]
): void {
  const stateSlugs = new Set(counties.map((c) => c.stateSlug));
  let pathCount = 0;

  const reval = (path: string, type: 'page' | 'layout' = 'page') => {
    if (pathCount >= MAX_REVALIDATE_PATHS) return;
    pathCount += 1;
    try {
      revalidatePath(path, type);
    } catch {
      // ignore outside Next
    }
  };

  for (const stateSlug of stateSlugs) {
    reval(`/local-movers/${stateSlug}`, 'page');
    reval(`/local-movers/${stateSlug}`, 'layout');
    reval(`/moving-to/${stateSlug}`, 'page');
  }

  for (const c of counties) {
    if (pathCount >= MAX_REVALIDATE_PATHS) break;
    const path = getCountyPath(c.stateSlug, c.countySlug);
    reval(path, 'page');
    reval(path, 'layout');
  }

  reval('/moving-to', 'page');

  for (const href of destinationHrefs) {
    if (pathCount >= MAX_REVALIDATE_PATHS) break;
    reval(href, 'page');
    reval(href, 'layout');
    // Also revalidate cluster parent when nested
    const parts = href.replace(/^\/moving-to\//, '').split('/');
    if (parts.length === 2) {
      reval(`/moving-to/${parts[0]}`, 'page');
    }
    const market = getMarketBySlug(parts[parts.length - 1] ?? '');
    if (market?.clusterParent) {
      reval(`/moving-to/${market.clusterParent}`, 'page');
    }
  }
}
