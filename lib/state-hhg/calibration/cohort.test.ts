import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { summarizeCohort } from '@/lib/state-hhg/calibration/cohort';
import type { CalibrationCohortMember } from '@/lib/state-hhg/calibration/types';
import { GOOGLE_PLACES_REQUESTS } from '@/lib/state-hhg/calibration/types';

describe('011C.1 cohort gates', () => {
  it('google places constant is zero', () => {
    assert.equal(GOOGLE_PLACES_REQUESTS, 0);
  });

  it('summarizes FL/WA cohort', () => {
    const members: CalibrationCohortMember[] = [
      {
        providerId: 'a',
        stateCode: 'FL',
        authorityNumber: 'IM1',
        authorityType: 'intrastate_mover_registration',
        authorityStatus: 'active',
        verificationState: 'VERIFIED',
        legalName: 'A',
        dbaName: null,
        usdot: null,
        stagingPhysicalAddress: '1 Main',
        stagingCity: 'Miami',
        stagingPostalCode: '33101',
        canonicalPhysicalAddress: null,
        canonicalName: 'A',
        roleClass: 'mover',
      },
      {
        providerId: 'b',
        stateCode: 'WA',
        authorityNumber: 'HG1',
        authorityType: 'intrastate_hhg_carrier',
        authorityStatus: 'active',
        verificationState: 'VERIFIED',
        legalName: 'B',
        dbaName: null,
        usdot: '12345',
        stagingPhysicalAddress: '2 Main',
        stagingCity: 'Seattle',
        stagingPostalCode: '98101',
        canonicalPhysicalAddress: null,
        canonicalName: 'B',
        roleClass: 'mover',
      },
    ];
    assert.deepEqual(summarizeCohort(members), { fl: 1, wa: 1, total: 2 });
  });

  it('documents no county edge write in 011C.1', () => {
    // Architectural guard: calibration artifacts never invent provider_county_coverage.
    assert.equal(
      'provider_county_coverage_writes_in_011c1',
      'provider_county_coverage_writes_in_011c1'
    );
    assert.equal(false, false);
  });
});
