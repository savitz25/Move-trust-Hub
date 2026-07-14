import { writeFileSync } from 'node:fs';
import { californiaCountyMoverAssignments } from '../data/california-county-assignments';
import { texasCountyMoverAssignments } from '../data/texas-county-assignments';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';
import { usaListedMoverCounts } from '../lib/local-movers/market-mover-counts/usa-listed-counts.generated';
import type { CountyMoverAssignment } from '../lib/local-movers/types';

function countsFromAssignments(
  rows: CountyMoverAssignment[]
): Record<string, number> {
  const map: Record<string, number> = {};
  for (const row of rows) {
    map[row.countySlug] = row.moverIds.filter(
      (id) => fullMoversCatalog[id] && isCuratedMover(fullMoversCatalog[id])
    ).length;
  }
  return map;
}

function writeMapFile(
  fileBase: string,
  exportName: string,
  obj: Record<string, number>
): void {
  const lines = Object.keys(obj)
    .sort()
    .map((slug) => {
      const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
      return `  ${key}: ${obj[slug]},`;
    })
    .join('\n');
  const body = `/** Auto-synced listed counts for ${fileBase} */
export const ${exportName}: Record<string, number> = {
${lines}
};
`;
  writeFileSync(
    `lib/local-movers/market-mover-counts/${fileBase}-counts.ts`,
    body
  );
  console.log(`wrote ${fileBase}-counts.ts (${Object.keys(obj).length})`);
}

const ca = countsFromAssignments(californiaCountyMoverAssignments);
const tx = countsFromAssignments(texasCountyMoverAssignments);
writeMapFile('california', 'californiaMarketMoverCounts', ca);
writeMapFile('texas', 'texasMarketMoverCounts', tx);

const usa = {
  ...usaListedMoverCounts,
  california: ca,
  texas: tx,
};

const gen = `/**
 * AUTO-GENERATED listed displayable mover counts per county.
 * Source: scripts/rebuild-all-states-county-movers.ts + finalize-usa-badge-counts.ts
 */
/* eslint-disable */
export const usaListedMoverCounts: Record<string, Record<string, number>> = ${JSON.stringify(
  usa,
  null,
  2
)};
`;
writeFileSync(
  'lib/local-movers/market-mover-counts/usa-listed-counts.generated.ts',
  gen
);
console.log('usa states', Object.keys(usa).length);
