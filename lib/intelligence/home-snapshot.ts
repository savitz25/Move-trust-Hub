/**
 * National homepage intelligence payload.
 * Numbers come from the checked-in move-network-metrics-v1 artifact.
 * Pages do not live-query Production for these counts.
 */
import 'server-only';
import { loadMoveNetworkMetrics } from '@/lib/metrics/load-network-metrics';
import { projectHomeIntelFromNetworkMetrics } from '@/lib/metrics/project-home-intel';
import type { MoveHomeIntelligencePayload } from './home-types';

export type { MoveHomeIntelligencePayload } from './home-types';
export { MOVE_HOME_INTEL_VERSION, MOVE_HOME_H1 } from './home-types';

export async function getMoveHomeIntelligenceSnapshot(): Promise<MoveHomeIntelligencePayload> {
  return projectHomeIntelFromNetworkMetrics(loadMoveNetworkMetrics());
}
