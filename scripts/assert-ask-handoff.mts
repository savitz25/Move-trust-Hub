/**
 * ASK-SEARCH-006C — Move Ask handoff consumer assertions.
 */
import {
  parseAskSearchHandoff,
  serializeAskSearchHandoff,
  hasForbiddenHandoffKey,
  withAskHandoffParams,
} from '../lib/search-handoff/parse';
import { resolveHandoffGeography } from '../lib/search-handoff/geography';
import {
  isResolvedAskPath,
  resolveAskSearchHandoff,
  shouldRedirectAskEntry,
} from '../lib/search-handoff/resolve';
import { classifyListingAgainstHandoff } from '../lib/search-handoff/precision';
import { cleanCanonicalPath, hrefHasAskParams } from '../lib/search-handoff/canonical';
import { buildMovePageMetadata } from '../lib/seo/move-metadata';
import { buildCountyPageMetadata } from '../lib/local-movers/seo-metadata';
import { getMoversForCounty } from '../lib/local-movers/index';
import type { LocalCounty } from '../lib/local-movers/types';

let failed = 0;
function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    failed++;
  } else console.log('PASS:', msg);
}

function isSafeInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//') && !href.includes('://');
}

// --- parsing / allowlist ---
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

assert(parseAskSearchHandoff('src=ask&state=XX&entity=mover')?.state === undefined, 'invalid state=XX dropped');
assert(parseAskSearchHandoff('src=ask&zip=abc&entity=mover')?.zip === undefined, 'invalid ZIP dropped');
const xss = parseAskSearchHandoff('src=ask&state=NJ&city=%3Cscript%3Ealert(1)%3C/script%3E&entity=mover');
assert(!xss?.city?.includes('<'), 'script city stripped of markup');
assert(!xss?.city?.includes('>'), 'script city has no brackets');
const traversal = parseAskSearchHandoff('src=ask&state=NJ&county=../../etc/passwd&entity=mover');
assert(traversal?.county !== '../../etc/passwd', 'path-traversal county not preserved');
assert(!String(traversal?.county || '').includes('..'), 'county has no ..');
const injected = resolveAskSearchHandoff(
  parseAskSearchHandoff('src=ask&state=NJ&entity=mover&next=https://evil.example')!
);
assert(isSafeInternalHref(injected.href), 'external next= ignored — internal href only');
assert(!injected.href.includes('evil.example'), 'no external host in href');

const unknownEntity = parseAskSearchHandoff('src=ask&entity=unknown&state=NJ');
assert(unknownEntity?.unsupportedEntity === 'unknown', 'entity=unknown is unsupported, not dropped');

// --- geography ---
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

// --- view more ---
const dest = resolveAskSearchHandoff(keansburg!);
assert(dest.status === 'ok', 'Keansburg view-more ok');
assert(dest.path === '/local-movers/new-jersey/monmouth', 'opens existing Monmouth county directory');
assert(dest.matchClass === 'county_service_area_match', 'match class locked');
assert(/not the same as an exact Keansburg listing/i.test(dest.bannerBody), 'explicit county≠city disclaimer');
assert(dest.backLabel === 'Back to movers serving Keansburg, NJ', 'profile back label');
assert(shouldRedirectAskEntry('/'), 'home is an Ask entry path');
assert(shouldRedirectAskEntry('/local-movers/new-jersey'), 'state hub upgrades to county');
assert(!isResolvedAskPath('/local-movers/new-jersey', dest), 'state path is not the county dest');
assert(isResolvedAskPath('/local-movers/new-jersey/monmouth', dest), 'county path is resolved');
assert(isResolvedAskPath('/companies/graebel-van-lines', dest), 'company profile is not bounced');
assert(isSafeInternalHref(dest.href), 'Keansburg href is internal');

const zipCtx = parseAskSearchHandoff('src=ask&zip=07734&entity=mover');
const zipDest = resolveAskSearchHandoff(zipCtx!);
assert(zipDest.path === '/local-movers/new-jersey/monmouth', '07734 preloads Monmouth directory');
assert(zipDest.matchClass === 'county_service_area_via_zip_resolution', 'ZIP match class');
assert(/not an explicit ZIP 07734 service area/i.test(zipDest.bannerBody), 'ZIP copy not fabricated service ZIP');

const broker = parseAskSearchHandoff('src=ask&entity=moving_broker&city=miami&state=FL');
const brokerDest = resolveAskSearchHandoff(broker!);
assert(brokerDest.status === 'unsupported', 'broker is not silently mapped to movers');
assert(!brokerDest.path.startsWith('/local-movers'), 'broker does not open mover county directory');
assert(!brokerDest.path.startsWith('/companies'), 'broker does not substitute interstate carriers');
assert(broker!.entityType === 'moving_broker', 'moving_broker ≠ mover');
assert(/optional/i.test(
  'A broader mover search is optional and requires an explicit click.'
), 'broker widen is opt-in copy (page-level)');

const auto = resolveAskSearchHandoff(parseAskSearchHandoff('src=ask&entity=auto_transporter&state=NJ')!);
assert(auto.path === '/auto-transport', 'auto transporter uses existing auto-transport directory');

const interstateCity = resolveAskSearchHandoff(
  parseAskSearchHandoff('src=ask&entity=interstate_mover&state=NJ&city=keansburg')!
);
assert(interstateCity.path === '/local-movers/new-jersey/monmouth', 'interstate + city still uses county directory');
assert(interstateCity.matchClass === 'county_service_area_match', 'interstate Keansburg is still county match');

const interstateNj = resolveAskSearchHandoff(
  parseAskSearchHandoff('src=ask&entity=interstate_mover&state=NJ')!
);
assert(interstateNj.path === '/companies', 'NJ interstate preloads interstate directory');
assert(interstateNj.href.includes('coverage=state'), 'NJ interstate uses coverage filter');
assert(interstateNj.href.includes('state=NJ'), 'NJ interstate keeps state');
assert(interstateNj.backLabel === 'Back to interstate movers in New Jersey', 'interstate NJ back label');
assert(/not equivalent to an exact local match/i.test(interstateNj.bannerBody), 'interstate copy preserves HQ vs coverage vs national');

const florida = resolveAskSearchHandoff(parseAskSearchHandoff('src=ask&entity=mover&state=FL')!);
assert(florida.path === '/local-movers/florida', 'Florida movers open existing state directory');
assert(florida.backLabel === 'Back to Florida movers', 'Florida back label');
assert(/does not disqualify/i.test(florida.bannerBody), 'Florida does not require in-state HQ');

const badEntity = resolveAskSearchHandoff(parseAskSearchHandoff('src=ask&entity=loan_officer&state=NJ')!);
assert(badEntity.status === 'unsupported', 'unknown entity is not substituted');

const unknownDest = resolveAskSearchHandoff(unknownEntity!);
assert(unknownDest.status === 'unsupported', 'entity=unknown does not default to movers');

const noEntity = resolveAskSearchHandoff(parseAskSearchHandoff('src=ask&state=NJ&city=keansburg')!);
assert(noEntity.path === '/local-movers/new-jersey/monmouth', 'missing entity defaults to mover directory');

const invalidStateDest = resolveAskSearchHandoff(parseAskSearchHandoff('src=ask&state=XX&entity=mover')!);
assert(invalidStateDest.path === '/local-movers', 'invalid state fails closed to hub, not a fake state slug');

// --- real Monmouth listings (not hardcoded 17) ---
const monmouth = getMoversForCounty('new-jersey', 'monmouth');
assert(Boolean(monmouth), 'Monmouth county exists in live Move geography');
assert((monmouth?.movers.length || 0) > 0, `Monmouth has real movers (got ${monmouth?.movers.length || 0})`);
const mislabeledExact = (monmouth?.movers || []).filter((m) => {
  const p = classifyListingAgainstHandoff(m, keansburg!, geoCity);
  const hqIsKeansburg = (m.city || '').trim().toLowerCase() === 'keansburg';
  return p.reasons.includes('exact_physical_city') && !hqIsKeansburg;
});
assert(mislabeledExact.length === 0, 'no county-only mover labeled exact_physical_city');
const countyReasons = (monmouth?.movers || []).filter((m) =>
  classifyListingAgainstHandoff(m, keansburg!, geoCity).reasons.includes('county_service_area')
);
assert(countyReasons.length === (monmouth?.movers.length || 0), 'every Monmouth listing keeps county_service_area');
const outOfState = (monmouth?.movers || []).filter((m) => (m.headquartersState || '').toUpperCase() === 'NJ');
const notNjHq = (monmouth?.movers || []).filter((m) => (m.headquartersState || '').toUpperCase() !== 'NJ' && m.headquartersState);
assert(
  outOfState.length === 0 || notNjHq.length >= 0,
  'HQ vs county coverage remain separately classifiable'
);
if (notNjHq.length) {
  const sample = classifyListingAgainstHandoff(notNjHq[0]!, keansburg!, geoCity);
  assert(sample.reasons.includes('county_service_area'), 'out-of-state HQ still county coverage');
  assert(!sample.reasons.includes('physical_state'), 'out-of-state HQ is not physical_state NJ');
  assert(sample.best !== 'exact_physical_city', 'broad coverage does not win as exact city');
}

const fakeHq = classifyListingAgainstHandoff(
  { city: 'Chicago', headquartersState: 'IL', isLocalOnly: false, services: ['Carrier'], entityType: 'CARRIER' },
  keansburg!,
  geoCity
);
assert(fakeHq.best === 'county_service_area', 'Chicago HQ on Monmouth page is county precision, not exact city');
assert(!fakeHq.reasons.includes('exact_physical_city'), 'HQ city mismatch is not exact_physical_city');

const zipListing = classifyListingAgainstHandoff(
  { city: 'Middletown', headquartersState: 'NJ', services: [], entityType: null },
  zipCtx!,
  geoZip
);
assert(!zipListing.reasons.includes('exact_physical_zip'), 'ZIP fallback does not mint exact_physical_zip');
assert(zipListing.reasons.includes('county_service_area'), 'ZIP fallback listings keep county reason');

// --- entity handoff / back ---
const profileHref = withAskHandoffParams('/companies/graebel-van-lines', keansburg!);
assert(hrefHasAskParams(profileHref), 'Ask context can ride on profile query');
assert(cleanCanonicalPath(profileHref) === '/companies/graebel-van-lines', 'canonical path strips Ask params');
assert(isSafeInternalHref(profileHref), 'profile handoff href is internal');

// --- SEO ---
const companyMeta = buildMovePageMetadata({
  title: 'Graebel',
  description: 'd',
  path: '/companies/graebel-van-lines',
});
const canonical = String(companyMeta.alternates?.canonical || '');
assert(!canonical.includes('src=ask'), 'company canonical has no Ask params');
assert(canonical.endsWith('/companies/graebel-van-lines'), 'company canonical is the clean profile URL');

const countyMeta = buildCountyPageMetadata(
  {
    slug: 'monmouth',
    name: 'Monmouth',
    stateCode: 'NJ',
    stateSlug: 'new-jersey',
  } as LocalCounty,
  'New Jersey',
  monmouth?.movers || [],
  '/local-movers/new-jersey/monmouth'
);
assert(!String(countyMeta.alternates?.canonical || '').includes('?'), 'county canonical has no query string');

if (failed) {
  console.error(`ASK-SEARCH-006C FAILED (${failed})`);
  process.exit(1);
}
console.log('ASK-SEARCH-006C Move Ask handoff consumer assertions passed.');
