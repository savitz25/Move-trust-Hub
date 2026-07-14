import { getCountiesForState } from '../lib/local-movers/geography/index';
import { getMoversForCounty } from '../lib/local-movers/index';
import { texasCountyMoverAssignments } from '../data/texas-county-assignments';
import { ACTIVE_MOVER_ID_WHITELIST } from '../data/active-directory-movers';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';

// legacy IDs that previously polluted TX pages
const BANNED_SUBSTRINGS = [
  'area-moving',
  'two-men-and-a-truck-houston',
  'two-men-and-a-truck-dallas',
  'houston-local-lines',
  'california-',
  'generated',
];

let leaks = 0;
let notCurated = 0;
let empty = 0;
const majors = [
  'harris',
  'dallas',
  'tarrant',
  'bexar',
  'travis',
  'collin',
  'denton',
  'fort-bend',
  'el-paso',
  'hidalgo',
  'williamson',
  'montgomery',
  'bastrop',
];

for (const row of texasCountyMoverAssignments) {
  for (const id of row.moverIds) {
    if (!ACTIVE_MOVER_ID_WHITELIST.has(id)) {
      console.log('LEAK whitelist', row.countySlug, id);
      leaks++;
    }
    for (const ban of BANNED_SUBSTRINGS) {
      if (id.includes(ban) && !ACTIVE_MOVER_ID_WHITELIST.has(id)) {
        console.log('LEAK banned', row.countySlug, id);
        leaks++;
      }
    }
  }
}

const counties = getCountiesForState('texas');
console.log('--- listed via getMoversForCounty ---');
for (const c of counties) {
  const r = getMoversForCounty('texas', c.slug);
  const n = r?.movers.length ?? 0;
  if (n === 0) empty++;
  for (const m of r?.movers ?? []) {
    if (!ACTIVE_MOVER_ID_WHITELIST.has(m.id)) {
      console.log('PAGE LEAK', c.slug, m.id);
      leaks++;
    }
    if (!isCuratedMover(m)) {
      notCurated++;
      console.log('not curated on page', c.slug, m.id);
    }
  }
}

console.log({
  counties: counties.length,
  empty,
  leaks,
  notCurated,
  whitelistSize: ACTIVE_MOVER_ID_WHITELIST.size,
  catalogHasAllied: Boolean(fullMoversCatalog['directory-allied-van-lines']),
});

for (const slug of majors) {
  const r = getMoversForCounty('texas', slug);
  const assigned =
    texasCountyMoverAssignments.find((a) => a.countySlug === slug)?.moverIds
      .length ?? 0;
  console.log(
    `${slug}: assigned=${assigned} listed=${r?.movers.length} top3=${r?.movers
      .slice(0, 3)
      .map((m) => m.name)
      .join(' | ')}`
  );
}
