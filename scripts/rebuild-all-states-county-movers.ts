/**
 * Rebuild county → mover assignments for every state (or one state).
 * Same process as CA/TX:
 *  - Keep only displayable (curated listing policy) movers
 *  - Prefer existing assignment order + metro pool + state-local + national carriers
 *  - Write data/{state}-county-assignments.ts
 *  - Emit badge counts into lib/local-movers/market-mover-counts/usa-listed-counts.generated.ts
 *
 * Usage:
 *   npx tsx scripts/rebuild-all-states-county-movers.ts
 *   npx tsx scripts/rebuild-all-states-county-movers.ts florida
 *   npx tsx scripts/rebuild-all-states-county-movers.ts --skip california,texas
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { localStates } from '../lib/local-movers/states';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { fullMoversCatalog, fullMetroPools } from '../lib/local-movers/catalog';
import { isCuratedMover } from '../lib/trust/curated-listing-policy';
import type { CountyMoverAssignment, LocalMover } from '../lib/local-movers/types';

// Existing assignment modules (curated states)
import { alabamaCountyMoverAssignments } from '../data/alabama-county-assignments';
import { alaskaCountyMoverAssignments } from '../data/alaska-county-assignments';
import { arizonaCountyMoverAssignments } from '../data/arizona-county-assignments';
import { arkansasCountyMoverAssignments } from '../data/arkansas-county-assignments';
import { californiaCountyMoverAssignments } from '../data/california-county-assignments';
import { coloradoCountyMoverAssignments } from '../data/colorado-county-assignments';
import { connecticutCountyMoverAssignments } from '../data/connecticut-county-assignments';
import { delawareCountyMoverAssignments } from '../data/delaware-county-assignments';
import { districtOfColumbiaCountyMoverAssignments } from '../data/district-of-columbia-county-assignments';
import { floridaCountyMoverAssignments } from '../data/florida-county-assignments';
import { georgiaCountyMoverAssignments } from '../data/georgia-county-assignments';
import { hawaiiCountyMoverAssignments } from '../data/hawaii-county-assignments';
import { idahoCountyMoverAssignments } from '../data/idaho-county-assignments';
import { illinoisCountyMoverAssignments } from '../data/illinois-county-assignments';
import { indianaCountyMoverAssignments } from '../data/indiana-county-assignments';
import { iowaCountyMoverAssignments } from '../data/iowa-county-assignments';
import { kansasCountyMoverAssignments } from '../data/kansas-county-assignments';
import { kentuckyCountyMoverAssignments } from '../data/kentucky-county-assignments';
import { louisianaCountyMoverAssignments } from '../data/louisiana-county-assignments';
import { maineCountyMoverAssignments } from '../data/maine-county-assignments';
import { marylandCountyMoverAssignments } from '../data/maryland-county-assignments';
import { massachusettsCountyMoverAssignments } from '../data/massachusetts-county-assignments';
import { michiganCountyMoverAssignments } from '../data/michigan-county-assignments';
import { minnesotaCountyMoverAssignments } from '../data/minnesota-county-assignments';
import { mississippiCountyMoverAssignments } from '../data/mississippi-county-assignments';
import { missouriCountyMoverAssignments } from '../data/missouri-county-assignments';
import { montanaCountyMoverAssignments } from '../data/montana-county-assignments';
import { nebraskaCountyMoverAssignments } from '../data/nebraska-county-assignments';
import { nevadaCountyMoverAssignments } from '../data/nevada-county-assignments';
import { newHampshireCountyMoverAssignments } from '../data/new-hampshire-county-assignments';
import { newJerseyCountyMoverAssignments } from '../data/new-jersey-county-assignments';
import { newMexicoCountyMoverAssignments } from '../data/new-mexico-county-assignments';
import { newYorkCountyMoverAssignments } from '../data/new-york-county-assignments';
import { northCarolinaCountyMoverAssignments } from '../data/north-carolina-county-assignments';
import { northDakotaCountyMoverAssignments } from '../data/north-dakota-county-assignments';
import { ohioCountyMoverAssignments } from '../data/ohio-county-assignments';
import { oklahomaCountyMoverAssignments } from '../data/oklahoma-county-assignments';
import { oregonCountyMoverAssignments } from '../data/oregon-county-assignments';
import { pennsylvaniaCountyMoverAssignments } from '../data/pennsylvania-county-assignments';
import { rhodeIslandCountyMoverAssignments } from '../data/rhode-island-county-assignments';
import { southCarolinaCountyMoverAssignments } from '../data/south-carolina-county-assignments';
import { southDakotaCountyMoverAssignments } from '../data/south-dakota-county-assignments';
import { tennesseeCountyMoverAssignments } from '../data/tennessee-county-assignments';
import { texasCountyMoverAssignments } from '../data/texas-county-assignments';
import { utahCountyMoverAssignments } from '../data/utah-county-assignments';
import { vermontCountyMoverAssignments } from '../data/vermont-county-assignments';
import { virginiaCountyMoverAssignments } from '../data/virginia-county-assignments';
import { washingtonCountyMoverAssignments } from '../data/washington-county-assignments';
import { westVirginiaCountyMoverAssignments } from '../data/west-virginia-county-assignments';
import { wisconsinCountyMoverAssignments } from '../data/wisconsin-county-assignments';
import { wyomingCountyMoverAssignments } from '../data/wyoming-county-assignments';
import { generatedCountyAssignments } from '../data/generated/index';
import { countyMoverAssignments } from '../data/local-movers-seed';

const EXISTING: Record<string, CountyMoverAssignment[]> = {
  alabama: alabamaCountyMoverAssignments,
  alaska: alaskaCountyMoverAssignments,
  arizona: arizonaCountyMoverAssignments,
  arkansas: arkansasCountyMoverAssignments,
  california: californiaCountyMoverAssignments,
  colorado: coloradoCountyMoverAssignments,
  connecticut: connecticutCountyMoverAssignments,
  delaware: delawareCountyMoverAssignments,
  'district-of-columbia': districtOfColumbiaCountyMoverAssignments,
  florida: floridaCountyMoverAssignments,
  georgia: georgiaCountyMoverAssignments,
  hawaii: hawaiiCountyMoverAssignments,
  idaho: idahoCountyMoverAssignments,
  illinois: illinoisCountyMoverAssignments,
  indiana: indianaCountyMoverAssignments,
  iowa: iowaCountyMoverAssignments,
  kansas: kansasCountyMoverAssignments,
  kentucky: kentuckyCountyMoverAssignments,
  louisiana: louisianaCountyMoverAssignments,
  maine: maineCountyMoverAssignments,
  maryland: marylandCountyMoverAssignments,
  massachusetts: massachusettsCountyMoverAssignments,
  michigan: michiganCountyMoverAssignments,
  minnesota: minnesotaCountyMoverAssignments,
  mississippi: mississippiCountyMoverAssignments,
  missouri: missouriCountyMoverAssignments,
  montana: montanaCountyMoverAssignments,
  nebraska: nebraskaCountyMoverAssignments,
  nevada: nevadaCountyMoverAssignments,
  'new-hampshire': newHampshireCountyMoverAssignments,
  'new-jersey': newJerseyCountyMoverAssignments,
  'new-mexico': newMexicoCountyMoverAssignments,
  'new-york': newYorkCountyMoverAssignments,
  'north-carolina': northCarolinaCountyMoverAssignments,
  'north-dakota': northDakotaCountyMoverAssignments,
  ohio: ohioCountyMoverAssignments,
  oklahoma: oklahomaCountyMoverAssignments,
  oregon: oregonCountyMoverAssignments,
  pennsylvania: pennsylvaniaCountyMoverAssignments,
  'rhode-island': rhodeIslandCountyMoverAssignments,
  'south-carolina': southCarolinaCountyMoverAssignments,
  'south-dakota': southDakotaCountyMoverAssignments,
  tennessee: tennesseeCountyMoverAssignments,
  texas: texasCountyMoverAssignments,
  utah: utahCountyMoverAssignments,
  vermont: vermontCountyMoverAssignments,
  virginia: virginiaCountyMoverAssignments,
  washington: washingtonCountyMoverAssignments,
  'west-virginia': westVirginiaCountyMoverAssignments,
  wisconsin: wisconsinCountyMoverAssignments,
  wyoming: wyomingCountyMoverAssignments,
};

/** Interstate / directory carriers that serve all states */
const SERVES_NATIONWIDE = [
  'directory-allied-van-lines',
  'directory-united-van-lines',
  'directory-north-american-van-lines',
  'directory-mayflower-transit',
  'directory-jk-moving-services',
  'directory-safeway-moving',
  'directory-bekins-van-lines',
  'directory-atlas-van-lines',
  'directory-two-men-and-a-truck',
  'directory-pensey-moving',
  'directory-wheaton-world-wide',
  'directory-graebel-van-lines',
  'directory-gentle-giant-moving',
  'directory-arpin-van-lines',
  'directory-national-van-lines',
  'amerisafe-van-lines',
  'international-van-lines',
  'american-van-lines',
  'colonial-van-lines',
  'moving-apt',
] as const;

/** States with hand-tuned rebuilds — skip unless --force */
const HAND_TUNED = new Set(['california', 'texas']);

function slugToCamel(slug: string): string {
  return slug
    .split('-')
    .map((part, i) =>
      i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join('');
}

function onlyDisplayable(ids: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    const mover = fullMoversCatalog[id];
    if (mover && isCuratedMover(mover)) out.push(id);
  }
  return out;
}

function collectStateLocalIds(
  stateSlug: string,
  stateCode: string,
  stateName: string
): string[] {
  const code = stateCode.toLowerCase();
  const name = stateName.toLowerCase();
  const slugBits = stateSlug.replace(/-/g, ' ');
  const out: string[] = [];

  for (const mover of Object.values(fullMoversCatalog) as LocalMover[]) {
    if (!isCuratedMover(mover)) continue;
    const blob = [mover.id, mover.city, mover.name, mover.shortDescription || '']
      .join(' ')
      .toLowerCase();

    // Strong signals: id contains state slug, or website path, or city patterns
    if (
      mover.id.includes(stateSlug) ||
      mover.id.endsWith(`-${code}`) ||
      new RegExp(`\\b${code}\\b`).test(blob) ||
      blob.includes(name) ||
      blob.includes(slugBits)
    ) {
      // Avoid false positives for short codes (IN, OR, ME, etc.) on id alone is ok;
      // for very short codes require stronger match than bare city words
      if (code.length <= 2) {
        if (
          mover.id.includes(stateSlug) ||
          mover.id.includes(`-${code}`) ||
          blob.includes(name) ||
          new RegExp(`movers/${code}/|/${code}/`).test(blob)
        ) {
          out.push(mover.id);
        }
      } else {
        out.push(mover.id);
      }
    }
  }

  // All IDs already used in this state's existing assignments that are displayable
  const existing = EXISTING[stateSlug] ?? [];
  for (const row of existing) {
    for (const id of row.moverIds) {
      if (fullMoversCatalog[id] && isCuratedMover(fullMoversCatalog[id])) {
        out.push(id);
      }
    }
  }

  // generated + seed fallbacks for this state
  for (const row of [...generatedCountyAssignments, ...countyMoverAssignments]) {
    if (row.stateSlug !== stateSlug) continue;
    for (const id of row.moverIds) {
      if (fullMoversCatalog[id] && isCuratedMover(fullMoversCatalog[id])) {
        out.push(id);
      }
    }
  }

  return [...new Set(out)];
}

function metroPoolIds(metro?: string): string[] {
  if (!metro) return [];
  return fullMetroPools[metro] ?? [];
}

function existingIdsForCounty(
  stateSlug: string,
  countySlug: string
): string[] {
  const rows = EXISTING[stateSlug] ?? [];
  const hit = rows.find((r) => r.countySlug === countySlug);
  if (hit?.moverIds?.length) return hit.moverIds;

  for (const row of [...generatedCountyAssignments, ...countyMoverAssignments]) {
    if (row.stateSlug === stateSlug && row.countySlug === countySlug) {
      return row.moverIds;
    }
  }
  return [];
}

/** Must match lib/local-movers/index.ts LARGE_MARKET_MAX_MOVERS */
const DISPLAY_CAP = 40;
/** Prefer at least this many displayable listings when inventory allows */
const MIN_TARGET = 15;

function rebuildState(
  stateSlug: string,
  stateCode: string,
  stateName: string
): { assignments: Record<string, string[]>; counts: Record<string, number> } {
  const counties = getCountiesForState(stateSlug);
  const stateLocals = collectStateLocalIds(stateSlug, stateCode, stateName);
  const assignments: Record<string, string[]> = {};
  const counts: Record<string, number> = {};

  for (const county of counties) {
    // Priority: county-specific existing → metro pool → nationwide carriers.
    // State-wide locals only fill gaps (avoids dumping 200+ movers on every county).
    const primary = onlyDisplayable([
      ...existingIdsForCounty(stateSlug, county.slug),
      ...metroPoolIds(county.metro),
      ...SERVES_NATIONWIDE,
    ]);

    const ids = [...primary];
    const seen = new Set(ids);

    if (ids.length < MIN_TARGET) {
      for (const id of stateLocals) {
        if (ids.length >= MIN_TARGET) break;
        if (seen.has(id)) continue;
        const mover = fullMoversCatalog[id];
        if (!mover || !isCuratedMover(mover)) continue;
        ids.push(id);
        seen.add(id);
      }
    }

    const capped = ids.slice(0, DISPLAY_CAP);
    assignments[county.slug] = capped;
    counts[county.slug] = capped.length;
  }

  return { assignments, counts };
}

function writeAssignmentFile(
  stateSlug: string,
  assignments: Record<string, string[]>
): void {
  const camel = slugToCamel(stateSlug);
  const exportName = `${camel}CountyMoverAssignments`;
  const constName = `CURATED_${stateSlug.replace(/-/g, '_').toUpperCase()}_COUNTIES`;

  const assignmentLines = Object.keys(assignments)
    .sort()
    .map((slug) => {
      const key = /[^a-z0-9]/.test(slug) ? `'${slug}'` : slug;
      const body = assignments[slug].map((id) => `    '${id}',`).join('\n');
      return `  ${key}: [\n${body}\n  ],`;
    })
    .join('\n');

  const file = `import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/**
 * ${stateSlug} county → displayable mover assignments.
 * Rebuilt by: npx tsx scripts/rebuild-all-states-county-movers.ts ${stateSlug}
 *
 * Only includes movers that pass curated listing policy (verified / directory-linked).
 * Badge counts on /local-movers/${stateSlug} match these listed sets via getMoversForCounty.
 */
const ${constName}: Record<string, string[]> = {
${assignmentLines}
};

export const ${exportName}: CountyMoverAssignment[] = Object.entries(
  ${constName}
).map(([countySlug, moverIds]) => ({
  stateSlug: '${stateSlug}',
  countySlug,
  moverIds,
}));
`;

  writeFileSync(`data/${stateSlug}-county-assignments.ts`, file);
}

function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const force = process.argv.includes('--force');
  const skipArg = process.argv.find((a) => a.startsWith('--skip='));
  const skip = new Set(
    (skipArg?.slice('--skip='.length) || 'california,texas')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  );

  if (force) skip.clear();

  const targets = args.length
    ? localStates.filter((s) => args.includes(s.slug))
    : localStates.filter((s) => !skip.has(s.slug));

  if (!targets.length) {
    console.error('No states to process');
    process.exit(1);
  }

  const allCounts: Record<string, Record<string, number>> = {};
  const summary: Array<{
    slug: string;
    counties: number;
    min: number;
    max: number;
    avg: number;
  }> = [];

  for (const state of targets) {
    console.log(`\n=== ${state.name} (${state.slug}) ===`);
    const { assignments, counts } = rebuildState(
      state.slug,
      state.code,
      state.name
    );

    if (Object.keys(assignments).length === 0) {
      console.log('  no counties — skip');
      continue;
    }

    // Preserve hand-tuned CA/TX unless --force
    if (HAND_TUNED.has(state.slug) && !force && !args.includes(state.slug)) {
      console.log('  hand-tuned — skip file write (use --force or name state)');
    } else {
      writeAssignmentFile(state.slug, assignments);
      console.log(`  wrote data/${state.slug}-county-assignments.ts`);
    }

    allCounts[state.slug] = counts;
    const vals = Object.values(counts);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    summary.push({
      slug: state.slug,
      counties: vals.length,
      min,
      max,
      avg: Number(avg.toFixed(1)),
    });
    console.log(
      `  counties=${vals.length} min=${min} max=${max} avg=${avg.toFixed(1)}`
    );
  }

  // Merge with existing CA/TX counts if we skipped writing them — re-read from live
  // Always write full USA listed counts for states we processed + keep others empty
  mkdirSync('lib/local-movers/market-mover-counts', { recursive: true });

  // If we skipped CA/TX, load their current assignment lengths for the generated map
  for (const slug of ['california', 'texas']) {
    if (allCounts[slug]) continue;
    const rows = EXISTING[slug] ?? [];
    if (!rows.length) continue;
    const map: Record<string, number> = {};
    for (const row of rows) {
      map[row.countySlug] = onlyDisplayable(row.moverIds).length;
    }
    allCounts[slug] = map;
  }

  const genPath =
    'lib/local-movers/market-mover-counts/usa-listed-counts.generated.ts';
  const gen = `/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: scripts/rebuild-all-states-county-movers.ts
 * Generated: ${new Date().toISOString()}
 *
 * Exact displayable listing counts per county (badge source of truth map).
 * Live badges also use getMoversForCounty length so they always match pages.
 */
/* eslint-disable */
export const usaListedMoverCounts: Record<string, Record<string, number>> = ${JSON.stringify(
    allCounts,
    null,
    2
  )};
`;
  writeFileSync(genPath, gen);
  console.log(`\nWrote ${genPath}`);

  console.log('\n=== SUMMARY ===');
  for (const row of summary) {
    console.log(
      `${row.slug.padEnd(22)} counties=${String(row.counties).padStart(3)} min=${String(row.min).padStart(2)} max=${String(row.max).padStart(2)} avg=${row.avg}`
    );
  }
  console.log(`\nProcessed ${summary.length} states.`);
}

main();
