import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-004'
);

const required = [
  'current-main-baseline.json',
  'observation-maturity.json',
  'canary-db-baseline.json',
  'canary-manifest-integrity.json',
  'canary-identity-revalidation.json',
  'canary-source-freshness.json',
  'status-semantics-audit.json',
  'canary-profile-sweep.json',
  'cache-observation.json',
  'direct-table-security.json',
  'public-read-contract-audit.json',
  'remaining-35-control-sweep.json',
  'remaining-company-state-recompute.json',
  'multi-credential-audit.json',
  'multi-credential-presentation-contract.json',
  'remaining-credential-identity.json',
  'remaining-credential-freshness.json',
  'expanded-ready-pool.json',
  'expanded-publication-draft.json',
  'simulated-expanded-delta.json',
  'observation-incidents.json',
  'seo-structured-share-regression.json',
  'state-regression.json',
  'pbc-impact-delta.json',
  'readiness-summary.json',
];

for (const name of required) {
  assert.ok(existsSync(resolve(OUT, name)), `missing ${name}`);
}

assert.ok(
  existsSync(
    'docs/county-regulatory/fl/palm-beach/production/pbc-prod-004-canary-observation-gate.md'
  )
);
assert.ok(existsSync('lib/county-regulatory/pbc/public-read-core.ts'));
assert.ok(existsSync('lib/county-regulatory/pbc/public-read.test.ts'));

const core = readFileSync('lib/county-regulatory/pbc/public-read-core.ts', 'utf8');
assert.match(core, /palmBeachPermitBlockHeading/);
assert.match(core, /Palm Beach County Moving Permits/);
assert.match(core, /filterPublishedCountyCredentialRows/);
const sharedGate = readFileSync(
  'lib/county-regulatory/shared/public-read-gate.ts',
  'utf8'
);
assert.match(sharedGate, /evidence_publication_state === 'PUBLISHED'/);

const ui = readFileSync(
  'components/company/palm-beach-county-permit-block.tsx',
  'utf8'
);
assert.match(ui, /palmBeachPermitBlockHeading/);

const summary = JSON.parse(readFileSync(resolve(OUT, 'readiness-summary.json'), 'utf8'));
assert.equal(summary.apply, false);
assert.equal(summary.expanded_publication_apply, false);
assert.equal(summary.production_credential_writes, 0);
assert.ok(
  [
    'WAITING — PBC CANARY OBSERVATION NOT MATURE',
    'READY_FOR_PBC_EXPANDED_CREDENTIAL_PUBLICATION',
    'PBC CANARY DEGRADED — REMEDIATION REQUIRED',
  ].includes(summary.status)
);

const time = JSON.parse(
  readFileSync(resolve(OUT, 'observation-maturity.json'), 'utf8')
);
if (time.before_maturity) {
  assert.equal(summary.status, 'WAITING — PBC CANARY OBSERVATION NOT MATURE');
  assert.equal(time.final_expanded_decision_allowed, false);
}

const db = JSON.parse(readFileSync(resolve(OUT, 'canary-db-baseline.json'), 'utf8'));
assert.equal(db.total, 46);
assert.equal(db.published, 11);
assert.equal(db.internal_only, 35);
assert.equal(db.unexpected_published, 0);

const manifest = JSON.parse(
  readFileSync(resolve(OUT, 'canary-manifest-integrity.json'), 'utf8')
);
assert.equal(manifest.pass, true);
assert.equal(
  manifest.actual_hash,
  'f9d56097fa4b2d1c6dfb729e208a6d13c7b75d5ecac13b674a77b3240a167b3f'
);

const sec = JSON.parse(
  readFileSync(resolve(OUT, 'direct-table-security.json'), 'utf8')
);
assert.equal(sec.anon_direct_select, 'DENIED');
assert.equal(sec.authenticated_direct_select, 'DENIED');

const draft = JSON.parse(
  readFileSync(resolve(OUT, 'expanded-publication-draft.json'), 'utf8')
);
assert.equal(draft.apply, false);
assert.equal(draft.production_credential_writes, 0);

const impact = JSON.parse(readFileSync(resolve(OUT, 'pbc-impact-delta.json'), 'utf8'));
assert.equal(impact.realized_baseline_unchanged.public_credential_records, 11);
assert.equal(impact.draft_counted_as_realized_publication, false);
assert.equal(impact.consumer_pii_committed ?? 0, 0);
assert.equal(impact.google_places_api_requests, 0);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-pbc-prod-004',
      status: summary.status,
      artifacts: required.length,
      draft_companies: draft.company_count,
      draft_credentials: draft.credential_count,
      apply: false,
      consumer_pii: 0,
      google_places: 0,
    },
    null,
    2
  )
);
