import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toMoveTrustProfile } from '@/lib/network/adapters/to-move-trust-profile';
import { FL_FDACS_VERIFICATION_WORDING } from '@/lib/state-hhg/fl/profile-presentation';
import { FL_NO_FEDERAL_ID_IN_MTH_DATA } from '@/lib/state-hhg/fl/profile-presentation';
import type { Company } from '@/types';

function company(partial: Partial<Company> & Pick<Company, 'id' | 'slug' | 'name'>): Company {
  return {
    shortDescription: '',
    description: '',
    foundedYear: 2010,
    headquarters: 'Clearwater, FL',
    website: '',
    physicalAddress: '1900 FLORA RD',
    phone: '7274460712',
    email: '',
    serviceScope: 'intrastate',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    authorityActive: false,
    outOfService: false,
    bbbRating: 'NR',
    bbbAccredited: false,
    overallRating: 0,
    reviewCount: 0,
    reputationScore: 0,
    yearsInBusiness: 0,
    avgPricePerMove: 0,
    priceRange: '$',
    coverage: 'local',
    services: [],
    specialties: [],
    ratingBreakdown: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    isVerified: false,
    lastUpdated: '2026-08-22T14:45:00.000Z',
    ...partial,
  } as Company;
}

test('Wave 1 PUBLISHABLE shell uses FDACS primary label, not Verify USDOT empty-state', () => {
  const shell = toMoveTrustProfile(
    company({
      id: 'fl-im-1025',
      slug: 'gentletouch-moving-company',
      name: 'Gentletouch Moving Company',
      publicationState: 'PUBLISHABLE',
      usdotNumber: '',
      mcNumber: '',
    })
  );
  assert.equal(shell.verification.primaryLabel, FL_FDACS_VERIFICATION_WORDING);
  assert.equal(shell.verification.isVerified, true);
  assert.ok(shell.verification.sources.some((s) => s.id === 'fdacs'));
  assert.ok(!shell.verification.sources.some((s) => s.id === 'fmcsa'));
  assert.doesNotMatch(shell.verification.primaryLabel, /Verify USDOT on FMCSA SAFER/i);
  assert.equal(shell.extensions?.move?.usdot, undefined);
  assert.equal(shell.extensions?.move?.mcNumber, undefined);
  assert.equal(FL_NO_FEDERAL_ID_IN_MTH_DATA.includes('federal mover identifier'), true);
});

test('KEEP_80 / non-wave companies still get FMCSA-framed empty-state when no DOT', () => {
  const shell = toMoveTrustProfile(
    company({
      id: 'fl-im-100002',
      slug: 'i-95-relocation-inc',
      name: 'I 95 Relocation Inc.',
      publicationState: 'PUBLISHABLE',
      usdotNumber: '',
      mcNumber: '',
    })
  );
  assert.equal(shell.verification.primaryLabel, 'Verify USDOT on FMCSA SAFER');
  assert.ok(!shell.verification.sources.some((s) => s.id === 'fdacs'));
});
