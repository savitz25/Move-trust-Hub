import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * graham — AZ Tier 2 Wave 1
 */
export const grahamCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'graham',
  hubTitle: 'Graham County Moving Intelligence Hub',
  eyebrow: 'Graham · Safford — upper Gila valley',
  h1: 'Moving in Graham County: Safford, Thatcher & Upper Gila Valley Access',
  heroOpener:
    'Graham County is southeast Arizona interior valley product — Safford multi-story and seat stock, Thatcher multi-family and college edges, Pima town and rural valley lots, and freeflow on US-70 that is not Phoenix or Tucson metro density with different labels. Expect small regional-hub logistics, long empty miles, and extreme heat under one county. This guide is for people moving in Graham as independent SE interior — not Phoenix/Tucson defaults.',
  heroCredibility:
    'SE interior independent · Safford regional hub · US-70 freeflow · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-70 · US-191 · AZ-366 · AZ-266',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent SE interior (vs Pima / Maricopa defaults)',
    parentHref: '/local-movers/arizona/pima',
    title: 'Compared with independent SE interior (vs Pima / Maricopa defaults)',
    intro:
      'Graham is independent SE interior small regional-hub product — not Tucson metro density and not Phoenix Loop sprawl.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Pima crews fight Tucson arterials. Graham pairs ride US-70 and US-191 — freer mid-day valley freeflow, still peak-heavy on Safford arterials and long empty-mile approaches from metro yards.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Pima mixes Tucson multi-story and foothill HOAs. Graham mixes Safford multi-unit, Thatcher multi-family, and rural valley lots — more small-hub product, less continuous metro density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; rural valley lots add soft shoulders; long empty miles dominate.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Graham quotes often sit at SE secondary rates for driveway SFH — multi-story access and long empty-mile pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Graham is independent SE interior hub — not Tucson or Phoenix product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Graham County different',
    intro: 'Small regional-hub multi-story, US-70 freeflow, and long empty miles — not interchangeable metro boilerplate.',
    bullets: [
      {
        title: 'Safford multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'Long empty miles from metro yards are real',
        detail:
          'Even “regional” pairs can price as distance work for Tucson- or Phoenix-based crews.',
      },
      {
        title: 'US-70 freeflow is still billable',
        detail:
          'Valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Extreme heat still governs summer open carries',
        detail:
          'Early starts outperform noon load-outs May–September.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Graham zones: Safford multi-story, Thatcher multi-family, Pima town edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, college multi-family, town edges, and rural lots.',
  zones: [
    {
      id: 'safford',
      name: 'Safford multi-story & seat stock',
      shortName: 'Safford',
      neighborhoods: ["Safford","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","US-70 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["safford"],
    },
    {
      id: 'thatcher',
      name: 'Thatcher multi-family & college edges',
      shortName: 'Thatcher',
      neighborhoods: ["Thatcher","college multi-family"],
      housingTypes: 'Multi-family, SFH, townhomes',
      challenges: ["Lease clusters","Elevators/stairs","Arterial timing"],
      moverTips: 'Book around term windows when near campus; confirm access type.',
      cityKeywords: ["thatcher"],
    },
    {
      id: 'pima-town',
      name: 'Pima town & valley edges',
      shortName: 'Pima town',
      neighborhoods: ["Pima","valley multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["pima az town"],
    },
    {
      id: 'rural-valley',
      name: 'Rural upper Gila valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","eastern lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Heat staging"],
      moverTips: 'Photo approaches; early starts beat heat peaks.',
      cityKeywords: ["rural graham"],
    }
  ],
  specialized: [
    {
      id: 'small-hub',
      title: 'Safford small regional-hub module',
      intro: 'Seat multi-story dominates hub volume.',
      bullets: ["Inventory stairs and curb width.","Do not recycle Tucson or Phoenix day rates alone."],
    },
    {
      id: 'us70-freeflow',
      title: 'US-70 valley freeflow',
      intro: 'Interior pairs still peak hard; empty miles matter.',
      bullets: ["Price portal-to-portal honestly.","Clarify Pima or Cochise second addresses early."],
    },
    {
      id: 'heat-pacing',
      title: 'Desert heat pacing module',
      intro: 'Summer open carries are first-class labor-hours drivers.',
      bullets: ["Prefer early starts May–September.","Pace crews and protect inventories."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Graham families compare Safford, Thatcher, Pima, and related district feeders — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Arizona DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Mt. Graham Regional Medical Center and Tucson specialty spillover serve the county; map peak US-70 times for ER access.',
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
    intro: 'Multi-story access, long empty miles, and heat pacing often matter more than raw miles.',
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
    intro: 'School years, college calendars, monsoon weather, and extreme heat reshape demand by pocket.',
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
      'Official links first; directory listings are independent. Verify Arizona Corporation Commission (ACC) entity status for in-state Arizona moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent SE interior (vs Pima / Maricopa defaults) movers (parent contrast)',
        href: '/local-movers/arizona/pima',
      },

    ],
  },
});
