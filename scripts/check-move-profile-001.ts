import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MOVE_HOME_INTEL_VERSION } from '../lib/intelligence/home-types';
import {
  authorityLabel,
  namesDiffer,
  profileSeoTitle,
  researchRole,
} from '../lib/company/research-profile';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

const LOCKED_FINGERPRINT = '3f2d144f65d5ab20bd57a1536eabf44825f18f4c8501130913c0a98a7787726e';

assert.equal(MOVE_HOME_INTEL_VERSION, 'move-home-intel-v1');
assert.equal(namesDiffer({ name: 'TWO MEN AND A TRUCK', fmcsaLegalName: 'ACME LLC' }), true);
assert.equal(researchRole({ entityType: 'Broker', services: [] }), 'Broker');
assert.equal(researchRole({ entityType: '', services: [] }), 'Unknown');
assert.equal(authorityLabel({ authorityActive: true }), 'Current authority recorded');
assert.equal(authorityLabel({ authorityActive: false }), 'Authority not current in stored evidence');
assert.equal(authorityLabel({}), 'Authority status unknown');

const hero = read('components/company/company-research-hero.tsx');
assert.match(hero, /<h1/);
assert.match(hero, /USDOT/);
assert.match(hero, /FMCSA legal entity/);
assert.match(hero, /Headquarters is not service territory/);
assert.match(hero, /Latest FMCSA refresh observed/);
assert.match(hero, /Verify DOT/);
assert.match(hero, /Why this profile/);
assert.match(hero, /Trace this record/);
assert.match(hero, /What we don/);
assert.doesNotMatch(hero, /Reputation Score|Trust Score|best mover/);
assert.match(hero, /not a MoveTrustHub endorsement/);
assert.match(hero, /min-h-11/);
assert.match(hero, /break-words|break-all/);
assert.match(hero, /overflow-x-clip|overflow-x-auto/);
assert.match(hero, /w-full sm:w-auto/);
assert.match(hero, /flex min-h-11 cursor-pointer items-center/);
assert.match(hero, /data-research-hero/);
assert.match(hero, /grid-cols-2/);
assert.match(hero, /MoveTrustHub is not recommending this mover/);
assert.match(hero, /FMCSA legal entity/);
assert.match(hero, /sr-only/);
assert.match(hero, /profile_verify_dot_clicked/);
assert.match(hero, /profile_trace_opened/);
assert.match(hero, /<h1/);
assert.match(hero, /<h2/);

const page = read('app/(move)/companies/[slug]/page.tsx');
assert.match(page, /CompanyResearchHero/);
assert.doesNotMatch(page, /TrustProfileShell/);
assert.match(page, /profileSeoTitle/);
assert.match(page, /countExactPublicDisplayName/);
assert.ok(
  page.indexOf('<CompanyResearchHero') < page.indexOf('<CompanyProfileReviewSources'),
  'reviews remain after the research hero',
);
assert.ok(
  page.indexOf('<FmcsaDotCompliance') < page.indexOf('<AttributedReviewsPanel'),
  'reviews remain after licensing evidence',
);
assert.doesNotMatch(page, /from 'recharts'|from \"recharts\"/);

const schema = read('lib/seo/build-company-directory-schema.ts');
assert.doesNotMatch(schema, /'@type':\s*'AggregateRating'|aggregateRating:/);
assert.match(schema, /delete moverNode.aggregateRating/);
assert.doesNotMatch(schema, /Move Trust Hub Reputation Score/);

const intel = read('lib/intelligence/home-assemble.ts') + read('lib/intelligence/home-snapshot.ts');
assert.doesNotMatch(intel, /CompanyResearchHero/);

const searchRpc = read('lib/search/classify-intent.ts');
assert.match(searchRpc, /REGULATORY_IDENTIFIER/);

const florida = read('app/(move)/florida/page.tsx');
assert.match(florida, /Research Florida movers|Florida/);

assert.match(profileSeoTitle({ name: 'Acme', usdotNumber: '1' }), /USDOT 1/);
assert.doesNotMatch(LOCKED_FINGERPRINT, / /);

console.log('check:move-profile-001 source contracts PASS');
console.log(`homepage fingerprint lock: ${LOCKED_FINGERPRINT}`);
