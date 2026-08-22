/**
 * FL-C011 — validate selective transplant integration package.
 * No DB writes. No Google Places. No production mutations.
 */
import assert from 'node:assert/strict';
import { createHash } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
}

const ROOT = resolve('data/county-regulatory/fl/architecture/c011');
const manifest = readJson(resolve(ROOT, 'final-integration-manifest.json'));
assert.equal(manifest.manifest_id, 'FL_COUNTY_RESEARCH_V1_FINAL_INTEGRATION_MANIFEST');
assert.equal(manifest.unresolved_review, 0);
assert.equal(manifest.consumer_pii_included, 0);
assert.equal(manifest.google_places_api_requests, 0);
assert.equal(manifest.production_migrations, 0);
assert.equal(manifest.package_json_changed, false);
assert.equal(manifest.expected_runtime_delta, 0);

const decisions = readJson(resolve(ROOT, 'review-file-decisions.json'));
assert.equal(decisions.unresolved_review, 0);
assert.equal(decisions.include.length, 2);
assert.equal(decisions.exclude.length, 4);

for (const f of manifest.files) {
  assert.ok(existsSync(resolve(f.destination_path)), `missing ${f.destination_path}`);
  const h = createHash('sha256').update(readFileSync(resolve(f.destination_path))).digest('hex');
  assert.equal(h, f.source_sha256, `hash mismatch ${f.destination_path}`);
}
for (const ex of decisions.exclude) {
  assert.equal(existsSync(resolve(ex.path)), false, `excluded path present ${ex.path}`);
}

// Architecture + C009 + C010 presence
assert.ok(
  existsSync(resolve('docs/county-regulatory/architecture/COUNTY_REGULATORY_ARCHITECTURE_V1.md'))
);
assert.ok(
  existsSync(
    resolve('docs/county-regulatory/architecture/palm-beach-v1/PALM_BEACH_COUNTY_REGULATORY_PILOT_V1.md')
  )
);
assert.ok(
  existsSync(
    resolve('data/county-regulatory/fl/architecture/c009/cohort/pbc-production-link-ready-v1.json')
  )
);
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/architecture/c010/fl-county-research-v1-freeze.json'))
);
assert.ok(
  existsSync(resolve('data/county-regulatory/fl/architecture/c010/state-track-gate.json'))
);

const gate = readJson(
  resolve('data/county-regulatory/fl/architecture/c010/state-track-gate.json')
);
assert.equal(gate.SAFE_TO_INTEGRATE_COUNTY_STACK_NOW, 'YES');

// Protected runtime: no staged/committed changes vs origin/main for protected paths
const protectedDiff = execSync(
  'git diff --name-only origin/main -- app components lib middleware.ts package.json package-lock.json supabase',
  { encoding: 'utf8' }
)
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);
assert.equal(
  protectedDiff.length,
  0,
  `protected runtime changed: ${protectedDiff.join(', ')}`
);

// package.json identical to origin/main
const pkgDiff = execSync('git diff origin/main -- package.json', { encoding: 'utf8' }).trim();
assert.equal(pkgDiff, '', 'package.json changed');

// no supabase migrations added
const mig = execSync('git diff --name-only origin/main -- supabase/migrations', {
  encoding: 'utf8',
}).trim();
assert.equal(mig, '', `migrations present: ${mig}`);

// audit mapping present
assert.ok(existsSync(resolve(ROOT, 'research-history-mapping.json')));

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-c011-selective-transplant',
      manifest_id: manifest.manifest_id,
      total_files: manifest.total_files,
      package_hash: manifest.package_hash.slice(0, 32),
      unresolved_review: 0,
      consumer_pii_included: 0,
      google_places_api_requests: 0,
      production_migrations: 0,
      package_json_changed: false,
      protected_runtime_changed: 0,
      expected_runtime_delta: 0,
    },
    null,
    2
  )
);
