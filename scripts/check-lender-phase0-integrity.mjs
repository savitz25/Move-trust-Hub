/**
 * Lender Trust Hub Phase 0 — data integrity static checks.
 * Run: node scripts/check-lender-phase0-integrity.mjs
 */
import fs from 'fs';
import path from 'path';

const checks = [];
function ok(name, cond) {
  checks.push({ name, pass: Boolean(cond) });
}
function read(p) {
  return fs.readFileSync(p, 'utf8');
}

const nmls = read('lib/lender/verification/nmls.ts');
ok('cleanNmlsId rejects placeholders', nmls.includes('SEE-NMLS') || nmls.includes('see-nmls'));
ok('resolveNmlsVerification exists', nmls.includes('resolveNmlsVerification'));
ok('hard badge requires verified flag + ID', nmls.includes('showNmlsVerifiedBadge'));
ok('nmls_id_verified level', nmls.includes('nmls_id_verified'));

const phone = read('lib/lender/verification/phone.ts');
ok('555 exchange treated as placeholder', phone.includes("=== '555'") || phone.includes('555'));
ok('cleanDisplayPhone', phone.includes('cleanDisplayPhone'));

const perf = read('lib/lender/verification/performance-metrics.ts');
ok('closing performance suppressed without provenance', perf.includes('NO_CLOSING_PERFORMANCE_LABEL'));
ok('seed close not displayable by default', perf.includes('displayable: false'));

const sanitize = read('lib/lender/verification/sanitize-lender.ts');
ok('sanitizeLender wires NMLS + phone + close', sanitize.includes('sanitizeLender'));
ok('finalizeLenderCatalog applies entity trust', sanitize.includes('applyEntityTrustScores'));

const entity = read('lib/lender/verification/entity-identity.ts');
ok('entity key by NMLS', entity.includes('nmls:'));
ok('dedupe by entity', entity.includes('dedupeLendersByEntity'));

const counts = read('lib/lender/verification/counts.ts');
ok('distinct vs branch counts', counts.includes('distinctEntities') && counts.includes('branchListings'));

const mock = read('lib/lender/mockData.ts');
ok('catalog finalized through sanitize', mock.includes('finalizeLenderCatalog'));
ok('honest TRUST_STATS from counts', mock.includes('countLenderCatalog'));
ok('no invented 12450 verified count', !mock.includes('verifiedLenders: 12450'));
ok('no invented 2.8M reviews', !mock.includes('2_800_000'));

const fl = read('lib/lender/mortgage/floridaLenders.ts');
ok('SEE-NMLS removed from FL source', !fl.includes("nmlsId: 'SEE-NMLS'") && !fl.includes('nmlsId: "SEE-NMLS"'));

const card = read('components/lender/LenderCard.tsx');
ok('card uses NmlsVerificationBadge', card.includes('NmlsVerificationBadge'));
ok('card no avg close days display', !card.includes('avgCloseDays') && !card.includes('Close estimate'));

const profile = read('app/lender/lenders/[slug]/page.tsx');
ok('profile uses NO_CLOSING_PERFORMANCE_LABEL', profile.includes('NO_CLOSING_PERFORMANCE_LABEL'));

const filter = read('lib/lender/directory/filter-lenders.ts');
ok('close-days sort removed', !filter.includes("'close-days'"));

const adapter = read('lib/network/adapters/to-lender-trust-profile.ts');
ok('adapter uses resolveNmlsVerification', adapter.includes('resolveNmlsVerification'));
ok('adapter strips placeholder phone', adapter.includes('cleanDisplayPhone'));

const indexability = read('lib/hub/indexability.ts');
ok('indexability requires nmlsVerified', indexability.includes('incomplete_or_unverified_nmls'));
ok('duplicate geo variants noindex', indexability.includes('duplicate_nmls_geo_variant'));

const stateStats = read('lib/lender/mortgage/stateLenders.ts');
ok('state stats dedupe entities', stateStats.includes('dedupeLendersByEntity'));

// Scan mortgage lender data files for remaining SEE-NMLS / TBD nmls tokens in source
const mortgageDir = 'lib/lender/mortgage';
let badNmlsTokens = 0;
for (const f of fs.readdirSync(mortgageDir)) {
  if (!f.endsWith('Lenders.ts') && !f.endsWith('lenders.ts')) continue;
  const body = read(path.join(mortgageDir, f));
  if (/nmlsId:\s*['"](?:SEE-NMLS|TBD|N\/A|NA)['"]/i.test(body)) badNmlsTokens++;
}
ok('no placeholder nmlsId tokens in mortgage source files', badNmlsTokens === 0);

// Guard: hard badge UI must not say bare "NMLS Verified" without verification module
const badge = read('components/lender/nmls-verification-badge.tsx');
ok('badge component uses resolveNmlsVerification', badge.includes('resolveNmlsVerification'));

for (const c of checks) {
  console.log(`${c.pass ? 'PASS' : 'FAIL'} | ${c.name}`);
}
const failed = checks.filter((c) => !c.pass);
console.log(
  failed.length ? `\n${failed.length} FAILED` : `\nAll ${checks.length} Lender Phase 0 checks passed`
);
process.exit(failed.length ? 1 : 0);
