import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * sullivan — NY Tier 2 Wave 2
 */
export const sullivanCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'sullivan',
  hubTitle: 'Sullivan County Moving Intelligence Hub',
  eyebrow: 'Sullivan · Monticello Catskills · vs Ulster / Orange',
  h1: 'Moving in Sullivan County: Monticello, Catskills Resorts & NY-17 Access',
  heroOpener:
    'Sullivan County is Catskills interior product — Monticello multi-story and seat density, resort and bungalow-colony stock, Liberty and Fallsburg corridors, and NY-17 freeflow that is not Ulster college-town density and not Orange outer-NYC collar. Expect longer empty miles, seasonal tourism peaks, and mountain last-mile that rejects full trailers more often than Kingston or Middletown driveway days. This guide is for people moving in Sullivan as Monticello Catskills — not Ulster or Orange renames.',
  heroCredibility:
    'Monticello Catskills · Resort seasonal product · NY-17 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'NY-17 · NY-42 · NY-52 · NY-55 · NY-97 · NY-17B',
  parentCompare: {
    parentLabel: 'Ulster County (and Orange Hudson Valley patterns)',
    parentHref: '/local-movers/new-york/ulster',
    title: 'Compared with Ulster County (and Orange Hudson Valley patterns)',
    intro:
      'Sullivan is Monticello / Catskills interior resort-and-rural product — not New Paltz college density and not Orange Thruway retail freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Ulster crews fight Kingston/New Paltz peaks; Orange rides I-87/I-84. Sullivan pairs ride NY-17, NY-42, and mountain corridors — freer mid-day interior freeflow, still peak-heavy on summer resort weekends and Monticello arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Ulster mixes college multi-family and river-city stock; Orange mixes outer-collar growth. Sullivan mixes Monticello multi-story, resort cottages, bungalow colonies, and large rural lots — more seasonal product, less continuous college or outlet-corridor density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Mountain and resort approaches often need smaller trucks; seasonal properties rewrite curb plans more often than pure Kingston driveway jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Sullivan quotes often sit at secondary Catskills rates for simple SFH — mountain shuttles and seasonal peaks can price above quiet Ulster driveway days.',
      },
      {
        title: 'Role difference',
        detail:
          'Sullivan is Catskills interior Monticello product — not Ulster Hudson west college edge renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Sullivan County different',
    intro: 'Resort calendars, mountain last-mile, and NY-17 freeflow — not an Ulster clone.',
    bullets: [
      {
        title: 'Seasonal resort product is first-class',
        detail:
          'Summer peaks and vacation-turn clusters fill crews differently than year-round college towns.',
      },
      {
        title: 'Mountain last-mile rewrites truck size',
        detail:
          'Photo approaches; many properties reject full trailers.',
      },
      {
        title: 'NY-17 freeflow is still billable',
        detail:
          'Long interior pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'PA adjacency creates interstate legs',
        detail:
          'Short-looking border hops still need FMCSA authority.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Sullivan zones: Monticello core, Liberty/Fallsburg corridors, resort edges & rural Catskills',
  zonesIntro: 'Two to four sharp products — seat city, resort corridors, seasonal colonies, and deep rural lots.',
  zones: [
    {
      id: 'monticello-core',
      name: 'Monticello seat core',
      shortName: 'Monticello',
      neighborhoods: ["Monticello","downtown","seat edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Arterial timing"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["monticello"],
    },
    {
      id: 'liberty-fallsburg',
      name: 'Liberty / Fallsburg corridors',
      shortName: 'Liberty / Fallsburg',
      neighborhoods: ["Liberty","Fallsburg","corridor towns"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Seasonal peaks","Mixed access"],
      moverTips: 'Book early around summer peaks; confirm building rules.',
      cityKeywords: ["liberty","fallsburg"],
    },
    {
      id: 'resort-edges',
      name: 'Resort & bungalow-colony edges',
      shortName: 'Resort edges',
      neighborhoods: ["resort properties","colony roads","lake edges"],
      housingTypes: 'Seasonal homes, cottages, multi-unit resorts',
      challenges: ["Narrow roads","Seasonal access","Long carries"],
      moverTips: 'Photo last-mile; plan smaller trucks; confirm seasonal access rules.',
      cityKeywords: ["catskills resort"],
    },
    {
      id: 'rural-catskills',
      name: 'Rural Catskills lots',
      shortName: 'Rural Catskills',
      neighborhoods: ["Callicoon edges","western towns","interior lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Grades","Winter ice"],
      moverTips: 'Photo approaches; allow winter buffers.',
      cityKeywords: ["callicoon"],
    }
  ],
  specialized: [
    {
      id: 'resort-seasonal',
      title: 'Catskills resort & seasonal turnover',
      intro: 'Summer peaks rewrite demand and curb plans.',
      bullets: ["Book early for peak summer weekends.","Confirm access rules for seasonal properties."],
    },
    {
      id: 'mountain-last-mile',
      title: 'Mountain last-mile & truck size',
      intro: 'Many approaches reject full trailers.',
      bullets: ["Photo last-mile before surveys finalize.","Shuttle conversations beat stuck trailers."],
    },
    {
      id: 'ny17-freeflow',
      title: 'NY-17 interior freeflow',
      intro: 'Long pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Ulster college-town rates for deep resort roads."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Sullivan families compare Monticello, Liberty, Fallsburg, Sullivan West, and other districts — verify boundaries; resort and rural feeders differ.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, college towns, and seasonal markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Garnet Health (Catskills) and regional clinics anchor acute care; map peak freeflow across Monticello–Liberty corridors and mountain weather days.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks and weather days, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'Mountain access, seasonal peaks, and empty miles often matter more than raw miles.',
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
        detail: 'Far pockets price differently from seat cores.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,600–$4,000+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$115–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Summer resort peaks, school years, and winter mountain ice reshape demand more than Ulster college calendars alone.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, lake edges, and rural approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Ulster County (and Orange Hudson Valley patterns) movers (parent contrast)',
        href: '/local-movers/new-york/ulster',
      },
    ],
  },
});
