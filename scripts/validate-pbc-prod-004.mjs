import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-004'
);
assert.ok(existsSync(resolve(OUT, 'gate-summary.json')));
assert.ok(existsSync(resolve(OUT, 'time-gate.json')));
assert.ok(existsSync(resolve(OUT, 'expanded-publication-draft-v1.json')));
assert.ok(
  existsSync(
    'docs/county-regulatory/fl/palm-beach/production/pbc-prod-004-canary-observation-expanded-publication-gate.md'
  )
);

const summary = JSON.parse(readFileSync(resolve(OUT, 'gate-summary.json'), 'utf8'));
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

const draft = JSON.parse(
  readFileSync(resolve(OUT, 'expanded-publication-draft-v1.json'), 'utf8')
);
assert.equal(draft.apply, false);
assert.equal(draft.wave_id, 'PBC_COUNTY_CREDENTIAL_EXPANDED_PUBLICATION_V1_DRAFT');
assert.equal(draft.production_credential_writes, 0);

const time = JSON.parse(readFileSync(resolve(OUT, 'time-gate.json'), 'utf8'));
if (time.before_maturity) {
  assert.equal(summary.status, 'WAITING — PBC CANARY OBSERVATION NOT MATURE');
}

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-pbc-prod-004',
      status: summary.status,
      draft_companies: draft.company_count,
      draft_credentials: draft.credential_count,
      apply: false,
    },
    null,
    2
  )
);
