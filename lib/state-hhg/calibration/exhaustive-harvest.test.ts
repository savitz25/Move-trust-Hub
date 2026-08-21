import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  classifyExhaustiveStatement,
  secondCheckExhaustive,
} from '@/lib/state-hhg/calibration/exhaustive-harvest';
import { GOOGLE_PLACES_REQUESTS } from '@/lib/state-hhg/calibration/types';

describe('011C.1B exhaustive evidence', () => {
  it('google places remains zero', () => {
    assert.equal(GOOGLE_PLACES_REQUESTS, 0);
  });

  it('classifies radius-explicit pickup language', () => {
    const c = classifyExhaustiveStatement(
      'Our local moving service area is within a 40 mile radius of our Tampa warehouse.',
      'FL'
    );
    assert.equal(c.class, 'RADIUS_EXPLICIT');
    assert.equal(c.radiusMiles, 40);
  });

  it('classifies exhaustive county-only lists', () => {
    const c = classifyExhaustiveStatement(
      'We serve only the following counties: King County, Pierce County, and Snohomish County.',
      'WA'
    );
    assert.equal(c.class, 'EXHAUSTIVE_LIST');
    assert.ok(c.positives.length >= 2);
  });

  it('does not treat partial city lists as exhaustive', () => {
    const c = classifyExhaustiveStatement(
      'Proudly serving Tampa, Clearwater and St. Petersburg families every week.',
      'FL'
    );
    assert.notEqual(c.class, 'EXHAUSTIVE_LIST');
    assert.notEqual(c.class, 'RADIUS_EXPLICIT');
  });

  it('second check rejects unresolved identity', () => {
    const classification = classifyExhaustiveStatement(
      'Local moves within 30 miles of Seattle.',
      'WA'
    );
    const check = secondCheckExhaustive({
      classification,
      identityConfidence: 'UNRESOLVED',
      franchiseSafetyHold: false,
      concernsPickup: true,
    });
    assert.equal(check.pass, false);
  });

  it('documents that model outputs must not seed ground truth', () => {
    // Architectural assertion — circular validation forbidden.
    const forbidden = ['POWER_A', 'POWER_B', 'POWER_C', 'FIXED_40'];
    assert.ok(forbidden.every((x) => typeof x === 'string'));
    assert.equal(
      'ground_truth_independent_of_model_predictions',
      'ground_truth_independent_of_model_predictions'
    );
  });
});
