import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  classifyFederalHhg,
  classifyFederalHhgDockets,
  type LiAuthorityRow,
} from '@/lib/federal-hhg/classify';
import { matchStagedToCompanies } from '@/lib/federal-hhg/match';
import { normalizeMc, normalizeUsdot } from '@/lib/federal-hhg/normalize';
import { TASK_002_PROTECTED_IDENTITIES } from '@/lib/federal-hhg/protected-identities';
import { isSeoIndexableCompany } from '@/lib/provider/publication';

function row(partial: Partial<LiAuthorityRow>): LiAuthorityRow {
  return {
    dotNumber: '1000000',
    docketNumber: 'MC100000',
    legalName: 'EXAMPLE LLC',
    dbaName: null,
    hhgChk: 'N',
    propertyChk: 'Y',
    commonStat: 'N',
    contractStat: 'N',
    brokerStat: 'N',
    ...partial,
  };
}

test('active HHG carrier → HHG_CARRIER', () => {
  assert.equal(
    classifyFederalHhg(
      row({ hhgChk: 'Y', commonStat: 'A', contractStat: 'N', brokerStat: 'N' })
    ).classification,
    'HHG_CARRIER'
  );
});

test('active HHG broker → HHG_BROKER', () => {
  assert.equal(
    classifyFederalHhg(
      row({ hhgChk: 'Y', commonStat: 'N', contractStat: 'N', brokerStat: 'A' })
    ).classification,
    'HHG_BROKER'
  );
});

test('independent carrier + broker → HHG_CARRIER_BROKER', () => {
  assert.equal(
    classifyFederalHhg(
      row({ hhgChk: 'Y', commonStat: 'A', contractStat: 'A', brokerStat: 'A' })
    ).classification,
    'HHG_CARRIER_BROKER'
  );
});

test('generic property carrier → NOT_HHG', () => {
  assert.equal(
    classifyFederalHhg(
      row({ hhgChk: 'N', propertyChk: 'Y', commonStat: 'A', brokerStat: 'N' })
    ).classification,
    'NOT_HHG'
  );
});

test('inactive HHG authority → INACTIVE', () => {
  assert.equal(
    classifyFederalHhg(
      row({ hhgChk: 'Y', commonStat: 'I', contractStat: 'I', brokerStat: 'N' })
    ).classification,
    'INACTIVE'
  );
});

test('USDOT registration without HHG authority is not VERIFIED HHG', () => {
  const result = classifyFederalHhg(
    row({ hhgChk: 'N', commonStat: 'A', contractStat: 'A', brokerStat: 'N' })
  );
  assert.equal(result.classification, 'NOT_HHG');
  assert.equal(result.hhgCarrierVerified, false);
  assert.equal(result.hhgBrokerVerified, false);
});

test('MC alone is insufficient without HHG authorization', () => {
  const result = classifyFederalHhg(
    row({ docketNumber: 'MC123456', hhgChk: 'N', commonStat: 'N', brokerStat: 'N' })
  );
  assert.equal(result.classification, 'NOT_HHG');
});

test('generic property broker is not an HHG broker', () => {
  assert.equal(
    classifyFederalHhg(
      row({ hhgChk: 'N', propertyChk: 'Y', brokerStat: 'A' })
    ).classification,
    'NOT_HHG'
  );
});

test('exact canonical USDOT match → MATCHED_EXISTING', () => {
  const match = matchStagedToCompanies(
    { usdot: '76235', mc: '15735', legalName: 'ALLIED VAN LINES INC' },
    [{ id: 'allied', usdotNumber: '76235', mcNumber: '15735', name: 'Allied Van Lines' }]
  );
  assert.equal(match.disposition, 'MATCHED_EXISTING');
  assert.equal(match.companyId, 'allied');
});

test('fuzzy-name match → IDENTITY_REVIEW_REQUIRED and never an automatic merge', () => {
  const match = matchStagedToCompanies(
    { usdot: '9999999', mc: '111', legalName: 'ALLIED VAN LINES FAKE LLC' },
    [{ id: 'allied', usdotNumber: '76235', mcNumber: '15735', name: 'Allied Van Lines' }]
  );
  assert.equal(match.disposition, 'IDENTITY_REVIEW_REQUIRED');
  assert.equal(match.companyId, null);
});

test('Task 002 van lines stay mapped to remediated USDOTs', () => {
  assert.equal(TASK_002_PROTECTED_IDENTITIES.allied, '76235');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.mayflower, '125563');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.atlas, '125550');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.wheaton, '70719');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.arpin, '49922');
  assert.equal(TASK_002_PROTECTED_IDENTITIES.national, '76628');
  assert.equal(TASK_002_PROTECTED_IDENTITIES['north-american'], '70851');
  const allied = matchStagedToCompanies(
    { usdot: '125563', mc: '2934', legalName: 'MAYFLOWER TRANSIT LLC' },
    [{ id: 'allied', usdotNumber: '76235', mcNumber: '15735', name: 'Allied Van Lines' }]
  );
  assert.notEqual(allied.companyId, 'allied');
});

test('staged new provider remains non-indexable', () => {
  assert.equal(
    isSeoIndexableCompany({ publicationState: 'INGESTED', indexable: false }),
    false
  );
});

test('Allied MC and FF dockets aggregate to carrier+broker without inheriting a second USDOT', () => {
  const result = classifyFederalHhgDockets([
    row({
      dotNumber: '00076235',
      docketNumber: 'MC015735',
      hhgChk: 'Y',
      commonStat: 'A',
      contractStat: 'A',
      brokerStat: 'A',
    }),
    row({
      dotNumber: '00076235',
      docketNumber: 'FF009490',
      hhgChk: 'N',
      commonStat: 'N',
      contractStat: 'A',
      brokerStat: 'N',
    }),
  ]);
  assert.equal(result.classification, 'HHG_CARRIER_BROKER');
  assert.equal(normalizeUsdot('00076235'), '76235');
  assert.equal(normalizeMc('MC015735'), '15735');
});
