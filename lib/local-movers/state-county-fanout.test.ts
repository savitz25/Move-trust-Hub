import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import type { CountyMoversResult } from '@/lib/local-movers/get-movers-for-county-async';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { PREMIUM_INDEX_CAP } from '@/lib/local-movers/premium-index-cap';
import {
  retainValidatedSnapshotMovers,
  settleStateCountyLoads,
  type CompleteStateSnapshot,
  type FreshCountyLoad,
} from '@/lib/local-movers/state-county-fanout';
import { localStates } from '@/lib/local-movers/states';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const REVIEWED_LOCAL_SITEMAP_URLS = 215;

const TEXAS_14 = [
  'bexar',
  'brazoria',
  'collin',
  'dallas',
  'denton',
  'el-paso',
  'fort-bend',
  'harris',
  'hidalgo',
  'montgomery',
  'nueces',
  'tarrant',
  'travis',
  'williamson',
] as const;

function countyBySlug(stateSlug: string, countySlug: string): LocalCounty {
  const county = getCountiesForState(stateSlug).find((item) => item.slug === countySlug);
  assert.ok(county, `${stateSlug}/${countySlug}`);
  return county!;
}

function pickCounties(
  stateSlug: string,
  count: number,
  include: readonly string[],
  exclude: readonly string[] = []
): LocalCounty[] {
  const available = getCountiesForState(stateSlug);
  const chosen: LocalCounty[] = include.map((slug) => countyBySlug(stateSlug, slug));
  for (const county of available) {
    if (chosen.length >= count) break;
    if (exclude.includes(county.slug) || chosen.some((item) => item.slug === county.slug)) continue;
    chosen.push(county);
  }
  assert.equal(chosen.length, count, stateSlug);
  return chosen;
}

function qualifyingMover(county: LocalCounty): LocalMover {
  return {
    id: `directory-${county.stateSlug}-${county.slug}`,
    name: `${county.name} Local`,
    profileSlug: `co-${county.stateSlug}-${county.slug}`,
    listingSource: 'directory',
    profilePublished: true,
    rating: 4.8,
    reviewCount: 12,
    shortDescription: '',
    services: ['Local Mover'],
    city: county.seat || county.name,
    headquartersState: county.stateCode,
    isLocalOnly: true,
  };
}

function loaded(county: LocalCounty, mover: LocalMover = qualifyingMover(county)): CountyMoversResult {
  return {
    county,
    movers: [mover],
    isRegionalFallback: false,
    sourceMode: 'db',
    approvedCount: 1,
    catalogCount: 0,
    loadStatus: 'ok',
  };
}

function freshFrom(
  counties: readonly LocalCounty[],
  failed: readonly string[] = []
): FreshCountyLoad[] {
  return counties.map((county) => {
    if (failed.includes(county.slug)) {
      return {
        county,
        result: { ...loaded(county), movers: [], loadStatus: 'failed', loadFailure: 'timeout' },
        loadStatus: 'failed' as const,
        failureReason: 'timeout' as const,
      };
    }
    return { county, result: loaded(county), loadStatus: 'ok' as const };
  });
}

function snapshotFrom(stateSlug: string, counties: readonly LocalCounty[]): CompleteStateSnapshot {
  return {
    stateSlug,
    complete: true,
    storedAt: '2026-11-12T00:00:00.000Z',
    entries: counties.map((county) => ({ countySlug: county.slug, result: loaded(county) })),
  };
}

function publishedSlugs(counties: readonly LocalCounty[], omit: readonly string[] = []) {
  return new Set(
    counties
      .map((county) => `co-${county.stateSlug}-${county.slug}`)
      .filter((slug) => !omit.includes(slug))
  );
}

function indexableSlugs(rows: FreshCountyLoad[], snapshot: CompleteStateSnapshot | null, omit: string[] = []) {
  const publication = snapshot
    ? { status: 'ok' as const, publishedSlugs: publishedSlugs(rows.map((row) => row.county), omit) }
    : null;
  const settled = settleStateCountyLoads({ fresh: rows, snapshot, publication });
  const slugs = settled.settled.flatMap((row) => {
    if (row.loadStatus === 'failed' || !row.result) return [];
    const decision = evaluateCountyIndexabilityFromResult(row.county.stateSlug, row.county.slug, row.result);
    return decision.tier === 'index' ? [row.county.slug] : [];
  });
  return { settled, slugs };
}

function indexes(county: LocalCounty) {
  return (
    evaluateCountyIndexabilityFromResult(county.stateSlug, county.slug, loaded(county)).tier === 'index'
  );
}

function reviewedCounties() {
  const texas = pickCounties('texas', 14, TEXAS_14).filter(indexes);
  const florida = pickCounties('florida', 44, ['duval']).filter(indexes);
  const newJersey = pickCounties('new-jersey', 18, [], ['salem']).filter(indexes);
  const virginia = pickCounties('virginia', 2, ['richmond', 'roanoke']).filter(indexes);
  assert.equal(texas.length, 14);
  assert.equal(florida.length, 44);
  assert.equal(newJersey.length, 18);
  assert.equal(virginia.length, 2);
  const reserved = new Set(['texas', 'florida', 'new-jersey', 'virginia']);
  const extra: LocalCounty[] = [];
  const needed =
    REVIEWED_LOCAL_SITEMAP_URLS -
    localStates.length -
    texas.length -
    florida.length -
    newJersey.length -
    virginia.length;
  for (const state of localStates) {
    if (reserved.has(state.slug)) continue;
    for (const county of getCountiesForState(state.slug)) {
      if (extra.length >= needed) break;
      if (!indexes(county)) continue;
      extra.push(county);
    }
    if (extra.length >= needed) break;
  }
  assert.equal(extra.length, needed);
  return { texas, florida, newJersey, virginia, extra };
}

function localSitemapUrls(counties: readonly LocalCounty[]) {
  return [
    ...localStates.map((state) => `/local-movers/${state.slug}`),
    ...counties.map((county) => `/local-movers/${county.stateSlug}/${county.slug}`),
  ];
}

test('one qualifying mover still indexes and the Premium cap stays 400', () => {
  const harris = countyBySlug('texas', 'harris');
  const decision = evaluateCountyIndexabilityFromResult('texas', 'harris', loaded(harris));
  assert.equal(decision.tier, 'index');
  assert.notEqual(decision.reason, 'insufficient_local_or_licensed_movers');
  assert.notEqual(decision.reason, 'no_qualifying_publishable_movers');
  assert.equal(PREMIUM_INDEX_CAP, 400);
  const source = readFileSync('lib/local-movers/county-indexability-async.ts', 'utf8');
  assert.match(source, /capCountyIndexDecision\(/);
  assert.match(source, /mapWithConcurrency/);
  assert.match(source, /unstable_noStore/);
  const loader = readFileSync('lib/local-movers/approved-county-movers.ts', 'utf8');
  assert.equal(loader.includes('usdot_status,'), false);
  assert.match(loader, /no usdot_status column/);
  assert.match(loader, /throw new Error\(`approved_movers_assignments:/);
  assert.doesNotMatch(loader, /return \{\};/);
  const canary = readFileSync('lib/local-movers/canary-county-movers.ts', 'utf8');
  assert.match(canary, /throw new Error\(`canary_county_/);
});

test('reviewed local sitemap keeps Texas, Florida, New Jersey, and Virginia', () => {
  const reviewed = reviewedCounties();
  const counties = [
    ...reviewed.texas,
    ...reviewed.florida,
    ...reviewed.newJersey,
    ...reviewed.virginia,
    ...reviewed.extra,
  ];
  const urls = localSitemapUrls(counties);
  assert.equal(new Set(urls).size, REVIEWED_LOCAL_SITEMAP_URLS);
  assert.equal(reviewed.texas.length, 14);
  assert.ok(reviewed.texas.some((county) => county.slug === 'dallas'));
  assert.ok(reviewed.texas.some((county) => county.slug === 'travis'));
  assert.equal(reviewed.florida.length, 44);
  assert.ok(reviewed.florida.some((county) => county.slug === 'duval'));
  assert.equal(reviewed.newJersey.length, 18);
  assert.equal(reviewed.newJersey.some((county) => county.slug === 'salem'), false);
  assert.ok(reviewed.virginia.some((county) => county.slug === 'richmond'));
  assert.ok(reviewed.virginia.some((county) => county.slug === 'roanoke'));

  for (const county of counties) {
    const decision = evaluateCountyIndexabilityFromResult(county.stateSlug, county.slug, loaded(county));
    assert.equal(decision.tier, 'index', `${county.stateSlug}/${county.slug} ${decision.reason}`);
  }
});

test('a partial Texas load is not cached and a validated snapshot restores Dallas and Travis', () => {
  const reviewed = reviewedCounties();
  const texas = reviewed.texas;
  const other = [...reviewed.florida, ...reviewed.newJersey, ...reviewed.virginia, ...reviewed.extra];
  const store = new Map<string, CompleteStateSnapshot>();
  const complete = freshFrom(texas);
  const first = settleStateCountyLoads({ fresh: complete, snapshot: null, publication: null });
  assert.equal(first.cacheable, true);
  assert.equal(first.usedFallback, false);
  if (first.cacheable) store.set('texas', snapshotFrom('texas', texas));

  const partial = freshFrom(texas, ['dallas', 'travis']);
  const missed = indexableSlugs(partial, null);
  assert.equal(missed.settled.cacheable, false);
  assert.equal(missed.slugs.includes('dallas'), false);
  assert.equal(missed.slugs.includes('travis'), false);
  const missedUrls = localSitemapUrls([
    ...other,
    ...texas.filter((county) => missed.slugs.includes(county.slug)),
  ]);
  assert.equal(missedUrls.length, REVIEWED_LOCAL_SITEMAP_URLS - 2);
  assert.equal(store.get('texas')?.entries.length, 14);

  const restored = indexableSlugs(partial, store.get('texas') ?? null);
  assert.equal(restored.settled.cacheable, false);
  assert.equal(restored.settled.usedFallback, true);
  assert.deepEqual(restored.slugs.sort(), TEXAS_14.slice().sort());
  const urls = localSitemapUrls([
    ...other,
    ...texas.filter((county) => restored.slugs.includes(county.slug)),
  ]);
  assert.equal(urls.length, REVIEWED_LOCAL_SITEMAP_URLS);
  assert.equal(store.get('texas')?.entries.length, 14);

  const withoutDallas = indexableSlugs(partial, store.get('texas') ?? null, ['co-texas-dallas']);
  assert.equal(withoutDallas.slugs.includes('dallas'), false);
  assert.ok(withoutDallas.slugs.includes('travis'));
  const dallas = restored.settled.settled.find((row) => row.county.slug === 'dallas');
  assert.equal(dallas?.result?.movers.some((mover) => mover.profileSlug === 'co-texas-harris'), false);
  assert.deepEqual(
    retainValidatedSnapshotMovers(dallas?.result?.movers ?? [], new Set()),
    []
  );
});

test('an unpublished snapshot company is not restored onto the county', () => {
  const dallas = countyBySlug('texas', 'dallas');
  const hidden: LocalMover = {
    ...qualifyingMover(dallas),
    profileSlug: 'hidden-dallas-mover',
  };
  const snapshot: CompleteStateSnapshot = {
    stateSlug: 'texas',
    complete: true,
    storedAt: '2026-11-12T00:00:00.000Z',
    entries: [{ countySlug: 'dallas', result: loaded(dallas, hidden) }],
  };
  const settled = settleStateCountyLoads({
    fresh: freshFrom([dallas], ['dallas']),
    snapshot,
    publication: { status: 'ok', publishedSlugs: new Set() },
  });
  const row = settled.settled[0]!;
  assert.equal(row.loadStatus, 'fallback');
  assert.deepEqual(row.result?.movers, []);
  const decision = evaluateCountyIndexabilityFromResult('texas', 'dallas', row.result);
  assert.equal(decision.tier, 'noindex');
  assert.equal(decision.reason, 'no_qualifying_publishable_movers');
});

test('a failed publication recheck does not reuse the snapshot', () => {
  const dallas = countyBySlug('texas', 'dallas');
  const settled = settleStateCountyLoads({
    fresh: freshFrom([dallas], ['dallas']),
    snapshot: snapshotFrom('texas', [dallas]),
    publication: { status: 'failed' },
  });
  assert.equal(settled.settled[0]?.loadStatus, 'failed');
  assert.equal(settled.usedFallback, false);
  assert.equal(settled.cacheable, false);
});
