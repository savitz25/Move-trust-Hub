import assert from 'node:assert/strict';
import test from 'node:test';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';

const base = {
  slug: 'example-movers',
  name: 'Example Movers',
  headquarters: 'Miami, FL',
};

test('USDOT registration active stays active when for-hire authority is inactive', () => {
  const mover = companyToLocalMover({
    ...base,
    service_scope: 'interstate',
    usdot_number: '1234567',
    authority_active: false,
    out_of_service: false,
    fmcsa_raw: {
      statusCode: 'A',
      allowedToOperate: 'N',
      commonAuthorityStatus: 'I',
      contractAuthorityStatus: 'N',
      brokerAuthorityStatus: 'N',
      oosDate: null,
    },
  });

  assert.equal(mover.usdotStatus, 'ACTIVE');
  assert.equal(mover.regulatoryStanding?.usdotRegistration, 'ACTIVE');
  assert.equal(mover.regulatoryStanding?.basis, 'federal');
  assert.equal(mover.regulatoryStanding?.operatingAuthority, 'INACTIVE');
  assert.equal(mover.authorityActive, false);
  assert.equal(mover.outOfService, false);
  assert.equal(mover.regulatoryStanding?.outOfServiceOrder, false);
});

test('inactive USDOT registration is not overwritten by active for-hire authority', () => {
  const mover = companyToLocalMover({
    ...base,
    service_scope: 'interstate',
    usdot_number: '1234567',
    authority_active: true,
    out_of_service: false,
    fmcsa_raw: {
      statusCode: 'I',
      allowedToOperate: 'Y',
      commonAuthorityStatus: 'A',
      contractAuthorityStatus: 'N',
      brokerAuthorityStatus: 'N',
      oosDate: null,
    },
  });

  assert.equal(mover.usdotStatus, 'INACTIVE');
  assert.equal(mover.regulatoryStanding?.usdotRegistration, 'INACTIVE');
  assert.equal(mover.regulatoryStanding?.operatingAuthority, 'ACTIVE');
  assert.equal(mover.authorityActive, true);
  assert.equal(mover.regulatoryStanding?.basis, 'federal');
});

test('for-hire authority with no codes is none, distinct from inactive registration', () => {
  const mover = companyToLocalMover({
    ...base,
    service_scope: 'interstate',
    usdot_number: '1234567',
    authority_active: false,
    fmcsa_raw: {
      statusCode: 'A',
      allowedToOperate: 'Y',
      commonAuthorityStatus: 'N',
      contractAuthorityStatus: 'N',
      brokerAuthorityStatus: 'N',
      oosDate: null,
    },
  });

  assert.equal(mover.usdotStatus, 'ACTIVE');
  assert.equal(mover.regulatoryStanding?.operatingAuthority, 'NONE');
  assert.equal(mover.authorityActive, false);
});

test('no authority record and no registration evidence stays unknown', () => {
  const mover = companyToLocalMover({
    ...base,
    service_scope: 'interstate',
    usdot_number: '1234567',
    authority_active: false,
    out_of_service: false,
    usdot_status: 'INACTIVE',
    fmcsa_raw: {
      allowedToOperate: 'N',
      dotNumber: '1234567',
    },
  });

  assert.equal(mover.usdotStatus, null);
  assert.equal(mover.regulatoryStanding?.usdotRegistration, 'UNKNOWN');
  assert.equal(mover.regulatoryStanding?.operatingAuthority, 'NONE');
  assert.equal(mover.regulatoryStanding?.basis, 'unknown');
  assert.equal(mover.outOfService, false);
  assert.notEqual(mover.usdotStatus, 'INACTIVE');
  assert.notEqual(mover.usdotStatus, 'ACTIVE');
});

test('an out-of-service order stays separate from USDOT registration', () => {
  const fromCensusDate = companyToLocalMover({
    ...base,
    service_scope: 'interstate',
    usdot_number: '1234567',
    authority_active: true,
    out_of_service: false,
    fmcsa_raw: {
      statusCode: 'A',
      allowedToOperate: 'N',
      commonAuthorityStatus: 'A',
      contractAuthorityStatus: 'N',
      brokerAuthorityStatus: 'N',
      oosDate: '2026-10-07',
    },
  });
  assert.equal(fromCensusDate.outOfService, true);
  assert.equal(fromCensusDate.regulatoryStanding?.outOfServiceOrder, true);
  assert.equal(fromCensusDate.usdotStatus, 'ACTIVE');
  assert.equal(fromCensusDate.regulatoryStanding?.usdotRegistration, 'ACTIVE');
  assert.equal(fromCensusDate.regulatoryStanding?.operatingAuthority, 'ACTIVE');

  const fromSupplemental = companyToLocalMover({
    ...base,
    slug: 'supplemental-oos',
    usdot_number: '1234567',
    authority_active: false,
    fmcsa_raw: {
      statusCode: 'A',
      oosDate: null,
      commonAuthorityStatus: 'I',
      contractAuthorityStatus: 'N',
      brokerAuthorityStatus: 'N',
      _supplemental: { oos: [{ oosDate: '2020-01-02' }] },
    },
  });
  assert.equal(fromSupplemental.outOfService, true);
  assert.equal(fromSupplemental.usdotStatus, 'ACTIVE');
  assert.equal(fromSupplemental.regulatoryStanding?.operatingAuthority, 'INACTIVE');

  const fromColumn = companyToLocalMover({
    ...base,
    slug: 'column-oos',
    service_scope: 'interstate',
    usdot_number: '1234567',
    authority_active: true,
    out_of_service: true,
    fmcsa_raw: {
      statusCode: 'I',
      allowedToOperate: 'Y',
      commonAuthorityStatus: 'A',
      oosDate: null,
    },
  });
  assert.equal(fromColumn.outOfService, true);
  assert.equal(fromColumn.usdotStatus, 'INACTIVE');
  assert.equal(fromColumn.regulatoryStanding?.operatingAuthority, 'ACTIVE');
});

test('state-only intrastate movers stay blank and keep profile links', () => {
  const mover = companyToLocalMover({
    ...base,
    service_scope: 'intrastate',
    usdot_number: null,
    mc_number: null,
    authority_active: true,
    out_of_service: false,
    usdot_status: 'ACTIVE',
    fmcsa_raw: null,
  });

  assert.equal(mover.usdotStatus, null);
  assert.equal(mover.regulatoryStanding?.basis, 'state_only');
  assert.equal(mover.regulatoryStanding?.usdotRegistration, 'UNKNOWN');
  assert.equal(mover.regulatoryStanding?.operatingAuthority, 'NONE');
  assert.equal(mover.outOfService, false);
  assert.equal(mover.authorityActive, true);
  assert.equal(mover.isLocalOnly, true);
  assert.equal(mover.id, 'directory-example-movers');
  assert.equal(mover.profileSlug, 'example-movers');
  assert.notEqual(mover.usdotStatus, 'ACTIVE');
  assert.notEqual(mover.usdotStatus, 'INACTIVE');
});

test('a census Pending status is not an active or inactive USDOT registration', () => {
  const mover = companyToLocalMover({
    ...base,
    service_scope: 'interstate',
    usdot_number: '1234567',
    authority_active: true,
    fmcsa_raw: {
      statusCode: 'Pending',
      allowedToOperate: 'Y',
      commonAuthorityStatus: 'A',
    },
  });

  assert.equal(mover.usdotStatus, null);
  assert.equal(mover.regulatoryStanding?.usdotRegistration, 'UNKNOWN');
  assert.equal(mover.regulatoryStanding?.basis, 'federal');
  assert.equal(mover.regulatoryStanding?.operatingAuthority, 'ACTIVE');
});
