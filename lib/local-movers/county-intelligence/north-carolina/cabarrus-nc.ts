import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * cabarrus — NC Tier 2 Wave 1
 */
export const cabarrusCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'cabarrus',
  hubTitle: 'Cabarrus County Moving Intelligence Hub',
  eyebrow: 'Cabarrus · Charlotte NE · Concord / Kannapolis',
  h1: 'Moving in Cabarrus County: Concord, Kannapolis & I-85 Northeast Growth',
  heroOpener:
    'Cabarrus County is Charlotte’s northeast I-85 collar — Concord HOA and multi-family growth, Kannapolis revitalizing multi-unit stock, Harrisburg edges, and motorsports/retail corridor freeflow that is not Mecklenburg University City with different labels. Expect I-85 portal time, event-week traffic near major venues, and mixed industrial-residential product under one county. This guide is for people moving in Cabarrus as NE Charlotte growth collar — not a Mecklenburg rename.',
  heroCredibility:
    'Charlotte NE collar · I-85 growth · Concord / Kannapolis · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-85 · US-29 · Concord Mills Blvd · NC-49 · NC-73',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Mecklenburg County',
    parentHref: '/local-movers/north-carolina/mecklenburg',
    title: 'Compared with Mecklenburg County',
    intro:
      'Cabarrus is Charlotte NE I-85 growth collar — not Mecklenburg Uptown elevators and not pure rural Piedmont freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Mecklenburg crews fight beltway peaks into University City and Uptown. Cabarrus pairs ride I-85, US-29, and NC-49 — freer mid-day northeast of the ring, still peak-heavy toward Mecklenburg portals and Concord Mills retail weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Mecklenburg mixes towers and University multi-family. Cabarrus mixes Concord HOA SFH, Kannapolis multi-unit, and Harrisburg growth — more I-85 spillover product, less continuous South End loft density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'HOA packets and arterial multi-family curb plans dominate; event weeks near major venues rewrite staging uncommon on quiet Ballantyne cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cabarrus quotes often track NE-metro suburb rates for driveway SFH — I-85 peaks and multi-unit access still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Cabarrus is Charlotte NE I-85 collar — not Mecklenburg core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Cabarrus County different',
    intro: 'I-85 freeflow, Concord/Kannapolis mixed stock, and event-week staging — not interchangeable Mecklenburg boilerplate.',
    bullets: [
      {
        title: 'I-85 peaks rewrite short-looking locals',
        detail:
          'Cabarrus ↔ Mecklenburg pairs freer mid-day still burn clock at commute peaks. Ask portal-to-portal.',
      },
      {
        title: 'Concord HOA growth is first-class product',
        detail:
          'Gate lists and approved hours are standard on planned villages.',
      },
      {
        title: 'Kannapolis multi-unit differs from pure SFH HOAs',
        detail:
          'Elevators and curb plans need inventories different from Harrisburg driveways.',
      },
      {
        title: 'Motorsports/retail event weeks reshape freeflow',
        detail:
          'Major venue calendars can erase “quiet suburban” unload assumptions.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Cabarrus zones: Concord growth, Kannapolis multi-unit, Harrisburg edges & eastern lots',
  zonesIntro: 'Two to four sharp products under one NE I-85 collar label.',
  zones: [
    {
      id: 'concord-growth',
      name: 'Concord HOA & multi-family growth',
      shortName: 'Concord',
      neighborhoods: ["Concord","growth villages","Concord Mills edges"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","I-85 peaks","Retail congestion"],
      moverTips: 'Collect HOA COIs; build I-85 buffer.',
      cityKeywords: ["concord","concord mills"],
    },
    {
      id: 'kannapolis',
      name: 'Kannapolis multi-unit & revitalizing stock',
      shortName: 'Kannapolis',
      neighborhoods: ["Kannapolis","downtown edges","multi-family corridors"],
      housingTypes: 'Multi-unit, older SFH, townhomes',
      challenges: ["Elevators/stairs","Street parking","Mixed curb"],
      moverTips: 'Confirm elevator rules; inventory stairs.',
      cityKeywords: ["kannapolis"],
    },
    {
      id: 'harrisburg',
      name: 'Harrisburg / west edge toward Mecklenburg',
      shortName: 'Harrisburg',
      neighborhoods: ["Harrisburg","western edges"],
      housingTypes: 'HOA SFH, multi-family',
      challenges: ["I-85 freeflow","HOA rules"],
      moverTips: 'Clarify Mecklenburg second addresses early.',
      cityKeywords: ["harrisburg"],
    },
    {
      id: 'east-edge',
      name: 'Eastern Cabarrus larger lots',
      shortName: 'East edge',
      neighborhoods: ["Mount Pleasant edges","eastern tracts"],
      housingTypes: 'SFH, rural-edge lots',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts.',
      cityKeywords: ["mount pleasant","east cabarrus"],
    }
  ],
  specialized: [
    {
      id: 'i85-ne',
      title: 'I-85 northeast freeflow',
      intro: 'NE-metro pairs still peak hard toward Mecklenburg.',
      bullets: ["Price portal-to-portal honestly.","Build buffers for Concord Mills and event weekends."],
    },
    {
      id: 'concord-hoa',
      title: 'Concord HOA growth module',
      intro: 'Planned suburbs dominate family volume.',
      bullets: ["Collect COI and gate lists early.","Do not quote Uptown elevator rates for driveway SFH."],
    },
    {
      id: 'kannapolis-multi',
      title: 'Kannapolis multi-unit access',
      intro: 'Revitalizing multi-family is a first-class product.',
      bullets: ["Inventory elevators vs stairs before comparing hourly rates.","Temporary no-parking often beats long carries."],
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
        intro: 'Cabarrus families compare Cabarrus County Schools and Kannapolis City Schools feeders — verify address boundaries; do not assume Charlotte-Mecklenburg maps apply.',
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
            detail: 'Atrium Health Cabarrus and Charlotte specialty spillover serve the county; map peak I-85 times for ER access.',
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
    intro: 'I-85 freeflow, HOA soft costs, and multi-unit access often matter more than raw miles.',
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
    intro: 'School years, lease ends, and major-event weeks reshape demand by pocket.',
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
