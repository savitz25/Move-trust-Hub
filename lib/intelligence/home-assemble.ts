import { fingerprintMoveHomePayload } from './home-fingerprint';
import { MOVE_HOME_EVIDENCE_DEPTH, MOVE_HOME_LIMITATIONS } from './home-education';
import { MOVE_HOME_SOURCE_CATALOG } from './home-source-catalog';
import {
  MOVE_HOME_INTEL_VERSION,
  type MoveHomeAuthoritySplit,
  type MoveHomeEntityClassCount,
  type MoveHomeFmcsaClock,
  type MoveHomeIntelligencePayload,
  type MoveHomeMetric,
  type MoveHomeSiteCoverage,
} from './home-types';

export type MoveHomeLiveCounts = {
  generatedAt: string;
  timedOut: boolean;
  asOf: string | null;
  publishableProfiles: number | null;
  entityClasses: MoveHomeEntityClassCount[] | null;
  authority: MoveHomeAuthoritySplit | null;
  fmcsaClock: MoveHomeFmcsaClock | null;
  siteCoverage: MoveHomeSiteCoverage;
};

const DIRECTORY_COHORT =
  'Consumer-visible MoveTrustHub directory profiles: publication_state is null (legacy) or not in REVIEW_REQUIRED, INACTIVE, INGESTED, CLASSIFIED.';

const NOT_FMCSA =
  'These counts describe MoveTrustHub’s current directory cohort, not the complete FMCSA universe.';

function metric(partial: Omit<MoveHomeMetric, 'publicEligibility'>): MoveHomeMetric {
  return { ...partial, publicEligibility: 'public' };
}

/**
 * Fail closed: a numeric metric is published only with value + asOf + source + grain.
 * Timeout and missing clocks yield education-ready payload with empty metrics.
 */
export function assembleMoveHomePayload(input: MoveHomeLiveCounts): MoveHomeIntelligencePayload {
  const metrics: MoveHomeMetric[] = [];
  const asOf = input.timedOut ? null : input.asOf;
  const canPublishNumbers = Boolean(asOf) && !input.timedOut;

  if (canPublishNumbers && asOf && input.publishableProfiles !== null) {
    metrics.push(
      metric({
        id: 'dir_publishable_profiles',
        label: 'Mover profiles in our current research directory',
        value: input.publishableProfiles,
        entityCounted: 'directory_profile',
        definition:
          'Consumer-visible directory profiles. Not “all movers in America.” Internal publication states are excluded; legacy rows without publication_state remain visible.',
        grain: 'directory_profile',
        cohort: DIRECTORY_COHORT,
        denominator: null,
        source: 'MoveTrustHub companies table (consumer-visible cohort)',
        querySource: 'companies filtered by publication_state visibility rules',
        asOf,
        geographicScope: 'national_directory',
        disclosure: NOT_FMCSA,
        exclusions:
          'REVIEW_REQUIRED, INACTIVE, INGESTED, and CLASSIFIED rows are excluded. This is not an FMCSA census.',
        whyNotFmcsaUniverse: NOT_FMCSA,
      })
    );
  }

  let entityClasses = canPublishNumbers ? input.entityClasses : null;
  if (entityClasses) {
    const classTotal = entityClasses.reduce((sum, row) => sum + row.count, 0);
    if (
      input.publishableProfiles === null ||
      classTotal !== input.publishableProfiles
    ) {
      entityClasses = null;
    }
  }

  let authority = canPublishNumbers ? input.authority : null;
  if (authority) {
    const splitTotal = authority.active + authority.notCurrent + authority.unknown;
    if (
      splitTotal !== authority.total ||
      (input.publishableProfiles !== null && authority.total !== input.publishableProfiles)
    ) {
      authority = null;
    }
  }

  let fmcsaClock = canPublishNumbers ? input.fmcsaClock : null;
  if (fmcsaClock) {
    const datedPlusMissing = fmcsaClock.withRefreshDate + fmcsaClock.withoutRefreshDate;
    if (
      datedPlusMissing !== fmcsaClock.total ||
      (input.publishableProfiles !== null && fmcsaClock.total !== input.publishableProfiles)
    ) {
      fmcsaClock = null;
    } else if (fmcsaClock.buckets) {
      const bucketSum = fmcsaClock.buckets.reduce((sum, row) => sum + row.count, 0);
      const datedBucketSum = fmcsaClock.buckets
        .filter((row) => row.id !== 'unknown')
        .reduce((sum, row) => sum + row.count, 0);
      const unknownBucket = fmcsaClock.buckets.find((row) => row.id === 'unknown');
      if (
        bucketSum !== fmcsaClock.total ||
        datedBucketSum !== fmcsaClock.withRefreshDate ||
        !unknownBucket ||
        unknownBucket.count !== fmcsaClock.withoutRefreshDate
      ) {
        fmcsaClock = { ...fmcsaClock, buckets: null };
      }
    }
  }

  const payload: Omit<MoveHomeIntelligencePayload, 'canonicalFingerprint'> = {
    version: MOVE_HOME_INTEL_VERSION,
    generatedAt: input.generatedAt,
    asOf,
    timedOut: input.timedOut,
    sources: MOVE_HOME_SOURCE_CATALOG,
    limitations: MOVE_HOME_LIMITATIONS,
    metrics,
    entityClasses,
    authority,
    fmcsaClock,
    siteCoverage: input.siteCoverage,
    evidenceDepth: MOVE_HOME_EVIDENCE_DEPTH,
  };

  return {
    ...payload,
    canonicalFingerprint: fingerprintMoveHomePayload(payload),
  };
}

export function emptyMoveHomePayload(
  generatedAt: string,
  timedOut: boolean,
  siteCoverage: MoveHomeSiteCoverage
): MoveHomeIntelligencePayload {
  return assembleMoveHomePayload({
    generatedAt,
    timedOut,
    asOf: null,
    publishableProfiles: null,
    entityClasses: null,
    authority: null,
    fmcsaClock: null,
    siteCoverage,
  });
}
