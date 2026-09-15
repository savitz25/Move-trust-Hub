/**
 * Smoke-test the Move Trust Profile adapter (Step 5).
 * Run: npx tsx scripts/smoke-trust-profile-adapters.ts
 *
 * Uses real seed/mock fixtures — never invents licenses.
 *
 * The Insurance/Lender adapters this once also smoke-tested were removed
 * under TH-LEGACY-CONTAIN-001 — they had zero real callers in Move and only
 * duplicated the standalone InsuranceTrustHub/LenderTrustHub products.
 */
import { toMoveTrustProfile } from '../lib/network/adapters/to-move-trust-profile';
import { visibleTrustSources, hasDisplayableScore } from '../lib/network/trust-profile';
import { entityRef } from '../lib/network/entity-ref';
import type { Company } from '../types';

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

function main() {
  smokeMove();
  console.log('\nAll Trust Profile adapter smokes passed.');
}

main();
