import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Hunterdon — NJ Tier 2 Wave 1 · Flemington / western semi-rural · parent Somerset (+ Morris) */
export const hunterdonCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'hunterdon',
  hubTitle: 'Hunterdon County Moving Intelligence Hub',
  eyebrow: 'Hunterdon · western hills · vs Somerset / Morris',
  h1: 'Moving in Hunterdon County: Flemington, Clinton Villages & I-78 Western Hills',
  heroOpener:
    'Hunterdon is western semi-rural suburbia — Flemington services, Clinton and High Bridge village streets, Delaware River townships, and larger lots toward the hills. Compared with Somerset’s Bridgewater corporate HOAs or Morris’s denser Morristown/Parsippany product, Hunterdon jobs skew long driveways, historic stair geometry, soft ground after rain, and I-78 portal-to-portal time from regional crews. This guide is for people moving in Hunterdon as space-and-village product — not a Somerset rename.',
  heroCredibility:
    'Western hills · Larger lots · Village streets · I-78 · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-78 · Route 202 · Route 31 · Route 12 · Route 29',
  parentCompare: {
    parentLabel: 'Somerset County',
    parentHref: '/local-movers/new-jersey/somerset',
    title: 'Compared with Somerset County',
    intro:
      'Hunterdon is western hills and village access — not Bridgewater corporate parks with a different nameplate. Use Somerset (and denser Morris) as the parent suburban contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Somerset crews fight I-287 / Route 22 corporate peaks. Hunterdon pairs ride I-78, Routes 202/31/12/29 — freer mid-day than Bridgewater cores, still peak-heavy on I-78 eastbound and longer empty miles from denser crew bases.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Somerset skews planned townhomes and upscale SFH. Hunterdon mixes village multi-story, larger-lot homes, equestrian/farm edges, and historic interiors — more driveway and stair risk, less continuous HOA gate lists.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Somerset defaults to HOA COIs and cul-de-sac staging. Hunterdon defaults to gravel approaches, low wires, septic setbacks, and shuttle risk when trailers cannot reach the house.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Hunterdon quotes often sit near or above dense Somerset rates for comparable square footage when driveway shuttles and historic stairs apply — travel minimums are common and legitimate.',
      },
      {
        title: 'Role difference',
        detail:
          'Hunterdon is western space and village product on I-78 — not Somerset’s corporate-park engine. Match crews to last-mile access photos, not only HOA templates.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Hunterdon County different',
    intro: 'Country access is the #1 estimate killer — not elevator freight.',
    bullets: [
      {
        title: 'Long rural approaches',
        detail:
          'Gravel, single-lane bridges, and gated entries can force smaller trucks or multiple trips. Send video of the last quarter mile.',
      },
      {
        title: 'Historic village stairs',
        detail:
          'Clinton, Flemington edges, and older multi-story homes need careful padding and stair measurements.',
      },
      {
        title: 'I-78 commute clock',
        detail:
          'Professionals heading east feel peak congestion — hourly moves should avoid those windows when possible.',
      },
      {
        title: 'Soft ground after rain',
        detail:
          'Unpaved drives can strand heavy trucks in spring thaw — plan staging and weather backups.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Hunterdon zones: Flemington, Clinton villages, river west & eastern townships',
  zonesIntro: 'Village cores and agricultural edges need different truck choices.',
  zones: [
    {
      id: 'flemington',
      name: 'Flemington area',
      shortName: 'Flemington',
      neighborhoods: ['Flemington', 'Raritan Twp areas'],
      housingTypes: 'Village homes, suburban infill, shopping-corridor apartments',
      challenges: ['Downtown parking', 'Mixed-age housing stock'],
      moverTips: 'Reserve street space early for downtown deliveries.',
      cityKeywords: ['flemington', 'raritan'],
    },
    {
      id: 'clinton-north',
      name: 'Clinton & northern villages',
      shortName: 'Clinton',
      neighborhoods: ['Clinton', 'High Bridge', 'Lebanon'],
      housingTypes: 'Historic village homes, hillside lots',
      challenges: ['Steep drives', 'Narrow streets', 'Older stairs'],
      moverTips: 'Measure stair width; hillside homes may need extra crew.',
      cityKeywords: ['clinton', 'high bridge', 'lebanon'],
    },
    {
      id: 'west-delaware',
      name: 'Delaware River townships',
      shortName: 'River west',
      neighborhoods: ['Stockton area', 'western townships'],
      housingTypes: 'Country homes, some floodplain-adjacent parcels',
      challenges: ['Floodplain awareness', 'Long access', 'Limited staging'],
      moverTips: 'Check flood maps; avoid heavy trucks on soft river-bottom soils after rain.',
      cityKeywords: ['stockton', 'delaware'],
    },
    {
      id: 'east-readington',
      name: 'Readington & eastern townships',
      shortName: 'East Hunterdon',
      neighborhoods: ['Readington', 'Whitehouse Station area'],
      housingTypes: 'Large lots, newer builds mixed with farms',
      challenges: ['Driveway length', 'I-78 interchange traffic'],
      moverTips: 'Plan arrivals outside peak I-78 merges.',
      cityKeywords: ['readington', 'whitehouse'],
    },
  ],
  specialized: [
    {
      id: 'rural-driveway',
      title: 'Rural driveway & long-access module',
      intro: 'Country access rewrites the estimate more than square footage.',
      bullets: [
        'Photo gates, switchbacks, and overhead wires.',
        'Ask whether a shuttle from the road is included or extra.',
        'Mark septic lids and wells so trucks do not drive over them.',
      ],
    },
    {
      id: 'historic-stairs',
      title: 'Historic home handling',
      intro: 'Older interiors need slower carries and more protection.',
      bullets: [
        'Flag fragile plaster and original floors on the walkthrough.',
        'Confirm valuation coverage for antiques.',
      ],
    },
    {
      id: 'i78-timing',
      title: 'I-78 freeflow module',
      intro: 'Eastbound peaks turn “short” western pairs into long billable hours.',
      bullets: [
        'Prefer mid-morning midweek for I-78-adjacent hauls.',
        'Confirm portal-to-portal terms on the estimate.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Hunterdon uses local and regional districts (including systems serving Flemington-Raritan, North Hunterdon-Voorhees region, Delaware Valley region, and others).',
        bullets: [
          {
            title: 'Regional high schools',
            detail:
              'Many students attend regional high schools drawing multiple municipalities — research both elementary feeders and the high school campus via NJ DOE reports.',
          },
          {
            title: 'Bus rides',
            detail:
              'Rural addresses can mean longer bus times — ask about routes if that matters for your family.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Hunterdon Medical Center (Flemington area)',
            detail:
              'Primary local hospital resource for much of the county; confirm specialty coverage and transfer relationships.',
          },
          {
            title: 'Travel for tertiary care',
            detail:
              'Some residents use New Brunswick, Morristown, or Philadelphia systems — map drive times.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Hunterdon County',
    intro: 'Travel time and access complexity often outweigh pure inventory size.',
    drivers: [
      {
        title: 'Driveway shuttle',
        detail: 'Common when trailers cannot reach the house.',
      },
      {
        title: 'Regional travel minimums',
        detail: 'Some crews price from denser bases.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$950+' },
      { label: 'Family / large-lot home', value: '$1,700–$3,600+' },
      { label: '2-person crew', value: '$110–$165+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Mud season and foliage weekends both affect access.',
    items: [
      {
        title: 'Spring thaw',
        detail: 'Unpaved drives soften — reschedule heavy trucks after multi-day rain.',
      },
      {
        title: 'Fall foliage tourism',
        detail: 'Western roads get visitor traffic; start early on peak weekends.',
      },
    ],
  },
  resources: {
    title: 'Useful Hunterdon County resources',
    items: [
      {
        label: 'Hunterdon County',
        href: 'https://www.co.hunterdon.nj.us/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Somerset County guide (parent contrast)',
        href: '/local-movers/new-jersey/somerset',
      },
      {
        label: 'Directory: Hunterdon filter',
        href: '/companies?coverage=state&state=NJ&counties=hunterdon',
      },
    ],
  },
  directoryHint: 'Share driveway photos and stair measurements with every quote request.',
  lastReviewed: '2026-07-22',
});
