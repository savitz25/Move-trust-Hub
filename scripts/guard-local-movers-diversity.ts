/**
 * Fail if static county assignment files (or live hub HTML) show a uniform
 * statewide pack — the signature of seed fallback / rebuild pad regression.
 *
 * Usage:
 *   npx tsx scripts/guard-local-movers-diversity.ts
 *   npx tsx scripts/guard-local-movers-diversity.ts --live=https://www.movetrusthub.com
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SAMPLES: Array<{ state: string; counties: string[] }> = [
  { state: 'florida', counties: ['broward', 'miami-dade', 'baker', 'liberty'] },
  { state: 'texas', counties: ['harris', 'dallas', 'travis'] },
  { state: 'california', counties: ['los-angeles', 'san-diego', 'alpine'] },
  { state: 'illinois', counties: ['cook', 'dupage'] },
  { state: 'new-york', counties: ['kings', 'queens', 'erie'] },
];

function parseAssignmentFile(stateSlug: string): Map<string, string[]> {
  const path = resolve(`data/${stateSlug}-county-assignments.ts`);
  const t = readFileSync(path, 'utf8');
  const map = new Map<string, string[]>();
  // Match countySlug: [ ...ids... ] blocks inside the CURATED_* object
  const re = /^\s{2}(?:'([^']+)'|([a-z0-9-]+)):\s*\[([\s\S]*?)\]/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    const slug = m[1] || m[2];
    const ids = [...m[3].matchAll(/'([^']+)'/g)].map((x) => x[1]);
    if (slug) map.set(slug, ids);
  }
  return map;
}

function assertStaticDiversity(stateSlug: string, counties: string[]): string[] {
  const failures: string[] = [];
  let map: Map<string, string[]>;
  try {
    map = parseAssignmentFile(stateSlug);
  } catch (err) {
    failures.push(`${stateSlug}: missing assignment file (${err})`);
    return failures;
  }

  if (map.size < 2) {
    failures.push(`${stateSlug}: fewer than 2 counties in assignment file`);
    return failures;
  }

  // All counties sharing one identical id-set is the FL-26 regression.
  // Thin states with almost no DB locals may share one small pad — only fail when
  // the entire file is one pack (the silent seed failure mode).
  const sets = new Map<string, string[]>();
  for (const [slug, ids] of map) {
    const key = [...ids].sort().join('|');
    if (!sets.has(key)) sets.set(key, []);
    sets.get(key)!.push(slug);
  }
  const largest = [...sets.values()].sort((a, b) => b.length - a.length)[0];
  if (largest && largest.length === map.size && map.size >= 5) {
    failures.push(
      `${stateSlug}: ALL ${map.size} counties share the same mover ID set (uniform seed pack)`
    );
  }

  const samples = counties
    .map((c) => ({ c, n: map.get(c)?.length ?? 0, ids: map.get(c) ?? [] }))
    .filter((x) => x.n > 0 || map.has(x.c));

  // Major-metro samples must not be an identical pack (Harris ≠ Travis, etc.).
  if (samples.length >= 2) {
    const uniqueSets = new Set(samples.map((s) => [...s.ids].sort().join('|')));
    if (uniqueSets.size === 1 && samples[0]!.n > 0 && samples.length >= 3) {
      failures.push(
        `${stateSlug}: sample counties [${samples.map((s) => s.c).join(', ')}] all share identical mover IDs (count=${samples[0]!.n})`
      );
    }
  }

  console.log(
    `  ${stateSlug}: counties=${map.size} unique-sets=${sets.size} sample=${samples
      .map((s) => `${s.c}:${s.n}`)
      .join(', ')}`
  );
  return failures;
}

async function assertLiveDiversity(base: string): Promise<string[]> {
  const failures: string[] = [];
  const url = `${base.replace(/\/$/, '')}/local-movers/florida`;
  const res = await fetch(url, {
    headers: { 'user-agent': 'move-trust-hub-diversity-guard/1.0' },
  });
  if (!res.ok) {
    failures.push(`live FL hub HTTP ${res.status}`);
    return failures;
  }
  const html = await res.text();
  const counts = [...html.matchAll(/(\d+)\s*Movers/gi)].map((m) =>
    Number(m[1])
  );
  if (!counts.length) {
    failures.push('live FL hub: no “N Movers” badges found');
    return failures;
  }
  const unique = new Set(counts);
  console.log(
    `  live FL hub: ${counts.length} badges, unique counts=${unique.size}, values=${[...unique].sort((a, b) => a - b).slice(0, 12).join(',')}`
  );
  if (unique.size === 1 && counts.length >= 20) {
    failures.push(
      `live FL hub: every county badge is ${counts[0]} Movers (${counts.length} cards) — uniform pack regression`
    );
  }
  return failures;
}

async function main() {
  const liveArg = process.argv.find((a) => a.startsWith('--live'));
  const liveBase = liveArg?.includes('=')
    ? liveArg.split('=')[1]
    : liveArg
      ? 'https://www.movetrusthub.com'
      : null;

  console.log('Local movers diversity guard\n');
  const failures: string[] = [];

  for (const sample of SAMPLES) {
    failures.push(...assertStaticDiversity(sample.state, sample.counties));
  }

  if (liveBase) {
    console.log(`\nLive check: ${liveBase}`);
    failures.push(...(await assertLiveDiversity(liveBase)));
  }

  if (failures.length) {
    console.error('\nFAIL:');
    for (const f of failures) console.error(' -', f);
    process.exit(1);
  }
  console.log('\nOK: diversity guard passed');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
