export type MetricReadiness = 'READY' | 'INTERNAL_ONLY' | 'NOT_READY';

export function isPublicReady(readiness: MetricReadiness, publicEligibility: string): boolean {
  return readiness === 'READY' && publicEligibility === 'public';
}
