import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * clallam â€” WA Tier 2 Wave 1
 */
export const clallamCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'clallam',
  hubTitle: 'Clallam County Moving Intelligence Hub',
  eyebrow: 'Clallam · Port Angeles / Sequim — Olympic Peninsula',
  h1: 'Moving in Clallam County: Port Angeles, Sequim & Olympic Peninsula Access',
  heroOpener:
    'Clallam County is Olympic Peninsula end-of-road product — Port Angeles multi-story and multi-family stock, Sequim multi-family and growth edges, Forks and western long empty miles, and freeflow on US-101 that is not Kitsap ferry-suburb product with different labels. Expect ferry connections, rain staging, and discontinuous peninsula logistics under one county. This guide is for people moving in Clallam as independent peninsula market — not a Kitsap rename.',
  heroCredibility:
    'Olympic Peninsula independent · Port Angeles / Sequim · End-of-road logistics · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-101 · SR-112 · SR-113 · ferry approaches · Lauridsen Blvd corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent Olympic Peninsula (vs Kitsap defaults)',
    parentHref: '/local-movers/washington/kitsap',
    title: 'Compared with independent Olympic Peninsula (vs Kitsap defaults)',
    intro:
      'Clallam is independent peninsula end-of-road product on US-101 — not Kitsap continuous ferry-suburb multi-family density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Kitsap crews fight ferry/SR-16 peaks into Bremerton. Clallam pairs ride US-101 and peninsula arterials — freer mid-day peninsula freeflow, still peak-heavy on Port Angeles arterials, Sequim growth windows, and ferry connections.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Kitsap mixes Bremerton multi-family and Silverdale HOAs. Clallam mixes Port Angeles multi-story, Sequim multi-family, and western rural lots — more end-of-road product, less continuous peninsula-suburb density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; multi-family elevators appear on Sequim growth; western lots add long empty miles and soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Clallam quotes often track peninsula secondary rates for multi-story access — long empty-mile pairs from the Sound price as distance work.',
      },
      {
        title: 'Role difference',
        detail:
          'Clallam is independent Olympic Peninsula end-of-road — not Kitsap product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Clallam County different',
    intro: 'Peninsula multi-story, ferry connections, and end-of-road empty miles — not interchangeable Kitsap boilerplate.',
    bullets: [
      {
        title: 'End-of-road empty miles are first-class cost drivers',
        detail:
          'Sound-to-peninsula pairs fail when crews assume continuous multi-family density.',
      },
      {
        title: 'Port Angeles multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure Sequim cul-de-sacs.',
      },
      {
        title: 'Ferry connections rewrite schedules',
        detail:
          'Sailing windows and truck limits are first-class survey inputs for some pairs.',
      },
      {
        title: 'Rain staging rewrites open-carry plans',
        detail:
          'Protect cardboard and plan covered unload windows.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Clallam zones: Port Angeles multi-story, Sequim multi-family, Forks edges & western rural lots',
  zonesIntro: 'Two to four sharp products — hub multi-story, multi-family growth, western edges, and rural lots.',
  zones: [
    {
      id: 'port-angeles',
      name: 'Port Angeles multi-story & multi-unit',
      shortName: 'Port Angeles',
      neighborhoods: ["Port Angeles","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","US-101 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["port angeles"],
    },
    {
      id: 'sequim',
      name: 'Sequim multi-family & growth edges',
      shortName: 'Sequim',
      neighborhoods: ["Sequim","growth multi-family","HOA edges"],
      housingTypes: 'Multi-family, HOA SFH, townhomes',
      challenges: ["Elevators","HOA packets","Lease clusters"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["sequim"],
    },
    {
      id: 'forks',
      name: 'Forks / western corridor edges',
      shortName: 'Forks',
      neighborhoods: ["Forks","western multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Long empty miles","Rain staging"],
      moverTips: 'Prefer early starts for long pairs; survey approaches.',
      cityKeywords: ["forks"],
    },
    {
      id: 'rural-west',
      name: 'Western rural peninsula lots',
      shortName: 'Rural west',
      neighborhoods: ["rural tracts","western approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Rain staging"],
      moverTips: 'Survey approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["west clallam"],
    }
  ],
  specialized: [
    {
      id: 'peninsula-end',
      title: 'Olympic Peninsula end-of-road module',
      intro: 'Long empty miles dominate Sound-to-peninsula pricing.',
      bullets: ["Price portal-to-portal from mainland staging honestly.","Do not recycle Kitsap ferry-suburb day rates alone."],
    },
    {
      id: 'pa-seat',
      title: 'Port Angeles multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'ferry-rain',
      title: 'Ferry connection & rain staging',
      intro: 'Sailing windows and weather are first-class logistics inputs.',
      bullets: ["Confirm ferry truck size limits when applicable.","Protect cardboard and plan covered unload windows."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes Ã¢â‚¬â€ primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Clallam families compare Port Angeles, Sequim, Quillayute Valley, and related district feeders — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use OSPI data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Olympic Medical Center and regional specialty spillover serve the county; map peak US-101 times for ER access.',
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
    intro: 'Multi-story access, end-of-road empty miles, and rain staging often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450Ã¢â‚¬â€œ$1,200+' },
      { label: '3Ã¢â‚¬â€œ4 BR home', value: '$1,600Ã¢â‚¬â€œ$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115Ã¢â‚¬â€œ$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, tourism shoulders, ferry peak seasons, and rain reshape demand by pocket.',
    items: [
      {
        title: 'Late spring Ã¢â‚¬â€œ early fall',
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
      'Official links first; directory listings are independent. Verify Washington UTC household goods permit for in-state Washington moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent Olympic Peninsula (vs Kitsap defaults) movers (parent contrast)',
        href: '/local-movers/washington/kitsap',
      },

    ],
  },
});
