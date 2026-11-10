import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveCompanyTypeBadges } from '@/lib/companies/type-badges';
import { countyCardTypeScope, listedMoverProfileSlug } from '@/lib/local-movers/county-card-authority';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';

test('state-only movers are not represented as federally authorized', () => {
  const mover = companyToLocalMover({
    slug: 'brothers-ez-moving-of-tampa',
    name: 'Brothers EZ Moving of Tampa',
    headquarters: '1220 S Dale Mabry Hwy Ste 205, Tampa, FL 33629',
    service_scope: 'intrastate',
    usdot_number: null,
    mc_number: null,
    authority_active: true,
    out_of_service: false,
    usdot_status: 'ACTIVE',
    fmcsa_raw: null,
    services: ['Local Mover'],
  });

  assert.equal(mover.usdotStatus, null);
  assert.equal(mover.regulatoryStanding?.basis, 'state_only');
  assert.equal(mover.headquartersState, 'FL');
  assert.equal(mover.city.toLowerCase(), 'tampa');

  const scope = countyCardTypeScope(mover);
  assert.equal(scope.serviceScope, 'intrastate');
  assert.equal(scope.isLocalOnly, true);

  const badges = resolveCompanyTypeBadges({
    ...scope,
    services: mover.services,
    usdotNumber: undefined,
    mcNumber: undefined,
  });
  assert.equal(
    badges.some((badge) => /interstate/i.test(badge.label)),
    false
  );
  assert.equal(listedMoverProfileSlug(mover), 'brothers-ez-moving-of-tampa');
  assert.equal(listedMoverProfileSlug({ profileSlug: '  ' }), '');
  assert.equal(
    listedMoverProfileSlug({ profileSlug: 'hidden-mover', listingSource: 'catalog' }),
    ''
  );
  assert.equal(
    listedMoverProfileSlug({
      profileSlug: 'hidden-mover',
      listingSource: 'catalog',
      profilePublished: true,
    }),
    'hidden-mover'
  );
});

test('an interstate carrier with census evidence keeps a federal type scope', () => {
  const mover = companyToLocalMover({
    slug: 'example-carrier',
    name: 'Example Carrier',
    headquarters: 'Houston, TX',
    service_scope: 'interstate',
    usdot_number: '1234567',
    authority_active: true,
    fmcsa_raw: { statusCode: 'A', commonAuthorityStatus: 'A' },
    entity_type: 'Carrier',
  });
  assert.equal(mover.regulatoryStanding?.basis, 'federal');
  assert.equal(countyCardTypeScope(mover).serviceScope, 'interstate');
});
