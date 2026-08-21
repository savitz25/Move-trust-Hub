export {
  GOOGLE_PLACES_REQUESTS,
  TASK_011D2B,
  LOCAL_CANARY_WAVE_ID,
  CANARY_TARGETS,
  FUTURE_PUBLICATION_PLAN,
  FUTURE_CANARY_COPY,
  type PublicationReadyProvider,
  type CanaryManifestRecord,
} from '@/lib/state-hhg/canary/types';

export { loadPublicationReadyPool } from '@/lib/state-hhg/canary/pool';
export {
  selectCanaryManifest,
  manifestSha,
} from '@/lib/state-hhg/canary/select';
export {
  simulateOriginCountyDiscovery,
  simulateSameStateRoute,
  simulateInterstateExclusion,
  sameStateRoutes,
  auditManifestPrecision,
  FL_ORIGIN_COUNTIES,
  WA_ORIGIN_COUNTIES,
  buildCanaryDiscoveryInputs,
} from '@/lib/state-hhg/canary/simulate';

export {
  loadExactCanaryManifests,
  assertManifestOnlyIds,
  contentHash,
} from '@/lib/state-hhg/canary/manifest';

export {
  validateCanaryPrePublish,
  publishLocalCanary,
  rollbackLocalCanary,
} from '@/lib/state-hhg/canary/publish';

export {
  queryCanaryLocalDiscovery,
  canaryAllowsSameStateDestination,
} from '@/lib/state-hhg/canary/discovery-db';
