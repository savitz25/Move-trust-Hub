/**
 * FL-AUDIT-COUNTY-PRE-001 reconciliation validator (read-only).
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve('docs/audits/florida-county');

function load(name) {
  const p = resolve(OUT, name);
  assert.ok(existsSync(p), `missing ${name}`);
  return JSON.parse(readFileSync(p, 'utf8'));
}

assert.ok(existsSync('scripts/fl-audit-county-pre-001.mjs'));
assert.ok(
  existsSync(
    'docs/audits/florida-county/fl-audit-county-pre-001-enrichment-impact.md'
  )
);

const exec = load('executive-summary.json');
assert.match(exec.status, /COMPLETE — BASELINE FROZEN/);
assert.equal(exec.production_writes, 0);
assert.equal(exec.google, 0);
assert.equal(exec.consumer_pii, 0);
assert.equal(exec.wrong_company, 0);
assert.equal(exec.new_companies_created, 0);

const cur = load('current-county-production.json');
assert.equal(cur.credentials, 116);
assert.equal(cur.published, 20);
assert.equal(cur.internal_only, 96);
assert.equal(cur.published + cur.internal_only, cur.credentials);
assert.equal(cur.distinct_companies_any, 113);
assert.equal(cur.reconcile, true);

const pbc = load('pbc-production-audit.json');
assert.equal(pbc.total_credentials, 46);
assert.equal(pbc.distinct_companies, 43);
assert.equal(pbc.published, 11);
assert.equal(pbc.internal_only, 35);
assert.equal(pbc.published + pbc.internal_only, pbc.total_credentials);
assert.equal(pbc.match, true);

const mdc = load('mdc-production-audit.json');
assert.equal(mdc.total_mr_credentials, 70);
assert.equal(mdc.distinct_companies, 70);
assert.equal(mdc.published, 9);
assert.equal(mdc.internal_only, 61);
assert.equal(mdc.published + mdc.internal_only, mdc.total_mr_credentials);
assert.equal(mdc.match, true);

const union = load('cross-county-company-union.json');
assert.equal(
  union.pbc_only + union.mdc_only + union.both,
  union.total_distinct
);
assert.equal(union.total_distinct, 113);
assert.equal(union.method, 'canonical company_id union');

const broward = load('broward-impact-ledger.json');
assert.equal(broward.production_rows, 0);
assert.equal(broward.pra_sent, false);

const pinellas = load('pinellas-impact-ledger.json');
assert.equal(pinellas.production_rows, 0);
assert.equal(pinellas.fake_credential_rows, 0);

const create = load('company-creation-audit.json');
assert.equal(create.total_distinct, 0);

const contact = load('contact-enrichment.json');
assert.equal(contact.canonical_contact_promotions, 0);

const idq = load('identity-quality.json');
assert.equal(idq.wrong_company, 0);
assert.equal(idq.forced_name_only_links, 0);

const trust = load('trust-ranking-impact.json');
assert.equal(trust.trust_score_changed, false);
assert.equal(trust.county_ranking_bonus, 0);

const clocks = load('observation-clocks.json');
assert.equal(clocks.maturity_decisions_made, false);
assert.equal(clocks.clocks_reset, false);

const ledger = load('final-pre-maturity-county-impact-ledger.json');
assert.equal(ledger.ledger_id, 'FL_COUNTY_IMPACT_LEDGER_PRE_MATURITY_V1');
assert.equal(ledger.audit_production_writes, 0);
assert.equal(ledger.CURRENT.total_county_credentials, 116);
assert.equal(ledger.CURRENT.new_companies_created, 0);

const fin = readFileSync('scripts/fl-audit-county-pre-001.mjs', 'utf8');
assert.match(fin, /Production DB writes: 0/);
assert.doesNotMatch(fin, /insert into|update provider_county_credential set/i);
assert.doesNotMatch(fin, /places\.googleapis/);

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-fl-audit-county-pre-001',
      status: exec.status,
      credentials: 116,
      companies: 113,
      published: 20,
      internal: 96,
      cross_county: union.both,
      production_writes: 0,
    },
    null,
    2
  )
);
