import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-001'
);

for (const f of [
  'mdc-mr-wave-a-research-freeze-v1.json',
  'wave-a-revalidation.json',
  'mdc-mr-wave-a-internal-v1.json',
  'apply-result.json',
  'schema-reuse-audit.json',
  'preconditions.json',
  'dry-run-result.json',
  'multi-license-audit.json',
  'newly-linkable-future-pool.json',
]) {
  assert.ok(existsSync(resolve(OUT, f)), `missing ${f}`);
}

assert.ok(existsSync('scripts/run-mdc-prod-001-internal-ingest.mjs'));
assert.ok(
  existsSync(
    'docs/county-regulatory/fl/miami-dade/production/mdc-prod-001-mr-wave-a-internal-ingest.md'
  )
);

const freeze = JSON.parse(
  readFileSync(resolve(OUT, 'mdc-mr-wave-a-research-freeze-v1.json'), 'utf8')
);
assert.equal(freeze.credential_count, 70);
assert.equal(freeze.company_count, 70);

const reval = JSON.parse(
  readFileSync(resolve(OUT, 'wave-a-revalidation.json'), 'utf8')
);
assert.equal(reval.pass, true);
assert.equal(reval.still_ready, 70);

const man = JSON.parse(
  readFileSync(resolve(OUT, 'mdc-mr-wave-a-internal-v1.json'), 'utf8')
);
assert.equal(man.wave_id, 'MDC_MR_WAVE_A_INTERNAL_V1');
assert.equal(man.publish, false);
assert.equal(man.credential_count, 70);
assert.equal(man.evidence_publication_state, 'INTERNAL_ONLY');
assert.equal(man.source.source_key, 'mdc-moving-business-registration');
assert.match(man.source.regulator, /Regulatory and Economic Resources/);

const apply = JSON.parse(readFileSync(resolve(OUT, 'apply-result.json'), 'utf8'));
assert.equal(apply.ok, true);
assert.equal(apply.n, 70);
assert.equal(apply.internal_only, 70);
assert.equal(apply.published, 0);
assert.equal(apply.publication_eligible, 0);
assert.equal(apply.palm_beach.pass, true);
assert.equal(apply.lbt_mutations, 0);
assert.equal(
  apply.status,
  'MIAMI-DADE MR WAVE A INGESTED — INTERNAL ONLY'
);

const script = readFileSync('scripts/run-mdc-prod-001-internal-ingest.mjs', 'utf8');
assert.match(script, /--apply/);
assert.match(script, /--rollback/);
assert.match(script, /--dry-run/);
assert.doesNotMatch(script, /--apply-all-miami-dade/);
assert.match(script, /INTERNAL_ONLY/);
assert.doesNotMatch(script, /LBT.*provider_county_credential.*insert/i);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-mdc-prod-001',
      status: apply.status,
      companies: man.company_count,
      credentials: man.credential_count,
      manifest_hash: man.manifest_hash,
      published: 0,
      palm_beach_unchanged: true,
      google_places: 0,
      consumer_pii: 0,
    },
    null,
    2
  )
);
