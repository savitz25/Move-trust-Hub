import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { classifySearchQuery } from '../lib/search/classify-intent';
import { loadIdentityCandidates } from '../lib/search/query';
import { matchCompanyIdentity, compareIdentityCompanies } from '../lib/search/match';
import { placeResultsForQuery } from '../lib/search/place-results';

function loadEnvFiles() {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
}
loadEnvFiles();

const CASES = [
  { q: 'SHIFL', expect: /shifl/i, intent: 'COMPANY_IDENTITY' },
  { q: 'SHIFL INC', expect: /shifl/i, intent: 'COMPANY_IDENTITY' },
  { q: 'DOT 3244649', expect: /shifl/i, intent: 'REGULATORY_IDENTIFIER' },
  { q: 'USDOT 3244649', expect: /shifl/i, intent: 'REGULATORY_IDENTIFIER' },
  { q: 'MC 1019808', expect: /shifl/i, intent: 'REGULATORY_IDENTIFIER' },
  { q: 'MC-1019808', expect: /shifl/i, intent: 'REGULATORY_IDENTIFIER' },
  { q: '1019808', expect: /shifl/i, intent: 'REGULATORY_IDENTIFIER' },
  { q: '3244649', expect: /shifl/i, intent: 'REGULATORY_IDENTIFIER' },
  { q: 'TWO MEN AND A TRUCK', expect: /two men/i, intent: 'COMPANY_IDENTITY', min: 10 },
  { q: 'Two Men Truck', expect: /two men/i, intent: 'COMPANY_IDENTITY' },
  { q: 'College Hunks', expect: /college hunks/i, intent: 'COMPANY_IDENTITY' },
  { q: 'Colleg Hunks', expect: /college hunks/i, intent: 'COMPANY_IDENTITY' },
  { q: 'Miami, FL', expectPlace: /miami-dade|florida/i, intent: 'PLACE' },
  { q: 'Florida', expectPlace: /florida/i, intent: 'PLACE' },
  { q: 'xyzzy-no-such-mover-zzzz', expectNone: true, intent: 'COMPANY_IDENTITY' },
];

async function main() {
  const rows = [];
  for (const c of CASES) {
    const t0 = Date.now();
    const classified = classifySearchQuery(c.q);
    const intentPass = classified.intent === c.intent;
    if (classified.intent === 'PLACE' || c.expectPlace) {
      const places = placeResultsForQuery(c.q);
      const pass = Boolean(c.expectPlace && places.some((p) => c.expectPlace!.test(`${p.label} ${p.href}`)));
      rows.push({
        query: c.q,
        intent: classified.intent,
        intentPass,
        top: places[0]?.label ?? null,
        count: places.length,
        ms: Date.now() - t0,
        pass,
      });
      continue;
    }
    const loaded = await loadIdentityCandidates(classified, 40);
    const matched = loaded.companies
      .map((company) => {
        const match = matchCompanyIdentity(company, classified.companyQuery, {
          identifierDigits: classified.identifier?.digits,
          namespace: classified.identifier?.namespace ?? null,
        });
        return match ? { company, match } : null;
      })
      .filter((row): row is NonNullable<typeof row> => Boolean(row))
      .sort((a, b) => compareIdentityCompanies(a.company, b.company, a.match, b.match));
    const top = matched[0]?.company.name ?? null;
    const pass = c.expectNone
      ? matched.length === 0
      : Boolean(top && c.expect?.test(top)) && (!c.min || matched.length >= c.min);
    rows.push({
      query: c.q,
      intent: classified.intent,
      intentPass,
      top,
      count: matched.length,
      path: loaded.path,
      ms: Date.now() - t0,
      dbMs: loaded.dbMs,
      pass,
    });
  }
  console.log(JSON.stringify(rows, null, 2));
  const failed = rows.filter((r) => !r.pass || !r.intentPass);
  writeFileSync(resolve('docs/move-search-001-golden-live.json'), JSON.stringify({ rows, failed: failed.length }, null, 2));
  if (failed.length) {
    console.error(`FAILED ${failed.length}`);
    process.exit(1);
  }
  console.log('golden PASS', rows.length);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
