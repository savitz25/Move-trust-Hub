import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { classifySearchQuery } from '../lib/search/classify-intent';
import { compareIdentityCompanies, matchCompanyIdentity } from '../lib/search/match';
import { countExactPublicDisplayName, loadIdentityCandidates } from '../lib/search/query';

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (!match) continue;
      if (!process.env[match[1].trim()]) process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}
loadEnv();

async function main() {
  const count = await countExactPublicDisplayName('TWO MEN AND A TRUCK');
  const classified = classifySearchQuery('Two Men Truck');
  const loaded = await loadIdentityCandidates(classified, 40);
  const ranked = loaded.companies
    .map((company) => {
      const match = matchCompanyIdentity(company, classified.companyQuery);
      return match ? { company, match } : null;
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row))
    .sort((a, b) => compareIdentityCompanies(a.company, b.company, a.match, b.match));
  const top = ranked.slice(0, 8).map((r) => r.company.name);
  const junkIdx = ranked.findIndex((r) => /junk/i.test(r.company.name));
  const franchiseIdx = ranked.findIndex((r) => /^two men and a truck$/i.test(r.company.name.trim()));
  console.log(
    JSON.stringify(
      {
        twoMenExactCount: count,
        twoMenTruckTop: top,
        franchiseIdx,
        junkIdx,
        franchiseBeforeJunk: franchiseIdx >= 0 && (junkIdx < 0 || franchiseIdx < junkIdx),
      },
      null,
      2
    )
  );
  if (count < 90) process.exit(1);
  if (!(franchiseIdx >= 0 && (junkIdx < 0 || franchiseIdx < junkIdx))) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
