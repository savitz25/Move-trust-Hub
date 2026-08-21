/**
 * Task 011D.1 — Conservative local discovery foundation (public barrel).
 * Radius models: NOT APPROVED. Consumer publication: none in this task.
 */
export {
  GOOGLE_PLACES_REQUESTS,
  RETIRED_RADIUS_MODELS,
  LOCAL_DISCOVERY_BASES,
  CONSUMER_APPROVED_DISCOVERY_BASES,
  ADDRESS_QUALITY_CLASSES,
  NEW_PROVIDER_READINESS,
  FUTURE_UI_COPY,
  DISCOVERY_EVIDENCE_PRECEDENCE,
  type LocalDiscoveryBasis,
  type AddressQualityClass,
  type ProviderLocalDiscoveryEvidence,
  type HomeCountyAuditRow,
  type NewProviderReadiness,
  type NewProviderReadinessRow,
} from '@/lib/state-hhg/discovery/types';

export {
  classifyAddressQuality,
  addressSupportsHomeCounty,
} from '@/lib/state-hhg/discovery/address-quality';

export {
  buildHomeCountyAudit,
  countyNameForFips,
} from '@/lib/state-hhg/discovery/home-county';

export { loadExplicitPositiveDiscoveryEvidence } from '@/lib/state-hhg/discovery/explicit-evidence';

export {
  getLocalDiscoveryCandidates,
  ORIGIN_DESTINATION_CONTRACT,
  type GetLocalDiscoveryCandidatesInput,
  type LocalDiscoveryCandidate,
  type LocalDiscoveryAuthority,
  type LocalDiscoveryProviderMeta,
} from '@/lib/state-hhg/discovery/query';

export {
  computeCountyCoverage,
  homeCountyEdges,
  mergeHomeAndExplicitEdges,
  experimentalAdjacentCoverage,
  compareExplicitVsHome,
  estimateConservativeScale,
} from '@/lib/state-hhg/discovery/coverage';

export {
  classifyNewProviderReadiness,
  summarizeReadiness,
  CANONICALIZATION_RULE_011D2,
  type NewProviderCandidateInput,
} from '@/lib/state-hhg/discovery/readiness';
