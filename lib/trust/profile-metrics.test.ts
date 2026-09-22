import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  formatComplaintDisplayLabel,
  getComplaintDisplay,
  MIN_SHIPMENTS_FOR_NORMALIZED_COMPLAINT_RATE,
} from '@/lib/trust/profile-metrics';

test('getComplaintDisplay: zero shipments -> none (no card should render)', () => {
  const d = getComplaintDisplay({ fmcsaComplaints: 0, fmcsaShipments: 0 });
  assert.equal(d.mode, 'none');
});

test('getComplaintDisplay: tiny real denominator -> low_volume, never a false-precision rate', () => {
  // The ticket's own example: 0 complaints on 1 shipment must not render "0.00 per 1,000".
  const d = getComplaintDisplay({ fmcsaComplaints: 0, fmcsaShipments: 1 });
  assert.equal(d.mode, 'low_volume');
  const label = formatComplaintDisplayLabel(d);
  assert.ok(!/0\.00/.test(label), `label must not contain a false-precision rate: ${label}`);
  assert.match(label, /too little shipment volume/i);
  assert.match(label, /0 complaints recorded on 1 reported shipment/i);
});

test('getComplaintDisplay: just below the threshold -> low_volume', () => {
  const d = getComplaintDisplay({
    fmcsaComplaints: 2,
    fmcsaShipments: MIN_SHIPMENTS_FOR_NORMALIZED_COMPLAINT_RATE - 1,
  });
  assert.equal(d.mode, 'low_volume');
});

test('getComplaintDisplay: at/above the threshold -> normalized rate', () => {
  const d = getComplaintDisplay({
    fmcsaComplaints: 187,
    fmcsaShipments: 124000,
  });
  assert.equal(d.mode, 'rate');
  if (d.mode === 'rate') {
    assert.equal(d.ratioPer1000, '1.51');
  }
  assert.match(formatComplaintDisplayLabel(d), /per 1,000 shipments/);
});

test('getComplaintDisplay: exactly at the threshold uses the normalized rate, not low-volume wording', () => {
  const d = getComplaintDisplay({
    fmcsaComplaints: 0,
    fmcsaShipments: MIN_SHIPMENTS_FOR_NORMALIZED_COMPLAINT_RATE,
  });
  assert.equal(d.mode, 'rate');
});
