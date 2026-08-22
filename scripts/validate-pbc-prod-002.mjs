/**
 * PBC-PROD-002 package validator. Asserts readiness artifacts; no DB writes.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve('data/county-regulatory/fl/palm-beach/production/pbc-prod-002');
const required = [
  'production-wave-a-baseline.json',
  'credential-revalidation.json',
  'company-publication-readiness.json',
  'credential-publication-readiness.json',
  'multi-credential-audit.json',
  'source-freshness-audit.json',
  'field-completeness.json',
  'identity-manual-audit.json',
  'company-publication-state-distribution.json',
  'publication-canary-draft.json',
  'simulated-publication-delta.json',
  'public-read-contract.json',
  'consumer-copy-contract.json',
  'pbc-impact-delta.json',
  'readiness-summary.json',
  'rls-anon-access.json',
  'jurisdiction-presentation.json',
  'status-semantics.json',
];
for (const f of required) {
  assert.ok(existsSync(resolve(OUT, f)), `missing ${f}`);
}
assert.ok(
  existsSync(
    'docs/county-regulatory/fl/palm-beach/production/pbc-prod-002-publication-readiness.md'
  )
);

const baseline = JSON.parse(
  readFileSync(resolve(OUT, 'production-wave-a-baseline.json'), 'utf8')
);
assert.equal(baseline.match, true);
assert.equal(baseline.credentials, 46);
assert.equal(baseline.companies, 43);
assert.equal(baseline.internal_only, 46);
assert.equal(baseline.published, 0);

const rev = JSON.parse(
  readFileSync(resolve(OUT, 'credential-revalidation.json'), 'utf8')
);
assert.equal(rev.checked, 46);
assert.equal(rev.mismatches, 0);
assert.equal(rev.exact, 46);

const draft = JSON.parse(
  readFileSync(resolve(OUT, 'publication-canary-draft.json'), 'utf8')
);
assert.equal(draft.apply, false);
assert.equal(draft.wave_id, 'PBC_COUNTY_CREDENTIAL_PUBLICATION_CANARY_V1_DRAFT');
assert.ok(draft.company_count >= 1);
assert.ok(draft.credential_count >= 1);
assert.ok(draft.manifest_hash && draft.manifest_hash.length === 64);

const summary = JSON.parse(
  readFileSync(resolve(OUT, 'readiness-summary.json'), 'utf8')
);
assert.equal(summary.production_db_writes, 0);
assert.equal(summary.google_places_api_requests, 0);
assert.equal(summary.consumer_pii, 0);
assert.equal(summary.trust_score_changed, false);
assert.equal(summary.anon_denied, true);
assert.ok(
  [
    'READY_FOR_PBC_CREDENTIAL_PUBLICATION_CANARY',
    'NOT_READY_FOR_PBC_CREDENTIAL_PUBLICATION',
  ].includes(summary.status)
);

const sim = JSON.parse(
  readFileSync(resolve(OUT, 'simulated-publication-delta.json'), 'utf8')
);
assert.equal(sim.companies_created, 0);
assert.equal(sim.company_publication_changes, 0);
assert.equal(sim.trust_score, 0);

const impact = JSON.parse(
  readFileSync(resolve(OUT, 'pbc-impact-delta.json'), 'utf8')
);
assert.equal(impact.pbc_prod_001_realized.palm_beach_credentials_internally_added, 46);
assert.equal(impact.pbc_prod_001_realized.distinct_companies_internally_enriched, 43);
assert.equal(impact.pbc_prod_001_realized.county_credentials_publicly_published, 0);
assert.equal(impact.pbc_prod_002.production_db_writes, 0);

const rls = JSON.parse(readFileSync(resolve(OUT, 'rls-anon-access.json'), 'utf8'));
assert.equal(rls.ok, true);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-pbc-prod-002',
      status: summary.status,
      canary_companies: draft.company_count,
      canary_credentials: draft.credential_count,
      production_db_writes: 0,
      google_places_api_requests: 0,
      consumer_pii: 0,
    },
    null,
    2
  )
);
