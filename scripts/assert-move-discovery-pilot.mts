/**
 * ASK-SEARCH-006A.1 / 006A.2 focused publisher tests.
 */
import { publishMoveDiscoveryPilot, PILOT_ARTIFACT } from '../lib/network-discovery/publish';
import { contentFingerprint } from '../lib/network-discovery/fingerprint';
import { evaluatePilotEligibility } from '../lib/network-discovery/eligibility';
import {
  buildMoveNetworkId,
  mapEntityType,
  mapCompanyToDiscovery,
} from '../lib/network-discovery/map-company';
import { validateDiscoveryEntity, validateDiscoveryExport } from '../lib/network-discovery/validate';
import { serviceAreasFromCoverage, formatCountyLabel } from '../lib/network-discovery/geography';
import {
  CITY_IN_COUNTY,
  GEOGRAPHY_PRECISION_ORDER,
  MATCH_REASON,
  hasCountyServiceArea,
  isExplicitServiceCityArea,
} from '../lib/network-discovery/precision';
import type { MoveProviderRecord } from '../lib/network-discovery/types';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

let failed = 0;
function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    failed++;
  } else console.log('PASS:', msg);
}

const root = process.cwd();

// Deterministic IDs
{
  const row: MoveProviderRecord = {
    id: 'x',
    slug: 'sample-mover',
    name: 'Sample Mover',
    headquarters: 'Miami, FL',
    usdot_number: '1234567',
    mc_number: null,
    is_verified: true,
    out_of_service: false,
    authority_active: true,
    coverage: null,
    services: ['Carrier'],
    specialties: [],
    overall_rating: null,
    review_count: null,
    physical_city: 'Miami',
    physical_state: 'FL',
    coverage_counties: [{ stateSlug: 'florida', countySlug: 'miami-dade' }],
  };
  assert(buildMoveNetworkId(row, { usdotIsUnique: true }) === 'move:usdot-1234567', 'usdot network id');
  assert(
    buildMoveNetworkId(row, { usdotIsUnique: false }) === 'move:usdot-1234567--sample-mover',
    'collision id uses slug disambiguation'
  );
  assert(mapEntityType(row).entity_type === 'interstate_mover', 'carrier→interstate_mover');
  const broker = mapEntityType({ ...row, services: ['Broker'], usdot_number: null });
  assert(broker.entity_type === 'moving_broker', 'broker≠carrier');
  const mixed = mapEntityType({ ...row, services: ['Carrier / Broker'] });
  assert(mixed.categories.includes('carrier_broker'), 'carrier-broker category');
  const local = mapEntityType({
    ...row,
    usdot_number: null,
    is_local_only: true,
    services: ['Long Distance'],
  });
  assert(local.entity_type === 'intrastate_mover', 'local→intrastate_mover');
  const auto = mapEntityType({
    ...row,
    usdot_number: '2239816',
    services: ['Auto Transport', 'Broker'],
    entity_type_raw: 'BROKER',
  });
  assert(auto.entity_type === 'auto_transporter', 'auto broker→auto_transporter');
  const ent = mapCompanyToDiscovery(row);
  assert(ent.canonical_profile_url === 'https://www.movetrusthub.com/companies/sample-mover', 'canonical url');
  assert(
    (ent.service_areas || []).some((a) => a.kind === 'county' && a.state === 'FL'),
    'structured county in service_areas'
  );
  assert(ent.city === 'Miami' && ent.state === 'FL', 'physical location separate');
  assert(validateDiscoveryEntity(ent).length === 0, 'sample entity validates');
}

// County normalization
{
  const label = formatCountyLabel('new-jersey', 'monmouth');
  assert(/monmouth/i.test(label), 'monmouth county label');
  const areas = serviceAreasFromCoverage([
    { stateSlug: 'new-jersey', countySlug: 'monmouth' },
  ]);
  assert(
    areas.some((a) => a.kind === 'county' && a.state === 'NJ' && /monmouth/i.test(a.county)),
    'monmouth NJ service area'
  );
  assert(areas.some((a) => a.kind === 'state' && a.state === 'NJ'), 'NJ state from county');
}

// Eligibility fail-closed + structured geo
{
  const base: MoveProviderRecord = {
    id: 'x',
    slug: 'x-mover',
    name: 'X',
    headquarters: null,
    usdot_number: '9999999',
    mc_number: null,
    is_verified: false,
    out_of_service: false,
    authority_active: true,
    coverage: null,
    services: ['Carrier'],
    specialties: [],
    overall_rating: 5,
    review_count: 9999,
    physical_state: 'FL',
    physical_city: 'Miami',
  };
  assert(evaluatePilotEligibility(base).ok, 'eligible base');
  assert(
    evaluatePilotEligibility({
      ...base,
      physical_state: undefined,
      physical_city: undefined,
      coverage_counties: [{ stateSlug: 'new-jersey', countySlug: 'monmouth' }],
    }).ok,
    'county coverage alone satisfies geography'
  );
  assert(
    !evaluatePilotEligibility({
      ...base,
      physical_state: undefined,
      coverage_counties: [],
    }).ok,
    'no geo ineligible'
  );
  assert(!evaluatePilotEligibility({ ...base, out_of_service: true }).ok, 'oos ineligible');
  assert(!evaluatePilotEligibility({ ...base, authority_active: false }).ok, 'inactive auth ineligible');
  assert(
    evaluatePilotEligibility({ ...base, usdot_number: null, slug: 'local-slug' }).ok,
    'slug identity allowed without USDOT when geo present'
  );
}

// Publish twice — fingerprint stable
const a = publishMoveDiscoveryPilot(root);
const b = publishMoveDiscoveryPilot(root);
assert(a.validationOk && b.validationOk, 'validation ok both runs');
assert(a.manifest.content_fingerprint === b.manifest.content_fingerprint, 'fingerprint stable');
assert(a.manifest.entity_count === b.manifest.entity_count, 'count stable');
assert(
  contentFingerprint(a.manifest.entities) === contentFingerprint(b.manifest.entities),
  'entity content fingerprint matches helper'
);
assert(a.manifest.eligibility.pilot_selected === a.manifest.entity_count, 'pilot=export count');
assert(a.manifest.schema_version === 'ask-network-discovery-v1', 'schema unchanged');
assert(a.manifest.amendment === 'ASK-SEARCH-006A.2', 'amendment tag');
assert(a.manifest.pilot_artifact === PILOT_ARTIFACT, 'v1.1 artifact name');
assert(a.manifest.entity_count === 200, `pilot size frozen at 200 (got ${a.manifest.entity_count})`);
assert(
  a.manifest.content_fingerprint ===
    '0006223ddfb82ef3fbf0c1ad62472a0c53824e2c7e44dec940a0a0a3e9300a0d',
  `entity fingerprint unchanged from 006A.1 (got ${a.manifest.content_fingerprint})`
);
assert(
  (a.manifest.geography.with_service_area_county || 0) > 0,
  'structured county service areas present'
);

// No paid fields
assert(
  a.manifest.entities.every((e) => !('premium' in e) && !('paid_rank' in e) && !('overall_rating' in e)),
  'no rating/premium fields in export'
);

// Duplicate check
const v = validateDiscoveryExport(a.manifest.entities);
assert(v.ok, 'export validates');

// Identity continuity vs v1 baseline (full eligible set)
{
  const cont = a.manifest.identity_continuity;
  assert(!!cont, 'identity continuity reported');
  if (cont && cont.overlapping > 0) {
    /**
     * Authoritative corrections vs 006A v1 snapshot:
     * Old offline JSON incorrectly shared Mayflower USDOT 125563 (and similar)
     * across van-line brands with --slug disambiguation. Richer catalog + seeds
     * restore brand-correct unique USDOTs (or empty for Graebel agent network).
     */
    const isAuthoritativeCorrection = (m: {
      slug: string;
      old_id: string;
      new_id: string;
    }) => {
      const oldCollision = /move:usdot-\d+--/.test(m.old_id);
      const newUniqueUsdot = /^move:usdot-\d+$/.test(m.new_id);
      const graebelFix =
        m.slug === 'graebel-van-lines' &&
        m.old_id.startsWith('move:usdot-125563') &&
        m.new_id === 'move:co-graebel-van-lines';
      return graebelFix || (oldCollision && newUniqueUsdot);
    };
    const unexplained = cont.id_mismatches.filter(
      (m) => !isAuthoritativeCorrection(m) && (m as { kind?: string }).kind !== 'authoritative_unique_usdot_from_catalog' && (m as { kind?: string }).kind !== 'authoritative_graebel_no_mayflower_usdot'
    );
    assert(
      unexplained.length === 0,
      `overlapping IDs match (unexplained=${JSON.stringify(unexplained.slice(0, 5))})`
    );
    assert(cont.id_matches + cont.id_mismatches.length === cont.overlapping, 'continuity counts add up');
  }
}

// Geography precision contract
{
  const gp = a.manifest.geography_precision as {
    ordered_levels: { id: string; rank: number }[];
    match_reasons: string[];
    available_counts: Record<string, number>;
    unavailable: Record<string, string>;
  };
  assert(!!gp, 'geography_precision present');
  assert(
    JSON.stringify(gp.ordered_levels.map((l) => l.id)) === JSON.stringify([...GEOGRAPHY_PRECISION_ORDER]),
    'precision order locked'
  );
  for (const token of [
    MATCH_REASON.exact_physical_city,
    MATCH_REASON.exact_physical_zip,
    MATCH_REASON.explicit_service_city,
    MATCH_REASON.explicit_service_zip,
    MATCH_REASON.county_service_area,
    MATCH_REASON.state_service_area,
    MATCH_REASON.entity_type_match,
    MATCH_REASON.category_match,
  ]) {
    assert(gp.match_reasons.includes(token), `match reason ${token} in contract`);
  }
  assert(gp.available_counts.explicit_service_zip === 0, 'explicit_service_zip unavailable in catalog');
  assert(gp.available_counts.explicit_service_city === 0, 'explicit_service_city unavailable (HQ city ≠ service city)');
  assert(typeof gp.unavailable.explicit_service_zip === 'string', 'explicit_service_zip documented unavailable');
  assert(typeof gp.unavailable.explicit_service_city === 'string', 'explicit_service_city documented unavailable');
  assert(
    a.manifest.entities.every((e) => !(e.service_areas || []).some((area) => area.kind === 'zip')),
    'no fabricated service ZIP rows on entities'
  );
  assert(
    a.manifest.entities.every((e) =>
      !(e.service_areas || []).some(
        (area) =>
          area.kind === 'city' &&
          area.state === 'NJ' &&
          area.city.toLowerCase() === CITY_IN_COUNTY.keansburg_nj.city.toLowerCase()
      )
    ),
    'no fabricated Keansburg city service rows'
  );
}

// Query-field readiness
{
  const qr = a.manifest.query_readiness as Record<string, Record<string, unknown>>;
  assert(!!qr, 'query readiness present');
  const fl = qr['movers in Florida'];
  assert((fl?.state_match_fl as number) > 0, 'fields ready: movers FL');
  const nj = qr['interstate movers in New Jersey'];
  assert((nj?.nj_state_match as number) > 0 || (nj?.interstate_with_nj_signal as number) > 0, 'fields ready: NJ');

  const kean = qr['movers in Keansburg NJ'];
  assert((kean?.exact_city_match as number) === 0, 'Keansburg exact city = 0');
  assert((kean?.exact_physical_city as number) === 0, 'Keansburg exact_physical_city = 0');
  assert((kean?.explicit_service_city as number) === 0, 'Keansburg explicit_service_city = 0');
  assert((kean?.county_service_area_match as number) === 17, 'Keansburg county_service_area_match = 17');
  assert((kean?.county_match_monmouth_nj as number) === 17, 'Keansburg via Monmouth county coverage = 17');
  const keanMatches = (kean?.matches as { reasons: string[]; match_class: string }[]) || [];
  assert(keanMatches.length === 17, `Keansburg match rows = 17 (got ${keanMatches.length})`);
  assert(
    keanMatches.every((m) => m.match_class === MATCH_REASON.county_service_area_match),
    'Keansburg matches classified as county_service_area_match'
  );
  assert(
    keanMatches.every((m) => m.reasons.includes(MATCH_REASON.county_service_area)),
    'Keansburg underlying reason is county_service_area'
  );
  assert(
    keanMatches.every(
      (m) =>
        !m.reasons.includes(MATCH_REASON.exact_physical_city) &&
        !m.reasons.includes(MATCH_REASON.explicit_service_city) &&
        m.match_class !== 'exact_city_match'
    ),
    'no Keansburg match mislabeled as exact city'
  );
  assert(
    a.manifest.entities.filter((e) => hasCountyServiceArea(e, 'NJ', 'Monmouth')).length === 17,
    '17 entities have Monmouth county service-area'
  );

  const zipQ = qr['licensed movers around 07734'];
  assert((zipQ?.physical_zip_match as number) === 0, '07734 is not HQ ZIP of any pilot entity');
  assert((zipQ?.exact_physical_zip as number) === 0, '07734 exact_physical_zip = 0');
  assert((zipQ?.explicit_service_zip_match as number) === 0, '07734 is not an explicit service ZIP');
  assert((zipQ?.explicit_service_zip as number) === 0, '07734 explicit_service_zip = 0');
  assert(
    (zipQ?.county_service_area_via_zip_resolution as number) === 17,
    '07734 county_service_area_via_zip_resolution = 17'
  );
  const zipMatches = (zipQ?.matches as { match_class: string; reasons: string[] }[]) || [];
  assert(
    zipMatches.every((m) => m.match_class === MATCH_REASON.county_service_area_via_zip_resolution),
    '07734 matches classified as county_service_area_via_zip_resolution'
  );
  assert(
    zipMatches.every((m) => !m.reasons.includes(MATCH_REASON.explicit_service_zip)),
    'no fabricated 07734 service ZIP match reason'
  );

  const miami = qr['moving broker in Miami'];
  assert(typeof miami?.pure_moving_broker === 'number', 'miami broker audit present');
  assert((miami?.pure_moving_broker as number) === 1, 'one pure moving broker (U-Pack)');
  assert((miami?.miami_moving_broker as number) === 0, 'no Miami-located pure moving broker');
  assert((miami?.miami_or_florida_moving_broker as number) === 0, 'U-Pack is not a Miami/FL broker match');
  const miamiMatches = (miami?.matches as unknown[]) || [];
  assert(miamiMatches.length === 0, 'Miami broker matches array empty');
  const brokerAudit = (miami?.pure_broker_audit as { network_entity_id: string; match_class: string }[]) || [];
  assert(
    brokerAudit.some(
      (m) => m.network_entity_id === 'move:usdot-2632086' && m.match_class === MATCH_REASON.entity_type_match
    ),
    'U-Pack remains broker via entity_type_match, not a Miami geo match'
  );
}

{
  assert(
    a.manifest.entities.every(
      (e) =>
        !(e.service_areas || []).some((area) => area.kind === 'city' && isExplicitServiceCityArea(e, area))
    ),
    'HQ city kind is never counted as explicit service city'
  );
  const idsA = a.manifest.entities.map((e) => e.network_entity_id).join('|');
  const idsB = b.manifest.entities.map((e) => e.network_entity_id).join('|');
  assert(idsA === idsB, 'membership drift = 0 across two publisher runs');
}

// Handoff readiness
{
  const sample = a.manifest.entities[0];
  assert(sample.canonical_profile_url.startsWith('https://www.movetrusthub.com/companies/'), 'profile handoff ready');
  assert(!!sample.entity_type, 'view-more context fields present');
}

// Artifact written expectation (publish script writes; assert may run without write)
const artifactPath = join(root, 'data', 'network-discovery', PILOT_ARTIFACT);
if (existsSync(artifactPath)) {
  const disk = JSON.parse(readFileSync(artifactPath, 'utf8'));
  assert(typeof disk.content_fingerprint === 'string' && disk.content_fingerprint.length === 64, 'disk artifact readable');
}

console.log(
  JSON.stringify(
    {
      considered: a.manifest.eligibility.considered,
      eligible: a.manifest.eligibility.eligible,
      ineligible: a.manifest.eligibility.ineligible,
      ineligible_reasons: a.manifest.eligibility.ineligible_reasons,
      pilot_selected: a.manifest.eligibility.pilot_selected,
      fingerprint: a.manifest.content_fingerprint,
      entity_type_breakdown: a.manifest.entity_type_breakdown,
      geography: a.manifest.geography,
      identity_continuity: a.manifest.identity_continuity,
      query_readiness: a.manifest.query_readiness,
      geography_precision: a.manifest.geography_precision,
      timings_ms: a.timings_ms,
      catalog_stats: a.catalog_stats,
    },
    null,
    2
  )
);

if (failed) {
  console.error(`ASK-SEARCH-006A.2 FAILED (${failed})`);
  process.exit(1);
}
console.log('ASK-SEARCH-006A.2 Move discovery publisher assertions passed.');
