export {
  cleanNmlsId,
  isValidNumericNmlsId,
  resolveNmlsVerification,
  type NmlsVerificationDisplay,
  type NmlsVerificationLevel,
} from '@/lib/lender/verification/nmls';

export {
  cleanDisplayPhone,
  isLenderPlaceholderPhone,
} from '@/lib/lender/verification/phone';

export {
  NO_CLOSING_PERFORMANCE_LABEL,
  resolveClosingPerformance,
  type ClosingPerformanceDisplay,
  type ClosingPerformanceProvenance,
} from '@/lib/lender/verification/performance-metrics';

export {
  resolveLenderMetricProvenance,
  type LenderMetricBundle,
  type MetricConfidence,
  type MetricProvenance,
} from '@/lib/lender/verification/metric-provenance';

export {
  applyEntityTrustScores,
  dedupeLendersByEntity,
  getCanonicalSlugForEntity,
  isCanonicalLenderProfile,
  lenderEntityKey,
  pickCanonicalLender,
} from '@/lib/lender/verification/entity-identity';

export {
  catalogDistinctEntities,
  finalizeLenderCatalog,
  sanitizeLender,
} from '@/lib/lender/verification/sanitize-lender';

export {
  countEntitiesByCounty,
  countLenderCatalog,
  type LenderCatalogCounts,
} from '@/lib/lender/verification/counts';
