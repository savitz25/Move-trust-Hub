/**
 * ASK-SEARCH-006A focused publisher tests.
 */
import { createHash } from 'node:crypto';
import { publishMoveDiscoveryPilot } from '../lib/network-discovery/publish';
import { contentFingerprint } from '../lib/network-discovery/fingerprint';
import { evaluatePilotEligibility } from '../lib/network-discovery/eligibility';
import { buildMoveNetworkId, mapEntityType, mapCompanyToDiscovery } from '../lib/network-discovery/map-company';
import { validateDiscoveryEntity, validateDiscoveryExport } from '../lib/network-discovery/validate';
import type { MoveCompanySnapshotRow } from '../lib/network-discovery/types';

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
  const row: MoveCompanySnapshotRow = {
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
  };
  assert(buildMoveNetworkId(row, { usdotIsUnique: true }) === 'move:usdot-1234567', 'usdot network id');
  assert(
    buildMoveNetworkId(row, { usdotIsUnique: false }) === 'move:usdot-1234567--sample-mover',
    'collision id uses slug disambiguation'
  );
  assert(mapEntityType(row).entity_type === 'interstate_mover', 'carrier→interstate_mover');
  const broker = mapEntityType({ ...row, services: ['Broker'] });
  assert(broker.entity_type === 'moving_broker', 'broker≠carrier');
  const mixed = mapEntityType({ ...row, services: ['Carrier / Broker'] });
  assert(mixed.categories.includes('carrier_broker'), 'carrier-broker category');
  const ent = mapCompanyToDiscovery(row);
  assert(ent.canonical_profile_url === 'https://www.movetrusthub.com/companies/sample-mover', 'canonical url');
  assert(validateDiscoveryEntity(ent).length === 0, 'sample entity validates');
}

// Eligibility fail-closed
{
  const base: MoveCompanySnapshotRow = {
    id: 'x',
    slug: 'x',
    name: 'X',
    headquarters: 'Miami, FL',
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
  };
  assert(evaluatePilotEligibility(base).ok, 'eligible base');
  assert(!evaluatePilotEligibility({ ...base, headquarters: 'Gainesville' }).ok, 'city-only HQ ineligible');
  assert(!evaluatePilotEligibility({ ...base, out_of_service: true }).ok, 'oos ineligible');
  assert(!evaluatePilotEligibility({ ...base, authority_active: false }).ok, 'inactive auth ineligible');
  assert(!evaluatePilotEligibility({ ...base, usdot_number: '12' }).ok, 'short usdot ineligible');
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

// No paid fields
assert(
  a.manifest.entities.every((e) => !('premium' in e) && !('paid_rank' in e) && !('overall_rating' in e)),
  'no rating/premium fields in export'
);

// Duplicate check
const v = validateDiscoveryExport(a.manifest.entities);
assert(v.ok, 'export validates');

// Query-field readiness (exported fields sufficient — not Ask index)
function fieldReady(q: string): boolean {
  const ents = a.manifest.entities;
  if (q.includes('Keansburg')) {
    // May be absent from offline cohort — fields support city/state/zip matching when present
    return ents.some((e) => e.state === 'NJ') && ents.every((e) => e.city !== undefined || e.state !== undefined);
  }
  if (q.includes('07734')) return ents.some((e) => e.zip || e.state === 'NJ');
  if (q.includes('moving broker') && q.includes('Miami')) {
    return ents.some((e) => e.entity_type === 'moving_broker' || e.categories?.includes('broker'));
  }
  if (q.includes('Florida') || q.includes('FL')) return ents.some((e) => e.state === 'FL');
  if (q.includes('interstate') && q.includes('New Jersey')) {
    return ents.some((e) => e.state === 'NJ' && e.entity_type === 'interstate_mover');
  }
  return true;
}

assert(fieldReady('movers in Florida'), 'fields ready: movers FL');
assert(fieldReady('interstate movers in New Jersey'), 'fields ready: interstate NJ');
assert(fieldReady('movers in Keansburg NJ'), 'fields ready: Keansburg schema (NJ present)');
assert(fieldReady('licensed movers around 07734'), 'fields ready: zip/NJ schema');

// Handoff readiness
{
  const sample = a.manifest.entities[0];
  assert(sample.canonical_profile_url.startsWith('https://www.movetrusthub.com/companies/'), 'profile handoff ready');
  assert(!!sample.state && !!sample.entity_type, 'view-more context fields present');
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
      timings_ms: a.timings_ms,
    },
    null,
    2
  )
);

if (failed) {
  console.error(`ASK-SEARCH-006A FAILED (${failed})`);
  process.exit(1);
}
console.log('ASK-SEARCH-006A Move discovery publisher assertions passed.');
