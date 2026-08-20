import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveCompanyCoverageDisplay } from '@/lib/map/resolve-company-coverage-display';

test('federal HHG Wave 1 coverage does not invent HQ or national service areas', () => {
  const result = resolveCompanyCoverageDisplay({
    coverage:
      'Interstate household-goods authority — confirm origin and destination with this company',
    headquarters: 'Boise, ID',
    assignmentStateSlugs: [],
  });
  assert.equal(result.isNational, false);
  assert.equal(result.coveredStateSlugs.size, 0);
  assert.match(result.description, /confirm origin and destination/i);
});
