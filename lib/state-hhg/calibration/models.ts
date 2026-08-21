/**
 * Radius model evaluation — deterministic, no ML, no county edge writes.
 */
import { createHash } from 'crypto';
import {
  countiesForState,
  countiesWithinRadius,
  type CountyCentroid,
} from '@/lib/state-hhg/calibration/counties';
import {
  UNKNOWN_FLEET_RADIUS_MILES,
  RADIUS_MODELS,
  type FleetObservation,
  type ModelEvaluationMetrics,
  type OperatingLocationRecord,
  type RadiusBand,
  type RadiusModelId,
  type ReferenceCountyEvidence,
  type CatastrophicFailure,
} from '@/lib/state-hhg/calibration/types';

export function radiusMilesForPowerUnits(
  bands: readonly RadiusBand[],
  powerUnits: number | null | undefined,
  unknownFleetRadius = UNKNOWN_FLEET_RADIUS_MILES
): { radiusMiles: number | null; bandId: string | null; usedUnknownDefault: boolean } {
  if (powerUnits == null || powerUnits < 0) {
    return {
      radiusMiles: unknownFleetRadius,
      bandId: 'unknown_fleet_default',
      usedUnknownDefault: true,
    };
  }
  // Zero fleet: treat as unknown for derived modeling (not fabricated coverage)
  if (powerUnits === 0) {
    return { radiusMiles: null, bandId: 'zero_fleet', usedUnknownDefault: false };
  }
  for (const band of bands) {
    if (band.powerUnitsMax == null || powerUnits <= band.powerUnitsMax) {
      return {
        radiusMiles: band.radiusMiles,
        bandId: band.id,
        usedUnknownDefault: false,
      };
    }
  }
  return { radiusMiles: null, bandId: null, usedUnknownDefault: false };
}

export function predictCountiesForProvider(input: {
  modelId: RadiusModelId;
  location: OperatingLocationRecord;
  fleet: FleetObservation | undefined;
  centroids: readonly CountyCentroid[];
  /** When true, unknown fleet gets no derived counties (011C.2 rule preview). */
  skipUnknownFleet?: boolean;
}): string[] {
  const bands = RADIUS_MODELS[input.modelId].bands;
  if (
    input.location.lat == null ||
    input.location.lon == null ||
    (input.location.geocodeStatus !== 'MATCH' &&
      input.location.geocodeStatus !== 'TIE')
  ) {
    return [];
  }
  const pu = input.fleet?.powerUnits ?? null;
  const resolved = radiusMilesForPowerUnits(bands, pu);
  if (resolved.radiusMiles == null) return [];
  if (input.skipUnknownFleet && resolved.usedUnknownDefault) return [];
  if (input.fleet?.freshness === 'zero') return [];

  const stateCounties = countiesForState(
    input.centroids,
    input.location.stateCode
  );
  return countiesWithinRadius(
    input.location.lat,
    input.location.lon,
    resolved.radiusMiles,
    stateCounties
  );
}

function median(nums: number[]): number {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function percentile(nums: number[], p: number): number {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const idx = Math.min(s.length - 1, Math.ceil((p / 100) * s.length) - 1);
  return s[Math.max(0, idx)];
}

export function evaluateModel(input: {
  modelId: RadiusModelId;
  providerIds: readonly string[];
  locations: Map<string, OperatingLocationRecord>;
  fleets: Map<string, FleetObservation>;
  referenceByProvider: Map<string, Set<string>>;
  centroids: readonly CountyCentroid[];
  skipUnknownFleet?: boolean;
}): {
  metrics: ModelEvaluationMetrics;
  predictions: Map<string, string[]>;
  failures: CatastrophicFailure[];
} {
  let tp = 0;
  let fp = 0;
  let fn = 0;
  const jaccards: number[] = [];
  const countyCounts: number[] = [];
  const predictions = new Map<string, string[]>();
  const failures: CatastrophicFailure[] = [];

  for (const id of input.providerIds) {
    const loc = input.locations.get(id);
    const ref = input.referenceByProvider.get(id) ?? new Set<string>();
    if (!loc || ref.size === 0) continue;

    const predicted = predictCountiesForProvider({
      modelId: input.modelId,
      location: loc,
      fleet: input.fleets.get(id),
      centroids: input.centroids,
      skipUnknownFleet: input.skipUnknownFleet,
    });
    predictions.set(id, predicted);
    countyCounts.push(predicted.length);

    const predSet = new Set(predicted);
    let localTp = 0;
    let localFp = 0;
    let localFn = 0;
    for (const c of predSet) {
      if (ref.has(c)) localTp++;
      else localFp++;
    }
    for (const c of ref) {
      if (!predSet.has(c)) localFn++;
    }
    tp += localTp;
    fp += localFp;
    fn += localFn;
    const union = new Set([...predSet, ...ref]);
    jaccards.push(union.size ? localTp / union.size : 0);

    // Catastrophic: predicted nearly whole state
    const stateSize = countiesForState(input.centroids, loc.stateCode).length;
    if (predicted.length >= Math.max(20, Math.floor(stateSize * 0.6))) {
      failures.push({
        providerId: id,
        stateCode: loc.stateCode,
        kind: 'near_statewide_derived_coverage',
        detail: `${predicted.length}/${stateSize} counties`,
      });
    }
    // Home county missing when geocode known
    if (loc.countyFips && !predSet.has(loc.countyFips) && predicted.length > 0) {
      failures.push({
        providerId: id,
        stateCode: loc.stateCode,
        kind: 'home_county_excluded',
        detail: loc.countyFips,
      });
    }
    // Out-of-state (should be impossible with clipping)
    for (const c of predicted) {
      const expected = loc.stateCode === 'FL' ? '12' : '53';
      if (!c.startsWith(expected)) {
        failures.push({
          providerId: id,
          stateCode: loc.stateCode,
          kind: 'out_of_state_county',
          detail: c,
        });
      }
    }
  }

  const precision = tp + fp > 0 ? tp / (tp + fp) : null;
  const recall = tp + fn > 0 ? tp / (tp + fn) : null;
  const f1 =
    precision != null && recall != null && precision + recall > 0
      ? (2 * precision * recall) / (precision + recall)
      : null;

  return {
    metrics: {
      truePositives: tp,
      falsePositives: fp,
      falseNegatives: fn,
      precision,
      recall,
      f1,
      meanJaccard: jaccards.length
        ? jaccards.reduce((a, b) => a + b, 0) / jaccards.length
        : null,
      avgCountiesPerProvider: countyCounts.length
        ? countyCounts.reduce((a, b) => a + b, 0) / countyCounts.length
        : 0,
      medianCountiesPerProvider: median(countyCounts),
      p90CountiesPerProvider: percentile(countyCounts, 90),
      maxCountiesPerProvider: countyCounts.length ? Math.max(...countyCounts) : 0,
      providersEvaluated: countyCounts.length,
    },
    predictions,
    failures,
  };
}

export function shaOfSortedPredictions(
  predictions: Map<string, string[]>
): string {
  const payload = [...predictions.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([id, counties]) => `${id}:${[...counties].sort().join(',')}`)
    .join('|');
  return createHash('sha256').update(payload).digest('hex');
}

export function indexReference(
  evidence: readonly ReferenceCountyEvidence[]
): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const e of evidence) {
    const set = map.get(e.providerId) ?? new Set<string>();
    set.add(e.countyFips);
    map.set(e.providerId, set);
  }
  return map;
}
