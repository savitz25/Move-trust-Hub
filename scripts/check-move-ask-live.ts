/**
 * Production-graph smoke. Requires SUPABASE_SERVICE_ROLE_KEY.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { executeMoveAsk } from '../lib/move-ask/execute';
import { MOVE_ASK_PAGE_SIZE } from '../lib/move-ask/contract';

for (const name of ['.env', '.env.local']) {
  const p = resolve(process.cwd(), name);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#') || !t.includes('=')) continue;
    const i = t.indexOf('=');
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  }
}

const errors: string[] = [];
function assert(c: unknown, m: string) {
  if (!c) errors.push(m);
}

async function main() {
  const fl = await executeMoveAsk('Show current interstate household-goods carriers headquartered in Florida.');
  console.log('FL carriers', fl.resultType, fl.results.length, fl.pagination.total, fl.elapsedMs + 'ms');
  assert(fl.resultType === 'entity', 'FL entity');
  assert(fl.results.length <= MOVE_ASK_PAGE_SIZE, 'page cap');
  if (fl.results.length) {
    assert(fl.results.every((r) => r.role === 'Carrier' || r.role === 'Carrier / Broker'), 'carrier grain');
    assert(fl.results.every((r) => /headquarters|recorded/i.test(r.whyMatched)), 'why HQ');
    assert(fl.results.every((r) => /not a recommendation/i.test(r.whyMatched) && !/\bbest\b|\bsafest\b/i.test(r.whyMatched)), 'no ranking language');
  }

  const brokers = await executeMoveAsk('Show household-goods brokers headquartered in Florida.');
  console.log('FL brokers', brokers.results.length, brokers.pagination.total, brokers.elapsedMs + 'ms');
  if (brokers.results.length) {
    assert(brokers.results.every((r) => r.role === 'Broker' || r.role === 'Carrier / Broker'), 'broker grain');
  }

  const usdot = await executeMoveAsk('Find USDOT 3244649.');
  console.log('USDOT 3244649', usdot.results.map((r) => r.displayName + ' ' + r.usdot + ' ' + r.role).join(' | '));
  assert(usdot.resultType === 'identifier', 'usdot mode');

  const mc = await executeMoveAsk('Find MC 1019808.');
  console.log('MC 1019808', mc.results.map((r) => r.displayName + ' MC=' + r.mc).join(' | '));

  const auth = await executeMoveAsk('What operating authority does USDOT 3244649 have?');
  console.log('authority', auth.results.map((r) => r.operatingAuthority || r.whyMatched).join(' | '));
  assert(auth.resultType === 'evidence', 'authority evidence executes');
  assert(auth.results.length >= 1, 'authority identity');
  assert(auth.results.every((r) => !/recommend(ed|ation of)/i.test(r.whyMatched) || /not a (recommendation|MoveTrustHub endorsement)/i.test(r.whyMatched)), 'authority not endorsement');

  const unknown = await executeMoveAsk('Find USDOT 0001111.');
  assert(unknown.results.length === 0 || unknown.results.every((r) => r.usdot), 'unknown does not invent');

  const best = await executeMoveAsk('What is the best mover in Florida?');
  assert(best.parsed.query.mode === 'fail_closed', 'best fail closed');
  assert(!best.results.length, 'best no ranked list');

  const cheap = await executeMoveAsk('Cheapest mover from Florida to New York');
  assert(cheap.parsed.query.mode === 'fail_closed', 'cheap fail closed');

  const im = await executeMoveAsk('How many active Florida Intrastate Mover registrations are indexed?');
  console.log('IM count', im.counts);

  const mega = await executeMoveAsk('How many moving companies are there?');
  assert(mega.parsed.query.mode === 'fail_closed', 'mega fail closed');

  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log('check-move-ask-live PASS');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
