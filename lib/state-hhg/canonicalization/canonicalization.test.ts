import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  allocateCompanySlug,
  buildStateOnlyCompanyId,
  normalizeAuthorityToken,
} from '@/lib/state-hhg/canonicalization/ids';
import { classifyNewProviderReadiness } from '@/lib/state-hhg/discovery/readiness';
import {
  GOOGLE_PLACES_REQUESTS,
  RETIRED_RADIUS_MODELS,
} from '@/lib/state-hhg/discovery/types';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';
import { isConsumerVisibleCompany, isSeoIndexableCompany } from '@/lib/provider/publication';

describe('011D.2A canonicalization guards', () => {
  it('Google remains 0 and radius stays disabled', () => {
    assert.equal(GOOGLE_PLACES_REQUESTS, 0);
    assert.equal(RETIRED_RADIUS_MODELS.consumerEnabled, false);
  });

  it('builds deterministic state-only ids', () => {
    assert.equal(buildStateOnlyCompanyId('FL', 'IM2736'), 'fl-im-2736');
    assert.equal(buildStateOnlyCompanyId('WA', 'HG070844'), 'wa-hg-070844');
    assert.equal(normalizeAuthorityToken('FL', 'IM2736'), 'im-2736');
  });

  it('disambiguates slug collisions with authority token', () => {
    const taken = new Set(['acme-movers']);
    const a = allocateCompanySlug({
      displayName: 'Acme Movers',
      stateCode: 'FL',
      authorityNumber: 'IM100',
      takenSlugs: taken,
    });
    assert.equal(a.collision, true);
    assert.match(a.slug, /fl-im-100/);
  });

  it('READY requires phone, physical address, home county, active mover', () => {
    const ready = classifyNewProviderReadiness({
      stagingKey: 'FL:IM1',
      stateCode: 'FL',
      authorityNumber: 'IM1',
      legalName: 'Palm Movers LLC',
      dba: null,
      disposition: 'NEW_PROVIDER_CANDIDATE',
      statusNormalized: 'active',
      roleClass: 'mover',
      usdot: null,
      phone: '5615551212',
      email: null,
      physicalAddress: '100 Main St, West Palm Beach, FL',
      countyFips: '12099',
      geocodeStatus: 'MATCH',
    });
    assert.equal(ready.readiness, 'READY_FOR_CANONICALIZATION');

    const noPhone = classifyNewProviderReadiness({
      stagingKey: 'FL:IM2',
      stateCode: 'FL',
      authorityNumber: 'IM2',
      legalName: 'Palm Movers LLC',
      dba: null,
      disposition: 'NEW_PROVIDER_CANDIDATE',
      statusNormalized: 'active',
      roleClass: 'mover',
      usdot: null,
      phone: null,
      email: null,
      physicalAddress: '100 Main St, West Palm Beach, FL',
      countyFips: '12099',
      geocodeStatus: 'MATCH',
    });
    assert.equal(noPhone.readiness, 'ADDRESS_UNRESOLVED');
  });

  it('excludes broker, inactive, franchise, review', () => {
    assert.equal(
      classifyNewProviderReadiness({
        stagingKey: 'FL:IM3',
        stateCode: 'FL',
        authorityNumber: 'IM3',
        legalName: 'Broker Co',
        dba: null,
        disposition: 'NEW_PROVIDER_CANDIDATE',
        statusNormalized: 'active',
        roleClass: 'broker',
        usdot: null,
        phone: '5615551212',
        email: null,
        physicalAddress: '100 Main St',
        countyFips: '12099',
        geocodeStatus: 'MATCH',
      }).readiness,
      'REVIEW_REQUIRED'
    );
    assert.equal(
      classifyNewProviderReadiness({
        stagingKey: 'FL:IM4',
        stateCode: 'FL',
        authorityNumber: 'IM4',
        legalName: 'Old Co',
        dba: null,
        disposition: 'NEW_PROVIDER_CANDIDATE',
        statusNormalized: 'inactive',
        roleClass: 'mover',
        usdot: null,
        phone: '5615551212',
        email: null,
        physicalAddress: '100 Main St',
        countyFips: '12099',
        geocodeStatus: 'MATCH',
      }).readiness,
      'INACTIVE_HOLD'
    );
    assert.equal(
      isFranchiseOrNetworkBrandName('Two Men and a Truck of Boca'),
      true
    );
    assert.equal(
      classifyNewProviderReadiness({
        stagingKey: 'FL:IM5',
        stateCode: 'FL',
        authorityNumber: 'IM5',
        legalName: 'Local LLC',
        dba: 'Two Men and a Truck of Boca',
        disposition: 'NEW_PROVIDER_CANDIDATE',
        statusNormalized: 'active',
        roleClass: 'mover',
        usdot: null,
        phone: '5615551212',
        email: null,
        physicalAddress: '100 Main St',
        countyFips: '12099',
        geocodeStatus: 'MATCH',
      }).readiness,
      'REVIEW_REQUIRED'
    );
  });

  it('INGESTED companies are not consumer-visible or SEO indexable', () => {
    assert.equal(
      isConsumerVisibleCompany({ publicationState: 'INGESTED' }),
      false
    );
    assert.equal(
      isSeoIndexableCompany({ publicationState: 'INGESTED', indexable: false }),
      false
    );
  });

  it('PO box fails closed', () => {
    assert.equal(
      classifyNewProviderReadiness({
        stagingKey: 'FL:IM6',
        stateCode: 'FL',
        authorityNumber: 'IM6',
        legalName: 'Mail Co',
        dba: null,
        disposition: 'NEW_PROVIDER_CANDIDATE',
        statusNormalized: 'active',
        roleClass: 'mover',
        usdot: null,
        phone: '5615551212',
        email: null,
        physicalAddress: 'PO Box 99, Miami FL',
        countyFips: '12086',
        geocodeStatus: 'MATCH',
      }).readiness,
      'ADDRESS_UNRESOLVED'
    );
  });
});
