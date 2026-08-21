/**
 * Metrics that respect PARTIAL vs EXHAUSTIVE evidence.
 * Unmentioned counties on PARTIAL sources are UNKNOWN — never automatic FPs.
 */
import { createHash } from 'crypto';
import {
  countiesForState,
  countiesWithinRadius,
  haversineMiles,
  type CountyCentroid,
} from '@/lib/state-hhg/calibration/counties';
import { radiusMilesForPowerUnits } from '@/lib/state-hhg/calibration/models';
import type { ExpandedReferenceProvider } from '@/lib/state-hhg/calibration/reference-types';
import {
  MODEL_A_BANDS,
  MODEL_B_BANDS,
  MODEL_C_BANDS,
  type FleetObservation,
  type OperatingLocationRecord,
  type RadiusBand,
} from '@/lib/state-hhg/calibration/types';

export type PartialAwareMetrics = {
  population: number;
  exhaustivePopulation: number;
  partialPopulation: number;
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  /** FPs only counted when evidence supports negatives / exhaustive */
  precision: number | null;
  recall: number | null;
  f1: number | null;
  positiveSupportHits: number;
  positiveSupportTotal: number;
  homeCountyHitRate: number | null;
};

export function predictWithBands(input: {
  bands: readonly RadiusBand[] | null;
  fixedRadiusMiles: number | null;
  location: OperatingLocationRecord;
  fleet: FleetObservation | undefined;
  centroids: readonly CountyCentroid[];
}): string[] {
  if (
    input.location.lat == null ||
    input.location.lon == null ||
    (input.location.geocodeStatus !== 'MATCH' &&
      input.location.geocodeStatus !== 'TIE')
  ) {
    return [];
  }
  let radius: number | null = input.fixedRadiusMiles;
  if (input.bands) {
    const resolved = radiusMilesForPowerUnits(
      input.bands,
      input.fleet?.powerUnits ?? null
    );
    // For remediation scoring, unknown fleet uses default; zero fleet → no derived
    if (input.fleet?.powerUnits === 0) return [];
    radius = resolved.radiusMiles;
  }
  if (radius == null) return [];
  return countiesWithinRadius(
    input.location.lat,
    input.location.lon,
    radius,
    countiesForState(input.centroids, input.location.stateCode)
  );
}

export function evaluatePartialAware(input: {
  providerIds: readonly string[];
  refs: Map<string, ExpandedReferenceProvider>;
  locations: Map<string, OperatingLocationRecord>;
  fleets: Map<string, FleetObservation>;
  centroids: readonly CountyCentroid[];
  bands: readonly RadiusBand[] | null;
  fixedRadiusMiles: number | null;
}): PartialAwareMetrics & { predictions: Map<string, string[]> } {
  let tp = 0;
  let fp = 0;
  let fn = 0;
  let positiveSupportHits = 0;
  let positiveSupportTotal = 0;
  let homeHits = 0;
  let homeTotal = 0;
  let exhaustivePopulation = 0;
  let partialPopulation = 0;
  const predictions = new Map<string, string[]>();

  for (const id of input.providerIds) {
    const ref = input.refs.get(id);
    const loc = input.locations.get(id);
    if (!ref || !loc || ref.positiveCountyFips.length === 0) continue;
    if (ref.franchiseSafetyHold) continue;

    const predicted = predictWithBands({
      bands: input.bands,
      fixedRadiusMiles: input.fixedRadiusMiles,
      location: loc,
      fleet: input.fleets.get(id),
      centroids: input.centroids,
    });
    predictions.set(id, predicted);
    const predSet = new Set(predicted);

    const isExhaustive =
      ref.scorableForPrecision &&
      (ref.evidenceCompleteness === 'EXHAUSTIVE' ||
        ref.evidenceCompleteness === 'RADIUS_EXPLICIT');

    if (isExhaustive) {
      exhaustivePopulation++;
      const neg = new Set(ref.negativeCountyFips);
      for (const c of predSet) {
        if (ref.positiveCountyFips.includes(c)) tp++;
        else if (neg.has(c)) fp++;
        // unknown not counted
      }
      for (const c of ref.positiveCountyFips) {
        if (!predSet.has(c)) fn++;
      }
    } else {
      partialPopulation++;
      // PARTIAL: only positive support / recall of known positives
      for (const c of ref.positiveCountyFips) {
        positiveSupportTotal++;
        if (predSet.has(c)) {
          positiveSupportHits++;
          tp++; // contribute to combined recall numerator carefully
        } else {
          fn++;
        }
      }
      // Do NOT increment FP for predicted counties outside partial positives
    }

    if (loc.countyFips) {
      homeTotal++;
      if (predSet.has(loc.countyFips)) homeHits++;
    }
  }

  const precision = tp + fp > 0 ? tp / (tp + fp) : null;
  const recall = tp + fn > 0 ? tp / (tp + fn) : null;
  const f1 =
    precision != null && recall != null && precision + recall > 0
      ? (2 * precision * recall) / (precision + recall)
      : null;

  return {
    population: exhaustivePopulation + partialPopulation,
    exhaustivePopulation,
    partialPopulation,
    truePositives: tp,
    falsePositives: fp,
    falseNegatives: fn,
    precision: exhaustivePopulation > 0 ? precision : null,
    recall,
    f1: exhaustivePopulation > 0 ? f1 : recall,
    positiveSupportHits,
    positiveSupportTotal,
    homeCountyHitRate: homeTotal ? homeHits / homeTotal : null,
    predictions,
  };
}

export function shaPredictions(predictions: Map<string, string[]>): string {
  const payload = [...predictions.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([id, c]) => `${id}:${[...c].sort().join(',')}`)
    .join('|');
  return createHash('sha256').update(payload).digest('hex');
}

export function describeFleetCorrelation(input: {
  refs: readonly ExpandedReferenceProvider[];
  fleets: Map<string, FleetObservation>;
  locations: Map<string, OperatingLocationRecord>;
  centroids: readonly CountyCentroid[];
}) {
  const bands = [
    { id: '1-2', min: 1, max: 2 },
    { id: '3-5', min: 3, max: 5 },
    { id: '6-15', min: 6, max: 15 },
    { id: '16-50', min: 16, max: 50 },
    { id: '51+', min: 51, max: 9999 },
  ];
  const rows: Array<{
    band: string;
    n: number;
    medianPositiveCounties: number;
    medianMaxDistanceMiles: number | null;
  }> = [];

  for (const b of bands) {
    const samples: { counties: number; maxDist: number | null }[] = [];
    for (const ref of input.refs) {
      const pu = input.fleets.get(ref.providerId)?.powerUnits;
      if (pu == null || pu < b.min || pu > b.max) continue;
      const loc = input.locations.get(ref.providerId);
      let maxDist: number | null = null;
      if (loc?.lat != null && loc.lon != null) {
        for (const fips of ref.positiveCountyFips) {
          const c = input.centroids.find((x) => x.countyFips === fips);
          if (!c) continue;
          const d = haversineMiles(loc.lat, loc.lon, c.lat, c.lon);
          maxDist = maxDist == null ? d : Math.max(maxDist, d);
        }
      }
      samples.push({
        counties: ref.positiveCountyFips.length,
        maxDist,
      });
    }
    const counties = samples.map((s) => s.counties).sort((a, b) => a - b);
    const dists = samples
      .map((s) => s.maxDist)
      .filter((d): d is number => d != null)
      .sort((a, b) => a - b);
    const mid = (arr: number[]) =>
      arr.length ? arr[Math.floor(arr.length / 2)] : 0;
    rows.push({
      band: b.id,
      n: samples.length,
      medianPositiveCounties: mid(counties),
      medianMaxDistanceMiles: dists.length ? mid(dists) : null,
    });
  }

  const correlationWeak =
    rows.filter((r) => r.n >= 3).length < 2 ||
    rows.every((r) => r.medianPositiveCounties <= 2);

  return {
    byBand: rows,
    interpretation: correlationWeak
      ? 'WEAK — observed positive county counts do not clearly increase with fleet band on this reference corpus (many PARTIAL home-county-only labels).'
      : 'MEASURED — see band table for directionality.',
  };
}

export const FIXED_RADIUS_BENCHMARKS = [25, 40, 50] as const;

export const POWER_MODELS = {
  A: MODEL_A_BANDS,
  B: MODEL_B_BANDS,
  C: MODEL_C_BANDS,
} as const;
