import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import { newMexicoCountyMoverAssignments } from '../data/new-mexico-county-assignments';
import { ACTIVE_MOVER_ID_WHITELIST } from '../data/active-directory-movers';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
  for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!process.env[k]) process.env[k] = v;
  }
}

function moverIdToSlug(id: string): string {
  return id.startsWith('directory-') ? id.slice('directory-'.length) : id;
}

async function main() {
  loadEnvLocal();
  let leaks = 0;
  let empty = 0;
  let notCurated = 0;
  const slugsOnPages = new Set<string>();

  for (const row of newMexicoCountyMoverAssignments) {
    for (const id of row.moverIds) {
      if (!ACTIVE_MOVER_ID_WHITELIST.has(id)) {
        console.log('LEAK whitelist', row.countySlug, id);
        leaks++;
      }
    }
  }

  const counties = getCountiesForState('new-mexico');
  for (const c of counties) {
    const r = getMoversForCounty('new-mexico', c.slug);
    if (!r?.movers.length) empty++;
    for (const m of r?.movers ?? []) {
      slugsOnPages.add(moverIdToSlug(m.id));
      if (!ACTIVE_MOVER_ID_WHITELIST.has(m.id)) {
        console.log('PAGE LEAK', c.slug, m.id);
        leaks++;
      }
      if (!isCuratedMover(m)) {
        notCurated++;
        console.log('not curated', c.slug, m.id);
      }
    }
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await sb
    .from('companies')
    .select('slug, authority_active, out_of_service')
    .in('slug', [...slugsOnPages]);
  const inactive = (data ?? []).filter(
    (c) => c.out_of_service || c.authority_active === false
  );

  console.log({
    counties: counties.length,
    empty,
    leaks,
    notCurated,
    uniqueOnPages: slugsOnPages.size,
    inactiveOnPages: inactive.length,
    inactiveList: inactive.map((c) => c.slug),
  });

  for (const slug of [
    'bernalillo',
    'dona-ana',
    'santa-fe',
    'sandoval',
    'san-juan',
    'valencia',
    'eddy',
    'lea',
    'chaves',
  ]) {
    const r = getMoversForCounty('new-mexico', slug);
    const assigned =
      newMexicoCountyMoverAssignments.find((a) => a.countySlug === slug)
        ?.moverIds.length ?? 0;
    console.log(
      `${slug}: assigned=${assigned} listed=${r?.movers.length ?? 0} top=${(r?.movers ?? [])
        .slice(0, 4)
        .map((m) => m.name)
        .join(' | ')}`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
