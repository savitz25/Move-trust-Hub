import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * gaston — NC Tier 2 Wave 1
 */
export const gastonCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'gaston',
  hubTitle: 'Gaston County Moving Intelligence Hub',
  eyebrow: 'Gaston · Charlotte west · Gastonia / Belmont',
  h1: 'Moving in Gaston County: Gastonia, Belmont & West-Collar I-85 Access',
  heroOpener:
    'Gaston County is Charlotte’s western collar — Gastonia seat multi-story and industrial-residential mix, Belmont and Mount Holly east-edge growth toward the river, Cramerton and Dallas corridors, and I-85 / US-321 freeflow that is not Ballantyne HOA product with western labels. Expect mixed mill-town stock, west-collar empty miles, and river-edge densification under one county. This guide is for people moving in Gaston as west-metro collar — not a Mecklenburg rename.',
  heroCredibility:
    'Charlotte west collar · Gastonia / Belmont · I-85 / US-321 · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-85 · US-321 · US-74 · NC-279 · Wilkinson Blvd',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Mecklenburg County',
    parentHref: '/local-movers/north-carolina/mecklenburg',
    title: 'Compared with Mecklenburg County',
    intro:
      'Gaston is Charlotte west collar on I-85 / Wilkinson — not Mecklenburg South End elevators and not pure rural foothills freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Mecklenburg crews fight west approaches and Uptown peaks. Gaston pairs ride I-85, Wilkinson Blvd, and US-321 — freer mid-day west of the river, still peak-heavy toward Mecklenburg portals and Belmont/Mount Holly commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Mecklenburg mixes towers and south-ring HOAs. Gaston mixes Gastonia multi-story, mill-era stock, Belmont multi-family growth, and western larger lots — more industrial-residential fabric, less continuous Uptown vertical product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Older seat streets need curb plans; east-edge growth adds HOA packets; soft shoulders appear farther west.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Gaston quotes often sit near west-metro secondary rates for driveway SFH — multi-story access and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Gaston is Charlotte west collar — not Mecklenburg core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Gaston County different',
    intro: 'West-collar freeflow, mill-town multi-story, and river-edge growth — not interchangeable Ballantyne boilerplate.',
    bullets: [
      {
        title: 'I-85 / Wilkinson freeflow is still billable',
        detail:
          'Gaston ↔ Mecklenburg pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Gastonia multi-story is first-class product',
        detail:
          'Seat stairs and curb plans need inventories different from Belmont growth cul-de-sacs.',
      },
      {
        title: 'Belmont / Mount Holly east edge densifies',
        detail:
          'Multi-family and HOA soft costs appear closer to the river.',
      },
      {
        title: 'Industrial-residential mix rewrites truck type',
        detail:
          'Mill-adjacent streets reject pure south-ring HOA day-rate assumptions.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Gaston zones: Gastonia seat, Belmont/Mount Holly east, US-321 corridor & western lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, east growth, corridor stock, and western lots.',
  zones: [
    {
      id: 'gastonia-seat',
      name: 'Gastonia multi-story & industrial-residential',
      shortName: 'Gastonia',
      neighborhoods: ["Gastonia","downtown edges","mill-adjacent stock"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Tight streets","I-85 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["gastonia"],
    },
    {
      id: 'east-edge',
      name: 'Belmont / Mount Holly / Cramerton east edge',
      shortName: 'East edge',
      neighborhoods: ["Belmont","Mount Holly","Cramerton"],
      housingTypes: 'Multi-family, HOA SFH, townhomes',
      challenges: ["HOA packets","Wilkinson peaks","River-bridge freeflow"],
      moverTips: 'Collect HOA COIs; build bridge/commute buffers.',
      cityKeywords: ["belmont","mount holly","cramerton"],
    },
    {
      id: 'us321',
      name: 'US-321 / Dallas corridor',
      shortName: 'US-321 corridor',
      neighborhoods: ["Dallas","High Shoals edges","US-321 multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","Mixed access"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["dallas","high shoals"],
    },
    {
      id: 'west-lots',
      name: 'Western Gaston larger lots',
      shortName: 'West lots',
      neighborhoods: ["Bessemer City edges","Cherryville edges","western tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["bessemer city","cherryville"],
    }
  ],
  specialized: [
    {
      id: 'west-collar',
      title: 'I-85 / Wilkinson west-collar freeflow',
      intro: 'West-metro pairs still peak hard toward Mecklenburg.',
      bullets: ["Price portal-to-portal honestly.","Clarify Mecklenburg second addresses early."],
    },
    {
      id: 'east-growth',
      title: 'Belmont / Mount Holly growth module',
      intro: 'East-edge densification is the river product.',
      bullets: ["Collect HOA packets before the estimate is final.","Build buffers for bridge and I-85 peaks."],
    },
    {
      id: 'gastonia-seat',
      title: 'Gastonia multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
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
        intro: 'Gaston families compare Gaston County Schools feeders across Gastonia, Belmont, Mount Holly, and western towns — verify address boundaries.',
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
            detail: 'CaroMont Regional and Charlotte specialty spillover serve the county; map peak I-85 / Wilkinson times for ER access.',
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
    intro: 'West-collar freeflow, multi-story access, and HOA soft costs on the east edge often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter ice on western approaches reshape demand by pocket.',
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
