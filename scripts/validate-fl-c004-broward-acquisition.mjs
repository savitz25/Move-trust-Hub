/**
 * FL-C004 — validate Broward acquisition/staging package.
 * No DB writes. No Google Places APIs.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const NORM = resolve('data/county-regulatory/fl/broward/normalized');
const META = resolve('data/county-regulatory/fl/broward/meta');
const RAW = resolve('data/county-regulatory/fl/broward/raw');

const required = [
  'program-verification.json',
  'source-interfaces.json',
  'field-inventory.json',
  'roster-completeness.json',
  'mover-registrations.json',
  'vehicle-permits.json',
  'complaint-observations.json',
  'enforcement-observations.json',
  'fdacs-matchability.json',
  'canonical-matchability.json',
  'broward-vs-palm-beach.json',
  'fl-c004-summary.json',
];
for (const f of required) {
  assert.ok(existsSync(resolve(NORM, f)), `missing ${f}`);
}

assert.ok(existsSync(resolve(META, 'raw-provenance.json')));
assert.ok(existsSync(resolve(RAW, 'MoverRegistrationApplication.pdf')));
assert.ok(existsSync(resolve(RAW, 'cdn-consumer-affairs.pdf')));

const summary = readJson(resolve(NORM, 'fl-c004-summary.json'));
const program = readJson(resolve(NORM, 'program-verification.json'));
const roster = readJson(resolve(NORM, 'roster-completeness.json'));
const movers = readJson(resolve(NORM, 'mover-registrations.json'));
const vehicles = readJson(resolve(NORM, 'vehicle-permits.json'));
const complaints = readJson(resolve(NORM, 'complaint-observations.json'));
const enforcement = readJson(resolve(NORM, 'enforcement-observations.json'));
const match = readJson(resolve(NORM, 'fdacs-matchability.json'));
const fields = readJson(resolve(NORM, 'field-inventory.json'));
const provenance = readJson(resolve(META, 'raw-provenance.json'));
const comparison = readJson(resolve(NORM, 'broward-vs-palm-beach.json'));

assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_writes, false);
assert.equal(summary.production_db_migrations, 0);
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(provenance.google_places_api_requests, 0);
assert.equal(provenance.consumer_pii_committed, 0);
assert.ok(provenance.files.length > 0);
for (const f of provenance.files) {
  assert.ok(f.sha256 && f.sha256.length === 64);
  assert.equal(f.modified, false);
}

assert.ok(program.credential_primary_name.toLowerCase().includes('registration'));
assert.ok(program.credential_vehicle_name.toLowerCase().includes('decal'));
assert.ok(/20-176/.test(program.ordinance));
assert.equal(program.current_status, 'OPERATING');

assert.equal(roster.completeness_classification, 'PRA_REQUIRED');
assert.equal(roster.public_roster_found, false);
assert.equal(movers.row_count, 0);
assert.equal(vehicles.row_count, 0);
assert.equal(complaints.row_count, 0);
assert.equal(enforcement.row_count, 0);
assert.equal(complaints.consumer_pii_committed, 0);

const sum =
  match.counts.DETERMINISTIC_MATCH +
  match.counts.REVIEW_REQUIRED +
  match.counts.NOT_FOUND +
  match.counts.INSUFFICIENT_EVIDENCE;
assert.equal(sum, 0);
assert.equal(match.production_writes, false);
assert.equal(match.google_places_api_requests, 0);

assert.equal(fields.inventory_basis, 'APPLICATION_SCHEMA_PUBLIC');
assert.ok(fields.fields.some((f) => f.field === 'vehicle_vin' && f.present_in_application === 'YES'));
assert.ok(fields.fields.some((f) => f.field === 'fdacs_im_license' && f.present_in_application === 'YES'));

assert.ok(comparison.dimensions.length >= 10);

// Palm Beach artifacts unchanged presence
assert.ok(
  existsSync(
    resolve('data/county-regulatory/fl/palm-beach/qualified/pbc-fdacs-crosswalk-v1.json')
  )
);

const script = readFileSync(resolve('scripts/fl-c004-broward-normalize.mjs'), 'utf8');
assert.ok(!/places\.googleapis\.com/i.test(script));
assert.ok(!/google\.maps\.places/i.test(script));
assert.ok(!/prisma\.(company|companies)\.(create|update|upsert)/i.test(script));

console.log(
  JSON.stringify(
    {
      ok: true,
      roster_class: roster.completeness_classification,
      mover_rows: movers.row_count,
      vehicle_rows: vehicles.row_count,
      complaint_rows: complaints.row_count,
      enforcement_rows: enforcement.row_count,
      matchability: match.counts,
      provenance_files: provenance.files.length,
      google: 0,
      consumer_pii_committed: 0,
      recommended: summary.recommended_fl_c005,
    },
    null,
    2
  )
);
