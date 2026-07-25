import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** madison — TN Tier 2 Wave 1 */
export const madisonCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'madison',
  hubTitle: 'Madison County Moving Intelligence Hub',
  eyebrow: 'Madison · Jackson · independent West TN hub · vs Memphis defaults',
  h1: 'Moving in Madison County: Jackson & Independent West Tennessee Hub',
  heroOpener: 'Madison County is an independent West Tennessee hub around Jackson — regional medical and university gravity, I-40 west midpoint logistics, and small-city fabric that is not a Memphis suburb rename. Expect Jackson neighborhood mix, rural farm edges, and long-haul patterns toward Shelby without inheriting Memphis alley defaults. This guide is for people moving in Madison as independent Jackson product — not Shelby core.',
  heroCredibility: 'Independent West TN hub · I-40 west · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · US-45 · US-70 · US-412 · SR-18',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent West Tennessee hub (vs Memphis / Shelby defaults)',
    parentHref: '/local-movers/tennessee/shelby',
    title: 'Compared with independent West Tennessee hub (vs Memphis / Shelby defaults)',
    intro: 'Madison is Jackson-centered independent West TN hub — about 80 miles from Memphis, not a Shelby bedroom community and not Nashville collar growth.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Shelby crews fight Midtown/I-240 density. Madison pairs center on Jackson small-city freeflow with I-40 long-haul legs — different choke points entirely.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Shelby mixes river-city stairs and southeast HOAs. Madison mixes Jackson core, growth subdivisions, and agricultural edges.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Jackson street widths and rural driveways dominate over Memphis alley and high-rise inventory.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Jackson SFH often sits below Memphis urban rates — I-40 destination legs still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Madison is West TN inland hub identity — not Shelby renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Madison County different',
    intro: 'Jackson hub logistics and I-40 midpoint long hauls — not a Memphis clone.',
    bullets: [
      {
        title: 'Standalone metro gravity',
        detail: 'Jackson is not a Memphis suburb for day-to-day loading defaults.',
      },
      {
        title: 'Medical and university adjacency',
        detail: 'Hospital and campus areas create recurring staff and student moves.',
      },
      {
        title: 'I-40 long-haul awareness',
        detail: 'Memphis and Nashville interstate legs are common — still list true local carriers first for in-town jobs.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Mississippi and Arkansas destinations flip authority.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Madison zones: Jackson core, growth belts, satellite towns & rural farmland',
  zonesIntro: 'Two to four sharp products under one West TN hub label.',
  zones: [
    {
      id: 'jackson-core',
      name: 'Jackson core & civic/medical districts',
      shortName: 'Jackson core',
      neighborhoods: ["Jackson downtown","medical districts"],
      housingTypes: 'Mixed older housing, multi-unit',
      challenges: ["Street width","Medical streets"],
      moverTips: 'Confirm older housing access notes.',
      cityKeywords: ["jackson"],
    },
    {
      id: 'jackson-growth',
      name: 'North and south Jackson growth',
      shortName: 'Jackson growth',
      neighborhoods: ["north Jackson","south Jackson"],
      housingTypes: 'Retail corridors, newer subdivisions',
      challenges: ["HOA","Cul-de-sac turnarounds"],
      moverTips: 'Collect HOA packets on newer plats.',
      cityKeywords: ["jackson growth"],
    },
    {
      id: 'satellites',
      name: 'Three Way, Medina edges & small towns',
      shortName: 'Satellites',
      neighborhoods: ["Three Way","Medina"],
      housingTypes: 'Satellite communities',
      challenges: ["Empty miles"],
      moverTips: 'Budget freeflow between pockets.',
      cityKeywords: ["three way","medina"],
    },
    {
      id: 'rural',
      name: 'Rural Madison farmland',
      shortName: 'Rural',
      neighborhoods: ["farm lots","large parcels"],
      housingTypes: 'Agricultural lots',
      challenges: ["Driveway","Power lines"],
      moverTips: 'Survey driveway capacity early.',
      cityKeywords: ["madison tn rural"],
    }
  ],
  specialized: [
    {
      id: 'jackson-hub',
      title: 'Jackson regional hub',
      intro: 'Madison is West TN’s middle market — not a Shelby bedroom.',
      bullets: ["Do not paste Memphis access notes onto Jackson inventories."],
    },
    {
      id: 'med-university',
      title: 'Medical and university adjacency',
      intro: 'Hospital and campus areas create recurring household cycles.',
      bullets: ["Ask about campus and hospital-adjacent parking."],
    },
    {
      id: 'i40-midpoint',
      title: 'I-40 long-haul awareness',
      intro: 'Memphis and Nashville interstate legs are common.',
      bullets: ["Price destination legs separately from Jackson-local moves."],
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
        intro: 'Madison families compare Jackson-Madison County School System feeders — verify boundaries; do not assume Shelby maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Tennessee DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Jackson-Madison County General Hospital anchors local care; Memphis tertiary for highly specialized cases; map local freeflow.',
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
    intro: 'Empty miles on rural edges and I-40 destination legs often matter more than raw in-town miles.',
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
    intro: 'School years and regional medical calendars reshape demand more than Memphis port peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Tennessee TDOR motor carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Shelby County movers (parent contrast)', href: '/local-movers/tennessee/shelby' },
    ],
  },
});
