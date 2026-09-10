/**
 * Overlay VA-MOVE-001 onto committed move-network-metrics-v1 without a Supabase recount.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const prev = JSON.parse(readFileSync(join(root, 'data/home/move-network-metrics-v1.json'), 'utf8'));
const snap = JSON.parse(readFileSync(join(root, 'lib/virginia-intelligence/accepted-snapshot.json'), 'utf8'));
const { computeMoveNetworkMetrics } = await import(
  pathToFileURL(join(root, 'lib/metrics/compute-move-network-metrics.ts')).href
);

if (prev.network.publishedStateIntelligencePaths.includes('/virginia')) {
  throw new Error('VA already present in network metrics; reset from main before overlay');
}

const fd = prev.federalDirectory;
const clock = prev.homeProjection.fmcsaClock;
const input = {
  generatedAt: new Date().toISOString(),
  publishableProfiles: fd.publishableProfiles,
  indexableProfiles: fd.indexableProfiles,
  authorityActive: fd.authorityActive,
  authorityNotCurrent: fd.authorityNotCurrent,
  authorityUnknown: fd.authorityUnknown,
  carriers: fd.carriers,
  brokers: fd.brokers,
  dual: fd.dual,
  withMcNumber: fd.withMcNumber,
  withRefreshDate: clock.withRefreshDate,
  withoutRefreshDate: clock.withoutRefreshDate,
  latestObservedRefresh: clock.latestObservedRefresh,
  oldestObservedRefresh: clock.oldestObservedRefresh,
  freshnessBuckets: clock.buckets,
  flImRegistrations: prev.florida.imRegistrations,
  flImActive: prev.florida.imActive,
  flMbActive: prev.florida.mbActive,
  flImVerifiedLinks: prev.florida.imVerifiedLinks,
  flHqPublishable: prev.florida.hqPublishable,
  flContactObservations: prev.florida.contactObservations,
  flSourceAsOf: '2026-08-21T03:29:40.443Z',
  njRosterCoverage: prev.newJersey.rosterCoverage,
  njOsmNovsAcquired: prev.newJersey.osmNovsAcquired,
  njHqPublishable: prev.newJersey.hqPublishable,
  njSourceAsOf: '2026-09-03',
  caCalTRosterCoverage: prev.california.calTRosterCoverage,
  caCitationRows19237: prev.california.citationRows19237,
  caUnlicensedCitationRows: prev.california.unlicensedCitationRows,
  caExactCalTCitationRows: prev.california.exactCalTCitationRows,
  caHqPublishable: prev.california.hqPublishable,
  caSourceAsOf: '2026-09-03',
  caTariffEffective: prev.california.tariffEffective,
  txRosterCoverage: prev.texas.rosterCoverage,
  txSourceAsOf: '2026-09-03',
  txComplaintBulkCoverage: prev.texas.complaintBulkCoverage,
  txCrosswalkCoverage: prev.texas.statewideExactCrosswalkCoverage,
  waActiveDirectoryResults: prev.washington.activeDirectoryResults,
  waDirectoryRetrievedAt: prev.washington.activeDirectoryRetrievedAt,
  waBulkRosterCoverage: prev.washington.bulkRosterCoverage,
  waSourceAsOf: '2026-09-04',
  coActiveHhgPermitListings: prev.colorado.activeHhgPermitListings,
  coRevokedHhgListings: prev.colorado.revokedHhgListings,
  coSuspendedHhgListings: prev.colorado.suspendedHhgListings,
  coSourceAsOf: prev.colorado.sourceAsOf,
  vaHhgListingRows: snap.hhg_roster.rows,
  vaPropertyListingRows: snap.property_roster.rows,
  vaSourceRetrievedAt: snap.clocks.authorized_carriers_retrievedAt,
  publishedStateIntelligencePaths: [...prev.network.publishedStateIntelligencePaths, '/virginia'],
  floridaResearchCountyLandings: prev.network.floridaResearchCountyLandings,
  localMoverStateLandings: prev.network.localMoverStateLandings,
};

const next = computeMoveNetworkMetrics(input);
writeFileSync(join(root, 'data/home/move-network-metrics-v1.json'), `${JSON.stringify(next, null, 2)}\n`);
console.log('overlay', {
  fingerprint: next.sourceFingerprint,
  liveStates: next.network.publishedStateIntelligencePages,
  paths: next.network.publishedStateIntelligencePaths,
  vaHhg: next.virginia.hhgListingRows,
});
