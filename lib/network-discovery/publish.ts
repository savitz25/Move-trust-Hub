/**
 * Read-only Move discovery publisher (ASK-SEARCH-006A.1 / 006A.2 closeout).
 * Primary source: active-directory-movers + structured county coverage.
 * No DB writes, no enrichment APIs. Entity mapping is frozen; 006A.2 only
 * locks query-readiness match reasons + geography precision policy.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { selectPilotCohort } from './cohort';
import { evaluatePilotEligibility } from './eligibility';
import { contentFingerprint } from './fingerprint';
import { loadMoveDiscoveryCatalog } from './load-catalog';
import { mapCompanyToDiscovery } from './map-company';
import {
  CITY_IN_COUNTY,
  MATCH_REASON,
  buildGeographyPrecisionContract,
  hasCountyServiceArea,
  hasExactPhysicalCity,
  hasExactPhysicalZip,
  hasExplicitServiceCity,
  hasExplicitServiceZip,
  hasPhysicalLocalityInState,
  hasPhysicalState,
  hasStateServiceArea,
  isExplicitServiceCityArea,
  matchRow,
  type MatchReason,
  type QueryMatch,
} from './precision';
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

function floridaGeoReasons(e: NetworkDiscoveryEntity): MatchReason[] {
  const reasons: MatchReason[] = [];
  if (hasPhysicalLocalityInState(e, 'FL')) reasons.push(MATCH_REASON.exact_physical_city);
  else if (hasPhysicalState(e, 'FL')) reasons.push(MATCH_REASON.physical_state);
  if (
    (e.service_areas || []).some(
      (a) => a.kind === 'city' && a.state === 'FL' && isExplicitServiceCityArea(e, a)
    )
  ) {
    reasons.push(MATCH_REASON.explicit_service_city);
  }
  if (hasCountyServiceArea(e, 'FL', '')) reasons.push(MATCH_REASON.county_service_area);
  if (hasStateServiceArea(e, 'FL')) reasons.push(MATCH_REASON.state_service_area);
  return [...new Set(reasons)];
}

function njGeoReasons(e: NetworkDiscoveryEntity): MatchReason[] {
  const reasons: MatchReason[] = [];
  if (hasPhysicalLocalityInState(e, 'NJ')) reasons.push(MATCH_REASON.exact_physical_city);
  else if (hasPhysicalState(e, 'NJ')) reasons.push(MATCH_REASON.physical_state);
  if (hasCountyServiceArea(e, 'NJ', '')) reasons.push(MATCH_REASON.county_service_area);
  if (hasStateServiceArea(e, 'NJ')) reasons.push(MATCH_REASON.state_service_area);
  return [...new Set(reasons)];
}

function bestClass(reasons: MatchReason[], fallback: MatchReason): MatchReason {
  const order: MatchReason[] = [
    MATCH_REASON.explicit_service_zip,
    MATCH_REASON.explicit_service_city,
    MATCH_REASON.exact_physical_zip,
    MATCH_REASON.exact_physical_city,
    MATCH_REASON.county_service_area_match,
    MATCH_REASON.county_service_area_via_zip_resolution,
    MATCH_REASON.county_service_area,
    MATCH_REASON.state_service_area,
    MATCH_REASON.physical_state,
    MATCH_REASON.entity_type_match,
    MATCH_REASON.category_match,
  ];
  return order.find((r) => reasons.includes(r)) || fallback;
}

function auditQueryReadiness(entities: NetworkDiscoveryEntity[]) {
  const { city, state, countyNeedle, zip } = CITY_IN_COUNTY.keansburg_nj;

  const keansburg = entities
    .map((e) => {
      const reasons: MatchReason[] = [];
      if (hasExactPhysicalCity(e, city, state)) reasons.push(MATCH_REASON.exact_physical_city);
      if (hasExplicitServiceCity(e, city, state)) reasons.push(MATCH_REASON.explicit_service_city);
      if (hasCountyServiceArea(e, state, countyNeedle)) reasons.push(MATCH_REASON.county_service_area);
      if (!reasons.length) return null;
      const match_class = hasExactPhysicalCity(e, city, state)
        ? MATCH_REASON.exact_physical_city
        : hasExplicitServiceCity(e, city, state)
          ? MATCH_REASON.explicit_service_city
          : MATCH_REASON.county_service_area_match;
      return matchRow(e, reasons, match_class);
    })
    .filter((x): x is QueryMatch => Boolean(x));

  const zip07734 = entities
    .map((e) => {
      const reasons: MatchReason[] = [];
      if (hasExactPhysicalZip(e, zip)) reasons.push(MATCH_REASON.exact_physical_zip);
      if (hasExplicitServiceZip(e, zip)) reasons.push(MATCH_REASON.explicit_service_zip);
      if (hasCountyServiceArea(e, state, countyNeedle)) reasons.push(MATCH_REASON.county_service_area);
      if (!reasons.length) return null;
      const match_class = hasExplicitServiceZip(e, zip)
        ? MATCH_REASON.explicit_service_zip
        : hasExactPhysicalZip(e, zip)
          ? MATCH_REASON.exact_physical_zip
          : MATCH_REASON.county_service_area_via_zip_resolution;
      return matchRow(e, reasons, match_class);
    })
    .filter((x): x is QueryMatch => Boolean(x));

  const brokers = entities.filter((e) => e.entity_type === 'moving_broker');
  const carrierBrokers = entities.filter((e) => e.categories?.includes('carrier_broker'));

  const miamiPhysical = (e: NetworkDiscoveryEntity) =>
    Boolean(e.city?.toLowerCase().includes('miami') && (e.state === 'FL' || !e.state));
  const miamiExplicitCity = (e: NetworkDiscoveryEntity) => hasExplicitServiceCity(e, 'Miami', 'FL');
  const miamiCounty = (e: NetworkDiscoveryEntity) => hasCountyServiceArea(e, 'FL', 'miami');

  const miamiBrokerMatches = brokers
    .map((e) => {
      const reasons: MatchReason[] = [MATCH_REASON.entity_type_match];
      if (miamiPhysical(e)) reasons.push(MATCH_REASON.exact_physical_city);
      if (miamiExplicitCity(e)) reasons.push(MATCH_REASON.explicit_service_city);
      if (miamiCounty(e)) reasons.push(MATCH_REASON.county_service_area);
      const geo = reasons.some((r) => r !== MATCH_REASON.entity_type_match);
      if (!geo) return null;
      return matchRow(e, reasons, bestClass(reasons, MATCH_REASON.entity_type_match));
    })
    .filter((x): x is QueryMatch => Boolean(x));

  const florida = entities
    .map((e) => {
      const reasons = floridaGeoReasons(e);
      if (!reasons.length) return null;
      return matchRow(e, reasons, bestClass(reasons, MATCH_REASON.state_service_area));
    })
    .filter((x): x is QueryMatch => Boolean(x));

  const interstate = entities.filter((e) => e.entity_type === 'interstate_mover');
  const interstateNj = interstate
    .map((e) => {
      const geo = njGeoReasons(e);
      if (!geo.length) return null;
      const reasons: MatchReason[] = [MATCH_REASON.entity_type_match, ...geo];
      return matchRow(e, reasons, bestClass(reasons, MATCH_REASON.entity_type_match));
    })
    .filter((x): x is QueryMatch => Boolean(x));

  const auto = entities.filter((e) => e.entity_type === 'auto_transporter');
  const intrastate = entities.filter((e) => e.entity_type === 'intrastate_mover');

  return {
    'movers in Keansburg NJ': {
      exact_city_match: keansburg.filter((m) => m.match_class === MATCH_REASON.exact_physical_city).length,
      exact_physical_city: keansburg.filter((m) => m.reasons.includes(MATCH_REASON.exact_physical_city)).length,
      explicit_service_city: keansburg.filter((m) =>
        m.reasons.includes(MATCH_REASON.explicit_service_city)
      ).length,
      county_service_area_match: keansburg.filter(
        (m) => m.match_class === MATCH_REASON.county_service_area_match
      ).length,
      county_match_monmouth_nj: keansburg.filter((m) =>
        m.reasons.includes(MATCH_REASON.county_service_area)
      ).length,
      matches: keansburg,
      note:
        'Locked rule: Monmouth County coverage MAY satisfy "movers in Keansburg NJ" as county_service_area_match. Not exact_city_match. No fabricated Keansburg city service row.',
    },
    'licensed movers around 07734': {
      exact_physical_zip: zip07734.filter((m) => m.reasons.includes(MATCH_REASON.exact_physical_zip)).length,
      explicit_service_zip: zip07734.filter((m) =>
        m.reasons.includes(MATCH_REASON.explicit_service_zip)
      ).length,
      physical_zip_match: zip07734.filter((m) => m.reasons.includes(MATCH_REASON.exact_physical_zip)).length,
      explicit_service_zip_match: zip07734.filter((m) =>
        m.reasons.includes(MATCH_REASON.explicit_service_zip)
      ).length,
      county_service_area_via_zip_resolution: zip07734.filter(
        (m) => m.match_class === MATCH_REASON.county_service_area_via_zip_resolution
      ).length,
      county_match_monmouth_nj: zip07734.filter((m) =>
        m.reasons.includes(MATCH_REASON.county_service_area)
      ).length,
      matches: zip07734,
      note:
        'Locked rule: Ask may resolve 07734 → Keansburg → Monmouth County and use county coverage as county_service_area_via_zip_resolution. Not explicit_service_zip. No fake 07734 service ZIP is published.',
    },
    'moving broker in Miami': {
      pure_moving_broker: brokers.length,
      miami_city_match: entities.filter((e) => miamiPhysical(e) || miamiExplicitCity(e)).length,
      miami_moving_broker: brokers.filter((e) => miamiPhysical(e) || miamiExplicitCity(e) || miamiCounty(e))
        .length,
      miami_or_florida_moving_broker: miamiBrokerMatches.length,
      carrier_broker_total: carrierBrokers.length,
      florida_state_match: florida.length,
      matches: miamiBrokerMatches,
      pure_broker_audit: brokers.map((e) =>
        matchRow(e, [MATCH_REASON.entity_type_match], MATCH_REASON.entity_type_match)
      ),
      carrier_broker_audit: carrierBrokers.map((e) =>
        matchRow(e, [MATCH_REASON.category_match], MATCH_REASON.category_match)
      ),
      note:
        'moving_broker ≠ mover. U-Pack is a pure broker (entity_type_match) but not a Miami match. Carrier-broker uses category_match. Zero Miami-located pure moving brokers in this pilot.',
    },
    'movers in Florida': {
      state_match_fl: florida.length,
      physical_hq_fl: entities.filter((e) => hasPhysicalState(e, 'FL')).length,
      matches: florida,
    },
    'interstate movers in New Jersey': {
      interstate_total: interstate.length,
      nj_state_match: entities.filter((e) => njGeoReasons(e).length > 0).length,
      interstate_with_nj_signal: interstateNj.length,
      matches: interstateNj,
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
  eligible: NetworkDiscoveryEntity[]
): PilotExportManifest['identity_continuity'] {
  const baselinePath = join(rootDir, 'data', 'network-discovery', BASELINE_ARTIFACT);
  if (!existsSync(baselinePath)) {
    return {
      baseline_path: BASELINE_ARTIFACT,
      overlapping: 0,
      id_matches: 0,
      id_mismatches: [],
      dropped_from_baseline: [],
      newly_discoverable: eligible.length,
    };
  }
  const baseline = JSON.parse(readFileSync(baselinePath, 'utf8')) as {
    entities: NetworkDiscoveryEntity[];
  };
  const newBySlug = new Map<string, NetworkDiscoveryEntity>();
  for (const e of eligible) {
    const slug = e.canonical_profile_url.split('/companies/')[1] || '';
    if (slug) newBySlug.set(decodeURIComponent(slug).toLowerCase(), e);
  }

  let overlapping = 0;
  let id_matches = 0;
  const id_mismatches: { slug: string; old_id: string; new_id: string; kind: string }[] = [];
  const dropped_from_baseline: { slug: string; old_id: string; reason: string }[] = [];

  for (const old of baseline.entities || []) {
    const slug = decodeURIComponent(
      old.canonical_profile_url.split('/companies/')[1] || ''
    ).toLowerCase();
    const neu = newBySlug.get(slug);
    if (!neu) {
      dropped_from_baseline.push({
        slug,
        old_id: old.network_entity_id,
        reason:
          'not in richer-source eligible set (insufficient structured geography or catalog absence)',
      });
      continue;
    }
    overlapping++;
    if (neu.network_entity_id === old.network_entity_id) id_matches++;
    else {
      const oldCollision = /move:usdot-\d+--/.test(old.network_entity_id);
      const newUnique = /^move:usdot-\d+$/.test(neu.network_entity_id);
      const graebel =
        slug === 'graebel-van-lines' && neu.network_entity_id === 'move:co-graebel-van-lines';
      const kind = graebel
        ? 'authoritative_graebel_no_mayflower_usdot'
        : oldCollision && newUnique
          ? 'authoritative_unique_usdot_from_catalog'
          : 'unexplained';
      id_mismatches.push({
        slug,
        old_id: old.network_entity_id,
        new_id: neu.network_entity_id,
        kind,
      });
    }
  }

  const baselineSlugs = new Set(
    (baseline.entities || []).map((old) =>
      decodeURIComponent(old.canonical_profile_url.split('/companies/')[1] || '').toLowerCase()
    )
  );
  const newly_discoverable = eligible.filter((e) => {
    const slug = decodeURIComponent(
      e.canonical_profile_url.split('/companies/')[1] || ''
    ).toLowerCase();
    return slug && !baselineSlugs.has(slug);
  }).length;

  return {
    baseline_path: BASELINE_ARTIFACT,
    overlapping,
    id_matches,
    id_mismatches,
    dropped_from_baseline,
    newly_discoverable,
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
  const service_states: Record<string, number> = {};
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
    const seen = new Set<string>();
    if (e.state) seen.add(e.state);
    for (const a of e.service_areas || []) {
      if ('state' in a && a.state) seen.add(a.state);
    }
    for (const st of seen) service_states[st] = (service_states[st] || 0) + 1;
  }

  const fingerprint = contentFingerprint(pilot);
  const query_readiness = auditQueryReadiness(pilot);
  const geography_precision = buildGeographyPrecisionContract(pilot);
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
    amendment: 'ASK-SEARCH-006A.2',
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
      service_states,
    },
    query_readiness,
    geography_precision,
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
