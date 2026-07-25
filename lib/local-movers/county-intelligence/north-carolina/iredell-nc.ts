import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * iredell — NC Tier 2 Wave 1
 */
export const iredellCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'iredell',
  hubTitle: 'Iredell County Moving Intelligence Hub',
  eyebrow: 'Iredell · Charlotte north · Mooresville / Statesville',
  h1: 'Moving in Iredell County: Mooresville, Lake Norman Edge & I-77 North Growth',
  heroOpener:
    'Iredell County is Charlotte’s northern I-77 / Lake Norman collar — Mooresville multi-family and HOA growth, Lake Norman waterfront and association approaches, Statesville seat multi-story, and freeflow that still peaks hard toward Mecklenburg. It is not Huntersville renamed with a different county label: expect lake last-mile, motorsports/industrial employment corridors, and longer empty miles under one county. This guide is for people moving in Iredell as north-metro growth collar — not a Charlotte core rename.',
  heroCredibility:
    'Charlotte north collar · Lake Norman / I-77 · Mooresville / Statesville · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-77 · I-40 · US-21 · NC-150 · NC-115 · Brawley School Rd corridor',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Mecklenburg County',
    parentHref: '/local-movers/north-carolina/mecklenburg',
    title: 'Compared with Mecklenburg County',
    intro:
      'Iredell is Charlotte north I-77 / Lake Norman growth — not Mecklenburg Uptown elevators and not pure foothills freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Mecklenburg crews fight I-77 peaks into Huntersville and Uptown. Iredell pairs ride I-77, NC-150, and US-21 — freer mid-day further north, still peak-heavy on Mooresville commute windows and lake-edge approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Mecklenburg mixes towers and north-ring HOAs. Iredell mixes Mooresville multi-family, Lake Norman association homes, and Statesville multi-story — more lake-edge and north-collar product, less continuous South End loft density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Lake approaches can need smaller trucks; HOA/association packets dominate Mooresville growth; Statesville seat needs curb plans.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Iredell quotes often track north-metro suburb rates for driveway SFH — lake shuttles and I-77 peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Iredell is Charlotte north Lake Norman collar — not Mecklenburg core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Iredell County different',
    intro: 'I-77 freeflow, Lake Norman last-mile, and Mooresville growth — not interchangeable Huntersville boilerplate alone.',
    bullets: [
      {
        title: 'I-77 north peaks rewrite short-looking locals',
        detail:
          'Iredell ↔ Mecklenburg pairs freer mid-day still burn clock. Ask portal-to-portal.',
      },
      {
        title: 'Lake Norman association access is first-class product',
        detail:
          'Dock approaches, HOA rules, and narrow roads rewrite truck size assumptions.',
      },
      {
        title: 'Mooresville multi-family differs from Statesville seat stock',
        detail:
          'Elevators and lease clusters need inventories different from seat stairs.',
      },
      {
        title: 'Empty miles from Charlotte yards are real',
        detail:
          'Even “local” Iredell pairs can price as distance work for city-based crews.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Iredell zones: Mooresville growth, Lake Norman edge, Statesville seat & northern lots',
  zonesIntro: 'Two to four sharp products — growth multi-family, lake edge, seat multi-story, and northern lots.',
  zones: [
    {
      id: 'mooresville',
      name: 'Mooresville multi-family & HOA growth',
      shortName: 'Mooresville',
      neighborhoods: ["Mooresville","Brawley School corridor","growth villages"],
      housingTypes: 'HOA SFH, multi-family, townhomes',
      challenges: ["HOA packets","I-77 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build I-77 commute buffers.',
      cityKeywords: ["mooresville"],
    },
    {
      id: 'lake-norman',
      name: 'Lake Norman association & waterfront edges',
      shortName: 'Lake Norman',
      neighborhoods: ["Lake Norman edges","association communities"],
      housingTypes: 'SFH, lake homes, association stock',
      challenges: ["Narrow approaches","HOA/association rules","Seasonal staging"],
      moverTips: 'Photo last-mile; discuss shuttle trucks early.',
      cityKeywords: ["lake norman","troutman edges"],
    },
    {
      id: 'statesville',
      name: 'Statesville seat multi-story & older stock',
      shortName: 'Statesville',
      neighborhoods: ["Statesville","downtown","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-40 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["statesville"],
    },
    {
      id: 'north-lots',
      name: 'Northern Iredell larger lots',
      shortName: 'North lots',
      neighborhoods: ["northern tracts","Harmony edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts for long pairs.',
      cityKeywords: ["harmony","north iredell"],
    }
  ],
  specialized: [
    {
      id: 'i77-north',
      title: 'I-77 / Lake Norman north freeflow',
      intro: 'North-metro pairs still peak hard toward Mecklenburg.',
      bullets: ["Price portal-to-portal honestly.","Build buffers for morning and evening peaks."],
    },
    {
      id: 'lake-access',
      title: 'Lake Norman last-mile module',
      intro: 'Waterfront approaches reject full-trailer assumptions.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Confirm association truck limits early."],
    },
    {
      id: 'mooresville-growth',
      title: 'Mooresville growth & multi-family',
      intro: 'Growth density is the north-collar product.',
      bullets: ["Collect HOA and elevator rules before the estimate is final.","Lease clusters stack around school calendars."],
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
        intro: 'Iredell families compare Iredell-Statesville Schools and Mooresville Graded School District feeders — verify address boundaries.',
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
            detail: 'Iredell Health System, Lake Norman Regional, and Charlotte specialty spillover serve the county; map peak I-77 times for ER access.',
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
    intro: 'I-77 freeflow, lake last-mile, and HOA soft costs often matter more than raw miles.',
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
    intro: 'School years, lake tourism weekends, and winter ice reshape demand by pocket.',
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
        label: 'Mecklenburg County movers (parent contrast)',
        href: '/local-movers/north-carolina/mecklenburg',
      },

    ],
  },
});
