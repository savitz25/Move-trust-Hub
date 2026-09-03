import { assembleMoveHomePayload } from '@/lib/intelligence/home-assemble';
import { buildMoveHomeSiteCoverage } from '@/lib/intelligence/home-site-coverage';
import type { MoveHomeIntelligencePayload } from '@/lib/intelligence/home-types';
import type { MoveNetworkMetricsV1 } from './move-network-metrics-v1';

export function projectHomeIntelFromNetworkMetrics(
  m: MoveNetworkMetricsV1
): MoveHomeIntelligencePayload {
  const home = m.homeProjection;
  return assembleMoveHomePayload({
    generatedAt: m.generatedAt,
    timedOut: false,
    asOf: home.fmcsaClock.latestObservedRefresh,
    publishableProfiles: home.publishableProfiles,
    entityClasses: home.entityClasses,
    authority: home.authority,
    fmcsaClock: home.fmcsaClock,
    siteCoverage: buildMoveHomeSiteCoverage(),
  });
}
