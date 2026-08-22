/**
 * FL-C002 — validate Palm Beach staging package.
 * No DB. No Google APIs. No production writes.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const NORM = resolve('data/county-regulatory/fl/palm-beach/normalized');
const META = resolve('data/county-regulatory/fl/palm-beach/meta');
const RAW = resolve('data/county-regulatory/fl/palm-beach/raw');

const required = [
  'mover-permits.json',
  'business-information-reports.json',
  'complaint-observations.json',
  'enforcement-observations.json',
  'identity-contact-observations.json',
  'disposition-code-catalog.json',
  'fdacs-matchability.json',
  'field-coverage.json',
  'incremental-value.json',
  'fl-c002-summary.json',
];
for (const f of required) {
  assert.ok(existsSync(resolve(NORM, f)), `missing ${f}`);
}

const permits = readJson(resolve(NORM, 'mover-permits.json'));
const complaints = readJson(resolve(NORM, 'complaint-observations.json'));
const enforcement = readJson(resolve(NORM, 'enforcement-observations.json'));
const matchability = readJson(resolve(NORM, 'fdacs-matchability.json'));
const summary = readJson(resolve(NORM, 'fl-c002-summary.json'));
const provenance = readJson(resolve(META, 'raw-provenance.json'));
const dispositionCatalog = readJson(resolve(NORM, 'disposition-code-catalog.json'));

assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.production_db_migrations, 0);
assert.equal(summary.consumer_pii_committed, 0);
assert.equal(provenance.google_places_api_requests, 0);
assert.equal(provenance.production_writes, false);
assert.equal(provenance.consumer_pii_committed, 0);
assert.ok(provenance.files.length > 0);

// Provenance present on permits
assert.ok(permits.row_count > 0);
assert.equal(permits.records.length, permits.row_count);
const permitIds = new Set();
for (const r of permits.records) {
  assert.ok(r.source_url, 'permit source_url');
  assert.ok(r.retrieved_at, 'permit retrieved_at');
  assert.ok(r.source_record_id, 'permit source_record_id');
  assert.ok(r.business_regulatory_id, 'permit id');
  assert.equal(r.consumer_pii, false);
  assert.ok(!permitIds.has(r.source_record_id), `duplicate permit ${r.source_record_id}`);
  permitIds.add(r.source_record_id);
}

// Unique complaint source IDs; dispositions from observed official values or null
const officialCodes = new Set(
  dispositionCatalog.values.map((v) => (v.resolution_code || '').trim()).filter(Boolean)
);
const complaintIds = new Set();
const consumerPiiKeys = [
  'consumer_name',
  'complainant_name',
  'consumer_phone',
  'consumer_email',
  'consumer_address',
  'home_address',
  'ssn',
  'narrative',
  'complaint_narrative',
];
for (const c of complaints.records) {
  assert.ok(c.source_record_id);
  assert.ok(!complaintIds.has(c.source_record_id), `dup complaint ${c.source_record_id}`);
  complaintIds.add(c.source_record_id);
  assert.equal(c.observation_type, 'COMPLAINT_OBSERVATION');
  assert.equal(c.consumer_pii, false);
  assert.equal(c.pii_removed, true);
  for (const k of consumerPiiKeys) {
    assert.equal(Object.prototype.hasOwnProperty.call(c, k) && c[k] != null && c[k] !== '', false);
  }
  if (c.complaint_disposition_code) {
    assert.ok(
      officialCodes.has(String(c.complaint_disposition_code).trim()),
      `unexpected disposition code ${c.complaint_disposition_code}`
    );
  }
}

const enfIds = new Set();
for (const e of enforcement.records) {
  assert.ok(e.source_record_id);
  assert.ok(!enfIds.has(e.source_record_id), `dup enforcement ${e.source_record_id}`);
  enfIds.add(e.source_record_id);
  assert.equal(e.consumer_pii, false);
}

// Deterministic matchability counts
const counts = matchability.counts;
assert.equal(matchability.production_writes, false);
assert.equal(matchability.mode, 'OFFLINE_READ_ONLY');
const sum =
  counts.DETERMINISTIC_MATCH +
  counts.REVIEW_REQUIRED +
  counts.NOT_FOUND +
  counts.INSUFFICIENT_EVIDENCE;
assert.equal(sum, matchability.results.length);
assert.equal(sum, permits.row_count);

// Zero production write / Google Places integration in the normalize pipeline
const stagingText = readFileSync(
  resolve('scripts/fl-c002-palm-beach-normalize.mjs'),
  'utf8'
);
assert.ok(!/prisma\.(company|companies)\.(create|update|upsert)/i.test(stagingText));
assert.ok(!/places\.googleapis\.com/i.test(stagingText));
assert.ok(!/@googlemaps/i.test(stagingText));
assert.ok(!/google\.maps\.places/i.test(stagingText));

// Raw artifacts exist
assert.ok(existsSync(resolve(RAW, 'api-GetCompanies-sample-merged.json')));
assert.ok(existsSync(resolve(RAW, 'api-GetResolutions.json')));
assert.ok(readdirSync(RAW).some((n) => n.startsWith('bir-sample-')));

console.log(
  JSON.stringify(
    {
      ok: true,
      permits: permits.row_count,
      complaints: complaints.row_count,
      enforcement: enforcement.row_count,
      matchability: counts,
      provenance_files: provenance.files.length,
      google: 0,
      consumer_pii_committed: 0,
    },
    null,
    2
  )
);
