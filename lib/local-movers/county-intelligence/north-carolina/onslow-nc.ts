import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * onslow — NC Tier 2 Wave 1
 */
export const onslowCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'onslow',
  hubTitle: 'Onslow County Moving Intelligence Hub',
  eyebrow: 'Onslow · Jacksonville — Camp Lejeune / coastal military',
  h1: 'Moving in Onslow County: Jacksonville, Camp Lejeune PCS & Coastal Access',
  heroOpener:
    'Onslow County is coastal military independent product — Camp Lejeune PCS calendars, Jacksonville multi-family corridors, coastal-edge humidity and storm risk, and freeflow on US-17 / NC-24 that is not Wilmington beach tourism with different labels. Expect order-driven report dates, base-access logistics, and coastal-plain empty miles under one county. This guide is for people moving in Onslow as Camp Lejeune PCS market — not a New Hanover rename and not Fort Liberty copy.',
  heroCredibility:
    'Camp Lejeune PCS · Jacksonville multi-family · Coastal plain · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-17 · NC-24 · Western Boulevard · Lejeune Boulevard · base-access roads',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent coastal military (vs New Hanover / Wilmington defaults)',
    parentHref: '/local-movers/north-carolina/new-hanover',
    title: 'Compared with independent coastal military (vs New Hanover / Wilmington defaults)',
    intro:
      'Onslow is Camp Lejeune PCS coastal military product — not New Hanover Wilmington tourism density and not Cumberland Fort Liberty Army patterns alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'New Hanover crews fight I-40 terminus coastal peaks and beach association freeflow. Onslow pairs ride US-17, NC-24, and base-access roads — freer mid-day coastal plain freeflow, still peak-heavy on Jacksonville arterials and PCS lease-end clusters.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'New Hanover mixes historic downtown and beach elevators. Onslow mixes base-adjacent multi-family, Jacksonville multi-unit, and coastal-edge rentals — more PCS turnover product, less continuous Wilmington tourism density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Base-adjacent apartments need COIs and parking plans; humidity protection matters; rural inland edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Onslow quotes often track coastal military secondary rates for multi-family — PCS peaks and humidity staging can price above quiet inland driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Onslow is Camp Lejeune PCS independent coastal military — not Wilmington or Fort Liberty product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Onslow County different',
    intro: 'PCS report dates, Jacksonville multi-family, and coastal humidity — not interchangeable Wilmington boilerplate.',
    bullets: [
      {
        title: 'Camp Lejeune PCS orders compress calendars',
        detail:
          'Report dates drive surveys more than preferred Saturdays.',
      },
      {
        title: 'Jacksonville multi-family corridors turn over quickly',
        detail:
          'Elevators, parking, and month-end clusters stack around training cycles.',
      },
      {
        title: 'US-17 / NC-24 freeflow is still billable',
        detail:
          'Coastal-plain pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Humidity and storm risk affect staging',
        detail:
          'Protect cardboard and electronics; confirm weather contingency language.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Onslow zones: base-adjacent multi-family, central Jacksonville, coastal edges & inland lots',
  zonesIntro: 'Two to four sharp products — base multi-family, city core, coastal edges, and inland lots.',
  zones: [
    {
      id: 'base-adjacent',
      name: 'Camp Lejeune–adjacent multi-family',
      shortName: 'Base adjacent',
      neighborhoods: ["Lejeune Boulevard multi-family","base-adjacent apartments"],
      housingTypes: 'Multi-family, apartments',
      challenges: ["PCS clusters","Parking limits","COI packets"],
      moverTips: 'Book around report dates; collect building rules.',
      cityKeywords: ["jacksonville base","lejeune"],
    },
    {
      id: 'jacksonville-core',
      name: 'Central Jacksonville multi-unit & older stock',
      shortName: 'Jacksonville',
      neighborhoods: ["Jacksonville","Western Boulevard corridors"],
      housingTypes: 'Multi-unit, older SFH, townhomes',
      challenges: ["Stairs/elevators","Street parking","US-17 freeflow"],
      moverTips: 'Inventory access type; prefer mid-week mornings when possible.',
      cityKeywords: ["jacksonville"],
    },
    {
      id: 'coastal-edge',
      name: 'Coastal-edge communities',
      shortName: 'Coastal edge',
      neighborhoods: ["Hubert edges","Sneads Ferry edges","coastal rentals"],
      housingTypes: 'SFH, multi-family, rentals',
      challenges: ["Humidity","Storm risk","Narrow approaches"],
      moverTips: 'Protect loads from humidity; photo last-mile.',
      cityKeywords: ["hubert","sneads ferry"],
    },
    {
      id: 'inland-lots',
      name: 'Western inland larger lots',
      shortName: 'Inland lots',
      neighborhoods: ["Richlands edges","western tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts for long pairs.',
      cityKeywords: ["richlands","west onslow"],
    }
  ],
  specialized: [
    {
      id: 'pcs-cycles',
      title: 'Camp Lejeune PCS cycle module',
      intro: 'Order-driven calendars dominate volume.',
      bullets: ["Align surveys with report dates.","Document inventory carefully for military claims processes."],
    },
    {
      id: 'jax-multi',
      title: 'Jacksonville multi-family access',
      intro: 'Elevators and parking are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Month-end clusters stack; book capacity early."],
    },
    {
      id: 'coastal-plain',
      title: 'Coastal plain freeflow & weather',
      intro: 'US-17/NC-24 pairs and humidity rewrite quiet Piedmont assumptions.',
      bullets: ["Price portal-to-portal honestly.","Build weather contingency into unload plans."],
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
        intro: 'Onslow families compare Onslow County Schools feeders across Jacksonville and coastal communities — verify address boundaries; do not assume New Hanover maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NCDPI data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Onslow Memorial Hospital, Naval Medical facilities for eligible populations, and regional specialty spillover serve the county; map peak US-17 / NC-24 times for ER access.',
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
    intro: 'PCS peaks, multi-family access, and coastal humidity staging often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'PCS cycles, school years, hurricane season, and humidity reshape demand more than pure civilian weekend calendars.',
    items: [
      {
        title: 'Late spring – early fall',
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
      'Official links first; directory listings are independent. Verify NCUC household-goods certification for in-state North Carolina moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent coastal military (vs New Hanover / Wilmington defaults) movers (parent contrast)',
        href: '/local-movers/north-carolina/new-hanover',
      },
      {
        label: 'Cumberland County movers',
        href: '/local-movers/north-carolina/cumberland',
      },
    ],
  },
});
