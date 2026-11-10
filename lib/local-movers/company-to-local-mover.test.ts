import assert from 'node:assert/strict';
import test from 'node:test';
import { companyToLocalMover } from '@/lib/local-movers/company-to-local-mover';

const base = {
  slug: 'example-movers',
  name: 'Example Movers',
  headquarters: 'Miami, FL',
};

test('derives USDOT status from authority columns when the missing column is absent', () => {
  assert.equal(
    companyToLocalMover({
      ...base,
      usdot_number: '1234567',
      authority_active: true,
      out_of_service: false,
    }).usdotStatus,
    'ACTIVE'
  );
  assert.equal(
    companyToLocalMover({
      ...base,
      usdot_number: '1234567',
      authority_active: false,
    }).usdotStatus,
    'INACTIVE'
  );
  assert.equal(
    companyToLocalMover({
      ...base,
      usdot_number: '1234567',
      authority_active: true,
      out_of_service: true,
    }).usdotStatus,
    'OUT OF SERVICE'
  );
});

test('does not invent ACTIVE from a USDOT number or from authority without a number', () => {
  assert.equal(
    companyToLocalMover({
      ...base,
      usdot_number: '1234567',
      authority_active: null,
    }).usdotStatus,
    null
  );
  assert.equal(
    companyToLocalMover({
      ...base,
      usdot_number: null,
      authority_active: true,
    }).usdotStatus,
    null
  );
  assert.equal(companyToLocalMover(base).usdotStatus, null);
});

test('keeps an explicit USDOT status label when a caller already has one', () => {
  assert.equal(
    companyToLocalMover({
      ...base,
      usdot_number: null,
      authority_active: true,
      usdot_status: 'INACTIVE',
    }).usdotStatus,
    'INACTIVE'
  );
});
