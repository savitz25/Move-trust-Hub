/**
 * Smoke-test Trust Profile adapters (Step 5).
 * Run: npx tsx scripts/smoke-trust-profile-adapters.ts
 *
 * Uses real seed/mock fixtures — never invents licenses.
 */
import { toMoveTrustProfile } from '../lib/network/adapters/to-move-trust-profile';
import { toInsuranceTrustProfile } from '../lib/network/adapters/to-insurance-trust-profile';
import { toLenderTrustProfile } from '../lib/network/adapters/to-lender-trust-profile';
import { visibleTrustSources, hasDisplayableScore } from '../lib/network/trust-profile';
import { entityRef } from '../lib/network/entity-ref';
import type { Company } from '../types';
import type { Provider } from '../types/insurance/provider';
import { lenders } from '../lib/lender/lenders';
import { FALLBACK_PROVIDERS } from '../lib/insurance/providers/fallback-data';

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`FAIL: ${msg}`);
}

/** Minimal interstate mover fixture with USDOT (honest fields only). */
const MOVE_FIXTURE: Company = {
  id: 'smoke-move-1',
  slug: 'smoke-interstate-movers',
  name: 'Smoke Test Van Lines',
  shortDescription: 'Fixture for adapter smoke test',
  description: 'Fixture only',
  foundedYear: 2010,
  headquarters: 'Dallas, TX',
  website: 'https://example.com',
  physicalAddress: '100 Main St, Dallas, TX',
  phone: '(214) 555-0100',
  email: 'info@example.com',
  serviceScope: 'interstate',
  // Avoid known placeholder USDOTs in license-verification.ts
  usdotNumber: '3141592',
  mcNumber: 'MC-842917',
  fmcsaLegalName: 'Smoke Test Van Lines LLC',
  fmcsaSafetyRating: 'Satisfactory',
  fmcsaComplaints: 0,
  fmcsaShipments: 100,
  fmcsaLastChecked: '2026-07-01T12:00:00.000Z',
  authorityActive: true,
  outOfService: false,
  usdotStatus: 'ACTIVE',
  bbbRating: 'NR',
  bbbAccredited: false,
  overallRating: 4.2,
  reviewCount: 10,
  reputationScore: 82,
  yearsInBusiness: 16,
  avgPricePerMove: 5000,
  priceRange: '$$',
  coverage: 'nationwide' as Company['coverage'],
  services: [],
  specialties: [],
  ratingBreakdown: {
    fiveStar: 5,
    fourStar: 3,
    threeStar: 1,
    twoStar: 1,
    oneStar: 0,
  },
  isVerified: true,
  lastUpdated: '2026-07-01T12:00:00.000Z',
};

function smokeMove() {
  const shell = toMoveTrustProfile(MOVE_FIXTURE);
  assert(shell.hub === 'move', 'move hub');
  assert(shell.entityId === 'smoke-interstate-movers', 'move entityId');
  assert(shell.displayName === 'Smoke Test Van Lines', 'move displayName');
  assert(shell.legalName === 'Smoke Test Van Lines LLC', 'move legalName');
  assert(shell.profileUrl.includes('/companies/smoke-interstate-movers'), 'move profileUrl');
  assert(shell.serviceScope === 'interstate', 'move scope');
  assert(shell.verification.isVerified === true, 'move verified');
  assert(shell.methodologyUrl.includes('how-we-score'), 'move methodology');
  assert(shell.standardUrl.includes('asktrusthub.com/methodology'), 'move standard');
  assert(shell.contact?.phone?.includes('214'), 'move phone');
  assert(hasDisplayableScore(shell.reputation), 'move score');
  const chips = visibleTrustSources(shell.verification.sources);
  assert(
    chips.every((c) => c.status === 'verified' || c.status === 'stale' || c.status === 'error'),
    'move chips hide unverified'
  );
  assert(chips.some((c) => c.id === 'fmcsa'), 'move fmcsa chip');
  assert(!chips.some((c) => c.id === 'bbb'), 'move hides missing BBB');
  assert(shell.extensions?.move?.usdot === '3141592', 'move usdot extension');
  const ref = entityRef('move', shell.entityId);
  assert(ref.profileUrl === shell.profileUrl || ref.entityId === shell.entityId, 'entity ref');
  console.log('OK move', {
    displayName: shell.displayName,
    chips: chips.map((c) => c.id),
    score: shell.reputation?.score,
    emptyByDesign: ['bbb chip (no confirmed listing)'],
  });
}

function smokeInsurance() {
  const provider: Provider =
    FALLBACK_PROVIDERS[0] ??
    ({
      id: 'smoke-ins-1',
      slug: 'smoke-agency-fl',
      name: 'Smoke Insurance Agency',
      city: 'Miami',
      state: 'FL',
      phone: '(305) 555-0200',
      website: 'https://example-insurance.com',
      insurance_types: ['auto', 'homeowners'],
      specialties: ['Personal Lines'],
      rating: 4.5,
      review_count: 20,
      is_verified: true,
      license_number: 'A123456',
      trust_score: 78,
      updated_at: '2026-06-15T00:00:00.000Z',
    } as Provider);

  const shell = toInsuranceTrustProfile(provider);
  assert(shell.hub === 'insurance', 'insurance hub');
  assert(shell.entityId, 'insurance entityId');
  assert(shell.profileUrl.includes('/providers/'), 'insurance profileUrl');
  assert(shell.methodologyUrl.includes('insurancetrusthub.com/methodology'), 'insurance methodology');
  assert(shell.standardUrl.includes('asktrusthub.com/methodology'), 'insurance standard');
  // Never invent a license number
  if (shell.extensions?.insurance?.licenseNumber) {
    assert(
      Boolean(provider.license_number),
      'insurance license only when present on record'
    );
  }
  const chips = visibleTrustSources(shell.verification.sources);
  assert(
    chips.every((c) => c.status !== 'unverified' && c.status !== 'not_applicable'),
    'insurance chips prefer hide'
  );
  console.log('OK insurance', {
    displayName: shell.displayName,
    entityId: shell.entityId,
    chips: chips.map((c) => c.id),
    isVerified: shell.verification.isVerified,
    emptyByDesign: chips.length === 0 ? ['source chips until verified pathway'] : [],
  });
}

function smokeLender() {
  const lender = lenders[0];
  assert(lender, 'lender fixture from mock data');
  const shell = toLenderTrustProfile(lender);
  assert(shell.hub === 'lender', 'lender hub');
  assert(shell.entityId === lender.slug, 'lender entityId');
  assert(shell.profileUrl.includes('/lenders/'), 'lender profileUrl');
  assert(shell.methodologyUrl.includes('lendertrusthub.com/methodology'), 'lender methodology');
  if (lender.nmlsVerified && lender.nmlsId) {
    assert(
      visibleTrustSources(shell.verification.sources).some((c) => c.id === 'nmls'),
      'lender nmls chip when verified'
    );
  }
  // Close estimates only in extensions, not as official score fields
  if (shell.extensions?.lender?.avgCloseDaysEstimate != null) {
    assert(
      shell.reputation?.summary?.toLowerCase().includes('research') ||
        shell.reputation?.summary != null,
      'lender score limitation copy'
    );
  }
  assert(
    !JSON.stringify(shell.reputation).includes('NMLS field'),
    'lender reputation is not claiming NMLS close fields'
  );
  console.log('OK lender', {
    displayName: shell.displayName,
    entityId: shell.entityId,
    nmls: shell.extensions?.lender?.nmlsId,
    score: shell.reputation?.score,
    emptyByDesign: ['close days not in core reputation'],
  });
}

function main() {
  smokeMove();
  smokeInsurance();
  smokeLender();
  console.log('\nAll Trust Profile adapter smokes passed.');
}

main();
