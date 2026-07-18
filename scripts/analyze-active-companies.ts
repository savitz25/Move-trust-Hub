import { readFileSync, writeFileSync } from 'node:fs';

const companies = JSON.parse(
  readFileSync('scripts/output/active-verified-companies.json', 'utf8')
) as Array<{
  slug: string;
  name: string;
  headquarters: string | null;
  coverage: string | null;
  is_verified: boolean;
  usdot_number: string | null;
}>;

const coverages: Record<string, number> = {};
for (const c of companies) {
  const cov = (c.coverage || 'null').toString();
  coverages[cov] = (coverages[cov] || 0) + 1;
}
console.log('coverages', coverages);

const states: Record<string, number> = {};
for (const c of companies) {
  const hq = c.headquarters || '';
  const m = hq.match(/,\s*([A-Z]{2})\b/) || hq.match(/,\s*([A-Za-z ]+)\s*$/);
  const st = m
    ? m[1]!.trim()
    : hq.includes(',')
      ? hq.split(',').pop()!.trim()
      : hq || 'unknown';
  states[st] = (states[st] || 0) + 1;
}
console.log(
  'hq top',
  Object.entries(states)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
);

const nationalKeywords =
  /van lines|transit|allied|united|mayflower|atlas|bekins|wheaton|north american|national|continental|u-pack|bellhop|graebel|arpin|pensey|safeway|jk moving|gentle giant|stevens|we move/i;

const nationals = companies.filter(
  (c) =>
    nationalKeywords.test(c.name) ||
    /continental|nationwide|all 48|48 states|national/i.test(c.coverage || '')
);
console.log('likely national', nationals.length);
console.log(nationals.map((c) => c.slug).join('\n'));

writeFileSync(
  'scripts/output/active-company-slugs.txt',
  companies.map((c) => c.slug).join('\n')
);
console.log('total', companies.length);
