import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  matchStateRegistryIdentity,
  resolveVerificationState,
} from '@/lib/state-hhg/identity';
import type { CanonicalProviderIdentity } from '@/lib/state-hhg/identity';

const baseCandidates: CanonicalProviderIdentity[] = [
  {
    companyId: 'acme-moving-fl',
    legalName: 'ACME MOVING LLC',
    dbaName: null,
    publicName: 'Acme Moving',
    usdot: '1234567',
    phone: '3055551212',
    address: '100 MAIN ST',
    city: 'MIAMI',
    state: 'FL',
    postalCode: '33101',
  },
  {
    companyId: 'other-co',
    legalName: 'OTHER CO INC',
    dbaName: null,
    publicName: 'Other',
    usdot: '9999999',
    phone: '8135559999',
    address: '9 OTHER RD',
    city: 'TAMPA',
    state: 'FL',
    postalCode: '33602',
  },
];

describe('state-hhg identity matching', () => {
  it('matches exact USDOT', () => {
    const result = matchStateRegistryIdentity(
      {
        legalName: 'ACME MOVING LLC',
        dba: null,
        usdot: '1234567',
        phone: null,
        physicalAddress: null,
        city: null,
        postalCode: null,
        statusNormalized: 'active',
        roleClass: 'mover',
        authorityNumber: 'IM100',
      },
      baseCandidates
    );
    assert.equal(result.disposition, 'MATCHED_EXISTING');
    assert.equal(result.matchMethod, 'exact_usdot');
    assert.equal(result.matchedCompanyId, 'acme-moving-fl');
    assert.equal(
      resolveVerificationState({
        disposition: result.disposition,
        statusNormalized: 'active',
        roleClass: 'mover',
        matchMethod: result.matchMethod,
        franchiseSafetyHold: false,
      }),
      'VERIFIED'
    );
  });

  it('matches legal name + address', () => {
    const result = matchStateRegistryIdentity(
      {
        legalName: 'Acme Moving, LLC',
        dba: null,
        usdot: null,
        phone: null,
        physicalAddress: '100 Main Street',
        city: 'Miami',
        postalCode: '33101',
        statusNormalized: 'active',
        roleClass: 'mover',
        authorityNumber: 'IM200',
      },
      baseCandidates
    );
    assert.equal(result.disposition, 'MATCHED_EXISTING');
    assert.equal(result.matchMethod, 'exact_legal_name_and_address');
  });

  it('matches legal name + phone', () => {
    const result = matchStateRegistryIdentity(
      {
        legalName: 'ACME MOVING LLC',
        dba: null,
        usdot: null,
        phone: '(305) 555-1212',
        physicalAddress: null,
        city: null,
        postalCode: null,
        statusNormalized: 'active',
        roleClass: 'mover',
        authorityNumber: 'IM201',
      },
      baseCandidates
    );
    assert.equal(result.disposition, 'MATCHED_EXISTING');
    assert.equal(result.matchMethod, 'exact_legal_name_and_phone');
  });

  it('fail-closes franchise brand without USDOT', () => {
    const result = matchStateRegistryIdentity(
      {
        legalName: 'NBF Moving, LLC',
        dba: 'Two Men and a Truck',
        usdot: null,
        phone: '8644442621',
        physicalAddress: '130 Four Points Way',
        city: 'Tallahassee',
        postalCode: '32305',
        statusNormalized: 'active',
        roleClass: 'mover',
        authorityNumber: 'IM2068',
      },
      baseCandidates
    );
    assert.equal(result.disposition, 'REVIEW_REQUIRED');
    assert.equal(result.reviewReason, 'franchise_or_network_brand_fail_closed');
    assert.equal(result.franchiseSafetyHold, true);
  });

  it('does not match name alone', () => {
    const result = matchStateRegistryIdentity(
      {
        legalName: 'ACME MOVING LLC',
        dba: null,
        usdot: null,
        phone: null,
        physicalAddress: null,
        city: 'Miami',
        postalCode: null,
        statusNormalized: 'active',
        roleClass: 'mover',
        authorityNumber: 'IM300',
      },
      baseCandidates
    );
    assert.equal(result.disposition, 'REVIEW_REQUIRED');
    assert.match(String(result.reviewReason), /insufficient|name_/);
  });

  it('marks new provider candidate when no hit', () => {
    const result = matchStateRegistryIdentity(
      {
        legalName: 'BRAND NEW LOCAL MOVERS LLC',
        dba: null,
        usdot: null,
        phone: '9545550100',
        physicalAddress: '1 New St',
        city: 'Fort Lauderdale',
        postalCode: '33301',
        statusNormalized: 'active',
        roleClass: 'mover',
        authorityNumber: 'IM9999',
      },
      baseCandidates
    );
    assert.equal(result.disposition, 'NEW_PROVIDER_CANDIDATE');
    assert.equal(
      resolveVerificationState({
        disposition: result.disposition,
        statusNormalized: 'active',
        roleClass: 'mover',
        matchMethod: result.matchMethod,
        franchiseSafetyHold: false,
      }),
      'UNRESOLVED'
    );
  });

  it('marks historical inactive', () => {
    const result = matchStateRegistryIdentity(
      {
        legalName: 'OLD MOVERS',
        dba: null,
        usdot: '1234567',
        phone: null,
        physicalAddress: null,
        city: null,
        postalCode: null,
        statusNormalized: 'inactive',
        roleClass: 'mover',
        authorityNumber: 'IM1',
      },
      baseCandidates
    );
    assert.equal(result.disposition, 'HISTORICAL');
  });

  it('usdot collision requires review', () => {
    const candidates: CanonicalProviderIdentity[] = [
      ...baseCandidates,
      {
        companyId: 'acme-dup',
        legalName: 'ACME OTHER',
        dbaName: null,
        publicName: null,
        usdot: '1234567',
        phone: null,
        address: null,
        city: null,
        state: 'FL',
        postalCode: null,
      },
    ];
    const result = matchStateRegistryIdentity(
      {
        legalName: 'ACME MOVING LLC',
        dba: null,
        usdot: '1234567',
        phone: null,
        physicalAddress: null,
        city: null,
        postalCode: null,
        statusNormalized: 'active',
        roleClass: 'mover',
        authorityNumber: 'IM100',
      },
      candidates
    );
    assert.equal(result.disposition, 'REVIEW_REQUIRED');
    assert.equal(result.reviewReason, 'usdot_collision_multiple_companies');
  });
});
