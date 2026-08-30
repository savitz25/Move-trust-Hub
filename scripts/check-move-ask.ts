/**
 * Move Ask interpreter gates. npx tsx scripts/check-move-ask.ts
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { interpretMoveAskQuery } from '../lib/move-ask/interpret';
import { MOVE_ASK_CAPABILITY, MOVE_ASK_CONTRACT, MOVE_ASK_PAGE_SIZE } from '../lib/move-ask/contract';

const errors: string[] = [];
function assert(c: unknown, m: string) {
  if (!c) errors.push(m);
}

assert(MOVE_ASK_CONTRACT === 'move-ask-v1', 'contract');
assert(MOVE_ASK_CAPABILITY.federatedExecution === 'execute', 'execute');
assert(MOVE_ASK_PAGE_SIZE >= 20 && MOVE_ASK_PAGE_SIZE <= 25, 'page size');

function q(text: string) {
  return interpretMoveAskQuery(text);
}

const usdot = q('Find USDOT 3244649.');
assert(usdot.query.mode === 'identifier' && usdot.query.identifier?.type === 'usdot', 'USDOT labeled');
assert(usdot.query.identifier?.value === '3244649', 'USDOT value');

const unknown = q('Find USDOT 0001111.');
assert(unknown.query.mode === 'identifier', 'unknown USDOT still lookup');

const mc = q('Find MC 1019808.');
assert(mc.query.mode === 'identifier' && mc.query.identifier?.type === 'mc', 'MC labeled');
assert(mc.query.identifier?.value === '1019808', 'MC value');

const bare = q('3244649');
assert(bare.query.mode === 'fail_closed', 'bare digits fail closed');

const fl = q('Show current interstate household-goods carriers headquartered in Florida.');
assert(fl.query.mode === 'entity' && fl.query.role === 'carrier', 'FL carriers entity');
assert(fl.query.jurisdiction?.state === 'FL', 'FL');
assert(fl.query.jurisdiction?.meaning === 'recorded_headquarters_state', 'HQ not service');
assert(fl.query.authorityCurrent === true, 'current');
assert(JSON.stringify(fl.interpretation).includes('headquarters'), 'interpretation names HQ');

const brokers = q('Show household-goods brokers headquartered in Florida.');
assert(brokers.query.role === 'broker', 'broker role');
assert(brokers.query.jurisdiction?.meaning === 'recorded_headquarters_state', 'broker HQ');

const dualQ = q('Is this company a carrier or a broker?');
assert(dualQ.query.mode === 'fail_closed' || dualQ.query.mode === 'identifier' || dualQ.query.role, 'role question routed');

const transporter = q('Who will actually move my belongings?');
assert(transporter.query.mode === 'fail_closed', 'broker ≠ transporter');

const serving = q('Movers serving Palm Beach County');
assert(serving.query.mode === 'fail_closed', 'service territory fail closed');

const im = q('Show Florida intrastate movers registered with FDACS.');
assert(im.query.floridaIm === true, 'FDACS IM');
assert(im.query.jurisdiction?.meaning === 'florida_im_registration', 'IM grain');

const imCount = q('How many active Florida Intrastate Mover registrations are indexed?');
assert(imCount.query.mode === 'count' && imCount.query.floridaIm, 'IM count');

const carrierCount = q('How many current household-goods carriers are indexed?');
assert(carrierCount.query.mode === 'count' && carrierCount.query.role === 'carrier', 'carrier count');

const brokerCount = q('How many brokers are indexed?');
assert(brokerCount.query.mode === 'count' && brokerCount.query.role === 'broker', 'broker count');

const mega = q('How many moving companies are there?');
assert(mega.query.mode === 'fail_closed', 'no mega count');

const best = q('What is the best mover in Florida?');
assert(best.query.mode === 'fail_closed', 'best fail closed');

const cheap = q('Cheapest mover from Florida to New York');
assert(cheap.query.mode === 'fail_closed', 'cheapest fail closed');

const scam = q('Is this mover a scam?');
assert(scam.query.mode === 'fail_closed', 'scam fail closed');

const def = q('What is the difference between a carrier and a broker?');
assert(def.query.definitionId === 'carrier_vs_broker', 'definition');

const usdotDef = q('What is a USDOT number?');
assert(usdotDef.query.definitionId === 'usdot', 'usdot def');

const mcDef = q('What is an MC number?');
assert(mcDef.query.definitionId === 'mc', 'mc def');

const statusDef = q('What does USDOT status mean?');
assert(statusDef.query.definitionId === 'usdot_status', 'status def');

const imDef = q('What is a Florida Intrastate Mover registration?');
assert(imDef.query.definitionId === 'florida_im', 'im def');

const complaints = q('Show regulatory evidence for USDOT 3244649.');
assert(complaints.query.mode === 'evidence' || complaints.query.mode === 'identifier', 'evidence');

const authority = q('What operating authority does USDOT 3244649 have?');
assert(authority.query.mode === 'evidence', 'operating authority evidence');
assert(authority.query.evidenceFamily === 'authority', 'authority family');
assert(authority.query.identifier?.value === '3244649', 'authority USDOT');

const hhgAuth = q('Does USDOT 3244649 currently have household-goods carrier authority?');
assert(hhgAuth.query.mode === 'evidence' && hhgAuth.query.identifier?.value === '3244649', 'HHG authority');

const activeQ = q('Is USDOT 3244649 active?');
assert(activeQ.query.mode === 'evidence', 'active status');

const mcAuth = q('Does MC 1019808 have household-goods authority?');
assert(mcAuth.query.mode === 'evidence' && mcAuth.query.identifier?.type === 'mc', 'MC authority');

const opDef = q('What is operating authority?');
assert(opDef.query.definitionId === 'interstate_authority', 'operating authority definition');

const compare = q('Compare Florida and Texas headquartered interstate carrier counts.');
assert(compare.query.mode === 'comparison', 'comparison');

const better = q('Which state has better movers?');
assert(better.query.mode === 'fail_closed', 'better movers fail closed');

const name = q('Who is SHIFL INC');
assert(name.query.mode === 'fail_closed', 'name is not identity');

const overlap = q('Show companies with both FMCSA interstate authority and Florida Intrastate Mover registration.');
assert(overlap.query.overlapFmcsaFdacs === true, 'overlap VERIFIED only');

const root = join(__dirname, '..');
const sitemap = readFileSync(join(root, 'app/sitemap.ts'), 'utf8');
const askPage = readFileSync(join(root, 'app/(move)/ask/page.tsx'), 'utf8');
const hero = readFileSync(join(root, 'components/home/home-intel-hero.tsx'), 'utf8');
assert(!sitemap.includes("'/ask'"), 'ask not in sitemap');
assert(askPage.includes('index: false') || askPage.includes('noindex'), 'ask noindex');
assert(hero.includes('Ask MoveTrustHub'), 'homepage Ask CTA');
assert(hero.includes('Explore Moving Intelligence'), 'intel CTA retained');
assert((hero.match(/<h1\b/g) ?? []).length === 1, 'single H1');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('check-move-ask PASS');
