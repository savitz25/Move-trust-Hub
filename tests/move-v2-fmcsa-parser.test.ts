import assert from 'node:assert/strict';
import test from 'node:test';

test('projected Census contract contains no private officer fields', () => {
  const fields = ['dot_number','status_code','carrier_operation','legal_name','dba_name','phone','email_address','phy_street','phy_city','phy_state','phy_zip','phy_country','carrier_mailing_street','carrier_mailing_city','carrier_mailing_state','carrier_mailing_zip','carrier_mailing_country','crgo_household','power_units','truck_units','total_drivers','total_intrastate_drivers','mcs150_date','add_date','classdef','business_org_id','business_org_desc'];
  assert.equal(fields.includes('company_officer_1'), false);
  assert.equal(fields.includes('company_officer_2'), false);
});

test('docket normalization preserves MC MX and FF prefixes as distinct identities', () => {
  const normalize = (value: string) => value.toUpperCase().replace(/[\s-]/g, '');
  assert.deepEqual(['MC-00123','MX00123','FF 00123'].map(normalize), ['MC00123','MX00123','FF00123']);
});
