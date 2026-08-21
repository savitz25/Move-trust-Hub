/**
 * SHARE-002 metadata contract — Move Trust Hub.
 * Run: node scripts/assert-share-002.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(root, rel), 'utf8');

const failures = [];
function assert(cond, msg) {
  if (!cond) failures.push(msg);
}

const shareHub = read('lib/seo/share-hub.ts');
const metadata = read('lib/seo/site-metadata.ts');
const moveMeta = read('lib/seo/move-metadata.ts');
const og = read('app/opengraph-image.tsx');
const calculator = read('app/(move)/moving-calculator/layout.tsx');
const company = read('app/(move)/companies/[slug]/page.tsx');
const layout = read('app/layout.tsx');

assert(shareHub.includes("id: 'move'"), 'SHARE_HUB.id is move');
assert(shareHub.includes("host: 'www.movetrusthub.com'"), 'SHARE_HUB.host');
assert(shareHub.includes("origin: 'https://www.movetrusthub.com'"), 'SHARE_HUB.origin');
assert(shareHub.includes("ogImagePath: '/opengraph-image'"), 'OG path is ImageResponse');
assert(shareHub.includes('ogWidth: 1200') && shareHub.includes('ogHeight: 630'), '1200×630');
assert(shareHub.includes("twitterCard: 'summary_large_image'"), 'twitter large');
assert(shareHub.includes('lendertrusthub.com'), 'foreign list includes Lender');
assert(shareHub.includes('insurancetrusthub.com'), 'foreign list includes Insurance');

assert(metadata.includes("from '@/lib/seo/share-hub'"), 'site-metadata imports SHARE_HUB');
assert(metadata.includes('resolveShareOrigin'), 'origin pinned');
assert(metadata.includes('SHARE_HUB.twitterCard'), 'twitter card from SHARE_HUB');
assert(metadata.includes("export function getOgImageForHub"), 'getter exists');
assert(!metadata.includes("if (hub === 'lender') return LENDER_OG_IMAGE"), 'getter no longer returns Lender OG');
assert(!metadata.includes("if (hub === 'insurance') return INSURANCE_OG_IMAGE"), 'getter no longer returns Insurance OG');
assert(!metadata.includes("url: '/lender/opengraph-image'"), 'no lender OG path');
assert(!metadata.includes("url: '/insurance/opengraph-image'"), 'no insurance OG path');
assert(!metadata.includes('localhost'), 'no localhost in site-metadata');
assert(!metadata.includes('127.0.0.1'), 'no 127.0.0.1');
assert(!metadata.includes('.vercel.app'), 'no vercel.app');
assert(!metadata.includes('lendertrusthub.com'), 'site-metadata does not emit lendertrusthub.com');
assert(!metadata.includes('insurancetrusthub.com'), 'site-metadata does not emit insurancetrusthub.com');
assert(!metadata.includes('Lender Trust Hub'), 'site-metadata does not emit Lender brand');
assert(!metadata.includes('Insurance Trust Hub') && !metadata.includes('InsuranceTrustHub'), 'site-metadata does not emit Insurance brand');

assert(moveMeta.includes("hub: 'move'"), 'move page metadata uses hub move');
assert(!moveMeta.includes("hub: 'lender'"), 'move-metadata is not Lender');
assert(!moveMeta.includes("hub: 'insurance'"), 'move-metadata is not Insurance');

assert(og.includes('#FF5A1F'), 'OG card uses Move orange');
assert(og.includes('ASK TRUST HUB NETWORK'), 'OG card has network signature');
assert(og.includes('movetrusthub.com'), 'OG card has Move domain');
assert(!og.includes('lendertrusthub.com'), 'OG card is not Lender');
assert(!og.includes('insurancetrusthub.com'), 'OG card is not Insurance');
assert(!og.includes('Lender Trust Hub'), 'OG card copy is not Lender');
assert(!og.includes('Insurance Trust Hub'), 'OG card copy is not Insurance');

assert(calculator.includes('buildMovePageMetadata'), 'calculator uses Move page metadata');
assert(company.includes('buildMovePageMetadata'), 'company profile uses Move page metadata');
assert(layout.includes('rootLayoutMetadata'), 'root layout uses site-metadata');

assert(!existsSync(join(root, 'app/lender/opengraph-image.tsx')), 'lender OG route file removed');
assert(!existsSync(join(root, 'app/insurance/opengraph-image.tsx')), 'insurance OG route file removed');

if (failures.length) {
  console.error('SHARE-002 Move assertions failed:');
  for (const f of failures) console.error(' -', f);
  process.exit(1);
}
console.log('SHARE-002 Move assertions passed (host, Move-only OG, no Lender/Insurance leak, 1200×630 ImageResponse).');
