/**
 * SHARE-003 Move contextual share-card contract.
 * Run: npx tsx scripts/assert-share-003.ts
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  moveCountyShareModel,
  moveEntityShareModel,
  moveFallbackShareModel,
  moveStateShareModel,
  moverProfileLabel,
  truncateShareText,
} from '../lib/seo/share-card-model';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

const failures: string[] = [];
function assert(cond: unknown, msg: string) {
  if (!cond) failures.push(msg);
}

assert(truncateShareText('Allied Van Lines', 48) === 'Allied Van Lines', 'short names are unchanged');
assert(
  truncateShareText(
    'American International Relocation Services of the Greater Miami Metropolitan Area LLC',
    48,
  ).endsWith('…'),
  'long names truncate',
);
assert(truncateShareText('José’s Movers & Co', 48).includes('José'), 'unicode names survive');
assert(truncateShareText('A & B Moving', 48).includes('&'), 'ampersands survive');

const entity = moveEntityShareModel({
  name: 'Allied Van Lines',
  headquarters: 'Miami, Florida',
  usdotLabel: 'USDOT 076235',
  profileLabel: 'Interstate mover profile',
});
assert(entity.kind === 'entity', 'entity kind');
assert(entity.title === 'Allied Van Lines', 'entity title is company name');
assert(entity.subtitle === 'Miami, Florida', 'entity location');
assert(entity.fact?.includes('USDOT 076235'), 'entity includes public USDOT');
assert(!/no complaints|fully verified|safe mover|approved|trusted/i.test(JSON.stringify(entity)), 'no endorsement claims');

const missingLocation = moveEntityShareModel({ name: 'Acme Movers' });
assert(!missingLocation.subtitle, 'missing location is omitted');
assert(missingLocation.fact === 'Company profile', 'missing USDOT uses research label');

const county = moveCountyShareModel({
  countyLabel: 'Palm Beach County',
  stateName: 'Florida',
});
assert(county.kind === 'content', 'county is content');
assert(county.title.includes('Palm Beach County'), 'county name in title');
assert(county.eyebrow.includes('FLORIDA'), 'state in eyebrow');

const state = moveStateShareModel({ stateName: 'Florida' });
assert(state.title.includes('Florida'), 'state name in title');

assert(moverProfileLabel({ serviceScope: 'interstate' }) === 'Interstate mover profile', 'interstate label');
assert(moveFallbackShareModel().kind === 'fallback', 'fallback model');

const files = [
  'app/(move)/companies/[slug]/share-og/route.tsx',
  'app/(move)/(marketing)/local-movers/[stateSlug]/share-og/route.tsx',
  'app/(move)/(marketing)/local-movers/[stateSlug]/[countySlug]/share-og/route.tsx',
];
for (const rel of files) {
  assert(existsSync(join(root, rel)), `${rel} exists`);
  const src = read(rel);
  assert(src.includes('renderMoveFallbackImage'), `${rel} falls back to SHARE-002`);
  assert(!src.includes('localhost'), `${rel} has no localhost`);
  assert(!src.includes('lendertrusthub.com'), `${rel} is not Lender`);
}

const companyPage = read('app/(move)/companies/[slug]/page.tsx');
assert(companyPage.includes('contextualImage: true'), 'company metadata uses contextual image');
assert(companyPage.includes('movetrusthub.com') || companyPage.includes("path: `/companies/"), 'company canonical stays on company path');

const companyOg = read('app/(move)/companies/[slug]/share-og/route.tsx');
assert(companyOg.includes('canShowLicenseNumbers'), 'USDOT only when publication-safe');
assert(!companyOg.includes('overallRating'), 'no review average on the card');
assert(!companyOg.includes('phone'), 'no phone on OG renderer');
assert(!companyOg.includes('email'), 'no email on OG renderer');

if (failures.length) {
  console.error('SHARE-003 Move assertions failed:');
  for (const item of failures) console.error(' -', item);
  process.exit(1);
}
console.log('SHARE-003 Move assertions passed (entity/content models, truncation, fallback, publication safety).');
