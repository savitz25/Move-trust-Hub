import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  computeMoveNetworkMetrics,
  type MoveNetworkMetricsInput,
} from '../lib/metrics/compute-move-network-metrics';
import { metricByKey } from '../lib/metrics/move-network-metrics-v1';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function baseInput(over: Partial<MoveNetworkMetricsInput> = {}): MoveNetworkMetricsInput {
  return {
    generatedAt: '2026-09-03T22:00:00.000Z',
    publishableProfiles: 5022,
    indexableProfiles: 4905,
    authorityActive: 4715,
    authorityNotCurrent: 13,
    authorityUnknown: 294,
    carriers: 4227,
    brokers: 278,
    dual: 94,
    withMcNumber: 4383,
    withRefreshDate: 5022,
    withoutRefreshDate: 0,
    latestObservedRefresh: '2026-08-23T05:02:52.712Z',
    oldestObservedRefresh: '2026-08-01T00:00:00.000Z',
    freshnessBuckets: [
      { id: '0-30', label: '0–30 days since last recorded refresh', count: 5022 },
      { id: '31-60', label: '31–60 days', count: 0 },
      { id: '61-90', label: '61–90 days', count: 0 },
      { id: '91-365', label: '91–365 days', count: 0 },
      { id: '>365', label: 'More than 365 days', count: 0 },
      { id: 'unknown', label: 'No refresh date recorded', count: 0 },
    ],
    flImRegistrations: 1314,
    flImActive: 1099,
    flMbActive: 26,
    flImVerifiedLinks: 941,
    flHqPublishable: 483,
    flContactObservations: 3875,
    flSourceAsOf: '2026-08-21T03:29:40.443Z',
    njRosterCoverage: 'SOURCE_AVAILABLE_BY_REQUEST',
    njOsmNovsAcquired: 34,
    njHqPublishable: 269,
    njSourceAsOf: '2026-09-03',
    caCalTRosterCoverage: 'OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED',
    caCitationRows19237: 132,
    caUnlicensedCitationRows: 120,
    caExactCalTCitationRows: 12,
    caHqPublishable: 403,
    caSourceAsOf: '2026-09-03',
    caTariffEffective: '2026-01-01',
    publishedStateIntelligencePaths: ['/florida', '/new-jersey', '/california'],
    floridaResearchCountyLandings: 4,
    localMoverStateLandings: 51,
    ...over,
  };
}

describe('move-network-metrics-v1 grain safety', () => {
  it('does not sum federal and state universes', () => {
    const m = computeMoveNetworkMetrics(baseInput());
    const federal = metricByKey(m, 'federal_publishable_directory_profiles').value ?? 0;
    const fl = metricByKey(m, 'florida_fdacs_im_active_registrations').value ?? 0;
    const citations = metricByKey(m, 'ca_bhgs_19237_citation_rows').value ?? 0;
    assert.notEqual(federal, fl + citations);
    assert.throws(
      () =>
        computeMoveNetworkMetrics(
          baseInput({
            publishableProfiles: 1099 + 34 + 132,
            indexableProfiles: 1000,
            authorityActive: 1099 + 34 + 132,
            authorityNotCurrent: 0,
            authorityUnknown: 0,
            carriers: 1099 + 34 + 132,
            brokers: 0,
            dual: 0,
            withMcNumber: 100,
            withRefreshDate: 1099 + 34 + 132,
            withoutRefreshDate: 0,
          })
        ),
      /federal\+state mix|authority split/
    );
  });

  it('keeps FDACS IM out of federal directory and Florida HQ profiles', () => {
    const m = computeMoveNetworkMetrics(baseInput());
    assert.notEqual(
      metricByKey(m, 'florida_fdacs_im_active_registrations').value,
      metricByKey(m, 'federal_publishable_directory_profiles').value
    );
    assert.notEqual(
      metricByKey(m, 'florida_fdacs_im_active_registrations').value,
      metricByKey(m, 'florida_hq_publishable_profiles').value
    );
  });

  it('does not convert NJ unknown roster or CA CAL-T universe to zero', () => {
    const m = computeMoveNetworkMetrics(baseInput());
    assert.equal(metricByKey(m, 'nj_pmw_authority_roster').value, null);
    assert.equal(metricByKey(m, 'nj_pmw_authority_roster').valueState, 'REQUEST_ONLY');
    assert.equal(metricByKey(m, 'ca_cal_t_household_mover_universe').value, null);
    assert.equal(metricByKey(m, 'ca_cal_t_household_mover_universe').valueState, 'NOT_ACQUIRED');
    assert.match(metricByKey(m, 'nj_pmw_authority_roster').trace.whyUnknown ?? '', /never render as zero/i);
    assert.match(metricByKey(m, 'ca_cal_t_household_mover_universe').trace.whyUnknown ?? '', /search-only/i);
  });

  it('does not treat CA citation rows as CAL-T mover count or USDOT', () => {
    const m = computeMoveNetworkMetrics(baseInput());
    assert.equal(metricByKey(m, 'ca_bhgs_19237_citation_rows').value, 132);
    assert.equal(metricByKey(m, 'ca_bhgs_19237_unlicensed_rows').value, 120);
    assert.equal(metricByKey(m, 'ca_bhgs_19237_exact_cal_t_rows').value, 12);
    assert.notEqual(metricByKey(m, 'ca_bhgs_19237_citation_rows').value, metricByKey(m, 'ca_cal_t_household_mover_universe').value);
    assert.notEqual(metricByKey(m, 'ca_bhgs_19237_citation_rows').grain, 'ca_cal_t_household_mover_permit');
    assert.throws(
      () => computeMoveNetworkMetrics(baseInput({ caHqPublishable: 132 })),
      /citation rows must not equal CA HQ/
    );
  });

  it('keeps NJ NOV grain out of final orders and HQ profiles', () => {
    const m = computeMoveNetworkMetrics(baseInput());
    assert.equal(metricByKey(m, 'nj_operation_safe_move_novs_acquired').grain, 'nj_operation_safe_move_nov');
    assert.match(metricByKey(m, 'nj_operation_safe_move_novs_acquired').trace.doesNotCount, /final order/i);
    assert.throws(
      () => computeMoveNetworkMetrics(baseInput({ njHqPublishable: 34 })),
      /NOVs must not equal NJ HQ/
    );
  });

  it('does not replace sourceAsOf with generatedAt', () => {
    const m = computeMoveNetworkMetrics(baseInput({ generatedAt: '2026-09-03T22:00:00.000Z' }));
    assert.equal(metricByKey(m, 'florida_fdacs_im_active_registrations').sourceAsOf, '2026-08-21');
    assert.notEqual(metricByKey(m, 'florida_fdacs_im_active_registrations').sourceAsOf, m.generatedAt.slice(0, 10));
    assert.equal(m.newestDocumentedSourceAsOf, '2026-09-03');
  });

  it('requires published state routes in coverage', () => {
    assert.throws(
      () => computeMoveNetworkMetrics(baseInput({ publishedStateIntelligencePaths: ['/florida', '/new-jersey'] })),
      /California/
    );
  });
});

describe('checked-in manifest vs homepage wiring', () => {
  it('keeps homepage consumers on the v1 artifact path', () => {
    const snap = readFileSync(join(root, 'lib/intelligence/home-snapshot.ts'), 'utf8');
    assert.match(snap, /loadMoveNetworkMetrics|projectHomeIntelFromNetworkMetrics|move-network-metrics-v1/);
  });
});
