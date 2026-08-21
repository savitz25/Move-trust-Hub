import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  classifyMoveJurisdiction,
  isProviderEligibleForIntrastateMove,
  LOCAL_PUBLICATION_DISQUALIFIERS,
} from '@/lib/state-hhg/eligibility';
import {
  experimentalRadiusMilesForPowerUnits,
  estimateProviderCountyEdgeScale,
  pickWinningServiceAreaEvidence,
} from '@/lib/state-hhg/service-area';
import type { ProviderStateAuthorityRecord } from '@/lib/state-hhg/types';
import { resolveDirectoryQueryEngine } from '@/lib/directory/directory-query-engine';

function auth(
  partial: Partial<ProviderStateAuthorityRecord> = {}
): ProviderStateAuthorityRecord {
  return {
    providerId: 'p1',
    stateCode: 'FL',
    authorityType: 'intrastate_mover_registration',
    authorityNumber: 'FDACS-1',
    status: 'active',
    issueDate: '2024-01-01',
    expirationDate: '2027-01-01',
    legalName: 'TEST MOVER LLC',
    dba: null,
    regulator: 'FDACS',
    source: 'test',
    sourceUrl: null,
    retrievedAt: '2026-08-21T00:00:00.000Z',
    evidenceHash: null,
    verificationState: 'VERIFIED',
    ...partial,
  };
}

describe('Task 011A state HHG eligibility', () => {
  it('classifies same-state vs interstate', () => {
    assert.equal(classifyMoveJurisdiction('FL', 'FL'), 'same_state_intrastate');
    assert.equal(classifyMoveJurisdiction('FL', 'GA'), 'interstate');
  });

  it('does not let state authority qualify interstate moves', () => {
    const result = isProviderEligibleForIntrastateMove(
      {
        providerId: 'p1',
        originState: 'FL',
        destinationState: 'GA',
        stateAuthorities: [auth()],
        hasFederalHhgCarrier: true,
      },
      { stateCode: 'FL', intrastateHhgAuthorityRequired: 'YES' }
    );
    assert.equal(result.eligible, false);
    assert.match(result.reason, /Interstate/);
  });

  it('rejects FL broker-only authority for hauling eligibility', () => {
    const result = isProviderEligibleForIntrastateMove(
      {
        providerId: 'p1',
        originState: 'FL',
        destinationState: 'FL',
        stateAuthorities: [
          auth({
            authorityType: 'intrastate_hhg_broker',
            authorityNumber: 'MB113',
          }),
        ],
      },
      { stateCode: 'FL', intrastateHhgAuthorityRequired: 'YES' }
    );
    assert.equal(result.eligible, false);
  });

  it('rejects expired FL mover authority', () => {
    const result = isProviderEligibleForIntrastateMove(
      {
        providerId: 'p1',
        originState: 'FL',
        destinationState: 'FL',
        stateAuthorities: [auth({ status: 'expired', verificationState: 'HISTORICAL' })],
      },
      { stateCode: 'FL', intrastateHhgAuthorityRequired: 'YES' }
    );
    assert.equal(result.eligible, false);
  });

  it('accepts verified active WA HHG carrier for WA→WA', () => {
    const result = isProviderEligibleForIntrastateMove(
      {
        providerId: 'p-wa',
        originState: 'WA',
        destinationState: 'WA',
        stateAuthorities: [
          auth({
            providerId: 'p-wa',
            stateCode: 'WA',
            authorityType: 'intrastate_hhg_carrier',
            authorityNumber: 'HG070844',
            regulator: 'WA UTC',
          }),
        ],
      },
      { stateCode: 'WA', intrastateHhgAuthorityRequired: 'YES' }
    );
    assert.equal(result.eligible, true);
  });

  it('rejects inactive WA permit', () => {
    const result = isProviderEligibleForIntrastateMove(
      {
        providerId: 'p-wa',
        originState: 'WA',
        destinationState: 'WA',
        stateAuthorities: [
          auth({
            stateCode: 'WA',
            authorityType: 'intrastate_hhg_carrier',
            status: 'inactive',
            verificationState: 'HISTORICAL',
          }),
        ],
      },
      { stateCode: 'WA', intrastateHhgAuthorityRequired: 'YES' }
    );
    assert.equal(result.eligible, false);
  });

  it('rejects federal-only carrier where state authority is required', () => {
    const result = isProviderEligibleForIntrastateMove(
      {
        providerId: 'p1',
        originState: 'FL',
        destinationState: 'FL',
        stateAuthorities: [],
        hasFederalHhgCarrier: true,
      },
      { stateCode: 'FL', intrastateHhgAuthorityRequired: 'YES' }
    );
    assert.equal(result.eligible, false);
  });

  it('requires verified active Florida authority for FL→FL', () => {
    const ok = isProviderEligibleForIntrastateMove(
      {
        providerId: 'p1',
        originState: 'FL',
        destinationState: 'FL',
        stateAuthorities: [auth()],
      },
      { stateCode: 'FL', intrastateHhgAuthorityRequired: 'YES' }
    );
    assert.equal(ok.eligible, true);

    const bad = isProviderEligibleForIntrastateMove(
      {
        providerId: 'p1',
        originState: 'FL',
        destinationState: 'FL',
        stateAuthorities: [auth({ verificationState: 'UNRESOLVED' })],
      },
      { stateCode: 'FL', intrastateHhgAuthorityRequired: 'YES' }
    );
    assert.equal(bad.eligible, false);
  });

  it('USDOT alone is listed as a disqualifier concept', () => {
    assert.ok(LOCAL_PUBLICATION_DISQUALIFIERS.includes('has_usdot_only'));
    assert.ok(
      LOCAL_PUBLICATION_DISQUALIFIERS.includes(
        'federal_hhg_authority_alone_for_state_only_move'
      )
    );
  });

  it('explicit evidence outranks derived radius', () => {
    assert.equal(
      pickWinningServiceAreaEvidence(['DERIVED_RADIUS', 'EXPLICIT_VERIFIED']),
      'EXPLICIT_VERIFIED'
    );
  });

  it('experimental radius bands remain labeled not published', () => {
    assert.equal(experimentalRadiusMilesForPowerUnits(1), 25);
    assert.equal(experimentalRadiusMilesForPowerUnits(10), 75);
  });

  it('estimates county edge scale without creating edges', () => {
    const est = estimateProviderCountyEdgeScale({
      providers: 90_000,
      avgCountiesLow: 10,
      avgCountiesBase: 20,
      avgCountiesHigh: 30,
    });
    assert.equal(est.low, 900_000);
    assert.equal(est.base, 1_800_000);
    assert.equal(est.high, 2_700_000);
  });

  it('does not change federal directory default engine', () => {
    delete process.env.DIRECTORY_QUERY_ENGINE;
    assert.equal(resolveDirectoryQueryEngine(), 'db');
  });
});
