import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  evaluateModel,
  indexReference,
  radiusMilesForPowerUnits,
  shaOfSortedPredictions,
} from '@/lib/state-hhg/calibration/models';
import { MODEL_A_BANDS } from '@/lib/state-hhg/calibration/types';
import { splitCalibrationHoldout } from '@/lib/state-hhg/calibration/reference';
import type {
  FleetObservation,
  OperatingLocationRecord,
  ReferenceCountyEvidence,
} from '@/lib/state-hhg/calibration/types';
import type { CountyCentroid } from '@/lib/state-hhg/calibration/counties';

describe('011C.1 calibration models', () => {
  it('maps power-unit bands for model A', () => {
    assert.equal(radiusMilesForPowerUnits(MODEL_A_BANDS, 1).radiusMiles, 25);
    assert.equal(radiusMilesForPowerUnits(MODEL_A_BANDS, 5).radiusMiles, 40);
    assert.equal(radiusMilesForPowerUnits(MODEL_A_BANDS, 10).radiusMiles, 75);
    assert.equal(radiusMilesForPowerUnits(MODEL_A_BANDS, 40).radiusMiles, 125);
    assert.equal(radiusMilesForPowerUnits(MODEL_A_BANDS, 100).radiusMiles, 200);
  });

  it('unknown power units != zero', () => {
    const unk = radiusMilesForPowerUnits(MODEL_A_BANDS, null);
    assert.equal(unk.usedUnknownDefault, true);
    assert.equal(unk.radiusMiles, 25);
    const zero = radiusMilesForPowerUnits(MODEL_A_BANDS, 0);
    assert.equal(zero.radiusMiles, null);
    assert.equal(zero.bandId, 'zero_fleet');
  });

  it('split is deterministic', () => {
    const ids = Array.from({ length: 20 }, (_, i) => `p${String(i).padStart(2, '0')}`);
    const states = new Map(ids.map((id, i) => [id, i < 10 ? 'FL' : 'WA']));
    const a = splitCalibrationHoldout(ids, states, 0.3);
    const b = splitCalibrationHoldout(ids, states, 0.3);
    assert.deepEqual(a, b);
    assert.ok(a.holdout.length >= 2);
  });

  it('evaluation is deterministic and state-clipped', () => {
    const centroids: CountyCentroid[] = [
      {
        countyFips: '12011',
        stateFips: '12',
        name: 'Broward',
        lat: 26.1,
        lon: -80.2,
        bboxSpanMiles: 40,
      },
      {
        countyFips: '12099',
        stateFips: '12',
        name: 'Palm Beach',
        lat: 26.7,
        lon: -80.1,
        bboxSpanMiles: 50,
      },
      {
        countyFips: '53033',
        stateFips: '53',
        name: 'King',
        lat: 47.5,
        lon: -122.3,
        bboxSpanMiles: 60,
      },
    ];
    const loc: OperatingLocationRecord = {
      providerId: 'p1',
      stateCode: 'FL',
      observedAddress: 'x',
      addressType: 'regulator_physical',
      source: 'test',
      retrievedAt: '2026-08-21T00:00:00Z',
      normalizedAddress: 'x',
      city: 'Fort Lauderdale',
      postalCode: '33301',
      geocodeStatus: 'MATCH',
      lat: 26.12,
      lon: -80.14,
      countyFips: '12011',
      geocodeSource: 'census_geocoder_onelineaddress',
      geocodeConfidence: 0.95,
    };
    const fleet: FleetObservation = {
      providerId: 'p1',
      usdot: '1234567',
      powerUnits: 4,
      drivers: 4,
      mcs150Date: null,
      carrierOperation: null,
      observationDate: '2026-08-21T00:00:00Z',
      source: 'test',
      freshness: 'fresh',
    };
    const evidence: ReferenceCountyEvidence[] = [
      {
        providerId: 'p1',
        stateCode: 'FL',
        countyFips: '12011',
        evidenceType: 'CURATED_INTERNAL',
        source: 'test',
        sourceUrl: null,
        retrievedAt: '2026-08-21T00:00:00Z',
        confidence: 0.9,
        verificationState: 'VERIFIED',
      },
      {
        providerId: 'p1',
        stateCode: 'FL',
        countyFips: '12099',
        evidenceType: 'CURATED_INTERNAL',
        source: 'test',
        sourceUrl: null,
        retrievedAt: '2026-08-21T00:00:00Z',
        confidence: 0.9,
        verificationState: 'VERIFIED',
      },
    ];
    const a = evaluateModel({
      modelId: 'POWER_UNIT_RADIUS_BASELINE_011A',
      providerIds: ['p1'],
      locations: new Map([['p1', loc]]),
      fleets: new Map([['p1', fleet]]),
      referenceByProvider: indexReference(evidence),
      centroids,
    });
    const b = evaluateModel({
      modelId: 'POWER_UNIT_RADIUS_BASELINE_011A',
      providerIds: ['p1'],
      locations: new Map([['p1', loc]]),
      fleets: new Map([['p1', fleet]]),
      referenceByProvider: indexReference(evidence),
      centroids,
    });
    assert.equal(shaOfSortedPredictions(a.predictions), shaOfSortedPredictions(b.predictions));
    const pred = a.predictions.get('p1') ?? [];
    assert.ok(pred.every((f) => f.startsWith('12')));
    assert.ok(!pred.some((f) => f.startsWith('53')));
  });
});
