/**
 * Move V2.1: Insurance after destination; Lender only when buying.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../lib/network/network-handoff.ts'),
  'utf8'
);
let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    failed += 1;
    console.error('FAIL', msg);
  }
}
assert(src.includes("intent === 'buy'"), 'lender gated on buy intent');
assert(src.includes("Research insurance"), 'insurance CTA');
assert(src.includes('Mortgage research is not assumed'), 'renters not pushed to mortgage');
const events = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../lib/network/journey-events.ts'),
  'utf8'
);
const dest = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../components/network/continue-trust-journey.tsx'),
  'utf8'
);
assert(events.includes('journey_handoff_click'), 'Move uses journey_handoff_click');
assert(dest.includes('trackJourneyHandoff'), 'Move destination cards instrumented');
if (failed) {
  console.error(`${failed} failed`);
  process.exit(1);
}
console.log('Move V2.1 journey checks passed');
