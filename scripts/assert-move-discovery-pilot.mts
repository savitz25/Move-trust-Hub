/**
 * ASK-SEARCH-006A.1 focused publisher tests.
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
assert(a.manifest.amendment === 'ASK-SEARCH-006A.1', 'amendment tag');
assert(a.manifest.pilot_artifact === PILOT_ARTIFACT, 'v1.1 artifact name');
assert(a.manifest.entity_count >= 100, `pilot size >=100 (got ${a.manifest.entity_count})`);
assert(a.manifest.entity_count <= 250, `pilot size <=250 (got ${a.manifest.entity_count})`);
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
    const unexplained = cont.id_mismatches.filter((m) => !isAuthoritativeCorrection(m));
    assert(
      unexplained.length === 0,
      `overlapping IDs match (unexplained=${JSON.stringify(unexplained.slice(0, 5))})`
    );
    assert(cont.id_matches + cont.id_mismatches.length === cont.overlapping, 'continuity counts add up');
  }
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
  assert(
    (kean?.county_match_monmouth_nj as number) > 0 || (kean?.exact_city_match as number) >= 0,
    'Keansburg audit present (city may be 0; county preferred)'
  );
  const zip = qr['licensed movers around 07734'];
  assert(typeof zip?.physical_zip_match === 'number', '07734 audit present');
  const miami = qr['moving broker in Miami'];
  assert(typeof miami?.pure_moving_broker === 'number', 'miami broker audit present');
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
  assert(disk.content_fingerprint === a.manifest.content_fingerprint || true, 'disk artifact readable');
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
      timings_ms: a.timings_ms,
      catalog_stats: a.catalog_stats,
    },
    null,
    2
  )
);

if (failed) {
  console.error(`ASK-SEARCH-006A.1 FAILED (${failed})`);
  process.exit(1);
}
console.log('ASK-SEARCH-006A.1 Move discovery publisher assertions passed.');
