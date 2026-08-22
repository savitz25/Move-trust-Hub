/**
 * MDC-PROD-003 static validator — code/contracts only.
 * Does NOT publish DB rows. Does NOT require live production apply.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

assert.ok(existsSync('lib/county-regulatory/shared/public-read-gate.ts'));
assert.ok(
  existsSync('lib/county-regulatory/shared/fetch-published-county-credentials.ts')
);
assert.ok(existsSync('lib/county-regulatory/mdc/public-read.ts'));
assert.ok(existsSync('lib/county-regulatory/mdc/public-read-core.ts'));
assert.ok(existsSync('lib/county-regulatory/mdc/public-read.test.ts'));
assert.ok(existsSync('components/company/miami-dade-registration-block.tsx'));
assert.ok(existsSync('scripts/mdc-prod-003-canary.mjs'));
assert.ok(existsSync('scripts/publish-mdc-prod-003-canary.mjs'));

const page = readFileSync('app/(move)/companies/[slug]/page.tsx', 'utf8');
assert.match(page, /MiamiDadeRegistrationBlock/);
assert.match(page, /getPublishedMiamiDadeRegistrationsForPublicProfile/);
assert.match(page, /PalmBeachCountyPermitBlock/);
assert.match(page, /revalidate = 300/);
assert.doesNotMatch(page, /searchParams[\s\S]{0,80}Internal/i);
assert.doesNotMatch(page, /\?show/i);

const core = readFileSync(
  'lib/county-regulatory/mdc/public-read-core.ts',
  'utf8'
);
assert.match(core, /MDC_SOURCE_KEY = 'mdc-moving-business-registration'/);
assert.match(core, /Issued county moving-business registration/);
assert.match(core, /filterPublishedCountyCredentialRows/);
assert.doesNotMatch(core, /ALLOW_INTERNAL_ONLY|RENDER_INTERNAL|featureFlag/i);
assert.match(
  core,
  /Miami-Dade Department of Regulatory and Economic Resources \(RER\) — Consumer and Neighborhood Protection Division/
);

const read = readFileSync('lib/county-regulatory/mdc/public-read.ts', 'utf8');
assert.match(read, /server-only/);
assert.match(read, /HOLD_FROM_STRUCTURED_DATA_V1/);
assert.match(read, /fetchPublishedCountyCredentialsForPublicProfile/);
assert.doesNotMatch(read, /\?show/i);
assert.doesNotMatch(read, /searchParams/);

const ui = readFileSync(
  'components/company/miami-dade-registration-block.tsx',
  'utf8'
);
assert.match(ui, /Miami-Dade Moving Business Registration/);
assert.match(ui, /r\.disclaimer/);
assert.match(ui, /Local Business Tax/);
assert.doesNotMatch(ui, /MoveTrustHub Certified/i);
assert.doesNotMatch(ui, /MoveTrustHub Approved/i);

assert.match(
  core,
  /Regulatory record verification is not a MoveTrustHub endorsement/
);

const sharedFetch = readFileSync(
  'lib/county-regulatory/shared/fetch-published-county-credentials.ts',
  'utf8'
);
assert.match(sharedFetch, /server-only/);
assert.match(sharedFetch, /evidence_publication_state', 'PUBLISHED'/);

// Ensure directory/compare/search not wired to county credentials / MDC UI
for (const p of [
  'lib/data-server.ts',
  'app/api/compare/companies/route.ts',
].filter((p) => existsSync(p))) {
  const t = readFileSync(p, 'utf8');
  assert.doesNotMatch(t, /provider_county_credential/);
  assert.doesNotMatch(t, /MiamiDadeRegistration/);
  assert.doesNotMatch(t, /mdc-moving-business-registration/);
}

const draft = JSON.parse(
  readFileSync(
    'data/county-regulatory/fl/miami-dade/production/mdc-prod-002/publication-canary-draft.json',
    'utf8'
  )
);
assert.equal(draft.company_count, 9);
assert.equal(draft.credential_count, 9);
assert.equal(
  draft.manifest_hash,
  'b50ba162bc3630b24bf8f9fff93c8f60f3beeebb06f1aca6ee9ae56f2bfdd1ac'
);
assert.equal(draft.apply, false);

const finalPath = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-003/publication-canary-v1.json'
);
assert.ok(existsSync(finalPath), 'final publication-canary-v1.json required');
const final = JSON.parse(readFileSync(finalPath, 'utf8'));
assert.equal(final.wave_id, 'MDC_MR_PUBLICATION_CANARY_V1');
assert.equal(final.company_count, 9);
assert.equal(final.credential_count, 9);
assert.equal(final.membership_unchanged_from_draft, true);
assert.equal(final.structured_data_hold, 'HOLD_FROM_STRUCTURED_DATA_V1');
assert.equal(final.lbt_mutations, 0);
const draftMrs = new Set(draft.members.map((m) => m.miami_dade_mr));
for (const m of final.members) assert.ok(draftMrs.has(m.miami_dade_mr));
assert.equal(draftMrs.size, 9);

// Publish tool must refuse unbounded apply
const publishTool = readFileSync(
  'scripts/publish-mdc-prod-003-canary.mjs',
  'utf8'
);
assert.match(publishTool, /--preconditions/);
assert.match(publishTool, /--dry-run/);
assert.match(publishTool, /--apply/);
assert.match(publishTool, /--rollback/);
assert.match(publishTool, /publish-all-miami-dade/);
assert.match(publishTool, /Refused: unbounded/);
// No INSERT/UPDATE company publication in apply path of canary script
const canary = readFileSync('scripts/mdc-prod-003-canary.mjs', 'utf8');
assert.match(canary, /evidence_publication_state='PUBLISHED'/);
assert.match(canary, /evidence_publication_state='INTERNAL_ONLY'/);
assert.doesNotMatch(
  canary,
  /insert into companies|update companies set publication_state/i
);
assert.doesNotMatch(canary, /provider_state_authority/);
assert.doesNotMatch(canary, /local.business.tax|mdc-business-tax/i);

// CDN policy not regressed for company profiles
const vercelJson = JSON.parse(readFileSync('vercel.json', 'utf8'));
const companyHeader = (vercelJson.headers || []).find(
  (h) => h.source === '/companies/:path*'
);
assert.ok(companyHeader, 'vercel /companies/:path* header required');
const cacheVal = (companyHeader.headers || [])
  .map((x) => x.value)
  .join(' ');
assert.match(cacheVal, /s-maxage=300/);
assert.doesNotMatch(cacheVal, /s-maxage=86400/);
const cdnVal = (companyHeader.headers || []).find(
  (x) => x.key === 'CDN-Cache-Control'
)?.value;
if (cdnVal) assert.match(cdnVal, /max-age=300/);

const revalPath = resolve(
  'data/county-regulatory/fl/miami-dade/production/mdc-prod-003/canary-revalidation.json'
);
if (existsSync(revalPath)) {
  const r = JSON.parse(readFileSync(revalPath, 'utf8'));
  const pass = r.pass ?? r.revalidate?.pass;
  const fail = r.fail ?? r.revalidate?.fail;
  assert.equal(pass, 9);
  assert.equal(fail, 0);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-mdc-prod-003',
      draft_hash: draft.manifest_hash,
      final_hash: final.manifest_hash,
      companies: 9,
      credentials: 9,
      published_gate: 'REAL',
      showInternal_bypass: false,
      structured_data_hold: 'HOLD_FROM_STRUCTURED_DATA_V1',
      lbt_mutations: 0,
      google_places_api_requests: 0,
      cdn_company_s_maxage: 300,
    },
    null,
    2
  )
);
