/**
 * ASK-SEARCH-006C — Move Ask handoff consumer assertions.
 */
import {
  parseAskSearchHandoff,
  serializeAskSearchHandoff,
  hasForbiddenHandoffKey,
} from '../lib/search-handoff/parse';
import { resolveHandoffGeography } from '../lib/search-handoff/geography';
import {
  isResolvedAskPath,
  resolveAskSearchHandoff,
  shouldRedirectAskEntry,
} from '../lib/search-handoff/resolve';

let failed = 0;
function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    failed++;
  } else console.log('PASS:', msg);
}

const keansburg = parseAskSearchHandoff(
  'src=ask&journey=directory&state=NJ&county=monmouth&city=keansburg&entity=mover'
);
assert(keansburg?.source === 'ask', 'parses src=ask');
assert(keansburg?.state === 'NJ', 'state NJ');
assert(keansburg?.county === 'monmouth', 'county slug');
assert(keansburg?.city === 'Keansburg', 'city display');
assert(keansburg?.entityType === 'mover', 'entity mover');
assert(!('query' in (keansburg || {})), 'no query field on context');

const withJunk = parseAskSearchHandoff(
  'src=ask&state=NJ&city=keansburg&entity=mover&query=movers+in+keansburg&email=a@b.c&phone=555&name=Jane'
);
assert(withJunk?.city === 'Keansburg', 'still parses allowlisted fields');
assert(!(withJunk as { query?: string } | null)?.query, 'drops query');
assert(
  hasForbiddenHandoffKey(new URLSearchParams('query=x&email=a@b.c')),
  'detects forbidden keys without consuming them'
);
const serialized = serializeAskSearchHandoff(withJunk!);
assert(!serialized.includes('query='), 'serialize omits query');
assert(!serialized.includes('email='), 'serialize omits email');
assert(serialized.includes('src=ask'), 'serialize keeps src=ask');

assert(parseAskSearchHandoff('state=NJ&city=keansburg') === null, 'missing src is not a handoff');
assert(parseAskSearchHandoff('src=google&state=NJ') === null, 'non-ask src ignored');

const geoCity = resolveHandoffGeography({ state: 'NJ', city: 'Keansburg' });
assert(geoCity?.countySlug === 'monmouth', 'Keansburg → Monmouth County');
assert(geoCity?.matchClass === 'county_service_area_match', 'city query classified as county_service_area_match');
assert(geoCity?.cityCoveredByCountyOnly === true, 'not exact city coverage');

const geoZip = resolveHandoffGeography({ zip: '07734' });
assert(geoZip?.countySlug === 'monmouth', '07734 → Monmouth');
assert(geoZip?.matchClass === 'county_service_area_via_zip_resolution', 'ZIP fallback class');
assert(geoZip?.matchClass !== 'explicit_service_zip', 'does not fabricate explicit service ZIP');

const unknownCity = resolveHandoffGeography({ state: 'NJ', city: 'NotARealTownXYZ' });
assert(unknownCity?.countySlug === undefined, 'unknown city does not invent a county');

const dest = resolveAskSearchHandoff(keansburg!);
assert(dest.status === 'ok', 'Keansburg view-more ok');
assert(dest.path === '/local-movers/new-jersey/monmouth', 'opens existing Monmouth county directory');
assert(dest.matchClass === 'county_service_area_match', 'match class locked');
assert(!/exact city listing/i.test(dest.bannerBody) || /not the same as an exact/i.test(dest.bannerBody), 'copy does not claim exact Keansburg listing');
assert(/not the same as an exact Keansburg listing/i.test(dest.bannerBody), 'explicit county≠city disclaimer');
assert(dest.backLabel === 'Back to movers serving Keansburg, NJ', 'profile back label');
assert(shouldRedirectAskEntry('/'), 'home is an Ask entry path');
assert(shouldRedirectAskEntry('/local-movers/new-jersey'), 'state hub upgrades to county');
assert(!isResolvedAskPath('/local-movers/new-jersey', dest), 'state path is not the county dest');
assert(isResolvedAskPath('/local-movers/new-jersey/monmouth', dest), 'county path is resolved');
assert(isResolvedAskPath('/companies/graebel-van-lines', dest), 'company profile is not bounced');

const zipCtx = parseAskSearchHandoff('src=ask&zip=07734&entity=mover');
const zipDest = resolveAskSearchHandoff(zipCtx!);
assert(zipDest.path === '/local-movers/new-jersey/monmouth', '07734 preloads Monmouth directory');
assert(zipDest.matchClass === 'county_service_area_via_zip_resolution', 'ZIP match class');
assert(/not an explicit ZIP 07734 service area/i.test(zipDest.bannerBody), 'ZIP copy not fabricated service ZIP');

const broker = parseAskSearchHandoff('src=ask&entity=moving_broker&city=miami&state=FL');
const brokerDest = resolveAskSearchHandoff(broker!);
assert(brokerDest.status === 'unsupported', 'broker is not silently mapped to movers');
assert(!brokerDest.path.startsWith('/local-movers'), 'broker does not open mover county directory');
assert(broker!.entityType === 'moving_broker', 'moving_broker ≠ mover');

const auto = resolveAskSearchHandoff(parseAskSearchHandoff('src=ask&entity=auto_transporter&state=NJ')!);
assert(auto.path === '/auto-transport', 'auto transporter uses existing auto-transport directory');

const interstate = resolveAskSearchHandoff(
  parseAskSearchHandoff('src=ask&entity=interstate_mover&state=NJ&city=keansburg')!
);
assert(interstate.path === '/local-movers/new-jersey/monmouth', 'interstate still uses county directory');
assert(interstate.matchClass === 'county_service_area_match', 'interstate Keansburg is still county match');

const badEntity = resolveAskSearchHandoff(parseAskSearchHandoff('src=ask&entity=loan_officer&state=NJ')!);
assert(badEntity.status === 'unsupported', 'unknown entity is not substituted');

const noEntity = resolveAskSearchHandoff(parseAskSearchHandoff('src=ask&state=NJ&city=keansburg')!);
assert(noEntity.path === '/local-movers/new-jersey/monmouth', 'missing entity defaults to mover directory');

if (failed) {
  console.error(`ASK-SEARCH-006C FAILED (${failed})`);
  process.exit(1);
}
console.log('ASK-SEARCH-006C Move Ask handoff consumer assertions passed.');
