import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-002'
);

for (const f of [
  'production-baseline.json',
  'manifest-integrity.json',
  'credential-revalidation.json',
  'company-publication-state-distribution.json',
  'publication-ready-pool.json',
  'publication-canary-draft.json',
  'consumer-semantics.json',
  'public-read-architecture-reuse.json',
  'readiness-summary.json',
  'source-freshness.json',
  'date-semantics.json',
  'company-level-readiness.json',
  'credential-level-readiness.json',
  'multi-license-audit.json',
  'lbt-separation.json',
  'public-copy-contract.json',
  'palm-beach-architecture-reuse-audit.json',
  'future-public-read-contract.json',
]) {
  assert.ok(existsSync(resolve(OUT, f)), `missing ${f}`);
}

assert.ok(existsSync('scripts/run-mdc-prod-002-publication-readiness.mjs'));
assert.ok(
  existsSync(
    'docs/county-regulatory/fl/miami-dade/production/mdc-prod-002-publication-readiness.md'
  )
);

const summary = JSON.parse(
  readFileSync(resolve(OUT, 'readiness-summary.json'), 'utf8')
);
assert.equal(summary.production_db_writes, 0);
assert.equal(summary.apply, false);
assert.ok(
  [
    'READY_FOR_MDC_MR_PUBLICATION_CANARY',
    'NOT_READY_FOR_MDC_MR_PUBLICATION',
  ].includes(summary.status)
);

const baseline = JSON.parse(
  readFileSync(resolve(OUT, 'production-baseline.json'), 'utf8')
);
assert.equal(baseline.miami_dade.total, 70);
assert.equal(baseline.miami_dade.internal_only, 70);
assert.equal(baseline.miami_dade.published, 0);
assert.equal(baseline.palm_beach.total, 46);
assert.equal(baseline.palm_beach.published, 11);

const reval = JSON.parse(
  readFileSync(resolve(OUT, 'credential-revalidation.json'), 'utf8')
);
assert.equal(reval.pass, true);
assert.equal(reval.wrong_company, 0);

const draft = JSON.parse(
  readFileSync(resolve(OUT, 'publication-canary-draft.json'), 'utf8')
);
assert.equal(draft.apply, false);
assert.equal(draft.wave_id, 'MDC_MR_PUBLICATION_CANARY_V1_DRAFT');
assert.ok(draft.credential_count >= 1);
assert.ok(draft.credential_count <= 11);

const sem = JSON.parse(readFileSync(resolve(OUT, 'consumer-semantics.json'), 'utf8'));
assert.match(sem.public_credential_type, /Moving Business Registration/);
assert.equal(sem.raw_source_status, 'Issued');
assert.doesNotMatch(sem.consumer_status_label, /Licensed and active/i);

const fresh = JSON.parse(readFileSync(resolve(OUT, 'source-freshness.json'), 'utf8'));
assert.equal(fresh.pass, true);
assert.equal(fresh.counts.CURRENT, 70);

const multi = JSON.parse(readFileSync(resolve(OUT, 'multi-license-audit.json'), 'utf8'));
assert.equal(multi.wave_a_companies_with_multiple_concurrent_issued_mrs, 0);

const arch = JSON.parse(
  readFileSync(resolve(OUT, 'palm-beach-architecture-reuse-audit.json'), 'utf8')
);
assert.equal(arch.do_not_build_second_system, true);

const read = JSON.parse(
  readFileSync(resolve(OUT, 'future-public-read-contract.json'), 'utf8')
);
assert.equal(read.implement_in_002, false);
assert.equal(read.production_db_writes, 0);

const script = readFileSync(
  'scripts/run-mdc-prod-002-publication-readiness.mjs',
  'utf8'
);
assert.match(script, /READ-ONLY|production_db_writes: 0|Production DB writes: 0/i);
assert.doesNotMatch(script, /update provider_county_credential/i);
assert.doesNotMatch(script, /insert into provider_county_credential/i);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-mdc-prod-002',
      status: summary.status,
      ready_companies: summary.publication_ready_companies,
      ready_credentials: summary.publication_ready_credentials,
      canary_draft: `${draft.company_count}/${draft.credential_count}`,
      draft_hash: draft.manifest_hash,
      production_db_writes: 0,
    },
    null,
    2
  )
);
