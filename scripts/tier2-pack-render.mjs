/** Shared Tier 2 pack file renderer (LOCKED contract shape). */

export function escapeTs(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

/**
 * @param {object} p pack def
 * @param {object} opts finalizeImport, finalizeName, regBullet, waveLabel, schoolsDetailPrefix, resourcesIntro
 */
export function renderTier2Pack(p, opts) {
  const {
    finalizeImport,
    finalizeName,
    regBullet,
    waveLabel,
    schoolsDetailPrefix,
    resourcesIntro,
  } = opts;

  const e = escapeTs;
  const compare = p.compareBullets
    .map(
      (b) => `      {
        title: '${e(b.title)}',
        detail: '${e(b.detail)}',
      }`
    )
    .join(',\n');
  const what = p.whatBullets
    .map(
      (b) => `      {
        title: '${e(b.title)}',
        detail: '${e(b.detail)}',
      }`
    )
    .join(',\n');
  const zones = p.zones
    .map(
      (z) => `    {
      id: '${e(z.id)}',
      name: '${e(z.name)}',
      shortName: '${e(z.shortName)}',
      neighborhoods: ${JSON.stringify(z.neighborhoods)},
      housingTypes: '${e(z.housingTypes)}',
      challenges: ${JSON.stringify(z.challenges)},
      moverTips: '${e(z.moverTips)}',
      cityKeywords: ${JSON.stringify(z.keywords)},
    }`
    )
    .join(',\n');
  const specs = p.specialized
    .map(
      (s) => `    {
      id: '${e(s.id)}',
      title: '${e(s.title)}',
      intro: '${e(s.intro)}',
      bullets: ${JSON.stringify(s.bullets)},
    }`
    )
    .join(',\n');

  const marketTitle = p.hubTitle.replace(/ Moving Intelligence Hub$/, '');

  return `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  ${finalizeName},
  ${regBullet},
} from '${finalizeImport}';

/** ${p.slug} — ${waveLabel} */
export const ${p.exportName}: CountyIntelligencePack = ${finalizeName}({
  countySlug: '${p.slug}',
  hubTitle: '${e(p.hubTitle)}',
  eyebrow: '${e(p.eyebrow)}',
  h1: '${e(p.h1)}',
  heroOpener: '${e(p.heroOpener)}',
  heroCredibility: '${e(p.heroCredibility)}',
  majorCorridors: '${e(p.majorCorridors)}',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: '${e(p.parentLabel)}',
    parentHref: '${p.parentHref}',
    title: 'Compared with ${e(p.parentLabel)}',
    intro: '${e(p.compareIntro)}',
    bullets: [
${compare}
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in ${e(marketTitle)} different',
    intro: '${e(p.whatIntro)}',
    bullets: [
${what},
      ${regBullet},
    ],
  },
  zonesHeading: '${e(p.zonesHeading)}',
  zonesIntro: '${e(p.zonesIntro)}',
  zones: [
${zones}
  ],
  specialized: [
${specs}
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: '${e(p.schoolsIntro)}',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              '${e(schoolsDetailPrefix)}',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, military, and tourism markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: '${e(p.hospitalsDetail)}',
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
    intro: '${e(p.costIntro)}',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: '${e(p.seasonalIntro)}',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      '${e(resourcesIntro)}',
    items: [
      { label: '${e(p.parentLabel)} movers (parent contrast)', href: '${p.parentHref}' },
    ],
  },
});
`;
}
