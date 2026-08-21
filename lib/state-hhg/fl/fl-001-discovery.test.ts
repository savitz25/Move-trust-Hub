import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { test } from 'node:test';
import {
  matchStateRegistryIdentity,
  type CanonicalProviderIdentity,
} from '@/lib/state-hhg/identity';
import { parseFdacsCsv } from '@/lib/state-hhg/fl/adapter';

const candidates: CanonicalProviderIdentity[] = [
  {
    companyId: 'curry-moving',
    legalName: 'CURRY MOVING & STORAGE, INC.',
    dbaName: null,
    publicName: 'Curry Moving & Storage',
    usdot: '1111111',
    phone: '9416272800',
    address: '100 MAIN ST',
    city: 'PORT CHARLOTTE',
    state: 'FL',
    postalCode: '33948',
  },
];

test('FL-001 name-only similarity is not a verified match', () => {
  const result = matchStateRegistryIdentity(
    {
      legalName: 'CURRY MOVING SERVICES LLC',
      dba: null,
      usdot: null,
      phone: '3055550000',
      physicalAddress: '9 OTHER RD',
      city: 'MIAMI',
      postalCode: '33101',
      statusNormalized: 'active',
      roleClass: 'mover',
      authorityNumber: 'IM9999',
    },
    candidates
  );
  assert.notEqual(result.disposition, 'MATCHED_EXISTING');
  assert.equal(result.matchMethod, 'none');
});

test('FL-001 exact legal name + exact phone can verify without USDOT', () => {
  const result = matchStateRegistryIdentity(
    {
      legalName: 'CURRY MOVING & STORAGE, INC.',
      dba: null,
      usdot: null,
      phone: '941-627-2800',
      physicalAddress: null,
      city: 'PORT CHARLOTTE',
      postalCode: null,
      statusNormalized: 'active',
      roleClass: 'mover',
      authorityNumber: 'IM107',
    },
    candidates
  );
  assert.equal(result.disposition, 'MATCHED_EXISTING');
  assert.equal(result.matchMethod, 'exact_legal_name_and_phone');
});

test('FL-001 franchise/network names fail closed without USDOT', () => {
  const result = matchStateRegistryIdentity(
    {
      legalName: 'LIGHTNER MOVING INC',
      dba: 'TWO MEN AND A TRUCK',
      usdot: null,
      phone: '3055551212',
      physicalAddress: '100 MAIN ST',
      city: 'MIAMI',
      postalCode: '33101',
      statusNormalized: 'active',
      roleClass: 'mover',
      authorityNumber: 'IM2068',
    },
    candidates
  );
  assert.equal(result.disposition, 'REVIEW_REQUIRED');
  assert.equal(result.franchiseSafetyHold, true);
});

test('FL-001 new-portal CSV exposes Contracted Movers column even when empty', () => {
  const csv = `"Business Name","Location","Phone","Email","License Number","License Type","Status","Issue Date","Expire Date","DBA/Other Names","Contracted Movers"
"Nelan Relocation Services, Inc.","19114 Bates Avenue, Eustis, FL 32736  ","(352) 483-3000","nelanrelocation@yahoo.com","MB111","Moving Broker","Registered","08/14/2026","03/14/2028","",""
`;
  const rows = parseFdacsCsv(csv);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].licenseNumber, 'MB111');
  assert.equal(rows[0].contractedMovers, '');
});

test('FL-001 audit artifact records zero Google Places requests', () => {
  const report = JSON.parse(
    readFileSync(resolve(process.cwd(), 'docs/task-fl-001-audit.json'), 'utf8')
  ) as { google_places_requests: number };
  assert.equal(report.google_places_requests, 0);
});
