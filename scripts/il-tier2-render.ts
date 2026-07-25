/**
 * Shared render for IL Tier 2 packs.
 * Import PackDef arrays and call writePack for each.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

export type Zone = {
  id: string;
  name: string;
  shortName: string;
  neighborhoods: string[];
  housingTypes: string;
  challenges: string[];
  keywords: string[];
  moverTips: string;
};
export type Spec = { id: string; title: string; intro: string; bullets: string[] };
export type PackDef = {
  file: string;
  exportName: string;
  slug: string;
  hubTitle: string;
  eyebrow: string;
  h1: string;
  heroOpener: string;
  heroCredibility: string;
  majorCorridors: string;
  parentLabel: string;
  parentHref: string;
  parentAltLabel?: string;
  parentAltHref?: string;
  compareIntro: string;
  compareBullets: Array<{ title: string; detail: string }>;
  whatIntro: string;
  whatBullets: Array<{ title: string; detail: string }>;
  zonesHeading: string;
  zonesIntro: string;
  zones: Zone[];
  specialized: Spec[];
  schoolsIntro: string;
  hospitalsDetail: string;
  costIntro: string;
  seasonalIntro: string;
};

export function z(
  id: string,
  name: string,
  shortName: string,
  neighborhoods: string[],
  housingTypes: string,
  challenges: string[],
  keywords: string[],
  moverTips: string
): Zone {
  return { id, name, shortName, neighborhoods, housingTypes, challenges, keywords, moverTips };
}
export function s(id: string, title: string, intro: string, bullets: string[]): Spec {
  return { id, title, intro, bullets };
}
export function b(title: string, detail: string) {
  return { title, detail };
}

function esc(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${').replace(/'/g, "\\'");
}

function countyTitleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function writePack(p: PackDef) {
  const zoneBlocks = p.zones
    .map(
      (zone) => `    {
      id: '${zone.id}',
      name: '${esc(zone.name)}',
      shortName: '${esc(zone.shortName)}',
      neighborhoods: ${JSON.stringify(zone.neighborhoods)},
      housingTypes: '${esc(zone.housingTypes)}',
      challenges: ${JSON.stringify(zone.challenges)},
      moverTips: '${esc(zone.moverTips)}',
      cityKeywords: ${JSON.stringify(zone.keywords)},
    }`
    )
    .join(',\n');

  const specBlocks = p.specialized
    .map(
      (spec) => `    {
      id: '${spec.id}',
      title: '${esc(spec.title)}',
      intro: '${esc(spec.intro)}',
      bullets: ${JSON.stringify(spec.bullets)},
    }`
    )
    .join(',\n');

  const whatBullets = p.whatBullets
    .map(
      (bullet) => `      {
        title: '${esc(bullet.title)}',
        detail:
          '${esc(bullet.detail)}',
      }`
    )
    .join(',\n');

  const compareBullets = p.compareBullets
    .map(
      (bullet) => `      {
        title: '${esc(bullet.title)}',
        detail:
          '${esc(bullet.detail)}',
      }`
    )
    .join(',\n');

  const parentAltItem = p.parentAltLabel
    ? `      {
        label: '${esc(p.parentAltLabel)} movers',
        href: '${p.parentAltHref}',
      },`
    : '';

  const content = `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * ${p.slug} â€” IL Tier 2 Wave 1
 */
export const ${p.exportName}: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: '${p.slug}',
  hubTitle: '${esc(p.hubTitle)}',
  eyebrow: '${esc(p.eyebrow)}',
  h1: '${esc(p.h1)}',
  heroOpener:
    '${esc(p.heroOpener)}',
  heroCredibility:
    '${esc(p.heroCredibility)}',
  majorCorridors: '${esc(p.majorCorridors)}',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: '${esc(p.parentLabel)}',
    parentHref: '${p.parentHref}',
    title: 'Compared with ${esc(p.parentLabel)}',
    intro:
      '${esc(p.compareIntro)}',
    bullets: [
${compareBullets}
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in ${countyTitleFromSlug(p.slug)} County different',
    intro: '${esc(p.whatIntro)}',
    bullets: [
${whatBullets},
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: '${esc(p.zonesHeading)}',
  zonesIntro: '${esc(p.zonesIntro)}',
  zones: [
${zoneBlocks}
  ],
  specialized: [
${specBlocks}
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: '${esc(p.schoolsIntro)}',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use ISBE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: '${esc(p.hospitalsDetail)}',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: '${esc(p.costIntro)}',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450â€“$1,200+' },
      { label: '3â€“4 BR home', value: '$1,600â€“$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115â€“$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: '${esc(p.seasonalIntro)}',
    items: [
      {
        title: 'Late spring â€“ early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Illinois Commerce Commission (ICC) household goods authority for in-state Illinois moves and FMCSA for interstate legs.',
    items: [
      {
        label: '${esc(p.parentLabel)} movers (parent contrast)',
        href: '${p.parentHref}',
      },
${parentAltItem}
    ],
  },
});
`;

  const outPath = join(
    process.cwd(),
    'lib/local-movers/county-intelligence/illinois',
    p.file
  );
  writeFileSync(outPath, content, 'utf8');
  console.log('wrote', p.file);
}

