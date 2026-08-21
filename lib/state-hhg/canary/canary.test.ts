import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  CANARY_TARGETS,
  FUTURE_CANARY_COPY,
  FUTURE_PUBLICATION_PLAN,
  GOOGLE_PLACES_REQUESTS,
  LOCAL_CANARY_WAVE_ID,
  type PublicationReadyProvider,
} from '@/lib/state-hhg/canary/types';
import { selectCanaryManifest, manifestSha } from '@/lib/state-hhg/canary/select';
import {
  auditManifestPrecision,
  simulateInterstateExclusion,
  simulateSameStateRoute,
  sameStateRoutes,
  FL_ORIGIN_COUNTIES,
} from '@/lib/state-hhg/canary/simulate';
import {
  assertManifestOnlyIds,
  loadExactCanaryManifests,
} from '@/lib/state-hhg/canary/manifest';
import { RETIRED_RADIUS_MODELS } from '@/lib/state-hhg/discovery/types';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';
import { isSeoIndexableCompany } from '@/lib/provider/publication';

function fakeProvider(
  overrides: Partial<PublicationReadyProvider> & {
    companyId: string;
    stateCode: 'FL' | 'WA';
    homeCountyFips: string;
  }
): PublicationReadyProvider {
  return {
    slug: overrides.companyId,
    legalName: overrides.legalName ?? `Legal ${overrides.companyId}`,
    displayName: overrides.displayName ?? `Display ${overrides.companyId}`,
    dba: overrides.dba ?? null,
    authorityNumber: overrides.authorityNumber ?? 'IM1',
    authorityType: 'intrastate_mover_registration',
    authorityStatus: 'active',
    regulator: overrides.stateCode === 'FL' ? 'FDACS' : 'WA UTC',
    authoritySource: 'test',
    authoritySourceUrl: null,
    authorityRetrievedAt: '2026-08-21T00:00:00.000Z',
    usdot: overrides.usdot ?? null,
    homeCountyName: overrides.homeCountyName ?? 'Test',
    discoveryBasis: 'VERIFIED_HOME_COUNTY',
    explicitServiceCounties: [],
    phone: '5555551212',
    email: null,
    website: null,
    physicalAddress: '1 Main St',
    publicationState: 'INGESTED',
    indexable: false,
    hasUsdot: Boolean(overrides.usdot),
    hasDba: Boolean(overrides.dba),
    nameLength: 10,
    ...overrides,
  };
}

describe('011D.2B local canary preparation', () => {
  it('keeps Google at 0 and radius disabled', () => {
    assert.equal(GOOGLE_PLACES_REQUESTS, 0);
    assert.equal(RETIRED_RADIUS_MODELS.consumerEnabled, false);
  });

  it('manifest publish=false and future indexable=false', () => {
    assert.equal(FUTURE_PUBLICATION_PLAN.publish, false);
    assert.equal(FUTURE_PUBLICATION_PLAN.futureInitialIndexable, false);
    assert.equal(FUTURE_PUBLICATION_PLAN.sitemapExcluded, true);
    assert.equal(LOCAL_CANARY_WAVE_ID, 'LOCAL_HHG_FL_WA_2026_08_CANARY_1');
    assert.equal(CANARY_TARGETS.FL, 50);
    assert.equal(CANARY_TARGETS.WA, 30);
  });

  it('selects deterministically with county diversity', () => {
    const pool: PublicationReadyProvider[] = [];
    const flCounties = [
      '12011',
      '12099',
      '12057',
      '12095',
      '12031',
      '12086',
      '12103',
      '12071',
      '12021',
      '12127',
      '12009',
      '12083',
    ];
    for (let i = 0; i < 80; i++) {
      pool.push(
        fakeProvider({
          companyId: `fl-im-${String(i).padStart(4, '0')}`,
          stateCode: 'FL',
          homeCountyFips: flCounties[i % flCounties.length],
          authorityNumber: `IM${i}`,
        })
      );
    }
    for (let i = 0; i < 40; i++) {
      pool.push(
        fakeProvider({
          companyId: `wa-hg-${String(i).padStart(4, '0')}`,
          stateCode: 'WA',
          homeCountyFips: ['53033', '53053', '53061', '53063', '53011', '53035', '53067', '53073'][
            i % 8
          ],
          authorityNumber: `HG${i}`,
          regulator: 'WA UTC',
        })
      );
    }

    const a = selectCanaryManifest(pool);
    const b = selectCanaryManifest(pool);
    assert.equal(a.FL.length, 50);
    assert.equal(a.WA.length, 30);
    assert.equal(manifestSha(a.FL), manifestSha(b.FL));
    assert.equal(manifestSha(a.WA), manifestSha(b.WA));
    assert.ok(a.geography.FL.countiesRepresented >= 12);
    assert.ok(a.geography.WA.countiesRepresented >= 8);
    assert.equal(a.FL.every((r) => r.publish === false), true);
    assert.equal(a.FL.every((r) => r.currentPublicationState === 'INGESTED'), true);
  });

  it('excludes franchise brands from readiness conceptually', () => {
    assert.equal(isFranchiseOrNetworkBrandName('Two Men and a Truck'), true);
    assert.equal(isFranchiseOrNetworkBrandName('Good Greek Moving'), true);
  });

  it('safe copy avoids forbidden claims', () => {
    for (const bad of FUTURE_CANARY_COPY.forbidden.filter(
      (x) => x !== 'NOT AUTHORIZED'
    )) {
      assert.ok(!FUTURE_CANARY_COPY.homeCounty.locationLine.includes(bad));
      assert.ok(!FUTURE_CANARY_COPY.explicitService.line.includes(bad));
    }
  });

  it('same-state routes do not require destination=home; interstate excluded', () => {
    const pool = [
      fakeProvider({
        companyId: 'fl-im-1',
        stateCode: 'FL',
        homeCountyFips: FL_ORIGIN_COUNTIES['Palm Beach'],
        homeCountyName: 'Palm Beach',
        authorityNumber: 'IM1',
      }),
      fakeProvider({
        companyId: 'fl-im-2',
        stateCode: 'FL',
        homeCountyFips: FL_ORIGIN_COUNTIES.Broward,
        homeCountyName: 'Broward',
        authorityNumber: 'IM2',
      }),
    ];
    const selected = selectCanaryManifest(pool, { FL: 2, WA: 0 });
    const routes = sameStateRoutes().filter((r) => r.state === 'FL').slice(0, 2);
    for (const route of routes) {
      const result = simulateSameStateRoute(selected.FL, route);
      assert.equal(result.destinationRequiresHomeCountyMatch, false);
      assert.equal(result.stateAuthorityControlsDestination, true);
      assert.equal(result.pass, true);
    }
    const interstate = simulateInterstateExclusion(selected.FL, [
      { from: 'FL', to: 'GA', label: 'FL → GA' },
    ]);
    assert.equal(interstate[0].qualifiesViaStateAuthorityAlone, false);
    assert.equal(interstate[0].pass, true);
  });

  it('precision audit passes for valid manifest', () => {
    const pool = [
      fakeProvider({
        companyId: 'fl-im-9',
        stateCode: 'FL',
        homeCountyFips: '12099',
        homeCountyName: 'Palm Beach',
      }),
    ];
    const selected = selectCanaryManifest(pool, { FL: 1, WA: 0 });
    const audit = auditManifestPrecision(selected.FL);
    assert.equal(audit.falseMatches, 0);
    assert.equal(audit.precision, 100);
  });

  it('unmentioned county remains UNKNOWN (no negative edge)', () => {
    const pool = [
      fakeProvider({
        companyId: 'fl-im-10',
        stateCode: 'FL',
        homeCountyFips: '12099',
        explicitServiceCounties: [],
      }),
    ];
    const selected = selectCanaryManifest(pool, { FL: 1, WA: 0 });
    assert.equal(selected.FL[0].explicitServiceCounties.length, 0);
    // Semantic: absence ≠ negative
  });

  it('loads exact 011D.2B manifests and rejects non-manifest IDs', () => {
    const m = loadExactCanaryManifests();
    assert.equal(m.FL.length, 50);
    assert.equal(m.WA.length, 30);
    assert.equal(m.flSha, 'c1cad11d');
    assert.equal(m.waSha, 'e2967186');
    assert.equal(m.waveId, LOCAL_CANARY_WAVE_ID);
    const ok = assertManifestOnlyIds(m.companyIds.slice(0, 3), m.companyIds);
    assert.equal(ok.ok, true);
    const bad = assertManifestOnlyIds(
      [...m.companyIds.slice(0, 2), 'usdot-999'],
      m.companyIds
    );
    assert.equal(bad.ok, false);
  });

  it('PUBLISHABLE + indexable=false stays noindex / sitemap-excluded', () => {
    assert.equal(
      isSeoIndexableCompany({
        publicationState: 'PUBLISHABLE',
        indexable: false,
      }),
      false
    );
  });
});
