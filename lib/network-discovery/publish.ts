/**
 * Read-only Move discovery publisher (ASK-SEARCH-006A.1).
 * Primary source: active-directory-movers + structured county coverage.
 * No DB writes, no enrichment APIs.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { selectPilotCohort } from './cohort';
import { evaluatePilotEligibility } from './eligibility';
import { contentFingerprint } from './fingerprint';
import { loadMoveDiscoveryCatalog } from './load-catalog';
import { mapCompanyToDiscovery } from './map-company';
import type {
  EligibilityFailureReason,
  NetworkDiscoveryEntity,
  PilotExportManifest,
} from './types';
import { validateDiscoveryExport } from './validate';

export const PILOT_ARTIFACT = 'move-discovery-pilot.v1.1.json';
export const BASELINE_ARTIFACT = 'move-discovery-pilot.v1.json';

export type PublishResult = {
  manifest: PilotExportManifest;
  validationOk: boolean;
  validationIssues: { path: string; message: string }[];
  timings_ms: Record<string, number>;
  catalog_stats: Record<string, number>;
};

function auditQueryReadiness(entities: NetworkDiscoveryEntity[]) {
  const hasCounty = (state: string, countyNeedle: string) =>
    entities.filter((e) =>
      (e.service_areas || []).some(
        (a) =>
          a.kind === 'county' &&
          a.state === state &&
          a.county.toLowerCase().includes(countyNeedle.toLowerCase())
      )
    ).length;

  const hasState = (state: string) =>
    entities.filter(
      (e) =>
        e.state === state ||
        (e.service_areas || []).some(
          (a) => (a.kind === 'state' || a.kind === 'county' || a.kind === 'city') && a.state === state
        )
    ).length;

  const hasCity = (city: string, state?: string) =>
    entities.filter((e) => {
      const cityHit =
        e.city?.toLowerCase().includes(city.toLowerCase()) ||
        (e.service_areas || []).some(
          (a) => a.kind === 'city' && a.city.toLowerCase().includes(city.toLowerCase())
        ) ||
        (e.search_terms || []).some((t) => t.includes(city.toLowerCase()));
      if (!cityHit) return false;
      if (!state) return true;
      return (
        e.state === state ||
        (e.service_areas || []).some((a) => 'state' in a && a.state === state)
      );
    }).length;

  const hasZip = (zip: string) =>
    entities.filter(
      (e) =>
        e.zip === zip ||
        (e.service_areas || []).some((a) => a.kind === 'zip' && a.zip === zip) ||
        (e.search_terms || []).includes(zip)
    ).length;

  const brokers = entities.filter((e) => e.entity_type === 'moving_broker');
  const carrierBrokers = entities.filter((e) => e.categories?.includes('carrier_broker'));
  const auto = entities.filter((e) => e.entity_type === 'auto_transporter');
  const interstate = entities.filter((e) => e.entity_type === 'interstate_mover');
  const intrastate = entities.filter((e) => e.entity_type === 'intrastate_mover');

  return {
    'movers in Keansburg NJ': {
      exact_city_match: hasCity('Keansburg', 'NJ'),
      county_match_monmouth_nj: hasCounty('NJ', 'Monmouth'),
      state_match_nj: hasState('NJ'),
      note:
        'Keansburg city string not in source. Monmouth County service-area match is the grounded signal for later Ask ranking (product rule: county may satisfy city-in-county queries).',
    },
    'licensed movers around 07734': {
      physical_zip_match: hasZip('07734'),
      explicit_service_zip_match: entities.filter((e) =>
        (e.service_areas || []).some((a) => a.kind === 'zip' && a.zip === '07734')
      ).length,
      county_match_monmouth_nj: hasCounty('NJ', 'Monmouth'),
      note:
        'No ZIP-level service coverage in Move structured data. HQ ZIP ≠ service ZIP. 07734 (Keansburg) sits in Monmouth County — county match only.',
    },
    'moving broker in Miami': {
      pure_moving_broker: brokers.length,
      miami_city_match: hasCity('Miami', 'FL'),
      miami_moving_broker: brokers.filter(
        (e) =>
          e.city?.toLowerCase().includes('miami') ||
          (e.search_terms || []).some((t) => t.includes('miami'))
      ).length,
      carrier_broker_total: carrierBrokers.length,
      florida_state_match: hasState('FL'),
      note:
        'moving_broker ≠ mover. Carrier-broker is not counted as pure moving_broker.',
    },
    'movers in Florida': {
      state_match_fl: hasState('FL'),
      physical_hq_fl: entities.filter((e) => e.state === 'FL').length,
    },
    'interstate movers in New Jersey': {
      interstate_total: interstate.length,
      nj_state_match: hasState('NJ'),
      interstate_with_nj_signal: interstate.filter(
        (e) =>
          e.state === 'NJ' ||
          (e.service_areas || []).some(
            (a) => 'state' in a && a.state === 'NJ'
          )
      ).length,
    },
    type_totals: {
      interstate_mover: interstate.length,
      intrastate_mover: intrastate.length,
      moving_broker: brokers.length,
      auto_transporter: auto.length,
      carrier_broker_category: carrierBrokers.length,
    },
  };
}

function compareIdentityContinuity(
  rootDir: string,
  pilot: NetworkDiscoveryEntity[]
): PilotExportManifest['identity_continuity'] {
  const baselinePath = join(rootDir, 'data', 'network-discovery', BASELINE_ARTIFACT);
  if (!existsSync(baselinePath)) {
    return {
      baseline_path: BASELINE_ARTIFACT,
      overlapping: 0,
      id_matches: 0,
      id_mismatches: [],
    };
  }
  const baseline = JSON.parse(readFileSync(baselinePath, 'utf8')) as {
    entities: NetworkDiscoveryEntity[];
  };
  const newBySlug = new Map<string, NetworkDiscoveryEntity>();
  for (const e of pilot) {
    const slug = e.canonical_profile_url.split('/companies/')[1] || '';
    if (slug) newBySlug.set(decodeURIComponent(slug).toLowerCase(), e);
  }

  let overlapping = 0;
  let id_matches = 0;
  const id_mismatches: { slug: string; old_id: string; new_id: string }[] = [];

  for (const old of baseline.entities || []) {
    const slug = (old.canonical_profile_url.split('/companies/')[1] || '').toLowerCase();
    const neu = newBySlug.get(decodeURIComponent(slug));
    if (!neu) continue;
    overlapping++;
    if (neu.network_entity_id === old.network_entity_id) id_matches++;
    else {
      id_mismatches.push({
        slug,
        old_id: old.network_entity_id,
        new_id: neu.network_entity_id,
      });
    }
  }

  return {
    baseline_path: BASELINE_ARTIFACT,
    overlapping,
    id_matches,
    id_mismatches,
  };
}

export function publishMoveDiscoveryPilot(rootDir: string): PublishResult {
  const timings: Record<string, number> = {};
  const t0 = performance.now();

  const tLoad = performance.now();
  const loaded = loadMoveDiscoveryCatalog();
  const { rows, sourceVersion, sourcePath } = loaded;
  timings.load_ms = performance.now() - tLoad;

  const ineligibleReasons: Record<string, number> = {};
  const eligibleRows: typeof rows = [];

  const tElig = performance.now();
  for (const row of rows) {
    const ev = evaluatePilotEligibility(row);
    if (ev.ok) eligibleRows.push(row);
    else {
      ineligibleReasons[ev.reason] = (ineligibleReasons[ev.reason] || 0) + 1;
    }
  }
  timings.eligibility_ms = performance.now() - tElig;

  const tNorm = performance.now();
  const generatedAt = new Date().toISOString();
  const usdotCounts = new Map<string, number>();
  for (const row of eligibleRows) {
    const d = (row.usdot_number || '').replace(/\D/g, '');
    if (d.length >= 5) usdotCounts.set(d, (usdotCounts.get(d) || 0) + 1);
  }
  const eligibleEntities: NetworkDiscoveryEntity[] = eligibleRows.map((row) => {
    const d = (row.usdot_number || '').replace(/\D/g, '');
    const usdotIsUnique = !(d.length >= 5 && (usdotCounts.get(d) || 0) > 1);
    return mapCompanyToDiscovery(row, { sourceVersion, updatedAt: generatedAt, usdotIsUnique });
  });
  timings.normalize_ms = performance.now() - tNorm;

  const tCohort = performance.now();
  const pilot = selectPilotCohort(eligibleEntities);
  timings.cohort_ms = performance.now() - tCohort;

  const tVal = performance.now();
  const validation = validateDiscoveryExport(pilot);
  timings.validate_ms = performance.now() - tVal;

  const entity_type_breakdown: Record<string, number> = {};
  const states: Record<string, number> = {};
  let with_city = 0;
  let with_zip = 0;
  let with_county = 0;
  let with_service_area_county = 0;
  let with_service_area_state = 0;
  for (const e of pilot) {
    entity_type_breakdown[e.entity_type] = (entity_type_breakdown[e.entity_type] || 0) + 1;
    if (e.state) states[e.state] = (states[e.state] || 0) + 1;
    if (e.city) with_city++;
    if (e.zip) with_zip++;
    if (e.county) with_county++;
    if ((e.service_areas || []).some((a) => a.kind === 'county')) with_service_area_county++;
    if ((e.service_areas || []).some((a) => a.kind === 'state')) with_service_area_state++;
  }

  const fingerprint = contentFingerprint(pilot);
  const query_readiness = auditQueryReadiness(pilot);
  // Continuity vs baseline uses full eligible set (not truncated pilot) so
  // lexical cohort truncation cannot create false identity mismatches.
  const identity_continuity = compareIdentityContinuity(rootDir, eligibleEntities);
  timings.total_ms = performance.now() - t0;

  const manifest: PilotExportManifest = {
    schema_version: 'ask-network-discovery-v1',
    hub: 'move',
    generated_at: generatedAt,
    source_version: sourceVersion,
    source_path: sourcePath,
    pilot_label: 'PILOT / NOT YET CONSUMED BY ASK PRODUCTION',
    pilot_artifact: PILOT_ARTIFACT,
    amendment: 'ASK-SEARCH-006A.1',
    entity_count: pilot.length,
    content_fingerprint: fingerprint,
    eligibility: {
      considered: rows.length,
      eligible: eligibleEntities.length,
      ineligible: rows.length - eligibleEntities.length,
      ineligible_reasons: ineligibleReasons as Record<EligibilityFailureReason, number>,
      pilot_selected: pilot.length,
    },
    entity_type_breakdown,
    geography: {
      states,
      with_city,
      with_zip,
      with_county,
      with_service_area_county,
      with_service_area_state,
    },
    query_readiness,
    identity_continuity,
    entities: pilot,
  };

  return {
    manifest,
    validationOk: validation.ok,
    validationIssues: validation.issues,
    timings_ms: Object.fromEntries(
      Object.entries(timings).map(([k, v]) => [k, Number(v.toFixed(3))])
    ),
    catalog_stats: loaded.stats,
  };
}
