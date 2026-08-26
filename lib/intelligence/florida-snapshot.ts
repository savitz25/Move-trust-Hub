/**
 * Florida Move State Intelligence payload — cached aggregation for /florida.
 * Living numbers come from the DB. Page copy must not hardcode production counts.
 */
import 'server-only';
import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { MOVE_FL_METRIC_DICTIONARY } from './metric-dictionary';
import { FLORIDA_MOVE_EDUCATION } from './education';
import { FLORIDA_MOVE_SOURCE_CATALOG } from './source-catalog';
import {
  countyResearchCoverage,
  FLORIDA_RESEARCH_COUNTIES,
} from './coverage';
import { isPublicReady } from './readiness';
import type {
  FloridaMoveIntelligencePayload,
  IntelligenceMetricValue,
} from './payload-types';
import type { MetricDefinition } from './types';

export type { FloridaMoveIntelligencePayload, IntelligenceMetricValue } from './payload-types';

export const MTH_FL_STATE_INTEL_VERSION = 'mth-fl-state-intel-v1';
const REVALIDATE_SEC = 1_800;
const TIMEOUT_MS = 6_000;

/** Tables added after generated Database types. */
type CountClient = {
  from: (table: string) => {
    select: (cols: string, opts?: { count?: 'exact'; head?: boolean }) => any;
  };
};

function iso(d: string | null | undefined): string | null {
  if (!d) return null;
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
}

async function exactCount(
  run: () => PromiseLike<{ count: number | null; error: { message: string } | null }>
): Promise<number | null> {
  const { count, error } = await run();
  if (error) return null;
  return typeof count === 'number' ? count : null;
}

function metric(
  def: MetricDefinition,
  value: number | null,
  asOf: string | null,
  extra?: Partial<IntelligenceMetricValue>
): IntelligenceMetricValue {
  return {
    id: def.id,
    label: def.label,
    value,
    entityCounted: def.entityCounted,
    definition: def.definition,
    querySource: def.source,
    readiness: def.defaultReadiness,
    geographicScope: def.id.startsWith('fl_hq') ? 'florida_hq' : 'florida_statewide',
    asOf,
    disclosure: def.limitation,
    publicEligibility: def.publicEligibility,
    ...extra,
  };
}

async function loadLive(): Promise<FloridaMoveIntelligencePayload> {
  const generatedAt = new Date().toISOString();
  const empty = (timedOut: boolean): FloridaMoveIntelligencePayload => ({
    state: 'florida',
    version: MTH_FL_STATE_INTEL_VERSION,
    generatedAt,
    asOf: null,
    timedOut,
    metrics: [],
    evidenceSources: FLORIDA_MOVE_SOURCE_CATALOG,
    coverage: coverageItems(),
    education: FLORIDA_MOVE_EDUCATION,
    researchCounties: researchCounties(),
  });

  if (!isSupabaseAdminConfigured()) {
    return empty(true);
  }

  const db = createAdminClient() as unknown as CountClient;
  const dict = MOVE_FL_METRIC_DICTIONARY;

  const [
    imActive,
    mbActive,
    imVerified,
    hqPublishable,
    contactRows,
    psaAsOf,
    contactAsOf,
  ] = await Promise.all([
    exactCount(() =>
      db
        .from('provider_state_authority')
        .select('id', { count: 'exact', head: true })
        .eq('state_code', 'FL')
        .eq('authority_type', 'intrastate_mover_registration')
        .eq('status', 'active')
    ),
    exactCount(() =>
      db
        .from('provider_state_authority')
        .select('id', { count: 'exact', head: true })
        .eq('state_code', 'FL')
        .eq('authority_type', 'intrastate_hhg_broker')
        .eq('status', 'active')
    ),
    exactCount(() =>
      db
        .from('provider_state_authority')
        .select('id', { count: 'exact', head: true })
        .eq('state_code', 'FL')
        .eq('authority_type', 'intrastate_mover_registration')
        .eq('verification_state', 'VERIFIED')
    ),
    exactCount(() =>
      db
        .from('companies')
        .select('id', { count: 'exact', head: true })
        .eq('publication_state', 'PUBLISHABLE')
        .ilike('headquarters', '% FL%')
    ),
    exactCount(() =>
      db.from('provider_contact_observation').select('id', { count: 'exact', head: true })
    ),
    db
      .from('provider_state_authority')
      .select('retrieved_at')
      .eq('state_code', 'FL')
      .order('retrieved_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    db
      .from('provider_contact_observation')
      .select('retrieved_at')
      .order('retrieved_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const asOf =
    iso((psaAsOf.data as { retrieved_at?: string } | null)?.retrieved_at) ??
    iso((contactAsOf.data as { retrieved_at?: string } | null)?.retrieved_at);

  const metrics: IntelligenceMetricValue[] = [
    metric(dict.fl_fdacs_im_active_registrations, imActive, asOf, {
      href: '/local-movers/florida',
    }),
    metric(dict.fl_fdacs_mb_active_registrations, mbActive, asOf),
    metric(dict.fl_fdacs_im_verified_links, imVerified, asOf),
    metric(dict.fl_hq_publishable_profiles, hqPublishable, asOf, {
      href: '/companies?state=FL',
    }),
    metric(dict.fl_contact_observations, contactRows, iso((contactAsOf.data as { retrieved_at?: string } | null)?.retrieved_at)),
  ].filter((m) => isPublicReady(m.readiness, m.publicEligibility));

  const sources = FLORIDA_MOVE_SOURCE_CATALOG.map((s) => {
    if (s.id === 'fdacs_im') {
      return { ...s, observationCount: imActive, lastExtractedAt: asOf };
    }
    if (s.id === 'fdacs_mb') {
      return { ...s, observationCount: mbActive, lastExtractedAt: asOf };
    }
    if (s.id === 'fmcsa') {
      return { ...s, observationCount: hqPublishable };
    }
    return s;
  });

  return {
    state: 'florida',
    version: MTH_FL_STATE_INTEL_VERSION,
    generatedAt,
    asOf,
    timedOut: false,
    metrics,
    evidenceSources: sources,
    coverage: coverageItems(),
    education: FLORIDA_MOVE_EDUCATION,
    researchCounties: researchCounties(),
  };
}

function coverageItems() {
  return [
    {
      id: 'fdacs_im',
      label: 'FDACS intrastate mover registrations',
      status: 'included' as const,
      note: 'Active IM rows in the research graph. Not a published profile census.',
    },
    {
      id: 'fdacs_mb',
      label: 'FDACS moving-broker registrations',
      status: 'included' as const,
      note: 'Active MB rows. Public broker presentation is not claimed.',
    },
    {
      id: 'fmcsa_directory',
      label: 'FMCSA-linked directory companies with Florida HQ',
      status: 'included' as const,
      note: 'Headquarters field as stored. Not operating geography.',
    },
    {
      id: 'contacts',
      label: 'FDACS contact observations',
      status: 'included' as const,
      note: 'Phones, emails, and addresses stored separately with provenance.',
    },
    {
      id: 'complaints',
      label: 'FDACS complaints / enforcement',
      status: 'expanding' as const,
      note: 'Not loaded. Complaint ≠ finding.',
    },
    {
      id: 'inspections',
      label: 'Inspection / out-of-service census',
      status: 'expanding' as const,
      note: 'Not published. Inspection volume is not quality.',
    },
    {
      id: 'county',
      label: 'County-level local credentials',
      status: 'expanding' as const,
      note: 'Palm Beach and Miami-Dade have internal research rows. No county is Enhanced.',
    },
  ];
}

function researchCounties() {
  return FLORIDA_RESEARCH_COUNTIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    href: c.href,
    coverageLevel: countyResearchCoverage(c.slug),
    evidenceNote:
      c.slug === 'broward' || c.slug === 'pinellas'
        ? 'No validated county credential census in production. Statewide Research only.'
        : 'County credentials exist as research rows. Not Enhanced Local Research.',
  }));
}

async function loadWithTimeout(): Promise<FloridaMoveIntelligencePayload> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timed = new Promise<FloridaMoveIntelligencePayload>((resolve) => {
      timer = setTimeout(() => {
        resolve({
          state: 'florida',
          version: MTH_FL_STATE_INTEL_VERSION,
          generatedAt: new Date().toISOString(),
          asOf: null,
          timedOut: true,
          metrics: [],
          evidenceSources: FLORIDA_MOVE_SOURCE_CATALOG,
          coverage: coverageItems(),
          education: FLORIDA_MOVE_EDUCATION,
          researchCounties: researchCounties(),
        });
      }, TIMEOUT_MS);
    });
    return await Promise.race([loadLive(), timed]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function getFloridaMoveIntelligenceSnapshot(): Promise<FloridaMoveIntelligencePayload> {
  return unstable_cache(loadWithTimeout, ['mth-fl-state-intel-v1'], {
    revalidate: REVALIDATE_SEC,
    tags: ['florida-move-intelligence'],
  })();
}

export function metricById(
  payload: FloridaMoveIntelligencePayload,
  id: string
): IntelligenceMetricValue | undefined {
  return payload.metrics.find((m) => m.id === id);
}

export function publicMetrics(payload: FloridaMoveIntelligencePayload): IntelligenceMetricValue[] {
  return payload.metrics.filter((m) => isPublicReady(m.readiness, m.publicEligibility) && m.value !== null);
}
