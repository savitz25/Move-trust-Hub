import manifest from '@/data/home/move-network-metrics-v1.json';
import {
  MOVE_NETWORK_METRICS_VERSION,
  type MoveNetworkMetricsV1,
} from './move-network-metrics-v1';

export function loadMoveNetworkMetrics(): MoveNetworkMetricsV1 {
  const snap = manifest as MoveNetworkMetricsV1;
  if (snap.schemaVersion !== MOVE_NETWORK_METRICS_VERSION) {
    throw new Error(`Unexpected network metrics version: ${snap.schemaVersion}`);
  }
  return snap;
}
