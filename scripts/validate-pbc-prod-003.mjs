import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

assert.ok(existsSync('lib/county-regulatory/pbc/public-read.ts'));
assert.ok(existsSync('lib/county-regulatory/pbc/public-read-core.ts'));
assert.ok(existsSync('lib/county-regulatory/pbc/public-read.test.ts'));
assert.ok(existsSync('components/company/palm-beach-county-permit-block.tsx'));
assert.ok(existsSync('scripts/pbc-prod-003-canary.mjs'));
assert.ok(existsSync('scripts/publish-pbc-prod-003-canary.mjs'));

const page = readFileSync('app/(move)/companies/[slug]/page.tsx', 'utf8');
assert.match(page, /PalmBeachCountyPermitBlock/);
assert.match(page, /getPublishedPalmBeachCountyPermitsForPublicProfile/);
assert.doesNotMatch(page, /searchParams[\s\S]{0,80}Internal/i);
assert.doesNotMatch(page, /\?show/i);

const core = readFileSync('lib/county-regulatory/pbc/public-read-core.ts', 'utf8');
assert.match(core, /evidence_publication_state === 'PUBLISHED'/);
assert.doesNotMatch(core, /ALLOW_INTERNAL_ONLY|RENDER_INTERNAL|featureFlag/i);
assert.match(core, /selectPublishedPalmBeachPermits/);

const read = readFileSync('lib/county-regulatory/pbc/public-read.ts', 'utf8');
assert.match(read, /server-only/);
assert.match(read, /evidence_publication_state', 'PUBLISHED'/);
assert.doesNotMatch(read, /\?show/i);
assert.doesNotMatch(read, /searchParams/);

// Ensure directory/compare/search not wired to county credentials
for (const p of [
  'lib/data-server.ts',
  'app/api/compare/companies/route.ts',
].filter((p) => existsSync(p))) {
  const t = readFileSync(p, 'utf8');
  assert.doesNotMatch(t, /provider_county_credential/);
  assert.doesNotMatch(t, /PalmBeachCountyPermit/);
}

const draft = JSON.parse(
  readFileSync(
    'data/county-regulatory/fl/palm-beach/production/pbc-prod-002/publication-canary-draft.json',
    'utf8'
  )
);
assert.equal(draft.company_count, 11);
assert.equal(draft.credential_count, 11);
assert.equal(
  draft.manifest_hash,
  '031ab4bca2b422842e9a05936204e10e560643970bac78394bbf630a7a40a3f9'
);

const finalPath = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-003/publication-canary-v1.json'
);
assert.ok(existsSync(finalPath));
const final = JSON.parse(readFileSync(finalPath, 'utf8'));
assert.equal(final.wave_id, 'PBC_COUNTY_CREDENTIAL_PUBLICATION_CANARY_V1');
assert.equal(final.company_count, 11);
assert.equal(final.credential_count, 11);
assert.equal(final.membership_unchanged_from_draft, true);
const draftMvs = new Set(draft.members.map((m) => m.palm_beach_mv));
for (const m of final.members) assert.ok(draftMvs.has(m.palm_beach_mv));

const revalPath = resolve(
  'data/county-regulatory/fl/palm-beach/production/pbc-prod-003/canary-revalidation.json'
);
if (existsSync(revalPath)) {
  const r = JSON.parse(readFileSync(revalPath, 'utf8'));
  assert.equal(r.pass, 11);
  assert.equal(r.fail, 0);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      validator: 'validate-pbc-prod-003',
      draft_hash: draft.manifest_hash,
      final_hash: final.manifest_hash,
      companies: 11,
      credentials: 11,
      published_gate: 'REAL',
      showInternal_bypass: false,
      google_places_api_requests: 0,
    },
    null,
    2
  )
);
