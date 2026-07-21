/**
 * Unit checks for admin trusted submitter recognition.
 * Run: npx tsx scripts/check-trusted-submitter.ts
 */
import {
  getTrustedSubmitterEmails,
  isTrustedSubmitterEmail,
  normalizeTrustedEmail,
} from '../lib/suggestions/trusted-emails';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

assert(normalizeTrustedEmail('  Info@MoveTrustHub.com ') === 'info@movetrusthub.com', 'normalize');
assert(isTrustedSubmitterEmail('info@movetrusthub.com'), 'info@ is trusted');
assert(isTrustedSubmitterEmail('INFO@MOVETRUSTHUB.COM'), 'info@ case-insensitive');
assert(!isTrustedSubmitterEmail('random@example.com'), 'random email not trusted');
assert(
  getTrustedSubmitterEmails().includes('info@movetrusthub.com'),
  'defaults include info@'
);

if (process.exitCode) {
  console.error('\nTrusted submitter checks failed.');
  process.exit(1);
}
console.log('\nAll trusted submitter checks passed.');
