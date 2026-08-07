/**
 * Phase 2 — suppress zero/empty metrics in public UI.
 */

export function hasMeaningfulMetric(
  value: number | null | undefined,
  opts?: { allowZero?: boolean; min?: number }
): boolean {
  if (value === null || value === undefined) return false;
  if (!Number.isFinite(value)) return false;
  if (opts?.allowZero) return true;
  const min = opts?.min ?? 0;
  return value > min;
}

export function formatMetricOrOmit(
  value: number | null | undefined,
  format: (n: number) => string,
  empty = ''
): string {
  if (!hasMeaningfulMetric(value)) return empty;
  return format(value as number);
}

/** Profile stats: only show price when positive. */
export function shouldShowAvgPrice(avgPrice: number | null | undefined): boolean {
  return hasMeaningfulMetric(avgPrice, { min: 0 });
}

/** Complaint ratio only meaningful with real shipment volume. */
export function shouldShowComplaintRatio(params: {
  complaints: number;
  shipments: number;
}): boolean {
  return (params.shipments ?? 0) > 0 && (params.complaints ?? 0) >= 0;
}

/** Reputation 0 with no reviews is not a useful primary stat. */
export function shouldShowReputationScore(params: {
  reputationScore: number;
  reviewCount: number;
  overallRating: number;
}): boolean {
  if ((params.reputationScore ?? 0) <= 0) return false;
  // Allow if there is any review basis or a non-default score
  return (
    (params.reviewCount ?? 0) > 0 ||
    (params.overallRating ?? 0) > 0 ||
    (params.reputationScore ?? 0) >= 20
  );
}
